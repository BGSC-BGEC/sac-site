import { Link } from "react-router-dom";

interface GalleryCardProps {
  title: string;
  slug: string;
  imageUrl: string;
  imageCount: number;
}

const GalleryCard = ({
  title,
  slug,
  imageUrl,
  imageCount,
}: GalleryCardProps) => {
  return (
    <Link
      to={`/gallery/${slug}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-[#09111f] transition-all duration-300 hover:border-cyan-400/50"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          {imageCount} images
        </p>
      </div>
    </Link>
  );
};

export default GalleryCard;