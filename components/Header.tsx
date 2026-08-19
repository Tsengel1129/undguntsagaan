"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, type NavItem } from "@/lib/nav";
import { useLang } from "@/lib/i18n/LanguageProvider";
import LanguageToggle from "./LanguageToggle";
import Logo from "./Logo";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`h-3 w-3 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4.5 6 7.5 9 4.5" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { pick, t } = useLang();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setOpen(false);
    setExpanded({});
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href?: string) =>
    !href ? false : href === "/" ? pathname === "/" : pathname.startsWith(href);

  const label = (item: NavItem) => pick(item.mn, item.en);
  const desc = (item: NavItem) =>
    item.descMn ? pick(item.descMn, item.descEn ?? item.descMn) : null;
  const toggleExpand = (key: string) =>
    setExpanded((e) => ({ ...e, [key]: !e[key] }));

  /* ── Desktop: a top-level item with a dropdown panel ── */
  const DesktopItem = ({ item }: { item: NavItem }) => {
    if (!item.children) {
      return (
        <Link
          href={item.href ?? "#"}
          data-active={isActive(item.href)}
          className={`nav-underline text-sm font-medium tracking-wide transition-colors ${
            isActive(item.href) ? "text-red" : "text-ink hover:text-red"
          }`}
        >
          {label(item)}
        </Link>
      );
    }
    return (
      <div className="group relative">
        <Link
          href={item.href ?? "#"}
          data-active={isActive(item.href)}
          className={`inline-flex items-center gap-1 text-sm font-medium tracking-wide transition-colors ${
            isActive(item.href) ? "text-red" : "text-ink hover:text-red"
          }`}
        >
          {label(item)}
          <Chevron className="transition-transform duration-200 group-hover:rotate-180" />
        </Link>
        {/* Dropdown */}
        <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          <div className="w-[320px] rounded-lg border border-charcoal/10 bg-cream p-2 shadow-[0_12px_40px_-16px_rgba(26,23,20,0.4)]">
            {item.children.map((child) =>
              child.children ? (
                <div key={child.mn} className="mt-1 first:mt-0">
                  <Link
                    href={child.href ?? "#"}
                    className={`block rounded-md px-3 pb-0.5 pt-2 transition-colors ${
                      isActive(child.href) ? "text-red" : "text-gold hover:text-red"
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                      {label(child)}
                    </span>
                    {desc(child) && (
                      <span className="mt-0.5 block text-xs font-normal normal-case tracking-normal text-ink/50">
                        {desc(child)}
                      </span>
                    )}
                  </Link>
                  <ul>
                    {child.children.map((gc) => (
                      <li key={gc.href}>
                        <Link
                          href={gc.href ?? "#"}
                          className={`block rounded-md px-3 py-1.5 transition-colors ${
                            isActive(gc.href)
                              ? "text-red"
                              : "text-ink/85 hover:bg-ivory hover:text-red"
                          }`}
                        >
                          <span className="block text-sm font-medium">{label(gc)}</span>
                          {desc(gc) && (
                            <span className="block text-xs text-ink/45">{desc(gc)}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  key={child.href}
                  href={child.href ?? "#"}
                  className={`block rounded-md px-3 py-2 transition-colors ${
                    isActive(child.href)
                      ? "text-red"
                      : "text-ink/85 hover:bg-ivory hover:text-red"
                  }`}
                >
                  <span className="block text-sm font-medium">{label(child)}</span>
                  {desc(child) && (
                    <span className="block text-xs text-ink/45">{desc(child)}</span>
                  )}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ── Mobile: an accordion row (one or two levels deep) ── */
  const MobileItem = ({ item, depth = 0 }: { item: NavItem; depth?: number }) => {
    const key = item.href ?? item.mn;
    const hasChildren = !!item.children?.length;
    const isOpen = !!expanded[key];
    const pad = depth === 0 ? "" : depth === 1 ? "pl-4" : "pl-8";

    if (!hasChildren) {
      return (
        <li className={pad}>
          <Link
            href={item.href ?? "#"}
            className={`block border-b border-charcoal/5 py-3 ${
              isActive(item.href) ? "text-red" : "text-ink"
            }`}
          >
            <span className="block text-base font-medium">{label(item)}</span>
            {depth > 0 && desc(item) && (
              <span className="mt-0.5 block text-xs text-ink/45">{desc(item)}</span>
            )}
          </Link>
        </li>
      );
    }

    return (
      <li className={pad}>
        <div className="flex items-center border-b border-charcoal/5">
          <Link
            href={item.href ?? "#"}
            className={`flex-1 py-3 text-base font-medium ${
              isActive(item.href) ? "text-red" : "text-ink"
            }`}
          >
            {label(item)}
          </Link>
          <button
            type="button"
            onClick={() => toggleExpand(key)}
            aria-label={label(item)}
            aria-expanded={isOpen}
            className="px-3 py-3 text-ink/60"
          >
            <Chevron
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
        {isOpen && (
          <ul>
            {item.children!.map((child) => (
              <MobileItem key={child.href ?? child.mn} item={child} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-cream/90 shadow-[0_1px_0_rgba(26,23,20,0.08)] backdrop-blur-md"
          : "bg-cream/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-page items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" aria-label={t("nav.homeAria")} className="text-charcoal">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <DesktopItem key={item.href ?? item.mn} item={item} />
          ))}
          <LanguageToggle className="ml-1" />
        </nav>

        {/* Mobile: language toggle + hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
          >
            <span
              className={`h-[2px] w-7 bg-charcoal transition-all duration-300 ${
                open ? "translate-y-[8px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-7 bg-charcoal transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-7 bg-charcoal transition-all duration-300 ${
                open ? "-translate-y-[8px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-charcoal/10 bg-cream lg:hidden"
          >
            <ul className="mx-auto flex max-w-page flex-col px-5 py-2">
              {NAV.map((item) => (
                <MobileItem key={item.href ?? item.mn} item={item} />
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
