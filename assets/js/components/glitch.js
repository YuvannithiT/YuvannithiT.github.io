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

    // Refined, more "engineering-grade" glitch character set
    const glitchChars = `░▒▓█▁▂▃▄▅▆▇▉▊▌▍▎▏─━│┃∑∏∂∇∞≠≈⊂⊃∈∉◈◆◇◉●○`;
    const precisionChars = `█▓▒░▄▀▌▐■□◆◈∑∏∂∇`;
    const allGlitchChars = glitchChars + precisionChars;

    /* ---- Tuned Parameters (Key Improvements) ---- */
    const charDelay = 130;          // slower, more intentional
    const glitchSpeed = 55;        // less frantic
    const minGlitchCycles = 4;
    const maxExtraCycles = 3;      // total cycles: 4–7
    const colorFlashProbability = 0.045;
    const verticalJitterPx = 2;    // micro jitter only

    let currentIndex = 0;

    function animateNextChar() {
        if (currentIndex >= originalText.length) return;

        const charSpan = document.createElement('span');
        charSpan.className = 'glitch-char';
        glitchContainer.appendChild(charSpan);

        charSpan.textContent = getRandomGlitchChar();

        let glitchCycles = 0;
        const maxGlitchCycles =
            minGlitchCycles + Math.floor(Math.random() * maxExtraCycles);

        const finalChar = originalText[currentIndex];

        const glitchInterval = setInterval(() => {
            glitchCycles++;

            // Gradual stabilization curve (control-system-like)
            const settleFactor = glitchCycles / maxGlitchCycles;

            if (Math.random() < settleFactor) {
                charSpan.textContent = finalChar;
            } else {
                charSpan.textContent = getRandomGlitchChar();
            }

            // Extremely subtle vertical perturbation
            if (Math.random() < 0.12) {
                charSpan.style.transform =
                    `translateY(${(Math.random() * verticalJitterPx) - verticalJitterPx / 2}px)`;
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
            setTimeout(finalizeText, 450);
        }
    }

    function finalizeText() {
        const allChars = glitchContainer.querySelectorAll('.glitch-char');
        allChars.forEach(char => {
            char.className = 'glitch-char final';
        });

        heroNameElement.style.fontFamily = "'Cropaso', sans-serif";
        heroNameElement.style.fontWeight = 'normal';
        heroNameElement.style.textAlign = 'center';
        heroNameElement.style.width = '100%';
        heroNameElement.style.lineHeight = '1.25';

        // Clean aerospace-grade gradient
        // heroNameElement.style.background = 'radial-gradient(ellipse at center, var(--secondary-color), var(--primary-color))';
        // heroNameElement.style.webkitBackgroundClip = 'text';
        // heroNameElement.style.webkitTextFillColor = 'transparent';
        // heroNameElement.style.backgroundClip = 'text';
    }

    function getRandomGlitchChar() {
        return allGlitchChars.charAt(
            Math.floor(Math.random() * allGlitchChars.length)
        );
    }

    setTimeout(animateNextChar, 450);
}