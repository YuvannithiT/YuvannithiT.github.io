'use strict';

window.AppAnimations = window.AppAnimations || {};

export function createGlitchAnimation() {
    const heroNameElement = document.querySelector('.hero-name');
    if (!heroNameElement) return;
    
    const originalText = heroNameElement.textContent.trim();
    heroNameElement.textContent = '';
    heroNameElement.style.opacity = '1';
    heroNameElement.style.transform = 'translateY(0)';
    
    const glitchContainer = document.createElement('div');
    glitchContainer.className = 'glitch-container';
    heroNameElement.appendChild(glitchContainer);
    
    const glitchChars = `!@#$%^&*()_+-=[]{}|;:,./<>?\\'"¥£€¢§±×÷¡¿─━│┃┄┅┈┉◯◎◉○●◆◈░▒▓★✦✧←↑→↓↔↕↖↗↘↙▴▵▾▿▖▗▘▙▚▛▜▝▞▟≠≈∞∑∏√∂∇∈∉∪∩⊂⊃⠁⠂⠄⡀⣀⣄⣆⣇⣿ｱｲｳｴｵｯｼᚠᚢᚦᚨᚱᚲᚷᚹ`;
    const specialGlitchChars = `█▓▒░▄▀■□▪▫▬▲►▼◄◢◣◤◥◆◇◈⟦⟧⟨⟩▖▗▘▝▞▟✠✡✦✧✩✪ｱｲｳｴｵｯｼᚠᚢᚦᚨᚱᚲᚷᚹ∑∏∂∇`;
    const allGlitchChars = glitchChars + specialGlitchChars;
    
    const charDelay = 50;
    const glitchSpeed = 50;
    
    let currentIndex = 0;
    
    function animateNextChar() {
        if (currentIndex >= originalText.length) return;
        
        const charSpan = document.createElement('span');
        charSpan.className = 'glitch-char';
        glitchContainer.appendChild(charSpan);
        
        charSpan.textContent = getRandomGlitchChar();
        
        let glitchTime = 0;
        let glitchCycles = 0;
        const maxGlitchCycles = 5 + Math.floor(Math.random() * 5);
        
        const finalChar = originalText[currentIndex];
        
        const glitchInterval = setInterval(() => {
            glitchTime += glitchSpeed;
            glitchCycles++;
            
            const settlingProbability = glitchCycles / maxGlitchCycles;
            
            if (Math.random() < settlingProbability * 0.8) {
                charSpan.textContent = finalChar;
            } else if (Math.random() < 0.3) {
                charSpan.textContent = getRandomGlitchChar();
                
                if (Math.random() < 0.1) {
                    const originalColor = charSpan.style.color;
                    charSpan.style.color = 'cyan';
                    setTimeout(() => {
                        charSpan.style.color = originalColor;
                    }, 50);
                }
            }
            
            if (Math.random() < 0.15) {
                charSpan.style.transform = `translateY(${(Math.random() * 6) - 3}px)`;
            } else {
                charSpan.style.transform = '';
            }
            
            if (glitchCycles >= maxGlitchCycles) {
                clearInterval(glitchInterval);
                charSpan.textContent = finalChar;
                charSpan.style.transform = '';
                
                charSpan.className = 'glitch-char final';
            }
        }, glitchSpeed);
        
        currentIndex++;
        
        if (currentIndex < originalText.length) {
            setTimeout(animateNextChar, charDelay);
        } else {
            setTimeout(() => {
                const allChars = glitchContainer.querySelectorAll('.glitch-char');
                allChars.forEach(char => {
                    char.className = 'glitch-char final';
                });
                
                heroNameElement.style.fontFamily = "'Orbitron', sans-serif";
                heroNameElement.style.fontWeight = '900';
                heroNameElement.style.textAlign = 'center';
                heroNameElement.style.width = '100%';
                heroNameElement.style.lineHeight = '1.25';
                heroNameElement.style.background = 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%)';
                heroNameElement.style.webkitBackgroundClip = 'text';
                heroNameElement.style.webkitTextFillColor = 'transparent';
                heroNameElement.style.backgroundClip = 'text';
            }, 500);
        }
    }
    
    function getRandomGlitchChar() {
        return allGlitchChars.charAt(Math.floor(Math.random() * allGlitchChars.length));
    }
    
    setTimeout(() => {
        animateNextChar();
    }, 500);
};