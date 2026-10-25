/* 英语扩展题库：12 个新考点 × 4 题 = 48 题 */
(function (Z) {
  function ana(answer, idea, steps, pit) {
    return '【答案】' + answer + '\n【思路】' + idea + '\n【步骤】' + steps + '\n【坑】' + pit;
  }

  Z.QUESTIONS.push(
    /* ========== 冠词与名词 ========== */
    { id: 'eng3-article-1', kpIds: ['eng-article'], subject: 'english', type: 'fill',
      stem: 'I saw ___ old man sitting on ___ bench in the park.',
      answer: 'an / a', accept: ['an,a', 'an / a', 'an；a'],
      source: '自建', difficulty: 2, estSeconds: 40, skillTag: 'a/an 看读音',
      analysis: ana('an / a', 'a/an 的选择看后面单词的第一个音素，不看首字母。', '1. old 以元音音素 /ɒ/ 开头，用 an。\n2. bench 以辅音音素 /b/ 开头，用 a。', 'old 首字母是元音字母，但这里判断依据仍是读音；university 才是「元音字母+辅音音素」。') },
    { id: 'eng3-article-2', kpIds: ['eng-article'], subject: 'english', type: 'fill',
      stem: '___ sun rises in ___ east.',
      answer: 'The / the', accept: ['the,the', 'The,the', 'the / the'],
      source: '自建', difficulty: 2, estSeconds: 35, skillTag: '独一无二用 the',
      analysis: ana('The / the', '世界上独一无二的事物、方位名词前用 the。', '1. sun 是独一无二的，用 the。\n2. in the east 是固定方位表达。', '不用 a sun，因为太阳只有一个。') },
    { id: 'eng3-article-3', kpIds: ['eng-article'], subject: 'english', type: 'single',
      stem: '下面哪一项冠词使用正确？',
      options: [
        { key: 'A', text: 'an university' }, { key: 'B', text: 'a hour' },
        { key: 'C', text: 'an honest boy' }, { key: 'D', text: 'a apple' }
      ],
      answer: 'C', source: '自建', difficulty: 3, estSeconds: 45, skillTag: '读音判断 a/an',
      analysis: ana('an honest boy', '三个错误项都栽在「看字母不看读音」。', '1. university 读 /juː/，辅音开头 → a。\n2. hour 的 h 不发音，元音开头 → an。\n3. honest 的 h 不发音 → an。\n4. apple 元音开头 → an。', '字母是元音，读音不一定是元音；h 不发音时按元音处理。') },
    { id: 'eng3-article-4', kpIds: ['eng-article'], subject: 'english', type: 'fill',
      stem: '改错：**We had a breakfast at seven.**',
      answer: 'We had breakfast at seven.', accept: ['we had breakfast at seven', 'We had breakfast at seven'],
      source: '自建', difficulty: 2, estSeconds: 40, skillTag: '三餐零冠词',
      analysis: ana('We had breakfast at seven.', '三餐、球类、学科前通常用零冠词。', '1. breakfast 是三餐名词。\n2. 泛指吃早饭，不加冠词。\n3. 去掉 a。', '特指某一顿可以加：We had a wonderful breakfast.') },

    /* ========== 代词与 it ========== */
    { id: 'eng3-pronoun-1', kpIds: ['eng-pronoun'], subject: 'english', type: 'fill',
      stem: 'This is ___ (I) book, and that one is ___ (she).',
      answer: 'my / hers', accept: ['my,hers', 'my / hers', 'my;hers'],
      source: '自建', difficulty: 2, estSeconds: 40, skillTag: '物主代词',
      analysis: ana('my / hers', '第一空修饰名词用形容词性物主代词，第二空独立使用用名词性物主代词。', '1. book 是名词，前面用 my。\n2. 第二空后面没有名词，用 hers。', '不要写 her，her 后面必须跟名词。') },
    { id: 'eng3-pronoun-2', kpIds: ['eng-pronoun'], subject: 'english', type: 'single',
      stem: '___ is important to learn English well.',
      options: [
        { key: 'A', text: 'That' }, { key: 'B', text: 'It' },
        { key: 'C', text: 'This' }, { key: 'D', text: 'He' }
      ],
      answer: 'B', source: '自建', difficulty: 2, estSeconds: 35, skillTag: 'it 形式主语',
      analysis: ana('It', '真正的主语是 to learn English well，太长，用 it 占位。', '1. 句子结构是「主语 + is + 形容词 + to do」。\n2. 形式主语只能用 it。\n3. 真正主语后置。', 'that 不能作形式主语；这是英语固定句型 It is + adj + to do。') },
    { id: 'eng3-pronoun-3', kpIds: ['eng-pronoun'], subject: 'english', type: 'fill',
      stem: '改错：**Me and him went to school together.**',
      answer: 'He and I went to school together.', accept: ['he and i went to school together', 'He and I went to school together'],
      source: '自建', difficulty: 2, estSeconds: 45, skillTag: '主格作主语',
      analysis: ana('He and I went to school together.', '主语位置要用主格，而且英语习惯把 I 放后面。', '1. 句首是主语位置，me/him 都是宾格。\n2. 改成 He and I。\n3. 顺序上 I 放最后更礼貌。', '中文「我和他」直译成 Me and him 是双重错误。') },
    { id: 'eng3-pronoun-4', kpIds: ['eng-pronoun'], subject: 'english', type: 'single',
      stem: 'I have two pens. One is red, ___ is blue.',
      options: [
        { key: 'A', text: 'other' }, { key: 'B', text: 'the other' },
        { key: 'C', text: 'another' }, { key: 'D', text: 'others' }
      ],
      answer: 'B', source: '自建', difficulty: 3, estSeconds: 45, skillTag: 'the other 特指',
      analysis: ana('the other', '两支笔中剩下的那一支，是特指。', '1. 总数只有两个。\n2. 一个用 one，另一个用 the other。\n3. another 用于三者以上中的「再一个」。', 'others 是复数，不能接 is。') },

    /* ========== 主谓一致 ========== */
    { id: 'eng3-agreement-1', kpIds: ['eng-agreement'], subject: 'english', type: 'fill',
      stem: 'Neither the students nor the teacher ___ (be) in the classroom now.',
      answer: 'is', source: '自建', difficulty: 3, estSeconds: 45, skillTag: '就近原则',
      analysis: ana('is', 'neither...nor... 连接主语时，谓语跟最近的那个主语一致。', '1. 离谓语最近的主语是 the teacher。\n2. 单数。\n3. be 动词用 is。', '不要按「两个主语」用 are。') },
    { id: 'eng3-agreement-2', kpIds: ['eng-agreement'], subject: 'english', type: 'fill',
      stem: 'The number of students in our school ___ (be) about 2000.',
      answer: 'is', source: '自建', difficulty: 3, estSeconds: 45, skillTag: 'the number of',
      analysis: ana('is', 'the number of 的中心词是 number，单数。', '1. the number of = ……的数量。\n2. 主语是 number。\n3. 谓语用 is。', 'a number of = 许多，谓语用复数，两者要分清。') },
    { id: 'eng3-agreement-3', kpIds: ['eng-agreement'], subject: 'english', type: 'single',
      stem: 'Each of the students ___ a dictionary.',
      options: [
        { key: 'A', text: 'have' }, { key: 'B', text: 'has' },
        { key: 'C', text: 'are having' }, { key: 'D', text: 'were having' }
      ],
      answer: 'B', source: '自建', difficulty: 2, estSeconds: 35, skillTag: 'each 单数',
      analysis: ana('has', 'each 作主语时视为单数。', '1. each of + 复数名词，中心词是 each。\n2. each 是单数。\n3. 用 has。', '看到 students 就选 have 是最典型的错误。') },
    { id: 'eng3-agreement-4', kpIds: ['eng-agreement'], subject: 'english', type: 'single',
      stem: 'Three years ___ passed since we met.',
      options: [
        { key: 'A', text: 'have' }, { key: 'B', text: 'has' },
        { key: 'C', text: 'is' }, { key: 'D', text: 'are' }
      ],
      answer: 'B', source: '自建', difficulty: 3, estSeconds: 40, skillTag: '时间作整体',
      analysis: ana('has', '时间、距离、金额作主语时，常看作一个整体，用单数。', '1. Three years 表示一段时间。\n2. 整体概念视为单数。\n3. 现在完成时用 has passed。', '不要被 years 的复数形式带跑。') },

    /* ========== 情态动词 ========== */
    { id: 'eng3-modal-1', kpIds: ['eng-modal'], subject: 'english', type: 'single',
      stem: 'You ___ finish it today. There is no hurry.',
      options: [
        { key: 'A', text: "mustn't" }, { key: 'B', text: "needn't" },
        { key: 'C', text: "can't" }, { key: 'D', text: "shouldn't" }
      ],
      answer: 'B', source: '自建', difficulty: 2, estSeconds: 40, skillTag: 'needn\'t = 不必',
      analysis: ana("needn't", 'no hurry 说明「不必」，不是「禁止」。', '1. mustn\'t 表示禁止。\n2. needn\'t 表示不必。\n3. 语境是「不着急」，选 needn\'t。', 'mustn\'t 和 needn\'t 中文都能译成「不用」，语气完全不同。') },
    { id: 'eng3-modal-2', kpIds: ['eng-modal'], subject: 'english', type: 'single',
      stem: 'The light in his room is on. He ___ be at home.',
      options: [
        { key: 'A', text: 'must' }, { key: 'B', text: "can't" },
        { key: 'C', text: "needn't" }, { key: 'D', text: 'may not' }
      ],
      answer: 'A', source: '自建', difficulty: 2, estSeconds: 40, skillTag: 'must be 肯定推测',
      analysis: ana('must', '灯亮着是「肯定在家」的有力证据。', '1. 肯定推测用 must be。\n2. 否定推测用 can\'t be（不可能是）。\n3. 语气较弱的可能用 may be。', 'must be 不是「必须在家」，而是「一定在家」。') },
    { id: 'eng3-modal-3', kpIds: ['eng-modal'], subject: 'english', type: 'fill',
      stem: '改错：**She can sings very well.**',
      answer: 'She can sing very well.', accept: ['she can sing very well', 'She can sing very well'],
      source: '自建', difficulty: 1, estSeconds: 35, skillTag: '情态动词后原形',
      analysis: ana('She can sing very well.', '情态动词后面永远接动词原形。', '1. can 是情态动词。\n2. 后面不能加 -s。\n3. sings → sing。', '第三人称单数只在实义动词作谓语时加 -s。') },
    { id: 'eng3-modal-4', kpIds: ['eng-modal'], subject: 'english', type: 'single',
      stem: 'The ground is wet. It ___ have rained last night.',
      options: [
        { key: 'A', text: 'must' }, { key: 'B', text: "can't" },
        { key: 'C', text: "needn't" }, { key: 'D', text: 'would' }
      ],
      answer: 'A', source: '自建', difficulty: 3, estSeconds: 45, skillTag: 'must have done',
      analysis: ana('must', 'must have done = 过去一定做过某事。', '1. 时间是 last night，是过去。\n2. 地湿是证据，做肯定推测。\n3. must + have done。', 'can\'t have done 是「过去不可能做过」，方向相反。') },

    /* ========== 比较级与最高级 ========== */
    { id: 'eng3-comparison-1', kpIds: ['eng-comparison'], subject: 'english', type: 'fill',
      stem: 'This book is much ___ (interesting) than that one.',
      answer: 'more interesting', accept: ['more interesting'],
      source: '自建', difficulty: 2, estSeconds: 40, skillTag: '多音节比较级',
      analysis: ana('more interesting', '多音节形容词的比较级用 more + 原级。', '1. interesting 是多音节词。\n2. 不能加 -er。\n3. 用 more interesting。', 'much 修饰比较级，不能修饰原级。') },
    { id: 'eng3-comparison-2', kpIds: ['eng-comparison'], subject: 'english', type: 'fill',
      stem: 'He is the ___ (tall) of the three boys.',
      answer: 'tallest', source: '自建', difficulty: 2, estSeconds: 35, skillTag: '最高级',
      analysis: ana('tallest', '三者及以上比较，用最高级，前面加 the。', '1. of the three boys 给出范围。\n2. three → 三者以上。\n3. tall → tallest。', '两者比较只能用比较级 + than。') },
    { id: 'eng3-comparison-3', kpIds: ['eng-comparison'], subject: 'english', type: 'single',
      stem: 'The more you practice, ___ you will be.',
      options: [
        { key: 'A', text: 'the better' }, { key: 'B', text: 'better' },
        { key: 'C', text: 'the best' }, { key: 'D', text: 'more good' }
      ],
      answer: 'A', source: '自建', difficulty: 2, estSeconds: 35, skillTag: 'the more...the more',
      analysis: ana('the better', '「越……越……」的结构是 the + 比较级, the + 比较级。', '1. 前半句已有 The more。\n2. 后半句也要 the + 比较级。\n3. good 的比较级是 better。', '不要写成 more good。') },
    { id: 'eng3-comparison-4', kpIds: ['eng-comparison'], subject: 'english', type: 'fill',
      stem: '改错：**My bike is more fast than yours.**',
      answer: 'My bike is faster than yours.', accept: ['my bike is faster than yours', 'My bike is faster than yours'],
      source: '自建', difficulty: 2, estSeconds: 40, skillTag: '单音节比较级',
      analysis: ana('My bike is faster than yours.', '单音节词加 -er，不用 more。', '1. fast 是单音节。\n2. 比较级是 faster。\n3. 去掉 more。', 'more 只能用于多音节词。') },

    /* ========== 介词与固定搭配 ========== */
    { id: 'eng3-prep-1', kpIds: ['eng-preposition'], subject: 'english', type: 'single',
      stem: 'I was born ___ May 5th, 2000.',
      options: [
        { key: 'A', text: 'in' }, { key: 'B', text: 'on' },
        { key: 'C', text: 'at' }, { key: 'D', text: 'for' }
      ],
      answer: 'B', source: '自建', difficulty: 2, estSeconds: 35, skillTag: '具体日期用 on',
      analysis: ana('on', '具体到某一天用 on。', '1. in 接年、月、季节。\n2. on 接具体日期。\n3. at 接具体时刻。', 'May 5th 是具体一天，不是月份。') },
    { id: 'eng3-prep-2', kpIds: ['eng-preposition'], subject: 'english', type: 'single',
      stem: 'She is good ___ math, and she is also good ___ her classmates.',
      options: [
        { key: 'A', text: 'at / with' }, { key: 'B', text: 'in / to' },
        { key: 'C', text: 'at / for' }, { key: 'D', text: 'for / with' }
      ],
      answer: 'A', source: '自建', difficulty: 3, estSeconds: 45, skillTag: 'be good at / with',
      analysis: ana('at / with', 'be good at 擅长；be good with 善于和……相处。', '1. 擅长学科用 at。\n2. 和同学相处用 with。\n3. 选 at / with。', 'be good for 是「对……有益」，意思不同。') },
    { id: 'eng3-prep-3', kpIds: ['eng-preposition'], subject: 'english', type: 'fill',
      stem: '改错：**I am looking forward to see you.**',
      answer: 'I am looking forward to seeing you.', accept: ['i am looking forward to seeing you', 'I am looking forward to seeing you'],
      source: '自建', difficulty: 3, estSeconds: 45, skillTag: 'to 是介词',
      analysis: ana('I am looking forward to seeing you.', 'look forward to 里的 to 是介词，后面接动名词。', '1. look forward to 是固定短语。\n2. to 后接名词或 doing。\n3. see → seeing。', '这里的 to 不是不定式符号。') },
    { id: 'eng3-prep-4', kpIds: ['eng-preposition'], subject: 'english', type: 'fill',
      stem: 'He arrived ___ Shanghai ___ Sunday morning.',
      answer: 'in / on', accept: ['in,on', 'in / on', 'in;on'],
      source: '自建', difficulty: 2, estSeconds: 40, skillTag: '大地点 in + 具体早晨 on',
      analysis: ana('in / on', '大城市用 in，具体某个早晨用 on。', '1. Shanghai 是大地点，用 in。\n2. Sunday morning 是具体某天早晨，用 on。\n3. arrive in + 大地点。', 'arrive at 用于小地点（车站、机场）。') },

    /* ========== 进行时 ========== */
    { id: 'eng3-prog-1', kpIds: ['eng-progressive'], subject: 'english', type: 'fill',
      stem: 'Listen! Someone ___ (sing) in the next room.',
      answer: 'is singing', source: '自建', difficulty: 2, estSeconds: 35, skillTag: '现在进行时',
      analysis: ana('is singing', 'Listen 是现在进行时的信号词。', '1. Listen 提示此刻正在发生。\n2. 主语 Someone 视为单数。\n3. be + doing → is singing。', '不要用 sings，那是一般现在时。') },
    { id: 'eng3-prog-2', kpIds: ['eng-progressive'], subject: 'english', type: 'fill',
      stem: 'At eight last night, I ___ (watch) TV with my family.',
      answer: 'was watching', source: '自建', difficulty: 3, estSeconds: 40, skillTag: '过去进行时',
      analysis: ana('was watching', '过去某一时刻正在做，用过去进行时。', '1. at eight last night 是过去的一个时间点。\n2. 主语 I 用 was。\n3. was + watching。', '不要用 watched，那是「看了」（完成）。') },
    { id: 'eng3-prog-3', kpIds: ['eng-progressive'], subject: 'english', type: 'fill',
      stem: '改错：**I am knowing the answer.**',
      answer: 'I know the answer.', accept: ['i know the answer', 'I know the answer'],
      source: '自建', difficulty: 3, estSeconds: 40, skillTag: '状态动词不用进行时',
      analysis: ana('I know the answer.', 'know 是状态动词，表示心理状态，不用进行时。', '1. know 不是「正在知道」。\n2. 状态动词（know/like/believe）用一般现在时。\n3. 去掉 am，knowing → know。', '状态动词列表要单独记：know, like, want, believe, belong。') },
    { id: 'eng3-prog-4', kpIds: ['eng-progressive'], subject: 'english', type: 'single',
      stem: 'Look! The children ___ football on the playground.',
      options: [
        { key: 'A', text: 'play' }, { key: 'B', text: 'are playing' },
        { key: 'C', text: 'played' }, { key: 'D', text: 'have played' }
      ],
      answer: 'B', source: '自建', difficulty: 1, estSeconds: 30, skillTag: 'Look 提示进行时',
      analysis: ana('are playing', 'Look 提示此刻正在发生。', '1. children 是复数。\n2. be 用 are。\n3. are playing。', 'play 没有 -ing 就是一般现在时。') },

    /* ========== 一般将来时 ========== */
    { id: 'eng3-future-1', kpIds: ['eng-future'], subject: 'english', type: 'single',
      stem: 'If it ___ tomorrow, we will stay at home.',
      options: [
        { key: 'A', text: 'rains' }, { key: 'B', text: 'will rain' },
        { key: 'C', text: 'rained' }, { key: 'D', text: 'is raining' }
      ],
      answer: 'A', source: '自建', difficulty: 2, estSeconds: 40, skillTag: '主将从现',
      analysis: ana('rains', 'if 引导的条件状语从句用一般现在时表将来。', '1. 主句是 will stay（将来）。\n2. 从句用一般现在时。\n3. it 是单三，rain → rains。', '不要写 if it will rain。') },
    { id: 'eng3-future-2', kpIds: ['eng-future'], subject: 'english', type: 'fill',
      stem: 'I ___ (visit) my grandma next week. I have already bought the ticket.',
      answer: 'am going to visit', accept: ['am going to visit', 'will visit'],
      source: '自建', difficulty: 2, estSeconds: 40, skillTag: '计划用 be going to',
      analysis: ana('am going to visit', '已经买了票 = 早有打算，be going to 更贴切；will visit 也可接受。', '1. next week → 将来。\n2. 已有计划、有证据。\n3. am going to visit。', '临时决定才用 will。') },
    { id: 'eng3-future-3', kpIds: ['eng-future'], subject: 'english', type: 'fill',
      stem: '改错：**When he will come, I will call you.**',
      answer: 'When he comes, I will call you.', accept: ['when he comes, i will call you', 'When he comes, I will call you'],
      source: '自建', difficulty: 3, estSeconds: 45, skillTag: '时间状语从句主将从现',
      analysis: ana('When he comes, I will call you.', 'when 引导时间状语从句，用现在时表将来。', '1. 主句 will call 是将来。\n2. when 从句不用 will。\n3. comes。', '主将从现不只用于 if，也用于 when/before/after。') },
    { id: 'eng3-future-4', kpIds: ['eng-future'], subject: 'english', type: 'single',
      stem: 'Look at those dark clouds! It ___ rain.',
      options: [
        { key: 'A', text: 'will' }, { key: 'B', text: 'is going to' },
        { key: 'C', text: 'is raining' }, { key: 'D', text: 'rains' }
      ],
      answer: 'B', source: '自建', difficulty: 2, estSeconds: 35, skillTag: '有迹象的预测',
      analysis: ana('is going to', '有明显迹象（乌云）的预测，用 be going to。', '1. Look at 提示有现场证据。\n2. 有迹象的预测用 be going to。\n3. It is going to rain。', 'will 更多用于「临时决定」或单纯预测。') },

    /* ========== 倒装句 ========== */
    { id: 'eng3-inversion-1', kpIds: ['eng-inversion'], subject: 'english', type: 'single',
      stem: 'Never ___ I seen such a beautiful place.',
      options: [
        { key: 'A', text: 'have' }, { key: 'B', text: 'has' },
        { key: 'C', text: 'did' }, { key: 'D', text: 'do' }
      ],
      answer: 'A', source: '自建', difficulty: 3, estSeconds: 45, skillTag: '否定词提前倒装',
      analysis: ana('have', 'Never 放句首，助动词提前，构成部分倒装。', '1. 原句 I have never seen...。\n2. Never 提前。\n3. have 提到 I 前：Never have I seen。', '主语是 I，助动词用 have，不是 has。') },
    { id: 'eng3-inversion-2', kpIds: ['eng-inversion'], subject: 'english', type: 'single',
      stem: 'Only then ___ the truth.',
      options: [
        { key: 'A', text: 'I knew' }, { key: 'B', text: 'did I know' },
        { key: 'C', text: 'I did know' }, { key: 'D', text: 'knew I' }
      ],
      answer: 'B', source: '自建', difficulty: 3, estSeconds: 45, skillTag: 'only + 状语倒装',
      analysis: ana('did I know', 'Only + 状语放句首，主句要部分倒装。', '1. Only then 是状语。\n2. 主句用助动词 did 提前。\n3. 实义动词回原形 know。', '倒装只提前助动词，不要把整个动词搬前面。') },
    { id: 'eng3-inversion-3', kpIds: ['eng-inversion'], subject: 'english', type: 'fill',
      stem: '改错：**Hardly I had arrived when it began to rain.**',
      answer: 'Hardly had I arrived when it began to rain.', accept: ['hardly had i arrived when it began to rain', 'Hardly had I arrived when it began to rain'],
      source: '自建', difficulty: 4, estSeconds: 50, skillTag: 'hardly...when',
      analysis: ana('Hardly had I arrived when it began to rain.', 'hardly 放句首，主句用过去完成时并倒装。', '1. Hardly 是否定副词。\n2. 主句用 had + 过去分词，had 提前。\n3. Hardly had I arrived。', 'when 从句不倒装。') },
    { id: 'eng3-inversion-4', kpIds: ['eng-inversion'], subject: 'english', type: 'single',
      stem: 'So loudly ___ that everyone in the hall heard him.',
      options: [
        { key: 'A', text: 'he spoke' }, { key: 'B', text: 'did he speak' },
        { key: 'C', text: 'he did speak' }, { key: 'D', text: 'spoke he' }
      ],
      answer: 'B', source: '自建', difficulty: 3, estSeconds: 45, skillTag: 'so...that 倒装',
      analysis: ana('did he speak', 'so + 副词放句首，主句部分倒装。', '1. So loudly 提前。\n2. 过去时助动词 did 提前。\n3. speak 回原形。', '不要选 spoke he，实义动词不单独提前。') },

    /* ========== 虚拟语气 ========== */
    { id: 'eng3-subj-1', kpIds: ['eng-subjunctive'], subject: 'english', type: 'single',
      stem: 'If I ___ you, I would take the job.',
      options: [
        { key: 'A', text: 'am' }, { key: 'B', text: 'was' },
        { key: 'C', text: 'were' }, { key: 'D', text: 'be' }
      ],
      answer: 'C', source: '自建', difficulty: 2, estSeconds: 35, skillTag: '与现在相反用 were',
      analysis: ana('were', '与现在事实相反的虚拟，if 从句用过去式，be 一律用 were。', '1. 我现在不是你。\n2. 与现在相反。\n3. If I were you。', '口语里 was 也有人用，但考试必须 were。') },
    { id: 'eng3-subj-2', kpIds: ['eng-subjunctive'], subject: 'english', type: 'single',
      stem: 'I wish I ___ more time yesterday.',
      options: [
        { key: 'A', text: 'had' }, { key: 'B', text: 'had had' },
        { key: 'C', text: 'have' }, { key: 'D', text: 'would have' }
      ],
      answer: 'B', source: '自建', difficulty: 4, estSeconds: 50, skillTag: 'wish 与过去相反',
      analysis: ana('had had', 'wish 后与过去相反，用过去完成时。', '1. yesterday 说明是对过去的遗憾。\n2. wish + had done。\n3. 第一个 had 是助动词，第二个 had 是实义动词。', '不要只写 had，那是对现在的虚拟。') },
    { id: 'eng3-subj-3', kpIds: ['eng-subjunctive'], subject: 'english', type: 'single',
      stem: 'If he ___ earlier, he would have caught the train.',
      options: [
        { key: 'A', text: 'left' }, { key: 'B', text: 'had left' },
        { key: 'C', text: 'leaves' }, { key: 'D', text: 'would leave' }
      ],
      answer: 'B', source: '自建', difficulty: 3, estSeconds: 45, skillTag: '与过去相反',
      analysis: ana('had left', '主句 would have done，从句用过去完成时。', '1. 主句 would have caught 表示对过去的虚拟。\n2. 从句用 had done。\n3. had left。', '看到 would have done 就反推 had done。') },
    { id: 'eng3-subj-4', kpIds: ['eng-subjunctive'], subject: 'english', type: 'fill',
      stem: '改错：**If I would know the answer, I would tell you.**',
      answer: 'If I knew the answer, I would tell you.', accept: ['if i knew the answer, i would tell you', 'If I knew the answer, I would tell you'],
      source: '自建', difficulty: 3, estSeconds: 45, skillTag: 'if 从句不用 would',
      analysis: ana('If I knew the answer, I would tell you.', '虚拟条件句的从句用过去式，不用 would。', '1. 与现在事实相反。\n2. 从句：if + 过去式。\n3. 主句：would + 原形。', 'would 只能出现在主句。') },

    /* ========== 完形填空 ========== */
    { id: 'eng3-cloze-1', kpIds: ['eng-cloze'], subject: 'english', type: 'single',
      stem: '做完形填空，第一步最合理的做法是？',
      options: [
        { key: 'A', text: '逐空翻译，遇到不会就猜' }, { key: 'B', text: '先通读全文，抓住主线' },
        { key: 'C', text: '直接看选项找熟悉的词' }, { key: 'D', text: '先查完所有生词' }
      ],
      answer: 'B', source: '自建', difficulty: 1, estSeconds: 30, skillTag: '完形第一步',
      analysis: ana('先通读全文，抓住主线', '完形是补全一篇短文，先有整体再抠细节。', '1. 通读能确定话题和情感基调。\n2. 主线决定很多空的褒贬方向。\n3. 再逐空处理。', '逐空翻译会丢掉上下文逻辑。') },
    { id: 'eng3-cloze-2', kpIds: ['eng-cloze'], subject: 'english', type: 'fill',
      stem: 'Success depends ___ hard work.',
      answer: 'on', source: '自建', difficulty: 1, estSeconds: 25, skillTag: '固定搭配 depend on',
      analysis: ana('on', 'depend on 是固定搭配。', '1. depend 后接 on。\n2. 表示「取决于」。\n3. depends on hard work。', '不要写 depend in。') },
    { id: 'eng3-cloze-3', kpIds: ['eng-cloze'], subject: 'english', type: 'single',
      stem: 'He was very tired, ___ he kept working.',
      options: [
        { key: 'A', text: 'so' }, { key: 'B', text: 'but' },
        { key: 'C', text: 'because' }, { key: 'D', text: 'and' }
      ],
      answer: 'B', source: '自建', difficulty: 2, estSeconds: 35, skillTag: '转折逻辑',
      analysis: ana('but', '「累」和「继续工作」是转折关系。', '1. 前后语义相反。\n2. 转折用 but。\n3. so 表结果，because 表原因。', '完形里逻辑连接词是最好拿的分。') },
    { id: 'eng3-cloze-4', kpIds: ['eng-cloze'], subject: 'english', type: 'fill',
      stem: 'I look forward to ___ (hear) from you soon.',
      answer: 'hearing', source: '自建', difficulty: 3, estSeconds: 35, skillTag: 'to 后接 doing',
      analysis: ana('hearing', 'look forward to 的 to 是介词。', '1. to 后接名词或动名词。\n2. hear → hearing。\n3. 固定搭配。', '不要写 hear 或 to hear。') },

    /* ========== 写作模板 ========== */
    { id: 'eng3-writing-1', kpIds: ['eng-writing'], subject: 'english', type: 'fill',
      stem: 'I am writing to ___ (apply) for the position of sales manager.',
      answer: 'apply', source: '自建', difficulty: 2, estSeconds: 35, skillTag: '书信开头',
      analysis: ana('apply', 'be writing to do 表示写信的目的。', '1. to 后接动词原形。\n2. apply for 是固定搭配。\n3. 填 apply。', '不要写成 applying，这里 to 是不定式符号。') },
    { id: 'eng3-writing-2', kpIds: ['eng-writing'], subject: 'english', type: 'single',
      stem: '一篇议论文最合理的结构是？',
      options: [
        { key: 'A', text: '观点 → 论据 → 结论' }, { key: 'B', text: '例子 → 例子 → 例子' },
        { key: 'C', text: '结论 → 观点 → 论据' }, { key: 'D', text: '随意展开' }
      ],
      answer: 'A', source: '自建', difficulty: 1, estSeconds: 30, skillTag: '三段式结构',
      analysis: ana('观点 → 论据 → 结论', '先亮观点，再给理由，最后收束。', '1. 第一段点题。\n2. 第二段论据。\n3. 第三段总结。', '结构清楚比用难词更能得分。') },
    { id: 'eng3-writing-3', kpIds: ['eng-writing'], subject: 'english', type: 'fill',
      stem: 'It rained heavily. ___ (然而), we still finished the match.',
      answer: 'However', accept: ['however', 'However'],
      source: '自建', difficulty: 2, estSeconds: 30, skillTag: '转折连接词',
      analysis: ana('However', '前后转折，用 However 并加逗号。', '1. 前句下雨，后句仍完成比赛。\n2. 转折关系。\n3. However, we...', 'However 后要逗号；but 连接两个分句不用逗号隔开单独用。') },
    { id: 'eng3-writing-4', kpIds: ['eng-writing'], subject: 'english', type: 'fill',
      stem: '改错：**I am looking forward to hear from you.**',
      answer: 'I am looking forward to hearing from you.', accept: ['i am looking forward to hearing from you', 'I am looking forward to hearing from you'],
      source: '自建', difficulty: 3, estSeconds: 35, skillTag: '书信结尾固定表达',
      analysis: ana('I am looking forward to hearing from you.', '书信结尾高频句，to 是介词。', '1. look forward to 是固定短语。\n2. to 后接 doing。\n3. hear → hearing。', '同一错误在介词和写作两处都考，务必记牢。') }
  );
})(window.ZSB = window.ZSB || {});
