import { notFound } from "next/navigation";
import EditForm from "@/components/admin/EditForm";
import { getForAdmin } from "@/lib/firebase/adminQueries";
import { isCollectionKey } from "@/lib/admin/schema";

export const dynamic = "force-dynamic";

export default async function AdminEditPage({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}) {
  const { collection, slug } = await params;
  if (!isCollectionKey(collection)) notFound();

  if (slug === "new") {
    return <EditForm collection={collection} initial={null} />;
  }

  const item = await getForAdmin(collection, slug);
  if (!item) notFound();
  return <EditForm collection={collection} initial={item} />;
}
