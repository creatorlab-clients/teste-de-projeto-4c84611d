/* ═══════════════════════════════════════════════════════════════
   template-estetica-003 — Armonia Spa — script.js
   wellness-zen scroll · single-page · pt-BR
   ═══════════════════════════════════════════════════════════════ */

// ── Scroll animation — frame config ──────────────────────────
var FRAME_PATH   = 'https://8ispuxmgjxgu2r5q.public.blob.vercel-storage.com/templates/estetica-003/frames/';
var FRAME_PREFIX = 'frame_';
var FRAME_PAD    = 4;
var FRAME_EXT    = '.webp';
var FRAME_COUNT  = 151;  // wellness-zen — HARD

// ── Image fallback ────────────────────────────────────────────
window.__imgFallback = function (img, label) {
  var w = img.naturalWidth || 800;
  var h = img.naturalHeight || 600;
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">'
    + '<rect width="100%" height="100%" fill="#F3EDE3"/>'
    + '</svg>';
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  img.onerror = null;
};

// ── Phosphor Thin icons (stroke-width="8") ──────────────────
var PHOSPHOR_ICONS = {

  /* ─ Ritual icons ─ */
  'HandHeart': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32" aria-hidden="true"><path d="M80,224V152a48,48,0,0,1,96,0v16"/><path d="M176,168c0-8,8-16,16-24 8-8 16-20 16-32a32,32,0,0,0-48-28"/><path d="M80,152c0-8-8-16-16-24 -8-8-16-20-16-32a32,32,0,0,1,48-28"/><path d="M128,96 C128,80 116,68 100,72 C84,76 80,92 80,104 C80,116 96,124 128,144 C160,124 176,116 176,104 C176,92 172,76 156,72 C140,68 128,80 128,96 Z"/></svg>',

  'Drop': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32" aria-hidden="true"><path d="M128,28 C128,28 52,112 52,160 a76,76,0,0,0,152,0 C204,112,128,28,128,28 Z"/><path d="M100,180 a36,36,0,0,0,28,28"/></svg>',

  'Flame': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32" aria-hidden="true"><path d="M132,24 C112,64 104,96 116,124 C96,108 84,80 88,56 C56,80 48,120 60,152 C68,176 96,204 128,216 C160,204 188,176 196,152 C208,120 200,80 168,56 C172,80 164,108 144,124 C156,96 148,64 132,24 Z"/></svg>',

  'Wind': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32" aria-hidden="true"><path d="M24,96 H136 a32,32,0,1,0,0,-64"/><path d="M24,128 H176 a32,32,0,1,0,0,64"/><line x1="24" y1="160" x2="120" y2="160"/></svg>',

  'Leaf': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32" aria-hidden="true"><path d="M213.37,42.63 a8,8,0,0,0,-7.94,-0.44 C164.49,62.17 60.37,104.14 40,176 a56.07,56.07,0,0,0,55.43,70 C136,243.47 210,191 213.93,50.57 A8,8,0,0,0,213.37,42.63 Z"/><line x1="40" y1="216" x2="116" y2="140"/></svg>',

  'Flower': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" width="32" height="32" aria-hidden="true"><circle cx="128" cy="128" r="24"/><ellipse cx="128" cy="64" rx="20" ry="40"/><ellipse cx="128" cy="192" rx="20" ry="40"/><ellipse cx="64" cy="128" rx="40" ry="20"/><ellipse cx="192" cy="128" rx="40" ry="20"/><ellipse cx="82.1" cy="82.1" rx="20" ry="40" transform="rotate(45 82.1 82.1)"/><ellipse cx="173.9" cy="173.9" rx="20" ry="40" transform="rotate(45 173.9 173.9)"/><ellipse cx="173.9" cy="82.1" rx="20" ry="40" transform="rotate(-45 173.9 82.1)"/><ellipse cx="82.1" cy="173.9" rx="20" ry="40" transform="rotate(-45 82.1 173.9)"/></svg>',

  /* ─ UI / contact icons ─ */
  'Check': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true"><polyline points="40,128 104,192 216,64"/></svg>',

  'MapPin': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true"><circle cx="128" cy="104" r="40"/><path d="M128,224 C128,224 40,152 40,104 a88,88,0,0,1,176,0 C216,152,128,224,128,224 Z"/></svg>',

  'Clock': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true"><circle cx="128" cy="128" r="96"/><polyline points="128,72 128,128 168,168"/></svg>',

  'Phone': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true"><path d="M164,164 L184,184 a16,16,0,0,1,0,22.6 C152,240 16,104 49.4,72 a16,16,0,0,1,22.6,0 L92,92 a16,16,0,0,1,0,22.6 L80,126.4 C98,158 98,158 130,176 Z"/></svg>',

  'Envelope': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" aria-hidden="true"><rect x="32" y="64" width="192" height="144" rx="12"/><polyline points="32,80 128,160 224,80"/></svg>',

  'WhatsappLogo': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" aria-hidden="true"><path d="M128,32 C76,32 32,72 32,120 C32,142 40,163 54,179 L40,216 L79,203 C95,211 111,216 128,216 C180,216 224,176 224,128 C224,80 180,32 128,32 Z"/><path d="M104,88 C104,88 96,108 112,124 C128,140 148,132 148,132"/></svg>',

  'InstagramLogo': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" aria-hidden="true"><rect x="32" y="32" width="192" height="192" rx="48"/><circle cx="128" cy="128" r="48"/><circle cx="180" cy="76" r="8" fill="currentColor" stroke="none"/></svg>'
};

