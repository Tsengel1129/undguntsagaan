"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveGeneralSettings } from "@/app/admin/(panel)/actions";
import type { SiteGeneralSettings } from "@/lib/firebase/types";

const FIELDS: { key: keyof SiteGeneralSettings; label: string }[] = [
  { key: "name", label: "Нэр (латин)" },
  { key: "nameMn", label: "Нэр (монгол)" },
  { key: "tagline", label: "Уриа" },
  { key: "email", label: "И-мэйл" },
  { key: "phone", label: "Утас" },
  { key: "address", label: "Хаяг" },
];

export default function SettingsForm({
  initial,
}: {
  initial: SiteGeneralSettings;
}) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<{ msg: string; error?: boolean } | null>(null);

  const show = (msg: string, error = false) => {
    setToast({ msg, error });
    window.setTimeout(() => setToast(null), error ? 6000 : 2500);
  };

  const onSave = async () => {
    setBusy(true);
    const res = await saveGeneralSettings(values);
    setBusy(false);
    if (!res.ok) return show(`Алдаа гарлаа: ${res.error}`, true);
    show("Хадгалагдлаа");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <section className="space-y-5 rounded-sm border border-charcoal/10 bg-white p-6">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">
              {f.label}
            </label>
            {f.key === "tagline" || f.key === "address" ? (
              <textarea
                value={values[f.key]}
                rows={2}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [f.key]: e.target.value }))
                }
                className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 text-sm focus:border-red focus:outline-none"
              />
            ) : (
              <input
                type="text"
                value={values[f.key]}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [f.key]: e.target.value }))
                }
                className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 text-sm focus:border-red focus:outline-none"
              />
            )}
          </div>
        ))}
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
