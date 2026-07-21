"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageRows from "@/components/admin/ImageRows";
import { saveSiteTexts } from "@/app/admin/(panel)/actions";
import { TEXT_GROUPS } from "@/lib/siteTexts";
import { toast } from "@/lib/admin/toast";

/* Every fixed text on the public site (headers, buttons, section headings)
   plus the hero/about images — editable without touching code. */
export default function TextsForm({
  initial,
}: {
  initial: Record<string, string>;
}) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [busy, setBusy] = useState(false);

  const set = (key: string, v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  const input =
    "w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 text-sm text-charcoal focus:border-red focus:outline-none";

  const onSave = async () => {
    setBusy(true);
    const res = await saveSiteTexts(values);
    setBusy(false);
    if (!res.ok) return toast(`Алдаа гарлаа: ${res.error}`, true);
    toast("Хадгалагдлаа");
    router.refresh();
  };

  return (
    <div className="space-y-6 pb-24">
      {TEXT_GROUPS.map((group) => (
        <section
          key={group.title}
          className="space-y-5 rounded-sm border border-charcoal/10 bg-white p-6"
        >
          <h2 className="font-serif text-xl font-semibold text-charcoal">
            {group.title}
          </h2>
          {group.fields.map((f) =>
            f.image ? (
              <ImageRows
                key={f.key}
                label={f.label}
                values={values[f.key] ? [values[f.key]] : []}
                onChange={(next) => set(f.key, next[0] ?? "")}
                single
                collection="site"
                slug="texts"
              />
            ) : (
              <div key={f.key}>
                <label
                  htmlFor={`text-${f.key}`}
                  className="mb-1.5 block text-sm font-medium text-charcoal"
                >
                  {f.label}
                </label>
                {f.multiline ? (
                  <textarea
                    id={`text-${f.key}`}
                    value={values[f.key] ?? ""}
                    rows={3}
                    onChange={(e) => set(f.key, e.target.value)}
                    className={input}
                  />
                ) : (
                  <input
                    id={`text-${f.key}`}
                    type="text"
                    value={values[f.key] ?? ""}
                    onChange={(e) => set(f.key, e.target.value)}
                    className={input}
                  />
                )}
              </div>
            )
          )}
        </section>
      ))}

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-64 right-0 z-20 border-t border-charcoal/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-8 py-4">
          <button
            type="button"
            onClick={onSave}
            disabled={busy}
            className="bg-red px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-red-deep disabled:opacity-50"
          >
            {busy ? "Түр хүлээнэ үү…" : "Хадгалах"}
          </button>
          <p className="text-xs text-ink/40">
            Хадгалсны дараа сайтад шууд шинэчлэгдэнэ.
          </p>
        </div>
      </div>
    </div>
  );
}
