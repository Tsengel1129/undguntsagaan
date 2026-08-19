import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

/* Public-site chrome. The (site) group keeps every public URL unchanged
   while letting /admin render its own minimal shell. LanguageProvider wraps
   only the public chrome (it's client-side and doesn't force dynamic render). */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <SmoothScroll />
      <Header />
      <main>{children}</main>
      <Footer />
    </LanguageProvider>
  );
}
