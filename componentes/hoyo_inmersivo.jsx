'use client';
import { useRef, useEffect } from 'react';

export default function VortexTunnel({ isActive }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Solo arranca si isActive es true
       

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrame;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const particles = [];
        const particleCount = 200; // Más partículas para que se vea denso
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width - canvas.width / 2,
                y: Math.random() * canvas.height - canvas.height / 2,
                z: Math.random() * canvas.width,
                size: 1.5
            });
        }

        const animate = () => {
            // Fondo totalmente negro para que se mezcle con tu preloader
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            particles.forEach(p => {
                p.z -= 12; // Velocidad de las "bolotas"
                if (p.z <= 0) p.z = canvas.width;

                const k = 128 / p.z;
                const px = p.x * k + centerX;
                const py = p.y * k + centerY;
                const pSize = p.size * k;

                if (px > 0 && px < canvas.width && py > 0 && py < canvas.height) {
                    ctx.beginPath();
                    ctx.arc(px, py, pSize, 0, Math.PI * 2);
                    // Color azul brillante
                    ctx.fillStyle = `rgba(59, 130, 246, ${1 - p.z / canvas.width})`;
                    ctx.fill();
                }
            });

            animationFrame = requestAnimationFrame(animate);
        };

        animate();
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrame);
        };
    }, [isActive]);

    return (
        <canvas 
            ref={canvasRef} 
            className={`abolute inset-0  transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        />
    );
}