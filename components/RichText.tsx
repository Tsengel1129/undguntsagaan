import { Fragment, type ReactNode } from "react";
import ContentImage from "./ContentImage";
import type { TiptapDoc, TiptapNode } from "@/lib/firebase/types";

/* Renders Tiptap JSON with the site's existing typography.
   Supported nodes: paragraph, heading (2/3), bold/italic/link marks,
   blockquote, image, bullet list, hard break. Unknown nodes render their
   children so imperfect content degrades gracefully instead of crashing. */

function renderInline(node: TiptapNode, key: number): ReactNode {
  if (node.type === "hardBreak") return <br key={key} />;
  if (node.type !== "text") return null;
  let el: ReactNode = node.text;
  for (const mark of node.marks ?? []) {
    if (mark.type === "bold") {
      el = <strong className="font-semibold text-charcoal">{el}</strong>;
    } else if (mark.type === "italic") {
      el = <em>{el}</em>;
    } else if (mark.type === "link") {
      el = (
        <a
          href={mark.attrs?.href ?? "#"}
          target="_blank"
          rel="noreferrer"
          className="text-red underline underline-offset-2 transition-colors hover:text-red-deep"
        >
          {el}
        </a>
      );
    }
  }
  return <Fragment key={key}>{el}</Fragment>;
}

function renderInlineChildren(node: TiptapNode): ReactNode {
  return (node.content ?? []).map((child, i) => renderInline(child, i));
}

function renderBlock(
  node: TiptapNode,
  key: number,
  pClassName: string
): ReactNode {
  switch (node.type) {
    case "paragraph":
      return (
        <p key={key} className={pClassName || undefined}>
          {renderInlineChildren(node)}
        </p>
      );
    case "heading": {
      const level = node.attrs?.level ?? 2;
      return level === 3 ? (
        <h3
          key={key}
          className="mb-3 mt-8 font-serif text-xl font-semibold text-charcoal md:text-2xl"
        >
          {renderInlineChildren(node)}
        </h3>
      ) : (
        <h2
          key={key}
          className="mb-4 mt-10 font-serif text-2xl font-semibold text-charcoal md:text-3xl"
        >
          {renderInlineChildren(node)}
        </h2>
      );
    }
    case "blockquote":
      return (
        <blockquote
          key={key}
          className="my-8 border-l-4 border-red pl-6 font-serif text-2xl font-medium leading-snug text-charcoal"
        >
          {(node.content ?? []).map((child, i) => renderBlock(child, i, ""))}
        </blockquote>
      );
    case "bulletList":
      return (
        <ul key={key} className={`list-disc space-y-2 pl-6 ${pClassName}`}>
          {(node.content ?? []).map((li, i) => (
            <li key={i}>
              {(li.content ?? []).map((child, j) => renderBlock(child, j, ""))}
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure key={key} className="my-8">
          <span className="relative block aspect-[16/10] overflow-hidden rounded-sm">
            <ContentImage
              src={node.attrs?.src}
              alt={node.attrs?.alt ?? ""}
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </span>
          {node.attrs?.title && (
            <figcaption className="mt-3 text-xs text-ink/50">
              {node.attrs.title}
            </figcaption>
          )}
        </figure>
      );
    default:
      return node.content ? (
        <Fragment key={key}>
          {node.content.map((child, i) => renderBlock(child, i, pClassName))}
        </Fragment>
      ) : null;
  }
}

export default function RichText({
  doc,
  nodes,
  pClassName = "mb-6",
}: {
  doc?: TiptapDoc | null;
  nodes?: TiptapNode[];
  /** Class applied to top-level paragraphs (pass "" when a `space-y-*` wrapper handles spacing). */
  pClassName?: string;
}) {
  const blocks = nodes ?? doc?.content ?? [];
  if (!blocks.length) return null;
  return <>{blocks.map((node, i) => renderBlock(node, i, pClassName))}</>;
}
