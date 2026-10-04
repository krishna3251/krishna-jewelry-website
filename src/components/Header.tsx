import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { cn } from '../utils';

const navLinks = [
  { name: 'Collections', href: '#collections' },
  { name: 'Story', href: '#philosophy' },
  { name: 'Craft', href: '#craft' },
  { name: 'Visit', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', latest => setIsScrolled(latest > 36));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto mt-4 max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              'flex h-16 items-center justify-between rounded-full border px-4 transition-all duration-500 sm:h-[70px] sm:px-6',
              isScrolled || isMenuOpen
                ? 'border-theme-dark/10 bg-theme-light/92 text-theme-dark shadow-[0_18px_60px_rgba(20,15,8,.10)] backdrop-blur-xl'
                : 'border-white/15 bg-black/15 text-white backdrop-blur-md'
            )}
          >
            <div className="hidden min-w-0 flex-1 items-center gap-6 md:flex">
              {navLinks.slice(0, 2).map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link text-[10px] font-medium uppercase tracking-[.24em] opacity-75 transition-opacity hover:opacity-100 lg:text-[11px]"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <a
              href="#"
              className="shrink-0 font-serif text-[22px] font-medium uppercase tracking-[.30em] sm:text-[27px]"
              aria-label="Krishna Jewelry home"
            >
              Krishna
            </a>

            <div className="hidden min-w-0 flex-1 items-center justify-end gap-5 md:flex lg:gap-7">
              {navLinks.slice(2).map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="nav-link text-[10px] font-medium uppercase tracking-[.24em] opacity-75 transition-opacity hover:opacity-100 lg:text-[11px]"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#collections"
                className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.20em] text-theme-accent"
              >
                Explore <ArrowUpRight size={14} />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(value => !value)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center md:hidden"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-theme-light px-7 pb-10 pt-28 text-theme-dark md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav className="flex flex-col">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between border-b border-theme-dark/10 py-5 font-serif text-3xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight size={19} className="text-theme-accent" />
                </motion.a>
              ))}
            </nav>
            <p className="mt-10 max-w-xs text-sm leading-7 text-theme-dark/45">
              Quiet luxury, traditional detail, and a more personal way to discover jewellery.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
