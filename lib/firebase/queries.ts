/* Server-side data access for the public site (Admin SDK).

   Every list obeys the global ordering rule:
     1. pinned items first, by pinnedOrder asc
     2. then everything else by publishedAt desc (newest published first)
   and only ever returns status == "published" documents.

   Collections are small (single-digit / low-double-digit counts), so lists
   fetch the collection and filter/sort in process — no composite indexes
   needed, and the rule is enforced in exactly one place. */

import { cache } from "react";
import type { Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "./admin";
import { DEFAULT_TEXTS } from "@/lib/siteTexts";
import { isSectionValue } from "@/lib/sections";
import {
  COLLECTIONS,
  type ArticleDoc,
  type CollectionName,
  type HomepageSettings,
  type IssueDoc,
  type PharmacyDoc,
  type ProductDoc,
  type RacehorseDoc,
  type SiteGeneralSettings,
  type StockDoc,
  type TrainerDoc,
  type TreasureDoc,
} from "./types";

/* ── Serializable ("plain") shapes passed from server to client components ── */

type Plainify<T> = {
  [K in keyof T]: T[K] extends Timestamp | null ? number | null : T[K];
};

export type Racehorse = Plainify<RacehorseDoc>;
export type Trainer = Plainify<TrainerDoc>;
export type Treasure = Plainify<TreasureDoc>;
export type Article = Plainify<ArticleDoc>;
export type Issue = Plainify<IssueDoc>;
export type Product = Plainify<ProductDoc>;
export type Pharmacy = Plainify<PharmacyDoc>;
export type Stock = Plainify<StockDoc>;

function toPlain<T extends { [k: string]: unknown }>(data: T): Plainify<T> {
  const out: Record<string, unknown> = { ...data };
  for (const key of ["publishedAt", "createdAt", "updatedAt"]) {
    const v = out[key] as Timestamp | null | undefined;
    out[key] = v && typeof (v as Timestamp).toMillis === "function"
      ? (v as Timestamp).toMillis()
      : null;
  }
  return out as Plainify<T>;
}

/* ── The ordering rule (Hard Rule 2), in one place ── */

type Orderable = {
  pinned?: boolean;
  pinnedOrder?: number;
  publishedAt?: number | null;
};

export function orderContent<T extends Orderable>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (a.pinned && b.pinned) {
      return (a.pinnedOrder ?? 0) - (b.pinnedOrder ?? 0);
    }
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return (b.publishedAt ?? 0) - (a.publishedAt ?? 0);
  });
}

/* ── Generic published-list / published-get ── */

type PlainDoc = Orderable & { slug: string };

/* Network hiccups (DNS loss, offline, Google outage) must degrade to empty
   states / defaults — never crash a public render. */
function warnRead(scope: string, err: unknown) {
  console.error(
    `Firestore read failed (${scope}) — serving fallback:`,
    err instanceof Error ? err.message : err
  );
}

const listPublished = cache(
  async (collection: CollectionName): Promise<PlainDoc[]> => {
    const db = getAdminDb();
    if (!db) return [];
    try {
      const snap = await db
        .collection(collection)
        .where("status", "==", "published")
        .get();
      return orderContent(
        snap.docs.map(
          (d) => toPlain({ ...d.data(), slug: d.id }) as unknown as PlainDoc
        )
      );
    } catch (err) {
      warnRead(collection, err);
      return [];
    }
  }
);

async function getPublishedBySlug(
  collection: CollectionName,
  slug: string
): Promise<PlainDoc | null> {
  const db = getAdminDb();
  if (!db) return null;
  try {
    const snap = await db.collection(collection).doc(slug).get();
    if (!snap.exists) return null;
    const data = snap.data()!;
    if (data.status !== "published") return null;
    return toPlain({ ...data, slug: snap.id }) as unknown as PlainDoc;
  } catch (err) {
    warnRead(`${collection}/${slug}`, err);
    return null;
  }
}

