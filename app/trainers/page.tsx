import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { TRAINERS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Trainers",
  description:
    "Master Mongolian horse trainers (уяачид) — their provinces, experience and approach.",
};

/* Placeholder trainers and images — see lib/content.ts and README image map. */

export default function TrainersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Уяачид · Trainers"
        title="The masters behind the champions"
        intro="The уяач — horse trainers — whose patience, instinct and decades of experience shape the racing horses of Mongolia."
      />

      <section className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TRAINERS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.07}>
              <article className="card-lift group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-[0_8px_30px_-18px_rgba(26,23,20,0.3)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-5">
                    <h2 className="font-serif text-2xl font-semibold text-cream">
                      {t.name}
                    </h2>
                    <p className="text-sm text-gold-soft">{t.location}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow text-[10px] text-red">
                    {t.years} of experience
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
                    {t.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
