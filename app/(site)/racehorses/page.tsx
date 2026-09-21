import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { FeatureCard, StandardCard, WideCard } from "@/components/editorial";
import { getSiteTexts, listRacehorses } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Адуу",
  description:
    "Монголын хурдан морьд — удам угсаа, нас, уралдааны амжилт.",
};

const ASPECTS = ["portrait", "landscape", "square"] as const;
const PER_PAGE = 6;

export default async function RacehorsesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const [horses, texts] = await Promise.all([listRacehorses(), getSiteTexts()]);
  const totalPages = Math.max(1, Math.ceil(horses.length / PER_PAGE));
  const current = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const pageItems = horses.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const [featured, second, ...rest] = pageItems;
  const beforeWide = rest.slice(0, 3);
  const wide = rest.length > 3 ? rest[3] : undefined;
  const afterWide = rest.slice(4);

  return (
    <>
      <PageHeader
        eyebrow={texts.rhEyebrow}
        title={texts.rhTitle}
        intro={texts.rhIntro}
      />

      <section className="mx-auto max-w-page space-y-8 px-5 py-16 md:px-8 md:py-24">
        {horses.length === 0 && (
          <p className="text-base text-ink/60">Одоогоор мэдээлэл алга</p>
        )}

        {current === 1 ? (
          <>
            {featured && (
              <FeatureCard
                href={`/racehorses/${featured.slug}`}
                image={featured.images[0]}
                eyebrow={`${featured.bloodline} · ${featured.region}`}
                title={featured.name}
                text={featured.summary}
              />
            )}

            {second && (
              <WideCard
                href={`/racehorses/${second.slug}`}
                image={second.images[0]}
                eyebrow={second.bloodline}
                title={second.name}
                meta={`${second.region} · ${second.wins} түрүү`}
                text={second.summary}
              />
            )}

            {beforeWide.length > 0 && (
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
                    badge={`${h.wins} түрүү`}
                    aspect={ASPECTS[i % ASPECTS.length]}
                    delay={(i % 3) * 0.07}
                  />
                ))}
              </div>
            )}

            {wide && (
              <WideCard
                href={`/racehorses/${wide.slug}`}
                image={wide.images[0]}
                eyebrow={wide.bloodline}
                title={wide.name}
                meta={`${wide.region} · ${wide.wins} түрүү`}
                text={wide.summary}
              />
            )}

            {afterWide.length > 0 && (
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
                    badge={`${h.wins} түрүү`}
                    aspect={ASPECTS[(i + 1) % ASPECTS.length]}
                    delay={(i % 3) * 0.07}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((h, i) => (
              <StandardCard
                key={h.slug}
                href={`/racehorses/${h.slug}`}
                image={h.images[0]}
                eyebrow={h.bloodline}
                title={h.name}
                meta={`${h.region} · ${h.age}`}
                text={h.summary}
                badge={`${h.wins} түрүү`}
                aspect={ASPECTS[i % ASPECTS.length]}
                delay={(i % 3) * 0.07}
              />
            ))}
          </div>
        )}

        <Pagination current={current} total={totalPages} basePath="/racehorses" />
      </section>
    </>
  );
}
