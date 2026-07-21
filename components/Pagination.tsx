import Link from "next/link";

/* ← → page switcher for the public list pages. Server-rendered links
   (?page=N); hidden entirely when everything fits on one page. */
export default function Pagination({
  current,
  total,
  basePath,
}: {
  current: number;
  total: number;
  basePath: string;
}) {
  if (total <= 1) return null;
  const href = (p: number) => (p <= 1 ? basePath : `${basePath}?page=${p}`);
  const btn =
    "inline-flex h-11 w-11 items-center justify-center border text-lg transition-colors";
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-5 pt-4"
    >
      {current > 1 ? (
        <Link
          href={href(current - 1)}
          aria-label="Previous page"
          className={`${btn} border-charcoal/20 text-charcoal hover:border-red hover:text-red`}
        >
          ←
        </Link>
      ) : (
        <span aria-hidden className={`${btn} border-charcoal/10 text-charcoal/25`}>
          ←
        </span>
      )}
      <p className="text-sm font-semibold tracking-widest text-ink/70">
        {current} / {total}
      </p>
      {current < total ? (
        <Link
          href={href(current + 1)}
          aria-label="Next page"
          className={`${btn} border-charcoal/20 text-charcoal hover:border-red hover:text-red`}
        >
          →
        </Link>
      ) : (
        <span aria-hidden className={`${btn} border-charcoal/10 text-charcoal/25`}>
          →
        </span>
      )}
    </nav>
  );
}
