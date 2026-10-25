/* 我的：数据雷达 / 学情预测 / 笔记 / 备份 / 设置 / 算法说明 */
(function (Z) {
  function allNotes() {
    var state = Z.store.get();
    var out = [];
    Object.keys(state.progress).forEach(function (lessonId) {
      var p = state.progress[lessonId];
      var lesson = Z.LESSON_BY_ID[lessonId];
      (p.notes || []).forEach(function (n) {
        out.push({ kind: 'note', text: n.text, blockIndex: n.blockIndex, ts: n.ts, lesson: lesson, lessonId: lessonId });
      });
      (p.highlights || []).forEach(function (h) {
        out.push({ kind: 'highlight', text: h.text, blockIndex: h.blockIndex, ts: h.ts, lesson: lesson, lessonId: lessonId });
      });
    });
    return out.sort(function (a, b) { return b.ts - a.ts; });
  }

  function radarSvg() {
    var data = [];
    Z.SUBJECT_ORDER.forEach(function (s) {
      Z.engine.chapterStats(s).forEach(function (ch) {
        data.push({ label: s === 'english' ? '英·' : (s === 'math' ? '数·' : '算·') + ch.name, value: ch.mastery });
      });
    });
    var n = data.length;
    var cx = 150, cy = 116, r = 76;
    var grid = '';
    [0.25, 0.5, 0.75, 1].forEach(function (lv) {
      var pts = [];
      for (var i = 0; i < n; i++) {
        var a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
        pts.push((cx + Math.cos(a) * r * lv).toFixed(1) + ',' + (cy + Math.sin(a) * r * lv).toFixed(1));
      }
      grid += '<polygon points="' + pts.join(' ') + '" fill="none" stroke="var(--line)" stroke-width="0.7" opacity="0.7"/>';
    });
    var axes = '', labels = '', pts2 = [];
    for (var i = 0; i < n; i++) {
      var a2 = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      axes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + Math.cos(a2) * r).toFixed(1) + '" y2="' + (cy + Math.sin(a2) * r).toFixed(1) + '" stroke="var(--line)" stroke-width="0.7"/>';
      var v = Math.max(0.04, data[i].value);
      pts2.push((cx + Math.cos(a2) * r * v).toFixed(1) + ',' + (cy + Math.sin(a2) * r * v).toFixed(1));
      var lx = cx + Math.cos(a2) * (r + 22), ly = cy + Math.sin(a2) * (r + 22);
      labels += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" dominant-baseline="middle" font-size="8.5" fill="var(--text-faint)">' + Z.ui.esc(data[i].label) + '</text>';
    }
    return '<svg viewBox="0 0 300 236" style="width:100%;max-width:330px;height:auto">' + grid + axes +
      '<polygon points="' + pts2.join(' ') + '" fill="rgba(124,156,255,.22)" stroke="var(--accent)" stroke-width="1.6"/>' +
      pts2.map(function (p) {
        var xy = p.split(',');
        return '<circle cx="' + xy[0] + '" cy="' + xy[1] + '" r="2.4" fill="var(--accent)"/>';
      }).join('') + labels + '</svg>' +
      '<div class="tiny faint" style="text-align:center">越靠外 = 该章节掌握度越高（内圈 25%，外圈 100%）</div>';
  }

  function studyBars() {
    var map = Z.store.minutesByDay();
    var days = [];
    var max = 1;
    var d = new Date();
    for (var i = 13; i >= 0; i--) {
      var dt = new Date(d.getTime() - i * 86400000);
      var k = Z.store.dayKey(dt);
      var m = map[k] || { read: 0, practice: 0 };
      max = Math.max(max, m.read + m.practice);
      days.push({ label: (dt.getMonth() + 1) + '/' + dt.getDate(), read: m.read, practice: m.practice });
    }
    var bars = days.map(function (x) {
      var rh = Math.round((x.read / max) * 100);
      var ph = Math.round((x.practice / max) * 100);
      return '<div class="study-bar" title="' + x.label + ' · 学 ' + x.read + ' 分 · 练 ' + x.practice + ' 分">' +
        (rh ? '<i class="read" style="height:' + rh + '%"></i>' : '') +
        (ph ? '<i class="practice" style="height:' + ph + '%"></i>' : '') +
        '</div>';
    }).join('');
    var labels = days.map(function (x, i) { return i % 3 === 0 ? '<span style="flex:1;text-align:center">' + x.label + '</span>' : '<span style="flex:1"></span>'; }).join('');
    return '<div class="study-bars">' + bars + '</div><div class="row" style="font-size:9px;color:var(--text-faint);gap:0;margin-top:4px">' + labels + '</div>' +
      '<div class="study-legend"><span><i class="dot" style="background:var(--accent)"></i>学</span><span><i class="dot" style="background:var(--green)"></i>练 / 模考</span></div>';
  }

  function render(view) {
    var state = Z.store.get();
    var p = state.profile;
    var days = Z.store.daysToExam();
    var overall = Z.engine.overallProgress();
    var doneLessons = Z.LESSONS.filter(function (l) {
      var lp = state.progress[l.id];
      return lp && lp.status === 'done';
    }).length;
    var chase = Z.engine.continueLastLesson();
    var pred = Z.engine.prediction();
    var gaps = Z.engine.topGaps(3);
    var notes = allNotes();
    var onlyRead = Z.engine.onlyReadingDays();

    var html = '<div class="page-head"><h1 class="page-title">我的学情</h1>' +
      '<p class="page-sub">所有数据保存在本机，刷新不丢；可导出备份。</p></div>';

    html += '<div class="card profile-head mt12"><div class="avatar">升</div><div style="flex:1;min-width:0">' +
      '<div class="card-title" style="margin:0">' + Z.ui.esc(p.province) + ' · ' + Z.ui.esc(p.major) + '</div>' +
      '<div class="tiny faint mt8">目标 ' + p.targetScores.english + ' / ' + p.targetScores.math + ' / ' + p.targetScores.cs + ' 分 · 每日 ' + p.dailyMinutes + ' 分钟</div>' +
      '<div class="tiny faint">距考试 ' + days + ' 天（' + Z.ui.esc(p.examDate) + '）</div></div>' +
      Z.ui.ring(overall, { size: 64, stroke: 5 }) + '</div>';

    html += '<div class="stat-grid mt12"><div class="stat"><b>' + Z.store.streakDays() + '</b><span>连续学习天数</span></div>' +
      '<div class="stat"><b>' + doneLessons + '</b><span>完成单元</span></div>' +
      '<div class="stat"><b>' + Math.round(Z.store.totalMinutes() / 60) + '</b><span>累计小时</span></div></div>';

    if (onlyRead >= 2) {
      html += '<div class="card mt12" style="border-color:rgba(255,200,87,.35)"><b class="amber">只学不练提醒</b>' +
        '<div class="small muted mt8">最近 ' + onlyRead + ' 天只有阅读、没有练习。懂了 ≠ 会做，今天补 5 题再收工。</div>' +
        '<button class="btn sm primary mt8" data-me-practice>去练 5 题</button></div>';
    }

    html += '<div class="card mt12"><div class="row-between"><div class="card-title" style="margin:0">三科掌握度雷达</div>' +
      '<span class="tiny faint">按章节</span></div><div class="radar-wrap mt12">' + radarSvg() + '</div></div>';

    html += '<div class="card mt12"><div class="card-title">近 14 天学习时长</div>' + studyBars() + '</div>';

    html += '<div class="card mt12"><div class="row-between"><div class="card-title" style="margin:0">达标预测</div>' +
      '<span class="tiny faint">按当前趋势外推</span></div>' +
      Z.SUBJECT_ORDER.map(function (s) {
        var x = pred.subjects[s];
        var hit = x.predicted >= x.target;
        return '<div class="row-between mt12"><div style="flex:1"><div class="small">' + Z.SUBJECTS[s].name + '</div>' +
          '<div class="progress thin mt8"><i style="width:' + Math.round((x.predicted / Z.SUBJECTS[s].fullMark) * 100) + '%"></i></div></div>' +
          '<div style="text-align:right;margin-left:10px"><b>' + Math.round(x.predicted) + '</b>' +
          '<div class="tiny ' + (hit ? 'green' : 'amber') + '">目标 ' + x.target + '</div></div></div>';
      }).join('') +
      '<div class="divider"></div>' +
      '<div class="row-between"><span class="small">总分预测</span><b>' + Math.round(pred.total.predicted) + ' / ' + pred.total.target + '</b></div>' +
      '<div class="tiny faint mt8">预测 = 当前掌握度 + 近 14 天日均增速 × 剩余天数。练得越多，预测才越有意义。</div></div>';

    html += '<div class="card mt12"><div class="row-between"><div class="card-title" style="margin:0">当前最大 3 个缺口</div>' +
      '<span class="tiny faint">按权重 × 缺口 × 紧迫度</span></div>' +
      (gaps.length ? gaps.map(function (g, i) {
        return '<div class="gap-item mt12"><div class="gap-rank">' + (i + 1) + '</div><div style="flex:1;min-width:0">' +
          '<div class="small">' + Z.ui.esc(g.kp.title) + '</div>' +
          '<div class="tiny faint">' + Z.ui.esc(Z.SUBJECTS[g.kp.subject].name) + ' · 掌握 ' + Math.round(g.mastery * 100) + '% · 目标 ' + Math.round(g.required * 100) + '% · 近 5 年 ' + g.kp.examPoints + ' 分</div>' +
          '<div class="progress thin mt8"><i style="width:' + Math.round((g.mastery / g.required) * 100) + '%"></i></div></div>' +
          '<button class="btn xs primary" data-me-train="' + g.kp.id + '">去练</button></div>';
      }).join('') : '<div class="tiny faint mt12">完成入学引导后，这里会自动排出优先级。</div>') + '</div>';

    html += '<div class="card mt12"><div class="row-between"><div class="card-title" style="margin:0">笔记与高亮</div>' +
      '<button class="link-btn" data-me-notes>全部（' + notes.length + '）</button></div>' +
      (notes.length ? notes.slice(0, 3).map(function (n) {
        return '<div class="note-item"><div class="tiny faint">' + (n.kind === 'note' ? '笔记' : '高亮') + ' · ' + (n.lesson ? Z.ui.esc(n.lesson.title) : '') + '</div>' +
          '<div class="small">' + Z.ui.esc(n.text.slice(0, 70)) + (n.text.length > 70 ? '…' : '') + '</div></div>';
      }).join('') : '<div class="tiny faint mt12">在讲义里选中文字，可以高亮或记笔记。</div>') + '</div>';

    html += '<div class="card mt12"><div class="card-title">设置与数据</div>' +
      row('moon', '外观主题', state.settings.theme === 'light' ? '浅色' : '深色', 'data-me-theme') +
      row('file', '备份与恢复', '导出 / 导入 JSON', 'data-me-backup') +
      row('gear', '考试与目标', '日期 · 目标分 · 每日时长', 'data-me-exam') +
      row('chart', '掌握度算法说明', '权重、遗忘、封顶', 'data-me-algo') +
      row('book', '分层与解锁规则', 'L1–L4 / 计算机深度', 'data-me-layers') +
      row('refresh', '重置全部数据', '不可撤销', 'data-me-reset') +
      '</div>';

    html += '<div class="tiny faint" style="text-align:center;margin:18px 0 4px">升本教练 · 学练一体 MVP · 本地优先</div>';

    view.innerHTML = html;
    bindMe(view, chase);
  }

  function row(icon, title, sub, attr) {
    return '<button class="list-row" ' + attr + '><div class="li-icon">' + Z.ui.icon(icon) + '</div>' +
      '<div class="li-main"><div>' + Z.ui.esc(title) + '</div><div class="li-sub">' + Z.ui.esc(sub) + '</div></div>' +
      '<div class="li-right">›</div></button>';
  }

  function bindMe(view, chase) {
    var map = {
      'data-me-theme': function () { toggleTheme(); },
      'data-me-backup': function () { openBackup(); },
      'data-me-exam': function () { openExamSettings(); },
      'data-me-algo': function () { location.hash = '#/algo'; },
      'data-me-layers': function () { location.hash = '#/layers'; },
      'data-me-reset': function () {
        Z.ui.confirm({ title: '重置全部数据', body: '所有学习记录、笔记、模考成绩都会被删除，且无法恢复。建议先导出备份。', okText: '确认重置', danger: true }).then(function (ok) {
          if (!ok) return;
          Z.store.resetAll();
          Z.ui.toast('已重置');
          Z.app.reboot();
        });
      }
    };
    Object.keys(map).forEach(function (attr) {
      var el = view.querySelector('[' + attr + ']');
      if (el) el.addEventListener('click', map[attr]);
    });
    var notes = view.querySelector('[data-me-notes]');
    if (notes) notes.onclick = function () { location.hash = '#/notes'; };
    view.querySelectorAll('[data-me-train]').forEach(function (b) {
      b.onclick = function () {
        var kpId = b.dataset.meTrain;
        var qs = Z.questionsOfKp(kpId);
        if (!qs.length) { Z.ui.toast('该考点暂无练习题'); return; }
        Z.practice.start({ questions: qs, title: '专项：' + Z.KP_BY_ID[kpId].title, mode: 'me-gap' });
      };
    });
    var mp = view.querySelector('[data-me-practice]');
    if (mp) mp.onclick = function () { Z.practice.start({ questions: Z.practice.buildSmart(5), title: '补练 5 题', mode: 'me-quick' }); };
  }

  function toggleTheme() {
    var state = Z.store.get();
    var next = state.settings.theme === 'light' ? 'dark' : 'light';
    Z.store.setSettings({ theme: next });
    Z.app.applyTheme();
    Z.me.render(document.getElementById('view'));
    Z.ui.toast(next === 'dark' ? '已切换深色' : '已切换浅色');
  }

  function openExamSettings() {
    var p = Z.store.get().profile;
    var body = '<div class="field"><label>考试日期</label><input type="date" data-f-date value="' + Z.ui.esc(p.examDate) + '" /></div>' +
      '<div class="field"><label>每日可用时长（分钟）</label><input type="number" min="30" max="600" data-f-min value="' + p.dailyMinutes + '" /></div>' +
      '<div class="field"><label>英语目标分（满分 150）</label><input type="number" min="0" max="150" data-f-en value="' + p.targetScores.english + '" /></div>' +
      '<div class="field"><label>高数目标分（满分 150）</label><input type="number" min="0" max="150" data-f-math value="' + p.targetScores.math + '" /></div>' +
      '<div class="field"><label>计算机目标分（满分 150）</label><input type="number" min="0" max="150" data-f-cs value="' + p.targetScores.cs + '" /></div>' +
      '<div class="tiny faint">修改目标分只影响掌握度要求与达标预测，不会删除已有练习记录。</div>';
    var s = Z.ui.sheet({
      title: '考试与目标', body: body,
      foot: '<button class="btn ghost" data-cancel>取消</button><button class="btn primary" data-save>保存</button>'
    });
    s.el.querySelector('[data-cancel]').onclick = s.close;
    s.el.querySelector('[data-save]').onclick = function () {
      var date = s.el.querySelector('[data-f-date]').value;
      var min = Number(s.el.querySelector('[data-f-min]').value) || 180;
      var en = Number(s.el.querySelector('[data-f-en]').value) || 0;
      var math = Number(s.el.querySelector('[data-f-math]').value) || 0;
      var cs = Number(s.el.querySelector('[data-f-cs]').value) || 0;
      Z.store.setProfile({ examDate: date, dailyMinutes: min, targetScores: { english: en, math: math, cs: cs } });
      s.close();
      Z.me.render(document.getElementById('view'));
      Z.ui.toast('已保存');
    };
  }

  function openBackup() {
    var counts = {
      attempts: Z.store.get().attempts.length,
      mocks: Z.store.get().mocks.length,
      cards: Z.store.get().cards.length
    };
    var body = '<div class="stack"><div class="card pad-sm"><b>当前数据</b><div class="tiny faint mt8">练习记录 ' +
      counts.attempts + ' 条 · 模考 ' + counts.mocks + ' 次 · 记忆卡 ' + counts.cards + ' 张</div></div>' +
      '<div class="btn-row"><button class="btn primary" data-export>导出备份</button>' +
      '<button class="btn ghost" data-import>导入备份</button></div>' +
      '<div class="tiny faint">导出为 JSON 文件。换设备或清缓存前先导出一份。导入时可以选择合并或覆盖。</div>' +
      '<input type="file" accept="application/json,.json" data-file class="hidden" /></div>';
    var s = Z.ui.sheet({ title: '备份与恢复', body: body });
    s.el.querySelector('[data-export]').onclick = function () {
      Z.ui.download('zsb-coach-backup-' + Z.store.dayKey() + '.json', Z.store.exportJSON());
      Z.ui.toast('已导出');
    };
    var file = s.el.querySelector('[data-file]');
    s.el.querySelector('[data-import]').onclick = function () { file.click(); };
    file.onchange = function () {
      var f = file.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        var text = reader.result;
        s.close();
        var choice = Z.ui.sheet({
          title: '导入方式',
          body: '<p class="small muted">合并：保留本机数据，导入的记录去重后加入。<br>覆盖：用备份完全替换本机数据。</p>',
          foot: '<button class="btn ghost" data-merge>合并</button><button class="btn primary" data-overwrite>覆盖</button>'
        });
        choice.el.querySelector('[data-merge]').onclick = function () { doImport(text, 'merge', choice); };
        choice.el.querySelector('[data-overwrite]').onclick = function () { doImport(text, 'overwrite', choice); };
      };
      reader.readAsText(f);
    };
  }

  function doImport(text, mode, sheet) {
    try {
      var counts = Z.store.importJSON(text, mode);
      sheet.close();
      Z.app.applyTheme();
      Z.app.reboot();
      Z.ui.toast('导入完成：' + counts.attempts + ' 条记录');
    } catch (e) {
      Z.ui.toast('导入失败：' + e.message);
    }
  }

  function mountNotes(view) {
    var notes = allNotes();
    var body = notes.length ? notes.map(function (n) {
      return '<div class="card pad-sm mt8"><div class="row-between"><div class="tiny faint">' +
        (n.kind === 'note' ? '笔记' : '高亮') + ' · ' + (n.lesson ? Z.ui.esc(n.lesson.title) : '') + ' · 第 ' + ((n.blockIndex || 0) + 1) + ' 块</div>' +
        '<span class="tiny faint">' + Z.ui.fmtDate(n.ts) + '</span></div>' +
        '<div class="small mt8">' + Z.ui.esc(n.text) + '</div>' +
        (n.lessonId ? '<button class="link-btn" data-note-lesson="' + n.lessonId + '">回到讲义</button>' : '') + '</div>';
    }).join('') : Z.ui.empty('book', '还没有笔记', '在讲义里选中文字，可以高亮或记笔记。', '');
    view.innerHTML = '<div class="reader-head"><div class="reader-top"><button class="icon-btn" data-notes-back>' +
      Z.ui.icon('back') + '</button><div class="reader-title">笔记与高亮（' + notes.length + '）</div>' +
      '<button class="link-btn" data-notes-export>导出 .md</button></div></div>' + '<div class="reader-body">' + body + '</div>';
    view.querySelector('[data-notes-back]').onclick = function () { location.hash = '#/me'; };
    view.querySelectorAll('[data-note-lesson]').forEach(function (b) {
      b.onclick = function () { location.hash = '#/lesson/' + b.dataset.noteLesson; };
    });
    view.querySelector('[data-notes-export]').onclick = function () {
      var md = '# 升本学习笔记\n\n' + notes.map(function (n) {
        return '## ' + (n.lesson ? n.lesson.title : '') + ' · ' + (n.kind === 'note' ? '笔记' : '高亮') + '\n\n' + n.text + '\n';
      }).join('\n');
      Z.ui.download('zsb-notes-' + Z.store.dayKey() + '.md', md);
      Z.ui.toast('已导出笔记');
    };
  }

  function mountAlgo(view) {
    var C = Z.engine.CONFIG;
    var html = '<div class="reader-head"><div class="reader-top"><button class="icon-btn" data-algo-back>' + Z.ui.icon('back') +
      '</button><div class="reader-title">掌握度算法说明</div></div></div>' +
      '<div class="reader-body stack">' +
      '<div class="card"><div class="card-title">掌握度 = 四部分加权</div>' +
      '<div class="small muted">近期正确率 ' + C.W_RECENT + ' + 难度加权正确率 ' + C.W_DIFF + ' + 真题表现 ' + C.W_REAL + ' + 学习深度 ' + C.W_DEPTH + '。</div>' +
      '<div class="formula" style="font-size:16px">M = 0.45·近期 + 0.25·难度 + 0.15·真题 + 0.15·深度</div>' +
      '<div class="tiny faint">近期正确率按最近 20 次作答、0.85 衰减加权；随堂小问权重 ×0.5。超过 30 天未练，按每周 5% 遗忘衰减。</div></div>' +
      '<div class="card"><div class="card-title">封顶与基线</div>' +
      '<div class="small muted">只学不练（没有练习记录，或只有随堂小问）时，掌握度封顶 40%。从未接触的考点使用入学基线（按当前分数折算，最高 35%）。</div></div>' +
      '<div class="card"><div class="card-title">优先级</div>' +
      '<div class="formula" style="font-size:16px">P = 权重 × (要求 − 掌握) × 紧迫度</div>' +
      '<div class="tiny faint">权重来自考点 examWeight 的科目内归一化；要求由目标分反推；紧迫度随「距离上次练习天数」衰减。</div></div>' +
      '<div class="card"><div class="card-title">记忆卡调度</div>' +
      '<div class="small muted">轻量 FSRS：记录 stability / difficulty / due。评分「忘了 / 有点难 / 记得 / 简单」会改变稳定性与下次到期时间；「忘了」约 5 分钟后重现。</div></div>' +
      '<div class="card"><div class="card-title">今日任务预算</div>' +
      '<div class="small muted">按每日可用分钟拆分：复习 25%、补弱 40%、新学 21%、新练 14%；临近考试（30 天内、7 天未模考）插入 40% 模考并等比例压缩其他任务。</div></div>' +
      '<div class="card"><div class="card-title">达标预测</div>' +
      '<div class="small muted">用当前加权掌握度 + 近 14 天日均掌握度增速 × 剩余天数，外推到考试日。样本越少，波动越大。</div></div>' +
      '<div class="tiny faint">以上均为本地规则，可解释、可复算；接入 AI 后，主观题与费曼评分会换成语义 rubric。</div>' +
      '</div>';
    view.innerHTML = html;
    view.querySelector('[data-algo-back]').onclick = function () { location.hash = '#/me'; };
  }

  function mountLayers(view) {
    var html = '<div class="reader-head"><div class="reader-top"><button class="icon-btn" data-layers-back>' + Z.ui.icon('back') +
      '</button><div class="reader-title">分层与解锁规则</div></div></div><div class="reader-body stack">' +
      '<div class="card"><div class="card-title">通用四层</div>' +
      '<div class="small muted">L1 基础：建立直觉 · L2 掌握：覆盖考纲标准要求 · L3 进阶：跨知识点综合 · L4 拔高：冲满分。同一个层级在不同 Lesson 里难度不同；符号相同不代表内容相同。</div></div>' +
      '<div class="card"><div class="card-title">计算机是「深度」不是难度</div>' +
      '<div class="small muted">L1 会用（照抄） · L2 会改（改参数/逻辑） · L3 会写（从零写） · L4 懂原理（解释底层）。</div></div>' +
      '<div class="card"><div class="card-title">解锁条件</div>' +
      '<div class="small muted">默认先完成上一单元的完整六阶段，且随堂小问正确率 ≥ 80%。暂达不到也可以强制解锁，但系统会提示基础风险。</div></div>' +
      Z.SUBJECT_ORDER.map(function (s) {
        var list = Z.lessonsOfSubject(s);
        return '<div class="card"><div class="card-title">' + Z.SUBJECTS[s].name + '</div>' +
          list.map(function (l) {
            var u = Z.engine.lessonUnlock(l);
            return '<div class="row-between mt12"><div><span class="chip lv">' + Z.levelMeta(s, l.level).en + '</span> ' +
              '<span class="small">' + Z.ui.esc(l.title) + '</span></div>' +
              '<span class="tiny ' + (u.unlocked ? 'green' : 'amber') + '">' + (u.unlocked ? '已解锁' : '未解锁') + '</span></div>' +
              (u.unlocked ? '' : '<div class="tiny faint mt8">' + Z.ui.esc(u.reason) + '</div>');
          }).join('') + '</div>';
      }).join('') +
      '<div class="tiny faint">更多单元会按同样规则扩展：先补种子内容，再接通 AI 生成讲义。</div></div>';
    view.innerHTML = html;
    view.querySelector('[data-layers-back]').onclick = function () { location.hash = '#/me'; };
  }

  Z.me = { render: render, mountNotes: mountNotes, mountAlgo: mountAlgo, mountLayers: mountLayers, allNotes: allNotes };
})(window.ZSB = window.ZSB || {});
