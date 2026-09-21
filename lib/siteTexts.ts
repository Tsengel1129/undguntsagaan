/* Editable site chrome texts (headers, buttons, section headings) + the
   homepage hero image. Values live in Firestore `siteSettings/texts`;
   anything unset falls back to these defaults (Mongolian, the site's
   primary language), so a fresh project renders correctly with no seed step.
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
    title: "Нүүр хуудас — дээд хэсэг",
    fields: [
      { key: "homeHeroImage", label: "Нүүрний том зураг", image: true },
      { key: "homeHeroEyebrow", label: "Жижиг гарчиг" },
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
      { key: "homeExploreEyebrow", label: "«Танилцах» хэсгийн жижиг гарчиг" },
      { key: "homeExploreHeading", label: "«Танилцах» хэсгийн том гарчиг" },
      { key: "homeTileRacehorses", label: "Морьдын хавтангийн тайлбар", multiline: true },
      { key: "homeTileTrainers", label: "Уяачдын хавтангийн тайлбар", multiline: true },
      { key: "homeTileHeritage", label: "Өв соёлын хавтангийн тайлбар", multiline: true },
      { key: "homeTileMagazine", label: "Сэтгүүлийн хавтангийн тайлбар", multiline: true },
      { key: "homeHorseOfIssue", label: "«Дугаарын морь» шошго" },
      { key: "homeLatestEyebrow", label: "Сүүлийн нийтлэл — жижиг гарчиг" },
      { key: "homeLatestHeading", label: "Сүүлийн нийтлэл — том гарчиг" },
      { key: "homeLatestAll", label: "«Бүх нийтлэл» холбоосны бичиг" },
      { key: "homeCtaBandHeading", label: "Доод улаан хэсгийн гарчиг", multiline: true },
      { key: "homeCtaBandButton", label: "Доод улаан хэсгийн товч" },
    ],
  },
  {
    title: "Адуу — хуудасны толгой",
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
    title: "Өв соёл — хуудасны толгой",
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
    title: "Бидний тухай",
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
    title: "Холбоо барих",
    fields: [
      { key: "ctEyebrow", label: "Жижиг гарчиг" },
      { key: "ctTitle", label: "Гарчиг" },
      { key: "ctIntro", label: "Танилцуулга", multiline: true },
    ],
  },
];

export const DEFAULT_TEXTS: Record<string, string> = {
  homeHeroImage: "/images/hero.jpg",
  homeHeroEyebrow: "Ухаантай Морь · Морин өвийн сэтгүүл",
  homeHeroTitle: "Ухаантай Морь",
  homeCtaPrimary: "Сэтгүүл унших",
  homeCtaSecondary: "Морьдтой танилцах",
  homeIntroHeading:
    "Монгол тал нутгийн морь, уяач, өв уламжлалд зориулсан сэтгүүл.",
  homeStatsHorses: "Онцлох морьд",
  homeStatsTrainers: "Нэрт уяачид",
  homeStatsArticles: "Сэтгүүлийн нийтлэл",
  homeExploreEyebrow: "Танилцах",
  homeExploreHeading: "Ухаантай Морийн ертөнц рүү нэвтрэх дөрвөн зам",
  homeTileRacehorses:
    "Хурдан морьд болон энэ улирлын түрүү аваргуудыг төрүүлсэн удам угсаа.",
  homeTileTrainers:
    "Унага, даагыг өдөр тутмын тэвчээртэй хөдөлмөрөөрөө түрүү болгодог нэрт уяачид.",
  homeTileHeritage:
    "Хэт хутга, сийлбэртэй хөөрөг болон тал нутгийн мөнгөн урлал.",
  homeTileMagazine:
    "Удам угсаа, уяач, цуглуулагч, урлалын тухай өргөн дэлгэрэнгүй нийтлэлүүд.",
  homeHorseOfIssue: "Дугаарын морь",
  homeLatestEyebrow: "Сэтгүүлээс",
  homeLatestHeading: "Сүүлийн нийтлэлүүд",
  homeLatestAll: "Бүх нийтлэл →",
  homeCtaBandHeading: "Онцлууштай морь, уяач эсвэл өв эрдэнэс байна уу?",
  homeCtaBandButton: "Холбогдох →",
  rhEyebrow: "Адуу",
  rhTitle: "Тал нутгийн хамгийн хурдан удам угсаа",
  rhIntro:
    "Удам угсаа, хурд, наадам болон аймгийн уралдааны амжилтаараа алдаршсан хурдан морьдын түүвэр.",
  trEyebrow: "Уяач",
  trTitle: "Түрүү морьдын ард буй нэрт уяачид",
  trIntro:
    "Тэвчээр, зөн совин, олон арван жилийн туршлагаараа Монголын хурдан морьдыг сойж бэлтгэдэг уяачид.",
  hgEyebrow: "Өв соёл",
  hgTitle: "Монгол тал нутгийн амьд өв эрдэнэс",
  hgIntro:
    "Уралдааны талбайгаас гадна Монголын өв соёл нам гүм тансаг эдлэлд амьдарна — хэт хутга, сийлбэртэй хөөрөг, үеэс үед уламжлагдсан мөнгөн урлал бүр олон үеийн ур чадвар, утга учрыг тээж явдаг.",
  mgEyebrow: "Сэтгүүл",
  mgTitle: "Тал нутгийн түүхүүд",
  mgIntro:
    "Хурдан морины удам угсаа, нэрт уяач, өв соёлын урлал болон эдгээр уламжлалыг амьд авч явагч хүмүүсийн тухай өргөн дэлгэрэнгүй нийтлэлүүд.",
  abEyebrow: "Бидний тухай",
  abTitle: "Монголын морь, өв соёлын сэтгүүл",
  abIntro:
    "«Ухаантай Морь» сэтгүүл Монгол тал нутгийн хурдан морь, нэрт уяач, амьд өв уламжлалыг алдаршуулна.",
  abImage:
    "https://images.unsplash.com/photo-1695555875394-4e8aa542ccdc?auto=format&fit=crop&w=2000&q=80",
  abBody1:
    "Морь бол олон үеийн турш монгол хүний амьдралын төв байсаар ирсэн — бахархал, амьжиргаа, өөрийн байдлын эх сурвалж. «Ухаантай Морь» тэрхүү ертөнцийг зохих хүндэтгэл, анхаарлаар баримтжуулахын тулд бий болсон: аварга төрүүлдэг удам угсаа, тэднийг сойж бэлтгэдэг уяачид, морин соёлыг хүрээлсэн өв эрдэнэсийн эдлэлүүд.",
  abBody2:
    "Дугаар бүртээ бид хурдан морьд болон тэдний хурдны ард буй удам угсааг танилцуулж, тэднийг уядаг уяачидтай ярилцаж, хэт хутга, сийлбэртэй хөөрөг, уламжлалт мөнгөн урлалын ур чадварыг нягтлан хардаг. Бидний зорилго бол эдгээр уламжлалыг үнэнчээр тэмдэглэн, Монголын болон дэлхийн уншигчидтай хуваалцах явдал юм.",
  abBody3:
    "Өв соёл бол шилэн хайрцагт хадгалагддаг зүйл биш гэдэгт бид итгэдэг. Түүнийг тал нутгаар унаж, бүсэндээ зүүж, үеэс үед уламжлуулдаг. «Ухаантай Морь» бол тэрхүү амьд уламжлалыг ил тод харагдуулахад оруулж буй бидний хувь нэмэр.",
  abMissionText:
    "Монгол морины өв — удам угсаа, уяач, эрдэнэсийг нь — дэлхийн уншигчдад алдаршуулж, хадгалан хамгаалах.",
  ctEyebrow: "Холбоо барих",
  ctTitle: "Бидэнтэй холбогдоорой",
  ctIntro:
    "Хуваалцах морь, уяач, өв эрдэнэс байна уу, эсвэл сэтгүүлийн талаар асуух зүйл байна уу? Бид таны саналыг хүлээн авахад баяртай байх болно.",
};

export const TEXT_KEYS = Object.keys(DEFAULT_TEXTS);
