import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { JaliBackdrop, LightRays, Mandala, Rosette } from './Ornaments';

export default function PreFooter() {
  return (
    <section className="relative overflow-hidden bg-theme-dark px-6 py-24 text-theme-light sm:py-32 lg:py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(185,149,61,.16),transparent_34%)]" />
      <JaliBackdrop opacity={0.14} />
      <LightRays />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2">
        <Mandala petals={28} className="spin-slower h-full w-full opacity-[.16]" />
      </div>
      <Rosette className="float-slow pointer-events-none absolute left-[8%] top-[18%] hidden h-20 w-20 opacity-30 lg:block" />
      <Rosette className="float-slower pointer-events-none absolute right-[7%] bottom-[14%] hidden h-24 w-24 opacity-25 lg:block" />
      <div className="relative mx-auto max-w-5xl text-center">
        <p className="section-kicker">Private appointments</p>
        <motion.h2
          className="mt-5 font-serif text-[clamp(3.3rem,8vw,8rem)] leading-[.84]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          Some pieces deserve
          <em className="block italic shimmer-gold">more time.</em>
        </motion.h2>
        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/50">
          Explore the collection, then take the next step at your own pace. Private viewing and styling conversations are available by arrangement.
        </p>
        <a
          href="#contact"
          className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-[10px] uppercase tracking-[.22em] transition-colors hover:border-theme-accent hover:text-theme-accent"
        >
          Plan a visit <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
