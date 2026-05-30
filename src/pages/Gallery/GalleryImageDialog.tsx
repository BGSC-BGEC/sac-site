import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface GalleryImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
  caption: string;
}

const GalleryImageDialog = ({
  open,
  onOpenChange,
  imageUrl,
  caption,
}: GalleryImageDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl border-white/10 bg-[#09111f]">
        <img
          src={imageUrl}
          alt={caption}
          className="max-h-[70vh] w-full rounded-lg object-cover"
        />

        <p className="text-sm text-slate-300">
          {caption}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryImageDialog;