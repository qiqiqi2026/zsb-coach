/* 通用题目卡片：渲染 / 判分 / 交互（练习、独立练、模考复盘共用） */
(function (Z) {
  var supMap = { '²': '^2', '³': '^3', '⁴': '^4', '⁵': '^5', '⁻': '^-' };

  function normalize(s) {
    var out = String(s == null ? '' : s).trim().toLowerCase();
    out = out.replace(/[²³⁴⁵⁻]/g, function (ch) { return supMap[ch]; });
    out = out.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)');
    out = out.replace(/\\sqrt\{([^{}]+)\}/g, 'sqrt($1)');
    out = out.replace(/[{}]/g, '').replace(/\\[a-z]+/g, '');
    out = out.replace(/[×·]/g, '*').replace(/÷/g, '/').replace(/√/g, 'sqrt');
    out = out.replace(/[，,。;；]/g, ';');
    out = out.replace(/\s+/g, '');
    out = out.replace(/：/g, ':');
    return out;
  }

  function toNumber(s) {
    var t = normalize(s).replace(/^\+/, '');
    var m = t.match(/^\(?(-?\d+(?:\.\d+)?)\)?(?:\/\(?(-?\d+(?:\.\d+)?)\)?)?$/);
    if (!m) return null;
    var a = parseFloat(m[1]);
    var b = m[2] ? parseFloat(m[2]) : 1;
    if (b === 0) return null;
    return a / b;
  }

  function compareText(given, expected) {
    var g = normalize(given), e = normalize(expected);
    if (!g) return false;
    if (g === e) return true;
    var gn = toNumber(given), en = toNumber(expected);
    if (gn != null && en != null && Math.abs(gn - en) < 1e-9) return true;
    return false;
  }

  function keywordPass(given, keywords) {
    var g = normalize(given);
    return keywords.every(function (k) { return g.indexOf(normalize(k)) >= 0; });
  }

  function expectedText(q) {
    if (q.type === 'single' || q.type === 'multi' || q.type === 'reading' || q.type === 'cloze') return q.answer;
    return q.answer;
  }

  function checkSync(q, given) {
    var correct = false;
    if (q.type === 'single' || q.type === 'reading' || q.type === 'cloze') {
      correct = normalize(given).toUpperCase() === normalize(q.answer).toUpperCase();
    } else if (q.type === 'multi') {
      var g = normalize(given).toUpperCase().split('').sort().join('');
      var a = normalize(q.answer).toUpperCase().split('').sort().join('');
      correct = !!g && g === a;
    } else if (q.type === 'translation') {
      correct = compareText(given, q.answer) || (q.keywords && keywordPass(given, q.keywords));
    } else {
      var pool = [q.answer].concat(q.accept || []);
      correct = pool.some(function (x) { return compareText(given, x); });
    }
    return { correct: correct, expected: expectedText(q), given: given, kind: 'sync' };
  }

  function checkAsync(q, given) {
    if (q.type !== 'code') return Promise.resolve(checkSync(q, given));
    return Z.sandbox.run(given, q.tests || []).then(function (res) {
      var correct = !res.error && res.results.length > 0 && res.results.every(function (r) { return r.ok; });
      return {
        correct: correct,
        expected: (q.tests || []).map(function (t) { return t.input + ' → ' + t.expect; }).join('; '),
        given: given,
        kind: 'code',
        logs: res.logs || [],
        results: res.results || [],
        error: res.error || null
      };
    });
  }

  function renderOptions(q, opts) {
    opts = opts || {};
    var selected = opts.value ? normalize(opts.value).toUpperCase() : '';
    var html = (q.options || []).map(function (o) {
      var on = selected.indexOf(normalize(o.key).toUpperCase()) >= 0;
      return '<button type="button" class="opt' + (on ? ' on' : '') + '" data-key="' + Z.ui.esc(o.key) + '">' +
        '<span class="key">' + Z.ui.esc(o.key) + '</span><span>' + Z.ui.md(o.text) + '</span></button>';
    }).join('');
    if (q.type === 'multi') {
      html += '<div class="faint tiny mt8">多选题：选完点下方「提交答案」</div>';
    }
    return html;
  }

  function renderBlankRows(q, opts) {
    var vals = opts.blanks || {};
    return (q.blanks || []).map(function (b, i) {
      var v = vals[i] || '';
      return '<div class="blank-row"><label>' + Z.ui.esc(b.label) + '</label>' +
        '<input data-blank="' + i + '" value="' + Z.ui.esc(v) + '" placeholder="填这一步" autocomplete="off" /></div>';
    }).join('');
  }

  function render(q, opts) {
    opts = opts || {};
    var html = '<div class="q-card" data-qid="' + q.id + '">';
    html += '<div class="q-stem">' + Z.ui.md(q.stem) + '</div>';

    if (q.type === 'single' || q.type === 'multi' || q.type === 'reading' || q.type === 'cloze') {
      html += renderOptions(q, opts);
    } else if (q.type === 'fill' || q.type === 'calc') {
      if (q.blanks && q.blanks.length) html += renderBlankRows(q, opts);
      else html += '<input class="answer-input mt12" data-answer placeholder="' +
        (q.type === 'calc' ? '填写结果，如 6 或 3x^2+2' : '填写答案') + '" autocomplete="off" value="' + Z.ui.esc(opts.value || '') + '" />';
    } else if (q.type === 'translation') {
      html += '<textarea class="answer-input mt12" data-answer placeholder="写下你的翻译" spellcheck="false">' + Z.ui.esc(opts.value || '') + '</textarea>';
    } else if (q.type === 'code') {
      html += '<div class="faint tiny mt8">在下面写代码，测试用例会逐个跑。</div>' +
        '<textarea class="answer-input mt8 mono" data-answer rows="7" spellcheck="false">' + Z.ui.esc(opts.value || q.template || '') + '</textarea>' +
        '<div class="btn-row mt8"><button class="btn sm ghost" data-run>运行</button><button class="btn sm primary" data-submit>检查</button></div>' +
        '<div data-result class="mt8"></div>';
    }

    if (q.type !== 'code' && !opts.quiz && !opts.exam) {
      html += '<div class="btn-row mt12"><button class="btn primary block" data-submit>提交答案</button></div>';
    }
    html += '<div data-feedback></div></div>';
    return html;
  }

  function currentAnswer(card, q) {
    if (q.type === 'single' || q.type === 'multi' || q.type === 'reading' || q.type === 'cloze') {
      return Array.prototype.map.call(card.querySelectorAll('.opt.on'), function (el) { return el.dataset.key; }).join('');
    }
    if (q.type === 'fill' || q.type === 'calc') {
      if (q.blanks && q.blanks.length) {
        return Array.prototype.map.call(card.querySelectorAll('[data-blank]'), function (el) { return el.value; }).join('|');
      }
      var input = card.querySelector('[data-answer]');
      return input ? input.value : '';
    }
    var ta = card.querySelector('[data-answer]');
    return ta ? ta.value : '';
  }

  function mark(card, q, answer, correct) {
    card.dataset.answered = '1';
    Array.prototype.forEach.call(card.querySelectorAll('.opt'), function (el) {
      el.disabled = true;
      var key = normalize(el.dataset.key).toUpperCase();
      if (correct && normalize(answer).toUpperCase().indexOf(key) >= 0) el.classList.add('correct');
      if (!correct && normalize(answer).toUpperCase().indexOf(key) >= 0) el.classList.add('wrong');
      if (!correct && normalize(q.answer).toUpperCase().indexOf(key) >= 0) el.classList.add('correct');
    });
    if (q.type !== 'single' && q.type !== 'multi' && q.type !== 'reading' && q.type !== 'cloze') {
      Array.prototype.forEach.call(card.querySelectorAll('[data-answer],[data-blank]'), function (el) {
        el.classList.add(correct ? 'ok' : 'bad');
      });
    }
  }

  function bind(card, q, handlers) {
    handlers = handlers || {};
    var mode = handlers.mode || 'practice';

    function submit() {
      if (card.dataset.answered === '1') return;
      var answer = currentAnswer(card, q);
      if (q.type === 'code') {
        var resEl = card.querySelector('[data-result]');
        if (resEl) resEl.innerHTML = '<span class="faint tiny">正在运行测试…</span>';
        checkAsync(q, answer).then(function (res) {
          if (resEl) resEl.innerHTML = renderCodeResult(res);
          if (!res.correct) {
            card.dataset.answered = '1';
          }
          if (handlers.onSubmit) handlers.onSubmit(res, answer);
        });
        return;
      }
      var res = checkSync(q, answer);
      mark(card, q, answer, res.correct);
      if (handlers.onSubmit) handlers.onSubmit(res, answer);
    }

    card.addEventListener('click', function (e) {
      var opt = e.target.closest('.opt');
      if (opt && !opt.disabled) {
        if (mode === 'quiz' || q.type === 'single' || q.type === 'reading' || q.type === 'cloze') {
          if (q.type !== 'multi') {
            Array.prototype.forEach.call(card.querySelectorAll('.opt'), function (el) { el.classList.remove('on'); });
            opt.classList.add('on');
            submit();
            return;
          }
        }
        if (q.type === 'multi') opt.classList.toggle('on');
        else {
          Array.prototype.forEach.call(card.querySelectorAll('.opt'), function (el) { el.classList.remove('on'); });
          opt.classList.add('on');
        }
        return;
      }
      if (e.target.closest('[data-submit]')) submit();
      if (e.target.closest('[data-run]')) {
        var code = currentAnswer(card, q);
        var resEl2 = card.querySelector('[data-result]');
        if (resEl2) resEl2.innerHTML = '<span class="faint tiny">运行中…</span>';
        Z.sandbox.run(code, []).then(function (res) {
          if (resEl2) resEl2.innerHTML = renderRunResult(res);
        });
      }
    });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && (q.type === 'fill' || q.type === 'calc') && !q.blanks) {
        e.preventDefault();
        submit();
      }
    });
  }

  function renderCodeResult(res) {
    if (res.error) return '<div class="feedback bad">' + Z.ui.esc(res.error) + '</div>';
    var lines = res.results.map(function (r) {
      return '<div class="small ' + (r.ok ? 'green' : 'red') + '">' + (r.ok ? '✓ ' : '✕ ') +
        Z.ui.esc(r.input) + ' → 期望 ' + Z.ui.esc(r.expect) + '，实际 ' + Z.ui.esc(r.actual) + '</div>';
    }).join('');
    var logHtml = res.logs && res.logs.length ? '<div class="tiny faint mt8">输出：' + Z.ui.esc(res.logs.join(' / ')) + '</div>' : '';
    return '<div class="feedback ' + (res.correct ? 'ok' : 'bad') + '">' + lines + logHtml + '</div>';
  }

  function renderRunResult(res) {
    if (res.error) return '<div class="feedback bad">' + Z.ui.esc(res.error) + '</div>';
    var out = res.logs && res.logs.length ? res.logs.join('\n') : '(没有输出)';
    return '<div class="code-out">' + Z.ui.esc(out) + '</div>';
  }

  Z.question = {
    normalize: normalize,
    checkSync: checkSync,
    checkAsync: checkAsync,
    render: render,
    bind: bind,
    mark: mark,
    currentAnswer: currentAnswer
  };
})(window.ZSB = window.ZSB || {});
