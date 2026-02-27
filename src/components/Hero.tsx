import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

export default function Hero()
{
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loaded, setLoaded] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fade out content early in the scroll (0 to 15%)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Fade out scroll hint extremely early (0 to 8%)
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Preload Images
  useEffect(() =>
  {
    const frameCount = 192;
    const loadedImages: HTMLImageElement[] = [];
    let loadCounter = 0;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetCount = prefersReducedMotion ? 1 : frameCount;

    for (let i = 1; i <= targetCount; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/hero/frames/ffout${paddedIndex}.gif`;

      img.onload = () =>
      {
        loadCounter++;
        if (loadCounter === targetCount) {
          setImages(loadedImages);
          setLoaded(true);

          // Draw first frame immediately
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext('2d');
          if (canvas && ctx && loadedImages[0]) {
            canvas.width = loadedImages[0].naturalWidth;
            canvas.height = loadedImages[0].naturalHeight;
            ctx.drawImage(loadedImages[0], 0, 0, canvas.width, canvas.height);
          }
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // Frame drawing mapped to scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (latest) =>
  {
    if (!loaded || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Map 0-1 progress to 0-191 frame index
    const maxIndex = images.length - 1;
    let frameIndex = Math.floor(latest * (maxIndex + 1));
    frameIndex = Math.min(Math.max(frameIndex, 0), maxIndex);

    // Skip drawing if using reduced motion (always shows frame 0)
    if (images.length === 1) frameIndex = 0;

    const img = images[frameIndex];
    if (img) {
      // Clear and draw new frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  });

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-black">

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Loading State */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black">
            <div className="w-12 h-12 rounded-full border-2 border-theme-accent border-t-transparent animate-spin mb-4" />
            <p className="uppercase tracking-widest text-xs text-white/50">Loading...</p>
          </div>
        )}

        {/* Canvas Element */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover will-change-transform transition-opacity duration-500"
          style={{ opacity: loaded ? 1 : 0 }}
        />

        {/* Multi-layer Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 z-10 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />

        {/* Hero Text Content */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute inset-0 z-20 h-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.4 }
            }
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 w-full">
            <motion.h1
              className="text-white font-serif text-5xl md:text-7xl lg:text-9xl leading-[0.85] max-w-4xl"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <div className="overflow-hidden">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: "100%" },
                    visible: { y: "0%", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  Crafted for
                </motion.span>
              </div>
              <div className="overflow-hidden mt-2">
                <motion.em
                  className="italic font-light shimmer-gold inline-block"
                  variants={{
                    hidden: { y: "100%", opacity: 0, filter: "blur(10px)" },
                    visible: { y: "0%", opacity: 1, filter: "blur(0px)", transition: { duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  Eternity.
                </motion.em>
              </div>
            </motion.h1>

            <motion.div
              className="text-white/80 max-w-xs text-sm md:text-base font-light tracking-wide"
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <p className="mb-6 text-white/60 leading-relaxed">
                From the heart of the earth to the hands of master artisans.
              </p>
              <motion.a
                href="#philosophy"
                className="group flex items-center gap-3 uppercase tracking-[0.25em] text-[11px] border border-white/20 px-6 py-3 rounded-full hover:border-theme-accent/60 hover:text-theme-accent hover:bg-theme-accent/5 backdrop-blur-sm transition-all duration-500 w-fit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discover our story
                <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-20"
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-theme-accent mb-2"
            animate={{ opacity: [1, 0.2, 1], scale: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="uppercase tracking-[0.3em] text-[9px] text-white/40">SCROLL TO REVEAL</span>
          <motion.div
            className="w-[1px] h-12 bg-white/30 origin-top"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
    </section>
  );
}
