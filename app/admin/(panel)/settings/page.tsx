import PasswordForm from "@/components/admin/PasswordForm";
import SettingsForm from "@/components/admin/SettingsForm";
import { getSiteSettings } from "@/lib/firebase/queries";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 font-serif text-3xl font-semibold text-charcoal">
        Тохиргоо
      </h1>
      <SettingsForm initial={settings} />
      <div className="mt-6">
        <PasswordForm />
      </div>
    </div>
  );
}
