import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LightRays, Mandala, Rosette } from "./Ornaments";

const SOURCE_FRAME_COUNT = 192;
const DISPLAY_FRAME_COUNT = 96;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const MAX_CANVAS_WIDTH = 1920;

export default function Hero({ onReady }: { onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastDrawAtRef = useRef(0);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const renderedFrameRef = useRef(-1);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(DISPLAY_FRAME_COUNT).fill(null));
  const requestedRef = useRef<Set<number>>(new Set());
  const loadingRef = useRef<Set<number>>(new Set());
  const readyRef = useRef(false);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);

  const sourceIndexForDisplayFrame = (displayIndex: number) =>
    Math.min(SOURCE_FRAME_COUNT - 1, displayIndex * 2 + 1);

  const displayIndexForProgress = (progress: number) =>
    Math.max(0, Math.min(DISPLAY_FRAME_COUNT - 1, Math.round(progress * (DISPLAY_FRAME_COUNT - 1))));

  const drawFrame = (requestedIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    const safeIndex = Math.max(0, Math.min(DISPLAY_FRAME_COUNT - 1, requestedIndex));
    let image = imagesRef.current[safeIndex];

    if (!image) {
      for (let distance = 1; distance < DISPLAY_FRAME_COUNT; distance += 1) {
        const before = safeIndex - distance;
        const after = safeIndex + distance;
        if (before >= 0 && imagesRef.current[before]) { image = imagesRef.current[before]; break; }
        if (after < DISPLAY_FRAME_COUNT && imagesRef.current[after]) { image = imagesRef.current[after]; break; }
      }
    }

    if (!image?.naturalWidth || !image.naturalHeight) return;

    const scale = Math.min(1, MAX_CANVAS_WIDTH / image.naturalWidth);
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
    renderedFrameRef.current = safeIndex;
  };

  const loadFrame = (displayIndex: number) => {
    const index = Math.max(0, Math.min(DISPLAY_FRAME_COUNT - 1, displayIndex));
    if (requestedRef.current.has(index) || loadingRef.current.has(index)) return;

    requestedRef.current.add(index);
    loadingRef.current.add(index);

    const sourceIndex = sourceIndexForDisplayFrame(index);
    const image = new Image();
    image.decoding = "async";
    image.loading = "eager";
    image.src = "/hero/frames/ffout" + String(sourceIndex).padStart(3, "0") + ".gif";

    image.onload = async () => {
      loadingRef.current.delete(index);
      try { await image.decode(); } catch {}
      imagesRef.current[index] = image;

      if (index === 0 && !readyRef.current) {
        readyRef.current = true;
        setLoaded(true);
        onReady?.();
        drawFrame(0);
      }
    };

    image.onerror = () => { loadingRef.current.delete(index); };
  };

  const primeAround = (center: number) => {
    loadFrame(center);
    for (let distance = 1; distance <= 5; distance += 1) {
      loadFrame(center - distance);
      loadFrame(center + distance);
    }
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { loadFrame(0); return; }

    for (let index = 0; index < 12; index += 1) loadFrame(index);

    const warmup = window.setInterval(() => {
      primeAround(Math.round(targetFrameRef.current));
      if (requestedRef.current.size >= DISPLAY_FRAME_COUNT) window.clearInterval(warmup);
    }, 180);

    return () => window.clearInterval(warmup);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", latest => {
    const progress = Math.max(0, Math.min(1, latest));
    const frame = displayIndexForProgress(progress);
    targetFrameRef.current = frame;
    primeAround(frame);
  });

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    contextRef.current = canvas.getContext("2d");

    const animate = (timestamp: number) => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const distance = target - current;
      currentFrameRef.current = Math.abs(distance) < 0.03 ? target : current + distance * 0.20;
      const frame = Math.round(currentFrameRef.current);

      if (frame !== renderedFrameRef.current && timestamp - lastDrawAtRef.current >= FRAME_INTERVAL) {
        lastDrawAtRef.current = timestamp;
        drawFrame(frame);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current !== null) cancelAnimationFrame(animationRef.current);
      contextRef.current = null;
    };
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    currentFrameRef.current = 0;
    targetFrameRef.current = 0;
    renderedFrameRef.current = -1;
    lastDrawAtRef.current = 0;
    drawFrame(0);
  }, [loaded]);

  return (
    <section ref={containerRef} className="relative h-[380vh] bg-[#090806]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 z-20 grid place-items-center bg-[#090806]">
            <div className="text-center">
              <div className="mx-auto mb-5 h-px w-28 overflow-hidden bg-white/15">
                <div className="h-full w-2/3 bg-theme-accent animate-[slide_1.3s_ease-in-out_infinite]" />
              </div>
              <p className="text-[9px] uppercase tracking-[.35em] text-white/35">Preparing the collection</p>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" style={{ opacity: loaded ? 1 : 0 }} aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,transparent_0,rgba(0,0,0,.10)_38%,rgba(0,0,0,.78)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/25" />

        <LightRays className="z-[6]" />

        {/* Rotating gold mandalas that frame the piece behind the headline. */}
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 z-[6] h-[86vmin] w-[86vmin] -translate-x-1/2 -translate-y-1/2">
          <Mandala petals={36} className="spin-slower h-full w-full opacity-[.26]" />
        </div>
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 z-[6] h-[54vmin] w-[54vmin] -translate-x-1/2 -translate-y-1/2">
          <Mandala petals={16} className="spin-slow h-full w-full opacity-[.18]" />
        </div>
        <Rosette className="twinkle absolute right-[8%] top-[22%] z-[6] hidden h-20 w-20 opacity-40 sm:block" />
        <Rosette className="float-slow absolute left-[9%] top-[30%] z-[6] hidden h-14 w-14 opacity-30 lg:block" />

        <motion.div style={{ opacity: contentOpacity }} className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-[1440px] flex-col gap-9 px-6 pb-10 sm:px-8 md:flex-row md:items-end md:justify-between md:pb-14 lg:px-12">
          <div className="max-w-3xl">
            <p className="mb-4 text-[10px] uppercase tracking-[.32em] text-theme-accent">Krishna Jewelry · Fine Indian Craft</p>
            <h1 className="font-serif text-[clamp(3.3rem,9vw,8.5rem)] leading-[.84] text-white">Jewelry with<em className="block font-light italic shimmer-gold">a point of view.</em></h1>
          </div>
          <div className="max-w-xs text-sm text-white/65 md:pb-2">
            <p className="leading-7">Heritage techniques, refined silhouettes and pieces designed to be worn well beyond the occasion.</p>
            <a href="#collections" className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-3 text-[10px] uppercase tracking-[.22em] text-white transition-colors hover:border-theme-accent hover:text-theme-accent">Explore collection <span>↘</span></a>
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center text-white/30">
          <span className="text-[8px] uppercase tracking-[.35em]">Scroll</span>
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-theme-accent/70 to-transparent" />
        </div>

        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[7] h-24 bg-gradient-to-t from-[#0c0a08] to-transparent" />
      </div>
    </section>
  );
}