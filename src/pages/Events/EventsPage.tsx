// src/pages/Events/EventsPage.tsx

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getFeaturedEvent, getEventsByPhase, eventStatus } from "@/lib/content";
import EventCard from "@/components/cards/EventCard";

function EventsPage() {
  useDocumentTitle("Events · SAC Goa", "Tournaments, challenges and championships hosted by the Student Activity Centre at BITS Pilani Goa.");
  const featured = getFeaturedEvent();
  const { today, upcoming, past } = getEventsByPhase();
  const featuredId = featured?.event.id;

  // de-duplicate: bands filter out the featured record
  const todayList = today.filter((e) => e.id !== featuredId);
  const upcomingList = upcoming.filter((e) => e.id !== featuredId);
  const pastList = past;

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
              <li><span aria-current="page" className="text-fg">Events</span></li>
            </ol>
          </nav>
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">CALENDAR</p>
          <h1 className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[22ch]">
            What the SAC runs
          </h1>
          <p className="mt-6 max-w-[62ch] text-lead text-fg-muted">
            Tournaments, challenges and championships — the date, the venue, and what happened.
          </p>
          <p className="mt-6 text-meta text-fg-muted">{today.length + upcoming.length + past.length} events</p>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="bg-abyss section-y">
          <div className="shell">
            <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-6">FEATURED</p>
            <EventCard event={featured.event} variant="hero" status={featured.status} />
          </div>
        </section>
      )}

      {/* Today */}
      {todayList.length > 0 && (
        <section className="bg-void section-y">
          <div className="shell">
            <h2 className="text-eyebrow uppercase tracking-[0.2em] text-fg-muted mb-6">Today at the SAC</h2>
            <ul className="space-y-4">
              {todayList.map((e) => (
                <li key={e.id}><EventCard event={e} variant="row" status={eventStatus(e)} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Coming up */}
      <section className="bg-abyss section-y">
        <div className="shell">
          <h2 className="text-eyebrow uppercase tracking-[0.2em] text-fg-muted mb-6">Coming up</h2>
          {upcomingList.length > 0 ? (
            <ul className="space-y-4">
              {upcomingList.map((e) => (
                <li key={e.id}><EventCard event={e} variant="row" status={eventStatus(e)} /></li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-line bg-deep px-6 py-14 text-center">
              <p className="text-lead font-semibold text-fg">No upcoming events</p>
              <p className="mt-2 text-meta text-fg-muted max-w-[42ch] mx-auto">
                Nothing is scheduled right now. Everything already run is listed below.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Already run */}
      {pastList.length > 0 && (
        <section className="bg-void section-y">
          <div className="shell">
            <h2 className="text-eyebrow uppercase tracking-[0.2em] text-fg-muted mb-6">Already run</h2>
            <ul className="space-y-4">
              {pastList.map((e) => (
                <li key={e.id}><EventCard event={e} variant="row" status="past" /></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* NextStep */}
      <section className="bg-abyss section-y border-t border-line">
        <div className="shell">
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">NEXT</p>
          <h2 className="font-display text-display-l font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[24ch] mb-6">
            See how they looked
          </h2>
          <ul className="space-y-3">
            <li>
              <Link to="/gallery/events" className="group inline-flex min-h-12 items-center text-title text-fg hover:text-volt transition-colors">
                Event galleries
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

export default EventsPage;
