import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  radius: number;
  rise: number;
  sway: number;
  phase: number;
  pulse: number;
  alpha: number;
};

/**
 * Slow-drifting gold dust that sits above the page backgrounds.
 * Canvas cost is bounded by viewport size and capped device pixel ratio.
 */
export default function LuxParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let time = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(58, Math.max(14, (width * height) / 42000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.6 + Math.random() * 1.5,
        rise: 0.08 + Math.random() * 0.34,
        sway: 0.12 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        pulse: Math.random() * Math.PI * 2,
        alpha: 0.18 + Math.random() * 0.5,
      }));
    };

    const paint = (delta: number) => {
      time += delta;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (const particle of particles) {
        particle.y -= particle.rise * delta * 0.06;
        particle.x += Math.sin(time * 0.0004 + particle.phase) * particle.sway * delta * 0.05;

        if (particle.y < -12) {
          particle.y = height + 12;
          particle.x = Math.random() * width;
        }
        if (particle.x < -12) particle.x = width + 12;
        if (particle.x > width + 12) particle.x = -12;

        const twinkle = 0.45 + 0.55 * Math.sin(time * 0.0012 + particle.pulse);
        const alpha = Math.max(0, particle.alpha * twinkle);

        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 6);
        gradient.addColorStop(0, `rgba(255,244,201,${alpha})`);
        gradient.addColorStop(0.4, `rgba(216,187,114,${alpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(216,187,114,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255,250,232,${Math.min(1, alpha + 0.15)})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    build();

    if (reduced) {
      paint(16);
      const onResize = () => {
        build();
        paint(16);
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    let previous = performance.now();
    const loop = (now: number) => {
      const delta = Math.min(48, now - previous);
      previous = now;
      if (!document.hidden) paint(delta);
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 180);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] h-full w-full opacity-70 mix-blend-screen"
    />
  );
}
