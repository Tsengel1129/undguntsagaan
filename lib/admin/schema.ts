/* Admin form/collection configuration — client-safe (no server imports).
   One config per collection drives the list page, the edit form, the
   publish validation labels and the live preview card. */

import { SECTION_OPTIONS } from "@/lib/columns";

export type CollectionKey =
  | "racehorses"
  | "trainers"
  | "treasures"
  | "articles"
  | "issues"
  | "products"
  | "pharmacies"
  | "stock";

export type FieldDef = {
  key: string;
  label: string; // Mongolian label
  type: "text" | "textarea" | "number" | "select";
  options?: string[];
  /** Soft character guideline — counter turns amber beyond it. */
  guideline?: number;
  section: "basic" | "details";
  requiredForPublish?: boolean;
};

export type CollectionConfig = {
  key: CollectionKey;
  /** Mongolian section title (Hard-rule label). */
  title: string;
  /** Field whose value names the item (used for slug + breadcrumb). */
  nameKey: string;
  /** Field shown as the card summary. */
  summaryKey: string;
  /** "gallery": images[] (hero first) · "article": lead + inlineImages[] ·
     "none": data-only record (no images, no rich body — e.g. stock rows). */
  imagesModel: "gallery" | "article" | "none";
  /** Data-only collections ("none") skip the rich-text body editor. */
  noBody?: boolean;
  fields: FieldDef[];
  /** Preview card mappers (public StandardCard props). */
  preview: {
    eyebrow: (v: Record<string, unknown>) => string;
    meta: (v: Record<string, unknown>) => string;
    badge?: (v: Record<string, unknown>) => string | undefined;
  };
};

const s = (v: unknown) => (typeof v === "string" ? v : String(v ?? ""));

