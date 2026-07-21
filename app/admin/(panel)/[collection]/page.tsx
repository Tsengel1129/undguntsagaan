import Link from "next/link";
import { notFound } from "next/navigation";
import ContentImage from "@/components/ContentImage";
import PinControl from "@/components/admin/PinControl";
import RowActions from "@/components/admin/RowActions";
import { listAllForAdmin, type AdminItem } from "@/lib/firebase/adminQueries";
import { COLLECTION_CONFIGS, isCollectionKey } from "@/lib/admin/schema";

export const dynamic = "force-dynamic";

function formatDate(ms: number | null) {
  if (!ms) return "—";
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default async function AdminListPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  if (!isCollectionKey(collection)) notFound();
  const config = COLLECTION_CONFIGS[collection];
  const items = await listAllForAdmin(collection);
  const drafts = items.filter((i) => i.status !== "published");
  const published = items.filter((i) => i.status === "published");

  const thumbOf = (item: AdminItem) =>
    config.imagesModel === "gallery"
      ? ((item.images as string[] | undefined) ?? [])[0]
      : (item.lead as string | undefined);

  const nameOf = (item: AdminItem) => String(item[config.nameKey] ?? "—");

  const Row = ({ item }: { item: AdminItem }) => (
    <tr className="border-b border-charcoal/5 transition-colors hover:bg-ivory/60">
      <td className="p-3">
        <Link href={`/admin/${collection}/${item.slug}`} className="block">
          <span className="relative block h-12 w-16 overflow-hidden rounded-sm">
            <ContentImage src={thumbOf(item)} alt={nameOf(item)} sizes="64px" />
          </span>
        </Link>
      </td>
      <td className="p-3">
        <Link
          href={`/admin/${collection}/${item.slug}`}
          className="font-medium text-charcoal hover:text-red"
        >
          {nameOf(item)}
        </Link>
        <p className="text-xs text-ink/40">{item.slug}</p>
      </td>
      <td className="p-3">
        {item.status === "published" ? (
          <span className="inline-block rounded-sm bg-red/10 px-2 py-1 text-xs font-semibold text-red">
            Нийтлэгдсэн
          </span>
        ) : (
          <span className="inline-block rounded-sm bg-charcoal/10 px-2 py-1 text-xs font-semibold text-ink/60">
            Ноорог
          </span>
        )}
      </td>
      <td className="p-3">
        <PinControl
          collection={collection as never}
          slug={item.slug}
          pinned={item.pinned}
          pinnedOrder={item.pinnedOrder}
        />
      </td>
      <td className="p-3 text-xs text-ink/50">{formatDate(item.updatedAt)}</td>
      <td className="p-3">
        <RowActions collection={collection as never} slug={item.slug} />
      </td>
    </tr>
  );

  return (
    <div className="p-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            {config.title}
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            Нийт {items.length} · Нийтлэгдсэн {published.length} · Ноорог{" "}
            {drafts.length}
          </p>
        </div>
        <Link
          href={`/admin/${collection}/new`}
          className="inline-flex items-center gap-2 bg-red px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-red-deep"
        >
          + Шинэ нэмэх
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-sm border border-charcoal/10 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-charcoal/10 text-xs text-ink/50">
              <th className="p-3 font-medium">Зураг</th>
              <th className="p-3 font-medium">Гарчиг</th>
              <th className="p-3 font-medium">Төлөв</th>
              <th className="p-3 font-medium">Тогтоох</th>
              <th className="p-3 font-medium">Шинэчлэгдсэн</th>
              <th className="p-3 font-medium">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {drafts.map((item) => (
              <Row key={item.slug} item={item} />
            ))}
            {drafts.length > 0 && published.length > 0 && (
              <tr>
                <td colSpan={6} className="bg-ivory px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                  Нийтлэгдсэн
                </td>
              </tr>
            )}
            {published.map((item) => (
              <Row key={item.slug} item={item} />
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-ink/50">
                  Одоогоор мэдээлэл алга
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
