"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";

const AUTH_ERRORS: Record<string, string> = {
  "auth/invalid-credential": "И-мэйл эсвэл нууц үг буруу байна",
  "auth/wrong-password": "И-мэйл эсвэл нууц үг буруу байна",
  "auth/user-not-found": "И-мэйл эсвэл нууц үг буруу байна",
  "auth/invalid-email": "И-мэйл хаяг буруу байна",
  "auth/too-many-requests": "Хэт олон оролдлого — түр хүлээгээд дахин оролдоно уу",
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const auth = getClientAuth();
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const idToken = await cred.user.getIdToken();
      const res = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Нэвтрэлт амжилтгүй боллоо");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      const code = (err as { code?: string }).code;
      setError(
        (code && AUTH_ERRORS[code]) ??
          (err instanceof Error ? err.message : "Алдаа гарлаа")
      );
      setBusy(false);
    }
  };

  const input =
    "w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 text-sm text-charcoal focus:border-red focus:outline-none";

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-5">
      <form
        onSubmit={signIn}
        className="w-full max-w-sm rounded-sm border border-charcoal/10 bg-white p-10"
      >
        <p className="eyebrow text-center text-xs text-red">Ухаантай Морь</p>
        <h1 className="mt-3 text-center font-serif text-3xl font-semibold text-charcoal">
          Админ нэвтрэлт
        </h1>
        <div className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              И-мэйл
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
              className={input}
            />
          </div>
          <div>
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Нууц үг
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className={input}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 bg-red px-6 py-3 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-red-deep disabled:opacity-60"
        >
          {busy ? "Түр хүлээнэ үү…" : "Нэвтрэх"}
        </button>
        {error && <p className="mt-4 text-center text-sm text-red">{error}</p>}
      </form>
    </div>
  );
}
