class VanderPolBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.mu = 1.5;
        this.limitCycle = null;
        this.contours = [];
        
        this.numContours = 30;
        this.contourGap = 0.2;
        
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'vanderpol-canvas';
        this.ctx = this.canvas.getContext('2d');
        
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.resize();
        
        this.generateLimitCycle();
        
        this.generateContours();
        
        this.draw();
        
        window.addEventListener('resize', () => this.handleResize());
        
        this.observeThemeChange();
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(dpr, dpr);
    }

    handleResize() {
        this.resize();
        this.generateContours();
        this.draw();
    }

    vanderPol(x, y, mu) {
        const dx = y;
        const dy = mu * (1 - x * x) * y - x;
        return [dx, dy];
    }

    generateLimitCycle() {
        let x = 2.0;
        let y = 0.0;
        const dt = 0.02;
        const convergenceSteps = 2000;

        for (let i = 0; i < convergenceSteps; i++) {
            const [k1x, k1y] = this.vanderPol(x, y, this.mu);
            const [k2x, k2y] = this.vanderPol(x + dt * k1x / 2, y + dt * k1y / 2, this.mu);
            const [k3x, k3y] = this.vanderPol(x + dt * k2x / 2, y + dt * k2y / 2, this.mu);
            const [k4x, k4y] = this.vanderPol(x + dt * k3x, y + dt * k3y, this.mu);

            x += (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
            y += (dt / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
        }

        const cycle = [[x, y]];
        const startX = x;
        const startY = y;
        const period = 2 * Math.PI / Math.sqrt(this.mu);
        const cycleSteps = Math.ceil(period / dt) * 2;
        
        let closestDistance = Infinity;
        let bestCycleLength = 0;

        for (let i = 0; i < cycleSteps; i++) {
            const [k1x, k1y] = this.vanderPol(x, y, this.mu);
            const [k2x, k2y] = this.vanderPol(x + dt * k1x / 2, y + dt * k1y / 2, this.mu);
            const [k3x, k3y] = this.vanderPol(x + dt * k2x / 2, y + dt * k2y / 2, this.mu);
            const [k4x, k4y] = this.vanderPol(x + dt * k3x, y + dt * k3y, this.mu);

            x += (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
            y += (dt / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);

            cycle.push([x, y]);

            if (i > cycleSteps / 3) {
                const dist = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);
                if (dist < 0.01 && dist < closestDistance) {
                    closestDistance = dist;
                    bestCycleLength = i + 1;
                }
            }
        }

        this.limitCycle = cycle.slice(0, bestCycleLength);
    }

    generateContours() {
        this.contours = [];
        
        for (let i = 0; i < this.numContours; i++) {
            const scale = 0.25 + (i * this.contourGap);
            const contour = this.limitCycle.map(([x, y]) => [x * scale, y * scale]);
            this.contours.push(contour);
        }
    }

    getColor() {
        const isDark = document.documentElement.classList.contains('dark-theme');
        const varName = isDark ? '--dark-primary' : '--light-primary';
        const color = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        return color;
    }

    draw() {
        const w = this.canvas.width / (window.devicePixelRatio || 1);
        const h = this.canvas.height / (window.devicePixelRatio || 1);
        
        this.ctx.clearRect(0, 0, w, h);

        const primaryColor = this.getColor();
        
        this.ctx.strokeStyle = primaryColor;
        this.ctx.lineWidth = 1.5;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        const centerX = w / 2;
        const centerY = h / 2;
        const scale = Math.min(w, h) / 6;

        this.contours.forEach(contour => {
            this.ctx.beginPath();
            contour.forEach(([x, y], index) => {
                const screenX = centerX + x * scale;
                const screenY = centerY - y * scale;

                if (index === 0) {
                    this.ctx.moveTo(screenX, screenY);
                } else {
                    this.ctx.lineTo(screenX, screenY);
                }
            });
            this.ctx.closePath();
            this.ctx.stroke();
        });
    }

    observeThemeChange() {
        const observer = new MutationObserver(() => {
            this.draw();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new VanderPolBackground();
    });
} else {
    new VanderPolBackground();
}

window.addEventListener('load', () => {
    document.body.classList.add('is-loaded');
});