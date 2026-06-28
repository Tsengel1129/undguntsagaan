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

## ⚠️ Placeholders

All body copy lives in [`lib/content.ts`](lib/content.ts) and is **placeholder
text**. All images in `public/images/` are **labelled placeholder JPGs**.
Replace both with real content when ready.

### Image map — drop real Mongolian photos over these files

Keep the **same file names** and the layout will pick them up automatically.

| File(s)                         | Replace with                                  | Aspect |
| ------------------------------- | --------------------------------------------- | ------ |
| `hero.jpg`                      | Hero photo (horses on the steppe)             | 16:9   |
| `racehorse-1.jpg` … `-9.jpg`    | Racehorse photos (морьд)                       | 4:3    |
| `trainer-1.jpg` … `-9.jpg`      | Trainer portraits (уяачид)                      | 4:5    |
| `het-hutga-1.jpg` … `-3.jpg`    | Belt knife sets (хэт хутга)                     | 1:1    |
| `hoorog-1.jpg` … `-3.jpg`       | Snuff bottles (хөөрөг)                          | 1:1    |
| `silver-1.jpg` … `-3.jpg`       | Silver / heritage craft (мөнгөн эдлэл)          | 1:1    |
| `magazine-1.jpg` … `-6.jpg`     | Article cover images                          | 3:2    |

To regenerate the placeholder images: `python3 scripts/gen_placeholders.py`

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
