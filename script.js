/* ===================================
   GKTW PORTFOLIO - script.js
   ✅ EDIT BAGIAN CONFIG DI BAWAH INI
   =================================== */

const CONFIG = {
  name: "GK_TW",
  bio: "Halo! Saya seorang animator Minecraft yang fokus pada konten cinematic, horror, dan action. Semua karya di sini dibuat murni dari kreativitas sendiri — tanpa request, tanpa batas.",
  commissionOpen: false,
  commissionClosedMessage: "Saat ini saya belum membuka komisi. Stay tuned untuk update!",
  commissionOpenMessage: "Komisi sedang dibuka! Hubungi saya lewat social media di bawah.",
  social: {
    youtube:   "",
    instagram: "",
    twitter:   "",
    tiktok:    "",
  },
  skills: [
    "Minecraft 3D Animation",
    "Cinematic Rendering",
    "Character Design",
    "Horror Atmosphere",
    "Scene Composition",
    "Motion & FX",
  ],
  works: [
    {
      title: "The Backrooms",
      tag: "Horror · Cinematic",
      image: "img/thumbnailbackrooms.png",
      year: "2024",
    },
    {
      title: "Group Shot",
      tag: "Character · Render",
      image: "img/gk_tw.png",
      year: "2024",
    },
    {
      title: "Village Scene",
      tag: "Cinematic · Story",
      image: "img/edited.png",
      year: "2024",
    },
  ],
};

/* =====================================================
   JANGAN EDIT DI BAWAH INI KALAU TIDAK TAU CODING!
   ===================================================== */

