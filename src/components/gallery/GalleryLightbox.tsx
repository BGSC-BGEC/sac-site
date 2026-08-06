// src/components/gallery/GalleryLightbox.tsx
import { useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { MediaFrame } from "@/components/primitives/MediaFrame";

export interface LightboxImage { id: number; imageUrl: string; caption: string }

interface Props {
  images: LightboxImage[];
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
  collectionTitle: string;
}

function GalleryLightbox({ images, index, open, onOpenChange, onIndexChange, collectionTitle }: Props) {
  const count = images.length;
  const image = images[index];
  const step = useCallback((d: 1 | -1) => onIndexChange((index + d + count) % count), [index, count, onIndexChange]);

  useEffect(() => {
    if (!open || count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); step(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, count, step]);

  if (!image) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[min(96vw,1120px)] gap-4 border-line-strong bg-deep p-4 sm:p-6 rounded-xl"
        aria-describedby="lightbox-desc"
      >
        <DialogTitle className="text-eyebrow uppercase tracking-[0.2em] text-volt">
          {collectionTitle}
        </DialogTitle>
        <figure className="grid gap-3">
          <div className="flex items-center justify-center rounded-md bg-void">
            <MediaFrame
              src={image.imageUrl}
              alt={image.caption}
              ratio="16/9"
              radius="none"
              width={1600}
              priority={true}
              className="max-h-[78svh] w-auto max-w-full object-contain"
            />
          </div>
          <figcaption className="flex items-baseline justify-between gap-4">
            <DialogDescription id="lightbox-desc" className="text-body text-fg-muted">
              {image.caption}
            </DialogDescription>
            <span className="text-meta tabular-nums text-fg-faint" aria-hidden="true">
              {index + 1} / {count}
            </span>
          </figcaption>
        </figure>
        {count > 1 && (
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => step(-1)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-meta text-fg hover:bg-raised transition-colors">
              ← Previous
            </button>
            <button type="button" onClick={() => step(1)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-meta text-fg hover:bg-raised transition-colors">
              Next →
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default GalleryLightbox;
