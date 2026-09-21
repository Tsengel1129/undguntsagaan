/* Thin line icons for the mega menu (Oura-style). Keyed by the section /
   shop slug set in lib/nav.ts; unknown keys fall back to a small arrow. */

const PATHS: Record<string, React.ReactNode> = {
  /* Ажлын дараа */
  "open-talk": (
    <>
      <path d="M4 5.5h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z" />
      <path d="M18 9.5h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-.5V21l-3-2.5H13" />
    </>
  ),
  "trainer-stage": (
    <>
      <path d="M3 21h18M5 21V11h4v10M10 21V7h4v14M15 21v-7h4v7" />
      <path d="M12 3v2" />
    </>
  ),
  /* Шинэ эриний уяач */
  youth: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M18.5 3.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z" />
    </>
  ),
  perspectives: (
    <>
      <path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  "legal-help": (
    <>
      <path d="M12 3v18M6 21h12" />
      <path d="M12 6H5m7 0h7" />
      <path d="M2.5 13.5 5 6l2.5 7.5a2.5 2.5 0 0 1-5 0ZM16.5 13.5 19 6l2.5 7.5a2.5 2.5 0 0 1-5 0Z" />
    </>
  ),
  "family-education": (
    <>
      <path d="M3 10.5 12 4l9 6.5" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M9 20v-5h6v5" />
    </>
  ),
  /* Оюуны үнэт өв */
  blacksmith: (
    <>
      <path d="M3 9h9v3a3 3 0 0 0 3 3h3l3-3v-3h-4l-3-3H3v3Z" />
      <path d="M8 15v4M13 15v4M6 19h9" />
    </>
  ),
  "fine-art": (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-2 0-.6-.3-1-.6-1.4-.3-.4-.4-.7-.4-1.1 0-1 .8-1.5 1.8-1.5H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7Z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="10.5" cy="7.5" r="1" />
      <circle cx="15" cy="7.5" r="1" />
    </>
  ),
  tradition: (
    <>
      <path d="M12 3c2.5 2.5 2.5 6 0 8.5C9.5 9 9.5 5.5 12 3Z" />
      <path d="M12 21c-2.5-2.5-2.5-6 0-8.5 2.5 2.5 2.5 6 0 8.5Z" />
      <path d="M3 12c2.5-2.5 6-2.5 8.5 0C9 14.5 5.5 14.5 3 12Z" />
      <path d="M21 12c-2.5 2.5-6 2.5-8.5 0 2.5-2.5 6-2.5 8.5 0Z" />
    </>
  ),
  /* Сэтгүүл */
  articles: (
    <>
      <path d="M4 4h12a2 2 0 0 1 2 2v13a1.5 1.5 0 0 0 3 0V9h-3" />
      <path d="M4 4v15.5A1.5 1.5 0 0 0 5.5 21H19" />
      <path d="M7 8h6M7 11.5h6M7 15h6" />
    </>
  ),
  issue: (
    <>
      <path d="M12 6.5c-2-1.5-4.5-2-8-2v13c3.5 0 6 .5 8 2 2-1.5 4.5-2 8-2v-13c-3.5 0-6 .5-8 2Z" />
      <path d="M12 6.5v13" />
    </>
  ),
  archive: (
    <>
      <path d="M3 5h18v4H3zM5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
      <path d="M10 13h4" />
    </>
  ),
  racehorses: (
    <>
      <path d="M6 20h3c-1.2-3-2-6-2-9a5 5 0 0 1 10 0c0 3-.8 6-2 9h3c1.3-3 2-6 2-9a8 8 0 0 0-16 0c0 3 .7 6 2 9Z" />
      <path d="M5.8 8.5h.01M18.2 8.5h.01M12 4.8h.01" />
    </>
  ),
  /* Дэлгүүр */
  medicine: (
    <>
      <path d="m4 20 3.5-3.5M6 16l7-7 5 5-7 7Z" />
      <path d="m15 7 2-2M17 9l3-3m-4-1 3 3" />
      <path d="m9 13 2 2M11 11l2 2" />
    </>
  ),
  feed: (
    <>
      <path d="M12 21V9" />
      <path d="M12 9c-3 0-4.5-2-4.5-5 3 0 4.5 2 4.5 5Zm0 0c3 0 4.5-2 4.5-5-3 0-4.5 2-4.5 5Z" />
      <path d="M12 14c-3 0-4.5-2-4.5-5 3 0 4.5 2 4.5 5Zm0 0c3 0 4.5-2 4.5-5-3 0-4.5 2-4.5 5Z" />
      <path d="M12 19c-3 0-4.5-2-4.5-5 3 0 4.5 2 4.5 5Zm0 0c3 0 4.5-2 4.5-5-3 0-4.5 2-4.5 5Z" />
    </>
  ),
  products: (
    <>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  pharmacies: (
    <>
      <path d="M12 21s-6.5-5.5-6.5-11a6.5 6.5 0 0 1 13 0c0 5.5-6.5 11-6.5 11Z" />
      <path d="M12 7.5v5M9.5 10h5" />
    </>
  ),
};

const FALLBACK = <path d="M5 12h14m-6-6 6 6-6 6" />;

export default function NavIcon({
  name,
  className = "h-5 w-5",
}: {
  name?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {(name && PATHS[name]) || FALLBACK}
    </svg>
  );
}
