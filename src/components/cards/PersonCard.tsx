// src/components/cards/PersonCard.tsx
// Duotone portrait + real mailto/tel links. Not a link (no person detail route).
import { Mail, Phone } from "lucide-react";
import type { Person } from "@/types/person.types";
import { MediaFrame } from "@/components/primitives/MediaFrame";

const ROLE_LABEL = { INCHARGE: "In-charge", COMMITTEE: "Committee" } as const;

function PersonCard({ person, index = 0, count = 1 }: { person: Person; index?: number; count?: number }) {
  const isStaff = person.personRole === "INCHARGE";

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-(--radius-lg) border border-line bg-deep
                 transition-[transform,background-color,border-color,box-shadow]
                 duration-(--dur-fast) ease-out-quint
                 motion-safe:hover:-translate-y-(--lift) hover:border-line-strong hover:bg-raised hover:shadow-lift
                 focus-within:border-line-strong focus-within:bg-raised
                 sm:flex-col max-sm:flex-row max-sm:items-stretch max-sm:gap-4 max-sm:p-4"
    >
      <div className="portrait-frame relative shrink-0 overflow-hidden bg-deep aspect-[3/4] max-sm:w-[38%] max-sm:max-w-[9.5rem]">
        <MediaFrame
          src={person.photoUrl}
          alt={`${person.name} — portrait`}
          ratio="3/4"
          radius="none"
          width={560}
          className="[object-position:50%_18%] [filter:grayscale(1)_contrast(1.06)_brightness(0.94)] [transform:scale(1.02)]"
        />
        <span aria-hidden="true" className="portrait-tone absolute inset-0 bg-teal-900 [mix-blend-mode:color] opacity-25" />
        <span aria-hidden="true" className="absolute inset-0 [background:linear-gradient(to_top,var(--color-void),color-mix(in_oklab,var(--color-void)_55%,transparent)_26%,transparent_58%)]" />
        <span
          className={`absolute bottom-4 left-4 z-[4] rounded-full px-2.5 py-1 text-eyebrow uppercase tracking-[0.2em] ${
            isStaff ? "bg-volt text-ink" : "border border-line-volt bg-void text-cream-dim"
          } max-sm:bottom-2 max-sm:left-2`}
        >
          {isStaff ? "In-charge" : "Committee"}
        </span>
      </div>

      <div className="p-6 max-sm:p-0">
        <p className="font-display text-meta tabular-nums text-fg-faint">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <h3 className="mt-3 font-display text-title font-semibold leading-[1.05] tracking-[-0.03em] text-cream">
          {person.name}
        </h3>
        <p className="mt-1.5 text-meta text-fg-muted">{person.designation}</p>
        {person.department && (
          <p className="mt-3 line-clamp-2 text-meta text-fg-muted">{person.department}</p>
        )}
        {(person.email || person.phone) && (
          <>
            <hr className="mt-5 border-0 border-t border-line" />
            <div className="mt-4 flex items-center gap-1 max-sm:mt-3 max-sm:flex-col max-sm:items-stretch max-sm:gap-0">
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  aria-label={`Email ${person.name} at ${person.email}`}
                  className="inline-flex items-center text-meta text-fg-muted underline decoration-1 decoration-line-volt underline-offset-4 transition-colors duration-(--dur-fast) ease-out-quint hover:text-volt hover:decoration-volt focus-visible:text-volt max-sm:min-h-12 max-sm:no-underline"
                >
                  <Mail aria-hidden="true" className="mr-2 size-4 text-fg-faint transition-colors duration-(--dur-fast) ease-out-quint group-hover:text-volt" />
                  Email
                </a>
              )}
              {person.email && person.phone && (
                <span aria-hidden="true" className="mx-3 h-3 w-px shrink-0 bg-line-strong max-sm:hidden" />
              )}
              {person.phone && (
                <a
                  href={`tel:${person.phone.replace(/\s+/g, "")}`}
                  aria-label={`Call ${person.name} at ${person.phone}`}
                  className="inline-flex items-center text-meta text-fg-muted underline decoration-1 decoration-line-volt underline-offset-4 transition-colors duration-(--dur-fast) ease-out-quint hover:text-volt hover:decoration-volt focus-visible:text-volt max-sm:min-h-12 max-sm:border-t max-sm:border-line max-sm:no-underline"
                >
                  <Phone aria-hidden="true" className="mr-2 size-4 text-fg-faint transition-colors duration-(--dur-fast) ease-out-quint group-hover:text-volt" />
                  Call
                </a>
              )}
            </div>
          </>
        )}
      </div>
      <span className="sr-only">{ROLE_LABEL[person.personRole]}</span>
    </article>
  );
}

export default PersonCard;
