import { loadComponent } from './components.js';
import { initializeHeader } from './header.js';
import { initializeThemeManager } from './theme.js';
import { ContactFormValidator } from './form.js';
import { initializeSectionObserver } from './section.js';
import { initializeMobileMenu } from './menu.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await Promise.all([
            loadComponent('header-container', '../html/components/header.html'),
            loadComponent('footer-container', '../html/components/footer.html')
        ]);
        
        initializeHeader();
        initializeMobileMenu();
        
        initializeThemeManager();
        
        if (document.querySelector('form')) {
            new ContactFormValidator();
        }
        
        initializeSectionObserver();
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});