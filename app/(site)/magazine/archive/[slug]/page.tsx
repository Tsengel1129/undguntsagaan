import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArchiveReader from "@/components/ArchiveReader";
import { getIssue, listIssues } from "@/lib/firebase/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const issues = await listIssues();
  return issues.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getIssue(slug);
  if (!issue) return { title: "Дугаар олдсонгүй" };
  return { title: issue.title, description: issue.summary };
}

export default async function ArchiveIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const issue = await getIssue(slug);
  if (!issue) notFound();

  return (
    <ArchiveReader
      issue={{
        slug: issue.slug,
        title: issue.title,
        summary: issue.summary,
        cover: issue.images?.[0],
        price: issue.price ?? 0,
        pdfUrl: issue.pdfUrl ?? "",
        free: !issue.price || issue.price <= 0,
      }}
    />
  );
}
