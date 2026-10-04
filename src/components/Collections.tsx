import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { cn } from '../utils';

const collections = [
  { id: 1, name: 'Jadau Setting', category: 'Heritage', image: '/images/Jadau%20Setting.png', desc: 'A highly detailed traditional composition, presented with a restrained editorial eye.', details: ['Hand-finished detail', '22k gold look', 'Heritage-inspired'] },
  { id: 2, name: 'Kundan Polki', category: 'Bridal', image: '/images/Kundan%20Polki%20Set.png', desc: 'Uncut brilliance, warm metal and ceremonial presence without visual clutter.', details: ['Uncut stone character', 'Traditional silhouette', 'Occasion-led'] },
  { id: 3, name: 'The Borla', category: 'Signature', image: '/images/The%20Borla.png', desc: 'A compact statement with unmistakable Indian character and strong sculptural form.', details: ['Signature form', 'Statement scale', 'Traditional influence'] },
  { id: 4, name: 'Thewa Art', category: 'Artisan', image: '/images/Thewa%20Art%20Jewelry.png', desc: 'Gold and coloured glass meet in a piece that sits comfortably between jewellery and art.', details: ['Artisan-led', 'Coloured glass', 'Collector feel'] },
];

const filters = ['All', 'Heritage', 'Bridal', 'Signature', 'Artisan'];

export default function Collections() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selected === null) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  const visibleCollections = filter === 'All'
    ? collections
    : collections.filter(collection => collection.category === filter);

  const active = collections.find(collection => collection.id === selected);

  return (
    <section id="collections" className="relative bg-theme-light py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="section-kicker">The collection</p>
            <h2 className="mt-5 font-serif text-[clamp(3rem,7vw,7rem)] leading-[.86]">
              Choose your
              <em className="block italic shimmer-gold">starting point.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-theme-dark/55 lg:pb-2">
            Four worlds, one point of view. Explore the edit by mood, occasion or signature style.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2 border-y border-theme-dark/10 py-4">
          {filters.map(option => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={cn(
                'rounded-full px-4 py-2 text-[9px] uppercase tracking-[.24em] transition-all',
                filter === option
                  ? 'bg-theme-dark text-theme-light'
                  : 'text-theme-dark/45 hover:text-theme-dark'
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {visibleCollections.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setSelected(item.id)}
              layout
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
              className={cn(
                'group relative overflow-hidden bg-[#ede7da] text-left focus:outline-none focus:ring-2 focus:ring-theme-accent',
                index === 0 && 'lg:col-span-7',
                index === 1 && 'lg:col-span-5',
                index > 1 && 'lg:col-span-6'
              )}
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="aspect-[1.1/1] h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.045]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="flex items-center gap-3 text-[9px] uppercase tracking-[.25em] text-theme-accent">
                  <span>{String(item.id).padStart(2, '0')}</span>
                  <span className="h-px w-8 bg-theme-accent/50" />
                  <span>{item.category}</span>
                </div>
                <div className="mt-3 flex items-end justify-between gap-5">
                  <div>
                    <h3 className="font-serif text-3xl text-white sm:text-4xl">{item.name}</h3>
                    <p className="mt-2 max-w-md text-xs leading-5 text-white/55">{item.desc}</p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-all group-hover:border-theme-accent group-hover:text-theme-accent">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="collection-title"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <motion.div
            className="relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden bg-theme-light md:grid-cols-[.95fr_1.05fr]"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close collection"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-theme-dark backdrop-blur"
            >
              <X size={17} />
            </button>

            <img src={active.image} alt={active.name} className="h-64 w-full object-cover md:h-full" />
            <div className="overflow-y-auto p-7 sm:p-10 lg:p-14">
              <p className="section-kicker">{active.category}</p>
              <h3 id="collection-title" className="mt-4 font-serif text-4xl leading-none sm:text-5xl">{active.name}</h3>
              <p className="mt-6 max-w-lg text-base leading-7 text-theme-dark/58">{active.desc}</p>

              <div className="mt-8 border-y border-theme-dark/10 py-4">
                {active.details.map(detail => (
                  <div key={detail} className="flex items-center justify-between gap-5 border-b border-theme-dark/5 py-3 text-[10px] uppercase tracking-[.14em] last:border-b-0">
                    <span className="text-theme-dark/35">Detail</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" onClick={() => setSelected(null)} className="mt-9 inline-flex items-center gap-2 rounded-full bg-theme-dark px-6 py-3 text-[10px] uppercase tracking-[.22em] text-theme-light">
                Private enquiry <ArrowUpRight size={14} className="text-theme-accent" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
