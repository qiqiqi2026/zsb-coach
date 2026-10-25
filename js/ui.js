/* UI 基础工具：转义 / 轻量 markdown / 公式渲染 / 图标 / 弹层 / toast */
(function (Z) {
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function fmtMath(latex, display) {
    var s = esc(latex);
    s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '<span class="frac"><span>$1</span><span>$2</span></span>');
    s = s.replace(/\\sqrt\{([^{}]+)\}/g, '√<span style="border-top:1px solid currentColor;padding:0 1px">$1</span>');
    s = s.replace(/\\lim_\{([^{}]+)\}/g, 'lim<sub>$1</sub>');
    s = s.replace(/\\lim/g, 'lim');
    s = s.replace(/\\Delta/g, 'Δ').replace(/\\delta/g, 'δ')
      .replace(/\\to/g, '→').replace(/\\infty/g, '∞')
      .replace(/\\cdot/g, '·').replace(/\\times/g, '×')
      .replace(/\\leq|\\le/g, '≤').replace(/\\geq|\\ge/g, '≥')
      .replace(/\\neq|\\ne/g, '≠')
      .replace(/\\sin/g, 'sin').replace(/\\cos/g, 'cos').replace(/\\tan/g, 'tan')
      .replace(/\\ln/g, 'ln').replace(/\\log/g, 'log').replace(/\\int/g, '∫')
      .replace(/\\left|\\right/g, '').replace(/\\quad|\\qquad/g, '&nbsp;&nbsp;')
      .replace(/\\,|\\;/g, ' ');
    s = s.replace(/\^\{([^{}]+)\}/g, '<sup>$1</sup>').replace(/\^([A-Za-z0-9])/g, '<sup>$1</sup>');
    s = s.replace(/_\{([^{}]+)\}/g, '<sub>$1</sub>').replace(/_([A-Za-z0-9])/g, '<sub>$1</sub>');
    return '<span class="math' + (display ? ' math-display' : '') + '">' + s + '</span>';
  }

  function md(text) {
    if (!text) return '';
    var s = esc(text);
    s = s.replace(/\$([^$]+)\$/g, function (m, expr) { return fmtMath(expr); });
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/`([^`]+)`/g, '<code class="inline">$1</code>');
    s = s.replace(/\n/g, '<br>');
    return s;
  }

  var ICONS = {
    today: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
    study: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 5.5v15"/><path d="M8 7h8M8 11h6"/>',
    practice: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
    exam: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    me: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.14.6.66 1.05 1.29 1.09H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1z"/>',
    moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
    cards: '<rect x="3" y="6" width="14" height="14" rx="3"/><path d="M8 6V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2"/>',
    wrong: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/><path d="M9 12l5 5M14 12l-5 5"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    chart: '<path d="M4 19V5M4 19h16"/><path d="M8 16v-5M12 16v-8M16 16v-3"/>',
    book: '<path d="M4 4h7a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H4z"/><path d="M20 4h-3a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h3z"/>',
    code: '<path d="M9 6l-5 6 5 6M15 6l5 6-5 6"/>',
    file: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    play: '<path d="M7 4l12 8-12 8z"/>',
    refresh: '<path d="M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2"/><path d="M20 4v5h-5M4 20v-5h5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>'
  };

  function icon(name, size) {
    var p = ICONS[name] || ICONS.spark;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"' +
      (size ? ' style="width:' + size + 'px;height:' + size + 'px"' : '') + '>' + p + '</svg>';
  }

  function toast(msg, ms) {
    var root = document.getElementById('toast-root');
    if (!root) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    root.appendChild(el);
    setTimeout(function () {
      el.style.opacity = '0';
      el.style.transition = 'opacity .2s';
      setTimeout(function () { el.remove(); }, 220);
    }, ms || 1900);
  }

  var sheetStack = [];

  function sheet(opts) {
    var root = document.getElementById('overlay-root');
    var backdrop = document.createElement('div');
    backdrop.className = 'sheet-backdrop';
    var sheet = document.createElement('div');
    sheet.className = 'sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    var head = opts.title
      ? '<div class="sheet-head"><div class="sheet-title">' + esc(opts.title) + '</div>' +
        '<button class="icon-btn" data-sheet-close aria-label="关闭">' + icon('back') + '</button></div>'
      : '';
    sheet.innerHTML = head + '<div class="sheet-body"></div>' +
      (opts.foot ? '<div class="sheet-foot">' + opts.foot + '</div>' : '');

    var body = sheet.querySelector('.sheet-body');
    if (typeof opts.body === 'string') body.innerHTML = opts.body;
    else if (opts.body) body.appendChild(opts.body);

    function close() {
      backdrop.remove();
      sheet.remove();
      sheetStack = sheetStack.filter(function (s) { return s !== close; });
      if (opts.onClose) opts.onClose();
    }
    backdrop.addEventListener('click', function () { if (opts.dismissible !== false) close(); });
    var closeBtn = sheet.querySelector('[data-sheet-close]');
    if (closeBtn) closeBtn.addEventListener('click', close);
    root.appendChild(backdrop);
    root.appendChild(sheet);
    sheetStack.push(close);
    return { el: sheet, body: body, close: close, setFoot: function (html) { var f = sheet.querySelector('.sheet-foot'); if (f) f.innerHTML = html; } };
  }

  function confirmDialog(opts) {
    return new Promise(function (resolve) {
      var root = document.getElementById('overlay-root');
      var wrap = document.createElement('div');
      wrap.className = 'modal-wrap';
      wrap.innerHTML = '<div class="modal-card"><div class="card-title">' + esc(opts.title) + '</div>' +
        '<p class="muted small" style="margin:6px 0 18px">' + esc(opts.body) + '</p>' +
        '<div class="btn-row"><button class="btn ghost" data-no>' + esc(opts.cancelText || '取消') + '</button>' +
        '<button class="btn ' + (opts.danger ? 'danger' : 'primary') + '" data-yes>' + esc(opts.okText || '确定') + '</button></div></div>';
      root.appendChild(wrap);
      wrap.addEventListener('click', function (e) {
        if (e.target === wrap || e.target.hasAttribute('data-no')) { wrap.remove(); resolve(false); }
        if (e.target.hasAttribute('data-yes')) { wrap.remove(); resolve(true); }
      });
    });
  }

  function ring(pct, opts) {
    opts = opts || {};
    var size = opts.size || 74;
    var stroke = opts.stroke || 6;
    var r = (size - stroke) / 2;
    var c = 2 * Math.PI * r;
    var p = Math.max(0, Math.min(1, pct || 0));
    var color = opts.color || 'var(--accent)';
    return '<div class="ring" style="width:' + size + 'px;height:' + size + 'px">' +
      '<svg width="' + size + '" height="' + size + '">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="var(--line-soft)" stroke-width="' + stroke + '"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + stroke + '" stroke-dasharray="' + c + '" stroke-dashoffset="' + (c * (1 - p)) + '" stroke-linecap="round"/>' +
      '</svg><div class="ring-label">' + Math.round(p * 100) + '%</div></div>';
  }

  function fmtMinutes(m) {
    m = Math.round(m || 0);
    if (m < 60) return m + ' 分钟';
    var h = Math.floor(m / 60), r = m % 60;
    return h + ' 小时' + (r ? ' ' + r + ' 分' : '');
  }

  function fmtDate(ts) {
    var d = new Date(ts);
    return (d.getMonth() + 1) + '月' + d.getDate() + '日';
  }

  function fmtTime(ms) {
    var s = Math.max(0, Math.round(ms / 1000));
    var m = Math.floor(s / 60), r = s % 60;
    return String(m).padStart(2, '0') + ':' + String(r).padStart(2, '0');
  }

  function download(filename, text) {
    var blob = new Blob([text], { type: 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function empty(iconName, title, sub, actionHtml) {
    return '<div class="empty"><div class="empty-icon">' + icon(iconName) + '</div>' +
      '<div class="em-title">' + esc(title) + '</div><div class="em-sub">' + esc(sub) + '</div>' +
      (actionHtml || '') + '</div>';
  }

  Z.ui = {
    esc: esc, md: md, fmtMath: fmtMath, icon: icon, toast: toast, sheet: sheet,
    confirm: confirmDialog, ring: ring, fmtMinutes: fmtMinutes, fmtDate: fmtDate,
    fmtTime: fmtTime, download: download, empty: empty
  };
})(window.ZSB = window.ZSB || {});
