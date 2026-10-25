#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
升本教练 · 动态后端（零依赖，Python 标准库）

作用：
1. 直接托管整个静态站点（app.html / index.html / js / styles.css）
2. 提供 /ai/chat 代理：浏览器只跟本站通信，云端 Key 只存在服务器环境变量里
3. 优先转发到你本机的 Ollama；本机不可用时自动改走云端 OpenAI 兼容接口

启动：
    python server/server.py
    # 默认 http://localhost:8140/app.html

可选环境变量（也可写在 server/.env）：
    PORT=8140
    OLLAMA_BASE=http://127.0.0.1:11434
    OLLAMA_MODEL=qwen3-8b:latest
    CLOUD_BASE=https://api.siliconflow.cn/v1
    CLOUD_KEY=sk-xxxx            # 只在服务器上，不下发浏览器
    CLOUD_MODEL=Qwen/Qwen2.5-7B-Instruct
"""

import json
import os
import sys
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')

SYSTEM_PROMPT = (
    '你是「升本教练」的 AI 助教，面向专升本考生。用简体中文、口语化地讲解，'
    '先给结论再给步骤；最多 6 行就要有一个小结论。数学公式写成纯文本（如 x^2、∫），'
    '不要输出 LaTeX。不要编造考点之外的事实。'
)


def load_env():
    if not os.path.exists(ENV_FILE):
        return
    with open(ENV_FILE, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            k, v = line.split('=', 1)
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


load_env()

PORT = int(os.environ.get('PORT', '8140'))
OLLAMA_BASE = os.environ.get('OLLAMA_BASE', 'http://127.0.0.1:11434').rstrip('/')
OLLAMA_MODEL = os.environ.get('OLLAMA_MODEL', '').strip()
CLOUD_BASE = os.environ.get('CLOUD_BASE', '').rstrip('/')
CLOUD_KEY = os.environ.get('CLOUD_KEY', '').strip()
CLOUD_MODEL = os.environ.get('CLOUD_MODEL', '').strip()

_model_cache = {'value': OLLAMA_MODEL}


def pick_model():
    if _model_cache['value']:
        return _model_cache['value']
    try:
        with urllib.request.urlopen(OLLAMA_BASE + '/api/tags', timeout=3) as r:
            data = json.loads(r.read().decode('utf-8'))
        models = [m.get('name') for m in data.get('models', []) if m.get('name')]
        if models:
            _model_cache['value'] = models[0]
            return models[0]
    except Exception:
        pass
    return 'qwen3-8b:latest'


def ollama_alive():
    try:
        with urllib.request.urlopen(OLLAMA_BASE + '/api/tags', timeout=3) as r:
            return r.status == 200
    except Exception:
        return False


def config_js():
    gateway_model = _model_cache['value'] or pick_model()
    return (
        '/* 由 server.py 动态生成：Key 只在服务端，浏览器拿不到 */\n'
        'window.ZSB_AI = ' + json.dumps({
            'gateway': {'url': '/ai/chat', 'model': gateway_model},
            'cloud': {'base': '', 'key': '', 'model': ''},
            'local': {'base': '', 'model': ''},
            'system': SYSTEM_PROMPT
        }, ensure_ascii=False) + ';\n'
    )


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def log_message(self, fmt, *args):
        pass

    def cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

    def do_OPTIONS(self):
        self.send_response(204)
        self.cors()
        self.end_headers()

    def do_GET(self):
        path = self.path.split('?')[0]
        if path == '/ai/health':
            self.send_json({
                'ok': True,
                'ollama': ollama_alive(),
                'model': _model_cache['value'] or pick_model(),
                'cloud': bool(CLOUD_BASE and CLOUD_KEY and CLOUD_MODEL)
            })
            return
        if path == '/js/ai.config.js':
            body = config_js().encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/javascript; charset=utf-8')
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Content-Length', str(len(body)))
            self.cors()
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()

    def do_POST(self):
        if self.path.split('?')[0] != '/ai/chat':
            self.send_error(404)
            return
        try:
            length = int(self.headers.get('Content-Length') or 0)
            payload = json.loads(self.rfile.read(length).decode('utf-8') or '{}')
        except Exception:
            self.send_json({'error': '请求体不是合法 JSON'}, 400)
            return
        messages = payload.get('messages') or []
        if not isinstance(messages, list) or not messages:
            self.send_json({'error': 'messages 不能为空'}, 400)
            return
        model = OLLAMA_MODEL or pick_model()
        try:
            upstream = self.open_ollama(messages, model)
        except Exception as err:
            if CLOUD_BASE and CLOUD_KEY and CLOUD_MODEL:
                try:
                    self.stream_cloud(messages)
                    return
                except Exception as cloud_err:
                    self.send_json({'error': '本机与云端都不可用：%s / %s' % (err, cloud_err)}, 502)
                    return
            self.send_json({'error': '本机 Ollama 不可用：%s' % err}, 502)
            return
        self.relay(upstream)

    # ---------- 上游请求 ----------
    def open_ollama(self, messages, model):
        body = json.dumps({
            'model': model,
            'messages': messages,
            'stream': True,
            'think': False,
            'options': {'temperature': 0.4}
        }, ensure_ascii=False).encode('utf-8')
        req = urllib.request.Request(
            OLLAMA_BASE + '/api/chat',
            data=body,
            headers={'Content-Type': 'application/json'}
        )
        return urllib.request.urlopen(req, timeout=300)

    def stream_cloud(self, messages):
        body = json.dumps({
            'model': CLOUD_MODEL,
            'messages': messages,
            'stream': True,
            'temperature': 0.4
        }, ensure_ascii=False).encode('utf-8')
        req = urllib.request.Request(
            CLOUD_BASE + '/chat/completions',
            data=body,
            headers={'Content-Type': 'application/json', 'Authorization': 'Bearer ' + CLOUD_KEY}
        )
        upstream = urllib.request.urlopen(req, timeout=300)
        self.send_response(200)
        self.send_header('Content-Type', 'application/x-ndjson; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.cors()
        self.end_headers()
        try:
            for raw in upstream:
                line = raw.decode('utf-8', 'ignore').strip()
                if not line.startswith('data:'):
                    continue
                chunk = line[5:].strip()
                if chunk == '[DONE]':
                    break
                try:
                    d = json.loads(chunk)
                except Exception:
                    continue
                try:
                    piece = d['choices'][0]['delta'].get('content') or ''
                except Exception:
                    piece = ''
                if piece:
                    self.emit({'message': {'role': 'assistant', 'content': piece}, 'done': False})
            self.emit({'message': {'role': 'assistant', 'content': ''}, 'done': True, 'done_reason': 'stop'})
        finally:
            upstream.close()

    # ---------- 输出 ----------
    def relay(self, upstream):
        self.send_response(200)
        self.send_header('Content-Type', 'application/x-ndjson; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.cors()
        self.end_headers()
        try:
            while True:
                chunk = upstream.read(1024)
                if not chunk:
                    break
                self.wfile.write(chunk)
                self.wfile.flush()
        finally:
            upstream.close()

    def emit(self, obj):
        self.wfile.write((json.dumps(obj, ensure_ascii=False) + '\n').encode('utf-8'))
        self.wfile.flush()

    def send_json(self, obj, status=200):
        body = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.cors()
        self.end_headers()
        self.wfile.write(body)


def main():
    os.chdir(ROOT)
    server = ThreadingHTTPServer(('0.0.0.0', PORT), Handler)
    print('升本教练动态版已启动：http://localhost:%d/app.html' % PORT)
    print('  本机模型：%s @ %s' % (OLLAMA_MODEL or '(自动选择)', OLLAMA_BASE))
    print('  云端兜底：%s' % (CLOUD_MODEL if (CLOUD_BASE and CLOUD_KEY and CLOUD_MODEL) else '未配置'))
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n已停止')


if __name__ == '__main__':
    main()
