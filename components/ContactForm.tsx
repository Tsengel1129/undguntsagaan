"use client";

import { useState } from "react";

/* UI-only contact form. Does NOT submit anywhere yet — wire up an
   action / API route when a backend or email service is available. */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true); // placeholder confirmation only
  }

  const field =
    "w-full rounded-sm border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-ink/35 focus:border-red focus:ring-2 focus:ring-red/15";

  if (sent) {
    return (
      <div className="rounded-sm border border-red/30 bg-white p-8 text-center">
        <p className="font-serif text-2xl text-charcoal">Баярлалаа.</p>
        <p className="mt-2 text-sm text-ink/70">
          Таны захидлыг хүлээн авлаа. (Энэ форм түр зуурынх бөгөөд одоогоор
          и-мэйл илгээхгүй.)
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 text-sm font-semibold text-red"
        >
          Дахин захидал илгээх
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
          Нэр
        </label>
        <input id="name" name="name" type="text" required className={field} placeholder="Таны нэр" />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
          И-мэйл
        </label>
        <input id="email" name="email" type="email" required className={field} placeholder="tanii@mail.mn" />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Захидал
        </label>
        <textarea id="message" name="message" rows={5} required className={field} placeholder="Бид танд хэрхэн туслах вэ?" />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-red px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-red-deep"
      >
        Захидал илгээх →
      </button>
    </form>
  );
}
