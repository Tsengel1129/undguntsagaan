/* Firebase Admin SDK — guarded singleton, server-only.
   Credentials come from FIREBASE_SERVICE_ACCOUNT_KEY (full service-account
   JSON on a single line) in .env.local. When the key is absent (e.g. a fresh
   checkout) the app still builds and runs — queries return empty results
   instead of crashing. */

import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

if (typeof window !== "undefined") {
  throw new Error("lib/firebase/admin.ts must never be imported on the client");
}

let cachedApp: App | null = null;
let warned = false;

function parseServiceAccount(): Record<string, string> | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;
  try {
    const json = JSON.parse(raw);
    // Private keys pasted into env files often arrive with escaped newlines.
    if (typeof json.private_key === "string") {
      json.private_key = json.private_key.replace(/\\n/g, "\n");
    }
    return json;
  } catch {
    console.error(
      "FIREBASE_SERVICE_ACCOUNT_KEY is set but is not valid JSON — Firestore access disabled."
    );
    return null;
  }
}

export function getAdminApp(): App | null {
  if (cachedApp) return cachedApp;
  const existing = getApps();
  if (existing.length) {
    cachedApp = existing[0];
    return cachedApp;
  }
  // Local development against the Firestore emulator needs no credentials.
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    cachedApp = initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "demo-undgun",
    });
    return cachedApp;
  }
  const serviceAccount = parseServiceAccount();
  if (!serviceAccount) {
    if (!warned) {
      warned = true;
      console.warn(
        "FIREBASE_SERVICE_ACCOUNT_KEY missing — running without Firestore (public pages render empty states)."
      );
    }
    return null;
  }
  try {
    cachedApp = initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } catch (err) {
    // A malformed key must degrade to empty states, never crash the site.
    if (!warned) {
      warned = true;
      console.error("FIREBASE_SERVICE_ACCOUNT_KEY is invalid:", err);
    }
    return null;
  }
  return cachedApp;
}

export function getAdminDb(): Firestore | null {
  const app = getAdminApp();
  return app ? getFirestore(app) : null;
}

export function getAdminStorage() {
  const app = getAdminApp();
  return app ? getStorage(app) : null;
}

/** Super-admin emails from ADMIN_EMAILS (comma-separated). */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}
