/* Chandra's portfolio — motion engine. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- preloader (home only) ---------- */
  var preloader = document.getElementById('preloader');
  if (preloader) {
    var countEl = preloader.querySelector('.pl-count');
    var n = 0;
    var tick = setInterval(function () {
      n += Math.floor(Math.random() * 12) + 5;
      if (n >= 100) { n = 100; clearInterval(tick); }
      if (countEl) countEl.textContent = n;
      if (n === 100) {
        setTimeout(function () {
          preloader.classList.add('done');
          document.body.classList.add('page-enter');
          startHero();
          setTimeout(function () { preloader.style.display = 'none'; }, 800);
        }, 220);
      }
    }, 70);
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
    if (hero) setTimeout(function () { hero.classList.add('is-live'); }, 250);
  }

  /* ---------- page transitions on internal links ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || a.target === '_blank' || a.hostname !== window.location.hostname && a.hostname !== '') return;
    if (!/\.html$/.test(href.split('?')[0].split('#')[0])) return;
    e.preventDefault();
    document.body.classList.remove('page-enter');
    document.body.classList.add('page-exit');
    setTimeout(function () { window.location.href = href; }, 430);
  });

  /* ---------- header scroll state ---------- */
  var header = document.querySelector('.site-header');
  function onScrollHeader() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

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

  /* ---------- split hero title into words ---------- */
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

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal, .skill-chip');
  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function runCounter(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = (el.dataset.count.split('.')[1] || '').length;
    var t0 = null;
    var dur = 1600;
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

  /* ---------- scroll parallax for blobs ---------- */
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !prefersReduced) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        parallaxEls.forEach(function (el) {
          var s = parseFloat(el.dataset.parallax) || 0.15;
          el.style.transform = 'translateY(' + (y * s) + 'px)';
        });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- mouse parallax in hero ---------- */
  var hero = document.querySelector('.hero');
  var blobs = hero ? hero.querySelectorAll('.hero-blob') : [];
  if (hero && blobs.length && isFinePointer && !prefersReduced) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.width / 2) / r.width;
      var y = (e.clientY - r.height / 2) / r.height;
      blobs.forEach(function (b, i) {
        var f = (i === 0 ? 28 : -34);
        b.style.marginLeft = (x * f) + 'px';
        b.style.marginTop = (y * f) + 'px';
      });
    });
  }

  /* ---------- cursor glow on project cards (radial follow) ---------- */
  document.querySelectorAll('.project-card, .contact-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- magnetic buttons ---------- */
  if (isFinePointer && !prefersReduced) {
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + x * 0.25 + 'px,' + y * 0.35 + 'px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = 'translate(0,0)';
      });
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
      rx += (cx - rx) * 0.16;
      ry += (cy - ry) * 0.16;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, [data-magnetic]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
    });
  }

  /* ---------- footer year ---------- */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
