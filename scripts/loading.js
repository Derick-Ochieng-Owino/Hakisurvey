// === Modern Page Loader ===
class PageLoader {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.pageContent = document.getElementById('pageContent');
        this.isLoading = false;

        this.init();
    }

    init() {
        // Hide loader when page fully loads
        window.addEventListener('load', () => this.hideLoader());

        // Handle in-page navigation (optional)
        this.setupNavigation();
    }

    setupNavigation() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (
                link &&
                link.href &&
                !link.href.includes('javascript:') &&
                !link.getAttribute('href').startsWith('#') &&
                link.target !== '_blank'
            ) {
                e.preventDefault();
                this.navigateTo(link.href);
            }
        });

        // Handle browser navigation
        window.addEventListener('popstate', () => {
            this.showLoader();
            setTimeout(() => this.hideLoader(), 800);
        });
    }

    navigateTo(url) {
        if (this.isLoading) return;

        this.showLoader();

        // Simulate page load delay
        setTimeout(() => {
            this.hideLoader();
            // Uncomment this for real navigation:
            // window.location.href = url;
        }, 1200);
    }

    showLoader() {
        this.isLoading = true;
        if (this.pageContent) this.pageContent.classList.add('fade-out');

        // Show blurred loader
        this.loadingScreen.classList.remove('hidden');
    }

    hideLoader() {
        if (!this.loadingScreen) return;
        setTimeout(() => {
            this.loadingScreen.classList.add('hidden');
            if (this.pageContent) this.pageContent.classList.remove('fade-out');
            this.isLoading = false;
        }, 400);
    }
}

// === Initialize Loader ===
document.addEventListener('DOMContentLoaded', () => new PageLoader());
