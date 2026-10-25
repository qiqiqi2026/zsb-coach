/* 第三批图解：新增计算机模块的可视化（11 张） */
(function (Z) {
  var C = { text: '#dbe3f5', dim: '#8b95ab', line: '#3a4358', box: '#171b26', accent: '#7c9cff', green: '#4ec9a2', amber: '#f0b45f', red: '#ff7b8a', purple: '#b28dff' };

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function t(x, y, s, size, anchor, fill, weight) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" text-anchor="' + (anchor || 'start') +
      '" fill="' + (fill || C.text) + '" font-weight="' + (weight || 500) + '" font-family="-apple-system,Segoe UI,sans-serif">' + esc(s) + '</text>';
  }
  function r(x, y, w, h, label, fill, stroke, size) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="' + (fill || C.box) +
      '" stroke="' + (stroke || C.line) + '" stroke-width="1.2"/>' +
      (label ? t(x + w / 2, y + h / 2 + 5, label, size || 13, 'middle') : '');
  }
  function arrow(x1, y1, x2, y2, label, color) {
    var col = color || C.dim;
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + col + '" stroke-width="1.4"/>' +
      '<polygon points="' + x2 + ',' + y2 + ' ' + (x2 - 6) + ',' + (y2 - 9) + ' ' + (x2 + 6) + ',' + (y2 - 9) + '" fill="' + col + '"/>' +
      (label ? t((x1 + x2) / 2, (y1 + y2) / 2 - 6, label, 11, 'middle', C.dim) : '');
  }
  function svg(inner, h) { return '<svg viewBox="0 0 640 ' + (h || 300) + '" class="diagram-svg" role="img">' + inner + '</svg>'; }
  function frame(title) { return '<div class="diagram-title">' + esc(title) + '</div>'; }

  var D = Z.DIAGRAMS = Z.DIAGRAMS || {};

  D['python-run'] = {
    caption: 'Python 不是「直接读中文」，而是先编译成字节码，再由解释器执行',
    svg: frame('一行代码的一生') + svg(
      r(40, 120, 130, 56, '源码 .py') +
      r(210, 120, 130, 56, '字节码 .pyc') +
      r(380, 120, 130, 56, '解释器执行') +
      r(550, 120, 70, 56, '结果') +
      arrow(170, 148, 210, 148) + arrow(340, 148, 380, 148) + arrow(510, 148, 550, 148) +
      t(40, 205, '你写的代码', 12, 'start', C.dim) +
      t(210, 205, '编译一次，缓存起来', 12, 'start', C.dim) +
      t(380, 205, '逐条翻译并运行', 12, 'start', C.dim) +
      t(550, 205, 'print 输出', 12, 'start', C.dim) +
      r(120, 232, 400, 36, '解释器 = 一个按字节码干活的「翻译官」', '#101522', C.line, 12), 300)
  };

  D['py-ref'] = {
    caption: '变量是贴纸，不是盒子；不可变对象改不了，只能换一张贴纸',
    svg: frame('Python 的变量与对象') + svg(
      r(50, 90, 110, 50, "a = [1,2]") +
      r(50, 190, 110, 50, 'b = a') +
      r(300, 130, 150, 70, '同一块内存 [1,2]', '#1a2233', C.accent) +
      arrow(160, 115, 300, 150) + arrow(160, 215, 300, 180) +
      t(250, 255, 'a 和 b 指向同一个对象：改 b 也会看到 a 变了', 12, 'middle', C.amber) +
      r(500, 95, 110, 50, 'c = 3') +
      r(500, 190, 110, 50, 'c = c + 1') +
      arrow(555, 145, 555, 190, '换新对象', C.green), 300)
  };

  D['dom-tree'] = {
    caption: '浏览器把 HTML 读成一棵树，CSS 决定这棵树每个节点长什么样',
    svg: frame('HTML → DOM 树') + svg(
      r(270, 40, 110, 44, 'html') +
      r(150, 120, 110, 44, 'head') + r(380, 120, 110, 44, 'body') +
      r(80, 200, 100, 40, 'title') + r(330, 200, 100, 40, 'h1') + r(450, 200, 100, 40, 'p') +
      arrow(315, 84, 205, 120) + arrow(345, 84, 425, 120) +
      arrow(195, 164, 130, 200) + arrow(410, 164, 380, 200) + arrow(445, 164, 490, 200) +
      t(80, 275, '每个标签 = 一个节点；父子关系 = 树枝', 12, 'start', C.dim), 300)
  };

  D['css-box'] = {
    caption: '盒模型：内容 → 内边距 → 边框 → 外边距，一层套一层',
    svg: frame('CSS 盒模型') + svg(
      '<rect x="80" y="40" width="480" height="220" rx="8" fill="#101522" stroke="#3a4358" stroke-dasharray="6 4"/>' +
      '<rect x="130" y="80" width="380" height="140" rx="6" fill="#171b26" stroke="#f0b45f" stroke-width="2"/>' +
      '<rect x="175" y="112" width="290" height="76" rx="6" fill="#1a2233" stroke="#7c9cff" stroke-width="2"/>' +
      t(320, 155, 'content 内容', 14, 'middle') +
      t(320, 128, 'padding 内边距', 11, 'middle', C.accent) +
      t(320, 232, 'border 边框', 11, 'middle', C.amber) +
      t(320, 40, 'margin 外边距', 11, 'middle', C.dim) +
      t(600, 155, '总宽 =', 12, 'middle', C.dim), 300)
  };

  D['js-eventloop'] = {
    caption: '同步代码先跑完，异步回调排队等主线程空出来',
    svg: frame('事件循环：谁先执行？') + svg(
      r(40, 90, 150, 120, '调用栈\n同步代码') +
      r(250, 90, 150, 120, '任务队列\nsetTimeout / 点击') +
      r(470, 90, 130, 120, '事件循环\n搬任务') +
      arrow(190, 150, 250, 150, '空栈后') + arrow(400, 150, 470, 150) +
      t(40, 250, '口诀：同步先走，异步靠后；微任务比宏任务更靠前。', 12, 'start', C.amber), 300)
  };

  D['http-cycle'] = {
    caption: '一次网页访问：DNS 找地址 → TCP 建连接 → HTTP 发请求 → 服务器响应',
    svg: frame('从输入网址到看到页面') + svg(
      r(30, 110, 110, 60, '浏览器') +
      r(180, 110, 100, 60, 'DNS') +
      r(320, 110, 90, 60, 'TCP') +
      r(450, 110, 100, 60, 'HTTP') +
      r(575, 110, 60, 60, '服务器') +
      arrow(140, 140, 180, 140) + arrow(280, 140, 320, 140) + arrow(410, 140, 450, 140) + arrow(550, 140, 575, 140) +
      t(30, 205, '域名→IP', 11, 'start', C.dim) + t(180, 205, '三次握手', 11, 'start', C.dim) +
      t(320, 205, '请求头+请求体', 11, 'start', C.dim) + t(470, 205, '状态码+响应体', 11, 'start', C.dim), 300)
  };

  D['sql-join'] = {
    caption: 'JOIN 的本质：按某个共同字段，把两张表的行拼在一起',
    svg: frame('两张表怎么拼起来') + svg(
      r(40, 70, 160, 130, 'users\nid  name\n1   张三\n2   李四') +
      r(260, 70, 200, 130, 'orders\nuid  goods\n1    书\n1    笔\n3    本') +
      r(500, 70, 110, 130, '结果\n张三-书\n张三-笔', '#1a2233', C.green) +
      arrow(200, 135, 260, 135, 'ON users.id = orders.uid', C.accent) +
      t(40, 245, 'uid=3 的订单没有匹配用户，内连接会被丢掉；左连接会保留它。', 12, 'start', C.amber), 300)
  };

  D['git-flow'] = {
    caption: 'Git 的三块地盘：工作区改文件，暂存区挑改动，仓库存历史',
    svg: frame('Git 的三个区域') + svg(
      r(50, 110, 150, 80, '工作区\n你正在改') +
      r(260, 110, 150, 80, '暂存区\n挑本次要提交') +
      r(470, 110, 120, 80, '本地仓库\n有历史') +
      arrow(200, 150, 260, 150, 'git add') + arrow(410, 150, 470, 150, 'git commit') +
      t(50, 235, 'git push 把本地仓库同步到远程；git pull 反过来。', 12, 'start', C.dim), 300)
  };

  D['spider-pipeline'] = {
    caption: '爬虫是一条流水线：取页面 → 解析 → 清洗 → 存储',
    svg: frame('爬虫流水线') + svg(
      r(30, 110, 120, 70, '请求页面') +
      r(180, 110, 120, 70, '解析 HTML') +
      r(330, 110, 120, 70, '提取字段') +
      r(480, 110, 120, 70, '保存数据') +
      arrow(150, 145, 180, 145) + arrow(300, 145, 330, 145) + arrow(450, 145, 480, 145) +
      t(30, 220, '先看 robots.txt 与网站条款；控制频率，别把人家服务器打挂。', 12, 'start', C.amber) +
      t(30, 250, 'requests 负责取，BeautifulSoup 负责解析，pandas / json 负责存。', 12, 'start', C.dim), 300)
  };

  D['sec-triad'] = {
    caption: '安全的三条底线：机密性、完整性、可用性',
    svg: frame('CIA 三要素与常见威胁') + svg(
      r(60, 90, 140, 70, '机密性\n不被偷看', '#171b26', C.accent) +
      r(250, 90, 140, 70, '完整性\n不被篡改', '#171b26', C.green) +
      r(440, 90, 140, 70, '可用性\n随时能用', '#171b26', C.amber) +
      t(60, 195, '泄露 ← 弱口令 / 明文传输', 11, 'start', C.dim) +
      t(250, 195, '篡改 ← 中间人 / 越权写入', 11, 'start', C.dim) +
      t(440, 195, '瘫痪 ← DDoS / 勒索软件', 11, 'start', C.dim) +
      t(60, 235, '防御顺序：先加密与鉴权，再校验完整性，最后做限流与备份。', 12, 'start', C.text), 300)
  };

  D['cookie-token'] = {
    caption: 'Cookie / Session / Token 都在解决同一件事：让服务器认出你',
    svg: frame('登录状态存在哪？') + svg(
      r(40, 70, 160, 110, '浏览器\nCookie') +
      r(260, 70, 150, 110, '服务器\nSession 表') +
      r(460, 70, 150, 110, 'Token\n自带签名') +
      arrow(200, 100, 260, 100, 'sessionid') + arrow(260, 150, 200, 150, '查表') +
      arrow(320, 200, 460, 200, '无状态校验', C.green) +
      t(40, 245, 'Session 存服务器，Token 存客户端但要防 XSS；密码永远不要明文存。', 12, 'start', C.amber), 300)
  };
})(window.ZSB = window.ZSB || {});