/* ── Public API, one pair per collection ── */

export const listRacehorses = () =>
  listPublished(COLLECTIONS.racehorses) as Promise<Racehorse[]>;
export const getRacehorse = (slug: string) =>
  getPublishedBySlug(COLLECTIONS.racehorses, slug) as Promise<Racehorse | null>;

export const listTrainers = () =>
  listPublished(COLLECTIONS.trainers) as Promise<Trainer[]>;
export const getTrainer = (slug: string) =>
  getPublishedBySlug(COLLECTIONS.trainers, slug) as Promise<Trainer | null>;

export const listTreasures = () =>
  listPublished(COLLECTIONS.treasures) as Promise<Treasure[]>;
export const getTreasure = (slug: string) =>
  getPublishedBySlug(COLLECTIONS.treasures, slug) as Promise<Treasure | null>;

export const listArticles = () =>
  listPublished(COLLECTIONS.articles) as Promise<Article[]>;
export const getArticle = (slug: string) =>
  getPublishedBySlug(COLLECTIONS.articles, slug) as Promise<Article | null>;

/** Other published articles for the "Related articles" strip. */
export async function relatedArticles(slug: string, count = 3) {
  const all = await listArticles();
  return all.filter((a) => a.slug !== slug).slice(0, count);
}

/** Plain magazine articles only — excludes anything routed to a булан section. */
export const listMagazineArticles = async (): Promise<Article[]> =>
  (await listArticles()).filter((a) => !isSectionValue(a.section));

/* ── Magazine issues (flipbook) ── */

export const listIssues = () =>
  listPublished(COLLECTIONS.issues) as Promise<Issue[]>;

export const getIssue = (slug: string) =>
  getPublishedBySlug(COLLECTIONS.issues, slug) as Promise<Issue | null>;

/** The current issue for the flipbook: pinned first, else newest published. */
export const getCurrentIssue = async (): Promise<Issue | null> =>
  (await listIssues())[0] ?? null;

/* ── Shop (Дэлгүүр) ── */

export const listProducts = () =>
  listPublished(COLLECTIONS.products) as Promise<Product[]>;
export const getProduct = (slug: string) =>
  getPublishedBySlug(COLLECTIONS.products, slug) as Promise<Product | null>;

/** Products filtered by category ("Эм тариа" | "Бусад бүтээгдэхүүн"). */
export const listProductsByCategory = async (
  category: string
): Promise<Product[]> =>
  (await listProducts()).filter((p) => p.category === category);

export const listPharmacies = () =>
  listPublished(COLLECTIONS.pharmacies) as Promise<Pharmacy[]>;
export const getPharmacy = (slug: string) =>
  getPublishedBySlug(COLLECTIONS.pharmacies, slug) as Promise<Pharmacy | null>;

export const listStock = () =>
  listPublished(COLLECTIONS.stock) as Promise<Stock[]>;

/** emonos-style availability search: match rows whose product name contains
   the query (case-insensitive), newest first (ordering already applied). */
export const searchStock = async (query: string): Promise<Stock[]> => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return (await listStock()).filter((row) =>
    (row.product ?? "").toLowerCase().includes(q)
  );
};

/** Articles belonging to one булан section, matched by its stored value. */
export const listSectionArticles = async (
  sectionValue: string
): Promise<Article[]> =>
  (await listArticles()).filter((a) => a.section === sectionValue);

/* ── Site settings ── */

const DEFAULT_GENERAL: SiteGeneralSettings = {
  name: "Uhaantai Mori",
  nameMn: "Ухаантай Морь",
  tagline:
    "Хурдан морины удам угсаа, нэрт уяач, амьд өв уламжлалын тухай Монголын сэтгүүл.",
  email: "info@undguntsagaan.mn",
  phone: "88997733",
  address: "Baga Toiruu-20, P.O.Box 349, SBD - 8 khoroo, Ulaanbaatar 14200",
};

