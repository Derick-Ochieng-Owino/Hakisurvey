// Dynamically load components
async function loadComponent(id, file) {
  const el = document.getElementById(id);
  const response = await fetch(file);
  const html = await response.text();
  el.innerHTML = html;

  // Initialize related JS after load
  if (file.includes('navbar')) initNavbarScripts();
  if (file.includes('footer')) initFooterScripts();
}

// Load both components
loadComponent('navbar', 'components/external_navbar.html');
loadComponent('footer', 'components/external_footer.html');

// ============================
// NAVBAR SCRIPT INITIALIZATION
// ============================
function initNavbarScripts() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  console.log('✅ Navbar loaded and functional');
}

// ============================
// FOOTER SCRIPT INITIALIZATION
// ============================
function initFooterScripts() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  console.log('✅ Footer loaded and functional');
}
