// src/components/sections/JoinCta.tsx
// #join — the one inverted light section on the site.
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { getActivityCategories, getActivitiesByCategory } from "@/lib/content";
import { DUR, EASE, REVEAL_Y } from "@/lib/motion";

const OUT_QUINT: typeof EASE.outQuint = EASE.outQuint;
const EMAIL = import.meta.env.VITE_SAC_EMAIL ?? "sac@goa.bits-pilani.ac.in";

function JoinCta() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const revealed = useInView(ref, { amount: 0.35, once: true });

  const mix = getActivityCategories()
    .map((c) => `${getActivitiesByCategory(c).length} ${c.toLowerCase()}`)
    .join(" · ");

  const rise = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: REVEAL_Y }, show: { opacity: 1, y: 0 } };
  const stack = { show: { transition: { staggerChildren: 0.09 } } };
  const T = { duration: DUR.std, ease: OUT_QUINT };

  return (
    <section
      id="join"
      ref={ref}
      data-revealed={revealed || undefined}
      aria-labelledby="join-title"
      className="join-light mesh-cream relative isolate ml-[calc(50%-50vw)] w-screen py-[calc(var(--space-section)*1.5)]"
      style={{ "--mesh-strength": 0.85 } as React.CSSProperties}
    >
      <motion.div
        variants={stack}
        initial="hidden"
        animate={revealed ? "show" : "hidden"}
        className="relative z-10 mx-auto grid w-full max-w-(--container) grid-cols-12 px-(--gutter)"
      >
        <div className="col-span-12 text-center md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8">
          <motion.p variants={rise} transition={T} className="flex items-center justify-center text-eyebrow uppercase tracking-[0.2em] text-teal-700">
            <span aria-hidden="true" className="mr-2.5 size-1.5 rounded-full bg-teal-700" />
            Get involved
          </motion.p>
          <motion.h2 variants={rise} transition={T} id="join-title"
            className="mt-6 font-display text-display-l font-semibold tracking-[-0.03em] leading-[0.92] text-ink">
            You do not need a team. You need a start time.
          </motion.h2>
          <motion.p variants={rise} transition={T} className="mx-auto mt-5 max-w-[62ch] text-lead text-teal-900">
            Five facilities, the first open at five in the morning and the last shut at eleven at night.
          </motion.p>
          <motion.div variants={rise} transition={T} className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link to="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-void px-8 text-body font-medium text-cream sm:h-14 transition-[background-color,transform] duration-(--dur-fast) ease-out-quint motion-safe:hover:-translate-y-(--lift) hover:bg-teal-900 active:translate-y-0 motion-reduce:transform-none">
              Talk to the centre
            </Link>
            <Link to="/events"
              className="inline-flex h-12 items-center justify-center rounded-full border px-8 text-body font-medium text-ink sm:h-14 transition-colors duration-(--dur-fast) ease-out-quint hover:bg-[color-mix(in_oklab,var(--color-ink)_6%,var(--color-cream))] border-[color-mix(in_oklab,var(--color-ink)_45%,var(--color-cream))]">
              Check what's on
            </Link>
          </motion.div>
        </div>

        <ul role="list" className="col-span-12 mt-[clamp(4rem,8vh,6rem)] grid grid-cols-1 gap-x-(--gutter) md:grid-cols-3">
          <motion.li variants={rise} transition={T} className="border-t border-[color-mix(in_oklab,var(--color-ink)_15%,var(--color-cream))] pb-6 pt-5 md:pb-0 md:pt-6">
            <h3 className="mb-3 text-eyebrow uppercase tracking-[0.2em] text-teal-700">Email</h3>
            <a href={`mailto:${EMAIL}`}
              className="text-body text-ink underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] duration-(--dur-fast) ease-out-quint hover:decoration-2">
              {EMAIL}
            </a>
          </motion.li>
          <motion.li variants={rise} transition={T} className="border-t border-[color-mix(in_oklab,var(--color-ink)_15%,var(--color-cream))] pb-6 pt-5 md:pb-0 md:pt-6">
            <h3 className="mb-3 text-eyebrow uppercase tracking-[0.2em] text-teal-700">Find us</h3>
            <address className="text-body not-italic leading-[1.5] text-teal-900">
              Student Activity Centre<br />
              BITS Pilani, Goa Campus<br />
              Zuarinagar, Goa
            </address>
          </motion.li>
          <motion.li variants={rise} transition={T} className="border-t border-[color-mix(in_oklab,var(--color-ink)_15%,var(--color-cream))] pb-6 pt-5 md:pb-0 md:pt-6">
            <h3 className="mb-3 text-eyebrow uppercase tracking-[0.2em] text-teal-700">Explore</h3>
            <Link to="/activities" className="group inline-flex items-center gap-2 text-body text-ink">
              Browse all activities
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-(--dur-fast) ease-out-quint group-hover:translate-x-(--lift) motion-reduce:transform-none" />
            </Link>
            {mix && <p className="mt-2 text-meta tabular-nums text-teal-900">{mix}</p>}
          </motion.li>
        </ul>
      </motion.div>
    </section>
  );
}

export default JoinCta;
