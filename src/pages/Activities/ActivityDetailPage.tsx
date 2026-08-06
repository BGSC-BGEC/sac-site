// src/pages/Activities/ActivityDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import { getActivityBySlug, getActivitiesByCategory, getGalleryCounts } from "@/lib/content";
import { formatTime, formatRange, activityHours } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import NotFoundPage from "@/pages/NotFoundPage";
import { ArrowRight } from "lucide-react";

function ActivityDetailPage() {
  const { slug } = useParams();
  const activity = slug ? getActivityBySlug(slug) : undefined;

  useDocumentTitle(
    activity ? `${activity.name} · Activities · SAC Goa` : "Not found · Activities · SAC Goa",
    activity ? `${activity.description} Timings, facilities and photos for ${activity.name} at SAC Goa.` : undefined,
  );

  if (!activity) return <NotFoundPage kind="activity" />;

  const t = activity.timings[0];
  const galleryCount = getGalleryCounts("activity")[activity.slug] ?? 0;
  const siblings = getActivitiesByCategory(activity.category)
    .filter((a) => a.slug !== activity.slug)
    .slice(0, 3);

  const crumbs = [
    { label: "Home", to: "/" },
    { label: "Activities", to: "/activities" },
  ];

  return (
    <>
      {/* PageIntro */}
      <section
        className="mesh-teal relative isolate overflow-hidden bg-void
                   pt-[calc(4.5rem+clamp(2rem,6vh,4rem))] pb-[var(--space-section)]"
        style={{ "--mesh-strength": 0.35 } as React.CSSProperties}
      >
        <div className="relative z-10 mx-auto w-full max-w-(--container) px-(--gutter)">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-meta text-fg-muted">
              {crumbs.map((c) => (
                <li key={c.to} className="flex items-center gap-2">
                  <Link to={c.to} className="hover:text-volt transition-colors">{c.label}</Link>
                  <span aria-hidden="true" className="text-fg-faint">/</span>
                </li>
              ))}
              <li><span aria-current="page" className="text-fg">{activity.name}</span></li>
            </ol>
          </nav>
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">{activity.category}</p>
          <h1 className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[22ch]">
            {activity.name}
          </h1>
          {activity.description && (
            <p className="mt-6 max-w-[62ch] text-lead text-fg-muted">{activity.description}</p>
          )}
          <p className="mt-6 text-meta text-fg-muted">
            {galleryCount} frames · Hours · Mon
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              to={`/gallery/${activity.slug}`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-volt px-6 text-body font-medium text-ink transition-[transform,box-shadow] duration-(--dur-fast) ease-out-quint motion-safe:hover:-translate-y-(--lift) hover:shadow-glow"
            >
              Open gallery
            </Link>
            <Link
              to="/activities"
              className="inline-flex h-12 items-center justify-center rounded-full border border-line-strong px-6 text-body text-fg transition-colors duration-(--dur-fast) ease-out-quint hover:border-line-volt hover:bg-raised"
            >
              All activities
            </Link>
          </div>
        </div>
      </section>

      {/* Hours panel */}
      <section className="bg-abyss section-y">
        <div className="shell">
          <h2 className="text-eyebrow uppercase tracking-[0.2em] text-fg-muted mb-6">Hours</h2>
          {t ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <p className="text-eyebrow uppercase tracking-[0.2em] text-fg-faint mb-2">Opens</p>
                <p className="font-display text-display-m font-semibold tabular-nums text-volt">{formatTime(t.openTime)}</p>
              </div>
              <div>
                <p className="text-eyebrow uppercase tracking-[0.2em] text-fg-faint mb-2">Closes</p>
                <p className="font-display text-display-m font-semibold tabular-nums text-volt">{formatTime(t.closeTime)}</p>
              </div>
              <div>
                <p className="text-eyebrow uppercase tracking-[0.2em] text-fg-faint mb-2">Window</p>
                <p className="font-display text-display-m font-semibold tabular-nums text-volt">{formatRange(t)}</p>
              </div>
            </div>
          ) : (
            <p className="text-body text-fg-muted">Hours not listed.</p>
          )}
          <p className="mt-6 text-meta text-fg-muted">
            Monday schedule. Other days are not in the current data set.
          </p>
          <p className="mt-2 text-meta text-fg-muted">
            Full hours: {activityHours(activity)}
          </p>
        </div>
      </section>

      {/* Siblings */}
      <section className="bg-void section-y border-t border-line">
        <div className="shell">
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">KEEP GOING</p>
          <h2 className="font-display text-display-l font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[24ch] mb-8">
            More {activity.category}
          </h2>
          <ul className="space-y-3">
            {siblings.map((a) => (
              <li key={a.id}>
                <Link to={`/activities/${a.slug}`} className="group inline-flex min-h-12 items-center text-title text-fg hover:text-volt transition-colors">
                  {a.name}
                  <ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default ActivityDetailPage;
