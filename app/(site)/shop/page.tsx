import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import StockSearch from "@/components/StockSearch";
import ProductGrid from "@/components/ProductGrid";
import { listProducts, listStock } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Дэлгүүр",
  description:
    "Адууны эрүүл мэнд, эм тариа, бусад бүтээгдэхүүн, малын эмийн сангийн лавлах ба үлдэгдэл шалгах.",
};

const CATEGORIES = [
  { href: "/shop/medicine", title: "Эрүүл мэнд & Эм тариа", desc: "Адууны эм, вакцин, тарианы бүтээгдэхүүн." },
  { href: "/shop/products", title: "Бусад бүтээгдэхүүн", desc: "Тоног хэрэгсэл болон холбогдох бараа." },
  { href: "/shop/pharmacies", title: "Малын эмийн сангууд", desc: "Байршил, утас, цагийн хуваарь, газрын зураг." },
];

export default async function ShopPage() {
  const [products, stock] = await Promise.all([listProducts(), listStock()]);
  const featured = products.slice(0, 6);

  return (
    <>
      <PageHeader
        eyebrow="Дэлгүүр"
        title="Дэлгүүр"
        intro="Адууны эрүүл мэнд, эм тариа, бусад бүтээгдэхүүн. Хөдөө орон нутгийн эмийн сангийн үлдэгдлийг нэрээр нь хайж болно."
      />

      <section className="mx-auto max-w-page space-y-14 px-5 py-16 md:px-8 md:py-24">
        <StockSearch stock={stock} />

        <div className="grid gap-4 sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-lg border border-charcoal/10 bg-cream p-6 transition-colors hover:border-red/40"
            >
              <h2 className="font-serif text-xl font-semibold text-charcoal transition-colors group-hover:text-red">
                {c.title}
              </h2>
              <p className="mt-2 text-sm text-ink/60">{c.desc}</p>
              <span className="mt-4 inline-block text-sm font-medium text-red">
                Үзэх →
              </span>
            </Link>
          ))}
        </div>

        {featured.length > 0 && (
          <div>
            <h2 className="mb-8 font-serif text-3xl font-semibold text-charcoal">
              Онцлох бүтээгдэхүүн
            </h2>
            <ProductGrid products={featured} />
          </div>
        )}
      </section>
    </>
  );
}
