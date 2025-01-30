import { initializeHeader } from './header.js';
import { initializeThemeManager } from './theme.js';
import { ContactFormValidator } from './form.js';
import { initializeSectionObserver } from './section.js';
import { initializeNavigation } from './scrolling.js';
import { initializeMobileMenu } from './menu.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeHeader();
        initializeThemeManager();
        
        new ContactFormValidator();
        
        initializeSectionObserver();
        initializeNavigation();
        
        initializeMobileMenu();
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});