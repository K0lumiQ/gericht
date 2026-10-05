// Оболочка сайта: шапка, подвал, окна (вход, бронь, текст, галерея), формы, анимации.
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  window.$ = $; window.$$ = $$;
  window.esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var body = document.body, page = body.getAttribute('data-page');

  /* ---------- хранилище ---------- */
  var mem = {};
  window.Store = {
    get: function (k, d) { try { var v = localStorage.getItem('gericht_' + k); return v ? JSON.parse(v) : d; } catch (e) { return k in mem ? mem[k] : d; } },
    set: function (k, v) { mem[k] = v; try { localStorage.setItem('gericht_' + k, JSON.stringify(v)); } catch (e) {} document.dispatchEvent(new CustomEvent('store', { detail: k })); }
  };

  /* ---------- иконки ---------- */
  var IC = {
    chev: '<img src="assets/svg/chevron.svg" alt="" class="chev">',
    spoon: '<img src="assets/svg/spoon.svg" alt="" class="spoon">',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M5 5l14 14M19 5 5 19"/></svg>'
  };
  window.IC = IC;
  window.divider = function (cls) { return '<span class="div' + (cls ? ' ' + cls : '') + '">' + IC.spoon + '</span>'; };

  /* ---------- шапка ---------- */
  var navLinks = [['Home', 'index.html', 'home'], ['Pages', '', 'pages'], ['Contact Us', 'contact.html', 'contact'], ['Blog', 'blog.html', 'blog'], ['Bar', 'bar.html', 'bar']];
  function headerHtml() {
    var u = Store.get('user', null);
    return '<header class="hdr" id="hdr"><div class="hdr-in"><a class="logo" href="index.html" aria-label="Gerícht home">GERÍCHT</a>' +
      '<nav class="nav" id="nav">' + navLinks.map(function (l) {
        if (l[2] === 'pages') return '<div class="dd"><button class="nl dd-b" aria-haspopup="true">Pages</button><div class="dd-m"><a href="index.html">Restaurant</a><a href="bar.html">Bar</a><a href="index.html#menu">Menu</a><a href="index.html#gallery">Gallery</a><a href="blog.html">Journal</a></div></div>';
        return '<a class="nl' + (page === l[2] ? ' on' : '') + '" href="' + l[1] + '">' + l[0] + '</a>';
      }).join('') + '</nav>' +
      '<div class="hr"><button class="auth-b" id="authB">' + (u ? 'Hi, ' + esc(u.name.split(' ')[0]) : 'Log In / Registration') + '</button><span class="vl"></span><button class="book-b" id="bookB">Book Table</button></div>' +
      '<button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i><i></i></button></div></header>';
  }
  function footerHtml() {
    return '<footer class="ftr" id="footer"><div class="wrap"><div class="f-grid"><div class="f-col"><h4>Contact Us</h4><p>9 W 53rd St, New York, NY 10019, USA</p><p><a href="tel:+12123441230">+1 212-344-1230</a><br><a href="tel:+12125551230">+1 212-555-1230</a></p></div>' +
      '<div class="f-col f-mid"><a class="f-logo" href="index.html">GERÍCHT</a><p class="f-q">"The best way to find yourself is to lose yourself in the service of others."</p>' + divider() + '<div class="soc"><a href="#" data-soc aria-label="Facebook"><img src="assets/svg/facebook.svg" alt=""></a><a href="#" data-soc aria-label="Twitter"><img src="assets/svg/twitter.svg" alt=""></a><a href="#" data-soc aria-label="Instagram"><img src="assets/svg/instagram.svg" alt=""></a></div></div>' +
      '<div class="f-col"><h4>Working Hours</h4><p>' + HOURS.weekday + '</p><p>' + HOURS.weekend + '</p></div></div><p class="copy">2021 Gerícht. All Rights reserved.</p></div></footer>';
  }
  $('#hdr-slot').outerHTML = headerHtml();
  var fs = $('#ftr-slot'); if (fs) fs.outerHTML = footerHtml();

  /* ---------- слои ---------- */
  var layer = document.createElement('div');
  layer.innerHTML =
    '<div class="rail"><div class="tags"><a href="index.html" class="' + (page === 'home' ? 'on' : '') + '">#Gericht</a><a href="bar.html" class="' + (page === 'bar' ? 'on' : '') + '">#Bar</a></div></div>' +
    '<a href="#top" class="totop" id="toTop" aria-label="Back to top"><i></i><span>TOP</span></a>' +
    '<div class="modal" id="modal" aria-hidden="true"><div class="m-bd" data-close></div><div class="m-box" role="dialog" aria-modal="true"><button class="m-x" data-close aria-label="Close">' + IC.x + '</button><div class="m-body" id="mBody"></div></div></div>' +
    '<div class="lb" id="lb" aria-hidden="true"><button class="m-x" data-lbclose aria-label="Close">' + IC.x + '</button><button class="lb-n prev" data-lb="-1" aria-label="Previous">' + IC.chev + '</button><figure><img id="lbImg" src="" alt=""><figcaption id="lbCap"></figcaption></figure><button class="lb-n next" data-lb="1" aria-label="Next">' + IC.chev + '</button></div>' +
    '<div class="toast" id="toast" role="status"></div>';
  document.body.appendChild(layer);

  /* ---------- модальное окно ---------- */
  var modal = $('#modal'), mBody = $('#mBody');
  window.openModal = function (html, cls) {
    mBody.innerHTML = html; modal.className = 'modal open' + (cls ? ' ' + cls : ''); modal.setAttribute('aria-hidden', 'false'); body.classList.add('lock');
    var f = $('input, select, button.btn', mBody); if (f && cls !== 'wide') setTimeout(function () { f.focus && f.focus(); }, 350);
  };
  window.closeModal = function () { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); if (!$('#lb').classList.contains('open')) body.classList.remove('lock'); };
  document.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeLb(); closeNav(); } });

  /* ---------- toast ---------- */
  var tt; window.toast = function (m) { var t = $('#toast'); t.textContent = m; void t.offsetWidth; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(function () { t.classList.remove('show'); }, 2800); };
  document.addEventListener('click', function (e) { if (e.target.closest('[data-soc]')) { e.preventDefault(); toast('This is a demo site: social links are disabled'); } });

  /* ---------- шапка: поведение ---------- */
  var hdr = $('#hdr'), lastY = 0;
  function onScroll() {
    var y = window.scrollY; hdr.classList.toggle('solid', y > 40); hdr.classList.toggle('hide', y > 300 && y > lastY + 4 && !$('#nav').classList.contains('open')); if (y < lastY - 4 || y < 300) hdr.classList.remove('hide'); lastY = y;
    $('#toTop').classList.toggle('show', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  function closeNav() { $('#nav').classList.remove('open'); $('#burger').classList.remove('open'); $('#burger').setAttribute('aria-expanded', 'false'); hdr.classList.remove('menu'); }
  $('#burger').addEventListener('click', function () { var o = $('#nav').classList.toggle('open'); this.classList.toggle('open', o); this.setAttribute('aria-expanded', String(o)); hdr.classList.toggle('menu', o); });
  document.addEventListener('click', function (e) {
    var dd = e.target.closest('.dd-b'); $$('.dd.open').forEach(function (d) { if (!dd || d !== dd.parentNode) d.classList.remove('open'); }); if (dd) dd.parentNode.classList.toggle('open');
    if (e.target.closest('#nav a')) closeNav();
  });
  $('#toTop').addEventListener('click', function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------- форма брони ---------- */
  function todayIso() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function fmtDate(iso) { var p = iso.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
  function selectBox(name, opts, val) { return '<label class="sel"><select name="' + name + '">' + opts.map(function (o) { return '<option value="' + o[0] + '"' + (String(o[0]) === String(val) ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>' + IC.chev + '</label>'; }
  window.bookingForm = function (box, opts) {
    opts = opts || {};
    var last = Store.get('lastBooking', null);
    function render() {
      var people = []; for (var i = 1; i <= 10; i++) people.push([i, i + (i === 1 ? ' Person' : ' People')]);
      box.innerHTML = '<form class="book-f" novalidate><div class="bf-row">' + selectBox('people', people, 2) + '<label class="sel dt"><input type="date" name="date" min="' + todayIso() + '" value="' + todayIso() + '">' + IC.chev + '</label>' + selectBox('time', TIMES.map(function (t) { return [t, t]; }), '07:00 PM') + '</div>' +
        '<div class="bf-more"><label class="fld"><input name="name" placeholder="Your name"><span class="err"></span></label><label class="fld"><input name="phone" type="tel" placeholder="Phone or email"><span class="err"></span></label></div>' +
        '<div class="bf-act"><button class="btn" type="submit"><span>Book Now</span></button></div></form>';
      var f = $('.book-f', box);
      f.addEventListener('submit', function (e) {
        e.preventDefault(); var el = f.elements, bad = false;
        if (!f.classList.contains('step2')) {
          var d0 = el.date.value; if (!d0 || d0 < todayIso()) { el.date.parentNode.classList.add('bad'); toast('Please choose a date from today onwards'); return; } el.date.parentNode.classList.remove('bad');
          f.classList.add('step2'); f.querySelector('.btn span').textContent = 'Confirm Booking'; setTimeout(function () { el.name.focus(); }, 500); return;
        }
        function chk(n, c, m) { var x = el[n], er = x.parentNode.querySelector('.err'); x.classList.remove('bad'); if (er) er.textContent = ''; if (c) { x.classList.add('bad'); if (er) er.textContent = m; void x.offsetWidth; bad = true; } }
        chk('name', el.name.value.trim().length < 2, 'Please tell us your name'); chk('phone', el.phone.value.trim().length < 5, 'Add a phone number or email');
        var d = el.date.value; if (!d || d < todayIso()) { el.date.parentNode.classList.add('bad'); bad = true; toast('Please choose a date from today onwards'); } else el.date.parentNode.classList.remove('bad');
        if (bad) return;
        var b = f.querySelector('.btn'); b.classList.add('load'); b.disabled = true;
        setTimeout(function () {
          var r = { code: 'GR-' + Math.floor(1000 + Math.random() * 9000), people: el.people.value, date: d, time: el.time.value, name: el.name.value.trim(), contact: el.phone.value.trim() };
          Store.set('lastBooking', r); var all = Store.get('bookings', []); all.unshift(r); Store.set('bookings', all.slice(0, 20)); done(r);
        }, 900);
      });
    }
    function done(r) {
      box.innerHTML = '<div class="book-ok"><svg class="ok-ic" viewBox="0 0 80 80"><circle cx="40" cy="40" r="36"/><path d="M25 41l10 10 20-22"/></svg><h3>Table reserved</h3><p>Thank you, ' + esc(r.name) + '. We are expecting <b>' + r.people + (r.people == 1 ? ' guest' : ' guests') + '</b> on <b>' + fmtDate(r.date) + '</b> at <b>' + r.time + '</b>.</p><p class="code">Booking code <b>' + r.code + '</b></p><button class="btn ghost" data-again><span>Make another booking</span></button></div>';
      $('[data-again]', box).onclick = render;
    }
    render();
  };

  /* ---------- вход / регистрация ---------- */
  function authModal() {
    var u = Store.get('user', null);
    if (u) { openModal('<div class="auth"><h3>Hello, ' + esc(u.name) + '</h3><p class="m-p">You are signed in as ' + esc(u.email) + '.</p><div class="m-act"><button class="btn" data-out><span>Log out</span></button></div></div>'); $('[data-out]').onclick = function () { Store.set('user', null); closeModal(); $('#authB').textContent = 'Log In / Registration'; toast('You have been logged out'); }; return; }
    var mode = 'in';
    function draw() {
      mBody.innerHTML = '<div class="auth"><div class="tabs"><button class="' + (mode === 'in' ? 'on' : '') + '" data-m="in">Log In</button><button class="' + (mode === 'up' ? 'on' : '') + '" data-m="up">Registration</button></div>' +
        '<form novalidate>' + (mode === 'up' ? '<label class="fld"><input name="name" placeholder="Full name"><span class="err"></span></label>' : '') + '<label class="fld"><input name="email" type="email" placeholder="Email address"><span class="err"></span></label><label class="fld"><input name="pass" type="password" placeholder="Password"><span class="err"></span></label>' +
        '<div class="m-act"><button class="btn" type="submit"><span>' + (mode === 'in' ? 'Log In' : 'Create Account') + '</span></button></div><p class="hint">Demo: any email and a password of 4+ characters will work. Data stays in your browser.</p></form></div>';
      $$('.tabs button', mBody).forEach(function (b) { b.onclick = function () { mode = b.getAttribute('data-m'); draw(); }; });
      $('form', mBody).addEventListener('submit', function (e) {
        e.preventDefault(); var f = e.target.elements, bad = false;
        function chk(n, c, m) { var x = f[n]; if (!x) return; var er = x.parentNode.querySelector('.err'); x.classList.remove('bad'); er.textContent = ''; if (c) { x.classList.add('bad'); er.textContent = m; void x.offsetWidth; bad = true; } }
        if (mode === 'up') chk('name', f.name.value.trim().length < 2, 'Enter your name');
        chk('email', !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value), 'Check your email address'); chk('pass', f.pass.value.length < 4, 'At least 4 characters');
        if (bad) return;
        var name = mode === 'up' ? f.name.value.trim() : (f.email.value.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); }));
        Store.set('user', { name: name, email: f.email.value }); $('#authB').textContent = 'Hi, ' + name.split(' ')[0]; closeModal(); toast(mode === 'up' ? 'Welcome to Gerícht, ' + name.split(' ')[0] : 'Welcome back, ' + name.split(' ')[0]);
      });
    }
    openModal(''); draw();
  }
  $('#authB').addEventListener('click', authModal);

  /* ---------- бронирование из шапки ---------- */
  window.openBooking = function () {
    var target = $('#book');
    if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); target.classList.remove('flash'); void target.offsetWidth; target.classList.add('flash'); return; }
    openModal('<div class="bk"><span class="eyebrow">Reservations</span>' + divider() + '<h3>Book A Table</h3><div id="bkBox"></div></div>', 'wide'); bookingForm($('#bkBox'));
  };
  $('#bookB').addEventListener('click', openBooking);
  document.addEventListener('click', function (e) { var t = e.target.closest('[data-book]'); if (t) { e.preventDefault(); closeNav(); openBooking(); } });

  /* ---------- рассылка ---------- */
  window.newsletter = function (f) {
    var saved = Store.get('news', null);
    if (saved) { f.innerHTML = '<div class="news-ok"><b>You are on the list.</b> We will write to ' + esc(saved) + ' with the latest updates.</div>'; return; }
    f.addEventListener('submit', function (e) {
      e.preventDefault(); var i = f.elements.email, ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value);
      i.classList.toggle('bad', !ok); f.querySelector('.err').textContent = ok ? '' : 'Please enter a valid email address'; if (!ok) { void i.offsetWidth; return; }
      Store.set('news', i.value); f.innerHTML = '<div class="news-ok"><b>Thank you!</b> We have sent a confirmation to ' + esc(i.value) + '.</div>';
    });
  };

  /* ---------- галерея-просмотр ---------- */
  var lb = $('#lb'), lbList = [], lbI = 0;
  window.openLb = function (list, i) { lbList = list; lbI = i; showLb(); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); body.classList.add('lock'); };
  function showLb() { var it = lbList[lbI], im = $('#lbImg'); im.classList.remove('in'); void im.offsetWidth; im.src = it.img; im.alt = it.cap || ''; im.classList.add('in'); $('#lbCap').textContent = (it.cap || '') + (lbList.length > 1 ? '  (' + (lbI + 1) + '/' + lbList.length + ')' : ''); $$('.lb-n').forEach(function (b) { b.style.display = lbList.length > 1 ? '' : 'none'; }); }
  function closeLb() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); if (!modal.classList.contains('open')) body.classList.remove('lock'); }
  lb.addEventListener('click', function (e) { if (e.target.closest('[data-lbclose]') || e.target === lb || e.target.tagName === 'FIGURE') closeLb(); var n = e.target.closest('[data-lb]'); if (n) { lbI = (lbI + Number(n.getAttribute('data-lb')) + lbList.length) % lbList.length; showLb(); } });
  document.addEventListener('keydown', function (e) { if (!lb.classList.contains('open')) return; if (e.key === 'ArrowRight') { lbI = (lbI + 1) % lbList.length; showLb(); } if (e.key === 'ArrowLeft') { lbI = (lbI - 1 + lbList.length) % lbList.length; showLb(); } });

  /* ---------- появление блоков, параллакс, счётчики ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (!e.isIntersecting) return; e.target.classList.add('in'); io.unobserve(e.target); var c = e.target.querySelectorAll('[data-count]'); if (e.target.hasAttribute('data-count')) countUp(e.target); Array.prototype.forEach.call(c, countUp); });
  }, { threshold: .06, rootMargin: '0px 0px -4% 0px' }) : null;
  function countUp(el) { var to = Number(el.getAttribute('data-count')), t0 = performance.now(); (function s(t) { var k = Math.min(1, (t - t0) / 1100), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(to * e); if (k < 1) requestAnimationFrame(s); })(t0); }
  window.observeReveal = function () { $$('.rv:not(.in), .rv-l:not(.in), .rv-r:not(.in)').forEach(function (el) { if (io) io.observe(el); else el.classList.add('in'); }); };
  var par = [];
  function parallax() { var h = window.innerHeight; par.forEach(function (el) { var r = el.parentNode.getBoundingClientRect(); if (r.bottom < -100 || r.top > h + 100) return; var k = (r.top + r.height / 2 - h / 2) / h; el.style.transform = 'translate3d(0,' + (k * Number(el.getAttribute('data-par'))).toFixed(1) + 'px,0)'; }); }
  window.initParallax = function () { par = $$('[data-par]'); parallax(); };
  window.addEventListener('scroll', function () { if (par.length) requestAnimationFrame(parallax); }, { passive: true });
  window.rerender = function () { setTimeout(function () { observeReveal(); initParallax(); $$('img[loading="lazy"]').forEach(function (i) { if (i.complete) i.classList.add('ld'); }); }, 30); };
  document.addEventListener('load', function (e) { if (e.target.tagName === 'IMG') e.target.classList.add('ld'); }, true);

  // якоря на странице
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a || a.id === 'toTop') return; var id = a.getAttribute('href').slice(1); if (!id) return; var t = document.getElementById(id); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
  if (location.hash && document.getElementById(location.hash.slice(1))) setTimeout(function () { document.getElementById(location.hash.slice(1)).scrollIntoView(); }, 400);
})();
