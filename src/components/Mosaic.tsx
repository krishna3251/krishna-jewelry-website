import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { GoldFloaters, ParallaxLines } from './GoldDecorations';

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}

export default function Mosaic()
{
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <section ref={sectionRef} className="py-32 bg-theme-light text-theme-dark overflow-hidden relative">
      <GoldFloaters variant="light" />
      <ParallaxLines />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section title */}
        <div className="text-center mb-24">
          <motion.div
            className="mb-6 flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-theme-accent/40" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-theme-accent font-medium">Gallery</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-theme-accent/40" />
          </motion.div>

          <motion.h2
            className="font-serif text-5xl md:text-7xl lg:text-9xl leading-[0.85]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {"In".split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 60, rotateX: 90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
            <br />
            <motion.em
              className="italic shimmer-gold"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              Good
            </motion.em>
            <br />
            {"Company".split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 60, rotateX: 90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.04 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
          {/* Main image */}
          <TiltCard className="md:col-span-5 md:col-start-2 aspect-[4/5] rounded-3xl overflow-hidden z-10 shadow-2xl">
            <motion.div
              className="w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              style={{ y: imgY }}
            >
              <img
                src="/images/Kundan%20Set%20with%20Saree.png"
                alt="Model wearing jewelry"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.1)]" />
            </motion.div>
          </TiltCard>

          <div className="md:col-span-4 md:col-start-8 flex flex-col gap-12 z-20 md:-ml-12 mt-12 md:mt-0">
            {/* Secondary image */}
            <TiltCard className="aspect-square rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] relative">
              <motion.div
                className="w-full h-full"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src="/images/Thewa%20Art%20Jewelry.png"
                  alt="Jewelry details"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </motion.div>
              {/* Corner accent */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-theme-accent/30 rounded-tl-lg" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-theme-accent/30 rounded-br-lg" />
            </TiltCard>

            {/* Text card with glassmorphism */}
            <motion.div
              className="relative glass-card p-8 rounded-3xl"
              style={{ y: textY }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 rounded-full bg-theme-accent"
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-4 right-8 w-1 h-1 rounded-full bg-theme-accent/50"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />

              <p className="text-lg md:text-xl font-serif mb-4 leading-snug">
                A <em className="italic shimmer-gold">network</em> of creators, curators, and places that <em className="italic shimmer-gold">embody</em> the Krishna spirit.
              </p>
              <p className="text-sm text-theme-dark/50 leading-relaxed">
                From the finest ateliers in Paris to boutiques around the world, Krishna connects those who share a taste for purity, craft, and timeless elegance.
              </p>

              {/* Bottom accent */}
              <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-theme-accent/30 via-theme-accent/10 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
