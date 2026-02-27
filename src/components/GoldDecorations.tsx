import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/**
 * Floating gold decorative elements that create depth and luxury atmosphere.
 * Place this inside a section with `position: relative; overflow: hidden`.
 */
export function GoldFloaters({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const accent = 'rgba(212, 175, 55,';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Large soft orb top-right */}
      <motion.div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full animate-float-slow"
        style={{
          background: `radial-gradient(circle, ${accent}0.06) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Small gold circle */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-3 h-3 rounded-full animate-float"
        style={{ background: `${accent}0.3)` }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Medium ring */}
      <motion.div
        className="absolute top-[60%] right-[8%] w-16 h-16 rounded-full border animate-float-reverse"
        style={{ borderColor: `${accent}0.1)` }}
      />

      {/* Tiny diamond shapes */}
      <motion.div
        className="absolute top-[15%] right-[25%] w-2 h-2 rotate-45 animate-twinkle"
        style={{
          background: variant === 'dark' ? `${accent}0.4)` : `${accent}0.2)`,
          animationDelay: '0.5s',
        }}
      />
      <motion.div
        className="absolute bottom-[25%] left-[15%] w-1.5 h-1.5 rotate-45 animate-twinkle"
        style={{
          background: variant === 'dark' ? `${accent}0.3)` : `${accent}0.15)`,
          animationDelay: '1.5s',
        }}
      />

      {/* Soft orb bottom-left */}
      <motion.div
        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full animate-float-slow"
        style={{
          background: `radial-gradient(circle, ${accent}0.04) 0%, transparent 70%)`,
          filter: 'blur(50px)',
          animationDelay: '2s',
        }}
      />

      {/* Subtle line */}
      <motion.div
        className="absolute top-[40%] left-0 h-[1px] animate-float"
        style={{
          width: '120px',
          background: `linear-gradient(to right, transparent, ${accent}0.15), transparent)`,
        }}
      />
    </div>
  );
}

/**
 * A horizontal gold separator between sections.
 */
export function GoldDivider({ dark = false }: { dark?: boolean }) {
  return (
    <div className="relative py-2">
      <div className={`gold-separator mx-auto w-full max-w-2xl ${dark ? 'gold-separator-dark' : ''}`} />
    </div>
  );
}

/**
 * Scroll-based parallax lines decoration.
 */
export function ParallaxLines() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const rotate1 = useTransform(scrollYProgress, [0, 1], ['-5deg', '5deg']);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute top-0 right-[20%] w-[1px] h-[200px]"
        style={{
          y: y1,
          rotate: rotate1,
          background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.15), transparent)',
        }}
      />
      <motion.div
        className="absolute bottom-0 left-[30%] w-[1px] h-[150px]"
        style={{
          y: y2,
          background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.1), transparent)',
        }}
      />
    </div>
  );
}