const DEFAULT_HOMEPAGE: HomepageSettings = {
  horseOfIssueSlug: "tengeriin-salhi",
  latestStoriesMode: "auto",
  latestStoriesSlugs: [],
};

export const getSiteTexts = cache(
  async (): Promise<Record<string, string>> => {
    const db = getAdminDb();
    if (!db) return DEFAULT_TEXTS;
    try {
      const snap = await db.collection("siteSettings").doc("texts").get();
      return snap.exists
        ? { ...DEFAULT_TEXTS, ...(snap.data() as Record<string, string>) }
        : DEFAULT_TEXTS;
    } catch (err) {
      warnRead("siteSettings/texts", err);
      return DEFAULT_TEXTS;
    }
  }
);

export const getSiteSettings = cache(async (): Promise<SiteGeneralSettings> => {
  const db = getAdminDb();
  if (!db) return DEFAULT_GENERAL;
  try {
    const snap = await db.collection("siteSettings").doc("general").get();
    return snap.exists
      ? { ...DEFAULT_GENERAL, ...(snap.data() as SiteGeneralSettings) }
      : DEFAULT_GENERAL;
  } catch (err) {
    warnRead("siteSettings/general", err);
    return DEFAULT_GENERAL;
  }
});

export const getHomepageSettings = cache(
  async (): Promise<HomepageSettings> => {
    const db = getAdminDb();
    if (!db) return DEFAULT_HOMEPAGE;
    try {
      const snap = await db.collection("siteSettings").doc("homepage").get();
      return snap.exists
        ? { ...DEFAULT_HOMEPAGE, ...(snap.data() as HomepageSettings) }
        : DEFAULT_HOMEPAGE;
    } catch (err) {
      warnRead("siteSettings/homepage", err);
      return DEFAULT_HOMEPAGE;
    }
  }
);

/* ── Homepage bundle ── */

export type HomepageData = {
  site: SiteGeneralSettings;
  settings: HomepageSettings;
  horseOfIssue: Racehorse | null;
  latestStories: Article[];
  /** First published item of each section, for the preview tiles. */
  previews: {
    racehorse: Racehorse | null;
    trainer: Trainer | null;
    treasure: Treasure | null;
    article: Article | null;
  };
  counts: {
    racehorses: number;
    trainers: number;
    treasures: number;
    articles: number;
  };
};

export async function getHomepageData(): Promise<HomepageData> {
  const [site, settings, racehorses, trainers, treasures, articles] =
    await Promise.all([
      getSiteSettings(),
      getHomepageSettings(),
      listRacehorses(),
      listTrainers(),
      listTreasures(),
      listArticles(),
    ]);

  const horseOfIssue =
    racehorses.find((h) => h.slug === settings.horseOfIssueSlug) ??
    racehorses[0] ??
    null;

  let latestStories: Article[];
  if (settings.latestStoriesMode === "manual") {
    const picked = settings.latestStoriesSlugs
      .map((slug) => articles.find((a) => a.slug === slug))
      .filter((a): a is Article => Boolean(a));
    // Top up empty slots (unset / unpublished picks) with the newest stories.
    const fill = articles.filter((a) => !picked.some((p) => p.slug === a.slug));
    latestStories = [...picked, ...fill].slice(0, 3);
  } else {
    latestStories = articles.slice(0, 3);
  }

  return {
    site,
    settings,
    horseOfIssue,
    latestStories,
    previews: {
      racehorse: racehorses[0] ?? null,
      trainer: trainers[0] ?? null,
      // The static homepage used TREASURES[6] (silver drinking bowl) for the
      // heritage tile; index 6 preserves that exact image after the seed.
      treasure: treasures[6] ?? treasures[0] ?? null,
      article: articles[0] ?? null,
    },
    counts: {
      racehorses: racehorses.length,
      trainers: trainers.length,
      treasures: treasures.length,
      articles: articles.length,
    },
  };
}
