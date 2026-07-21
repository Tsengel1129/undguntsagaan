/* Seed Firestore from the static content file (lib/content.ts).

   Run:  node scripts/seed-firestore.mjs   (or: npm run seed)

   - Loads FIREBASE_SERVICE_ACCOUNT_KEY from .env.local via dotenv.
   - Imports the typed arrays straight from lib/content.ts (tsx runtime
     loader — no duplicated data).
   - Writes every item to its collection with doc ID = slug, converting
     body: string[] → Tiptap JSON (one paragraph node per string).
   - status "published", pinned false, and staggered publishedAt timestamps
     that preserve the current array order (first array item = newest), so
     the site looks identical after migration.
   - Idempotent: plain set() overwrites by ID, safe to re-run. */

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
loadEnv({ path: resolve(root, ".env.local") });

// Node ≥ 22.18 strips erasable TypeScript natively, so the typed content
// file imports directly — no duplicated data, no extra loader.
const { RACEHORSES, TRAINERS, TREASURES, ARTICLES, SITE } = await import(
  new URL("../lib/content.ts", import.meta.url).href
);

const { cert, getApps, initializeApp } = await import("firebase-admin/app");
const { getFirestore, Timestamp } = await import("firebase-admin/firestore");

/* ── Admin SDK init ── */

const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (process.env.FIRESTORE_EMULATOR_HOST) {
  // Local emulator needs no credentials.
  if (!getApps().length) {
    initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "demo-undgun",
    });
  }
} else if (!raw) {
  console.error(
    "✖ FIREBASE_SERVICE_ACCOUNT_KEY missing in .env.local — cannot seed."
  );
  process.exit(1);
} else {
  let serviceAccount;
  try {
    serviceAccount = JSON.parse(raw);
  } catch {
    console.error(
      "✖ FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON — paste the full service-account JSON on one line."
    );
    process.exit(1);
  }
  if (typeof serviceAccount.private_key === "string") {
    serviceAccount.private_key = serviceAccount.private_key.replace(
      /\\n/g,
      "\n"
    );
  }
  if (!getApps().length) {
    initializeApp({ credential: cert(serviceAccount) });
  }
}
const db = getFirestore();

/* ── Helpers ── */

/** body: string[] → Tiptap JSON: one paragraph node per string. */
const paragraphsToTiptap = (paragraphs) => ({
  type: "doc",
  content: paragraphs.map((text) => ({
    type: "paragraph",
    content: [{ type: "text", text }],
  })),
});

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();

/** PublishMeta with staggered publishedAt: index 0 = newest. */
const publishMeta = (index) => ({
  status: "published",
  pinned: false,
  pinnedOrder: 0,
  publishedAt: Timestamp.fromMillis(now - index * DAY),
  createdAt: Timestamp.fromMillis(now - index * DAY),
  updatedAt: Timestamp.now(),
});

async function seedCollection(name, items) {
  const batch = db.batch();
  items.forEach((item, i) => {
    const { body, ...rest } = item;
    batch.set(db.collection(name).doc(item.slug), {
      ...rest,
      body: paragraphsToTiptap(body),
      ...publishMeta(i),
    });
  });
  await batch.commit();
  console.log(`✔ ${name}: ${items.length} documents`);
}

/* ── Seed ── */

await seedCollection("racehorses", RACEHORSES);
await seedCollection("trainers", TRAINERS);
await seedCollection("treasures", TREASURES);
await seedCollection("articles", ARTICLES);

await db.collection("siteSettings").doc("general").set(SITE);
console.log("✔ siteSettings/general");

await db.collection("siteSettings").doc("homepage").set({
  horseOfIssueSlug: "tengeriin-salhi",
  latestStoriesMode: "auto",
  latestStoriesSlugs: [],
});
console.log("✔ siteSettings/homepage");

console.log("Done — Firestore seeded.");
process.exit(0);
