/* 本地数据层：localStorage 持久化（离线优先、刷新不丢） */
(function (Z) {
  var BASE_KEY = 'zsb-coach-v2';

  /* 按账号隔离存储：不同账号在同一浏览器里互不影响，新账号自动从零开始 */
  function storageKey() {
    try {
      var s = JSON.parse(localStorage.getItem('zsb.session.v1') || 'null');
      var u = s && s.user ? String(s.user).trim().toLowerCase() : '';
      return BASE_KEY + (u ? ':' + u : '');
    } catch (e) {
      return BASE_KEY;
    }
  }
  var listeners = [];

  function defaultState() {
    return {
      version: 2,
      createdAt: Date.now(),
      profile: {
        onboarded: false,
        examDate: '2027-04-11',
        targetScores: { english: 140, math: 145, cs: 135 },
        currentScores: { english: 60, math: 40, cs: 30 },
        dailyMinutes: 180,
        province: '河南省',
        major: '计算机科学与技术'
      },
      settings: { theme: 'dark', fontScale: 1 },
      baseline: {},
      progress: {},
      attempts: [],
      cards: [],
      mocks: [],
      sessions: [],
      taskLog: {},
      forceUnlocked: {}
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(storageKey());
      if (!raw) return defaultState();
      var data = JSON.parse(raw);
      var base = defaultState();
      return {
        version: 2,
        createdAt: data.createdAt || base.createdAt,
        profile: Object.assign({}, base.profile, data.profile || {}),
        settings: Object.assign({}, base.settings, data.settings || {}),
        baseline: data.baseline || {},
        progress: data.progress || {},
        attempts: data.attempts || [],
        cards: data.cards || [],
        mocks: data.mocks || [],
        sessions: data.sessions || [],
        taskLog: data.taskLog || {},
        forceUnlocked: data.forceUnlocked || {}
      };
    } catch (e) {
      console.warn('本地数据读取失败，使用空数据', e);
      return defaultState();
    }
  }

  var state = load();

  if (Z.cloud && Z.cloud.hydrate) {
    Z.cloud.hydrate(state, function () {
      try { localStorage.setItem(storageKey(), JSON.stringify(state)); } catch (e) {}
      emit();
    });
  }

  /* 已登录本站后端时，换设备登录后自动把进度拉回本机 */
  if (Z.backend && Z.backend.session && Z.backend.session()) {
    Z.backend.hydrate(state, function () {
      try { localStorage.setItem(storageKey(), JSON.stringify(state)); } catch (e) {}
      emit();
    });
  }

  function save() {
    try {
      localStorage.setItem(storageKey(), JSON.stringify(state));
      if (Z.cloud && Z.cloud.sync) Z.cloud.sync(state);
      if (Z.backend && Z.backend.sync) Z.backend.sync(state);
    } catch (e) {
      console.warn('本地数据保存失败', e);
      if (Z.ui && Z.ui.toast) Z.ui.toast('本地存储写入失败，请清理空间');
    }
  }

  function emit() {
    listeners.forEach(function (fn) { try { fn(state); } catch (e) { console.error(e); } });
  }

  function update(mutator) {
    mutator(state);
    save();
    emit();
    return state;
  }

  function dayKey(d) {
    d = d || new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function initBaseline() {
    var p = state.profile;
    Z.KPS.forEach(function (kp) {
      var score = Number(p.currentScores[kp.subject] || 0);
      var full = Z.SUBJECTS[kp.subject].fullMark;
      var ratio = Math.max(0, Math.min(1, score / full));
      state.baseline[kp.id] = Math.min(0.35, 0.08 + ratio * 0.55);
    });
  }

  function progressFor(lessonId) {
    if (!state.progress[lessonId]) {
      state.progress[lessonId] = {
        lessonId: lessonId,
        status: 'unlocked',
        stage: 'intro',
        blockIndex: 0,
        quizCorrect: 0,
        quizTotal: 0,
        lastReadAt: null,
        completedAt: null,
        feynmanScore: null,
        checklistDone: [],
        notes: [],
        highlights: []
      };
    }
    return state.progress[lessonId];
  }

  function upsertProgress(lessonId, patch) {
    var p = progressFor(lessonId);
    Object.assign(p, patch || {});
    save();
    return p;
  }

  function addAttempt(attempt) {
    state.attempts.push(Object.assign({
      id: 'a' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      ts: Date.now()
    }, attempt));
    if (state.attempts.length > 4000) state.attempts = state.attempts.slice(-3500);
    save();
    return state.attempts[state.attempts.length - 1];
  }

  function addSession(session) {
    state.sessions.push(Object.assign({
      id: 's' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      ts: Date.now(),
      day: dayKey()
    }, session));
    save();
  }

  function addCard(card) {
    var exists = state.cards.some(function (c) {
      return c.lessonId === card.lessonId && c.front === card.front;
    });
    if (exists) return false;
    state.cards.push(Object.assign({
      id: 'c' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      createdAt: Date.now(),
      due: Date.now(),
      stability: 1,
      difficulty: 5,
      reps: 0,
      lapses: 0,
      lastReview: null
    }, card));
    save();
    return true;
  }

  function reviewCard(cardId, rating) {
    var card = state.cards.filter(function (c) { return c.id === cardId; })[0];
    if (!card) return null;
    var res = Z.fsrs.rate(card, rating);
    save();
    return res;
  }

  function addNote(lessonId, blockIndex, text) {
    var p = progressFor(lessonId);
    p.notes.push({ blockIndex: blockIndex, text: text, ts: Date.now() });
    save();
  }

  function addHighlight(lessonId, blockIndex, text) {
    var p = progressFor(lessonId);
    p.highlights.push({ blockIndex: blockIndex, text: text, ts: Date.now() });
    save();
  }

  function setTaskDone(taskId, done) {
    var k = dayKey();
    if (!state.taskLog[k]) state.taskLog[k] = {};
    state.taskLog[k][taskId] = done ? Date.now() : 0;
    if (!done) delete state.taskLog[k][taskId];
    save();
  }

  function isTaskDone(taskId) {
    var k = dayKey();
    return !!(state.taskLog[k] && state.taskLog[k][taskId]);
  }

  function isLessonForceUnlocked(lessonId) {
    return !!state.forceUnlocked[lessonId];
  }

  function forceUnlock(lessonId) {
    state.forceUnlocked[lessonId] = Date.now();
    save();
  }

  function setProfile(patch) {
    Object.assign(state.profile, patch);
    save();
  }

  function setSettings(patch) {
    Object.assign(state.settings, patch);
    save();
  }

  function resetAll() {
    var theme = state.settings.theme;
    state = defaultState();
    state.settings.theme = theme;
    save();
    emit();
  }

  function exportJSON() {
    return JSON.stringify({
      app: 'zsb-coach',
      exportedAt: new Date().toISOString(),
      data: state
    }, null, 2);
  }

  function importJSON(text, mode) {
    var parsed;
    try { parsed = JSON.parse(text); } catch (e) { throw new Error('JSON 解析失败'); }
    var incoming = parsed.data || parsed;
    if (!incoming || typeof incoming !== 'object') throw new Error('文件结构不正确');
    if (mode === 'overwrite') {
      state = Object.assign(defaultState(), incoming);
      state.version = 2;
    } else {
      // 合并：以导入数据优先，记录去重
      var base = defaultState();
      var merged = Object.assign(base, state);
      merged.profile = Object.assign({}, state.profile, incoming.profile || {});
      merged.settings = Object.assign({}, state.settings, incoming.settings || {});
      merged.baseline = Object.assign({}, state.baseline, incoming.baseline || {});
      merged.progress = Object.assign({}, state.progress, incoming.progress || {});
      var seen = {};
      merged.attempts = (state.attempts || []).concat(incoming.attempts || []).filter(function (a) {
        if (!a || !a.id) return false;
        if (seen[a.id]) return false;
        seen[a.id] = 1; return true;
      });
      merged.cards = (state.cards || []).concat(incoming.cards || []).filter(function (c) {
        if (!c || !c.id) return false;
        if (seen[c.id]) return false;
        seen[c.id] = 1; return true;
      });
      merged.mocks = (state.mocks || []).concat(incoming.mocks || []).filter(function (m) {
        if (!m || !m.id) return false;
        if (seen[m.id]) return false;
        seen[m.id] = 1; return true;
      });
      merged.sessions = (state.sessions || []).concat(incoming.sessions || []);
      merged.taskLog = Object.assign({}, state.taskLog, incoming.taskLog || {});
      merged.forceUnlocked = Object.assign({}, state.forceUnlocked, incoming.forceUnlocked || {});
      state = merged;
    }
    save();
    emit();
    return countImport(incoming);
  }

  function countImport(incoming) {
    return {
      attempts: (incoming.attempts || []).length,
      lessons: Object.keys(incoming.progress || {}).length,
      mocks: (incoming.mocks || []).length,
      cards: (incoming.cards || []).length
    };
  }

  function streakDays() {
    var days = {};
    state.sessions.forEach(function (s) { days[s.day || dayKey(new Date(s.ts))] = 1; });
    state.attempts.forEach(function (a) { days[dayKey(new Date(a.ts))] = 1; });
    var d = new Date();
    var count = 0;
    // 今天没学也允许从昨天起算
    if (!days[dayKey(d)]) {
      d.setDate(d.getDate() - 1);
      if (!days[dayKey(d)]) return 0;
    }
    while (days[dayKey(d)]) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }

  function minutesToday() {
    var k = dayKey();
    return state.sessions.filter(function (s) { return s.day === k; }).reduce(function (n, s) { return n + (s.minutes || 0); }, 0);
  }

  function totalMinutes() {
    return state.sessions.reduce(function (n, s) { return n + (s.minutes || 0); }, 0);
  }

  function minutesByDay(readOnly) {
    var map = {};
    state.sessions.forEach(function (s) {
      var k = s.day || dayKey(new Date(s.ts));
      if (!map[k]) map[k] = { read: 0, practice: 0 };
      if (s.type === 'practice' || s.type === 'exam') map[k].practice += (s.minutes || 0);
      else map[k].read += (s.minutes || 0);
    });
    return map;
  }

  function daysToExam() {
    if (!state.profile.examDate) return 0;
    var end = new Date(state.profile.examDate + 'T00:00:00');
    var now = new Date();
    return Math.ceil((end - now) / 86400000);
  }

  Z.store = {
    dayKey: dayKey,
    get: function () { return state; },
    save: save,
    subscribe: function (fn) { listeners.push(fn); return function () { listeners = listeners.filter(function (x) { return x !== fn; }); }; },
    update: update,
    initBaseline: initBaseline,
    progressFor: progressFor,
    upsertProgress: upsertProgress,
    addAttempt: addAttempt,
    addSession: addSession,
    addCard: addCard,
    reviewCard: reviewCard,
    addNote: addNote,
    addHighlight: addHighlight,
    setTaskDone: setTaskDone,
    isTaskDone: isTaskDone,
    isLessonForceUnlocked: isLessonForceUnlocked,
    forceUnlock: forceUnlock,
    setProfile: setProfile,
    setSettings: setSettings,
    resetAll: resetAll,
    exportJSON: exportJSON,
    importJSON: importJSON,
    countImport: countImport,
    streakDays: streakDays,
    minutesToday: minutesToday,
    totalMinutes: totalMinutes,
    minutesByDay: minutesByDay,
    daysToExam: daysToExam
  };
})(window.ZSB = window.ZSB || {});
