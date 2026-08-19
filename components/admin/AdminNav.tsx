"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client";
import { confirmLeaveIfDirty } from "@/lib/admin/dirty";

const NAV = [
  { href: "/admin/homepage", label: "Нүүр хуудас" },
  { href: "/admin/texts", label: "Сайтын текст" },
  { href: "/admin/racehorses", label: "Адуу" },
  { href: "/admin/trainers", label: "Уяачид" },
  { href: "/admin/treasures", label: "Өв соёл" },
  { href: "/admin/articles", label: "Сэтгүүл" },
  { href: "/admin/issues", label: "Сэтгүүлийн дугаарууд" },
  { href: "/admin/products", label: "Дэлгүүр — бүтээгдэхүүн" },
  { href: "/admin/pharmacies", label: "Малын эмийн сангууд" },
  { href: "/admin/stock", label: "Эмийн үлдэгдэл" },
  { href: "/admin/settings", label: "Тохиргоо" },
];

export default function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const guard = (e: React.MouseEvent) => {
    if (!confirmLeaveIfDirty()) e.preventDefault();
  };

  const doSignOut = async () => {
    if (!confirmLeaveIfDirty()) return;
    try {
      await signOut(getClientAuth());
    } catch {
      /* client SDK unconfigured — cookie clear below is enough */
    }
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-charcoal/10 bg-white">
      {/* Plain <a>: guaranteed native new-tab behavior, no router interception */}
      <a
        href="/"
        target="_blank"
        rel="noopener"
        title="Үндсэн сайтыг шинэ хуудсанд нээх"
        className="group block cursor-pointer border-b border-charcoal/10 p-6"
      >
        <p className="eyebrow text-[10px] text-red">Админ</p>
        <p className="mt-1 font-serif text-2xl font-semibold text-charcoal transition-colors group-hover:text-red">
          Ухаантай Морь
          <span className="ml-1 align-super text-xs text-ink/40 transition-colors group-hover:text-red">↗</span>
        </p>
      </a>
      <nav className="flex-1 p-3">
        {NAV.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={guard}
              className={`block rounded-sm px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-red text-cream"
                  : "text-ink hover:bg-ivory hover:text-red"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-charcoal/10 p-4">
        <p className="truncate text-xs text-ink/50">{email}</p>
        <button
          type="button"
          onClick={doSignOut}
          className="mt-2 text-sm font-semibold text-red hover:text-red-deep"
        >
          Гарах
        </button>
        <Link
          href="/"
          className="mt-2 block text-xs text-ink/50 hover:text-red"
          target="_blank"
        >
          Сайтыг харах ↗
        </Link>
      </div>
    </aside>
  );
}
