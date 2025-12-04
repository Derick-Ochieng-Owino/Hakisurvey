// Footer functionality
class FooterManager {
    constructor() {
        this.footer = document.querySelector('#main-footer');
        this.init();
    }
    
    init() {
        // Set current year
        this.setCurrentYear();
        
        // Initialize any interactive footer elements
        this.initSocialLinks();
        
        // Add scroll to top button if needed
        this.addBackToTopButton();
    }
    
    setCurrentYear() {
        const yearElement = document.querySelector('#current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    initSocialLinks() {
        // Add event listeners for social media links
        const socialLinks = document.querySelectorAll('.footer-container .text-xl a');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = this.getPlatformFromLink(link);
                console.log(`Navigating to ${platform} (link disabled in demo)`);
                // In production, you would enable the actual navigation:
                // window.open(link.href, '_blank');
            });
        });
    }
    
    getPlatformFromLink(link) {
        if (link.querySelector('.fa-linkedin')) return 'LinkedIn';
        if (link.querySelector('.fa-twitter')) return 'Twitter';
        if (link.querySelector('.fa-facebook')) return 'Facebook';
        if (link.querySelector('.fa-instagram')) return 'Instagram';
        return 'Social Platform';
    }
    
    addBackToTopButton() {
        // Only add if not already present
        if (document.querySelector('.back-to-top')) return;
        
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 invisible';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        
        this.footer.parentNode.insertBefore(backToTopBtn, this.footer.nextSibling);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.remove('opacity-100', 'visible');
                backToTopBtn.classList.add('opacity-0', 'invisible');
            }
        });
        
        // Scroll to top functionality
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Optional: Add newsletter subscription functionality
    initNewsletter() {
        const newsletterForm = document.querySelector('#newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                
                if (this.validateEmail(email)) {
                    console.log(`Subscribing email: ${email}`);
                    // Here you would typically send to your backend
                    this.showNewsletterMessage('Thank you for subscribing!', 'success');
                    newsletterForm.reset();
                } else {
                    this.showNewsletterMessage('Please enter a valid email address.', 'error');
                }
            });
        }
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    showNewsletterMessage(message, type) {
        // Implementation for showing newsletter messages
        alert(message); // Replace with better UI
    }
}

// Export for use
export default FooterManager;