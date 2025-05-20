'use strict';

function setupHomepageSectionsAnimation() {
    if (!window.gsap || !window.ScrollTrigger) {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    const homepageSections = document.querySelectorAll('.homepage-section');
    let sectionAnimations = [];
    
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
                markers: false,
                invalidateOnRefresh: true
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
        
        sectionAnimations.push({
            timeline: sectionTl,
            trigger: sectionTl.scrollTrigger
        });
    });
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const menuOpen = document.body.classList.contains('menu-open');
                
                if (menuOpen) {
                    sectionAnimations.forEach(animation => {
                        if (animation.trigger) {
                            animation.wasActive = animation.trigger.isActive;
                            animation.trigger.disable();
                        }
                    });
                } else {
                    sectionAnimations.forEach(animation => {
                        if (animation.trigger) {
                            animation.trigger.enable();
                            setTimeout(() => {
                                ScrollTrigger.refresh();
                            }, 100);
                        }
                    });
                }
            }
        });
    });
    
    observer.observe(document.body, { attributes: true });
}

window.addEventListener('load', function() {
    setupHomepageSectionsAnimation();
});