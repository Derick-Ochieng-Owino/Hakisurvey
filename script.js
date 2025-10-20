// init AOS
    AOS.init({ once: true, duration: 700 });

    // mobile menu toggle
    const btn = document.getElementById('btn-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    btn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

    // accordions
    document.querySelectorAll('.accordion').forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        if (!panel) return;
        if (panel.classList.contains('hidden')) {
          panel.classList.remove('hidden');
          icon.classList.add('rotate-180');
        } else {
          panel.classList.add('hidden');
          icon.classList.remove('rotate-180');
        }
      });
    });

    // Swiper init
    const swiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: { 768: { slidesPerView: 1.2 }, 1024: { slidesPerView: 1.3 } }
    });

    // Leaflet map
    const map = L.map('map').setView([-1.286389, 36.817223], 7); // Nairobi center by default
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    // example project marker cluster / marker
    const marker = L.marker([-1.286389, 36.817223]).addTo(map).bindPopup('<strong>HakiSurvey Office</strong><br>Nairobi, Kenya');

    // contact form stub (demo)
    function handleSubmit(e) {
      e.preventDefault();
      // Demo: show status message (replace with actual AJAX POST)
      const status = document.getElementById('form-status');
      status.classList.remove('hidden');
      status.innerText = 'Thanks — your message was received (demo).';
      // reset form after 2s
      setTimeout(() => {
        e.target.reset();
      }, 1500);
    }

    // footer year
    document.getElementById('year').innerText = new Date().getFullYear();

    