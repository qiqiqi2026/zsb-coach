/* 自检：种子数据完整性 + 关键纯函数 + 沙箱执行 */
(function (Z) {
  var rows = document.getElementById('rows');
  var summary = document.getElementById('summary');
  var results = [];
  var snapshot = null;

  function push(name, pass, detail) {
    results.push({ name: name, pass: !!pass, detail: detail || '' });
    var div = document.createElement('div');
    div.className = 't-row';
    div.innerHTML = '<div class="t-mark ' + (pass ? 'pass' : 'fail') + '">' + (pass ? '✓' : '✕') + '</div>' +
      '<div><div class="t-name">' + Z.ui.esc(name) + '</div>' +
      (detail ? '<div class="t-detail">' + Z.ui.esc(detail) + '</div>' : '') + '</div>';
    rows.appendChild(div);
  }

  function fresh() {
    Z.store.resetAll();
    Z.store.update(function (s) {
      s.profile.onboarded = true;
      s.profile.dailyMinutes = 180;
    });
    Z.store.initBaseline();
  }

  function addAttempt(qid, correct, source, ts) {
    Z.store.addAttempt({ questionId: qid, correct: !!correct, source: source || 'practice', errorType: correct ? null : 'concept', ts: ts || Date.now() });
  }

  var TESTS = [
    {
      name: '种子数据：三科 × 多章 × ≥120 考点',
      run: function () {
        var bad = [];
        Z.SUBJECT_ORDER.forEach(function (s) {
          var chs = Z.chaptersOf(s);
          if (chs.length < 3) bad.push(s + ' 章节不足（' + chs.length + '）');
          if (Z.kpsOf(s).length < 20) bad.push(s + ' 考点不足 20');
        });
        if (Z.KPS.length < 120) bad.push('考点只有 ' + Z.KPS.length);
        return { pass: bad.length === 0, detail: bad.join('；') || ('考点 ' + Z.KPS.length + ' 个 / 章节 ' + Z.SUBJECT_ORDER.map(function (s) { return Z.chaptersOf(s).length; }).join('·')) };
      }
    },
    {
      name: '模块齐全：Python / HTML / JS / 网安 / 爬虫 / 数据库 / 软工',
      run: function () {
        var names = Z.chaptersOf('cs').map(function (c) { return c.name; });
        var need = ['Python 编程', 'HTML 与 CSS', 'JavaScript 前端', '网络安全', '爬虫与数据', '数据库', '软件工程'];
        var missing = need.filter(function (n) { return names.indexOf(n) < 0; });
        var thin = Z.chaptersOf('cs').filter(function (c) { return c.kps.length < 3; }).map(function (c) { return c.name; });
        return { pass: !missing.length && !thin.length, detail: missing.length ? ('缺模块：' + missing.join('、')) : (thin.length ? ('模块考点过少：' + thin.join('、')) : ('计算机 ' + names.length + ' 个模块全部就位')) };
      }
    },
    {
      name: '种子数据：≥100 份讲义、≥450 题、10 题模考',
      run: function () {
        var L = Z.LESSONS.length, Q = Z.QUESTIONS.length, M = Z.MOCK_PAPERS[0].questionIds.length;
        return { pass: L >= 100 && Q >= 450 && M === 10, detail: 'Lesson ' + L + ' / 题 ' + Q + ' / 模考 ' + M };
      }
    },
    {
      name: '图解：≥50 张，且讲义引用的图解都存在',
      run: function () {
        var n = Object.keys(Z.DIAGRAMS || {}).length;
        return { pass: n >= 50, detail: '图解 ' + n + ' 张' };
      }
    },
    {
      name: '讲义完整：每份都有多段讲解、例题、跟练、小结与费曼',
      run: function () {
        var bad = [];
        Z.LESSONS.forEach(function (l) {
          var secs = (l.sections || []).length;
          var ex = (l.workedExamples || []).length;
          var gd = (l.guidedPractice || []).length;
          var solo = (l.independentPractice || []).length + (l.challenge || []).length;
          var sum = l.summary || {};
          if (secs < 8) bad.push(l.id + ' 讲解仅 ' + secs + ' 段');
          if (ex < 1) bad.push(l.id + ' 缺例题');
          if (gd < 1) bad.push(l.id + ' 缺跟练');
          if (solo < 1) bad.push(l.id + ' 缺独立练');
          if (!sum.essence || !(sum.checklist || []).length) bad.push(l.id + ' 小结不完整');
          if (!l.feynmanPrompt) bad.push(l.id + ' 缺费曼问题');
        });
        return { pass: bad.length === 0, detail: bad.length ? bad.slice(0, 8).join('；') : (Z.LESSONS.length + ' 份讲义结构完整') };
      }
    },
    {
      name: '覆盖：每个考点都有讲义，且至少 3 道题',
      run: function () {
        var noLesson = [], fewQ = [];
        Z.KPS.forEach(function (kp) {
          if (!Z.lessonsOfKp(kp.id).length) noLesson.push(kp.title);
          var n = Z.questionsOfKp(kp.id).length;
          if (n < 3) fewQ.push(kp.title + '(' + n + ')');
        });
        var ok = !noLesson.length && !fewQ.length;
        return { pass: ok, detail: ok ? (Z.KPS.length + ' 个考点全部覆盖') : ('缺讲义：' + (noLesson.join('、') || '无') + '；题不足：' + (fewQ.join('、') || '无')) };
      }
    },
    {
      name: '引用完整性：讲义里的题目与图解都存在',
      run: function () {
        var bad = [];
        Z.LESSONS.forEach(function (l) {
          (l.sections || []).forEach(function (b) {
            if (b.type === 'quiz' && !Z.Q_BY_ID[b.questionId]) bad.push(l.id + '/小问 ' + b.questionId);
            if (b.type === 'diagram' && !(Z.DIAGRAMS && Z.DIAGRAMS[b.diagramId])) bad.push(l.id + '/图解 ' + b.diagramId);
            if (b.type === 'compare' && (!b.headers || !b.rows)) bad.push(l.id + '/对比表缺字段');
          });
          (l.guidedPractice || []).forEach(function (g) { if (!Z.Q_BY_ID[g.questionId]) bad.push(l.id + '/跟练 ' + g.questionId); });
          (l.independentPractice || []).forEach(function (id) { if (!Z.Q_BY_ID[id]) bad.push(l.id + '/独立练 ' + id); });
          (l.challenge || []).forEach(function (id) { if (!Z.Q_BY_ID[id]) bad.push(l.id + '/挑战 ' + id); });
        });
        return { pass: bad.length === 0, detail: bad.length ? bad.slice(0, 6).join('；') : '全部引用有效' };
      }
    },
    {
      name: '每科至少 1 个六阶段完整 Lesson',
      run: function () {
        var bad = [];
        Z.SUBJECT_ORDER.forEach(function (s) {
          var ok = Z.lessonsOfSubject(s).some(function (l) {
            return l.sections && l.sections.length && l.workedExamples.length && l.guidedPractice.length &&
              (l.independentPractice.length + l.challenge.length) && l.summary && l.feynmanPrompt;
          });
          if (!ok) bad.push(s);
        });
        return { pass: !bad.length, detail: bad.length ? '缺：' + bad.join('、') : '三科均具备' };
      }
    },
    {
      name: '判分：单选 / 填空 / 数值等价',
      run: function () {
        fresh();
        var a = Z.question.checkSync(Z.Q_BY_ID['eng-wc-q1'], 'B');
        var b = Z.question.checkSync(Z.Q_BY_ID['eng-wc-q1'], 'A');
        var c = Z.question.checkSync(Z.Q_BY_ID['math-dd-q1'], '6m/s');
        var d = Z.question.checkSync(Z.Q_BY_ID['math-dd-ex'], "f'(2)=4");
        var ok = a.correct && !b.correct && c.correct && d.correct;
        return { pass: ok, detail: 'B→' + a.correct + '，A→' + b.correct + '，6m/s→' + c.correct + '，f\'(2)=4→' + d.correct };
      }
    },
    {
      name: '沙箱：代码题测试用例全绿',
      run: function () {
        var q = Z.Q_BY_ID['cs-vt-i3'];
        return Z.sandbox.run('function toNumber(str){ return Number(str); }', q.tests).then(function (res) {
          var detail = res.error ? ('错误：' + res.error) : res.results.map(function (r) { return (r.ok ? '✓' : '✕') + r.input + '→' + r.actual; }).join(' ');
          var ok = !res.error && res.results.length === 3 && res.results.every(function (r) { return r.ok; });
          return { pass: ok, detail: detail };
        });
      }
    },
    {
      name: '掌握度：全对 > 全错，且被夹在 0–1',
      run: function () {
        fresh();
        addAttempt('eng-wc-q1', true);
        addAttempt('eng-wc-q2', true);
        addAttempt('eng-wc-q3', true);
        var good = Z.engine.mastery('eng-wordclass');
        fresh();
        addAttempt('eng-wc-q1', false);
        addAttempt('eng-wc-q2', false);
        addAttempt('eng-wc-q3', false);
        var bad = Z.engine.mastery('eng-wordclass');
        return { pass: good > bad && good <= 1 && bad >= 0, detail: '全对 ' + good + ' / 全错 ' + bad };
      }
    },
    {
      name: '掌握度：只学不练封顶 40%',
      run: function () {
        fresh();
        Z.store.upsertProgress('eng-wordclass-L1', { status: 'done', quizCorrect: 5, quizTotal: 5, feynmanScore: 0.9 });
        var m = Z.engine.mastery('eng-wordclass');
        return { pass: m <= 0.4 + 1e-9, detail: '只学不练 = ' + m };
      }
    },
    {
      name: '掌握度：30 天后开始衰减',
      run: function () {
        fresh();
        addAttempt('math-dd-q2', true, 'practice', Date.now() - 45 * 86400000);
        var m = Z.engine.mastery('math-deriv-def');
        fresh();
        addAttempt('math-dd-q2', true, 'practice', Date.now());
        var now = Z.engine.mastery('math-deriv-def');
        return { pass: m < now, detail: '45 天前 ' + m + ' / 现在 ' + now };
      }
    },
    {
      name: '达标线：目标分越高，要求掌握度越高',
      run: function () {
        fresh();
        Z.store.setProfile({ targetScores: { english: 90, math: 90, cs: 90 } });
        var low = Z.engine.requiredMastery('eng-wordclass');
        Z.store.setProfile({ targetScores: { english: 145, math: 145, cs: 145 } });
        var high = Z.engine.requiredMastery('eng-wordclass');
        return { pass: high > low && low >= 0 && high <= 1, detail: '90 分→' + low + ' / 145 分→' + high };
      }
    },
    {
      name: '解锁：未完成上一课则 L2 锁定，完成后解锁',
      run: function () {
        fresh();
        var lesson = Z.LESSON_BY_ID['eng-present-L2'];
        var before = Z.engine.lessonUnlock(lesson).unlocked;
        Z.store.upsertProgress('eng-wordclass-L1', { status: 'done', quizCorrect: 9, quizTotal: 10 });
        var after = Z.engine.lessonUnlock(lesson).unlocked;
        return { pass: before === false && after === true, detail: '完成前 ' + before + ' / 完成后 ' + after };
      }
    },
    {
      name: '今日任务：非空且总时长不超预算',
      run: function () {
        fresh();
        var tasks = Z.engine.tasksForToday();
        var total = tasks.reduce(function (s, t) { return s + t.minutes; }, 0);
        return { pass: tasks.length >= 3 && total <= 180, detail: tasks.length + ' 项 / ' + total + ' 分钟' };
      }
    },
    {
      name: '失分分析：全错一整套 → 丢 100 分',
      run: function () {
        fresh();
        var paper = Z.MOCK_PAPERS[0];
        var mock = { paperId: paper.id, results: paper.questionIds.map(function (id) { return { questionId: id, correct: false, errorType: 'concept' }; }) };
        var an = Z.engine.examAnalysis(mock);
        return { pass: an.lost === 100 && an.errorTypes.concept === 100 && an.topKps.length > 0, detail: '丢分 ' + an.lost + ' / 概念错误 ' + an.errorTypes.concept };
      }
    },
    {
      name: '预测：当前分与目标分同量纲（0–150）',
      run: function () {
        fresh();
        var p = Z.engine.prediction();
        var s = p.subjects.english;
        return { pass: s.currentScore >= 0 && s.currentScore <= 150 && s.target > 0, detail: '英语当前 ' + s.currentScore.toFixed(1) + ' / 目标 ' + s.target };
      }
    }
  ];

  function runAll() {
    var i = 0;
    function next() {
      if (i >= TESTS.length) return finish();
      var t = TESTS[i++];
      try {
        var r = t.run();
        if (r && typeof r.then === 'function') {
          r.then(function (x) { push(t.name, x.pass, x.detail); next(); }, function (e) { push(t.name, false, '异常：' + e.message); next(); });
        } else {
          push(t.name, r.pass, r.detail);
          next();
        }
      } catch (e) {
        push(t.name, false, '异常：' + e.message);
        next();
      }
    }
    next();
  }

  function finish() {
    if (snapshot) Z.store.importJSON(snapshot, 'overwrite');
    var pass = results.filter(function (r) { return r.pass; }).length;
    summary.innerHTML = '通过 ' + pass + ' / ' + results.length +
      ' <span class="' + (pass === results.length ? 'pass' : 'fail') + '">' + (pass === results.length ? '全部通过' : '存在失败项') + '</span>' +
      '<div class="tiny faint" style="margin-top:6px">本地数据已恢复</div>';
  }

  snapshot = Z.store.exportJSON();
  runAll();
})(window.ZSB = window.ZSB || {});
