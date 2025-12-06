class ComponentLoader {
    constructor() {
        this.components = [
            { 
                name: 'navbar', 
                html: '/components/navbar.html',
                js: '/components/navbar.js',
                position: 'afterbegin'
            },
            { 
                name: 'footer', 
                html: '/components/footer.html',
                js: '/components/footer.js',
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

    getBasePath() {
        // Determine if we're in a subfolder
        const path = window.location.pathname;
        
        // If we're in services folder (or any subfolder)
        if (path.includes('/services/') || path.includes('/blog/') || path.includes('/projects/')) {
            // Go up one level to reach root
            return '../';
        }
        
        // If we're in root folder
        return './';
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
            
        } catch (error) {
            console.error(`Error loading ${component.name}:`, error);
        }
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
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        let href = link.getAttribute('href');
        link.classList.remove('active');
        
        // Handle root-relative paths (starting with /)
        if (href.startsWith('/')) {
            if (currentPath === href || 
                (currentPath === '/' && href === '/index.html') ||
                (currentPath === '/index.html' && href === '/')) {
                link.classList.add('active');
            }
        } 
        // Handle dropdown service links
        else if (href.includes('services/')) {
            // Check if current path matches this service
            if (currentPath.includes(href.replace('.html', ''))) {
                link.classList.add('active');
            }
        }
        // Handle other relative paths
        else {
            const currentFile = currentPath.split('/').pop() || 'index.html';
            if (href === currentFile || 
                (currentFile === 'index.html' && (href === './index.html' || href === 'index.html'))) {
                link.classList.add('active');
            }
        }
    });
    
    // Also highlight the parent "Services" dropdown if on a services page
    if (currentPath.includes('/services/')) {
        const servicesDropdown = document.querySelector('.dropdown > a.nav-link');
        if (servicesDropdown) {
            servicesDropdown.classList.add('active');
        }
    }
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