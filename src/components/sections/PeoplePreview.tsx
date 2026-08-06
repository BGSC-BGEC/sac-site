// src/components/sections/PeoplePreview.tsx
// #people — 4 faces, duotone, real contact links.
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { getPeopleByRole } from "@/lib/content";
import PersonCard from "@/components/cards/PersonCard";
import { DUR, EASE, REVEAL_Y } from "@/lib/motion";

const OUT_QUINT: typeof EASE.outQuint = EASE.outQuint;

function PeoplePreview() {
  const reduce = useReducedMotion();
  const incharges = getPeopleByRole("INCHARGE");
  const committee = getPeopleByRole("COMMITTEE");
  const preview = [...incharges, ...committee].slice(0, 4);
  const total = incharges.length + committee.length;

  if (total === 0) return null;

  const groupProps = reduce ? {} : { initial: "hidden" as const, whileInView: "show" as const, viewport: { once: true, amount: 0.25 } as const };
  const item = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: REVEAL_Y }, show: { opacity: 1, y: 0, transition: { duration: DUR.std, ease: OUT_QUINT } } };

  return (
    <section
      id="people"
      aria-labelledby="people-heading"
      className="relative isolate overflow-clip mesh-teal bg-void border-t border-line py-(--space-section)"
      style={{ "--mesh-strength": 0.3 } as React.CSSProperties}
    >
      <div className="relative z-10 mx-auto w-full max-w-(--container) px-(--gutter)">
        <motion.div {...groupProps} transition={{ staggerChildren: 0.09 }} className="mb-12 grid grid-cols-12 gap-6">
          <motion.div variants={item} className="col-span-12 lg:col-span-7">
            <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-5">
              <span aria-hidden="true" className="mr-3 inline-block h-px w-6 align-middle bg-volt" />THE PEOPLE
            </p>
            <h2 id="people-heading" className="font-display text-display-l font-semibold leading-[0.92] tracking-[-0.03em] text-cream">
              Someone unlocks the gym at 5 a.m.
            </h2>
          </motion.div>
          <motion.p variants={item} className="col-span-12 max-w-[62ch] text-lead text-fg-muted lg:col-start-9 lg:col-span-4 lg:self-end">
            Two faculty in-charges and two student secretaries run the Student Activity Centre — bookings, fixtures, equipment, and the paperwork nobody sees. Their inboxes are open.
          </motion.p>
        </motion.div>

        <motion.ul
          {...groupProps}
          transition={{ staggerChildren: 0.09, delayChildren: 0.06 }}
          className="grid grid-cols-12 gap-x-6 gap-y-10 md:gap-x-5 md:gap-y-8 max-sm:gap-y-6"
        >
          {preview.map((p, i) => (
            <motion.li key={p.id} variants={item} className="col-span-12 sm:col-span-6 lg:col-span-3">
              <PersonCard person={p} index={i} count={preview.length} />
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-12 flex items-start justify-between gap-6">
          <p className="text-meta text-fg-faint max-w-[34ch]">Portraits are placeholder stock images until the SAC photo shoot lands.</p>
          <Link
            to="/people"
            className="group/cta inline-flex flex-col items-start text-meta uppercase tracking-[0.2em] text-cream transition-colors duration-(--dur-fast) ease-out-quint hover:text-volt max-sm:min-h-12 max-sm:w-full max-sm:justify-center"
          >
            <span className="inline-flex items-center">
              {total > 4 ? `Meet all ${total}` : "Meet everyone"}
              <ArrowRight aria-hidden="true" className="ml-2 size-4 transition-transform duration-(--dur-fast) ease-out-quint group-hover/cta:translate-x-1" />
            </span>
            <span aria-hidden="true" className="mt-2 h-px w-full origin-left scale-x-0 bg-line-volt transition-transform duration-(--dur-std) ease-out-quint group-hover/cta:scale-x-100 group-hover/cta:bg-volt motion-reduce:scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PeoplePreview;
