import Reveal from "./Reveal";

/* Reusable editorial page header for inner routes. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="border-b border-charcoal/10 bg-ivory">
      <div className="mx-auto max-w-page px-5 pb-14 pt-16 md:px-8 md:pb-20 md:pt-24">
        <Reveal>
          <p className="eyebrow text-xs text-red">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] text-charcoal md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70 md:text-lg">
            {intro}
          </p>
        </Reveal>
      </div>
    </header>
  );
}
