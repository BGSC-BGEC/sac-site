// src/components/cards/EventCard.tsx
// Two variants: hero (2-col media+text) and row (date block + text + venue).
// status is a prop, never computed in the card (contract — content.ts owns tense).
import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Event } from "@/types/event.types";
import { formatDate } from "@/lib/format";
import type { EventStatus } from "@/lib/content";
import { MediaFrame } from "@/components/primitives/MediaFrame";

type Props = {
  event: Event;
  variant?: "hero" | "row";
  status?: EventStatus;
};

const STATUS_LABEL: Record<EventStatus, string> = {
  today: "Happening today",
  upcoming: "Upcoming",
  past: "Concluded",
};

function EventCard({ event, variant = "row", status }: Props) {
  if (variant === "hero") {
    return (
      <Link
        to={`/events/${event.slug}`}
        className="group block overflow-hidden rounded-(--radius-md) border border-line bg-deep transition-colors duration-(--dur-fast) ease-out-quint hover:bg-raised"
      >
        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          <MediaFrame
            src={event.coverImageUrl}
            alt={`${event.title}${event.venue ? ` at ${event.venue}` : ""}`}
            ratio="4/3"
            radius="none"
            scrim="duotone"
            width={880}
            priority={false}
            className="[filter:grayscale(1)_contrast(1.06)] transition-transform duration-(--dur-slow) ease-out-quint motion-safe:group-hover:scale-[1.03]"
            imgClassName="pointer-events-none absolute inset-0 mix-blend-color opacity-[0.82] bg-teal-700"
          />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-transparent" />
          <div className="p-6 lg:p-8">
            <div className="mb-4 flex items-center gap-3">
              {status && (
                <span className={`rounded-full px-3 py-1 text-eyebrow uppercase tracking-[0.2em] ${
                  status === "today"
                    ? "bg-volt text-ink"
                    : status === "upcoming"
                      ? "border border-line-volt text-volt"
                      : "border border-line text-fg-muted"
                }`}>
                  {STATUS_LABEL[status]}
                </span>
              )}
              <span className="text-eyebrow uppercase tracking-[0.2em] text-volt">{formatDate(event.startDate)}</span>
            </div>
            <h3 className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream">
              {event.title}
            </h3>
            {event.description && (
              <p className="mt-4 max-w-[52ch] text-lead text-fg-muted">{event.description}</p>
            )}
            {event.venue && (
              <p className="mt-4 flex items-center text-meta text-fg-muted">
                <MapPin aria-hidden="true" className="mr-2 size-4 text-volt" />
                {event.venue}
              </p>
            )}
            <p className="mt-6 inline-flex items-center text-meta text-volt">
              View event details
              <ArrowUpRight aria-hidden="true" className="ml-2 size-4 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 transition-transform" />
            </p>
          </div>
        </div>
      </Link>
    );
  }

  // row variant
  return (
    <Link
      to={`/events/${event.slug}`}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-(--radius-md) border border-line bg-deep p-5 transition-colors duration-(--dur-fast) ease-out-quint hover:bg-raised md:p-6"
    >
      <div className="text-center">
        <p className="font-display text-title tabular-nums text-volt">
          {new Date(`${event.startDate}T12:00:00`).getDate()}
        </p>
        <p className="text-eyebrow uppercase tracking-[0.2em] text-fg-faint">
          {new Date(`${event.startDate}T12:00:00`).toLocaleDateString("en-IN", { month: "short" })}
        </p>
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-title font-semibold tracking-[-0.03em] text-fg truncate">{event.title}</h3>
        {event.description && (
          <p className="mt-1 line-clamp-2 text-meta text-fg-muted">{event.description}</p>
        )}
        {event.venue && (
          <p className="mt-2 flex items-center text-meta text-fg-faint">
            <MapPin aria-hidden="true" className="mr-1.5 size-3.5" />{event.venue}
          </p>
        )}
      </div>
      <ArrowUpRight aria-hidden="true" className="size-5 text-volt motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 transition-transform" />
    </Link>
  );
}

export default EventCard;