export const COLLECTION_CONFIGS: Record<CollectionKey, CollectionConfig> = {
  racehorses: {
    key: "racehorses",
    title: "Адуу",
    nameKey: "name",
    summaryKey: "summary",
    imagesModel: "gallery",
    fields: [
      { key: "name", label: "Гарчиг", type: "text", guideline: 70, section: "basic", requiredForPublish: true },
      { key: "bloodline", label: "Удам", type: "text", section: "basic" },
      { key: "age", label: "Нас", type: "text", section: "basic" },
      { key: "wins", label: "Түрүүлсэн тоо", type: "number", section: "basic" },
      { key: "region", label: "Аймаг / бүс", type: "text", section: "basic" },
      { key: "color", label: "Зүс", type: "text", section: "basic" },
      { key: "summary", label: "Товч тайлбар", type: "textarea", guideline: 160, section: "basic", requiredForPublish: true },
      { key: "achievement", label: "Гол амжилт", type: "text", section: "basic" },
    ],
    preview: {
      eyebrow: (v) => s(v.bloodline),
      meta: (v) => [s(v.region), s(v.age)].filter(Boolean).join(" · "),
      badge: (v) => (v.wins ? `${v.wins} wins` : undefined),
    },
  },
  trainers: {
    key: "trainers",
    title: "Уяачид",
    nameKey: "name",
    summaryKey: "summary",
    imagesModel: "gallery",
    fields: [
      { key: "name", label: "Гарчиг", type: "text", guideline: 70, section: "basic", requiredForPublish: true },
      { key: "location", label: "Аймаг", type: "text", section: "basic" },
      { key: "years", label: "Туршлага", type: "text", section: "basic" },
      { key: "specialty", label: "Мэргэшил", type: "text", section: "basic" },
      { key: "summary", label: "Товч тайлбар", type: "textarea", guideline: 160, section: "basic", requiredForPublish: true },
    ],
    preview: {
      eyebrow: (v) => s(v.location),
      meta: (v) => [s(v.years), s(v.specialty)].filter(Boolean).join(" · "),
    },
  },
  treasures: {
    key: "treasures",
    title: "Өв соёл",
    nameKey: "name",
    summaryKey: "summary",
    imagesModel: "gallery",
    fields: [
      { key: "name", label: "Гарчиг", type: "text", guideline: 70, section: "basic", requiredForPublish: true },
      { key: "term", label: "Монгол нэршил", type: "text", section: "basic" },
      { key: "category", label: "Ангилал", type: "select", options: ["Belt knife set", "Snuff bottle", "Silverwork"], section: "basic" },
      { key: "material", label: "Материал", type: "text", section: "basic" },
      { key: "summary", label: "Товч тайлбар", type: "textarea", guideline: 160, section: "basic", requiredForPublish: true },
    ],
    preview: {
      eyebrow: (v) => [s(v.term), s(v.category)].filter(Boolean).join(" · "),
      meta: (v) => s(v.material),
    },
  },
  articles: {
    key: "articles",
    title: "Сэтгүүл",
    nameKey: "title",
    summaryKey: "excerpt",
    imagesModel: "article",
    fields: [
      { key: "title", label: "Гарчиг", type: "text", guideline: 70, section: "basic", requiredForPublish: true },
      { key: "category", label: "Ангилал", type: "text", section: "basic", requiredForPublish: true },
      { key: "section", label: "Булан", type: "select", options: SECTION_OPTIONS, section: "basic" },
      { key: "date", label: "Огноо (жишээ: June 2026)", type: "text", section: "basic" },
      { key: "author", label: "Зохиогч", type: "text", section: "basic" },
      { key: "readTime", label: "Унших хугацаа", type: "text", section: "basic" },
      { key: "excerpt", label: "Товч тайлбар", type: "textarea", guideline: 160, section: "basic", requiredForPublish: true },
      { key: "pullQuote", label: "Ишлэл (pull quote)", type: "textarea", section: "details" },
    ],
    preview: {
      eyebrow: (v) => s(v.category),
      meta: (v) => [s(v.date), s(v.readTime)].filter(Boolean).join(" · "),
    },
  },
  issues: {
    key: "issues",
    title: "Сэтгүүлийн дугаарууд",
    nameKey: "title",
    summaryKey: "summary",
    // Gallery model: images[] holds the ordered page scans, [0] = cover.
    // The public flipbook reads these in order.
    imagesModel: "gallery",
    fields: [
      { key: "title", label: "Гарчиг (жишээ: 2026 №1)", type: "text", guideline: 70, section: "basic", requiredForPublish: true },
      { key: "issueNumber", label: "Дугаар", type: "text", section: "basic" },
      { key: "date", label: "Огноо (жишээ: 2026 оны 6-р сар)", type: "text", section: "basic" },
      { key: "year", label: "Он (архивт бүлэглэх)", type: "text", section: "basic" },
      { key: "price", label: "Архивын үнэ (₮, 0 = үнэгүй)", type: "number", section: "basic" },
      { key: "summary", label: "Товч тайлбар", type: "textarea", guideline: 160, section: "basic" },
      { key: "pdfUrl", label: "PDF холбоос (унших/татах)", type: "text", section: "details" },
    ],
    preview: {
      eyebrow: (v) => s(v.issueNumber),
      meta: (v) => s(v.date),
    },
  },
  products: {
    key: "products",
    title: "Дэлгүүр — бүтээгдэхүүн",
    nameKey: "name",
    summaryKey: "summary",
    imagesModel: "gallery",
    fields: [
      { key: "name", label: "Нэр", type: "text", guideline: 70, section: "basic", requiredForPublish: true },
      { key: "category", label: "Ангилал", type: "select", options: ["Эм тариа", "Бусад бүтээгдэхүүн"], section: "basic", requiredForPublish: true },
      { key: "brand", label: "Бренд / үйлдвэрлэгч", type: "text", section: "basic" },
      { key: "price", label: "Үнэ (₮)", type: "number", section: "basic" },
      { key: "unit", label: "Хэмжих нэгж", type: "text", section: "basic" },
      { key: "summary", label: "Товч тайлбар", type: "textarea", guideline: 160, section: "basic", requiredForPublish: true },
    ],
    preview: {
      eyebrow: (v) => s(v.category),
      meta: (v) => (v.price ? `${Number(v.price).toLocaleString()}₮` : s(v.brand)),
    },
  },
  pharmacies: {
    key: "pharmacies",
    title: "Малын эмийн сангууд",
    nameKey: "name",
    summaryKey: "address",
    imagesModel: "gallery",
    fields: [
      { key: "name", label: "Нэр", type: "text", guideline: 70, section: "basic", requiredForPublish: true },
      { key: "aimag", label: "Аймаг / хот", type: "text", section: "basic", requiredForPublish: true },
      { key: "sum", label: "Сум / дүүрэг", type: "text", section: "basic" },
      { key: "address", label: "Дэлгэрэнгүй хаяг", type: "textarea", guideline: 160, section: "basic" },
      { key: "phone", label: "Утас", type: "text", section: "basic" },
      { key: "hours", label: "Цагийн хуваарь", type: "text", section: "basic" },
      { key: "lat", label: "Өргөрөг (lat, жишээ: 47.9187)", type: "text", section: "details" },
      { key: "lng", label: "Уртраг (lng, жишээ: 106.9176)", type: "text", section: "details" },
    ],
    preview: {
      eyebrow: (v) => [s(v.aimag), s(v.sum)].filter(Boolean).join(" · "),
      meta: (v) => s(v.phone),
    },
  },
  stock: {
    key: "stock",
    title: "Эмийн үлдэгдэл",
    nameKey: "product",
    summaryKey: "pharmacy",
    imagesModel: "none",
    noBody: true,
    fields: [
      { key: "product", label: "Бүтээгдэхүүний нэр", type: "text", guideline: 70, section: "basic", requiredForPublish: true },
      { key: "pharmacy", label: "Эмийн сан", type: "text", section: "basic", requiredForPublish: true },
      { key: "aimag", label: "Аймаг / хот", type: "text", section: "basic" },
      { key: "sum", label: "Сум / дүүрэг", type: "text", section: "basic" },
      { key: "phone", label: "Утас", type: "text", section: "basic" },
      { key: "quantity", label: "Үлдэгдэл (тоо)", type: "number", section: "basic" },
      { key: "unit", label: "Нэгж (ширхэг / уут)", type: "text", section: "basic" },
    ],
    preview: {
      eyebrow: (v) => [s(v.aimag), s(v.sum)].filter(Boolean).join(" · "),
      meta: (v) => (v.quantity != null && v.quantity !== "" ? `${v.quantity} ${s(v.unit)}`.trim() : ""),
    },
  },
};

