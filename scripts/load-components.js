class ComponentLoader {
    constructor() {
        this.components = [
            { 
                name: 'navbar', 
                html: './components/navbar.html',
                css: './components/navbar.css',
                position: 'afterbegin'
            },
            { 
                name: 'footer', 
                html: './components/footer.html',
                css: './components/footer.css',
                position: 'beforeend'
            }
        ];
        
        this.init();
    }
    
    async init() {
        // Load components in sequence
        for (const component of this.components) {
            await this.loadComponent(component);
        }
        this.initComponents();
    }
    
    async loadComponent(component) {
        try {
            const response = await fetch(component.html);
            
            if (!response.ok) {
                console.error(`Failed to fetch ${component.html}: ${response.status}`);
                return;
            }
            
            const html = await response.text();
            
            // Create and insert container
            const container = document.createElement('div');
            container.id = `${component.name}-container`;
            container.innerHTML = html;
            
            if (component.position === 'beforeend') {
                document.body.appendChild(container);
            } else {
                document.body.insertBefore(container, document.body.firstChild);
            }
            
            // Load CSS
            await this.loadCSS(component.css);
            
        } catch (error) {
            console.error(`Error loading ${component.name}:`, error);
        }
    }
    
    async loadCSS(cssPath) {
        return new Promise((resolve) => {
            // Check if already loaded
            if (document.querySelector(`link[href="${cssPath}"]`)) {
                resolve();
                return;
            }
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssPath;
            
            link.onload = () => {
                resolve();
            };
            
            link.onerror = () => {
                console.warn(`Failed to load CSS: ${cssPath}`);
                resolve();
            };
            
            document.head.appendChild(link);
        });
    }
    
    initComponents() {
        // Initialize navbar functionality
        this.initNavbar();
        
        // Initialize footer functionality
        this.initFooter();
    }
    
    initNavbar() {
        const navbar = document.querySelector('.navbar');
        
        if (!navbar) {
            console.warn('Navbar element not found');
            return;
        }
        
        // Hamburger functionality
        const hamburger = navbar.querySelector('.hamburger');
        const navLinks = navbar.querySelector('.nav-links');
        
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }
        
        // Set active nav link
        this.setActiveNavLink();
        
        // Dropdown functionality
        const dropdowns = navbar.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('a');
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
    }
    
    initFooter() {
        
        // Set current year
        const yearElements = document.querySelectorAll('#year, #current-year');
        if (yearElements.length > 0) {
            const currentYear = new Date().getFullYear();
            yearElements.forEach(el => {
                el.textContent = currentYear;
            });
        }
        
        // Social media links
        const socialLinks = document.querySelectorAll('.footer-container a[href="#"]');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
            });
        });
    }
    
    setActiveNavLink() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            
            // Check if this link corresponds to current page
            if (href === currentFile || 
                (currentFile === 'index.html' && (href === './index.html' || href === 'index.html')) ||
                (currentPath.includes('/services/') && href.includes('services'))) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ComponentLoader();
    });
} else {
    new ComponentLoader();
}