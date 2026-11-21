/* SN WEB DEVELOPER - script.js (plain JavaScript) */
(function () {
  'use strict';
  var root = document.documentElement, $ = function (s) { return document.querySelector(s); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');
  var EMAIL = 'soyel4009@gmail.com'; /* EDIT: your email */

  /* 1. Intro (about 4s, click to skip, never blocks the site) */
  var intro = $('#intro'), started = false;
  function reveals() { if (started) return; started = true; startReveals(); }
  function closeIntro() { intro.classList.add('done'); setTimeout(function () { intro.remove(); }, 1100); reveals(); }
  if (reduce) { intro.remove(); reveals(); } else { setTimeout(closeIntro, 4100); intro.addEventListener('click', closeIntro); }

  /* 2. Split headings into words */
  document.querySelectorAll('h2').forEach(function (el) {
    el.classList.add('split'); var t = el.textContent.trim(); el.setAttribute('aria-label', t);
    el.innerHTML = t.split(/\s+/).map(function (w, i) { return '<span class="w" aria-hidden="true"><span style="--i:' + i + '">' + w + '</span></span> '; }).join('');
  });
  document.querySelectorAll('.svcs li,.grid .proj,.timeline li').forEach(function (el, i) { el.style.setProperty('--d', (i % 3) * .12 + 's'); });

  /* 3. Reveal on scroll */
  function startReveals() {
    var items = document.querySelectorAll('.rv,.split');
    if (!('IntersectionObserver' in window)) { items.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }); }, { threshold: .15 });
    items.forEach(function (e) { io.observe(e); });
  }

  /* 4. Mobile menu */
  var burger = $('#burger'), menu = $('#menu');
  function setMenu(o) { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  /* 5. Hero burst: spikes radiate from the centre as you scroll (p goes 0 to 1) */
  var track = $('#home'), cv = $('#burst'), ctx = cv.getContext('2d'), W, H, p = 0, visible = true, spikes = [];
  var cols = ['155,92,255', '240,138,203', '201,184,255'];
  for (var i = 0; i < 320; i++) spikes.push({ a: Math.random() * 6.283, l: .35 + Math.random() * .65, w: .6 + Math.random() * 1.6, c: cols[i % 3], ph: Math.random() * 6 });
  function size() { W = cv.width = cv.clientWidth; H = cv.height = cv.clientHeight; }
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    var cx = W / 2, cy = H / 2, m = Math.min(W, H), e = 1 - Math.pow(1 - p, 2);
    var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, m * (.25 + e * .35));
    g.addColorStop(0, 'rgba(155,92,255,' + (.28 + e * .3) + ')'); g.addColorStop(1, 'rgba(5,5,5,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.lineCap = 'round';
    spikes.forEach(function (s) {
      var wob = Math.sin(t * .0009 + s.ph) * .06;
      var r0 = m * (.06 + e * .08), len = m * (.04 + e * .5) * s.l * (1 + wob);
      ctx.strokeStyle = 'rgba(' + s.c + ',' + (.25 + e * .55) + ')'; ctx.lineWidth = s.w;
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(s.a) * r0, cy + Math.sin(s.a) * r0);
      ctx.lineTo(cx + Math.cos(s.a) * (r0 + len), cy + Math.sin(s.a) * (r0 + len)); ctx.stroke();
    });
  }
  function loop(t) { if (visible) draw(t); if (!reduce) requestAnimationFrame(loop); }
  size(); addEventListener('resize', size);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(track);
  if (reduce) { p = .25; draw(0); } else requestAnimationFrame(loop);

  /* 6. Scroll updates: hero progress and process line */
  var tl = $('#timeline'), tick = false;
  function onScroll() {
    if (!reduce) { var r = track.getBoundingClientRect(); p = Math.max(0, Math.min(1, -r.top / (r.height - innerHeight))); track.style.setProperty('--p', p.toFixed(3)); }
    var b = tl.getBoundingClientRect(); tl.style.setProperty('--pl', Math.max(0, Math.min(1, (innerHeight * .7 - b.top) / b.height)).toFixed(3));
    tick = false;
  }
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* 7. Service buttons preselect the project type */
  document.querySelectorAll('.svcs a').forEach(function (a) {
    a.addEventListener('click', function () { var s = $('#type'); for (var i = 0; i < s.options.length; i++) if (s.options[i].text === a.dataset.type) s.selectedIndex = i; });
  });

  /* 8. Contact form: opens the visitor's email app (mailto) */
  $('#form').addEventListener('submit', function (e) {
    e.preventDefault(); var f = e.target, err = $('#err');
    if (!f.name.value.trim() || !/^\S+@\S+\.\S+$/.test(f.email.value) || !f.msg.value.trim()) { err.textContent = 'Please add your name, a valid email and a short project description.'; return; }
    err.textContent = '';
    var body = 'Name: ' + f.name.value + '\nEmail: ' + f.email.value + '\nProject type: ' + f.type.value + '\nBudget: ' + (f.budget.value || 'Not specified') + '\n\n' + f.msg.value;
    location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Website enquiry: ' + f.type.value) + '&body=' + encodeURIComponent(body);
  });
  $('#year').textContent = new Date().getFullYear();
})();
