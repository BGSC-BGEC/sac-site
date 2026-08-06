// src/components/sections/GalleryReel.tsx
// #gallery — 8 of 15 images on a native snap rail, ratio-varied.
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { getGalleryFor, getActivityBySlug } from "@/lib/content";
import { DUR, EASE, REVEAL_Y } from "@/lib/motion";
import { MediaFrame } from "@/components/primitives/MediaFrame";

const OUT_QUINT: typeof EASE.outQuint = EASE.outQuint;

const REEL = [
  { slug: "basketball", imageId: 1 },
  { slug: "swimming", imageId: 2 },
  { slug: "football", imageId: 2 },
  { slug: "gym", imageId: 1 },
  { slug: "badminton", imageId: 3 },
  { slug: "swimming", imageId: 3 },
  { slug: "basketball", imageId: 3 },
  { slug: "gym", imageId: 3 },
] as const;

type Tile = { activityName: string; image: { id: number; imageUrl: string; caption: string } };

function buildTiles(): Tile[] {
  return REEL.map((r) => {
    const activity = getActivityBySlug(r.slug);
    const images = getGalleryFor("activity", r.slug);
    const image = images.find((img) => img.id === r.imageId) ?? images[0];
    return { activityName: activity?.name ?? r.slug, image };
  }).filter((t) => t.image);
}

function GalleryReel() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [amp] = useState(() =>
    reduce ? 0
      : window.matchMedia("(min-width:1280px)").matches ? 40
      : window.matchMedia("(min-width:768px)").matches ? 24
      : 0
  );

  const tiles = buildTiles();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const rawX = useTransform(scrollYProgress, [0, 1], [amp, -amp]);
  const x = useSpring(rawX, { duration: 720, bounce: 0 });

  const groupProps = reduce ? {} : { initial: "hidden" as const, whileInView: "in" as const, viewport: { once: true, margin: "-12% 0px" } as const };
  const reveal = reduce
    ? { hidden: { opacity: 1, y: 0 }, in: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: REVEAL_Y }, in: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: OUT_QUINT } } };

  if (tiles.length === 0) return null;

  return (
    <section
      id="gallery"
      ref={sectionRef}
      aria-labelledby="gallery-title"
      className="relative overflow-hidden mesh-teal bg-void py-(--space-section)"
      style={{ "--mesh-strength": 0.28 } as React.CSSProperties}
    >
      {/* Header */}
      <motion.div {...groupProps} transition={{ staggerChildren: 0.09 }} className="mx-auto grid max-w-(--container) grid-cols-12 gap-x-6 px-(--gutter)">
        <motion.div variants={reveal} className="col-span-12 xl:col-span-7">
          <p className="text-eyebrow font-medium uppercase tracking-[0.2em] text-volt">
            <span aria-hidden="true" className="mr-3 inline-block size-1.5 rounded-full bg-volt" />
            In motion
          </p>
          <h2 id="gallery-title" className="mt-5 font-display text-display-l font-semibold leading-[0.92] tracking-[-0.03em] text-cream">
            Courts full, lanes busy, nobody watching the clock.
          </h2>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-eyebrow uppercase tracking-[0.2em] text-fg-muted">
            <span aria-hidden="true" className="size-1.5 rotate-45 bg-teal-300" />
            Placeholder imagery
          </span>
        </motion.div>
        <motion.div variants={reveal} className="col-span-12 mt-6 xl:col-span-4 xl:col-start-9 xl:mt-0 xl:self-end">
          <p className="max-w-[62ch] text-lead text-fg-muted">
            Fifteen frames from five venues: finals, meets, and the 5am gym crowd.
          </p>
          <Link to="/gallery" className="mt-6 hidden items-center gap-2 border-b border-line-volt pb-1 text-meta uppercase tracking-[0.2em] text-fg transition-colors duration-(--dur-std) ease-out-quint hover:border-volt md:inline-flex">
            Full gallery
            <ArrowUpRight className="size-4 text-volt" aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Rail */}
      <motion.div style={{ x }} className="mt-12 xl:mt-16">
        <motion.ul
          role="list"
          {...groupProps}
          variants={{ in: { transition: { staggerChildren: 0.09 } } }}
          className="reel-rail rail-inset no-scrollbar flex items-end gap-3 overflow-x-auto snap-x snap-mandatory md:gap-4 xl:gap-6"
        >
          {tiles.map((t, i) => (
            <motion.li
              key={`${t.activityName}-${t.image.id}`}
              variants={reveal}
              className="shrink-0 snap-start w-[82vw] md:w-[60vw] xl:w-[34vw]"
            >
              <Link to="/gallery" className="group block w-full rounded-lg border border-line bg-deep text-left transition-[transform,border-color] duration-(--dur-std) ease-out-quint hover:border-line-strong motion-safe:hover:-translate-y-(--lift)">
                <div className={`relative overflow-hidden rounded-lg bg-deep ${i % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <MediaFrame
                    src={t.image.imageUrl}
                    alt=""
                    ratio={i % 2 === 0 ? "3/4" : "4/3"}
                    radius="none"
                    width={i % 2 === 0 ? 600 : 800}
                    priority={false}
                    className="transition-transform duration-(--dur-slow) ease-out-quint motion-safe:group-hover:scale-[1.03]"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--color-void)_92%,transparent),color-mix(in_oklab,var(--color-void)_55%,transparent)_38%,transparent_68%)]" />
                  <span className="absolute left-4 top-4 font-display text-eyebrow tabular-nums text-fg-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute inset-x-4 bottom-4">
                    <span className="block text-eyebrow uppercase tracking-[0.2em] text-volt">{t.activityName}</span>
                    <span className="mt-1.5 block line-clamp-1 text-body text-fg">{t.image.caption}</span>
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Mobile CTA */}
      <Link to="/gallery" className="mx-(--gutter) mt-8 flex h-12 items-center justify-between rounded-sm border border-line-strong px-4 text-meta uppercase tracking-[0.2em] text-fg md:hidden">
        Full gallery <ArrowUpRight className="size-4 text-volt" aria-hidden="true" />
      </Link>
    </section>
  );
}

export default GalleryReel;
