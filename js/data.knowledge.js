/* 知识图谱：三科 × 22 个考点 = 66 个考点 */
(function (Z) {
  Z.SUBJECTS = {
    english: { id: 'english', name: '英语', short: '英', color: '#7c9cff', fullMark: 150 },
    math: { id: 'math', name: '高数', short: '数', color: '#54d2ff', fullMark: 150 },
    cs: { id: 'cs', name: '计算机', short: '算', color: '#b28dff', fullMark: 150 }
  };

  Z.SUBJECT_ORDER = ['english', 'math', 'cs'];

  Z.LEVELS = {
    1: { name: '基础', en: 'L1', desc: '建立直觉，消灭陌生感' },
    2: { name: '掌握', en: 'L2', desc: '覆盖考纲标准要求' },
    3: { name: '进阶', en: 'L3', desc: '跨知识点综合' },
    4: { name: '拔高', en: 'L4', desc: '冲满分、会造轮子' }
  };

  // 计算机模块按「深度」命名，与难度分离
  Z.CS_LEVELS = {
    1: { name: '会用', en: 'L1', desc: '能照抄代码跑出结果' },
    2: { name: '会改', en: 'L2', desc: '能改参数、改逻辑达成新需求' },
    3: { name: '会写', en: 'L3', desc: '能不看示例从零写出' },
    4: { name: '懂原理', en: 'L4', desc: '能解释底层为什么这样设计' }
  };

  Z.levelMeta = function (subject, level) {
    return subject === 'cs' ? (Z.CS_LEVELS[level] || Z.LEVELS[level]) : Z.LEVELS[level];
  };

  /* ============================ 英语 22 ============================ */
  Z.KPS = [
    { id: 'eng-wordclass', subject: 'english', chapter: '语法基础', title: '词性九类', level: 1, examWeight: 0.05, prerequisites: [], examCount: 5, examPoints: 18, outcome: '能判断任意一个词在句子里担任什么岗位，不再靠中文意思猜', note: '单选、完形、翻译都在间接考它' },
    { id: 'eng-sentence', subject: 'english', chapter: '语法基础', title: '句子成分与五大句型', level: 1, examWeight: 0.05, prerequisites: ['eng-wordclass'], examCount: 4, examPoints: 16, outcome: '能划出主谓宾定状补，看懂长句骨架', note: '精读长难句的前置能力' },
    { id: 'eng-article', subject: 'english', chapter: '语法基础', title: '冠词与名词', level: 2, examWeight: 0.04, prerequisites: ['eng-wordclass'], examCount: 6, examPoints: 15, outcome: '能正确选择 a / an / the / 零冠词，处理可数与不可数名词', note: '冠词是中国学生最易丢分的「小词」' },
    { id: 'eng-pronoun', subject: 'english', chapter: '语法基础', title: '代词与 it 句型', level: 2, examWeight: 0.04, prerequisites: ['eng-wordclass'], examCount: 5, examPoints: 14, outcome: '能区分主格/宾格/形容词性物主代词，理解 it 作形式主语', note: '阅读指代题直接靠它' },
    { id: 'eng-agreement', subject: 'english', chapter: '语法基础', title: '主谓一致', level: 2, examWeight: 0.04, prerequisites: ['eng-present'], examCount: 6, examPoints: 16, outcome: '能按真正主语判断单复数，处理就近/就远原则', note: '改错题和翻译题的高频考点' },
    { id: 'eng-clause', subject: 'english', chapter: '语法基础', title: '从句：定语 / 名词性 / 状语', level: 2, examWeight: 0.06, prerequisites: ['eng-sentence'], examCount: 6, examPoints: 20, outcome: '能识别三大从句，找到先行词与引导词，拆开长句主干', note: '阅读长难句和翻译都靠它' },
    { id: 'eng-nonfinite', subject: 'english', chapter: '语法基础', title: '非谓语动词', level: 3, examWeight: 0.05, prerequisites: ['eng-clause'], examCount: 5, examPoints: 18, outcome: '能区分 doing / done / to do 在句中的不同作用', note: '一个句子里只能有一个谓语，其余动词要降级' },
    { id: 'eng-modal', subject: 'english', chapter: '语法基础', title: '情态动词', level: 2, examWeight: 0.04, prerequisites: ['eng-present'], examCount: 5, examPoints: 14, outcome: '能区分 can/must/may/should 及 must be / can\'t be 推测用法', note: '情态动词后接原形，是单选题的送分点' },
    { id: 'eng-comparison', subject: 'english', chapter: '语法基础', title: '比较级与最高级', level: 2, examWeight: 0.03, prerequisites: ['eng-wordclass'], examCount: 4, examPoints: 12, outcome: '能正确变化比较级/最高级，使用 as...as、than、the more...the more', note: '比较结构常出现在翻译和写作里' },
    { id: 'eng-preposition', subject: 'english', chapter: '语法基础', title: '介词与固定搭配', level: 2, examWeight: 0.03, prerequisites: ['eng-wordclass'], examCount: 5, examPoints: 14, outcome: '能分清 in/on/at 的时间与地点用法，记住高频动词短语', note: '固定搭配只能靠积累，但要先懂底层空间感' },

    { id: 'eng-present', subject: 'english', chapter: '时态与语态', title: '一般现在时', level: 2, examWeight: 0.04, prerequisites: ['eng-wordclass'], examCount: 6, examPoints: 14, outcome: '能区分「一直如此」和「此刻正在」，单三变化不出错', note: '单三和 does 后动词形式是高频送分点' },
    { id: 'eng-progressive', subject: 'english', chapter: '时态与语态', title: '进行时（现在 / 过去 / 将来）', level: 2, examWeight: 0.03, prerequisites: ['eng-present'], examCount: 5, examPoints: 13, outcome: '能识别 be + doing 的三种进行时，区分「正在」与「一直」', note: 'look/listen/now 是现在进行时的信号词' },
    { id: 'eng-future', subject: 'english', chapter: '时态与语态', title: '一般将来时', level: 2, examWeight: 0.03, prerequisites: ['eng-present'], examCount: 4, examPoints: 12, outcome: '能区分 will do 与 be going to do，正确使用时间状语从句', note: 'if/when 从句里用现在时表将来' },
    { id: 'eng-past', subject: 'english', chapter: '时态与语态', title: '一般过去时', level: 2, examWeight: 0.04, prerequisites: ['eng-present'], examCount: 5, examPoints: 15, outcome: '能按时间标志判断过去时，正确变化规则与不规则动词', note: '和现在完成时划界是高频陷阱' },
    { id: 'eng-perfect', subject: 'english', chapter: '时态与语态', title: '现在完成时', level: 3, examWeight: 0.05, prerequisites: ['eng-past'], examCount: 7, examPoints: 24, outcome: '能判断「过去发生但对现在有影响」，会和一般过去时划界', note: 'since / for / already / yet 是判断信号' },
    { id: 'eng-voice', subject: 'english', chapter: '时态与语态', title: '被动语态', level: 2, examWeight: 0.04, prerequisites: ['eng-past'], examCount: 4, examPoints: 14, outcome: '能判断何时用被动，并正确组合 be + 过去分词', note: '阅读中被动句是理解障碍之一' },

    { id: 'eng-inversion', subject: 'english', chapter: '特殊句式', title: '倒装句', level: 3, examWeight: 0.04, prerequisites: ['eng-sentence'], examCount: 4, examPoints: 13, outcome: '能识别否定词提前、only 提前、as/so 引起的倒装', note: '写作里用一句倒装能明显加分' },
    { id: 'eng-subjunctive', subject: 'english', chapter: '特殊句式', title: '虚拟语气', level: 3, examWeight: 0.04, prerequisites: ['eng-past', 'eng-clause'], examCount: 5, examPoints: 16, outcome: '能按「与现在/过去/将来相反」选择动词形式', note: 'if 虚拟三张表必须背熟' },

    { id: 'eng-reading', subject: 'english', chapter: '阅读与写作', title: '阅读定位与主旨', level: 2, examWeight: 0.05, prerequisites: ['eng-clause'], examCount: 8, examPoints: 30, outcome: '能先题干定位再回文找同义替换，区分主旨与细节', note: '阅读占分最高，先练定位再练速度' },
    { id: 'eng-translation', subject: 'english', chapter: '阅读与写作', title: '翻译与长难句拆解', level: 3, examWeight: 0.04, prerequisites: ['eng-reading'], examCount: 6, examPoints: 24, outcome: '能按「主干—修饰—从句」顺序拆分并译成通顺中文', note: '翻译题按意群给分，拆对结构就有一半分' },
    { id: 'eng-cloze', subject: 'english', chapter: '阅读与写作', title: '完形填空技巧', level: 3, examWeight: 0.03, prerequisites: ['eng-reading'], examCount: 5, examPoints: 15, outcome: '能先通读抓主线，再用搭配、逻辑、复现三条线索选词', note: '完形不是逐空翻译，而是补全一篇短文' },
    { id: 'eng-writing', subject: 'english', chapter: '阅读与写作', title: '写作：书信与议论文模板', level: 3, examWeight: 0.02, prerequisites: ['eng-translation'], examCount: 3, examPoints: 25, outcome: '能写出结构完整、连接词正确的应用文与短文', note: '先搭三段骨架，再填内容' },

    /* ============================ 高数 22 ============================ */
    { id: 'math-function', subject: 'math', chapter: '函数与预备', title: '函数概念与定义域', level: 1, examWeight: 0.04, prerequisites: [], examCount: 4, examPoints: 14, outcome: '能求定义域、判断奇偶性、写出复合函数', note: '定义域是所有题的第一道门槛' },
    { id: 'math-elementary', subject: 'math', chapter: '函数与预备', title: '基本初等函数', level: 1, examWeight: 0.04, prerequisites: ['math-function'], examCount: 5, examPoints: 16, outcome: '能画幂/指/对/三角函数的图像并说出性质', note: '图像记不住，极限和单调性都吃力' },
    { id: 'math-limit-def', subject: 'math', chapter: '极限与连续', title: '极限的直觉与定义', level: 1, examWeight: 0.04, prerequisites: ['math-function'], examCount: 3, examPoints: 12, outcome: '能用「无限逼近」解释极限，不再把求极限当成代入', note: '所有导数、积分的地基' },
    { id: 'math-limit-calc', subject: 'math', chapter: '极限与连续', title: '极限的计算', level: 2, examWeight: 0.06, prerequisites: ['math-limit-def'], examCount: 5, examPoints: 22, outcome: '能处理 0/0、∞/∞ 型，熟练用等价无穷小和洛必达', note: '先判断类型再动手，别上来就洛必达' },
    { id: 'math-infinity', subject: 'math', chapter: '极限与连续', title: '无穷小与等价无穷小', level: 2, examWeight: 0.04, prerequisites: ['math-limit-def'], examCount: 5, examPoints: 16, outcome: '能记住常用等价替换，并知道什么时候不能替换', note: '加减法中乱替换是经典错法' },
    { id: 'math-lhopital', subject: 'math', chapter: '极限与连续', title: '洛必达法则', level: 2, examWeight: 0.04, prerequisites: ['math-limit-calc'], examCount: 4, examPoints: 15, outcome: '能识别 0/0 与 ∞/∞，正确求导上下同时进行', note: '不是所有极限都能洛必达' },
    { id: 'math-continuity', subject: 'math', chapter: '极限与连续', title: '连续性与间断点', level: 2, examWeight: 0.03, prerequisites: ['math-limit-def'], examCount: 3, examPoints: 12, outcome: '能用三步定义判断连续，能识别可去/跳跃/无穷间断点', note: '连续是导数存在的前提' },

    { id: 'math-deriv-def', subject: 'math', chapter: '导数与微分', title: '导数的定义', level: 1, examWeight: 0.05, prerequisites: ['math-limit-def'], examCount: 4, examPoints: 18, outcome: '能用定义算导数，能解释导数是瞬时变化率与切线斜率', note: '定义法大题的第一问常考' },
    { id: 'math-deriv-basic', subject: 'math', chapter: '导数与微分', title: '基本求导公式与四则运算', level: 2, examWeight: 0.06, prerequisites: ['math-deriv-def'], examCount: 8, examPoints: 30, outcome: '能默写基本公式表，并用和差积商法则求导', note: '公式记错是「公式」类错因的最大来源' },
    { id: 'math-chain', subject: 'math', chapter: '导数与微分', title: '复合函数与隐函数求导', level: 3, examWeight: 0.05, prerequisites: ['math-deriv-basic'], examCount: 6, examPoints: 20, outcome: '能由外向内逐层求导，能用两边对 x 求导处理隐函数', note: '链式法则漏乘内层导数是最大失分点' },
    { id: 'math-higher', subject: 'math', chapter: '导数与微分', title: '高阶导数', level: 3, examWeight: 0.03, prerequisites: ['math-deriv-basic'], examCount: 3, examPoints: 10, outcome: '能求二阶及 n 阶导数，理解二阶导与凹凸的关系', note: '二阶导是判断拐点的工具' },
    { id: 'math-deriv-apply', subject: 'math', chapter: '导数与微分', title: '单调性、极值与最值', level: 2, examWeight: 0.06, prerequisites: ['math-deriv-basic'], examCount: 7, examPoints: 28, outcome: '能用导数符号表判断单调区间，求极值与闭区间最值', note: '大题常把单调性与不等式证明连在一起' },
    { id: 'math-concavity', subject: 'math', chapter: '导数与微分', title: '凹凸性与拐点', level: 3, examWeight: 0.03, prerequisites: ['math-higher'], examCount: 4, examPoints: 12, outcome: '能用二阶导符号判断凹凸，找出拐点', note: '凹凸和单调是两套判断，别混用' },
    { id: 'math-mvt', subject: 'math', chapter: '导数与微分', title: '中值定理', level: 3, examWeight: 0.04, prerequisites: ['math-deriv-apply'], examCount: 4, examPoints: 14, outcome: '能说出罗尔与拉格朗日的条件与结论，并用于证明', note: '证明题看到「存在 ξ」先想中值定理' },
    { id: 'math-tangent', subject: 'math', chapter: '导数与微分', title: '切线方程与微分', level: 2, examWeight: 0.03, prerequisites: ['math-deriv-basic'], examCount: 4, examPoints: 14, outcome: '能写切线/法线方程，理解微分是局部线性近似', note: '「在点处」和「过点」的切线是两种题' },

    { id: 'math-integral-def', subject: 'math', chapter: '积分', title: '定积分的概念与性质', level: 2, examWeight: 0.04, prerequisites: ['math-limit-calc'], examCount: 4, examPoints: 16, outcome: '能解释定积分是面积代数和，会用奇偶性、区间可加性简化', note: '先看对称性，能省一半计算' },
    { id: 'math-integral-calc', subject: 'math', chapter: '积分', title: '不定积分与基本公式', level: 2, examWeight: 0.05, prerequisites: ['math-deriv-basic'], examCount: 6, examPoints: 22, outcome: '能默写基本积分表，理解积分是求导的逆运算', note: '积分是求导的逆运算，公式要反着背' },
    { id: 'math-integral-sub', subject: 'math', chapter: '积分', title: '换元积分法', level: 3, examWeight: 0.04, prerequisites: ['math-integral-calc'], examCount: 5, examPoints: 18, outcome: '能凑微分、换元、换上下限，处理根式与三角换元', note: '换元必须同时换 dx 和上下限' },
    { id: 'math-integral-parts', subject: 'math', chapter: '积分', title: '分部积分法', level: 3, examWeight: 0.04, prerequisites: ['math-integral-calc'], examCount: 5, examPoints: 18, outcome: '能按「反对幂指三」选 u，完成分部积分', note: 'u 选错会越积越复杂' },
    { id: 'math-integral-apply', subject: 'math', chapter: '积分', title: '定积分的应用', level: 3, examWeight: 0.03, prerequisites: ['math-integral-def', 'math-integral-calc'], examCount: 5, examPoints: 20, outcome: '能用定积分求平面图形面积、旋转体体积', note: '画图定上下限，是应用题的第一步' },

    { id: 'math-partial', subject: 'math', chapter: '多元与方程', title: '偏导数与全微分', level: 3, examWeight: 0.03, prerequisites: ['math-deriv-basic'], examCount: 4, examPoints: 14, outcome: '能对 x、y 分别求偏导，写出全微分', note: '对一个变量求导时，把另一个当常数' },
    { id: 'math-ode', subject: 'math', chapter: '多元与方程', title: '一阶微分方程', level: 3, examWeight: 0.03, prerequisites: ['math-integral-calc'], examCount: 4, examPoints: 14, outcome: '能识别可分离变量与一阶线性方程，套公式求解', note: '先分离变量，再套公式；别忘了常数 C' },

    /* ============================ 计算机 22 ============================ */
    { id: 'cs-number', subject: 'cs', chapter: '计算机基础', title: '数制与进制转换', level: 1, examWeight: 0.04, prerequisites: [], examCount: 5, examPoints: 16, outcome: '能在二/八/十/十六进制之间互转，理解位权', note: '进制题是计算机基础的送分题' },
    { id: 'cs-encoding', subject: 'cs', chapter: '计算机基础', title: '信息编码', level: 2, examWeight: 0.03, prerequisites: ['cs-number'], examCount: 4, examPoints: 12, outcome: '能说清 ASCII、Unicode、汉字编码与位/字节换算', note: '1 字节 = 8 位，1 KB = 1024 B' },
    { id: 'cs-hardware', subject: 'cs', chapter: '计算机基础', title: '计算机组成', level: 2, examWeight: 0.04, prerequisites: [], examCount: 4, examPoints: 14, outcome: '能说出 CPU、内存、外存的职责与存储层次', note: '冯·诺依曼五大部件是必背' },
    { id: 'cs-os', subject: 'cs', chapter: '计算机基础', title: '操作系统基础', level: 2, examWeight: 0.04, prerequisites: ['cs-hardware'], examCount: 4, examPoints: 14, outcome: '能解释进程/线程、内存管理、文件系统的基本概念', note: '进程与线程的区别几乎年年考' },
    { id: 'cs-network', subject: 'cs', chapter: '网络与数据库', title: '网络基础', level: 2, examWeight: 0.04, prerequisites: ['cs-hardware'], examCount: 4, examPoints: 14, outcome: '能说出 IP、DNS、HTTP 的作用与 TCP/UDP 区别', note: '分层模型先记四层，再往里填协议' },
    { id: 'cs-database', subject: 'cs', chapter: '网络与数据库', title: '数据库与 SQL', level: 2, examWeight: 0.03, prerequisites: [], examCount: 4, examPoints: 14, outcome: '能写 SELECT / WHERE / JOIN，区分主键与外键', note: 'SQL 题先看查什么，再想从哪张表查' },

    { id: 'cs-var-type', subject: 'cs', chapter: '编程基础', title: '变量与类型', level: 1, examWeight: 0.04, prerequisites: [], examCount: 4, examPoints: 15, outcome: '能说清变量是盒子、类型是盒子装什么，能解释类型转换', note: '类型错误是新手 80% 报错的根源' },
    { id: 'cs-operator', subject: 'cs', chapter: '编程基础', title: '运算符与表达式', level: 2, examWeight: 0.04, prerequisites: ['cs-var-type'], examCount: 5, examPoints: 16, outcome: '能按优先级读表达式，理解短路求值与自增顺序', note: 'i++ 与 ++i 的差异最爱考' },
    { id: 'cs-loop', subject: 'cs', chapter: '编程基础', title: '条件与循环', level: 2, examWeight: 0.05, prerequisites: ['cs-var-type'], examCount: 5, examPoints: 18, outcome: '能写出带边界判断的 for / while，不再出现差一错误', note: '循环边界是最常见的运行时 bug' },
    { id: 'cs-function', subject: 'cs', chapter: '编程基础', title: '函数与作用域', level: 2, examWeight: 0.04, prerequisites: ['cs-loop'], examCount: 5, examPoints: 18, outcome: '能写带参数和返回值的函数，解释局部/全局作用域与闭包', note: '作用域链是 JS 题最容易失分的地方' },
    { id: 'cs-recursion', subject: 'cs', chapter: '编程基础', title: '递归', level: 3, examWeight: 0.04, prerequisites: ['cs-function'], examCount: 5, examPoints: 20, outcome: '能写出递归终止条件与递推关系，画出递归调用树', note: '先写终止条件，再写「规模减一」' },
    { id: 'cs-oop', subject: 'cs', chapter: '编程基础', title: '面向对象基础', level: 3, examWeight: 0.04, prerequisites: ['cs-function'], examCount: 4, examPoints: 15, outcome: '能写类与对象，解释封装、继承、多态', note: '类是模板，对象是按模板造出来的实例' },

    { id: 'cs-array', subject: 'cs', chapter: '数据结构', title: '数组与列表', level: 1, examWeight: 0.05, prerequisites: ['cs-var-type'], examCount: 5, examPoints: 20, outcome: '能按索引存取、遍历、增删，并解释为什么按下标访问快', note: '连续内存是理解数组的关键' },
    { id: 'cs-string', subject: 'cs', chapter: '数据结构', title: '字符串处理', level: 2, examWeight: 0.04, prerequisites: ['cs-array'], examCount: 5, examPoints: 16, outcome: '能完成拼接、切片、查找、反转与回文判断', note: '字符串本质是字符数组，但不可变' },
    { id: 'cs-linked-list', subject: 'cs', chapter: '数据结构', title: '链表', level: 2, examWeight: 0.04, prerequisites: ['cs-array'], examCount: 5, examPoints: 16, outcome: '能遍历、插入、删除节点，说清链表与数组的取舍', note: '画图时先保存 next，再改指针' },
    { id: 'cs-stack-queue', subject: 'cs', chapter: '数据结构', title: '栈与队列', level: 2, examWeight: 0.04, prerequisites: ['cs-array'], examCount: 4, examPoints: 14, outcome: '能解释 LIFO / FIFO，手写入栈出栈与循环队列', note: '括号匹配、层序遍历都是它的应用' },
    { id: 'cs-hash', subject: 'cs', chapter: '数据结构', title: '哈希表', level: 3, examWeight: 0.04, prerequisites: ['cs-array'], examCount: 6, examPoints: 22, outcome: '能解释哈希函数、冲突处理与平均 O(1) 的来源', note: '面试与考试双高频' },
    { id: 'cs-tree', subject: 'cs', chapter: '数据结构', title: '树与二叉树', level: 3, examWeight: 0.05, prerequisites: ['cs-recursion'], examCount: 5, examPoints: 20, outcome: '能说出前中后序与层序遍历，会算节点与高度', note: '递归是遍历树的自然语言' },
    { id: 'cs-graph', subject: 'cs', chapter: '数据结构', title: '图与遍历', level: 3, examWeight: 0.04, prerequisites: ['cs-tree'], examCount: 4, examPoints: 16, outcome: '能区分有向/无向图，写出 BFS 与 DFS', note: 'BFS 用队列，DFS 用栈或递归' },

    { id: 'cs-complexity', subject: 'cs', chapter: '算法', title: '时间复杂度与空间复杂度', level: 2, examWeight: 0.05, prerequisites: ['cs-loop'], examCount: 5, examPoints: 16, outcome: '能数循环次数，写出大 O，区分最好/最坏/平均', note: '先看循环层数，再看是否折半' },
    { id: 'cs-sort', subject: 'cs', chapter: '算法', title: '排序', level: 3, examWeight: 0.05, prerequisites: ['cs-recursion', 'cs-complexity'], examCount: 5, examPoints: 20, outcome: '能手写冒泡/选择/插入排序，比较时间复杂度与稳定性', note: '复杂度分析比背代码更重要' },
    { id: 'cs-search', subject: 'cs', chapter: '算法', title: '二分查找与双指针', level: 2, examWeight: 0.04, prerequisites: ['cs-sort'], examCount: 5, examPoints: 18, outcome: '能写无死循环的二分，能用双指针处理有序数组', note: '边界写错是二分最大的坑' }
  ];

  Z.KP_BY_ID = {};
  Z.KPS.forEach(function (kp) { Z.KP_BY_ID[kp.id] = kp; });

  /* 模块包可以继续登记考点；重复 id 自动忽略 */
  Z.addKps = function (list) {
    (list || []).forEach(function (kp) {
      if (!kp || !kp.id || Z.KP_BY_ID[kp.id]) return;
      Z.KPS.push(kp);
      Z.KP_BY_ID[kp.id] = kp;
    });
  };

  Z.chaptersOf = function (subject) {
    var map = {};
    var order = [];
    Z.KPS.filter(function (kp) { return kp.subject === subject; }).forEach(function (kp) {
      if (!map[kp.chapter]) { map[kp.chapter] = []; order.push(kp.chapter); }
      map[kp.chapter].push(kp);
    });
    return order.map(function (name) { return { name: name, kps: map[name] }; });
  };

  Z.kpsOf = function (subject) {
    return Z.KPS.filter(function (kp) { return kp.subject === subject; });
  };
})(window.ZSB = window.ZSB || {});
