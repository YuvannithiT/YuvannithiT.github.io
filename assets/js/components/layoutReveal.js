'use strict';

window.addEventListener('load', () => {
    if (typeof gsap !== 'undefined') {
        gsap.to('header, footer', {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
        });
    } else {
        document.querySelectorAll('header, footer').forEach(el => {
            el.style.opacity = 1;
        });
    }
});