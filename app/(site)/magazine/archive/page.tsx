import type { Metadata } from "next";
import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import PageHeader from "@/components/PageHeader";
import { listIssues } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Архив",
  description:
    "Ухаантай Морь сэтгүүлийн өнгөрсөн дугаарууд — PDF-ээр унших, татах.",
};

export default async function MagazineArchivePage() {
  const issues = await listIssues();

  return (
    <>
      <PageHeader
        eyebrow="Сэтгүүл"
        title="Архив"
        intro="Өнгөрсөн дугаарууд. Худалдаж авснаар PDF-ээр унших, татах эрх нээгдэнэ."
      />

      <section className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        {issues.length === 0 ? (
          <p className="text-base text-ink/60">Одоогоор архивт дугаар алга</p>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {issues.map((issue) => {
              const free = !issue.price || issue.price <= 0;
              return (
                <Link
                  key={issue.slug}
                  href={`/magazine/archive/${issue.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-charcoal/10 bg-cream shadow-sm">
                    <ContentImage
                      src={issue.images?.[0]}
                      alt={issue.title}
                      fit="cover"
                      sizes="(max-width: 640px) 50vw, 300px"
                    />
                    <span
                      className={`absolute right-2 top-2 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        free
                          ? "bg-charcoal/70 text-cream"
                          : "bg-red text-cream"
                      }`}
                    >
                      {free ? "Үнэгүй" : `${Number(issue.price).toLocaleString()}₮`}
                    </span>
                  </div>
                  <h2 className="mt-3 font-serif text-lg font-semibold text-charcoal transition-colors group-hover:text-red">
                    {issue.title}
                  </h2>
                  <p className="text-sm text-ink/55">
                    {[issue.issueNumber, issue.year || issue.date]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
