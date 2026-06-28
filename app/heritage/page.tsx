import Image from "next/image";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { TREASURES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Heritage Treasures",
  description:
    "Traditional Mongolian heritage treasures — хэт хутга belt knife sets, carved хөөрөг snuff bottles and heirloom silverwork.",
};

/* Heritage = traditional Mongolian valuables (NOT Western jewelry).
   Placeholder copy and images — see lib/content.ts and README image map. */

export default function HeritagePage() {
  return (
    <>
      {/* Dark, gold-accented luxury header for the heritage section */}
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
            <p className="eyebrow text-xs text-gold-soft">
              Өв соёл · Heritage Treasures
            </p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] md:text-6xl">
              Living treasures of the Mongolian steppe
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
              Beyond the racetrack, Mongolia's heritage lives in objects of
              quiet luxury — хэт хутга belt knife sets, carved хөөрөг snuff
              bottles and heirloom silverwork, each carrying generations of
              craft and meaning.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="bg-ivory">
        <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TREASURES.map((item, i) => (
              <Reveal key={item.name} delay={(i % 3) * 0.07}>
                <article className="card-lift group flex h-full flex-col overflow-hidden rounded-sm border border-gold/20 bg-white">
                  <div className="relative aspect-square overflow-hidden bg-charcoal">
                    <Image
                      src={item.image}
                      alt={`${item.name} (${item.term})`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-serif text-2xl font-semibold text-charcoal">
                      {item.name}{" "}
                      <span className="font-sans text-sm font-normal text-gold-deep">
                        ({item.term})
                      </span>
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
                      {item.description}
                    </p>
                    <p className="mt-5 border-t border-gold/20 pt-4 text-xs tracking-wide text-gold-deep">
                      {item.material}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
