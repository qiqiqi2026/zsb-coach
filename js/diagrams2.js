/* 第二批图解：扩展考点的可视化（18 张） */
(function (Z) {
  var C = { text: '#dbe3f5', dim: '#8b95ab', line: '#3a4358', box: '#171b26', accent: '#7c9cff', green: '#4ec9a2', amber: '#f0b45f', red: '#ff7b8a' };

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
  function svg(inner, h) {
    return '<svg viewBox="0 0 640 ' + (h || 300) + '" class="diagram-svg" role="img">' + inner + '</svg>';
  }
  function frame(title) { return '<div class="diagram-title">' + esc(title) + '</div>'; }

  var D = Z.DIAGRAMS = Z.DIAGRAMS || {};

  D['article-map'] = {
    caption: '先判断「特指还是泛指」，再判断「可数还是不可数」',
    svg: frame('冠词四选一') + svg(
      r(20, 40, 150, 54, '名词短语', C.box, C.accent) +
      arrow(170, 67, 235, 67) +
      r(235, 30, 170, 74, '说话人能否确定？', C.box, C.line, 12) +
      arrow(405, 55, 465, 45, '能', C.green) +
      arrow(405, 82, 465, 145, '不能', C.amber) +
      r(465, 20, 150, 52, 'the', '#1c2333', C.green, 15) +
      r(465, 118, 150, 52, '可数单数？', C.box, C.line, 12) +
      arrow(540, 170, 540, 205, '是', C.green) +
      arrow(615, 144, 615, 205, '否', C.amber) +
      r(465, 205, 150, 52, 'a / an', '#1c2333', C.accent, 15) +
      r(465, 268, 150, 40, '零冠词', C.box, C.line, 13) +
      t(20, 140, 'a / an 看的是「读音的第一个音素」，不是首字母：', 12, 'start', C.dim) +
      t(20, 162, 'an hour（元音音素）  /  a university（辅音音素）', 12, 'start', C.text) +
      t(20, 196, '固定搭配：have breakfast / go to school / by bus（零冠词）', 12, 'start', C.dim)
      , 320)
  };

  D['modal-map'] = {
    caption: '情态动词后永远接动词原形',
    svg: frame('按「语气强度」排一排') + svg(
      t(20, 30, '能力 / 许可', 12, 'start', C.dim) +
      r(20, 44, 130, 48, 'can / could', C.box, C.accent, 14) +
      t(20, 120, '推测（可能）', 12, 'start', C.dim) +
      r(20, 134, 130, 48, 'may / might', C.box, C.green, 14) +
      t(20, 210, '建议 / 义务', 12, 'start', C.dim) +
      r(20, 224, 130, 48, 'should / ought to', C.box, C.amber, 14) +
      t(20, 300, '强制（必须）', 12, 'start', C.dim) +
      r(20, 314, 130, 48, 'must', C.box, C.red, 14) +
      arrow(150, 68, 210, 68) + arrow(150, 158, 210, 158) + arrow(150, 248, 210, 248) + arrow(150, 338, 210, 338) +
      r(210, 40, 210, 330, '', 'none', C.line) +
      t(315, 90, 'must be = 一定是', 13, 'middle', C.text) +
      t(315, 140, 'can\'t be = 不可能是', 13, 'middle', C.text) +
      t(315, 190, 'may be = 可能是', 13, 'middle', C.text) +
      t(315, 240, 'must have done = 过去一定做过', 13, 'middle', C.text) +
      t(315, 290, 'needn\'t = 不必（不是不能）', 13, 'middle', C.text) +
      r(450, 150, 170, 70, '情态动词 + 原形', '#1c2333', C.accent, 14) +
      arrow(420, 205, 450, 185)
      , 380)
  };

  D['comparison-scale'] = {
    caption: '比较级用于两者，最高级用于三者及以上',
    svg: frame('比较的三个刻度') + svg(
      '<line x1="60" y1="120" x2="580" y2="120" stroke="' + C.line + '" stroke-width="2"/>' +
      '<polygon points="580,120 568,114 568,126" fill="' + C.line + '"/>' +
      r(60, 70, 120, 40, '原级', C.box, C.accent) +
      r(250, 70, 120, 40, '比较级', C.box, C.green) +
      r(440, 70, 120, 40, '最高级', C.box, C.amber) +
      t(120, 145, 'tall', 12, 'middle', C.dim) +
      t(310, 145, 'taller', 12, 'middle', C.dim) +
      t(500, 145, 'tallest', 12, 'middle', C.dim) +
      t(60, 190, '标志：than / as … as / much + 比较级', 12, 'start', C.text) +
      t(60, 216, '最高级前通常加 the，后接 in / of 范围', 12, 'start', C.text) +
      t(60, 242, 'the more you read, the more you know（越…越…）', 12, 'start', C.amber) +
      t(60, 268, '注意：比较对象要一致，不能拿自己和「别人的东西」比', 12, 'start', C.dim)
      , 300)
  };

  D['future-timeline'] = {
    caption: 'will 偏「临时决定」，be going to 偏「已有计划」',
    svg: frame('时间轴上的两个未来') + svg(
      '<line x1="60" y1="150" x2="580" y2="150" stroke="' + C.line + '" stroke-width="2"/>' +
      '<polygon points="580,150 568,144 568,156" fill="' + C.line + '"/>' +
      t(65, 140, 'now', 12, 'start', C.accent) +
      r(360, 80, 200, 48, 'will do（临时决定）', C.box, C.accent, 13) +
      r(360, 190, 220, 48, 'be going to do（早已计划）', C.box, C.green, 13) +
      arrow(380, 128, 380, 146) + arrow(400, 190, 400, 160) +
      t(60, 240, '时间状语从句：主将从现', 12, 'start', C.amber) +
      t(60, 264, 'When he comes, I will tell him.（不是 when he will come）', 12, 'start', C.text)
      , 300)
  };

  D['inversion-box'] = {
    caption: '把助动词/be 提到主语前面，就是倒装',
    svg: frame('正常语序 ⇄ 倒装语序') + svg(
      r(30, 50, 250, 46, '主语 + 助动词 + 动词', C.box, C.accent, 13) +
      r(30, 130, 250, 46, 'I have never seen it.', C.box, C.line, 12) +
      arrow(280, 153, 340, 153, '', C.amber) +
      r(340, 130, 270, 46, 'Never have I seen it.', '#1c2333', C.green, 12) +
      t(30, 210, '触发倒装的信号：', 12, 'start', C.dim) +
      t(30, 234, '否定词 never / hardly / not only / no sooner', 12, 'start', C.text) +
      t(30, 258, 'only + 状语 Only then did I understand.', 12, 'start', C.text) +
      t(30, 282, 'so / neither 开头 So do I. / Neither did he.', 12, 'start', C.text) +
      t(30, 306, 'as 让步：Child as he is, he knows a lot.', 12, 'start', C.text)
      , 330)
  };

  D['cloze-flow'] = {
    caption: '完形是先补全一篇短文，不是逐空翻译',
    svg: frame('完形四步法') + svg(
      r(20, 40, 140, 56, '① 通读抓主线', C.box, C.accent, 12) +
      arrow(160, 68, 205, 68) +
      r(205, 40, 140, 56, '② 看搭配', C.box, C.green, 12) +
      arrow(345, 68, 390, 68) +
      r(390, 40, 140, 56, '③ 看逻辑', C.box, C.amber, 12) +
      arrow(530, 68, 575, 68) +
      r(500, 130, 120, 56, '④ 复现检查', C.box, C.accent, 12) +
      t(20, 150, '线索一：固定搭配', 12, 'start', C.text) +
      t(20, 174, 'depend ___ → on；look forward ___ → to', 12, 'start', C.dim) +
      t(20, 200, '线索二：逻辑关系', 12, 'start', C.text) +
      t(20, 224, 'but / however 转折；because / so 因果', 12, 'start', C.dim) +
      t(20, 250, '线索三：原词复现', 12, 'start', C.text) +
      t(20, 274, '上下文中出现过近义词，优先选它', 12, 'start', C.dim)
      , 300)
  };

  D['function-machine'] = {
    caption: '函数是「输入 → 规则 → 输出」的机器',
    svg: frame('函数像一台加工机') + svg(
      r(40, 90, 130, 60, '输入 x', C.box, C.accent, 14) +
      arrow(170, 120, 245, 120, 'f') +
      r(245, 60, 170, 120, '规则 f(x)', C.box, C.green, 14) +
      arrow(415, 120, 490, 120) +
      r(490, 90, 120, 60, '输出 y', C.box, C.amber, 14) +
      t(40, 200, '定义域：允许输入的 x 的集合', 12, 'start', C.text) +
      t(40, 226, '值域：所有可能输出的 y 的集合', 12, 'start', C.text) +
      t(40, 252, '一个 x 只能对应一个 y，才叫函数', 12, 'start', C.amber) +
      t(40, 278, '求定义域四查：分母≠0、根号内≥0、对数真数>0、实际问题', 12, 'start', C.dim)
      , 300)
  };

  D['infinitesimal-compare'] = {
    caption: '等价替换只能整体乘除，加减里换容易出错',
    svg: frame('等价无穷小：能换与不能换') + svg(
      r(30, 50, 280, 56, 'x→0 时 sin x ~ x', C.box, C.green, 13) +
      r(30, 120, 280, 56, 'tan x ~ x，1−cos x ~ x²/2', C.box, C.green, 13) +
      r(30, 190, 280, 56, 'ln(1+x) ~ x，e^x−1 ~ x', C.box, C.green, 13) +
      r(350, 50, 260, 70, '✓ 乘除可替换', '#1c2333', C.green, 13) +
      r(350, 140, 260, 70, '✗ 加减慎替换', '#241a1f', C.red, 13) +
      t(350, 245, 'sin x − x 不能换成 x − x = 0', 12, 'start', C.dim) +
      t(350, 269, '要用泰勒展开：sin x − x ~ −x³/6', 12, 'start', C.dim) +
      t(350, 293, '原则：整体因子才等价替换', 12, 'start', C.amber)
      , 310)
  };

  D['chain-rule'] = {
    caption: '链式法则：像剥洋葱，一层一层往外乘',
    svg: frame('复合函数求导') + svg(
      r(40, 40, 220, 60, 'y = f(g(x))', C.box, C.accent, 14) +
      arrow(260, 70, 330, 70, '拆') +
      r(330, 20, 260, 44, '外层 f(u)', C.box, C.green, 13) +
      r(330, 80, 260, 44, '内层 u = g(x)', C.box, C.amber, 13) +
      t(40, 150, 'y′ = f′(u) · g′(x)', 16, 'start', C.text, 700) +
      t(40, 186, '例：y = sin(2x)', 12, 'start', C.dim) +
      t(40, 212, '外层 sin 的导数是 cos(2x)，内层 2x 的导数是 2', 12, 'start', C.text) +
      t(40, 238, '所以 y′ = 2cos(2x)', 12, 'start', C.green) +
      t(40, 274, '隐函数：两边同时对 x 求导，把 y 当 y(x)，最后解出 y′', 12, 'start', C.dim)
      , 300)
  };

  D['mvt-secant'] = {
    caption: '拉格朗日中值定理：某点的切线斜率等于两端割线斜率',
    svg: frame('割线与切线平行') + svg(
      '<path d="M60,230 C160,120 300,90 560,170" fill="none" stroke="' + C.accent + '" stroke-width="2"/>' +
      '<line x1="120" y1="196" x2="480" y2="140" stroke="' + C.dim + '" stroke-dasharray="5 4"/>' +
      '<line x1="300" y1="120" x2="420" y2="140" stroke="' + C.green + '" stroke-width="2"/>' +
      '<circle cx="360" cy="130" r="4" fill="' + C.green + '"/>' +
      t(90, 260, '割线斜率 = [f(b)−f(a)] / (b−a)', 12, 'start', C.dim) +
      t(300, 100, '存在 ξ 使 f′(ξ) 等于割线斜率', 12, 'middle', C.green) +
      t(60, 290, '罗尔定理是 f(a)=f(b) 的特例：此时切线水平', 12, 'start', C.text)
      , 310)
  };

  D['integral-methods'] = {
    caption: '换元法处理「复合结构」，分部积分处理「两类函数相乘」',
    svg: frame('积分两大路线') + svg(
      r(20, 40, 280, 70, '换元法', C.box, C.green, 15) +
      r(20, 130, 280, 46, 'u = g(x)，du = g′(x)dx', C.box, C.line, 12) +
      r(20, 190, 280, 46, '适用于：根式、复合、分母', C.box, C.line, 12) +
      r(340, 40, 280, 70, '分部积分', C.box, C.amber, 15) +
      r(340, 130, 280, 46, '∫u dv = uv − ∫v du', C.box, C.line, 12) +
      r(340, 190, 280, 46, '适用于：x·eˣ、x·sin x、x·ln x', C.box, C.line, 12) +
      t(20, 265, '选 u 的顺序：反三角 → 对数 → 幂 → 指数 → 三角（反对幂指三）', 11, 'start', C.dim) +
      t(20, 290, '定积分换元时，上下限也要跟着换：x=a → u=g(a)', 11, 'start', C.amber)
      , 310)
  };

  D['partial-surface'] = {
    caption: '偏导数就是「只让一个变量动，另一个按住不动」',
    svg: frame('曲面上的两个方向') + svg(
      '<ellipse cx="320" cy="150" rx="220" ry="80" fill="none" stroke="' + C.line + '"/>' +
      '<path d="M100,150 Q320,20 540,150" fill="none" stroke="' + C.accent + '" stroke-width="2"/>' +
      '<path d="M320,70 Q220,150 320,230" fill="none" stroke="' + C.green + '" stroke-width="2" stroke-dasharray="6 4"/>' +
      r(60, 40, 200, 44, '∂z/∂x：沿 x 方向切', C.box, C.accent, 12) +
      r(380, 220, 210, 44, '∂z/∂y：沿 y 方向切', C.box, C.green, 12) +
      t(60, 280, '全微分 dz = ∂z/∂x·dx + ∂z/∂y·dy（两个方向的变化叠加）', 11, 'start', C.dim)
      , 300)
  };

  D['number-convert'] = {
    caption: '十进制转其他进制用「除基取余」，反过来用「按权展开」',
    svg: frame('进制转换的两条路') + svg(
      r(30, 40, 240, 60, '十进制 45', C.box, C.accent, 14) +
      arrow(270, 70, 340, 70, '÷2 取余', C.dim) +
      r(340, 40, 260, 60, '101101', '#1c2333', C.green, 16) +
      t(30, 135, '45 ÷ 2 = 22 余 1  ← 最低位', 11, 'start', C.dim) +
      t(30, 158, '22 ÷ 2 = 11 余 0', 11, 'start', C.dim) +
      t(30, 181, '11 ÷ 2 = 5  余 1', 11, 'start', C.dim) +
      t(30, 204, '5 ÷ 2 = 2   余 1', 11, 'start', C.dim) +
      t(30, 227, '2 ÷ 2 = 1   余 0', 11, 'start', C.dim) +
      t(30, 250, '1 ÷ 2 = 0   余 1  ← 最高位', 11, 'start', C.dim) +
      t(340, 135, '二进制 → 十进制：按权展开', 12, 'start', C.text) +
      t(340, 161, '1×32 + 0×16 + 1×8 + 1×4 + 0×2 + 1×1 = 45', 11, 'start', C.green) +
      t(340, 195, '十六进制：每 4 位二进制一组', 12, 'start', C.text) +
      t(340, 221, '1011 1101 → B D → 0xBD', 11, 'start', C.amber)
      , 280)
  };

  D['os-layer'] = {
    caption: '操作系统是硬件与应用之间的「管家」',
    svg: frame('操作系统管三件事') + svg(
      r(170, 20, 300, 52, '应用程序 / 用户', C.box, C.accent, 14) +
      arrow(320, 72, 320, 102) +
      r(90, 102, 460, 62, '操作系统', '#1c2333', C.green, 15) +
      arrow(200, 164, 200, 196) + arrow(320, 164, 320, 196) + arrow(440, 164, 440, 196) +
      r(90, 196, 180, 54, '进程调度', C.box, C.line, 13) +
      r(230, 196, 180, 54, '内存管理', C.box, C.line, 13) +
      r(370, 196, 180, 54, '文件系统', C.box, C.line, 13) +
      t(20, 280, '进程 = 运行中的程序（有独立内存）；线程 = 进程里的执行流（共享内存）', 11, 'start', C.dim)
      , 300)
  };

  D['network-layers'] = {
    caption: '数据从应用层一层层封装，到了对面再一层层拆开',
    svg: frame('TCP/IP 四层模型') + svg(
      r(30, 30, 180, 46, '应用层 HTTP/DNS', C.box, C.accent, 12) +
      r(30, 88, 180, 46, '传输层 TCP/UDP', C.box, C.green, 12) +
      r(30, 146, 180, 46, '网络层 IP', C.box, C.amber, 12) +
      r(30, 204, 180, 46, '链路层 以太网', C.box, C.line, 12) +
      r(280, 30, 300, 220, '', 'none', C.line) +
      t(310, 66, 'HTTP：网页请求/响应', 12, 'start', C.text) +
      t(310, 98, 'DNS：域名 → IP', 12, 'start', C.text) +
      t(310, 130, 'TCP：可靠、有连接、三次握手', 12, 'start', C.text) +
      t(310, 162, 'UDP：快、无连接、不保证到达', 12, 'start', C.text) +
      t(310, 194, 'IP：寻址与路由', 12, 'start', C.text) +
      t(310, 226, '端口：区分同一台机器上的不同服务', 12, 'start', C.text)
      , 280)
  };

  D['operator-precedence'] = {
    caption: '先算括号，再算一元，再乘除，最后加减',
    svg: frame('表达式求值顺序') + svg(
      r(30, 40, 120, 48, '() 括号', C.box, C.red, 12) +
      arrow(150, 64, 190, 64) +
      r(190, 40, 120, 48, '! ++ --', C.box, C.amber, 12) +
      arrow(310, 64, 350, 64) +
      r(350, 40, 130, 48, '* / %', C.box, C.green, 12) +
      arrow(480, 64, 520, 64) +
      r(520, 40, 100, 48, '+ -', C.box, C.accent, 12) +
      t(30, 140, '短路求值：a && b，a 为假就不看 b；a || b，a 为真就不看 b', 12, 'start', C.text) +
      t(30, 168, 'let i = 1; i++ + ++i → 1 + 3 = 4（先取值再加 vs 先加再取值）', 12, 'start', C.amber) +
      t(30, 196, '比较：== 会做类型转换，=== 不做（推荐 ===）', 12, 'start', C.text) +
      t(30, 224, '赋值从右往左结合：a = b = 1', 12, 'start', C.dim)
      , 260)
  };

  D['tree-structure'] = {
    caption: '遍历顺序由「根」放在哪决定',
    svg: frame('二叉树与三种深度遍历') + svg(
      '<line x1="320" y1="60" x2="200" y2="120" stroke="' + C.line + '"/>' +
      '<line x1="320" y1="60" x2="440" y2="120" stroke="' + C.line + '"/>' +
      '<line x1="200" y1="120" x2="140" y2="180" stroke="' + C.line + '"/>' +
      '<line x1="200" y1="120" x2="260" y2="180" stroke="' + C.line + '"/>' +
      '<line x1="440" y1="120" x2="500" y2="180" stroke="' + C.line + '"/>' +
      '<circle cx="320" cy="48" r="22" fill="' + C.box + '" stroke="' + C.accent + '"/>' + t(320, 53, 'A', 13, 'middle', C.accent) +
      '<circle cx="200" cy="112" r="22" fill="' + C.box + '" stroke="' + C.line + '"/>' + t(200, 117, 'B', 13, 'middle', C.text) +
      '<circle cx="440" cy="112" r="22" fill="' + C.box + '" stroke="' + C.line + '"/>' + t(440, 117, 'C', 13, 'middle', C.text) +
      '<circle cx="140" cy="176" r="22" fill="' + C.box + '" stroke="' + C.line + '"/>' + t(140, 181, 'D', 13, 'middle', C.text) +
      '<circle cx="260" cy="176" r="22" fill="' + C.box + '" stroke="' + C.line + '"/>' + t(260, 181, 'E', 13, 'middle', C.text) +
      '<circle cx="500" cy="176" r="22" fill="' + C.box + '" stroke="' + C.line + '"/>' + t(500, 181, 'F', 13, 'middle', C.text) +
      t(30, 240, '前序（根左右）：A B D E C F', 12, 'start', C.accent) +
      t(30, 264, '中序（左根右）：D B E A C F', 12, 'start', C.green) +
      t(30, 288, '后序（左右根）：D E B F C A', 12, 'start', C.amber)
      , 310)
  };

  D['complexity-growth'] = {
    caption: 'n 变大时，增长快慢决定算法能不能用',
    svg: frame('常见复杂度增长速度') + svg(
      '<line x1="60" y1="240" x2="580" y2="240" stroke="' + C.line + '"/>' +
      '<line x1="60" y1="240" x2="60" y2="40" stroke="' + C.line + '"/>' +
      '<path d="M60,230 Q300,228 580,224" fill="none" stroke="' + C.green + '" stroke-width="2"/>' +
      '<path d="M60,228 Q300,190 580,120" fill="none" stroke="' + C.accent + '" stroke-width="2"/>' +
      '<path d="M60,230 Q400,150 580,50" fill="none" stroke="' + C.amber + '" stroke-width="2"/>' +
      '<path d="M60,235 Q430,60 520,45" fill="none" stroke="' + C.red + '" stroke-width="2"/>' +
      t(560, 218, 'O(1)', 11, 'end', C.green) +
      t(560, 112, 'O(n)', 11, 'end', C.accent) +
      t(540, 44, 'O(n²)', 11, 'end', C.amber) +
      t(470, 80, 'O(2ⁿ)', 11, 'end', C.red) +
      t(60, 268, '二分查找 O(log n) 介于 O(1) 与 O(n) 之间，n=1000 时约 10 次', 11, 'start', C.dim) +
      t(60, 292, '看代码：一层循环 O(n)，两层嵌套 O(n²)，折半 O(log n)', 11, 'start', C.dim)
      , 310)
  };
})(window.ZSB = window.ZSB || {});
