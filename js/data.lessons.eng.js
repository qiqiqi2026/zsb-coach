/* 英语扩展讲义：每个考点一份，六阶段结构完整，含图解与详细例子 */
(function (Z) {
  Z.LESSONS.push(
    {
      id: 'eng-sentence-L1',
      kpIds: ['eng-sentence'],
      subject: 'english',
      level: 1,
      title: '句子骨架与五大句型',
      estMinutes: 35,
      prerequisites: ['eng-sentence'],
      unlockRule: {},
      hook: { title: '单词都认识，句子还是读不懂', body: '因为你把每个词都当成了重点。先找主干，句子会突然变短。' },
      sections: [
        { type: 'text', md: '读长句最怕从头逐词翻译。英语句子像一棵树：**主干只有一套主谓**，其余成分都是挂在主干上的枝叶。这一课先练「找谓语、找主语、找宾语」，再认识五大基本句型。' },
        { type: 'diagram', diagramId: 'sentence-tree', caption: '先看主干，再看修饰' },
        { type: 'text', md: '**第一步：找谓语**\n谓语说明主语「做什么」或「是什么」，通常由动词充当。一个分句只能有一个谓语；从句里的动词只算从句的谓语。' },
        { type: 'text', md: '**第二步：找主语和宾语**\n主语回答「谁/什么」，宾语回答「动作作用在谁/什么身上」。宾语通常在及物动词后面。' },
        { type: 'text', md: '**五大句型**\n主谓（He runs.）、主谓宾（He reads books.）、主系表（He is happy.）、主谓双宾（He gave me a book.）、主谓宾补（He made me happy.）。' },
        { type: 'text', md: '**修饰成分先括起来**\n定语修饰名词，状语修饰动作或整句。遇到介词短语、从句，先用括号括起来，主干就露出来了。' },
        { type: 'analogy', title: '句子像一棵树', md: '主干是树干，主谓宾决定句子站不站得住；定语、状语是枝叶，少了不致命，多了会挡视线。先看树干，再看枝叶。' },
        { type: 'compare', headers: '结构,例子,关键点', rows: '主谓,Birds fly.,后面没有宾语,主系表,The soup smells good.,系动词 + 表语，说明特征,主谓宾,She likes music.,动作有承受者,主谓双宾,He gave me a book.,人 + 物两个宾语,主谓宾补,We call him Tom.,Tom 补充说明 him' },
        { type: 'formula', latex: 'S + V + O', caption: '先找 S 和 V，再看有没有 O' },
        { type: 'warning', md: '不要看到动词就当成谓语。The girl **who sits** next to me **speaks** English. 中 sits 是定语从句的谓语，主句谓语是 speaks。' },
        { type: 'tip', md: '考试时先圈谓语，再问「谁在做」，最后看「做了什么」。三步就能拆掉大多数长句。' },
        { type: 'diagram', diagramId: 'wordclass-map', caption: '词性决定它在句子里的岗位' },
        { type: 'quiz', questionId: 'eng2-sentence-1', purpose: '找主句谓语' }
      ],
      workedExamples: [
        { title: '拆解长句', steps: [
           { no: 1, md: '原句：The girl who sits next to me speaks English very well.', askBefore: true },
           { no: 2, md: '找主句谓语：speaks（who sits 是从句谓语）。', askBefore: true },
           { no: 3, md: '找主语：The girl；who sits next to me 修饰她。', askBefore: true },
           { no: 4, md: '剩下的 English 是宾语，very well 是状语。' }
        ], takeaway: '先圈主句谓语，从句整体当修饰。' },
        { title: '判断句型', steps: [
           { no: 1, md: '原句：His mother bought him a new bike.', askBefore: true },
           { no: 2, md: '谓语 bought，主语 His mother。', askBefore: true },
           { no: 3, md: 'bought 后面有 him 和 a new bike 两个宾语。', askBefore: true },
           { no: 4, md: '所以是主谓双宾结构。' }
        ], takeaway: '两个名词性成分跟在动词后，优先考虑双宾。' }
      ],
      guidedPractice: [
        { questionId: 'eng2-sentence-3', hint: '先把 who sits next to me 括起来，剩下的才是主句。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['eng2-sentence-5', 'eng2-sentence-4'],
      challenge: ['eng2-sentence-2'],
      summary: {
        essence: '先找主句谓语，再找主语和宾语；其余成分先括起来。',
        formulas: ['主谓：S + V', '主系表：S + be + P', '主谓宾：S + V + O', '双宾：S + V + O1 + O2'],
        pitfalls: ['把从句谓语当主句谓语', '把介词短语里的名词当主语', '主系表误判为主谓宾', '双宾和宾补混淆'],
        checklist: ['我能圈出主句谓语', '我能说清五大句型', '我能把定语从句先括起来', '我能区分双宾和宾补']
      },
      feynmanPrompt: '请用一句话解释：为什么读长句要先找谓语？再举一个含定语从句的例子说明。'
    },
    {
      id: 'eng-perfect-L2',
      kpIds: ['eng-perfect'],
      subject: 'english',
      level: 2,
      title: '现在完成时：过去如何影响现在',
      estMinutes: 35,
      prerequisites: ['eng-perfect'],
      unlockRule: { fromLessonId: 'eng-present-L2', minQuizRate: 0.6 },
      hook: { title: '到底用 did 还是 have done？', body: '同样说「做过」，一个只讲过去，一个强调现在的结果。选错时态，意思就变了。' },
      sections: [
        { type: 'text', md: '现在完成时不是「过去发生」这么简单，它的重点是：**过去的动作和现在还有关系**。判断时先问自己：这句话想强调的是「过去那个时间」，还是「现在的结果/经历」？' },
        { type: 'diagram', diagramId: 'perfect-timeline', caption: '动作发生在过去，影响留到现在' },
        { type: 'text', md: '**结构：have/has + 过去分词**\n主语是 I/you/we/they 用 have；he/she/it 用 has。过去分词不等于过去式，需要单独记，如 go→gone，see→seen。' },
        { type: 'text', md: '**三大用法**\n① 已完成：I have finished my homework.（现在可以玩了）② 经历：I have been to Beijing.（我去过）③ 持续：I have lived here for five years.（现在还住）。' },
        { type: 'text', md: '**for 和 since**\nfor + 时间段（for three years），since + 时间点（since 2019）。它们都常与现在完成时连用，表示持续到现在。' },
        { type: 'text', md: '**和一般过去时划界**\nyesterday / last week / ago / in 2019 是明确过去时间，只能用一般过去时；already / yet / ever / never / just / since / for 常提示现在完成时。' },
        { type: 'analogy', title: '完成时像一条连到现在的线', md: '一般过去时是时间轴上的一个点：只讲那时发生了什么。现在完成时是一条从过去拉到现在的时间线：强调现在手里有什么结果、有什么经历。' },
        { type: 'compare', headers: '句子,时态,含义', rows: 'I did my homework yesterday.,一般过去时,昨天做了，和现在无关,I have done my homework.,现在完成时,做完了，现在可以交,I have been to Beijing.,现在完成时,去过，人已回来,I went to Beijing last year.,一般过去时,去年去的' },
        { type: 'formula', latex: 'have / has + done', caption: 'done = 过去分词，不是过去式' },
        { type: 'warning', md: '**have gone to** 表示「去了还没回来」，**have been to** 表示「去过已回来」。He has gone to Beijing. 他现在不在说话地。' },
        { type: 'tip', md: '看到 ago、yesterday、last… 先排除完成时；看到 since、for、already、yet 再考虑完成时。先看时间词，能省很多纠结。' },
        { type: 'diagram', diagramId: 'tense-timeline', caption: '先定位时间，再选形式' },
        { type: 'quiz', questionId: 'eng2-perfect-1', purpose: '完成时结构' }
      ],
      workedExamples: [
        { title: 'for + 时间段', steps: [
           { no: 1, md: '原句：I have lived here for five years.', askBefore: true },
           { no: 2, md: 'for five years 表示持续五年。', askBefore: true },
           { no: 3, md: 'live 是持续动作，用 have lived。', askBefore: true },
           { no: 4, md: '意思：我住在这里五年了，现在还住。' }
        ], takeaway: 'for + 时间段常常配合完成时，强调持续到现在。' },
        { title: 'since + 时间点', steps: [
           { no: 1, md: '原句：She has worked here since 2020.', askBefore: true },
           { no: 2, md: 'since 2020 从 2020 年延续到现在。', askBefore: true },
           { no: 3, md: '主语 She，用 has worked。', askBefore: true },
           { no: 4, md: '不能改成 She worked here since 2020。' }
        ], takeaway: 'since 后接时间点，主句常用完成时。' }
      ],
      guidedPractice: [
        { questionId: 'eng2-perfect-4', hint: 'have/has + 过去分词；be 的过去分词是 been。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['eng2-perfect-3', 'eng2-perfect-5'],
      challenge: ['eng2-perfect-2'],
      summary: {
        essence: '现在完成时 = 过去的动作 + 现在的结果/经历/持续。',
        formulas: ['have/has + done', 'for + 时间段', 'since + 时间点', 'have been to 去过 / have gone to 去了'],
        pitfalls: ['把过去分词写成过去式', '和 ago/yesterday 连用', 'have been to 与 have gone to 混用', 'for 和 since 后接成分搞反'],
        checklist: ['我能说出完成时的三大用法', '我能区分 did 和 have done', '我能正确使用 for/since', '我能判断 ago 类时间词']
      },
      feynmanPrompt: '请用「昨天做了」和「已经做完了」两个例子，讲清一般过去时和现在完成时的区别。'
    },
    {
      id: 'eng-clause-L2',
      kpIds: ['eng-clause'],
      subject: 'english',
      level: 2,
      title: '从句：把长句拆成积木',
      estMinutes: 40,
      prerequisites: ['eng-clause'],
      unlockRule: { fromLessonId: 'eng-sentence-L1', minQuizRate: 0.6 },
      hook: { title: '一遇到 that/which/who 就乱', body: '从句不是新句子，它只是替句子里的某个成分打工。先看它替谁打工，再选引导词。' },
      sections: [
        { type: 'text', md: '从句的本质是：**用一个句子去充当另一个句子里的成分**。充当名词 → 名词性从句；修饰名词 → 定语从句；修饰动作或整句 → 状语从句。判断类型，比背引导词更重要。' },
        { type: 'diagram', diagramId: 'clause-types', caption: '三类从句的分工' },
        { type: 'text', md: '**定语从句：修饰名词**\n先找先行词（被修饰的名词），再看从句缺什么成分。缺主语指人用 who/that，指物用 which/that；缺宾语可用 whom/which/that；缺所属用 whose。' },
        { type: 'text', md: '**名词性从句：充当主/宾/表/同位语**\nthat 只连接、不充当成分；whether/if 表示「是否」；what 表示「……的东西/事情」，本身充当成分。' },
        { type: 'text', md: '**状语从句：表达时间、原因、条件、让步**\nwhen/while 时间，because 原因，if/unless 条件，although/though 让步。注意主将从现：if 从句用一般现在时表将来。' },
        { type: 'text', md: '**判断口诀**\n从句缺成分 → 名词性（what）或定语（who/which）；从句不缺成分且修饰名词 → 定语（that/which）；修饰整句 → 状语。' },
        { type: 'analogy', title: '从句像「外挂零件」', md: '主干是一台机器，从句是一个外挂零件：它可以当名字用（名词性），可以贴在某个名词上（定语），也可以说明整台机器什么时候/为什么运转（状语）。' },
        { type: 'compare', headers: '类型,作用,常见引导词,例子', rows: '定语从句,修饰名词,who/which/that/whose,The book that I bought is new.,名词性从句,充当名词成分,that/whether/what,I know that he is right.,状语从句,修饰动作/整句,when/because/if/although,When he came, we left.' },
        { type: 'formula', latex: '先行词 + 关系词 + 从句', caption: '定语从句的三段式' },
        { type: 'warning', md: '宾语从句要用陈述语序：I don\'t know **where he lives**，不能写成 where does he live。' },
        { type: 'tip', md: '先找从句的边界：从引导词开始，到第二个谓语结束。括起来之后，主句立刻变短。' },
        { type: 'diagram', diagramId: 'sentence-tree', caption: '从句挂在主干上' },
        { type: 'quiz', questionId: 'eng2-clause-1', purpose: '定语从句关系词' }
      ],
      workedExamples: [
        { title: '定语从句选关系词', steps: [
           { no: 1, md: '原句：The man ___ is talking to my teacher is my father.', askBefore: true },
           { no: 2, md: '先行词 the man 指人。', askBefore: true },
           { no: 3, md: '从句 ___ is talking 缺主语。', askBefore: true },
           { no: 4, md: '指人作主语用 who。' }
        ], takeaway: '先看先行词指人还是指物，再看从句缺什么成分。' },
        { title: '宾语从句语序', steps: [
           { no: 1, md: '原句：I don\'t know where does he live.（错）', askBefore: true },
           { no: 2, md: 'where 引导宾语从句。', askBefore: true },
           { no: 3, md: '从句必须用陈述语序：where he lives。', askBefore: true },
           { no: 4, md: '改为 I don\'t know where he lives.' }
        ], takeaway: '宾语从句不再倒装。' }
      ],
      guidedPractice: [
        { questionId: 'eng2-clause-5', hint: '先找先行词 the girl，再看第二句的 She 作什么成分。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['eng2-clause-3', 'eng2-clause-2'],
      challenge: ['eng2-clause-4'],
      summary: {
        essence: '从句类型由它在句子里担任的成分决定，不由引导词决定。',
        formulas: ['定语：先行词 + 关系词 + 从句', '宾语从句用陈述语序', 'if 条件从句：主将从现', 'what = 先行词 + 关系词'],
        pitfalls: ['宾语从句倒装', '定语从句重复保留代词', 'that 与 what 混用', 'if 与 whether 在介词后混用'],
        checklist: ['我能区分三类从句', '我能找到先行词', '我能判断从句缺什么成分', '我能把两句合并成定语从句']
      },
      feynmanPrompt: '请用「The book that I bought is useful.」这个例子，讲清先行词、关系词和从句各是什么。'
    },
    {
      id: 'eng-nonfinite-L3',
      kpIds: ['eng-nonfinite'],
      subject: 'english',
      level: 3,
      title: '非谓语动词：一个句子只能有一个谓语',
      estMinutes: 40,
      prerequisites: ['eng-nonfinite'],
      unlockRule: { fromLessonId: 'eng-clause-L2', minQuizRate: 0.7 },
      hook: { title: '两个动词连在一起就出错', body: '英语不是把动词排排坐。一个分句只能有一个谓语，其余动词必须「降级」成非谓语。' },
      sections: [
        { type: 'text', md: '非谓语动词就是**不能单独作谓语的动词形式**：to do、doing、done。它们可以作主语、宾语、定语、状语、补语。判断用哪一种，只看两件事：它和逻辑主语是主动还是被动？动作是将来、进行还是完成？' },
        { type: 'diagram', diagramId: 'nonfinite-map', caption: 'to do / doing / done 的分工' },
        { type: 'text', md: '**to do：目的、将来、一次**\n常表示「为了……」或「还没发生」。I want to go. / He came to help us. / I have a lot of work to do.' },
        { type: 'text', md: '**doing：主动、进行**\n逻辑主语主动做某事，或动作正在进行。Hearing the news, she cried. / The man standing there is my uncle.' },
        { type: 'text', md: '**done：被动、完成**\n逻辑主语被动承受，或动作已经完成。Given more time, we could do better. / The book written by him is popular.' },
        { type: 'text', md: '**做题顺序**\n① 找句子已有的谓语；② 判断空格处能不能再作谓语；③ 找逻辑主语；④ 判断主动/被动、进行/完成；⑤ 选 to do/doing/done。' },
        { type: 'analogy', title: '谓语是「正式员工」，非谓语是「外包」', md: '一个部门只能有一个正式负责人（谓语）。其他动词要做的事，只能以外包身份出现：to do 是「准备去做」，doing 是「正在做/主动做」，done 是「被做/已经做完」。' },
        { type: 'compare', headers: '形式,逻辑关系,常见作用,例子', rows: 'to do,主动/将来,目的、宾语,I want to learn.,doing,主动/进行,伴随、定语,He sat reading.,done,被动/完成,状语、定语,Seen from here, it looks small.' },
        { type: 'formula', latex: '一个分句 = 一个谓语', caption: '其余动词降级为非谓语' },
        { type: 'warning', md: '不要把非谓语当谓语。**Having finished** his homework, he went out. 主句谓语是 went，Having finished 只是状语。' },
        { type: 'tip', md: '先数谓语。如果句子里已经有一个谓语，空格处又出现动词，优先考虑非谓语，而不是再填一个谓语形式。' },
        { type: 'diagram', diagramId: 'sentence-tree', caption: '非谓语挂在主句上' },
        { type: 'quiz', questionId: 'eng2-nonfinite-1', purpose: 'doing 作状语' }
      ],
      workedExamples: [
        { title: 'doing 作状语', steps: [
           { no: 1, md: '原句：___ the news, she couldn\'t help crying.', askBefore: true },
           { no: 2, md: '主句谓语 couldn\'t help，空格不能再作谓语。', askBefore: true },
           { no: 3, md: '逻辑主语 she 主动 hear the news。', askBefore: true },
           { no: 4, md: '主动/进行用 Hearing。' }
        ], takeaway: '先确定逻辑主语，再判断主动被动。' },
        { title: 'done 作状语', steps: [
           { no: 1, md: '原句：___ more time, we could have done better.', askBefore: true },
           { no: 2, md: '主句谓语 could have done。', askBefore: true },
           { no: 3, md: 'we 是被给时间，逻辑上被动。', askBefore: true },
           { no: 4, md: '用 Given。' }
        ], takeaway: '被动关系优先考虑 done。' }
      ],
      guidedPractice: [
        { questionId: 'eng2-nonfinite-3', hint: '空格表示「为了照顾」，目的状语用 to do。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['eng2-nonfinite-5', 'eng2-nonfinite-4'],
      challenge: ['eng2-nonfinite-2'],
      summary: {
        essence: '先找谓语，再把多余动词降级；主动进行用 doing，被动完成用 done，目的将来用 to do。',
        formulas: ['to do：目的/将来', 'doing：主动/进行', 'done：被动/完成', '一个分句只能有一个谓语'],
        pitfalls: ['两个谓语直接相连', '主动被动判断反', 'doing 与 done 混用', '非谓语逻辑主语找错'],
        checklist: ['我能数清句子里有几个谓语', '我能找到非谓语的逻辑主语', '我能判断主动/被动', '我能区分 to do/doing/done']
      },
      feynmanPrompt: '请解释：为什么「I want go home」是错的？正确的说法是什么，为什么？'
    },
    {
      id: 'eng-past-L2',
      kpIds: ['eng-past'],
      subject: 'english',
      level: 2,
      title: '一般过去时与将来时：时间轴先定位',
      estMinutes: 35,
      prerequisites: ['eng-past'],
      unlockRule: { fromLessonId: 'eng-present-L2', minQuizRate: 0.6 },
      hook: { title: '时态总在 will 和 did 之间摇摆', body: '先别背表格，先看时间词。时间定位对了，形式大多只有一个答案。' },
      sections: [
        { type: 'text', md: '时态的核心不是背十六种表格，而是**先判断动作发生在时间轴的哪一段**。这一课把一般过去时、一般将来时、过去进行时放在一条轴上，配合时间标志做题。' },
        { type: 'diagram', diagramId: 'tense-timeline', caption: '先定位，再选形式' },
        { type: 'text', md: '**一般过去时**\n表示过去某个时间发生并结束的动作。标志：yesterday、last week、ago、in 2019。动词用过去式，规则加 -ed，不规则要单独记。' },
        { type: 'text', md: '**一般将来时**\nwill + 动词原形，或 be going to + 动词原形。will 偏「临时决定/单纯将来」，be going to 偏「计划」或「有迹象的预测」。' },
        { type: 'text', md: '**过去进行时**\nwas/were + doing，表示过去某个时刻正在进行。常与 when/while 引导的时间状语连用。' },
        { type: 'text', md: '**主将从现**\nif/when 引导的条件或时间状语从句中，用一般现在时表示将来：If it rains tomorrow, we will stay at home.' },
        { type: 'analogy', title: '时间轴像地铁线路', md: '过去、现在、将来是三站。先看时间词把你带到哪一站，再选那一站对应的「车票」（动词形式）。' },
        { type: 'compare', headers: '时间,形式,例子', rows: '过去某时,did,I visited him yesterday.,过去正在进行,was/were doing,I was reading at 8 pm.,将来,will do / be going to do,I will call you tomorrow.,条件从句表将来,一般现在时,If it rains, we will stay.' },
        { type: 'formula', latex: 'did / will do / was doing', caption: '三种最常用过去将来形式' },
        { type: 'warning', md: '条件状语从句和时间内状语从句里不能用 will：**If it will rain** 是错的，应为 If it rains。' },
        { type: 'tip', md: '看到 yesterday、ago、last 直接选过去式；看到 tomorrow、next 选将来；看到 when + 过去时间点，考虑过去进行。' },
        { type: 'quiz', questionId: 'eng2-past-1', purpose: '过去时标志' }
      ],
      workedExamples: [
        { title: '过去进行时', steps: [
           { no: 1, md: '原句：When I called him, he ___ (watch) TV.', askBefore: true },
           { no: 2, md: 'When I called him 是过去时间点。', askBefore: true },
           { no: 3, md: '「正在看电视」是当时进行。', askBefore: true },
           { no: 4, md: '主语 he，用 was watching。' }
        ], takeaway: '过去时间点 + 正在进行 = was/were doing。' },
        { title: '主将从现', steps: [
           { no: 1, md: '原句：If it ___ (rain) tomorrow, we will stay at home.', askBefore: true },
           { no: 2, md: 'if 引导条件从句，不能用 will。', askBefore: true },
           { no: 3, md: '主句 will stay 表将来。', askBefore: true },
           { no: 4, md: '从句用一般现在时 rains。' }
        ], takeaway: '条件从句用现在时表将来。' }
      ],
      guidedPractice: [
        { questionId: 'eng2-past-3', hint: 'When I called him 是过去时间点，表示当时正在进行。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['eng2-past-5', 'eng2-past-4'],
      challenge: ['eng2-past-2'],
      summary: {
        essence: '先看时间词定位，再选动词形式；条件/时间从句用现在时表将来。',
        formulas: ['过去：did', '将来：will do / be going to do', '过去进行：was/were doing', '主将从现'],
        pitfalls: ['过去式与过去分词混用', '条件从句误用 will', 'be going to 后接动名词', '过去进行与一般过去混淆'],
        checklist: ['我能识别过去时间标志', '我能区分 will 和 be going to', '我能写过去进行时', '我能遵守主将从现']
      },
      feynmanPrompt: '请用「昨天」「明天」「昨天八点正在」三个时间，分别说一个句子，并解释为什么用那个时态。'
    },
    {
      id: 'eng-voice-L2',
      kpIds: ['eng-voice'],
      subject: 'english',
      level: 2,
      title: '被动语态：动作的承受者当主角',
      estMinutes: 35,
      prerequisites: ['eng-voice'],
      unlockRule: { fromLessonId: 'eng-past-L2', minQuizRate: 0.6 },
      hook: { title: '什么时候该用被动？', body: '不是所有句子都能变被动。先看主语是不是动作的承受者，再看动词是否及物。' },
      sections: [
        { type: 'text', md: '被动语态的底层逻辑只有一句：**把动作的承受者放到主语位置**。结构是 be + 过去分词，be 的时态跟着原句走。阅读里的被动句常常藏着重要信息，写作里用被动能突出结果。' },
        { type: 'diagram', diagramId: 'passive-transform', caption: '主动变被动的三步' },
        { type: 'text', md: '**什么时候用被动**\n不知道动作是谁做的、没必要说、或者想强调承受者时。The window was broken.（不知道谁打破的）' },
        { type: 'text', md: '**结构：be + done**\n一般现在时 am/is/are + done；一般过去时 was/were + done；将来 will be + done；完成时 has/have been + done；情态动词 can be + done。' },
        { type: 'text', md: '**主动变被动三步**\n① 原宾语提前作主语；② 原谓语变 be + done；③ 原主语放到 by 后面（可省略）。' },
        { type: 'text', md: '**不能变被动的动词**\nhappen、appear、belong、arrive 等不及物动词没有宾语，不能变被动。' },
        { type: 'analogy', title: '主动句是「谁打了谁」，被动句是「谁被打了」', md: '主动句镜头对着动作发出者，被动句镜头对着动作承受者。信息重点变了，句子结构也跟着变。' },
        { type: 'compare', headers: '时态,主动,被动', rows: '一般现在,cleans,is cleaned,一般过去,built,was built,将来,will build,will be built,现在完成,has finished,has been finished,情态,can do,can be done' },
        { type: 'formula', latex: 'be + done (+ by ...)', caption: 'be 变时态，done 不变' },
        { type: 'warning', md: '**happen / appear / belong** 没有被动语态。The accident was happened 是典型错误。' },
        { type: 'tip', md: '先找主语是「做动作」还是「被动作」。如果是被动作，再检查动词是否及物，最后按时态变 be。' },
        { type: 'diagram', diagramId: 'tense-timeline', caption: 'be 的时态跟着时间走' },
        { type: 'quiz', questionId: 'eng2-voice-1', purpose: '一般现在时被动' }
      ],
      workedExamples: [
        { title: '一般现在时被动', steps: [
           { no: 1, md: '原句：The classroom ___ every day.', askBefore: true },
           { no: 2, md: 'classroom 是被打扫，作主语。', askBefore: true },
           { no: 3, md: 'every day 表一般现在时。', askBefore: true },
           { no: 4, md: '主语单数，用 is cleaned。' }
        ], takeaway: '承受者作主语 + 一般现在时 → am/is/are done。' },
        { title: '主动变被动', steps: [
           { no: 1, md: '原句：People speak English in many countries.', askBefore: true },
           { no: 2, md: '宾语 English 提前作主语。', askBefore: true },
           { no: 3, md: 'speak 变 be + spoken。', askBefore: true },
           { no: 4, md: '一般现在时、主语单数，用 is spoken。' }
        ], takeaway: '先提前宾语，再变 be + done。' }
      ],
      guidedPractice: [
        { questionId: 'eng2-voice-3', hint: 'homework 是被完成，already 提示现在完成时，结构 has been done。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['eng2-voice-5', 'eng2-voice-4'],
      challenge: ['eng2-voice-2'],
      summary: {
        essence: '被动语态 = 承受者作主语 + be + done；be 管时态，done 管动作。',
        formulas: ['am/is/are + done', 'was/were + done', 'will be + done', 'has/have been + done'],
        pitfalls: ['be 动词漏掉', 'done 写成原形', '不及物动词变被动', 'by 后面的代词用宾格'],
        checklist: ['我能判断该不该用被动', '我能按时态变 be', '我能完成主动变被动', '我知道哪些动词无被动']
      },
      feynmanPrompt: '请把「老师昨天表扬了我」改成被动句，并解释每一步为什么这样变。'
    },
    {
      id: 'eng-reading-L2',
      kpIds: ['eng-reading'],
      subject: 'english',
      level: 2,
      title: '阅读定位与主旨：先题干，后文章',
      estMinutes: 40,
      prerequisites: ['eng-reading'],
      unlockRule: { fromLessonId: 'eng-clause-L2', minQuizRate: 0.6 },
      hook: { title: '文章读完了，题还是错', body: '因为你把时间花在「读懂每个词」，而不是「找到答案句」。阅读是定位游戏。' },
      sections: [
        { type: 'text', md: '阅读题不是翻译题。**先读题干，圈关键词，再回文定位**，最后比对选项和原文的同义替换。细节题找定位句，主旨题看首尾和转折，推断题不选原文原句。' },
        { type: 'diagram', diagramId: 'reading-scan', caption: '三步定位法' },
        { type: 'text', md: '**先题干，后文章**\n先看题目问什么，圈出人名、时间、地点、专有名词。带着问题读，大脑才知道该在哪里停下来。' },
        { type: 'text', md: '**定位靠同义替换**\n题干关键词在原文里常常换了说法。study hard → work hard；important → matter；suggest → should。找到同义替换，就找到了答案句。' },
        { type: 'text', md: '**主旨题看结构**\n首段引出话题，尾段总结观点，转折词 but/however 后面常是重点。不要选只覆盖一段的细节。' },
        { type: 'text', md: '**干扰项特征**\n绝对化（all/never/only）、偷换概念（原文 use computers → 选项 sell computers）、无中生有、与原文相反。' },
        { type: 'analogy', title: '阅读像查地图', md: '题干是目的地，关键词是路标。你不需要走遍全城，只要找到路标对应的那条街。' },
        { type: 'compare', headers: '题型,找什么,常见陷阱', rows: '细节题,题干关键词的定位句,偷换一个词,主旨题,首尾段 + 转折,选一个细节,推断题,原文依据 + 合理一步,选原文原句,指代题,前文最近的名词,指代对象搞反' },
        { type: 'formula', latex: '题干关键词 → 原文定位 → 同义替换 → 选项比对', caption: '阅读四步' },
        { type: 'warning', md: '选项里出现原文原句，不一定是答案。推断题常把原句当干扰项，正确答案需要往前推一步。' },
        { type: 'tip', md: '每道题控制在 1-1.5 分钟。定位不到就先跳过，做完其他题再回来，不要在一句话上死磕。' },
        { type: 'quiz', questionId: 'eng2-reading-1', purpose: '细节定位' }
      ],
      workedExamples: [
        { title: '细节定位', steps: [
           { no: 1, md: '题干：What does the writer suggest?', askBefore: true },
           { no: 2, md: '关键词 suggest，回文找建议句。', askBefore: true },
           { no: 3, md: '原文：you should close the book and try to explain...', askBefore: true },
           { no: 4, md: '比对选项：Explaining ideas in your own words. 同义替换。' }
        ], takeaway: '先找建议句，再比对同义替换。' },
        { title: '主旨判断', steps: [
           { no: 1, md: '全文讲新图书馆：不只借书，还能上课、用电脑、交朋友。', askBefore: true },
           { no: 2, md: '结尾总结：a warm living room for the whole community。', askBefore: true },
           { no: 3, md: '选项 B：a community space。', askBefore: true },
           { no: 4, md: 'A 与 not only 矛盾，排除。' }
        ], takeaway: '主旨看首尾和转折，不选局部细节。' }
      ],
      guidedPractice: [
        { questionId: 'eng2-reading-4', hint: 'those 和前面的 experts 是对比关系，指代另一类人。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['eng2-reading-2', 'eng2-reading-3'],
      challenge: ['eng2-reading-5'],
      summary: {
        essence: '阅读先题干后文章，靠关键词定位和同义替换找答案。',
        formulas: ['细节题：定位句', '主旨题：首尾 + 转折', '推断题：原文依据 + 一步', '指代题：往前找最近名词'],
        pitfalls: ['通读全文再做题', '凭印象不定位', '选原文原句当推断答案', '忽略绝对化选项'],
        checklist: ['我会圈题干关键词', '我能找到同义替换', '我能区分主旨和细节', '我能识别四类干扰项']
      },
      feynmanPrompt: '请用一篇你读过的短文，说明怎样从题干关键词找到答案句，以及为什么要小心「原文原句」选项。'
    },
    {
      id: 'eng-translation-L3',
      kpIds: ['eng-translation'],
      subject: 'english',
      level: 3,
      title: '翻译与长难句拆解：先切块，再重排',
      estMinutes: 40,
      prerequisites: ['eng-translation'],
      unlockRule: { fromLessonId: 'eng-reading-L2', minQuizRate: 0.7 },
      hook: { title: '每个词都认识，译出来不像人话', body: '因为英语和中文的语序不同。翻译不是逐词替换，而是先拆意群，再按中文习惯重排。' },
      sections: [
        { type: 'text', md: '翻译题按意群给分。**先切块，再找主干，最后按中文顺序重排**。定语从句常前置，状语常放句首或动词前，长句可以拆成几个短句。' },
        { type: 'diagram', diagramId: 'translation-chunk', caption: '切块 → 定主干 → 重排' },
        { type: 'text', md: '**切意群**\n按「谁/做什么/什么时候/什么地方/为什么」切块。每个块内部再处理，不要一开始就逐词翻译。' },
        { type: 'text', md: '**先找主干**\n先译主谓宾，保证句子站得住。从句、介词短语、分词短语先放一边。' },
        { type: 'text', md: '**定语从句前置**\n短的定语从句译成「……的」放在名词前；太长就拆成独立短句，用「这/它」衔接。' },
        { type: 'text', md: '**调整语序与词性**\n英语多用名词，中文多用动词。翻译时可以词性转换，如 the development of → 发展；必要时增补主语或连接词。' },
        { type: 'analogy', title: '翻译像搬家', md: '先把家具按房间拆成块（意群），再决定哪件放客厅、哪件放卧室（重排语序）。一件一件搬，比整屋硬塞更不容易乱。' },
        { type: 'compare', headers: '英语结构,中文习惯,处理方式', rows: '定语从句后置,定语前置,……的 + 名词,状语后置,状语常前置,时间/原因放句首,名词化,动词化,development → 发展,长句多从句,短句多,拆成几句' },
        { type: 'formula', latex: '主干 → 修饰 → 重排 → 润色', caption: '翻译四步' },
        { type: 'warning', md: '不要逐词硬译。**The book is very useful** 译成「这本书是非常有用的」不算错，但「这本书非常有用」更自然。' },
        { type: 'tip', md: '译完后读一遍中文：如果自己都觉得很拗口，八成是定语太长或状语位置不对。' },
        { type: 'quiz', questionId: 'eng2-translation-3', purpose: '被动翻译' }
      ],
      workedExamples: [
        { title: '定语从句前置', steps: [
           { no: 1, md: '原句：The book that I bought last week is very useful.', askBefore: true },
           { no: 2, md: '切块：The book / that I bought / last week / is / very useful。', askBefore: true },
           { no: 3, md: '主干：这本书非常有用。', askBefore: true },
           { no: 4, md: '定语「我上周买的」放到「书」前。' }
        ], takeaway: '短定语从句前置，中文更顺。' },
        { title: 'not...but... 结构', steps: [
           { no: 1, md: '原句：What matters is not how fast you read, but how much you understand.', askBefore: true },
           { no: 2, md: '主语从句 What matters = 重要的。', askBefore: true },
           { no: 3, md: 'not...but... = 不是……而是……。', askBefore: true },
           { no: 4, md: '译：重要的不是你读得多快，而是你理解了多少。' }
        ], takeaway: '先识别固定结构，再按中文搭配译。' }
      ],
      guidedPractice: [
        { questionId: 'eng2-translation-5', hint: '先括起来 who failed the exam，剩下的才是主句。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['eng2-translation-1', 'eng2-translation-2'],
      challenge: ['eng2-translation-4'],
      summary: {
        essence: '翻译先切意群、找主干，再按中文习惯前置定语、调整状语。',
        formulas: ['定语从句：……的 + 名词', '状语：时间/原因常前置', 'not...but...：不是……而是……', 'What matters：重要的是……'],
        pitfalls: ['逐词硬译', '定语太长不拆', '状语位置照搬英文', '漏译或增译过度'],
        checklist: ['我会切意群', '我能找到主干', '我会前置短定语', '我能把长句拆成短句']
      },
      feynmanPrompt: '请拿一个含定语从句的英文句子，演示「切块 → 找主干 → 重排」的全过程。'
    }
  );
})(window.ZSB = window.ZSB || {});
