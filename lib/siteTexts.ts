/* Editable site chrome texts (headers, buttons, section headings) + the
   homepage hero image. Values live in Firestore `siteSettings/texts`;
   anything unset falls back to these defaults (= the site's original copy),
   so a fresh project renders identically with no seed step.
   Client-safe: no server imports. */

export type TextField = {
  key: string;
  label: string; // Mongolian admin label
  multiline?: boolean;
  image?: boolean; // rendered as an image row (URL + upload)
};

export type TextGroup = { title: string; fields: TextField[] };

export const TEXT_GROUPS: TextGroup[] = [
  {
    title: "Нүүр хуудас — дээд хэсэг (hero)",
    fields: [
      { key: "homeHeroImage", label: "Нүүрний том зураг", image: true },
      { key: "homeHeroEyebrow", label: "Жижиг гарчиг (eyebrow)" },
      { key: "homeHeroTitle", label: "Том гарчиг" },
      { key: "homeCtaPrimary", label: "Улаан товчны бичиг" },
      { key: "homeCtaSecondary", label: "Хүрээтэй товчны бичиг" },
    ],
  },
  {
    title: "Нүүр хуудас — хэсгүүд",
    fields: [
      { key: "homeIntroHeading", label: "Танилцуулга өгүүлбэр", multiline: true },
      { key: "homeStatsHorses", label: "Статистик: морьдын шошго" },
      { key: "homeStatsTrainers", label: "Статистик: уяачдын шошго" },
      { key: "homeStatsArticles", label: "Статистик: нийтлэлийн шошго" },
      { key: "homeExploreEyebrow", label: "«Explore» жижиг гарчиг" },
      { key: "homeExploreHeading", label: "«Explore» том гарчиг" },
      { key: "homeTileRacehorses", label: "Морьдын хавтангийн тайлбар", multiline: true },
      { key: "homeTileTrainers", label: "Уяачдын хавтангийн тайлбар", multiline: true },
      { key: "homeTileHeritage", label: "Өв соёлын хавтангийн тайлбар", multiline: true },
      { key: "homeTileMagazine", label: "Сэтгүүлийн хавтангийн тайлбар", multiline: true },
      { key: "homeHorseOfIssue", label: "«Horse of the issue» шошго" },
      { key: "homeLatestEyebrow", label: "Сүүлийн нийтлэл — жижиг гарчиг" },
      { key: "homeLatestHeading", label: "Сүүлийн нийтлэл — том гарчиг" },
      { key: "homeLatestAll", label: "«Бүх нийтлэл» холбоосны бичиг" },
      { key: "homeCtaBandHeading", label: "Доод улаан хэсгийн гарчиг", multiline: true },
      { key: "homeCtaBandButton", label: "Доод улаан хэсгийн товч" },
    ],
  },
  {
    title: "Хурдан морьд — хуудасны толгой",
    fields: [
      { key: "rhEyebrow", label: "Жижиг гарчиг" },
      { key: "rhTitle", label: "Гарчиг" },
      { key: "rhIntro", label: "Танилцуулга", multiline: true },
    ],
  },
  {
    title: "Уяачид — хуудасны толгой",
    fields: [
      { key: "trEyebrow", label: "Жижиг гарчиг" },
      { key: "trTitle", label: "Гарчиг" },
      { key: "trIntro", label: "Танилцуулга", multiline: true },
    ],
  },
  {
    title: "Өв соёлын эрдэнэс — хуудасны толгой",
    fields: [
      { key: "hgEyebrow", label: "Жижиг гарчиг" },
      { key: "hgTitle", label: "Гарчиг" },
      { key: "hgIntro", label: "Танилцуулга", multiline: true },
    ],
  },
  {
    title: "Сэтгүүл — хуудасны толгой",
    fields: [
      { key: "mgEyebrow", label: "Жижиг гарчиг" },
      { key: "mgTitle", label: "Гарчиг" },
      { key: "mgIntro", label: "Танилцуулга", multiline: true },
    ],
  },
  {
    title: "Бидний тухай (About)",
    fields: [
      { key: "abEyebrow", label: "Жижиг гарчиг" },
      { key: "abTitle", label: "Гарчиг" },
      { key: "abIntro", label: "Танилцуулга", multiline: true },
      { key: "abImage", label: "Том зураг", image: true },
      { key: "abBody1", label: "1-р догол мөр", multiline: true },
      { key: "abBody2", label: "2-р догол мөр", multiline: true },
      { key: "abBody3", label: "3-р догол мөр", multiline: true },
      { key: "abMissionText", label: "Эрхэм зорилгын текст", multiline: true },
    ],
  },
  {
    title: "Холбоо барих (Contact)",
    fields: [
      { key: "ctEyebrow", label: "Жижиг гарчиг" },
      { key: "ctTitle", label: "Гарчиг" },
      { key: "ctIntro", label: "Танилцуулга", multiline: true },
    ],
  },
];

