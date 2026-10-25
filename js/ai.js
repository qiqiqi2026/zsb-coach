/* AI 客户端：云端 OpenAI 兼容接口优先，本机 Ollama 兜底，自动降级 */
(function (Z) {
  var KEY = 'zsb.ai.cfg.v2';
  var defaults = window.ZSB_AI || {};
  var abortCtrl = null;

  function read(k, fb) {
    try { return JSON.parse(localStorage.getItem(k) || 'null') || fb; } catch (e) { return fb; }
  }
  function write(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
  }
  function clean(u) {
    return String(u || '').trim().replace(/\/+$/, '');
  }
  function savedAll() {
    return read(KEY, null) || {};
  }
  function section(name) {
    var saved = savedAll()[name] || {};
    var d = defaults[name] || {};
    return {
      base: clean(saved.base != null ? saved.base : d.base),
      model: String(saved.model != null ? saved.model : (d.model || '')).trim(),
      key: String(saved.key != null ? saved.key : (d.key || '')).trim()
    };
  }

  function cfg() {
    return {
      local: section('local'),
      cloud: section('cloud'),
      gateway: {
        url: String((defaults.gateway && defaults.gateway.url) || '').trim(),
        model: String((defaults.gateway && defaults.gateway.model) || '').trim()
      },
      system: String(savedAll().system || defaults.system || '')
    };
  }

  function setCfg(patch) {
    var cur = cfg();
    var next = {
      local: {
        base: clean(patch && patch.local && patch.local.base != null ? patch.local.base : cur.local.base),
        model: String(patch && patch.local && patch.local.model != null ? patch.local.model : cur.local.model).trim()
      },
      cloud: {
        base: clean(patch && patch.cloud && patch.cloud.base != null ? patch.cloud.base : cur.cloud.base),
        model: String(patch && patch.cloud && patch.cloud.model != null ? patch.cloud.model : cur.cloud.model).trim(),
        key: String(patch && patch.cloud && patch.cloud.key != null ? patch.cloud.key : cur.cloud.key).trim()
      },
      system: (patch && patch.system) || cur.system
    };
    write(KEY, next);
    return next;
  }

  function resetCfg() {
    try { localStorage.removeItem(KEY); } catch (e) {}
  }

  function mixedBlocked(base) {
    return location.protocol === 'https:' &&
      /^http:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])/i.test(String(base || ''));
  }

  /* 优先级：云端 -> 本机；不可用的直接跳过 */
  function endpoints() {
    var c = cfg();
    var list = [];
    if (c.gateway.url) {
      list.push({ kind: 'gateway', mode: 'gateway', base: c.gateway.url, model: c.gateway.model, key: '', label: '本站 AI' });
    }
    if (c.cloud.base && c.cloud.model) {
      list.push({ kind: 'cloud', mode: 'openai', base: c.cloud.base, model: c.cloud.model, key: c.cloud.key, label: '云端 · ' + c.cloud.model });
    }
    if (c.local.base && c.local.model && !mixedBlocked(c.local.base)) {
      list.push({ kind: 'local', mode: 'ollama', base: c.local.base, model: c.local.model, label: '本机 · ' + c.local.model });
    }
    return list;
  }

  function ready() {
    return endpoints().length > 0;
  }

  function which() {
    var list = endpoints();
    if (!list.length) return '';
    return list.length > 1 ? list[0].label + '（含本机兜底）' : list[0].label;
  }

  function chatUrl(base) {
    if (/\/chat\/completions$/.test(base)) return base;
    return base + '/chat/completions';
  }

  function modelsUrl(base) {
    if (/\/models$/.test(base)) return base;
    return clean(base) + '/models';
  }

  function models(baseOverride) {
    var base = clean(baseOverride || cfg().local.base);
    if (!base) return Promise.reject(new Error('还没有填写本机地址'));
    return fetch(base + '/api/tags').then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (d) {
      return (d && d.models ? d.models : []).map(function (m) { return m.name; }).filter(Boolean);
    });
  }

  function testCloud(baseOverride, keyOverride) {
    var c = cfg();
    var base = clean(baseOverride || c.cloud.base);
    if (!base) return Promise.reject(new Error('还没有填写云端地址'));
    var headers = {};
    var key = String(keyOverride != null ? keyOverride : c.cloud.key).trim();
    if (key) headers.Authorization = 'Bearer ' + key;
    return fetch(modelsUrl(base), { headers: headers }).then(function (r) {
      if (!r.ok) {
        return r.text().then(function (t) {
          throw new Error('HTTP ' + r.status + (t ? '：' + String(t).slice(0, 120) : ''));
        });
      }
      return r.json();
    }).then(function (d) {
      return ((d && d.data) || []).map(function (m) { return m.id; }).filter(Boolean);
    });
  }

  /* ---------- 流式解析 ---------- */
  function readOllama(res, h, finish) {
    if (!res.body || !res.body.getReader) {
      return res.json().then(function (d) {
        var t = (d && d.message && d.message.content) || '';
        if (t && h.onDelta) h.onDelta(t);
        finish(d);
      });
    }
    var reader = res.body.getReader();
    var decoder = new TextDecoder();
    var buf = '';
    function line(raw) {
      var s = raw.trim();
      if (!s) return;
      var d = null;
      try { d = JSON.parse(s); } catch (e) { return; }
      if (d && d.error) { if (h.onError) h.onError(new Error(d.error)); return; }
      var piece = d && d.message && d.message.content;
      if (piece && h.onDelta) h.onDelta(piece);
      if (d && d.done) finish(d);
    }
    function pump() {
      return reader.read().then(function (r) {
        if (r.done) { if (buf.trim()) line(buf); finish(); return; }
        buf += decoder.decode(r.value, { stream: true });
        var i;
        while ((i = buf.indexOf('\n')) >= 0) { line(buf.slice(0, i)); buf = buf.slice(i + 1); }
        return pump();
      });
    }
    return pump();
  }

  function readOpenAI(res, h, finish) {
    if (!res.body || !res.body.getReader) {
      return res.json().then(function (d) {
        var t = '';
        try { t = d.choices[0].message.content || ''; } catch (e) {}
        if (t && h.onDelta) h.onDelta(t);
        finish(d);
      });
    }
    var reader = res.body.getReader();
    var decoder = new TextDecoder();
    var buf = '';
    function line(raw) {
      var s = raw.trim();
      if (!s || s.indexOf('data:') !== 0) return;
      var payload = s.slice(5).trim();
      if (!payload) return;
      if (payload === '[DONE]') { finish(); return; }
      var d = null;
      try { d = JSON.parse(payload); } catch (e) { return; }
      var choice = d && d.choices && d.choices[0];
      var piece = (choice && choice.delta && choice.delta.content) || (choice && choice.message && choice.message.content);
      if (piece && h.onDelta) h.onDelta(piece);
      if (choice && choice.finish_reason) finish(d);
    }
    function pump() {
      return reader.read().then(function (r) {
        if (r.done) { if (buf.trim()) line(buf); finish(); return; }
        buf += decoder.decode(r.value, { stream: true });
        var i;
        while ((i = buf.indexOf('\n')) >= 0) { line(buf.slice(0, i)); buf = buf.slice(i + 1); }
        return pump();
      });
    }
    return pump();
  }

  function call(ep, messages, h, signal) {
    var finished = false;
    function finish(d) {
      if (finished) return;
      finished = true;
      if (h.onDone) h.onDone(d || {});
    }
    var url;
    var headers = { 'Content-Type': 'application/json' };
    var body;
    if (ep.mode === 'openai') {
      url = chatUrl(ep.base);
      if (ep.key) headers.Authorization = 'Bearer ' + ep.key;
      body = { model: ep.model, messages: messages, stream: true, temperature: 0.4 };
    } else {
      url = ep.base + '/api/chat';
      body = { model: ep.model, messages: messages, stream: true, think: false, options: { temperature: 0.4 } };
    }
    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      signal: signal
    }).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (t) {
          var msg = 'HTTP ' + res.status;
          if (t) {
            var parsed = null;
            try { parsed = JSON.parse(t); } catch (e) {}
            var detail = parsed && ((parsed.error && (parsed.error.message || parsed.error)) || parsed.message);
            msg += '：' + String(detail || t).slice(0, 140);
          }
          var err = new Error(msg);
          err.status = res.status;
          err.provider = ep.label;
          throw err;
        });
      }
      return ep.mode === 'openai' ? readOpenAI(res, h, finish) : readOllama(res, h, finish);
    });
  }

  function stop() {
    if (abortCtrl) {
      try { abortCtrl.abort(); } catch (e) {}
      abortCtrl = null;
    }
  }

  function ask(messages, h) {
    h = h || {};
    var list = endpoints();
    if (!list.length) return Promise.reject(new Error('还没有配置可用的 AI 服务'));
    stop();
    var ctrl = null;
    try { ctrl = new AbortController(); } catch (e) {}
    abortCtrl = ctrl;
    var got = false;
    var wrapped = {
      onDelta: function (t) {
        if (t) got = true;
        if (h.onDelta) h.onDelta(t);
      },
      onDone: h.onDone,
      onError: h.onError
    };
    function attempt(i) {
      var ep = list[i];
      return call(ep, messages, wrapped, ctrl ? ctrl.signal : undefined).catch(function (err) {
        if (err && err.name === 'AbortError') throw err;
        if (!got && i + 1 < list.length) return attempt(i + 1);
        throw err;
      });
    }
    return attempt(0).then(function (r) {
      abortCtrl = null;
      return r;
    }, function (err) {
      abortCtrl = null;
      if (err && err.name === 'AbortError') {
        if (h.onDone) h.onDone({ aborted: true });
        return;
      }
      throw err;
    });
  }

  Z.ai = {
    cfg: cfg,
    setCfg: setCfg,
    resetCfg: resetCfg,
    ready: ready,
    which: which,
    endpoints: endpoints,
    models: models,
    testCloud: testCloud,
    ask: ask,
    stop: stop,
    blocked: mixedBlocked
  };
})(window.ZSB = window.ZSB || {});
