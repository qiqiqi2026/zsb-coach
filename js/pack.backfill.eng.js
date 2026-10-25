/* 英语补讲义包：12 个已有考点各补 1 份完整讲义，不新增考点、不新增题目 */
(function (Z) {
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'beng-article-L2', kpIds: ['eng-article'], subject: 'english', level: 2,
      title: '冠词：a / an / the 与零冠词',
      estMinutes: 40,
      hookTitle: '为什么 "an honest boy" 对，"an university" 却错？',
      hookBody: '因为 a 和 an 听的是后面单词的第一个**音素**，不是第一个字母。honest 的 h 不发音，开头是元音，所以用 an；university 虽然以 u 开头，却读 /juː/，开头是辅音，只能用 a。',
      idea: '冠词只有三种选择：**a/an 泛指一个**，**the 特指某个**，**零冠词表示一类或固定搭配**。判断顺序是：先看名词可数不可数，再看是不是特指，最后按读音决定 a 还是 an。',
      diagramId: 'article-map', diagramCaption: '先分泛指与特指，再按读音选 a / an',
      analogy: { title: '第一次介绍与老朋友', md: 'a/an 像第一次介绍新朋友：「我认识一个医生。」the 像提起双方都知道的老朋友：「那个医生我昨天见过。」零冠词像在说一个类别：「医生这个职业很辛苦。」说的是哪一类对象，决定用哪种冠词。' },
      points: [
        { title: '一、a 和 an 只看读音', md: '以元音音素开头用 an，以辅音音素开头用 a。an old man、an apple、an hour；a bench、a university、a useful book。判断时把单词读出来，听第一个音，不要盯着首字母。' },
        { title: '二、the 表示特指', md: '双方都知道的对象用 the：Close the door. 前面已经提过的人或物也用 the。世界上独一无二的事物、方位、最高级、序数词前也用 the：the sun、in the east、the tallest boy、the first day。' },
        { title: '三、零冠词表示一类', md: '复数名词和不可数名词泛指一类时，前面不加冠词：Cats are cute. Water is important. 三餐、球类、学科、交通方式也常零冠词：have breakfast、play football、study English、by bus。' },
        { title: '四、单数可数名词不能裸奔', md: '可数名词单数前面必须有 a/an/the/my/this 之类的限定词。不能说 I saw cat，要说 I saw a cat。这是改错题最常见的送分点，也是写作里最容易被扣分的地方。' },
        { title: '五、不可数名词不加 a/an', md: 'information、advice、news、furniture、homework 都不可数，不能加 a/an，也不能变复数。要计数就用 a piece of advice、two pieces of news 这样的量词结构。' },
        { title: '六、固定搭配要整块记', md: 'in the morning、in the end、at night、at home、go to bed、take a walk、make a decision。这些短语里的冠词是习惯用法，不能按规则临时推，遇到就整块背下来。' },
        { title: '七、the 与零冠词的对比', md: 'Go to school 是「去上学」，强调用途；go to the school 是「去那所学校」，强调地点。同理 go to bed 是睡觉，go to the bed 是走到床边。同一名词，冠词不同，意思就变了。' }
      ],
      table: {
        headers: ['情形', '用法', '例句'],
        rows: [
          ['第一次提到的单数可数名词', 'a / an（按读音）', 'I saw an old man on a bench.'],
          ['双方都知道或上文提过', 'the', 'Please close the door.'],
          ['独一无二、方位、最高级', 'the', 'The sun rises in the east.'],
          ['三餐、球类、学科、交通方式', '零冠词', 'We have breakfast at seven.'],
          ['不可数名词泛指', '零冠词', 'Water is important to us.'],
          ['特指某一类中的特定对象', 'the', 'The books on the desk are mine.']
        ]
      },
      code: 'I saw an old man sitting on a bench.\nThe sun rises in the east.\nWe had breakfast at seven.\nShe is an honest girl at a university.\nCats are cute, but the cat near me is shy.',
      warning: '不要按首字母判断 a/an：an hour 对，a hour 错；a university 对，an university 错。判断标准永远是第一个音素，不是拼写。',
      tip: '口诀：a/an 听声音，the 指双方，泛指复数或不可数就用零冠词。',
      quizIds: ['eng3-article-1', 'eng3-article-2', 'eng3-article-3', 'eng3-article-4'],
      example: {
        title: '两个空一起判断冠词',
        steps: [
          { md: '原句：He is ___ honest boy and he studies at ___ university.' },
          { md: 'honest 的 h 不发音，开头是元音音素，第一空用 an。' },
          { md: 'university 读 /juː/，开头是辅音音素，第二空用 a。' },
          { md: '答案是 an / a。两个空都提醒我们：看读音，不看字母。' }
        ],
        takeaway: 'a/an 的判断永远先读出来，再听第一个音。'
      },
      example2: {
        title: '改掉三餐前的多余冠词',
        steps: [
          { md: '原句：We had a breakfast at seven.' },
          { md: 'breakfast 是三餐名词，泛指吃早饭时用零冠词。' },
          { md: '去掉 a，改成 We had breakfast at seven.' },
          { md: '若说「吃了一顿很棒的早饭」，才可以说 We had a wonderful breakfast.' }
        ],
        takeaway: '三餐泛指用零冠词；只有加形容词特指某一顿时才用 a。'
      },
      guided: [{ questionId: 'eng3-article-3', hint: '把四个选项逐个读出来，听第一个音是元音还是辅音。' }],
      solo: ['eng3-article-1', 'eng3-article-2'],
      challenge: ['eng3-article-4'],
      summary: {
        essence: '冠词看三件事：可数不可数、是否特指、首音是元音还是辅音。',
        formulas: ['a/an + 单数可数名词（泛指）', 'the + 特指 / 独一无二 / 最高级', '零冠词：三餐、球类、学科、复数与不可数泛指'],
        pitfalls: ['按首字母而不是读音选 a/an', '在不可数名词前加 a/an', '三餐、球类前多加冠词', '可数名词单数前漏限定词'],
        checklist: ['我能用读音判断 a 还是 an', '我能说出 the 的四种特指', '我记住三餐球类用零冠词', '我知道不可数名词不能加 a/an']
      },
      feynman: '请用「第一次介绍新朋友」和「老朋友」的比喻，讲清楚 a/an 与 the 的区别，并各举一个例句。'
    }),

    Z.makeLesson({
      id: 'beng-pronoun-L2', kpIds: ['eng-pronoun'], subject: 'english', level: 2,
      title: '代词：格、物主代词与 it 句型',
      estMinutes: 40,
      hookTitle: '为什么 "Me and him went to school" 一听就错？',
      hookBody: '因为句首是主语位置，必须用主格 I 和 he。me、him 是宾格，只能站在动词或介词后面。中文「我和他」直译过来，正好把两个格都弄反了。',
      idea: '代词有**格**：主格作主语，宾格作宾语；物主代词分两种，**形容词性**后面必须接名词，**名词性**可以单独使用。it 还能作形式主语或形式宾语，替真正的主语或宾语占位。',
      diagramId: 'wordclass-map', diagramCaption: '代词在句子里也有固定岗位',
      analogy: { title: '不同场合穿不同衣服', md: '同一个人，上班穿正装，回家穿睡衣。代词也是同一个对象，在主语位置要穿主格，在宾语位置要穿宾格，修饰名词时穿形容词性物主代词，独立使用时穿名词性物主代词。位置决定形式。' },
      points: [
        { title: '一、主格站在主语位置', md: 'I、you、he、she、it、we、they 作主语。He and I went to school together. 英语习惯把 I 放在并列主语的最后，表示礼貌。' },
        { title: '二、宾格跟在动词或介词后', md: 'me、you、him、her、it、us、them 作宾语。Please wait for me. I saw him yesterday. 介词后面也一律用宾格：between you and me。' },
        { title: '三、形容词性物主代词加名词', md: 'my、your、his、her、our、their 后面必须接名词：my book、her pen。不能说 This is her，除非后面省略了名词且语境明确。' },
        { title: '四、名词性物主代词独立使用', md: 'mine、yours、his、hers、ours、theirs 等于「形容词性物主代词 + 名词」，后面不再接名词。This is my book, and that one is hers. 注意 his 两种形式同形。' },
        { title: '五、反身代词指回主语', md: 'myself、yourself、himself、herself、itself、ourselves、themselves。主语和宾语是同一个人时用反身代词：She hurt herself. by oneself 表示「独自」。' },
        { title: '六、it 作形式主语', md: '真正的主语是不定式或从句，太长，就用 it 占位：It is important to learn English well. It is clear that he is right. 这个句型只能用 it，不能用 that 或 this。' },
        { title: '七、it 作形式宾语', md: 'find / think / make / consider + it + 形容词 + to do：I find it hard to get up early. it 是形式宾语，真正的宾语是后面的 to do。' },
        { title: '八、one、the other、another 的分工', md: '两者中的一个用 one，另一个用 the other；三者以上再取一个用 another；复数泛指用 others，剩余全部用 the others。I have two pens. One is red, the other is blue.' }
      ],
      table: {
        headers: ['情形', '用法', '例句'],
        rows: [
          ['主语位置', '主格', 'He and I went together.'],
          ['动词或介词后面', '宾格', 'Please wait for me.'],
          ['后面接名词', '形容词性物主代词', 'This is my book.'],
          ['独立使用，后面不接名词', '名词性物主代词', 'That book is hers.'],
          ['真正主语太长', 'it 作形式主语', 'It is important to learn English.'],
          ['两者中的另一个', 'the other', 'One is red, the other is blue.']
        ]
      },
      code: 'This is my book, and that one is hers.\nIt is important to learn English well.\nHe and I went to school together.\nI have two pens. One is red, the other is blue.',
      warning: 'her 是形容词性物主代词，后面必须接名词；hers 是名词性物主代词，后面不能再接名词。This is her book 对，This is hers book 错。',
      tip: '口诀：主格站主语，宾格跟动词和介词，物主代词先看后面有没有名词。',
      quizIds: ['eng3-pronoun-1', 'eng3-pronoun-2', 'eng3-pronoun-3', 'eng3-pronoun-4'],
      example: {
        title: '两个物主代词怎么选',
        steps: [
          { md: '原句：This is ___ (I) book, and that one is ___ (she).' },
          { md: '第一空后面有名词 book，用形容词性物主代词 my。' },
          { md: '第二空后面没有名词，用名词性物主代词 hers。' },
          { md: '答案是 my / hers。判断关键是看空格后面有没有名词。' }
        ],
        takeaway: '有名词用形容词性，没有名词用名词性。'
      },
      example2: {
        title: '把宾格改回主格',
        steps: [
          { md: '原句：Me and him went to school together.' },
          { md: '句首是主语位置，me 和 him 都是宾格，格用错了。' },
          { md: '改成主格 He and I。' },
          { md: '英语习惯把 I 放在并列主语最后，读起来更礼貌。' }
        ],
        takeaway: '先看位置定格，再考虑并列顺序。'
      },
      guided: [{ questionId: 'eng3-pronoun-2', hint: '真正的主语是 to learn English well，想想哪个词专门用来占位。' }],
      solo: ['eng3-pronoun-1', 'eng3-pronoun-4'],
      challenge: ['eng3-pronoun-3'],
      summary: {
        essence: '位置决定格；物主代词看后面有没有名词；it 可作形式主语和形式宾语。',
        formulas: ['主格作主语：I / he / she / we / they', '宾格作宾语：me / him / her / us / them', 'It is + adj + to do / that 从句'],
        pitfalls: ['用宾格作主语', 'hers 后面又接名词', '形容词性物主代词单独使用', 'that 代替 it 作形式主语'],
        checklist: ['我能分清主格和宾格', '我能选对两种物主代词', '我会用 it 作形式主语', '我分得清 the other 与 another']
      },
      feynman: '请解释为什么 "Me and him went to school" 错，并说明形容词性物主代词和名词性物主代词的区别。'
    }),

    Z.makeLesson({
      id: 'beng-agreement-L2', kpIds: ['eng-agreement'], subject: 'english', level: 2,
      title: '主谓一致：找真正的主语',
      estMinutes: 40,
      hookTitle: '为什么 "The number of students is" 不能写成 are？',
      hookBody: '因为主语的中心词是 number，不是 students。students 只是 of 短语里的修饰成分。主谓一致看的是真正的主语中心词，谁离谓语更近并不重要。',
      idea: '主谓一致只有一条总原则：**谓语跟主语的中心词一致**。遇到 of、with、as well as 这类结构，先划掉修饰成分；遇到 neither...nor、either...or，按**就近原则**；时间、距离、金额看作整体时用单数。',
      diagramId: 'sentence-tree', diagramCaption: '先划掉修饰成分，露出真正的主语',
      analogy: { title: '一家之主说话', md: '一个家庭里，决定事情的是户主，不是旁边的亲戚。主语中心词就是户主，of 短语里的人只是亲戚。谓语要听户主的，不要被离得最近的亲戚带跑。' },
      points: [
        { title: '一、先找主语中心词', md: 'The number of students is about 2000. 主语中心词是 number，单数，所以用 is。of students 只是修饰 number 的，不参与一致判断。' },
        { title: '二、the number of 与 a number of', md: 'the number of 表示「……的数量」，中心词是 number，谓语用单数；a number of 表示「许多」，中心词是复数名词，谓语用复数。A number of students are playing.' },
        { title: '三、就近原则', md: 'neither...nor、either...or、not only...but also、there be 句型，谓语跟离它最近的那个主语一致。Neither the students nor the teacher is here. 最近的是 teacher，用 is。' },
        { title: '四、就远原则', md: 'as well as、with、together with、along with、besides、except 连接的部分是附加信息，谓语跟前面真正的主语一致。He as well as I is going to the meeting. 主语是 He。' },
        { title: '五、each、every、either、neither 作主语用单数', md: 'Each of the students has a dictionary. 看到 students 就选 have 是典型错误。each of、every one of、either of、neither of 后面即使接复数名词，谓语仍用单数。' },
        { title: '六、时间、距离、金额看作整体', md: 'Three years has passed since we met. Ten dollars is enough. 这些短语虽然形式是复数，但表达一个整体概念，谓语用单数。' },
        { title: '七、不定式、动名词、从句作主语用单数', md: 'Reading is helpful. To master a language takes time. What he said is true. 这三类主语都视为单数，不要按里面出现的复数名词来判断。' },
        { title: '八、集合名词看整体还是成员', md: 'family、team、class 作整体时用单数：My family is large. 强调每个成员时用复数：My family are all early risers. 考试里通常按整体处理。' }
      ],
      table: {
        headers: ['情形', '用法', '例句'],
        rows: [
          ['the number of + 复数', '中心词 number，单数', 'The number of students is 2000.'],
          ['a number of + 复数', '许多，复数', 'A number of students are here.'],
          ['neither...nor 连接主语', '就近原则', 'Neither you nor he is right.'],
          ['as well as / with', '就远原则', 'He as well as I is coming.'],
          ['each of + 复数', '视为单数', 'Each of them has a book.'],
          ['时间、金额作整体', '视为单数', 'Three years has passed.']
        ]
      },
      code: 'The number of students is about 2000.\nA number of students are playing on the playground.\nNeither the students nor the teacher is in the classroom.\nThree years has passed since we met.',
      warning: '不要只看紧挨着谓语的复数名词。先划掉 of、with、as well as 引导的修饰成分，再判断真正的主语是单数还是复数。',
      tip: '口诀：先划中心词，再看连接词；nor/or 就近，with/as well as 就远。',
      quizIds: ['eng3-agreement-1', 'eng3-agreement-2', 'eng3-agreement-3', 'eng3-agreement-4'],
      example: {
        title: 'neither...nor 的就近判断',
        steps: [
          { md: '原句：Neither the students nor the teacher ___ (be) in the classroom now.' },
          { md: 'neither...nor 连接两个主语，按就近原则看离谓语最近的。' },
          { md: '最近的主语是 the teacher，单数。' },
          { md: 'be 动词用 is，答案是 is。' }
        ],
        takeaway: 'nor 后面的主语决定谓语，别按两个主语一起用 are。'
      },
      example2: {
        title: 'the number of 与 a number of',
        steps: [
          { md: '第一句：The number of students ___ (be) about 2000.' },
          { md: '主语中心词是 number，单数，填 is。' },
          { md: '第二句：A number of students ___ (be) playing.' },
          { md: 'a number of 表示「许多」，中心词是 students，复数，填 are。' }
        ],
        takeaway: '一个 the 一个 a，谓语单复数正好相反。'
      },
      guided: [{ questionId: 'eng3-agreement-3', hint: 'each of 后面虽然是复数名词，但中心词 each 是单数。' }],
      solo: ['eng3-agreement-1', 'eng3-agreement-2'],
      challenge: ['eng3-agreement-4'],
      summary: {
        essence: '谓语跟主语中心词一致；nor/or 就近，with/as well as 就远，整体概念用单数。',
        formulas: ['the number of + 复数 + 单数谓语', 'a number of + 复数 + 复数谓语', 'neither...nor：就近原则'],
        pitfalls: ['看到 students 就用 are/have', 'the number of 与 a number of 混淆', '时间金额被复数形式带跑', '把 with 后的名词当主语'],
        checklist: ['我能划出主语中心词', '我分得清 the number of 与 a number of', '我会用就近和就远原则', '我知道整体概念用单数']
      },
      feynman: '请解释 "The number of students is" 为什么用 is，并说明 "A number of students are" 为什么用 are。'
    }),

    Z.makeLesson({
      id: 'beng-modal-L2', kpIds: ['eng-modal'], subject: 'english', level: 2,
      title: '情态动词：语气、义务与推测',
      estMinutes: 40,
      hookTitle: 'mustn\'t 和 needn\'t 都译成「不用」，差别到底在哪？',
      hookBody: 'mustn\'t 是**禁止**，意思是「绝对不许」；needn\'t 是**不必**，意思是「做不做都行」。中文都能翻成「不用」，但一个是红线，一个是自由，考试就考这个差别。',
      idea: '情态动词后面永远接**动词原形**，不随人称加 -s。它们不表达动作本身，而表达说话人的态度：能力、许可、义务、建议、推测。同一件事换个情态动词，语气就变了。',
      diagramId: 'modal-map', diagramCaption: '按语气把情态动词分堆',
      analogy: { title: '红绿灯与建议牌', md: 'must 是红灯，必须停；mustn\'t 是禁止通行；needn\'t 是「这条路你不走也行」；can 是「你有通行能力」；should 是路边的建议牌。都是在说「能不能、该不该」，强度完全不同。' },
      points: [
        { title: '一、形式铁律：后面接原形', md: 'can、must、should、may、will 后面一律接动词原形，第三人称也不加 -s。She can sing very well. 不能写 She can sings。否定直接在情态动词后加 not，疑问把它提到句首。' },
        { title: '二、can 与 could：能力、许可、请求', md: 'can 表示现在的能力或许可：I can swim. Can I leave now? could 是过去能力，也让请求更委婉：Could you help me? 回答 Could you...? 时通常仍用 can。' },
        { title: '三、must 与 have to：主观与客观', md: 'must 是说话人主观认为必须：You must finish it today. have to 是客观规定逼着你：I have to wear a uniform at work. 否定形式意思差别更大：mustn\'t 禁止，don\'t have to 不必。' },
        { title: '四、needn\'t 表示不必', md: 'needn\'t 等于 don\'t have to，表示没有义务。You needn\'t finish it today. There is no hurry. 这里的语境是「不着急」，不是「禁止」，所以不能用 mustn\'t。' },
        { title: '五、may 与 might：许可与可能', md: 'may 可以表示许可：May I come in? 也可以表示可能性：It may rain. might 的可能性更小、语气更弱：He might be at home. 考试里 may 常和 must、can\'t 一起考推测。' },
        { title: '六、should 表示建议与应当', md: 'should 是「应该」，语气比 must 软：You should see a doctor. ought to 意思接近 should，但后面同样接原形，否定是 ought not to do。' },
        { title: '七、肯定推测与否定推测', md: 'must be 表示「一定是」，can\'t be 表示「不可能是」，may/might be 表示「可能是」。灯亮着 → He must be at home. 他有不在场证明 → He can\'t be the thief.' },
        { title: '八、对过去的推测', md: 'must have done 表示「过去一定做过」，can\'t have done 表示「过去不可能做过」，may have done 表示「过去可能做过」。The ground is wet. It must have rained last night.' }
      ],
      table: {
        headers: ['情形', '用法', '例句'],
        rows: [
          ['能力或许可', 'can + 原形', 'She can sing very well.'],
          ['禁止', 'mustn\'t + 原形', 'You mustn\'t smoke here.'],
          ['不必', 'needn\'t + 原形', 'You needn\'t hurry.'],
          ['肯定推测', 'must be', 'He must be at home.'],
          ['否定推测', 'can\'t be', 'It can\'t be true.'],
          ['对过去的肯定推测', 'must have done', 'It must have rained last night.']
        ]
      },
      code: 'She can sing very well.\nYou needn\'t finish it today. There is no hurry.\nHe must be at home. The light is on.\nIt must have rained last night. The ground is wet.',
      warning: 'must be 不是「必须在家」，而是「一定在家」；mustn\'t 不是「不必」，而是「禁止」。中文翻译相近，语气完全相反。',
      tip: '口诀：情态后接原形；must 一定、can\'t 不可能、needn\'t 不必、mustn\'t 禁止。',
      quizIds: ['eng3-modal-1', 'eng3-modal-2', 'eng3-modal-3', 'eng3-modal-4'],
      example: {
        title: 'needn\'t 与 mustn\'t 的语境判断',
        steps: [
          { md: '原句：You ___ finish it today. There is no hurry.' },
          { md: 'There is no hurry 说明「不着急」，是「不必」的语境。' },
          { md: 'mustn\'t 表示禁止，语气太重；needn\'t 表示不必，正好合适。' },
          { md: '答案是 needn\'t。看到 no hurry、it doesn\'t matter 就想 needn\'t。' }
        ],
        takeaway: '禁止用 mustn\'t，不必用 needn\'t，先读语境再选词。'
      },
      example2: {
        title: '对过去的肯定推测',
        steps: [
          { md: '原句：The ground is wet. It ___ have rained last night.' },
          { md: 'last night 说明推测的是过去。' },
          { md: '地湿是证据，说话人认为「一定下过雨」，是肯定推测。' },
          { md: '结构是 must have done，答案是 must。can\'t have done 意思正好相反。' }
        ],
        takeaway: '先定时间（过去），再定方向（肯定/否定），最后选结构。'
      },
      guided: [{ questionId: 'eng3-modal-3', hint: '情态动词后面永远接动词原形，第三人称也不加 -s。' }],
      solo: ['eng3-modal-1', 'eng3-modal-2'],
      challenge: ['eng3-modal-4'],
      summary: {
        essence: '情态动词后接原形；语气从禁止到不必差别很大；推测分 must / can\'t / may 三档。',
        formulas: ['can / must / should + 动词原形', 'must be 一定 / can\'t be 不可能 / may be 可能', 'must have done 过去一定 / can\'t have done 过去不可能'],
        pitfalls: ['情态动词后加 -s', 'mustn\'t 与 needn\'t 混用', '把 must be 译成「必须在」', '对过去推测漏掉 have done'],
        checklist: ['我记住情态后接原形', '我能区分 mustn\'t 与 needn\'t', '我会用 must be / can\'t be 推测', '我会用 must have done']
      },
      feynman: '请用红绿灯的比喻，讲清楚 must、mustn\'t、needn\'t、can 四个词的区别。'
    }),

    Z.makeLesson({
      id: 'beng-comparison-L2', kpIds: ['eng-comparison'], subject: 'english', level: 2,
      title: '比较级与最高级：怎么变、怎么用',
      estMinutes: 40,
      hookTitle: '为什么 "more fast" 是错的？',
      hookBody: '因为 fast 是单音节词，比较级直接加 -er，变成 faster。more 只用来帮多音节词构成比较级，比如 more interesting。两种方法不能同时用，more faster 和 more fast 都是重复比较。',
      idea: '比较级用于**两者**比较，常和 than 搭配；最高级用于**三者及以上**，前面加 the 并给出范围。变化规则看音节数：单音节加 -er/-est，多音节用 more/most，不规则词单独背。',
      diagramId: 'comparison-scale', diagramCaption: '原级、比较级、最高级是一条刻度',
      analogy: { title: '三把不同高度的尺子', md: '原级是平放的水平线，比较级是两者比高矮，最高级是一群人里站得最高的那个。尺子上的刻度不能重复标：既然已经用 -er 表示更高，就不能再加 more，否则等于在同一根尺子上刻两遍。' },
      points: [
        { title: '一、单音节词加 -er / -est', md: 'tall → taller → tallest；fast → faster → fastest。以 e 结尾只加 -r/-st：nice → nicer → nicest。重读闭音节要双写末尾字母：big → bigger → biggest。' },
        { title: '二、辅音字母 + y 结尾变 i', md: 'happy → happier → happiest；easy → easier → easiest。规则是先变 y 为 i，再加 -er/-est。元音字母 + y 结尾直接加，如 grey → greyer。' },
        { title: '三、多音节词用 more / most', md: 'interesting → more interesting → most interesting；beautiful → more beautiful → most beautiful。多音节词不能加 -er，也不能同时用 more 和 -er。' },
        { title: '四、不规则变化必须背', md: 'good/well → better → best；bad → worse → worst；many/much → more → most；little → less → least；far → farther/further → farthest/furthest。这些没有规律，只能记表。' },
        { title: '五、比较级常跟 than', md: 'He is taller than me. 比较对象要对等：My bike is faster than yours，不能写 than you，因为比较的是车不是人。than 后面用宾格在口语中常见，但考试更稳的是同类事物相比。' },
        { title: '六、比较级前的修饰词', md: 'much、far、a lot、even、still、a little 可以修饰比较级：much more interesting、even better。very 不能修饰比较级，不能说 very better。' },
        { title: '七、最高级要加 the 并给范围', md: 'He is the tallest of the three boys. 最高级前通常加 the，后面用 in + 地点/团体或 of + 同类复数给出范围。没有范围就不能随便用最高级。' },
        { title: '八、as...as 与 the more...the more', md: 'as + 原级 + as 表示「和……一样」：He is as tall as his brother. 否定用 not as/so + 原级 + as。「越……越……」用 the + 比较级, the + 比较级：The more you practice, the better you will be.' }
      ],
      table: {
        headers: ['情形', '用法', '例句'],
        rows: [
          ['单音节形容词', '-er / -est', 'tall → taller → tallest'],
          ['多音节形容词', 'more / most + 原级', 'interesting → more interesting'],
          ['不规则变化', '单独记表', 'good → better → best'],
          ['两者比较', '比较级 + than', 'He is taller than me.'],
          ['三者及以上', 'the + 最高级 + 范围', 'He is the tallest of the three.'],
          ['越……越……', 'the + 比较级, the + 比较级', 'The more you practice, the better you will be.']
        ]
      },
      code: 'This book is much more interesting than that one.\nHe is the tallest of the three boys.\nMy bike is faster than yours.\nThe more you practice, the better you will be.',
      warning: '不要出现双重比较：more faster、more fast、most tallest 都是错的。单音节加 -er，多音节才用 more，二选一。',
      tip: '口诀：一音节加 er，多音节加 more；than 前比较级，the 后最高级，very 不修饰比较级。',
      quizIds: ['eng3-comparison-1', 'eng3-comparison-2', 'eng3-comparison-3', 'eng3-comparison-4'],
      example: {
        title: '多音节词用 more',
        steps: [
          { md: '原句：This book is much ___ (interesting) than that one.' },
          { md: 'interesting 是多音节词，比较级用 more interesting。' },
          { md: '前面的 much 是修饰比较级的副词，不能换成 very。' },
          { md: '答案是 more interesting。' }
        ],
        takeaway: '多音节词不加 -er；much 可以修饰比较级，very 不行。'
      },
      example2: {
        title: '改掉双重比较',
        steps: [
          { md: '原句：My bike is more fast than yours.' },
          { md: 'fast 是单音节词，比较级应该是 faster。' },
          { md: 'more 和 -er 不能同时出现，去掉 more。' },
          { md: '改成 My bike is faster than yours. 比较对象 yours 指 your bike，对等。' }
        ],
        takeaway: '先数音节，再决定加 -er 还是用 more，只能选一种。'
      },
      guided: [{ questionId: 'eng3-comparison-3', hint: '「越……越……」前后都要 the + 比较级，good 的比较级是 better。' }],
      solo: ['eng3-comparison-1', 'eng3-comparison-2'],
      challenge: ['eng3-comparison-4'],
      summary: {
        essence: '比较级用于两者，最高级用于三者以上；变化看音节，不规则词单独背。',
        formulas: ['单音节：-er / -est', '多音节：more / most + 原级', 'the + 比较级, the + 比较级'],
        pitfalls: ['more faster 双重比较', 'very 修饰比较级', '比较对象不对等', '最高级前漏 the'],
        checklist: ['我能按音节选变化方式', '我背熟五个不规则词', '我会用 than 和 the 最高级', '我会写 the more...the more']
      },
      feynman: '请解释为什么 "more fast" 错，并说出单音节和多音节形容词构成比较级的两种方法。'
    }),

    Z.makeLesson({
      id: 'beng-preposition-L2', kpIds: ['eng-preposition'], subject: 'english', level: 2,
      title: '介词：时间、地点与固定搭配',
      estMinutes: 40,
      hookTitle: 'in May 和 on May 5th，为什么一个用 in 一个用 on？',
      hookBody: '因为 in 表示一个较大的时间范围，on 表示具体到某一天。May 是一整个月，用 in；May 5th 是日历上的某一天，用 on。介词的本质，是把范围从大到小一层层收紧。',
      idea: '介词表达的是**关系**，不是中文里的固定翻译。时间上从大到小是 in → on → at；地点上从大到小也是 in → on → at。除此之外，大量动词、形容词和介词形成了固定搭配，必须整块记。',
      diagramId: 'sentence-tree', diagramCaption: '介词短语是挂在主干上的修饰枝',
      analogy: { title: '套娃与图钉', md: 'in 像把东西放进一个套娃里，范围最大；on 像把图钉按在某个表面上，范围具体；at 像指着一个点，最精确。时间也一样：年、月是套娃，某一天是表面，几点钟是一个点。' },
      points: [
        { title: '一、时间 in / on / at 从大到小', md: 'in + 年、月、季节、泛指的上午下午晚上：in 2024、in May、in the morning。on + 具体某天或某天的上午下午：on May 5th、on Sunday morning。at + 具体时刻或时间点：at seven、at noon、at night。' },
        { title: '二、地点 in / on / at 从大到小', md: 'in 用于大地点或内部：in Shanghai、in the room。on 用于表面或街道：on the desk、on Nanjing Road。at 用于小地点或一个点：at the bus stop、at the door。' },
        { title: '三、for / since / during / by', md: 'for + 一段时间：for three years。since + 起点：since 2020。during + 期间：during the holiday。by + 截止时间：by Friday，表示「不迟于」。这四个词常和完成时一起考。' },
        { title: '四、动词 + 介词', md: 'depend on、listen to、wait for、look for、arrive in/at、laugh at、look after。动词后面的介词是搭配的一部分，不能按中文意思随便换。' },
        { title: '五、形容词 + 介词', md: 'be good at 擅长、be interested in 对……感兴趣、be afraid of 害怕、be famous for 因……著名、be proud of 为……自豪、be full of 充满。这些是写作和完形的高频搭配。' },
        { title: '六、to 有时是介词', md: 'look forward to doing、be used to doing、pay attention to doing、devote oneself to doing。这里的 to 后面接名词或动名词，不是不定式符号，不能接动词原形。' },
        { title: '七、易混的时间表达', md: 'in the morning 是泛指，on Sunday morning 是具体某天早晨。arrive in + 大地点，arrive at + 小地点。be good at 擅长，be good with 善于和某人相处，be good for 对……有益。' }
      ],
      table: {
        headers: ['情形', '用法', '例句'],
        rows: [
          ['年、月、季节', 'in', 'in 2024 / in May'],
          ['具体某一天', 'on', 'on May 5th'],
          ['具体时刻', 'at', 'at seven o\'clock'],
          ['大地点', 'in', 'in Shanghai'],
          ['小地点或一个点', 'at', 'at the bus stop'],
          ['截止时间', 'by', 'by Friday']
        ]
      },
      code: 'I was born on May 5th, 2000.\nHe arrived in Shanghai on Sunday morning.\nShe is good at math and good with her classmates.\nI am looking forward to seeing you.',
      warning: 'look forward to 里的 to 是介词，后面必须接动名词。I am looking forward to see you 是错的，要改成 seeing。',
      tip: '口诀：年月季节用 in，具体某天用 on，时刻用 at；遇到固定搭配就整块背，尤其注意 to 后面接 doing。',
      quizIds: ['eng3-prep-1', 'eng3-prep-2', 'eng3-prep-3', 'eng3-prep-4'],
      example: {
        title: '具体日期用 on',
        steps: [
          { md: '原句：I was born ___ May 5th, 2000.' },
          { md: 'May 5th 是具体到某一天，不是笼统的月份。' },
          { md: 'in 接年、月、季节，on 接具体日期。' },
          { md: '答案是 on。若只说 in May，就用 in。' }
        ],
        takeaway: '时间范围越具体，介词越靠后：in → on → at。'
      },
      example2: {
        title: '固定搭配里的 to 是介词',
        steps: [
          { md: '原句：I am looking forward to see you.' },
          { md: 'look forward to 是固定短语，意思是「期待」。' },
          { md: '这里的 to 是介词，后面接名词或动名词。' },
          { md: 'see 改成 seeing，整句为 I am looking forward to seeing you.' }
        ],
        takeaway: '判断 to 是介词还是不定式符号，先看它属于哪个固定短语。'
      },
      guided: [{ questionId: 'eng3-prep-2', hint: '想两个意思：擅长学科用哪个介词，和同学相处用哪个介词。' }],
      solo: ['eng3-prep-1', 'eng3-prep-4'],
      challenge: ['eng3-prep-3'],
      summary: {
        essence: '时间地点都按 in → on → at 从大到小；固定搭配要整块背，to 后可能接 doing。',
        formulas: ['in + 年/月/季节；on + 具体某天；at + 时刻', 'for + 一段时间；since + 起点；by + 截止', 'look forward to doing'],
        pitfalls: ['具体日期误用 in', 'arrive in 与 arrive at 混用', 'look forward to 后接原形', 'be good at / with / for 混淆'],
        checklist: ['我能按范围选 in / on / at', '我记住四个时间介词的分工', '我背熟高频动词介词搭配', '我知道 to 什么时候接 doing']
      },
      feynman: '请用套娃和图钉的比喻，讲清楚 in、on、at 在时间和地点上的区别。'
    }),

    Z.makeLesson({
      id: 'beng-progressive-L2', kpIds: ['eng-progressive'], subject: 'english', level: 2,
      title: '进行时：此刻、那时与将来那一刻',
      estMinutes: 40,
      hookTitle: '为什么 "I am knowing the answer" 是错的？',
      hookBody: '因为 know 是状态动词，表示一种心理状态，不是正在发生的动作。你不可能「正在知道」，知道就是知道。状态动词通常只用一般现在时，不用进行时。',
      idea: '进行时的公式是 **be + doing**，表示某个时刻动作**正在进行**。be 的时态决定时间：am/is/are 是现在，was/were 是过去，will be 是将来。状态动词（know、like、believe 等）一般不用进行时。',
      diagramId: 'tense-timeline', diagramCaption: '先在时间轴上定位，再选 be 的形式',
      analogy: { title: '一张正在拍的照片', md: '进行时像按下快门的那一刻：画面里的事情正在发生。一般现在时像一张习惯清单：每天都这样。过去进行时是把照片翻回昨晚八点，将来进行时是把镜头对准明天这个时候。' },
      points: [
        { title: '一、构成：be + doing', md: '现在进行时 am/is/are + doing；过去进行时 was/were + doing；将来进行时 will be + doing。be 随主语变化，doing 的形式不变。She is reading. They are playing.' },
        { title: '二、现在进行时的信号词', md: 'now、at the moment、right now、Look!、Listen! 都提示此刻正在发生。Listen! Someone is singing in the next room. Look! The children are playing football.' },
        { title: '三、过去进行时的时间点', md: 'at eight last night、at that time、this time yesterday 表示过去某一时刻正在做。At eight last night, I was watching TV. 强调「当时正在」，不强调是否做完。' },
        { title: '四、过去进行时与一般过去时搭配', md: '长动作当背景用进行时，短动作用一般过去时：I was reading when he came in. 正在读是背景，他进来是打断。when 后常接短暂动作，while 后常接进行时。' },
        { title: '五、将来进行时', md: 'will be + doing 表示将来某一时刻正在进行：At this time tomorrow, I will be flying to Beijing. 它比 will do 更有画面感，也更礼貌。' },
        { title: '六、-ing 的变化规则', md: '一般直接加 -ing：read → reading。以不发音 e 结尾去 e：make → making。重读闭音节双写末尾字母：run → running、swim → swimming。ie 结尾变 y：lie → lying。' },
        { title: '七、状态动词不用进行时', md: 'know、like、love、want、need、believe、understand、belong、have（拥有）都是状态动词。I know the answer 对，I am knowing 错。但 have 表示「正在吃、正在经历」时可以：I am having lunch.' },
        { title: '八、进行时与一般现在时的分工', md: '进行时强调此刻，一般现在时强调习惯或真理。She is reading now 是此刻正在读；She reads every night 是每晚都读。看到 every day、usually、often 就选一般现在时。' }
      ],
      table: {
        headers: ['情形', '用法', '例句'],
        rows: [
          ['此刻正在发生', 'am/is/are + doing', 'She is reading now.'],
          ['过去某一刻正在', 'was/were + doing', 'I was watching TV at eight.'],
          ['将来某一刻正在', 'will be + doing', 'I will be working at this time tomorrow.'],
          ['状态动词', '一般现在时', 'I know the answer.'],
          ['Look / Listen / now', '现在进行时', 'Look! They are playing.'],
          ['when 引导的打断', '短动作用一般过去时', 'I was reading when he came.']
        ]
      },
      code: 'Listen! Someone is singing next door.\nAt eight last night, I was watching TV with my family.\nI know the answer.\nLook! The children are playing football.',
      warning: '状态动词不能加进行时。I am knowing、I am liking、I am believing 都是典型错误，应该用一般现在时。',
      tip: '口诀：进行时 = be + doing；Look/Listen/now 想进行时，know/like/want 想一般现在时。',
      quizIds: ['eng3-prog-1', 'eng3-prog-2', 'eng3-prog-3', 'eng3-prog-4'],
      example: {
        title: 'Listen 提示现在进行时',
        steps: [
          { md: '原句：Listen! Someone ___ (sing) in the next room.' },
          { md: 'Listen 是现在进行时的信号词，表示此刻正在发生。' },
          { md: '主语 Someone 视为单数，be 用 is。' },
          { md: 'sing 直接加 -ing，答案是 is singing。' }
        ],
        takeaway: '先看信号词定时间，再定 be 的单复数，最后加 doing。'
      },
      example2: {
        title: '状态动词改回一般现在时',
        steps: [
          { md: '原句：I am knowing the answer.' },
          { md: 'know 表示心理状态，不是正在进行的动作。' },
          { md: '去掉 be 动词 am，把 knowing 改回 know。' },
          { md: '改成 I know the answer. 类似还有 like、want、believe。' }
        ],
        takeaway: '状态动词用一般现在时，不要硬套 be + doing。'
      },
      guided: [{ questionId: 'eng3-prog-4', hint: 'Look 提示此刻正在发生，children 是复数，be 要用 are。' }],
      solo: ['eng3-prog-1', 'eng3-prog-2'],
      challenge: ['eng3-prog-3'],
      summary: {
        essence: '进行时是 be + doing，表示某刻正在；be 的时态决定时间；状态动词不用进行时。',
        formulas: ['am/is/are + doing', 'was/were + doing', 'will be + doing'],
        pitfalls: ['状态动词硬加进行时', 'be 与主语单复数不一致', '把过去进行时写成一般过去时', '-ing 拼写规则出错'],
        checklist: ['我能写出三种进行时', '我认识 Look / Listen / now 信号', '我会区分进行时与一般现在时', '我背熟常见状态动词']
      },
      feynman: '请解释为什么 "I am knowing the answer" 错，并说明现在进行时和一般现在时的区别。'
    }),

    Z.makeLesson({
      id: 'beng-future-L2', kpIds: ['eng-future'], subject: 'english', level: 2,
      title: '一般将来时：will 与 be going to',
      estMinutes: 40,
      hookTitle: 'will 和 be going to 都表将来，什么时候不能互换？',
      hookBody: '临时起意用 will，事先计划用 be going to。看到「已经买了票」「早就打算」就用 be going to；看到说话当下才决定，比如电话响了说 I will answer it，就用 will。有迹象的预测也用 be going to。',
      idea: '一般将来时有三条主线：**will + 原形**表示临时决定、承诺和单纯预测；**be going to + 原形**表示已有计划或有迹象的预测；**时间、条件状语从句用一般现在时表将来**，也就是「主将从现」。',
      diagramId: 'future-timeline', diagramCaption: '站在现在，看将来的三种说法',
      analogy: { title: '临时打车与提前订票', md: 'will 像站在路边临时招手打车：决定了就走。be going to 像提前买好车票：计划早就定了。主将从现像列车时刻表：虽然说的是明天，但表上写的是现在的固定安排。' },
      points: [
        { title: '一、will + 动词原形', md: 'will 后面永远接原形，不随人称变化。I will call you tomorrow. 否定是 will not / won\'t，疑问把 will 提前：Will you come? will 常用于临时决定、承诺和单纯预测。' },
        { title: '二、be going to + 动词原形', md: 'be 随主语变化：am/is/are going to do。它强调「已经打算好」或「有明显迹象」。I am going to visit my grandma next week. I have already bought the ticket. 有票就是计划。' },
        { title: '三、临时决定用 will', md: '说话当下才做的决定用 will。电话响了：I will answer it. 看到别人搬不动：I will help you. 这种场景没有提前计划，所以不用 be going to。' },
        { title: '四、有迹象的预测用 be going to', md: 'Look at those dark clouds! It is going to rain. 乌云是现场证据，预测有依据。will 也可以预测，但更偏主观判断：I think he will win.' },
        { title: '五、主将从现', md: 'if、when、before、after、as soon as、until 引导的时间或条件状语从句，用一般现在时表将来，主句才用将来时。If it rains tomorrow, we will stay at home. 不能写 if it will rain。' },
        { title: '六、其他将来表达', md: '现在进行时可以表示已安排好的将来：I am meeting him tomorrow. 一般现在时表示时刻表：The train leaves at eight. be about to do 表示「即将」，后面不再加时间状语。' },
        { title: '七、从句位置不影响规则', md: '从句可以放主句前，也可以放主句后：When he comes, I will call you. / I will call you when he comes. 无论位置如何，从句里都不能用 will。' }
      ],
      table: {
        headers: ['情形', '用法', '例句'],
        rows: [
          ['临时决定', 'will + 原形', 'I will answer the phone.'],
          ['事先计划', 'be going to + 原形', 'I am going to visit my grandma.'],
          ['有迹象的预测', 'be going to + 原形', 'It is going to rain.'],
          ['单纯预测或承诺', 'will + 原形', 'I think he will win.'],
          ['if / when 从句', '一般现在时表将来', 'If it rains, we will stay.'],
          ['时刻表安排', '一般现在时', 'The train leaves at eight.']
        ]
      },
      code: 'If it rains tomorrow, we will stay at home.\nI am going to visit my grandma next week.\nLook at those dark clouds! It is going to rain.\nWhen he comes, I will call you.',
      warning: 'if 和 when 引导的从句里不能用 will。If it will rain 是错的，要写成 If it rains。这条规则叫「主将从现」。',
      tip: '口诀：有计划、有迹象用 be going to；临时起意用 will；if/when 从句用现在时表将来。',
      quizIds: ['eng3-future-1', 'eng3-future-2', 'eng3-future-3', 'eng3-future-4'],
      example: {
        title: '主将从现判断 if 从句',
        steps: [
          { md: '原句：If it ___ tomorrow, we will stay at home.' },
          { md: 'if 引导条件状语从句，主句已经是 will stay。' },
          { md: '从句要用一般现在时表将来，不能用 will rain。' },
          { md: 'it 是第三人称单数，rain 加 -s，答案是 rains。' }
        ],
        takeaway: '看到 if/when 从句和主句 will，从句动词就用一般现在时。'
      },
      example2: {
        title: '用迹象选 be going to',
        steps: [
          { md: '原句：Look at those dark clouds! It ___ rain.' },
          { md: 'Look at 提示现场有证据，乌云说明马上要下雨。' },
          { md: '有迹象的预测用 be going to。' },
          { md: '主语 It 用 is，答案是 is going to。' }
        ],
        takeaway: '现场证据 → be going to；临时决定 → will。'
      },
      guided: [{ questionId: 'eng3-future-4', hint: 'Look at 说明有现场证据，有迹象的预测用 be going to。' }],
      solo: ['eng3-future-2', 'eng3-future-1'],
      challenge: ['eng3-future-3'],
      summary: {
        essence: 'will 管临时决定和单纯预测，be going to 管计划和迹象；从句用现在时表将来。',
        formulas: ['will + 动词原形', 'be going to + 动词原形', '主将从现：if/when + 一般现在时，主句用将来时'],
        pitfalls: ['if 从句里用 will', '把临时决定写成 be going to', 'will 后动词加 -s', '时刻表误用 will'],
        checklist: ['我能区分 will 与 be going to', '我会用主将从现', '我知道其他将来表达', '我能按信号词选时态']
      },
      feynman: '请用「临时打车」和「提前订票」的比喻，讲清楚 will 与 be going to 的区别。'
    }),

    Z.makeLesson({
      id: 'beng-inversion-L3', kpIds: ['eng-inversion'], subject: 'english', level: 3,
      title: '倒装句：把助动词提到主语前面',
      estMinutes: 45,
      hookTitle: '为什么 Never 一放句首，句子语序就要反过来？',
      hookBody: '因为 never 是否定副词，放在句首时有强调作用，英语要求主句用倒装来配合这种强调。倒装不是把整个动词搬前面，而是只把助动词、be 动词或情态动词提到主语前，实义动词留在原位。',
      idea: '倒装分两种：**完全倒装**是整个谓语放到主语前，**部分倒装**只提前助动词/be/情态动词。考试主要考部分倒装，触发信号有三类：否定词放句首、only + 状语放句首、so + 形容词或副词放句首。',
      diagramId: 'inversion-box', diagramCaption: '正常语序与倒装语序只差助动词的位置',
      analogy: { title: '把领队换到队首', md: '一个队伍原本是「主语—助动词—动词」，倒装只是把助动词这个领队换到主语前面，其他人位置基本不动。不是把整个队伍倒过来，也不是把实义动词单独拉出来站最前面。' },
      points: [
        { title: '一、先分清完全倒装与部分倒装', md: '完全倒装把整个谓语放主语前：Here comes the bus. 部分倒装只提前助动词：Never have I seen it. 高中和专升本考试绝大多数是部分倒装，记住「提前助动词」就不会写错。' },
        { title: '二、否定词放句首', md: 'never、hardly、seldom、rarely、little、nowhere、not only、no sooner、in no way 放句首，主句部分倒装。Never have I seen such a beautiful place. 原句是 I have never seen...，把 have 提前。' },
        { title: '三、only + 状语放句首', md: 'only 修饰状语、介词短语或状语从句并放句首时，主句倒装。Only then did I know the truth. Only by working hard can we succeed. 注意 only 修饰主语时不倒装：Only he can do it.' },
        { title: '四、so + 形容词或副词放句首', md: 'So + adj/adv + be/助动词 + 主语 + that 从句。So loudly did he speak that everyone in the hall heard him. 提前的是助动词 did，speak 回原形。' },
        { title: '五、hardly...when 与 no sooner...than', md: '这两个句型表示「一……就……」，主句用过去完成时并倒装：Hardly had I arrived when it began to rain. No sooner had he left than the phone rang. when/than 从句不倒装。' },
        { title: '六、so / neither 表示也、也不', md: 'So do I 表示「我也是」，Neither did he 表示「他也不是」。结构是 so/neither + 助动词 + 主语，助动词要和前句的时态、人称一致。' },
        { title: '七、as 引导的让步倒装', md: 'as 表示「虽然」时，把表语或状语提前：Child as he is, he knows a lot. 注意提前的名词不加冠词。Hard as he tried, he failed. 这种倒装写作里用一次很加分。' },
        { title: '八、倒装后的动词形式', md: '助动词提前后，实义动词必须回到原形。did I know、did he speak、have I seen。不要写成 knew I、spoke he，也不要让实义动词单独提前。' }
      ],
      table: {
        headers: ['情形', '用法', '例句'],
        rows: [
          ['否定词放句首', '助动词提前', 'Never have I seen it.'],
          ['only + 状语放句首', '主句部分倒装', 'Only then did I know the truth.'],
          ['so + adj/adv 放句首', '助动词提前，动词原形', 'So loudly did he speak.'],
          ['hardly...when', 'had 提前', 'Hardly had I arrived when it rained.'],
          ['表示「也 / 也不」', 'so/neither + 助动词 + 主语', 'So do I. / Neither did he.'],
          ['as 表示「虽然」', '表语或状语提前', 'Child as he is, he knows a lot.']
        ]
      },
      code: 'Never have I seen such a beautiful place.\nOnly then did I know the truth.\nHardly had I arrived when it began to rain.\nSo loudly did he speak that everyone in the hall heard him.',
      warning: '部分倒装只提前助动词，实义动词留在原位并恢复原形。spoke he、knew I 都是错的，应该是 did he speak、did I know。',
      tip: '口诀：否定词、only 状语、so 开头 → 助动词提前，实义动词回原形；hardly/no sooner 用 had 提前。',
      quizIds: ['eng3-inversion-1', 'eng3-inversion-2', 'eng3-inversion-3', 'eng3-inversion-4'],
      example: {
        title: 'Never 放句首的倒装',
        steps: [
          { md: '原句：Never ___ I seen such a beautiful place.' },
          { md: '还原正常语序：I have never seen such a beautiful place.' },
          { md: 'Never 提到句首后，把助动词 have 提到主语 I 前面。' },
          { md: '主语是 I，助动词用 have，答案是 have。' }
        ],
        takeaway: '先还原正常语序，再把助动词搬到主语前。'
      },
      example2: {
        title: 'hardly...when 的过去完成时倒装',
        steps: [
          { md: '原句：Hardly I had arrived when it began to rain.' },
          { md: 'Hardly 放句首，主句必须部分倒装。' },
          { md: 'hardly...when 的主句用过去完成时 had arrived。' },
          { md: '把 had 提到主语 I 前：Hardly had I arrived when it began to rain. 从句不倒装。' }
        ],
        takeaway: 'hardly/no sooner 句首，先写 had，再写主语和过去分词。'
      },
      guided: [{ questionId: 'eng3-inversion-2', hint: 'Only then 是状语放句首，主句用助动词 did 提前，know 回原形。' }],
      solo: ['eng3-inversion-1', 'eng3-inversion-4'],
      challenge: ['eng3-inversion-3'],
      summary: {
        essence: '否定词、only 状语、so 放句首时主句部分倒装，只提前助动词。',
        formulas: ['Never / Hardly / Only then + 助动词 + 主语 + 动词原形', 'Hardly had + 主语 + done + when...', 'So + adj/adv + 助动词 + 主语 + that...'],
        pitfalls: ['把实义动词单独提前', '倒装后动词忘回原形', 'only 修饰主语时误倒装', 'hardly 从句也倒装'],
        checklist: ['我能还原正常语序', '我知道三类倒装信号', '我会用 hardly...when', '我分得清完全倒装和部分倒装']
      },
      feynman: '请解释为什么 "Never have I seen it" 要倒装，并说明倒装时到底提前了什么成分。'
    }),

    Z.makeLesson({
      id: 'beng-subjunctive-L3', kpIds: ['eng-subjunctive'], subject: 'english', level: 3,
      title: '虚拟语气：与事实相反的假设',
      estMinutes: 45,
      hookTitle: '为什么 "If I were you" 用的是 were，不是 am？',
      hookBody: '因为我现在并不是你，这个假设与现在事实相反。虚拟语气遇到与现在相反的情况，动词要「退一步」用过去式；be 动词不论主语是谁，一律用 were。所以是 If I were you。',
      idea: '虚拟语气的核心是**与事实相反**，动词要降一个时态：与现在相反用过去式，与过去相反用过去完成时，与将来相反用 were to do / should do。主句通常用 would / could / might + 原形，would 只出现在主句。',
      diagramId: 'perfect-timeline', diagramCaption: '与过去相反，动词要退到过去完成时',
      analogy: { title: '倒带看另一种结局', md: '虚拟语气像把录像带倒回去，设想另一种结局：如果当时早点出门，就赶上火车了。因为是「没有发生」的过去，动词要再往前退一格，用 had done；主句则用 would have done 说出那个没实现的結果。' },
      points: [
        { title: '一、与现在事实相反', md: 'if 从句用一般过去时，be 一律用 were；主句用 would/could/might + 动词原形。If I were you, I would take the job. 事实是我不是你，所以用 were。' },
        { title: '二、与过去事实相反', md: 'if 从句用 had done，主句用 would have done。If he had left earlier, he would have caught the train. 事实是他没早走，也没赶上。两个部分都要用完成结构。' },
        { title: '三、与将来事实相反', md: 'if 从句用 were to do、should do 或一般过去时；主句用 would do。If it should rain tomorrow, we would stay at home. 这种假设可能性很小。' },
        { title: '四、wish 后的虚拟', md: 'wish 表示「但愿」，与现在相反用过去式：I wish I were taller. 与过去相反用 had done：I wish I had had more time yesterday. 与将来相反用 would/could do：I wish it would stop raining.' },
        { title: '五、if 从句里不用 would', md: 'would 只能出现在主句。If I would know the answer 是错的，要写 If I knew the answer, I would tell you. 记住「从句退时态，主句用 would」。' },
        { title: '六、混合虚拟', md: '从句说过去，主句说现在：If I had taken the medicine, I would be better now. 从句 had taken 与过去相反，主句 would be 与现在相反。判断时分别看两半的时间状语。' },
        { title: '七、其他虚拟句型', md: 'It is time that + 过去式：It is time we left. would rather + 过去式：I would rather you came tomorrow. as if + 过去式/had done：He talks as if he knew everything. suggest/insist/demand + that + (should) do.' }
      ],
      table: {
        headers: ['情形', '用法', '例句'],
        rows: [
          ['与现在相反', 'if + 过去式（be 用 were），主句 would + 原形', 'If I were you, I would go.'],
          ['与过去相反', 'if + had done，主句 would have done', 'If he had left, he would have caught it.'],
          ['与将来相反', 'if + were to do / should do，主句 would do', 'If it should rain, we would stay.'],
          ['wish 与现在相反', 'wish + 过去式', 'I wish I were taller.'],
          ['wish 与过去相反', 'wish + had done', 'I wish I had known it.'],
          ['建议、要求', 'that + (should) + 原形', 'He suggested that we (should) go.']
        ]
      },
      code: 'If I were you, I would take the job.\nIf he had left earlier, he would have caught the train.\nI wish I had had more time yesterday.\nIf I knew the answer, I would tell you.',
      warning: 'if 从句里不能用 would。If I would know the answer 错，要写 If I knew the answer。另外，wish 与过去相反时是两个 had：第一个是助动词，第二个是实义动词 have 的过去分词。',
      tip: '口诀：现在相反过去式，过去相反 had done，将来相反 were to / should do；would 只在主句。',
      quizIds: ['eng3-subj-1', 'eng3-subj-2', 'eng3-subj-3', 'eng3-subj-4'],
      example: {
        title: '与现在相反：were + would do',
        steps: [
          { md: '原句：If I ___ you, I would take the job.' },
          { md: '事实是我不是你，这个假设与现在相反。' },
          { md: 'if 从句用一般过去时，be 动词一律用 were。' },
          { md: '主句已经是 would take，从句填 were。' }
        ],
        takeaway: '与现在相反，从句过去式，be 用 were，主句 would + 原形。'
      },
      example2: {
        title: 'wish 与过去相反：had done',
        steps: [
          { md: '原句：I wish I ___ more time yesterday.' },
          { md: 'yesterday 说明遗憾发生在过去。' },
          { md: 'wish 后与过去相反，用过去完成时 had done。' },
          { md: 'have 的过去分词是 had，所以填 had had。' }
        ],
        takeaway: 'wish 对过去的遗憾，用 had done，别只写一个 had。'
      },
      guided: [{ questionId: 'eng3-subj-3', hint: '主句是 would have caught，说明与过去相反，从句要用 had done。' }],
      solo: ['eng3-subj-1', 'eng3-subj-2'],
      challenge: ['eng3-subj-4'],
      summary: {
        essence: '虚拟语气表示与事实相反，动词按时间退一格；would 只在主句。',
        formulas: ['与现在相反：If + 过去式(were), would + 原形', '与过去相反：If + had done, would have done', '与将来相反：If + were to do / should do, would do'],
        pitfalls: ['if 从句里用 would', '与现在相反 be 用 was/am', 'wish 与过去相反只写一个 had', '主句与从句时态搭配错'],
        checklist: ['我能写与现在相反的虚拟', '我能写与过去相反的虚拟', '我分得清 wish 的三种时间', '我知道 would 只在主句']
      },
      feynman: '请解释为什么 "If I were you" 用 were，并说出与现在、过去、将来相反时各自的动词形式。'
    }),

    Z.makeLesson({
      id: 'beng-cloze-L3', kpIds: ['eng-cloze'], subject: 'english', level: 3,
      title: '完形填空：先通读，再三条线索选词',
      estMinutes: 45,
      hookTitle: '完形填空为什么不能一个空一个空地做？',
      hookBody: '因为完形是补全一篇短文，不是 20 道独立的词义题。空格前后的搭配、逻辑方向和原词复现，都要靠上下文。逐空翻译会切断线索，越做越乱；先通读抓主线，很多空自然就定了。',
      idea: '完形的正确顺序是：**先通读抓主线**，再按**固定搭配、逻辑关系、原词复现**三条线索选词，最后通读复查。语法线索用来排除形式错误，语义线索用来在两个近义词里做最后选择。',
      diagramId: 'cloze-flow', diagramCaption: '通读 → 搭配 → 逻辑 → 复现 → 复查',
      analogy: { title: '拼一幅缺了几块的画', md: '完形像拼一幅缺了几块的画：先看整幅画的构图，知道是风景还是人物，再去找每一块。如果一上来就盯着缺口，可能把天空的蓝色硬塞进草地里。整体先于局部，是完形的第一原则。' },
      points: [
        { title: '一、第一步通读，不看选项', md: '花一分钟把全文读一遍，抓住话题、人物、时间和情感基调。是励志故事还是说明文？作者态度是肯定还是否定？这些决定很多空的褒贬方向。' },
        { title: '二、搭配线索', md: '固定搭配是最好拿的分：depend on、look forward to doing、be interested in、be good at、take care of。看到动词或形容词，先想它常跟哪个介词、名词、动词形式。' },
        { title: '三、逻辑线索', md: 'but、however、yet 表示转折；because、since、as 表示原因；so、therefore 表示结果；although、though 表示让步；besides、moreover 表示递进。前后语义相反就选转折，方向一致就选并列或递进。' },
        { title: '四、原词复现与同义复现', md: '上下文出现过同一个词或近义词，空格往往要选呼应词。前文说 hard work，后文可能填 success；前文说 tired，后文可能填 rest。复现是最稳的线索之一。' },
        { title: '五、语法线索排除', md: '空格前后的时态、主谓一致、单复数、冠词、非谓语形式，都能帮你排除一半选项。比如主语是单数，谓语就不能选 are；介词后不能接动词原形。' },
        { title: '六、排除法与感情色彩', md: '先排除搭配错误、词性错误的选项，再看剩余选项的感情色彩是否和全文一致。褒义故事里突然出现贬义词，通常就是干扰项。' },
        { title: '七、最后通读复查', md: '所有空填完后，把全文连着读一遍。哪里读起来别扭，哪里就可能选错了。复查还能发现前后时态不一致、代词指代不明这类问题。' },
        { title: '八、不要在生词上卡住', md: '遇到不认识的词先跳过，很多词不影响做题。完形考的是上下文推理，不是词汇量比赛。把能做的空先做掉，剩余选项会越来越少。' }
      ],
      table: {
        headers: ['情形', '用法', '例句'],
        rows: [
          ['第一步', '通读抓主线', '先不看选项读完整篇'],
          ['搭配线索', '固定搭配', 'Success depends on hard work.'],
          ['逻辑线索', '转折关系', 'He was tired, but he kept working.'],
          ['复现线索', '同义或原词呼应', '前文 hard work，后文 success'],
          ['语法线索', '时态、单复数', '主语单数，谓语用 is'],
          ['最后一步', '通读复查', '检查全文是否连贯']
        ]
      },
      code: 'Success depends on hard work.\nHe was very tired, but he kept working.\nI look forward to hearing from you soon.\nHard work leads to success.',
      warning: '不要只看空格所在的那一句。完形的线索经常在上一句或下一句，尤其是代词指代和逻辑连接词。',
      tip: '口诀：先通读抓主线，再搭配、逻辑、复现三条线索，最后通读复查。',
      quizIds: ['eng3-cloze-1', 'eng3-cloze-2', 'eng3-cloze-3', 'eng3-cloze-4'],
      example: {
        title: '用逻辑关系选转折词',
        steps: [
          { md: '原句：He was very tired, ___ he kept working.' },
          { md: '前半句说累，后半句说继续工作，语义方向相反。' },
          { md: '转折关系，用 but。so 表结果，because 表原因，and 表并列。' },
          { md: '答案是 but。填完后读一遍，语义通顺。' }
        ],
        takeaway: '先判断前后语义是一致还是相反，再选逻辑词。'
      },
      example2: {
        title: '用固定搭配定介词',
        steps: [
          { md: '原句：Success depends ___ hard work.' },
          { md: 'depend 的固定搭配是 depend on，表示「取决于」。' },
          { md: '不要按中文「依赖于」猜成 in 或 for。' },
          { md: '答案是 on。类似还有 look forward to、be good at。' }
        ],
        takeaway: '固定搭配靠积累，看到动词先想它跟哪个介词。'
      },
      guided: [{ questionId: 'eng3-cloze-4', hint: 'look forward to 里的 to 是介词，后面要接动名词。' }],
      solo: ['eng3-cloze-1', 'eng3-cloze-3'],
      challenge: ['eng3-cloze-2'],
      summary: {
        essence: '完形是先补全短文：通读抓主线，再用搭配、逻辑、复现三条线索选词。',
        formulas: ['通读 → 搭配 → 逻辑 → 复现 → 复查', '转折 but / however；因果 because / so', '固定搭配：depend on、look forward to doing'],
        pitfalls: ['逐空翻译切断上下文', '只看本句不看前后句', '忽略感情色彩', '固定搭配凭中文猜'],
        checklist: ['我会先通读再做题', '我能识别常见逻辑关系', '我会用复现线索', '我做完会通读复查']
      },
      feynman: '请用「拼一幅缺块的画」的比喻，讲清楚完形填空为什么必须先通读全文。'
    }),

    Z.makeLesson({
      id: 'beng-writing-L3', kpIds: ['eng-writing'], subject: 'english', level: 3,
      title: '写作：书信与议论文的三段骨架',
      estMinutes: 45,
      hookTitle: '为什么背了很多高级词，作文分数还是上不去？',
      hookBody: '因为阅卷先看结构和要点，再看语言。结构乱、要点漏、连接词用错，再高级的词也救不回来。先把三段骨架搭稳，再往里面填准确的句子，分数才会稳定。',
      idea: '写作先搭骨架：**书信**是「称呼—目的句—正文—期待回复—署名」，**议论文**是「观点—论据—结论」。连接词要准确，时态要统一，要点要齐全；高级句式用一两处即可，不要堆砌。',
      diagramId: 'sentence-tree', diagramCaption: '先立骨架，再挂内容',
      analogy: { title: '先搭衣架再挂衣服', md: '作文像穿衣：先有衣架（结构），衣服（词句）才挂得整齐。没有衣架，再贵的衣服也会堆成一团。三段式就是衣架，连接词是挂钩，要点是必须挂上去的几件衣服。' },
      points: [
        { title: '一、书信的基本格式', md: '称呼用 Dear Sir or Madam 或 Dear Mr. Li；开头写 I am writing to...；正文分段说明；结尾写 I am looking forward to hearing from you.；最后署名 Yours sincerely, Li Ming。格式完整本身就是分。' },
        { title: '二、开头目的句', md: '书信第一句直接说明目的：I am writing to apply for the position of sales manager. / I am writing to invite you to our English evening. / I am writing to express my thanks for your help. to 后接动词原形。' },
        { title: '三、议论文三段式', md: '第一段亮观点：In my opinion, ... 第二段给两三条论据：Firstly... Moreover... Finally... 第三段总结：In conclusion, ... 每段只做一件事，阅卷老师一眼就能看到结构。' },
        { title: '四、连接词要准确', md: 'Firstly、Moreover、In addition 表递进；However 表转折，后面加逗号；Therefore、As a result 表结果；In conclusion 表总结。不要为了显得高级乱用，逻辑不对反而扣分。' },
        { title: '五、句式多样但可控', md: '一篇作文用一处定语从句、一处状语从句、一处非谓语、一处倒装就够。比如 Only by practicing every day can we improve. 用得好是亮点，用错了不如写简单句。' },
        { title: '六、避免中式英语', md: '注意主谓一致、时态一致、冠词和单复数。不要逐字翻译中文，比如「我非常喜欢」写 I like it very much，不要写 I very like it。写完后专门检查这几项。' },
        { title: '七、要点与字数', md: '题目给的要点必须全部覆盖，缺一个就丢一块分。字数不够会扣分，写太多也容易出错。先把要点写成短句，再合并成段落，是最稳的流程。' },
        { title: '八、结尾句的固定表达', md: '书信结尾：I am looking forward to hearing from you. / Thank you for your time and consideration. 议论文结尾：In conclusion, we should take action right now. 结尾不要引入新的观点。' }
      ],
      table: {
        headers: ['情形', '用法', '例句'],
        rows: [
          ['书信开头', 'I am writing to + 原形', 'I am writing to apply for the job.'],
          ['书信结尾', 'look forward to + doing', 'I am looking forward to hearing from you.'],
          ['议论文第一段', '亮明观点', 'In my opinion, we should ...'],
          ['议论文第二段', '分点给论据', 'Firstly ... Moreover ...'],
          ['议论文第三段', '总结收束', 'In conclusion, ...'],
          ['转折连接', 'However + 逗号', 'However, we still finished the match.']
        ]
      },
      code: 'Dear Sir or Madam,\nI am writing to apply for the position of sales manager.\nI am looking forward to hearing from you.\nYours sincerely,\nLi Ming',
      warning: 'look forward to 的 to 是介词，后面必须接动名词。I am looking forward to hear from you 是错的，要写 hearing。However 放句首时后面要加逗号。',
      tip: '口诀：先搭骨架再填内容；书信目的—正文—期待，议论观点—论据—结论。',
      quizIds: ['eng3-writing-1', 'eng3-writing-2', 'eng3-writing-3', 'eng3-writing-4'],
      example: {
        title: '书信目的句填动词原形',
        steps: [
          { md: '原句：I am writing to ___ (apply) for the position of sales manager.' },
          { md: 'be writing to do 表示「写信是为了做某事」。' },
          { md: '这里的 to 是不定式符号，后面接动词原形。' },
          { md: 'apply for 是固定搭配，填 apply。' }
        ],
        takeaway: '目的句用 to + 原形；apply for 整体记住。'
      },
      example2: {
        title: '用 However 连接转折',
        steps: [
          { md: '原句：It rained heavily. ___ (然而), we still finished the match.' },
          { md: '前句下雨，后句仍完成比赛，语义转折。' },
          { md: '用 However，放句首后加逗号。' },
          { md: '写成 However, we still finished the match. 两句之间用句号断开。' }
        ],
        takeaway: 'However 是副词，句首用要加逗号；but 是连词，连接两个分句。'
      },
      guided: [{ questionId: 'eng3-writing-2', hint: '先亮观点，再给理由，最后总结，这是最清晰的三段结构。' }],
      solo: ['eng3-writing-1', 'eng3-writing-3'],
      challenge: ['eng3-writing-4'],
      summary: {
        essence: '写作先结构后语言：书信按目的展开，议论文按观点—论据—结论展开。',
        formulas: ['I am writing to + 动词原形', 'I am looking forward to + doing', 'In my opinion... / In conclusion...'],
        pitfalls: ['look forward to 后接原形', 'However 后漏逗号', '要点覆盖不全', '时态和主谓不一致'],
        checklist: ['我会写信书开头和结尾', '我能搭议论文三段骨架', '我会准确使用连接词', '我写完会检查要点与时态']
      },
      feynman: '请用「先搭衣架再挂衣服」的比喻，讲清楚为什么作文要先定结构再选词句。'
    })
  );
})(window.ZSB = window.ZSB || {});
