/* 数据结构与算法模块包：6 个考点 + 6 份完整讲义 + 24 道题 */
(function (Z) {
  Z.addKps([
    { id: 'dsa-queue', subject: 'cs', chapter: '数据结构', title: '队列与优先队列', level: 2, examWeight: 0.03, prerequisites: ['cs-stack-queue'], examCount: 4, examPoints: 12, outcome: '能区分 FIFO 与按优先级出队，写对循环队列的空满判定，说出堆实现优先队列的复杂度', note: '循环队列用 front == rear 判空，用牺牲一个单元判满' },
    { id: 'dsa-heap', subject: 'cs', chapter: '数据结构', title: '堆与 Top K 问题', level: 3, examWeight: 0.03, prerequisites: ['dsa-queue'], examCount: 4, examPoints: 12, outcome: '能在数组上写出上浮与下沉，分析建堆 O(n)，用大小为 k 的堆解决 Top K', note: '求最大的 k 个元素，用小根堆而不是大根堆' },
    { id: 'dsa-graph-walk', subject: 'cs', chapter: '算法', title: '图的遍历与最短路', level: 3, examWeight: 0.03, prerequisites: ['cs-graph'], examCount: 4, examPoints: 12, outcome: '能按场景选择 BFS、DFS、Dijkstra，写出邻接表遍历并分析 O(V+E) 与 O((V+E)log V)', note: 'BFS 只保证边数最少，带权最短路要 Dijkstra' },
    { id: 'dsa-dp', subject: 'cs', chapter: '算法', title: '动态规划入门', level: 3, examWeight: 0.03, prerequisites: ['cs-recursion'], examCount: 4, examPoints: 12, outcome: '能写出状态定义、转移方程与边界，把记忆化搜索改写成自底向上递推', note: '先想清楚状态代表什么，再写转移方程' },
    { id: 'dsa-greedy', subject: 'cs', chapter: '算法', title: '贪心算法', level: 3, examWeight: 0.03, prerequisites: ['cs-sort'], examCount: 4, examPoints: 12, outcome: '能识别贪心选择性质，用排序加一次扫描解决区间调度与分数背包，并举出贪心失效的反例', note: '不能证明贪心正确时，先用暴力枚举对拍小数据' },
    { id: 'dsa-backtrack', subject: 'cs', chapter: '算法', title: '回溯与剪枝', level: 4, examWeight: 0.03, prerequisites: ['dsa-dp'], examCount: 4, examPoints: 12, outcome: '能画出解空间树，用「选择 → 递归 → 撤销」模板写出排列组合，并加上可行性剪枝与去重', note: '撤销选择必须与做选择严格对称，否则分支互相污染' }
  ]);

  Z.QUESTIONS.push.apply(Z.QUESTIONS, Z.makeQs([
    /* ---------- dsa-queue ---------- */
    { id: 'dsa-queue-1', kpIds: ['dsa-queue'], subject: 'cs', type: 'single',
      stem: '用数组实现的循环队列容量为 n（下标 0 到 n-1），front 指向队头元素，rear 指向下一个可插入位置。若牺牲一个存储单元来区分空与满，队满的条件是？',
      options: ['front == rear', '(rear + 1) % n == front', 'rear == n - 1', 'front == (rear + 1) % n'],
      answer: 'B',
      analysis: { ans: 'B', why: '牺牲一个空位后，rear 再前进一格就会撞上 front，说明队列已经满了；这样队列最多存 n-1 个元素，而 front == rear 仍然表示队空。', steps: '1. 入队先写 q[rear]，再执行 rear = (rear + 1) % n。\n2. 若 rear 的下一个位置正好是 front，再插入就会覆盖队头元素，因此判满。\n3. 判空与判满必须用不同条件，否则空和满无法区分。', pit: '不要把容量 n 当成最多能存 n 个元素；牺牲单元后上限是 n-1。' }, difficulty: 2, estSeconds: 45, skillTag: '循环队列', source: '自建' },
    { id: 'dsa-queue-2', kpIds: ['dsa-queue'], subject: 'cs', type: 'single',
      stem: '用二叉堆实现的优先队列，插入一个元素与取出最小值（取出并删除）的平均时间复杂度分别是？',
      options: ['O(1) 和 O(1)', 'O(log n) 和 O(log n)', 'O(n) 和 O(log n)', 'O(log n) 和 O(1)'],
      answer: 'B',
      analysis: { ans: 'B', why: '插入把新元素放到数组末尾再上浮，最多走树高；删除堆顶把末尾元素移到根再下沉，两者都受完全二叉树高度 log n 限制。', steps: '1. 插入：新元素追加到末尾，与父节点比较并上浮。\n2. 删除：记录堆顶，用最后一个元素覆盖根，长度减一，再从根下沉。\n3. 完全二叉树高度为 floor(log2 n)，所以两种操作都是 O(log n)。', pit: '只看堆顶是 O(1)，但「取出」通常包含删除，必须算上下沉。' }, difficulty: 2, estSeconds: 45, skillTag: '优先队列复杂度', source: '自建' },
    { id: 'dsa-queue-3', kpIds: ['dsa-queue'], subject: 'cs', type: 'fill',
      stem: '循环队列牺牲一个存储单元区分空满时，容量为 n 的数组最多能存放 ______ 个元素。',
      answer: 'n-1', accept: ['n-1', 'n - 1', 'n−1', 'n－1'],
      analysis: { ans: 'n-1', why: '判满条件占用了数组中的一个空位，因此可存元素数比数组容量少一个。', steps: '1. n 个下标中，始终保留一个位置不放元素。\n2. 实际可存 n-1 个。\n3. 若不牺牲单元，就要额外维护 count 或标志位来区分空满。', pit: '把 n 当成可存数量，入队第 n 个元素时就会覆盖队头。' }, difficulty: 2, estSeconds: 35, skillTag: '循环队列容量', source: '自建' },
    { id: 'dsa-queue-4', kpIds: ['dsa-queue'], subject: 'cs', type: 'fill',
      stem: '对二叉树做层序遍历（逐层从左到右访问），需要借助的数据结构是 ______。',
      answer: '队列', accept: ['队列', 'queue', 'Queue', '先进先出队列'],
      analysis: { ans: '队列', why: '层序遍历就是图的 BFS：先访问的节点先扩展，符合先进先出，因此用队列保存待访问节点。', steps: '1. 根节点入队。\n2. 出队一个节点并访问，把它的左右孩子依次入队。\n3. 队列为空时遍历结束，访问顺序正好逐层展开。', pit: '用栈会退化成深度优先，得到的是另一条访问顺序，不是层序。' }, difficulty: 1, estSeconds: 30, skillTag: 'BFS 与队列', source: '自建' },

    /* ---------- dsa-heap ---------- */
    { id: 'dsa-heap-1', kpIds: ['dsa-heap'], subject: 'cs', type: 'single',
      stem: '大根堆的数组为 [9, 7, 8, 3, 6, 5]，现在插入元素 10，插入后堆顶是？',
      options: ['10', '9', '8', '7'],
      answer: 'A',
      analysis: { ans: '10', why: '10 追加到末尾后不断与父节点比较并交换，最终一路上浮到根，成为新的堆顶。', steps: '1. 追加到下标 6：数组变为 [9, 7, 8, 3, 6, 5, 10]。\n2. 父节点下标 (6-1)/2 = 2，值为 8，10 > 8，交换。\n3. 新下标 2 的父节点下标 0，值为 9，10 > 9，再交换。\n4. 到达根，堆顶为 10。', pit: '上浮只和父节点比较，不是和兄弟节点比；交换次数最多为树高。' }, difficulty: 2, estSeconds: 50, skillTag: '堆插入上浮', source: '自建' },
    { id: 'dsa-heap-2', kpIds: ['dsa-heap'], subject: 'cs', type: 'single',
      stem: '从 n 个数中找出最大的 k 个数，维护大小为 k 的堆时，应该选择哪种堆？',
      options: ['大根堆，堆顶是当前最大值', '小根堆，堆顶是当前 k 个里最小的', '任意一种，结果都一样', '不能用堆，必须全排序'],
      answer: 'B',
      analysis: { ans: 'B', why: '小根堆的堆顶是这 k 个候选里最差的，新元素只要比堆顶大就有资格替换它，替换后下沉一次即可。', steps: '1. 先用前 k 个元素建小根堆，时间 O(k)。\n2. 依次扫描剩余元素，若 x 大于堆顶，就弹出堆顶并压入 x，O(log k)。\n3. 扫描结束后堆中就是最大的 k 个，总时间 O(n log k)，额外空间 O(k)。', pit: '若用大根堆且容量为 k，堆顶是最大值，无法判断什么时候该淘汰谁。' }, difficulty: 3, estSeconds: 55, skillTag: 'Top K 选堆', source: '自建' },
    { id: 'dsa-heap-3', kpIds: ['dsa-heap'], subject: 'cs', type: 'fill',
      stem: '对 n 个元素自底向上执行 heapify 建堆，时间复杂度是 O(______)。',
      answer: 'n', accept: ['n', 'O(n)', 'N', 'n)'],
      analysis: { ans: 'n', why: '绝大多数节点都在底层，下沉距离很短；把所有节点的下沉代价按层求和，得到等比级数，总量是 O(n)，而不是 O(n log n)。', steps: '1. 从最后一个非叶节点开始，依次向前对每个节点下沉。\n2. 高度为 h 的节点最多有 n/2^(h+1) 个，每个下沉 O(h)。\n3. 求和后常数项收敛，总代价 O(n)。', pit: '逐个插入建堆是 O(n log n)；自底向上 heapify 才是 O(n)，两者不要混淆。' }, difficulty: 3, estSeconds: 45, skillTag: '建堆复杂度', source: '自建' },
    { id: 'dsa-heap-4', kpIds: ['dsa-heap'], subject: 'cs', type: 'fill',
      stem: '用数组存放完全二叉树，下标从 0 开始，下标 i 的左孩子下标是 ______。',
      answer: '2i+1', accept: ['2i+1', '2*i+1', '2i + 1', '2i＋1'],
      analysis: { ans: '2i+1', why: '完全二叉树按层序连续存放，第 i 个节点的左孩子固定落在 2i+1，右孩子落在 2i+2。', steps: '1. 根节点下标 0，左孩子为 1，右孩子为 2。\n2. 下标 1 的左孩子为 3，右孩子为 4。\n3. 归纳得左孩子 2i+1、右孩子 2i+2，父节点为 (i-1)/2 向下取整。', pit: '若下标从 1 开始，左孩子是 2i；两种约定不能混用。' }, difficulty: 2, estSeconds: 30, skillTag: '堆的数组下标', source: '自建' },

    /* ---------- dsa-graph-walk ---------- */
    { id: 'dsa-graph-walk-1', kpIds: ['dsa-graph-walk'], subject: 'cs', type: 'single',
      stem: '用邻接表存储图，从起点做一次 BFS 遍历全部可达顶点，时间复杂度是？',
      options: ['O(V)', 'O(V + E)', 'O(V^2)', 'O(E log V)'],
      answer: 'B',
      analysis: { ans: 'O(V + E)', why: '每个顶点最多入队一次，共 O(V)；无向图中每条边在两个端点的邻接表中各被检查一次，共 O(E)，所以总量是 O(V+E)。', steps: '1. visited 保证每个顶点只入队一次。\n2. 出队时遍历该顶点的邻接表，所有边被访问常数次。\n3. 总代价 = 顶点访问 + 边检查 = O(V+E)。', pit: '用邻接矩阵时每次找邻居要扫一整行，复杂度退化为 O(V^2)。' }, difficulty: 2, estSeconds: 45, skillTag: 'BFS 复杂度', source: '自建' },
    { id: 'dsa-graph-walk-2', kpIds: ['dsa-graph-walk'], subject: 'cs', type: 'single',
      stem: 'Dijkstra 算法不能直接处理含负权边的图，根本原因是？',
      options: ['负权边会让图变成有向图', '它基于贪心，顶点一旦出队就认为最短距离已定，负权边可能在之后提供更短路径', '负权边无法存入邻接表', '负权边会让 BFS 变成 DFS'],
      answer: 'B',
      analysis: { ans: 'B', why: 'Dijkstra 每轮取出当前距离最小的未确定顶点并「定稿」。若之后存在负权边，绕路可能让它的距离再变小，已定稿的结论就被推翻。', steps: '1. 初始源点距离 0，其余为无穷。\n2. 每轮取最小距离顶点 u，标记为已确定，用 u 的边松弛邻居。\n3. 有负权时，已确定的顶点仍可能被更短的路径更新，贪心前提失效。\n4. 此时应改用 Bellman-Ford 或 SPFA。', pit: '不是所有图都不能用 Dijkstra，只要所有权重非负就仍然正确。' }, difficulty: 3, estSeconds: 55, skillTag: 'Dijkstra 适用条件', source: '自建' },
    { id: 'dsa-graph-walk-3', kpIds: ['dsa-graph-walk'], subject: 'cs', type: 'fill',
      stem: '在无权图上求单源最短路径（经过的边数最少），应该使用 ______ 算法。',
      answer: 'BFS', accept: ['BFS', 'bfs', '广度优先搜索', '广度优先遍历'],
      analysis: { ans: 'BFS', why: 'BFS 按层扩展，第一次访问某个顶点时经过的边数一定最少，因此无权图的最短路就是 BFS 的分层距离。', steps: '1. 起点入队，距离记为 0。\n2. 出队顶点 u，把它未访问的邻居距离设为 dist[u] + 1 并入队。\n3. 第一次到达终点的层数就是最短边数。', pit: '带权图不能直接用 BFS，边权不同时「层数少」不等于「总代价小」。' }, difficulty: 2, estSeconds: 35, skillTag: '无权最短路', source: '自建' },
    { id: 'dsa-graph-walk-4', kpIds: ['dsa-graph-walk'], subject: 'cs', type: 'fill',
      stem: '用邻接表存储 n 个顶点、m 条边的无向图，空间复杂度是 ______。',
      answer: 'O(n+m)', accept: ['O(n+m)', 'O(V+E)', 'n+m', 'O(n + m)', 'O(V + E)'],
      analysis: { ans: 'O(n+m)', why: '邻接表需要 n 个顶点的头指针，每条无向边在两个顶点的链表中各存一次，共 2m 个节点，因此空间是 O(n+m)。', steps: '1. 顶点数组占 O(n)。\n2. 每条无向边存两份，占 O(m)。\n3. 合计 O(n+m)，稀疏图上远小于邻接矩阵的 O(n^2)。', pit: '邻接矩阵不管边多稀疏都占 O(n^2)，稠密图才考虑矩阵。' }, difficulty: 2, estSeconds: 35, skillTag: '邻接表空间', source: '自建' },

    /* ---------- dsa-dp ---------- */
    { id: 'dsa-dp-1', kpIds: ['dsa-dp'], subject: 'cs', type: 'single',
      stem: '爬楼梯每次可以走 1 阶或 2 阶，设 f(1)=1、f(2)=2，则 f(5) 是多少？',
      options: ['5', '8', '13', '21'],
      answer: 'B',
      analysis: { ans: '8', why: '到第 n 阶的最后一步要么从 n-1 阶走 1 阶，要么从 n-2 阶走 2 阶，因此 f(n)=f(n-1)+f(n-2)。', steps: '1. 边界：f(1)=1，f(2)=2。\n2. f(3)=f(2)+f(1)=3。\n3. f(4)=f(3)+f(2)=5。\n4. f(5)=f(4)+f(3)=8。', pit: '边界不要写错：f(2)=2 不是 1，否则整串结果都会偏。' }, difficulty: 2, estSeconds: 45, skillTag: '爬楼梯', source: '自建' },
    { id: 'dsa-dp-2', kpIds: ['dsa-dp'], subject: 'cs', type: 'single',
      stem: '一个问题能够用动态规划求解，通常需要同时具备哪两个性质？',
      options: ['贪心选择性质与单调性', '最优子结构与重叠子问题', '无后效性与可排序性', '可分解性与对称性'],
      answer: 'B',
      analysis: { ans: 'B', why: '最优子结构保证大问题的最优解由子问题的最优解拼成；重叠子问题保证同一个子问题被反复用到，缓存才有意义。', steps: '1. 最优子结构：写出转移方程的前提。\n2. 重叠子问题：记忆化或递推能省掉重复计算。\n3. 两者同时成立，DP 才比朴素递归更高效。', pit: '只有最优子结构而没有重叠子问题时，分治即可，不必开 DP 表。' }, difficulty: 2, estSeconds: 40, skillTag: 'DP 适用条件', source: '自建' },
    { id: 'dsa-dp-3', kpIds: ['dsa-dp'], subject: 'cs', type: 'fill',
      stem: '0/1 背包用一维数组滚动更新时，容量维度必须 ______ 遍历，避免同一物品被重复使用。',
      answer: '倒序', accept: ['倒序', '逆序', '从大到小', '反向', '降序'],
      analysis: { ans: '倒序', why: '一维数组 f[j] 同时代表上一轮和当前轮。倒序遍历时，用到的 f[j-w] 还没被本轮更新，仍是「不含当前物品」的旧值。', steps: '1. 正序时 f[j-w] 可能已经放入当前物品。\n2. 再叠加一次就变成同一物品用多次，成了完全背包。\n3. 倒序保证每个物品最多选一次。', pit: '完全背包才正序遍历；0/1 背包写正序是经典错误。' }, difficulty: 3, estSeconds: 45, skillTag: '背包遍历顺序', source: '自建' },
    { id: 'dsa-dp-4', kpIds: ['dsa-dp'], subject: 'cs', type: 'fill',
      stem: '求第 n 项斐波那契数，朴素递归是指数级，加入记忆化后时间复杂度降为 O(______)。',
      answer: 'n', accept: ['n', 'N', 'O(n)', 'n)'],
      analysis: { ans: 'n', why: '记忆化让每个状态只真正计算一次，其余调用直接查表返回，因此总计算量正比于状态个数 n。', steps: '1. 共有 f(0) 到 f(n) 这 n+1 个状态。\n2. 每个状态首次计算做一次加法，之后 O(1) 查表。\n3. 总时间 O(n)，空间 O(n) 或滚动后 O(1)。', pit: '不加记忆化时递归树有大量重复节点，复杂度是 O(2^n)。' }, difficulty: 2, estSeconds: 35, skillTag: '记忆化复杂度', source: '自建' },

    /* ---------- dsa-greedy ---------- */
    { id: 'dsa-greedy-1', kpIds: ['dsa-greedy'], subject: 'cs', type: 'single',
      stem: '用贪心求「最多能参加多少个互不重叠的活动」，应该按什么排序？',
      options: ['按开始时间升序', '按结束时间升序', '按活动时长降序', '按结束时间降序'],
      answer: 'B',
      analysis: { ans: 'B', why: '结束越早，给后面留下的时间窗口越大，因此每次选最早结束且与已选不冲突的活动，能得到最多数量。', steps: '1. 把所有区间按右端点升序排列。\n2. 维护上一个选中活动的结束时间 end。\n3. 依次扫描，若当前开始时间大于等于 end 就选中并更新 end。\n4. 扫描结束，选中数量即为答案，复杂度 O(n log n)。', pit: '按开始时间排序会优先选中一个很长的区间，反而挡住后面多个短活动。' }, difficulty: 3, estSeconds: 55, skillTag: '区间调度', source: '自建' },
    { id: 'dsa-greedy-2', kpIds: ['dsa-greedy'], subject: 'cs', type: 'single',
      stem: '贪心算法能够保证得到全局最优解，通常需要满足哪个条件？',
      options: ['只要数据排好序就一定最优', '满足贪心选择性质与最优子结构', '问题必须存在重叠子问题', '必须用递归实现'],
      answer: 'B',
      analysis: { ans: 'B', why: '贪心选择性质指每一步的局部最优选择能导向某个全局最优解；最优子结构指选完之后剩下的子问题仍可用同样方式求解。', steps: '1. 先证明「存在一个最优解包含当前贪心选择」，常用交换论证。\n2. 再证明选完之后子问题与原问题同型。\n3. 两条都成立，贪心才正确。', pit: '排序只是实现手段，不是正确性保证；0/1 背包按单位价值排序就会失效。' }, difficulty: 3, estSeconds: 50, skillTag: '贪心正确性', source: '自建' },
    { id: 'dsa-greedy-3', kpIds: ['dsa-greedy'], subject: 'cs', type: 'fill',
      stem: '分数背包问题中，贪心策略是按物品的 ______ 从大到小排序，再依次装入。',
      answer: '单位价值', accept: ['单位价值', '性价比', '价值密度', '单位重量价值', '单位价值比'],
      analysis: { ans: '单位价值', why: '分数背包允许把物品切开，因此每一份重量都应该换成收益率最高的那部分价值，按单位价值排序正好体现这一点。', steps: '1. 计算每个物品的价值除以重量。\n2. 按该比值降序排序。\n3. 依次整件装入，最后一件装不下就切一部分。', pit: '0/1 背包不能切分，按单位价值排序会得到次优解。' }, difficulty: 2, estSeconds: 40, skillTag: '分数背包', source: '自建' },
    { id: 'dsa-greedy-4', kpIds: ['dsa-greedy'], subject: 'cs', type: 'fill',
      stem: '硬币面额为 1、3、4 元，用「每次取最大面额」的贪心策略凑 6 元，需要 ______ 枚硬币。',
      answer: '3', accept: ['3', '三', '3枚', '三枚'],
      analysis: { ans: '3', why: '贪心先取 4 元，剩 2 元只能取两个 1 元，共 3 枚；但最优方案是 3 元加 3 元，只要 2 枚。', steps: '1. 6 元取最大面额 4，剩 2。\n2. 剩余面额最大为 1，取 1 元两次。\n3. 共 3 枚，而 3+3 只需 2 枚。\n4. 这说明面额不满足贪心结构时贪心会失效。', pit: '人民币常见面额下贪心恰好正确，但换一套面额就不一定，必须验证。' }, difficulty: 3, estSeconds: 45, skillTag: '贪心反例', source: '自建' },

    /* ---------- dsa-backtrack ---------- */
    { id: 'dsa-backtrack-1', kpIds: ['dsa-backtrack'], subject: 'cs', type: 'single',
      stem: '回溯算法与深度优先搜索（DFS）的关系，下面说法正确的是？',
      options: ['回溯是带「撤销选择」的 DFS，在解空间树上枚举所有候选', '回溯是 BFS 的一种变体', '回溯一定比动态规划更快', '回溯不需要剪枝也能保证效率'],
      answer: 'A',
      analysis: { ans: 'A', why: '回溯沿一条路径深入，遇到不合法或走不通就退回上一层，并把刚才的选择撤销，本质上是对解空间树做带约束的 DFS。', steps: '1. 每层从候选集合中选一个值，加入当前路径。\n2. 递归进入下一层。\n3. 返回后撤销该选择，换下一个候选。\n4. 到达叶子就得到一个完整方案。', pit: '回溯不撤销选择，路径会被上一个分支污染，结果出现非法组合。' }, difficulty: 2, estSeconds: 45, skillTag: '回溯本质', source: '自建' },
    { id: 'dsa-backtrack-2', kpIds: ['dsa-backtrack'], subject: 'cs', type: 'single',
      stem: '用回溯枚举 n 个不同元素的全部子集，解空间树的叶子节点共有多少个？',
      options: ['n', '2^n', 'n^2', 'n!'],
      answer: 'B',
      analysis: { ans: '2^n', why: '每个元素都有「选」与「不选」两种状态，n 个元素相互独立，组合数是 2 的 n 次方，包括空集。', steps: '1. 第 1 个元素 2 种选择。\n2. 每增加一个元素，分支数翻倍。\n3. n 个元素共 2^n 个叶子。\n4. 每个叶子复制路径需 O(n)，总时间 O(n·2^n)。', pit: '子集是 2^n，排列是 n!，组合数另算，不要混用。' }, difficulty: 3, estSeconds: 50, skillTag: '解空间大小', source: '自建' },
    { id: 'dsa-backtrack-3', kpIds: ['dsa-backtrack'], subject: 'cs', type: 'fill',
      stem: '回溯模板中，递归调用返回后要把刚才加入路径的元素移除，这一步通常称为 ______ 选择。',
      answer: '撤销', accept: ['撤销', '撤销选择', '回溯', '恢复现场', '撤回'],
      analysis: { ans: '撤销', why: '当前路径是所有分支共享的，递归返回后必须恢复进入这一层之前的状态，下一个候选才能在干净的路径上尝试。', steps: '1. 做选择：path.append(x) 并更新 used 等标记。\n2. 递归处理下一层。\n3. 撤销：path.pop() 并把标记改回。\n4. 保证兄弟分支互不影响。', pit: '撤销必须与做选择严格对称，改了三个状态就要恢复三个。' }, difficulty: 2, estSeconds: 35, skillTag: '回溯模板', source: '自建' },
    { id: 'dsa-backtrack-4', kpIds: ['dsa-backtrack'], subject: 'cs', type: 'fill',
      stem: '组合总和类问题在剪枝前，通常先对候选数组 ______，以便跳过重复元素并在和超过目标时提前结束。',
      answer: '排序', accept: ['排序', '升序排序', 'sort', '按升序排列'],
      analysis: { ans: '排序', why: '有序之后，相同的值会相邻，可以用「同层跳过相同元素」去重；当前和超过目标时，后面的元素只会更大，可以直接 break。', steps: '1. 对候选数组升序排序。\n2. 递归时从 start 开始，避免重复选取前面的元素。\n3. 若 i 大于 start 且相邻值相同，跳过本次循环。\n4. 若当前和已超过目标，直接结束本层循环。', pit: '不排序也能枚举，但无法用大小关系提前终止，也无法方便去重。' }, difficulty: 3, estSeconds: 40, skillTag: '剪枝与去重', source: '自建' }
  ]));

  /* ======================= 讲义 ======================= */
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'dsa-queue-L2', kpIds: ['dsa-queue'], subject: 'cs', level: 2,
      title: '队列与优先队列：先来先服务，还是先急先服务',
      estMinutes: 40,
      hookTitle: '为什么 BFS 一定要用队列，不能用栈？',
      hookBody: '队列保证「先发现的先扩展」，所以 BFS 一圈一圈向外走，第一次到达某个顶点时的步数就是最短步数。换成栈就变成一条路走到黑，访问顺序不再是按层展开。',
      idea: '队列是**先进先出（FIFO）**的线性结构：只在队尾插入、只在队头删除。优先队列不遵守到达顺序，而是每次取出优先级最高的元素，通常用二叉堆实现。',
      diagramId: 'stack-queue', diagramCaption: '队列两端分工：队尾进、队头出；栈则同端进出',
      analogy: { title: '食堂排队与急诊分诊', md: '普通队列像食堂排队：谁先来谁先打饭，后来的人只能排在队尾。优先队列像急诊分诊：不按到达时间，而按病情轻重，危重病人先处理。选错结构，就像让急诊按排队叫号，会出大问题。' },
      points: [
        { title: '一、队列只允许两端操作', md: '队尾 `enqueue` 入队，队头 `dequeue` 出队，中间的元素不能直接访问。这个限制换来的是 O(1) 的入队与出队，以及天然的顺序保证。' },
        { title: '二、顺序队列会出现假溢出', md: '用普通数组做队列，rear 一直向后走，即使前面因为出队空出了位置，rear 到达数组末尾也无法再插入。解决办法是把数组首尾相接，变成循环队列。' },
        { title: '三、循环队列的空满判定', md: '`front == rear` 表示队空。为了不和队满混淆，通常牺牲一个单元，用 `(rear + 1) % n == front` 判满；此时容量为 n 的数组最多存 n-1 个元素。' },
        { title: '四、链队列没有容量上限', md: '用带头尾指针的链表实现队列，入队在尾节点后接一个新节点，出队删除头节点，两者都是 O(1)。适合元素个数变化大、无法预估容量的场景。' },
        { title: '五、优先队列是按优先级出队', md: '插入时不排序，取出时永远拿当前优先级最高的元素。它不保证先进先出，只保证「当前最该处理的先处理」，常用于任务调度、事件模拟与最短路算法。' },
        { title: '六、堆是优先队列的标准实现', md: '二叉堆用数组存完全二叉树，插入上浮、删除堆顶下沉，都是 O(log n)；只看堆顶是 O(1)。用有序数组也能实现，但插入要 O(n)，不如堆均衡。' },
        { title: '七、队列的典型应用', md: 'BFS 层序遍历、生产者消费者缓冲、打印机任务排队都用普通队列；滑动窗口最大值用单调队列；Dijkstra 与任务调度用优先队列。' }
      ],
      table: {
        headers: ['结构', '出队规则', '实现与复杂度'],
        rows: [
          ['普通队列', '先进先出 FIFO', '循环数组或链表，入队出队 O(1)'],
          ['优先队列', '优先级最高者先出', '二叉堆，插入与删除 O(log n)'],
          ['双端队列', '两端都能进出', '数组或双向链表，两端 O(1)'],
          ['单调队列', '维护窗口内的最值', '双端队列，每个元素进出一次，整体 O(n)']
        ]
      },
      code: 'class CircularQueue:\n    def __init__(self, n):\n        self.q = [None] * n\n        self.cap = n\n        self.front = 0\n        self.rear = 0\n\n    def enqueue(self, x):\n        if (self.rear + 1) % self.cap == self.front:\n            raise Exception("full")\n        self.q[self.rear] = x\n        self.rear = (self.rear + 1) % self.cap\n\n    def dequeue(self):\n        if self.front == self.rear:\n            raise Exception("empty")\n        x = self.q[self.front]\n        self.front = (self.front + 1) % self.cap\n        return x',
      warning: '循环队列判空用 `front == rear`，判满用 `(rear + 1) % n == front`，两个条件不能写反。牺牲一个单元后，容量 n 的数组最多只能存 n-1 个元素。',
      tip: 'BFS 用队列，DFS 用栈；优先队列名字里有队列，但它按优先级出队，不遵守先进先出。',
      quizIds: ['dsa-queue-1', 'dsa-queue-2', 'dsa-queue-3', 'dsa-queue-4'],
      example: {
        title: '用两个栈实现队列',
        steps: [
          { md: '准备 in 栈负责入队、out 栈负责出队，入队时直接压入 in。' },
          { md: '出队时若 out 为空，就把 in 中的元素逐个弹出并压入 out，顺序正好反转。' },
          { md: '再从 out 弹出栈顶，就是最早进入的元素。' },
          { md: '每个元素最多被搬运一次，n 次操作的均摊复杂度是 O(1)。' }
        ],
        takeaway: '两次后进先出叠起来就是先进先出；关键是只在 out 为空时搬运。'
      },
      example2: {
        title: '单调队列求滑动窗口最大值',
        steps: [
          { md: '数组 [1, 3, -1, -3, 5, 3, 6, 7]，窗口大小 k = 3。' },
          { md: '队列中存下标，并保持对应值从大到小；新元素入队前，从队尾弹掉比它小的元素。' },
          { md: '队头下标若已滑出窗口就弹出，队头始终是当前窗口最大值。' },
          { md: '依次得到 [3, 3, 5, 5, 6, 7]，每个下标最多进出一次，总时间 O(n)。' }
        ],
        takeaway: '滑动窗口最值不要每窗重扫，用单调队列把 O(nk) 降到 O(n)。'
      },
      guided: [{ questionId: 'dsa-queue-1', hint: '先想清楚牺牲一个单元后，rear 走到哪里就不能再插入了。' }],
      solo: ['dsa-queue-3', 'dsa-queue-4'],
      challenge: ['dsa-queue-2'],
      summary: {
        essence: '队列先进先出、两端分工；循环队列牺牲一个单元区分空满；优先队列按优先级出队，堆实现 O(log n)。',
        formulas: ['队空：front == rear', '队满：(rear + 1) % n == front', '优先队列插入 / 删除：O(log n)'],
        pitfalls: ['把容量 n 当成可存元素数', '判空判满条件写反', '以为优先队列先进先出', 'BFS 误用栈'],
        checklist: ['我能写出循环队列的入队出队', '我能说清为什么牺牲一个单元', '我能区分队列与优先队列', '我知道 BFS 与 Dijkstra 各用什么结构']
      },
      feynman: '请用食堂排队和急诊分诊两个场景，讲清楚队列与优先队列的区别，并说明各自适合什么问题。'
    }),

    Z.makeLesson({
      id: 'dsa-heap-L3', kpIds: ['dsa-heap'], subject: 'cs', level: 3,
      title: '堆与 Top K：只维护最关心的那一小撮',
      estMinutes: 45,
      hookTitle: '一亿个数里找最大的 10 个，真的要全排序吗？',
      hookBody: '全排序要 O(n log n) 时间和 O(n) 空间；维护一个大小为 10 的小根堆，只需 O(n log 10) 时间、O(10) 空间。堆的价值就在于只维护你真正关心的那一小撮元素。',
      idea: '堆是**完全二叉树**，并满足堆序性：大根堆中父节点不小于孩子，小根堆中父节点不大于孩子。它用数组连续存储，插入与删除堆顶 O(log n)，自底向上建堆 O(n)。',
      diagramId: 'tree-structure', diagramCaption: '完全二叉树按层序放进数组，父子下标可以直接算出',
      analogy: { title: '擂台上的守擂者', md: '小根堆的堆顶像一个擂台上最弱的守擂者：新人只要比他强，就把他换下去，再重新排一次座次。这样台上始终保留最强的 k 个人，弱的自然被淘汰。' },
      points: [
        { title: '一、堆是带顺序的完全二叉树', md: '完全二叉树只有最后一层可能不满，且节点靠左排列，因此可以直接塞进数组，用下标快速定位父子。堆序性只约束父子关系，兄弟之间没有大小要求。' },
        { title: '二、数组下标关系固定', md: '下标从 0 开始时，左孩子是 2i+1，右孩子是 2i+2，父节点是 (i-1)/2 向下取整。会这三个公式，堆的所有操作都能在数组上完成。' },
        { title: '三、插入靠上浮', md: '新元素放到数组末尾，然后不断与父节点比较，不满足堆序就交换，直到到达根或满足条件。交换次数最多为树高 floor(log2 n)，所以是 O(log n)。' },
        { title: '四、删除堆顶靠下沉', md: '取出根后，把最后一个元素移到根，长度减一，再与较大（或较小）的孩子交换并向下走，直到叶子或满足堆序。这样避免整体搬移，仍是 O(log n)。' },
        { title: '五、建堆可以做到 O(n)', md: '从最后一个非叶节点开始向前逐个下沉。底层节点多但下沉距离短，按层求和是收敛的等比级数，总量 O(n)；逐个插入建堆则是 O(n log n)。' },
        { title: '六、堆排序', md: '先建大根堆，再反复把堆顶与末尾交换、缩小堆范围并下沉，得到升序数组。时间 O(n log n)，空间 O(1)，但交换会打乱相同元素的相对次序，因此不稳定。' },
        { title: '七、Top K 用对堆的方向', md: '求最大的 k 个，维护大小为 k 的小根堆，堆顶是候选中最差的，新元素比它大才替换；求最小的 k 个则用大根堆。时间 O(n log k)，空间 O(k)。' }
      ],
      table: {
        headers: ['操作', '时间复杂度', '说明'],
        rows: [
          ['查看堆顶', 'O(1)', '直接读数组下标 0'],
          ['插入元素', 'O(log n)', '末尾追加后上浮'],
          ['删除堆顶', 'O(log n)', '末尾元素移到根后下沉'],
          ['自底向上建堆', 'O(n)', '从最后一个非叶节点开始下沉'],
          ['堆排序', 'O(n log n)', '建堆 O(n) 加 n 次删除 O(n log n)']
        ]
      },
      code: 'import heapq\n\nnums = [5, 1, 9, 3]\nheapq.heapify(nums)          # 原地建小根堆，O(n)\nheapq.heappush(nums, 2)      # 插入，O(log n)\nprint(heapq.heappop(nums))   # 1，取出最小值\n\nprint(heapq.nlargest(3, [4, 1, 7, 9, 2]))  # [9, 7, 4]\nprint(heapq.nsmallest(2, [4, 1, 7, 9, 2])) # [1, 2]',
      warning: 'Python 的 `heapq` 只提供**小根堆**。需要大根堆时通常把元素取负后入堆，取出时再取负还原；直接塞正数不会变成大根堆。',
      tip: '求第 k 大 / 最大的 k 个用小根堆；求第 k 小 / 最小的 k 个用大根堆。方向记反，淘汰逻辑就全错。',
      quizIds: ['dsa-heap-1', 'dsa-heap-2', 'dsa-heap-3', 'dsa-heap-4'],
      example: {
        title: '手写删除堆顶的下沉过程',
        steps: [
          { md: '大根堆 [9, 7, 8, 3, 6, 5]，删除堆顶 9：把末尾的 5 移到根，得到 [5, 7, 8, 3, 6]。' },
          { md: '根 5 与较大的孩子 8 比较，5 < 8，交换，得到 [8, 7, 5, 3, 6]。' },
          { md: '5 继续与孩子比较，它已是叶子或满足堆序，下沉结束。' },
          { md: '整个过程只走了树高 2 步，复杂度 O(log n)。' }
        ],
        takeaway: '删除堆顶不是删完再重建，而是「末尾补位 + 一路下沉」。'
      },
      example2: {
        title: '一亿个数取最大 10 个',
        steps: [
          { md: '读前 10 个数，建成小根堆，堆顶是当前第 10 大的候选。' },
          { md: '继续读入 x，若 x 不大于堆顶，直接丢弃，只做一次比较。' },
          { md: '若 x 大于堆顶，弹出堆顶并压入 x，O(log 10) 完成替换。' },
          { md: '全部读完，堆中 10 个数就是最大的 10 个，总时间 O(n log 10)，内存只有 10 个元素。' }
        ],
        takeaway: 'Top K 的核心是「用大小为 k 的堆做门槛」，而不是把所有数据排序。'
      },
      guided: [{ questionId: 'dsa-heap-1', hint: '插入后从末尾开始，每次只和父节点比较。' }],
      solo: ['dsa-heap-3', 'dsa-heap-4'],
      challenge: ['dsa-heap-2'],
      summary: {
        essence: '堆是完全二叉树加堆序性；插入上浮、删除下沉都是 O(log n)；建堆 O(n)；Top K 用大小为 k 的堆。',
        formulas: ['左孩子 2i+1，右孩子 2i+2，父节点 (i-1)/2', '插入 / 删除堆顶 O(log n)', '建堆 O(n)，堆排序 O(n log n)'],
        pitfalls: ['求最大 k 个却用大根堆', '把建堆当成 O(n log n)', '下标从 0 开始却用 2i', '以为 heapq 默认是大根堆'],
        checklist: ['我能写出上浮与下沉', '我能解释建堆为什么是 O(n)', '我能选对 Top K 的堆方向', '我知道堆排序不稳定']
      },
      feynman: '请用守擂台的比喻，讲清楚为什么求最大的 k 个数要维护小根堆，以及它的时间和空间开销。'
    }),

    Z.makeLesson({
      id: 'dsa-graph-walk-L3', kpIds: ['dsa-graph-walk'], subject: 'cs', level: 3,
      title: '图的遍历与最短路：把关系网走一遍',
      estMinutes: 45,
      hookTitle: '导航软件凭什么几毫秒就算出最短路线？',
      hookBody: '路网是带权图，Dijkstra 用优先队列每次取出当前距离最小的节点，确定后不再回头，只松弛它的邻居。配合邻接表，稀疏图上的开销约为 O((V+E) log V)。',
      idea: '图的遍历分**广度优先（BFS）**与**深度优先（DFS）**：BFS 用队列按层扩展，DFS 用栈或递归一路深入。无权最短路用 BFS；非负带权单源最短路用 Dijkstra，负权则用 Bellman-Ford。',
      diagramId: 'stack-queue', diagramCaption: 'BFS 用队列按层扩展，DFS 用栈或递归深入',
      analogy: { title: '水波与走迷宫', md: 'BFS 像往水里扔一颗石子，波纹一圈一圈均匀扩散，第一次到达岸边的那圈就是最近的路。DFS 像走迷宫时沿一条通道走到尽头，再退回岔路口换一条，适合找「有没有通路」而不是「哪条最近」。' },
      points: [
        { title: '一、先选对图的存储方式', md: '邻接矩阵用二维数组，判断两点是否相邻 O(1)，但空间 O(V^2)；邻接表每个顶点挂一条边链表，空间 O(V+E)，遍历邻居的总代价与边数成正比。稀疏图优先邻接表。' },
        { title: '二、BFS 用队列按层扩展', md: '起点入队并标记已访问，每次出队一个顶点，把它所有未访问的邻居标记后入队。队列保证先发现的先扩展，因此访问顺序按距离分层。' },
        { title: '三、BFS 天然求无权最短路', md: '第一次访问某顶点时经过的边数最少，所以把 dist[邻居] 设为 dist[u] + 1 即可。无权图不要上 Dijkstra，BFS 的 O(V+E) 更简单也更快。' },
        { title: '四、DFS 用栈或递归深入', md: '沿一条边一直走到底，走不通再回退换分支。它适合求连通分量、判断环、做拓扑排序，复杂度同样是 O(V+E)，但不保证得到最短路径。' },
        { title: '五、Dijkstra 的前提是非负权', md: '每轮从优先队列取出距离最小的未确定顶点，标记后松弛邻居。因为边权非负，之后不可能出现更短的绕路，所以出队即可定稿。这个贪心前提在负权时失效。' },
        { title: '六、负权与多源各有专门算法', md: '含负权用 Bellman-Ford，对所有边做 V-1 轮松弛，O(VE)，还能再跑一轮判断负环；多源最短路在小规模图上用 Floyd，三重循环 O(V^3)。' },
        { title: '七、复杂度的来源要说清', md: 'BFS / DFS 的 O(V+E) 来自「每个顶点处理一次、每条边检查常数次」；Dijkstra 额外用堆维护候选，每次插入与弹出 O(log V)，总代价 O((V+E) log V)。' }
      ],
      table: {
        headers: ['算法', '适用场景', '时间复杂度'],
        rows: [
          ['BFS', '无权最短路、层序扩展、连通块', 'O(V + E)'],
          ['DFS', '连通性、判环、拓扑排序', 'O(V + E)'],
          ['Dijkstra', '非负权单源最短路', 'O((V + E) log V)'],
          ['Bellman-Ford', '含负权、判断负环', 'O(V * E)'],
          ['Floyd', '多源最短路、小规模稠密图', 'O(V^3)']
        ]
      },
      code: 'from collections import deque\n\ndef bfs_dist(graph, s):\n    dist = {s: 0}\n    q = deque([s])\n    while q:\n        u = q.popleft()\n        for v in graph[u]:\n            if v not in dist:\n                dist[v] = dist[u] + 1\n                q.append(v)\n    return dist\n\ng = {0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2]}\nprint(bfs_dist(g, 0))   # {0: 0, 1: 1, 2: 1, 3: 2}',
      warning: 'visited 要在**入队时**标记，不要等出队才标记。否则同一个顶点可能被多个邻居重复入队，队列膨胀，复杂度被破坏。',
      tip: '先问「边有没有权、权是否非负、是单源还是多源」，再选算法；不要一上来就写 Dijkstra。',
      quizIds: ['dsa-graph-walk-1', 'dsa-graph-walk-2', 'dsa-graph-walk-3', 'dsa-graph-walk-4'],
      example: {
        title: '网格中的最短步数',
        steps: [
          { md: '把每个格子看成一个顶点，上下左右相邻的格子之间连一条权为 1 的边。' },
          { md: '起点入队，dist 记为 0，其余格子记为 -1 表示未访问。' },
          { md: '出队格子的四个方向若在界内且未访问，就令 dist 加一并入队。' },
          { md: '第一次到达终点时的 dist 就是最少步数，总时间 O(格子数)。' }
        ],
        takeaway: '只要能抽象成无权图，最短路就是一次 BFS。'
      },
      example2: {
        title: '手算一次 Dijkstra',
        steps: [
          { md: '图：A 到 B 权 1、A 到 C 权 4、B 到 C 权 2、C 到 D 权 1，起点 A。' },
          { md: '初始 dist：A=0，B=∞，C=∞，D=∞；取出 A，松弛得 B=1、C=4。' },
          { md: '取出 B，松弛 C：1+2=3 小于 4，更新 C=3；再取出 C，松弛 D 得 4。' },
          { md: '四个顶点都确定，最短距离 A=0、B=1、C=3、D=4。' }
        ],
        takeaway: 'Dijkstra 的每一步都在「取最近、松弛邻居、定稿」，已定稿的距离不会再变。'
      },
      guided: [{ questionId: 'dsa-graph-walk-2', hint: '注意「出队即定稿」这个贪心假设依赖什么条件。' }],
      solo: ['dsa-graph-walk-3', 'dsa-graph-walk-4'],
      challenge: ['dsa-graph-walk-1'],
      summary: {
        essence: 'BFS 队列按层扩展求无权最短路；DFS 栈或递归求连通性；Dijkstra 非负权单源；负权用 Bellman-Ford。',
        formulas: ['BFS / DFS：O(V + E)', 'Dijkstra：O((V + E) log V)', 'Bellman-Ford：O(V * E)'],
        pitfalls: ['visited 在出队时才标记', '带权图直接用 BFS 求最短路', '负权图用 Dijkstra', '混淆邻接表 O(V+E) 与矩阵 O(V^2)'],
        checklist: ['我能手写 BFS 与 DFS', '我能分析 O(V+E) 的来源', '我知道 Dijkstra 为什么怕负权', '我能按场景选对最短路算法']
      },
      feynman: '请用水波扩散的比喻讲清楚 BFS 为什么能求无权最短路，并说明带权时为什么要换 Dijkstra。'
    }),

    Z.makeLesson({
      id: 'dsa-dp-L3', kpIds: ['dsa-dp'], subject: 'cs', level: 3,
      title: '动态规划入门：把重复计算存起来',
      estMinutes: 45,
      hookTitle: '为什么朴素递归求斐波那契会慢到爆炸？',
      hookBody: '因为同一个 f(k) 会被反复计算很多次，递归树上的节点数呈指数增长。把算过的结果记下来，每个状态只算一次，复杂度立刻从 O(2^n) 降到 O(n)。',
      idea: '动态规划把问题拆成**互相重叠的子问题**，先定义状态，再写转移方程与边界，最后按依赖顺序求解。它有两种写法：自顶向下记忆化搜索，和自底向上递推填表。',
      diagramId: 'recursion-tree', diagramCaption: '同一子问题在递归树中反复出现，缓存把它剪掉',
      analogy: { title: '记账本与爬楼梯', md: '朴素递归像每次算账都从头重算一遍；记忆化像准备一个记账本，算过的一页直接翻答案。爬楼梯时，你只需要记住「上一阶有几种走法、上上阶有几种」，不用把整棵树重走一遍。' },
      points: [
        { title: '一、先定义状态代表什么', md: '状态是转移方程的变量，必须能用一句话说清，例如 f[i] 表示「走到第 i 阶的方法数」或「前 i 个物品在容量 j 下的最大价值」。状态定义错了，后面全错。' },
        { title: '二、再写转移方程', md: '转移方程描述「当前状态由哪些更小的状态推来」。爬楼梯是 f[i]=f[i-1]+f[i-2]；0/1 背包是 f[j]=max(f[j], f[j-w]+v)，分别对应不选与选当前物品。' },
        { title: '三、边界决定递推能否启动', md: '边界是最小规模子问题的答案，例如 f[0]=1、f[1]=1，或背包中容量为 0 时价值为 0。边界写错，整张表都会跟着偏。' },
        { title: '四、最优子结构与重叠子问题', md: '最优子结构保证大问题的最优解能由子问题的最优解拼出；重叠子问题保证同一状态被多次用到，缓存或递推才有收益。缺一个就不适合 DP。' },
        { title: '五、记忆化与递推等价', md: '记忆化保持递归的直观，先查表再计算，未算过才递归；递推则按依赖顺序从边界填到目标。两者状态数与转移代价相同，复杂度一致。' },
        { title: '六、空间可以用滚动数组压缩', md: '若 f[i] 只依赖前一两行，就不必保存整张表。0/1 背包把二维压成一维时，容量维度必须倒序遍历，保证用的是上一轮的旧值。' },
        { title: '七、复杂度等于状态数乘转移代价', md: '爬楼梯有 n 个状态、每个 O(1) 转移，总 O(n)；0/1 背包有 n×容量 个状态、每个 O(1)，总 O(nC)；编辑距离是 O(mn) 个状态。' }
      ],
      table: {
        headers: ['模型', '状态定义', '转移方程'],
        rows: [
          ['爬楼梯', 'f[i] 走到第 i 阶的方法数', 'f[i] = f[i-1] + f[i-2]'],
          ['0/1 背包', 'f[j] 容量 j 下的最大价值', '倒序 f[j] = max(f[j], f[j-w] + v)'],
          ['最长上升子序列', 'f[i] 以 i 结尾的 LIS 长度', 'f[i] = 1 + max(f[j])，j < i 且 a[j] < a[i]'],
          ['编辑距离', 'f[i][j] 前 i 与 j 个字符的最少操作', '增删改三种操作取最小']
        ]
      },
      code: 'def knapsack(weights, values, cap):\n    f = [0] * (cap + 1)\n    for i in range(len(weights)):\n        for j in range(cap, weights[i] - 1, -1):\n            f[j] = max(f[j], f[j - weights[i]] + values[i])\n    return f[cap]\n\nprint(knapsack([2, 3, 4], [3, 4, 5], 5))  # 7',
      warning: '0/1 背包压成一维后必须**倒序**遍历容量。正序会让 f[j-w] 已经包含当前物品，等于把同一件物品选了多次，变成完全背包。',
      tip: '不会做时先写暴力递归，画出递归树找重复子问题，再加记忆化，最后才考虑改递推和压缩空间。',
      quizIds: ['dsa-dp-1', 'dsa-dp-2', 'dsa-dp-3', 'dsa-dp-4'],
      example: {
        title: '爬楼梯的完整推导',
        steps: [
          { md: '状态：f[i] 表示走到第 i 阶的方法数。' },
          { md: '转移：最后一步可能跨 1 阶或 2 阶，所以 f[i] = f[i-1] + f[i-2]。' },
          { md: '边界：f[1] = 1，f[2] = 2，从 i = 3 开始递推。' },
          { md: '依次得到 f[3]=3、f[4]=5、f[5]=8；只保留前两项即可把空间降到 O(1)。' }
        ],
        takeaway: 'DP 三步走：状态 → 转移 → 边界，缺一不可。'
      },
      example2: {
        title: '0/1 背包手算一遍',
        steps: [
          { md: '物品 (重 2, 值 3)、(重 3, 值 4)、(重 4, 值 5)，容量 5。' },
          { md: '先处理第一件：容量 2 到 5 的 f 都更新为 3。' },
          { md: '处理第二件时倒序更新，容量 5 可容纳 2+3，得到价值 7。' },
          { md: '处理第三件时容量 5 放不下 4 加任何已有物品的组合优于 7，最终答案为 7。' }
        ],
        takeaway: '每件物品只考虑一次，倒序保证不会重复选同一件。'
      },
      guided: [{ questionId: 'dsa-dp-1', hint: '先老老实实写出前三项，再找相邻项的加法关系。' }],
      solo: ['dsa-dp-3', 'dsa-dp-4'],
      challenge: ['dsa-dp-2'],
      summary: {
        essence: 'DP 用状态、转移方程、边界描述问题；最优子结构与重叠子问题是前提；复杂度是状态数乘转移代价。',
        formulas: ['f[i] = f[i-1] + f[i-2]', 'f[j] = max(f[j], f[j-w] + v)（倒序）', '总复杂度 = 状态数 × 单次转移代价'],
        pitfalls: ['状态定义含糊导致转移写不出', '边界漏写或写错', '0/1 背包正序遍历容量', '把最优子结构当成充分条件'],
        checklist: ['我能用一句话定义状态', '我能写出转移方程与边界', '我能把记忆化改成递推', '我知道什么时候该倒序遍历']
      },
      feynman: '请用记账本的比喻，讲清楚记忆化为什么能把斐波那契从 O(2^n) 降到 O(n)。'
    }),

    Z.makeLesson({
      id: 'dsa-greedy-L3', kpIds: ['dsa-greedy'], subject: 'cs', level: 3,
      title: '贪心算法：每一步都选眼前最好的',
      estMinutes: 40,
      hookTitle: '为什么活动选择按结束时间排序，而不是开始时间？',
      hookBody: '结束越早，留给后面的时间窗口越大，因此每选一个最早结束且不冲突的活动，剩余可安排空间最大。这个「局部最优不损害全局最优」的性质，正是贪心能成立的原因。',
      idea: '贪心算法在每一步都选当前看起来最优的方案，并且**不回头、不保留其他分支**。它只有在满足贪心选择性质与最优子结构时才能得到全局最优，否则需要反例或改用动态规划。',
      diagramId: 'sort-compare', diagramCaption: '贪心通常先按关键字段排序，再顺序扫描一次',
      analogy: { title: '摘水果与找零', md: '摘水果时，每次都摘眼前最大最熟的那颗，只要果园里果实分布均匀，最后总体收获就不差。找零时先给最大面额，也是同样的思路。但如果面额设计得刁钻，先拿大面额反而会多找几枚，贪心就失灵了。' },
      points: [
        { title: '一、贪心是「一次扫描，不做回退」', md: '它不像回溯那样枚举所有分支，也不像 DP 那样保留每个状态的最优值，而是当前就定下选择。因此实现通常很短，复杂度主要花在排序上。' },
        { title: '二、两个正确性前提', md: '贪心选择性质：存在一个最优解包含当前这步的局部最优选择；最优子结构：做出该选择后，剩下的子问题仍可用同样方法求最优。两者都成立，贪心才可靠。' },
        { title: '三、证明靠交换论证，证伪靠反例', md: '交换论证的思路是：假设某个最优解没有选贪心项，把它替换成贪心项后结果不会变差，从而说明贪心项一定可以出现在最优解里。找不到证明时，先用小数据暴力枚举对拍。' },
        { title: '四、排序是贪心的常见第一步', md: '区间调度按结束时间升序，分数背包按单位价值降序，合并果子按重量升序配优先队列。排序键选错，后面扫描再正确也没用，因为贪心的选择顺序已经错了。' },
        { title: '五、0/1 背包是贪心的经典反例', md: '容量 10，物品 A(重 6, 值 12)、B(重 5, 值 9)、C(重 5, 值 9)。按单位价值先选 A，剩余容量 4 装不下 B、C，总价值 12；最优是 B 加 C，总价值 18。' },
        { title: '六、常见可贪心模型', md: '活动选择、跳跃游戏、加油站、哈夫曼编码、区间覆盖都属于贪心。它们的共同点是：选完当前最优后，剩余问题的结构与原问题相同，且不会因为这次选择失去更好的组合。' },
        { title: '七、贪心与 DP 的取舍', md: '能证明贪心正确就用贪心，时间通常从 O(n^2) 或指数级降到 O(n log n)；无法证明或存在反例，就退回 DP。分数背包可贪心，0/1 背包必须 DP。' }
      ],
      table: {
        headers: ['问题', '贪心策略', '是否保证最优'],
        rows: [
          ['活动选择', '按结束时间升序，不冲突就选', '是'],
          ['分数背包', '按单位价值降序，可切分', '是'],
          ['0/1 背包', '按单位价值降序整件装入', '否，存在反例'],
          ['任意面额找零', '每次取不超过余额的最大面额', '不一定'],
          ['哈夫曼编码', '每次合并权值最小的两棵树', '是']
        ]
      },
      code: 'def max_intervals(intervals):\n    intervals.sort(key=lambda x: x[1])\n    count = 0\n    end = float("-inf")\n    for s, e in intervals:\n        if s >= end:\n            count += 1\n            end = e\n    return count\n\nprint(max_intervals([(1, 3), (2, 4), (3, 5)]))  # 2',
      warning: '贪心写起来最短，也最容易错。策略一旦没有正确性证明，必须构造小数据用暴力枚举对拍，不要凭感觉提交。',
      tip: '先排序再贪心；排序键要能解释「为什么这样排之后，局部最优不会挡住全局最优」。',
      quizIds: ['dsa-greedy-1', 'dsa-greedy-2', 'dsa-greedy-3', 'dsa-greedy-4'],
      example: {
        title: '活动选择手算',
        steps: [
          { md: '活动区间：(1,3)、(2,4)、(3,5)、(6,8)。' },
          { md: '按结束时间升序排列，顺序不变。' },
          { md: '选 (1,3)，end=3；(2,4) 开始 2 小于 3，冲突跳过。' },
          { md: '(3,5) 开始 3 不小于 3，选中，end=5；(6,8) 也满足，最终选 3 个。' }
        ],
        takeaway: '每次选最早结束且不冲突的区间，能给后面留出最大空间。'
      },
      example2: {
        title: '用反例推翻 0/1 背包的贪心',
        steps: [
          { md: '容量 10，物品 A(6, 12)、B(5, 9)、C(5, 9)。' },
          { md: '单位价值：A 为 2，B 与 C 各为 1.8，贪心先选 A。' },
          { md: '剩余容量 4，B 与 C 都装不下，总价值只有 12。' },
          { md: '而 B 加 C 重量正好 10，总价值 18，说明贪心得到的是次优解。' }
        ],
        takeaway: '不能切分的背包问题必须用 DP，贪心只在分数背包成立。'
      },
      guided: [{ questionId: 'dsa-greedy-1', hint: '想一想选哪个区间能给后面留下最多时间。' }],
      solo: ['dsa-greedy-3', 'dsa-greedy-4'],
      challenge: ['dsa-greedy-2'],
      summary: {
        essence: '贪心每步取局部最优且不回头；成立需要贪心选择性质与最优子结构；证明用交换论证，证伪用反例。',
        formulas: ['区间调度：按右端点升序，O(n log n)', '分数背包：按单位价值降序', '0/1 背包：贪心失效，改用 DP'],
        pitfalls: ['把排序当成正确性证明', '活动选择按开始时间排序', '0/1 背包套用分数背包策略', '任意面额找零想当然'],
        checklist: ['我能说出两个正确性前提', '我能证明活动选择为什么按结束时间排', '我能举出贪心失效的反例', '我知道何时该改用 DP']
      },
      feynman: '请用找零和背包的例子，说明贪心什么时候正确、什么时候会出错，以及怎么验证。'
    }),

    Z.makeLesson({
      id: 'dsa-backtrack-L4', kpIds: ['dsa-backtrack'], subject: 'cs', level: 4,
      title: '回溯与剪枝：把所有可能走一遍，但别白走',
      estMinutes: 50,
      hookTitle: '为什么回溯写完一定要「撤销选择」？',
      hookBody: '回溯在一条路径上反复增删，path 是所有分支共用的。递归返回后不撤销，上一个分支的选择会污染下一个分支，结果里就会出现本不该存在的组合。',
      idea: '回溯在**解空间树**上做深度优先搜索：每层做一次选择，进入下一层，返回时撤销选择。剪枝是在搜索前判断「这条路不可能有答案」，提前砍掉整个分支，把指数级搜索压到可接受范围。',
      diagramId: 'tree-structure', diagramCaption: '解空间树：每层做一次选择，叶子是一个完整方案',
      analogy: { title: '走迷宫与试衣服', md: '走迷宫时你在岔路口做标记，走进死胡同就退回上一个路口，擦掉标记换一条路，这就是回溯。试衣服时每穿一件就照镜子判断，明显不合身就立刻脱掉，不必把整套穿完，这就是剪枝。' },
      points: [
        { title: '一、解空间树是问题的骨架', md: '根节点是空方案，每往下一层就做一个选择，叶子是完整方案。子集问题每层「选或不选」，排列问题每层「选一个未用过的数」，N 皇后每层「在当前行选一列」。' },
        { title: '二、模板只有三步', md: '做选择：把当前候选加入 path 并更新标记；递归：进入下一层；撤销选择：把 path 和标记恢复原状。三步严格对称，是回溯不出错的关键。' },
        { title: '三、终止条件写在递归入口', md: '当 path 长度达到目标，或已处理完所有元素时，把当前方案复制一份加入结果并返回。复制很重要，否则结果里存的都是同一个被后续修改的 path。' },
        { title: '四、组合与排列的参数不同', md: '组合、子集用 start 参数，保证只从当前及之后的元素里选，避免同一组合换顺序重复出现；排列用 used 数组，因为每个位置都可以选任意未使用的元素。' },
        { title: '五、去重要先排序再同层跳过', md: '排序后相同元素相邻。递归时若 i 大于本层起点且 nums[i] 等于 nums[i-1]，就跳过，保证同一层不重复选相同的值，而不同层仍可重复使用。' },
        { title: '六、剪枝分可行性、最优性与去重', md: '可行性剪枝：当前和已超过目标就直接返回；最优性剪枝：当前代价已不优于已知最优解就放弃；去重剪枝：同层相同元素只试一次。剪枝必须保证不误杀合法解。' },
        { title: '七、复杂度与适用边界', md: '子集有 2^n 个叶子、排列有 n! 个叶子，每个叶子复制路径 O(n)，因此回溯天然是指数级。它适合「输出所有方案」；若只要最优值且状态可压缩，应改用 DP。' }
      ],
      table: {
        headers: ['问题', '每层选择', '去重与剪枝方式'],
        rows: [
          ['子集', '当前元素选或不选', '无重复问题，按 start 顺序推进'],
          ['组合', '从 start 往后选一个', '排序后同层跳过相同值'],
          ['排列', '选一个未使用的元素', 'used 数组标记已用'],
          ['N 皇后', '当前行选一列', '列、主对角线、副对角线集合判冲突'],
          ['组合总和', '从 start 起可重复选', '排序后当前和超过目标即 break']
        ]
      },
      code: 'def permute(nums):\n    res = []\n    path = []\n    used = [False] * len(nums)\n\n    def dfs():\n        if len(path) == len(nums):\n            res.append(path[:])\n            return\n        for i in range(len(nums)):\n            if used[i]:\n                continue\n            used[i] = True\n            path.append(nums[i])\n            dfs()\n            path.pop()\n            used[i] = False\n\n    dfs()\n    return res\n\nprint(permute([1, 2]))  # [[1, 2], [2, 1]]',
      warning: '存入结果时必须 `path[:]` 或 `list(path)` 复制。直接 append(path) 存的是同一个列表引用，最后所有结果都会变成同一个（通常是空列表）。',
      tip: '先画三层解空间树，确定每层「选什么」和「怎么避免重复」，再写代码，最后才加剪枝。',
      quizIds: ['dsa-backtrack-1', 'dsa-backtrack-2', 'dsa-backtrack-3', 'dsa-backtrack-4'],
      example: {
        title: '组合总和的剪枝',
        steps: [
          { md: '候选 [2, 3, 6, 7]，目标 7，元素可重复使用。' },
          { md: '先排序，递归时从 start 开始选，允许继续选自己。' },
          { md: '当前和等于 7 时记录方案；超过 7 时直接 break，因为后面的数只会更大。' },
          { md: '得到 [2, 2, 3] 与 [7] 两组解，超过目标的分支全部被剪掉。' }
        ],
        takeaway: '排序加「超过就 break」是最常用的可行性剪枝。'
      },
      example2: {
        title: 'N 皇后的冲突判断',
        steps: [
          { md: '按行递归，每行尝试放一列，因此行冲突天然避免。' },
          { md: '用三个集合记录已占用的列、主对角线 i-j、副对角线 i+j。' },
          { md: '放置前检查三个集合都不包含当前值，冲突就跳过这一列。' },
          { md: '放好后把三个值加入集合，递归下一行，返回时再逐个移除。' }
        ],
        takeaway: '把冲突判断降为集合查询 O(1)，是回溯效率的关键。'
      },
      guided: [{ questionId: 'dsa-backtrack-1', hint: '注意回溯在递归返回时做了什么动作。' }],
      solo: ['dsa-backtrack-3', 'dsa-backtrack-4'],
      challenge: ['dsa-backtrack-2'],
      summary: {
        essence: '回溯在解空间树上做 DFS，模板是「做选择 → 递归 → 撤销选择」；剪枝提前砍掉不可能的分支。',
        formulas: ['子集叶子数 2^n，排列叶子数 n!', '总时间 ≈ 叶子数 × 路径复制代价', '组合用 start，排列用 used'],
        pitfalls: ['递归返回后忘记撤销', '结果里存 path 引用而非副本', '同层去重与不同层去重混淆', '剪枝条件写错误杀合法解'],
        checklist: ['我能画出解空间树', '我能默写三步模板', '我能区分组合与排列的参数', '我能说出至少两类剪枝']
      },
      feynman: '请用走迷宫做标记的比喻，讲清楚回溯为什么要撤销选择，以及剪枝在其中起什么作用。'
    })
  );
})(window.ZSB = window.ZSB || {});
