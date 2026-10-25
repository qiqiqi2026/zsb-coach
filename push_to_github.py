#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
一键把本地提交推送到 GitHub Pages（用 GitHub API，绕过 github.com 阻断）。

用法：
    python push_to_github.py 你的GitHubToken

需要 token 有 repo 权限。默认推送到 qiqiqi2026/zsb-coach 的 main 分支。
"""
import base64
import json
import os
import subprocess
import sys
import urllib.request

OWNER = 'qiqiqi2026'
REPO = 'zsb-coach'
BRANCH = 'main'
API = 'https://api.github.com'

def gh(method, path, token, body=None):
    url = API + path
    data = json.dumps(body).encode('utf-8') if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header('Authorization', 'token ' + token)
    req.add_header('User-Agent', 'zsb-coach-push')
    req.add_header('Accept', 'application/vnd.github+json')
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, json.loads(r.read().decode('utf-8') or '{}')
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode('utf-8') or '{}')

def main():
    if len(sys.argv) < 2:
        print('用法: python push_to_github.py <GITHUB_TOKEN>')
        sys.exit(1)
    token = sys.argv[1].strip()

    # 1. 取当前分支最新 commit
    status, ref = gh('GET', '/repos/%s/%s/git/refs/heads/%s' % (OWNER, REPO, BRANCH), token)
    if status != 200:
        print('获取分支失败：', ref)
        sys.exit(1)
    base_sha = ref['object']['sha']
    status, base_commit = gh('GET', '/repos/%s/%s/git/commits/%s' % (OWNER, REPO, base_sha), token)
    base_tree = base_commit['tree']['sha']
    print('远端 HEAD:', base_sha[:12])

    # 2. 列出本地变更（相对 HEAD）
    out = subprocess.check_output(['git', 'diff', '--name-only', base_sha, 'HEAD'])
    files = [f for f in out.decode('utf-8').splitlines() if f.strip()]
    # 也加上新增但远端没有的文件
    out2 = subprocess.check_output(['git', 'diff', '--name-only', '--diff-filter=A', base_sha, 'HEAD'])
    added = [f for f in out2.decode('utf-8').splitlines() if f.strip()]
    files = sorted(set(files + added))
    print('待推送文件 %d 个：' % len(files))
    for f in files[:10]:
        print('  -', f)
    if len(files) > 10:
        print('  ... 等共 %d 个' % len(files))

    # 3. 为每个变更文件创建 blob，构造 tree
    tree = []
    root = os.path.dirname(os.path.abspath(__file__))
    for f in files:
        full = os.path.join(root, f)
        if not os.path.exists(full):
            # 已删除的文件
            tree.append({'path': f, 'mode': '100644', 'type': 'blob', 'sha': None})
            continue
        with open(full, 'rb') as fh:
            content = fh.read()
        status, blob = gh('POST', '/repos/%s/%s/git/blobs' % (OWNER, REPO), token, {
            'content': base64.b64encode(content).decode('ascii'),
            'encoding': 'base64'
        })
        if status != 201:
            print('创建 blob 失败 [%s]:' % f, blob)
            sys.exit(1)
        tree.append({'path': f, 'mode': '100644', 'type': 'blob', 'sha': blob['sha']})

    # 4. 基于远端 tree 创建新 tree
    status, new_tree = gh('POST', '/repos/%s/%s/git/trees' % (OWNER, REPO), token, {
        'base_tree': base_tree,
        'tree': tree
    })
    if status != 201:
        print('创建 tree 失败:', new_tree)
        sys.exit(1)
    print('新 tree:', new_tree['sha'][:12])

    # 5. 创建 commit
    msg = subprocess.check_output(['git', 'log', '-1', '--pretty=%B']).decode('utf-8').strip()
    status, commit = gh('POST', '/repos/%s/%s/git/commits' % (OWNER, REPO), token, {
        'message': msg,
        'tree': new_tree['sha'],
        'parents': [base_sha]
    })
    if status != 201:
        print('创建 commit 失败:', commit)
        sys.exit(1)
    print('新 commit:', commit['sha'][:12])

    # 6. 更新分支 ref
    status, upd = gh('PATCH', '/repos/%s/%s/git/refs/heads/%s' % (OWNER, REPO, BRANCH), token, {
        'sha': commit['sha'],
        'force': False
    })
    if status != 200:
        print('更新分支失败:', upd)
        sys.exit(1)
    print('✅ 已推送到 GitHub Pages，稍后访问 https://%s.github.io/%s/' % (OWNER, REPO))

if __name__ == '__main__':
    main()
