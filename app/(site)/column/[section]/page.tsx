import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { StandardCard } from "@/components/editorial";
import { COLUMN_SECTIONS, columnBySlug } from "@/lib/columns";
import { listColumnArticles } from "@/lib/firebase/queries";

export const revalidate = 60;

const PER_PAGE = 6;

export function generateStaticParams() {
  return COLUMN_SECTIONS.map((c) => ({ section: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const c = columnBySlug(section);
  return { title: c ? c.mn : "Чөлөөт булан" };
}

export default async function ColumnSectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { section } = await params;
  const c = columnBySlug(section);
  if (!c) notFound();

  const { page } = await searchParams;
  const articles = await listColumnArticles(c.value);
  const totalPages = Math.max(1, Math.ceil(articles.length / PER_PAGE));
  const current = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const pageItems = articles.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  return (
    <>
      <PageHeader eyebrow="Чөлөөт булан" title={c.mn} intro={c.blurbMn} />

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
          basePath={`/column/${c.slug}`}
        />
      </section>
    </>
  );
}
