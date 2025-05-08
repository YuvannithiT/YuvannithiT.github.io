(function() {
    'use strict';

    window.addEventListener('load', function() {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to("header, footer", {
            opacity: 1,
            duration: 1
        }, 0);

        createGlitchAnimation();

        tl.to(".hero-greeting", {
            opacity: 1,
            x: 0,
            duration: 0.8
        }, "-=0.3")
        
        tl.to(".hero-description", {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, "-=0.5");

        tl.to(".quote-container", {
            opacity: 1,
            x: 0,
            duration: 1.2
        }, "-=0.4");

        setupPosterScrollAnimation();
        
        loadAndAnimateQuote();
    });
    
    function createGlitchAnimation() {
        const heroNameElement = document.querySelector('.hero-name');
        if (!heroNameElement) return;
        
        const originalText = heroNameElement.textContent.trim();
        heroNameElement.textContent = '';
        heroNameElement.style.opacity = '1';
        heroNameElement.style.transform = 'translateY(0)';
        
        const glitchContainer = document.createElement('div');
        glitchContainer.className = 'glitch-container';
        heroNameElement.appendChild(glitchContainer);
        
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,./<>?`~\\\'\"¥£€¢§±×÷¡¿';
        const specialGlitchChars = '█▓▒░▄▀■□▪▫▬▲►▼◄◊○●◘◙♠♣♥♦';
        const allGlitchChars = glitchChars + specialGlitchChars;
        
        const charDelay = 100;
        const glitchDuration = 1500;
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
            const maxGlitchCycles = 8 + Math.floor(Math.random() * 7);
            
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
    }
    
    function setupPosterScrollAnimation() {
        gsap.registerPlugin(ScrollTrigger);
        
        const posterTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".poster-section",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                markers: false
            }
        });
        
        posterTl.to(".poster-wrapper", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    }
    
    function loadAndAnimateQuote() {
        fetch('/data/quotes.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(quotes => {
                if (!quotes || quotes.length === 0) {
                    console.warn("No quotes loaded or quotes array is empty. Typewriter animation will not run.");
                    const typedQuote = document.getElementById('typed-quote');
                    if (typedQuote) {
                        typedQuote.textContent = "Could not load quotes at this moment.";
                    }
                    return;
                }

                const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                const typedQuote = document.getElementById('typed-quote');
                const quoteAuthor = document.getElementById('quote-author');

                if (!typedQuote || !quoteAuthor) {
                    console.error("Quote elements not found in the DOM.");
                    return;
                }

                typedQuote.textContent = '"';
                quoteAuthor.textContent = "";

                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                typedQuote.appendChild(cursor);

                let i = 0;
                let baseSpeed = 50;

                setTimeout(function typeWriter() {
                    if (i < randomQuote.text.length) {
                        cursor.remove();
                        typedQuote.textContent = '"' + randomQuote.text.substring(0, i + 1);
                        typedQuote.appendChild(cursor);

                        let variance = Math.random() * 50;
                        let currentSpeed = baseSpeed + variance;

                        if ('.,:;?!'.includes(randomQuote.text.charAt(i))) {
                            currentSpeed += 200;
                        }

                        i++;
                        setTimeout(typeWriter, currentSpeed);
                    } else {
                        cursor.remove();
                        typedQuote.textContent = '"' + randomQuote.text + '"';

                        setTimeout(() => {
                            quoteAuthor.textContent = '— ' + randomQuote.author.replace(/^- /, '');
                            gsap.fromTo(quoteAuthor,
                                { x: 20, opacity: 0 },
                                { x: 0, opacity: 1, duration: 0.6 }
                            );

                            if (typedQuote.contains(cursor)) {
                                gsap.to(cursor, { opacity: 0, duration: 0.3, onComplete: () => cursor.remove() });
                            }
                        }, 300);
                    }
                }, 1400);
            })
            .catch(error => {
                console.error('Error fetching or processing quotes:', error);
                const typedQuote = document.getElementById('typed-quote');
                if (typedQuote) {
                    typedQuote.textContent = "Sorry, could not load a quote right now.";
                }
            });
    }
})();