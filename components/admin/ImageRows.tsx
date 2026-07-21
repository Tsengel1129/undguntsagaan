"use client";

import { useRef, useState } from "react";
import ContentImage from "@/components/ContentImage";
import { uploadContentImage } from "@/lib/admin/upload";

/* Repeatable image rows: URL input + Storage upload + preview + remove.
   The preview uses ContentImage in the same fixed-aspect box as the public
   cards, so the admin sees exactly how the image will render. */

function UploadButton({
  collection,
  slug,
  onDone,
}: {
  collection: string;
  slug: string;
  onDone: (url: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  return (
    <>
      <button
        type="button"
        disabled={busy}
        onClick={() => input.current?.click()}
        className="shrink-0 rounded-sm border border-charcoal/15 bg-white px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-red hover:text-red disabled:opacity-50"
      >
        {busy ? "Илгээж байна…" : "Зураг ⬆"}
      </button>
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (!f) return;
          setBusy(true);
          try {
            onDone(await uploadContentImage(collection, slug, f));
          } catch (err) {
            window.alert(
              `Алдаа гарлаа: ${err instanceof Error ? err.message : "upload"}`
            );
          } finally {
            setBusy(false);
          }
        }}
      />
    </>
  );
}

export default function ImageRows({
  label,
  values,
  onChange,
  single = false,
  heroBadge = false,
  collection,
  slug,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  /** Exactly one image (article lead). */
  single?: boolean;
  /** Tag the first row as the cover image. */
  heroBadge?: boolean;
  collection: string;
  slug: string;
}) {
  const rows = single && values.length === 0 ? [""] : values;

  const setAt = (i: number, v: string) => {
    const next = [...rows];
    next[i] = v;
    onChange(next);
  };
  const removeAt = (i: number) => onChange(rows.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-charcoal">{label}</p>
      <div className="space-y-3">
        {rows.map((url, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="relative block h-24 w-32 shrink-0 overflow-hidden rounded-sm border border-charcoal/10">
              <ContentImage src={url} alt={`${label} ${i + 1}`} sizes="128px" />
              {heroBadge && i === 0 && (
                <span className="absolute left-1 top-1 rounded-sm bg-red px-1.5 py-0.5 text-[10px] font-semibold text-cream">
                  Нүүр
                </span>
              )}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <input
                type="url"
                value={url}
                placeholder="https://…"
                onChange={(e) => setAt(i, e.target.value)}
                className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2 text-sm"
              />
              <div className="flex items-center gap-2">
                <UploadButton
                  collection={collection}
                  slug={slug}
                  onDone={(u) => setAt(i, u)}
                />
                {!single && rows.length > 1 && (
                  <>
                    <button type="button" title="Дээш" onClick={() => move(i, -1)} className="rounded-sm border border-charcoal/15 px-2 py-1.5 text-xs hover:border-red hover:text-red">↑</button>
                    <button type="button" title="Доош" onClick={() => move(i, 1)} className="rounded-sm border border-charcoal/15 px-2 py-1.5 text-xs hover:border-red hover:text-red">↓</button>
                  </>
                )}
                {(!single || rows.length > 0) && (
                  <button
                    type="button"
                    onClick={() => removeAt(i)}
                    className="rounded-sm border border-charcoal/15 px-2 py-1.5 text-xs text-ink/60 hover:border-red hover:text-red"
                  >
                    ✕ Устгах
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {(!single || rows.length === 0) && (
          <button
            type="button"
            onClick={() => onChange([...rows, ""])}
            className="rounded-sm border border-dashed border-charcoal/25 px-4 py-2 text-sm text-ink/60 transition-colors hover:border-red hover:text-red"
          >
            + Зураг нэмэх
          </button>
        )}
      </div>
    </div>
  );
}
