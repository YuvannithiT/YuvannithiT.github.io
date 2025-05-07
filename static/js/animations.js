(function() {
    'use strict';

    window.addEventListener('load', function() {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        tl.to("header, footer", {
            opacity: 1,
            duration: 1
        }, 0);

        tl.to(".hero-greeting", { 
            opacity: 1, 
            x: 0, 
            duration: 0.8 
        })
        .to(".hero-greeting:before", { 
            width: "60px", 
            duration: 0.6 
        }, "-=0.4")
        
        if (typeof SplitText !== 'undefined') {
            const nameSplit = new SplitText(".hero-name", {type: "chars"});
            tl.to(nameSplit.chars, { 
                opacity: 1, 
                y: 0, 
                duration: 0.6,
                stagger: 0.03 
            }, "-=0.3");
        } else {
            tl.to(".hero-name", { 
                opacity: 1, 
                y: 0, 
                duration: 0.8 
            }, "-=0.3");
        }
        
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

        const quotes = [
            {
                text: "The essence of aerospace dynamics and control lies in designing minimal, robust control laws that integrate simplicity, performance, and adaptability—maintaining stability under a variety of conditions while accommodating uncertainties, practical limitations, and design constraints.",
                author: "- Yuvannithi Thirumaran"
            },
            {
                text: "Flying is learning how to throw yourself at the ground and miss.",
                author: "- Douglas Adams"
            },
            {
                text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
                author: "- Albert Einstein"
            },
            {
                text: "Everything should be made as simple as possible, but not simpler.",
                author: "- Albert Einstein"
            },
            {
                text: "In control system design, stability isn't everything, but instability is nothing.",
                author: "- Brian Anderson"
            },
            {
                text: "For once you have tasted flight you will walk the earth with your eyes turned skywards, for there you have been and there you will long to return.",
                author: "- Richard Bach"
            },
            {
                text: "All models are wrong, but some are useful.",
                author: "- George E. P. Box"
            },
            {
                text: "Engineering is not merely knowing and being knowledgeable, like a walking encyclopedia; engineering is not merely analysis; engineering is not merely the possession of the capacity to get elegant solutions to non-existent engineering problems; engineering is practicing the art of the organized forcing of technological change.",
                author: "- Gordon S. Brown"
            },
            {
                text: "When you want to know how things really work, study them when they're coming apart.",
                author: "- William Gibson"
            },
            {
                text: "The only way to discover the limits of the possible is to go beyond them into the impossible.",
                author: "- Arthur C. Clarke"
            },
            {
                text: "Aviation is the branch of engineering that is least forgiving of mistakes.",
                author: "- Freeman Dyson"
            },
            {
                text: "Flying is more than a sport and more than a job; flying is pure passion and desire, which fill a lifetime.",
                author: "- General Adolf Galland"
            },
            {
                text: "To invent an airplane is nothing. To build one is something. To fly is everything.",
                author: "- Ferdinand Ferber"
            },
            {
                text: "We choose to go to the Moon in this decade and do the other things, not because they are easy, but because they are hard...",
                author: "- John F. Kennedy"
            },
            {
                text: "I believe that this nation should commit itself to achieving the goal, before this decade is out, of landing a man on the Moon and returning him safely to the Earth.",
                author: "- John F. Kennedy"
            },
            {
                text: "The purpose of computing is insight, not numbers.",
                author: "- Richard Hamming"
            },
            {
                text: "The price of reliability is the pursuit of the utmost simplicity. It is a price which the very rich find most hard to pay.",
                author: "- C. A. R. Hoare"
            },
            {
                text: "It is not necessarily impossible for human beings to fly, but it so happens that God has not given them the knowledge of how to do it. It follows, therefore, that anyone who claims that he can fly must have sought the aid of the devil.",
                author: "- Giovanni Borelli"
            },
            {
                text: "Rockets are cool. There's no getting around that.",
                author: "- Elon Musk"
            },
            {
                text: "You want to wake up in the morning and think the future is going to be better... And that’s what being a spacefaring civilization is all about.",
                author: "- Elon Musk"
            },
            {
                text: "Space is for everybody. It's not just for a few people in science or math, or for a select group of astronauts. That's our new frontier out there, and it's everybody's business to know about space.",
                author: "- Christa McAuliffe"
            },
            {
                text: "Houston, Tranquility Base here. The Eagle has landed.",
                author: "- Neil Armstrong"
            },
            {
                text: "I am, and ever will be, a white-socks, pocket-protector, nerdy engineer, born under the second law of thermodynamics, steeped in steam tables, in love with free-body diagrams, transformed by Laplace and propelled by compressible flow.",
                author: "- Neil Armstrong"
            },
            {
                text: "That's one small step for [a] man, one giant leap for mankind.",
                author: "- Neil Armstrong"
            },
            {
                text: "The Wright Brothers created the single greatest cultural force since the invention of writing. The airplane became the first World Wide Web, bringing people, languages, ideas, and values together.",
                author: "- Bill Gates"
            },
            {
                text: "Look at the software... it was resilience that was the key. The ability to recover from errors.",
                author: "- Margaret Hamilton"
            },
            {
                text: "Let me say quite categorically that there is no such thing as a fuzzy concept... We do talk about fuzzy things but they are not scientific concepts. Some people in the past have discovered certain interesting things, formulated their findings in a non-fuzzy way, and therefore we have progressed in science.",
                author: "- Rudolf Kálmán"
            },
            {
                text: "The purpose of models is not to fit the data but to sharpen the questions.",
                author: "- Samuel Karlin"
            },
            {
                text: "Rockets are just another name for trouble. Either you just had trouble, you are having trouble, or you are going to have trouble.",
                author: "- Milt Rosen"
            },
            {
                text: "No one can realize how substantial the air is, until he feels its supporting power beneath him. It inspires confidence at once.",
                author: "- Otto Lilienthal"
            },
            {
                text: "We returned home, after this experiment (September, 1874), with the conviction that sailing flight was not the exclusive prerogative of birds, but that the possibility of man flying in this manner was established, since no powerful movement of wings, but only a skilful direction of the wings, was required for the purpose.",
                author: "- Otto Lilienthal"
            },
            {
                text: "One has to watch every minor deviation, every trend, every failure however small, because they may be the first signs of a major deviation, catastrophe or breakdown.",
                author: "- Igor Sikorsky"
            },
            {
                text: "Learning the secret of flight from a bird was a good deal like learning the secret of magic from a magician.",
                author: "- Orville Wright"
            },
            {
                text: "The stars don't look bigger, but they do look brighter.",
                author: "- Sally Ride"
            },
            {
                text: "Okay, Houston, we've had a problem here.",
                author: "- Jack Swigert"
            },
            {
                text: "My rockets are used to send man to the moon, not to destroy the cities on Earth.",
                author: "- Wernher von Braun"
            },
            {
                text: "There is no substitute for ground testing.",
                author: "- Wernher von Braun"
            },
            {
                text: "One test is worth a thousand expert opinions.",
                author: "- Wernher von Braun"
            },
            {
                text: "Basic research is what I’m doing when I don’t know what I am doing.",
                author: "- Wernher von Braun"
            },
            {
                text: "Don't tell me that man doesn't belong out there. Man belongs wherever he wants to go — and he'll do plenty well when he gets there.",
                author: "- Wernher von Braun"
            },
            {
                text: "We came in peace for all mankind.",
                author: "- Apollo 11 Lunar Module Plaque"
            },
            {
                text: "The Earth is the cradle of humanity, but mankind cannot stay in the cradle forever.",
                author: "- Konstantin Tsiolkovsky"
            },
            {
                text: "Design is the art of turning constraints into opportunities.",
                author: "- Aza Raskin"
            },
            {
                text: "Aviation is proof that given the will, we have the capacity to achieve the impossible.",
                author: "- Eddie Rickenbacker"
            },
            {
                text: "The ideal engineer is a composite … He is not a scientist, he is not a mathematician, he is not a sociologist or a writer; but he may use the knowledge and techniques of any or all of these disciplines in solving engineering problems.",
                author: "- Nathan W. Dougherty"
            },
            {
                text: "All stable processes we shall predict. All unstable processes we shall control.",
                author: "- John von Neumann"
            },
            {
                text: "Scientists study the world as it is; engineers create the world that has never been.",
                author: "- Theodore von Kármán"
            },
            {
                text: "The desire to fly is an idea handed down to us by our ancestors who, in their gruelling travels across trackless lands in prehistoric times, looked enviously on the birds soaring freely through space, at full speed, above all obstacles, on the infinite highway of the air.",
                author: "- Wilbur Wright"
            },
            {
                text: "The problem is not prediction, it is control.",
                author: "- Stafford Beer"
            },
            {
                text: "One man's 'magic' is another man's engineering. 'Supernatural' is a null word.",
                author: "- Robert A. Heinlein"
            },
            {
                text: "KISS: Keep It Simple, Stupid.",
                author: "- Kelly Johnson"
            },
            {
                text: "Science, my lad, is made up of mistakes, but they are mistakes which it is useful to make, because they lead little by little to the truth.",
                author: "- Jules Verne"
            },
            {
                text: "Somewhere, something incredible is waiting to be known.",
                author: "- Carl Sagan"
            },
            {
                text: "The airplane has unveiled for us the true face of the earth.",
                author: "- Antoine de Saint-Exupéry"
            },
            {
                text: "Science can amuse and fascinate us all, but it is engineering that changes the world.",
                author: "- Isaac Asimov"
            },
            {
                text: "The future of humanity is fundamentally linked with our ability to navigate the vastness of space.",
                author: "- Stephen Hawking"
            }
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        const typedQuote = document.getElementById('typed-quote');
        const quoteAuthor = document.getElementById('quote-author');
        
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
                typedQuote.textContent = '"' + randomQuote.text.substring(0, i+1);
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
                typedQuote.appendChild(cursor);
                
                setTimeout(() => {
                    quoteAuthor.textContent = '— ' + randomQuote.author.replace(/^- /, '');
                    gsap.fromTo(quoteAuthor, 
                        { x: 20, opacity: 0 }, 
                        { x: 0, opacity: 1, duration: 0.6 }
                    );
                    
                    gsap.to(cursor, { opacity: 0, duration: 0.3 });
                }, 300);
            }
        }, 1400);
    });
})();