(function () {

  /* --- Brand name --- */
  document.querySelectorAll('.brand-name').forEach(el => el.textContent = CONFIG.name);

  /* --- Hero --- */
  document.getElementById('hero-title').innerHTML =
    `Halo,<br><span class="gradient-text">${CONFIG.name}</span>`;
  document.getElementById('hero-desc').textContent = CONFIG.bio;

  const heroImg = document.getElementById('hero-img');
  if (CONFIG.works[0]) {
    heroImg.src = CONFIG.works[0].image;
    heroImg.alt = CONFIG.works[0].title;
  }

  /* Commission badge on hero */
  const heroBadge = document.getElementById('hero-badge');
  const badgeText = document.getElementById('badge-text');
  if (CONFIG.commissionOpen) {
    heroBadge.classList.add('open');
    badgeText.textContent = 'Commission Open';
  }

  /* --- Build work panels --- */
  const workPanelsEl = document.getElementById('work-panels');
  workPanelsEl.innerHTML = CONFIG.works.map((w, i) => `
    <section class="panel panel-work" data-work="${i}">
      <div class="work-img-wrap">
        <img src="${w.image}" alt="${w.title}" loading="lazy">
      </div>
      <div class="work-card-inner">
        <p class="work-num">${String(i + 1).padStart(2, '0')} / ${String(CONFIG.works.length).padStart(2, '0')}</p>
        <p class="work-tag">${w.tag}</p>
        <h3 class="work-title">${w.title}</h3>
        <div class="work-divider"></div>
        <p class="work-year">${w.year}</p>
        <button class="btn-view-more" data-work-idx="${i}">View More ↗</button>
      </div>
    </section>
  `).join('');

  /* --- Gallery Overlay --- */
  const overlay = document.createElement('div');
  overlay.id = 'gallery-overlay';
  overlay.innerHTML = `
    <button class="gallery-back" id="gallery-back">← Back</button>
    <div class="gallery-scroll-wrap" id="gallery-scroll-wrap">
      <div class="gallery-track" id="gallery-track"></div>
    </div>
    <div class="gallery-scroll-hint">
      <span>SCROLL</span>
      <div class="gallery-hint-line"></div>
      <span>→</span>
    </div>
  `;
  document.body.appendChild(overlay);

  function openGallery(workIdx) {
    const track = document.getElementById('gallery-track');
    track.innerHTML = CONFIG.works.map((w, i) => `
      <div class="gitem ${i === workIdx ? 'gitem-active' : ''}">
        <img src="${w.image}" alt="${w.title}">
        <div class="gitem-info">
          <p class="gitem-tag">${w.tag}</p>
          <h3 class="gitem-title">${w.title}</h3>
          <p class="gitem-year">${w.year}</p>
        </div>
      </div>
    `).join('');

    // scroll to the clicked work
    overlay.classList.add('open');
    document.body.classList.add('gallery-open');
    requestAnimationFrame(() => {
      const activeEl = track.querySelector('.gitem-active');
      if (activeEl) {
        document.getElementById('gallery-scroll-wrap').scrollLeft = activeEl.offsetLeft - 60;
      }
    });
  }

  function closeGallery() {
    overlay.classList.remove('open');
    document.body.classList.remove('gallery-open');
  }

  document.addEventListener('click', e => {
    if (e.target.closest('.btn-view-more')) {
      const idx = parseInt(e.target.closest('.btn-view-more').dataset.workIdx);
      openGallery(idx);
    }
  });
  document.getElementById('gallery-back').addEventListener('click', closeGallery);

  /* --- About bio --- */
  document.getElementById('about-bio').textContent = CONFIG.bio;

  /* --- Skills --- */
  document.getElementById('skills-wrap').innerHTML = CONFIG.skills.map(s =>
    `<span class="skill-tag">${s}</span>`
  ).join('');

  /* --- About image stack --- */
  const stack = document.getElementById('about-img-stack');
  const imgs = CONFIG.works.slice(0, 3);
  stack.innerHTML = imgs.map(w =>
    `<div class="simg"><img src="${w.image}" alt="${w.title}" loading="lazy"></div>`
  ).join('');

  /* --- Commission --- */
  const commBadge = document.getElementById('comm-badge');
  const commStatusText = document.getElementById('comm-status-text');
  const commMsg = document.getElementById('comm-message');
  if (CONFIG.commissionOpen) {
    commBadge.classList.add('open');
    commStatusText.textContent = 'Komisi Dibuka';
    commMsg.textContent = CONFIG.commissionOpenMessage;
  } else {
    commStatusText.textContent = 'Komisi Ditutup';
    commMsg.textContent = CONFIG.commissionClosedMessage;
  }

  /* --- Social --- */
  const ICONS = {
    youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg>`,
  };
  const socialLinks = Object.entries(CONFIG.social).filter(([, url]) => url);
  const socialRow = document.getElementById('social-row');
  if (socialLinks.length > 0) {
    socialRow.innerHTML = socialLinks.map(([name, url]) => `
      <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link">
        ${ICONS[name] || ''}${name}
      </a>
    `).join('');
  } else {
    socialRow.innerHTML = `<p class="no-social">Tambah social media di script.js → CONFIG.social</p>`;
  }

  /* --- Footer year --- */
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  /* ===========================================
     HORIZONTAL SCROLL ENGINE
     =========================================== */
  const hscroll = document.getElementById('hscroll');
  const panels = Array.from(hscroll.querySelectorAll('.panel'));
  const totalPanels = panels.length;
  let currentPanel = 0;
  let isScrolling = false;

  /* Build panel dot indicators */
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'panel-dots';
  panels.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'pdot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goToPanel(i));
    dotsContainer.appendChild(d);
  });
  document.body.appendChild(dotsContainer);

  function updateDots() {
    dotsContainer.querySelectorAll('.pdot').forEach((d, i) => {
      d.classList.toggle('active', i === currentPanel);
    });
  }

  function goToPanel(idx) {
    if (idx < 0 || idx >= totalPanels) return;
    currentPanel = idx;
    const offset = idx * window.innerWidth;
    hscroll.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  /* Wheel scroll */
  let wheelDelta = 0;
  let wheelTimer = null;
  window.addEventListener('wheel', e => {
    e.preventDefault();
    if (isScrolling) return;
    wheelDelta += e.deltaY + e.deltaX;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      if (Math.abs(wheelDelta) > 30) {
        if (wheelDelta > 0) goToPanel(currentPanel + 1);
        else goToPanel(currentPanel - 1);
      }
      wheelDelta = 0;
    }, 60);
  }, { passive: false });

  /* Keyboard */
  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToPanel(currentPanel + 1);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goToPanel(currentPanel - 1);
  });

  /* Touch swipe */
  let touchStartX = 0, touchStartY = 0;
  window.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', e => {
    const dx = touchStartX - e.changedTouches[0].clientX;
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) goToPanel(currentPanel + 1);
      else goToPanel(currentPanel - 1);
    }
  }, { passive: true });

  /* Nav + button panel jumps */
  document.querySelectorAll('[data-panel]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const idx = parseInt(el.dataset.panel);
      goToPanel(idx);
    });
  });
  document.querySelectorAll('[data-scroll-to]').forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.scrollTo);
      goToPanel(idx);
    });
  });

  /* Resize */
  window.addEventListener('resize', () => goToPanel(currentPanel));

  /* ===========================================
     CUSTOM CURSOR
     =========================================== */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  if (cursorDot && cursorRing) {
    let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
    document.addEventListener('mousemove', e => {
      dotX = e.clientX; dotY = e.clientY;
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';
    }, { passive: true });
    (function animRing() {
      ringX += (dotX - ringX) * 0.13;
      ringY += (dotY - ringY) * 0.13;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll('a, button, .skill-tag, .social-link, .work-card-inner').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
    });
  }

  /* ===========================================
     HERO PARALLAX (mouse)
     =========================================== */
  const heroWrap = document.getElementById('hero-img-wrap');
  document.addEventListener('mousemove', e => {
    if (currentPanel !== 0 || !heroWrap) return;
    const dx = (e.clientX / window.innerWidth - 0.5) * 16;
    const dy = (e.clientY / window.innerHeight - 0.5) * 10;
    heroWrap.style.transform = `rotateY(${dx * 0.35}deg) rotateX(${-dy * 0.3}deg) translateY(var(--fy, 0px))`;
  }, { passive: true });

  /* ===========================================
     WORK PANEL TILT
     =========================================== */
  document.querySelectorAll('.panel-work').forEach(panel => {
    panel.addEventListener('mousemove', e => {
      const rect = panel.getBoundingClientRect();
      const img = panel.querySelector('.work-img-wrap img');
      const dx = (e.clientX - rect.left) / rect.width;
      const dy = (e.clientY - rect.top) / rect.height;
      if (img) {
        img.style.transform = `scale(1.05) translate(${(dx - 0.5) * -10}px, ${(dy - 0.5) * -8}px)`;
      }
    });
    panel.addEventListener('mouseleave', () => {
      const img = panel.querySelector('.work-img-wrap img');
      if (img) img.style.transform = '';
    });
  });

  /* ===========================================
     MAGNETIC BUTTONS
     =========================================== */
  document.querySelectorAll('.btn-main, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${dx * 0.2}px, ${dy * 0.28}px)`;
    });
    btn.addEventListener('mouseleave', () => btn.style.transform = '');
  });

  /* ===========================================
     GALLERY DRAG-TO-SCROLL
     =========================================== */
  const galWrap = document.getElementById('gallery-scroll-wrap');
  let isDragging = false, dragStartX = 0, scrollStart = 0;
  galWrap.addEventListener('mousedown', e => {
    isDragging = true;
    dragStartX = e.pageX;
    scrollStart = galWrap.scrollLeft;
    galWrap.style.cursor = 'grabbing';
  });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    galWrap.scrollLeft = scrollStart - (e.pageX - dragStartX);
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
    galWrap.style.cursor = 'grab';
  });

  /* Prevent horizontal panel scroll while gallery open */
  window.addEventListener('wheel', e => {
    const overlayEl = document.getElementById('gallery-overlay');
    if (overlayEl && overlayEl.classList.contains('open')) {
      galWrap.scrollLeft += e.deltaY + e.deltaX;
    }
  }, { passive: true });

  /* ESC to close gallery */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const overlayEl = document.getElementById('gallery-overlay');
      if (overlayEl && overlayEl.classList.contains('open')) closeGallery();
    }
  });

})();
