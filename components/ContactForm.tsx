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
        <p className="font-serif text-2xl text-charcoal">Thank you.</p>
        <p className="mt-2 text-sm text-ink/70">
          Your message has been noted. (This form is a placeholder and does not
          send email yet.)
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 text-sm font-semibold text-red"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
          Name
        </label>
        <input id="name" name="name" type="text" required className={field} placeholder="Your name" />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
          Email
        </label>
        <input id="email" name="email" type="email" required className={field} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className={field} placeholder="How can we help?" />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-red px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-red-deep"
      >
        Send message →
      </button>
    </form>
  );
}
