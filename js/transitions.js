document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll('.page');
    const contentSections = document.querySelectorAll('.content-section');

    function showPage(page) {
        page.classList.add('visible');
        contentSections.forEach((section, index) => {
            section.style.setProperty('--delay', `${index * 0.2}s`);
        });
    }

    function hidePages() {
        pages.forEach(page => {
            page.classList.remove('visible');
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = document.getElementById(link.getAttribute('href').substring(1));
            hidePages();
            setTimeout(() => showPage(targetPage), 500);
        });
    });

    showPage(document.querySelector('.page'));
});