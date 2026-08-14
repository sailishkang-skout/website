"use client";

import type { ReactNode } from "react";
import Link from "next/link";

function isInternalHref(href: string): boolean {
  return href.startsWith("/") || /skoutai\.io/i.test(href);
}

function toInternalPath(href: string): string {
  if (href.startsWith("/")) return href;
  try {
    const u = new URL(href);
    return `${u.pathname}${u.search}${u.hash}` || "/";
  } catch {
    return href;
  }
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern =
    /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|(https?:\/\/[^\s)]+))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[2]) {
      nodes.push(
        <strong key={key++} className="font-semibold">
          {match[2]}
        </strong>
      );
    } else if (match[3] && match[4]) {
      const href = match[4];
      const label = match[3];
      if (isInternalHref(href)) {
        nodes.push(
          <Link
            key={key++}
            href={toInternalPath(href)}
            className="font-medium text-indigo-600 underline underline-offset-2"
          >
            {label}
          </Link>
        );
      } else {
        nodes.push(
          <a
            key={key++}
            href={href}
            className="font-medium text-indigo-600 underline underline-offset-2"
            target="_blank"
            rel="noreferrer"
          >
            {label}
          </a>
        );
      }
    } else if (match[5]) {
      const href = match[5];
      nodes.push(
        isInternalHref(href) ? (
          <Link
            key={key++}
            href={toInternalPath(href)}
            className="font-medium text-indigo-600 underline underline-offset-2"
          >
            {toInternalPath(href)}
          </Link>
        ) : (
          <span key={key++}>{href}</span>
        )
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function isListBlock(block: string): boolean {
  const lines = block.split("\n").filter((l) => l.trim());
  return lines.length > 0 && lines.every((l) => /^\s*([-*]|\d+\.)\s+/.test(l));
}

export function DexterMarkdown({ content }: { content: string }) {
  const blocks = content.trim().split(/\n{2,}/);
  return (
    <div className="space-y-2 text-left text-sm leading-relaxed">
      {blocks.map((block, i) => {
        if (isListBlock(block)) {
          const items = block
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean)
            .map((l) => l.replace(/^\s*([-*]|\d+\.)\s+/, ""));
          const ordered = /^\s*\d+\./.test(block.trim());
          const List = ordered ? "ol" : "ul";
          return (
            <List
              key={i}
              className={
                ordered
                  ? "list-decimal space-y-1 pl-5"
                  : "list-disc space-y-1 pl-5"
              }
            >
              {items.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </List>
          );
        }
        return (
          <p key={i} className="whitespace-pre-wrap">
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}
