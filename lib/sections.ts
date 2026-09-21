/* Editorial taxonomy (Ухаантай Морь булан бүтэц) — the single source of truth
   for the content menus. Client-safe (no server imports) so nav, admin and
   pages all read it.

   A GROUP is a top-level булан in the menu (its own hub page at /<group.slug>);
   each SECTION under it is an article category (page at /<group.slug>/<section.slug>)
   that editors fill by choosing its `value` in the admin «Булан» select. */

export type Section = {
  slug: string;
  /** Stored on article.section + shown in the admin select. */
  value: string;
  mn: string;
  en: string;
  descMn: string;
  descEn: string;
};

export type SectionGroup = {
  slug: string;
  mn: string;
  en: string;
  descMn: string;
  descEn: string;
  sections: Section[];
};

/** Value used for plain magazine articles (the select's default). */
export const MAGAZINE_VALUE = "Сэтгүүл";

export const SECTION_GROUPS: SectionGroup[] = [
  {
    slug: "after-work",
    mn: "Ажлын дараа",
    en: "After work",
    descMn: "Ажлын чөлөөний яриа, амьдралын булан",
    descEn: "Life and leisure beyond the track",
    sections: [
      {
        slug: "open-talk",
        value: "Нээлттэй яриа",
        mn: "Нээлттэй яриа",
        en: "Open talk",
        descMn: "Задгай, чин сэтгэлийн ярилцлагууд",
        descEn: "Candid, open-hearted conversations",
      },
      {
        slug: "trainer-stage",
        value: "Уяачийн индэр",
        mn: "Уяачийн индэр",
        en: "Trainer's stage",
        descMn: "Уяачдын түүх, туршлага, индэр",
        descEn: "Trainers' stories and experience",
      },
    ],
  },
  {
    slug: "new-era-trainer",
    mn: "Шинэ эриний уяач",
    en: "Trainer of the new era",
    descMn: "Өнөө үеийн уяач, залуучуудын хоолой",
    descEn: "Today's trainers and young voices",
    sections: [
      {
        slug: "youth",
        value: "Залуусын дуу хоолой",
        mn: "Залуусын дуу хоолой",
        en: "Youth voices",
        descMn: "Залуу үеийнхний бичвэр, санаа",
        descEn: "Writing from the next generation",
      },
      {
        slug: "perspectives",
        value: "Олон өнцөг",
        mn: "Олон өнцөг",
        en: "Perspectives",
        descMn: "Нэг сэдвийг олон талаас нь харах",
        descEn: "One subject seen from many angles",
      },
      {
        slug: "legal-help",
        value: "Хууль эрх зүйн тусламж",
        mn: "Хууль эрх зүйн тусламж",
        en: "Legal help",
        descMn: "Морь, мал аж ахуйн эрх зүйн зөвлөгөө",
        descEn: "Legal guidance for herders and owners",
      },
      {
        slug: "family-education",
        value: "Гэр бүлийн боловсролд",
        mn: "Гэр бүлийн боловсролд",
        en: "Family & education",
        descMn: "Гэр бүл, хүүхэд, боловсролын булан",
        descEn: "Family, children and education",
      },
    ],
  },
  {
    slug: "intellectual-heritage",
    mn: "Оюуны үнэт өв",
    en: "Intellectual heritage",
    descMn: "Соёл, урлаг, уламжлалын өв",
    descEn: "Culture, art and living tradition",
    sections: [
      {
        slug: "blacksmith",
        value: "Монгол дархны өв",
        mn: "Монгол дархны өв",
        en: "Blacksmith heritage",
        descMn: "Монгол дархан урлалын өв",
        descEn: "Mongolian blacksmith craft",
      },
      {
        slug: "fine-art",
        value: "Уран зургийн ертөнц",
        mn: "Уран зургийн ертөнц",
        en: "The world of fine art",
        descMn: "Морь, тал нутгийн уран зураг",
        descEn: "Horses and the steppe in fine art",
      },
      {
        slug: "tradition",
        value: "Өв уламжлал",
        mn: "Өв уламжлал",
        en: "Tradition",
        descMn: "Ёс заншил, уламжлалын өв",
        descEn: "Customs and living tradition",
      },
    ],
  },
];

export const ALL_SECTIONS: Section[] = SECTION_GROUPS.flatMap((g) => g.sections);

/** Admin select options for an article's «Булан» field (magazine + all sections). */
export const SECTION_OPTIONS: string[] = [
  MAGAZINE_VALUE,
  ...ALL_SECTIONS.map((s) => s.value),
];

export const SECTION_VALUES: string[] = ALL_SECTIONS.map((s) => s.value);

export function groupBySlug(slug: string): SectionGroup | undefined {
  return SECTION_GROUPS.find((g) => g.slug === slug);
}

export function sectionBySlug(
  groupSlug: string,
  sectionSlug: string
): { group: SectionGroup; section: Section } | undefined {
  const group = groupBySlug(groupSlug);
  const section = group?.sections.find((s) => s.slug === sectionSlug);
  return group && section ? { group, section } : undefined;
}

/** True when a section value belongs to a булан (not the plain magazine). */
export function isSectionValue(section?: string): boolean {
  return !!section && SECTION_VALUES.includes(section);
}
