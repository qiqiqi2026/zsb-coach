/* 代码沙箱：sandbox iframe 内执行用户 JS，支持输出捕获与测试用例 */
(function (Z) {
  var RUNNER = [
    '<!doctype html><html><body><script>',
    'window.addEventListener("message", function (e) {',
    '  var d = e.data || {};',
    '  if (d.type !== "run") return;',
    '  var logs = [];',
    '  var fakeConsole = { log: function () { logs.push(Array.prototype.map.call(arguments, function (x) { return typeof x === "string" ? x : JSON.stringify(x); }).join(" ")); } };',
    '  var results = [], error = null, evalInScope = null;',
    '  try {',
    '    var factory = new Function("console", d.code + "\\n; return function (expr) { return eval(expr); };");',
    '    evalInScope = factory(fakeConsole);',
    '    if (d.tests && d.tests.length) {',
    '      for (var i = 0; i < d.tests.length; i++) {',
    '        var t = d.tests[i], actual = "", ok = false;',
    '        try {',
    '          var out = evalInScope(t.input);',
    '          actual = (typeof out === "number" && isNaN(out)) ? "NaN" : String(out);',
    '          ok = actual === String(t.expect);',
    '        } catch (err2) { actual = "运行错误: " + (err2 && err2.message); }',
    '        results.push({ input: t.input, expect: String(t.expect), actual: actual, ok: ok });',
    '      }',
    '    }',
    '  } catch (err) { error = String(err && err.message || err); }',
    '  parent.postMessage({ type: "zsb-result", logs: logs, results: results, error: error }, "*");',
    '});',
    '<\/script></body></html>'
  ].join('\n');

  var seq = 0;

  function run(code, tests, timeoutMs) {
    return new Promise(function (resolve) {
      var id = 'sb' + (++seq);
      var iframe = document.createElement('iframe');
      iframe.setAttribute('sandbox', 'allow-scripts');
      iframe.setAttribute('aria-hidden', 'true');
      iframe.style.cssText = 'position:fixed;width:0;height:0;border:0;opacity:0;pointer-events:none;left:-9999px;top:0';
      var done = false;
      var timer = setTimeout(function () {
        finish({ logs: [], results: [], error: '运行超时（可能是死循环）' });
      }, timeoutMs || 2500);

      function finish(payload) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        window.removeEventListener('message', onMsg);
        iframe.remove();
        resolve(payload);
      }

      function onMsg(e) {
        if (e.source !== iframe.contentWindow) return;
        var d = e.data || {};
        if (d.type !== 'zsb-result') return;
        finish(d);
      }

      window.addEventListener('message', onMsg);
      iframe.srcdoc = RUNNER;
      iframe.onload = function () {
        iframe.contentWindow.postMessage({ type: 'run', id: id, code: code, tests: tests || [] }, '*');
      };
      document.body.appendChild(iframe);
    });
  }

  Z.sandbox = { run: run };
})(window.ZSB = window.ZSB || {});
