// Страницы: главная (ресторан), бар, блог, статья, контакты
(function () {
  var page = document.body.getAttribute('data-page');
  var root = document.getElementById('page');
  var qs = new URLSearchParams(location.search);
  var views = {};
  var eyebrow = function (t) { return '<span class="eyebrow">' + t + '</span>' + divider(); };
  var badge = function (cls) { return '<img class="badge ' + (cls || '') + '" src="assets/svg/badge.svg" alt="Bite delight in every">'; };
  var btn = function (t, attrs) { return '<a class="btn" ' + (attrs || 'href="#"') + '><span>' + t + '</span></a>'; };
  var arcs = function (cls) { return '<svg class="arcs ' + (cls || '') + '" viewBox="0 0 1000 800" preserveAspectRatio="none" aria-hidden="true"><path d="M-40 90C260 70 560 150 700 380S1000 760 1060 740" /><path d="M120 -30C170 200 150 420 260 560" /></svg>'; };

  /* ---- общие блоки ---- */
  function bookSection() {
    return '<section class="sec book-sec"><div class="wrap">' + arcs('a1') + '<div class="book rv" id="book">' + eyebrow('Reservations') + '<h2 class="h2">Book A Table</h2><div id="bookBox"></div></div></div></section>';
  }
  function newsletterSection() {
    return '<section class="sec news-sec"><div class="wrap"><div class="news rv">' + eyebrow('Newsletter') + '<h2 class="h2">Subscribe To Our Newsletter</h2><p class="news-p">And never miss latest Updates!</p><form class="news-f" novalidate><label class="fld"><input name="email" type="email" placeholder="Email Address" autocomplete="email"><span class="err"></span></label><button class="btn" type="submit"><span>Subscribe</span></button></form></div></div></section>';
  }
  function menuLists(m, expanded) {
    var item = function (a) { return '<li><div class="mi-h"><span class="mi-n">' + a[0] + '</span><i></i><span class="mi-p">$' + a[1] + '</span></div><p class="mi-d">' + a[2] + '</p></li>'; };
    var more = function (arr) { return arr.slice(5).map(function (a, i) { return item(a).replace('<li>', '<li class="extra" style="--d:' + i * 70 + 'ms">'); }).join(''); };
    return '<div class="sp-grid"><div class="sp-col"><h3>' + m.leftTitle + '</h3><ul>' + m.left.slice(0, 5).map(item).join('') + more(m.left) + '</ul></div>' +
      '<div class="sp-img"><img src="' + m.photo + '" alt="' + m.leftTitle + ' and ' + m.rightTitle + '" loading="lazy"></div><div class="sp-col"><h3>' + m.rightTitle + '</h3><ul>' + m.right.slice(0, 5).map(item).join('') + more(m.right) + '</ul></div></div>';
  }
  function bindViewMore(box) {
    var b = box.querySelector('[data-more]'); if (!b) return;
    b.onclick = function () { var o = box.classList.toggle('expanded'); b.querySelector('span').textContent = o ? 'View Less' : 'View More'; };
  }
  function aboutModal(kind) {
    var d = {
      about: ['Our Story', 'About Us', ['Gerícht opened in 2016 with one idea: that a neighbourhood restaurant can cook with the discipline of a fine-dining kitchen and still feel like home.', 'Chef Kevin Luo built the menu around a single open grill and a short list of suppliers he knows by name. Nothing arrives that he has not tasted, and nothing leaves the pass that he would not eat himself.', 'Today the team is thirty strong, but the principle is the same: honest ingredients, careful cooking, generous service.']],
      history: ['Since 2016', 'Our History', ['The name comes from the German word for a dish. Our first room sat twenty-two guests and had one burner, one oven and a borrowed grill.', 'In 2018 we moved to the current address and added the bar. In 2020 we kept our staff employed by cooking meals for local hospital workers, an effort that still makes us proud.', 'Our awards are lovely, but our favourite review remains the regular who has booked the same corner table every Friday since we opened.']],
      bar: ['Food, Drinks, Entertainment', 'About Our Bar', ['The bar at Gerícht is open late and designed for lingering. Twelve taps, a small cellar of hand-picked bottles and a cocktail list that changes with the seasons.', 'Our bartenders make their own syrups and bitters, juice citrus to order and carve ice by hand. On Thursdays we host live jazz from nine.', 'Come for a drink, stay for the grill, which serves a short bar menu until the last order.']]
    }[kind];
    openModal('<div class="info">' + eyebrow(d[0]) + '<h3>' + d[1] + '</h3>' + d[2].map(function (p) { return '<p>' + p + '</p>'; }).join('') + '<div class="m-act"><a class="btn" href="#" data-book><span>Book A Table</span></a></div></div>', 'wide');
  }
  document.addEventListener('click', function (e) { var k = e.target.closest('[data-know]'); if (k) { e.preventDefault(); aboutModal(k.getAttribute('data-know')); } });

  /* ---- слайдер героя ---- */
  function slider(el, n, delay) {
    var i = 0, timer, slides = el.querySelectorAll('[data-slide]'), dots = el.querySelectorAll('[data-go]'), bar = el.querySelector('.s-prog i');
    function go(k) {
      i = (k + n) % n; slides.forEach(function (s, j) { s.classList.toggle('on', j === i); s.classList.toggle('prev', j === ((i - 1 + n) % n)); });
      dots.forEach(function (d, j) { d.classList.toggle('on', j === i); });
      if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = 'prog ' + delay + 'ms linear forwards'; }
    }
    function start() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, delay); }
    dots.forEach(function (d) { d.onclick = function () { go(Number(d.getAttribute('data-go'))); start(); }; });
    el.addEventListener('mouseenter', function () { clearInterval(timer); if (bar) bar.style.animationPlayState = 'paused'; });
    el.addEventListener('mouseleave', function () { start(); if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = 'prog ' + delay + 'ms linear forwards'; } });
    var x0 = null; el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true }); el.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) { go(i + (dx < 0 ? 1 : -1)); start(); } x0 = null; });
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearInterval(timer); else start(); });
    go(0); start();
  }
  function dotsHtml(n, vertical) { var h = ''; for (var k = 0; k < n; k++) h += (k ? (k === 1 ? '' : '') : '') + '<button data-go="' + k + '" class="' + (k ? '' : 'on') + '">' + ('0' + (k + 1)).slice(-2) + '</button>'; return '<div class="s-dots' + (vertical ? ' v' : '') + '">' + h + '<span class="s-prog"><i></i></span></div>'; }

  /* ======================= ГЛАВНАЯ (РЕСТОРАН) ======================= */
  views.home = function () {
    var slides = HERO_SLIDES.map(function (s, k) {
      return '<div class="slide" data-slide><div class="sl-text"><span class="kick">' + s.kicker + '</span>' + divider('left') + '<h1 class="big">' + s.title.map(function (t) { return '<span class="ln"><span>' + t + '</span></span>'; }).join('') + '</h1><p class="lead">' + s.text + '</p>' + btn(s.cta, 'href="' + s.href + '"') + '</div>' +
        '<div class="sl-img frame"><div class="fr-in"><img src="' + s.img + '" alt="' + s.title.join(' ') + '"></div></div></div>';
    }).join('');
    root.innerHTML =
      '<section class="hero" id="top"><div class="wrap-w"><div class="slides" id="hs">' + slides + '</div>' + dotsHtml(HERO_SLIDES.length) + '<a class="scroll-h" href="#about"><i></i><span>SCROLL</span></a></div></section>' +
      '<section class="sec about tex" id="about"><div class="wrap"><img class="g-big" src="assets/svg/g.svg" alt="" data-par="-40"><img class="knife" src="assets/img/knife.png" alt="" data-par="30"><div class="ab-grid">' +
      '<div class="ab-l rv-l"><h2 class="h2">About Us</h2>' + divider('right') + '<p>Gerícht began as a twenty-two seat room with one grill and a very stubborn idea: that a neighbourhood restaurant can cook with a fine-dining kitchen\'s discipline and still feel like home. We buy from farms we have visited and cook over oak.</p><a class="btn" href="#" data-know="about"><span>Know More</span></a></div>' +
      '<div class="ab-r rv-r"><h2 class="h2">Our History</h2>' + divider('left') + '<p>The name is German for a single dish, and the first menu had only five. Since 2016 we have grown to a full dining room and a late bar, but the rule has not changed: if it is not good enough for the chef\'s own table, it does not leave the pass.</p><a class="btn" href="#" data-know="history"><span>Know More</span></a></div></div></div></section>' +
      bookSection() +
      '<section class="menu-tabs" id="menu"><div class="mt-bgs" id="mtBgs">' + ['bar', 'food', 'desserts'].map(function (k, j) { return '<img src="' + MENUS[k].banner + '" alt="" class="' + (j ? '' : 'on') + '" data-bg="' + k + '">'; }).join('') + '</div>' + badge('b-l') +
      '<div class="wrap"><nav class="mt-nav" id="mtNav"><button class="on" data-m="bar">Bar Menu</button><button data-m="food">Food Menu</button><button data-m="desserts">Desserts Menu</button></nav></div></section>' +
      '<section class="sec special"><div class="wrap">' + arcs('a2') + '<div class="center rv">' + eyebrow('Menu That Fits You Palatte') + '<h2 class="h2">Today\'s Special</h2></div><div class="sp-wrap" id="spWrap">' + menuLists(MENUS.bar) + '</div><div class="center"><a class="btn" href="#" data-more><span>View More</span></a></div></div></section>' +
      '<section class="sec chef tex"><div class="wrap"><div class="ch-grid"><div class="ch-img frame rv-l"><div class="fr-in"><img src="assets/img/chef.jpg" alt="Chef Kevin Luo holding a lettuce leaf" loading="lazy"></div></div><div class="ch-txt rv-r">' + eyebrow('Chef\'s Word').replace('div"', 'div left"') + '<h2 class="h2">What We Believe In</h2><div class="quote"><img src="assets/svg/quote.svg" alt=""><p>Food should taste like where it came from. We buy from people we know, cook over real fire and keep the menu short enough to do every dish properly. If a guest leaves a little happier than they arrived, then we have done our job.</p></div><h4 class="ch-name">Kevin Luo</h4><span class="ch-role">Chef &amp; Founder</span><img class="sig" src="assets/svg/signature.svg" alt="Kevin Luo signature"></div></div></div></section>' +
      '<section class="sec testi"><div class="wrap">' + badge('b-r') + '<div class="center rv">' + eyebrow('Testimony') + '<h2 class="h2">Happy Customers</h2></div><div class="t-grid">' + REVIEWS.map(function (r, k) { return '<article class="t-card rv" style="--d:' + (k % 2) * 120 + 'ms"><div class="t-ph"><img src="' + r.img + '" alt="' + r.name + '" loading="lazy"><img class="t-q" src="assets/svg/quote.svg" alt=""></div><div class="t-tx"><p>' + r.text + '</p><h4>' + r.name + '</h4><span>' + r.role + '</span></div></article>'; }).join('') + '</div></div></section>' +
      '<section class="video" id="tour"><img src="assets/img/hall-wide.jpg" alt="The Gerícht dining room" data-par="40">' + badge('b-l') + '<button class="play" id="play" aria-label="Take a tour of the dining room"><i></i></button><span class="v-cap">Take a tour</span></section>' +
      '<section class="sec awards tex"><div class="wrap"><div class="aw-grid"><div class="aw-l rv-l">' + eyebrow('Awards &amp; Recognition').replace('div"', 'div left"') + '<h2 class="h2">Our Laurels</h2><div class="aw-list">' + AWARDS.map(function (a) { return '<div class="aw"><div class="wreath"><svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M30 55C14 52 5 39 7 24M30 55c16-3 25-16 23-31" opacity=".9"/>' + [0, 1, 2, 3, 4, 5].map(function (k) { return '<ellipse cx="' + (10 + k * 1.6) + '" cy="' + (44 - k * 5.4) + '" rx="2.2" ry="4.5" transform="rotate(' + (-25 + k * 12) + ' ' + (10 + k * 1.6) + ' ' + (44 - k * 5.4) + ')"/><ellipse cx="' + (50 - k * 1.6) + '" cy="' + (44 - k * 5.4) + '" rx="2.2" ry="4.5" transform="rotate(' + (25 - k * 12) + ' ' + (50 - k * 1.6) + ' ' + (44 - k * 5.4) + ')"/>'; }).join('') + '</svg><b data-count="' + a.n + '">0</b></div><div><h4>' + a.title + '</h4><p>' + a.text + '</p></div></div>'; }).join('') + '</div></div><div class="aw-img rv-r"><img src="assets/img/chicken.jpg" alt="Roast chicken with rosemary" loading="lazy"><img class="g-over" src="assets/svg/g.svg" alt=""></div></div></div></section>' +
      '<section class="sec blog-t"><div class="wrap">' + arcs('a3') + '<div class="center rv">' + eyebrow('Blogs') + '<h2 class="h2">Gerícht Updates</h2></div><div class="b-grid">' + POSTS.slice(0, 3).map(function (p, k) { return postCard(p, k); }).join('') + '</div><div class="center">' + btn('View More', 'href="blog.html"') + '</div></div></section>' +
      '<section class="sec gal tex" id="gallery"><div class="wrap-w gal-grid"><div class="gal-t rv-l">' + eyebrow('Instagram').replace('div"', 'div left"') + '<h2 class="h2">Photo Gallery</h2><p>Follow our kitchen and bar on Instagram. A few favourites from the pass, the grill and the cellar, shot by the team after service.</p>' + btn('View More', 'href="#" data-soc') + '</div><div class="gal-s rv-r"><div class="g-track" id="gTrack">' + GALLERY.map(function (g, k) { return '<button class="g-it" data-g="' + k + '"><img src="' + g.img + '" alt="' + g.cap + '" loading="lazy"><span class="g-ov"><img src="assets/svg/instagram.svg" alt=""></span></button>'; }).join('') + '</div><div class="g-nav"><button id="gPrev" aria-label="Previous">' + IC.chev + '</button><button id="gNext" aria-label="Next">' + IC.chev + '</button></div></div></div></section>' +
      newsletterSection();

    finishCommon();
    slider($('#hs').parentNode, HERO_SLIDES.length, 6500);

    // меню: вкладки
    var cur = 'bar', wrap = $('#spWrap');
    $('#mtNav').onclick = function (e) {
      var b = e.target.closest('[data-m]'); if (!b || b.getAttribute('data-m') === cur) return; cur = b.getAttribute('data-m');
      $$('#mtNav button').forEach(function (x) { x.classList.toggle('on', x === b); }); $$('#mtBgs img').forEach(function (x) { x.classList.toggle('on', x.getAttribute('data-bg') === cur); });
      wrap.classList.add('swap'); setTimeout(function () { wrap.innerHTML = menuLists(MENUS[cur]); wrap.classList.remove('swap'); wrap.classList.remove('expanded'); $('[data-more]').querySelector('span').textContent = 'View More'; }, 320);
    };
    $('[data-more]').onclick = function (e) { e.preventDefault(); var o = wrap.classList.toggle('expanded'); this.querySelector('span').textContent = o ? 'View Less' : 'View More'; };
    // тур по залу
    $('#play').onclick = function () { openLb([{ img: 'assets/img/hall-wide.jpg', cap: 'The main dining room' }, { img: 'assets/img/hall-tables.jpg', cap: 'Tables by the window' }, { img: 'assets/img/beer-taps.jpg', cap: 'The bar, open late' }], 0); };
    galleryBind();
  };

  function galleryBind() {
    var tr = $('#gTrack'); if (!tr) return;
    $$('.g-it', tr).forEach(function (b) { b.onclick = function () { if (tr.getAttribute('data-moved')) return; openLb(GALLERY, Number(b.getAttribute('data-g'))); }; });
    var step = function () { return 240; };
    $('#gNext').onclick = function () { tr.scrollBy({ left: step(), behavior: 'smooth' }); }; $('#gPrev').onclick = function () { tr.scrollBy({ left: -step(), behavior: 'smooth' }); };
    var down = false, sx = 0, sl = 0;
    tr.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; sx = e.clientX; sl = tr.scrollLeft; tr.removeAttribute('data-moved'); });
    window.addEventListener('pointermove', function (e) { if (!down) return; var dx = e.clientX - sx; if (Math.abs(dx) > 5) { tr.setAttribute('data-moved', '1'); tr.classList.add('drag'); } tr.scrollLeft = sl - dx; });
    window.addEventListener('pointerup', function () { down = false; tr.classList.remove('drag'); setTimeout(function () { tr.removeAttribute('data-moved'); }, 30); });
  }

  function postCard(p, k) {
    return '<article class="post rv" style="--d:' + k * 110 + 'ms"><a class="p-img" href="article.html?id=' + p.id + '"><img src="' + p.img + '" alt="' + esc(p.title) + '" loading="lazy"></a><div class="p-meta"><span>' + p.date + '</span><span>- ' + p.author + '</span></div><h3><a href="article.html?id=' + p.id + '">' + p.title + '</a></h3><p>' + p.excerpt + '</p><a class="rm" href="article.html?id=' + p.id + '">Read More</a></article>';
  }
  function finishCommon() {
    bookingForm($('#bookBox'));
    var nf = $('.news-f'); if (nf) newsletter(nf);
    rerender();
  }

  /* ======================= БАР ======================= */
  var barSlides = [
    { img: 'assets/img/hall-tables.jpg', title: 'On The Rocks' }, { img: 'assets/img/beer-taps.jpg', title: 'Pour Me Another' }, { img: 'assets/img/cocktail-gin.jpg', title: 'Shaken Not Stirred' }, { img: 'assets/img/wine.jpg', title: 'Cheers To That' }
  ];
  views.bar = function () {
    var now = new Date(), d = now.getDay(), hh = now.getHours() + now.getMinutes() / 60, wk = d >= 1 && d <= 5;
    var open = wk ? (hh >= 10 || hh < 2) : (hh >= 10 || hh < 3 || (d === 6 && hh >= 10)); // упрощённо: Пн-Пт 10:00-02:00, Сб-Вс 10:00-03:00
    var hap = wk && hh >= 16 && hh < 19;
    var poison = [['Beer', 'assets/img/beer.jpg'], ['Wine', 'assets/img/wine.jpg'], ['Cocktails', 'assets/img/cocktail-gin.jpg']];
    root.innerHTML =
      '<section class="hero bar-hero tex" id="top"><div class="bh-wrap"><div class="bh-slides" id="hs">' + barSlides.map(function (s) { return '<div class="bh-s" data-slide><div class="bh-img"><img src="' + s.img + '" alt=""></div><h1 class="bh-t">' + s.title.split(' ').map(function (w, k) { return '<span class="w" style="--k:' + k + '">' + w + '</span>'; }).join(' ') + '</h1></div>'; }).join('') + '</div>' + dotsHtml(4, true) + '<a class="scroll-b" href="#book"><i></i><span>SCROLL</span></a></div></section>' +
      badge('b-hero') + bookSection() +
      '<section class="sec bar-about tex"><div class="wrap">' + badge('b-l') + '<div class="ba-grid"><div class="ba-l rv-l"><img src="assets/img/beer-taps.jpg" alt="Beer taps pouring a pint" loading="lazy"></div><div class="ba-r rv-r"><img class="ba-top" src="assets/img/cocktail-pour.jpg" alt="Bartender pouring a drink over an ice cube" loading="lazy"><div class="ba-tx">' + eyebrow('About Us').replace('div"', 'div left"') + '<h2 class="h2">Food, Drinks,<br>Entertainment In One</h2><p>Twelve taps, a small cellar of hand-picked bottles and cocktails that change with the seasons. Our bartenders make their own syrups, juice citrus to order and carve the ice by hand. Stay late: the grill serves until the last order.</p><a class="btn" href="#" data-know="bar"><span>Know More</span></a></div></div></div></div></section>' +
      '<section class="sec poison"><div class="wrap">' + arcs('a2') + '<div class="center rv">' + eyebrow('Wide Range To Choose From') + '<h2 class="h2">What\'s Your Poison?</h2></div><div class="po-grid">' + poison.map(function (p, k) { return '<a class="po rv" style="--d:' + k * 110 + 'ms" href="#menu"><img src="' + p[1] + '" alt="' + p[0] + '" loading="lazy"><span>' + p[0] + '</span></a>'; }).join('') + '</div></div></section>' +
      '<section class="happy"><img src="assets/img/happy-hours.jpg" alt="" data-par="50"><div class="hp-in rv"><span class="hp-status ' + (hap ? 'on' : '') + '">' + (hap ? 'Happy hour is on right now' : wk ? 'Happy hour starts at 4:00 PM' : 'Happy hours return on Monday') + '</span><h2>Happy Hours</h2><p>Monday - Friday (4:00 Pm - 7:00 Pm)</p></div></section>' +
      '<section class="sec special" id="menu"><div class="wrap">' + arcs('a2') + badge('b-r') + '<div class="center rv">' + eyebrow('Menu That Fits You Palatte') + '<h2 class="h2">Today\'s Special</h2></div><div class="sp-wrap" id="spWrap">' + menuLists(MENUS.bar) + '</div><div class="center"><a class="btn" href="#" data-more><span>View More</span></a></div></div></section>' +
      '<section class="sec findus tex" id="contact"><div class="wrap">' + badge('b-l') + '<div class="fu-grid"><div class="fu-l rv-l">' + eyebrow('Contact').replace('div"', 'div left"') + '<h2 class="h2">Find Us</h2><p class="fu-a">Lane Ends Bungalow, Whatcroft Hall Lane, Rudheath, CW9 7SG</p><span class="fu-st ' + (open ? 'on' : '') + '">' + (open ? 'We are open now' : 'Closed right now') + '</span><h4>Opening Hours</h4><p>Mon - Fri: 10:00 am - 02:00 am</p><p>Sat - Sun: 10:00 am - 03:00 am</p><a class="btn" href="https://www.google.com/maps/search/?api=1&query=Whatcroft+Hall+Lane+Rudheath+CW9+7SG" target="_blank" rel="noopener"><span>Visit Us</span></a></div><div class="fu-img frame rv-r"><div class="fr-in"><img src="assets/img/mojito.jpg" alt="Mojito with mint and lime" loading="lazy"></div></div></div></div></section>' +
      newsletterSection();

    finishCommon();
    slider($('#hs').parentNode, 4, 6000);
    var wrap = $('#spWrap'); $('[data-more]').onclick = function (e) { e.preventDefault(); var o = wrap.classList.toggle('expanded'); this.querySelector('span').textContent = o ? 'View Less' : 'View More'; };
  };

  /* ======================= БЛОГ ======================= */
  views.blog = function () {
    var tags = ['All'].concat(POSTS.map(function (p) { return p.tag; }).filter(function (t, i, a) { return a.indexOf(t) === i; })), cur = qs.get('tag') || 'All';
    root.innerHTML = '<section class="page-hd tex"><div class="wrap center">' + eyebrow('Blogs') + '<h1 class="h2 big2">Gerícht Updates</h1><p class="ph-p">Stories from the kitchen, the bar and the cellar. Techniques, recipes and a little behind-the-scenes.</p></div></section>' +
      '<section class="sec"><div class="wrap"><div class="chips" id="chips">' + tags.map(function (t) { return '<button class="' + (t === cur ? 'on' : '') + '" data-t="' + t + '">' + t + '</button>'; }).join('') + '</div><div class="b-grid b-all" id="bGrid"></div></div></section>' + newsletterSection();
    function draw() { var l = POSTS.filter(function (p) { return cur === 'All' || p.tag === cur; }); $('#bGrid').innerHTML = l.map(postCard).join(''); rerender(); }
    $('#chips').onclick = function (e) { var b = e.target.closest('[data-t]'); if (!b) return; cur = b.getAttribute('data-t'); $$('#chips button').forEach(function (x) { x.classList.toggle('on', x === b); }); draw(); };
    draw(); var nf = $('.news-f'); if (nf) newsletter(nf); rerender();
  };

  views.article = function () {
    var id = Number(qs.get('id')) || 1, p = POSTS.filter(function (x) { return x.id === id; })[0] || POSTS[0], i = POSTS.indexOf(p), prev = POSTS[(i - 1 + POSTS.length) % POSTS.length], next = POSTS[(i + 1) % POSTS.length];
    document.title = p.title + ' - Gerícht';
    root.innerHTML = '<section class="art-hd tex"><div class="wrap"><a class="back" href="blog.html">' + IC.chev + ' All updates</a><span class="tag">' + p.tag + '</span><h1 class="h2 big2">' + p.title + '</h1><div class="p-meta"><span>' + p.date + '</span><span>- ' + p.author + '</span></div></div></section>' +
      '<section class="sec art"><div class="wrap narrow"><img class="art-img" src="' + p.img + '" alt="' + esc(p.title) + '"><div class="art-body">' + p.body.map(function (t, k) { return '<p' + (k === 0 ? ' class="first"' : '') + '>' + t + '</p>'; }).join('') + '</div><div class="art-foot"><button class="btn ghost" id="share"><span>Share this story</span></button><div class="pn"><a href="article.html?id=' + prev.id + '"><small>Previous</small>' + prev.title + '</a><a href="article.html?id=' + next.id + '"><small>Next</small>' + next.title + '</a></div></div></div></section>' +
      '<section class="sec blog-t"><div class="wrap"><div class="center rv">' + eyebrow('Keep Reading') + '<h2 class="h2">More From The Journal</h2></div><div class="b-grid">' + POSTS.filter(function (x) { return x.id !== p.id; }).slice(0, 3).map(postCard).join('') + '</div></div></section>' + newsletterSection();
    $('#share').onclick = function () { var u = location.href; if (navigator.share) navigator.share({ title: p.title, url: u }).catch(function () {}); else { try { navigator.clipboard.writeText(u); } catch (e) {} toast('Link copied to clipboard'); } };
    var nf = $('.news-f'); if (nf) newsletter(nf); rerender();
  };

  /* ======================= КОНТАКТЫ ======================= */
  views.contact = function () {
    root.innerHTML = '<section class="page-hd tex"><div class="wrap center">' + eyebrow('Contact') + '<h1 class="h2 big2">Contact Us</h1><p class="ph-p">Questions, private dining, press or simply a kind word. We read every message and reply within a day.</p></div></section>' +
      '<section class="sec"><div class="wrap"><div class="ct-grid"><div class="ct-info rv-l"><div class="ct-c"><h4>Address</h4><p>9 W 53rd St, New York, NY 10019, USA</p></div><div class="ct-c"><h4>Phone</h4><p><a href="tel:+12123441230">+1 212-344-1230</a><br><a href="tel:+12125551230">+1 212-555-1230</a></p></div><div class="ct-c"><h4>Working Hours</h4><p>' + HOURS.weekday + '</p><p>' + HOURS.weekend + '</p></div><div class="ct-c"><h4>Private dining</h4><p>events@gericht.example</p></div></div>' +
      '<form class="ct-form rv-r" id="cf" novalidate><h3>Send us a message</h3><div class="two"><label class="fld"><input name="name" placeholder="Your name"><span class="err"></span></label><label class="fld"><input name="email" type="email" placeholder="Email address"><span class="err"></span></label></div><label class="fld sel"><select name="topic"><option>General question</option><option>Private dining</option><option>Press</option><option>Feedback</option></select>' + IC.chev + '</label><label class="fld"><textarea name="msg" rows="5" placeholder="How can we help?"></textarea><span class="err"></span></label><button class="btn" type="submit"><span>Send Message</span></button></form></div>' +
      '<div class="map rv"><svg viewBox="0 0 1000 380" preserveAspectRatio="xMidYMid slice" aria-label="Map"><rect width="1000" height="380" fill="#14120e"/><g stroke="#2a261c" stroke-width="2" fill="none"><path d="M0 90H1000M0 190H1000M0 290H1000M120 0V380M300 0V380M520 0V380M720 0V380M900 0V380"/></g><g stroke="#3a3425" stroke-width="7" fill="none" stroke-linecap="round"><path d="M0 250L1000 120M420 0L560 380"/></g><path d="M0 330C200 310 360 340 560 300S900 260 1000 280V380H0Z" fill="#0f1a1f" opacity=".7"/></svg><div class="pin"><i></i><span>Gerícht<br><small>9 W 53rd St</small></span></div></div></div></section>';
    $('#cf').addEventListener('submit', function (e) {
      e.preventDefault(); var f = e.target.elements, bad = false;
      function chk(n, c, m) { var x = f[n], er = x.parentNode.querySelector('.err'); x.classList.remove('bad'); er.textContent = ''; if (c) { x.classList.add('bad'); er.textContent = m; void x.offsetWidth; bad = true; } }
      chk('name', f.name.value.trim().length < 2, 'Please tell us your name'); chk('email', !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value), 'Check your email address'); chk('msg', f.msg.value.trim().length < 10, 'Write at least a short sentence');
      if (bad) return; var who = f.name.value.trim().split(' ')[0], b = e.target.querySelector('.btn'); b.classList.add('load'); b.disabled = true;
      setTimeout(function () { e.target.innerHTML = '<div class="book-ok"><svg class="ok-ic" viewBox="0 0 80 80"><circle cx="40" cy="40" r="36"/><path d="M25 41l10 10 20-22"/></svg><h3>Message sent</h3><p>Thank you, ' + esc(who) + '. We will reply to your email within one working day.</p></div>'; }, 900);
    });
    rerender();
  };

  if (views[page]) views[page]();
})();
