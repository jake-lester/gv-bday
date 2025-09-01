// Birthday countdown - using shared config
const targetDate = window.BIRTHDAY_CONFIG.targetDate;

// Check if we should redirect to countdown (if before birthday)
function checkRedirect() {
    const now = new Date().getTime();
    const isPastBirthday = now >= targetDate;
    
    if (!isPastBirthday) {
        // Use router navigation instead of direct window.location
        if (window.appRouter) {
            window.appRouter.navigate('/countdown');
        } else {
            // Fallback to direct navigation if router isn't available
            window.location.href = '/countdown';
        }
        return false;
    }
    return true;
}

// DOM elements - will be initialized when page loads
let celebrateBtn;

// Sound effects (using Web Audio API for birthday sounds)
function playBirthdaySound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a simple celebratory tone sequence
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    frequencies.forEach((freq, index) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }, index * 200);
    });
}

// Confetti animation
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    const confettiCount = 25;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.opacity = '0.8';
            
            document.body.appendChild(confetti);
            
            // Animate confetti falling
            let position = -10;
            let rotation = 0;
            const speed = Math.random() * 3 + 2;
            const rotationSpeed = Math.random() * 10 + 5;
            
            const fall = setInterval(() => {
                position += speed;
                rotation += rotationSpeed;
                confetti.style.top = position + 'px';
                confetti.style.transform = `rotate(${rotation}deg)`;
                
                if (position > window.innerHeight + 20) {
                    clearInterval(fall);
                    if (document.body.contains(confetti)) {
                        document.body.removeChild(confetti);
                    }
                }
            }, 16);
        }, i * 80);
    }
}

// Epic postcard explosion effect
function explodePostcard() {
    const postcard = document.querySelector('.postcard');
    const postcardRect = postcard.getBoundingClientRect();
    
    // Create screen flash
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    document.body.appendChild(flash);
    
    // Create shockwave
    const shockwave = document.createElement('div');
    shockwave.className = 'shockwave';
    shockwave.style.left = (postcardRect.left + postcardRect.width / 2) + 'px';
    shockwave.style.top = (postcardRect.top + postcardRect.height / 2) + 'px';
    document.body.appendChild(shockwave);
    
    // Create particle explosion
    createParticleExplosion(postcardRect);
    
    // Explode the postcard
    postcard.classList.add('exploding');
    
    // Clean up effects after explosion
    setTimeout(() => {
        if (document.body.contains(flash)) document.body.removeChild(flash);
        if (document.body.contains(shockwave)) document.body.removeChild(shockwave);
        
        // Remove exploding class and hide postcard
        postcard.classList.remove('exploding');
        postcard.classList.add('hidden');
        
        // Start reinflation after a brief pause
        setTimeout(() => {
            postcard.classList.remove('hidden');
            postcard.classList.add('reinflating');
            
            // Remove reinflating class after animation completes
            setTimeout(() => {
                postcard.classList.remove('reinflating');
            }, 2000);
        }, 50);
    }, 1500);
}

