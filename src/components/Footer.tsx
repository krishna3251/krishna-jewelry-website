import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-theme-dark text-theme-light px-6 pt-24 pb-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 border-b border-white/10 pb-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="section-kicker">Krishna Jewelry</p>
            <h2 className="mt-5 max-w-xl font-serif text-[clamp(3rem,7vw,6rem)] leading-[.9]">Made to be <em className="italic shimmer-gold">remembered.</em></h2>
            <a href="#collections" className="mt-8 inline-flex items-center gap-3 border-b border-theme-accent/50 pb-2 text-[10px] uppercase tracking-[.24em] text-theme-light">Explore the collection <ArrowUpRight size={14} className="text-theme-accent"/></a>
          </div>
          <div className="md:col-span-3">
            <p className="mb-5 text-[9px] uppercase tracking-[.3em] text-white/35">Contact</p>
            <div className="space-y-3 text-sm text-white/65">
              <a href="mailto:hello@krishnajewelry.example" className="block hover:text-theme-accent transition-colors">hello@krishnajewelry.example</a>
              <p>Private appointments by request</p>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="mb-5 text-[9px] uppercase tracking-[.3em] text-white/35">Follow</p>
            <div className="space-y-3 text-sm text-white/65">
              <a href="#" className="block hover:text-theme-accent transition-colors">Instagram</a>
              <a href="#" className="block hover:text-theme-accent transition-colors">Pinterest</a>
              <a href="#" className="block hover:text-theme-accent transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-[9px] uppercase tracking-[.18em] text-white/25 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Krishna Jewelry. All rights reserved.</p>
          <div className="flex gap-6"><a href="#" className="hover:text-white/60">Privacy</a><a href="#" className="hover:text-white/60">Terms</a></div>
          <p>Crafted with intention</p>
        </div>
      </div>
    </footer>
  );
}
