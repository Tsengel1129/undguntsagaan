import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.uhaantaimori.mn"),
  title: {
    default: "Ухаантай Морь — Монголын морин өвийн сэтгүүл",
    template: "%s · Ухаантай Морь",
  },
  description:
    "«Ухаантай Морь» — хурдан морины удам угсаа, нэрт уяач, амьд өв уламжлалын тухай Монголын сэтгүүл.",
  keywords: [
    "Монгол морь",
    "хурдан морь",
    "уяач",
    "наадам",
    "хэт хутга",
    "хөөрөг",
    "Монголын өв соёл",
    "Ухаантай Морь",
    "Mongolian horses",
    "Naadam",
  ],
  openGraph: {
    title: "Ухаантай Морь — Монголын морин өвийн сэтгүүл",
    description:
      "Хурдан морины удам угсаа, нэрт уяач болон Монгол тал нутгийн амьд өв уламжлал.",
    type: "website",
    locale: "mn_MN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
