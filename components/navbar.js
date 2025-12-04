// Navbar Manager Class
class NavbarManager {
    constructor() {
        this.navbar = document.querySelector('#navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.mobileOverlay = document.querySelector('.mobile-overlay');
        this.dropdowns = document.querySelectorAll('.dropdown');
        this.navItems = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Initialize mobile menu toggle
        this.initMobileMenu();
        
        // Initialize dropdowns
        this.initDropdowns();
        
        // Set active link based on current page
        this.setActiveLink();
        
        // Add scroll effect
        this.addScrollEffect();
        
        // Handle window resize
        this.handleResize();
    }
    
    initMobileMenu() {
        if (!this.hamburger) return;
        
        // Toggle mobile menu
        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMobileMenu();
        });
        
        // Close menu when clicking overlay
        this.mobileOverlay?.addEventListener('click', () => {
            this.closeMobileMenu();
        });
        
        // Close menu when clicking a link
        this.navItems.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });
    }
    
    initDropdowns() {
        // Desktop dropdown hover
        this.dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('[data-toggle="dropdown"]');
            
            if (window.innerWidth > 768) {
                // Desktop: hover
                dropdown.addEventListener('mouseenter', () => {
                    dropdown.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    dropdown.classList.remove('active');
                });
            } else {
                // Mobile: click
                trigger?.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    this.dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                });
            }
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                this.dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navLinks.classList.toggle('active');
        this.mobileOverlay.classList.toggle('active');
        document.body.style.overflow = 
            this.navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navLinks.classList.remove('active');
        this.mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Close all dropdowns
        this.dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    setActiveLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Remove active class from all links
        this.navItems.forEach(link => {
            link.classList.remove('active');
        });
        
        // Find and activate current page link
        this.navItems.forEach(link => {
            const href = link.getAttribute('href');
            if (this.isCurrentPage(href, currentPage)) {
                link.classList.add('active');
            }
        });
    }
    
    isCurrentPage(href, currentPage) {
        if (!href) return false;
        
        // Handle home page
        if (currentPage === '' || currentPage === 'index.html') {
            return href === 'index.html' || href === '/' || href === './index.html';
        }
        
        // Handle other pages
        return href.includes(currentPage) || 
               currentPage.includes(href.replace('.html', ''));
    }
    
    addScrollEffect() {
        const header = document.querySelector('#navbar_header');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Optional: Hide/show on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
                
                // Reset dropdown behavior for desktop
                this.dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
}

// Export for use
export default NavbarManager;