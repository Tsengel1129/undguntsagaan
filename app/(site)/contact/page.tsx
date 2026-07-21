import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings, getSiteTexts } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Undgun Tsagaan — email, phone and address, plus a message form.",
};

export default async function ContactPage() {
  const [site, texts] = await Promise.all([getSiteSettings(), getSiteTexts()]);
  return (
    <>
      <PageHeader
        eyebrow={texts.ctEyebrow}
        title={texts.ctTitle}
        intro={texts.ctIntro}
      />

      <section className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <h2 className="eyebrow text-xs text-red">Email</h2>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 block font-serif text-2xl text-charcoal transition-colors hover:text-red"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <h2 className="eyebrow text-xs text-red">Phone</h2>
                <a
                  href={`tel:${site.phone}`}
                  className="mt-2 block font-serif text-2xl text-charcoal transition-colors hover:text-red"
                >
                  {site.phone}
                </a>
              </div>
              <div>
                <h2 className="eyebrow text-xs text-red">Address</h2>
                <p className="mt-2 max-w-xs text-base leading-relaxed text-ink/75">
                  {site.address}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-sm border border-charcoal/10 bg-ivory p-7 md:p-9">
              <h2 className="font-serif text-2xl font-semibold text-charcoal">
                Send us a message
              </h2>
              <p className="mt-1 mb-6 text-sm text-ink/60">
                We usually reply within a few working days.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
