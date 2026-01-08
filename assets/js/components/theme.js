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
    'primary-color',
    'secondary-color'
];

initializeTheme();

themeToggle.addEventListener('click', function () {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newThemeSetting = themes[currentThemeIndex];

    applyTheme(newThemeSetting);
    localStorage.setItem('preferredTheme', newThemeSetting);

    const buttonElement = this;
    const iconElement = buttonElement.querySelector('.theme-icon');

    const buttonStyles = getComputedStyle(buttonElement);
    const iconStyles = getComputedStyle(iconElement);

    const paddingLeft = parseFloat(buttonStyles.paddingLeft);
    const iconWidth = parseFloat(iconStyles.width);
    const iconCenterX = paddingLeft + (iconWidth / 2);

    const paddingTop = parseFloat(buttonStyles.paddingTop);
    const iconHeight = parseFloat(iconStyles.height);
    const iconCenterY = paddingTop + (iconHeight / 2);

    gsap.to(iconElement, {
        rotation: "+=360",
        duration: 0.5,
        ease: "power2.out",
        transformOrigin: "center center"
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

// Keyboard accessibility - toggle theme with T
document.addEventListener('keydown', function(e) {
    if (e.key === 't' || e.key === 'T') {
        // Advance index
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newThemeSetting = themes[currentThemeIndex];

        // Apply theme and persist
        applyTheme(newThemeSetting);
        localStorage.setItem('preferredTheme', newThemeSetting);

        // Animate the icon if present
        const iconElement = themeToggle.querySelector('.theme-icon');
        if (iconElement) {
            gsap.to(iconElement, {
                rotation: "+=360",
                duration: 0.5,
                ease: "power2.out",
                transformOrigin: "center center"
            });
        }
    }
});