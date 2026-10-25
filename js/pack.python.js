/* Python 模块包：8 个考点 + 8 份完整讲义 + 32 道题 */
(function (Z) {
  Z.addKps([
    { id: 'py-intro', subject: 'cs', chapter: 'Python 编程', title: 'Python 是什么与怎么运行', level: 1, examWeight: 0.03, prerequisites: [], examCount: 3, examPoints: 8, outcome: '能说清解释器的作用，会写第一个程序并正确运行', note: '先搞清楚代码是怎么被执行的，后面的报错才看得懂' },
    { id: 'py-var', subject: 'cs', chapter: 'Python 编程', title: '变量、类型与类型转换', level: 1, examWeight: 0.04, prerequisites: ['py-intro'], examCount: 4, examPoints: 12, outcome: '能判断变量类型，熟练使用 int / float / str / bool 转换', note: 'Python 变量是贴纸，不是装东西的盒子' },
    { id: 'py-str', subject: 'cs', chapter: 'Python 编程', title: '字符串操作', level: 2, examWeight: 0.04, prerequisites: ['py-var'], examCount: 5, examPoints: 14, outcome: '能完成切片、拼接、分割、查找与格式化', note: '切片下标左闭右开，是字符串题最大的坑' },
    { id: 'py-list', subject: 'cs', chapter: 'Python 编程', title: '列表与元组', level: 2, examWeight: 0.05, prerequisites: ['py-var'], examCount: 5, examPoints: 16, outcome: '能增删改查列表，理解元组不可变与列表可变的区别', note: '列表是可变对象，赋值给两个变量会共享同一块内存' },
    { id: 'py-dict', subject: 'cs', chapter: 'Python 编程', title: '字典与集合', level: 2, examWeight: 0.05, prerequisites: ['py-list'], examCount: 5, examPoints: 16, outcome: '能按键存取字典，用 get 避免 KeyError，用集合去重', note: '字典靠哈希表实现，查找平均 O(1)' },
    { id: 'py-control', subject: 'cs', chapter: 'Python 编程', title: '条件、循环与 range', level: 2, examWeight: 0.05, prerequisites: ['py-var'], examCount: 5, examPoints: 16, outcome: '能写 if / elif / else 与 for / while，正确处理边界', note: 'range 的右端点取不到，是差一错误的来源' },
    { id: 'py-func', subject: 'cs', chapter: 'Python 编程', title: '函数、参数与作用域', level: 3, examWeight: 0.04, prerequisites: ['py-control'], examCount: 5, examPoints: 18, outcome: '能定义带默认参数、关键字参数的函数，解释局部与全局作用域', note: '不要用可变对象当默认参数' },
    { id: 'py-file', subject: 'cs', chapter: 'Python 编程', title: '文件读写与异常处理', level: 3, examWeight: 0.03, prerequisites: ['py-func'], examCount: 4, examPoints: 14, outcome: '能用 with open 读写文件，用 try / except 捕获异常', note: 'with 会自动关闭文件，是标准写法' }
  ]);

  Z.QUESTIONS.push.apply(Z.QUESTIONS, Z.makeQs([
    /* ---------- py-intro ---------- */
    { id: 'py-intro-1', kpIds: ['py-intro'], subject: 'cs', type: 'single',
      stem: 'Python 代码通常是怎么执行的？',
      options: ['先整体编译成机器码，再由 CPU 直接执行', '先编译成字节码，再由 Python 解释器逐条执行', '由浏览器解析后执行', '由数据库引擎执行'],
      answer: 'B',
      analysis: { ans: 'B', why: 'Python 是解释型语言，但并不是「纯逐行读源码」，而是先编译成字节码，再交给解释器执行。', steps: '1. 源码 .py 先被编译成字节码。\n2. 字节码交给 Python 虚拟机逐条执行。\n3. 所以既不是直接生成机器码，也不是浏览器执行。', pit: '不要把「解释执行」理解为「完全不编译」，字节码编译仍然存在。' } },
    { id: 'py-intro-2', kpIds: ['py-intro'], subject: 'cs', type: 'single',
      stem: '下面哪种写法是 Python 的合法注释？',
      options: ['// 这是注释', '# 这是注释', '/* 这是注释 */', '-- 这是注释'],
      answer: 'B',
      analysis: { ans: '# 这是注释', why: 'Python 用井号 # 表示单行注释，三引号可以表示多行字符串（常被当作多行注释）。', steps: '1. // 是 C / Java / JavaScript 的注释。\n2. /* */ 也是 C 系语言的块注释。\n3. # 才是 Python 的单行注释。', pit: '不要把其他语言的注释习惯直接搬过来。' } },
    { id: 'py-intro-3', kpIds: ['py-intro'], subject: 'cs', type: 'fill',
      stem: '在屏幕上输出一句话，Python 使用的内置函数是 ______。',
      answer: 'print', accept: ['print()', 'print'],
      analysis: { ans: 'print', why: 'print 是 Python 的输出函数，把括号里的内容显示到控制台。', steps: '1. 写 print("hello")。\n2. 运行后控制台出现 hello。', pit: 'Python 3 中 print 是函数，必须加括号；print "hello" 是 Python 2 的旧写法。' } },
    { id: 'py-intro-4', kpIds: ['py-intro'], subject: 'cs', type: 'single',
      stem: '关于 Python 的缩进，下列说法正确的是？',
      options: ['缩进只是为了好看，删掉也不影响运行', '缩进表示代码块，同一代码块必须保持一致', '必须用 Tab，不能用空格', '缩进必须正好 2 个空格'],
      answer: 'B',
      analysis: { ans: 'B', why: 'Python 用缩进划分代码块，而不是用大括号。', steps: '1. if 下面的语句要缩进，表示属于这个分支。\n2. 同一层代码缩进量必须一致。\n3. 空格和 Tab 不能混用。', pit: 'IndentationError 几乎都是缩进不一致造成的。' } },

    /* ---------- py-var ---------- */
    { id: 'py-var-1', kpIds: ['py-var'], subject: 'cs', type: 'single',
      stem: '执行下面的代码，输出是什么？\n```python\nx = 3\ny = x\nx = 5\nprint(y)\n```',
      options: ['3', '5', '8', '报错'],
      answer: 'A',
      analysis: { ans: '3', why: 'y = x 只是让 y 指向 3 这个对象；之后 x 改指向 5，不会改变 y。', steps: '1. x 指向整数 3。\n2. y = x，y 也指向 3。\n3. x = 5 让 x 改指向 5，y 仍指向 3。\n4. 输出 3。', pit: '整数不可变，重新赋值是「换贴纸」，不是「改盒子里的东西」。' } },
    { id: 'py-var-2', kpIds: ['py-var'], subject: 'cs', type: 'single',
      stem: '`type(3.0)` 的结果是什么？',
      options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"],
      answer: 'B',
      analysis: { ans: "<class 'float'>", why: '带小数点的数字在 Python 中是浮点型 float，即使小数部分是 0。', steps: '1. 3 是 int。\n2. 3.0 有小数点，是 float。\n3. type() 返回类型对象。', pit: '不要以为 3.0 会自动变成 int。' } },
    { id: 'py-var-3', kpIds: ['py-var'], subject: 'cs', type: 'fill',
      stem: '`int("12") + 3` 的结果是 ______。',
      answer: '15', accept: ['15'],
      analysis: { ans: '15', why: 'int("12") 把字符串转成整数 12，再加 3 得 15。', steps: '1. int("12") → 12。\n2. 12 + 3 = 15。', pit: '字符串 "12" 直接加 3 会报 TypeError，必须先转换。' } },
    { id: 'py-var-4', kpIds: ['py-var'], subject: 'cs', type: 'single',
      stem: '下面哪个变量名是合法的？',
      options: ['2name', 'my-name', 'my_name', 'class'],
      answer: 'C',
      analysis: { ans: 'my_name', why: '变量名只能由字母、数字、下划线组成，不能以数字开头，也不能用关键字。', steps: '1. 2name 以数字开头，非法。\n2. my-name 含减号，非法。\n3. my_name 合法。\n4. class 是关键字，不能作变量名。', pit: '中文也可以作变量名，但考试和工程中都建议用英文下划线命名。' } },

    /* ---------- py-str ---------- */
    { id: 'py-str-1', kpIds: ['py-str'], subject: 'cs', type: 'single',
      stem: '`"abc"[1]` 的结果是？',
      options: ['a', 'b', 'c', 'ab'],
      answer: 'B',
      analysis: { ans: 'b', why: '字符串下标从 0 开始，[1] 取第二个字符。', steps: '1. "abc" 的下标：a=0，b=1，c=2。\n2. [1] 取 b。', pit: '下标 1 不是第一个字符，第一个字符是 [0]。' } },
    { id: 'py-str-2', kpIds: ['py-str'], subject: 'cs', type: 'fill',
      stem: '`len("升本")` 的结果是 ______。',
      answer: '2', accept: ['2'],
      analysis: { ans: '2', why: 'Python 3 的字符串按字符计数，一个汉字算一个字符。', steps: '1. "升本" 有两个汉字。\n2. len 返回字符数 2。', pit: '不要按字节数算成 6；Python 3 的 len 数的是字符。' } },
    { id: 'py-str-3', kpIds: ['py-str'], subject: 'cs', type: 'single',
      stem: '`"a,b,c".split(",")` 的结果是？',
      options: ["'abc'", "['a', 'b', 'c']", "('a', 'b', 'c')", "'a b c'"],
      answer: 'B',
      analysis: { ans: "['a', 'b', 'c']", why: 'split 按分隔符切开字符串，返回列表。', steps: '1. 以逗号为分隔符。\n2. 切成 a、b、c 三段。\n3. 返回列表。', pit: 'split 返回列表，不是字符串；列表用方括号显示。' } },
    { id: 'py-str-4', kpIds: ['py-str'], subject: 'cs', type: 'fill',
      stem: '`"abc"[::-1]` 的结果是 ______。',
      answer: 'cba', accept: ['cba'],
      analysis: { ans: 'cba', why: '切片 [start:stop:step] 中 step 为 -1 表示从后往前取。', steps: '1. 省略起止表示取全部。\n2. step=-1 表示倒序。\n3. 得到 cba。', pit: '切片左闭右开；[::-1] 是最常用的字符串反转写法。' } },

    /* ---------- py-list ---------- */
    { id: 'py-list-1', kpIds: ['py-list'], subject: 'cs', type: 'single',
      stem: '执行下面的代码，输出是什么？\n```python\na = [1, 2, 3]\na.append(4)\nprint(len(a))\n```',
      options: ['3', '4', '5', '报错'],
      answer: 'B',
      analysis: { ans: '4', why: 'append 在列表末尾追加一个元素，长度从 3 变成 4。', steps: '1. 初始列表有 3 个元素。\n2. append(4) 追加 4。\n3. len(a) 为 4。', pit: 'append 是原地修改，不返回新列表。' } },
    { id: 'py-list-2', kpIds: ['py-list'], subject: 'cs', type: 'single',
      stem: '列表和元组最核心的区别是？',
      options: ['列表只能存数字，元组什么都能存', '列表可变，元组不可变', '元组不能遍历', '列表不能切片'],
      answer: 'B',
      analysis: { ans: 'B', why: '列表创建后可以增删改，元组创建后不能修改。', steps: '1. 列表用 []，元组用 ()。\n2. 列表支持 append / remove，元组不支持。\n3. 两者都能遍历和切片。', pit: '元组不可变指的是「不能换元素」，但如果元素本身是列表，列表内部仍可改。' } },
    { id: 'py-list-3', kpIds: ['py-list'], subject: 'cs', type: 'fill',
      stem: '`[1, 2, 3][-1]` 的结果是 ______。',
      answer: '3', accept: ['3'],
      analysis: { ans: '3', why: '负下标表示从末尾倒数，-1 是最后一个元素。', steps: '1. -1 表示倒数第一个。\n2. 列表最后一个是 3。', pit: '不要和 0 混淆：第一个是 [0]，最后一个是 [-1]。' } },
    { id: 'py-list-4', kpIds: ['py-list'], subject: 'cs', type: 'single',
      stem: '`a = [3, 1, 2]` 执行 `a.sort()` 后，`a[0]` 是多少？',
      options: ['3', '1', '2', '报错'],
      answer: 'B',
      analysis: { ans: '1', why: 'sort 默认升序原地排序，排序后是 [1, 2, 3]。', steps: '1. 原列表 [3, 1, 2]。\n2. sort() 原地升序 → [1, 2, 3]。\n3. a[0] = 1。', pit: 'sort() 返回 None，不要写 a = a.sort()，那样 a 会变成 None。' } },

    /* ---------- py-dict ---------- */
    { id: 'py-dict-1', kpIds: ['py-dict'], subject: 'cs', type: 'single',
      stem: '执行下面的代码，输出是什么？\n```python\nd = {"a": 1}\nd["b"] = 2\nprint(len(d))\n```',
      options: ['1', '2', '3', '报错'],
      answer: 'B',
      analysis: { ans: '2', why: '给新键赋值会新增一个键值对，字典长度变成 2。', steps: '1. 初始只有 "a": 1。\n2. d["b"] = 2 新增键 b。\n3. len(d) = 2。', pit: '字典的 len 数的是键值对个数，不是字符数。' } },
    { id: 'py-dict-2', kpIds: ['py-dict'], subject: 'cs', type: 'single',
      stem: '字典取一个可能不存在的键，哪种写法不会报 KeyError？',
      options: ['d["x"]', 'd.x', 'd.get("x")', 'd["x"][0]'],
      answer: 'C',
      analysis: { ans: 'd.get("x")', why: 'get 在键不存在时返回 None 或指定的默认值，不会抛异常。', steps: '1. d["x"] 键不存在会 KeyError。\n2. d.x 不是字典取值语法。\n3. d.get("x") 安全返回 None。', pit: 'get 只是避免报错，不会自动把键写进字典。' } },
    { id: 'py-dict-3', kpIds: ['py-dict'], subject: 'cs', type: 'fill',
      stem: '`{"a": 1}.get("b", 0)` 的结果是 ______。',
      answer: '0', accept: ['0'],
      analysis: { ans: '0', why: '键 b 不存在，get 返回给定的默认值 0。', steps: '1. 在字典里找键 b。\n2. 找不到。\n3. 返回默认值 0。', pit: '默认值只有键不存在时才用；键存在但值为 None 时返回 None。' } },
    { id: 'py-dict-4', kpIds: ['py-dict'], subject: 'cs', type: 'single',
      stem: '集合（set）最典型的特点是什么？',
      options: ['元素有序且可重复', '元素唯一且无序', '只能存数字', '支持按键取值'],
      answer: 'B',
      analysis: { ans: 'B', why: '集合的每个元素唯一，且不保证顺序。', steps: '1. 用 {} 或 set() 创建。\n2. 重复元素自动去重。\n3. 不能像列表那样用下标访问。', pit: '{} 创建的是空字典，不是空集合；空集合要用 set()。' } },

    /* ---------- py-control ---------- */
    { id: 'py-control-1', kpIds: ['py-control'], subject: 'cs', type: 'single',
      stem: '`list(range(3))` 的结果是？',
      options: ['[1, 2, 3]', '[0, 1, 2]', '[0, 1, 2, 3]', '[3]'],
      answer: 'B',
      analysis: { ans: '[0, 1, 2]', why: 'range(3) 从 0 开始，到 3 之前结束，不含 3。', steps: '1. 起点默认 0。\n2. 终点 3 取不到。\n3. 得到 0、1、2。', pit: 'range 左闭右开，是差一错误的高发区。' } },
    { id: 'py-control-2', kpIds: ['py-control'], subject: 'cs', type: 'single',
      stem: '`for i in range(1, 5)` 一共循环几次？',
      options: ['3 次', '4 次', '5 次', '6 次'],
      answer: 'B',
      analysis: { ans: '4 次', why: 'range(1, 5) 产生 1、2、3、4，共 4 个值。', steps: '1. 起点 1 包含。\n2. 终点 5 不包含。\n3. 个数 = 5 − 1 = 4。', pit: '循环次数 = 终点 − 起点，不是终点本身。' } },
    { id: 'py-control-3', kpIds: ['py-control'], subject: 'cs', type: 'fill',
      stem: '`sum(range(5))` 的结果是 ______。',
      answer: '10', accept: ['10'],
      analysis: { ans: '10', why: 'range(5) 是 0 到 4，求和 0+1+2+3+4=10。', steps: '1. range(5) → 0,1,2,3,4。\n2. 相加得 10。', pit: '不要算成 0+1+2+3+4+5=15。' } },
    { id: 'py-control-4', kpIds: ['py-control'], subject: 'cs', type: 'single',
      stem: '想立刻跳出整个循环，应该用哪个关键字？',
      options: ['continue', 'break', 'pass', 'return'],
      answer: 'B',
      analysis: { ans: 'break', why: 'break 结束整个循环；continue 只跳过本轮，进入下一轮。', steps: '1. break 直接跳出循环。\n2. continue 跳过本轮剩余语句。\n3. pass 是空语句，什么也不做。', pit: '嵌套循环里的 break 只跳出最内层。' } },

    /* ---------- py-func ---------- */
    { id: 'py-func-1', kpIds: ['py-func'], subject: 'cs', type: 'single',
      stem: '一个函数没有写 return，调用它得到什么？',
      options: ['0', 'None', '空字符串', '报错'],
      answer: 'B',
      analysis: { ans: 'None', why: 'Python 函数没有显式 return 时，默认返回 None。', steps: '1. 函数执行完没有 return。\n2. 解释器自动返回 None。', pit: '不要以为没返回值就是 0 或空。' } },
    { id: 'py-func-2', kpIds: ['py-func'], subject: 'cs', type: 'fill',
      stem: '```python\ndef add(a, b=2):\n    return a + b\n```\n`add(3)` 的结果是 ______。',
      answer: '5', accept: ['5'],
      analysis: { ans: '5', why: 'b 有默认值 2，只传 a=3 时使用默认值。', steps: '1. 调用 add(3)，a=3。\n2. b 取默认值 2。\n3. 3+2=5。', pit: '有默认值的参数要放在无默认值参数的后面。' } },
    { id: 'py-func-3', kpIds: ['py-func'], subject: 'cs', type: 'single',
      stem: '在函数内部定义的变量，函数外部能直接使用吗？',
      options: ['能，Python 变量都是全局的', '不能，它是局部变量', '能，但必须先 print', '只有数字类型能'],
      answer: 'B',
      analysis: { ans: '不能，它是局部变量', why: '函数内部赋值的变量默认是局部变量，只在函数内可见。', steps: '1. 函数内 x = 1 属于局部作用域。\n2. 函数结束后局部变量被销毁。\n3. 外部访问会 NameError。', pit: '想在函数内修改全局变量，需要 global 声明，但工程上应尽量少用。' } },
    { id: 'py-func-4', kpIds: ['py-func'], subject: 'cs', type: 'single',
      stem: '`def f(x, lst=[]): lst.append(x); return lst` 连续调用 `f(1)`、`f(2)`，第二次返回什么？',
      options: ['[2]', '[1, 2]', '[1]', '报错'],
      answer: 'B',
      analysis: { ans: '[1, 2]', why: '默认参数只在函数定义时创建一次，列表会在多次调用间共享。', steps: '1. 第一次调用 lst 变成 [1]。\n2. 第二次沿用同一个列表，再追加 2。\n3. 返回 [1, 2]。', pit: '默认参数不要用列表、字典等可变对象；需要时写 lst=None，再在函数内创建新列表。' } },

    /* ---------- py-file ---------- */
    { id: 'py-file-1', kpIds: ['py-file'], subject: 'cs', type: 'single',
      stem: '读文件时推荐 `with open("a.txt") as f:`，主要原因是？',
      options: ['速度更快', '离开 with 块会自动关闭文件', '只能读文本文件', '会自动创建文件'],
      answer: 'B',
      analysis: { ans: 'B', why: 'with 是上下文管理器，代码块结束（包括异常）时自动关闭文件。', steps: '1. 打开文件。\n2. 执行 with 内代码。\n3. 离开代码块自动 close。', pit: '手动 open 忘记 close 会占用文件句柄，Windows 上还可能删不掉文件。' } },
    { id: 'py-file-2', kpIds: ['py-file'], subject: 'cs', type: 'single',
      stem: '用 `"w"` 模式打开一个已有文件，会发生什么？',
      options: ['在末尾追加内容', '清空原内容后写入', '只读不写', '报错'],
      answer: 'B',
      analysis: { ans: '清空原内容后写入', why: '"w" 是覆盖写，打开时文件内容会被清空。', steps: '1. open 模式 w 打开即截断。\n2. 写入新内容。\n3. 原内容丢失。', pit: '想保留原内容追加，用 "a" 模式。' } },
    { id: 'py-file-3', kpIds: ['py-file'], subject: 'cs', type: 'fill',
      stem: 'Python 捕获异常使用 try 和 ______ 关键字。',
      answer: 'except', accept: ['except'],
      analysis: { ans: 'except', why: 'try 包住可能出错的代码，except 捕获并处理异常。', steps: '1. try: 执行可能报错的语句。\n2. except 捕获指定异常。\n3. 可以做降级处理。', pit: '不要写裸 except 吞掉所有异常，至少捕获具体类型或记录日志。' } },
    { id: 'py-file-4', kpIds: ['py-file'], subject: 'cs', type: 'single',
      stem: '要一次性读出文件全部内容，常用哪个方法？',
      options: ['f.read()', 'f.write()', 'f.close()', 'f.name'],
      answer: 'A',
      analysis: { ans: 'f.read()', why: 'read() 从当前位置读到文件末尾，返回字符串。', steps: '1. 打开文件。\n2. f.read() 返回全部内容。\n3. 大文件建议按行迭代，避免一次占满内存。', pit: 'read() 会把整个文件读进内存，超大文件要用 for line in f。' } }
  ]));

  /* ======================= 讲义 ======================= */
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'py-intro-L1', kpIds: ['py-intro'], subject: 'cs', level: 1,
      title: 'Python 入门：代码是怎么跑起来的',
      estMinutes: 30,
      hookTitle: '为什么 Python 被称为「能读懂的语言」？',
      hookBody: '因为它把很多底层细节藏了起来：不用声明类型、不用手动管理内存、缩进就是结构。但藏起来不等于不存在，理解它藏了什么，才不会被报错绕晕。',
      idea: 'Python 是一门**解释型、动态类型**的编程语言。你写的 `.py` 文件先被编译成字节码，再由 Python 解释器逐条执行。它牺牲了一部分运行速度，换来了极短的开发时间和非常友好的语法。',
      diagramId: 'python-run', diagramCaption: '源码 → 字节码 → 解释器 → 结果',
      analogy: { title: '翻译官现场口译', md: 'C 语言像提前把整本书翻译好再出版；Python 像请一位翻译官现场口译。你说一句，他翻一句，立刻执行。好处是改一句就能马上重说，坏处是每次都要经过翻译官，速度慢一点。' },
      points: [
        { title: '一、代码写在 .py 文件里', md: '文件只是文本，真正干活的是 Python 解释器。命令行执行 `python hello.py`，解释器就会读取文件、编译、运行。' },
        { title: '二、print 是你的第一双眼睛', md: '`print(内容)` 把结果显示到控制台。调试时最朴素也最有效的方法，就是在关键位置 print 出变量的值。' },
        { title: '三、注释不会被运行', md: '`#` 后面到行尾都是注释，用来解释「为什么这么写」。注释是写给人看的，不是写给机器看的。' },
        { title: '四、缩进就是代码块', md: 'Python 不用大括号，而是用缩进表示「这几行属于同一个分支或循环」。同一层代码缩进必须一致，通常用 4 个空格。' },
        { title: '五、报错要倒着读', md: 'Python 的报错信息最后一行是错误类型和原因，上面是调用栈。新手先看最后一行，再往上找自己代码所在的行。' },
        { title: '六、交互式环境适合试小段代码', md: '在终端输入 `python` 进入 REPL，可以一行一行试。验证一个函数、一个切片的行为，比改文件再运行快得多。' }
      ],
      table: {
        headers: ['写法', '含义', '常见错误'],
        rows: [
          ['print("hi")', '输出内容', '漏括号（Python 2 习惯）'],
          ['# 注释', '单行注释', '用了 // 或 /* */'],
          ['缩进 4 空格', '代码块', '空格与 Tab 混用'],
          ['python a.py', '运行脚本', '路径或文件名写错']
        ]
      },
      code: 'name = "小明"\nprint("你好，" + name)\n# 输出：你好，小明',
      quizIds: ['py-intro-1', 'py-intro-2', 'py-intro-3', 'py-intro-4'],
      example: {
        title: '写出并运行第一个程序',
        steps: [
          { md: '新建文件 hello.py。' },
          { md: '第一行写 `# 我的第一个 Python 程序`，这是注释。' },
          { md: '第二行写 `print("Hello, 升本")`。' },
          { md: '在终端执行 `python hello.py`，看到输出。' }
        ],
        takeaway: '程序 = 文件 + 解释器；print 用来验证结果。'
      },
      example2: {
        title: '看懂一个缩进错误',
        steps: [
          { md: '代码：`if True:` 下一行 `print("a")` 只缩进 2 个空格，再下一行缩进 4 个空格。' },
          { md: '运行报 IndentationError。' },
          { md: '原因：同一代码块缩进不一致。' },
          { md: '把两行统一成 4 个空格，错误消失。' }
        ],
        takeaway: '缩进不是排版，是语法。'
      },
      guided: [{ questionId: 'py-intro-2', hint: '想一想其他语言的注释符号，再排除。' }],
      solo: ['py-intro-1', 'py-intro-3'],
      challenge: ['py-intro-4'],
      summary: {
        essence: 'Python 由解释器执行：源码先编译成字节码，再逐条运行；缩进表示代码块。',
        formulas: ['运行：python 文件名.py', '输出：print(内容)', '注释：# 内容'],
        pitfalls: ['用 // 写注释', '缩进空格与 Tab 混用', 'print 漏括号', '把报错第一行当成原因'],
        checklist: ['我能独立运行一个 .py 文件', '我能解释字节码与解释器', '我能识别缩进错误', '我会用 print 调试']
      },
      feynman: '请用「现场口译」的比喻，讲清楚 Python 为什么开发快、运行慢。'
    }),

    Z.makeLesson({
      id: 'py-var-L1', kpIds: ['py-var'], subject: 'cs', level: 1,
      title: '变量与类型：贴纸，不是盒子',
      estMinutes: 35,
      hookTitle: '`x = 3` 到底发生了什么？',
      hookBody: '很多人以为变量是一个盒子，把 3 装进去。Python 的真实情况是：先造出对象 3，再给这个对象贴一张叫 x 的贴纸。理解这一点，后面的赋值、可变对象、函数传参才不会全乱。',
      idea: 'Python 的变量是**对象的引用**，不是装值的容器。变量本身没有类型，它指向的对象才有类型。常用类型有 int（整数）、float（小数）、str（字符串）、bool（布尔）。',
      diagramId: 'py-ref', diagramCaption: '两个变量可以指向同一个对象',
      analogy: { title: '贴纸与行李箱', md: '对象是行李箱，变量是贴在行李箱上的标签。`y = x` 不是复制行李，而是又贴了一张标签。如果行李箱本身可以打开改东西（可变对象），两张标签看到的是同一份变化。' },
      points: [
        { title: '一、赋值是让变量指向对象', md: '`x = 3` 先创建整数对象 3，再让 x 指向它。之后 `x = 5` 是让 x 改指向 5，原来的 3 如果没人引用就会被回收。' },
        { title: '二、类型决定能做什么', md: 'int 能做加减乘除，str 能拼接和切片，bool 只有 True / False。类型不匹配时，Python 会直接抛 TypeError，而不是偷偷帮你转换。' },
        { title: '三、类型转换要显式写', md: '`int("12")` 把字符串转整数，`str(12)` 把整数转字符串，`float("3.5")` 转小数。转换失败会报 ValueError，例如 `int("abc")`。' },
        { title: '四、True 和 False 也是整数', md: '在 Python 里 `True == 1`、`False == 0`。所以布尔值可以参与算术，但代码里不要依赖这个特性，可读性更重要。' },
        { title: '五、变量名有规则', md: '只能由字母、数字、下划线组成，不能以数字开头，不能是关键字（如 class、for）。习惯用 `小写_下划线` 命名，看到名字就知道含义。' },
        { title: '六、动态类型不等于没有类型', md: '同一个变量可以先指向整数再指向字符串，但每个对象始终有确定类型。`type(x)` 随时能查当前类型。' }
      ],
      table: {
        headers: ['写法', '结果', '说明'],
        rows: [
          ['int("12")', '12', '字符串转整数'],
          ['float(3)', '3.0', '整数转小数'],
          ['str(3.5)', '"3.5"', '小数转字符串'],
          ['bool(0)', 'False', '0 视为假'],
          ['bool("")', 'False', '空字符串视为假']
        ]
      },
      code: 'x = 3\ny = x\nx = 5\nprint(y)        # 3\nprint(type(3.0))  # <class \'float\'>',
      warning: '可变对象（列表、字典）用 `=` 赋值时不会复制，两个变量会共享同一份数据。想真正复制要用 `list(a)`、`a.copy()` 或 `copy.deepcopy`。',
      quizIds: ['py-var-1', 'py-var-2', 'py-var-3', 'py-var-4'],
      example: {
        title: '判断变量指向谁',
        steps: [
          { md: '`a = [1, 2]`：创建列表对象，a 指向它。' },
          { md: '`b = a`：b 也指向同一个列表。' },
          { md: '`b.append(3)`：通过 b 修改列表，a 看到的也变成 [1, 2, 3]。' },
          { md: '若写成 `b = a.copy()` 再 append，a 不受影响。' }
        ],
        takeaway: '先问「是同一个对象吗」，再问「值是多少」。'
      },
      example2: {
        title: '安全地做类型转换',
        steps: [
          { md: '用户输入 `age = input("年龄：")`，得到的是字符串。' },
          { md: '直接 `age + 1` 会报 TypeError。' },
          { md: '用 `int(age) + 1` 转换。' },
          { md: '若输入不是数字，用 try / except 捕获 ValueError 并提示重输。' }
        ],
        takeaway: '输入永远是字符串，进计算前先转换。'
      },
      guided: [{ questionId: 'py-var-1', hint: '注意 y = x 之后，x 又重新指向了 5。' }],
      solo: ['py-var-2', 'py-var-3'],
      challenge: ['py-var-4'],
      summary: {
        essence: '变量是对象的引用；赋值不复制对象；类型属于对象，不属于变量。',
        formulas: ['int(x) / float(x) / str(x) / bool(x)', 'type(x) 查看类型', 'id(x) 查看对象身份'],
        pitfalls: ['以为赋值会复制列表', '字符串直接参与算术', '变量名以数字开头', '把 True 当字符串'],
        checklist: ['我能解释 x = 3 的过程', '我能区分可变与不可变对象', '我会做四种基本类型转换', '我知道变量名规则']
      },
      feynman: '请用贴纸和行李箱的比喻，解释 `a = [1,2]; b = a; b.append(3)` 之后 a 为什么也变了。'
    }),

    Z.makeLesson({
      id: 'py-str-L2', kpIds: ['py-str'], subject: 'cs', level: 2,
      title: '字符串：一段可以切的文字',
      estMinutes: 40,
      hookTitle: '为什么 `"abc"[1]` 不是 a？',
      hookBody: '因为下标是「偏移量」，不是「第几个」。偏移 0 是起点，偏移 1 才往前走一格。字符串的所有切片规则，都建立在这个「左闭右开」的约定上。',
      idea: '字符串是**不可变的字符序列**。你可以取字符、切片、拼接、分割、查找，但任何「修改」都会产生一个新字符串，原字符串保持不变。',
      analogy: { title: '一条印好的纸条', md: '字符串像一条已经印好的纸条。你能剪下一段（切片）、把两条粘起来（拼接），但不能把纸条中间的某个字擦掉重写。想改，只能重新印一条。' },
      points: [
        { title: '一、下标从 0 开始', md: '`s[0]` 是第一个字符，`s[-1]` 是最后一个字符。下标越界会报 IndexError，这一点和 JavaScript 的 undefined 不同。' },
        { title: '二、切片是左闭右开', md: '`s[1:3]` 取下标 1、2，不含 3。省略起点表示从头，省略终点表示到尾，`s[:]` 得到整个字符串的副本。' },
        { title: '三、步长可以是负数', md: '`s[::-1]` 从后往前取，是最常用的反转写法。`s[::2]` 每隔一个取一个。' },
        { title: '四、字符串不可变', md: '`s[0] = "x"` 会报 TypeError。要修改只能拼接出新字符串，例如 `"x" + s[1:]`。' },
        { title: '五、常用方法返回新字符串', md: '`strip()` 去首尾空白，`upper()` 转大写，`replace(a, b)` 替换，`split(sep)` 切成列表，`join(list)` 把列表拼成字符串。' },
        { title: '六、格式化优先用 f-string', md: '`f"你好，{name}"` 直接把变量嵌进字符串，比 `+` 拼接更清晰，也不容易漏空格。' },
        { title: '七、判断与查找', md: '`in` 判断子串是否存在，`find` 返回第一次出现的下标，找不到返回 −1；`index` 找不到会报 ValueError。' }
      ],
      table: {
        headers: ['操作', '写法', '结果'],
        rows: [
          ['取字符', 's[1]', '第二个字符'],
          ['切片', 's[1:3]', '下标 1、2'],
          ['反转', 's[::-1]', '倒序字符串'],
          ['分割', 's.split(",")', '列表'],
          ['拼接', '",".join(list)', '字符串'],
          ['去空白', 's.strip()', '新字符串']
        ]
      },
      code: 's = "hello"\nprint(s[1])       # e\nprint(s[1:4])     # ell\nprint(s[::-1])    # olleh\nprint(len(s))     # 5',
      warning: '切片不会因为越界报错，例如 `"abc"[1:100]` 返回 `"bc"`；但用下标取值 `"abc"[100]` 会报 IndexError。两种行为要分清。',
      quizIds: ['py-str-1', 'py-str-2', 'py-str-3', 'py-str-4'],
      example: {
        title: '判断回文',
        steps: [
          { md: '回文是正着读和倒着读一样的字符串，例如 "level"。' },
          { md: '用切片得到反转：`rev = s[::-1]`。' },
          { md: '比较 `s == rev`。' },
          { md: '相等返回 True，否则 False。' }
        ],
        takeaway: '字符串反转一条切片就够，不要手写循环。'
      },
      example2: {
        title: '把句子拆成单词',
        steps: [
          { md: '句子 `"I love Python"`。' },
          { md: '`words = s.split()` 不传参数时按任意空白分割。' },
          { md: '得到 `["I", "love", "Python"]`。' },
          { md: '想按逗号分割就传 `split(",")`。' }
        ],
        takeaway: 'split 的分隔符决定了切法，不传就按空白切。'
      },
      guided: [{ questionId: 'py-str-3', hint: 'split 的返回值类型是列表。' }],
      solo: ['py-str-1', 'py-str-4'],
      challenge: ['py-str-2'],
      summary: {
        essence: '字符串不可变；下标从 0 开始；切片左闭右开；反转用 [::-1]。',
        formulas: ['s[start:stop:step]', 'len(s)', 's.split(sep)', 'sep.join(list)'],
        pitfalls: ['把 [1] 当第一个字符', '切片右端点误以为包含', '试图用下标修改字符串', 'split 结果当字符串用'],
        checklist: ['我会取首尾字符', '我能写出左闭右开的切片', '我会用 [::-1] 反转', '我分得清 find 与 index']
      },
      feynman: '请解释「左闭右开」是什么意思，并举一个 s[2:5] 的例子。'
    }),

    Z.makeLesson({
      id: 'py-list-L2', kpIds: ['py-list'], subject: 'cs', level: 2,
      title: '列表与元组：能改与不能改的两兄弟',
      estMinutes: 40,
      hookTitle: '为什么改了 b，a 也跟着变？',
      hookBody: '因为 `b = a` 只是多贴了一张标签，两个变量指向同一个列表。列表是可变对象，通过任何一个标签修改，另一个标签都会看到变化。',
      idea: '列表（list）是**可变、有序**的序列，用方括号；元组（tuple）是**不可变、有序**的序列，用圆括号。两者都支持下标、切片、遍历，区别在于能不能原地修改。',
      analogy: { title: '可擦写白板与照片', md: '列表像可擦写白板，你可以擦掉一行、加一行；元组像拍好的照片，内容固定。需要频繁增删就用白板，需要防止被误改就用照片。' },
      points: [
        { title: '一、列表的增删改查', md: '`append` 末尾追加，`insert(i, x)` 指定位置插入，`remove(x)` 删除第一个匹配值，`pop(i)` 取出并删除，`a[i] = x` 直接改。' },
        { title: '二、索引与切片同样适用', md: '`a[0]` 第一个，`a[-1]` 最后一个，`a[1:3]` 取一段。切片返回新列表，不是原列表的视图。' },
        { title: '三、排序的两种写法', md: '`a.sort()` 原地排序，返回 None；`sorted(a)` 返回新列表，原列表不变。考试里经常用返回值来判断你有没有分清。' },
        { title: '四、元组不可变', md: '元组创建后不能替换元素，也不能增删。这让它可以作为字典的键，也能表达「一组固定配置」。' },
        { title: '五、列表推导式', md: '`[x * 2 for x in range(5)]` 一行生成新列表。带条件就写 `[x for x in a if x > 0]`，比手写循环更简洁。' },
        { title: '六、深浅拷贝', md: '`a.copy()` 或 `a[:]` 是浅拷贝：外层列表新了，里面嵌套的列表仍然共享。嵌套结构要完全独立，用 `copy.deepcopy`。' },
        { title: '七、长度与遍历', md: '`len(a)` 是元素个数，最大下标是 len−1。遍历推荐 `for x in a`，需要下标时用 `enumerate(a)`。' }
      ],
      table: {
        headers: ['操作', '列表', '元组'],
        rows: [
          ['创建', '[1, 2]', '(1, 2)'],
          ['修改元素', '支持', '不支持'],
          ['append', '支持', '不支持'],
          ['遍历 / 切片', '支持', '支持'],
          ['作字典键', '不可以', '可以（元素都不可变时）']
        ]
      },
      code: 'a = [3, 1, 2]\na.sort()\nprint(a)        # [1, 2, 3]\nb = sorted([3, 1, 2])\nprint(b)        # [1, 2, 3]\nt = (1, 2)\nprint(t[0])     # 1',
      warning: '`a = a.sort()` 会把 a 变成 None，因为 sort 原地修改并返回 None。这是 Python 最经典的陷阱之一。',
      quizIds: ['py-list-1', 'py-list-2', 'py-list-3', 'py-list-4'],
      example: {
        title: '统计成绩并排序',
        steps: [
          { md: '成绩列表 `scores = [78, 92, 65]`。' },
          { md: '求平均：`sum(scores) / len(scores)`。' },
          { md: '排序：`scores.sort()`。' },
          { md: '最高分取 `scores[-1]`，最低分取 `scores[0]`。' }
        ],
        takeaway: '列表题先想清楚是「原地改」还是「要新列表」。'
      },
      example2: {
        title: '用推导式筛选偶数',
        steps: [
          { md: '原列表 `[1, 2, 3, 4]`。' },
          { md: '写 `[x for x in nums if x % 2 == 0]`。' },
          { md: 'x 依次取 1、2、3、4。' },
          { md: '只有 2、4 满足条件，得到 `[2, 4]`。' }
        ],
        takeaway: '推导式 = 遍历 + 条件 + 表达式，顺序读作「对每个 x，满足条件就留下表达式的结果」。'
      },
      guided: [{ questionId: 'py-list-4', hint: 'sort 是原地升序，排序后第一个元素就是最小值。' }],
      solo: ['py-list-1', 'py-list-3'],
      challenge: ['py-list-2'],
      summary: {
        essence: '列表可变、元组不可变；赋值共享对象；sort 原地、sorted 新建。',
        formulas: ['a.append(x) / a.pop(i)', 'a.sort() / sorted(a)', '[expr for x in a if cond]', 'a.copy() 浅拷贝'],
        pitfalls: ['a = a.sort() 得到 None', '以为 b = a 复制了列表', '浅拷贝嵌套列表仍共享', '元组里放列表后误以为完全不可变'],
        checklist: ['我能区分列表与元组', '我会原地排序与新列表排序', '我能写列表推导式', '我知道深浅拷贝的区别']
      },
      feynman: '请解释为什么 `b = a` 之后改 b 会影响 a，以及怎么避免。'
    }),

    Z.makeLesson({
      id: 'py-dict-L2', kpIds: ['py-dict'], subject: 'cs', level: 2,
      title: '字典与集合：用键直接找值',
      estMinutes: 40,
      hookTitle: '为什么字典查东西不用一个个翻？',
      hookBody: '因为字典内部是哈希表：先用键算出一个位置，再直接跳到那里。理想情况下查找、插入、删除都是常数时间，这就是它比列表遍历快的原因。',
      idea: '字典（dict）保存**键值对**，用键快速取值；集合（set）只保存**不重复的元素**。两者都基于哈希表，查找平均 O(1)。',
      analogy: { title: '带索引的通讯录', md: '字典像通讯录：你报名字（键），直接翻到对应号码（值），不用从第一页开始找。集合像签到表：只关心「来没来」，不关心第几个来，也不会重复记录同一个人。' },
      points: [
        { title: '一、键值对的结构', md: '`d = {"name": "小明", "age": 18}`。键必须是不可变类型（字符串、数字、元组），列表不能作键。' },
        { title: '二、取值与赋值', md: '`d["name"]` 取值，键不存在会 KeyError；`d["score"] = 90` 新增或覆盖。`d.get("x", 默认值)` 是最安全的取值方式。' },
        { title: '三、遍历的三个视角', md: '`d.keys()` 所有键，`d.values()` 所有值，`d.items()` 所有键值对。遍历键值对写 `for k, v in d.items()`。' },
        { title: '四、删除与判断', md: '`d.pop(k)` 取出并删除，`del d[k]` 直接删除，`k in d` 判断键是否存在。' },
        { title: '五、集合去重与运算', md: '`set(list)` 自动去重。集合支持交集 `&`、并集 `|`、差集 `-`，适合做「共同好友」「标签筛选」这类题。' },
        { title: '六、字典也有推导式', md: '`{k: v * 2 for k, v in d.items()}` 一行生成新字典。条件写在后面即可。' },
        { title: '七、哈希表的代价', md: '字典不保证插入顺序以外的顺序（Python 3.7+ 保留插入顺序），也不支持按下标取第 n 个。要排序得先转成 list。' }
      ],
      table: {
        headers: ['需求', '字典', '集合'],
        rows: [
          ['存键值对', '支持', '不支持'],
          ['自动去重', '键唯一', '元素唯一'],
          ['按下标访问', '不支持', '不支持'],
          ['查找', 'O(1) 平均', 'O(1) 平均'],
          ['典型用途', '配置、计数', '去重、成员判断']
        ]
      },
      code: 'd = {"a": 1, "b": 2}\nprint(d.get("c", 0))   # 0\nd["c"] = 3\nfor k, v in d.items():\n    print(k, v)\nprint(set([1, 2, 2, 3]))  # {1, 2, 3}',
      warning: '`{}` 创建的是空**字典**，不是空集合；空集合必须写 `set()`。这是选择题的高频陷阱。',
      quizIds: ['py-dict-1', 'py-dict-2', 'py-dict-3', 'py-dict-4'],
      example: {
        title: '统计每个单词出现的次数',
        steps: [
          { md: '准备空字典 `count = {}`。' },
          { md: '遍历单词列表。' },
          { md: '`count[w] = count.get(w, 0) + 1`。' },
          { md: '遍历结束后，字典里就是每个单词的词频。' }
        ],
        takeaway: '计数题的固定套路：get 取旧值，加一，再写回。'
      },
      example2: {
        title: '用集合找共同爱好',
        steps: [
          { md: '甲 = {"篮球", "音乐"}，乙 = {"音乐", "绘画"}。' },
          { md: '共同爱好用交集 `甲 & 乙`。' },
          { md: '结果是 {"音乐"}。' },
          { md: '全部爱好用并集 `甲 | 乙`。' }
        ],
        takeaway: '集合运算比双重循环更短、更快。'
      },
      guided: [{ questionId: 'py-dict-2', hint: '想一想哪个方法允许「键不存在」时给默认值。' }],
      solo: ['py-dict-1', 'py-dict-3'],
      challenge: ['py-dict-4'],
      summary: {
        essence: '字典按键存取，集合自动去重；两者都靠哈希表，平均 O(1)。',
        formulas: ['d.get(k, default)', 'for k, v in d.items()', 'set(list) 去重', 'A & B / A | B / A - B'],
        pitfalls: ['用 [] 取不存在的键', '把 {} 当空集合', '用列表作字典键', '以为字典能按下标取第 n 项'],
        checklist: ['我会安全取值 get', '我能遍历键值对', '我会用集合去重与交并差', '我理解 O(1) 的前提']
      },
      feynman: '请用通讯录解释字典的查找为什么快，并说明什么情况下会变慢。'
    }),

    Z.makeLesson({
      id: 'py-control-L2', kpIds: ['py-control'], subject: 'cs', level: 2,
      title: '条件与循环：让程序会拐弯、会重复',
      estMinutes: 40,
      hookTitle: '为什么 `range(1, 5)` 只有 4 个数？',
      hookBody: '因为 range 是左闭右开：包含起点，不包含终点。所有「差一错误」几乎都来自这个约定。记住它，循环边界题就少一半坑。',
      idea: '条件让程序走不同分支，循环让程序重复执行。Python 用缩进而非大括号表示代码块；`if / elif / else` 负责选择，`for / while` 负责重复，`break / continue` 负责提前控制。',
      analogy: { title: '路口与传送带', md: 'if 是路口：满足条件走左边，否则走右边。for 是传送带：把一串东西依次送过来，每送一个就处理一次。while 是「只要还没到终点就继续走」。' },
      points: [
        { title: '一、if 的判断顺序', md: '从上到下依次判断，命中一个分支就跳过其余。多个条件是互斥的，用 elif 而不是连续的 if。' },
        { title: '二、真假的规则', md: '`0`、`""`、`[]`、`{}`、`None`、`False` 都视为假，其余视为真。所以 `if lst:` 等价于「列表非空」。' },
        { title: '三、range 的三种写法', md: '`range(n)` 从 0 到 n−1；`range(a, b)` 从 a 到 b−1；`range(a, b, step)` 按步长走，step 可为负。' },
        { title: '四、for 适合已知次数', md: '遍历列表、字符串、range 都用 for。需要下标就写 `for i in range(len(a))` 或 `for i, x in enumerate(a)`。' },
        { title: '五、while 适合未知次数', md: 'while 只要条件为真就继续。循环体里必须有让条件趋向假的操作，否则会死循环。' },
        { title: '六、break 与 continue', md: 'break 立刻结束整个循环；continue 跳过本轮剩余语句，直接进入下一轮。嵌套循环里 break 只跳出最内层。' },
        { title: '七、循环的 else', md: 'Python 的 for / while 可以带 else：循环正常结束（不是被 break 打断）时执行。找质数、找目标时很有用。' }
      ],
      table: {
        headers: ['结构', '适用场景', '注意点'],
        rows: [
          ['if / elif / else', '多选一', '条件互斥'],
          ['for', '已知次数或可迭代对象', 'range 右端不包含'],
          ['while', '次数未知', '必须有退出条件'],
          ['break / continue', '提前控制', '嵌套时只影响本层']
        ]
      },
      code: 'total = 0\nfor i in range(1, 6):\n    if i % 2 == 0:\n        continue\n    total += i\nprint(total)   # 1 + 3 + 5 = 9',
      warning: '`while` 的条件如果永远为真，程序会卡死。写 while 时先想清楚「哪一步会让条件变假」。',
      quizIds: ['py-control-1', 'py-control-2', 'py-control-3', 'py-control-4'],
      example: {
        title: '求 1 到 100 的和',
        steps: [
          { md: '准备累加器 `total = 0`。' },
          { md: '写 `for i in range(1, 101)`，注意终点是 101 才能包含 100。' },
          { md: '每轮 `total += i`。' },
          { md: '循环结束输出 5050。' }
        ],
        takeaway: '求和题先定起点、终点、累加器三件事。'
      },
      example2: {
        title: '判断一个数是不是质数',
        steps: [
          { md: '小于 2 的数不是质数，直接返回 False。' },
          { md: '从 2 试到 `int(n ** 0.5)`，因为因数成对出现。' },
          { md: '发现能整除就 break 并返回 False。' },
          { md: '循环正常结束没有被 break，说明是质数。' }
        ],
        takeaway: '试除到平方根就够，不用试到 n−1。'
      },
      guided: [{ questionId: 'py-control-2', hint: '数一数 range(1,5) 实际产生的数字。' }],
      solo: ['py-control-1', 'py-control-3'],
      challenge: ['py-control-4'],
      summary: {
        essence: 'if 选分支，for / while 做重复；range 左闭右开；break 结束、continue 跳过。',
        formulas: ['range(start, stop, step)', 'for i, x in enumerate(a)', 'while 条件:', 'break / continue'],
        pitfalls: ['range 终点多算一个', 'while 忘记更新条件', '连续 if 代替 elif', '嵌套 break 以为能跳出两层'],
        checklist: ['我能写出正确的 range 边界', '我会用 break 与 continue', '我知道哪些值视为假', '我能避免死循环']
      },
      feynman: '请解释 range(1, 5) 为什么只有 4 个数，并说出循环次数的计算公式。'
    }),

    Z.makeLesson({
      id: 'py-func-L3', kpIds: ['py-func'], subject: 'cs', level: 3,
      title: '函数：把一段逻辑装进盒子',
      estMinutes: 45,
      hookTitle: '为什么默认参数不能写 `[]`？',
      hookBody: '因为默认值只在函数定义时创建一次。写 `def f(lst=[])`，所有调用共用同一个列表，前一次的数据会漏到后一次。这是 Python 最著名的陷阱之一。',
      idea: '函数把一段可复用的逻辑封装起来，接收参数、返回结果。Python 支持位置参数、关键字参数、默认参数、可变参数；函数内部赋值的变量默认是局部变量。',
      analogy: { title: '自动售货机', md: '函数像自动售货机：你投入参数（硬币），它按内部固定的流程处理，最后吐出返回值（饮料）。你不需要知道机器内部怎么转，只要知道投什么、出什么。' },
      points: [
        { title: '一、定义与调用', md: '`def 函数名(参数):` 定义，函数体缩进。调用时写 `函数名(实参)`。函数名后面有没有括号，差别是「函数对象」和「调用结果」。' },
        { title: '二、return 决定返回值', md: 'return 立刻结束函数并带回结果；没有 return 则返回 None。一个函数可以有多条 return，但只会执行一条。' },
        { title: '三、位置参数与关键字参数', md: '`f(1, 2)` 按位置传；`f(b=2, a=1)` 按名字传。关键字参数顺序可以打乱，但必须写在位置参数后面。' },
        { title: '四、默认参数的坑', md: '默认值在定义时求值一次。可变默认值（列表、字典）会被所有调用共享，应该写 `lst=None`，再在函数内 `if lst is None: lst = []`。' },
        { title: '五、作用域 LEGB', md: '查找变量按 Local → Enclosing → Global → Built-in 的顺序。函数内赋值会创建局部变量，想改全局变量需要 global，但工程上应尽量通过参数和返回值传递数据。' },
        { title: '六、可变参数', md: '`*args` 收集多余位置参数成元组，`**kwargs` 收集多余关键字参数成字典。打印函数、装饰器都靠它们。' },
        { title: '七、函数也是对象', md: '函数可以赋值给变量、作为参数传递、作为返回值。这就是回调、装饰器、高阶函数的基础。' }
      ],
      table: {
        headers: ['参数形式', '写法', '说明'],
        rows: [
          ['位置参数', 'f(1, 2)', '按顺序对应'],
          ['关键字参数', 'f(b=2, a=1)', '按名字对应'],
          ['默认参数', 'def f(a, b=2)', '调用时可省略'],
          ['可变位置', 'def f(*args)', '收集成元组'],
          ['可变关键字', 'def f(**kw)', '收集成字典']
        ]
      },
      code: 'def add(a, b=2):\n    return a + b\n\nprint(add(3))      # 5\nprint(add(3, 4))   # 7\n\ndef total(*nums):\n    return sum(nums)\n\nprint(total(1, 2, 3))  # 6',
      warning: '函数内修改列表、字典的内容（append、d[k]=v）会影响外部，因为传的是对象引用；但重新赋值 `lst = [...]` 只改变局部变量指向，外部不受影响。',
      quizIds: ['py-func-1', 'py-func-2', 'py-func-3', 'py-func-4'],
      example: {
        title: '写一个带默认参数的问候函数',
        steps: [
          { md: '定义 `def greet(name, greeting="你好"):`。' },
          { md: '返回 `f"{greeting}，{name}"`。' },
          { md: '调用 `greet("小明")` 得到「你好，小明」。' },
          { md: '调用 `greet("小明", "早上好")` 覆盖默认值。' }
        ],
        takeaway: '默认参数让常用情况更短，让特殊情况仍可定制。'
      },
      example2: {
        title: '修复可变默认参数',
        steps: [
          { md: '错误写法：`def add_item(x, lst=[])`。' },
          { md: '改成 `def add_item(x, lst=None)`。' },
          { md: '函数第一行：`if lst is None: lst = []`。' },
          { md: '再 append 并返回，每次调用都是新列表。' }
        ],
        takeaway: '可变默认值一律用 None 占位。'
      },
      guided: [{ questionId: 'py-func-4', hint: '默认列表只在定义时创建一次，两次调用共用。' }],
      solo: ['py-func-1', 'py-func-2'],
      challenge: ['py-func-3'],
      summary: {
        essence: '函数封装逻辑；return 带回结果；默认参数只求值一次；作用域按 LEGB 查找。',
        formulas: ['def f(a, b=2): return a + b', 'def f(*args, **kwargs)', 'if lst is None: lst = []'],
        pitfalls: ['用列表作默认参数', '忘记 return 得到 None', '函数内赋值后以为改了全局', '关键字参数写在位置参数前'],
        checklist: ['我能定义并调用函数', '我理解 return 与 print 的区别', '我会用默认参数且避开可变陷阱', '我能说出 LEGB 顺序']
      },
      feynman: '请解释为什么 `def f(lst=[])` 会出错，以及正确写法是什么。'
    }),

    Z.makeLesson({
      id: 'py-file-L3', kpIds: ['py-file'], subject: 'cs', level: 3,
      title: '文件与异常：让程序安全地读写和出错',
      estMinutes: 45,
      hookTitle: '程序崩了不可怕，可怕的是文件没关',
      hookBody: '手动 open 后如果中间报错，close 可能永远执行不到，文件句柄就泄漏了。with 语句保证无论正常结束还是异常退出，文件都会被关闭。',
      idea: '文件操作分三步：打开、读/写、关闭。`with open(...) as f` 自动关闭文件，是标准写法。异常处理用 `try / except / else / finally`，让程序在出错时仍能给出可理解的反馈。',
      analogy: { title: '借书与还书', md: 'open 是借书，close 是还书。with 像自动还书机：你离开时它一定帮你还，不管你是正常离开还是被叫走。try / except 像应急预案：出问题时按预设方案处理，而不是整个图书馆关门。' },
      points: [
        { title: '一、打开模式', md: '`r` 只读（默认），`w` 覆盖写，`a` 追加写，`x` 新建写（文件已存在会报错），`b` 二进制。文本文件用 r/w/a，图片音频用 rb/wb。' },
        { title: '二、with 自动关闭', md: '`with open("a.txt", encoding="utf-8") as f:` 离开代码块自动 close。中文文件建议显式指定 encoding="utf-8"，避免 Windows 默认编码踩坑。' },
        { title: '三、三种读法', md: '`f.read()` 读全部，`f.readline()` 读一行，`for line in f` 逐行迭代。大文件优先逐行，避免一次读进内存。' },
        { title: '四、写入与换行', md: '`f.write("内容")` 不会自动加换行，需要自己写 `\\n`。写多行可以用 `f.writelines(list)`，同样不会自动加换行。' },
        { title: '五、try / except 的结构', md: 'try 放可能出错的代码，except 捕获指定异常，else 在没出错时执行，finally 无论如何都执行（常用于清理资源）。' },
        { title: '六、常见异常类型', md: 'FileNotFoundError 文件不存在，PermissionError 没权限，ValueError 值不合法，KeyError 键不存在，TypeError 类型不匹配。捕获时尽量写具体类型。' },
        { title: '七、异常不是用来控流程的', md: '能提前判断的情况就用 if 判断，例如先 `os.path.exists`。异常应该处理「意外」，不要用异常代替正常的条件分支。' }
      ],
      table: {
        headers: ['模式', '含义', '文件不存在时'],
        rows: [
          ['r', '只读', '报 FileNotFoundError'],
          ['w', '覆盖写', '自动创建'],
          ['a', '追加写', '自动创建'],
          ['x', '新建写', '报 FileExistsError'],
          ['r+', '读写', '报错']
        ]
      },
      code: 'with open("note.txt", "w", encoding="utf-8") as f:\n    f.write("第一行\\n第二行\\n")\n\nwith open("note.txt", "r", encoding="utf-8") as f:\n    for line in f:\n        print(line.strip())',
      warning: '用 "w" 打开会立刻清空原文件，哪怕你后面一行都没写。重要文件先备份，或先用 "a" 确认需求。',
      quizIds: ['py-file-1', 'py-file-2', 'py-file-3', 'py-file-4'],
      example: {
        title: '读取文件并统计行数',
        steps: [
          { md: '用 with open 以只读方式打开，指定 encoding="utf-8"。' },
          { md: '准备计数器 count = 0。' },
          { md: '`for line in f:` 每读一行 count += 1。' },
          { md: '循环结束输出 count。空文件结果为 0。' }
        ],
        takeaway: '逐行读是处理文本文件最稳的方式。'
      },
      example2: {
        title: '安全地读取一个可能不存在的文件',
        steps: [
          { md: '把 open 放进 try。' },
          { md: '`except FileNotFoundError:` 提示「文件不存在」。' },
          { md: '`except PermissionError:` 提示「没有权限」。' },
          { md: '需要清理时把代码放 finally。' }
        ],
        takeaway: '捕获具体异常，才能给出有用的提示。'
      },
      guided: [{ questionId: 'py-file-2', hint: 'w 和 a 的区别是「覆盖」还是「追加」。' }],
      solo: ['py-file-1', 'py-file-4'],
      challenge: ['py-file-3'],
      summary: {
        essence: '文件三步：打开、读写、关闭；with 自动关闭；异常按类型捕获。',
        formulas: ['with open(path, mode, encoding="utf-8") as f:', 'f.read() / f.readline() / for line in f', 'try: ... except 类型: ... finally: ...'],
        pitfalls: ['用 w 误删原文件', '忘记 encoding 导致中文乱码', '捕获所有异常吞掉错误', 'write 不会自动换行'],
        checklist: ['我知道五种打开模式', '我会用 with 自动关闭', '我能逐行读大文件', '我能按类型捕获异常']
      },
      feynman: '请解释 with open 相比手动 open/close 好在哪，并举一个异常场景。'
    })
  );
})(window.ZSB = window.ZSB || {});
