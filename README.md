# Undgun Tsagaan — Өндгөн цагаан

Multi-page website for **Undgun Tsagaan (Өндгөн цагаан)**, a Mongolian horse
heritage magazine. All UI text is in English; the subject matter and imagery are
Mongolian — racing horses (морьд), trainers (уяачид) and heritage treasures
(хэт хутга, хөөрөг, silverwork).

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for scroll/entrance + hover animation
- **Lenis** (`@studio-freight/lenis`) for site-wide smooth scrolling
- Google Fonts via `next/font`: **Cormorant Garamond** (headings) + **Manrope** (body)

## Pages (separate routes)

| Route          | Page              |
| -------------- | ----------------- |
| `/`            | Home              |
| `/racehorses`  | Racehorses        |
| `/trainers`    | Trainers          |
| `/heritage`    | Heritage Treasures|
| `/magazine`    | Magazine          |
| `/about`       | About             |
| `/contact`     | Contact           |

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Content & images

- **Copy** — all body text lives in [`lib/content.ts`](lib/content.ts) and is
  realistic English **placeholder** text. Edit it there.
- **Images** — every image is a real, license-free photo from
  [Unsplash](https://unsplash.com) (`images.unsplash.com`, free for commercial
  use). Each photo ID was verified to return HTTP 200 before being added. They
  are all referenced from `lib/content.ts` via the `U(photoId, width)` helper,
  so there is a single place to swap them.

### How to replace an image

1. Open [`lib/content.ts`](lib/content.ts).
2. Find the item (horse, trainer, treasure or article) and its `images` /
   `lead` / `inlineImages` field.
3. Either change the Unsplash photo ID inside `U("photo-XXXX", 1600)`, or
   replace the whole string with your own image URL (or a local `/...` path you
   add under `public/`).

`next.config.mjs` allow-lists `images.unsplash.com` under
`images.remotePatterns`. If you switch to another remote host, add it there.

### Heritage images — read this

Authentic **хэт хутга** (belt knife sets) and **хөөрөг** (snuff bottles) are
rare on Unsplash, so the heritage section uses the closest relevant
antique-knife / silver / antique-bottle imagery. Every such image is tagged with
a `// TODO: replace with real Mongolian photo` comment in `lib/content.ts` —
swap these for authentic Mongolian product photography when available.

### Image themes by section

| Section            | Theme                                              |
| ------------------ | -------------------------------------------------- |
| Hero / About       | Steppe & horse landscape                           |
| Racehorses         | Horses, galloping, close-ups                       |
| Trainers           | Riders, herders, people with horses                |
| Heritage Treasures | Antique knives, silver craft, antique bottles      |
| Magazine           | Steppe, horses, craft (varied per article)         |

### Logo & favicon

- Logo: [`components/Logo.tsx`](components/Logo.tsx) (used in header + footer) and
  [`public/logo.svg`](public/logo.svg) (standalone).
- Favicon: [`app/icon.svg`](app/icon.svg) — replaces the default Next.js/Vercel icon.

## Contact details (in footer on every page)

- **Email:** info@undguntsagaan.mn
- **Phone:** 88997733
- **Address:** Baga Toiruu-20, P.O.Box 349, SBD - 8 khoroo, Ulaanbaatar 14200

## Deploy

Deployed to Vercel (production = `main` branch).

```bash
vercel          # preview
vercel --prod   # production
```
