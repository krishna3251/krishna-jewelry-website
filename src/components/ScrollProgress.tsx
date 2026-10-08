import { useScroll, useSpring, motion, useTransform } from 'motion/react';

export default function ScrollProgress()
{
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Glow tip position
  const glowLeft = useTransform(scaleX, v => `${v * 100}%`);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #b8962c, #d4af37, #e8c84a, #d4af37)',
        }}
      />
      {/* Glow at tip */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 z-[9999] h-[6px] w-[60px] -translate-x-1/2"
        style={{
          left: glowLeft,
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.6) 0%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
    </>
  );
}
