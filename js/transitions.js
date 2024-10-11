document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const contents = document.querySelectorAll('.content');

    function showPageBackground(page) {
        page.classList.add('visible');
    }

    function showContent() {
        contents.forEach(content => {
            content.classList.add('content-visible');
        });
    }

    function hideContent() {
        contents.forEach(content => {
            content.classList.remove('content-visible');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetPageId = this.getAttribute('href').substring(1);
            const targetPage = document.getElementById(targetPageId);

            pages.forEach(page => {
                page.classList.remove('visible');
            });

            hideContent();

            setTimeout(() => {
                showPageBackground(targetPage);
                showContent();
            }, 500);
        });
    });

    showPageBackground(document.querySelector('.page'));
    showContent();
});