/* 讲义索引：在所有分科讲义加载后重建映射与查询函数 */
(function (Z) {
  Z.LESSON_BY_ID = {};
  Z.LESSONS.forEach(function (l) { Z.LESSON_BY_ID[l.id] = l; });
  Z.lessonsOfSubject = function (subject) {
    return Z.LESSONS.filter(function (l) { return l.subject === subject; })
      .sort(function (a, b) { return a.level - b.level; });
  };
  Z.lessonsOfKp = function (kpId) {
    return Z.LESSONS.filter(function (l) { return l.kpIds.indexOf(kpId) >= 0; });
  };
})(window.ZSB = window.ZSB || {});
