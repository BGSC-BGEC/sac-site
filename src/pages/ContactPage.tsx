// src/pages/ContactPage.tsx

import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getPeopleByRole } from "@/lib/content";

// Environment variables - fails gracefully with empty string if not set
const SAC_EMAIL = import.meta.env.VITE_SAC_EMAIL ?? "sac@goa.bits-pilani.ac.in";
const PHONE_DISPLAY = import.meta.env.VITE_PHONE_DISPLAY ?? "+91 832 258 0000";
const PHONE_HREF = import.meta.env.VITE_PHONE_HREF ?? "+918****0000";

function ContactPage() {
  useDocumentTitle("Contact · SAC Goa", "Reach the Student Activity Centre at BITS Pilani K K Birla Goa Campus — location, email and phone. The message form is a demo that opens your mail client.");
  const [sent, setSent] = useState(false);
  const incharges = getPeopleByRole("INCHARGE");
  const committee = getPeopleByRole("COMMITTEE");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${SAC_EMAIL}?subject=${encodeURIComponent("SAC website enquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

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
              <li><span aria-current="page" className="text-fg">Contact</span></li>
            </ol>
          </nav>
          <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-4">GET IN TOUCH</p>
          <h1 className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[22ch]">Talk to the SAC</h1>
          <p className="mt-6 max-w-[62ch] text-lead text-fg-muted">
            Facility questions, event queries, or anything this site does not answer. Phone, mail and the office address all work below.
          </p>
          <p className="mt-3 border-l-2 border-line-volt pl-3 text-meta text-cream-dim">
            The message form is a demo. It opens your mail client instead of sending — the SAC has no message backend.
          </p>
        </div>
      </section>

      <section className="bg-abyss section-y">
        <div className="shell grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <div>
            {sent ? (
              <div role="status" className="rounded-lg border border-line bg-deep p-8">
                <h2 className="font-display text-title font-semibold text-fg mb-3">Your mail client should be open</h2>
                <p className="text-body text-fg-muted">
                  If it did not open, write to{" "}
                  <a href={`mailto:${SAC_EMAIL}`} className="text-volt underline underline-offset-4">{SAC_EMAIL}</a> directly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label htmlFor="c-name" className="block text-meta text-fg-muted mb-2">Name</label>
                  <input id="c-name" name="name" type="text" required maxLength={80}
                    className="h-12 w-full rounded-sm border border-line bg-void px-4 text-body text-fg placeholder:text-fg-faint focus:outline-2 focus:outline-volt focus:outline-offset-2" />
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-meta text-fg-muted mb-2">Email</label>
                  <input id="c-email" name="email" type="email" inputMode="email" autoComplete="email" required
                    className="h-12 w-full rounded-sm border border-line bg-void px-4 text-body text-fg placeholder:text-fg-faint focus:outline-2 focus:outline-volt focus:outline-offset-2" />
                </div>
                <div>
                  <label htmlFor="c-message" className="block text-meta text-fg-muted mb-2">Message</label>
                  <textarea id="c-message" name="message" required minLength={20} rows={6}
                    className="min-h-[9rem] w-full rounded-sm border border-line bg-void px-4 py-3 text-body text-fg placeholder:text-fg-faint focus:outline-2 focus:outline-volt focus:outline-offset-2" />
                </div>
                <div className="flex items-center gap-4">
                  <button type="submit" className="inline-flex h-12 items-center rounded-full bg-volt px-6 text-body font-medium text-ink transition-[transform,box-shadow] duration-(--dur-fast) ease-out-quint motion-safe:hover:-translate-y-(--lift) hover:shadow-glow">
                    Open in mail
                  </button>
                  <span className="text-meta text-fg-faint">Nothing is sent from this page.</span>
                </div>
              </form>
            )}
          </div>

          {/* Direct channels */}
          <div className="space-y-6">
            <div>
              <h2 className="text-eyebrow uppercase tracking-[0.2em] text-fg-muted mb-3">ADDRESS</h2>
              <address className="text-body not-italic text-fg-muted">
                Student Activity Centre<br />
                BITS Pilani, Goa Campus<br />
                Zuarinagar, Goa
              </address>
            </div>
            <div className="border-t border-line pt-6">
              <h2 className="text-eyebrow uppercase tracking-[0.2em] text-fg-muted mb-3">PHONE</h2>
              <a href={`tel:${PHONE_HREF}`} className="group inline-flex min-h-12 items-center text-body text-fg hover:text-volt transition-colors">
                {PHONE_DISPLAY}
                <ArrowUpRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
            <div className="border-t border-line pt-6">
              <h2 className="text-eyebrow uppercase tracking-[0.2em] text-fg-muted mb-3">MAIL</h2>
              <a href={`mailto:${SAC_EMAIL}`} className="group inline-flex min-h-12 items-center text-body text-fg hover:text-volt transition-colors break-all">
                {SAC_EMAIL}
                <ArrowUpRight aria-hidden="true" className="ml-2 size-4 text-volt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who to ask */}
      <section className="bg-void section-y border-t border-line">
        <div className="shell">
          <h2 className="font-display text-title font-semibold tracking-[-0.03em] text-fg mb-6">Who to ask</h2>
          <ul className="space-y-4">
            <li>
              <Link to="/people" className="group flex items-center justify-between rounded-lg border border-line bg-deep p-5 hover:border-line-strong hover:bg-raised transition-colors">
                <div>
                  <p className="font-display text-title text-fg">Faculty in-charges</p>
                  <p className="text-meta text-fg-muted">Approvals and facility questions · {incharges.length} people</p>
                </div>
                <ArrowUpRight aria-hidden="true" className="size-5 text-volt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </li>
            <li>
              <Link to="/people" className="group flex items-center justify-between rounded-lg border border-line bg-deep p-5 hover:border-line-strong hover:bg-raised transition-colors">
                <div>
                  <p className="font-display text-title text-fg">Student committee</p>
                  <p className="text-meta text-fg-muted">Events and day-to-day · {committee.length} people</p>
                </div>
                <ArrowUpRight aria-hidden="true" className="size-5 text-volt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
