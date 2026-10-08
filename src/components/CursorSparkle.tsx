import { useEffect, useRef } from 'react';

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  spin: number;
};

/**
 * Gold sparkle trail that follows a fine pointer. Disabled for touch devices
 * and for visitors who ask for reduced motion.
 */
export default function CursorSparkle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = performance.now();
    const sparks: Spark[] = [];
    const MAX_SPARKS = 110;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let lastX = -1;
    let lastY = -1;
    const spawn = (x: number, y: number) => {
      if (sparks.length > MAX_SPARKS) sparks.splice(0, sparks.length - MAX_SPARKS);
      const life = 520 + Math.random() * 620;
      sparks.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42 - 0.08,
        life,
        max: life,
        size: 1.4 + Math.random() * 3.4,
        spin: Math.random() * Math.PI,
      });
    };

    const onMove = (event: PointerEvent) => {
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      lastX = event.clientX;
      lastY = event.clientY;
      if (distance < 6) return;
      spawn(event.clientX, event.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const drawStar = (spark: Spark, alpha: number, scale: number) => {
      const size = spark.size * scale;
      ctx.save();
      ctx.translate(spark.x, spark.y);
      ctx.rotate(spark.spin);
      ctx.globalAlpha = alpha;

      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 5);
      glow.addColorStop(0, 'rgba(255,244,201,.85)');
      glow.addColorStop(0.45, 'rgba(216,187,114,.28)');
      glow.addColorStop(1, 'rgba(216,187,114,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, size * 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255,248,224,.95)';
      ctx.lineWidth = 0.85;
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.stroke();
      ctx.restore();
    };

    const loop = (now: number) => {
      const delta = Math.min(48, now - previous);
      previous = now;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (let index = sparks.length - 1; index >= 0; index -= 1) {
        const spark = sparks[index];
        spark.life -= delta;
        if (spark.life <= 0) {
          sparks.splice(index, 1);
          continue;
        }
        spark.x += spark.vx * delta * 0.06;
        spark.y += spark.vy * delta * 0.06 + 0.012 * delta;
        spark.vy += 0.0006 * delta;
        const progress = spark.life / spark.max;
        drawStar(spark, progress * 0.85, 0.5 + progress * 0.7);
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 160);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] hidden h-full w-full mix-blend-screen md:block"
    />
  );
}
