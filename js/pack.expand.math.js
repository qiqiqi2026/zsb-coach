/* 高数扩展包：6 个考点 + 6 份完整讲义 + 24 道题 */
(function (Z) {
  Z.addKps([
    { id: 'math-sequence', subject: 'math', chapter: '极限与连续', title: '数列与数列极限', level: 2, examWeight: 0.04, prerequisites: ['math-limit-calc'], examCount: 4, examPoints: 15, outcome: '能判断数列收敛与发散，用四则运算和夹逼求 n→∞ 的极限', note: '数列是定义在正整数上的函数，n 只往正无穷走' },
    { id: 'math-squeeze', subject: 'math', chapter: '极限与连续', title: '夹逼准则与两个重要极限', level: 3, examWeight: 0.05, prerequisites: ['math-limit-calc'], examCount: 5, examPoints: 20, outcome: '能用两边夹的方式求极限，熟练处理 sin x/x 与 1 的无穷次型', note: '重要极限的配套形式必须严格对应，差一个系数就错' },
    { id: 'math-deriv-econ', subject: 'math', chapter: '导数与微分', title: '导数在经济中的应用（边际与弹性）', level: 3, examWeight: 0.04, prerequisites: ['math-deriv-apply'], examCount: 4, examPoints: 16, outcome: '能求边际成本、边际收益与需求价格弹性，并解释其经济含义', note: '边际就是导数，弹性是百分比之比' },
    { id: 'math-improper', subject: 'math', chapter: '积分', title: '反常积分', level: 4, examWeight: 0.04, prerequisites: ['math-integral-def'], examCount: 5, examPoints: 18, outcome: '能区分无穷限与瑕积分，用极限计算并判断收敛性', note: '先找瑕点，再写极限，最后才套原函数' },
    { id: 'math-series', subject: 'math', chapter: '积分', title: '无穷级数入门', level: 4, examWeight: 0.04, prerequisites: ['math-sequence'], examCount: 5, examPoints: 18, outcome: '能写出部分和，判断等比级数与 p-级数的收敛性', note: '通项趋于零只是必要条件，调和级数就是反例' },
    { id: 'math-vector', subject: 'math', chapter: '多元与方程', title: '空间向量与平面方程', level: 3, examWeight: 0.04, prerequisites: ['math-partial'], examCount: 4, examPoints: 15, outcome: '能算数量积与向量积，写出平面方程并求点到平面的距离', note: '平面的一般式中，系数就是法向量' }
  ]);

  Z.QUESTIONS.push.apply(Z.QUESTIONS, Z.makeQs([
    /* ---------- math-sequence ---------- */
    { id: 'math4-seq-1', kpIds: ['math-sequence'], subject: 'math', type: 'single',
      stem: '下列数列中，收敛的是？',
      options: ['a_n = n', 'a_n = (−1)^n', 'a_n = 1/n', 'a_n = n^2'],
      answer: 'C',
      analysis: { ans: 'a_n = 1/n', why: '收敛是指 n 无限增大时，a_n 无限接近一个确定的常数。四个选项里只有 1/n 会趋近 0。', steps: '1. a_n = n 随 n 增大趋于 +∞，发散。\n2. a_n = (−1)^n 在 1 与 −1 之间来回跳，不趋于唯一值，发散。\n3. a_n = 1/n 随 n 增大越来越接近 0，收敛于 0。\n4. a_n = n^2 趋于 +∞，发散。', pit: '有界不等于收敛：(−1)^n 有界，但它发散。' }, difficulty: 2, estSeconds: 50, skillTag: '收敛与发散', source: '自建' },
    { id: 'math4-seq-2', kpIds: ['math-sequence'], subject: 'math', type: 'single',
      stem: '数列 a_n = (n + 1)/n 的极限是？',
      options: ['0', '1', '2', '不存在'],
      answer: 'B',
      analysis: { ans: '1', why: '把分子拆开，a_n = 1 + 1/n，而 1/n 在 n→∞ 时趋于 0。', steps: '1. a_n = (n + 1)/n = n/n + 1/n = 1 + 1/n。\n2. n→∞ 时 1/n→0。\n3. 所以 lim(n→∞) a_n = 1 + 0 = 1。', pit: '不要直接把 n 约掉就写 1，要看剩下的 1/n 是否趋于 0。' }, difficulty: 2, estSeconds: 50, skillTag: '数列极限计算', source: '自建' },
    { id: 'math4-seq-3', kpIds: ['math-sequence'], subject: 'math', type: 'fill',
      stem: 'lim(n→∞) (2n + 1)/n = ______。',
      answer: '2', accept: ['2'],
      analysis: { ans: '2', why: '拆分后只剩常数项和一个趋于 0 的 1/n。', steps: '1. (2n + 1)/n = 2 + 1/n。\n2. lim(n→∞) 1/n = 0。\n3. 极限为 2 + 0 = 2。', pit: '结果是常数 2，不是 2n；极限描述的是趋势，不是某一项的值。' }, difficulty: 2, estSeconds: 45, skillTag: '数列极限计算', source: '自建' },
    { id: 'math4-seq-4', kpIds: ['math-sequence'], subject: 'math', type: 'fill',
      stem: '若 lim(n→∞) a_n = 3，lim(n→∞) b_n = −1，则 lim(n→∞) (a_n + b_n) = ______。',
      answer: '2', accept: ['2'],
      analysis: { ans: '2', why: '两个数列都收敛时，和的极限等于极限的和。', steps: '1. 使用极限四则运算法则：lim(a_n + b_n) = lim a_n + lim b_n。\n2. 代入得 3 + (−1)。\n3. 结果为 2。', pit: '四则运算的前提是两个极限都存在；若其中一个发散，不能直接相加。' }, difficulty: 3, estSeconds: 50, skillTag: '极限四则运算', source: '自建' },

    /* ---------- math-squeeze ---------- */
    { id: 'math4-squeeze-1', kpIds: ['math-squeeze'], subject: 'math', type: 'single',
      stem: 'lim(x→0) sin x / x 的值是？',
      options: ['0', '1', '∞', '不存在'],
      answer: 'B',
      analysis: { ans: '1', why: '这是第一个重要极限，前提是 x 用弧度制且 x→0。', steps: '1. 当 0 < x < π/2 时，由几何关系有 sin x < x < tan x。\n2. 同除以 sin x，得 1 < x/sin x < 1/cos x。\n3. x→0 时 cos x→1，两端都趋于 1，由夹逼准则得 x/sin x→1。\n4. 取倒数即得 sin x/x→1。', pit: '只有 x→0 才成立；x→∞ 时 sin x/x→0，而 sin x 本身不收敛。' }, difficulty: 3, estSeconds: 70, skillTag: '重要极限', source: '自建' },
    { id: 'math4-squeeze-2', kpIds: ['math-squeeze'], subject: 'math', type: 'single',
      stem: 'lim(x→0) (1 − cos x)/x^2 的值是？',
      options: ['0', '1/2', '1', '2'],
      answer: 'B',
      analysis: { ans: '1/2', why: '用 1 − cos x = 2sin^2(x/2)，再用 sin(x/2) 与 x/2 等价。', steps: '1. 恒等变形：1 − cos x = 2sin^2(x/2)。\n2. 于是 (1 − cos x)/x^2 = 2sin^2(x/2)/x^2。\n3. 因为 sin(x/2) 与 x/2 等价，sin^2(x/2) 与 x^2/4 等价。\n4. 原式等价于 2 × (x^2/4) / x^2 = 1/2。', pit: '等价无穷小替换只能用在整个乘除因子上；分子是减法的结果，要先做恒等变形。' }, difficulty: 3, estSeconds: 70, skillTag: '等价无穷小', source: '自建' },
    { id: 'math4-squeeze-3', kpIds: ['math-squeeze'], subject: 'math', type: 'fill',
      stem: 'lim(x→∞) (1 + 1/x)^x = ______。',
      answer: 'e', accept: ['e'],
      analysis: { ans: 'e', why: '这是第二个重要极限的标准形式。', steps: '1. 底数 1 + 1/x 趋于 1，指数 x 趋于无穷，属于 1 的无穷次型。\n2. 标准结论为 (1 + 1/x)^x → e。\n3. e ≈ 2.718，是一个确定的常数。', pit: '不要把 1 的无穷次方直接当成 1；必须看底数与指数是否严格配套。' }, difficulty: 3, estSeconds: 45, skillTag: '重要极限', source: '自建' },
    { id: 'math4-squeeze-4', kpIds: ['math-squeeze'], subject: 'math', type: 'fill',
      stem: 'lim(x→0) (1 + 2x)^(1/x) = ______。',
      answer: 'e^2', accept: ['e^2', 'e²'],
      analysis: { ans: 'e^2', why: '把指数凑成 1/(2x) 的两倍，套用 (1 + u)^(1/u)→e。', steps: '1. 原式 = lim(x→0)[(1 + 2x)^(1/(2x))]^2。\n2. 令 u = 2x，u→0，则 (1 + u)^(1/u)→e。\n3. 外层平方，结果为 e^2。', pit: '不要漏掉外层的平方；指数里的 2 来自 1/x 与 1/(2x) 的倍数关系。' }, difficulty: 4, estSeconds: 70, skillTag: '重要极限变形', source: '自建' },

    /* ---------- math-deriv-econ ---------- */
    { id: 'math4-econ-1', kpIds: ['math-deriv-econ'], subject: 'math', type: 'single',
      stem: '需求函数 Q = 100 − 2P，则边际需求 dQ/dP 等于？',
      options: ['−2', '2', '100', '100 − 2P'],
      answer: 'A',
      analysis: { ans: '−2', why: '边际需求是需求量对价格的导数，对 P 求导即可。', steps: '1. Q = 100 − 2P。\n2. dQ/dP = (100)′ − (2P)′ = 0 − 2 = −2。\n3. 负号表示价格上升时需求量下降。', pit: '不要写成 2；需求曲线向下倾斜，边际需求必须是负数。' }, difficulty: 2, estSeconds: 50, skillTag: '边际需求', source: '自建' },
    { id: 'math4-econ-2', kpIds: ['math-deriv-econ'], subject: 'math', type: 'single',
      stem: '成本函数 C(Q) = 2Q^2 + 10Q + 50，则边际成本 MC 等于？',
      options: ['4Q + 10', '4Q', '2Q + 10', '4Q + 10Q'],
      answer: 'A',
      analysis: { ans: '4Q + 10', why: '边际成本是总成本函数对产量 Q 的导数。', steps: '1. C(Q) = 2Q^2 + 10Q + 50。\n2. 逐项求导：(2Q^2)′ = 4Q，(10Q)′ = 10，(50)′ = 0。\n3. MC = 4Q + 10。', pit: '常数项 50 求导为 0，固定成本不影响边际成本。' }, difficulty: 2, estSeconds: 55, skillTag: '边际成本', source: '自建' },
    { id: 'math4-econ-3', kpIds: ['math-deriv-econ'], subject: 'math', type: 'fill',
      stem: '收益函数 R(Q) = 20Q − Q^2，当 Q = 5 时的边际收益 MR = ______。',
      answer: '10', accept: ['10'],
      analysis: { ans: '10', why: '先求 R(Q) 的导数，再把 Q = 5 代入。', steps: '1. R′(Q) = 20 − 2Q。\n2. 代入 Q = 5：R′(5) = 20 − 10 = 10。\n3. 边际收益为 10，表示再多卖一单位大约多收入 10。', pit: '不要先把 Q = 5 代进 R(Q) 再求导；求导要在代入之前做。' }, difficulty: 3, estSeconds: 60, skillTag: '边际收益', source: '自建' },
    { id: 'math4-econ-4', kpIds: ['math-deriv-econ'], subject: 'math', type: 'fill',
      stem: '需求函数 Q = 100 − 2P，需求价格弹性定义为 η = −(dQ/dP)·(P/Q)。当 P = 10 时的 η = ______。',
      answer: '0.25', accept: ['0.25', '1/4'],
      analysis: { ans: '0.25', why: '先求边际需求，再算价格与需求量之比。', steps: '1. dQ/dP = −2。\n2. P = 10 时，Q = 100 − 20 = 80。\n3. η = −(−2) × 10/80 = 2 × 0.125 = 0.25。\n4. η = 0.25 < 1，属于缺乏弹性。', pit: '不要忘记公式前面的负号；算出的弹性应取正值再与 1 比较。' }, difficulty: 4, estSeconds: 80, skillTag: '需求价格弹性', source: '自建' },

    /* ---------- math-improper ---------- */
    { id: 'math4-improper-1', kpIds: ['math-improper'], subject: 'math', type: 'single',
      stem: '∫(0→+∞) e^(−x) dx 的值是？',
      options: ['0', '1', 'e', '发散'],
      answer: 'B',
      analysis: { ans: '1', why: '先算到上限 b，再令 b→+∞ 取极限。', steps: '1. ∫(0→b) e^(−x) dx = [−e^(−x)](0→b) = 1 − e^(−b)。\n2. 当 b→+∞，e^(−b)→0。\n3. 极限为 1，故反常积分收敛且等于 1。', pit: '不能直接把 +∞ 代进原函数；必须写成极限再取。' }, difficulty: 3, estSeconds: 60, skillTag: '无穷限反常积分', source: '自建' },
    { id: 'math4-improper-2', kpIds: ['math-improper'], subject: 'math', type: 'single',
      stem: '关于无穷限反常积分 ∫(1→+∞) 1/x^p dx，它收敛的条件是？',
      options: ['p > 0', 'p > 1', 'p < 1', 'p ≠ 1'],
      answer: 'B',
      analysis: { ans: 'p > 1', why: '这是 p-积分在无穷区间的判别结论。', steps: '1. p ≠ 1 时，∫(1→b) x^(−p) dx = (b^(1−p) − 1)/(1 − p)。\n2. 只有当 1 − p < 0，即 p > 1 时，b^(1−p)→0，结果收敛。\n3. p = 1 时积分为 ln b→∞，发散；p < 1 时 b^(1−p)→+∞，发散。', pit: '无穷限的 p-积分要求 p > 1，和瑕点处 p < 1 的结论正好相反。' }, difficulty: 4, estSeconds: 70, skillTag: 'p-积分判别', source: '自建' },
    { id: 'math4-improper-3', kpIds: ['math-improper'], subject: 'math', type: 'fill',
      stem: '∫(1→+∞) 1/x^2 dx = ______。',
      answer: '1', accept: ['1'],
      analysis: { ans: '1', why: '按定义写成极限，再求原函数。', steps: '1. ∫(1→b) x^(−2) dx = [−1/x](1→b) = −1/b + 1。\n2. b→+∞ 时 −1/b→0。\n3. 极限为 1。', pit: '不要把 1/x^2 的原函数写成 ln x；ln x 只对应 1/x。' }, difficulty: 3, estSeconds: 60, skillTag: '无穷限反常积分', source: '自建' },
    { id: 'math4-improper-4', kpIds: ['math-improper'], subject: 'math', type: 'fill',
      stem: '∫(0→1) 1/√x dx = ______。',
      answer: '2', accept: ['2'],
      analysis: { ans: '2', why: 'x = 0 处被积函数无界，是瑕积分，要取下限的右极限。', steps: '1. 1/√x = x^(−1/2)，原函数为 2x^(1/2)。\n2. ∫(a→1) x^(−1/2) dx = 2 − 2√a。\n3. 令 a→0+，√a→0，结果为 2。', pit: '瑕点在 0 处，不能直接写 [2√x](0→1) 就完事，要说明取的是右极限。' }, difficulty: 4, estSeconds: 70, skillTag: '瑕积分', source: '自建' },

    /* ---------- math-series ---------- */
    { id: 'math4-series-1', kpIds: ['math-series'], subject: 'math', type: 'single',
      stem: '等比级数 ∑(n=1→∞) (1/2)^n 的和是？',
      options: ['1/2', '1', '2', '发散'],
      answer: 'B',
      analysis: { ans: '1', why: '公比 |q| < 1 的等比级数收敛，和为 a1/(1 − q)。', steps: '1. 首项 a1 = 1/2，公比 q = 1/2。\n2. 因为 |q| = 1/2 < 1，级数收敛。\n3. 和 S = (1/2)/(1 − 1/2) = (1/2)/(1/2) = 1。', pit: '公式里的首项是 n = 1 那一项；若从 n = 0 开始，首项是 1。' }, difficulty: 3, estSeconds: 60, skillTag: '等比级数', source: '自建' },
    { id: 'math4-series-2', kpIds: ['math-series'], subject: 'math', type: 'single',
      stem: '下列级数中，发散的是？',
      options: ['∑ 1/n^2', '∑ 1/2^n', '∑ 1/n', '∑ 1/n^3'],
      answer: 'C',
      analysis: { ans: '∑ 1/n', why: '调和级数虽然通项趋于 0，但部分和无界，因此发散。', steps: '1. ∑ 1/n^2 与 ∑ 1/n^3 都是 p > 1 的 p-级数，收敛。\n2. ∑ 1/2^n 是公比 1/2 的等比级数，收敛。\n3. ∑ 1/n 是调和级数，部分和 S_n ≈ ln n → ∞，发散。', pit: '通项趋于 0 不能推出级数收敛，调和级数就是标准反例。' }, difficulty: 3, estSeconds: 60, skillTag: '级数判敛', source: '自建' },
    { id: 'math4-series-3', kpIds: ['math-series'], subject: 'math', type: 'fill',
      stem: '∑(n=1→∞) (1/3)^n = ______。',
      answer: '1/2', accept: ['1/2', '0.5'],
      analysis: { ans: '1/2', why: '首项 1/3，公比 1/3，套等比级数求和公式。', steps: '1. a1 = 1/3，q = 1/3，|q| < 1。\n2. S = a1/(1 − q) = (1/3)/(2/3)。\n3. 结果为 1/2。', pit: '不要把 1 − q 算成 1 − 1/3 = 1/3 之外的数；通分要细心。' }, difficulty: 3, estSeconds: 55, skillTag: '等比级数', source: '自建' },
    { id: 'math4-series-4', kpIds: ['math-series'], subject: 'math', type: 'fill',
      stem: '∑(n=1→∞) 1/(n(n+1)) = ______。',
      answer: '1', accept: ['1'],
      analysis: { ans: '1', why: '拆成两项之差，部分和会发生连锁抵消。', steps: '1. 1/(n(n+1)) = 1/n − 1/(n+1)。\n2. 部分和 S_n = (1 − 1/2) + (1/2 − 1/3) + … + (1/n − 1/(n+1))。\n3. 中间项全部抵消，S_n = 1 − 1/(n+1)。\n4. 令 n→∞，得 1。', pit: '裂项后要写出部分和再取极限，不能直接把每一项都当成 0 相加。' }, difficulty: 4, estSeconds: 75, skillTag: '裂项相消', source: '自建' },

    /* ---------- math-vector ---------- */
    { id: 'math4-vector-1', kpIds: ['math-vector'], subject: 'math', type: 'single',
      stem: '已知 A(1, 0, 0)，B(0, 1, 0)，则向量 AB 是？',
      options: ['(1, −1, 0)', '(−1, 1, 0)', '(1, 1, 0)', '(−1, −1, 0)'],
      answer: 'B',
      analysis: { ans: '(−1, 1, 0)', why: '向量 AB 用终点坐标减起点坐标。', steps: '1. AB = B − A。\n2. 逐分量相减：(0 − 1, 1 − 0, 0 − 0)。\n3. 得 (−1, 1, 0)。', pit: '方向不能反；BA = (1, −1, 0)，与 AB 互为相反向量。' }, difficulty: 2, estSeconds: 45, skillTag: '空间向量坐标', source: '自建' },
    { id: 'math4-vector-2', kpIds: ['math-vector'], subject: 'math', type: 'single',
      stem: '平面 2x − y + 3z = 6 的一个法向量是？',
      options: ['(2, −1, 3)', '(2, 1, 3)', '(−2, −1, 3)', '(2, −1, −3)'],
      answer: 'A',
      analysis: { ans: '(2, −1, 3)', why: '平面一般式 Ax + By + Cz + D = 0 中，三个系数直接构成法向量。', steps: '1. 把方程写成 2x − y + 3z − 6 = 0。\n2. 对应 A = 2，B = −1，C = 3。\n3. 法向量 n = (2, −1, 3)。', pit: '只有 x、y、z 的系数才是法向量，常数项 −6 不参与。' }, difficulty: 2, estSeconds: 50, skillTag: '平面法向量', source: '自建' },
    { id: 'math4-vector-3', kpIds: ['math-vector'], subject: 'math', type: 'fill',
      stem: '点 P(1, 2, 3) 到平面 x + 2y + 2z − 6 = 0 的距离是 ______。',
      answer: '5/3', accept: ['5/3', '1.67'],
      analysis: { ans: '5/3', why: '套点到平面的距离公式，分子代入点坐标，分母是法向量的模。', steps: '1. 分子：|1 + 2×2 + 2×3 − 6| = |1 + 4 + 6 − 6| = 5。\n2. 分母：√(1^2 + 2^2 + 2^2) = √9 = 3。\n3. 距离 d = 5/3。', pit: '分母是法向量 (1, 2, 2) 的模，不是平面方程里常数项的绝对值。' }, difficulty: 3, estSeconds: 70, skillTag: '点到平面距离', source: '自建' },
    { id: 'math4-vector-4', kpIds: ['math-vector'], subject: 'math', type: 'fill',
      stem: '已知 a = (1, 2, 0)，b = (0, 1, 1)，则 a·b = ______。',
      answer: '2', accept: ['2'],
      analysis: { ans: '2', why: '数量积等于对应分量乘积之和。', steps: '1. a·b = 1×0 + 2×1 + 0×1。\n2. 逐项相加：0 + 2 + 0。\n3. 结果为 2。', pit: '不要漏掉第三个分量；两个向量对应分量必须一一相乘再相加。' }, difficulty: 2, estSeconds: 45, skillTag: '数量积', source: '自建' }
  ]));

  /* ======================= 讲义 ======================= */
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'xmath-seq-L2', kpIds: ['math-sequence'], subject: 'math', level: 2,
      title: '数列与数列极限：把「越来越近」写成公式',
      estMinutes: 45,
      hookTitle: '数列和函数，到底差在哪？',
      hookBody: '差在定义域。数列只把正整数一个个代进去，得到一个排好队的数；函数可以连续取值。所以数列极限只关心 n 越来越大时，这一队数往哪儿靠。',
      idea: '数列是定义在正整数上的函数，记作 a_n。数列极限 lim(n→∞) a_n = A 的意思是：n 足够大以后，a_n 可以任意接近 A。收敛指极限存在，否则叫发散。',
      diagramId: 'limit-approach', diagramCaption: 'n 越大，点越贴近水平线 y = A',
      analogy: { title: '一队人走向终点线', md: '数列像一队人依次走向终点线，第 n 个人离终点越来越近。极限不是「某个人站到了终点」，而是「再往后所有人都会进入终点附近的任意小圈子里」。' },
      points: [
        { title: '一、数列是整点上的函数', md: 'a_n 的下标 n 只能取 1、2、3……，所以它是一串离散的点，不是一条连续曲线。求极限时 n 只往正无穷走，不可能取负数或分数。' },
        { title: '二、极限的直观读法', md: 'lim(n→∞) a_n = A 表示：只要 n 足够大，a_n 与 A 的距离就小于任意给定的正数。关键词是「任意小」，不是「差不多就行」。' },
        { title: '三、收敛与发散', md: '有唯一确定的极限叫收敛；极限不存在（含趋于无穷、来回震荡）叫发散。收敛的数列一定有界，但有界的数列不一定收敛，例如 (−1)^n。' },
        { title: '四、四则运算法则', md: '若 lim a_n = A、lim b_n = B 都存在，则和差积商的极限分别等于 A ± B、AB、A/B（B ≠ 0）。前提是两边都收敛，缺一不可。' },
        { title: '五、常用的两个基本极限', md: 'lim(n→∞) 1/n = 0，lim(n→∞) q^n = 0（|q| < 1）。遇到多项式分式，先分子分母同除 n 的最高次，再逐项用这两个结论。' },
        { title: '六、夹逼准则的雏形', md: '若 b_n ≤ a_n ≤ c_n，且 b_n 与 c_n 都趋于同一个数 A，则 a_n 也趋于 A。数列里常用来处理带 n 的复杂分母，例如 0 < n/(n^2+1) < 1/n。' },
        { title: '七、单调有界必收敛', md: '单调递增且有上界的数列一定收敛，单调递减且有下界的也一定收敛。这个结论只保证极限存在，不告诉你极限是多少，通常配合递推式使用。' }
      ],
      table: {
        headers: ['数列', 'n→∞ 时的结果', '说明'],
        rows: [
          ['1/n', '0', '分母越大值越小'],
          ['(−1)^n', '不存在', '来回震荡，不趋于唯一值'],
          ['q^n（|q| < 1）', '0', '公比绝对值小于 1 时衰减'],
          ['(n + 1)/n', '1', '拆成 1 + 1/n'],
          ['n^(1/n)', '1', '可用夹逼或重要极限证明']
        ]
      },
      code: 'a_n = 1/n 的前几项：\n1, 0.5, 0.333, 0.25, 0.2\n\nlim(n→∞) 1/n = 0\nlim(n→∞) (n+1)/n = 1\nlim(n→∞) (2n+1)/n = 2\nlim(n→∞) (-1)^n = 不存在',
      warning: '有界只是收敛的必要条件。判断一个数列是否收敛，必须看它是否趋于唯一确定的常数，不能因为它「不会跑太远」就下结论。',
      tip: '多项式分式求极限的固定动作：分子分母同除以 n 的最高次，再逐项看谁趋于 0、谁保留常数。',
      quizIds: ['math4-seq-1', 'math4-seq-2', 'math4-seq-3', 'math4-seq-4'],
      example: {
        title: '求 (3n^2 + n)/(n^2 − 2) 的极限',
        steps: [
          { md: '观察最高次：分子分母都是 n 的二次，同除以 n^2。' },
          { md: '分子变成 3 + 1/n，分母变成 1 − 2/n^2。' },
          { md: 'n→∞ 时 1/n→0，2/n^2→0。' },
          { md: '极限为 (3 + 0)/(1 − 0) = 3。' }
        ],
        takeaway: '同除最高次后，留下的常数之比就是极限；同次时极限等于系数之比。'
      },
      example2: {
        title: '用夹逼证明 n/(n^2 + 1) 趋于 0',
        steps: [
          { md: '分母 n^2 + 1 > n^2，所以 n/(n^2 + 1) < n/n^2 = 1/n。' },
          { md: '同时各项为正，所以 0 < n/(n^2 + 1) < 1/n。' },
          { md: 'n→∞ 时左端 0 与右端 1/n 都趋于 0。' },
          { md: '由夹逼准则，中间项也趋于 0。' }
        ],
        takeaway: '夹逼的关键是找到一个更简单的上界，并让它和常数列 0 一起收敛。'
      },
      guided: [{ questionId: 'math4-seq-2', hint: '先把分子拆成两项，再分别看极限。' }],
      solo: ['math4-seq-1', 'math4-seq-3'],
      challenge: ['math4-seq-4'],
      summary: {
        essence: '数列是正整数上的函数；极限描述 n 无限增大时的趋势；收敛必须唯一。',
        formulas: ['lim(n→∞) 1/n = 0', 'lim(n→∞) q^n = 0（|q| < 1）', 'lim(a_n ± b_n) = lim a_n ± lim b_n'],
        pitfalls: ['把有界当成收敛', '忘记两个极限都存在才能用四则运算', '求极限时把 1/n 仍当作非零', '震荡数列写成极限 0'],
        checklist: ['我能判断一个数列是否收敛', '我会同除最高次求分式极限', '我能说出四则运算的前提', '我会用夹逼处理简单上界']
      },
      feynman: '请用「一队人走向终点线」的比喻，解释数列极限为什么不是一个具体的项，而是一种趋势。'
    }),

    Z.makeLesson({
      id: 'xmath-squeeze-L3', kpIds: ['math-squeeze'], subject: 'math', level: 3,
      title: '夹逼准则与两个重要极限：从两边把它挤住',
      estMinutes: 45,
      hookTitle: 'sin x / x 在 0 点没有定义，为什么还能求极限？',
      hookBody: '因为极限只看「靠近 0 的过程中」函数怎么变，不看 0 点本身的值。sin x / x 在 x = 0 处无定义，但 x 从两侧靠近 0 时，它的值稳定地靠近 1。',
      idea: '夹逼准则：若 b_n ≤ a_n ≤ c_n，且两端极限相同，则中间也收敛到该值。两个重要极限是它的经典产物：lim(x→0) sin x / x = 1，lim(x→∞) (1 + 1/x)^x = e。',
      diagramId: 'infinitesimal-compare', diagramCaption: 'sin x、x、tan x 在 0 附近的大小关系',
      analogy: { title: '两堵墙之间推车', md: '夹逼就像把一辆小车放在两堵会同时靠拢的墙之间。左墙停在 1，右墙也停在 1，小车没有别的路可走，只能停在 1。两端极限相同，是中间被逼到同一点的唯一理由。' },
      points: [
        { title: '一、夹逼准则要凑齐三件事', md: '第一，找到下界和上界；第二，不等式在整个趋近过程中成立；第三，两端极限相同。三条缺一不可，只写「看起来在中间」不算证明。' },
        { title: '二、常用的夹逼素材', md: '带 n 的分式常抓最大项与最小项：n/(n^2+1) 小于 1/n，大于 n/(n^2+n)。三角函数常用 sin x 的绝对值不超过 1，于是 sin x/x 在 x→∞ 时被 ±1/x 夹住。' },
        { title: '三、第一个重要极限', md: 'lim(x→0) sin x / x = 1。条件是 x 用弧度制、趋向 0。它的几何依据是 0 < x < π/2 时 sin x < x < tan x，同除以 sin x 后两端都趋于 1。' },
        { title: '四、第一个重要极限的变形', md: '只要结构是「sin 同一个无穷小」除以「同一个无穷小」，结果就是 1。例如 sin(3x)/(3x)→1，1 − cos x 与 x^2/2 等价。分子分母必须严格同一个东西。' },
        { title: '五、第二个重要极限', md: 'lim(x→∞) (1 + 1/x)^x = e，等价写法是 lim(x→0) (1 + x)^(1/x) = e。识别特征是底数趋于 1、指数趋于无穷，也就是 1 的无穷次型。' },
        { title: '六、1 的无穷次型怎么凑', md: '把底数写成 1 + u，再把指数凑成 1/u 的倍数：多做出来的倍数放到外层当指数。例如 (1 + 2x)^(1/x) 先写成 [(1 + 2x)^(1/(2x))]^2，极限是 e^2。' },
        { title: '七、等价无穷小是重要极限的副产品', md: 'x→0 时 sin x ~ x，tan x ~ x，1 − cos x ~ x^2/2，ln(1 + x) ~ x，e^x − 1 ~ x。替换只能用在乘除的因子上，加减项要先变形再换。' }
      ],
      table: {
        headers: ['形式', '结果', '用途'],
        rows: [
          ['lim(x→0) sin x / x', '1', '含 sin 的 0/0 型'],
          ['lim(x→∞) (1 + 1/x)^x', 'e', '1 的无穷次型'],
          ['lim(x→0) (1 + x)^(1/x)', 'e', '同一结论的另一种写法'],
          ['lim(x→0) (1 − cos x)/x^2', '1/2', '先恒等变形再等价'],
          ['lim(x→0) tan x / x', '1', 'tan x ~ x']
        ]
      },
      code: 'lim(x→0) sin x / x = 1\nlim(x→∞) (1 + 1/x)^x = e\nlim(x→0) (1 + x)^(1/x) = e\nlim(x→0) (1 - cos x) / x^2 = 1/2\nlim(x→0) sin(3x) / x = 3',
      warning: '重要极限的「配套」不能破坏。sin(3x)/x 不是 1，而是 3；因为分母少乘了一个 3。先把分子分母凑成同一个无穷小，再写结果。',
      tip: '看到 1 的无穷次型，先写成 1 + u，再看指数能不能凑成 1/u；多退少补的倍数全部搬到最外层。',
      quizIds: ['math4-squeeze-1', 'math4-squeeze-2', 'math4-squeeze-3', 'math4-squeeze-4'],
      example: {
        title: '求 lim(x→0) sin(3x)/x',
        steps: [
          { md: '目标是凑出 sin(3x)/(3x) 的结构。' },
          { md: '把原式写成 sin(3x)/(3x) × 3。' },
          { md: '第一因子趋于 1，第二因子是常数 3。' },
          { md: '极限为 1 × 3 = 3。' }
        ],
        takeaway: '凑结构时，分子分母同乘同一个数，整体值不变。'
      },
      example2: {
        title: '求 lim(x→∞) (1 + 2/x)^x',
        steps: [
          { md: '底数写成 1 + u，其中 u = 2/x。' },
          { md: '要凑 1/u = x/2，所以把指数写成 (x/2) × 2。' },
          { md: '原式 = [(1 + 2/x)^(x/2)]^2。' },
          { md: '方括号内趋于 e，结果为 e^2。' }
        ],
        takeaway: '指数配平的原则：里面乘了几，外面就除以几。'
      },
      guided: [{ questionId: 'math4-squeeze-2', hint: '先把 1 − cos x 写成 2sin^2(x/2)，再用等价无穷小。' }],
      solo: ['math4-squeeze-1', 'math4-squeeze-3'],
      challenge: ['math4-squeeze-4'],
      summary: {
        essence: '夹逼准则用两端相同的极限锁住中间；两个重要极限是它的代表成果。',
        formulas: ['lim(x→0) sin x / x = 1', 'lim(x→∞) (1 + 1/x)^x = e', '1 − cos x ~ x^2/2（x→0）'],
        pitfalls: ['把 sin(3x)/x 当成 1', '夹逼时两端极限不同却下结论', '1 的无穷次直接写 1', '在加减项中乱用等价替换'],
        checklist: ['我能说出夹逼准则的三个条件', '我会凑 sin(kx)/(kx)', '我会把 1 的无穷次型配平成 e', '我知道等价替换的使用边界']
      },
      feynman: '请用「两堵墙夹车」的比喻解释夹逼准则，并说明为什么两端极限必须相同。'
    }),

    Z.makeLesson({
      id: 'xmath-econ-L3', kpIds: ['math-deriv-econ'], subject: 'math', level: 3,
      title: '导数在经济中的应用：边际与弹性',
      estMinutes: 45,
      hookTitle: '多生产一件，真的多赚一件的钱吗？',
      hookBody: '不一定。多生产一件带来的是边际成本，多卖一件带来的是边际收益。只有当边际收益大于边际成本时，多做这一件才真的增加利润。这两个「边际」，本质都是导数。',
      idea: '边际函数就是经济函数的导数，表示「再增加一个单位」带来的增量。需求价格弹性是需求量相对变化与价格相对变化之比，用 η = −(dQ/dP)·(P/Q) 度量，反映涨价对需求的影响程度。',
      diagramId: 'derivative-tangent', diagramCaption: '边际成本就是成本曲线上该点的切线斜率',
      analogy: { title: '仪表盘上的两个表', md: '边际像速度表：它告诉你此刻再走一分钟能多走多远，而不是已经走了多远。弹性像百分比表：它不关心你实际走了几公里，只关心「速度变化 1% 时，路程变化百分之几」。' },
      points: [
        { title: '一、边际就是导数', md: '总成本 C(Q)、总收益 R(Q)、总利润 L(Q) 对产量 Q 求导，分别得到边际成本 MC、边际收益 MR、边际利润。经济学里的「边际」二字，数学上就是瞬时变化率。' },
        { title: '二、边际成本与固定成本无关', md: 'C(Q) = 2Q^2 + 10Q + 50 中，常数 50 是固定成本，求导后消失。所以 MC = 4Q + 10，固定成本只影响总成本，不影响多生产一件的成本。' },
        { title: '三、利润最大化的条件', md: '利润 L(Q) = R(Q) − C(Q)，令 L′(Q) = 0 得 MR = MC。直观理解：只要多卖一件带来的收益大于成本，就该继续生产；两者相等时到达最优。' },
        { title: '四、需求函数与边际需求', md: '需求函数 Q = Q(P) 描述价格与需求量的关系，通常向下倾斜。dQ/dP 叫边际需求，是负值，表示价格每上涨一单位，需求量减少多少单位。' },
        { title: '五、需求价格弹性的公式', md: 'η = −(dQ/dP)·(P/Q)。前面加负号是为了让弹性取正值，方便比较。它衡量的是「价格变动 1% 时，需求量变动百分之几」，是一个无量纲的数。' },
        { title: '六、富有弹性与缺乏弹性', md: 'η > 1 称为富有弹性，降价能明显带动销量，总收入增加；η < 1 称为缺乏弹性，涨价对销量影响小，总收入反而增加；η = 1 时收入达到转折点。' },
        { title: '七、计算顺序不能颠倒', md: '先对函数求导，再代入具体的 P 或 Q。若先代入再求导，得到的是常数 0，完全没有意义。弹性还要先由价格算出对应的需求量，再代入公式。' }
      ],
      table: {
        headers: ['概念', '公式', '含义'],
        rows: [
          ['边际成本', 'MC = C′(Q)', '多生产一件增加的成本'],
          ['边际收益', 'MR = R′(Q)', '多卖一件增加的收益'],
          ['边际利润', 'L′(Q) = R′(Q) − C′(Q)', '多生产一件增加的利润'],
          ['需求价格弹性', 'η = −(dQ/dP)·(P/Q)', '需求对价格的敏感程度']
        ]
      },
      code: 'Q = 100 - 2P\ndQ/dP = -2                 # 边际需求\n\nP = 10 时，Q = 80\nη = -(dQ/dP) * (P/Q)\n  = -(-2) * (10/80)\n  = 0.25                   # 缺乏弹性\n\nC(Q) = 2Q^2 + 10Q + 50\nMC = 4Q + 10',
      warning: '边际不是平均。平均成本是 C(Q)/Q，边际成本是 C′(Q)，两者一般不相等。考试里问「再多生产一件的成本」，一定用导数，不能用除法。',
      tip: '弹性题分三步：求 dQ/dP、由价格算 Q、代入 η = −(dQ/dP)(P/Q)。三步都写出来，才不容易漏负号。',
      quizIds: ['math4-econ-1', 'math4-econ-2', 'math4-econ-3', 'math4-econ-4'],
      example: {
        title: '求 Q = 10 时的边际成本',
        steps: [
          { md: '成本函数 C(Q) = Q^2 + 4Q + 100。' },
          { md: '求导：C′(Q) = 2Q + 4。' },
          { md: '代入 Q = 10：2×10 + 4 = 24。' },
          { md: '含义：产量从 10 增加到 11 时，成本大约增加 24。' }
        ],
        takeaway: '边际成本是导数在具体产量处的取值，不是总成本除以产量。'
      },
      example2: {
        title: '判断涨价是否划算',
        steps: [
          { md: '需求函数 Q = 100 − 2P，考察 P = 20 时的弹性。' },
          { md: '先算 Q = 100 − 40 = 60，dQ/dP = −2。' },
          { md: 'η = 2 × 20/60 = 2/3 ≈ 0.67，小于 1，缺乏弹性。' },
          { md: '缺乏弹性时涨价，需求量下降幅度小于价格涨幅，总收入增加。' }
        ],
        takeaway: '弹性小于 1 时，价格与总收入同向变化；弹性大于 1 时反向变化。'
      },
      guided: [{ questionId: 'math4-econ-2', hint: '边际成本是 C(Q) 的导数，常数项求导为 0。' }],
      solo: ['math4-econ-1', 'math4-econ-3'],
      challenge: ['math4-econ-4'],
      summary: {
        essence: '边际是导数，描述再增加一个单位的增量；弹性是相对变化率之比。',
        formulas: ['MC = C′(Q)，MR = R′(Q)', '利润最大：MR = MC', 'η = −(dQ/dP)·(P/Q)'],
        pitfalls: ['把平均成本当边际成本', '先代值再求导', '弹性漏掉负号', '把 |η| 与 1 的比较方向记反'],
        checklist: ['我能求边际成本与边际收益', '我知道利润最大化的条件', '我会算需求价格弹性', '我能解释弹性大于 1 与小于 1 的区别']
      },
      feynman: '请用速度表的比喻，说明边际成本与平均成本的区别，并举一个数字例子。'
    }),

    Z.makeLesson({
      id: 'xmath-improper-L4', kpIds: ['math-improper'], subject: 'math', level: 4,
      title: '反常积分：把无穷和断裂处算进面积',
      estMinutes: 50,
      hookTitle: '积分区间是无穷，面积还能是有限的吗？',
      hookBody: '能。只要曲线下降得足够快，向右无限延伸的面积可以加起来是一个有限的数。反常积分就是用极限把这种「无限」变成可计算的对象。',
      idea: '反常积分分两类：无穷限积分（区间延伸到 ±∞）与瑕积分（被积函数在区间内某点无界）。两类都用极限定义：先截断到有限范围算定积分，再让截断点趋于无穷或瑕点。',
      diagramId: 'integral-area', diagramCaption: '曲线向右无限延伸，但总面积可以收敛到一个有限值',
      analogy: { title: '越走越窄的走廊', md: '一条无限长的走廊，如果它越来越窄，总面积仍可能是有限的。1/x^2 就是这样：走得越远，高度掉得越快，面积加起来收敛。而 1/x 掉得太慢，面积就发散。' },
      points: [
        { title: '一、两类反常积分', md: '第一类是无穷限：上限或下限是 +∞、−∞。第二类是瑕积分：被积函数在区间内某点趋于无穷，这个点叫瑕点。做题第一步永远是判断属于哪一类。' },
        { title: '二、无穷限的定义', md: '∫(a→+∞) f(x) dx = lim(b→+∞) ∫(a→b) f(x) dx。只有这个极限存在且有限，才说积分收敛，否则称发散。下限为 −∞ 时同理，取 a→−∞。' },
        { title: '三、p-积分在无穷端的结论', md: '∫(1→+∞) 1/x^p dx 当 p > 1 时收敛，当 p ≤ 1 时发散。记忆方法：分母的次幂必须大于 1，掉得够快，面积才收得住。' },
        { title: '四、瑕积分先找瑕点', md: '例如 ∫(0→1) 1/√x dx 在 x = 0 处无界，瑕点在左端点，要写成 lim(a→0+) ∫(a→1)。若瑕点在区间内部，必须从瑕点处拆成两个积分分别判断。' },
        { title: '五、瑕点处的 p-积分方向相反', md: '∫(0→1) 1/x^p dx 当 p < 1 时收敛，p ≥ 1 时发散。因为 x 靠近 0 时，次幂越大爆炸越快。这一点和无穷端的结论正好相反，最容易记混。' },
        { title: '六、标准计算三步', md: '第一步，把无穷上限或瑕点写成极限；第二步，对有限的定积分求原函数；第三步，取极限得数值或判断发散。三步写清楚，过程分才拿得到。' },
        { title: '七、收敛性可以比较', md: '若 0 ≤ f(x) ≤ g(x)，且 ∫g 收敛，则 ∫f 也收敛；若 ∫f 发散，则 ∫g 也发散。比较判别法能快速判断复杂被积函数，不必真算出数值。' }
      ],
      table: {
        headers: ['类型', '例子', '结果'],
        rows: [
          ['无穷限', '∫(1→+∞) 1/x^2 dx', '1，收敛'],
          ['无穷限', '∫(1→+∞) 1/x dx', '发散'],
          ['无穷限', '∫(0→+∞) e^(−x) dx', '1，收敛'],
          ['瑕积分', '∫(0→1) 1/√x dx', '2，收敛'],
          ['瑕积分', '∫(0→1) 1/x dx', '发散']
        ]
      },
      code: '∫(1→+∞) 1/x^2 dx\n= lim(b→+∞) [ -1/x ](1→b)\n= lim(b→+∞) (1 - 1/b)\n= 1        # 收敛\n\n∫(1→+∞) 1/x dx\n= lim(b→+∞) ln b = +∞   # 发散',
      warning: '不能把 +∞ 直接代进原函数，也不能把瑕点直接代进牛顿-莱布尼茨公式。所有「趋于无穷」的位置，都必须先写成极限符号，再取极限。',
      tip: 'p-积分口诀：无穷端要 p > 1，瑕点处要 p < 1。一个是「掉得快」，一个是「炸得慢」，方向相反。',
      quizIds: ['math4-improper-1', 'math4-improper-2', 'math4-improper-3', 'math4-improper-4'],
      example: {
        title: '计算 ∫(0→+∞) e^(−2x) dx',
        steps: [
          { md: '写成极限：lim(b→+∞) ∫(0→b) e^(−2x) dx。' },
          { md: '原函数为 −e^(−2x)/2。' },
          { md: '代入上下限得 (1 − e^(−2b))/2。' },
          { md: 'b→+∞ 时 e^(−2b)→0，结果为 1/2。' }
        ],
        takeaway: '指数衰减的无穷限积分，只要系数为正，结果一定是有限值。'
      },
      example2: {
        title: '判断 ∫(1→+∞) 1/x^3 dx 的收敛性',
        steps: [
          { md: '这是无穷限的 p-积分，p = 3。' },
          { md: '因为 3 > 1，直接判定收敛。' },
          { md: '若要算值：原函数为 −1/(2x^2)。' },
          { md: '代入得 (1 − 1/b^2)/2，取极限为 1/2。' }
        ],
        takeaway: '先用 p-积分判别定性，再决定要不要算出具体数值。'
      },
      guided: [{ questionId: 'math4-improper-2', hint: '把积分算到 b，观察 b^(1−p) 在什么条件下趋于 0。' }],
      solo: ['math4-improper-1', 'math4-improper-3'],
      challenge: ['math4-improper-4'],
      summary: {
        essence: '反常积分用极限定义，分无穷限与瑕积分两类；收敛性看极限是否存在且有限。',
        formulas: ['∫(a→+∞) f = lim(b→+∞) ∫(a→b) f', '∫(1→+∞) 1/x^p 收敛 ⇔ p > 1', '∫(0→1) 1/x^p 收敛 ⇔ p < 1'],
        pitfalls: ['直接把 +∞ 代入原函数', '瑕点未拆就套公式', '两类 p-积分结论记反', '判断为收敛却不写极限过程'],
        checklist: ['我能区分两类反常积分', '我会写极限定义式', '我记住两个 p-积分结论', '我能用比较判别法快速定性']
      },
      feynman: '请用「越走越窄的走廊」解释为什么 1/x^2 的无穷积分收敛，而 1/x 的无穷积分发散。'
    }),

    Z.makeLesson({
      id: 'xmath-series-L4', kpIds: ['math-series'], subject: 'math', level: 4,
      title: '无穷级数入门：把无穷多项加起来',
      estMinutes: 50,
      hookTitle: '无穷多个数相加，结果一定无穷大吗？',
      hookBody: '不一定。1/2 + 1/4 + 1/8 + … 加到无穷还不到 1。关键在于每一项衰减得够不够快，而这件事要靠「部分和数列的极限」来说清楚。',
      idea: '无穷级数 ∑ a_n 的和，定义为部分和 S_n = a_1 + a_2 + … + a_n 当 n→∞ 时的极限。极限存在且有限则级数收敛，否则发散。所以级数问题本质上是数列极限问题。',
      diagramId: 'integral-area', diagramCaption: '每一项看成一块矩形面积，部分和就是累计面积',
      analogy: { title: '往存钱罐里投币', md: '第一天投 1/2 元，第二天投 1/4 元，每天投的钱都减半。投了无穷多天，罐子里总共也只有 1 元，因为后面投的钱越来越小。级数收敛，就是「无穷次投入，总量有限」。' },
      points: [
        { title: '一、级数就是部分和的极限', md: '把每项记作 a_n，部分和 S_n = a_1 + … + a_n。若 lim(n→∞) S_n = S，则称级数收敛于 S。所以判断级数，先写部分和，再看它的极限。' },
        { title: '二、等比级数是最好用的模板', md: '∑(n=1→∞) a1·q^(n−1)，当 |q| < 1 时收敛，和为 a1/(1 − q)；当 |q| ≥ 1 时发散。套公式前先确认首项和公比，别把 n = 0 与 n = 1 搞混。' },
        { title: '三、调和级数发散', md: '∑ 1/n 叫调和级数，部分和 S_n ≈ ln n，随 n 增大无界，所以发散。它是最重要的反例：通项趋于 0，级数却仍然发散。' },
        { title: '四、p-级数的结论', md: '∑(n=1→∞) 1/n^p 当 p > 1 时收敛，当 0 < p ≤ 1 时发散。p = 1 就是调和级数。判别时只要看分母的次幂，不必真求和。' },
        { title: '五、收敛的必要条件', md: '若级数收敛，则通项 a_n → 0。它的逆否命题更常用：只要 a_n 不趋于 0，级数立刻发散。但 a_n → 0 推不出收敛，调和级数就是证据。' },
        { title: '六、裂项相消求和', md: '1/(n(n+1)) = 1/n − 1/(n+1)，部分和中间项全部抵消，只剩首尾，S_n = 1 − 1/(n+1)，极限为 1。这类题的关键是把通项拆成两项之差。' },
        { title: '七、比值判别法的思路', md: '若 lim(n→∞) |a_(n+1)/a_n| = ρ，则 ρ < 1 时收敛，ρ > 1 时发散，ρ = 1 时失效。它适合含阶乘、指数、n 次方的级数，判断速度快。' }
      ],
      table: {
        headers: ['级数', '收敛性', '理由'],
        rows: [
          ['∑ 1/2^n', '收敛，和为 1', '公比 1/2 的等比级数'],
          ['∑ 1/n', '发散', '调和级数，部分和无界'],
          ['∑ 1/n^2', '收敛', 'p = 2 > 1 的 p-级数'],
          ['∑ (1/3)^n', '收敛，和为 1/2', '首项与公比都是 1/3'],
          ['∑ 1/(n(n+1))', '收敛，和为 1', '裂项相消']
        ]
      },
      code: 'S_n = 1/2 + 1/4 + ... + 1/2^n\nlim(n→∞) S_n = 1        # 等比级数收敛\n\n1 + 1/2 + 1/3 + ...     # 调和级数\nS_n ≈ ln n → +∞          # 发散\n\n∑ 1/(n(n+1)) = 1         # 裂项相消',
      warning: '通项趋于 0 只是收敛的必要条件，不是充分条件。看到 ∑ 1/n 这种通项趋于 0 却发散的级数，不要凭直觉判收敛。',
      tip: '判敛顺序：先看通项是否趋于 0（不趋于就发散）；再看是不是等比或 p-级数；都不是，再考虑比值法或裂项。',
      quizIds: ['math4-series-1', 'math4-series-2', 'math4-series-3', 'math4-series-4'],
      example: {
        title: '求 ∑(n=1→∞) 1/(n(n+1))',
        steps: [
          { md: '裂项：1/(n(n+1)) = 1/n − 1/(n+1)。' },
          { md: '写部分和 S_n = (1 − 1/2) + (1/2 − 1/3) + … + (1/n − 1/(n+1))。' },
          { md: '中间项成对抵消，只剩 S_n = 1 − 1/(n+1)。' },
          { md: 'n→∞ 时 1/(n+1)→0，和为 1。' }
        ],
        takeaway: '裂项相消题，先写部分和再取极限，别直接对每一项求极限。'
      },
      example2: {
        title: '求 ∑(n=0→∞) (1/3)^n',
        steps: [
          { md: '这是从 n = 0 开始的等比级数。' },
          { md: '首项 a1 = (1/3)^0 = 1，公比 q = 1/3。' },
          { md: '|q| < 1，套公式 S = a1/(1 − q)。' },
          { md: 'S = 1/(1 − 1/3) = 1/(2/3) = 3/2。' }
        ],
        takeaway: '先确认从哪一项开始，首项取错，和就整体错。'
      },
      guided: [{ questionId: 'math4-series-2', hint: '把四个选项分别归类：p-级数还是等比级数。' }],
      solo: ['math4-series-1', 'math4-series-3'],
      challenge: ['math4-series-4'],
      summary: {
        essence: '级数的和是部分和的极限；收敛与否看这个极限是否存在且有限。',
        formulas: ['S_n = a_1 + … + a_n，S = lim S_n', '等比：|q| < 1 时 S = a1/(1 − q)', 'p-级数：p > 1 收敛'],
        pitfalls: ['把通项趋于 0 当成收敛', '等比级数首项取错', '忽略 p = 1 的调和级数', '裂项后直接对通项取极限'],
        checklist: ['我会写部分和', '我会判断等比级数收敛性', '我记住调和级数发散', '我会用裂项相消求和']
      },
      feynman: '请用存钱罐的比喻解释等比级数为什么收敛，并说明调和级数为什么反而发散。'
    }),

    Z.makeLesson({
      id: 'xmath-vector-L3', kpIds: ['math-vector'], subject: 'math', level: 3,
      title: '空间向量与平面方程：用一组方向锁定一张平面',
      estMinutes: 45,
      hookTitle: '一张无限大的平面，怎么用几个数字说清楚？',
      hookBody: '靠一个点和一条垂直于它的方向。点告诉你平面经过哪里，法向量告诉你平面朝哪边「立起来」。两者一确定，平面就唯一确定了。',
      idea: '空间向量用坐标表示，加减与数乘按分量进行。平面的点法式方程是 A(x − x0) + B(y − y0) + C(z − z0) = 0，其中 (A, B, C) 是法向量；展开即得一般式 Ax + By + Cz + D = 0。',
      diagramId: 'partial-surface', diagramCaption: '平面是曲面方程的一次特例，位置由点和法向量共同决定',
      analogy: { title: '门板与门轴', md: '平面的位置像一扇门：门轴上的一个点决定它挂在哪里，门板的朝向由一根垂直插进板面的钉子决定。这根钉子就是法向量，换一根更长的钉子，朝向不变。' },
      points: [
        { title: '一、向量由终点减起点', md: '已知 A(x1, y1, z1)、B(x2, y2, z2)，则 AB = (x2 − x1, y2 − y1, z2 − z1)。顺序不能反，BA 与 AB 互为相反向量。' },
        { title: '二、数量积判断垂直', md: 'a·b = a1b1 + a2b2 + a3b3，结果是一个数。a·b = 0 等价于两向量垂直（非零向量）。它也可以算夹角：cos θ = a·b/(|a||b|)。' },
        { title: '三、向量积给出法向量', md: 'a×b 是一个同时垂直于 a 和 b 的向量，按「右、减、右」的行列式规则计算。已知平面内两个不共线向量，叉乘一次就得到法向量。' },
        { title: '四、点法式方程', md: '过点 P0(x0, y0, z0)、法向量为 n = (A, B, C) 的平面：A(x − x0) + B(y − y0) + C(z − z0) = 0。依据是平面内任一向量都与法向量垂直。' },
        { title: '五、一般式与法向量的对应', md: '把点法式展开得 Ax + By + Cz + D = 0，其中 D = −(Ax0 + By0 + Cz0)。反过来，看到一般式，x、y、z 的系数直接就是法向量，常数项不参与。' },
        { title: '六、点到平面的距离', md: '点 (x0, y0, z0) 到平面 Ax + By + Cz + D = 0 的距离为 |Ax0 + By0 + Cz0 + D| / √(A^2 + B^2 + C^2)。分子加绝对值，分母是法向量的模。' },
        { title: '七、两平面的位置关系', md: '法向量平行则两平面平行或重合；法向量垂直（点积为 0）则两平面垂直。判断平面关系，一律转化成判断法向量的关系。' }
      ],
      table: {
        headers: ['已知条件', '方程或公式', '要点'],
        rows: [
          ['一点 + 法向量', 'A(x − x0) + B(y − y0) + C(z − z0) = 0', '点法式最直观'],
          ['一般式', 'Ax + By + Cz + D = 0', '系数即法向量'],
          ['点到平面距离', '|Ax0 + By0 + Cz0 + D| / √(A^2 + B^2 + C^2)', '分子要加绝对值'],
          ['两平面垂直', 'A1A2 + B1B2 + C1C2 = 0', '法向量点积为零']
        ]
      },
      code: 'A(1, 0, 0), B(0, 1, 0)\nAB = B - A = (-1, 1, 0)\n\na = (1, 2, 0), b = (0, 1, 1)\na·b = 0 + 2 + 0 = 2\n\na × b = (2*1 - 0*1, 0*0 - 1*1, 1*1 - 2*0)\n      = (2, -1, 1)',
      warning: '法向量不唯一，任意非零倍数都表示同一个方向。但求点到平面距离时，必须使用一般式里配套的那组系数，不能随便缩放后只改分子不改分母。',
      tip: '写平面方程的标准流程：先写点法式，再展开合并成一般式。求距离时，先把平面整理成 Ax + By + Cz + D = 0 的标准形状。',
      quizIds: ['math4-vector-1', 'math4-vector-2', 'math4-vector-3', 'math4-vector-4'],
      example: {
        title: '求过点 (1, 2, 3) 且法向量为 (1, 0, 2) 的平面',
        steps: [
          { md: '套点法式：1(x − 1) + 0(y − 2) + 2(z − 3) = 0。' },
          { md: '展开：x − 1 + 2z − 6 = 0。' },
          { md: '合并常数：x + 2z − 7 = 0。' },
          { md: '写成 x + 2z = 7，法向量仍是 (1, 0, 2)。' }
        ],
        takeaway: '点法式是起点，一般式是最终答案；展开时注意符号。'
      },
      example2: {
        title: '求点到平面的距离',
        steps: [
          { md: '平面 x + 2y + 2z − 6 = 0，点 P(1, 2, 3)。' },
          { md: '分子代入：|1 + 4 + 6 − 6| = 5。' },
          { md: '分母取法向量模：√(1 + 4 + 4) = 3。' },
          { md: '距离 d = 5/3。' }
        ],
        takeaway: '距离公式的分子是代入后的绝对值，分母永远是法向量的长度。'
      },
      guided: [{ questionId: 'math4-vector-2', hint: '一般式中 x、y、z 的系数就是法向量的三个分量。' }],
      solo: ['math4-vector-1', 'math4-vector-3'],
      challenge: ['math4-vector-4'],
      summary: {
        essence: '平面由一点和法向量唯一确定；一般式的系数就是法向量。',
        formulas: ['AB = B − A', 'A(x − x0) + B(y − y0) + C(z − z0) = 0', 'd = |Ax0 + By0 + Cz0 + D| / √(A^2 + B^2 + C^2)'],
        pitfalls: ['向量减法方向反了', '把常数项当法向量分量', '距离公式分母用错', '两平面关系去比常数项'],
        checklist: ['我会由两点写向量', '我会用系数读出法向量', '我能写出点法式并展开', '我会套点到平面距离公式']
      },
      feynman: '请用门板与钉子的比喻，解释为什么一点加一个法向量就能唯一确定一张平面。'
    })
  );
})(window.ZSB = window.ZSB || {});
