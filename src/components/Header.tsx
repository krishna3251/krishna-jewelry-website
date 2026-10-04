import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '../utils';

const navLinks = [
  { name: 'Collections', href: '#collections' },
  { name: 'Our Story', href: '#philosophy' },
  { name: 'Craft', href: '#craft' },
  { name: 'Visit', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', latest => setIsScrolled(latest > 40));

  return (
    <>
      <motion.header className="fixed inset-x-0 top-0 z-50" initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: .7, ease: [0.16,1,0.3,1] }}>
        <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className={cn(
            'h-16 sm:h-[72px] rounded-full px-5 sm:px-7 flex items-center justify-between border transition-all duration-500',
            isScrolled || isMenuOpen
              ? 'bg-theme-light/92 text-theme-dark border-theme-dark/10 backdrop-blur-xl shadow-[0_16px_50px_rgba(20,15,8,.10)]'
              : 'bg-black/15 text-white border-white/15 backdrop-blur-md'
          )}>
            <nav className="hidden md:flex items-center gap-7 lg:gap-9 w-1/3">
              {navLinks.slice(0,2).map(link => (
                <a key={link.name} href={link.href} className="text-[10px] lg:text-[11px] uppercase tracking-[.22em] font-medium opacity-75 hover:opacity-100 transition-opacity">{link.name}</a>
              ))}
            </nav>

            <a href="#" className="font-serif text-2xl sm:text-3xl tracking-[.26em] uppercase font-medium">Krishna</a>

            <div className="hidden md:flex items-center justify-end gap-7 lg:gap-9 w-1/3">
              {navLinks.slice(2).map(link => (
                <a key={link.name} href={link.href} className="text-[10px] lg:text-[11px] uppercase tracking-[.22em] font-medium opacity-75 hover:opacity-100 transition-opacity">{link.name}</a>
              ))}
              <a href="#collections" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.18em] font-semibold text-theme-accent">Shop <ArrowUpRight size={13}/></a>
            </div>

            <button onClick={() => setIsMenuOpen(v => !v)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="md:hidden p-2">
              {isMenuOpen ? <X size={21}/> : <Menu size={21}/>}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className="fixed inset-0 z-40 bg-theme-light text-theme-dark pt-28 px-7 md:hidden" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <nav className="flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="flex items-end justify-between border-b border-theme-dark/10 pb-4 font-serif text-3xl" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:i*.06}}>
                  <span>{link.name}</span><ArrowUpRight size={18} className="text-theme-accent"/>
                </motion.a>
              ))}
              <a href="#collections" onClick={() => setIsMenuOpen(false)} className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-theme-dark px-6 py-3 text-[10px] uppercase tracking-[.22em] text-theme-light">Explore collection <ArrowUpRight size={14} className="text-theme-accent"/></a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
