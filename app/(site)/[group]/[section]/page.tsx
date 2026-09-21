import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { StandardCard } from "@/components/editorial";
import { SECTION_GROUPS, sectionBySlug } from "@/lib/sections";
import { listSectionArticles } from "@/lib/firebase/queries";

export const revalidate = 60;
export const dynamicParams = false;

const PER_PAGE = 6;

export function generateStaticParams() {
  return SECTION_GROUPS.flatMap((g) =>
    g.sections.map((s) => ({ group: g.slug, section: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string; section: string }>;
}): Promise<Metadata> {
  const { group, section } = await params;
  const found = sectionBySlug(group, section);
  return found
    ? { title: found.section.mn, description: found.section.descMn }
    : { title: "Булан" };
}

export default async function SectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ group: string; section: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { group, section } = await params;
  const found = sectionBySlug(group, section);
  if (!found) notFound();
  const { section: sec, group: grp } = found;

  const { page } = await searchParams;
  const articles = await listSectionArticles(sec.value);
  const totalPages = Math.max(1, Math.ceil(articles.length / PER_PAGE));
  const current = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const pageItems = articles.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <>
      <PageHeader eyebrow={grp.mn} title={sec.mn} intro={sec.descMn} />

      <section className="mx-auto max-w-page space-y-12 px-5 py-16 md:px-8 md:py-24">
        {articles.length === 0 ? (
          <p className="text-base text-ink/60">Одоогоор нийтлэл алга</p>
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

        <Pagination
          current={current}
          total={totalPages}
          basePath={`/${grp.slug}/${sec.slug}`}
        />
      </section>
    </>
  );
}
