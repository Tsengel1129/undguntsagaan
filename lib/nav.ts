/* Layout chrome (not CMS content) — the nav tree stays static so the Header
   (a client component) never imports the runtime content layer.

   The editorial булан (Ажлын дараа / Шинэ эриний уяач / Оюуны үнэт өв) and their
   sections come straight from lib/sections.ts, so the menu and the pages share
   one source of truth. Every label carries both languages (mn primary, en
   toggle) plus an optional one-line blurb shown in dropdowns. */

import { SECTION_GROUPS } from "./sections";

/** Promo card shown on the left of a desktop mega menu (Oura-style). */
export type NavFeatured = {
  href: string;
  mn: string;
  en: string;
  image: string;
};

export type NavItem = {
  /** Optional so a pure grouping header can exist without its own page. */
  href?: string;
  mn: string;
  en: string;
  descMn?: string;
  descEn?: string;
  /** Line-icon key (see components/NavIcon.tsx); shown next to dropdown items. */
  icon?: string;
  /** Featured image card for the mega menu (top-level items only). */
  featured?: NavFeatured;
  children?: NavItem[];
};

const unsplash = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

/** Mega-menu promo cards per булан (steppe / trainer / craft imagery). */
const FEATURED: Record<string, NavFeatured> = {
  "after-work": {
    href: "/after-work",
    mn: "Ажлын дараа",
    en: "After work",
    image: unsplash("photo-1535728534313-e206f59bed23"),
  },
  "new-era-trainer": {
    href: "/new-era-trainer",
    mn: "Шинэ эриний уяач",
    en: "Trainer of the new era",
    image: unsplash("photo-1547581849-38ba650ad0de"),
  },
  "intellectual-heritage": {
    href: "/intellectual-heritage",
    mn: "Оюуны үнэт өв",
    en: "Intellectual heritage",
    image: unsplash("photo-1547700094-a0b42d320937"),
  },
};

const bulan: NavItem[] = SECTION_GROUPS.map((g) => ({
  href: `/${g.slug}`,
  mn: g.mn,
  en: g.en,
  descMn: g.descMn,
  descEn: g.descEn,
  featured: FEATURED[g.slug],
  children: g.sections.map((s) => ({
    href: `/${g.slug}/${s.slug}`,
    mn: s.mn,
    en: s.en,
    descMn: s.descMn,
    descEn: s.descEn,
    icon: s.slug,
  })),
}));

export const NAV: NavItem[] = [
  bulan[0], // Ажлын дараа
  bulan[1], // Шинэ эриний уяач
  {
    href: "/magazine",
    mn: "Сэтгүүл",
    en: "Magazine",
    featured: {
      href: "/magazine/issue",
      mn: "Шинэ дугаар унших",
      en: "Read the new issue",
      image: unsplash("photo-1562595706-61433957484a"),
    },
    children: [
      {
        href: "/magazine",
        mn: "Бүх нийтлэл",
        en: "All articles",
        descMn: "Сэтгүүлийн бүх нийтлэл нэг дор",
        descEn: "Every article in one place",
        icon: "articles",
      },
      {
        href: "/magazine/issue",
        mn: "Шинэ дугаар",
        en: "Current issue",
        descMn: "Хамгийн сүүлийн дугаарыг цахимаар эргүүлж унших",
        descEn: "Flip through the latest issue online",
        icon: "issue",
      },
      {
        href: "/magazine/archive",
        mn: "Архив",
        en: "Archive",
        descMn: "110+ өнгөрсөн дугаар — PDF унших, татах",
        descEn: "110+ back issues — read & download as PDF",
        icon: "archive",
      },
      {
        href: "/racehorses",
        mn: "Адуу",
        en: "Racehorses",
        descMn: "Хурдан морьд, тэдний удам угсаа",
        descEn: "Racehorses and their bloodlines",
        icon: "racehorses",
      },
    ],
  },
  bulan[2], // Оюуны үнэт өв
  {
    href: "/shop",
    mn: "Дэлгүүр",
    en: "Shop",
    featured: {
      href: "/shop",
      mn: "Дэлгүүр",
      en: "Shop",
      image: unsplash("photo-1516673699707-4f2a243fafaf"),
    },
    children: [
      {
        href: "/shop/medicine",
        mn: "Малын эм тариа",
        en: "Veterinary medicine",
        descMn: "Адууны эм, вакцин, тарианы бүтээгдэхүүн",
        descEn: "Horse medicine, vaccines and injections",
        icon: "medicine",
      },
      {
        href: "/shop/feed",
        mn: "Тэжээл",
        en: "Feed",
        descMn: "Адуу, малын тэжээл, нэмэлт тэжээл",
        descEn: "Horse and livestock feed",
        icon: "feed",
      },
      {
        href: "/shop/products",
        mn: "Бусад бүтээгдэхүүн",
        en: "Other products",
        descMn: "Тоног хэрэгсэл болон холбогдох бараа",
        descEn: "Equipment and related goods",
        icon: "products",
      },
      {
        href: "/shop/pharmacies",
        mn: "Эмийн сангуудын хаяг, байршил",
        en: "Pharmacy directory",
        descMn: "Малын эмийн сангийн байршил, утас, газрын зураг",
        descEn: "Locations, phone numbers and map",
        icon: "pharmacies",
      },
    ],
  },
  { href: "/about", mn: "Бидний тухай", en: "About" },
  { href: "/contact", mn: "Холбоо барих", en: "Contact" },
];
