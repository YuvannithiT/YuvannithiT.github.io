// Import only the modules needed for interactive elements
import { initializeHeader } from './header.js';
import { initializeThemeManager } from './theme.js';
import { ContactFormValidator } from './form.js';
import { initializeSectionObserver } from './section.js';
import { initializeMobileMenu } from './menu.js';

// Wait for the initial HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed. Initializing interactive components...");

    try {
        // Initialize interactive components directly
        // These functions expect the relevant HTML elements to already exist
        // because Hugo generated them.

        initializeHeader();          // Handles header scroll effects
        initializeMobileMenu();      // Handles hamburger menu toggle
        initializeThemeManager();    // Handles theme switching dropdown/logic

        // Check if the contact form exists on the CURRENT page before initializing
        if (document.getElementById('contact-form')) {
            console.log("Contact form found, initializing validator.");
            new ContactFormValidator(); // Handles contact form validation
        } else {
            console.log("Contact form not found on this page.");
        }

        initializeSectionObserver(); // Handles animations as sections scroll into view

        console.log("Interactive components initialization complete.");

    } catch (error) {
        // Log any error that occurs during initialization
        console.error('Error initializing interactive components:', error);
    }
});