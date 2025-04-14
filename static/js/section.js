export function initializeSectionObserver() {
    const staggerableSelectors = [
        '.glass-container',
        '.section-subtitle',
        '.section-title', 
        '.section-text',
        '.cta-button',
        '.quote-wrapper',
        '.form-group',
        '.submit-button',
        '.thank-you-container',
        '.thank-you-icon',
        '.thank-you-title',
        '.thank-you-message'
    ];
    
    const sections = document.querySelectorAll('.section, .center-section');
    const allStaggerItems = [];
    
    sections.forEach(section => {
        const content = section.querySelector('.content, .center-content');
        if (!content) return;
        
        staggerableSelectors.forEach(selector => {
            const elements = content.querySelectorAll(selector);
            elements.forEach(el => {
                el.classList.add('stagger-item');
                allStaggerItems.push(el);
            });
        });
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -10% 0px'
    });
    
    allStaggerItems.forEach(item => {
        observer.observe(item);
    });
    
    animateItemsInViewport();
}

/**
 * Animates a single stagger item
 * @param {HTMLElement} element - The element to animate
 */
function animateElement(element) {
    element.style.transitionDelay = '0.1s';
    
    setTimeout(() => {
        element.classList.add('visible');
        
        setTimeout(() => {
            element.style.transitionDelay = '';
        }, 700);
    }, 10);
}

/**
 * Immediately animates items that are already in the viewport on page load
 */
function animateItemsInViewport() {
    setTimeout(() => {
        const staggerItems = document.querySelectorAll('.stagger-item');
        
        staggerItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isInViewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            
            if (isInViewport) {
                const delay = index * 0.1;
                item.style.transitionDelay = `${delay}s`;
                
                setTimeout(() => {
                    item.classList.add('visible');
                    
                    setTimeout(() => {
                        item.style.transitionDelay = '';
                    }, 700);
                }, 10);
            }
        });
    }, 100);
}