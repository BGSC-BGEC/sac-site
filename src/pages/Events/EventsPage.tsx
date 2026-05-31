import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import { mockEvents } from "@/mock/mockEvents";

const EventsPage = () => {
  const featuredEvent = mockEvents.find(
    (event) => event.isFeatured
  );

  return (
    <section className="min-h-screen bg-[#050816] py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-white">
            SAC Events
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Discover tournaments, championships, fitness
            challenges, and community events hosted by the
            Sports Activities Centre.
          </p>
        </div>

        {/* Featured Event */}
        {featuredEvent && (
          <div className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              Featured Event
            </h2>

            <Link
              to={`/events/${featuredEvent.slug}`}
              className="group overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#09111f]"
            >
              <div className="grid lg:grid-cols-2">
                <div className="overflow-hidden">
                  <img
                    src={featuredEvent.coverImageUrl}
                    alt={featuredEvent.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-8">
                  <span className="inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-400">
                    Featured
                  </span>

                  <h3 className="mt-4 text-3xl font-bold text-white">
                    {featuredEvent.title}
                  </h3>

                  <p className="mt-4 text-slate-400">
                    {featuredEvent.description}
                  </p>

                  <div className="mt-6 flex flex-col gap-3 text-slate-300">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-cyan-400" />
                      {featuredEvent.startDate}
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-cyan-400" />
                      {featuredEvent.venue}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Timeline */}
        <div>
          <h2 className="mb-8 text-2xl font-semibold text-white">
            Upcoming Events
          </h2>

          <div className="space-y-6">
            {mockEvents.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.slug}`}
                className="group block rounded-2xl border border-white/10 bg-[#09111f] p-6 transition hover:border-cyan-400/40"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mb-3">
                      <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-400">
                        Event
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-slate-400">
                      {event.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-slate-300">
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsPage;