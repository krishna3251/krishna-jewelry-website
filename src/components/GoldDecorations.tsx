import { motion, useScroll, useTransform } from 'motion/react';
import { FiligreeDivider, Rosette } from './Ornaments';

export function GoldDivider({ dark = false }: { dark?: boolean }) {
  return (
    <div className={dark ? 'bg-theme-dark' : 'bg-theme-light'}>
      <FiligreeDivider dark={dark} className="mx-auto max-w-3xl" />
    </div>
  );
}

/** Slow floating rosettes that add depth to otherwise empty margins. */
export function GoldFloaters() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[4] hidden overflow-hidden lg:block">
      <Rosette className="float-slow absolute left-[4%] top-[24%] h-40 w-40 opacity-[.16]" />
      <Rosette className="float-slower absolute right-[3%] top-[58%] h-56 w-56 opacity-[.12]" />
      <Rosette className="spin-slow absolute left-[46%] top-[8%] h-24 w-24 opacity-[.10]" />
    </div>
  );
}

/** Thin gold rules that drift at a different rate than the page. */
export function ParallaxLines() {
  const { scrollYProgress } = useScroll();
  const left = useTransform(scrollYProgress, [0, 1], ['6%', '26%']);
  const right = useTransform(scrollYProgress, [0, 1], ['94%', '72%']);
  const mid = useTransform(scrollYProgress, [0, 1], ['-8%', '18%']);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[3] hidden overflow-hidden md:block">
      <motion.div style={{ left }} className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-theme-accent/25 to-transparent" />
      <motion.div style={{ right }} className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-theme-accent/20 to-transparent" />
      <motion.div style={{ left: mid }} className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-theme-accent/10 to-transparent" />
    </div>
  );
}
