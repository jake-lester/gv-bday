// Simple client-side router for clean URLs
class Router {
    constructor() {
        this.routes = {
            '/': 'index.html',
            '/countdown': 'countdown.html',
            '/wishes': 'wishes.html'
        };
        
        this.currentPage = null;
        this.isNavigating = false;
        this.navigationTimeout = null;
        
        this.init();
    }
    
    init() {
        // Prevent multiple initializations
        if (window.routerInitialized) {
            return;
        }
        window.routerInitialized = true;
        
        // Handle initial page load
        this.handleRoute();
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            e.preventDefault();
            this.handleRoute();
        });
        
        // Handle navigation clicks with better delegation
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="/"]');
            if (link && !this.isNavigating) {
                e.preventDefault();
                e.stopPropagation();
                this.navigate(link.getAttribute('href'));
            }
        });
    }
    
    navigate(path) {
        if (this.isNavigating || window.location.pathname === path) {
            return;
        }
        
        this.isNavigating = true;
        
        // Clear any existing navigation timeout
        if (this.navigationTimeout) {
            clearTimeout(this.navigationTimeout);
        }
        
        // Update browser URL without page reload
        history.pushState({ path: path }, '', path);
        this.handleRoute();
    }
    
    async handleRoute() {
        const path = window.location.pathname;
        
        // Default to home if path not found
        const targetFile = this.routes[path] || this.routes['/'];
        
        // Check if we're already on the right page
        if (this.currentPage === targetFile && !this.isNavigating) {
            return;
        }
        
        try {
            // Set navigation timeout (10 seconds)
            this.navigationTimeout = setTimeout(() => {
                console.warn('Navigation timeout, falling back to direct navigation');
                window.location.href = targetFile;
            }, 10000);
            
            // Load the target page with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const response = await fetch(targetFile, { 
                signal: controller.signal,
                cache: 'no-cache'
            });
            
            clearTimeout(timeoutId);
            clearTimeout(this.navigationTimeout);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const html = await response.text();
            
            // Parse the HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Update page content
            this.updatePage(doc, targetFile);
            
        } catch (error) {
            clearTimeout(this.navigationTimeout);
            console.error('Navigation error:', error);
            
            // Better fallback handling
            if (error.name === 'AbortError') {
                console.warn('Navigation request timed out, retrying...');
                // Retry once with direct navigation
                setTimeout(() => {
                    window.location.href = targetFile;
                }, 100);
            } else {
                // Fallback to direct navigation for other errors
                window.location.href = targetFile;
            }
        } finally {
            this.isNavigating = false;
        }
    }
    
    getCurrentPageFile() {
        // More reliable page detection based on multiple factors
        const path = window.location.pathname;
        const mappedFile = this.routes[path] || this.routes['/'];
        
        // Also check DOM elements as secondary verification
        if (document.querySelector('.landing-content')) return 'index.html';
        if (document.querySelector('#countdown-section')) return 'countdown.html';
        if (document.querySelector('#birthday-section')) return 'wishes.html';
        
        return mappedFile;
    }
    
    updatePage(doc, targetFile) {
        // Clean up before navigation
        this.cleanup();
        
        // Update title
        document.title = doc.title;
        
        // Update body class
        document.body.className = doc.body.className;
        
        // Store references to preserve
        const existingScripts = document.querySelectorAll('script[src*="config.js"], script[src*="router.js"]');
        
        // Replace body content
        document.body.innerHTML = doc.body.innerHTML;
        
        // Restore essential scripts if they were removed
        existingScripts.forEach(script => {
            if (!document.querySelector(`script[src="${script.src}"]`)) {
                document.head.appendChild(script.cloneNode(true));
            }
        });
        
        // Update navigation active states
        this.updateNavigation();
        
        // Load the appropriate script
        this.loadPageScript(targetFile);
        
        // Update current page reference
        this.currentPage = targetFile;
        
        // Trigger custom event for page change
        window.dispatchEvent(new CustomEvent('pageChanged', { 
            detail: { targetFile, path: window.location.pathname } 
        }));
        
        // HACK: Force refresh on router navigation to fix DOM timing issues
        this.applyRefreshHackIfNeeded();
    }
    
    updateNavigation() {
        const path = window.location.pathname;
        
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
            // Remove all active classes
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current page
            const activeLink = document.querySelector(`a[href="${path}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }, 50);
    }
    
    cleanup() {
        // Clean up specific intervals
        if (window.memoryGame && window.memoryGame.gameTimer) {
            clearInterval(window.memoryGame.gameTimer);
        }
        if (window.countdownInterval) {
            clearInterval(window.countdownInterval);
        }
        if (window.birthdayStatusInterval) {
            clearInterval(window.birthdayStatusInterval);
        }
        
        // Remove dynamic particles and effects
        document.querySelectorAll('.particle, .confetti, .firework, .screen-flash, .shockwave').forEach(el => {
            if (el.parentNode) el.parentNode.removeChild(el);
        });
    }
    
    applyRefreshHackIfNeeded() {
        // Abstract refresh hack for all pages to fix DOM timing issues
        const currentPath = window.location.pathname;
        const currentUrl = window.location.href;
        
        // Check if this is router navigation (not already refreshed)
        const isRouterNavigation = !currentUrl.includes('?refreshed=true');
        const needsRefresh = this.pageNeedsRefreshHack(currentPath);
        
        if (isRouterNavigation && needsRefresh) {
            console.log(`Router navigation to ${currentPath} detected - applying refresh hack`);
            
            // Add refresh flag to URL to prevent infinite refresh
            const separator = currentUrl.includes('?') ? '&' : '?';
            const newUrl = currentUrl + separator + 'refreshed=true';
            
            window.location.replace(newUrl);
            return true; // Indicate that refresh was triggered
        }
        
        return false; // No refresh needed
    }
    
    pageNeedsRefreshHack(path) {
        // Define which pages need the refresh hack
        const pagesNeedingRefresh = [
            '/',          // Home page (for PDF loading and birthday status)
            '/countdown', // Countdown page (for timer and memory game)
            '/wishes'     // Wishes page (for celebrate button)
        ];
        
        return pagesNeedingRefresh.includes(path);
    }
    
    loadPageScript(targetFile) {
        // Remove existing page scripts
        document.querySelectorAll('script[data-page-script]').forEach(script => {
            script.remove();
        });
        
        // Determine which script to load
        let scriptFile = null;
        switch (targetFile) {
            case 'index.html':
                scriptFile = 'index.js';
                break;
            case 'countdown.html':
                scriptFile = 'countdown.js';
                break;
            case 'wishes.html':
                scriptFile = 'wishes.js';
                break;
        }
        
        if (scriptFile) {
            const script = document.createElement('script');
            script.src = scriptFile + '?t=' + Date.now(); // Cache busting
            script.setAttribute('data-page-script', 'true');
            
            // Add error handling for script loading
            script.onerror = () => {
                console.error(`Failed to load script: ${scriptFile}`);
            };
            
            script.onload = () => {
                console.log(`Successfully loaded script: ${scriptFile}`);
            };
            
            document.head.appendChild(script);
        }
    }
}

// Initialize router when DOM is loaded - with singleton pattern
document.addEventListener('DOMContentLoaded', () => {
    if (!window.appRouter) {
        window.appRouter = new Router();
    }
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded
    if (!window.appRouter) {
        window.appRouter = new Router();
    }
}
