import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { RACEHORSES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Racehorses",
  description:
    "Fast-bloodline Mongolian racehorses (морьд) — bloodlines, ages and racing achievements.",
};

/* Placeholder horses and images — see lib/content.ts and README image map. */

export default function RacehorsesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Морьд · Racehorses"
        title="The fastest bloodlines on the steppe"
        intro="A selection of racing horses celebrated for their udam (bloodline), their speed and their record across Naadam and provincial races."
      />

      <section className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {RACEHORSES.map((horse, i) => (
            <Reveal key={horse.name} delay={(i % 3) * 0.07}>
              <article className="card-lift group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-[0_8px_30px_-18px_rgba(26,23,20,0.3)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={horse.image}
                    alt={horse.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 bg-red px-3 py-1 text-xs font-semibold tracking-wide text-cream">
                    {horse.wins} wins
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-serif text-2xl font-semibold text-charcoal">
                    {horse.name}
                  </h2>
                  <dl className="mt-3 space-y-1.5 text-sm">
                    <div className="flex gap-2">
                      <dt className="eyebrow text-[10px] text-ink/40">Udam</dt>
                      <dd className="text-ink/80">{horse.bloodline}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="eyebrow text-[10px] text-ink/40">Age</dt>
                      <dd className="text-ink/80">{horse.age}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/70">
                    {horse.achievement}
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
