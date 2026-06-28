import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { ARTICLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Magazine",
  description:
    "Articles from Undgun Tsagaan — stories on bloodlines, trainers, collectors and Mongolian horse heritage.",
};

/* Placeholder articles and cover images — see lib/content.ts and README. */

export default function MagazinePage() {
  return (
    <>
      <PageHeader
        eyebrow="Сэтгүүл · Magazine"
        title="Stories from the steppe"
        intro="Long-form articles on racing bloodlines, master trainers, heritage craft and the people who keep these traditions alive."
      />

      <section className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 0.07}>
              <article className="card-lift group flex h-full flex-col">
                <Link href="/magazine" className="block">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-sm">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col pt-5">
                  <p className="text-xs tracking-wide text-ink/50">{a.date}</p>
                  <h2 className="mt-2 font-serif text-2xl font-medium leading-snug text-charcoal transition-colors group-hover:text-red">
                    <Link href="/magazine">{a.title}</Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
                    {a.excerpt}
                  </p>
                  <Link
                    href="/magazine"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red"
                  >
                    Read article
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
