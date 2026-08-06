// src/pages/Gallery/EventGalleryHubPage.tsx

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { mockEvents } from "@/mock/mockEvents";
import { getGalleryCounts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { MediaFrame } from "@/components/primitives/MediaFrame";

function EventGalleryHubPage() {
  useDocumentTitle("Event photos · Gallery · SAC Goa", "Photographs from every SAC event — opening ceremonies, matches, heats and award ceremonies.");
  const counts = getGalleryCounts("event");
  const totalFrames = Object.values(counts).reduce((a, b) => a + b, 0);

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
              <li className="flex items-center gap-2"><Link to="/" className="hover:text-volt transition-colors">Home</Link><span aria-hidden="true" className="text-fg-faint">/</span></li>
              <li className="flex items-center gap-2"><Link to="/gallery" className="hover:text-volt transition-colors">Galleries</Link><span aria-hidden="true" className="text-fg-faint">/</span></li>
              <li><span aria-current="page" className="text-fg">Event galleries</span></li>
            </ol>
          </nav>
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">EVENTS</p>
          <h1 className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[22ch]">Every event, in frames</h1>
          <p className="mt-6 max-w-[62ch] text-lead text-fg-muted">
            The football tournament, the fitness challenge and the swimming championship — start to podium.
          </p>
          <p className="mt-6 text-meta text-fg-muted">{mockEvents.length} sets · {totalFrames} frames</p>
        </div>
      </section>

      <section className="bg-abyss section-y">
        <div className="shell">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.map((e) => {
              const count = counts[e.slug] ?? 0;
              return (
                <li key={e.slug}>
                  <Link to={`/gallery/events/${e.slug}`} className="group block overflow-hidden rounded-lg border border-line bg-deep transition-colors duration-(--dur-std) ease-out-quint hover:border-line-strong motion-safe:hover:-translate-y-(--lift)">
                    <MediaFrame
                      src={e.coverImageUrl}
                      alt={e.title}
                      ratio="4/5"
                      radius="none"
                      width={560}
                      priority={false}
                      className="transition-transform duration-(--dur-slow) ease-out-quint motion-safe:group-hover:scale-[1.03]"
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-void to-transparent" />
                    <span className="absolute bottom-4 left-4 right-4">
                      <span className="font-display text-title font-semibold text-cream">{e.title}</span>
                      <span className="mt-1 block text-meta tabular-nums text-fg-faint">{formatDate(e.startDate)} · {count} frames</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-abyss section-y border-t border-line">
        <div className="shell">
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">NEXT</p>
          <h2 className="font-display text-display-l font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[24ch] mb-6">Read the events</h2>
          <ul className="space-y-3">
            <li><Link to="/events" className="group inline-flex min-h-12 items-center text-title text-fg hover:text-volt transition-colors">Events<ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-1 transition-transform" /></Link></li>
            <li><Link to="/gallery" className="group inline-flex min-h-12 items-center text-title text-fg hover:text-volt transition-colors">Activity galleries<ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-1 transition-transform" /></Link></li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default EventGalleryHubPage;
