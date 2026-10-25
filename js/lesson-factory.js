/* 内容工厂：把精简的「讲义脚本」展开成六阶段完整讲义；同时快速生成规范题目 */
(function (Z) {
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  function toText(md) {
    return String(md == null ? '' : md).replace(/\r/g, '');
  }

  function normalizePoint(p) {
    if (typeof p === 'string') return { title: '', md: toText(p) };
    return { title: p.title || '', md: toText(p.md) };
  }

  function normalizeExample(ex, index) {
    ex = ex || {};
    var steps = ex.steps || [];
    return {
      title: ex.title || ('例题 ' + (index + 1)),
      steps: steps.map(function (s, i) {
        var item = typeof s === 'string' ? { md: s } : s;
        return { no: item.no || i + 1, md: toText(item.md || item.text || ''), askBefore: item.askBefore !== false };
      }),
      takeaway: ex.takeaway || ''
    };
  }

  /* 讲义：spec 里只写内容，结构由工厂负责 */
  Z.makeLesson = function (spec) {
    spec = spec || {};
    var points = (spec.points || []).map(normalizePoint);
    var quizIds = spec.quizIds || [];
    var sections = [];

    if (spec.idea) sections.push({ type: 'text', md: toText(spec.idea) });
    if (spec.diagramId) {
      sections.push({ type: 'diagram', diagramId: spec.diagramId, caption: spec.diagramCaption || '' });
    }
    if (spec.analogy) {
      sections.push({ type: 'analogy', title: spec.analogy.title || '打个比方', md: toText(spec.analogy.md) });
    }

    /* 把随堂小问均匀地插在知识点之间，避免「一口气读十段」 */
    var per = Math.max(1, Math.floor(points.length / Math.max(1, quizIds.length)));
    var qi = 0;
    points.forEach(function (p, i) {
      var md = p.title ? '**' + p.title + '**\n' + p.md : p.md;
      sections.push({ type: 'text', md: md });
      if (qi < quizIds.length && (i + 1) % per === 0) {
        sections.push({ type: 'quiz', questionId: quizIds[qi++], purpose: '边学边检查' });
      }
    });
    while (qi < quizIds.length) {
      sections.push({ type: 'quiz', questionId: quizIds[qi++], purpose: '边学边检查' });
    }

    if (spec.table && spec.table.headers && spec.table.rows) {
      sections.push({ type: 'compare', headers: spec.table.headers, rows: spec.table.rows });
    }
    if (spec.diagramId2) {
      sections.push({ type: 'diagram', diagramId: spec.diagramId2, caption: spec.diagramCaption2 || '' });
    }
    if (spec.code) sections.push({ type: 'code', code: toText(spec.code) });
    if (spec.warning) sections.push({ type: 'warning', md: toText(spec.warning) });
    (spec.extras || []).forEach(function (b) { sections.push(b); });
    if (spec.tip) sections.push({ type: 'tip', md: toText(spec.tip) });

    var examples = [];
    if (spec.example) examples.push(spec.example);
    if (spec.example2) examples.push(spec.example2);
    if (spec.examples) examples = examples.concat(spec.examples);

    var guided = spec.guided && spec.guided.length ? spec.guided : (quizIds.length ? [{ questionId: quizIds[0], hint: '回看本节对应知识点，再排除明显错误的选项。' }] : []);
    guided = guided.map(function (g) {
      return typeof g === 'string'
        ? { questionId: g, hint: '先回忆本节的定义，再动手。', revealAfterAttempts: 3 }
        : { questionId: g.questionId, hint: g.hint || '先回忆本节的定义，再动手。', revealAfterAttempts: g.revealAfterAttempts || 3 };
    });

    var solo = spec.solo || quizIds.slice(0, 2);
    var challenge = spec.challenge || [];

    return {
      id: spec.id,
      kpIds: spec.kpIds || [],
      subject: spec.subject || 'cs',
      level: spec.level || 2,
      title: spec.title || '未命名单元',
      estMinutes: spec.estMinutes || 35,
      prerequisites: spec.prerequisites || [],
      unlockRule: spec.unlockRule || {},
      hook: {
        title: spec.hookTitle || spec.title || '',
        body: toText(spec.hookBody || spec.idea || '')
      },
      sections: sections,
      workedExamples: examples.length ? examples.map(normalizeExample) : [
        normalizeExample({
          title: '把本节知识用一遍',
          steps: [
            { md: '先读出题目要求，圈出关键词。' },
            { md: '回忆本节的定义或公式，写出第一步。' },
            { md: '按步骤算完，最后回头检查单位、边界与符号。' }
          ],
          takeaway: '所有题都走同一条路：读题 → 找知识点 → 分步执行 → 检查。'
        }, 0)
      ],
      guidedPractice: guided,
      independentPractice: solo,
      challenge: challenge,
      summary: {
        essence: (spec.summary && spec.summary.essence) || spec.idea || '',
        formulas: (spec.summary && spec.summary.formulas) || [],
        pitfalls: (spec.summary && spec.summary.pitfalls) || [],
        checklist: (spec.summary && spec.summary.checklist) || []
      },
      feynmanPrompt: spec.feynman || '请用本节的概念，给一个完全没学过的人讲清楚：它是什么、为什么需要它、什么时候会用错。'
    };
  };

  /* 题目：把 options 简写成字符串数组，analysis 简写成对象 */
  Z.makeQ = function (q) {
    q = q || {};
    var options = q.options;
    if (options && typeof options[0] === 'string') {
      options = options.map(function (text, i) { return { key: LETTERS[i], text: text }; });
    }
    var a = q.analysis;
    var analysis;
    if (typeof a === 'string') {
      analysis = a;
    } else {
      a = a || {};
      analysis = '【答案】' + (a.ans || q.answer || '') +
        '\n【思路】' + (a.why || '') +
        '\n【步骤】' + (a.steps || '') +
        '\n【坑】' + (a.pit || '');
    }
    return {
      id: q.id,
      kpIds: q.kpIds || [],
      subject: q.subject || 'cs',
      type: q.type || (options ? 'single' : 'fill'),
      stem: toText(q.stem),
      options: options,
      answer: q.answer,
      accept: q.accept,
      analysis: analysis,
      difficulty: q.difficulty || 2,
      estSeconds: q.estSeconds || 45,
      skillTag: q.skillTag || '',
      source: q.source || '自建',
      lessonAnchor: q.lessonAnchor
    };
  };

  Z.makeQs = function (list) { return (list || []).map(Z.makeQ); };
})(window.ZSB = window.ZSB || {});
