import TextsForm from "@/components/admin/TextsForm";
import { getSiteTexts } from "@/lib/firebase/queries";

export const dynamic = "force-dynamic";

export default async function AdminTextsPage() {
  const texts = await getSiteTexts();
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-2 font-serif text-3xl font-semibold text-charcoal">
        Сайтын текст
      </h1>
      <p className="mb-6 text-sm text-ink/60">
        Нүүр болон бусад хуудсын гарчиг, товч, тайлбар текстүүд ба том зургууд.
      </p>
      <TextsForm initial={texts} />
    </div>
  );
}
