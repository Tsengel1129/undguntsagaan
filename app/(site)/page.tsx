import Link from "next/link";
import Reveal from "@/components/Reveal";
import ContentImage from "@/components/ContentImage";
import { StandardCard, WideCard } from "@/components/editorial";
import { getHomepageData, getSiteTexts } from "@/lib/firebase/queries";

export const revalidate = 60;

/* HOME — modern showcase pulling together previews of every section.
   All content comes from Firestore (lib/firebase/queries.ts): the four
   preview tiles use each section's current first published item, the stats
   row uses live published counts, and "Horse of the issue" / "Latest
   stories" are curated via siteSettings/homepage. */

export default async function HomePage() {
  const [{ site, horseOfIssue, latestStories, previews, counts }, texts] =
    await Promise.all([getHomepageData(), getSiteTexts()]);

  const PREVIEWS = [
    {
      href: "/racehorses",
      eyebrow: "Адуу",
      title: "Адуу",
      text: texts.homeTileRacehorses,
      image: previews.racehorse?.images[0],
    },
    {
      href: "/trainers",
      eyebrow: "Уяач",
      title: "Уяач",
      text: texts.homeTileTrainers,
      image: previews.trainer?.images[0],
    },
    {
      href: "/heritage",
      eyebrow: "Өв соёл",
      title: "Өв соёл",
      text: texts.homeTileHeritage,
      image: previews.treasure?.images[0],
    },
    {
      href: "/magazine",
      eyebrow: "Сэтгүүл",
      title: "Сэтгүүл",
      text: texts.homeTileMagazine,
      image: previews.article?.lead,
    },
  ];

  const stats = [
    { n: String(counts.racehorses), l: texts.homeStatsHorses },
    { n: String(counts.trainers), l: texts.homeStatsTrainers },
    { n: String(counts.articles), l: texts.homeStatsArticles },
  ];

  return (
    <>
      {/* ───────── Hero (single clean headline over a real steppe photo) ───────── */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <ContentImage
            src={texts.homeHeroImage}
            alt={texts.homeHeroTitle}
            fit="cover"
            tone="dark"
            priority
            sizes="100vw"
          />
          {/* Scrim keeps the headline fully legible on any photo */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal/85" />
        </div>

        <div className="mx-auto flex min-h-[88vh] max-w-page flex-col justify-center px-5 py-28 md:px-8">
          <Reveal>
            <p className="eyebrow text-xs text-red-soft md:text-sm">
              {texts.homeHeroEyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-4xl font-serif text-6xl font-semibold leading-[1.02] text-cream md:text-8xl">
              {texts.homeHeroTitle}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85 md:text-xl">
              {site.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/magazine"
                className="group inline-flex items-center gap-2 bg-red px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-red-deep"
              >
                {texts.homeCtaPrimary}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/racehorses"
                className="inline-flex items-center gap-2 border border-cream/40 px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:border-cream hover:bg-cream/10"
              >
                {texts.homeCtaSecondary}
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
              {texts.homeIntroHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex gap-10">
              {stats.map((s) => (
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
          <p className="eyebrow text-xs text-red">{texts.homeExploreEyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal md:text-5xl">
            {texts.homeExploreHeading}
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
                  <ContentImage
                    src={p.image}
                    alt={p.title}
                    tone="dark"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    imgClassName="opacity-80 transition-transform duration-700 ease-editorial group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="eyebrow text-[11px] text-gold-soft">{p.eyebrow}</p>
                  <h3 className="mt-2 font-serif text-3xl font-semibold text-cream">{p.title}</h3>
                  <p className="mt-2 max-w-md text-sm text-cream/75">{p.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-soft">
                    Дэлгэрэнгүй
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── Featured horse (wide card) ───────── */}
      {horseOfIssue && (
        <section className="bg-ivory">
          <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-24">
            <Reveal>
              <p className="eyebrow text-xs text-red">{texts.homeHorseOfIssue}</p>
            </Reveal>
            <div className="mt-8">
              <WideCard
                href={`/racehorses/${horseOfIssue.slug}`}
                image={horseOfIssue.images[0]}
                eyebrow={horseOfIssue.bloodline}
                title={horseOfIssue.name}
                meta={`${horseOfIssue.region} · ${horseOfIssue.wins} түрүү`}
                text={horseOfIssue.summary}
              />
            </div>
          </div>
        </section>
      )}

      {/* ───────── Latest from the magazine ───────── */}
      {latestStories.length > 0 && (
        <section className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-24">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="eyebrow text-xs text-red">{texts.homeLatestEyebrow}</p>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal md:text-5xl">
                  {texts.homeLatestHeading}
                </h2>
              </div>
              <Link
                href="/magazine"
                className="nav-underline hidden text-sm font-semibold text-ink hover:text-red md:inline-block"
              >
                {texts.homeLatestAll}
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {latestStories.map((a, i) => (
              <StandardCard
                key={a.slug}
                href={`/magazine/${a.slug}`}
                image={a.lead}
                eyebrow={a.category}
                title={a.title}
                meta={`${a.date} · ${a.readTime}`}
                text={a.excerpt}
                aspect="landscape"
                delay={i * 0.08}
              />
            ))}
          </div>
        </section>
      )}

      {/* ───────── CTA ───────── */}
      <section className="bg-red">
        <div className="mx-auto flex max-w-page flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <Reveal>
            <h2 className="max-w-2xl font-serif text-3xl font-semibold text-cream md:text-4xl">
              {texts.homeCtaBandHeading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-cream px-7 py-3.5 text-sm font-semibold tracking-wide text-charcoal transition-colors hover:bg-white"
            >
              {texts.homeCtaBandButton}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
