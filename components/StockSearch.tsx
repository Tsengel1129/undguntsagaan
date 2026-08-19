"use client";

/* emonos-style availability search. The full published stock list is passed
   from the server (small dataset) and filtered client-side — keeps the page
   static/cacheable and works offline-ish once loaded. Large tap target + a
   clear button for low-bandwidth / rural users. */

import { useMemo, useState } from "react";
import type { Stock } from "@/lib/firebase/queries";

export default function StockSearch({ stock }: { stock: Stock[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return stock.filter((r) => (r.product ?? "").toLowerCase().includes(q));
  }, [q, stock]);

  return (
    <div className="rounded-lg border border-charcoal/10 bg-cream p-5 md:p-7">
      <label
        htmlFor="stock-search"
        className="block text-sm font-semibold text-charcoal"
      >
        Эм, бүтээгдэхүүний үлдэгдэл шалгах
      </label>
      <p className="mt-1 text-sm text-ink/60">
        Нэрээр нь хайхад аль эмийн санд хэдэн ширхэг байгааг харуулна.
      </p>

      <div className="mt-4 flex items-center gap-2">
        <input
          id="stock-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Жишээ: пенициллин"
          autoComplete="off"
          className="w-full rounded-sm border border-charcoal/15 bg-white px-4 py-3 text-base text-charcoal focus:border-red focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Цэвэрлэх"
            className="shrink-0 rounded-sm border border-charcoal/15 px-3 py-3 text-sm text-ink/60 hover:border-red hover:text-red"
          >
            ✕
          </button>
        )}
      </div>

      {q && (
        <div className="mt-5">
          {results.length === 0 ? (
            <p className="text-sm text-ink/60">
              «{query}» нэртэй бүтээгдэхүүн одоогоор бүртгэлд алга.
            </p>
          ) : (
            <>
              <p className="mb-3 text-xs uppercase tracking-wide text-ink/45">
                {results.length} илэрц
              </p>
              <ul className="divide-y divide-charcoal/8 overflow-hidden rounded-sm border border-charcoal/10 bg-white">
                {results.map((r) => (
                  <li
                    key={r.slug}
                    className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-charcoal">
                        {r.product}
                      </p>
                      <p className="text-sm text-ink/60">
                        {r.pharmacy}
                        {(r.aimag || r.sum) && (
                          <span className="text-ink/45">
                            {" · "}
                            {[r.aimag, r.sum].filter(Boolean).join(", ")}
                          </span>
                        )}
                        {r.phone && (
                          <>
                            {" · "}
                            <a
                              href={`tel:${r.phone}`}
                              className="text-red hover:underline"
                            >
                              {r.phone}
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-red/10 px-3 py-1 text-sm font-semibold tabular-nums text-red">
                      {r.quantity ?? 0} {r.unit || "ш"}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
