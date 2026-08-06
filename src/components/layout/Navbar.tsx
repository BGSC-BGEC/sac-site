// src/components/layout/Navbar.tsx
// Persistent chrome: transparent over hero, hardens on scroll, tracks
// the reader's position with a single volt underline. Five destinations,
// one CTA, nothing else.
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useReducedMotion, MotionConfig } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV, NAV_IDS, type NavItem } from "./nav";
import { useHeaderState } from "./useHeaderState";
import { useScrollSpy } from "./useScrollSpy";
import { DUR, EASE } from "@/lib/motion";
import { getPeopleByRole } from "@/lib/content";
import { Sheet, SheetContent, SheetTitle, SheetClose } from "@/components/ui/sheet";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";
  const { solid, hidden } = useHeaderState();
  const { active, overLight } = useScrollSpy(NAV_IDS, isHome, pathname);
  const tone = overLight ? "light" : solid ? "solid" : "hero";

  const incharges = getPeopleByRole("INCHARGE");
  const contactEmail = incharges[0]?.email;

  const go = (l: NavItem) => {
    setOpen(false);
    navigate(isHome ? { hash: `#${l.id}` } : l.route);
  };

  const headerCls = cn(
    "fixed inset-x-0 top-0 z-50 border-b transition-[height,background-color,border-color] duration-(--dur-std) ease-out-quint motion-reduce:transition-none",
    tone === "hero"  && "h-16 lg:h-20 bg-transparent border-transparent",
    tone === "solid" && "h-16 bg-void/72 backdrop-blur-xl border-line",
    tone === "light" && "h-16 bg-cream/92 backdrop-blur-xl border-line-strong",
  );

  const linkCls = cn(
    "relative inline-flex h-10 items-center text-meta font-medium uppercase tracking-[0.14em] transition-colors duration-(--dur-fast) ease-out-quint",
    tone === "hero"  && "text-cream hover:text-volt",
    tone === "solid" && "text-fg-muted hover:text-fg",
    tone === "light" && "text-teal-900 hover:text-ink",
  );

  const ctaCls = cn(
    "group hidden h-11 items-center gap-2 rounded-full px-5 text-meta font-semibold uppercase tracking-[0.12em] transition-colors duration-(--dur-fast) ease-out-quint hover:shadow-glow sm:inline-flex",
    tone === "light"
      ? "bg-teal-700 text-cream hover:bg-teal-900"
      : "bg-volt text-ink hover:bg-cream",
  );

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{
          duration: hidden ? DUR.std : DUR.fast,
          ease: hidden ? EASE.inOutQuart : EASE.outQuint,
        }}
        className={headerCls}
      >
        <div className="mx-auto flex h-full w-full max-w-[var(--container)] items-center justify-between px-[var(--gutter)] lg:grid lg:grid-cols-12 lg:gap-x-6">
          {/* Wordmark */}
          <Link
            to="/"
            aria-label="Student Activity Centre, BITS Pilani Goa — home"
            onClick={() => { if (isHome) window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className={cn(
              "font-display text-title font-semibold tracking-[-0.04em] leading-none",
              tone === "light" ? "text-teal-700" : "text-volt",
            )}
          >
            SAC Goa
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:block lg:col-span-8 lg:col-start-3">
            <ul className="flex justify-end gap-8">
              {NAV.map((l) => {
                const isActive = isHome ? active === l.id : pathname.startsWith(l.route);
                return (
                  <li key={l.id}>
                    {isHome ? (
                      <a href={`#${l.id}`} className={linkCls} aria-current={isActive ? "page" : undefined}>
                        {l.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className={cn("absolute -bottom-1 inset-x-0 h-0.5 rounded-full", overLight ? "bg-teal-700" : "bg-volt")}
                            transition={{ duration: DUR.std, ease: EASE.outQuint }}
                          />
                        )}
                      </a>
                    ) : (
                      <Link to={`/#${l.id}`} className={linkCls} aria-current={isActive ? "page" : undefined}>
                        {l.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-underline"
                            className={cn("absolute -bottom-1 inset-x-0 h-0.5 rounded-full", overLight ? "bg-teal-700" : "bg-volt")}
                            transition={{ duration: DUR.std, ease: EASE.outQuint }}
                          />
                        )}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block lg:col-span-2 lg:col-start-11 justify-self-end">
            <Link to="/contact" className={ctaCls}>
              Get involved
              <ArrowUpRight className="size-3.5" aria-hidden="true" strokeWidth={2} />
            </Link>
          </div>

          {/* Mobile trigger — hidden on desktop where the full nav + CTA show */}
          <Sheet open={open} onOpenChange={setOpen}>
              <button aria-label="Open menu" onClick={() => setOpen(true)}
                className="grid size-12 place-items-center -mr-2 lg:hidden">
                <Menu className="size-5" />
              </button>
              <SheetContent
                side="right"
                showCloseButton={false}
                className="data-[side=right]:w-full data-[side=right]:sm:max-w-none border-l-0 p-0
                           bg-void/97 mesh-volt [--mesh-strength:0.3]
                           duration-(--dur-std) ease-out-quint
                           data-closed:duration-0 motion-reduce:animate-none lg:hidden"
              >
                <SheetTitle className="sr-only">Site menu</SheetTitle>
                <div className="flex h-full flex-col px-4 pt-4 pb-8">
                  <div className="flex items-center justify-between">
                    <Link to="/" className="font-display text-title font-semibold tracking-[-0.04em] text-volt"
                          onClick={() => setOpen(false)}>
                      SAC Goa
                    </Link>
                    <SheetClose asChild>
                      <button aria-label="Close menu"
                        className="grid size-12 place-items-center rounded-sm text-fg-muted hover:text-fg">
                        <X className="size-5" />
                      </button>
                    </SheetClose>
                  </div>

                  <p className="mt-8 mb-4 text-eyebrow uppercase tracking-[0.2em] text-volt">
                    <span aria-hidden="true" className="mr-2">▸</span>Menu
                  </p>

                  <motion.ul
                    initial="hidden" animate="show"
                    variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: reduce ? 0 : 0.06 } } }}
                    className="divide-y divide-line [&>li:last-child]:border-0"
                  >
                    {NAV.map((l, i) => {
                      const isActive = isHome ? active === l.id : pathname.startsWith(l.route);
                      return (
                        <motion.li key={l.id}
                          variants={{
                            hidden: { opacity: 0, y: 24 },
                            show: { opacity: 1, y: 0, transition: { duration: DUR.std, ease: EASE.outQuint } },
                          }}>
                          <button type="button" onClick={() => go(l)}
                            aria-current={isActive ? "page" : undefined}
                            className="flex min-h-12 w-full items-baseline gap-4 py-4 text-left">
                            <span className="w-8 shrink-0 font-display text-meta tabular-nums text-fg-faint">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className={cn(
                              "font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92]",
                              isActive ? "text-volt" : "text-cream",
                            )}>
                              {l.label}
                            </span>
                          </button>
                        </motion.li>
                      );
                    })}
                  </motion.ul>

                  <div className="mt-auto">
                    <Link to="/contact" onClick={() => setOpen(false)}
                      className="flex h-12 w-full items-center justify-center rounded-full bg-volt px-6
                                 text-meta font-semibold uppercase tracking-[0.12em] text-ink">
                      Get involved
                    </Link>
                    <p className="mt-6 text-meta text-fg-muted">BITS Pilani, Goa Campus</p>
                    {contactEmail && (
                      <>
                        <a href={`mailto:${contactEmail}`}
                          className="mt-1 inline-flex min-h-12 items-center text-meta text-cream-dim hover:text-volt transition-colors">
                          {contactEmail}
                        </a>
                        <p className="mt-2 text-eyebrow uppercase tracking-[0.2em] text-fg-faint">
                          ▸ Sample contact data
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </motion.header>
    </MotionConfig>
  );
}

export default Navbar;

