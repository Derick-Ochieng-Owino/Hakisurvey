// Dynamically load components
async function loadComponent(id, file) {
  const el = document.getElementById(id);
  const response = await fetch(file);
  const html = await response.text();
  el.innerHTML = html;

  // Initialize related JS after load
  if (file.includes('navbar')) initNavbarScripts(el);
  if (file.includes('footer')) initFooterScripts(el);
}

// Load both components
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar', 'components/external_navbar.html');
  loadComponent('footer', 'components/external_footer.html');
});

// ============================
// NAVBAR SCRIPT INITIALIZATION
// ============================
function initNavbarScripts(parentEl) {
  const hamburger = parentEl.querySelector('.hamburger');
  const navLinks = parentEl.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    console.log('✅ Navbar loaded and functional');
  } else {
    console.warn('⚠️ Navbar elements not found in external file');
  }
}

// ============================
// FOOTER SCRIPT INITIALIZATION
// ============================
function initFooterScripts(parentEl) {
  const yearEl = parentEl.querySelector('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  console.log('✅ Footer loaded and functional');
}
