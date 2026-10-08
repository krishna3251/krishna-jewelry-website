import { useId } from 'react';
import { cn } from '../utils';

/**
 * Shared gold-graphic primitives. Every ornament is pure inline SVG so it stays
 * crisp at any size and costs nothing to load.
 */

function useGoldIds() {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, '');
  return { gold: `gold-${raw}`, glow: `glow-${raw}` };
}

function GoldDefs({ gold, glow }: { gold: string; glow: string }) {
  return (
    <defs>
      <linearGradient id={gold} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8f6d25" />
        <stop offset="38%" stopColor="#d8bb72" />
        <stop offset="52%" stopColor="#fff4c9" />
        <stop offset="72%" stopColor="#bd9743" />
        <stop offset="100%" stopColor="#8f6d25" />
      </linearGradient>
      <radialGradient id={glow} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#d8bb72" stopOpacity=".55" />
        <stop offset="70%" stopColor="#d8bb72" stopOpacity=".08" />
        <stop offset="100%" stopColor="#d8bb72" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/** Concentric jali mandala — the main hero/craft ornament. */
export function Mandala({ className, petals = 24 }: { className?: string; petals?: number }) {
  const { gold, glow } = useGoldIds();
  const spokes = Array.from({ length: petals }, (_, i) => (i * 360) / petals);

  return (
    <svg viewBox="0 0 200 200" className={cn('pointer-events-none', className)} aria-hidden="true" focusable="false">
      <GoldDefs gold={gold} glow={glow} />
      <circle cx="100" cy="100" r="98" fill={`url(#${glow})`} opacity=".55" />
      <g fill="none" stroke={`url(#${gold})`} strokeWidth=".6" strokeLinecap="round">
        <circle cx="100" cy="100" r="96" opacity=".55" />
        <circle cx="100" cy="100" r="86" strokeDasharray="1.5 5" opacity=".6" />
        <circle cx="100" cy="100" r="64" opacity=".75" />
        <circle cx="100" cy="100" r="40" strokeDasharray="3 4" opacity=".8" />
        <circle cx="100" cy="100" r="15" opacity=".95" />
        {spokes.map(angle => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            <path d="M100 5 C104.5 30 105 42 100 56 C95 42 95.5 30 100 5 Z" />
            <line x1="100" y1="60" x2="100" y2="80" opacity=".6" />
          </g>
        ))}
        {spokes.filter((_, i) => i % 2 === 0).map(angle => (
          <g key={`petal-${angle}`} transform={`rotate(${angle + 7.5} 100 100)`}>
            <ellipse cx="100" cy="78" rx="4.6" ry="11" opacity=".55" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Eight-petal rosette used as a floating accent. */
export function Rosette({ className }: { className?: string }) {
  const { gold, glow } = useGoldIds();
  const petals = [0, 45, 90, 135];

  return (
    <svg viewBox="0 0 100 100" className={cn('pointer-events-none', className)} aria-hidden="true" focusable="false">
      <GoldDefs gold={gold} glow={glow} />
      <circle cx="50" cy="50" r="48" fill={`url(#${glow})`} opacity=".5" />
      <g fill="none" stroke={`url(#${gold})`} strokeWidth=".8">
        <circle cx="50" cy="50" r="46" opacity=".5" />
        <circle cx="50" cy="50" r="30" strokeDasharray="2 3" opacity=".7" />
        <circle cx="50" cy="50" r="6" fill={`url(#${gold})`} stroke="none" opacity=".9" />
        {petals.map(angle => (
          <g key={angle} transform={`rotate(${angle} 50 50)`}>
            <ellipse cx="50" cy="26" rx="8" ry="17" opacity=".75" />
            <ellipse cx="50" cy="26" rx="3.4" ry="9" opacity=".45" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Corner filigree flourish for framing image blocks. */
export function CornerFlourish({ className, flip }: { className?: string; flip?: boolean }) {
  const { gold } = useGoldIds();

  return (
    <svg
      viewBox="0 0 120 120"
      className={cn('pointer-events-none absolute h-16 w-16 opacity-70', flip && 'scale-x-[-1]', className)}
      aria-hidden="true"
      focusable="false"
    >
      <GoldDefs gold={gold} glow={`${gold}-x`} />
      <g fill="none" stroke={`url(#${gold})`} strokeWidth="1" strokeLinecap="round">
        <path d="M4 4 H48" />
        <path d="M4 4 V48" />
        <path d="M4 4 C34 10 44 22 50 52" opacity=".55" />
        <path d="M4 4 C10 34 22 44 52 50" opacity=".55" />
        <circle cx="56" cy="56" r="3.2" fill={`url(#${gold})`} stroke="none" opacity=".85" />
        <path d="M62 56 C70 56 74 60 74 68" opacity=".4" />
        <path d="M56 62 C56 70 60 74 68 74" opacity=".4" />
      </g>
    </svg>
  );
}

/** Ornate divider with a central gem and flanking scrollwork. */
export function FiligreeDivider({ dark = false, className }: { dark?: boolean; className?: string }) {
  const { gold } = useGoldIds();

  return (
    <div className={cn('relative flex items-center justify-center gap-4 py-2', className)} aria-hidden="true">
      <svg viewBox="0 0 220 24" className="h-6 w-full max-w-[220px] opacity-70" focusable="false">
        <GoldDefs gold={gold} glow={`${gold}-d`} />
        <g fill="none" stroke={`url(#${gold})`} strokeWidth=".9" strokeLinecap="round">
          <path d="M0 12 H72" />
          <path d="M72 12 C84 12 92 4 106 12 C92 20 84 12 72 12 Z" />
        </g>
      </svg>

      <svg viewBox="0 0 40 40" className="h-7 w-7 shrink-0" focusable="false">
        <GoldDefs gold={`${gold}-g`} glow={`${gold}-c`} />
        <g transform="rotate(45 20 20)" fill="none" stroke={`url(#${gold}-g)`} strokeWidth=".9">
          <rect x="7" y="7" width="26" height="26" />
          <rect x="12" y="12" width="16" height="16" opacity=".7" />
          <circle cx="20" cy="20" r="4" fill={`url(#${gold}-g)`} stroke="none" />
        </g>
      </svg>

      <svg viewBox="0 0 220 24" className="h-6 w-full max-w-[220px] scale-x-[-1] opacity-70" focusable="false">
        <GoldDefs gold={`${gold}-r`} glow={`${gold}-r2`} />
        <g fill="none" stroke={`url(#${gold}-r)`} strokeWidth=".9" strokeLinecap="round">
          <path d="M0 12 H72" />
          <path d="M72 12 C84 12 92 4 106 12 C92 20 84 12 72 12 Z" />
        </g>
      </svg>

      <span className={cn('sr-only', dark && 'text-white')}>Krishna Jewelry</span>
    </div>
  );
}

/** Tiled jali lattice backdrop. */
export function JaliBackdrop({ className, opacity = 0.14 }: { className?: string; opacity?: number }) {
  const id = `jali-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <svg
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      style={{ opacity }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={id} width="72" height="72" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#b9953d" strokeWidth=".7">
            <path d="M36 4 C54 18 54 54 36 68 C18 54 18 18 36 4 Z" opacity=".8" />
            <path d="M4 36 C18 18 54 18 68 36 C54 54 18 54 4 36 Z" opacity=".55" />
            <circle cx="36" cy="36" r="7" opacity=".7" />
            <circle cx="0" cy="0" r="3" opacity=".5" />
            <circle cx="72" cy="0" r="3" opacity=".5" />
            <circle cx="0" cy="72" r="3" opacity=".5" />
            <circle cx="72" cy="72" r="3" opacity=".5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Thin gold light rays for dark hero / footer panels. */
export function LightRays({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      <div className="ray-pulse absolute -top-1/3 left-1/2 h-[140%] w-[38rem] -translate-x-1/2 rotate-6 bg-[linear-gradient(90deg,transparent,rgba(216,187,114,.16),transparent)] blur-2xl" />
      <div className="ray-pulse absolute -top-1/3 left-[18%] h-[140%] w-[16rem] -rotate-12 bg-[linear-gradient(90deg,transparent,rgba(216,187,114,.12),transparent)] blur-2xl" style={{ animationDelay: '1.6s' }} />
      <div className="ray-pulse absolute -top-1/3 right-[16%] h-[140%] w-[14rem] rotate-12 bg-[linear-gradient(90deg,transparent,rgba(216,187,114,.10),transparent)] blur-2xl" style={{ animationDelay: '3.1s' }} />
    </div>
  );
}

/** Faint oversized section number watermark. */
export function SectionWatermark({ number, className }: { number: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('pointer-events-none absolute select-none font-serif text-[22vw] leading-none text-theme-dark/[.045]', className)}
    >
      {number}
    </span>
  );
}
