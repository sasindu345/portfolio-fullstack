// src/components/BubbleBackground/BubbleBackground.js

import React, { useEffect, useRef } from 'react';
import './BubbleBackground.css';

const BubbleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        let mouse = { x: null, y: null, radius: 150 };

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 4 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = Math.random() * 30 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }

            draw() {
                const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

                if (isDark) {
                    ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = 'rgba(59, 130, 246, 0.3)';
                } else {
                    ctx.fillStyle = 'rgba(37, 99, 235, 0.35)';
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = 'rgba(37, 99, 235, 0.2)';
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < mouse.radius) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }

                this.baseX += this.speedX;
                this.baseY += this.speedY;

                if (this.baseX < 0 || this.baseX > canvas.width) {
                    this.speedX *= -1;
                }
                if (this.baseY < 0 || this.baseY > canvas.height) {
                    this.speedY *= -1;
                }
            }
        }

        const init = () => {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 12000;

            if (numberOfParticles < 40) numberOfParticles = 40;
            if (numberOfParticles > 100) numberOfParticles = 100;

            for (let i = 0; i < numberOfParticles; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        };

        const connect = () => {
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            let opacityValue = 1;

            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
                        ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));

                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);

                        if (isDark) {
                            ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue * 0.3})`;
                        } else {
                            ctx.strokeStyle = `rgba(37, 99, 235, ${opacityValue * 0.25})`;
                        }

                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            connect();

            animationId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        };

        const handleTouchMove = (event) => {
            if (event.touches.length > 0) {
                mouse.x = event.touches[0].clientX;
                mouse.y = event.touches[0].clientY;
            }
        };

        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const handleResize = () => {
            setCanvasSize();
            init();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('resize', handleResize);

        init();
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="interactive-background" />;
};

export default BubbleBackground;