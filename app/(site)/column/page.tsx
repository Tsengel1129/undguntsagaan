import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { StandardCard } from "@/components/editorial";
import { COLUMN_SECTIONS } from "@/lib/columns";
import { listColumnArticles } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Чөлөөт булан",
  description:
    "Нээлттэй яриа, Олон өнцөг, Залуусын дуу хоолой — Ухаантай Морь сэтгүүлийн чөлөөт булан.",
};

export default async function ColumnHubPage() {
  const sections = await Promise.all(
    COLUMN_SECTIONS.map(async (c) => ({
      ...c,
      articles: await listColumnArticles(c.value),
    }))
  );

  return (
    <>
      <PageHeader
        eyebrow="Сэтгүүл"
        title="Чөлөөт булан"
        intro="Нээлттэй яриа, олон өнцөг, залуусын дуу хоолой — уншигчдын бодол, ярилцлага, өгүүллүүд."
      />
      <section className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {sections.map((c, i) => (
            <StandardCard
              key={c.slug}
              href={`/column/${c.slug}`}
              image={c.articles[0]?.lead}
              eyebrow={`${c.articles.length} нийтлэл`}
              title={c.mn}
              text={c.blurbMn}
              aspect="landscape"
              delay={i * 0.07}
            />
          ))}
        </div>
      </section>
    </>
  );
}
