/* 练习系统：智能组卷 / 答题 / 错因归因 / 错题本 / 记忆卡 / 看讲解抽屉 */
(function (Z) {
  var ATTRS = [
    { key: 'concept', label: '概念不清' }, { key: 'formula', label: '公式记错' },
    { key: 'calc', label: '计算失误' }, { key: 'misread', label: '看错题' },
    { key: 'timeout', label: '时间不够' }, { key: 'careless', label: '粗心' }
  ];

  var session = null;
  var timerId = null;

  function attrLabel(key) {
    for (var i = 0; i < ATTRS.length; i++) if (ATTRS[i].key === key) return ATTRS[i].label;
    return key === 'unknown' ? '未归因' : (key || '未归因');
  }

  function allQuestions() {
    return Z.QUESTIONS.filter(function (q) {
      return q.type !== 'code' || (q.tests && q.tests.length);
    });
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function recentlyAnswered(days) {
    var cut = Date.now() - (days || 1) * 86400000;
    var set = {};
    Z.store.get().attempts.forEach(function (a) { if (a.ts >= cut) set[a.questionId] = 1; });
    return set;
  }

  function buildSmart(limit) {
    limit = limit || 10;
    var gaps = Z.engine.topGaps(8);
    var picked = [];
    var seen = {};
    var recent = recentlyAnswered(1);
    gaps.forEach(function (g) {
      var qs = Z.questionsOfKp(g.kp.id).filter(function (q) { return !recent[q.id]; });
      qs = shuffle(qs);
      for (var i = 0; i < qs.length && picked.length < limit; i++) {
        if (!seen[qs[i].id]) { picked.push(qs[i]); seen[qs[i].id] = 1; }
      }
    });
    if (picked.length < limit) {
      var rest = shuffle(allQuestions().filter(function (q) { return !seen[q.id] && !recent[q.id]; }));
      for (var j = 0; j < rest.length && picked.length < limit; j++) { picked.push(rest[j]); seen[rest[j].id] = 1; }
    }
    if (!picked.length) picked = shuffle(allQuestions()).slice(0, limit);
    return picked;
  }

  function buildFree(limit) {
    return shuffle(allQuestions()).slice(0, limit || 10);
  }

  function buildKp(kpId, limit) {
    var qs = Z.questionsOfKp(kpId);
    return shuffle(qs).slice(0, limit || qs.length);
  }

  function start(opts) {
    if (!opts.questions || !opts.questions.length) {
      Z.ui.toast('这个范围暂时没有题目');
      return;
    }
    session = {
      title: opts.title || '练习',
      mode: opts.mode || 'practice',
      questions: opts.questions.slice(0, opts.limit || 20),
      idx: 0,
      results: [],
      startTs: Date.now(),
      lastAttemptId: null,
      onClose: opts.onClose || null,
      finished: false
    };
    renderSession();
  }

  function overlay() {
    var root = document.getElementById('overlay-root');
    var el = document.getElementById('practice-session');
    if (!el) {
      el = document.createElement('div');
      el.id = 'practice-session';
      el.className = 'session-wrap';
      root.appendChild(el);
    }
    return el;
  }

  function renderSession() {
    if (!session) return;
    var el = overlay();
    var q = session.questions[session.idx];
    var total = session.questions.length;
    var elapsed = Z.ui.fmtTime(Date.now() - session.startTs);
    el.innerHTML = '<div class="session-shell">' +
      '<div class="session-head">' +
      '<button class="icon-btn" data-pclose aria-label="退出">' + Z.ui.icon('back') + '</button>' +
      '<div class="session-progress"><div class="session-title truncate">' + Z.ui.esc(session.title) + '</div>' +
      '<div class="reader-progress-line" style="margin:4px 0 0"><span>' + (session.idx + 1) + '/' + total + '</span>' +
      '<div class="progress thin"><i style="width:' + Math.round(((session.idx + 1) / total) * 100) + '%"></i></div></div></div>' +
      '<div class="exam-timer" data-timer>' + elapsed + '</div></div>' +
      '<div class="session-body">' +
      '<div class="chips mb12"><span class="chip accent">' + (q.subject ? Z.SUBJECTS[q.subject].name : '综合') + '</span>' +
      '<span class="chip">' + Z.ui.esc(Z.KP_BY_ID[q.kpIds[0]] ? Z.KP_BY_ID[q.kpIds[0]].title : '') + '</span>' +
      '<span class="chip">难度 ' + (q.difficulty || 3) + '/5</span></div>' +
      Z.question.render(q, {}) +
      '</div>' +
      '<div class="session-foot" data-session-foot></div>' +
      '</div>';
    var card = el.querySelector('.q-card');
    Z.question.bind(card, q, { mode: 'practice', onSubmit: onAnswer });
    el.querySelector('[data-pclose]').onclick = function () { closeSession(); };
    startTimer(el);
  }

  function startTimer(el) {
    clearInterval(timerId);
    timerId = setInterval(function () {
      var t = el.querySelector('[data-timer]');
      if (t) t.textContent = Z.ui.fmtTime(Date.now() - session.startTs);
    }, 1000);
  }

  function onAnswer(res, answer) {
    if (!session) return;
    var q = session.questions[session.idx];
    var attempt = Z.store.addAttempt({
      questionId: q.id, subject: q.subject, correct: res.correct, answer: answer,
      source: session.mode === 'exam' ? 'mock' : 'practice', mode: session.mode, errorType: null
    });
    session.lastAttemptId = attempt.id;
    session.results.push({ questionId: q.id, correct: res.correct, answer: answer, errorType: null, attemptId: attempt.id });

    var el = overlay();
    var card = el.querySelector('.q-card');
    var sub = card.querySelector('[data-submit]');
    if (sub) sub.remove();
    var fb = card.querySelector('[data-feedback]');
    if (res.kind === 'code' && !res.correct) {
      // code 反馈已由题目卡片渲染
    }
    var extra = '';
    if (!res.correct) {
      extra = '<div class="tiny amber mt8">先归因，再继续（必选）：</div><div class="attr-grid">' +
        ATTRS.map(function (a) { return '<button class="attr-chip" data-attr="' + a.key + '">' + a.label + '</button>'; }).join('') +
        '</div><button class="btn sm ghost mt8" data-drawer>看这个考点怎么讲</button>';
    }
    fb.innerHTML = '<div class="feedback ' + (res.correct ? 'ok' : 'bad') + '">' +
      (res.correct ? '回答正确。' : '回答错误。标准答案：' + Z.ui.esc(String(q.answer)) + '') +
      '<div class="ana">' + Z.ui.esc(q.analysis) + '</div>' + extra + '</div>';
    var foot = el.querySelector('[data-session-foot]');
    foot.innerHTML = '<button class="btn primary block" data-next' + (res.correct ? '' : ' disabled') + '>' +
      (session.idx + 1 >= session.questions.length ? '查看本轮结果' : '下一题') + '</button>';

    var drawer = fb.querySelector('[data-drawer]');
    if (drawer) drawer.onclick = function () { openLessonDrawer(q); };
    if (!res.correct) {
      fb.querySelectorAll('[data-attr]').forEach(function (chip) {
        chip.onclick = function () {
          fb.querySelectorAll('[data-attr]').forEach(function (c) { c.classList.remove('on'); });
          chip.classList.add('on');
          var r = session.results[session.results.length - 1];
          r.errorType = chip.dataset.attr;
          Z.store.update(function (s) {
            var a = s.attempts.filter(function (x) { return x.id === session.lastAttemptId; })[0];
            if (a) a.errorType = chip.dataset.attr;
          });
          foot.querySelector('[data-next]').removeAttribute('disabled');
        };
      });
    }
    foot.querySelector('[data-next]').onclick = function () {
      if (!res.correct) {
        var r = session.results[session.results.length - 1];
        if (!r.errorType) { Z.ui.toast('先选一个错因'); return; }
      }
      nextQuestion();
    };
  }

  function nextQuestion() {
    session.idx++;
    if (session.idx >= session.questions.length) return finishSession();
    renderSession();
  }

  function finishSession() {
    clearInterval(timerId);
    session.finished = true;
    var minutes = Math.max(1, Math.round((Date.now() - session.startTs) / 60000));
    Z.store.addSession({ type: 'practice', minutes: minutes, subject: session.questions[0] ? session.questions[0].subject : 'mixed' });
    var correct = session.results.filter(function (r) { return r.correct; }).length;
    var wrong = session.results.length - correct;
    var el = overlay();
    var list = session.results.map(function (r) {
      var q = Z.Q_BY_ID[r.questionId];
      return '<div class="row-between" style="padding:9px 0;border-bottom:1px solid var(--line-soft)">' +
        '<div style="min-width:0"><span class="' + (r.correct ? 'green' : 'red') + '">' + (r.correct ? '✓' : '✕') + '</span> ' +
        '<span class="small">' + Z.ui.esc(q.stem.replace(/\n/g, ' ').slice(0, 34)) + '…</span>' +
        (r.correct ? '' : '<div class="tiny faint">错因：' + attrLabel(r.errorType) + '</div>') + '</div>' +
        '<button class="link-btn" data-review="' + r.questionId + '">看讲解</button></div>';
    }).join('');
    el.innerHTML = '<div class="session-shell"><div class="session-head">' +
      '<button class="icon-btn" data-pclose>' + Z.ui.icon('back') + '</button>' +
      '<div class="session-progress"><div class="session-title">本轮结果</div></div><div class="exam-timer">' + Z.ui.fmtTime(Date.now() - session.startTs) + '</div></div>' +
      '<div class="session-body"><div class="card accent-card" style="text-align:center">' +
      '<div class="report-score" style="justify-content:center"><b>' + Math.round((correct / session.results.length) * 100) + '</b><span class="muted">分</span></div>' +
      '<div class="small muted">' + session.results.length + ' 题 · 正确 ' + correct + ' · 错误 ' + wrong + ' · 用时 ' + Z.ui.fmtMinutes(minutes) + '</div>' +
      (wrong ? '<div class="tiny amber mt8">' + wrong + ' 道错题已进入错题本，去「练习 → 错题本」可以重做。</div>' : '<div class="tiny green mt8">全部正确，保持。</div>') +
      '</div><div class="card mt12">' + list + '</div></div>' +
      '<div class="session-foot"><button class="btn ghost" data-again>再来一组</button><button class="btn primary" data-done>完成</button></div></div>';
    el.querySelectorAll('[data-review]').forEach(function (b) {
      b.onclick = function () { openLessonDrawer(Z.Q_BY_ID[b.dataset.review]); };
    });
    el.querySelector('[data-pclose]').onclick = closeSession;
    el.querySelector('[data-done]').onclick = closeSession;
    el.querySelector('[data-again]').onclick = function () {
      var title = session.title, mode = session.mode, onClose = session.onClose;
      closeSession(false);
      start({ questions: buildSmart(10), title: title, mode: mode, onClose: onClose });
    };
  }

  function closeSession(silent) {
    clearInterval(timerId);
    if (session && !session.finished) {
      var minutes = Math.max(1, Math.round((Date.now() - session.startTs) / 60000));
      Z.store.addSession({ type: 'practice', minutes: minutes, subject: session.questions[0] ? session.questions[0].subject : 'mixed' });
    }
    if (session && session.onClose) session.onClose();
    var el = document.getElementById('practice-session');
    if (el) el.remove();
    session = null;
  }

  function wrongGroups() {
    var state = Z.store.get();
    var byQ = {};
    state.attempts.forEach(function (a) {
      if (!byQ[a.questionId]) byQ[a.questionId] = { attempts: [], q: Z.Q_BY_ID[a.questionId] };
      byQ[a.questionId].attempts.push(a);
    });
    var list = [];
    Object.keys(byQ).forEach(function (qid) {
      var g = byQ[qid];
      if (!g.q) return;
      var sorted = g.attempts.sort(function (a, b) { return a.ts - b.ts; });
      var lastWrongIdx = -1;
      sorted.forEach(function (a, i) { if (!a.correct) lastWrongIdx = i; });
      if (lastWrongIdx < 0) return;
      var after = sorted.slice(lastWrongIdx + 1);
      var correctAfter = after.filter(function (a) { return a.correct; }).length;
      if (correctAfter >= 2) return; // 已掌握，移出
      var lastWrong = sorted[lastWrongIdx];
      list.push({ q: g.q, errorType: lastWrong.errorType, ts: lastWrong.ts, wrongCount: sorted.filter(function (a) { return !a.correct; }).length, mastered: correctAfter });
    });
    return list.sort(function (a, b) { return b.ts - a.ts; });
  }

  function renderWrongbook(container) {
    var groups = wrongGroups();
    if (!groups.length) {
      container.innerHTML = Z.ui.empty('wrong', '错题本是空的', '去做几道题，错题会自动收进来；连续答对 2 次后自动移出。',
        '<button class="btn primary" data-go-smart>去智能练习</button>');
      var b = container.querySelector('[data-go-smart]');
      if (b) b.onclick = function () { start({ questions: buildSmart(10), title: '智能补弱' }); };
      return;
    }
    container.innerHTML = '<div class="stack">' +
      '<div class="card pad-sm"><div class="row-between"><div><b>' + groups.length + ' 道待消化错题</b>' +
      '<div class="tiny faint mt8">连续答对 2 次自动移出；错因用于生成失分画像。</div></div>' +
      '<button class="btn sm primary" data-redo-all>全部重做</button></div></div>' +
      groups.map(function (g) {
        return '<div class="card pad-sm"><div class="row-between"><div class="chips">' +
          '<span class="chip">' + Z.ui.esc(Z.SUBJECTS[g.q.subject].name) + '</span>' +
          '<span class="chip red">错 ' + g.wrongCount + ' 次</span>' +
          '<span class="chip amber">' + attrLabel(g.errorType) + '</span>' +
          (g.mastered ? '<span class="chip green">已对 ' + g.mastered + '/2</span>' : '') + '</div></div>' +
          '<div class="small mt8">' + Z.ui.esc(g.q.stem.replace(/\n/g, ' ').slice(0, 72)) + '…</div>' +
          '<div class="btn-row mt8"><button class="btn sm ghost" data-review="' + g.q.id + '">看讲解</button>' +
          '<button class="btn sm primary" data-redo="' + g.q.id + '">重做</button></div></div>';
      }).join('') + '</div>';
    container.querySelector('[data-redo-all]').onclick = function () {
      start({ questions: groups.map(function (g) { return g.q; }), title: '错题重做' });
    };
    container.querySelectorAll('[data-review]').forEach(function (b) {
      b.onclick = function () { openLessonDrawer(Z.Q_BY_ID[b.dataset.review]); };
    });
    container.querySelectorAll('[data-redo]').forEach(function (b) {
      b.onclick = function () { start({ questions: [Z.Q_BY_ID[b.dataset.redo]], title: '错题重做' }); };
    });
  }

  function renderCards(container) {
    var state = Z.store.get();
    var due = Z.fsrs.dueCards(state);
    var all = state.cards.slice().sort(function (a, b) { return a.due - b.due; });
    if (!all.length) {
      container.innerHTML = Z.ui.empty('cards', '还没有记忆卡', '在讲义里点「加卡片」，或完成小结时把公式加入卡盒。', '');
      return;
    }
    var card = due[0] || null;
    var reviewHtml = '';
    if (card) {
      reviewHtml = '<div class="card accent-card"><div class="chips"><span class="chip accent">今日到期</span>' +
        '<span class="chip">' + due.length + ' 张待复习</span><span class="chip">已复习 ' + card.reps + ' 次</span></div>' +
        '<div class="block-text mt12" style="font-size:16px;min-height:52px">' + Z.ui.md(card.front) + '</div>' +
        '<div class="divider"></div>' +
        '<div id="card-back" class="small muted">先在心里回答，再显示答案。</div>' +
        '<div class="btn-row mt12"><button class="btn primary" data-flip>显示答案</button></div>' +
        '<div class="btn-row mt12 hidden" data-ratings>' +
        '<button class="btn sm ghost" data-rate="1">忘了</button>' +
        '<button class="btn sm ghost" data-rate="2">有点难</button>' +
        '<button class="btn sm ghost" data-rate="3">记得</button>' +
        '<button class="btn sm ghost" data-rate="4">简单</button></div></div>';
    } else {
      reviewHtml = '<div class="card"><b>今天没有到期卡片</b><div class="tiny faint mt8">下一张到期时间：' +
        (all[0] ? new Date(all[0].due).toLocaleString() : '—') + '</div></div>';
    }
    container.innerHTML = '<div class="stack">' + reviewHtml +
      '<div class="card"><div class="row-between"><b>卡盒</b><span class="tiny faint">' + all.length + ' 张</span></div>' +
      all.slice(0, 30).map(function (c) {
        return '<div class="note-item"><div class="small">' + Z.ui.md(c.front) + '</div>' +
          '<div class="tiny faint">下次：' + Z.ui.fmtDate(c.due) + ' · 复习 ' + c.reps + ' 次</div></div>';
      }).join('') + '</div></div>';
    var flip = container.querySelector('[data-flip]');
    if (flip) {
      flip.onclick = function () {
        container.querySelector('#card-back').innerHTML = '<b>答案</b><div class="mt8">' + Z.ui.md(card.back) + '</div>' +
          '<div class="tiny faint mt8">预计下次间隔：忘了 5 分钟 / 有点难 1 天 / 记得 2 天 / 简单 4 天起</div>';
        container.querySelector('[data-ratings]').classList.remove('hidden');
        flip.parentNode.classList.add('hidden');
      };
      container.querySelectorAll('[data-rate]').forEach(function (b) {
        b.onclick = function () {
          Z.store.reviewCard(card.id, Number(b.dataset.rate));
          Z.ui.toast('已加入复习计划');
          renderCards(container);
        };
      });
    }
  }

  /* ---------- 看讲解抽屉 ---------- */
  function openLessonDrawer(q) {
    if (!q) return;
    var anchor = q.lessonAnchor || {};
    var lesson = Z.LESSON_BY_ID[anchor.lessonId] || Z.lessonsOfKp(q.kpIds[0])[0];
    if (!lesson) {
      Z.ui.toast('这个考点暂时还没有讲义');
      return;
    }
    var start = typeof anchor.blockIndex === 'number' ? anchor.blockIndex : 0;
    start = Math.max(0, Math.min(lesson.sections.length - 1, start));
    var idx = start;
    var sheet = Z.ui.sheet({
      title: '看这个考点怎么讲',
      body: '<div id="drawer-content"></div>',
      foot: '<button class="btn ghost" data-close>我已看懂，继续做题</button>' +
        '<button class="btn primary" data-full>去学完整讲义</button>'
    });
    var content = sheet.el.querySelector('#drawer-content');
    function draw() {
      var block = lesson.sections[idx];
      var html = '<div class="chips mb12"><span class="chip accent">' + Z.ui.esc(lesson.title) + '</span>' +
        '<span class="chip">第 ' + (idx + 1) + '/' + lesson.sections.length + ' 块</span></div>' +
        Z.blocks.renderBlock(block, { lesson: lesson, index: idx });
      if (block.type === 'quiz') {
        html += '<div class="tiny faint mt8">抽屉里也可以直接做这道小问。</div>';
      }
      html += '<div class="btn-row mt12">' + (idx > 0 ? '<button class="btn sm ghost" data-prev>上一块</button>' : '') +
        (idx < lesson.sections.length - 1 ? '<button class="btn sm primary" data-next>继续看下一块</button>' : '<span class="tiny faint">已经是最后一块</span>') +
        '</div>';
      content.innerHTML = html;
      Z.blocks.bindCode(content);
      var wrap = content.querySelector('[data-quiz-wrap]');
      if (wrap) Z.blocks.bindQuiz(wrap, block, lesson, function (c, reason) { if (reason !== 'prior') draw(); });
      var prev = content.querySelector('[data-prev]');
      var next = content.querySelector('[data-next]');
      if (prev) prev.onclick = function () { idx--; draw(); };
      if (next) next.onclick = function () { idx++; draw(); };
    }
    draw();
    sheet.el.querySelector('[data-close]').onclick = sheet.close;
    sheet.el.querySelector('[data-full]').onclick = function () {
      sheet.close();
      location.hash = '#/lesson/' + lesson.id;
    };
  }

  Z.practice = {
    start: start,
    closeSession: closeSession,
    buildSmart: buildSmart,
    buildFree: buildFree,
    buildKp: buildKp,
    allQuestions: allQuestions,
    wrongGroups: wrongGroups,
    renderWrongbook: renderWrongbook,
    renderCards: renderCards,
    openLessonDrawer: openLessonDrawer,
    attrLabel: attrLabel,
    ATTRS: ATTRS
  };
})(window.ZSB = window.ZSB || {});
