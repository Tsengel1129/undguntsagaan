"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";

export default function SignOutOnly() {
  const router = useRouter();
  const doSignOut = async () => {
    try {
      await signOut(getClientAuth());
    } catch {
      /* ignore */
    }
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };
  return (
    <button
      type="button"
      onClick={doSignOut}
      className="mt-6 inline-flex items-center gap-2 bg-red px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-red-deep"
    >
      Гарах
    </button>
  );
}
