import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContentImage from "@/components/ContentImage";
import { getSiteTexts } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Бидний тухай",
  description:
    "«Ухаантай Морь» сэтгүүлийн тухай — хурдан морины удам угсаа, нэрт уяач, өв эрдэнэсийн Монголын сэтгүүл.",
};

export default async function AboutPage() {
  const texts = await getSiteTexts();
  return (
    <>
      <PageHeader
        eyebrow={texts.abEyebrow}
        title={texts.abTitle}
        intro={texts.abIntro}
      />

      <Reveal>
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <ContentImage
            src={texts.abImage}
            alt={texts.abTitle}
            fit="cover"
            priority
            sizes="100vw"
          />
        </div>
      </Reveal>

      <section className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="space-y-6 text-base leading-relaxed text-ink/80 md:text-lg">
              {[texts.abBody1, texts.abBody2, texts.abBody3]
                .filter(Boolean)
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="space-y-8 rounded-sm border border-charcoal/10 bg-white p-8">
              <div>
                <h2 className="eyebrow text-xs text-red">Эрхэм зорилго</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  {texts.abMissionText}
                </p>
              </div>
              <div>
                <h2 className="eyebrow text-xs text-red">Бидний сэдвүүд</h2>
                <ul className="mt-3 space-y-2 text-sm text-ink/75">
                  <li>· Хурдан морьд, удам угсаа</li>
                  <li>· Нэрт уяачид</li>
                  <li>· Өв эрдэнэс (хэт хутга, хөөрөг)</li>
                  <li>· Сэтгүүлийн дэлгэрэнгүй нийтлэлүүд</li>
                </ul>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-red px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-red-deep"
              >
                Хамтран ажиллах →
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
