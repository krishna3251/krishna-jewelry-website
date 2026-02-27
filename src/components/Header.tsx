import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '../utils';

export default function Header()
{
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) =>
  {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'The Craft', href: '#craft' },
    { name: 'Collections', href: '#collections' },
    { name: 'Boutiques', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          isScrolled || isMenuOpen
            ? 'bg-theme-light/80 backdrop-blur-xl text-theme-dark border-b border-theme-accent/10 shadow-[0_4px_30px_rgba(212,175,55,0.05)]'
            : 'bg-transparent text-white'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-10 w-1/3">
            {navLinks.slice(0, 2).map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-[11px] uppercase tracking-[0.25em] group overflow-hidden font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -1 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-theme-accent to-theme-accent/50 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <motion.div
            className="w-1/3 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="#" className="relative font-serif text-4xl md:text-5xl tracking-[0.2em] uppercase group">
              <span className={cn(
                "transition-all duration-500",
                isScrolled ? "" : "shimmer-gold"
              )}>
                Krishna
              </span>
              <Sparkles
                className="absolute -top-2 -right-5 w-3 h-3 text-theme-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>
          </motion.div>

          <div className="hidden md:flex items-center justify-end gap-10 w-1/3">
            {navLinks.slice(2, 4).map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-[11px] uppercase tracking-[0.25em] group overflow-hidden font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -1 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-theme-accent to-theme-accent/50 transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <div className="md:hidden flex items-center justify-end w-1/3">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Enhanced */}
      <motion.div
        className={cn(
          'fixed inset-0 z-40 bg-theme-light/95 backdrop-blur-2xl text-theme-dark flex flex-col items-center justify-center',
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative background circles */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-theme-accent/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-theme-accent/5 blur-3xl" />

        <nav className="flex flex-col items-center gap-10 relative z-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="relative font-serif text-4xl uppercase tracking-[0.2em] group overflow-hidden"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0, y: 30 }}
              animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ x: 8 }}
            >
              <span className="relative z-10">{link.name}</span>
              <motion.span
                className="absolute inset-0 bg-theme-accent/5 -z-0 rounded-lg"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-theme-accent to-transparent transition-[width] duration-500 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </>
  );
}
