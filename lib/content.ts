/* ───────────────────────────────────────────────────────────────
   PLACEHOLDER CONTENT
   All copy below is realistic English placeholder text and all image
   paths point at labelled placeholder files in /public/images.
   Swap the copy and drop real Mongolian photos over the image files
   (see README.md → "Image map") when real content is ready.
   ─────────────────────────────────────────────────────────────── */

export const SITE = {
  name: "Undgun Tsagaan",
  nameMn: "Өндгөн цагаан",
  tagline: "Mongolia's magazine of racing bloodlines, master trainers and living heritage.",
  email: "info@undguntsagaan.mn",
  phone: "88997733",
  address:
    "Baga Toiruu-20, P.O.Box 349, SBD - 8 khoroo, Ulaanbaatar 14200",
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

export type Racehorse = {
  name: string;
  image: string;
  bloodline: string;
  achievement: string;
  age: string;
  wins: number;
};

export const RACEHORSES: Racehorse[] = [
  { name: "Tengeriin Salhi", image: "/images/racehorse-1.jpg", bloodline: "Borzon line", achievement: "Naadam grand-race champion", age: "Soyolon (5 yr)", wins: 14 },
  { name: "Altan Sumber", image: "/images/racehorse-2.jpg", bloodline: "Khalkh desert line", achievement: "Provincial speed record holder", age: "Khyazaalan (4 yr)", wins: 11 },
  { name: "Daariin Khishig", image: "/images/racehorse-3.jpg", bloodline: "Gobi wind line", achievement: "Three-time spring race winner", age: "Ikh nas (6 yr)", wins: 19 },
  { name: "Khurdan Zeer", image: "/images/racehorse-4.jpg", bloodline: "Övörkhangai line", achievement: "National Naadam top-five finisher", age: "Soyolon (5 yr)", wins: 9 },
  { name: "Buyant Tal", image: "/images/racehorse-5.jpg", bloodline: "Steppe thunder line", achievement: "Undefeated as a two-year-old", age: "Shüdlen (3 yr)", wins: 7 },
  { name: "Mönkh Khüleg", image: "/images/racehorse-6.jpg", bloodline: "Eternal blue line", achievement: "Winter ice-race champion", age: "Ikh nas (6 yr)", wins: 16 },
  { name: "Sarny Gerel", image: "/images/racehorse-7.jpg", bloodline: "Moonlight mare line", achievement: "Fastest filly of the season", age: "Khyazaalan (4 yr)", wins: 8 },
  { name: "Galt Khar", image: "/images/racehorse-8.jpg", bloodline: "Black fire line", achievement: "Two consecutive Naadam podiums", age: "Soyolon (5 yr)", wins: 12 },
  { name: "Erdene Jonon", image: "/images/racehorse-9.jpg", bloodline: "Treasure stallion line", achievement: "Regional endurance champion", age: "Ikh nas (7 yr)", wins: 21 },
];

export type Trainer = {
  name: string;
  image: string;
  location: string;
  bio: string;
  years: string;
};

export const TRAINERS: Trainer[] = [
  { name: "Batbayar D.", image: "/images/trainer-1.jpg", location: "Töv Province", bio: "Third-generation уяач known for conditioning desert-line two-year-olds for the summer Naadam.", years: "28 years" },
  { name: "Otgonbayar S.", image: "/images/trainer-2.jpg", location: "Övörkhangai Province", bio: "Specialist in long-distance stamina training and traditional cooling regimens.", years: "22 years" },
  { name: "Ganzorig T.", image: "/images/trainer-3.jpg", location: "Dundgovi Province", bio: "Has trained four national grand-race champions from the Gobi wind bloodline.", years: "31 years" },
  { name: "Nyamsüren B.", image: "/images/trainer-4.jpg", location: "Arkhangai Province", bio: "Mentors young riders and is respected for ethical, horse-first training methods.", years: "19 years" },
  { name: "Enkhtaivan G.", image: "/images/trainer-5.jpg", location: "Bayankhongor Province", bio: "Blends old herder wisdom with modern nutrition planning for racing fitness.", years: "26 years" },
  { name: "Tserenpil M.", image: "/images/trainer-6.jpg", location: "Khentii Province", bio: "Renowned for reading a colt's temperament and matching it to the right race distance.", years: "34 years" },
  { name: "Lkhagvasüren O.", image: "/images/trainer-7.jpg", location: "Selenge Province", bio: "Focuses on early groundwork and trust-building between rider and horse.", years: "17 years" },
  { name: "Munkhbat Ch.", image: "/images/trainer-8.jpg", location: "Sükhbaatar Province", bio: "Known across the eastern steppe for producing fast, even-tempered geldings.", years: "24 years" },
  { name: "Davaadorj N.", image: "/images/trainer-9.jpg", location: "Zavkhan Province", bio: "A quiet master whose stable has not missed a provincial podium in a decade.", years: "29 years" },
];

export type Treasure = {
  name: string;
  term: string;
  image: string;
  description: string;
  material: string;
};

export const TREASURES: Treasure[] = [
  { name: "Belt Knife Set", term: "хэт хутга", image: "/images/het-hutga-1.jpg", description: "A traditional knife-and-chopstick belt set with a hand-tooled leather sheath and silver fittings.", material: "Steel · silver · leather" },
  { name: "Master's Knife Set", term: "хэт хутга", image: "/images/het-hutga-2.jpg", description: "Ceremonial het hutga with engraved scabbard, passed down as a marker of standing and craft.", material: "Damascened steel · silver" },
  { name: "Herder's Knife Set", term: "хэт хутга", image: "/images/het-hutga-3.jpg", description: "A working belt set balancing everyday utility with quietly elegant fire-steel ornament.", material: "Carbon steel · bronze" },
  { name: "Carved Snuff Bottle", term: "хөөрөг", image: "/images/hoorog-1.jpg", description: "A hand-carved хөөрөг of polished agate, exchanged as a gesture of respect between guests.", material: "Agate · coral stopper" },
  { name: "Chalcedony Snuff Bottle", term: "хөөрөг", image: "/images/hoorog-2.jpg", description: "Translucent chalcedony snuff bottle with a silver collar and a finely fitted spoon.", material: "Chalcedony · silver" },
  { name: "Silver-Mounted Snuff Bottle", term: "хөөрөг", image: "/images/hoorog-3.jpg", description: "An heirloom хөөрөг dressed in filigree silver, its stopper crowned with red coral.", material: "Silver · coral · jade" },
  { name: "Silver Drinking Bowl", term: "мөнгөн аяга", image: "/images/silver-1.jpg", description: "A footed silver bowl chased with cloud scrollwork, used to honour important guests.", material: "Hallmarked silver" },
  { name: "Saddle Silver Ornament", term: "эмээлийн мөнгө", image: "/images/silver-2.jpg", description: "Repoussé silver saddle plates depicting the soyombo and endless-knot motifs.", material: "Silver on hardwood" },
  { name: "Fire Steel Pouch", term: "хэтэвч", image: "/images/silver-3.jpg", description: "A belt pouch and fire-steel set with embossed silver mounts and braided cord.", material: "Leather · silver · steel" },
];

export type Article = {
  title: string;
  image: string;
  date: string;
  excerpt: string;
};

export const ARTICLES: Article[] = [
  { title: "The Bloodlines Behind This Year's Naadam Champions", image: "/images/magazine-1.jpg", date: "June 2026", excerpt: "We trace the udam of the fastest horses on the steppe and the families who kept those lines alive." },
  { title: "A Day in the Life of a Master Trainer", image: "/images/magazine-2.jpg", date: "May 2026", excerpt: "From before dawn to last light, inside the patient daily craft of conditioning a champion." },
  { title: "Reading a Snuff Bottle: A Collector's Guide", image: "/images/magazine-3.jpg", date: "May 2026", excerpt: "What stone, stopper and silverwork reveal about the age and story of a хөөрөг." },
  { title: "The Quiet Art of the Belt Knife", image: "/images/magazine-4.jpg", date: "April 2026", excerpt: "How хэт хутга makers balance everyday use with centuries of ornamental tradition." },
  { title: "Training the Two-Year-Old: First Season on the Steppe", image: "/images/magazine-5.jpg", date: "April 2026", excerpt: "The careful first year that decides whether a young horse becomes a racer." },
  { title: "Silver, Coral and Status on the Open Plain", image: "/images/magazine-6.jpg", date: "March 2026", excerpt: "A look at the heritage silverwork that has signalled standing for generations." },
];
