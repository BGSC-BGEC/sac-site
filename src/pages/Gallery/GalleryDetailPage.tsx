// src/pages/Gallery/GalleryDetailPage.tsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getActivityBySlug, getEventBySlug, getGalleryFor, type GalleryKind } from "@/lib/content";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import GalleryLightbox, { type LightboxImage } from "@/components/gallery/GalleryLightbox";
import NotFoundPage from "@/pages/NotFoundPage";
import { MediaFrame } from "@/components/primitives/MediaFrame";

const GALLERY_KINDS = {
  activity: {
    eyebrow: "ACTIVITY GALLERY",
    crumbs: [{ label: "Home", to: "/" }, { label: "Galleries", to: "/gallery" }],
    find: getActivityBySlug,
    titleOf: (a: NonNullable<ReturnType<typeof getActivityBySlug>>) => a.name,
    leadOf: (a: NonNullable<ReturnType<typeof getActivityBySlug>>) => a.description ?? "",
  },
  event: {
    eyebrow: "EVENT GALLERY",
    crumbs: [{ label: "Home", to: "/" }, { label: "Galleries", to: "/gallery" }, { label: "Event galleries", to: "/gallery/events" }],
    find: getEventBySlug,
    titleOf: (e: NonNullable<ReturnType<typeof getEventBySlug>>) => e.title,
    leadOf: (e: NonNullable<ReturnType<typeof getEventBySlug>>) => e.description ?? "",
  },
} as const;

function GalleryDetailPage({ kind }: { kind: GalleryKind }) {
  const { slug = "" } = useParams();
  const config = GALLERY_KINDS[kind];
  const record = config.find(slug);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const title = record ? config.titleOf(record as never) : "Not found";
  const images = getGalleryFor(kind, slug);

  useDocumentTitle(
    record ? `${title} photos · Gallery · SAC Goa` : "Not found · Gallery · SAC Goa",
    record ? `${images.length} photographs from ${title} at SAC Goa.` : undefined,
  );

  if (!record) return <NotFoundPage kind={kind === "activity" ? "activity" : "event"} />;

  const lead = config.leadOf(record as never);
  const lightboxImages: LightboxImage[] = images.map((img) => ({ id: img.id, imageUrl: img.imageUrl, caption: img.caption }));

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
              {config.crumbs.map((c) => (
                <li key={c.to} className="flex items-center gap-2">
                  <Link to={c.to} className="hover:text-volt transition-colors">{c.label}</Link>
                  <span aria-hidden="true" className="text-fg-faint">/</span>
                </li>
              ))}
              <li><span aria-current="page" className="text-fg">{title}</span></li>
            </ol>
          </nav>
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">{config.eyebrow}</p>
          <h1 className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[22ch]">{title}</h1>
          {lead && <p className="mt-6 max-w-[62ch] text-lead text-fg-muted">{lead}</p>}
          <p className="mt-6 text-meta text-fg-muted">{images.length} frames</p>
        </div>
      </section>

      <section className="bg-abyss section-y">
        <div className="shell">
          {images.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <li key={img.id}>
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => { setIndex(i); setOpen(true); }}
                    className="group block w-full overflow-hidden rounded-md border border-line bg-deep text-left transition-colors duration-(--dur-std) ease-out-quint hover:border-line-strong"
                  >
                    <MediaFrame
                      src={img.imageUrl}
                      alt=""
                      ratio="4/5"
                      radius="none"
                      width={640}
                      priority={false}
                      className="transition-transform duration-(--dur-slow) ease-out-quint motion-safe:group-hover:scale-[1.03]"
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-void/92 via-void/55 to-transparent" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-line bg-deep px-6 py-14 text-center">
              <p className="text-lead font-semibold text-fg">No frames yet</p>
              <p className="mt-2 text-meta text-fg-muted max-w-[42ch] mx-auto">Photos have not been added to this set.</p>
              <Link to="/gallery" className="mt-6 inline-flex h-11 items-center rounded-full bg-volt px-6 text-meta font-semibold text-ink">All galleries</Link>
            </div>
          )}
        </div>
      </section>

      <GalleryLightbox
        images={lightboxImages}
        index={index}
        open={open}
        onOpenChange={setOpen}
        onIndexChange={setIndex}
        collectionTitle={title}
      />
    </>
  );
}

export default GalleryDetailPage;
