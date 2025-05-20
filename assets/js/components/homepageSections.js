'use strict';

function setupHomepageSectionsAnimation() {
    if (!window.gsap || !window.ScrollTrigger) {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    const homepageSections = document.querySelectorAll('.homepage-section');
    
    homepageSections.forEach((section, index) => {
        const imageWrapper = section.querySelector('.homepage-image-wrapper');
        const content = section.querySelector('.homepage-content');
        
        gsap.set(imageWrapper, {
            opacity: 0,
            x: index % 2 === 0 ? 50 : -50,
            y: 30
        });
        
        gsap.set(content, {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            y: 30
        });
        
        const sectionTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                markers: false
            }
        });
        
        const direction = index % 2 === 0 ? -50 : 50;
        
        sectionTl.to(imageWrapper, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
        });
        
        sectionTl.to(content, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.8");
    });
}

window.addEventListener('load', function() {
    setupHomepageSectionsAnimation();
});