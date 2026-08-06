// src/pages/NotFoundPage.tsx

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
// Serves the catch-all *and* the five bad-slug branches.
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type Kind = "route" | "activity" | "event" | "people";

const COPY: Record<Kind, { crumb?: { label: string; to: string }; title: string; lead: string }> = {
  route:    { title: "This page is not on the map",
              lead: "The link you followed does not match anything on the SAC site." },
  activity: { crumb: { label: "Activities", to: "/activities" },
              title: "No such activity",
              lead: "The SAC runs five activities and this is not one of them." },
  event:    { crumb: { label: "Events", to: "/events" },
              title: "No such event",
              lead: "That event is not in the SAC calendar." },
  people:   { crumb: { label: "People", to: "/people" },
              title: "No such group",
              lead: "The SAC lists faculty in-charges and the student committee." },
};

const SITEMAP = [
  { label: "Activities", to: "/activities" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Event galleries", to: "/gallery/events" },
  { label: "People", to: "/people" },
  { label: "Achievements", to: "/achievements" },
  { label: "Stats", to: "/stats" },
  { label: "Contact", to: "/contact" },
];

const NotFoundPage = ({ kind = "route" }: { kind?: Kind }) => {
  const c = COPY[kind];
  useDocumentTitle("Page not found · SAC Goa", "That page does not exist. Browse activities, events, the gallery or achievements at SAC Goa.");
  const crumbs = [
    { label: "Home", to: "/" },
    ...(c.crumb ? [c.crumb] : []),
  ];
  return (
    <section className="mesh-volt relative isolate overflow-hidden min-h-[100svh]
                         pt-[calc(4.5rem+clamp(2rem,6vh,4rem))] pb-[clamp(5.5rem,10vh,7rem)]"
             style={{ "--mesh-strength": 0.25 } as React.CSSProperties}>
      <div className="relative z-10 mx-auto w-full max-w-[var(--container)] px-[var(--gutter)]">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-meta text-fg-muted">
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-2">
                <Link to={crumb.to} className="hover:text-volt transition-colors">{crumb.label}</Link>
                {i < crumbs.length - 1 && <span aria-hidden="true" className="text-fg-faint">/</span>}
              </li>
            ))}
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="text-fg-faint">/</span>
              <span aria-current="page" className="text-fg">Not found</span>
            </li>
          </ol>
        </nav>

        <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">404</p>
        <h1 className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[22ch]">
          {c.title}
        </h1>
        <p className="mt-6 max-w-[62ch] text-lead text-fg-muted">
          {c.lead} Everything the site does have is listed below.
        </p>

        <div className="mt-10">
          <Link to="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-volt px-6
                       text-body font-medium text-ink transition-colors duration-(--dur-fast)
                       ease-out-quint hover:bg-cream">
            Back to home
          </Link>
        </div>

        <ul className="mt-16 divide-y divide-line border-t border-line">
          {SITEMAP.map((item) => (
            <li key={item.to}>
              <Link to={item.to}
                className="group flex min-h-12 items-center justify-between py-4
                           text-title font-display font-semibold tracking-[-0.03em] text-fg
                           transition-colors duration-(--dur-fast) ease-out-quint hover:text-volt">
                {item.label}
                <ArrowRight aria-hidden="true"
                  className="size-4 text-volt transition-transform duration-(--dur-fast)
                             ease-out-quint group-hover:translate-x-(--lift)" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NotFoundPage;
