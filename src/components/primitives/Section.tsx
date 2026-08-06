// src/components/primitives/Section.tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionVariants = cva("relative", {
  variants: {
    canvas: {
      void: "bg-void",
      abyss: "bg-abyss",
      deep: "bg-deep",
      invert: "light-section",
    },
    mesh: {
      none: "",
      volt: "mesh-volt",
      teal: "mesh-teal",
      cream: "mesh-cream",
    },
    size: {
      default: "section-y",
      tight: "py-[clamp(3rem,7vh,5rem)]",
      flush: "py-0",
      screen: "min-h-[100svh] flex items-center",
    },
  },
  defaultVariants: { canvas: "void", mesh: "none", size: "default" },
})

type SectionProps = React.ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    meshStrength?: number
    bleed?: boolean
  }

function Section({
  className, canvas, mesh, size, meshStrength, bleed = false, children, ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      data-canvas={canvas ?? "void"}
      className={cn(sectionVariants({ canvas, mesh, size }), className)}
      style={meshStrength != null ? ({ "--mesh-strength": meshStrength } as React.CSSProperties) : undefined}
      {...props}
    >
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  )
}

export { Section }