export const DEFAULT_TEXTS: Record<string, string> = {
  homeHeroImage: "/images/hero.jpg",
  homeHeroEyebrow: "Өндгөн цагаан · Mongolian Horse Heritage",
  homeHeroTitle: "Undgun Tsagaan",
  homeCtaPrimary: "Read the Magazine",
  homeCtaSecondary: "Meet the Horses",
  homeIntroHeading:
    "A magazine devoted to the horse, the trainer and the heritage of the Mongolian steppe.",
  homeStatsHorses: "Featured horses",
  homeStatsTrainers: "Master trainers",
  homeStatsArticles: "Magazine features",
  homeExploreEyebrow: "Explore",
  homeExploreHeading: "Four ways into the world of Undgun Tsagaan",
  homeTileRacehorses:
    "Fast-bloodline horses and the udam that produced this season's champions.",
  homeTileTrainers:
    "The master trainers whose patient daily craft turns colts into champions.",
  homeTileHeritage:
    "Belt knife sets, carved snuff bottles and the silverwork of the steppe.",
  homeTileMagazine:
    "Long-form stories on bloodlines, trainers, collectors and craft.",
  homeHorseOfIssue: "Horse of the issue",
  homeLatestEyebrow: "From the magazine",
  homeLatestHeading: "Latest stories",
  homeLatestAll: "All articles →",
  homeCtaBandHeading: "Have a horse, a trainer or a treasure worth featuring?",
  homeCtaBandButton: "Get in touch →",
  rhEyebrow: "Racehorses",
  rhTitle: "The fastest bloodlines on the steppe",
  rhIntro:
    "A selection of racing horses celebrated for their bloodline (udam), their speed and their record across Naadam and provincial races.",
  trEyebrow: "Trainers",
  trTitle: "The masters behind the champions",
  trIntro:
    "The trainers (уяачид) whose patience, instinct and decades of experience shape the racing horses of Mongolia.",
  hgEyebrow: "Heritage Treasures",
  hgTitle: "Living treasures of the Mongolian steppe",
  hgIntro:
    "Beyond the racetrack, Mongolia's heritage lives in objects of quiet luxury — belt knife sets (хэт хутга), carved snuff bottles (хөөрөг) and heirloom silverwork, each carrying generations of craft and meaning.",
  mgEyebrow: "Magazine",
  mgTitle: "Stories from the steppe",
  mgIntro:
    "Long-form articles on racing bloodlines, master trainers, heritage craft and the people who keep these traditions alive.",
  abEyebrow: "About",
  abTitle: "Mongolia's magazine of horse and heritage",
  abIntro:
    "Undgun Tsagaan (Өндгөн цагаан) celebrates the racing horse, the master trainer and the living heritage of the Mongolian steppe.",
  abImage:
    "https://images.unsplash.com/photo-1695555875394-4e8aa542ccdc?auto=format&fit=crop&w=2000&q=80",
  abBody1:
    "For generations, the horse has stood at the centre of Mongolian life — a source of pride, livelihood and identity. Undgun Tsagaan exists to document that world with the care it deserves: the bloodlines that produce champions, the trainers who shape them, and the heritage objects that surround the culture of the horse.",
  abBody2:
    "In each issue we profile racing horses and the udam behind their speed, sit down with the уяач who train them, and look closely at the craft of хэт хутга knife sets, carved хөөрөг snuff bottles and heirloom silverwork. Our aim is to record these traditions honestly and to share them with readers in Mongolia and far beyond.",
  abBody3:
    "We believe heritage is not something kept behind glass. It is ridden across the steppe, carried on the belt and passed between generations. Undgun Tsagaan is our contribution to keeping that living tradition visible.",
  abMissionText:
    "To celebrate and preserve the heritage of the Mongolian horse — its bloodlines, its trainers and its treasures — for a global audience.",
  ctEyebrow: "Contact",
  ctTitle: "Get in touch",
  ctIntro:
    "Have a horse, a trainer or a heritage treasure to share — or a question about the magazine? We would love to hear from you.",
};

export const TEXT_KEYS = Object.keys(DEFAULT_TEXTS);
