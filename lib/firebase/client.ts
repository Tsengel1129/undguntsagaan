/* Firebase client SDK — guarded singleton.
   Used by the admin panel (auth + storage uploads); public pages read
   server-side via lib/firebase/admin.ts instead.

   Set NEXT_PUBLIC_USE_FIREBASE_EMULATORS=1 to run the whole admin flow
   against local emulators (auth :9099, storage :9199) with no real
   credentials. */

import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  connectAuthEmulator,
  getAuth,
  GoogleAuthProvider,
  type Auth,
} from "firebase/auth";
import {
  connectStorageEmulator,
  getStorage,
  type FirebaseStorage,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const useEmulators = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === "1";
let authEmulated = false;
let storageEmulated = false;

export function getClientApp(): FirebaseApp {
  if (!firebaseConfig.apiKey) {
    throw new Error(
      "Firebase client is not configured — set NEXT_PUBLIC_FIREBASE_* in .env.local"
    );
  }
  return getApps()[0] ?? initializeApp(firebaseConfig);
}

export function getClientAuth(): Auth {
  const auth = getAuth(getClientApp());
  if (useEmulators && !authEmulated) {
    authEmulated = true;
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });
  }
  return auth;
}

export function getClientStorage(): FirebaseStorage {
  const storage = getStorage(getClientApp());
  if (useEmulators && !storageEmulated) {
    storageEmulated = true;
    connectStorageEmulator(storage, "localhost", 9199);
  }
  return storage;
}

export const googleProvider = new GoogleAuthProvider();
