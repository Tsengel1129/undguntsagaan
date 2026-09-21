import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Pagination from "@/components/Pagination";
import { FeatureCard, StandardCard, WideCard } from "@/components/editorial";
import { getSiteTexts, listTreasures } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Өв соёл",
  description:
    "Монголын уламжлалт өв эрдэнэс — хэт хутга, хөөрөг болон үеэс үед уламжлагдсан мөнгөн урлал.",
};

/* Heritage = traditional Mongolian valuables (NOT Western jewelry). */

const ASPECTS = ["square", "portrait", "landscape"] as const;
const PER_PAGE = 6;

export default async function HeritagePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const [treasures, texts] = await Promise.all([listTreasures(), getSiteTexts()]);
  const totalPages = Math.max(1, Math.ceil(treasures.length / PER_PAGE));
  const current = Math.min(Math.max(1, Number(page) || 1), totalPages);
  const pageItems = treasures.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const [featured, ...rest] = pageItems;
  const firstThree = rest.slice(0, 3);
  const wide = rest.length > 3 ? rest[3] : undefined;
  const remaining = rest.slice(4);

  return (
    <>
      {/* Dark, gold-accented luxury header */}
      <header className="relative overflow-hidden bg-charcoal text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #B08D3A 0, transparent 45%), radial-gradient(circle at 80% 60%, #C8102E 0, transparent 40%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-page px-5 pb-16 pt-20 md:px-8 md:pb-24 md:pt-28">
          <Reveal>
            <p className="eyebrow text-xs text-gold-soft">{texts.hgEyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] md:text-6xl">
              {texts.hgTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
              {texts.hgIntro}
            </p>
          </Reveal>
        </div>
      </header>

      <section className="bg-ivory">
        <div className="mx-auto max-w-page space-y-8 px-5 py-16 md:px-8 md:py-24">
          {treasures.length === 0 && (
            <p className="text-base text-ink/60">Одоогоор мэдээлэл алга</p>
          )}

          {current === 1 ? (
            <>
              {featured && (
                <FeatureCard
                  href={`/heritage/${featured.slug}`}
                  image={featured.images[0]}
                  eyebrow={`${featured.category} · ${featured.term}`}
                  title={featured.name}
                  text={featured.summary}
                  accent="gold"
                />
              )}

              {firstThree.length > 0 && (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {firstThree.map((t, i) => (
                    <StandardCard
                      key={t.slug}
                      href={`/heritage/${t.slug}`}
                      image={t.images[0]}
                      eyebrow={`${t.term} · ${t.category}`}
                      title={t.name}
                      meta={t.material}
                      text={t.summary}
                      aspect={ASPECTS[i % ASPECTS.length]}
                      accent="gold"
                      delay={(i % 3) * 0.07}
                    />
                  ))}
                </div>
              )}

              {wide && (
                <WideCard
                  href={`/heritage/${wide.slug}`}
                  image={wide.images[0]}
                  eyebrow={`${wide.term} · ${wide.category}`}
                  title={wide.name}
                  meta={wide.material}
                  text={wide.summary}
                  accent="gold"
                />
              )}

              {remaining.length > 0 && (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {remaining.map((t, i) => (
                    <StandardCard
                      key={t.slug}
                      href={`/heritage/${t.slug}`}
                      image={t.images[0]}
                      eyebrow={`${t.term} · ${t.category}`}
                      title={t.name}
                      meta={t.material}
                      text={t.summary}
                      aspect={ASPECTS[(i + 2) % ASPECTS.length]}
                      accent="gold"
                      delay={(i % 3) * 0.07}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((t, i) => (
                <StandardCard
                  key={t.slug}
                  href={`/heritage/${t.slug}`}
                  image={t.images[0]}
                  eyebrow={`${t.term} · ${t.category}`}
                  title={t.name}
                  meta={t.material}
                  text={t.summary}
                  aspect={ASPECTS[i % ASPECTS.length]}
                  accent="gold"
                  delay={(i % 3) * 0.07}
                />
              ))}
            </div>
          )}

          <Pagination current={current} total={totalPages} basePath="/heritage" />
        </div>
      </section>
    </>
  );
}
