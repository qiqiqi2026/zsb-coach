/* 英语扩展包：6 个考点 + 24 道题 + 6 份完整讲义 */
(function (Z) {
  Z.addKps([
    { id: 'eng-emphasis', subject: 'english', chapter: '特殊句式', title: '强调句', level: 3, examWeight: 0.03, prerequisites: ['eng-clause'], examCount: 4, examPoints: 14, outcome: '能用 It is/was ... that/who 强调主语、宾语和状语，并用还原法判断真假强调句', note: '强调地点和时间状语仍用 that，不用 where/when' },
    { id: 'eng-ellipsis', subject: 'english', chapter: '特殊句式', title: '省略与替代', level: 3, examWeight: 0.03, prerequisites: ['eng-clause'], examCount: 4, examPoints: 13, outcome: '能在上下文清楚时省略重复成分，正确使用 one / that / do / so / not 替代', note: '省略的前提是不产生歧义，删完要能还原' },
    { id: 'eng-absolute', subject: 'english', chapter: '特殊句式', title: '独立主格', level: 4, examWeight: 0.03, prerequisites: ['eng-nonfinite'], examCount: 3, examPoints: 12, outcome: '能识别自带逻辑主语的独立主格结构，并正确选择 doing / done / to do', note: '逻辑主语与主句主语不同，是判断独立主格的关键' },
    { id: 'eng-reading-infer', subject: 'english', chapter: '阅读与写作', title: '阅读推断与作者态度', level: 3, examWeight: 0.04, prerequisites: ['eng-reading'], examCount: 6, examPoints: 20, outcome: '能根据原文线索推断隐含意义，识别作者的态度与语气', note: '推断题答案必须有原文依据，不能凭常识' },
    { id: 'eng-translate-skill', subject: 'english', chapter: '阅读与写作', title: '汉译英得分技巧', level: 3, examWeight: 0.04, prerequisites: ['eng-translation'], examCount: 5, examPoints: 20, outcome: '能按主干—时态—句型—修饰四步完成汉译英，避免逐字硬翻', note: '先保证主谓宾和时态正确，再追求高级句型' },
    { id: 'eng-writing-essay', subject: 'english', chapter: '阅读与写作', title: '议论文写作', level: 3, examWeight: 0.03, prerequisites: ['eng-writing'], examCount: 4, examPoints: 25, outcome: '能写出观点明确、三段结构完整、连接词恰当的英语议论文', note: '主题句 + 支撑句 + 小结，是一段合格论述的最小结构' }
  ]);

  Z.QUESTIONS.push.apply(Z.QUESTIONS, Z.makeQs([
    /* ---------- eng-emphasis ---------- */
    { id: 'eng4-emph-1', kpIds: ['eng-emphasis'], subject: 'english', type: 'single',
      stem: 'It was in the library ______ I met her yesterday.',
      options: ['that', 'where', 'which', 'when'],
      answer: 'A',
      analysis: { ans: 'that', why: '这是强调句，被强调的是地点状语 in the library，连接词一律用 that，不能用 where。还原后是 I met her in the library yesterday。', steps: '1. 去掉 It was 和空格，剩下 In the library I met her yesterday。\n2. 调整语序为 I met her in the library yesterday，句子完整。\n3. 说明是强调句，地点状语后用 that。', pit: '不要看到地点就选 where；强调地点状语仍用 that。' } },
    { id: 'eng4-emph-2', kpIds: ['eng-emphasis'], subject: 'english', type: 'single',
      stem: '下列句子中，不属于强调句的是？',
      options: ['It was Tom who broke the window.', 'It is English that she teaches.', 'It was because he was ill that he stayed at home.', 'It is important that we should learn English.'],
      answer: 'D',
      analysis: { ans: 'D', why: 'D 中的 it 是形式主语，真正的主语是 that 引导的主语从句；去掉 It is 和 that 后剩下 Important we should learn English，不是完整句子。', steps: '1. 强调句的检验方法是去掉 It is/was 和 that/who。\n2. A、B、C 去掉后都能还原成完整句子。\n3. D 去掉后无法还原，所以不是强调句。', pit: '形式主语 it 句型和强调句外形相似，必须用还原法区分。' } },
    { id: 'eng4-emph-3', kpIds: ['eng-emphasis'], subject: 'english', type: 'fill',
      stem: 'It was not until 10 p.m. ______ he came back.',
      answer: 'that', accept: ['that'],
      analysis: { ans: 'that', why: '这是 not until 结构的强调句：It was not until + 时间 + that + 其余部分。', steps: '1. 原句是 He did not come back until 10 p.m.。\n2. 强调时间状语用 It was not until 10 p.m. that ...。\n3. 填 that，后面用正常语序 came。', pit: 'that 后面不倒装；只有 Not until 放在句首时才用 did he come back。' } },
    { id: 'eng4-emph-4', kpIds: ['eng-emphasis'], subject: 'english', type: 'fill',
      stem: 'It was not until midnight that he ______ (fall) asleep.',
      answer: 'fell', accept: ['fell'],
      analysis: { ans: 'fell', why: '强调句只改变语序，不改变原句时态；原句 He did not fall asleep until midnight 是一般过去时。', steps: '1. 还原：He did not fall asleep until midnight。\n2. 原句是过去发生的事，用一般过去时。\n3. fall 的过去式是 fell。', pit: '不要因为 that 后面像从句就用一般现在时；时态跟原句走。' } },

    /* ---------- eng-ellipsis ---------- */
    { id: 'eng4-ellip-1', kpIds: ['eng-ellipsis'], subject: 'english', type: 'single',
      stem: '— Would you like to go with us?\n— I\'d love to.\n答句中 to 后省略的内容是？',
      options: ['go with you', 'to go with you', 'love to go', 'like to go'],
      answer: 'A',
      analysis: { ans: 'go with you', why: 'I\'d love to 是 I would love to go with you 的省略形式，to 后省略了重复的动词原形，只保留 to。', steps: '1. 补全：I would love to go with you。\n2. 为避免重复，保留 to，省略 go with you。\n3. 所以 to 后省略的是 go with you。', pit: 'to 后省略的是动词原形，不是 doing；不能写成 I\'d love to going。' } },
    { id: 'eng4-ellip-2', kpIds: ['eng-ellipsis'], subject: 'english', type: 'single',
      stem: '下列句子中，使用替代（substitution）而不是省略的是？',
      options: ['He can swim, and so can I.', 'She opened the door and walked in.', 'The weather here is colder than that in Beijing.', 'When in doubt, ask your teacher.'],
      answer: 'C',
      analysis: { ans: 'C', why: 'C 中的 that 替代前文的 the weather，属于替代；其余三句都是省略了重复成分。', steps: '1. A 用 so + 倒装，省略了重复的 can swim。\n2. B 省略了并列分句的主语 she。\n3. D 省略了状语从句的主语和 be（When you are in doubt）。\n4. C 用 that 顶替 the weather，是替代。', pit: 'so can I 不是替代，它是倒装加省略。' } },
    { id: 'eng4-ellip-3', kpIds: ['eng-ellipsis'], subject: 'english', type: 'fill',
      stem: '— Do you think it will rain tomorrow?\n— I hope ______.',
      answer: 'not', accept: ['not'],
      analysis: { ans: 'not', why: 'I hope not 用 not 替代前面整个否定内容，意思是「我希望不会下雨」。', steps: '1. 完整说法是 I hope it will not rain tomorrow。\n2. 用 not 替代整个从句，避免重复。\n3. 填 not。', pit: '肯定回答用 I hope so，否定回答用 I hope not，不要写成 I hope no。' } },
    { id: 'eng4-ellip-4', kpIds: ['eng-ellipsis'], subject: 'english', type: 'fill',
      stem: 'If you don\'t go tomorrow, neither ______ I.',
      answer: 'will', accept: ['will'],
      analysis: { ans: 'will', why: 'neither 放在句首表示「我也不」，要用倒装：neither + 助动词 + 主语。前句是一般将来时，助动词用 will。', steps: '1. 前句 If you don\'t go tomorrow 是一般将来时。\n2. neither 开头要倒装，把助动词提到主语前。\n3. 填 will，构成 neither will I。', pit: '不要填 do；时态要与前句一致。' } },

    /* ---------- eng-absolute ---------- */
    { id: 'eng4-abs-1', kpIds: ['eng-absolute'], subject: 'english', type: 'single',
      stem: 'The meeting ______, we all went home.',
      options: ['over', 'was over', 'is over', 'has been over'],
      answer: 'A',
      analysis: { ans: 'over', why: '这是独立主格：名词 the meeting + 副词 over，表示「会议结束后」，整体作状语。', steps: '1. 逗号后 we all went home 是完整主句。\n2. 逗号前不能再用完整谓语 was over，否则两个句子只用逗号连接。\n3. 用 the meeting over 这一独立主格结构。', pit: '独立主格没有连词，不能写成 The meeting was over, we all went home。' } },
    { id: 'eng4-abs-2', kpIds: ['eng-absolute'], subject: 'english', type: 'single',
      stem: '下列哪一句含有独立主格结构？',
      options: ['Having finished his homework, he went out.', 'His homework finished, he went out.', 'He finished his homework and went out.', 'After he finished his homework, he went out.'],
      answer: 'B',
      analysis: { ans: 'B', why: 'B 中 his homework 是 finished 的逻辑主语，与主句主语 he 不同，属于独立主格；A 的逻辑主语就是 he，是分词作状语。', steps: '1. 独立主格的关键是「自带主语」。\n2. A 中 Having finished 的逻辑主语是 he，与主句一致。\n3. B 中 finished 的逻辑主语是 his homework，与 he 不同。\n4. C、D 都是完整分句，不是独立主格。', pit: '看到 finished 不要立刻判定独立主格，要先找它的逻辑主语。' } },
    { id: 'eng4-abs-3', kpIds: ['eng-absolute'], subject: 'english', type: 'fill',
      stem: 'Weather ______ (permit), we will go hiking tomorrow.',
      answer: 'permitting', accept: ['permitting'],
      analysis: { ans: 'permitting', why: 'weather 是 permit 的逻辑主语，二者是主动关系，且动作与主句同时，用现在分词 permitting。', steps: '1. 判断逻辑主语：permit 的动作发出者是 weather。\n2. weather 与 permit 是主动关系。\n3. 用现在分词 permitting，构成独立主格。', pit: '不要用 permitted；permitted 表示被动，逻辑关系就反了。' } },
    { id: 'eng4-abs-4', kpIds: ['eng-absolute'], subject: 'english', type: 'fill',
      stem: 'The work ______ (do), she felt relaxed.',
      answer: 'done', accept: ['done'],
      analysis: { ans: 'done', why: 'the work 是 do 的承受者，二者是被动关系，且动作已完成，用过去分词 done。', steps: '1. 逻辑主语是 the work。\n2. work 与 do 是被动关系。\n3. 用过去分词 done，完整形式可看作 the work being done。', pit: '不要用 doing；work 不会自己「做」。' } },

    /* ---------- eng-reading-infer ---------- */
    { id: 'eng4-infer-1', kpIds: ['eng-reading-infer'], subject: 'english', type: 'single',
      stem: '阅读下面句子，回答问题。\nMany people believe that online learning is cheaper. However, its real cost lies in the time students must manage on their own.\nWhat can be inferred about online learning?',
      options: ['It is always cheaper than traditional classes.', 'It requires students to be self-disciplined.', 'It costs nothing at all.', 'It is unsuitable for all students.'],
      answer: 'B',
      analysis: { ans: 'B', why: '原文说真实成本在于学生必须自己管理时间，可推出它需要自律；A、C 与 however 后的意思相反，D 过于绝对。', steps: '1. 定位 however 后的 real cost lies in the time students must manage on their own。\n2. 同义替换：manage time on their own 就是需要自我管理。\n3. 选 B，排除无依据或绝对化的选项。', pit: '推断题要基于转折后的信息，不能停在第一句的表面说法。' } },
    { id: 'eng4-infer-2', kpIds: ['eng-reading-infer'], subject: 'english', type: 'single',
      stem: 'The new policy sounds attractive on paper; in practice, however, it has done little to help the people it was meant to serve.\nWhat is the author\'s attitude toward the policy?',
      options: ['Supportive.', 'Indifferent.', 'Critical.', 'Excited.'],
      answer: 'C',
      analysis: { ans: 'Critical.', why: 'sounds attractive 是让步，however 后说它几乎没有帮到本该受益的人，这是明显的负面评价，所以态度是批评的。', steps: '1. 找到转折词 however。\n2. 看转折后的评价：done little to help 是负面。\n3. 对应态度词 critical。', pit: '不要被 sounds attractive 迷惑，转折后才是作者真正的态度。' } },
    { id: 'eng4-infer-3', kpIds: ['eng-reading-infer'], subject: 'english', type: 'fill',
      stem: '阅读下面句子，回答问题。\nMany people believe that online learning is cheaper. However, its real cost lies in the time students must manage on their own. Without self-discipline, a free course can become the most expensive one.\nThe author implies that without self-discipline, online learning may become ______.',
      answer: 'expensive', accept: ['expensive', 'the most expensive', 'the most expensive one'],
      analysis: { ans: 'expensive', why: '原文最后一句说，没有自律，免费课程也可能变成最贵的课程，隐含意思是它会变得昂贵。', steps: '1. 定位 Without self-discipline, a free course can become the most expensive one。\n2. 把 most expensive one 概括为 expensive。\n3. 补全为 may become expensive。', pit: '不要填 cheap；原文的 most expensive 已经给出明确线索。' } },
    { id: 'eng4-infer-4', kpIds: ['eng-reading-infer'], subject: 'english', type: 'fill',
      stem: 'While the app is convenient, it often collects data without asking users.\nThe author\'s attitude toward the app can be described as ______ (critical / supportive).',
      answer: 'critical', accept: ['critical', 'negative'],
      analysis: { ans: 'critical', why: 'while 引导让步，重点在主句：它经常未经询问就收集数据，这是负面评价。', steps: '1. 识别 While 让步从句，convenient 不是重点。\n2. 主句 collects data without asking users 是批评依据。\n3. 态度是 critical。', pit: '不要把让步内容当成作者立场；主句才是重点。' } },

    /* ---------- eng-translate-skill ---------- */
    { id: 'eng4-tskill-1', kpIds: ['eng-translate-skill'], subject: 'english', type: 'single',
      stem: '“他每天早上六点起床”的最佳英译是？',
      options: ['He get up at six every morning.', 'He gets up at six every morning.', 'He is get up at six every morning.', 'He getting up at six every morning.'],
      answer: 'B',
      analysis: { ans: 'B', why: '主语 he 是第三人称单数，一般现在时动词要加 s；every morning 提示这是习惯性动作。', steps: '1. 找主干：他 + 起床。\n2. 定时态：every morning 用一般现在时。\n3. 主谓一致：he 后 get 变 gets。\n4. 加时间状语 at six every morning。', pit: '单三漏 s 是翻译题最常见的失分点。' } },
    { id: 'eng4-tskill-2', kpIds: ['eng-translate-skill'], subject: 'english', type: 'single',
      stem: '“这个问题太难了，我解决不了”的最佳英译是？',
      options: ['The problem is too difficult for me to solve.', 'The problem is so difficult that I can solve it.', 'The problem is too difficult that I cannot solve it.', 'The problem is enough difficult for me to solve.'],
      answer: 'A',
      analysis: { ans: 'A', why: 'too...to 表示「太……而不能……」，本身已含否定；so...that 才接结果从句。', steps: '1. 主干：这个问题很难。\n2. 逻辑：太难导致我解决不了。\n3. 用 too + difficult + for me + to solve。\n4. too...to 后不能再加 not。', pit: 'so...that 的 that 后必须接完整句子，不能接 to solve。' } },
    { id: 'eng4-tskill-3', kpIds: ['eng-translate-skill'], subject: 'english', type: 'fill',
      stem: '“我花了两个小时完成作业。”\nIt took me two hours ______ (finish) my homework.',
      answer: 'to finish', accept: ['to finish'],
      analysis: { ans: 'to finish', why: '固定句型 It takes sb + 时间 + to do sth，表示「某人花多少时间做某事」。', steps: '1. 识别句型 It took me two hours ...。\n2. It takes sb time to do 是固定搭配。\n3. 填 to finish。', pit: '不要填 finishing 或 finish；该句型后固定用不定式。' } },
    { id: 'eng4-tskill-4', kpIds: ['eng-translate-skill'], subject: 'english', type: 'fill',
      stem: '“你越练习，英语就会越好。”\nThe more you practice, the ______ (good) your English will be.',
      answer: 'better', accept: ['better'],
      analysis: { ans: 'better', why: 'the + 比较级, the + 比较级 表示「越……越……」，good 的比较级是 better。', steps: '1. 识别 the more..., the ... 结构。\n2. 前后都要用比较级。\n3. good 的比较级是 better。', pit: '不要填 good 或 best；这个句型两边都必须是比较级。' } },

    /* ---------- eng-writing-essay ---------- */
    { id: 'eng4-essay-1', kpIds: ['eng-writing-essay'], subject: 'english', type: 'single',
      stem: '下列哪一句最适合作为议论文的观点句（thesis statement）？',
      options: ['I will talk about online learning.', 'Online learning should be encouraged because it makes education more flexible.', 'Online learning is good and bad.', 'Many students use computers every day.'],
      answer: 'B',
      analysis: { ans: 'B', why: '观点句要有明确立场和可论证的理由；B 用 should 表明立场，用 because 给出理由。', steps: '1. A 只是预告话题，没有立场。\n2. C 自相矛盾，无法展开论证。\n3. D 是背景事实，不是观点。\n4. B 立场明确且给出理由，最适合。', pit: '不要把话题介绍或背景事实当成观点句。' } },
    { id: 'eng4-essay-2', kpIds: ['eng-writing-essay'], subject: 'english', type: 'single',
      stem: '在议论文中，表示转折的连接词是？',
      options: ['Therefore', 'Moreover', 'However', 'For example'],
      answer: 'C',
      analysis: { ans: 'However', why: 'However 表示转折；Therefore 表因果，Moreover 表递进，For example 表举例。', steps: '1. 判断四个词的功能。\n2. Therefore = 因此，因果。\n3. Moreover = 而且，递进。\n4. However = 然而，转折。', pit: '不要把 therefore 当转折；它连接的是结果。' } },
    { id: 'eng4-essay-3', kpIds: ['eng-writing-essay'], subject: 'english', type: 'fill',
      stem: '英语议论文常用三段式：introduction, body, ______.',
      answer: 'conclusion', accept: ['conclusion'],
      analysis: { ans: 'conclusion', why: '议论文三段式是引言（introduction）、主体（body）、结论（conclusion）。', steps: '1. 引言提出话题和观点。\n2. 主体给出理由和例子。\n3. 结论重申观点并给建议。', pit: '不要拼成 conclution；conclusion 中间是 s。' } },
    { id: 'eng4-essay-4', kpIds: ['eng-writing-essay'], subject: 'english', type: 'fill',
      stem: '______ (take) everything into consideration, we can conclude that online learning is valuable.',
      answer: 'Taking', accept: ['Taking', 'taking'],
      analysis: { ans: 'Taking', why: 'we 与 take 是主动关系，用现在分词作状语；句首首字母要大写。', steps: '1. 找逻辑主语：we。\n2. we 主动 take everything into consideration。\n3. 用现在分词 Taking 作状语。', pit: '不要用 Taken；Taken 表示被动，逻辑关系不成立。' } }
  ]));

  /* ======================= 讲义 ======================= */
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'xeng-emph-L3', kpIds: ['eng-emphasis'], subject: 'english', level: 3,
      title: '强调句：给句子加一个取景框',
      estMinutes: 45,
      hookTitle: '为什么强调句去掉 It is 和 that 还能还原？',
      hookBody: '因为强调句只是加了一个「取景框」：It is / It was ... that 把想突出的成分框起来，句子原本的主谓宾并没有改变。把框拆掉，剩下的仍然是一个完整句子。',
      idea: '强调句的基本结构是 **It is/was + 被强调部分 + that/who + 其余部分**。它能强调主语、宾语和状语，但不能直接强调谓语。判断方法只有一个：去掉 It is/was 和 that/who，看剩下的词能不能还原成完整句子。',
      diagramId: 'inversion-box', diagramCaption: '把要强调的成分放进框里，句子骨架不变',
      analogy: { title: '相框与照片', md: '强调句像一个相框：同一张照片（原句）不变，只是把某个部分放大装框。相框本身不提供新信息，拆掉后照片还在。谓语不能装进这个相框，想强调动词要改用 do/does/did。' },
      points: [
        { title: '一、基本结构', md: 'It is/was + 被强调部分 + that/who + 其余部分。例如 It was Tom that broke the window. 去掉 It was 和 that，剩下 Tom broke the window，完整成立，所以是强调句。' },
        { title: '二、强调主语', md: '被强调的是人时，连接词用 who 或 that 都可以；被强调的是物，一般用 that。It was the teacher who helped me. 强调的部分是 the teacher，不是 me。' },
        { title: '三、强调宾语和状语', md: '强调宾语、地点状语、时间状语、原因状语时，连接词一律用 that，不能用 which、where、when。It was this book that I bought. It was in the park that we met.' },
        { title: '四、地点时间别条件反射', md: '很多题故意在空格前放 in the park 或 at ten，用 where / when 做干扰项。判断标准不是前面的词性，而是还原后句子是否完整。We met in the park 成立，所以用 that。' },
        { title: '五、not until 的强调', md: 'It was not until 10 p.m. that he came back. 还原后是 He did not come back until 10 p.m.。注意 that 后面用正常语序，不要倒装；只有 Not until 放在句首时才倒装。' },
        { title: '六、疑问句形式', md: '一般疑问句把 is/was 提前：Was it Tom that broke the window? 特殊疑问句把疑问词提前：Who was it that broke the window? 连接词仍然用 that。' },
        { title: '七、与形式主语从句区分', md: 'It is important that we should learn English. 这里的 it 是形式主语，真正的主语是 that 从句。去掉 It is 和 that 后剩下 Important we should learn English，不成立，所以不是强调句。' },
        { title: '八、强调谓语用助动词', md: '强调句不能强调谓语动词。想强调动作，就在动词前加 do/does/did：I do like English. He did come yesterday. 这是另一种强调手段，不要套 It is ... that。' }
      ],
      table: {
        headers: ['情形', '结构', '例句'],
        rows: [
          ['强调主语（人）', 'It is/was + 人 + who/that + 其余', 'It was Tom who broke the window.'],
          ['强调主语（物）', 'It is/was + 物 + that + 其余', 'It is the weather that matters.'],
          ['强调宾语', 'It is/was + 宾语 + that + 其余', 'It was this book that I bought.'],
          ['强调地点状语', 'It is/was + 地点 + that + 其余', 'It was in the park that we met.'],
          ['强调时间状语', 'It is/was + 时间 + that + 其余', 'It was at ten that he left.'],
          ['强调 not until', 'It was not until + 时间 + that + 其余', 'It was not until ten that he left.'],
          ['强调谓语动词', 'do/does/did + 动词原形', 'I do like English.']
        ]
      },
      code: 'It was Tom who broke the window.\nIt was in the park that we met.\nIt was not until ten that he came back.\nWas it Tom that broke the window?\nI do like English.',
      warning: '强调地点状语时连接词只能用 that，不能用 where；强调时间用 that，不用 when。看到空格前是 in the park / at ten，不要条件反射选 where / when，先做还原检查。',
      tip: '还原法：去掉 It is/was 和后面的 that/who，若剩下的词能组成完整句子，就是强调句；若不能，多半是形式主语从句或定语从句。',
      quizIds: ['eng4-emph-1', 'eng4-emph-2', 'eng4-emph-3', 'eng4-emph-4'],
      example: {
        title: '用还原法判断强调句',
        steps: [
          { md: '原句：It was in the library that I met her.' },
          { md: '去掉 It was 和 that，剩下 In the library I met her.' },
          { md: '调成正常语序：I met her in the library，句子完整。' },
          { md: '所以这是强调句，连接词用 that，不是 where。' }
        ],
        takeaway: '先还原，再判断；地点状语不等于 where。'
      },
      example2: {
        title: 'not until 的强调与倒装区分',
        steps: [
          { md: '原句：He didn\'t come back until 10 p.m.' },
          { md: '强调时间状语：It was not until 10 p.m. that he came back.' },
          { md: 'that 后面用正常语序 came，不倒装。' },
          { md: '若句子以 Not until 开头，才倒装：Not until 10 p.m. did he come back.' }
        ],
        takeaway: 'It was not until ... that 后面正常语序；Not until 句首才倒装。'
      },
      guided: [{ questionId: 'eng4-emph-1', hint: '先去掉 It was 和空格，看看剩下的是不是完整句子。' }],
      solo: ['eng4-emph-3', 'eng4-emph-4'],
      challenge: ['eng4-emph-2'],
      summary: {
        essence: '强调句用 It is/was ... that/who 框住一个成分；去掉框能还原完整句子。',
        formulas: ['It is/was + 被强调部分 + that/who + 其余部分', 'It was not until ... that + 正常语序', 'do/does/did + 动词原形（强调谓语）'],
        pitfalls: ['强调地点或时间误用 where / when', 'not until 强调句 that 后倒装', '把形式主语 it 句型当强调句', '试图用强调句强调谓语动词'],
        checklist: ['我会用还原法判断强调句', '我知道强调人可用 who/that', '我记住地点时间状语仍用 that', '我能区分 not until 强调与倒装']
      },
      feynman: '请用「相框」的比喻，讲清楚强调句为什么去掉 It is 和 that 还能还原，并举一个地点状语的例子。'
    }),

    Z.makeLesson({
      id: 'xeng-ellip-L3', kpIds: ['eng-ellipsis'], subject: 'english', level: 3,
      title: '省略与替代：不重复，也不丢信息',
      estMinutes: 45,
      hookTitle: '为什么 I\'d love to 是一个完整回答？',
      hookBody: '因为 to 后面省略了上文已经出现的 go with you。英语不喜欢把同样的词说两遍，只要上下文清楚，就可以把重复部分删掉或用一个短词顶替。',
      idea: '**省略**是在上下文清楚时删去重复成分；**替代**是用 one / ones / that / those / do / so / not 等词顶替前文内容。两者共同的底线是：删完或换完，句子仍然语法正确、意思唯一。',
      diagramId: 'sentence-tree', diagramCaption: '先找到重复成分，再决定省略还是替代',
      analogy: { title: '接力赛的交接棒', md: '省略像把已经跑过的棒次直接跳过：观众知道前面发生了什么，不必重跑一遍。替代像把棒子交给下一位：用一个短词接住前文的信息。交接必须稳，否则读者接不上。' },
      points: [
        { title: '一、省略的前提', md: '省略不是随意删词，而是删掉上下文已经明确、重复出现的成分。删完后句子仍要成立，意思不能变。考试里常考的是并列句、状语从句、不定式和比较结构中的省略。' },
        { title: '二、并列句中的省略', md: '并列分句里相同的主语、助动词或宾语可以省略。She opened the door and walked in. 后一分句省略了主语 she。He can swim and so can I. 则用倒装加省略。' },
        { title: '三、状语从句的省略', md: 'when / while / if / unless / though 从句中，主语与主句主语一致且含 be 时，可同时省略主语和 be。When in doubt, ask your teacher. = When you are in doubt. While reading, he fell asleep. = While he was reading.' },
        { title: '四、不定式后的省略', md: '为了避免重复，保留 to，省略后面的动词原形。I asked him to stay, but he didn\'t want to. — Would you like to go with us? — I\'d love to. 注意保留的是 to，不是 doing。' },
        { title: '五、比较结构中的省略', md: 'than / as 后面常省略与前面重复的成分。She runs faster than I. = than I run. The weather here is colder than that in Beijing. 这里的 that 替代 the weather。' },
        { title: '六、one / ones 替代可数名词', md: 'one 替代前面提到的单数可数名词，ones 替代复数。I lost my pen; I need to buy a new one. These books are old; I want new ones. 只替代可数名词，不能替代不可数名词。' },
        { title: '七、that / those 替代', md: 'that 替代前文不可数名词或单数可数名词，those 替代复数。The population of China is larger than that of Japan. The rules here are stricter than those in that school.' },
        { title: '八、do / so / not 替代', md: 'do / does / did 替代动词短语：He asked me to leave and I did. so / not 替代整个从句：— Will it rain? — I hope not. — She is nice. — I think so.' }
      ],
      table: {
        headers: ['情形', '结构', '例句'],
        rows: [
          ['并列句重复主语', '省略后一分句主语', 'She sang and danced.'],
          ['状语从句主语 + be', '可同时省略', 'When in doubt, ask.'],
          ['不定式重复动词', '保留 to，省略动词', 'I\'d love to.'],
          ['比较结构', '省略重复部分', 'She runs faster than I.'],
          ['可数名词重复', 'one / ones', 'I need a new one.'],
          ['不可数或单数名词重复', 'that', 'The weather here is colder than that in Beijing.'],
          ['动词短语重复', 'do / does / did', 'He asked me to leave and I did.'],
          ['从句内容重复', 'so / not', 'I hope not.']
        ]
      },
      code: 'She opened the door and walked in.\nWhen in doubt, ask your teacher.\n— Would you like to go with us?\n— I\'d love to.\nThe weather here is colder than that in Beijing.\nHe asked me to leave and I did.',
      warning: '状语从句省略主语和 be 的前提是主语与主句主语一致。While I was reading, he slept. 不能省成 While reading, he slept，因为那样 reading 的逻辑主语就变成了 he。',
      tip: '看到 I\'d love to / I hope not / than that of，先还原被省略或被替代的内容，再判断选项，正确率会高很多。',
      quizIds: ['eng4-ellip-1', 'eng4-ellip-2', 'eng4-ellip-3', 'eng4-ellip-4'],
      example: {
        title: '还原状语从句的省略',
        steps: [
          { md: '原句：When in doubt, ask your teacher.' },
          { md: '补全：When you are in doubt, ask your teacher.' },
          { md: 'you 与祈使句隐含的主语一致，且从句含 be，所以可省略 you are。' },
          { md: '还原后句意不变，说明省略成立。' }
        ],
        takeaway: '省略主语和 be 的前提是主语一致。'
      },
      example2: {
        title: '还原不定式后的省略',
        steps: [
          { md: '— Would you like to go with us?' },
          { md: '— I\'d love to.' },
          { md: 'to 后省略了 go with you，只保留 to 避免重复。' },
          { md: '不能补成 I\'d love to going；to 后仍是动词原形。' }
        ],
        takeaway: '保留 to，省略动词原形，是英语回答的固定习惯。'
      },
      guided: [{ questionId: 'eng4-ellip-1', hint: '把 I\'d love to 补全成完整句子，看看 to 后面缺了什么。' }],
      solo: ['eng4-ellip-3', 'eng4-ellip-4'],
      challenge: ['eng4-ellip-2'],
      summary: {
        essence: '省略删重复，替代用短词顶替；两者都要保证还原后语法正确、意思不变。',
        formulas: ['When / While / If + (主语 + be) 可省略', '保留 to，省略重复动词', 'one / ones / that / those / do / so / not 替代'],
        pitfalls: ['状语从句主语不一致时乱省略', 'I\'d love to going', '用 one 替代不可数名词', 'so can I 误认为替代'],
        checklist: ['我能还原状语从句的省略', '我会保留 to 省略动词', '我分得清 one 与 that 的替代', '我会用 so / not 回答']
      },
      feynman: '请解释 I\'d love to 省略了什么，并说明为什么不能写成 I\'d love to going。'
    }),

    Z.makeLesson({
      id: 'xeng-abs-L4', kpIds: ['eng-absolute'], subject: 'english', level: 4,
      title: '独立主格：自带主语的状语',
      estMinutes: 45,
      hookTitle: '为什么 The work done, she went home 不能写成 Done, she went home？',
      hookBody: '因为 done 的逻辑主语是 the work，不是 she。独立主格的特点就是「自带主语」，这个主语和主句主语不是同一个人。去掉 the work，done 就会误挂到 she 身上，意思完全变了。',
      idea: '独立主格的结构是 **名词/代词 + 分词 / 形容词 / 副词 / 介词短语**，整体作状语。它自带逻辑主语，且这个逻辑主语与主句主语不同。常见形式有 n + doing（主动、进行）、n + done（被动、完成）、n + to do（将来）、n + adj/adv/prep（状态）。',
      diagramId: 'nonfinite-map', diagramCaption: '先看逻辑主语，再选 doing / done / to do',
      analogy: { title: '两个剧组同台演出', md: '主句是一个剧组，独立主格是另一个剧组，各自有自己的主角。两个剧组可以同台，但不能把对方的演员认成自己的。分词作状语时，分词和主句共用一个主角；独立主格则自带主角。' },
      points: [
        { title: '一、判断第一步：找逻辑主语', md: '看到逗号前的「名词 + 分词/形容词/副词/介词短语」，先问这个名词是不是后面动作的发出者或承受者，再看它和主句主语是否不同。两个条件都成立，才是独立主格。' },
        { title: '二、n + doing', md: '逻辑主语主动做动作，或动作正在进行，用现在分词。Weather permitting, we will go out. The meeting being over, we all left. permitting 的主语是 weather，不是 we。' },
        { title: '三、n + done', md: '逻辑主语承受动作，或动作已经完成，用过去分词。The work done, she went home. His homework finished, he watched TV. work 和 homework 都是被完成的对象。' },
        { title: '四、n + to do', md: '表示将来或待办，用不定式。So much work to do, I can\'t go out. 这种形式出现频率低于 doing / done，但阅读中会遇到，看到 to do 先想「还没做」。' },
        { title: '五、n + 形容词 / 副词 / 介词短语', md: '这类结构描述状态或伴随情况。The meeting over, we all went home. He sat there, book in hand. She walked in, eyes full of tears. 它们前面同样自带一个名词。' },
        { title: '六、with 复合结构', md: 'with + 名词 + doing / done / 形容词 / 介词短语，是独立主格最常见的变体。With the lights off, we couldn\'t see anything. With so much work to do, I stayed up late. 介词 with 让结构更清楚。' },
        { title: '七、与分词作状语的区别', md: '分词作状语时，分词的逻辑主语就是主句主语。Seeing the teacher, the boy ran away. 中 seeing 的主语是 the boy。独立主格自带主语：The teacher coming, the boy ran away. 中 coming 的主语是 the teacher。' },
        { title: '八、being 常可省略', md: 'n + being + done/形容词/介词短语 中，being 经常省略。The work (being) done, she left. The meeting (being) over, we left. 但 being 后面接 doing 时一般保留，避免结构混乱。' }
      ],
      table: {
        headers: ['情形', '结构', '例句'],
        rows: [
          ['主动或进行', '名词 + doing', 'Weather permitting, we will go.'],
          ['被动或完成', '名词 + done', 'The work done, she left.'],
          ['将来或待办', '名词 + to do', 'So much work to do, I can\'t go.'],
          ['状态描述', '名词 + 形容词 / 副词', 'The meeting over, we left.'],
          ['伴随细节', '名词 + 介词短语', 'He sat there, book in hand.'],
          ['with 复合结构', 'with + 名词 + doing / done / adj', 'With the lights off, we couldn\'t see.'],
          ['与分词状语区别', '逻辑主语一致 vs 自带主语', 'Seeing the teacher, he ran away.']
        ]
      },
      code: 'Weather permitting, we will go hiking.\nThe work done, she felt relaxed.\nThe meeting over, we all went home.\nWith the lights off, we could not see anything.\nSo much work to do, I cannot go out.',
      warning: '独立主格不是完整分句，不能和主句用逗号直接连接成两个句子。The work was done, she went home. 是逗号粘连错误，应改成 The work done, she went home. 或 After the work was done, she went home.',
      tip: '判断口诀：逗号前有名词，名词后是分词或形容词，再看这个名词是不是主句主语。不是，就是独立主格。',
      quizIds: ['eng4-abs-1', 'eng4-abs-2', 'eng4-abs-3', 'eng4-abs-4'],
      example: {
        title: 'Weather permitting 的主语是谁',
        steps: [
          { md: '原句：Weather permitting, we will go hiking tomorrow.' },
          { md: 'permitting 的逻辑主语是 weather，不是 we。' },
          { md: 'weather 与主句主语 we 不同，所以是独立主格。' },
          { md: '若写成 Permitting the weather, we...，permitting 的主语就变成 we，逻辑错误。' }
        ],
        takeaway: '先找分词的逻辑主语，再和主句主语比较。'
      },
      example2: {
        title: 'The work done 能不能改成 Done',
        steps: [
          { md: '原句：The work done, she felt relaxed.' },
          { md: 'done 的逻辑主语是 the work，work 承受 do 的动作。' },
          { md: '完整形式可看作 The work being done，being 省略。' },
          { md: '不能改成 Done, she felt relaxed，因为那样 she 就成了被完成的对象。' }
        ],
        takeaway: '逻辑主语不同，名词不能丢。'
      },
      guided: [{ questionId: 'eng4-abs-1', hint: '逗号后已经是完整句，逗号前不能再出现完整谓语。' }],
      solo: ['eng4-abs-3', 'eng4-abs-4'],
      challenge: ['eng4-abs-2'],
      summary: {
        essence: '独立主格 = 自带逻辑主语 + 非谓语或状态词，整体作状语；逻辑主语与主句主语不同。',
        formulas: ['名词 + doing（主动 / 进行）', '名词 + done（被动 / 完成）', 'with + 名词 + doing / done / adj / prep'],
        pitfalls: ['把独立主格写成两个完整句子', '逻辑主语被动却用 doing', '去掉名词导致逻辑主语错位', '把分词状语误判为独立主格'],
        checklist: ['我能找到分词的逻辑主语', '我能区分 doing 与 done', '我会用 with 复合结构', '我知道独立主格不能逗号粘连']
      },
      feynman: '请用「两个剧组同台」的比喻，解释独立主格和分词作状语的区别，并各举一个例句。'
    }),

    Z.makeLesson({
      id: 'xeng-infer-L3', kpIds: ['eng-reading-infer'], subject: 'english', level: 3,
      title: '阅读推断与作者态度：答案藏在字缝里',
      estMinutes: 45,
      hookTitle: '为什么推断题总有两个选项看起来都对？',
      hookBody: '因为一个符合生活常识，另一个有原文依据。命题人考的不是你的经验，而是你能不能在原文里找到线索，再往前走一小步。',
      idea: '推断题的本质是「原文线索 + 一步推理」，不是自由发挥。先圈题干关键词回文定位，再找同义替换，最后用排除法去掉绝对化、偷换概念、无中生有的选项。作者态度则要看评价性形容词、转折词和语气。',
      diagramId: 'reading-scan', diagramCaption: '先题干定位，再比对同义替换',
      analogy: { title: '侦探破案', md: '侦探只能根据现场线索推断，不能因为「一般来说」就定罪。推断题也一样：原文是现场，选项是嫌疑犯，只有能被线索直接支持的才能留下。' },
      points: [
        { title: '一、先题干后原文', md: '先圈出题干里的人名、时间、专有名词或态度词，再回原文找同一意思的表达。不要从头逐句读，阅读时间要花在定位上，而不是平均用力。' },
        { title: '二、推断只走一步', md: '正确答案通常是把原文换个说法，或由原文直接推出。需要脑补三四个前提才成立的选项，往往不是命题人要的答案。' },
        { title: '三、排除绝对化', md: 'all / always / never / only / must 这类词要警惕。原文说 many 或 often，选项说 all 或 always，强度被放大，直接排除。' },
        { title: '四、作者态度看评价词', md: '态度词分三类：positive（supportive, favorable）、negative（critical, doubtful）、neutral（objective, informative）。形容词和副词比名词更能暴露态度。' },
        { title: '五、转折之后是重点', md: 'but / however / yet / in fact 后面常是作者真正想说的内容。前面说得再漂亮，转折后才是立场，态度题尤其如此。' },
        { title: '六、让步从句是烟雾弹', md: 'Although / While 引出的内容不是重点，主句才是。Although the plan sounds good, it costs too much. 重点是成本太高，不是听起来不错。' },
        { title: '七、例证题问的是目的', md: '问「为什么提这个例子」时，答案在例子前后的观点句，不在例子细节本身。例子只是证据，观点才是论点。' },
        { title: '八、不要选原文原句', md: '细节题可能直接照抄原文，推断题的正确项一般经过改写。照抄原句的选项常偷换主体或答非所问，要回到题干核对。' }
      ],
      table: {
        headers: ['情形', '结构', '例句'],
        rows: [
          ['推断题', '原文同义改写 + 一步推理', 'The real cost is time → it requires self-discipline.'],
          ['态度题', '评价性形容词或副词', 'sounds attractive ... however, little help → critical'],
          ['转折', 'but / however 后是重点', 'It looks cheap, but it costs time.'],
          ['让步', 'Although 从句非重点', 'Although it is cheap, it wastes time.'],
          ['例证目的', '例子前的观点句', 'For example, ... 支撑前一句'],
          ['绝对化选项', 'all / only / never 慎选', '原文说 many，选项说 all → 排除'],
          ['中立态度', '陈述事实，无褒贬', 'The passage reports both sides.']
        ]
      },
      code: 'Many people believe that online learning is cheaper.\nHowever, its real cost lies in the time students must manage on their own.\nWithout self-discipline, a free course can become the most expensive one.',
      warning: '推断题的正确选项一定有原文依据。即使某个选项符合你的生活经验，只要原文没有线索，也不能选。',
      tip: '先划掉含 all / always / only 的绝对化选项，再在剩下的选项里找「原文同义改写」，正确率会明显提高。',
      quizIds: ['eng4-infer-1', 'eng4-infer-2', 'eng4-infer-3', 'eng4-infer-4'],
      example: {
        title: '从一句原文推一步',
        steps: [
          { md: '原文：Its real cost lies in the time students must manage on their own.' },
          { md: '题干：What can be inferred about online learning?' },
          { md: '同义替换：manage time on their own 就是需要自我管理。' },
          { md: '选「它要求学生自律」，排除「完全免费」「一定比线下好」等无依据选项。' }
        ],
        takeaway: '推断题的正确项，一定能在原文找到对应句。'
      },
      example2: {
        title: '转折后的态度',
        steps: [
          { md: '原文：The policy sounds attractive on paper; in practice, however, it has done little to help the people it was meant to serve.' },
          { md: 'sounds attractive 是让步，however 后才是重点。' },
          { md: 'done little to help 是负面评价。' },
          { md: '所以态度是 critical，不是 supportive 或 excited。' }
        ],
        takeaway: '态度题先找转折词，再看转折后的评价。'
      },
      guided: [{ questionId: 'eng4-infer-1', hint: '注意 however 后面才是作者真正想说的内容。' }],
      solo: ['eng4-infer-3', 'eng4-infer-4'],
      challenge: ['eng4-infer-2'],
      summary: {
        essence: '推断 = 原文线索 + 一步推理；态度看评价词和转折后的内容。',
        formulas: ['题干关键词 → 回文定位 → 同义替换', 'but / however 后是重点', 'positive / negative / neutral 三类态度'],
        pitfalls: ['凭常识而不是原文选答案', '被让步从句带偏', '忽略绝对化词', '把例子细节当观点'],
        checklist: ['我会先题干后原文', '我能识别同义替换', '我会排除绝对化选项', '我能判断作者态度']
      },
      feynman: '请用侦探破案的比喻，说明推断题为什么不能凭常识，并举一个 however 转折后态度变化的例子。'
    }),

    Z.makeLesson({
      id: 'xeng-tskill-L3', kpIds: ['eng-translate-skill'], subject: 'english', level: 3,
      title: '汉译英得分技巧：先保正确，再求漂亮',
      estMinutes: 45,
      hookTitle: '为什么背了很多句型，翻译还是拿不到分？',
      hookBody: '因为阅卷先看主干和时态，句型只是加分项。主谓宾错了、时态错了，再高级的句型也救不回来。翻译题的分数是按意群给的，先把每一块译对。',
      idea: '汉译英四步：① 找主干（谁 + 做什么 + 什么）② 定时态和语态 ③ 选一个稳妥句型 ④ 补定语、状语。最后检查主谓一致、冠词、单复数和拼写。原则是**先保证正确，再追求高级**。',
      diagramId: 'translation-chunk', diagramCaption: '切块 → 定主干 → 重排',
      analogy: { title: '盖房子', md: '先立柱（主谓宾），再砌墙（修饰成分），最后刷漆（高级表达）。柱子歪了，漆刷得再亮也没用。翻译也是先让句子站住，再让它好看。' },
      points: [
        { title: '一、先找主干', md: '中文常把时间、地点放前面，英语先写「谁做什么」。他每天早上六点起床 → He gets up at six every morning. 先定 He gets up，再把时间状语放到后面。' },
        { title: '二、定时态', md: '看中文的时间词和语境。每天早上用一般现在时，昨天用一般过去时，已经完成用现在完成时，计划好的将来用 be going to。时态错，整句意思都会偏。' },
        { title: '三、中文无主语时补主语', md: '英语句子通常要有主语。要由上下文补 we / you / people / it。据说 it is said that；有人认为 people believe that；应该 We should...。不要写出没有主语的英文句子。' },
        { title: '四、修饰语后置', md: '中文的「的」字结构常译成介词短语、不定式或定语从句，放在名词后面。一个住在北京的女孩 → a girl who lives in Beijing. 不要逐字写成 a lives in Beijing girl。' },
        { title: '五、常用得分句型', md: 'too...to（太……不能……）、so...that（如此……以至于）、not only...but also（不仅……而且）、it takes sb time to do（花时间做）、the more...the more（越……越……）。每种句型先练熟一个正确例子。' },
        { title: '六、不要逐字硬翻', md: '中文成语、俗语要译意思，不要逐字对应。人山人海 → a sea of people，不是 people mountain people sea。遇到不会的词，用简单词把意思说清楚，比空着或硬造词好。' },
        { title: '七、被动与主动', md: '中文的「被」不一定译成被动，英语的被动常用于不知道动作执行者时。这个问题已经被解决了 → The problem has been solved. 注意被动结构是 be + 过去分词。' },
        { title: '八、最后三查', md: '查主谓一致、查时态一致、查名词单复数与冠词。每查一遍都能捞回一两分。写完后不要立刻交卷，至少留一分钟做这三项检查。' }
      ],
      table: {
        headers: ['情形', '结构', '例句'],
        rows: [
          ['太……不能……', 'too + adj + to do', 'The problem is too hard for me to solve.'],
          ['如此……以至于', 'so + adj + that', 'He was so tired that he fell asleep.'],
          ['不仅……而且', 'not only ... but also', 'He speaks not only English but also French.'],
          ['花时间做……', 'It takes sb + time + to do', 'It took me two hours to finish it.'],
          ['越……越……', 'the + 比较级, the + 比较级', 'The more you practice, the better you will be.'],
          ['据说', 'It is said that ...', 'It is said that the school is moving.'],
          ['已经完成（被动）', 'have/has been done', 'The problem has been solved.']
        ]
      },
      code: '他每天早上六点起床。\nHe gets up at six every morning.\n\n这个问题太难了，我解决不了。\nThe problem is too difficult for me to solve.\n\n我花了两个小时完成作业。\nIt took me two hours to finish my homework.',
      warning: '不要为了用高级句型而改变原意或写错结构。too...to 本身含否定，不能再加 not；so...that 的 that 后接完整结果句，不能接不定式。',
      tip: '动笔前先在草稿上写「主语 + 谓语 + 宾语」，再往两边挂时间、地点、定语。主干对了，至少能拿到一半分。',
      quizIds: ['eng4-tskill-1', 'eng4-tskill-2', 'eng4-tskill-3', 'eng4-tskill-4'],
      example: {
        title: '把「太难了」译成 too...to',
        steps: [
          { md: '主干：这个问题 + 是 + 太难。' },
          { md: '逻辑：太难导致我解决不了，用 too + adj + for sb + to do。' },
          { md: '组合：The problem is too difficult for me to solve.' },
          { md: '检查：主语单数用 is，too...to 后不再加 not。' }
        ],
        takeaway: 'too...to 自带否定，不要再画蛇添足。'
      },
      example2: {
        title: '把「花时间」译成 it takes',
        steps: [
          { md: '主干：做某事 + 花 + 我 + 两小时。' },
          { md: '句型：It takes sb + time + to do sth。' },
          { md: '时态：已经完成，用 took。' },
          { md: '组合：It took me two hours to finish my homework.' }
        ],
        takeaway: '固定句型先背结构，再代入时间和人。'
      },
      guided: [{ questionId: 'eng4-tskill-1', hint: '先找主语和谓语，再检查第三人称单数。' }],
      solo: ['eng4-tskill-3', 'eng4-tskill-4'],
      challenge: ['eng4-tskill-2'],
      summary: {
        essence: '翻译四步：找主干、定时态、选句型、补修饰；先正确，再漂亮。',
        formulas: ['too + adj + to do', 'so + adj + that + 完整句', 'It takes sb + time + to do', 'the + 比较级, the + 比较级'],
        pitfalls: ['逐字硬翻中文语序', '单三漏 s、时态混乱', 'too...to 后又加 not', '中文无主语直接写英文'],
        checklist: ['我能先找出主谓宾', '我能根据时间词定时态', '我会用五个常用句型', '我写完会查主谓一致和拼写']
      },
      feynman: '请用盖房子的比喻，讲清楚汉译英为什么先搭主干，再补修饰，并举一个 too...to 的例子。'
    }),

    Z.makeLesson({
      id: 'xeng-essay-L3', kpIds: ['eng-writing-essay'], subject: 'english', level: 3,
      title: '议论文写作：三段式搭骨架',
      estMinutes: 45,
      hookTitle: '为什么背了模板还是写不满？',
      hookBody: '因为模板只给骨架，论点需要理由和例子来填。没有具体内容，三段式就只是三个空壳；有了主题句和例证，每一段才站得住。',
      idea: '一篇合格的英语议论文 = **引言**（背景 + 明确观点）+ **主体**（两个理由，每个理由配例证）+ **结论**（重申观点 + 建议）。每段按「主题句 → 支撑句 → 小结」展开，连接词负责把逻辑摆在明面上。',
      diagramId: 'sentence-tree', diagramCaption: '主题句是树干，支撑句是枝叶',
      analogy: { title: '汉堡结构', md: '上下两片面包是引言和结论，中间夹的肉和菜是理由与例子。只给面包没有馅，读者吃不饱；只有例子没有观点，读者也不知道你想说什么。' },
      points: [
        { title: '一、引言三件事', md: '背景一句、争议一句、观点一句。背景不要写太长，观点要具体可辩论。不要写 I will talk about... 这种空话，它只预告话题，没有立场。' },
        { title: '二、观点句要可辩', md: 'Online learning should be encouraged because it makes education more flexible. 有立场、有理由，比 Online learning is good 更好展开。观点句里最好出现 should / must / is necessary 这类态度词。' },
        { title: '三、主体段四句结构', md: '主题句 + 解释 + 例子 + 回扣。一段只讲一个理由，不要把所有理由挤在一起。主题句让读者知道这段要证明什么，回扣让读者知道这段证明了什么。' },
        { title: '四、用例子支撑', md: 'for example / for instance 引出具体场景，例子要短，能直接说明理由。不要举一个和观点无关的名人故事，例子越贴题越有说服力。' },
        { title: '五、连接词表逻辑', md: '递进 moreover / furthermore，转折 however / on the other hand，因果 therefore / as a result，举例 for example，总结 in conclusion。连接词不是装饰，是告诉读者句与句的关系。' },
        { title: '六、结论不添新观点', md: '结论只重申立场，给出建议或展望。In conclusion, online learning should be encouraged, but students must learn to manage their time. 不要在最后一段突然提出一个全新的理由。' },
        { title: '七、句式要有变化', md: '不要通篇主谓宾短句。适当用定语从句、状语从句、非谓语和强调句，但先保证正确。一个正确的简单句，胜过一个错误的复杂句。' },
        { title: '八、交卷前检查清单', md: '观点是否明确、每段是否有主题句、例子是否支撑观点、连接词是否恰当、主谓一致与拼写是否正确。五项都过一遍，再交卷。' }
      ],
      table: {
        headers: ['情形', '结构', '例句'],
        rows: [
          ['引言', '背景 + 争议 + 观点', 'Nowadays, ... I believe that ...'],
          ['主体段主题句', '一个理由', 'First, online learning saves time.'],
          ['举例', 'for example + 具体场景', 'For example, students can replay lessons.'],
          ['转折', 'however / on the other hand', 'However, it requires self-discipline.'],
          ['因果', 'therefore / as a result', 'Therefore, schools should guide students.'],
          ['结论', '重申 + 建议', 'In conclusion, ... should ...'],
          ['句式升级', '定语从句 / 非谓语 / 强调句', 'It is self-discipline that matters most.']
        ]
      },
      code: 'Nowadays, more and more students take online courses.\nI believe that online learning should be encouraged for two reasons.\nFirst, it makes education more flexible.\nFor example, students can replay a lesson whenever they need it.\nHowever, it also requires self-discipline.\nIn conclusion, online learning is valuable if students learn to manage their time.',
      warning: '不要背一整篇万能范文套所有题目。观点与例子必须回应题目，否则再漂亮的句式也会被判偏题。',
      tip: '动笔前花两分钟列提纲：观点一句、两个理由、每个理由一个例子。提纲清楚，写起来就不会反复涂改。',
      quizIds: ['eng4-essay-1', 'eng4-essay-2', 'eng4-essay-3', 'eng4-essay-4'],
      example: {
        title: '写一个可辩论的观点句',
        steps: [
          { md: '题目：Should students use smartphones in class?' },
          { md: '背景：Smartphones are common on campus.' },
          { md: '立场：I believe they should not be used in class.' },
          { md: '预告理由：... because they distract students and reduce face-to-face communication.' }
        ],
        takeaway: '观点句 = 立场 + because 理由，读者一眼知道你要论证什么。'
      },
      example2: {
        title: '写一个完整主体段',
        steps: [
          { md: '主题句：First, smartphones can easily distract students.' },
          { md: '解释：A single message can pull attention away for minutes.' },
          { md: '例子：For example, a student who checks WeChat may miss the teacher\'s explanation.' },
          { md: '回扣：As a result, learning efficiency drops.' }
        ],
        takeaway: '主题句—解释—例子—回扣，是主体段最稳的四句结构。'
      },
      guided: [{ questionId: 'eng4-essay-1', hint: '观点句要有明确立场，还要能看出理由。' }],
      solo: ['eng4-essay-3', 'eng4-essay-4'],
      challenge: ['eng4-essay-2'],
      summary: {
        essence: '议论文三段式：引言亮观点，主体给理由和例子，结论重申并建议。',
        formulas: ['引言：背景 + 观点', '主体：主题句 + 解释 + 例子 + 回扣', '结论：In conclusion, ... should ...'],
        pitfalls: ['观点句空泛或自相矛盾', '主体段没有主题句', '例子与观点无关', '结论突然提出新观点'],
        checklist: ['我能写出可辩论的观点句', '我的主体段有主题句和例子', '我会用连接词表逻辑', '我交卷前会检查拼写与主谓一致']
      },
      feynman: '请用汉堡结构解释议论文的三段式，并说明一个主体段为什么需要主题句和例子。'
    })
  );
})(window.ZSB = window.ZSB || {});
