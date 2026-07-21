"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteItem } from "@/app/admin/(panel)/actions";
import { toast } from "@/lib/admin/toast";
import type { CollectionKey } from "@/lib/admin/schema";

/* Per-row actions on admin list pages: Засах (edit) and Устгах (delete with
   confirmation) — no need to click the title to manage an item. */
export default function RowActions({
  collection,
  slug,
}: {
  collection: CollectionKey;
  slug: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onDelete = () => {
    if (!window.confirm("Устгахдаа итгэлтэй байна уу?")) return;
    startTransition(async () => {
      const res = await deleteItem(collection, slug);
      if (!res.ok) {
        toast(`Алдаа гарлаа: ${res.error}`, true);
        return;
      }
      toast("Устгагдлаа");
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/${collection}/${slug}`}
        className="rounded-sm bg-red px-3 py-1.5 text-xs font-semibold text-cream transition-colors hover:bg-red-deep"
      >
        Засах
      </Link>
      <button
        type="button"
        disabled={pending}
        onClick={onDelete}
        className="rounded-sm border border-charcoal/15 px-3 py-1.5 text-xs font-semibold text-ink/70 transition-colors hover:border-red hover:text-red disabled:opacity-50"
      >
        {pending ? "…" : "Устгах"}
      </button>
    </div>
  );
}
