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

import base64
import hashlib
import hmac
import json
import os
import re
import secrets
import sqlite3
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
from contextlib import closing
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SERVER_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_FILE = os.path.join(SERVER_DIR, '.env')
DATA_DIR = os.path.join(SERVER_DIR, 'data')
DB_PATH = os.environ.get('ZSB_DB') or os.path.join(DATA_DIR, 'zsb.db')

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


# ---------------- 账号与学习数据（SQLite，标准库） ----------------
def _data_path(name):
    os.makedirs(DATA_DIR, exist_ok=True)
    return os.path.join(DATA_DIR, name)


def load_or_make_key(filename, env_value, nbytes=24):
    if env_value:
        return env_value.strip()
    path = _data_path(filename)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            value = f.read().strip()
        if value:
            return value
    value = secrets.token_hex(nbytes)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(value)
    return value


SECRET_KEY = load_or_make_key('secret.key', os.environ.get('SECRET_KEY', ''), 32)
ADMIN_KEY = load_or_make_key('admin.key', os.environ.get('ADMIN_KEY', ''), 8)


def db():
    os.makedirs(os.path.dirname(DB_PATH) or '.', exist_ok=True)
    conn = sqlite3.connect(DB_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with closing(db()) as conn:
        conn.executescript(
            'PRAGMA journal_mode=WAL;'
            'CREATE TABLE IF NOT EXISTS users ('
            ' id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, username TEXT NOT NULL,'
            ' pass_hash TEXT NOT NULL, created_at INTEGER NOT NULL, last_login INTEGER,'
            ' is_admin INTEGER DEFAULT 0, last_seen INTEGER DEFAULT 0);'
            'CREATE UNIQUE INDEX IF NOT EXISTS idx_users_name ON users(username COLLATE NOCASE);'
            'CREATE TABLE IF NOT EXISTS progress ('
            ' user_id TEXT NOT NULL, kp_id TEXT NOT NULL, stage INTEGER, mastery REAL,'
            ' updated_at TEXT, PRIMARY KEY(user_id, kp_id));'
            'CREATE TABLE IF NOT EXISTS attempts ('
            ' user_id TEXT NOT NULL, attempt_id TEXT NOT NULL, kp_id TEXT, ok INTEGER,'
            ' type TEXT, payload TEXT, created_at TEXT, PRIMARY KEY(user_id, attempt_id));'
            'CREATE INDEX IF NOT EXISTS idx_attempts_time ON attempts(created_at);'
        )
        # 兼容旧库：补列
        cols = [r[1] for r in conn.execute('PRAGMA table_info(users)').fetchall()]
        if 'is_admin' not in cols:
            conn.execute('ALTER TABLE users ADD COLUMN is_admin INTEGER DEFAULT 0')
        if 'last_seen' not in cols:
            conn.execute('ALTER TABLE users ADD COLUMN last_seen INTEGER DEFAULT 0')
        conn.commit()


# 开发者身份：在 server/.env 里写 DEV_EMAIL=你的邮箱（可选 DEV_USERNAME=你的用户名），
# 用这组信息注册或登录，账号自动成为开发者，官网登录后直接进入开发者版本
DEV_EMAIL = os.environ.get('DEV_EMAIL', '').strip().lower()
DEV_USERNAME = os.environ.get('DEV_USERNAME', '').strip().lower()


def is_dev_identity(email, username):
    if DEV_EMAIL and str(email or '').strip().lower() == DEV_EMAIL:
        return True
    if DEV_USERNAME and str(username or '').strip().lower() == DEV_USERNAME:
        return True
    return False


def hash_password(password):
    salt = secrets.token_hex(16)
    dk = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), bytes.fromhex(salt), 120000)
    return 'pbkdf2$120000$%s$%s' % (salt, dk.hex())


def check_password(password, stored):
    try:
        _, rounds, salt, expected = str(stored).split('$')
        dk = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), bytes.fromhex(salt), int(rounds))
        return hmac.compare_digest(dk.hex(), expected)
    except Exception:
        return False


def make_token(user_id, email, is_admin=0, hours=720):
    payload = {'u': user_id, 'e': email, 'a': int(is_admin), 'x': int(time.time() + hours * 3600)}
    raw = base64.urlsafe_b64encode(
        json.dumps(payload, separators=(',', ':')).encode('utf-8')
    ).decode('ascii').rstrip('=')
    sig = hmac.new(SECRET_KEY.encode('utf-8'), raw.encode('ascii'), hashlib.sha256).hexdigest()
    return raw + '.' + sig


