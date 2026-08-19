import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProductGrid from "@/components/ProductGrid";
import { listProductsByCategory } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = { title: "Бусад бүтээгдэхүүн" };

export default async function ShopProductsPage() {
  const products = await listProductsByCategory("Бусад бүтээгдэхүүн");
  return (
    <>
      <PageHeader
        eyebrow="Дэлгүүр"
        title="Бусад бүтээгдэхүүн"
        intro="Тоног хэрэгсэл болон холбогдох бараа."
      />
      <section className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <ProductGrid products={products} />
      </section>
    </>
  );
}
