/* Layout chrome (not CMS content) — the nav tree stays static so the Header
   (a client component) never imports the runtime content layer.

   Every label carries both languages (mn = primary, en = toggle). Phase 2's
   language switch reads `mn`/`en` off these same nodes, so the tree needs no
   rework when the toggle lands. Items may nest one level inside a dropdown
   (e.g. Сэтгүүл → Чөлөөт булан → its three columns). */

export type NavItem = {
  /** Optional so a pure grouping header can exist without its own page. */
  href?: string;
  mn: string;
  en: string;
  /** Optional one-line blurb shown under the label in dropdown menus. */
  descMn?: string;
  descEn?: string;
  children?: NavItem[];
};

export const NAV: NavItem[] = [
  { href: "/", mn: "Эхлэл", en: "Home" },
  { href: "/racehorses", mn: "Адуу", en: "Racehorses" },
  { href: "/trainers", mn: "Уяач", en: "Trainers" },
  { href: "/heritage", mn: "Өв соёл", en: "Heritage" },
  {
    href: "/magazine",
    mn: "Сэтгүүл",
    en: "Magazine",
    children: [
      {
        href: "/magazine/issue",
        mn: "Шинэ дугаар",
        en: "Current issue",
        descMn: "Хамгийн сүүлийн дугаарыг цахимаар эргүүлж унших",
        descEn: "Flip through the latest issue online",
      },
      {
        href: "/magazine/archive",
        mn: "Архив",
        en: "Archive",
        descMn: "110+ өнгөрсөн дугаар — PDF унших, татах",
        descEn: "110+ back issues — read & download as PDF",
      },
      {
        href: "/column",
        mn: "Чөлөөт булан",
        en: "Free column",
        descMn: "Уншигчдын бодол, ярилцлага, өгүүллүүд",
        descEn: "Readers' thoughts, talks and essays",
        children: [
          {
            href: "/column/open-talk",
            mn: "Нээлттэй яриа",
            en: "Open talk",
            descMn: "Задгай, чин сэтгэлийн ярилцлагууд",
            descEn: "Candid, open-hearted conversations",
          },
          {
            href: "/column/perspectives",
            mn: "Олон өнцөг",
            en: "Perspectives",
            descMn: "Нэг сэдвийг олон талаас нь харах",
            descEn: "One subject seen from many angles",
          },
          {
            href: "/column/youth",
            mn: "Залуусын дуу хоолой",
            en: "Youth voices",
            descMn: "Залуу үеийнхний бичвэр, санаа",
            descEn: "Writing and ideas from the next generation",
          },
        ],
      },
    ],
  },
  {
    href: "/shop",
    mn: "Дэлгүүр",
    en: "Shop",
    children: [
      { href: "/shop/medicine", mn: "Эрүүл мэнд & Эм тариа", en: "Health & medicine" },
      { href: "/shop/products", mn: "Бусад бүтээгдэхүүн", en: "Other products" },
      { href: "/shop/pharmacies", mn: "Малын эмийн сангууд", en: "Veterinary pharmacies" },
    ],
  },
  { href: "/about", mn: "Бидний тухай", en: "About" },
  { href: "/contact", mn: "Холбоо барих", en: "Contact" },
];