export const COLLECTION_KEYS = Object.keys(COLLECTION_CONFIGS) as CollectionKey[];

export function isCollectionKey(v: string): v is CollectionKey {
  return v in COLLECTION_CONFIGS;
}

/* ── Slug generation: Cyrillic → Latin, lowercase, dashed ── */

const CYR: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "ye", ё: "yo", ж: "j", з: "z",
  и: "i", й: "i", к: "k", л: "l", м: "m", н: "n", о: "o", ө: "u", п: "p",
  р: "r", с: "s", т: "t", у: "u", ү: "u", ф: "f", х: "kh", ц: "ts", ч: "ch",
  ш: "sh", щ: "sh", ъ: "", ы: "y", ь: "i", э: "e", ю: "yu", я: "ya",
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .split("")
    .map((ch) => CYR[ch] ?? ch)
    .join("")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "item";
}

/** Empty Tiptap doc. */
export const EMPTY_DOC = { type: "doc", content: [] };

export function docIsEmpty(doc: unknown): boolean {
  const d = doc as { content?: { content?: unknown[]; type?: string; attrs?: { src?: string } }[] } | null;
  if (!d || !Array.isArray(d.content) || d.content.length === 0) return true;
  return !d.content.some(
    (n) =>
      (Array.isArray(n.content) && n.content.length > 0) ||
      (n.type === "image" && n.attrs?.src)
  );
}
