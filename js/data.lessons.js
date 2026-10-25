/* 学习单元（Lesson）种子数据：三科各 2 个，含完整六阶段素材 */
(function (Z) {
  Z.LESSONS = [
    /* ============================================================
       英语 · 词性九类 · L1
    ============================================================ */
    {
      id: 'eng-wordclass-L1',
      kpIds: ['eng-wordclass'],
      subject: 'english',
      level: 1,
      title: '词性九类：先给每个词找到它的岗位',
      estMinutes: 12,
      prerequisites: [],
      unlockRule: {},
      hook: {
        title: '一个词，三副面孔',
        body: 'book 你认识，是「书」。可 I book a ticket 里，它突然变成了「预订」。词义没变，变的是它在句子里干的活。英语判断词性，从来不是查词典，而是看它在句子里站在哪个岗位。'
      },
      sections: [
        { type: 'text', md: '英语句子不是把单词按中文顺序排一排。每个词进句子前，都要先领一个岗位：谁在做事、做什么事、修饰谁。这个岗位，就是**词性**。' },
        { type: 'analogy', title: '一场小型招聘会', md: '把句子想成一场招聘会：名词是来应聘的「人/物」，动词是「干的活」，形容词是给人和物贴的标签，副词是给动作调档位的旋钮。同一个词今天可以是应聘者，明天也可以是岗位本身。' },
        { type: 'quiz', questionId: 'eng-wc-q1', purpose: '防走神' },
        { type: 'text', md: '先记四个主力。名词回答「谁/什么」，能加冠词、能变复数；动词回答「做什么」，有时态变化；形容词回答「什么样的」，贴在名词前后；副词回答「怎么样地」，专门修饰动作或另一个形容词。' },
        { type: 'compare', headers: ['词性', '回答的问题', '常见位置', '例子'], rows: [
          ['名词', '谁 / 什么', '主语、宾语、介词后', 'the **dog**、a **book**'],
          ['动词', '做什么', '谓语位置', '**run**、**book** a ticket'],
          ['形容词', '什么样的', '名词前 / be 后', 'a **quick** fox'],
          ['副词', '怎么样地', '动词、形容词附近', 'run **quickly**']
        ] },
        { type: 'text', md: '另外五类负责搭骨架：代词代替名词（he / it）；介词搭桥（in / on / after）；连词连接（and / but / because）；冠词限定（a / an / the）；数词计数（two / first）。' },
        { type: 'quiz', questionId: 'eng-wc-q2', purpose: '检验理解' },
        { type: 'tip', md: '判断词性只看位置：它前面有没有冠词？它后面有没有名词？它是不是在修饰动作？不要盯着单词本身背词性。' },
        { type: 'warning', md: '同一个词可以换岗位。book 是名词也是动词，light 是名词、形容词也是动词。看到眼熟的词，先问「它在这句里干什么」。' },
        { type: 'quiz', questionId: 'eng-wc-q3', purpose: '检验理解' }
      ],
      workedExamples: [
        {
          questionId: 'eng-wc-ex',
          steps: [
            { no: 1, md: '先找谓语。句子里唯一能表示动作的词是 jumps，所以它是动词。', askBefore: '一个句子最先找哪类词？' },
            { no: 2, md: '再看谁在跳：The quick brown fox。中心词 fox 是名词，quick 和 brown 贴在它前面，是形容词。' },
            { no: 3, md: 'jumps 后面是 over the lazy dog。over 后面接了名词短语，说明它在搭桥，是介词。' },
            { no: 4, md: 'the 是冠词；lazy 在 dog 前，是形容词；整句结构就清楚了。' }
          ],
          takeaway: '先定谓语动词，再找主语中心词，最后处理介词短语。位置决定词性，词义只做参考。'
        }
      ],
      guidedPractice: [
        { questionId: 'eng-wc-g1', hint: '先找动作，再找动作的执行者，最后看修饰动作的词。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['eng-wc-i1', 'eng-wc-i2', 'eng-wc-i3'],
      challenge: ['eng-wc-c1'],
      summary: {
        essence: '如果你只记一件事：词性由位置决定，不由单词本身决定。',
        formulas: ['名词：可加冠词 / 可变复数', '动词：有时态变化，常作谓语', '副词修饰动词，形容词修饰名词'],
        pitfalls: ['看到 book 就选名词，忽略它在句中的动宾结构', '把 -ly 结尾的词一律当副词', '混淆形容词性物主代词（her）与代词主格（she）'],
        checklist: ['我能不看笔记说出九类词性各自的岗位', '我能给一个陌生句子逐词定岗', '我能解释同一个词为什么可以有两种词性']
      },
      feynmanPrompt: '请用自己的话讲清楚：为什么判断词性不能靠背词义？并举一个「同一个词换岗位」的例子。'
    },

    /* ============================================================
       英语 · 一般现在时 · L2
    ============================================================ */
    {
      id: 'eng-present-L2',
      kpIds: ['eng-present'],
      subject: 'english',
      level: 2,
      title: '一般现在时：不是「现在正在」，而是「一直如此」',
      estMinutes: 14,
      prerequisites: ['eng-wordclass-L1'],
      unlockRule: { fromLessonId: 'eng-wordclass-L1', minQuizRate: 0.8 },
      hook: {
        title: 'I go to school 到底是什么意思？',
        body: '如果按字面把一般现在时理解成「现在」，那 I go to school 应该表示「我此刻正在去学校」。可它真正的意思是「我平时上学」。这个时态管的不是这一刻，而是一段一直成立的状态。'
      },
      sections: [
        { type: 'text', md: '一般现在时表达三件事：习惯（每天/经常）、事实（地球绕太阳）、规律（水到 100 度会开）。它**不表示此刻正在发生**，那是现在进行时的活。' },
        { type: 'analogy', title: '手机的默认设置', md: '一般现在时像手机的默认设置：平时一直这样，不需要每次重新操作。现在进行时像你此刻正在点的一个按钮，只持续一小会儿。' },
        { type: 'text', md: '主语是第三人称单数（he / she / it / 单数名词）时，动词要变形：一般加 -s；以 s、x、ch、sh、o 结尾加 -es；辅音字母 + y 结尾，把 y 变 i 再加 -es；have 变 has。' },
        { type: 'compare', headers: ['句型', '结构', '例子'], rows: [
          ['肯定句', '主语 + 动词（单三变形）', 'She **likes** music.'],
          ['否定句', '主语 + don\'t/doesn\'t + 动词原形', 'She **doesn\'t like** music.'],
          ['一般疑问句', 'Do/Does + 主语 + 动词原形?', '**Does** she **like** music?'],
          ['特殊疑问句', '疑问词 + do/does + 主语 + 原形?', '**What does** she **like**?']
        ] },
        { type: 'quiz', questionId: 'eng-pres-q1', purpose: '检验理解' },
        { type: 'text', md: '否定和疑问要请助动词出场。第三人称单数用 does，其余用 do。助动词一旦出现，后面的实义动词就回到原形——单三的标记只能出现一次。' },
        { type: 'warning', md: '最高频错误：`doesn\'t watches`。doesn\'t 已经表达了单三，watch 必须回原形。记住口诀：**助动词一出现，动词就解放**。' },
        { type: 'quiz', questionId: 'eng-pres-q2', purpose: '检验理解' },
        { type: 'text', md: '看到 every day、usually、often、always、on Sundays、once a week，优先考虑一般现在时。看到 now、look、listen，优先考虑现在进行时。' },
        { type: 'quiz', questionId: 'eng-pres-q3', purpose: '防走神' },
        { type: 'tip', md: '判断时态的顺序：先看时间标志，再看主语单复数，最后检查动词形式。三步都过，基本不会错。' }
      ],
      workedExamples: [
        {
          questionId: 'eng-pres-ex',
          steps: [
            { no: 1, md: '找主语 She，判断是第三人称单数。', askBefore: '这句话错最可能错在哪一步？' },
            { no: 2, md: '看时间标志 every day，确定用一般现在时。' },
            { no: 3, md: '一般现在时 + 第三人称单数，动词 go 要变成 goes。' },
            { no: 4, md: '改完：She goes to school every day.' }
          ],
          takeaway: '单三改错只动动词，不要顺手改别的成分。'
        }
      ],
      guidedPractice: [
        { questionId: 'eng-pres-g1', hint: '先判断时态，再判断主语是不是单三，最后处理否定。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['eng-pres-i1', 'eng-pres-i2'],
      challenge: ['eng-pres-c1'],
      summary: {
        essence: '如果你只记一件事：一般现在时管「一直如此」，不管「此刻正在」。',
        formulas: ['单三：动词 + s/es', '否定：don\'t / doesn\'t + 动词原形', '疑问：Do / Does + 主语 + 动词原形?'],
        pitfalls: ['doesn\'t 后面又给动词加 -s', '把 every day 的句子写成过去时', '客观真理误用现在进行时'],
        checklist: ['我能说出一般现在时的三种用途', '我能正确变单三和否定句', '我能用时间标志判断该不该用这个时态']
      },
      feynmanPrompt: '请用自己的话讲清楚：为什么 I go to school 不等于「我正在去学校」？再举一个必须用一般现在时的例子。'
    },

    /* ============================================================
       高数 · 导数的定义 · L1
    ============================================================ */
    {
      id: 'math-deriv-def-L1',
      kpIds: ['math-deriv-def', 'math-limit-def'],
      subject: 'math',
      level: 1,
      title: '导数到底在算什么？从「瞬时速度」说起',
      estMinutes: 14,
      prerequisites: [],
      unlockRule: {},
      hook: {
        title: '仪表盘上的 60km/h 是怎么来的？',
        body: '你开车只开了 10 分钟，仪表盘却显示 60km/h。你并没有真的跑满一小时，这个「每小时 60 公里」是从哪冒出来的？答案就是导数：把很短一段的平均速度，压缩到一个瞬间。'
      },
      sections: [
        { type: 'text', md: '先看一个熟悉的东西：平均速度。一段路的平均速度 = 走过的距离 ÷ 花掉的时间。它描述的是「一整段」的平均表现，不是某一刻。' },
        { type: 'analogy', title: '照片和视频的区别', md: '平均速度像一段视频，能看到整个过程；瞬时速度像按下快门的那一张照片，只记录某一瞬。导数就是把视频不断缩短，短到只剩一帧。' },
        { type: 'formula', latex: '\\bar v=\\frac{\\Delta s}{\\Delta t}=\\frac{s(t_0+\\Delta t)-s(t_0)}{\\Delta t}', caption: '平均速度：位移改变量除以时间改变量' },
        { type: 'quiz', questionId: 'math-dd-q1', purpose: '检验理解' },
        { type: 'text', md: '想得到某一刻的速度，就让 Δt 越来越小：1 秒、0.1 秒、0.01 秒。平均速度会越来越接近一个固定的数，这个数就是瞬时速度。' },
        { type: 'formula', latex: 'f\'(x_0)=\\lim_{\\Delta x\\to 0}\\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}', caption: '导数的定义：差商的极限' },
        { type: 'text', md: '定义法只有三步：一，写出差商；二，把分子展开、约掉 Δx；三，令 Δx→0 取极限。顺序不能反，先约分再取极限。' },
        { type: 'warning', md: 'Δt 不能直接等于 0。分母一为 0，整个式子就没意义了。极限说的是「无限接近」，不是「直接代入」。' },
        { type: 'text', md: '几何上，导数就是曲线在某点切线的斜率。平均变化率是割线斜率，让 Δx 变小，割线不断贴近切线，极限位置就是切线。' },
        { type: 'quiz', questionId: 'math-dd-q2', purpose: '检验理解' },
        { type: 'compare', headers: ['概念', '对应图形', '计算方式', '含义'], rows: [
          ['平均变化率', '割线斜率', 'Δy/Δx', '一段区间的平均表现'],
          ['瞬时变化率（导数）', '切线斜率', 'lim Δy/Δx', '某一点的瞬时表现']
        ] },
        { type: 'quiz', questionId: 'math-dd-q3', purpose: '检验理解' }
      ],
      workedExamples: [
        {
          questionId: 'math-dd-ex',
          steps: [
            { no: 1, md: '写出差商：f(2+Δx)-f(2) 除以 Δx。', askBefore: '定义法第一步先写什么？' },
            { no: 2, md: '代入 f(x)=x²：分子 =(2+Δx)²-4 = 4Δx+(Δx)²。' },
            { no: 3, md: '分子分母同时除以 Δx（Δx≠0）：差商 = 4+Δx。' },
            { no: 4, md: '令 Δx→0，得 f′(2)=4。' }
          ],
          takeaway: '看到「用定义求导」，先写差商，展开，约分，最后取极限。'
        }
      ],
      guidedPractice: [
        { questionId: 'math-dd-g1', hint: '先算 f(1+Δx)-f(1)，再看能不能约掉 Δx。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['math-dd-i1', 'math-dd-i2', 'math-dd-i3'],
      challenge: ['math-dd-c1'],
      summary: {
        essence: '如果你只记一件事：导数是差商在 Δx→0 时的极限，几何上是切线斜率。',
        formulas: ['f\'(x_0)=\\lim_{\\Delta x\\to 0}\\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}', '平均变化率 = Δy/Δx', '切线斜率 = f\'(x_0)'],
        pitfalls: ['直接令 Δx=0，得到 0/0', '展开时漏掉 (Δx)² 项', '把「连续」当成「可导」'],
        checklist: ['我能用自己的话解释瞬时速度', '我能用定义算二次函数的导数', '我能说出导数的几何意义']
      },
      feynmanPrompt: '请用自己的话讲清楚：导数为什么是「极限」而不是「直接代入 0」？再解释它在图像上代表什么。'
    },

    /* ============================================================
       高数 · 基本求导公式 · L2
    ============================================================ */
    {
      id: 'math-deriv-basic-L2',
      kpIds: ['math-deriv-basic'],
      subject: 'math',
      level: 2,
      title: '基本求导公式：这 10 个先刻进手',
      estMinutes: 15,
      prerequisites: ['math-deriv-def-L1'],
      unlockRule: { fromLessonId: 'math-deriv-def-L1', minQuizRate: 0.8 },
      hook: {
        title: '每次都用定义，考试时间根本不够',
        body: '用定义求一个多项式导数，光展开就要半页纸。但考场上没人这么做。基本求导公式，就是把常见函数的导数提前算好、背下来，考试时直接调用。'
      },
      sections: [
        { type: 'text', md: '求导公式不是天上掉下来的，每一个都能用定义推。但考场上不推，直接记。先把最常用的 10 个记熟，再谈技巧。' },
        { type: 'compare', headers: ['函数', '导数', '记忆点'], rows: [
          ['C（常数）', '0', '横线没有斜率'],
          ['xⁿ', 'n·xⁿ⁻¹', '指数搬下来，指数减一'],
          ['sin x', 'cos x', '正弦变余弦'],
          ['cos x', '−sin x', '余弦变负正弦'],
          ['eˣ', 'eˣ', '求导还是它'],
          ['aˣ', 'aˣ·ln a', '多乘一个 ln a'],
          ['ln x', '1/x', '对数变倒数'],
          ['logₐx', '1/(x·ln a)', '分母多 ln a'],
          ['√x', '1/(2√x)', '写成 x^(1/2)'],
          ['1/x', '−1/x²', '写成 x^(−1)']
        ] },
        { type: 'formula', latex: '(x^n)\'=n\\,x^{n-1}\\quad(n\\neq 0)', caption: '幂函数：最常用，也最容易和指数函数混' },
        { type: 'quiz', questionId: 'math-db-q1', purpose: '防走神' },
        { type: 'text', md: '两个函数相加、相减，可以逐项求导。相乘不能只导一项，要用乘积法则；相除用商法则。' },
        { type: 'formula', latex: '(uv)\'=u\'v+uv\'\\qquad\\left(\\frac{u}{v}\\right)\'=\\frac{u\'v-uv\'}{v^2}', caption: '乘积法则与商法则' },
        { type: 'warning', md: '别把 x² 和 2ˣ 搞混。x² 是幂函数，导数是 2x；2ˣ 是指数函数，导数是 2ˣ ln2。底数和指数谁在变，决定用哪条公式。' },
        { type: 'quiz', questionId: 'math-db-q2', purpose: '检验理解' },
        { type: 'text', md: '综合题里通常先拆项，再逐项套公式，最后合并同类项。遇到根号、分式，先写成分数指数或负指数，思路会清楚很多。' },
        { type: 'quiz', questionId: 'math-db-q3', purpose: '检验理解' }
      ],
      workedExamples: [
        {
          questionId: 'math-db-ex',
          steps: [
            { no: 1, md: '把 f(x)=x³+2x-5 拆成三项：x³、2x、-5。', askBefore: '多项式求导，第一步先做什么？' },
            { no: 2, md: '逐项套公式：(x³)′=3x²，(2x)′=2，(-5)′=0。' },
            { no: 3, md: '合并：f′(x)=3x²+2。' }
          ],
          takeaway: '多项式求导 = 拆项 + 套公式 + 常数归零。'
        }
      ],
      guidedPractice: [
        { questionId: 'math-db-g1', hint: '√x 先写成 x^(1/2)，再套幂函数公式。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['math-db-i1', 'math-db-i2', 'math-db-i3'],
      challenge: ['math-db-c1'],
      summary: {
        essence: '如果你只记一件事：幂函数「指数搬下来、指数减一」，指数函数求导还是它自己。',
        formulas: ['(x^n)\'=nx^{n-1}', '(e^x)\'=e^x', '(uv)\'=u\'v+uv\'', '(u/v)\'=(u\'v-uv\')/v²'],
        pitfalls: ['把 a^x 当幂函数求导', '乘积法则只导一项', '常数项求导后还保留常数'],
        checklist: ['我能默写 10 条基本公式', '我能做多项式逐项求导', '我能判断该用幂函数还是指数函数公式']
      },
      feynmanPrompt: '请用自己的话讲清楚：x²、2ˣ、eˣ 的求导有什么本质区别？为什么不能套同一条公式？'
    },

    /* ============================================================
       计算机 · 变量与类型 · L1
    ============================================================ */
    {
      id: 'cs-var-type-L1',
      kpIds: ['cs-var-type'],
      subject: 'cs',
      level: 1,
      title: '变量与类型：给数据准备合适的盒子',
      estMinutes: 13,
      prerequisites: [],
      unlockRule: {},
      hook: {
        title: '为什么 1 + "1" 有时等于 2，有时等于 "11"？',
        body: '同一行代码，在 Python 里直接报错，在 JavaScript 里却得到字符串 "11"。不是电脑算错了，而是两个语言对「类型」的规矩不同。搞懂类型，你才能预判代码会怎么跑。'
      },
      sections: [
        { type: 'text', md: '变量不是「值本身」，而是一个贴着名字的盒子。盒子里的东西可以是数字、字符串、布尔值、对象。类型，就是盒子里装的那类东西。' },
        { type: 'analogy', title: '厨房里的收纳盒', md: '数字盒放调料，字符串盒放标签纸，布尔盒只有「有 / 没有」两个状态。你把标签纸倒进调料盒，不是盒子坏了，是你用错了盒子。类型错误，本质就是「拿错了盒子」。' },
        { type: 'code', lang: 'javascript', code: 'let age = 18;\nlet name = "小明";\nlet isStudent = true;\n\nconsole.log(typeof age);\nconsole.log(typeof name);\nconsole.log(typeof isStudent);', runnable: true, output: 'number\nstring\nboolean' },
        { type: 'quiz', questionId: 'cs-vt-q1', purpose: '防走神' },
        { type: 'compare', headers: ['语言', '数字类型', '声明变量', '类型检查'], rows: [
          ['Python', 'int / float', 'x = 1', '运行时，动态类型'],
          ['JavaScript', 'number（统一）', 'let x = 1', '运行时，动态类型'],
          ['Java', 'int / double', 'int x = 1;', '编译时，静态类型']
        ] },
        { type: 'text', md: 'JS 里 `+` 有两个身份：两边都是数字时做加法，只要有一边是字符串就做拼接。其他算术运算符（- * /）会先把操作数转成数字。' },
        { type: 'warning', md: '`==` 会做隐式类型转换，`===` 不会。`"1" == 1` 是 true，`"1" === 1` 是 false。日常比较一律先用 `===`，能少踩很多坑。' },
        { type: 'quiz', questionId: 'cs-vt-q2', purpose: '检验理解' },
        { type: 'tip', md: '变量名用英文、见名知义；不要用 a、b、c 糊弄自己。类型不确定时，先 `console.log(typeof x)`，比猜快。' },
        { type: 'quiz', questionId: 'cs-vt-q3', purpose: '检验理解' }
      ],
      workedExamples: [
        {
          questionId: 'cs-vt-ex',
          steps: [
            { no: 1, md: '第一步看声明：`let a = 1`，此时 a 是 number。', askBefore: 'typeof 看的是变量当前的值，还是变量名？' },
            { no: 2, md: '第二步看重新赋值：`a = "1"`，a 指向了字符串。' },
            { no: 3, md: '第三步求值：`typeof a` 返回 "string"。JS 是动态类型，盒子可以换内容。' }
          ],
          takeaway: 'typeof 永远看「当前值」，不是「声明时的类型」。'
        }
      ],
      guidedPractice: [
        { questionId: 'cs-vt-g1', hint: '注意 typeof 返回的是全小写字符串。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['cs-vt-i1', 'cs-vt-i2', 'cs-vt-i3'],
      challenge: ['cs-vt-c1'],
      summary: {
        essence: '如果你只记一件事：变量是盒子，类型是盒子里装的东西；JS 允许换盒子内容。',
        formulas: ['typeof 42 → "number"', 'typeof "x" → "string"', 'typeof null → "object"（历史遗留）', '=== 不做类型转换'],
        pitfalls: ['把 null 当独立类型', '用 == 比较字符串和数字', '以为 let 会锁定变量类型'],
        checklist: ['我能解释变量和类型的区别', '我能预判 1 + "1" 的结果', '我能用 typeof 排查类型问题']
      },
      feynmanPrompt: '请用自己的话讲清楚：变量和类型分别是什么？为什么 JS 里 `1 + "1"` 会得到 "11"？'
    },

    /* ============================================================
       计算机 · 条件与循环 · L2
    ============================================================ */
    {
      id: 'cs-loop-L2',
      kpIds: ['cs-loop'],
      subject: 'cs',
      level: 2,
      title: '循环：让代码替你重复干活',
      estMinutes: 15,
      prerequisites: ['cs-var-type-L1'],
      unlockRule: { fromLessonId: 'cs-var-type-L1', minQuizRate: 0.8 },
      hook: {
        title: '手动打印 1 到 100，你会写几行？',
        body: '如果不用循环，打印 1 到 100 要写 100 行 console.log。循环把「重复」这件事交给电脑：你只写规则，它负责执行 100 次。循环写不好，程序就会多跑一次、少跑一次，或者永远停不下来。'
      },
      sections: [
        { type: 'text', md: '循环解决「同一件事重复做」。两种最常用：for 适合次数已知，while 适合条件满足就一直做。先想清楚三件事：从哪开始、什么时候停、每次怎么变。' },
        { type: 'analogy', title: '工厂流水线', md: 'for 循环像设定好产量的流水线：从第 1 个做到第 100 个，到数就停。while 循环像「只要传送带上还有零件就继续做」，零件没了才停。' },
        { type: 'code', lang: 'javascript', code: 'for (let i = 1; i <= 5; i++) {\n  console.log("第 " + i + " 次");\n}', runnable: true, output: '第 1 次\n第 2 次\n第 3 次\n第 4 次\n第 5 次' },
        { type: 'quiz', questionId: 'cs-loop-q1', purpose: '防走神' },
        { type: 'text', md: 'while 循环只检查条件。如果循环体里没有让条件变假的语句，它就会一直转下去。写 while 时，先回答「哪一行会让条件不成立」。' },
        { type: 'warning', md: '差一错误（off-by-one）是循环最高频的 bug。`i < n` 执行 n 次，`i <= n` 执行 n+1 次。写完循环，用 n=1 或 n=0 手算一遍边界。' },
        { type: 'compare', headers: ['', 'for', 'while'], rows: [
          ['适合场景', '次数已知', '次数未知、靠条件退出'],
          ['三要素位置', '初始化 / 条件 / 更新写在一行', '分散在循环前后'],
          ['常见风险', '边界写错', '忘记更新条件 → 死循环']
        ] },
        { type: 'code', lang: 'javascript', code: 'let sum = 0;\nfor (let i = 1; i <= 10; i++) {\n  sum += i;\n}\nconsole.log(sum);', runnable: true, output: '55' },
        { type: 'quiz', questionId: 'cs-loop-q2', purpose: '检验理解' },
        { type: 'tip', md: '`break` 立刻结束整个循环；`continue` 跳过本轮、进入下一轮。用它们之前，先确认不用它们也能写对。' },
        { type: 'quiz', questionId: 'cs-loop-q3', purpose: '检验理解' }
      ],
      workedExamples: [
        {
          questionId: 'cs-loop-ex',
          steps: [
            { no: 1, md: '初始 sum=0，i=1，条件 1<=3 成立。', askBefore: '循环开始前，sum 应该是多少？' },
            { no: 2, md: '第一轮 sum=0+1=1，i 变成 2。' },
            { no: 3, md: '第二轮 sum=1+2=3，i 变成 3。' },
            { no: 4, md: '第三轮 sum=3+3=6，i 变成 4，条件不成立，退出。' }
          ],
          takeaway: '循环题手动走三轮，边界自然清楚。'
        }
      ],
      guidedPractice: [
        { questionId: 'cs-loop-g1', hint: '先看条件 i < 4，再想 i 什么时候退出。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['cs-loop-i1', 'cs-loop-i2'],
      challenge: ['cs-loop-c1'],
      summary: {
        essence: '如果你只记一件事：写循环先定三件事——起点、终点、每步怎么变。',
        formulas: ['for (初始化; 条件; 更新) { ... }', 'while (条件) { ... }', 'break 结束循环；continue 跳过本轮'],
        pitfalls: ['i <= n 与 i < n 的边界混淆', 'while 忘记更新条件导致死循环', '在循环里重复声明累加变量，每次都归零'],
        checklist: ['我能用 for 写出 1 到 n 的累加', '我能判断循环执行次数', '我能解释死循环的成因并避免']
      },
      feynmanPrompt: '请用自己的话讲清楚：for 和 while 分别适合什么场景？循环边界为什么会多一次或少一次？'
    }
  ];

  Z.LESSON_BY_ID = {};
  Z.LESSONS.forEach(function (l) { Z.LESSON_BY_ID[l.id] = l; });
  Z.lessonsOfSubject = function (subject) {
    return Z.LESSONS.filter(function (l) { return l.subject === subject; })
      .sort(function (a, b) { return a.level - b.level; });
  };
  Z.lessonsOfKp = function (kpId) {
    return Z.LESSONS.filter(function (l) { return l.kpIds.indexOf(kpId) >= 0; });
  };
})(window.ZSB = window.ZSB || {});
