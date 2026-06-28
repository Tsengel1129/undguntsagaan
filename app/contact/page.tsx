import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Undgun Tsagaan — email, phone and address, plus a message form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        intro="Have a horse, a trainer or a heritage treasure to share — or a question about the magazine? We would love to hear from you."
      />

      <section className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-8">
              <div>
                <h2 className="eyebrow text-xs text-red">Email</h2>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 block font-serif text-2xl text-charcoal transition-colors hover:text-red"
                >
                  {SITE.email}
                </a>
              </div>
              <div>
                <h2 className="eyebrow text-xs text-red">Phone</h2>
                <a
                  href={`tel:${SITE.phone}`}
                  className="mt-2 block font-serif text-2xl text-charcoal transition-colors hover:text-red"
                >
                  {SITE.phone}
                </a>
              </div>
              <div>
                <h2 className="eyebrow text-xs text-red">Address</h2>
                <p className="mt-2 max-w-xs text-base leading-relaxed text-ink/75">
                  {SITE.address}
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
