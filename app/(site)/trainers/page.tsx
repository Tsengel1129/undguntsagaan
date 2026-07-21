import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { FeatureCard, StandardCard, WideCard } from "@/components/editorial";
import { getSiteTexts, listTrainers } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Trainers",
  description:
    "Master Mongolian horse trainers — their provinces, experience and approach.",
};

const ASPECTS = ["portrait", "landscape", "portrait"] as const;
const PER_PAGE = 6;

export default async function TrainersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const [trainers, texts] = await Promise.all([listTrainers(), getSiteTexts()]);
  const totalPages = Math.max(1, Math.ceil(trainers.length / PER_PAGE));
  const current = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const pageItems = trainers.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const [featured, ...rest] = pageItems;
  const firstThree = rest.slice(0, 3);
  const wide = rest.length > 3 ? rest[3] : undefined;
  const remaining = rest.slice(4);

  return (
    <>
      <PageHeader
        eyebrow={texts.trEyebrow}
        title={texts.trTitle}
        intro={texts.trIntro}
      />

      <section className="mx-auto max-w-page space-y-8 px-5 py-16 md:px-8 md:py-24">
        {trainers.length === 0 && (
          <p className="text-base text-ink/60">Одоогоор мэдээлэл алга</p>
        )}

        {current === 1 ? (
          <>
            {featured && (
              <FeatureCard
                href={`/trainers/${featured.slug}`}
                image={featured.images[0]}
                eyebrow={`${featured.location} · ${featured.years}`}
                title={featured.name}
                text={featured.summary}
              />
            )}

            {firstThree.length > 0 && (
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
            )}

            {wide && (
              <WideCard
                href={`/trainers/${wide.slug}`}
                image={wide.images[0]}
                eyebrow={wide.location}
                title={wide.name}
                meta={`${wide.years} · ${wide.specialty}`}
                text={wide.summary}
              />
            )}

            {remaining.length > 0 && (
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
            )}
          </>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((t, i) => (
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
        )}

        <Pagination current={current} total={totalPages} basePath="/trainers" />
      </section>
    </>
  );
}
