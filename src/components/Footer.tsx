import { ArrowUpRight } from 'lucide-react';

const footerLinks = [
  { label: 'Collections', href: '#collections' },
  { label: 'Our Story', href: '#philosophy' },
  { label: 'The Craft', href: '#craft' },
  { label: 'Appointments', href: '#contact' },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-theme-dark px-6 pb-8 pt-12 text-theme-light sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-14 border-b border-white/10 pb-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="section-kicker">Krishna Jewelry</p>
            <h2 className="mt-5 max-w-3xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[.88]">
              Keep what
              <em className="block italic shimmer-gold">feels timeless.</em>
            </h2>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-5 text-[9px] uppercase tracking-[.28em] text-white/30">Explore</p>
            <nav className="space-y-3 text-sm text-white/58">
              {footerLinks.map(link => (
                <a key={link.label} href={link.href} className="block transition-colors hover:text-theme-accent">{link.label}</a>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-5 text-[9px] uppercase tracking-[.28em] text-white/30">Social</p>
            <div className="space-y-3 text-sm text-white/58">
              <a href="#" className="block transition-colors hover:text-theme-accent">Instagram</a>
              <a href="#" className="block transition-colors hover:text-theme-accent">Pinterest</a>
              <a href="#" className="block transition-colors hover:text-theme-accent">Facebook</a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-5 text-[9px] uppercase tracking-[.28em] text-white/30">Next</p>
            <a href="#collections" className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-theme-accent">
              View the edit <ArrowUpRight size={14} />
            </a>
            <p className="mt-4 text-xs leading-6 text-white/35">
              Private appointments available by arrangement.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-[9px] uppercase tracking-[.18em] text-white/22 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Krishna Jewelry</p>
          <p>Made with patience, not clutter.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white/65">Privacy</a>
            <a href="#" className="transition-colors hover:text-white/65">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
