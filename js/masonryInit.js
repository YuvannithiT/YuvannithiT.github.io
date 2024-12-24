document.addEventListener('DOMContentLoaded', function() {
    let masonryInstance = null;
    let resizeTimeout;
    let isResizing = false;

    function initMasonry() {
        const grid = document.querySelector('.masonry-grid');
        
        grid.style.opacity = '0';
        grid.style.transition = 'opacity 0.3s ease-in-out';

        if (masonryInstance) {
            masonryInstance.destroy();
        }

        imagesLoaded(grid, function() {
            const items = grid.querySelectorAll('.masonry-item');
            
            items.forEach(item => {
                item.style.transform = '';
                item.classList.add('is-loaded');
            });

            masonryInstance = new Masonry(grid, {
                itemSelector: '.masonry-item',
                columnWidth: '.masonry-item',
                percentPosition: true,
                initLayout: true,
                transitionDuration: isResizing ? '0s' : '0.3s'
            });

            requestAnimationFrame(() => {
                grid.style.opacity = '1';
            });
        });
    }

    initMasonry();

    const resizeObserver = new ResizeObserver(() => {
        if (!isResizing) {
            isResizing = true;
            document.querySelector('.masonry-grid').style.opacity = '0';
        }
        
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initMasonry();
            isResizing = false;
        }, 150);
    });

    const grid = document.querySelector('.masonry-grid');
    resizeObserver.observe(grid);
});