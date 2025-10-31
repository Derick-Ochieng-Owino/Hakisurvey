// Auto-rotating gallery functionality
class AutoRotatingGallery {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Gallery container with ID '${containerId}' not found`);
            return;
        }
        
        // Default options
        this.options = {
            interval: 3000, // 3 seconds
            autoPlay: true,
            showNav: true,
            showIndicators: true,
            pauseOnHover: true,
            ...options
        };
        
        this.slides = this.container.querySelectorAll('.gallery-slide');
        this.indicators = this.container.querySelectorAll('.gallery-indicator');
        this.prevBtn = this.container.querySelector('.gallery-prev');
        this.nextBtn = this.container.querySelector('.gallery-next');
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        // Create navigation buttons if enabled and not already present
        if (this.options.showNav && !this.prevBtn) {
            this.createNavigationButtons();
        }
        
        // Add event listeners to indicators
        if (this.options.showIndicators) {
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    this.showSlide(index);
                    this.restartAutoPlay();
                });
            });
        }
        
        // Add event listeners to navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.restartAutoPlay();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.restartAutoPlay();
            });
        }
        
        // Add hover events for pause
        if (this.options.pauseOnHover) {
            this.container.addEventListener('mouseenter', () => {
                this.pause();
            });
            
            this.container.addEventListener('mouseleave', () => {
                if (this.options.autoPlay) {
                    this.play();
                }
            });
        }
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.restartAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.restartAutoPlay();
            } else if (e.key === ' ') {
                this.togglePlayPause();
            }
        });
        
        // Start auto-play if enabled
        if (this.options.autoPlay) {
            this.play();
        }
        
        // Show first slide
        this.showSlide(0);
    }
    
    createNavigationButtons() {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'gallery-nav gallery-prev';
        prevBtn.innerHTML = '&#10094;';
        prevBtn.setAttribute('aria-label', 'Previous slide');
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'gallery-nav gallery-next';
        nextBtn.innerHTML = '&#10095;';
        nextBtn.setAttribute('aria-label', 'Next slide');
        
        this.container.appendChild(prevBtn);
        this.container.appendChild(nextBtn);
        
        // Update references
        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
    }
    
    showSlide(index) {
        // Handle index bounds
        if (index < 0) {
            index = this.slideCount - 1;
        } else if (index >= this.slideCount) {
            index = 0;
        }
        
        // Remove active class from all slides and indicators
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        this.slides[index].classList.add('active');
        if (this.indicators[index]) {
            this.indicators[index].classList.add('active');
        }
        
        this.currentSlide = index;
        
        // Dispatch custom event
        this.container.dispatchEvent(new CustomEvent('slideChange', {
            detail: { currentSlide: index }
        }));
    }
    
    nextSlide() {
        let next = this.currentSlide + 1;
        if (next >= this.slideCount) {
            next = 0;
        }
        this.showSlide(next);
    }
    
    prevSlide() {
        let prev = this.currentSlide - 1;
        if (prev < 0) {
            prev = this.slideCount - 1;
        }
        this.showSlide(prev);
    }
    
    play() {
        if (this.slideInterval) {
            this.pause();
        }
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.options.interval);
        
        this.container.dispatchEvent(new CustomEvent('galleryPlay'));
    }
    
    pause() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
        
        this.container.dispatchEvent(new CustomEvent('galleryPause'));
    }
    
    togglePlayPause() {
        if (this.slideInterval) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    restartAutoPlay() {
        if (this.options.autoPlay) {
            this.pause();
            this.play();
        }
    }
    
    // Public methods
    goToSlide(index) {
        this.showSlide(index);
        this.restartAutoPlay();
    }
    
    setInterval(interval) {
        this.options.interval = interval;
        this.restartAutoPlay();
    }
    
    destroy() {
        this.pause();
        // Remove event listeners
        if (this.prevBtn) {
            this.prevBtn.removeEventListener('click', this.prevSlide);
        }
        if (this.nextBtn) {
            this.nextBtn.removeEventListener('click', this.nextSlide);
        }
        this.indicators.forEach(indicator => {
            indicator.removeEventListener('click', this.showSlide);
        });
    }
}

// Initialize all galleries on the page
function initializeGalleries() {
    const galleryContainers = document.querySelectorAll('.gallery-container');
    
    galleryContainers.forEach((container, index) => {
        const galleryId = container.id || `gallery-${index + 1}`;
        if (!container.id) {
            container.id = galleryId;
        }
        
        // Get custom options from data attributes
        const interval = container.dataset.interval ? parseInt(container.dataset.interval) : 3000;
        const autoPlay = container.dataset.autoplay !== 'false';
        const showNav = container.dataset.showNav !== 'false';
        const showIndicators = container.dataset.showIndicators !== 'false';
        const pauseOnHover = container.dataset.pauseOnHover !== 'false';
        
        new AutoRotatingGallery(galleryId, {
            interval: interval,
            autoPlay: autoPlay,
            showNav: showNav,
            showIndicators: showIndicators,
            pauseOnHover: pauseOnHover
        });
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGalleries);
} else {
    initializeGalleries();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AutoRotatingGallery, initializeGalleries };
}