const canvas = document.getElementById('contourCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

const mu = 1.5;

const dt = 0.01;
const maxIterations = 5000;
const scaleFactor = 15;
const stabilizationPeriod = 1000;

function getCSSVariableValue(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

const colors = [
    getCSSVariableValue('--accent-1'),
    getCSSVariableValue('--accent-2'),
    getCSSVariableValue('--accent-3'),
    getCSSVariableValue('--accent-4')
];

function drawVanDerPolOscillator(x0, y0, scale, color, lineWidth) {
    let x = x0;
    let y = y0;
    let path = [];
    
    for (let i = 0; i < maxIterations; i++) {
        const dx = y;
        const dy = mu * (1 - x * x) * y - x;

        x += dx * dt;
        y += dy * dt;

        const xPos = canvas.width / 2 + x * scale;
        const yPos = canvas.height / 2 - y * scale;

        path.push({x: xPos, y: yPos});
    }

    let stabilizationIndex = stabilizationPeriod;
    for (let i = stabilizationPeriod; i < path.length - 1; i++) {
        const dist = Math.hypot(path[i].x - path[i-1].x, path[i].y - path[i-1].y);
        if (dist < 0.1) {
            stabilizationIndex = i;
            break;
        }
    }

    ctx.beginPath();
    ctx.moveTo(path[stabilizationIndex].x, path[stabilizationIndex].y);
    for (let i = stabilizationIndex + 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function drawNestedOscillators() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const numOscillators = 60;

    for (let i = 0; i < numOscillators; i++) {
        const scale = scaleFactor + i * 25;
        const x0 = 0.5 + i * 0.05;
        const y0 = 0.5 + i * 0.05;
        const color = colors[i % colors.length];
        const lineWidth = 2 - (i / numOscillators) * 1;

        drawVanDerPolOscillator(x0, y0, scale, color, lineWidth);
    }
}

drawNestedOscillators();

window.addEventListener('resize', () => {
    resizeCanvas();
    drawNestedOscillators();
});