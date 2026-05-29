import EventGalleryCard from "@/components/cards/EventGalleryCard";
import { mockEvents } from "@/mock/mockEvents";
import { mockEventGallery } from "@/mock/mockEventGallery";

const EventGalleryHubPage = () => {
  return (
    <section className="min-h-screen bg-[#050816] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">
            Event Galleries
          </h1>

          <p className="mt-3 text-slate-400">
            Browse highlights from SAC events and competitions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockEvents.map((event) => {
            const gallery = mockEventGallery.find(
              (item) => item.eventSlug === event.slug
            );

            return (
              <EventGalleryCard
                key={event.id}
                title={event.title}
                slug={event.slug}
                imageUrl={event.coverImageUrl}
                imageCount={gallery?.images.length ?? 0}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventGalleryHubPage;