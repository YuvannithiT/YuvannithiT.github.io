(function () {
    'use strict';

    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    
    const themes = ['light', 'dark', 'system'];
    let currentThemeIndex = 0;

    const themeIcons = {
        light: 'sun',
        dark: 'moon',
        system: 'monitor'
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

    themeToggle.addEventListener('click', function () {
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
            const sourceVar = `--${actualTheme}-${variable}`;
            const value = computedStyles.getPropertyValue(sourceVar).trim();
            if (value) {
                root.style.setProperty(`--${variable}`, value);
            } else {
                console.warn(`CSS variable ${sourceVar} not found.`);
            }
        });

        updateThemeIcon(themeSetting);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
        if (themeSetting === 'system') {
            mediaQuery.addEventListener('change', handleSystemThemeChange);
        }
    }

    function updateThemeIcon(themeSetting) {
        const iconName = themeIcons[themeSetting];
        
        while (themeToggle.firstChild) {
            themeToggle.removeChild(themeToggle.firstChild);
        }
        
        const newIconSpan = document.createElement('span');
        newIconSpan.setAttribute('data-lucide', iconName);
        newIconSpan.classList.add('theme-icon');
        themeToggle.appendChild(newIconSpan);
        
        lucide.createIcons();
    }

    function handleSystemThemeChange(e) {
        if (localStorage.getItem('preferredTheme') === 'system') {
            applyTheme('system');
        }
    }
})();