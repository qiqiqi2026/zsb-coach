/* 高数补齐包：12 个考点 × 4 题 + 12 份完整讲义 */
(function (Z) {
  Z.QUESTIONS.push.apply(Z.QUESTIONS, Z.makeQs([
    /* ---------- math-function ---------- */
    { id: 'bmath-func-1', kpIds: ['math-function'], subject: 'math', type: 'single',
      stem: '函数 f(x)=√(x−2)+1/(x−3) 的定义域是？',
      options: ['[2, +∞)', '(2, +∞)', '[2, 3)∪(3, +∞)', '(2, 3)∪(3, +∞)'],
      answer: 'C',
      analysis: { ans: 'C', why: '偶次根号要求被开方数非负，分母要求不为零，两个条件必须同时满足。', steps: '1. 根号部分要求 x−2≥0，得 x≥2。\n2. 分母部分要求 x−3≠0，得 x≠3。\n3. 同时满足：x≥2 且 x≠3。\n4. 写成区间为 [2, 3)∪(3, +∞)。', pit: '不要漏掉分母不为零，也不要把左端点写成开区间 (2, +∞)。' }, difficulty: 2, estSeconds: 60, skillTag: '定义域', source: '自建' },
    { id: 'bmath-func-2', kpIds: ['math-function'], subject: 'math', type: 'single',
      stem: '下列函数中是奇函数的是？',
      options: ['y = x^2', 'y = x^3', 'y = x^2 + 1', 'y = e^x'],
      answer: 'B',
      analysis: { ans: 'y = x^3', why: '奇函数要求定义域关于原点对称，且 f(−x)=−f(x)。', steps: '1. y=x^2：f(−x)=x^2=f(x)，是偶函数。\n2. y=x^3：f(−x)=−x^3=−f(x)，是奇函数。\n3. y=x^2+1：f(−x)=x^2+1=f(x)，是偶函数。\n4. y=e^x：f(−x)=e^(−x)≠−e^x，既不是奇函数也不是偶函数。', pit: '判断奇偶前先看定义域是否关于原点对称，不对称直接排除。' }, difficulty: 1, estSeconds: 45, skillTag: '奇偶性', source: '自建' },
    { id: 'bmath-func-3', kpIds: ['math-function'], subject: 'math', type: 'fill',
      stem: '设 f(x)=x^2+1，g(x)=2x，则 f(g(1))=______。',
      answer: '5', accept: ['5'],
      analysis: { ans: '5', why: '复合函数由内向外计算，先算 g(1)，再把结果代进 f。', steps: '1. g(1)=2×1=2。\n2. f(2)=2^2+1=4+1=5。\n3. 所以 f(g(1))=5。', pit: '不要先算 f(1) 再乘 2，复合顺序不能反。' }, difficulty: 1, estSeconds: 45, skillTag: '复合函数', source: '自建' },
    { id: 'bmath-func-4', kpIds: ['math-function'], subject: 'math', type: 'fill',
      stem: '设 f(x)=2x+3，则 f(f(0))=______。',
      answer: '9', accept: ['9'],
      analysis: { ans: '9', why: 'f(f(0)) 表示把 f(0) 的结果再作为输入代回 f。', steps: '1. f(0)=2×0+3=3。\n2. f(f(0))=f(3)。\n3. f(3)=2×3+3=9。', pit: 'f(f(0)) 不是 f(0) 的平方，不能算成 3^2。' }, difficulty: 1, estSeconds: 45, skillTag: '函数记号', source: '自建' },

    /* ---------- math-elementary ---------- */
    { id: 'bmath-elem-1', kpIds: ['math-elementary'], subject: 'math', type: 'single',
      stem: '函数 y=log_a x（a>0，a≠1）的定义域是？',
      options: ['x > 0', 'x ≥ 0', 'x ≠ 0', '全体实数'],
      answer: 'A',
      analysis: { ans: 'x > 0', why: '对数函数的真数必须严格大于零。', steps: '1. y=log_a x 要求真数 x>0。\n2. a>0 且 a≠1 是对底数的限制，与 x 的范围无关。\n3. 定义域为 (0, +∞)。', pit: '定义域只看真数 x>0，不要写成 x≥0。' }, difficulty: 1, estSeconds: 45, skillTag: '对数定义域', source: '自建' },
    { id: 'bmath-elem-2', kpIds: ['math-elementary'], subject: 'math', type: 'single',
      stem: '关于 y=e^x 的图像与性质，下列说法正确的是？',
      options: ['过点 (1, 0)，在 R 上单调递增', '过点 (0, 1)，在 R 上单调递增', '过点 (0, 1)，在 R 上单调递减', '过点 (1, 0)，在 R 上单调递减'],
      answer: 'B',
      analysis: { ans: 'B', why: '底数 e>1，指数函数单调递增；x=0 时 e^0=1，图像过 (0,1)。', steps: '1. e≈2.718>1，所以 y=e^x 在 R 上单调递增。\n2. 令 x=0，得 y=e^0=1，图像过点 (0,1)。\n3. 值域为 (0, +∞)，x 轴是水平渐近线。', pit: '不要与对数函数过点 (1,0) 混淆。' }, difficulty: 1, estSeconds: 45, skillTag: '指数函数图像', source: '自建' },
    { id: 'bmath-elem-3', kpIds: ['math-elementary'], subject: 'math', type: 'fill',
      stem: 'log_2 8 = ______。',
      answer: '3', accept: ['3'],
      analysis: { ans: '3', why: '对数就是求底数要几次方才等于真数。', steps: '1. 设 log_2 8=t。\n2. 等价于 2^t=8。\n3. 因为 2^3=8，所以 t=3。', pit: '对数的结果是指数，不要把底数 2 当成答案。' }, difficulty: 1, estSeconds: 40, skillTag: '对数运算', source: '自建' },
    { id: 'bmath-elem-4', kpIds: ['math-elementary'], subject: 'math', type: 'fill',
      stem: 'sin(π/6) = ______。',
      answer: '1/2', accept: ['1/2', '0.5'],
      analysis: { ans: '1/2', why: 'π/6 就是 30°，30° 的正弦值是 1/2。', steps: '1. π/6 对应 30°。\n2. 在 30° 的直角三角形中，对边是斜边的一半。\n3. 所以 sin(π/6)=1/2。', pit: '不要与 cos(π/3) 混淆：两者都等于 1/2，但对应的角不同。' }, difficulty: 1, estSeconds: 40, skillTag: '特殊角三角函数值', source: '自建' },

    /* ---------- math-infinity ---------- */
    { id: 'bmath-inf-1', kpIds: ['math-infinity'], subject: 'math', type: 'single',
      stem: '当 x→0 时，1−cos x 与下列哪个量等价？',
      options: ['x', 'x^2', 'x^2/2', '2x'],
      answer: 'C',
      analysis: { ans: 'x^2/2', why: '由半角公式可推出 1−cos x ~ x^2/2。', steps: '1. 1−cos x=2sin^2(x/2)。\n2. x→0 时 sin(x/2)~x/2。\n3. 所以 2·(x/2)^2=2·x^2/4=x^2/2。\n4. 即 1−cos x ~ x^2/2。', pit: '系数 1/2 最容易丢，写成 x^2 就错了。' }, difficulty: 2, estSeconds: 60, skillTag: '等价无穷小', source: '自建' },
    { id: 'bmath-inf-2', kpIds: ['math-infinity'], subject: 'math', type: 'single',
      stem: 'lim(x→0) (sin x − x)/x^3 等于？',
      options: ['0', '−1/6', '1/6', '不存在'],
      answer: 'B',
      analysis: { ans: '−1/6', why: '加减法中直接替换 sin x~x 会丢掉主项之后的最低阶项，必须保留到三阶。', steps: '1. 展开 sin x=x−x^3/6+o(x^3)。\n2. 分子 sin x−x=−x^3/6+o(x^3)。\n3. 除以 x^3 得 −1/6+o(1)。\n4. 极限为 −1/6。', pit: '若直接写 sin x~x，分子变成 x−x=0，会得出错误答案 0。' }, difficulty: 3, estSeconds: 90, skillTag: '等价替换的边界', source: '自建' },
    { id: 'bmath-inf-3', kpIds: ['math-infinity'], subject: 'math', type: 'fill',
      stem: 'lim(x→0) sin 5x/(3x) = ______。',
      answer: '5/3', accept: ['5/3'],
      analysis: { ans: '5/3', why: 'x→0 时 sin 5x~5x，可直接替换。', steps: '1. x→0 时 5x→0，所以 sin 5x~5x。\n2. 原式 ~ (5x)/(3x)。\n3. 约去 x 得 5/3。', pit: '不要把 sin 5x 换成 5x 后忘记分母的 3。' }, difficulty: 2, estSeconds: 50, skillTag: '等价无穷小替换', source: '自建' },
    { id: 'bmath-inf-4', kpIds: ['math-infinity'], subject: 'math', type: 'fill',
      stem: 'lim(x→0) (e^x − 1)/x = ______。',
      answer: '1', accept: ['1'],
      analysis: { ans: '1', why: 'x→0 时 e^x−1~x，这是最常用的等价无穷小之一。', steps: '1. 直接代入得 0/0。\n2. 使用 e^x−1~x。\n3. 原式 ~ x/x=1。', pit: '直接代入是 0/0，不能因此写 0 或不存在。' }, difficulty: 2, estSeconds: 50, skillTag: '等价无穷小替换', source: '自建' },

    /* ---------- math-lhopital ---------- */
    { id: 'bmath-lh-1', kpIds: ['math-lhopital'], subject: 'math', type: 'single',
      stem: '洛必达法则可以直接处理的基本未定式是？',
      options: ['0/0 型或 ∞/∞ 型', '任何形式的极限', '只有 0/0 型', '只有 ∞/∞ 型'],
      answer: 'A',
      analysis: { ans: '0/0 型或 ∞/∞ 型', why: '洛必达法则只针对这两类未定式，其他类型要先改写。', steps: '1. 先代入判断类型。\n2. 只有 0/0 与 ∞/∞ 可以直接对分子分母分别求导。\n3. 0·∞、∞−∞、1^∞ 等类型要先转化。\n4. 还要验证导数比的极限存在。', pit: '类型不对就用洛必达，是典型的概念性错误。' }, difficulty: 2, estSeconds: 50, skillTag: '洛必达适用条件', source: '自建' },
    { id: 'bmath-lh-2', kpIds: ['math-lhopital'], subject: 'math', type: 'single',
      stem: '下列极限中不能用洛必达法则求解的是？',
      options: ['lim(x→0) sin x/x', 'lim(x→∞) (x + sin x)/x', 'lim(x→0) (e^x − 1)/x', 'lim(x→0) (1 − cos x)/x^2'],
      answer: 'B',
      analysis: { ans: 'lim(x→∞) (x + sin x)/x', why: '该极限的导数比为 1+cos x，x→∞ 时振荡，导数比的极限不存在，洛必达失效。', steps: '1. 原式拆开：1 + sin x/x。\n2. |sin x|≤1，而 1/x→0，所以 sin x/x→0。\n3. 原极限为 1。\n4. 若用洛必达，导数比为 (1+cos x)/1，极限不存在，说明不能使用。\n5. 其余三项都满足 0/0 且导数比极限存在。', pit: '洛必达失效不代表原极限不存在，要换夹逼或拆项的方法。' }, difficulty: 3, estSeconds: 100, skillTag: '洛必达失效', source: '自建' },
    { id: 'bmath-lh-3', kpIds: ['math-lhopital'], subject: 'math', type: 'fill',
      stem: 'lim(x→0) (x − sin x)/x^3 = ______。',
      answer: '1/6', accept: ['1/6'],
      analysis: { ans: '1/6', why: '这是 0/0 型，连续求导两次后可用等价无穷小收尾。', steps: '1. 第一次洛必达：分子 1−cos x，分母 3x^2。\n2. 仍是 0/0，第二次洛必达：分子 sin x，分母 6x。\n3. 仍为 0/0，用 sin x~x，得 x/(6x)=1/6。\n4. 极限为 1/6。', pit: '每次求导后都要重新检查是否仍为 0/0，不能一次求导就代入。' }, difficulty: 3, estSeconds: 80, skillTag: '多次洛必达', source: '自建' },
    { id: 'bmath-lh-4', kpIds: ['math-lhopital'], subject: 'math', type: 'fill',
      stem: 'lim(x→0) ln(1+x)/x = ______。',
      answer: '1', accept: ['1'],
      analysis: { ans: '1', why: '0/0 型，可用洛必达，也可用等价无穷小 ln(1+x)~x。', steps: '1. 直接代入得 0/0。\n2. 洛必达：分子导数 1/(1+x)，分母导数 1。\n3. 原式极限 = lim(x→0) 1/(1+x)=1。', pit: '用等价无穷小时 ln(1+x)~x，同样得到 1，但不要写成 ln(1+x)=x。' }, difficulty: 2, estSeconds: 50, skillTag: '洛必达基本题', source: '自建' },

    /* ---------- math-chain ---------- */
    { id: 'bmath-chain-1', kpIds: ['math-chain'], subject: 'math', type: 'single',
      stem: 'y = sin(x^2) 的导数是？',
      options: ['cos(x^2)', '2x cos(x^2)', '2x sin(x^2)', 'x^2 cos(x^2)'],
      answer: 'B',
      analysis: { ans: '2x cos(x^2)', why: '外层是 sin，内层是 x^2，链式法则要乘内层导数。', steps: '1. 设 y=sin u，u=x^2。\n2. dy/du=cos u。\n3. du/dx=2x。\n4. 相乘得 y′=cos(x^2)·2x=2x cos(x^2)。', pit: '漏乘内层导数 2x 是链式法则最常见的错误。' }, difficulty: 2, estSeconds: 55, skillTag: '链式法则', source: '自建' },
    { id: 'bmath-chain-2', kpIds: ['math-chain'], subject: 'math', type: 'single',
      stem: 'y = e^(2x+1) 的导数是？',
      options: ['e^(2x+1)', '2e^(2x+1)', '(2x+1)e^(2x+1)', '2x e^(2x+1)'],
      answer: 'B',
      analysis: { ans: '2e^(2x+1)', why: '外层 e^u，内层 u=2x+1，内层导数为 2。', steps: '1. 设 y=e^u，u=2x+1。\n2. dy/du=e^u。\n3. du/dx=2。\n4. 相乘得 y′=2e^(2x+1)。', pit: '不要以为 e^(2x+1) 求导还是 e^(2x+1)。' }, difficulty: 2, estSeconds: 55, skillTag: '链式法则', source: '自建' },
    { id: 'bmath-chain-3', kpIds: ['math-chain'], subject: 'math', type: 'fill',
      stem: '设 y=(2x+1)^5，则 y′(0) = ______。',
      answer: '10', accept: ['10'],
      analysis: { ans: '10', why: '先求导，再把 x=0 代入。', steps: '1. y=(2x+1)^5。\n2. y′=5(2x+1)^4·2=10(2x+1)^4。\n3. 代入 x=0：10×1^4=10。', pit: '漏乘内层导数 2 会得到 5。' }, difficulty: 2, estSeconds: 60, skillTag: '链式法则求值', source: '自建' },
    { id: 'bmath-chain-4', kpIds: ['math-chain'], subject: 'math', type: 'fill',
      stem: '由方程 x^2+y^2=1 确定的隐函数 y=y(x)，则 y′ = ______（y≠0）。',
      answer: '-x/y', accept: ['-x/y', '−x/y'],
      analysis: { ans: '-x/y', why: '两边对 x 求导，把 y 看成 x 的函数，y^2 要用链式法则。', steps: '1. 方程 x^2+y^2=1。\n2. 两边对 x 求导：2x+2y·y′=0。\n3. 移项得 2y·y′=−2x。\n4. 解出 y′=−x/y（y≠0）。', pit: '对 y^2 求导是 2y·y′，不能只写 2y。' }, difficulty: 3, estSeconds: 75, skillTag: '隐函数求导', source: '自建' },

    /* ---------- math-higher ---------- */
    { id: 'bmath-higher-1', kpIds: ['math-higher'], subject: 'math', type: 'single',
      stem: 'y = x^3 的二阶导数是？',
      options: ['3x^2', '6x', '6', '6x^2'],
      answer: 'B',
      analysis: { ans: '6x', why: '二阶导数是对一阶导数再求一次导。', steps: '1. y=x^3。\n2. y′=3x^2。\n3. y′′=(3x^2)′=6x。', pit: '不要停留在 y′=3x^2，那是二阶导数的前一阶。' }, difficulty: 1, estSeconds: 45, skillTag: '二阶导数', source: '自建' },
    { id: 'bmath-higher-2', kpIds: ['math-higher'], subject: 'math', type: 'single',
      stem: 'y = e^x 的 n 阶导数是？',
      options: ['e^x', 'n e^x', 'x e^x', 'e^x/n'],
      answer: 'A',
      analysis: { ans: 'e^x', why: 'e^x 求导后仍是 e^x，所以任意阶导数都不变。', steps: '1. y=e^x。\n2. y′=e^x。\n3. 再求导仍是 e^x。\n4. 归纳得 y^(n)=e^x。', pit: 'e^(ax) 的 n 阶导数是 a^n e^(ax)，不要与 e^x 混为一谈。' }, difficulty: 2, estSeconds: 45, skillTag: 'n 阶导数', source: '自建' },
    { id: 'bmath-higher-3', kpIds: ['math-higher'], subject: 'math', type: 'fill',
      stem: 'y = sin x 的二阶导数 y″ = ______。',
      answer: '-sin x', accept: ['-sin x', '−sin x'],
      analysis: { ans: '-sin x', why: 'sin 求导一次得 cos，再求导一次得 −sin。', steps: '1. y=sin x。\n2. y′=cos x。\n3. y″=(cos x)′=−sin x。', pit: 'sin 的二阶导是 −sin，cos 的二阶导是 −cos，别把符号丢掉。' }, difficulty: 1, estSeconds: 45, skillTag: '二阶导数', source: '自建' },
    { id: 'bmath-higher-4', kpIds: ['math-higher'], subject: 'math', type: 'fill',
      stem: 'y = x^4 的三阶导数 y‴ = ______。',
      answer: '24x', accept: ['24x'],
      analysis: { ans: '24x', why: '连续求导三次即可。', steps: '1. y=x^4。\n2. y′=4x^3。\n3. y″=12x^2。\n4. y‴=24x。', pit: '第三次求导后还有 x，不要提前写成常数 24。' }, difficulty: 2, estSeconds: 50, skillTag: '高阶导数', source: '自建' },

    /* ---------- math-concavity ---------- */
    { id: 'bmath-concav-1', kpIds: ['math-concavity'], subject: 'math', type: 'single',
      stem: '若在某区间内 f″(x)>0，则曲线在该区间内？',
      options: ['单调递增', '单调递减', '是凹的（开口向上）', '是凸的（开口向下）'],
      answer: 'C',
      analysis: { ans: '是凹的（开口向上）', why: '二阶导数为正说明切线斜率递增，曲线开口向上。', steps: '1. f″>0 表示 f′ 递增，即切线斜率越来越大。\n2. 曲线弯曲方向为开口向上，称为凹。\n3. f″<0 则开口向下，称为凸。', pit: '凹凸看 f″ 的符号，单调性看 f′ 的符号，两套判断不能混。' }, difficulty: 2, estSeconds: 55, skillTag: '凹凸性判别', source: '自建' },
    { id: 'bmath-concav-2', kpIds: ['math-concavity'], subject: 'math', type: 'single',
      stem: '曲线 y = x^4 在 (−∞, +∞) 上的凹凸性是？',
      options: ['在 (−∞, +∞) 上是凹的', '在 (−∞, +∞) 上是凸的', '在 x=0 两侧先凹后凸', '在 x=0 两侧先凸后凹'],
      answer: 'A',
      analysis: { ans: '在 (−∞, +∞) 上是凹的', why: 'y″=12x^2 恒大于等于零，且只在 x=0 取零，两侧不变号。', steps: '1. y=x^4。\n2. y′=4x^3。\n3. y″=12x^2≥0。\n4. 对任意 x≠0 都有 y″>0，所以整个区间上都是凹的。\n5. x=0 两侧 y″ 都为正，不变号，因此 (0,0) 不是拐点。', pit: 'y″=0 只是拐点的候选条件，必须两侧变号才算拐点。' }, difficulty: 3, estSeconds: 80, skillTag: '凹凸区间', source: '自建' },
    { id: 'bmath-concav-3', kpIds: ['math-concavity'], subject: 'math', type: 'fill',
      stem: '曲线 y = x^3 − 3x^2 + 1 的拐点横坐标是 x = ______。',
      answer: '1', accept: ['1'],
      analysis: { ans: '1', why: '先解 y″=0，再验证两侧二阶导变号。', steps: '1. y=x^3−3x^2+1。\n2. y′=3x^2−6x。\n3. y″=6x−6。\n4. 令 y″=0 得 x=1。\n5. x<1 时 y″<0，x>1 时 y″>0，两侧变号，所以 x=1 是拐点横坐标。', pit: '只解出 y″=0 还不算完，必须验证变号。' }, difficulty: 3, estSeconds: 80, skillTag: '拐点', source: '自建' },
    { id: 'bmath-concav-4', kpIds: ['math-concavity'], subject: 'math', type: 'fill',
      stem: '曲线 y = x^3 的拐点坐标是 ______。',
      answer: '(0,0)', accept: ['(0,0)', '（0,0）'],
      analysis: { ans: '(0,0)', why: 'y″=6x 在 x=0 两侧变号，且拐点在曲线上。', steps: '1. y=x^3。\n2. y′=3x^2。\n3. y″=6x。\n4. x=0 时 y″=0；x<0 时 y″<0，x>0 时 y″>0，变号。\n5. x=0 时 y=0，拐点坐标为 (0,0)。', pit: '拐点是曲线上的点，要写坐标，不能只写 x=0。' }, difficulty: 2, estSeconds: 60, skillTag: '拐点坐标', source: '自建' },

    /* ---------- math-mvt ---------- */
    { id: 'bmath-mvt-1', kpIds: ['math-mvt'], subject: 'math', type: 'single',
      stem: '罗尔定理成立需要满足的条件是？',
      options: ['闭区间连续、开区间可导', '闭区间连续、端点函数值相等', '闭区间连续、开区间可导、端点函数值相等', '开区间可导、端点函数值相等'],
      answer: 'C',
      analysis: { ans: 'C', why: '罗尔定理是拉格朗日中值定理在 f(a)=f(b) 时的特例，三个条件缺一不可。', steps: '1. f 在闭区间 [a,b] 上连续。\n2. f 在开区间 (a,b) 内可导。\n3. f(a)=f(b)。\n4. 结论：存在 ξ∈(a,b)，使 f′(ξ)=0。', pit: '端点值相等是罗尔定理区别于拉格朗日定理的关键条件。' }, difficulty: 2, estSeconds: 60, skillTag: '罗尔定理条件', source: '自建' },
    { id: 'bmath-mvt-2', kpIds: ['math-mvt'], subject: 'math', type: 'single',
      stem: '对 f(x)=x^2 在区间 [0,2] 上用拉格朗日中值定理，得到的 ξ 是？',
      options: ['1/2', '1', '3/2', '2'],
      answer: 'B',
      analysis: { ans: '1', why: '拉格朗日中值定理：f′(ξ)=(f(b)−f(a))/(b−a)。', steps: '1. f(2)=4，f(0)=0。\n2. (f(2)−f(0))/(2−0)=(4−0)/2=2。\n3. f′(x)=2x，令 2ξ=2。\n4. ξ=1，且 1∈(0,2)，符合要求。', pit: '算完要检查 ξ 是否落在开区间内。' }, difficulty: 2, estSeconds: 65, skillTag: '拉格朗日中值定理', source: '自建' },
    { id: 'bmath-mvt-3', kpIds: ['math-mvt'], subject: 'math', type: 'fill',
      stem: '对 f(x)=x^3 在区间 [0,1] 上用拉格朗日中值定理，得到的 ξ = ______。',
      answer: '√3/3', accept: ['√3/3', '1/√3'],
      analysis: { ans: '√3/3', why: '先算差商，再令导数等于差商。', steps: '1. f(1)=1，f(0)=0，差商为 (1−0)/(1−0)=1。\n2. f′(x)=3x^2。\n3. 令 3ξ^2=1，得 ξ^2=1/3。\n4. ξ∈(0,1)，取正根 ξ=1/√3=√3/3。', pit: '开区间 (0,1) 内只能取正根，负根不符合条件。' }, difficulty: 3, estSeconds: 80, skillTag: '拉格朗日中值定理', source: '自建' },
    { id: 'bmath-mvt-4', kpIds: ['math-mvt'], subject: 'math', type: 'fill',
      stem: '罗尔定理的结论是：存在 ξ∈(a,b)，使 f′(ξ) = ______。',
      answer: '0', accept: ['0'],
      analysis: { ans: '0', why: '端点函数值相等时，区间内必有一点切线水平。', steps: '1. 罗尔定理条件：闭区间连续、开区间可导、f(a)=f(b)。\n2. 结论：存在 ξ∈(a,b)。\n3. 使 f′(ξ)=0。', pit: 'ξ 必须写在开区间 (a,b) 内，不能写成闭区间端点。' }, difficulty: 1, estSeconds: 45, skillTag: '罗尔定理结论', source: '自建' },

    /* ---------- math-integral-sub ---------- */
    { id: 'bmath-isub-1', kpIds: ['math-integral-sub'], subject: 'math', type: 'single',
      stem: '∫_0^1 2x(x^2+1)^3 dx 等于？',
      options: ['15/4', '7/4', '15/2', '4'],
      answer: 'A',
      analysis: { ans: '15/4', why: '令 u=x^2+1，恰好凑出 du=2x dx，同时换上下限。', steps: '1. 令 u=x^2+1，则 du=2x dx。\n2. x=0 时 u=1；x=1 时 u=2。\n3. 原式=∫_1^2 u^3 du。\n4. =[u^4/4]_1^2=(16−1)/4=15/4。', pit: '换元后必须换上下限，不能仍代 0 和 1。' }, difficulty: 3, estSeconds: 90, skillTag: '定积分换元', source: '自建' },
    { id: 'bmath-isub-2', kpIds: ['math-integral-sub'], subject: 'math', type: 'single',
      stem: '∫_0^1 e^(2x) dx 等于？',
      options: ['(e^2 − 1)/2', '(e^2 + 1)/2', 'e^2 − 1', '2(e^2 − 1)'],
      answer: 'A',
      analysis: { ans: '(e^2 − 1)/2', why: '令 u=2x，则 dx=du/2，必须补上系数 1/2。', steps: '1. 令 u=2x，du=2 dx，所以 dx=du/2。\n2. x=0 时 u=0；x=1 时 u=2。\n3. 原式=(1/2)∫_0^2 e^u du。\n4. =(1/2)(e^2−1)。', pit: '忘记乘 1/2 会错写成 e^2−1。' }, difficulty: 2, estSeconds: 70, skillTag: '定积分换元', source: '自建' },
    { id: 'bmath-isub-3', kpIds: ['math-integral-sub'], subject: 'math', type: 'fill',
      stem: '∫_0^1 x e^(x^2) dx = ______。',
      answer: '(e-1)/2', accept: ['(e-1)/2', '(e−1)/2', '1/2(e-1)'],
      analysis: { ans: '(e−1)/2', why: '令 u=x^2，凑出 x dx=du/2。', steps: '1. 令 u=x^2，则 du=2x dx，x dx=du/2。\n2. x=0 时 u=0；x=1 时 u=1。\n3. 原式=(1/2)∫_0^1 e^u du。\n4. =(1/2)(e−1)。', pit: 'x dx 要整体凑成 du/2，不能只换 e 的指数。' }, difficulty: 3, estSeconds: 80, skillTag: '定积分换元', source: '自建' },
    { id: 'bmath-isub-4', kpIds: ['math-integral-sub'], subject: 'math', type: 'fill',
      stem: '∫_0^1 x√(1+x^2) dx = ______。',
      answer: '(2√2-1)/3', accept: ['(2√2-1)/3', '(2√2−1)/3'],
      analysis: { ans: '(2√2−1)/3', why: '令 u=1+x^2，则 x dx=du/2，被积函数化为幂函数。', steps: '1. 令 u=1+x^2，du=2x dx，x dx=du/2。\n2. x=0 时 u=1；x=1 时 u=2。\n3. 原式=(1/2)∫_1^2 u^(1/2) du。\n4. =(1/2)·(2/3)[u^(3/2)]_1^2。\n5. =(1/3)(2√2−1)。', pit: '幂函数积分指数加一后要除以新指数，别漏 2/3。' }, difficulty: 3, estSeconds: 100, skillTag: '定积分换元', source: '自建' },

    /* ---------- math-integral-parts ---------- */
    { id: 'bmath-iparts-1', kpIds: ['math-integral-parts'], subject: 'math', type: 'single',
      stem: '∫ x e^x dx 等于？',
      options: ['x e^x + C', '(x − 1)e^x + C', '(x + 1)e^x + C', 'x^2 e^x/2 + C'],
      answer: 'B',
      analysis: { ans: '(x−1)e^x + C', why: '按「反对幂指三」选 u=x，dv=e^x dx。', steps: '1. 令 u=x，dv=e^x dx。\n2. du=dx，v=e^x。\n3. ∫x e^x dx=x e^x−∫e^x dx。\n4. =x e^x−e^x+C=(x−1)e^x+C。', pit: '不要漏写积分常数 C。' }, difficulty: 2, estSeconds: 70, skillTag: '分部积分', source: '自建' },
    { id: 'bmath-iparts-2', kpIds: ['math-integral-parts'], subject: 'math', type: 'single',
      stem: '∫_0^1 x e^x dx 等于？',
      options: ['1', 'e − 1', 'e', '2'],
      answer: 'A',
      analysis: { ans: '1', why: '先求原函数，再用牛顿−莱布尼茨公式代上下限。', steps: '1. 由 ∫x e^x dx=(x−1)e^x+C。\n2. 原式=[(x−1)e^x]_0^1。\n3. 上限：0×e=0；下限：(−1)×e^0=−1。\n4. 0−(−1)=1。', pit: '下限代入得 −1，减去它要变加一，符号最容易错。' }, difficulty: 3, estSeconds: 80, skillTag: '定积分分部', source: '自建' },
    { id: 'bmath-iparts-3', kpIds: ['math-integral-parts'], subject: 'math', type: 'fill',
      stem: '∫ ln x dx = ______。',
      answer: 'x ln x - x + C', accept: ['x ln x - x + C', 'xlnx-x+C', 'x ln x − x + C'],
      analysis: { ans: 'x ln x − x + C', why: '对数函数没有直接的原函数，令 u=ln x，dv=dx。', steps: '1. 令 u=ln x，dv=dx。\n2. du=(1/x)dx，v=x。\n3. ∫ln x dx=x ln x−∫x·(1/x)dx。\n4. =x ln x−∫1 dx=x ln x−x+C。', pit: '结果必须带 C，且 x ln x 与 x 不能合并。' }, difficulty: 3, estSeconds: 80, skillTag: '分部积分', source: '自建' },
    { id: 'bmath-iparts-4', kpIds: ['math-integral-parts'], subject: 'math', type: 'fill',
      stem: '∫_0^(π/2) x cos x dx = ______。',
      answer: 'π/2 - 1', accept: ['π/2-1', 'π/2 - 1', 'π/2−1'],
      analysis: { ans: 'π/2−1', why: '令 u=x，dv=cos x dx，分部后对 sin x 积分。', steps: '1. 令 u=x，dv=cos x dx，得 du=dx，v=sin x。\n2. 原式=[x sin x]_0^(π/2)−∫_0^(π/2) sin x dx。\n3. 第一项=π/2·1−0=π/2。\n4. 第二项=[−cos x]_0^(π/2)=0−(−1)=1。\n5. 结果 π/2−1。', pit: '定积分分部后上下限仍属于原变量 x，不要急着换成新变量。' }, difficulty: 3, estSeconds: 100, skillTag: '定积分分部', source: '自建' },

    /* ---------- math-partial ---------- */
    { id: 'bmath-partial-1', kpIds: ['math-partial'], subject: 'math', type: 'single',
      stem: '设 z = x^2 y + y^3，则 z 对 x 的偏导数 z_x 是？',
      options: ['2xy', 'x^2 + 3y^2', '2x + 3y^2', '2xy + 3y^2'],
      answer: 'A',
      analysis: { ans: '2xy', why: '对 x 求偏导时，把 y 看作常数。', steps: '1. z=x^2 y+y^3。\n2. x^2 y 对 x 求导得 2xy。\n3. y^3 与 x 无关，导数为 0。\n4. 所以 z_x=2xy。', pit: '不要顺手对 y^3 求导，那是对 y 的偏导。' }, difficulty: 2, estSeconds: 55, skillTag: '偏导数', source: '自建' },
    { id: 'bmath-partial-2', kpIds: ['math-partial'], subject: 'math', type: 'single',
      stem: '设 z = x^2 + y^2，则全微分 dz 是？',
      options: ['2x dx + 2y dy', '2x dy + 2y dx', 'x dx + y dy', '2 dx + 2 dy'],
      answer: 'A',
      analysis: { ans: '2x dx + 2y dy', why: '全微分等于各偏导数分别乘对应自变量的微分。', steps: '1. z=x^2+y^2。\n2. z_x=2x，z_y=2y。\n3. dz=z_x dx+z_y dy=2x dx+2y dy。', pit: 'z_x 配 dx，z_y 配 dy，不能交换。' }, difficulty: 2, estSeconds: 55, skillTag: '全微分', source: '自建' },
    { id: 'bmath-partial-3', kpIds: ['math-partial'], subject: 'math', type: 'fill',
      stem: '设 z = x^2 y^3，则 z 对 y 的偏导数 z_y = ______。',
      answer: '3x^2y^2', accept: ['3x^2y^2', '3x^2 y^2'],
      analysis: { ans: '3x^2y^2', why: '对 y 求偏导时，x^2 是常数系数。', steps: '1. z=x^2 y^3。\n2. 对 y 求导，x^2 保持不变。\n3. y^3 对 y 求导得 3y^2。\n4. z_y=3x^2 y^2。', pit: '写成 2x y^3 是对 x 的偏导，符号要看清楚。' }, difficulty: 2, estSeconds: 55, skillTag: '偏导数', source: '自建' },
    { id: 'bmath-partial-4', kpIds: ['math-partial'], subject: 'math', type: 'fill',
      stem: '设 z = ln(x+y)，则 z_x(1,1) = ______。',
      answer: '1/2', accept: ['1/2', '0.5'],
      analysis: { ans: '1/2', why: '先求偏导，再把点 (1,1) 代入。', steps: '1. z=ln(x+y)。\n2. z_x=1/(x+y)·(x+y)_x=1/(x+y)。\n3. 代入 x=1，y=1：z_x=1/(1+1)=1/2。', pit: '内层 x+y 对 x 的导数是 1，不要漏掉复合函数这一层。' }, difficulty: 2, estSeconds: 60, skillTag: '偏导数求值', source: '自建' },

    /* ---------- math-ode ---------- */
    { id: 'bmath-ode-1', kpIds: ['math-ode'], subject: 'math', type: 'single',
      stem: '微分方程 y′ = 3y 的通解是？',
      options: ['y = C e^(3x)', 'y = C e^(−3x)', 'y = 3x + C', 'y = C x^3'],
      answer: 'A',
      analysis: { ans: 'y = C e^(3x)', why: '这是可分离变量方程，分离后两边积分。', steps: '1. 写成 dy/dx=3y。\n2. 分离变量：dy/y=3 dx。\n3. 两边积分：ln|y|=3x+C1。\n4. 取指数得 y=Ce^(3x)。', pit: '不要写成 y=3x+C，那是对 y′=3 的解，不是 y′=3y。' }, difficulty: 2, estSeconds: 65, skillTag: '可分离变量方程', source: '自建' },
    { id: 'bmath-ode-2', kpIds: ['math-ode'], subject: 'math', type: 'single',
      stem: '一阶线性方程 y′ + 2y = e^x 的积分因子是？',
      options: ['e^(2x)', 'e^(−2x)', '2x', 'x^2'],
      answer: 'A',
      analysis: { ans: 'e^(2x)', why: '标准形 y′+P(x)y=Q(x) 的积分因子为 e^(∫P dx)。', steps: '1. 方程中 P(x)=2。\n2. ∫P dx=∫2 dx=2x。\n3. 积分因子 μ=e^(2x)。', pit: '积分因子的指数是 ∫P dx，不要漏掉负号或系数。' }, difficulty: 2, estSeconds: 60, skillTag: '一阶线性方程', source: '自建' },
    { id: 'bmath-ode-3', kpIds: ['math-ode'], subject: 'math', type: 'fill',
      stem: '微分方程 y′ = x/y 的通解是 ______。',
      answer: 'y^2 - x^2 = C', accept: ['y^2-x^2=C', 'y^2 - x^2 = C', 'y^2−x^2=C'],
      analysis: { ans: 'y^2−x^2=C', why: '可分离变量，分离后两边分别积分。', steps: '1. 写成 dy/dx=x/y。\n2. 分离变量：y dy=x dx。\n3. 两边积分：y^2/2=x^2/2+C1。\n4. 两边乘 2 并合并常数：y^2−x^2=C。', pit: '分离后两边都要积分，不能只积含 y 的一边。' }, difficulty: 3, estSeconds: 80, skillTag: '可分离变量方程', source: '自建' },
    { id: 'bmath-ode-4', kpIds: ['math-ode'], subject: 'math', type: 'fill',
      stem: '微分方程 y′ − y = 0 满足 y(0)=1 的特解是 y = ______。',
      answer: 'e^x', accept: ['e^x', 'y=e^x'],
      analysis: { ans: 'e^x', why: '先求通解，再用初始条件定常数。', steps: '1. 方程 y′−y=0 即 y′=y。\n2. 分离变量：dy/y=dx。\n3. 积分得 ln|y|=x+C1，通解 y=Ce^x。\n4. 代入 y(0)=1：C e^0=1，得 C=1。\n5. 特解 y=e^x。', pit: '初始条件是用来定 C 的，不能只写通解就结束。' }, difficulty: 2, estSeconds: 60, skillTag: '一阶线性方程初值问题', source: '自建' }
  ]));

  /* ======================= 讲义 ======================= */
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'bmath-func-L1', kpIds: ['math-function'], subject: 'math', level: 1,
      title: '函数概念与定义域：先弄清 x 能取哪些值',
      estMinutes: 45,
      hookTitle: '同一个公式，为什么有的 x 一代入就出错？',
      hookBody: '因为函数不是一条可以随便填数的公式，它自带一张允许输入清单，也就是定义域。先定定义域，再谈化简、求值、求导，顺序反了就会踩空。',
      idea: '函数是**从定义域到值域的确定对应**：给定一个 x，按规则得到唯一的 y。**定义域是函数的组成部分**，求定义域就是找让表达式有意义的 x 的集合。',
      diagramId: 'function-machine', diagramCaption: '输入 x → 规则 f → 输出 y，不是每个 x 都能进机器',
      analogy: { title: '一台有门禁的加工机器', md: '函数像一台加工机器：投入原料 x，产出成品 y。但机器有门禁，有些原料（比如让分母为零、让根号里为负的 x）根本进不去。定义域就是门禁名单，值域是这台机器能产出的成品范围。' },
      points: [
        { title: '一、函数是确定的对应关系', md: '对定义域内每个 x，按规则只得到一个 y，才叫函数。一个 x 对两个 y（如 x^2+y^2=1 中的 y）不是函数关系，除非拆成两支分别讨论。' },
        { title: '二、定义域必须先求', md: '函数的定义域是使表达式有意义的全体 x。考试中先写定义域，再做化简和判断，否则约分、开方都可能引入或丢掉点。' },
        { title: '三、分母不能为零', md: '形如 1/g(x) 的部分要求 g(x)≠0。例如 1/(x−3) 要求 x≠3，定义域要挖掉这个点，写成区间时用并集连接两段。' },
        { title: '四、偶次根号要求非负', md: '√(g(x)) 要求 g(x)≥0，四次根号同理。奇次根号（如三次根号）对被开方数没有符号限制，这是两者的关键区别。' },
        { title: '五、对数真数必须为正', md: 'ln g(x) 与 log_a g(x) 都要求 g(x)>0，底数还要求 a>0 且 a≠1。真数大于零是硬条件，不能取等号。' },
        { title: '六、复合函数由内向外', md: 'f(g(x)) 的定义域要同时满足：x 在 g 的定义域内，且 g(x) 在 f 的定义域内。两个条件取交集，缺一不可。' },
        { title: '七、奇偶性看定义域和对称', md: '定义域关于原点对称是判断奇偶的前提。f(−x)=f(x) 为偶函数，f(−x)=−f(x) 为奇函数；两者都不满足，就是非奇非偶。' }
      ],
      table: { headers: ['限制来源', '条件', '例子'], rows: [
        ['分母', '分母 ≠ 0', '1/(x−3) 要求 x≠3'],
        ['偶次根号', '被开方数 ≥ 0', '√(x−2) 要求 x≥2'],
        ['对数', '真数 > 0', 'ln(x−1) 要求 x>1'],
        ['反正弦、反余弦', '自变量 ∈ [−1,1]', 'arcsin x 要求 −1≤x≤1'],
        ['零次幂、负指数', '底数 ≠ 0', 'x^0 要求 x≠0']
      ] },
      code: 'f(x)=√(x−2)+1/(x−3)\n条件一：x−2≥0  ⇒ x≥2\n条件二：x−3≠0  ⇒ x≠3\n取交集：x∈[2,3)∪(3,+∞)',
      warning: '**多个限制条件要取交集，不是取并集**。√(x−2) 与 1/(x−3) 同时出现时，x 必须既 ≥2 又 ≠3，漏掉任何一个都会把定义域写错。',
      tip: '求定义域按「分母、根号、对数、反三角」四项逐条扫一遍，每条写出不等式，最后取交集。',
      quizIds: ['bmath-func-1', 'bmath-func-2', 'bmath-func-3', 'bmath-func-4'],
      example: { title: '求含根号与分母的定义域', steps: [
        { md: '题目：求 f(x)=√(x−2)+1/(x−3) 的定义域。' },
        { md: '根号要求 x−2≥0，解得 x≥2。' },
        { md: '分母要求 x−3≠0，解得 x≠3。' },
        { md: '两个条件取交集，得 [2,3)∪(3,+∞)。' }
      ], takeaway: '逐条列限制、最后取交集，是定义域题的固定流程。' },
      example2: { title: '计算复合函数的值', steps: [
        { md: '题目：f(x)=x^2+1，g(x)=2x，求 f(g(1))。' },
        { md: '先算内层：g(1)=2×1=2。' },
        { md: '把 2 作为外层输入：f(2)=2^2+1=5。' },
        { md: '所以 f(g(1))=5，顺序不能反。' }
      ], takeaway: '复合函数永远由内向外，先算最靠近 x 的那一层。' },
      guided: [{ questionId: 'bmath-func-1', hint: '两个限制条件同时成立，注意根号能取等号、分母不能取等号。' }],
      solo: ['bmath-func-2', 'bmath-func-3'],
      challenge: ['bmath-func-4'],
      summary: { essence: '函数是定义域到值域的确定对应；定义域由分母、根号、对数等限制共同决定。', formulas: ['分母 ≠ 0', '偶次根号：被开方数 ≥ 0', '对数：真数 > 0', 'f(g(x)) 定义域取交集'], pitfalls: ['把交集写成并集', '根号漏掉等号', '对数真数写成 ≥0', '判断奇偶前不看定义域'], checklist: ['我能逐条列出定义域限制', '我会用区间表示并集', '我能由内向外算复合函数', '我会判断奇偶性'] },
      feynman: '请用「有门禁的机器」比喻，讲清楚定义域是什么，以及为什么求定义域要取交集而不是并集。'
    }),

    Z.makeLesson({
      id: 'bmath-elem-L1', kpIds: ['math-elementary'], subject: 'math', level: 1,
      title: '基本初等函数：五类图像的底牌',
      estMinutes: 45,
      hookTitle: '为什么 e^x 和 ln x 的图像像照镜子？',
      hookBody: '因为它们互为反函数，把 y=e^x 沿直线 y=x 翻折就得到 y=ln x。记住这一层关系，(0,1) 与 (1,0) 就不会再混淆。',
      idea: '基本初等函数是**幂函数、指数函数、对数函数、三角函数、反三角函数**五类。它们的图像、定义域、值域、单调性是一切复合函数的积木。',
      diagramId: 'function-machine', diagramCaption: '五类基本函数是所有复杂函数的零件',
      analogy: { title: '五种基本积木', md: '复杂函数像乐高模型，基本初等函数就是那五种最基础的积木。幂函数是方块，指数函数是不断加速的弹射器，对数函数是减速器，三角函数是来回摆动的钟摆，反三角函数是把摆动角度读出来的刻度盘。' },
      points: [
        { title: '一、幂函数 y=x^a', md: 'a>0 时在 (0,+∞) 递增；a<0 时递减且有垂直渐近线。x^2 是偶函数，x^3 是奇函数，图像形状随指数变化很大。' },
        { title: '二、指数函数 y=a^x', md: '要求 a>0 且 a≠1。a>1 时递增，0<a<1 时递减；图像恒过 (0,1)，值域为 (0,+∞)，x 轴是水平渐近线。' },
        { title: '三、对数函数 y=log_a x', md: '要求 x>0，a>0 且 a≠1。它与同底指数函数互为反函数，图像恒过 (1,0)，值域为全体实数。' },
        { title: '四、三角函数', md: 'sin x 与 cos x 的周期都是 2π，值域 [−1,1]；tan x 周期为 π，在 x=π/2+kπ 处无定义。记图像比背公式更稳。' },
        { title: '五、反三角函数', md: 'arcsin x 定义域 [−1,1]，值域 [−π/2,π/2]；arccos x 值域 [0,π]；arctan x 定义域为 R，值域 (−π/2,π/2)。' },
        { title: '六、图像变换', md: 'y=f(x)+c 上下平移，y=f(x+c) 左右平移（左加右减），y=−f(x) 关于 x 轴翻折，y=f(−x) 关于 y 轴翻折。' },
        { title: '七、比较大小靠单调性', md: '同底指数或对数比较大小，先看底数大于 1 还是小于 1，再用单调性；底不同时化为同底或借助中间值 0、1。' }
      ],
      table: { headers: ['函数', '定义域', '关键性质'], rows: [
        ['y = x^2', 'R', '偶函数，顶点 (0,0)，值域 [0,+∞)'],
        ['y = x^3', 'R', '奇函数，在 R 上递增'],
        ['y = e^x', 'R', '过 (0,1)，递增，值域 (0,+∞)'],
        ['y = ln x', '(0,+∞)', '过 (1,0)，递增，值域 R'],
        ['y = sin x', 'R', '周期 2π，奇函数，值域 [−1,1]'],
        ['y = arctan x', 'R', '递增，值域 (−π/2,π/2)']
      ] },
      code: 'e^0 = 1        ⇒ y=e^x 过 (0,1)\nln 1 = 0       ⇒ y=ln x 过 (1,0)\nsin(π/6)=1/2   ⇒ 特殊角要记牢\nlog_2 8 = 3    ⇒ 2^3=8',
      warning: '**指数函数过 (0,1)，对数函数过 (1,0)**，这两个点最容易被写反。判断时可以代入 x=0 或 x=1 验算，不要凭印象。',
      tip: '把五类函数的图像各画一遍，标出定义域、值域、必过点和渐近线，比反复背文字有效。',
      quizIds: ['bmath-elem-1', 'bmath-elem-2', 'bmath-elem-3', 'bmath-elem-4'],
      example: { title: '比较两个对数的大小', steps: [
        { md: '题目：比较 ln 2 与 ln 3。' },
        { md: '两者底数都是 e>1，函数 y=ln x 单调递增。' },
        { md: '因为 2<3，所以 ln 2<ln 3。' },
        { md: '若底数在 0 与 1 之间，不等号方向要反过来。' }
      ], takeaway: '同底比较大小，只看单调性和自变量大小。' },
      example2: { title: '求含对数的定义域', steps: [
        { md: '题目：求 y=ln(x−1) 的定义域。' },
        { md: '对数真数必须为正：x−1>0。' },
        { md: '解得 x>1。' },
        { md: '定义域写成 (1,+∞)，端点 1 不能取。' }
      ], takeaway: '对数题的每一步都先盯住真数大于零。' },
      guided: [{ questionId: 'bmath-elem-2', hint: '先看底数 e 与 1 的大小，再代入 x=0 验证必过点。' }],
      solo: ['bmath-elem-1', 'bmath-elem-3'],
      challenge: ['bmath-elem-4'],
      summary: { essence: '五类基本初等函数的图像与性质是复合函数的积木，必过点和单调性最关键。', formulas: ['a^0 = 1', 'log_a 1 = 0', 'sin(π/6)=1/2，cos(π/3)=1/2', 'arcsin x 值域 [−π/2,π/2]'], pitfalls: ['指数与对数必过点写反', '对数定义域写成 ≥0', 'tan x 忽略无定义点', '底数小于 1 时忘记反号'], checklist: ['我能画出五类函数草图', '我记住必过点与值域', '我会用单调性比较大小', '我会求含对数的定义域'] },
      feynman: '请用「五种积木」的比喻，讲清楚基本初等函数的作用，并说明 e^x 与 ln x 为什么互为反函数。'
    }),

    Z.makeLesson({
      id: 'bmath-inf-L2', kpIds: ['math-infinity'], subject: 'math', level: 2,
      title: '无穷小与等价无穷小：极限里的替换术',
      estMinutes: 45,
      hookTitle: '为什么 sin x 可以换成 x，但 sin x − x 不能换成 0？',
      hookBody: '等价替换只保证「比值趋近 1」，在乘除中安全；一旦放进加减法，低阶项互相抵消，剩下的高阶项才是答案。',
      idea: '若 x→0 时 f(x)/g(x)→1，记 f(x)~g(x)。**等价无穷小只能在乘除中直接替换**，加减法要保留足够阶或改用泰勒展开。',
      diagramId: 'infinitesimal-compare', diagramCaption: '不同无穷小趋于零的速度不一样',
      analogy: { title: '不同速度的赛车', md: '无穷小像一群同时冲向终点的赛车：有的很快到 0，有的慢一些。等价无穷小就是并排冲线的两辆车，比值始终趋近 1。加减法相当于比较两辆车的差距，这时候差之毫厘就会谬以千里。' },
      points: [
        { title: '一、无穷小的定义', md: '若 lim(x→a) f(x)=0，就称 f(x) 是 x→a 时的无穷小。无穷小是一个变量，不是很小的常数，0 也是无穷小。' },
        { title: '二、无穷小的运算性质', md: '有限个无穷小的和、积仍是无穷小；有界函数乘无穷小仍是无穷小。这条性质常用于 sin x/x 这类极限。' },
        { title: '三、常用等价无穷小表', md: 'x→0 时：sin x~x，tan x~x，arcsin x~x，arctan x~x，e^x−1~x，ln(1+x)~x，1−cos x~x^2/2。' },
        { title: '四、等价替换的使用范围', md: '乘除中可以整体替换；加减法中如果替换后主项抵消为零，就必须保留更高阶项，否则会丢掉真正的答案。' },
        { title: '五、高阶、同阶、低阶', md: '若 f/g→0，则 f 是 g 的高阶无穷小；若 f/g→c≠0，则同阶；若 f/g→1，则等价。比较阶数就是比较趋零速度。' },
        { title: '六、无穷大与无穷小互为倒数', md: '在同一变化过程中，若 f 是无穷大，则 1/f 是无穷小；反之，若 f 是无穷小且 f≠0，则 1/f 是无穷大。' },
        { title: '七、典型错误', md: '把 sin x−x 直接换成 x−x=0；把 1−cos x 换成 0；在加法中只替换其中一项。这些都是忽略高阶项造成的错误。' }
      ],
      table: { headers: ['表达式', '等价于', '适用条件'], rows: [
        ['sin x', 'x', 'x→0'],
        ['tan x', 'x', 'x→0'],
        ['1−cos x', 'x^2/2', 'x→0'],
        ['e^x−1', 'x', 'x→0'],
        ['ln(1+x)', 'x', 'x→0'],
        ['(1+x)^a−1', 'a x', 'x→0']
      ] },
      code: 'lim(x→0) sin 5x/(3x)\n= lim (5x)/(3x)      （乘除可替换）\n= 5/3\n\nlim(x→0) (sin x−x)/x^3\nsin x = x − x^3/6 + o(x^3)\n= lim (−x^3/6)/x^3 = −1/6   （加减保留三阶）',
      warning: '**加减法中直接替换，是等价无穷小最大的陷阱**。sin x−x 若替换成 0，就把真正的最低阶项 −x^3/6 丢掉了，答案必然错。',
      tip: '先判断是乘除还是加减：乘除放心换，加减先通分、因式分解或展开到足够阶数。',
      quizIds: ['bmath-inf-1', 'bmath-inf-2', 'bmath-inf-3', 'bmath-inf-4'],
      example: { title: '乘除中的等价替换', steps: [
        { md: '题目：求 lim(x→0) sin 5x/(3x)。' },
        { md: 'x→0 时 5x→0，所以 sin 5x~5x。' },
        { md: '原式等价于 (5x)/(3x)。' },
        { md: '约去 x，得 5/3。' }
      ], takeaway: '纯乘除结构，等价替换可以直接用。' },
      example2: { title: '加减中保留高阶项', steps: [
        { md: '题目：求 lim(x→0) (sin x−x)/x^3。' },
        { md: '直接替换 sin x~x 会得到 0，但这是错的。' },
        { md: '展开 sin x=x−x^3/6+o(x^3)。' },
        { md: '分子为 −x^3/6+o(x^3)，除以 x^3 得 −1/6。' }
      ], takeaway: '加减法要看最低阶非零项，必要时用泰勒展开。' },
      guided: [{ questionId: 'bmath-inf-2', hint: '先想 sin x 展开到三阶是什么，再看分子剩下哪一项。' }],
      solo: ['bmath-inf-1', 'bmath-inf-3'],
      challenge: ['bmath-inf-4'],
      summary: { essence: '等价无穷小描述趋零速度；乘除可替换，加减要保留足够阶。', formulas: ['sin x ~ x', '1−cos x ~ x^2/2', 'e^x−1 ~ x', 'ln(1+x) ~ x'], pitfalls: ['加减中直接替换', '丢掉 1/2 系数', '把无穷小当成常数 0', '忘记说明 x→0'], checklist: ['我记住六个常用等价式', '我分得清乘除与加减', '我会用展开处理抵消', '我能判断无穷小的阶'] },
      feynman: '请解释为什么 sin x~x 在乘除中能用，但在 sin x−x 中不能直接替换。'
    }),

    Z.makeLesson({
      id: 'bmath-lh-L2', kpIds: ['math-lhopital'], subject: 'math', level: 2,
      title: '洛必达法则：未定式的拆弹工具',
      estMinutes: 45,
      hookTitle: '为什么有的极限越求导越乱？',
      hookBody: '因为洛必达不是万能钥匙：它只对 0/0 与 ∞/∞ 有效，还要求导数比的极限存在。类型不对或导数振荡，硬用只会把题做死。',
      idea: '洛必达法则：在 0/0 或 ∞/∞ 型下，若分子分母可导且导数比的极限存在，则 **lim f/g = lim f′/g′**。每次求导后都要重新判型。',
      diagramId: 'limit-approach', diagramCaption: '先判型，再决定是否求导',
      analogy: { title: '拆炸弹要先看型号', md: '未定式像不同型号的炸弹：0/0 和 ∞/∞ 是标准型号，可以直接用洛必达这把钳子；0·∞、∞−∞、1^∞ 是改装型号，要先拆解改写。拿错工具，越拆越危险。' },
      points: [
        { title: '一、三个适用条件', md: '① 极限是 0/0 或 ∞/∞；② 分子分母在去心邻域内可导，且分母导数不为零；③ 导数比的极限存在（或为无穷大）。三条都满足才能用。' },
        { title: '二、0/0 型直接求导', md: '分子分母分别求导，不要用商的求导法则。求导后重新代入，若仍是 0/0，可以继续求导，直到能算出结果。' },
        { title: '三、∞/∞ 型同样处理', md: '多项式、指数、对数混合时，求导往往能降低次数或消去主导项。比较增长速度时，指数最快，幂次之，对数最慢。' },
        { title: '四、0·∞ 型先改写', md: '把 f·g 写成 f/(1/g) 或 g/(1/f)，化为 0/0 或 ∞/∞。选择让表达式更简单的那种写法。' },
        { title: '五、∞−∞ 型先通分或有理化', md: '分式差先通分，含根号先乘共轭式，把差化成商，再判型使用洛必达。' },
        { title: '六、幂指型取对数', md: '1^∞、0^0、∞^0 型先取对数：ln y = g ln f，把指数拉到前面变成 0·∞，再化为 0/0 或 ∞/∞。' },
        { title: '七、失效情形', md: '导数比振荡（如 (x+sin x)/x）、导数比不存在、求导后更复杂时，洛必达失效，应改用夹逼、拆项、等价无穷小或泰勒展开。' }
      ],
      table: { headers: ['类型', '改写方式', '接着怎么做'], rows: [
        ['0/0', '无需改写', '分子分母分别求导'],
        ['∞/∞', '无需改写', '分子分母分别求导'],
        ['0·∞', 'f·g = f/(1/g)', '化为 0/0 或 ∞/∞'],
        ['∞−∞', '通分或有理化', '化为 0/0 型'],
        ['1^∞', '取对数 ln y = g ln f', '化为 0·∞'],
        ['导数比振荡', '不能再用洛必达', '改用夹逼或拆项']
      ] },
      code: 'lim(x→0) (x−sin x)/x^3\n第一次： (1−cos x)/(3x^2)   仍 0/0\n第二次： sin x/(6x)         仍 0/0\n收尾：   sin x ~ x ⇒ 1/6',
      warning: '**洛必达失效不等于原极限不存在**。例如 (x+sin x)/x 在 x→∞ 时，导数比 1+cos x 振荡，但原极限明明是 1。',
      tip: '每用一次洛必达，就回到第一步重新判型；三次还不出结果，立刻换方法。',
      quizIds: ['bmath-lh-1', 'bmath-lh-2', 'bmath-lh-3', 'bmath-lh-4'],
      example: { title: '连续两次洛必达', steps: [
        { md: '题目：求 lim(x→0) (x−sin x)/x^3。' },
        { md: '代入得 0/0，第一次求导得 (1−cos x)/(3x^2)。' },
        { md: '仍是 0/0，第二次求导得 sin x/(6x)。' },
        { md: '用 sin x~x，得极限 1/6。' }
      ], takeaway: '多次洛必达时，每一步都要重新判型。' },
      example2: { title: '识别失效情形', steps: [
        { md: '题目：求 lim(x→∞) (x+sin x)/x。' },
        { md: '若用洛必达，导数比为 (1+cos x)/1，极限不存在。' },
        { md: '改拆项：原式 = 1 + sin x/x。' },
        { md: '|sin x|≤1，sin x/x→0，所以极限为 1。' }
      ], takeaway: '先想有没有更简单的代数变形，再决定是否求导。' },
      guided: [{ questionId: 'bmath-lh-2', hint: '把式子拆成 1 + sin x/x，再看洛必达的导数比会不会振荡。' }],
      solo: ['bmath-lh-1', 'bmath-lh-4'],
      challenge: ['bmath-lh-3'],
      summary: { essence: '洛必达只处理 0/0 与 ∞/∞，且要求导数比极限存在；其他类型要先改写。', formulas: ['lim f/g = lim f′/g′', '0·∞ → f/(1/g)', '1^∞ → 取对数', '∞−∞ → 通分'], pitfalls: ['不判型直接用', '用商的求导法则', '求导后不重新判型', '把失效当成极限不存在'], checklist: ['我能说出三个适用条件', '我会处理 0/0 与 ∞/∞', '我会改写 0·∞ 与 ∞−∞', '我能识别失效情形'] },
      feynman: '请说明洛必达法则的三个条件，并举一个它失效但原极限仍存在的例子。'
    }),

    Z.makeLesson({
      id: 'bmath-chain-L3', kpIds: ['math-chain'], subject: 'math', level: 3,
      title: '复合函数与隐函数求导：一层一层剥洋葱',
      estMinutes: 45,
      hookTitle: '为什么 sin(x^2) 的导数不是 cos(x^2)？',
      hookBody: '因为 x^2 自己也在变。外层函数吃到的不是 x，而是 x^2，内层的导数必须一起乘上去。少乘这一层，答案就只剩一半。',
      idea: '链式法则：**y=f(u)，u=g(x) 时，dy/dx=f′(u)·g′(x)**。隐函数求导则把 y 看成 y(x)，方程两边对 x 求导，再解出 y′。',
      diagramId: 'chain-rule', diagramCaption: '外层导数 × 内层导数，逐层相乘',
      analogy: { title: '一组咬合的齿轮', md: '复合函数像齿轮组：大齿轮带动中齿轮，中齿轮再带动小齿轮。输出的转速是各级传动比相乘的结果。求导也一样，外层的导数乘内层的导数，一层都不能少。' },
      points: [
        { title: '一、链式法则的基本形式', md: '若 y=f(u)，u=g(x)，则 y′=f′(u)·g′(x)。写成微分形式就是 dy/dx=(dy/du)·(du/dx)，中间变量像桥梁一样传递变化率。' },
        { title: '二、由外向内逐层求导', md: '先对外层求导，保持内层原样不动；再乘内层的导数。例如 sin(x^2) 先得 cos(x^2)，再乘 2x，结果是 2x cos(x^2)。' },
        { title: '三、多层复合继续乘', md: '如 sin(e^(2x)) 有三层：sin → e^u → 2x。依次求导为 cos(e^(2x))·e^(2x)·2，缺任何一层都错。' },
        { title: '四、隐函数求导的步骤', md: '① 方程两边同时对 x 求导；② 遇到 y 的函数时用链式法则，如 y^2 求导为 2y·y′；③ 把所有含 y′ 的项移到一边；④ 解出 y′。' },
        { title: '五、隐函数的二阶导', md: '先由一阶导得到 y′ 的表达式（通常含 x、y），再对 x 求导，把 y′ 再代回去。不要在没解出一阶导前就急着求二阶。' },
        { title: '六、幂指函数用对数求导', md: 'y=x^x 这类底数和指数都含 x 的函数，先取对数 ln y=x ln x，再两边求导得 y′/y=ln x+1，所以 y′=x^x(ln x+1)。' },
        { title: '七、常见错误', md: '漏乘内层导数；对 y^2 只写 2y；把 y 当常数；多层复合只剥一层。检查方法：把内层整体记作 u，写完再代回。' }
      ],
      table: { headers: ['函数', '分解', '导数'], rows: [
        ['sin(x^2)', 'sin u，u=x^2', '2x cos(x^2)'],
        ['e^(2x+1)', 'e^u，u=2x+1', '2e^(2x+1)'],
        ['ln(x^2+1)', 'ln u，u=x^2+1', '2x/(x^2+1)'],
        ['(2x+1)^5', 'u^5，u=2x+1', '10(2x+1)^4'],
        ['x^2+y^2=1', '两边对 x 求导', 'y′=−x/y']
      ] },
      code: 'y = sin(x^2)\n设 u=x^2，y=sin u\ny′ = cos u · u′\n   = cos(x^2) · 2x\n   = 2x cos(x^2)\n\nx^2+y^2=1\n2x + 2y·y′ = 0\ny′ = −x/y',
      warning: '**隐函数求导时，y 不是常数而是 x 的函数**。对 y^2 求导必须写 2y·y′，漏掉 y′ 是最常见的失分点。',
      tip: '每次写完一层导数就问自己：括号里还藏着哪个函数？把那一层的导数乘上再收工。',
      quizIds: ['bmath-chain-1', 'bmath-chain-2', 'bmath-chain-3', 'bmath-chain-4'],
      example: { title: '两层复合求导', steps: [
        { md: '题目：求 y=sin(x^2) 的导数。' },
        { md: '设 u=x^2，则 y=sin u。' },
        { md: 'dy/du=cos u，du/dx=2x。' },
        { md: '相乘得 y′=2x cos(x^2)。' }
      ], takeaway: '外层求导后保持内层原样，再乘内层导数。' },
      example2: { title: '隐函数求导', steps: [
        { md: '题目：由 x^2+y^2=1 求 y′。' },
        { md: '两边对 x 求导：2x+2y·y′=0。' },
        { md: '移项得 2y·y′=−2x。' },
        { md: '解出 y′=−x/y，要求 y≠0。' }
      ], takeaway: '隐函数求导的关键是把 y 当作 y(x)，并记住 y′ 是未知数。' },
      guided: [{ questionId: 'bmath-chain-2', hint: '外层 e^u 求导不变，内层 2x+1 的导数是 2。' }],
      solo: ['bmath-chain-1', 'bmath-chain-3'],
      challenge: ['bmath-chain-4'],
      summary: { essence: '链式法则逐层相乘；隐函数把 y 看作 x 的函数，两边求导后解 y′。', formulas: ['y′=f′(u)·g′(x)', 'y^2 求导 = 2y·y′', 'y′= −F_x/F_y', '幂指函数先取对数'], pitfalls: ['漏乘内层导数', 'y^2 只写 2y', '把 y 当常数', '多层只剥一层'], checklist: ['我会分解复合结构', '我能逐层求导', '我会隐函数求导', '我会先取对数再求导'] },
      feynman: '请用齿轮组的比喻，解释链式法则为什么要把每一层的导数乘起来。'
    }),

    Z.makeLesson({
      id: 'bmath-higher-L3', kpIds: ['math-higher'], subject: 'math', level: 3,
      title: '高阶导数：把变化率再看一遍',
      estMinutes: 45,
      hookTitle: '加速度为什么是位置的二阶导数？',
      hookBody: '位置对时间求导得到速度，速度对时间再求导得到加速度。二阶导数描述的不是「在哪里」，而是「变化本身怎么变」。',
      idea: '二阶导数是对一阶导数再求导，记作 y″、f″(x) 或 d²y/dx²；n 阶导数记作 y^(n)。**高阶导数就是反复求导**，每一轮都要遵守链式法则。',
      diagramId: 'derivative-tangent', diagramCaption: '一阶导是切线斜率，二阶导是斜率的变化',
      analogy: { title: '汽车的速度表与加速度表', md: '速度表显示你此刻开多快，那是一阶导数；加速度表显示速度增加得多快，那是二阶导数。两辆车可能速度相同，但一辆在猛踩油门，另一辆在松油门，加速度完全不同。' },
      points: [
        { title: '一、记号要认清', md: 'y′ 是一阶导，y″ 是二阶导，y‴ 是三阶导，四阶以上写 y^(4)、y^(n)。f″(x) 与 d²y/dx² 都表示对 x 求两次导。' },
        { title: '二、逐次求导不跳步', md: '求二阶导先老老实实求出一阶导，再对它求导。每一步都可以用链式法则、乘积法则，不要凭记忆直接写结果。' },
        { title: '三、常用函数的 n 阶导数', md: 'e^x 的任意阶导都是 e^x；(e^(ax))^(n)=a^n e^(ax)；x^n 的 n 阶导是 n!；ln(1+x) 的 n 阶导是 (−1)^(n−1)(n−1)!/(1+x)^n。' },
        { title: '四、sin 与 cos 的周期规律', md: '(sin x)^(n)=sin(x+nπ/2)，(cos x)^(n)=cos(x+nπ/2)。每求导四次回到原函数，符号和名称按 n 除以 4 的余数变化。' },
        { title: '五、莱布尼茨公式', md: '(uv)^(n)=Σ C(n,k) u^(n−k) v^(k)。当其中一个因子是多项式时，高阶项很快为零，公式会大幅简化。' },
        { title: '六、二阶导的几何意义', md: 'f″>0 曲线开口向上，f″<0 开口向下，f″=0 且变号处是拐点。它还是判断极值的工具：f′(x0)=0 且 f″(x0)>0 为极小值。' },
        { title: '七、先化简再求导', md: '分式先拆项、化部分分式，三角先降幂，幂指先取对数。化简后再逐次求导，比硬算省一半时间且不易出错。' }
      ],
      table: { headers: ['函数', 'n 阶导数', '说明'], rows: [
        ['e^x', 'e^x', '求导不变'],
        ['e^(ax)', 'a^n e^(ax)', '每次多乘一个 a'],
        ['sin x', 'sin(x+nπ/2)', '周期 4'],
        ['cos x', 'cos(x+nπ/2)', '周期 4'],
        ['x^n', 'n!', 'n 阶导为常数'],
        ['ln(1+x)', '(−1)^(n−1)(n−1)!/(1+x)^n', '注意符号交替']
      ] },
      code: 'y = x^4\ny′ = 4x^3\ny″ = 12x^2\ny‴ = 24x\ny^(4) = 24\ny^(5) = 0',
      warning: '**高阶导数不是把一阶导数乘方**。y″ 表示求导两次，不表示 (y′)^2，也不表示 y 的平方。记号看错，整题白做。',
      tip: '先化简再求导；求到第三阶时回头检查每一项是否还带链式因子。',
      quizIds: ['bmath-higher-1', 'bmath-higher-2', 'bmath-higher-3', 'bmath-higher-4'],
      example: { title: '逐次求三阶导', steps: [
        { md: '题目：求 y=x^4 的三阶导数。' },
        { md: '一阶：y′=4x^3。' },
        { md: '二阶：y″=12x^2。' },
        { md: '三阶：y‴=24x。' }
      ], takeaway: '每求一次导，指数降一次，系数乘上原指数。' },
      example2: { title: '带内层的高阶导', steps: [
        { md: '题目：求 y=e^(2x) 的 n 阶导数。' },
        { md: '一阶：y′=2e^(2x)。' },
        { md: '二阶：y″=4e^(2x)=2^2 e^(2x)。' },
        { md: '归纳得 y^(n)=2^n e^(2x)。' }
      ], takeaway: 'e^(ax) 每求导一次就多乘一个 a，n 次就乘 a^n。' },
      guided: [{ questionId: 'bmath-higher-4', hint: '一阶一阶往下写，第三阶时指数还剩一次。' }],
      solo: ['bmath-higher-1', 'bmath-higher-3'],
      challenge: ['bmath-higher-2'],
      summary: { essence: '高阶导数是反复求导；常用函数的 n 阶导要记结论，二阶导还能判断凹凸与极值。', formulas: ['y″ = (y′)′', '(e^(ax))^(n) = a^n e^(ax)', '(sin x)^(n) = sin(x+nπ/2)', '(uv)^(n) = Σ C(n,k)u^(n−k)v^(k)'], pitfalls: ['把 y″ 当成 (y′)^2', '复合时忘记内层因子', 'sin 的周期规律记错', '分式不化简硬求导'], checklist: ['我认得各种高阶导记号', '我能逐次求导', '我记住常用 n 阶结论', '我会用二阶导判断极值'] },
      feynman: '请用速度与加速度的例子，解释二阶导数在描述什么。'
    }),

    Z.makeLesson({
      id: 'bmath-concav-L3', kpIds: ['math-concavity'], subject: 'math', level: 3,
      title: '凹凸性与拐点：曲线往哪边弯',
      estMinutes: 45,
      hookTitle: '同样是上升，为什么有的曲线越走越陡，有的越走越平？',
      hookBody: '因为它们弯曲的方向不同。一阶导只管升还是降，二阶导才管弯曲往哪边、会不会换个方向弯。',
      idea: '**f″>0 时曲线是凹的（开口向上），f″<0 时是凸的（开口向下）**。凹凸发生改变的点叫拐点，拐点处 f″ 为零或不存在，且两侧符号必须相反。',
      diagramId: 'extremum-curve', diagramCaption: '曲线弯曲方向改变处就是拐点',
      analogy: { title: '山路的上坡与下坡', md: '走上坡路时，坡度可能越来越陡，也可能越来越缓。前者像开口向上的凹曲线，后者像开口向下的凸曲线。拐点就是坡度变化方式突然改变的那个位置。' },
      points: [
        { title: '一、凹凸的几何直观', md: '凹曲线像碗，开口向上，曲线位于切线上方；凸曲线像倒扣的碗，开口向下，曲线位于切线下方。先看形状，再用二阶导验证。' },
        { title: '二、二阶导判别法', md: '在区间内 f″(x)>0，曲线是凹的；f″(x)<0，曲线是凸的。判别时先求定义域，再求二阶导，最后解不等式。' },
        { title: '三、拐点的定义', md: '拐点是曲线上凹凸性发生改变的点。它必须同时在曲线上，所以答案要写坐标 (x0, f(x0))，不能只写横坐标。' },
        { title: '四、拐点的候选点', md: '拐点只可能出现在 f″(x)=0 的点或 f″ 不存在的点。这只是候选，必须继续验证两侧二阶导是否变号。' },
        { title: '五、变号才是拐点', md: 'x0 两侧 f″ 由正变负或由负变正，才是拐点。若两侧同号（如 y=x^4 在 x=0），只是二阶导为零，不是拐点。' },
        { title: '六、列表法最稳', md: '把定义域按 f″ 的零点和不存在点分段，列出每段 f″ 的符号和曲线凹凸，标注拐点。表格一画，结论一目了然。' },
        { title: '七、与极值区分', md: '极值看 f′ 变号，拐点看 f″ 变号。f′(x0)=0 且 f″(x0)=0 时，可能既不是极值也不是拐点，例如 y=x^3 在 0 处是拐点但不是极值。' }
      ],
      table: { headers: ['f″ 符号', '曲线形状', '切线位置'], rows: [
        ['f″ > 0', '凹，开口向上', '曲线在切线上方'],
        ['f″ < 0', '凸，开口向下', '曲线在切线下方'],
        ['f″ = 0 且两侧同号', '凹凸不变', '不是拐点'],
        ['f″ = 0 且两侧变号', '凹凸改变', '是拐点'],
        ['f″ 不存在但两侧变号', '凹凸改变', '也是拐点']
      ] },
      code: 'y = x^3 − 3x^2 + 1\ny′ = 3x^2 − 6x\ny″ = 6x − 6\n令 y″=0：x=1\nx<1：y″<0（凸）\nx>1：y″>0（凹）\n两侧变号 ⇒ 拐点横坐标 x=1',
      warning: '**f″=0 只是拐点的候选条件，不是充分条件**。y=x^4 在 x=0 处 f″=0，但两侧都为正，曲线始终是凹的，没有拐点。',
      tip: '先求 f″，解零点，画符号表；只有左右符号相反，才写拐点。',
      quizIds: ['bmath-concav-1', 'bmath-concav-2', 'bmath-concav-3', 'bmath-concav-4'],
      example: { title: '求拐点横坐标', steps: [
        { md: '题目：求 y=x^3−3x^2+1 的拐点。' },
        { md: 'y′=3x^2−6x，y″=6x−6。' },
        { md: '令 y″=0，得 x=1。' },
        { md: 'x<1 时 y″<0，x>1 时 y″>0，两侧变号，所以 x=1 是拐点横坐标。' }
      ], takeaway: '解出二阶导零点后，必须回到符号表验证变号。' },
      example2: { title: '拐点坐标怎么写', steps: [
        { md: '题目：求 y=x^3 的拐点坐标。' },
        { md: 'y″=6x，令 y″=0 得 x=0。' },
        { md: 'x<0 时 y″<0，x>0 时 y″>0，变号。' },
        { md: '代入原函数 y=0，拐点坐标为 (0,0)。' }
      ], takeaway: '拐点是曲线上的点，横坐标求出后要代回原函数求纵坐标。' },
      guided: [{ questionId: 'bmath-concav-3', hint: '先求二阶导并解零点，再检查零点左右符号是否相反。' }],
      solo: ['bmath-concav-1', 'bmath-concav-4'],
      challenge: ['bmath-concav-2'],
      summary: { essence: 'f″ 的符号决定凹凸，凹凸改变的点才是拐点，拐点必须两侧变号。', formulas: ['f″>0 ⇒ 凹（开口向上）', 'f″<0 ⇒ 凸（开口向下）', '拐点候选：f″=0 或不存在', '拐点判定：两侧 f″ 变号'], pitfalls: ['把 f″=0 直接当拐点', '只写横坐标不写纵坐标', '凹凸与单调混淆', '忽略 f″ 不存在的点'], checklist: ['我能判断凹凸区间', '我会找拐点候选点', '我会用符号表验证变号', '我能写出拐点坐标'] },
      feynman: '请用「碗」和「倒扣的碗」解释凹与凸，并说明为什么 f″=0 不一定是拐点。'
    }),

    Z.makeLesson({
      id: 'bmath-mvt-L3', kpIds: ['math-mvt'], subject: 'math', level: 3,
      title: '中值定理：把平均变化率变成某点的瞬时变化率',
      estMinutes: 45,
      hookTitle: '区间平均速度，为什么一定在某一刻被真实达到？',
      hookBody: '因为函数连续且光滑时，不可能一直高于或低于自己的平均线。中值定理保证：总有一个瞬间，瞬时变化率恰好等于平均变化率。',
      idea: '**罗尔定理**是端点值相等时的特例；**拉格朗日中值定理**说 f′(ξ)=(f(b)−f(a))/(b−a)；**柯西中值定理**把两个函数的增量比联系起来。',
      diagramId: 'mvt-secant', diagramCaption: '割线斜率等于某点切线斜率',
      analogy: { title: '区间测速', md: '高速上的区间测速算的是平均速度。如果平均速度是 100，那么途中至少有一刻速度表正好指到 100。你可能忽快忽慢，但不可能全程都高于 100 或全程都低于 100。' },
      points: [
        { title: '一、罗尔定理', md: '若 f 在 [a,b] 连续、在 (a,b) 可导，且 f(a)=f(b)，则存在 ξ∈(a,b) 使 f′(ξ)=0。几何上，两端等高时中间必有一处切线水平。' },
        { title: '二、拉格朗日中值定理', md: '若 f 在 [a,b] 连续、在 (a,b) 可导，则存在 ξ∈(a,b) 使 f′(ξ)=(f(b)−f(a))/(b−a)。它把割线斜率与某点切线斜率连起来。' },
        { title: '三、柯西中值定理', md: '若 f、g 满足连续可导且 g′(x)≠0，则存在 ξ∈(a,b) 使 (f(b)−f(a))/(g(b)−g(a))=f′(ξ)/g′(ξ)。它是两个增量比之间的关系。' },
        { title: '四、几何意义', md: '拉格朗日定理说：曲线上必有一点，其切线与连接两端点的割线平行。画图时先连割线，再平移这条线直到与曲线相切，切点就是 ξ。' },
        { title: '五、构造辅助函数', md: '证明含 ξ 的等式时，常把要证的式子整理成 F′(ξ)=0 的形式，再对 F 用罗尔定理。F 的构造靠观察：把 f 与端点值组合起来。' },
        { title: '六、用中值定理证不等式', md: '把不等式两边的差写成 f(b)−f(a)，用拉格朗日得 f(b)−f(a)=f′(ξ)(b−a)，再估计 f′(ξ) 的范围。关键是选对 f 和区间。' },
        { title: '七、常见错误', md: '漏掉连续或可导条件；把 ξ 写在闭区间端点；默认 ξ 唯一；只背结论不会构造辅助函数。做题时先对照条件，再动笔。' }
      ],
      table: { headers: ['定理', '条件', '结论'], rows: [
        ['罗尔', '[a,b] 连续，(a,b) 可导，f(a)=f(b)', '存在 ξ，f′(ξ)=0'],
        ['拉格朗日', '[a,b] 连续，(a,b) 可导', 'f′(ξ)=(f(b)−f(a))/(b−a)'],
        ['柯西', 'f、g 连续可导，g′(x)≠0', 'f′(ξ)/g′(ξ)=(f(b)−f(a))/(g(b)−g(a))'],
        ['应用', '证明存在 ξ 的等式', '构造辅助函数后用罗尔']
      ] },
      code: 'f(x)=x^2，区间 [0,2]\n差商 = (f(2)−f(0))/(2−0) = 4/2 = 2\nf′(x)=2x\n令 2ξ=2 ⇒ ξ=1\n检查：1∈(0,2) ⇒ 成立',
      warning: '**中值定理只保证 ξ 存在，不保证唯一**。同一个区间可能有多处切线平行于割线；题目若要求具体 ξ，需要解方程并检查它是否落在开区间内。',
      tip: '看到「存在 ξ 使……」先想中值定理；看到 f(b)−f(a) 就写拉格朗日；看到端点值相等优先用罗尔。',
      quizIds: ['bmath-mvt-1', 'bmath-mvt-2', 'bmath-mvt-3', 'bmath-mvt-4'],
      example: { title: '验证拉格朗日中值定理', steps: [
        { md: '题目：对 f(x)=x^2 在 [0,2] 上求 ξ。' },
        { md: '差商为 (4−0)/(2−0)=2。' },
        { md: 'f′(x)=2x，令 2ξ=2。' },
        { md: '得 ξ=1，且 1∈(0,2)，满足定理。' }
      ], takeaway: '先算差商，再令导数等于差商，最后检查 ξ 是否在开区间内。' },
      example2: { title: '三次函数的 ξ', steps: [
        { md: '题目：对 f(x)=x^3 在 [0,1] 上求 ξ。' },
        { md: '差商为 (1−0)/(1−0)=1。' },
        { md: 'f′(x)=3x^2，令 3ξ^2=1。' },
        { md: 'ξ^2=1/3，取区间内的正根 ξ=√3/3。' }
      ], takeaway: '开区间内只保留符合条件的根，负根要舍去。' },
      guided: [{ questionId: 'bmath-mvt-2', hint: '先算 (f(2)−f(0))/(2−0)，再令 f′(ξ) 等于这个差商。' }],
      solo: ['bmath-mvt-1', 'bmath-mvt-3'],
      challenge: ['bmath-mvt-4'],
      summary: { essence: '中值定理把区间平均变化率与某点瞬时变化率联系起来，条件是连续与可导。', formulas: ['罗尔：f′(ξ)=0', '拉格朗日：f′(ξ)=(f(b)−f(a))/(b−a)', '柯西：f′(ξ)/g′(ξ)=Δf/Δg', 'ξ∈(a,b)'], pitfalls: ['漏掉连续可导条件', 'ξ 写到端点', '以为 ξ 唯一', '不会构造辅助函数'], checklist: ['我能复述三个定理的条件', '我会求具体 ξ', '我能画割线与切线', '我会构造辅助函数'] },
      feynman: '请用区间测速解释拉格朗日中值定理，并说明它成立需要什么条件。'
    }),

    Z.makeLesson({
      id: 'bmath-isub-L3', kpIds: ['math-integral-sub'], subject: 'math', level: 3,
      title: '定积分换元法：换掉变量，也换掉上下限',
      estMinutes: 45,
      hookTitle: '为什么换元后不能继续用原来的 0 和 1？',
      hookBody: '因为上下限是自变量的取值，不是公式里的装饰。变量从 x 换成了 u，端点对应的 u 值也跟着变，不换就会把答案算到另一个区间上。',
      idea: '换元积分法分两类：**第一类凑微分**（把 f(g(x))g′(x) 看成 f(u)du），**第二类换元**（主动令 x=φ(t) 去掉根式）。定积分换元必须**同时换上下限**。',
      diagramId: 'integral-methods', diagramCaption: '换元时变量、微分、上下限三样一起换',
      analogy: { title: '把元换算成角', md: '题目给你 10 元，你要按角计算，就得写成 100 角，数字和单位一起换。换元也一样：令 u=x^2+1，微分和上下限都要跟着换成 u 的语言，不能只改被积函数。' },
      points: [
        { title: '一、第一类换元就是凑微分', md: '若被积式能写成 f(g(x))·g′(x)，就令 u=g(x)，则 g′(x)dx=du，积分化为 ∫f(u)du。核心是观察哪一部分恰好是另一部分的导数。' },
        { title: '二、换元的三个动作', md: '① 设 u=g(x)；② 求 du=g′(x)dx，把剩余的 dx 也换掉；③ 把上下限 x=a、x=b 换成 u=g(a)、u=g(b)。三样缺一不可。' },
        { title: '三、定积分换元不换回', md: '上下限已经换成 u 的值，算完直接得数，不必再代回 x。若坚持保留原上下限，就必须把原函数换回 x，两条路只能选一条。' },
        { title: '四、第二类换元去根式', md: '含 √(a^2−x^2) 令 x=a sin t，含 √(a^2+x^2) 令 x=a tan t，含 √(x^2−a^2) 令 x=a sec t。换完记得把上下限也换成 t 的范围。' },
        { title: '五、三角换元别忘回代', md: '不定积分用三角换元后，要用直角三角形把 t 换回 x；定积分若换了上下限，就可以直接在 t 的范围里算完。' },
        { title: '六、奇偶对称能省一半计算', md: '在 [−a,a] 上，奇函数积分为 0，偶函数积分为 2 倍 [0,a] 上的积分。先看对称性，再动笔换元。' },
        { title: '七、常见错误', md: '换了 u 却仍用 x 的上下限；忘记乘 du 对应的系数；把 x dx 只换成 du 而漏掉 1/2；换元函数在区间上不单调导致端点对应错乱。' }
      ],
      table: { headers: ['题型', '换元', '注意'], rows: [
        ['∫f(ax+b)dx', 'u=ax+b', 'du=a dx，补 1/a'],
        ['∫x f(x^2)dx', 'u=x^2', 'x dx=du/2'],
        ['∫f(ln x)/x dx', 'u=ln x', 'dx/x=du'],
        ['含 √(a^2−x^2)', 'x=a sin t', '换上下限到 t 的范围'],
        ['含 √(a^2+x^2)', 'x=a tan t', '利用 1+tan^2=sec^2'],
        ['对称区间', '用奇偶性', '奇函数直接为 0']
      ] },
      code: '∫_0^1 2x(x^2+1)^3 dx\n令 u=x^2+1，du=2x dx\nx=0 ⇒ u=1\nx=1 ⇒ u=2\n原式 = ∫_1^2 u^3 du\n     = [u^4/4]_1^2 = 15/4',
      warning: '**换元后不换上下限，是最常见也最致命的错误**。变量已经变成 u，端点却还用 x 的 0 和 1，相当于在错误的区间上积分。',
      tip: '动笔先写三行：设 u=…；算 du=…；换上下限。三行齐了再开始积分。',
      quizIds: ['bmath-isub-1', 'bmath-isub-2', 'bmath-isub-3', 'bmath-isub-4'],
      example: { title: '凑微分并换上下限', steps: [
        { md: '题目：求 ∫_0^1 2x(x^2+1)^3 dx。' },
        { md: '令 u=x^2+1，则 du=2x dx。' },
        { md: 'x=0 时 u=1，x=1 时 u=2。' },
        { md: '原式=∫_1^2 u^3 du=[u^4/4]_1^2=15/4。' }
      ], takeaway: '凑微分题先找「谁是谁的导数」，再换上下限。' },
      example2: { title: '指数函数换元', steps: [
        { md: '题目：求 ∫_0^1 e^(2x) dx。' },
        { md: '令 u=2x，则 du=2 dx，dx=du/2。' },
        { md: 'x=0 时 u=0，x=1 时 u=2。' },
        { md: '原式=(1/2)∫_0^2 e^u du=(e^2−1)/2。' }
      ], takeaway: '换元时漏掉微分前的系数，是第二常见的错误。' },
      guided: [{ questionId: 'bmath-isub-3', hint: '令 u=x^2，注意 x dx 要整体换成 du/2，上下限仍是 0 到 1。' }],
      solo: ['bmath-isub-1', 'bmath-isub-2'],
      challenge: ['bmath-isub-4'],
      summary: { essence: '换元要同时换变量、微分和上下限；定积分换元后不必换回原变量。', formulas: ['u=g(x)，du=g′(x)dx', '上限 u=g(b)，下限 u=g(a)', '奇函数在对称区间积分为 0', '偶函数：2 倍半区间'], pitfalls: ['换元不换上下限', '漏乘 du 的系数', '三角换元不回代', '忽略对称性硬算'], checklist: ['我会判断凑微分', '我能正确换上下限', '我会用三角换元去根式', '我会利用奇偶性简化'] },
      feynman: '请解释定积分换元为什么必须换上下限，并用一个具体例子说明不换会错在哪里。'
    }),

    Z.makeLesson({
      id: 'bmath-iparts-L3', kpIds: ['math-integral-parts'], subject: 'math', level: 3,
      title: '分部积分法：把难积分换成另一个积分',
      estMinutes: 45,
      hookTitle: '为什么 ∫x e^x dx 要先把 x 求导？',
      hookBody: '因为乘积里有一块求导后会变简单。把 x 求导变成 1，e^x 积分仍是 e^x，难题就被换成了一个更简单的积分。',
      idea: '分部积分公式：**∫u dv = uv − ∫v du**。核心是选对 u 和 dv，让新的积分 ∫v du 比原积分更容易算。',
      diagramId: 'integral-methods', diagramCaption: '分部积分把积分搬一次家，让题目变简单',
      analogy: { title: '搬运箱子先拆件', md: '直接搬一个大柜子进不了门，就先把它拆成几块。分部积分就是拆件：把乘积拆成 u 和 dv，搬走一部分（uv），剩下的 ∫v du 往往轻得多。' },
      points: [
        { title: '一、公式与方向', md: '∫u dv=uv−∫v du。公式把原积分转成另一个积分，选 u 的原则是「求导后更简单」，选 dv 的原则是「容易积分」。' },
        { title: '二、u 的优先顺序', md: '按「反对幂指三」选 u：反三角函数、对数函数、幂函数、指数函数、三角函数。排在前面的优先当 u，因为求导后会退化得更简单。' },
        { title: '三、一次分部', md: '如 ∫x e^x dx，令 u=x，dv=e^x dx，得 x e^x−∫e^x dx=(x−1)e^x+C。一次分部就结束。' },
        { title: '四、两次分部', md: '如 ∫x^2 e^x dx，第一次降一次幂，第二次再降一次，直到幂函数变成常数。每分一次，幂次降一。' },
        { title: '五、循环积分', md: '如 ∫e^x sin x dx，分部两次后右边出现原积分的倍数，移项解出结果。注意两次分部要选同一类 u。' },
        { title: '六、定积分分部', md: '∫_a^b u dv=[uv]_a^b−∫_a^b v du。上下限在整个过程中都属于原变量 x，先代值再算第二项。' },
        { title: '七、常见错误', md: 'u 和 dv 选反导致越积越复杂；分部后忘记负号；定积分忘记代上下限；循环积分移项时符号算错。' }
      ],
      table: { headers: ['被积函数', '选 u', '选 dv'], rows: [
        ['x e^x', 'x', 'e^x dx'],
        ['x cos x', 'x', 'cos x dx'],
        ['ln x', 'ln x', 'dx'],
        ['x ln x', 'ln x', 'x dx'],
        ['x^2 e^x', 'x^2', 'e^x dx'],
        ['e^x sin x', 'e^x 或 sin x', '另一部分 dx']
      ] },
      code: '∫ x e^x dx\n令 u=x，dv=e^x dx\ndu=dx，v=e^x\n原式 = x e^x − ∫ e^x dx\n     = x e^x − e^x + C\n     = (x−1)e^x + C',
      warning: '**u 选错会让积分越做越复杂**。例如 ∫x ln x dx 若令 u=x，就会得到更难的积分；正确做法是令 u=ln x，dv=x dx。',
      tip: '先按「反对幂指三」圈出 u，再检查 dv 是否容易积分；两边都满足才动笔。',
      quizIds: ['bmath-iparts-1', 'bmath-iparts-2', 'bmath-iparts-3', 'bmath-iparts-4'],
      example: { title: '一次分部求不定积分', steps: [
        { md: '题目：求 ∫x e^x dx。' },
        { md: '令 u=x，dv=e^x dx，则 du=dx，v=e^x。' },
        { md: '代入公式：x e^x−∫e^x dx。' },
        { md: '计算得 (x−1)e^x+C。' }
      ], takeaway: '幂函数乘指数，令幂函数为 u，分一次就降一次。' },
      example2: { title: '定积分分部', steps: [
        { md: '题目：求 ∫_0^1 x e^x dx。' },
        { md: '原函数为 (x−1)e^x。' },
        { md: '代入上限 1 得 0，代入下限 0 得 −1。' },
        { md: '0−(−1)=1。' }
      ], takeaway: '定积分分部最后一步永远是代上下限，符号要盯紧。' },
      guided: [{ questionId: 'bmath-iparts-1', hint: '按「反对幂指三」，x 是幂函数，e^x 是指数函数，让幂函数当 u。' }],
      solo: ['bmath-iparts-2', 'bmath-iparts-3'],
      challenge: ['bmath-iparts-4'],
      summary: { essence: '分部积分把 ∫u dv 换成 uv−∫v du，选 u 按「反对幂指三」。', formulas: ['∫u dv = uv − ∫v du', '∫_a^b u dv = [uv]_a^b − ∫_a^b v du', '∫ln x dx = x ln x − x + C'], pitfalls: ['u 与 dv 选反', '忘记负号', '定积分不代上下限', '循环积分移项错号'], checklist: ['我记住分部积分公式', '我会按顺序选 u', '我会处理两次分部', '我会做定积分分部'] },
      feynman: '请解释「反对幂指三」的含义，并用 ∫x ln x dx 说明选错 u 会有什么后果。'
    }),

    Z.makeLesson({
      id: 'bmath-partial-L3', kpIds: ['math-partial'], subject: 'math', level: 3,
      title: '偏导数与全微分：把一个变量按住不动',
      estMinutes: 45,
      hookTitle: '为什么对 x 求偏导时，y 可以当常数？',
      hookBody: '因为偏导数只研究一个方向的变化：沿 x 方向走，y 固定不动。把 y 按住，剩下的就是一元函数求导。',
      idea: '**偏导数 z_x 是把 y 看成常数后对 x 求导**，z_y 则把 x 看成常数。全微分 dz=z_x dx+z_y dy，是函数在一点附近的线性近似。',
      diagramId: 'partial-surface', diagramCaption: '沿 x 或 y 方向切片，各自得到一条曲线',
      analogy: { title: '在山上沿正东方向走', md: '站在山坡上，沿正东走一步，高度变化率就是对 x 的偏导；沿正北走一步，高度变化率就是对 y 的偏导。全微分则告诉你朝任意小方向走一步，高度大约变多少。' },
      points: [
        { title: '一、偏导数的定义', md: 'z_x=lim(Δx→0)[f(x+Δx,y)−f(x,y)]/Δx。它只让 x 变、y 不变，本质是一元导数。z_y 同理。' },
        { title: '二、计算时按住另一个变量', md: '对 x 求偏导，把 y 当常数：y^3 的导数为 0，x^2 y 的导数为 2xy。对 y 求偏导则把 x 当常数。' },
        { title: '三、二阶偏导与混合偏导', md: 'z_xx 是对 x 求两次，z_xy 是先对 x 再对 y。若 z_xy 与 z_yx 都连续，则二者相等，混合偏导与求导次序无关。' },
        { title: '四、全微分的写法', md: 'dz=z_x dx+z_y dy。在点 (x0,y0) 处，dz 是函数增量的主部，用来做近似计算和误差估计。' },
        { title: '五、可微与偏导存在的关系', md: '偏导存在不一定可微；偏导连续是可微的充分条件。考试中一般直接套全微分公式，但要理解它的前提。' },
        { title: '六、多元复合链式法则', md: 'z=f(u,v)，u=u(x,y)，v=v(x,y) 时，z_x=f_u u_x+f_v v_x。有几个中间变量，就有几项相加，每项都是外层偏导乘内层偏导。' },
        { title: '七、隐函数的偏导', md: '由 F(x,y,z)=0 确定 z=z(x,y) 时，z_x=−F_x/F_z，z_y=−F_y/F_z（F_z≠0）。分子是对方程直接求偏导，分母统一除以 F_z。' }
      ],
      table: { headers: ['函数', 'z_x', 'z_y'], rows: [
        ['z=x^2 y+y^3', '2xy', 'x^2+3y^2'],
        ['z=x^2 y^3', '2x y^3', '3x^2 y^2'],
        ['z=e^(xy)', 'y e^(xy)', 'x e^(xy)'],
        ['z=ln(x+y)', '1/(x+y)', '1/(x+y)'],
        ['z=x^2+y^2', '2x', '2y']
      ] },
      code: 'z = x^2 y + y^3\nz_x = 2xy        （y 当常数）\nz_y = x^2 + 3y^2 （x 当常数）\ndz = 2xy dx + (x^2+3y^2) dy',
      warning: '**对 x 求偏导时，含 y 的项不是都消失**。y^3 消失，但 x^2 y 里的 y 要保留为系数；写成 2x 就错了。',
      tip: '求偏导前先在草稿上写一行「现在 y 是常数」，再动笔，能避免大半错误。',
      quizIds: ['bmath-partial-1', 'bmath-partial-2', 'bmath-partial-3', 'bmath-partial-4'],
      example: { title: '分别求两个偏导', steps: [
        { md: '题目：z=x^2 y+y^3，求 z_x 与 z_y。' },
        { md: '对 x 求偏导，把 y 当常数：z_x=2xy。' },
        { md: '对 y 求偏导，把 x 当常数：z_y=x^2+3y^2。' },
        { md: '检查：两项分别对应两个变量的幂次变化。' }
      ], takeaway: '偏导就是「按住一个变量，对另一个求导」。' },
      example2: { title: '求全微分', steps: [
        { md: '题目：z=x^2+y^2，求 dz。' },
        { md: 'z_x=2x，z_y=2y。' },
        { md: '代入公式 dz=z_x dx+z_y dy。' },
        { md: '得 dz=2x dx+2y dy。' }
      ], takeaway: '全微分就是把两个偏导分别乘上对应自变量的微分再相加。' },
      guided: [{ questionId: 'bmath-partial-4', hint: '先对 ln(x+y) 求偏导，内层 x+y 对 x 的导数是 1，再代 (1,1)。' }],
      solo: ['bmath-partial-1', 'bmath-partial-3'],
      challenge: ['bmath-partial-2'],
      summary: { essence: '偏导是按住其他变量后的一元导数；全微分是各偏导乘对应微分的线性组合。', formulas: ['z_x = ∂z/∂x', 'dz = z_x dx + z_y dy', 'z_x=−F_x/F_z', '混合偏导连续时 z_xy=z_yx'], pitfalls: ['对 x 求导时把 y 也求导', '全微分系数配错', '忘记内层导数', '混淆偏导与全导'], checklist: ['我会分别求 z_x 与 z_y', '我会写全微分', '我理解混合偏导', '我会多元复合链式法则'] },
      feynman: '请用「沿正东走」的比喻，解释偏导数与全微分的区别。'
    }),

    Z.makeLesson({
      id: 'bmath-ode-L3', kpIds: ['math-ode'], subject: 'math', level: 3,
      title: '一阶微分方程：从导数反推原函数',
      estMinutes: 45,
      hookTitle: '为什么微分方程的解里总有一个 C？',
      hookBody: '因为积分会丢掉常数信息：导数为 3 的函数不止一个，而是 3x 加任意常数。C 代表一整族曲线，初始条件才能从中挑出唯一一条。',
      idea: '一阶微分方程把 y′ 与 x、y 联系起来。**可分离变量方程**分离后两边积分；**一阶线性方程** y′+P(x)y=Q(x) 用积分因子 e^(∫P dx) 求解。',
      diagramId: 'integral-methods', diagramCaption: '微分方程 → 分离变量 → 积分 → 通解',
      analogy: { title: '根据车速记录还原路线', md: '微分方程像一份车速记录：它告诉你每一刻的速度，却不告诉你起点。积分能还原出一整族可能的路线，初始条件就是出发点，一给定，整条路线就唯一确定了。' },
      points: [
        { title: '一、可分离变量方程', md: '形如 y′=f(x)g(y)。把含 y 的项移到 dy 一侧、含 x 的项移到 dx 一侧，写成 dy/g(y)=f(x)dx，再两边积分。' },
        { title: '二、分离后两边都要积分', md: '左边对 y 积分，右边对 x 积分，各自产生常数，合并成一个 C 即可。不要只积一边，也不要忘记积分常数。' },
        { title: '三、一阶线性方程的标准形', md: 'y′+P(x)y=Q(x)。判断标准是 y 与 y′ 都是一次的，且没有 y 与 y′ 的乘积项。先化成这个形式，再找 P、Q。' },
        { title: '四、积分因子', md: 'μ(x)=e^(∫P(x)dx)。两边同乘 μ 后，左边恰好是 (μ y)′，于是 μ y=∫μ Q dx+C，解出 y。' },
        { title: '五、通解公式', md: 'y=e^(−∫P dx)(∫Q e^(∫P dx) dx+C)。记不住公式时，用积分因子现场推，更不容易出错。' },
        { title: '六、初始条件定常数', md: '通解含一个任意常数 C。给定 y(x0)=y0 时，把点代入通解解出 C，得到特解。应用题中的初始值通常藏在「初始时刻」「开始时」这些词里。' },
        { title: '七、常见错误', md: '分离时漏项；积分后忘记 C；一阶线性方程忘记先化标准形；积分因子指数漏负号；特解题只写通解不代初值。' }
      ],
      table: { headers: ['类型', '标准形', '解法'], rows: [
        ['可分离变量', 'y′=f(x)g(y)', '分离后两边积分'],
        ['一阶线性', 'y′+P(x)y=Q(x)', '积分因子 e^(∫P dx)'],
        ['齐次方程', 'y′=f(y/x)', '令 u=y/x 化为可分离'],
        ['初值问题', '通解 + y(x0)=y0', '代入定 C'],
        ['验证', '把 y 代回原方程', '检查两边是否相等']
      ] },
      code: 'y′ = 3y\ndy/y = 3 dx\nln|y| = 3x + C1\ny = C e^(3x)        通解\n若 y(0)=2 ⇒ C=2\ny = 2e^(3x)         特解',
      warning: '**通解必须含任意常数 C，特解必须用初始条件把 C 定出来**。只写 y=Ce^(3x) 就当作答案，等于没回答初值问题。',
      tip: '先判类型：能分离就分离；不能分离再看是不是 y′+P(x)y=Q(x)；两条都不像，考虑换元 u=y/x。',
      quizIds: ['bmath-ode-1', 'bmath-ode-2', 'bmath-ode-3', 'bmath-ode-4'],
      example: { title: '可分离变量求通解', steps: [
        { md: '题目：求 y′=x/y 的通解。' },
        { md: '写成 dy/dx=x/y，分离得 y dy=x dx。' },
        { md: '两边积分：y^2/2=x^2/2+C1。' },
        { md: '两边乘 2 并合并常数，得 y^2−x^2=C。' }
      ], takeaway: '分离后左右各自积分，常数合并写一个 C。' },
      example2: { title: '初值问题求特解', steps: [
        { md: '题目：y′−y=0，y(0)=1，求特解。' },
        { md: '分离 dy/y=dx，积分得 y=Ce^x。' },
        { md: '代入 y(0)=1，得 C=1。' },
        { md: '特解为 y=e^x。' }
      ], takeaway: '初始条件只做一件事：把 C 定下来。' },
      guided: [{ questionId: 'bmath-ode-3', hint: '把 y′ 写成 dy/dx，含 y 的放一边、含 x 的放另一边，再两边积分。' }],
      solo: ['bmath-ode-1', 'bmath-ode-4'],
      challenge: ['bmath-ode-2'],
      summary: { essence: '一阶方程先判类型；可分离就分离积分，线性方程用积分因子；初值定 C。', formulas: ['dy/g(y)=f(x)dx', 'μ=e^(∫P dx)', 'y=e^(−∫P dx)(∫Q e^(∫P dx)dx+C)', 'y(x0)=y0 定 C'], pitfalls: ['分离漏项', '忘记积分常数', '不化标准形', '初值题只写通解'], checklist: ['我会判断方程类型', '我能正确分离变量', '我会用积分因子', '我会由初值求特解'] },
      feynman: '请用「车速记录与出发点」的比喻，解释通解中的 C 和初始条件的作用。'
    })
  );
})(window.ZSB = window.ZSB || {});
