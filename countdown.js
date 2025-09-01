// Birthday countdown - using shared config
const targetDate = window.BIRTHDAY_CONFIG.targetDate;

// Check if we're past the birthday date
function checkBirthdayStatus() {
    const now = new Date().getTime();
    const isPastBirthday = now >= targetDate;
    
    // Show/hide navigation links and birthday message
    const wishesNav = document.getElementById('wishes-nav');
    const birthdayArrived = document.getElementById('birthday-arrived');
    const bigWishesButton = document.getElementById('big-wishes-button');
    
    // Also check for elements that might exist across different pages
    const wishesNavHome = document.getElementById('wishes-nav-home');
    const wishesBtnHome = document.getElementById('wishes-btn-home');
    
    if (isPastBirthday) {
        // Show wishes navigation button
        if (wishesNav) {
            wishesNav.style.display = 'inline-block';
        }
        if (wishesNavHome) {
            wishesNavHome.style.display = 'block';
        }
        // Show birthday arrived message
        if (birthdayArrived) {
            birthdayArrived.style.display = 'block';
        }
        // Show big wishes button
        if (bigWishesButton) {
            bigWishesButton.style.display = 'block';
        }
        if (wishesBtnHome) {
            wishesBtnHome.style.display = 'inline-block';
        }
        return true;
    } else {
        // Hide elements when countdown is active
        if (wishesNav) {
            wishesNav.style.display = 'none';
        }
        if (wishesNavHome) {
            wishesNavHome.style.display = 'none';
        }
        if (birthdayArrived) {
            birthdayArrived.style.display = 'none';
        }
        if (bigWishesButton) {
            bigWishesButton.style.display = 'none';
        }
        if (wishesBtnHome) {
            wishesBtnHome.style.display = 'none';
        }
        return false;
    }
}

// DOM elements - will be initialized when page loads
let daysElement, hoursElement, minutesElement, secondsElement, excitementFill;
let countdownSection, birthdaySection, celebrateBtn;

// Initialize DOM elements
function initDOMElements() {
    daysElement = document.getElementById('days');
    hoursElement = document.getElementById('hours');
    minutesElement = document.getElementById('minutes');
    secondsElement = document.getElementById('seconds');
    excitementFill = document.getElementById('excitement-fill');
    countdownSection = document.getElementById('countdown-section');
    birthdaySection = document.getElementById('birthday-section');
    celebrateBtn = document.getElementById('celebrate-btn');
}

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
    const confettiCount = 25; // Reduced from 50 to 25
    
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
        }, i * 80); // Slower spawn rate
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

// Update countdown timer
function updateCountdown() {
    // Ensure DOM elements are initialized
    if (!daysElement) {
        initDOMElements();
    }
    
    // Return early if elements still don't exist (page not loaded)
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }
    
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    // Always check birthday status first
    const isBirthdayTime = checkBirthdayStatus();
    
    if (distance < 0 || isBirthdayTime) {
        // Birthday has arrived! Show zeros and birthday message
        updateNumberWithAnimation(daysElement, 0);
        updateNumberWithAnimation(hoursElement, 0);
        updateNumberWithAnimation(minutesElement, 0);
        updateNumberWithAnimation(secondsElement, 0);
        
        // Full excitement meter
        if (excitementFill) {
            excitementFill.style.width = '100%';
        }
        return;
    }
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display with smooth animation
    updateNumberWithAnimation(daysElement, days);
    updateNumberWithAnimation(hoursElement, hours);
    updateNumberWithAnimation(minutesElement, minutes);
    updateNumberWithAnimation(secondsElement, seconds);
    
    // Update excitement meter based on how close we are
    if (excitementFill) {
        const totalSeconds = distance / 1000;
        const oneYear = 365 * 24 * 60 * 60; // seconds in a year
        const excitement = Math.max(0, Math.min(100, 100 - (totalSeconds / oneYear * 100)));
        excitementFill.style.width = excitement + '%';
    }
    
    // Add special effects when getting close
    if (days === 0 && hours === 0 && minutes === 0 && seconds <= 10) {
        document.body.style.animation = 'finalCountdown 1s ease-in-out infinite';
    }
}

// Smooth number animation
function updateNumberWithAnimation(element, newValue) {
    if (!element) return; // Safety check
    
    const currentValue = parseInt(element.textContent) || 0;
    const formattedValue = newValue.toString().padStart(2, '0');
    
    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.2)';
        element.style.color = '#ffd93d';
        
        setTimeout(() => {
            if (element) { // Double-check element still exists
                element.textContent = formattedValue;
                element.style.transform = 'scale(1)';
                element.style.color = 'white';
            }
        }, 150);
    }
}

