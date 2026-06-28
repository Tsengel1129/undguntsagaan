import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { StandardCard, WideCard } from "@/components/editorial";
import {
  ARTICLES,
  RACEHORSES,
  SITE,
  STEPPE,
  TRAINERS,
  TREASURES,
} from "@/lib/content";

/* HOME — modern showcase pulling together previews of every section.
   Body copy is placeholder; images are real Unsplash photos (lib/content.ts). */

const PREVIEWS = [
  {
    href: "/racehorses",
    eyebrow: "Racehorses",
    title: "Racehorses",
    text: "Fast-bloodline horses and the udam that produced this season's champions.",
    image: RACEHORSES[0].images[0],
  },
  {
    href: "/trainers",
    eyebrow: "Trainers",
    title: "Trainers",
    text: "The master trainers whose patient daily craft turns colts into champions.",
    image: TRAINERS[0].images[0],
  },
  {
    href: "/heritage",
    eyebrow: "Heritage Treasures",
    title: "Heritage Treasures",
    text: "Belt knife sets, carved snuff bottles and the silverwork of the steppe.",
    image: TREASURES[6].images[0],
  },
  {
    href: "/magazine",
    eyebrow: "Magazine",
    title: "Magazine",
    text: "Long-form stories on bloodlines, trainers, collectors and craft.",
    image: ARTICLES[0].lead,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ───────── Hero (single clean headline over a real steppe photo) ───────── */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={STEPPE.hero}
            alt="Horses on the open Mongolian steppe at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Scrim keeps the headline fully legible on any photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal/85" />
        </div>

        <div className="mx-auto flex min-h-[88vh] max-w-page flex-col justify-center px-5 py-28 md:px-8">
          <Reveal>
            <p className="eyebrow text-xs text-red-soft md:text-sm">
              Өндгөн цагаан · Mongolian Horse Heritage
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl font-serif text-6xl font-semibold leading-[1.02] text-cream md:text-8xl">
              Undgun Tsagaan
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85 md:text-xl">
              {SITE.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/magazine"
                className="group inline-flex items-center gap-2 bg-red px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-red-deep"
              >
                Read the Magazine
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/racehorses"
                className="inline-flex items-center gap-2 border border-cream/40 px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:border-cream hover:bg-cream/10"
              >
                Meet the Horses
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Intro strip ───────── */}
      <section className="border-b border-charcoal/10 bg-ivory">
        <div className="mx-auto grid max-w-page gap-8 px-5 py-16 md:grid-cols-[1fr_auto] md:items-end md:px-8">
          <Reveal>
            <h2 className="max-w-3xl font-serif text-3xl font-medium leading-tight text-charcoal md:text-5xl">
              A magazine devoted to the horse, the trainer and the heritage of the Mongolian steppe.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex gap-10">
              {[
                { n: "9", l: "Featured horses" },
                { n: "9", l: "Master trainers" },
                { n: "6", l: "Magazine features" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-serif text-4xl font-semibold text-red">{s.n}</p>
                  <p className="mt-1 text-xs text-ink/60">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Section previews (varied grid) ───────── */}
      <section className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="eyebrow text-xs text-red">Explore</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal md:text-5xl">
            Four ways into the world of Undgun Tsagaan
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PREVIEWS.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.06}>
              <Link
                href={p.href}
                className="card-lift group relative block overflow-hidden rounded-sm bg-charcoal"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-80 transition-transform duration-700 ease-editorial group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="eyebrow text-[11px] text-gold-soft">{p.eyebrow}</p>
                  <h3 className="mt-2 font-serif text-3xl font-semibold text-cream">{p.title}</h3>
                  <p className="mt-2 max-w-md text-sm text-cream/75">{p.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-soft">
                    Read more
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── Featured horse (wide card) ───────── */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-24">
          <Reveal>
            <p className="eyebrow text-xs text-red">Horse of the issue</p>
          </Reveal>
          <div className="mt-8">
            <WideCard
              href={`/racehorses/${RACEHORSES[0].slug}`}
              image={RACEHORSES[0].images[0]}
              eyebrow={RACEHORSES[0].bloodline}
              title={RACEHORSES[0].name}
              meta={`${RACEHORSES[0].region} · ${RACEHORSES[0].wins} wins`}
              text={RACEHORSES[0].summary}
            />
          </div>
        </div>
      </section>

      {/* ───────── Latest from the magazine ───────── */}
      <section className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-24">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow text-xs text-red">From the magazine</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal md:text-5xl">
                Latest stories
              </h2>
            </div>
            <Link
              href="/magazine"
              className="nav-underline hidden text-sm font-semibold text-ink hover:text-red md:inline-block"
            >
              All articles →
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {ARTICLES.slice(0, 3).map((a, i) => (
            <StandardCard
              key={a.slug}
              href={`/magazine/${a.slug}`}
              image={a.lead}
              eyebrow={a.category}
              title={a.title}
              meta={`${a.date} · ${a.readTime}`}
              text={a.excerpt}
              aspect={i === 0 ? "landscape" : "landscape"}
              delay={i * 0.08}
            />
          ))}
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="bg-red">
        <div className="mx-auto flex max-w-page flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <Reveal>
            <h2 className="max-w-2xl font-serif text-3xl font-semibold text-cream md:text-4xl">
              Have a horse, a trainer or a treasure worth featuring?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-cream px-7 py-3.5 text-sm font-semibold tracking-wide text-charcoal transition-colors hover:bg-white"
            >
              Get in touch →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
