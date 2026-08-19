import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ContentImage from "@/components/ContentImage";
import RichText from "@/components/RichText";
import { Gallery } from "@/components/editorial";
import { getProduct, listProducts } from "@/lib/firebase/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Бүтээгдэхүүн олдсонгүй" };
  return { title: product.name, description: product.summary };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const backHref =
    product.category === "Эм тариа" ? "/shop/medicine" : "/shop/products";

  return (
    <article className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
      <Link href={backHref} className="text-sm font-semibold text-red">
        ← {product.category || "Дэлгүүр"}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div className="relative aspect-square overflow-hidden rounded-lg border border-charcoal/10 bg-cream">
            <ContentImage
              src={product.images?.[0]}
              alt={product.name}
              fit="cover"
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="eyebrow text-xs text-red">
            {product.brand || product.category}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-charcoal md:text-5xl">
            {product.name}
          </h1>
          {product.price > 0 && (
            <p className="mt-4 text-2xl font-semibold text-charcoal">
              {Number(product.price).toLocaleString()}₮
              {product.unit && (
                <span className="ml-1 text-base font-normal text-ink/50">
                  / {product.unit}
                </span>
              )}
            </p>
          )}
          <p className="mt-5 text-base leading-relaxed text-ink/75">
            {product.summary}
          </p>

          <div className="mt-7 rounded-sm border border-charcoal/10 bg-cream p-4 text-sm text-ink/70">
            Худалдан авахыг хүсвэл{" "}
            <Link href="/shop/pharmacies" className="font-medium text-red">
              малын эмийн сан
            </Link>
            -гаас үлдэгдлийг шалгаж, холбогдоно уу. Онлайн захиалга удахгүй
            нэмэгдэнэ.
          </div>
        </Reveal>
      </div>

      {/* Body */}
      {product.body && (
        <div className="mt-14 max-w-2xl space-y-6 text-base leading-relaxed text-ink/80">
          <RichText doc={product.body} pClassName="" />
        </div>
      )}

      {/* Gallery */}
      {product.images && product.images.length > 1 && (
        <div className="mt-14">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-charcoal">
            Зургууд
          </h2>
          <Gallery images={product.images.slice(1)} alt={product.name} />
        </div>
      )}
    </article>
  );
}
