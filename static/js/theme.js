export function initializeThemeManager() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeDropdown = document.querySelector('.theme-dropdown');
    const themeOptions = document.querySelectorAll('.theme-option');
    const root = document.documentElement;
    
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    function setTheme(theme) {
        const actualTheme = theme === 'system' ? getSystemTheme() : theme;
        root.setAttribute('data-theme', actualTheme);
    
        const themePrefix = actualTheme === 'dark' ? '--dark-' : '--light-';
        const cssVars = ['background', 'background-rgb', 'background-secondary', 'accent', 'text', 'text-rgb', 'text-secondary', 'overlay-bg', 'hover-bg', 'border-color'];
    
        cssVars.forEach(variable => {
            const value = getComputedStyle(root).getPropertyValue(`${themePrefix}${variable}`);
            root.style.setProperty(`--${variable}`, value);
        });
    
        const icons = {
            'light': 'fa-sun',
            'dark': 'fa-moon',
            'system': 'fa-desktop'
        };
    
        const toggleIcon = themeToggle.querySelector('i');
        toggleIcon.className = `fas ${icons[theme]}`;
    
        localStorage.setItem('theme', theme);
    }
    
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        themeDropdown.classList.toggle('show');
    });
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            setTheme(theme);
            themeDropdown.classList.remove('show');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!themeToggle.contains(e.target)) {
            themeDropdown.classList.remove('show');
        }
    });
    
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
            if (localStorage.getItem('theme') === 'system') {
                setTheme('system');
            }
        });
}