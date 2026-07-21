import HomepageForm from "@/components/admin/HomepageForm";
import {
  getHomepageSettings,
  listArticles,
  listRacehorses,
} from "@/lib/firebase/queries";

export const dynamic = "force-dynamic";

export default async function AdminHomepagePage() {
  const [settings, horses, articles] = await Promise.all([
    getHomepageSettings(),
    listRacehorses(),
    listArticles(),
  ]);

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 font-serif text-3xl font-semibold text-charcoal">
        Нүүр хуудас
      </h1>
      <HomepageForm
        initial={settings}
        horses={horses.map((h) => ({ slug: h.slug, label: h.name }))}
        articles={articles.map((a) => ({ slug: a.slug, label: a.title }))}
      />
    </div>
  );
}
