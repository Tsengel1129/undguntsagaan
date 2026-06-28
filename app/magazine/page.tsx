import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { FeatureCard, StandardCard, WideCard } from "@/components/editorial";
import { ARTICLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Magazine",
  description:
    "Articles from Undgun Tsagaan — stories on bloodlines, trainers, collectors and Mongolian horse heritage.",
};

export default function MagazinePage() {
  const [lead, second, ...rest] = ARTICLES;

  return (
    <>
      <PageHeader
        eyebrow="Magazine"
        title="Stories from the steppe"
        intro="Long-form articles on racing bloodlines, master trainers, heritage craft and the people who keep these traditions alive."
      />

      <section className="mx-auto max-w-page space-y-8 px-5 py-16 md:px-8 md:py-24">
        <FeatureCard
          href={`/magazine/${lead.slug}`}
          image={lead.lead}
          eyebrow={`${lead.category} · ${lead.date}`}
          title={lead.title}
          text={lead.excerpt}
        />

        <WideCard
          href={`/magazine/${second.slug}`}
          image={second.lead}
          eyebrow={second.category}
          title={second.title}
          meta={`${second.date} · ${second.readTime}`}
          text={second.excerpt}
        />

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <StandardCard
              key={a.slug}
              href={`/magazine/${a.slug}`}
              image={a.lead}
              eyebrow={a.category}
              title={a.title}
              meta={`${a.date} · ${a.readTime}`}
              text={a.excerpt}
              aspect={i === 0 ? "landscape" : "landscape"}
              delay={(i % 3) * 0.07}
            />
          ))}
        </div>
      </section>
    </>
  );
}
