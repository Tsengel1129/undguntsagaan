import Link from "next/link";
import { NAV } from "@/lib/nav";
import { getSiteSettings } from "@/lib/firebase/queries";
import Logo from "./Logo";

export default async function Footer() {
  const site = await getSiteSettings();
  return (
    <footer className="mt-24 bg-charcoal text-cream">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <div className="text-cream">
            <Logo markColor="#E23A52" />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
            {site.tagline}
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-xs text-gold-soft">Цэс</h3>
          <ul className="mt-5 grid grid-cols-2 gap-y-3">
            {NAV.filter((item) => item.href).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href!}
                  className="text-sm text-cream/80 transition-colors hover:text-red-soft"
                >
                  {item.mn}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-xs text-gold-soft">Холбоо барих</h3>
          <address className="mt-5 space-y-3 text-sm not-italic text-cream/80">
            <p>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-red-soft"
              >
                {site.email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${site.phone}`}
                className="transition-colors hover:text-red-soft"
              >
                {site.phone}
              </a>
            </p>
            <p className="leading-relaxed text-cream/70">{site.address}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-cream/50 md:flex-row md:px-8">
          <p>
            © {2026} {site.nameMn} · {site.name}. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <p>Монголын морин өвийн сэтгүүл.</p>
        </div>
      </div>
    </footer>
  );
}
