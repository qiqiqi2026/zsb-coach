/* 云端同步（Supabase REST）——配置为空时自动关闭，页面回到纯本机模式 */
(function (Z) {
  var cfg = window.ZSB_CLOUD || {};
  var enabled = !!(cfg.url && cfg.anonKey);
  var SESSION_KEY = 'zsb.cloud.session.v1';
  var base = String(cfg.url || '').replace(/\/+$/, '');
  var session = read(SESSION_KEY, null);
  var timer = null;
  var pushing = false;
  var again = false;
  var STAGES = ['intro', 'learn', 'demo', 'guided', 'solo', 'wrap'];

  function read(k, fb) {
    try { return JSON.parse(localStorage.getItem(k) || 'null') || fb; } catch (e) { return fb; }
  }
  function save(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
  }
  function headers(token) {
    var h = { apikey: cfg.anonKey, 'Content-Type': 'application/json' };
    if (token) h.Authorization = 'Bearer ' + token;
    return h;
  }
  function request(method, path, body, token, prefer) {
    var h = headers(token);
    if (prefer) h.Prefer = prefer;
    return fetch(base + path, {
      method: method,
      headers: h,
      body: body == null ? undefined : JSON.stringify(body)
    }).then(function (r) {
      return r.text().then(function (text) {
        var data = null;
        try { data = text ? JSON.parse(text) : null; } catch (e) { data = text; }
        if (!r.ok) {
          var msg = (data && (data.msg || data.message || data.error_description || data.error)) || ('HTTP ' + r.status);
          var err = new Error(msg);
          err.status = r.status;
          err.data = data;
          throw err;
        }
        return data;
      });
    });
  }
  function keep(payload, name) {
    session = {
      access: payload.access_token,
      refresh: payload.refresh_token,
      exp: Date.now() + (Number(payload.expires_in) || 3600) * 1000,
      uid: payload.user && payload.user.id,
      email: payload.user && payload.user.email,
      name: name || ((payload.user && payload.user.email) || '').split('@')[0]
    };
    save(SESSION_KEY, session);
    return session;
  }
  function refreshToken() {
    if (!session || !session.refresh) return Promise.reject(new Error('会话已失效，请重新登录'));
    return request('POST', '/auth/v1/token?grant_type=refresh_token', { refresh_token: session.refresh })
      .then(function (d) { return keep(d, session.name).access; });
  }
  function token() {
    if (!session) return Promise.reject(new Error('未登录'));
    if (session.exp - Date.now() < 60000) return refreshToken();
    return Promise.resolve(session.access);
  }
  function profileName(uid) {
    return request('GET', '/rest/v1/profiles?select=username&id=eq.' + uid, null, session.access)
      .then(function (rows) {
        if (rows && rows.length && rows[0].username) session.name = rows[0].username;
        return session.name;
      })
      .catch(function () { return session.name; });
  }
  function upsertProfile(username) {
    return token().then(function (t) {
      return request('POST', '/rest/v1/profiles?on_conflict=id',
        [{ id: session.uid, username: username || session.name, last_seen: new Date().toISOString() }],
        t, 'resolution=merge-duplicates,return=minimal');
    });
  }

  Z.cloud = { enabled: enabled, sync: function () {} };
  if (!enabled) return;

  Z.cloud.session = function () { return session; };
  Z.cloud.user = function () {
    return session ? { id: session.uid, email: session.email, name: session.name } : null;
  };

  Z.cloud.signUp = function (email, password, username) {
    return request('POST', '/auth/v1/signup', { email: email, password: password, data: { username: username } })
      .then(function (d) {
        if (!d || !d.access_token) {
          throw new Error('账号已创建，但项目开启了邮箱验证。请到 Supabase 关闭 Confirm email，或在邮箱里点确认链接后再登录。');
        }
        keep(d, username);
        return upsertProfile(username).catch(function () {}).then(function () {
          return { name: username, email: email };
        });
      });
  };

  Z.cloud.signIn = function (email, password) {
    return request('POST', '/auth/v1/token?grant_type=password', { email: email, password: password })
      .then(function (d) {
        keep(d, (d.user && d.user.user_metadata && d.user.user_metadata.username) || '');
        return profileName(session.uid).then(function (name) {
          return { name: name || session.email.split('@')[0], email: session.email };
        });
      });
  };

  Z.cloud.signOut = function () {
    session = null;
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  };

  /* ---------- 阶段换算：本机用字符串阶段，云端只存序号 ---------- */
  function stageIndex(p) {
    if (!p) return 0;
    if (p.status === 'done') return STAGES.length;
    var i = STAGES.indexOf(p.stage);
    return i < 0 ? 0 : i;
  }
  function masteryOf(p) {
    var n = stageIndex(p);
    return Math.round((n / STAGES.length) * 1000) / 1000;
  }

  /* ---------- 上报：进度 upsert + 答题事件 upsert（重复也无害） ---------- */
  Z.cloud.sync = function (state) {
    if (!state || !session) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () { run(state); }, 1800);
  };

  function run(state) {
    if (!session) return;
    if (pushing) { again = true; return; }
    pushing = true;
    again = false;
    token().then(function (t) {
      return pushProgress(t, state).then(function () { return pushAttempts(t, state); });
    }).catch(function () {}).then(function () {
      pushing = false;
      if (again) run(state);
    });
  }

  function pushProgress(t, state) {
    var rows = [];
    var prog = state.progress || {};
    Object.keys(prog).forEach(function (k) {
      var p = prog[k] || {};
      rows.push({
        user_id: session.uid,
        kp_id: String(k),
        stage: stageIndex(p),
        mastery: masteryOf(p),
        updated_at: new Date(Number(p.lastReadAt) || Number(p.completedAt) || Date.now()).toISOString()
      });
    });
    if (!rows.length) return Promise.resolve(null);
    return request('POST', '/rest/v1/progress?on_conflict=user_id,kp_id',
      rows.slice(0, 400), t, 'resolution=merge-duplicates,return=minimal');
  }

  function pushAttempts(t, state) {
    var list = (state.attempts || []).slice(-150);
    if (!list.length) return Promise.resolve(null);
    var rows = list.map(function (a) {
      return {
        user_id: session.uid,
        attempt_id: String(a.id || ('a' + (a.ts || Date.now()))),
        kp_id: a.kpId || a.kp || (a.kpIds && a.kpIds[0]) || null,
        ok: a.correct === true || a.ok === true,
        type: a.type || null,
        payload: {
          questionId: a.questionId || a.qid || null,
          kpIds: a.kpIds || null,
          mode: a.mode || null,
          ts: a.ts || Date.now()
        },
        created_at: new Date(a.ts || Date.now()).toISOString()
      };
    });
    return request('POST', '/rest/v1/attempts?on_conflict=user_id,attempt_id',
      rows, t, 'resolution=merge-duplicates,return=minimal');
  }

  /* ---------- 拉取：换设备后把云端进度与答题合并回本机 ---------- */
  Z.cloud.hydrate = function (state, done) {
    if (!state) return;
    var finish = function () { if (done) { try { done(); } catch (e) {} } };
    if (!session) { finish(); return; }
    token().then(function (t) {
      return Promise.all([
        request('GET', '/rest/v1/progress?select=kp_id,stage,mastery,updated_at&user_id=eq.' +
          session.uid + '&limit=1000', null, t),
        request('GET', '/rest/v1/attempts?select=attempt_id,kp_id,ok,type,payload,created_at&user_id=eq.' +
          session.uid + '&order=created_at.asc&limit=2000', null, t)
      ]);
    }).then(function (res) {
      mergeProgress(state, res[0] || []);
      mergeAttempts(state, res[1] || []);
      finish();
    }).catch(finish);
  };

  function mergeProgress(state, rows) {
    state.progress = state.progress || {};
    rows.forEach(function (r) {
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
    rows.forEach(function (r) {
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
        fromCloud: true
      });
      seen[id] = 1;
      added += 1;
    });
    if (added) {
      state.attempts.sort(function (a, b) { return (a.ts || 0) - (b.ts || 0); });
      if (state.attempts.length > 4000) state.attempts = state.attempts.slice(-3500);
    }
  }

  /* ---------- 开发者后台：带口令读取云端聚合数据 ---------- */
  Z.cloud.stats = function (key) {
    return request('POST', '/rest/v1/rpc/admin_stats', { p_key: key }, cfg.anonKey);
  };
  Z.cloud.users = function (key, limit) {
    return request('POST', '/rest/v1/rpc/admin_users', { p_key: key, p_limit: limit || 200 }, cfg.anonKey);
  };
})(window.ZSB = window.ZSB || {});
