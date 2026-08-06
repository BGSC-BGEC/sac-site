// src/hooks/useDocumentTitle.ts
// Per-route <title> and meta description. No library — 8 lines.
// index.html ships the homepage values so crawlers that don't execute JS
// still get a correct document.
import { useEffect } from "react";

const SITE = "SAC Goa";

export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (!description) return;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", description);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title.replace(` · ${SITE}`, ""));
  }, [title, description]);
}
