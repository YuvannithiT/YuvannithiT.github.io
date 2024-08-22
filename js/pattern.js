const canvas = document.getElementById('contourCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Van der Pol oscillator parameters
        const mu = 2; // Nonlinearity parameter

        // Simulation parameters
        const dt = 0.01; // Time step
        const maxIterations = 5000; // Reduced number of iterations for efficiency
        const scaleFactor = 20; // Scaling factor for drawing

        function drawVanDerPolOscillator(x0, y0, scale, color) {
            let x = x0;
            let y = y0;

            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);

            for (let i = 0; i < maxIterations; i++) {
                // Van der Pol oscillator differential equations
                const dx = y;
                const dy = mu * (1 - x * x) * y - x;

                // Update the variables
                x += dx * dt;
                y += dy * dt;

                // Project onto 2D space (x, y)
                const xPos = canvas.width / 2 + x * scale;
                const yPos = canvas.height / 2 - y * scale;

                // Draw the curve
                if (i === 0) {
                    ctx.moveTo(xPos, yPos);
                } else {
                    ctx.lineTo(xPos, yPos);
                }
            }

            ctx.lineWidth = 2.5;
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        function drawNestedOscillators() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const numOscillators = 75; // Number of nested oscillators

            // Draw oscillators with alternating colors
            for (let i = 0; i < numOscillators; i++) {
                const scale = scaleFactor + i * 25;
                const x0 = 1 + i * 0.1;
                const y0 = 1 + i * 0.1;
                const color = i % 2 === 0 ? 'rgba(0, 255, 255, 1)' : 'rgba(0, 191, 255, 1)'; // Alternating colors

                drawVanDerPolOscillator(x0, y0, scale, color);
            }
        }

        drawNestedOscillators();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawNestedOscillators(); // Redraw the oscillators when resizing
        });