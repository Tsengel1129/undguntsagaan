import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { FeatureCard, StandardCard, WideCard } from "@/components/editorial";
import { RACEHORSES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Racehorses",
  description:
    "Fast-bloodline Mongolian racehorses — bloodlines, ages and racing achievements.",
};

const ASPECTS = ["portrait", "landscape", "square"] as const;

export default function RacehorsesPage() {
  const [featured, second, ...rest] = RACEHORSES;
  // rest has 7 horses; insert a wide card mid-way for editorial rhythm.
  const beforeWide = rest.slice(0, 3);
  const wide = rest[3];
  const afterWide = rest.slice(4);

  return (
    <>
      <PageHeader
        eyebrow="Racehorses"
        title="The fastest bloodlines on the steppe"
        intro="A selection of racing horses celebrated for their bloodline (udam), their speed and their record across Naadam and provincial races."
      />

      <section className="mx-auto max-w-page space-y-8 px-5 py-16 md:px-8 md:py-24">
        <FeatureCard
          href={`/racehorses/${featured.slug}`}
          image={featured.images[0]}
          eyebrow={`${featured.bloodline} · ${featured.region}`}
          title={featured.name}
          text={featured.summary}
        />

        <WideCard
          href={`/racehorses/${second.slug}`}
          image={second.images[0]}
          eyebrow={second.bloodline}
          title={second.name}
          meta={`${second.region} · ${second.wins} wins`}
          text={second.summary}
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {beforeWide.map((h, i) => (
            <StandardCard
              key={h.slug}
              href={`/racehorses/${h.slug}`}
              image={h.images[0]}
              eyebrow={h.bloodline}
              title={h.name}
              meta={`${h.region} · ${h.age}`}
              text={h.summary}
              badge={`${h.wins} wins`}
              aspect={ASPECTS[i % ASPECTS.length]}
              delay={(i % 3) * 0.07}
            />
          ))}
        </div>

        <WideCard
          href={`/racehorses/${wide.slug}`}
          image={wide.images[0]}
          eyebrow={wide.bloodline}
          title={wide.name}
          meta={`${wide.region} · ${wide.wins} wins`}
          text={wide.summary}
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {afterWide.map((h, i) => (
            <StandardCard
              key={h.slug}
              href={`/racehorses/${h.slug}`}
              image={h.images[0]}
              eyebrow={h.bloodline}
              title={h.name}
              meta={`${h.region} · ${h.age}`}
              text={h.summary}
              badge={`${h.wins} wins`}
              aspect={ASPECTS[(i + 1) % ASPECTS.length]}
              delay={(i % 3) * 0.07}
            />
          ))}
        </div>
      </section>
    </>
  );
}
