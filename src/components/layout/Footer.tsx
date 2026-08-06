// src/components/layout/Footer.tsx
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE } from "@/lib/motion";

type FooterLink = { label: string; to: string; sub?: boolean };

const EXPLORE: FooterLink[] = [
  { label: "Activities", to: "/activities" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Event galleries", to: "/gallery/events", sub: true },
];

const CENTRE: FooterLink[] = [
  { label: "People", to: "/people" },
  { label: "Faculty in-charges", to: "/people/incharges", sub: true },
  { label: "Student committee", to: "/people/committee", sub: true },
  { label: "Achievements", to: "/achievements" },
  { label: "Stats", to: "/stats" },
  { label: "Contact", to: "/contact" },
];

// Environment variables with fallbacks
const EMAIL = import.meta.env.VITE_SAC_EMAIL ?? "sac@goa.bits-pilani.ac.in";
const PHONE_DISPLAY = import.meta.env.VITE_PHONE_DISPLAY ?? "+91 832 258 0000";
const PHONE_HREF = import.meta.env.VITE_PHONE_HREF ?? "+918****0000";

const cascade = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.outQuint } },
};

const Footer = () => {
  const still = useReducedMotion();
  const year = new Date().getFullYear();
  const tier1 = "group relative inline-flex min-h-12 items-center py-3 lg:min-h-0 lg:py-2 text-body text-fg-muted rounded-sm transition-colors duration-(--dur-fast) ease-out-quint hover:text-fg active:bg-raised after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-volt after:transition-transform after:duration-(--dur-fast) after:ease-out-quint hover:after:scale-x-100 focus-visible:after:scale-x-100";
  const tier2 = tier1 + " text-meta lg:pl-4 after:hidden";

  return (
    <footer className="mesh-teal relative isolate overflow-hidden border-t border-line bg-void pt-[var(--space-section)] pb-10 [--mesh-strength:0.25]">
      <motion.div
        variants={cascade}
        initial={still ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-12%" }}
        className="relative z-10 mx-auto w-full max-w-[var(--container)] px-[var(--gutter)]"
      >
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-6 md:gap-x-[var(--gutter)] md:gap-y-14 lg:grid-cols-12 lg:gap-y-0">
          {/* A — identity */}
          <motion.div variants={rise} className="order-1 sm:col-span-2 md:col-span-6 lg:col-span-4">
            <h2 className="text-eyebrow font-sans uppercase tracking-[0.2em] text-volt mb-6">Student Activity Centre</h2>
            <span className="block overflow-hidden pb-[0.12em] mb-5">
              <Link to="/" className="inline-block font-display font-semibold text-display-l tracking-[-0.03em] leading-[0.92] text-cream transition-colors duration-(--dur-fast) ease-out-quint hover:text-fg focus-visible:text-fg">
                SAC
              </Link>
            </span>
            <p className="text-lead text-fg-muted max-w-[34ch]">
              Sport and fitness at BITS Pilani Goa. Five facilities, open 05:00 to 23:00.
            </p>
          </motion.div>

          {/* D — contact (mobile order: 2) */}
          <motion.div variants={rise} className="order-2 sm:col-span-2 md:col-span-2 md:col-start-5 lg:col-span-3 lg:col-start-10 lg:order-none">
            <h2 className="text-eyebrow font-sans uppercase tracking-[0.2em] text-fg-muted mb-5">Reach us</h2>
            <ul className="space-y-6">
              <li>
                <p className="text-eyebrow font-sans uppercase tracking-[0.2em] text-fg-muted mb-1">Email</p>
                <a href={`mailto:${EMAIL}`} className="text-meta text-fg-muted break-all hover:text-volt transition-colors">{EMAIL}</a>
              </li>
              <li>
                <p className="text-eyebrow font-sans uppercase tracking-[0.2em] text-fg-muted mb-1">Phone</p>
                <a href={`tel:${PHONE_HREF}`} className="text-meta text-fg-muted tabular-nums hover:text-volt transition-colors">{PHONE_DISPLAY}</a>
              </li>
              <li>
                <p className="text-eyebrow font-sans uppercase tracking-[0.2em] text-fg-muted mb-1">Campus</p>
                <address className="not-italic text-meta text-fg-muted leading-relaxed">
                  Student Activity Centre<br />
                  BITS Pilani, Goa Campus<br />
                  Zuarinagar, Goa
                </address>
              </li>
            </ul>
          </motion.div>

          {/* B — explore (mobile order: 3) */}
          <motion.nav variants={rise} aria-labelledby="ft-explore" className="order-3 sm:col-span-1 md:col-span-2 md:col-start-1 lg:col-span-2 lg:col-start-6 lg:order-none">
            <h2 id="ft-explore" className="text-eyebrow font-sans uppercase tracking-[0.2em] text-volt mb-5">Explore</h2>
            <ul className="grid grid-cols-2 gap-x-4 sm:grid-cols-1 sm:gap-x-0">
              {EXPLORE.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={l.sub ? tier2 : tier1}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* C — centre (mobile order: 4) */}
          <motion.nav variants={rise} aria-labelledby="ft-centre" className="order-4 sm:col-span-1 md:col-span-2 md:col-start-3 lg:col-span-2 lg:col-start-8 lg:order-none">
            <h2 id="ft-centre" className="text-eyebrow font-sans uppercase tracking-[0.2em] text-volt mb-5">The Centre</h2>
            <ul className="grid grid-cols-2 gap-x-4 sm:grid-cols-1 sm:gap-x-0">
              {CENTRE.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={l.sub ? tier2 : tier1}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative z-10 mx-auto mt-16 flex w-full max-w-[var(--container)] flex-col gap-2 px-[var(--gutter)] py-6 md:flex-row md:items-center md:justify-between">
        <p className="text-meta text-fg-muted">© {year} Student Activity Centre, BITS Pilani Goa</p>
        <span
          title="Figures, schedules and rosters on this site are sample data."
          className="inline-flex items-center rounded-full border border-line-volt px-2.5 py-1 text-eyebrow font-sans uppercase tracking-[0.2em] text-volt"
        >
          Sample data
        </span>
        <p className="text-meta text-fg-muted md:text-right">Made for BITS Goa</p>
      </div>
    </footer>
  );
};

export default Footer;
