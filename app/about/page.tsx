import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Undgun Tsagaan — Mongolia's magazine of racing bloodlines, master trainers and heritage treasures.",
};

/* Placeholder about copy. */

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Mongolia's magazine of horse and heritage"
        intro="Undgun Tsagaan (Өндгөн цагаан) celebrates the racing horse, the master trainer and the living heritage of the Mongolian steppe."
      />

      <section className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="space-y-6 text-base leading-relaxed text-ink/80 md:text-lg">
              <p>
                For generations, the horse has stood at the centre of Mongolian
                life — a source of pride, livelihood and identity. Undgun
                Tsagaan exists to document that world with the care it deserves:
                the bloodlines that produce champions, the trainers who shape
                them, and the heritage objects that surround the culture of the
                horse.
              </p>
              <p>
                In each issue we profile racing horses and the udam behind their
                speed, sit down with the уяач who train them, and look closely
                at the craft of хэт хутга knife sets, carved хөөрөг snuff bottles
                and heirloom silverwork. Our aim is to record these traditions
                honestly and to share them with readers in Mongolia and far
                beyond.
              </p>
              <p>
                We believe heritage is not something kept behind glass. It is
                ridden across the steppe, carried on the belt and passed between
                generations. Undgun Tsagaan is our contribution to keeping that
                living tradition visible.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="space-y-8 rounded-sm border border-charcoal/10 bg-white p-8">
              <div>
                <h2 className="eyebrow text-xs text-red">Our mission</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">
                  To celebrate and preserve the heritage of the Mongolian horse —
                  its bloodlines, its trainers and its treasures — for a global
                  audience.
                </p>
              </div>
              <div>
                <h2 className="eyebrow text-xs text-red">What we cover</h2>
                <ul className="mt-3 space-y-2 text-sm text-ink/75">
                  <li>· Racing bloodlines &amp; horses (морьд)</li>
                  <li>· Master horse trainers (уяачид)</li>
                  <li>· Heritage treasures (хэт хутга, хөөрөг)</li>
                  <li>· Long-form magazine features</li>
                </ul>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-red px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-red-deep"
              >
                Work with us →
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
