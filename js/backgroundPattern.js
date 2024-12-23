const canvas = document.getElementById('contourCanvas');
const ctx = canvas.getContext('2d');

const mu = 1.5;
const dt = 0.01;
const maxIterations = 5000;
const scaleFactor = 15;
const stabilizationPeriod = 1000;
const numOscillators = 30;

const lightModeColor = '#49159e';
const darkModeColor = '#BD99FF';

let cachedPaths = [];
let animationFrameId;
let colors = [getCurrentColor()];

function resizeCanvas() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
}

function getCurrentColor() {
    return document.documentElement.classList.contains('dark-mode') ? darkModeColor : lightModeColor;
}

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

        const velocity = Math.hypot(dx, dy);
        dt_dynamic = velocity > 0.1 ? dt : dt * 2;
    }

    return path;
}

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

function drawCachedOscillators() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    colors[0] = getCurrentColor();

    cachedPaths.forEach((path, i) => {
        ctx.beginPath();
        ctx.moveTo(path[stabilizationPeriod].x, path[stabilizationPeriod].y);
        for (let j = stabilizationPeriod + 1; j < path.length; j++) {
            ctx.lineTo(path[j].x, path[j].y);
        }
        ctx.lineWidth = 4 - (i / numOscillators) * 1;
        ctx.strokeStyle = colors[i % colors.length];
        ctx.stroke();
    });
}

function drawWithRequestAnimationFrame() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(drawCachedOscillators);
}

function setup() {
    resizeCanvas();
    cacheOscillators();
    drawWithRequestAnimationFrame();
}

function redrawBackgroundPattern() {
    colors[0] = getCurrentColor();
    drawWithRequestAnimationFrame();
}

window.addEventListener('resize', () => {
    resizeCanvas();
    cacheOscillators();
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

    setup();
});