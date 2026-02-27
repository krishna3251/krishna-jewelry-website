import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { GoldFloaters } from './GoldDecorations';

export default function Philosophy()
{
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Chapter 1 animations
  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.5], [1, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3, 0.4, 0.5], [0, 0, -50, -50]);
  const scale1 = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0.95]);
  const blur1 = useTransform(scrollYProgress, [0.35, 0.5], [0, 8]);

  // Chapter 2 animations
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.5, 0.8, 1], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.4, 0.5, 0.8, 1], [50, 0, 0, -50]);
  const scale2 = useTransform(scrollYProgress, [0.4, 0.5, 0.8], [0.95, 1, 1]);

  // Background accent line
  const lineWidth = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '100%', '0%']);

  return (
    <section id="philosophy" ref={containerRef} className="relative h-[300vh] bg-theme-light text-theme-dark">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        <GoldFloaters variant="light" />

        {/* Animated background accent line */}
        <motion.div
          className="absolute top-1/2 left-0 h-[1px] bg-gradient-to-r from-transparent via-theme-accent/20 to-transparent z-0"
          style={{ width: lineWidth }}
        />

        {/* Chapter 1 */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto text-center z-10"
          style={{ opacity: opacity1, y: y1, scale: scale1, filter: useTransform(blur1, v => `blur(${v}px)`) }}
        >
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="h-[1px] w-8 bg-theme-accent/40" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-theme-accent font-medium">Chapter I</span>
            <div className="h-[1px] w-8 bg-theme-accent/40" />
          </motion.div>

          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-12 leading-tight">
            {"We go back to ".split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
                {word}
              </motion.span>
            ))}
            <motion.em
              className="italic shimmer-gold inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              basics
            </motion.em>
            , <br />
            {"only ".split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.03 }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            <motion.em
              className="italic shimmer-gold inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              real
            </motion.em>
            {" elements."}
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full">
            <motion.div
              className="w-64 h-80 overflow-hidden rounded-t-full glow-pulse relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <img
                src="/images/Uncut%20Gemstones.png"
                alt="Raw gold"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-light/20 to-transparent" />
            </motion.div>
            <motion.div
              className="max-w-sm text-left"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="uppercase tracking-[0.3em] text-[10px] font-semibold mb-4 text-theme-accent flex items-center gap-2">
                <span className="w-6 h-[1px] bg-theme-accent" />
                No compromise. No shortcuts.
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-theme-dark/70">
                In a world of mass production, we choose restraint. Fewer, better elements handled with care. It's not about adding more, it's about revealing what is already perfect.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Chapter 2 */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto text-center z-10"
          style={{ opacity: opacity2, y: y2, scale: scale2 }}
        >
          <motion.div
            className="mb-6 flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="h-[1px] w-8 bg-theme-accent/40" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-theme-accent font-medium">Chapter II</span>
            <div className="h-[1px] w-8 bg-theme-accent/40" />
          </motion.div>

          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-12 leading-tight">
            {"Gems born from a ".split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
              >
                {word}
              </motion.span>
            ))}
            <motion.em
              className="italic shimmer-gold inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              landscape
            </motion.em>
            <br />
            {"carved over ".split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
              >
                {word}
              </motion.span>
            ))}
            <motion.em
              className="italic shimmer-gold inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              millennia
            </motion.em>
            .
          </h2>

          <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-16 w-full">
            <motion.div
              className="w-64 h-80 overflow-hidden rounded-b-full glow-pulse relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <img
                src="/images/Jadau%20Setting.png"
                alt="Diamond close up"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-theme-light/20 to-transparent" />
            </motion.div>
            <motion.div
              className="max-w-sm text-left md:text-right"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h3 className="uppercase tracking-[0.3em] text-[10px] font-semibold mb-4 text-theme-accent flex items-center gap-2 md:justify-end">
                Our foundation. Our proof.
                <span className="w-6 h-[1px] bg-theme-accent" />
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-theme-dark/70">
                Our journey begins deep beneath the earth's surface. A natural process of pressure and time, untouched by human hands until the moment of discovery.
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
