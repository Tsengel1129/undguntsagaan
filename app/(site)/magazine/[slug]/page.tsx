import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ContentImage from "@/components/ContentImage";
import RichText from "@/components/RichText";
import {
  FloatImage,
  Gallery,
  PullQuote,
  SplitImages,
  StandardCard,
} from "@/components/editorial";
import {
  getArticle,
  listArticles,
  relatedArticles,
} from "@/lib/firebase/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await listArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Нийтлэл олдсонгүй" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = await relatedArticles(slug, 3);
  const [img0, img1, img2] = article.inlineImages ?? [];
  /* The Tiptap body's top-level blocks take the place of the old body[]
     paragraphs; pullQuote and inlineImages keep their exact woven positions:
     block 0 (drop cap) → float img0 → blocks 1–2 → pull quote → block 3 →
     split img1+img2 → blocks 4+. Any FURTHER inline images (an admin can
     attach as many as they like) close the article as a gallery grid. */
  const blocks = article.body?.content ?? [];
  const extraImages = (article.inlineImages ?? []).slice(3);

  return (
    <article>
      {/* ── Title block ── */}
      <header className="border-b border-charcoal/10 bg-ivory">
        <div className="mx-auto max-w-3xl px-5 pb-12 pt-16 text-center md:pb-14 md:pt-24">
          <Reveal>
            <p className="eyebrow text-xs text-red">{article.category}</p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.08] text-charcoal md:text-6xl">
              {article.title}
            </h1>
            <p className="mt-5 text-sm text-ink/55">
              {article.date} · {article.author} · {article.readTime}
            </p>
          </Reveal>
        </div>
      </header>

      {/* ── Full-bleed lead image ── */}
      <Reveal>
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <ContentImage
            src={article.lead}
            alt={article.title}
            priority
            sizes="100vw"
          />
        </div>
      </Reveal>

      {/* ── Body with woven, varied image treatments ── */}
      <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <div className="text-lg leading-relaxed text-ink/85">
          {/* Lead paragraph with drop cap */}
          <RichText
            nodes={blocks.slice(0, 1)}
            pClassName="mb-6 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-red"
          />

          {/* Portrait image floated beside text */}
          {img0 && <FloatImage src={img0} alt={article.title} />}
          <RichText nodes={blocks.slice(1, 3)} />
          <div className="clear-both" />

          {/* Centered pull-quote between images */}
          {article.pullQuote && <PullQuote>{article.pullQuote}</PullQuote>}

          <RichText nodes={blocks.slice(3, 4)} />

          {/* Two images side by side */}
          {img1 && img2 && <SplitImages a={img1} b={img2} alt={article.title} />}

          <RichText nodes={blocks.slice(4)} />

          {/* Images 4+ — editorial gallery closing the article */}
          {extraImages.length > 0 && (
            <div className="my-12">
              <Gallery images={extraImages} alt={article.title} />
            </div>
          )}
        </div>

        <div className="mt-12 border-t border-charcoal/10 pt-6">
          <Link href="/magazine" className="text-sm font-semibold text-red">
            ← Бүх нийтлэл рүү буцах
          </Link>
        </div>
      </div>

      {/* ── Related articles ── */}
      {related.length > 0 && (
        <section className="bg-ivory">
          <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20">
            <Reveal>
              <h2 className="font-serif text-2xl font-semibold text-charcoal md:text-3xl">
                Холбоотой нийтлэлүүд
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {related.map((a, i) => (
                <StandardCard
                  key={a.slug}
                  href={`/magazine/${a.slug}`}
                  image={a.lead}
                  eyebrow={a.category}
                  title={a.title}
                  meta={`${a.date} · ${a.readTime}`}
                  text={a.excerpt}
                  delay={i * 0.07}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
