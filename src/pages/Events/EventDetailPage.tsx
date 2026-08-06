// src/pages/Events/EventDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getEventBySlug, getGalleryCounts, eventStatus } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import NotFoundPage from "@/pages/NotFoundPage";

function EventDetailPage() {
  const { slug } = useParams();
  const event = slug ? getEventBySlug(slug) : undefined;

  useDocumentTitle(
    event ? `${event.title} · Events · SAC Goa` : "Not found · Events · SAC Goa",
    event ? `${event.description} ${formatDate(event.startDate)} at ${event.venue}.` : undefined,
  );

  if (!event) return <NotFoundPage kind="event" />;

  const status = eventStatus(event);
  const galleryCount = getGalleryCounts("event")[event.slug] ?? 0;
  const statusLabel = status === "today" ? "Happening today" : status === "upcoming" ? "Upcoming" : "Concluded";
  const eyebrow = status === "today" ? "TODAY" : status === "upcoming" ? "UPCOMING" : "ALREADY RUN";

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
              <li className="flex items-center gap-2">
                <Link to="/" className="hover:text-volt transition-colors">Home</Link>
                <span aria-hidden="true" className="text-fg-faint">/</span>
              </li>
              <li className="flex items-center gap-2">
                <Link to="/events" className="hover:text-volt transition-colors">Events</Link>
                <span aria-hidden="true" className="text-fg-faint">/</span>
              </li>
              <li><span aria-current="page" className="text-fg">{event.title}</span></li>
            </ol>
          </nav>
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">{eyebrow}</p>
          <h1 className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[22ch]">
            {event.title}
          </h1>
          {event.description && (
            <p className="mt-6 max-w-[62ch] text-lead text-fg-muted">{event.description}</p>
          )}
          <p className="mt-6 text-meta text-fg-muted">
            {formatDate(event.startDate)}{event.venue ? ` · ${event.venue}` : ""}{galleryCount > 0 ? ` · ${galleryCount} frames` : ""}
          </p>
          {galleryCount > 0 && (
            <div className="mt-8">
              <Link
                to={`/gallery/events/${event.slug}`}
                className="inline-flex h-12 items-center rounded-full bg-volt px-6 text-body font-medium text-ink transition-[transform,box-shadow] duration-(--dur-fast) ease-out-quint motion-safe:hover:-translate-y-(--lift) hover:shadow-glow"
              >
                Open gallery
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Detail panel */}
      <section className="bg-abyss section-y">
        <div className="shell">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="border-t border-line pt-4">
              <p className="text-eyebrow uppercase tracking-[0.2em] text-fg-faint mb-2">Date</p>
              <p className="font-display text-title text-fg">
                <time dateTime={event.startDate}>{formatDate(event.startDate)}</time>
              </p>
            </div>
            <div className="border-t border-line pt-4">
              <p className="text-eyebrow uppercase tracking-[0.2em] text-fg-faint mb-2">Status</p>
              <p className="font-display text-title text-fg">{statusLabel}</p>
            </div>
            {event.venue && (
              <div className="border-t border-line pt-4">
                <p className="text-eyebrow uppercase tracking-[0.2em] text-fg-faint mb-2">Venue</p>
                <p className="font-display text-title text-fg">{event.venue}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* NextStep */}
      <section className="bg-abyss section-y border-t border-line">
        <div className="shell">
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">NEXT</p>
          <h2 className="font-display text-display-l font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[24ch] mb-6">
            The rest of the calendar
          </h2>
          <ul className="space-y-3">
            <li>
              <Link to="/events" className="group inline-flex min-h-12 items-center text-title text-fg hover:text-volt transition-colors">
                All events
                <ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-1 transition-transform" />
              </Link>
            </li>
            <li>
              <Link to="/achievements" className="group inline-flex min-h-12 items-center text-title text-fg hover:text-volt transition-colors">
                Achievements
                <ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-1 transition-transform" />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default EventDetailPage;
