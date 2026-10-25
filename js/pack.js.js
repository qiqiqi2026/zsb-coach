/* JavaScript 前端模块包：8 个考点 + 8 份完整讲义 + 32 道题 */
(function (Z) {
  Z.addKps([
    { id: 'js-syntax', subject: 'cs', chapter: 'JavaScript 前端', title: 'JS 语法与数据类型', level: 1, examWeight: 0.03, prerequisites: [], examCount: 4, examPoints: 12, outcome: '能说出七种原始类型，预判隐式转换结果，分清 == 与 ===', note: '先记 typeof null 是 object 这类历史遗留，题型最爱考例外' },
    { id: 'js-array', subject: 'cs', chapter: 'JavaScript 前端', title: 'JS 数组方法', level: 2, examWeight: 0.03, prerequisites: ['js-syntax'], examCount: 4, examPoints: 12, outcome: '能用 map / filter / reduce 处理数组，分清哪些方法会改原数组', note: 'sort 默认按字符串排序，是数组题第一大坑' },
    { id: 'js-object', subject: 'cs', chapter: 'JavaScript 前端', title: 'JS 对象与 JSON', level: 2, examWeight: 0.03, prerequisites: ['js-syntax'], examCount: 4, examPoints: 12, outcome: '能用点与方括号存取属性，会做 JSON 序列化与反序列化', note: '对象赋值传的是引用，改一个另一个也会变' },
    { id: 'js-dom', subject: 'cs', chapter: 'JavaScript 前端', title: 'DOM 查找与修改', level: 2, examWeight: 0.03, prerequisites: ['js-syntax'], examCount: 4, examPoints: 12, outcome: '能选中节点、改文本与样式，并解释 textContent 与 innerHTML 的差别', note: 'innerHTML 塞用户输入就是 XSS 漏洞' },
    { id: 'js-event', subject: 'cs', chapter: 'JavaScript 前端', title: '事件与事件委托', level: 2, examWeight: 0.03, prerequisites: ['js-dom'], examCount: 4, examPoints: 12, outcome: '能说出捕获与冒泡顺序，用事件委托统一处理子元素点击', note: 'stopPropagation 管冒泡，preventDefault 管默认行为' },
    { id: 'js-async', subject: 'cs', chapter: 'JavaScript 前端', title: '异步、Promise 与事件循环', level: 3, examWeight: 0.03, prerequisites: ['js-event'], examCount: 4, examPoints: 12, outcome: '能判断同步、微任务、宏任务的输出顺序，会用 async / await', note: 'setTimeout 写 0 也不是立刻执行，它只是尽快排队' },
    { id: 'js-storage', subject: 'cs', chapter: 'JavaScript 前端', title: '本地存储与 Cookie', level: 3, examWeight: 0.03, prerequisites: ['js-syntax'], examCount: 4, examPoints: 12, outcome: '能按生命周期与安全要求选择 localStorage / sessionStorage / Cookie', note: 'localStorage 只能存字符串，存对象要先 JSON.stringify' },
    { id: 'js-module', subject: 'cs', chapter: 'JavaScript 前端', title: '模块化与前端工程', level: 3, examWeight: 0.03, prerequisites: ['js-async'], examCount: 4, examPoints: 12, outcome: '能说清 ES Module 与 CommonJS 的写法差异，解释模块解决了什么问题', note: '模块的核心价值是隔离作用域，不是把文件变小' }
  ]);

  Z.QUESTIONS.push.apply(Z.QUESTIONS, Z.makeQs([
    /* ---------- js-syntax ---------- */
    { id: 'js-syntax-1', kpIds: ['js-syntax'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: '类型判断', source: '自建',
      stem: '执行 `console.log(typeof null)`，输出是什么？',
      options: ['null', 'undefined', 'object', 'number'],
      answer: 'C',
      analysis: { ans: 'object', why: 'typeof null 返回字符串 object。这是 JS 早期按低位标记判断类型留下的 bug，为了兼容旧代码一直没修。', steps: '1. typeof 对 null 做判断。\n2. 规范明确规定返回 "object"。\n3. 所以输出 object，而不是 null。', pit: '不要用 typeof 判断 null；判断 null 要写 `x === null`。' } },
    { id: 'js-syntax-2', kpIds: ['js-syntax'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: '隐式转换', source: '自建',
      stem: '执行下面的代码，输出是什么？\n```javascript\nconsole.log(1 + "2" - 1)\n```',
      options: ['2', 'NaN', '11', '"11"'],
      answer: 'C',
      analysis: { ans: '11', why: '加号一侧是字符串时做拼接，得到 "12"；减号只做算术，把 "12" 转成数字 12，再减 1 得 11。', steps: '1. `1 + "2"` 有字符串参与，执行拼接，得到 "12"。\n2. `"12" - 1` 减法强制转数字，12 − 1 = 11。\n3. 结果是数字 11，不带引号。', pit: '加号是唯一会因字符串而改成拼接的算术运算符，减乘除都会强制转数字。' } },
    { id: 'js-syntax-3', kpIds: ['js-syntax'], subject: 'cs', type: 'fill', difficulty: 1, estSeconds: 35, skillTag: '类型判断', source: '自建',
      stem: '`console.log(typeof undefined)` 的输出是 ______。',
      answer: 'undefined', accept: ['undefined', '"undefined"', "'undefined'"],
      analysis: { ans: 'undefined', why: 'typeof 对未赋值的变量和 undefined 值都返回字符串 "undefined"。', steps: '1. typeof 先看操作数的类型。\n2. undefined 属于原始类型 undefined。\n3. 返回字符串 undefined。', pit: 'typeof 的返回值是字符串，不要和值本身 undefined 混淆。' } },
    { id: 'js-syntax-4', kpIds: ['js-syntax'], subject: 'cs', type: 'fill', difficulty: 2, estSeconds: 40, skillTag: '隐式转换', source: '自建',
      stem: '执行下面的代码，输出的结果是 ______。\n```javascript\nvar x = 5\nx += "5"\nconsole.log(x)\n```',
      answer: '55', accept: ['55', '"55"', "'55'"],
      analysis: { ans: '55', why: 'x += "5" 等价于 x = x + "5"，加号遇到字符串改为拼接，5 变成 "5"，拼成 "55"。', steps: '1. x 初始是数字 5。\n2. `x + "5"` 有字符串参与，数字转字符串后拼接。\n3. 得到字符串 "55"，控制台显示 55。', pit: '不要按 5 + 5 = 10 算；只要有一侧是字符串，加号就是拼接。' } },

    /* ---------- js-array ---------- */
    { id: 'js-array-1', kpIds: ['js-array'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: '数组遍历', source: '自建',
      stem: '执行下面的代码，输出是什么？\n```javascript\nvar a = [1, 2, 3]\nvar b = a.map(function (x) { return x * 2 })\nconsole.log(a, b)\n```',
      options: ['[1, 2, 3] [2, 4, 6]', '[2, 4, 6] [2, 4, 6]', '[1, 2, 3] [2, 3, 4]', '[2, 4, 6] [1, 2, 3]'],
      answer: 'A',
      analysis: { ans: '[1, 2, 3] [2, 4, 6]', why: 'map 遍历原数组，把每次返回值收集成新数组，原数组保持不变。', steps: '1. a 是 [1, 2, 3]。\n2. map 对每个元素乘 2，得到新数组 [2, 4, 6]。\n3. b 指向新数组，a 仍是 [1, 2, 3]。', pit: 'map 返回新数组、不改原数组；想让原数组变，必须写 `a = a.map(...)`。' } },
    { id: 'js-array-2', kpIds: ['js-array'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 50, skillTag: '数组排序', source: '自建',
      stem: '执行下面的代码，`a` 变成什么？\n```javascript\nvar a = [10, 2, 1]\na.sort()\n```',
      options: ['[1, 2, 10]', '[1, 10, 2]', '[10, 2, 1]', '[2, 1, 10]'],
      answer: 'B',
      analysis: { ans: '[1, 10, 2]', why: 'sort 不传比较函数时，会把元素转成字符串按字典序比较，"10" 的首字符 1 小于 "2"，所以排在 2 前面。', steps: '1. 三个元素转成字符串 "10"、"2"、"1"。\n2. 字典序："1" < "10" < "2"。\n3. 结果为 [1, 10, 2]。', pit: '数值排序必须传 `function (x, y) { return x - y }`，否则 10 会排到 2 前面。' } },
    { id: 'js-array-3', kpIds: ['js-array'], subject: 'cs', type: 'fill', difficulty: 1, estSeconds: 35, skillTag: '数组查找', source: '自建',
      stem: '`console.log([1, 2, 3].indexOf(2))` 的输出是 ______。',
      answer: '1', accept: ['1'],
      analysis: { ans: '1', why: 'indexOf 返回第一个匹配元素的下标，数组下标从 0 开始，2 在第二位。', steps: '1. 从左往右找值为 2 的元素。\n2. 下标 0 是 1，下标 1 是 2。\n3. 返回 1；找不到时返回 −1。', pit: 'indexOf 找的是下标不是「第几个」；返回 −1 表示不存在，不能当 false 用来判断。' } },
    { id: 'js-array-4', kpIds: ['js-array'], subject: 'cs', type: 'fill', difficulty: 2, estSeconds: 40, skillTag: '数组切片', source: '自建',
      stem: '`console.log([3, 1, 2].slice(1).join("-"))` 的输出是 ______。',
      answer: '1-2', accept: ['1-2', '"1-2"', "'1-2'"],
      analysis: { ans: '1-2', why: 'slice(1) 从下标 1 切到末尾，得到 [1, 2]；join 用横线把元素连成字符串。', steps: '1. 下标 1 开始切，得到 [1, 2]。\n2. join("-") 把元素用横线连接。\n3. 得到字符串 1-2。', pit: 'slice 不修改原数组，splice 才修改；slice 的终点参数是左闭右开。' } },

    /* ---------- js-object ---------- */
    { id: 'js-object-1', kpIds: ['js-object'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: '对象引用', source: '自建',
      stem: '执行下面的代码，输出是什么？\n```javascript\nvar o = { a: 1 }\nvar p = o\np.a = 2\nconsole.log(o.a)\n```',
      options: ['1', '2', 'undefined', '报错'],
      answer: 'B',
      analysis: { ans: '2', why: 'o 里存的是对象的引用，p = o 让两个变量指向同一个对象，改 p 的属性就是改那个对象。', steps: '1. o 指向对象 { a: 1 }。\n2. p = o 复制的是引用，不复制内容。\n3. p.a = 2 改的是同一个对象。\n4. o.a 也变成 2。', pit: '想互不影响要浅拷贝 `Object.assign({}, o)` 或 `{ ...o }`，嵌套对象还得深拷贝。' } },
    { id: 'js-object-2', kpIds: ['js-object'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: 'JSON 序列化', source: '自建',
      stem: '`JSON.stringify({ a: 1, b: 2 })` 的结果是？',
      options: ['{"a":1,"b":2}', '{a:1,b:2}', '[1,2]', '"o"'],
      answer: 'A',
      analysis: { ans: '{"a":1,"b":2}', why: 'JSON.stringify 把对象转成 JSON 文本：键必须用双引号，值按类型输出，键值之间用冒号。', steps: '1. 遍历可枚举属性。\n2. 键加双引号，值按 JSON 规则写。\n3. 用逗号连接，外层加大括号。', pit: '返回的是字符串，不是对象；把 {a:1,b:2} 这种写法当 JSON 是错的，JSON 的键必须带双引号。' } },
    { id: 'js-object-3', kpIds: ['js-object'], subject: 'cs', type: 'fill', difficulty: 1, estSeconds: 35, skillTag: 'JSON 解析', source: '自建',
      stem: '`console.log(JSON.parse("[1, 2, 3]").length)` 的输出是 ______。',
      answer: '3', accept: ['3'],
      analysis: { ans: '3', why: 'JSON.parse 把 JSON 文本还原成数组 [1, 2, 3]，它的长度是 3。', steps: '1. parse 解析方括号，得到数组。\n2. 数组有三个元素。\n3. length 为 3。', pit: 'JSON.parse 的输入必须是合法 JSON 文本，单引号、尾逗号、函数都会让它抛 SyntaxError。' } },
    { id: 'js-object-4', kpIds: ['js-object'], subject: 'cs', type: 'fill', difficulty: 1, estSeconds: 35, skillTag: '对象遍历', source: '自建',
      stem: '`console.log(Object.keys({ a: 1, b: 2 }).join(","))` 的输出是 ______。',
      answer: 'a,b', accept: ['a,b', '"a,b"', "'a,b'"],
      analysis: { ans: 'a,b', why: 'Object.keys 返回所有可枚举属性名组成的数组，join 再把它拼成字符串。', steps: '1. Object.keys 得到 ["a", "b"]。\n2. join(",") 用逗号连接。\n3. 得到字符串 a,b。', pit: 'Object.keys 只返回自身可枚举属性，原型链上的属性不会出现。' } },

    /* ---------- js-dom ---------- */
    { id: 'js-dom-1', kpIds: ['js-dom'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: 'DOM 查找', source: '自建',
      stem: '`document.querySelectorAll(".item")` 返回的是什么？',
      options: ['第一个匹配的元素', '所有匹配元素组成的 NodeList', '真正的 Array 实例', 'HTMLCollection'],
      answer: 'B',
      analysis: { ans: '所有匹配元素组成的 NodeList', why: 'querySelectorAll 返回静态 NodeList，包含全部匹配元素，没匹配到时长度为 0。', steps: '1. 按 CSS 选择器匹配所有元素。\n2. 结果放进 NodeList 返回。\n3. 它可以用 forEach 遍历，但不是 Array，没有 map、filter。', pit: '想用数组方法要先 `Array.from(list)` 或展开成数组；querySelector 才只返回第一个。' } },
    { id: 'js-dom-2', kpIds: ['js-dom'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: 'DOM 修改', source: '自建',
      stem: '执行 `el.textContent = "<b>hi</b>"`，页面会显示什么？',
      options: ['加粗的 hi', '原样显示 <b>hi</b> 这七个字符', '什么都不显示', '浏览器报错'],
      answer: 'B',
      analysis: { ans: '原样显示 <b>hi</b> 这七个字符', why: 'textContent 赋的是纯文本，尖括号会被当普通字符转义显示，不会解析成标签。', steps: '1. textContent 写入文本节点。\n2. 浏览器把 < 和 > 当普通字符渲染。\n3. 页面上看到的是完整标签文本。\n4. 想真的加粗要用 innerHTML 或 createElement。', pit: 'textContent 更安全；innerHTML 会解析标签，拼用户输入就会造成 XSS。' } },
    { id: 'js-dom-3', kpIds: ['js-dom'], subject: 'cs', type: 'fill', difficulty: 1, estSeconds: 35, skillTag: 'DOM 查找', source: '自建',
      stem: '按 id 获取元素，最直接的方法是 `document.______("app")`。',
      answer: 'getElementById', accept: ['getElementById', 'getElementById()'],
      analysis: { ans: 'getElementById', why: 'getElementById 直接按 id 查找，返回匹配元素或 null，是所有查找方式里最快的。', steps: '1. 传入 id 字符串，不带井号。\n2. 返回对应元素。\n3. 找不到返回 null，后续访问属性会报错。', pit: '参数不要写 "#app"，井号是 CSS 选择器的写法，用 querySelector 时才需要。' } },
    { id: 'js-dom-4', kpIds: ['js-dom'], subject: 'cs', type: 'fill', difficulty: 1, estSeconds: 35, skillTag: 'DOM 样式', source: '自建',
      stem: '给元素追加一个类名，写法是 `el.classList.______("active")`。',
      answer: 'add', accept: ['add', 'add()'],
      analysis: { ans: 'add', why: 'classList.add 在元素上追加类名，已存在时不会重复添加。', steps: '1. classList 是元素类名的集合。\n2. add 追加一个或多个类名。\n3. 对应地，remove 删除，toggle 切换，contains 判断。', pit: '直接写 `el.className = "active"` 会把原有类名全部覆盖掉。' } },

    /* ---------- js-event ---------- */
    { id: 'js-event-1', kpIds: ['js-event'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: '事件冒泡', source: '自建',
      stem: '结构为 `<div id="outer"><button id="inner">点</button></div>`，两者都绑了 click 监听，点击按钮时触发顺序是？',
      options: ['inner 先，outer 后', 'outer 先，inner 后', '只触发 inner', '只触发 outer'],
      answer: 'A',
      analysis: { ans: 'inner 先，outer 后', why: '默认是冒泡阶段：事件从最内层的目标元素开始，逐层向外传播到父元素、document。', steps: '1. 点击的目标是 button（inner）。\n2. 先执行 inner 的监听。\n3. 事件向上冒泡，再执行 outer 的监听。', pit: '如果 addEventListener 第三个参数传 true，就进入捕获阶段，顺序会反过来。' } },
    { id: 'js-event-2', kpIds: ['js-event'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: '事件委托', source: '自建',
      stem: '一个列表要支持点击每一项，还要能动态新增项，最合适的做法是？',
      options: ['给每个 li 各绑一次 click', '在父容器上绑一次，用 e.target 判断点到了谁', '只能绑在 document 上', '绑在每个 li 的文本节点上'],
      answer: 'B',
      analysis: { ans: '在父容器上绑一次，用 e.target 判断点到了谁', why: '这就是事件委托：利用冒泡，让父元素统一接管子元素的点击，新增的子元素自动生效。', steps: '1. 在 ul 上绑一次 click。\n2. 冒泡让子元素的点击传到 ul。\n3. 用 `e.target.closest("li")` 找到被点的列表项。\n4. 只绑一个监听，内存占用小。', pit: 'e.target 可能是 li 里的 span，不能直接假设它就是 li。' } },
    { id: 'js-event-3', kpIds: ['js-event'], subject: 'cs', type: 'fill', difficulty: 1, estSeconds: 35, skillTag: '阻止冒泡', source: '自建',
      stem: '阻止事件继续向上冒泡，调用 `e.______()`。',
      answer: 'stopPropagation', accept: ['stopPropagation', 'stopPropagation()'],
      analysis: { ans: 'stopPropagation', why: 'stopPropagation 阻止事件在捕获或冒泡阶段继续传播，父元素的监听不会再被触发。', steps: '1. 在子元素监听里拿到事件对象 e。\n2. 调用 stopPropagation。\n3. 事件到此为止，不再冒泡。', pit: '它不阻止链接跳转、表单提交这些默认行为，那要用 preventDefault。' } },
    { id: 'js-event-4', kpIds: ['js-event'], subject: 'cs', type: 'fill', difficulty: 1, estSeconds: 35, skillTag: '默认行为', source: '自建',
      stem: '阻止表单提交的默认行为，调用 `e.______()`。',
      answer: 'preventDefault', accept: ['preventDefault', 'preventDefault()'],
      analysis: { ans: 'preventDefault', why: 'preventDefault 取消事件的默认动作，表单不再提交、链接不再跳转，但事件仍会继续冒泡。', steps: '1. 在 submit 监听里拿到 e。\n2. 调用 preventDefault。\n3. 浏览器取消提交动作，交给 JS 处理。', pit: '把 preventDefault 和 stopPropagation 记混，是事件题最常见的失分点。' } },

    /* ---------- js-async ---------- */
    { id: 'js-async-1', kpIds: ['js-async'], subject: 'cs', type: 'single', difficulty: 3, estSeconds: 60, skillTag: '事件循环', source: '自建',
      stem: '执行下面的代码，输出顺序是什么？\n```javascript\nconsole.log("A")\nsetTimeout(function () { console.log("B") }, 0)\nPromise.resolve().then(function () { console.log("C") })\nconsole.log("D")\n```',
      options: ['A B C D', 'A D C B', 'A C D B', 'D A C B'],
      answer: 'B',
      analysis: { ans: 'A D C B', why: '同步代码先执行完，再清空微任务队列，最后才轮到宏任务队列里的定时器回调。', steps: '1. 同步输出 A、D。\n2. then 的回调是微任务，输出 C。\n3. setTimeout 回调是宏任务，最后输出 B。\n4. 顺序为 A D C B。', pit: 'setTimeout 写 0 只是尽快排队，不代表立刻执行，宏任务永远排在微任务后面。' } },
    { id: 'js-async-2', kpIds: ['js-async'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: 'Promise 链', source: '自建',
      stem: '执行下面的代码，输出是什么？\n```javascript\nPromise.resolve(1).then(function (x) { return x + 1 }).then(function (x) { console.log(x) })\n```',
      options: ['2', '1', '3', '报错'],
      answer: 'A',
      analysis: { ans: '2', why: '第一个 then 的返回值会变成新的 Promise 的完成值，第二个 then 收到 1 + 1 = 2。', steps: '1. Promise.resolve(1) 直接完成，值为 1。\n2. 第一个 then 返回 2。\n3. 第二个 then 的参数 x 是 2，输出 2。', pit: 'then 里没有 return 时，下一个 then 收到 undefined。' } },
    { id: 'js-async-3', kpIds: ['js-async'], subject: 'cs', type: 'fill', difficulty: 2, estSeconds: 40, skillTag: 'Promise 组合', source: '自建',
      stem: '要等多个 Promise 全部成功后再继续，使用 `Promise.______([p1, p2])`。',
      answer: 'all', accept: ['all', 'all()'],
      analysis: { ans: 'all', why: 'Promise.all 等全部完成，把结果按顺序放进数组；只要有一个失败，整体就立刻失败。', steps: '1. 传入 Promise 数组。\n2. 全部完成时返回结果数组。\n3. 任一失败则进入 catch。', pit: '有一个失败就整体失败；想让失败也不中断，用 allSettled。' } },
    { id: 'js-async-4', kpIds: ['js-async'], subject: 'cs', type: 'fill', difficulty: 1, estSeconds: 35, skillTag: 'async 与 await', source: '自建',
      stem: '在 async 函数内部等待 Promise 完成，要用的关键字是 ______。',
      answer: 'await', accept: ['await'],
      analysis: { ans: 'await', why: 'await 会暂停当前 async 函数的执行，等 Promise 完成后取出结果，写法像同步代码。', steps: '1. 函数声明为 async。\n2. `var data = await fetch(url)`。\n3. 等请求完成后再执行下一行。', pit: 'await 只能出现在 async 函数里；它等的是 Promise，普通值会被自动包成已完成的 Promise。' } },

    /* ---------- js-storage ---------- */
    { id: 'js-storage-1', kpIds: ['js-storage'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: '本地存储', source: '自建',
      stem: '执行 `localStorage.setItem("u", { a: 1 })` 后再取出，会得到什么？',
      options: ['原样的对象 { a: 1 }', '字符串 "[object Object]"', '抛异常，无法存储', '自动转成 JSON 文本'],
      answer: 'B',
      analysis: { ans: '字符串 "[object Object]"', why: 'localStorage 只能存字符串，存入非字符串时会先调用 toString，普通对象转出来就是 [object Object]。', steps: '1. setItem 收到对象参数。\n2. 内部按字符串处理，对象转成 "[object Object]"。\n3. getItem 取回的是一段无意义的字符串。\n4. 正确做法是先 JSON.stringify。', pit: 'localStorage 不会自动序列化对象，不 stringify 就等于把数据丢了。' } },
    { id: 'js-storage-2', kpIds: ['js-storage'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: 'Cookie', source: '自建',
      stem: '下面哪种数据会自动随每一次 HTTP 请求发送给服务器？',
      options: ['localStorage', 'sessionStorage', 'Cookie', 'IndexedDB'],
      answer: 'C',
      analysis: { ans: 'Cookie', why: 'Cookie 挂在同源请求的请求头里自动发送，这也是它能维持登录态的原因，同时也带来带宽与安全成本。', steps: '1. 浏览器发起同源请求。\n2. 自动把匹配的 Cookie 放进 Cookie 请求头。\n3. 服务器据此识别用户。\n4. 其余三种只存在本地，不会自动发送。', pit: '正因为会自动发送，Cookie 里不要放大量数据，容量也只有 4KB 左右。' } },
    { id: 'js-storage-3', kpIds: ['js-storage'], subject: 'cs', type: 'fill', difficulty: 1, estSeconds: 35, skillTag: 'JSON 序列化', source: '自建',
      stem: '把对象存进 localStorage 之前，一般先用 `JSON.______(obj)` 转成字符串。',
      answer: 'stringify', accept: ['stringify', 'stringify()'],
      analysis: { ans: 'stringify', why: 'JSON.stringify 把对象序列化成 JSON 文本，才能被 localStorage 原样保存。', steps: '1. `var s = JSON.stringify(obj)`。\n2. `localStorage.setItem("key", s)`。\n3. 读取时用 JSON.parse 还原。', pit: '序列化会丢掉函数和 undefined 属性，存之前要确认数据只有可序列化的值。' } },
    { id: 'js-storage-4', kpIds: ['js-storage'], subject: 'cs', type: 'fill', difficulty: 1, estSeconds: 35, skillTag: '本地存储', source: '自建',
      stem: '读取 localStorage 中某个键的值，写法是 `localStorage.______("key")`。',
      answer: 'getItem', accept: ['getItem', 'getItem()'],
      analysis: { ans: 'getItem', why: 'getItem 按键取值，键不存在时返回 null，不会抛异常。', steps: '1. 传入键名字符串。\n2. 存在则返回字符串值。\n3. 不存在返回 null。', pit: '返回的一定是字符串；存的是数字 1，取出来也是 "1"。' } },

    /* ---------- js-module ---------- */
    { id: 'js-module-1', kpIds: ['js-module'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: '模块语法', source: '自建',
      stem: 'ES Module 中导出和导入使用的关键字分别是？',
      options: ['export / import', 'module.exports / require', 'exports / include', 'public / using'],
      answer: 'A',
      analysis: { ans: 'export / import', why: 'ES Module 是浏览器原生模块规范，用 export 导出、import 导入；module.exports 和 require 是 Node 的 CommonJS 写法。', steps: '1. 导出：`export function add() {}`。\n2. 导入：`import { add } from "./math.js"`。\n3. 二者必须成对使用同一套规范。', pit: 'ES Module 的 import 只能在顶层写，不能放进 if 或函数里；动态导入要用 import()。' } },
    { id: 'js-module-2', kpIds: ['js-module'], subject: 'cs', type: 'single', difficulty: 2, estSeconds: 45, skillTag: '模块作用域', source: '自建',
      stem: '`<script type="module">` 与普通脚本相比，主要特点是什么？',
      options: ['默认严格模式，且拥有独立作用域，不污染全局', '和普通脚本完全一样', '只能使用 var 声明变量', '必须写在 body 的最后一行'],
      answer: 'A',
      analysis: { ans: '默认严格模式，且拥有独立作用域，不污染全局', why: '模块内的顶层变量只属于该模块，并且自动启用严格模式、延迟执行，还支持 import / export。', steps: '1. type="module" 告诉浏览器按模块解析。\n2. 顶层声明不再挂到 window 上。\n3. 自动进入严格模式，默认 defer 执行。', pit: '模块脚本需要经过 HTTP 服务访问，直接双击本地文件会被 CORS 拦下。' } },
    { id: 'js-module-3', kpIds: ['js-module'], subject: 'cs', type: 'fill', difficulty: 1, estSeconds: 35, skillTag: 'CommonJS', source: '自建',
      stem: 'CommonJS 中引入模块使用 `______("./math")`。',
      answer: 'require', accept: ['require', 'require()'],
      analysis: { ans: 'require', why: 'require 是 CommonJS 的同步加载函数，返回被引入模块的 module.exports。', steps: '1. `var math = require("./math")`。\n2. 执行目标文件，拿到它的导出对象。\n3. 通过 math.add 调用方法。', pit: 'require 是同步阻塞的，浏览器端不适用；浏览器要用 ES Module 或打包工具。' } },
    { id: 'js-module-4', kpIds: ['js-module'], subject: 'cs', type: 'fill', difficulty: 1, estSeconds: 35, skillTag: '模块导出', source: '自建',
      stem: 'ES Module 的默认导出写法是 `export ______ 函数名`。',
      answer: 'default', accept: ['default'],
      analysis: { ans: 'default', why: 'export default 导出一个默认值，一个模块只能有一个默认导出，导入时不需要大括号。', steps: '1. `export default function mul(a, b) { return a * b }`。\n2. 导入：`import mul from "./math.js"`。\n3. 名字可以自己起。', pit: '默认导出与命名导出的导入写法不同，后者必须加大括号且名字要一致。' } }
  ]));

  /* ======================= 讲义 ======================= */
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'js-syntax-L1', kpIds: ['js-syntax'], subject: 'cs', level: 1,
      title: 'JS 语法与数据类型：先看清值的真面目',
      estMinutes: 40,
      hookTitle: '为什么 `typeof null` 返回的是 "object"？',
      hookBody: '这不是你写错了，而是 JavaScript 诞生初期按内存标记判断类型留下的历史 bug，为了兼容旧网页一直没修。它提醒我们：JS 的类型规则里有正常规律，也有必须背下来的例外，考试就爱考这些例外。',
      idea: 'JavaScript 是**动态类型、弱类型**语言：声明变量不写类型，类型跟着值走，运算时还会自动做隐式转换。原始类型有 undefined、null、boolean、number、string、symbol、bigint 七种，除此之外都是对象。',
      diagramId: 'number-convert', diagramCaption: '同一个值换一种类型，运算结果可能完全不同',
      analogy: { title: '七个小盒子与一个大仓库', md: '原始类型像七个各自独立的小盒子，每个只装一种东西，你把盒子递给别人就是复制一份；对象像一个大仓库，你手里只有钥匙（引用），把钥匙配一把给别人，两个人进的是同一个仓库，谁动了东西另一个都看得见。' },
      points: [
        { title: '一、七种原始类型', md: 'undefined 表示未赋值，null 表示「故意为空」，boolean 只有 true 与 false，number 统一表示整数与小数，string 是文本，symbol 用作唯一标识，bigint 表示超大整数。' },
        { title: '二、typeof 的三个例外', md: '`typeof null` 返回 "object"；`typeof function () {}` 返回 "function"；对从未声明过的变量用 typeof 不报错，返回 "undefined"。判断 null 要用 `x === null`。' },
        { title: '三、== 与 === 的区别', md: '`==` 会先把两侧转成同一类型再比较，`===` 要求类型和值都相同。`null == undefined` 为 true，但 `null === undefined` 为 false。工程上一律用 `===`。' },
        { title: '四、隐式转换的两句话', md: '第一句：加号只要有一侧是字符串，就做拼接；第二句：减、乘、除、取余一律把两侧转成数字再算。记住这两句，绝大多数转换题都能推出来。' },
        { title: '五、let、const 与 var', md: 'var 是函数作用域、有变量提升；let 与 const 是块级作用域，在声明前访问会进入暂时性死区。const 只保证绑定不能重新赋值，对象内部属性仍然可以改。' },
        { title: '六、NaN 是 number 里的特殊值', md: '`NaN` 表示「不是一个有效数字」，但它自己的类型是 number。任何数与 NaN 运算都得 NaN，而且 `NaN === NaN` 为 false，判断要用 `Number.isNaN`。' },
        { title: '七、值类型与引用类型', md: '原始类型赋值复制的是值，改副本不影响原值；对象、数组赋值复制的是引用，两个变量指向同一块内存，通过任何一个修改，另一个都会看到变化。' }
      ],
      table: {
        headers: ['表达式', '结果', '原因'],
        rows: [
          ['typeof null', '"object"', '历史遗留 bug'],
          ['1 + "2"', '"12"', '加号遇字符串转拼接'],
          ['"12" - 1', '11', '减法强制转数字'],
          ['0.1 + 0.2', '0.30000000000000004', '二进制浮点误差'],
          ['NaN === NaN', 'false', '判断要用 Number.isNaN']
        ]
      },
      code: 'var s = "5"\nvar n = 5\nconsole.log(n + 1)        // 6\nconsole.log(s + 1)        // 51\nconsole.log(s - 1)        // 4\nconsole.log(typeof null)  // object\nconsole.log(0.1 + 0.2)    // 0.30000000000000004',
      warning: '`0.1 + 0.2` 不等于 `0.3`，因为小数在二进制里无法精确表示。比较小数不要写 `===`，先 `toFixed(2)` 或判断差值小于 1e-9。',
      tip: '做类型题时先给每个操作数标上类型，再套「加号看字符串、其他一律转数字」两句话，最后才动笔算。',
      quizIds: ['js-syntax-1', 'js-syntax-2', 'js-syntax-3', 'js-syntax-4'],
      example: {
        title: '逐个推断隐式转换的结果',
        steps: [
          { md: '先看 `"5" + 1`：加号一侧是字符串，做拼接，得到 "51"。' },
          { md: '再看 `"5" - 1`：减号强制转数字，5 − 1 得到 4。' },
          { md: '看 `true + 1`：布尔转数字 1，得到 2。' },
          { md: '看 `null + 1`：null 转数字 0，得到 1；但 `undefined + 1` 得到 NaN。' }
        ],
        takeaway: '转换规则是固定的，把每条表达式的类型标出来，结果就能推出来。'
      },
      example2: {
        title: '排查一个类型比较的 bug',
        steps: [
          { md: '需求是「输入框为空时提示」，代码写成 `if (input.value == 0)`。' },
          { md: '输入框取到的永远是字符串，空字符串 "" 与 0 用 == 比较时会被转成 0，条件意外成立。' },
          { md: '改成 `if (input.value === "")`，只比较字符串本身。' },
          { md: '同时补上 `input.value.trim() === ""`，避免全是空格也算空。' }
        ],
        takeaway: '凡是用户输入都是字符串，比较前先想清楚该用哪种类型。'
      },
      guided: [{ questionId: 'js-syntax-2', hint: '先算加号那一步：有字符串参与，结果是字符串还是数字？' }],
      solo: ['js-syntax-1', 'js-syntax-3'],
      challenge: ['js-syntax-4'],
      summary: {
        essence: 'JS 有七种原始类型，其余都是对象；加号遇字符串拼接，其他算术一律转数字；比较用 ===。',
        formulas: ['typeof x 判断类型（null 例外）', 'x === y 严格相等'],
        pitfalls: ['用 typeof 判断 null', '用 == 比较用户输入'],
        checklist: ['我能列出七种原始类型', '我知道 typeof 的三个例外', '我能预判常见隐式转换', '我分得清值类型与引用类型']
      },
      feynman: '请用「小盒子与仓库钥匙」的比喻，讲清楚为什么改了一个对象，另一个变量也会跟着变。'
    }),

    Z.makeLesson({
      id: 'js-array-L2', kpIds: ['js-array'], subject: 'cs', level: 2,
      title: 'JS 数组方法：会改的与不改的要分清',
      estMinutes: 40,
      hookTitle: '为什么 `[10, 2, 1].sort()` 得到的是 `[1, 10, 2]`？',
      hookBody: '因为 sort 不传比较函数时，会把每个元素转成字符串，再按字典序比较。"10" 的首字符是 1，比 "2" 小，于是 10 排到了 2 前面。这不是排序算法出错，而是默认规则就这么写的。',
      idea: '数组是**有序、可变**的列表，下标从 0 开始。一批方法会直接改原数组（push、pop、splice、sort），另一批会返回新数组（map、filter、slice、concat）。分不清这一点，就会在「原数组为什么被改了」上反复踩坑。',
      diagramId: 'array-index', diagramCaption: '下标是偏移量，不是「第几个」',
      analogy: { title: '一排带编号的储物柜', md: '数组像一排编号从 0 开始的储物柜。`a[0]` 是按编号开门，`length` 是柜子总数。map 像照着这排柜子重新开一排一模一样的，把每格里放的东西换一下；splice 则是直接在原来这排柜子上拆格、插格。' },
      points: [
        { title: '一、下标与 length', md: '`a[0]` 是第一个元素，`a[a.length - 1]` 是最后一个。访问越界不会报错，只会返回 undefined；给越界位置赋值会让数组中间出现空位。' },
        { title: '二、首尾增删四件套', md: '`push` 末尾追加并返回新长度，`pop` 末尾取出，`unshift` 头部插入，`shift` 头部取出。这四个都会直接修改原数组。' },
        { title: '三、map 与 filter 返回新数组', md: 'map 对每个元素调用函数，用返回值组成同样长度的新数组；filter 用返回值真假决定保留与否，长度可能变短。两者都不改原数组。' },
        { title: '四、reduce 把数组压成一个值', md: '`a.reduce(function (acc, x) { return acc + x }, 0)` 从初始值 0 开始，逐个把元素累进 acc。求和、计数、分组都靠它，第三个参数是初始值。' },
        { title: '五、sort 的字符串陷阱', md: '默认按字符串字典序排序，且原地修改。数值排序必须传 `function (x, y) { return x - y }`，返回负数表示 x 在前。' },
        { title: '六、slice 与 splice 不是一回事', md: 'slice(start, end) 切出一段新数组，左闭右开，不改原数组；splice(start, count, ...items) 在原数组上删除并插入，返回被删掉的元素数组。' },
        { title: '七、forEach 与 for...in 的误用', md: 'forEach 只为遍历，返回值永远是 undefined，不能拿来生成新数组；for...in 遍历的是键名，用在数组上会拿到字符串下标，还可能带上原型属性，数组应使用 for...of。' }
      ],
      table: {
        headers: ['方法', '是否改原数组', '返回值'],
        rows: [
          ['push / pop', '会改', '新长度 / 被取出的元素'],
          ['map / filter', '不改', '新数组'],
          ['reduce', '不改', '累积出的单个值'],
          ['slice', '不改', '切出的新数组'],
          ['splice', '会改', '被删除元素组成的数组'],
          ['sort', '会改', '原数组本身']
        ]
      },
      code: 'var a = [3, 1, 2]\na.sort()\nconsole.log(a)              // [1, 2, 3]\nvar b = a.map(function (x) { return x * 2 })\nconsole.log(b)              // [2, 4, 6]\nconsole.log(a.slice(1))     // [2, 3]\nconsole.log(a.indexOf(3))   // 2\nconsole.log(a)              // [1, 2, 3]',
      warning: '`sort` 和 `splice` 是原地修改，会改变原数组。如果原数组后面还要用，先 `var copy = a.slice()` 复制一份再操作。',
      tip: '看到「返回新数组」优先想 map、filter、slice；看到「原地改」想 push、splice、sort。做题先问一句：这行代码之后原数组变了吗？',
      quizIds: ['js-array-1', 'js-array-2', 'js-array-3', 'js-array-4'],
      example: {
        title: '用 map 与 filter 做成绩处理',
        steps: [
          { md: '成绩数组 `var scores = [58, 72, 90, 45]`。' },
          { md: '先筛选及格：`var pass = scores.filter(function (x) { return x >= 60 })`，得到 [72, 90]。' },
          { md: '再统一加 5 分：`var fixed = pass.map(function (x) { return x + 5 })`，得到 [77, 95]。' },
          { md: '原数组 scores 始终没有变，仍是四个元素。' }
        ],
        takeaway: '链式调用 filter 再 map，既清晰又不污染原数据。'
      },
      example2: {
        title: '把数值数组正确排序',
        steps: [
          { md: '错误写法：`[10, 2, 1].sort()` 得到 [1, 10, 2]，因为按字符串比较。' },
          { md: '正确写法：`[10, 2, 1].sort(function (x, y) { return x - y })`。' },
          { md: 'x − y 为负数时 x 排前面，所以升序；写成 y − x 就是降序。' },
          { md: '若不想改原数组，先 `slice()` 复制再排序。' }
        ],
        takeaway: '数值排序必须给比较函数，这是一条不能省的规则。'
      },
      guided: [{ questionId: 'js-array-2', hint: '想一想 sort 不传参数时，比较的是字符串还是数字。' }],
      solo: ['js-array-1', 'js-array-3'],
      challenge: ['js-array-4'],
      summary: {
        essence: '数组下标从 0 开始；map、filter、slice 返回新数组，push、splice、sort 原地改。',
        formulas: ['a.map(f) / a.filter(f) / a.reduce(f, init)', 'a.sort(function (x, y) { return x - y })'],
        pitfalls: ['sort 默认按字符串排序', '以为 map 改了原数组'],
        checklist: ['我能说出每个常用方法是否改原数组', '我会写数值排序的比较函数', '我能用 reduce 求和与计数', '我分得清 slice 与 splice']
      },
      feynman: '请解释为什么 `[10, 2, 1].sort()` 的结果不是 `[1, 2, 10]`，并给出正确写法。'
    }),

    Z.makeLesson({
      id: 'js-object-L2', kpIds: ['js-object'], subject: 'cs', level: 2,
      title: '对象与 JSON：键值对和它的字符串形态',
      estMinutes: 40,
      hookTitle: '为什么改了一个变量，另一个也跟着变？',
      hookBody: '因为对象赋值传的是引用，也就是内存地址，不是内容。`var p = o` 只是把同一把钥匙多配了一份，`p.a = 2` 改的是同一个仓库。想互不影响，必须先复制出一份新的。',
      idea: '对象是**无序的键值对集合**，键是字符串（或 symbol），值可以是任意类型。JSON 是对象的**文本表示**，用于传输和存储：`JSON.stringify` 把对象变成字符串，`JSON.parse` 把字符串还原成对象。',
      diagramId: 'hash-bucket', diagramCaption: '键经过哈希定位到桶，所以取值不用逐个遍历',
      analogy: { title: '贴了标签的仓库钥匙', md: '对象是仓库，属性是货架编号，值是货架上的东西。变量名只是钥匙，复制变量就是配钥匙，不是复制仓库。JSON 则像把仓库清单打印成一张纸：纸能邮寄、能存档，但纸上的东西不再是实物。' },
      points: [
        { title: '一、两种访问方式', md: '`o.name` 适合固定的属性名，`o["na" + "me"]` 适合动态拼接的键。键不存在时返回 undefined，不会报错；访问 null 的属性才会抛 TypeError。' },
        { title: '二、赋值传引用', md: '`var p = o` 之后 p 与 o 指向同一对象。修改属性、增删属性，两边都同步。要断开这层关系，用 `Object.assign({}, o)` 或展开语法做浅拷贝。' },
        { title: '三、解构取值', md: '`var { name, age = 18 } = user` 一次取出多个属性，还能给默认值。嵌套结构可以继续解构，但层级太深就该拆函数了。' },
        { title: '四、遍历的三个入口', md: '`Object.keys(o)` 取键数组，`Object.values(o)` 取值数组，`Object.entries(o)` 取键值对数组。它们都只返回自身可枚举属性，不含原型链上的。' },
        { title: '五、JSON 是字符串不是对象', md: '`JSON.stringify` 返回文本，键必须带双引号；`JSON.parse` 把文本还原成对象。两者互为逆操作，常用于网络传输和本地存储。' },
        { title: '六、序列化的边界', md: '函数、undefined、symbol 作为值会被丢掉；`JSON.stringify(undefined)` 直接返回 undefined。对象里有循环引用会抛 TypeError。' },
        { title: '七、深浅拷贝的选择', md: '展开语法和 Object.assign 都是浅拷贝，嵌套对象仍共享。层级深的结构用 `structuredClone(o)` 或 JSON 往返，后者会丢失函数。' }
      ],
      table: {
        headers: ['操作', '写法', '结果'],
        rows: [
          ['读属性', 'o.name / o["name"]', '值或 undefined'],
          ['判断键', '"name" in o', '布尔值'],
          ['取键数组', 'Object.keys(o)', '["name", ...]'],
          ['转文本', 'JSON.stringify(o)', 'JSON 字符串'],
          ['还原对象', 'JSON.parse(s)', '新对象'],
          ['浅拷贝', '{ ...o }', '新对象，嵌套仍共享']
        ]
      },
      code: 'var o = { a: 1, b: 2 }\no.c = 3\nconsole.log(Object.keys(o))         // ["a", "b", "c"]\nconsole.log("c" in o)               // true\nvar json = JSON.stringify(o)\nconsole.log(json)                   // {"a":1,"b":2,"c":3}\nconsole.log(JSON.parse(json).b)     // 2',
      warning: '`JSON.stringify` 会丢掉函数和值为 undefined 的属性，遇到循环引用直接抛 TypeError。需要完整复制对象时用 `structuredClone`。',
      tip: '拿到一个「对象」先判断它是真对象还是 JSON 字符串：能直接点属性的是对象，需要先 parse 的是字符串。',
      quizIds: ['js-object-1', 'js-object-2', 'js-object-3', 'js-object-4'],
      example: {
        title: '安全地复制并修改对象',
        steps: [
          { md: '原对象 `var user = { name: "小明", score: 80 }`。' },
          { md: '直接 `var copy = user` 是复制引用，改 copy 会影响 user。' },
          { md: '改成 `var copy = Object.assign({}, user)`，得到新对象。' },
          { md: '再 `copy.score = 90`，user.score 仍是 80。' }
        ],
        takeaway: '要改副本，先造副本；浅拷贝只解决第一层。'
      },
      example2: {
        title: '用 JSON 做本地配置的存取',
        steps: [
          { md: '配置对象 `var cfg = { theme: "dark", size: 14 }`。' },
          { md: '保存：`localStorage.setItem("cfg", JSON.stringify(cfg))`。' },
          { md: '读取：`var raw = localStorage.getItem("cfg")`，得到字符串或 null。' },
          { md: '还原：`var cfg2 = raw ? JSON.parse(raw) : {}`，并给默认值兜底。' }
        ],
        takeaway: '存之前 stringify，取之后 parse，还要处理 null 的情况。'
      },
      guided: [{ questionId: 'js-object-1', hint: 'p = o 复制的是引用还是内容？' }],
      solo: ['js-object-2', 'js-object-4'],
      challenge: ['js-object-3'],
      summary: {
        essence: '对象是键值对集合，赋值传引用；JSON 是对象的字符串形态，stringify 与 parse 互为逆操作。',
        formulas: ['Object.keys(o) / Object.values(o) / Object.entries(o)', 'JSON.stringify(o) / JSON.parse(s)'],
        pitfalls: ['以为赋值复制了对象', '用 JSON 深拷贝导致函数丢失'],
        checklist: ['我会用两种方式取属性', '我理解引用赋值与浅拷贝', '我会做 JSON 往返转换', '我知道序列化会丢什么']
      },
      feynman: '请解释 `var p = o; p.a = 2` 为什么会让 o.a 也变，并说明怎么避免。'
    }),

    Z.makeLesson({
      id: 'js-dom-L2', kpIds: ['js-dom'], subject: 'cs', level: 2,
      title: 'DOM：把页面当成一棵可以修改的树',
      estMinutes: 40,
      hookTitle: '浏览器看到的 HTML，其实不是一段文本',
      hookBody: '浏览器解析 HTML 后会生成 DOM 树：每个标签是一个节点，节点之间有父子兄弟关系。JS 操作的不是硬盘上的文件，而是这棵内存里的树；改树，页面就立刻重绘。',
      idea: 'DOM（文档对象模型）把页面抽象成**节点树**。查找用 `querySelector` / `getElementById`，修改用 `textContent`、`classList`、`style`、`setAttribute`，新增用 `createElement` 加 `appendChild`。',
      diagramId: 'dom-tree', diagramCaption: 'html 是根，head 与 body 是分支，标签是叶子节点',
      analogy: { title: '一棵可以修剪的家谱树', md: 'DOM 像一棵家谱树：html 是老祖宗，head 和 body 是两支，title、h1、p 是下面的子孙。想找谁，可以按名字叫（id），也可以按特征找（选择器）；想加人，就造一个新节点挂到某个枝上。' },
      points: [
        { title: '一、节点与元素的关系', md: '标签、文本、注释都是节点，但只有标签才是元素节点。`children` 只含元素子节点，`childNodes` 连文本换行都算，遍历时容易多数出一堆空白节点。' },
        { title: '二、两种查找方式', md: '`document.getElementById("app")` 按 id 找最快；`querySelector(".item")` 返回第一个匹配；`querySelectorAll` 返回静态 NodeList，支持完整 CSS 选择器。' },
        { title: '三、textContent 与 innerHTML', md: 'textContent 读写纯文本，尖括号会原样显示；innerHTML 读写 HTML 片段，会解析标签。显示用户输入必须用 textContent，否则就是 XSS 漏洞。' },
        { title: '四、改样式用 classList', md: '`classList.add`、`remove`、`toggle`、`contains` 增删类名，样式写在 CSS 里。直接改 `el.style.color` 属于行内样式，只适合动态计算的少数值。' },
        { title: '五、创建与插入节点', md: '`document.createElement("li")` 造节点，设置内容后用 `parent.appendChild(node)` 挂到末尾，或 `insertBefore(node, ref)` 插到某个节点前面。' },
        { title: '六、属性与 dataset', md: '`getAttribute` / `setAttribute` 操作任意属性；`el.dataset.userId` 读写 `data-user-id`。标准属性如 `id`、`src` 也可以直接点访问。' },
        { title: '七、别在循环里反复改 DOM', md: '每次改 DOM 都可能触发重排重绘。批量插入应先在内存里拼好，或用 DocumentFragment 一次性挂上；读布局属性与写样式尽量分开。' }
      ],
      table: {
        headers: ['需求', '写法', '注意点'],
        rows: [
          ['按 id 找', 'getElementById("app")', '参数不带井号'],
          ['按选择器找第一个', 'querySelector(".item")', '找不到返回 null'],
          ['找全部', 'querySelectorAll(".item")', 'NodeList，不是数组'],
          ['写纯文本', 'el.textContent = s', '尖括号原样显示'],
          ['加类名', 'el.classList.add("on")', '不会覆盖原类名'],
          ['新增子节点', 'parent.appendChild(el)', '节点先创建好']
        ]
      },
      code: 'var box = document.querySelector("#box")\nbox.textContent = "新内容"\nbox.classList.add("active")\nbox.style.color = "red"\nbox.setAttribute("data-id", "7")\nconsole.log(box.dataset.id)   // 7\nconsole.log(box.textContent)  // 新内容',
      warning: '`innerHTML` 会把字符串当 HTML 解析，把用户输入直接拼进去就等于给攻击者开了后门。显示纯文本一律用 `textContent`。',
      tip: '写后续逻辑前，先在控制台确认选择器真的选中了元素。返回 null 时再点属性，就会报 Cannot read properties of null。',
      quizIds: ['js-dom-1', 'js-dom-2', 'js-dom-3', 'js-dom-4'],
      example: {
        title: '往列表里安全地加一项',
        steps: [
          { md: '取容器 `var list = document.querySelector("#list")`。' },
          { md: '创建节点 `var li = document.createElement("li")`。' },
          { md: '用 `li.textContent = "新任务"` 写内容，避免 innerHTML。' },
          { md: '`list.appendChild(li)` 挂到末尾，页面立刻出现这一项。' }
        ],
        takeaway: '创建、赋值、挂载三步走，内容用 textContent 更安全。'
      },
      example2: {
        title: '一键切换夜间模式',
        steps: [
          { md: '给按钮和根节点各取一次引用。' },
          { md: '在按钮上绑定 click，调用 `document.body.classList.toggle("dark")`。' },
          { md: 'CSS 里提前写好 `.dark` 下的背景与文字颜色。' },
          { md: '再点一次 toggle 会自动移除类名，样式复原。' }
        ],
        takeaway: '样式交给 CSS，JS 只负责切换类名，维护成本最低。'
      },
      guided: [{ questionId: 'js-dom-1', hint: 'querySelectorAll 返回的是集合，还要看它是不是真正的数组。' }],
      solo: ['js-dom-2', 'js-dom-3'],
      challenge: ['js-dom-4'],
      summary: {
        essence: 'DOM 是页面解析出的节点树；查找用选择器，修改用 textContent、classList、style，新增用 createElement 加 appendChild。',
        formulas: ['document.querySelector(sel) / querySelectorAll(sel)', 'el.textContent / el.innerHTML'],
        pitfalls: ['把 NodeList 当数组用 map', '用 innerHTML 拼用户输入'],
        checklist: ['我能选出单个与多个元素', '我分得清 textContent 与 innerHTML', '我会用 classList 改样式', '我知道怎么创建并挂载节点']
      },
      feynman: '请解释 DOM 树是什么，以及为什么显示用户输入时不该用 innerHTML。'
    }),

    Z.makeLesson({
      id: 'js-event-L2', kpIds: ['js-event'], subject: 'cs', level: 2,
      title: '事件与委托：一次点击，谁先收到',
      estMinutes: 40,
      hookTitle: '为什么点的是按钮，外层的 div 也收到了 click？',
      hookBody: '因为事件默认冒泡：从最内层的目标元素开始，一层层向外传到父元素、body、document。理解冒泡，才能理解事件委托——把监听器挂在父容器上，替所有子元素统一处理。',
      idea: '事件是用户或浏览器触发的动作，处理它需要三样东西：**谁**（目标元素）、**什么事件**（类型）、**怎么处理**（回调函数）。事件流分捕获、目标、冒泡三个阶段，`addEventListener` 默认在冒泡阶段执行。',
      diagramId: 'dom-tree', diagramCaption: '事件沿着这棵树向上冒泡，委托就是把监听器挂在父节点上',
      analogy: { title: '公司里的层层上报', md: '点击按钮就像员工提交申请。冒泡是「逐级上报」：组长先处理，再交给部门经理，最后到总经理；捕获是「逐级下达」：总经理先知道，再传到组长。事件委托则是把受理窗口设在前台，所有申请都先到前台，由前台看是谁交的。' },
      points: [
        { title: '一、绑定监听的三种方式', md: '`el.addEventListener("click", fn)` 是标准写法，可以为同一事件绑多个函数；`el.onclick = fn` 会覆盖前一个；HTML 里的 onclick 属性最难维护，不推荐。' },
        { title: '二、捕获与冒泡的顺序', md: '完整流程是：捕获阶段从 document 往下到父元素，目标阶段到达被点元素，冒泡阶段再往上回到 document。`addEventListener` 第三个参数为 true 时在捕获阶段触发。' },
        { title: '三、事件对象的关键属性', md: '`e.target` 是真正触发事件的元素，`e.currentTarget` 是当前正在执行监听器的元素。事件委托里判断来源看 target，操作监听器所属元素看 currentTarget。' },
        { title: '四、事件委托的写法', md: '在父容器上绑一次 click，用 `var li = e.target.closest("li")` 向上找目标项，再用 `if (!li) return` 排除点击空白区域的情况。新增的子元素自动获得响应。' },
        { title: '五、stopPropagation 与 preventDefault', md: '前者阻止事件继续传播，父元素的监听不再触发；后者取消浏览器默认行为，例如表单提交、链接跳转。两者互不替代，别混用。' },
        { title: '六、解绑要同一个函数引用', md: '`removeEventListener` 必须传入绑定时那个函数本身。写匿名函数就再也找不到它，所以需要解绑时应先把函数存进变量。' },
        { title: '七、只执行一次的监听', md: '`addEventListener("click", fn, { once: true })` 触发一次后自动移除，适合「首次点击后才能播放」这类场景，省去手动解绑。' }
      ],
      table: {
        headers: ['方法或属性', '作用', '常见误用'],
        rows: [
          ['addEventListener', '绑定监听，可绑多个', '与 onclick 混用后被覆盖'],
          ['e.target', '真正触发的元素', '当成监听器所在元素'],
          ['e.currentTarget', '监听器所属元素', '在异步回调里已变成 null'],
          ['stopPropagation', '阻止继续传播', '以为能阻止表单提交'],
          ['preventDefault', '取消默认行为', '以为能阻止冒泡'],
          ['removeEventListener', '解绑', '传了新的匿名函数']
        ]
      },
      code: 'var list = document.querySelector("#list")\nlist.addEventListener("click", function (e) {\n  var li = e.target.closest("li")\n  if (!li) return\n  console.log(li.textContent)\n})',
      warning: '`e.target` 可能是 li 里面的 span 或文字节点，不能直接假设它就是列表项。用 `closest("li")` 往上找，再判断是否为空。',
      tip: '子元素数量多、还会动态增加时，优先考虑事件委托：一个监听器解决全部，内存占用和代码量都更小。',
      quizIds: ['js-event-1', 'js-event-2', 'js-event-3', 'js-event-4'],
      example: {
        title: '用事件委托处理待办列表',
        steps: [
          { md: 'HTML 结构是 `ul#list` 里面若干 `li`，每个 li 里还有一个删除按钮。' },
          { md: '只在 ul 上绑一次 click 监听。' },
          { md: '用 `e.target.closest("li")` 找到被点的列表项。' },
          { md: '如果点的是按钮，就 `li.remove()` 删除整项；否则打印内容。' }
        ],
        takeaway: '委托的关键是「父级监听 + 向上找目标」，新增的 li 不用再绑。'
      },
      example2: {
        title: '表单校验后阻止提交',
        steps: [
          { md: '给 form 绑定 submit 监听。' },
          { md: '先调用 `e.preventDefault()`，阻止页面刷新。' },
          { md: '读取输入值，判断是否为空或格式不对。' },
          { md: '校验通过后自己用 fetch 发送，失败时在页面上提示错误。' }
        ],
        takeaway: '拦截默认行为用 preventDefault，和阻止冒泡是两件事。'
      },
      guided: [{ questionId: 'js-event-1', hint: '默认监听在冒泡阶段执行，想想事件是从内往外还是从外往内。' }],
      solo: ['js-event-2', 'js-event-4'],
      challenge: ['js-event-3'],
      summary: {
        essence: '事件默认冒泡，从目标逐层向外；委托就是把监听器挂父级，用 e.target 判断来源。',
        formulas: ['el.addEventListener(type, fn, options)', 'e.stopPropagation() / e.preventDefault()'],
        pitfalls: ['把 target 当成 currentTarget', '混淆阻止冒泡与阻止默认行为'],
        checklist: ['我能说出捕获与冒泡顺序', '我会写事件委托', '我分得清两个阻止方法', '我知道怎么正确解绑']
      },
      feynman: '请用「层层上报」的比喻，解释事件冒泡和事件委托分别是怎么回事。'
    }),

    Z.makeLesson({
      id: 'js-async-L3', kpIds: ['js-async'], subject: 'cs', level: 3,
      title: '异步与事件循环：为什么输出顺序不是从上到下',
      estMinutes: 45,
      hookTitle: 'setTimeout 写 0 毫秒，为什么还是最后才执行？',
      hookBody: '因为定时器回调属于宏任务，必须等同步代码跑完、微任务队列清空之后，事件循环才会把它取出来执行。0 毫秒只表示「尽快排队」，不表示「立刻插队」。',
      idea: 'JavaScript 主线程是**单线程**的，靠事件循环调度任务：先执行同步代码，再清空微任务队列（Promise.then、queueMicrotask），最后取一个宏任务（setTimeout、事件回调）执行，如此循环。',
      diagramId: 'js-eventloop', diagramCaption: '同步代码先跑完，微任务清空，才轮到宏任务',
      analogy: { title: '餐厅点单与取号', md: '同步代码像在柜台前排队，必须一个个办完；异步任务像取号后在旁边等，前台叫号（事件循环）时你才能上去。Promise.then 是「马上就能办的加急号」，排在普通号之前；setTimeout 是普通号，得等加急号都叫完。' },
      points: [
        { title: '一、单线程不等于不能并发', md: 'JS 只有一个主线程执行代码，但定时器、网络请求由浏览器另开线程处理。耗时操作完成后把回调放进队列，主线程空了再取出来执行。' },
        { title: '二、同步代码优先', md: '任何回调都要等当前这段同步代码全部执行完。所以 `console.log("A")` 写在 setTimeout 后面，也仍然先输出 A。' },
        { title: '三、微任务与宏任务', md: '微任务包括 Promise.then、catch、finally、queueMicrotask；宏任务包括 setTimeout、setInterval、事件回调、I/O。每执行完一个宏任务，都会先把微任务队列清空。' },
        { title: '四、Promise 的三种状态', md: 'pending 进行中、fulfilled 已完成、rejected 已失败。状态一旦改变就固定，不能再变；then 注册的回调在状态确定后进入微任务队列。' },
        { title: '五、then 链与错误处理', md: 'then 返回一个新的 Promise，值会往下传；中途抛错进入最近的 catch。`finally` 无论成功失败都执行，常用于关闭 loading。' },
        { title: '六、async 与 await', md: 'async 函数总是返回 Promise；await 等待 Promise 完成并取出结果，让异步代码读起来像同步。await 之后的代码相当于写在 then 里，属于微任务。' },
        { title: '七、并发组合器', md: '`Promise.all` 全部成功才成功，任一失败立即失败；`allSettled` 等全部结束并给出每项状态；`race` 取最先结束的那个；`any` 取第一个成功的。' }
      ],
      table: {
        headers: ['任务类型', '执行时机', '典型例子'],
        rows: [
          ['同步代码', '立即执行', 'console.log、赋值、循环'],
          ['微任务', '当前宏任务结束后、渲染前', 'Promise.then、queueMicrotask'],
          ['宏任务', '下一轮事件循环', 'setTimeout、click 回调'],
          ['渲染', '微任务清空后', '浏览器重排重绘']
        ]
      },
      code: 'console.log("1")\nsetTimeout(function () { console.log("2") }, 0)\nPromise.resolve().then(function () { console.log("3") })\nconsole.log("4")\n// 输出顺序：1 4 3 2',
      warning: '`await` 只能写在 async 函数内部（顶层 await 需要模块环境）。await 后面的代码不是同步执行，而是被放进微任务，写顺序题时不要漏掉。',
      tip: '判断输出顺序的固定套路：先划掉所有回调，按顺序读完同步代码；再把微任务排队；最后排宏任务。',
      quizIds: ['js-async-1', 'js-async-2', 'js-async-3', 'js-async-4'],
      example: {
        title: '按顺序推断一段代码的输出',
        steps: [
          { md: '代码依次是：输出 A、setTimeout 输出 B、Promise.then 输出 C、输出 D。' },
          { md: '同步阶段执行 A 与 D，得到 A D。' },
          { md: '主线程空出后清空微任务，执行 then 的回调，输出 C。' },
          { md: '最后取宏任务，执行定时器回调，输出 B，总顺序 A D C B。' }
        ],
        takeaway: '同步 → 微任务 → 宏任务，三段式排队，一步都别跳。'
      },
      example2: {
        title: '用 async 改写回调嵌套',
        steps: [
          { md: '原来：`fetch(url).then(function (r) { return r.json() }).then(function (d) { console.log(d) })`。' },
          { md: '改成 async 函数，先 `var r = await fetch(url)`。' },
          { md: '再 `var data = await r.json()`，两行代码读出数据。' },
          { md: '外层用 try / catch 捕获网络或解析错误。' }
        ],
        takeaway: 'async / await 只是 Promise 的语法糖，底层仍然是微任务调度。'
      },
      guided: [{ questionId: 'js-async-1', hint: '先把同步代码挑出来读完，再想 then 与 setTimeout 谁先排队。' }],
      solo: ['js-async-2', 'js-async-4'],
      challenge: ['js-async-3'],
      summary: {
        essence: '单线程靠事件循环调度：同步先执行，微任务紧随其后，宏任务下一轮；async / await 是 Promise 的语法糖。',
        formulas: ['Promise.resolve().then(fn) 进入微任务', 'Promise.all(list) / allSettled(list)'],
        pitfalls: ['以为 setTimeout 0 会立刻执行', 'then 里忘记 return 导致值断链'],
        checklist: ['我能排出同步、微任务、宏任务的顺序', '我理解 Promise 三种状态', '我会用 async / await 写请求', '我分得清四种组合器']
      },
      feynman: '请解释 setTimeout 写 0 为什么不是立刻执行，并画出一次完整的事件循环顺序。'
    }),

    Z.makeLesson({
      id: 'js-storage-L3', kpIds: ['js-storage'], subject: 'cs', level: 3,
      title: '本地存储与 Cookie：数据存在浏览器哪一格',
      estMinutes: 45,
      hookTitle: '刷新页面数据就没了，到底该存哪里？',
      hookBody: 'localStorage 关掉浏览器还在，sessionStorage 关掉标签页就清空，Cookie 会跟着每次请求发给服务器。选错存储，轻则数据丢失，重则把登录凭证暴露在网络上。',
      idea: '浏览器提供多种本地存储：**localStorage** 永久保存、容量约 5MB；**sessionStorage** 只在当前标签页有效；**Cookie** 约 4KB 且随请求自动发送；**IndexedDB** 适合大量结构化数据。它们都受同源策略限制。',
      diagramId: 'cookie-token', diagramCaption: 'Cookie 在浏览器，Session 在服务器，Token 自带签名',
      analogy: { title: '三种不同的柜子', md: 'localStorage 像家里的保险箱，关灯出门东西还在；sessionStorage 像商场临时储物柜，离场就清空；Cookie 像随身行李，每次出门都要带着给安检看，所以只能装很小、也不怕被看的东西。' },
      points: [
        { title: '一、localStorage 的基本 API', md: '`setItem(k, v)` 写入，`getItem(k)` 读取，`removeItem(k)` 删除，`clear()` 清空。键和值都按字符串处理，读取不存在的键返回 null。' },
        { title: '二、只能存字符串', md: '直接存对象会先被转成 "[object Object]"。正确做法是存之前 `JSON.stringify`，取之后 `JSON.parse`，并对 null 做兜底判断。' },
        { title: '三、sessionStorage 的生命周期', md: '同一个 API，但数据只在当前标签页会话内有效：刷新还在，关闭标签页就清除。适合作表单草稿、一次性的流程状态。' },
        { title: '四、Cookie 的四个特点', md: '容量只有 4KB 左右；会随同源请求自动放进请求头；可以设置过期时间；每个域名下的数量也有限制。它天生适合保存会话标识，不适合存业务数据。' },
        { title: '五、三个安全属性', md: '`HttpOnly` 让 JS 读不到，防 XSS 窃取；`Secure` 只在 HTTPS 下发送；`SameSite` 限制跨站携带，缓解 CSRF。登录凭证优先放 HttpOnly Cookie。' },
        { title: '六、同源策略决定可见范围', md: '协议、域名、端口三者相同才算同源。不同源的页面读不到彼此的 localStorage，Cookie 还受 domain 与 path 进一步限制。' },
        { title: '七、大数据用 IndexedDB', md: 'IndexedDB 是异步的、容量大、支持索引与事务，适合离线缓存大量记录。缺点是 API 复杂，通常配合封装库使用。' }
      ],
      table: {
        headers: ['存储方式', '容量与生命周期', '典型用途'],
        rows: [
          ['localStorage', '约 5MB，永久', '主题、偏好设置'],
          ['sessionStorage', '约 5MB，标签页关闭即清', '表单草稿、一次性状态'],
          ['Cookie', '约 4KB，可设过期时间', '会话标识、登录态'],
          ['IndexedDB', '容量大，异步持久化', '离线数据、大量记录']
        ]
      },
      code: 'localStorage.setItem("name", "小明")\nconsole.log(localStorage.getItem("name"))   // 小明\nvar user = { id: 1, name: "小明" }\nlocalStorage.setItem("user", JSON.stringify(user))\nconsole.log(JSON.parse(localStorage.getItem("user")).id)  // 1\nlocalStorage.removeItem("name")\nconsole.log(localStorage.getItem("name"))   // null',
      warning: 'localStorage 是同步 API，大量读写会阻塞主线程；它还能被同源的任意脚本读取，一旦发生 XSS，里面的 token 就会被直接拿走。敏感凭证优先放 HttpOnly Cookie。',
      tip: '写一个 setStore / getStore 封装，内部统一做 JSON 序列化与默认值兜底，避免每处都手写一遍还漏掉异常处理。',
      quizIds: ['js-storage-1', 'js-storage-2', 'js-storage-3', 'js-storage-4'],
      example: {
        title: '保存并恢复用户偏好',
        steps: [
          { md: '偏好对象 `var pref = { theme: "dark", size: 14 }`。' },
          { md: '写入：`localStorage.setItem("pref", JSON.stringify(pref))`。' },
          { md: '读取：`var raw = localStorage.getItem("pref")`。' },
          { md: '还原：`var p = raw ? JSON.parse(raw) : { theme: "light", size: 14 }`，再应用到页面。' }
        ],
        takeaway: '序列化、读取、兜底默认值，三步缺一不可。'
      },
      example2: {
        title: '选择正确的存储位置',
        steps: [
          { md: '登录凭证：放 HttpOnly + Secure 的 Cookie，JS 拿不到，降低 XSS 风险。' },
          { md: '主题与字号：放 localStorage，永久保存且不影响请求体积。' },
          { md: '多步表单的临时草稿：放 sessionStorage，关掉标签页自动清理。' },
          { md: '离线缓存的几千条商品：放 IndexedDB，异步读写不卡界面。' }
        ],
        takeaway: '先问「要活多久、给谁看、有多大」，再决定放哪个柜子。'
      },
      guided: [{ questionId: 'js-storage-1', hint: 'localStorage 对值做了什么类型的处理？对象调用 toString 会得到什么？' }],
      solo: ['js-storage-2', 'js-storage-3'],
      challenge: ['js-storage-4'],
      summary: {
        essence: 'localStorage 永久、sessionStorage 随标签页、Cookie 随请求发送；三者都只适合存字符串，敏感数据要慎放。',
        formulas: ['localStorage.setItem(k, v) / getItem(k)', 'JSON.stringify(obj) / JSON.parse(s)'],
        pitfalls: ['直接存对象得到 [object Object]', '把 token 明文放 localStorage'],
        checklist: ['我能按生命周期选存储', '我会做 JSON 序列化存取', '我理解 Cookie 为什么会自动发送', '我知道三个 Cookie 安全属性']
      },
      feynman: '请比较 localStorage、sessionStorage 与 Cookie，并说明登录凭证为什么更适合放 HttpOnly Cookie。'
    }),

    Z.makeLesson({
      id: 'js-module-L3', kpIds: ['js-module'], subject: 'cs', level: 3,
      title: '模块化：把代码拆成可以拼装的积木',
      estMinutes: 45,
      hookTitle: '为什么 script 标签越加越多，变量还会互相覆盖？',
      hookBody: '因为传统 script 共享同一个全局作用域，后加载的 var 会覆盖前面的同名变量。模块把每个文件变成独立作用域，只导出愿意分享的部分，从此各管各的。',
      idea: '模块化解决三个问题：**作用域隔离**、**依赖声明**、**按需加载**。浏览器原生用 ES Module（export / import），Node 传统上用 CommonJS（module.exports / require），工程里再由打包工具统一处理。',
      diagramId: 'function-scope', diagramCaption: '模块内部的东西默认私有，只有导出的才对外可见',
      analogy: { title: '带门禁的独立工作室', md: '每个模块像一间独立工作室：里面的工具默认只有本室能用，想在门外用就必须挂到「共享架」上（export）。别人要用，得先按门牌号登记借入（import）。全局脚本则像所有人共用一个大厅，谁都能改桌上的东西。' },
      points: [
        { title: '一、全局污染从哪来', md: '多个 script 共享 window，`var` 声明会挂到全局，函数名重复就后者覆盖前者。模块的顶层声明只属于模块自身，不会污染 window。' },
        { title: '二、命名导出与默认导出', md: '`export function add` 是命名导出，导入时必须用大括号且名字一致；`export default` 一个模块只能有一个，导入时名字可以自取并且不加括号。' },
        { title: '三、import 会被提升', md: 'import 语句会被提升到模块顶部先执行，所以依赖一定在模块代码运行前就绪。它只能写在顶层，不能塞进 if 或函数里；动态加载用 `import()`。' },
        { title: '四、CommonJS 的写法', md: '`module.exports = { add }` 导出，`var m = require("./math")` 导入。require 是同步加载，运行时才解析，适合 Node，不适合浏览器直接使用。' },
        { title: '五、type="module" 的三个变化', md: '自动严格模式；顶层作用域独立；默认 defer，等 HTML 解析完再执行。此外模块脚本受 CORS 限制，本地双击打开文件可能直接被拦。' },
        { title: '六、打包工具与 tree-shaking', md: 'Vite、webpack 把多个模块合并、处理路径与兼容性；tree-shaking 依赖 ES Module 的静态结构，摇掉没有被引用的导出，减小体积。' },
        { title: '七、路径与循环依赖', md: '相对路径必须写 `./` 或 `../`，省略会被当成品包名。模块之间互相引用会形成循环依赖，容易拿到未初始化的值，设计时应把公共部分抽到第三个模块。' }
      ],
      table: {
        headers: ['对比项', 'ES Module', 'CommonJS'],
        rows: [
          ['导出', 'export / export default', 'module.exports'],
          ['导入', 'import', 'require'],
          ['加载时机', '静态、编译期确定', '运行时同步加载'],
          ['使用环境', '浏览器 / 现代构建工具', 'Node 传统项目'],
          ['tree-shaking', '支持', '不支持']
        ]
      },
      code: '// math.js\nexport function add(a, b) { return a + b }\nexport default function mul(a, b) { return a * b }\n\n// main.js\nimport mul, { add } from "./math.js"\nconsole.log(add(1, 2))   // 3\nconsole.log(mul(2, 3))   // 6',
      warning: 'ES Module 的 import 会被提升到顶部执行，导入的是「活绑定」而不是快照。不要在 import 之前使用它，还指望按书写顺序赋值生效。',
      tip: '一个文件只做一件事，对外只暴露必要的接口。导出越少，改动时越不容易牵一发而动全身。',
      quizIds: ['js-module-1', 'js-module-2', 'js-module-3', 'js-module-4'],
      example: {
        title: '把工具函数拆成模块',
        steps: [
          { md: '新建 `utils.js`，写 `export function formatDate(d) { return d.toISOString().slice(0, 10) }`。' },
          { md: '在主文件写 `import { formatDate } from "./utils.js"`。' },
          { md: '调用 `formatDate(new Date())`，得到形如 2026-10-25 的字符串。' },
          { md: 'HTML 中用 `<script type="module" src="main.js"></script>` 引入入口。' }
        ],
        takeaway: '命名导出配大括号导入，路径要带 ./。'
      },
      example2: {
        title: '默认导出与命名导出混用',
        steps: [
          { md: '`export default function mul(a, b)` 是默认导出，一个文件只能有一个。' },
          { md: '同时 `export function add(a, b)` 是命名导出，可以有多个。' },
          { md: '导入写 `import mul, { add } from "./math.js"`，默认导出在前、大括号在后。' },
          { md: '调用 add(1, 2) 得 3，mul(2, 3) 得 6。' }
        ],
        takeaway: '默认导出不带大括号，命名导出必须带，位置不能互换。'
      },
      guided: [{ questionId: 'js-module-1', hint: '先分清浏览器原生模块和 Node 的 CommonJS 各用什么关键字。' }],
      solo: ['js-module-2', 'js-module-3'],
      challenge: ['js-module-4'],
      summary: {
        essence: '模块化用独立作用域隔离代码，用 export / import 声明依赖；ES Module 静态可分析，CommonJS 运行时同步加载。',
        formulas: ['export function f() {} / export default f', 'import f, { g } from "./m.js"'],
        pitfalls: ['命名导入漏写大括号', '相对路径漏掉 ./'],
        checklist: ['我能说出模块解决的三个问题', '我会写两种导出与对应导入', '我知道 type="module" 的变化', '我理解打包与 tree-shaking 的作用']
      },
      feynman: '请解释模块为什么能解决全局变量污染，并对比 ES Module 与 CommonJS 的写法差异。'
    })
  );
})(window.ZSB = window.ZSB || {});
