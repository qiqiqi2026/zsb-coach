/* 学习引擎：掌握度 / 解锁 / 今日任务 / 失分分析 / 达标预测（纯函数为主） */
(function (Z) {
  var CONFIG = {
    RECENT_WINDOW: 20,
    RECENT_DECAY: 0.85,
    QUIZ_WEIGHT: 0.5,
    W_RECENT: 0.45,
    W_DIFF: 0.25,
    W_REAL: 0.15,
    W_DEPTH: 0.15,
    DEPTH_LEVEL: 0.4,
    DEPTH_QUIZ: 0.3,
    DEPTH_FEYNMAN: 0.3,
    FEYNMAN_DEFAULT: 0.3,
    LEARNED_NO_PRACTICE_CAP: 0.4,
    DECAY_AFTER_DAYS: 30,
    DECAY_WEEKLY: 0.95,
    TARGET_WEIGHT_BONUS: 0.5,
    BUDGET: { review: 0.25, weak: 0.4, newLearn: 0.21, newPractice: 0.14, mock: 0.4 },
    MOCK_DAYS: 30,
    MOCK_GAP_DAYS: 7
  };

  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
  function round(n, d) { var f = Math.pow(10, d || 2); return Math.round(n * f) / f; }

  function weightOf(kpId) {
    var kp = Z.KP_BY_ID[kpId];
    if (!kp) return 0;
    var total = Z.kpsOf(kp.subject).reduce(function (s, k) { return s + k.examWeight; }, 0) || 1;
    return kp.examWeight / total;
  }

  function attemptsForKp(kpId, cutoff) {
    var out = [];
    var state = Z.store.get();
    for (var i = 0; i < state.attempts.length; i++) {
      var a = state.attempts[i];
      if (cutoff && a.ts > cutoff) continue;
      var q = Z.Q_BY_ID[a.questionId];
      if (!q) continue;
      if (q.kpIds.indexOf(kpId) >= 0) out.push(a);
    }
    out.sort(function (a, b) { return a.ts - b.ts; });
    return out;
  }

  function lessonStateOfKp(kpId) {
    var state = Z.store.get();
    var lessons = Z.lessonsOfKp(kpId);
    var maxLevel = 0;
    var quizRate = 0;
    var feynman = null;
    lessons.forEach(function (l) {
      var p = state.progress[l.id];
      if (!p) return;
      maxLevel = Math.max(maxLevel, l.level);
      if (typeof p.quizRate === 'number') quizRate = Math.max(quizRate, p.quizRate);
      else if (p.quizTotal) quizRate = Math.max(quizRate, p.quizCorrect / p.quizTotal);
      if (typeof p.feynmanScore === 'number') feynman = Math.max(feynman || 0, p.feynmanScore);
    });
    return { hasLesson: lessons.length > 0, hasProgress: lessons.some(function (l) { return !!state.progress[l.id]; }), maxLevel: maxLevel, quizRate: quizRate, feynman: feynman };
  }

  function masteryAt(kpId, cutoff) {
    var kp = Z.KP_BY_ID[kpId];
    if (!kp) return 0;
    var state = Z.store.get();
    var atts = attemptsForKp(kpId, cutoff);
    var ls = lessonStateOfKp(kpId);
    var baseline = state.baseline[kpId] || 0;

    if (!atts.length) {
      return ls.hasProgress ? 0 : baseline;
    }

    var recent = atts.slice(-CONFIG.RECENT_WINDOW);
    var sw = 0, sc = 0;
    recent.forEach(function (a, idx) {
      var w = Math.pow(CONFIG.RECENT_DECAY, recent.length - 1 - idx);
      if (a.source === 'lesson-quiz') w *= CONFIG.QUIZ_WEIGHT;
      sw += w;
      if (a.correct) sc += w;
    });
    var recentAcc = sw ? sc / sw : 0;

    var ds = 0, dc = 0;
    atts.slice(-50).forEach(function (a) {
      var q = Z.Q_BY_ID[a.questionId];
      if (!q) return;
      var s = (q.difficulty || 3) / 5;
      ds += s;
      if (a.correct) dc += s;
    });
    var diffAcc = ds ? dc / ds : 0;

    var real = atts.filter(function (a) {
      var q = Z.Q_BY_ID[a.questionId];
      return q && /^真题/.test(q.source || '');
    });
    var realAcc = real.length ? (real[real.length - 1].correct ? 1 : 0) : 0;

    var depth = 0;
    if (ls.hasLesson) {
      depth = CONFIG.DEPTH_LEVEL * (ls.maxLevel / 4)
        + CONFIG.DEPTH_QUIZ * (ls.quizRate || 0)
        + CONFIG.DEPTH_FEYNMAN * (ls.feynman != null ? ls.feynman : CONFIG.FEYNMAN_DEFAULT);
    }

    var m = CONFIG.W_RECENT * recentAcc + CONFIG.W_DIFF * diffAcc + CONFIG.W_REAL * realAcc + CONFIG.W_DEPTH * depth;

    var lastTs = atts[atts.length - 1].ts;
    var days = (Date.now() - lastTs) / 86400000;
    if (days > CONFIG.DECAY_AFTER_DAYS) {
      m *= Math.pow(CONFIG.DECAY_WEEKLY, (days - CONFIG.DECAY_AFTER_DAYS) / 7);
    }

    if (ls.hasProgress && !atts.length) m = Math.min(m, CONFIG.LEARNED_NO_PRACTICE_CAP);
    if (ls.hasLesson && atts.every(function (a) { return a.source === 'lesson-quiz'; })) {
      m = Math.min(m, CONFIG.LEARNED_NO_PRACTICE_CAP);
    }

    return clamp(round(m, 3), 0, 1);
  }

  function mastery(kpId) { return masteryAt(kpId, null); }

  function requiredMastery(kpId) {
    var kp = Z.KP_BY_ID[kpId];
    if (!kp) return 0;
    var state = Z.store.get();
    var full = Z.SUBJECTS[kp.subject].fullMark;
    var target = state.profile.targetScores[kp.subject] || full * 0.8;
    var base = clamp(target / full, 0, 1);
    return clamp(base + weightOf(kpId) * CONFIG.TARGET_WEIGHT_BONUS, base * 0.8, 1);
  }

  function gapOf(kpId) { return Math.max(0, requiredMastery(kpId) - mastery(kpId)); }

  function urgencyOf(kpId) {
    var atts = attemptsForKp(kpId);
    var lesson = Z.lessonsOfKp(kpId).map(function (l) { return Z.store.get().progress[l.id]; }).filter(Boolean)[0];
    var last = atts.length ? atts[atts.length - 1].ts : (lesson && lesson.lastReadAt) || 0;
    if (!last) return 1;
    var days = (Date.now() - last) / 86400000;
    return 1 / (1 + days / 7);
  }

  function priorityOf(kpId) {
    return weightOf(kpId) * gapOf(kpId) * urgencyOf(kpId);
  }

  function subjectStats(subject) {
    var kps = Z.kpsOf(subject);
    var tw = 0, mw = 0, rw = 0;
    kps.forEach(function (kp) {
      var w = weightOf(kp.id);
      tw += w;
      mw += mastery(kp.id) * w;
      rw += requiredMastery(kp.id) * w;
    });
    return {
      subject: subject,
      mastery: tw ? mw / tw : 0,
      required: tw ? rw / tw : 0,
      progress: tw && rw ? clamp(mw / rw, 0, 1) : 0
    };
  }

  function overallProgress() {
    var ms = 0, rs = 0;
    Z.KPS.forEach(function (kp) {
      var w = weightOf(kp.id);
      ms += mastery(kp.id) * w;
      rs += requiredMastery(kp.id) * w;
    });
    return rs ? clamp(ms / rs, 0, 1) : 0;
  }

  function lessonUnlock(lesson) {
    var state = Z.store.get();
    if (state.forceUnlocked[lesson.id]) {
      return { unlocked: true, forced: true, reason: '已强制解锁' };
    }
    var rule = lesson.unlockRule || {};
    if (!rule.fromLessonId) return { unlocked: true, reason: '' };
    var prev = Z.LESSON_BY_ID[rule.fromLessonId];
    var p = state.progress[rule.fromLessonId];
    var minRate = rule.minQuizRate || 0.8;
    var rate = p && p.quizTotal ? p.quizCorrect / p.quizTotal : 0;
    if (!prev) return { unlocked: true, reason: '' };
    if (!p || p.status !== 'done') {
      return {
        unlocked: false,
        reason: '先完成《' + prev.title + '》',
        prevLessonId: prev.id,
        prevTitle: prev.title,
        need: '完成上一单元',
        rate: rate,
        minRate: minRate
      };
    }
    if (rate < minRate) {
      return {
        unlocked: false,
        reason: '《' + prev.title + '》随堂正确率 ' + Math.round(rate * 100) + '%，还差 ' + Math.round((minRate - rate) * 100) + '%',
        prevLessonId: prev.id,
        prevTitle: prev.title,
        need: '正确率 ≥ ' + Math.round(minRate * 100) + '%',
        rate: rate,
        minRate: minRate
      };
    }
    return { unlocked: true, reason: '' };
  }

  function nextLesson() {
    var state = Z.store.get();
    var inProgress = null;
    var unlocked = [];
    Z.LESSONS.forEach(function (l) {
      var p = state.progress[l.id];
      if (p && p.status === 'inProgress') inProgress = l;
      var u = lessonUnlock(l);
      if (u.unlocked && (!p || p.status !== 'done')) unlocked.push(l);
    });
    if (inProgress && inProgress.status !== 'done') return inProgress;
    unlocked.sort(function (a, b) {
      var pa = state.progress[a.id], pb = state.progress[b.id];
      var da = pa && pa.status === 'done' ? 1 : 0;
      var db = pb && pb.status === 'done' ? 1 : 0;
      if (da !== db) return da - db;
      return a.level - b.level;
    });
    return unlocked[0] || null;
  }

  function topGaps(n) {
    var state = Z.store.get();
    return Z.KPS.map(function (kp) {
      return {
        kp: kp,
        mastery: mastery(kp.id),
        required: requiredMastery(kp.id),
        gap: gapOf(kp.id),
        priority: priorityOf(kp.id),
        weight: weightOf(kp.id),
        attempts: attemptsForKp(kp.id).length,
        hasQuestions: Z.questionsOfKp(kp.id).length > 0
      };
    }).filter(function (x) { return x.hasQuestions; })
      .sort(function (a, b) { return b.priority - a.priority; })
      .slice(0, n || 3);
  }

  function lastMockTs() {
    var mocks = Z.store.get().mocks;
    if (!mocks.length) return 0;
    return mocks.reduce(function (mx, m) { return Math.max(mx, m.startTs || 0); }, 0);
  }

  function tasksForToday() {
    var state = Z.store.get();
    var day = Z.store.dayKey();
    var M = state.profile.dailyMinutes || 180;
    var due = Z.fsrs.dueCards(state).length;
    var tasks = [];
    var budgets = {
      review: due > 0 ? Math.min(due * 0.4, M * CONFIG.BUDGET.review) : 0,
      weak: M * CONFIG.BUDGET.weak,
      learn: M * CONFIG.BUDGET.newLearn,
      practice: M * CONFIG.BUDGET.newPractice,
      mock: 0
    };
    var daysLeft = Z.store.daysToExam();
    var sinceMock = lastMockTs() ? (Date.now() - lastMockTs()) / 86400000 : 999;
    var needMock = daysLeft > 0 && daysLeft < CONFIG.MOCK_DAYS && sinceMock > CONFIG.MOCK_GAP_DAYS;

    if (needMock) {
      budgets.mock = M * CONFIG.BUDGET.mock;
      var rest = M - budgets.mock;
      var cur = budgets.review + budgets.weak + budgets.learn + budgets.practice;
      if (cur > rest && cur > 0) {
        var f = rest / cur;
        budgets.review *= f; budgets.weak *= f; budgets.learn *= f; budgets.practice *= f;
      }
    }

    if (due > 0) {
      tasks.push({
        id: 'review-' + day,
        type: 'review',
        title: '复习到期记忆卡',
        minutes: Math.max(3, Math.round(budgets.review)),
        reason: '今天有 ' + due + ' 张卡片到期。间隔重复的优先级高于学新内容，先清复习。',
        cards: due
      });
    }

    var next = nextLesson();
    if (next) {
      var p = state.progress[next.id];
      var started = p && p.status === 'inProgress';
      tasks.push({
        id: 'learn-' + next.id + '-' + day,
        type: 'learn',
        lessonId: next.id,
        subject: next.subject,
        title: (started ? '继续学：' : '学：') + next.title,
        minutes: Math.max(5, Math.round(budgets.learn)),
        reason: '它指向的考点权重占比 ' + Math.round(weightOf(next.kpIds[0]) * 100) + '%，当前掌握度 ' + Math.round(mastery(next.kpIds[0]) * 100) + '%，还没走完这个单元。'
      });
      var qCount = next.independentPractice.length + next.challenge.length;
      tasks.push({
        id: 'practice-' + next.id + '-' + day,
        type: 'practice-lesson',
        lessonId: next.id,
        subject: next.subject,
        title: '练：' + (next.kpIds[0] ? Z.KP_BY_ID[next.kpIds[0]].title : next.title) + ' ' + qCount + ' 题',
        minutes: Math.max(3, Math.round(budgets.practice)),
        reason: '学完立刻练，趁热把刚看懂的东西变成会做。'
      });
    }

    var weak = topGaps(6).filter(function (x) { return x.gap > 0.03; })[0];
    if (weak) {
      var qs = Z.questionsOfKp(weak.kp.id).filter(function (q) { return q.type !== 'code'; }).slice(0, 5);
      tasks.push({
        id: 'weak-' + weak.kp.id + '-' + day,
        type: 'practice-kp',
        kpId: weak.kp.id,
        subject: weak.kp.subject,
        title: '补弱：' + weak.kp.title + ' ' + qs.length + ' 题',
        minutes: Math.max(5, Math.round(budgets.weak)),
        reason: '该考点近 5 年累计 ' + weak.kp.examPoints + ' 分，掌握度 ' + Math.round(weak.mastery * 100) + '%，目标 ' + Math.round(weak.required * 100) + '%，是当前缺口最大且最值得补的一个。'
      });
    }

    if (needMock) {
      tasks.push({
        id: 'mock-' + day,
        type: 'mock',
        paperId: 'mock-paper-1',
        title: '模考：迷你综合卷',
        minutes: Math.max(10, Math.round(budgets.mock)),
        reason: '距考试 ' + daysLeft + ' 天，超过 ' + CONFIG.MOCK_GAP_DAYS + ' 天没模考了。先测出失分结构，再决定接下来补什么。'
      });
    }

    // 总量兜底：严格不超过每日可用时间（保留 2 分钟缓冲）
    var total = tasks.reduce(function (s, t) { return s + t.minutes; }, 0);
    if (total > M) {
      var factor = M / total;
      tasks.forEach(function (t) { t.minutes = Math.max(3, Math.round(t.minutes * factor)); });
    }

    return tasks;
  }

  function paperQuestions(paperId) {
    var paper = Z.MOCK_PAPERS.filter(function (p) { return p.id === paperId; })[0];
    if (!paper) return [];
    return paper.questionIds.map(function (id) { return Z.MOCK_Q_BY_ID[id]; }).filter(Boolean);
  }

  function examAnalysis(mock) {
    var qs = paperQuestions(mock.paperId);
    var byId = {};
    qs.forEach(function (q) { byId[q.id] = q; });
    var lostByKp = {};
    var errorTypes = { concept: 0, formula: 0, calc: 0, misread: 0, timeout: 0, unknown: 0 };
    var byDifficulty = {};
    var lost = 0;

    (mock.results || []).forEach(function (r) {
      var q = byId[r.questionId];
      if (!q) return;
      var d = q.difficulty || 3;
      if (!byDifficulty[d]) byDifficulty[d] = { got: 0, total: 0 };
      byDifficulty[d].total += q.points || 0;
      if (r.correct) {
        byDifficulty[d].got += q.points || 0;
      } else {
        lost += q.points || 0;
        q.kpIds.forEach(function (kpId) {
          lostByKp[kpId] = (lostByKp[kpId] || 0) + (q.points || 0) / q.kpIds.length;
        });
        errorTypes[r.errorType || 'unknown'] += q.points || 0;
      }
    });

    var lostList = Object.keys(lostByKp).map(function (kpId) {
      return { kpId: kpId, kp: Z.KP_BY_ID[kpId], lost: round(lostByKp[kpId], 1) };
    }).sort(function (a, b) { return b.lost - a.lost; });

    var topKps = lostList.slice(0, 2);
    var conclusion = topKps.length
      ? '这次主要丢在「' + topKps.map(function (x) { return x.kp ? x.kp.title : x.kpId; }).join('」「') + '」。建议接下来 3 天先补这 ' + topKps.length + ' 个考点，每个考点先读对应讲义，再做 5 题检验。'
      : '这张卷没有明显失分点，保持节奏，把最近做对的题再做一遍巩固即可。';

    return {
      lost: round(lost, 1),
      lostByKp: lostList,
      errorTypes: errorTypes,
      byDifficulty: byDifficulty,
      conclusion: conclusion,
      topKps: topKps
    };
  }

  function prediction() {
    var state = Z.store.get();
    var daysLeft = Z.store.daysToExam();
    var out = { subjects: {}, total: {} };
    var predictedTotal = 0, targetTotal = 0, fullTotal = 0;
    Z.SUBJECT_ORDER.forEach(function (subject) {
      var kps = Z.kpsOf(subject);
      var now = 0, past = 0, tw = 0;
      var cutoff = Date.now() - 14 * 86400000;
      kps.forEach(function (kp) {
        var w = weightOf(kp.id);
        tw += w;
        now += mastery(kp.id) * w;
        past += masteryAt(kp.id, cutoff) * w;
      });
      var current = tw ? now / tw : 0;
      var prev = tw ? past / tw : 0;
      var growthPerDay = (current - prev) / 14;
      var future = clamp(current + growthPerDay * Math.max(0, daysLeft), 0, 1);
      var full = Z.SUBJECTS[subject].fullMark;
      var target = state.profile.targetScores[subject] || full * 0.8;
      out.subjects[subject] = {
        current: current,
        predicted: future * full,
        currentScore: current * full,
        target: target,
        gap: Math.max(0, target - future * full),
        growthPerDay: growthPerDay
      };
      predictedTotal += future * full;
      targetTotal += target;
      fullTotal += full;
    });
    out.total = { predicted: predictedTotal, target: targetTotal, full: fullTotal };
    return out;
  }

  function chapterStats(subject) {
    return Z.chaptersOf(subject).map(function (ch) {
      var m = 0, wsum = 0;
      ch.kps.forEach(function (kp) {
        var w = weightOf(kp.id);
        wsum += w;
        m += mastery(kp.id) * w;
      });
      return { name: ch.name, mastery: wsum ? m / wsum : 0 };
    });
  }

  function onlyReadingDays() {
    var sessions = Z.store.get().sessions;
    if (!sessions.length) return 0;
    var map = {};
    sessions.forEach(function (s) {
      var k = s.day || Z.store.dayKey(new Date(s.ts));
      if (!map[k]) map[k] = { read: 0, practice: 0 };
      if (s.type === 'practice' || s.type === 'exam') map[k].practice += s.minutes || 0;
      else map[k].read += s.minutes || 0;
    });
    var d = new Date();
    var count = 0;
    for (var i = 0; i < 7; i++) {
      var k = Z.store.dayKey(d);
      var x = map[k];
      if (x && x.read > 0 && x.practice === 0) count++;
      else if (x && x.practice > 0) break;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }

  function continueLastLesson() {
    var state = Z.store.get();
    var best = null;
    Object.keys(state.progress).forEach(function (id) {
      var p = state.progress[id];
      if (p.status === 'inProgress' && p.lastReadAt && (!best || p.lastReadAt > best.p.lastReadAt)) {
        best = { p: p, lesson: Z.LESSON_BY_ID[id] };
      }
    });
    return best && best.lesson ? best : null;
  }

  Z.engine = {
    CONFIG: CONFIG,
    clamp: clamp,
    weightOf: weightOf,
    mastery: mastery,
    masteryAt: masteryAt,
    requiredMastery: requiredMastery,
    gapOf: gapOf,
    priorityOf: priorityOf,
    subjectStats: subjectStats,
    overallProgress: overallProgress,
    lessonUnlock: lessonUnlock,
    nextLesson: nextLesson,
    topGaps: topGaps,
    tasksForToday: tasksForToday,
    examAnalysis: examAnalysis,
    prediction: prediction,
    chapterStats: chapterStats,
    onlyReadingDays: onlyReadingDays,
    continueLastLesson: continueLastLesson
  };
})(window.ZSB = window.ZSB || {});
