import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { StandardCard } from "@/components/editorial";
import { SECTION_GROUPS, groupBySlug } from "@/lib/sections";
import { listSectionArticles } from "@/lib/firebase/queries";

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return SECTION_GROUPS.map((g) => ({ group: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string }>;
}): Promise<Metadata> {
  const { group } = await params;
  const g = groupBySlug(group);
  return g
    ? { title: g.mn, description: g.descMn }
    : { title: "Булан" };
}

export default async function GroupHubPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group } = await params;
  const g = groupBySlug(group);
  if (!g) notFound();

  const sections = await Promise.all(
    g.sections.map(async (s) => ({
      ...s,
      articles: await listSectionArticles(s.value),
    }))
  );

  return (
    <>
      <PageHeader eyebrow="Булан" title={g.mn} intro={g.descMn} />
      <section className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s, i) => (
            <StandardCard
              key={s.slug}
              href={`/${g.slug}/${s.slug}`}
              image={s.articles[0]?.lead}
              eyebrow={`${s.articles.length} нийтлэл`}
              title={s.mn}
              text={s.descMn}
              aspect="landscape"
              delay={(i % 3) * 0.07}
            />
          ))}
        </div>
      </section>
    </>
  );
}
