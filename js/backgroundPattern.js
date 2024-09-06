const canvas = document.getElementById('contourCanvas');
const ctx = canvas.getContext('2d');

const mu = 1.5;
const dt = 0.01;
const maxIterations = 5000;
const scaleFactor = 15;
const stabilizationPeriod = 1000;
const numOscillators = 30;

// Define hardcoded colors for light and dark modes
const lightModeColor = '#002147';  // Black with 10% opacity
const darkModeColor = '#4A90E2';   // White with 10% opacity

// Cache for storing paths
let cachedPaths = [];
let animationFrameId;
let colors = [getCurrentColor()];  // Initialize with current theme color

function resizeCanvas() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);  // Adjust canvas scaling
}

// Function to get the current color based on the theme
function getCurrentColor() {
    return document.documentElement.classList.contains('dark-mode') ? darkModeColor : lightModeColor;
}

// Calculate oscillator path and cache it
function calculateOscillatorPath(x0, y0, scale) {
    let path = [];
    let x = x0;
    let y = y0;
    let dt_dynamic = dt;

    for (let i = 0; i < maxIterations; i++) {
        const dx = y;
        const dy = mu * (1 - x * x) * y - x;

        x += dx * dt_dynamic;
        y += dy * dt_dynamic;

        const xPos = canvas.width / 2 + x * scale;
        const yPos = canvas.height / 2 - y * scale;

        path.push({x: xPos, y: yPos});

        // Adjust step size based on velocity to optimize performance
        const velocity = Math.hypot(dx, dy);
        dt_dynamic = velocity > 0.1 ? dt : dt * 2;
    }

    return path;
}

// Cache the paths of the oscillators to avoid recomputation
function cacheOscillators() {
    cachedPaths = [];
    for (let i = 0; i < numOscillators; i++) {
        const scale = scaleFactor + i * 40;
        const x0 = 0.5 + i * 0.05;
        const y0 = 0.5 + i * 0.05;
        let path = calculateOscillatorPath(x0, y0, scale);
        cachedPaths.push(path);
    }
}

// Function to draw cached oscillators with updated colors
function drawCachedOscillators() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    colors[0] = getCurrentColor();  // Update color based on current theme

    cachedPaths.forEach((path, i) => {
        ctx.beginPath();
        ctx.moveTo(path[stabilizationPeriod].x, path[stabilizationPeriod].y);
        for (let j = stabilizationPeriod + 1; j < path.length; j++) {
            ctx.lineTo(path[j].x, path[j].y);
        }
        ctx.lineWidth = 2 - (i / numOscillators) * 1;
        ctx.strokeStyle = colors[i % colors.length];
        ctx.stroke();
    });
}

// Function to redraw using requestAnimationFrame for better performance
function drawWithRequestAnimationFrame() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(drawCachedOscillators);
}

// Initial setup
function setup() {
    resizeCanvas();
    cacheOscillators();   // Cache the paths for the oscillators
    drawWithRequestAnimationFrame();  // Draw the oscillators
}

// Redraw the background pattern when the theme changes
function redrawBackgroundPattern() {
    colors[0] = getCurrentColor();
    drawWithRequestAnimationFrame();
}

// Event listeners
window.addEventListener('resize', () => {
    resizeCanvas();
    cacheOscillators();   // Re-cache paths after resize
    drawWithRequestAnimationFrame();
});

document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement;
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                redrawBackgroundPattern();
            }
        });
    });

    observer.observe(htmlElement, { attributes: true });

    // Initial draw after DOM is loaded
    setup();
});