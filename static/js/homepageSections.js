(function() {
    'use strict';

    window.addEventListener('load', function() {
        setupHomepageSectionsAnimation();
    });

    function setupHomepageSectionsAnimation() {
        if (!window.gsap || !window.ScrollTrigger) {
            console.warn('GSAP or ScrollTrigger not loaded');
            return;
        }
        
        const homepageSections = document.querySelectorAll('.homepage-section');
        
        const animationStates = new Map();
        
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
                    toggleActions: "play none none none",
                    markers: false,
                    onEnter: () => {
                        animationStates.set(section, true);
                    }
                }
            });
            
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
        
        document.addEventListener('menu:beforeOpen', function() {
            ScrollTrigger.getAll().forEach(trigger => {
                trigger.disable(false);
            });
        });
        
        document.addEventListener('menu:afterClose', function() {
            ScrollTrigger.getAll().forEach(trigger => {
                trigger.enable(false);
            });
        });
    }

    if (window.AppAnimations === undefined) {
        window.AppAnimations = {};
    }

    window.AppAnimations.setupHomepageSectionsAnimation = setupHomepageSectionsAnimation;
})();