'use strict';

const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const pageOverlay = document.getElementById('page-overlay');

let touchStartX = 0;
let touchEndX = 0;
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    if (document.body.classList.contains('menu-open')) {
        return;
    }

    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY;
    const isScrollingUp = currentScrollY < lastScrollY;
    const isAtTop = currentScrollY === 0;

    if (isScrollingDown && currentScrollY > 100) {
        header.classList.add('hidden');
    } else if (isScrollingUp) {
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
    nav.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);

    if (pageOverlay) {
        pageOverlay.classList.toggle('is-visible', isOpen);
    }
    
    if (isOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const scrollY = window.scrollY;
        
        document.body.style.top = `-${scrollY}px`;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            if (header) {
                header.style.paddingRight = `${scrollbarWidth}px`;
            }
        }
    } else {
        const scrollY = document.body.style.top;
        
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';
        
        if (header) {
            header.style.paddingRight = '';
        }
        
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
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

if (pageOverlay) {
    pageOverlay.addEventListener('click', function() {
        toggleMenu(false);
    });
}

nav.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
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
    const swipeThreshold = 75;
    
    if (touchEndX - touchStartX > swipeThreshold && nav.classList.contains('active')) {
        toggleMenu(false);
    }
}, { passive: true });

document.addEventListener('touchmove', function(e) {
    if (document.body.classList.contains('menu-open')) {
        if (!nav.contains(e.target)) {
            e.preventDefault();
        }
    }
}, { passive: false });

function isTypingContext(e) {
    const el = document.activeElement;
    if (!el) return false;

    return (
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.isContentEditable
    );
}

document.addEventListener('keydown', (e) => {
    if (isTypingContext()) return;

    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        const isActive = nav.classList.contains('active');
        toggleMenu(!isActive);
    }
});