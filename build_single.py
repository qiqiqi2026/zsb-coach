#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 app.html 及其引用的 styles.css / 所有 JS 内联成单个离线 HTML 文件。"""
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'app.html')
DST = os.path.join(ROOT, '升本教练-单文件版.html')

with open(SRC, 'r', encoding='utf-8') as f:
    html = f.read()

# 内联 styles.css
def inline_css(m):
    path = os.path.join(ROOT, m.group(1))
    if not os.path.exists(path):
        return m.group(0)
    with open(path, 'r', encoding='utf-8') as f:
        css = f.read()
    return '<style>\n' + css + '\n</style>'

html = re.sub(r'<link[^>]*rel=["\']stylesheet["\'][^>]*href=["\']([^"\']+)["\'][^>]*>', inline_css, html)

# 内联 JS
def inline_js(m):
    path = os.path.join(ROOT, m.group(1))
    if not os.path.exists(path):
        return m.group(0)
    with open(path, 'r', encoding='utf-8') as f:
        js = f.read()
    # 防止 </script> 截断
    js = js.replace('</script>', '<\\/script>')
    return '<script>\n' + js + '\n</script>'

html = re.sub(r'<script[^>]*src=["\']([^"\']+)["\'][^>]*>\s*</script>', inline_js, html)

# 离线版不需要 manifest / 外部图标，移除避免 404
html = re.sub(r'<link[^>]*rel=["\']manifest["\'][^>]*>', '', html)

# 加注释标记构建时间
import datetime
stamp = '<!-- 升本教练单文件离线版 · 构建于 ' + datetime.datetime.now().strftime('%Y-%m-%d %H:%M') + ' -->'
html = html.replace('<!doctype html>', '<!doctype html>\n' + stamp, 1)

with open(DST, 'w', encoding='utf-8') as f:
    f.write(html)

print('已生成：%s（%.1f KB）' % (DST, os.path.getsize(DST) / 1024))
