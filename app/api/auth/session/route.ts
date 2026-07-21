import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getAdminApp, getAdminEmails } from "@/lib/firebase/admin";
import { SESSION_COOKIE } from "@/lib/admin/auth";

/* POST { idToken } → verify with Admin SDK, store in an httpOnly cookie.
   The admin layout decides between "ok" and "Хандах эрхгүй" screens.
   DELETE → clear the cookie (sign out).
   Note: responses carry Mongolian only in JSON bodies, never in headers. */

export async function POST(request: Request) {
  const app = getAdminApp();
  if (!app) {
    return NextResponse.json(
      { ok: false, error: "Firebase тохиргоо дутуу байна (.env.local)" },
      { status: 500 }
    );
  }
  let idToken: string | undefined;
  try {
    ({ idToken } = await request.json());
  } catch {
    /* fall through */
  }
  if (!idToken) {
    return NextResponse.json(
      { ok: false, error: "idToken шаардлагатай" },
      { status: 400 }
    );
  }
  try {
    const decoded = await getAuth(app).verifyIdToken(idToken);
    const email = decoded.email?.toLowerCase() ?? "";
    const admin = getAdminEmails().includes(email);
    const res = NextResponse.json({ ok: true, admin, email });
    res.cookies.set(SESSION_COOKIE, idToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // ID tokens live 1h; the client refreshes the cookie
    });
    return res;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Нэвтрэлт баталгаажсангүй" },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
