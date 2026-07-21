"use client";

import { useEffect } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";

/* Firebase refreshes the ID token ~every hour; mirror each fresh token into
   the httpOnly session cookie so server-side checks never see an expired one. */
export default function SessionRefresher() {
  useEffect(() => {
    let auth;
    try {
      auth = getClientAuth();
    } catch {
      return; // client SDK unconfigured — nothing to refresh
    }
    return onIdTokenChanged(auth, async (user) => {
      if (!user) return;
      const idToken = await user.getIdToken();
      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }).catch(() => {});
    });
  }, []);
  return null;
}
