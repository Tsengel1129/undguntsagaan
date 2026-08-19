"use client";

/* Client-side language state. Kept off the server render path on purpose: the
   provider mounts with the primary language (mn) so every public page stays
   statically prerendered + cached (important for low-bandwidth rural users).
   The stored choice is applied on mount — mn users see no flash; en users get a
   single-frame flip. The choice persists in a cookie (+ localStorage mirror). */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DEFAULT_LANG, LANG_COOKIE, isLang, type Lang } from "./config";
import { DICT, type DictKey } from "./dictionary";

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Translate a chrome dictionary key. */
  t: (key: DictKey) => string;
  /** Pick between an inline mn/en pair (e.g. nav labels). */
  pick: (mn: string, en: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      document.cookie = `${LANG_COOKIE}=${l};path=/;max-age=31536000;samesite=lax`;
      localStorage.setItem(LANG_COOKIE, l);
    } catch {
      /* cookies/storage may be blocked — state still updates for the session */
    }
    document.documentElement.lang = l;
  }, []);

  // Apply the stored choice once, after hydration.
  useEffect(() => {
    const stored = readCookie(LANG_COOKIE) ?? localStorage.getItem(LANG_COOKIE);
    if (isLang(stored) && stored !== DEFAULT_LANG) setLang(stored);
  }, [setLang]);

  const toggle = useCallback(
    () => setLang(lang === "mn" ? "en" : "mn"),
    [lang, setLang]
  );

  const t = useCallback((key: DictKey) => DICT[key][lang] ?? DICT[key].mn, [
    lang,
  ]);

  const pick = useCallback((mn: string, en: string) => (lang === "en" ? en : mn), [
    lang,
  ]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t, pick }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within <LanguageProvider>");
  return ctx;
}
