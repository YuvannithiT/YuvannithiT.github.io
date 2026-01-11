// Van der Pol Oscillator Background Generator - Contour Style
// Place this in assets/js/vanderpol-background.js

class VanderPolBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.mu = 1.5; // nonlinearity parameter
        this.limitCycle = null; // The stable limit cycle
        this.contours = [];
        
        // EASY CONFIGURATION
        this.numContours = 30; // Number of contour lines
        this.contourGap = 0.2; // Gap between each contour (multiplier)
        
        this.init();
    }

    init() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'vanderpol-canvas';
        this.ctx = this.canvas.getContext('2d');
        
        // Insert at the beginning of body
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        // Set canvas size
        this.resize();
        
        // Generate the stable limit cycle first
        this.generateLimitCycle();
        
        // Generate scaled contours
        this.generateContours();
        
        // Draw
        this.draw();
        
        // Handle resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Redraw on theme change
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

    // Runge-Kutta 4th order method for Van der Pol oscillator
    vanderPol(x, y, mu) {
        const dx = y;
        const dy = mu * (1 - x * x) * y - x;
        return [dx, dy];
    }

    // Generate the stable limit cycle
    generateLimitCycle() {
        // Start from a point and let it converge to the limit cycle
        let x = 2.0;
        let y = 0.0;
        const dt = 0.02;
        const convergenceSteps = 2000; // Let it converge first

        // Run for a while to reach the attractor
        for (let i = 0; i < convergenceSteps; i++) {
            const [k1x, k1y] = this.vanderPol(x, y, this.mu);
            const [k2x, k2y] = this.vanderPol(x + dt * k1x / 2, y + dt * k1y / 2, this.mu);
            const [k3x, k3y] = this.vanderPol(x + dt * k2x / 2, y + dt * k2y / 2, this.mu);
            const [k4x, k4y] = this.vanderPol(x + dt * k3x, y + dt * k3y, this.mu);

            x += (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
            y += (dt / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
        }

        // Now trace one complete cycle
        const cycle = [[x, y]];
        const startX = x;
        const startY = y;
        const period = 2 * Math.PI / Math.sqrt(this.mu); // Approximate period
        const cycleSteps = Math.ceil(period / dt) * 2; // Double to ensure full cycle
        
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

            // Check if we're close to starting point after some minimum steps
            if (i > cycleSteps / 3) {
                const dist = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);
                if (dist < 0.01 && dist < closestDistance) {
                    closestDistance = dist;
                    bestCycleLength = i + 1;
                }
            }
        }

        // Trim to the best cycle length
        this.limitCycle = cycle.slice(0, bestCycleLength);
    }

    // Generate contours by scaling the limit cycle with uniform gaps
    generateContours() {
        this.contours = [];
        
        // Start from the base limit cycle (scale = 1.0)
        // Each subsequent contour is: previousScale + contourGap
        for (let i = 0; i < this.numContours; i++) {
            const scale = 0.25 + (i * this.contourGap);
            const contour = this.limitCycle.map(([x, y]) => [x * scale, y * scale]);
            this.contours.push(contour);
        }
    }

    getColor() {
        // Get the CSS variable for primary color
        const isDark = document.documentElement.classList.contains('dark-theme');
        const varName = isDark ? '--dark-primary' : '--light-primary';
        const color = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        return color;
    }

    draw() {
        const w = this.canvas.width / (window.devicePixelRatio || 1);
        const h = this.canvas.height / (window.devicePixelRatio || 1);
        
        // Clear canvas
        this.ctx.clearRect(0, 0, w, h);

        // Get color from CSS variables
        const primaryColor = this.getColor();
        
        this.ctx.strokeStyle = primaryColor;
        this.ctx.lineWidth = 1.5;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        // Scale and center the phase portrait
        const centerX = w / 2;
        const centerY = h / 2;
        const scale = Math.min(w, h) / 6; // Base scale for the limit cycle

        // Draw each contour
        this.contours.forEach(contour => {
            this.ctx.beginPath();
            contour.forEach(([x, y], index) => {
                const screenX = centerX + x * scale;
                const screenY = centerY - y * scale; // Negative because canvas y is inverted

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
        // Watch for theme class changes on html element
        const observer = new MutationObserver(() => {
            this.draw();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
}

// Initialize when DOM is ready
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