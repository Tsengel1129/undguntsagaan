import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

/* ─────────────────────────────────────────────────────────────
   Reusable editorial layout building blocks.
   Mix and alternate these so list pages and articles avoid the
   "every block identical" look. All text-over-image variants
   carry a scrim for legibility.
   ───────────────────────────────────────────────────────────── */

type Accent = "red" | "gold";
const accentText = (a: Accent) => (a === "gold" ? "text-gold-soft" : "text-red-soft");

/* Large hero card — one per list page, sits on top of the grid. */
export function FeatureCard({
  href,
  image,
  eyebrow,
  title,
  text,
  accent = "red",
}: {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  text: string;
  accent?: Accent;
}) {
  return (
    <Reveal>
      <Link
        href={href}
        className="card-lift group relative block overflow-hidden rounded-sm bg-charcoal"
      >
        <div className="relative aspect-[16/10] md:aspect-[21/9]">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1240px"
            className="object-cover opacity-85 transition-transform duration-700 ease-editorial group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-7 md:p-12">
          <p className={`eyebrow text-[11px] ${accentText(accent)}`}>{eyebrow}</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl font-semibold text-cream md:text-6xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-cream/80 md:text-base">{text}</p>
          <span className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${accentText(accent)}`}>
            Read more
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/* Wide card — image left, copy right (spans full row on md+). */
export function WideCard({
  href,
  image,
  eyebrow,
  title,
  text,
  meta,
  accent = "red",
  delay = 0,
}: {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  text: string;
  meta?: string;
  accent?: Accent;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <Link
        href={href}
        className="card-lift group grid overflow-hidden rounded-sm bg-white shadow-[0_8px_30px_-18px_rgba(26,23,20,0.3)] sm:grid-cols-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center p-7 md:p-9">
          <p className={`eyebrow text-[11px] ${accent === "gold" ? "text-gold-deep" : "text-red"}`}>
            {eyebrow}
          </p>
          <h3 className="mt-3 font-serif text-2xl font-semibold text-charcoal md:text-3xl">
            {title}
          </h3>
          {meta && <p className="mt-1 text-xs text-ink/50">{meta}</p>}
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{text}</p>
          <span className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${accent === "gold" ? "text-gold-deep" : "text-red"}`}>
            Read more
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/* Standard card — supports portrait / landscape / square aspect. */
export function StandardCard({
  href,
  image,
  eyebrow,
  title,
  text,
  meta,
  aspect = "landscape",
  accent = "red",
  badge,
  delay = 0,
}: {
  href: string;
  image: string;
  eyebrow?: string;
  title: string;
  text: string;
  meta?: string;
  aspect?: "portrait" | "landscape" | "square";
  accent?: Accent;
  badge?: string;
  delay?: number;
}) {
  const ar =
    aspect === "portrait"
      ? "aspect-[4/5]"
      : aspect === "square"
      ? "aspect-square"
      : "aspect-[4/3]";
  return (
    <Reveal delay={delay}>
      <Link
        href={href}
        className="card-lift group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-[0_8px_30px_-18px_rgba(26,23,20,0.3)]"
      >
        <div className={`relative overflow-hidden ${ar}`}>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
          />
          {badge && (
            <span className="absolute left-4 top-4 bg-red px-3 py-1 text-xs font-semibold tracking-wide text-cream">
              {badge}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          {eyebrow && (
            <p className={`eyebrow text-[10px] ${accent === "gold" ? "text-gold-deep" : "text-red"}`}>
              {eyebrow}
            </p>
          )}
          <h3 className="mt-2 font-serif text-2xl font-semibold leading-snug text-charcoal transition-colors group-hover:text-red">
            {title}
          </h3>
          {meta && <p className="mt-1 text-xs text-ink/50">{meta}</p>}
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{text}</p>
        </div>
      </Link>
    </Reveal>
  );
}

/* ── Article body image treatments ── */

export function FullBleedImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <Reveal>
      <figure className="my-12">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm">
          <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
        </div>
        {caption && <figcaption className="mt-3 text-xs text-ink/50">{caption}</figcaption>}
      </figure>
    </Reveal>
  );
}

export function SplitImages({ a, b, alt }: { a: string; b: string; alt: string }) {
  return (
    <Reveal>
      <div className="my-12 grid gap-4 sm:grid-cols-2">
        {[a, b].map((src, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image src={src} alt={`${alt} (${i + 1})`} fill sizes="(max-width:640px) 100vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export function FloatImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Reveal>
      <figure className="my-4 sm:float-right sm:ml-8 sm:w-[44%]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <Image src={src} alt={alt} fill sizes="(max-width:640px) 100vw, 44vw" className="object-cover" />
        </div>
      </figure>
    </Reveal>
  );
}

export function PullQuote({ children, accent = "red" }: { children: React.ReactNode; accent?: Accent }) {
  return (
    <Reveal>
      <blockquote
        className={`my-12 border-l-4 pl-6 font-serif text-2xl font-medium leading-snug text-charcoal md:text-3xl ${
          accent === "gold" ? "border-gold" : "border-red"
        }`}
      >
        “{children}”
      </blockquote>
    </Reveal>
  );
}

/* Small 2–3 image gallery for horse / trainer / heritage detail pages. */
export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  if (!images.length) return null;
  return (
    <Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((src, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-sm ${
              images.length % 2 === 1 && i === 0 ? "sm:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
            }`}
          >
            <Image src={src} alt={`${alt} (${i + 1})`} fill sizes="(max-width:640px) 100vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>
    </Reveal>
  );
}
