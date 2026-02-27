import { motion } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { cn } from '../utils';
import { GoldFloaters, GoldDivider } from './GoldDecorations';

const collections = [
  {
    id: 1,
    name: "Jadau Setting",
    subtitle: "Heritage Collection",
    image: "/images/Jadau%20Setting.png",
    desc: "Exquisite jadau artistry featuring intricate details. A true celebration of heritage.",
    details: ["Handcrafted Jadau", "22k Gold", "Authentic Design"]
  },
  {
    id: 2,
    name: "Kundan Polki",
    subtitle: "Bridal Essentials",
    image: "/images/Kundan%20Polki%20Set.png",
    desc: "Stunning Kundan Polki set designed for the modern bride with traditional roots.",
    details: ["Uncut Diamonds", "22k Yellow Gold", "Seamless finish"]
  },
  {
    id: 3,
    name: "The Borla",
    subtitle: "Royal Ornament",
    image: "/images/The%20Borla.png",
    desc: "A majestic Borla adorned with precious stones, bringing royal elegance to any attire.",
    details: ["Precious Stones", "Traditional Craft", "Vintage inspired"]
  },
  {
    id: 4,
    name: "Thewa Art",
    subtitle: "Signature Collection",
    image: "/images/Thewa%20Art%20Jewelry.png",
    desc: "Intricate Thewa art jewelry showcasing gold fused with multicolored glass.",
    details: ["23K Gold Fused", "Colored Glass", "Art Deco design"]
  }
];

export default function Collections()
{
  const [selectedCol, setSelectedCol] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() =>
  {
    const handleKeyDown = (e: KeyboardEvent) =>
    {
      if (e.key === 'Escape' && selectedCol !== null) {
        closeModal();
      }

      // Focus trapping
      if (e.key === 'Tab' && selectedCol !== null && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (selectedCol !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      setTimeout(() =>
      {
        closeButtonRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () =>
    {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedCol]);

  const openModal = (id: number) =>
  {
    setSelectedCol(id);
  };

  const closeModal = () =>
  {
    const prevSelected = selectedCol;
    setSelectedCol(null);

    if (prevSelected !== null) {
      const index = collections.findIndex(c => c.id === prevSelected);
      if (index !== -1 && triggerRefs.current[index]) {
        triggerRefs.current[index]?.focus();
      }
    }
  };

  return (
    <section id="collections" className="py-32 bg-theme-light text-theme-dark relative overflow-hidden">
      <GoldFloaters variant="light" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-20 max-w-2xl">
          <motion.div
            className="mb-4 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-[1px] w-12 bg-theme-accent/40" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-theme-accent font-medium">Curated Pieces</span>
          </motion.div>

          <motion.h2
            className="font-serif text-4xl md:text-6xl lg:text-7xl mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            The{' '}
            <em className="italic shimmer-gold">Collections</em>
          </motion.h2>

          <motion.p
            className="text-theme-dark/50 text-lg font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Real Gems. Master Crafted. Naturally Different.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col, i) => (
            <motion.div
              key={col.id}
              ref={(el) => { triggerRefs.current[i] = el; }}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-expanded={selectedCol === col.id}
              onKeyDown={(e) =>
              {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openModal(col.id);
                }
              }}
              className={cn(
                "group relative overflow-hidden rounded-2xl cursor-pointer card-shine focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-offset-4 focus:ring-offset-theme-light",
                i === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[3/4]"
              )}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              onClick={() => openModal(col.id)}
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
              />

              {/* Multi-layer gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Accent border glow on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-theme-accent/20 rounded-2xl transition-all duration-500" />

              <div className="absolute bottom-0 left-0 p-8 text-white z-10">
                <motion.p className="uppercase tracking-[0.3em] text-[10px] mb-2 text-theme-accent/80 group-hover:text-theme-accent transition-colors duration-300">
                  {col.subtitle}
                </motion.p>
                <h3 className="font-serif text-3xl md:text-4xl group-hover:translate-x-2 transition-transform duration-500">
                  {col.name}
                </h3>
                <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">Discover</span>
                  <ArrowRight className="w-3 h-3 text-theme-accent" />
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-theme-accent/0 group-hover:border-theme-accent/40 transition-all duration-500 rounded-tr-lg" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedCol && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={closeModal}
            aria-hidden="true"
          />
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            className="relative bg-theme-light w-full max-w-5xl h-full max-h-[80vh] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_25px_100px_rgba(212,175,55,0.15)]"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              ref={closeButtonRef}
              className="absolute top-6 right-6 z-10 p-3 bg-white/60 hover:bg-white hover:shadow-lg rounded-full backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-accent group"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {collections.filter(c => c.id === selectedCol).map(col => (
              <div key={col.id} className="flex flex-col md:flex-row w-full h-full">
                <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
                  <motion.img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-theme-light/10" />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center overflow-y-auto">
                  <motion.p
                    className="uppercase tracking-[0.3em] text-[10px] mb-4 text-theme-accent flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="w-4 h-[1px] bg-theme-accent" />
                    {col.subtitle}
                  </motion.p>
                  <motion.h3
                    id="modal-title"
                    className="font-serif text-4xl md:text-5xl mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {col.name}
                  </motion.h3>
                  <motion.p
                    id="modal-desc"
                    className="text-theme-dark/60 mb-12 leading-relaxed text-sm md:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {col.desc}
                  </motion.p>

                  <div className="space-y-5">
                    {col.details.map((detail, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-3 border-b border-theme-dark/5 pb-4 group/detail"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                      >
                        <span className="text-theme-accent text-xs">◆</span>
                        <span className="text-sm font-medium group-hover/detail:text-theme-accent transition-colors duration-300">{detail}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    className="mt-12 bg-theme-dark text-white px-8 py-4 uppercase tracking-[0.2em] text-[11px] hover:bg-theme-accent transition-all duration-500 self-start btn-luxury rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent focus:ring-offset-2 focus:ring-offset-theme-light"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    Explore Collection
                  </motion.button>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
