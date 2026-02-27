import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  decay: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export default function CursorSparkle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#d4af37', '#e8c84a', '#fff8dc', '#b8962c', '#f5e6a3'];

    let throttleTimer = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const now = Date.now();
      if (now - throttleTimer < 30) return;
      throttleTimer = now;

      // Spawn 2-3 sparkle particles per move
      for (let i = 0; i < 2 + Math.random(); i++) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2 - 0.5,
          opacity: Math.random() * 0.6 + 0.4,
          decay: Math.random() * 0.015 + 0.008,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1,
        });
      }

      // Keep particles limited
      if (particlesRef.current.length > 80) {
        particlesRef.current = particlesRef.current.slice(-60);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.moveTo(0, 0);
        const angle = (i * Math.PI) / 2;
        ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
      }
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity -= p.decay;
        p.rotation += p.rotationSpeed;
        p.size *= 0.99;

        if (p.opacity <= 0) return;

        ctx.globalAlpha = p.opacity;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.5;
        drawStar(ctx, p.x, p.y, p.size * 2, p.rotation);

        // Small glow dot in center
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;

      // Remove dead particles
      particlesRef.current = particlesRef.current.filter(p => p.opacity > 0);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9997] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
