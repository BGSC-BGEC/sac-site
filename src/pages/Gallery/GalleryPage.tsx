import { Link } from "react-router-dom";

import GalleryCard from "@/components/cards/GalleryCard";
import { mockActivities } from "@/mock/mockActivities";
import { mockGallery } from "@/mock/mockGallery";

const GalleryPage = () => {
  return (
    <section className="min-h-screen bg-[#050816] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">
            Galleries
          </h1>

          <p className="mt-3 text-slate-400">
            Explore moments from SAC activities, tournaments,
            championships, and special events across campus.
          </p>
        </div>

        {/* Event Galleries Feature Card */}
        <Link
          to="/gallery/events"
          className="mb-12 block overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#09111f] p-6 transition-all duration-300 hover:border-cyan-400"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="mb-3 inline-block rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-400">
                Featured
              </span>

              <h2 className="text-2xl font-bold text-white">
                Event Galleries
              </h2>

              <p className="mt-2 max-w-2xl text-slate-400">
                Browse highlights from SAC tournaments,
                championships, fitness challenges, and other
                special events.
              </p>
            </div>

            <div className="hidden text-4xl text-cyan-400 md:block">
              →
            </div>
          </div>
        </Link>

        {/* Activity Galleries */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Activity Galleries
          </h2>

          <p className="mt-2 text-slate-400">
            Explore sports, fitness, and recreational activities.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockActivities.map((activity) => {
            const gallery = mockGallery.find(
              (item) => item.activitySlug === activity.slug
            );

            return (
              <GalleryCard
                key={activity.id}
                title={activity.name}
                slug={activity.slug}
                imageUrl={activity.coverImageUrl}
                imageCount={gallery?.images.length ?? 0}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;