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
      desc: "Eksplorasi atmosfer horror dengan pencahayaan cinematic yang mencekam.",
    },
    {
      title: "Group Shot",
      tag: "Character · Render",
      image: "img/gk_tw.png",
      year: "2024",
      desc: "Render karakter dengan komposisi grup yang dinamis dan detail tinggi.",
    },
    {
      title: "Village Scene",
      tag: "Cinematic · Story",
      image: "img/edited.png",
      year: "2024",
      desc: "Adegan desa dengan suasana storytelling yang kuat dan sinematik.",
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
        <img src="${w.image}" alt="${w.title}" loading="lazy" class="work-bg-img">
        <div class="work-img-overlay"></div>
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

  /* =============================================
     WORKS GALLERY — Full-screen slideshow
     Scroll/drag horizontal ganti background full panel
     Tanpa card/thumbnail, image gede jelas
     ============================================= */

  let viewerOpen = false;
  let activePanel = null;

  // Inject gallery HTML (satu per panel, full-screen slideshow)
  document.querySelectorAll('.panel-work').forEach((panel, panelIdx) => {
    const gallery = document.createElement('div');
    gallery.className = 'panel-gallery';
    gallery.innerHTML = `
      <div class="pg-header">
        <button class="pg-back">← Kembali</button>
        <span class="pg-label">Karya Saya</span>
        <span class="pg-hint">← DRAG / SCROLL →</span>
      </div>
      <div class="pg-slides">
        ${CONFIG.works.map((w, i) => `
          <div class="pg-slide" data-idx="${i}">
            <img src="${w.image}" alt="${w.title}" loading="lazy">
          </div>
        `).join('')}
      </div>
      <div class="pg-info-bar">
        <div class="pg-info-inner">
          <span class="pg-info-tag"></span>
          <h3 class="pg-info-title"></h3>
          <p class="pg-info-desc"></p>
        </div>
        <span class="pg-counter"></span>
      </div>
      <div class="pg-dots">
        ${CONFIG.works.map((_, i) => `<span class="pg-dot" data-dot="${i}"></span>`).join('')}
      </div>
    `;
    panel.appendChild(gallery);

    const slides = gallery.querySelectorAll('.pg-slide');
    const dots = gallery.querySelectorAll('.pg-dot');
    const infoTag = gallery.querySelector('.pg-info-tag');
    const infoTitle = gallery.querySelector('.pg-info-title');
    const infoDesc = gallery.querySelector('.pg-info-desc');
    const counter = gallery.querySelector('.pg-counter');
    let currentSlide = 0;
    let isTransitioning = false;

    function goToSlide(idx, dir = 1) {
      if (isTransitioning || idx === currentSlide) return;
      isTransitioning = true;

      const prev = slides[currentSlide];
      const next = slides[idx];

      // Slide out prev
      prev.classList.add(dir > 0 ? 'slide-out-left' : 'slide-out-right');

      // Prep next
      next.style.zIndex = 2;
      next.classList.add(dir > 0 ? 'slide-in-right' : 'slide-in-left');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          next.classList.add('slide-active');
          next.classList.remove(dir > 0 ? 'slide-in-right' : 'slide-in-left');
        });
      });

      setTimeout(() => {
        prev.classList.remove('active', 'slide-out-left', 'slide-out-right');
        prev.style.zIndex = '';
        next.style.zIndex = '';
        next.classList.add('active');
        next.classList.remove('slide-active', 'slide-in-right', 'slide-in-left');
        currentSlide = idx;
        updateInfo();
        isTransitioning = false;
      }, 520);

      // Update dots immediately
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    }

    function updateInfo() {
      const w = CONFIG.works[currentSlide];
      infoTag.textContent = w.tag;
      infoTitle.textContent = w.title;
      infoDesc.textContent = w.desc || '';
      counter.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(CONFIG.works.length).padStart(2, '0')}`;
    }

    // Dots click
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i, i > currentSlide ? 1 : -1));
    });

    // Back button
    gallery.querySelector('.pg-back').addEventListener('click', () => {
      closeGallery(panel, gallery);
    });

    // Drag / swipe handling
    let dragStartX = 0, dragging = false, dragMoved = 0;
    gallery.addEventListener('mousedown', e => {
      dragging = true; dragStartX = e.clientX; dragMoved = 0;
      gallery.style.cursor = 'grabbing';
    });
    gallery.addEventListener('mousemove', e => {
      if (!dragging) return;
      dragMoved = e.clientX - dragStartX;
    });
    gallery.addEventListener('mouseup', () => {
      if (dragging) {
        gallery.style.cursor = '';
        if (Math.abs(dragMoved) > 60) {
          if (dragMoved < 0 && currentSlide < CONFIG.works.length - 1) goToSlide(currentSlide + 1, 1);
          else if (dragMoved > 0 && currentSlide > 0) goToSlide(currentSlide - 1, -1);
        }
        dragging = false;
      }
    });
    gallery.addEventListener('mouseleave', () => { dragging = false; gallery.style.cursor = ''; });

    // Wheel scroll
    gallery.addEventListener('wheel', e => {
      e.stopPropagation();
      e.preventDefault();
      if (e.deltaY > 40 || e.deltaX > 40) {
        if (currentSlide < CONFIG.works.length - 1) goToSlide(currentSlide + 1, 1);
      } else if (e.deltaY < -40 || e.deltaX < -40) {
        if (currentSlide > 0) goToSlide(currentSlide - 1, -1);
      }
    }, { passive: false });

    // Touch swipe
    let touchX = 0;
    gallery.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    gallery.addEventListener('touchend', e => {
      const dx = touchX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 50) {
        if (dx > 0 && currentSlide < CONFIG.works.length - 1) goToSlide(currentSlide + 1, 1);
        else if (dx < 0 && currentSlide > 0) goToSlide(currentSlide - 1, -1);
      }
    }, { passive: true });

    // Store goToSlide on gallery element for openGallery
    gallery._goToSlide = goToSlide;
    gallery._updateInfo = updateInfo;
    gallery._currentSlide = () => currentSlide;
    gallery._setSlide = (idx) => { currentSlide = idx; };
  });

  function openGallery(panel, gallery, targetIdx) {
    viewerOpen = true;
    activePanel = panel;

    const overlay = panel.querySelector('.work-img-overlay');
    const cardInner = panel.querySelector('.work-card-inner');

    if (overlay) overlay.classList.add('fade-out');
    if (cardInner) cardInner.classList.add('hidden-for-gallery');

    // Set starting slide instantly (no animation)
    const slides = gallery.querySelectorAll('.pg-slide');
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === targetIdx);
    });
    gallery._setSlide(targetIdx);
    gallery._updateInfo();

    const dots = gallery.querySelectorAll('.pg-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === targetIdx));

    gallery.classList.add('open');
    document.body.classList.add('viewer-open');
  }

  function closeGallery(panel, gallery) {
    viewerOpen = false;
    activePanel = null;

    const overlay = panel.querySelector('.work-img-overlay');
    const cardInner = panel.querySelector('.work-card-inner');

    if (overlay) overlay.classList.remove('fade-out');
    if (cardInner) cardInner.classList.remove('hidden-for-gallery');

    gallery.classList.remove('open');
    document.body.classList.remove('viewer-open');
  }

  // Open on View More click
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-view-more');
    if (btn) {
      const idx = parseInt(btn.dataset.workIdx);
      const panel = btn.closest('.panel-work');
      const gallery = panel.querySelector('.panel-gallery');
      openGallery(panel, gallery, idx);
    }
  });

  // ESC to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && viewerOpen && activePanel) {
      const gallery = activePanel.querySelector('.panel-gallery');
      closeGallery(activePanel, gallery);
    }
  });

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

  /* Wheel scroll — blocked when viewer open */
  let wheelDelta = 0;
  let wheelTimer = null;
  window.addEventListener('wheel', e => {
    if (viewerOpen) return;
    e.preventDefault();
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
    if (viewerOpen) return;
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
    if (viewerOpen) return;
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
    document.querySelectorAll('a, button, .skill-tag, .social-link, .work-card-inner, .wv-item').forEach(el => {
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
    heroWrap.style.transform = `rotateY(${dx * 0.35}deg) rotateX(${-dy * 0.3}deg)`;
  }, { passive: true });

  /* ===========================================
     WORK PANEL — konsisten: tilt + parallax + shine
     semua panel dapat interaksi yang sama persis
     =========================================== */
  document.querySelectorAll('.panel-work').forEach(panel => {
    const img = panel.querySelector('.work-bg-img');
    const overlay = panel.querySelector('.work-img-overlay');

    panel.addEventListener('mousemove', e => {
      const rect = panel.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width;
      const dy = (e.clientY - rect.top) / rect.height;

      // Parallax translate + slight scale
      if (img) {
        img.style.transform = `scale(1.12) translate(${(dx - 0.5) * -20}px, ${(dy - 0.5) * -14}px)`;
        img.style.opacity = '0.32';
      }

      // Dynamic gradient overlay shimmer
      if (overlay) {
        overlay.style.background = `radial-gradient(circle at ${dx * 100}% ${dy * 100}%, rgba(52,211,153,0.06) 0%, rgba(8,9,13,0.55) 60%)`;
      }
    });

    panel.addEventListener('mouseleave', () => {
      if (img) {
        img.style.transform = '';
        img.style.opacity = '';
      }
      if (overlay) overlay.style.background = '';
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

})();


