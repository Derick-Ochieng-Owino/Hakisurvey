// ==========================
// INIT AOS ANIMATIONS
// ==========================
AOS.init({
  duration: 800,
  once: true,
});

// ==========================
// FOOTER YEAR
// ==========================
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ==========================
// PAGE NAVIGATION
// ==========================
function showPage(pageId) {
  // Hide all pages and show the selected one
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
  document.getElementById(pageId)?.classList.add('active-page');

  // Update nav link active state
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = Array.from(document.querySelectorAll('.nav-link'))
    .find(l => l.textContent.trim().toLowerCase().includes(pageId.toLowerCase()));
  if (activeLink) activeLink.classList.add('active');

  // Close mobile menu after navigating
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  if (navLinks && hamburger) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  }

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================
// MOBILE NAV TOGGLE
// ==========================
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
});

// ==========================
// ACCORDIONS
// ==========================
document.querySelectorAll('.accordion').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    const icon = btn.querySelector('i');
    panel?.classList.toggle('hidden');
    icon?.classList.toggle('rotate-180');
  });
});

// ==========================
// SWIPER SLIDER
// ==========================
if (document.querySelector('.mySwiper')) {
  new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      768: { slidesPerView: 1.2 },
      1024: { slidesPerView: 1.3 },
    },
  });
}

// ==========================
// FORM SUBMISSION
// ==========================
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

// MOBILE DROPDOWN TOGGLE
document.addEventListener('DOMContentLoaded', () => {
  const dropdownToggles = document.querySelectorAll('.dropdown > a');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', e => {
      const parentDropdown = toggle.parentElement;
      const isMobile = window.innerWidth <= 968;

      if (isMobile) {
        e.preventDefault(); // prevent navigation
        parentDropdown.classList.toggle('active');
      }
    });
  });
});



// ==========================
// SECTION HIGHLIGHT ON SCROLL
// ==========================
const sections = document.querySelectorAll('section[id]');
const serviceLinks = document.querySelectorAll('#services-nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (pageYOffset >= top && pageYOffset < top + sec.clientHeight) {
      current = sec.id;
    }
  });

  serviceLinks.forEach(link => {
    link.classList.remove('bg-blue-50', 'text-blue-700', 'font-semibold');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('bg-blue-50', 'text-blue-700', 'font-semibold');
    }
  });
});
