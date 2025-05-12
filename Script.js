function showConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 150;
    const confetti = [];

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * confettiCount,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
            tiltAngle: 0
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach((confetto, index) => {
            ctx.beginPath();
            ctx.lineWidth = confetto.r;
            ctx.strokeStyle = confetto.color;
            ctx.moveTo(confetto.x + confetto.tilt + confetto.r / 2, confetto.y);
            ctx.lineTo(confetto.x + confetto.tilt, confetto.y + confetto.tilt + confetto.r / 2);
            ctx.stroke();
        });

        update();
    }

    function update() {
        confetti.forEach((confetto, index) => {
            confetto.tiltAngle += confetto.tiltAngleIncremental;
            confetto.y += (Math.cos(confetto.d) + 3 + confetto.r / 2) / 2;
            confetto.x += Math.sin(confetto.d);
            confetto.tilt = Math.sin(confetto.tiltAngle - index / 3) * 15;

            if (confetto.y > canvas.height) {
                confetti[index] = {
                    x: Math.random() * canvas.width,
                    y: -20,
                    r: confetto.r,
                    d: confetto.d,
                    color: confetto.color,
                    tilt: confetto.tilt,
                    tiltAngleIncremental: confetto.tiltAngleIncremental,
                    tiltAngle: confetto.tiltAngle
                };
            }
        });
    }

    function animateConfetti() {
        draw();
        requestAnimationFrame(animateConfetti);
    }

    animateConfetti();
}