// Memory Game Logic (included from the previous implementation)
class TechMemoryGame {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.moves = 0;
        this.matches = 0;
        this.gameStartTime = null;
        this.gameTimer = null;
        this.elapsedTime = 0;
        this.highScore = parseInt(localStorage.getItem('memoryGameHighScore')) || 0;
        this.bestTime = localStorage.getItem('memoryGameBestTime') || null;
        this.flippedCards = [];
        this.isProcessing = false;
        this.gameBoard = [];
        
        this.achievements = {
            'first-match': false,
            'speed-master': false,
            'memory-genius': false,
            'tech-expert': false
        };
        
        // Load achievements from localStorage
        const savedAchievements = localStorage.getItem('memoryGameAchievements');
        if (savedAchievements) {
            this.achievements = { ...this.achievements, ...JSON.parse(savedAchievements) };
        }
        
        this.cardTypes = [
            { icon: '💻', label: 'Computer', id: 'computer' },
            { icon: '🖥️', label: 'Monitor', id: 'monitor' },
            { icon: '⌨️', label: 'Keyboard', id: 'keyboard' },
            { icon: '🖱️', label: 'Mouse', id: 'mouse' },
            { icon: '📱', label: 'Phone', id: 'phone' },
            { icon: '🔌', label: 'Plugin', id: 'plugin' },
            { icon: '💾', label: 'Save', id: 'save' },
            { icon: '📊', label: 'Chart', id: 'chart' },
            { icon: '🔒', label: 'Security', id: 'security' },
            { icon: '☁️', label: 'Cloud', id: 'cloud' },
            { icon: '🚀', label: 'Launch', id: 'launch' },
            { icon: '⚙️', label: 'Settings', id: 'settings' },
            { icon: '🔍', label: 'Search', id: 'search' },
            { icon: '📡', label: 'Network', id: 'network' },
            { icon: '🔗', label: 'Link', id: 'link' },
            { icon: '🛡️', label: 'Shield', id: 'shield' }
        ];
        
