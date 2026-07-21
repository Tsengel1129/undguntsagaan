/* Client-side Firebase Storage upload.
   getDownloadURL() returns a DOWNLOAD TOKEN URL — never makePublic(),
   never signed URLs (hard rule). */

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getClientStorage } from "@/lib/firebase/client";

export async function uploadContentImage(
  collection: string,
  slug: string,
  file: File
): Promise<string> {
  const storage = getClientStorage();
  const clean = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-80);
  const path = `content/${collection}/${slug || "new"}/${Date.now()}-${clean}`;
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
}
