import { ArrowUpRight } from 'lucide-react';
import { FiligreeDivider, JaliBackdrop, Rosette } from './Ornaments';

const footerLinks = [
  { label: 'Collections', href: '#collections' },
  { label: 'Our Story', href: '#philosophy' },
  { label: 'The Craft', href: '#craft' },
  { label: 'Appointments', href: '#contact' },
];

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() || '';
const contactPhone = import.meta.env.VITE_CONTACT_PHONE?.trim() || '';
const socialLinks = [
  { label: 'Instagram', href: import.meta.env.VITE_INSTAGRAM_URL?.trim() || '' },
  { label: 'Pinterest', href: import.meta.env.VITE_PINTEREST_URL?.trim() || '' },
  { label: 'Facebook', href: import.meta.env.VITE_FACEBOOK_URL?.trim() || '' },
].filter(link => link.href);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden bg-theme-dark px-6 pb-8 pt-12 text-theme-light sm:px-8 lg:px-12">
      <JaliBackdrop opacity={0.12} />
      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-14 border-b border-white/10 pb-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="section-kicker">Krishna Jewelry</p>
            <h2 className="mt-5 max-w-3xl font-serif text-[clamp(3rem,6vw,6.5rem)] leading-[.88]">
              Keep what
              <em className="block italic shimmer-gold">feels timeless.</em>
            </h2>

            {(contactEmail || contactPhone) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {contactEmail && (
                  <a
                    href={`mailto:${contactEmail}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-[10px] uppercase tracking-[.18em] transition-colors hover:border-theme-accent hover:text-theme-accent"
                  >
                    Email
                  </a>
                )}
                {contactPhone && (
                  <a
                    href={`tel:${contactPhone.replace(/[^+\d]/g, '')}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-5 text-[10px] uppercase tracking-[.18em] transition-colors hover:border-theme-accent hover:text-theme-accent"
                  >
                    Call
                  </a>
                )}
              </div>
            )}
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
            {socialLinks.length > 0 ? (
              <div className="space-y-3 text-sm text-white/58">
                {socialLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block transition-colors hover:text-theme-accent"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : (
              <p className="max-w-[12rem] text-xs leading-6 text-white/35">
                Social links will appear here when the official profiles are configured.
              </p>
            )}
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

        <div className="flex flex-col items-center gap-6 pt-6">
          <Rosette className="spin-slow h-14 w-14 opacity-50" />
          <FiligreeDivider dark className="w-full max-w-2xl opacity-80" />
        </div>

        <div className="flex flex-col gap-4 pt-5 text-[9px] uppercase tracking-[.18em] text-white/22 md:flex-row md:items-center md:justify-between">
          <p>© {year} Krishna Jewelry</p>
          <p>Made with patience, not clutter.</p>
          <div className="flex gap-6">
            <a href="/privacy.html" className="transition-colors hover:text-white/65">Privacy</a>
            <a href="/terms.html" className="transition-colors hover:text-white/65">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
