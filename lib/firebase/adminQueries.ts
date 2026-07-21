/* Server-side data access for the ADMIN panel: includes drafts.
   List order mirrors the public site (pinned → pinnedOrder asc, then
   publishedAt desc) with drafts grouped on top (updatedAt desc). */

import type { Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "./admin";
import type { CollectionKey } from "@/lib/admin/schema";

export type AdminItem = {
  slug: string;
  status: "draft" | "published";
  pinned: boolean;
  pinnedOrder: number;
  publishedAt: number | null;
  createdAt: number | null;
  updatedAt: number | null;
  [key: string]: unknown;
};

function toPlain(id: string, data: Record<string, unknown>): AdminItem {
  const out: Record<string, unknown> = { ...data, slug: id };
  for (const key of ["publishedAt", "createdAt", "updatedAt"]) {
    const v = out[key] as Timestamp | null | undefined;
    out[key] =
      v && typeof (v as Timestamp).toMillis === "function"
        ? (v as Timestamp).toMillis()
        : null;
  }
  return out as AdminItem;
}

export async function listAllForAdmin(
  collection: CollectionKey
): Promise<AdminItem[]> {
  const db = getAdminDb();
  if (!db) return [];
  let snap;
  try {
    snap = await db.collection(collection).get();
  } catch (err) {
    console.error(`Firestore admin read failed (${collection}):`, err);
    return [];
  }
  const items = snap.docs.map((d) => toPlain(d.id, d.data()));
  const drafts = items
    .filter((i) => i.status !== "published")
    .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
  const published = items
    .filter((i) => i.status === "published")
    .sort((a, b) => {
      if (a.pinned && b.pinned) return a.pinnedOrder - b.pinnedOrder;
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return (b.publishedAt ?? 0) - (a.publishedAt ?? 0);
    });
  return [...drafts, ...published];
}

export async function getForAdmin(
  collection: CollectionKey,
  slug: string
): Promise<AdminItem | null> {
  const db = getAdminDb();
  if (!db) return null;
  try {
    const snap = await db.collection(collection).doc(slug).get();
    if (!snap.exists) return null;
    return toPlain(snap.id, snap.data()!);
  } catch (err) {
    console.error(`Firestore admin read failed (${collection}/${slug}):`, err);
    return null;
  }
}
