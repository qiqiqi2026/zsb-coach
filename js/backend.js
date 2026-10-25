/* 本站后端账号与学习数据（配合 server/server.py；静态站不可达时自动关闭） */
(function (Z) {
  var SESSION_KEY = 'zsb.api.session.v1';
  var BASE_KEY = 'zsb.api.base';
  var STAGES = ['intro', 'learn', 'demo', 'guided', 'solo', 'wrap'];

  var session = read(SESSION_KEY, null);
  var timer = null;
  var pushing = false;
  var again = false;
  var probed = null;

  function read(k, fb) {
    try { return JSON.parse(localStorage.getItem(k) || 'null') || fb; } catch (e) { return fb; }
  }
  function write(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
  }

  /* 返回 '' 表示与页面同源；返回地址表示跨源；返回 null 表示当前环境不可用 */
  function base() {
    var saved = '';
    try { saved = String(localStorage.getItem(BASE_KEY) || '').replace(/\/+$/, ''); } catch (e) {}
    if (saved) return saved;
    if (location.protocol !== 'http:' && location.protocol !== 'https:') return null;
    if (String(location.port) === '8140') return '';
    /* 线上 https 页面不能访问 http 的本机后端（混合内容会被浏览器拦截） */
    if (location.protocol === 'https:') return null;
    return 'http://127.0.0.1:8140';
  }

  function setBase(url) {
    try {
      var v = String(url || '').trim().replace(/\/+$/, '');
      if (v) localStorage.setItem(BASE_KEY, v);
      else localStorage.removeItem(BASE_KEY);
    } catch (e) {}
    probed = null;
  }

  function request(method, path, body, token) {
    var b = base();
    if (b === null) return Promise.reject(new Error('当前页面无法连接本机后端'));
    var headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = 'Bearer ' + token;
    return fetch((b || '') + path, {
      method: method,
      headers: headers,
      cache: 'no-store',
      body: body == null ? undefined : JSON.stringify(body)
    }).then(function (r) {
      return r.text().then(function (text) {
        var data = null;
        try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
        if (!r.ok) {
          var err = new Error((data && (data.error || data.message)) || ('HTTP ' + r.status));
          err.status = r.status;
          throw err;
        }
        return data;
      });
    });
  }

  function probe() {
    if (probed) return probed;
    probed = new Promise(function (resolve) {
      var b = base();
      if (b === null) return resolve(false);
      var done = false;
      var tid = setTimeout(function () { if (!done) { done = true; resolve(false); } }, 2200);
      fetch((b || '') + '/api/health', { cache: 'no-store' }).then(function (r) {
        return r.ok ? r.json() : null;
      }).then(function (d) {
        if (done) return;
        done = true;
        clearTimeout(tid);
        resolve(!!(d && d.ok));
      }).catch(function () {
        if (done) return;
        done = true;
        clearTimeout(tid);
        resolve(false);
      });
    });
    return probed;
  }

  function keep(d) {
    var u = (d && d.user) || {};
    session = {
      token: d && d.token,
      user: u,
      is_admin: !!(u.is_admin),
      at: Date.now()
    };
    write(SESSION_KEY, session);
    startHeartbeat();
    return {
      name: u.username || '',
      email: u.email || '',
      is_admin: !!u.is_admin
    };
  }

  var hbTimer = null;
  function startHeartbeat() {
    if (hbTimer) clearInterval(hbTimer);
    hbTimer = setInterval(function () {
      if (!session || !session.token) return;
      request('GET', '/api/heartbeat', null, session.token).catch(function (err) {
        if (err && err.status === 401) signOut();
      });
    }, 60000);
  }
  if (session && session.token) startHeartbeat();

  function signUp(email, password, username) {
    return request('POST', '/api/register', {
      email: email, password: password, username: username
    }).then(keep);
  }

  function signIn(account, password) {
    return request('POST', '/api/login', {
      account: account, password: password
    }).then(keep);
  }

  function signOut() {
    session = null;
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  function stageIndex(p) {
    if (!p) return 0;
    if (p.status === 'done') return STAGES.length;
    var i = STAGES.indexOf(p.stage);
    return i < 0 ? 0 : i;
  }

  function iso(ms) {
    return new Date(Number(ms) || Date.now()).toISOString();
  }

  function payloadOf(state) {
    var progress = [];
    var prog = (state && state.progress) || {};
    Object.keys(prog).forEach(function (k) {
      var p = prog[k] || {};
      progress.push({
        kpId: k,
        stage: stageIndex(p),
        mastery: Math.round((stageIndex(p) / STAGES.length) * 1000) / 1000,
        updatedAt: iso(Number(p.lastReadAt) || Number(p.completedAt) || Date.now())
      });
    });
    var attempts = ((state && state.attempts) || []).slice(-150).map(function (a) {
      return {
        id: a.id || ('a' + (a.ts || Date.now())),
        kpId: a.kpId || a.kp || (a.kpIds && a.kpIds[0]) || '',
        ok: a.correct === true || a.ok === true,
        type: a.type || '',
        payload: {
          questionId: a.questionId || a.qid || null,
          kpIds: a.kpIds || null,
          mode: a.mode || null,
          ts: a.ts || Date.now()
        },
        createdAt: iso(a.ts || Date.now())
      };
    });
    return { progress: progress.slice(0, 400), attempts: attempts };
  }

  function sync(state) {
    if (!session || !session.token || !state) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () { push(state); }, 2000);
  }

  function push(state) {
    if (!session || !session.token) return;
    if (pushing) { again = true; return; }
    pushing = true;
    request('POST', '/api/sync', payloadOf(state), session.token).catch(function (err) {
      if (err && err.status === 401) signOut();
    }).then(function () {
      pushing = false;
      if (again) { again = false; push(state); }
    });
  }

  function mergeProgress(state, rows) {
    state.progress = state.progress || {};
    (rows || []).forEach(function (r) {
      if (!r || !r.kp_id) return;
      var key = String(r.kp_id);
      var p = state.progress[key] || (state.progress[key] = {
        lessonId: key, status: 'unlocked', stage: 'intro', blockIndex: 0
      });
      var remote = Number(r.stage) || 0;
      var remoteTs = Date.parse(r.updated_at) || 0;
      if (remote > stageIndex(p)) {
        if (remote >= STAGES.length) {
          p.stage = 'wrap';
          p.status = 'done';
          p.completedAt = p.completedAt || remoteTs || Date.now();
        } else {
          p.stage = STAGES[remote];
          if (p.status !== 'done') p.status = 'inProgress';
        }
      }
      p.syncedAt = Math.max(Number(p.syncedAt) || 0, remoteTs);
    });
  }

  function mergeAttempts(state, rows) {
    state.attempts = state.attempts || [];
    var seen = {};
    state.attempts.forEach(function (a) { if (a && a.id) seen[a.id] = 1; });
    var added = 0;
    (rows || []).forEach(function (r) {
      var id = r && r.attempt_id;
      if (!id || seen[id]) return;
      var p = r.payload || {};
      state.attempts.push({
        id: id,
        ts: Date.parse(r.created_at) || Number(p.ts) || Date.now(),
        questionId: p.questionId || null,
        kpIds: p.kpIds || (r.kp_id ? [r.kp_id] : []),
        correct: r.ok === true,
        type: r.type || null,
        fromBackend: true
      });
      seen[id] = 1;
      added += 1;
    });
    if (added) {
      state.attempts.sort(function (a, b) { return (a.ts || 0) - (b.ts || 0); });
      if (state.attempts.length > 4000) state.attempts = state.attempts.slice(-3500);
    }
  }

  function hydrate(state, done) {
    var finish = function () { if (done) { try { done(); } catch (e) {} } };
    if (!state || !session || !session.token) return finish();
    request('GET', '/api/data', null, session.token).then(function (d) {
      mergeProgress(state, (d && d.progress) || []);
      mergeAttempts(state, (d && d.attempts) || []);
      finish();
    }).catch(function (err) {
      if (err && err.status === 401) signOut();
      finish();
    });
  }

  Z.backend = {
    probe: probe,
    base: base,
    setBase: setBase,
    session: function () { return session; },
    user: function () { return session && session.user ? session.user : null; },
    isAdmin: function () { return !!(session && session.is_admin); },
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
    sync: sync,
    hydrate: hydrate,
    heartbeat: function () {
      if (!session || !session.token) return Promise.resolve(null);
      return request('GET', '/api/heartbeat', null, session.token);
    },
    promote: function (email, adminKey) {
      return request('POST', '/api/admin/promote?key=' + encodeURIComponent(adminKey || ''), { email: email });
    },
    stats: function () {
      return request('GET', '/api/admin/stats', null, session && session.token);
    },
    users: function () {
      return request('GET', '/api/admin/users', null, session && session.token);
    }
  };
  Z.backend.enabled = !!(session && session.token);
})(window.ZSB = window.ZSB || {});
