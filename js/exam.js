/* 模考：计时答题 → 交卷 → 失分分析报告 → 错因归因 */
(function (Z) {
  var exam = null;
  var timerId = null;

  function overlay() {
    var root = document.getElementById('overlay-root');
    var el = document.getElementById('exam-session');
    if (!el) {
      el = document.createElement('div');
      el.id = 'exam-session';
      el.className = 'session-wrap';
      root.appendChild(el);
    }
    return el;
  }

  function start(paperId) {
    var paper = Z.MOCK_PAPERS.filter(function (p) { return p.id === paperId; })[0];
    if (!paper) return;
    var qs = paper.questionIds.map(function (id) { return Z.MOCK_Q_BY_ID[id]; }).filter(Boolean);
    exam = {
      paper: paper,
      questions: qs,
      idx: 0,
      answers: {},
      startTs: Date.now(),
      durationMs: paper.durationMin * 60000,
      submitted: false
    };
    renderQuestion();
  }

  function answeredCount() {
    return exam.questions.filter(function (q) { return !!exam.answers[q.id]; }).length;
  }

  function renderQuestion() {
    var el = overlay();
    var q = exam.questions[exam.idx];
    var left = exam.durationMs - (Date.now() - exam.startTs);
    el.innerHTML = '<div class="session-shell">' +
      '<div class="session-head"><button class="icon-btn" data-exit>' + Z.ui.icon('back') + '</button>' +
      '<div class="session-progress"><div class="session-title truncate">' + Z.ui.esc(exam.paper.title) + '</div>' +
      '<div class="reader-progress-line" style="margin:4px 0 0"><span>第 ' + (exam.idx + 1) + '/' + exam.questions.length + ' 题</span>' +
      '<div class="progress thin"><i style="width:' + Math.round(((exam.idx + 1) / exam.questions.length) * 100) + '%"></i></div></div></div>' +
      '<div class="exam-timer" data-exam-timer>' + Z.ui.fmtTime(left) + '</div></div>' +
      '<div class="session-body"><div class="row-between mb12"><div class="chips"><span class="chip">' +
      Z.ui.esc(Z.SUBJECTS[q.subject].name) + '</span><span class="chip">' + q.points + ' 分</span></div>' +
      '<button class="btn xs ghost" data-sheet>答题卡</button></div>' +
      Z.question.render(q, { exam: true, value: exam.answers[q.id] || '' }) + '</div>' +
      '<div class="session-foot">' +
      (exam.idx > 0 ? '<button class="btn ghost" data-prev>上一题</button>' : '') +
      '<button class="btn primary" data-save-next>' + (exam.idx + 1 >= exam.questions.length ? '保存并交卷' : '保存并下一题') + '</button></div></div>';
    var card = el.querySelector('.q-card');
    Z.question.bind(card, q, { mode: 'exam', onSubmit: function () {} });
    bindExam();
    startTimer();
  }

  function startTimer() {
    clearInterval(timerId);
    updateTimer();
    timerId = setInterval(function () {
      if (!exam || exam.submitted) { clearInterval(timerId); return; }
      var left = exam.durationMs - (Date.now() - exam.startTs);
      updateTimer();
      if (left <= 0) {
        clearInterval(timerId);
        Z.ui.toast('考试时间到，自动交卷');
        submitPaper(true);
      }
    }, 1000);
  }

  function updateTimer() {
    var t = document.querySelector('[data-exam-timer]');
    if (!t || !exam) return;
    var left = exam.durationMs - (Date.now() - exam.startTs);
    t.textContent = Z.ui.fmtTime(left);
    t.classList.toggle('warn', left < 5 * 60000);
  }

  function saveCurrent() {
    var q = exam.questions[exam.idx];
    var card = document.querySelector('#exam-session .q-card');
    if (!card) return;
    var ans = Z.question.currentAnswer(card, q);
    if (ans && String(ans).trim()) exam.answers[q.id] = ans;
    else delete exam.answers[q.id];
  }

  function bindExam() {
    var el = overlay();
    el.querySelector('[data-exit]').onclick = function () {
      Z.ui.confirm({ title: '退出模考', body: '本次作答不会保存，确定退出？', okText: '退出', danger: true }).then(function (ok) {
        if (ok) closeExam();
      });
    };
    var prev = el.querySelector('[data-prev]');
    if (prev) prev.onclick = function () { saveCurrent(); exam.idx--; renderQuestion(); };
    el.querySelector('[data-save-next]').onclick = function () {
      saveCurrent();
      if (exam.idx + 1 >= exam.questions.length) {
        Z.ui.confirm({ title: '确认交卷', body: '已作答 ' + answeredCount() + '/' + exam.questions.length + ' 题。交卷后不能再修改。', okText: '交卷' })
          .then(function (ok) { if (ok) submitPaper(false); });
      } else {
        exam.idx++;
        renderQuestion();
      }
    };
    el.querySelector('[data-sheet]').onclick = openAnswerSheet;
  }

  function openAnswerSheet() {
    saveCurrent();
    var dots = exam.questions.map(function (q, i) {
      var done = !!exam.answers[q.id];
      return '<button class="sheet-dot ' + (done ? 'on' : '') + '" data-jump="' + i + '">' + (i + 1) + '</button>';
    }).join('');
    var s = Z.ui.sheet({
      title: '答题卡 · 已答 ' + answeredCount() + '/' + exam.questions.length,
      body: '<div class="answer-sheet">' + dots + '</div>' +
        '<div class="tiny faint mt12">蓝色 = 已作答，灰色 = 未作答。点击题号跳转。</div>',
      foot: '<button class="btn primary block" data-submit-exam>交卷</button>'
    });
    s.el.querySelectorAll('[data-jump]').forEach(function (b) {
      b.onclick = function () { s.close(); exam.idx = Number(b.dataset.jump); renderQuestion(); };
    });
    s.el.querySelector('[data-submit-exam]').onclick = function () {
      s.close();
      Z.ui.confirm({ title: '确认交卷', body: '已作答 ' + answeredCount() + '/' + exam.questions.length + ' 题，交卷后不可修改。', okText: '交卷' })
        .then(function (ok) { if (ok) submitPaper(false); });
    };
  }

  function submitPaper(auto) {
    if (!exam || exam.submitted) return;
    saveCurrent();
    exam.submitted = true;
    clearInterval(timerId);

    var results = [];
    var score = 0;
    exam.questions.forEach(function (q) {
      var ans = exam.answers[q.id] || '';
      var res = Z.question.checkSync(q, ans);
      if (res.correct) score += q.points || 0;
      results.push({ questionId: q.id, correct: res.correct, answer: ans, errorType: null, points: res.correct ? (q.points || 0) : 0 });
      Z.store.addAttempt({
        questionId: q.id, subject: q.subject, correct: res.correct, answer: ans,
        source: 'mock-exam', mode: 'exam', errorType: null
      });
    });

    var record = {
      id: 'm' + Date.now(),
      paperId: exam.paper.id,
      paperTitle: exam.paper.title,
      startTs: exam.startTs,
      endTs: Date.now(),
      usedMs: Date.now() - exam.startTs,
      autoSubmitted: !!auto,
      answers: exam.answers,
      results: results,
      score: score,
      total: exam.paper.totalPoints
    };
    Z.store.update(function (s) { s.mocks.push(record); });
    Z.store.addSession({ type: 'exam', minutes: Math.max(1, Math.round(record.usedMs / 60000)), subject: 'mixed' });
    renderReport(record, true);
  }

  function barRows(items, totalMax, unit) {
    var max = totalMax || Math.max.apply(null, items.map(function (i) { return i.value; }).concat([1]));
    return items.map(function (it) {
      var pct = max ? Math.max(2, Math.round((it.value / max) * 100)) : 0;
      return '<div class="bar-row"><div class="bar-label" title="' + Z.ui.esc(it.label) + '">' + Z.ui.esc(it.label) + '</div>' +
        '<div class="bar-track"><i style="width:' + pct + '%"></i></div>' +
        '<div class="bar-val">' + it.value + (unit || '') + '</div></div>';
    }).join('');
  }

  function reportHtml(record) {
    var analysis = Z.engine.examAnalysis(record);
    var pct = Math.round((record.score / record.total) * 100);
    var kpItems = analysis.lostByKp.map(function (x) { return { label: x.kp ? x.kp.title : x.kpId, value: x.lost }; });
    var diffLabels = { 1: '基础', 2: '较易', 3: '中等', 4: '较难', 5: '困难' };
    var diffItems = Object.keys(analysis.byDifficulty).sort().map(function (d) {
      var x = analysis.byDifficulty[d];
      return { label: diffLabels[d] || ('难度 ' + d), value: x.total - x.got };
    });
    var typeItems = ['concept', 'formula', 'calc', 'misread', 'timeout', 'careless', 'unknown'].map(function (k) {
      return { label: Z.practice.attrLabel(k), value: analysis.errorTypes[k] || 0, key: k };
    }).filter(function (x) { return x.value > 0; });

    var wrongRows = record.results.filter(function (r) { return !r.correct; }).map(function (r) {
      var q = Z.MOCK_Q_BY_ID[r.questionId];
      return '<div class="card pad-sm mt8"><div class="row-between"><div class="chips">' +
        '<span class="chip red">丢 ' + (q.points || 0) + ' 分</span>' +
        '<span class="chip">' + Z.ui.esc(Z.SUBJECTS[q.subject].name) + '</span>' +
        '<span class="chip">' + Z.ui.esc(Z.KP_BY_ID[q.kpIds[0]] ? Z.KP_BY_ID[q.kpIds[0]].title : '') + '</span></div>' +
        '<div class="tiny faint">你的答案：' + Z.ui.esc(r.answer || '未作答') + '</div></div>' +
        '<div class="small mt8">' + Z.ui.esc(q.stem.replace(/\n/g, ' ').slice(0, 80)) + '…</div>' +
        '<div class="tiny amber mt8">错因：</div><div class="attr-grid">' +
        Z.practice.ATTRS.map(function (a) {
          return '<button class="attr-chip ' + (r.errorType === a.key ? 'on' : '') + '" data-attr-q="' + r.questionId + '" data-attr="' + a.key + '">' + a.label + '</button>';
        }).join('') + '</div>' +
        '<div class="btn-row mt8"><button class="btn sm ghost" data-review="' + r.questionId + '">看讲解</button>' +
        '<button class="btn sm primary" data-train="' + q.kpIds[0] + '">去练这个考点</button></div></div>';
    }).join('');

    return '<div class="stack">' +
      '<div class="card accent-card"><div class="row-between"><div>' +
      '<div class="tiny faint">' + Z.ui.esc(record.paperTitle) + '</div>' +
      '<div class="report-score mt8"><b>' + record.score + '</b><span class="muted">/ ' + record.total + ' 分</span></div>' +
      '<div class="small muted mt8">得分率 ' + pct + '% · 用时 ' + Z.ui.fmtMinutes(record.usedMs / 60000) + (record.autoSubmitted ? ' · 超时自动交卷' : '') + '</div>' +
      '</div>' + Z.ui.ring(record.score / record.total, { size: 82, color: pct >= 80 ? 'var(--green)' : (pct >= 60 ? 'var(--amber)' : 'var(--red)') }) + '</div></div>' +
      '<div class="card"><div class="card-title">失分诊断</div>' +
      '<div class="diagnosis mt8">' + Z.ui.esc(analysis.conclusion) + '</div></div>' +
      (kpItems.length ? '<div class="card"><div class="card-title">按考点：丢了多少分</div><div class="mt12">' + barRows(kpItems) + '</div></div>' : '') +
      (diffItems.length ? '<div class="card"><div class="card-title">按难度：哪一层在漏分</div><div class="mt12">' + barRows(diffItems, null, ' 分') + '</div></div>' : '') +
      (typeItems.length ? '<div class="card"><div class="card-title">按错因：分丢在了哪里</div><div class="mt12">' + barRows(typeItems, null, ' 分') + '</div>' +
        '<div class="tiny faint mt8">错因来自你交卷后的归因；未归因的题默认计入「未归因」。</div></div>' : '') +
      '<div class="card"><div class="card-title">错题复盘</div>' +
      '<div class="tiny faint mt8">给每道错题选一个错因，报告会自动更新。</div>' + (wrongRows || '<div class="tiny faint mt8">没有错题。</div>') + '</div>' +
      '<div class="card"><div class="card-title">下一步</div><div class="btn-row mt8">' +
      '<button class="btn ghost" data-back-exam>返回模考</button>' +
      '<button class="btn primary" data-train-top>去补最大缺口</button></div></div>' +
      '</div>';
  }

  function renderReport(record, inOverlay) {
    var html = reportHtml(record);
    if (inOverlay) {
      var el = overlay();
      el.innerHTML = '<div class="session-shell"><div class="session-head">' +
        '<button class="icon-btn" data-report-close>' + Z.ui.icon('back') + '</button>' +
        '<div class="session-progress"><div class="session-title">模考报告</div></div></div>' +
        '<div class="session-body">' + html + '</div></div>';
      el.querySelector('[data-report-close]').onclick = closeExam;
    } else {
      var view = document.getElementById('view');
      view.innerHTML = '<div class="reader-head"><div class="reader-top"><button class="icon-btn" data-report-close>' +
        Z.ui.icon('back') + '</button><div class="reader-title">模考报告</div></div></div>' + html;
      view.querySelector('[data-report-close]').onclick = function () { location.hash = '#/exam'; };
    }
    bindReport(record);
  }

  function bindReport(record) {
    var root = document.querySelector('#exam-session .session-body, #view');
    if (!root) return;
    root.querySelectorAll('[data-attr-q]').forEach(function (chip) {
      chip.onclick = function () {
        var qid = chip.dataset.attrQ, type = chip.dataset.attr;
        var r = record.results.filter(function (x) { return x.questionId === qid; })[0];
        if (r) r.errorType = type;
        Z.store.update(function (s) {
          var m = s.mocks.filter(function (x) { return x.id === record.id; })[0];
          if (m) {
            var mm = m.results.filter(function (x) { return x.questionId === qid; })[0];
            if (mm) mm.errorType = type;
          }
        });
        renderReport(record, !!document.getElementById('exam-session'));
      };
    });
    root.querySelectorAll('[data-review]').forEach(function (b) {
      b.onclick = function () { Z.practice.openLessonDrawer(Z.MOCK_Q_BY_ID[b.dataset.review] || Z.Q_BY_ID[b.dataset.review]); };
    });
    root.querySelectorAll('[data-train]').forEach(function (b) {
      b.onclick = function () {
        var kpId = b.dataset.train;
        var qs = Z.questionsOfKp(kpId);
        if (!qs.length) { Z.ui.toast('该考点暂无练习题'); return; }
        Z.practice.start({ questions: qs, title: '专项：' + Z.KP_BY_ID[kpId].title, mode: 'exam-review' });
      };
    });
    var back = root.querySelector('[data-back-exam]');
    if (back) back.onclick = function () {
      if (document.getElementById('exam-session')) closeExam();
      else location.hash = '#/exam';
    };
    var top = root.querySelector('[data-train-top]');
    if (top) top.onclick = function () {
      if (!record.results.length) return;
      var analysis = Z.engine.examAnalysis(record);
      var kpId = analysis.topKps[0] ? analysis.topKps[0].kpId : record.results.filter(function (r) { return !r.correct; })[0].questionId;
      var qs = Z.questionsOfKp(kpId);
      if (!qs.length) { Z.ui.toast('暂无可练题目'); return; }
      Z.practice.start({ questions: qs, title: '专项：' + Z.KP_BY_ID[kpId].title, mode: 'exam-review' });
    };
  }

  function closeExam() {
    clearInterval(timerId);
    var el = document.getElementById('exam-session');
    if (el) el.remove();
    exam = null;
    location.hash = '#/exam';
  }

  function mountReport(recordId) {
    var record = Z.store.get().mocks.filter(function (m) { return m.id === recordId; })[0];
    if (!record) {
      document.getElementById('view').innerHTML = Z.ui.empty('exam', '没有找到这次模考记录', '可能已被清理，回到模考页重新开始。',
        '<button class="btn primary" onclick="location.hash=\'#/exam\'">返回模考</button>');
      return;
    }
    renderReport(record, false);
  }

  Z.exam = {
    start: start,
    mountReport: mountReport,
    reportHtml: reportHtml,
    closeExam: closeExam
  };
})(window.ZSB = window.ZSB || {});
