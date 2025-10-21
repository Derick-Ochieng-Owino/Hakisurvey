// Loading screen functionality
class PageLoader {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.progressBar = document.getElementById('progressBar');
        this.pageContent = document.getElementById('pageContent');
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        // Hide loading screen after initial page load
        window.addEventListener('load', () => {
            this.hideLoader();
        });
        
        // Handle navigation
        this.setupNavigation();
    }
    
    setupNavigation() {
        // Intercept all navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            
            if (link && link.href && !link.href.includes('javascript:') && 
                !link.getAttribute('href').startsWith('#') &&
                link.target !== '_blank') {
                
                e.preventDefault();
                this.navigateTo(link.href);
            }
        });
        
        // Handle browser back/forward buttons
        window.addEventListener('popstate', () => {
            this.showLoader();
            // Simulate loading for demo purposes
            setTimeout(() => {
                this.hideLoader();
            }, 800);
        });
    }
    
    navigateTo(url) {
        if (this.isLoading) return;
        
        this.showLoader();
        
        // Simulate page loading (replace with actual fetch for your use case)
        this.simulatePageLoad(() => {
            // For multi-page website, you would actually navigate here
            // window.location.href = url;
            
            // For single-page application, you would load content via AJAX
            // this.loadPageContent(url);
            
            // For demo purposes, we'll just hide the loader after a delay
            setTimeout(() => {
                this.hideLoader();
                // Uncomment below for actual navigation:
                // window.location.href = url;
            }, 1200);
        });
    }
    
    simulatePageLoad(callback) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                callback();
            }
            this.updateProgress(progress);
        }, 200);
    }
    
    updateProgress(progress) {
        this.progressBar.style.width = progress + '%';
    }
    
    showLoader() {
        this.isLoading = true;
        this.pageContent.classList.add('fade-out');
        
        setTimeout(() => {
            this.loadingScreen.classList.remove('hidden');
            this.progressBar.style.width = '0%';
        }, 300);
    }
    
    hideLoader() {
        this.updateProgress(100);
        
        setTimeout(() => {
            this.loadingScreen.classList.add('hidden');
            this.pageContent.classList.remove('fade-out');
            this.isLoading = false;
        }, 500);
    }
    
    // For single-page applications - load content via AJAX
    async loadPageContent(url) {
        try {
            const response = await fetch(url);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Update page content
            const newContent = doc.querySelector('.page-content').innerHTML;
            this.pageContent.innerHTML = newContent;
            
            // Update page title
            document.title = doc.title;
            
            // Update URL without reloading
            window.history.pushState({}, '', url);
            
            this.hideLoader();
            
        } catch (error) {
            console.error('Error loading page:', error);
            this.hideLoader();
            // Fallback to traditional navigation
            window.location.href = url;
        }
    }
}

// Initialize the page loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PageLoader();
});

// Alternative simple implementation for basic websites
function setupSimplePageLoader() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    
    // Hide loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1000);
    });
    
    // Show loading screen when clicking links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        
        if (link && link.href && !link.href.includes('javascript:') && 
            !link.getAttribute('href').startsWith('#') &&
            link.target !== '_blank') {
            
            // For multi-page navigation
            e.preventDefault();
            
            // Show loading screen
            loadingScreen.classList.remove('hidden');
            progressBar.style.width = '0%';
            
            // Simulate progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 20;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    // Navigate to the page
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 300);
                }
                progressBar.style.width = progress + '%';
            }, 200);
        }
    });
}

// Use the simple version for basic implementation
document.addEventListener('DOMContentLoaded', setupSimplePageLoader);