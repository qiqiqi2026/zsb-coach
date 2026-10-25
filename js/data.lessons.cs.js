/* 计算机扩展讲义：8 个考点各一份，含图解、代码示例与易错点 */
(function (Z) {
  Z.LESSONS.push(
    /* ================= 数组 ================= */
    {
      id: 'cs-array-L2',
      kpIds: ['cs-array'],
      subject: 'cs',
      level: 2,
      title: '数组：一排带编号的储物柜',
      estMinutes: 40,
      prerequisites: ['cs-loop'],
      unlockRule: {},
      hook: {
        title: '为什么第一个元素叫 a[0] 不叫 a[1]？',
        body: '因为下标不是「第几个」，而是「从起点往前走几步」。第一步还没走，所以是 0。这一点想通，数组就通了一半。'
      },
      sections: [
        { type: 'text', md: '数组是一串**连续摆放**的数据，每个位置有编号。编号叫**下标**，从 0 开始。数组擅长「按编号直接拿东西」，不擅长「中间插队」。' },
        { type: 'diagram', diagramId: 'array-index', caption: '下标是偏移量，不是序号' },
        { type: 'analogy', title: '一排储物柜', md: '储物柜从 0 号开始编号，柜子之间没有空隙。你想开 3 号柜，不用从 0 号一个个找，直接走过去开——这就是数组的随机访问。但要在中间塞进一个柜子，后面的柜子都得整体往后挪。' },
        { type: 'text', md: '**下标 = 偏移量**\n数组首地址加上「下标 × 每个元素大小」，就得到元素地址。所以 a[0] 是起点本身，a[1] 是往前走一格。' },
        { type: 'formula', latex: 'addr(a[i]) = base + i × size', caption: '随机访问 O(1) 的原因' },
        { type: 'quiz', questionId: 'cs2-array-1', purpose: '下标从 0 开始' },
        { type: 'text', md: '**length 是元素个数，不是最大下标**\n长度为 4 的数组，合法下标是 0、1、2、3，最大下标是 length−1。最常见的错误就是循环写成 i<=length。' },
        { type: 'warning', md: '访问越界下标（如长度为 3 却访问 a[5]）在 JavaScript 里不会报错，而是返回 **undefined**。它不会自动扩容，也不会返回 0。' },
        { type: 'quiz', questionId: 'cs2-array-2', purpose: 'length 的含义' },
        { type: 'text', md: '**四个常用操作**\npush 在末尾加，pop 从末尾删；unshift 在开头加，shift 从开头删。前两个是 O(1)，后两个要整体挪动，是 O(n)。' },
        { type: 'compare', headers: ['操作', '作用', '位置', '代价'], rows: [
          ['push(x)', '末尾添加', '尾部', 'O(1)'],
          ['pop()', '末尾删除并返回', '尾部', 'O(1)'],
          ['unshift(x)', '开头添加', '头部', 'O(n)'],
          ['shift()', '开头删除并返回', '头部', 'O(n)']
        ] },
        { type: 'text', md: '**遍历的标准写法**\n`for (let i = 0; i < arr.length; i++)` 里的 `<` 是关键。用 `<=` 会多访问一个不存在的元素，累加时得到 NaN。' },
        { type: 'code', code: 'const a = [10, 20, 30];\nlet sum = 0;\nfor (let i = 0; i < a.length; i++) {\n  sum += a[i];\n}\nconsole.log(sum); // 60' },
        { type: 'quiz', questionId: 'cs2-array-4', purpose: '越界访问' },
        { type: 'tip', md: '数组题先写三件事：下标从 0 开始、长度是 length、循环用 `<` 不用 `<=`。' },
        { type: 'text', md: '**数组的短板**\n中间插入或删除要搬移后面所有元素，最坏 O(n)。如果需要频繁在中间增删，链表更合适；如果需要频繁按下标读取，数组更合适。' }
      ],
      workedExamples: [
        { title: '求数组元素之和', steps: [
          { no: 1, md: '题目：写函数求 [4, 8, 12] 所有元素之和。先准备一个累加器 `sum = 0`。', askBefore: true },
          { no: 2, md: '用循环从 i=0 走到 i < arr.length，保证每个元素都被访问一次。', askBefore: true },
          { no: 3, md: '每轮执行 `sum += arr[i]`，第一轮 sum=4，第二轮 12，第三轮 24。', askBefore: true },
          { no: 4, md: '循环结束返回 sum，结果是 24。', askBefore: true }
        ], takeaway: '累加题三件套：初始值 0、循环 `< length`、循环体内累加。' },
        { title: '找数组中的最大值', steps: [
          { no: 1, md: '先把第一个元素当成「目前最大」：`let max = arr[0]`。', askBefore: true },
          { no: 2, md: '从 i=1 开始遍历，因为第 0 个已经拿来做初始值了。', askBefore: true },
          { no: 3, md: '如果 arr[i] > max，就更新 max = arr[i]。', askBefore: true },
          { no: 4, md: '遍历完返回 max。空数组要先单独判断，否则 arr[0] 是 undefined。', askBefore: true }
        ], takeaway: '求最值先立擂主，再让后面的人依次挑战。' }
      ],
      guidedPractice: [
        { questionId: 'cs2-array-3', hint: 'push 是「末尾添加」，不是开头。想清楚方向再选。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['cs2-array-2', 'cs2-array-4'],
      challenge: ['cs2-array-5'],
      summary: {
        essence: '下标从 0 开始，length 是元素个数；按下标读取 O(1)，中间增删 O(n)。',
        formulas: ['a[i] 的地址 = base + i × size', '最大下标 = length − 1', '遍历条件：i < length'],
        pitfalls: ['把 a[1] 当成第一个元素', '循环写 i <= arr.length 导致 undefined/NaN', '以为越界会自动扩容', '混淆 push 与 unshift'],
        checklist: ['我能说出下标从 0 开始的原因', '我能正确取 length 与最大下标', '我能用循环完成累加与求最值', '我知道数组和链表各自的优势']
      },
      feynmanPrompt: '请用「储物柜」的比喻讲清楚：为什么数组按下标访问很快，但中间插入很慢？'
    },

    /* ================= 哈希表 ================= */
    {
      id: 'cs-hash-L2',
      kpIds: ['cs-hash'],
      subject: 'cs',
      level: 2,
      title: '哈希表：用「算地址」代替「一个个找」',
      estMinutes: 40,
      prerequisites: ['cs-array'],
      unlockRule: {},
      hook: {
        title: '为什么查字典不用从第一页翻？',
        body: '因为你直接翻到了大致位置。哈希表干的就是这件事：先用 key 算出一个位置，再直奔那里。'
      },
      sections: [
        { type: 'text', md: '哈希表 = 数组 + 一个**哈希函数**。哈希函数把任意 key 变成数组下标，于是查找不用遍历，直接跳到对应位置。' },
        { type: 'diagram', diagramId: 'hash-bucket', caption: 'key 经过哈希函数落到某个桶' },
        { type: 'analogy', title: '按姓氏分格的快递柜', md: '快递站按姓氏首字母分格：姓「李」的放 L 格。你报名字，工作人员不用翻遍所有柜子，直接去 L 格找。哈希函数就是「按什么规则分格」，桶就是格子。' },
        { type: 'text', md: '**平均 O(1) 从哪来**\n一次哈希计算 + 一次数组下标访问，两步都是常数时间。所以理想情况下查找、插入、删除平均都是 O(1)。' },
        { type: 'quiz', questionId: 'cs2-hash-1', purpose: '平均复杂度' },
        { type: 'text', md: '**冲突不可避免**\n不同的 key 可能算出同一个下标，这叫哈希冲突。原因很简单：key 无限多，桶的数量有限，抽屉原理注定会撞。' },
        { type: 'quiz', questionId: 'cs2-hash-2', purpose: '冲突的定义' },
        { type: 'text', md: '**两种常见解法**\n① 链地址法：每个桶挂一条链表，冲突的都挂上去。② 开放寻址法：这个位置被占了，就按规则找下一个空位。' },
        { type: 'compare', headers: ['方案', '做法', '优点', '缺点'], rows: [
          ['链地址法', '桶内挂链表', '实现简单、删除方便', '链表过长会退化'],
          ['开放寻址', '冲突后找下一个空位', '不用额外指针', '容易聚集、删除麻烦']
        ] },
        { type: 'text', md: '**装填因子 = 元素数 ÷ 桶数**\n它衡量「拥挤程度」。装填因子越高，冲突越多；通常超过 0.7 左右就要扩容并重新哈希。' },
        { type: 'quiz', questionId: 'cs2-hash-3', purpose: '哈希函数的作用' },
        { type: 'quiz', questionId: 'cs2-hash-4', purpose: '装填因子计算' },
        { type: 'warning', md: '平均 O(1) 不等于永远 O(1)。如果所有 key 都撞到同一个桶，查找就退化成遍历链表，变成 **O(n)**。' },
        { type: 'quiz', questionId: 'cs2-hash-5', purpose: '最坏情况' },
        { type: 'tip', md: '哈希表题先问三句：桶有多少个？装填因子多少？冲突怎么解决？答案基本就出来了。' }
      ],
      workedExamples: [
        { title: '算一次哈希落点', steps: [
          { no: 1, md: '设哈希函数 h(key) = key % 10，桶数 10，要存 27。', askBefore: true },
          { no: 2, md: '计算 27 % 10 = 7，落到 7 号桶。', askBefore: true },
          { no: 3, md: '再存 37：37 % 10 = 7，也落到 7 号桶，发生冲突。', askBefore: true },
          { no: 4, md: '链地址法把 37 挂到 7 号桶的链表后面；开放寻址则继续找 8 号桶。', askBefore: true }
        ], takeaway: '哈希题先算落点，再看是否冲突，最后说清冲突处理方式。' },
        { title: '装填因子与扩容', steps: [
          { no: 1, md: '桶数 10，已存 7 个元素，装填因子 = 7/10 = 0.7。', askBefore: true },
          { no: 2, md: '再存 1 个，变成 8/10 = 0.8，冲突概率明显上升。', askBefore: true },
          { no: 3, md: '通常这时扩容到 20 个桶，装填因子回落到 0.4。', askBefore: true },
          { no: 4, md: '扩容后所有元素都要重新计算下标，这一步叫 rehash，代价 O(n)。', askBefore: true }
        ], takeaway: '装填因子是「拥挤度」，扩容是「换更大的柜子再重排」。' }
      ],
      guidedPractice: [
        { questionId: 'cs2-hash-3', hint: '想一想：是什么把任意的 key 变成固定范围内的下标？', revealAfterAttempts: 3 }
      ],
      independentPractice: ['cs2-hash-2', 'cs2-hash-4'],
      challenge: ['cs2-hash-5'],
      summary: {
        essence: '哈希表用哈希函数把 key 映射成下标，平均 O(1)，冲突太多会退化成 O(n)。',
        formulas: ['h(key) = key % 桶数', '装填因子 = 元素数 / 桶数', '平均 O(1)，最坏 O(n)'],
        pitfalls: ['把平均复杂度当成最坏复杂度', '以为冲突是程序错误', '忘记扩容后要 rehash', '装填因子算反（桶数/元素数）'],
        checklist: ['我能解释哈希表为什么快', '我能说出冲突产生的原因', '我知道链地址法与开放寻址的区别', '我会算装填因子']
      },
      feynmanPrompt: '请用「按姓氏分快递柜」解释哈希表：它是怎么找到东西的？为什么还会冲突？'
    },

    /* ================= 函数与作用域 ================= */
    {
      id: 'cs-function-L2',
      kpIds: ['cs-function'],
      subject: 'cs',
      level: 2,
      title: '函数与作用域：把一段逻辑打包',
      estMinutes: 40,
      prerequisites: ['cs-var-type'],
      unlockRule: {},
      hook: {
        title: '为什么函数里的变量外面用不了？',
        body: '因为每个函数都有自己的「房间」。房间里放的东西，出了门就看不见——这就是作用域。'
      },
      sections: [
        { type: 'text', md: '函数是把一段逻辑打包起来，起个名字，需要时调用。它让代码可以复用，也让变量的活动范围有了边界。' },
        { type: 'text', md: '**参数是入口，return 是出口**\n参数把外面的数据送进来；return 把结果送出去，并且立刻结束函数。没有 return 的函数，返回值是 undefined。' },
        { type: 'diagram', diagramId: 'function-scope', caption: '里层能看外层，外层看不到里层' },
        { type: 'analogy', title: '房间与抽屉', md: '全局变量像放在客厅的东西，谁都能拿；函数里的局部变量像锁在房间里，只有房间里的人能看见。函数执行完，房间就清空了。' },
        { type: 'quiz', questionId: 'cs2-fn-1', purpose: '返回值' },
        { type: 'text', md: '**作用域链**\n内层函数找变量时，先看自己，再看外层，最后看全局。找到了就用，找不到就报 ReferenceError。' },
        { type: 'quiz', questionId: 'cs2-fn-2', purpose: '局部变量外部不可见' },
        { type: 'warning', md: '**return 后面的代码不会执行**。想返回多个值，可以返回数组或对象，不要写两个 return 指望都执行。' },
        { type: 'text', md: '**闭包：函数记住了它的出生地**\n内层函数引用了外层变量，外层函数返回后，这些变量不会被销毁，因为内层函数还要用。这就是闭包。' },
        { type: 'compare', headers: ['概念', '含义', '常见用途'], rows: [
          ['局部变量', '函数内部声明，只在此函数可见', '临时计算、避免污染全局'],
          ['全局变量', '函数外部声明，处处可见', '配置项、共享状态'],
          ['闭包', '内层函数 + 它记住的外层变量', '计数器、私有状态']
        ] },
        { type: 'quiz', questionId: 'cs2-fn-3', purpose: 'return 的作用' },
        { type: 'quiz', questionId: 'cs2-fn-4', purpose: '闭包的本质' },
        { type: 'code', code: 'function makeCounter() {\n  let count = 0;\n  return function () {\n    count++;\n    return count;\n  };\n}\nconst c = makeCounter();\nconsole.log(c()); // 1\nconsole.log(c()); // 2' },
        { type: 'tip', md: '写函数先想清楚三件事：输入是什么、输出是什么、函数名要能读懂用途。' }
      ],
      workedExamples: [
        { title: '用闭包做计数器', steps: [
          { no: 1, md: '外层函数 makeCounter 里声明 `let count = 0`。', askBefore: true },
          { no: 2, md: '内层函数每次把 count 加 1 并返回。', askBefore: true },
          { no: 3, md: '外层把内层函数 return 出去，count 被闭包保留。', askBefore: true },
          { no: 4, md: '连续调用两次，得到 1 和 2，说明状态一直在。', askBefore: true }
        ], takeaway: '闭包 = 内层函数 + 外层变量；外层执行完，变量仍然活着。' },
        { title: '作用域报错定位', steps: [
          { no: 1, md: '代码：`function f(){ let x = 1; } f(); console.log(x);`', askBefore: true },
          { no: 2, md: 'x 在 f 内部用 let 声明，属于函数作用域。', askBefore: true },
          { no: 3, md: '函数执行结束后，外部没有 x 这个名字。', askBefore: true },
          { no: 4, md: '访问未声明变量抛出 ReferenceError，不是 undefined。', askBefore: true }
        ], takeaway: '先看变量在哪声明，再判断能不能访问。' }
      ],
      guidedPractice: [
        { questionId: 'cs2-fn-2', hint: 'x 是 let 声明的局部变量，函数外面根本不存在这个名字。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['cs2-fn-3', 'cs2-fn-4'],
      challenge: ['cs2-fn-5'],
      summary: {
        essence: '函数把逻辑打包；作用域决定变量在哪可见；闭包让内层函数记住外层变量。',
        formulas: ['function 名(参数){ 逻辑; return 结果; }', '无 return → 返回 undefined', '内层可访问外层，外层不可访问内层'],
        pitfalls: ['return 后面还写代码', '以为局部变量会自动变全局', '把闭包当成语法糖', '参数与实参顺序搞反'],
        checklist: ['我能写出带参数和返回值的函数', '我能判断变量属于哪个作用域', '我能解释闭包为什么能保存状态', '我知道 return 会立即结束函数']
      },
      feynmanPrompt: '请用「房间」的比喻解释作用域，并说明闭包为什么能让变量在函数执行完后还活着。'
    },

    /* ================= 递归 ================= */
    {
      id: 'cs-recursion-L2',
      kpIds: ['cs-recursion'],
      subject: 'cs',
      level: 2,
      title: '递归：把大问题交给「小一号的自己」',
      estMinutes: 40,
      prerequisites: ['cs-function'],
      unlockRule: {},
      hook: {
        title: '递归为什么不会永远停不下来？',
        body: '因为它必须有两个东西：一个能把问题变小的递推关系，和一个能喊停的终止条件。少一个就出事。'
      },
      sections: [
        { type: 'text', md: '递归是函数**自己调用自己**。它不是炫技，而是把「大问题」化成「结构相同的小问题」，直到小到可以直接回答。' },
        { type: 'diagram', diagramId: 'recursion-tree', caption: '每层把问题缩小一点，直到触底' },
        { type: 'analogy', title: '俄罗斯套娃', md: '打开一层娃娃，里面还是娃娃，但小一号。一直开到最小的那个，不能再开，就停下。终止条件就是「最小的那个娃娃」。' },
        { type: 'text', md: '**两个必备要素**\n① 终止条件：最小规模直接给答案。② 递推关系：用 n−1 的结果推出 n 的结果。缺终止条件会无限递归，缺递推关系就缩不小。' },
        { type: 'quiz', questionId: 'cs2-rec-1', purpose: '阶乘递归' },
        { type: 'text', md: '**执行顺序：先递下去，再收回来**\nfactorial(3) 会先等 factorial(2)，factorial(2) 又等 factorial(1)。触底后，结果一层层乘回来。' },
        { type: 'code', code: 'function factorial(n) {\n  if (n <= 1) return 1;      // 终止条件\n  return n * factorial(n - 1); // 递推关系\n}\nconsole.log(factorial(4)); // 24' },
        { type: 'quiz', questionId: 'cs2-rec-2', purpose: '递归两要素' },
        { type: 'text', md: '**递归与循环的选择**\n能用循环轻松写清楚的，优先用循环，省栈空间。问题本身是树、分治、回溯这类「天然分层」的，递归更自然。' },
        { type: 'compare', headers: ['维度', '递归', '循环'], rows: [
          ['代码可读性', '贴合问题结构时更直观', '简单累加更直接'],
          ['额外空间', '每层占一个栈帧', '通常 O(1)'],
          ['风险', '终止条件写错会栈溢出', '边界写错会少算或多算']
        ] },
        { type: 'quiz', questionId: 'cs2-rec-4', purpose: '栈溢出' },
        { type: 'text', md: '**斐波那契的教训**\nfib(n)=fib(n−1)+fib(n−2) 写起来很自然，但会大量重复计算，复杂度是指数级。考试常考「为什么慢」，答案是重复子问题。' },
        { type: 'quiz', questionId: 'cs2-rec-5', purpose: '斐波那契数值' },
        { type: 'warning', md: '递归深度过大也会栈溢出，不只是「没写终止条件」才会。n 很大时，循环或记忆化更稳妥。' },
        { type: 'tip', md: '写递归先写终止条件，再写递推。顺序反了，很容易写出停不下来的代码。' }
      ],
      workedExamples: [
        { title: '递归求和 1+2+…+n', steps: [
          { no: 1, md: '先问最小规模：n=1 时结果是 1，这就是终止条件。', askBefore: true },
          { no: 2, md: '再问大问题怎么变小：sum(n) = n + sum(n−1)。', askBefore: true },
          { no: 3, md: '写代码：`if (n <= 1) return n; return n + sumTo(n-1);`', askBefore: true },
          { no: 4, md: '以 n=3 验证：3 + (2 + (1)) = 6。', askBefore: true }
        ], takeaway: '递归三步：找终止、找递推、用小规模验算。' },
        { title: '递归展开看执行顺序', steps: [
          { no: 1, md: 'factorial(3) 想返回 3 × factorial(2)，先停住等。', askBefore: true },
          { no: 2, md: 'factorial(2) 等 factorial(1)，也停住。', askBefore: true },
          { no: 3, md: 'factorial(1) 命中终止条件，直接返回 1。', askBefore: true },
          { no: 4, md: '结果回传：2×1=2，再 3×2=6。先递后归。', askBefore: true }
        ], takeaway: '递归是「先往下问，再往上算」，不是一次算完。' }
      ],
      guidedPractice: [
        { questionId: 'cs2-rec-2', hint: '没有终止条件会停不下来；没有递推关系问题不会变小。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['cs2-rec-4', 'cs2-rec-5'],
      challenge: ['cs2-rec-3'],
      summary: {
        essence: '递归 = 终止条件 + 递推关系；先递下去，再收回来。',
        formulas: ['if (最小规模) return 直接答案;', 'return 组合(自身(更小规模));'],
        pitfalls: ['只写递推不写终止', '终止条件差一（n<1 漏掉 n=1）', '递归深度过大栈溢出', '斐波那契重复计算导致指数级'],
        checklist: ['我能说出递归的两个必备要素', '我能手写阶乘与求和递归', '我能解释栈溢出', '我知道什么时候该用循环代替递归']
      },
      feynmanPrompt: '请用「俄罗斯套娃」解释递归，并说明为什么缺少终止条件就会栈溢出。'
    },

    /* ================= 栈与队列 ================= */
    {
      id: 'cs-stack-L3',
      kpIds: ['cs-stack-queue'],
      subject: 'cs',
      level: 3,
      title: '栈与队列：一个后进先出，一个先进先出',
      estMinutes: 35,
      prerequisites: ['cs-array'],
      unlockRule: {},
      hook: {
        title: '为什么撤销键总是撤销「刚刚」那一步？',
        body: '因为操作被压进了栈：最后压进去的，最先弹出来。栈和队列的区别，就在「从哪头进出」。'
      },
      sections: [
        { type: 'text', md: '栈和队列都是「有顺序限制的线性结构」。限制进出端，就得到两种完全不同的行为。' },
        { type: 'diagram', diagramId: 'stack-queue', caption: '栈同端进出，队列两端分工' },
        { type: 'analogy', title: '叠盘子与排队', md: '栈像叠盘子：只能从最上面拿，最后放上去的最先被拿走。队列像排队买饭：从队尾进、队头出，先来的先买到。' },
        { type: 'text', md: '**栈：LIFO（后进先出）**\npush 压栈，pop 弹栈，peek 看栈顶但不删。所有操作都在同一端，O(1)。' },
        { type: 'quiz', questionId: 'cs2-stack-1', purpose: '栈的特点' },
        { type: 'text', md: '**队列：FIFO（先进先出）**\nenqueue 入队尾，dequeue 出队头。用数组实现时，shift 出队是 O(n)，通常用头尾指针做成循环队列。' },
        { type: 'quiz', questionId: 'cs2-stack-2', purpose: '队列的特点' },
        { type: 'compare', headers: ['结构', '进出规则', '插入端', '删除端', '典型场景'], rows: [
          ['栈', '后进先出', '栈顶', '栈顶', '撤销、括号匹配、函数调用'],
          ['队列', '先进先出', '队尾', '队头', '任务排队、广度优先搜索']
        ] },
        { type: 'quiz', questionId: 'cs2-stack-3', purpose: '入栈出栈顺序' },
        { type: 'text', md: '**栈的经典应用：括号匹配**\n遇到左括号压栈；遇到右括号，看栈顶是不是配对的左括号。是就弹出，不是就失败；最后栈必须为空。' },
        { type: 'quiz', questionId: 'cs2-stack-4', purpose: '括号匹配用栈' },
        { type: 'code', code: 'const stack = [];\nstack.push(1);\nstack.push(2);\nstack.push(3);\nconsole.log(stack.pop()); // 3\nconsole.log(stack);       // [1, 2]' },
        { type: 'warning', md: '用数组模拟队列时，`shift()` 每次都要搬移全部元素，是 O(n)。数据量大时要用循环队列或双指针。' },
        { type: 'tip', md: '看到「最近的先处理」「配对」「嵌套」「撤销」，优先想栈；看到「按到达顺序处理」，优先想队列。' }
      ],
      workedExamples: [
        { title: '括号匹配', steps: [
          { no: 1, md: '输入 `( [ ] )`，准备一个空栈。', askBefore: true },
          { no: 2, md: '读到 `(` 压栈；读到 `[` 压栈。', askBefore: true },
          { no: 3, md: '读到 `]`，栈顶是 `[`，配对成功，弹出。', askBefore: true },
          { no: 4, md: '读到 `)`，栈顶是 `(`，配对成功，弹出；最后栈空，匹配。', askBefore: true }
        ], takeaway: '右括号找最近的左括号 —— 「最近」正是栈顶。' },
        { title: '出入栈推演', steps: [
          { no: 1, md: '依次 push 1、2、3，栈从底到顶是 [1,2,3]。', askBefore: true },
          { no: 2, md: '第一次 pop 弹出栈顶 3。', askBefore: true },
          { no: 3, md: '再 pop 弹出 2，再 pop 弹出 1。', askBefore: true },
          { no: 4, md: '输出顺序是 3、2、1，正好与进入顺序相反。', askBefore: true }
        ], takeaway: '栈的输出顺序是输入顺序的倒序。' }
      ],
      guidedPractice: [
        { questionId: 'cs2-stack-2', hint: '排队买饭：先来的人先买到，这就是队列。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['cs2-stack-3', 'cs2-stack-4'],
      challenge: ['cs2-stack-5'],
      summary: {
        essence: '栈后进先出、同端进出；队列先进先出、两端分工。',
        formulas: ['栈：push / pop / peek', '队列：enqueue / dequeue', '栈顶 = 最后进入的元素'],
        pitfalls: ['把栈当成先进先出', '括号匹配用队列', '用 shift 实现队列忽略 O(n)', '空栈时还 pop'],
        checklist: ['我能说清栈与队列的差别', '我能推演出入栈顺序', '我知道括号匹配为什么用栈', '我知道队列的典型应用']
      },
      feynmanPrompt: '请用「叠盘子」和「排队」分别解释栈与队列，并举一个各自的实际应用。'
    },

    /* ================= 链表 ================= */
    {
      id: 'cs-linked-list-L2',
      kpIds: ['cs-linked-list'],
      subject: 'cs',
      level: 2,
      title: '链表：用指针把节点串起来',
      estMinutes: 40,
      prerequisites: ['cs-array'],
      unlockRule: {},
      hook: {
        title: '数组中间插队要搬家，链表为什么不用？',
        body: '因为链表不要求连续摆放。每个节点只记住「下一个是谁」，要插队，改两根指针就够了。'
      },
      sections: [
        { type: 'text', md: '链表由一个个**节点**组成，每个节点保存值和指向下一个节点的指针。节点在内存里可以东一个西一个，靠指针串起来。' },
        { type: 'diagram', diagramId: 'linked-list', caption: 'value 存数据，next 指向后继' },
        { type: 'analogy', title: '寻宝游戏的字条', md: '第一张字条写着「下一张在树下」，树下的字条又写着「再下一张在门后」。你不用知道所有地点，只要按字条一张张找。指到「没有下一张」，游戏结束。' },
        { type: 'text', md: '**节点结构**\n`{ value: 1, next: 下一个节点 }`。头节点叫 head，尾节点的 next 是 null，表示结束。' },
        { type: 'quiz', questionId: 'cs2-link-1', purpose: '节点结构' },
        { type: 'text', md: '**访问方式：只能顺序走**\n想找第 5 个节点？必须从 head 开始，沿 next 走 5 次。所以按下标访问是 O(n)，不是 O(1)。' },
        { type: 'quiz', questionId: 'cs2-link-2', purpose: '链表查找复杂度' },
        { type: 'text', md: '**插入与删除：改指针**\n已知前驱节点时，插入只需两步：新节点 next 指向后继，前驱 next 指向新节点。不用搬移任何元素。' },
        { type: 'quiz', questionId: 'cs2-link-3', purpose: 'next 指针' },
        { type: 'compare', headers: ['维度', '数组', '链表'], rows: [
          ['内存布局', '连续', '分散'],
          ['按下标访问', 'O(1)', 'O(n)'],
          ['已知位置插入删除', 'O(n)，要搬移', 'O(1)，改指针'],
          ['额外开销', '小', '每个节点多存一个指针']
        ] },
        { type: 'code', code: 'function listToArray(head) {\n  const out = [];\n  let p = head;\n  while (p) {\n    out.push(p.value);\n    p = p.next;\n  }\n  return out;\n}' },
        { type: 'quiz', questionId: 'cs2-link-5', purpose: '链表与数组对比' },
        { type: 'warning', md: '遍历链表忘记写 `p = p.next` 会死循环。删除节点时，也要记得把前驱的 next 接上后继，否则链会断。' },
        { type: 'tip', md: '链表题先在纸上画三个格子：prev、cur、next。指针题画图比空想可靠。' }
      ],
      workedExamples: [
        { title: '遍历链表转数组', steps: [
          { no: 1, md: '准备结果数组 out 和一个游标 p = head。', askBefore: true },
          { no: 2, md: '当 p 不是 null 时，把 p.value 放进 out。', askBefore: true },
          { no: 3, md: '关键一步：p = p.next，让游标往后走。', askBefore: true },
          { no: 4, md: 'p 变成 null 时循环结束，返回 out。', askBefore: true }
        ], takeaway: '链表遍历三件套：游标、while(p)、p = p.next。' },
        { title: '在节点后插入新节点', steps: [
          { no: 1, md: '设要在节点 A 后面插入 B，A 原先后继是 C。', askBefore: true },
          { no: 2, md: '先让 B.next = C，把后半段接住。', askBefore: true },
          { no: 3, md: '再让 A.next = B，把前半段接上。', askBefore: true },
          { no: 4, md: '顺序不能反：先接后，再接前，否则会丢掉 C。', askBefore: true }
        ], takeaway: '插入两步：新节点接后继，前驱接新节点。顺序反了会断链。' }
      ],
      guidedPractice: [
        { questionId: 'cs2-link-2', hint: '链表没有下标，不能一步跳过去，只能从 head 一个个走。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['cs2-link-3', 'cs2-link-5'],
      challenge: ['cs2-link-4'],
      summary: {
        essence: '链表靠 next 指针串联；按下标访问 O(n)，已知位置插入删除 O(1)。',
        formulas: ['节点 = { value, next }', '尾节点 next = null', '插入：new.next = cur.next; cur.next = new'],
        pitfalls: ['以为链表可以随机访问', '遍历忘记 p = p.next', '插入时先改前驱导致断链', '删除节点后忘记接回后继'],
        checklist: ['我能画出链表结构', '我能写出遍历代码', '我能说清链表与数组的取舍', '我能正确完成一次插入']
      },
      feynmanPrompt: '请用「寻宝字条」解释链表，并说明为什么链表中间插入比数组快、按下标访问却更慢。'
    },

    /* ================= 排序与复杂度 ================= */
    {
      id: 'cs-sort-L3',
      kpIds: ['cs-sort'],
      subject: 'cs',
      level: 3,
      title: '排序：把乱序变成有序的几种套路',
      estMinutes: 45,
      prerequisites: ['cs-array'],
      unlockRule: {},
      hook: {
        title: '同样能排好，为什么还要分这么多种？',
        body: '因为数据量、数据现状、内存限制都不一样。选排序算法，其实是在时间、空间、稳定性之间做取舍。'
      },
      sections: [
        { type: 'text', md: '排序就是把一组数据按大小重新排列。考试重点不是背代码，而是**过程推演 + 复杂度 + 稳定性**。' },
        { type: 'diagram', diagramId: 'sort-compare', caption: '不同排序的时间与空间对比' },
        { type: 'text', md: '**冒泡排序：相邻比较，大的往后冒**\n每一轮把当前最大值送到末尾。n 个元素最多 n−1 轮，每轮比较次数递减。' },
        { type: 'text', md: '**选择排序：每轮挑最小的放前面**\n扫描未排序区间，记录最小值下标，和区间第一个元素交换。交换次数少，但比较次数仍是 O(n²)。' },
        { type: 'quiz', questionId: 'cs2-sort-1', purpose: '冒泡复杂度' },
        { type: 'quiz', questionId: 'cs2-sort-2', purpose: '冒泡一趟推演' },
        { type: 'text', md: '**插入排序：像整理扑克牌**\n把当前元素插入到前面已排好的序列中。数据越接近有序越快，最好 O(n)，最坏 O(n²)。' },
        { type: 'compare', headers: ['算法', '平均时间', '最好', '空间', '稳定'], rows: [
          ['冒泡排序', 'O(n²)', 'O(n)（已有序）', 'O(1)', '稳定'],
          ['选择排序', 'O(n²)', 'O(n²)', 'O(1)', '不稳定'],
          ['插入排序', 'O(n²)', 'O(n)（近乎有序）', 'O(1)', '稳定'],
          ['快速排序', 'O(n log n)', 'O(n log n)', 'O(log n)', '不稳定'],
          ['归并排序', 'O(n log n)', 'O(n log n)', 'O(n)', '稳定']
        ] },
        { type: 'quiz', questionId: 'cs2-sort-3', purpose: '稳定性' },
        { type: 'text', md: '**稳定性的含义**\n两个相等的元素，排序后相对顺序不变，就叫稳定。比如先按姓名排、再按分数排，稳定排序能保留同分者的姓名顺序。' },
        { type: 'quiz', questionId: 'cs2-sort-4', purpose: '选择排序' },
        { type: 'code', code: 'function bubbleSort(arr) {\n  for (let i = 0; i < arr.length - 1; i++) {\n    for (let j = 0; j < arr.length - 1 - i; j++) {\n      if (arr[j] > arr[j + 1]) {\n        const t = arr[j];\n        arr[j] = arr[j + 1];\n        arr[j + 1] = t;\n      }\n    }\n  }\n  return arr;\n}' },
        { type: 'warning', md: '内层循环边界写成 `j < arr.length - 1` 而不减 i，会重复比较已排好的尾部，虽然结果对但做了大量无用功。' },
        { type: 'tip', md: '复杂度看循环嵌套：两层各走 n 次 → O(n²)；每次规模减半 → O(log n)；减半后再合并 → O(n log n)。' }
      ],
      workedExamples: [
        { title: '推演一趟冒泡', steps: [
          { no: 1, md: '数组 [3,1,4,2]，从第一对开始比较。', askBefore: true },
          { no: 2, md: '3 > 1，交换 → [1,3,4,2]。', askBefore: true },
          { no: 3, md: '3 < 4，不交换；4 > 2，交换 → [1,3,2,4]。', askBefore: true },
          { no: 4, md: '一趟结束，最大值 4 已经冒到末尾。', askBefore: true }
        ], takeaway: '一趟冒泡只保证「最大值到位」，不是整体有序。' },
        { title: '选择排序第一轮', steps: [
          { no: 1, md: '数组 [5,2,9,1]，未排序区间是整个数组。', askBefore: true },
          { no: 2, md: '扫描找到最小值 1，下标 3。', askBefore: true },
          { no: 3, md: '把 1 与区间第一个元素 5 交换 → [1,2,9,5]。', askBefore: true },
          { no: 4, md: '下一轮从未排序区 [2,9,5] 继续。', askBefore: true }
        ], takeaway: '选择排序每轮只交换一次，比较却要扫一遍。' }
      ],
      guidedPractice: [
        { questionId: 'cs2-sort-3', hint: '相等元素不交换相对顺序的，才叫稳定。冒泡和插入通常稳定。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['cs2-sort-2', 'cs2-sort-4'],
      challenge: ['cs2-sort-5'],
      summary: {
        essence: '排序要在时间、空间、稳定性之间取舍；冒泡/选择/插入是 O(n²)，快排/归并是 O(n log n)。',
        formulas: ['冒泡/选择/插入：O(n²)', '快排/归并：O(n log n)', '归并额外空间 O(n)'],
        pitfalls: ['把稳定与复杂度混为一谈', '以为选择排序稳定', '内层循环边界不多减 i', '认为快排最坏也是 O(n log n)'],
        checklist: ['我能推演一趟冒泡', '我能说出三种 O(n²) 排序的差别', '我知道哪些排序稳定', '我能根据场景选排序算法']
      },
      feynmanPrompt: '请解释「稳定性」是什么意思，并说明为什么选择排序通常不稳定、插入排序稳定。'
    },

    /* ================= 查找 ================= */
    {
      id: 'cs-search-L3',
      kpIds: ['cs-search'],
      subject: 'cs',
      level: 3,
      title: '二分查找与双指针：有序数据的加速器',
      estMinutes: 40,
      prerequisites: ['cs-sort'],
      unlockRule: {},
      hook: {
        title: '猜数字游戏为什么总能很快猜中？',
        body: '因为每次猜中间，范围就砍一半。1000 个数最多猜 10 次——这就是二分查找。'
      },
      sections: [
        { type: 'text', md: '顺序查找要从头看到尾，O(n)。如果数据**已经有序**，就可以用二分查找，每次排除一半，O(log n)。' },
        { type: 'diagram', diagramId: 'binary-search', caption: '每次比较中间值，砍掉一半区间' },
        { type: 'analogy', title: '猜数字', md: '你心里想 1–100 的数，我猜 50。你说「大了」，我就知道答案在 1–49，直接扔掉一半。每猜一次，范围减半。' },
        { type: 'text', md: '**二分三步**\n① 取 mid = (low + high) / 2 向下取整。② 比较 arr[mid] 与 target。③ 相等返回；小了去右半，大了去左半。' },
        { type: 'quiz', questionId: 'cs2-search-1', purpose: '下标定位' },
        { type: 'quiz', questionId: 'cs2-search-2', purpose: '二分的前提' },
        { type: 'text', md: '**边界是最大坑**\n循环条件写 `low <= high`，因为区间里还剩一个元素时也要检查。写成 `low < high` 会漏掉最后一个。' },
        { type: 'quiz', questionId: 'cs2-search-3', purpose: '循环条件' },
        { type: 'code', code: 'function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    const mid = (low + high) >> 1;\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}' },
        { type: 'text', md: '**双指针：两端向中间夹**\n有序数组求和为定值的两个数：left 指向头，right 指向尾。和太小就让 left 右移，和太大就让 right 左移。' },
        { type: 'quiz', questionId: 'cs2-search-5', purpose: '双指针' },
        { type: 'compare', headers: ['方法', '前提', '时间', '适用'], rows: [
          ['顺序查找', '无', 'O(n)', '数据无序、量小'],
          ['二分查找', '有序', 'O(log n)', '静态有序数据'],
          ['双指针', '有序', 'O(n)', '两数之和、去重、反转']
        ] },
        { type: 'warning', md: '二分只对**有序**数据有效。无序数组先排序再二分，整体是 O(n log n)，不一定比一次顺序查找划算。' },
        { type: 'tip', md: '二分写完用三个用例自测：目标在最左、在最右、不存在。三个都过，边界基本没错。' }
      ],
      workedExamples: [
        { title: '在有序数组中找 7', steps: [
          { no: 1, md: '数组 [1,3,5,7,9]，low=0，high=4。', askBefore: true },
          { no: 2, md: 'mid=(0+4)/2=2，arr[2]=5 < 7，去右半，low=3。', askBefore: true },
          { no: 3, md: 'mid=(3+4)/2=3，arr[3]=7，命中，返回 3。', askBefore: true },
          { no: 4, md: '只比较了两次，就排除了大半个数组。', askBefore: true }
        ], takeaway: '二分每轮必砍一半，所以是 log 级。' },
        { title: '双指针找两数之和', steps: [
          { no: 1, md: '有序数组 [1,2,4,7,11]，目标和 9。', askBefore: true },
          { no: 2, md: 'left=0（1），right=4（11），和 12 > 9。', askBefore: true },
          { no: 3, md: '和太大，右指针左移：right=3（7），和 8 < 9。', askBefore: true },
          { no: 4, md: '和太小，左指针右移：left=1（2），和 9，找到。', askBefore: true }
        ], takeaway: '双指针靠有序性决定「该动哪一头」。' }
      ],
      guidedPractice: [
        { questionId: 'cs2-search-2', hint: '二分靠「中间值大小」判断方向，前提必须是区间有序。', revealAfterAttempts: 3 }
      ],
      independentPractice: ['cs2-search-3', 'cs2-search-5'],
      challenge: ['cs2-search-4'],
      summary: {
        essence: '有序才能二分；每轮砍一半，O(log n)；双指针用两端夹逼，O(n)。',
        formulas: ['mid = (low + high) >> 1', '循环条件 low <= high', '找不到返回 −1'],
        pitfalls: ['对无序数组用二分', '循环写 low < high 漏掉最后一个', '更新写成 low = mid 导致死循环', '忘记 +1/−1'],
        checklist: ['我能手写二分查找', '我能说清三个边界用例', '我知道双指针为什么依赖有序', '我能比较顺序、二分、双指针']
      },
      feynmanPrompt: '请用「猜数字」解释二分查找，并说明为什么循环条件必须是 low <= high。'
    }
  );
})(window.ZSB = window.ZSB || {});
