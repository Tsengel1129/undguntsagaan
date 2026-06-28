/* ───────────────────────────────────────────────────────────────
   CONTENT & IMAGE MAPPING
   ---------------------------------------------------------------
   All body copy is realistic English PLACEHOLDER text.

   IMAGES: every image is a real, license-free photo from Unsplash
   (images.unsplash.com, free for commercial use). Each URL/ID was
   verified to return HTTP 200 before being added here.

   Heritage note: exact Mongolian хэт хутга (belt knife sets) and
   хөөрөг (snuff bottles) are rare on Unsplash, so the closest
   relevant craft / silver / antique-knife / antique-bottle imagery
   is used. Lines tagged  // TODO: replace with real Mongolian photo
   mark images a client should swap for an authentic product shot.

   To swap any image: change the photo ID in the U(...) call below,
   or replace the whole URL. Everything is keyed off these arrays.
   ─────────────────────────────────────────────────────────────── */

/** Build an Unsplash CDN URL for a given photo id. */
export const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const SITE = {
  name: "Undgun Tsagaan",
  nameMn: "Өндгөн цагаан",
  tagline:
    "Mongolia's magazine of racing bloodlines, master trainers and living heritage.",
  email: "info@undguntsagaan.mn",
  phone: "88997733",
  address: "Baga Toiruu-20, P.O.Box 349, SBD - 8 khoroo, Ulaanbaatar 14200",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/racehorses", label: "Racehorses" },
  { href: "/trainers", label: "Trainers" },
  { href: "/heritage", label: "Heritage Treasures" },
  { href: "/magazine", label: "Magazine" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* ── Shared landscape / steppe shots (hero, about, accents) ── */
export const STEPPE = {
  hero: U("photo-1535728534313-e206f59bed23", 2000),
  wide1: U("photo-1562595706-61433957484a", 2000),
  wide2: U("photo-1695554110372-fd7bc19ebcdb", 2000),
  wide3: U("photo-1695555875394-4e8aa542ccdc", 2000),
};

/* ───────────────────────── RACEHORSES ───────────────────────── */
export type Racehorse = {
  slug: string;
  name: string;
  bloodline: string;
  age: string;
  wins: number;
  region: string;
  color: string;
  summary: string;
  achievement: string;
  body: string[];
  images: string[]; // [0] = hero, rest = gallery
};

export const RACEHORSES: Racehorse[] = [
  {
    slug: "tengeriin-salhi",
    name: "Tengeriin Salhi",
    bloodline: "Borzon line",
    age: "Soyolon (5 yr)",
    wins: 14,
    region: "Töv Province",
    color: "Bay stallion",
    summary: "Naadam grand-race champion with an unmistakable closing turn of foot.",
    achievement: "National Naadam grand-race champion",
    body: [
      "Tengeriin Salhi — 'wind of the heavens' — has become one of the most talked-about horses on the summer racing circuit. Bred from the storied Borzon line, he combines a long, economical stride with a finishing kick that has decided more than one grand race in its final furlong.",
      "His connections describe a horse that races with his ears, reading the field around him and choosing his moment rather than burning energy early. That patience, rare in a young stallion, is the product of careful conditioning across two seasons on the open steppe.",
      "This profile, like all profiles in Undgun Tsagaan, is placeholder editorial copy intended to show how a finished horse feature will read. Real interviews, race records and owner notes will replace it.",
    ],
    images: [
      U("photo-1553284965-83fd3e82fa5a", 1800),
      U("photo-1516673699707-4f2a243fafaf", 1200),
      U("photo-1593353817812-a798ed84305c", 1200),
    ],
  },
  {
    slug: "altan-sumber",
    name: "Altan Sumber",
    bloodline: "Khalkh desert line",
    age: "Khyazaalan (4 yr)",
    wins: 11,
    region: "Dornogovi Province",
    color: "Golden dun",
    summary: "A provincial speed-record holder bred for the dry southern plains.",
    achievement: "Provincial speed-record holder",
    body: [
      "Altan Sumber is a product of the Khalkh desert line, horses shaped by the heat and distance of Mongolia's southern provinces. What he gives up in early acceleration he repays with a metronomic gallop that rarely falters over a long course.",
      "Trainers prize this bloodline for soundness as much as speed. Altan Sumber has raced two full seasons without a single lay-off, a record his stable attributes to traditional cooling and feeding practices.",
      "Placeholder copy — replace with verified race data and the horse's full record.",
    ],
    images: [
      U("photo-1547581849-38ba650ad0de", 1800),
      U("photo-1566068256639-2f046b164a98", 1200),
      U("photo-1526094798790-1df6f28275cc", 1200),
    ],
  },
  {
    slug: "daariin-khishig",
    name: "Daariin Khishig",
    bloodline: "Gobi wind line",
    age: "Ikh nas (6 yr)",
    wins: 19,
    region: "Dundgovi Province",
    color: "Grey mare",
    summary: "A three-time spring-race winner and the matriarch of a rising line.",
    achievement: "Three-time spring race winner",
    body: [
      "Few mares carry the authority of Daariin Khishig. A three-time spring-race winner, she has now begun a second career as a broodmare, and the first of her foals are already showing the long-barrelled frame that made her famous.",
      "Her trainer speaks of an unflappable temperament — a horse that loads, travels and races without fuss, qualities that travel down a bloodline as surely as speed.",
      "Placeholder copy for demonstration. Swap in her full progeny record when available.",
    ],
    images: [
      U("photo-1689889580395-9af8ef7e6868", 1800),
      U("photo-1649966836663-572ec8b093e8", 1200),
      U("photo-1682353213492-8433d437855a", 1200),
    ],
  },
  {
    slug: "khurdan-zeer",
    name: "Khurdan Zeer",
    bloodline: "Övörkhangai line",
    age: "Soyolon (5 yr)",
    wins: 9,
    region: "Övörkhangai Province",
    color: "Chestnut gelding",
    summary: "A national Naadam top-five finisher built for mountain endurance.",
    achievement: "National Naadam top-five finisher",
    body: [
      "Named for the swift gazelle of the steppe, Khurdan Zeer comes from the high-country Övörkhangai line, horses raised at altitude and known for deep, efficient lungs.",
      "He is at his best on demanding, undulating courses where lesser horses fade. A top-five finish at the national Naadam confirmed his class against the country's fastest.",
      "Placeholder editorial copy.",
    ],
    images: [
      U("photo-1694446942933-bc29e37df9f3", 1800),
      U("photo-1694446909080-ace9b262224a", 1200),
      U("photo-1553284965-5dd8352ff1bd", 1200),
    ],
  },
  {
    slug: "buyant-tal",
    name: "Buyant Tal",
    bloodline: "Steppe thunder line",
    age: "Shüdlen (3 yr)",
    wins: 7,
    region: "Arkhangai Province",
    color: "Black colt",
    summary: "Undefeated as a two-year-old and the most exciting prospect of his crop.",
    achievement: "Undefeated as a two-year-old",
    body: [
      "Buyant Tal arrived with a reputation and has spent his young career living up to it. Undefeated as a two-year-old, the black colt from the Steppe thunder line is the kind of horse that draws crowds to the start line.",
      "His team is deliberately patient, resisting the temptation to over-race a horse of obvious talent. The aim, they say, is the grand races of the seasons to come.",
      "Placeholder copy — replace with his developing record.",
    ],
    images: [
      U("photo-1553284965-e2815db2e5a0", 1800),
      U("photo-1553284965-83fd3e82fa5a", 1200),
      U("photo-1516673699707-4f2a243fafaf", 1200),
    ],
  },
  {
    slug: "monkh-khuleg",
    name: "Mönkh Khüleg",
    bloodline: "Eternal blue line",
    age: "Ikh nas (6 yr)",
    wins: 16,
    region: "Khövsgöl Province",
    color: "Blue roan",
    summary: "A winter ice-race champion with a fearless way of going.",
    achievement: "Winter ice-race champion",
    body: [
      "Racing across frozen rivers demands a particular courage, and Mönkh Khüleg has it in abundance. The blue roan has made the winter ice races his own, reading the surface beneath him with uncanny confidence.",
      "From the Eternal blue line, he carries the dense coat and hardy constitution that let him thrive when temperatures fall far below zero.",
      "Placeholder copy for the finished feature.",
    ],
    images: [
      U("photo-1526094798790-1df6f28275cc", 1800),
      U("photo-1547581849-38ba650ad0de", 1200),
      U("photo-1566068256639-2f046b164a98", 1200),
    ],
  },
  {
    slug: "sarny-gerel",
    name: "Sarny Gerel",
    bloodline: "Moonlight mare line",
    age: "Khyazaalan (4 yr)",
    wins: 8,
    region: "Selenge Province",
    color: "Palomino mare",
    summary: "The fastest filly of the season and a crowd favourite in the north.",
    achievement: "Fastest filly of the season",
    body: [
      "Sarny Gerel — 'moonlight' — is the standout filly of her generation in the northern provinces. Quick from the gate and brave in a finish, she has the rare ability to make a hard race look effortless.",
      "Her trainer credits an early grounding in long, slow work for the stamina that now lets her sustain her speed all the way to the line.",
      "Placeholder editorial copy.",
    ],
    images: [
      U("photo-1593353817812-a798ed84305c", 1800),
      U("photo-1689889580395-9af8ef7e6868", 1200),
      U("photo-1649966836663-572ec8b093e8", 1200),
    ],
  },
  {
    slug: "galt-khar",
    name: "Galt Khar",
    bloodline: "Black fire line",
    age: "Soyolon (5 yr)",
    wins: 12,
    region: "Khentii Province",
    color: "Black stallion",
    summary: "Two consecutive Naadam podiums and a famously fierce will to win.",
    achievement: "Two consecutive Naadam podiums",
    body: [
      "There is nothing subtle about Galt Khar. The 'black fire' stallion races at the front and dares the field to come and take it from him — a style that has earned him two consecutive Naadam podiums.",
      "Handling such a horse takes skill and nerve, and his long partnership with one rider has been central to channelling that fire into results.",
      "Placeholder copy.",
    ],
    images: [
      U("photo-1682353213492-8433d437855a", 1800),
      U("photo-1694446942933-bc29e37df9f3", 1200),
      U("photo-1553284965-5dd8352ff1bd", 1200),
    ],
  },
  {
    slug: "erdene-jonon",
    name: "Erdene Jonon",
    bloodline: "Treasure stallion line",
    age: "Ikh nas (7 yr)",
    wins: 21,
    region: "Zavkhan Province",
    color: "Liver chestnut",
    summary: "A regional endurance champion and the most decorated horse in this issue.",
    achievement: "Regional endurance champion",
    body: [
      "With twenty-one wins to his name, Erdene Jonon — 'treasure stallion' — is the most accomplished horse profiled in this issue. His speciality is endurance racing, where his even temperament and relentless rhythm wear down every rival.",
      "Now in the veteran stage of his career, he is as much a teacher as a competitor, settling younger horses simply by travelling beside them.",
      "Placeholder copy — replace with his complete honours list.",
    ],
    images: [
      U("photo-1649966836663-572ec8b093e8", 1800),
      U("photo-1593353817812-a798ed84305c", 1200),
      U("photo-1526094798790-1df6f28275cc", 1200),
    ],
  },
];

/* ───────────────────────── TRAINERS ───────────────────────── */
export type Trainer = {
  slug: string;
  name: string;
  location: string;
  years: string;
  specialty: string;
  summary: string;
  body: string[];
  images: string[];
};

export const TRAINERS: Trainer[] = [
  {
    slug: "batbayar-d",
    name: "Batbayar D.",
    location: "Töv Province",
    years: "28 years",
    specialty: "Desert-line two-year-olds",
    summary: "A third-generation уяач known for bringing young horses to the summer Naadam.",
    body: [
      "Batbayar is a third-generation horse trainer who learned the craft at his grandfather's side. His stable specialises in conditioning desert-line two-year-olds, and his calm, unhurried methods have produced a steady stream of Naadam runners.",
      "He is a believer in routine above all — the same early starts, the same long walks, the same quiet handling, repeated until a young horse trusts the work completely.",
      "Placeholder profile copy, to be replaced with a real interview.",
    ],
    images: [
      U("photo-1547700094-a0b42d320937", 1600),
      U("photo-1622797377969-cff2753dd56f", 1200),
      U("photo-1619368202270-e8c5569590f3", 1200),
    ],
  },
  {
    slug: "otgonbayar-s",
    name: "Otgonbayar S.",
    location: "Övörkhangai Province",
    years: "22 years",
    specialty: "Long-distance stamina",
    summary: "A specialist in stamina training and traditional cooling regimens.",
    body: [
      "Otgonbayar built his reputation on endurance. His training plans favour long, slow distance work over flashy speed, and his horses are famous for finishing as strongly as they start.",
      "He keeps faith with traditional cooling and feeding methods passed down in his family, adapting them only where modern nutrition clearly helps.",
      "Placeholder profile copy.",
    ],
    images: [
      U("photo-1624125278758-c0572f6ebc55", 1600),
      U("photo-1624125279186-5fb175476e80", 1200),
      U("photo-1624125278860-381b6acd3b44", 1200),
    ],
  },
  {
    slug: "ganzorig-t",
    name: "Ganzorig T.",
    location: "Dundgovi Province",
    years: "31 years",
    specialty: "Gobi wind bloodline",
    summary: "Has trained four national grand-race champions from the Gobi wind line.",
    body: [
      "Ganzorig is among the most decorated trainers of his generation, with four national grand-race champions to his name — all from the Gobi wind bloodline he has spent decades refining.",
      "He describes his role as listening more than instructing: reading each horse's day and adjusting the plan to suit it, rather than forcing the horse to suit the plan.",
      "Placeholder profile copy.",
    ],
    images: [
      U("photo-1650397306200-bae62961143f", 1600),
      U("photo-1650397306071-d3b39ae77696", 1200),
      U("photo-1687973692549-cdabe636547f", 1200),
    ],
  },
  {
    slug: "nyamsuren-b",
    name: "Nyamsüren B.",
    location: "Arkhangai Province",
    years: "19 years",
    specialty: "Young riders & ethics",
    summary: "Mentors young riders and is respected for horse-first training methods.",
    body: [
      "Nyamsüren is as known for the riders she develops as for the horses she trains. Her stable is a training ground for the next generation, where horsemanship and welfare are taught together.",
      "Her horse-first philosophy — never asking more of a horse than it is ready to give — has made her a quietly influential voice on the circuit.",
      "Placeholder profile copy.",
    ],
    images: [
      U("photo-1700356069048-7d8a8880566e", 1600),
      U("photo-1585436458496-49fe11e294f6", 1200),
      U("photo-1547700094-a0b42d320937", 1200),
    ],
  },
  {
    slug: "enkhtaivan-g",
    name: "Enkhtaivan G.",
    location: "Bayankhongor Province",
    years: "26 years",
    specialty: "Nutrition & fitness",
    summary: "Blends old herder wisdom with modern nutrition planning.",
    body: [
      "Enkhtaivan bridges two worlds. Raised in a herding family, he later studied equine nutrition, and his programme marries inherited knowledge with careful, measured science.",
      "The result is a stable of horses that arrive at the races lean, sound and ready — a consistency rivals have tried hard to copy.",
      "Placeholder profile copy.",
    ],
    images: [
      U("photo-1619368202270-e8c5569590f3", 1600),
      U("photo-1622797377969-cff2753dd56f", 1200),
      U("photo-1624125278860-381b6acd3b44", 1200),
    ],
  },
  {
    slug: "tserenpil-m",
    name: "Tserenpil M.",
    location: "Khentii Province",
    years: "34 years",
    specialty: "Temperament & distance",
    summary: "Renowned for matching a colt's temperament to the right race distance.",
    body: [
      "With thirty-four years behind him, Tserenpil has an almost intuitive feel for where a horse belongs. His gift is reading temperament early and matching each colt to the distance that suits it.",
      "Younger trainers seek his counsel, and he gives it freely, convinced that the craft only survives if it is shared.",
      "Placeholder profile copy.",
    ],
    images: [
      U("photo-1624125278860-381b6acd3b44", 1600),
      U("photo-1624125278758-c0572f6ebc55", 1200),
      U("photo-1650397306200-bae62961143f", 1200),
    ],
  },
  {
    slug: "lkhagvasuren-o",
    name: "Lkhagvasüren O.",
    location: "Selenge Province",
    years: "17 years",
    specialty: "Groundwork & trust",
    summary: "Focuses on early groundwork and trust between rider and horse.",
    body: [
      "Lkhagvasüren is part of a younger wave of trainers who put groundwork first. Weeks of patient handling on the ground, he argues, save months of trouble in the saddle.",
      "His horses are noted for their manners as much as their speed — calm to load, calm to lead, calm under pressure.",
      "Placeholder profile copy.",
    ],
    images: [
      U("photo-1687973692549-cdabe636547f", 1600),
      U("photo-1700356069048-7d8a8880566e", 1200),
      U("photo-1650397306071-d3b39ae77696", 1200),
    ],
  },
  {
    slug: "munkhbat-ch",
    name: "Munkhbat Ch.",
    location: "Sükhbaatar Province",
    years: "24 years",
    specialty: "Even-tempered geldings",
    summary: "Known across the eastern steppe for fast, even-tempered geldings.",
    body: [
      "On the eastern steppe, Munkhbat's name is shorthand for reliability. His geldings are quick, sound and famously even-tempered, the sort of horses owners keep coming back for.",
      "He works a small string by choice, preferring to know each horse intimately rather than manage a crowd.",
      "Placeholder profile copy.",
    ],
    images: [
      U("photo-1585436458496-49fe11e294f6", 1600),
      U("photo-1700356069048-7d8a8880566e", 1200),
      U("photo-1547700094-a0b42d320937", 1200),
    ],
  },
  {
    slug: "davaadorj-n",
    name: "Davaadorj N.",
    location: "Zavkhan Province",
    years: "29 years",
    specialty: "Consistency",
    summary: "A quiet master whose stable has not missed a provincial podium in a decade.",
    body: [
      "Davaadorj rarely gives interviews and almost never misses a podium. For ten straight years his small western stable has placed at the provincial races — a record built on consistency rather than spectacle.",
      "He puts it down to never cutting corners: sound horses, honest work, and the patience to wait for the right race.",
      "Placeholder profile copy.",
    ],
    images: [
      U("photo-1650397306071-d3b39ae77696", 1600),
      U("photo-1650397306200-bae62961143f", 1200),
      U("photo-1687973692549-cdabe636547f", 1200),
    ],
  },
];

/* ───────────────────────── HERITAGE TREASURES ───────────────────────── */
export type Treasure = {
  slug: string;
  name: string;
  term: string;
  category: "Belt knife set" | "Snuff bottle" | "Silverwork";
  material: string;
  summary: string;
  body: string[];
  images: string[];
};

// TODO (heritage): all images below are the closest relevant antique
// knife / silver / glass-bottle imagery available on Unsplash. Replace
// each with an authentic Mongolian хэт хутга / хөөрөг / silverwork photo.
export const TREASURES: Treasure[] = [
  {
    slug: "belt-knife-set",
    name: "Belt Knife Set",
    term: "хэт хутга",
    category: "Belt knife set",
    material: "Steel · silver · leather",
    summary: "A traditional knife-and-chopstick belt set with a hand-tooled sheath.",
    body: [
      "The хэт хутга is far more than a tool. Worn at the belt, the paired knife and chopsticks announce their owner's taste and standing, their sheaths worked in silver and tooled leather.",
      "A good set balances daily usefulness with quiet ornament — sharp, sound and beautiful in the hand.",
      "Placeholder copy. The photograph here is representative antique knife-work; replace with a real хэт хутга product shot.",
    ],
    images: [
      U("photo-1590505029169-d70a03bedfc6", 1600), // TODO: replace with real хэт хутга
      U("photo-1601300062197-f7bc039d0f27", 1200),
      U("photo-1620747917908-3d486057a679", 1200),
    ],
  },
  {
    slug: "masters-knife-set",
    name: "Master's Knife Set",
    term: "хэт хутга",
    category: "Belt knife set",
    material: "Damascened steel · silver",
    summary: "A ceremonial set with an engraved scabbard, a marker of standing and craft.",
    body: [
      "The finest sets were never meant for daily use. This master's хэт хутга, its scabbard engraved and its blade patterned, was the kind of object passed down as a marker of standing.",
      "Such pieces record a maker's whole skill in a single, small canvas.",
      "Placeholder copy — representative imagery; swap for a genuine ceremonial set.",
    ],
    images: [
      U("photo-1590505029111-371381f65018", 1600), // TODO: replace with real хэт хутга
      U("photo-1632067694875-2089c4f34526", 1200),
      U("photo-1600081521520-3ad74ab4c753", 1200),
    ],
  },
  {
    slug: "herders-knife-set",
    name: "Herder's Knife Set",
    term: "хэт хутга",
    category: "Belt knife set",
    material: "Carbon steel · bronze",
    summary: "A working belt set that balances everyday utility with quiet ornament.",
    body: [
      "Not every хэт хутга is a showpiece. The herder's set is made to work — a dependable blade, a fire-steel, and just enough bronze ornament to honour the tradition.",
      "Objects like these carry the marks of a working life, and are valued all the more for them.",
      "Placeholder copy — representative imagery.",
    ],
    images: [
      U("photo-1620747917908-3d486057a679", 1600), // TODO: replace with real хэт хутга
      U("photo-1601300062197-f7bc039d0f27", 1200),
      U("photo-1590505029169-d70a03bedfc6", 1200),
    ],
  },
  {
    slug: "carved-snuff-bottle",
    name: "Carved Snuff Bottle",
    term: "хөөрөг",
    category: "Snuff bottle",
    material: "Agate · coral stopper",
    summary: "A hand-carved хөөрөг exchanged as a gesture of respect between guests.",
    body: [
      "The хөөрөг sits at the heart of Mongolian hospitality. Offered and received with both hands, the snuff bottle opens a meeting between guest and host before a word is spoken.",
      "Carved from agate and capped with coral, a fine bottle is a small treasure carried close for a lifetime.",
      "Placeholder copy. The image is a representative antique bottle; replace with a real хөөрөг.",
    ],
    images: [
      U("photo-1631199320193-2a8fcde93786", 1600), // real snuff bottle. TODO: replace with authentic Mongolian хөөрөг
      U("photo-1680189186470-374b8679ec91", 1200),
      U("photo-1561121947-2e62aa3f4854", 1200),
    ],
  },
  {
    slug: "chalcedony-snuff-bottle",
    name: "Chalcedony Snuff Bottle",
    term: "хөөрөг",
    category: "Snuff bottle",
    material: "Chalcedony · silver",
    summary: "A translucent bottle with a silver collar and a finely fitted spoon.",
    body: [
      "Translucent chalcedony lets the light through, and the best хөөрөг makers chose their stone as carefully as any jeweller. A silver collar and a neat spoon complete the piece.",
      "Held up to the sun, a bottle like this reveals the quiet drama hidden in the stone.",
      "Placeholder copy — representative imagery; swap for a genuine хөөрөг.",
    ],
    images: [
      U("photo-1613306817574-7e31e63d4364", 1600), // real snuff bottles (museum display). TODO: replace with authentic Mongolian хөөрөг
      U("photo-1696141125149-74bd610b655a", 1200),
      U("photo-1631199320193-2a8fcde93786", 1200),
    ],
  },
  {
    slug: "silver-mounted-snuff-bottle",
    name: "Silver-Mounted Snuff Bottle",
    term: "хөөрөг",
    category: "Snuff bottle",
    material: "Silver · coral · jade",
    summary: "An heirloom bottle dressed in filigree silver, crowned with red coral.",
    body: [
      "Some bottles are family history made solid. This heirloom хөөрөг, wrapped in filigree silver and stopped with red coral, has passed through generations of a single household.",
      "Its value is measured less in materials than in the hands that have held it.",
      "Placeholder copy — representative imagery.",
    ],
    images: [
      U("photo-1561121947-2e62aa3f4854", 1600), // real snuff bottles (painted set). TODO: replace with authentic Mongolian хөөрөг
      U("photo-1680189186470-374b8679ec91", 1200),
      U("photo-1613306817574-7e31e63d4364", 1200),
    ],
  },
  {
    slug: "silver-drinking-bowl",
    name: "Silver Drinking Bowl",
    term: "мөнгөн аяга",
    category: "Silverwork",
    material: "Hallmarked silver",
    summary: "A footed bowl chased with cloud scrollwork, used to honour guests.",
    body: [
      "The silver bowl is the vessel of welcome. Filled with airag or tea and offered to an honoured guest, it turns hospitality into ceremony.",
      "Chased with cloud scrolls and endless knots, the finest bowls are heirlooms in their own right.",
      "Placeholder copy — representative silverwork imagery.",
    ],
    images: [
      U("photo-1543547298-0927e8c18ee9", 1600),
      U("photo-1687642568931-78e6d774e606", 1200),
      U("photo-1680994330269-993e90deeca3", 1200),
    ],
  },
  {
    slug: "saddle-silver-ornament",
    name: "Saddle Silver Ornament",
    term: "эмээлийн мөнгө",
    category: "Silverwork",
    material: "Silver on hardwood",
    summary: "Repoussé silver saddle plates depicting soyombo and endless-knot motifs.",
    body: [
      "A rider's saddle was a statement, and its silver plates carried meaning as well as beauty — the soyombo, the endless knot, motifs of protection and continuity.",
      "Worked in repoussé over hardwood, these ornaments turned everyday equipment into heritage.",
      "Placeholder copy — representative silverwork imagery.",
    ],
    images: [
      U("photo-1719214364761-6d85085f0d21", 1600),
      U("photo-1771248371012-bae0bd808efb", 1200),
      U("photo-1687818796578-3cc02821f70f", 1200),
    ],
  },
  {
    slug: "fire-steel-pouch",
    name: "Fire Steel Pouch",
    term: "хэтэвч",
    category: "Silverwork",
    material: "Leather · silver · steel",
    summary: "A belt pouch and fire-steel set with embossed silver mounts.",
    body: [
      "Before matches, fire travelled on the belt. The хэтэвч — a leather pouch fitted with a steel striker and embossed silver mounts — was both a necessity and a point of pride.",
      "Today these pieces are prized by collectors for the craft compressed into their small frames.",
      "Placeholder copy — representative imagery.",
    ],
    images: [
      U("photo-1687818796151-9b855657b7e3", 1600),
      U("photo-1771249729624-3c7dea2f7953", 1200),
      U("photo-1771249888196-b33eee20685f", 1200),
    ],
  },
];

/* ───────────────────────── MAGAZINE ───────────────────────── */
export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  lead: string; // hero image
  body: string[]; // paragraphs
  pullQuote: string;
  inlineImages: string[]; // woven into the article (>= 2, + lead = 3+ total)
};

export const ARTICLES: Article[] = [
  {
    slug: "bloodlines-behind-naadam-champions",
    title: "The Bloodlines Behind This Year's Naadam Champions",
    category: "Bloodlines",
    date: "June 2026",
    author: "By the Undgun Tsagaan editorial team",
    readTime: "8 min read",
    excerpt:
      "We trace the udam of the fastest horses on the steppe and the families who kept those lines alive.",
    lead: STEPPE.wide1,
    pullQuote:
      "A bloodline is not a record on paper. It is a promise kept across generations of herders.",
    body: [
      "Every summer, the grand races of Naadam crown new champions — and behind almost all of them lies a bloodline tended, sometimes for a century, by a single extended family. To understand the winners is to understand the udam, the inherited line that carries speed, soundness and temperament from one generation to the next.",
      "This season's results read like a family tree. The Borzon line produced another grand-race winner; the Gobi wind line placed three runners in the frame; and a young mare from the Moonlight line announced herself as a name to watch. None of this is accident. It is the visible result of decisions made by breeders long before these horses were born.",
      "Talk to the herders who keep these lines and a pattern emerges. They speak less about speed than about constitution — the ability to train hard, recover quickly and stay sound across many seasons. Speed, they say, is common. A horse that stays fast for years is rare, and that is what a good bloodline protects.",
      "There is a quieter story here too, about knowledge passed down alongside the horses. The feeding, the cooling, the reading of a horse's mood on a given morning — these travel through families as surely as any pedigree, and they are just as much a part of the udam.",
      "As the dust settles on another Naadam, the champions will rest and the breeders will already be looking ahead, matching mares and stallions for foals that will not race for years. It is the long game that has always defined the Mongolian horse — and the reason these bloodlines still run at the front.",
    ],
    inlineImages: [
      U("photo-1553284965-83fd3e82fa5a", 1600),
      U("photo-1593353817812-a798ed84305c", 1200),
      U("photo-1689889580395-9af8ef7e6868", 1200),
    ],
  },
  {
    slug: "day-in-the-life-master-trainer",
    title: "A Day in the Life of a Master Trainer",
    category: "Trainers",
    date: "May 2026",
    author: "By the Undgun Tsagaan editorial team",
    readTime: "7 min read",
    excerpt:
      "From before dawn to last light, inside the patient daily craft of conditioning a champion.",
    lead: U("photo-1547700094-a0b42d320937", 2000),
    pullQuote:
      "You cannot hurry a horse into form. You can only give it the same honest day, again and again.",
    body: [
      "The уяач is awake before the horses. In the grey hour before sunrise, when the steppe is still cold and quiet, the day's work has already begun — water checked, feed measured, the string brought in from the night's grazing.",
      "What follows looks, to an outsider, almost uneventful. Long walks. Slow, steady canters. A careful eye on how each horse moves, eats and stands. But this unhurried rhythm is the whole secret. Form is built in months of repetition, not in a single hard gallop.",
      "By mid-morning the trainer is reading the small signs that decide the plan: a shortened stride, a reluctance to take the bit, an ear held at an odd angle. A good уяач adjusts the day to the horse, not the horse to the day, and that flexibility is the difference between a sound runner and a broken one.",
      "Afternoons belong to the young horses and, often, to the young riders learning beside them. Here the craft is handed on — how to sit, how to feel, how to wait. The best stables are also schools, and the knowledge that leaves them is as valuable as the horses.",
      "At last light the string goes back out to graze, and the trainer walks the line one final time. Tomorrow will look almost exactly the same. That, in the end, is the point.",
    ],
    inlineImages: [
      U("photo-1622797377969-cff2753dd56f", 1600),
      U("photo-1619368202270-e8c5569590f3", 1200),
      U("photo-1624125278758-c0572f6ebc55", 1200),
    ],
  },
  {
    slug: "reading-a-snuff-bottle",
    title: "Reading a Snuff Bottle: A Collector's Guide",
    category: "Heritage",
    date: "May 2026",
    author: "By the Undgun Tsagaan editorial team",
    readTime: "6 min read",
    excerpt:
      "What stone, stopper and silverwork reveal about the age and story of a хөөрөг.",
    lead: U("photo-1680189186470-374b8679ec91", 2000),
    pullQuote:
      "Hold a bottle to the light and it will tell you almost everything — if you know how to look.",
    body: [
      "To the casual eye, one snuff bottle looks much like another. To a collector, each хөөрөг is a small document — a record of stone, craft and ownership that can be read with patience and a good light.",
      "Begin with the material. Agate, chalcedony and jade each behave differently in the hand and against the sun, and the choice of stone hints at both the period and the means of the original owner. Translucence, colour and the way an inclusion is framed within the carving all carry meaning.",
      "Next, the fittings. The collar and stopper — often silver, sometimes crowned with coral — reveal the hand of the metalworker and, frequently, the region. Wear matters too: an heirloom bottle shows the soft polish of generations of handling, impossible to fake convincingly.",
      "Finally, consider the bottle as an object of etiquette. The хөөрөг is exchanged, not merely owned, and the finest examples were made to be offered with both hands in a gesture of respect. A collector who forgets this misses half the story.",
      "Start, as ever, by handling as many bottles as you can. The eye is trained by comparison, and there is no substitute for the weight and cool of real stone in the palm.",
    ],
    inlineImages: [
      U("photo-1631199320193-2a8fcde93786", 1600),
      U("photo-1613306817574-7e31e63d4364", 1200),
      U("photo-1561121947-2e62aa3f4854", 1200),
    ],
  },
  {
    slug: "quiet-art-of-the-belt-knife",
    title: "The Quiet Art of the Belt Knife",
    category: "Craft",
    date: "April 2026",
    author: "By the Undgun Tsagaan editorial team",
    readTime: "6 min read",
    excerpt:
      "How хэт хутга makers balance everyday use with centuries of ornamental tradition.",
    lead: U("photo-1590505029169-d70a03bedfc6", 2000),
    pullQuote:
      "The test of a belt knife is simple: it must serve, and it must be worth keeping.",
    body: [
      "A belt knife is the most personal of heritage objects. Worn every day, the хэт хутга must first of all work — but it is also a canvas, and generations of makers have used it to show the full range of their craft.",
      "The balance is delicate. Too plain, and the set is merely a tool; too ornate, and it becomes a thing to be put away and admired rather than used. The finest хэт хутга live exactly on that line: sharp, sound and beautiful, made to be carried.",
      "Materials tell their own story. A working set in carbon steel and bronze speaks of the herder's life; a ceremonial set in patterned steel and engraved silver speaks of standing and occasion. Both are honest expressions of the same tradition.",
      "What unites them is the maker's discipline — the refusal to let decoration compromise function. In a хэт хутга, beauty and use are not opposites. They are the same goal, reached together.",
      "Collectors prize the sets that show this restraint, and so, quietly, do the people who carry them.",
    ],
    inlineImages: [
      U("photo-1601300062197-f7bc039d0f27", 1600),
      U("photo-1620747917908-3d486057a679", 1200),
      U("photo-1632067694875-2089c4f34526", 1200),
    ],
  },
  {
    slug: "training-the-two-year-old",
    title: "Training the Two-Year-Old: First Season on the Steppe",
    category: "Trainers",
    date: "April 2026",
    author: "By the Undgun Tsagaan editorial team",
    readTime: "7 min read",
    excerpt:
      "The careful first year that decides whether a young horse becomes a racer.",
    lead: STEPPE.wide2,
    pullQuote:
      "The first season does not make a champion. But it can quietly unmake one.",
    body: [
      "A horse's first season under saddle is the most important — and the most easily mishandled — of its life. Get it right and a young horse arrives at three sound in body and willing in mind. Get it wrong and the damage can last a career.",
      "The work begins on the ground, long before any racing. Weeks of handling teach a colt to trust the people around it: to lead, to load, to stand quietly. Trainers who skip this stage almost always pay for it later.",
      "From there the building is slow. Short, steady work lengthens gradually as the horse grows stronger, with constant attention to soundness. The temptation to test a promising youngster against the clock is strong, and resisting it is part of the craft.",
      "Temperament reveals itself in this first year too. A patient уяач watches for the distance and style that suit each horse, rather than forcing every colt into the same mould. The aim is not a fast two-year-old but a sound, willing three-year-old ready for the races that matter.",
      "By season's end, the best young horses have learned the most important lesson of all: that the work is fair, and that it can be trusted. Everything after is built on that.",
    ],
    inlineImages: [
      U("photo-1553284965-e2815db2e5a0", 1600),
      U("photo-1650397306200-bae62961143f", 1200),
      U("photo-1526094798790-1df6f28275cc", 1200),
    ],
  },
  {
    slug: "silver-coral-and-status",
    title: "Silver, Coral and Status on the Open Plain",
    category: "Heritage",
    date: "March 2026",
    author: "By the Undgun Tsagaan editorial team",
    readTime: "6 min read",
    excerpt:
      "A look at the heritage silverwork that has signalled standing for generations.",
    lead: U("photo-1543547298-0927e8c18ee9", 2000),
    pullQuote:
      "On the open plain, silver was a language — and everyone knew how to read it.",
    body: [
      "Long before any written record, status on the steppe was worn. Silver bowls, saddle ornaments, belt fittings and coral-stopped bottles announced a family's standing to anyone who knew the codes — and on the open plain, everyone did.",
      "The materials themselves carried meaning. Silver spoke of permanence and worth; coral, traded across long distances, of reach and connection. Together they turned everyday objects into quiet statements of place in the world.",
      "The craft was correspondingly serious. Repoussé, chasing and filigree demanded years of training, and the best silversmiths were figures of real local importance. Their motifs — the endless knot, the soyombo, scrolling clouds — were a shared visual language of protection and continuity.",
      "Much of this work survives as heirlooms, handed down and still treasured. To hold a chased silver bowl is to hold a piece of a system of meaning that organised steppe society for centuries.",
      "Today collectors and families alike guard these pieces — not only for their beauty, but because they still say, clearly, where a person comes from.",
    ],
    inlineImages: [
      U("photo-1687642568931-78e6d774e606", 1600),
      U("photo-1719214364761-6d85085f0d21", 1200),
      U("photo-1680994330269-993e90deeca3", 1200),
    ],
  },
];

/* ── Lookup helpers used by detail pages ── */
export const getRacehorse = (slug: string) =>
  RACEHORSES.find((h) => h.slug === slug);
export const getTrainer = (slug: string) =>
  TRAINERS.find((t) => t.slug === slug);
export const getTreasure = (slug: string) =>
  TREASURES.find((t) => t.slug === slug);
export const getArticle = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);

/** Other articles for a "Related articles" strip. */
export const relatedArticles = (slug: string, count = 3) =>
  ARTICLES.filter((a) => a.slug !== slug).slice(0, count);
