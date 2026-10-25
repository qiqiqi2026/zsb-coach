/* 数学扩展讲义：每个考点一份，含图解、推导与易错点 */
(function (Z) {
  Z.LESSONS.push(
    {
      id: 'math-limit-def-L1',
      kpIds: ['math-limit-def'],
      subject: 'math',
      level: 1,
      title: '极限：从「靠近」开始理解',
      estMinutes: 40,
      prerequisites: ['math-limit-def'],
      unlockRule: {},
      hook: { title: '极限到底在求什么？', body: '不是求「到了那个点是多少」，而是求「无限靠近时，函数值往哪里走」。' },
      sections: [
        { type: 'text', md: '极限是数分析的地基。**它描述的是趋势，不是到达。** 这一课先把「无限靠近」讲成人话，再认识左极限、右极限和极限存在的条件。' },
        { type: 'diagram', diagramId: 'limit-approach', caption: '从两侧无限靠近 a' },
        { type: 'text', md: '**直觉：无限靠近**\n让 x 一次次靠近 a，但不等于 a，观察 f(x) 是否稳定地靠近某个数 L。如果无论从左边还是右边靠近，都靠近同一个 L，就说极限是 L。' },
        { type: 'text', md: '**左极限与右极限**\n左极限记作 lim_{x→a−}，表示从比 a 小的方向靠近；右极限 lim_{x→a+}，从比 a 大的方向靠近。两者都存在且相等，极限才存在。' },
        { type: 'text', md: '**极限与函数值无关**\n函数在 a 点可以没有定义，极限仍然可能存在。例如 (x^2−1)/(x−1) 在 x=1 无定义，但 x→1 时极限是 2。' },
        { type: 'text', md: '**无穷与无穷大**\nx→∞ 时看 x 越来越大时函数的趋势；lim f(x)=∞ 表示函数值无限增大，不是「等于一个叫无穷的数」。' },
        { type: 'analogy', title: '极限像导航里的「预计到达」', md: '你还没到目的地，但导航根据你的方向判断你会到达哪里。极限看的不是你此刻在哪，而是你一直往哪走。' },
        { type: 'compare', headers: '情形,极限,函数值', rows: '(x^2−1)/(x−1) 在 x=1,2,无定义,f(x)=x^2 在 x=1,1,1,分段函数跳跃点,不存在,可能有定义' },
        { type: 'formula', latex: 'lim_{x→a} f(x)=L ⇔ lim_{x→a−} f(x)=lim_{x→a+} f(x)=L', caption: '极限存在的充要条件' },
        { type: 'warning', md: '**0/0 不是答案**。0/0 只说明需要继续变形，不能直接写 0 或「不存在」。' },
        { type: 'tip', md: '先代入。能直接算出实数就结束；出现 0/0、∞/∞ 再考虑因式分解、有理化、等价无穷小。' },
        { type: 'diagram', diagramId: 'continuity-gap', caption: '极限与函数值可以不是一回事' },
        { type: 'quiz', questionId: 'math2-limit-1', purpose: '0/0 型处理' }
      ],
      workedExamples: [
        { title: '0/0 型因式分解', steps: [
           { no: 1, md: '求 lim_{x→1} (x^2−1)/(x−1)。', askBefore: true },
           { no: 2, md: '直接代入得 0/0。', askBefore: true },
           { no: 3, md: '因式分解：x^2−1=(x−1)(x+1)。', askBefore: true },
           { no: 4, md: '约去 x−1，得 x+1。', askBefore: true },
           { no: 5, md: 'x→1 时结果为 2。' }
        ], takeaway: '0/0 先找公因式，约掉后再代入。' },
        { title: '左右极限判断', steps: [
           { no: 1, md: 'f(x)=|x|/x，考察 x→0。', askBefore: true },
           { no: 2, md: 'x<0 时 f(x)=−1，左极限 −1。', askBefore: true },
           { no: 3, md: 'x>0 时 f(x)=1，右极限 1。', askBefore: true },
           { no: 4, md: '左右不相等，极限不存在。' }
        ], takeaway: '分段/绝对值函数，先分左右。' }
      ],
      guidedPractice: [
        { questionId: 'math2-limit-4', hint: '3x+1 是多项式，直接代入 x=2。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['math2-limit-2', 'math2-limit-3'],
      challenge: ['math2-limit-5'],
      summary: {
        essence: '极限描述无限靠近时的趋势，与函数在该点是否有定义无关。',
        formulas: ['lim_{x→a} f(x)=L', '左极限 = 右极限 ⇒ 极限存在', 'x→∞ 时看远端趋势'],
        pitfalls: ['把 0/0 当答案', '把极限值当函数值', '忽略左右极限', '无穷大当普通数运算'],
        checklist: ['我能用自己的话解释极限', '我知道极限与函数值的区别', '我会分左右极限', '我能处理简单 0/0 型']
      },
      feynmanPrompt: '请用「无限靠近但不等于」解释极限，并举一个函数值不存在但极限存在的例子。'
    },
    {
      id: 'math-limit-calc-L2',
      kpIds: ['math-limit-calc'],
      subject: 'math',
      level: 2,
      title: '极限计算：先分类，再选工具',
      estMinutes: 40,
      prerequisites: ['math-limit-calc'],
      unlockRule: { fromLessonId: 'math-limit-def-L1', minQuizRate: 0.6 },
      hook: { title: '一算极限就卡在 0/0', body: '不是不会算，是没先判断类型。类型决定方法：约分、有理化、等价替换还是洛必达。' },
      sections: [
        { type: 'text', md: '极限计算有一套固定流程：**先代入 → 判断类型 → 选方法 → 化简 → 再代入**。这一课把专升本最常见的四类题拆开练。' },
        { type: 'diagram', diagramId: 'limit-approach', caption: '先看趋近方向与类型' },
        { type: 'text', md: '**能直接代入就先代入**\n多项式、连续函数在定义点直接代入即可。不要所有题都套洛必达。' },
        { type: 'text', md: '**0/0 型：因式分解或有理化**\n多项式优先因式分解约分；含根号优先分子有理化；三角/指数优先等价无穷小。' },
        { type: 'text', md: '**∞/∞ 型：抓最高次**\n分子分母同除以最高次幂，或者直接比较最高次项系数。' },
        { type: 'text', md: '**重要极限与等价无穷小**\nlim sin x/x=1；x→0 时 sin x~x，tan x~x，1−cos x~x^2/2，e^x−1~x，ln(1+x)~x。等价替换只在乘除中放心用。' },
        { type: 'analogy', title: '极限计算像分诊', md: '先量体温（代入），判断是哪种病（0/0、∞/∞、∞−∞），再挂对应科室（约分、有理化、等价替换、洛必达）。上来就开药，容易用错。' },
        { type: 'compare', headers: '类型,首选方法,注意', rows: '0/0 多项式,因式分解约分,约分后别再代原分母,0/0 含根号,有理化,乘共轭式,∞/∞,除以最高次幂,看最高次系数,0·∞,改写为 0/0 或 ∞/∞,再洛必达' },
        { type: 'formula', latex: 'sin x ~ x, 1−cos x ~ x^2/2, e^x−1 ~ x', caption: 'x→0 常用等价无穷小' },
        { type: 'warning', md: '等价无穷小不能随便在加减中替换。sin x−x 不能直接替换成 x−x=0，会丢掉真正的最低阶项。' },
        { type: 'tip', md: '做完问一句：这个答案代入原式合理吗？比如 0/0 约分后得到 2，就比直接写 0 可信。' },
        { type: 'quiz', questionId: 'math2-limcalc-1', purpose: '约分求极限' }
      ],
      workedExamples: [
        { title: '根式有理化', steps: [
           { no: 1, md: '求 lim_{x→0} (√(x+1)−1)/x。', askBefore: true },
           { no: 2, md: '代入得 0/0。', askBefore: true },
           { no: 3, md: '分子分母同乘 √(x+1)+1。', askBefore: true },
           { no: 4, md: '分子变成 x，约去 x。', askBefore: true },
           { no: 5, md: '结果 1/(√(x+1)+1)→1/2。' }
        ], takeaway: '含根号的 0/0，先有理化。' },
        { title: '∞/∞ 抓最高次', steps: [
           { no: 1, md: '求 lim_{x→∞} (2x^2+1)/(x^2−3)。', askBefore: true },
           { no: 2, md: '分子分母同除以 x^2。', askBefore: true },
           { no: 3, md: '得 (2+1/x^2)/(1−3/x^2)。', askBefore: true },
           { no: 4, md: 'x→∞ 时小项趋 0，结果 2。' }
        ], takeaway: '最高次幂相同，极限是系数比。' }
      ],
      guidedPractice: [
        { questionId: 'math2-limcalc-3', hint: '∞/∞ 型，分子分母同除以 x^2。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['math2-limcalc-2', 'math2-limcalc-4'],
      challenge: ['math2-limcalc-5'],
      summary: {
        essence: '极限计算先代入判型，再按类型选约分、有理化、等价替换或洛必达。',
        formulas: ['sin x/x→1', '1−cos x ~ x^2/2', '∞/∞ 比较最高次', '0/0 先约分或有理化'],
        pitfalls: ['不判型直接洛必达', '加减中滥用等价替换', '有理化忘记乘共轭', '约分后分母代回 0'],
        checklist: ['我会先代入判型', '我会因式分解约分', '我会有理化', '我会抓最高次幂']
      },
      feynmanPrompt: '请总结：遇到 0/0 和 ∞/∞ 两类极限，你分别先做什么？各举一题。'
    },
    {
      id: 'math-continuity-L2',
      kpIds: ['math-continuity'],
      subject: 'math',
      level: 2,
      title: '连续与间断：函数能不能「一笔画」',
      estMinutes: 35,
      prerequisites: ['math-continuity'],
      unlockRule: { fromLessonId: 'math-limit-calc-L2', minQuizRate: 0.6 },
      hook: { title: '连续到底要满足几个条件？', body: '不是「图像连在一起」这么模糊。连续有三个硬条件，少一个就断。' },
      sections: [
        { type: 'text', md: '连续是导数存在的前提，也是闭区间最值定理的条件。**连续 = 函数值存在 + 极限存在 + 两者相等**。这一课用图像和分段函数把三类间断点讲清。' },
        { type: 'diagram', diagramId: 'continuity-gap', caption: '可去、跳跃、无穷三类间断' },
        { type: 'text', md: '**连续的三步定义**\n① f(x0) 有定义；② lim_{x→x0} f(x) 存在；③ 极限值等于函数值。三步都满足才连续。' },
        { type: 'text', md: '**可去间断点**\n极限存在，但函数值不存在或不等。补一个点就能连续，例如 (x^2−1)/(x−1) 在 x=1。' },
        { type: 'text', md: '**跳跃间断点**\n左右极限都存在但不相等，图像在断点处「跳一下」。例如 |x|/x 在 x=0。' },
        { type: 'text', md: '**无穷间断点**\n极限趋于无穷，图像有垂直渐近线。例如 1/x 在 x=0。' },
        { type: 'analogy', title: '连续像一条没有断点的路', md: '可去间断是路上有个小洞，补上就能走；跳跃间断是路突然抬高；无穷间断是路直接冲向天空。' },
        { type: 'compare', headers: '类型,左极限,右极限,函数值', rows: '可去,存在,相同,不存在或不等,跳跃,存在,不同,可有可无,无穷,∞,∞,不存在' },
        { type: 'formula', latex: 'lim_{x→x0} f(x)=f(x0)', caption: '连续的核心等式' },
        { type: 'warning', md: '**有定义不等于连续**。分段函数在分界点要分别算左右极限，再与函数值比较。' },
        { type: 'tip', md: '判断分段函数连续，固定三步：算左极限、算右极限、算函数值，最后写成等式。' },
        { type: 'diagram', diagramId: 'limit-approach', caption: '左右极限决定断点类型' },
        { type: 'quiz', questionId: 'math2-cont-1', purpose: '连续定义' }
      ],
      workedExamples: [
        { title: '补定义使连续', steps: [
           { no: 1, md: 'f(x)=(x^2−1)/(x−1)，x≠1。', askBefore: true },
           { no: 2, md: '化简 f(x)=x+1。', askBefore: true },
           { no: 3, md: 'x→1 时极限为 2。', askBefore: true },
           { no: 4, md: '定义 f(1)=2，则函数在 x=1 连续。' }
        ], takeaway: '极限存在但函数值缺失，补上即可去间断。' },
        { title: '分段点连续性', steps: [
           { no: 1, md: 'f(x)=x^2+a (x≤1)，f(x)=2x (x>1)。', askBefore: true },
           { no: 2, md: '左极限：1+a。', askBefore: true },
           { no: 3, md: '右极限：2。', askBefore: true },
           { no: 4, md: '连续要求 1+a=2，得 a=1。' }
        ], takeaway: '分界点连续，左右极限必须相等。' }
      ],
      guidedPractice: [
        { questionId: 'math2-cont-3', hint: '连续要求 f(1)=1+a=3，解出 a。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['math2-cont-2', 'math2-cont-4'],
      challenge: ['math2-cont-5'],
      summary: {
        essence: '连续要求函数值、极限都存在且相等；间断点按左右极限分类。',
        formulas: ['lim f(x)=f(x0)', '可去：极限存在、值不等', '跳跃：左右极限不等', '无穷：极限为 ∞'],
        pitfalls: ['只看图像不验算', '忘记函数值', '分段点只算一侧', '把可导与连续混为一谈'],
        checklist: ['我能说出连续三个条件', '我能判断三类间断点', '我会算分段点左右极限', '我知道连续不一定可导']
      },
      feynmanPrompt: '请用三个条件解释什么是连续，并各举一个可去间断和跳跃间断的例子。'
    },
    {
      id: 'math-deriv-apply-L2',
      kpIds: ['math-deriv-apply'],
      subject: 'math',
      level: 2,
      title: '单调性、极值与最值：用导数看走势',
      estMinutes: 45,
      prerequisites: ['math-deriv-apply'],
      unlockRule: { fromLessonId: 'math-deriv-basic-L2', minQuizRate: 0.6 },
      hook: { title: '知道导数公式，还是不会做应用题', body: '因为应用题考的不是求导，而是用导数符号判断升降、找转折点。' },
      sections: [
        { type: 'text', md: '导数告诉你函数往哪走：**f′>0 递增，f′<0 递减**。导数由正变负是极大值，由负变正是极小值。闭区间最值再比较端点和驻点。' },
        { type: 'diagram', diagramId: 'extremum-curve', caption: '升降转折处是极值' },
        { type: 'text', md: '**单调区间**\n先求定义域，再求 f′(x)，解 f′>0 和 f′<0 的区间。导数符号表比背结论可靠。' },
        { type: 'text', md: '**极值判别**\nf′(x0)=0 只是驻点，还要看两侧符号。左正右负是极大值，左负右正是极小值，符号不变则不是极值。' },
        { type: 'text', md: '**闭区间最值**\n先找区间内所有驻点和不可导点，再算这些点和两个端点的函数值，最大/最小者就是最值。' },
        { type: 'text', md: '**二阶导数辅助**\nf″(x0)>0 时曲线开口向上，是极小值；f″(x0)<0 时开口向下，是极大值。' },
        { type: 'analogy', title: '导数像山坡的坡度', md: '坡度为正是上坡，为负是下坡，坡度为 0 是山顶或谷底。山顶还是谷底，要看坡度的正负怎么变化。' },
        { type: 'compare', headers: 'f′符号,函数走势,可能结论', rows: '+ → −,先增后减,极大值,− → +,先减后增,极小值,+ → +,一直增,不是极值,− → −,一直减,不是极值' },
        { type: 'formula', latex: 'f′(x)>0 ⇒ 增；f′(x)<0 ⇒ 减', caption: '单调性与导数符号' },
        { type: 'warning', md: '**f′(x0)=0 不一定是极值**。f(x)=x^3 在 x=0 处导数为 0，但函数一直递增，不是极值。' },
        { type: 'tip', md: '做最值题先列表：区间、驻点、端点、函数值。表格列出来，答案基本不会漏。' },
        { type: 'diagram', diagramId: 'derivative-tangent', caption: '切线斜率就是导数值' },
        { type: 'quiz', questionId: 'math2-dapply-1', purpose: '极值计算' }
      ],
      workedExamples: [
        { title: '求极值', steps: [
           { no: 1, md: 'f(x)=x^2−4x+3。', askBefore: true },
           { no: 2, md: 'f′(x)=2x−4。', askBefore: true },
           { no: 3, md: '令 f′=0，得 x=2。', askBefore: true },
           { no: 4, md: 'f(2)=4−8+3=−1。', askBefore: true },
           { no: 5, md: 'f″=2>0，所以 x=2 是极小值点，极小值 −1。' }
        ], takeaway: '驻点代回原函数才是极值。' },
        { title: '闭区间最值', steps: [
           { no: 1, md: 'f(x)=−x^2+4x，区间 [0,3]。', askBefore: true },
           { no: 2, md: 'f′(x)=−2x+4，驻点 x=2。', askBefore: true },
           { no: 3, md: 'f(0)=0，f(2)=4，f(3)=3。', askBefore: true },
           { no: 4, md: '最大值为 4。' }
        ], takeaway: '端点必须参与比较。' }
      ],
      guidedPractice: [
        { questionId: 'math2-dapply-3', hint: '先求导，令导数为 0，再把驻点和端点都代回比较。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['math2-dapply-2', 'math2-dapply-4'],
      challenge: ['math2-dapply-5'],
      summary: {
        essence: '导数符号决定升降，符号变化决定极值，闭区间最值要比较端点和驻点。',
        formulas: ['f′>0 增，f′<0 减', '左正右负 → 极大', '左负右正 → 极小', '最值 = max/min{驻点值, 端点值}'],
        pitfalls: ['驻点当极值', '漏掉端点', '不写定义域', '二阶导判别方向搞反'],
        checklist: ['我会求单调区间', '我会判断极值类型', '我会求闭区间最值', '我知道 f′=0 不一定是极值']
      },
      feynmanPrompt: '请解释：为什么 f′(x0)=0 不能直接说明 x0 是极值？举一个反例。'
    },
    {
      id: 'math-tangent-L2',
      kpIds: ['math-tangent'],
      subject: 'math',
      level: 2,
      title: '切线、法线与微分：局部放大看直线',
      estMinutes: 35,
      prerequisites: ['math-tangent'],
      unlockRule: { fromLessonId: 'math-deriv-basic-L2', minQuizRate: 0.6 },
      hook: { title: '切线方程总写错', body: '多半是只算了斜率，忘了点，或者把「在点处」和「过点」混了。' },
      sections: [
        { type: 'text', md: '导数的几何意义就是切线斜率。**切线是曲线在某点附近的局部直线近似**。这一课把切线、法线、微分串起来，并区分两类切线题。' },
        { type: 'diagram', diagramId: 'derivative-tangent', caption: '割线逼近切线' },
        { type: 'text', md: '**切线斜率**\n曲线 y=f(x) 在 x0 处的切线斜率 k=f′(x0)。先求导，再代入 x0。' },
        { type: 'text', md: '**切线方程**\n用点斜式 y−y0=k(x−x0)，其中 y0=f(x0)。最后化成 y=kx+b 或一般式。' },
        { type: 'text', md: '**法线方程**\n法线与切线垂直，斜率 k⊥=−1/k（k≠0）。同样用点斜式。' },
        { type: 'text', md: '**「在点」与「过点」**\n「在点 P 处」P 是切点；「过点 P」P 不一定是切点，需要设切点 (t,f(t))，再用斜率条件解 t。' },
        { type: 'analogy', title: '切线像放大镜下的直线', md: '把曲线局部放大很多倍，弯曲线看起来就像一条直线。这条直线的斜率，就是该点的导数。' },
        { type: 'compare', headers: '题型,已知,做法', rows: '在点 P 处,P 是切点,k=f′(xP)，直接点斜式,过点 P,P 未必在曲线上,设切点 t，列斜率方程,法线,切线斜率 k,法线斜率 −1/k' },
        { type: 'formula', latex: 'y−f(x0)=f′(x0)(x−x0)', caption: '切线方程' },
        { type: 'warning', md: '**法线斜率是 −1/k，不是 −k**。切线斜率 2，法线斜率是 −1/2。' },
        { type: 'tip', md: '写完切线方程，把切点代进去检查：等式两边应该相等。' },
        { type: 'quiz', questionId: 'math2-tangent-1', purpose: '切线斜率' }
      ],
      workedExamples: [
        { title: '在点处求切线', steps: [
           { no: 1, md: 'y=x^2，点 (1,1)。', askBefore: true },
           { no: 2, md: 'y′=2x，k=2。', askBefore: true },
           { no: 3, md: '点斜式 y−1=2(x−1)。', askBefore: true },
           { no: 4, md: '化简 y=2x−1。' }
        ], takeaway: '先求导得斜率，再代点。' },
        { title: '求法线', steps: [
           { no: 1, md: 'y=x^3，点 (1,1)。', askBefore: true },
           { no: 2, md: 'y′=3x^2，切线斜率 3。', askBefore: true },
           { no: 3, md: '法线斜率 −1/3。', askBefore: true },
           { no: 4, md: '法线：y−1=−1/3(x−1)。' }
        ], takeaway: '法线斜率取负倒数。' }
      ],
      guidedPractice: [
        { questionId: 'math2-tangent-2', hint: '先求导得斜率 2，再用点 (1,1) 写点斜式。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['math2-tangent-3', 'math2-tangent-4'],
      challenge: ['math2-tangent-5'],
      summary: {
        essence: '切线斜率是导数值；切线用点斜式，法线斜率取负倒数。',
        formulas: ['k=f′(x0)', 'y−f(x0)=f′(x0)(x−x0)', 'k法=−1/k切'],
        pitfalls: ['只算斜率不代点', '法线斜率写成 −k', '在点/过点混淆', '切点坐标代错'],
        checklist: ['我会求切线斜率', '我会写切线方程', '我会求法线', '我能区分在点与过点']
      },
      feynmanPrompt: '请解释导数的几何意义，并说明切线方程和法线方程分别怎么求。'
    },
    {
      id: 'math-integral-def-L2',
      kpIds: ['math-integral-def'],
      subject: 'math',
      level: 2,
      title: '定积分：把面积切成无数条',
      estMinutes: 40,
      prerequisites: ['math-integral-def'],
      unlockRule: { fromLessonId: 'math-limit-calc-L2', minQuizRate: 0.6 },
      hook: { title: '积分符号看得懂，意义说不清', body: '定积分不是魔法符号，它是「无数细长条面积之和」的极限。' },
      sections: [
        { type: 'text', md: '定积分从「求曲边梯形面积」来。**把区间切成很多小条，用矩形近似，再让条数趋于无穷**，和式的极限就是定积分。牛顿-莱布尼茨公式把这件事变成求原函数。' },
        { type: 'diagram', diagramId: 'integral-area', caption: '黎曼和逼近面积' },
        { type: 'text', md: '**几何意义**\nx 轴上方面积为正，下方面积为负，定积分是面积的代数和，不是简单总面积。' },
        { type: 'text', md: '**牛顿-莱布尼茨公式**\n∫_a^b f(x)dx=F(b)−F(a)，其中 F′(x)=f(x)。这是定积分计算的主通道。' },
        { type: 'text', md: '**常用性质**\n区间可加：∫_a^b=∫_a^c+∫_c^b；线性性质；上下限交换变号；奇函数在对称区间积分为 0，偶函数翻倍。' },
        { type: 'text', md: '**先看对称性**\n遇到对称区间先判断奇偶。奇函数直接 0，偶函数算一半乘 2，能省大量计算。' },
        { type: 'analogy', title: '积分像把地砖拼成地板', md: '先切成很多窄条（小矩形），每条面积≈高×宽；条越细，拼出来的总面积越接近真实面积。积分就是「细分到无穷」的总和。' },
        { type: 'compare', headers: '性质,公式,用途', rows: '区间可加,∫a→b=∫a→c+∫c→b,拆区间,奇函数,∫−a→a f=0,对称区间秒杀,偶函数,∫−a→a f=2∫0→a f,减半计算,上下限交换,∫a→b=−∫b→a,调整方向' },
        { type: 'formula', latex: '∫_a^b f(x)dx = F(b)−F(a)', caption: '牛顿-莱布尼茨公式' },
        { type: 'warning', md: '**定积分不是总面积**。x 轴下方的部分取负，计算面积时要另取绝对值或分区间。' },
        { type: 'tip', md: '先看区间是否对称、函数是否奇偶，再看能不能直接找原函数。顺序对了，计算量会小很多。' },
        { type: 'quiz', questionId: 'math2-idef-1', purpose: '定积分计算' }
      ],
      workedExamples: [
        { title: '直接算定积分', steps: [
           { no: 1, md: '∫_0^1 x dx。', askBefore: true },
           { no: 2, md: '原函数 x^2/2。', askBefore: true },
           { no: 3, md: '上限 1 得 1/2，下限 0 得 0。', askBefore: true },
           { no: 4, md: '结果 1/2。' }
        ], takeaway: '先找原函数，再上限减下限。' },
        { title: '奇偶性秒杀', steps: [
           { no: 1, md: '∫_{−1}^1 x^3 dx。', askBefore: true },
           { no: 2, md: '区间关于原点对称。', askBefore: true },
           { no: 3, md: 'x^3 是奇函数。', askBefore: true },
           { no: 4, md: '积分为 0。' }
        ], takeaway: '对称区间先看奇偶。' }
      ],
      guidedPractice: [
        { questionId: 'math2-idef-5', hint: '先找原函数 x^2+x，再代上下限。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['math2-idef-2', 'math2-idef-3'],
      challenge: ['math2-idef-4'],
      summary: {
        essence: '定积分是面积代数和的极限，用原函数在上下限的差来计算。',
        formulas: ['∫a→b f=F(b)−F(a)', '奇函数对称区间 = 0', '偶函数对称区间 = 2∫0→a', '∫a→b=−∫b→a'],
        pitfalls: ['上下限代反', '把代数和当总面积', '忘记奇偶性', '原函数求错'],
        checklist: ['我能解释定积分的几何意义', '我会用牛顿-莱布尼茨', '我会用奇偶性简化', '我知道定积分可为负']
      },
      feynmanPrompt: '请用「切条—求和—取极限」解释定积分，并说明为什么奇函数在对称区间积分为 0。'
    },
    {
      id: 'math-integral-calc-L2',
      kpIds: ['math-integral-calc'],
      subject: 'math',
      level: 2,
      title: '不定积分：把求导倒过来',
      estMinutes: 40,
      prerequisites: ['math-integral-calc'],
      unlockRule: { fromLessonId: 'math-deriv-basic-L2', minQuizRate: 0.6 },
      hook: { title: '积分公式记不住', body: '因为你在正面背。积分是求导的逆运算，反着记公式会轻松很多。' },
      sections: [
        { type: 'text', md: '不定积分就是**找谁求导等于被积函数**。结果要加常数 C。这一课先背基本表，再学换元法和分部积分。' },
        { type: 'diagram', diagramId: 'integral-area', caption: '积分与求导互逆' },
        { type: 'text', md: '**基本积分表**\n∫x^n dx=x^(n+1)/(n+1)+C（n≠−1）；∫1/x dx=ln|x|+C；∫e^x dx=e^x+C；∫cos x dx=sin x+C；∫sin x dx=−cos x+C。' },
        { type: 'text', md: '**为什么要 +C**\n常数的导数是 0，所以原函数有无穷多个，彼此只差一个常数。不定积分表示一整族函数。' },
        { type: 'text', md: '**换元法**\n看到复合函数，令 u=内层，du=内层导数 dx。换元后要记得回代。' },
        { type: 'text', md: '**分部积分**\n∫u dv=uv−∫v du。优先把容易求导的部分设为 u，例如 x 与 e^x、x 与 ln x。' },
        { type: 'analogy', title: '积分像倒放求导视频', md: '求导告诉你「怎么变」，积分问「原来是什么」。把导数公式倒过来看，就是积分公式。' },
        { type: 'compare', headers: '函数,不定积分,检查', rows: 'x^2,x^3/3+C,对 x^3/3 求导得 x^2,1/x,ln|x|+C,对 ln|x| 求导得 1/x,e^x,e^x+C,求导不变,cos x,sin x+C,sin 求导得 cos' },
        { type: 'formula', latex: '∫x^n dx = x^(n+1)/(n+1)+C (n≠−1)', caption: '幂函数积分公式' },
        { type: 'warning', md: '**不要漏 +C**；也不要写成 3x^2（那是导数）。积分的结果求导后应回到被积函数。' },
        { type: 'tip', md: '做完一道积分，立刻对它求导检查。能回到原式，基本就对了。' },
        { type: 'quiz', questionId: 'math2-icalc-1', purpose: '幂函数积分' }
      ],
      workedExamples: [
        { title: '幂函数积分', steps: [
           { no: 1, md: '∫x^2 dx。', askBefore: true },
           { no: 2, md: '指数 2 加 1 得 3。', askBefore: true },
           { no: 3, md: '除以 3，得 x^3/3。', askBefore: true },
           { no: 4, md: '加常数 C。' }
        ], takeaway: '指数加一，再除以新指数。' },
        { title: '换元积分', steps: [
           { no: 1, md: '∫2x e^{x^2} dx。', askBefore: true },
           { no: 2, md: '令 u=x^2，du=2x dx。', askBefore: true },
           { no: 3, md: '原式=∫e^u du=e^u+C。', askBefore: true },
           { no: 4, md: '回代得 e^{x^2}+C。' }
        ], takeaway: '换元后一定要回代。' }
      ],
      guidedPractice: [
        { questionId: 'math2-icalc-4', hint: 'sin x 求导得 cos x，所以 cos x 的原函数是 sin x。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['math2-icalc-2', 'math2-icalc-3'],
      challenge: ['math2-icalc-5'],
      summary: {
        essence: '不定积分是求导的逆运算，结果是一族函数，必须加 C。',
        formulas: ['∫x^n=x^(n+1)/(n+1)+C', '∫1/x=ln|x|+C', '∫e^x=e^x+C', '∫cos=sin+C，∫sin=−cos+C'],
        pitfalls: ['漏 +C', '幂函数指数除法写反', '换元忘记回代', '1/x 漏绝对值'],
        checklist: ['我会默写基本积分表', '我知道为什么加 C', '我会简单换元', '我会用求导检查积分']
      },
      feynmanPrompt: '请解释为什么不定积分要加 C，并用求导检查 ∫x^2 dx 的结果。'
    },
    {
      id: 'math-integral-apply-L3',
      kpIds: ['math-integral-apply'],
      subject: 'math',
      level: 3,
      title: '定积分应用：面积与旋转体体积',
      estMinutes: 45,
      prerequisites: ['math-integral-apply'],
      unlockRule: { fromLessonId: 'math-integral-def-L2', minQuizRate: 0.7 },
      hook: { title: '应用题列不出式子', body: '不是积分不会算，是没画图定上下限，也没判断谁在上、谁在下。' },
      sections: [
        { type: 'text', md: '定积分应用题有固定四步：**画图 → 定上下限 → 定被积函数 → 算积分**。面积用上减下，旋转体体积用 π∫y^2 dx。' },
        { type: 'diagram', diagramId: 'integral-area', caption: '先画图，再定上下限' },
        { type: 'text', md: '**面积：上减下**\n两条曲线之间的面积 S=∫_a^b (上曲线−下曲线)dx。上下写反会得负数，取绝对值也可补救。' },
        { type: 'text', md: '**找交点定上下限**\n联立两条曲线方程求交点，交点横坐标通常就是积分上下限。' },
        { type: 'text', md: '**旋转体体积：圆盘法**\n绕 x 轴旋转，V=π∫_a^b [f(x)]^2 dx。绕 y 轴时用 x^2 或壳层法。' },
        { type: 'text', md: '**分段处理**\n如果上下曲线在区间内交换，必须分段积分。先画图能看出来。' },
        { type: 'analogy', title: '积分应用像算地砖面积', md: '先量房间的左右边界（上下限），再看每块地砖的高度（上减下），把无数窄条面积加起来。' },
        { type: 'compare', headers: '问题,公式,关键', rows: '曲线间面积,∫(上−下)dx,找交点,x 轴面积,∫f(x)dx,下方取负,绕 x 轴体积,π∫y^2 dx,y 要平方,绕 y 轴体积,π∫x^2 dy,用 y 表示 x' },
        { type: 'formula', latex: 'S=∫_a^b [f(x)−g(x)]dx, V=π∫_a^b [f(x)]^2 dx', caption: '面积与旋转体体积' },
        { type: 'warning', md: '**旋转体公式里 y 要平方**，而且不要漏 π。V=π∫y^2 dx，不是 ∫y dx。' },
        { type: 'tip', md: '先画草图，标出交点和上下曲线。图画对了，式子基本就出来了。' },
        { type: 'quiz', questionId: 'math2-iapply-1', purpose: '面积计算' }
      ],
      workedExamples: [
        { title: '两曲线面积', steps: [
           { no: 1, md: '求 y=x 与 y=x^2 在 [0,1] 的面积。', askBefore: true },
           { no: 2, md: '交点 x=0,1。', askBefore: true },
           { no: 3, md: 'x 在 (0,1) 时 x>x^2，上曲线是 y=x。', askBefore: true },
           { no: 4, md: 'S=∫_0^1(x−x^2)dx=1/2−1/3=1/6。' }
        ], takeaway: '先判断谁在上，再上减下。' },
        { title: '旋转体体积', steps: [
           { no: 1, md: 'y=√x 在 [0,1] 绕 x 轴。', askBefore: true },
           { no: 2, md: 'V=π∫_0^1(√x)^2 dx。', askBefore: true },
           { no: 3, md: '=π∫_0^1 x dx。', askBefore: true },
           { no: 4, md: '=π/2。' }
        ], takeaway: 'y 平方后根号消失，计算变简单。' }
      ],
      guidedPractice: [
        { questionId: 'math2-iapply-2', hint: '先判断 y=x^2 在 [0,2] 位于 x 轴上方，再积分 x^2。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['math2-iapply-3', 'math2-iapply-4'],
      challenge: ['math2-iapply-5'],
      summary: {
        essence: '面积用上减下，体积用 π∫y^2 dx；先画图定限，再积分。',
        formulas: ['S=∫(上−下)dx', 'Vx=π∫y^2 dx', '交点定上下限', '分段处理交换'],
        pitfalls: ['上下曲线写反', '漏 π', '忘记平方 y', '交点算错导致上下限错'],
        checklist: ['我会画图找交点', '我会判断上下曲线', '我会用圆盘法求体积', '我会分段处理']
      },
      feynmanPrompt: '请用「画图—定限—上减下—积分」四步，讲清怎样求两曲线围成的面积。'
    }
  );
})(window.ZSB = window.ZSB || {});
