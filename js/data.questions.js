/* 题库种子数据：45+ 题，覆盖选择/填空/计算/代码/阅读/完形/翻译 */
(function (Z) {
  function ana(answer, idea, steps, pit) {
    return '【答案】' + answer + '\n【思路】' + idea + '\n【步骤】' + steps + '\n【坑】' + pit;
  }

  var list = [
    /* ================= 英语 · 词性 ================= */
    {
      id: 'eng-wc-q1', kpIds: ['eng-wordclass'], subject: 'english', type: 'single',
      stem: '在句子 **I book a ticket yesterday.** 中，book 的词性是？',
      options: [
        { key: 'A', text: '名词' }, { key: 'B', text: '动词' },
        { key: 'C', text: '形容词' }, { key: 'D', text: '介词' }
      ],
      answer: 'B', source: '自建', difficulty: 2, estSeconds: 40,
      skillTag: '看位置判断词性',
      analysis: ana('动词', '先看它在句子里干什么，而不是背它最常见的意思。', '1. 句子主语是 I。\n2. book 后面接了宾语 a ticket。\n3. 「主语 + book + 宾语」是典型动宾结构，book 在这里表示「预订」。', '看到 book 就条件反射选名词。词性由句子里的岗位决定，不由单词本身决定。'),
      lessonAnchor: { lessonId: 'eng-wordclass-L1', blockIndex: 8 }
    },
    {
      id: 'eng-wc-q2', kpIds: ['eng-wordclass'], subject: 'english', type: 'single',
      stem: '**The train arrived late.** 中 late 的词性是？',
      options: [
        { key: 'A', text: '形容词' }, { key: 'B', text: '副词' },
        { key: 'C', text: '名词' }, { key: 'D', text: '连词' }
      ],
      answer: 'B', source: '自建', difficulty: 2, estSeconds: 35,
      skillTag: '修饰动词=副词',
      analysis: ana('副词', 'late 在修饰谁？它修饰的是动作 arrived。', '1. arrived 是动词。\n2. late 回答「到达得怎么样」。\n3. 修饰动词的词是副词。', 'late 也可以作形容词（a late train），但这句里它在修饰动词，所以是副词。'),
      lessonAnchor: { lessonId: 'eng-wordclass-L1', blockIndex: 5 }
    },
    {
      id: 'eng-wc-q3', kpIds: ['eng-wordclass'], subject: 'english', type: 'single',
      stem: '**We will meet after lunch.** 中 after 的词性是？',
      options: [
        { key: 'A', text: '介词' }, { key: 'B', text: '副词' },
        { key: 'C', text: '连词' }, { key: 'D', text: '代词' }
      ],
      answer: 'A', source: '自建', difficulty: 2, estSeconds: 35,
      skillTag: '介词后接名词',
      analysis: ana('介词', 'after 后面跟了名词 lunch，这是介词最典型的用法。', '1. after + 名词 = 介词短语。\n2. 介词负责给动作搭时间/地点/方式的关系。\n3. 若 after 引导一个完整句子（after we met），才是连词。', 'after 既能作介词也能作连词，要看后面接的是名词还是句子。'),
      lessonAnchor: { lessonId: 'eng-wordclass-L1', blockIndex: 7 }
    },
    {
      id: 'eng-wc-ex', kpIds: ['eng-wordclass', 'eng-sentence'], subject: 'english', type: 'fill',
      stem: '判断 **The quick brown fox jumps over the lazy dog.** 中 jumps 与 over 的词性，按「jumps：X；over：Y」作答。',
      answer: 'jumps：动词；over：介词', accept: ['jumps:动词;over:介词', 'jumps：动词，over：介词'],
      source: '自建', difficulty: 2, estSeconds: 60,
      skillTag: '整句逐词定岗',
      analysis: ana('jumps：动词；over：介词', '先找谓语动词，再找介词。', '1. The quick brown fox 是主语，中心词 fox。\n2. jumps 是谓语，表示动作。\n3. over 后接 the lazy dog，构成介词短语。', '别按单词表背词性；这个句子里 quick、brown、lazy 都是形容词，位置都在名词前。'),
      lessonAnchor: { lessonId: 'eng-wordclass-L1', blockIndex: 4 }
    },
    {
      id: 'eng-wc-g1', kpIds: ['eng-wordclass'], subject: 'english', type: 'fill',
      stem: '**She quickly finished her homework.** 给三个词定岗。',
      blanks: [
        { label: 'She', answer: '代词', hint: '它替代了某个人的名字。' },
        { label: 'quickly', answer: '副词', hint: '它修饰 finished 这个动作。' },
        { label: 'finished', answer: '动词', hint: '它是句子里表示动作的词。' }
      ],
      answer: '代词 / 副词 / 动词',
      source: '自建', difficulty: 2, estSeconds: 70, skillTag: '逐词定岗',
      analysis: ana('She 代词；quickly 副词；finished 动词', '先找动作，再看谁在做，最后看怎么做的。', '1. finished 是谓语动词。\n2. She 代替说话人，是代词作主语。\n3. quickly 修饰 finished，是副词。', 'her 是形容词性物主代词，修饰 homework，不是代词主格。'),
      lessonAnchor: { lessonId: 'eng-wordclass-L1', blockIndex: 7 }
    },
    {
      id: 'eng-wc-i1', kpIds: ['eng-wordclass'], subject: 'english', type: 'single',
      stem: '**The old man walks slowly.** 中 slowly 的词性是？',
      options: [
        { key: 'A', text: '形容词' }, { key: 'B', text: '副词' },
        { key: 'C', text: '名词' }, { key: 'D', text: '动词' }
      ],
      answer: 'B', source: '自建', difficulty: 1, estSeconds: 30,
      skillTag: '副词识别',
      analysis: ana('副词', 'slowly 修饰 walks，回答「走得怎么样」。', '1. walks 是动词。\n2. slowly 修饰动词。\n3. 修饰动词的是副词。', 'slow 是形容词，slowly 是副词，词尾 -ly 是常见信号但不是绝对。'),
      lessonAnchor: { lessonId: 'eng-wordclass-L1', blockIndex: 5 }
    },
    {
      id: 'eng-wc-i2', kpIds: ['eng-wordclass'], subject: 'english', type: 'fill',
      stem: '**Beautiful flowers bloom in spring.** 中 beautiful 的词性是？',
      answer: '形容词', accept: ['adj', 'adjective'],
      source: '自建', difficulty: 1, estSeconds: 30,
      skillTag: '形容词修饰名词',
      analysis: ana('形容词', 'beautiful 就在名词 flowers 前面，给花贴标签。', '1. flowers 是名词。\n2. beautiful 修饰 flowers。\n3. 修饰名词的是形容词。', '副词也可以放在前面，但 beautiful 是形容词，beautifully 才是副词。'),
      lessonAnchor: { lessonId: 'eng-wordclass-L1', blockIndex: 5 }
    },
    {
      id: 'eng-wc-i3', kpIds: ['eng-wordclass'], subject: 'english', type: 'single',
      stem: '**We study English after dinner.** 哪个词是介词？',
      options: [
        { key: 'A', text: 'study' }, { key: 'B', text: 'English' },
        { key: 'C', text: 'after' }, { key: 'D', text: 'dinner' }
      ],
      answer: 'C', source: '自建', difficulty: 1, estSeconds: 30,
      skillTag: '介词识别',
      analysis: ana('after', '介词是「搭桥词」，后面接名词构成介词短语。', '1. study 是动词，English 是名词。\n2. after 后面接 dinner，构成时间关系。\n3. after 在这里是介词。', 'after 也能引导从句，但后面只有名词时是介词。'),
      lessonAnchor: { lessonId: 'eng-wordclass-L1', blockIndex: 7 }
    },
    {
      id: 'eng-wc-c1', kpIds: ['eng-wordclass'], subject: 'english', type: 'single',
      stem: '**His running shoes are expensive.** 中 running 的词性是？',
      options: [
        { key: 'A', text: '动词' }, { key: 'B', text: '名词' },
        { key: 'C', text: '形容词（动名词作定语）' }, { key: 'D', text: '副词' }
      ],
      answer: 'C', source: '变式-源自 eng-wc-i1', difficulty: 4, estSeconds: 60,
      skillTag: '动名词作定语',
      analysis: ana('形容词性（动名词作定语）', 'running 在这里不是「正在跑」，而是在说明鞋的用途。', '1. 句子谓语是 are，running 不可能是谓语。\n2. running 放在名词 shoes 前，修饰鞋。\n3. 动名词作定语，起形容词作用，表示「用来跑步的」。', '看到 -ing 就选动词。先看它有没有谓语位置，再看它修饰谁。'),
      lessonAnchor: { lessonId: 'eng-wordclass-L1', blockIndex: 4 }
    },

    /* ================= 英语 · 一般现在时 ================= */
    {
      id: 'eng-pres-q1', kpIds: ['eng-present'], subject: 'english', type: 'single',
      stem: 'My sister ___ to school by bus every day.',
      options: [
        { key: 'A', text: 'go' }, { key: 'B', text: 'goes' },
        { key: 'C', text: 'going' }, { key: 'D', text: 'went' }
      ],
      answer: 'B', source: '自建', difficulty: 2, estSeconds: 35,
      skillTag: '第三人称单数',
      analysis: ana('goes', 'every day 提示一般现在时，主语 My sister 是第三人称单数。', '1. 主语第三人称单数。\n2. 一般现在时动词加 -s/-es。\n3. go → goes。', '看到 every day 却用过去时 went，是时态判断错。'),
      lessonAnchor: { lessonId: 'eng-present-L2', blockIndex: 4 }
    },
    {
      id: 'eng-pres-q2', kpIds: ['eng-present'], subject: 'english', type: 'single',
      stem: 'He doesn\'t ___ TV in the morning.',
      options: [
        { key: 'A', text: 'watches' }, { key: 'B', text: 'watch' },
        { key: 'C', text: 'watching' }, { key: 'D', text: 'watched' }
      ],
      answer: 'B', source: '自建', difficulty: 2, estSeconds: 35,
      skillTag: 'does 后动词原形',
      analysis: ana('watch', 'doesn\'t 已经承担了单三变化，后面的动词要回原形。', '1. doesn\'t = does not。\n2. 助动词 does 后面的实义动词用原形。\n3. 所以是 watch。', '很多人在 doesn\'t 后还写 watches，等于把单三标了两次。'),
      lessonAnchor: { lessonId: 'eng-present-L2', blockIndex: 6 }
    },
    {
      id: 'eng-pres-q3', kpIds: ['eng-present'], subject: 'english', type: 'single',
      stem: '下面哪个时间标志最可能对应一般现在时？',
      options: [
        { key: 'A', text: 'every Sunday' }, { key: 'B', text: 'right now' },
        { key: 'C', text: 'yesterday' }, { key: 'D', text: 'next week' }
      ],
      answer: 'A', source: '自建', difficulty: 1, estSeconds: 30,
      skillTag: '时间标志词',
      analysis: ana('every Sunday', '一般现在时表达习惯与规律，every Sunday 正是周期性信号。', '1. every + 时间 = 反复发生。\n2. right now 对应现在进行时。\n3. yesterday 对应一般过去时；next week 对应一般将来时。', '不要只背标志词，先理解「一直如此」这层含义。'),
      lessonAnchor: { lessonId: 'eng-present-L2', blockIndex: 8 }
    },
    {
      id: 'eng-pres-ex', kpIds: ['eng-present'], subject: 'english', type: 'fill',
      stem: '改错：**She go to school every day.**',
      answer: 'She goes to school every day.',
      accept: ['she goes to school every day', 'She goes to school every day'],
      source: '自建', difficulty: 2, estSeconds: 50,
      skillTag: '单三改错',
      analysis: ana('She goes to school every day.', '主语 She 是第三人称单数，一般现在时动词要加 -s。', '1. 找主语 She。\n2. 判断时态：every day → 一般现在时。\n3. go → goes。', '改错题只改一个词就好，别把整句重写导致新错误。'),
      lessonAnchor: { lessonId: 'eng-present-L2', blockIndex: 4 }
    },
    {
      id: 'eng-pres-g1', kpIds: ['eng-present'], subject: 'english', type: 'fill',
      stem: '填空：**He ___ (watch) TV every evening.** 否定句：**He ___ ___ TV every evening.**',
      blanks: [
        { label: '肯定句', answer: 'watches', hint: '主语 He 是第三人称单数，watch 以 ch 结尾加 -es。' },
        { label: '否定句①', answer: "doesn't", hint: '否定要借助助动词 does。' },
        { label: '否定句②', answer: 'watch', hint: 'does 后面的动词用原形。' }
      ],
      answer: 'watches / doesn\'t / watch',
      source: '自建', difficulty: 2, estSeconds: 80, skillTag: '单三与否定',
      analysis: ana('watches；doesn\'t watch', '先定时态，再处理单三，最后处理否定结构。', '1. every evening → 一般现在时。\n2. He 第三人称单数 → watches。\n3. 否定：doesn\'t + 动词原形 watch。', '不要写成 doesn\'t watches，单三只能标一次。'),
      lessonAnchor: { lessonId: 'eng-present-L2', blockIndex: 6 }
    },
    {
      id: 'eng-pres-i1', kpIds: ['eng-present'], subject: 'english', type: 'single',
      stem: 'The earth ___ around the sun.',
      options: [
        { key: 'A', text: 'move' }, { key: 'B', text: 'moves' },
        { key: 'C', text: 'moved' }, { key: 'D', text: 'is moving' }
      ],
      answer: 'B', source: '自建', difficulty: 2, estSeconds: 30,
      skillTag: '客观真理用一般现在时',
      analysis: ana('moves', '客观真理用一般现在时；主语 The earth 是单三。', '1. 地球绕太阳是客观事实。\n2. 一般现在时 + 单三。\n3. move → moves。', '看到「太阳/地球」就想到客观真理，不要被 is moving 的「正在」带跑。'),
      lessonAnchor: { lessonId: 'eng-present-L2', blockIndex: 2 }
    },
    {
      id: 'eng-pres-i2', kpIds: ['eng-present'], subject: 'english', type: 'fill',
      stem: '填空：They ___ (not like) coffee.',
      answer: "don't like", accept: ['do not like', "don't like"],
      source: '自建', difficulty: 2, estSeconds: 40,
      skillTag: '一般现在时否定',
      analysis: ana("don't like", '主语 They 是复数，否定用 don\'t + 动词原形。', '1. 主语非单三。\n2. 否定助动词用 do。\n3. like 保持原形。', '别写成 doesn\'t like，主谓不一致。'),
      lessonAnchor: { lessonId: 'eng-present-L2', blockIndex: 6 }
    },
    {
      id: 'eng-pres-c1', kpIds: ['eng-present'], subject: 'english', type: 'single',
      stem: '下面哪句语法正确？',
      options: [
        { key: 'A', text: 'Does she likes music?' },
        { key: 'B', text: 'Does she like music?' },
        { key: 'C', text: 'Do she likes music?' },
        { key: 'D', text: 'Does she like music.' }
      ],
      answer: 'B', source: '变式-源自 eng-pres-q2', difficulty: 3, estSeconds: 50,
      skillTag: '一般疑问句结构',
      analysis: ana('Does she like music?', '一般疑问句 = 助动词 + 主语 + 动词原形。', '1. 主语 she → 助动词用 Does。\n2. 实义动词 like 回原形。\n3. 疑问句用问号。', 'A 项 does 和 likes 双标单三；C 项主谓不一致；D 项标点错。'),
      lessonAnchor: { lessonId: 'eng-present-L2', blockIndex: 6 }
    },

    /* ================= 高数 · 导数定义 ================= */
    {
      id: 'math-dd-q1', kpIds: ['math-deriv-def'], subject: 'math', type: 'fill',
      stem: '物体运动位移 $s(t)=t^2$（米），求 2 秒到 4 秒的平均速度（m/s）。',
      answer: '6', accept: ['6m/s', '6 m/s'],
      source: '自建', difficulty: 2, estSeconds: 60,
      skillTag: '平均变化率',
      analysis: ana('6 m/s', '平均速度 = 位移改变量 ÷ 时间改变量。', '1. s(4)=16，s(2)=4。\n2. Δs=12，Δt=2。\n3. 12÷2=6。', '把 t=4 直接代进 s(t) 当答案；平均速度必须用差值。'),
      lessonAnchor: { lessonId: 'math-deriv-def-L1', blockIndex: 2 }
    },
    {
      id: 'math-dd-q2', kpIds: ['math-deriv-def'], subject: 'math', type: 'single',
      stem: '$f\'(x_0)$ 的几何意义是？',
      options: [
        { key: 'A', text: '曲线在 $(x_0,f(x_0))$ 处的切线斜率' },
        { key: 'B', text: '曲线在 $(x_0,f(x_0))$ 处的函数值' },
        { key: 'C', text: '曲线与 x 轴围成的面积' },
        { key: 'D', text: '曲线在区间上的平均高度' }
      ],
      answer: 'A', source: '自建', difficulty: 2, estSeconds: 40,
      skillTag: '导数的几何意义',
      analysis: ana('切线斜率', '割线斜率的极限就是切线斜率。', '1. 平均变化率是割线斜率。\n2. 让 Δx→0，割线趋近切线。\n3. 极限值就是切线斜率 f\'(x0)。', '把导数当成函数值是概念混淆；导数是「变化率」。'),
      lessonAnchor: { lessonId: 'math-deriv-def-L1', blockIndex: 8 }
    },
    {
      id: 'math-dd-q3', kpIds: ['math-deriv-def'], subject: 'math', type: 'single',
      stem: '下列说法正确的是？',
      options: [
        { key: 'A', text: '导数是一个极限值' },
        { key: 'B', text: '瞬时速度等于整段平均速度' },
        { key: 'C', text: '求导时可以直接令 Δt=0' },
        { key: 'D', text: '导数就是函数在某点的函数值' }
      ],
      answer: 'A', source: '自建', difficulty: 2, estSeconds: 40,
      skillTag: '导数定义理解',
      analysis: ana('导数是一个极限值', '导数是差商的极限，不是函数值，也不能让分母直接变 0。', '1. 差商 Δy/Δt 在 Δt≠0 时有意义。\n2. 取极限 Δt→0 才得到导数。\n3. 极限不是「代入 0」。', 'C 项最典型：直接代 0 会让分母为 0，运算无效。'),
      lessonAnchor: { lessonId: 'math-deriv-def-L1', blockIndex: 6 }
    },
    {
      id: 'math-dd-ex', kpIds: ['math-deriv-def'], subject: 'math', type: 'calc',
      stem: '用定义求 $f(x)=x^2$ 在 $x=2$ 处的导数。',
      answer: '4', accept: ['f\'(2)=4', '4'],
      source: '自建', difficulty: 3, estSeconds: 100,
      skillTag: '定义法求导',
      analysis: ana('4', '写出差商，化简，再取极限。', '1. Δy=f(2+Δx)-f(2)=(2+Δx)²-4=4Δx+(Δx)²。\n2. Δy/Δx=4+Δx。\n3. 令 Δx→0，得 4。', '展开时漏掉 (Δx)² 项；化简前就代 0 会得到 0/0。'),
      lessonAnchor: { lessonId: 'math-deriv-def-L1', blockIndex: 5 }
    },
    {
      id: 'math-dd-g1', kpIds: ['math-deriv-def'], subject: 'math', type: 'fill',
      stem: '$f(x)=3x+1$ 在 $x=1$ 处用定义求导，补全三步。',
      blanks: [
        { label: 'Δy =', answer: '3Δx', hint: 'f(1+Δx)-f(1)=3(1+Δx)+1-(4)。' },
        { label: 'Δy/Δx =', answer: '3', hint: '把 3Δx 除以 Δx。' },
        { label: 'f\'(1) =', answer: '3', hint: 'Δx→0 时差商的极限。' }
      ],
      answer: '3Δx / 3 / 3',
      source: '自建', difficulty: 2, estSeconds: 90, skillTag: '定义法三步',
      analysis: ana('3Δx；3；3', '一次函数的差商是常数，所以导数处处为 3。', '1. Δy=3Δx。\n2. 差商=3。\n3. 极限=3。', 'Δx 不能直接写成 0，要先约分再取极限。'),
      lessonAnchor: { lessonId: 'math-deriv-def-L1', blockIndex: 5 }
    },
    {
      id: 'math-dd-i1', kpIds: ['math-deriv-def'], subject: 'math', type: 'fill',
      stem: '求 $f(x)=x^2$ 在区间 $[1,3]$ 上的平均变化率。',
      answer: '4',
      source: '自建', difficulty: 1, estSeconds: 40,
      skillTag: '平均变化率',
      analysis: ana('4', '平均变化率 = [f(3)-f(1)]/(3-1)。', '1. f(3)=9，f(1)=1。\n2. 差值为 8。\n3. 8÷2=4。', '把区间端点代错，或者忘记除区间长度。'),
      lessonAnchor: { lessonId: 'math-deriv-def-L1', blockIndex: 2 }
    },
    {
      id: 'math-dd-i2', kpIds: ['math-deriv-def'], subject: 'math', type: 'calc',
      stem: '用定义求 $f(x)=x^2+1$ 在 $x=3$ 处的导数。',
      answer: '6', accept: ["f'(3)=6", '6'],
      source: '自建', difficulty: 3, estSeconds: 90,
      skillTag: '定义法求导',
      analysis: ana('6', '常数项 1 在差值中会抵消。', '1. Δy=(3+Δx)²+1-(9+1)=6Δx+(Δx)²。\n2. 差商=6+Δx。\n3. 极限=6。', '把常数项也算进变化量，导致多出 1。'),
      lessonAnchor: { lessonId: 'math-deriv-def-L1', blockIndex: 5 }
    },
    {
      id: 'math-dd-i3', kpIds: ['math-deriv-def'], subject: 'math', type: 'single',
      stem: '$f(x)=|x|$ 在 $x=0$ 处？',
      options: [
        { key: 'A', text: '可导，且导数为 0' },
        { key: 'B', text: '可导，且导数为 1' },
        { key: 'C', text: '不可导，因为左右导数不相等' },
        { key: 'D', text: '不可导，因为函数不连续' }
      ],
      answer: 'C', source: '自建', difficulty: 4, estSeconds: 60,
      skillTag: '左右导数',
      analysis: ana('不可导，左右导数不相等', '|x| 在 0 点连续但有尖角。', '1. 右导数：Δx>0 时差商=1，极限为 1。\n2. 左导数：Δx<0 时差商=-1，极限为 -1。\n3. 左右不相等，所以不可导。', '把「连续」当成「可导」。连续是可导的必要条件，不是充分条件。'),
      lessonAnchor: { lessonId: 'math-deriv-def-L1', blockIndex: 8 }
    },
    {
      id: 'math-dd-c1', kpIds: ['math-deriv-def'], subject: 'math', type: 'calc',
      stem: '用定义求 $f(x)=x^2$ 在 $x=0$ 处的导数，并说明它表示什么。',
      answer: '0', accept: ["f'(0)=0", '0'],
      source: '变式-源自 math-dd-ex', difficulty: 3, estSeconds: 90,
      skillTag: '定义法求导',
      analysis: ana("0，表示曲线 y=x² 在原点处切线水平", '差商化简后取极限。', '1. Δy=(Δx)²。\n2. 差商=Δx。\n3. 极限=0。', '答案是 0 并不代表没有切线，而是切线斜率为 0。'),
      lessonAnchor: { lessonId: 'math-deriv-def-L1', blockIndex: 8 }
    },

    /* ================= 高数 · 基本求导公式 ================= */
    {
      id: 'math-db-q1', kpIds: ['math-deriv-basic'], subject: 'math', type: 'fill',
      stem: '求导：$(x^5)\'$ = ?',
      answer: '5x^4', accept: ['5x⁴', '5*x^4'],
      source: '自建', difficulty: 1, estSeconds: 30,
      skillTag: '幂函数求导',
      analysis: ana('5x⁴', '幂函数公式：指数搬下来，指数减一。', '1. 指数 5 搬到前面。\n2. 新指数 5-1=4。\n3. 得 5x⁴。', '把指数减一写成除以 5，或忘记把指数搬下来。'),
      lessonAnchor: { lessonId: 'math-deriv-basic-L2', blockIndex: 2 }
    },
    {
      id: 'math-db-q2', kpIds: ['math-deriv-basic'], subject: 'math', type: 'single',
      stem: '下面哪个求导结果正确？',
      options: [
        { key: 'A', text: "$(\\sin x)'=\\cos x$" },
        { key: 'B', text: "$(\\cos x)'=\\sin x$" },
        { key: 'C', text: "$(e^x)'=xe^{x-1}$" },
        { key: 'D', text: "$(\\ln x)'=x$" }
      ],
      answer: 'A', source: '自建', difficulty: 2, estSeconds: 40,
      skillTag: '基本公式辨错',
      analysis: ana("(sin x)' = cos x", '基本公式要区分幂函数与指数、对数。', '1. sin 的导数是 cos。\n2. cos 的导数是 -sin，B 错。\n3. e^x 的导数还是 e^x；ln x 的导数是 1/x。', '把 e^x 当幂函数求导（应当保持本身），是最常见的公式误用。'),
      lessonAnchor: { lessonId: 'math-deriv-basic-L2', blockIndex: 1 }
    },
    {
      id: 'math-db-q3', kpIds: ['math-deriv-basic'], subject: 'math', type: 'fill',
      stem: '求导：$(3x^2-2x+1)\'$ = ?',
      answer: '6x-2', accept: ['6x - 2'],
      source: '自建', difficulty: 2, estSeconds: 40,
      skillTag: '多项式求导',
      analysis: ana('6x-2', '逐项求导，常数项导数为 0。', '1. (3x²)\'=6x。\n2. (-2x)\'=-2。\n3. (1)\'=0，合并得 6x-2。', '常数 1 求导后还剩 1；常数项必须归零。'),
      lessonAnchor: { lessonId: 'math-deriv-basic-L2', blockIndex: 7 }
    },
    {
      id: 'math-db-ex', kpIds: ['math-deriv-basic'], subject: 'math', type: 'calc',
      stem: '求 $f(x)=x^3+2x-5$ 的导数。',
      answer: '3x^2+2', accept: ['3x²+2', '3x^2 + 2'],
      source: '自建', difficulty: 2, estSeconds: 60,
      skillTag: '多项式求导',
      analysis: ana('3x²+2', '逐项套公式。', '1. (x³)\'=3x²。\n2. (2x)\'=2。\n3. (-5)\'=0。', '把 -5 的导数写成 -5。'),
      lessonAnchor: { lessonId: 'math-deriv-basic-L2', blockIndex: 7 }
    },
    {
      id: 'math-db-g1', kpIds: ['math-deriv-basic'], subject: 'math', type: 'fill',
      stem: '$f(x)=3x^2+2\\sqrt{x}$，逐项求导并合并。',
      blanks: [
        { label: '(3x²)′ =', answer: '6x', hint: '指数 2 搬下来乘 3，指数减一。' },
        { label: '(2√x)′ =', answer: '1/√x', hint: '√x = x^(1/2)，求导得 (1/2)x^(-1/2)，再乘 2。' },
        { label: 'f′(x) =', answer: '6x+1/√x', hint: '把两项相加。' }
      ],
      answer: '6x / 1/√x / 6x+1/√x',
      source: '自建', difficulty: 3, estSeconds: 100, skillTag: '根式求导',
      analysis: ana('6x；1/√x；6x+1/√x', '先把根号写成分数指数，再套幂函数公式。', '1. 3x² → 6x。\n2. 2√x=2x^(1/2) → x^(-1/2)=1/√x。\n3. 合并。', '忘记把 √x 转成 x^(1/2)，直接对根号求导容易卡住。'),
      lessonAnchor: { lessonId: 'math-deriv-basic-L2', blockIndex: 2 }
    },
    {
      id: 'math-db-i1', kpIds: ['math-deriv-basic'], subject: 'math', type: 'fill',
      stem: '求导：$(\\frac{1}{x})\'$ = ?',
      answer: '-1/x^2', accept: ['-1/x²', '-x^(-2)'],
      source: '自建', difficulty: 2, estSeconds: 40,
      skillTag: '负指数求导',
      analysis: ana('-1/x²', '把 1/x 写成 x^(-1) 再用幂函数公式。', '1. 1/x=x⁻¹。\n2. 导数=-1·x⁻²。\n3. 即 -1/x²。', '把 1/x 当成常数，导数为 0。'),
      lessonAnchor: { lessonId: 'math-deriv-basic-L2', blockIndex: 2 }
    },
    {
      id: 'math-db-i2', kpIds: ['math-deriv-basic'], subject: 'math', type: 'calc',
      stem: '求 $f(x)=x^2e^x$ 的导数。',
      answer: 'e^x(x^2+2x)', accept: ['(x^2+2x)e^x', 'x^2e^x+2xe^x', 'e^x(x²+2x)'],
      source: '自建', difficulty: 3, estSeconds: 90,
      skillTag: '乘积法则',
      analysis: ana('e^x(x²+2x)', '乘积求导：前导后不导 + 前不导后导。', '1. (x²)\'=2x，乘 e^x 得 2xe^x。\n2. x² 乘 (e^x)\'=e^x，得 x²e^x。\n3. 相加并提取 e^x。', '只对 x² 求导而忘记 e^x 也要求导；乘积法则不能只导一项。'),
      lessonAnchor: { lessonId: 'math-deriv-basic-L2', blockIndex: 8 }
    },
    {
      id: 'math-db-i3', kpIds: ['math-deriv-basic'], subject: 'math', type: 'single',
      stem: '$(e^x)\'$ 等于？',
      options: [
        { key: 'A', text: 'e^x' }, { key: 'B', text: 'xe^{x-1}' },
        { key: 'C', text: 'e^{x-1}' }, { key: 'D', text: 'ln x' }
      ],
      answer: 'A', source: '自建', difficulty: 1, estSeconds: 25,
      skillTag: '指数函数求导',
      analysis: ana('e^x', 'e^x 的导数还是 e^x，这是它最特殊的性质。', '1. e 是常数，底数为 e 的指数函数求导保持本身。\n2. 不要套幂函数公式。\n3. 结果为 e^x。', '把 e^x 当 x^n 求导，得到 xe^{x-1}。'),
      lessonAnchor: { lessonId: 'math-deriv-basic-L2', blockIndex: 1 }
    },
    {
      id: 'math-db-c1', kpIds: ['math-deriv-basic'], subject: 'math', type: 'calc',
      stem: '求 $f(x)=(x^2+1)(x-1)$ 的导数（先用乘积法则，再展开验证）。',
      answer: '3x^2-2x+1', accept: ['3x²-2x+1', '3x^2 - 2x + 1'],
      source: '变式-源自 math-db-i2', difficulty: 4, estSeconds: 120,
      skillTag: '乘积法则与展开',
      analysis: ana('3x²-2x+1', '先展开成多项式再求导更快，也可用乘积法则验证。', '1. 展开：x³-x²+x-1。\n2. 求导：3x²-2x+1。\n3. 用乘积法则：(2x)(x-1)+(x²+1)=3x²-2x+1，一致。', '乘积法则里漏掉第二项，只得到 2x(x-1)。'),
      lessonAnchor: { lessonId: 'math-deriv-basic-L2', blockIndex: 8 }
    },

    /* ================= 计算机 · 变量与类型 ================= */
    {
      id: 'cs-vt-q1', kpIds: ['cs-var-type'], subject: 'cs', type: 'single',
      stem: '在 JavaScript 中，`typeof 42` 的结果是？',
      options: [
        { key: 'A', text: '"number"' }, { key: 'B', text: '"int"' },
        { key: 'C', text: '"integer"' }, { key: 'D', text: '"float"' }
      ],
      answer: 'A', source: '自建', difficulty: 1, estSeconds: 30,
      skillTag: 'typeof 基本类型',
      analysis: ana('"number"', 'JS 不区分整数和浮点数，数字统一是 number。', '1. 42 是数字字面量。\n2. typeof 返回类型字符串。\n3. 结果是 "number"。', '把其他语言的 int / float 概念带到 JS。'),
      lessonAnchor: { lessonId: 'cs-var-type-L1', blockIndex: 2 }
    },
    {
      id: 'cs-vt-q2', kpIds: ['cs-var-type'], subject: 'cs', type: 'single',
      stem: '`1 + "1"` 的结果是？',
      options: [
        { key: 'A', text: '2' }, { key: 'B', text: '"11"' },
        { key: 'C', text: '报错' }, { key: 'D', text: 'NaN' }
      ],
      answer: 'B', source: '自建', difficulty: 2, estSeconds: 30,
      skillTag: '隐式类型转换',
      analysis: ana('"11"', '加号遇到字符串会做拼接，数字被转成字符串。', '1. 操作数一是 number，二是 string。\n2. + 有字符串参与时执行拼接。\n3. 1 变成 "1"，结果为 "11"。', '以为 + 一定做加法；在 JS 里 + 还是字符串拼接运算符。'),
      lessonAnchor: { lessonId: 'cs-var-type-L1', blockIndex: 5 }
    },
    {
      id: 'cs-vt-q3', kpIds: ['cs-var-type'], subject: 'cs', type: 'single',
      stem: '`===` 和 `==` 的核心区别是？',
      options: [
        { key: 'A', text: '=== 比较值，== 比较地址' },
        { key: 'B', text: '=== 不做隐式类型转换，== 会做' },
        { key: 'C', text: '=== 只能比较数字' },
        { key: 'D', text: '没有区别' }
      ],
      answer: 'B', source: '自建', difficulty: 2, estSeconds: 35,
      skillTag: '严格相等',
      analysis: ana('=== 不做隐式类型转换', '严格相等要求类型和值都相同。', '1. `"1" == 1` 为 true，因为字符串被转换。\n2. `"1" === 1` 为 false。\n3. 日常比较优先用 ===。', '用 == 时 `0 == ""`、`null == undefined` 等结果反直觉。'),
      lessonAnchor: { lessonId: 'cs-var-type-L1', blockIndex: 6 }
    },
    {
      id: 'cs-vt-ex', kpIds: ['cs-var-type'], subject: 'cs', type: 'fill',
      stem: '阅读代码：\n```js\nlet a = 1;\na = "1";\nconsole.log(typeof a);\n```\n输出是什么？',
      answer: 'string', accept: ['"string"'],
      source: '自建', difficulty: 1, estSeconds: 30,
      skillTag: '变量可换类型',
      analysis: ana('string', 'let 声明的变量可以重新赋值为不同类型。', '1. 初始 a 是 number。\n2. 重新赋值为字符串 "1"。\n3. typeof 得到 string。', '以为 let 会锁死类型；JS 是动态类型语言。'),
      lessonAnchor: { lessonId: 'cs-var-type-L1', blockIndex: 2 }
    },
    {
      id: 'cs-vt-g1', kpIds: ['cs-var-type'], subject: 'cs', type: 'fill',
      stem: '补全 typeof 的结果。',
      blanks: [
        { label: 'typeof "hello"', answer: 'string', hint: '双引号包起来的是字符串。' },
        { label: 'typeof true', answer: 'boolean', hint: 'true/false 是布尔值。' },
        { label: 'typeof undefined', answer: 'undefined', hint: '未赋值的变量是 undefined。' }
      ],
      answer: 'string / boolean / undefined',
      source: '自建', difficulty: 1, estSeconds: 45, skillTag: 'typeof 三类',
      analysis: ana('string；boolean；undefined', 'typeof 返回的是小写类型字符串。', '1. 字符串 → string。\n2. 布尔 → boolean。\n3. undefined → undefined。', 'typeof 的返回值要加引号输出时别忘了引号。'),
      lessonAnchor: { lessonId: 'cs-var-type-L1', blockIndex: 2 }
    },
    {
      id: 'cs-vt-i1', kpIds: ['cs-var-type'], subject: 'cs', type: 'single',
      stem: '`typeof null` 的结果是？',
      options: [
        { key: 'A', text: '"null"' }, { key: 'B', text: '"object"' },
        { key: 'C', text: '"undefined"' }, { key: 'D', text: '"boolean"' }
      ],
      answer: 'B', source: '自建', difficulty: 3, estSeconds: 30,
      skillTag: 'null 的历史遗留',
      analysis: ana('"object"', '这是 JS 诞生时的历史 bug，null 被标成了 object。', '1. null 表示「空」。\n2. typeof null 返回 "object"。\n3. 判断 null 应该用 `value === null`。', '用 typeof 判断 null，会误以为它是对象。'),
      lessonAnchor: { lessonId: 'cs-var-type-L1', blockIndex: 5 }
    },
    {
      id: 'cs-vt-i2', kpIds: ['cs-var-type'], subject: 'cs', type: 'fill',
      stem: '`"5" * 2` 的结果是？',
      answer: '10',
      source: '自建', difficulty: 2, estSeconds: 25,
      skillTag: '乘号强制转数字',
      analysis: ana('10', '除 + 以外，算术运算符会把字符串转成数字。', '1. `*` 需要数字运算。\n2. "5" 被转成 5。\n3. 5×2=10。', '把 `+` 的拼接规则套到 `*` 上，以为会得到 "55"。'),
      lessonAnchor: { lessonId: 'cs-var-type-L1', blockIndex: 5 }
    },
    {
      id: 'cs-vt-i3', kpIds: ['cs-var-type'], subject: 'cs', type: 'code',
      stem: '写一个函数 `toNumber(str)`：能转成数字就返回数字，转不了返回 NaN。',
      template: 'function toNumber(str) {\n  // 在这里写你的代码\n  return Number(str);\n}',
      tests: [
        { input: "toNumber('12')", expect: '12' },
        { input: "toNumber('abc')", expect: 'NaN' },
        { input: "toNumber('3.5')", expect: '3.5' }
      ],
      answer: 'function toNumber(str){ return Number(str); }',
      source: '自建', difficulty: 2, estSeconds: 120,
      skillTag: '显式类型转换',
      analysis: ana('Number(str)', 'Number 会把非法字符串转成 NaN。', '1. Number("12") → 12。\n2. Number("abc") → NaN。\n3. 直接返回即可。', '用 parseInt 会把 "3.5" 截成 3，也会把 "12abc" 转成 12。'),
      lessonAnchor: { lessonId: 'cs-var-type-L1', blockIndex: 5 }
    },
    {
      id: 'cs-vt-c1', kpIds: ['cs-var-type'], subject: 'cs', type: 'single',
      stem: '`typeof NaN` 的结果是？',
      options: [
        { key: 'A', text: '"NaN"' }, { key: 'B', text: '"number"' },
        { key: 'C', text: '"undefined"' }, { key: 'D', text: '报错' }
      ],
      answer: 'B', source: '变式-源自 cs-vt-i1', difficulty: 3, estSeconds: 30,
      skillTag: 'NaN 的类型',
      analysis: ana('"number"', 'NaN 是 Not a Number，但它属于 number 类型。', '1. NaN 表示无效数字。\n2. 它仍归在 number 类型里。\n3. 判断 NaN 用 Number.isNaN。', '看到 NaN 就以为 typeof 是 "NaN"，没有这个类型。'),
      lessonAnchor: { lessonId: 'cs-var-type-L1', blockIndex: 5 }
    },

    /* ================= 计算机 · 循环 ================= */
    {
      id: 'cs-loop-q1', kpIds: ['cs-loop'], subject: 'cs', type: 'single',
      stem: '`for (let i = 0; i < 5; i++)` 的循环体执行几次？',
      options: [
        { key: 'A', text: '4 次' }, { key: 'B', text: '5 次' },
        { key: 'C', text: '6 次' }, { key: 'D', text: '无限次' }
      ],
      answer: 'B', source: '自建', difficulty: 1, estSeconds: 30,
      skillTag: '循环边界',
      analysis: ana('5 次', 'i 取 0,1,2,3,4，共 5 个值。', '1. 初始 i=0。\n2. 条件 i<5。\n3. 0~4 共 5 次，i=5 时退出。', '把 `<` 当 `<=` 算，或者漏掉 0。'),
      lessonAnchor: { lessonId: 'cs-loop-L2', blockIndex: 2 }
    },
    {
      id: 'cs-loop-q2', kpIds: ['cs-loop'], subject: 'cs', type: 'single',
      stem: '`while` 循环里忘记更新条件变量，最可能发生什么？',
      options: [
        { key: 'A', text: '编译报错' }, { key: 'B', text: '循环一次都不执行' },
        { key: 'C', text: '死循环' }, { key: 'D', text: '自动退出' }
      ],
      answer: 'C', source: '自建', difficulty: 2, estSeconds: 30,
      skillTag: 'while 退出条件',
      analysis: ana('死循环', '条件一直为真，循环永远不会结束。', '1. while 每轮都检查条件。\n2. 条件变量没变，条件恒真。\n3. 程序卡死。', '本地跑一下会卡住浏览器；写 while 先想清楚「什么时候变假」。'),
      lessonAnchor: { lessonId: 'cs-loop-L2', blockIndex: 4 }
    },
    {
      id: 'cs-loop-q3', kpIds: ['cs-loop'], subject: 'cs', type: 'fill',
      stem: '用循环求 `1+2+...+10`，结果是？',
      answer: '55',
      source: '自建', difficulty: 1, estSeconds: 30,
      skillTag: '累加',
      analysis: ana('55', '等差数列求和，也可以用循环累加。', '1. 累加 1 到 10。\n2. 高斯公式 (1+10)×10÷2=55。', '把 10 之前的 9 当终点，得 45。'),
      lessonAnchor: { lessonId: 'cs-loop-L2', blockIndex: 7 }
    },
    {
      id: 'cs-loop-ex', kpIds: ['cs-loop'], subject: 'cs', type: 'fill',
      stem: '运行下面代码，`sum` 是多少？\n\nlet sum = 0;\nfor (let i = 1; i <= 3; i++) {\n  sum += i;\n}\nconsole.log(sum);',
      answer: '6', accept: ['6'],
      source: '自建', difficulty: 1, estSeconds: 40,
      skillTag: '循环累加',
      analysis: ana('6', 'i 依次取 1、2、3，累加。', '1. sum=0。\n2. 加 1 → 1，加 2 → 3，加 3 → 6。', '把 i<=3 看成 i<3，得到 3。'),
      lessonAnchor: { lessonId: 'cs-loop-L2', blockIndex: 7 }
    },
    {
      id: 'cs-loop-g1', kpIds: ['cs-loop'], subject: 'cs', type: 'fill',
      stem: '`for (let i = 0; i < n; i++)`，当 n=4 时补全。',
      blanks: [
        { label: '执行次数', answer: '4', hint: 'i 从 0 到 3。' },
        { label: 'i 的最大值', answer: '3', hint: '条件是 i < 4。' },
        { label: '退出时 i', answer: '4', hint: '先加一，再判断条件。' }
      ],
      answer: '4 / 3 / 4',
      source: '自建', difficulty: 2, estSeconds: 60, skillTag: '循环边界',
      analysis: ana('4；3；4', '循环变量的最终值通常比最大值多 1。', '1. i=0..3 执行 4 次。\n2. 循环体里最大 i=3。\n3. 退出时 i=4。', '混淆「执行次数」和「退出时 i 的值」。'),
      lessonAnchor: { lessonId: 'cs-loop-L2', blockIndex: 5 }
    },
    {
      id: 'cs-loop-i1', kpIds: ['cs-loop'], subject: 'cs', type: 'fill',
      stem: '`for (let i = 1; i <= 3; i++) console.log(i);` 会依次输出什么？用空格分隔。',
      answer: '1 2 3', accept: ['1,2,3', '123'],
      source: '自建', difficulty: 1, estSeconds: 25,
      skillTag: '循环输出',
      analysis: ana('1 2 3', 'i 从 1 到 3 逐个输出。', '1. i=1 输出 1。\n2. i=2 输出 2。\n3. i=3 输出 3，i=4 退出。', '把 <=3 当 <3，少输出 3。'),
      lessonAnchor: { lessonId: 'cs-loop-L2', blockIndex: 2 }
    },
    {
      id: 'cs-loop-i2', kpIds: ['cs-loop'], subject: 'cs', type: 'code',
      stem: '写一个函数 `factorial(n)`，返回 n 的阶乘（n 从 0 开始，0! = 1）。',
      template: 'function factorial(n) {\n  // 在这里写你的代码\n}',
      tests: [
        { input: 'factorial(0)', expect: '1' },
        { input: 'factorial(1)', expect: '1' },
        { input: 'factorial(5)', expect: '120' }
      ],
      answer: 'function factorial(n){ let r=1; for(let i=2;i<=n;i++) r*=i; return r; }',
      source: '自建', difficulty: 2, estSeconds: 120,
      skillTag: '循环累乘',
      analysis: ana('循环累乘，初值 1', '阶乘是 1×2×…×n，初值不能设 0。', '1. result=1。\n2. i 从 2 到 n。\n3. result*=i。', '初值写成 0，结果永远是 0；忘记 0! = 1。'),
      lessonAnchor: { lessonId: 'cs-loop-L2', blockIndex: 7 }
    },
    {
      id: 'cs-loop-c1', kpIds: ['cs-loop'], subject: 'cs', type: 'code',
      stem: '写一个函数 `sumEven(n)`，求 1 到 n 之间所有偶数的和。',
      template: 'function sumEven(n) {\n  // 在这里写你的代码\n}',
      tests: [
        { input: 'sumEven(6)', expect: '12' },
        { input: 'sumEven(5)', expect: '6' },
        { input: 'sumEven(1)', expect: '0' }
      ],
      answer: 'function sumEven(n){ let s=0; for(let i=1;i<=n;i++){ if(i%2===0) s+=i; } return s; }',
      source: '变式-源自 cs-loop-i2', difficulty: 3, estSeconds: 150,
      skillTag: '循环加条件',
      analysis: ana('遍历并判断偶数', '循环里加 if 过滤偶数，再累加。', '1. s=0。\n2. i 从 1 到 n。\n3. i%2===0 时累加。', '把 `i%2===0` 写成 `i%2`，判断反了。'),
      lessonAnchor: { lessonId: 'cs-loop-L2', blockIndex: 7 }
    }
  ];

  Z.QUESTIONS = list;
  Z.Q_BY_ID = {};
  list.forEach(function (q) { Z.Q_BY_ID[q.id] = q; });

  Z.questionsOfKp = function (kpId) {
    return Z.QUESTIONS.filter(function (q) { return q.kpIds.indexOf(kpId) >= 0; });
  };
  Z.questionsOfSubject = function (subject) {
    return Z.QUESTIONS.filter(function (q) { return q.subject === subject; });
  };
})(window.ZSB = window.ZSB || {});
