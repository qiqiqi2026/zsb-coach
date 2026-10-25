/* 迷你模考卷：10 题 × 10 分，覆盖三科与阅读/完形/翻译 */
(function (Z) {
  function ana(answer, idea, steps, pit) {
    return '【答案】' + answer + '\n【思路】' + idea + '\n【步骤】' + steps + '\n【坑】' + pit;
  }

  var qs = [
    {
      id: 'mock-1', kpIds: ['eng-sentence'], subject: 'english', type: 'reading',
      stem: '**阅读短文，回答问题。**\n\nA new study finds that students who sleep fewer than six hours a night remember less of what they learn. The researchers explain that sleep helps the brain store new information. Therefore, staying up late to study may actually reduce learning.\n\nWhat is the main idea of the passage?',
      options: [
        { key: 'A', text: 'Students should study late at night.' },
        { key: 'B', text: 'Enough sleep helps students remember what they learn.' },
        { key: 'C', text: 'Six hours of sleep is enough for everyone.' },
        { key: 'D', text: 'New information is stored in the morning.' }
      ],
      answer: 'B', points: 10, source: '自建·同源外刊改写', difficulty: 2, estSeconds: 90,
      skillTag: '主旨句定位',
      analysis: ana('B', '首段主题句：睡眠少→记得少；第二句解释睡眠帮助大脑储存信息。', '1. 找主题句：students who sleep fewer than six hours remember less。\n2. 反推：睡眠充足有助于记忆。\n3. B 是主题的同义改写。', 'A、C、D 都在原文里找不到依据，属于「常识干扰」或「偷换」。'),
      lessonAnchor: { lessonId: 'eng-wordclass-L1', blockIndex: 1 }
    },
    {
      id: 'mock-2', kpIds: ['eng-wordclass'], subject: 'english', type: 'cloze',
      stem: '**完形填空。**\n\nI wanted to join the club, ___ I was too busy with my exams.',
      options: [
        { key: 'A', text: 'because' }, { key: 'B', text: 'but' },
        { key: 'C', text: 'so' }, { key: 'D', text: 'or' }
      ],
      answer: 'B', points: 10, source: '自建', difficulty: 2, estSeconds: 40,
      skillTag: '逻辑关系·转折',
      analysis: ana('B', '两个分句是相反关系：想参加 vs 没时间。', '1. 前句「想参加」是正向。\n2. 后句「太忙」是负向。\n3. 转折用 but。', 'because 表因果，so 表结果，or 表选择，都不符合「相反」。'),
      lessonAnchor: { lessonId: 'eng-wordclass-L1', blockIndex: 5 }
    },
    {
      id: 'mock-3', kpIds: ['eng-wordclass'], subject: 'english', type: 'translation',
      stem: '翻译：**越来越多的人选择在网上学习。**',
      answer: 'More and more people choose to study online.',
      keywords: ['more', 'people', 'online'],
      points: 10, source: '自建', difficulty: 2, estSeconds: 90,
      skillTag: '主谓宾翻译',
      analysis: ana('More and more people choose to study online.', '先定主干：人 + 选择 + 学习；地点状语放句末。', '1. 「越来越多」→ more and more。\n2. 「人」→ people。\n3. 「选择在网上学习」→ choose to study online。', '不要把「在网上」直译成 on the Internet 放句首导致结构混乱；choose 后接 to do。'),
      lessonAnchor: { lessonId: 'eng-wordclass-L1', blockIndex: 0 }
    },
    {
      id: 'mock-4', kpIds: ['eng-present', 'eng-perfect'], subject: 'english', type: 'single',
      stem: 'He ___ in Beijing since 2020.',
      options: [
        { key: 'A', text: 'lives' }, { key: 'B', text: 'lived' },
        { key: 'C', text: 'has lived' }, { key: 'D', text: 'is living' }
      ],
      answer: 'C', points: 10, source: '自建', difficulty: 3, estSeconds: 45,
      skillTag: 'since + 现在完成时',
      analysis: ana('C', 'since 2020 表示「从过去持续到现在」，用现在完成时。', '1. since + 时间点 → 现在完成时。\n2. 主语 He → has。\n3. live 变过去分词 lived。', '看到现在完成时就以为是「过去」，忽略它对现在的影响。'),
      lessonAnchor: { lessonId: 'eng-present-L2', blockIndex: 8 }
    },
    {
      id: 'mock-5', kpIds: ['math-limit-calc'], subject: 'math', type: 'fill',
      stem: '求极限：$\\lim_{x\\to 2}\\frac{x^2-4}{x-2}$ = ?',
      answer: '4',
      points: 10, source: '自建', difficulty: 2, estSeconds: 60,
      skillTag: '0/0 型因式分解',
      analysis: ana('4', '代入得 0/0，先因式分解约掉公因子。', '1. 分子 x²-4=(x-2)(x+2)。\n2. 约去 x-2，得 x+2。\n3. 代入 x=2，得 4。', '直接代入 0/0 就写「不存在」；0/0 是未定式，需要化简。'),
      lessonAnchor: { lessonId: 'math-deriv-def-L1', blockIndex: 5 }
    },
    {
      id: 'mock-6', kpIds: ['math-deriv-basic'], subject: 'math', type: 'calc',
      stem: '已知 $f(x)=x^3-3x$，求 $f\'(1)$。',
      answer: '0', accept: ["f'(1)=0", '0'],
      points: 10, source: '自建', difficulty: 2, estSeconds: 60,
      skillTag: '多项式求导代入',
      analysis: ana('0', '先求导，再代入 x=1。', '1. f′(x)=3x²-3。\n2. 代入 x=1：3-3=0。', '直接把 1 代进原函数得到 -2，忘记先求导。'),
      lessonAnchor: { lessonId: 'math-deriv-basic-L2', blockIndex: 8 }
    },
    {
      id: 'mock-7', kpIds: ['math-deriv-def'], subject: 'math', type: 'single',
      stem: '函数在某点可导，则它在该点一定？',
      options: [
        { key: 'A', text: '连续' }, { key: 'B', text: '不连续' },
        { key: 'C', text: '导数为 0' }, { key: 'D', text: '是偶函数' }
      ],
      answer: 'A', points: 10, source: '自建', difficulty: 2, estSeconds: 40,
      skillTag: '可导与连续',
      analysis: ana('连续', '可导必连续，连续不一定可导。', '1. 可导意味着差商极限存在。\n2. 极限存在可推出函数在该点连续。\n3. 反例：|x| 在 0 点连续但不可导。', '把充分必要条件搞反，以为连续一定可导。'),
      lessonAnchor: { lessonId: 'math-deriv-def-L1', blockIndex: 8 }
    },
    {
      id: 'mock-8', kpIds: ['cs-array'], subject: 'cs', type: 'single',
      stem: '`const arr = [1, 2, 3];` 中 `arr.length` 的值是？',
      options: [
        { key: 'A', text: '2' }, { key: 'B', text: '3' },
        { key: 'C', text: '4' }, { key: 'D', text: 'undefined' }
      ],
      answer: 'B', points: 10, source: '自建', difficulty: 1, estSeconds: 25,
      skillTag: '数组长度',
      analysis: ana('3', 'length 是元素个数，不是最大下标。', '1. 数组有 3 个元素。\n2. length=3。\n3. 最大下标是 2。', '把 length 和最后一个下标搞混，得到 2。'),
      lessonAnchor: { lessonId: 'cs-var-type-L1', blockIndex: 5 }
    },
    {
      id: 'mock-9', kpIds: ['cs-loop'], subject: 'cs', type: 'fill',
      stem: '```js\nlet sum = 0;\nfor (let i = 1; i <= 4; i++) {\n  sum += i;\n}\nconsole.log(sum);\n```\n输出是？',
      answer: '10',
      points: 10, source: '自建', difficulty: 1, estSeconds: 40,
      skillTag: '循环累加',
      analysis: ana('10', '1+2+3+4=10。', '1. i=1,2,3,4 依次累加。\n2. sum=10。', '把 i<=4 当 i<4，得到 6。'),
      lessonAnchor: { lessonId: 'cs-loop-L2', blockIndex: 7 }
    },
    {
      id: 'mock-10', kpIds: ['cs-var-type'], subject: 'cs', type: 'fill',
      stem: '```js\nlet x = 5;\nfunction f() {\n  let x = 10;\n  return x;\n}\nconsole.log(f());\nconsole.log(x);\n```\n两行输出依次是什么？（用空格分隔）',
      answer: '10 5', accept: ['10,5', '10，5'],
      points: 10, source: '自建', difficulty: 3, estSeconds: 50,
      skillTag: '作用域',
      analysis: ana('10 5', '函数内部的 let x 是局部变量，不影响外部 x。', '1. f() 内部 x=10，返回 10。\n2. 外部 x 仍是 5。\n3. 输出 10 5。', '以为函数内重新赋值会改掉外部变量；let 在函数内是新的局部绑定。'),
      lessonAnchor: { lessonId: 'cs-var-type-L1', blockIndex: 8 }
    }
  ];

  Z.MOCK_QUESTIONS = qs;
  Z.MOCK_Q_BY_ID = {};
  qs.forEach(function (q) { Z.MOCK_Q_BY_ID[q.id] = q; });

  Z.MOCK_PAPERS = [
    {
      id: 'mock-paper-1',
      title: '迷你综合模考 · 10 题',
      subject: '综合',
      durationMin: 25,
      totalPoints: 100,
      desc: '英语 4 + 高数 3 + 计算机 3，用来走通「计时 → 交卷 → 失分分析」全流程。',
      questionIds: qs.map(function (q) { return q.id; })
    }
  ];
})(window.ZSB = window.ZSB || {});
