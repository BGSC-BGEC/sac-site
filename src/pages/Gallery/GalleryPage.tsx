// src/pages/Gallery/GalleryPage.tsx

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getActivities, getGalleryCounts, getGallerySets } from "@/lib/content";
import { MediaFrame } from "@/components/primitives/MediaFrame";

function GalleryPage() {
  useDocumentTitle("Gallery · SAC Goa", "Photographs from practice sessions, tournaments and events across every SAC activity.");
  const activityCounts = getGalleryCounts("activity");

  return (
    <>
      <section
        className="mesh-teal relative isolate overflow-hidden bg-void
                   pt-[calc(4.5rem+clamp(2rem,6vh,4rem))] pb-[var(--space-section)]"
        style={{ "--mesh-strength": 0.35 } as React.CSSProperties}
      >
        <div className="relative z-10 mx-auto w-full max-w-(--container) px-(--gutter)">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-meta text-fg-muted">
              <li className="flex items-center gap-2">
                <Link to="/" className="hover:text-volt transition-colors">Home</Link>
                <span aria-hidden="true" className="text-fg-faint">/</span>
              </li>
              <li><span aria-current="page" className="text-fg">Gallery</span></li>
            </ol>
          </nav>
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">GALLERIES</p>
          <h1 className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[22ch]">
            Frames from the floor
          </h1>
          <p className="mt-6 max-w-[62ch] text-lead text-fg-muted">
            Practice, matches and finals, sorted by the space they happened in — plus a set for every event the SAC has run.
          </p>
          <p className="mt-6 text-meta text-fg-muted">{getActivities().length} activity sets · {getGallerySets("event").length} event sets</p>
        </div>
      </section>

      {/* Event galleries feature card */}
      <section className="bg-abyss section-y">
        <div className="shell">
          <Link to="/gallery/events" className="group block overflow-hidden rounded-2xl border border-line-volt bg-deep p-8 lg:p-12 transition-colors duration-(--dur-std) ease-out-quint hover:bg-raised">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-center">
              <div>
                <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">FEATURED SET</p>
                <h2 className="font-display text-display-l font-semibold leading-[0.92] tracking-[-0.03em] text-cream mb-4">
                  Event galleries
                </h2>
                <p className="text-lead text-fg-muted max-w-[52ch] mb-6">
                  Photographs from every SAC event — opening ceremonies, matches, heats and award ceremonies.
                </p>
                <span className="inline-flex min-h-12 items-center rounded-full bg-volt px-6 text-meta font-semibold text-ink">
                  Browse event galleries
                  <ArrowRight aria-hidden="true" className="ml-2 size-4" />
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {getGallerySets("event").slice(0, 3).flatMap((set) =>
                  set.images.slice(0, 1).map((img) => (
                    <MediaFrame
                      key={`${(set as { eventSlug: string }).eventSlug}-${img.id}`}
                      src={img.imageUrl}
                      alt=""
                      ratio="1/1"
                      radius="none"
                      width={200}
                      priority={false}
                      className="aspect-square overflow-hidden rounded-md"
                    />
                  ))
                )}
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Activity galleries grid */}
      <section className="bg-void section-y border-t border-line">
        <div className="shell">
          <h2 className="font-display text-title font-semibold tracking-[-0.03em] text-fg mb-6">Activity galleries</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getActivities().map((a) => {
              const count = activityCounts[a.slug] ?? 0;
              return (
                <li key={a.slug}>
                  <Link to={`/gallery/${a.slug}`} className="group block overflow-hidden rounded-lg border border-line bg-deep transition-colors duration-(--dur-std) ease-out-quint hover:border-line-strong motion-safe:hover:-translate-y-(--lift)">
                    <MediaFrame
                      src={a.coverImageUrl}
                      alt={a.name}
                      ratio="4/5"
                      radius="none"
                      width={560}
                      priority={false}
                      className="transition-transform duration-(--dur-slow) ease-out-quint motion-safe:group-hover:scale-[1.03]"
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-void to-transparent" />
                    <span className="absolute bottom-4 left-4 right-4">
                      <span className="font-display text-title font-semibold text-cream">{a.name}</span>
                      <span className="mt-1 block text-meta tabular-nums text-fg-faint">{count} frames</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* NextStep */}
      <section className="bg-abyss section-y border-t border-line">
        <div className="shell">
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">NEXT</p>
          <h2 className="font-display text-display-l font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[24ch] mb-6">
            Or read the schedule
          </h2>
          <ul className="space-y-3">
            <li>
              <Link to="/activities" className="group inline-flex min-h-12 items-center text-title text-fg hover:text-volt transition-colors">
                Activities
                <ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-1 transition-transform" />
              </Link>
            </li>
            <li>
              <Link to="/events" className="group inline-flex min-h-12 items-center text-title text-fg hover:text-volt transition-colors">
                Events
                <ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-1 transition-transform" />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default GalleryPage;
