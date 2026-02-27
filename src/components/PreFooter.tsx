import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { GoldFloaters } from './GoldDecorations';
import LuxParticles from './LuxParticles';

export default function PreFooter()
{
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-40 bg-theme-dark text-theme-light text-center px-6 overflow-hidden">
      {/* 3D Gold Particles Background */}
      <div className="absolute inset-0 opacity-40">
        <LuxParticles />
      </div>

      <GoldFloaters variant="dark" />

      {/* Radial glow spots */}
      <div className="radial-glow w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        className="max-w-4xl mx-auto flex flex-col items-center gap-12 relative z-10"
        style={{ scale, opacity }}
      >
        {/* Decorative top element */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-theme-accent/40" />
          <span className="text-theme-accent text-xs">◆</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-theme-accent/40" />
        </motion.div>

        <motion.h2
          className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.85]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {["Leave", "no", "trace"].map((word, i) => (
            <motion.span
              key={word}
              className="block"
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {i === 1 ? (
                <span className="relative inline-block">
                  <em className="italic shimmer-gold relative z-10">{word}</em>
                  <motion.span
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden z-0 opacity-60"
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img src="/images/Uncut%20Gemstones.png" alt="Gemstones" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-theme-dark/30" />
                  </motion.span>
                  {/* Glow ring around image */}
                  <motion.span
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-44 md:h-44 rounded-full z-0"
                    style={{
                      border: '1px solid rgba(212,175,55,0.2)',
                      boxShadow: '0 0 40px rgba(212,175,55,0.1)',
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.6 }}
                    animate={{ scale: [1, 1.05, 1] }}
                  />
                </span>
              ) : (
                <motion.span
                  whileHover={{ letterSpacing: '0.05em' }}
                  transition={{ duration: 0.3 }}
                >
                  {word}
                </motion.span>
              )}
            </motion.span>
          ))}
        </motion.h2>

        <motion.div
          className="flex items-center gap-4 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-theme-accent/30" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-theme-accent/60">Sustainability</span>
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-theme-accent/30" />
        </motion.div>

        <motion.p
          className="max-w-md text-sm md:text-base text-theme-light/50 leading-relaxed mt-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Our commitment extends beyond purity, it's a matter of responsibility. We use recycled gold, ethically sourced diamonds, and design processes that respect the earth that inspires us.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#"
          className="mt-8 inline-flex items-center gap-3 uppercase tracking-[0.25em] text-[11px] text-theme-accent border border-theme-accent/30 px-8 py-4 rounded-full hover:bg-theme-accent/10 hover:border-theme-accent/60 transition-all duration-500 btn-luxury"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Our Promise
          <span className="text-theme-accent">→</span>
        </motion.a>
      </motion.div>
    </section>
  );
}
