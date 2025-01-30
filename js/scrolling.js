export function initializeNavigation() {
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.indicator-dot');
    const goToTop = document.getElementById('goToTop');
    const prevSection = document.getElementById('prevSection');
    const nextSection = document.getElementById('nextSection');
    const goToBottom = document.getElementById('goToBottom');
    
    function getCurrentSectionIndex() {
        const scrollPosition = window.scrollY;
        let currentIndex = 0;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop - sectionHeight / 3) {
                currentIndex = index;
            }
        });
        
        return currentIndex;
    }
    
    function updateActiveDot() {
        const currentIndex = getCurrentSectionIndex();
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Initialize event listeners
    goToTop?.addEventListener('click', () => scrollToSection(0));
    goToBottom?.addEventListener('click', () => scrollToSection(sections.length - 1));
    prevSection?.addEventListener('click', () => {
        const currentIndex = getCurrentSectionIndex();
        scrollToSection(currentIndex - 1);
    });
    nextSection?.addEventListener('click', () => {
        const currentIndex = getCurrentSectionIndex();
        scrollToSection(currentIndex + 1);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => scrollToSection(index));
    });
    
    window.addEventListener('scroll', updateActiveDot);
    
    // Initial update
    updateActiveDot();
}