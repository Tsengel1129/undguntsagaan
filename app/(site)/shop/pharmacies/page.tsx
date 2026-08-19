import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PharmacyMap from "@/components/PharmacyMap";
import { listPharmacies } from "@/lib/firebase/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Малын эмийн сангууд",
  description:
    "Малын эмийн сангуудын байршил, утас, цагийн хуваарь, газрын зураг.",
};

export default async function PharmaciesPage() {
  const pharmacies = await listPharmacies();

  return (
    <>
      <PageHeader
        eyebrow="Дэлгүүр"
        title="Малын эмийн сангууд"
        intro="Байршил, утасны дугаар, ажиллах цагийн хуваарийг нэг дороос."
      />

      <section className="mx-auto max-w-page space-y-10 px-5 py-16 md:px-8 md:py-24">
        {pharmacies.length === 0 ? (
          <p className="text-base text-ink/60">Одоогоор эмийн сан бүртгэгдээгүй байна</p>
        ) : (
          <>
            <PharmacyMap pharmacies={pharmacies} />

            <ul className="grid gap-6 md:grid-cols-2">
              {pharmacies.map((p) => (
                <li
                  key={p.slug}
                  className="rounded-lg border border-charcoal/10 bg-cream p-6"
                >
                  <h2 className="font-serif text-xl font-semibold text-charcoal">
                    {p.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-red">
                    {[p.aimag, p.sum].filter(Boolean).join(", ")}
                  </p>
                  {p.address && (
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {p.address}
                    </p>
                  )}
                  <dl className="mt-4 space-y-1.5 text-sm">
                    {p.phone && (
                      <div className="flex gap-2">
                        <dt className="text-ink/45">Утас:</dt>
                        <dd>
                          <a href={`tel:${p.phone}`} className="text-red hover:underline">
                            {p.phone}
                          </a>
                        </dd>
                      </div>
                    )}
                    {p.hours && (
                      <div className="flex gap-2">
                        <dt className="text-ink/45">Цаг:</dt>
                        <dd className="text-charcoal">{p.hours}</dd>
                      </div>
                    )}
                  </dl>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
