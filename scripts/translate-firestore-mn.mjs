/* One-off: translate the English text fields in Firestore to Mongolian.
   - update() of text fields only: images, pinned, status, timestamps untouched.
   - a field is only written if its live value still equals the backed-up
     English value (so anything an admin edited since is left alone).
   - DRY RUN unless --write is passed.

   Run:  node scripts/translate-firestore-mn.mjs           (dry run)
         node scripts/translate-firestore-mn.mjs --write   (apply) */
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { config as loadEnv } from "dotenv";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: resolve(root, ".env.local"), quiet: true });
const backupPath = resolve(root, "backups/firestore-2026-09-21-before-translation.json");
const mnPath = resolve(root, "scripts/data/translations-mn.mjs");
const WRITE = process.argv.includes("--write");
const backup = JSON.parse(readFileSync(backupPath, "utf8"));
const mn = await import("file://" + mnPath);
const { DEFAULT_TEXTS } = await import(new URL("../lib/siteTexts.ts", import.meta.url).href);
const { cert, initializeApp } = await import("firebase-admin/app");
const { getFirestore, Timestamp } = await import("firebase-admin/firestore");
const sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
sa.private_key = sa.private_key.replace(/\\n/g, "\n");
initializeApp({ credential: cert(sa) });
const db = getFirestore();

const tiptap = (ps) => ({ type: "doc", content: ps.map((text) => ({ type: "paragraph", content: [{ type: "text", text }] })) });
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
let written = 0, skipped = 0;

async function apply(ref, patchWanted, backupDoc) {
  const live = (await ref.get()).data();
  if (!live) { console.log("  ! missing", ref.path); return; }
  const patch = {};
  for (const [k, v] of Object.entries(patchWanted)) {
    if (same(live[k], v)) continue; // already translated
    if (!same(live[k], backupDoc?.[k])) { console.log(`  ~ skip ${ref.path}.${k} (changed since backup)`); skipped++; continue; }
    patch[k] = v;
  }
  const keys = Object.keys(patch);
  if (!keys.length) return;
  console.log(`${WRITE ? "✔" : "·"} ${ref.path}: ${keys.join(", ")}`);
  written += keys.length;
  if (WRITE) await ref.update({ ...patch, ...(ref.parent.id === "siteSettings" ? {} : { updatedAt: Timestamp.now() }) });
}

for (const [col, tr] of [["racehorses", mn.RACEHORSES_MN], ["trainers", mn.TRAINERS_MN], ["treasures", mn.TREASURES_MN], ["articles", mn.ARTICLES_MN]]) {
  for (const [slug, t] of Object.entries(tr)) {
    const { body, ...rest } = t;
    await apply(db.collection(col).doc(slug), { ...rest, body: tiptap(body) }, backup[col][slug]);
  }
}

await apply(db.collection("siteSettings").doc("general"), mn.SITE_MN, backup.siteSettings.general);

// Site texts: replace values that are still English; keep the admin's own Mongolian ones.
const KEEP = new Set(["homeHeroImage", "abImage", "homeCtaPrimary", "homeIntroHeading", "homeCtaSecondary"]);
const textsPatch = {};
for (const [k, v] of Object.entries(backup.siteSettings.texts)) {
  if (KEEP.has(k) || !(k in DEFAULT_TEXTS)) continue;
  textsPatch[k] = k === "homeHeroEyebrow" ? "Ухаантай Морь · Монгол морин өв" : DEFAULT_TEXTS[k];
}
await apply(db.collection("siteSettings").doc("texts"), textsPatch, backup.siteSettings.texts);

console.log(`\n${WRITE ? "WROTE" : "DRY RUN —"} ${written} fields, skipped ${skipped}`);
process.exit(0);
