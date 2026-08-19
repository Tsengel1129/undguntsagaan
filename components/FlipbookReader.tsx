"use client";

/* Dependency-free magazine flipbook. One page at a time with a 3D page-turn
   (framer-motion — already a dependency; avoids react-pageflip's React 19 risk).
   Keyboard ← → , a page counter, a jump slider, and prev/next controls sized
   large for low-bandwidth / touch (rural-friendly). Only the visible page(s)
   load — next/image lazy-loads the rest. */

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function FlipbookReader({
  pages,
  title,
}: {
  pages: string[];
  title?: string;
}) {
  const total = pages.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1); // 1 = forward, -1 = back

  const go = useCallback(
    (target: number, d: number) => {
      if (target < 0 || target >= total) return;
      setDir(d);
      setIndex(target);
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1, 1);
      else if (e.key === "ArrowLeft") go(index - 1, -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  if (total === 0) return null;

  const atStart = index === 0;
  const atEnd = index === total - 1;

  return (
    <div className="mx-auto flex max-w-page flex-col items-center px-5 md:px-8">
      {/* Stage */}
      <div
        className="relative flex w-full items-center justify-center"
        style={{ perspective: "2200px" }}
      >
        <div className="relative aspect-[3/4] h-[62vh] max-h-[780px]">
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={index}
              custom={dir}
              initial={{ rotateY: dir > 0 ? 72 : -72, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: dir > 0 ? -72 : 72, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transformOrigin: dir > 0 ? "left center" : "right center",
                transformStyle: "preserve-3d",
              }}
              className="absolute inset-0 overflow-hidden rounded-sm bg-white shadow-[0_24px_60px_-20px_rgba(26,23,20,0.5)]"
            >
              <Image
                src={pages[index]}
                alt={`${title ?? "Хуудас"} — ${index + 1}`}
                fill
                sizes="(max-width: 768px) 88vw, 560px"
                className="object-contain"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-7 flex w-full max-w-md items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(index - 1, -1)}
          disabled={atStart}
          aria-label="Өмнөх хуудас"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-red hover:text-red disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>
        </button>

        <span className="min-w-[84px] text-center text-sm font-medium tabular-nums text-ink/70">
          {index + 1} / {total}
        </span>

        <button
          type="button"
          onClick={() => go(index + 1, 1)}
          disabled={atEnd}
          aria-label="Дараагийн хуудас"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-red hover:text-red disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Jump slider (only useful past a couple of pages) */}
      {total > 2 && (
        <input
          type="range"
          min={0}
          max={total - 1}
          value={index}
          onChange={(e) => {
            const t = Number(e.target.value);
            go(t, t >= index ? 1 : -1);
          }}
          aria-label="Хуудас сонгох"
          className="mt-5 w-full max-w-md accent-red"
        />
      )}
    </div>
  );
}
