"use client";

/* Archive issue reader with a locked/unlocked gate.

   Entitlement (for now) = the issue is free, OR an `ent_<slug>` cookie is
   present. A real payment success (Phase 5b, once QPay/SocialPay keys exist)
   is what will set that cookie server-side after verifying the callback. Until
   then the "Худалдан авах" button hits /api/payments/create, which returns
   501 "not connected" — an honest state, not a fake checkout. */

import { useEffect, useState } from "react";
import Link from "next/link";
import ContentImage from "@/components/ContentImage";

export type ArchiveIssue = {
  slug: string;
  title: string;
  summary: string;
  cover?: string;
  price: number;
  pdfUrl: string;
  free: boolean;
};

function hasEntitlementCookie(slug: string): boolean {
  return document.cookie
    .split("; ")
    .some((c) => c.startsWith(`ent_${slug}=`));
}

export default function ArchiveReader({ issue }: { issue: ArchiveIssue }) {
  const [entitled, setEntitled] = useState(issue.free);
  const [buying, setBuying] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!issue.free && hasEntitlementCookie(issue.slug)) setEntitled(true);
  }, [issue.free, issue.slug]);

  const buy = async () => {
    setBuying(true);
    setNotice(null);
    try {
      const res = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: issue.slug }),
      });
      const data = await res.json();
      if (res.ok && data.ok && data.invoice?.checkoutUrl) {
        window.location.href = data.invoice.checkoutUrl;
        return;
      }
      setNotice(data.error ?? "Төлбөрийг эхлүүлж чадсангүй.");
    } catch {
      setNotice("Сүлжээний алдаа. Дахин оролдоно уу.");
    } finally {
      setBuying(false);
    }
  };

  return (
    <article className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
      <Link href="/magazine/archive" className="text-sm font-semibold text-red">
        ← Архив
      </Link>

      {entitled ? (
        <div className="mt-6">
          <h1 className="font-serif text-3xl font-semibold text-charcoal md:text-4xl">
            {issue.title}
          </h1>
          {issue.pdfUrl ? (
            <>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={issue.pdfUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 bg-red px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-red-deep"
                >
                  Шинэ цонхонд унших ↗
                </a>
                <a
                  href={issue.pdfUrl}
                  download
                  className="inline-flex items-center gap-2 border border-charcoal/15 px-5 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:border-red hover:text-red"
                >
                  PDF татах
                </a>
              </div>
              <iframe
                src={issue.pdfUrl}
                title={issue.title}
                className="mt-6 h-[80vh] w-full rounded-sm border border-charcoal/10"
              />
            </>
          ) : (
            <p className="mt-6 text-base text-ink/60">
              Энэ дугаарын PDF удахгүй нэмэгдэнэ.
            </p>
          )}
        </div>
      ) : (
        <div className="mt-6 grid gap-8 md:grid-cols-[280px_1fr]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-charcoal/10 bg-cream">
            <ContentImage src={issue.cover} alt={issue.title} fit="cover" sizes="280px" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal/5 px-3 py-1 text-xs font-semibold text-ink/60">
              🔒 Төлбөртэй дугаар
            </span>
            <h1 className="mt-3 font-serif text-3xl font-semibold text-charcoal md:text-4xl">
              {issue.title}
            </h1>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/75">
              {issue.summary}
            </p>
            <p className="mt-6 text-2xl font-semibold text-charcoal">
              {Number(issue.price).toLocaleString()}₮
            </p>
            <button
              type="button"
              onClick={buy}
              disabled={buying}
              className="mt-4 inline-flex items-center gap-2 bg-red px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-red-deep disabled:opacity-60"
            >
              {buying ? "Түр хүлээнэ үү…" : "Худалдан авах"}
            </button>
            {notice && <p className="mt-4 text-sm text-red">{notice}</p>}
          </div>
        </div>
      )}
    </article>
  );
}
