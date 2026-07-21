"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setPin } from "@/app/admin/(panel)/actions";
import type { CollectionKey } from "@/lib/admin/schema";

/* 📌 toggle + pinnedOrder input ("Тогтоох"). */
export default function PinControl({
  collection,
  slug,
  pinned,
  pinnedOrder,
}: {
  collection: CollectionKey;
  slug: string;
  pinned: boolean;
  pinnedOrder: number;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [order, setOrder] = useState(pinnedOrder || 1);

  const apply = (nextPinned: boolean, nextOrder: number) => {
    startTransition(async () => {
      await setPin(collection, slug, nextPinned, nextOrder);
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        title="Тогтоох"
        aria-label="Тогтоох"
        disabled={pending}
        onClick={() => apply(!pinned, order)}
        className={`rounded-sm border px-2 py-1 text-sm transition-colors ${
          pinned
            ? "border-red bg-red text-cream"
            : "border-charcoal/15 bg-white text-ink/40 hover:border-red hover:text-red"
        } disabled:opacity-50`}
      >
        📌
      </button>
      {pinned && (
        <input
          type="number"
          min={1}
          value={order}
          disabled={pending}
          onChange={(e) => setOrder(Number(e.target.value) || 1)}
          onBlur={() => apply(true, order)}
          className="w-14 rounded-sm border border-charcoal/15 bg-white px-2 py-1 text-sm"
        />
      )}
    </div>
  );
}
