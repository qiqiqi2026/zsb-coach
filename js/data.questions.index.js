/* 题库索引：在所有分科题库加载后重建映射与查询函数 */
(function (Z) {
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  /* 兼容两种选项写法：{key,text} 对象，或 "A. 选项文字" 字符串 */
  Z.QUESTIONS.forEach(function (q) {
    if (!q.options || !q.options.length || typeof q.options[0] !== 'string') return;
    q.options = q.options.map(function (text, i) {
      var m = /^([A-Fa-f])[.、:：]\s*(.*)$/.exec(text);
      return m ? { key: m[1].toUpperCase(), text: m[2] } : { key: LETTERS[i], text: text };
    });
  });

  Z.Q_BY_ID = {};
  Z.QUESTIONS.forEach(function (q) { Z.Q_BY_ID[q.id] = q; });
  Z.questionsOfKp = function (kpId) {
    return Z.QUESTIONS.filter(function (q) { return q.kpIds.indexOf(kpId) >= 0; });
  };
  Z.questionsOfSubject = function (subject) {
    return Z.QUESTIONS.filter(function (q) { return q.subject === subject; });
  };
})(window.ZSB = window.ZSB || {});
