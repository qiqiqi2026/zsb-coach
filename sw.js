/* 离线缓存：应用外壳 + 全部静态资源 */
var CACHE = 'zsb-coach-v9';
var ASSETS = [
  './',
  './index.html',
  './app.html',
  './styles.css',
  './manifest.webmanifest',
  './icon.svg',
  './js/data.knowledge.js',
  './js/lesson-factory.js',
  './js/data.questions.js',
  './js/data.questions.eng.js',
  './js/data.questions.math.js',
  './js/data.questions.cs.js',
  './js/data.questions.ext.eng.js',
  './js/data.questions.index.js',
  './js/data.lessons.js',
  './js/data.lessons.eng.js',
  './js/data.lessons.math.js',
  './js/data.lessons.cs.js',
  './js/data.lessons.index.js',
  './js/data.exam.js',
  './js/diagrams.js',
  './js/diagrams2.js',
  './js/diagrams3.js',
  './js/pack.python.js',
  './js/pack.html.js',
  './js/pack.js.js',
  './js/pack.spider.js',
  './js/pack.database.js',
  './js/pack.softeng.js',
  './js/pack.dsa.js',
  './js/pack.backfill.eng.js',
  './js/pack.backfill.math.js',
  './js/pack.security.js',
  './js/pack.os.js',
  './js/pack.backfill.cs.js',
  './js/pack.expand.eng.js',
  './js/pack.expand.math.js',
  './js/cloud.config.js',
  './js/cloud.js',
  './js/backend.js',
  './js/ai.js',
  './js/store.js',
  './js/scheduler.js',
  './js/engine.js',
  './js/ui.js',
  './js/sandbox.js',
  './js/question.js',
  './js/blocks.js',
  './js/lesson.js',
  './js/practice.js',
  './js/exam.js',
  './js/me.js',
  './js/app.js',
  './js/ai-ui.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) {
        return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  /* 动态后端会实时生成这份配置，不能被缓存接管 */
  if (url.pathname.indexOf('/js/ai.config.js') >= 0) return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () {
        if (e.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
