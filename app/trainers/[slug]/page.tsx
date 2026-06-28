import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { Gallery } from "@/components/editorial";
import { TRAINERS, getTrainer } from "@/lib/content";

export function generateStaticParams() {
  return TRAINERS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trainer = getTrainer(slug);
  if (!trainer) return { title: "Trainer not found" };
  return { title: trainer.name, description: trainer.summary };
}

export default async function TrainerDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trainer = getTrainer(slug);
  if (!trainer) notFound();

  const facts = [
    { k: "Province", v: trainer.location },
    { k: "Experience", v: trainer.years },
    { k: "Speciality", v: trainer.specialty },
  ];

  return (
    <article>
      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={trainer.images[0]}
            alt={trainer.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/40" />
        </div>
        <div className="mx-auto flex min-h-[60vh] max-w-page flex-col justify-end px-5 pb-12 pt-32 md:px-8 md:pb-16">
          <Reveal>
            <Link href="/trainers" className="text-sm font-semibold text-red-soft">
              ← Trainers
            </Link>
            <p className="eyebrow mt-4 text-xs text-gold-soft">
              {trainer.location} · {trainer.years}
            </p>
            <h1 className="mt-3 font-serif text-5xl font-semibold text-cream md:text-7xl">
              {trainer.name}
            </h1>
            <p className="mt-3 max-w-xl text-base text-cream/80">{trainer.summary}</p>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <Reveal>
            <div className="space-y-6 text-base leading-relaxed text-ink/80 md:text-lg">
              {trainer.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="h-fit rounded-sm border border-charcoal/10 bg-white p-7">
              <h2 className="eyebrow text-xs text-red">At a glance</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {facts.map((f) => (
                  <div key={f.k} className="flex justify-between gap-4 border-b border-charcoal/5 pb-3">
                    <dt className="text-ink/50">{f.k}</dt>
                    <dd className="text-right font-medium text-charcoal">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>
        </div>

        <div className="mt-16">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal">In the stable</h2>
          <Gallery images={trainer.images.slice(1)} alt={trainer.name} />
        </div>
      </div>
    </article>
  );
}
