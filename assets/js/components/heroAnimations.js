'use strict';

import { createGlitchAnimation } from './glitch.js';
import { loadAndAnimateQuote } from './quote.js'; 

window.addEventListener('load', function() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (typeof createGlitchAnimation === 'function') {
        createGlitchAnimation();
    } else {
        console.warn('createGlitchAnimation function not imported or not a function.');
    }

    tl.to(".hero-name", {
        opacity: 1,
        y: 0,
        duration: 0.8
    });

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
    
    tl.to(".poster-wrapper", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
    }, "-=0.7");
    
    if (typeof loadAndAnimateQuote === 'function') {
        loadAndAnimateQuote();
    } else {
        console.warn('loadAndAnimateQuote function not imported or not a function.');
    }
});