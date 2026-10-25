/* 学练一体阅读器：导入 → 学 → 例题 → 跟练 → 独立练 → 小结 */
(function (Z) {
  var STAGES = [
    { key: 'intro', name: '导入' },
    { key: 'learn', name: '学' },
    { key: 'demo', name: '例题' },
    { key: 'guided', name: '跟练' },
    { key: 'solo', name: '独立练' },
    { key: 'wrap', name: '小结' }
  ];
  var ATTRS = [
    { key: 'concept', label: '概念不清' }, { key: 'formula', label: '公式记错' },
    { key: 'calc', label: '计算失误' }, { key: 'misread', label: '看错题' },
    { key: 'timeout', label: '时间不够' }, { key: 'careless', label: '粗心' }
  ];

  var ctx = null;
  var view = null;
  var flashNext = false;

  function stageIndex(key) {
    for (var i = 0; i < STAGES.length; i++) if (STAGES[i].key === key) return i;
    return 0;
  }

  function flushTime() {
    if (!ctx || ctx.flushed) return;
    var minutes = Math.round((Date.now() - ctx.startTs) / 60000);
    if (minutes >= 1) {
      Z.store.addSession({ type: 'read', minutes: Math.min(minutes, 180), subject: ctx.lesson.subject });
      ctx.flushed = true;
    }
  }

  function goBack() {
    flushTime();
    location.hash = '#/study';
  }

  function mount(lessonId) {
    view = document.getElementById('view');
    document.body.classList.add('immersive');
    var lesson = Z.LESSON_BY_ID[lessonId];
    if (!lesson) {
      view.innerHTML = '<div class="empty">未找到该学习单元。<button class="btn primary mt12" data-act="back">返回</button></div>';
      return;
    }
    var unlock = Z.engine.lessonUnlock(lesson);
    if (!unlock.unlocked) {
      ctx = { lessonId: lessonId, lesson: lesson, locked: true };
      renderLocked(unlock);
      return;
    }

    var p = Z.store.progressFor(lessonId);
    if (p.status !== 'done' && p.status !== 'inProgress') p.status = 'inProgress';
    p.lastReadAt = Date.now();
    Z.store.upsertProgress(lessonId, p);

    ctx = {
      lessonId: lessonId,
      lesson: lesson,
      startTs: Date.now(),
      stage: p.stage || 'intro',
      blockIndex: p.blockIndex || 0,
      demoIndex: p.demoIndex || 0,
      demoStep: p.demoStep || 0,
      guidedIndex: p.guidedIndex || 0,
      guidedAttempts: {},
      guidedRevealed: false,
      soloIndex: p.soloIndex || 0,
      soloDone: false,
      lastAttemptId: null,
      soloFeedback: null,
      flushed: false
    };
    if (ctx.stage === 'intro' && (p.blockIndex > 0 || p.status === 'inProgress' && p.stage !== 'intro')) {
      ctx.stage = p.stage || 'learn';
    }
    render();
  }

  function savePos(patch) {
    var p = { stage: ctx.stage, blockIndex: ctx.blockIndex, demoIndex: ctx.demoIndex, demoStep: ctx.demoStep, guidedIndex: ctx.guidedIndex, soloIndex: ctx.soloIndex, lastReadAt: Date.now() };
    Object.assign(p, patch || {});
    Z.store.upsertProgress(ctx.lessonId, p);
  }

  function renderLocked(unlock) {
    var l = ctx.lesson;
    var html = headHtml(1) +
      '<div class="reader-body"><div class="card">' +
      '<div class="chips"><span class="chip amber">未解锁</span><span class="chip">' + Z.ui.esc(Z.levelMeta(l.subject, l.level).name) + '</span></div>' +
      '<h2 class="card-title mt12">' + Z.ui.esc(l.title) + '</h2>' +
      '<p class="muted small">' + Z.ui.esc(l.hook.body) + '</p>' +
      '<div class="lock-box mt12">' + Z.ui.esc(unlock.reason) + '</div>' +
      '<div class="btn-row mt16">' +
      '<button class="btn ghost" data-act="back">回学习地图</button>' +
      (unlock.prevLessonId ? '<button class="btn primary" data-act="go-prev" data-id="' + unlock.prevLessonId + '">去补上一课</button>' : '') +
      '</div>' +
      '<button class="link-btn mt12" data-act="force">我已了解，强制解锁</button>' +
      '</div></div>';
    view.innerHTML = html;
    bindLocked();
  }

  function headHtml(stageIdx) {
    var l = ctx.lesson;
    var pills = STAGES.map(function (s, i) {
      var cls = i === stageIdx ? 'on' : (i < stageIdx ? 'done' : '');
      return '<div class="stage-pill ' + cls + '"></div>';
    }).join('');
    var names = STAGES.map(function (s, i) {
      return '<span class="' + (i === stageIdx ? 'on' : (i < stageIdx ? 'done' : '')) + '">' + s.name + '</span>';
    }).join('');
    return '<div class="reader-head">' +
      '<div class="reader-top">' +
      '<button class="icon-btn" data-act="back" aria-label="返回">' + Z.ui.icon('back') + '</button>' +
      '<div class="reader-title truncate">' + Z.ui.esc(l.title) + '</div>' +
      '<button class="icon-btn" data-act="focus" aria-label="专注模式">' + Z.ui.icon('moon') + '</button>' +
      '</div>' +
      '<div class="stage-line">' + pills + '</div>' +
      '<div class="stage-names">' + names + '</div>' +
      '</div>';
  }

  function stageSummaryHtml(currentIdx) {
    if (currentIdx <= 0) return '';
    var cards = [];
    var p = Z.store.get().progress[ctx.lessonId] || {};
    for (var i = 0; i < currentIdx; i++) {
      var s = STAGES[i];
      var sub = '';
      if (s.key === 'intro') sub = '已看导入';
      if (s.key === 'learn') sub = '已读 ' + Math.min(ctx.blockIndex, ctx.lesson.sections.length) + '/' + ctx.lesson.sections.length + ' 块';
      if (s.key === 'demo') sub = '例题 ' + ctx.demoIndex + '/' + ctx.lesson.workedExamples.length;
      if (s.key === 'guided') sub = '跟练 ' + Math.min(ctx.guidedIndex, ctx.lesson.guidedPractice.length) + '/' + ctx.lesson.guidedPractice.length;
      if (s.key === 'solo') sub = '独立练 ' + Math.min(ctx.soloIndex, ctx.lesson.independentPractice.length + ctx.lesson.challenge.length);
      cards.push('<div class="stage-card" data-act="jump" data-stage="' + s.key + '">' +
        '<div class="done-mark">✓</div><div style="flex:1"><b>' + s.name + '</b><div>' + sub + '</div></div>' +
        '<span class="faint">›</span></div>');
    }
    return '<div class="stage-summary mt12">' + cards.join('') + '</div>';
  }

  function render() {
    if (!ctx || ctx.locked) return;
    if (ctx.stage === 'demo' && ctx.demoIndex >= ctx.lesson.workedExamples.length) ctx.stage = 'guided';
    if (ctx.stage === 'guided' && ctx.guidedIndex >= ctx.lesson.guidedPractice.length) ctx.stage = 'solo';
    if (ctx.stage === 'solo' && ctx.soloIndex >= ctx.lesson.independentPractice.length + ctx.lesson.challenge.length) ctx.stage = 'wrap';
    var idx = stageIndex(ctx.stage);
    var html = headHtml(idx) + '<div class="reader-body">' + stageSummaryHtml(idx);
    if (ctx.stage === 'intro') html += renderIntro();
    else if (ctx.stage === 'learn') html += renderLearn();
    else if (ctx.stage === 'demo') html += renderDemo();
    else if (ctx.stage === 'guided') html += renderGuided();
    else if (ctx.stage === 'solo') html += renderSolo();
    else if (ctx.stage === 'wrap') html += renderWrap();
    html += '</div>';
    view.innerHTML = html;
    bind();
    if (ctx.stage === 'learn') {
      var wrap = view.querySelector('[data-quiz-wrap]');
      if (wrap) Z.blocks.bindQuiz(wrap, ctx.lesson.sections[ctx.blockIndex], ctx.lesson, onQuizDone);
      Z.blocks.bindCode(view);
    }
    if (flashNext) {
      var flashEl = view.querySelector('.block-card');
      if (flashEl) flashEl.classList.add('flash');
      flashNext = false;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- 导入 ---------- */
  function renderIntro() {
    var l = ctx.lesson;
    var kps = l.kpIds.map(function (id) { return Z.KP_BY_ID[id]; }).filter(Boolean);
    return '<div class="card accent-card mt12">' +
      '<div class="chips"><span class="chip accent lv">' + Z.ui.esc(Z.levelMeta(l.subject, l.level).en) + ' · ' + Z.ui.esc(Z.levelMeta(l.subject, l.level).name) + '</span>' +
      '<span class="chip">约 ' + l.estMinutes + ' 分钟</span></div>' +
      '<h2 class="card-title mt12" style="font-size:18px">' + Z.ui.esc(l.hook.title) + '</h2>' +
      '<p class="muted" style="font-size:14px;line-height:1.75">' + Z.ui.esc(l.hook.body) + '</p>' +
      '<div class="divider"></div>' +
      '<div class="tiny faint">本课覆盖</div>' +
      '<div class="chips mt8">' + kps.map(function (kp) { return '<span class="chip">' + Z.ui.esc(kp.title) + '</span>'; }).join('') + '</div>' +
      '<div class="btn-row mt16"><button class="btn primary block" data-act="start">' + (ctx.blockIndex > 0 || ctx.stage !== 'intro' ? '继续学习' : '开始学习') + '</button></div>' +
      '<div class="tiny faint mt8" style="text-align:center">全程约 ' + l.estMinutes + ' 分钟，中途可以随时退出，进度会保存。</div>' +
      '</div>';
  }

  /* ---------- 学 ---------- */
  function renderLearn() {
    var l = ctx.lesson;
    var total = l.sections.length;
    var bi = Math.min(ctx.blockIndex, total - 1);
    var block = l.sections[bi];
    var answered = false;
    if (block.type === 'quiz') {
      var p = Z.store.get().progress[ctx.lessonId] || {};
      answered = !!(p.quizAnswers && p.quizAnswers[block.questionId]);
    }
    var html = '<div class="reader-progress-line"><span>讲解 ' + (bi + 1) + '/' + total + '</span>' +
      '<div class="progress"><i style="width:' + Math.round(((bi + 1) / total) * 100) + '%"></i></div></div>' +
      '<div id="reader-content">' + Z.blocks.renderBlock(block, { lesson: l, index: bi }) + '</div>' +
      '<div class="reader-foot">' +
      '<button class="btn ghost" data-act="confused">这块没看懂</button>' +
      '<button class="btn primary" data-act="learn-next"' + (!answered && block.type === 'quiz' ? ' disabled' : '') + '>' +
      (bi + 1 >= total ? '学完了，去例题' : '继续') + '</button>' +
      (!answered && block.type === 'quiz' ? '<div class="tiny faint" style="text-align:center">先回答上面的随堂小问，再继续</div>' : '') +
      '</div>';
    return html;
  }

  function onQuizDone(correct, reason) {
    if (reason === 'prior') return;
    if (reason === 'back') {
      var block = ctx.lesson.sections[ctx.blockIndex];
      var q = Z.Q_BY_ID[block.questionId];
      var target = q && q.lessonAnchor ? q.lessonAnchor.blockIndex : Math.max(0, ctx.blockIndex - 1);
      ctx.blockIndex = Math.min(target, ctx.lesson.sections.length - 1);
      flashNext = true;
      savePos();
      render();
      return;
    }
    // 回答后允许继续：更新底部按钮
    var foot = view.querySelector('[data-act="learn-next"]');
    if (foot) foot.removeAttribute('disabled');
    var hint = view.querySelector('.reader-foot .tiny');
    if (hint) hint.remove();
    var fb = view.querySelector('[data-quiz-wrap]');
    if (fb) {
      var old = view.querySelector('.reader-foot .btn.ghost[data-act="confused"]');
      if (old) old.textContent = '这块没看懂';
    }
  }

  function nextLearn() {
    var total = ctx.lesson.sections.length;
    var block = ctx.lesson.sections[ctx.blockIndex];
    if (block.type === 'quiz') {
      var p = Z.store.get().progress[ctx.lessonId] || {};
      if (!(p.quizAnswers && p.quizAnswers[block.questionId])) {
        Z.ui.toast('先回答这个小问，再继续');
        return;
      }
    }
    ctx.blockIndex++;
    if (ctx.blockIndex >= total) {
      ctx.stage = 'demo';
      ctx.blockIndex = total;
    }
    savePos();
    render();
  }

  /* ---------- 例题 ---------- */
  function renderDemo() {
    var l = ctx.lesson;
    var ex = l.workedExamples[ctx.demoIndex];
    if (!ex) { ctx.stage = 'guided'; savePos(); return renderGuided(); }
    var q = Z.Q_BY_ID[ex.questionId];
    var html = '<div class="reader-progress-line"><span>例题 ' + (ctx.demoIndex + 1) + '/' + l.workedExamples.length + '</span>' +
      '<div class="progress"><i style="width:' + Math.round(((ctx.demoIndex + 1) / l.workedExamples.length) * 100) + '%"></i></div></div>';
    html += '<div class="block-card"><div class="block-label">例题</div>' +
      '<div class="block-text">' + Z.ui.md(q ? q.stem : (ex.title || '')) + '</div>';
    var steps = ex.steps || [];
    for (var i = 0; i < Math.min(ctx.demoStep, steps.length); i++) {
      html += '<div class="demo-step"><b>第 ' + steps[i].no + ' 步</b><div class="mt8">' + Z.ui.md(steps[i].md) + '</div></div>';
    }
    if (ctx.demoStep < steps.length) {
      var st = steps[ctx.demoStep];
      if (st.askBefore) {
        html += '<div class="demo-ask">先想一下：' + Z.ui.esc(st.askBefore) + '</div>';
        html += '<div class="btn-row mt12"><button class="btn primary block" data-act="reveal-step">想好了，看这一步</button></div>';
      } else {
        html += '<div class="btn-row mt12"><button class="btn primary block" data-act="next-step">下一步</button></div>';
      }
      html += '<div class="tiny faint mt8" style="text-align:center">不提供「一键展开」，一步一步来更记得住。</div>';
    } else {
      html += '<div class="takeaway mt12"><b>这一步的收获：</b>' + Z.ui.md(ex.takeaway) + '</div>';
      html += '<div class="btn-row mt12"><button class="btn ghost" data-act="add-takeaway">加入套路卡</button>' +
        '<button class="btn primary" data-act="next-example">' + (ctx.demoIndex + 1 >= l.workedExamples.length ? '去跟练' : '下一道例题') + '</button></div>';
    }
    html += '</div>';
    return html;
  }

  /* ---------- 跟练 ---------- */
  function renderGuided() {
    var l = ctx.lesson;
    var items = l.guidedPractice || [];
    if (!items.length) { ctx.stage = 'solo'; savePos(); return renderSolo(); }
    var gi = Math.min(ctx.guidedIndex, items.length - 1);
    var item = items[gi];
    var q = Z.Q_BY_ID[item.questionId];
    if (!q) { ctx.guidedIndex = gi + 1; savePos(); return renderGuided(); }
    var st = ctx.guidedAttempts[q.id] || (ctx.guidedAttempts[q.id] = { tries: 0, done: false, revealed: false });
    var progress = '<div class="reader-progress-line"><span>跟练 ' + (gi + 1) + '/' + items.length + '</span>' +
      '<div class="progress"><i style="width:' + Math.round(((gi + 1) / items.length) * 100) + '%"></i></div></div>';

    /* 非填空型题：直接渲染题目，提交后给解析与继续按钮 */
    if (!(q.blanks && q.blanks.length)) {
      var finished = st.done || st.revealed;
      var html = progress + '<div class="block-card"><div class="block-label">跟练 · 我带你走一步</div>' +
        (item.hint ? '<div class="tiny amber mb12">提示：' + Z.ui.esc(item.hint) + '</div>' : '');
      if (finished) {
        html += '<div class="feedback ' + (st.done ? 'ok' : 'bad') + '">' +
          (st.done ? '跟练通过。' : '这题没过，先看解析再往下走。') +
          '<div class="ana">' + Z.ui.esc(q.analysis) + '</div></div>';
      } else {
        html += Z.question.render(q, { quiz: true });
      }
      html += '</div><div class="btn-row mt12"><button class="btn primary block' + (finished ? '' : ' hidden') +
        '" data-act="guided-next">' + (gi + 1 >= items.length ? '去独立练习' : '下一题') + '</button></div>';
      return html;
    }

    var html = progress;
    html += '<div class="block-card"><div class="block-label">跟练 · 我带你走一步</div>' +
      '<div class="block-text">' + Z.ui.md(q.stem) + '</div>';
    html += '<div class="mt12">' + (q.blanks || []).map(function (b, bi) {
      return '<div class="blank-row"><label>' + Z.ui.esc(b.label) + '</label>' +
        '<input data-gblank="' + bi + '" autocomplete="off" placeholder="填这一步" /></div>';
    }).join('') + '</div>';
    if (st.done || st.revealed) {
      html += '<div class="feedback ok mt12">' + (st.done ? '这一步跟对了，继续下一题。' : '答案已展开，看懂后继续。') + '</div>';
      html += '<div class="btn-row mt12"><button class="btn primary block" data-act="guided-next">' +
        (gi + 1 >= items.length ? '去独立练习' : '下一题') + '</button></div>';
    } else {
      html += '<div class="btn-row mt12"><button class="btn primary block" data-act="guided-check">检查这一步</button></div>';
      if (st.tries >= (item.revealAfterAttempts || 3)) {
        html += '<button class="link-btn mt8" data-act="guided-reveal">还是不会，直接看答案</button>';
      }
    }
    html += '</div>';
    return html;
  }

  function checkGuided() {
    var l = ctx.lesson;
    var item = l.guidedPractice[ctx.guidedIndex];
    var q = Z.Q_BY_ID[item.questionId];
    var st = ctx.guidedAttempts[q.id] || (ctx.guidedAttempts[q.id] = { tries: 0, done: false, revealed: false });
    var inputs = view.querySelectorAll('[data-gblank]');
    var allOk = true;
    Array.prototype.forEach.call(inputs, function (input, i) {
      var b = q.blanks[i];
      var ok = Z.question.normalize(input.value) === Z.question.normalize(b.answer);
      input.classList.toggle('ok', ok);
      input.classList.toggle('bad', !ok);
      if (!ok) {
        allOk = false;
        var hintRow = input.parentNode.parentNode.querySelector('[data-hint-' + i + ']');
        if (!hintRow) {
          var div = document.createElement('div');
          div.setAttribute('data-hint-' + i, '1');
          div.className = 'tiny amber';
          div.style.margin = '-2px 0 6px 82px';
          div.textContent = '提示：' + b.hint;
          input.parentNode.parentNode.insertBefore(div, input.parentNode.nextSibling);
        }
      }
    });
    st.tries++;
    if (allOk) {
      st.done = true;
      Z.store.addAttempt({
        questionId: q.id, subject: q.subject, correct: true,
        answer: 'guided', source: 'lesson-guided', mode: 'lesson'
      });
      Z.ui.toast('跟练通过');
      savePos();
      render();
    } else {
      var btn = view.querySelector('[data-act="guided-check"]');
      if (btn) btn.textContent = '再检查一次';
      if (st.tries >= (item.revealAfterAttempts || 3)) {
        var foot = view.querySelector('.btn-row');
        if (foot && !view.querySelector('[data-act="guided-reveal"]')) {
          var b2 = document.createElement('button');
          b2.className = 'link-btn mt8';
          b2.setAttribute('data-act', 'guided-reveal');
          b2.textContent = '还是不会，直接看答案';
          foot.parentNode.insertBefore(b2, foot.nextSibling);
        }
      }
    }
  }

  function revealGuided() {
    var item = ctx.lesson.guidedPractice[ctx.guidedIndex];
    var q = Z.Q_BY_ID[item.questionId];
    var st = ctx.guidedAttempts[q.id] || (ctx.guidedAttempts[q.id] = { tries: 0, done: false, revealed: false });
    st.revealed = true;
    Array.prototype.forEach.call(view.querySelectorAll('[data-gblank]'), function (input, i) {
      input.value = q.blanks[i].answer;
      input.classList.add('ok');
      input.classList.remove('bad');
      input.disabled = true;
    });
    Z.store.addAttempt({
      questionId: q.id, subject: q.subject, correct: false,
      answer: 'revealed', source: 'lesson-guided', mode: 'lesson', errorType: 'concept'
    });
    savePos();
    render();
  }

  function nextGuided() {
    ctx.guidedIndex++;
    if (ctx.guidedIndex >= ctx.lesson.guidedPractice.length) ctx.stage = 'solo';
    savePos();
    render();
  }

  /* ---------- 独立练 ---------- */
  function soloQuestions() {
    return ctx.lesson.independentPractice.concat(ctx.lesson.challenge || []);
  }

  function renderSolo() {
    var qs = soloQuestions();
    if (ctx.soloIndex >= qs.length) {
      ctx.stage = 'wrap';
      savePos();
      return renderWrap();
    }
    var q = Z.Q_BY_ID[qs[ctx.soloIndex]];
    var html = '<div class="reader-progress-line"><span>独立练 ' + (ctx.soloIndex + 1) + '/' + qs.length + '</span>' +
      '<div class="progress"><i style="width:' + Math.round(((ctx.soloIndex + 1) / qs.length) * 100) + '%"></i></div></div>' +
      '<div class="tiny faint" style="margin:0 2px 10px">这次不提示步骤，自己做。做错会要求先归因，再看讲解。</div>' +
      Z.question.render(q, {}) + '<div id="solo-extra"></div>' +
      '<div class="reader-foot"><button class="btn primary" data-act="solo-submit">提交答案</button>' +
      '<button class="btn ghost hidden" data-act="solo-next">' + (ctx.soloIndex + 1 >= qs.length ? '去小结' : '下一题') + '</button></div>';
    return html;
  }

  function bindSolo(q, card) {
    Z.question.bind(card, q, {
      mode: 'practice',
      onSubmit: function (res, answer) {
        var attempt = Z.store.addAttempt({
          questionId: q.id, subject: q.subject, correct: res.correct,
          answer: answer, source: 'lesson-solo', mode: 'lesson', errorType: null
        });
        ctx.lastAttemptId = attempt.id;
        var extra = view.querySelector('#solo-extra');
        var html = '<div class="feedback ' + (res.correct ? 'ok' : 'bad') + ' mt12">' +
          (res.correct ? '做对了。' : '没做对，先做一次归因，再看解析。') +
          '<div class="ana">' + Z.ui.esc(q.analysis) + '</div>' +
          (res.correct ? '' : '<div class="tiny amber mt8">错因（必选其一）：</div><div class="attr-grid">' +
            ATTRS.map(function (a) { return '<button class="attr-chip" data-solo-attr="' + a.key + '">' + a.label + '</button>'; }).join('') +
            '</div>') +
          '<button class="btn sm ghost mt8" data-solo-drawer>看这个考点怎么讲</button>' +
          '</div>';
        extra.innerHTML = html;
        var nextBtn = view.querySelector('[data-act="solo-next"]');
        nextBtn.classList.remove('hidden');
        if (!res.correct) {
          nextBtn.setAttribute('disabled', '');
          extra.querySelector('[data-solo-drawer]').addEventListener('click', function () {
            if (Z.practice && Z.practice.openLessonDrawer) Z.practice.openLessonDrawer(q);
          });
          extra.querySelectorAll('[data-solo-attr]').forEach(function (chip) {
            chip.addEventListener('click', function () {
              extra.querySelectorAll('[data-solo-attr]').forEach(function (c) { c.classList.remove('on'); });
              chip.classList.add('on');
              Z.store.update(function (s) {
                var a = s.attempts.filter(function (x) { return x.id === ctx.lastAttemptId; })[0];
                if (a) a.errorType = chip.dataset.soloAttr;
              });
              nextBtn.removeAttribute('disabled');
            });
          });
        } else {
          extra.querySelector('[data-solo-drawer]').addEventListener('click', function () {
            if (Z.practice && Z.practice.openLessonDrawer) Z.practice.openLessonDrawer(q);
          });
        }
        view.querySelector('[data-act="solo-submit"]').classList.add('hidden');
      }
    });
  }

  function soloNext() {
    ctx.soloIndex++;
    savePos();
    render();
  }

  /* ---------- 小结 ---------- */
  function renderWrap() {
    var l = ctx.lesson;
    var p = Z.store.get().progress[ctx.lessonId] || {};
    var s = l.summary;
    var checked = p.checklistDone || [];
    var html = '<div class="summary-grid mt12">' +
      '<div class="summary-block"><div class="summary-label">一句话本质</div><div class="block-text">' + Z.ui.md(s.essence) + '</div></div>' +
      '<div class="summary-block"><div class="summary-label">该记住的公式 / 结论</div>' +
      s.formulas.map(function (f, i) {
        return '<div class="row-between" style="padding:7px 0;border-bottom:1px solid var(--line-soft)">' +
          '<div class="small">' + Z.ui.md(f) + '</div>' +
          '<button class="btn xs ghost" data-act="add-card" data-idx="' + i + '">加卡片</button></div>';
      }).join('') + '</div>' +
      '<div class="summary-block"><div class="summary-label">易错点</div>' +
      s.pitfalls.map(function (x) { return '<div class="check-item" style="padding:5px 0">• ' + Z.ui.md(x) + '</div>'; }).join('') + '</div>' +
      '<div class="summary-block"><div class="summary-label">过关清单（勾完才能完成）</div>' +
      s.checklist.map(function (x, i) {
        return '<label class="check-item"><input type="checkbox" data-check="' + i + '"' + (checked.indexOf(i) >= 0 ? ' checked' : '') + ' />' +
          '<span>' + Z.ui.md(x) + '</span></label>';
      }).join('') + '</div>' +
      '<div class="summary-block"><div class="summary-label">费曼任务</div>' +
      '<div class="small muted mb8">' + Z.ui.esc(l.feynmanPrompt) + '</div>' +
      '<textarea class="answer-input feynman-box" data-feynman rows="5" placeholder="用你自己的话讲一遍，不用专业术语也可以…">' + Z.ui.esc(p.feynmanText || '') + '</textarea>' +
      '<div class="btn-row mt8"><button class="btn sm ghost" data-act="score-feynman">本地评分</button></div>' +
      (typeof p.feynmanScore === 'number' ? '<div class="feedback ok mt8"><b>讲解得分 ' + Math.round(p.feynmanScore * 100) + ' / 100</b><div class="ana">' + Z.ui.esc(p.feynmanFeedback || '') + '</div></div>' : '') +
      '<div class="tiny faint mt8">本地规则评分（长度 + 关键词 + 因果表达）；接入模型后会按语义 rubric 评分。</div>' +
      '</div>' +
      '</div>' +
      '<div class="reader-foot"><button class="btn primary" data-act="complete">完成本单元</button>' +
      '<button class="btn ghost" data-act="back">稍后再学</button></div>';
    return html;
  }

  function computeFeynman(text) {
    var l = ctx.lesson;
    var score = 0;
    if (text.length >= 40) score += 0.28;
    if (text.length >= 100) score += 0.22;
    var terms = [];
    l.kpIds.forEach(function (id) { if (Z.KP_BY_ID[id]) terms.push(Z.KP_BY_ID[id].title); });
    terms = terms.concat(l.title.split(/[：:，,\s]+/)).filter(function (t) { return t.length >= 2; });
    var hits = terms.filter(function (t) { return text.indexOf(t) >= 0; });
    score += Math.min(0.25, hits.length * 0.09);
    if (/因为|所以|例如|比如|也就是|相当于/.test(text)) score += 0.15;
    score = Math.min(1, Math.round(score * 100) / 100);
    var feedback = '检测到 ' + text.length + ' 字，命中关键词：' + (hits.slice(0, 4).join('、') || '暂无') + '。';
    if (score < 0.6) feedback += ' 建议补上「为什么」和「一个具体例子」，再讲一遍。';
    else if (score < 0.8) feedback += ' 讲得基本清楚，可以再压缩成一句话结论。';
    else feedback += ' 结构完整，保持这种讲法。';
    return { score: score, feedback: feedback };
  }

  function scoreFeynman() {
    var ta = view.querySelector('[data-feynman]');
    var text = (ta.value || '').trim();
    if (text.length < 12) { Z.ui.toast('至少写两句话，再让系统看一遍'); return; }
    var r = computeFeynman(text);
    Z.store.upsertProgress(ctx.lessonId, { feynmanScore: r.score, feynmanFeedback: r.feedback, feynmanText: text });
    render();
    Z.ui.toast('已记录讲解');
  }

  function completeLesson() {
    var p = Z.store.get().progress[ctx.lessonId] || {};
    var l = ctx.lesson;
    var checks = p.checklistDone || [];
    if (checks.length < l.summary.checklist.length) {
      Z.ui.toast('过关清单还差 ' + (l.summary.checklist.length - checks.length) + ' 项，勾完再完成');
      return;
    }
    if (typeof p.feynmanScore !== 'number') {
      var ta = view.querySelector('[data-feynman]');
      var text = ta ? (ta.value || '').trim() : '';
      if (text.length < 12) {
        Z.ui.toast('先写两句费曼复述，再完成本单元');
        return;
      }
      var r = computeFeynman(text);
      Z.store.upsertProgress(ctx.lessonId, { feynmanScore: r.score, feynmanFeedback: r.feedback, feynmanText: text });
      p = Z.store.get().progress[ctx.lessonId] || p;
    }
    flushTime();
    Z.store.upsertProgress(ctx.lessonId, { status: 'done', completedAt: Date.now(), stage: 'wrap' });
    var next = Z.lessonsOfSubject(l.subject).filter(function (x) { return x.level > l.level; })[0];
    var nextUnlock = next ? Z.engine.lessonUnlock(next) : null;
    var body = '<div style="text-align:center;padding:8px 0 4px">' +
      '<div class="score-badge green">单元完成</div>' +
      '<p class="small muted mt8">' + Z.ui.esc(l.title) + '</p></div>' +
      '<div class="card mt12"><div class="row-between"><span>随堂正确率</span><b>' +
      Math.round((p.quizTotal ? p.quizCorrect / p.quizTotal : (p.quizRate || 0)) * 100) + '%</b></div>' +
      '<div class="row-between mt8"><span>讲解评分</span><b>' + Math.round((p.feynmanScore || 0) * 100) + ' / 100</b></div>' +
      '<div class="row-between mt8"><span>本次学习</span><b>' + Z.ui.fmtMinutes((Date.now() - ctx.startTs) / 60000) + '</b></div></div>' +
      (next ? '<div class="mt12 ' + (nextUnlock && nextUnlock.unlocked ? 'lock-box' : 'lock-box') + '" style="' + (nextUnlock && nextUnlock.unlocked ? 'color:var(--green);border-color:rgba(61,220,151,.3);background:rgba(61,220,151,.08)' : '') + '">' +
        (nextUnlock && nextUnlock.unlocked ? '已解锁下一单元：' + Z.ui.esc(next.title) : '下一单元暂未解锁：' + Z.ui.esc(nextUnlock ? nextUnlock.reason : '')) + '</div>' : '');
    var sheet = Z.ui.sheet({
      title: '学习完成',
      body: body,
      foot: '<button class="btn ghost" data-close>回地图</button>' +
        (next && nextUnlock && nextUnlock.unlocked ? '<button class="btn primary" data-next>下一单元</button>' : '<button class="btn primary" data-practice>去练这个考点</button>')
    });
    sheet.el.querySelector('[data-close]').addEventListener('click', function () { sheet.close(); location.hash = '#/study'; });
    var nextBtn = sheet.el.querySelector('[data-next]');
    if (nextBtn) nextBtn.addEventListener('click', function () { sheet.close(); location.hash = '#/lesson/' + next.id; });
    var practiceBtn = sheet.el.querySelector('[data-practice]');
    if (practiceBtn) practiceBtn.addEventListener('click', function () {
      sheet.close();
      var kpId = l.kpIds[0];
      var qs = Z.questionsOfKp(kpId);
      if (qs.length) Z.practice.start({ questions: qs, title: '专项：' + Z.KP_BY_ID[kpId].title, mode: 'lesson-followup' });
    });
  }

  /* ---------- 事件 ---------- */
  function bind() {
    view.onclick = function (e) {
      var btn = e.target.closest('[data-act]');
      if (btn) {
        var act = btn.dataset.act;
        if (act === 'back') return goBack();
        if (act === 'focus') { view.classList.toggle('focus'); return; }
        if (act === 'start') { ctx.stage = 'learn'; savePos(); return render(); }
        if (act === 'learn-next') return nextLearn();
        if (act === 'confused') return openConfused();
        if (act === 'jump') {
          var st = btn.dataset.stage;
          if (stageIndex(st) < stageIndex(ctx.stage)) { ctx.stage = st; savePos(); render(); }
          return;
        }
        if (act === 'next-step' || act === 'reveal-step') {
          ctx.demoStep++;
          savePos();
          return render();
        }
        if (act === 'next-example') {
          ctx.demoIndex++;
          ctx.demoStep = 0;
          if (ctx.demoIndex >= ctx.lesson.workedExamples.length) ctx.stage = 'guided';
          savePos();
          return render();
        }
        if (act === 'add-takeaway') return addTakeawayCard();
        if (act === 'guided-check') return checkGuided();
        if (act === 'guided-reveal') return revealGuided();
        if (act === 'guided-next') return nextGuided();
        if (act === 'solo-submit') {
          // 交给 question.bind 的提交按钮
          var sub = view.querySelector('.q-card [data-submit]');
          if (sub) sub.click();
          return;
        }
        if (act === 'solo-next') return soloNext();
        if (act === 'add-card') return addSummaryCard(Number(btn.dataset.idx));
        if (act === 'score-feynman') return scoreFeynman();
        if (act === 'complete') return completeLesson();
        if (act === 'go-prev') { ctx.locked = false; flushTime(); location.hash = '#/lesson/' + btn.dataset.id; return; }
        if (act === 'force') {
          Z.ui.confirm({ title: '强制解锁', body: '跳过前置条件会缺少必要基础，容易越学越吃力。仍要解锁吗？', okText: '仍要解锁' }).then(function (ok) {
            if (!ok) return;
            Z.store.forceUnlock(ctx.lessonId);
            ctx.locked = false;
            mount(ctx.lessonId);
          });
          return;
        }
      }
      var jump = e.target.closest('[data-stage]');
      if (jump && jump.dataset.act === 'jump') {
        var st2 = jump.dataset.stage;
        if (stageIndex(st2) < stageIndex(ctx.stage)) { ctx.stage = st2; savePos(); render(); }
      }
    };

    view.onchange = function (e) {
      if (e.target.matches('[data-check]')) {
        var idx = Number(e.target.dataset.check);
        var p = Z.store.progressFor(ctx.lessonId);
        var done = p.checklistDone || [];
        if (e.target.checked) { if (done.indexOf(idx) < 0) done.push(idx); }
        else done = done.filter(function (x) { return x !== idx; });
        done.sort();
        Z.store.upsertProgress(ctx.lessonId, { checklistDone: done });
        if (done.length === ctx.lesson.summary.checklist.length) Z.ui.toast('过关清单已全部勾选');
      }
    };

    var soloCard = view.querySelector('.q-card');
    if (ctx.stage === 'solo' && soloCard) {
      var qs = soloQuestions();
      var q = Z.Q_BY_ID[qs[ctx.soloIndex]];
      if (q) bindSolo(q, soloCard);
    }
    if (ctx.stage === 'guided') {
      var gItems = ctx.lesson.guidedPractice || [];
      var gItem = gItems[ctx.guidedIndex];
      var gq = gItem && Z.Q_BY_ID[gItem.questionId];
      if (gq && !(gq.blanks && gq.blanks.length)) {
        var gst = ctx.guidedAttempts[gq.id] || (ctx.guidedAttempts[gq.id] = { tries: 0, done: false, revealed: false });
        var gcard = view.querySelector('.q-card');
        if (gcard && !gst.done && !gst.revealed) {
          Z.question.bind(gcard, gq, {
            mode: 'quiz',
            onSubmit: function (res, answer) {
              gst.tries++;
              gst.done = !!res.correct;
              gst.revealed = !res.correct;
              Z.store.addAttempt({
                questionId: gq.id, subject: gq.subject, correct: !!res.correct,
                answer: answer, source: 'lesson-guided', mode: 'lesson',
                errorType: res.correct ? null : 'concept'
              });
              var host = document.createElement('div');
              host.className = 'mt12';
              host.innerHTML = '<div class="feedback ' + (res.correct ? 'ok' : 'bad') + '">' +
                (res.correct ? '跟练通过。' : '这题没过，先看解析再往下走。') +
                '<div class="ana">' + Z.ui.esc(gq.analysis) + '</div></div>';
              var box = gcard.closest('.block-card') || gcard.parentNode;
              box.appendChild(host);
              var nb = view.querySelector('[data-act="guided-next"]');
              if (nb) nb.classList.remove('hidden');
              savePos();
            }
          });
        }
      }
    }
    bindSelection();
  }

  function addTakeawayCard() {
    var ex = ctx.lesson.workedExamples[ctx.demoIndex];
    var q = Z.Q_BY_ID[ex.questionId];
    var added = Z.store.addCard({
      lessonId: ctx.lessonId, kpId: ctx.lesson.kpIds[0], front: '例题：' + (q ? q.stem.slice(0, 42) : (ex.title || '')) + '…',
      back: ex.takeaway
    });
    Z.ui.toast(added ? '已加入记忆卡' : '这张卡已经在卡盒里了');
  }

  function addSummaryCard(idx) {
    var l = ctx.lesson;
    var s = l.summary;
    var added = Z.store.addCard({
      lessonId: l.id, kpId: l.kpIds[0],
      front: s.formulas[idx],
      back: s.essence
    });
    Z.ui.toast(added ? '已加入记忆卡' : '这张卡已经在卡盒里了');
  }

  function stripMd(text) {
    return String(text || '')
      .replace(/```[\s\S]*?```/g, function (m) { return m.replace(/```[a-z]*/g, ''); })
      .replace(/[`*_#>|]/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  /* 把当前这一块讲义转成纯文本，交给 AI 当上下文 */
  function blockPlainText(block) {
    if (!block) return '';
    if (block.md) return stripMd(block.md);
    if (block.type === 'formula') {
      return String(block.latex || '') + (block.caption ? '（' + block.caption + '）' : '');
    }
    if (block.type === 'compare') {
      var rows = Array.isArray(block.rows) ? block.rows : [block.rows];
      return [].concat(block.headers || []).join(' | ') + '\n' +
        rows.map(function (r) { return [].concat(r || []).join(' | '); }).join('\n');
    }
    if (block.type === 'code') return String(block.code || '');
    if (block.type === 'diagram') {
      var d = Z.DIAGRAMS && Z.DIAGRAMS[block.diagramId];
      return String(block.caption || (d && d.caption) || '');
    }
    if (block.type === 'quiz') {
      var q = Z.Q_BY_ID[block.questionId];
      return q ? stripMd(q.stem) + (q.analysis ? '\n官方解析：' + stripMd(q.analysis) : '') : '';
    }
    return '';
  }

  function openConfused() {
    var l = ctx.lesson;
    var bi = ctx.blockIndex;
    var block = l.sections[bi];
    var prev = bi > 0 ? l.sections[bi - 1] : null;

    /* 有 AI 就直接把这一块原文发给 AI 讲，不再让用户先看通用解释 */
    var labels = { text: '讲解', analogy: '类比', tip: '技巧', warning: '易错点', formula: '公式', compare: '对比表', code: '代码', diagram: '图解', quiz: '随堂小问' };
    var excerpt = blockPlainText(block);
    if (excerpt && Z.aiUI && Z.aiUI.askWithContext) {
      var subject = (Z.SUBJECTS && Z.SUBJECTS[l.subject] && Z.SUBJECTS[l.subject].name) || '';
      var contextText = '《' + (l.title || '') + '》' + (subject ? '（' + subject + '）' : '') +
        ' 第 ' + (bi + 1) + '/' + l.sections.length + ' 段 · ' + (labels[block.type] || block.type) + '\n' + excerpt;
      if (Z.aiUI.askWithContext(contextText, '这一块我没看懂，请就上面这段讲义直接给我讲明白：先用一句话说它到底在讲什么，再分步骤拆开，最后举一个贴近专升本考点的例子。')) return;
    }
    var glossary = {
      english: '本课常见符号：n. 名词；v. 动词；adj. 形容词；adv. 副词；prep. 介词；conj. 连词。判断时看位置，不背词义。',
      math: '本课常见符号：Δ 表示变化量；lim 表示极限；f′(x₀) 表示导数；→ 表示趋近。极限不是直接代入。',
      cs: '本课常见符号：typeof 返回类型字符串；console.log 输出；let 声明变量；=== 严格相等。'
    };
    var body = '<div class="stack">' +
      '<div class="card pad-sm"><b>这个符号 / 词是什么意思？</b><p class="small muted mt8">' + Z.ui.esc(glossary[l.subject]) + '</p></div>' +
      '<div class="card pad-sm"><b>它为什么出现在这里？</b><p class="small muted mt8">' +
      (prev ? '上一块讲的是：' + Z.ui.esc(String(prev.md || prev.caption || '').slice(0, 80)) + '…；这一块是在它的基础上再往前一步。' : '这是本课第一块，它负责建立场景，后面才会给定义。') +
      '</p></div>' +
      '<div class="card pad-sm"><b>换一种更笨的说法</b><p class="small muted mt8">先别管公式，问自己三个问题：这块解决什么问题？关键量是什么？如果换个数字，结论还成立吗？</p></div>' +
      '<div class="tiny faint">当前 AI 助教不可用，先看这份本地解释；在右下角 AI 设置里配好模型后，这里会直接由 AI 针对当前段落讲解。</div>' +
      '</div>';
    Z.ui.sheet({ title: '这块没看懂', body: body, foot: '<button class="btn ghost" data-close>先自己再读一遍</button>' })
      .el.querySelector('[data-close]').addEventListener('click', function (e) { e.target.closest('.sheet').remove(); document.querySelector('.sheet-backdrop').remove(); });
  }

  function bindSelection() {
    view.onmouseup = function () {
      setTimeout(function () {
        var sel = window.getSelection();
        if (!sel || !sel.anchorNode || !view.contains(sel.anchorNode)) return;
        var text = sel.toString().trim();
        if (text.length < 3) return;
        showSelToolbar(sel, text);
      }, 10);
    };
    view.ontouchend = view.onmouseup;
  }

  function showSelToolbar(sel, text) {
    var old = document.querySelector('.sel-toolbar');
    if (old) old.remove();
    var rect = sel.getRangeAt(0).getBoundingClientRect();
    var bar = document.createElement('div');
    bar.className = 'sel-toolbar';
    bar.style.top = Math.max(70, rect.top - 46) + 'px';
    bar.style.left = Math.min(window.innerWidth - 170, Math.max(12, rect.left)) + 'px';
    bar.innerHTML = '<button data-sel="highlight">高亮</button><button data-sel="note">记笔记</button>';
    document.body.appendChild(bar);
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-sel]');
      if (!b) return;
      var bi = ctx.stage === 'learn' ? ctx.blockIndex : 0;
      if (b.dataset.sel === 'highlight') {
        Z.store.addHighlight(ctx.lessonId, bi, text);
        Z.ui.toast('已高亮');
      } else {
        openNoteSheet(text, bi);
      }
      bar.remove();
      sel.removeAllRanges();
    });
    setTimeout(function () {
      document.addEventListener('click', function once(ev) {
        if (!bar.contains(ev.target)) { bar.remove(); document.removeEventListener('click', once); }
      });
    }, 30);
  }

  function openNoteSheet(text, bi) {
    var body = '<div class="small muted mb8">选中内容：' + Z.ui.esc(text.slice(0, 80)) + (text.length > 80 ? '…' : '') + '</div>' +
      '<textarea class="answer-input" data-note rows="4" placeholder="写下你的理解 / 疑问"></textarea>';
    var s = Z.ui.sheet({
      title: '记笔记', body: body,
      foot: '<button class="btn ghost" data-cancel>取消</button><button class="btn primary" data-save>保存</button>'
    });
    s.el.querySelector('[data-cancel]').addEventListener('click', s.close);
    s.el.querySelector('[data-save]').addEventListener('click', function () {
      var val = s.el.querySelector('[data-note]').value.trim();
      if (!val) { Z.ui.toast('笔记不能为空'); return; }
      Z.store.addNote(ctx.lessonId, bi, val + '（原文：' + text.slice(0, 50) + '）');
      s.close();
      Z.ui.toast('笔记已保存');
    });
  }

  function bindLocked() {
    view.onclick = function (e) {
      var btn = e.target.closest('[data-act]');
      if (!btn) return;
      if (btn.dataset.act === 'back') goBack();
      if (btn.dataset.act === 'go-prev') { flushTime(); location.hash = '#/lesson/' + btn.dataset.id; }
      if (btn.dataset.act === 'force') {
        Z.ui.confirm({ title: '强制解锁', body: '跳过前置条件会缺少必要基础，容易越学越吃力。仍要解锁吗？', okText: '仍要解锁' }).then(function (ok) {
          if (!ok) return;
          Z.store.forceUnlock(ctx.lessonId);
          ctx.locked = false;
          mount(ctx.lessonId);
        });
      }
    };
  }

  Z.lesson = { mount: mount, goBack: goBack, flushTime: flushTime };
})(window.ZSB = window.ZSB || {});
