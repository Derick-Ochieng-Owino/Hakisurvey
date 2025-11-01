function loadFallbackComponent(id) {
    const el = document.getElementById(id);
    if (!el) return;

    if (id === 'navbar') {
        el.innerHTML = `
            <header class="header">
                <div class="container">
                    <div class="header-content">
                        <div class="logo">HakiSurvey Plots Ltd</div>
                        <nav class="nav-links" id="nav-links">
                            <a href="#" class="nav-link active">Home</a>
                            <a href="#services" class="nav-link">Services</a>
                            <a href="#about" class="nav-link">About</a>
                            <a href="#projects" class="nav-link">Projects</a>
                            <a href="#contact" class="nav-link">Contact</a>
                        </nav>
                        <div class="hamburger" id="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>
        `;
        initNavbarScripts(el);
    } else if (id === 'footer') {
        el.innerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-column">
                            <h3>HakiSurvey Plots Ltd</h3>
                            <p>Professional surveying services across Kenya with precision, reliability, and expertise.</p>
                        </div>
                        <div class="footer-column">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#services">Services</a></li>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>
                        <div class="footer-column">
                            <h3>Contact Info</h3>
                            <ul>
                                <li><i class="fas fa-map-marker-alt"></i> Nairobi, Kenya</li>
                                <li><i class="fas fa-phone"></i> +254 700 000 000</li>
                                <li><i class="fas fa-envelope"></i> info@hakisurvey.co.ke</li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; <span id="year"></span> HakiSurvey Plots Ltd. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
        initFooterScripts(el);
    }
}

function initNavbarScripts(parentEl) {
    const hamburger = parentEl.querySelector('.hamburger');
    const navLinks = parentEl.querySelector('.nav-links');
    const dropdowns = parentEl.querySelectorAll('.dropdown');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open', navLinks.classList.contains('active'));
        });
    }

    // Mobile dropdown functionality
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        
        dropdownLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close dropdowns when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 968 && !e.target.closest('.nav-links')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Close mobile menu when clicking on a link (except dropdown toggles)
    if (navLinks) {
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && !e.target.parentElement.classList.contains('dropdown')) {
                if (hamburger) hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 968) {
            if (hamburger) hamburger.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    setActiveNavLink();

    const navLinksAll = parentEl.querySelectorAll('.nav-link');
    navLinksAll.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                showPage(targetId);
                
                // Close mobile menu after clicking a link
                if (window.innerWidth <= 968) {
                    if (hamburger) hamburger.classList.remove('active');
                    if (navLinks) navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            }
        });
    });
}

function initFooterScripts(parentEl) {
    const yearEl = parentEl.querySelector('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initPageInteractions() {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    window.showService = function (serviceId) {
        if (window.innerWidth > 968) {
            document.querySelectorAll('.service-section').forEach(s => s.classList.remove('active'));
            document.getElementById(serviceId)?.classList.add('active');

            document.querySelectorAll('.services-nav a').forEach(l => l.classList.remove('active'));
            const activeLink = Array.from(document.querySelectorAll('.services-nav a'))
                .find(l => l.getAttribute('href') === `#${serviceId}`);
            activeLink?.classList.add('active');

            document.querySelectorAll('.service-image').forEach(i => i.classList.remove('active'));
            document.getElementById(`${serviceId}-img`)?.classList.add('active');
        }
    };

    window.showPage = function (pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active-page'));
        document.getElementById(pageId)?.classList.add('active-page');

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const activeLink = Array.from(document.querySelectorAll('.nav-link'))
            .find(l => l.getAttribute('href') === `#${pageId}`);
        activeLink?.classList.add('active');

        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navLinks && hamburger) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    document.querySelectorAll('.accordion').forEach(btn => {
        btn.addEventListener('click', () => {
            const panel = btn.nextElementSibling;
            const icon = btn.querySelector('i');
            panel?.classList.toggle('hidden');
            icon?.classList.toggle('rotate-180');
        });
    });

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

    document.querySelectorAll('.dropdown > a').forEach(toggle => {
        toggle.addEventListener('click', e => {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                toggle.parentElement.classList.toggle('active');
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const serviceLinks = document.querySelectorAll('#services-nav a');

    if (serviceLinks.length > 0) {
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

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 968) {
            document.querySelectorAll('.service-section').forEach(s => (s.style.display = 'block'));
        } else {
            document.querySelectorAll('.service-section').forEach(s => {
                s.style.display = s.classList.contains('active') ? 'block' : 'none';
            });
        }
    });
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        // Main page match
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
        
        // Services page special handling
        if (currentPage === 'services.html' && linkHref === 'services.html') {
            link.classList.add('active');
        }
    });
}

window.showPage = showPage;
window.showService = showService;