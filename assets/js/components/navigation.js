'use strict';

const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const pageOverlay = document.getElementById('page-overlay');

let touchStartX = 0;
let touchEndX = 0;
let lastScrollY = window.scrollY;

// Simplified scroll behavior - just hide/show header
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

// Toggle menu function
function toggleMenu(isOpen) {
    hamburger.classList.toggle('active', isOpen);
    nav.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);

    if (pageOverlay) {
        pageOverlay.classList.toggle('is-visible', isOpen);
    }
    
    // Prevent body scroll when menu is open
    if (isOpen) {
        // Calculate scrollbar width before hiding it
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const scrollY = window.scrollY;
        
        document.body.style.top = `-${scrollY}px`;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        
        // Compensate for scrollbar disappearance
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            // Also adjust header if it's fixed/sticky
            if (header) {
                header.style.paddingRight = `${scrollbarWidth}px`;
            }
        }
    } else {
        const scrollY = document.body.style.top;
        
        // Remove all locks
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

// Hamburger click - works on all screen sizes
hamburger.addEventListener('click', function(e) {
    const willBeOpen = !this.classList.contains('active');
    toggleMenu(willBeOpen);
    e.stopPropagation();
});

// Click outside to close
document.addEventListener('click', function(e) {
    if (nav.classList.contains('active')) {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMenu(false);
        }
    }
});

// Click overlay to close
if (pageOverlay) {
    pageOverlay.addEventListener('click', function() {
        toggleMenu(false);
    });
}

// Close menu when clicking nav links
nav.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        toggleMenu(false);
    } else {
        e.stopPropagation();
    }
});

// Touch swipe to close (mobile)
nav.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

nav.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 75;
    
    // Swipe right to close
    if (touchEndX - touchStartX > swipeThreshold && nav.classList.contains('active')) {
        toggleMenu(false);
    }
}, { passive: true });

// Prevent scroll on body when menu is open
document.addEventListener('touchmove', function(e) {
    if (document.body.classList.contains('menu-open')) {
        if (!nav.contains(e.target)) {
            e.preventDefault();
        }
    }
}, { passive: false });

// Keyboard accessibility - toggle menu with M
document.addEventListener('keydown', function(e) {
    if (e.key === 'm' || e.key === 'M') {
        // Toggle based on current state
        const isActive = nav.classList.contains('active');
        toggleMenu(!isActive);
    }
});