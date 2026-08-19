import { StandardCard } from "@/components/editorial";
import type { Product } from "@/lib/firebase/queries";

/* Shared product grid for the shop category pages. Server component — the
   cards are the (client) StandardCard, so no extra client boundary here. */
export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="text-base text-ink/60">Одоогоор бүтээгдэхүүн алга</p>;
  }
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p, i) => (
        <StandardCard
          key={p.slug}
          href={`/shop/${p.slug}`}
          image={p.images?.[0]}
          eyebrow={p.brand || p.category}
          title={p.name}
          meta={p.price ? `${Number(p.price).toLocaleString()}₮` : ""}
          text={p.summary}
          aspect="square"
          delay={(i % 3) * 0.07}
        />
      ))}
    </div>
  );
}
