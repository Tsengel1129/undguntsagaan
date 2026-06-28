import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { Gallery } from "@/components/editorial";
import { RACEHORSES, getRacehorse } from "@/lib/content";

export function generateStaticParams() {
  return RACEHORSES.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const horse = getRacehorse(slug);
  if (!horse) return { title: "Racehorse not found" };
  return { title: horse.name, description: horse.summary };
}

export default async function RacehorseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const horse = getRacehorse(slug);
  if (!horse) notFound();

  const facts = [
    { k: "Bloodline (udam)", v: horse.bloodline },
    { k: "Age", v: horse.age },
    { k: "Colour", v: horse.color },
    { k: "Region", v: horse.region },
    { k: "Career wins", v: String(horse.wins) },
    { k: "Best result", v: horse.achievement },
  ];

  return (
    <article>
      {/* Hero */}
      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={horse.images[0]}
            alt={horse.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/40" />
        </div>
        <div className="mx-auto flex min-h-[60vh] max-w-page flex-col justify-end px-5 pb-12 pt-32 md:px-8 md:pb-16">
          <Reveal>
            <Link href="/racehorses" className="text-sm font-semibold text-red-soft">
              ← Racehorses
            </Link>
            <p className="eyebrow mt-4 text-xs text-gold-soft">{horse.bloodline}</p>
            <h1 className="mt-3 font-serif text-5xl font-semibold text-cream md:text-7xl">
              {horse.name}
            </h1>
            <p className="mt-3 max-w-xl text-base text-cream/80">{horse.summary}</p>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* Body */}
          <Reveal>
            <div className="space-y-6 text-base leading-relaxed text-ink/80 md:text-lg">
              {horse.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          {/* Key facts */}
          <Reveal delay={0.1}>
            <aside className="h-fit rounded-sm border border-charcoal/10 bg-white p-7">
              <h2 className="eyebrow text-xs text-red">Key facts</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {facts.map((f) => (
                  <div key={f.k} className="flex justify-between gap-4 border-b border-charcoal/5 pb-3">
                    <dt className="text-ink/50">{f.k}</dt>
                    <dd className="text-right font-medium text-charcoal">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>
        </div>

        {/* Gallery */}
        <div className="mt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal">Gallery</h2>
          <Gallery images={horse.images.slice(1)} alt={horse.name} />
        </div>
      </div>
    </article>
  );
}
