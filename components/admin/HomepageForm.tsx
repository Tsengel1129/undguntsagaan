"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveHomepageSettings } from "@/app/admin/(panel)/actions";
import type { HomepageSettings } from "@/lib/firebase/types";

type Option = { slug: string; label: string };

export default function HomepageForm({
  initial,
  horses,
  articles,
}: {
  initial: HomepageSettings;
  horses: Option[];
  articles: Option[];
}) {
  const router = useRouter();
  const [horse, setHorse] = useState(initial.horseOfIssueSlug);
  const [mode, setMode] = useState<"auto" | "manual">(initial.latestStoriesMode);
  const [slots, setSlots] = useState<string[]>([
    initial.latestStoriesSlugs[0] ?? "",
    initial.latestStoriesSlugs[1] ?? "",
    initial.latestStoriesSlugs[2] ?? "",
  ]);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{ msg: string; error?: boolean } | null>(null);

  const show = (msg: string, error = false) => {
    setToast({ msg, error });
    window.setTimeout(() => setToast(null), error ? 6000 : 2500);
  };

  const onSave = async () => {
    setBusy(true);
    const res = await saveHomepageSettings({
      horseOfIssueSlug: horse,
      latestStoriesMode: mode,
      latestStoriesSlugs: slots.filter(Boolean),
    });
    setBusy(false);
    if (!res.ok) return show(`Алдаа гарлаа: ${res.error}`, true);
    show("Хадгалагдлаа");
    router.refresh();
  };

  const select =
    "w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 text-sm text-charcoal focus:border-red focus:outline-none";

  return (
    <div className="space-y-6">
      <section className="rounded-sm border border-charcoal/10 bg-white p-6">
        <h2 className="mb-4 font-serif text-xl font-semibold text-charcoal">
          Дугаарын морь (Horse of the issue)
        </h2>
        <select value={horse} onChange={(e) => setHorse(e.target.value)} className={select}>
          {horses.map((h) => (
            <option key={h.slug} value={h.slug}>
              {h.label}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-ink/40">
          Зөвхөн нийтлэгдсэн морьд сонгогдоно.
        </p>
      </section>

      <section className="rounded-sm border border-charcoal/10 bg-white p-6">
        <h2 className="mb-4 font-serif text-xl font-semibold text-charcoal">
          Сүүлийн нийтлэлүүд (Latest stories)
        </h2>
        <div className="space-y-2">
          <label className="flex items-center gap-3 text-sm text-charcoal">
            <input
              type="radio"
              name="latestMode"
              checked={mode === "auto"}
              onChange={() => setMode("auto")}
              className="accent-[#C8102E]"
            />
            Сүүлийн 3 (автомат)
          </label>
          <label className="flex items-center gap-3 text-sm text-charcoal">
            <input
              type="radio"
              name="latestMode"
              checked={mode === "manual"}
              onChange={() => setMode("manual")}
              className="accent-[#C8102E]"
            />
            Гараар сонгох
          </label>
        </div>
        {mode === "manual" && (
          <div className="mt-4 space-y-3">
            {slots.map((slot, i) => (
              <select
                key={i}
                value={slot}
                onChange={(e) =>
                  setSlots((prev) => prev.map((s, j) => (j === i ? e.target.value : s)))
                }
                className={select}
              >
                <option value="">— {i + 1}-р байрлал —</option>
                {articles.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
      </section>

      <button
        type="button"
        onClick={onSave}
        disabled={busy}
        className="bg-red px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-red-deep disabled:opacity-50"
      >
        Хадгалах
      </button>

      {toast && (
        <div
          className={`fixed right-6 top-6 z-50 rounded-sm px-5 py-3 text-sm font-semibold shadow-lg ${
            toast.error ? "bg-red text-cream" : "bg-charcoal text-cream"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
