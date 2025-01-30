import { initializeHeader } from './header.js';
import { initializeThemeManager } from './theme.js';
import { ContactFormValidator } from './form.js';
import { initializeSectionObserver } from './section.js';
import { initializeNavigation } from './scrolling.js';
import { initializeMobileMenu } from './menu.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize core functionality
        initializeHeader();
        initializeThemeManager();
        
        // Initialize form validation if contact form exists
        new ContactFormValidator();
        
        // Initialize section-related functionality
        initializeSectionObserver();
        initializeNavigation();
        
        // Initialize mobile menu
        initializeMobileMenu();
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});