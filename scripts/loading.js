// Hide loading screen when page is fully loaded
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // Optional: Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 1000); // Adjust timing as needed
});

// Optional: Show loading screen manually if needed
function showLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
}

function hideLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
}