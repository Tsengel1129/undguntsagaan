"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, type NavItem } from "@/lib/nav";
import { useLang } from "@/lib/i18n/LanguageProvider";
import LanguageToggle from "./LanguageToggle";
import Logo from "./Logo";
import NavIcon from "./NavIcon";

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
  // After a click inside a mega menu the route changes but the pointer is
  // still hovering the panel — suppress the CSS hover until the pointer leaves.
  const [suppressed, setSuppressed] = useState(false);

  // Close the mobile menu whenever the route changes (skip the initial mount,
  // otherwise the first hover on a fresh page would be suppressed).
  const prevPath = useRef(pathname);
  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    setOpen(false);
    setExpanded({});
    setSuppressed(true);
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

  /* ── Desktop: a top-level item; items with children open a full-width
        mega menu (featured image card on the left, icon list on the right).
        The panel is absolutely positioned against the sticky header, so it
        spans the whole viewport width like Oura's "Your Health" menu. ── */
  const DesktopItem = ({ item }: { item: NavItem }) => {
    if (!item.children) {
      return (
        <Link
          href={item.href ?? "#"}
          data-active={isActive(item.href)}
          className={`nav-underline whitespace-nowrap text-sm font-medium tracking-wide transition-colors ${
            isActive(item.href) ? "text-red" : "text-ink hover:text-red"
          }`}
        >
          {label(item)}
        </Link>
      );
    }
    // Flatten one level of grouping headers so the grid stays a plain list.
    const entries = item.children.flatMap((c) => (c.children ? c.children : [c]));
    const featured = item.featured;
    const openClasses = suppressed
      ? ""
      : "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100";

    return (
      // Negative/positive vertical padding extends the hover area down to the
      // header's bottom edge, so the pointer never "falls out" on the way to the panel.
      <div className="group -my-4 py-4" onMouseLeave={() => setSuppressed(false)}>
        <Link
          href={item.href ?? "#"}
          data-active={isActive(item.href)}
          className={`nav-underline inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium tracking-wide transition-colors ${
            isActive(item.href) ? "text-red" : "text-ink hover:text-red"
          }`}
        >
          {label(item)}
          <Chevron className="transition-transform duration-200 group-hover:rotate-180" />
        </Link>

        {/* Mega menu panel */}
        <div
          className={`invisible absolute inset-x-0 top-full z-50 translate-y-1 opacity-0 transition-all duration-200 ease-out ${openClasses}`}
        >
          <div className="border-t border-charcoal/10 bg-cream shadow-[0_24px_48px_-24px_rgba(26,23,20,0.35)]">
            <div className="mx-auto grid max-w-page grid-cols-[300px_minmax(0,1fr)] gap-12 px-5 py-8 md:px-8">
              {/* Featured card */}
              {featured ? (
                <Link
                  href={featured.href}
                  className="group/card relative block aspect-[3/2] overflow-hidden rounded-xl bg-charcoal"
                >
                  <Image
                    src={featured.image}
                    alt=""
                    fill
                    sizes="300px"
                    quality={68}
                    className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                    <span className="font-serif text-lg font-medium leading-tight text-cream">
                      {pick(featured.mn, featured.en)}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-charcoal transition-transform duration-300 group-hover/card:translate-x-0.5">
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {/* Icon list, two columns */}
              <ul className="grid grid-cols-2 content-start gap-x-8 gap-y-1">
                {entries.map((child) => (
                  <li key={child.href ?? child.mn}>
                    <Link
                      href={child.href ?? "#"}
                      className={`flex items-center gap-4 rounded-lg px-3 py-3 transition-colors ${
                        isActive(child.href)
                          ? "text-red"
                          : "text-ink hover:bg-ivory hover:text-red"
                      }`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center text-ink/70">
                        <NavIcon name={child.icon} className="h-[22px] w-[22px]" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-medium leading-snug">
                          {label(child)}
                        </span>
                        {desc(child) && (
                          <span className="mt-0.5 block text-xs leading-snug text-ink/45">
                            {desc(child)}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
            className={`flex items-center gap-3 border-b border-charcoal/5 py-3 ${
              isActive(item.href) ? "text-red" : "text-ink"
            }`}
          >
            {depth > 0 && (
              <span className="shrink-0 text-ink/60">
                <NavIcon name={item.icon} className="h-5 w-5" />
              </span>
            )}
            <span className="min-w-0">
              <span className="block text-base font-medium">{label(item)}</span>
              {depth > 0 && desc(item) && (
                <span className="mt-0.5 block text-xs text-ink/45">{desc(item)}</span>
              )}
            </span>
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
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" aria-label={t("nav.homeAria")} className="shrink-0 text-charcoal">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          {NAV.map((item) => (
            <DesktopItem key={item.href ?? item.mn} item={item} />
          ))}
          <LanguageToggle className="ml-1" />
        </nav>

        {/* Mobile: language toggle + hamburger */}
        <div className="flex items-center gap-3 xl:hidden">
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
            className="overflow-hidden border-t border-charcoal/10 bg-cream xl:hidden"
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
