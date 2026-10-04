export function GoldFloaters() { return null; }
export function GoldDivider({ dark = false }: { dark?: boolean }) {
  return <div className={dark ? "mx-auto my-2 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-theme-accent/20 to-transparent" : "mx-auto my-2 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-theme-accent/30 to-transparent"} aria-hidden="true" />;
}
export function ParallaxLines() { return null; }
