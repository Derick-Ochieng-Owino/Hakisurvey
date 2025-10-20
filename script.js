// =========================
// INIT AOS ANIMATIONS
// =========================
AOS.init({
  duration: 800,
  once: true
});

// =========================
// FOOTER YEAR
// =========================
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// =========================
// PAGE NAVIGATION
// =========================
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
  document.getElementById(pageId)?.classList.add('active-page');

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = Array.from(document.querySelectorAll('.nav-link'))
    .find(l => l.textContent.trim().toLowerCase().includes(pageId.toLowerCase()));
  if (activeLink) activeLink.classList.add('active');

  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) mobileMenu.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================
// MOBILE NAV TOGGLE
// =========================
const mobileBtn = document.getElementById('mobile-menu-button');
if (mobileBtn) {
  mobileBtn.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('hidden');
  });
}

// =========================
// ACCORDIONS
// =========================
document.querySelectorAll('.accordion').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    const icon = btn.querySelector('i');
    panel?.classList.toggle('hidden');
    icon?.classList.toggle('rotate-180');
  });
});

// =========================
// SWIPER SLIDER
// =========================
if (document.querySelector('.mySwiper')) {
  new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: { 768: { slidesPerView: 1.2 }, 1024: { slidesPerView: 1.3 } }
  });
}

// =========================
// FORM SUBMISSION
// =========================
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

// =========================
// SECTION HIGHLIGHT ON SCROLL
// =========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#services-nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (pageYOffset >= top && pageYOffset < top + sec.clientHeight) {
      current = sec.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('bg-blue-50','text-blue-700','font-semibold');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('bg-blue-50','text-blue-700','font-semibold');
    }
  });
});
