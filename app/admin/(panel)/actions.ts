"use server";

/* Admin server actions — every write is token-gated (requireAdmin) and goes
   through the Admin SDK. All user-visible strings live in JSON bodies,
   never HTTP headers (Mongolian Cyrillic is not header-safe). */

import { revalidatePath } from "next/cache";
import { FieldValue, type Firestore } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { requireAdmin } from "@/lib/admin/auth";
import {
  COLLECTION_CONFIGS,
  docIsEmpty,
  isCollectionKey,
  slugify,
  type CollectionKey,
} from "@/lib/admin/schema";
import { TEXT_KEYS } from "@/lib/siteTexts";

export type ActionResult = { ok: boolean; error?: string; slug?: string };

const PUBLIC_BASE: Record<CollectionKey, string> = {
  racehorses: "/racehorses",
  trainers: "/trainers",
  treasures: "/heritage",
  articles: "/magazine",
  issues: "/magazine/issue",
  products: "/shop",
  pharmacies: "/shop/pharmacies",
  stock: "/shop",
};

function revalidateFor(collection: CollectionKey, slug?: string) {
  revalidatePath("/");
  revalidatePath(PUBLIC_BASE[collection]);
  if (slug) revalidatePath(`${PUBLIC_BASE[collection]}/${slug}`);
  revalidatePath(`/admin/${collection}`);
}

function guard(collection: string) {
  if (!isCollectionKey(collection)) throw new Error("BAD_COLLECTION");
  const db = getAdminDb();
  if (!db) throw new Error("Firebase тохиргоо дутуу байна (.env.local)");
  return db;
}

/** Keep only fields the schema knows + content fields; coerce numbers. */
function sanitizeValues(
  collection: CollectionKey,
  values: Record<string, unknown>
): Record<string, unknown> {
  const config = COLLECTION_CONFIGS[collection];
  const out: Record<string, unknown> = {};
  for (const f of config.fields) {
    if (!(f.key in values)) continue;
    const v = values[f.key];
    out[f.key] = f.type === "number" ? Number(v) || 0 : (v ?? "");
  }
  if ("body" in values) out.body = values.body ?? { type: "doc", content: [] };
  if (config.imagesModel === "gallery") {
    if ("images" in values) {
      out.images = (values.images as unknown[]).filter(
        (u) => typeof u === "string" && u.trim() !== ""
      );
    }
  } else if (config.imagesModel === "article") {
    if ("lead" in values) out.lead = values.lead ?? "";
    if ("inlineImages" in values) {
      out.inlineImages = (values.inlineImages as unknown[]).filter(
        (u) => typeof u === "string" && u.trim() !== ""
      );
    }
  }
  // imagesModel "none": data-only record — no image fields written.
  return out;
}

async function uniqueSlug(
  db: Firestore,
  collection: CollectionKey,
  base: string
): Promise<string> {
  let candidate = base;
  for (let i = 2; i < 50; i++) {
    const snap = await db.collection(collection).doc(candidate).get();
    if (!snap.exists) return candidate;
    candidate = `${base}-${i}`;
  }
  throw new Error("slug");
}

