/* AI 助教界面：右下角悬浮入口 + 题目内「问 AI」按钮 + 设置面板 */
(function (Z) {
  if (!window.ZSB) window.ZSB = {};
  var history = [];
  var busy = false;
  var activeCard = null;
  var pendingCtx = '';
  var els = {};

  var CSS = [
    '.ai-fab{position:fixed;right:16px;bottom:calc(84px + var(--safe-bottom));z-index:46;',
    'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;width:56px;height:56px;',
    'border-radius:50%;border:1px solid rgba(124,156,255,.45);background:linear-gradient(140deg,var(--accent),var(--accent-2));',
    'color:#06102a;box-shadow:0 12px 28px rgba(84,132,255,.38);font-weight:800;padding:0}',
    '.ai-fab b{font-size:16px;line-height:1}',
    '.ai-fab span{font-size:9px;letter-spacing:1px}',
    'body.immersive .ai-fab{bottom:calc(20px + var(--safe-bottom))}',
    '.ai-fab.hide{display:none}',
    '[hidden]{display:none!important}',
    '.ai-panel{position:fixed;right:16px;bottom:calc(150px + var(--safe-bottom));z-index:60;width:390px;max-width:calc(100vw - 32px);',
    'height:min(70vh,560px);display:flex;flex-direction:column;background:var(--panel);border:1px solid var(--line);',
    'border-radius:18px;box-shadow:var(--shadow);overflow:hidden}',
    '.ai-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 12px;',
    'border-bottom:1px solid var(--line-soft);background:var(--panel-2);flex:none}',
    '.ai-brand{display:flex;align-items:center;gap:7px;font-size:13.5px;min-width:0}',
    '.ai-dot{width:7px;height:7px;border-radius:50%;background:var(--text-faint);flex:none}',
    '.ai-dot.on{background:var(--green);box-shadow:0 0 8px rgba(61,220,151,.7)}',
    '.ai-model{font-size:10.5px;color:var(--text-faint);max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.ai-acts{display:flex;gap:4px;flex:none}',
    '.ai-acts button{border:0;background:transparent;color:var(--text-dim);font-size:11.5px;padding:4px 6px;border-radius:8px}',
    '.ai-acts button:hover{background:rgba(124,156,255,.12);color:var(--text)}',
    '.ai-msgs{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:9px;background:var(--bg-soft)}',
    '.ai-msg{max-width:90%;padding:9px 12px;border-radius:14px;font-size:13.5px;line-height:1.62;word-break:break-word}',
    '.ai-msg.u{align-self:flex-end;background:linear-gradient(140deg,var(--accent),var(--accent-2));color:#06102a;border-bottom-right-radius:5px}',
    '.ai-msg.a{align-self:flex-start;background:var(--panel);border:1px solid var(--line-soft);border-bottom-left-radius:5px}',
    '.ai-msg.e{align-self:flex-start;background:rgba(255,107,122,.12);border:1px solid rgba(255,107,122,.35);color:var(--red);font-size:12.5px}',
    '.ai-msg code.inline{background:rgba(124,156,255,.16);padding:1px 5px;border-radius:5px;font-size:12.5px}',
    '.ai-code{margin:6px 0;padding:8px 10px;border-radius:10px;background:#080e1c;border:1px solid var(--line);',
    'overflow:auto;font-size:12px;line-height:1.5;font-family:ui-monospace,Consolas,monospace;white-space:pre}',
    'html[data-theme="light"] .ai-code{background:#f2f5ff}',
    '.ai-cursor{display:inline-block;width:6px;margin-left:2px;animation:aiBlink 1s steps(2) infinite}',
    '@keyframes aiBlink{0%,49%{opacity:1}50%,100%{opacity:0}}',
    '.ai-quick{display:flex;gap:6px;overflow-x:auto;padding:7px 10px;border-top:1px solid var(--line-soft);flex:none}',
    '.ai-quick button{flex:none;font-size:11.5px;padding:5px 10px;border-radius:999px;border:1px solid var(--line);',
    'background:transparent;color:var(--text-dim)}',
    '.ai-quick button:hover{color:var(--text);border-color:var(--accent)}',
    '.ai-composer{border-top:1px solid var(--line-soft);flex:none}',
    '.ai-composer textarea{width:100%;border:0;outline:none;background:transparent;resize:none;padding:9px 12px 4px;',
    'font-size:14px;line-height:1.55;max-height:110px}',
    '.ai-send-row{display:flex;align-items:center;gap:8px;padding:0 10px 9px}',
    '.ai-ctx{flex:1;font-size:11px;color:var(--text-faint);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.ai-send{border:0;border-radius:10px;padding:7px 16px;font-size:13px;font-weight:700;',
    'background:linear-gradient(140deg,var(--accent),var(--accent-2));color:#06102a}',
    '.ai-send.stop{background:rgba(255,107,122,.16);color:var(--red);border:1px solid rgba(255,107,122,.4)}',
    '.ai-set{position:absolute;inset:0;background:var(--panel);padding:12px 14px;overflow-y:auto;z-index:2}',
    '.ai-set label{display:block;font-size:12px;color:var(--text-dim);margin:11px 0 4px}',
    '.ai-set input{width:100%;padding:9px 10px;border-radius:10px;border:1px solid var(--line);',
    'background:var(--bg-soft);font-size:13px;outline:none}',
    '.ai-set input:focus{border-color:var(--accent)}',
    '.ai-row{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}',
    '.ai-row button{border:1px solid var(--line);background:transparent;color:var(--text-dim);border-radius:10px;',
    'padding:7px 12px;font-size:12.5px}',
    '.ai-row button.p{background:var(--accent);border-color:var(--accent);color:var(--accent-ink);font-weight:700}',
    '.ai-hint{font-size:11.5px;color:var(--text-faint);line-height:1.55;margin:9px 0 0}',
    '.ai-hint.warn{color:var(--amber)}',
    '.ai-hint.ok{color:var(--green)}',
    '.q-ai-row{margin-top:10px;display:flex;justify-content:flex-end}',
    '.q-ai-row .btn{font-size:12.5px}',
    '@media (max-width:640px){',
    '.ai-panel{left:8px;right:8px;bottom:calc(8px + var(--safe-bottom));width:auto;height:76vh;max-width:none;border-radius:16px}',
    '.ai-fab{right:12px}}'
  ].join('');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* 轻量 markdown：代码块 + 粗体 + 行内代码 + 行内公式，其余按纯文本 */
  function mdRich(text) {
    var raw = String(text || '');
    if (((raw.match(/```/g) || []).length) % 2 === 1) raw += '\n```';
    var out = '';
    var re = /```[^\n]*\n?([\s\S]*?)```/g;
    var last = 0;
    var m;
    while ((m = re.exec(raw))) {
      out += mdText(raw.slice(last, m.index));
      out += '<pre class="ai-code"><code>' + esc(m[1].replace(/\n$/, '')) + '</code></pre>';
      last = m.index + m[0].length;
    }
    out += mdText(raw.slice(last));
    return out;
  }
  function mdText(s) {
    if (!s) return '';
    s = s.replace(/^\s*[-*]\s+/gm, '• ');
    return Z.ui && Z.ui.md ? Z.ui.md(s) : esc(s).replace(/\n/g, '<br>');
  }
  function plain(s) {
    return String(s == null ? '' : s).replace(/\*\*/g, '').replace(/`/g, '').replace(/\n+/g, ' ');
  }

  function buildStyle() {
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function buildDom() {
    var fab = document.createElement('button');
    fab.type = 'button';
    fab.id = 'aiFab';
    fab.className = 'ai-fab';
    fab.innerHTML = '<b>AI</b><span>助教</span>';
    fab.title = '问 AI 助教';
    document.body.appendChild(fab);

    var panel = document.createElement('div');
    panel.id = 'aiPanel';
    panel.className = 'ai-panel';
    panel.hidden = true;
    panel.innerHTML =
      '<div class="ai-head">' +
        '<div class="ai-brand"><span class="ai-dot" id="aiDot"></span><b>AI 助教</b>' +
          '<span class="ai-model" id="aiModelChip">未配置</span></div>' +
        '<div class="ai-acts">' +
          '<button type="button" data-ai-act="settings">设置</button>' +
          '<button type="button" data-ai-act="clear">清空</button>' +
          '<button type="button" data-ai-act="close">×</button>' +
        '</div>' +
      '</div>' +
      '<div class="ai-msgs" id="aiMsgs"></div>' +
      '<div class="ai-quick" id="aiQuick"></div>' +
      '<div class="ai-composer">' +
        '<textarea id="aiInput" rows="2" placeholder="输入问题，Enter 发送，Shift+Enter 换行"></textarea>' +
        '<div class="ai-send-row"><span class="ai-ctx" id="aiCtx">无上下文</span>' +
          '<button type="button" class="ai-send" id="aiSend">发送</button></div>' +
      '</div>' +
      '<div class="ai-set" id="aiSet" hidden>' +
        '<p class="ai-hint"><b>云端接口</b>（推荐：你的电脑关机也能用）</p>' +
        '<label>接口地址</label>' +
        '<input id="aiCloudBase" placeholder="https://api.siliconflow.cn/v1" />' +
        '<label>API Key</label>' +
        '<input id="aiCloudKey" placeholder="sk-..." />' +
        '<label>模型</label>' +
        '<input id="aiCloudModel" placeholder="Qwen/Qwen2.5-7B-Instruct" />' +
        '<div class="ai-row"><button type="button" data-ai-act="testCloud">测试云端</button></div>' +
        '<p class="ai-hint"><b>本机 Ollama</b>（可选：只在电脑开着、网络可达时生效）</p>' +
        '<label>服务地址</label>' +
        '<input id="aiLocalBase" placeholder="http://localhost:11434" />' +
        '<label>模型</label>' +
        '<input id="aiLocalModel" list="aiModelList" placeholder="qwen3-8b:latest" />' +
        '<datalist id="aiModelList"></datalist>' +
        '<div class="ai-row"><button type="button" data-ai-act="models">拉取本机模型</button>' +
          '<button type="button" data-ai-act="testLocal">测试本机</button></div>' +
        '<p class="ai-hint" id="aiSetHint">先填云端；云端连不上时会自动改用本机。</p>' +
        '<div class="ai-row"><button type="button" class="p" data-ai-act="save">保存</button>' +
          '<button type="button" data-ai-act="reset">恢复默认</button>' +
          '<button type="button" data-ai-act="back">返回对话</button></div>' +
        '<p class="ai-hint">线上 https 页面不能直连 http://localhost，本机地址只在本地打开或离线版里有效。</p>' +
      '</div>';
    document.body.appendChild(panel);

    els = {
      fab: fab,
      panel: panel,
      msgs: document.getElementById('aiMsgs'),
      input: document.getElementById('aiInput'),
      send: document.getElementById('aiSend'),
      ctx: document.getElementById('aiCtx'),
      dot: document.getElementById('aiDot'),
      modelChip: document.getElementById('aiModelChip'),
      quick: document.getElementById('aiQuick'),
      set: document.getElementById('aiSet'),
      cloudBase: document.getElementById('aiCloudBase'),
      cloudKey: document.getElementById('aiCloudKey'),
      cloudModel: document.getElementById('aiCloudModel'),
      localBase: document.getElementById('aiLocalBase'),
      localModel: document.getElementById('aiLocalModel'),
      list: document.getElementById('aiModelList'),
      setHint: document.getElementById('aiSetHint')
    };
  }

  function refreshState() {
    var ok = !!(Z.ai && Z.ai.ready && Z.ai.ready());
    els.dot.className = 'ai-dot' + (ok ? ' on' : '');
    els.modelChip.textContent = ok ? Z.ai.which() : '未配置';
    var list = ok ? Z.ai.endpoints() : [];
    els.modelChip.title = list.length ? (list[0].base || '') : '';
  }

  function addMsg(kind, text) {
    var div = document.createElement('div');
    div.className = 'ai-msg ' + kind;
    div.innerHTML = kind === 'a' ? mdRich(text) : esc(text);
    els.msgs.appendChild(div);
    els.msgs.scrollTop = els.msgs.scrollHeight;
    return div;
  }

  function openPanel() {
    els.panel.hidden = false;
    refreshState();
    syncCtxChip();
    if (!history.length && !els.msgs.childElementCount) {
      addMsg('a', '我是你的 AI 助教。做题卡住时点题目右下角的「问 AI」，或者直接在这里提问。');
    }
    setTimeout(function () { try { els.input.focus(); } catch (e) {} }, 30);
  }
  function closePanel() {
    els.panel.hidden = true;
    Z.ai && Z.ai.stop && Z.ai.stop();
  }
  function togglePanel() { els.panel.hidden ? openPanel() : closePanel(); }

  function findQ(id) {
    var list = (Z.QUESTIONS || []);
    for (var i = 0; i < list.length; i++) if (list[i] && list[i].id === id) return list[i];
    return null;
  }
  function kpName(id) {
    var list = (Z.KPS || []);
    for (var i = 0; i < list.length; i++) if (list[i] && list[i].id === id) return list[i].name;
    return '';
  }
  function subjectName(s) {
    return (Z.SUBJECTS && Z.SUBJECTS[s] && Z.SUBJECTS[s].name) || '';
  }

  function questionFromCard(card) {
    if (!card) return null;
    return findQ(card.getAttribute('data-qid'));
  }

  function contextOf() {
    var bits = [];
    var hash = location.hash || '#/today';
    var parts = hash.replace(/^#\//, '').split('/');
    var names = { today: '今日', study: '学习地图', practice: '练习', exam: '模考', me: '我的', lesson: '讲义', notes: '错题本', algo: '算法练习', layers: '分层练习' };
    bits.push('页面：' + (names[parts[0]] || parts[0]));
    var card = (activeCard && document.body.contains(activeCard)) ? activeCard : document.querySelector('.q-card[data-qid]');
    var q = questionFromCard(card);
    if (q) {
      bits.push('科目：' + subjectName(q.subject));
      var kp = kpName(q.kpIds && q.kpIds[0]);
      if (kp) bits.push('考点：' + kp);
      bits.push('题干：' + plain(q.stem));
      if (q.options && q.options.length) {
        bits.push('选项：' + q.options.map(function (o) { return o.key + '. ' + plain(o.text); }).join('；'));
      }
      if (q.analysis) bits.push('官方解析：' + plain(q.analysis));
    } else {
      var head = document.querySelector('#view h1, #view h2, #view .card-title, #view .lesson-title');
      if (head) bits.push('当前内容：' + plain(head.textContent).slice(0, 140));
    }
    return bits.join('\n');
  }

  function syncCtxChip() {
    var card = (activeCard && document.body.contains(activeCard)) ? activeCard : document.querySelector('.q-card[data-qid]');
    var q = questionFromCard(card);
    els.ctx.textContent = q ? ('已带上当前题目 · ' + (kpName(q.kpIds && q.kpIds[0]) || q.id)) : '无题目上下文';
  }

  function setBusy(v) {
    busy = v;
    els.send.textContent = v ? '停止' : '发送';
    els.send.classList.toggle('stop', v);
  }

  function send(text) {
    var q = String(text || '').trim();
    if (!q) return;
    if (busy) { Z.ai.stop(); return; }
    if (!Z.ai.ready()) {
      openSettings();
      els.setHint.className = 'ai-hint warn';
      els.setHint.textContent = '先填服务地址并选一个模型，保存后再提问。';
      return;
    }
    var ctx = contextOf();
    if (pendingCtx) {
      ctx = '用户当前看不懂的讲义片段（请重点讲解这一段，不要跑题）：\n' + pendingCtx +
        (ctx ? '\n' + ctx : '');
      pendingCtx = '';
    }
    var reply = addMsg('a', '');
    reply.innerHTML = '<span class="ai-cursor">▍</span>';
    setBusy(true);
    history.push({ role: 'user', content: q });
    if (history.length > 20) history = history.slice(-16);
    var msgs = [{ role: 'system', content: Z.ai.cfg().system }];
    if (ctx) msgs.push({ role: 'system', content: '当前学习上下文（供参考，不要原文照抄）：\n' + ctx });
    msgs = msgs.concat(history);
    var acc = '';
    Z.ai.ask(msgs, {
      onDelta: function (piece) {
        acc += piece;
        reply.innerHTML = mdRich(acc) + '<span class="ai-cursor">▍</span>';
        els.msgs.scrollTop = els.msgs.scrollHeight;
      },
      onDone: function (d) {
        setBusy(false);
        reply.innerHTML = mdRich(acc) || '<span class="ai-ctx">（没有返回内容，换个问法试试）</span>';
        if (acc) history.push({ role: 'assistant', content: acc });
        if (history.length > 20) history = history.slice(-16);
        els.msgs.scrollTop = els.msgs.scrollHeight;
      },
      onError: function (err) {
        setBusy(false);
        reply.className = 'ai-msg e';
        reply.textContent = '出错了：' + (err && err.message ? err.message : '未知错误');
      }
    }).catch(function (err) {
      setBusy(false);
      reply.className = 'ai-msg e';
      reply.textContent =
        '连不上 AI：' + (err && err.message ? err.message : '未知错误') +
        '\n可能原因：云端 Key/地址/模型名不对，或本机 Ollama 没开。点右上角「设置」检查。';
    });
  }

  function openSettings() {
    var c = Z.ai.cfg();
    els.cloudBase.value = c.cloud.base;
    els.cloudKey.value = c.cloud.key;
    els.cloudModel.value = c.cloud.model;
    els.localBase.value = c.local.base;
    els.localModel.value = c.local.model;
    els.set.hidden = false;
    els.setHint.className = 'ai-hint';
    els.setHint.textContent = '云端填好之后所有人都能用；云端失败会自动改用本机（如果本机可达）。';
  }
  function closeSettings() { els.set.hidden = true; }

  function fillModels(list) {
    els.list.innerHTML = list.map(function (m) { return '<option value="' + esc(m) + '"></option>'; }).join('');
    if (list.length && !els.localModel.value.trim()) els.localModel.value = list[0];
  }

  function hint(text, kind) {
    els.setHint.className = 'ai-hint' + (kind ? ' ' + kind : '');
    els.setHint.textContent = text;
  }

  function doModels() {
    hint('正在连接本机…');
    Z.ai.models(els.localBase.value).then(function (list) {
      fillModels(list);
      hint(list.length ? ('本机连接成功，找到 ' + list.length + ' 个模型，已填入第一个。') : '本机连接成功，但还没安装模型。先执行 ollama pull qwen3-8b。', 'ok');
    }).catch(function (err) {
      hint('本机连不上：' + err.message + '。确认 Ollama 在运行且地址端口正确。', 'warn');
    });
  }

  function doTestLocal() {
    hint('正在测试本机…');
    Z.ai.models(els.localBase.value).then(function (list) {
      hint('本机连接正常，可用模型 ' + list.length + ' 个。', 'ok');
    }).catch(function (err) {
      hint('本机测试失败：' + err.message, 'warn');
    });
  }

  function doTestCloud() {
    var base = els.cloudBase.value.trim();
    if (!base) { hint('先填写云端接口地址。', 'warn'); return; }
    hint('正在测试云端…');
    Z.ai.testCloud(base, els.cloudKey.value).then(function (list) {
      hint(list.length ? ('云端连接正常，可用模型 ' + list.length + ' 个。') : '云端连接正常。', 'ok');
      if (!epsModelFilled() && list.length) els.cloudModel.value = list[0];
    }).catch(function (err) {
      hint('云端测试失败：' + err.message + '。检查地址、Key 和该平台的跨域设置。', 'warn');
    });
  }

  function epsModelFilled() {
    return !!els.cloudModel.value.trim();
  }

  function doSave() {
    var cloudBase = els.cloudBase.value.trim();
    var cloudKey = els.cloudKey.value.trim();
    var cloudModel = els.cloudModel.value.trim();
    var localBase = els.localBase.value.trim();
    var localModel = els.localModel.value.trim();
    if (cloudBase && !cloudModel) { hint('云端填了地址就要填模型名。', 'warn'); return; }
    if (cloudModel && !cloudBase) { hint('云端填了模型就要填接口地址。', 'warn'); return; }
    if (localModel && !localBase) { hint('本机填了模型就要填服务地址。', 'warn'); return; }
    if (!cloudBase && !localBase) { hint('至少配置一个：云端接口（推荐）或本机 Ollama。', 'warn'); return; }
    if (location.protocol === 'https:' && localBase && /^http:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)/i.test(localBase) && !cloudBase) {
      hint('线上 https 不能直连 http://localhost，只填本机等于没有可用 AI。请补云端接口，或改用离线版。', 'warn');
      return;
    }
    Z.ai.setCfg({
      cloud: { base: cloudBase, key: cloudKey, model: cloudModel },
      local: { base: localBase, model: localModel }
    });
    refreshState();
    refreshVisibility();
    closeSettings();
    if (Z.ui && Z.ui.toast) Z.ui.toast('AI 配置已保存');
  }

  function doReset() {
    Z.ai.resetCfg();
    openSettings();
    refreshState();
    hint('已恢复默认配置。');
  }

  function bind() {
    els.fab.addEventListener('click', togglePanel);
    els.send.addEventListener('click', function () {
      if (busy) { Z.ai.stop(); return; }
      var v = els.input.value;
      els.input.value = '';
      send(v);
    });
    els.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
        e.preventDefault();
        var v = els.input.value;
        els.input.value = '';
        send(v);
      }
    });
    els.panel.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-ai-act]') : null;
      if (!btn) return;
      var act = btn.getAttribute('data-ai-act');
      if (act === 'close') closePanel();
      else if (act === 'clear') {
        history = [];
        els.msgs.innerHTML = '';
        addMsg('a', '对话已清空，有新问题直接问。');
        refreshState();
      } else if (act === 'settings') openSettings();
      else if (act === 'models') doModels();
      else if (act === 'testLocal') doTestLocal();
      else if (act === 'testCloud') doTestCloud();
      else if (act === 'save') doSave();
      else if (act === 'reset') doReset();
      else if (act === 'back') closeSettings();
    });

    var quick = ['讲讲这道题', '这一步为什么', '换个更简单的例子', '总结这个考点', '出 3 道同类题'];
    els.quick.innerHTML = quick.map(function (t) {
      return '<button type="button" data-quick="' + esc(t) + '">' + esc(t) + '</button>';
    }).join('');
    els.quick.addEventListener('click', function (e) {
      var b = e.target.closest('[data-quick]');
      if (!b) return;
      send(b.getAttribute('data-quick'));
    });

    /* 题目卡片里的「问 AI」 */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-ask-ai]') : null;
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      var card = btn.closest('.q-card');
      if (card) activeCard = card;
      openPanel();
      syncCtxChip();
      send('这道题我不会，请按步骤讲思路，先别直接给答案。');
    }, true);

    window.addEventListener('hashchange', function () {
      activeCard = null;
      setTimeout(function () {
        syncCtxChip();
        refreshVisibility();
      }, 60);
    });
  }

  function refreshVisibility() {
    var hash = location.hash || '#/today';
    var parts = hash.replace(/^#\//, '').split('/');
    var inExam = parts[0] === 'exam' && parts[1] !== 'report';
    var onboarding = parts[0] === 'onboarding';
    /* 没配置就藏起来，避免访客点开看到设置面板；加 ?ai=1 可以强制显示用来配置 */
    var forceSetup = /[?&]ai=1(&|$)/.test(location.search);
    var show = !!((Z.ai && Z.ai.ready()) || forceSetup);
    els.fab.classList.toggle('hide', inExam || onboarding || !show);
    if ((inExam || onboarding) && !els.panel.hidden) closePanel();
  }

  buildStyle();
  buildDom();
  bind();
  refreshState();
  refreshVisibility();

  /* 带着一段讲义原文直接提问：返回 false 表示当前没有可用 AI */
  function askWithContext(ctxText, prompt) {
    if (!Z.ai || !Z.ai.ready || !Z.ai.ready()) return false;
    pendingCtx = String(ctxText || '').trim().slice(0, 2200);
    openPanel();
    send(prompt || '这块我没看懂，请用更通俗的话讲一遍，并举一个贴近考点的例子。');
    return true;
  }

  Z.aiUI = {
    open: openPanel,
    close: closePanel,
    ask: send,
    askWithContext: askWithContext,
    refresh: refreshState
  };
})(window.ZSB = window.ZSB || {});
