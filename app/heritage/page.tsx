import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { FeatureCard, StandardCard, WideCard } from "@/components/editorial";
import { TREASURES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Heritage Treasures",
  description:
    "Traditional Mongolian heritage treasures — belt knife sets (хэт хутга), snuff bottles (хөөрөг) and heirloom silverwork.",
};

/* Heritage = traditional Mongolian valuables (NOT Western jewelry).
   Images are the closest relevant antique/craft/silver imagery on Unsplash —
   see TODO notes in lib/content.ts for swapping in real Mongolian product photos. */

const ASPECTS = ["square", "portrait", "landscape"] as const;

export default function HeritagePage() {
  const [featured, ...rest] = TREASURES;
  const firstThree = rest.slice(0, 3);
  const wide = rest[3];
  const remaining = rest.slice(4);

  return (
    <>
      {/* Dark, gold-accented luxury header */}
      <header className="relative overflow-hidden bg-charcoal text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #B08D3A 0, transparent 45%), radial-gradient(circle at 80% 60%, #C8102E 0, transparent 40%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-page px-5 pb-16 pt-20 md:px-8 md:pb-24 md:pt-28">
          <Reveal>
            <p className="eyebrow text-xs text-gold-soft">Heritage Treasures</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] md:text-6xl">
              Living treasures of the Mongolian steppe
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
              Beyond the racetrack, Mongolia's heritage lives in objects of quiet
              luxury — belt knife sets (хэт хутга), carved snuff bottles (хөөрөг)
              and heirloom silverwork, each carrying generations of craft and
              meaning.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="bg-ivory">
        <div className="mx-auto max-w-page space-y-8 px-5 py-16 md:px-8 md:py-24">
          <FeatureCard
            href={`/heritage/${featured.slug}`}
            image={featured.images[0]}
            eyebrow={`${featured.category} · ${featured.term}`}
            title={featured.name}
            text={featured.summary}
            accent="gold"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {firstThree.map((t, i) => (
              <StandardCard
                key={t.slug}
                href={`/heritage/${t.slug}`}
                image={t.images[0]}
                eyebrow={`${t.term} · ${t.category}`}
                title={t.name}
                meta={t.material}
                text={t.summary}
                aspect={ASPECTS[i % ASPECTS.length]}
                accent="gold"
                delay={(i % 3) * 0.07}
              />
            ))}
          </div>

          <WideCard
            href={`/heritage/${wide.slug}`}
            image={wide.images[0]}
            eyebrow={`${wide.term} · ${wide.category}`}
            title={wide.name}
            meta={wide.material}
            text={wide.summary}
            accent="gold"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {remaining.map((t, i) => (
              <StandardCard
                key={t.slug}
                href={`/heritage/${t.slug}`}
                image={t.images[0]}
                eyebrow={`${t.term} · ${t.category}`}
                title={t.name}
                meta={t.material}
                text={t.summary}
                aspect={ASPECTS[(i + 2) % ASPECTS.length]}
                accent="gold"
                delay={(i % 3) * 0.07}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
