/* portfolio v3 — Jitter-edition motion engine. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- theme toggle (restored before paint by inline snippet in <head>) ---------- */
  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('cs-theme', next); } catch (e) {}
    });
  }

  /* ---------- preloader: circular progress ring (Jitter "Circular Loader") ---------- */
  var preloader = document.getElementById('preloader');
  if (preloader) {
    var bar = preloader.querySelector('.bar');
    var numEl = preloader.querySelector('.pl-num');
    var CIRC = 2 * Math.PI * 52; // r=52
    var n = 0;
    var tick = setInterval(function () {
      n += Math.floor(Math.random() * 11) + 6;
      if (n >= 100) { n = 100; clearInterval(tick); }
      if (numEl) numEl.textContent = n;
      if (bar) bar.style.strokeDashoffset = CIRC * (1 - n / 100);
      if (n === 100) {
        setTimeout(function () {
          preloader.classList.add('done');
          setTimeout(function () { preloader.style.display = 'none'; }, 750);
          startHero();
        }, 260);
      }
    }, 65);
  } else {
    startHero();
  }

  function startHero() {
    var hero = document.querySelector('.hero');
    var title = document.querySelector('.hero-title');
    if (title && !title.classList.contains('is-in')) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { title.classList.add('is-in'); });
      });
    }
    if (hero) setTimeout(function () { hero.classList.add('is-live'); }, 200);
  }

  /* ---------- split hero title into springy words (Zero Gravity vibe) ---------- */
  document.querySelectorAll('.hero-title').forEach(function (t) {
    if (t.dataset.split === 'done') return;
    var lines = t.querySelectorAll('.line');
    var i = 0;
    lines.forEach(function (line) {
      var words = line.textContent.trim().split(/\s+/);
      line.innerHTML = words.map(function (w) {
        var d = (i++ * 0.07 + 0.1).toFixed(2);
        return '<span class="word" style="transition-delay:' + d + 's">' + w + '</span>';
      }).join(' ');
    });
    t.dataset.split = 'done';
  });

  /* ---------- page transitions ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || a.target === '_blank') return;
    var clean = href.split('?')[0].split('#')[0];
    if (/\.html$/.test(clean)) {
      e.preventDefault();
      document.body.classList.remove('page-enter');
      document.body.classList.add('page-exit');
      setTimeout(function () { window.location.href = href; }, 400);
    }
  });

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal, .skill-chip, .photo-mask');
  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- draw-on icons (Jitter "Animated Icon" templates) ---------- */
  var drawEls = document.querySelectorAll('.icon-draw');
  if ('IntersectionObserver' in window && !prefersReduced) {
    var dio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.querySelectorAll('path, circle, rect, line').forEach(function (s, idx) {
            s.style.transitionDelay = (idx * 0.12) + 's';
          });
          en.target.classList.add('in');
          dio.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    drawEls.forEach(function (el) { dio.observe(el); });
  } else {
    drawEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function runCounter(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = (el.dataset.count.split('.')[1] || '').length;
    var t0 = null, dur = 1500;
    function frame(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if ('IntersectionObserver' in window && !prefersReduced) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.dataset.count; });
  }

  /* ---------- scroll parallax for orbs ---------- */
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !prefersReduced) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        parallaxEls.forEach(function (el) {
          var s = parseFloat(el.dataset.parallax) || 0.14;
          el.style.transform = 'translateY(' + (y * s) + 'px)';
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- mouse parallax in hero ---------- */
  var hero = document.querySelector('.hero');
  var orbs = hero ? hero.querySelectorAll('.hero-orb') : [];
  if (hero && orbs.length && isFinePointer && !prefersReduced) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.width / 2) / r.width;
      var y = (e.clientY - r.height / 2) / r.height;
      orbs.forEach(function (o, i) {
        var f = (i === 0 ? 30 : i === 1 ? -26 : 20);
        o.style.marginLeft = (x * f) + 'px';
        o.style.marginTop = (y * f) + 'px';
      });
    });
  }

  /* ---------- cursor glow follow on cards ---------- */
  document.querySelectorAll('.project-card, .contact-card, .stat').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- ripple on buttons (Jitter "Ripple Effect") ---------- */
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var r = btn.getBoundingClientRect();
      var d = Math.max(r.width, r.height);
      var rip = document.createElement('span');
      rip.className = 'ripple';
      rip.style.width = rip.style.height = d + 'px';
      rip.style.left = (e.clientX - r.left - d / 2) + 'px';
      rip.style.top = (e.clientY - r.top - d / 2) + 'px';
      btn.appendChild(rip);
      setTimeout(function () { rip.remove(); }, 650);
    });
  });

  /* ---------- magnetic buttons ---------- */
  if (isFinePointer && !prefersReduced) {
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + x * 0.22 + 'px,' + y * 0.32 + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = 'translate(0,0)'; });
    });
  }

  /* ---------- custom cursor ---------- */
  if (isFinePointer && !prefersReduced) {
    var dot = document.createElement('div');
    var ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    var cx = -100, cy = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', function (e) {
      cx = e.clientX; cy = e.clientY;
      dot.style.left = cx + 'px'; dot.style.top = cy + 'px';
    });
    (function loop() {
      rx += (cx - rx) * 0.15; ry += (cy - ry) * 0.15;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, .theme-toggle').forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
    });
  }

  /* ---------- mobile menu ---------- */
  var burger = document.querySelector('.nav-burger');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- footer year ---------- */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
