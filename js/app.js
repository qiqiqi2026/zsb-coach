/* 应用入口：路由 / 底部导航 / 今日 / 学习地图 / 练习 / 模考 / 引导 */
(function (Z) {
  var TABS = [
    { key: 'today', hash: '#/today', label: '今日', icon: 'today' },
    { key: 'study', hash: '#/study', label: '学', icon: 'study' },
    { key: 'practice', hash: '#/practice', label: '练', icon: 'practice' },
    { key: 'exam', hash: '#/exam', label: '测', icon: 'exam' },
    { key: 'me', hash: '#/me', label: '我', icon: 'me' }
  ];
  var onb = { step: 0, values: null };

  function applyTheme() {
    var s = Z.store.get().settings;
    document.documentElement.dataset.theme = s.theme === 'light' ? 'light' : 'dark';
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', s.theme === 'light' ? '#f4f6fb' : '#0b1020');
  }

  function themeIcon() {
    return Z.store.get().settings.theme === 'light' ? 'moon' : 'sun';
  }

  function renderTopbar(show, title, backHash) {
    var bar = document.getElementById('topbar');
    if (!show) { bar.innerHTML = ''; bar.style.display = 'none'; return; }
    bar.style.display = '';
    if (title) {
      bar.innerHTML = '<div class="topbar-row"><button class="icon-btn" data-back="' + (backHash || '#/today') + '">' +
        Z.ui.icon('back') + '</button><div class="brand-title" style="flex:1">' + Z.ui.esc(title) + '</div>' +
        '<button class="icon-btn" data-theme-btn aria-label="切换主题">' + Z.ui.icon(themeIcon()) + '</button></div>';
    } else {
      bar.innerHTML = '<div class="topbar-row"><div class="brand"><div class="brand-mark">升</div>' +
        '<div><div class="brand-title">升本教练</div><div class="brand-sub">学练一体 · 本地优先</div></div></div>' +
        '<div class="topbar-actions"><button class="icon-btn" data-theme-btn aria-label="切换主题">' + Z.ui.icon(themeIcon()) + '</button></div></div>';
    }
    var t = bar.querySelector('[data-theme-btn]');
    if (t) t.onclick = function () {
      var next = Z.store.get().settings.theme === 'light' ? 'dark' : 'light';
      Z.store.setSettings({ theme: next });
      applyTheme();
      route();
    };
    var b = bar.querySelector('[data-back]');
    if (b) b.onclick = function () { location.hash = b.dataset.back; };
  }

  function renderTabbar(active) {
    var bar = document.getElementById('tabbar');
    bar.style.display = '';
    bar.innerHTML = TABS.map(function (t) {
      return '<button class="tab ' + (active === t.key ? 'on' : '') + '" data-tab="' + t.hash + '" aria-label="' + t.label + '">' +
        '<span class="tab-pill">' + Z.ui.icon(t.icon) + '</span><span>' + t.label + '</span></button>';
    }).join('');
    bar.querySelectorAll('[data-tab]').forEach(function (b) {
      b.onclick = function () { location.hash = b.dataset.tab; };
    });
  }

  function route() {
    var hash = location.hash || '#/today';
    var view = document.getElementById('view');
    view.className = 'view';
    view.onclick = null;
    view.onchange = null;
    view.onmouseup = null;
    view.ontouchend = null;

    var state = Z.store.get();
    if (!state.profile.onboarded && hash.indexOf('#/onboarding') !== 0) {
      location.hash = '#/onboarding';
      return;
    }

    document.body.classList.remove('immersive');
    var parts = hash.replace(/^#\//, '').split('/');
    var root = parts[0] || 'today';

    if (root === 'lesson') {
      document.body.classList.add('immersive');
      renderTopbar(false);
      renderTabbar('study');
      Z.lesson.mount(parts[1]);
      return;
    }
    if (root === 'onboarding') {
      renderTopbar(false);
      document.getElementById('tabbar').style.display = 'none';
      renderOnboarding(view);
      return;
    }
    if (root === 'notes' || root === 'algo' || root === 'layers' || (root === 'exam' && parts[1] === 'report')) {
      renderTopbar(true, parts[1] === 'report' ? '模考报告' : '', root === 'exam' ? '#/exam' : '#/me');
      renderTabbar(root === 'exam' ? 'exam' : (root === 'notes' || root === 'algo' || root === 'layers' ? 'me' : 'today'));
      if (root === 'notes') Z.me.mountNotes(view);
      else if (root === 'algo') Z.me.mountAlgo(view);
      else if (root === 'layers') Z.me.mountLayers(view);
      else Z.exam.mountReport(parts[2]);
      return;
    }

    if (root === 'today') { renderTopbar(true); renderTabbar('today'); renderToday(view); return; }
    if (root === 'study') { renderTopbar(true); renderTabbar('study'); renderStudy(view); return; }
    if (root === 'practice') {
      if (parts[1] === 'wrong' || parts[1] === 'cards') {
        renderTopbar(false); renderTabbar('practice');
      } else {
        renderTopbar(true); renderTabbar('practice');
      }
      renderPractice(view, parts[1]);
      return;
    }
    if (root === 'exam') { renderTopbar(true); renderTabbar('exam'); renderExam(view); return; }
    if (root === 'me') { renderTopbar(true); renderTabbar('me'); Z.me.render(view); return; }

    location.hash = '#/today';
  }

  /* ================= 今日 ================= */
  function renderToday(view) {
    var state = Z.store.get();
    var tasks = Z.engine.tasksForToday();
    var doneCount = tasks.filter(function (t) { return Z.store.isTaskDone(t.id); }).length;
    var days = Z.store.daysToExam();
    var overall = Z.engine.overallProgress();
    var chase = Z.engine.continueLastLesson();
    var onlyRead = Z.engine.onlyReadingDays();
    var now = new Date();
    var week = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()];
    var totalMin = tasks.reduce(function (s, t) { return s + t.minutes; }, 0);

    var html = '<div class="page-head"><h1 class="page-title">' + (now.getMonth() + 1) + '月' + now.getDate() + '日 · 周' + week + '</h1>' +
      '<p class="page-sub">' + (doneCount === tasks.length && tasks.length ? '今天的任务全部完成，收工。' : '按优先级排好，完成 ' + tasks.length + ' 项即可。') + '</p></div>';

    html += '<div class="card hero-card mt12"><div class="hero-glow"></div>' +
      '<div class="row-between" style="align-items:flex-start">' +
      '<div><div class="tiny faint">距 ' + Z.ui.esc(state.profile.examDate) + ' 专升本考试</div>' +
      '<div class="countdown"><b>' + Math.max(0, days) + '</b><span>天</span></div>' +
      '<div class="tiny faint">每天 ' + state.profile.dailyMinutes + ' 分钟 · 目标 ' +
      (state.profile.targetScores.english + state.profile.targetScores.math + state.profile.targetScores.cs) + ' 分</div></div>' +
      Z.ui.ring(overall, { size: 78 }) + '</div>' +
      '<div class="divider"></div>' +
      '<div class="stat-grid"><div class="stat"><b>' + Z.store.streakDays() + '</b><span>连续天数</span></div>' +
      '<div class="stat"><b>' + Z.store.minutesToday() + '</b><span>今日分钟</span></div>' +
      '<div class="stat"><b>' + doneCount + '/' + tasks.length + '</b><span>任务完成</span></div></div>' +
      '</div>';

    if (chase) {
      html += '<div class="card accent-card mt12" data-resume="' + chase.lesson.id + '"><div class="row-between">' +
        '<div style="flex:1;min-width:0"><div class="tiny faint">继续上次</div>' +
        '<div class="card-title" style="margin:4px 0 0">' + Z.ui.esc(chase.lesson.title) + '</div>' +
        '<div class="tiny faint mt8">学到「' + stageName(chase.p.stage) + '」阶段，进度已保存</div></div>' +
        '<button class="btn sm primary">继续</button></div></div>';
    }

    if (onlyRead >= 2) {
      html += '<div class="card mt12" style="border-color:rgba(255,200,87,.35)"><b class="amber">只学不练提醒</b>' +
        '<div class="small muted mt8">最近 ' + onlyRead + ' 天只有阅读、没有练习。今天至少做 5 题，别让「看懂」停在表面。</div></div>';
    }

    html += '<div class="section-title">今日任务清单 <span class="tiny faint">约 ' + Z.ui.fmtMinutes(totalMin) + '</span></div>';
    html += '<div class="stack mt8">' + tasks.map(function (t) {
      var done = Z.store.isTaskDone(t.id);
      return '<div class="task ' + (done ? 'done' : '') + '" data-task="' + Z.ui.esc(t.id) + '">' +
        '<button class="task-check" data-task-check="' + Z.ui.esc(t.id) + '" aria-label="完成任务">✓</button>' +
        '<div class="task-body"><div class="task-title">' + Z.ui.esc(t.title) + '</div>' +
        '<div class="task-reason">' + Z.ui.esc(t.reason) + '</div>' +
        '<div class="task-meta"><span class="chip">' + t.minutes + ' 分钟</span>' +
        (t.subject ? '<span class="chip">' + Z.SUBJECTS[t.subject].name + '</span>' : '') +
        '<span class="chip ' + typeChip(t.type) + '">' + typeName(t.type) + '</span></div></div>' +
        '<div class="task-go">' + (done ? '已完成' : '开始 ›') + '</div></div>';
    }).join('') + '</div>';

    if (!tasks.length) {
      html += '<div class="card mt12">' + Z.ui.empty('today', '今天没有待办任务', '可以先自由练习，或在学习地图里挑一个单元。', '<button class="btn primary" data-go-study>去学习地图</button>') + '</div>';
    }

    html += '<div class="card mt12"><div class="row-between"><div><b>本周节奏</b><div class="tiny faint mt8">学 : 练 ≈ 6 : 4，练完再收工</div></div>' +
      '<button class="link-btn" data-go-me>查看学情 ›</button></div>' +
      '<div class="progress mt12"><i style="width:' + Math.round((doneCount / Math.max(1, tasks.length)) * 100) + '%"></i></div></div>';

    view.innerHTML = html;
    bindToday(view, tasks);
  }

  function stageName(key) {
    var m = { intro: '导入', learn: '学', demo: '例题', guided: '跟练', solo: '独立练', wrap: '小结' };
    return m[key] || '导入';
  }
  function typeName(t) {
    var m = { review: '复习', learn: '新学', 'practice-lesson': '配套练', 'practice-kp': '补弱', mock: '模考' };
    return m[t] || t;
  }
  function typeChip(t) {
    var m = { review: 'accent', learn: '', 'practice-lesson': 'green', 'practice-kp': 'amber', mock: 'red' };
    return m[t] || '';
  }

  function bindToday(view, tasks) {
    var resume = view.querySelector('[data-resume]');
    if (resume) resume.onclick = function () { location.hash = '#/lesson/' + resume.dataset.resume; };
    view.querySelectorAll('[data-task-check]').forEach(function (b) {
      b.onclick = function (e) {
        e.stopPropagation();
        var id = b.dataset.taskCheck;
        Z.store.setTaskDone(id, !Z.store.isTaskDone(id));
        renderToday(view);
      };
    });
    view.querySelectorAll('[data-task]').forEach(function (card) {
      card.onclick = function (e) {
        if (e.target.closest('[data-task-check]')) return;
        var t = tasks.filter(function (x) { return x.id === card.dataset.task; })[0];
        if (t) startTask(t);
      };
    });
    var st = view.querySelector('[data-go-study]');
    if (st) st.onclick = function () { location.hash = '#/study'; };
    var me = view.querySelector('[data-go-me]');
    if (me) me.onclick = function () { location.hash = '#/me'; };
  }

  function startTask(t) {
    if (t.type === 'review') { location.hash = '#/practice/cards'; return; }
    if (t.type === 'learn') { location.hash = '#/lesson/' + t.lessonId; return; }
    if (t.type === 'mock') { Z.exam.start(t.paperId); return; }
    if (t.type === 'practice-lesson') {
      var l = Z.LESSON_BY_ID[t.lessonId];
      var ids = l ? l.independentPractice.concat(l.challenge || []) : [];
      var qs = ids.map(function (id) { return Z.Q_BY_ID[id]; }).filter(Boolean);
      Z.practice.start({ questions: qs, title: '配套练习：' + (l ? l.title : ''), mode: 'task-lesson' });
      return;
    }
    if (t.type === 'practice-kp') {
      var qs2 = Z.questionsOfKp(t.kpId);
      if (!qs2.length) { Z.ui.toast('该考点暂无练习题'); return; }
      Z.practice.start({ questions: qs2, title: '补弱：' + Z.KP_BY_ID[t.kpId].title, mode: 'task-kp' });
    }
  }

  /* ================= 学习地图 ================= */
  function renderStudy(view) {
    var state = Z.store.get();
    var active = state.settings.lastSubject || 'english';
    var stats = Z.engine.subjectStats(active);
    var html = '<div class="page-head"><h1 class="page-title">学习地图</h1><p class="page-sub">按考点权重与掌握度排优先级，逐级解锁。</p></div>';
    html += '<div class="segmented mt12">' + Z.SUBJECT_ORDER.map(function (s) {
      return '<button class="' + (s === active ? 'on' : '') + '" data-subject="' + s + '">' + Z.SUBJECTS[s].name + '</button>';
    }).join('') + '</div>';

    html += '<div class="card mt12"><div class="row-between"><div><div class="tiny faint">' + Z.SUBJECTS[active].name + '掌握度</div>' +
      '<div class="card-title" style="margin:4px 0 0">' + Math.round(stats.mastery * 100) + '% <span class="tiny faint">/ 目标 ' + Math.round(stats.required * 100) + '%</span></div></div>' +
      '<span class="chip">' + Z.kpsOf(active).length + ' 个考点</span></div>' +
      '<div class="progress mt12"><i style="width:' + Math.round(stats.mastery * 100) + '%"></i></div></div>';

    var chapters = Z.chaptersOf(active);
    html += '<div class="mt16">' + chapters.map(function (ch) {
      return '<div class="chapter"><div class="chapter-head"><span class="chapter-name">' + Z.ui.esc(ch.name) + '</span>' +
        '<span class="tiny faint">' + ch.kps.length + ' 个考点</span></div>' +
        ch.kps.map(function (kp) {
          var m = Z.engine.mastery(kp.id);
          var req = Z.engine.requiredMastery(kp.id);
          var lessons = Z.lessonsOfKp(kp.id);
          var color = m >= req * 0.8 ? 'var(--green)' : (m >= req * 0.45 ? 'var(--amber)' : 'var(--red)');
          return '<div class="kp-node" data-kp="' + kp.id + '"><span class="kp-dot" style="background:' + color + '"></span>' +
            '<div class="kp-main"><div class="kp-title">' + Z.ui.esc(kp.title) + '</div>' +
            '<div class="kp-meta">近 5 年 ' + kp.examPoints + ' 分 · 权重 ' + (Z.engine.weightOf(kp.id) * 100).toFixed(0) + '% · ' +
            (lessons.length ? (lessons.length + ' 个单元') : '讲义筹备中') + '</div>' +
            '<div class="progress thin mt8"><i style="width:' + Math.round(m * 100) + '%;background:' + color + '"></i></div></div>' +
            '<div class="kp-val" style="color:' + color + '">' + Math.round(m * 100) + '%</div></div>';
        }).join('') + '</div>';
    }).join('') + '</div>';

    html += '<div class="section-title">能力阶梯 <span class="tiny faint">从下往上，逐级解锁</span></div>';
    var lessons = Z.lessonsOfSubject(active);
    if (!lessons.length) {
      html += '<div class="card mt8">' + Z.ui.empty('book', '这一科还没有单元', '种子内容制作中，先用专项练习补考点。', '') + '</div>';
    } else {
      html += '<div class="ladder mt8">' + lessons.map(function (l, i) {
        var u = Z.engine.lessonUnlock(l);
        var p = state.progress[l.id];
        var status = p && p.status === 'done' ? 'done' : (p && p.status === 'inProgress' ? 'doing' : (u.unlocked ? 'open' : 'locked'));
        var lm = Z.levelMeta(active, l.level);
        var kpTitle = l.kpIds[0] && Z.KP_BY_ID[l.kpIds[0]] ? Z.KP_BY_ID[l.kpIds[0]].title : '';
        return '<div class="lesson-card ' + (u.unlocked ? '' : 'locked') + '" data-level="' + l.level + '">' +
          '<div class="lvl-rail"></div>' +
          '<div class="lesson-top"><div><div class="chips"><span class="chip lv accent">' + lm.en + ' · ' + lm.name + '</span>' +
          '<span class="chip">' + (status === 'done' ? '已完成' : status === 'doing' ? '进行中' : u.unlocked ? '可学习' : '未解锁') + '</span></div>' +
          '<div class="lesson-title mt8">' + Z.ui.esc(l.title) + '</div>' +
          '<div class="lesson-sub">' + Z.ui.esc(kpTitle) + ' · 约 ' + l.estMinutes + ' 分钟</div></div>' +
          '<div class="ladder-note">' + lm.en + '</div></div>' +
          (u.unlocked ? '<button class="btn sm primary mt12" data-open="' + l.id + '">' + (status === 'done' ? '再学一遍' : status === 'doing' ? '继续学习' : '开始学习') + '</button>' :
            '<div class="lock-box">' + Z.ui.esc(u.reason) + '</div>' +
            '<div class="btn-row mt8"><button class="btn sm ghost" data-prev-lesson="' + (u.prevLessonId || '') + '">去补上一课</button>' +
            '<button class="btn sm primary" data-force="' + l.id + '">强制解锁</button></div>') +
          '</div>';
      }).join('') + '</div>';
    }
    html += '<div class="card mt12"><div class="row-between"><span class="small">符号一样的 L1，在不同单元里难度可能不同。</span>' +
      '<button class="link-btn" data-layers>分层说明</button></div></div>';

    view.innerHTML = html;
    view.querySelectorAll('[data-subject]').forEach(function (b) {
      b.onclick = function () {
        Z.store.setSettings({ lastSubject: b.dataset.subject });
        renderStudy(view);
      };
    });
    view.querySelectorAll('[data-open]').forEach(function (b) {
      b.onclick = function () { location.hash = '#/lesson/' + b.dataset.open; };
    });
    view.querySelectorAll('[data-prev-lesson]').forEach(function (b) {
      b.onclick = function () { if (b.dataset.prevLesson) location.hash = '#/lesson/' + b.dataset.prevLesson; };
    });
    view.querySelectorAll('[data-force]').forEach(function (b) {
      b.onclick = function () {
        var id = b.dataset.force;
        Z.ui.confirm({ title: '强制解锁', body: '跳过前置条件会缺少必要基础，容易越学越吃力。仍要解锁吗？', okText: '仍要解锁' }).then(function (ok) {
          if (!ok) return;
          Z.store.forceUnlock(id);
          renderStudy(view);
          Z.ui.toast('已解锁');
        });
      };
    });
    var layers = view.querySelector('[data-layers]');
    if (layers) layers.onclick = function () { location.hash = '#/layers'; };
    view.querySelectorAll('[data-kp]').forEach(function (node) {
      node.onclick = function () {
        var kpId = node.dataset.kp;
        var qs = Z.questionsOfKp(kpId);
        if (!qs.length) { Z.ui.toast('该考点暂无练习题'); return; }
        Z.practice.start({ questions: qs, title: '专项：' + Z.KP_BY_ID[kpId].title, mode: 'study-kp' });
      };
    });
  }

  /* ================= 练习 ================= */
  function renderPractice(view, sub) {
    var state = Z.store.get();
    var wrong = Z.practice.wrongGroups();
    var due = Z.fsrs.dueCards(state).length;
    if (sub === 'wrong') {
      view.innerHTML = '<div class="reader-head"><div class="reader-top"><button class="icon-btn" data-pback="#/practice">' +
        Z.ui.icon('back') + '</button><div class="reader-title">错题本</div></div></div><div class="reader-body" id="wrong-body"></div>';
      view.querySelector('[data-pback]').onclick = function () { location.hash = '#/practice'; };
      Z.practice.renderWrongbook(document.getElementById('wrong-body'));
      return;
    }
    if (sub === 'cards') {
      view.innerHTML = '<div class="reader-head"><div class="reader-top"><button class="icon-btn" data-pback="#/practice">' +
        Z.ui.icon('back') + '</button><div class="reader-title">记忆卡</div></div></div><div class="reader-body" id="cards-body"></div>';
      view.querySelector('[data-pback]').onclick = function () { location.hash = '#/practice'; };
      Z.practice.renderCards(document.getElementById('cards-body'));
      return;
    }

    var html = '<div class="page-head"><h1 class="page-title">练习</h1><p class="page-sub">先补缺口，再刷量；错题必须归因。</p></div>';
    html += '<div class="practice-grid mt12">' +
      entry('spark', '智能练习', '按缺口组 10 题', 'data-smart') +
      entry('refresh', '自由刷题', '随机 10 题热身', 'data-free') +
      entry('wrong', '错题本', wrong.length + ' 道待消化', 'data-wrong') +
      entry('cards', '记忆卡', due ? due + ' 张到期' : '今日已清', 'data-cards') +
      '</div>';

    html += '<div class="card mt12"><div class="row-between"><div class="card-title" style="margin:0">专项练习</div>' +
      '<span class="tiny faint">按考点</span></div>';
    Z.SUBJECT_ORDER.forEach(function (s) {
      html += '<div class="tiny faint mt12">' + Z.SUBJECTS[s].name + '</div>';
      html += Z.kpsOf(s).map(function (kp) {
        var qs = Z.questionsOfKp(kp.id).length;
        var m = Math.round(Z.engine.mastery(kp.id) * 100);
        return '<button class="list-row" data-kp-train="' + kp.id + '">' +
          '<div class="li-main"><div>' + Z.ui.esc(kp.title) + '</div><div class="li-sub">' + qs + ' 题 · 掌握 ' + m + '%</div></div>' +
          '<div class="li-right">练 ›</div></button>';
      }).join('');
    });
    html += '</div>';

    html += '<div class="card mt12"><div class="card-title">最近练习</div>' +
      (state.attempts.length ? (function () {
        var recent = state.attempts.slice(-5).reverse();
        return recent.map(function (a) {
          var q = Z.Q_BY_ID[a.questionId];
          if (!q) return '';
          return '<div class="row-between" style="padding:8px 0;border-bottom:1px solid var(--line-soft)">' +
            '<span class="small truncate" style="max-width:75%">' + Z.ui.esc(q.stem.replace(/\n/g, ' ').slice(0, 40)) + '…</span>' +
            '<span class="tiny ' + (a.correct ? 'green' : 'red') + '">' + (a.correct ? '正确' : '错误') + '</span></div>';
        }).join('');
      })() : '<div class="tiny faint mt8">还没有练习记录。</div>') + '</div>';

    view.innerHTML = html;
    var smart = view.querySelector('[data-smart]');
    if (smart) smart.onclick = function () { Z.practice.start({ questions: Z.practice.buildSmart(10), title: '智能练习', mode: 'smart' }); };
    var free = view.querySelector('[data-free]');
    if (free) free.onclick = function () { Z.practice.start({ questions: Z.practice.buildFree(10), title: '自由刷题', mode: 'free' }); };
    var w = view.querySelector('[data-wrong]');
    if (w) w.onclick = function () { location.hash = '#/practice/wrong'; };
    var c = view.querySelector('[data-cards]');
    if (c) c.onclick = function () { location.hash = '#/practice/cards'; };
    view.querySelectorAll('[data-kp-train]').forEach(function (b) {
      b.onclick = function () {
        var qs = Z.questionsOfKp(b.dataset.kpTrain);
        Z.practice.start({ questions: qs, title: '专项：' + Z.KP_BY_ID[b.dataset.kpTrain].title, mode: 'kp' });
      };
    });
  }

  function entry(icon, title, sub, attr) {
    return '<button class="entry" ' + attr + '><div class="entry-icon">' + Z.ui.icon(icon) + '</div>' +
      '<div><b>' + title + '</b><div><span>' + sub + '</span></div></div></button>';
  }

  /* ================= 模考 ================= */
  function renderExam(view) {
    var state = Z.store.get();
    var paper = Z.MOCK_PAPERS[0];
    var mocks = state.mocks.slice().sort(function (a, b) { return b.endTs - a.endTs; });
    var last = mocks[0];
    var days = Z.store.daysToExam();

    var html = '<div class="page-head"><h1 class="page-title">模考</h1><p class="page-sub">先测出失分结构，再决定补什么。</p></div>';
    html += '<div class="card exam-hero mt12"><div class="tiny faint">距考试 ' + days + ' 天</div>' +
      '<div class="big">' + (last ? last.score : '—') + '<span class="tiny faint" style="font-size:14px"> / ' + paper.totalPoints + '</span></div>' +
      '<div class="tiny faint">' + (last ? '上次得分' : '还没有模考记录') + '</div>' +
      '<div class="btn-row mt16"><button class="btn primary block" data-start-exam>开始 ' + paper.durationMin + ' 分钟模考</button></div></div>';

    html += '<div class="card mt12"><div class="row-between"><div class="card-title" style="margin:0">' + Z.ui.esc(paper.title) + '</div>' +
      '<span class="chip">' + paper.totalPoints + ' 分</span></div>' +
      '<p class="small muted mt8">' + Z.ui.esc(paper.desc) + '</p>' +
      '<div class="chips mt8"><span class="chip">英语 4</span><span class="chip">高数 3</span><span class="chip">计算机 3</span>' +
      '<span class="chip">交卷后自动分析</span></div></div>';

    html += '<div class="card mt12"><div class="card-title">历史记录</div>' +
      (mocks.length ? mocks.map(function (m) {
        return '<button class="list-row" data-report="' + m.id + '"><div class="li-icon">' + Z.ui.icon('exam') + '</div>' +
          '<div class="li-main"><div>' + Z.ui.fmtDate(m.endMs || m.endTs) + ' · ' + m.score + ' 分</div>' +
          '<div class="li-sub">' + m.paperTitle + ' · 用时 ' + Z.ui.fmtMinutes(m.usedMs / 60000) + '</div></div>' +
          '<div class="li-right">看报告 ›</div></button>';
      }).join('') : '<div class="tiny faint mt8">完成一次模考后，这里会记录分数与失分结构。</div>') + '</div>';

    html += '<div class="card mt12"><div class="card-title">报告会告诉你</div>' +
      '<div class="small muted">丢分最多的考点、哪一难度层在漏分、错因分布，以及接下来 3 天先补哪两个考点。</div></div>';

    view.innerHTML = html;
    view.querySelector('[data-start-exam]').onclick = function () {
      Z.ui.confirm({
        title: '开始模考',
        body: paper.title + '，' + paper.durationMin + ' 分钟，' + paper.totalPoints + ' 分。中途退出不保存作答，确定开始？',
        okText: '开始'
      }).then(function (ok) { if (ok) Z.exam.start(paper.id); });
    };
    view.querySelectorAll('[data-report]').forEach(function (b) {
      b.onclick = function () { location.hash = '#/exam/report/' + b.dataset.report; };
    });
  }

  /* ================= 引导 ================= */
  function defaultOnb() {
    var p = Z.store.get().profile;
    return {
      examDate: p.examDate, dailyMinutes: p.dailyMinutes,
      targets: Object.assign({}, p.targetScores),
      currents: Object.assign({}, p.currentScores)
    };
  }

  function renderOnboarding(view) {
    if (!onb.values) onb.values = defaultOnb();
    var v = onb.values;
    var step = onb.step;
    var html = '<div class="onboard">' +
      '<div class="brand" style="justify-content:center;margin-bottom:18px"><div class="brand-mark">升</div>' +
      '<div><div class="brand-title">升本教练</div><div class="brand-sub">学练一体 · 先学会，再练会</div></div></div>' +
      '<div class="step-dots">' + [0, 1, 2].map(function (i) { return '<i class="' + (i === step ? 'on' : '') + '"></i>'; }).join('') + '</div>' +
      '<div class="card">';
    if (step === 0) {
      html += '<div class="card-title">先定坐标</div><p class="small muted">考试日期决定倒计时与模考节奏；每日时长决定任务预算。</p>' +
        '<div class="field mt12"><label>考试日期</label><input type="date" data-o-date value="' + Z.ui.esc(v.examDate) + '" /></div>' +
        '<div class="field"><label>每天可用学习时长（分钟）</label><input type="number" min="30" max="600" data-o-min value="' + v.dailyMinutes + '" />' +
        '<div class="hint">建议 120–240 分钟；系统会按 6:4 拆分学与练。</div></div>';
    } else if (step === 1) {
      html += '<div class="card-title">目标分数</div><p class="small muted">目标决定每个考点「要掌握到什么程度」。</p>' +
        scoreField('英语', 'english', v.targets.english, 'o-en') +
        scoreField('高数', 'math', v.targets.math, 'o-math') +
        scoreField('计算机', 'cs', v.targets.cs, 'o-cs');
    } else {
      html += '<div class="card-title">现在的水平</div><p class="small muted">不用精确，按最近一次模考或自我感觉估个分。系统会据此生成初始掌握度基线。</p>' +
        scoreField('英语', 'english', v.currents.english, 'o-cur-en') +
        scoreField('高数', 'math', v.currents.math, 'o-cur-math') +
        scoreField('计算机', 'cs', v.currents.cs, 'o-cur-cs') +
        '<div class="tiny faint mt8">基线最高只到 35%，避免「自以为会」；真正掌握度由练习数据决定。</div>';
    }
    html += '</div><div class="btn-row mt16">' +
      (step > 0 ? '<button class="btn ghost" data-o-prev>上一步</button>' : '<button class="btn ghost" data-o-skip>用默认值</button>') +
      '<button class="btn primary" data-o-next>' + (step === 2 ? '开始学习' : '下一步') + '</button></div>' +
      '<div class="tiny faint" style="text-align:center;margin-top:10px">之后可在「我 → 考试与目标」里修改</div>' +
      '</div>';
    view.innerHTML = html;

    view.querySelector('[data-o-prev]') && (view.querySelector('[data-o-prev]').onclick = function () {
      captureOnb(view); onb.step--; renderOnboarding(view);
    });
    var skip = view.querySelector('[data-o-skip]');
    if (skip) skip.onclick = function () {
      onb.values = defaultOnb();
      finishOnboarding();
    };
    view.querySelector('[data-o-next]').onclick = function () {
      captureOnb(view);
      if (onb.step < 2) { onb.step++; renderOnboarding(view); return; }
      finishOnboarding();
    };
  }

  function scoreField(name, key, val, attr) {
    return '<div class="field"><label>' + name + '（满分 150）</label>' +
      '<input type="number" min="0" max="150" ' + attr + ' data-key="' + key + '" value="' + val + '" /></div>';
  }

  function captureOnb(view) {
    var v = onb.values;
    var d = view.querySelector('[data-o-date]');
    var m = view.querySelector('[data-o-min]');
    if (d) v.examDate = d.value || v.examDate;
    if (m) v.dailyMinutes = Math.max(30, Math.min(600, Number(m.value) || 180));
    ['english', 'math', 'cs'].forEach(function (k) {
      var t = view.querySelector('[data-key="' + k + '"]');
      if (t) v.targets[k] = Math.max(0, Math.min(150, Number(t.value) || 0));
      var c = view.querySelector('[data-key="' + k + '"]');
      var cur = view.querySelector('[data-o-cur-' + k + ']');
      if (cur) v.currents[k] = Math.max(0, Math.min(150, Number(cur.value) || 0));
      var cur2 = view.querySelector('[data-o-cur-' + (k === 'english' ? 'en' : k) + ']');
      if (cur2) v.currents[k] = Math.max(0, Math.min(150, Number(cur2.value) || 0));
    });
    // 目标与当前分字段的 data-key 冲突，按步骤单独采集
    if (view.querySelector('[data-o-en],[data-o-math],[data-o-cs]')) {
      var en = view.querySelector('[data-o-en]'), math = view.querySelector('[data-o-math]'), cs = view.querySelector('[data-o-cs]');
      if (en) v.targets.english = Number(en.value) || 0;
      if (math) v.targets.math = Number(math.value) || 0;
      if (cs) v.targets.cs = Number(cs.value) || 0;
    }
    var cen = view.querySelector('[data-o-cur-en]'), cmath = view.querySelector('[data-o-cur-math]'), ccs = view.querySelector('[data-o-cur-cs]');
    if (cen) v.currents.english = Number(cen.value) || 0;
    if (cmath) v.currents.math = Number(cmath.value) || 0;
    if (ccs) v.currents.cs = Number(ccs.value) || 0;
  }

  function finishOnboarding() {
    var v = onb.values;
    Z.store.setProfile({
      onboarded: true,
      examDate: v.examDate,
      dailyMinutes: v.dailyMinutes,
      targetScores: v.targets,
      currentScores: v.currents
    });
    Z.store.initBaseline();
    onb.step = 0;
    onb.values = null;
    location.hash = '#/today';
    Z.ui.toast('已生成今日任务');
    route();
  }

  /* ================= 启动 ================= */
  function boot() {
    applyTheme();
    var scale = Z.store.get().settings.fontScale || 1;
    document.documentElement.style.fontSize = (15 * scale) + 'px';
    if (location.hash === '#/onboarding' && Z.store.get().profile.onboarded) location.hash = '#/today';
    route();
    window.addEventListener('hashchange', route);
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    }
  }

  function reboot() {
    applyTheme();
    onb.step = 0;
    onb.values = null;
    if (!Z.store.get().profile.onboarded) {
      location.hash = '#/onboarding';
      route();
    } else {
      route();
    }
  }

  Z.app = { boot: boot, route: route, reboot: reboot, applyTheme: applyTheme };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window.ZSB = window.ZSB || {});