def read_token(token):
    try:
        raw, sig = str(token).rsplit('.', 1)
        expect = hmac.new(SECRET_KEY.encode('utf-8'), raw.encode('ascii'), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(sig, expect):
            return None
        pad = '=' * (-len(raw) % 4)
        payload = json.loads(base64.urlsafe_b64decode(raw + pad).decode('utf-8'))
        if int(payload.get('x') or 0) < time.time():
            return None
        return payload
    except Exception:
        return None


def iso_now(ms=None):
    ms = time.time() * 1000 if ms is None else ms
    return time.strftime('%Y-%m-%dT%H:%M:%S', time.gmtime(ms / 1000)) + 'Z'


EMAIL_RE = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')
PHONE_RE = re.compile(r'^1[3-9]\d{9}$')


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
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

    def do_OPTIONS(self):
        self.send_response(204)
        self.cors()
        self.end_headers()

    # ---------- 账号 API ----------
    def query(self):
        return urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)

    def body_json(self):
        try:
            length = int(self.headers.get('Content-Length') or 0)
            raw = self.rfile.read(length) if length else b'{}'
            data = json.loads(raw.decode('utf-8') or '{}')
            return data if isinstance(data, dict) else {}
        except Exception:
            return None

    def current_user(self):
        auth = self.headers.get('Authorization') or ''
        token = auth[7:].strip() if auth.lower().startswith('bearer ') else ''
        payload = read_token(token)
        if not payload:
            return None
        with closing(db()) as conn:
            row = conn.execute(
                'SELECT id,email,username,created_at,is_admin FROM users WHERE id=?',
                (payload.get('u'),)
            ).fetchone()
        return dict(row) if row else None

    def require_admin(self):
        """管理接口：开发者账号 token，或用 ADMIN_KEY 查询参数（后台口令模式）。"""
        user = self.current_user()
        if user and user.get('is_admin'):
            return True
        return self.admin_ok()

    def admin_ok(self):
        key = (self.query().get('key') or [''])[0]
        return bool(ADMIN_KEY) and hmac.compare_digest(str(key), ADMIN_KEY)

    def api_register(self, data):
        email = str(data.get('email') or data.get('account') or '').strip().lower()
        password = str(data.get('password') or '')
        username = str(data.get('username') or '').strip()
        if not (EMAIL_RE.match(email) or PHONE_RE.match(email)):
            return self.send_json({'error': '邮箱或手机号格式不正确'}, 400)
        if len(password) < 6:
            return self.send_json({'error': '密码至少 6 位'}, 400)
        if not username:
            username = ('同学' + email[-4:]) if PHONE_RE.match(email) else email.split('@')[0]
        if not (2 <= len(username) <= 16):
            return self.send_json({'error': '用户名需要 2-16 个字符'}, 400)
        uid = uuid.uuid4().hex
        now = int(time.time() * 1000)
        is_admin = 1 if is_dev_identity(email, username) else 0
        try:
            with closing(db()) as conn:
                conn.execute(
                    'INSERT INTO users(id,email,username,pass_hash,created_at,last_login,is_admin,last_seen)'
                    ' VALUES(?,?,?,?,?,?,?,?)',
                    (uid, email, username, hash_password(password), now, now, is_admin, now)
                )
                conn.commit()
        except sqlite3.IntegrityError:
            return self.send_json({'error': '这个邮箱或用户名已经注册过了，直接登录吧'}, 409)
        self.send_json({
            'token': make_token(uid, email, is_admin),
            'user': {'id': uid, 'email': email, 'username': username, 'is_admin': is_admin}
        })

    def api_login(self, data):
        account = str(data.get('account') or data.get('email') or data.get('username') or '').strip()
        password = str(data.get('password') or '')
        if not account or not password:
            return self.send_json({'error': '请输入账号和密码'}, 400)
        with closing(db()) as conn:
            row = conn.execute(
                'SELECT * FROM users WHERE email=? OR lower(username)=lower(?)',
                (account.lower(), account)
            ).fetchone()
            if not row or not check_password(password, row['pass_hash']):
                return self.send_json({'error': '账号或密码不正确'}, 401)
            is_admin = int(row['is_admin'] or 0)
            now_ms = int(time.time() * 1000)
            # 已有账号后来才配置 DEV_EMAIL / DEV_USERNAME 的，登录时自动补成开发者
            if not is_admin and is_dev_identity(row['email'], row['username']):
                is_admin = 1
                conn.execute('UPDATE users SET is_admin=1 WHERE id=?', (row['id'],))
            conn.execute('UPDATE users SET last_login=?, last_seen=? WHERE id=?',
                         (now_ms, now_ms, row['id']))
            conn.commit()
        self.send_json({
            'token': make_token(row['id'], row['email'], is_admin),
            'user': {'id': row['id'], 'email': row['email'], 'username': row['username'], 'is_admin': is_admin}
        })

    def api_sync(self, data):
        user = self.current_user()
        if not user:
            return self.send_json({'error': '登录已失效，请重新登录'}, 401)
        uid = user['id']
        prog_rows = []
        for item in (data.get('progress') or [])[:600]:
            if not isinstance(item, dict) or not item.get('kpId'):
                continue
            try:
                stage = int(item.get('stage') or 0)
            except Exception:
                stage = 0
            try:
                mastery = float(item.get('mastery') or 0)
            except Exception:
                mastery = 0.0
            prog_rows.append((uid, str(item['kpId']), stage, mastery,
                              str(item.get('updatedAt') or iso_now())))
        att_rows = []
        for item in (data.get('attempts') or [])[-300:]:
            if not isinstance(item, dict) or not item.get('id'):
                continue
            payload = json.dumps(item.get('payload') or {}, ensure_ascii=False)
            att_rows.append((
                uid, str(item['id']), str(item.get('kpId') or ''),
                1 if item.get('ok') else 0, str(item.get('type') or ''),
                payload, str(item.get('createdAt') or iso_now())
            ))
        with closing(db()) as conn:
            if prog_rows:
                conn.executemany(
                    'INSERT INTO progress(user_id,kp_id,stage,mastery,updated_at)'
                    ' VALUES(?,?,?,?,?)'
                    ' ON CONFLICT(user_id,kp_id) DO UPDATE SET'
                    ' stage=excluded.stage, mastery=excluded.mastery, updated_at=excluded.updated_at',
                    prog_rows
                )
            if att_rows:
                conn.executemany(
                    'INSERT OR IGNORE INTO attempts'
                    '(user_id,attempt_id,kp_id,ok,type,payload,created_at)'
                    ' VALUES(?,?,?,?,?,?,?)',
                    att_rows
                )
            conn.commit()
        self.send_json({'ok': True, 'progress': len(prog_rows), 'attempts': len(att_rows)})

    def api_data(self):
        user = self.current_user()
        if not user:
            return self.send_json({'error': '登录已失效，请重新登录'}, 401)
        with closing(db()) as conn:
            prog = conn.execute(
                'SELECT kp_id,stage,mastery,updated_at FROM progress WHERE user_id=?',
                (user['id'],)
            ).fetchall()
            att = conn.execute(
                'SELECT attempt_id,kp_id,ok,type,payload,created_at FROM attempts'
                ' WHERE user_id=? ORDER BY created_at ASC LIMIT 2000',
                (user['id'],)
            ).fetchall()
        attempts = []
        for row in att:
            item = dict(row)
            try:
                item['payload'] = json.loads(item.get('payload') or '{}')
            except Exception:
                item['payload'] = {}
            attempts.append(item)
        self.send_json({'progress': [dict(r) for r in prog], 'attempts': attempts})

    def api_admin_users(self):
        if not self.require_admin():
            return self.send_json({'error': '仅开发者账号可访问'}, 401)
        with closing(db()) as conn:
            rows = conn.execute(
                'SELECT u.id,u.email,u.username,u.created_at,u.last_login,u.is_admin,u.last_seen,'
                ' (SELECT COUNT(*) FROM progress p WHERE p.user_id=u.id) AS kp_count,'
                ' (SELECT COUNT(*) FROM attempts a WHERE a.user_id=u.id) AS answers,'
                ' (SELECT COALESCE(SUM(a.ok),0) FROM attempts a WHERE a.user_id=u.id) AS correct'
                ' FROM users u ORDER BY u.created_at DESC LIMIT 500'
            ).fetchall()
        users = []
        for row in rows:
            item = dict(row)
            answers = item.get('answers') or 0
            item['accuracy'] = round((item.get('correct') or 0) * 100 / answers) if answers else None
            item['online'] = int((item.get('last_seen') or 0) >= (time.time() - 300) * 1000)
            users.append(item)
        self.send_json(users)

    def api_admin_stats(self):
        if not self.require_admin():
            return self.send_json({'error': '仅开发者账号可访问'}, 401)
        since = iso_now((time.time() - 86400) * 1000)
        five_min_ago = int((time.time() - 300) * 1000)
        with closing(db()) as conn:
            users = conn.execute('SELECT COUNT(*) AS n FROM users').fetchone()['n']
            active = conn.execute('SELECT COUNT(*) AS n FROM users WHERE last_login>=?',
                                  (int((time.time() - 86400) * 1000),)).fetchone()['n']
            online = conn.execute('SELECT COUNT(*) AS n FROM users WHERE last_seen>=?',
                                  (five_min_ago,)).fetchone()['n']
            kp_touched = conn.execute('SELECT COUNT(*) AS n FROM progress').fetchone()['n']
            answered = conn.execute('SELECT COUNT(*) AS n, COALESCE(SUM(ok),0) AS ok FROM attempts').fetchone()
            answered_24h = conn.execute('SELECT COUNT(*) AS n FROM attempts WHERE created_at>=?',
                                        (since,)).fetchone()['n']
            recent = conn.execute(
                'SELECT a.kp_id,a.ok,a.created_at,u.username FROM attempts a'
                ' LEFT JOIN users u ON u.id=a.user_id'
                ' ORDER BY a.created_at DESC LIMIT 30'
            ).fetchall()
        total = answered['n'] or 0
        self.send_json({
            'users': users,
            'active_24h': active,
            'online_5m': online,
            'kp_touched': kp_touched,
            'answered_total': total,
            'answered_24h': answered_24h,
            'accuracy': round((answered['ok'] or 0) * 100 / total) if total else None,
            'recent': [dict(r) for r in recent]
        })

    def api_admin_promote(self, data):
        """用 ADMIN_KEY 把指定邮箱提升为开发者（首次设置开发者账号用）。"""
        if not self.admin_ok():
            return self.send_json({'error': '管理口令不正确'}, 401)
        email = str(data.get('email') or '').strip().lower()
        if not email:
            return self.send_json({'error': '请提供邮箱'}, 400)
        with closing(db()) as conn:
            row = conn.execute('SELECT id,username,is_admin FROM users WHERE email=?', (email,)).fetchone()
            if not row:
                return self.send_json({'error': '该邮箱未注册'}, 404)
            conn.execute('UPDATE users SET is_admin=1 WHERE email=?', (email,))
            conn.commit()
        self.send_json({'ok': True, 'email': email, 'is_admin': 1})

    def touch_user(self, user):
        if not user:
            return
        try:
            with closing(db()) as conn:
                conn.execute('UPDATE users SET last_seen=? WHERE id=?',
                             (int(time.time() * 1000), user['id']))
                conn.commit()
        except Exception:
            pass

    def handle_api_get(self, path):
        if path == '/api/health':
            return self.send_json({'ok': True, 'backend': True})
        if path == '/api/me':
            user = self.current_user()
            if not user:
                return self.send_json({'error': '未登录'}, 401)
            self.touch_user(user)
            return self.send_json({'user': user})
        if path == '/api/heartbeat':
            user = self.current_user()
            if not user:
                return self.send_json({'error': '未登录'}, 401)
            self.touch_user(user)
            return self.send_json({'ok': True, 'is_admin': int(user.get('is_admin') or 0)})
        if path == '/api/data':
            user = self.current_user()
            if user:
                self.touch_user(user)
            return self.api_data()
        if path == '/api/admin/users':
            return self.api_admin_users()
        if path == '/api/admin/stats':
            return self.api_admin_stats()
        self.send_json({'error': '接口不存在'}, 404)

    def handle_api_post(self, path):
        data = self.body_json()
        if data is None:
            return self.send_json({'error': '请求体不是合法 JSON'}, 400)
        if path == '/api/register':
            return self.api_register(data)
        if path == '/api/login':
            return self.api_login(data)
        if path == '/api/sync':
            return self.api_sync(data)
        if path == '/api/admin/promote':
            return self.api_admin_promote(data)
        self.send_json({'error': '接口不存在'}, 404)

    def do_GET(self):
        path = self.path.split('?')[0]
        if path.startswith('/api/'):
            self.handle_api_get(path)
            return
        if path == '/ai/health':
            self.send_json({
                'ok': True,
                'backend': True,
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
        path = self.path.split('?')[0]
        if path.startswith('/api/'):
            self.handle_api_post(path)
            return
        if path != '/ai/chat':
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
    init_db()
    server = ThreadingHTTPServer(('0.0.0.0', PORT), Handler)
    print('升本教练动态版已启动：http://localhost:%d/app.html' % PORT)
    print('  官网：http://localhost:%d/index.html   开发者后台：http://localhost:%d/admin.html' % (PORT, PORT))
    print('  本机模型：%s @ %s' % (OLLAMA_MODEL or '(自动选择)', OLLAMA_BASE))
    print('  云端兜底：%s' % (CLOUD_MODEL if (CLOUD_BASE and CLOUD_KEY and CLOUD_MODEL) else '未配置'))
    print('  账号数据库：%s' % DB_PATH)
    print('  后台管理口令：%s（也保存在 server/data/admin.key）' % ADMIN_KEY)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n已停止')


if __name__ == '__main__':
    main()
