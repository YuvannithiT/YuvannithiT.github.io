(function() {
    'use strict';

    window.addEventListener('load', initVanDerPolCanvas);

    function initVanDerPolCanvas() {
        const canvas = document.getElementById('vanderpol');
        if (!canvas) {
            console.warn('Canvas element not found.');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error("Failed to get 2D context for canvas.");
            return;
        }

        function setupCanvas() {
            const dpr = window.devicePixelRatio || 1;

            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            ctx.scale(dpr, dpr);

            return dpr;
        }

        setupCanvas();

        const mu = 2.5;
        const dt = 0.01;
        const contourCount = 100;

        const oscillators = [];
        for (let i = 0; i < contourCount; i++) {
            oscillators.push({
                points: [],
                scale: 0.25 + (i * 0.25),
                color: `hsla(${220 + (i * 3 * 360 / contourCount) % 360}, 100%, ${40 + (i * 15 / contourCount)}%, 1)`
            });
        }

        function solveVanDerPol(x, y) {
            const k1x = y;
            const k1y = mu * (1 - x * x) * y - x;

            const halfDt = dt / 2;
            const x2 = x + k1x * halfDt;
            const y2 = y + k1y * halfDt;
            const k2x = y2;
            const k2y = mu * (1 - x2 * x2) * y2 - x2;

            const x3 = x + k2x * halfDt;
            const y3 = y + k2y * halfDt;
            const k3x = y3;
            const k3y = mu * (1 - x3 * x3) * y3 - x3;

            const x4 = x + k3x * dt;
            const y4 = y + k3y * dt;
            const k4x = y4;
            const k4y = mu * (1 - x4 * x4) * y4 - x4;

            const sixthDt = dt / 6;
            return {
                x: x + (k1x + 2 * k2x + 2 * k3x + k4x) * sixthDt,
                y: y + (k1y + 2 * k2y + 2 * k3y + k4y) * sixthDt
            };
        }

        function generateStartingPoints() {
            const startingPoints = [];
            for (let i = 0; i < contourCount; i++) {
                const angle = (i * 2 * Math.PI) / contourCount;
                const radius = 1.0 + i * 0.5;
                startingPoints.push({
                    x: radius * Math.cos(angle),
                    y: radius * Math.sin(angle)
                });
            }
            return startingPoints;
        }

        const startingPoints = generateStartingPoints();

        for (let i = 0; i < contourCount; i++) {
            const path = [];
            let x = startingPoints[i].x;
            let y = startingPoints[i].y;

            for (let j = 0; j < 50000; j++) {
                const next = solveVanDerPol(x, y);
                x = Math.max(Math.min(next.x, 100), -100);
                y = Math.max(Math.min(next.y, 100), -100);
            }

            const startX = x;
            const startY = y;
            path.push({ x, y });

            let cycleCompleted = false;
            let pointCount = 0;
            const maxPoints = 50000;

            let prevAngle = Math.atan2(startY, startX);
            let totalAngle = 0;

            while (!cycleCompleted && pointCount < maxPoints) {
                const next = solveVanDerPol(x, y);
                x = next.x;
                y = next.y;
                path.push({ x, y });
                pointCount++;

                const angle = Math.atan2(y, x);
                let delta = angle - prevAngle;

                if (delta > Math.PI) delta -= 2 * Math.PI;
                else if (delta < -Math.PI) delta += 2 * Math.PI;

                totalAngle += delta;
                prevAngle = angle;

                if (Math.abs(totalAngle) >= 2 * Math.PI) {
                    cycleCompleted = true;
                }
            }

            oscillators[i].points = path;
        }

        function draw() {
            const displayWidth = canvas.clientWidth;
            const displayHeight = canvas.clientHeight;

            ctx.clearRect(0, 0, displayWidth, displayHeight);

            const centerX = displayWidth / 2;
            const centerY = displayHeight / 2;

            const fixedDivisor = 8;
            const size = Math.min(displayWidth, displayHeight) / fixedDivisor;

            const baseLineWidth = Math.max(1, Math.min(displayWidth, displayHeight) / 400);

            oscillators.forEach(osc => {
                if (osc.points.length < 2) return;

                ctx.beginPath();
                let firstPoint = osc.points[0];
                let screenX = centerX + firstPoint.x * size * osc.scale;
                let screenY = centerY + firstPoint.y * size * osc.scale;
                ctx.moveTo(screenX, screenY);

                for (let i = 1; i < osc.points.length; i++) {
                    const point = osc.points[i];
                    screenX = centerX + point.x * size * osc.scale;
                    screenY = centerY + point.y * size * osc.scale;
                    ctx.lineTo(screenX, screenY);
                }

                ctx.strokeStyle = osc.color;
                ctx.lineWidth = baseLineWidth + (osc.scale * 0.15);
                ctx.stroke();
            });

            canvas.classList.add('vanderpol-visible');
        }

        draw();

        window.addEventListener('resize', function() {
            setupCanvas();
            draw();
        });
    }
})();