export async function saveItem(
  collection: CollectionKey,
  slug: string | null,
  values: Record<string, unknown>
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const db = guard(collection);
    const data = sanitizeValues(collection, values);

    if (slug) {
      await db
        .collection(collection)
        .doc(slug)
        .set({ ...data, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
      revalidateFor(collection, slug);
      return { ok: true, slug };
    }

    const config = COLLECTION_CONFIGS[collection];
    const requestedSlug =
      typeof values.slug === "string" && values.slug.trim()
        ? slugify(values.slug)
        : slugify(String(data[config.nameKey] ?? "item"));
    const finalSlug = await uniqueSlug(db, collection, requestedSlug);
    await db.collection(collection).doc(finalSlug).set({
      ...data,
      slug: finalSlug,
      status: "draft",
      pinned: false,
      pinnedOrder: 0,
      publishedAt: null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    revalidateFor(collection, finalSlug);
    return { ok: true, slug: finalSlug };
  } catch (e) {
    return failure(e);
  }
}

export async function publishItem(
  collection: CollectionKey,
  slug: string
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const db = guard(collection);
    const ref = db.collection(collection).doc(slug);
    const snap = await ref.get();
    if (!snap.exists) return { ok: false, error: "Олдсонгүй" };
    const item = snap.data()!;
    const config = COLLECTION_CONFIGS[collection];

    // Publish-time validation — list every missing required field.
    const missing: string[] = [];
    for (const f of config.fields) {
      if (f.requiredForPublish && !String(item[f.key] ?? "").trim()) {
        missing.push(f.label);
      }
    }
    if (config.imagesModel === "gallery") {
      const images = (item.images as string[] | undefined) ?? [];
      if (images.length === 0) missing.push("Зураг");
    } else {
      if (!String(item.lead ?? "").trim()) missing.push("Нүүр зураг (lead)");
      if (docIsEmpty(item.body)) missing.push("Нийтлэлийн эх (body)");
    }
    if (missing.length > 0) {
      return { ok: false, error: `Дутуу талбарууд: ${missing.join(", ")}` };
    }

    await ref.set(
      {
        status: "published",
        // Set once, on first publish — republishing must not bump position.
        publishedAt: item.publishedAt ?? FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    revalidateFor(collection, slug);
    return { ok: true, slug };
  } catch (e) {
    return failure(e);
  }
}

export async function unpublishItem(
  collection: CollectionKey,
  slug: string
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const db = guard(collection);
    await db.collection(collection).doc(slug).set(
      { status: "draft", updatedAt: FieldValue.serverTimestamp() },
      { merge: true }
    );
    revalidateFor(collection, slug);
    return { ok: true, slug };
  } catch (e) {
    return failure(e);
  }
}

export async function deleteItem(
  collection: CollectionKey,
  slug: string
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const db = guard(collection);
    await db.collection(collection).doc(slug).delete();
    revalidateFor(collection, slug);
    return { ok: true };
  } catch (e) {
    return failure(e);
  }
}

export async function setPin(
  collection: CollectionKey,
  slug: string,
  pinned: boolean,
  pinnedOrder: number
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const db = guard(collection);
    await db.collection(collection).doc(slug).set(
      {
        pinned,
        pinnedOrder: Number.isFinite(pinnedOrder) ? pinnedOrder : 0,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    revalidateFor(collection, slug);
    return { ok: true, slug };
  } catch (e) {
    return failure(e);
  }
}

export async function saveHomepageSettings(settings: {
  horseOfIssueSlug: string;
  latestStoriesMode: "auto" | "manual";
  latestStoriesSlugs: string[];
}): Promise<ActionResult> {
  try {
    await requireAdmin();
    const db = getAdminDb();
    if (!db) throw new Error("Firebase тохиргоо дутуу байна (.env.local)");
    await db.collection("siteSettings").doc("homepage").set({
      horseOfIssueSlug: String(settings.horseOfIssueSlug ?? ""),
      latestStoriesMode:
        settings.latestStoriesMode === "manual" ? "manual" : "auto",
      latestStoriesSlugs: (settings.latestStoriesSlugs ?? [])
        .map(String)
        .filter(Boolean)
        .slice(0, 3),
    });
    revalidatePath("/");
    revalidatePath("/admin/homepage");
    return { ok: true };
  } catch (e) {
    return failure(e);
  }
}

export async function saveSiteTexts(
  values: Record<string, string>
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const db = getAdminDb();
    if (!db) throw new Error("Firebase тохиргоо дутуу байна (.env.local)");
    const clean: Record<string, string> = {};
    for (const key of TEXT_KEYS) {
      if (key in values) clean[key] = String(values[key] ?? "");
    }
    await db.collection("siteSettings").doc("texts").set(clean, { merge: true });
    // Chrome texts appear across the whole site.
    revalidatePath("/", "layout");
    revalidatePath("/admin/texts");
    return { ok: true };
  } catch (e) {
    return failure(e);
  }
}

export async function saveGeneralSettings(settings: {
  name: string;
  nameMn: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
}): Promise<ActionResult> {
  try {
    await requireAdmin();
    const db = getAdminDb();
    if (!db) throw new Error("Firebase тохиргоо дутуу байна (.env.local)");
    await db.collection("siteSettings").doc("general").set({
      name: String(settings.name ?? ""),
      nameMn: String(settings.nameMn ?? ""),
      tagline: String(settings.tagline ?? ""),
      email: String(settings.email ?? ""),
      phone: String(settings.phone ?? ""),
      address: String(settings.address ?? ""),
    });
    // The footer renders site-wide.
    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");
    return { ok: true };
  } catch (e) {
    return failure(e);
  }
}

function failure(e: unknown): ActionResult {
  if (e instanceof Error && e.message === "UNAUTHORIZED") {
    return { ok: false, error: "Хандах эрхгүй байна" };
  }
  return {
    ok: false,
    error: e instanceof Error ? e.message : "Алдаа гарлаа",
  };
}
