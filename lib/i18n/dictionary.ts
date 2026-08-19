/* UI-chrome strings (labels, buttons, empty states) in both languages.
   CMS content (articles, racehorses, …) is NOT here — that stays server-rendered
   in Mongolian until per-document EN fields are added later. Keep keys namespaced
   by area so it stays scannable as it grows. */

import type { Lang } from "./config";

export const DICT = {
  "lang.switchAria": { mn: "Хэл солих", en: "Switch language" },
  "lang.mn": { mn: "МОН", en: "MN" },
  "lang.en": { mn: "АНГ", en: "EN" },

  "nav.openMenu": { mn: "Цэс нээх", en: "Open menu" },
  "nav.closeMenu": { mn: "Цэс хаах", en: "Close menu" },
  "nav.homeAria": { mn: "Ухаантай Морь — нүүр хуудас", en: "Uhaantai Mori — home" },

  "soon.eyebrow": { mn: "Тун удахгүй", en: "Coming soon" },
  "soon.body": {
    mn: "Энэ хэсгийг бид бэлтгэж байна. Удахгүй нээгдэнэ.",
    en: "We're building this section. Check back soon.",
  },
  "soon.back": { mn: "Нүүр хуудас руу буцах", en: "Back to home" },
} satisfies Record<string, Record<Lang, string>>;

export type DictKey = keyof typeof DICT;
