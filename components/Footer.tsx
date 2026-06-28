import Link from "next/link";
import { NAV, SITE } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-24 bg-charcoal text-cream">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <div className="text-cream">
            <Logo markColor="#E23A52" />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
            {SITE.tagline}
          </p>
        </div>

        <div>
          <h3 className="eyebrow text-xs text-gold-soft">Explore</h3>
          <ul className="mt-5 grid grid-cols-2 gap-y-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-cream/80 transition-colors hover:text-red-soft"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-xs text-gold-soft">Contact</h3>
          <address className="mt-5 space-y-3 text-sm not-italic text-cream/80">
            <p>
              <a
                href={`mailto:${SITE.email}`}
                className="transition-colors hover:text-red-soft"
              >
                {SITE.email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${SITE.phone}`}
                className="transition-colors hover:text-red-soft"
              >
                {SITE.phone}
              </a>
            </p>
            <p className="leading-relaxed text-cream/70">{SITE.address}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-page flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-cream/50 md:flex-row md:px-8">
          <p>
            © {2026} {SITE.name} · {SITE.nameMn}. All rights reserved.
          </p>
          <p>Mongolia's magazine of horse heritage.</p>
        </div>
      </div>
    </footer>
  );
}
