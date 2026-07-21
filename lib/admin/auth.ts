/* Server-side admin session: the Firebase ID token lives in an httpOnly
   cookie (set by /api/auth/session); every admin page and server action
   verifies it with the Admin SDK and checks the email against ADMIN_EMAILS. */

import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
import { getAdminApp, getAdminEmails } from "@/lib/firebase/admin";

export const SESSION_COOKIE = "undgun_admin_token";

export type AdminSession =
  | { status: "ok"; email: string }
  | { status: "denied"; email: string } // signed in, but not an admin
  | { status: "none" };

export async function getAdminSession(): Promise<AdminSession> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return { status: "none" };
  const app = getAdminApp();
  if (!app) return { status: "none" };
  try {
    const decoded = await getAuth(app).verifyIdToken(token);
    const email = decoded.email?.toLowerCase();
    if (!email) return { status: "none" };
    return getAdminEmails().includes(email)
      ? { status: "ok", email }
      : { status: "denied", email };
  } catch {
    return { status: "none" };
  }
}

/** Gate for server actions: throws unless a valid admin session exists. */
export async function requireAdmin(): Promise<string> {
  const session = await getAdminSession();
  if (session.status !== "ok") throw new Error("UNAUTHORIZED");
  return session.email;
}
