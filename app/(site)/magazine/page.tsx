import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { FeatureCard, StandardCard, WideCard } from "@/components/editorial";
import { getSiteTexts, listMagazineArticles } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Magazine",
  description:
    "Articles from Uhaantai Mori— stories on bloodlines, trainers, collectors and Mongolian horse heritage.",
};

const PER_PAGE = 6;

export default async function MagazinePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const [articles, texts] = await Promise.all([
    listMagazineArticles(),
    getSiteTexts(),
  ]);
  const totalPages = Math.max(1, Math.ceil(articles.length / PER_PAGE));
  const current = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const pageItems = articles.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const [lead, second, ...rest] = pageItems;

  return (
    <>
      <PageHeader
        eyebrow={texts.mgEyebrow}
        title={texts.mgTitle}
        intro={texts.mgIntro}
      />

      <section className="mx-auto max-w-page space-y-8 px-5 py-16 md:px-8 md:py-24">
        {articles.length === 0 && (
          <p className="text-base text-ink/60">Одоогоор мэдээлэл алга</p>
        )}

        {current === 1 ? (
          <>
            {lead && (
              <FeatureCard
                href={`/magazine/${lead.slug}`}
                image={lead.lead}
                eyebrow={`${lead.category} · ${lead.date}`}
                title={lead.title}
                text={lead.excerpt}
              />
            )}

            {second && (
              <WideCard
                href={`/magazine/${second.slug}`}
                image={second.lead}
                eyebrow={second.category}
                title={second.title}
                meta={`${second.date} · ${second.readTime}`}
                text={second.excerpt}
              />
            )}

            {rest.length > 0 && (
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
                    aspect="landscape"
                    delay={(i % 3) * 0.07}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((a, i) => (
              <StandardCard
                key={a.slug}
                href={`/magazine/${a.slug}`}
                image={a.lead}
                eyebrow={a.category}
                title={a.title}
                meta={`${a.date} · ${a.readTime}`}
                text={a.excerpt}
                aspect="landscape"
                delay={(i % 3) * 0.07}
              />
            ))}
          </div>
        )}

        <Pagination current={current} total={totalPages} basePath="/magazine" />
      </section>
    </>
  );
}
