import { JaliBackdrop, Rosette } from './Ornaments';

const strip = [
  { src: '/images/Jadau%20Setting.png', label: 'Jadau', note: 'Heritage setting' },
  { src: '/images/Kundan%20Polki%20Set.png', label: 'Polki', note: 'Uncut brilliance' },
  { src: '/images/The%20Borla.png', label: 'Borla', note: 'Signature form' },
  { src: '/images/Thewa%20Art%20Jewelry.png', label: 'Thewa', note: 'Artisan glass' },
  { src: '/images/Uncut%20Gemstones.png', label: 'Stones', note: 'Raw material study' },
  { src: '/images/Kundan%20Set%20with%20Saree.png', label: 'Ceremony', note: 'Styled in context' },
];

function Track({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 items-stretch gap-5 pr-5" aria-hidden={duplicate || undefined}>
      {strip.map(item => (
        <figure key={`${item.label}-${duplicate ? 'b' : 'a'}`} className="group relative w-[15rem] shrink-0 overflow-hidden bg-[#eee7da] sm:w-[19rem]">
          <img src={item.src} alt={duplicate ? '' : item.label} loading="lazy" className="h-56 w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105 sm:h-72" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
            <span>
              <span className="block font-serif text-2xl text-white">{item.label}</span>
              <span className="mt-1 block text-[9px] uppercase tracking-[.24em] text-white/55">{item.note}</span>
            </span>
            <Rosette className="h-8 w-8 opacity-70" />
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Endless gold-image rail that shows the collection in motion. */
export default function GoldMarquee() {
  return (
    <section className="grain relative overflow-hidden bg-theme-light py-20 sm:py-24">
      <JaliBackdrop opacity={0.09} />
      <div className="relative mx-auto mb-10 flex max-w-[1440px] flex-col gap-4 px-6 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-12">
        <div>
          <p className="section-kicker">In motion</p>
          <h2 className="mt-4 font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[.9]">
            The edit,
            <em className="ml-3 italic shimmer-gold">in rotation.</em>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-7 text-theme-dark/55">
          Hover to pause the rail. Every piece is photographed in natural light so the metal reads the way it will on the day.
        </p>
      </div>

      <div className="marquee-mask mask-fade-x relative">
        <div className="marquee-track">
          <Track />
          <Track duplicate />
        </div>
      </div>
    </section>
  );
}