        this.init();
    }
    
    init() {
        this.updateUI();
        this.displayAchievements();
        this.updateLeaderboard();
        this.createNewGame();
        
        // Event listeners
        document.getElementById('new-game').addEventListener('click', () => this.createNewGame());
        document.getElementById('shuffle-cards').addEventListener('click', () => this.shuffleCards());
        document.getElementById('peek-cards').addEventListener('click', () => this.peekCards());
        
        // Achievement click effects
        document.querySelectorAll('.achievement').forEach(achievement => {
            achievement.addEventListener('click', () => {
                if (achievement.classList.contains('unlocked')) {
                    achievement.style.animation = 'achievementUnlock 0.8s ease-out';
                    setTimeout(() => {
                        achievement.style.animation = '';
                    }, 800);
                }
            });
        });
    }
    
    createNewGame() {
        this.clearGame();
        this.setupGameBoard();
        this.startTimer();
        this.showFeedback('New game started! Match the tech pairs!', 'info');
    }
    
    clearGame() {
        this.moves = 0;
        this.matches = 0;
        this.flippedCards = [];
        this.isProcessing = false;
        this.elapsedTime = 0;
        this.gameStartTime = Date.now();
        
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
        }
        
        document.getElementById('game-feedback').innerHTML = '';
        this.updateUI();
    }
    
    setupGameBoard() {
        const boardSize = this.getBoardSize();
        const cardsNeeded = boardSize / 2;
        
        // Select random cards for this level
        const selectedCards = this.cardTypes.slice(0, cardsNeeded);
        
        // Create pairs
        this.gameBoard = [...selectedCards, ...selectedCards];
        
        // Shuffle the board
        this.shuffleArray(this.gameBoard);
        
        this.renderBoard();
    }
    
    getBoardSize() {
        switch (this.currentLevel) {
            case 1: return 8;  // 2x4 grid
            case 2: return 12; // 3x4 grid
            case 3: return 16; // 4x4 grid
            case 4: return 20; // 4x5 grid
            case 5: return 24; // 4x6 grid
            default: return 8;
        }
    }
    
    renderBoard() {
        const gameBoard = document.getElementById('game-board');
        const boardSize = this.getBoardSize();
        const cols = boardSize <= 12 ? 4 : Math.ceil(Math.sqrt(boardSize));
        
        gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gameBoard.innerHTML = '';
        
        this.gameBoard.forEach((card, index) => {
            const cardElement = this.createCardElement(card, index);
            gameBoard.appendChild(cardElement);
        });
    }
    
    createCardElement(card, index) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'memory-card';
        cardDiv.dataset.cardId = card.id;
        cardDiv.dataset.index = index;
        
        cardDiv.innerHTML = `
            <div class="card-front">❓</div>
            <div class="card-back">
                <div class="card-icon">${card.icon}</div>
                <div class="card-label">${card.label}</div>
            </div>
        `;
        
        cardDiv.addEventListener('click', () => this.flipCard(cardDiv, index));
        
        return cardDiv;
    }
    
    flipCard(cardElement, index) {
        if (this.isProcessing || 
            cardElement.classList.contains('flipped') || 
            cardElement.classList.contains('matched') ||
            this.flippedCards.length >= 2) {
            return;
        }
        
        cardElement.classList.add('flipped');
        this.flippedCards.push({ element: cardElement, index: index, cardId: this.gameBoard[index].id });
        this.moves++;
        this.updateUI();
        
        if (this.flippedCards.length === 2) {
            this.isProcessing = true;
            setTimeout(() => this.checkMatch(), 600);
        }
    }
    
    checkMatch() {
        const [card1, card2] = this.flippedCards;
        
        if (card1.cardId === card2.cardId) {
            // Match found!
            card1.element.classList.add('matched');
            card2.element.classList.add('matched');
            card1.element.classList.remove('flipped');
            card2.element.classList.remove('flipped');
            
            this.matches++;
            this.score += this.calculateMatchScore();
            
            this.checkAchievements();
            this.showFeedback('🎉 Match found!', 'correct');
            
            if (this.matches === this.gameBoard.length / 2) {
                this.completeLevel();
            }
        } else {
            // No match
            setTimeout(() => {
                card1.element.classList.remove('flipped');
                card2.element.classList.remove('flipped');
            }, 500);
        }
        
        this.flippedCards = [];
        this.isProcessing = false;
    }
    
    calculateMatchScore() {
        const baseScore = 100;
        const levelBonus = this.currentLevel * 20;
        const timeBonus = Math.max(0, 50 - Math.floor(this.elapsedTime / 1000));
        const movesPenalty = Math.max(0, this.moves - 10) * 2;
        
        return Math.max(50, baseScore + levelBonus + timeBonus - movesPenalty);
    }
    
    completeLevel() {
        this.stopTimer();
        const completionBonus = 500 + (this.currentLevel * 100);
        this.score += completionBonus;
        
        this.showFeedback(`🏆 Level ${this.currentLevel} Complete! +${completionBonus} bonus!`, 'correct');
        
        // Update records
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('memoryGameHighScore', this.highScore);
        }
        
        const currentTimeStr = this.formatTime(this.elapsedTime);
        if (!this.bestTime || this.elapsedTime < this.parseTime(this.bestTime)) {
            this.bestTime = currentTimeStr;
            localStorage.setItem('memoryGameBestTime', this.bestTime);
        }
        
        this.updateLeaderboard();
        
        // Level up
        if (this.currentLevel < 5) {
            setTimeout(() => {
                this.currentLevel++;
                this.showFeedback(`🚀 Advanced to Level ${this.currentLevel}!`, 'info');
                setTimeout(() => this.createNewGame(), 1500);
            }, 2000);
        } else {
            this.showFeedback('🎊 Congratulations! You\'ve mastered all levels!', 'correct');
        }
        
        this.updateUI();
    }
    
    shuffleCards() {
        if (this.flippedCards.length > 0 || this.isProcessing) return;
        
        this.shuffleArray(this.gameBoard);
        this.renderBoard();
        this.showFeedback('🔄 Cards shuffled!', 'info');
    }
    
    peekCards() {
        if (this.isProcessing) return;
        
        const cards = document.querySelectorAll('.memory-card:not(.matched)');
        cards.forEach(card => card.classList.add('flipped'));
        
        this.showFeedback('👁️ Peeking... memorize quickly!', 'info');
        
        setTimeout(() => {
            cards.forEach(card => {
                if (!card.classList.contains('matched')) {
                    card.classList.remove('flipped');
                }
            });
        }, 2000);
    }
    
    startTimer() {
        this.gameTimer = setInterval(() => {
            this.elapsedTime = Date.now() - this.gameStartTime;
            document.getElementById('game-timer').textContent = this.formatTime(this.elapsedTime);
        }, 1000);
    }
    
    stopTimer() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
    }
    
    formatTime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        return minutes > 0 ? `${minutes}m ${seconds % 60}s` : `${seconds}s`;
    }
    
    parseTime(timeStr) {
        const match = timeStr.match(/(?:(\d+)m\s*)?(\d+)s/);
        if (match) {
            const minutes = parseInt(match[1] || 0);
            const seconds = parseInt(match[2]);
            return (minutes * 60 + seconds) * 1000;
        }
        return Infinity;
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    showFeedback(message, type) {
        const feedback = document.getElementById('game-feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        
        setTimeout(() => {
            feedback.textContent = '';
            feedback.className = 'feedback';
        }, 3000);
    }
    
    checkAchievements() {
        // First Match
        if (!this.achievements['first-match'] && this.matches === 1) {
            this.achievements['first-match'] = true;
            this.unlockAchievement('first-match');
        }
        
        // Speed Master (complete level 1 in under 30 seconds)
        if (!this.achievements['speed-master'] && this.currentLevel === 1 && 
            this.matches === 4 && this.elapsedTime < 30000) {
            this.achievements['speed-master'] = true;
            this.unlockAchievement('speed-master');
        }
        
        // Memory Genius (complete a level with perfect efficiency - minimum moves)
        const minMoves = this.gameBoard.length / 2;
        if (!this.achievements['memory-genius'] && 
            this.matches === minMoves && this.moves === minMoves) {
            this.achievements['memory-genius'] = true;
            this.unlockAchievement('memory-genius');
        }
        
        // Tech Expert (reach level 5)
        if (!this.achievements['tech-expert'] && this.currentLevel >= 5) {
            this.achievements['tech-expert'] = true;
            this.unlockAchievement('tech-expert');
        }
        
        localStorage.setItem('memoryGameAchievements', JSON.stringify(this.achievements));
    }
    
    unlockAchievement(achievementId) {
        const achievementEl = document.querySelector(`[data-achievement="${achievementId}"]`);
        achievementEl.classList.remove('locked');
        achievementEl.classList.add('unlocked');
        
        this.showFeedback(`🏆 Achievement Unlocked: ${achievementEl.querySelector('.achievement-name').textContent}!`, 'info');
    }
    
    displayAchievements() {
        Object.keys(this.achievements).forEach(achievementId => {
            if (this.achievements[achievementId]) {
                const achievementEl = document.querySelector(`[data-achievement="${achievementId}"]`);
                achievementEl.classList.remove('locked');
                achievementEl.classList.add('unlocked');
            }
        });
    }
    
    updateUI() {
        document.getElementById('current-level').textContent = this.currentLevel;
        document.getElementById('game-score').textContent = this.score;
        document.getElementById('move-count').textContent = this.moves;
    }
    
    updateLeaderboard() {
        document.getElementById('high-score').textContent = this.highScore;
        document.getElementById('best-time').textContent = this.bestTime || '--';
    }
}

// Initialize the minigame
let memoryGame;

// Add CSS animation for final countdown
const style = document.createElement('style');
style.textContent = `
    @keyframes finalCountdown {
        0%, 100% { 
            filter: hue-rotate(0deg) brightness(1); 
        }
        50% { 
            filter: hue-rotate(180deg) brightness(1.2); 
        }
    }
    
    @keyframes buttonCelebrate {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-5deg); }
        50% { transform: scale(1.2) rotate(5deg); }
        75% { transform: scale(1.1) rotate(-3deg); }
    }
`;
document.head.appendChild(style);

// Countdown initialization is now handled in initCountdownPage()

// Add some interactive elements
// Initialize countdown page functionality
function initCountdownPage() {
    // Initialize DOM elements first
    initDOMElements();
    
    // Start the countdown immediately
    updateCountdown();
    
    // Clear any existing countdown interval
    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }
    
    // Start the countdown interval
    window.countdownInterval = setInterval(updateCountdown, 1000);
    
    // Add click effects to countdown items
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(1.1) rotateY(360deg)';
            setTimeout(() => {
                item.style.transform = 'scale(1) rotateY(0deg)';
            }, 600);
        });
    });
    
    // Update the year display using config
    const dateDisplay = document.querySelector('.date-display p');
    if (dateDisplay) {
        dateDisplay.textContent = `Until ${window.BIRTHDAY_CONFIG.birthdayMonth} ${window.BIRTHDAY_CONFIG.birthdayDay}, ${window.BIRTHDAY_CONFIG.birthdayYear}`;
    }
    
    // Check birthday status on load
    if (typeof checkBirthdayStatus === 'function') {
        checkBirthdayStatus();
    }
    
    // Initialize the Tech Memory Game
    if (typeof TechMemoryGame !== 'undefined') {
        window.memoryGame = new TechMemoryGame();
    }
}

// Initialize when DOM is ready or on page change
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdownPage);
} else {
    initCountdownPage();
}

// Also listen for router page changes
window.addEventListener('pageChanged', (e) => {
    if (e.detail.targetFile === 'countdown.html') {
        setTimeout(initCountdownPage, 100); // Small delay to ensure DOM is updated
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
