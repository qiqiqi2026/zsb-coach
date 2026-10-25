/* 爬虫与数据模块包：8 个考点 + 8 份完整讲义 + 32 道题 */
(function (Z) {
  Z.addKps([
    { id: 'spy-basic', subject: 'cs', chapter: '爬虫与数据', title: '爬虫原理与 robots 协议', level: 1, examWeight: 0.03, prerequisites: [], examCount: 4, examPoints: 12, outcome: '能说清爬虫的四步流程，会读 robots.txt 并判断某路径是否允许抓取', note: '技术之前先讲边界：只抓公开、允许的数据' },
    { id: 'spy-requests', subject: 'cs', chapter: '爬虫与数据', title: 'requests 与响应处理', level: 2, examWeight: 0.04, prerequisites: ['spy-basic'], examCount: 5, examPoints: 14, outcome: '能用 requests 发起 GET 请求，正确读取状态码、文本与 JSON，并处理超时', note: '先看状态码，再看内容，排错顺序不要反' },
    { id: 'spy-html', subject: 'cs', chapter: '爬虫与数据', title: 'BeautifulSoup 解析 HTML', level: 2, examWeight: 0.04, prerequisites: ['spy-requests'], examCount: 5, examPoints: 14, outcome: '能把 HTML 字符串解析成树，用 find / find_all 取出标签与文本', note: '解析器决定树的形态，html.parser 是标准库自带' },
    { id: 'spy-select', subject: 'cs', chapter: '爬虫与数据', title: 'CSS / XPath 选择器', level: 3, examWeight: 0.03, prerequisites: ['spy-html'], examCount: 4, examPoints: 12, outcome: '能写常用 CSS 选择器与 XPath，稳定定位列表与字段', note: '别用绝对路径，页面一改就全部失效' },
    { id: 'spy-dynamic', subject: 'cs', chapter: '爬虫与数据', title: '动态页面与接口抓包', level: 3, examWeight: 0.03, prerequisites: ['spy-select'], examCount: 4, examPoints: 12, outcome: '能在 Network 面板找到异步接口，判断能否直接请求公开 JSON 数据', note: '能拿 JSON 就别解析 HTML' },
    { id: 'spy-anti', subject: 'cs', chapter: '爬虫与数据', title: '反爬、请求头、代理与限速', level: 3, examWeight: 0.04, prerequisites: ['spy-requests'], examCount: 5, examPoints: 14, outcome: '能识别常见反爬信号，用请求头、延迟与失败退避做到礼貌抓取', note: '代理不是隐身衣，绕限制可能违规' },
    { id: 'spy-store', subject: 'cs', chapter: '爬虫与数据', title: '数据清洗与保存（CSV / JSON / 数据库）', level: 2, examWeight: 0.04, prerequisites: ['spy-html'], examCount: 5, examPoints: 14, outcome: '能清洗字段并写入 CSV、JSON 或 SQLite，做到编码正确、可增量、不重复', note: '先洗十条，再跑一万条' },
    { id: 'spy-ethics', subject: 'cs', chapter: '爬虫与数据', title: '合规、频率与数据伦理', level: 1, examWeight: 0.03, prerequisites: ['spy-basic'], examCount: 4, examPoints: 10, outcome: '能判断一次抓取在授权、隐私、频率三方面是否越界，并给出合规替代方案', note: '只抓一点点也不是理由' }
  ]);

  Z.QUESTIONS.push.apply(Z.QUESTIONS, Z.makeQs([
    /* ---------- spy-basic ---------- */
    { id: 'spy-basic-1', kpIds: ['spy-basic'], subject: 'cs', type: 'single',
      stem: '网站根目录下的 robots.txt 的主要作用是什么？',
      options: ['对网页内容加密，防止被查看', '告诉爬虫哪些路径允许或禁止抓取', '自动压缩图片和脚本，加快加载', '保存用户的登录状态与购物车'],
      answer: 'B',
      analysis: { ans: 'B', why: 'robots.txt 是网站与爬虫之间的约定，用 User-agent、Allow、Disallow 等规则声明可抓范围。', steps: '1. 爬虫先请求站点根目录的 /robots.txt。\n2. 找到与自己 User-agent 匹配的规则段。\n3. 按 Disallow 与 Allow 判断目标路径是否可抓，并继续遵守网站条款。', pit: 'robots.txt 不是法律文件，也不等于授权；允许抓取不代表可以随意使用数据，版权与隐私仍然约束你。' }, difficulty: 1, estSeconds: 45, skillTag: '爬虫-robots', source: '自建' },
    { id: 'spy-basic-2', kpIds: ['spy-basic'], subject: 'cs', type: 'single',
      stem: '一个爬虫处理数据的典型顺序是？',
      options: ['保存 → 解析 → 请求 → 提取', '请求页面 → 解析页面 → 提取字段 → 保存数据', '解析 → 保存 → 请求 → 提取', '提取 → 请求 → 保存 → 解析'],
      answer: 'B',
      analysis: { ans: 'B', why: '爬虫本质是一条流水线：先拿到响应，再把 HTML 变成可查询的结构，接着提取目标字段，最后落盘。', steps: '1. 用 requests 请求目标 URL，拿到响应。\n2. 用 BeautifulSoup 解析成 DOM 树。\n3. 用选择器提取标题、价格等字段。\n4. 清洗后写入 CSV、JSON 或数据库。', pit: '不要跳过「解析」直接对整段 HTML 做字符串替换，结构一变就会出错。' }, difficulty: 1, estSeconds: 45, skillTag: '爬虫-流程', source: '自建' },
    { id: 'spy-basic-3', kpIds: ['spy-basic'], subject: 'cs', type: 'fill',
      stem: '访问网站前，爬虫应优先查看根目录下的 ______ 文件，确认哪些路径不被允许抓取。',
      answer: 'robots.txt', accept: ['robots.txt', 'robots'],
      analysis: { ans: 'robots.txt', why: '该文件位于站点根目录，用纯文本规则声明各类爬虫的可抓范围。', steps: '1. 请求 https://站点域名/robots.txt。\n2. 读取 User-agent 与 Disallow 规则。\n3. 只抓规则允许的路径，并控制频率。', pit: '规则里的 Disallow: / 表示整站禁止；写程序前先读，不要抓完才补看。' }, difficulty: 1, estSeconds: 40, skillTag: '爬虫-robots', source: '自建' },
    { id: 'spy-basic-4', kpIds: ['spy-basic'], subject: 'cs', type: 'fill',
      stem: 'HTTP 状态码 ______ 表示请求成功，页面内容正常返回。',
      answer: '200', accept: ['200'],
      analysis: { ans: '200', why: '2xx 表示成功，其中 200 是最常见的「请求成功并有响应体」。', steps: '1. 发出请求。\n2. 服务器返回状态码。\n3. 只有 200 左右才继续解析内容。', pit: '200 只说明这次请求成功，不代表内容就是你想要的；要防止被重定向到登录页或提示页。' }, difficulty: 1, estSeconds: 40, skillTag: '爬虫-状态码', source: '自建' },

    /* ---------- spy-requests ---------- */
    { id: 'spy-requests-1', kpIds: ['spy-requests'], subject: 'cs', type: 'single',
      stem: '用 requests 请求一个页面后，`r.status_code` 返回 403，最可能表示什么？',
      options: ['页面不存在', '服务器理解了请求但拒绝提供内容', '服务器内部报错', '请求被永久重定向'],
      answer: 'B',
      analysis: { ans: 'B', why: '403 Forbidden 表示服务器收到请求但拒绝执行，常见于权限不足或反爬策略。', steps: '1. 404 才表示资源不存在。\n2. 403 表示识别了请求但不允许访问。\n3. 5xx 才是服务器内部错误。', pit: '遇到 403 先核对 robots、网站条款与请求频率，必要时停止；不要尝试破解验证码或绕过登录。' }, difficulty: 2, estSeconds: 50, skillTag: 'requests-状态码', source: '自建' },
    { id: 'spy-requests-2', kpIds: ['spy-requests'], subject: 'cs', type: 'single',
      stem: '发起请求时设置 timeout 参数的主要目的是？',
      options: ['让返回内容自动转成中文', '限制等待时间，避免程序无限挂起', '自动重试所有失败请求', '提高服务器的响应速度'],
      answer: 'B',
      analysis: { ans: 'B', why: 'timeout 限制这次请求最多等多久，超时抛异常，程序不会被永久卡住。', steps: '1. 不设 timeout 时，网络异常可能长时间无响应。\n2. 设置 timeout=5 表示最多等 5 秒。\n3. 超时会抛 requests.exceptions.Timeout，可捕获后重试或跳过。', pit: 'timeout 不是重试次数，也不是加速手段；它只负责「别等太久」。' }, difficulty: 2, estSeconds: 45, skillTag: 'requests-超时', source: '自建' },
    { id: 'spy-requests-3', kpIds: ['spy-requests'], subject: 'cs', type: 'fill',
      stem: '执行 `r = requests.get(url)` 之后，取响应的文本内容用 `r.______`。',
      answer: 'text', accept: ['text', '.text'],
      analysis: { ans: 'text', why: 'r.text 按响应编码把响应体解码成字符串，适合 HTML。', steps: '1. requests.get 返回 Response 对象。\n2. r.text 得到解码后的字符串。\n3. r.content 得到原始字节，适合图片。', pit: '中文乱码时先确认 r.encoding，必要时改成 utf-8 再读 text。' }, difficulty: 2, estSeconds: 45, skillTag: 'requests-响应', source: '自建' },
    { id: 'spy-requests-4', kpIds: ['spy-requests'], subject: 'cs', type: 'fill',
      stem: '要判断请求是否成功，常写 `if r.______ == 200:`。',
      answer: 'status_code', accept: ['status_code', 'statuscode', 'status code'],
      analysis: { ans: 'status_code', why: 'status_code 是响应的 HTTP 状态码，200 表示成功。', steps: '1. 发起请求拿到 r。\n2. 读取 r.status_code。\n3. 等于 200 才继续解析。', pit: '不要用 r.ok 之外的模糊判断代替状态码检查；重定向后最终状态码才更有参考价值。' }, difficulty: 2, estSeconds: 45, skillTag: 'requests-状态码', source: '自建' },

    /* ---------- spy-html ---------- */
    { id: 'spy-html-1', kpIds: ['spy-html'], subject: 'cs', type: 'single',
      stem: '`BeautifulSoup(html, "html.parser")` 中第二个参数的作用是？',
      options: ['指定网页编码', '指定解析器', '指定要提取的标签', '指定请求头'],
      answer: 'B',
      analysis: { ans: 'B', why: '第二个参数告诉 BeautifulSoup 用哪个解析器把字符串变成树，html.parser 是标准库自带的。', steps: '1. 第一个参数是 HTML 字符串。\n2. 第二个参数是解析器名称。\n3. 解析器不同，容错能力和速度也不同。', pit: '解析器名称要写对；未安装 lxml 时写 lxml 会直接报错。' }, difficulty: 2, estSeconds: 45, skillTag: 'bs4-解析器', source: '自建' },
    { id: 'spy-html-2', kpIds: ['spy-html'], subject: 'cs', type: 'single',
      stem: '`soup.find("a")` 的返回值是什么？',
      options: ['所有 a 标签组成的列表', '第一个 a 标签对象，找不到返回 None', 'a 标签里的文字', 'a 标签的数量'],
      answer: 'B',
      analysis: { ans: 'B', why: 'find 只返回第一个匹配的 Tag；要找全部必须用 find_all。', steps: '1. find 从上到下扫描。\n2. 命中第一个 a 就返回 Tag 对象。\n3. 一个都没有则返回 None。', pit: '直接对 find 的结果调用 get_text，遇到 None 会报 AttributeError；先判断是否为空。' }, difficulty: 2, estSeconds: 45, skillTag: 'bs4-find', source: '自建' },
    { id: 'spy-html-3', kpIds: ['spy-html'], subject: 'cs', type: 'fill',
      stem: '`soup.find_all("p")` 返回的是一个 ______（可以遍历），而不是单个标签。',
      answer: '列表', accept: ['列表', 'list', 'ResultSet', 'resultset', '结果集'],
      analysis: { ans: '列表', why: 'find_all 返回 ResultSet，行为类似列表，里面是全部匹配的 Tag。', steps: '1. find_all 扫描整棵树。\n2. 把每个匹配的 p 标签收集起来。\n3. 返回可迭代的结果集。', pit: '结果集不能直接 get_text，要循环每个标签或对父节点整体取文本。' }, difficulty: 2, estSeconds: 45, skillTag: 'bs4-find_all', source: '自建' },
    { id: 'spy-html-4', kpIds: ['spy-html'], subject: 'cs', type: 'fill',
      stem: '要取出 `<p>你好</p>` 里的文字「你好」，可以写 `tag.______()` 或 `tag.text`。',
      answer: 'get_text', accept: ['get_text', 'getText', 'gettext'],
      analysis: { ans: 'get_text', why: 'get_text 会递归取出标签内所有文本并拼接成字符串。', steps: '1. 先定位到 p 标签。\n2. 调用 get_text()。\n3. 得到「你好」。', pit: '带嵌套标签时 get_text 会把子节点文本一起取出；需要去空白可传 strip=True。' }, difficulty: 2, estSeconds: 40, skillTag: 'bs4-文本', source: '自建' },

    /* ---------- spy-select ---------- */
    { id: 'spy-select-1', kpIds: ['spy-select'], subject: 'cs', type: 'single',
      stem: '`soup.select("div.item")` 会选中什么？',
      options: ['所有 class 为 item 的 div', 'id 为 item 的 div', '所有 div 里的 item 文本', '第一个 div'],
      answer: 'A',
      analysis: { ans: 'A', why: 'CSS 选择器中点号表示 class，div.item 就是 class 含 item 的 div。', steps: '1. div 是标签名。\n2. .item 表示 class 属性含 item。\n3. select 返回所有匹配项。', pit: '#item 才是按 id 匹配；点和井号不要混。' }, difficulty: 3, estSeconds: 50, skillTag: '选择器-css', source: '自建' },
    { id: 'spy-select-2', kpIds: ['spy-select'], subject: 'cs', type: 'single',
      stem: 'XPath 表达式 `//div[@class="item"]` 的含义是？',
      options: ['选中第一个 div', '选中任意层级中 class 等于 item 的 div', '选中 id 等于 item 的 div', '选中 div 的直接子节点'],
      answer: 'B',
      analysis: { ans: 'B', why: '// 表示从文档任意位置查找后代，方括号里是筛选条件，@class 表示 class 属性。', steps: '1. // 表示不限层级。\n2. div 限定标签名。\n3. [@class="item"] 限定属性值。', pit: 'class 有多个值时用等号会匹配不上，应改用 contains(@class, "item")。' }, difficulty: 3, estSeconds: 55, skillTag: '选择器-xpath', source: '自建' },
    { id: 'spy-select-3', kpIds: ['spy-select'], subject: 'cs', type: 'fill',
      stem: 'CSS 选择器中，`#main` 里的 `#` 表示按 ______ 属性匹配。',
      answer: 'id', accept: ['id', 'ID'],
      analysis: { ans: 'id', why: '井号是 id 选择器，点号是 class 选择器，裸标签名是标签选择器。', steps: '1. 看到 # 就找 id 属性。\n2. #main 匹配 id="main" 的元素。\n3. 一个页面 id 应唯一。', pit: 'class 可以重复，id 理论上唯一；抓列表时优先用 class。' }, difficulty: 3, estSeconds: 40, skillTag: '选择器-css', source: '自建' },
    { id: 'spy-select-4', kpIds: ['spy-select'], subject: 'cs', type: 'fill',
      stem: 'XPath 中 `//a/@href` 里的 `@` 用来选择元素的 ______。',
      answer: '属性', accept: ['属性', 'attribute', 'attr'],
      analysis: { ans: '属性', why: '@ 前缀表示取节点的属性值，@href 就是取 href 属性。', steps: '1. //a 定位所有 a 标签。\n2. /@href 取它们的 href 属性。\n3. 返回属性值组成的列表。', pit: '要取文本用 /text()，要取属性用 /@属性名，两者不要混。' }, difficulty: 3, estSeconds: 45, skillTag: '选择器-xpath', source: '自建' },

    /* ---------- spy-dynamic ---------- */
    { id: 'spy-dynamic-1', kpIds: ['spy-dynamic'], subject: 'cs', type: 'single',
      stem: '查看网页源代码时看不到商品价格，但浏览器里能正常显示，最可能的原因是？',
      options: ['网页被加密', '数据由 JavaScript 异步请求后渲染', '浏览器缓存了价格', '服务器禁止访问'],
      answer: 'B',
      analysis: { ans: 'B', why: '初始 HTML 只是骨架，价格由页面加载后发起的 XHR 或 fetch 请求拿到 JSON 再写入 DOM。', steps: '1. 直接请求页面得到的是初始 HTML。\n2. 浏览器执行脚本后再次发起接口请求。\n3. 数据被插入页面，所以源码里看不到。', pit: '源码看不到不等于不能抓；应去 Network 面板找接口，而不是硬解析空骨架。' }, difficulty: 3, estSeconds: 55, skillTag: '动态页面-原理', source: '自建' },
    { id: 'spy-dynamic-2', kpIds: ['spy-dynamic'], subject: 'cs', type: 'single',
      stem: '在浏览器开发者工具中，查看页面发起了哪些请求、返回了什么数据，应该用哪个面板？',
      options: ['Elements', 'Console', 'Network', 'Application'],
      answer: 'C',
      analysis: { ans: 'C', why: 'Network 面板按时间记录所有请求，可查看 URL、方法、请求头、参数与响应体。', steps: '1. 打开开发者工具。\n2. 切到 Network。\n3. 筛选 XHR 或 fetch，刷新页面复现请求。', pit: '不清空记录会混入大量图片和脚本请求；调试前先点清空再刷新。' }, difficulty: 2, estSeconds: 45, skillTag: '动态页面-抓包', source: '自建' },
    { id: 'spy-dynamic-3', kpIds: ['spy-dynamic'], subject: 'cs', type: 'fill',
      stem: '开发者工具中用于查看网络请求的面板叫 ______。',
      answer: 'Network', accept: ['Network', 'network', '网络', '网络面板'],
      analysis: { ans: 'Network', why: 'Network 面板记录请求列表，是定位异步接口的入口。', steps: '1. F12 打开开发者工具。\n2. 选择 Network 标签。\n3. 刷新页面观察请求。', pit: '接口可能在滚动或点击后才发出，只刷新首页可能抓不到。' }, difficulty: 2, estSeconds: 40, skillTag: '动态页面-抓包', source: '自建' },
    { id: 'spy-dynamic-4', kpIds: ['spy-dynamic'], subject: 'cs', type: 'fill',
      stem: '动态页面常通过 XHR 或 fetch 请求 ______ 格式的数据，再在前端拼接成 HTML。',
      answer: 'JSON', accept: ['JSON', 'json'],
      analysis: { ans: 'JSON', why: '前后端分离的页面通常用 JSON 传递结构化数据，由脚本渲染成页面。', steps: '1. 页面脚本请求接口。\n2. 接口返回 JSON。\n3. 脚本解析 JSON 并更新 DOM。', pit: '拿到 JSON 后先看结构再取字段，不要对整个字符串做正则硬扒。' }, difficulty: 2, estSeconds: 40, skillTag: '动态页面-json', source: '自建' },

    /* ---------- spy-anti ---------- */
    { id: 'spy-anti-1', kpIds: ['spy-anti'], subject: 'cs', type: 'single',
      stem: '抓取时收到 403 或频繁被拒绝，最合规的处理方式是？',
      options: ['破解验证码继续抓', '换更多代理 IP 猛刷', '先核对 robots 与条款，降低频率并按站点要求补全请求头，必要时停止', '伪造登录状态绕过付费墙'],
      answer: 'C',
      analysis: { ans: 'C', why: '被拒绝时先判断是频率、身份标识还是授权问题，合规做法是降速、表明身份或停止。', steps: '1. 检查 robots.txt 与网站条款是否允许。\n2. 降低请求频率，补全真实的 User-Agent 与联系方式。\n3. 仍被拒绝就停止，改用官方 API 或申请授权。', pit: '绕过验证码、伪造登录、破解付费墙都可能违反条款甚至法律，不属于技术问题。' }, difficulty: 3, estSeconds: 60, skillTag: '反爬-合规', source: '自建' },
    { id: 'spy-anti-2', kpIds: ['spy-anti'], subject: 'cs', type: 'single',
      stem: '在合规前提下使用代理 IP 的主要意义是？',
      options: ['提高解析 HTML 的速度', '分散请求来源，降低单一 IP 的访问压力', '自动清洗数据', '让 robots.txt 失效'],
      answer: 'B',
      analysis: { ans: 'B', why: '代理把请求分散到不同出口 IP，能避免单一 IP 过于集中而被限流。', steps: '1. 单 IP 高频请求容易触发阈值。\n2. 代理把流量分散到多个出口。\n3. 仍必须控制总频率并遵守站点规则。', pit: '代理不是隐身衣；用它规避封禁、地域限制或付费限制，风险更高。' }, difficulty: 3, estSeconds: 50, skillTag: '反爬-代理', source: '自建' },
    { id: 'spy-anti-3', kpIds: ['spy-anti'], subject: 'cs', type: 'fill',
      stem: '请求头中用来标识客户端浏览器与爬虫身份的字段是 ______。',
      answer: 'User-Agent', accept: ['User-Agent', 'user-agent', 'UA', 'ua'],
      analysis: { ans: 'User-Agent', why: 'User-Agent 声明客户端类型与版本，规范的爬虫会在其中写清身份和联系方式。', steps: '1. 构造 headers 字典。\n2. 设置 User-Agent 字段。\n3. 随请求一起发送。', pit: '不要伪装成已登录用户的浏览器去抓非公开内容；表明自己是爬虫反而更合规。' }, difficulty: 2, estSeconds: 45, skillTag: '反爬-请求头', source: '自建' },
    { id: 'spy-anti-4', kpIds: ['spy-anti'], subject: 'cs', type: 'fill',
      stem: '为控制访问频率，两次请求之间常用 `time.______(2)` 等待 2 秒。',
      answer: 'sleep', accept: ['sleep'],
      analysis: { ans: 'sleep', why: 'time.sleep 让当前线程暂停指定秒数，是最简单的限速手段。', steps: '1. 导入 time 模块。\n2. 每次请求后调用 time.sleep(2)。\n3. 让请求节奏降到每秒最多半次。', pit: '只 sleep 不控制并发是不够的；多线程或异步并发时要做全局速率限制。' }, difficulty: 2, estSeconds: 45, skillTag: '反爬-限速', source: '自建' },

    /* ---------- spy-store ---------- */
    { id: 'spy-store-1', kpIds: ['spy-store'], subject: 'cs', type: 'single',
      stem: '把二维数据保存成 CSV，下面哪种做法最稳妥？',
      options: ['用字符串拼接逗号后直接 write', '用 csv.writer 逐行写入', '用 json.dump 写入', '用 print 输出到屏幕'],
      answer: 'B',
      analysis: { ans: 'B', why: 'csv.writer 会自动处理字段里的逗号、引号和换行，避免格式被破坏。', steps: '1. 用 open 打开文件，newline 设为空字符串。\n2. 创建 csv.writer。\n3. 调用 writerow 或 writerows 写入。', pit: '手动拼逗号遇到字段内含逗号就会错列；含引号或换行时更难修。' }, difficulty: 2, estSeconds: 50, skillTag: '保存-csv', source: '自建' },
    { id: 'spy-store-2', kpIds: ['spy-store'], subject: 'cs', type: 'single',
      stem: '`json.dumps(obj, ensure_ascii=False)` 的作用是？',
      options: ['让中文保留原样，而不是转成 \\uXXXX', '自动排序字典的键', '把 JSON 转回 Python 对象', '压缩文件体积'],
      answer: 'A',
      analysis: { ans: 'A', why: 'ensure_ascii=False 允许输出非 ASCII 字符，中文会原样写入。', steps: '1. dumps 把 Python 对象转成字符串。\n2. 默认 ensure_ascii=True 会把中文转义。\n3. 设为 False 后保留中文。', pit: '写文件时仍要指定 encoding="utf-8"，否则 Windows 默认编码可能乱码。' }, difficulty: 2, estSeconds: 50, skillTag: '保存-json', source: '自建' },
    { id: 'spy-store-3', kpIds: ['spy-store'], subject: 'cs', type: 'fill',
      stem: 'Python 标准库中专门读写 CSV 的模块名是 ______。',
      answer: 'csv', accept: ['csv'],
      analysis: { ans: 'csv', why: 'csv 模块提供 reader 与 writer，按逗号分隔规则正确解析和写入。', steps: '1. import csv。\n2. 用 csv.writer 写。\n3. 用 csv.reader 读。', pit: 'csv 模块不负责编码，open 时仍要显式指定 encoding。' }, difficulty: 2, estSeconds: 40, skillTag: '保存-csv', source: '自建' },
    { id: 'spy-store-4', kpIds: ['spy-store'], subject: 'cs', type: 'fill',
      stem: '把 JSON 字符串解析成 Python 对象的函数是 `json.______`。',
      answer: 'loads', accept: ['loads', 'json.loads'],
      analysis: { ans: 'loads', why: 'loads 解析字符串，load 读取文件对象；dumps 与 dump 则负责序列化。', steps: '1. 拿到 JSON 字符串。\n2. 调用 json.loads。\n3. 得到字典或列表。', pit: 'load 和 loads 差一个 s：带 s 处理字符串，不带 s 处理文件。' }, difficulty: 2, estSeconds: 40, skillTag: '保存-json', source: '自建' },

    /* ---------- spy-ethics ---------- */
    { id: 'spy-ethics-1', kpIds: ['spy-ethics'], subject: 'cs', type: 'single',
      stem: '下列哪种做法最符合数据伦理与合规要求？',
      options: ['只抓公开且允许抓取的数据，控制频率，不采集无关个人信息', '抓取后把用户手机号卖给第三方', '用验证码识别批量注册账号', '无视 robots 全站高速抓取'],
      answer: 'A',
      analysis: { ans: 'A', why: '合规的核心是授权边界、最小必要和不对他人造成损害。', steps: '1. 先确认数据是否公开、是否允许抓取。\n2. 只采集业务必需字段。\n3. 控制频率并安全存储。', pit: '公开可见不等于可以批量收集和使用；个人信息即使公开也受法律保护。' }, difficulty: 1, estSeconds: 50, skillTag: '伦理-合规', source: '自建' },
    { id: 'spy-ethics-2', kpIds: ['spy-ethics'], subject: 'cs', type: 'single',
      stem: '网站已在条款中明确禁止抓取，或内容需要付费授权，正确做法是？',
      options: ['换个 IP 继续抓', '破解登录后抓取', '停止抓取，改用官方 API 或申请授权', '只抓一点点就不算违规'],
      answer: 'C',
      analysis: { ans: 'C', why: '条款明确禁止时，技术手段不能把「不允许」变成「允许」。', steps: '1. 确认条款与 robots 的限制。\n2. 停止抓取目标内容。\n3. 寻找官方 API、开放数据或书面授权。', pit: '「量小」不是免责理由；绕过付费墙可能同时违反合同与著作权法。' }, difficulty: 1, estSeconds: 50, skillTag: '伦理-授权', source: '自建' },
    { id: 'spy-ethics-3', kpIds: ['spy-ethics'], subject: 'cs', type: 'fill',
      stem: '收集个人信息时应遵循最小必要原则，只采集完成业务所 ______ 的数据。',
      answer: '必需', accept: ['必需', '必要', '需要'],
      analysis: { ans: '必需', why: '最小必要原则要求采集范围与业务目的直接相关，不能顺手多收。', steps: '1. 明确业务目的。\n2. 列出真正需要的字段。\n3. 其余字段不采集、不存储。', pit: '手机号、身份证号、住址属于敏感个人信息，没有明确授权不要碰。' }, difficulty: 1, estSeconds: 45, skillTag: '伦理-隐私', source: '自建' },
    { id: 'spy-ethics-4', kpIds: ['spy-ethics'], subject: 'cs', type: 'fill',
      stem: '违反 robots 协议与网站条款可能带来 ______ 与声誉风险，因此抓取前要先确认授权边界。',
      answer: '法律', accept: ['法律', '合规', '法律合规'],
      analysis: { ans: '法律', why: 'robots 本身不是法律，但违反条款、侵犯著作权或个人信息权益可能承担法律责任。', steps: '1. 阅读 robots 与条款。\n2. 判断数据性质与使用目的。\n3. 有疑问就申请授权或放弃抓取。', pit: '不要以为「技术上做得到」就等于「法律上可以做」。' }, difficulty: 1, estSeconds: 45, skillTag: '伦理-法律', source: '自建' }
  ]));

  /* ======================= 讲义 ======================= */
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'spy-basic-L1', kpIds: ['spy-basic'], subject: 'cs', level: 1,
      title: '爬虫原理：先学会礼貌，再谈技术',
      estMinutes: 40,
      hookTitle: '为什么写爬虫前要先看一个 txt 文件？',
      hookBody: 'robots.txt 就放在网站根目录，用几行规则告诉爬虫哪些路径可以抓、哪些不要碰。它不加密、不鉴权，却决定了你的程序是「访客」还是「不速之客」。',
      idea: '网络爬虫是**按 HTTP 协议自动获取网页并提取信息**的程序。它本质上就是替你重复执行「发请求 → 收响应 → 解析 → 保存」。技术不难，难的是边界：先看 robots 与网站条款，只抓公开数据，控制频率，不碰隐私与付费内容。',
      diagramId: 'spider-pipeline', diagramCaption: '请求 → 解析 → 提取 → 保存，四步构成一条流水线',
      analogy: { title: '去图书馆抄资料', md: '爬虫像去图书馆抄资料：先看馆内规定（robots 与条款），一次只借几本（限速），不撕书页（不压垮服务器），更不抄读者登记簿（不采集隐私）。守规矩的人才能长期借到书。' },
      points: [
        { title: '一、爬虫到底在做什么', md: '爬虫是一个自动发 HTTP 请求、读取响应、再从中提取信息的程序。它把人工「打开网页、复制字段、粘贴到表格」的动作重复化、批量化。' },
        { title: '二、robots.txt 是最低礼貌约定', md: '文件放在站点根目录，用 User-agent、Disallow、Allow 声明可抓范围。抓取前先读取并遵守，它不是授权书，允许抓也不等于可以随意使用数据。' },
        { title: '三、四步流水线', md: '请求页面拿到响应，解析成 DOM 树，用选择器提取字段，最后清洗并保存。所有爬虫框架都只是把这四步做了工程化封装，步骤顺序不会变，也不该跳过任何一步。' },
        { title: '四、先看状态码再看内容', md: '200 成功，301 与 302 跳转，403 拒绝，404 不存在，429 请求过多，5xx 服务器错误。状态码不对时，解析再漂亮也没有意义。' },
        { title: '五、只抓公开且允许的数据', md: '登录后才能看的内容、付费墙后的内容、明确禁止抓取的内容、个人隐私与敏感信息，都不应成为采集目标。需要时应改用官方接口或申请授权。' },
        { title: '六、控制频率是硬要求', md: '串行请求之间加 sleep、限制并发数、失败后按指数退避。抓取速度要以「不影响对方服务」为上限，快不是本事，稳定且不添乱才是能长期运行的前提。' },
        { title: '七、优先找合法替代', md: '官方 API、开放数据下载、RSS、站点自带导出，通常比爬页面更稳定也更合规。能走正门就不要翻墙，授权清晰的数据源能省掉后面大量的维护与法律风险。' }
      ],
      table: {
        headers: ['检查项', '具体看什么', '不合格时怎么做'],
        rows: [
          ['robots.txt', 'User-agent 与 Disallow 规则', '不抓被禁止的路径'],
          ['网站条款', '是否允许自动化采集', '停止或申请授权'],
          ['数据性质', '是否公开、是否含个人信息', '只保留必要字段'],
          ['请求频率', '单 IP 每秒次数与并发', '加 sleep、降并发'],
          ['状态码', '200 / 403 / 429 / 5xx', '按码定位，必要时停止']
        ]
      },
      code: 'import urllib.robotparser\n\nrp = urllib.robotparser.RobotFileParser()\nrp.set_url("https://example.com/robots.txt")\nrp.read()\nprint(rp.can_fetch("*", "https://example.com/news"))\nprint(rp.can_fetch("*", "https://example.com/admin"))',
      warning: 'robots.txt 允许抓取不等于可以随意使用数据；版权、隐私、网站条款仍然约束你。遇到登录、付费、验证码，正确做法是停止或申请授权，而不是绕过。',
      tip: '写任何爬虫前先做三件事：读 robots、读条款、估算请求量。三件事都过关再写代码。',
      quizIds: ['spy-basic-1', 'spy-basic-2', 'spy-basic-3', 'spy-basic-4'],
      example: {
        title: '判断一个路径能不能抓',
        steps: [
          { md: '先请求目标站点根目录的 robots.txt，找到与自己 User-agent 匹配的规则段。' },
          { md: '看目标路径是否落在 Disallow 列表里，注意最长匹配优先。' },
          { md: '再读网站条款，确认是否允许自动化采集这类数据。' },
          { md: '任一条不允许，就换官方 API 或放弃该路径，不要试探。' }
        ],
        takeaway: '允许抓取是三个条件同时成立：robots 允许、条款允许、数据本身可合法使用。'
      },
      example2: {
        title: '用状态码定位一次失败',
        steps: [
          { md: '程序跑完没拿到数据，先打印 r.status_code。' },
          { md: '如果是 403，说明被拒绝，先查 robots、条款与频率。' },
          { md: '如果是 429，说明请求过多，必须降速并加退避。' },
          { md: '如果是 200 但内容为空，问题在解析或页面由脚本渲染。' }
        ],
        takeaway: '排错顺序：请求层 → 解析层 → 数据层，不要一上来就怀疑选择器。'
      },
      guided: [{ questionId: 'spy-basic-1', hint: 'robots.txt 只声明可抓范围，不负责加密或存储登录状态。' }],
      solo: ['spy-basic-2', 'spy-basic-4'],
      challenge: ['spy-basic-3'],
      summary: {
        essence: '爬虫是自动化的请求—解析—提取—保存流水线；robots 与条款划定边界，频率体现礼貌。',
        formulas: ['流程：请求 → 解析 → 提取 → 保存', 'robots：/robots.txt + Disallow 规则', '状态码：200 成功 / 403 拒绝 / 429 过多'],
        pitfalls: ['以为 robots 允许就能随意使用数据', '跳过解析直接字符串替换', '不看状态码就找选择器', '为求快并发拉满'],
        checklist: ['我能说出爬虫四步流程', '我会读 robots.txt', '我能根据状态码判断问题层级', '我知道哪些数据不该抓']
      },
      feynman: '请用「去图书馆抄资料」的比喻，讲清楚 robots、限速和不采集隐私分别对应什么行为。'
    }),

    Z.makeLesson({
      id: 'spy-requests-L2', kpIds: ['spy-requests'], subject: 'cs', level: 2,
      title: 'requests：把一次 HTTP 请求写清楚',
      estMinutes: 40,
      hookTitle: '为什么代码里明明请求成功了，却读出乱码？',
      hookBody: '因为 r.text 会按响应头里的编码去解码，服务器没写清楚或写错时就会乱。理解请求、响应和编码三件事，乱码就不再是玄学。',
      idea: 'requests 是最常用的第三方 HTTP 库。一次调用的核心是：给 URL 和参数，带请求头，设超时，拿到 Response 对象，再按状态码、编码、内容类型分别读取。',
      diagramId: 'http-cycle', diagramCaption: 'DNS 找地址 → TCP 建连接 → 发请求 → 收响应',
      analogy: { title: '寄挂号信', md: 'URL 是收件地址，headers 是信封上的身份信息，params 是附在地址后的备注，timeout 是你愿意等回信的最长时间。信寄出后，Response 就是回信：先看邮戳（状态码），再拆信封读内容。' },
      points: [
        { title: '一、安装与导入', md: 'requests 是第三方库，先用 `pip install requests` 安装，再 `import requests`。它不是标准库，离线环境要提前装好。' },
        { title: '二、GET 与 params', md: '`requests.get(url, params={"page": 1})` 会把参数拼到查询串。不要把参数手写进 URL，交给 params 更安全也更好改。' },
        { title: '三、Response 的四个入口', md: '`status_code` 看结果，`text` 看解码后的字符串，`content` 看原始字节，`json()` 把 JSON 响应转成字典或列表。' },
        { title: '四、编码要主动确认', md: '中文乱码时先看 `r.encoding`，必要时设为 utf-8 再读 text。二进制内容（图片、PDF）一律用 content，不要用 text。' },
        { title: '五、请求头表明身份', md: 'headers 里放 User-Agent 说明自己是谁，规范的爬虫会写清用途与联系方式。不要伪造登录态去访问非公开内容。' },
        { title: '六、超时与异常', md: '`timeout=5` 限制等待时间；超时抛 Timeout，连接失败抛 ConnectionError。捕获后记录并有限重试，不要无限循环。' },
        { title: '七、重定向与最终地址', md: 'requests 默认跟随重定向，`r.url` 是最终地址，`r.history` 记录跳转链。被跳到登录页时，说明这次抓取已越界。' }
      ],
      table: {
        headers: ['需求', '写法', '说明'],
        rows: [
          ['发 GET', 'requests.get(url, timeout=5)', '最常用'],
          ['带查询参数', 'params={"page": 1}', '自动拼查询串'],
          ['读文本', 'r.text', '按编码解码'],
          ['读字节', 'r.content', '图片、文件'],
          ['读 JSON', 'r.json()', '返回字典或列表'],
          ['看状态', 'r.status_code', '200 为成功'],
          ['看最终地址', 'r.url', '重定向后地址']
        ]
      },
      code: 'import requests\n\nurl = "https://example.com"\nr = requests.get(url, headers={"User-Agent": "StudyBot/1.0"}, timeout=5)\nprint(r.status_code)\nif r.status_code == 200:\n    r.encoding = "utf-8"\n    print(r.text[:80])',
      warning: '不要设置 headers 伪装成已登录用户去抓非公开内容，也不要无限重试。失败要有上限，并在重试之间加等待。',
      tip: '排错先打印两行：status_code 和 text 的前 200 个字符。前者告诉你请求通没通，后者告诉你拿到的是什么。',
      quizIds: ['spy-requests-1', 'spy-requests-2', 'spy-requests-3', 'spy-requests-4'],
      example: {
        title: '带参数请求一个列表页',
        steps: [
          { md: '准备基础 URL 与参数字典 `params = {"page": 1, "size": 20}`。' },
          { md: '调用 `requests.get(url, params=params, timeout=5)`。' },
          { md: '先检查 status_code 是否为 200。' },
          { md: '再读 `r.text` 或 `r.json()`，确认拿到目标数据。' }
        ],
        takeaway: '参数交给 params，状态码先检查，内容按类型读取。'
      },
      example2: {
        title: '处理超时与连接失败',
        steps: [
          { md: '把请求包进 try。' },
          { md: '捕获 `requests.exceptions.Timeout`，记录后等待再试。' },
          { md: '捕获 `requests.exceptions.ConnectionError`，检查域名与网络。' },
          { md: '设置最大重试次数，超过就跳过该条并继续。' }
        ],
        takeaway: '爬虫要能承受单条失败，不能因为一个超时让整批任务崩掉。'
      },
      guided: [{ questionId: 'spy-requests-1', hint: '403 是「看懂了但不给」，404 才是「没有这个资源」。' }],
      solo: ['spy-requests-2', 'spy-requests-3'],
      challenge: ['spy-requests-4'],
      summary: {
        essence: '一次请求 = URL + 参数 + 请求头 + 超时；响应按状态码、文本、字节、JSON 四种方式读取。',
        formulas: ['requests.get(url, params=..., headers=..., timeout=5)', 'r.status_code / r.text / r.content / r.json()', 'r.encoding 与 r.apparent_encoding'],
        pitfalls: ['把参数手写进 URL', '中文乱码不检查 encoding', '图片用 r.text 读', '无上限重试'],
        checklist: ['我会用 params 传参数', '我能按类型读取响应', '我会设置超时并捕获异常', '我知道重定向后看 r.url']
      },
      feynman: '请用寄挂号信的比喻，讲清楚 URL、headers、params、timeout 和 Response 各对应什么。'
    }),

    Z.makeLesson({
      id: 'spy-html-L2', kpIds: ['spy-html'], subject: 'cs', level: 2,
      title: 'BeautifulSoup：把 HTML 变成可查询的树',
      estMinutes: 40,
      hookTitle: 'HTML 明明是一段文字，为什么能按标签找东西？',
      hookBody: '因为解析器先把这段文字读成一棵树：标签是节点，嵌套是父子关系。BeautifulSoup 做的就是这件事，之后你才能用 find、select 在树上定位。',
      idea: 'BeautifulSoup 把 HTML 字符串解析成 **Tag 树**。你可以按标签名、属性、文本查找，也可以从某个节点向上、向下、向兄弟移动。它容错性强，适合处理不规范的网页源码。',
      diagramId: 'dom-tree', diagramCaption: 'html 为根，head 与 body 为分支，标签嵌套形成父子关系',
      analogy: { title: '把文章拆成目录树', md: '一篇文章有章、节、小节。BeautifulSoup 先把整篇 HTML 拆成目录树，你报「第二章第三节」，它就沿树枝走到那个节点，再取标题或正文。' },
      points: [
        { title: '一、安装与构造', md: '`pip install beautifulsoup4` 后 `from bs4 import BeautifulSoup`。传入 HTML 字符串和解析器名，得到 soup 对象，它是整棵树的入口。' },
        { title: '二、解析器怎么选', md: '`html.parser` 标准库自带、无需安装；`lxml` 更快但需另装；`html5lib` 容错最好但最慢。初学先用 html.parser。' },
        { title: '三、find 与 find_all', md: 'find 返回第一个匹配的 Tag，找不到返回 None；find_all 返回可遍历的结果集。按标签名、class、id、属性都能筛。' },
        { title: '四、Tag 的属性与文本', md: '`tag["href"]` 取属性，`tag.get("href")` 更安全；`tag.text` 或 `get_text()` 取文本，`get_text(strip=True)` 顺手去空白。' },
        { title: '五、树的上下左右', md: '`parent` 向上，`children` 与 `descendants` 向下，`next_sibling` 与 `previous_sibling` 找同级。复杂页面靠这些关系绕开不稳定的 class。' },
        { title: '六、先定位容器再取字段', md: '先在列表容器上 find_all，再在每个条目里取标题、链接、价格。这样比全页搜索更稳，也不容易把页头和页脚的内容混进来。' },
        { title: '七、解析要能容错', md: '真实网页常缺闭合标签。用 try 包住字段提取，对 None 做判断，单条失败就跳过，不要因为一个字段缺失让整批任务崩掉。' }
      ],
      table: {
        headers: ['需求', '写法', '返回'],
        rows: [
          ['第一个匹配', 'soup.find("div")', 'Tag 或 None'],
          ['全部匹配', 'soup.find_all("p")', '结果集'],
          ['按 class', 'soup.find_all("div", class_="item")', '结果集'],
          ['按属性', 'soup.find("a", href=True)', 'Tag 或 None'],
          ['取属性', 'tag.get("href")', '字符串或 None'],
          ['取文本', 'tag.get_text(strip=True)', '字符串']
        ]
      },
      code: 'from bs4 import BeautifulSoup\n\nhtml = "<div><h1>标题</h1><p>第一段</p><p>第二段</p></div>"\nsoup = BeautifulSoup(html, "html.parser")\nprint(soup.h1.get_text())\nfor p in soup.find_all("p"):\n    print(p.get_text())',
      warning: '页面结构会随版本变化，选择器写得越依赖层级越容易失效。优先找稳定的 class、data 属性或容器 id。',
      tip: '调试解析时先把 HTML 存成本地文件，反复读本地文件调选择器，别每改一次就请求一次对方服务器。',
      quizIds: ['spy-html-1', 'spy-html-2', 'spy-html-3', 'spy-html-4'],
      example: {
        title: '从列表页提取标题与链接',
        steps: [
          { md: '用 find_all 找到每个列表项容器，例如 class 为 item 的 div。' },
          { md: '在每个容器里 find 标题标签，取 get_text(strip=True)。' },
          { md: '再 find a 标签，用 get("href") 取链接。' },
          { md: '把标题和链接组成字典，追加到结果列表。' }
        ],
        takeaway: '先缩小到条目容器，再在容器内取字段，稳定性和可读性都更好。'
      },
      example2: {
        title: '安全地取一个可能缺失的字段',
        steps: [
          { md: '先 `node = item.find("span", class_="price")`。' },
          { md: '判断 `if node is None`，缺失就写入空值或跳过。' },
          { md: '存在则 `price = node.get_text(strip=True)`。' },
          { md: '最后统一做类型转换与清洗。' }
        ],
        takeaway: '真实数据一定有缺失，先判空再取值。'
      },
      guided: [{ questionId: 'spy-html-2', hint: 'find 和 find_all 的差别就在「一个」和「全部」。' }],
      solo: ['spy-html-1', 'spy-html-3'],
      challenge: ['spy-html-4'],
      summary: {
        essence: 'BeautifulSoup 把 HTML 解析成 Tag 树；find 取一个，find_all 取全部，文本用 get_text。',
        formulas: ['BeautifulSoup(html, "html.parser")', 'soup.find(...) / soup.find_all(...)', 'tag.get("attr") / tag.get_text(strip=True)'],
        pitfalls: ['解析器名写错或未安装', '对 None 直接取文本', '结果集当单个标签用', '选择器过度依赖层级'],
        checklist: ['我能构造 soup 对象', '我分得清 find 与 find_all', '我会取属性与文本', '我会对缺失字段判空']
      },
      feynman: '请解释「HTML 变成树」是什么意思，并用父子关系说明 find 为什么能找到嵌套很深的标签。'
    }),

    Z.makeLesson({
      id: 'spy-select-L3', kpIds: ['spy-select'], subject: 'cs', level: 3,
      title: '选择器：用 CSS 与 XPath 精准定位',
      estMinutes: 45,
      hookTitle: '同一个页面，为什么别人的选择器一直有效？',
      hookBody: '因为他们抓的是稳定特征，例如固定的 class、data 属性或语义标签，而不是「第 3 个 div 的第 2 个孩子」。页面一改版，绝对路径最先失效。',
      idea: 'CSS 选择器和 XPath 都是**在树上描述目标节点**的语言。CSS 更短、更适合 BeautifulSoup 的 select；XPath 表达力更强，能按文本、属性、位置筛选，常配合 lxml 使用。',
      diagramId: 'dom-tree', diagramCaption: '选择器本质是在这棵树上写一条到达目标节点的路径',
      analogy: { title: '快递地址怎么写', md: '绝对 XPath 像「从小区大门进去左转第三栋二单元」，门一改就找不到。稳定的 CSS 选择器像「送到 8 号楼 302，收件人姓王」，即使路线变了也能送达。' },
      points: [
        { title: '一、CSS 的四种基本写法', md: '标签 `div`，class `.item`，id `#main`，属性 `[data-id]`。它们可以组合，例如 `div.item` 表示 class 含 item 的 div。' },
        { title: '二、层级与组合', md: '空格表示后代，`>` 表示直接子元素，`,` 表示并列多选。`ul > li` 只取直接子项，能排除更深层的 li；层级写得越浅，页面改版时失效的概率越低。' },
        { title: '三、select 与 select_one', md: 'BeautifulSoup 的 `select` 返回列表，`select_one` 返回第一个或 None。两者都接受标准 CSS 选择器，写起来比多层 find 短。' },
        { title: '四、XPath 的基本语法', md: '`//` 表示任意后代，`/` 表示直接子节点，`[@attr="v"]` 按属性筛选，`/text()` 取文本，`/@href` 取属性值。' },
        { title: '五、lxml 的用法', md: '`from lxml import html` 后 `doc = html.fromstring(text)`，再用 `doc.xpath(...)` 取结果列表。XPath 返回的永远是列表，取第一个要加下标。' },
        { title: '六、稳定性优先', md: '优先用语义标签、稳定 class、data-* 属性；避免 nth-child 和超长绝对路径。能用一条选择器说清，就不要写五层嵌套。' },
        { title: '七、先用浏览器验证', md: '在 Elements 面板用 Ctrl+F 搜索选择器，或在 Console 里跑 `document.querySelectorAll`，确认命中数量正确再写进代码。' }
      ],
      table: {
        headers: ['目标', 'CSS 写法', 'XPath 写法'],
        rows: [
          ['按 class', '.item', '//*[contains(@class, "item")]'],
          ['按 id', '#main', '//*[@id="main"]'],
          ['直接子元素', 'ul > li', '//ul/li'],
          ['任意后代', 'div a', '//div//a'],
          ['按属性', 'a[href]', '//a[@href]'],
          ['取属性值', '不可直接取', '//a/@href'],
          ['取文本', 'tag.get_text()', '//a/text()']
        ]
      },
      code: 'from bs4 import BeautifulSoup\nfrom lxml import html\n\nsoup = BeautifulSoup("<ul><li class=item>A</li><li class=item>B</li></ul>", "html.parser")\nprint([li.get_text() for li in soup.select("li.item")])\nprint(soup.select_one("li.item").get_text())\n\ndoc = html.fromstring("<div><a href=/a>A</a><a href=/b>B</a></div>")\nprint(doc.xpath("//a/@href"))',
      warning: '不要用 `/html/body/div[3]/div[2]/ul/li` 这种绝对路径，页面加一个广告位就会全部错位。',
      tip: '浏览器右键复制的 selector 或 XPath 往往很长，复制后一定要自己简化成稳定特征。',
      quizIds: ['spy-select-1', 'spy-select-2', 'spy-select-3', 'spy-select-4'],
      example: {
        title: '提取列表页的标题与链接',
        steps: [
          { md: '观察每个条目的容器，假设 class 为 card。' },
          { md: '写 `cards = soup.select("div.card")` 拿到全部条目。' },
          { md: '在每个 card 里 `select_one("h3")` 取标题文本。' },
          { md: '再 `select_one("a")["href"]` 取链接，缺失则跳过。' }
        ],
        takeaway: '先选容器，再在容器内选字段，选择器短而稳定。'
      },
      example2: {
        title: '用 XPath 按属性筛选',
        steps: [
          { md: '用 lxml 把 HTML 解析成 doc。' },
          { md: '写 `doc.xpath("//a[@data-type=detail]/@href")`。' },
          { md: '结果是一个列表，可能为空。' },
          { md: '先判断非空，再取第一个值使用。' }
        ],
        takeaway: 'XPath 适合按属性与文本筛选，但返回列表，必须判空再取。'
      },
      guided: [{ questionId: 'spy-select-2', hint: '先分清 // 与 /，再看方括号里的 @ 是什么意思。' }],
      solo: ['spy-select-1', 'spy-select-4'],
      challenge: ['spy-select-3'],
      summary: {
        essence: 'CSS 用 .class、#id、标签和层级描述节点；XPath 用 //、/、[@attr] 描述路径，返回列表。',
        formulas: ['soup.select("div.item") / soup.select_one(...)', 'doc.xpath("//a/@href")', 'CSS：后代空格、直接子 >、并列 ,'],
        pitfalls: ['点号与井号混用', 'XPath 结果当字符串用', 'class 多值时用等号匹配', '使用绝对路径'],
        checklist: ['我能写 class 与 id 选择器', '我分得清后代与直接子元素', '我会用 XPath 取属性', '我知道如何验证选择器命中数']
      },
      feynman: '请解释为什么「绝对路径 XPath」很脆弱，并说明你会怎样写一个更稳的选择器。'
    }),

    Z.makeLesson({
      id: 'spy-dynamic-L3', kpIds: ['spy-dynamic'], subject: 'cs', level: 3,
      title: '动态页面：先看接口，再谈解析',
      estMinutes: 45,
      hookTitle: '为什么源代码里一个字都没有，页面上却什么都有？',
      hookBody: '因为你看到的页面是浏览器执行 JavaScript 之后的结果。初始 HTML 只是骨架，真正的数据由脚本通过异步接口取回，再填进页面。',
      idea: '动态页面的数据不在初始 HTML 里，而在 **XHR 或 fetch 请求返回的 JSON** 中。正确做法是打开 Network 面板找到接口，判断它是否公开、是否允许调用，再直接请求接口，而不是硬解析空骨架。',
      diagramId: 'http-cycle', diagramCaption: '浏览器先取 HTML，再由脚本发接口请求，最后渲染页面',
      analogy: { title: '先拿菜单再点菜', md: '解析 HTML 像等厨师把菜端上来再猜配方；抓接口像直接拿到菜单和配料表。后者信息更全、更稳定，也更容易分页取用。' },
      points: [
        { title: '一、动态渲染是怎么回事', md: '服务器先返回基础 HTML，浏览器执行脚本，脚本再请求数据并修改 DOM。所以直接用 requests 取页面时，拿到的只是没有数据的骨架，字段自然不会出现在源码里。' },
        { title: '二、Network 面板怎么用', md: '打开开发者工具切到 Network，清空后刷新页面，筛选 XHR 或 fetch，按响应大小排序，通常最大的那条就是数据接口。' },
        { title: '三、看懂一条请求', md: '重点看 URL、方法、请求头、查询参数和响应体。分页参数常是 page、size、offset；响应体是 JSON 时，字段名就是你要的键。' },
        { title: '四、判断接口是否可直接用', md: '如果接口公开、无需登录、站点条款允许，就可以按同样参数请求。需要 Cookie 或签名的接口，不要伪造或破解，应申请授权。' },
        { title: '五、分页与增量', md: '列表接口通常按页返回。循环页码时设置最大页数、每页间隔和空页终止条件，翻到没有数据就停，避免参数异常导致无限请求，给对方服务器造成不必要的压力。' },
        { title: '六、请求头与参数要一致', md: '接口可能校验 Referer、User-Agent 或特定参数。按浏览器里看到的公开值填写即可，不要伪造登录凭证或签名；需要鉴权的接口应当申请授权，而不是猜测规则。' },
        { title: '七、自动化工具是最后手段', md: 'Selenium 或 Playwright 能执行脚本，但慢且资源重。只有在页面必须交互、且条款允许时才用，并同样遵守频率限制。' }
      ],
      table: {
        headers: ['现象', '判断', '处理方式'],
        rows: [
          ['源码无数据', '脚本异步渲染', '去 Network 找 JSON 接口'],
          ['接口返回 401', '需要登录', '停止，改用官方 API'],
          ['接口返回 403', '被拒绝或需签名', '核对条款，必要时放弃'],
          ['响应很大且是 JSON', '大概率是数据接口', '解析字段并分页'],
          ['必须点击才加载', '交互触发请求', '模拟公开的交互参数']
        ]
      },
      code: 'import requests\n\n# 在浏览器 Network 面板确认该接口公开且允许调用后，再按同样参数请求\napi = "https://example.com/api/list?page=1"\nr = requests.get(api, timeout=5)\nprint(r.status_code)\ndata = r.json()\nfor item in data["items"]:\n    print(item["title"])',
      warning: '不要用自动化工具绕过登录、验证码或付费墙。接口也可能有鉴权，未授权调用与直接抓页面同样不合规。',
      tip: '能拿 JSON 就别解析 HTML：字段稳定、体积更小、出错更少，分页也更容易。',
      quizIds: ['spy-dynamic-1', 'spy-dynamic-2', 'spy-dynamic-3', 'spy-dynamic-4'],
      example: {
        title: '从列表页找到数据接口',
        steps: [
          { md: '打开开发者工具 Network，勾选 Preserve log 并清空记录。' },
          { md: '刷新页面，筛选 XHR 或 fetch。' },
          { md: '在 Preview 里找包含目标字段的响应。' },
          { md: '复制请求 URL 与公开参数，在代码里用 requests 复现并核对字段。' }
        ],
        takeaway: '找到接口只是第一步，还要确认授权与频率，才算能抓。'
      },
      example2: {
        title: '安全地翻页',
        steps: [
          { md: '先请求第 1 页，确认返回结构和总页数。' },
          { md: '用循环递增 page，每页之间 sleep 1 到 2 秒。' },
          { md: '当 items 为空或达到总页数就停止。' },
          { md: '设置最大页数上限，防止参数异常导致死循环。' }
        ],
        takeaway: '翻页必须有终止条件、间隔和上限，三者缺一不可。'
      },
      guided: [{ questionId: 'spy-dynamic-2', hint: 'Elements 看结构，Console 看报错，Network 才看请求。' }],
      solo: ['spy-dynamic-1', 'spy-dynamic-3'],
      challenge: ['spy-dynamic-4'],
      summary: {
        essence: '动态页面的数据由脚本请求 JSON 后渲染；去 Network 找接口，确认授权后直接请求。',
        formulas: ['F12 → Network → XHR / fetch', 'r.json() 取结构化数据', '分页：page / offset + 终止条件 + sleep'],
        pitfalls: ['硬解析空骨架', '把接口当无授权资源', '翻页没有终止条件', '忽略接口也可能校验请求头'],
        checklist: ['我知道动态页面的数据从哪来', '我会用 Network 找接口', '我能判断接口是否需要授权', '我会写安全的分页循环']
      },
      feynman: '请解释「源码没有、页面有」的原因，并说明你会怎样定位真正的数据接口。'
    }),

    Z.makeLesson({
      id: 'spy-anti-L3', kpIds: ['spy-anti'], subject: 'cs', level: 3,
      title: '反爬与自我约束：请求头、代理与限速',
      estMinutes: 45,
      hookTitle: '被网站拒绝了，是技术不行还是姿势不对？',
      hookBody: '多数时候既不是技术不行，也不是网站针对你，而是请求太密、身份不明或越过了授权边界。先降速、表明身份、核对规则，比换代理和破解验证码有效得多。',
      idea: '反爬是网站保护自身可用性与数据的手段。作为抓取方，正确姿势是**表明身份、控制频率、失败退避、尊重拒绝**。请求头、代理、限速是工具，不是绕过规则的手段。',
      diagramId: 'http-cycle', diagramCaption: '每次请求都带着身份与频率信息，服务器据此决定是否放行',
      analogy: { title: '高峰期的餐厅', md: '餐厅满座时会限流。你可以在门口排队（限速），可以换个分店（代理分散压力），但不能翻墙进后厨（绕过验证）、冒充员工（伪造登录）。被明确拒绝时就该离开。' },
      points: [
        { title: '一、常见反爬手段', md: 'User-Agent 校验、频率限制、IP 封禁、验证码、登录校验、动态渲染、接口签名。它们的目标是区分正常访问与批量抓取。' },
        { title: '二、User-Agent 是身份证', md: '规范做法是写清爬虫名称、用途与联系方式，例如 StudyBot 加一个邮箱。这既方便站点在有问题时联系你，也表明你是可沟通的自动化访问，而不是恶意流量。' },
        { title: '三、Referer 与 Cookie 的边界', md: 'Referer 表示来源页，部分接口会校验；Cookie 常含登录态。只使用公开、无需登录即可获得的资源，不要伪造他人身份。' },
        { title: '四、代理的正当用途', md: '在合规抓取中，代理可以分散出口 IP、降低单一 IP 的压力。它不改变授权边界，也不能用来规避封禁、地域限制或付费限制；把代理当隐身衣，风险只会更高。' },
        { title: '五、限速要写进代码', md: '串行请求加 `time.sleep`，并发时用信号量或令牌桶限制全局速率。目标不是「尽量快」，而是「稳定且不影响对方」。' },
        { title: '六、失败退避与熔断', md: '遇到 429 或 5xx 时，等待时间按指数增长，连续失败达到阈值就停止整批任务，并记录失败原因。硬重试只会让封禁更快到来，退避与熔断才是能长期运行的写法。' },
        { title: '七、被拒绝时的正确动作', md: '先查 robots 与条款，再降频、补全身份、检查参数。仍然被拒绝就停止，改用官方 API 或申请授权。验证码与付费墙不是技术挑战。' }
      ],
      table: {
        headers: ['信号', '可能原因', '合规应对'],
        rows: [
          ['403', '权限或策略拒绝', '核对规则，降频，必要时停止'],
          ['429', '请求过多', '指数退避，降低并发'],
          ['验证码', '疑似自动化', '停止，不破解'],
          ['登录跳转', '内容非公开', '改用官方 API 或申请授权'],
          ['连接被重置', 'IP 被限', '降速，检查是否越界']
        ]
      },
      code: 'import time\nimport requests\n\nheaders = {"User-Agent": "StudyBot/1.0 (contact: me@example.com)"}\nfor url in ["https://example.com/a", "https://example.com/b"]:\n    r = requests.get(url, headers=headers, timeout=5)\n    print(r.status_code)\n    time.sleep(2)',
      warning: '代理不是隐身衣。用代理规避封禁、绕过地域或付费限制，可能违反网站条款甚至法律，也会让后续所有抓取更难做。',
      tip: '把「每秒最多 N 次」写成常量并统一入口，而不是在每个函数里随手 sleep，否则并发一开就失控。',
      quizIds: ['spy-anti-1', 'spy-anti-2', 'spy-anti-3', 'spy-anti-4'],
      example: {
        title: '给抓取加上限速与退避',
        steps: [
          { md: '定义最大重试次数与基础等待秒数。' },
          { md: '每次请求前记录时间，保证两次请求间隔不小于设定值。' },
          { md: '遇到 429 或 5xx，等待时间翻倍后重试。' },
          { md: '超过重试上限就记录失败并跳过，不阻塞整批任务。' }
        ],
        takeaway: '限速管节奏，退避管异常，两者一起才能稳定运行。'
      },
      example2: {
        title: '处理一次 403',
        steps: [
          { md: '先打印状态码与响应前 200 字，确认是拒绝而不是页面改版。' },
          { md: '核对 robots 与条款，确认目标路径是否允许。' },
          { md: '降低频率，补全真实 User-Agent 与联系方式。' },
          { md: '仍然 403 就停止该路径，改为官方 API 或申请授权。' }
        ],
        takeaway: '403 是边界信号，不是必须攻破的技术关卡。'
      },
      guided: [{ questionId: 'spy-anti-1', hint: '先想「网站为什么拒绝」，再想「我有没有被允许」。' }],
      solo: ['spy-anti-2', 'spy-anti-3'],
      challenge: ['spy-anti-4'],
      summary: {
        essence: '反爬的核心是识别与限流；正确应对是表明身份、控制频率、失败退避、尊重拒绝。',
        formulas: ['headers = {"User-Agent": "名称/版本 (联系方式)"}', 'time.sleep(秒数) 控制串行节奏', '429 / 5xx 用指数退避'],
        pitfalls: ['把换代理当解决方案', '伪造登录态', '并发拉满再 sleep', '遇验证码尝试破解'],
        checklist: ['我能识别 403 与 429 的含义', '我会写真实的 User-Agent', '我知道代理的正当用途', '被拒绝时我会停止而不是绕过']
      },
      feynman: '请用高峰期餐厅的比喻，讲清楚限速、代理和「被拒绝就停止」分别对应什么。'
    }),

    Z.makeLesson({
      id: 'spy-store-L2', kpIds: ['spy-store'], subject: 'cs', level: 2,
      title: '数据清洗与保存：从网页到可用数据',
      estMinutes: 40,
      hookTitle: '抓下来一堆文字，为什么一行都用不了？',
      hookBody: '因为网页里的文本带着空格、换行、单位和缺失值。抓取只是拿到原料，清洗和保存才决定这份数据能不能被分析、被复用。',
      idea: '保存前先做**字段级清洗**：去空白、统一格式、转换类型、处理缺失与重复。再根据用途选择 CSV（表格分析）、JSON（嵌套结构）或数据库（长期与增量）。编码统一用 utf-8。',
      diagramId: 'spider-pipeline', diagramCaption: '提取之后还有清洗与存储两步，缺一不可',
      analogy: { title: '买菜与洗菜', md: '抓取像把菜从地里拔出来，带着泥。清洗是择菜、洗菜、切段；保存是分袋冷藏。不洗就下锅，再好的菜也难吃；不分袋，下一次又会重复买。' },
      points: [
        { title: '一、先定义字段再抓', md: '动手前先写出目标表头，例如标题、价格、日期、链接。字段定义清楚，提取和清洗才有统一标准，也能避免抓回大量用不上、又要二次清理的内容。' },
        { title: '二、文本清洗的基本动作', md: '用 `strip()` 去首尾空白，用正则压缩连续空格，去掉「￥」「起」等单位，把「1,299」转成数字 1299。清洗要写成固定函数，保证每一批数据的处理规则完全一致。' },
        { title: '三、缺失与异常值', md: '缺失写空字符串或 None，不要写「无」再混进数值列。数值转换失败要捕获异常并记录原始值，方便回查；不能静默丢数据，也不能用 0 冒充缺失值。' },
        { title: '四、CSV 的正确写法', md: '用 `csv.writer` 写入，`open` 时指定 `newline=""` 和 `encoding="utf-8"`。字段含逗号、引号、换行时，writer 会自动转义。' },
        { title: '五、JSON 与中文', md: '`json.dump(obj, f, ensure_ascii=False, indent=2)` 保留中文并美化输出。嵌套结构用 JSON 比 CSV 更自然。' },
        { title: '六、数据库与去重', md: '长期采集用 SQLite 或 MySQL，给链接或业务主键加唯一索引，用 `INSERT OR IGNORE` 或先查后写实现幂等，避免重复入库。' },
        { title: '七、增量与可恢复', md: '记录已抓页码、最后时间或最大 id，中断后从断点继续。每次运行写日志，失败条目单独存放，方便补抓而不是全量重跑；增量与日志是长期采集的两个轮子。' }
      ],
      table: {
        headers: ['格式', '适合什么', '注意点'],
        rows: [
          ['CSV', '二维表格、Excel 分析', '用 csv.writer，指定 utf-8'],
          ['JSON', '嵌套结构、接口数据', 'ensure_ascii=False'],
          ['SQLite', '长期保存、需要查询去重', '给主键加唯一索引'],
          ['Excel', '交付给非技术同事', '数据量大时先转 CSV'],
          ['日志文件', '记录失败与断点', '按天切分，便于补抓']
        ]
      },
      code: 'import csv\n\nrows = [["title", "price"], ["书", "30"], ["笔", "5"]]\nwith open("out.csv", "w", newline="", encoding="utf-8") as f:\n    writer = csv.writer(f)\n    writer.writerows(rows)\n\nprint("已写入", len(rows) - 1, "条")',
      warning: '用 "w" 模式打开文件会清空原数据。长期采集应改为追加或入库，并用唯一键做幂等，避免重复与误删。',
      tip: '先把 10 条数据清洗到完全干净，再批量跑一万条。返工成本永远比重跑低。',
      quizIds: ['spy-store-1', 'spy-store-2', 'spy-store-3', 'spy-store-4'],
      example: {
        title: '把价格字符串变成数字',
        steps: [
          { md: '原始字段是「￥1,299 起」，先 `strip()` 去空白。' },
          { md: '去掉货币符号与「起」字，得到 `1,299`。' },
          { md: '去掉千分位逗号，得到 `1299`。' },
          { md: '用 `int()` 转换，失败则记录原始值并置空。' }
        ],
        takeaway: '清洗是一条链：去空白 → 去单位 → 去分隔符 → 转类型 → 处理失败。'
      },
      example2: {
        title: '用 SQLite 做增量去重',
        steps: [
          { md: '建表时为链接字段加 UNIQUE 约束。' },
          { md: '写入时用 `INSERT OR IGNORE`，重复链接自动跳过。' },
          { md: '每次运行前查询最大 id 或最后时间，确定起点。' },
          { md: '运行结束记录本次抓取数量与失败数量。' }
        ],
        takeaway: '唯一键负责不重复，断点负责不重跑，日志负责可追查。'
      },
      guided: [{ questionId: 'spy-store-1', hint: '关键词是「字段里可能有逗号和引号」。' }],
      solo: ['spy-store-2', 'spy-store-3'],
      challenge: ['spy-store-4'],
      summary: {
        essence: '抓取只是原料；清洗统一格式与类型，CSV / JSON / 数据库按用途选择，编码统一 utf-8。',
        formulas: ['csv.writer + open(newline="", encoding="utf-8")', 'json.dump(obj, f, ensure_ascii=False)', 'INSERT OR IGNORE 实现幂等'],
        pitfalls: ['用 w 模式误删历史数据', '数值列混入文字', '忘记 utf-8 导致乱码', '没有唯一键导致重复入库'],
        checklist: ['我能定义并清洗字段', '我会用 csv.writer 写表', '我会用 ensure_ascii=False 存中文', '我知道如何做增量与去重']
      },
      feynman: '请用买菜洗菜的比喻，说明抓取、清洗、保存三者的区别，并举例说明不清洗会出什么问题。'
    }),

    Z.makeLesson({
      id: 'spy-ethics-L1', kpIds: ['spy-ethics'], subject: 'cs', level: 1,
      title: '合规与数据伦理：技术的边界',
      estMinutes: 35,
      hookTitle: '技术上抓得到，就等于可以抓吗？',
      hookBody: '不等于。能不能抓取决于授权、数据性质和对他人服务的影响。很多爬虫事故不是因为代码写错，而是因为一开始就跨过了不该跨的边界。',
      idea: '合规抓取的判断可以拆成三问：**有没有被允许**（robots、条款、授权）、**该不该收**（公开、必要、非敏感）、**会不会造成伤害**（频率、存储、二次使用）。三问有一个不过关，就应该停。',
      diagramId: 'spider-pipeline', diagramCaption: '合规检查应嵌在流水线最前面，而不是出事后再补',
      analogy: { title: '借邻居的院子', md: '邻居把院子门开着，不代表你可以进去搬东西。看一眼是访客，批量搬走就是侵占。爬虫也一样：公开可见是「能看」，不等于「能批量收集和使用」。' },
      points: [
        { title: '一、授权是第一步', md: '先看 robots.txt，再看网站条款与版权声明。明确禁止或需要付费授权的内容不抓；有官方 API 就优先用 API。' },
        { title: '二、公开不等于可随意使用', md: '公开可见的数据仍可能受著作权与个人信息保护约束。批量复制、转卖、二次发布，都可能超出合理使用范围；使用前要确认授权与用途，而不是只看「能不能访问」。' },
        { title: '三、最小必要原则', md: '只采集完成业务所必需的字段。手机号、身份证号、住址、位置轨迹等敏感信息，没有明确授权一律不碰；字段越少，泄露后的影响面越小，合规成本也越低。' },
        { title: '四、频率影响可用性', md: '高频请求会占用带宽与计算资源，严重时等同攻击。控制并发、加间隔、夜间错峰，是对他人服务的基本尊重；抓取计划里应写明速率上限，而不是靠临时感觉。' },
        { title: '五、存储也要守规矩', md: '数据保存在哪里、谁能访问、保存多久，都要有约束。任务结束后及时删除临时数据，不把原始个人信息长期留在本地；确需保留时要脱敏，并限制访问范围。' },
        { title: '六、拒绝的信号要读懂', md: '验证码、登录跳转、付费墙、429 与 403，都是明确的边界提示。正确动作是停止或申请授权，而不是换代理、破解或伪装；读懂拒绝信号，比提高技术更重要。' },
        { title: '七、留下可追溯的记录', md: '记录抓取目的、范围、时间与频率，保留授权依据。出问题时能说明自己做了什么、依据是什么，也是合规的一部分；没有记录的抓取，事后很难自证清白。' }
      ],
      table: {
        headers: ['场景', '是否可抓', '正确做法'],
        rows: [
          ['公开公告、开放数据', '通常可以', '遵守 robots，控制频率'],
          ['需登录才能看的内容', '不可以', '申请授权或使用官方 API'],
          ['付费墙后的内容', '不可以', '购买授权，不绕过'],
          ['含手机号等个人信息', '原则上不抓', '最小必要，取得同意'],
          ['明确禁止自动采集', '不可以', '停止或书面申请']
        ]
      },
      code: 'import time\nimport requests\n\n# 只抓公开、允许抓取的字段；不采集手机号、身份证等个人信息\nurl = "https://example.com/public/notices"\nr = requests.get(url, timeout=5)\ntime.sleep(2)\nprint(r.status_code, len(r.text))',
      warning: '不要以「只抓一点点」「技术中立」为理由绕过限制。违规采集个人信息、破解付费墙，可能承担法律责任。',
      tip: '把合规检查写进流程：抓取前确认授权，抓取中限速，抓取后最小化存储并定期清理。',
      quizIds: ['spy-ethics-1', 'spy-ethics-2', 'spy-ethics-3', 'spy-ethics-4'],
      example: {
        title: '用三问判断一个抓取需求',
        steps: [
          { md: '第一问：robots 与条款是否允许？不允许就停。' },
          { md: '第二问：数据是否公开、是否含个人信息？含敏感信息就缩小字段。' },
          { md: '第三问：请求量会不会影响对方服务？会就降频或错峰。' },
          { md: '三问都过关才写代码，并把授权依据与频率写进项目记录。' }
        ],
        takeaway: '合规不是事后补救，而是动手前的三道闸门。'
      },
      example2: {
        title: '遇到验证码时怎么办',
        steps: [
          { md: '确认页面是否本来就要求人机验证。' },
          { md: '判断目标内容是否属于公开可抓范围。' },
          { md: '不尝试破解或购买打码服务。' },
          { md: '停止抓取，寻找官方 API 或联系站点申请授权。' }
        ],
        takeaway: '验证码是明确的拒绝信号，不是待攻克的技术难题。'
      },
      guided: [{ questionId: 'spy-ethics-2', hint: '条款明确禁止时，任何技术手段都不能改变「不允许」这个事实。' }],
      solo: ['spy-ethics-1', 'spy-ethics-3'],
      challenge: ['spy-ethics-4'],
      summary: {
        essence: '合规看三件事：是否被允许、是否该收集、是否造成伤害；任一不过关就停止。',
        formulas: ['三问：授权 → 必要性 → 影响', '最小必要：只收业务必需字段', '拒绝信号：403 / 429 / 验证码 / 登录跳转'],
        pitfalls: ['把公开可见当免费可用', '用「量小」自我免责', '破解验证码或付费墙', '长期保存不必要的个人信息'],
        checklist: ['我会先查 robots 与条款', '我理解最小必要原则', '我知道验证码意味着停止', '我能为抓取保留授权与频率记录']
      },
      feynman: '请用「邻居院子门开着」的比喻，解释公开可见与可以批量收集之间的区别。'
    })
  );
})(window.ZSB = window.ZSB || {});
