import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProductGrid from "@/components/ProductGrid";
import { listProductsByCategory } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = { title: "Эрүүл мэнд & Эм тариа" };

export default async function ShopMedicinePage() {
  const products = await listProductsByCategory("Эм тариа");
  return (
    <>
      <PageHeader
        eyebrow="Дэлгүүр"
        title="Эрүүл мэнд & Эм тариа"
        intro="Адууны эм, вакцин, тарианы бүтээгдэхүүн."
      />
      <section className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <ProductGrid products={products} />
      </section>
    </>
  );
}