// Create particle explosion
function createParticleExplosion(centerRect) {
    const particles = [
        '🎉', '🎊', '✨', '💥', '🌟', '⭐', '💫', '🎆', 
        '🎂', '🎈', '🎁', '🥳', '🔥', '💖', '🌈', '🦄'
    ];
    
    const centerX = centerRect.left + centerRect.width / 2;
    const centerY = centerRect.top + centerRect.height / 2;
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle birthday-emoji';
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            
            // Random explosion direction
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = Math.random() * 300 + 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            document.body.appendChild(particle);
            
            // Animate particle
            let x = 0;
            let y = 0;
            let opacity = 1;
            let scale = 1;
            let rotation = 0;
            
            const animate = () => {
                x += vx * 0.02;
                y += vy * 0.02;
                opacity -= 0.02;
                scale -= 0.01;
                rotation += 10;
                
                particle.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`;
                particle.style.opacity = opacity;
                
                if (opacity > 0 && scale > 0) {
                    requestAnimationFrame(animate);
                } else {
                    if (document.body.contains(particle)) {
                        document.body.removeChild(particle);
                    }
                }
            };
            
            requestAnimationFrame(animate);
        }, i * 20);
    }
}

// Fireworks effect
function createFireworks() {
    const fireworksCount = 5;
    
    for (let i = 0; i < fireworksCount; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'fixed';
            firework.style.left = Math.random() * 100 + 'vw';
            firework.style.top = Math.random() * 50 + 20 + 'vh';
            firework.style.pointerEvents = 'none';
            firework.style.zIndex = '1000';
            
            document.body.appendChild(firework);
            
            // Create sparks
            const sparkCount = 12;
            for (let j = 0; j < sparkCount; j++) {
                const spark = document.createElement('div');
                spark.style.position = 'absolute';
                spark.style.width = '4px';
                spark.style.height = '4px';
                spark.style.backgroundColor = '#ffd93d';
                spark.style.borderRadius = '50%';
                spark.style.boxShadow = '0 0 6px #ffd93d';
                
                const angle = (j / sparkCount) * 2 * Math.PI;
                const distance = 50;
                
                firework.appendChild(spark);
                
                // Animate sparks
                let sparkDistance = 0;
                const sparkSpeed = 2;
                
                const sparkAnimation = setInterval(() => {
                    sparkDistance += sparkSpeed;
                    const x = Math.cos(angle) * sparkDistance;
                    const y = Math.sin(angle) * sparkDistance;
                    
                    spark.style.left = x + 'px';
                    spark.style.top = y + 'px';
                    spark.style.opacity = 1 - (sparkDistance / distance);
                    
                    if (sparkDistance >= distance) {
                        clearInterval(sparkAnimation);
                    }
                }, 16);
            }
            
            // Remove firework after animation
            setTimeout(() => {
                if (document.body.contains(firework)) {
                    document.body.removeChild(firework);
                }
            }, 2000);
        }, i * 300);
    }
}

// Celebrate button functionality
function initCelebrateButton() {
    celebrateBtn = document.getElementById('celebrate-btn');
    
    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', () => {
            // Trigger the epic explosion sequence
            explodePostcard();
            
            // Play enhanced sound effects
            playBirthdaySound();
            
            // Create reduced confetti after explosion
            setTimeout(() => {
                createConfetti();
            }, 800);
            
            // Create fireworks during reinflation
            setTimeout(() => {
                createFireworks();
            }, 1800);
            
            // Add pulse animation to button
            celebrateBtn.style.animation = 'buttonCelebrate 0.6s ease-in-out';
            setTimeout(() => {
                celebrateBtn.style.animation = 'buttonPulse 2s ease-in-out infinite';
            }, 600);
        });
    }
}

// Add CSS animations for button and explosion effects
const style = document.createElement('style');
style.textContent = `
    @keyframes buttonCelebrate {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-5deg); }
        50% { transform: scale(1.2) rotate(5deg); }
        75% { transform: scale(1.1) rotate(-3deg); }
    }
    
    @keyframes buttonPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .exploding {
        animation: explode 1.5s ease-out forwards;
    }
    
    @keyframes explode {
        0% { transform: scale(1) rotate(0deg); opacity: 1; }
        50% { transform: scale(1.2) rotate(5deg); opacity: 0.8; }
        100% { transform: scale(0.1) rotate(180deg); opacity: 0; }
    }
    
    .hidden {
        opacity: 0 !important;
        transform: scale(0.1) !important;
    }
    
    .reinflating {
        animation: reinflate 2s ease-out forwards;
    }
    
    @keyframes reinflate {
        0% { transform: scale(0.1) rotate(180deg); opacity: 0; }
        50% { transform: scale(1.1) rotate(-5deg); opacity: 0.8; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    
    .screen-flash {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
        z-index: 9999;
        animation: flash 0.5s ease-out;
        pointer-events: none;
    }
    
    @keyframes flash {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    .shockwave {
        position: fixed;
        width: 50px;
        height: 50px;
        border: 3px solid #ffd93d;
        border-radius: 50%;
        z-index: 9998;
        animation: shockwave 1s ease-out;
        pointer-events: none;
    }
    
    @keyframes shockwave {
        0% { 
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% { 
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
    
    .particle {
        position: fixed;
        font-size: 20px;
        z-index: 9997;
        pointer-events: none;
    }
    
    .birthday-emoji {
        animation: sparkle 0.5s ease-out;
    }
    
    @keyframes sparkle {
        0% { transform: scale(0) rotate(0deg); }
        50% { transform: scale(1.2) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize page functionality
function initWishesPage() {
    // Check if we should redirect (if birthday hasn't arrived)
    if (!checkRedirect()) {
        return; // Will redirect, so don't continue initialization
    }
    
    // Initialize celebrate button functionality
    initCelebrateButton();
    
    // Add hover effects to birthday decorations
    const decorations = document.querySelectorAll('.balloon, .confetti, .cake');
    decorations.forEach(decoration => {
        decoration.addEventListener('mouseenter', () => {
            decoration.style.transform = 'scale(1.3) rotate(20deg)';
            decoration.style.transition = 'transform 0.3s ease';
        });
        
        decoration.addEventListener('mouseleave', () => {
            decoration.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Initialize when DOM is ready or on page change
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWishesPage);
} else {
    initWishesPage();
}

// Also listen for router page changes
window.addEventListener('pageChanged', (e) => {
    if (e.detail.targetFile === 'wishes.html') {
        setTimeout(initWishesPage, 100); // Small delay to ensure DOM is updated
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
