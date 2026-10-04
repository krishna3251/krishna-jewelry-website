import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const craftSteps = [
  { number: '01', label: 'Shape', title: 'Start with proportion', desc: 'The silhouette is resolved first, so the piece feels balanced before detail enters the frame.' },
  { number: '02', label: 'Detail', title: 'Build the character', desc: 'Motifs, texture and stone placement are layered with restraint so the craftsmanship stays visible.' },
  { number: '03', label: 'Finish', title: 'Refine the light', desc: 'Surface, polish and setting are tuned for the way the piece catches light when it is actually worn.' },
  { number: '04', label: 'Delivery', title: 'Make the moment personal', desc: 'The final experience is part of the piece: considered presentation, close attention and time to choose well.' },
];

export default function TheCraft() {
  return (
    <section id="craft" className="relative overflow-hidden bg-theme-dark py-24 text-theme-light sm:py-32 lg:py-40">
      <div className="absolute inset-0">
        <img
          src="/images/Kundan%20Set%20with%20Saree.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover opacity-[.16]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(185,149,61,.16),transparent_32%),linear-gradient(180deg,rgba(12,10,8,.68),rgba(12,10,8,.98))]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="section-kicker">The craft</p>
            <h2 className="mt-5 max-w-xl font-serif text-[clamp(3rem,6vw,6rem)] leading-[.88]">
              Detail is
              <em className="block italic shimmer-gold">the luxury.</em>
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-white/50">
              The best detail is the kind you notice twice: first because it catches your eye, then because it rewards a closer look.
            </p>
            <a href="#collections" className="mt-8 inline-flex items-center gap-3 border-b border-theme-accent/45 pb-2 text-[10px] uppercase tracking-[.24em] text-white/80">
              See the pieces <ArrowRight size={14} className="text-theme-accent" />
            </a>
          </div>

          <div className="relative">
            <div className="absolute left-[15px] top-2 hidden h-[calc(100%-40px)] w-px bg-white/10 sm:block" />
            <div className="space-y-4">
              {craftSteps.map((step, index) => (
                <motion.article
                  key={step.number}
                  className="group relative grid gap-5 rounded-2xl border border-white/10 bg-white/[.035] p-6 backdrop-blur-sm sm:grid-cols-[70px_1fr] sm:gap-8 sm:p-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: index * 0.07 }}
                >
                  <div className="relative z-10">
                    <span className="font-mono text-[10px] tracking-[.18em] text-theme-accent">{step.number}</span>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[.28em] text-theme-accent/80">{step.label}</p>
                    <h3 className="mt-3 font-serif text-3xl sm:text-4xl">{step.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/48">{step.desc}</p>
                  </div>
                  <div className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-theme-accent/55 transition-transform duration-700 group-hover:scale-x-100 sm:inset-x-8" />
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
