// src/components/cards/GalleryCard.tsx
import { Link } from "react-router-dom";
import { MediaFrame } from "@/components/primitives/MediaFrame";

interface Props {
  to: string;
  title: string;
  imageUrl: string;
  count: number;
  caption?: string;
}

function GalleryCard({ to, title, imageUrl, count, caption }: Props) {
  return (
    <Link
      to={to}
      className="group block overflow-hidden rounded-lg border border-line bg-deep transition-colors duration-(--dur-std) ease-out-quint hover:border-line-strong motion-safe:hover:-translate-y-(--lift)"
    >
      <MediaFrame
        src={imageUrl}
        alt={title}
        ratio="4/5"
        radius="none"
        width={560}
        className="transition-transform duration-(--dur-slow) ease-out-quint motion-safe:group-hover:scale-[1.03]"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-void to-transparent" />
      <span className="absolute bottom-4 left-4 right-4">
        <span className="font-display text-title font-semibold text-cream">{title}</span>
        {caption && <span className="mt-1 block text-meta text-fg-muted">{caption}</span>}
        <span className="mt-1 block text-meta tabular-nums text-fg-faint">{count} frames</span>
      </span>
    </Link>
  );
}

export default GalleryCard;
