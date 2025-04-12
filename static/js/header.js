export function initializeHeader() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let isHeaderVisible = true;
    
    window.addEventListener('scroll', () => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    
        const isScrollingDown = currentScrollTop > lastScrollTop;
        const isScrollingUp = currentScrollTop < lastScrollTop;
        const isNotAtTop = currentScrollTop > 0;
    
        if (isScrollingDown && isNotAtTop) {
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0';
            isHeaderVisible = false;
        } else if (isScrollingUp) {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
            header.classList.add('scrolled');
            isHeaderVisible = true;
        }
    
        if (currentScrollTop === 0) {
            header.classList.remove('scrolled');
        }
    
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    });
}