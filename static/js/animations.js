(function() {
    'use strict';

    window.addEventListener('load', function() {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to("header, footer", {
            opacity: 1,
            duration: 1
        }, 0);

        if (window.AppAnimations && typeof window.AppAnimations.createGlitchAnimation === 'function') {
            window.AppAnimations.createGlitchAnimation();
        } else {
            console.warn('createGlitchAnimation function not found.');
        }

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
        
        if (window.AppAnimations && typeof window.AppAnimations.loadAndAnimateQuote === 'function') {
            window.AppAnimations.loadAndAnimateQuote();
        } else {
            console.warn('loadAndAnimateQuote function not found.');
        }
    });
    
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
})();