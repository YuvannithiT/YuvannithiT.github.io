export function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    
    const headerChildren = document.querySelectorAll('.header > *:not(.mobile-menu-container):not(.hamburger)');
    const otherDimmable = document.querySelectorAll('.section, .center-section, .footer');
    
    function toggleMenu(show) {
        hamburger.classList.toggle('active', show);
        mobileMenuContainer.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : '';

        headerChildren.forEach(element => {
            element.classList.toggle('dimmed', show);
        });
        
        otherDimmable.forEach(element => {
            element.classList.toggle('dimmed', show);
        });
    }

    hamburger.addEventListener('click', () => {
        const willShow = !mobileMenuContainer.classList.contains('active');
        toggleMenu(willShow);
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('click', (event) => {
        if (!hamburger.contains(event.target) && 
            !mobileMenuContainer.contains(event.target) && 
            mobileMenuContainer.classList.contains('active')) {
            toggleMenu(false);
        }
    });
}