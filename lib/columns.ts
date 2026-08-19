/* Free column (Чөлөөт булан) model — the three columns that share the
   articles collection via each article's `section` value. Client-safe: no
   server imports, so nav / admin / pages can all read it.

   `value` is exactly what the admin "Булан" select stores on an article and
   what the column pages filter by; `slug` is the public URL segment. */

export type ColumnSlug = "open-talk" | "perspectives" | "youth";

export type ColumnSection = {
  slug: ColumnSlug;
  /** Stored on the article + shown in the admin select. */
  value: string;
  mn: string;
  en: string;
  blurbMn: string;
  blurbEn: string;
};

/** Value used for main-magazine articles (the select's default). */
export const MAGAZINE_VALUE = "Сэтгүүл";

export const COLUMN_SECTIONS: ColumnSection[] = [
  {
    slug: "open-talk",
    value: "Нээлттэй яриа",
    mn: "Нээлттэй яриа",
    en: "Open talk",
    blurbMn: "Хүмүүстэй хийсэн задгай, чин сэтгэлийн ярилцлагууд.",
    blurbEn: "Candid, open-hearted conversations.",
  },
  {
    slug: "perspectives",
    value: "Олон өнцөг",
    mn: "Олон өнцөг",
    en: "Perspectives",
    blurbMn: "Нэг сэдвийг олон талаас нь харсан бодол, өгүүллүүд.",
    blurbEn: "One subject seen from many angles.",
  },
  {
    slug: "youth",
    value: "Залуусын дуу хоолой",
    mn: "Залуусын дуу хоолой",
    en: "Youth voices",
    blurbMn: "Залуу үеийнхний бичвэр, санаа, дуу хоолой.",
    blurbEn: "Writing and ideas from the next generation.",
  },
];

/** Admin select options for an article's Булан field (magazine + columns). */
export const SECTION_OPTIONS: string[] = [
  MAGAZINE_VALUE,
  ...COLUMN_SECTIONS.map((c) => c.value),
];

export const COLUMN_VALUES: string[] = COLUMN_SECTIONS.map((c) => c.value);

export function columnBySlug(slug: string): ColumnSection | undefined {
  return COLUMN_SECTIONS.find((c) => c.slug === slug);
}

/** True when a section value belongs to a Free column (not the magazine). */
export function isColumnValue(section?: string): boolean {
  return !!section && COLUMN_VALUES.includes(section);
}
