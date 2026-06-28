import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { Gallery } from "@/components/editorial";
import { TREASURES, getTreasure } from "@/lib/content";

export function generateStaticParams() {
  return TREASURES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getTreasure(slug);
  if (!item) return { title: "Treasure not found" };
  return { title: `${item.name} (${item.term})`, description: item.summary };
}

export default async function HeritageDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getTreasure(slug);
  if (!item) notFound();

  const facts = [
    { k: "Mongolian term", v: item.term },
    { k: "Category", v: item.category },
    { k: "Materials", v: item.material },
  ];

  return (
    <article>
      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={item.images[0]}
            alt={`${item.name} (${item.term})`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/45" />
        </div>
        <div className="mx-auto flex min-h-[58vh] max-w-page flex-col justify-end px-5 pb-12 pt-32 md:px-8 md:pb-16">
          <Reveal>
            <Link href="/heritage" className="text-sm font-semibold text-gold-soft">
              ← Heritage Treasures
            </Link>
            <p className="eyebrow mt-4 text-xs text-gold-soft">{item.category}</p>
            <h1 className="mt-3 font-serif text-5xl font-semibold text-cream md:text-7xl">
              {item.name}{" "}
              <span className="font-sans text-lg font-normal text-gold-soft md:text-2xl">
                ({item.term})
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-base text-cream/80">{item.summary}</p>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <Reveal>
            <div className="space-y-6 text-base leading-relaxed text-ink/80 md:text-lg">
              {item.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="h-fit rounded-sm border border-gold/30 bg-white p-7">
              <h2 className="eyebrow text-xs text-gold-deep">Details</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {facts.map((f) => (
                  <div key={f.k} className="flex justify-between gap-4 border-b border-gold/15 pb-3">
                    <dt className="text-ink/50">{f.k}</dt>
                    <dd className="text-right font-medium text-charcoal">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>
        </div>

        <div className="mt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal">Gallery</h2>
          <Gallery images={item.images.slice(1)} alt={item.name} />
        </div>
      </div>
    </article>
  );
}
