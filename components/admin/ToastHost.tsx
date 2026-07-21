"use client";

import { useEffect, useRef, useState } from "react";
import type { ToastDetail } from "@/lib/admin/toast";

export default function ToastHost() {
  const [toast, setToast] = useState<ToastDetail | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const onToast = (e: Event) => {
      const detail = (e as CustomEvent<ToastDetail>).detail;
      setToast(detail);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(
        () => setToast(null),
        detail.error ? 6000 : 2500
      );
    };
    window.addEventListener("admin-toast", onToast);
    return () => window.removeEventListener("admin-toast", onToast);
  }, []);

  if (!toast) return null;
  return (
    <div
      className={`fixed right-6 top-6 z-50 max-w-md rounded-sm px-5 py-3 text-sm font-semibold shadow-lg ${
        toast.error ? "bg-red text-cream" : "bg-charcoal text-cream"
      }`}
    >
      {toast.msg}
    </div>
  );
}
