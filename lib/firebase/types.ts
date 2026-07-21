/* ─────────────────────────────────────────────────────────────────────────────
   PHASE 0 SUMMARY — static content (lib/content.ts) → Firestore mapping
   ─────────────────────────────────────────────────────────────────────────────
   Repo layout note: this project keeps shared code in root-level `lib/` (alias
   `@/*` → `./*`), so the Firebase layer lives in `lib/firebase/` rather than
   `src/lib/firebase/`.

   Static exports and where they go:

   • RACEHORSES: Racehorse[]  → collection `racehorses`, doc ID = slug.
     Fields consumed by the UI: name, bloodline, age, wins (number), region,
     color, summary, achievement, body, images[] ([0] = hero used on cards +
     detail header, [1..] = detail Gallery).
     `body: string[]` (one <p> per string) → `body: TiptapDoc` (one paragraph
     node per string).

   • TRAINERS: Trainer[]      → collection `trainers`, doc ID = slug.
     Fields: name, location, years, specialty, summary, body, images[].
     Same body conversion.

   • TREASURES: Treasure[]    → collection `treasures`, doc ID = slug.
     Fields: name, term, category ("Belt knife set" | "Snuff bottle" |
     "Silverwork"), material, summary, body, images[]. Same body conversion.

   • ARTICLES: Article[]      → collection `articles`, doc ID = slug.
     Fields: title, category, date (display string, e.g. "June 2026"), author,
     readTime, excerpt, lead (hero image URL), body, pullQuote, inlineImages[].
     `body: string[]` (5 paragraphs woven around FloatImage / PullQuote /
     SplitImages on /magazine/[slug]) → `body: TiptapDoc`. `pullQuote` and
     `inlineImages` stay separate fields so the existing article layout
     (lead ¶ with drop cap → float img0 → ¶¶ → pull quote → ¶ → split
     img1+img2 → remaining ¶¶) is preserved exactly.

   • SITE                     → doc `siteSettings/general`
     { name, nameMn, tagline, email, phone, address }.

   • Homepage curation        → doc `siteSettings/homepage`
     { horseOfIssueSlug, latestStoriesMode, latestStoriesSlugs } — replaces the
     hard-coded RACEHORSES[0] "Horse of the issue" and ARTICLES.slice(0, 3)
     "Latest stories" on app/page.tsx. The stats row (was hard-coded 9/9/6)
     now uses live published-document counts.

   • NAV, STEPPE, U()         → stay static (layout chrome, not content).

   Every content doc additionally carries PublishMeta (status/pin/timestamps).
   Public queries filter status == "published" and order: pinned first (by
   pinnedOrder asc), then publishedAt desc — newest published content first.
   ───────────────────────────────────────────────────────────────────────── */

import type { Timestamp } from "firebase-admin/firestore";

/* ── Tiptap document JSON (subset the site renders) ── */

export type TiptapMark = {
  type: "bold" | "italic" | "link";
  attrs?: { href?: string; target?: string | null };
};

export type TiptapNode = {
  type:
    | "doc"
    | "paragraph"
    | "heading"
    | "text"
    | "blockquote"
    | "bulletList"
    | "listItem"
    | "image"
    | "hardBreak";
  attrs?: {
    level?: number; // heading
    src?: string; // image
    alt?: string | null;
    title?: string | null;
    href?: string;
  };
  content?: TiptapNode[];
  marks?: TiptapMark[];
  text?: string;
};

export type TiptapDoc = { type: "doc"; content: TiptapNode[] };

/* ── Publish metadata carried by every content document ── */

export type PublishMeta = {
  status: "draft" | "published";
  pinned: boolean;
  pinnedOrder: number; // only meaningful when pinned
  publishedAt: Timestamp | null; // set once, on first publish
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

/* ── Content documents (doc ID = slug, kept identical to current URLs) ── */

export type RacehorseDoc = PublishMeta & {
  slug: string;
  name: string;
  bloodline: string;
  age: string;
  wins: number;
  region: string;
  color: string;
  summary: string;
  achievement: string;
  body: TiptapDoc;
  images: string[]; // [0] = hero, rest = gallery
};

export type TrainerDoc = PublishMeta & {
  slug: string;
  name: string;
  location: string;
  years: string;
  specialty: string;
  summary: string;
  body: TiptapDoc;
  images: string[];
};

export type TreasureCategory = "Belt knife set" | "Snuff bottle" | "Silverwork";

export type TreasureDoc = PublishMeta & {
  slug: string;
  name: string;
  term: string;
  category: TreasureCategory;
  material: string;
  summary: string;
  body: TiptapDoc;
  images: string[];
};

export type ArticleDoc = PublishMeta & {
  slug: string;
  title: string;
  category: string;
  date: string; // display date, e.g. "June 2026"
  author: string;
  readTime: string;
  excerpt: string;
  lead: string; // hero image URL
  body: TiptapDoc;
  pullQuote: string;
  inlineImages: string[]; // woven into the article layout
};

/* ── Site settings documents ── */

export type SiteGeneralSettings = {
  name: string;
  nameMn: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
};

export type HomepageSettings = {
  horseOfIssueSlug: string; // doc id in `racehorses`
  latestStoriesMode: "auto" | "manual";
  latestStoriesSlugs: string[]; // used when manual
};

/* ── Collection names, typed ── */

export const COLLECTIONS = {
  racehorses: "racehorses",
  trainers: "trainers",
  treasures: "treasures",
  articles: "articles",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
