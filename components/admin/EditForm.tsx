"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { StandardCard } from "@/components/editorial";
import ImageRows from "@/components/admin/ImageRows";
import PinControl from "@/components/admin/PinControl";
import TiptapEditor from "@/components/admin/TiptapEditor";
import {
  deleteItem,
  publishItem,
  saveItem,
  unpublishItem,
} from "@/app/admin/(panel)/actions";
import type { AdminItem } from "@/lib/firebase/adminQueries";
import {
  COLLECTION_CONFIGS,
  EMPTY_DOC,
  slugify,
  type CollectionKey,
  type FieldDef,
} from "@/lib/admin/schema";
import { isDirty, setDirty } from "@/lib/admin/dirty";
import { toast } from "@/lib/admin/toast";
import type { TiptapDoc } from "@/lib/firebase/types";

type Values = Record<string, unknown>;

function Counter({ value, guideline }: { value: string; guideline?: number }) {
  if (!guideline) return null;
  const len = value.length;
  const over = len > guideline;
  return (
    <p className={`mt-1 text-xs ${over ? "font-semibold text-gold-deep" : "text-ink/40"}`}>
      {len}/{guideline}
    </p>
  );
}

function Field({
  def,
  value,
  onChange,
}: {
  def: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const common =
    "w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 text-sm text-charcoal focus:border-red focus:outline-none";
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-charcoal">
        {def.label}
      </label>
      {def.type === "textarea" ? (
        <textarea
          value={String(value ?? "")}
          rows={3}
          onChange={(e) => onChange(e.target.value)}
          className={common}
        />
      ) : def.type === "select" ? (
        <select
          value={String(value ?? def.options?.[0] ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className={common}
        >
          {def.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={def.type === "number" ? "number" : "text"}
          value={def.type === "number" ? Number(value ?? 0) : String(value ?? "")}
          onChange={(e) =>
            onChange(def.type === "number" ? e.target.value : e.target.value)
          }
          className={common}
        />
      )}
      {def.type !== "number" && (
        <Counter value={String(value ?? "")} guideline={def.guideline} />
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-sm border border-charcoal/10 bg-white p-6">
      <h2 className="mb-5 font-serif text-xl font-semibold text-charcoal">
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export default function EditForm({
  collection,
  initial,
}: {
  collection: CollectionKey;
  initial: AdminItem | null;
}) {
  const router = useRouter();
  const config = COLLECTION_CONFIGS[collection];
  // A form created in this session flips to edit mode after its first save
  // WITHOUT navigating (navigation would unmount the toast and re-arm the
  // create path, producing duplicate "-2" slugs on retry).
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const isNew = initial === null && createdSlug === null;
  const savedSlug = initial?.slug ?? createdSlug;

  const [values, setValues] = useState<Values>(() => {
    if (initial) return { ...initial };
    const v: Values = { body: EMPTY_DOC };
    for (const f of config.fields) v[f.key] = f.type === "number" ? 0 : "";
    if (config.imagesModel === "gallery") v.images = [];
    else {
      v.lead = "";
      v.inlineImages = [];
    }
    return v;
  });
  const [slugInput, setSlugInput] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(false);
  const [status, setStatus] = useState(initial?.status ?? "draft");
  const [busy, setBusy] = useState(false);

  const name = String(values[config.nameKey] ?? "");
  const effectiveSlug =
    savedSlug ??
    (slugTouched && slugInput ? slugify(slugInput) : slugify(name || ""));

  // Unsaved-changes warning (tab close / reload); nav links check the flag.
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!isDirty()) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
      setDirty(false);
    };
  }, []);

  const update = (key: string, v: unknown) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setDirty(true);
  };

  // Toasts render in the layout-level ToastHost so they survive the remount
  // caused by the first save's URL change.
  const showToast = toast;

  const doSave = async (): Promise<string | null> => {
    setBusy(true);
    const res = await saveItem(collection, savedSlug, {
      ...values,
      slug: effectiveSlug,
    });
    setBusy(false);
    if (!res.ok) {
      showToast(`Алдаа гарлаа: ${res.error}`, true);
      return null;
    }
    setDirty(false);
    const finalSlug = res.slug ?? savedSlug ?? effectiveSlug;
    if (!savedSlug) {
      setCreatedSlug(finalSlug);
      // Cosmetic URL update only — a real navigation would unmount the form.
      window.history.replaceState(null, "", `/admin/${collection}/${finalSlug}`);
    }
    return finalSlug;
  };

  const onSave = async () => {
    const saved = await doSave();
    if (!saved) return;
    showToast("Хадгалагдлаа");
  };

  const onPublish = async () => {
    const saved = await doSave();
    if (!saved) return;
    setBusy(true);
    const res = await publishItem(collection, saved);
    setBusy(false);
    if (!res.ok) {
      showToast(`Алдаа гарлаа: ${res.error}`, true);
      return;
    }
    setStatus("published");
    showToast("Нийтлэгдлээ");
  };

  const onUnpublish = async () => {
    if (!savedSlug) return;
    setBusy(true);
    const res = await unpublishItem(collection, savedSlug);
    setBusy(false);
    if (!res.ok) return showToast(`Алдаа гарлаа: ${res.error}`, true);
    setStatus("draft");
    showToast("Ноорог боллоо");
  };

  const onDelete = async () => {
    if (!savedSlug) return;
    if (!window.confirm("Устгахдаа итгэлтэй байна уу?")) return;
    setBusy(true);
    const res = await deleteItem(collection, savedSlug);
    setBusy(false);
    if (!res.ok) return showToast(`Алдаа гарлаа: ${res.error}`, true);
    setDirty(false);
    router.push(`/admin/${collection}`);
    router.refresh();
  };

  const basicFields = config.fields.filter((f) => f.section === "basic");
  const detailFields = config.fields.filter((f) => f.section === "details");

  const previewImage =
    config.imagesModel === "gallery"
      ? ((values.images as string[] | undefined) ?? [])[0]
      : (values.lead as string | undefined);

  const previewProps = useMemo(
    () => ({
      eyebrow: config.preview.eyebrow(values),
      meta: config.preview.meta(values),
      badge: config.preview.badge?.(values),
    }),
    [config, values]
  );

  return (
    <div className="mx-auto max-w-3xl p-8 pb-32">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-ink/50">
        <Link href={`/admin/${collection}`} className="hover:text-red">
          {config.title}
        </Link>
        <span className="mx-2">→</span>
        <span className="text-charcoal">{name || "Шинэ"}</span>
      </nav>

      <div className="space-y-6">
        {/* ── Үндсэн мэдээлэл ── */}
        <Section title="Үндсэн мэдээлэл">
          {basicFields.map((f) => (
            <Field
              key={f.key}
              def={f}
              value={values[f.key]}
              onChange={(v) => update(f.key, v)}
            />
          ))}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">
              Slug (URL хаяг)
            </label>
            {isNew ? (
              <input
                type="text"
                value={slugTouched ? slugInput : effectiveSlug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlugInput(e.target.value);
                }}
                className="w-full rounded-sm border border-charcoal/15 bg-white px-3 py-2.5 font-mono text-sm"
              />
            ) : (
              <p className="rounded-sm border border-charcoal/10 bg-ivory px-3 py-2.5 font-mono text-sm text-ink/60">
                {savedSlug}
              </p>
            )}
            <p className="mt-1 text-xs text-ink/40">
              {isNew
                ? "Гарчигнаас автоматаар үүснэ; зөвхөн шинээр үүсгэхэд засна."
                : "Slug-ийг нийтлэгдсэн хойно өөрчлөх боломжгүй."}
            </p>
          </div>
        </Section>

        {/* ── Зураг ── */}
        <Section title="Зураг">
          {config.imagesModel === "gallery" ? (
            <ImageRows
              label="Нүүр (эхний мөр) + цомгийн зургууд"
              values={(values.images as string[] | undefined) ?? []}
              onChange={(next) => update("images", next)}
              heroBadge
              collection={collection}
              slug={effectiveSlug}
            />
          ) : (
            <>
              <ImageRows
                label="Нүүр зураг (lead)"
                values={values.lead ? [String(values.lead)] : []}
                onChange={(next) => update("lead", next[0] ?? "")}
                single
                collection={collection}
                slug={effectiveSlug}
              />
              <ImageRows
                label="Нийтлэл доторх зургууд (inline)"
                values={(values.inlineImages as string[] | undefined) ?? []}
                onChange={(next) => update("inlineImages", next)}
                collection={collection}
                slug={effectiveSlug}
              />
            </>
          )}
        </Section>

        {/* ── Дэлгэрэнгүй ── */}
        <Section title="Дэлгэрэнгүй">
          {detailFields.map((f) => (
            <Field
              key={f.key}
              def={f}
              value={values[f.key]}
              onChange={(v) => update(f.key, v)}
            />
          ))}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal">
              Нийтлэлийн эх (body)
            </label>
            <TiptapEditor
              initial={(values.body as TiptapDoc) ?? null}
              onChange={(doc) => update("body", doc)}
              collection={collection}
              slug={effectiveSlug}
            />
          </div>
        </Section>

        {/* ── Нийтлэлт ── */}
        <Section title="Нийтлэлт">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <p className="text-sm font-medium text-charcoal">Төлөв</p>
              <p className="mt-1">
                {status === "published" ? (
                  <span className="rounded-sm bg-red/10 px-2 py-1 text-xs font-semibold text-red">
                    Нийтлэгдсэн
                  </span>
                ) : (
                  <span className="rounded-sm bg-charcoal/10 px-2 py-1 text-xs font-semibold text-ink/60">
                    Ноорог
                  </span>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-charcoal">Тогтоох</p>
              <div className="mt-1">
                {!savedSlug ? (
                  <p className="text-xs text-ink/40">Хадгалсны дараа боломжтой.</p>
                ) : (
                  <PinControl
                    collection={collection}
                    slug={savedSlug}
                    pinned={Boolean(initial?.pinned)}
                    pinnedOrder={Number(initial?.pinnedOrder ?? 0)}
                  />
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* ── Урьдчилан харах ── */}
        <Section title="Урьдчилан харах">
          <p className="-mt-3 text-xs text-ink/40">
            Нийтийн жагсаалтад яг ингэж харагдана.
          </p>
          <div className="max-w-sm">
            <StandardCard
              href="#"
              image={previewImage}
              eyebrow={previewProps.eyebrow}
              title={name || "Гарчиг"}
              meta={previewProps.meta}
              text={String(values[config.summaryKey] ?? "")}
              badge={previewProps.badge}
            />
          </div>
        </Section>
      </div>

      {/* Sticky action bar */}
      <div className="fixed bottom-0 left-64 right-0 z-20 border-t border-charcoal/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-8 py-4">
          <button
            type="button"
            onClick={onSave}
            disabled={busy}
            className="bg-red px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-red-deep disabled:opacity-50"
          >
            Хадгалах
          </button>
          <button
            type="button"
            onClick={onPublish}
            disabled={busy}
            className="border border-red px-6 py-2.5 text-sm font-semibold text-red transition-colors hover:bg-red hover:text-cream disabled:opacity-50"
          >
            Нийтлэх
          </button>
          {!isNew && status === "published" && (
            <button
              type="button"
              onClick={onUnpublish}
              disabled={busy}
              className="border border-charcoal/20 px-4 py-2.5 text-sm font-semibold text-ink/70 transition-colors hover:border-charcoal disabled:opacity-50"
            >
              Ноорог болгох
            </button>
          )}
          <span className="flex-1" />
          {!isNew && (
            <button
              type="button"
              onClick={onDelete}
              disabled={busy}
              className="px-4 py-2.5 text-sm font-semibold text-red/80 transition-colors hover:text-red disabled:opacity-50"
            >
              Устгах
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
