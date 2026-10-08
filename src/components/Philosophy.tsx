import { motion } from 'motion/react';
import { JaliBackdrop, SectionWatermark } from './Ornaments';

const chapters = [
  {
    number: '01',
    label: 'The point of view',
    title: 'Less noise. More character.',
    copy: 'Krishna is built around the idea that a memorable piece does not need to shout. Strong proportions, considered detail and a clear sense of place do the talking.',
    image: '/images/Uncut%20Gemstones.png',
    alt: 'Uncut gemstones presented as a raw material study',
  },
  {
    number: '02',
    label: 'The language',
    title: 'Tradition, edited for now.',
    copy: 'Indian jewellery carries centuries of visual language. We keep the soul of that language while giving each piece a cleaner, more contemporary stage.',
    image: '/images/Jadau%20Setting.png',
    alt: 'Jadau jewellery with traditional Indian detailing',
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="grain relative overflow-hidden bg-theme-light py-24 sm:py-32 lg:py-40">
      <JaliBackdrop opacity={0.1} />
      <div aria-hidden="true" className="gold-bloom pointer-events-none absolute -left-40 top-24 h-[34rem] w-[34rem]" />
      <SectionWatermark number="01" className="right-4 top-16 hidden lg:block" />
      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-theme-dark/10 pb-16 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:gap-20">
          <div>
            <p className="section-kicker">Our point of view</p>
            <h2 className="mt-5 max-w-4xl font-serif text-[clamp(3rem,7vw,7rem)] leading-[.86]">
              Jewellery with
              <em className="block italic shimmer-gold">a quieter confidence.</em>
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-theme-dark/55 lg:pb-2 lg:text-base">
            The collection is rooted in Indian forms, but the presentation is deliberately modern. Every section should feel like an invitation to look closer, not a wall of decoration.
          </p>
        </div>

        <div className="mt-16 grid gap-20 lg:mt-24 lg:gap-24">
          {chapters.map((chapter, index) => (
            <div key={chapter.number} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <motion.div
                className={index % 2 ? 'lg:col-span-5 lg:col-start-8 lg:row-start-1' : 'lg:col-span-5 lg:col-start-1'}
                initial={{ opacity: 0, x: index % 2 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-7 flex items-center gap-4">
                  <span className="font-mono text-[10px] tracking-[.18em] text-theme-accent">{chapter.number}</span>
                  <span className="h-px w-12 bg-theme-accent/35" />
                  <span className="section-kicker">{chapter.label}</span>
                </div>
                <h3 className="max-w-xl font-serif text-4xl leading-[.95] sm:text-5xl lg:text-6xl">
                  {chapter.title}
                </h3>
                <p className="mt-6 max-w-md text-sm leading-7 text-theme-dark/58">
                  {chapter.copy}
                </p>
              </motion.div>

              <motion.div
                className={index % 2 ? 'lg:col-span-5 lg:col-start-2 lg:row-start-1' : 'lg:col-span-5 lg:col-start-8'}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, delay: 0.08 }}
              >
                <div className="group relative overflow-hidden bg-[#efe9dc]">
                  <img
                    src={chapter.image}
                    alt={chapter.alt}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.035]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 text-[9px] uppercase tracking-[.28em] text-white/65">Krishna / Study {chapter.number}</span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
