"use client";

import { useRef } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import { uploadContentImage } from "@/lib/admin/upload";
import type { TiptapDoc } from "@/lib/firebase/types";

/* Rich-text editor for `body`. Toolbar: bold, italic, H2/H3, blockquote,
   bullet list, link, image (paste URL or upload to Firebase Storage). */

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded-sm border px-2.5 py-1 text-sm font-medium transition-colors ${
        active
          ? "border-red bg-red text-cream"
          : "border-charcoal/15 bg-white text-ink hover:border-red hover:text-red"
      }`}
    >
      {children}
    </button>
  );
}

export default function TiptapEditor({
  initial,
  onChange,
  collection,
  slug,
}: {
  initial: TiptapDoc | null;
  onChange: (doc: TiptapDoc) => void;
  collection: string;
  slug: string;
}) {
  const fileInput = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      TiptapImage,
    ],
    content: initial && initial.content?.length ? initial : "",
    immediatelyRender: false,
    onUpdate: ({ editor: e }) => onChange(e.getJSON() as TiptapDoc),
  });

  const setLink = (e: Editor) => {
    const prev = e.getAttributes("link").href as string | undefined;
    const url = window.prompt("Холбоосын URL:", prev ?? "https://");
    if (url === null) return;
    if (url === "" || url === "https://") {
      e.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    e.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const insertImageUrl = (e: Editor) => {
    const url = window.prompt("Зургийн URL:");
    if (url) e.chain().focus().setImage({ src: url }).run();
  };

  const uploadAndInsert = async (file: File) => {
    if (!editor) return;
    try {
      const url = await uploadContentImage(collection, slug, file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      window.alert(
        `Алдаа гарлаа: ${err instanceof Error ? err.message : "upload"}`
      );
    }
  };

  if (!editor) {
    return (
      <div className="min-h-[240px] animate-pulse rounded-sm border border-charcoal/15 bg-white" />
    );
  }

  return (
    <div className="admin-tiptap">
      <div className="flex flex-wrap gap-1.5 rounded-t-sm border border-b-0 border-charcoal/15 bg-ivory p-2">
        <ToolbarButton title="Тод" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton title="Налуу" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton title="Гарчиг 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </ToolbarButton>
        <ToolbarButton title="Гарчиг 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </ToolbarButton>
        <ToolbarButton title="Ишлэл" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          ❝
        </ToolbarButton>
        <ToolbarButton title="Жагсаалт" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • —
        </ToolbarButton>
        <ToolbarButton title="Холбоос" active={editor.isActive("link")} onClick={() => setLink(editor)}>
          🔗
        </ToolbarButton>
        <span className="mx-1 w-px bg-charcoal/10" />
        <ToolbarButton title="Зураг (URL)" onClick={() => insertImageUrl(editor)}>
          Зураг URL
        </ToolbarButton>
        <ToolbarButton title="Зураг оруулах" onClick={() => fileInput.current?.click()}>
          Зураг ⬆
        </ToolbarButton>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) uploadAndInsert(f);
            e.target.value = "";
          }}
        />
      </div>
      <EditorContent
        editor={editor}
        className="rounded-b-sm border border-charcoal/15 bg-white"
      />
    </div>
  );
}
