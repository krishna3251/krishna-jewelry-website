import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

export default function Hero({ onReady }: { onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const renderedFrameRef = useRef(-1);
  const [loaded, setLoaded] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    const img = images[frameIndex];

    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    renderedFrameRef.current = frameIndex;
  };

  useEffect(() => {
    if (!loaded || !images.length) return;

    const animate = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      // Smoothly chase the scroll position instead of snapping directly to it.
      const distance = target - current;

      if (Math.abs(distance) < 0.02) {
        currentFrameRef.current = target;
      } else {
        // Higher = more responsive, lower = smoother.
        currentFrameRef.current = current + distance * 0.16;
      }

      const frame = Math.max(
        0,
        Math.min(images.length - 1, Math.round(currentFrameRef.current))
      );

      if (frame !== renderedFrameRef.current) {
        renderFrame(frame);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [loaded, images]);

  useEffect(() => {
    let cancelled = false;

    const frameCount = 192;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetCount = reduced ? 1 : frameCount;
    const nextImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= targetCount; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = `/hero/frames/ffout${String(i).padStart(3, '0')}.gif`;

      img.onload = () => {
        if (cancelled) return;

        loadedCount += 1;

        if (loadedCount === targetCount) {
          setImages(nextImages);
          setLoaded(true);
          onReady?.();
        }
      };

      nextImages.push(img);
    }

    return () => {
      cancelled = true;
    };
  }, [onReady]);

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    if (!images.length) return;

    // Keep the target as a fractional frame. The RAF loop handles the easing.
    const clampedProgress = Math.max(0, Math.min(1, latest));
    targetFrameRef.current = clampedProgress * (images.length - 1);
  });

  // Draw the first frame immediately once the assets are ready.
  useEffect(() => {
    if (!loaded || !images.length) return;

    currentFrameRef.current = 0;
    targetFrameRef.current = 0;
    renderedFrameRef.current = -1;
    renderFrame(0);
  }, [loaded, images]);

  return (
    <section ref={containerRef} className="relative h-[420vh] bg-[#090806]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 z-20 grid place-items-center bg-[#090806]">
            <div className="text-center">
              <div className="mx-auto mb-5 h-px w-28 overflow-hidden bg-white/15">
                <div className="h-full w-2/3 bg-theme-accent animate-[slide_1.3s_ease-in-out_infinite]" />
              </div>
              <p className="text-[9px] uppercase tracking-[.35em] text-white/35">
                Preparing the collection
              </p>
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: loaded ? 1 : 0 }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,transparent_0,rgba(0,0,0,.10)_38%,rgba(0,0,0,.78)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/25" />

        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-7xl flex-col gap-9 px-6 pb-10 sm:px-8 md:flex-row md:items-end md:justify-between md:pb-14 lg:px-10"
        >
          <div className="max-w-3xl">
            <p className="mb-4 text-[10px] uppercase tracking-[.32em] text-theme-accent">
              Krishna Jewelry · Fine Indian Craft
            </p>
            <h1 className="font-serif text-[clamp(3.3rem,9vw,8.5rem)] leading-[.84] text-white">
              Jewelry with
              <em className="block italic font-light shimmer-gold">
                a point of view.
              </em>
            </h1>
          </div>

          <div className="max-w-xs text-sm text-white/65 md:pb-2">
            <p className="leading-7">
              Heritage techniques, refined silhouettes and pieces designed to be
              worn well beyond the occasion.
            </p>
            <a
              href="#collections"
              className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[.22em] text-white transition-colors hover:border-theme-accent hover:text-theme-accent"
            >
              Explore collection <span>↘</span>
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center text-white/30">
          <span className="text-[8px] uppercase tracking-[.35em]">Scroll</span>
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-theme-accent/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
