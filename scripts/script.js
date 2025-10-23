// ========================================
// 🌐 MODERN PAGE LOADER + COMPONENT HANDLER
// ========================================

// === Modern Page Loader ===
class PageLoader {
  constructor() {
    this.loadingScreen = document.getElementById('loadingScreen');
    this.pageContent = document.getElementById('pageContent');
    this.isLoading = false;
    this.init();
  }

  init() {
    window.addEventListener('load', () => this.hideLoader());
    this.setupNavigation();
  }

  setupNavigation() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (
        link &&
        link.href &&
        !link.href.includes('javascript:') &&
        !link.getAttribute('href').startsWith('#') &&
        link.target !== '_blank'
      ) {
        e.preventDefault();
        this.navigateTo(link.href);
      }
    });

    window.addEventListener('popstate', () => {
      this.showLoader();
      setTimeout(() => this.hideLoader(), 800);
    });
  }

  navigateTo(url) {
    if (this.isLoading) return;
    this.showLoader();
    setTimeout(() => {
      this.hideLoader();
      window.location.href = url; // Enable for real navigation
    }, 1200);
  }

  showLoader() {
    this.isLoading = true;
    if (this.pageContent) this.pageContent.classList.add('fade-out');
    this.loadingScreen.classList.remove('hidden');
  }

  hideLoader() {
    if (!this.loadingScreen) return;
    setTimeout(() => {
      this.loadingScreen.classList.add('hidden');
      if (this.pageContent) this.pageContent.classList.remove('fade-out');
      this.isLoading = false;
    }, 400);
  }
}

// =============================
// 🧩 DYNAMIC COMPONENT LOADER
// =============================
async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) {
    console.error(`❌ Element with id="${id}" not found in DOM`);
    return;
  }

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to fetch ${file} (${response.status})`);
    const html = await response.text();
    el.innerHTML = html;
    console.log(`✅ Loaded ${file} into #${id}`);
  } catch (err) {
    console.error(`⚠️ Error loading ${file}:`, err);
  }
}


function initNavbarScripts(parentEl) {
  const hamburger = parentEl.querySelector('.hamburger');
  const navLinks = parentEl.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open', navLinks.classList.contains('active'));
    });
    console.log('✅ Navbar loaded and functional');
  } else {
    console.warn('⚠️ Navbar elements not found in external file');
  }
}

function initFooterScripts(parentEl) {
  const yearEl = parentEl.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  console.log('✅ Footer loaded and functional');
}

// =============================
// ✨ PAGE INTERACTIONS & EFFECTS
// =============================
function initPageInteractions() {
  // AOS Animations
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true });
  }

  // Footer year fallback
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Page navigation function
  window.showPage = function (pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
    document.getElementById(pageId)?.classList.add('active-page');

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const activeLink = Array.from(document.querySelectorAll('.nav-link'))
      .find(l => l.textContent.trim().toLowerCase().includes(pageId.toLowerCase()));
    if (activeLink) activeLink.classList.add('active');

    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    if (navLinks && hamburger) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Accordions
  document.querySelectorAll('.accordion').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const icon = btn.querySelector('i');
      panel?.classList.toggle('hidden');
      icon?.classList.toggle('rotate-180');
    });
  });

  // Swiper Slider
  if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: { 768: { slidesPerView: 1.2 }, 1024: { slidesPerView: 1.3 } },
    });
  }

  // Form Submission (simulated)
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const status = form.querySelector('#form-status');
      if (status) {
        status.classList.remove('hidden');
        setTimeout(() => status.classList.add('hidden'), 3000);
      }
    });
  });

  // Mobile Dropdown Toggle
  document.querySelectorAll('.dropdown > a').forEach(toggle => {
    toggle.addEventListener('click', e => {
      const parentDropdown = toggle.parentElement;
      const isMobile = window.innerWidth <= 968;
      if (isMobile) {
        e.preventDefault();
        parentDropdown.classList.toggle('active');
      }
    });
  });

  // Section Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  const serviceLinks = document.querySelectorAll('#services-nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (pageYOffset >= top && pageYOffset < top + sec.clientHeight) current = sec.id;
    });

    serviceLinks.forEach(link => {
      link.classList.remove('bg-blue-50', 'text-blue-700', 'font-semibold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('bg-blue-50', 'text-blue-700', 'font-semibold');
      }
    });
  });
}

// =============================
// 🚀 INITIALIZE EVERYTHING
// =============================
document.addEventListener('DOMContentLoaded', () => {
  new PageLoader();
  loadComponent('navbar', 'components/external_navbar.html');
  loadComponent('footer', 'components/external_footer.html');
  initPageInteractions();
});