(function () {
  'use strict';

  // ── Inject Phosphor Thin icons ────────────────────────────
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    var name = el.getAttribute('data-icon');
    var svg  = PHOSPHOR_ICONS[name];
    if (svg) el.innerHTML = svg;
  });

  // ── Footer year ──────────────────────────────────────────
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Navbar scroll class ──────────────────────────────────
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Mobile nav toggle ────────────────────────────────────
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      document.body.classList.toggle('nav-mobile-open', !expanded);
    });
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-mobile-open');
      });
    });
  }

  // ── IntersectionObserver — fade-up, stagger-card ─────────
  if ('IntersectionObserver' in window) {
    var animObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up, .stagger-card').forEach(function (el) {
      animObserver.observe(el);
    });

    // ── Image Reveal observer ─────────────────────────────
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.img-reveal-wrap').forEach(function (el) {
      revealObserver.observe(el);
    });

  } else {
    // Fallback for older browsers
    document.querySelectorAll('.fade-up, .stagger-card, .img-reveal-wrap').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ── Scroll animation — canvas (cover mode) ───────────────
  var section = document.getElementById('scroll-anim');
  var canvas  = document.getElementById('scroll-canvas');
  if (!section || !canvas) return;

  var ctx    = canvas.getContext('2d');
  var images = [];
  var loaded = 0;
  var currentFrame = 0;
  var pinEl  = section.querySelector('.scroll-anim-pin');
  var DPR    = Math.min(window.devicePixelRatio || 1, 2);

  function setupCanvas() {
    var w = pinEl.clientWidth;
    var h = pinEl.clientHeight;
    canvas.width  = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  // Cover mode: Math.max(cw/iw, ch/ih) — never contain
  function renderFrame(img) {
    var cw = pinEl.clientWidth;
    var ch = pinEl.clientHeight;
    var iw = img.naturalWidth;
    var ih = img.naturalHeight;
    if (!iw || !ih) return;
    var scale = Math.max(cw / iw, ch / ih);
    var sw = iw * scale;
    var sh = ih * scale;
    var sx = (cw - sw) / 2;
    var sy = (ch - sh) / 2;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }

  function drawFrame(index) {
    var img = images[index];
    if (img && img.complete && img.naturalWidth) {
      renderFrame(img);
      currentFrame = index;
    }
  }

  function onScroll() {
    var rect     = section.getBoundingClientRect();
    var total    = section.offsetHeight - window.innerHeight;
    var scrolled = Math.max(0, -rect.top);
    var progress = Math.min(1, scrolled / total);
    var frameIdx = Math.round(progress * (FRAME_COUNT - 1));
    if (frameIdx !== currentFrame) drawFrame(frameIdx);
  }

  // Preload all frames
  for (var i = 0; i < FRAME_COUNT; i++) {
    (function (idx) {
      var img = new Image();
      img.onload = function () {
        loaded++;
        if (idx === 0 || loaded === 1) {
          setupCanvas();
          renderFrame(img);
          currentFrame = 0;
        }
      };
      img.src = FRAME_PATH + FRAME_PREFIX + String(idx + 1).padStart(FRAME_PAD, '0') + FRAME_EXT;
      images[idx] = img;
    })(i);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { setupCanvas(); drawFrame(currentFrame); }, { passive: true });
  setupCanvas();

})();
