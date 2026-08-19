/* Language config shared by client + server. Kept tiny and dependency-free so
   both the client provider and any server helper can import it. */

export type Lang = "mn" | "en";

export const LANGS: readonly Lang[] = ["mn", "en"] as const;

/** Mongolian is the primary language; English is the toggle. */
export const DEFAULT_LANG: Lang = "mn";

/** Cookie the client writes so the choice survives reloads/navigation. */
export const LANG_COOKIE = "site_lang";

export function isLang(v: unknown): v is Lang {
  return v === "mn" || v === "en";
}
