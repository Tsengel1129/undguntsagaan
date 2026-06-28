import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

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
  metadataBase: new URL("https://undguntsagaan.mn"),
  title: {
    default: "Undgun Tsagaan — Mongolian Horse Heritage Magazine",
    template: "%s · Undgun Tsagaan",
  },
  description:
    "Undgun Tsagaan (Өндгөн цагаан) — Mongolia's magazine of racing bloodlines, master horse trainers and living heritage treasures.",
  keywords: [
    "Mongolian horses",
    "racehorses",
    "horse trainers",
    "uyaach",
    "Naadam",
    "het hutga",
    "hoorog",
    "Mongolian heritage",
  ],
  openGraph: {
    title: "Undgun Tsagaan — Mongolian Horse Heritage Magazine",
    description:
      "Racing bloodlines, master trainers and living heritage of the Mongolian steppe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
