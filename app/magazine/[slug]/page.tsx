import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import {
  FloatImage,
  PullQuote,
  SplitImages,
  StandardCard,
} from "@/components/editorial";
import { ARTICLES, getArticle, relatedArticles } from "@/lib/content";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = relatedArticles(slug, 3);
  const [img0, img1, img2] = article.inlineImages;
  const p = article.body;

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
          <Image
            src={article.lead}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      {/* ── Body with woven, varied image treatments ── */}
      <div className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <div className="text-lg leading-relaxed text-ink/85">
          {/* Lead paragraph */}
          <p className="mb-6 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-red">
            {p[0]}
          </p>

          {/* Portrait image floated beside text */}
          {img0 && <FloatImage src={img0} alt={article.title} />}
          {p[1] && <p className="mb-6">{p[1]}</p>}
          {p[2] && <p className="mb-6">{p[2]}</p>}
          <div className="clear-both" />

          {/* Centered pull-quote between images */}
          <PullQuote>{article.pullQuote}</PullQuote>

          {p[3] && <p className="mb-6">{p[3]}</p>}

          {/* Two images side by side */}
          {img1 && img2 && <SplitImages a={img1} b={img2} alt={article.title} />}

          {p[4] && <p className="mb-6">{p[4]}</p>}
        </div>

        <div className="mt-12 border-t border-charcoal/10 pt-6">
          <Link href="/magazine" className="text-sm font-semibold text-red">
            ← Back to all articles
          </Link>
        </div>
      </div>

      {/* ── Related articles ── */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20">
          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-charcoal md:text-3xl">
              Related articles
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
    </article>
  );
}
