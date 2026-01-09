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

    // Full original glitch character set
    const glitchChars = `░▒▓█▁▂▃▄▅▆▇▉▊▌▍▎▏─━│┃∑∏∂∇∞≠≈⊂⊃∈∉◈◆◇◉●○θφψαβγ±≤≥∫Δ→←↑↓⊗⊕`;
    const precisionChars = `█▓▒░▄▀▌▐■□◆◈∑∏∂∇θφψαβγ±≤≥∫Δ→←↑↓⊗⊕`;
    const allGlitchChars = glitchChars + precisionChars;

    /* ---- Smooth Parameters (No Hiccups) ---- */
    const charDelay = 35;              // Consistent character progression
    const glitchSpeed = 55;            // Smooth glitch update rate
    const glitchCycles = 7;            // Fixed cycles for predictability

    let currentIndex = 0;
    const charSpans = [];

    function animateNextChar() {
        if (currentIndex >= originalText.length) return;

        const charSpan = document.createElement('span');
        charSpan.className = 'glitch-char';
        glitchContainer.appendChild(charSpan);
        charSpans.push(charSpan);

        const finalChar = originalText[currentIndex];
        let cycles = 0;

        const glitchInterval = setInterval(() => {
            cycles++;

            // Smooth probability-based stabilization
            const stabilityThreshold = (cycles / glitchCycles) * 0.9;

            if (Math.random() < stabilityThreshold) {
                charSpan.textContent = finalChar;
            } else {
                charSpan.textContent = allGlitchChars.charAt(
                    Math.floor(Math.random() * allGlitchChars.length)
                );
            }

            if (cycles >= glitchCycles) {
                clearInterval(glitchInterval);
                charSpan.textContent = finalChar;
                charSpan.className = 'glitch-char final';
            }
        }, glitchSpeed);

        currentIndex++;

        if (currentIndex < originalText.length) {
            setTimeout(animateNextChar, charDelay);
        } else {
            setTimeout(finalizeText, 350);
        }
    }

    function finalizeText() {
        charSpans.forEach(char => {
            char.textContent = originalText[charSpans.indexOf(char)];
            char.className = 'glitch-char final';
        });

        heroNameElement.style.fontFamily = "'Cropaso', sans-serif";
        heroNameElement.style.fontWeight = 'normal';
        heroNameElement.style.textAlign = 'center';
        heroNameElement.style.width = '100%';
        heroNameElement.style.lineHeight = '1.25';
    }

    // Start animation
    setTimeout(animateNextChar, 300);
}