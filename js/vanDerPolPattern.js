// Access the canvas and context
const canvas = document.getElementById('contourCanvas');
const ctx = canvas.getContext('2d');

// Function to resize the canvas to fill the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial canvas setup
resizeCanvas();

// Van der Pol oscillator parameters
const mu = 1.5; // Nonlinearity parameter

// Simulation parameters
const dt = 0.01; // Time step
const maxIterations = 5000; // Number of iterations for simulation
const scaleFactor = 15; // Scale for drawing the oscillator
const stabilizationPeriod = 1000; // Number of iterations to allow for stabilization

// Function to get CSS variable value
function getCSSVariableValue(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

// Color scheme for the oscillators
const colors = [
    getCSSVariableValue('--accent-1'),
    getCSSVariableValue('--accent-2'),
    getCSSVariableValue('--accent-3'),
    getCSSVariableValue('--accent-4')
];

// Function to draw a single Van der Pol oscillator
function drawVanDerPolOscillator(x0, y0, scale, color, lineWidth) {
    let x = x0;
    let y = y0;
    let path = [];
    
    // Run the simulation and collect points
    for (let i = 0; i < maxIterations; i++) {
        const dx = y;
        const dy = mu * (1 - x * x) * y - x;

        x += dx * dt;
        y += dy * dt;

        const xPos = canvas.width / 2 + x * scale;
        const yPos = canvas.height / 2 - y * scale;

        path.push({x: xPos, y: yPos});
    }

    // Find the point where the path stabilizes
    let stabilizationIndex = stabilizationPeriod;
    for (let i = stabilizationPeriod; i < path.length - 1; i++) {
        const dist = Math.hypot(path[i].x - path[i-1].x, path[i].y - path[i-1].y);
        if (dist < 0.1) { // Threshold for stabilization
            stabilizationIndex = i;
            break;
        }
    }

    // Draw the stabilized part of the path
    ctx.beginPath();
    ctx.moveTo(path[stabilizationIndex].x, path[stabilizationIndex].y);
    for (let i = stabilizationIndex + 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}

// Function to draw multiple nested Van der Pol oscillators
function drawNestedOscillators() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const numOscillators = 60;

    // Draw each oscillator with varying parameters
    for (let i = 0; i < numOscillators; i++) {
        const scale = scaleFactor + i * 25;
        const x0 = 0.5 + i * 0.05;
        const y0 = 0.5 + i * 0.05;
        const color = colors[i % colors.length];
        const lineWidth = 2 - (i / numOscillators) * 1;

        drawVanDerPolOscillator(x0, y0, scale, color, lineWidth);
    }
}

// Initial drawing of nested oscillators
drawNestedOscillators();

// Redraw on window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    drawNestedOscillators();
});