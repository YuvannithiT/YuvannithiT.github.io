(function() {
    'use strict';

    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = themeToggle.querySelector('i');
    const root = document.documentElement;

    let currentThemeIndex = 0;
    const themes = ['light', 'dark', 'system'];
    const themeIcons = {
        light: 'fa-sun',
        dark: 'fa-moon',
        system: 'fa-desktop'
    };

    const cssVariablesToUpdate = [
        'bg-color',
        'text-color',
        'accent-color',
        'secondary-color',
        'tertiary-color',
        'header-bg'
    ];

    initializeTheme();

    themeToggle.addEventListener('click', function() {

        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newThemeSetting = themes[currentThemeIndex];

        applyTheme(newThemeSetting);

        localStorage.setItem('preferredTheme', newThemeSetting);

        gsap.to(themeToggle, {
            rotation: "+=360",
            duration: 0.5,
            ease: "power2.out"
        });
    });

    function initializeTheme() {
        const savedThemeSetting = localStorage.getItem('preferredTheme') || 'system';
        currentThemeIndex = themes.indexOf(savedThemeSetting);
        if (currentThemeIndex === -1) currentThemeIndex = 0;

        applyTheme(savedThemeSetting);

    }

    function getActualTheme(themeSetting) {
        if (themeSetting === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return themeSetting;
    }

    function applyTheme(themeSetting) {
        const actualTheme = getActualTheme(themeSetting);

        const needsDarkClass = actualTheme === 'dark';
        root.classList.toggle('dark-theme', needsDarkClass);

        const computedStyles = getComputedStyle(root);
        cssVariablesToUpdate.forEach(variable => {
            const sourceVariableName = `--${actualTheme}-${variable}`;
            const value = computedStyles.getPropertyValue(sourceVariableName).trim();

            if (value) {
                root.style.setProperty(`--${variable}`, value);
            } else {
                console.warn(`CSS variable ${sourceVariableName} not found or empty.`);
            }
        });

        themeToggleIcon.className = `fa-solid ${themeIcons[themeSetting]}`;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
        if (themeSetting === 'system') {
            mediaQuery.addEventListener('change', handleSystemThemeChange);
        }
    }

    function handleSystemThemeChange(e) {
        if (localStorage.getItem('preferredTheme') === 'system') {
            console.log("System theme changed, re-applying 'system' setting.");
            applyTheme('system');
        }
    }

})();