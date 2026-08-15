# India at 80 — What Does Freedom Look Like?

A cinematic, scroll-driven digital exhibition marking 80 years of Indian
independence (15 August 2026). Built with Next.js (App Router) + TypeScript +
Tailwind v4 + GSAP/ScrollTrigger + Lenis.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production build: `npm run build && npm start`.

## What's here

One continuous scroll (`app/page.tsx`) through fourteen chapters:
hero → India → history timeline → archive wall → people mosaic → culture →
progress → civic/dissent map → open questions → contradictions → landscape
journey → the next 80 → final transformation → credits.

- `lib/data.ts` — every historical date, civic-movement record, contradiction,
  and future-era prompt, each with a `source` field.
- `lib/assets.ts` — the **asset manifest**. This build ships with zero
  photographs by design (see below). Drop real, licensed images into
  `/public/images/<category>/` and register them here; the Archive Wall and
  other chapters pick them up automatically and stop rendering their
  generative placeholder.
- `lib/particles.ts` — shared canvas point-sampling used by every
  particle-formation visual (the "80", the India mass, the flag reveal).
- `components/` — one component per chapter, each with its own GSAP timeline,
  reduced-motion fallback, and cleanup.

## Two decisions made inside a sandboxed build environment

1. **No photography.** The environment this was built in has no network
   access to image hosts (Wikimedia, Unsplash, etc.), and the brief itself
   says not to fake documentary imagery with AI generation. So every visual
   is generative or typographic — particles, SVG pattern work, gradients —
   with the asset-manifest system above ready to take real photos the
   moment you have them.
2. **System fonts, not Google Fonts.** `next/font/google` couldn't fetch at
   build time in the sandbox. `app/globals.css` uses close system-font
   fallbacks (`--font-display-stack`, `--font-body-stack`) and documents
   exactly where to swap in real `next/font/google` imports for Instrument
   Serif / Cormorant Garamond + Inter.

## Scoped down from the full brief, on purpose

The original brief asks for far more than one build pass can respectably
cover — WebGL/Three.js scenes, a full per-state culture breakdown for all
28 states, licensed ambient audio, and a protest map of *live* current
events. What's shipped instead:

- All motion is 2D canvas + GSAP (no WebGL) — reliable, fast, and honestly
  scoped for one build.
- The civic/dissent map covers five well-documented, **closed** historical
  movements (the Emergency, the 2011 anti-corruption movement, Nirbhaya,
  CAA-NRC, the farmers' protests) rather than anything framed as live —
  each with dates, a status of "Documented / closed," and real sources.
- No audio ships. The sound toggle in `Nav.tsx` is wired but silent —
  point it at a real `<audio>` element once you have a licensed ambient
  track.
- The India outline (`lib/particles.ts`) is a hand-simplified, deliberately
  soft-edged silhouette for atmosphere — not a surveyed or authoritative
  political boundary.

## Next steps worth doing

- Populate `/public/images/` with real, sourced photography and register it
  in `lib/assets.ts`.
- Swap in real display/body fonts via `next/font/google`.
- Expand the civic map and per-region culture detail with more entries in
  `lib/data.ts` — the components are already data-driven.
- Add a licensed ambient audio track and wire it to the `Nav.tsx` toggle.
