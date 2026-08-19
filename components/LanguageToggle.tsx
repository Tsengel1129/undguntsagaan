"use client";

import { useLang } from "@/lib/i18n/LanguageProvider";

/* Compact MN | EN switch. The active language is the filled pill. */
export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();

  const pill = (active: boolean) =>
    `px-2 py-0.5 text-xs font-semibold tracking-wide rounded-full transition-colors ${
      active ? "bg-red text-cream" : "text-ink/60 hover:text-red"
    }`;

  return (
    <div
      role="group"
      aria-label={t("lang.switchAria")}
      className={`inline-flex items-center gap-0.5 rounded-full border border-charcoal/12 bg-cream/70 p-0.5 ${className}`}
    >
      <button
        type="button"
        onClick={() => setLang("mn")}
        aria-pressed={lang === "mn"}
        className={pill(lang === "mn")}
      >
        МОН
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={pill(lang === "en")}
      >
        EN
      </button>
    </div>
  );
}
