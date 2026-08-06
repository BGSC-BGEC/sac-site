// src/components/sections/FocusScene.tsx
// GSAP flagship #1 — pinned 250vh scrub. Desktop-only (>=1024 + no-preference).
// Mobile: normal-flow snap rail. gsap is dynamic-imported so mobile never downloads it.
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { DUR, EASE as MOTION_EASE } from "@/lib/motion";
import { ChevronDown } from "lucide-react";
import { getActivityCategories, getActivitiesByCategory } from "@/lib/content";
import { ACTIVITY_GRID, ACTIVITY_CELL } from "@/components/cards/ActivityCard";
import { MediaFrame } from "@/components/primitives/MediaFrame";

const ARMED_Q = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const REFRESH_DEBOUNCE = 150;
const EASE = { outQuint: "power4.out", inOutQuart: "power3.inOut" } as const;

function orbitFor(i: number, n: number, w: number, h: number) {
  const t = -Math.PI / 2 + (i / n) * Math.PI * 2;
  return { x: Math.cos(t) * w * 0.38, y: Math.sin(t) * h * 0.3 };
}
const edgeOf = (i: number) => (i % 2 === 0 ? -1 : 1);
const tiltOf = (i: number) => edgeOf(i) * (2.5 + i * 0.6);
const scaleOf = (i: number) => 0.86 + (i % 3) * 0.06;

