// === PAGE LOADER CONTROL ===

// Wait until everything (HTML, images, external components) has loaded
window.addEventListener('load', async function () {
    // Wait for external components (navbar, footer) to load first
    await ensureComponentsLoaded();

    // Optional: add a tiny delay for smooth fade-out
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => loadingScreen.remove(), 600); // Remove after fade-out
        }
    }, 600);
});

// Helper to ensure components are loaded into DOM
async function ensureComponentsLoaded() {
    // Wait for navbar and footer to exist and contain HTML
    const checkInterval = 100;
    const timeout = 5000;
    let elapsed = 0;

    return new Promise(resolve => {
        const check = setInterval(() => {
            const navbarLoaded = document.querySelector('#navbar')?.innerHTML.trim().length > 0;
            const footerLoaded = document.querySelector('#footer')?.innerHTML.trim().length > 0;

            if (navbarLoaded && footerLoaded) {
                clearInterval(check);
                resolve();
            }

            elapsed += checkInterval;
            if (elapsed >= timeout) {
                clearInterval(check);
                resolve(); // Force resolve even if one component fails
            }
        }, checkInterval);
    });
}

// Manual controls (optional)
function showLoading() {
    const screen = document.getElementById('loadingScreen');
    if (screen) screen.classList.remove('hidden');
}

function hideLoading() {
    const screen = document.getElementById('loadingScreen');
    if (screen) {
        screen.classList.add('hidden');
        setTimeout(() => screen.remove(), 600);
    }
}
