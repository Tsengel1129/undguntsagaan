import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ComingSoon from "@/components/ComingSoon";
import FlipbookReader from "@/components/FlipbookReader";
import { getCurrentIssue } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Шинэ дугаар",
  description:
    "Ухаантай Морь сэтгүүлийн шинэ дугаарыг цахимаар, хуудас эргүүлж уншина уу.",
};

export default async function CurrentIssuePage() {
  const issue = await getCurrentIssue();

  if (!issue || issue.images.length === 0) {
    return <ComingSoon titleMn="Шинэ дугаар" titleEn="Current issue" />;
  }

  return (
    <>
      <PageHeader
        eyebrow={issue.issueNumber || "Шинэ дугаар"}
        title={issue.title}
        intro={issue.summary}
      />
      <section className="bg-ivory py-12 md:py-16">
        <FlipbookReader pages={issue.images} title={issue.title} />
      </section>
    </>
  );
}
