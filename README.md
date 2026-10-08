# Krishna Jewelry

Indian jewellery, presented with a quieter contemporary point of view. A single-page
site built as a static bundle: no server, no runtime API keys.

## Stack

- **Vite 6** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, theme tokens in `src/index.css`)
- **motion** for scroll/entrance animation, **lucide-react** for icons
- All ornament artwork is inline SVG (`src/components/Ornaments.tsx`); gold dust and
  cursor sparkles are small canvas layers (`LuxParticles`, `CursorSparkle`)

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on `http://localhost:3000` (bound to `0.0.0.0`) |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built output on port 4173 |
| `npm run lint` | `tsc --noEmit` type check |
| `npm run smoke` | Server-renders the app and asserts every section is present |
| `npm run clean` | Removes `dist/` and `.smoke/` |

## Environment

Copy `.env.example` to `.env.local`. Everything is optional; unset values are simply
omitted from the page rather than replaced with placeholder text.

- `VITE_CONTACT_EMAIL`, `VITE_CONTACT_PHONE` — footer contact buttons
- `VITE_INSTAGRAM_URL`, `VITE_PINTEREST_URL`, `VITE_FACEBOOK_URL` — footer social links
- `VITE_SITE_URL` — production origin (e.g. `https://krishnajewelry.com`). When set, the
  build adds `canonical`/`og:url` tags and writes `sitemap.xml` plus a `robots.txt`
  `Sitemap:` line. When unset, the build stays domain-agnostic.

## Hero frame sequence

The hero scrubs `public/hero/frames/ffoutNNN.gif` on scroll. Only the odd-numbered
frames are used (`displayIndex * 2 + 1`), so the sequence holds 96 files of the
192-frame render; the unused even frames were removed to keep the payload down.
`Hero.tsx` converts the scroll progress into a display index, caches decoded frames,
falls back to the nearest loaded frame while buffering and caps drawing at 30 FPS.
Visitors with `prefers-reduced-motion` get a single static frame.

If the animation is re-rendered, replace the files and update `SOURCE_FRAME_COUNT` /
`DISPLAY_FRAME_COUNT` in `src/components/Hero.tsx`.

## Accessibility

- Modal and mobile menu close on `Escape`; the collection dialog traps and restores focus
- Canvas layers and ornamental SVGs are `aria-hidden`; all content images have alt text
- `MotionConfig reducedMotion="user"` plus a CSS media query keep motion opt-in
- Decorative headings keep a single `h1`; sections use landmark elements

## Deployment

`npm run build` emits a fully static `dist/`. Serve it from any static host or CDN and
point unknown paths at `404.html`. Remember to delete `dist/sitemap.xml` /
`dist/robots.txt` regeneration assumptions if the host manages those itself.
