# AGENTS.md — Krishna Jewelry Website

## Stack
- Static single-page site built with Vite 6, React 19, TypeScript, Tailwind CSS v4 via `@tailwindcss/vite`, and Motion.
- Ornament illustrations live in `src/components/Ornaments.tsx`; canvas effects include `LuxParticles` and `CursorSparkle`. The scroll-driven hero frame sequence is documented in `README.md` and implemented in `src/components/Hero.tsx`.
- Follow the existing design system and the specialized UI/UX skill under `.agents/skills/` when relevant.

## Design and implementation
- Preserve the brand's restrained, contemporary Indian-jewellery aesthetic: elegant typography, purposeful whitespace, refined gold accents, and calm editorial composition.
- Avoid generic template layouts, loud gradients, excessive glass effects, gratuitous animation, or replacing bespoke ornament artwork with stock-looking assets.
- Keep components typed and focused. Prefer existing tokens/utilities in `src/index.css`; check Tailwind v4 conventions before adding configuration.
- Treat hero animation performance as a core feature. Preserve frame indexing, decoded-frame caching, loading fallbacks, the 30 FPS cap, and the reduced-motion static frame behavior unless the requested change requires otherwise.
- Ensure canvas/animation effects do not block navigation, interaction, or content rendering. Keep semantic markup, keyboard access, responsive behavior, and accessible contrast.
- Keep the site static and avoid adding runtime server/API-key requirements unless explicitly requested.

## Commands
- Install dependencies using the lockfile.
- `npm run lint` runs TypeScript checking.
- `npm run smoke` runs the documented SSR smoke check.
- `npm run build` produces the production build.
- `npm run clean` removes generated `dist/` and `.smoke/` output; only run it when generated artifacts should be removed.

## Safety and review
- Never commit secret values. Use `.env.example` as the documented configuration source.
- Before finishing, review the UI at relevant screen sizes when visual tools are available and run checks appropriate to the touched area. Report any verification that was not possible.