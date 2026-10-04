import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

export default function Hero({ onReady }: { onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start','end end'] });
  const contentOpacity = useTransform(scrollYProgress, [0,.15], [1,0]);

  useEffect(() => {
    let cancelled = false;
    const count = 192;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = reduced ? 1 : count;
    const next: HTMLImageElement[] = [];
    let done = 0;

    for (let i=1;i<=target;i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = `/hero/frames/ffout${String(i).padStart(3,'0')}.gif`;
      img.onload = () => {
        if (cancelled) return;
        done++;
        if (done === target) {
          setImages(next);
          setLoaded(true);
          onReady?.();
        }
      };
      next.push(img);
    }
    return () => { cancelled = true; };
  }, [onReady]);

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    if (!loaded || !images.length || !canvasRef.current) return;
    const img = images[Math.min(images.length-1, Math.floor(latest*images.length))];
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx || !img) return;
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
  });

  return (
    <section ref={containerRef} className="relative h-[420vh] bg-[#090806]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 z-20 grid place-items-center bg-[#090806]">
            <div className="text-center">
              <div className="mx-auto mb-5 h-px w-28 overflow-hidden bg-white/15"><div className="h-full w-2/3 bg-theme-accent animate-[slide_1.3s_ease-in-out_infinite]"/></div>
              <p className="text-[9px] uppercase tracking-[.35em] text-white/35">Preparing the collection</p>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" style={{opacity:loaded?1:0}} aria-hidden="true"/>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,transparent_0,rgba(0,0,0,.10)_38%,rgba(0,0,0,.78)_100%)]"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/25"/>

        <motion.div style={{opacity:contentOpacity}} className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-7xl flex-col gap-9 px-6 pb-10 sm:px-8 md:flex-row md:items-end md:justify-between md:pb-14 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 text-[10px] uppercase tracking-[.32em] text-theme-accent">Krishna Jewelry · Fine Indian Craft</p>
            <h1 className="font-serif text-[clamp(3.3rem,9vw,8.5rem)] leading-[.84] text-white">Jewelry with<em className="block italic font-light shimmer-gold">a point of view.</em></h1>
          </div>
          <div className="max-w-xs text-sm text-white/65 md:pb-2">
            <p className="leading-7">Heritage techniques, refined silhouettes and pieces designed to be worn well beyond the occasion.</p>
            <a href="#collections" className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[.22em] text-white hover:border-theme-accent hover:text-theme-accent transition-colors">Explore collection <span>↘</span></a>
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center text-white/30"><span className="text-[8px] uppercase tracking-[.35em]">Scroll</span><div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-theme-accent/70 to-transparent"/></div>
      </div>
    </section>
  );
}
