/* 讲义图解库：内联 SVG，统一风格，移动端自适应 */
(function (Z) {
  function t(x, y, s, size, anchor, weight, fill) {
    return '<text x="' + x + '" y="' + y + '" font-size="' + (size || 13) + '" text-anchor="' + (anchor || 'middle') +
      '" fill="' + (fill || 'currentColor') + '"' + (weight ? ' font-weight="' + weight + '"' : '') + '>' + s + '</text>';
  }
  function r(x, y, w, h, label, fill, stroke) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="' + (fill || 'none') +
      '" stroke="' + (stroke || 'currentColor') + '" stroke-width="1.4" opacity="0.95"/>' +
      (label ? t(x + w / 2, y + h / 2 + 5, label, 13, 'middle', 650) : '');
  }
  function arrow(x1, y1, x2, y2, label) {
    return '<defs><marker id="ah' + x1 + y1 + x2 + y2 + '" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">' +
      '<path d="M0,0 L8,4 L0,8 z" fill="var(--accent)"/></marker></defs>' +
      '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--accent)" stroke-width="1.6" marker-end="url(#ah' + x1 + y1 + x2 + y2 + ')"/>' +
      (label ? t((x1 + x2) / 2, (y1 + y2) / 2 - 7, label, 11.5, 'middle', 500, 'var(--text-dim)') : '');
  }
  function svg(inner, h) {
    return '<svg viewBox="0 0 640 ' + (h || 300) + '" class="diagram-svg" role="img">' + inner + '</svg>';
  }
  function frame(title) {
    return '<div class="diagram-title">' + title + '</div>';
  }

  var D = {};

  D['wordclass-map'] = {
    caption: '同一个句子，每个词都有自己的岗位',
    svg: frame('词性 = 句子里的岗位') + svg(
      r(40, 36, 560, 52, 'The quick fox jumps over the lazy dog.', 'rgba(124,156,255,.10)', 'var(--accent)') +
      t(80, 122, 'The', 13, 'middle', 700, 'var(--amber)') + t(80, 140, '冠词', 10, 'middle', 400, 'var(--text-dim)') +
      t(160, 122, 'quick', 13, 'middle', 700, 'var(--green)') + t(160, 140, '形容词', 10, 'middle', 400, 'var(--text-dim)') +
      t(238, 122, 'fox', 13, 'middle', 700, 'var(--accent)') + t(238, 140, '名词', 10, 'middle', 400, 'var(--text-dim)') +
      t(322, 122, 'jumps', 13, 'middle', 700, 'var(--red)') + t(322, 140, '动词', 10, 'middle', 400, 'var(--text-dim)') +
      t(404, 122, 'over', 13, 'middle', 700, 'var(--amber)') + t(404, 140, '介词', 10, 'middle', 400, 'var(--text-dim)') +
      t(488, 122, 'lazy', 13, 'middle', 700, 'var(--green)') + t(488, 140, '形容词', 10, 'middle', 400, 'var(--text-dim)') +
      t(562, 122, 'dog', 13, 'middle', 700, 'var(--accent)') + t(562, 140, '名词', 10, 'middle', 400, 'var(--text-dim)') +
      r(62, 190, 150, 48, '谁 / 什么 → 名词', 'rgba(124,156,255,.08)') +
      r(245, 190, 150, 48, '做什么 → 动词', 'rgba(255,107,122,.08)') +
      r(428, 190, 150, 48, '什么样 → 形容词', 'rgba(61,220,151,.08)') +
      t(320, 276, '先看位置和搭配，再判断词性；不要只背单词表。', 12, 'middle', 500, 'var(--text-dim)')
    )
  };

  D['sentence-tree'] = {
    caption: '先抓主干，再挂修饰',
    svg: frame('句子骨架：主谓宾') + svg(
      r(255, 20, 130, 40, '句子 S', 'rgba(124,156,255,.12)', 'var(--accent)') +
      r(130, 96, 140, 40, '主语 NP', 'rgba(61,220,151,.10)') + r(370, 96, 140, 40, '谓语 VP', 'rgba(255,200,87,.10)') +
      arrow(285, 60, 205, 94) + arrow(355, 60, 435, 94) +
      r(60, 176, 120, 38, 'The fox', 'rgba(61,220,151,.08)') + r(210, 176, 120, 38, '定语从句', 'rgba(61,220,151,.08)') +
      r(370, 176, 100, 38, 'jumps', 'rgba(255,200,87,.08)') + r(500, 176, 100, 38, 'over…', 'rgba(255,200,87,.08)') +
      arrow(200, 136, 130, 174) + arrow(200, 136, 270, 174) + arrow(440, 136, 420, 174) + arrow(440, 136, 550, 174) +
      t(320, 270, '主干 = 谁 + 做什么；从句和介词短语先括起来。', 12, 'middle', 500, 'var(--text-dim)')
    )
  };

  D['clause-types'] = {
    caption: '三大从句：看它在句子里充当什么成分',
    svg: frame('从句的三条分支') + svg(
      r(245, 18, 150, 42, '从句', 'rgba(124,156,255,.12)', 'var(--accent)') +
      arrow(280, 60, 120, 98) + arrow(320, 60, 320, 98) + arrow(360, 60, 520, 98) +
      r(40, 100, 160, 54, '定语从句', 'rgba(61,220,151,.10)') + r(240, 100, 160, 54, '名词性从句', 'rgba(255,200,87,.10)') + r(440, 100, 160, 54, '状语从句', 'rgba(178,141,255,.10)') +
      t(120, 180, '修饰前面的名词', 12, 'middle', 500, 'var(--text-dim)') + t(120, 198, 'who / which / that', 11, 'middle', 400, 'var(--text-faint)') +
      t(320, 180, '充当主/宾/表语', 12, 'middle', 500, 'var(--text-dim)') + t(320, 198, 'that / whether / what', 11, 'middle', 400, 'var(--text-faint)') +
      t(520, 180, '表时间/原因/条件', 12, 'middle', 500, 'var(--text-dim)') + t(520, 198, 'when / because / if', 11, 'middle', 400, 'var(--text-faint)') +
      t(320, 266, '判断口诀：从句缺成分 → 名词性；修饰名词 → 定语；修饰整句 → 状语。', 11.5, 'middle', 500, 'var(--text-dim)')
    )
  };

  D['nonfinite-map'] = {
    caption: '一个句子只有一个谓语，其余动词要「降级」',
    svg: frame('非谓语三件套') + svg(
      r(30, 26, 580, 40, 'I want to finish the work before the deadline.', 'rgba(124,156,255,.08)') +
      t(320, 100, 'to finish 不是谓语，而是 want 的宾语', 13, 'middle', 600, 'var(--accent)') +
      r(40, 140, 170, 60, 'to do', 'rgba(255,200,87,.10)') + r(235, 140, 170, 60, 'doing', 'rgba(61,220,151,.10)') + r(430, 140, 170, 60, 'done', 'rgba(178,141,255,.10)') +
      t(125, 228, '目的 / 将来 / 一次', 12, 'middle', 500, 'var(--text-dim)') + t(320, 228, '主动 / 进行', 12, 'middle', 500, 'var(--text-dim)') + t(515, 228, '被动 / 完成', 12, 'middle', 500, 'var(--text-dim)') +
      t(320, 272, '先找句子唯一的谓语，再把其他动词改成 to do / doing / done。', 11.5, 'middle', 500, 'var(--text-dim)')
    )
  };

  D['tense-timeline'] = {
    caption: '时间轴帮你选时态，而不是背表格',
    svg: frame('时间轴上的四种基本时态') + svg(
      '<line x1="40" y1="150" x2="600" y2="150" stroke="var(--line)" stroke-width="2"/>' +
      '<circle cx="40" cy="150" r="4" fill="var(--text-faint)"/><circle cx="320" cy="150" r="5" fill="var(--accent)"/><circle cx="600" cy="150" r="4" fill="var(--text-faint)"/>' +
      t(60, 180, '过去', 12, 'middle', 700, 'var(--text-dim)') + t(320, 180, '现在', 12, 'middle', 700, 'var(--accent)') + t(580, 180, '将来', 12, 'middle', 700, 'var(--text-dim)') +
      r(55, 62, 170, 50, 'did / was doing', 'rgba(255,200,87,.09)') + r(235, 62, 170, 50, 'do / does / is doing', 'rgba(124,156,255,.10)') + r(415, 62, 170, 50, 'will do', 'rgba(61,220,151,.09)') +
      arrow(140, 114, 140, 148) + arrow(320, 114, 320, 148) + arrow(500, 114, 500, 148) +
      t(320, 244, '看到 yesterday / now / tomorrow，先在轴上定位，再选形式。', 11.5, 'middle', 500, 'var(--text-dim)') +
      t(320, 267, '现在完成时不在这条「点」上，它是一条从过去连到现在的线。', 11.5, 'middle', 600, 'var(--amber)')
    )
  };

  D['perfect-timeline'] = {
    caption: '现在完成时：过去发生，影响现在',
    svg: frame('have done = 过去 → 现在') + svg(
      '<line x1="40" y1="190" x2="600" y2="190" stroke="var(--line)" stroke-width="2"/>' +
      '<circle cx="150" cy="190" r="6" fill="var(--amber)"/><circle cx="500" cy="190" r="6" fill="var(--accent)"/>' +
      t(150, 220, '动作发生', 12, 'middle', 700, 'var(--amber)') + t(500, 220, '现在', 12, 'middle', 700, 'var(--accent)') +
      '<path d="M158 186 Q320 96 490 184" fill="none" stroke="var(--accent)" stroke-width="2" stroke-dasharray="6 5"/>' +
      t(320, 104, 'I have finished my homework.', 13, 'middle', 650, 'var(--accent)') +
      t(320, 128, '强调「现在手里是完成状态」，不是「过去某时做了」', 11.5, 'middle', 500, 'var(--text-dim)') +
      r(120, 248, 180, 34, 'I did it yesterday.', 'rgba(255,200,87,.08)', 'var(--line)') + r(340, 248, 180, 34, 'I have done it.', 'rgba(124,156,255,.10)', 'var(--accent)') +
      t(210, 300, '一般过去：只讲过去', 10.5, 'middle', 500, 'var(--text-dim)') + t(430, 300, '现在完成：还管现在', 10.5, 'middle', 500, 'var(--text-dim)')
    , 320)
  };

  D['passive-transform'] = {
    caption: '主动变被动：宾语提前，动词变 be + done',
    svg: frame('主动 → 被动') + svg(
      r(40, 60, 250, 70, 'The teacher corrected the papers.', 'rgba(255,200,87,.08)') +
      r(350, 60, 250, 70, 'The papers were corrected by the teacher.', 'rgba(124,156,255,.10)') +
      arrow(292, 95, 348, 95, '变换') +
      t(165, 160, '主语  teacher', 11.5, 'middle', 500, 'var(--text-dim)') + t(165, 180, '宾语  the papers', 11.5, 'middle', 500, 'var(--text-dim)') +
      t(475, 160, '主语  the papers', 11.5, 'middle', 500, 'var(--text-dim)') + t(475, 180, 'by + 原主语（可省）', 11.5, 'middle', 500, 'var(--text-dim)') +
      t(320, 232, 'be 的时态跟着原句走，done 永远不变。', 12.5, 'middle', 650, 'var(--accent)') +
      t(320, 264, '不是所有动词都能被动：happen / appear / belong 等不及物动词没有被动。', 11.5, 'middle', 500, 'var(--text-dim)')
    )
  };

  D['reading-scan'] = {
    caption: '先读题干，再回文定位，最后比对同义替换',
    svg: frame('阅读定位三步') + svg(
      r(30, 30, 250, 190, '', 'rgba(124,156,255,.05)') +
      t(155, 54, '文章', 12, 'middle', 700, 'var(--accent)') +
      '<line x1="48" y1="78" x2="262" y2="78" stroke="var(--line)"/>' +
      '<line x1="48" y1="108" x2="262" y2="108" stroke="var(--line)"/>' +
      '<line x1="48" y1="138" x2="240" y2="138" stroke="var(--line)"/>' +
      '<line x1="48" y1="168" x2="262" y2="168" stroke="var(--line)"/>' +
      '<line x1="48" y1="198" x2="210" y2="198" stroke="var(--line)"/>' +
      '<rect x="150" y="126" width="70" height="18" rx="4" fill="rgba(255,200,87,.3)"/>' +
      r(330, 60, 260, 44, '① 圈题干关键词', 'rgba(61,220,151,.09)') +
      r(330, 126, 260, 44, '② 回文找同义替换', 'rgba(255,200,87,.09)') +
      r(330, 192, 260, 44, '③ 比对选项，排除偷换', 'rgba(178,141,255,.09)') +
      arrow(300, 150, 328, 148) +
      t(320, 268, '定位不到，往往不是单词不认识，而是没找同义词。', 11.5, 'middle', 500, 'var(--text-dim)')
    )
  };

  D['translation-chunk'] = {
    caption: '长句先切块，再按中文顺序重排',
    svg: frame('翻译：切块 → 定主干 → 重排') + svg(
      r(24, 34, 592, 46, 'The book / that I bought / last week / is / very useful.', 'rgba(124,156,255,.07)') +
      t(110, 110, '名词', 11, 'middle', 600, 'var(--accent)') + t(250, 110, '定语从句', 11, 'middle', 600, 'var(--green)') +
      t(380, 110, '时间状语', 11, 'middle', 600, 'var(--amber)') + t(480, 110, '谓语', 11, 'middle', 600, 'var(--red)') + t(560, 110, '表语', 11, 'middle', 600, 'var(--accent)') +
      arrow(320, 130, 320, 158) +
      r(60, 166, 520, 44, '我上周买的那本书 非常有用', 'rgba(61,220,151,.10)') +
      t(320, 248, '口诀：先找主干主谓宾，从句和状语用括号装起来，最后按中文习惯挪位置。', 11.5, 'middle', 500, 'var(--text-dim)')
    , 280)
  };

  D['limit-approach'] = {
    caption: '极限不是「到了」，而是「无限靠近」',
    svg: frame('x 从两侧逼近 a') + svg(
      '<line x1="40" y1="180" x2="600" y2="180" stroke="var(--line)" stroke-width="2"/>' +
      '<circle cx="320" cy="180" r="5" fill="var(--accent)"/>' +
      t(320, 206, 'a', 13, 'middle', 700, 'var(--accent)') +
      '<circle cx="230" cy="180" r="4" fill="var(--amber)"/><circle cx="410" cy="180" r="4" fill="var(--green)"/>' +
      t(230, 160, 'x < a', 12, 'middle', 600, 'var(--amber)') + t(410, 160, 'x > a', 12, 'middle', 600, 'var(--green)') +
      arrow(240, 174, 306, 174) + arrow(400, 174, 334, 174) +
      r(200, 56, 240, 50, 'f(x) → L', 'rgba(124,156,255,.10)') +
      t(320, 250, '左右极限都存在且相等，极限才存在。', 12, 'middle', 500, 'var(--text-dim)') +
      t(320, 274, '函数在 a 点有没有定义，不影响极限。', 11.5, 'middle', 500, 'var(--text-faint)')
    )
  };

  D['continuity-gap'] = {
    caption: '三类间断点：可去、跳跃、无穷',
    svg: frame('连续 = 左极限 = 右极限 = 函数值') + svg(
      '<path d="M30 200 Q90 60 145 190" fill="none" stroke="var(--green)" stroke-width="2"/>' +
      '<circle cx="145" cy="150" r="5" fill="none" stroke="var(--green)" stroke-width="2"/>' +
      t(95, 236, '可去间断', 11.5, 'middle', 600, 'var(--green)') +
      '<path d="M230 190 Q270 90 300 90" fill="none" stroke="var(--amber)" stroke-width="2"/>' +
      '<path d="M300 130 Q330 130 370 130" fill="none" stroke="var(--amber)" stroke-width="2"/>' +
      '<circle cx="300" cy="90" r="4" fill="var(--amber)"/><circle cx="300" cy="130" r="4" fill="var(--amber)"/>' +
      t(300, 236, '跳跃间断', 11.5, 'middle', 600, 'var(--amber)') +
      '<path d="M430 210 Q470 200 485 60" fill="none" stroke="var(--red)" stroke-width="2"/>' +
      '<line x1="490" y1="40" x2="490" y2="230" stroke="var(--red)" stroke-width="1" stroke-dasharray="4 4"/>' +
      t(485, 250, '无穷间断', 11.5, 'middle', 600, 'var(--red)') +
      t(320, 32, '判断连续：先算左右极限，再比较函数值。', 12, 'middle', 500, 'var(--text-dim)')
    , 290)
  };

  D['derivative-tangent'] = {
    caption: '割线斜率的极限 = 切线斜率',
    svg: frame('从割线到切线') + svg(
      '<path d="M60 230 Q220 40 560 200" fill="none" stroke="var(--text-dim)" stroke-width="2"/>' +
      '<circle cx="230" cy="105" r="5" fill="var(--accent)"/>' +
      t(230, 88, 'P', 12, 'middle', 700, 'var(--accent)') +
      '<circle cx="400" cy="122" r="4" fill="var(--amber)"/>' +
      t(400, 106, 'Q', 12, 'middle', 700, 'var(--amber)') +
      '<line x1="150" y1="55" x2="490" y2="180" stroke="var(--amber)" stroke-width="1.8" stroke-dasharray="5 4"/>' +
      '<line x1="120" y1="152" x2="380" y2="52" stroke="var(--accent)" stroke-width="2"/>' +
      t(320, 258, 'Q 越靠近 P，割线越接近切线；切线斜率就是 f′(x₀)。', 12, 'middle', 500, 'var(--text-dim)')
    )
  };

  D['extremum-curve'] = {
    caption: '导数符号决定升降，升降转折处是极值',
    svg: frame('单调性与极值') + svg(
      '<path d="M50 220 Q140 190 210 120 Q260 70 320 90 Q390 120 440 80 Q500 40 580 90" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
      '<line x1="210" y1="40" x2="210" y2="240" stroke="var(--line)" stroke-dasharray="4 4"/>' +
      '<line x1="440" y1="40" x2="440" y2="240" stroke="var(--line)" stroke-dasharray="4 4"/>' +
      t(130, 248, '+', 18, 'middle', 800, 'var(--green)') + t(320, 248, '−', 18, 'middle', 800, 'var(--red)') + t(520, 248, '+', 18, 'middle', 800, 'var(--green)') +
      t(210, 270, '极大值', 11.5, 'middle', 600, 'var(--green)') + t(440, 270, '极小值', 11.5, 'middle', 600, 'var(--red)') +
      t(320, 32, 'f′(x) > 0 → 增；f′(x) < 0 → 减；变号点 → 极值。', 12, 'middle', 500, 'var(--text-dim)')
    , 300)
  };

  D['integral-area'] = {
    caption: '定积分 = 无数细长条面积之和的极限',
    svg: frame('黎曼和 → 定积分') + svg(
      '<line x1="40" y1="220" x2="600" y2="220" stroke="var(--line)" stroke-width="2"/>' +
      '<line x1="60" y1="240" x2="60" y2="40" stroke="var(--line)" stroke-width="2"/>' +
      '<path d="M70 210 Q180 60 330 120 Q470 180 590 70" fill="none" stroke="var(--accent)" stroke-width="2"/>' +
      [0, 1, 2, 3, 4, 5, 6].map(function (i) {
        var x = 90 + i * 66;
        return '<rect x="' + x + '" y="' + (170 - i * 7) + '" width="58" height="' + (50 + i * 7) + '" fill="rgba(124,156,255,.16)" stroke="var(--accent)" stroke-width="0.8"/>';
      }).join('') +
      t(330, 258, '∫ₐᵇ f(x) dx', 15, 'middle', 700, 'var(--accent)') +
      t(560, 250, 'x', 12, 'middle', 600, 'var(--text-dim)') +
      t(40, 56, 'y', 12, 'middle', 600, 'var(--text-dim)')
    )
  };

  D['loop-flow'] = {
    caption: '循环三件事：起点、条件、更新',
    svg: frame('for 循环流程') + svg(
      r(240, 20, 160, 42, '初始化 i = 1', 'rgba(124,156,255,.10)') +
      arrow(320, 62, 320, 88) +
      '<path d="M245 96 L395 96 L360 136 L280 136 Z" fill="rgba(255,200,87,.10)" stroke="var(--amber)" stroke-width="1.4"/>' +
      t(320, 121, 'i <= n ?', 12.5, 'middle', 700, 'var(--amber)') +
      arrow(360, 136, 430, 178, '是') +
      r(370, 180, 150, 44, '执行循环体', 'rgba(61,220,151,.10)') +
      arrow(445, 224, 445, 260) +
      r(375, 262, 140, 40, 'i++ 更新', 'rgba(61,220,151,.10)') +
      '<path d="M375 282 H200 V118 H245" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="5 4"/>' +
      arrow(280, 136, 185, 178, '否') +
      r(60, 180, 125, 44, '退出循环', 'rgba(255,107,122,.08)') +
      t(320, 34, '', 11)
    )
  };

  D['array-index'] = {
    caption: '数组在内存里是连续的一排盒子',
    svg: frame('下标 = 偏移量') + svg(
      [0, 1, 2, 3, 4].map(function (i) {
        return r(80 + i * 100, 90, 86, 60, ['10', '20', '30', '40', '50'][i], i === 2 ? 'rgba(124,156,255,.16)' : 'rgba(124,156,255,.06)', i === 2 ? 'var(--accent)' : 'var(--line)') +
          t(123 + i * 100, 176, '[' + i + ']', 11.5, 'middle', 600, i === 2 ? 'var(--accent)' : 'var(--text-dim)');
      }).join('') +
      t(320, 46, '起始地址 1000，每个元素占 4 字节', 12, 'middle', 500, 'var(--text-dim)') +
      t(320, 220, 'a[2] 的地址 = 1000 + 2 × 4 = 1008 → O(1) 随机访问', 12, 'middle', 600, 'var(--accent)') +
      t(320, 252, '中间插入要搬移后面所有元素 → O(n)', 11.5, 'middle', 500, 'var(--text-dim)')
    )
  };

  D['hash-bucket'] = {
    caption: '哈希函数把 key 映射到桶，冲突用链式法',
    svg: frame('哈希表：平均 O(1) 查找') + svg(
      r(40, 100, 110, 46, 'key', 'rgba(255,200,87,.10)') + arrow(152, 123, 198, 123) +
      r(200, 100, 130, 46, 'hash()', 'rgba(124,156,255,.10)') + arrow(332, 123, 378, 123) +
      [0, 1, 2, 3].map(function (i) {
        return r(420, 40 + i * 54, 120, 38, '桶 ' + i, i === 1 ? 'rgba(61,220,151,.14)' : 'rgba(124,156,255,.05)', i === 1 ? 'var(--green)' : 'var(--line)');
      }).join('') +
      r(555, 94, 55, 34, 'A', 'rgba(61,220,151,.10)', 'var(--green)') + r(555, 132, 55, 34, 'B', 'rgba(61,220,151,.10)', 'var(--green)') +
      arrow(540, 111, 554, 111) + arrow(610, 111, 618, 111) +
      t(575, 184, '冲突链', 10.5, 'middle', 500, 'var(--text-dim)') +
      t(320, 270, '桶越满，冲突越多；装填因子升高时要扩容。', 12, 'middle', 500, 'var(--text-dim)')
    )
  };

  D['function-scope'] = {
    caption: '作用域链：从内向外找变量',
    svg: frame('函数与作用域') + svg(
      r(40, 30, 560, 220, '', 'rgba(124,156,255,.04)', 'var(--line)') + t(320, 54, '全局作用域', 11.5, 'middle', 600, 'var(--text-dim)') +
      r(90, 76, 460, 150, '', 'rgba(61,220,151,.05)', 'var(--green)') + t(320, 100, '函数作用域', 11.5, 'middle', 600, 'var(--green)') +
      r(150, 120, 340, 80, '', 'rgba(255,200,87,.06)', 'var(--amber)') + t(320, 144, '块级作用域（let / const）', 11.5, 'middle', 600, 'var(--amber)') +
      t(320, 174, '局部变量先找自己，再找外层，最后找全局', 11.5, 'middle', 500, 'var(--text-dim)') +
      arrow(320, 190, 320, 208) +
      t(320, 232, '找不到 → ReferenceError；函数内部可读外层，外层读不到内部。', 11.5, 'middle', 500, 'var(--text-faint)')
    , 270)
  };

  D['recursion-tree'] = {
    caption: '递归 = 终止条件 + 规模减一的递推',
    svg: frame('factorial(3) 的调用树') + svg(
      r(250, 20, 140, 38, 'factorial(3)', 'rgba(124,156,255,.12)') +
      arrow(300, 58, 220, 88) + arrow(340, 58, 420, 88) +
      r(140, 90, 140, 36, 'factorial(2)', 'rgba(61,220,151,.08)') + t(440, 114, '× 3 返回', 11.5, 'middle', 500, 'var(--text-dim)') +
      arrow(200, 126, 160, 156) +
      r(100, 158, 130, 34, 'factorial(1)', 'rgba(61,220,151,.08)') +
      arrow(160, 192, 160, 218) +
      r(100, 220, 130, 34, 'factorial(0) = 1', 'rgba(255,200,87,.10)', 'var(--amber)') +
      t(320, 250, '递归先向下拆到终止条件，再逐层向上返回。', 12, 'middle', 500, 'var(--text-dim)') +
      t(470, 160, '每一层都要有终止条件', 11.5, 'middle', 600, 'var(--red)')
    , 270)
  };

  D['linked-list'] = {
    caption: '链表用指针把分散的节点串起来',
    svg: frame('节点 = 值 + next 指针') + svg(
      r(40, 74, 120, 60, 'head', 'rgba(124,156,255,.08)', 'var(--accent)') +
      arrow(160, 104, 198, 104) +
      r(200, 74, 120, 60, '10 | next', 'rgba(61,220,151,.10)') + arrow(320, 104, 358, 104) +
      r(360, 74, 120, 60, '20 | next', 'rgba(61,220,151,.10)') + arrow(480, 104, 518, 104) +
      r(520, 74, 80, 60, '30 | ∅', 'rgba(255,200,87,.10)', 'var(--amber)') +
      t(320, 176, '插入：先让新节点的 next 指向后继，再改前驱的 next', 12, 'middle', 500, 'var(--text-dim)') +
      t(320, 204, '顺序反了，后面的节点会丢失 —— 画图时先保存 next。', 11.5, 'middle', 600, 'var(--red)') +
      t(320, 244, '数组按下标 O(1) 访问；链表按位置 O(n) 查找，插入删除 O(1)（已知前驱）。', 11.5, 'middle', 500, 'var(--text-faint)')
    )
  };

  D['stack-queue'] = {
    caption: '栈是后进先出，队列是先进先出',
    svg: frame('栈 vs 队列') + svg(
      t(170, 32, '栈 Stack（LIFO）', 12, 'middle', 700, 'var(--accent)') +
      [0, 1, 2, 3].map(function (i) {
        return r(100, 60 + i * 44, 140, 38, ['D', 'C', 'B', 'A'][i], i === 0 ? 'rgba(124,156,255,.16)' : 'rgba(124,156,255,.05)', 'var(--accent)');
      }).join('') +
      arrow(260, 80, 300, 80, 'push / pop') +
      t(170, 252, '只能从顶部进出', 11.5, 'middle', 500, 'var(--text-dim)') +
      t(470, 32, '队列 Queue（FIFO）', 12, 'middle', 700, 'var(--green)') +
      [0, 1, 2, 3].map(function (i) {
        return r(340 + i * 66, 82, 58, 48, ['A', 'B', 'C', 'D'][i], i === 0 ? 'rgba(61,220,151,.16)' : 'rgba(61,220,151,.05)', 'var(--green)');
      }).join('') +
      arrow(320, 156, 600, 156, 'enqueue → → dequeue') +
      t(470, 200, '从队尾进、队头出', 11.5, 'middle', 500, 'var(--text-dim)') +
      t(320, 232, '用途：括号匹配 / 撤销 → 栈；层序遍历 / 任务排队 → 队列', 11.5, 'middle', 500, 'var(--text-dim)')
    , 270)
  };

  D['sort-compare'] = {
    caption: '三种基础排序：看每轮把谁放到正确位置',
    svg: frame('冒泡 / 选择 / 插入') + svg(
      t(120, 30, '冒泡：相邻比较，大的往后冒', 11.5, 'middle', 600, 'var(--accent)') +
      [3, 1, 4, 2].map(function (v, i) { return r(40 + i * 44, 50, 38, 34, String(v), 'rgba(124,156,255,.08)'); }).join('') +
      t(120, 110, '每轮确定一个最大值', 10.5, 'middle', 500, 'var(--text-dim)') +
      t(360, 30, '选择：每轮找最小，放到前面', 11.5, 'middle', 600, 'var(--green)') +
      [3, 1, 4, 2].map(function (v, i) { return r(300 + i * 44, 50, 38, 34, String(v), i === 3 ? 'rgba(61,220,151,.16)' : 'rgba(61,220,151,.08)'); }).join('') +
      t(360, 110, '交换次数少', 10.5, 'middle', 500, 'var(--text-dim)') +
      t(560, 30, '插入：像整理扑克牌', 11.5, 'middle', 600, 'var(--amber)') +
      [1, 3, 4, 2].map(function (v, i) { return r(500 + i * 34, 50, 30, 34, String(v), i === 3 ? 'rgba(255,200,87,.16)' : 'rgba(255,200,87,.08)'); }).join('') +
      t(560, 110, '接近有序时很快', 10.5, 'middle', 500, 'var(--text-dim)') +
      t(320, 180, '三者平均都是 O(n²)，稳定排序：冒泡、插入；选择不稳定。', 12, 'middle', 600, 'var(--text-dim)') +
      t(320, 214, '数据量大时用 O(n log n) 的归并 / 快速排序。', 11.5, 'middle', 500, 'var(--text-faint)')
    , 240)
  };

  D['binary-search'] = {
    caption: '每次砍掉一半，边界决定成败',
    svg: frame('二分查找 [1,3,5,7,9,11,13] 找 9') + svg(
      [1, 3, 5, 7, 9, 11, 13].map(function (v, i) {
        var hit = v === 9;
        return r(60 + i * 78, 80, 66, 48, String(v), hit ? 'rgba(61,220,151,.18)' : 'rgba(124,156,255,.05)', hit ? 'var(--green)' : 'var(--line)') +
          t(93 + i * 78, 148, '[' + i + ']', 10.5, 'middle', 500, 'var(--text-dim)');
      }).join('') +
      t(93, 176, 'low', 10.5, 'middle', 600, 'var(--accent)') + t(327, 176, 'mid', 10.5, 'middle', 600, 'var(--amber)') + t(561, 176, 'high', 10.5, 'middle', 600, 'var(--accent)') +
      arrow(60, 60, 60, 78) + arrow(327, 60, 327, 78) + arrow(561, 60, 561, 78) +
      t(320, 220, 'mid = (low + high) >> 1；目标在右半区 → low = mid + 1。', 12, 'middle', 500, 'var(--text-dim)') +
      t(320, 252, '循环条件用 low <= high，避免漏掉最后一个元素。', 11.5, 'middle', 500, 'var(--text-faint)')
    )
  };

  Z.DIAGRAMS = D;
})(window.ZSB = window.ZSB || {});
