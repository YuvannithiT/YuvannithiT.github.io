'use strict';

export function loadAndAnimateQuote() {
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
};