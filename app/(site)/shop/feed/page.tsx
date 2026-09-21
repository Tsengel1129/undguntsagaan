import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProductGrid from "@/components/ProductGrid";
import { listProductsByCategory } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = { title: "Тэжээл" };

export default async function ShopFeedPage() {
  const products = await listProductsByCategory("Тэжээл");
  return (
    <>
      <PageHeader
        eyebrow="Дэлгүүр"
        title="Тэжээл"
        intro="Адуу, малын тэжээл болон нэмэлт тэжээлийн бүтээгдэхүүн."
      />
      <section className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <ProductGrid products={products} />
      </section>
    </>
  );
}
