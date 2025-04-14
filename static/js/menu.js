export function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    const dimmableElements = document.querySelectorAll('.section, .center-section');

    function toggleMenu(show) {
        hamburger.classList.toggle('active', show);
        mobileMenuContainer.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : '';

        dimmableElements.forEach(background => {
            background.classList.toggle('dimmed', show);
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