function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        html.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeIcons();
}
function setInitialTheme() {
    const storedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');   
    if (storedTheme) {
        document.documentElement.classList.toggle('dark-mode', storedTheme === 'dark');
    } else {
        const initialTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark-mode', initialTheme === 'dark');
        localStorage.setItem('theme', initialTheme);
    }
    updateThemeIcons();
}
function updateThemeIcons() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const sunIcon = document.querySelector('.icon-sun');
    const moonIcon = document.querySelector('.icon-moon');
    if (isDarkMode) {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    toggleButton.addEventListener('click', toggleTheme);
    setInitialTheme();
});