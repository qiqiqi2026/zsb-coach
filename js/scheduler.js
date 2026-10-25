/* 间隔重复调度：项目内轻量版 FSRS（stability / difficulty / due） */
(function (Z) {
  var DAY = 86400000;

  function rate(card, rating) {
    var now = Date.now();
    var stab = card.stability || 1;
    var diff = card.difficulty || 5;
    var intervalDays;

    if (rating === 1) {
      stab = Math.max(0.4, stab * 0.35);
      diff = Math.min(10, diff + 1.2);
      card.lapses = (card.lapses || 0) + 1;
      intervalDays = 10 / (1440 * 2); // 约 5 分钟后
    } else if (rating === 2) {
      stab = Math.max(0.8, stab * 1.35);
      diff = Math.min(10, diff + 0.5);
      intervalDays = Math.max(1, stab * 0.7);
    } else if (rating === 3) {
      stab = Math.max(1, stab * 2.1);
      diff = Math.max(1, diff - 0.15);
      intervalDays = Math.max(2, stab);
    } else {
      stab = Math.max(1.5, stab * 3.1);
      diff = Math.max(1, diff - 0.5);
      intervalDays = Math.max(4, stab * 1.35);
    }

    card.stability = Math.round(stab * 10) / 10;
    card.difficulty = Math.round(diff * 10) / 10;
    card.reps = (card.reps || 0) + 1;
    card.lastReview = now;
    card.due = now + intervalDays * DAY;
    return card;
  }

  function dueCards(state) {
    var now = Date.now();
    return (state.cards || []).filter(function (c) { return c.due <= now; });
  }

  function fmtInterval(card) {
    var d = (card.due - Date.now()) / DAY;
    if (d < 1) return Math.max(1, Math.round(d * 1440)) + ' 分钟';
    return Math.round(d) + ' 天';
  }

  Z.fsrs = { rate: rate, dueCards: dueCards, fmtInterval: fmtInterval };
})(window.ZSB = window.ZSB || {});
