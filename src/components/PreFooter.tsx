import { motion } from 'motion/react';

export default function PreFooter() {
  return (
    <section className="relative overflow-hidden bg-theme-dark px-6 py-28 text-theme-light sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(185,149,61,.12),transparent_38%)]"/>
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="section-kicker">Private appointments</p>
        <motion.h2 className="mt-5 font-serif text-[clamp(3.4rem,8vw,7.5rem)] leading-[.86]" initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          Find the piece<em className="block italic shimmer-gold">that feels yours.</em>
        </motion.h2>
        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/55">Visit us for a private viewing, bridal consultation or a closer look at the craft behind each collection.</p>
        <a href="#contact" className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-[10px] uppercase tracking-[.22em] hover:border-theme-accent hover:text-theme-accent transition-colors">Book an appointment <span>↗</span></a>
      </div>
    </section>
  );
}
