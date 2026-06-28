import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { FeatureCard, StandardCard, WideCard } from "@/components/editorial";
import { TRAINERS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Trainers",
  description:
    "Master Mongolian horse trainers — their provinces, experience and approach.",
};

const ASPECTS = ["portrait", "landscape", "portrait"] as const;

export default function TrainersPage() {
  const [featured, ...rest] = TRAINERS;
  const firstThree = rest.slice(0, 3);
  const wide = rest[3];
  const remaining = rest.slice(4);

  return (
    <>
      <PageHeader
        eyebrow="Trainers"
        title="The masters behind the champions"
        intro="The trainers (уяачид) whose patience, instinct and decades of experience shape the racing horses of Mongolia."
      />

      <section className="mx-auto max-w-page space-y-8 px-5 py-16 md:px-8 md:py-24">
        <FeatureCard
          href={`/trainers/${featured.slug}`}
          image={featured.images[0]}
          eyebrow={`${featured.location} · ${featured.years}`}
          title={featured.name}
          text={featured.summary}
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {firstThree.map((t, i) => (
            <StandardCard
              key={t.slug}
              href={`/trainers/${t.slug}`}
              image={t.images[0]}
              eyebrow={t.location}
              title={t.name}
              meta={`${t.years} · ${t.specialty}`}
              text={t.summary}
              aspect={ASPECTS[i % ASPECTS.length]}
              delay={(i % 3) * 0.07}
            />
          ))}
        </div>

        <WideCard
          href={`/trainers/${wide.slug}`}
          image={wide.images[0]}
          eyebrow={wide.location}
          title={wide.name}
          meta={`${wide.years} · ${wide.specialty}`}
          text={wide.summary}
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {remaining.map((t, i) => (
            <StandardCard
              key={t.slug}
              href={`/trainers/${t.slug}`}
              image={t.images[0]}
              eyebrow={t.location}
              title={t.name}
              meta={`${t.years} · ${t.specialty}`}
              text={t.summary}
              aspect={ASPECTS[(i + 1) % ASPECTS.length]}
              delay={(i % 3) * 0.07}
            />
          ))}
        </div>
      </section>
    </>
  );
}