function FocusScene() {
  const activities = getActivityCategories().flatMap(getActivitiesByCategory);
  const stageRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(ARMED_Q);
    const sync = () => setArmed(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!armed || !stage) return;

    let cancelled = false;
    let timer = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mm: any;
    const detach = () => {};

    void (async () => {
      let gsap: typeof import("gsap").gsap;
      let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
      try {
        ({ gsap } = await import("gsap"));
        ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      } catch {
        setArmed(false);
        return;
      }
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      mm = gsap.matchMedia();
      mm.add(ARMED_Q, () => {
        stage.dataset.armed = "true";
        const q = gsap.utils.selector(stage);
        const frags = gsap.utils.toArray<HTMLElement>("[data-frag]", stage);
        const n = frags.length;
        const W = () => stage.clientWidth;
        const H = () => stage.clientHeight;

        const cell = (el: HTMLElement) => {
          const c = el.parentElement!.getBoundingClientRect();
          const s = stage.getBoundingClientRect();
          return {
            x: c.left + c.width / 2 - (s.left + s.width / 2),
            y: c.top + c.height / 2 - (s.top + s.height / 2),
          };
        };

        const tl = gsap.timeline({
          defaults: { overwrite: "auto" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=250%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // BEAT 1 — statement locks centre (u 0-20)
        tl.fromTo(q("[data-statement]"),
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 16, ease: EASE.outQuint, immediateRender: true }, 0)
          .fromTo(q("[data-lead]"),
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 14, ease: EASE.outQuint, immediateRender: true }, 4)
          .to(q("[data-hint]"), { autoAlpha: 0, duration: 8, ease: EASE.inOutQuart }, 8);

        // BEAT 2 — background climb + volt bloom (u 20-70)
        tl.to(q('[data-bg="teal-900"]'), { autoAlpha: 1, duration: 24, ease: "none" }, 20)
          .to(q('[data-bg="teal-700"]'), { autoAlpha: 1, duration: 24, ease: "none" }, 44)
          .fromTo(q("[data-bloom]"),
            { scale: 0, autoAlpha: 0 },
            { scale: 1.4, autoAlpha: 0.9, duration: 50, ease: EASE.outQuint, immediateRender: true }, 20);

        frags.forEach((el, i) => {
          const enter = 20 + i * 6;
          const arrive = enter + 22;
          tl.fromTo(el,
            {
              x: () => edgeOf(i) * W() * 0.62 - cell(el).x,
              y: () => orbitFor(i, n, W(), H()).y * 0.6 - cell(el).y,
              rotate: tiltOf(i) * 2,
              scale: scaleOf(i) * 0.9,
              autoAlpha: 0,
            },
            {
              x: () => orbitFor(i, n, W(), H()).x - cell(el).x,
              y: () => orbitFor(i, n, W(), H()).y - cell(el).y,
              rotate: tiltOf(i),
              scale: scaleOf(i),
              autoAlpha: 1,
              duration: 22,
              ease: EASE.outQuint,
              immediateRender: true,
            }, enter)
            .to(el, {
              y: `+=${edgeOf(i) * 2.5}vh`,
              rotate: -tiltOf(i) * 0.6,
              duration: 70 - arrive,
              ease: "none",
            }, arrive);
        });

        // BEAT 3 — statement leaves, fragments land (u 70-100)
        tl.to(q("[data-statement]"),
            { scale: 0.86, autoAlpha: 0, duration: 22, ease: EASE.inOutQuart }, 70)
          .to(q("[data-lead]"), { autoAlpha: 0, duration: 14, ease: "none" }, 70)
          .to(q('[data-bg="deep"]'), { autoAlpha: 1, duration: 26, ease: "none" }, 74)
          .to(q("[data-bloom]"), { autoAlpha: 0.35, duration: 26, ease: "none" }, 74);

        frags.forEach((el, i) => {
          tl.to(el, { x: 0, y: 0, rotate: 0, scale: 1, duration: 24, ease: EASE.inOutQuart },
            70 + i * 1.2);
        });

        tl.fromTo(q("[data-rail-fill]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 100, ease: "none", immediateRender: true }, 0);

        return () => {
          delete stage.dataset.armed;
        };
      });

      const onResize = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => ScrollTrigger.refresh(), REFRESH_DEBOUNCE);
      };
      window.addEventListener("resize", onResize, { passive: true });
      void document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      detach();
      mm?.revert();
    };
  }, [armed]);

  if (activities.length === 0) return null;

  const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section
      id="focus"
      aria-labelledby="focus-statement"
      className="relative isolate mesh-teal bg-void"
      style={{ "--mesh-strength": 0.55 } as React.CSSProperties}
    >
      <div
        ref={stageRef}
        className={
          armed
            ? "relative h-screen overflow-clip"
            : "relative overflow-clip px-(--gutter) py-(--space-section)"
        }
      >
        {armed && (
          <>
            <div data-bg="teal-900" aria-hidden="true" className="pointer-events-none absolute inset-0 bg-teal-900 opacity-0" />
            <div data-bg="teal-700" aria-hidden="true" className="pointer-events-none absolute inset-0 bg-teal-700 opacity-0" />
            <div data-bg="deep" aria-hidden="true" className="pointer-events-none absolute inset-0 bg-deep opacity-0" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
              <div
                data-bloom
                className="h-[60vh] w-[60vh] rounded-full opacity-0 blur-(--mesh-blur) [background:radial-gradient(circle,color-mix(in_oklab,var(--color-volt)_38%,transparent)_0%,transparent_70%)]"
              />
            </div>
          </>
        )}

        {/* landing grid — ghost of #activities. Fragments are its children. */}
        <div
          className={
            armed
              ? "absolute inset-x-0 top-1/2 z-10 mx-auto w-full max-w-(--container) -translate-y-1/2 px-(--gutter)"
              : "mt-10"
          }
        >
          <ul
            data-landing
            aria-hidden={armed || undefined}
            aria-label={armed ? undefined : "Activities, horizontal list"}
            className={
              armed
                ? `${ACTIVITY_GRID} gap-y-[4vh]`
                : "-mx-(--gutter) flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-(--gutter) px-(--gutter) pb-4 [scrollbar-width:none]"
            }
          >
            {activities.map((a, i) => (
              <li
                key={a.slug}
                className={
                  armed
                    ? `${ACTIVITY_CELL} h-[26vh] min-h-[184px]`
                    : "w-[78%] shrink-0 snap-start sm:w-[52%] md:w-[38%]"
                }
              >
                <motion.div
                  {...(armed ? {} : reveal)}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: DUR.std, ease: MOTION_EASE.outQuint, delay: i * 0.06 }}
                  className="h-full"
                >
                  <Link
                    to={`/activities/${a.slug}`}
                    data-frag
                    tabIndex={armed ? -1 : undefined}
                    className="group flex h-full min-h-[184px] items-stretch gap-4 overflow-hidden rounded-(--radius-md) border border-line bg-deep outline-offset-[3px] transition-colors duration-(--dur-fast) ease-out-quint hover:bg-raised"
                  >
                    <MediaFrame
                      src={a.coverImageUrl}
                      alt=""
                      ratio="1/2"
                      radius="none"
                      width={320}
                      priority={false}
                      className="opacity-40 saturate-[0.35]"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-deep to-transparent" />
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-4 pr-4">
                      <span className="flex items-center gap-2">
                        <span className="font-display text-meta tabular-nums text-fg-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span aria-hidden="true" className="h-px flex-1 bg-line-volt" />
                        <span className="text-eyebrow uppercase tracking-[0.2em] text-volt">{a.category}</span>
                      </span>
                      <span className="truncate font-display text-title font-semibold leading-[0.92] tracking-[-0.03em] text-fg">
                        {a.name}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={
            armed
              ? "pointer-events-none absolute inset-0 z-20 grid place-items-center px-(--gutter) text-center"
              : "relative z-20"
          }
        >
          <div className="mx-auto max-w-[46rem]">
            <p className="text-eyebrow uppercase tracking-[0.2em] text-volt">The daily loop</p>
            <h2
              id="focus-statement"
              data-statement
              className="mt-4 font-display text-display-l font-semibold leading-[0.92] tracking-[-0.03em] text-cream [text-wrap:balance]"
            >
              Five spaces. Eighteen hours. One centre.
            </h2>
            <p data-lead className="mt-6 max-w-[62ch] text-lead text-fg-muted">
              The gym unlocks at 5 AM. Courts run to 10 PM. Floodlights make football an evening sport.
            </p>
          </div>
        </div>

        {armed && (
          <>
            <div data-hint aria-hidden="true" className="absolute bottom-14 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 text-eyebrow uppercase tracking-[0.2em] text-fg-muted">
              Keep scrolling
              <ChevronDown className="size-3 text-volt" />
            </div>
            <div aria-hidden="true" className="absolute inset-x-(--gutter) bottom-8 z-20 h-px bg-line-strong">
              <div data-rail-fill className="h-px w-full origin-left scale-x-0 bg-volt" />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default FocusScene;
