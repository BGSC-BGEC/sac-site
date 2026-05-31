import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { mockEventGallery } from "@/mock/mockEventGallery";
import { mockEvents } from "@/mock/mockEvents";

const EventDetailPage = () => {
  const { slug } = useParams();

  const event = mockEvents.find(
    (item) => item.slug === slug
  );

  const gallery = mockEventGallery.find(
    (item) => item.eventSlug === slug
  );

  if (!event) {
    return (
      <section className="min-h-screen bg-[#050816] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold text-white">
            Event Not Found
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#050816] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <Link
          to="/events"
          className="mb-8 inline-flex items-center gap-2 text-slate-400 transition hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>

        {/* Hero */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#09111f]">
          <img
            src={event.coverImageUrl}
            alt={event.title}
            className="h-[400px] w-full object-cover"
          />

          <div className="p-8">
            <h1 className="text-4xl font-bold text-white">
              {event.title}
            </h1>

            <p className="mt-4 max-w-3xl text-slate-400">
              {event.description}
            </p>

            <div className="mt-6 flex flex-col gap-3 text-slate-300">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-cyan-400" />
                {event.startDate}
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-400" />
                {event.venue}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Preview */}
        {gallery && (
          <div className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">
                Gallery Preview
              </h2>

              <Link
                to={`/gallery/events/${event.slug}`}
                className="text-cyan-400 transition hover:text-cyan-300"
              >
                View Full Gallery →
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {gallery.images
                .slice(0, 3)
                .map((image) => (
                  <div
                    key={image.id}
                    className="overflow-hidden rounded-2xl border border-white/10"
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.caption}
                      className="h-64 w-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventDetailPage;