"use client";

import { useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";
import { toast } from "@/lib/admin/toast";

const ERRORS: Record<string, string> = {
  "auth/invalid-credential": "Одоогийн нууц үг буруу байна",
  "auth/wrong-password": "Одоогийн нууц үг буруу байна",
  "auth/weak-password": "Шинэ нууц үг хэт сул байна (6-аас дээш тэмдэгт)",
  "auth/too-many-requests": "Хэт олон оролдлого — түр хүлээгээд дахин оролдоно уу",
};

export default function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const input =
    "w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 text-sm text-charcoal focus:border-red focus:outline-none";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (next.length < 6) {
      return toast("Шинэ нууц үг 6-аас дээш тэмдэгттэй байх ёстой", true);
    }
    if (next !== confirm) {
      return toast("Шинэ нууц үг давталттайгаа таарахгүй байна", true);
    }
    const user = getClientAuth().currentUser;
    if (!user?.email) {
      return toast("Хугацаа дууссан — дахин нэвтэрнэ үү", true);
    }
    setBusy(true);
    try {
      await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, current)
      );
      await updatePassword(user, next);
      setCurrent("");
      setNext("");
      setConfirm("");
      toast("Нууц үг солигдлоо");
    } catch (err) {
      const code = (err as { code?: string }).code;
      toast(
        `Алдаа гарлаа: ${(code && ERRORS[code]) ?? (err instanceof Error ? err.message : "")}`,
        true
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-sm border border-charcoal/10 bg-white p-6"
    >
      <h2 className="font-serif text-xl font-semibold text-charcoal">
        Нууц үг солих
      </h2>
      <div>
        <label htmlFor="pw-current" className="mb-1.5 block text-sm font-medium text-charcoal">
          Одоогийн нууц үг
        </label>
        <input
          id="pw-current"
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          autoComplete="current-password"
          required
          className={input}
        />
      </div>
      <div>
        <label htmlFor="pw-next" className="mb-1.5 block text-sm font-medium text-charcoal">
          Шинэ нууц үг
        </label>
        <input
          id="pw-next"
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          autoComplete="new-password"
          required
          className={input}
        />
      </div>
      <div>
        <label htmlFor="pw-confirm" className="mb-1.5 block text-sm font-medium text-charcoal">
          Шинэ нууц үг (давтах)
        </label>
        <input
          id="pw-confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
          required
          className={input}
        />
      </div>
      <button
        type="submit"
        disabled={busy}
        className="bg-red px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-red-deep disabled:opacity-50"
      >
        {busy ? "Түр хүлээнэ үү…" : "Нууц үг солих"}
      </button>
    </form>
  );
}
