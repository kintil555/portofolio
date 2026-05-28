/* ===================================
   GKTW PORTFOLIO - script.js
   
   ✅ EDIT BAGIAN CONFIG DI BAWAH INI
   Kamu tidak perlu sentuh bagian lain
   =================================== */

/* ---- ✏️ CONFIG — EDIT DI SINI ---- */
const CONFIG = {

  /* Nama kamu */
  name: "GK_TW",

  /* Deskripsi / bio singkat */
  bio: "Halo! Saya seorang animator Minecraft yang fokus pada konten cinematic, horror, dan action. Semua karya di sini dibuat murni dari kreativitas sendiri — tanpa request, tanpa batas.",

  /* Status komisi: true = BUKA, false = TUTUP */
  commissionOpen: false,

  /* Pesan saat komisi tutup */
  commissionClosedMessage: "Saat ini saya belum membuka komisi. Stay tuned untuk update!",

  /* Pesan saat komisi buka (ubah commissionOpen jadi true) */
  commissionOpenMessage: "Komisi sedang dibuka! Hubungi saya lewat social media di bawah.",

  /* Social media — kosongkan kalau tidak punya */
  social: {
    youtube:   "",   /* contoh: "https://youtube.com/@namamu" */
    instagram: "",   /* contoh: "https://instagram.com/namamu" */
    twitter:   "",   /* contoh: "https://twitter.com/namamu" */
    tiktok:    "",   /* contoh: "https://tiktok.com/@namamu" */
  },

  /* Daftar skill */
  skills: [
    "Minecraft 3D Animation",
    "Cinematic Rendering",
    "Character Design",
    "Horror Atmosphere",
    "Scene Composition",
    "Motion & FX",
  ],

  /* Karya — tambah/kurang sesuai kebutuhan
     image: path ke file gambar (taruh di folder img/)
  */
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
/* ---- END CONFIG ---- */




/* =====================================================
   JANGAN EDIT DI BAWAH INI KALAU TIDAK TAU CODING!
   ===================================================== */

(function () {

  /* --- Render nav & logo --- */
  document.querySelectorAll('.brand-name').forEach(el => el.textContent = CONFIG.name);

  /* --- Navbar scroll --- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* --- Mobile menu --- */
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');
  hamburger.addEventListener('click', () => {
    const open = navMobile.classList.toggle('open');
    hamburger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
    hamburger.querySelectorAll('span')[1].style.opacity = open ? '0' : '';
    hamburger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMobile.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* --- Hero text --- */
  document.getElementById('hero-title').innerHTML =
    `Halo,<br><span class="name-gradient">${CONFIG.name}</span>`;
  document.getElementById('hero-desc').textContent = CONFIG.bio;
  // Hero featured image = first work
  const heroImg = document.getElementById('hero-img');
  heroImg.src = CONFIG.works[0].image;
  heroImg.alt = CONFIG.works[0].title;

  /* --- Skills --- */
  const skillsWrap = document.getElementById('skills-wrap');
  skillsWrap.innerHTML = CONFIG.skills.map(s =>
    `<span class="skill-tag">${s}</span>`
  ).join('');

  /* --- About bio --- */
  document.getElementById('about-bio').textContent = CONFIG.bio;

  /* --- About gallery --- */
  const galleryMain = document.getElementById('gallery-main');
  const gallerySecondary = document.getElementById('gallery-secondary');
  if (CONFIG.works.length > 0) {
    galleryMain.innerHTML = `<img src="${CONFIG.works[0].image}" alt="${CONFIG.works[0].title}" loading="lazy">`;
  }
  if (CONFIG.works.length > 1) {
    gallerySecondary.innerHTML = CONFIG.works.slice(1, 3).map(w =>
      `<div class="gallery-item"><img src="${w.image}" alt="${w.title}" loading="lazy"></div>`
    ).join('');
  }

  /* --- Slider / Works --- */
  const track = document.getElementById('slider-track');
  const dotsWrap = document.getElementById('slider-dots');
  let current = 0;
  let autoTimer = null;

  function buildSlides() {
    track.innerHTML = CONFIG.works.map((w, i) => `
      <div class="slide">
        <div class="slide-img">
          <img src="${w.image}" alt="${w.title}" loading="lazy">
          <div class="slide-img-overlay"></div>
        </div>
        <div class="slide-info">
          <span class="slide-tag">${w.tag}</span>
          <h3 class="slide-title">${w.title}</h3>
          <div class="slide-meta">
            <span>${w.year}</span>
            <span>·</span>
            <span>${String(i + 1).padStart(2, '0')} / ${String(CONFIG.works.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  function buildDots() {
    dotsWrap.innerHTML = CONFIG.works.map((_, i) =>
      `<button class="dot ${i === 0 ? 'active' : ''}" data-idx="${i}" aria-label="Slide ${i + 1}"></button>`
    ).join('');
    dotsWrap.querySelectorAll('.dot').forEach(btn => {
      btn.addEventListener('click', () => { goTo(parseInt(btn.dataset.idx)); resetAuto(); });
    });
  }

  function goTo(idx) {
    current = ((idx % CONFIG.works.length) + CONFIG.works.length) % CONFIG.works.length;
    track.style.transform = `translateX(-${100 * current}%)`;
    dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 4500);
  }

  buildSlides();
  buildDots();
  resetAuto();

  document.getElementById('arrow-prev').addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  document.getElementById('arrow-next').addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
  }, { passive: true });

  /* --- Commission section --- */
  const badge = document.getElementById('comm-badge');
  const commMsg = document.getElementById('comm-message');
  if (CONFIG.commissionOpen) {
    badge.classList.add('open');
    badge.querySelector('.comm-status-dot').style.background = 'var(--accent)';
    badge.querySelector('.comm-status-text').textContent = 'Komisi Dibuka';
    commMsg.textContent = CONFIG.commissionOpenMessage;
  } else {
    badge.querySelector('.comm-status-text').textContent = 'Komisi Ditutup';
    commMsg.textContent = CONFIG.commissionClosedMessage;
  }

  // Social links
  const socialRow = document.getElementById('social-row');
  const ICONS = {
    youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg>`,
  };
  const socialLinks = Object.entries(CONFIG.social).filter(([, url]) => url);
  if (socialLinks.length > 0) {
    socialRow.innerHTML = `
      <p style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-dim);margin-bottom:12px;width:100%;">Temukan saya di</p>
      ${socialLinks.map(([name, url]) => `
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link">
          ${ICONS[name] || ''}
          ${name}
        </a>
      `).join('')}
    `;
  } else {
    socialRow.innerHTML = `<p class="no-social">Tambah social media di script.js → CONFIG.social</p>`;
  }

  /* --- Footer year & name --- */
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  /* --- Scroll fade-up animation --- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach((el, i) => {
    const delay = el.dataset.delay || (i * 50);
    el.style.transitionDelay = delay + 'ms';
    observer.observe(el);
  });

})();
