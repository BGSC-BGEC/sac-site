import { useState } from "react";
import { useParams } from "react-router-dom";
import { mockActivities } from "@/mock/mockActivities";
import { mockGallery } from "@/mock/mockGallery";
import GalleryImageDialog from "./GalleryImageDialog";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface SelectedImage {
  imageUrl: string;
  caption: string;
}

const ActivityGalleryPage = () => {
  const { slug } = useParams();

  const [selectedImage, setSelectedImage] =
    useState<SelectedImage | null>(null);

  const activity = mockActivities.find(
    (item) => item.slug === slug
  );

  const gallery = mockGallery.find(
    (item) => item.activitySlug === slug
  );

  if (!activity) {
    return (
      <section className="min-h-screen bg-[#050816] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-3xl font-bold text-white">
            Activity Not Found
          </h1>

          <p className="mt-4 text-slate-400">
            The gallery you're looking for does not exist.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {selectedImage ? (
        <GalleryImageDialog
          open={true}
          onOpenChange={() => setSelectedImage(null)}
          imageUrl={selectedImage.imageUrl}
          caption={selectedImage.caption}
        />
      ) : null}

      <section className="min-h-screen bg-[#050816] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Link
            to="/gallery"
            className="mb-8 inline-flex items-center gap-2 text-slate-400 transition hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Galleries
          </Link>
          {/* Hero */}
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-400">
                Gallery
              </span>

              <span className="text-sm text-slate-500">
                {gallery?.images.length ?? 0} Images
              </span>
            </div>

            <h1 className="text-5xl font-bold text-white">
              {activity.name}
            </h1>

            <p className="mt-4 max-w-2xl text-slate-400">
              {activity.description}
            </p>
          </div>

          {/* Empty State */}
          {!gallery || gallery.images.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#09111f] p-10 text-center">
              <h2 className="text-xl font-semibold text-white">
                No Images Available
              </h2>

              <p className="mt-2 text-slate-400">
                Images for this activity will be added soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gallery.images.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() =>
                    setSelectedImage({
                      imageUrl: image.imageUrl,
                      caption: image.caption,
                    })
                  }
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#09111f] text-left transition-all duration-300 hover:border-cyan-400/40"
                >
                  <div className="overflow-hidden">
                    <img
                      src={image.imageUrl}
                      alt={image.caption}
                      className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-slate-300">
                      {image.caption}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ActivityGalleryPage;