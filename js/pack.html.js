/* HTML 与 CSS 模块包：8 个考点 + 8 份完整讲义 + 32 道题 */
(function (Z) {
  Z.addKps([
    { id: 'html-structure', subject: 'cs', chapter: 'HTML 与 CSS', title: 'HTML 文档结构', level: 1, examWeight: 0.03, prerequisites: [], examCount: 4, examPoints: 12, outcome: '能默写标准 HTML 骨架，说清 DOCTYPE、head、body 各自的作用', note: '先搭骨架再写内容，编码与视口别漏' },
    { id: 'html-tags', subject: 'cs', chapter: 'HTML 与 CSS', title: '常用标签与语义化', level: 1, examWeight: 0.04, prerequisites: ['html-structure'], examCount: 4, examPoints: 12, outcome: '能区分块级与行内元素，用语义化标签组织页面结构', note: '标签先表达含义，样式交给 CSS' },
    { id: 'html-form', subject: 'cs', chapter: 'HTML 与 CSS', title: '表单与输入控件', level: 2, examWeight: 0.04, prerequisites: ['html-tags'], examCount: 4, examPoints: 14, outcome: '能写完整表单，用 label、name、required 让数据正确提交', note: '控件没有 name，服务器就收不到值' },
    { id: 'html-link', subject: 'cs', chapter: 'HTML 与 CSS', title: '链接、图片与路径', level: 1, examWeight: 0.03, prerequisites: ['html-structure'], examCount: 4, examPoints: 12, outcome: '能正确写相对路径与绝对路径，处理链接、图片与页内锚点', note: '路径先问「从哪个文件出发」' },
    { id: 'css-selector', subject: 'cs', chapter: 'HTML 与 CSS', title: 'CSS 选择器与优先级', level: 2, examWeight: 0.05, prerequisites: ['html-tags'], examCount: 4, examPoints: 16, outcome: '能写出常用选择器，并按优先级判断哪条规则最终生效', note: '权重相同时，后写的赢' },
    { id: 'css-box', subject: 'cs', chapter: 'HTML 与 CSS', title: 'CSS 盒模型', level: 2, examWeight: 0.05, prerequisites: ['css-selector'], examCount: 4, examPoints: 16, outcome: '能算盒子实际占位，用 box-sizing 控制宽度含义', note: '默认 content-box 下 width 不含 padding 与 border' },
    { id: 'css-flex', subject: 'cs', chapter: 'HTML 与 CSS', title: 'Flex 布局', level: 3, examWeight: 0.05, prerequisites: ['css-box'], examCount: 4, examPoints: 18, outcome: '能用 Flex 做居中、等分与自适应布局，分清主轴与交叉轴', note: 'justify-content 永远作用于主轴' },
    { id: 'css-responsive', subject: 'cs', chapter: 'HTML 与 CSS', title: '响应式与媒体查询', level: 3, examWeight: 0.04, prerequisites: ['css-flex'], examCount: 4, examPoints: 16, outcome: '能写移动优先的媒体查询，让布局在手机与桌面都正常', note: '没有 viewport，媒体查询在手机上会对不上' }
  ]);

  Z.QUESTIONS.push.apply(Z.QUESTIONS, Z.makeQs([
    /* ---------- html-structure ---------- */
    { id: 'html-struct-1', kpIds: ['html-structure'], subject: 'cs', type: 'single',
      stem: '`<!DOCTYPE html>` 的作用是什么？',
      options: ['声明页面使用 UTF-8 编码', '告诉浏览器按 HTML5 标准模式解析页面', '引入外部 CSS 文件', '定义浏览器标签页上显示的标题'],
      answer: 'B',
      analysis: { ans: 'B', why: 'DOCTYPE 是文档类型声明，让浏览器用标准模式解析；编码由 meta charset 负责，标题由 title 负责。', steps: '1. 浏览器读到文件第一行的 DOCTYPE。\n2. 选择 HTML5 标准模式，而不是怪异模式。\n3. 后续元素按标准盒模型与规则解析。', pit: 'DOCTYPE 不是普通标签，没有结束标签，也不能写进 html 里面。' } },
    { id: 'html-struct-2', kpIds: ['html-structure'], subject: 'cs', type: 'single',
      stem: '下列标签中，必须写在 `<head>` 里的是？',
      options: ['`<h1>`', '`<title>`', '`<p>`', '`<footer>`'],
      answer: 'B',
      analysis: { ans: 'B', why: 'head 放页面元信息，title 决定浏览器标签页标题，属于 head。h1、p、footer 都是页面上可见的内容，应放在 body。', steps: '1. 判断标签是否在页面上可见。\n2. title 不显示在正文里，只显示在标签页。\n3. 因此 title 属于 head。', pit: '把 title 写进 body 时浏览器常会自动纠正，但结构已经不规范了。' } },
    { id: 'html-struct-3', kpIds: ['html-structure'], subject: 'cs', type: 'fill',
      stem: 'HTML 文档的根元素是 ______。',
      answer: 'html', accept: ['html', '<html>', 'html 标签'],
      analysis: { ans: 'html', why: '一个文档只能有一个 html 根元素，head 与 body 都包在它里面。', steps: '1. 文档最外层是 html。\n2. html 下分 head 与 body 两个分支。\n3. 所有可见内容最终都在 body 内。', pit: '不要把 head 和 body 写成同级根元素，它们必须被 html 包住。' } },
    { id: 'html-struct-4', kpIds: ['html-structure'], subject: 'cs', type: 'fill',
      stem: '在 `<html>` 标签上声明页面主要语言，应使用的属性是 ______。',
      answer: 'lang', accept: ['lang', 'lang 属性'],
      analysis: { ans: 'lang', why: 'lang 声明页面主要语言，例如 lang="zh-CN"，屏幕阅读器与搜索引擎都会参考。', steps: '1. 在 html 开始标签上写 lang。\n2. 值用语言代码，如 zh-CN 或 en。\n3. 浏览器与辅助工具据此选择发音和语言判断。', pit: 'lang 不是用来设置字体的，也不是 charset，三者不要混。' } },

    /* ---------- html-tags ---------- */
    { id: 'html-tags-1', kpIds: ['html-tags'], subject: 'cs', type: 'single',
      stem: '表示页面主要内容区域的语义化标签是？',
      options: ['`<div>`', '`<main>`', '`<span>`', '`<section>`'],
      answer: 'B',
      analysis: { ans: 'B', why: 'main 表示文档的主体内容，一个页面通常只使用一个，且不应包含重复的导航与页脚。', steps: '1. div 是无语义的通用容器。\n2. span 是行内容器。\n3. section 表示文档中的分区，不等于主体。\n4. main 才是主体内容。', pit: '不要在页面里放多个 main，也不要把页眉页脚塞进 main。' } },
    { id: 'html-tags-2', kpIds: ['html-tags'], subject: 'cs', type: 'single',
      stem: '下列元素中，默认属于行内元素的是？',
      options: ['`<div>`', '`<p>`', '`<span>`', '`<section>`'],
      answer: 'C',
      analysis: { ans: 'C', why: 'span 默认是行内元素，随文字流动，宽高由内容决定；div、p、section 默认都是块级元素。', steps: '1. 块级元素独占一行，可设宽高。\n2. 行内元素不独占一行，宽高由内容撑开。\n3. span 是典型行内元素。', pit: '行内元素直接设 width 与 height 往往无效，需要改成 inline-block 或 block。' } },
    { id: 'html-tags-3', kpIds: ['html-tags'], subject: 'cs', type: 'fill',
      stem: '一级标题使用的标签是 ______。',
      answer: 'h1', accept: ['h1', '<h1>', 'h1 标签'],
      analysis: { ans: 'h1', why: 'HTML 提供 h1 到 h6 六级标题，h1 层级最高，通常一个页面只用一个。', steps: '1. 标题按层级从 h1 到 h6。\n2. h1 表示最高级标题。\n3. 不要为了字号去选层级，字号交给 CSS。', pit: '标题层级跳跃（h1 后直接用 h3）会破坏文档大纲。' } },
    { id: 'html-tags-4', kpIds: ['html-tags'], subject: 'cs', type: 'fill',
      stem: '表示「独立、可单独分发的内容」（如一篇博客文章）的语义化标签是 ______。',
      answer: 'article', accept: ['article', '<article>'],
      analysis: { ans: 'article', why: 'article 表示可以脱离上下文独立存在的内容，例如文章、帖子、评论。', steps: '1. 判断内容是否能单独拿出来仍然完整。\n2. 能独立成篇就用 article。\n3. 只是页面中的一个分区则用 section。', pit: '不要在 article 里再套一个表示同一篇文章的 article，容易造成语义重复。' } },

    /* ---------- html-form ---------- */
    { id: 'html-form-1', kpIds: ['html-form'], subject: 'cs', type: 'single',
      stem: '要让点击 `<label>` 的文字也能聚焦到对应输入框，label 的 `for` 属性值应等于？',
      options: ['输入框的 name', '输入框的 id', 'form 的 id', '输入框的 value'],
      answer: 'B',
      analysis: { ans: 'B', why: 'label 的 for 与控件的 id 建立关联，点击文字就会把焦点交给该控件，屏幕阅读器也能正确朗读。', steps: '1. 给输入框设置唯一的 id。\n2. 给 label 设置 for，值等于该 id。\n3. 点击 label 文字即可聚焦输入框。', pit: 'for 对应的是 id，不是 name；两者写混时点击无效。' } },
    { id: 'html-form-2', kpIds: ['html-form'], subject: 'cs', type: 'single',
      stem: 'form 的哪个属性指定数据提交到哪个地址？',
      options: ['method', 'action', 'enctype', 'target'],
      answer: 'B',
      analysis: { ans: 'B', why: 'action 是提交地址，method 是提交方式（get 或 post），enctype 是编码方式。', steps: '1. action 写接口地址。\n2. method 决定用 get 还是 post。\n3. 上传文件时才需要设置 enctype。', pit: '只写 method 不写 action，表单会提交回当前页面地址。' } },
    { id: 'html-form-3', kpIds: ['html-form'], subject: 'cs', type: 'fill',
      stem: '多行文本输入使用 ______ 标签。',
      answer: 'textarea', accept: ['textarea', '<textarea>'],
      analysis: { ans: 'textarea', why: 'textarea 用于多行文本，如留言、简介；单行输入用 input。', steps: '1. 需要多行输入时选择 textarea。\n2. 用 rows 控制显示行数。\n3. 提交时同样要靠 name 收集值。', pit: 'textarea 没有 value 属性，初始内容写在开始与结束标签之间。' } },
    { id: 'html-form-4', kpIds: ['html-form'], subject: 'cs', type: 'fill',
      stem: '让输入框在提交前必须填写，应添加 ______ 属性。',
      answer: 'required', accept: ['required', 'required 属性'],
      analysis: { ans: 'required', why: 'required 是浏览器原生校验属性，为空时表单无法提交并给出提示。', steps: '1. 在 input 上加 required。\n2. 用户留空提交。\n3. 浏览器阻止提交并提示必填。', pit: 'required 只保证非空，不校验格式；格式要用 type 或 pattern。' } },

    /* ---------- html-link ---------- */
    { id: 'html-link-1', kpIds: ['html-link'], subject: 'cs', type: 'single',
      stem: '让链接在新标签页中打开，`target` 应设置为？',
      options: ['_self', '_blank', '_parent', '_top'],
      answer: 'B',
      analysis: { ans: '_blank', why: '_blank 表示新标签页或新窗口打开；_self 是当前窗口。', steps: '1. 默认 target 是 _self，在当前页打开。\n2. 写 target="_blank" 则新开标签页。\n3. 同时建议加 rel="noopener noreferrer"。', pit: '新窗口打开外链时不加 rel，可能带来安全与性能问题。' } },
    { id: 'html-link-2', kpIds: ['html-link'], subject: 'cs', type: 'single',
      stem: '图片加载失败时显示的替代文字，由哪个属性提供？',
      options: ['title', 'alt', 'src', 'aria-label'],
      answer: 'B',
      analysis: { ans: 'alt', why: 'alt 是图片的替代文本，加载失败时显示，屏幕阅读器也靠它描述图片。', steps: '1. src 指向图片地址。\n2. alt 写图片内容的文字说明。\n3. 加载失败时浏览器显示 alt。', pit: 'alt 不要写成图片文件名或「图片」两个字，要说明内容。' } },
    { id: 'html-link-3', kpIds: ['html-link'], subject: 'cs', type: 'fill',
      stem: '从页面同目录引用 images 文件夹下的 logo.png，相对路径应写成 ______。',
      answer: 'images/logo.png', accept: ['images/logo.png', './images/logo.png'],
      analysis: { ans: 'images/logo.png', why: '同目录下先进入 images 文件夹，再写文件名；前缀 ./ 表示当前目录，可省略。', steps: '1. 当前文件所在目录是起点。\n2. 进入 images 子目录。\n3. 指向 logo.png。', pit: '不要以斜杠开头，那会变成站点根目录的绝对路径。' } },
    { id: 'html-link-4', kpIds: ['html-link'], subject: 'cs', type: 'fill',
      stem: '跳转到页面内 id 为 top 的元素，href 应写成 ______。',
      answer: '#top', accept: ['#top'],
      analysis: { ans: '#top', why: '井号加 id 表示页内锚点，浏览器会滚动到该 id 的元素，并更新地址栏。', steps: '1. 给目标元素写 id="top"。\n2. 链接 href="#top"。\n3. 点击后页面滚动到该元素。', pit: '写 href="top" 会被当成一个文件路径，而不是页内锚点。' } },

    /* ---------- css-selector ---------- */
    { id: 'html-sel-1', kpIds: ['css-selector'], subject: 'cs', type: 'single',
      stem: '选中所有 class 为 card 的元素，选择器写法是？',
      options: ['#card', '.card', 'card', '*card'],
      answer: 'B',
      analysis: { ans: '.card', why: '类选择器用点号开头，后面写 class 名；井号是 ID 选择器。', steps: '1. class 用点号 .card。\n2. id 用井号 #card。\n3. 直接写 card 会选中同名标签，不是类。', pit: '一个元素可以有多个 class，选择器只写其中一个也能选中它。' } },
    { id: 'html-sel-2', kpIds: ['css-selector'], subject: 'cs', type: 'single',
      stem: '下列选择器中，优先级最高的是？',
      options: ['元素选择器 p', '类选择器 .card', 'ID 选择器 #header', '伪类选择器 :hover'],
      answer: 'C',
      analysis: { ans: 'C', why: '按权重比较：ID 选择器高于类、伪类与元素选择器；行内样式又高于所有选择器。', steps: '1. 权重记成四位数：行内、ID、类、元素。\n2. 元素与伪类都是最低一档。\n3. 类选择器 10，ID 选择器 100。\n4. 所以 ID 选择器最高。', pit: '伪类的权重与类相同，不是与元素相同。' } },
    { id: 'html-sel-3', kpIds: ['css-selector'], subject: 'cs', type: 'fill',
      stem: '选中 id 为 header 的元素，选择器应写成 ______。',
      answer: '#header', accept: ['#header'],
      analysis: { ans: '#header', why: 'ID 选择器以井号开头，后面紧跟 id 名称。', steps: '1. 找到目标元素的 id。\n2. 前面加井号。\n3. 写成 #header。', pit: 'id 在页面中应唯一，不要用 ID 选择器做批量样式。' } },
    { id: 'html-sel-4', kpIds: ['css-selector'], subject: 'cs', type: 'fill',
      stem: '让所有 p 元素文字变红，声明应写成 ______。',
      answer: 'color: red;', accept: ['color: red;', 'color:red;', 'color: red'],
      analysis: { ans: 'color: red;', why: 'CSS 声明由属性和值组成，中间用冒号，末尾用分号；属性是 color，值是 red。', steps: '1. 选择 p 元素。\n2. 写属性 color。\n3. 冒号后写 red，并以分号结束。', pit: '文字颜色是 color，不是 font-color 或 text-color。' } },

    /* ---------- css-box ---------- */
    { id: 'html-box-1', kpIds: ['css-box'], subject: 'cs', type: 'single',
      stem: '默认 content-box 下，`width: 200px; padding: 20px; border: 5px solid;` 的盒子总宽度是多少？',
      options: ['200px', '240px', '250px', '230px'],
      answer: 'C',
      analysis: { ans: '250px', why: 'content-box 下 width 只算内容区，总宽 = 内容 200 + 左右 padding 40 + 左右 border 10。', steps: '1. 内容宽 200px。\n2. 左右 padding 各 20px，共 40px。\n3. 左右 border 各 5px，共 10px。\n4. 200 + 40 + 10 = 250px。', pit: 'margin 不算在盒子宽度里，但会影响元素占据的空间。' } },
    { id: 'html-box-2', kpIds: ['css-box'], subject: 'cs', type: 'single',
      stem: '希望 width 直接等于盒子的可见宽度（包含 padding 与 border），box-sizing 应设为？',
      options: ['content-box', 'border-box', 'padding-box', 'margin-box'],
      answer: 'B',
      analysis: { ans: 'border-box', why: 'border-box 下 width 已经包含 padding 与 border，内容区会自动缩小。', steps: '1. content-box 只把 width 算到内容区。\n2. border-box 把 width 算到边框外沿。\n3. 设 width: 300px 后盒子总宽就是 300px。', pit: 'margin 无论哪种模式都不算进 width。' } },
    { id: 'html-box-3', kpIds: ['css-box'], subject: 'cs', type: 'fill',
      stem: '盒模型由内容区、内边距、边框和 ______ 四部分组成。',
      answer: '外边距', accept: ['外边距', 'margin'],
      analysis: { ans: '外边距', why: '盒模型四层是 content、padding、border、margin，中文分别是内容区、内边距、边框、外边距。', steps: '1. 从里到外：内容区。\n2. 然后是内边距 padding。\n3. 再是边框 border。\n4. 最外层是外边距 margin。', pit: 'margin 在盒子外部，不参与背景色绘制。' } },
    { id: 'html-box-4', kpIds: ['css-box'], subject: 'cs', type: 'fill',
      stem: '让有固定宽度的块级盒子在父容器中水平居中，margin 简写常写成 `margin: 0 ______;`。',
      answer: 'auto', accept: ['auto'],
      analysis: { ans: 'auto', why: '左右 margin 设为 auto 时，浏览器把剩余水平空间平均分给两侧，盒子就居中了。', steps: '1. 盒子必须有确定宽度。\n2. 左右外边距设为 auto。\n3. 上下可写 0，简写为 margin: 0 auto;。', pit: '行内元素或不设宽度的块级元素，auto 无法产生居中效果。' } },

    /* ---------- css-flex ---------- */
    { id: 'html-flex-1', kpIds: ['css-flex'], subject: 'cs', type: 'single',
      stem: '默认 `flex-direction: row` 时，让子项在主轴方向居中应使用？',
      options: ['align-items: center', 'justify-content: center', 'flex-wrap: wrap', 'text-align: center'],
      answer: 'B',
      analysis: { ans: 'justify-content: center', why: 'row 时主轴是水平方向，justify-content 控制主轴分布，center 即水平居中。', steps: '1. 默认主轴水平。\n2. justify-content 管主轴。\n3. center 让子项整体在主轴居中。', pit: 'align-items 管的是交叉轴，row 时它控制垂直方向。' } },
    { id: 'html-flex-2', kpIds: ['css-flex'], subject: 'cs', type: 'single',
      stem: '`flex: 1` 等价于哪一组值？',
      options: ['flex-grow: 1; flex-shrink: 0; flex-basis: auto', 'flex-grow: 1; flex-shrink: 1; flex-basis: 0%', 'width: 100%', 'flex-grow: 0; flex-shrink: 1; flex-basis: 1px'],
      answer: 'B',
      analysis: { ans: 'B', why: 'flex: 1 是简写，展开为 grow 1、shrink 1、basis 0%，表示按剩余空间等分。', steps: '1. 简写第一个值是 flex-grow。\n2. 第二个值是 flex-shrink。\n3. 第三个值是 flex-basis。\n4. 只写一个数时，basis 取 0%。', pit: 'flex: 1 不是 width: 100%，多个子项都写 flex: 1 才是等分。' } },
    { id: 'html-flex-3', kpIds: ['css-flex'], subject: 'cs', type: 'fill',
      stem: '开启 Flex 布局，容器的 display 应设为 ______。',
      answer: 'flex', accept: ['flex', 'display: flex', 'display:flex'],
      analysis: { ans: 'flex', why: '给容器设置 display: flex 后，它的直接子元素自动成为 flex 子项。', steps: '1. 选中容器。\n2. 写 display: flex。\n3. 直接子元素沿主轴排列。', pit: 'Flex 只影响直接子元素，孙子元素不会自动参与这层布局。' } },
    { id: 'html-flex-4', kpIds: ['css-flex'], subject: 'cs', type: 'fill',
      stem: '让子项在交叉轴上居中，应写 `align-items: ______;`。',
      answer: 'center', accept: ['center'],
      analysis: { ans: 'center', why: 'align-items 作用于交叉轴，center 让所有子项在交叉轴上居中对齐。', steps: '1. 容器设为 flex。\n2. 写 align-items。\n3. 值为 center。', pit: '主轴方向改为 column 后，align-items 控制的是水平方向。' } },

    /* ---------- css-responsive ---------- */
    { id: 'html-resp-1', kpIds: ['css-responsive'], subject: 'cs', type: 'single',
      stem: '`<meta name="viewport" content="width=device-width, initial-scale=1.0">` 的主要作用是？',
      options: ['把页面整体放大 2 倍', '让布局视口宽度等于设备宽度', '自动引入响应式框架', '禁止用户滚动页面'],
      answer: 'B',
      analysis: { ans: 'B', why: 'viewport 声明让移动浏览器的布局视口等于设备宽度，页面按真实窄屏排版，而不是先按 980px 再缩小。', steps: '1. 没有 viewport 时，手机按约 980px 的虚拟视口渲染。\n2. 页面被整体缩小，文字很小，媒体查询对不上。\n3. 加 viewport 后按设备宽度排版。', pit: 'initial-scale=1.0 表示初始缩放为 1，不是放大两倍。' } },
    { id: 'html-resp-2', kpIds: ['css-responsive'], subject: 'cs', type: 'single',
      stem: '`@media (max-width: 600px)` 中的样式在什么条件下生效？',
      options: ['视口宽度大于 600px', '视口宽度恰好等于 600px', '视口宽度不超过 600px', '设备分辨率正好是 600 像素'],
      answer: 'C',
      analysis: { ans: 'C', why: 'max-width 是上限，视口宽度小于或等于 600px 时条件成立。', steps: '1. 读媒体查询的媒体特性。\n2. max-width 表示不超过该值。\n3. 600px 及以下都命中。', pit: 'max-width 与 min-width 方向相反，写反会让窄屏样式跑到桌面端。' } },
    { id: 'html-resp-3', kpIds: ['css-responsive'], subject: 'cs', type: 'fill',
      stem: '移动优先写法先写小屏样式，再用 ______ 媒体查询逐步增强大屏效果。',
      answer: 'min-width', accept: ['min-width', 'min-width 媒体查询'],
      analysis: { ans: 'min-width', why: '移动优先以最小屏幕为默认样式，再用 min-width 在屏幕变宽时叠加与覆盖。', steps: '1. 先写不带宽度的基础样式，适配手机。\n2. 用 @media (min-width: 768px) 增加桌面布局。\n3. 断点从小到大递增。', pit: '移动优先不要用 max-width 层层覆盖，容易越写越乱。' } },
    { id: 'html-resp-4', kpIds: ['css-responsive'], subject: 'cs', type: 'fill',
      stem: '让图片占满容器宽度并保持比例，可写 `img { width: 100%; height: ______; }`。',
      answer: 'auto', accept: ['auto'],
      analysis: { ans: 'auto', why: 'width 固定为 100% 时，height 设为 auto 会按原图比例自动计算高度，避免变形。', steps: '1. width 设为 100%。\n2. height 设为 auto。\n3. 浏览器按原始宽高比缩放。', pit: '只设 width 不设 height 通常也能保持比例，但显式写 auto 更稳。' } }
  ]));

  /* ======================= 讲义 ======================= */
  Z.LESSONS.push(
    Z.makeLesson({
      id: 'html-struct-L1', kpIds: ['html-structure'], subject: 'cs', level: 1,
      title: 'HTML 文档结构：先搭骨架，再填内容',
      estMinutes: 35,
      hookTitle: '浏览器打开网页的第一步，真的是「看到什么画什么」吗？',
      hookBody: '不是。它先把 HTML 解析成一棵文档树，再按树的结构计算样式与布局。骨架错了，后面的标签、选择器、盒模型都会跟着歪。',
      idea: '一个标准 HTML 文档由 **DOCTYPE、html 根元素、head 与 body** 四部分构成。head 放页面元信息（编码、标题、视口），body 放用户能看见的内容。浏览器把标签解析成 **DOM 树**，CSS 再作用在这棵树上。',
      diagramId: 'dom-tree', diagramCaption: '文档树：html 之下分出 head 与 body 两根主枝',
      analogy: { title: '盖房子先立框架', md: '写 HTML 像盖房子：DOCTYPE 是开工许可证，html 是整体框架，head 是埋在墙里的水电管线，body 是你能看到和使用的房间。管线看不见，但没装好，灯就不亮、水就不通。' },
      points: [
        { title: '一、DOCTYPE 是标准模式的开关', md: '`<!DOCTYPE html>` 必须写在文件第一行，告诉浏览器按 HTML5 标准模式渲染。漏掉它，浏览器可能进入怪异模式，盒模型的计算方式都会与预期不同。它不是普通标签，也没有结束标签。' },
        { title: '二、html 是唯一的根元素', md: '所有内容都要包在 `<html>` 与 `</html>` 之间。开始标签上的 `lang="zh-CN"` 声明页面主要语言，屏幕阅读器会选对应语音，搜索引擎也用它判断页面语言。' },
        { title: '三、head 放看不见的元信息', md: '`<head>` 里通常放 `<meta charset="UTF-8">`、viewport 声明、`<title>` 和引入 CSS 的 `<link>`。这些内容不显示在正文里，却决定了编码、标签页标题和移动端布局。' },
        { title: '四、charset 决定中文是否乱码', md: '浏览器按 charset 指定的编码解读字节。文件实际保存为 UTF-8，页面也声明 UTF-8，中文才不会变成乱码。声明要尽量靠前，最好紧跟 head 开始标签。' },
        { title: '五、body 放用户看得见的内容', md: '标题、段落、图片、表单都写在 `<body>` 里。body 内应保持清晰层级：header 放页头，main 放主体，footer 放页脚，而不是把所有内容都堆进 div。' },
        { title: '六、标签要正确嵌套与闭合', md: '`<p><strong>文字</p></strong>` 是交叉嵌套，浏览器会自动纠正，但纠正结果未必是你想要的。写的时候就按「后开先关」的栈规则检查，能省掉大量诡异布局问题。' },
        { title: '七、结构清晰才好维护', md: '把页面想成一棵树：html 是根，head 与 body 是两根主枝。层级清楚，CSS 选择器和 JavaScript 查找才有稳定路径，改一处不会牵连一片。' }
      ],
      table: {
        headers: ['位置', '典型内容', '作用'],
        rows: [
          ['第一行', '<!DOCTYPE html>', '声明 HTML5 标准模式'],
          ['html 开始标签', 'lang="zh-CN"', '声明页面主要语言'],
          ['head', 'meta charset', '指定字符编码'],
          ['head', 'title', '浏览器标签页标题'],
          ['head', 'link rel=stylesheet', '引入外部样式表'],
          ['body', 'header / main / footer', '页面可见结构']
        ]
      },
      code: '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>我的第一个页面</title>\n</head>\n<body>\n  <h1>你好，HTML</h1>\n  <p>这是一段正文。</p>\n</body>\n</html>',
      warning: '最容易漏的是 charset 与 viewport：前者让中文不乱码，后者让手机不把页面当成 980px 宽的桌面页来整体缩小。',
      tip: '背一句顺序：「先声明，再分家，最后放内容」：DOCTYPE → html 分 head 与 body → 内容进 body。',
      quizIds: ['html-struct-1', 'html-struct-2', 'html-struct-3', 'html-struct-4'],
      example: {
        title: '从零写一个最小可用页面',
        steps: [
          { md: '第一行写 `<!DOCTYPE html>`，声明标准模式。' },
          { md: '写 `<html lang="zh-CN">`，内部先放 head。' },
          { md: 'head 里依次写 charset、viewport 与 title。' },
          { md: 'body 里写一个 h1 和一段 p，最后闭合 html。' }
        ],
        takeaway: '骨架固定，内容才往里填；每开一个标签就想着怎么关。'
      },
      example2: {
        title: '排查中文乱码与标题不显示',
        steps: [
          { md: '现象：页面中文显示成方块或问号，标签页标题显示文件路径。' },
          { md: '检查文件是否以 UTF-8 保存，再看 head 里有没有 `<meta charset="UTF-8">`。' },
          { md: '检查 `<title>` 是否误写进 body，浏览器可能忽略或自动搬移。' },
          { md: '把 charset 放到 head 前部、title 放回 head，刷新验证。' }
        ],
        takeaway: '乱码先查编码声明，标题先查 title 位置。'
      },
      guided: [{ questionId: 'html-struct-1', hint: 'DOCTYPE 只影响浏览器的解析模式，不影响编码和标题。' }],
      solo: ['html-struct-2', 'html-struct-3'],
      challenge: ['html-struct-4'],
      summary: {
        essence: 'HTML 骨架由 DOCTYPE、html、head、body 组成；head 管元信息，body 管可见内容。',
        formulas: ['骨架：DOCTYPE → html → head + body', '编码与视口：meta charset=UTF-8；meta viewport width=device-width'],
        pitfalls: ['漏写 DOCTYPE 进入怪异模式', '把 title 写进 body', 'charset 与文件实际编码不一致', '标签交叉嵌套'],
        checklist: ['我能默写完整 HTML 骨架', '我分得清 head 与 body 的职责', '我知道 charset 与 viewport 的作用', '我能检查标签是否正确闭合']
      },
      feynman: '请用「盖房子」的比喻，讲清楚 head 与 body 各自负责什么，以及漏掉 DOCTYPE 会发生什么。'
    }),

    Z.makeLesson({
      id: 'html-tags-L1', kpIds: ['html-tags'], subject: 'cs', level: 1,
      title: '常用标签：让结构自己说话',
      estMinutes: 35,
      hookTitle: '同样是一段文字，为什么搜索引擎知道它是标题？',
      hookBody: '因为标签自带含义。h1 表示一级标题，nav 表示导航，article 表示独立成篇的内容。浏览器给的默认样式只是附赠，真正值钱的是这层语义。',
      idea: '标签按显示方式分为**块级**与**行内**：块级独占一行、可以设置宽高；行内随文字流动。语义化标签（header、nav、main、article、section、footer）不改变显示方式，却让结构和含义更清楚。',
      diagramId: 'dom-tree', diagramCaption: '语义化标签让文档树的分支各有名字',
      analogy: { title: '文章排版的三件套', md: '写页面像写文章：标题用 h1，段落用 p，并列内容用列表。你不会把标题和正文用同一种字号、同一种缩进混在一起，浏览器和读者也就都能一眼分清层次。语义标签就是文章的格式规范。' },
      points: [
        { title: '一、块级与行内的区别', md: 'div、p、h1 到 h6、ul、li、section 默认是块级，独占一行且可设宽高。span、a、strong、em 默认是行内，跟着文字走。显示方式可以用 CSS 改，但语义不会变。' },
        { title: '二、标题表示层级不是字号', md: 'h1 到 h6 表示六级标题，数字越大层级越低。不要因为想要小字号就选 h5，字号应该交给 CSS。一个页面通常只用一个 h1，标题层级不要跳级。' },
        { title: '三、p 管段落，br 只负责换行', md: '一段完整文字用 `<p>`，浏览器会在段前后留出间距。`<br>` 只是强制换行，不会产生新段落。连续多个 br 来撑间距是坏习惯，间距应该用 CSS 的 margin。' },
        { title: '四、列表分三种', md: '`<ul>` 是无序列表，`<ol>` 是有序列表，`<dl>` 是描述列表。列表项分别是 li 与 dt / dd。导航菜单、步骤说明、术语解释都应该用对应列表，而不是一堆 div。' },
        { title: '五、语义化标签各司其职', md: 'header 是页头，nav 是导航，main 是主体，article 是独立内容，section 是分区，aside 是侧栏，footer 是页脚。它们和 div 一样常是块级，但含义明确，读代码的人一眼能懂。' },
        { title: '六、div 与 span 是中性的容器', md: '当没有更合适的语义标签时，才用 div 做块级容器、span 做行内容器。它们是「无名氏」，适合纯样式分组，但不要用 div 代替本该有含义的标题、列表和导航。' },
        { title: '七、语义化带来的三个好处', md: '第一，结构清晰便于维护；第二，搜索引擎能判断内容主次；第三，屏幕阅读器可以按标题和地标快速跳转。这三点都不依赖 CSS，是 HTML 本身的价值。' }
      ],
      table: {
        headers: ['标签', '默认显示', '典型用途'],
        rows: [
          ['h1 ~ h6', '块级', '六级标题，表达层级'],
          ['p', '块级', '段落文字'],
          ['ul / ol / li', '块级', '无序与有序列表'],
          ['dl / dt / dd', '块级', '术语与解释'],
          ['strong / em', '行内', '强调语气'],
          ['div / span', '块级 / 行内', '无语义容器']
        ]
      },
      code: '<body>\n  <header>\n    <h1>升本学习站</h1>\n    <nav><a href="#lessons">课程</a></nav>\n  </header>\n  <main>\n    <article>\n      <h2>HTML 语义化</h2>\n      <p>标签不只是样式，它还表达<strong>含义</strong>。</p>\n      <ul>\n        <li>结构清晰</li>\n        <li>利于 SEO</li>\n      </ul>\n    </article>\n  </main>\n  <footer><p>版权所有</p></footer>\n</body>',
      warning: '最常见的错误是「用标签凑样式」：用 h4 当小标题、用 br 拉间距、用 div 包一切。样式问题应该交给 CSS，结构问题才用标签解决。',
      tip: '选标签先问一句：「这段内容在文章里是什么角色？」角色清楚了，标签就定了。',
      quizIds: ['html-tags-1', 'html-tags-2', 'html-tags-3', 'html-tags-4'],
      example: {
        title: '把 div 堆砌改成语义结构',
        steps: [
          { md: '原结构是 `<div class="top">...</div><div class="content">...</div>`。' },
          { md: '页头部分改成 header，内部标题用 h1，导航用 nav。' },
          { md: '主体改成 main，独立文章用 article，文章标题用 h2。' },
          { md: '页脚改成 footer，并列信息用 ul 与 li。' }
        ],
        takeaway: '语义化不是多写标签，而是换掉没有含义的 div。'
      },
      example2: {
        title: '为内容选对列表',
        steps: [
          { md: '步骤有先后顺序，例如「第一步、第二步」，用 ol。' },
          { md: '并列且无顺序，例如「课程列表」，用 ul。' },
          { md: '术语与解释成对出现，例如「HTML：超文本标记语言」，用 dl。' },
          { md: '每个列表项分别用 li 或 dt / dd，不要用 div 冒充。' }
        ],
        takeaway: '列表的类型由内容关系决定，不由样式决定。'
      },
      guided: [{ questionId: 'html-tags-2', hint: '想一想哪个标签只包住一小段文字，不独占一行。' }],
      solo: ['html-tags-1', 'html-tags-3'],
      challenge: ['html-tags-4'],
      summary: {
        essence: '标签既控制默认显示，也表达语义；块级占一行，行内随文字流动。',
        formulas: ['块级：div / p / h1~h6 / ul / li / section', '行内：span / a / strong / em'],
        pitfalls: ['用标题标签调字号', '标题层级跳级', '用 div 代替列表与导航', '用多个 br 撑间距'],
        checklist: ['我能区分块级与行内元素', '我知道 h1 到 h6 表示层级', '我会用 ul / ol / dl 组织列表', '我能说出至少 5 个语义化标签']
      },
      feynman: '请向一个只会用 div 的人解释：为什么导航应该用 nav，文章应该用 article。'
    }),

    Z.makeLesson({
      id: 'html-form-L2', kpIds: ['html-form'], subject: 'cs', level: 2,
      title: '表单：把用户输入安全地送出去',
      estMinutes: 40,
      hookTitle: '为什么点了「提交」，页面刷新一下数据就发出去了？',
      hookBody: '因为 form 把控件里的值按 name 收集成键值对，再按 method 指定的方式发到 action 指定的地址。没写 name 的控件，浏览器根本不会收它的值。',
      idea: '表单是**用户输入与服务器之间的通道**。form 负责往哪发（action）、怎么发（method）；input、textarea、select 负责收集；label 负责把说明文字和控件绑定；name 是提交时的字段名。',
      diagramId: 'dom-tree', diagramCaption: 'form 是容器，控件是它的子节点，name 决定提交字段',
      analogy: { title: '填一张快递单', md: 'name 是单子上的字段名，value 是你填的内容，action 是收货地址，method 是运输方式。字段名写错或漏写，包裹就寄不到；label 则是单子上的提示文字，点一下就能定位到对应格子。' },
      points: [
        { title: '一、action 决定发到哪里', md: '`<form action="/login" method="post">` 中，action 写接口地址，method 写提交方式。不写 action 会提交回当前页面，不写 method 默认是 get。' },
        { title: '二、get 与 post 的区别', md: 'get 把参数拼在地址栏后面，适合查询，长度有限且会被记录。post 把数据放在请求体里，适合登录、提交等敏感或大量数据。' },
        { title: '三、input 的 type 决定控件', md: 'type 可以是 text、password、email、number、radio、checkbox、submit 等。type 既影响外观，也影响浏览器校验与手机键盘，选对能省很多代码。' },
        { title: '四、label 的 for 必须对上 id', md: '`<label for="user">用户名</label><input id="user">`，点击文字即可聚焦输入框。for 对应的是 id 而不是 name，屏幕阅读器也依赖这层关联。' },
        { title: '五、没有 name 就没有数据', md: '提交时浏览器只收集有 name 的控件，name 作为字段名，用户填的内容作为值。只写 id 不写 name，后端会收到空数据，这是新手最常见的表单 bug。' },
        { title: '六、placeholder 不是默认值', md: 'placeholder 只是灰色提示文字，用户不输入时不会提交。想给初始值要用 value。两者混用会导致「看起来有值，实际提交为空」。' },
        { title: '七、required 只是最基础的校验', md: 'required 保证非空，type="email" 会检查邮箱格式，pattern 可以用正则约束。前端校验只为体验，真正的安全校验必须在服务器再做一遍。' }
      ],
      table: {
        headers: ['控件', '写法', '用途'],
        rows: [
          ['单行文本', 'input type="text"', '姓名、用户名'],
          ['密码', 'input type="password"', '输入内容显示为圆点'],
          ['单选框', 'input type="radio"', '多选一，同组 name 相同'],
          ['复选框', 'input type="checkbox"', '多选多'],
          ['下拉框', 'select + option', '从固定选项中选择'],
          ['多行文本', 'textarea', '留言、简介']
        ]
      },
      code: '<form action="/login" method="post">\n  <label for="user">用户名</label>\n  <input id="user" name="user" type="text" placeholder="请输入用户名" required>\n\n  <label for="pwd">密码</label>\n  <input id="pwd" name="pwd" type="password" required>\n\n  <label for="city">城市</label>\n  <select id="city" name="city">\n    <option value="bj">北京</option>\n    <option value="sh">上海</option>\n  </select>\n\n  <textarea id="note" name="note" rows="3"></textarea>\n  <button type="submit">登录</button>\n</form>',
      warning: '`<button>` 在表单里默认 type 是 submit。想放一个普通按钮却忘了写 type="button"，点一下就会把整个表单提交出去。',
      tip: '每个控件检查三件套：id 给 label 用，name 给后端用，type 给浏览器用。',
      quizIds: ['html-form-1', 'html-form-2', 'html-form-3', 'html-form-4'],
      example: {
        title: '写一个可提交的登录表单',
        steps: [
          { md: 'form 上写 action 与 method，method 用 post。' },
          { md: '用户名输入框写 id、name 与 required，再配一个 for 对应的 label。' },
          { md: '密码框把 type 设为 password，同样写 name 与 required。' },
          { md: '最后放一个 type="submit" 的按钮，点击后数据发往 action。' }
        ],
        takeaway: '表单能提交的关键不是外观，而是 action、method 与 name 三者齐全。'
      },
      example2: {
        title: '排查「后端收不到数据」',
        steps: [
          { md: '先看控件有没有 name，没有 name 的值不会被提交。' },
          { md: '再看同组 radio 的 name 是否一致，不一致会变成多个独立字段。' },
          { md: '检查是否只写了 placeholder 却没写 value，导致用户以为有默认值。' },
          { md: '最后确认 form 的 action 与 method 和接口要求一致。' }
        ],
        takeaway: '数据丢了，先查 name，再查提交地址与方式。'
      },
      guided: [{ questionId: 'html-form-2', hint: '往哪发是地址问题，怎么发才是 method 的问题。' }],
      solo: ['html-form-1', 'html-form-3'],
      challenge: ['html-form-4'],
      summary: {
        essence: 'form 用 action 定地址、method 定方式；控件靠 name 提交，label 靠 id 关联。',
        formulas: ['form action + method', 'label for = input id', 'input id + name + type', 'select > option value'],
        pitfalls: ['控件漏写 name', 'label 的 for 写成 name', 'placeholder 当默认值', '按钮漏写 type 导致误提交'],
        checklist: ['我能写出完整表单结构', '我分得清 get 与 post', '我会用 label 绑定输入框', '我知道 required 只做基础校验']
      },
      feynman: '请用「填快递单」的比喻，解释 action、method、name、value 分别对应什么。'
    }),

    Z.makeLesson({
      id: 'html-link-L1', kpIds: ['html-link'], subject: 'cs', level: 1,
      title: '链接、图片与路径：找对文件的位置',
      estMinutes: 35,
      hookTitle: '为什么同一个链接，在你的电脑上打得开，部署后却 404？',
      hookBody: '多半是路径写错了：相对路径以当前文件所在目录为起点，绝对路径以站点根目录或协议域名为起点。本地双击打开和服务器部署，起点并不一样。',
      idea: '链接用 `<a href>`，图片用 `<img src alt>`。路径分**绝对路径**与**相对路径**：`./` 是当前目录，`../` 是上一级目录，`/` 开头是站点根目录；`#id` 跳到页内锚点。',
      diagramId: 'dom-tree', diagramCaption: 'a 与 img 都靠路径属性找到目标资源',
      analogy: { title: '给别人指路', md: '相对路径像说「出门左转第二间」，起点是你现在站的位置；绝对路径像说「某某市某某路 8 号」，起点是整座城市。换了起点，左转第二间就到不了同一个地方，这就是本地能开、线上 404 的原因。' },
      points: [
        { title: '一、a 的 href 写目标地址', md: '`<a href="about.html">关于我们</a>` 点击后跳到 about.html。href 可以是站内文件、外部网址、页内锚点，也可以是 mailto 或 tel 这类特殊协议。' },
        { title: '二、img 必须有 src 与 alt', md: 'src 指向图片地址，alt 写图片内容的文字说明。图片加载失败时显示 alt，屏幕阅读器也靠 alt 描述图片。装饰性图片可以写空 alt，但不能省略。' },
        { title: '三、相对路径以当前文件为起点', md: '同目录直接写文件名；子目录写 `images/logo.png`；上一级写 `../images/logo.png`。`./` 表示当前目录，通常可省略，但写上更清楚。' },
        { title: '四、斜杠开头是站点根目录', md: '`/css/site.css` 从站点根目录开始找，不是从磁盘根目录。它适合部署在域名根路径的项目；如果项目部署在子目录，根路径写法可能直接 404。' },
        { title: '五、页内锚点用井号加 id', md: '目标元素写 `id="top"`，链接写 `href="#top"`，点击就滚动过去。`href="#"` 只会回到页面顶部，不会跳到具体位置。' },
        { title: '六、target 与 rel 要成对考虑', md: '`target="_blank"` 在新标签页打开。打开外部链接时同时写 `rel="noopener noreferrer"`，避免新页面通过 window.opener 操作原页面，也避免来源信息泄露。' },
        { title: '七、路径大小写与部署环境', md: 'Windows 本地文件系统通常不区分大小写，Linux 服务器区分。写 `Logo.PNG` 而文件叫 `logo.png`，本地能显示，上线就 404。路径统一用小写最稳。' }
      ],
      table: {
        headers: ['写法', '指向', '典型场景'],
        rows: [
          ['a.html', '同目录文件', '同文件夹内跳转'],
          ['./images/a.png', '当前目录下的子目录', '明确以当前目录为起点'],
          ['../images/a.png', '上一级目录下的 images', '子页面引用公共图片'],
          ['/css/site.css', '站点根目录', '部署在域名根路径'],
          ['https://example.com', '完整网址', '外部链接'],
          ['#top', '页内 id 为 top 的元素', '回到顶部']
        ]
      },
      code: '<a href="../images/logo.png" download>下载 Logo</a>\n<a href="https://example.com" target="_blank" rel="noopener noreferrer">外部站点</a>\n<a href="#top">回到顶部</a>\n\n<img src="../images/logo.png" alt="升本学习站 Logo" width="120">',
      warning: '`href="#"` 与 `href="#top"` 不是一回事：前者只回顶部且会改地址栏，后者才会定位到 id 为 top 的元素。',
      tip: '写路径前先问「我现在在哪个文件里」，再决定是直接写名字、进子目录，还是先用 ../ 退一级。',
      quizIds: ['html-link-1', 'html-link-2', 'html-link-3', 'html-link-4'],
      example: {
        title: '从 pages/about.html 引用公共图片',
        steps: [
          { md: '当前文件在 pages 目录里，图片在项目根目录的 images 目录。' },
          { md: '先退一级：`../`，回到项目根目录。' },
          { md: '再进入 images 并写文件名：`../images/logo.png`。' },
          { md: '写成 `<img src="../images/logo.png" alt="站点 Logo">`。' }
        ],
        takeaway: '相对路径就是「从当前文件出发走几步」。'
      },
      example2: {
        title: '给长页面做页内目录',
        steps: [
          { md: '给每个章节标题加唯一 id，例如 `<h2 id="part-1">`。' },
          { md: '在目录区写 `<a href="#part-1">第一部分</a>`。' },
          { md: '点击链接，页面滚动到对应标题。' },
          { md: '在页脚放 `<a href="#top">回到顶部</a>`，并在页面最上方元素写 id="top"。' }
        ],
        takeaway: '页内跳转靠 id 对齐，井号后面就是 id。'
      },
      guided: [{ questionId: 'html-link-1', hint: '_self 是当前窗口，_blank 才是新标签页。' }],
      solo: ['html-link-2', 'html-link-3'],
      challenge: ['html-link-4'],
      summary: {
        essence: '链接与图片都靠路径定位；相对路径从当前文件出发，斜杠开头是站点根目录。',
        formulas: ['相对路径：./ 当前目录，../ 上一级', '页内锚点：href="#id" 对应目标 id', '新窗口：target="_blank" + rel="noopener noreferrer"'],
        pitfalls: ['以斜杠开头误当相对路径', 'alt 写成文件名', '路径大小写与服务器不一致', 'target 为 _blank 却不写 rel'],
        checklist: ['我能写出三种相对路径', '我知道 alt 的作用', '我会做页内锚点跳转', '我能解释本地正常线上 404 的原因']
      },
      feynman: '请用「指路」的比喻，解释相对路径和绝对路径的区别，并举一个 ../ 的例子。'
    }),

    Z.makeLesson({
      id: 'html-sel-L2', kpIds: ['css-selector'], subject: 'cs', level: 2,
      title: 'CSS 选择器：选中谁，以及谁说了算',
      estMinutes: 40,
      hookTitle: '为什么你写的样式「没生效」？',
      hookBody: '多数时候不是没生效，而是被更「重」的规则覆盖了。CSS 用优先级决定谁赢：行内 > ID > 类 / 伪类 / 属性 > 元素。同权重时，后写的赢。',
      idea: '选择器负责**选中元素**，优先级决定**谁生效**。常用选择器有元素 `p`、类 `.card`、ID `#header`、属性 `[type="text"]`、伪类 `:hover`、伪元素 `::before`；组合方式有后代（空格）、子（>）、相邻（+）。',
      diagramId: 'dom-tree', diagramCaption: '选择器沿文档树向下匹配，优先级决定最终样式',
      analogy: { title: '门禁卡的等级', md: '不同选择器像不同等级的门禁卡：行内样式是总经理卡，ID 是部门经理卡，类是员工卡，元素选择器是访客卡。同一扇门，高等级卡刷过就以高等级为准；等级相同，则谁后刷谁生效。' },
      points: [
        { title: '一、基础选择器', md: '元素选择器 `p` 选中所有段落；类选择器 `.card` 选中 class 含 card 的元素；ID 选择器 `#header` 选中唯一元素；通配符 `*` 选中所有元素。类最常用，ID 只用于唯一锚点。' },
        { title: '二、组合选择器表达层级', md: '`.nav a` 是后代选择器，选中 nav 内任意层级的 a；`.nav > a` 是子选择器，只选直接子元素；`h2 + p` 是相邻兄弟，只选紧跟其后的第一个 p。' },
        { title: '三、伪类描述状态', md: '`:hover` 鼠标悬停，`:focus` 获得焦点，`:first-child` 是第一个子元素，`:nth-child(2n)` 选偶数位。伪类的权重与类相同，都是 10 那一档。' },
        { title: '四、优先级用四位数记', md: '把权重记成（行内, ID, 类, 元素）：行内 1000，ID 100，类 / 伪类 / 属性 10，元素 / 伪元素 1。逐位比较，不是简单相加成一个大数字。' },
        { title: '五、同权重时后写的赢', md: '两条规则权重相同，样式表中靠后的覆盖靠前的。引入多个 CSS 文件时，后引入的文件整体在后。理解这一点，才不会被「明明写了却没生效」困住。' },
        { title: '六、继承与层叠是两回事', md: 'color、font-size 等文本属性会从父元素继承；width、padding、border 不会。继承来的样式优先级最低，任何直接命中的规则都能覆盖它。' },
        { title: '七、慎用 !important 与 ID', md: '`!important` 会强行打断正常优先级，用多了只能继续加 important，最后无法维护。ID 选择器权重过高，也会让复用组件难以覆盖样式。优先用类。' }
      ],
      table: {
        headers: ['选择器', '示例', '权重'],
        rows: [
          ['行内样式', 'style="color: red"', '1000'],
          ['ID 选择器', '#header', '100'],
          ['类 / 伪类 / 属性', '.card / :hover / [type=text]', '10'],
          ['元素 / 伪元素', 'p / ::before', '1'],
          ['通配符', '*', '0'],
          ['后代组合', '.nav a', '各项相加（10 + 1）']
        ]
      },
      code: '.card {\n  border: 1px solid #ccc;\n  padding: 12px;\n}\n\n.card:hover {\n  border-color: #1a73e8;\n}\n\n.list li:nth-child(2n) {\n  background: #f5f5f5;\n}\n\n#header .nav a {\n  color: #333;\n}',
      warning: '`!important` 不是「让样式生效」的万能钥匙，它只是把冲突推迟到更难排查的地方。优先检查选择器是否写错、权重是否被覆盖。',
      tip: '判断冲突三步：看选中没有 → 比权重 → 权重相同看先后。',
      quizIds: ['html-sel-1', 'html-sel-2', 'html-sel-3', 'html-sel-4'],
      example: {
        title: '判断哪条规则最终生效',
        steps: [
          { md: '页面元素是 `<p class="note" id="intro">`。' },
          { md: '规则一 `p { color: black; }`，权重 1。' },
          { md: '规则二 `.note { color: blue; }`，权重 10。' },
          { md: '规则三 `#intro { color: red; }`，权重 100，最终文字为红色。' }
        ],
        takeaway: '先比权重，再看先后；ID 几乎总能压过类。'
      },
      example2: {
        title: '用伪类做悬停与斑马纹',
        steps: [
          { md: '给卡片写 `.card` 基础边框与内边距。' },
          { md: '写 `.card:hover`，只改边框颜色，实现悬停反馈。' },
          { md: '给列表写 `.list li:nth-child(2n)`，选偶数行。' },
          { md: '设置浅灰背景，得到斑马纹效果。' }
        ],
        takeaway: '状态变化用伪类，结构位置用 nth-child，不必加额外类名。'
      },
      guided: [{ questionId: 'html-sel-2', hint: '把权重写成四位数，再逐位比较。' }],
      solo: ['html-sel-1', 'html-sel-3'],
      challenge: ['html-sel-4'],
      summary: {
        essence: '选择器决定选中谁，优先级决定谁生效；权重相同则后写的覆盖先写的。',
        formulas: ['权重：(行内, ID, 类, 元素)', '常用：.class / #id / :hover / :nth-child(n)'],
        pitfalls: ['以为写了就一定生效', '用 ID 选择器批量写样式', '滥用 !important', '把伪类权重当成元素级'],
        checklist: ['我能写出四类基础选择器', '我会用后代与子选择器', '我能算出简单规则的权重', '我知道 !important 的副作用']
      },
      feynman: '请用「门禁卡等级」的比喻，解释为什么 ID 选择器会压过类选择器。'
    }),

    Z.makeLesson({
      id: 'html-box-L2', kpIds: ['css-box'], subject: 'cs', level: 2,
      title: '盒模型：width 到底量的是哪一层',
      estMinutes: 40,
      hookTitle: 'width 写了 200px，为什么量出来是 250px？',
      hookBody: '因为你量的是盒子外面。默认 content-box 下，width 只算内容区，padding 和 border 会额外加上去；换成 border-box，width 才等于你看到的整个盒子。',
      idea: '每个元素都是一个**矩形盒子**，由 content、padding、border、margin 四层组成。`box-sizing` 决定 width 算到哪一层：content-box 只算内容，border-box 算到边框。',
      diagramId: 'css-box', diagramCaption: '从内到外：内容区、内边距、边框、外边距',
      analogy: { title: '相框与留白', md: '内容区是照片，padding 是照片与相框之间的卡纸留白，border 是相框边框，margin 是相框与相框之间的距离。你买相框时说的尺寸通常指外框，而不是照片本身。' },
      points: [
        { title: '一、四层由内到外', md: 'content 放文字与图片，padding 撑开内容与边框的距离，border 画边框，margin 推开与其他元素的距离。背景色默认覆盖 content、padding 与 border，不覆盖 margin。' },
        { title: '二、content-box 是默认值', md: 'width 只表示内容区宽度，实际占位 = width + 左右 padding + 左右 border。写 200px 加 20px 内边距和 5px 边框，总宽就是 250px，容易算错。' },
        { title: '三、border-box 更符合直觉', md: '设置 `box-sizing: border-box` 后，width 已包含 padding 与 border，内容区会自动缩小。设 300px 就是 300px，做栅格和卡片时特别省心。' },
        { title: '四、padding 简写有顺序', md: '`padding: 10px` 四边相同；`padding: 10px 20px` 是上下 10、左右 20；`padding: 10px 20px 30px` 是上 10、左右 20、下 30；四个值时按上右下左顺时针。' },
        { title: '五、margin 会发生垂直折叠', md: '相邻两个块级元素的上下 margin 不会相加，而是取较大值，这叫外边距折叠。父子元素之间也可能折叠。理解这一点，才不会疑惑「间距怎么没变」。' },
        { title: '六、margin auto 负责水平居中', md: '有固定宽度的块级元素，左右 margin 设为 auto 时会把剩余空间均分，从而水平居中。行内元素或不设宽度的元素，auto 不会产生居中效果。' },
        { title: '七、overflow 处理内容溢出', md: '内容超过盒子尺寸时，默认可见并溢出。`overflow: hidden` 裁剪，`auto` 需要时出现滚动条，`scroll` 总是出现。圆角裁剪、清除浮动都常用到它。' }
      ],
      table: {
        headers: ['属性 / 值', '作用', '注意'],
        rows: [
          ['content-box', 'width 只算内容区', '默认值，实际更宽'],
          ['border-box', 'width 含 padding 与 border', '推荐全局设置'],
          ['padding', '内容与边框的距离', '会撑大 content-box'],
          ['margin', '盒子与其他元素的距离', '垂直方向会折叠'],
          ['margin: 0 auto', '块级盒子水平居中', '必须有确定宽度'],
          ['overflow', '内容溢出处理', 'hidden / auto / scroll']
        ]
      },
      code: '.card {\n  box-sizing: border-box;\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #ddd;\n  margin: 0 auto;\n}\n\n.inner {\n  width: 100%;\n}',
      warning: '写 `height: 100%` 却没给父元素确定高度，通常不会生效；百分比高度需要父级有可计算的高度来源。',
      tip: '项目开头先写 `* { box-sizing: border-box; }`，之后所有 width 都按可见宽度思考。',
      quizIds: ['html-box-1', 'html-box-2', 'html-box-3', 'html-box-4'],
      example: {
        title: '算清一个盒子的实际占位',
        steps: [
          { md: '假设 content-box，width 200px，padding 20px，border 5px。' },
          { md: '左右 padding 共 40px，左右 border 共 10px。' },
          { md: '实际总宽 = 200 + 40 + 10 = 250px。' },
          { md: '若加上左右 margin 各 10px，元素占位变成 270px。' }
        ],
        takeaway: 'content-box 下先加 padding 与 border，再考虑 margin 的额外占位。'
      },
      example2: {
        title: '让卡片不再撑破容器',
        steps: [
          { md: '现象：容器宽 300px，卡片 width 300px 加 padding 后横向溢出。' },
          { md: '给卡片加 `box-sizing: border-box`。' },
          { md: 'width 仍为 300px，内容区自动变成 300 减 padding 与 border。' },
          { md: '卡片完整落在容器内，不再出现横向滚动条。' }
        ],
        takeaway: '固定宽度加内边距时，border-box 是最省心的选择。'
      },
      guided: [{ questionId: 'html-box-1', hint: 'content-box 下 width 不含左右 padding 与左右 border。' }],
      solo: ['html-box-2', 'html-box-3'],
      challenge: ['html-box-4'],
      summary: {
        essence: '盒子由 content、padding、border、margin 组成；box-sizing 决定 width 算到哪一层。',
        formulas: ['content-box 总宽 = width + 左右 padding + 左右 border', 'border-box 总宽 = width（margin 另算）'],
        pitfalls: ['把 margin 算进盒子宽度', '百分比高度没有父级高度', '以为 margin 垂直方向会相加', '行内元素设 width 无效'],
        checklist: ['我能画出盒模型四层', '我能算 content-box 的实际宽度', '我会用 border-box 控制尺寸', '我知道 margin 折叠与 auto 居中']
      },
      feynman: '请解释为什么 `width: 200px; padding: 20px; border: 5px` 的盒子总宽是 250px，以及怎么让它就是 200px。'
    }),

    Z.makeLesson({
      id: 'html-flex-L3', kpIds: ['css-flex'], subject: 'cs', level: 3,
      title: 'Flex 布局：一条主轴，两种对齐',
      estMinutes: 45,
      hookTitle: '为什么 justify-content 有时横着排，有时竖着排？',
      hookBody: '因为它永远作用于主轴，而主轴方向由 flex-direction 决定。默认 row 主轴水平，改成 column 后主轴变竖直，justify-content 与 align-items 的效果就对调了。',
      idea: 'Flex 是**一维布局**：容器设置 `display: flex` 后，子项沿**主轴**排列，另一条叫**交叉轴**。`justify-content` 管主轴分布，`align-items` 管交叉轴对齐，`flex` 管子项如何伸缩。',
      diagramId: 'css-box', diagramCaption: '主轴与交叉轴互相垂直，方向由 flex-direction 决定',
      analogy: { title: '一排可伸缩的书架', md: '容器是书架，子项是书。row 时书从左往右排，column 时从上往下叠。justify-content 决定书在排列方向上怎么分布，align-items 决定书在另一方向上靠上、居中还是靠下。flex 则决定每本书能占多宽。' },
      points: [
        { title: '一、display: flex 开启布局', md: '给容器写 `display: flex`，它的直接子元素自动变成 flex 子项并排排列。Flex 只影响直接子元素，孙子元素仍按普通文档流处理。' },
        { title: '二、主轴与交叉轴', md: '默认 `flex-direction: row`，主轴水平向右，交叉轴垂直向下。改成 column 后主轴竖直，交叉轴水平。所有对齐属性都相对这两条轴，而不是相对屏幕。' },
        { title: '三、justify-content 管主轴', md: '常用值有 flex-start、flex-end、center、space-between、space-around、space-evenly。center 让子项整体居中，space-between 让首尾贴边、中间均分。' },
        { title: '四、align-items 管交叉轴', md: '`stretch` 是默认值，子项在交叉轴方向拉满；`center` 居中；`flex-start` 与 `flex-end` 靠两端。单行布局用它，多行要用 align-content。' },
        { title: '五、flex 简写控制伸缩', md: '`flex: 1` 展开为 grow 1、shrink 1、basis 0%，多个子项都写 flex: 1 就等分剩余空间。只写 `flex: 0 0 200px` 表示不伸不缩、固定 200px。' },
        { title: '六、flex-wrap 与 gap', md: '默认 nowrap 不换行，子项会被压缩。写 `flex-wrap: wrap` 后空间不够就换行。`gap` 直接设置子项间距，比给每个子项加 margin 更干净，也不会在首尾多出空隙。' },
        { title: '七、三个高频布局套路', md: '水平垂直居中：justify-content 与 align-items 都写 center。等分卡片：子项统一 flex: 1。两栏侧边固定、主区自适应：侧边 `flex: 0 0 200px`，主区 `flex: 1`。' }
      ],
      table: {
        headers: ['属性', '作用轴', '常用值'],
        rows: [
          ['flex-direction', '定义主轴方向', 'row / column'],
          ['justify-content', '主轴分布', 'center / space-between'],
          ['align-items', '交叉轴对齐', 'center / stretch / flex-start'],
          ['flex-wrap', '是否换行', 'nowrap / wrap'],
          ['gap', '子项间距', '12px / 1rem'],
          ['flex', '子项伸缩简写', '1 / 0 0 200px']
        ]
      },
      code: '.row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 200px;\n}\n\n.grow {\n  flex: 1;\n}',
      warning: 'flex 子项默认 `min-width: auto`，内容（尤其是长单词或图片）会把子项撑得比预期宽。需要真正压缩时加 `min-width: 0`。',
      tip: '先定方向，再分主轴，最后调对齐：direction → justify-content → align-items。',
      quizIds: ['html-flex-1', 'html-flex-2', 'html-flex-3', 'html-flex-4'],
      example: {
        title: '做一个水平垂直居中',
        steps: [
          { md: '容器写 `display: flex`。' },
          { md: '主轴方向保持默认 row。' },
          { md: '写 `justify-content: center`，子项水平居中。' },
          { md: '写 `align-items: center`，子项垂直居中；容器需要有高度才看得出效果。' }
        ],
        takeaway: '居中就是两条轴各写一个 center，不需要绝对定位。'
      },
      example2: {
        title: '侧边固定、主区自适应',
        steps: [
          { md: '外层容器写 `display: flex`。' },
          { md: '侧边栏写 `flex: 0 0 200px`，不伸不缩固定 200px。' },
          { md: '主内容区写 `flex: 1`，自动占满剩余宽度。' },
          { md: '容器加 `gap: 16px`，两栏之间留出间距。' }
        ],
        takeaway: '固定 + 自适应是 Flex 最常用的一组组合拳。'
      },
      guided: [{ questionId: 'html-flex-2', hint: '简写三个值依次是 grow、shrink、basis。' }],
      solo: ['html-flex-1', 'html-flex-3'],
      challenge: ['html-flex-4'],
      summary: {
        essence: 'Flex 沿主轴排列；justify-content 管主轴，align-items 管交叉轴，flex 管伸缩。',
        formulas: ['flex: grow shrink basis', 'flex: 1 = 1 1 0%', '居中：justify-content + align-items 都为 center'],
        pitfalls: ['把 justify 与 align 的轴记反', '子项被内容撑破', '以为 flex: 1 等于 width: 100%', '多行对齐误用 align-items'],
        checklist: ['我能说出当前主轴方向', '我会用 justify-content 做分布', '我会用 align-items 做对齐', '我能写固定加自适应的两栏']
      },
      feynman: '请解释为什么把 flex-direction 改成 column 后，justify-content 与 align-items 的效果会对调。'
    }),

    Z.makeLesson({
      id: 'html-resp-L3', kpIds: ['css-responsive'], subject: 'cs', level: 3,
      title: '响应式：一份代码适应所有屏幕',
      estMinutes: 45,
      hookTitle: '同一份代码，为什么手机上排版全乱了？',
      hookBody: '因为手机默认按 980px 宽的「虚拟桌面」渲染，再把页面缩小塞进屏幕。没有 viewport 声明，你写的媒体查询根本对不上真实屏幕宽度。',
      idea: '响应式 = **流式布局 + 媒体查询 + 自适应媒体**。宽度尽量用百分比、fr、rem 等相对单位，在断点处用 `@media` 调整布局；移动优先意味着先写小屏样式，再用 `min-width` 逐步增强。',
      diagramId: 'css-box', diagramCaption: '窄屏单列，宽屏多列，盒子随视口变化',
      analogy: { title: '同一套家具换房间', md: '小房间把书桌靠墙、椅子收起；大房间可以把书桌居中、再加一张边桌。家具本身不变，摆放规则随空间调整。响应式就是给布局准备几套摆放规则，由屏幕宽度决定用哪一套。' },
      points: [
        { title: '一、viewport 是第一步', md: '`<meta name="viewport" content="width=device-width, initial-scale=1.0">` 让布局视口等于设备宽度，初始缩放为 1。没有它，手机会把页面当成 980px 宽的桌面页整体缩小。' },
        { title: '二、媒体查询的语法', md: '`@media (min-width: 768px) { ... }` 在视口宽度不小于 768px 时生效。可以组合条件，用 `and` 连接，例如同时限制最小与最大宽度。' },
        { title: '三、移动优先怎么写', md: '先写基础样式适配最窄屏，再用 min-width 断点逐步加列、加大间距。这样样式是叠加增强的，不会互相打架，也更容易维护。' },
        { title: '四、断点跟着内容走', md: '常见断点是 576、768、992、1200px 左右，但不要机械照搬。把浏览器拖窄，看布局在哪一刻变得难读，那一刻就是你的断点。' },
        { title: '五、宽度用相对单位', md: '容器用百分比或 flex 自适应，字号可以用 rem，视口相关尺寸用 vw。满屏写死 1200px 宽度，在手机上必然横向滚动。' },
        { title: '六、图片与文字要自适应', md: '`img { max-width: 100%; height: auto; }` 保证图片不超出容器且不变形。长英文单词可以用 `overflow-wrap: break-word` 防止撑破窄屏。' },
        { title: '七、常见误区与检查', md: '只写 max-width 不写 viewport、用固定 px 宽度、桌面样式覆盖移动样式、忘记测试 320px 小屏，这些都是响应式失败的常见原因。' }
      ],
      table: {
        headers: ['方案', '写法', '适用场景'],
        rows: [
          ['viewport', 'meta name=viewport', '所有移动端页面'],
          ['min-width 查询', '@media (min-width: 768px)', '移动优先增强'],
          ['max-width 查询', '@media (max-width: 600px)', '桌面优先降级'],
          ['百分比宽度', 'width: 100%', '容器随父级变化'],
          ['图片自适应', 'max-width: 100%; height: auto', '内容图片'],
          ['弹性换行', 'flex-wrap: wrap', '卡片列表']
        ]
      },
      code: '.cards {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\nimg {\n  max-width: 100%;\n  height: auto;\n}\n\n@media (min-width: 768px) {\n  .cards {\n    flex-direction: row;\n  }\n}',
      warning: '只写媒体查询而不写 viewport，手机仍按 980px 虚拟视口渲染，查询条件几乎永远命中不了你预期的窄屏样式。',
      tip: '先做最窄屏，再逐级加宽；每加一个断点，只改必要的属性。',
      quizIds: ['html-resp-1', 'html-resp-2', 'html-resp-3', 'html-resp-4'],
      example: {
        title: '两栏在窄屏变一栏',
        steps: [
          { md: '默认给卡片容器写 `flex-direction: column`，窄屏单列排列。' },
          { md: '在 head 里写好 viewport 声明。' },
          { md: '加 `@media (min-width: 768px)`。' },
          { md: '在查询内把 flex-direction 改成 row，宽屏变两栏。' }
        ],
        takeaway: '移动优先 = 默认单列 + min-width 增强为多列。'
      },
      example2: {
        title: '让图片与长文字都不撑破',
        steps: [
          { md: '给图片写 `max-width: 100%; height: auto`。' },
          { md: '给文本容器写 `overflow-wrap: break-word`。' },
          { md: '把容器宽度设为百分比，而不是固定像素。' },
          { md: '拖窄浏览器到 320px，确认没有横向滚动条。' }
        ],
        takeaway: '响应式检查的底线：320px 宽时不出现横向滚动。'
      },
      guided: [{ questionId: 'html-resp-1', hint: 'viewport 改的是布局视口宽度，不是页面缩放倍数。' }],
      solo: ['html-resp-2', 'html-resp-3'],
      challenge: ['html-resp-4'],
      summary: {
        essence: '响应式靠 viewport、媒体查询与相对单位；移动优先用 min-width 逐级增强。',
        formulas: ['@media (min-width: 768px) { ... }', 'img { max-width: 100%; height: auto; }'],
        pitfalls: ['漏写 viewport', '容器写死固定宽度', '移动优先却用 max-width 层层覆盖', '图片只设宽度导致变形'],
        checklist: ['我会写 viewport 声明', '我能写 min-width 与 max-width 查询', '我知道移动优先的顺序', '我会让图片与长文字自适应']
      },
      feynman: '请解释没有 viewport 时手机为什么把页面缩小，以及媒体查询为什么会失效。'
    })
  );
})(window.ZSB = window.ZSB || {});
