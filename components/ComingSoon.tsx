"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n/LanguageProvider";

/* Placeholder for sections that are in the roadmap but not yet built
   (Shop, paid Archive). Bilingual via the section's mn/en title. */
export default function ComingSoon({
  titleMn,
  titleEn,
}: {
  titleMn: string;
  titleEn: string;
}) {
  const { pick, t } = useLang();

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-page flex-col items-center justify-center px-5 py-24 text-center md:px-8">
      <p className="eyebrow text-xs text-red">{t("soon.eyebrow")}</p>
      <h1 className="mt-4 font-serif text-4xl font-semibold text-charcoal md:text-6xl">
        {pick(titleMn, titleEn)}
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
        {t("soon.body")}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 border-b border-red/40 pb-0.5 text-sm font-medium text-red transition-colors hover:border-red"
      >
        ← {t("soon.back")}
      </Link>
    </section>
  );
}
