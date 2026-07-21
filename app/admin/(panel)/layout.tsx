import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import SessionRefresher from "@/components/admin/SessionRefresher";
import SignOutOnly from "@/components/admin/SignOutOnly";
import ToastHost from "@/components/admin/ToastHost";
import { getAdminSession } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

/* Server-side gate for every /admin page (except /admin/login, which sits
   outside this route group). */
export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (session.status === "none") redirect("/admin/login");

  if (session.status === "denied") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory px-5">
        <div className="w-full max-w-sm rounded-sm border border-charcoal/10 bg-white p-10 text-center">
          <h1 className="font-serif text-3xl font-semibold text-charcoal">
            Хандах эрхгүй байна
          </h1>
          <p className="mt-3 text-sm text-ink/60">{session.email}</p>
          <SignOutOnly />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-ivory text-ink">
      <SessionRefresher />
      <ToastHost />
      <AdminNav email={session.email} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
