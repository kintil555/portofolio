// ── MAIN.JS — Jangan diubah kalau tidak perlu ──

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initSlider();
  initNav();
  initAnimations();
});

// ── APPLY CONFIG ──────────────────────────────────────────
function applyConfig() {
  const C = CONFIG;

  // Identity
  document.querySelectorAll("[data-name]").forEach(el => el.textContent = C.name);
  document.querySelectorAll("[data-tagline]").forEach(el => el.textContent = C.tagline);
  document.querySelectorAll("[data-bio]").forEach(el => el.textContent = C.bio);
  document.querySelectorAll("[data-footer]").forEach(el => el.textContent = C.footerText);

  // Commission status
  const badge = document.getElementById("commission-badge");
  const note = document.getElementById("commission-note");
  if (badge) {
    badge.textContent = C.commissionOpen ? "✦ Open for Commission" : "✦ Commission Closed";
    badge.classList.toggle("open", C.commissionOpen);
    badge.classList.toggle("closed", !C.commissionOpen);
  }
  if (note && C.commissionNote) note.textContent = C.commissionNote;

  // Social links
  const socialMap = {
    youtube: "🎬",
    instagram: "📸",
    twitter: "🐦",
    tiktok: "🎵",
  };
  const socialContainer = document.getElementById("social-links");
  if (socialContainer) {
    Object.entries(C.social).forEach(([platform, url]) => {
      if (!url) return;
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "social-btn";
      a.innerHTML = `${socialMap[platform] || "🔗"} <span>${platform}</span>`;
      socialContainer.appendChild(a);
    });
  }

  // Skills
  const skillsContainer = document.getElementById("skills-list");
  if (skillsContainer) {
    C.skills.forEach(skill => {
      const span = document.createElement("span");
      span.className = "skill-tag";
      span.textContent = skill;
      skillsContainer.appendChild(span);
    });
  }

  // Works / Slider
  const sliderTrack = document.getElementById("slider-track");
  const dotsContainer = document.getElementById("slider-dots");
  if (sliderTrack && C.works.length) {
    C.works.forEach((work, i) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      slide.innerHTML = `
        <div class="slide-img-wrap">
          <img src="${work.image}" alt="${work.title}" loading="lazy" />
        </div>
        <div class="slide-info">
          <span class="slide-tag">${work.tag}</span>
          <h3 class="slide-title">${work.title}</h3>
          <p class="slide-desc">${work.description}</p>
          <span class="slide-num">0${i + 1} / 0${C.works.length}</span>
        </div>
      `;
      sliderTrack.appendChild(slide);

      if (dotsContainer) {
        const dot = document.createElement("button");
        dot.className = "dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", `Slide ${i + 1}`);
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    });
  }
}

// ── SLIDER ────────────────────────────────────────────────
let currentSlide = 0;
let autoplayInterval = null;
let totalSlides = 0;

function initSlider() {
  totalSlides = CONFIG.works.length;
  if (totalSlides === 0) return;

  updateSlider();
  startAutoplay();

  document.getElementById("slide-prev")?.addEventListener("click", () => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    resetAutoplay();
  });
  document.getElementById("slide-next")?.addEventListener("click", () => {
    goToSlide((currentSlide + 1) % totalSlides);
    resetAutoplay();
  });

  // Touch/swipe support
  let startX = 0;
  const track = document.getElementById("slider-track");
  if (!track) return;
  track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goToSlide(diff > 0
        ? (currentSlide + 1) % totalSlides
        : (currentSlide - 1 + totalSlides) % totalSlides);
      resetAutoplay();
    }
  });
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function updateSlider() {
  const track = document.getElementById("slider-track");
  if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`;

  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    goToSlide((currentSlide + 1) % totalSlides);
  }, 4000);
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

// ── NAVIGATION ────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById("main-nav");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  window.addEventListener("scroll", () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  hamburger?.addEventListener("click", () => {
    navLinks?.classList.toggle("open");
    hamburger.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks?.classList.remove("open");
      hamburger?.classList.remove("active");
    });
  });
}

// ── SCROLL ANIMATIONS ─────────────────────────────────────
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}
