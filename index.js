// Birthday countdown - using shared config
const targetDate = window.BIRTHDAY_CONFIG.targetDate;

// Check birthday status and update UI accordingly
function updateBirthdayStatus() {
    const now = new Date().getTime();
    const isPastBirthday = now >= targetDate;
    
    const wishesNavHome = document.getElementById('wishes-nav-home');
    const wishesBtnHome = document.getElementById('wishes-btn-home');
    const birthdayStatus = document.getElementById('birthday-status');
    
    // Check if page was refreshed (has proper DOM timing)
    const isRefreshed = window.location.href.includes('?refreshed=true');
    
    if (isPastBirthday && isRefreshed) {
        // Show wishes navigation and button only if past birthday AND refreshed
        if (wishesNavHome) wishesNavHome.style.display = 'block';
        if (wishesBtnHome) wishesBtnHome.style.display = 'inline-block';
        
        // Show birthday arrived status
        if (birthdayStatus) {
            birthdayStatus.innerHTML = `
                <div class="birthday-arrived">
                    <h2 class="birthday-title">🎉 It's Birthday! 🎉</h2>
                    <p class="birthday-message">The special day has arrived! Check out the countdown or view the birthday wishes.</p>
                </div>
            `;
        }
    } else {
        // Hide wishes elements when countdown is active OR not properly refreshed
        if (wishesNavHome) wishesNavHome.style.display = 'none';
        if (wishesBtnHome) wishesBtnHome.style.display = 'none';
        
        // Show countdown status
        const distance = targetDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (birthdayStatus) {
            birthdayStatus.innerHTML = `
                <div class="countdown-preview">
                    <h3 style="color: white; margin-bottom: 1rem;">⏰ Countdown Status</h3>
                    <p style="color: rgba(255, 255, 255, 0.9); font-size: 1.2rem; margin-bottom: 1rem;">
                        <strong>${days} days and ${hours} hours</strong> until birthday!
                    </p>
                    <p style="color: rgba(255, 255, 255, 0.8);">
                        Join the countdown and play the memory game while we wait for the celebration.
                    </p>
                </div>
            `;
        }
    }
}

// Create gentle background animations
function createBackgroundElements() {
    const container = document.querySelector('.background-animation');
    if (!container) return;
    
    // Add more elements for the landing page
    const additionalElements = ['💻', '🚀', '💡', '⚙️'];
    
    additionalElements.forEach((emoji, index) => {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = emoji;
        element.style.top = Math.random() * 100 + '%';
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = (index + 6) + 's';
        container.appendChild(element);
    });
}

// Add interactive hover effects to feature cards
function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-10px) scale(1)';
        });
    });
}

// Add click effects to hero buttons
function initializeHeroButtons() {
    const heroButtons = document.querySelectorAll('.hero-btn');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation CSS
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .hero-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .countdown-preview, .birthday-arrived {
            animation: statusFadeIn 1s ease-out;
        }
        
        @keyframes statusFadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize index page functionality
function initIndexPage() {
    // Update birthday status
    updateBirthdayStatus();
    
    // Initialize interactive elements
    initializeFeatureCards();
    initializeHeroButtons();
    
    // Add background elements
    createBackgroundElements();
    
    // Add styles
    addRippleStyles();
    
    // Update status every minute (clear any existing interval first)
    if (window.birthdayStatusInterval) {
        clearInterval(window.birthdayStatusInterval);
    }
    window.birthdayStatusInterval = setInterval(updateBirthdayStatus, 60000);
}

// Initialize when DOM is ready or on page change
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIndexPage);
} else {
    initIndexPage();
}

// Also listen for router page changes
window.addEventListener('pageChanged', (e) => {
    if (e.detail.targetFile === 'index.html') {
        setTimeout(initIndexPage, 100); // Small delay to ensure DOM is updated
    }
});

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    const animations = document.querySelectorAll('*');
    if (document.hidden) {
        animations.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        animations.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});
