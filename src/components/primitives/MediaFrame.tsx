// src/components/primitives/MediaFrame.tsx
// Every <img> in the app goes through this. Fixed ratio kills CLS structurally;
// the unsplash param injection is the single point of control. Guard:img gate
// forbids <img> anywhere else in src/.
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { withUnsplashParams } from "@/lib/format"

const frameVariants = cva("relative isolate overflow-hidden bg-abyss", {
  variants: {
    ratio: {
      "16/9": "aspect-[16/9]",
      "4/3": "aspect-[4/3]",
      "3/4": "aspect-[3/4]",
      "1/1": "aspect-square",
      "21/9": "aspect-[21/9]",
      "4/5": "aspect-[4/5]",
      "3/2": "aspect-[3/2]",
      "1/2": "aspect-[1/2]",
    },
    radius: { md: "rounded-md", lg: "rounded-lg", xl: "rounded-xl", none: "rounded-none" },
  },
  defaultVariants: { ratio: "4/3", radius: "lg" },
})

type MediaFrameProps = {
  src: string
  alt: string                                    // required, no default
  ratio?: "16/9" | "4/3" | "3/4" | "1/1" | "21/9" | "4/5" | "3/2" | "1/2"
  radius?: "md" | "lg" | "xl" | "none"
  scrim?: "none" | "bottom" | "duotone"
  priority?: boolean
  width?: number                                 // Unsplash w= param, default 1200
  className?: string
  imgClassName?: string
}

export function MediaFrame({
  src, alt, ratio, radius, scrim = "none", priority = false, width = 1200, className, imgClassName,
}: MediaFrameProps) {
  const sized = withUnsplashParams(src, width)
  return (
    <div data-slot="media-frame" className={cn(frameVariants({ ratio, radius }), className)}>
      <img
        src={sized}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={cn("absolute inset-0 size-full object-cover", imgClassName)}
      />
      {scrim === "bottom" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 z-1
                     bg-gradient-to-t from-teal-900 via-teal-900/55 to-transparent"
        />
      )}
      {scrim === "duotone" && (
        <>
          <span aria-hidden className="pointer-events-none absolute inset-0 z-1 bg-teal-700 mix-blend-color opacity-25" />
          <span aria-hidden className="pointer-events-none absolute inset-0 z-1 bg-volt mix-blend-overlay opacity-[0.06]" />
        </>
      )}
    </div>
  )
}
