(function() {
    'use strict';

    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const pageOverlay = document.getElementById('page-overlay');

    let touchStartX = 0;
    let touchEndX = 0;
    let lastScrollY = window.scrollY;
    let scrollPosition = 0;

    window.addEventListener('scroll', function() {
        if (document.body.classList.contains('menu-open')) {
            return;
        }

        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY;
        const isScrollingUp = currentScrollY < lastScrollY;
        const isAtTop = currentScrollY === 0;
        const isNotAtTop = currentScrollY > 0;

        if (isScrollingDown && isNotAtTop) {
            header.classList.add('hidden');
        }
        else if (isScrollingUp) {
            header.classList.remove('hidden');
            header.classList.add('scrolled');
        }

        if (isAtTop) {
            header.classList.remove('scrolled');
            header.classList.remove('hidden');
        }

        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    }, { passive: true });

    function toggleMenu(isOpen) {
        hamburger.classList.toggle('active', isOpen);
        nav.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);

        if (pageOverlay) {
            pageOverlay.classList.toggle('is-visible', isOpen);
        }
        
        if (isOpen) {
            scrollPosition = window.scrollY;
            
            const scrollContainer = document.createElement('div');
            scrollContainer.id = 'scroll-container';
            scrollContainer.style.position = 'fixed';
            scrollContainer.style.top = `-${scrollPosition}px`;
            scrollContainer.style.left = '0';
            scrollContainer.style.right = '0';
            scrollContainer.style.bottom = '0';
            scrollContainer.style.overflow = 'hidden';
            scrollContainer.style.zIndex = '0';
            
            const bodyChildren = Array.from(document.body.children);
            bodyChildren.forEach(child => {
                if (child !== header && child !== nav && child !== pageOverlay && child.id !== 'scroll-container') {
                    scrollContainer.appendChild(child);
                }
            });
            
            document.body.appendChild(scrollContainer);
            
            document.body.style.overflow = 'hidden';
            document.body.style.width = '100%';
        } else {
            const scrollContainer = document.getElementById('scroll-container');
            if (scrollContainer) {
                while (scrollContainer.firstChild) {
                    document.body.appendChild(scrollContainer.firstChild);
                }
                scrollContainer.remove();
            }
            
            document.body.style.overflow = '';
            document.body.style.width = '';
            
            window.scrollTo(0, scrollPosition);
        }
    }

    hamburger.addEventListener('click', function(e) {
        const willBeOpen = !this.classList.contains('active');
        toggleMenu(willBeOpen);
        e.stopPropagation();
    });

    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active')) {
            if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMenu(false);
            }
        }
    });

    nav.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.closest('nav')) {
            toggleMenu(false);
        } else {
            e.stopPropagation();
        }
    });

    nav.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    nav.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX - touchStartX > swipeThreshold && nav.classList.contains('active')) {
            toggleMenu(false);
        }
    }

    document.addEventListener('touchmove', function(e) {
        if (document.body.classList.contains('menu-open')) {
            if (!nav.contains(e.target)) {
                e.preventDefault();
            }
        }
    }, { passive: false });

})();