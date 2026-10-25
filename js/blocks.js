/* 讲义内容块渲染：文本 / 类比 / 公式 / 对比表 / 代码 / 随堂小问 */
(function (Z) {
  /* 兼容两种写法：数组 [[...],[...]] 或逗号分隔的字符串 */
  function normalizeTable(list) {
    if (Array.isArray(list)) return list;
    return String(list || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean);
  }

  function normalizeRows(rows, cols) {
    if (Array.isArray(rows)) {
      return rows.map(function (r) { return Array.isArray(r) ? r : [r]; });
    }
    var flat = normalizeTable(rows);
    var out = [];
    for (var i = 0; i < flat.length; i += cols) out.push(flat.slice(i, i + cols));
    return out;
  }

  function renderBlock(block, ctx) {
    var type = block.type;
    if (type === 'text') {
      return '<div class="block-card block-text">' + Z.ui.md(block.md) + '</div>';
    }
    if (type === 'analogy') {
      return '<div class="block-card analogy">' +
        '<div class="block-label">打个比方</div>' +
        (block.title ? '<div class="card-title" style="font-size:15px">' + Z.ui.esc(block.title) + '</div>' : '') +
        '<div class="block-text">' + Z.ui.md(block.md) + '</div></div>';
    }
    if (type === 'tip') {
      return '<div class="block-card tip"><div class="block-label">技巧</div>' +
        '<div class="block-text">' + Z.ui.md(block.md) + '</div></div>';
    }
    if (type === 'warning') {
      return '<div class="block-card warning"><div class="block-label">易错点</div>' +
        '<div class="block-text">' + Z.ui.md(block.md) + '</div></div>';
    }
    if (type === 'formula') {
      return '<div class="block-card">' +
        '<div class="formula">' + Z.ui.fmtMath(block.latex, true) + '</div>' +
        (block.caption ? '<div class="cap" style="text-align:center;font-size:11.5px;color:var(--text-dim)">' + Z.ui.esc(block.caption) + '</div>' : '') +
        '</div>';
    }
    if (type === 'compare') {
      var headers = normalizeTable(block.headers);
      var rowList = normalizeRows(block.rows, headers.length);
      var head = '<tr>' + headers.map(function (h) { return '<th>' + Z.ui.esc(h) + '</th>'; }).join('') + '</tr>';
      var rows = rowList.map(function (r) {
        return '<tr>' + r.map(function (c) { return '<td>' + Z.ui.md(c) + '</td>'; }).join('') + '</tr>';
      }).join('');
      return '<div class="block-card"><div class="block-label">对比着看</div>' +
        '<div style="overflow-x:auto"><table class="compare-table"><thead>' + head + '</thead><tbody>' + rows + '</tbody></table></div></div>';
    }
    if (type === 'code') {
      return '<div class="block-card"><div class="block-label">代码</div>' +
        '<div class="edu-code" data-code>'+ Z.ui.esc(block.code || '') +
        (block.runnable ? '<button class="btn xs primary code-run" data-code-run>运行</button>' : '') +
        '</div><div data-code-out></div></div>';
    }
    if (type === 'diagram') {
      var d = Z.DIAGRAMS && Z.DIAGRAMS[block.diagramId];
      if (!d) return '';
      return '<div class="block-card block-diagram"><div class="block-label">图解</div>' +
        d.svg + '<div class="diagram-cap">' + Z.ui.esc(block.caption || d.caption || '') + '</div></div>';
    }
    if (type === 'quiz') {
      var q = Z.Q_BY_ID[block.questionId];
      if (!q) return '';
      return '<div class="quiz-card" data-quiz-wrap data-qid="' + q.id + '">' +
        '<div class="quiz-purpose">随堂小问 · ' + Z.ui.esc(block.purpose || '检验理解') + '</div>' +
        Z.question.render(q, { quiz: true }) + '</div>';
    }
    return '';
  }

  function bindCode(root) {
    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-code-run]');
      if (!btn) return;
      var wrap = btn.closest('.block-card');
      var codeEl = wrap.querySelector('[data-code]');
      var outEl = wrap.querySelector('[data-code-out]');
      var code = codeEl.textContent.replace(/运行$/, '').trim();
      outEl.innerHTML = '<div class="faint tiny">运行中…</div>';
      Z.sandbox.run(code, []).then(function (res) {
        if (res.error) outEl.innerHTML = '<div class="feedback bad">' + Z.ui.esc(res.error) + '</div>';
        else {
          var out = res.logs && res.logs.length ? res.logs.join('\n') : '(没有输出)';
          outEl.innerHTML = '<div class="code-out">' + Z.ui.esc(out) + '</div>';
        }
      });
    });
  }

  function bindQuiz(wrap, block, lesson, onDone) {
    var q = Z.Q_BY_ID[block.questionId];
    if (!q) return;
    var card = wrap.querySelector('.q-card');
    var progress = Z.store.progressFor(lesson.id);
    var prior = (progress.quizAnswers || {})[q.id];

    function showFeedback(correct, answer) {
      var fb = card.querySelector('[data-feedback]');
      if (!fb) return;
      fb.innerHTML = '<div class="feedback ' + (correct ? 'ok' : 'bad') + '">' +
        (correct ? '回答正确。' : '这题先别急着过，看看解析：') +
        '<div class="ana">' + Z.ui.esc(q.analysis) + '</div>' +
        (correct ? '' : '<button class="btn sm ghost mt8" data-quiz-back>回看上一段讲解</button>') +
        '</div>';
    }

    if (prior) {
      Z.question.mark(card, q, prior.answer, prior.correct);
      showFeedback(prior.correct, prior.answer);
      var backBtn = card.querySelector('[data-quiz-back]');
      if (backBtn) backBtn.addEventListener('click', function () { if (onDone) onDone(prior.correct, 'back'); });
      if (onDone) onDone(prior.correct, 'prior');
      return;
    }

    Z.question.bind(card, q, {
      mode: 'quiz',
      onSubmit: function (res, answer) {
        var p = Z.store.progressFor(lesson.id);
        if (!p.quizAnswers) p.quizAnswers = {};
        p.quizAnswers[q.id] = { correct: res.correct, answer: answer, ts: Date.now() };
        var keys = Object.keys(p.quizAnswers);
        p.quizTotal = keys.length;
        p.quizCorrect = keys.filter(function (k) { return p.quizAnswers[k].correct; }).length;
        p.quizRate = p.quizTotal ? p.quizCorrect / p.quizTotal : 0;
        Z.store.upsertProgress(lesson.id, p);
        Z.store.addAttempt({
          questionId: q.id, subject: q.subject, correct: res.correct,
          answer: answer, source: 'lesson-quiz', mode: 'lesson', errorType: null
        });
        showFeedback(res.correct, answer);
        var backBtn2 = card.querySelector('[data-quiz-back]');
        if (backBtn2) backBtn2.addEventListener('click', function () { if (onDone) onDone(res.correct, 'back'); });
        if (onDone) onDone(res.correct, 'answered');
      }
    });
  }

  Z.blocks = {
    renderBlock: renderBlock,
    bindCode: bindCode,
    bindQuiz: bindQuiz
  };
})(window.ZSB = window.ZSB || {});
