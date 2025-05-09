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
        
        homepageSections.forEach((section, index) => {
            const imageWrapper = section.querySelector('.homepage-image-wrapper');
            const content = section.querySelector('.homepage-content');
            
            const sectionTl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    markers: false
                }
            });
            
            sectionTl.to(imageWrapper, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out"
            });
            
            sectionTl.to(content, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out"
            }, "-=0.8");
        });
    }
    
    if (window.AppAnimations === undefined) {
        window.AppAnimations = {};
    }
    
    window.AppAnimations.setupHomepageSectionsAnimation = setupHomepageSectionsAnimation;
})();