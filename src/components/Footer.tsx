import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

export default function Footer()
{
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeWidth, setMarqueeWidth] = useState(1035);

  useEffect(() =>
  {
    if (marqueeRef.current) {
      setMarqueeWidth(marqueeRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <footer id="contact" className="bg-theme-dark text-theme-light pt-32 pb-12 overflow-hidden relative">
      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-b from-theme-accent/5 to-transparent rounded-full blur-3xl" />

      {/* Marquee */}
      <div className="flex whitespace-nowrap overflow-hidden mb-32 relative">
        <motion.div
          ref={marqueeRef}
          className="flex gap-16 items-center"
          animate={{ x: [0, -marqueeWidth] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) => (
            <h2 key={i} className="font-serif text-6xl md:text-8xl lg:text-9xl whitespace-nowrap flex items-center gap-8">
              <span className="shimmer-gold">Taste the Clarity</span>
              <motion.span
                className="text-theme-accent text-4xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                ✧
              </motion.span>
            </h2>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left">
            <motion.h2
              className="font-serif text-5xl md:text-7xl uppercase tracking-[0.3em] mb-4 shimmer-gold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Krishna
            </motion.h2>

            <motion.p
              className="text-sm text-theme-light/30 mb-8 tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Crafted for eternity, worn with grace.
            </motion.p>

            <motion.button
              className="relative bg-transparent border border-theme-accent/40 text-theme-accent px-10 py-4 uppercase tracking-[0.25em] text-[11px] hover:bg-theme-accent hover:text-theme-dark transition-all duration-500 btn-luxury rounded-lg overflow-hidden group"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(212,175,55,0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Find a Boutique</span>
            </motion.button>
          </div>

          <div className="md:col-span-3">
            <h3 className="uppercase tracking-[0.3em] text-[10px] mb-6 text-theme-light/40 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-theme-accent/30" />
              Stay in touch
            </h3>
            <p className="text-sm mb-6 text-theme-light/50 leading-relaxed">Sign up for new collections, bespoke services and events.</p>
            <form className="flex flex-col gap-5">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-transparent border-b border-theme-light/15 pb-3 text-sm focus:outline-none focus:border-theme-accent transition-all duration-500 placeholder:text-theme-light/20"
                />
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-theme-accent group-focus-within:w-full transition-[width] duration-500" />
              </div>
              <motion.button
                type="submit"
                className="text-left uppercase tracking-[0.25em] text-[10px] text-theme-accent/70 hover:text-theme-accent transition-colors duration-300 flex items-center gap-2 group"
                whileHover={{ x: 4 }}
              >
                Subscribe
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </motion.button>
            </form>
          </div>

          <div className="md:col-span-3">
            <h3 className="uppercase tracking-[0.3em] text-[10px] mb-6 text-theme-light/40 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-theme-accent/30" />
              Follow us
            </h3>
            <ul className="flex flex-col gap-5">
              {['Instagram', 'Pinterest', 'Facebook'].map((social, i) => (
                <motion.li
                  key={social}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <a href="#" className="text-sm text-theme-light/60 hover:text-theme-accent transition-colors duration-300 flex items-center gap-2">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-theme-accent transition-[width] duration-300" />
                    {social}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto text-xs text-theme-accent">↗</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-theme-light/5 text-[10px] text-theme-light/25 gap-4 tracking-wider">
          <p className="uppercase">© Copyright KRISHNA 2026 All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-theme-accent transition-colors duration-300 uppercase">Terms and conditions</a>
            <a href="#" className="hover:text-theme-accent transition-colors duration-300 uppercase">Privacy Policy</a>
          </div>
          <p className="flex items-center gap-2 uppercase">
            Designed with
            <motion.span
              className="text-theme-accent"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ♦
            </motion.span>
            for Krishna
          </p>
        </div>
      </div>
    </footer>
  );
}
