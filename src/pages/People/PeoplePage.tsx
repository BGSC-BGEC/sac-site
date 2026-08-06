// src/pages/People/PeoplePage.tsx

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getPeopleByRole } from "@/lib/content";
import PersonCard from "@/components/cards/PersonCard";

function PeoplePage() {
  useDocumentTitle("People · SAC Goa", "The faculty in-charges and student committee who run the Student Activity Centre at BITS Pilani Goa.");
  const incharges = getPeopleByRole("INCHARGE");
  const committee = getPeopleByRole("COMMITTEE");

  return (
    <>
      <section
        className="mesh-teal relative isolate overflow-hidden bg-void
                   pt-[calc(4.5rem+clamp(2rem,6vh,4rem))] pb-[var(--space-section)]"
        style={{ "--mesh-strength": 0.35 } as React.CSSProperties}
      >
        <div className="relative z-10 mx-auto w-full max-w-(--container) px-(--gutter)">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-meta text-fg-muted">
              <li className="flex items-center gap-2"><Link to="/" className="hover:text-volt transition-colors">Home</Link><span aria-hidden="true" className="text-fg-faint">/</span></li>
              <li><span aria-current="page" className="text-fg">People</span></li>
            </ol>
          </nav>
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">THE SAC</p>
          <h1 className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[22ch]">Who runs it</h1>
          <p className="mt-6 max-w-[62ch] text-lead text-fg-muted">
            Two faculty in-charges hold the Student Activity Centre. The student committee runs the events on the ground.
          </p>
          <p className="mt-6 text-meta text-fg-muted">{incharges.length} faculty · {committee.length} students</p>
        </div>
      </section>

      {/* In-charges */}
      <section className="bg-abyss section-y">
        <div className="shell">
          <h2 className="font-display text-title font-semibold tracking-[-0.03em] text-fg mb-6" id="incharges">In-charges</h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {incharges.map((p, i) => (
              <li key={p.id}><PersonCard person={p} index={i} count={incharges.length} /></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Committee */}
      <section className="bg-void section-y border-t border-line">
        <div className="shell">
          <h2 className="font-display text-title font-semibold tracking-[-0.03em] text-fg mb-6" id="committee">Committee</h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {committee.map((p, i) => (
              <li key={p.id}><PersonCard person={p} index={i} count={committee.length} /></li>
            ))}
          </ul>
        </div>
      </section>

      {/* NextStep */}
      <section className="bg-abyss section-y border-t border-line">
        <div className="shell">
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">NEXT</p>
          <h2 className="font-display text-display-l font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[24ch] mb-6">Or just write to the desk</h2>
          <Link to="/contact" className="group inline-flex min-h-12 items-center text-title text-fg hover:text-volt transition-colors">
            Contact
            <ArrowRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}

export default PeoplePage;
