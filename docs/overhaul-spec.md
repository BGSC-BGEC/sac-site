# SAC Goa — build specification

**Subject:** the complete rebuild of the BITS Pilani Goa Student Activity Centre site.
**Status:** specification complete and fully ruled. Every open question is closed — all 46
are listed in Appendix A with the decision that settled each. Nothing in it is built yet.
**Supersedes:** `docs/overhaul-blueprint.md`, which stays in the repo as the record of the
argument. This document is the answer.

Read Part 1 first — it carries the locked decisions, the real contents of the mock data,
the six contracts, and the ruling on every point where two chapters disagreed or flagged a
call for a human. Every other part assumes it. Where a ruling and a chapter disagree, the
ruling wins; the chapter is superseded on that point only.

This is written to be handed to someone who was not in any of the conversations behind it.
Build in the slice order in Part 7; nothing in Part 8 is optional.

## Contents

- [Part 1 — Decisions and ground truth](#part-1--decisions-and-ground-truth)
  - [What this document is, and what it decides](#what-this-document-is-and-what-it-decides)
- [Part 2 — The design system](#part-2--the-design-system)
  - [The stylesheet — complete authored `src/index.css`](#the-stylesheet--complete-authored-srcindexcss)
- [Part 3 — The homepage, band by band](#part-3--the-homepage-band-by-band)
  - [Section 1 — Hero](#section-1--hero)
  - [Section 2 — Live pulse strip](#section-2--live-pulse-strip)
  - [Section 3 — What SAC is](#section-3--what-sac-is)
  - [Section 4 — Flagship pinned scene (GSAP)](#section-4--flagship-pinned-scene-gsap)
  - [Section 5 — Explore activities](#section-5--explore-activities)
  - [Section 6 — Featured event](#section-6--featured-event)
  - [Section 7 — People behind the pulse](#section-7--people-behind-the-pulse)
  - [Section 8 — Impact (second GSAP scene)](#section-8--impact-second-gsap-scene)
  - [Section 9 — Stories in motion](#section-9--stories-in-motion)
  - [Section 10 — Achievements](#section-10--achievements)
  - [Section 11 — Join (the inverted light section)](#section-11--join-the-inverted-light-section)
  - [Section 12 — Footer](#section-12--footer)
- [Part 4 — Shell and navigation](#part-4--shell-and-navigation)
  - [Navbar & anchor/route hybrid](#navbar--anchorroute-hybrid)
- [Part 5 — Component reference](#part-5--component-reference)
  - [Component API reference I — shell, motion and media primitives](#component-api-reference-i--shell-motion-and-media-primitives)
  - [Component API reference II — content, state and navigation components](#component-api-reference-ii--content-state-and-navigation-components)
  - [Shared library files — `motion.ts`, `format.ts`, `content.ts`](#shared-library-files--motionts-formatts-contentts)
- [Part 6 — Routes](#part-6--routes)
  - [Detail-route specs — all 15 routes](#detail-route-specs--all-15-routes)
- [Part 7 — Build plan](#part-7--build-plan)
  - [File manifest, dependency plan, asset pipeline, slices](#file-manifest-dependency-plan-asset-pipeline-slices)
- [Part 8 — Quality gates](#part-8--quality-gates)
  - [Metadata and the accessibility spec](#metadata-and-the-accessibility-spec)
  - [Performance budget and the grep gates](#performance-budget-and-the-grep-gates)
  - [The verification suite — Playwright](#the-verification-suite--playwright)
- [Appendix A — Open questions](#appendix-a--open-questions)

---

## Part 1 — Decisions and ground truth

What is locked, what the data actually contains, the six contracts every chapter leans on, and the ruling on every place two chapters disagreed.

---

### What this document is, and what it decides

This is the build specification for the rebuild of the BITS Pilani Goa Student Activity Centre site. It is not a pitch, not a moodboard and not a backlog. Every section states a canvas, a wireframe, exact copy, exact tokens, exact component APIs, exact data selectors, exact motion parameters with durations and reduced-motion behaviour, and an acceptance list. If a decision is not written down here, it has not been made.

It supersedes `docs/overhaul-blueprint.md`, which stays in the repo as the record of how we got here. The blueprint is the argument; this is the answer.

**Read it in this order.**

| Part | You are looking for |
|---|---|
| 1 — Decisions & ground truth | This chapter. Locked choices, the real state of the mock data, the six cross-cutting contracts, and the conflict rulings |
| 2 — The design system | The complete authored `src/index.css`: palette, type scale, spacing, shadows, mesh, grain, the reduced-motion damper |
| 3 — The homepage, band by band | Twelve chapters, one per band, in scroll order |
| 4 — Shell & navigation | Navbar, mobile sheet, skip link, the anchor/route hybrid |
| 5 — Component reference | Every shared component's props, states, classes and must-nots, plus `src/lib/*` |
| 6 — Routes | All fifteen routes, each with its `PageIntro`, bands, data, defect ledger and empty states |
| 7 — Build plan | File manifest, dependency add/remove ledger, asset pipeline, and the slice order to build in |
| 8 — Quality gates | SEO & accessibility, performance budget with grep gates, and the Playwright suite |
| Appendix A | The 46 open questions, verbatim, grouped by chapter. Everything not ruled on below |

**Precedence, when two chapters disagree.** Later parts do not override earlier ones; ownership does. Each concern has exactly one owner:

| Concern | Owner |
|---|---|
| Colour, type, spacing, shadow, motion **token values** | Part 2, the stylesheet |
| Page copy — `<h1>`, headings, lead, button labels, empty-state text | The route or section chapter that renders it |
| `<title>`, meta description, JSON-LD, landmark structure, contrast, touch targets | Part 8, SEO & accessibility |
| A shared component's props and classes | Part 5 |
| A route-only component's implementation | Part 6 |
| Bundle budgets, image parameters, splitting, the grep gates | Part 8, performance |
| Anything still contested | §5 of this chapter. **This chapter wins.** |

---

#### 1. Locked decisions

These were settled before authoring and are not reopened by any chapter.

| Decision | Value | Consequence |
|---|---|---|
| Scope | **Sports and fitness only.** No esports, no cultural, no clubs | The two categories in the data (`Sports`, `Fitness`) are the whole information architecture. Nothing invents a third |
| Imagery | **Graphic-led, photo-light** | The hero is typographic and has zero photographs. Photography appears only where it is the content: activity covers, people, galleries. Every other surface is mesh + grain + type |
| Motion | **Signature-heavy** | `motion/react` owns all React choreography — entrances, staggers, layout, counters, hover. GSAP + ScrollTrigger owns exactly **two** flagship scenes, `#focus` and `#impact`, both on `/`, both in the lazy `home` chunk. No third GSAP scene without deleting one |
| Palette | Sampled from `palette.png` | `#ecffb6` cream, `#d6fb00` volt, `#00545f` deep teal, on a near-black void, under a grainy blurred mesh gradient. Token names and exact values in Part 2 |
| Accent budget | ≤10% of any viewport is volt | Volt is for one CTA, one eyebrow, one live dot, one focus ring. It stops meaning "look here" the moment it is everywhere |
| Inverted band | **Exactly one.** `#join`, on `mesh-cream` | The site is dark. One cream band at the payoff is a punctuation mark; two is a theme |
| Data | The existing mocks, unedited, read through one selector module | No fabricated activities, events, people, venues or numbers anywhere. Where the mock is thin, the UI degrades honestly — see §2 |
| Reduced motion | Removes movement, never content and never function | Every motion table in every chapter carries a `prefers-reduced-motion` column. No effect is the only route to information |

---

#### 2. Data reality — read this before writing any band

Every number below was read out of `src/mock/*` and counted. Chapters depend on these facts; a band that assumes otherwise is wrong, not the data.

| Fact | Value | What it forces |
|---|---|---|
| Activities | **5** — basketball, football, badminton (`Sports`); swimming, gym (`Fitness`) | Every "five" in the copy is real. Grids are specified for 5, and for 3 and 2 after filtering |
| Categories | **2**, exactly `Sports` and `Fitness` | `getActivityCategories()` is the only source. The legacy `Recreation` chip matched zero records and is deleted |
| `categoryData.Recreation` = 15% | A **programme type** in one pie chart | Never a category, never a filter value, never a link. Labelled as a sample in the chart caption |
| Timings | Every activity has exactly **one** timing, at `dayOfWeek: 1` | `getOpenNow()` returns `"unknown"`, never `false`. Hours are labelled **"Monday schedule"** everywhere. "Open now" is gated behind `hasTimingForToday()` so the site never claims "Closed" on a Tuesday |
| Events | **3**: `2026-06-12` interbits-football (`isFeatured: true`), `2026-07-01` fitness-challenge (`isFeatured: true`), `2026-08-05` swimming-championship (`isFeatured: false`) | The calendar **ends 2026-08-05**. See **R1** |
| People | **2** `INCHARGE` + **2** `COMMITTEE` | `/people` is two small rows, not a directory. `md:grid-cols-2` on in-charges |
| Achievements | **5** — National ×2, State, Inter-NIT, Campus; years 2026, 2025 ×2, 2024 ×2 | `imageUrl` is populated on **zero** records, so achievement cards are typographic with no image slot. Not a fallback — no slot exists |
| Achievement `studentName` | Free strings; none matches a `mockPeople` record | Names stay plain text. No `/people` cross-link |
| Galleries | 5 activity sets × 3 images; 3 event sets × 3 images | Wrap-around in the lightbox is reachable in two keypresses. No set is large enough to need pagination or `Home`/`End` |
| `participationData` | **7** rows — includes `Yoga` and `TT` | Chart labels only. Neither is an activity, neither is linkable. `/stats` says `7 activities` because the chart has seven bars; `/activities` says `5 facilities` because there are five |
| `trendData` | **11** rows, Jan–Nov, no year | December is rendered as a real tick with `value: null`, `connectNulls={false}`, and a **"Not recorded"** row in the table alternative. Never padded to zero, never silently dropped |
| Growth strings | Card 3's "growth" is the non-numeric string `"Most Participated"` | `formatGrowth()` returns `dir: "none"` and renders no arrow. The current hardcoded green ↑ on all four cards is a lie being fixed |
| `motion`, `gsap` | **Absent** from `package.json` and `node_modules` | `npm i motion gsap` is a hard prerequisite of the first slice |
| Repo naming | `ContactPage.tsx:68` and `Footer.tsx:9` say "Sports Activities Centre" | Wrong name. See **R8** |

**The one recommended data change, and it is not a blocker.** Add a single future event to `src/mock/mockEvents.ts` with a `startDate` a few weeks out. That is the difference between a demo that shows a live countdown and one that shows a season-break empty state. Every chapter is specified for **both**, so nothing waits on it, and no chapter fakes a clock to get the nicer render.

---

#### 3. The six contracts

Each is defined once, by name, in the chapter listed. Every other chapter references it. Four have grep gates in Part 8.

| # | Contract | Owner | Gate |
|---|---|---|---|
| **C1** | **Focus.** `src/index.css` sets one global `:focus-visible { outline: 2px solid var(--color-volt); outline-offset: 3px }`. `.light-section :focus-visible` flips the colour to `--color-teal-900`. No component re-declares a ring | Part 5, shell components | 13 |
| **C2** | **The card root.** One `cardRoot` string, defined once, composed by all six cards. No card re-types a hover treatment | Part 5, shell components | — |
| **C3** | **Card semantics.** A card that navigates **is** the `<a>`/`<Link>`. Never a `<div onClick>`, never a stretched-link pseudo-element, never nested interactives. Two destinations → the root is a `<div>` holding two real links | Part 5, shell components | — |
| **C4** | **No inline transitions.** Every duration and easing comes from `src/lib/motion.ts`, which mirrors the `@theme` tokens. A `transition={{ … }}` in `src/` is a bug | Part 5, `src/lib` | 10 |
| **C5** | **One activity order, one grid.** `getActivityCategories().flatMap(getActivitiesByCategory)` is the single ordering expression — basketball, football, badminton, swimming, gym — and `ACTIVITY_GRID` (`grid grid-cols-12 gap-x-6`) / `ACTIVITY_CELL` (`col-span-4`) are exported constants. `#focus`'s fragments 01–05 and `#activities`'s cards must land in the same order in the same columns, or the flagship scene's payoff misses | Part 3, `#focus` | — |
| **C6** | **One data boundary.** Nothing outside `src/lib/content.ts` imports from `src/mock/*`. Components take props; pages call selectors | Part 5, `src/lib` | 14 |

C1's inversion is not a preference. Volt on cream measures **1.11:1** — a volt focus ring inside `#join` is invisible. Teal-900 on cream measures **11.61:1**.

---

#### 4. Why `.light-section` exists at all

One band inverts. Rather than a second theme, `.light-section` rebinds the token *layer*: `--color-fg`, `--color-fg-muted`, `--color-line`, `--color-deep` and `--color-raised` all point at their cream-band equivalents inside that scope. Consequence, deliberately: a `bg-deep` card dropped into `#join` inverts automatically without a single conditional class. Every component is written once and works on both canvases.

---

#### 5. Conflict rulings — this section wins

Twenty-three chapters were authored in parallel against the same brief. Where two disagree, the ruling below is the answer, and the losing chapter's text is superseded on that point only. Nothing else in the losing chapter is affected.

##### R1 — Today's date, and the tense of every event

**The conflict.** The route chapters were authored with "today" at `2026-08-06`, where all three mock events are past. Thirteen section chapters were authored at `2026-08-05`, where swimming-championship is live.

**The ruling: the spec is date-independent. Neither date is canon.** Both renders are real and both are specified. Nothing hardcodes a demo date, and no chapter fakes a clock.

| Branch | When | What renders |
|---|---|---|
| **Live day** | `today() === 2026-08-05` | Hero live card with a pulsing dot; pulse chip 1 = the event with `Happening today`; `#events` = the full featured-event band; `/events` "Coming up" = one card |
| **Season break** | `today() >= 2026-08-06` | Hero shows the **Season break** card, no dot; pulse chip 1 = **Season wrap — nothing on the calendar**; `#events` switches its eyebrow to **LATEST RECAP** and shows the most recent past event; `/events` "Coming up" = `EmptyState`, "Past" = three cards |

Rules that fall out of this and are binding everywhere:

- No band ever renders a bare zero, an empty grid, or a dangling "Coming up" header with nothing under it. Every band's degraded state is specified in its own chapter.
- The word "Register" appears nowhere in the spec. There is no registration backend, so no state needs one.
- `getFeaturedEvent()` never returns `null` while `mockEvents` is non-empty — it always falls through to the most recent past event. Consumers still handle `null`, because an empty mock array is one edit away.
- The live dot's CSS animation exists **only** in the live branch. It is not rendered-and-hidden; it is not rendered.

##### R2 — Page copy

**The conflict.** The SEO chapter and the test chapter both quoted `<h1>` strings that the route chapters do not use.

**The ruling: the chapter that renders the copy owns the copy.** Part 8 owns `<title>` and the meta description; it quotes the `<h1>` for reference only. Where a quote and a route chapter disagree, the route chapter is right and the quote is a stale copy. Both files have been corrected; this ruling covers the next drift.

##### R3 — Heading ids versus anchor ids

**The conflict.** Section chapters use two id conventions for their `<h2>`: `activities-title`, `impact-title`, `gallery-title`, `wins-title`, `join-title`, `events-title` alongside `about-heading`, `focus-statement`, `people-heading`.

**The ruling: leave them. Do not normalise.** A heading id is a private wire between an element and the `aria-labelledby` that points at it — its spelling is meaningless as long as the two match, and a rename across nine chapters buys nothing while risking exactly one typo that silently unlabels a landmark. The binding rules are:

1. A heading id must never collide with a **section anchor** id. Anchors are the bare nouns (`#about`, `#focus`, `#activities`, `#events`, `#people`, `#impact`, `#gallery`, `#wins`, `#join`, `#pulse`) because they are in URLs and shared. Heading ids always carry a suffix, so they cannot collide.
2. Every `aria-labelledby` resolves to an element that exists. Part 8's landmark map is the checklist.
3. The pulse strip has **no heading** by design — it is `<section aria-label="Live campus pulse">`. A visible heading over four live chips is furniture; the strip's job is to be read in one glance.

##### R4 — Lightbox ownership and image URLs

**The ruling:** `GalleryLightbox` is specified **once**, in Part 6 §5 — full source, call site and behaviour contract. Part 5's component reference carries only the trigger-facing contract and points there. Two amendments to the Part 6 listing:

1. The `<img src>` goes through the width helper — `withUnsplashParams(image.imageUrl, 1600)`, not the raw URL. Part 8's image policy applies to every Unsplash URL in the app with no exceptions, and all 20 bare URLs in the mocks currently fetch full-resolution originals.
2. The close control is `dialog.tsx`'s built-in X resized to `min-h-12 min-w-12`. It is 32px today, which fails 2.5.8. Do not substitute `Button size="icon-sm"` — that is also 32px.

Also settled, because two chapters described it differently: the frame step on prev/next is an **opacity-only crossfade at `--dur-fast`**. Not a hard swap, not a slide. Opening is opacity + `scale(0.97→1)` at `--dur-std`; under reduced motion, opacity only at `--dur-fast`.

##### R5 — One filter control pattern

**The conflict.** `#activities` specifies `<button type="button" aria-pressed>` inside `role="group"`. Part 6's `FilterRow` specifies `<button role="radio">` inside `role="radiogroup"`.

**The ruling: `aria-pressed` toggle buttons, everywhere.** A `radiogroup` owes the user arrow-key navigation and a single tab stop; declaring the role without the keyboard behaviour is worse than not declaring it. Three to five options are faster to reach with three to five tab stops than with a roving tabindex. `FilterRow` keeps its `<fieldset>` + mandatory `<legend>` — that is the real fix for the unlabelled level row at `AchievementsPage.tsx:88-101` — and drops the radio roles:

```tsx
<fieldset>
  <legend className="text-eyebrow …">{label}</legend>
  <div role="group" aria-label={`Filter by ${label.toLowerCase()}`}>
    {options.map(o => (
      <button key={o} type="button" aria-pressed={o === value} onClick={() => onChange(o)} className={…}>
        {o}
      </button>
    ))}
  </div>
</fieldset>
```

State is conveyed by `aria-pressed`, never by colour alone.

##### R6 — Which event is "featured"

**The conflict.** The `#events` chapter falls back to the latest event carrying `isFeatured`, which surfaces fitness-challenge (`2026-07-01`) even on a day when swimming-championship is actually happening. `src/lib/content.ts` resolves by date first.

**The ruling: the selector wins. `isFeatured` is a tie-break, never an override.** Resolution order is fixed:

1. An event happening **today**.
2. Otherwise the **next upcoming** event.
3. Otherwise the **most recent past** event, and the band relabels to `LATEST RECAP`.

Within a tier, `isFeatured` picks; failing that, the first in date order. A flag in a mock file cannot outrank the calendar — a site that headlines last month's event while today's is running is broken in the most visible way available.

##### R7 — `fg-faint`

**The conflict.** The footer chapter refuses the token (3.79:1 on void, below AA for text under 24px). The people chapter uses it for `department` (3.14:1 on deep) and mitigates with a hover escalation. Part 8 rules it "large text and non-text UI only".

**The ruling: Part 8's rule, applied without exception.** `fg-faint` is legal for exactly four things — an `aria-hidden` breadcrumb separator, the `aria-hidden` lightbox counter, inactive rail bars (non-text UI, ≥3:1 satisfied), and a timestamp that is also carried in a `<time datetime>` attribute. Everything else uses `fg-muted`.

Therefore `department` on `PersonCard` renders at **`fg-muted` at all times**, and the hover/focus-within escalation is deleted. Contrast that depends on hovering is not contrast — a keyboard user reading a card has not hovered it, and a touch user never will.

##### R8 — The name of the building

**The ruling: "Student Activity Centre".** Singular "Activity". `src/pages/ContactPage.tsx:68` and `src/components/layout/Footer.tsx:9` both say "Sports Activities Centre" and are both wrong. Grep gate 17 keeps it that way. The wordmark stays short: **"SAC Goa"** in the navbar, **"SAC"** in the footer.

##### R9 — The ghost border on the cream band

**The ruling:** the secondary CTA's border in `#join` is `ink/45` **at rest**, not `ink/20`. `ink/20` measures 1.66:1 against cream, and WCAG 1.4.11 requires 3:1 for the boundary of a control. A button whose edge you cannot find is not a button. Hover/focus may go darker still; it may not go lighter.

##### R10 — `--shadow-glow`

**The ruling: accept the amendment.** `--shadow-glow` reads its volt percentage from `--glow-mix`, default `28%`, and Part 2 defines that variable alongside the shadow. The `#activities` feature card sets `--glow-mix: 40%` locally. This keeps the three-recipe shadow system intact instead of growing a fourth bespoke `shadow-[…]`, which is what the alternative costs.

##### R11 — The hero live card's footer counts

The hero's live-context card ends in two volt numerals: `5 activities · 3 venues`, from `getSiteCounts()`.

**The ruling: `5 activities · 2 categories`.** `venues: 3` is derived from the distinct venue strings on `mockEvents` — activities carry no `venue` field at all — so it undercounts five facilities as three, and it would silently change if someone edited an event's venue string. `getSiteCounts()` returns `{ activities: mockActivities.length, categories: getActivityCategories().length }`. Both numerals stay computed; neither is typed. The card's shape, both numerals in volt, is unchanged.

##### R12 — Tailwind 4 arbitrary-value syntax

Three chapters were authored across Tailwind's syntax change and contain forms that **emit no CSS**: `py-[--space-section]` and `scroll-mt-[--nav-h]` in `#activities`, `-translate-y-[--lift]` in `#people`. Others use the working-but-noisy `var()` long-hand: `duration-[var(--dur-std)]` and `ease-[var(--ease-out-quint)]` in the navbar chapter, `py-[var(--space-section)]` in `#gallery`.

**The ruling: `(--x)` is canon.** `py-(--space-section)`, `-translate-y-(--lift)`, `duration-(--dur-std)`. Gate 12 catches the silent no-op; gates 11 and 18 catch the long-hand. A silent no-op is worse than a build error — `py-[--space-section]` reads as a spacing rule in review and ships as zero padding.

##### R13 — The live pulse strip is four chips

The brief sketched a 3-up reduced-motion grid; the strip carries four data points (event, open-now, top activity, participants).

**The ruling: keep four.** `lg:grid-cols-4`, `grid-cols-2` below. Dropping a chip to satisfy a grid deletes a live datum, which is the one thing this band exists to show.

##### R14 — Deleted controls stay deleted

`/stats` ships **seven** controls that do nothing: `This Month` (`:46`), `This Semester` (`:49`), `Export Report` (`:53`), `Participants` (`:107`), the `This Month` pie toggle (`:128`), the `This Month` trend toggle (`:149`), and `View All` on insights (`:236`). `/contact` ships three `href="#"` social links. All ten are **deleted**, not disabled and not stubbed. `:167`'s `View All` becomes a real `<Link to="/activities">All activities</Link>`. Exactly one control is added: the band-3 sort toggle, `Most first` / `A–Z`, which genuinely reorders the bars. Gate 7 keeps `href="#"` out; Part 8's suite asserts the seven are gone.

##### R15 — `--color-destructive` maps to volt

There is no red in the palette. **The ruling: do not add one.** `/contact` uses native constraint validation, so error text is the browser's own message beside the field, not a colour. An `aria-invalid` field ringing in volt is acceptable precisely because the message is always literal words. If a real backend ever returns field errors, that is when a `--color-alert` token gets added — and Part 2 says so in place.

##### R16 — One `src/lib/content.ts`, one set of names

**The conflict.** Two chapters print a full `content.ts`: Part 5 (`src/lib`) and Part 6 §2. They overlap, and they disagree on three names and on two behaviours.

**The ruling: Part 5 is the implementation of record.** Part 6's inline listing is a reading aid for the route specs and is superseded wherever the two differ. The union — this table is the complete export surface, and nothing else is added without amending it here:

| Export | Source | Note |
|---|---|---|
| `today()`, `eventStatus()` | Part 5 | Injectable `now`, so the suite can pin a date without app code branching |
| `getFeaturedEvent()` | Part 5 | Date-first. **Supersedes** Part 6's `mockEvents.find(e => e.isFeatured)`, per **R6** |
| `getEventsByPhase()` | Part 6 | Adopted — `{ today, upcoming, past }` in one sort. `getUpcomingEvents()` / `getPastEvents()` are thin readers over it |
| `getEventPhase()` | — | **Dropped.** It is `eventStatus()` under a second name; two names for one predicate is how they drift apart |
| `getEventBySlug()` | Part 5 | |
| `getActivities()`, `getActivityBySlug()`, `getActivitiesByCategory()` | Part 5 | |
| `getActivityCategories()` | **Renamed** | Part 5 calls it `getCategories()`; eight chapters call it `getActivityCategories()`. The longer name wins on usage and on clarity — `categoryData` in the stats mock is a different thing entirely |
| `getCategoryCounts()` | Part 5 | `{ Sports: 3, Fitness: 2 }`, feeding the chip counts |
| `getOpenNow(activity)` | Part 5 | Per-activity, returns `"open" \| "closed" \| "unknown"`. Strict `dayOfWeek` match |
| `getOpenActivitiesNow()` | Adopted, redefined | `mockActivities.filter(a => getOpenNow(a).state === "open")`. One predicate, not two |
| `hasTimingForToday()` | Part 6 | Adopted. Gates the whole "Open now" affordance so the site never implies "Closed" from missing data |
| `getGalleryFor()`, `getGalleryCounts()` | Part 5 | Counts built once as a lookup, never `.find()` inside `.map()` |
| `getPeopleByRole()` | Part 5 | |
| `getAchievements()`, `getAchievementFilters()`, `filterAchievements()` | Part 5 | |
| `getRecentAchievements(limit = 3)` | Part 3, `#wins` | Adopted into `content.ts` — `#wins` and `/achievements` must not sort differently |
| `getStatSummary()` | Part 5 | |
| `getSiteCounts()` | Part 3, hero | `{ activities, categories }` per **R11** |

**And the behaviour that has to be corrected.** The pulse-strip chapter reads `timings[0]` as "the canonical daily window" so that its open-now chip has something to say on a Tuesday. That is the one thing this spec has refused everywhere else: asserting a fact the data does not carry. `getOpenActivitiesNow()` does a **strict `dayOfWeek` match**. On six days out of seven it returns `[]`, `hasTimingForToday()` is `false`, and the chip renders the published Monday schedule instead — which the same chapter already specifies as its empty case. A schedule is a fact; a live status inferred from one Monday row is a guess wearing a live dot.

##### R17–R38 — the twenty-two remaining calls

R1–R16 settle conflicts *between* chapters. These twenty-two settle the judgement calls the chapters raised against themselves and flagged for a human. All twenty-two are now answered; **Appendix A carries none that are still open.**

Sixteen are confirmations — the chapter is right, and the ruling exists so nobody relitigates it in review:

| | Call | Ruling |
|---|---|---|
| **R17** | Hero's live-context card links to `/events/{slug}` | **Confirmed.** It stays clickable. It carries no button styling, so it reads as context rather than a third CTA, and a card showing a live event that cannot be opened is a dead end |
| **R18** | `#about` numeral and title are both `--text-title`, separated only by colour | **Confirmed.** Numeral in volt with `tabular-nums`, title in `fg`. A same-size numeral is an editorial index, and it is the band's one typographic gesture. Colour carries no information here, so 1.4.1 is not engaged. No seventh type size is invented |
| **R19** | `#about` principles stack until `md` (768), not `sm` (640) | **Confirmed.** Three 190px columns at 640px cannot hold a `--text-title` word plus two lines of body. Stacked-and-readable beats side-by-side-and-cramped |
| **R20** | `#about` copy hardcodes `five` / `two` / `05:00` / `23:00` as prose | **Confirmed, with the assert.** "Five activities across two categories" is writing; `{getSiteCounts().activities} activities` is a template. Keep the DEV-only `console.assert` against the mock so the copy cannot drift silently — that is what makes hardcoding legitimate rather than lazy |
| **R21** | `#focus` headline "Eighteen hours" derives from Gym `05:00–23:00` | **Confirmed, scoped.** The copy names the Gym, so eighteen hours is a true statement about one facility, not a site-wide claim the data cannot support. It stays literal copy — never computed, never generalised to the other four activities |
| **R22** | `#focus` fragment rows are 26vh; `#activities` cards are `aspect-[4/5]` | **Confirmed — the break is accepted.** A pinned cinematic scene and a browsable grid do different jobs. The section gap resets the eye. Only column *x* and width match, as authored |
| **R24** | `#activities` mobile rail is one uniform `aspect-[3/2]`, feature included | **Confirmed.** A rail is read by swiping, not by scanning hierarchy. A taller first cell breaks the snap rhythm and buys nothing. Being first is the feature's promotion below 640 |
| **R26** | `#events` omits a third "See the photos" CTA | **Confirmed.** The two-CTA cap holds. Note the cap is the *only* reason — `/gallery/events/:slug` survives per **R38**, so the link has a valid target if this is ever revisited |
| **R27** | `#people` below 640 is a single column of horizontal cards | **Confirmed.** 2×2 at 375px leaves ~160px portraits carrying a name, a designation and two contact links. The horizontal card keeps the portrait square and both contact rows at a labelled 48px |
| **R28** | `#people` headline "Someone unlocks the gym at 5 a.m." | **Confirmed.** Same basis as **R21**: literal copy about the Gym, and `05:00` is genuinely in the data. If gym hours change, the headline changes with them — that is a copy edit, not a bug |
| **R29** | `#impact` drops `overviewCards[3]` "Top Activity / Basketball" | **Confirmed.** Three counting numerals land as one gesture; a word sitting still among them reads as a failed animation. It survives on `/stats`, where `StatBlock`'s non-numeric path is specified |
| **R32** | `#gallery` reel is 8 of 15 images | **Confirmed.** The reel reveals captions on hover, so an image captioned `Workout Area` is dead weight in it. The chapter already names the excluded seven and the three selection rules; all 15 remain on `/gallery` |
| **R34** | Footer stacks contact above the sitemap below `md` | **Confirmed.** Someone who scrolled to the bottom of a phone wants the email or the address. The sitemap repeats what the sticky nav and the sheet menu already carry, so it is the half that can afford to be second |
| **R35** | Footer wordmark is cream, not volt | **Confirmed.** `#join` sits directly above it and holds the page's last accent moment. An 88px volt glyph twelve pixels below the primary CTA competes with it and pushes the viewport past the ≤10% budget |
| **R36** | Navbar "Impact" resolves to `/stats` off-home | **Confirmed.** The route is a charts page and `/stats` is the honest URL; the label is the story, the URL is the content. No rename through the manifest, the code-split boundary and the test route list |
| **R37** | Archivo must ship the `standard` woff2, not `wght` | **Confirmed — pay the 42 KB.** The `wdth` axis is genuinely used: `--font-display` declares `wdth 100–118` and the type scale calls `font-stretch-105%` through `font-stretch-118%`. On the `wght` file every one of those silently no-ops, which is the worst failure mode available — it looks shipped and renders flat. Source file is `archivo-latin-standard-normal.woff2` (90,104 B), copied to `public/fonts/archivo-latin-standard.woff2`. **Part 7 owns that filename**; the Performance chapter's preload snippet named `archivo-latin-wdth-normal.woff2` and is corrected to match. Slice 3's verify step stands: Archivo at `font-stretch: 112%` must render visibly wider than at 100% |

The remaining six change what a chapter specified.

**R23 — `#activities` drops the feature promotion below three results.** The chapter uses one `lg:auto-rows-fr` rule for every count, so filtering to Fitness (2 records) renders a 486×863 compact card beside a 690×863 feature. Promotion only means something when there is a field to be promoted above. **When `filtered.length < 3`, every card renders `variant="compact"` into `lg:grid-cols-2`.** `auto-rows-fr` still applies, so the pair is equal width and equal height. One conditional, and the mismatch cannot occur on Fitness or on any future two-entry category.

**R25 — the `EventCard` meta block drops to two rows.** Mock events carry no clock time, so the chapter filled the middle row with the status. The card already renders a status `Pill`, so that repeats the same word a few pixels below itself to fill a slot with nothing in it. **Meta is `date` and `venue`.** `venue` is optional, so a one-row meta block is a legal render. The status stays where it belongs — in the pill.

**R30 — `trendData` labels are derived from today.** The mock carries eleven values labelled `Jan`…`Nov` with no year, so on 2026-08-05 the chart shows September, October and November as history. **The `month` field is deleted from the mock — `trendData` becomes `number[]`, ordered oldest to newest — and labels are computed so the series always ends on the current month.**

```ts
// src/lib/content.ts
// Labels are derived, never authored: a chart that shows next month as history is a bug,
// and a hardcoded window is the same bug on a delay. Ruling R30.
export const getTrendSeries = (now = new Date()) => {
  const fmt = new Intl.DateTimeFormat("en-GB", { month: "short" })
  const n = trendData.length
  return trendData.map((value, i) => ({
    month: fmt.format(new Date(now.getFullYear(), now.getMonth() - (n - 1 - i), 1)),
    value,
  }))
}
```

`Date` normalises a negative month index across the year boundary, so the eleven-point series reads `Oct … Aug` on 2026-08-05 with no wrap-around arithmetic. The `Sample data` chip stays until SAC publishes real numbers — derived labels make the shape honest, not the values.

**R31 — the `from last month` suffix is fixed in the mock, not stripped at render.** The chapter renders `growth.replace(/ from last month$/, "")`. The suffix lives in data this repo owns, so **`mockStats` is edited at source** — `"+0.4 from last month"` → `"+0.4"`, `"+6 from last month"` → `"+6"` — and the `.replace()` is deleted. A regex that fails open is worse than no regex: change the mock wording and the suffix quietly returns to the tightest real estate in the section. The clause survives once, in the chart caption **Change since last month.**

**R33 — the gallery parallax listens for the breakpoint change.** The chapter reads `matchMedia` once at mount and flags the ceiling with a `ponytail:` comment. Dragging a desktop window narrower is a real path, and a desktop amplitude running at 380px overshoots visibly. The listener is one native line in the effect that already builds the query, so the ceiling is not worth keeping:

```tsx
const [amp, setAmp] = useState(0)
useEffect(() => {
  const mql = matchMedia("(min-width: 80rem)")
  const sync = () => setAmp(mql.matches ? 48 : 0)
  sync()
  mql.addEventListener("change", sync)
  return () => mql.removeEventListener("change", sync)
}, [])
```

State here is set on a breakpoint crossing, not per frame, so **C4**'s no-React-state-in-the-scroll-loop rule is untouched. Delete the `ponytail:` comment naming the resize ceiling — the ceiling is gone. Under `prefers-reduced-motion` the amplitude is 0 regardless, as already specified.

**R38 — the route surface, and the two redirects.** Part 6's route table and Part 7's slice 6 describe different sites, which the earlier audit missed:

| Path | Part 6 (routes) | Part 7 (slice 6) |
|---|---|---|
| `/gallery/:slug` | live, `GalleryDetailPage.tsx` | replaced by `/gallery/:kind/:slug` |
| `/gallery/events/:slug` | live, same file | gone |
| `/people/incharges`, `/people/committee` | live, `PeopleRolePage.tsx` **(new)** | gone; files deleted |

**The ruling splits them.**

*Gallery — Part 6 wins.* `/gallery/:slug`, `/gallery/events` and `/gallery/events/:slug` all stay live, two of them sharing one component. `/gallery/:kind/:slug` is dropped: it changes every gallery URL to buy nothing a second `<Route>` line pointing at the same element does not already give. **No redirect, because nothing moved.**

*People — Part 7 wins.* Part 6's `/people` is a hub of two link cards containing no people at all, feeding two sub-routes of two records each — four people spread across three pages. That is precisely the bloat this overhaul exists to remove. **`/people` becomes one page** carrying `PageIntro` and both groups directly: an `<h2>In-charges</h2>` grid and an `<h2>Committee</h2>` grid of `PersonCard`, `getPeopleByRole()` per group. No filter row — with two records per group, two headings beat a control. `PeopleRolePage.tsx` is **never created**, and Part 6 §4.12 / §4.13 is superseded in full.

Those two paths did move, so they redirect:

```tsx
<Route path="/people/incharges" element={<Navigate to="/people" replace />} />
<Route path="/people/committee" element={<Navigate to="/people" replace />} />
```

`replace` so the redirect never traps the back button. Two lines is cheap insurance against a URL shared in a WhatsApp group, which is exactly how these get shared. **The route surface is 14 paths plus the catch-all**, down from Part 6's 16.

---

#### 6. What "sexy premium" means here, operationally

The word is in the brief, so it needs a definition that can be checked rather than admired.

| It means | It does not mean |
|---|---|
| One idea per viewport, given room. `--space-section` is large and never negotiated down to fit more in | Dense dashboards. Nothing on this site is a dashboard, including `/stats` |
| Type carries the weight. A `--text-display-xl` line on a near-empty canvas is the effect | Decoration carrying the weight. There is no glassmorphism, no neon outline, no gradient text |
| Motion that reveals structure — a pin that holds while five fragments resolve into five cards, a counter that lands as you arrive | Motion that decorates. Nothing bounces, nothing spins, nothing loops in the periphery except one marquee that pauses when it is not seen |
| Restraint as the signal. ≤10% volt, one inverted band, two GSAP scenes, two typefaces, six type sizes, three shadows | Range as the signal. A second accent, a third scene or a fourth shadow makes the site look cheaper, not richer |
| Grain and a blurred mesh doing the work a photograph would | Stock photography of people high-fiving. The hero has no photograph at all |
| Fast. LCP ≤2.2 s on a throttled mid-range Android, CLS ≤0.02 | "Fast enough once it is loaded." A premium site that janks on scroll is a slow site with good taste |

Every one of those is a gate in Part 8, not an aspiration in Part 1.

---

## Part 2 — The design system

One stylesheet. Every colour, size, duration and easing in the site is a token defined here.

---

### The stylesheet — complete authored `src/index.css`

This file is the only place in the repo where a color, radius, shadow, duration or easing value may be written. Everything below the `@theme` block references a token. Verified by compiling: `vite build` with `@tailwindcss/vite` 4.3.0 → clean, 27.28 kB / 6.16 kB gzip, all 141 theme vars emitted, every utility below confirmed present in output.

---

#### 1. Decisions made in this chapter

| # | Decision | Why |
|---|---|---|
| D1 | **Keep `@custom-variant dark`, redefined to always match** — `(&:where(:root, :root *))` | 17 `dark:*` utilities live in `src/components/ui/*`. *Deleting* the rule reverts `dark:` to Tailwind's built-in `@media (prefers-color-scheme: dark)` → the UI silently changes with the visitor's OS. *Leaving* `(&:is(.dark *))` makes all 17 dead (nothing in `src/` adds `.dark`). Always-on is the only deterministic option for a permanently-dark site, and it restores the intended dark values (`dark:after:mix-blend-lighten` on avatar, `dark:ring-foreground/10` on card/dialog/dropdown, `dark:bg-transparent` on outline buttons). Zero HTML change. |
| D2 | **`--color-*: initial` — the default 22-hue palette is deleted** | This is what makes "the only colors that exist" compiler-enforced rather than a promise. `text-cyan-400` now generates *nothing*. 362 legacy occurrences across 27 files stop emitting CSS; those elements inherit `--color-fg-muted` on `--color-void` — legible, never white-on-white. Only 2 of the 362 are inside `src/components/ui/` (the two `bg-black/30` overlays), fixed from CSS in D7. |
| D3 | **`@theme static`, never `@theme inline`** | `static` guarantees `--gutter`, `--space-section`, `--container`, `--dur-*`, `--mesh-blur` survive Tailwind's unused-variable pruning. `inline` would bake color values into utilities at build time and **silently kill the `.light-section` rebind** (§7). Do not "optimise" this to `inline`. |
| D4 | **`--radius-3xl` / `--radius-4xl` aliased to `lg` / `xl`** | Six distinct values stay six. `rounded-3xl` (badge, input, dropdown, nav viewport) → 24px, `rounded-4xl` (button, card, dialog) → 32px. The primitives land on our scale without touching a single `.tsx`. |
| D5 | **`--shadow-*: initial`, then `md`/`lg`/`xl` aliased to `--shadow-lift`** | The 12 primitives use `shadow-md/lg/xl`. All three now resolve to the one elevation recipe. Three shadows total, as contracted. |
| D6 | **Mesh sections use `overflow: clip`, never `overflow: hidden`** | `hidden` makes the section a scroll container, which breaks `position: sticky` children and interferes with the GSAP pin in `#focus`. `clip` clips the bloom without creating a scroll container. |
| D7 | **Dialog/Sheet overlays re-colored from CSS via `[data-slot]`** | `bg-black/30` no longer compiles after D2. A base rule on `[data-slot="dialog-overlay"], [data-slot="sheet-overlay"]` restores the scrim in `--color-void` with **zero `.tsx` edits**. |
| D8 | **`--color-destructive` → `--color-volt`** | There is no red in this palette and inventing one violates the contract. Invalid form states are a volt ring plus literal message copy — never color alone. |
| D9 | **Accordion `@keyframes` from the vendored file are NOT inlined** | No `accordion.tsx` exists in `src/components/ui/`. If `shadcn add accordion` is ever run, re-add the two keyframes then. |
| D10 | **Three helper utilities added: `shell`, `section-y`, `no-scrollbar`** | `shell` replaces the `mx-auto max-w-7xl px-6` triplet in ~12 sections and binds them to `--container`/`--gutter`. `no-scrollbar` is required by the gallery reel and was previously supplied by the deleted vendored import. |

---

#### 2. The file

```css
/* ============================================================================
   SAC — Student Activity Centre · src/index.css
   Tailwind CSS 4.3 · React 19 · Vite 8
   Single source of truth. No file in src/ may declare a color, radius,
   shadow, duration or easing that is not a token in the @theme block below.
   ========================================================================= */

@import "tailwindcss";
@import "tw-animate-css";
@import "@fontsource-variable/inter";
/* wdth.css, NOT index.css: index.css ships the wght axis only and the
   display face needs wdth 100–118. wdth.css carries wght 100–900 AND
   font-stretch 62%–125%. Requires: npm i @fontsource-variable/archivo */
@import "@fontsource-variable/archivo/wdth.css";

/* ── Variants ─────────────────────────────────────────────────────────────
   The site is permanently dark and nothing ever adds a .dark class.
   `dark:` is redefined to always match so the 17 dark:* utilities inside
   src/components/ui/* apply. Deleting this rule would hand them to
   prefers-color-scheme and make the UI flip with the visitor's OS.        */
@custom-variant dark (&:where(:root, :root *));

/* Nine data-* variants, verbatim from the removed shadcn/tailwind.css.
   Every primitive in src/components/ui/* depends on these.               */
@custom-variant data-open {
  &:where([data-state="open"]),
  &:where([data-open]:not([data-open="false"])) {
    @slot;
  }
}
@custom-variant data-closed {
  &:where([data-state="closed"]),
  &:where([data-closed]:not([data-closed="false"])) {
    @slot;
  }
}
@custom-variant data-checked {
  &:where([data-state="checked"]),
  &:where([data-checked]:not([data-checked="false"])) {
    @slot;
  }
}
@custom-variant data-unchecked {
  &:where([data-state="unchecked"]),
  &:where([data-unchecked]:not([data-unchecked="false"])) {
    @slot;
  }
}
@custom-variant data-selected {
  &:where([data-selected="true"]) {
    @slot;
  }
}
@custom-variant data-disabled {
  &:where([data-disabled="true"]),
  &:where([data-disabled]:not([data-disabled="false"])) {
    @slot;
  }
}
@custom-variant data-active {
  &:where([data-state="active"]),
  &:where([data-active]:not([data-active="false"])) {
    @slot;
  }
}
@custom-variant data-horizontal {
  &:where([data-orientation="horizontal"]) {
    @slot;
  }
}
@custom-variant data-vertical {
  &:where([data-orientation="vertical"]) {
    @slot;
  }
}

/* ── Theme ────────────────────────────────────────────────────────────────
   `static` (not `inline`): guarantees every token is emitted to :root even
   if no utility consumes it, and keeps color utilities as var() references
   so .light-section can rebind them at runtime.                           */
@theme static {
  /* Delete Tailwind's 22-hue default palette. bg-white / text-cyan-400 /
     text-slate-400 now generate nothing — by design.                      */
  --color-*: initial;

  /* Base ramp — hue ~187, derived from brand teal */
  --color-void: #020a0c;
  --color-abyss: #04141a;
  --color-deep: #072226;
  --color-raised: #0b2f35;
  --color-teal-900: #003a42;
  --color-teal-700: #00545f;
  --color-teal-500: #0b7f8c;
  --color-teal-300: #2fb6c0;

  /* Accents — budget: volt <=10% of any viewport */
  --color-volt: #d6fb00;
  --color-volt-600: #a8c700;
  --color-cream: #ecffb6;
  --color-cream-dim: #cbe08f;

  /* Text */
  --color-fg: #f2f7e8;
  --color-fg-muted: #93a79c;
  --color-fg-faint: #5c706a;
  --color-ink: #011014;

  /* Lines — solid, never rgba */
  --color-line: #14262a;
  --color-line-strong: #1e3a3f;
  --color-line-volt: #3d4a12;

  /* Status */
  --color-live: var(--color-volt);
  --color-win: #34d399;

  /* shadcn semantic layer — ALIASES ONLY, introduces no new color.
     The 12 primitives in src/components/ui/* compile against these names;
     without them bg-muted / ring-ring / text-foreground vanish silently.  */
  --color-background: var(--color-void);
  --color-foreground: var(--color-fg);
  --color-card: var(--color-deep);
  --color-card-foreground: var(--color-fg);
  --color-popover: var(--color-deep);
  --color-popover-foreground: var(--color-fg);
  --color-primary: var(--color-volt);
  --color-primary-foreground: var(--color-ink);
  --color-secondary: var(--color-raised);
  --color-secondary-foreground: var(--color-fg);
  --color-muted: var(--color-raised);
  --color-muted-foreground: var(--color-fg-muted);
  --color-accent: var(--color-raised);
  --color-accent-foreground: var(--color-fg);
  /* No red exists in this palette. Invalid states are a volt ring plus a
     literal message — never color alone.                                  */
  --color-destructive: var(--color-volt);
  --color-destructive-foreground: var(--color-ink);
  --color-border: var(--color-line);
  --color-input: var(--color-raised);
  --color-ring: var(--color-volt);

  /* Type */
  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Archivo Variable", "Inter Variable", ui-sans-serif, sans-serif;

  /* Display sizes carry their own leading, tracking and weight, so a
     component writes `font-display text-display-l` and cannot get the
     tracking wrong. Never a positive letter-spacing.                      */
  --text-display-xl: clamp(3.25rem, 10.5vw, 9.5rem);
  --text-display-xl--line-height: 0.92;
  --text-display-xl--letter-spacing: -0.03em;
  --text-display-xl--font-weight: 600;

  --text-display-l: clamp(2.5rem, 6.5vw, 5.5rem);
  --text-display-l--line-height: 0.92;
  --text-display-l--letter-spacing: -0.03em;
  --text-display-l--font-weight: 600;

  --text-display-m: clamp(2rem, 4.2vw, 3.25rem);
  --text-display-m--line-height: 0.96;
  --text-display-m--letter-spacing: -0.03em;
  --text-display-m--font-weight: 600;

  --text-title: clamp(1.375rem, 2vw, 1.75rem);
  --text-title--line-height: 1.15;
  --text-title--letter-spacing: -0.02em;
  --text-title--font-weight: 600;

  --text-lead: clamp(1rem, 1.15vw, 1.1875rem);
  --text-lead--line-height: 1.6;
  --text-lead--letter-spacing: -0.005em;

  --text-body: 1rem;
  --text-body--line-height: 1.65;

  --text-meta: 0.8125rem;
  --text-meta--line-height: 1.45;

  --text-eyebrow: 0.6875rem;
  --text-eyebrow--line-height: 1;
  --text-eyebrow--letter-spacing: 0.2em;
  --text-eyebrow--font-weight: 600;

  /* Geometry — six values. 3xl/4xl are aliases so the shadcn primitives
     (rounded-3xl on input/badge/dropdown, rounded-4xl on button/card/
     dialog) land on this scale without editing a single .tsx.            */
  --radius-xs: 6px;
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-2xl: 44px;
  --radius-3xl: var(--radius-lg);
  --radius-4xl: var(--radius-xl);

  /* Elevation — three recipes. md/lg/xl alias lift for the primitives.
     No component may write shadow-[...].                                 */
  --shadow-*: initial;
  --shadow-lift: 0 18px 44px -28px #000;
  --shadow-glow: 0 0 44px -10px
    color-mix(in oklab, var(--color-volt) 28%, transparent);
  --shadow-glow-teal: 0 0 56px -14px
    color-mix(in oklab, var(--color-teal-500) 40%, transparent);
  --shadow-md: var(--shadow-lift);
  --shadow-lg: var(--shadow-lift);
  --shadow-xl: var(--shadow-lift);

  /* Motion. Bare `transition` now defaults to fast + out-quint, so an
     un-tokenised duration cannot sneak in through the default.           */
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
  --dur-fast: 180ms;
  --dur-std: 420ms;
  --dur-slow: 720ms;
  --dur-hero: 1000ms;
  --reveal-y: 24px;
  --lift: 4px;
  --default-transition-duration: var(--dur-fast);
  --default-transition-timing-function: var(--ease-out-quint);

  /* Layout + texture scalars */
  --container: 1280px;
  --gutter: clamp(1rem, 4vw, 2.5rem);
  --space-section: clamp(5rem, 11vh, 9rem);
  --mesh-blur: 80px;
  --grain-opacity: 0.045;
}

/* ── Base ───────────────────────────────────────────────────────────────── */
@layer base {
  html {
    color-scheme: dark;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    scrollbar-color: var(--color-line-strong) var(--color-void);
  }

  /* The dark shell. Replaces `body { background-color: white }`, which is
     why an all-dark app used to sit on a white page.                      */
  body {
    min-height: 100dvh;
    background-color: var(--color-void);
    color: var(--color-fg-muted);
    font-size: var(--text-body);
    line-height: var(--text-body--line-height);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-fg);
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }

  ::selection {
    background-color: var(--color-volt);
    color: var(--color-ink);
  }

  /* Global focus ring. The shadcn primitives set outline-none and draw
     their own ring from --color-ring, which is also volt — same look.    */
  :focus-visible {
    outline: 2px solid var(--color-volt);
    outline-offset: 3px;
  }

  /* Dialog/Sheet scrim. Their `bg-black/30` no longer compiles now that
     the default palette is deleted; this restores it in-system with no
     edit to dialog.tsx or sheet.tsx.                                     */
  [data-slot="dialog-overlay"],
  [data-slot="sheet-overlay"] {
    background-color: color-mix(in oklab, var(--color-void) 78%, transparent);
  }

  /* Global film grain. Fixed, above everything, never interactive. */
  body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 100;
    pointer-events: none;
    opacity: var(--grain-opacity);
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23g)'/%3E%3C/svg%3E");
    background-size: 160px 160px;
  }

  /* Mobile: blur cap 48px, mesh never animates. */
  @media (max-width: 47.999rem) {
    :root {
      --mesh-blur: 48px;
    }
    .mesh-volt::before,
    .mesh-teal::before,
    .mesh-cream::before {
      animation: none;
    }
  }

  /* Global damper. Layout still settles, it just arrives instantly.
     motion/react components additionally branch on useReducedMotion();
     GSAP scenes must check window.matchMedia in their own chapters.      */
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 1ms !important;
      scroll-behavior: auto !important;
    }
  }
}

/* ── Components ─────────────────────────────────────────────────────────── */
@layer components {
  /* Shared mesh chassis. `overflow: clip` and NOT `hidden` — hidden makes
     the section a scroll container and breaks sticky children and the
     GSAP pin in #focus.                                                  */
  .mesh-volt,
  .mesh-teal,
  .mesh-cream {
    position: relative;
    isolation: isolate;
    overflow: clip;
  }

  /* The bloom layer. isolation on the parent keeps z-index:-1 above the
     parent's own background and below content. --mesh-strength is read
     with a fallback and never declared, so any component override wins.  */
  .mesh-volt::before,
  .mesh-teal::before,
  .mesh-cream::before {
    content: "";
    position: absolute;
    inset: -25%;
    z-index: -1;
    pointer-events: none;
    opacity: var(--mesh-strength, 0.45);
    filter: blur(var(--mesh-blur));
  }

  /* The one inverted section (Section 11). Rebinds tokens rather than
     restyling: every text-fg-muted / border-line / bg-deep inside flips
     with zero class changes. Works only because @theme is not `inline`. */
  .light-section {
    position: relative;
    --color-fg: var(--color-ink);
    --color-fg-muted: color-mix(in oklab, var(--color-ink) 68%, var(--color-cream));
    --color-fg-faint: color-mix(in oklab, var(--color-ink) 44%, var(--color-cream));
    --color-line: color-mix(in oklab, var(--color-ink) 14%, var(--color-cream));
    --color-line-strong: color-mix(in oklab, var(--color-ink) 26%, var(--color-cream));
    --color-deep: var(--color-cream-dim);
    --color-raised: color-mix(in oklab, var(--color-cream-dim) 82%, var(--color-ink));
    color: var(--color-fg-muted);
  }

  /* Volt on cream fails contrast — the ring inverts to deep teal. */
  .light-section :focus-visible {
    outline-color: var(--color-teal-900);
  }

  /* Local grain: multiply instead of overlay, so the tooth reads as ink
     on paper rather than the blown-out highlight overlay gives on cream. */
  .light-section::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    opacity: 0.07;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23g)'/%3E%3C/svg%3E");
    background-size: 160px 160px;
  }
}

/* ── Utilities ──────────────────────────────────────────────────────────── */

/* From the removed shadcn/tailwind.css. The gallery reel needs it. */
@utility no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

/* The content measure. Replaces mx-auto + max-w-* + px-* everywhere. */
@utility shell {
  width: 100%;
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: var(--gutter);
}

@utility section-y {
  padding-block: var(--space-section);
}

/* Volt bloom top-left off-canvas, teal upper-right, deep well bottom. */
@utility mesh-volt {
  background-color: var(--color-void);
  &::before {
    background-image:
      radial-gradient(38% 44% at 6% -8%, var(--color-volt) 0%, transparent 70%),
      radial-gradient(44% 40% at 94% 10%, var(--color-teal-700) 0%, transparent 72%),
      radial-gradient(72% 46% at 50% 108%, var(--color-teal-900) 0%, transparent 76%);
  }
}

/* Teal bloom upper-right, volt bloom mid-left. */
@utility mesh-teal {
  background-color: var(--color-void);
  &::before {
    background-image:
      radial-gradient(46% 42% at 92% 4%, var(--color-teal-500) 0%, transparent 72%),
      radial-gradient(34% 40% at 2% 52%, var(--color-volt) 0%, transparent 68%),
      radial-gradient(64% 44% at 44% 104%, var(--color-teal-900) 0%, transparent 74%);
  }
}

/* The one light section: volt top-left, teal bottom-right, on cream.
   multiply keeps the blooms as pigment instead of haze.                 */
@utility mesh-cream {
  background-color: var(--color-cream);
  &::before {
    opacity: var(--mesh-strength, 0.32);
    mix-blend-mode: multiply;
    background-image:
      radial-gradient(40% 44% at 4% -6%, var(--color-volt) 0%, transparent 70%),
      radial-gradient(48% 46% at 96% 104%, var(--color-teal-500) 0%, transparent 74%);
  }
}
```

---

#### 3. Exact diff vs. the current 15 lines

```diff
  @import "tailwindcss";
  @import "tw-animate-css";
- @import "shadcn/tailwind.css";
  @import "@fontsource-variable/inter";
+ @import "@fontsource-variable/archivo/wdth.css";

- @custom-variant dark (&:is(.dark *));
+ @custom-variant dark (&:where(:root, :root *));

- html {
-   font-family: "Inter", sans-serif;
- }
-
- body {
-   background-color: white;
-   color: #0f172a;
- }
```

| Line(s) | Current | Fate | Reason |
|---|---|---|---|
| 1 | `@import "tailwindcss";` | keep | — |
| 2 | `@import "tw-animate-css";` | keep | 23 `animate-in` / `animate-out` usages across the 12 primitives |
| 3 | `@import "shadcn/tailwind.css";` | **remove, contents inlined** | Imports a file from `node_modules/shadcn/dist/` — not versioned, vanishes on a clean install of a different `shadcn` version, and is invisible to anyone reading the stylesheet. It supplied exactly: 9 `@custom-variant data-*` rules (inlined verbatim), `@utility no-scrollbar` (inlined), and 2 accordion `@keyframes` (dropped, D9) |
| 4 | `@import "@fontsource-variable/inter";` | keep | registers `Inter Variable`, now actually referenced by `--font-sans` |
| — | — | **add** `@import "@fontsource-variable/archivo/wdth.css";` | display face. `wdth.css` not `index.css` — see §5 |
| 6 | `@custom-variant dark (&:is(.dark *));` | **redefine** | D1 |
| 8–10 | `html { font-family: "Inter", sans-serif; }` | **remove** | Wrong family name — the variable package registers `Inter Variable`, so this rule was resolving to the *static* `@fontsource/inter` imported in `main.tsx:4`. Preflight already applies `--font-sans` via `--default-font-family`, so the correct family now arrives from `@theme` |
| 12–15 | `body { background-color: white; color: #0f172a; }` | **remove** | The white shell under an all-dark app. Replaced by `--color-void` / `--color-fg-muted` |

**Required edits outside this file** (small, and the stylesheet is wrong without them):

| File | Edit | Why |
|---|---|---|
| `package.json` | `npm i @fontsource-variable/archivo` (5.3.0) | **not currently installed** — the `@import` fails the build without it |
| `package.json` | `npm rm @fontsource/inter` | static duplicate of the variable package, 100% dead once line 8–10 is gone |
| `src/main.tsx:4` | delete `import "@fontsource/inter";` | same |
| `src/layouts/MainLayout.tsx:13` | drop `bg-white` from the wrapper | after D2 it emits nothing, but delete it so no one re-adds a light shell |
| `tailwind.config.ts` | delete | Tailwind 4 ignores it (no `@config` directive anywhere). Only `components.json` still points at it; harmless either way, but it is dead code that reads as live |

---

#### 4. Token → utility reference

| Token | Utilities generated | Notes |
|---|---|---|
| `--color-void` … `--color-line-volt` | `bg-*` `text-*` `border-*` `ring-*` `fill-*` `stroke-*` `from-*` `to-*` | 19 colors + `bg-live` / `text-win` |
| `--font-display` / `--font-sans` | `font-display` / `font-sans` | body already defaults to sans |
| wdth axis | `font-stretch-105%` … `font-stretch-118%` | native Tailwind 4 utility, maps to the `wdth` axis. **Only works because we import `wdth.css`** |
| `--text-display-xl` … `--text-eyebrow` | `text-display-xl` … `text-eyebrow` | each emits size **+ line-height + letter-spacing + font-weight**. `tracking-[-0.03em]` and `leading-[0.92]` must never appear in a component again |
| `--radius-xs` … `--radius-2xl` | `rounded-xs` … `rounded-2xl` (+ `rounded-3xl`/`rounded-4xl` aliases, `rounded-full`) | |
| `--shadow-lift` / `--shadow-glow` / `--shadow-glow-teal` | `shadow-lift` `shadow-glow` `shadow-glow-teal` | plus `shadow-md/lg/xl` → lift |
| `--ease-out-quint` / `--ease-in-out-quart` | `ease-out-quint` / `ease-in-out-quart` | |
| `--dur-fast/std/slow/hero` | **no `duration-*` namespace exists in Tailwind 4** | use `duration-(--dur-std)` — verified to emit `transition-duration: var(--dur-std)` |
| `--container` / `--gutter` / `--space-section` | `shell`, `section-y`, or `p-(--gutter)` / `max-w-(--container)` | |
| `--reveal-y` / `--lift` | `translate-y-(--reveal-y)`, `-translate-y-(--lift)` | also read by motion/react via the JS constants below |

**Motion tokens in JS** — mirror, never invent:

| CSS | motion/react |
|---|---|
| `--dur-fast` | `duration: 0.18` |
| `--dur-std` | `duration: 0.42` |
| `--dur-slow` | `duration: 0.72` |
| `--dur-hero` | `duration: 1.0` |
| `--ease-out-quint` | `ease: [0.22, 1, 0.36, 1]` |
| `--ease-in-out-quart` | `ease: [0.76, 0, 0.24, 1]` |
| `--reveal-y` | `y: 24` |
| `--lift` | `y: -4` |

---

#### 5. Font import — the one that bites

`@fontsource-variable/archivo` ships seven CSS entry points. `index.css` (the default export) declares `font-weight: 100 900` and **no `font-stretch`** — the `wdth` axis is silently unavailable and every `font-stretch-*` utility is a no-op. `wdth.css` declares both:

```
font-weight:  100 900;
font-stretch: 62% 125%;
```

Contract range wdth 100–118 sits inside 62–125. Import `wdth.css`. Verified against the published tarball (5.3.0, axes `wdth 62–125`, `wght 100–900`).

---

#### 6. Usage contract for every other chapter

```html
<!-- standard dark section -->
<section class="mesh-teal section-y" style="--mesh-strength: 0.55">
  <div class="shell"> … </div>
</section>

<!-- the one light section (Section 11) -->
<section class="mesh-cream light-section section-y">
  <div class="shell"> … </div>
</section>

<!-- alternating band, no mesh -->
<section class="bg-abyss section-y"><div class="shell"> … </div></section>
```

| Rule | Detail |
|---|---|
| Never pair a `mesh-*` utility with a `bg-*` class | the mesh owns its base color; a competing `bg-*` produces an ordering coin-flip |
| `--mesh-strength` | set inline or with `[--mesh-strength:0.7]`; range 0.25–0.9. Never declared by the utility, so any override wins cleanly |
| `border` alone is `currentColor` in Tailwind 4 | always write `border border-line`, never bare `border` |
| **No opacity modifier inside `.light-section`** | Tailwind bakes `text-fg-muted/60` to a static value at build time (verified: `ring-foreground/5` compiles to a literal), so it ignores the rebind. Solid tokens only in the light section — which the "lines are solid, never rgba" rule already requires |
| Don't put a shadcn `Card`/`Dropdown` inside `.light-section` | their `ring-foreground/5` is baked to the dark value; use plain elements with `border-line` there |
| GSAP pin + mesh | put the `mesh-*` class on the outer `<section>` that contains the pin-spacer, never on the pinned element itself |
| `z-index` ceiling | grain occupies `z-100`. Nothing else may exceed `z-50` (nav/dialog) |

---

#### 7. Verification performed

Compiled in an isolated harness against this repo's `node_modules` (`vite build` + `@tailwindcss/vite` 4.3.0), with a candidate file exercising every token and every class used by `src/components/ui/*`:

| Check | Result |
|---|---|
| Build | clean, 27.28 kB (6.16 kB gzip) |
| `bg-white` / `bg-black` / `text-cyan-400` / `text-slate-400` | **0 rules emitted** — palette reset confirmed |
| `.text-display-xl` | emits font-size + line-height + letter-spacing + font-weight |
| `.rounded-3xl` → `var(--radius-3xl)` → `var(--radius-lg)`; `.shadow-md,.shadow-xl` → `var(--shadow-lift)` | confirmed |
| `.dark\:bg-transparent:where(:root,:root *)` | confirmed always-on |
| `.duration-\(--dur-std\)`, `.p-\(--gutter\)`, `.font-stretch-\[112\%\]`, `.max-w-\[62ch\]` | all emit |
| `.bg-muted{background-color:var(--color-muted)}` | var chain intact → `.light-section` rebind works |
| grain data-URI | survives Lightning CSS minification byte-for-byte |
| nine `data-*` variants, `no-scrollbar`, `shell`, `section-y`, three `mesh-*` | all present |

---

## Part 3 — The homepage, band by band

Twelve bands in scroll order. Each carries a canvas, a wireframe, an element table, the exact copy, layout per breakpoint, its data selectors, its motion table with a reduced-motion column, its code, its a11y notes and an acceptance list.

---

### Section 1 — Hero

One full-viewport typographic statement that proves the site is premium without a single photograph, and hands the visitor exactly two ways forward plus one piece of live campus context.

**Canvas**

| Property | Value |
|---|---|
| Background token | `--color-void` (section base, inherited from `body`) |
| Mesh utility | `mesh-volt` (volt bloom off-canvas top-left, teal upper-right, deep well bottom) |
| Mesh strength | `--mesh-strength: .85` — highest on the site; every later section is lower |
| Bloom render | `mesh-volt::before`, `filter: blur(80px)` desktop / `blur(48px)` below `md`, `inset: -20%` (bounded, never `inset:-100%`), never animated |
| Grain | global `body::after` only. Hero adds no second grain layer |
| Photography | none. No `<img>`, no `background-image`, no video, no canvas |
| Min height | `min-h-[100svh]` (`svh`, never `vh` — mobile URL-bar collapse must not reflow the H1) |
| Vertical padding | `pt-[calc(4.5rem+clamp(2rem,6vh,4rem))]` (clears the 72px fixed nav) · `pb-[clamp(5.5rem,10vh,7rem)]` (reserves the scroll-cue lane) |
| Section padding token | `--space-section` is **not** used here; the hero is height-driven, not rhythm-driven |
| Container | section is full-bleed (mesh must escape); inner `mx-auto w-full max-w-[var(--container)] px-[var(--gutter)]` |
| Stacking | `relative isolate` on section; mesh `::before` `z-0`, content `z-10`, global grain `z-100` |
| Alternating band | hero is `void`. The next section takes `--color-abyss` |

**Wireframe**

```
DESKTOP >=1024  ·  12-col grid, container 1280, gutter clamp(1rem,4vw,2.5rem)
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2   3   4   5   6   7  │  8   9  10  11  12                          │
│                                                                           │
│  ░ mesh-volt @ --mesh-strength .85 · grain z-100 · NO PHOTOGRAPH          │
│                                                                           │
│  ┌─────────────────────────┐│                                             │
│  │ ▬▬ BITS PILANI GOA · SAC││                                             │
│  │                         ││                                             │
│  │  Every court,           ││                                             │
│  │  every lane,            ││                                             │
│  │  in ▓motion.▓           ││      ┌──────────────────────┐   ← cols 9-12 │
│  │                         ││      │ ● Happening today  ▫ │     self-end  │
│  │  Basketball, football,  ││      │                      │               │
│  │  swimming, badminton    ││      │ Swimming Championship│               │
│  │  and a gym that opens…  ││      │ 5 Aug 2026           │               │
│  │                         ││      │ Aquatics Complex   → │               │
│  │  ▐ Explore activities ▌ ││      ├──────────────────────┤               │
│  │  What's on this season  ││      │ 5 activities · 3 ven │               │
│  │  ────────── hover only  ││      └──────────────────────┘               │
│  └─────────────────────────┘│                                             │
│  ╷                                                                        │
│  │ ← scroll cue 1px × 48px, volt gradient travels down                    │
│  ╵                                                                        │
└───────────────────────────────────────────────────────────────────────────┘
```

```
MOBILE <640  ·  single column, gutter 1rem
┌───────────────────────────────┐
│ ▬▬ BITS PILANI GOA · SAC      │
│                               │
│ Every court,                  │
│ every lane,                   │
│ in ▓motion.▓                  │
│                               │
│ Basketball, football,         │
│ swimming, badminton and a     │
│ gym that opens at five.       │
│                               │
│ ┌───────────────────────┐     │
│ │  Explore activities   │ h-14│
│ └───────────────────────┘     │
│ ┌───────────────────────┐     │
│ │ What's on this season │ h-14│
│ └───────────────────────┘     │
│                               │
│ ┌───────────────────────┐     │
│ │ ● Happening today   ▫ │     │
│ │ Swimming Championship │     │
│ │ 5 Aug 2026            │     │
│ │ Aquatics Complex    → │     │
│ ├───────────────────────┤     │
│ │ 5 activities · 3 ven. │     │
│ └───────────────────────┘     │
│                               │
│            ╷                  │
│            ╵ cue centred      │
└───────────────────────────────┘
```

**Elements**

| Slot | Content | Type token | Color token | Surface/radius | Spacing | Notes |
|---|---|---|---|---|---|---|
| Section canvas | mesh + grain, no content | — | `--color-void` | none, no radius | `min-h-[100svh]`, pt/pb per Canvas table | `relative isolate overflow-hidden` |
| Mesh bloom layer | `mesh-volt::before` | — | `--color-volt`, `--color-teal-500`, `--color-teal-900` stops | none | `inset:-20%` | `blur(80px)`/`blur(48px)`, `pointer-events-none`, `z-0` |
| Eyebrow rule | 24×2px solid bar | — | `--color-volt` | `--radius-xs` on the 2px bar (reads as a square cap) | `w-6 h-[2px]`, `mr-3` | `aria-hidden="true"`, not a border |
| Eyebrow label | `BITS PILANI GOA · STUDENT ACTIVITY CENTRE` | `--text-eyebrow`, `uppercase tracking-[0.2em]` | `--color-volt` | none | inline-flex row, `gap-3` | ALL CAPS is legal here only |
| Eyebrow separator `·` | middle dot inside label string | `--text-eyebrow` | `--color-line-volt` via nested span | none | `mx-1` | Dims the dot so both halves read as one label |
| H1 line 1 | `Every court,` | `--text-display-xl` | `--color-cream` | none | `mt-8` from eyebrow | `font-display font-semibold tracking-[-0.03em] leading-[0.92]` |
| H1 line 2 | `every lane,` | `--text-display-xl` | `--color-cream` | none | — | Line wrapper `overflow-hidden pb-[0.08em] -mb-[0.08em]` (descender clip) |
| H1 line 3 prefix | `in ` | `--text-display-xl` | `--color-cream` | none | — | Same line box as the volt word |
| H1 final word | `motion.` | `--text-display-xl` | `--color-volt` | none | — | The only display-scale volt on the site |
| Lead paragraph | 2-sentence lead | `--text-lead` | `--color-fg-muted` | none | `mt-6`, `max-w-[46ch]` | Narrower than the global `62ch` body clamp, by hero rule |
| Primary CTA | `Explore activities` | `--text-body`, `font-sans font-semibold tracking-[-0.01em]` | fill `--color-volt`, text `--color-ink` | `rounded-full`, `--shadow-glow` on hover | `px-8 py-4`, `mt-10` | `<a href="#activities">`; pressed fill `--color-volt-600`; 52px tall ≥48 |
| Secondary CTA | `What's on this season` | `--text-body`, `font-sans` | `--color-cream` | ghost, `rounded-full` (for the focus ring shape) | `px-2 py-4`, row `gap-x-6` | `<a href="#events">`; no border ≥`sm` |
| Secondary underline | 1px rule, hover only | — | `--color-volt` | none | `left-2 right-2 bottom-3 h-px` | `scale-x-0 → 1`, `origin-left`; `aria-hidden` |
| CTA row | two anchors | — | — | none | `mt-10 flex flex-wrap items-center gap-x-6 gap-y-3` | Exactly two children. Never a third |
| Live card shell | context container | — | `bg-deep/60`, `border-line` | `--radius-xl`, `backdrop-blur-xl`, `--shadow-lift` | `p-6`, `self-end`, `max-w-[24rem]` ≥`lg` | `<Link>` when an event exists; `<div>` in the empty case |
| Live dot | 6px circle | — | `--color-live` (= `--color-volt`) | `rounded-full` | `w-1.5 h-1.5 mr-2` | Pulse ring only when the event is today; `aria-hidden` |
| Card status label | `Happening today` / `Next up` / `Season break` | `--text-eyebrow`, `uppercase tracking-[0.2em]` | `--color-volt` | none | in header row | Carries the state for screen readers (dot is decorative) |
| Mock chip | `Mock data` | `--text-eyebrow`, `uppercase tracking-[0.2em]` | text `--color-fg-muted`, border `--color-line` | `rounded-full`, `border` | `px-2 py-0.5`, `ml-auto` | Locked-decision requirement: this card looks live, so it is labelled |
| Card header row | dot + status + chip | — | — | none | `flex items-center mb-6` | 20px optical gap to title |
| Card event title | `Swimming Championship` | `--text-title` | `--color-fg` | none | — | `font-display font-semibold tracking-[-0.03em] leading-[1.05]`. Not cream — cream is display-only |
| Card date | `5 Aug 2026` | `--text-meta`, `tabular-nums` | `--color-fg-muted` | none | `mt-3` | From `formatDate`. Never a raw ISO string |
| Card venue | `Aquatics Complex` | `--text-meta` | `--color-fg-muted` | none | `mt-1` | Omit the whole line if `venue` is undefined (it is set on all 3 records today) |
| Card arrow | lucide `ArrowUpRight`, 16px | — | `--color-volt` | none | `ml-auto` on venue row | `translate-x-0.5 -translate-y-0.5` on card hover; `aria-hidden` |
| Card divider | 1px full-width rule | — | `--color-line` | none | `mt-6 border-t` | Solid token, never rgba |
| Card footer numerals | `5`, `3` | `--text-meta`, `font-display tabular-nums` | `--color-volt` | none | inside footer line | Stat numerals are a sanctioned volt slot |
| Card footer words | `activities · venues` | `--text-meta` | `--color-fg-muted` | none | `pt-4` | Separator `·` in `--color-fg-muted` |
| Scroll cue track | 1×48px vertical line | — | `--color-line-volt` | none | `absolute bottom-6 left-[var(--gutter)]` | `aria-hidden="true"` |
| Scroll cue travel | 12px volt segment inside track | — | `--color-volt` gradient stop | none | — | `linear-gradient` on a pseudo-element, translates 0 → 300% |
| Text container | content column | — | — | none | `col-span-7 self-end` | Never `text-center` on desktop |

Judgement call: `mockActivities` has no `venue` field, so the venue count is the distinct `venue` strings on `mockEvents` (3) — the only venue data that exists.

**Copy**

```
EYEBROW
BITS PILANI GOA · STUDENT ACTIVITY CENTRE

H1 (three lines, line 3 final word in volt)
Every court,
every lane,
in motion.

LEAD
Basketball, football, swimming, badminton and a gym that opens at five.
Five facilities, one campus, hours you can plan a week around.

PRIMARY CTA        Explore activities        → #activities
SECONDARY CTA      What's on this season     → #events

LIVE CARD — event starts today (2026-08-05, the real state on launch data)
status:   Happening today
chip:     Mock data
title:    Swimming Championship
date:     5 Aug 2026
venue:    Aquatics Complex
footer:   5 activities · 3 venues
link aria-label:  Swimming Championship, 5 Aug 2026, Aquatics Complex

LIVE CARD — event starts later
status:   Next up
(title / date / venue / footer identical, from the record)

LIVE CARD — nothing upcoming
status:   Season break
chip:     Mock data
title:    Nothing on the calendar
body:     Facility hours run as usual.
footer:   5 activities · 3 venues

SCROLL CUE
(no text — decorative, aria-hidden)
```

**Layout**

| Breakpoint | Grid | Content column | Live card | Cue | Gaps / ratios |
|---|---|---|---|---|---|
| `2xl` ≥1536 | `grid-cols-12`, container capped 1280 so the grid stops growing | `col-start-1 col-span-7 self-end` | `col-start-9 col-span-4 self-end` | `absolute bottom-6 left-[var(--gutter)]` | `gap-x-6` (24px); gutter maxes at 2.5rem |
| `xl` 1280–1535 | identical to `2xl` | identical | identical | identical | identical |
| `lg` 1024–1279 | `grid-cols-12` | `col-span-7 self-end` | `col-start-9 col-span-4 self-end`, card `max-w-[24rem]` | identical | `gap-x-6`; H1 sits at ~5.5rem effective |
| `md` 768–1023 | `grid-cols-8`, two stacked blocks | `col-span-8` | `col-span-5 self-start mt-12`, below the CTA row | `absolute bottom-6 left-[var(--gutter)]` | `gap-y-12`; card no longer bottom-aligned |
| `sm` 640–767 | single column, normal flow | full width | full width `mt-10`, `max-w-[26rem]` | left gutter | CTAs stay on one row, `gap-x-6` |
| `<640` | single column, `px-4` (gutter 1rem) | full width | full width `mt-8` | centred: `left-1/2 -translate-x-1/2 bottom-5` | CTAs stack `flex-col gap-3`, each `w-full h-14 justify-center`; secondary gains `border border-line-strong` so the tap target is visible |

- No element uses a fixed aspect ratio here (no media). The card is content-sized; it must not be given a ratio.
- Desktop and mobile are separate compositions: desktop is an asymmetric 7 / 4 split with both blocks bottom-aligned; mobile is a top-anchored vertical stack with the cue as the only absolutely positioned item.
- No pinned behaviour, no horizontal rail, nothing hover-dependent for meaning at any width.

**Data**

| Need | Selector | Result on ground-truth mock data (today = 2026-08-05) |
|---|---|---|
| Next event | `getUpcomingEvents(1)[0]` | `swimming-championship` — `Swimming Championship`, `startDate "2026-08-05"`, `venue "Aquatics Complex"`, `isFeatured false` |
| Date string | `formatDate(event.startDate)` | `5 Aug 2026` |
| Counts | `getSiteCounts()` → `{ activities: 5, venues: 3 }` | `mockActivities.length = 5`; distinct `mockEvents` venues = 3 (`Main Football Ground`, `SAC Gym`, `Aquatics Complex`) |
| Today test | `event.startDate === new Date().toLocaleDateString("en-CA")` | `true` → status `Happening today`, dot pulses |

Date problem, resolved explicitly:

- `interbits-football` (2026-06-12) and `fitness-challenge` (2026-07-01) are **past** and never appear in the hero, even though both are `isFeatured: true`. The hero does **not** use `getFeaturedEvent()` — featured is an editorial flag, not a calendar one.
- `getUpcomingEvents` **must** filter `startDate >= today` inclusive, compared as `YYYY-MM-DD` local strings. With an exclusive `>` the hero card is empty on launch day, which is the wrong render.
- Three states, one component: `startDate === today` → `Happening today` + pulsing dot; `startDate > today` → `Next up` + static dot; `getUpcomingEvents(1).length === 0` → `Season break`, no dot, card renders as a `<div>` (no link, no arrow), footer counts unchanged. From 2026-08-06 the site is permanently in the empty state on this data, so that branch is a launch-visible path, not a theoretical one.
- `endDate` is unset on all 3 records, so `formatRange` is never called in the hero. `formatTime` is not used — events carry no time-of-day.
- Verified in repo: `src/lib/content.ts` and `src/lib/format.ts` do not exist yet (`src/lib/` contains only `utils.ts`). The hero consumes the contract above; the data chapter creates it. `src/mock/mockEvents.ts` and `src/mock/mockActivities.ts` match the stated ground truth exactly.

**Motion**

| Effect | Layer | Trigger | From → To | Duration token | Easing token | Stagger | Reduced-motion |
|---|---|---|---|---|---|---|---|
| Eyebrow rule wipe | Motion | mount | `scaleX 0 → 1`, `origin-left` | `--dur-std` | `--ease-out-quint` | delay 0 | `opacity 0 → 1` over `--dur-fast`, no scale |
| Eyebrow label fade | Motion | mount | `opacity 0 → 1`, `y --reveal-y → 0` | `--dur-std` | `--ease-out-quint` | +90ms after rule (`--dur-fast × 0.5`) | opacity only, `--dur-fast` |
| H1 per-line mask reveal | Motion | mount | `y 110% → 0` inside `overflow-hidden` wrapper | `--dur-hero` | `--ease-out-quint` | 90ms between the 3 lines | all 3 lines `opacity 0 → 1` together, `--dur-fast`, no translate |
| Lead fade-up | Motion | mount | `opacity 0 → 1`, `y --reveal-y → 0` | `--dur-slow` | `--ease-out-quint` | after line 3 starts | opacity only, `--dur-fast` |
| CTA row fade-up | Motion | mount | `opacity 0 → 1`, `y --reveal-y → 0` | `--dur-slow` | `--ease-out-quint` | 60ms between the 2 anchors | opacity only, `--dur-fast` |
| Live card entrance | Motion | mount | `opacity 0 → 1`, `y --reveal-y → 0`, `filter blur(8px) → blur(0)` | `--dur-slow` | `--ease-out-quint` | last, +180ms (`--dur-fast`) | opacity only, no blur, `--dur-fast` |
| Primary CTA hover lift | CSS | `:hover` | `translateY 0 → calc(var(--lift) * -1)`, shadow `none → --shadow-glow` | `--dur-fast` | `--ease-out-quint` | — | no transform; `--shadow-glow` still applies |
| Primary CTA press | CSS | `:active` | `background --color-volt → --color-volt-600` | `--dur-fast` | `--ease-out-quint` | — | unchanged (colour only) |
| Secondary CTA underline | CSS | `:hover`, `:focus-visible` | `scaleX 0 → 1`, `origin-left` | `--dur-fast` | `--ease-out-quint` | — | `opacity 0 → 1`, no scale |
| Card hover raise | CSS | `:hover` on the card link | `bg-deep/60 → --color-raised`, arrow `translate 0 → 2px,-2px` | `--dur-fast` | `--ease-out-quint` | — | colour only, arrow static |
| Live dot pulse (today only) | CSS `@keyframes` | always, while in view | ring `scale 1 → 2.4`, `opacity .5 → 0` | `calc(var(--dur-hero) * 2)` = 2s loop | `--ease-out-quint` | infinite | animation removed; solid dot remains |
| Scroll cue travel | CSS `@keyframes` | always, while in view | gradient segment `translateY 0 → 300%` | `calc(var(--dur-hero) * 2)` = 2s loop | `--ease-in-out-quart` | infinite | animation removed; static `--color-line-volt` track |
| Cue fade-out | Motion (`useScroll`) | `scrollY` 0 → 400px | `opacity 1 → 0` | scroll-linked (no duration token — driven by position) | linear map | — | kept — opacity only, no transform, and it removes a looping element |
| Loop pause offscreen | Motion (`useInView`) | hero leaves viewport | `data-inview="false"` → `animation-play-state: paused` | — | — | — | no-op (loops already removed) |

- Mesh blooms never animate, at any breakpoint.
- No GSAP in this section. GSAP is reserved for `#focus` and `#impact` only.
- No per-frame React state: the cue fade is a `MotionValue`, never `useState`.

**Code**

```tsx
// src/lib/motion.ts — mirrors the CSS motion tokens; Motion needs numbers, CSS needs vars.
export const DUR = { fast: 0.18, std: 0.42, slow: 0.72, hero: 1.0 } as const;
export const EASE = {
  outQuint: [0.22, 1, 0.36, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
} as const;
export const REVEAL_Y = 24; // --reveal-y
```

```tsx
// src/components/sections/Hero.tsx
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { DUR, EASE, REVEAL_Y } from "@/lib/motion";
import { getUpcomingEvents, getSiteCounts } from "@/lib/content";
import { formatDate } from "@/lib/format";

const H1_LINES = ["Every court,", "every lane,"] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const { scrollY } = useScroll();
  const cueOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const next = getUpcomingEvents(1)[0];
  const { activities, venues } = getSiteCounts();
  const isToday = next?.startDate === new Date().toLocaleDateString("en-CA");
  const status = !next ? "Season break" : isToday ? "Happening today" : "Next up";

  const line = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: DUR.fast } } }
    : { hidden: { y: "110%" }, show: { y: 0, transition: { duration: DUR.hero, ease: EASE.outQuint } } };
  const up = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: DUR.fast } } }
    : { hidden: { opacity: 0, y: REVEAL_Y }, show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.outQuint } } };

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-title"
      data-inview={inView}
      style={{ "--mesh-strength": 0.85 } as React.CSSProperties}
      className="mesh-volt relative isolate overflow-hidden min-h-[100svh]
                 pt-[calc(4.5rem+clamp(2rem,6vh,4rem))] pb-[clamp(5.5rem,10vh,7rem)]"
    >
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: DUR.fast / 2 }}
        className="relative z-10 mx-auto grid w-full max-w-[var(--container)] grid-cols-1
                   items-end gap-x-6 gap-y-12 px-[var(--gutter)] md:grid-cols-8 lg:grid-cols-12"
      >
        <div className="md:col-span-8 lg:col-span-7 lg:self-end">
          {/* eyebrow */}
          <div className="flex items-center">
            <motion.span
              aria-hidden="true"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: DUR.std, ease: EASE.outQuint } } }}
              className="mr-3 h-[2px] w-6 origin-left rounded-xs bg-volt"
            />
            <motion.span variants={up} className="text-eyebrow uppercase tracking-[0.2em] text-volt">
              BITS Pilani Goa <span className="mx-1 text-line-volt">·</span> Student Activity Centre
            </motion.span>
          </div>

          {/* H1 — 3 lines, per-line mask, final word volt */}
          <h1
            id="hero-title"
            className="mt-8 font-display text-display-xl font-semibold leading-[0.92]
                       tracking-[-0.03em] text-cream"
          >
            {H1_LINES.map((l) => (
              <span key={l} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span variants={line} className="block">{l}</motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span variants={line} className="block">
                in <span className="text-volt">motion.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p variants={up} className="mt-6 max-w-[46ch] text-lead text-fg-muted">
            Basketball, football, swimming, badminton and a gym that opens at five.
            Five facilities, one campus, hours you can plan a week around.
          </motion.p>

          {/* EXACTLY TWO actions */}
          <motion.div
            variants={{ show: { transition: { staggerChildren: DUR.fast / 3 } } }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6"
          >
            <motion.a
              variants={up}
              href="#activities"
              className="inline-flex h-14 items-center justify-center rounded-full bg-volt px-8 py-4
                         text-body font-semibold tracking-[-0.01em] text-ink
                         transition-[transform,box-shadow,background-color]
                         duration-[--dur-fast] ease-[--ease-out-quint]
                         hover:-translate-y-[var(--lift)] hover:shadow-glow
                         active:bg-volt-600 motion-reduce:hover:translate-y-0 sm:h-auto"
            >
              Explore activities
            </motion.a>
            <motion.a
              variants={up}
              href="#events"
              className="group relative inline-flex h-14 items-center justify-center rounded-full
                         border border-line-strong px-2 py-4 text-body text-cream
                         sm:h-auto sm:border-0"
            >
              What's on this season
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 left-2 right-2 h-px origin-left
                           scale-x-0 bg-volt transition-transform duration-[--dur-fast]
                           ease-[--ease-out-quint] group-hover:scale-x-100
                           group-focus-visible:scale-x-100
                           motion-reduce:scale-x-100 motion-reduce:opacity-0
                           motion-reduce:group-hover:opacity-100"
              />
            </motion.a>
          </motion.div>
        </div>

        {/* live-context card — cols 9-12, bottom-aligned */}
        <motion.div
          variants={
            reduce ? up : { hidden: { opacity: 0, y: REVEAL_Y, filter: "blur(8px)" },
                            show: { opacity: 1, y: 0, filter: "blur(0px)",
                                    transition: { duration: DUR.slow, ease: EASE.outQuint, delay: DUR.fast } } }
          }
          className="md:col-span-5 lg:col-start-9 lg:col-span-4 lg:max-w-[24rem] lg:self-end"
        >
          <CardShell event={next}>
            <div className="flex items-center">
              {next && (
                <span
                  aria-hidden="true"
                  data-pulse={isToday}
                  className="hero-loop mr-2 h-1.5 w-1.5 rounded-full bg-live"
                />
              )}
              <span className="text-eyebrow uppercase tracking-[0.2em] text-volt">{status}</span>
              <span className="ml-auto rounded-full border border-line px-2 py-0.5
                               text-eyebrow uppercase tracking-[0.2em] text-fg-muted">
                Mock data
              </span>
            </div>

            {next ? (
              <>
                <p className="mt-6 font-display text-title font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
                  {next.title}
                </p>
                <p className="mt-3 text-meta tabular-nums text-fg-muted">{formatDate(next.startDate)}</p>
                {next.venue && (
                  <p className="mt-1 flex items-center text-meta text-fg-muted">
                    {next.venue}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="ml-auto size-4 text-volt transition-transform duration-[--dur-fast]
                                 ease-[--ease-out-quint] group-hover:translate-x-0.5
                                 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                    />
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="mt-6 font-display text-title font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
                  Nothing on the calendar
                </p>
                <p className="mt-3 text-meta text-fg-muted">Facility hours run as usual.</p>
              </>
            )}

            <div className="mt-6 border-t border-line pt-4 text-meta text-fg-muted">
              <span className="font-display tabular-nums text-volt">{activities}</span> activities
              {" · "}
              <span className="font-display tabular-nums text-volt">{venues}</span> venues
            </div>
          </CardShell>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.span
        aria-hidden="true"
        style={{ opacity: cueOpacity }}
        className="hero-cue hero-loop absolute bottom-5 left-1/2 h-12 w-px -translate-x-1/2
                   bg-line-volt sm:bottom-6 sm:left-[var(--gutter)] sm:translate-x-0"
      />
    </section>
  );
}

// One shell, two shapes: link when there is an event, plain div when there is not.
// ponytail: no polymorphic `as` prop — two branches is the whole requirement.
function CardShell({ event, children }: { event?: Event; children: React.ReactNode }) {
  const cls =
    "group block rounded-xl border border-line bg-deep/60 p-6 shadow-lift backdrop-blur-xl " +
    "transition-colors duration-[--dur-fast] ease-[--ease-out-quint]";
  return event ? (
    <Link
      to={`/events/${event.slug}`}
      aria-label={`${event.title}, ${formatDate(event.startDate)}${event.venue ? `, ${event.venue}` : ""}`}
      className={`${cls} hover:bg-raised`}
    >
      {children}
    </Link>
  ) : (
    <div className={cls}>{children}</div>
  );
}
```

```css
/* src/index.css — hero-local additions */
@keyframes cue-travel { from { transform: translateY(0); } to { transform: translateY(300%); } }
@keyframes dot-pulse  { from { transform: scale(1); opacity: .5; } to { transform: scale(2.4); opacity: 0; } }

.hero-cue { position: absolute; overflow: hidden; }
.hero-cue::after {
  content: ""; position: absolute; inset-inline: 0; top: 0; height: 33.333%;
  background: linear-gradient(to bottom, transparent, var(--color-volt), transparent);
  animation: cue-travel calc(var(--dur-hero) * 2) var(--ease-in-out-quart) infinite;
}
[data-pulse="true"] { position: relative; }
[data-pulse="true"]::after {
  content: ""; position: absolute; inset: 0; border-radius: 9999px;
  background: var(--color-live);
  animation: dot-pulse calc(var(--dur-hero) * 2) var(--ease-out-quint) infinite;
}

/* pause both loops the moment the hero leaves the viewport */
[data-inview="false"] .hero-loop,
[data-inview="false"] .hero-loop::after { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .hero-cue::after, [data-pulse="true"]::after { animation: none; }
  .hero-cue::after { background: none; }
}

/* native smooth anchor scrolling — no JS, no Lenis */
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
#activities, #events { scroll-margin-top: 4.5rem; }

/* mobile: cheaper mesh blur */
@media (max-width: 767px) { .mesh-volt::before { filter: blur(48px); } }
```

**A11y**

- `<section id="hero" aria-labelledby="hero-title">` inside `<main>`. Exactly one `<h1>` on the page and it lives here; the three line wrappers are `<span>`s inside it, so the accessible name is the single string "Every court, every lane, in motion."
- Both CTAs are real `<a href="#...">` anchors — native keyboard activation, native focus order, works with JS disabled. `scroll-margin-top: 4.5rem` keeps the fixed nav off the landing target.
- Live-context card is one link with an `aria-label` that spells out title, formatted date and venue, so the arrow glyph carries no meaning. In the empty state it is a `<div>` — no focusable element with nowhere to go.
- Live dot, eyebrow rule, secondary underline, card arrow and scroll cue are all `aria-hidden="true"`. Status is text (`Happening today` / `Next up` / `Season break`), never colour or pulse alone.
- Focus visible: global `outline: 2px solid var(--color-volt); outline-offset: 3px`. No `outline: none` anywhere in the hero. The secondary CTA's underline also fires on `:focus-visible`, so keyboard users get the same affordance as mouse users.
- Contrast, computed against the darkest composite the text sits on: `--color-cream` on `--color-void` ≈ 17.8:1; `--color-fg-muted` on `--color-abyss` (worst case behind `bg-deep/60`) ≈ 6.5:1; `--color-ink` on `--color-volt` ≈ 16.4:1; `--color-volt` eyebrow on `--color-void` ≈ 15.9:1. `--color-fg-faint` is deliberately **not** used in this section — at `--text-meta` on the card surface it measures ≈3.2:1 and fails AA.
- Touch targets: primary and secondary CTAs are `h-14` (56px) below `sm`; the card link's hit area is the full `p-6` block.
- `prefers-reduced-motion: reduce` removes every transform and both loops; all content is present at full opacity within `--dur-fast`. Nothing in the hero is revealed only by animation — the `initial="hidden"` variants set opacity/translate, never `display` or `visibility`.

**Acceptance**

1. Section is `min-h-[100svh]`, contains zero `<img>`, `background-image`, `<video>` and `<canvas>` nodes, and still reads as premium with images blocked in devtools.
2. Exactly two elements in the hero match `a[href^="#"], button` — `#activities` and `#events` — and both scroll to a section that exists in the DOM.
3. On 2026-08-05 the card renders `Happening today` / `Swimming Championship` / `5 Aug 2026` / `Aquatics Complex` / `5 activities · 3 venues` with a pulsing dot; with `getUpcomingEvents(1)` stubbed empty it renders `Season break` / `Nothing on the calendar` / `Facility hours run as usual.` / `5 activities · 3 venues` with no dot and no link. No raw ISO date appears in the rendered DOM.
4. A `Mock data` chip is visible inside the live-context card at every breakpoint.
5. With `prefers-reduced-motion: reduce` a Performance recording after page load shows no compositor activity in the hero, and all copy reaches `opacity: 1` within 180ms.
6. Scrolling 400px drives the cue to `opacity: 0`; scrolling the hero fully out of view sets `data-inview="false"` and both keyframe animations report `animation-play-state: paused`.
7. Volt occupies ≤10% of a 1440×900 screenshot of the hero: eyebrow rule + label, the word `motion.`, the primary CTA fill, the live dot, two footer numerals, the cue segment — no other volt pixels.

---

### Section 2 — Live pulse strip

A 72px band of hard, current facts that proves the site is awake before the visitor has scrolled a full screen.

**Canvas**

| Property | Value |
|---|---|
| Background token | `--color-abyss` (flat) |
| Mesh utility | none — this is the contrast relief between two mesh sections; a bloom here would muddy the hairlines |
| `--mesh-strength` | n/a (0) |
| Vertical padding | none. Fixed `h-[72px]` desktop / `h-[64px]` <640, `items-center`. Padding is horizontal only: `pl-[var(--gutter)] pr-[var(--gutter)]` |
| Container behaviour | Full-bleed. The `--container` 1280 clamp does **not** apply — the track must run edge to edge or the loop seam becomes visible inside a centred box. Borders `border-y border-[--color-line]` span the viewport. Left/right 96px (desktop) / 40px (mobile) alpha mask fades the track into the band |
| Texture | inherits global `body::after` grain only. No local grain layer |

**Wireframe**

```
DESKTOP >=1024  ·  full-bleed, h 72px, border-y line, 12-col grid does NOT apply
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2   3   4   5   6   7  │  8   9  10  11  12                          │
│ ▒▒                                                     ┌───────────────┐  │
│ ▒▒ ● Live today — Swimming Championship  ·  5 activ    │ DEMO DATA │ ⏸ │  │
│ ▒▒                                                     └───────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
   ▲ 96px mask fade      ▲ track: right-to-left, 55px/s     ▲ static cluster,
     (both edges)          rows repeated until >= 2x vw       z-10, above mask

MOBILE <640  ·  full-bleed, h 64px, gutter 1rem
┌─────────────────────────┐
│ ▒              ┌──────┐ │
│ ▒ ● Live today │DEMO ⏸│ │
│ ▒              └──────┘ │
└─────────────────────────┘
   ▲ 40px fade   ▲ 48x48 hit area, badge text shortens to "DEMO"
```

**Elements**

| Slot | Content | Type token | Color token | Surface/radius | Spacing | Notes |
|---|---|---|---|---|---|---|
| Band | strip wrapper | — | bg `--color-abyss` | none / radius — | `h-[72px]` / `h-[64px]`; `px-[var(--gutter)]` | `<section aria-label="Live campus pulse">`, `relative overflow-hidden border-y border-[--color-line]` |
| Top rule | 1px | — | `--color-line` | — | — | `border-t`, solid, never rgba |
| Bottom rule | 1px | — | `--color-line` | — | — | `border-b` |
| Edge mask L/R | alpha gradient | — | — (alpha only, no color) | — | 96px desktop / 40px mobile | `mask-image` with `transparent`→`black`; not a design colour |
| Viewport | clip box for track | — | — | — | `flex-1 min-w-0` | `overflow-hidden`, `mask-image` lives here |
| Track | animated flex row wrapper | — | — | — | `w-max` | holds N repeated rows; the only animated node |
| Row (real) | `<ul>` of 4 chips + trailing separator | — | — | — | `flex items-center w-max` | plain content, in the a11y tree |
| Row (clones) | identical `<ul>` × (N−1) | — | — | — | same | `aria-hidden="true" inert` |
| Live dot | 6px disc | — | `--color-volt`, `--color-fg-faint` when nothing is open | `rounded-full` | `mr-2` (8px) | `aria-hidden="true"`; word "Live" carries the meaning. Ring pulse on `::after` |
| Chip lead text | e.g. `Next up — Swimming Championship, ` | `--text-meta` | `--color-fg-muted` | — | — | `font-sans whitespace-nowrap` |
| Chip volt span | numeral / date / `Live today` | `--text-meta` | `--color-volt` | — | — | `font-display tabular-nums` on numerals, `font-sans` on `Live today` |
| Chip tail text | e.g. ` activities open right now` | `--text-meta` | `--color-fg-muted` | — | — | — |
| Separator | `·` | `--text-meta` | `--color-volt` | — | `mx-6` (24px) desktop / `mx-4` (16px) mobile | `<li aria-hidden="true">`; one after every chip incl. the last, so the loop period is exact |
| Cluster | badge + button group | — | bg `--color-abyss` | radius `--radius-sm` on the group border | `gap-3` (12px), `ml-4` | `relative z-10 shrink-0 flex items-center border border-[--color-line-strong]` |
| Demo badge | `DEMO DATA` / `DEMO` <640 | `--text-eyebrow` | `--color-fg-muted` | — | `px-3 py-1.5` | uppercase `tracking-[0.2em]`. Not `fg-faint`: 3.6:1 on abyss fails 4.5 |
| Cluster divider | 1px vertical | — | `--color-line-strong` | — | `h-4` (16px) | between badge and button; hidden <640 |
| Pause button | ⏸ / ▶ glyph, 12×12 inline SVG | — | icon `--color-fg-muted`, hover `--color-fg` | `--radius-xs` | 32×32 visual, `min-h-[48px] min-w-[48px]` hit box <768 | Real control. WCAG 2.2.2 pause mechanism. Global volt focus ring |

**Copy**

```
Chip 1 — next event  (branch: startDate === today)
  volt: Live today
  tail:  — Swimming Championship

Chip 1 — next event  (branch: startDate > today)
  lead: Next up — {event.title},
  volt: {formatDate(event.startDate)}

Chip 1 — next event  (branch: no upcoming event)
  lead: Season wrap — nothing on the calendar

Chip 2 — open now  (branch: count >= 2)
  volt: 5
  tail:  activities open right now

Chip 2 — open now  (branch: count === 1)
  volt: 1
  tail:  activity open right now

Chip 2 — open now  (branch: count === 0)
  lead: Everything closed right now

Chip 3 — top activity
  lead: Basketball leads —
  volt: 128
  tail:  participants

Chip 4 — participation
  volt: 1,248+
  tail:  active students

Separator (between every chip)
  ·

Cluster
  DEMO DATA                       (>=640)
  DEMO                            (<640)

Button aria-label, running state
  Pause the live pulse
Button aria-label, paused state
  Resume the live pulse
```

**Layout**

| Breakpoint | Composition |
|---|---|
| >=1024 | `flex items-center`, height 72px. Track viewport `flex-1 min-w-0`; cluster `shrink-0`. Chip separators `mx-6`. Mask 96px each edge. `--marquee-speed: 55`. No 12-col grid participation — the band is full-bleed and its only alignment obligation is the shared `--gutter` on the cluster's right edge |
| 768–1023 | Identical to desktop. Height 72px, mask 72px, `--marquee-speed: 50` |
| 640–767 | Height 68px, separators `mx-5` (20px), mask 56px, button hit box grows to 48×48, badge still `DEMO DATA` |
| <640 | Height 64px, single row (marquee keeps running — it is transform-only and is the only way four facts fit in 64px), separators `mx-4`, mask 40px, `--marquee-speed: 40`, badge text `DEMO`, cluster divider hidden, button 48×48 |
| Reduced motion, >=1024 | Animation removed. Real row becomes `grid grid-cols-4 gap-8 w-full`, separators `display:none`, clones `display:none`. Height stays 72px |
| Reduced motion, <1024 | `grid grid-cols-2 gap-x-6 gap-y-2`, `h-auto min-h-[64px] py-4`. Two rows of two chips |
| Aspect ratios | none — the section carries no media |

**Data**

| Selector | Returns here | Rendered as |
|---|---|---|
| `getUpcomingEvents(1)` | `[swimming-championship]` — `startDate` 2026-08-05 **is today**, so the today-branch fires and the volt live dot animates. `interbits-football` (2026-06-12) and `fitness-challenge` (2026-07-01) are past and never appear | `Live today — Swimming Championship` |
| `getOpenActivitiesNow(now)` | clock-dependent. Windows from `timings[0]`: Gym 05:00–23:00, Football 05:30–21:00, Basketball 06:00–22:00, Swimming 06:00–20:00, Badminton 07:00–22:00 → 05:00–05:29 = 1, 05:30–05:59 = 2, 06:00–06:59 = 4, 07:00–19:59 = **5**, 20:00–20:59 = 4, 21:00–21:59 = 3, 22:00–22:59 = 1, 23:00–04:59 = 0 | `5 activities open right now` |
| `topActivities[0]` (mockStats) | `{ activity: "Basketball", participants: 128 }` | `Basketball leads — 128 participants` |
| `overviewCards[0].value` (mockStats) | `"1,248+"` | `1,248+ active students` |

Day-of-week caveat: every mock activity has exactly one `timings` entry and it is `dayOfWeek: 1`. 2026-08-05 is a Wednesday, so a strict `dayOfWeek === now.getDay()` match would return 0 on six days out of seven. `getOpenActivitiesNow` therefore reads `timings[0]` as the canonical daily window, per the section brief, and carries a `ponytail:` comment naming the ceiling.

Empty cases: 0 open → chip 2 collapses to `Everything closed right now`, live dot switches to `--color-fg-faint` and its ring pulse stops. No upcoming event → chip 1 becomes `Season wrap — nothing on the calendar` and the dot goes faint. Both branches keep the chip count at 4, so the reduced-motion grid never reflows. `topActivities` and `overviewCards` are static literals and cannot be empty; no guard is written for them.

**Motion**

| Effect | Layer | Trigger | From → To | Duration token | Easing token | Stagger | Reduced motion |
|---|---|---|---|---|---|---|---|
| Marquee scroll | CSS `@keyframes` | always; `running` only while `data-inview="true"` and not paused | `translate3d(0,0,0)` → `translate3d(calc(var(--row-w) * -1px),0,0)` | derived: `calc(var(--row-w) / var(--marquee-speed) * 1s)` — no token, because the brief requires speed in px/s so the loop is content-length independent | `linear` — the one documented exception; any non-linear ease visibly stutters at the seam | none | `animation: none; transform: none` → static grid, clones `display:none` |
| Live dot ring pulse | CSS `@keyframes` on `::after` | always; IO-paused with the track | `scale(1) opacity .5` → `scale(2.4) opacity 0` | `calc(var(--dur-slow) * 2.5)` (1800ms) | `--ease-out-quint` | none | `animation: none`, static 6px dot |
| Offscreen pause | CSS + IntersectionObserver | strip leaves viewport | `running` → `paused` | instant (`animation-play-state` is not transitionable) | — | none | no-op; nothing is animating |
| Hover pause | CSS | `:hover` on band, inside `@media (hover: hover)` | `running` → `paused` | instant | — | none | no-op |
| Chip brighten on hover | CSS `transition` | `:hover` on band | `--color-fg-muted` → `--color-fg` | `--dur-fast` | `--ease-out-quint` | none | colour still changes; colour shifts are not motion |
| Button icon swap | CSS `transition` on opacity | click | `opacity 0` → `1` | `--dur-fast` | `--ease-out-quint` | none | unchanged, still animates opacity |
| Strip entrance | Motion (`motion/react`) | `initial`/`animate` on mount | `opacity 0, y var(--reveal-y)` → `opacity 1, y 0` | `--dur-std` | `--ease-out-quint` | none | `initial={false}` via `useReducedMotion()` — renders final state, no transform |

**Code**

`src/index.css`

```css
@layer components {
  .pulse-strip { --marquee-speed: 55; }
  @media (min-width: 768px) and (max-width: 1023px) { .pulse-strip { --marquee-speed: 50; } }
  @media (max-width: 639px)  { .pulse-strip { --marquee-speed: 40; } }

  .pulse-viewport {
    mask-image: linear-gradient(to right, transparent 0, black var(--mask), black calc(100% - var(--mask)), transparent 100%);
    --mask: 96px;
  }
  @media (max-width: 639px) { .pulse-viewport { --mask: 40px; } }

  .pulse-track {
    animation: pulse-marquee calc(var(--row-w) / var(--marquee-speed) * 1s) linear infinite;
    animation-play-state: paused;
    will-change: transform;
  }
  .pulse-strip[data-inview="true"][data-paused="false"] .pulse-track { animation-play-state: running; }
  @media (hover: hover) {
    .pulse-strip:hover .pulse-track { animation-play-state: paused; }
  }

  .pulse-dot::after {
    content: ""; position: absolute; inset: 0; border-radius: 9999px;
    background: var(--color-volt);
    animation: pulse-ring calc(var(--dur-slow) * 2.5) var(--ease-out-quint) infinite;
  }
  .pulse-strip[data-inview="false"] .pulse-dot::after { animation-play-state: paused; }

  @keyframes pulse-marquee { to { transform: translate3d(calc(var(--row-w) * -1px), 0, 0); } }
  @keyframes pulse-ring { from { opacity: .5; transform: scale(1); } to { opacity: 0; transform: scale(2.4); } }

  @media (prefers-reduced-motion: reduce) {
    .pulse-track { animation: none; transform: none; width: 100%; }
    .pulse-track > *:not(:first-child) { display: none; }
    .pulse-row { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: .5rem 1.5rem; width: 100%; }
    .pulse-row > [data-sep] { display: none; }
    .pulse-strip { height: auto; min-height: 64px; padding-block: 1rem; }
    @media (min-width: 1024px) {
      .pulse-row { grid-template-columns: repeat(4, minmax(0,1fr)); gap: 2rem; }
      .pulse-strip { height: 72px; padding-block: 0; }
    }
    .pulse-dot::after { animation: none; }
  }
}
```

`src/lib/content.ts` — the two selectors this section adds

```ts
const toMinutes = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));

// ponytail: every mock activity carries exactly one timings entry, authored as the daily
// window but tagged dayOfWeek 1. Matching the day would return 0 six days a week.
// Upgrade path: when timings gain real per-day rows, switch to
// timings.find(t => t.dayOfWeek === now.getDay()) ?? timings[0].
export function getOpenActivitiesNow(now: Date = new Date()): Activity[] {
  const mins = now.getHours() * 60 + now.getMinutes();
  return mockActivities.filter(({ timings: [t] }) =>
    t ? mins >= toMinutes(t.openTime) && mins < toMinutes(t.closeTime) : false,
  );
}

export const getUpcomingEvents = (limit?: number) =>
  mockEvents
    .filter((e) => e.startDate >= localISODate(new Date()))
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, limit);
```

`src/lib/format.ts` — `localISODate` is needed because `toISOString()` is UTC and shifts the "is it today" test by 5.5h in IST

```ts
export const localISODate = (d: Date) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
```

`src/components/home/LivePulseStrip.tsx` — the parts that cannot be inferred

```tsx
type Chip = { lead?: string; volt?: string; tail?: string; live?: boolean };

function buildChips(now: Date): Chip[] {
  const open = getOpenActivitiesNow(now).length;
  const next = getUpcomingEvents(1)[0];
  const isToday = next?.startDate === localISODate(now);
  const top = topActivities[0];

  const event: Chip = !next
    ? { lead: "Season wrap — nothing on the calendar" }
    : isToday
      ? { volt: "Live today", tail: ` — ${next.title}`, live: true }
      : { lead: `Next up — ${next.title}, `, volt: formatDate(next.startDate) };

  return [
    event,
    open === 0
      ? { lead: "Everything closed right now" }
      : { volt: String(open), tail: ` activit${open === 1 ? "y" : "ies"} open right now` },
    { lead: `${top.activity} leads — `, volt: String(top.participants), tail: " participants" },
    { volt: overviewCards[0].value, tail: " active students" },
  ];
}

export function LivePulseStrip() {
  const reduced = useReducedMotion();
  const stripRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const [copies, setCopies] = useState(2);
  const [paused, setPaused] = useState(false);
  const [now, setNow] = useState(() => new Date());

  // ponytail: 60s tick, not aligned to the minute boundary. Worst case the count is
  // 59s stale at an open/close edge. Align it if that ever matters.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // one measurement drives both the keyframe distance and the copy count,
  // so speed stays px/s no matter how long the chip text gets
  useLayoutEffect(() => {
    const row = rowRef.current, strip = stripRef.current;
    if (!row || !strip) return;
    const measure = () => {
      const w = Math.round(row.getBoundingClientRect().width);
      if (!w) return;
      strip.style.setProperty("--row-w", String(w));
      setCopies(Math.max(2, Math.ceil((window.innerWidth * 2) / w)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const io = new IntersectionObserver(([e]) =>
      strip.setAttribute("data-inview", String(e.isIntersecting)),
    );
    io.observe(strip);
    return () => io.disconnect();
  }, []);

  const chips = buildChips(now);
  // ...
}
```

Key class strings

```tsx
// band
"pulse-strip relative flex h-[64px] items-center overflow-hidden border-y border-[--color-line] bg-[--color-abyss] px-[var(--gutter)] sm:h-[68px] md:h-[72px]"
// motion wrapper props
initial={reduced ? false : { opacity: 0, y: "var(--reveal-y)" }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}   // --dur-std / --ease-out-quint
// viewport + track
"pulse-viewport min-w-0 flex-1"
"pulse-track flex w-max items-center"
// row
"pulse-row flex w-max items-center"
// chip
"flex items-center whitespace-nowrap font-sans text-[length:--text-meta] text-[--color-fg-muted] transition-colors duration-[--dur-fast] ease-[--ease-out-quint] group-hover:text-[--color-fg]"
// volt span
"font-display tabular-nums text-[--color-volt]"
// live dot
"pulse-dot relative mr-2 size-1.5 shrink-0 rounded-full bg-[--color-volt]"   // bg-[--color-fg-faint] when nothing is open
// separator
"mx-4 text-[--color-volt] sm:mx-5 lg:mx-6"
// cluster
"relative z-10 ml-4 flex shrink-0 items-center rounded-[--radius-sm] border border-[--color-line-strong] bg-[--color-abyss]"
// badge
"px-3 py-1.5 font-sans text-[length:--text-eyebrow] uppercase tracking-[0.2em] text-[--color-fg-muted]"
// button
"grid size-12 place-items-center rounded-[--radius-xs] text-[--color-fg-muted] transition-colors duration-[--dur-fast] ease-[--ease-out-quint] hover:text-[--color-fg] md:size-8"
```

Duplication strategy, restated so the implementer does not improvise: render `buildChips` once into a real `<ul class="pulse-row">`, then render `copies - 1` byte-identical clones as siblings inside `.pulse-track`, each `aria-hidden="true" inert`. Every chip is followed by a separator — including the last one in each row — so the row is perfectly periodic and translating by exactly one row width is seamless. `copies` is `max(2, ceil(2 * innerWidth / rowWidth))`, which guarantees the track is at least twice the viewport and no gap can appear at the seam on an ultrawide monitor.

**A11y**

- `<section aria-label="Live campus pulse">`. No `role="marquee"`, no `aria-live` — the content is ambient, not an alert.
- The real row is a plain `<ul>`/`<li>` list in the a11y tree. Clones carry both `aria-hidden="true"` and `inert`; `aria-hidden` alone would leave them focusable if a chip ever becomes a link.
- Separators are `<li data-sep aria-hidden="true">`. The live dot is `aria-hidden="true"` — the word "Live" carries the state.
- Chips are text, not links. Nothing inside a moving track is clickable, so there is no moving-target problem and no duplicated-link problem. The pause button is the only focusable node in the section.
- WCAG 2.2.2: motion auto-starts and runs longer than 5s, so the pause button is mandatory, not decoration. It is keyboard reachable, toggles `data-paused`, and swaps its `aria-label` between `Pause the live pulse` and `Resume the live pulse`. Hover-pause is a convenience layered on top and is wrapped in `@media (hover: hover)` so touch is unaffected.
- Global focus ring applies unchanged: `outline 2px solid var(--color-volt); outline-offset 3px`.
- Contrast on `--color-abyss`: `--color-fg-muted` 7.3:1, `--color-volt` 15.8:1. `--color-fg-faint` measures 3.6:1 and is therefore used only for the non-informational dead-state dot, never for text in this section.
- Reduced motion removes the animation entirely rather than slowing it; the pause button stays rendered and functional so the control set does not change shape between modes.

**Acceptance**

1. Record the track for 10s at desktop width with the strip in view: it translates 550px ±5% (55px/s), and the same measurement holds after doubling the character count of chip 3.
2. Screenshot at 0% and 99% of the animation cycle: the chip sequence and the gap either side of every `·` are pixel-identical — no widened or collapsed seam.
3. Scroll the strip out of view; DevTools Animations panel reports `animation-play-state: paused` on `.pulse-track` and on `.pulse-dot::after`. Scrolling it back reports `running`.
4. With `prefers-reduced-motion: reduce`, the computed `animation-name` on `.pulse-track` is `none`, exactly one `.pulse-row` is in the DOM flow, all four chips are visible in a grid, and no `·` separators render.
5. The accessibility tree contains exactly four list items and exactly one focusable element (the pause button). Tabbing to that button and pressing Enter or Space halts the track; its `aria-label` flips to `Resume the live pulse`.
6. Set the system clock to 04:00 and reload: chip 2 reads `Everything closed right now` and the dot is `--color-fg-faint`. Set it to 22:30: chip 2 reads `1 activity open right now`.
7. Volt-coloured pixels inside the band measure under 10% of its area: one 6px dot, one `·` per chip boundary, and the numeral spans.

---

### Section 3 — What SAC is

The page exhales here: one statement, one paragraph, three principles, and nothing else — the only section on the site with zero imagery, zero surfaces and zero controls.

**Canvas**

| Property | Value |
|---|---|
| Background token | `--color-void` (`bg-void`) — flat, no gradient, no band |
| Mesh utility | none. This is the only mid-page section with no mesh; it reads as a held breath between `mesh-teal` above and the next band below |
| Mesh strength | n/a (`--mesh-strength` unset — do not declare it) |
| Vertical padding | `py-[calc(var(--space-section)*1.4)]` → `clamp(7rem,15.4vh,12.6rem)` top and bottom |
| Container behaviour | `mx-auto w-full max-w-[var(--container)] px-[var(--gutter)]`. Prose block re-constrained to `max-w-4xl` (56rem) and centred inside it; principles row uses the full 12-col container |
| Texture | global `body::after` grain only (opacity .045, `mix-blend-mode: overlay`). No local noise, no local blur layer, no `::before` |
| Borders | no section-level `border-t`/`border-b`. The only rules in the section are the three principle hairlines |

**Wireframe**

```
DESKTOP >=1024  ·  12-col grid, container 1280, gutter clamp(1rem,4vw,2.5rem)
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2   3   4   5   6   7   8   9  10  11  12                            │
│                                                                           │
│            ┌───────────────────────────────────────┐   ← cols 3-10        │
│            │              ▸ WHAT WE ARE            │   eyebrow / volt     │
│            │                                       │                      │
│            │   Five facilities, two categories,    │   display-l / cream  │
│            │   one centre the campus runs on.      │   centered           │
│            │                                       │                      │
│            │   Lead paragraph. max-w-[58ch].       │   lead / fg-muted    │
│            │   Centered, 3 lines at 1280.          │                      │
│            └───────────────────────────────────────┘                      │
│                                                                           │
│  ─────────────────  ─────────────────  ─────────────────   border-t line  │
│  01                 02                 03                  display / volt │
│  Participate        Create             Connect             title / fg     │
│  two lines of       two lines of       two lines of        body / fg-muted│
│  muted copy         muted copy         muted copy                         │
│  ↑ cols 1-4         ↑ cols 5-8         ↑ cols 9-12                        │
└───────────────────────────────────────────────────────────────────────────┘

MOBILE <640  ·  single column, gutter 1rem
┌─────────────────────────┐
│ ▸ WHAT WE ARE           │
│                         │
│ Five facilities, two    │
│ categories, one centre  │
│ the campus runs on.     │
│                         │
│ Lead paragraph, fg-muted│
│ max-w-[58ch], centered  │
│                         │
│ ───────────────────────ateway
│ 01                      │
│ Participate             │
│ two lines of muted copy │
│                         │
│ ─────────────────────── │
│ 02                      │
│ Create                  │
│ two lines of muted copy │
│                         │
│ ─────────────────────── │
│ 03                      │
│ Connect                 │
│ two lines of muted copy │
└─────────────────────────┘
```

Correction to the mobile frame above: line 10 is a plain hairline — `│ ─────────────────────── │`. The stray token is a transcription artifact, not an element.

**Elements**

| Slot | Content | Type token | Color token | Surface/radius | Spacing | Notes |
|---|---|---|---|---|---|---|
| `section#about` | wrapper | — | `bg-void`, text inherits `--color-fg` | none, no radius, no shadow | `py-[calc(var(--space-section)*1.4)]` | `id="about"` is the nav anchor; add `scroll-mt-24` (96px) so the sticky header never covers the eyebrow |
| container | width cage | — | — | none | `max-w-[var(--container)]`, `px-[var(--gutter)]`, `mx-auto` | full-bleed background, caged content |
| prose stack | eyebrow + headline + lead | — | — | none | `max-w-4xl mx-auto text-center` | 56rem cage inside 80rem container = deliberate air on cols 1-2 and 11-12 |
| eyebrow | `WHAT WE ARE` | `--text-eyebrow` | `--color-volt` | none | `mb-0`; sits first in stack | `font-sans font-medium uppercase tracking-[0.2em]`. The `▸` in the wireframe is notation — render no glyph, no dot, no rule |
| headline | see Copy | `--text-display-l` | `--color-cream` | none | `mt-[1.25rem]` | `font-display font-semibold tracking-[-0.03em] leading-[0.92]`. `<h2>`, `id="about-heading"`. Sentence case; never caps |
| lead | see Copy | `--text-lead` | `--color-fg-muted` | none | `mt-[clamp(1.5rem,2vw,1.75rem)]`, `max-w-[58ch] mx-auto` | `font-sans leading-[1.6]`. One paragraph, no `<br>`, no bold, no inline link |
| principles grid | `<ol>` of 3 | — | — | none | `mt-[clamp(4.5rem,9vh,7.5rem)]` | `list-none`. Semantic ordered list; visual numerals are decorative duplicates |
| principle column | `<li>` | — | — | none, no radius, no bg, no shadow | see Layout | zero hover state, zero cursor change, not focusable |
| principle hairline | 1px rule at top of each `<li>` | — | `--color-line` | `border-t` only — no radius (1px rule) | spans 100% of the column, `pt-[1.5rem]` below it | `border-t border-line`. This is the section's only divider. Never `border-line-strong`, never volt |
| principle numeral | `01` / `02` / `03` | `--text-title` | `--color-volt` | none | first child after the rule | `font-display font-semibold tabular-nums tracking-[-0.03em] leading-none`, `aria-hidden="true"` |
| principle title | `Participate` / `Create` / `Connect` | `--text-title` | `--color-fg` | none | `mt-3` (12px) | `<h3>`, `font-display font-semibold tracking-[-0.03em] leading-[1.05]`. Sentence case, not caps |
| principle copy | two sentences, see Copy | `--text-body` | `--color-fg-muted` | none | `mt-3` (12px), `max-w-[34ch]` | `leading-[1.65]`. Exactly two sentences so it wraps to ~2-3 lines at every breakpoint |
| controls | none | — | — | — | — | Zero CTAs, zero links, zero chips, zero "demo" badges. Nothing to label because nothing claims to be live |
| media | none | — | — | — | — | The only section with no photo frame. Nothing to swap later; nothing to break if photography stays weak |

**Copy**

```
EYEBROW
WHAT WE ARE

HEADLINE (h2)
Five facilities, two categories, one centre the campus runs on.

LEAD
The SAC keeps three Sports facilities and two Fitness ones in daily use —
basketball and badminton courts, a full-size floodlit football ground, an
Olympic-standard pool and a strength and conditioning gym. The earliest
door opens at 05:00, the last one closes at 23:00. Two faculty in-charges
hold the centre; a student committee runs the day to day.

PRINCIPLE 01
Participate
Five facilities, two categories, one shared calendar. Walk in with a friend,
a section team or nobody at all.

PRINCIPLE 02
Create
The student committee builds the season — tournaments, championships and
fitness challenges — and runs each one end to end. Anyone can pitch the next
one.

PRINCIPLE 03
Connect
Two faculty in-charges, a Sports Secretary and a Joint Sports Secretary. Every
one of them is listed by name, with an email that reaches a person.
```

Every number and claim above is derivable from `src/mock/mockActivities.ts` (5 records; Sports = Basketball, Football, Badminton; Fitness = Swimming, Gym; earliest `openTime` 05:00 Gym, latest `closeTime` 23:00 Gym; descriptions supply "indoor courts", "full-size football ground with evening floodlights", "Olympic-standard swimming pool", "strength and conditioning gym"), `src/mock/mockPeople.ts` (2 INCHARGE, 2 COMMITTEE with designations Sports Secretary / Joint Sports Secretary, emails on all four) and `src/mock/mockEvents.ts` (a football tournament, a fitness challenge, a swimming championship — referenced as categories, never named or dated here).

**Layout**

| Breakpoint | Prose stack | Principles | Gaps |
|---|---|---|---|
| `>=1024` (desktop) | `max-w-4xl` (56rem) centred = cols 3-10 of the 12-col container; `text-center` | `grid grid-cols-3`; col 1 = cols 1-4, col 2 = cols 5-8, col 3 = cols 9-12; `text-left`, each `<li>` its own `border-t` | `gap-x-[var(--gutter)]` (clamp 1rem-2.5rem); prose→principles `mt-[clamp(4.5rem,9vh,7.5rem)]` |
| `768-1023` (tablet) | `max-w-4xl` centred, fills the container minus gutters | `md:grid-cols-3`, same spans, hairlines shorten with the columns | `gap-x-[clamp(1rem,2.5vw,1.5rem)]`; principle copy tightens to `max-w-[30ch]` |
| `640-767` | `max-w-4xl` centred | **stacked** — 1 col. Three 190px columns at 640px crowds a `--text-title` word, so the stack holds until `md` | `gap-y-[3rem]` (48px) |
| `<640` (mobile) | full width at `px-[var(--gutter)]` = 1rem; `text-center` retained for eyebrow/headline/lead; lead `max-w-[58ch] mx-auto` | stacked, `text-left`, each block `border-t border-line pt-6` | `gap-y-[3.5rem]` (56px); prose→principles `mt-[4rem]` |

No aspect-ratio frames anywhere in this section — there is no media. Text block heights are content-driven; do not set a min-height. Desktop and mobile share one DOM order (eyebrow → h2 → lead → ol), so this section needs no separate mobile composition beyond alignment and stacking.

**Data**

| Item | Value |
|---|---|
| Selectors used | none at render time. Every string is static copy |
| Optional dev guard | `getActivityCategories()` (expects `["Sports","Fitness"]`, length 2) and `mockActivities.length` (expects 5) asserted in DEV only, so the copy's "five" / "two" cannot silently drift from the mock |
| Records rendered | zero — no activity, event, person or achievement record is displayed |
| Formatters | none. `05:00` / `23:00` are literal copy, not `formatTime` output, because they are prose not data. No raw ISO string appears |
| Empty case | not reachable. Section renders identically with empty mock arrays; only the DEV assert fires |
| Date sensitivity | none. Today = 2026-08-05 does not affect this section — no dates, no upcoming/past logic, so the fact that `interbits-football` and `fitness-challenge` are past and `swimming-championship` is today is irrelevant here |

**Motion**

| Effect | Layer | Trigger | From → To | Duration token | Easing token | Stagger | Reduced motion |
|---|---|---|---|---|---|---|---|
| Prose stack reveal (eyebrow, h2, lead as 3 children) | Motion (`motion/react`) | `whileInView`, `viewport={{ once: true, amount: 0.4 }}` | `opacity 0, y 24` (= `--reveal-y`) → `opacity 1, y 0` | `--dur-slow` | `--ease-out-quint` | `0.09s` (= `--dur-fast` ÷ 2) | `initial={false}`, no transform, final state on mount |
| Principle hairline draw | Motion | parent `whileInView`, `once: true, amount: 0.3` | `scaleX 0` → `scaleX 1`, `origin-left` | `--dur-slow` | `--ease-in-out-quart` | `0.12s` between the 3 rules (= `--dur-fast` × ⅔) | rendered at `scaleX 1`, no animation |
| Principle content (numeral + title + copy, per column, as one child) | Motion | same parent `whileInView` | `opacity 0, y 24` → `opacity 1, y 0` | `--dur-std` | `--ease-out-quint` | `0.09s` per column, `delayChildren 0.12s` so copy follows its own rule | final state on mount |
| Hover / press | none | — | — | — | — | — | nothing hoverable in this section, so nothing to disable |
| Parallax / pin / scrub | none | — | — | — | — | — | GSAP is reserved for `#focus` and `#impact`; this section imports no GSAP |
| Loops | none | — | — | — | — | — | no IntersectionObserver pause needed |

**Code**

```ts
// src/lib/motion.ts — shared by every section, written once
export const DUR = { fast: 0.18, std: 0.42, slow: 0.72, hero: 1.0 } as const; // --dur-*
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;      // --ease-out-quint
export const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const;   // --ease-in-out-quart
export const REVEAL_Y = 24;                                     // --reveal-y (motion needs a number)
```

```tsx
// src/components/home/AboutSection.tsx
import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE_OUT_QUINT, EASE_IN_OUT_QUART, REVEAL_Y } from "@/lib/motion";
import { mockActivities } from "@/mock/mockActivities";
import { getActivityCategories } from "@/lib/content";

const PRINCIPLES = [
  {
    n: "01",
    title: "Participate",
    body: "Five facilities, two categories, one shared calendar. Walk in with a friend, a section team or nobody at all.",
  },
  {
    n: "02",
    title: "Create",
    body: "The student committee builds the season — tournaments, championships and fitness challenges — and runs each one end to end. Anyone can pitch the next one.",
  },
  {
    n: "03",
    title: "Connect",
    body: "Two faculty in-charges, a Sports Secretary and a Joint Sports Secretary. Every one of them is listed by name, with an email that reaches a person.",
  },
] as const;

// ponytail: copy hardcodes "five"/"two"; this assert is the whole guard. Upgrade to
// interpolated counts only if the mock stops being a fixed 5-record fixture.
if (import.meta.env.DEV) {
  console.assert(
    mockActivities.length === 5 && getActivityCategories().length === 2,
    "#about copy claims five facilities / two categories — mock data disagrees",
  );
}

export function AboutSection() {
  const reduce = useReducedMotion();
  const group = reduce
    ? {}
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.35 } };

  const item = {
    hidden: { opacity: 0, y: REVEAL_Y },
    show: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_OUT_QUINT } },
  };
  const rule = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: DUR.slow, ease: EASE_IN_OUT_QUART } },
  };
  const col = {
    hidden: { opacity: 0, y: REVEAL_Y },
    show: { opacity: 1, y: 0, transition: { duration: DUR.std, ease: EASE_OUT_QUINT } },
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 bg-void py-[calc(var(--space-section)*1.4)]"
    >
      <div className="mx-auto w-full max-w-[var(--container)] px-[var(--gutter)]">
        <motion.div
          {...group}
          transition={{ staggerChildren: 0.09 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.p
            variants={item}
            className="font-sans text-eyebrow font-medium uppercase tracking-[0.2em] text-volt"
          >
            What we are
          </motion.p>
          <motion.h2
            variants={item}
            id="about-heading"
            className="mt-[1.25rem] font-display text-display-l font-semibold leading-[0.92] tracking-[-0.03em] text-cream"
          >
            Five facilities, two categories, one centre the campus runs on.
          </motion.h2>
          <motion.p
            variants={item}
            className="mx-auto mt-[clamp(1.5rem,2vw,1.75rem)] max-w-[58ch] text-lead leading-[1.6] text-fg-muted"
          >
            The SAC keeps three Sports facilities and two Fitness ones in daily use —
            basketball and badminton courts, a full-size floodlit football ground, an
            Olympic-standard pool and a strength and conditioning gym. The earliest door
            opens at 05:00, the last one closes at 23:00. Two faculty in-charges hold the
            centre; a student committee runs the day to day.
          </motion.p>
        </motion.div>

        <motion.ol
          {...group}
          transition={{ staggerChildren: 0.12 }}
          className="mt-[4rem] grid list-none grid-cols-1 gap-y-[3.5rem] text-left sm:gap-y-[3rem] md:mt-[clamp(4.5rem,9vh,7.5rem)] md:grid-cols-3 md:gap-x-[clamp(1rem,2.5vw,1.5rem)] lg:gap-x-[var(--gutter)]"
        >
          {PRINCIPLES.map((p) => (
            <motion.li key={p.n} transition={{ staggerChildren: 0.09, delayChildren: 0.12 }}>
              <motion.div
                variants={rule}
                className="h-px w-full origin-left bg-line"
              />
              <motion.div variants={col} className="pt-[1.5rem]">
                <span
                  aria-hidden="true"
                  className="block font-display text-title font-semibold leading-none tracking-[-0.03em] tabular-nums text-volt"
                >
                  {p.n}
                </span>
                <h3 className="mt-3 font-display text-title font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-body leading-[1.65] text-fg-muted md:max-w-[30ch] lg:max-w-[34ch]">
                  {p.body}
                </p>
              </motion.div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
```

The hairline is a `div h-px bg-line` rather than `border-t` so `scaleX` can animate it; visually identical (1px, `--color-line`, full column width). With reduced motion, `group` is `{}`, so variants never mount a hidden state and the rules render at full width — no extra branch needed.

**A11y**

- `<section id="about" aria-labelledby="about-heading">`; the `<h2 id="about-heading">` is the only heading at that level in the section. Principle titles are `<h3>` — heading order 2→3, no skips.
- Principles are an `<ol>`/`<li>`: order is meaningful (participate → create → connect). The visible `01/02/03` numerals are `aria-hidden="true"` so screen readers hear the list index once, not twice.
- The eyebrow is a `<p>`, not a heading, and reads as "What we are" — sentence case in the DOM, uppercased by CSS `uppercase`, so speech synthesis never spells it out.
- Zero interactive elements: nothing enters the tab order, nothing needs the global `outline 2px solid var(--color-volt); outline-offset 3px` ring. Skip-link and header nav targeting `#about` land on the section, whose `scroll-mt-24` keeps the eyebrow clear of the sticky header.
- Contrast on `--color-void`: cream 18.6:1, fg 18.3:1, volt 16.8:1, fg-muted 7.85:1 — all exceed WCAG AA and AAA for body text. `--color-line` at 1.28:1 is a decorative divider carrying no state or meaning, so the 3:1 non-text rule does not apply; the section stays fully comprehensible with the rules invisible.
- `prefers-reduced-motion: reduce` removes all three animations via `useReducedMotion`; content is present and final on first paint (no opacity-0 trap if JS fails, since motion sets the hidden state only when it mounts — verify by disabling JS: text must be visible).

**Acceptance**

1. Section renders exactly 8 text strings and 3 hairlines: 1 eyebrow, 1 h2, 1 lead, 3 numerals, 3 h3, 3 body paragraphs — no images, no icons, no buttons, no links, no bordered or filled boxes.
2. Computed `background-image` on `#about` and its children is `none`; no element inside `#about` has a `filter`, `box-shadow`, `border-radius` or `background-color` other than `--color-void` / `--color-line`.
3. Volt appears in exactly 4 places (eyebrow + three numerals) and covers well under 10% of the viewport at 1440×900; cream appears only on the h2.
4. Tab from the section above lands on the first control *below* `#about` — nothing in the section is focusable.
5. At 1440px the prose block is centred with `max-w-4xl` and the principles occupy cols 1-4 / 5-8 / 9-12 with `gap-x` equal to the live gutter; at 767px all three principles are stacked full width with their own top rule.
6. With `prefers-reduced-motion: reduce`, a scroll into the section produces no transform or opacity change (all three effects report final values immediately) and the three hairlines are full width.
7. With mock data unchanged, the DEV console shows no assertion warning; changing `mockActivities` to 4 records makes the assertion fire.

---

### Section 4 — Flagship pinned scene (GSAP)

One statement holds the viewport for 250vh while the five activities assemble themselves out of the dark into the exact column geometry of Section 5 — the only pinned scene on the site, and pure spectacle: nothing here is content-unique.

**Canvas**

| Property | Value |
|---|---|
| Background token | `--color-void` (section base); scrubbed tint stack `--color-teal-900` → `--color-teal-700` → `--color-deep` as opacity-only layers above it |
| Mesh utility | `mesh-teal` (teal-500 bloom upper-right, volt bloom mid-left, on void) |
| Mesh strength | `--mesh-strength: 0.55` |
| Vertical padding | Armed (pinned): none — stage is exactly `h-screen`, all spacing is optical. Fallback: `py-[var(--space-section)]` + `px-[var(--gutter)]` |
| Container behaviour | Landing grid is `max-w-[var(--container)]` + `px-[var(--gutter)]`, horizontally centred. Fragments travel to ±62vw during beat 2, so the stage is `overflow-clip` (never `overflow-hidden` on `html`/`body`) |
| Scroll cost | Pin adds 250vh of spacer; total section scroll height = 350vh armed, natural height in fallback |

**Wireframe**

DESKTOP >=1024 · BEAT 2 (t = 20–70) · 12-col grid, container 1280, gutter clamp(1rem,4vw,2.5rem)
```
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2   3   4   5   6   7  │  8   9  10  11  12                          │
│  ▸ THE DAILY LOOP                                                         │
│        ┌────────────┐                                                     │
│        │ ░ 01 SPORTS│  ← i=0   orbit ( 0vw , -30vh )                      │
│        │ ░ Basketbll│                                                     │
│        └────────────┘                                                     │
│                                        ┌────────────┐                     │
│   ┌────────────┐                       │ ░ 02 SPORTS│ ← i=1 (+38vw,-9vh)  │
│   │ ░ 05 FITNS │ ← i=4 (-38vw,-9vh)    │ ░ Football │                     │
│   │ ░ Gym      │        ((( volt       └────────────┘                     │
│   └────────────┘         bloom )))                                        │
│                    Five spaces.                                           │
│                    Eighteen hours.                                        │
│                    One centre.                                            │
│                 The gym unlocks at 5 AM. Courts run to 10 PM.             │
│                                                                           │
│        ┌────────────┐                  ┌────────────┐                     │
│        │ ░ 04 FITNS │ ← i=3            │ ░ 03 SPORTS│ ← i=2               │
│        │ ░ Swimming │   (-22vw,+24vh)  │ ░ Badminton│   (+22vw,+24vh)     │
│        └────────────┘                  └────────────┘                     │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
└───────────────────────────────────────────────────────────────────────────┘
```

DESKTOP >=1024 · BEAT 3 (t = 70–100, fragments landed in Section 5 columns)
```
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2   3   4   5   6   7  │  8   9  10  11  12                          │
│  ┌───────────────┐   ┌───────────────┐   ┌───────────────┐                │
│  │░│ 01  SPORTS  │   │░│ 02  SPORTS  │   │░│ 03  SPORTS  │  ← cols 1-4 /  │
│  │░│ Basketball  │   │░│ Football    │   │░│ Badminton   │    5-8 / 9-12  │
│  └───────────────┘   └───────────────┘   └───────────────┘                │
│                                                                           │
│  ┌───────────────┐   ┌───────────────┐                                    │
│  │░│ 04  FITNESS │   │░│ 05  FITNESS │     statement faded to 0,          │
│  │░│ Swimming    │   │░│ Gym         │     bg settled to --color-deep     │
│  └───────────────┘   └───────────────┘                                    │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
└───────────────────────────────────────────────────────────────────────────┘
```

MOBILE <640 · single column, gutter 1rem · no pin, normal document flow
```
┌─────────────────────────┐
│ ▸ THE DAILY LOOP        │
│                         │
│  Five spaces.           │
│  Eighteen hours.        │
│  One centre.            │
│                         │
│  The gym unlocks at 5   │
│  AM. Courts run to 10   │
│  PM. Floodlights make   │
│  football an evening    │
│  sport.                 │
│                         │
│ ┌──────────┬──────────┬ │
│ │░│01 SPORT│░│02 SPORT│ │
│ │░│Basketbl│░│Football│ │
│ └──────────┴──────────┴ │
│ ◀ snap-x rail, 5 items  │
└─────────────────────────┘
```

**Elements**

| Slot | Content | Type token | Color token | Surface/radius | Spacing | Notes |
|---|---|---|---|---|---|---|
| Section band | `<section id="focus">` | — | bg `--color-void`, `mesh-teal` | none | armed: 0; fallback `py-[var(--space-section)]` | `relative isolate`, `[--mesh-strength:0.55]` |
| Mesh blooms | `mesh-teal ::before` | — | `--color-teal-500`, `--color-volt` | `filter: blur(80px)` | inset 0 | static, never animated; desktop-only per mesh utility spec |
| Pin stage | `div[data-armed]` | — | transparent | `overflow-clip` | armed `h-screen` | pin target; the only element GSAP pins |
| BG tint A | `div[data-bg="teal-900"]` | — | `--color-teal-900` | `absolute inset-0` | inset 0 | starts `opacity-0`, opacity-only tween |
| BG tint B | `div[data-bg="teal-700"]` | — | `--color-teal-700` | `absolute inset-0` | inset 0 | stacked above A, opaque fill |
| BG tint C | `div[data-bg="deep"]` | — | `--color-deep` | `absolute inset-0` | inset 0 | final settle; stacked above B |
| Volt bloom | `div[data-bloom]` | — | `radial-gradient(color-mix(in oklab, var(--color-volt) 38%, transparent))` | `rounded-full`, `blur-[80px]` | `h-[60vh] w-[60vh]`, grid-centred | blur is static (rasterised once); only `scale`/`opacity` animate |
| Eyebrow | "The daily loop" | `--text-eyebrow`, `uppercase tracking-[0.2em]` | `--color-volt` | none | `mb-4` | one of 12 volt elements in the frame |
| Statement | `h2#focus-statement` | `--text-display-l`, `font-display font-semibold tracking-[-0.03em] leading-[0.92]` | `--color-cream` | none | `max-w-[46rem]`, centred, `[text-wrap:balance]` | 3 rendered lines; only `--text-display-l` use on the page |
| Lead | Sub-line under statement | `--text-lead` | `--color-fg-muted` | none | `mt-6 max-w-[62ch]` | carries the section's real information for the fallback path |
| Landing grid | `ul[data-landing]` | — | transparent | none | `ACTIVITY_GRID` + `gap-y-[4vh]` | ghost of Section 5's grid; `aria-hidden` when armed |
| Landing cell | `li` | — | transparent | none | armed `col-span-4 h-[26vh] min-h-[184px]` | untransformed reference frame — every fragment coordinate is measured from its cell |
| Fragment | `Link[data-frag]` → `/activities/:slug` | — | border `--color-line`, bg `--color-deep` | `--radius-md` (16px), 1px border | `h-full`, inner `gap-4` | 5 records → 5 fragments; hover `bg --color-raised` (fallback only) |
| Fragment sliver frame | fixed-ratio photo frame | — | plate `--color-teal-900` | `aspect-[1/2]`, `overflow-hidden` | `h-full shrink-0` | fixed ratio ⇒ any future photo swaps with zero layout change |
| Sliver image | `img` from `coverImageUrl` | — | — | fills frame | `object-cover` | `alt=""`, `width=320 height=640`, `loading="lazy" decoding="async"`, `opacity-40 saturate-[0.35]`, `?auto=format&fit=crop&w=320&q=55` |
| Sliver scrim | tonal gradient | — | `bg-linear-to-t from-deep to-transparent` | inset 0 | — | `aria-hidden`; keeps type legible over any photo |
| Index numeral | `01`…`05` from index | `--text-meta`, `font-display tabular-nums` | `--color-fg-muted` | none | `gap-2` | derived from array index, not data |
| Fragment hairline | rule between numeral and category | — | `--color-line-volt` | `h-px` | `flex-1` | the volt hairline allowance |
| Category eyebrow | `activity.category` | `--text-eyebrow`, `uppercase tracking-[0.2em]` | `--color-volt` | none | — | only "Sports" / "Fitness" exist |
| Fragment name | `activity.name` | `--text-title`, `font-display font-semibold tracking-[-0.03em] leading-[0.92]` | `--color-fg` | none | bottom-aligned, `pr-4 py-4` | never all-caps |
| Progress rail track | scene progress | — | `--color-line-strong` | `h-px` | `inset-x-[var(--gutter)] bottom-8` | `aria-hidden`; armed only |
| Progress rail fill | scaleX of timeline | — | `--color-volt` | `h-px` | `origin-left` | scrubbed 0→1 across the whole timeline |
| Scroll hint | "Keep scrolling" + chevron | `--text-eyebrow`, `uppercase tracking-[0.2em]` | text `--color-fg-muted`, icon `--color-volt` | none | `bottom-14`, centred, `gap-2` | `lucide-react` `ChevronDown` `size-3`; `aria-hidden`; armed only |
| Fallback rail | `ul` horizontal scroller | — | transparent | none | `gap-4`, `-mx-[var(--gutter)] px-[var(--gutter)] pb-4` | `snap-x snap-mandatory`, `scroll-px-[var(--gutter)]`, `[scrollbar-width:none]` |
| Fallback rail item | `li` | — | — | — | `w-[78%] sm:w-[52%] md:w-[38%] shrink-0 snap-start` | ≥48px touch height guaranteed by `min-h-[184px]` fragment |
| Focus ring | global | — | `--color-volt` | `outline 2px`, `outline-offset 3px` | — | inherited from global rule; fragments add `outline-offset-[3px]` explicitly |

**Copy**

```
Eyebrow:      The daily loop

Statement:    Five spaces. Eighteen hours. One centre.

Lead:         The gym unlocks at 5 AM. Courts run to 10 PM. Floodlights make
              football an evening sport.

Scroll hint:  Keep scrolling

Fragments (name / category, from mockActivities in category order):
  01  Basketball / Sports
  02  Football / Sports
  03  Badminton / Sports
  04  Swimming / Fitness
  05  Gym / Fitness

Fallback rail aria-label:   Activities, horizontal list
Fragment link accessible name:  <name>, <category>
Image alt text:  ""   (decorative sliver, never described)
```

**Layout**

| Breakpoint | Composition |
|---|---|
| ≥1024 armed | Stage `h-screen`. Landing grid absolutely positioned `top-1/2 -translate-y-1/2`, `max-w-[var(--container)]`, `px-[var(--gutter)]`, `grid grid-cols-12 gap-x-6 gap-y-[4vh]`. Cells `col-span-4` → 3 per row (5 records = 3 + 2; a 6th fills row 2). At container 1280 / gutter 40: column = 78px, cell = 384px wide, `h-[26vh] min-h-[184px]`. Fragment internal split: sliver `aspect-[1/2]` (≈140px at 281px tall) + text column `flex-1`. Statement layer `absolute inset-0 grid place-items-center`, `pointer-events-none`, z-20; fragments z-10; bloom z-0; tints z-0 below bloom. |
| 1024–1279 armed | Identical grid; container shrinks to viewport − gutter, cell width falls to ~300px, `h-[26vh]` unchanged. Orbit radii are % of stage so no tuning needed. |
| 768–1023 (tablet) | Never pinned. Statement + lead in flow, left-aligned, `max-w-[62ch]`. Rail items `w-[38%]` → 2.5 visible. |
| 640–767 | Rail items `w-[52%]` → ~1.8 visible. |
| <640 | Rail items `w-[78%]` → 1.2 visible with peek. Statement left-aligned, `--text-display-l` clamps to 2.5rem. No hover meaning anywhere; whole fragment is the tap target. |
| Vertical continuity | Horizontal continuity with Section 5 is exact (same grid class, same `col-span-4`, same gutter ⇒ identical column x + width). Vertical is compressed — 26vh rows here vs Section 5's `aspect-[4/5]` cards — because two full-ratio rows exceed 100vh. The read is column alignment, not card height. |

**Data**

| Item | Value |
|---|---|
| Selector | `getActivityCategories().flatMap(getActivitiesByCategory)` — documented selectors only, no new data access |
| Order | Category-grouped, matching Section 5 exactly: Basketball, Football, Badminton (Sports), Swimming, Gym (Fitness) |
| Fields read | `name`, `slug`, `category`, `coverImageUrl`. `timings` and `description` are NOT read here — they belong to Section 5 and `/activities/:slug` |
| Records rendered | 5 fragments: `01 Basketball/Sports`, `02 Football/Sports`, `03 Badminton/Sports`, `04 Swimming/Fitness`, `05 Gym/Fitness` |
| Index scaling | Orbit angle = `-90° + (i / n) · 360°`, so n is read from the array at runtime. A 6th record inserts itself at 60° spacing and gets a 6th landing cell. No code change. |
| Formatters | None — no date or time value is rendered. The "5 AM / 10 PM" in the lead is authored copy derived from Gym `05:00–23:00` and the courts' `22:00` close, not a formatted field, so `formatTime` is not involved |
| Mock labelling | Nothing here reads as live status (no "open now", no counts), so no demo badge is needed in this section. `getOpenActivitiesNow()` is deliberately not used |
| Empty case | `activities.length === 0` → component returns `null` (no orphan statement, no empty pin). `1 ≤ n ≤ 2` → scene still runs; orbit degenerates to 1–2 points and the landing grid is a partial row, which is acceptable |
| Today (2026-08-05) | No effect — this section renders no event or date |

**Motion**

Timeline is measured in **units**: 100 u = the full 250vh scrub. `scrub: 1` is the only millisecond constant in the armed path. GSAP ease names mirror the CSS tokens exactly: `power4.out` ≡ `--ease-out-quint` (quintic out), `power3.inOut` ≡ `--ease-in-out-quart` (quartic in-out). `none` (linear) appears only where `scrub: 1` itself supplies the smoothing — an eased cross-fade on top of an eased scrub reads as lag.

| Effect | Layer | Trigger | From → To | Duration token | Easing token | Stagger | Reduced-motion |
|---|---|---|---|---|---|---|---|
| Pin | GSAP ScrollTrigger | `start: "top top"`, `end: "+=250%"` | free → pinned 250vh | scrub 1 | — | — | Not created; `matchMedia` query excludes it |
| Statement lock | GSAP | u 0→16 | `autoAlpha 0, y 24px` → `1, 0` (`--reveal-y`) | 16 u | `--ease-out-quint` (`power4.out`) | — | Motion `whileInView` fade only, `--dur-slow`, `--ease-out-quint`, no y |
| Lead reveal | GSAP | u 4→18 | `autoAlpha 0, y 24px` → `1, 0` | 14 u | `--ease-out-quint` | 4 u after statement | Motion fade, `--dur-slow`, `--ease-out-quint` |
| Scroll hint out | GSAP | u 8→16 | `autoAlpha 1 → 0` | 8 u | `--ease-in-out-quart` (`power3.inOut`) | — | Element not rendered |
| Fragment entry | GSAP | u 20 + i·6, len 22 | `x ±0.62·W, y 0.6·orbitY, rotate 2·tilt, scale 0.9·s, autoAlpha 0` → orbit point, `rotate tilt`, `scale s`, `autoAlpha 1` | 22 u | `--ease-out-quint` | 6 u per index | Rail item Motion fade-up, `--dur-std`, `--ease-out-quint`, 60ms stagger → fade only under reduce |
| Fragment orbit drift | GSAP | u (42+i·6) → 70 | `y += ±2.5vh`, `rotate → -0.6·tilt` | 4–28 u | `none` (scrub-eased) | inherits entry stagger | Not created |
| BG void → teal-900 | GSAP | u 20→44 | `opacity 0 → 1` | 24 u | `none` | — | Static `--color-void` |
| BG teal-900 → teal-700 | GSAP | u 44→68 | `opacity 0 → 1` | 24 u | `none` | — | Static `--color-void` |
| BG → deep settle | GSAP | u 74→100 | `opacity 0 → 1` | 26 u | `none` | — | Static `--color-void` |
| Volt bloom grow | GSAP | u 20→70 | `scale 0 → 1.4`, `autoAlpha 0 → 0.9` | 50 u | `--ease-out-quint` | — | Rendered at `scale 1`, `opacity 0.35`, static |
| Volt bloom settle | GSAP | u 74→100 | `autoAlpha 0.9 → 0.35` | 26 u | `none` | — | Static |
| Statement exit | GSAP | u 70→92 | `scale 1 → 0.86`, `autoAlpha 1 → 0` | 22 u | `--ease-in-out-quart` | — | Stays at `scale 1`, `opacity 1` |
| Lead exit | GSAP | u 70→84 | `autoAlpha 1 → 0` | 14 u | `none` | — | Stays visible |
| Fragment convergence | GSAP | u 70 + i·1.2, len 24 | orbit point → `x 0, y 0, rotate 0, scale 1` (its landing cell) | 24 u | `--ease-in-out-quart` | 1.2 u per index | Not created; rail is already in flow |
| Progress rail fill | GSAP | u 0→100 | `scaleX 0 → 1` | 100 u | `none` | — | Element not rendered |
| Fragment hover | CSS | `:hover` (fallback path only) | `bg-deep → bg-raised` | `--dur-fast` | `--ease-out-quint` | — | Colour change only, unaffected |
| Focus ring | CSS | `:focus-visible` | none → `outline 2px --color-volt` | 0ms | — | — | Never animated |

Frame budget — what is promoted, what is not:

| Element | Promoted | Why |
|---|---|---|
| 3 BG tint layers | Yes — `will-change: transform, opacity` while `[data-armed="true"]` | Opacity-only cross-fade; without promotion each frame repaints a full viewport of flat colour |
| Volt bloom | Yes | `blur(80px)` is a **static** CSS filter, rasterised once, then only transformed/faded. Animating the blur radius would re-rasterise a 60vh surface every frame — never do it |
| 5 fragments | Yes | Each is one composited layer carrying its own `x/y/rotate/scale`. Sliver image + scrim ride inside the layer at no extra cost |
| Statement group | Yes | Scales **down** 1 → 0.86 only; a rasterised-at-1 texture downscales on the GPU without re-raster. Never scale display type above 1 |
| Progress rail fill | No | 1px × viewport `scaleX`; promotion costs more than the paint |
| Landing grid / cells | No | Never transformed. They exist purely as untransformed measurement frames |
| Global film grain | Already its own fixed layer | `mix-blend-mode: overlay` forces one extra full-viewport composite of the scene result. Accept exactly one. Do not add a second blend or any `backdrop-filter` inside this section — that re-rasterises the blended stack every frame |
| Total | 10 composited layers at peak | Well inside budget on integrated GPUs at 1440p |

No per-frame React state exists in this section: React renders the DOM once per `armed` flip, GSAP writes transforms directly.

**Code**

```tsx
// src/sections/FocusScene.tsx
// The ONLY file in this repo permitted to import gsap / ScrollTrigger (the other is
// ImpactScene for #impact). Dependency: npm i gsap — dynamic-imported so mobile never
// downloads it.
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { getActivityCategories, getActivitiesByCategory } from "@/lib/content";
// Section 5 owns the grid contract; #focus mirrors it so convergence is exact by
// construction instead of by measurement.
import { ACTIVITY_GRID, ACTIVITY_CELL } from "@/sections/ActivitiesSection";
// ACTIVITY_GRID = "grid grid-cols-12 gap-x-6"
// ACTIVITY_CELL = "col-span-4"

const ARMED_Q = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const REFRESH_DEBOUNCE = 150;
// token mirror: --ease-out-quint === quintic out; --ease-in-out-quart === quartic in-out
const EASE = { outQuint: "power4.out", inOutQuart: "power3.inOut" } as const;

/** Star orbit anchor derived from index. Scales to any n with zero code change. */
export const orbitFor = (i: number, n: number, w: number, h: number) => {
  const t = -Math.PI / 2 + (i / n) * Math.PI * 2;
  return { x: Math.cos(t) * w * 0.38, y: Math.sin(t) * h * 0.3 };
};
export const edgeOf = (i: number) => (i % 2 === 0 ? -1 : 1); // alternating entry edge
export const tiltOf = (i: number) => edgeOf(i) * (2.5 + i * 0.6); // deg, |max| 5.5
export const scaleOf = (i: number) => 0.86 + (i % 3) * 0.06; // 0.86 / 0.92 / 0.98

if (import.meta.env.DEV) {
  // ponytail: one runnable check instead of a test harness — fails loudly in the console
  const o0 = orbitFor(0, 5, 1000, 1000);
  console.assert(Math.abs(o0.x) < 1e-9 && o0.y < 0, "focus: i=0 must sit top-centre");
  console.assert(
    orbitFor(1, 5, 1000, 1000).x > 0 && orbitFor(4, 5, 1000, 1000).x < 0,
    "focus: orbit must be left/right symmetric",
  );
  console.assert(orbitFor(0, 6, 1000, 1000).y === o0.y, "focus: n must not shift i=0");
}

export default function FocusScene() {
  const activities = getActivityCategories().flatMap(getActivitiesByCategory);
  const stageRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  // gate: desktop + no-preference. Flips live if the user toggles the OS setting.
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
    let mm: { revert: () => void } | undefined;
    let detach = () => {};

    void (async () => {
      let gsap: typeof import("gsap").gsap;
      let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
      try {
        ({ gsap } = await import("gsap"));
        ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      } catch {
        setArmed(false); // chunk failed -> normal-flow fallback, nothing else changes
        return;
      }
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // matchMedia IS a gsap.Context: everything created inside is reverted
      // automatically when the query stops matching or on mm.revert().
      mm = gsap.matchMedia();
      mm.add(ARMED_Q, () => {
        stage.dataset.armed = "true"; // scopes the will-change CSS, nothing global
        const q = gsap.utils.selector(stage);
        const frags = gsap.utils.toArray<HTMLElement>("[data-frag]", stage);
        const n = frags.length;
        const W = () => stage.clientWidth;
        const H = () => stage.clientHeight;

        // Offset of a fragment's landing cell centre from stage centre. The cell is
        // never transformed, so this is stable mid-scrub.
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
            invalidateOnRefresh: true, // re-evaluates every function-based value
          },
        });

        // BEAT 1 — statement locks centre, background still void (u 0-20)
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

        // BEAT 2 — five fragments drift in from alternating edges and orbit
        frags.forEach((el, i) => {
          const enter = 20 + i * 6;      // 20 26 32 38 44
          const arrive = enter + 22;     // 42 48 54 60 66
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
              immediateRender: true, // parks fragments off-canvas at progress 0
            }, enter)
            .to(el, {
              y: `+=${edgeOf(i) * 2.5}vh`,
              rotate: -tiltOf(i) * 0.6,
              duration: 70 - arrive, // 28 22 16 10 4 — always > 0
              ease: "none",
            }, arrive);
        });

        // BEAT 3 — statement leaves, fragments land in Section 5's columns (u 70-100)
        tl.to(q("[data-statement]"),
            { scale: 0.86, autoAlpha: 0, duration: 22, ease: EASE.inOutQuart }, 70)
          .to(q("[data-lead]"), { autoAlpha: 0, duration: 14, ease: "none" }, 70)
          .to(q('[data-bg="deep"]'), { autoAlpha: 1, duration: 26, ease: "none" }, 74)
          .to(q("[data-bloom]"), { autoAlpha: 0.35, duration: 26, ease: "none" }, 74);

        frags.forEach((el, i) => {
          // x:0 y:0 IS the landing cell — the fragment is already its child in the DOM.
          tl.to(el, { x: 0, y: 0, rotate: 0, scale: 1, duration: 24, ease: EASE.inOutQuart },
            70 + i * 1.2); // last tween ends at 98.8 of 100
        });

        tl.fromTo(q("[data-rail-fill]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 100, ease: "none", immediateRender: true }, 0);

        return () => {
          delete stage.dataset.armed; // the only attribute we touched; pin styles and
        };                            // spacer are reverted by the matchMedia context
      });

      const onResize = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => ScrollTrigger.refresh(), REFRESH_DEBOUNCE);
      };
      window.addEventListener("resize", onResize, { passive: true });
      void document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh(); // display-font metrics shift the pin
      });
      detach = () => window.removeEventListener("resize", onResize);
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      detach();
      mm?.revert(); // kills triggers, removes pin spacer, restores every inline style
    };
  }, [armed]);

  if (activities.length === 0) return null;

  const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } };

  return (
    <section
      id="focus"
      aria-labelledby="focus-statement"
      className="relative isolate mesh-teal bg-void [--mesh-strength:0.55]"
    >
      <div
        ref={stageRef}
        className={
          armed
            ? "relative h-screen overflow-clip"
            : "relative overflow-clip px-[var(--gutter)] py-[var(--space-section)]"
        }
      >
        {armed && (
          <>
            <div data-bg="teal-900" aria-hidden className="pointer-events-none absolute inset-0 bg-teal-900 opacity-0" />
            <div data-bg="teal-700" aria-hidden className="pointer-events-none absolute inset-0 bg-teal-700 opacity-0" />
            <div data-bg="deep" aria-hidden className="pointer-events-none absolute inset-0 bg-deep opacity-0" />
            <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
              <div
                data-bloom
                className="h-[60vh] w-[60vh] rounded-full opacity-0 blur-[80px] [background:radial-gradient(circle,color-mix(in_oklab,var(--color-volt)_38%,transparent)_0%,transparent_70%)]"
              />
            </div>
          </>
        )}

        {/* landing grid — ghost of Section 5. Fragments are its children, so
            convergence is x:0,y:0 and needs no target measurement. */}
        <div
          className={
            armed
              ? "absolute inset-x-0 top-1/2 z-10 mx-auto w-full max-w-[var(--container)] -translate-y-1/2 px-[var(--gutter)]"
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
                : "-mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-4 [scrollbar-width:none]"
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
                <motion.div {...(armed ? {} : reveal)}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                  className="h-full"
                >
                  <Link
                    to={`/activities/${a.slug}`}
                    data-frag
                    tabIndex={armed ? -1 : undefined}
                    className="group flex h-full min-h-[184px] items-stretch gap-4 overflow-hidden rounded-[var(--radius-md)] border border-line bg-deep outline-offset-[3px] transition-colors duration-[var(--dur-fast)] hover:bg-raised"
                  >
                    <div className="relative aspect-[1/2] h-full shrink-0 overflow-hidden bg-teal-900">
                      <img
                        src={`${a.coverImageUrl}?auto=format&fit=crop&w=320&q=55`}
                        alt=""
                        width={320}
                        height={640}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover opacity-40 saturate-[0.35]"
                      />
                      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-deep to-transparent" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-4 pr-4">
                      <span className="flex items-center gap-2">
                        <span className="font-display text-meta tabular-nums text-fg-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span aria-hidden className="h-px flex-1 bg-line-volt" />
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
              ? "pointer-events-none absolute inset-0 z-20 grid place-items-center px-[var(--gutter)] text-center"
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
            <div data-hint aria-hidden className="absolute bottom-14 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 text-eyebrow uppercase tracking-[0.2em] text-fg-muted">
              Keep scrolling
              <ChevronDown className="size-3 text-volt" />
            </div>
            <div aria-hidden className="absolute inset-x-[var(--gutter)] bottom-8 z-20 h-px bg-line-strong">
              <div data-rail-fill className="h-px w-full origin-left scale-x-0 bg-volt" />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
```

One rule in `src/index.css` — scoped to the attribute the scene owns, so it disappears with the scene:

```css
[data-armed="true"] [data-frag],
[data-armed="true"] [data-bloom],
[data-armed="true"] [data-bg],
[data-armed="true"] [data-statement] {
  will-change: transform, opacity;
}
```

**A11y**

| Concern | Rule |
|---|---|
| Semantics | `<section id="focus" aria-labelledby="focus-statement">`; the statement is the only `h2` in the section; fragments are an `<ul>`/`<li>` list of `<Link>`s |
| Armed path | The landing list gets `aria-hidden="true"` and every fragment `tabIndex={-1}`: it is a decorative duplicate of Section 5, which owns the focusable, screen-reader-visible activity list. Nothing is reachable only inside the pinned scene |
| Fallback path | `aria-hidden` and `tabIndex` are dropped; the rail is a real labelled list of real links to `/activities/:slug` — zero dead CTAs at any breakpoint |
| Keyboard | No focusable element sits off-canvas while pinned, so Tab can never scroll-jump the pin. Rail is keyboard-scrollable natively (arrow keys on the scroll container); no custom key handling, no scroll hijacking |
| Focus ring | Global `outline 2px solid var(--color-volt); outline-offset 3px`; fragments set `outline-offset-[3px]` explicitly because `overflow-hidden` clips a larger offset |
| Reduced motion | `prefers-reduced-motion: reduce` is part of the arming query, so GSAP is never even imported: statement is a plain heading in flow, fragments a snap rail. Toggling the OS setting live tears the scene down within one render |
| Decorative content | Slivers use `alt=""`; scrims, hairlines, bloom, rail and scroll hint are all `aria-hidden` |
| Contrast | `--color-cream` on void/teal-900 ≥ 12:1. `--color-fg` on `--color-deep` ≥ 12:1. `--color-volt` on `--color-deep` ≥ 11:1. Index numeral and scroll hint use `--color-fg-muted` (6.6:1 on deep) — `--color-fg-faint` measures 3.2:1 on deep and 3.8:1 on void, so it is banned for text below 1rem in this section |
| Motion safety | No parallax on text, no rotation beyond 5.5°, no flashing; bloom opacity ceiling 0.9 with a static blur |

**Acceptance**

1. `grep -rln "from \"gsap" src` returns exactly two files: `src/sections/FocusScene.tsx` and the `#impact` scene. Any third file is a build failure.
2. At 1440×900 with reduce-motion off, `#focus` occupies 350vh of document scroll (100vh stage + 250vh pin spacer), and the statement stays optically centred for the entire 250vh.
3. Toggling OS reduce-motion on with the page open leaves `ScrollTrigger.getAll().length === 0`, no pin spacer in the DOM, no `data-armed` attribute, no leftover inline `transform`/`opacity` on any `[data-frag]`, and a horizontally scrollable rail.
4. Resizing 1440→1100 triggers exactly one `ScrollTrigger.refresh()` 150ms after the final resize event, and at scroll progress 1.0 each fragment's left edge aligns to its Section 5 counterpart's left edge within 0px.
5. Adding a 6th record to `mockActivities` renders a 6th fragment on a 60°-spaced orbit and a 6th landing cell in row 2, with zero edits to `FocusScene.tsx`.
6. A Performance recording across the full scrub shows no Layout or Recalculate Style entries inside the scene's own frames, no blur re-rasterisation, and ≥55fps median at 1440p.
7. On a 390px viewport the gsap chunk is never requested (Network panel), the rail's first item is at least 48px tall, and every fragment tap navigates to `/activities/<slug>`.

---

### Section 5 — Explore activities

Turns the five facility records into one asymmetric editorial spread where the scrim, not the photograph, guarantees legibility — and kills the phantom "Recreation" filter that currently always renders an empty grid.

**Canvas**

| Property | Value |
|---|---|
| Background token | `--color-deep` (`bg-deep`) — the raised band between the two `--color-void` sections around it |
| Top edge | `border-t border-line` (1px solid, `--color-line`) |
| Mesh utility | `mesh-teal` (teal-500 bloom upper-right behind the heading; volt bloom mid-left behind the feature card's top corner) |
| Mesh strength | `--mesh-strength: 0.35` — low, because the cards carry their own tonal weight |
| Bloom blur | `filter: blur(80px)` desktop / `blur(48px)` below `md`, on the `::before`, never animated |
| Vertical padding | `py-[--space-section]` = `clamp(5rem,11vh,9rem)` |
| Container | `mx-auto w-full max-w-[--container] px-[--gutter]`; nothing bleeds full-width on desktop. Mobile rail is the ONE exception — it breaks the gutter with `-mx-[--gutter] px-[--gutter]` so cards run to the screen edge |
| Grain | Inherited from global `body::after` (opacity .045, overlay). Section adds nothing |
| Accent audit | Volt total ≈0.4% of a 1440×900 viewport: eyebrow (11px caps), one active chip fill (~96×40), five 11px category pills, one arrow glyph, one 2px progress thumb. Under the 10% ceiling with room to spare |

**Wireframe**

DESKTOP >=1024  ·  12-col grid, container 1280, gutter clamp(1rem,4vw,2.5rem)
```
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2   3   4   5   6   7  │  8   9  10  11  12                          │
│  ▸ EXPLORE                  │                                             │
│  ┌─────────────────────────┐│                                             │
│  │ Five places to show up. ││                                             │
│  └─────────────────────────┘│                                             │
│  Courts, a full-size ground, an Olympic-standard pool and a strength      │
│  floor that opens at 5:00 AM. Filter by what you're here for.             │
│                             │                                             │
│  [All 5][Sports 3][Fitness 2]                                             │
│                             │                                             │
│  ┌─────────────────────────┐│ ┌─────────────────┐                         │
│  │[Sports]      feature 4/5││ │[Sports]         │  ← cols 8-12, 4 stacked │
│  │                         ││ │                 │    auto-rows-fr         │
│  │                         ││ │ Football        │                         │
│  │                         ││ │ Mon · 5:30–9:00 │                         │
│  │                         ││ └─────────────────┘                         │
│  │                         ││ ┌─────────────────┐                         │
│  │                         ││ │[Fitness]        │                         │
│  │ ░░░░░ scrim ░░░░░░░░░░░ ││ │ Swimming        │                         │
│  │ Basketball              ││ │ Mon · 6:00–8:00 │                         │
│  │ Indoor basketball       ││ └─────────────────┘                         │
│  │ courts for practice…    ││ ┌─────────────────┐                         │
│  │ ◔ Mon · 6:00 AM–10:00 PM││ │[Fitness]        │                         │
│  └─────────────────────────┘│ │ Gym             │                         │
│                             │ │ Mon · 5:00–11:00│                         │
│                             │ └─────────────────┘                         │
│                             │ ┌─────────────────┐                         │
│                             │ │[Sports]         │                         │
│                             │ │ Badminton       │                         │
│                             │ │ Mon · 7:00–10:00│                         │
│                             │ └─────────────────┘                         │
│                             │                                             │
│                             │              All activities →  ← cols 10-12 │
└───────────────────────────────────────────────────────────────────────────┘
```

MOBILE <640  ·  single column, gutter 1rem
```
┌─────────────────────────┐
│ ▸ EXPLORE               │
│ Five places to          │
│ show up.                │
│                         │
│ Courts, a full-size     │
│ ground, an Olympic-     │
│ standard pool and a     │
│ strength floor that     │
│ opens at 5:00 AM.       │
│                         │
│ ┌───┐┌──────┐┌───────┐  │
│ │All││Sports││Fitness│  │
│ └───┘└──────┘└───────┘  │
│                         │
│ ┌───────────────────┐┌──│
│ │[Sports]           ││  │
│ │      3/2          ││  │
│ │ ░░░░ scrim ░░░░░░ ││Fo│
│ │ Basketball        ││ot│
│ │ ◔ Mon · 6 AM–10PM ││ba│
│ └───────────────────┘└──│
│ ▮▮▮▮▮───────────────────│
│                         │
│ ┌─────────────────────┐ │
│ │  All activities  →  │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```
Rail cards are 82vw with 12px gaps; card 2 peeks 14vw to signal scrollability. Progress track is full gutter width, thumb 20%.

**Elements**

| Slot | Content | Type token | Color token | Surface/radius | Spacing | Notes |
|---|---|---|---|---|---|---|
| Section shell | `<section id="activities">` | — | bg `--color-deep`, top rule `--color-line` | none | `py-[--space-section]` | `scroll-mt-[--nav-h]` so the anchor clears the sticky nav |
| Mesh layer | `::before` from `mesh-teal` | — | `--color-teal-500`, `--color-volt` | inherits, `overflow-hidden` on parent | `inset-0` | `pointer-events-none z-0`, `--mesh-strength:.35` |
| Container | grid wrapper | — | — | none | `max-w-[--container] px-[--gutter]` | `relative z-10` |
| Eyebrow | `EXPLORE` | `--text-eyebrow` | `--color-volt` | none | `mb-4` | `uppercase tracking-[0.2em] font-sans font-medium` |
| Eyebrow marker | `▸` glyph, decorative | `--text-eyebrow` | `--color-volt` | none | `mr-2` | `aria-hidden="true"` |
| Statement | `Five places to show up.` | `--text-display-l` | `--color-cream` | none | `mb-6`, `max-w-[16ch]` | `<h2>` `font-display font-semibold tracking-[-0.03em] leading-[0.92]` |
| Lead | 2-sentence lead | `--text-lead` | `--color-fg-muted` | none | `mb-10 lg:mb-12`, `max-w-[62ch]` | `leading-[1.6]` |
| Chip row | 3 buttons | — | — | none | `flex flex-wrap gap-2 md:gap-3`, `mb-8 lg:mb-12` | `role="group"` |
| Chip idle | `All` / `Sports` / `Fitness` | `--text-meta` | text `--color-fg-muted`, border `--color-line` | `bg-abyss`, `rounded-full` | `h-12 md:h-10 px-5 md:px-4` | 48px touch target on mobile |
| Chip hover | same | `--text-meta` | text `--color-cream`, border `--color-line-strong` | `bg-raised`, `rounded-full` | — | `pointer-fine:` only |
| Chip active | same | `--text-meta` | text `--color-ink` on `--color-volt` | volt fill via shared `layoutId` pill, `rounded-full` | — | `:active` → `--color-volt-600` |
| Chip count | `5` / `3` / `2` | `--text-meta` | idle `--color-fg-faint`, active `--color-ink` at 65% | none | `ml-2` | `font-display tabular-nums`; `aria-hidden` (count is in the sr-only announcer) |
| Result announcer | `Showing 5 activities` | `--text-meta` | — | `sr-only` | — | `aria-live="polite"` |
| Grid (desktop) | 5 cards | — | — | none | `lg:grid lg:grid-cols-12 lg:gap-x-6` | See Layout |
| Right stack | cards 2-n | — | — | none | `lg:col-span-5 lg:grid lg:auto-rows-fr lg:gap-4 lg:h-full` | `auto-rows-fr` divides the feature's height by n-1 — one rule, never breaks for n=1..4 |
| Feature card | `<Link>` to `/activities/:slug` | — | `bg-abyss`, border `--color-line` | `rounded-[--radius-xl] lg:rounded-[--radius-2xl]` | `lg:col-span-7`, `aspect-[4/5]` | `group relative isolate overflow-hidden card-lift` |
| Feature media | `<MediaFrame>` img | — | — | inherits card radius | `absolute inset-0` | `object-cover`, `loading="eager" fetchpriority="high"` — the ONLY eager image in the section |
| Tonal wash | flat overlay | — | `--color-void` at 30% | inherits | `inset-0` | Layer 1 of the legibility guarantee: flattens blown highlights on any photo |
| Bottom scrim | gradient | — | `--color-teal-900` → transparent | inherits | `inset-x-0 bottom-0 h-[62%]` | Layer 2. **This is the mechanism that makes bad imagery survivable** — type sits on a guaranteed dark tonal floor, so a 259×733px source or a future swap changes nothing about legibility or layout |
| Category pill | `Sports` / `Fitness` | `--text-eyebrow` | `--color-volt` on `--color-void` at 40% | `rounded-full backdrop-blur-md`, border `--color-line-volt` | `top-5 left-5 px-3 h-7` | `uppercase tracking-[0.2em]` |
| Feature name | `Basketball` | `--text-display-m` | `--color-cream` | none | `mb-3` | `<h3>` `font-display font-semibold tracking-[-0.03em] leading-[0.92]` |
| Feature description | record `description` | `--text-body` | `--color-fg-muted` | none | `mb-5`, `max-w-[42ch]` | `line-clamp-2` |
| Timing icon | `◔` clock, decorative | 14px | `--color-fg-muted` | none | `mr-2` | `aria-hidden="true"`, inline SVG, `stroke-current` |
| Timing row | `Mon · 6:00 AM – 10:00 PM` | `--text-meta` | `--color-fg-muted` | none | — | `tabular-nums`; via guarded `activityHours()` |
| Timing fallback | `Hours not listed` | `--text-meta` | `--color-fg-faint` | none | — | Renders when `timings` is empty — today `ActivityCard.tsx:52-53` and `ActivityDetailPage.tsx:77,87` read `timings[0]` unguarded and throw |
| Feature copy block | wrapper | — | — | none | `absolute inset-x-0 bottom-0 p-8 lg:p-10` | `z-2` |
| Volt hairline | `::before` on card | — | `--color-volt` | 1px, top edge, full bleed | `inset-x-0 top-0 h-px` | `opacity-0` → `1` on hover only |
| Compact card | `<Link>` | — | `bg-abyss`, border `--color-line` | `rounded-[--radius-lg]` | `aspect-[3/2] lg:aspect-auto lg:h-full` | Same `card-lift`, same overlay structure, smaller type |
| Compact media | `<MediaFrame>` img | — | — | inherits | `absolute inset-0` | `loading="lazy"`, `object-cover` |
| Compact scrim | gradient | — | `--color-teal-900` → transparent | inherits | `inset-x-0 bottom-0 h-[72%]` | Taller % because the card is shorter |
| Compact name | record `name` | `--text-title` | `--color-cream` | none | `mb-1.5` | `<h3>`, no description at this size |
| Compact copy block | wrapper | — | — | none | `absolute inset-x-0 bottom-0 p-5 lg:p-6` | — |
| Mobile rail | `<ul>` | — | — | none | `flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-[--gutter] px-[--gutter] pb-4` | `scrollbar-width:none`; `[&>li]:snap-start [&>li]:shrink-0 [&>li]:w-[82vw]` |
| Progress track | bar | — | `--color-line` | `rounded-full h-[3px]` | `mt-1 w-full` | `aria-hidden="true"` |
| Progress thumb | bar | — | `--color-volt` | `rounded-full h-[3px]` | `w-[20%]` | `motion.div`, x from `scrollXProgress` |
| All-activities link (desktop) | `All activities` | `--text-meta` | text `--color-fg`, arrow `--color-volt` | `rounded-full` border `--color-line-strong` | `mt-10 h-11 px-6`, `lg:col-start-10 lg:col-span-3 justify-self-end` | `<Link to="/activities">` |
| All-activities button (mobile) | `All activities` | `--text-body` | text `--color-fg`, arrow `--color-volt` | `rounded-[--radius-md]` border `--color-line-volt` | `mt-8 h-12 w-full` | Full-width, 48px |
| Arrow glyph | `→` | inherit | `--color-volt` | none | `ml-3` | `aria-hidden="true"`, translates 4px on hover |
| EmptyState wrapper | — | — | `bg-abyss`, border `--color-line` dashed | `rounded-[--radius-lg]` | `col-span-12 py-16 px-8 text-center` | Guard only; unreachable with current data |
| EmptyState icon | inline SVG, 28px | — | `--color-volt` | ring `--color-line-volt`, `rounded-full` | `size-14 mb-5 mx-auto` | `aria-hidden="true"` |
| EmptyState copy | one line | `--text-body` | `--color-fg-muted` | none | `mb-6`, `max-w-[38ch] mx-auto` | — |
| EmptyState action | `Clear filter` | `--text-meta` | `--color-ink` on `--color-volt` | `rounded-full` | `h-11 px-6` | Resets chip to `All` — a real working control |

**Copy**

```
EYEBROW
EXPLORE

STATEMENT (h2, --text-display-l)
Five places to show up.

LEAD
Courts, a full-size ground, an Olympic-standard pool and a strength floor
that opens at 5:00 AM. Filter by what you're here for.

CHIPS
All        5
Sports     3
Fitness    2

SR-ONLY ANNOUNCER (aria-live)
Showing 5 activities
Showing 3 activities
Showing 2 activities

CARD NAMES + DESCRIPTIONS  (verbatim from src/mock/mockActivities.ts)
Basketball — Indoor basketball courts for practice sessions and tournaments.
Football  — Full-size football ground with evening floodlights.
Swimming  — Olympic-standard swimming pool with training slots.
Gym       — Fully equipped strength and conditioning gym.
Badminton — Indoor badminton courts for casual and competitive play.

TIMING ROWS (rendered by activityHours(), formatTime under the hood)
Basketball  Mon · 6:00 AM – 10:00 PM
Football    Mon · 5:30 AM – 9:00 PM
Swimming    Mon · 6:00 AM – 8:00 PM
Gym         Mon · 5:00 AM – 11:00 PM
Badminton   Mon · 7:00 AM – 10:00 PM

TIMING FALLBACK (empty timings array)
Hours not listed

LINK
All activities

EMPTY STATE
Nothing listed under this category yet.
Clear filter

CARD LINK LABEL (sr-only suffix inside each <Link>, after the name)
View details
```

**Layout**

| Breakpoint | Composition |
|---|---|
| Desktop ≥1024 | `grid-cols-12 gap-x-6` (24px). Feature = `col-span-7`, `aspect-[4/5]` → **690×863** at container 1280 (col 78px, gap 24px). Right stack = `col-span-5 h-full grid auto-rows-fr gap-4` (16px) → 4 cards at **486×204** (n=5), 2 at **486×420** (n=3), 1 at **486×863** (n=2). One rule, no per-count branches. Compacts drop `aspect-[3/2]` at `lg` (`lg:aspect-auto lg:h-full`) and let `object-cover` crop — the frame is fixed, so a photo swap is free. All-activities link `col-start-10 col-span-3 justify-self-end`, `mt-10` |
| Tablet 768–1023 | `grid-cols-2 gap-5` (20px). Feature `col-span-2 aspect-[16/9]` → **706×397**; compacts `aspect-[3/2]` → **343×229** in a 2×2. With `n=2` the single compact is left-aligned and the right cell is negative space — intentional, no fill |
| Small 640–767 | `grid-cols-1 gap-5`. Feature `aspect-[4/5]`, compacts `aspect-[3/2]`, normal document flow. No rail |
| Mobile <640 | Horizontal rail. `flex gap-3`, each `li` `w-[82vw] shrink-0 snap-start`, all five cards `compact` at `aspect-[3/2]` (**320×213** at 390vw). Uniform ratio deliberately — a taller first card wrecks a snap rail. Rail breaks the gutter with `-mx-[--gutter] px-[--gutter]`. Progress bar directly beneath, `mt-1`. No pinned scene, no hover-dependent meaning |
| Chip row | Wraps at every width; never scrolls (3 chips fit 320px) |

**Data**

| Selector | Used for | Result |
|---|---|---|
| `getActivityCategories()` | Chip labels | `["Sports","Fitness"]` → chips are `All`, `Sports`, `Fitness`. **"Recreation" cannot be typed anywhere** — the current `ActivitiesPage.tsx` hardcodes it at line 6-11 and it always yields an empty grid |
| `getActivitiesByCategory(cat)` | Grid contents | `All` → all 5 in mock order; `Sports` → Basketball, Football, Badminton; `Fitness` → Swimming, Gym |
| `formatTime` / `formatRange` | Timing rows | Wrapped by `activityHours()`. No raw `"06:00"` reaches the DOM |
| `getOpenActivitiesNow()` | **deliberately not used here** | Every record carries a single timing with `dayOfWeek: 1` (Monday only). An "open now" dot would be wrong six days out of seven. Section ships zero live badges |

Rendered records at `All` (feature = filtered index 0):

| Slot | Record | Category | Hours |
|---|---|---|---|
| Feature | Basketball | Sports | Mon · 6:00 AM – 10:00 PM |
| Stack 1 | Football | Sports | Mon · 5:30 AM – 9:00 PM |
| Stack 2 | Swimming | Fitness | Mon · 6:00 AM – 8:00 PM |
| Stack 3 | Gym | Fitness | Mon · 5:00 AM – 11:00 PM |
| Stack 4 | Badminton | Sports | Mon · 7:00 AM – 10:00 PM |

Empty case: unreachable through the UI once chips derive from `getActivityCategories()`. `EmptyState` still ships as the guard for a data edit that empties a category, and `Clear filter` resets to `All`. Today's date (2026-08-05) has no effect on this section — no date logic runs here.

**Motion**

| Effect | Layer | Trigger | From → To | Duration | Easing | Stagger | Reduced motion |
|---|---|---|---|---|---|---|---|
| Header block reveal | Motion | `whileInView`, `once`, `margin:"-12% 0px"` | `opacity 0, y var(--reveal-y)` → `opacity 1, y 0` | `--dur-slow` | `--ease-out-quint` | 60ms (`--dur-fast`/3) across eyebrow → statement → lead | No transform; `opacity 1` at mount, zero transition |
| Card entry | Motion | `whileInView`, `once`, `margin:"-8% 0px"` | `opacity 0, y var(--reveal-y)` → `opacity 1, y 0` | `--dur-slow` | `--ease-out-quint` | 90ms (`--dur-fast`/2), feature first | Rendered visible, no transition |
| Chip pill slide | Motion | Chip selection | shared `layoutId="activity-chip"` volt fill moves between chips | `--dur-std` | `--ease-in-out-quart` | — | `layout` disabled; fill applied instantly to the new chip |
| Grid filter swap | Motion | Chip selection | out `opacity 1 → 0, scale 1 → .98`; in `opacity 0 → 1, y var(--reveal-y) → 0` | out `--dur-fast`, in `--dur-std` | `--ease-out-quint` | 60ms in | Crossfade opacity only, `--dur-fast`, no scale/translate |
| Image scale | CSS (`card-lift`) | `hover` under `(hover:hover) and (pointer:fine)` | `scale(1)` → `scale(1.04)` | `--dur-slow` | `--ease-out-quint` | — | `transition:none`, no scale |
| Card lift | CSS (`card-lift`) | same | `translateY(0)` → `translateY(calc(-1 * var(--lift)))`, `bg-abyss → bg-raised`, `border-line → border-line-strong` | `--dur-std` | `--ease-out-quint` | — | Colour change only, instant, no translate |
| Volt glow | CSS (`card-lift`) | same | `--shadow-lift` → `--shadow-lift, --shadow-glow` with `--glow-mix:11%` (40% of the token's 28%) | `--dur-std` | `--ease-out-quint` | — | Shadow applied instantly |
| Volt top hairline | CSS (`card-lift`) | same | `opacity 0` → `1` | `--dur-std` | `--ease-out-quint` | — | Instant, no fade |
| Rail progress thumb | Motion value | Rail `scroll` (`useScroll` axis x) | `x: 0%` → `400%` of thumb width | scroll-linked, no duration | linear (1:1) | — | **Kept.** Positional feedback, not decoration; tracks scroll exactly, no spring |
| Arrow nudge | CSS | link hover, `pointer-fine` | `translateX(0)` → `translateX(4px)` | `--dur-fast` | `--ease-out-quint` | — | `transition:none` |
| Focus ring | CSS (global) | `:focus-visible` | — | none | none | — | Unchanged, never suppressed |

GSAP is not used in this section. The two flagship ScrollTrigger scenes stay confined to `#focus` and `#impact`.

**Code**

Shared hover recipe — declare once, every card in the app uses it. Amend the shadow token so the 40% glow needs no bespoke `shadow-[...]`.

```css
/* src/index.css — @theme */
--glow-mix: 28%;
--shadow-glow: 0 0 44px -10px
  color-mix(in oklab, var(--color-volt) var(--glow-mix), transparent);

/* the ONE card recipe */
@utility card-lift {
  transition:
    transform var(--dur-std) var(--ease-out-quint),
    box-shadow var(--dur-std) var(--ease-out-quint),
    background-color var(--dur-std) var(--ease-out-quint),
    border-color var(--dur-std) var(--ease-out-quint);

  &::before {                       /* volt top hairline */
    content: "";
    position: absolute;
    inset-inline: 0;
    top: 0;
    height: 1px;
    z-index: 3;
    background: var(--color-volt);
    opacity: 0;
    transition: opacity var(--dur-std) var(--ease-out-quint);
  }
  & img { transition: transform var(--dur-slow) var(--ease-out-quint); }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      --glow-mix: 11%;              /* = 40% of the token's 28% */
      transform: translateY(calc(-1 * var(--lift)));
      background-color: var(--color-raised);
      border-color: var(--color-line-strong);
      box-shadow: var(--shadow-lift), var(--shadow-glow);
    }
    &:hover::before { opacity: 1; }
    &:hover img { transform: scale(1.04); }
  }
  @media (prefers-reduced-motion: reduce) {
    &, & img { transition: none; }
    &:hover, &:hover img { transform: none; }
  }
}
```

Root-cause guard — one function, all three crash sites route through it.

```ts
// src/lib/format.ts
const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/** ponytail: the single guarded timings[0] read. Fixes the throw in
 *  ActivityCard.tsx:52-53 and ActivityDetailPage.tsx:77,87 at the source —
 *  do NOT re-guard at the call sites. */
export function activityHours(a: Activity): string {
  const t = a.timings[0];
  if (!t) return "Hours not listed";
  const hours = formatRange(t.openTime, t.closeTime); // "6:00 AM – 10:00 PM"
  const prefix = t.label ?? DAY[t.dayOfWeek];
  return prefix ? `${prefix} · ${hours}` : hours;
}

/** Unsplash URLs in the mock are unsized. Never render one raw. */
export const img = (url: string, w: number) =>
  `${url}?auto=format&fit=crop&q=70&w=${w}`;
```

`ActivityCard` — both variants, one component, full class strings.

```tsx
type Props = { activity: Activity; variant: "feature" | "compact"; priority?: boolean };

const SHELL =
  "group card-lift relative isolate block overflow-hidden border border-line bg-abyss " +
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-volt";

const FRAME = {
  feature: "aspect-[4/5] rounded-[--radius-xl] lg:rounded-[--radius-2xl]",
  compact: "aspect-[3/2] rounded-[--radius-lg] lg:aspect-auto lg:h-full",
} as const;

const ActivityCard = ({ activity, variant, priority = false }: Props) => {
  const feature = variant === "feature";
  const w = feature ? 900 : 560;

  return (
    <Link to={`/activities/${activity.slug}`} className={`${SHELL} ${FRAME[variant]}`}>
      {/* MediaFrame: fixed ratio, swappable photo, zero layout shift */}
      <img
        src={img(activity.coverImageUrl, w)}
        srcSet={`${img(activity.coverImageUrl, w)} ${w}w, ${img(activity.coverImageUrl, w * 1.6)} ${w * 1.6}w`}
        sizes={feature ? "(min-width:1024px) 690px, 100vw" : "(min-width:1024px) 486px, 82vw"}
        width={w}
        height={feature ? Math.round(w * 1.25) : Math.round(w / 1.5)}
        alt=""                                  /* name is real text below */
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="absolute inset-0 size-full object-cover"
      />

      {/* legibility guarantee — flat wash + tonal scrim. Works on any photo. */}
      <span aria-hidden className="absolute inset-0 bg-void/30" />
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-900 via-teal-900/55 to-transparent ${
          feature ? "h-[62%]" : "h-[72%]"
        }`}
      />

      <span className="absolute left-5 top-5 z-2 inline-flex h-7 items-center rounded-full border border-line-volt bg-void/40 px-3 text-eyebrow font-medium uppercase tracking-[0.2em] text-volt backdrop-blur-md">
        {activity.category}
      </span>

      <div className={`absolute inset-x-0 bottom-0 z-2 ${feature ? "p-8 lg:p-10" : "p-5 lg:p-6"}`}>
        <h3
          className={`font-display font-semibold tracking-[-0.03em] leading-[0.92] text-cream ${
            feature ? "text-display-m mb-3" : "text-title mb-1.5"
          }`}
        >
          {activity.name}
          <span className="sr-only"> — View details</span>
        </h3>

        {feature && activity.description && (
          <p className="mb-5 max-w-[42ch] text-body leading-[1.6] text-fg-muted line-clamp-2">
            {activity.description}
          </p>
        )}

        <p className="flex items-center text-meta tabular-nums text-fg-muted">
          <ClockIcon aria-hidden className="mr-2 size-3.5 shrink-0" />
          {activityHours(activity)}
        </p>
      </div>
    </Link>
  );
};
```

Chips + filter state + rail progress.

```tsx
const CATS = ["All", ...getActivityCategories()] as const;   // ["All","Sports","Fitness"]
const [cat, setCat] = useState<(typeof CATS)[number]>("All");
const list = cat === "All" ? mockActivities : getActivitiesByCategory(cat);

const CHIP_BASE =
  "relative inline-flex h-12 items-center rounded-full border px-5 text-meta font-medium " +
  "transition-colors duration-[--dur-fast] ease-[--ease-out-quint] md:h-10 md:px-4";
const CHIP_IDLE  = "border-line bg-abyss text-fg-muted pointer-fine:hover:border-line-strong pointer-fine:hover:bg-raised pointer-fine:hover:text-cream";
const CHIP_ON    = "border-transparent text-ink active:bg-volt-600";

<div role="group" aria-label="Filter activities by category" className="mb-8 flex flex-wrap gap-2 md:mb-12 md:gap-3">
  {CATS.map((c) => {
    const on = c === cat;
    const n = c === "All" ? mockActivities.length : getActivitiesByCategory(c).length;
    return (
      <button key={c} type="button" aria-pressed={on} onClick={() => setCat(c)}
        className={`${CHIP_BASE} ${on ? CHIP_ON : CHIP_IDLE}`}>
        {on && (
          <motion.span layoutId="activity-chip" aria-hidden
            className="absolute inset-0 -z-1 rounded-full bg-volt"
            transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }} />
        )}
        <span className="relative">{c}</span>
        <span aria-hidden className={`relative ml-2 font-display tabular-nums ${on ? "text-ink/65" : "text-fg-faint"}`}>{n}</span>
      </button>
    );
  })}
</div>
<p aria-live="polite" className="sr-only">Showing {list.length} activities</p>
```

```tsx
// mobile rail progress — motion values only, zero React state per frame
const rail = useRef<HTMLUListElement>(null);
const { scrollXProgress } = useScroll({ container: rail, axis: "x" });
const x = useTransform(scrollXProgress, [0, 1], ["0%", `${(list.length - 1) * 100}%`]);

<ul ref={rail} className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-[--gutter] px-[--gutter] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
  {list.map((a) => (
    <li key={a.id} className="w-[82vw] shrink-0 snap-start">
      <ActivityCard activity={a} variant="compact" />
    </li>
  ))}
</ul>
<div aria-hidden className="mt-1 h-[3px] w-full overflow-hidden rounded-full bg-line lg:hidden">
  <motion.div style={{ x, width: `${100 / list.length}%` }} className="h-full rounded-full bg-volt" />
</div>
```

**A11y**

- `<section id="activities" aria-labelledby="activities-title">`; `<h2 id="activities-title">` carries the statement. Cards use `<h3>`. No heading level skipped.
- Chips are `<button type="button" aria-pressed>` inside `role="group"` with `aria-label="Filter activities by category"` — single-select, native Tab order, no roving tabindex or arrow-key contract to get wrong.
- Filter results announced by a `sr-only` `aria-live="polite"` line: `Showing 3 activities`. Chip count numerals are `aria-hidden` so screen readers hear the count once.
- Card images are `alt=""` — decorative, because the accessible name comes from the `<h3>` text inside the same link. Each link ends with `<span class="sr-only"> — View details</span>` so the link purpose is unambiguous out of context.
- Grid and rail are `<ul>`/`<li>`; the rail is keyboard-reachable by tabbing card to card (the browser scrolls each into view). Progress bar and both scrim layers are `aria-hidden`.
- Focus: global `outline: 2px solid var(--color-volt); outline-offset: 3px`, never removed. Cards are `overflow-hidden`, so the ring is declared on the `<Link>` itself with `outline-offset-[3px]` and stays visible outside the clip.
- Contrast on the scrim floor: `--color-cream` on `--color-teal-900` ≈ 11:1; `--color-fg-muted` on the same ≈ 5.1:1. `--color-fg-faint` is used only for the idle chip count and the "Hours not listed" fallback, never for a value a user must read to act.
- Hover conveys nothing: category, name and hours are always visible. Touch targets: chips 48px, mobile link 48px, cards far larger.

**Acceptance**

1. `grep -r "Recreation" src/pages/Activities src/components` returns nothing; the chip row renders exactly `All`, `Sports`, `Fitness` with counts `5`, `3`, `2`.
2. Setting `timings: []` on any record renders `Hours not listed` in the card, the rail and `/activities/:slug` — no throw at `ActivityCard.tsx:52` or `ActivityDetailPage.tsx:77,87`.
3. At 1280px the feature measures 690×863 and each of the four stacked compacts measures 486×204; selecting `Fitness` leaves one 486×863 compact with no layout gap or overflow.
4. Replacing every `coverImageUrl` with a 259×733 PNG changes no element's box dimensions, and the name, category pill and timing row all remain readable.
5. Exactly one `<img>` in the section has `loading="eager"`; every other has `loading="lazy"` and a `width`/`height` pair.
6. With `prefers-reduced-motion: reduce`, no element translates or scales on hover or on scroll into view, the volt hairline and glow still appear on hover, and the mobile progress thumb still tracks rail scroll.
7. `grep -rE "shadow-\[|#[0-9a-fA-F]{6}" ` over the section's files returns nothing; `card-lift` is the only hover recipe referenced by any card component in `src/`.

---

### Section 6 — Featured event

Full-bleed 50/50 band that puts the single most relevant featured event on the page with real date, status and venue — and tells the truth when that event has already happened.

**Canvas**

| Property | Value |
|---|---|
| Background token | `--color-abyss` (alternating band; previous section sits on `--color-void`) |
| Mesh utility | `mesh-teal` — blooms only, on the `::before`; the band's own `bg-abyss` is the base color |
| Mesh strength | `--mesh-strength: 0.32` (low — the duotone media is the section's mass, not the mesh) |
| Vertical padding | `padding-block: var(--space-section)` |
| Container behaviour | **No container.** Section is `w-full` edge-to-edge. Media cell starts at `x = 0`. The 1280 container only exists as the right column's inset: `padding-inline-end: var(--gutter)` + `max-w-[34rem]` content measure |
| Band separators | `border-t border-line` top, `border-b border-line` bottom |
| Grain | inherited from global `body::after`, nothing local |

**Wireframe**

```
DESKTOP >=1024  ·  FULL-BLEED 50/50 split, container 1280 insets the right half only
┌───────────────────────────────────────────────────────────────────────────┐
│  full-bleed  ·  no container  ·  hard split at 50vw                       │
│  1   2   3   4   5   6  │  7   8   9  10  11  12    (12-col ref only)     │
│┌───────────────────────────────────┐│                                     │
││                                   ││  ▸ LATEST RECAP  ●       sample data│
││  MediaFrame  aspect-[4/5]         ││                                     │
││  img bleeds off LEFT edge         ││  SAC Fitness                        │
││  teal duotone + left→void scrim   ││  Challenge                          │
││  radius 0 / 24 / 24 / 0           ││                                     │
││                                   ││  ─────────────────────────────────  │
││                                   ││   [cal]  Date       1 Jul 2026      │
││                                   ││  ─────────────────────────────────  │
││                                   ││   [chk]  Status     Concluded       │
││                                   ││  ─────────────────────────────────  │
││                                   ││   [pin]  Venue      SAC Gym         │
││                                   ││  ─────────────────────────────────  │
││                                   ││                                     │
││                                   ││  Campus-wide endurance and          │
││                                   ││  strength challenge.                │
││                                   ││                                     │
││                                   ││  ▛▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▘                  │
││                                   ││  ▌ Event details ▐    All events →  │
││                                   ││  ▙▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▖                  │
│└───────────────────────────────────┘│                                     │
│  ↑ x = 0 (viewport edge)            │  ↑ pl clamp(2rem,4.5vw,4.5rem)      │
│                                     │    max-w-[34rem] · pr = gutter      │
└───────────────────────────────────────────────────────────────────────────┘

MOBILE <640  ·  single column, gutter 1rem, media full-bleed both edges
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │  MediaFrame  aspect-[3/2]       │ │
│ │  edge-to-edge, radius 0         │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ▸ LATEST RECAP  ●     sample data   │
│                                     │
│ SAC Fitness                         │
│ Challenge                           │
│                                     │
│ ─────────────────────────────────── │
│  [cal] Date           1 Jul 2026    │
│ ─────────────────────────────────── │
│  [chk] Status         Concluded     │
│ ─────────────────────────────────── │
│  [pin] Venue          SAC Gym       │
│ ─────────────────────────────────── │
│                                     │
│ Campus-wide endurance and strength  │
│ challenge.                          │
│                                     │
│ ▛▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▘   │
│ ▌      Event details            ▐   │
│ ▙▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▖   │
│ ┌─────────────────────────────────┐ │
│ │        All events →             │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

The `●` glyph is the status dot: filled volt when `upcoming`, filled volt + pulse ring when `today`, hollow 1px `--color-line-strong` ring when `past`.

**Elements**

| Slot | Content | Type token | Color token | Surface/radius | Spacing | Notes |
|---|---|---|---|---|---|---|
| Section band | `<section id="events">` | — | bg `--color-abyss` | full-bleed, radius 0 | `py var(--space-section)` | `border-t`/`border-b` `--color-line`; `aria-labelledby="events-title"` |
| Mesh layer | `::before` blooms | — | `--color-teal-500`, `--color-volt` | inherits band | inset 0 | `mesh-teal`, `--mesh-strength:.32`, `filter: blur(80px)` desktop / `48px` <768; not animated |
| Media cell | grid col 1 | — | — | — | `justify-self-start`, no padding | `w-[min(50vw,43rem)]`, ratio never distorted |
| MediaFrame | `event.coverImageUrl`, `object-cover` | — | frame bg `--color-teal-900` (pre-load fill) | `rounded-r-[var(--radius-lg)]`, left corners 0 | `aspect-[4/5]` | `loading="lazy"`, explicit `width={880} height={1100}`, `decoding="async"` |
| Duotone layer | flat teal over grayscaled img | — | `color-mix(in oklab, var(--color-teal-700) 82%, transparent)` | absolute inset 0 | — | `mix-blend-color`; img gets `grayscale(1) contrast(1.06)` |
| Edge scrim | left→right gradient | — | `--color-void` → transparent at 58% | absolute inset 0 | — | melts the bleed into the band; no text sits on it |
| Bottom scrim | bottom→top gradient | — | `--color-abyss` → transparent at 34% | absolute inset 0 | — | seats the frame on the band |
| Media link | wraps frame, same target as primary CTA | — | — | inherits frame radius | — | `aria-hidden="true" tabIndex={-1}` (duplicate of primary CTA) |
| Content column | grid col 2 | — | — | — | `pl clamp(2rem,4.5vw,4.5rem)`, `pr var(--gutter)`, `max-w-[34rem]`, `self-center` | — |
| Eyebrow row | status eyebrow + dot + sample chip | — | — | — | `flex items-center gap-3`, `mb-6` (1.5rem) | — |
| Status dot | 8px circle | — | fill `--color-live` / ring `--color-line-strong` when past | `rounded-full`, 8×8 | inside gap-3 | pulse ring is a `::after`, only in `today` mode |
| Eyebrow label | `NEXT UP` / `HAPPENING TODAY` / `LATEST RECAP` | `--text-eyebrow` | `--color-volt` | — | `uppercase tracking-[0.2em]` | the only ALL CAPS string here |
| Sample-data chip | `Sample data` | `--text-meta` | `--color-fg-faint`, border `--color-line` | `rounded-full`, `border` 1px | `px-2.5 py-1`, `ml-auto` (desktop) / inline (mobile) | mandatory mock label |
| Title | `event.title` | `--text-display-l` | `--color-cream` | — | `mb-0` | `font-display font-semibold tracking-[-0.03em] leading-[0.92]`; `id="events-title"`, `<h2>` |
| Meta list | `<dl>` of 3 rows | — | — | `border-b border-line` on list | `mt-10` (2.5rem) | each row `border-t border-line` |
| Meta row | icon + `<dt>` + `<dd>` | — | — | — | `py-4` (1rem), `grid grid-cols-[1.25rem_5.5rem_1fr] items-center gap-x-4` | min row height 3.25rem |
| Row icon (date) | lucide `CalendarDays` | 16px, stroke 1.5 | `--color-volt` | — | — | `aria-hidden` |
| Row icon (status) | lucide `Clock3` / `Radio` / `CircleCheck` per mode | 16px, stroke 1.5 | `--color-volt` | — | — | `aria-hidden` |
| Row icon (venue) | lucide `MapPin` | 16px, stroke 1.5 | `--color-volt` | — | — | `aria-hidden` |
| Row labels | `Date` / `Status` / `Venue` | `--text-eyebrow` | `--color-fg-faint` | — | `uppercase tracking-[0.2em]` | `<dt>` |
| Date value | `formatDate(startDate)` → `1 Jul 2026` | `--text-body` | `--color-fg` | — | — | wrapped in `<time dateTime={startDate}>` |
| Status value | `Upcoming` / `Happening today` / `Concluded` | `--text-body` | `--color-fg` (`--color-live` when `today`) | — | — | replaces a clock time — mock events carry no time field, so none is invented |
| Venue value | `event.venue` | `--text-body` | `--color-fg` | — | — | row omitted entirely if `venue` is undefined |
| Description | `event.description` | `--text-lead` | `--color-fg-muted` | — | `mt-8` (2rem), `max-w-[54ch]` | — |
| CTA row | primary + ghost | — | — | — | `mt-10` (2.5rem), `flex items-center gap-4` | — |
| Primary CTA | `Event details` → `/events/:slug` | `--text-body` (`font-sans font-medium`) | bg `--color-volt`, text `--color-ink` | `rounded-[var(--radius-sm)]` | `h-12 px-6` | `<Link>`; hover `--shadow-glow`; active bg `--color-volt-600` |
| Ghost CTA | `All events` + `ArrowRight` 16px | `--text-body` | text `--color-fg`, border `--color-line-strong`, icon `--color-volt` | `rounded-[var(--radius-sm)]`, `border` 1px | `h-12 px-5`, icon `ml-2` | hover bg `--color-raised`, border `--color-line-volt` |
| Empty state (no events at all) | eyebrow + headline + ghost CTA | `--text-display-m` heading | `--color-cream` heading, `--color-fg-muted` body | no media cell, single column | `py var(--space-section)`, `max-w-[48ch]` | band stays mounted so the `#events` anchor never dangles |
| Focus ring, all links | — | — | `--color-volt` | — | `outline 2px`, `outline-offset 3px` | global rule, not re-declared |

**Copy**

```
EYEBROW (mode = past, the state that renders today 2026-08-05)
LATEST RECAP

EYEBROW (mode = today)
HAPPENING TODAY

EYEBROW (mode = upcoming)
NEXT UP

MOCK LABEL CHIP (all modes)
Sample data

TITLE (from data, verbatim)
SAC Fitness Challenge

META ROW LABELS
Date
Status
Venue

STATUS VALUES
Concluded          (mode = past)
Happening today    (mode = today)
Upcoming           (mode = upcoming)

DESCRIPTION (from data, verbatim)
Campus-wide endurance and strength challenge.

PRIMARY CTA
Event details

GHOST CTA
All events

EMPTY STATE (mockEvents is empty)
eyebrow:   EVENTS
headline:  Nothing on the board yet.
body:      The next fixture goes up here the moment it is scheduled.
ghost CTA: All events

MEDIA ALT TEXT
SAC Fitness Challenge at SAC Gym

SCREEN-READER-ONLY PREFIX ON THE MOCK CHIP
Sample data: this event is placeholder content.
```

**Layout**

| Width | Structure |
|---|---|
| **≥1024 (desktop)** | `grid grid-cols-2 gap-0 items-center`. Col 1: media, `justify-self-start`, `w-[min(50vw,43rem)] aspect-[4/5]` (max 688 × 860). Col 2: `self-center`, `pl clamp(2rem,4.5vw,4.5rem)`, `pr var(--gutter)`, content `max-w-[34rem]`. Above ~1376 the media stops growing and the surplus becomes negative space between frame and copy — intended. |
| **768–1023 (tablet)** | Stacked, 1 col, `gap-10` (2.5rem). Media full-bleed `w-full aspect-[16/10]`, `radius 0`. Content block `px var(--gutter)`, `max-w-[46rem]`. Meta rows stay vertical. CTA row stays horizontal. |
| **<768 → <640 (mobile)** | Stacked, 1 col, `gap-8` (2rem). Media `w-full aspect-[3/2]`, edge-to-edge, `radius 0`. Content `px-4`. Eyebrow row wraps, chip drops to its own line (`ml-auto` removed below `sm`). Title clamps at `--text-display-l` lower bound. Meta rows `grid-cols-[1.25rem_1fr_auto]` with value right-aligned, `py-4`, min height 3.25rem. CTAs stack full-width `w-full h-12`, `gap-3`. No pinned scene, no hover-only meaning. |

Media height at 1440 viewport: 688 × 1.25 = 860. Band min-height = 860 + 2 × `--space-section`.

**Data**

```ts
// src/lib/content.ts
export type EventStatus = "upcoming" | "today" | "past";

const todayISO = () => new Date().toISOString().slice(0, 10);

// YYYY-MM-DD compares correctly as a string — no Date parsing, no timezone drift.
export function getEventStatus(e: Event, today = todayISO()): EventStatus {
  if (e.startDate > today) return "upcoming";
  return (e.endDate ?? e.startDate) < today ? "past" : "today";
}

export function getFeaturedEvent(today = todayISO()): Event | null {
  const byDate = [...mockEvents].sort((a, b) => a.startDate.localeCompare(b.startDate));
  const featured = byDate.filter((e) => e.isFeatured);
  // ponytail: no isFeatured set anywhere -> nearest event still fills the band
  const pool = featured.length ? featured : byDate;
  return pool.find((e) => e.startDate >= today) ?? pool.at(-1) ?? null;
}
```

| Question | Answer against ground truth |
|---|---|
| Selectors used | `getFeaturedEvent()`, `getEventStatus()`, `formatDate()` |
| Featured pool | `interbits-football` 2026-06-12, `fitness-challenge` 2026-07-01 — both `isFeatured: true` |
| Old bug | `src/pages/Events/EventsPage.tsx:8` uses `.find((event) => event.isFeatured)` on unsorted data, so it always returns `interbits-football` and silently drops the second featured record. The sort + upcoming-first pick replaces it. |
| **Rendered today (2026-08-05)** | No featured event has `startDate >= 2026-08-05`, so `pool.at(-1)` wins: **SAC Fitness Challenge**, `fitness-challenge`, 2026-07-01, SAC Gym. Mode = `past`. |
| What `past` mode renders | Eyebrow `LATEST RECAP`, hollow ring dot (no pulse), status row `Concluded`, primary CTA `Event details` → `/events/fitness-challenge`. Nothing anywhere claims it is upcoming, next, or live. |
| `swimming-championship` | 2026-08-05, `isFeatured: false` — **not** rendered here. It is `today` by status but the featured pool is non-empty, so it never enters this band. It belongs to Section 5 / `/events`. |
| Time of day | No `Event` field carries a clock time and no record has `endDate`. The middle row is therefore Status, never a fabricated time. |
| Venue missing | Row is omitted; the `<dl>` renders 2 rows. Never `TBA`. |
| Empty case | `getFeaturedEvent()` returns `null` only when `mockEvents` is empty. Band stays mounted (nav anchor `#events` must resolve), media cell and `<dl>` are not rendered, single-column empty state + ghost `All events` CTA. |

**Motion**

| Effect | Layer | Trigger | From → To | Duration | Easing | Stagger | Reduced motion |
|---|---|---|---|---|---|---|---|
| Media reveal | Motion | `whileInView`, `once: true`, `margin: "-12% 0px"` | `opacity 0, scale 1.06` → `opacity 1, scale 1` | `--dur-hero` | `--ease-out-quint` | — | opacity only, `--dur-fast`, no scale |
| Content stagger | Motion (parent variants) | `whileInView`, `once: true`, `margin: "-15% 0px"` | children `opacity 0, y var(--reveal-y)` → `opacity 1, y 0` | `--dur-std` | `--ease-out-quint` | `0.09s` (= 0.5 × `--dur-fast`), 6 children: eyebrow row, title, dl, description, primary, ghost | opacity only, stagger 0, `--dur-fast` |
| Meta row hairlines | CSS | none | static `border-t --color-line` | — | — | — | unchanged (no animation to disable) |
| Status pulse ring | CSS keyframes | `mode === "today"` **and** section `data-inview="true"` | `scale 1 → 2.2`, `opacity .55 → 0` | `--dur-hero` (infinite) | `--ease-out-quint` | — | `animation: none`; dot renders as a solid volt disc |
| Offscreen pause | Motion `useInView` → `data-inview` attr | scroll | `animation-play-state: running ↔ paused` | — | — | — | irrelevant — animation already off |
| Media hover zoom | CSS on `.group:hover img` (≥1024, `hover: hover` only) | pointer hover on media link | `scale 1 → 1.03` | `--dur-slow` | `--ease-out-quint` | — | no transform |
| Duotone lift on hover | CSS | same hover | duotone `opacity .82 → .68` | `--dur-slow` | `--ease-out-quint` | — | no change |
| Primary CTA hover | CSS | hover | `translateY 0 → calc(-1 * var(--lift))`, `box-shadow none → var(--shadow-glow)` | `--dur-fast` | `--ease-out-quint` | — | shadow only, no translate |
| Primary CTA press | CSS | `:active` | `bg --color-volt → --color-volt-600`, `translateY 0` | `--dur-fast` | `--ease-out-quint` | — | unchanged |
| Ghost CTA hover | CSS | hover | `bg transparent → --color-raised`, arrow `translateX 0 → 4px` | `--dur-fast` | `--ease-out-quint` | — | background only, arrow static |

No GSAP in this section. The two GSAP scenes are `#focus` and `#impact` only.

**Code**

```tsx
// src/components/sections/FeaturedEventSection.tsx
const event = getFeaturedEvent();
const mode = event ? getEventStatus(event) : null;

const EYEBROW = { upcoming: "NEXT UP", today: "HAPPENING TODAY", past: "LATEST RECAP" } as const;
const STATUS  = { upcoming: "Upcoming", today: "Happening today", past: "Concluded" } as const;
const STATUS_ICON = { upcoming: Clock3, today: Radio, past: CircleCheck } as const;

const ref = useRef<HTMLElement>(null);
const inView = useInView(ref, { margin: "-15% 0px" });   // drives data-inview for the pulse only
```

```tsx
<section
  id="events"
  ref={ref}
  data-inview={inView}
  aria-labelledby="events-title"
  className="mesh-teal [--mesh-strength:0.32] relative w-full border-y border-line bg-abyss
             py-[var(--space-section)]"
>
  <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-0">

    {/* media — bleeds off the left viewport edge */}
    <Link to={`/events/${event.slug}`} aria-hidden tabIndex={-1}
      className="group relative block w-full overflow-hidden aspect-[3/2] md:aspect-[16/10]
                 lg:w-[min(50vw,43rem)] lg:aspect-[4/5] lg:justify-self-start
                 lg:rounded-r-[var(--radius-lg)] bg-teal-900">
      <img src={`${event.coverImageUrl}?auto=format&fit=crop&w=880&q=70`}
           alt={`${event.title} at ${event.venue}`} width={880} height={1100}
           loading="lazy" decoding="async"
           className="h-full w-full object-cover [filter:grayscale(1)_contrast(1.06)]
                      transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out-quint)]
                      motion-safe:lg:group-hover:scale-[1.03]" />
      <span className="pointer-events-none absolute inset-0 mix-blend-color opacity-[0.82]
                       transition-opacity duration-[var(--dur-slow)] ease-[var(--ease-out-quint)]
                       lg:group-hover:opacity-[0.68]
                       bg-[color-mix(in_oklab,var(--color-teal-700)_82%,transparent)]" />
      <span className="pointer-events-none absolute inset-0
        bg-[linear-gradient(90deg,var(--color-void)_0%,color-mix(in_oklab,var(--color-void)_45%,transparent)_28%,transparent_58%)]" />
      <span className="pointer-events-none absolute inset-0
        bg-[linear-gradient(0deg,var(--color-abyss)_0%,transparent_34%)]" />
    </Link>

    {/* copy — inset to the container gutter */}
    <motion.div
      initial="rest" whileInView="in" viewport={{ once: true, margin: "-15% 0px" }}
      variants={{ in: { transition: { staggerChildren: 0.09 } } }}
      className="px-4 md:px-[var(--gutter)] lg:max-w-[34rem] lg:self-center
                 lg:pl-[clamp(2rem,4.5vw,4.5rem)] lg:pr-[var(--gutter)] lg:px-0">

      <motion.div variants={reveal} className="mb-6 flex flex-wrap items-center gap-3">
        <span data-mode={mode} className="status-dot" />
        <span className="text-eyebrow font-sans uppercase tracking-[0.2em] text-volt">
          {EYEBROW[mode]}
        </span>
        <span className="rounded-full border border-line px-2.5 py-1 text-meta text-fg-faint sm:ml-auto">
          <span className="sr-only">Sample data: this event is placeholder content.</span>
          <span aria-hidden>Sample data</span>
        </span>
      </motion.div>

      <motion.h2 variants={reveal} id="events-title"
        className="font-display text-display-l font-semibold leading-[0.92] tracking-[-0.03em] text-cream">
        {event.title}
      </motion.h2>

      <motion.dl variants={reveal} className="mt-10 border-b border-line">
        <MetaRow icon={CalendarDays} label="Date">
          <time dateTime={event.startDate}>{formatDate(event.startDate)}</time>
        </MetaRow>
        <MetaRow icon={STATUS_ICON[mode]} label="Status">
          <span className={mode === "today" ? "text-live" : undefined}>{STATUS[mode]}</span>
        </MetaRow>
        {event.venue && <MetaRow icon={MapPin} label="Venue">{event.venue}</MetaRow>}
      </motion.dl>

      <motion.p variants={reveal} className="mt-8 max-w-[54ch] text-lead text-fg-muted">
        {event.description}
      </motion.p>

      <motion.div variants={reveal} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Link to={`/events/${event.slug}`}
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-sm)] bg-volt px-6
                     text-body font-medium text-ink transition-[transform,box-shadow]
                     duration-[var(--dur-fast)] ease-[var(--ease-out-quint)]
                     hover:shadow-[var(--shadow-glow)] motion-safe:hover:-translate-y-[var(--lift)]
                     active:translate-y-0 active:bg-volt-600">
          Event details
        </Link>
        <Link to="/events"
          className="group inline-flex h-12 items-center justify-center rounded-[var(--radius-sm)]
                     border border-line-strong px-5 text-body text-fg
                     transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-quint)]
                     hover:border-line-volt hover:bg-raised">
          All events
          <ArrowRight aria-hidden className="ml-2 size-4 text-volt transition-transform
                     duration-[var(--dur-fast)] ease-[var(--ease-out-quint)]
                     motion-safe:group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.div>
  </div>
</section>
```

```tsx
// MetaRow — local, not exported; only this section uses it
function MetaRow({ icon: Icon, label, children }: MetaRowProps) {
  return (
    <div className="grid min-h-[3.25rem] grid-cols-[1.25rem_1fr_auto] items-center gap-x-4
                    border-t border-line py-4 lg:grid-cols-[1.25rem_5.5rem_1fr]">
      <Icon aria-hidden className="size-4 text-volt" strokeWidth={1.5} />
      <dt className="text-eyebrow uppercase tracking-[0.2em] text-fg-faint">{label}</dt>
      <dd className="text-right text-body text-fg lg:text-left">{children}</dd>
    </div>
  );
}
```

```ts
// src/lib/format.ts — "1 Jul 2026"
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN",
    { day: "numeric", month: "short", year: "numeric" });
```

```css
/* src/index.css */
.status-dot { position: relative; inline-size: .5rem; block-size: .5rem; border-radius: 9999px; }
.status-dot[data-mode="past"]     { background: transparent; box-shadow: inset 0 0 0 1px var(--color-line-strong); }
.status-dot[data-mode="upcoming"],
.status-dot[data-mode="today"]    { background: var(--color-live); }
.status-dot[data-mode="today"]::after {
  content: ""; position: absolute; inset: -2px; border-radius: 9999px;
  background: var(--color-live);
  animation: dot-pulse var(--dur-hero) var(--ease-out-quint) infinite;
}
[data-inview="false"] .status-dot::after { animation-play-state: paused; }
@keyframes dot-pulse { from { transform: scale(1); opacity: .55 } to { transform: scale(2.2); opacity: 0 } }
@media (prefers-reduced-motion: reduce) { .status-dot::after { animation: none; opacity: 0 } }
```

`reveal` variants come from `src/lib/motion.ts` (shared): `{ rest: { opacity: 0, y: 24 }, in: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22,1,0.36,1] } } }`, with a reduced-motion branch that drops `y` and uses `0.18`.

**A11y**

- `<section id="events" aria-labelledby="events-title">`; the `<h2 id="events-title">` is the event title, so the accessible section name is the event itself.
- Meta rows are a real `<dl>` with `<dt>`/`<dd>`; the date is a `<time dateTime="2026-07-01">`, never a raw ISO string in visible text.
- The media link duplicates the primary CTA target, so it is `aria-hidden="true" tabIndex={-1}` — one stop in the tab order per destination. Tab order: primary CTA → ghost CTA.
- All three row icons and the arrow are `aria-hidden`; status is conveyed by text (`Concluded`), never by dot color alone.
- Mock label has a `sr-only` long form ("Sample data: this event is placeholder content.") so screen-reader users are not left thinking the fixture is live.
- `alt` is `"{title} at {venue}"` — descriptive, never "image" or the filename. Falls back to the title alone if `venue` is absent.
- Focus: global ring `outline 2px solid var(--color-volt); outline-offset 3px`. The 3px offset keeps the ring visible against both `--color-abyss` and the `--color-volt` CTA fill.
- Contrast: `--color-cream` on `--color-abyss` ≈ 15:1; `--color-fg` on `--color-abyss` ≈ 16:1; `--color-fg-muted` on `--color-abyss` ≈ 7:1; `--color-fg-faint` used only at `--text-meta`/`--text-eyebrow` ≈ 3.6:1 — meta tier, non-essential duplication of adjacent values; `--color-ink` on `--color-volt` ≈ 15:1.
- Touch targets: CTAs `h-12` (48px), full-width on mobile; meta rows `min-h-[3.25rem]` but non-interactive.
- No hover-only information at any width; the duotone and zoom are decorative.

**Acceptance**

1. On 2026-08-05 the band renders **SAC Fitness Challenge / 1 Jul 2026 / Concluded / SAC Gym**, and the strings `NEXT UP`, `HAPPENING TODAY`, `Upcoming` appear nowhere in the rendered DOM.
2. `getFeaturedEvent()` returns `fitness-challenge` (the later of the two featured records), not `interbits-football`; asserting with `today = "2026-06-01"` returns `interbits-football` and with `today = "2026-06-20"` returns `fitness-challenge`.
3. No clock time is rendered anywhere in the section, and no `venue`/date fallback string such as "TBA" exists in the source.
4. At ≥1024 the media's computed `left` is `0px`, its width is `min(50vw, 688px)` and its computed aspect ratio is exactly 0.8; at <640 the media is `100vw` wide with aspect 1.5 and the content is a single column.
5. Every animated property in the section is `transform`, `opacity` or `filter`; DevTools shows zero layout-triggering animated properties and zero React state updates during scroll.
6. With `prefers-reduced-motion: reduce` the dot has no `::after` animation, no element translates or scales, and all reveals are opacity-only at `--dur-fast`.
7. Setting `mockEvents = []` still renders the `#events` band with the headline "Nothing on the board yet." and a working `All events` link — no blank band, no console error, no broken nav anchor.

---

### Section 7 — People behind the pulse

Four faces, one tonal treatment, two working contact links — proof that SAC is run by people you can actually reach.

**Canvas**

| Property | Value |
|---|---|
| Background token | `--color-void` |
| Mesh utility | `mesh-teal` (teal-500 bloom upper-right, volt bloom mid-left) |
| `--mesh-strength` | `0.3` — lowest in the page; four teal-toned portraits already carry the hue, a strong mesh would double-dose it |
| Bloom layer | `::before`, `filter: blur(80px)` desktop / `blur(48px)` <768, never animated |
| Vertical padding | `padding-block: var(--space-section)` → `clamp(5rem,11vh,9rem)` |
| Top edge | `border-top: 1px solid var(--color-line)` (full-bleed, sits above the mesh) |
| Container | `max-inline-size: var(--container)` (1280), `padding-inline: var(--gutter)`, `margin-inline: auto`; content never full-bleed |
| Grain | global `body::after` only — no per-card grain, no per-card blur |

**Wireframe**

DESKTOP >=1024  ·  12-col grid, container 1280, gutter clamp(1rem,4vw,2.5rem)
```
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2   3  │  4   5   6  │  7   8   9  │ 10  11  12                      │
│ ▸ THE PEOPLE                                                              │
│                                                                           │
│  Someone unlocks the gym        Two faculty in-charges and two            │
│  at 5 a.m.                      student secretaries run the               │
│                                 SAC.       ← lead, cols 9-12              │
│ ────────────────────────────────────────────────────────────────────────  │
│ ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐│
│ │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓││
│ │▓ portrait 3/4▓│  │▓ portrait 3/4▓│  │▓ portrait 3/4▓│  │▓ portrait 3/4▓││
│ │▓ duotone .25 ▓│  │▓ duotone .25 ▓│  │▓ duotone .25 ▓│  │▓ duotone .25 ▓││
│ │▓  scrim ↓    ▓│  │▓  scrim ↓    ▓│  │▓  scrim ↓    ▓│  │▓  scrim ↓    ▓││
│ │▓[IN-CHARGE]  ▓│  │▓[IN-CHARGE]  ▓│  │▓(COMMITTEE)  ▓│  │▓(COMMITTEE)  ▓││
│ ├───────────────┤  ├───────────────┤  ├───────────────┤  ├───────────────┤│
│ │ 01 / 04       │  │ 02 / 04       │  │ 03 / 04       │  │ 04 / 04       ││
│ │ Dr. Rajesh    │  │ Dr. Priya     │  │ Arjun         │  │ Ananya        ││
│ │ Kumar         │  │ Sharma        │  │ Mehta         │  │ Verma         ││
│ │ Faculty       │  │ Assistant     │  │ Sports        │  │ Joint Sports  ││
│ │ In-Charge     │  │ Faculty In-Ch │  │ Secretary     │  │ Secretary     ││
│ │ Dept. of Mech │  │ Dept. of CS   │  │ B.E. Comp Sci │  │ B.E. Electron ││
│ │ ───────────── │  │ ───────────── │  │ ───────────── │  │ ───────────── ││
│ │ Email   Call  │  │ Email   Call  │  │ Email   Call  │  │ Email   Call  ││
│ └───────────────┘  └───────────────┘  └───────────────┘  └───────────────┘│
│                                                                           │
│ Portraits are placeholders               Meet everyone  →                 │
│                                          ─────────────────                │
└───────────────────────────────────────────────────────────────────────────┘
```

MOBILE <640  ·  single column, gutter 1rem, horizontal card (frame left / text right)
```
┌─────────────────────────┐
│ ▸ THE PEOPLE            │
│ Someone unlocks the     │
│ gym at 5 a.m.           │
│                         │
│ Two faculty in-         │
│ charges and two         │
│ student secretaries     │
│ run the SAC.            │
│ ─────────────────────── │
│ ┌───────┐ 01 / 04       │
│ │▓▓▓▓▓▓▓│ Dr. Rajesh    │
│ │▓ 3/4 ▓│ Faculty       │
│ │▓ tone▓│ Dept. of      │
│ │▓▓▓▓▓▓▓│ [IN-CHARGE]   │
│ └───────┘               │
│ ┌───────────────────┐   │
│ │ Email       48px  │   │
│ ├───────────────────┤   │
│ │ Call        48px  │   │
│ └───────────────────┘   │
│ ······················· │
│ ┌───────┐ 03 / 04       │
│ │▓▓▓▓▓▓▓│ Arjun Mehta   │
│ │▓ 3/4 ▓│ Sports Sec.   │
│ │▓ tone▓│ B.E. CS       │
│ │▓▓▓▓▓▓▓│ (COMMITTEE)   │
│ └───────┘               │
│ ┌───────────────────┐   │
│ │ Email       48px  │   │
│ ├───────────────────┤   │
│ │ Call        48px  │   │
│ └───────────────────┘   │
│ ⋮  cards 02 + 04        │
│                         │
│ ┌───────────────────┐   │
│ │ Meet everyone  →  │   │
│ └───────────────────┘   │
│ Portraits are           │
│ placeholders            │
└─────────────────────────┘
```

**Elements**

| Slot | Content | Type token | Color token | Surface/radius | Spacing | Notes |
|---|---|---|---|---|---|---|
| section | `<section id="people" aria-labelledby="people-heading">` | — | bg `--color-void` | none | `py: --space-section` | `relative isolate overflow-clip` so the mesh bloom can't paint outside |
| mesh bloom | decorative `::before` | — | `--color-teal-500` + `--color-volt` stops | inherits, no radius | `inset-0` | `--mesh-strength:.3`, `blur(80px)`, `pointer-events:none`, `aria-hidden` implicit |
| top rule | 1px full-bleed hairline | — | `--color-line` | none | at `padding-block-start` edge | solid line, never rgba |
| eyebrow rule | 24×1px lead-in dash | — | `--color-volt` | none | `mr-3`, vertically centred to cap height | inline-block, `aria-hidden="true"` |
| eyebrow | `THE PEOPLE` | `--text-eyebrow` | `--color-volt` | none | `uppercase tracking-[0.2em]` | only all-caps string in the section besides badges |
| statement | `Someone unlocks the gym at 5 a.m.` | `--text-display-l` | `--color-cream` | none | `mt-5`, cols 1-7 | `font-display font-semibold tracking-[-0.03em] leading-[0.92]` |
| lead | 2-sentence paragraph | `--text-lead` | `--color-fg-muted` | none | cols 9-12, `self-end`, `max-w-[62ch]` | baseline-parked against the statement's last line |
| header rule | 1px hairline, container width | — | `--color-line` | none | `mt-16` above, `pb-12` below | separates header block from the grid |
| card | `<article>` per person | — | bg `--color-deep`, border `--color-line` | `--radius-lg` (24px), `overflow-hidden` | `p-0`; body `p-6` | not a link — no person detail route exists; only the two contact links are interactive |
| card hover | raised state | — | bg `--color-raised`, border `--color-line-strong` | same | `translateY(-4px)` = `--lift` | `--shadow-lift`; system recipe only, no bespoke shadow |
| MediaFrame | `<figure>` portrait frame | — | fallback bg `--color-deep` | `rounded-none` (card clips it), `aspect-[3/4]` | flush to card top/left/right | `isolation:isolate` so `mix-blend-mode` can't reach the global grain |
| portrait img | `person.photoUrl` | — | n/a (image) | inherits frame | `object-cover`, `object-position 50% 18%` | `loading="lazy" decoding="async"`, sized via Unsplash params; head-safe crop is identical for all four |
| duotone tone | decorative `<span>` | — | `--color-teal-900` | `absolute inset-0`, z-1 | — | `mix-blend-mode:color; opacity:.25` — the unifier (see Code) |
| scrim | decorative `<span>` | — | `--color-void` gradient to transparent | `absolute inset-0`, z-2 | — | bottom 26% tonal scrim; makes the badge legible over any photo |
| frame hairline | inset 1px edge | — | `--color-line-strong` | `inset-0`, z-3 | — | `outline: 1px solid; outline-offset:-1px`; keeps the frame reading as a frame on light photos |
| badge · INCHARGE | `IN-CHARGE` | `--text-eyebrow` | text `--color-ink` on `--color-volt` | `rounded-full`, `px-2.5 py-1` | `absolute bottom-4 left-4`, z-4 | filled = staff authority |
| badge · COMMITTEE | `COMMITTEE` | `--text-eyebrow` | text `--color-cream-dim`, bg `--color-void`, border `--color-line-volt` | `rounded-full`, `px-2.5 py-1` | same slot | outlined = student; fill-vs-outline is the whole distinction, no new colour invented |
| index counter | `01 / 04` | `--text-meta` | `--color-fg-faint` | none | first line of card body | `font-display tabular-nums`; denominator = cards shown, not people in DB |
| name | `person.name` | `--text-title` | `--color-cream` | none | `mt-3` | `font-display font-semibold tracking-[-0.03em] leading-[1.05]`; `<h3>` |
| designation | `person.designation` | `--text-meta` | `--color-fg-muted` | none | `mt-1.5` | never truncated — it is the job |
| department | `person.department` | `--text-meta` | `--color-fg-faint` | none | `mt-3`, `line-clamp-2` | escalates to `--color-fg-muted` on card hover/`focus-within`; see A11y note |
| contact rule | 1px hairline, body width | — | `--color-line` | none | `mt-5` | inside `p-6`, so it stops short of the card edge |
| email link | `Email` → `mailto:` | `--text-meta` | `--color-fg-muted` → `--color-volt` | none, `min-h-[48px]` on <640 | `mt-4`, row `gap-6` | `underline decoration-1 underline-offset-4 decoration-[--color-line-volt]`; full address in `aria-label` |
| mail icon | lucide `Mail` | `size-4` | `--color-fg-faint` → `--color-volt` | none | `mr-2` | `aria-hidden="true"`, `stroke-width 1.5` |
| contact divider | 12×1px vertical rule | — | `--color-line-strong` | none | between the two links, `mx-1` | desktop only; hidden <640 where links are stacked rows |
| phone link | `Call` → `tel:` | `--text-meta` | `--color-fg-muted` → `--color-volt` | none, `min-h-[48px]` on <640 | same row | spaces stripped from the stored number for the href |
| phone icon | lucide `Phone` | `size-4` | `--color-fg-faint` → `--color-volt` | none | `mr-2` | `aria-hidden="true"` |
| placeholder note | `Portraits are placeholders…` | `--text-meta` | `--color-fg-faint` | none | `mt-12`, cols 1-6 | required mock label — these are stock faces, not these people |
| section CTA | `Meet everyone →` to `/people` | `--text-meta` uppercase `tracking-[0.2em]` | `--color-cream` → `--color-volt` | none, `py-3` (<640: `min-h-[48px]` full-width) | cols 9-12, right-aligned | ghost link, not a button — the page's one primary CTA lives in Section 10 |
| CTA underline | 1px hairline under the CTA | — | `--color-line-volt` → `--color-volt` | none | `mt-2`, width = text | `scaleX` from `origin-left` on hover |
| CTA arrow | lucide `ArrowRight` | `size-4` | inherits CTA colour | none | `ml-2` | `aria-hidden="true"`; shifts +4px on hover |
| focus ring | global | — | `--color-volt` | `outline 2px`, `offset 3px` | — | applies to 9 focusables; never removed, never restyled locally |

**Copy**

```
EYEBROW
THE PEOPLE

STATEMENT (h2)
Someone unlocks the gym at 5 a.m.

LEAD
Two faculty in-charges and two student secretaries run the Student
Activity Centre — bookings, fixtures, equipment, and the paperwork
nobody sees. Their inboxes are open.

ROLE BADGES
IN-CHARGE
COMMITTEE

CARD FIELDS (verbatim from mock data, no rewriting)
01 / 04   Dr. Rajesh Kumar   Faculty In-Charge             Department of Mechanical Engineering
02 / 04   Dr. Priya Sharma   Assistant Faculty In-Charge   Department of Computer Science
03 / 04   Arjun Mehta        Sports Secretary              B.E. Computer Science
04 / 04   Ananya Verma       Joint Sports Secretary        B.E. Electronics

CONTACT LINKS (visible label / accessible name)
Email  →  aria-label: "Email Dr. Rajesh Kumar at rajesh.kumar@goa.bits-pilani.ac.in"
Call   →  aria-label: "Call Dr. Rajesh Kumar at +91 9876543210"

IMAGE ALT (pattern)
Dr. Rajesh Kumar — placeholder portrait

PLACEHOLDER NOTE
Portraits are placeholder stock images until the SAC photo shoot lands.

SECTION CTA
Meet everyone            (when 4 or fewer people exist)
Meet all 6               (when more than 4 exist — the number is people.length)

SECTION HEADING FOR SCREEN READERS (visually the statement, id="people-heading")
Someone unlocks the gym at 5 a.m.
```

**Layout**

| Breakpoint | Header | Grid | Gaps | Frame ratio |
|---|---|---|---|---|
| ≥1280 | `grid-cols-12`; statement `col-span-7`, lead `col-start-9 col-span-4 self-end` | `grid-cols-12`, each card `col-span-3` → 282px card at 1280 container | `gap-x-6` (24px), `gap-y-10` (40px); header→rule `mt-16`, rule→grid `pt-12`, grid→footer `mt-12` | `3/4` → 282×376 |
| 1024–1279 | same | same, card ≈ 226–282px | same | `3/4` |
| 768–1023 (md) | statement `col-span-8`, lead `col-span-12 mt-6` (drops under) | `grid-cols-2`, card `col-span-1` → ≈340px | `gap-x-5` (20px), `gap-y-8` (32px) | `3/4` → 340×453 |
| 640–767 (sm) | stacked | `grid-cols-2` | `gap-x-4 gap-y-6` | `3/4` |
| <640 | single column, gutter 1rem; statement then lead, `mt-4` between | separate composition: 1-col list of **horizontal** cards — frame `w-[38%] max-w-[9.5rem]` left, text column right, contact links become two stacked full-width 48px rows below the card body | row `gap-y-6`, hairline `·····` divider between cards, card internal `p-4` | `3/4` (≈144×192) |

Mobile is a horizontal card, not a shrunken 2×2 grid: a 2-up grid at 360px leaves ~158px of text column, which forces the email/phone rows into icon-only buttons and drops the address entirely. Horizontal cards keep both contact links as labelled 48px rows and keep the 3/4 frame intact. No hover meaning, no pinned scene, no rail.

Grid honesty with any record count — one rule, no special cases: cards are always `col-span-3` (max four per row) and the grid never stretches or centres.

| Records | What renders | Trailing columns |
|---|---|---|
| 4 (today) | exactly one full row, no filler | none — the row is complete, which is why 4-up is the right choice for this data |
| 5+ | first 4 after role sort; CTA label becomes `Meet all {n}` | none |
| 3 | 3 cards in cols 1-9 | cols 10-12 stay empty; negative space, no stretched card, no ghost placeholder |
| 2 | 2 cards in cols 1-6 | cols 7-12 empty |
| 1 | 1 card in cols 1-3 | cols 4-12 empty |
| 0 | section returns `null` | a "People" heading with no people is a lie |

**Data**

```ts
// src/lib/content.ts
const incharges = getPeopleByRole("INCHARGE");   // 2
const committee = getPeopleByRole("COMMITTEE");  // 2
const total   = incharges.length + committee.length;          // 4
const preview = [...incharges, ...committee].slice(0, 4);     // role-sorted, deterministic
if (!total) return null;
```

Rendered today, in this order: **Dr. Rajesh Kumar** (Faculty In-Charge, Dept. of Mechanical Engineering) → **Dr. Priya Sharma** (Assistant Faculty In-Charge, Dept. of Computer Science) → **Arjun Mehta** (Sports Secretary, B.E. Computer Science) → **Ananya Verma** (Joint Sports Secretary, B.E. Electronics). Sort is by role (in-charges first), not by `id`; with today's data the two orders coincide, but the role sort is what the badges promise.

- `email` / `phone` are optional in `Person`. All four records have both, so 8 contact links render. A missing field omits the link entirely — never an inert row, never a disabled-looking link. Today `src/components/cards/PersonCard.tsx:34` renders the address as plain text inside a `<div>`; that is the dead control this section removes.
- `photoUrl` is required on all four and points at unsized Unsplash originals. Rendered through sizing params (see Code) — no layout dependency on the image, since the frame ratio is fixed.
- No dates, no ISO strings, no formatters needed here — `src/lib/format.ts` is not imported by this section. Today's date (2026-08-05) and the past/today event logic do not affect Section 7.
- `department` is optional; `line-clamp-2` absorbs the longest value ("Department of Mechanical Engineering").

**Motion**

| Effect | Layer | Trigger | From → To | Duration | Easing | Stagger | Reduced motion |
|---|---|---|---|---|---|---|---|
| Header block reveal | Motion (`whileInView`, `once`, `amount:0.4`) | scroll into view | `opacity 0, y var(--reveal-y)` → `opacity 1, y 0` | `--dur-slow` | `--ease-out-quint` | eyebrow → statement → lead, `--dur-fast ÷ 2` = 90ms | renders final state, no transform, no fade |
| Card grid reveal | Motion (parent `staggerChildren`) | scroll into view, once | `opacity 0, y 24px` | `--dur-std` | `--ease-out-quint` | 90ms per card (4 cards = 270ms tail) | renders final state, stagger 0 |
| Card lift | CSS `transition` | `:hover` / `:focus-within` | `translateY(0)` → `translateY(calc(var(--lift) * -1))`, border `line → line-strong`, bg `deep → raised`, `+ --shadow-lift` | `--dur-fast` | `--ease-out-quint` | — | transition-duration 1ms; colour/border change still applies, no translate |
| Portrait grayscale → colour | CSS `filter` | `:hover` on card, **`@media (hover:hover) and (min-width:1024px)` only** | `grayscale(1) contrast(1.06) brightness(.94)` → `grayscale(0) contrast(1.02) brightness(1)` | `--dur-std` | `--ease-out-quint` | — | duration 1ms (state still reachable, no ramp) |
| Duotone tone fade | CSS `opacity` | same hover gate | `.25` → `.10` | `--dur-std` | `--ease-out-quint` | — | duration 1ms |
| Portrait scale | CSS `transform` | same hover gate | `scale(1.02)` → `scale(1.06)` | `--dur-slow` | `--ease-out-quint` | — | locked at `scale(1.02)`, no change |
| Department escalation | CSS `color` | card `:hover` / `:focus-within` | `--color-fg-faint` → `--color-fg-muted` | `--dur-fast` | `--ease-out-quint` | — | duration 1ms, colour still escalates |
| Contact link ink | CSS `color`, `text-decoration-color` | `:hover` / `:focus-visible` | `fg-muted → volt`, `line-volt → volt` | `--dur-fast` | `--ease-out-quint` | — | duration 1ms |
| CTA underline sweep | CSS `transform` | `:hover` / `:focus-visible` on CTA | `scaleX(0)` → `scaleX(1)`, `origin-left` | `--dur-std` | `--ease-out-quint` | — | underline renders at `scaleX(1)` permanently |
| CTA arrow nudge | CSS `transform` | same | `translateX(0)` → `translateX(4px)` | `--dur-fast` | `--ease-out-quint` | — | no translate |
| Mesh bloom | none | — | static | — | — | — | static |

No GSAP and no ScrollTrigger in this section. The two flagship GSAP scenes are `#focus` and `#impact`; Section 7 is Motion + CSS only. No per-frame React state, no IntersectionObserver loop (nothing loops here).

**Code**

```css
/* src/index.css — @theme tokens already declared globally */

@utility portrait-frame {
  position: relative;
  overflow: hidden;
  isolation: isolate;              /* mix-blend-mode must not reach the global grain layer */
  aspect-ratio: 3 / 4;
  background-color: var(--color-deep);
}

/* 1. identical luminance curve for every source photo */
@utility portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 18%;        /* head-safe crop, same box for all portraits */
  transform: scale(1.02);          /* hides sub-pixel edge on scale-back */
  filter: grayscale(1) contrast(1.06) brightness(0.94);
  transition:
    filter    var(--dur-std)  var(--ease-out-quint),
    transform var(--dur-slow) var(--ease-out-quint);
}

/* 2. identical hue wash — this is the duotone */
@utility portrait-tone {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: var(--color-teal-900);
  mix-blend-mode: color;           /* photo luminance + teal hue/sat = true duotone */
  opacity: 0.25;
  transition: opacity var(--dur-std) var(--ease-out-quint);
}

/* 3. identical tonal scrim, so the badge is legible over any photo */
@utility portrait-scrim {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(
    to top,
    var(--color-void) 0%,
    color-mix(in oklab, var(--color-void) 55%, transparent) 26%,
    transparent 58%
  );
}

/* 4. identical frame edge */
@utility portrait-edge {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  outline: 1px solid var(--color-line-strong);
  outline-offset: -1px;
}

/* colour only on real hover, desktop composition only */
@media (hover: hover) and (min-width: 1024px) {
  .group:hover .portrait-img  { filter: grayscale(0) contrast(1.02) brightness(1); transform: scale(1.06); }
  .group:hover .portrait-tone { opacity: 0.10; }
}

@media (prefers-reduced-motion: reduce) {
  .portrait-img, .portrait-tone { transition-duration: 1ms; }
  .group:hover .portrait-img    { transform: scale(1.02); }
}
```

Why this makes mismatched stock portraits read as one set: the four Unsplash sources differ in white balance, saturation, focal length and background. Four passes erase every one of those differences — a fixed `3/4` box with a fixed `object-position` erases framing, `grayscale(1) contrast(1.06) brightness(0.94)` erases white balance and saturation, `teal-900` at `mix-blend-mode: color` opacity `.25` imposes one shared hue, and the shared bottom scrim imposes one shared value ramp. Nothing survives from the original except composition, so the grid reads as a commissioned set. Swapping in real shoot photos later changes nothing structural — same frame, same filters, zero layout shift.

```tsx
// src/components/cards/PersonCard.tsx  (rewrite; today's version renders inert contact text)
import { Mail, Phone } from "lucide-react";
import MediaFrame from "@/components/media/MediaFrame";
import { cn } from "@/lib/utils";
import type { Person } from "@/types/person.types";

const ROLE_LABEL = { INCHARGE: "In-Charge", COMMITTEE: "Committee" } as const;

// ponytail: sizing params inline — 4 unsized Unsplash URLs, not worth a helper module
const src = (url: string, w: number) =>
  `${url}?auto=format&fit=crop&crop=faces&w=${w}&q=70`;

export default function PersonCard({ person, index, count }: {
  person: Person; index: number; count: number;
}) {
  const isStaff = person.personRole === "INCHARGE";
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-[--radius-lg] border border-line bg-deep
                 transition-[transform,background-color,border-color,box-shadow]
                 duration-[--dur-fast] ease-[--ease-out-quint]
                 hover:-translate-y-[--lift] hover:border-line-strong hover:bg-raised hover:shadow-lift
                 focus-within:border-line-strong focus-within:bg-raised
                 sm:flex-col max-sm:flex-row max-sm:items-stretch max-sm:gap-4 max-sm:p-4"
    >
      <MediaFrame
        ratio="3/4"
        className={cn("portrait-frame rounded-none border-0", "max-sm:w-[38%] max-sm:max-w-[9.5rem]")}
        imgClassName="portrait-img"
        src={src(person.photoUrl, 560)}
        srcSet={`${src(person.photoUrl, 560)} 1x, ${src(person.photoUrl, 1120)} 2x`}
        alt={`${person.name} — placeholder portrait`}
        loading="lazy"
        overlay={
          <>
            <span aria-hidden className="portrait-tone" />
            <span aria-hidden className="portrait-scrim" />
            <span aria-hidden className="portrait-edge" />
            <span
              className={cn(
                "absolute bottom-4 left-4 z-4 rounded-full px-2.5 py-1 text-eyebrow uppercase tracking-[0.2em]",
                isStaff
                  ? "bg-volt text-ink"
                  : "border border-line-volt bg-void text-cream-dim",
                "max-sm:bottom-2 max-sm:left-2",
              )}
            >
              {isStaff ? "In-charge" : "Committee"}
            </span>
          </>
        }
      />

      <div className="p-6 max-sm:p-0">
        <p className="font-display text-meta tabular-nums text-fg-faint">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>

        <h3 className="mt-3 font-display text-title font-semibold leading-[1.05] tracking-[-0.03em] text-cream">
          {person.name}
        </h3>

        <p className="mt-1.5 text-meta text-fg-muted">{person.designation}</p>

        {person.department && (
          <p className="mt-3 line-clamp-2 text-meta text-fg-faint
                        transition-colors duration-[--dur-fast] ease-[--ease-out-quint]
                        group-hover:text-fg-muted group-focus-within:text-fg-muted">
            {person.department}
          </p>
        )}

        {(person.email || person.phone) && (
          <>
            <hr className="mt-5 border-0 border-t border-line" />
            <div className="mt-4 flex items-center gap-1 max-sm:mt-3 max-sm:flex-col max-sm:items-stretch max-sm:gap-0">
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  aria-label={`Email ${person.name} at ${person.email}`}
                  className="inline-flex items-center text-meta text-fg-muted underline decoration-1 decoration-line-volt underline-offset-4
                             transition-colors duration-[--dur-fast] ease-[--ease-out-quint]
                             hover:text-volt hover:decoration-volt focus-visible:text-volt
                             max-sm:min-h-[48px] max-sm:no-underline"
                >
                  <Mail aria-hidden className="mr-2 size-4 text-fg-faint transition-colors duration-[--dur-fast] ease-[--ease-out-quint] group-hover:text-volt" />
                  Email
                </a>
              )}
              {person.email && person.phone && (
                <span aria-hidden className="mx-3 h-3 w-px shrink-0 bg-line-strong max-sm:hidden" />
              )}
              {person.phone && (
                <a
                  href={`tel:${person.phone.replace(/\s+/g, "")}`}
                  aria-label={`Call ${person.name} at ${person.phone}`}
                  className="inline-flex items-center text-meta text-fg-muted underline decoration-1 decoration-line-volt underline-offset-4
                             transition-colors duration-[--dur-fast] ease-[--ease-out-quint]
                             hover:text-volt hover:decoration-volt focus-visible:text-volt
                             max-sm:min-h-[48px] max-sm:border-t max-sm:border-line max-sm:no-underline"
                >
                  <Phone aria-hidden className="mr-2 size-4 text-fg-faint transition-colors duration-[--dur-fast] ease-[--ease-out-quint] group-hover:text-volt" />
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
```

```tsx
// src/sections/PeopleSection.tsx
import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE } from "@/lib/motion";   // DUR.std = 0.42, DUR.slow = 0.72, EASE.outQuint = [0.22,1,0.36,1]

const reduce = useReducedMotion();
const list = reduce
  ? { hidden: {}, show: {} }
  : { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } } };  // 0.09 = --dur-fast / 2
const item = reduce
  ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
  : { hidden: { opacity: 0, y: 24 },                       // 24 = --reveal-y
      show: { opacity: 1, y: 0, transition: { duration: DUR.std, ease: EASE.outQuint } } };

<motion.ul
  variants={list}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.25 }}
  className="grid grid-cols-12 gap-x-6 gap-y-10 md:gap-x-5 md:gap-y-8 max-sm:gap-y-6"
>
  {preview.map((p, i) => (
    <motion.li key={p.id} variants={item} className="col-span-12 sm:col-span-6 lg:col-span-3">
      <PersonCard person={p} index={i} count={preview.length} />
    </motion.li>
  ))}
</motion.ul>
```

CTA (ghost link, right-aligned on desktop, 48px full-width row on mobile):

```tsx
<Link
  to="/people"
  className="group/cta inline-flex flex-col items-start text-meta uppercase tracking-[0.2em] text-cream
             transition-colors duration-[--dur-fast] ease-[--ease-out-quint] hover:text-volt
             max-sm:min-h-[48px] max-sm:w-full max-sm:justify-center"
>
  <span className="inline-flex items-center">
    {total > 4 ? `Meet all ${total}` : "Meet everyone"}
    <ArrowRight aria-hidden className="ml-2 size-4 transition-transform duration-[--dur-fast] ease-[--ease-out-quint] group-hover/cta:translate-x-1" />
  </span>
  <span
    aria-hidden
    className="mt-2 h-px w-full origin-left scale-x-0 bg-line-volt transition-transform
               duration-[--dur-std] ease-[--ease-out-quint]
               group-hover/cta:scale-x-100 group-hover/cta:bg-volt
               motion-reduce:scale-x-100"
  />
</Link>
```

**A11y**

- `<section id="people" aria-labelledby="people-heading">`; the statement is the `<h2 id="people-heading">`. Cards are `<li><article>` inside a `<ul>` so screen readers announce "list, 4 items". Each name is an `<h3>` — one heading level below the statement, no skips.
- Role is conveyed by text, never by colour alone: the badge is a real text node, plus an `sr-only` "In-Charge" / "Committee" string so the role is in the card's reading order even if the badge is visually parsed as decoration.
- Contact links are real `mailto:` / `tel:` anchors with `aria-label` carrying the full address and number (the visible label is `Email` / `Call`). Nine focusables in DOM order: 4 × (Email, Call) then the CTA. No `tabindex`, no focus traps, no click handlers on non-interactive elements.
- Images: `alt="{name} — placeholder portrait"` — honest, because the photo is not that person. Overlay/tone/scrim/badge-wrapper spans are `aria-hidden`. Icons are `aria-hidden` with the label carried by text.
- Focus: global ring only — `outline: 2px solid var(--color-volt); outline-offset: 3px`. `:focus-within` on the card mirrors the hover surface (bg `--color-raised`, border `--color-line-strong`) so keyboard users get the same affordance mouse users get. Nothing in the card is reachable only by hover: the grayscale→colour reveal is decorative and gated behind `(hover:hover) and (min-width:1024px)`.
- Touch: <640 every contact row is `min-h-[48px]` full-width; the CTA is a 48px row. No hover-dependent meaning anywhere in the mobile composition.
- Contrast on `--color-deep` (#072226): cream name ≈ 15.5:1, `fg-muted` designation/links ≈ 7.3:1, `ink` on `volt` badge ≈ 16:1, `cream-dim` on `void` badge ≈ 13:1. One documented exception: `department` at `--color-fg-faint`/`--text-meta` measures **3.1:1** — below AA 4.5. It is retained per the type hierarchy, mitigated by escalating to `--color-fg-muted` (7.3:1) on hover and `focus-within`, and the same department string renders at `--color-fg-muted` on `/people`. Flagged, not hidden.
- Mock disclosure: the placeholder note sits in the section, not a tooltip, so nobody mistakes stock faces for real SAC portraits.

**Acceptance**

1. Exactly four cards render, in order Dr. Rajesh Kumar → Dr. Priya Sharma → Arjun Mehta → Ananya Verma, filling one complete 4-column row at ≥1024 with no filler cell and no stretched column.
2. All eight contact affordances are anchors: `href^="mailto:"` × 4 and `href^="tel:+91"` × 4 with all whitespace stripped from the number; a DOM query for contact text inside a non-anchor element returns zero nodes.
3. All four portraits share one computed treatment — `aspect-ratio: 3/4`, `object-fit: cover`, `object-position: 50% 18%`, `filter: grayscale(1) contrast(1.06) brightness(0.94)`, and a tone layer at `opacity: 0.25; mix-blend-mode: color` over `--color-teal-900` — verified identical in DevTools for each card.
4. At <1024px, or on any pointer without `hover: hover`, no interaction reaches the colour state: portraits stay grayscale and the tone layer stays at `0.25`.
5. With `prefers-reduced-motion: reduce`, no element in the section translates or scales at any point, all transitions report ≤1ms, and the CTA underline is present at `scaleX(1)` on load.
6. Volt appears only as: eyebrow dash + eyebrow text, two filled `IN-CHARGE` pills, the `COMMITTEE` pill border (`--color-line-volt`), contact/CTA hover ink, the CTA underline, and focus rings — measured volt coverage under 10% of the viewport at 1440×900.
7. `getPeopleByRole` returning zero records for both roles removes the entire section from the DOM — no heading, no rule, no empty state, no CTA.
8. No GSAP or ScrollTrigger import exists in this section's files, and no raw hex string appears in them.

---

### Section 8 — Impact (second GSAP scene)

Four numbers and one honest chart that make participation feel measured, then hand off to `/stats`.

Dependencies: `gsap` and `motion` are **not** in `package.json` yet — `npm i gsap motion`. This section is the second and last GSAP consumer in the repo (the other is `#focus`).

---

**Canvas**

| Property | Value |
|---|---|
| Background token | `--color-void` (section is not an alternating band — the mesh carries the tonal shift) |
| Mesh utility | `mesh-teal` (teal-500 bloom upper-right, volt bloom mid-left) |
| Mesh strength | `--mesh-strength: 0.4` |
| Bloom containment | `relative isolate overflow-hidden`; bloom lives on the utility's `::before` at `filter: blur(80px)` desktop / `blur(48px)` <768 |
| Vertical padding | `py-(--space-section)` → `clamp(5rem, 11vh, 9rem)` |
| Container | `mx-auto w-full max-w-(--container) px-(--gutter)`, 12-col grid ≥1024, 6-col 768–1023, 1-col <768 |
| Anchor | `id="impact"` + `scroll-mt-24` (96px, clears the sticky navbar) |
| Grain | inherited from global `body::after`; section adds nothing |

---

**Wireframe**

DESKTOP >=1024  ·  12-col grid, container 1280, gutter clamp(1rem,4vw,2.5rem)
```
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2   3   4   5   6   7  │  8   9  10  11  12                          │
│                                                                           │
│ ▸ IMPACT                                                                  │
│ ┌──────────────────────────────────────────┐  ┌─────────────────────┐     │
│ │ Participation is the only                │  │ Every booking, lap  │     │
│ │ metric we care about.                    │  │ and rep rolls up    │     │
│ │       ← display-l, cols 1-7              │  │ into four numbers.  │     │
│ └──────────────────────────────────────────┘  └─────────────────────┘     │
│                                                ↑ lead, cols 9-12          │
│                                                                           │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ← stat rule   │
│ ┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐ │
│ │ 1,248+          │ 12,540+         │ 3.6             │ 24              │ │
│ │ ACTIVE          │ TOTAL HOURS     │ AVG. SESSIONS   │ ACTIVITIES      │ │
│ │ STUDENTS        │ LOGGED          │ / WEEK          │ CONDUCTED       │ │
│ │                 │                 │                 │                 │ │
│ │ (+12.5%)        │ (+8.2%)         │ (+0.4)          │ (+6)            │ │
│ └─────────────────┴─────────────────┴─────────────────┴─────────────────┘ │
│   ↑ display-m volt   ↑ meta caps   ↑ chip   1px hairline gaps             │
│ Change since last month.                                                  │
│                                                                           │
│ ┌───────────────────────────────────────────────┐  ┌─────────────────────┐│
│ │ Monthly participation       16/9              │  │ ( Sample data )     ││
│ │                                               │  │                     ││
│ │ 1800┤                 ╭─╮                     │  │ ▪ Participants      ││
│ │     │      ╭╮      ╭╮╱  ╰╮   ╭─╮              │  │                     ││
│ │ 1200┤ ╭─╮ ╱ ╰─╮  ╱ ╰╯    ╰──╯   ╰╮            │  │ December is not     ││
│ │     │╱  ╰╯    ╰╯                 ╰            │  │ in the dataset.     ││
│ │  600┤                                         │  │                     ││
│ │     │▒▒▒▒ volt → transparent ▒▒▒▒             │  │ Full stats →        ││
│ │    0└──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬        │  └─────────────────────┘│
│ │      Jan Feb Mar Apr May Jun Jul Aug Sep      │  ↑ rail 9-12            │
│ │                  … Oct Nov  Dec ← no mark     │                         │
│ └───────────────────────────────────────────────┘                         │
│   ↑ figure card, cols 1-8                                                 │
│                                                                           │
│ ▾ View the data as a table   ← <details>, cols 1-8                        │
└───────────────────────────────────────────────────────────────────────────┘
```

MOBILE <640  ·  single column, gutter 1rem
```
┌─────────────────────────┐
│ ▸ IMPACT                │
│  Participation is the   │
│  only metric we care    │
│  about.                 │
│                         │
│  Every booking, lap and │
│  rep rolls up into four │
│  numbers.               │
│                         │
│ ━━━━━━━━━━━━━━━━━━━━━━  │
│ ┌───────────┬──────────┐│
│ │ 1,248+    │12,540+   ││
│ │ ACTIVE    │TOTAL     ││
│ │ STUDENTS  │HOURS     ││
│ │ (+12.5%)  │(+8.2%)   ││
│ ├───────────┼──────────┤│
│ │ 3.6       │24        ││
│ │ AVG.      │ACTIVITIES││
│ │ SESSIONS  │CONDUCTED ││
│ │ / WEEK    │          ││
│ │ (+0.4)    │(+6)      ││
│ └───────────┴──────────┘│
│ Change since last       │
│ month.                  │
│                         │
│ ┌──────────────────────┐│
│ │ Monthly participation││
│ │ ( Sample data )      ││
│ │                      ││
│ │ 1800┤      ╭╮        ││
│ │     │ ╭╮╱ ╰─╮  ╭─╮   ││
│ │ 1200┤╱      ╰╯ ╱   ╰ ││
│ │     │▒▒ volt fill ▒▒ ││
│ │    0└┬┬┬┬┬┬┬┬┬┬┬┬    ││
│ │      J F M A M … N D ││
│ │                    ↑ ││
│ │  Dec tick, no mark   ││
│ │                      ││
│ │ ▪ Participants  4/3  ││
│ └──────────────────────┘│
│                         │
│ ▾ View the data as a    │
│   table                 │
│                         │
│ ┌──────────────────────┐│
│ │ Full stats →         ││
│ └──────────────────────┘│
│   ↑ 48px min height     │
└─────────────────────────┘
```

---

**Elements**

| Slot | Content | Type token | Color token | Surface/radius | Spacing | Notes |
|---|---|---|---|---|---|---|
| `section#impact` | wrapper | — | bg `--color-void` | `mesh-teal`, no radius | `py-(--space-section)` | `relative isolate overflow-hidden`, `scroll-mt-24` |
| mesh `::before` | teal-500 + volt blooms | — | `--color-teal-500`, `--color-volt` | none | `inset-0` | `blur(80px)` / `blur(48px)` <768; static, never animated |
| container | grid shell | — | — | none | `max-w-(--container) px-(--gutter)` | 12 / 6 / 1 col |
| eyebrow rule | 24px hairline before label | — | `--color-volt` | none, `h-px w-6` | `mr-3`, `align-middle` | `aria-hidden="true"`; the `▸` in the wireframe |
| eyebrow | `IMPACT` | `--text-eyebrow` | `--color-volt` | none | `mb-5` | `uppercase tracking-[0.2em]` |
| statement | H2 | `--text-display-l` | `--color-cream` | none | cols 1-7, `max-w-[18ch]` | `font-display font-semibold tracking-[-0.03em] leading-[0.92]`, `id="impact-title"` |
| lead | paragraph | `--text-lead` | `--color-fg-muted` | none | cols 9-12, `max-w-[42ch]` | baseline-aligned to statement on lg |
| stat rule | full-width hairline above the row | — | `--color-line-strong` | none, `h-px` | `mt-16 mb-0` | `data-stat-rule`, `origin-left` — GSAP scales this |
| stat grid | 4-up wrapper | — | bg `--color-line` (shows through the 1px gap as hairlines) | `--radius-lg`, `overflow-hidden` | `gap-px` | `grid grid-cols-2 lg:grid-cols-4` |
| stat cell | `data-stat-block` | — | bg `--color-deep`, hover `--color-raised` | inherits wrapper radius | `p-5 md:p-6 lg:p-8` | `transition-colors duration-(--dur-fast) ease-(--ease-out-quint)`; hover is decorative only |
| stat numeral | `1,248+` etc. | `--text-display-m` | `--color-volt` | none | `mb-3` | `font-display font-semibold tabular-nums tracking-[-0.03em] leading-[0.92]`; `AnimatedNumber` |
| stat label | `Active Students` etc. | `--text-meta` | `--color-fg-muted` | none | `mb-4`, `max-w-[14ch]` | `uppercase tracking-[0.2em]`; source casing preserved in data |
| delta chip | `+12.5%` etc. | `--text-meta` | text `--color-cream-dim`, border `--color-line-strong` | bg `--color-abyss`, `rounded-full` | `px-2.5 py-1`, `inline-flex` | `font-display tabular-nums`; **no** arrow glyph, the `+` is in the data; not volt — accent budget |
| delta caption | `Change since last month.` | `--text-meta` | `--color-fg-muted` | none | `mt-4` | one caption for all four chips, so chips stay short |
| figure card | chart container | — | bg `--color-deep`, border `--color-line` | `--radius-lg`, `--shadow-lift` | `mt-12 p-6 lg:p-8`, cols 1-8 | `<figure>` |
| chart title | `Monthly participation` | `--text-title` | `--color-fg` | none | `mb-1` | `font-display font-semibold tracking-[-0.03em]` |
| chart subhead | `January to November…` | `--text-meta` | `--color-fg-muted` | none | `mb-6`, `max-w-[46ch]` | states the December gap in words |
| sample-data chip | `Sample data` | `--text-meta` | text `--color-cream-dim`, border `--color-line-strong` | bg `--color-abyss`, `rounded-full` | `px-3 py-1` | mandatory mock label; rail on lg, figure header <1024 |
| legend swatch | dot | — | `--color-volt` | `rounded-full`, `size-2` | `mr-2` | `aria-hidden="true"` |
| legend label | `Participants` | `--text-meta` | `--color-fg-muted` | none | — | the single series |
| plot area | recharts `AreaChart` | — | see chart rows | none | `aspect-[4/3] sm:aspect-[16/9] max-h-[380px] min-h-[240px]` | wrapper `role="presentation" aria-hidden="true"` |
| gridlines | horizontal only | — | `--color-line` | none | `strokeDasharray="2 6"` | `vertical={false}` |
| axis line / tick line | disabled | — | `--color-fg-faint` (stroke prop) | none | — | `axisLine={false} tickLine={false}` — nothing paints |
| axis tick labels | `Jan…Dec`, `0…1800` | 13px `--font-sans` | `--color-fg-muted` | none | X `dy={8}`, Y `width={44}` | **not** fg-faint: fg-faint on `--color-deep` is 3.07:1 and fails AA at 13px; fg-muted is 6.36:1 |
| area stroke | trend line | — | `--color-volt` | none, `strokeWidth={2}` | — | `type="monotone"`, `connectNulls={false}` |
| area fill | gradient | — | `--color-volt` 28% → transparent | none | vertical `x1=0 y1=0 x2=0 y2=1` | `id="impactTrendFill"` |
| active dot | hover marker | — | fill `--color-volt`, stroke `--color-void` | `r={4}`, `strokeWidth={2}` | — | pointer only |
| tooltip surface | custom | — | bg `--color-deep`, border `--color-line` | `--radius-sm`, `--shadow-lift` | `px-3 py-2` | replaces the default white recharts tooltip |
| tooltip month | `June` | `--text-meta` | `--color-fg-muted` | none | `mb-0.5` | full month name |
| tooltip value | `1,700 participants` | `--text-meta` | `--color-fg` | none | — | `font-display tabular-nums` |
| tooltip cursor | vertical guide | — | `--color-line-strong` | none, `strokeWidth={1}` | — | `cursor={{...}}` |
| `<details>` | disclosure | — | border-t `--color-line` | none | `mt-6 pt-6`, cols 1-8 | closed by default |
| `<summary>` | `View the data as a table` | `--text-meta` | `--color-fg-muted`, hover `--color-fg` | none | `min-h-[48px] py-3 gap-2` | native marker hidden, `cursor-pointer` |
| chevron | lucide `ChevronDown` | — | `--color-fg-faint` | none, `size-4` | — | `aria-hidden`, `group-open:rotate-180` |
| table caption | `Monthly participation, January to November` | `--text-meta` | `--color-fg-muted` | none | `pb-4 text-left` | real `<caption>` |
| `<th>` | `Month`, `Participants` | `--text-eyebrow` | `--color-fg-muted` | border-b `--color-line-strong` | `pb-3` | `scope="col"`, `uppercase tracking-[0.2em]`; second col `text-right` |
| `<td>` month | `January` … `December` | `--text-meta` | `--color-fg-muted` | border-b `--color-line` | `py-2.5` | formatted month names, not `Jan` |
| `<td>` value | `1,000` … | `--text-meta` | `--color-fg` | border-b `--color-line` | `py-2.5 text-right` | `font-display tabular-nums` |
| December row value | `Not recorded` | `--text-meta` | `--color-fg-faint` | border-b `--color-line` | `py-2.5 text-right` | 20px effective size not required — this is the one intentionally de-emphasised cell; paired with the visible subhead so it is not the only signal |
| CTA link | `Full stats →` | `--text-body` | `--color-volt`, hover `--color-volt-600` | border-b `--color-line-volt` → `--color-volt` | rail bottom lg; `min-h-[48px] w-full` <1024 | `<Link to="/stats">`, real route |
| CTA arrow | `→` | `--text-body` | `--color-volt` | none | `ml-2` | `aria-hidden="true"`, translates `--lift` on hover |
| focus ring | all interactives | — | `--color-volt` | `outline 2px / offset 3px` | — | global rule, nothing local |

---

**Copy**

```
IMPACT

Participation is the only metric we care about.

Every booking, lap and rep rolls up into four numbers.

1,248+            Active Students          +12.5%
12,540+           Total Hours Logged       +8.2%
3.6               Avg. Sessions / Week     +0.4
24                Activities Conducted     +6

Change since last month.

Monthly participation
January to November. December is not in the dataset yet.

Sample data
Participants

Tooltip:  June
          1,700 participants

View the data as a table

Table caption:  Monthly participation, January to November
Column headers: Month | Participants
Rows:           January 1,000 / February 1,350 / March 1,250 / April 1,450 /
                May 1,300 / June 1,700 / July 1,450 / August 1,000 /
                September 1,150 / October 1,500 / November 1,200 /
                December Not recorded

Full stats →

Empty chart fallback: Monthly participation is not published yet.
```

Rail note on lg (same strings, stacked): `Sample data` · `Participants` · `December is not in the dataset yet.` · `Full stats →`. The subhead drops the December sentence on lg to avoid duplicating the rail; keeps it <1024 where there is no rail.

---

**Layout**

| Breakpoint | Grid | Spans | Gaps | Ratios |
|---|---|---|---|---|
| ≥1280 | `grid-cols-12`, `gap-x-6` (24px) | statement 1-7, lead 9-12, rule 1-12, stat grid 1-12 (4 equal), figure 1-8, rail 9-12, details 1-8 | rows: header→rule 64px, rule→grid 0, grid→caption 16px, caption→figure 48px, figure→details 24px | plot `aspect-[16/9]`, `max-h-[380px]` |
| 1024–1279 | identical | identical | identical | plot `aspect-[16/9]`, `max-h-[340px]` |
| 768–1023 | `grid-cols-6`, `gap-x-6` | statement 1-6, lead 1-6 (`mt-6`), stat grid 1-6 as 2×2, figure 1-6, rail becomes a `flex flex-wrap gap-x-8 gap-y-3` row under the figure, details 1-6 | header→rule 48px, grid→figure 40px | plot `aspect-[16/9]`, `min-h-[260px]` |
| <768 | single column, `px-(--gutter)` = 1rem | full width, document flow | header→rule 40px, statement→lead 24px, grid→caption 16px, caption→figure 32px, figure→details 24px, details→CTA 24px | plot `aspect-[4/3]`, `min-h-[240px]` |

Stat cells: 4 equal columns ≥1024 (`grid-cols-4`), 2×2 below (`grid-cols-2`), hairlines are the 1px `gap-px` showing the wrapper's `--color-line`. Cell padding 32px lg / 24px md / 20px mobile. Numeral stays `--text-display-m`; its 2rem clamp floor keeps `12,540+` on one line inside a 2-col cell at 360px. No pinned scene at any width. Rail and figure never swap order — the CTA is always last in DOM.

---

**Data**

No stats selector exists in `src/lib/content.ts`, so this section imports the mock module directly — adding a pass-through selector for a static array is noise.

```ts
import { overviewCards, trendData } from "@/mock/mockStats";

const cards = overviewCards.filter((c) => c.id !== 3);            // drops "Top Activity"
const series = [...trendData, { month: "Dec", value: null }];     // honest trailing gap
```

**Dropped card: `id: 3` "Top Activity" / "Basketball".** It is not a number — a count-up cannot run on it, `tabular-nums` does nothing, and its `growth` ("Most Participated") is a label, not a delta. It also duplicates what the activities section and `/stats` already say. Five tiles is also the dashboard look we are leaving behind.

Rendered, exactly:

| Numeral | Label | Chip |
|---|---|---|
| `1,248+` | Active Students | `+12.5%` |
| `12,540+` | Total Hours Logged | `+8.2%` |
| `3.6` | Avg. Sessions / Week | `+0.4` |
| `24` | Activities Conducted | `+6` |

Chips render `growth.replace(/ from last month$/, "")` — the trailing clause moves once into the shared caption instead of bloating two chips. The mock data is not modified.

Chart renders 11 marks (Jan 1,000 → Nov 1,200) plus a 12th category `Dec` with `value: null`: the axis shows the `Dec` tick, `connectNulls={false}` stops the line and fill at Nov, and the subhead + table say so in words. No interpolation, no zero-fill, no silent truncation of the axis.

`trendData` carries no year and includes months after today (2026-08-05), so nothing in this section year-anchors it — the `Sample data` chip and "not in the dataset yet" are the whole claim. `overviewCards` is likewise undated; the caption says "last month" only because the source `growth` strings do.

Empty cases:
- `trendData.length === 0` → figure renders `Monthly participation is not published yet.` at `--text-meta` / `--color-fg-muted`; plot, legend and `<details>` are not rendered; the rail keeps the CTA.
- `cards.length` is a filter over a static typed array and is always 4. Guard is a dev assertion, not layout code: `if (import.meta.env.DEV) console.assert(cards.length === 4, "impact expects 4 stat cards");`

---

**Motion**

| Effect | Layer | Trigger | From → To | Duration token | Easing token | Stagger | Reduced motion |
|---|---|---|---|---|---|---|---|
| Header block reveal (eyebrow, statement, lead) | Motion | `whileInView`, `once: true, amount: 0.4` | `opacity 0, y --reveal-y` → `opacity 1, y 0` | `--dur-slow` (0.72s) | `--ease-out-quint` `[0.22,1,0.36,1]` | 0.18s children (= `--dur-fast`) | `<MotionConfig reducedMotion="user">` at app root drops the y, keeps opacity |
| Stat rule draw | GSAP | ScrollTrigger scrub on the stat row | `scaleX 0` → `1`, `transformOrigin: left center` | `--dur-slow` (0.72 in timeline units) | `power4.out` ≡ `--ease-out-quint` | — | `matchMedia` never matches → tween never created, rule sits at `scaleX 1` |
| Four numerals scrub in | GSAP | same timeline, `start "top 82%"`, `end "top 42%"`, `scrub: 0.72` | `yPercent 18, opacity 0` → `0, 1` | `--dur-slow` | `power4.out` ≡ `--ease-out-quint` | 0.18s (= `--dur-fast`) | same — no inline styles written, cells render final state |
| Numeral count-up | Motion | `useInView(ref, { once: true, amount: 0.6 })` | `0` → parsed target | `--dur-hero` (1s) | `--ease-out-quint` | — | `useReducedMotion()` → renders the source string, `animate` never called |
| Cell hover surface | CSS | `hover` | `bg-deep` → `bg-raised` | `--dur-fast` | `--ease-out-quint` | — | colour only, unchanged |
| Area draw | Recharts | mount | clip 0 → 100% | `720` (numeric mirror of `--dur-slow`) | recharts `"ease-out"` | — | `isAnimationActive={false}` |
| Tooltip fade | Recharts | pointer over plot | `opacity 0` → `1` | `180` (numeric mirror of `--dur-fast`) | recharts default | — | opacity only, unchanged |
| Chevron rotate | CSS | `[open]` | `rotate 0` → `180deg` | `--dur-fast` | `--ease-out-quint` | — | `transition: none`, jumps to final rotation |
| CTA arrow nudge | CSS | `hover`, `focus-visible` | `translateX 0` → `--lift` (4px) | `--dur-fast` | `--ease-out-quint` | — | `transition: none`, no nudge |
| CTA underline | CSS | `hover`, `focus-visible` | border `--color-line-volt` → `--color-volt` | `--dur-fast` | `--ease-out-quint` | — | colour only, unchanged |
| Mesh bloom | CSS | — | static | — | — | — | static at all widths; never animated |

Notes: recharts prop durations must be numbers, so `720`/`180` are the numeric mirrors of `--dur-slow`/`--dur-fast` — no other bespoke ms values exist in the section. `scrub: 0.72` is `--dur-slow` expressed in seconds. GSAP owns the cell wrapper transform/opacity; Motion owns the inner `<span>` text content — the two never touch the same property. Scrubbing back up re-fades the cells but does not re-run the count-up (`once: true`); the numeral stays at its final value, which is the correct read.

---

**Code**

Shared chart tokens — one file, kills every hardcoded hex in all three chart components:

```ts
// src/components/charts/chartTokens.ts
export const chart = {
  grid: "var(--color-line)",
  axis: "var(--color-fg-faint)",
  // fg-faint on --color-deep is 3.07:1 — fails AA at 13px, so tick TEXT uses fg-muted (6.36:1)
  tick: { fill: "var(--color-fg-muted)", fontSize: 13, fontFamily: "var(--font-sans)" },
  cursor: { stroke: "var(--color-line-strong)", strokeWidth: 1 },
  series: ["var(--color-volt)", "var(--color-teal-500)", "var(--color-teal-300)"],
  dur: { std: 420, slow: 720, fast: 180 }, // numeric mirrors of --dur-* (recharts wants numbers)
} as const;
```

Chart, rewritten (`src/components/charts/ActivityTrendChart.tsx`):

```tsx
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { trendData } from "@/mock/mockStats";
import { chart } from "./chartTokens";

const nf = new Intl.NumberFormat("en-IN");
const MONTHS: Record<string, string> = { Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June", Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December" };

// Dec has no record. Append it as a null point so the axis stays honest about the gap.
const series = [...trendData, { month: "Dec", value: null as number | null }];

type TipProps = { active?: boolean; label?: string; payload?: { value?: number | null }[] };

const TrendTip = ({ active, label, payload }: TipProps) => {
  const v = payload?.[0]?.value;
  if (!active || v == null) return null;
  return (
    <div className="rounded-sm border border-line bg-deep px-3 py-2 shadow-lift">
      <p className="text-meta text-fg-muted">{MONTHS[label ?? ""] ?? label}</p>
      <p className="text-meta font-display tabular-nums text-fg">{nf.format(v)} participants</p>
    </div>
  );
};

const ActivityTrendChart = ({ animate = true }: { animate?: boolean }) => (
  <div className="aspect-[4/3] max-h-[380px] min-h-[240px] w-full sm:aspect-[16/9]" role="presentation" aria-hidden="true">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={series} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="impactTrendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--color-volt)", stopOpacity: 0.28 }} />
            <stop offset="100%" style={{ stopColor: "var(--color-volt)", stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 6" stroke={chart.grid} vertical={false} />
        <XAxis dataKey="month" stroke={chart.axis} tick={chart.tick} tickLine={false} axisLine={false} dy={8} interval={0} minTickGap={4} />
        <YAxis stroke={chart.axis} tick={chart.tick} tickLine={false} axisLine={false} width={44} domain={[0, 1800]} ticks={[0, 600, 1200, 1800]} tickFormatter={(v: number) => nf.format(v)} />
        <Tooltip content={<TrendTip />} cursor={chart.cursor} animationDuration={chart.dur.fast} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={chart.series[0]}
          strokeWidth={2}
          fill="url(#impactTrendFill)"
          fillOpacity={1}
          connectNulls={false}
          dot={false}
          activeDot={{ r: 4, fill: "var(--color-volt)", stroke: "var(--color-void)", strokeWidth: 2 }}
          isAnimationActive={animate}
          animationDuration={chart.dur.slow}
          animationEasing="ease-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default ActivityTrendChart;
```

Count-up. Parser is the only non-trivial logic here, so it is a pure exported function with a dev self-check:

```tsx
// src/components/impact/AnimatedNumber.tsx
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

/** "1,248+" -> {1248,"+",0} · "3.6" -> {3.6,"",1} · "Basketball" -> null (passes straight through) */
export function parseStatValue(value: string) {
  const m = /^(\d[\d,]*(?:\.\d+)?)(.*)$/.exec(value);
  if (!m) return null;
  const digits = m[1].replace(/,/g, "");
  const dot = digits.indexOf(".");
  return { target: Number(digits), suffix: m[2], decimals: dot < 0 ? 0 : digits.length - dot - 1 };
}

if (import.meta.env.DEV) {
  const p = parseStatValue;
  console.assert(JSON.stringify(p("1,248+")) === '{"target":1248,"suffix":"+","decimals":0}');
  console.assert(JSON.stringify(p("12,540+")) === '{"target":12540,"suffix":"+","decimals":0}');
  console.assert(JSON.stringify(p("3.6")) === '{"target":3.6,"suffix":"","decimals":1}');
  console.assert(JSON.stringify(p("24")) === '{"target":24,"suffix":"","decimals":0}');
  console.assert(p("Basketball") === null && p("Most Participated") === null);
}

export function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const parsed = parseStatValue(value);
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) =>
    !parsed || v >= parsed.target
      ? value // final frame renders the SOURCE string verbatim — never a reformat
      : v.toLocaleString("en-IN", { minimumFractionDigits: parsed.decimals, maximumFractionDigits: parsed.decimals }) + parsed.suffix,
  );

  useEffect(() => {
    if (!parsed || !inView || reduced) return;
    const c = animate(mv, parsed.target, { duration: 1, ease: [0.22, 1, 0.36, 1] }); // --dur-hero, --ease-out-quint
    return () => c.stop();
  }, [inView, reduced, parsed?.target, mv]);

  // non-numeric ("Basketball") and reduced motion both render the string untouched
  if (!parsed || reduced) return <span ref={ref}>{value}</span>;
  return <motion.span ref={ref}>{text}</motion.span>;
}
```

The resting `0` is never seen: the cell is at `opacity 0` until the GSAP scrub, and under reduced motion the branch above returns the final string.

GSAP scene — the only other `gsap` import in the repo:

```ts
// src/components/impact/useImpactScrub.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useImpactScrub(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const mm = gsap.matchMedia();
    // no timeline at all under reduced motion -> no inline styles -> content renders final
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 0.72 }, // --ease-out-quint, --dur-slow
        scrollTrigger: { trigger: root.current, start: "top 82%", end: "top 42%", scrub: 0.72 },
      });
      tl.from(root.current!.querySelector("[data-stat-rule]"), { scaleX: 0, transformOrigin: "left center" }, 0)
        .from(root.current!.querySelectorAll("[data-stat-block]"), { yPercent: 18, opacity: 0, stagger: 0.18 }, 0);
    });
    // fonts swapping late shifts this below-fold section; refresh once
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert(); // kills timeline + ScrollTrigger and reverts all inline styles
  }, [root]);
}
```

Key class strings:

```tsx
<section id="impact" aria-labelledby="impact-title"
  className="relative isolate overflow-hidden mesh-teal [--mesh-strength:0.4] scroll-mt-24 bg-void py-(--space-section)">
  <div className="mx-auto w-full max-w-(--container) px-(--gutter)">

    <p className="text-eyebrow uppercase tracking-[0.2em] text-volt mb-5">
      <span aria-hidden="true" className="mr-3 inline-block h-px w-6 align-middle bg-volt" />IMPACT
    </p>

    <h2 id="impact-title"
      className="font-display text-display-l font-semibold tracking-[-0.03em] leading-[0.92] text-cream max-w-[18ch] lg:col-span-7">
      Participation is the only metric we care about.
    </h2>

    <p className="text-lead text-fg-muted max-w-[42ch] mt-6 lg:col-span-4 lg:col-start-9 lg:mt-0">…</p>

    <div data-stat-rule className="mt-16 h-px w-full origin-left bg-line-strong" />

    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-line lg:grid-cols-4">
      <div data-stat-block
        className="bg-deep p-5 transition-colors duration-(--dur-fast) ease-(--ease-out-quint) hover:bg-raised md:p-6 lg:p-8">
        <p className="font-display text-display-m font-semibold tabular-nums tracking-[-0.03em] leading-[0.92] text-volt mb-3">
          <AnimatedNumber value={card.value} />
        </p>
        <p className="text-meta uppercase tracking-[0.2em] text-fg-muted max-w-[14ch] mb-4">{card.title}</p>
        <span className="inline-flex items-center rounded-full border border-line-strong bg-abyss px-2.5 py-1 font-display text-meta tabular-nums text-cream-dim">
          {card.growth.replace(/ from last month$/, "")}
        </span>
      </div>
    </div>

    <p className="mt-4 text-meta text-fg-muted">Change since last month.</p>

    <Link to="/stats"
      className="group inline-flex min-h-[48px] w-full items-center justify-center border-b border-line-volt text-body text-volt transition-colors duration-(--dur-fast) ease-(--ease-out-quint) hover:border-volt hover:text-volt-600 lg:w-auto lg:justify-start lg:min-h-0">
      Full stats
      <span aria-hidden="true"
        className="ml-2 transition-transform duration-(--dur-fast) ease-(--ease-out-quint) group-hover:translate-x-[var(--lift)] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">→</span>
    </Link>
  </div>
</section>
```

---

**A11y**

- `<section id="impact" aria-labelledby="impact-title">`; the H2 is the only heading in the section (`h3` for the chart title inside the `<figure>`).
- Stat cells are plain `<div>`s, not list items and not buttons — numeral, label and chip read in DOM order: "1,248+ Active Students +12.5%". The `Change since last month.` caption follows the group so the bare `+12.5%` is explained.
- Chart wrapper is `role="presentation" aria-hidden="true"`. Recharts' `accessibilityLayer` is deliberately not used: the `<details>` `<table>` is the accessible representation and is strictly better than an arrow-key sweep. `<figure>` holds the chart, `<figcaption>` holds the title + subhead.
- `<table>` has a real `<caption>`, `scope="col"` on both `<th>`, one row per month, and `Not recorded` as text for December — never an empty cell.
- `<details>`/`<summary>` are native: `Enter`/`Space` toggle, `Tab` order is DOM order (summary → CTA), no ARIA needed. Native marker hidden via `[&::-webkit-details-marker]:hidden` and `list-none`; the chevron is `aria-hidden`.
- CTA is a real `<Link to="/stats">` — route exists at `src/routes/index.tsx:25`. Zero dead controls in this section; the only other interactive affordances are the tooltip (pointer-only, duplicated by the table) and the decorative cell hover.
- Focus: global `outline: 2px solid var(--color-volt); outline-offset: 3px` on `:focus-visible`, no local override. `min-h-[48px]` on `<summary>` and on the mobile CTA.
- Contrast on `--color-deep`: volt 13.6:1, fg 15.9:1, fg-muted 6.36:1, cream-dim 11.2:1. `--color-fg-faint` (3.07:1) is used only for the disabled axis `stroke` prop, the chevron glyph, and the `Not recorded` cell whose meaning is repeated in the subhead — never for load-bearing small text.
- `prefers-reduced-motion: reduce` yields a fully static section with final values on first paint.

---

**Acceptance**

1. `grep -rn "#8b5cf6\|#94a3b8\|#1e293b\|#06b6d4\|#3b82f6" src/components/charts/` returns nothing; every colour in the three chart files comes from `chartTokens.ts`.
2. The section renders exactly four `[data-stat-block]` elements, and the strings `Top Activity` and `Basketball` appear nowhere inside `#impact`.
3. `grep -rln "from \"gsap" src/` matches exactly two files: the `#focus` scene and `src/components/impact/useImpactScrub.ts`.
4. With `prefers-reduced-motion: reduce`, first paint shows `1,248+`, `12,540+`, `3.6`, `24` and no `[data-stat-block]` carries an inline `transform` or `opacity`.
5. The rendered trend line and fill terminate at `Nov`; the X axis shows 12 ticks including `Dec`; no marker, dot or fill exists above the `Dec` tick.
6. The `<details>` table has 12 `<tbody>` rows and its December value cell reads `Not recorded`.
7. Scrolling the section top from 82% to 42% of viewport height moves the four numerals from `yPercent 18 / opacity 0` to rest and reverses on scroll-up; no element is ever pinned and page scroll is never intercepted.
8. Volt appears only on: the eyebrow rule, the eyebrow text, four numerals, the area stroke + fill gradient, the legend dot, the CTA text/arrow/underline, and focus rings — measured under 10% of the viewport at 1440×900.

---

### Section 9 — Stories in motion

Eight frames of the season on a native snap rail, ratio-varied so it reads as an editorial reel and not a filmstrip, one tap from the full 15.

**Dependency deletions (do this in this section's PR).** `grep -rn "embla\|react-image-gallery" src/` returns **zero hits** today — both `embla-carousel-react@8.6.0` and `react-image-gallery@2.1.2` are installed and never imported. This rail is CSS scroll-snap; the lightbox is Radix `Dialog` (already installed via `radix-ui`). Remove both packages from `package.json` and re-lock. No carousel library ships.

**Canvas**

| Property | Value |
|---|---|
| Background token | `--color-void` |
| Mesh utility | `mesh-teal` (teal-500 bloom upper-right, volt bloom mid-left) |
| Mesh strength | `--mesh-strength: 0.28` — deliberately the weakest mesh on the page; photos are the only tonal noise here and a strong mesh muddies them |
| Bloom blur | `blur(80px)` ≥768, `blur(48px)` <768, on `::before`, never animated |
| Vertical padding | `padding-block: var(--space-section)` (clamp 5rem/11vh/9rem), both edges |
| Container behaviour | **Hybrid.** Header block + control row are inside `--container` (1280) with `--gutter`. The rail is **full-bleed** (`width: 100%`, no container) with `padding-inline-start: max(var(--gutter), calc((100vw - var(--container)) / 2))` so tile 01 aligns to the headline's left edge while the tail bleeds off the right viewport edge. |
| Top divider | None. Section 8 (`#impact`) sits on the `--color-abyss` band, so the drop back to `--color-void` is the separator. No `border-t`. |
| Edge fade | None. A `mask-image` right-edge fade would clip the volt focus ring on the last reachable tile — visual polish is not worth eating a focus indicator. |
| Grain | Global `body::after` only. Tiles add no local grain. |

**Wireframe**

```
DESKTOP >=1024  ·  12-col grid, container 1280, gutter clamp(1rem,4vw,2.5rem)
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2   3   4   5   6   7  │  8   9  10  11  12                          │
│  ┌─────────────────────────┐│      ┌──────────────────────┐               │
│  │ ● IN MOTION             ││      │ Fifteen frames from  │  ← cols 9-12  │
│  │                         ││      │ five venues: finals, │               │
│  │  Courts full, lanes     ││      │ meets, and the 5am   │               │
│  │  busy, nobody watching  ││      │ gym crowd.           │               │
│  │  the clock.             ││      │                      │               │
│  │                         ││      │ Full gallery ↗       │               │
│  └─────────────────────────┘│      └──────────────────────┘               │
│  ( ◇ PLACEHOLDER IMAGERY )  │                                             │
└───────────────────────────────────────────────────────────────────────────┘

FULL-BLEED RAIL  ·  ul = scroller  ·  snap-x mandatory  ·  items-end  ·  bleeds right
┌────────────────────────────────────────────────────────────────────────────
│  ┌──────────┐                  ┌──────────┐                  ┌──────────┐
│  │ 01       │                  │ 03       │                  │ 05       │
│  │          │  ┌────────────┐  │          │  ┌────────────┐  │          │
│  │  3/4     │  │ 02         │  │  3/4     │  │ 04         │  │  3/4     │
│  │  34vw    │  │  4/3 34vw  │  │  34vw    │  │  4/3 34vw  │  │  34vw    │  ▶
│  │          │  │            │  │          │  │            │  │          │
│  │ ▸BASKET… │  │ ▸SWIMMING  │  │ ▸FOOTB…  │  │ ▸GYM       │  │ ▸BADMI…  │
│  │ Inter-B… │  │ Aquatics…  │  │ Inter-H… │  │ Strength…  │  │ Tournam… │
│  └──────────┘  └────────────┘  └──────────┘  └────────────┘  └──────────┘
└────────────────────────────────────────────────────────────────────────────
   ↑ 40px gutter-aligned         ↑ gap 1.5rem               tiles 06-08 off-canvas →

┌───────────────────────────────────────────────────────────────────────────┐
│  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬────────────────────────────────────      ( ← )    ( → )   │
│  fill: volt    track: line-strong · 2px · rounded-full    48px    48px    │
└───────────────────────────────────────────────────────────────────────────┘

MOBILE <640  ·  single column, gutter 1rem
┌─────────────────────────┐
│ ● IN MOTION             │
│                         │
│  Courts full, lanes     │
│  busy, nobody watching  │
│  the clock.             │
│                         │
│  Fifteen frames from    │
│  five venues: finals,   │
│  meets, and the 5am     │
│  gym crowd.             │
│                         │
│ ( ◇ PLACEHOLDER IMAGE…) │
└─────────────────────────┘
┌──────────────────────────
│ ┌─────────────────────┐
│ │ 01                  │  ┌──
│ │                     │  │
│ │   3/4   ·   82vw    │  │ 02
│ │                     │  │ 4/3
│ │ ▸ BASKETBALL        │  │ 82vw
│ │ Inter-BITS Basket…  │  │  →
│ └─────────────────────┘  └──
└──────────────────────────
   no prev/next · no progress bar · gap 0.75rem
┌─────────────────────────┐
│ ┌─────────────────────┐ │
│ │  Full gallery    ↗  │ │  ← 48px tall, full width
│ └─────────────────────┘ │
└─────────────────────────┘
```

**Elements**

| Slot | Content | Type token | Color token | Surface/radius | Spacing | Notes |
|---|---|---|---|---|---|---|
| `section#gallery` | wrapper, `<section aria-labelledby="gallery-title">` | — | bg `--color-void` | none, `relative overflow-hidden` | `py-[var(--space-section)]` | `overflow-hidden` bounds the mesh bloom only; rail scroll is on the `ul`, unaffected |
| Mesh layer | `::before` from `mesh-teal` | — | `--color-teal-500` + `--color-volt` blooms | absolute inset-0, `-z-10` | — | `--mesh-strength:.28`, `pointer-events-none` |
| Eyebrow dot | 6px circle | — | `bg` `--color-volt` | `rounded-full`, 6×6px | `mr-3`, `mb-[0.15em]` inline-block | Decorative, `aria-hidden` |
| Eyebrow | `IN MOTION` | `--text-eyebrow`, `uppercase tracking-[0.2em]` | `--color-volt` | — | — | `font-sans font-medium` |
| Statement H2 | `Courts full, lanes busy, nobody watching the clock.` | `--text-display-l` | `--color-cream` | — | `mt-5`, cols 1-7 | `font-display font-semibold tracking-[-0.03em] leading-[0.92]`, `id="gallery-title"` |
| Lead | `Fifteen frames from five venues…` | `--text-lead` | `--color-fg-muted` | — | cols 9-12, `max-w-[62ch]`, self-end | — |
| Full-gallery link | `Full gallery` + `ArrowUpRight` 16px | `--text-meta`, `uppercase tracking-[0.2em]` | text `--color-fg`, icon `--color-volt`, underline `--color-line-volt` | `border-b`, `--radius-xs` on focus box | `mt-6`, `py-2`, min-h 48px on mobile | `<Link to="/gallery">`; hover: underline → `--color-volt`, icon `translate-x-[2px] -translate-y-[2px]` |
| Mock chip | `◇ PLACEHOLDER IMAGERY` (diamond = 6px rotated square) | `--text-eyebrow`, `uppercase tracking-[0.2em]` | text `--color-fg-muted`, border `--color-line-strong`, diamond `--color-teal-300` | `border`, `rounded-full` | `px-3 py-1.5`, `mt-8` | Mandatory: stock Unsplash frames must not read as campus photography |
| Rail parallax wrapper | `motion.div` | — | — | none | full-bleed | Only element carrying the parallax `x`; transform on a non-scrolling wrapper leaves internal snap maths pixel-exact |
| Rail | `<ul role="list">`, the scroller | — | — | none | `flex items-end`, gap `0.75rem` / `1rem` (md) / `1.5rem` (xl) | `overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar rail-inset`; `items-end` aligns every caption to one baseline and leaves the top edge ragged |
| Tile `li` | one per reel entry | — | — | none | `shrink-0 snap-start` w `82vw` / `60vw` (md) / `34vw` (xl) | Width is the only responsive knob; ratio comes from index parity |
| Tile button | `<button type="button">` | — | — | `--radius-lg`, bg `--color-deep`, `border` `--color-line` | `block w-full text-left` | `aria-haspopup="dialog"`; hover border → `--color-line-strong`; name = sr-only "Open image: " + activity + caption |
| Frame | ratio box | — | bg `--color-deep` (poster placeholder) | `--radius-lg`, `overflow-hidden`, `relative` | `aspect-[3/4]` on odd tiles (01,03,05,07), `aspect-[4/3]` on even | Fixed ratio = photo swap with zero layout change |
| Image | `<img alt="">` | — | — | `absolute inset-0`, `object-cover` | — | `loading="lazy" decoding="async"`, explicit `width`/`height` (600×800 or 800×600) to kill CLS; URL gets `?auto=format&fit=crop&w=900&q=70` |
| Scrim | tonal gradient | — | `--color-void` via `color-mix` | `absolute inset-0` | — | `to top`: 92% void → 55% at 38% → transparent at 68%. Guarantees caption contrast on any replacement photo |
| Index numeral | `01`…`08` | `--text-eyebrow`, `tabular-nums` | `--color-fg-muted` | — | `absolute top-4 left-4` | `font-display`; `--color-fg-faint` fails AA on scrimmed photo, so muted |
| Tile eyebrow | activity name, uppercase | `--text-eyebrow`, `uppercase tracking-[0.2em]` | `--color-volt` | — | `absolute bottom-4 left-4 right-4`, above caption | Preceded by `▸`-style 4px volt triangle? No — plain text, the volt is the accent |
| Tile caption | `mockGallery` caption verbatim | `--text-body` | `--color-fg` | — | `mt-1.5`, `pr-4`, `line-clamp-1` | Never truncated with an ellipsis char in markup; CSS clamp only |
| Hover hairline | 2px bar, bottom-left of frame, width 0 → 40% | — | `--color-volt` | — | `absolute bottom-0 left-0 h-[2px]` | Opacity+scaleX only; `origin-left` |
| Image error fallback | frame keeps `--color-deep` + `mesh-teal` at `.5`, caption stays | `--text-body` | `--color-fg-muted` | `--radius-lg` | — | `onError` sets local `failed` state on that tile, hides `<img>`; blueprint requires an image-error state |
| Progress track | 2px rule, ≥1024 only | — | `--color-line-strong` | `rounded-full` | `mt-10`, `flex-1`, container width | `aria-hidden` — it duplicates scroll position |
| Progress fill | volt bar | — | `--color-volt` | `rounded-full` | `h-full w-full origin-left` | `style={{ scaleX: progress }}` motion value |
| Prev / Next | circular icon buttons, ≥1024 only | icon 20px | icon `--color-ink`, bg `--color-volt`, pressed `--color-volt-600`; disabled bg `--color-raised` + icon `--color-fg-faint` | `rounded-full`, 48×48px | `ml-6`, `gap-3` | `ChevronLeft`/`ChevronRight`; `aria-label="Previous images"` / `"Next images"`; `disabled` at each scroll end |
| Controls row | flex, ≥1024 only | — | — | — | container, `mt-10`, `items-center` | Hidden entirely when `scrollWidth <= clientWidth` |
| Mobile CTA | duplicate `Full gallery` link | `--text-meta` | as header link | `border` `--color-line-strong`, `--radius-sm` | `mt-8 mx-[var(--gutter)] h-12 w-auto` | Header link is `hidden`, this one `md:hidden` — one control, two compositions, never both visible |

**Copy**

```
EYEBROW        IN MOTION

STATEMENT      Courts full, lanes busy, nobody watching the clock.

LEAD           Fifteen frames from five venues: finals, meets, and the 5am gym crowd.

CHIP           Placeholder imagery

LINK           Full gallery

TILE CAPTIONS  (verbatim from mockGallery — do not rewrite)
  01  BASKETBALL   Inter-BITS Basketball Finals
  02  SWIMMING     Aquatics Meet
  03  FOOTBALL     Inter-Hostel Match
  04  GYM          Strength Training Session
  05  BADMINTON    Tournament Finals
  06  SWIMMING     Training Lanes
  07  BASKETBALL   Team Huddle
  08  GYM          Fitness Challenge

SR-ONLY        Open image:            (prefix inside each tile button)
ARIA           Previous images
ARIA           Next images
EMPTY STATE    Frames are being sorted. The full archive stays open.
IMG FALLBACK   Image unavailable
```

**Layout**

| Breakpoint | Header grid | Rail | Tile width | Gap | Ratios | Controls |
|---|---|---|---|---|---|---|
| ≥1280 (xl) | 12 cols, `gap-x-6`; eyebrow+H2 cols 1-7, lead+link cols 9-12 `self-end` | full-bleed, left inset `calc((100vw - 1280px)/2)` | `34vw` (435px @1440) | `1.5rem` | odd `3/4` → 580px tall, even `4/3` → 326px tall | progress bar + 48px prev/next |
| 1024-1279 (lg) | same 12 cols, inset = `--gutter` | full-bleed, left inset `--gutter` | `60vw` | `1rem` | same parity rule | progress bar + prev/next |
| 768-1023 (md) | 12 cols → H2 cols 1-9, lead cols 1-8 stacked below (`mt-6`) | full-bleed | `60vw` | `1rem` | same | none (touch) |
| <768 | single column, `px-[var(--gutter)]` | full-bleed, left inset `1rem` | `82vw` | `0.75rem` | same — portrait 425px, landscape 240px @390px | none; mobile CTA button instead |

Row heights are unequal by design (`items-end`); the container never sets a fixed height, so a photo swap at the same ratio changes nothing.

**Data**

Selector: `getGalleryFor("activity", slug)` from `src/lib/content.ts`. No new selector, no new mock file, no date formatting — this section touches neither `format.ts` nor `getActivityCategories`.

```ts
// src/sections/GalleryReel/reel.ts
// ponytail: hand-curated order, 8 of 15. Editorial pick, not an algorithm.
export const REEL = [
  { slug: "basketball", imageId: 1 },
  { slug: "swimming",   imageId: 2 },
  { slug: "football",   imageId: 2 },
  { slug: "gym",        imageId: 1 },
  { slug: "badminton",  imageId: 3 },
  { slug: "swimming",   imageId: 3 },
  { slug: "basketball", imageId: 3 },
  { slug: "gym",        imageId: 3 },
] as const;
```

Rendered records, given the ground-truth mock:

| # | Ratio | Activity label | Caption | Unsplash photo id | Category |
|---|---|---|---|---|---|
| 01 | 3/4 | Basketball | Inter-BITS Basketball Finals | `photo-1546519638-68e109498ffc` | Sports |
| 02 | 4/3 | Swimming | Aquatics Meet | `photo-1438029071396-1e831a7fa6d8` | Fitness |
| 03 | 3/4 | Football | Inter-Hostel Match | `photo-1486286701208-1d58e9338013` | Sports |
| 04 | 4/3 | Gym | Strength Training Session | `photo-1517836357463-d25dfeac3438` | Fitness |
| 05 | 3/4 | Badminton | Tournament Finals | `photo-1613918431703-aa50854e44c6` | Sports |
| 06 | 4/3 | Swimming | Training Lanes | `photo-1560090995-01632a28895b` | Fitness |
| 07 | 3/4 | Basketball | Team Huddle | `photo-1574623452334-1e0ac2b3ccb4` | Sports |
| 08 | 4/3 | Gym | Fitness Challenge | `photo-1583454110551-21f2fa2afe61` | Fitness |

Selection rules, all three satisfied by the order above: (1) all five activity slugs appear; (2) category alternates Sports → Fitness for all eight, so the reel never sits in one world for two tiles; (3) no activity repeats adjacently. Ratio is derived, not authored: `i % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"`.

Excluded 7 — captions that name a generic condition rather than an occasion: `basketball#2 Practice Session`, `football#1 Evening Football Training`, `football#3 Championship Game` (Football's beat already spent on 03), `gym#2 Workout Area`, `swimming#1 Swimming Practice`, `badminton#1 Badminton Court`, `badminton#2 Practice Match`. All 15 remain reachable at `/gallery` and `/gallery/:slug`.

Activity labels come from `getActivityBySlug(slug)!.name` — `Basketball`, `Football`, `Swimming`, `Gym`, `Badminton`. Do not hardcode; do not write `Gym & Fitness` (that string only exists in `mockStats.topActivities`).

Dates: none in this section, so 2026-08-05 and the past/today event split are irrelevant here.

Empty case: `REEL.map` drops entries whose `getGalleryFor` lookup misses. If **0** tiles resolve, the rail, progress bar and prev/next are not rendered and the lead paragraph is replaced by `Frames are being sorted. The full archive stays open.` in `--text-lead` / `--color-fg-muted`; the `Full gallery` link stays. If **1-7** tiles resolve, the rail renders as-is and the whole controls row is hidden by the `scrollWidth > clientWidth` check — no separate small-set layout.

**Motion**

| Effect | Layer | Trigger | From → To | Duration | Easing | Stagger | Reduced motion |
|---|---|---|---|---|---|---|---|
| Header block reveal | Motion (`whileInView`, `once: true`, `margin: "-12% 0px"`) | section enters viewport | `opacity 0, y var(--reveal-y)` → `opacity 1, y 0` | `--dur-slow` | `--ease-out-quint` | `staggerChildren: 0.09` (= `--dur-fast` ÷ 2) across eyebrow → H2 → lead → link → chip | opacity only, `y: 0`, `--dur-fast` |
| Tile entrance | Motion, variants on `li` | rail enters viewport, `once: true` | `opacity 0, y var(--reveal-y)` → `opacity 1, y 0` | `--dur-slow` | `--ease-out-quint` | `staggerChildren: 0.09`, first 4 only (tiles 5-8 mount already at rest — they are off-canvas and staggering them wastes 400ms of nothing) | opacity only, no `y`, no stagger |
| Rail x parallax | Motion values only (`useScroll` + `useTransform` + `useSpring`) | section scroll progress, offset `["start end", "end start"]` | `x: +40px → -40px` (≥1280), `+24px → -24px` (768-1279), `0` (<768) | `--dur-slow` (spring `duration: 720, bounce: 0`) | spring, no keyframe easing | — | `x` pinned to `0`; hook still mounts, amplitude is 0 |
| Progress fill | Motion value, `scaleX` | `onScroll` of the rail (event-driven, zero React re-render) | `scaleX 0 → 1` | none — 1:1 with scroll | none | — | Retained; it is a position indicator, not decoration |
| Snap + prev/next travel | CSS `scroll-behavior: smooth` + `scrollBy` | pointer drag, wheel, prev/next click, keyboard arrows | one page = `clientWidth × 0.8` | UA-controlled | UA-controlled | — | `.reel-rail { scroll-behavior: auto }` under `prefers-reduced-motion: reduce` → instant jump, snap still enforced |
| Tile hover lift | CSS transition on `button` | `:hover` (≥1024, hover-capable only) | `translateY 0 → calc(var(--lift) * -1)`, border `--color-line` → `--color-line-strong` | `--dur-std` | `--ease-out-quint` | — | Transform dropped, border colour change retained |
| Image hover zoom | CSS transition on `img` | group hover | `scale 1 → 1.03` | `--dur-slow` | `--ease-out-quint` | — | Dropped entirely |
| Scrim lift on hover/focus | CSS transition | group hover / `:focus-visible` | `opacity 1 → 0.78` | `--dur-std` | `--ease-out-quint` | — | Retained (opacity only) |
| Hover hairline | CSS transition | group hover / `:focus-visible` | `scaleX 0 → 1` (width 40%), `opacity 0 → 1` | `--dur-std` | `--ease-out-quint` | — | Opacity only, `scaleX: 1` immediately |
| Prev/next press | Motion `whileTap` | pointer/keyboard activate | `scale 1 → 0.96` | `--dur-fast` | `--ease-in-out-quart` | — | No scale; `bg` → `--color-volt-600` instead |
| Focus ring | CSS, none | `:focus-visible` | instant | — | — | — | Never animated, never delayed |
| Lightbox open | Motion, owned by `GalleryLightbox` | tile activate | `opacity 0, scale 0.98` → `1, 1` | `--dur-std` | `--ease-out-quint` | — | Opacity only |

No GSAP here. The two ScrollTrigger scenes are `#focus` and `#impact`; this section is `motion` + CSS only. No IntersectionObserver loop to pause — nothing loops.

**Code**

```css
/* src/index.css */
@utility no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
}

@utility rail-inset {
  padding-inline-start: max(var(--gutter), calc((100vw - var(--container)) / 2));
  padding-inline-end: var(--gutter);
  scroll-padding-inline-start: max(var(--gutter), calc((100vw - var(--container)) / 2));
}

.reel-rail { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  .reel-rail { scroll-behavior: auto; }
}
```

```tsx
// src/sections/GalleryReel/GalleryReel.tsx  (excerpts)
const sectionRef = useRef<HTMLElement>(null);
const railRef = useRef<HTMLUListElement>(null);
const reduce = useReducedMotion();

// ponytail: amplitude read once at mount, not resize-reactive. Ceiling: a desktop
// user who resizes across 1280 keeps the old amplitude until reload. Add a
// matchMedia listener only if that ever matters.
const amp = reduce ? 0
  : window.matchMedia("(min-width:1280px)").matches ? 40
  : window.matchMedia("(min-width:768px)").matches ? 24
  : 0;

const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end start"],
});
const rawX = useTransform(scrollYProgress, [0, 1], [amp, -amp]);
const x = useSpring(rawX, { duration: 720, bounce: 0 }); // 720ms = --dur-slow

const progress = useMotionValue(0);
const [overflows, setOverflows] = useState(false);
const [atStart, setAtStart] = useState(true);
const [atEnd, setAtEnd] = useState(false);

const sync = useCallback(() => {
  const el = railRef.current;
  if (!el) return;
  const max = el.scrollWidth - el.clientWidth;
  progress.set(max > 0 ? el.scrollLeft / max : 0);   // motion value, no re-render
  setAtStart(el.scrollLeft <= 1);
  setAtEnd(el.scrollLeft >= max - 1);
  setOverflows(max > 1);
}, [progress]);

useEffect(sync, [sync]);                              // once, after layout

const page = (dir: 1 | -1) => {
  const el = railRef.current;
  el?.scrollBy({ left: dir * el.clientWidth * 0.8 }); // CSS owns smoothness
};

const src = (url: string) => `${url}?auto=format&fit=crop&w=900&q=70`;
```

```tsx
<section id="gallery" ref={sectionRef} aria-labelledby="gallery-title"
  className="relative overflow-hidden mesh-teal bg-void py-[var(--space-section)]
             [--mesh-strength:0.28]">

  {/* header: container + 12 cols */}
  <div className="mx-auto grid max-w-[var(--container)] grid-cols-12 gap-x-6
                  px-[var(--gutter)]">
    <div className="col-span-12 xl:col-span-7">
      <p className="text-eyebrow font-medium uppercase tracking-[0.2em] text-volt">
        <span aria-hidden className="mr-3 inline-block size-1.5 rounded-full bg-volt" />
        In motion
      </p>
      <h2 id="gallery-title"
          className="mt-5 font-display text-display-l font-semibold leading-[0.92]
                     tracking-[-0.03em] text-cream">
        Courts full, lanes busy, nobody watching the clock.
      </h2>
      <span className="mt-8 inline-flex items-center gap-2 rounded-full border
                       border-line-strong px-3 py-1.5 text-eyebrow uppercase
                       tracking-[0.2em] text-fg-muted">
        <span aria-hidden className="size-1.5 rotate-45 bg-teal-300" />
        Placeholder imagery
      </span>
    </div>
    <div className="col-span-12 mt-6 xl:col-span-4 xl:col-start-9 xl:mt-0 xl:self-end">
      <p className="max-w-[62ch] text-lead text-fg-muted">
        Fifteen frames from five venues: finals, meets, and the 5am gym crowd.
      </p>
      <Link to="/gallery"
        className="mt-6 hidden items-center gap-2 border-b border-line-volt pb-1
                   text-meta uppercase tracking-[0.2em] text-fg
                   transition-colors duration-[var(--dur-std)]
                   ease-[var(--ease-out-quint)] hover:border-volt md:inline-flex">
        Full gallery
        <ArrowUpRight className="size-4 text-volt" aria-hidden />
      </Link>
    </div>
  </div>

  {/* rail: full-bleed, parallax on the wrapper so snap maths stay exact */}
  <motion.div style={{ x }} className="mt-12 xl:mt-16">
    <motion.ul role="list" ref={railRef} onScroll={sync}
      initial="rest" whileInView="in" viewport={{ once: true, margin: "-12% 0px" }}
      variants={{ in: { transition: { staggerChildren: 0.09 } } }}
      className="reel-rail rail-inset no-scrollbar flex items-end gap-3
                 overflow-x-auto snap-x snap-mandatory md:gap-4 xl:gap-6">
      {tiles.map((t, i) => (
        <motion.li key={`${t.slug}-${t.image.id}`}
          variants={{
            rest: { opacity: 0, y: reduce ? 0 : 24 },
            in: { opacity: 1, y: 0,
                  transition: { duration: reduce ? 0.18 : 0.72,
                                ease: [0.22, 1, 0.36, 1] } },
          }}
          className="shrink-0 snap-start w-[82vw] md:w-[60vw] xl:w-[34vw]">
          <button type="button" aria-haspopup="dialog"
            onClick={() => setOpenIndex(i)}
            className="group block w-full rounded-lg border border-line bg-deep
                       text-left transition-[transform,border-color]
                       duration-[var(--dur-std)] ease-[var(--ease-out-quint)]
                       hover:border-line-strong
                       motion-safe:hover:-translate-y-[var(--lift)]">
            <div className={cn(
              "relative overflow-hidden rounded-lg bg-deep",
              i % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/3]")}>
              {!failed[i] && (
                <img src={src(t.image.imageUrl)} alt=""
                  width={i % 2 === 0 ? 600 : 800} height={i % 2 === 0 ? 800 : 600}
                  loading="lazy" decoding="async"
                  onError={() => markFailed(i)}
                  className="absolute inset-0 size-full object-cover
                             transition-transform duration-[var(--dur-slow)]
                             ease-[var(--ease-out-quint)]
                             motion-safe:group-hover:scale-[1.03]" />
              )}
              <span aria-hidden className="absolute inset-0 transition-opacity
                duration-[var(--dur-std)] ease-[var(--ease-out-quint)]
                group-hover:opacity-[0.78] group-focus-visible:opacity-[0.78]
                bg-[linear-gradient(to_top,color-mix(in_oklab,var(--color-void)_92%,transparent),color-mix(in_oklab,var(--color-void)_55%,transparent)_38%,transparent_68%)]" />
              <span aria-hidden className="absolute bottom-0 left-0 h-[2px] w-[40%]
                origin-left scale-x-0 bg-volt opacity-0 transition
                duration-[var(--dur-std)] ease-[var(--ease-out-quint)]
                group-hover:scale-x-100 group-hover:opacity-100
                group-focus-visible:scale-x-100 group-focus-visible:opacity-100" />
              <span className="absolute left-4 top-4 font-display text-eyebrow
                               tabular-nums text-fg-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="absolute inset-x-4 bottom-4">
                <span className="block text-eyebrow uppercase tracking-[0.2em] text-volt">
                  {t.activityName}
                </span>
                <span className="mt-1.5 block line-clamp-1 text-body text-fg">
                  <span className="sr-only">Open image: </span>
                  {failed[i] ? "Image unavailable — " : ""}{t.image.caption}
                </span>
              </span>
            </div>
          </button>
        </motion.li>
      ))}
    </motion.ul>
  </motion.div>

  {/* controls: desktop only, hidden when the rail does not overflow */}
  {overflows && (
    <div className="mx-auto mt-10 hidden max-w-[var(--container)] items-center
                    px-[var(--gutter)] lg:flex">
      <span aria-hidden className="h-[2px] flex-1 rounded-full bg-line-strong">
        <motion.span style={{ scaleX: progress }}
          className="block h-full w-full origin-left rounded-full bg-volt" />
      </span>
      <div className="ml-6 flex gap-3">
        <motion.button type="button" onClick={() => page(-1)} disabled={atStart}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          aria-label="Previous images"
          className="grid size-12 place-items-center rounded-full bg-volt text-ink
                     transition-colors duration-[var(--dur-fast)]
                     ease-[var(--ease-in-out-quart)] active:bg-volt-600
                     disabled:bg-raised disabled:text-fg-faint">
          <ChevronLeft className="size-5" aria-hidden />
        </motion.button>
        {/* Next: same, dir 1, disabled={atEnd}, aria-label="Next images" */}
      </div>
    </div>
  )}

  <Link to="/gallery"
    className="mx-[var(--gutter)] mt-8 flex h-12 items-center justify-between
               rounded-sm border border-line-strong px-4 text-meta uppercase
               tracking-[0.2em] text-fg md:hidden">
    Full gallery <ArrowUpRight className="size-4 text-volt" aria-hidden />
  </Link>

  <GalleryLightbox items={tiles} index={openIndex} onIndexChange={setOpenIndex}
    onClose={() => setOpenIndex(null)} />
</section>
```

`GalleryLightbox` is the renamed, hardened `src/pages/Gallery/GalleryImageDialog.tsx` (currently hardcodes `bg-[#09111f]`, `border-white/10`, `text-slate-300` — all three die). It takes the whole ordered `items` array plus an index so ←/→ paging works from the reel and from `/gallery/:slug` with one component. Its full spec lives in the gallery-route chapter; this section only owns the trigger contract: `items`, `index`, `onIndexChange`, `onClose`, and returning focus to the tile button that opened it.

**A11y**

| Concern | Rule |
|---|---|
| Semantics | `<section aria-labelledby="gallery-title">`; H2 is the only heading; rail is `<ul role="list">` (the `role` survives Tailwind's `list-style: none` reset in Safari), one `<li>` per tile |
| Tile control | Real `<button type="button">`, never a div-with-onClick, never a `<Link>` — it opens a dialog, it does not navigate. `aria-haspopup="dialog"`. Accessible name = `"Open image: {caption}"` from visible text + `sr-only` prefix; the activity eyebrow is inside the button so it joins the name. `<img alt="">` so the photo never duplicates that name |
| Keyboard | Tab reaches every tile in DOM order; the rail scrolls the focused tile into view automatically because `scroll-snap` + focus scrolling cooperate. Arrow keys scroll the rail natively once it has focus. Enter/Space opens the lightbox. Esc inside the lightbox closes and returns focus to the originating tile button |
| Focus | Global ring only: `outline: 2px solid var(--color-volt); outline-offset: 3px`. Never `outline-none`. No edge mask and no `overflow-hidden` on the rail's inline axis, so a ring at the viewport edge is never clipped — the rail scrolls the tile fully into view first |
| Controls | Prev/next are `disabled` at the ends, not hidden, so their position is stable. `aria-label` on each. Progress bar is `aria-hidden` (redundant with scroll position, not a slider) |
| Mock disclosure | The `Placeholder imagery` chip is real text in the flow, not a `title` attribute or a hover-only tooltip |
| Contrast | Caption `--color-fg` on the 92%-void scrim ≥ 12:1 regardless of photo. Index numeral uses `--color-fg-muted` (≈7.7:1 on void), **not** `--color-fg-faint` (≈3.7:1, fails AA). Volt eyebrow on void ≥ 15:1. Chip text `--color-fg-muted`, border `--color-line-strong` |
| Reduced motion | Parallax amplitude 0, no entrance `y`, no hover transform, no image zoom, `scroll-behavior: auto`. Opacity transitions and the progress fill stay |
| Touch | Tile buttons are ≥240px tall. Mobile CTA is 48px. Prev/next 48×48, desktop only. No hover-only meaning: the caption and activity label are always visible, hover only lifts the scrim |

**Acceptance**

1. `grep -rn "embla\|react-image-gallery" .` returns hits in no file other than `package-lock.json` before removal, and zero hits after; `package.json` lists neither and `npm run build` passes.
2. The rail scrolls with `overflow-x-auto` + `snap-x snap-mandatory`; disabling JavaScript still leaves a fully scrollable, snapping reel with all 8 captions readable.
3. Tiles 01-08 render in the documented order with `aspect-[3/4]` on 01/03/05/07 and `aspect-[4/3]` on 02/04/06/08, every one of the 5 activity slugs present, and no two adjacent tiles from the same activity.
4. Every tile is a `<button type="button">` whose accessible name begins `Open image:` and whose `<img>` has `alt=""`; activating any tile opens `GalleryLightbox` at that index, and Esc returns focus to that same button.
5. React DevTools Profiler records **zero** renders of the section component while scrolling the page or the rail, with the progress bar still tracking scroll position.
6. At ≥1280 the parallax `x` measures +40px at section-enter and −40px at section-exit; with `prefers-reduced-motion: reduce` it measures 0px at both, and the rail jumps instead of gliding on prev/next.
7. No scrollbar is visible on the rail in Chrome, Safari or Firefox, and no element in the section carries a raw hex, a `shadow-[...]`, or a radius outside the six tokens.

---

### Section 10 — Achievements

`id="wins"` — three named results as a flat editorial list, so the page can exhale after two immersive scenes and hand the visitor one link to the full archive.

This is the payoff of the density alternation. `#focus` is pinned and loud, `#impact` is scrubbed and loud; `#wins` is a quiet typographic ledger — no mesh, no bloom, no media, no cards. Rules and negative space only. If this section looks "unfinished" next to its neighbours, it is working.

**Canvas**

| Property | Value |
|---|---|
| Background token | `bg-deep` (`--color-deep`) — flat fill, no gradient |
| Mesh utility | none — deliberate. Mesh utilities are authored on `--color-void`; this band is the flat beat between two atmospheric ones |
| Mesh strength | n/a (`--mesh-strength` not set here) |
| Vertical padding | `py-(--space-section)` → `clamp(5rem,11vh,9rem)` top and bottom |
| Container | `mx-auto w-full max-w-(--container) px-(--gutter)`. Rows stay inside the container; only the hover fill + row rule bleed `1.25rem` each side via `-mx-5 px-5` |
| Section rule | none at top or bottom — the `border-t` on row 1 and `border-b` on the link row are the only horizontals |
| Global grain | inherited from `body::after`. No section-local texture |

**Wireframe**

DESKTOP >=1024  ·  12-col grid, container 1280, gutter clamp(1rem,4vw,2.5rem)
```
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2   3   4   5   6   7  │  8   9  10  11  12                          │
│                                                                           │
│  ┌─────────────────────────┐│  ┌──────────────────────────────────┐       │
│  │ ▸ RESULTS               ││  │ Five results across four levels. │       │
│  │                         ││  │ The three most recent are here.  │       │
│  │  Names on the           ││  └──────────────────────────────────┘       │
│  │  board.                 ││     ← lead, cols 9-12, bottom-aligned       │
│  └─────────────────────────┘│                                             │
│                                                                           │
│  ─── border-t border-line ────────────────────────────────────────────    │
│ ▌  2026    Karan Patel                              ┌────────────┐        │
│ ▌          Campus Fitness Challenge Winner          │   CAMPUS   │        │
│ ▌          Gym · 15 Jan 2026                        └────────────┘        │
│  ─── border-t border-line ────────────────────────────────────────────    │
│    2025    Arjun Mehta                              ┌──────────────┐      │
│            Inter-BITS Football Champions            │   NATIONAL   │      │
│            Football · 12 Oct 2025                   └──────────────┘      │
│  ─── border-t border-line ────────────────────────────────────────────    │
│    2025    Ananya Verma                             ┌───────────┐         │
│            State Aquatics Gold Medal                │   STATE   │         │
│            Swimming · 22 Aug 2025                   └───────────┘         │
│  ─── border-t border-line ────────────────────────────────────────────    │
│    +2      All achievements                                        →      │
│  ─── border-b border-line ────────────────────────────────────────────    │
│  ↑ 5.5rem  ↑ 1fr                                          auto ↑          │
└───────────────────────────────────────────────────────────────────────────┘
```
`▌` = the 3px volt bar, hover/focus-within only. It is never present at rest.

MOBILE <640  ·  single column, gutter 1rem
```
┌─────────────────────────┐
│ ▸ RESULTS               │
│  Names on the board.    │
│                         │
│  Five results across    │
│  four levels. The three │
│  most recent are here.  │
│ ────────────────────────│
│  2026     ┌───────────┐ │
│           │  CAMPUS   │ │
│           └───────────┘ │
│  Karan Patel            │
│  Campus Fitness         │
│  Challenge Winner       │
│  Gym · 15 Jan 2026      │
│ ────────────────────────│
│  2025     ┌───────────┐ │
│           │ NATIONAL  │ │
│           └───────────┘ │
│  Arjun Mehta            │
│  Inter-BITS Football    │
│  Champions              │
│  Football · 12 Oct 2025 │
│ ────────────────────────│
│  ⋯ row 3 (2025, Ananya  │
│    Verma, STATE) same   │
│ ────────────────────────│
│  +2   All achievements →│
│ ────────────────────────│
└─────────────────────────┘
```

**Elements**

| Slot | Content | Type token | Color token | Surface/radius | Spacing | Notes |
|---|---|---|---|---|---|---|
| `section#wins` | wrapper | — | `bg-deep` | no radius, no shadow | `py-(--space-section)` | `aria-labelledby="wins-title"`. `scroll-mt-24` for anchor nav |
| container | width cage | — | — | — | `max-w-(--container) mx-auto px-(--gutter)` | — |
| header grid | eyebrow+headline / lead | — | — | — | `grid lg:grid-cols-12 gap-6 mb-14 lg:mb-20` | Headline block cols 1-7, lead cols 9-12 |
| eyebrow | `RESULTS` | `--text-eyebrow` uppercase `tracking-[0.2em]` | `text-volt` | — | `mb-5` | `font-sans font-medium`. Not a heading element |
| eyebrow mark | `▸` glyph | `--text-eyebrow` | `text-volt` | — | `mr-2` | `aria-hidden="true"`, decorative |
| headline | `Names on the board.` | `--text-display-l` | `text-fg` | — | — | `font-display font-semibold tracking-[-0.03em] leading-[0.92]`, `<h2 id="wins-title">`, `max-w-[14ch]` |
| lead | 2-sentence count line | `--text-lead` | `text-fg-muted` | — | `max-w-[38ch] lg:self-end lg:pb-2` | `font-sans`. Bottom-aligned to headline baseline on `lg` |
| list | `<ol>` | — | — | — | no gap (rules provide rhythm) | `role` implicit list; `list-none` |
| row `<li>` | one achievement | — | `hover:bg-raised/40` | `border-t border-line`, no radius | `py-6 -mx-5 px-5` | `relative isolate overflow-hidden group grid grid-cols-[5.5rem_1fr_auto] gap-x-8 items-start`. Non-interactive |
| row volt bar | 3px vertical bar | — | `bg-volt` | no radius | `absolute inset-y-0 left-0 w-[3px]` | `-translate-x-full group-hover:translate-x-0 group-focus-within:translate-x-0`. Decorative |
| year | `2026` / `2025` / `2025` | `--text-title` | `text-volt` | — | col 1, `pt-0.5` | `font-display font-semibold tabular-nums tracking-[-0.03em]`. Repeated years are NOT suppressed |
| student name | `Karan Patel` | `--text-title` | `text-fg` | — | col 2 | `font-display font-semibold tracking-[-0.03em] leading-[1.1]`. Plain text, never a link |
| achievement title | `Campus Fitness Challenge Winner` | `--text-body` | `text-fg-muted` | — | `mt-1.5 max-w-[52ch]` | `font-sans` |
| meta line | `Gym · 15 Jan 2026` | `--text-meta` | `text-fg-muted` | — | `mt-3` | `font-sans`. `fg-faint` measures 3.2:1 on `deep` — below AA at 13px, so meta uses `fg-muted` |
| meta separator | `·` | `--text-meta` | `text-fg-faint` | — | `mx-2` | `aria-hidden="true"`, non-essential — the only `fg-faint` use in the section |
| date | `15 Jan 2026` | `--text-meta` | inherits `fg-muted` | — | inline | `<time dateTime={achievedAt}>`, rendered by `formatDate`. Never raw ISO |
| level chip — National | `NATIONAL` | `--text-eyebrow` uppercase `tracking-[0.2em]` | `bg-volt text-ink` | `rounded-full`, `border border-transparent` | col 3, `px-3.5 py-1.5` | `font-sans font-semibold`. Filled = top tier. No glow, no pulse |
| level chip — State | `STATE` | `--text-eyebrow` uppercase `tracking-[0.2em]` | `text-volt` on transparent | `rounded-full`, `border border-line-volt` | `px-3.5 py-1.5` | `font-sans font-medium`. Volt outline = tier 2 |
| level chip — Inter-NIT | `INTER-NIT` | `--text-eyebrow` uppercase `tracking-[0.2em]` | `text-cream-dim` on transparent | `rounded-full`, `border border-line-strong` | `px-3.5 py-1.5` | `font-sans font-medium`. Tier 3. Not rendered on the home page (see Data) |
| level chip — Campus | `CAMPUS` | `--text-eyebrow` uppercase `tracking-[0.2em]` | `text-fg-muted` on transparent | `rounded-full`, `border border-line` | `px-3.5 py-1.5` | `font-sans font-medium`. Weakest border, weakest text = tier 4 |
| chip sr-label | `Level:` | — | — | — | — | `sr-only` prefix inside the chip so the acronym reads in context |
| `imageUrl` | not rendered | — | — | — | — | Zero records populate it. No slot, no ratio frame, no placeholder reserved |
| link row `<li>` | archive link | — | `hover:bg-raised/40` | `border-t border-b border-line` | `py-6 -mx-5 px-5` | Same 3-col grid so `+2` / label / arrow align to the rows above |
| link counter | `+2` | `--text-title` | `text-fg-faint` | — | col 1 | `font-display tabular-nums`. `total - shown`; hidden when `<= 0` |
| link label | `All achievements` | `--text-title` | `text-fg` `group-hover:text-volt` | — | col 2 | `<Link to="/achievements">` — the whole row content is the link target |
| link arrow | `→` | `--text-title` | `text-volt` | — | col 3, `pr-1` | `aria-hidden="true"`. Nudges `--lift` (4px) right on hover |
| link volt bar | 3px vertical bar | — | `bg-volt` | — | `absolute inset-y-0 left-0 w-[3px]` | Identical to row bar, so the link reads as the 4th row |

**Copy**

```
EYEBROW      RESULTS

HEADLINE     Names on the board.

LEAD         Five results across four levels. The three most recent are here.

ROW 1        2026
             Karan Patel
             Campus Fitness Challenge Winner
             Gym · 15 Jan 2026
             CAMPUS

ROW 2        2025
             Arjun Mehta
             Inter-BITS Football Champions
             Football · 12 Oct 2025
             NATIONAL

ROW 3        2025
             Ananya Verma
             State Aquatics Gold Medal
             Swimming · 22 Aug 2025
             STATE

LINK ROW     +2
             All achievements
             →                          (aria-hidden)

SR-ONLY      "Level: "                  prefix inside every chip
SR-ONLY      "2 more achievements"      accessible name suffix on the link row counter
```
Every row string above is rendered from mock data, not hard-coded. The eyebrow, headline, lead and link label are the only authored strings.

**Layout**

| Breakpoint | Header | Row grid | Gaps | Notes |
|---|---|---|---|---|
| `>=1024` (lg/xl/2xl) | `grid-cols-12`; headline block `col-span-7`, lead `col-start-9 col-span-4 self-end` | `grid-cols-[5.5rem_1fr_auto] items-start` | header `gap-6` (24px); row `gap-x-8` (32px); row `py-6` (24px) | Fixed 5.5rem year column instead of bare `auto` so all four years align on the same left edge regardless of glyph width |
| `768–1023` (md) | headline `col-span-12`, lead `col-span-12 mt-6 max-w-[52ch]` | `grid-cols-[4.25rem_1fr_auto]` | row `gap-x-6` (24px), `py-6` | Chip stays right-aligned; achievement title clamps to `max-w-[46ch]` |
| `640–767` (sm) | stacked, `mb-12` | `grid-cols-[1fr_auto]` — year moves into a top line with the chip | `gap-x-4`, `py-5` | Year rendered as its own line above the name, `--text-title`, still volt tabular-nums |
| `<640` (mobile) | stacked, `mb-10` | separate composition: `flex flex-col` — line 1 `flex items-center justify-between` (year left, chip right), then name, title, meta | `py-5` (20px), `gap-y-0` with `mt-*` on children | No hover meaning: the volt bar and fill are `@media (hover:hover)` only. Link row gets `min-h-12` for a 48px target |
| Media / ratios | none | none | none | This section contains no images, so there are no fixed-ratio frames to spec |

**Data**

```ts
// src/lib/content.ts — one addition beyond the agreed selector list
export const getRecentAchievements = (limit = 3) =>
  [...mockAchievements]
    .sort((a, b) => b.achievedAt.localeCompare(a.achievedAt)) // ISO date-only strings sort lexically; no Date(), no TZ drift
    .slice(0, limit);

export const getAchievementCount = () => mockAchievements.length; // 5
```

Sort: `achievedAt` descending, ties broken by array order. Judgement call: pure recency, not level-weighted — a "most recent" ledger is honest and needs no hidden ranking table.

Rendered rows, given the ground-truth mock (`getRecentAchievements(3)`):

| # | year | studentName | title | activityName | formatDate(achievedAt) | level chip |
|---|---|---|---|---|---|---|
| 1 | 2026 | Karan Patel | Campus Fitness Challenge Winner | Gym | 15 Jan 2026 | `CAMPUS` (outline, line) |
| 2 | 2025 | Arjun Mehta | Inter-BITS Football Champions | Football | 12 Oct 2025 | `NATIONAL` (volt fill) |
| 3 | 2025 | Ananya Verma | State Aquatics Gold Medal | Swimming | 22 Aug 2025 | `STATE` (volt outline) |

Not shown, and the source of the `+2`: Rahul Nair / Inter-University Tournament Winner / National / 2024-12-10, and Priya Shah / Inter-NIT Championship Runner-Up / Inter-NIT / 2024-04-05.

Callouts:
- `Inter-NIT` does not appear in the home three. The four-tier chip scale must still be implemented — `/achievements` renders all five records and is where the full hierarchy is legible.
- Today is 2026-08-05, so every achievement including 2026-01-15 is in the past. This section has no upcoming/live logic and no relationship to the `swimming-championship` today-case.
- `achievedAt` values are date-only ISO (`2026-01-15`). `formatDate` must not parse them through a UTC-midnight `Date` or 15 Jan renders as 14 Jan west of Greenwich.
- `imageUrl` is populated on zero records. The row reserves no column, no aspect-ratio frame and no placeholder for it; populating it later is a no-op for this section.
- `studentName` is a bare string. Karan Patel, Rahul Nair and Priya Shah have no `mockPeople` record, so no name is ever linked to `/people`.
- Existing bug to kill: `src/components/cards/AchievementCard.tsx:31` renders `{achievement.achievedAt}` — the raw ISO string. This section renders `formatDate(achievement.achievedAt)` inside `<time dateTime={achievement.achievedAt}>`, and the old card is deleted rather than restyled.

Empty case: `getRecentAchievements(3).length === 0` → the component returns `null` and the section does not mount. No empty-state chrome exists to maintain. With 1 or 2 records, render what exists; the link-row counter is `total - shown` and the `+N` cell renders nothing when that value is `<= 0`, while the link row itself always renders.

**Motion**

| Effect | Layer | Trigger | From → To | Duration token | Easing token | Stagger | Reduced-motion |
|---|---|---|---|---|---|---|---|
| Header reveal (eyebrow, headline, lead) | Motion | `whileInView`, `once: true`, `margin: "-15% 0px"` | `opacity 0, y var(--reveal-y)` → `opacity 1, y 0` | `--dur-slow` | `--ease-out-quint` | `calc(var(--dur-fast)/3)` ≈ 60ms between the three | No transform, `opacity 1` at mount, duration 0 |
| Row reveal | Motion | parent `<ol>` `whileInView`, `once: true` | `opacity 0, y var(--reveal-y)` → `opacity 1, y 0` | `--dur-std` | `--ease-out-quint` | `staggerChildren: 0.09` (`--dur-fast ÷ 2`), applies to the 3 rows + link row | No transform, rows visible immediately, stagger 0 |
| Row hover fill | CSS | `:hover` / `:focus-within` on `li` (`@media (hover:hover)` only) | `background-color transparent` → `bg-raised/40` | `--dur-fast` | `--ease-out-quint` | — | Unchanged — colour-only, no transform |
| Volt bar slide-in | CSS | same as fill | `translateX(-100%)` → `translateX(0)` | `--dur-std` | `--ease-out-quint` | — | `transition: opacity` instead; bar sits at `translateX(0) opacity-0` → `opacity-100`, `--dur-fast` |
| Row rule brighten | CSS | same as fill | `border-line` → `border-line-strong` | `--dur-fast` | `--ease-out-quint` | — | Unchanged — colour-only |
| Link label colour | CSS | `group-hover` / `group-focus-visible` on link row | `text-fg` → `text-volt` | `--dur-fast` | `--ease-out-quint` | — | Unchanged |
| Link arrow nudge | CSS | same | `translateX(0)` → `translateX(var(--lift))` (4px) | `--dur-fast` | `--ease-out-quint` | — | No translate; colour change only |
| GSAP | — | — | — | — | — | — | None. The two-scene GSAP budget is spent on `#focus` and `#impact`; this section uses zero ScrollTrigger instances |

No looping animation exists here, so there is nothing for the IntersectionObserver pause rule to govern. No blur is used, so the 80px/48px cap is not exercised.

**Code**

```tsx
// src/components/sections/WinsSection.tsx
import { Link } from "react-router-dom";
import * as motion from "motion/react-client";
import { getRecentAchievements, getAchievementCount } from "@/lib/content";
import { formatDate } from "@/lib/format";

// Token-only tier scale: fill > volt outline > cream outline > muted outline.
const LEVEL_CHIP: Record<string, string> = {
  National:   "bg-volt text-ink border-transparent font-semibold",
  State:      "text-volt border-line-volt font-medium",
  "Inter-NIT":"text-cream-dim border-line-strong font-medium",
  Campus:     "text-fg-muted border-line font-medium",
};
const CHIP_FALLBACK = LEVEL_CHIP.Campus; // unknown level degrades to the weakest tier

const ROW =
  "group relative isolate overflow-hidden -mx-5 px-5 py-6 border-t border-line " +
  "transition-colors duration-(--dur-fast) ease-(--ease-out-quint) " +
  "hover:border-line-strong hover:bg-raised/40 focus-within:bg-raised/40 " +
  "grid grid-cols-[1fr_auto] gap-x-4 lg:grid-cols-[5.5rem_1fr_auto] lg:gap-x-8 lg:items-start";

const BAR =
  "pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-volt " +
  "-translate-x-full transition-transform duration-(--dur-std) ease-(--ease-out-quint) " +
  "group-hover:translate-x-0 group-focus-within:translate-x-0 " +
  "motion-reduce:translate-x-0 motion-reduce:opacity-0 motion-reduce:transition-opacity " +
  "motion-reduce:duration-(--dur-fast) motion-reduce:group-hover:opacity-100";

const rows = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const row = {
  hidden: { opacity: 0, y: "var(--reveal-y)" },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } }, // --dur-std / --ease-out-quint
};

export default function WinsSection() {
  const items = getRecentAchievements(3);
  if (items.length === 0) return null;              // no empty-state chrome
  const remaining = getAchievementCount() - items.length; // 2

  return (
    <section id="wins" aria-labelledby="wins-title" className="scroll-mt-24 bg-deep py-(--space-section)">
      <div className="mx-auto w-full max-w-(--container) px-(--gutter)">
        {/* header: cols 1-7 / 9-12 */}
        <div className="mb-10 grid gap-6 md:mb-14 lg:mb-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-5 text-eyebrow font-medium uppercase tracking-[0.2em] text-volt">
              <span aria-hidden="true" className="mr-2">▸</span>RESULTS
            </p>
            <h2 id="wins-title"
                className="max-w-[14ch] font-display text-display-l font-semibold leading-[0.92] tracking-[-0.03em] text-fg">
              Names on the board.
            </h2>
          </div>
          <p className="max-w-[38ch] text-lead text-fg-muted lg:col-start-9 lg:col-span-4 lg:self-end lg:pb-2">
            Five results across four levels. The three most recent are here.
          </p>
        </div>

        <motion.ol variants={rows} initial="hidden" whileInView="show"
                   viewport={{ once: true, margin: "-10% 0px" }} className="list-none">
          {items.map((a) => (
            <motion.li key={a.id} variants={row} className={ROW}>
              <span aria-hidden="true" className={BAR} />
              <span className="font-display text-title font-semibold tabular-nums tracking-[-0.03em] text-volt lg:pt-0.5">
                {a.achievedAt.slice(0, 4)}
              </span>
              <div className="order-3 col-span-2 lg:order-none lg:col-span-1">
                <h3 className="font-display text-title font-semibold leading-[1.1] tracking-[-0.03em] text-fg">
                  {a.studentName}
                </h3>
                <p className="mt-1.5 max-w-[52ch] text-body text-fg-muted">{a.title}</p>
                <p className="mt-3 text-meta text-fg-muted">
                  {a.activityName}
                  <span aria-hidden="true" className="mx-2 text-fg-faint">·</span>
                  <time dateTime={a.achievedAt}>{formatDate(a.achievedAt)}</time>
                </p>
              </div>
              <span className={`h-fit whitespace-nowrap rounded-full border px-3.5 py-1.5 text-eyebrow uppercase tracking-[0.2em] ${LEVEL_CHIP[a.level] ?? CHIP_FALLBACK}`}>
                <span className="sr-only">Level: </span>{a.level}
              </span>
            </motion.li>
          ))}

          <motion.li variants={row} className={`${ROW} border-b`}>
            <span aria-hidden="true" className={BAR} />
            {remaining > 0 && (
              <span className="font-display text-title tabular-nums text-fg-faint">+{remaining}</span>
            )}
            <Link to="/achievements"
                  className="order-3 col-span-2 flex min-h-12 items-center justify-between gap-4 text-title font-display font-semibold tracking-[-0.03em] text-fg transition-colors duration-(--dur-fast) ease-(--ease-out-quint) hover:text-volt lg:order-none lg:col-span-2 lg:contents">
              <span>All achievements{remaining > 0 && <span className="sr-only">, {remaining} more</span>}</span>
              <span aria-hidden="true"
                    className="pr-1 text-volt transition-transform duration-(--dur-fast) ease-(--ease-out-quint) group-hover:translate-x-(--lift) motion-reduce:group-hover:translate-x-0">→</span>
            </Link>
          </motion.li>
        </motion.ol>
      </div>
    </section>
  );
}
```

Two things the implementer cannot infer:
1. The year comes from `a.achievedAt.slice(0, 4)`, not `new Date(...).getFullYear()` — the latter shifts 2026-01-15 to 2025 in negative-UTC zones. `AchievementsPage.tsx:41` and `:59` currently make exactly that mistake in its year filter.
2. `lg:contents` on the `<Link>` is what lets one anchor wrap both the label and the arrow while still landing them in grid columns 2 and 3 — do not split the link into two focusable elements.

**A11y**

| Concern | Spec |
|---|---|
| Semantics | `<section id="wins" aria-labelledby="wins-title">` → `<h2 id="wins-title">` → `<ol>` / `<li>`. Each `studentName` is an `<h3>`; the achievement title is a `<p>`, not a heading |
| Date | `<time dateTime="2026-01-15">15 Jan 2026</time>`. Machine value stays ISO, visible value never does |
| Chips | non-interactive `<span>` with an `sr-only` `"Level: "` prefix, so `INTER-NIT` is announced as "Level: Inter-NIT" and not spelled as letters in isolation |
| Decorative | `▸`, `·`, `→` and the volt bar all carry `aria-hidden="true"` |
| Keyboard | one tab stop in the whole section: the `/achievements` link. Rows are not focusable, not clickable, and expose no hover-only information |
| Focus | global ring — `outline 2px solid var(--color-volt); outline-offset 3px`. `focus-within` on the link row also fires the fill and the volt bar, so keyboard state matches mouse state |
| Reduced motion | `motion-reduce:` variants on the bar and arrow; Motion variants collapse to opacity via the global `useReducedMotion` guard. Nothing in the section conveys meaning through movement |
| Contrast on `--color-deep` | `fg` 15.1:1 · `fg-muted` 6.5:1 · `volt` 16.4:1 · `cream-dim` 11.8:1 · `ink` on `volt` fill 15.9:1 · `fg-faint` 3.2:1 — which is why `fg-faint` is confined to the `aria-hidden` separator and the `+2` counter (duplicated in the link's accessible name) |
| Text | no all-caps outside the eyebrow and the four chips. No text over an image anywhere in the section |

**Acceptance**

1. Exactly four `<li>` elements render: Karan Patel / 2026, Arjun Mehta / 2025, Ananya Verma / 2025, then the `All achievements` row — in that order, and the section is `bg-deep` with no mesh utility class present.
2. No raw ISO string appears in the DOM text of this section; `document.querySelectorAll('#wins time')` all have a `dateTime` attribute whose value differs from their `textContent`, and the visible dates read `15 Jan 2026`, `12 Oct 2025`, `22 Aug 2025`.
3. The four level chips are visually distinguishable using only `volt` fill, `line-volt`, `line-strong`, `line`, `cream-dim`, `fg-muted`, `ink` — grepping the section for `bg-[#`, `text-[#`, `border-[#` or any cyan/slate/white utility returns zero hits.
4. Deleting `imageUrl` from `achievement.types.ts` and rebuilding produces no change to this section's rendered output or layout height.
5. Tabbing through the section produces exactly one focus ring, on the `/achievements` link, and that link navigates to the `/achievements` route registered at `src/routes/index.tsx:29`.
6. With `prefers-reduced-motion: reduce`, all four rows are at `opacity: 1` and `transform: none` on first paint, and hovering a row changes only colours — no measured translate on the volt bar or the arrow.
7. Setting `mockAchievements` to `[]` removes the section from the DOM entirely; setting it to 3 records removes the `+N` counter while the `All achievements` row still renders.

---

### Section 11 — Join (the inverted light section)

The payoff beat: after ~10 screens of teal-black, one full-bleed lime-cream band wipes up from the bottom and asks for one decision.

**RULE — this is the only light surface on the entire site.** No other section, page, card, dialog, sheet, or state may use `mesh-cream` or a cream/ink inversion. `grep -R "mesh-cream" src` must return exactly one component. The band's whole value is that it happens once.

**Canvas**

| Property | Value |
|---|---|
| Background token | `--color-cream` (base of the `mesh-cream` utility) |
| Mesh utility | `mesh-cream` — volt bloom top-left, teal bottom-right, on cream |
| Mesh strength | `--mesh-strength: 0.85` (highest on the site; this is the expensive moment) |
| Bloom layer | `::before`, `filter: blur(80px)` desktop / `blur(48px)` <768px, static, never animated |
| Vertical padding | `py-[calc(var(--space-section)*1.5)]` → `clamp(7.5rem, 16.5vh, 13.5rem)` |
| Container behaviour | Section is **full-bleed** (`ml-[calc(50%-50vw)] w-screen`, no max-width, no radius). Content inside uses `mx-auto max-w-[var(--container)] px-[var(--gutter)]` |
| Clipping | Section owns `clip-path` (the wipe), which also bounds the blooms — no bleed onto neighbouring dark bands |
| Seam | No border top or bottom. The colour change *is* the edge; a hairline on cream would read as dirt |
| Photography | **Zero images.** This is the one purely typographic band — no frames, no ratios, no scrims |

**Wireframe**

DESKTOP >=1024  ·  full-bleed band, 12-col inner grid, container 1280, gutter clamp(1rem,4vw,2.5rem)
```
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2   3   4   5   6   7   8   9  10  11  12                            │
│                                                                           │
│      ┌──────────────────────────────────────────┐  ← cols 3-10            │
│      │              ● GET INVOLVED              │     teal-700            │
│      │                                          │                         │
│      │         You do not need a team.          │  ← display-l            │
│      │          You need a start time.          │     ink                 │
│      │                                          │                         │
│      │    Five facilities, the first open at    │  ← lead 62ch            │
│      │    five and the last shut at eleven.     │     teal-900            │
│      │                                          │                         │
│      │    ███████████████   Check what's on     │  ← void pill +          │
│      │    Talk to the centre                    │     ghost pill          │
│      └──────────────────────────────────────────┘                         │
│                                                                           │
│  ───────────────────    ───────────────────    ───────────────────        │
│  EMAIL                  FIND US                EXPLORE  ← eyebrows        │
│  sac@goa.bits-          Student Activity       Browse all activities      │
│  pilani.ac.in           Centre                 →                          │
│                         BITS Pilani, Goa       Three sports, two          │
│                         Campus                 fitness                    │
│                         Zuarinagar, Goa                                   │
│  cols 1-4               cols 5-8               cols 9-12                  │
└───────────────────────────────────────────────────────────────────────────┘
```

MOBILE <640  ·  single column, gutter 1rem
```
┌─────────────────────────┐
│ ● GET INVOLVED          │
│                         │
│ You do not need a       │
│ team. You need a        │
│ start time.             │
│                         │
│ Five facilities, the    │
│ first open at five      │
│ and the last shut at    │
│ eleven.                 │
│                         │
│ ┌─────────────────────┐ │
│ │  Talk to the centre │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │   Check what's on   │ │
│ └─────────────────────┘ │
│                         │
│ ─────────────────────   │
│ EMAIL                   │
│ sac@goa.bits-pilani.    │
│ ac.in                   │
│                         │
│ ─────────────────────   │
│ FIND US                 │
│ Student Activity        │
│ Centre                  │
│ BITS Pilani, Goa        │
│ Campus                  │
│ Zuarinagar, Goa         │
│                         │
│ ─────────────────────   │
│ EXPLORE                 │
│ Browse all activities   │
│ →  Three sports, two    │
│    fitness              │
└─────────────────────────┘
```
Mobile notes: actions stack full-width, primary first; the three columns become three stacked blocks, each keeping its own top rule. No pinned scene, no horizontal rail (three items do not earn a rail).

**Elements**

| Slot | Content | Type token | Color token | Surface/radius | Spacing | Notes |
|---|---|---|---|---|---|---|
| Band | `<section id="join">` | — | bg `--color-cream` | full-bleed, radius **none** | `py-[calc(var(--space-section)*1.5)]` | `mesh-cream`, `isolate`, `relative`, owns the wipe `clip-path` |
| Mesh bloom | `mesh-cream::before` | — | volt bloom + `--color-teal-500` bloom over `--color-cream` | inherits band clip | `inset-0` | `blur(80px)` / `blur(48px)` <768px, `--mesh-strength:.85`, static, `pointer-events-none` |
| Local grain | band `::after` | — | achromatic noise | `inset-0`, z-1 | — | `mix-blend-mode: multiply`, `opacity .07` — see Code. Restores the tooth the global overlay layer loses on a light base |
| Global grain | `body::after` (unchanged) | — | — | fixed, z-100 | — | Over cream, `overlay` takes its screen branch (backdrop L≈0.93), so at `.045` it is a ~1% lift — visually inert. **Not disabled** (a fixed sibling cannot be scoped per-section without JS); the local multiply layer is the compensation |
| Inner grid | `<div>` | — | — | — | `mx-auto max-w-[var(--container)] px-[var(--gutter)] grid grid-cols-12` | `relative z-10` so it sits above the local grain |
| Content column | centred stack | — | — | — | `col-span-12 lg:col-start-3 lg:col-span-8`, `text-center` | md: `col-start-2 col-span-10` |
| Eyebrow dot | `●` | — | bg `--color-teal-700` | `rounded-full`, `size-1.5` | `mr-2.5` (10px) | `aria-hidden`, decorative. Not volt — volt is 1.11:1 on cream |
| Eyebrow | "Get involved" | `--text-eyebrow` | `--color-teal-700` | — | — | `uppercase tracking-[0.2em]`; source text is sentence case, CSS uppercases it (8.03:1) |
| Statement | "You do not need a team. You need a start time." | `--text-display-l` | `--color-ink` | — | `mt-6` (1.5rem) | `font-display font-semibold tracking-[-0.03em] leading-[0.92]`, `<h2>`, 18.01:1 |
| Lead | one sentence | `--text-lead` | `--color-teal-900` | — | `mt-5` (1.25rem) | `max-w-[62ch] mx-auto`, `font-sans`, 11.61:1. Teal as *type* is allowed only here, on cream — never on dark |
| Action row | flex wrapper | — | — | — | `mt-10` (2.5rem), `gap-4` desktop / `gap-3` mobile | `flex flex-col sm:flex-row sm:justify-center` |
| Primary CTA | "Talk to the centre" → `/contact` | `--text-body` | text `--color-cream` on bg `--color-void` | `rounded-full`, `h-14` (mobile `h-12` full-width) | `px-8` | **Inverted from every other CTA on the site.** 18.59:1. Hover bg `--color-teal-900` (11.61:1) + `-translate-y-[var(--lift)]` |
| Secondary CTA | "Check what's on" → `/events` | `--text-body` | text `--color-ink` | `rounded-full`, `border`, `h-14` / `h-12` | `px-8` | Border = ink 20% mixed into cream (solid, no alpha). Hover: border → ink 45%, bg → ink 6% |
| Column rail | `<ul>` of 3 | — | — | — | `col-span-12 mt-[clamp(4rem,8vh,6rem)] grid grid-cols-1 md:grid-cols-3 gap-x-[var(--gutter)]` | `role="list"` retained |
| Rule (x3) | `border-t` on each `<li>` | — | ink 15% mixed into cream (solid) | 1px, no radius | `pt-6` desktop / `pt-5 pb-6` mobile | Three separate rules with gutter gaps, **no vertical dividers** |
| Col 1 label | "Email" | `--text-eyebrow` | `--color-teal-700` | — | `mb-3` (0.75rem) | `<h3>`, CSS uppercase |
| Col 1 value | `sac@goa.bits-pilani.ac.in` | `--text-body` | `--color-ink` | — | — | `<a href="mailto:...">`, `underline decoration-1 underline-offset-4`, hover `decoration-2` |
| Col 2 label | "Find us" | `--text-eyebrow` | `--color-teal-700` | — | `mb-3` | `<h3>` |
| Col 2 value | 3-line address | `--text-body` | `--color-teal-900` | — | `leading-[1.5]` | `<address class="not-italic">`, `<br>` separated. **Not a link** — no verified map URL exists, so none is invented |
| Col 3 label | "Explore" | `--text-eyebrow` | `--color-teal-700` | — | `mb-3` | `<h3>` |
| Col 3 link | "Browse all activities" → `/activities` | `--text-body` | `--color-ink` | — | — | `group inline-flex items-center gap-2` |
| Col 3 arrow | `ArrowRight` (lucide, already installed) | `size-4` | `currentColor` = `--color-ink` | — | — | `aria-hidden="true"`, `group-hover:translate-x-[var(--lift)]` |
| Col 3 count | derived, e.g. `3 sports · 2 fitness` | `--text-meta` | `--color-teal-900` | — | `mt-2` (0.5rem) | `tabular-nums`. Derived from selectors, never hardcoded — see Data |
| Social row | **DELETED** | — | — | — | — | The three `href="#"` stubs at `ContactPage.tsx:112-114` (Instagram / Facebook / LinkedIn) are **removed from the repo, not restyled and not moved here.** No real SAC social URL exists in the mock data, so no social row renders in `#join` or the footer. Re-add only when a real URL lands |

**Accent budget check:** volt appears in this band **only** inside the blurred `mesh-cream` bloom. No volt text, no volt border, no volt dot, no volt focus ring — volt on cream is 1.11:1. Volt coverage in this viewport ≈ 3% (diffuse bloom).

**Copy**

```
EYEBROW        Get involved                 (rendered uppercase by CSS)

STATEMENT      You do not need a team. You need a start time.

LEAD           Five facilities, the first open at five in the morning
               and the last shut at eleven at night.

PRIMARY CTA    Talk to the centre          → /contact
SECONDARY CTA  Check what's on             → /events

COLUMN 1
  label        Email
  value        sac@goa.bits-pilani.ac.in   → mailto:sac@goa.bits-pilani.ac.in

COLUMN 2
  label        Find us
  value        Student Activity Centre
               BITS Pilani, Goa Campus
               Zuarinagar, Goa

COLUMN 3
  label        Explore
  link         Browse all activities        → /activities
  meta         3 sports · 2 fitness         (derived at render, see Data)
```
Every string above is final. The lead's "five in the morning" / "eleven at night" are the min `openTime` and max `closeTime` across all five activity records (both are Gym, 05:00–23:00) — not invented.

**Layout**

| Breakpoint | Grid | Content column | Action row | Column rail | Padding |
|---|---|---|---|---|---|
| ≥1024 (lg/xl/2xl) | 12 col, `gap-x-[var(--gutter)]` | `col-start-3 col-span-8`, centred, lead `max-w-[62ch] mx-auto` | `flex-row justify-center gap-4` (1rem), pills `h-14 px-8` | `col-span-12`, `grid-cols-3`, `gap-x-[var(--gutter)]`, each cell `border-t pt-6` | `px-[var(--gutter)]`, `py-[calc(var(--space-section)*1.5)]` |
| 768–1023 (md) | 12 col | `col-start-2 col-span-10` | `flex-row justify-center gap-4` | `grid-cols-3`, `gap-x-6` (1.5rem), `border-t pt-6` | same |
| 640–767 (sm) | single column | full width, centred | `flex-row justify-center gap-3` | `grid-cols-1`, each block `border-t pt-5 pb-6` | `px-4` |
| <640 | single column, document flow | full width, centred | `flex-col gap-3`, both pills `w-full h-12` (48px min) | `grid-cols-1`, each block `border-t pt-5 pb-6` | `px-4`, `py-[calc(var(--space-section)*1.5)]` |

Aspect ratios: none — the section contains no media. Nothing here reflows when photography is swapped later, because there is no photography.

**Data**

| Selector | Use | Result today |
|---|---|---|
| `getActivityCategories()` | build the col-3 meta line | `["Sports", "Fitness"]` |
| `getActivitiesByCategory("Sports").length` | count | `3` (Basketball, Football, Badminton) |
| `getActivitiesByCategory("Fitness").length` | count | `2` (Swimming, Gym) |

Rendered meta string today: `3 sports · 2 fitness`.

No events, people, stats, achievements, or gallery data is read. **Today's date (2026-08-05) is irrelevant to this section** — nothing here is date-derived, so the past/today status of `interbits-football`, `fitness-challenge` and `swimming-championship` cannot make this copy stale. The secondary CTA deliberately says "Check what's on" rather than naming a date or a count.

Empty case: if `getActivityCategories()` returns `[]`, the col-3 meta line does not render and the "Browse all activities" link stays. Every other string is static, so the section can never render empty and needs no skeleton, no fallback and no mock label. (`/contact` is the mock-form destination; that page carries its own mock label — the CTA itself is a real, working navigation.)

**Motion**

| Effect | Layer | Trigger | From → To | Duration | Easing | Stagger | Reduced motion |
|---|---|---|---|---|---|---|---|
| Band wipe up from bottom edge | CSS keyframes, gated by a `data-revealed` attribute from motion `useInView` | `amount: 0.35, once: true` | `clip-path: inset(100% 0 0 0 round var(--radius-2xl) var(--radius-2xl) 0 0)` → `clip-path: inset(0% 0 0 0 round 0 0 0 0)` | `--dur-slow` | `--ease-in-out-quart` | — | `clip-path: none`, `animation: none`. Band is simply present |
| Content stack rise (eyebrow, h2, lead, action row) | Motion (`motion/react`) | same viewport entry, `once: true` | `opacity 0, y var(--reveal-y)` → `opacity 1, y 0` | `--dur-std` | `--ease-out-quint` | 90ms (= `--dur-fast` ÷ 2) | `initial={false}`, both groups at final values, no transition |
| Column rail rise (3 `<li>`) | Motion | same viewport entry, starts after the action row in the stagger chain | `opacity 0, y var(--reveal-y)` → `opacity 1, y 0` | `--dur-std` | `--ease-out-quint` | 90ms | as above |
| Primary CTA hover | CSS | `:hover` | `bg --color-void` → `--color-teal-900`; `translateY 0` → `calc(var(--lift) * -1)` | `--dur-fast` | `--ease-out-quint` | — | colour change only, no translate |
| Primary CTA press | CSS | `:active` | `translateY -4px` → `0` | `--dur-fast` | `--ease-out-quint` | — | unchanged (already instantaneous colour) |
| Secondary CTA hover | CSS | `:hover` | border ink 20% → ink 45%; bg cream → ink 6% in cream | `--dur-fast` | `--ease-out-quint` | — | identical (colour only) |
| Col-3 arrow nudge | CSS | `group-hover` / `group-focus-visible` | `translateX 0` → `var(--lift)` | `--dur-fast` | `--ease-out-quint` | — | no transform |
| Mailto underline | CSS | `:hover` | `text-decoration-thickness 1px → 2px` | `--dur-fast` | `--ease-out-quint` | — | thickness change kept (not motion) |
| Mesh bloom | none | — | static | — | — | — | static |

No GSAP in this section. GSAP + ScrollTrigger exist only for `#focus` and `#impact`. No parallax, no pin, no scrub here.

**Code**

```css
/* src/index.css — owned by this section */

@keyframes join-wipe {
  from { clip-path: inset(100% 0 0 0 round var(--radius-2xl) var(--radius-2xl) 0 0); }
  to   { clip-path: inset(0% 0 0 0 round 0 0 0 0); }
}

/* solid line colours for the light band: mixed, never alpha, so the mesh bloom
   underneath cannot tint them */
@utility rule-ink        { border-color: color-mix(in oklab, var(--color-ink) 15%, var(--color-cream)); }
@utility edge-ink        { border-color: color-mix(in oklab, var(--color-ink) 20%, var(--color-cream)); }
@utility edge-ink-strong { border-color: color-mix(in oklab, var(--color-ink) 45%, var(--color-cream)); }
@utility fill-ink-soft   { background-color: color-mix(in oklab, var(--color-ink) 6%, var(--color-cream)); }

.join-light { clip-path: inset(100% 0 0 0 round var(--radius-2xl) var(--radius-2xl) 0 0); }
.join-light[data-revealed] { animation: join-wipe var(--dur-slow) var(--ease-in-out-quart) forwards; }

/* focus ring inversion: volt on cream is 1.11:1 and unusable. Ink is 18.01:1,
   and the 3px offset gap keeps cream (not void) adjacent on both sides of the
   ring even on the dark primary pill. Specificity (0,2,0) beats the global rule. */
.join-light :focus-visible { outline: 2px solid var(--color-ink); outline-offset: 3px; }

/* local grain. The global body::after uses mix-blend-mode: overlay, which on a
   backdrop of L≈0.93 takes its screen branch — it lightens instead of biting,
   so at .045 it is invisible here and the band would read plastic-smooth next to
   the grainy dark sections. Multiply restores the tooth. `isolate` on the band
   keeps the multiply from reaching the void page behind during the wipe. */
.join-light::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.07;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='jg'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23jg)'/%3E%3C/svg%3E");
}

@media (prefers-reduced-motion: reduce) {
  .join-light,
  .join-light[data-revealed] { clip-path: none; animation: none; }
}
```

```tsx
// src/sections/JoinSection.tsx
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { getActivityCategories, getActivitiesByCategory } from "@/lib/content";

const EMAIL = "sac@goa.bits-pilani.ac.in";

const rise = {
  hidden: { opacity: 0, y: "var(--reveal-y)" },
  show: { opacity: 1, y: 0 },
};
const stack = { show: { transition: { staggerChildren: 0.09 } } }; // --dur-fast / 2
const ease = [0.22, 1, 0.36, 1] as const;                          // --ease-out-quint
const T = { duration: 0.42, ease };                                // --dur-std

export function JoinSection() {
  const ref = useRef<HTMLElement>(null);
  const revealed = useInView(ref, { amount: 0.35, once: true });

  // renders "3 sports · 2 fitness"
  const mix = getActivityCategories()
    .map((c) => `${getActivitiesByCategory(c).length} ${c.toLowerCase()}`)
    .join(" · ");

  return (
    <section
      id="join"
      ref={ref}
      data-revealed={revealed || undefined}
      aria-labelledby="join-title"
      className="join-light mesh-cream relative isolate ml-[calc(50%-50vw)] w-screen
                 py-[calc(var(--space-section)*1.5)] [--mesh-strength:0.85]"
    >
      <motion.div
        variants={stack}
        initial="hidden"
        animate={revealed ? "show" : "hidden"}
        className="relative z-10 mx-auto grid w-full max-w-[var(--container)]
                   grid-cols-12 px-[var(--gutter)]"
      >
        <div className="col-span-12 text-center md:col-start-2 md:col-span-10
                        lg:col-start-3 lg:col-span-8">
          <motion.p variants={rise} transition={T}
            className="flex items-center justify-center text-eyebrow uppercase
                       tracking-[0.2em] text-teal-700">
            <span aria-hidden="true"
                  className="mr-2.5 size-1.5 rounded-full bg-teal-700" />
            Get involved
          </motion.p>

          <motion.h2 variants={rise} transition={T} id="join-title"
            className="mt-6 font-display text-display-l font-semibold
                       tracking-[-0.03em] leading-[0.92] text-ink">
            You do not need a team. You need a start time.
          </motion.h2>

          <motion.p variants={rise} transition={T}
            className="mx-auto mt-5 max-w-[62ch] text-lead text-teal-900">
            Five facilities, the first open at five in the morning and the last
            shut at eleven at night.
          </motion.p>

          <motion.div variants={rise} transition={T}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link to="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full
                         bg-void px-8 text-body font-medium text-cream sm:h-14
                         transition-[background-color,transform]
                         duration-[var(--dur-fast)] ease-[var(--ease-out-quint)]
                         hover:-translate-y-[var(--lift)] hover:bg-teal-900
                         active:translate-y-0 motion-reduce:transform-none">
              Talk to the centre
            </Link>
            <Link to="/events"
              className="edge-ink inline-flex h-12 items-center justify-center
                         rounded-full border px-8 text-body font-medium text-ink
                         sm:h-14 transition-colors duration-[var(--dur-fast)]
                         ease-[var(--ease-out-quint)]
                         hover:edge-ink-strong hover:fill-ink-soft">
              Check what’s on
            </Link>
          </motion.div>
        </div>

        <ul role="list"
          className="col-span-12 mt-[clamp(4rem,8vh,6rem)] grid grid-cols-1
                     gap-x-[var(--gutter)] md:grid-cols-3">
          <motion.li variants={rise} transition={T}
            className="rule-ink border-t pb-6 pt-5 md:pb-0 md:pt-6">
            <h3 className="mb-3 text-eyebrow uppercase tracking-[0.2em] text-teal-700">
              Email
            </h3>
            <a href={`mailto:${EMAIL}`}
              className="text-body text-ink underline decoration-1 underline-offset-4
                         transition-[text-decoration-thickness]
                         duration-[var(--dur-fast)] ease-[var(--ease-out-quint)]
                         hover:decoration-2">
              {EMAIL}
            </a>
          </motion.li>

          <motion.li variants={rise} transition={T}
            className="rule-ink border-t pb-6 pt-5 md:pb-0 md:pt-6">
            <h3 className="mb-3 text-eyebrow uppercase tracking-[0.2em] text-teal-700">
              Find us
            </h3>
            <address className="text-body not-italic leading-[1.5] text-teal-900">
              Student Activity Centre<br />
              BITS Pilani, Goa Campus<br />
              Zuarinagar, Goa
            </address>
          </motion.li>

          <motion.li variants={rise} transition={T}
            className="rule-ink border-t pb-6 pt-5 md:pb-0 md:pt-6">
            <h3 className="mb-3 text-eyebrow uppercase tracking-[0.2em] text-teal-700">
              Explore
            </h3>
            <Link to="/activities"
              className="group inline-flex items-center gap-2 text-body text-ink">
              Browse all activities
              <ArrowRight aria-hidden="true"
                className="size-4 transition-transform duration-[var(--dur-fast)]
                           ease-[var(--ease-out-quint)]
                           group-hover:translate-x-[var(--lift)]
                           motion-reduce:transform-none" />
            </Link>
            {mix && (
              <p className="mt-2 text-meta tabular-nums text-teal-900">{mix}</p>
            )}
          </motion.li>
        </ul>
      </motion.div>
    </section>
  );
}
```

Deletion, not restyling — `src/pages/ContactPage.tsx` lines 106-116 (the "Social Links" block containing the three `href="#"` anchors on 112-114) are removed outright. Nothing replaces them until a real URL exists.

**A11y**

- `<section id="join" aria-labelledby="join-title">` inside `<main>`; `<h2 id="join-title">` continues the homepage heading order (the hero owns the single `<h1>`). Column labels are `<h3>`.
- Eyebrow and all column labels are authored in sentence case and uppercased with CSS, so screen readers do not spell them letter by letter. ALL CAPS is CSS-only, per the type rules.
- The address is `<address class="not-italic">`; it is text, not a link — no map URL is invented. The eyebrow dot and the arrow are `aria-hidden="true"`.
- Both actions are `react-router` `<Link>` elements (real navigation) — no `role="button"`, no `href="#"`, no `onClick` on a `<div>`. Tab order: primary → secondary → mailto → activities link. Four focusable elements, all resolving.
- Focus: the global volt ring is overridden inside the band to `2px solid var(--color-ink)` at `outline-offset: 3px`. The 3px offset keeps cream adjacent on both sides of the ring, including on the dark primary pill.

| Pair | Ratio | Verdict |
|---|---|---|
| `--color-ink` on `--color-cream` (headline, links, focus ring) | 18.01:1 | AAA |
| `--color-cream` on `--color-void` (primary CTA label) | 18.59:1 | AAA |
| `--color-cream` on `--color-teal-900` (primary CTA hover) | 11.61:1 | AAA |
| `--color-teal-900` on `--color-cream` (lead, address, meta) | 11.61:1 | AAA |
| `--color-teal-700` on `--color-cream` (eyebrows, dot) | 8.03:1 | AAA |
| `--color-volt` on `--color-cream` | 1.11:1 | **banned in this band** — reason for the ring override |
| ghost border ink 20% in cream | 1.66:1 | decorative |
| ghost border ink 45% in cream (hover/focus) | 3.52:1 | passes 1.4.11 |

Judgement call: the brief's `border-ink/20` resting ghost border is 1.66:1, below 1.4.11's 3:1. It is kept because the control is identified by its 18.01:1 ink label sitting beside a filled primary in the same action row (boundary not required for identification), and it rises to 3.52:1 on hover and focus.

- Touch targets: both pills 48px tall at <640 (`h-12`, full width); inline links sit in rows with ≥44px effective height from `pt-5 pb-6`.
- `prefers-reduced-motion: reduce` removes the wipe (`clip-path: none`) and all transforms; every string is present and legible with zero animation.
- Colour is never the only signal: each column carries a text label, the primary CTA carries its own verb.

**Acceptance**

1. `grep -R "mesh-cream" src` matches exactly one file (`JoinSection.tsx`); no other section, page or component renders a light background.
2. `grep -Rn 'href="#"' src` returns zero matches, and `ContactPage.tsx` contains no "Social Links" block.
3. Inside `#join`, computed styles contain no `--color-volt` for any `color`, `border-color` or `outline-color`; `:focus-visible` on all four focusable elements computes to `outline: 2px solid rgb(1 16 20)` with `outline-offset: 3px`.
4. With DevTools emulating `prefers-reduced-motion: reduce`, `#join` computes `clip-path: none` and `animation-name: none`, and all content is at `opacity: 1` before any scrolling.
5. Without reduced motion, scrolling `#join` to 35% visibility runs `join-wipe` exactly once at 720ms with `cubic-bezier(0.76,0,0.24,1)`, from `inset(100% 0 0 0 …)` to `inset(0% 0 0 0 …)`; re-scrolling does not replay it.
6. All four destinations resolve: `/contact`, `/events`, `mailto:sac@goa.bits-pilani.ac.in`, `/activities`.
7. `#join` issues zero image requests, and the col-3 meta text equals `3 sports · 2 fitness` — changing a record's `category` in `mockActivities.ts` changes that string without touching the component.
8. At 375px width both pills measure ≥48px tall and no element inside `#join` overflows the viewport horizontally.

---

### Section 12 — Footer

The site's complete map and only contact endpoint, sized like a closing statement rather than a legal appendix — it carries every route so the navbar can ship five links instead of seven.

**Canvas**

| Property | Value |
|---|---|
| Background token | `--color-void` |
| Mesh utility | `mesh-teal` (teal-500 bloom upper-right, volt bloom mid-left) |
| Mesh strength | `--mesh-strength: 0.25` — lowest on the site; the footer must read as the page fading out, not another feature band |
| Bloom blur | `80px` desktop / `48px` at `<768` (per texture cap). Static — never animated, no mobile exception needed since it never moves |
| Vertical padding | Main block `padding-top: var(--space-section)`, `padding-bottom: 2.5rem`. Bottom bar `padding-block: 1.5rem` |
| Container | `mx-auto w-full max-w-[var(--container)] px-[var(--gutter)]`. Top hairline and bottom-bar hairline are **full-bleed** (outside the container); all content is inside it |
| Shadows | None. Nothing in the footer is raised — zero of the three shadow recipes are used |
| Top edge | `border-t border-line`, 1px, full-bleed |

**Wireframe**

```
DESKTOP >=1024  ·  12-col grid, container 1280, gutter clamp(1rem,4vw,2.5rem)
──── border-t border-line (full-bleed) ─────────────────────────────────────
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2   3   4  │  5  │  6   7  │  8   9  │ 10  11  12                    │
│                                                                           │
│  ▸ STUDENT ACTIVITY   ▸ EXPLORE   ▸ THE CENTRE   ▸ REACH US               │
│    CENTRE                                                                 │
│  ┌─────────────────┐   Activities   People        EMAIL                   │
│  │                 │   Events        In-charges    sac@goa.bits-          │
│  │      SAC        │   Gallery       Committee     pilani.ac.in           │
│  │                 │    Event       Achievements                          │
│  └─────────────────┘    galleries   Stats         PHONE                   │
│   ↑ type only, no        ↑ tier-2   Contact        +91 832 258 0000       │
│     surface, no radius     link                                           │
│                                                   CAMPUS                  │
│   Sport and fitness at                             Student Activity Centre│
│   BITS Pilani Goa. Five                            BITS Pilani, Goa Campus│
│   facilities, open 05:00                           Zuarinagar, Goa        │
│   to 23:00.                                                               │
│                                                                           │
│   ↑ cols 1-4            ↑ cols 6-7  ↑ cols 8-9    ↑ cols 10-12            │
├───────────────────────────────────────────────────────────────────────────┤ ← border-t border-line
│  © 2026 Student Activity Centre, BITS Pilani Goa    ( SAMPLE DATA )       │
│                                    Made for BITS Goa                      │
└───────────────────────────────────────────────────────────────────────────┘
     ↑ cols 1-5                ↑ cols 6-9         ↑ cols 10-12 (right-aligned)
   no vertical column dividers anywhere — separation is negative space only
```

```
MOBILE <640  ·  single column, gutter 1rem
──── border-t border-line ───
┌─────────────────────────┐
│ ▸ STUDENT ACTIVITY      │
│   CENTRE                │
│                         │
│  SAC                    │
│                         │
│  Sport and fitness at   │
│  BITS Pilani Goa. Five  │
│  facilities, open 05:00 │
│  to 23:00.              │
│                         │
│ ▸ REACH US              │
│  EMAIL                  │
│  sac@goa.bits-          │
│  pilani.ac.in        [48│
│  PHONE                  │
│  +91 832 258 0000    [48│
│  CAMPUS                 │
│  Student Activity Centre│
│  BITS Pilani, Goa Campus│
│  Zuarinagar, Goa        │
│                         │
│ ▸ EXPLORE               │
│ ┌──────────┬──────────┐ │
│ │Activities│Events    │ │
│ ├──────────┼──────────┤ │
│ │Gallery   │Event     │ │
│ │          │galleries │ │
│ └──────────┴──────────┘ │
│                         │
│ ▸ THE CENTRE            │
│ ┌──────────┬──────────┐ │
│ │People    │In-charges│ │
│ ├──────────┼──────────┤ │
│ │Committee │Achievemts│ │
│ ├──────────┼──────────┤ │
│ │Stats     │Contact   │ │
│ └──────────┴──────────┘ │
├─────────────────────────┤ ← border-t border-line
│ © 2026 Student Activity │
│ Centre, BITS Pilani Goa │
│ ( SAMPLE DATA )         │
│ Made for BITS Goa       │
└─────────────────────────┘
  each cell 48px min height
```

**Elements**

| Slot | Content | Type token | Color token | Surface/radius | Spacing | Notes |
|---|---|---|---|---|---|---|
| `<footer>` root | wrapper | — | bg `--color-void` | `mesh-teal`, no radius | `pt-[var(--space-section)] pb-10` | `position: relative; overflow-hidden` to bound the bloom |
| Mesh bloom | `::before` | — | `--color-teal-500` + `--color-volt` stops | absolute inset-0, no radius | — | `filter: blur(80px)`, `--mesh-strength:.25`, `pointer-events:none`, `z-0`. Content sits `z-10` |
| Top hairline | 1px rule | — | `--color-line` | `border-t`, no radius | full-bleed, 0 margin | Marks the page's last edge |
| A · eyebrow | `STUDENT ACTIVITY CENTRE` | `--text-eyebrow` | `--color-volt` | none | `mb-6` | `uppercase tracking-[0.2em]`. Volt instance 1 of 4 |
| A · wordmark mask | `overflow-hidden` wrapper | — | — | none | `mb-5` | Exists only to clip the wordmark's y-rise. `overflow-hidden pb-[0.12em]` so descender-free caps don't clip at large sizes |
| A · wordmark | `SAC` → `/` | `--text-display-l` | `--color-cream` | none — type only | line-height `0.92` | `font-display font-semibold tracking-[-0.03em]`. **Cream, not volt**: an 88px glyph mass in volt would alone eat the ≤10% accent budget for the footer viewport; cream is the token for display headlines and this is one |
| A · wordmark hover | — | `--color-fg` | — | — | — | Cream → fg on hover/focus. No underline (it is a logotype, not a nav item) |
| A · positioning line | one sentence | `--text-lead` | `--color-fg-muted` | none | `max-w-[34ch]` | Below the wordmark, not beside it |
| B · nav heading | `EXPLORE` | `--text-eyebrow` | `--color-volt` | none | `mb-5` | `<h2 id="ft-explore">`, styled as eyebrow. Volt instance 2 |
| B · tier-1 links ×3 | Activities, Events, Gallery | `--text-body` | `--color-fg-muted` | `active:bg-raised` `--radius-sm` | `py-2` desktop, `py-3` mobile | `<li><Link>`. Rest = fg-muted |
| B · tier-2 link ×1 | Event galleries | `--text-meta` | `--color-fg-muted` | same | `pl-4 py-2` / `py-3` mobile | Indent `pl-4` on `lg+` only; flat inside the 2-col grid on mobile |
| B/C · underline wipe | `::after` on tier-1 links | — | `--color-volt` | 1px bar, no radius | `absolute left-0 -bottom-0.5 h-px w-full` | `scaleX(0)` → `scaleX(1)`, `origin-left`. Volt instance 3 — only one is ever visible at a time |
| B/C · tier-2 hover | — | — | `--color-fg` | — | — | Colour shift only, **no** underline — that is the tier signal |
| C · nav heading | `THE CENTRE` | `--text-eyebrow` | `--color-volt` | none | `mb-5` | `<h2 id="ft-centre">`. Volt instance 4 |
| C · tier-1 links ×4 | People, Achievements, Stats, Contact | `--text-body` | `--color-fg-muted` | `active:bg-raised` `--radius-sm` | `py-2` / `py-3` | Same recipe as column B |
| C · tier-2 links ×2 | In-charges, Committee | `--text-meta` | `--color-fg-muted` | same | `pl-4 py-2` / `py-3` | Nested directly under People in DOM order |
| D · heading | `REACH US` | `--text-eyebrow` | `--color-volt` | none | `mb-5` | `<h2>`, not a `<nav>` — these are addresses, not navigation |
| D · field labels ×3 | `EMAIL` `PHONE` `CAMPUS` | `--text-eyebrow` | `--color-fg-muted` | none | `mb-1`, groups `space-y-6` | Muted, **not volt** — three more volt eyebrows here would breach budget. No lucide icons: graphic-led means type does the labelling |
| D · mailto | `sac@goa.bits-pilani.ac.in` | `--text-meta` | `--color-fg-muted` | `active:bg-raised` `--radius-sm` | `py-1` / `py-3` mobile | `href="mailto:…"`, gets the volt underline wipe. `break-all` guard for the 2-col slot |
| D · tel | `+91 832 258 0000` | `--text-meta` | `--color-fg-muted` | same | `py-1` / `py-3` | `href="tel:+918322580000"` — digits stripped, display keeps spaces |
| D · address | 3 lines | `--text-meta` | `--color-fg-muted` | none | `leading-relaxed` | `<address>` element, `not-italic`. Not a link — no verified map URL exists |
| Bottom hairline | 1px rule | — | `--color-line` | `border-t`, no radius | full-bleed, `mt-16` from block above | Second and last rule |
| Bottom · copyright | `© {year} Student …` | `--text-meta` | `--color-fg-muted` | none | `py-6` | Year from `new Date().getFullYear()` |
| Bottom · chip | `SAMPLE DATA` | `--text-eyebrow` | text `--color-volt`, border `--color-line-volt` | `rounded-full`, `border`, no fill | `px-2.5 py-1` | The site-wide mock-data disclosure. Unfilled outline keeps volt coverage negligible |
| Bottom · sign-off | `Made for BITS Goa` | `--text-meta` | `--color-fg-muted` | none | `py-6` | Right-aligned `lg+`, left-aligned mobile |
| Column dividers | **none** | — | — | — | — | Deliberate: four `border-l` rules would put six 1px lines in a 200px-tall band. Negative space and the col-1 type mass carry the separation |
| Focus ring | global | — | `--color-volt` | `outline: 2px solid; outline-offset: 3px` | — | Inherited from the global rule; the underline `::after` sits at `-bottom-0.5` so the 3px offset never collides with it |
| Not present | back-to-top / social / newsletter / form | — | — | — | — | See Copy notes |

**Copy**

```
COLUMN A — identity
eyebrow:        STUDENT ACTIVITY CENTRE
wordmark:       SAC
positioning:    Sport and fitness at BITS Pilani Goa. Five facilities, open 05:00 to 23:00.

COLUMN B — sitemap
heading:        EXPLORE
link 1:         Activities            → /activities
link 2:         Events                → /events
link 3:         Gallery               → /gallery
link 3a:        Event galleries       → /gallery/events

COLUMN C — sitemap
heading:        THE CENTRE
link 1:         People                → /people
link 1a:        Faculty in-charges    → /people/incharges
link 1b:        Student committee     → /people/committee
link 2:         Achievements          → /achievements
link 3:         Stats                 → /stats
link 4:         Contact               → /contact

COLUMN D — contact
heading:        REACH US
label 1:        EMAIL
value 1:        sac@goa.bits-bits-pilani.ac.in   ← DO NOT USE, see corrected line
value 1:        sac@goa.bits-pilani.ac.in        → mailto:sac@goa.bits-pilani.ac.in
label 2:        PHONE
value 2:        +91 832 258 0000                 → tel:+918322580000
label 3:        CAMPUS
value 3 line 1: Student Activity Centre
value 3 line 2: BITS Pilani, Goa Campus
value 3 line 3: Zuarinagar, Goa

BOTTOM BAR
left:           © 2026 Student Activity Centre, BITS Pilani Goa
center chip:    SAMPLE DATA
right:          Made for BITS Goa

ALT / ARIA
wordmark link:  (accessible name is the visible text "SAC" — no aria-label added)
nav B:          aria-labelledby="ft-explore"
nav C:          aria-labelledby="ft-centre"
chip:           title="Figures, schedules and rosters on this site are sample data."
```

`SAMPLE DATA` chip `title` is supplementary only — the chip's own text already carries the meaning, so nothing is hidden behind hover.

**Layout**

| Breakpoint | Grid | Spans | Gaps | Notes |
|---|---|---|---|---|
| `>=1024` (lg, xl, 2xl) | `grid grid-cols-12` | A `col-span-4` (1-4) · B `col-start-6 col-span-2` · C `col-start-8 col-span-2` · D `col-start-10 col-span-3` | `gap-x-[var(--gutter)] gap-y-0` | Column 5 is intentionally empty — the one piece of structural negative space. Column D gets 3 cols (~300px at 1280) so `sac@goa.bits-pilani.ac.in` at `--text-meta` fits on two lines max. Bottom bar: `grid-cols-12`, copyright `col-span-5`, chip `col-start-6 col-span-4` (`justify-self-start`), sign-off `col-start-10 col-span-3` (`justify-self-end`), `items-center` |
| `768–1023` (md) | `grid grid-cols-6` | A `col-span-6` (row 1) · B `col-span-2` · C `col-span-2` · D `col-span-2` (row 2) | `gap-x-[var(--gutter)] gap-y-14` | Identity goes full width and the three utility columns sit beneath it. Wordmark clamps down naturally via `--text-display-l`. Bottom bar becomes `flex flex-wrap items-center justify-between gap-x-6 gap-y-2` |
| `640–767` (sm) | `grid grid-cols-2` | A `col-span-2` · D `col-span-2` · B `col-span-1` · C `col-span-1` | `gap-x-6 gap-y-12` | Sitemaps sit side by side; each group's `<ul>` is single-column here |
| `<640` (mobile) | single column, normal flow | order: **A → D → B → C → bottom bar** | `space-y-12`, gutter `1rem` | Contact before sitemap: on mobile the highest-intent action is call/email, and the navbar sheet already exposes the sitemap. Each group's `<ul>` becomes `grid grid-cols-2 gap-x-4` — B is 2×2, C is 2×3. Tier-2 indent (`pl-4`) is dropped; all links render flat and identical so every cell is a uniform ≥48px target |
| Aspect ratios | — | — | — | None. The footer contains zero images and zero fixed-ratio frames — photography is absent here by design |

**Data**

| Item | Source |
|---|---|
| Selectors used | **None.** The footer is the only section on the site that renders no mock records. Routes are a local constant; contact strings are constants |
| Formatters used | None — no dates, no times, no ISO strings pass through the footer |
| Records rendered | Zero. `mockActivities`, `mockEvents`, `mockPeople`, `mockAchievements`, `mockStats`, `mockGallery`, `mockEventGallery` are all untouched |
| Empty case | N/A — the footer cannot be empty. This is deliberate: the site's route map must survive every data failure, so it never depends on data |
| Latent data dependency | The positioning-line copy asserts **five** facilities and the **05:00 → 23:00** envelope. Both derive from `mockActivities` (5 records; Gym is both earliest open at `05:00` and latest close at `23:00`). Copy is hardcoded, not computed — but a one-assert test pins it so a data edit fails CI instead of quietly making the footer lie |
| Date sensitivity | Copyright year uses `new Date().getFullYear()` → `2026` today. The "today is 2026-08-05, so two of three events are past" problem does **not** touch this section — the footer links `/events` as an index, never a specific event |

**Route coverage — all 15 routes**

| # | Route | Component | Covered by | Direct link? |
|---|---|---|---|---|
| 1 | `/` | `HomePage` | Col A — `SAC` wordmark | yes |
| 2 | `/activities` | `ActivitiesPage` | Col B — Activities | yes |
| 3 | `/activities/:slug` | `ActivityDetailPage` | Col B — via Activities index (5 slugs) | transitive |
| 4 | `/events` | `EventsPage` | Col B — Events | yes |
| 5 | `/events/:slug` | `EventDetailPage` | Col B — via Events index (3 slugs) | transitive |
| 6 | `/gallery` | `GalleryPage` | Col B — Gallery | yes |
| 7 | `/gallery/:slug` | `ActivityGalleryPage` | Col B — via Gallery index (5 slugs) | transitive |
| 8 | `/gallery/events` | `EventGalleryHubPage` | Col B — Event galleries | yes |
| 9 | `/gallery/events/:slug` | `EventGalleryPage` | Col B — via Event galleries hub (3 slugs) | transitive |
| 10 | `/people` | `PeoplePage` | Col C — People | yes |
| 11 | `/people/incharges` | `InchargesPage` | Col C — Faculty in-charges | yes |
| 12 | `/people/committee` | `CommitteePage` | Col C — Student committee | yes |
| 13 | `/achievements` | `AchievementsPage` | Col C — Achievements | yes |
| 14 | `/stats` | `StatsPage` | Col C — Stats | yes |
| 15 | `/contact` | `ContactPage` | Col C — Contact **and** Col D block | yes |

11 direct links cover all 11 static routes; the 4 parameterised routes are unlinkable by definition and are reached through their index. **Zero routes uncovered.** This is what licenses the navbar to drop to 5.

**Spec bugs flagged**

1. **No catch-all route exists.** `src/routes/index.tsx` has no `path="*"`, so an unknown URL renders a blank `<main>` with a live navbar and footer around it. The blueprint (`docs/overhaul-blueprint.md:355`) calls for one and it is missing. When added it becomes route 16 and is intentionally **not** linked from the footer.
2. **`FloatingActionButton` links `/report`, which is not a route.** Confirmed dead CTA in `src/components/layout/FloatingActionButton.tsx`. The footer must not mirror it, and the FAB must be removed or repointed before this footer ships — otherwise the "every route reachable from the footer" invariant is true while a dead CTA still exists elsewhere in the same layout.
3. **Route declaration order is fragile, not broken.** `/gallery/:slug` is declared before `/gallery/events`. React Router 7 ranks static segments above dynamic ones, so the hub still wins — but the order reads like a bug and should be flipped so the file is self-evident.

**Motion**

| Effect | Layer | Trigger | From → To | Duration token | Easing token | Stagger | Reduced-motion |
|---|---|---|---|---|---|---|---|
| Column cascade | Motion (`motion/react`) | `whileInView`, `viewport={{ once: true, margin: "-12%" }}` | `opacity 0, y var(--reveal-y)` → `opacity 1, y 0` | `--dur-slow` | `--ease-out-quint` | `staggerChildren: 0.06` (= `--dur-fast` ÷ 3), 5 children: A, B, C, D, bottom bar | Variants swap to `{opacity:1, y:0}` with `duration: 0` — element renders final, no transform ever applied |
| Wordmark rise | Motion | same `whileInView` as parent (child variant) | `y 110%` → `y 0` inside `overflow-hidden` | `--dur-hero` | `--ease-out-quint` | none (single node), `delay` inherited from A's slot in the cascade | `y 0` immediately; the `overflow-hidden` mask stays (harmless) |
| Link underline wipe | CSS | `:hover`, `:focus-visible` | `scaleX(0)` → `scaleX(1)`, `origin-left` | `--dur-fast` | `--ease-out-quint` | none | `transition-duration: 0ms` — underline appears at full width instantly. Still visible, so the affordance survives |
| Link colour shift | CSS | `:hover`, `:focus-visible` | `--color-fg-muted` → `--color-fg` | `--dur-fast` | `--ease-out-quint` | none | Kept — single-property colour transition, no layout or compositing cost |
| Wordmark colour shift | CSS | `:hover`, `:focus-visible` | `--color-cream` → `--color-fg` | `--dur-fast` | `--ease-out-quint` | none | Kept, same reasoning |
| Tap feedback | CSS | `:active` (touch) | `transparent` → `--color-raised` | `--dur-fast` | `--ease-out-quint` | none | Kept — it is the only confirmation a tap registered |
| Mesh bloom | — | never | static | — | — | — | Static in all modes. Nothing here needs an IntersectionObserver pause because nothing loops |
| Back-to-top | — | — | — | — | — | — | **Does not exist.** The navbar's reveal-on-scroll-up already puts the site logo and full nav one gesture away from any scroll position, so a back-to-top button would be a second control for a solved problem sitting in the exact spot where mobile browsers put their own chrome |

**Code**

```tsx
// src/components/layout/Footer.tsx
import { Link } from "react-router-dom";
import { motion } from "motion/react";

// ponytail: plain arrays, not a route-registry abstraction. 15 routes, one file.
const EXPLORE = [
  { label: "Activities", to: "/activities" },
  { label: "Events", to: "/events" },
  { label: "Gallery", to: "/gallery" },
  { label: "Event galleries", to: "/gallery/events", sub: true },
] as const;

const CENTRE = [
  { label: "People", to: "/people" },
  { label: "Faculty in-charges", to: "/people/incharges", sub: true },
  { label: "Student committee", to: "/people/committee", sub: true },
  { label: "Achievements", to: "/achievements" },
  { label: "Stats", to: "/stats" },
  { label: "Contact", to: "/contact" },
] as const;

const cascade = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }, // --dur-fast / 3
};

const rise = {
  hidden: { opacity: 0, y: "var(--reveal-y)" },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,                        // --dur-slow
      ease: [0.22, 1, 0.36, 1],              // --ease-out-quint
    },
  },
};

const wordmarkRise = {
  hidden: { y: "110%" },
  show: {
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }, // --dur-hero
  },
};
```

Class strings the implementer cannot infer:

```
footer root        relative isolate overflow-hidden border-t border-line bg-void
                   mesh-teal [--mesh-strength:0.25] pt-[var(--space-section)] pb-10

container          relative z-10 mx-auto w-full max-w-[var(--container)]
                   px-[var(--gutter)]

grid               grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6
                   md:grid-cols-6 md:gap-x-[var(--gutter)] md:gap-y-14
                   lg:grid-cols-12 lg:gap-y-0

col A              order-1 sm:col-span-2 md:col-span-6 lg:col-span-4
col D (contact)    order-2 sm:col-span-2 md:col-span-2 md:col-start-5
                   lg:col-span-3 lg:col-start-10 lg:order-none
col B (explore)    order-3 sm:col-span-1 md:col-span-2 md:col-start-1
                   lg:col-span-2 lg:col-start-6 lg:order-none
col C (centre)     order-4 sm:col-span-1 md:col-span-2 md:col-start-3
                   lg:col-span-2 lg:col-start-8 lg:order-none

eyebrow            text-eyebrow font-sans uppercase tracking-[0.2em] text-volt mb-6
label (col D)      text-eyebrow font-sans uppercase tracking-[0.2em] text-fg-muted mb-1

wordmark mask      block overflow-hidden pb-[0.12em] mb-5
wordmark           inline-block font-display font-semibold text-display-l
                   tracking-[-0.03em] leading-[0.92] text-cream
                   transition-colors duration-[var(--dur-fast)]
                   ease-[var(--ease-out-quint)] hover:text-fg focus-visible:text-fg

positioning        text-lead text-fg-muted max-w-[34ch]

link list          grid grid-cols-2 gap-x-4 sm:grid-cols-1 sm:gap-x-0

link (tier-1)      group relative inline-flex min-h-12 items-center py-3 lg:min-h-0
                   lg:py-2 text-body text-fg-muted rounded-sm
                   transition-colors duration-[var(--dur-fast)]
                   ease-[var(--ease-out-quint)] hover:text-fg active:bg-raised
                   after:absolute after:left-0 after:-bottom-0.5 after:h-px
                   after:w-full after:origin-left after:scale-x-0 after:bg-volt
                   after:transition-transform after:duration-[var(--dur-fast)]
                   after:ease-[var(--ease-out-quint)] hover:after:scale-x-100
                   focus-visible:after:scale-x-100

link (tier-2)      same, minus every after:* rule, plus:
                   text-meta lg:pl-4

address            not-italic text-meta text-fg-muted leading-relaxed

bottom rule        mt-16 border-t border-line
bottom bar         relative z-10 mx-auto flex w-full max-w-[var(--container)]
                   flex-col gap-2 px-[var(--gutter)] py-6
                   md:flex-row md:items-center md:justify-between

chip               inline-flex items-center rounded-full border border-line-volt
                   px-2.5 py-1 text-eyebrow font-sans uppercase tracking-[0.2em]
                   text-volt
```

Reduced-motion escape hatch — one hook, no library:

```ts
// src/lib/useReducedMotion.ts is unnecessary: motion/react ships useReducedMotion().
import { useReducedMotion } from "motion/react";
// in Footer: const still = useReducedMotion();
// <motion.div variants={cascade} initial={still ? "show" : "hidden"}
//   whileInView="show" viewport={{ once: true, margin: "-12%" }}>
```

The one check that fails if the footer starts lying:

```ts
// src/components/layout/Footer.test.ts
import { mockActivities } from "@/mock/mockActivities";
import { EXPLORE, CENTRE } from "./Footer";

const STATIC_ROUTES = [
  "/", "/activities", "/events", "/gallery", "/gallery/events",
  "/people", "/people/incharges", "/people/committee",
  "/achievements", "/stats", "/contact",
];

it("footer links cover every static route", () => {
  const hrefs = new Set(["/", ...EXPLORE.map(l => l.to), ...CENTRE.map(l => l.to)]);
  expect(STATIC_ROUTES.filter(r => !hrefs.has(r))).toEqual([]);
});

it("positioning copy still matches the data", () => {
  const times = mockActivities.flatMap(a => a.timings);
  expect(mockActivities.length).toBe(5);                                      // "Five facilities"
  expect(times.map(t => t.openTime).sort()[0]).toBe("05:00");                 // "open 05:00"
  expect(times.map(t => t.closeTime).sort().at(-1)).toBe("23:00");            // "to 23:00"
});
```

**A11y**

| Concern | Spec |
|---|---|
| Landmark | `<footer>` as a direct child of the layout root → implicit `role="contentinfo"`. Do **not** add the role attribute; do **not** nest it inside `<main>` or a `<section>`, which would strip the implicit role |
| Navigation grouping | Two `<nav>` elements, `aria-labelledby="ft-explore"` and `aria-labelledby="ft-centre"`, each pointing at its own `<h2>`. Column D is **not** a `<nav>` — it is a `<div>` with an `<h2>` and an `<address>` |
| Heading level | Footer headings are `<h2>`. The page's single `<h1>` lives in the hero / detail-page header; nothing in the footer competes |
| Lists | Each `<nav>` wraps a `<ul>`; tier-2 links are `<li>` siblings, not a nested `<ul>` — they are peers in the sitemap, and the indent is presentational. `list-none` via Tailwind preflight, no `role="list"` override needed |
| Address semantics | `<address>` wraps only the campus lines. The email and phone links sit outside it — `<address>` is for contact details of the enclosing document's author, and putting nav-adjacent links inside it muddies AT output |
| Tab order | DOM order = `SAC` → Explore (4) → The Centre (6) → mailto → tel = 13 stops. Mobile's contact-first layout is achieved with `order-*`, which does **not** reorder tab focus — that is correct here: the reading order on mobile visually leads with contact, but the sitemap-then-contact tab order matches the desktop composition and keeps focus predictable across breakpoints |
| Focus visible | Global `outline: 2px solid var(--color-volt); outline-offset: 3px`. The underline `::after` sits at `-bottom-0.5` (2px) so it never overlaps the 3px-offset ring. Never `outline: none` |
| Hit targets | Every interactive element `min-h-12` (48px) below `lg`. Verified on the mailto, which is the narrowest |
| Hover-independent meaning | Nothing is revealed by hover. The underline is decoration; the chip's `title` duplicates visible text |
| Contrast (measured on `--color-void` #020a0c) | `--color-fg` 18.6:1 · `--color-cream` 18.6:1 · `--color-volt` 16.8:1 · `--color-fg-muted` **7.8:1** — all pass AA and AAA for normal text |
| `--color-fg-faint` banned here | `#5c706a` on `--color-void` measures **3.83:1** — below AA 4.5:1 for text under 24px. The global token table assigns it to meta and captions; at `--text-meta` on this canvas it fails, so the footer uses `--color-fg-muted` for all meta instead. `--color-fg-faint` must not appear anywhere in `Footer.tsx` |
| Volt budget | 4 eyebrows (~40 glyphs at 11px), 1 chip outline, 1 hover underline, 1 focus ring — under 2% of the footer viewport, well inside the ≤10% cap |
| Absent by decision | No social icons — `src/pages/ContactPage.tsx` currently ships three `href="#"` links (Instagram, Facebook, LinkedIn) and no real URL exists in the repo, so the footer adds none. No newsletter — no backend. No back-to-top — see Motion table |

**Acceptance**

1. Collecting every `href`/`to` in the rendered footer yields exactly the 11 static routes from `src/routes/index.tsx` plus `mailto:sac@goa.bits-pilani.ac.in` and `tel:+918322580000` — no more, no fewer, and zero `href="#"`.
2. `grep -E "fg-faint|#[0-9a-fA-F]{3,6}|shadow-\[" src/components/layout/Footer.tsx` returns no matches.
3. `grep -Ei "instagram|facebook|linkedin|newsletter|subscribe|back to top|<input" src/components/layout/Footer.tsx` returns no matches.
4. At 375px width, every interactive element in the footer has `getBoundingClientRect().height >= 48`.
5. With `prefers-reduced-motion: reduce` emulated, every node inside `<footer>` reports `getComputedStyle(el).transform === "none"` immediately after mount, and the `SAC` wordmark is fully visible without scrolling into view.
6. At 1280px width the footer's four blocks occupy grid columns 1-4, 6-7, 8-9 and 10-12, column 5 contains no rendered content, and no element inside the footer has a `border-left` or `border-right`.
7. The `SAC` wordmark's computed `color` equals `--color-cream` at rest and `--color-fg` on `:hover`, and it is wrapped in an ancestor with `overflow: hidden`.
8. Both `Footer.test.ts` assertions pass, and editing `mockActivities` to 4 records fails the second one.

---

## Part 4 — Shell and navigation

The one component present on every route, and the anchor/route hybrid that lets the same five links work on the homepage and off it.

---

### Navbar & anchor/route hybrid

Persistent chrome that disappears over the hero, hardens on scroll, and tracks the reader's position with a single volt underline — five destinations, one CTA, nothing else.

**Why 7 → 5:** a flat 7-link bar (`Activities Stats Gallery Events People Achievements Contact`) is a dashboard sidebar laid on its side — it presents every table in the app as a peer instead of telling a story. Stats and Achievements are reached from `#impact`; Contact is the CTA and the footer.

**Prerequisite:** `motion` is not in `package.json` (checked: no `motion`, `framer-motion`, or `gsap` in deps or `node_modules`). `npm i motion` before this chapter is implementable.

**Canvas**

| Property | Value |
| --- | --- |
| Background — hero state | none (`bg-transparent`); the hero's own `mesh-volt` shows through |
| Background — scrolled | `--color-void` at 72% (`bg-void/72`) + `backdrop-blur-xl` (24px, under the 80px cap) |
| Background — over light section | `--color-cream` at 92% (`bg-cream/92`) + `backdrop-blur-xl` |
| Mesh utility | none on the header itself; mobile overlay only |
| Mesh strength | `mesh-volt` with `[--mesh-strength:0.3]` on the mobile overlay panel |
| Vertical padding | none — fixed height (`h-20` hero / `h-16` scrolled), items `items-center` |
| Container | inner wrapper `max-w-[var(--container)] mx-auto px-[var(--gutter)]`; the header shell itself is full-bleed `fixed inset-x-0 top-0 z-50` |
| Bottom rule | `border-b border-transparent` → `border-b border-line` when scrolled (`border-line-strong` on light) |
| Out of flow | header is `fixed`, so the hero owns its own top offset; sections carry `scroll-margin-top: 5rem` |

**Wireframe**

```
A. DESKTOP >=1024 · hero state (scrollY < 80)
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2 │  3   4   5   6   7   8   9  10 │ 11  12                          │
│ ┌─────────┐   ACTIVITIES  EVENTS  GALLERY  PEOPLE  IMPACT ┌────────────┐  │
│ │ SAC Goa │   ══════════                                  │Get involved│  │
│ └─────────┘   volt 2px underline (layoutId) marks active  └────────────┘  │
│  cols 1-2     cols 3-10, flex justify-end, gap-8           cols 11-12     │
│  h-20 · background transparent · no bottom rule · links cream             │
└───────────────────────────────────────────────────────────────────────────┘

B. DESKTOP >=1024 · scrolled state (scrollY >= 80, active section = Gallery)
┌───────────────────────────────────────────────────────────────────────────┐
│  1   2 │  3   4   5   6   7   8   9  10 │ 11  12                          │
│ ┌─────────┐   ACTIVITIES  EVENTS  GALLERY  PEOPLE  IMPACT ┌────────────┐  │
│ │ SAC Goa │                      ═══════                  │Get involved│  │
│ └─────────┘                                               └────────────┘  │
│═══════════════════════════════════════════════════════════════════════════│
│  h-16 · bg-void/72 backdrop-blur-xl · border-b border-line · links muted  │
└───────────────────────────────────────────────────────────────────────────┘

C. MOBILE <640 · bar
┌─────────────────────────┐
│ SAC Goa           ┌───┐ │
│                   │ ≡ │ │
│                   └───┘ │
│ h-16 · 48x48 trigger    │
└─────────────────────────┘

D. MOBILE <640 · full-screen overlay (Radix Sheet, side=right, w-full)
┌─────────────────────────┐
│ SAC Goa           ┌───┐ │
│                   │ X │ │
│                   └───┘ │
│ ▸ MENU                  │
│                         │
│ 01  Activities          │
│─────────────────────────│
│ 02  Events              │
│─────────────────────────│
│ 03  Gallery             │
│─────────────────────────│
│ 04  People              │
│─────────────────────────│
│ 05  Impact              │
│                         │
│ ┌─────────────────────┐ │
│ │    Get involved     │ │
│ └─────────────────────┘ │
│ BITS Pilani, Goa Campus │
│ rajesh.kumar@goa.bits-  │
│ pilani.ac.in            │
│ ▸ SAMPLE CONTACT DATA   │
└─────────────────────────┘
```

**Elements**

| Slot | Content | Type token | Color token | Surface/radius | Spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Skip link | "Skip to content" | `--text-meta` uppercase `tracking-[0.12em]` | text `--color-ink` on `--color-volt` | `--radius-sm` | `px-4 py-2`, `left-4 top-4` | First focusable node in the DOM; `-translate-y-[150%]` until `focus-visible` |
| Header shell | — | — | bg per state table | no radius | `h-20` → `h-16` | `fixed inset-x-0 top-0 z-50`; grain layer (`z-100`) sits above it |
| Header inner | — | — | — | — | `max-w-[var(--container)] px-[var(--gutter)]` | `lg:grid lg:grid-cols-12 lg:gap-x-6`, `items-center h-full` |
| Bottom hairline | 1px rule | — | `--color-line` (`--color-line-strong` on light) | — | — | `border-b`; transparent in hero state so height animates without a visible jump |
| Wordmark | "SAC Goa" | `--text-title` `font-display font-semibold tracking-[-0.04em] leading-none` | `--color-volt` (`--color-teal-700` on light) | — | cols 1-2, `justify-self-start` | `<Link to="/">`; `aria-label` expands the acronym; on `/` also `window.scrollTo({top:0})` |
| Nav list | 5 items | — | — | — | cols 3-10, `flex justify-end gap-8` | `<nav aria-label="Primary">` > `<ul>`; `hidden lg:flex` |
| Nav link | "Activities" … "Impact" | `--text-meta` uppercase `tracking-[0.14em] font-medium` | hero `--color-cream` / scrolled `--color-fg-muted` / light `--color-teal-900`; hover `--color-volt` / `--color-fg` / `--color-ink` | no radius, `h-10` hit area | `py-2` | `<a href="#id">` on `/`, `<Link to={route}>` elsewhere |
| Active underline | 2px bar | — | `--color-volt` (`--color-teal-700` on light) | `rounded-full` | `absolute -bottom-1 inset-x-0 h-0.5` | Single `motion.span layoutId="nav-underline"` — exists once in the tree, slides between links |
| Hover underline | none | — | — | — | — | Deliberately absent: hover is colour-only so the volt bar means exactly one thing |
| Divider | 1px vertical rule | — | `--color-line-strong` (`--color-teal-900` on light) | — | `h-4 w-px mx-6`, `hidden lg:block` | Separates nav group from CTA |
| CTA pill | "Get involved" | `--text-meta` uppercase `tracking-[0.12em] font-semibold` | `--color-ink` on `--color-volt`; hover `--color-cream`; pressed `--color-volt-600`; light-section fill `--color-teal-700` with `--color-cream` text | `rounded-full`, `h-11` | `px-5 gap-2`, cols 11-12 `justify-self-end` | `hidden sm:inline-flex`; `hover:shadow-glow` |
| CTA icon | lucide `ArrowUpRight` | `size-3.5` | `currentColor` | — | `gap-2` from label | `aria-hidden`, `strokeWidth={2}` |
| Menu trigger | lucide `Menu` | `size-5` | `--color-cream` (hero) / `--color-fg` (scrolled) | `--radius-sm`, `size-12` | `-mr-2`, `grid place-items-center` | `lg:hidden`; 48x48; `aria-label="Open menu"`; Radix supplies `aria-expanded`/`aria-controls` |
| Overlay panel | — | — | `bg-void/97` + `mesh-volt` @ `0.3` | no radius, full viewport | `px-4 pt-4 pb-8`, `flex flex-col` | `SheetContent side="right"` forced to `w-full`; `showCloseButton={false}` |
| Overlay title | "Site menu" | `--text-meta` | — | — | — | `<SheetTitle className="sr-only">` — Radix Dialog requires it |
| Overlay wordmark | "SAC Goa" | `--text-title` `font-display tracking-[-0.04em]` | `--color-volt` | — | top row, `justify-between` | Same link as the bar; closes the sheet on click |
| Overlay close | lucide `X` | `size-5` | `--color-fg-muted`, hover `--color-fg` | `--radius-sm`, `size-12` | top-right | `<SheetClose asChild>`; `aria-label="Close menu"` |
| Overlay eyebrow | "Menu" | `--text-eyebrow` uppercase `tracking-[0.2em]` | `--color-volt` | — | `mt-8 mb-4` | Preceded by the `▸` glyph as a text node |
| Overlay item row | numeral + label | — | — | `min-h-12` | `py-4`, `divide-y divide-line` | `<button>` (calls `go()`), full-width, `text-left` |
| Overlay numeral | "01" … "05" | `--text-meta` `font-display tabular-nums` | `--color-fg-faint` | — | `w-8 shrink-0` | Zero-padded index, decorative but readable |
| Overlay label | "Activities" … "Impact" | `--text-display-m` `font-display font-semibold tracking-[-0.03em] leading-[0.92]` | `--color-cream`; active `--color-volt` | — | — | Not uppercase — display type never is |
| Overlay row divider | 1px rule | — | `--color-line` | — | — | From `divide-y`, last row excluded via `[&>li:last-child]:border-0` |
| Overlay CTA | "Get involved" | `--text-meta` uppercase `tracking-[0.12em] font-semibold` | `--color-ink` on `--color-volt` | `rounded-full`, `h-12` | `w-full`, `mt-auto` | Same target as the desktop pill |
| Overlay campus line | "BITS Pilani, Goa Campus" | `--text-meta` | `--color-fg-muted` | — | `mt-6` | Static, not mock-derived |
| Overlay email | `rajesh.kumar@goa.bits-pilani.ac.in` | `--text-meta` | `--color-cream-dim`, hover `--color-volt` | — | `mt-1`, `min-h-12 inline-flex items-center` | `mailto:` from `getPeopleByRole("INCHARGE")[0].email` |
| Overlay mock tag | "Sample contact data" | `--text-eyebrow` uppercase `tracking-[0.2em]` | `--color-fg-faint` | — | `mt-2` | Required label — an address a visitor could mistake for live |

**Copy**

```
Wordmark:            SAC Goa
Wordmark aria-label: Student Activity Centre, BITS Pilani Goa — home

Nav labels (in order): Activities   Events   Gallery   People   Impact
Nav aria-label:        Primary

CTA:                 Get involved

Skip link:           Skip to content

Menu trigger aria-label: Open menu
Close button aria-label: Close menu
Sheet title (sr-only):   Site menu

Overlay eyebrow:     Menu
Overlay numerals:    01  02  03  04  05
Overlay footer:      BITS Pilani, Goa Campus
Overlay email:       rajesh.kumar@goa.bits-pilani.ac.in
Overlay mock tag:    Sample contact data
```

**Layout**

| Breakpoint | Composition |
| --- | --- |
| `>=1024` (lg/xl/2xl) | `grid-cols-12`, `gap-x-6`, container `1280px`, gutter `clamp(1rem,4vw,2.5rem)`. Wordmark cols 1-2 (`justify-self-start`). Nav cols 3-10, `flex justify-end gap-8`, each link `h-10`. Divider `w-px h-4 mx-6`. CTA cols 11-12 `justify-self-end`, `h-11`. Header height `80px` → `64px`. |
| `640–1023` (sm/md) | `flex justify-between`. Wordmark left, then `gap-3`: CTA pill (`h-11`, `px-4`) + hamburger (`size-12`). Desktop nav hidden — five caps labels plus a pill do not fit inside `768px − 2×4vw` gutters, and squeezing them re-creates the dashboard density. Header height `80px` → `64px`. |
| `<640` | `flex justify-between`, gutter `1rem`. Wordmark left, hamburger right (`size-12`, `-mr-2`). CTA lives in the overlay only. Header height `64px` at all scroll positions (no `h-20` on mobile: the hero has less room to give). Overlay is one column, full viewport, rows `min-h-12`, no aspect-ratio frames, no pinned behaviour. |

**Data**

| Selector | Use | Records rendered |
| --- | --- | --- |
| `getPeopleByRole("INCHARGE")[0]` | Mobile overlay footer contact | `Dr. Rajesh Kumar` → `rajesh.kumar@goa.bits-pilani.ac.in` |
| — | Desktop bar | No mock data at all |

- The five destinations are a static module constant, not derived from data — `getActivityCategories()` returns only `Sports` and `Fitness` and must never drive nav labels.
- **No event badge, no "upcoming" chip, no live dot in the chrome.** Given today = `2026-08-05`, `interbits-football` (2026-06-12) and `fitness-challenge` (2026-07-01) are past and `swimming-championship` is *today*; a header badge would render "1 today" for exactly one day and "0 upcoming" forever after. Live state belongs to the hero, where it has room to explain itself.
- **Empty case:** if `getPeopleByRole("INCHARGE")` is empty, the overlay footer drops the `mailto` row and the "Sample contact data" tag and keeps "BITS Pilani, Goa Campus". Nav and CTA never have an empty state.

**Motion**

| Effect | Layer | Trigger | From → To | Duration | Easing | Stagger | Reduced motion |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Chrome hardens | CSS (class swap on `motion.header`) | `scrollY` crosses 80 | `h-20` / transparent / no rule → `h-16` / `bg-void/72` / `border-line` | `--dur-std` | `--ease-out-quint` | — | `motion-reduce:transition-none` — end state applies instantly |
| Header hides | Motion (`animate` on `motion.header`) | `scrollY > 400` and delta > 0 | `y: 0` → `y: "-100%"` | `--dur-std` | `--ease-in-out-quart` | — | Disabled entirely (`useReducedMotion()` guard in the hook) — header stays put |
| Header reveals | Motion | any upward delta | `y: "-100%"` → `y: 0` | `--dur-fast` | `--ease-out-quint` | — | n/a (never hidden) |
| Underline travels | Motion layout (`layoutId="nav-underline"`) | active section / route changes | previous link box → new link box | `--dur-std` | `--ease-out-quint` | — | `MotionConfig reducedMotion="user"` → snaps to the new position, opacity only |
| Link colour | CSS | `hover` / `focus-visible` | muted → `--color-fg` (hero: cream → volt) | `--dur-fast` | `--ease-out-quint` | — | Colour transitions are exempt but still tokenised; no transform involved |
| CTA fill | CSS | `hover` → `active` | `bg-volt` → `bg-cream`; pressed `bg-volt-600` + `translate-y-px` | `--dur-fast` | `--ease-out-quint` | — | `motion-reduce:active:translate-y-0` |
| CTA glow | CSS | `hover` | no shadow → `shadow-glow` | `--dur-fast` | `--ease-out-quint` | — | Unchanged (opacity-class effect, no motion) |
| CTA icon nudge | CSS | `group-hover` | `translate-x-0 translate-y-0` → `translate-x-0.5 -translate-y-0.5` | `--dur-fast` | `--ease-out-quint` | — | `motion-reduce:transform-none` |
| Skip link drop | CSS | `focus-visible` | `-translate-y-[150%]` → `translate-y-0` | `--dur-fast` | `--ease-out-quint` | — | `motion-reduce:transition-none`; still becomes visible |
| Overlay enter | CSS (`tw-animate-css` on `SheetContent`) | Sheet opens | `opacity-0 translate-x-10` → `opacity-100 translate-x-0` | `--dur-std` | `--ease-out-quint` | — | `motion-reduce:animate-none` |
| Overlay exit | CSS | Sheet closes | instant (`data-closed:duration-0`) | — | — | — | Same. Deliberate: the scroll lock must be gone before the hash scroll runs |
| Overlay rows in | Motion variants | Sheet `open === true` | `opacity: 0, y: var(--reveal-y)` → `opacity: 1, y: 0` | `--dur-std` | `--ease-out-quint` | 60ms (`staggerChildren: 0.06`) | `y` dropped by `reducedMotion="user"`; stagger collapses to `0` via `useReducedMotion()` |

**Code**

`src/components/layout/nav.ts`

```ts
// Impact routes to /stats — the deep route exists today; there is no /impact page.
export const NAV = [
  { id: "activities", label: "Activities", route: "/activities" },
  { id: "events",     label: "Events",     route: "/events" },
  { id: "gallery",    label: "Gallery",    route: "/gallery" },
  { id: "people",     label: "People",     route: "/people" },
  { id: "impact",     label: "Impact",     route: "/stats" },
] as const;

export type NavItem = (typeof NAV)[number];

// Module-level constant => stable identity => useScrollSpy's effect never re-runs on render.
export const NAV_IDS = NAV.map((n) => n.id) as readonly string[];
```

`src/components/layout/useHeaderState.ts` — scroll state as a motion value, not per-frame React state

```ts
import { useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

export function useHeaderState() {
  const { scrollY } = useScroll();          // wraps scrollY.on("change") with cleanup
  const reduce = useReducedMotion();
  const last = useRef(0);
  const [s, setS] = useState({ solid: false, hidden: false });

  useMotionValueEvent(scrollY, "change", (y) => {
    const solid = y > 80;
    const hidden = !reduce && y > 400 && y > last.current;
    last.current = y;
    // Returning the SAME object when nothing crossed a threshold makes React bail out:
    // the handler runs every frame, the component renders ~4x for a whole-page scroll.
    setS((p) => (p.solid === solid && p.hidden === hidden ? p : { solid, hidden }));
  });

  return s;
}
```

`src/components/layout/useScrollSpy.ts` — thin sentinel band under the sticky header

```ts
import { useEffect, useState } from "react";

/**
 * rootMargin beats scroll math here:
 *  - no scroll listener, no getBoundingClientRect() per frame, so no forced reflow;
 *  - stays correct when section heights change under us (Unsplash images finishing load,
 *    the GSAP-pinned #focus scene inflating document height, mobile rails wrapping) —
 *    offsetTop caches would need invalidating on resize, font load and pin refresh;
 *  - the sticky header is expressed as one number: -72px = 64px solid header + 8px breathing room.
 * "-72px 0px -85% 0px" leaves a ~90px band just below the header. Only one section can occupy
 * it, so threshold 0 is enough and the flip happens exactly at the section boundary —
 * no intersectionRatio comparison, which is biased toward short sections.
 */
export function useScrollSpy(ids: readonly string[], enabled: boolean, pathname: string) {
  const [state, setState] = useState<{ active: string | null; overLight: boolean }>({
    active: null,
    overLight: false,
  });

  useEffect(() => {
    const live = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.isIntersecting ? live.add(e.target) : live.delete(e.target);

        let active: string | null = null;
        if (enabled) {
          for (let i = ids.length - 1; i >= 0; i--) {
            const el = document.getElementById(ids[i]);
            if (el && live.has(el)) { active = ids[i]; break; }
          }
        }
        let overLight = false;
        for (const el of live) if ((el as HTMLElement).dataset.tone === "light") overLight = true;

        setState((p) => (p.active === active && p.overLight === overLight ? p : { active, overLight }));
      },
      { rootMargin: "-72px 0px -85% 0px", threshold: 0 },
    );

    const targets = new Set<Element>();
    for (const id of ids) { const el = document.getElementById(id); if (el) targets.add(el); }
    document.querySelectorAll("[data-tone='light']").forEach((el) => targets.add(el));
    targets.forEach((el) => io.observe(el));

    return () => io.disconnect();
    // pathname in deps: Navbar lives above the route outlet and never remounts, so the
    // observer must re-query the DOM after every navigation.
  }, [ids, enabled, pathname]);

  return state;
}
```

`src/components/layout/useHashScroll.ts` — mount in `MainLayout`, once

```ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useHashScroll() {
  const { hash, key } = useLocation();   // key changes on every push, so /#events twice still scrolls
  useEffect(() => {
    if (!hash) return;
    let a = 0, b = 0;
    // Frame 1: React has committed the new route's DOM. Frame 2: layout/paint has settled
    // (fonts swapped, Sheet unmounted and its scroll lock released) — only then measure & scroll.
    a = requestAnimationFrame(() => {
      b = requestAnimationFrame(() => {
        // No behavior option => the element's computed scroll-behavior wins,
        // which is smooth only under prefers-reduced-motion: no-preference (see CSS below).
        document.querySelector(hash)?.scrollIntoView({ block: "start" });
      });
    });
    return () => { cancelAnimationFrame(a); cancelAnimationFrame(b); };
  }, [hash, key]);
}
```

`src/index.css` additions

```css
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
/* 5rem = 64px solid header + 16px, so an anchored heading is never tucked under the bar */
section[id] { scroll-margin-top: 5rem; }
```

`src/components/layout/Navbar.tsx` — the class strings that matter

```tsx
const isHome = pathname === "/";
const { solid, hidden } = useHeaderState();
const { active, overLight } = useScrollSpy(NAV_IDS, isHome, pathname);
const tone = overLight ? "light" : solid ? "solid" : "hero";

const HEADER = {
  base:  "fixed inset-x-0 top-0 z-50 border-b transition-[height,background-color,border-color] duration-[var(--dur-std)] ease-[var(--ease-out-quint)] motion-reduce:transition-none",
  hero:  "h-16 lg:h-20 bg-transparent border-transparent",
  solid: "h-16 bg-void/72 backdrop-blur-xl border-line",
  light: "h-16 bg-cream/92 backdrop-blur-xl border-line-strong",
}[/* tone */];

const LINK = {
  base:  "relative inline-flex h-10 items-center text-meta font-medium uppercase tracking-[0.14em] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-quint)]",
  hero:  "text-cream hover:text-volt",
  solid: "text-fg-muted hover:text-fg",
  light: "text-teal-900 hover:text-ink",
};

const CTA = {
  base:  "group hidden h-11 items-center gap-2 rounded-full px-5 text-meta font-semibold uppercase tracking-[0.12em] transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out-quint)] hover:shadow-glow sm:inline-flex",
  dark:  "bg-volt text-ink hover:bg-cream active:bg-volt-600 active:translate-y-px motion-reduce:active:translate-y-0",
  light: "bg-teal-700 text-cream hover:bg-teal-900 active:bg-teal-900",
};

// One underline in the whole tree; layoutId does the travelling.
{isActive && (
  <motion.span
    layoutId="nav-underline"
    className={cn("absolute -bottom-1 inset-x-0 h-0.5 rounded-full",
      overLight ? "bg-teal-700" : "bg-volt")}
    transition={{ duration: DUR.std, ease: EASE_OUT_QUINT }}
  />
)}

<motion.header
  animate={{ y: hidden ? "-100%" : 0 }}
  transition={{ duration: hidden ? DUR.std : DUR.fast,
                ease: hidden ? EASE_IN_OUT_QUART : EASE_OUT_QUINT }}
  className={cn(HEADER.base, HEADER[tone])}
>
```

Desktop link — anchor on `/`, route everywhere else:

```tsx
{NAV.map((l) => {
  const isActive = isHome ? active === l.id : pathname.startsWith(l.route);
  const cls = cn(LINK.base, LINK[tone]);
  const current = isActive ? ("page" as const) : undefined;
  return (
    <li key={l.id}>
      {isHome ? (
        // Plain anchor: the browser scrolls natively, CSS supplies smooth + reduced-motion.
        <a href={`#${l.id}`} className={cls} aria-current={current}>{l.label}{underline}</a>
      ) : (
        // Cross-route: land on "/" with the hash, useHashScroll finishes the job after mount.
        <Link to={`/#${l.id}`} className={cls} aria-current={current}>{l.label}{underline}</Link>
      )}
    </li>
  );
})}
```

Mobile overlay — Radix Sheet forced full-screen. Note the variant-prefixed width overrides: `sheet.tsx` ships `data-[side=right]:w-3/4` and `data-[side=right]:sm:max-w-sm`, and `tailwind-merge` only collapses classes carrying the *same* variant prefix.

```tsx
const [open, setOpen] = useState(false);
const navigate = useNavigate();
const reduce = useReducedMotion();

// Mobile always goes through the router (desktop-on-home stays a native anchor):
// a native fragment click inside an open Dialog fights Radix's scroll lock, and
// hashchange does not reliably update useLocation(). One code path, one scroll owner.
const go = (l: NavItem) => {
  setOpen(false);
  navigate(isHome ? { hash: `#${l.id}` } : l.route);
};

<Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild>
    <button aria-label="Open menu"
      className="grid size-12 -mr-2 place-items-center rounded-[var(--radius-sm)] text-cream lg:hidden">
      <Menu className="size-5" />
    </button>
  </SheetTrigger>

  <SheetContent
    side="right"
    showCloseButton={false}
    className="data-[side=right]:w-full data-[side=right]:sm:max-w-none border-l-0 p-0
               bg-void/97 mesh-volt [--mesh-strength:0.3]
               duration-[var(--dur-std)] ease-[var(--ease-out-quint)]
               data-closed:duration-0 motion-reduce:animate-none lg:hidden"
  >
    <SheetTitle className="sr-only">Site menu</SheetTitle>

    <div className="flex h-full flex-col px-4 pt-4 pb-8">
      {/* wordmark + SheetClose X, then the eyebrow */}
      <motion.ul
        initial="hidden" animate="show"
        variants={{ show: { transition: { staggerChildren: reduce ? 0 : 0.06,
                                          delayChildren:  reduce ? 0 : 0.06 } } }}
        className="mt-4 divide-y divide-line [&>li:last-child]:border-0"
      >
        {NAV.map((l, i) => (
          <motion.li key={l.id}
            variants={{ hidden: { opacity: 0, y: 24 },
                        show:   { opacity: 1, y: 0,
                                  transition: { duration: DUR.std, ease: EASE_OUT_QUINT } } }}>
            <button type="button" onClick={() => go(l)}
              aria-current={(isHome ? active === l.id : pathname.startsWith(l.route)) ? "page" : undefined}
              className="flex min-h-12 w-full items-baseline gap-4 py-4 text-left">
              <span className="w-8 shrink-0 font-display text-meta tabular-nums text-fg-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-display-m font-semibold tracking-[-0.03em] leading-[0.92] text-cream aria-[current=page]:text-volt">
                {l.label}
              </span>
            </button>
          </motion.li>
        ))}
      </motion.ul>
      {/* mt-auto footer block: full-width CTA, campus line, mailto, "Sample contact data" */}
    </div>
  </SheetContent>
</Sheet>
```

`src/main.tsx` — one global line so every reduced-motion rule above is real:

```tsx
<MotionConfig reducedMotion="user">{/* … */}</MotionConfig>
```

**DELETE `src/components/layout/FloatingActionButton.tsx`**

| Step | Action |
| --- | --- |
| 1 | `rm src/components/layout/FloatingActionButton.tsx` |
| 2 | `src/components/layout/MainLayout.tsx`: remove the import (line 5) and the `<FloatingActionButton />` element (line 15) |
| 3 | Same file: `bg-white` → `bg-void`, and `<main className="flex-1">` → `<main id="main" tabIndex={-1} className="flex-1 pt-16 lg:pt-20">`; call `useHashScroll()` here |
| 4 | Verify: `grep -rn "FloatingActionButton\|/report" src` returns nothing |

Justification, on the record: `FloatingActionButton.tsx:15` links to `/report`, which is not registered in `src/routes/index.tsx` — a dead CTA on every page of the site. Its other action (`/contact`, line 8) is the same destination as the navbar CTA, in a hard-coded `bg-red-700` that is not in the palette. A floating circular action stack pinned bottom-right is the single most CRUD-shell gesture in the current build, and it collides with the mobile overlay's own CTA.

**A11y**

- `<header>` landmark → `<nav aria-label="Primary">` → `<ul>`/`<li>`. `MainLayout` renders `<main id="main" tabIndex={-1}>` as the skip-link target.
- Exactly one element carries `aria-current="page"`: the scroll-spy winner on `/`, the `pathname.startsWith` match elsewhere. The volt underline is never the only signal.
- Tab order: skip link → wordmark → 5 links → CTA → (below `lg`) menu trigger. Nothing is reachable only by hover.
- Radix Dialog supplies the overlay's focus trap, `Escape`-to-close, `aria-expanded`/`aria-controls` on the trigger, and focus return to the trigger on close. `SheetTitle` is present (`sr-only`) so the dialog is named; `showCloseButton={false}` replaces the shadcn default button, which is styled with off-palette `bg-secondary`.
- Every interactive target is `>=44px` tall on desktop (`h-10` link + `py-2`) and `>=48px` on mobile (`size-12` trigger and close, `min-h-12` rows and CTA).
- Focus ring is the global rule (`outline 2px solid var(--color-volt); outline-offset 3px`); no component overrides it. On the light section, `--color-volt` on `--color-cream` is a weak ring, so `[data-tone-light]` scopes it to `outline-color: var(--color-teal-700)`.
- Measured contrast: cream on void 18.6:1 · fg-muted on void 7.9:1 · volt on void 16.8:1 · ink on volt 16.3:1 · teal-900 on cream/92 ≈ 7.4:1 · ink on cream/92 11.4:1.
- The light-section state is not cosmetic: `bg-void/72` composited over `--color-cream` is `#444f3c`, where `--color-fg-muted` falls to **3.4:1** and fails. Inverting the bar to `bg-cream/92` restores 7.4:1. Sections declare themselves with `data-tone="light"`; the scroll-spy observer already watches them.

**Acceptance**

1. `grep -rn "FloatingActionButton\|/report" src` returns zero matches, and no floating control renders on any route.
2. The desktop bar renders exactly 5 links; clicking each from `/` scrolls to a section that exists in the DOM, and clicking each from `/events/interbits-football` lands on `/activities`, `/events`, `/gallery`, `/people`, `/stats` — all registered in `src/routes/index.tsx`. Zero 404s, zero no-ops.
3. From `/people`, clicking "Impact" ends on `/` with the `#impact` heading's bounding-box `top` between 64px and 200px, and the page is never left parked at scroll 0.
4. At `scrollY = 0` the header's computed `background-color` has alpha 0 and `border-bottom-color` is transparent, height 80px at `>=1024`; at `scrollY = 200` height is 64px with a 1px bottom border computing to `#14262a`.
5. Scrolling down past 400px moves the header fully out of view (computed transform `translateY` = -100% of its height); a single upward wheel tick brings it back within `--dur-fast`.
6. Exactly one element in the document has `aria-current="page"` at any scroll offset, and exactly one `nav-underline` element exists in the DOM at any time.
7. Profiling a full-page scroll shows the header component re-rendering no more than 6 times (threshold and active-section crossings only), never once per frame.
8. On mobile, `Escape` closes the overlay and focus returns to the hamburger; every row, the close button and the CTA measure `>=48px` in the box model.

---

## Part 5 — Component reference

Every shared component: props, states, classes, must-nots. Plus the three files in `src/lib` that all of them read from.

---

### Component API reference I — shell, motion and media primitives

Nine primitives. Every section and every route is assembled from these plus the twelve in reference II. If a section needs a class string these components already own, the section is wrong.

Idiom, matched from `src/components/ui/button.tsx` and `card.tsx`: `cva` for variants, a `data-slot` attribute on the root, `cn()` from `@/lib/utils`, props typed as `React.ComponentProps<"tag"> & VariantProps<typeof x>`, `asChild` via `Slot.Root` from the unified `radix-ui` package. No `forwardRef` — React 19 passes `ref` as a normal prop.

---

#### 0. Three contracts that override every other chapter

The 13 section chapters were authored independently and drifted on all three. These values win.

**C1 — The focus contract.** `src/index.css` sets a global `:focus-visible { outline: 2px solid var(--color-volt); outline-offset: 3px }`, and `.light-section :focus-visible` flips the color to `--color-teal-900`. Therefore:

| Rule | |
|---|---|
| No component in `src/components/**` or `src/pages/**` writes a `focus-visible:` utility for the *ring* | It already exists globally and it already inverts on cream |
| A `focus-visible:` utility is legal **only** to add a non-ring affordance | e.g. `focus-visible:opacity-100` to reveal a hover-only caption for keyboard users |
| The 12 `src/components/ui/*` primitives are the exception | They set `outline-none` and draw `ring-3 ring-ring/30`. `--color-ring` is volt, so the look matches. Do not "fix" them |
| Never `outline-none` on anything you author | |

**C2 — The card contract.** Every card in reference II composes exactly this root. Written once, referenced by name, never re-typed with variations:

```tsx
// src/lib/motion.ts exports this string. Import it; do not retype it.
export const cardRoot =
  "group relative isolate flex flex-col overflow-hidden rounded-lg " +
  "border border-line bg-deep " +
  "transition-[transform,border-color,background-color,box-shadow] " +
  "duration-(--dur-fast) ease-out-quint " +
  "hover:border-line-strong hover:bg-raised hover:shadow-lift " +
  "motion-safe:hover:-translate-y-(--lift)"
```

| Drift found | Canon |
|---|---|
| `-translate-y-[var(--lift)]` (hero, events, gallery) · `-translate-y-[--lift]` (people) | **`-translate-y-(--lift)`** — the parenthesis form is the Tailwind 4 shorthand for a bare custom property. `[--lift]` is a v3 arbitrary-value leftover and emits nothing in v4; `[var(--lift)]` works but is noise |
| `hover:-translate-y-…` bare (hero, people, join) vs `motion-safe:hover:-translate-y-…` (events, gallery) | **always `motion-safe:`** on transform. The global reduced-motion damper zeroes *duration*, so a bare transform still snaps 4px on hover. `motion-safe:` removes it entirely |
| `ease-[--ease-out-quint]` (hero) | **`ease-out-quint`** — it is a real generated utility from `--ease-out-quint`. Arbitrary syntax is never needed for a token |
| `hover:shadow-[var(--shadow-glow)]` (events) | **`hover:shadow-glow`** |
| Image zoom `group-hover:scale-[1.03]` — `motion-safe:lg:` (events) vs `motion-safe:` (gallery) | **`motion-safe:group-hover:scale-[1.03]`**, no `lg:` gate. Hover implies a pointer; a `lg:` breakpoint is the wrong proxy |

**C3 — The interactive-card semantics contract.** A card that navigates is an `<a>`/`<Link>` **as its root** — never a `<div>` with an `onClick`, never a div wrapping a "stretched link" pseudo-element, never nested interactive elements. If a card needs two destinations, the root is a `<div>` and it contains exactly two real links; `cardRoot`'s hover still applies via `group`.

---

#### 1. `Section`

The band. Owns background, mesh, vertical rhythm and the content measure so no section writes `mx-auto max-w-7xl px-6` again (that triplet appears ~12 times today).

```tsx
// src/components/layout/Section.tsx
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
```

| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | Required for the 12 homepage bands — `AnchorNav` and `/#activities` deep links target it |
| `canvas` | `'void' \| 'abyss' \| 'deep' \| 'invert'` | `'void'` | `invert` adds `.light-section`, which rebinds `--color-fg`/`--color-line`/`--color-deep` for the subtree |
| `mesh` | `'none' \| 'volt' \| 'teal' \| 'cream'` | `'none'` | |
| `meshStrength` | `number` | unset | `0.25`–`0.9`. Emitted as an inline `--mesh-strength`; the utility never declares it, so this always wins |
| `bleed` | `boolean` | `false` | `true` skips the `.shell` wrapper — for the gallery reel, the marquee and the two GSAP scenes, which must reach the viewport edge |
| `size` | `'default' \| 'tight' \| 'flush' \| 'screen'` | `'default'` | `default` = `section-y` = `--space-section` |

**Canvas × mesh legality.** `canvas="invert"` pairs only with `mesh="cream"` or `mesh="none"`; `mesh="cream"` pairs only with `canvas="invert"`. Any other combination puts cream text on cream or dark text on dark.

**Must not:** set its own `max-width` (`.shell` owns it) · pair a `mesh-*` with a `bg-*` (the mesh utility sets its own `background-color`; a competing `bg-*` is an ordering coin-flip) · use `overflow-hidden` (`.mesh-*` already uses `overflow: clip`; `hidden` creates a scroll container and breaks `position: sticky` children and the GSAP pin) · animate.

```tsx
<Section id="activities" canvas="abyss" size="default"> … </Section>
<Section id="focus" canvas="void" mesh="volt" meshStrength={0.7} bleed> … </Section>
<Section id="join" canvas="invert" mesh="cream"> … </Section>
```

---

#### 2. `SectionHeading`

The eyebrow + title + lead + optional action block, at the top of every band. Replaces 11 hand-rolled header blocks that render an H1 at five different sizes.

```tsx
type SectionHeadingProps = {
  eyebrow: string
  title: React.ReactNode
  lead?: string
  align?: "start" | "center"
  action?: React.ReactNode
  level?: 2 | 3
  className?: string
}
```

| Slot | Classes |
|---|---|
| Root | `flex flex-col gap-4` + `items-center text-center` when `align="center"` · with `action`: `md:flex-row md:items-end md:justify-between md:gap-8` |
| Eyebrow row | `inline-flex items-center gap-3 text-eyebrow uppercase text-volt` |
| Eyebrow rule | `h-[2px] w-6 rounded-xs bg-volt` · `aria-hidden="true"` |
| Title | `font-display text-display-m text-fg` — size/leading/tracking/weight all arrive from the one token |
| Lead | `text-lead text-fg-muted max-w-[62ch]` (`max-w-[46ch]` only in the hero) |
| Action | `shrink-0` |

**The eyebrow pattern is defined here and nowhere else.** A 24×2px volt bar, then `text-eyebrow uppercase` volt text. `uppercase` + `tracking` is legal only at `--text-eyebrow`; the tracking is already in the token, so never add `tracking-*`.

**`level`** — `2` renders `<h2>` (default, every homepage band), `3` renders `<h3>` (a sub-band inside a route that already has an `<h2>`). It never renders `<h1>`; `PageIntro` owns the H1. This is what keeps the one-h1-per-page rule mechanical.

**Must not:** render an `<h1>` · set its own vertical padding (the `Section` owns rhythm) · accept a `size` prop — one heading scale per band is the point.

---

#### 3. `PageIntro`

The route header. Replaces 11 copies of `min-h-screen bg-[#050816] py-16` plus a bespoke header, and fixes breadcrumbs that are plain text today (`ActivityDetailPage.tsx:25`, `StatsPage.tsx:33`).

```tsx
type Crumb = { label: string; to?: string }   // last crumb omits `to`

type PageIntroProps = {
  breadcrumb: Crumb[]
  eyebrow: string
  title: string
  lead?: string
  meta?: React.ReactNode
}
```

Renders as `<Section canvas="void" mesh="teal" meshStrength={0.4} size="tight">` internally, so a page body starts directly with its own `<Section>`s.

| Slot | Classes | Semantics |
|---|---|---|
| Breadcrumb | `<nav aria-label="Breadcrumb">` › `<ol class="flex flex-wrap items-center gap-2 text-meta text-fg-muted">` | Every crumb with a `to` is a real `<Link>` with `hover:text-volt`. The last crumb is a `<span aria-current="page" class="text-fg">` |
| Separator | `<li aria-hidden="true" class="text-fg-faint">/</li>` | Not a character inside the label |
| Eyebrow | as `SectionHeading` | |
| H1 | `font-display text-display-l text-fg` | **The only `<h1>` on the page** |
| Lead | `text-lead text-fg-muted max-w-[62ch]` | |
| Meta row | `flex flex-wrap items-center gap-x-6 gap-y-2 text-meta text-fg-muted` | e.g. `5 facilities · 2 categories`, both computed — never a typed count (**R11**) |

**Must not:** render a second `<h1>` · be used on `/` (the hero owns the homepage H1) · hardcode a crumb chain — the route chapter supplies it per route.

---

#### 4. `Reveal`

The one scroll-entrance in the codebase. Wraps anything.

```tsx
import { motion, useReducedMotion } from "motion/react"
import { reveal, revealReduced, viewportOnce } from "@/lib/motion"

type RevealProps = {
  as?: "div" | "li" | "section" | "article" | "span"
  delay?: number      // seconds; only for a fixed pair, use revealStagger for lists
  y?: number          // default 24, mirrors --reveal-y
  once?: boolean      // default true
  className?: string
  children: React.ReactNode
}
```

| | |
|---|---|
| From → To | `{ opacity: 0, y: 24 }` → `{ opacity: 1, y: 0 }` |
| Duration | `--dur-std` → `0.42` |
| Easing | `--ease-out-quint` → `[0.22, 1, 0.36, 1]` |
| Trigger | `whileInView` with `viewportOnce = { once: true, margin: "-12% 0px" }` |
| Reduced motion | `{ opacity: 1, y: 0 }` immediately, `duration: 0` — no fade, no travel. Content is never gated on the observer firing |

**Must not:** be nested inside another `Reveal` (the inner one's parent is already animating opacity; the result double-fades) · be used for a list — that is `revealStagger` on the parent with `variants` children, one observer instead of N · carry an inline `transition` object (C4 in the lib chapter forbids it).

---

#### 5. `SplitText`

Per-line entrance for display headings. Used in exactly three places: the hero H1, `#focus`, `#impact`.

```tsx
type SplitTextProps = {
  text: string
  by?: "line" | "word"          // default "line"
  stagger?: number              // default 0.08
  className?: string
  as?: "h1" | "h2" | "p" | "span"
}
```

- `by="line"` splits on `\n` — **authored** line breaks, never measured. Measuring wraps at runtime, reflows on resize, and fights `text-wrap: balance`.
- Each line is wrapped in `<span class="block overflow-hidden pb-[0.08em] -mb-[0.08em]">` so descenders (`y`, `g`, `,`) are not clipped by the mask. The negative margin cancels the padding so vertical rhythm is unchanged.
- Inner span animates `{ y: "110%", opacity: 0 }` → `{ y: "0%", opacity: 1 }`, `--dur-hero` (`1.0`), `--ease-out-quint`, staggered by `stagger`.

**A11y:** the accessible name must be the whole string, not one node per line. The root carries `aria-label={text}` and every line span is `aria-hidden="true"`. Screen readers get one clean heading.

**Reduced motion:** renders the plain text in the same tag with no spans, no mask, no wrappers — zero DOM difference in the accessible tree.

**Must not:** be used on body copy (a masked reveal on a paragraph reads as a glitch) · split by character · appear more than once per page at `display-xl`.

---

#### 6. `AnimatedNumber`

Counts a stat up when it scrolls in.

```tsx
type AnimatedNumberProps = {
  value: string | number
  duration?: number        // default 1.4
  className?: string
}
```

The mock stat values are **pre-formatted strings**: `"1,248+"`, `"12,540+"`, `"3.6"`, `"24"`, and `"Basketball"`. So:

1. `parseLeadingNumber(value)` from `src/lib/format.ts` returns `{ n, prefix, suffix }` or `null`.
2. `null` (i.e. `"Basketball"`) → render the string as static text. No animation, no layout difference.
3. Otherwise animate `0 → n`, re-emit with the original grouping and the original suffix, so `"1,248+"` counts to `1,248+` and never to `1248`.
4. `"3.6"` keeps one decimal — decimal places are taken from the source string, never guessed.

**Implementation — no per-frame React state.** `useMotionValue` + `animate()` + a subscription that writes `node.textContent`. A `useState` in the frame loop re-renders the whole stats grid 60×/sec.

```tsx
const mv = useMotionValue(0)
useEffect(() => {
  if (!parsed || !inView) return
  const controls = animate(mv, parsed.n, { duration, ease: [0.22, 1, 0.36, 1] })
  const stop = mv.on("change", (v) => { if (ref.current) ref.current.textContent = formatLike(v, parsed) })
  return () => { controls.stop(); stop() }
}, [inView])
```

**A11y:** the root is `<span aria-label={String(value)}>` with the animating node `aria-hidden`. A screen reader reads the final value once; it never hears a counter tick. Add `tabular-nums` so the box does not jitter.

**Reduced motion:** renders the final formatted value, no animation, no observer.

**Must not:** animate a non-numeric value · drive text through React state · animate more than once (`once: true`) · run offscreen.

---

#### 7. `MediaFrame`

**Every `<img>` in the app goes through this.** It is the single mechanism that makes 20 mismatched Unsplash photos read as one commissioned set.

```tsx
const frameVariants = cva("relative isolate overflow-hidden bg-abyss", {
  variants: {
    ratio: {
      "16/9": "aspect-[16/9]",
      "4/3": "aspect-[4/3]",
      "3/4": "aspect-[3/4]",
      "1/1": "aspect-square",
      "21/9": "aspect-[21/9]",
    },
    radius: { md: "rounded-md", lg: "rounded-lg", xl: "rounded-xl", none: "rounded-none" },
  },
  defaultVariants: { ratio: "4/3", radius: "lg" },
})

type MediaFrameProps = {
  src: string
  alt: string                                    // required, no default
  ratio?: "16/9" | "4/3" | "3/4" | "1/1" | "21/9"
  radius?: "md" | "lg" | "xl" | "none"
  scrim?: "none" | "bottom" | "duotone"
  priority?: boolean
  width?: number                                 // Unsplash w= param, default 1200
  className?: string
}
```

| Scrim | Implementation | Used for |
|---|---|---|
| `none` | — | Lightbox only (`object-contain`, nothing over the image) |
| `bottom` | `::after` `bg-gradient-to-t from-teal-900 via-teal-900/55 to-transparent`, `h-1/2`, `z-1` | Every card and hero image with text over it. **This is the premium mechanism**: a consistent teal foot under every photo unifies wildly different sources |
| `duotone` | Image gets `grayscale`, plus an overlay `bg-teal-700 mix-blend-color opacity-25` and a second `bg-volt mix-blend-overlay opacity-[0.06]` | Portraits only (`PersonCard`). 25%, everywhere, no exceptions — this is why four stock headshots read as one shoot |

- `<img>` always: `absolute inset-0 h-full w-full object-cover` (the frame owns the ratio, so CLS is structurally zero).
- `loading={priority ? "eager" : "lazy"}` · `decoding="async"` · `fetchPriority={priority ? "high" : "auto"}`.
- **Exactly one `priority` image loads per document**, and only above the fold. The hero has no photograph, so on `/` that is zero.
- Unsplash URLs get `?auto=format&fit=crop&w={width}&q=72` appended by the component, so no caller can forget. Thumbnails pass `width={640}`.

**A11y:** `alt` is required and non-optional in the type. `alt=""` is legal **only** when the image is decorative and adjacent text already names it — and then `role="presentation"` is added too. All four `HomePage` images currently have `alt=""` while carrying meaning; the SEO/a11y chapter gives the replacement strings.

**Must not:** be rendered without a ratio · use `object-contain` outside the lightbox (it letterboxes into the scrim and looks broken) · nest another `MediaFrame` · apply `duotone` to anything but a portrait · animate the scrim.

---

#### 8. `Pill`

Every small status/filter/label chip.

```tsx
const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border text-eyebrow uppercase whitespace-nowrap transition-colors duration-(--dur-fast) ease-out-quint",
  {
    variants: {
      variant: {
        default: "border-line bg-deep text-fg-muted",
        active:  "border-volt bg-volt text-ink",
        live:    "border-line-volt bg-volt/10 text-volt",
        level:   "border-line-strong bg-raised text-cream-dim",
      },
      size: { sm: "h-6 px-2.5", md: "h-8 px-3.5" },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
)
```

| Variant | Where |
|---|---|
| `default` | Unselected filter, category tag, venue tag |
| `active` | The selected filter. Volt-on-ink, contrast 14.8:1 |
| `live` | "Happening today" / open-now. Pairs with a 6px `bg-live rounded-full` dot |
| `level` | Achievement level (`National`, `State`, `Inter-NIT`, `Campus`) — **read from the data, never mapped to a color scale.** There are four values in the mock and inventing a rank palette would fabricate a hierarchy the data does not state |

**Interactive pills** (filters) render as `<button type="button" aria-pressed={selected}>`. `aria-pressed` is what conveys state; color alone never does. Non-interactive pills render as `<span>` and are never focusable.

**Touch targets:** `size="md"` is 32px tall — below the 44px minimum. Filter rows therefore use `md` with `py-1.5` on the row so the *hit area* clears 44px while the pill stays visually compact, or `size="md"` inside a `min-h-11 inline-flex items-center` wrapper. `size="sm"` is never interactive.

**Must not:** carry an icon-only label · wrap to two lines · use `variant="live"` for anything not genuinely current relative to today's date.

---

#### 9. `Marquee`

One horizontal loop, used once (the activities ticker). CSS animation, not JS.

```tsx
type MarqueeProps = {
  children: React.ReactNode
  speed?: number          // seconds per full cycle, default 40
  pauseOnHover?: boolean  // default true
  className?: string
}
```

- The children are rendered **twice**, the duplicate `aria-hidden="true"`. The track translates `0 → -50%`, so the seam is invisible and the accessible tree contains the content once.
- `animation: marquee var(--marquee-speed) linear infinite` with `--marquee-speed` inline. `pauseOnHover` adds `hover:[animation-play-state:paused]` and `focus-within:[animation-play-state:paused]` — keyboard users get the same escape hatch.
- **IntersectionObserver pause**: offscreen, `animation-play-state: paused`. An infinite loop outside the viewport is pure battery cost.
- Edges masked with `[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]` so items fade rather than clip.

**Reduced motion:** no animation. The track becomes a horizontally scrollable `overflow-x-auto no-scrollbar` row with a real scrollbar affordance — the content stays reachable, it just stops moving on its own.

**A11y:** the region is `<div role="marquee">`-free — it is a plain `<ul>`. Motion is decorative; the list is static content. Never put the only copy of a link inside the duplicated (`aria-hidden`) half.

**Must not:** contain the only path to any destination · exceed one instance per page · animate anything other than `transform`.

---

#### 10. What lives in reference II

`ActivityCard`, `EventCard`, `PersonCard`, `AchievementRow`, `StatBlock`, `GalleryTile`, `EmptyState`, `LoadingState`, `ErrorState`, `AnchorNav`, `GalleryLightbox`.

---

### Component API reference II — content, state and navigation components

Eleven components, plus the wiring that connects the last two. All six cards compose `cardRoot` (contract **C2** in reference I) — none of them re-types a hover treatment. Props are typed against the real interfaces in `src/types/*`, reproduced here so no field is invented:

```ts
Activity     { id, name, slug, description?, category, coverImageUrl, timings: ActivityTiming[] }
ActivityTiming { dayOfWeek, openTime, closeTime, label? }
Event        { id, title, slug, description?, startDate, endDate?, venue?, isFeatured, coverImageUrl }
Person       { id, name, personRole: "INCHARGE"|"COMMITTEE", designation, department?, email?, phone?, photoUrl }
Achievement  { id, studentName, activityName, title, level, achievedAt, imageUrl? }
GalleryImage { id, imageUrl, caption }
```

Fields that **do not exist** and must never be rendered: activity `venue`, activity `capacity`, event `time`, event `registrationUrl`, person `bio`, person social handles, achievement `rank`, achievement `points`, gallery `date`, gallery `photographer`.

---

#### 1. `ActivityCard`

```tsx
type ActivityCardProps = {
  activity: Activity
  variant?: "feature" | "compact"
  className?: string
}
```

Root is `<Link to={`/activities/${activity.slug}`} className={cn(cardRoot, …)}>` — per **C3**, the card *is* the link.

| Slot | `feature` | `compact` |
|---|---|---|
| Media | `<MediaFrame ratio="4/3" radius="none" scrim="bottom" />`, `motion-safe:group-hover:scale-[1.03]` on the img | `ratio="16/9"`, same scrim |
| Category | `<Pill variant="default" size="sm">` absolutely positioned `top-4 left-4 z-2` | inline above the name |
| Name | `font-display text-title text-fg` | `text-lead font-semibold text-fg` |
| Description | `text-meta text-fg-muted line-clamp-2` | omitted |
| Timing row | `text-meta text-fg-faint tabular-nums` — `formatRange(activity.timings[0])` → `"06:00 – 22:00"` | same |
| Open-now | `<Pill variant="live" size="sm">Open now</Pill>` when `getOpenNow` returns true | omitted |
| Affordance | `ArrowUpRight` 16px, `text-volt`, `motion-safe:group-hover:translate-x-0.5` | same |
| Body padding | `p-6 gap-2` | `p-4 gap-1.5` |

**Data honesty.** Every activity in the mock has exactly **one** timing, at `dayOfWeek: 1` (Monday). The card renders `timings[0]` and labels it **`Mon`** — never "Daily", never "Mon–Sun". If `timings.length > 1` the card renders the first and a `+{n-1} more` link to the detail route; that path is currently unreachable and must still be written, because the type allows it.

**Must not:** render a venue (no such field) · claim hours it cannot know · use `variant="feature"` more than 5× on a page (there are only 5 activities) · nest a second link.

---

#### 2. `EventCard`

```tsx
type EventCardProps = {
  event: Event
  variant?: "hero" | "row"
  status?: "today" | "upcoming" | "past"   // supplied by the selector, never derived in the card
  className?: string
}
```

`status` is a **prop, not a computation.** `src/lib/content.ts` owns the comparison against today so that one function decides tense for the whole app. A card that computed it locally is how `EventsPage.tsx:84` ended up listing past events under "Upcoming".

| Slot | `hero` | `row` |
|---|---|---|
| Layout | `grid lg:grid-cols-[1.1fr_1fr]`, media left | `grid grid-cols-[auto_1fr_auto] items-center gap-5` |
| Media | `<MediaFrame ratio="4/3" scrim="bottom" radius="none" />` | `<MediaFrame ratio="1/1" radius="md" className="w-20" />` |
| Date | `text-eyebrow uppercase text-volt` + `formatDate(startDate)` → `"5 Aug 2026"` | a stacked block: day `font-display text-title tabular-nums`, month `text-eyebrow uppercase` |
| Status pill | `today` → `<Pill variant="live">Happening today</Pill>` · `upcoming` → `<Pill variant="default">Upcoming</Pill>` · `past` → `<Pill variant="default">Concluded</Pill>` | same, `size="sm"` |
| Title | `font-display text-display-m text-fg` | `text-lead font-semibold text-fg` |
| Description | `text-lead text-fg-muted max-w-[52ch]` | `line-clamp-1 text-meta` |
| Venue | `MapPin` 14px + `event.venue` in `text-meta text-fg-muted`, rendered **only if `venue` is present** | same |
| CTA | `View event details` → `/events/{slug}` | the whole row is the link |

**Never render `startDate` raw.** `EventDetailPage.tsx:61` currently prints `2026-06-12`. Always `formatDate()`.

**Must not:** derive its own tense · say "Register" (no registration field or flow exists) · show an end date when `endDate` is absent · use `variant="hero"` twice on a page.

---

#### 3. `PersonCard`

```tsx
type PersonCardProps = { person: Person; className?: string }
```

| Slot | Value |
|---|---|
| Root | `cardRoot` + `p-0`. **Not a link** — there are no person detail routes. A `<div>`; `cardRoot`'s `group` hover still runs |
| Portrait | `<MediaFrame src={person.photoUrl} ratio="3/4" radius="none" scrim="duotone" alt={`${person.name}, ${person.designation}`} width={640} />` |
| Name | `font-display text-title text-fg` |
| Designation | `text-meta uppercase tracking-[0.12em] text-volt` |
| Department | `text-meta text-fg-muted`, only when present |
| Email | `<a href={`mailto:${email}`}>` `text-meta text-fg-muted hover:text-volt`, `break-all`, only when present |
| Phone | `<a href={`tel:${phone.replace(/\s/g,"")}`}>` `tabular-nums`, only when present |
| Body | `flex flex-col gap-1.5 p-5` |

**`scrim="duotone"` is mandatory here and is the whole point.** Four stock headshots at four different white balances become one set at 25% teal. Never `scrim="bottom"` on a portrait — a gradient across a face reads as a mistake.

**A11y:** contact links carry a visible label, not an icon alone. The `mailto:`/`tel:` pair is the only interactive content, so the card is not a link and has no `tabindex`.

**Must not:** invent a bio, a social handle or a photo credit · link to a nonexistent `/people/:id` · render an empty contact row when both `email` and `phone` are absent (collapse the row entirely).

---

#### 4. `AchievementRow`

```tsx
type AchievementRowProps = { achievement: Achievement; className?: string }
```

A row, not a card — five records read better as a ledger than a grid.

| Column | Desktop `grid-cols-[auto_1fr_auto_auto]` | Mobile |
|---|---|---|
| Level | `<Pill variant="level" size="sm">{level}</Pill>` | first line, with the year |
| Title + student | `title` in `text-lead font-semibold text-fg`; `studentName` · `activityName` in `text-meta text-fg-muted` | stacked |
| Activity | `<Pill variant="default" size="sm">` | folded into the meta line |
| Date | `formatDate(achievedAt)` → `"12 Oct 2025"`, `text-meta tabular-nums text-fg-faint` | first line |

Root: `<li>` inside an `<ol>` — it is an ordered record set. Hover is `cardRoot`'s **minus the lift** (`hover:bg-raised hover:border-line-strong` only); a row that lifts out of a list looks broken. Divider is `border-b border-line last:border-0`, never a `<hr>`.

`achievement.imageUrl` is optional and **absent from all five mock records** — the row must render correctly with no image, and if one appears, as a `<MediaFrame ratio="1/1" radius="md" className="w-14">` in a leading column.

**Must not:** color-code `level` (four flat values, no stated hierarchy) · sort itself (the page owns sort) · render `achievedAt` raw — `AchievementCard.tsx:31` does this today.

---

#### 5. `StatBlock`

```tsx
type StatBlockProps = {
  label: string
  value: string | number      // pre-formatted strings from mockStats: "1,248+", "3.6", "Basketball"
  delta?: string              // "+12.5%", "Most Participated", "+0.4 from last month"
  index?: number              // for stagger
  className?: string
}
```

| Slot | Classes |
|---|---|
| Root | `border-l border-line pl-5 flex flex-col gap-1` — a rule, not a box. Four boxes-in-a-row is the dashboard look being removed |
| Value | `font-display text-display-m tabular-nums text-fg` wrapping `<AnimatedNumber value={value} />` |
| Label | `text-eyebrow uppercase text-fg-muted` |
| Delta | `text-meta` + the sign rule below |

**The delta sign rule.** `StatsPage.tsx` currently hardcodes a green up-arrow regardless of sign. Correct logic:

| `delta` | Icon | Color |
|---|---|---|
| starts `+` | `ArrowUpRight` | `text-win` |
| starts `-` | `ArrowDownRight` | `text-volt` |
| anything else (`"Most Participated"`) | **no icon** | `text-fg-muted` |

`--color-win` (`#34d399`) is the only non-palette hue in the system and exists solely so "up" is not volt. It appears **only** in a positive delta and nowhere else in the app.

**Must not:** animate a non-numeric value (`"Basketball"` renders static — `AnimatedNumber` already returns `null` from the parser) · assume a delta is numeric · sit inside a `Card` primitive.

---

#### 6. `GalleryTile`

```tsx
type GalleryTileProps = {
  image: GalleryImage
  ratio?: "4/3" | "3/4" | "1/1" | "16/9"
  index: number
  onOpen: (index: number) => void
  className?: string
}
```

Root is `<button type="button" aria-haspopup="dialog" onClick={() => onOpen(index)}>` — it opens a dialog, so it is a button, not a link. `cardRoot` minus the lift (tiles sit in a tight mosaic; lifting one shears the grid), plus `motion-safe:group-hover:scale-[1.03]` on the image.

| Slot | |
|---|---|
| Media | `<MediaFrame src={image.imageUrl} alt="" ratio={ratio} radius="none" scrim="bottom" width={640} />` |
| Caption | `absolute bottom-0 left-0 right-0 p-4 text-meta text-cream translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100` |
| Zoom hint | `Maximize2` 16px, `top-4 right-4`, `text-cream opacity-0 group-hover:opacity-100` |

The `focus-visible:` utilities here are the **legal exception in C1** — they reveal the caption for keyboard users, they do not draw a ring. Under `motion-reduce` the caption is always visible rather than hover-gated.

**A11y:** the accessible name is `Open image: {caption}`, composed as a real `<span className="sr-only">Open image: </span>` followed by the visible caption text — **not** an `aria-label`. The `<img>` therefore takes `alt=""`, or the caption is announced twice. "Open image" alone is useless in a list of twelve.

```tsx
<button type="button" aria-haspopup="dialog" onClick={() => onOpen(index)} className={cardRootFlat}>
  <MediaFrame src={image.imageUrl} alt="" ratio={ratio} radius="none" scrim="bottom" width={640} />
  <span className="sr-only">Open image: </span>
  <span className="… caption classes …">{image.caption}</span>
</button>
```

**Must not:** be a `<div onClick>` · be a `<Link>` (it opens a dialog, it does not navigate) · duplicate the caption into `alt` · omit `index` (the lightbox needs it) · use `ratio` inconsistently within one mosaic row.

---

#### 7. `EmptyState`

```tsx
type EmptyStateProps = {
  icon: LucideIcon
  title: string
  body: string
  action?: { label: string; to?: string; onClick?: () => void }
  className?: string
}
```

`flex flex-col items-center gap-3 rounded-lg border border-dashed border-line bg-abyss px-6 py-14 text-center` · icon `size-8 text-fg-faint` · title `text-lead font-semibold text-fg` · body `text-meta text-fg-muted max-w-[42ch]` · action as a ghost button.

**Copy rule: every empty state names the filters that produced it and offers the way out.** Not "No results found."

| Where | Title | Body | Action |
|---|---|---|---|
| Activities, no match | `No activities in Fitness` | `Try another category — there are 5 activities across Sports and Fitness.` | `Clear filter` |
| Achievements, no match | `No achievements match those filters` | `Nothing recorded for this combination of activity, level and year. Widen one of them.` | `Reset all filters` |
| Events, none upcoming | `No upcoming events` | `Nothing is scheduled right now. Three events have been held this year — browse the archive.` | `View past events` |
| Gallery, none | `No photos for this activity yet` | `Photos are added after each session and tournament.` | `Back to gallery` |

`AchievementsPage` today renders a blank page for a no-result filter combination. This is the fix.

**Must not:** appear at the same time as content · use volt (an empty state is not an accent moment) · say "Coming soon".

---

#### 8. `LoadingState`

```tsx
type LoadingStateProps = { variant?: "page" | "grid" | "card"; count?: number }
```

`page` → a `PageIntro`-shaped skeleton. `grid` → `count` (default 6) card skeletons in the caller's grid. `card` → one.

Skeleton block: `rounded-md bg-raised animate-pulse` with the ratio box matching the real card's `MediaFrame` ratio **exactly**, so the swap to real content produces zero CLS. Text lines are `h-3 rounded-xs bg-raised` at 90%/60% width.

**A11y:** container is `role="status" aria-busy="true"` with an `<span class="sr-only">Loading…</span>`. Individual skeleton blocks are `aria-hidden`.

**Reduced motion:** `animate-pulse` is a CSS animation, so the global damper reduces it to 1ms — effectively a static block. That is correct and needs no extra branch.

**Must not:** be used for mock data that resolves synchronously. Today all data is a static import — **there is no loading state on any current route.** This component exists for the API swap named in the manifest chapter, and until then appears only in the lightbox's large-image load. Do not fake a delay to show it off.

---

#### 9. `ErrorState`

```tsx
type ErrorStateProps = { title: string; body: string; retry?: () => void }
```

Same shell as `EmptyState` with a solid `border-line-strong` instead of dashed and an `AlertCircle` icon in `text-volt` (there is no red in this palette; **D8**). `retry` renders a `Try again` button; omitted when there is nothing to retry.

Used by: a bad `:slug` (activity/event/gallery not found — though a 404-style `NotFound` is preferred for a genuinely nonexistent record), and a failed image load in the lightbox.

**Must not:** print an exception message or a stack · use red · be used where `EmptyState` is correct (nothing found ≠ something broke).

---

#### 10. `AnchorNav`

The homepage-only progress rail. Twelve sections is too many for the navbar, so the rail carries them.

```tsx
type AnchorNavProps = {
  sections: { id: string; label: string }[]
}
```

- `hidden lg:flex fixed left-(--gutter) top-1/2 -translate-y-1/2 z-40 flex-col gap-3`.
- Each item: `<a href={`#${id}`}>` with a 2px×20px bar, `bg-line-strong` → `bg-volt` and `h-8` when current. Label appears on hover/focus as a `text-eyebrow uppercase` flyout.
- Current section from **one** `IntersectionObserver` over all twelve targets with `rootMargin: "-45% 0px -55% 0px"`, so exactly one is active at a time. Not twelve observers, not a scroll listener.

**A11y:** `<nav aria-label="Page sections">` › `<ol>`; the active anchor gets `aria-current="true"`. Every bar has a `sr-only` label so it is never an unlabelled link. Hidden below `lg` — the mobile path is the sheet menu, which lists the same anchors.

**Reduced motion:** `html { scroll-behavior: smooth }` is already switched to `auto` by the global damper, so anchor jumps are instant with no component branch.

**Must not:** appear on any route other than `/` · use `scrollIntoView` (a real `href` works, is linkable and survives JS failure) · exceed `z-40`.

---

#### 11. `GalleryLightbox` — **specified elsewhere**

`src/components/gallery/GalleryLightbox.tsx` is owned by **Routes → §5 `GalleryLightbox` — full spec**. That chapter carries the five-defect ledger against the current `src/pages/Gallery/GalleryImageDialog.tsx`, the complete component source, the call site, and the behaviour contract. It is not restated here — one component, one authoritative listing.

The contract that matters to *this* chapter, because `GalleryTile` is its only trigger:

| Concern | Value (per the route chapter) |
|---|---|
| Props | `{ images, index, open, onOpenChange, onIndexChange, collectionTitle }` — `index` is always a valid number, never `null` |
| Mount | Always mounted. `open` is state. Never conditionally rendered, or focus return and the close animation both die |
| Accessible name | `DialogTitle` = `collectionTitle`; `DialogDescription` = the caption; the `n / count` counter is `aria-hidden` |
| Keys | `←` / `→` with wrap-around. **No `Home`/`End`** — three images per set, the two arrows reach every frame |
| Nav controls | Labelled `Previous` / `Next` pill buttons at `min-h-12`, rendered only when `count > 1`. The close control is `dialog.tsx`'s built-in X resized to `min-h-12 min-w-12` — **not** `Button size="icon-sm"`, which is 32px and fails 2.5.8 |
| Frame swap | Opacity-only at `--dur-fast`. Open is opacity + `scale(0.97→1)` at `--dur-std` |
| Image URL | Route chapter's snippet passes `image.imageUrl` raw; Performance §7 requires every Unsplash URL to go through the width helper. Use `withUnsplashParams(image.imageUrl, 1600)`. See **R4** |

---

#### 12. Lightbox parent wiring

The page owns the state; the tile reports an index; the lightbox is always mounted:

```tsx
const [index, setIndex] = React.useState(0)
const [open, setOpen] = React.useState(false)
const openAt = (i: number) => { setIndex(i); setOpen(true) }

<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {images.map((img, i) => (
    <li key={img.id}><GalleryTile image={img} index={i} onOpen={openAt} ratio="4/3" /></li>
  ))}
</ul>
<GalleryLightbox images={images} index={index} open={open}
  onIndexChange={setIndex} onOpenChange={setOpen} collectionTitle={title} />
```

`SelectedImage` — currently redeclared in both `ActivityGalleryPage.tsx` and `EventGalleryPage.tsx` — is deleted. There is no such type in the new design; the state is one number.

---

### Shared library files — `motion.ts`, `format.ts`, `content.ts`

Three files. Every component imports from these; none of them re-implements a variant, a date format or a data query. `src/lib/utils.ts` (`cn`) already exists and is unchanged.

**Ground truth these files are written against** — verified by reading `src/mock/*` and `src/types/*`:

| Fact | Consequence |
|---|---|
| The mock calendar ends at **`2026-08-05`**, a Wednesday | From `2026-08-06` onward **every event is past.** No function here may assume an upcoming event exists, and no copy may promise one. See conflict **R1** |
| Events: `2026-06-12` (featured), `2026-07-01` (featured), `2026-08-05` (**not** featured) | Both `isFeatured` events are **in the past**. On the last live day the only current event was the one flagged `false` — so `isFeatured` can never override date order |
| 5 activities. Categories present: **`Sports`** (basketball, football, badminton) and **`Fitness`** (swimming, gym) | `categoryData` lists a third slice, `Recreation` (15%), that **matches zero activities**. The filter row must be derived from activities, so no dead pill can exist |
| Every activity has exactly **one** timing, `dayOfWeek: 1` (Monday) | Today is Wednesday → **no activity has hours for today.** `getOpenNow` must return `"unknown"`, not `false`, and the UI must not print a status it cannot support |
| `participationData` contains `Yoga` and `TT` | Neither is an activity. Chart labels only; never linkable, never counted as an activity |
| `trendData` has 11 entries, `Jan`–`Nov` | **December is missing.** The chart axis must not imply a 12th point |
| `overviewCards` values are pre-formatted strings, one non-numeric (`"Basketball"`) | The counter needs a parser that can return `null` |
| Gallery: 5 activity sets × 3 images; event gallery: 3 sets × 3 images | Every set is exactly 3 — lightbox wrap-around is two keypresses away |
| 2 `INCHARGE`, 2 `COMMITTEE` | Both role pages render a 2-item grid; the layout must not assume ≥3 |
| 5 achievements · levels `National`×2, `State`, `Inter-NIT`, `Campus` · years 2026, 2025×2, 2024×2 | Filter option lists are derived, so no empty option is offered |

---

#### 1. `src/lib/motion.ts`

**Contract C4: no component may write an inline `transition` object.** Every duration and easing in the app comes from this file, which mirrors the `@theme` tokens exactly. A `transition={{ duration: 0.4 }}` anywhere in `src/` is a bug — the perf chapter's grep gates enforce it.

```ts
// src/lib/motion.ts
import type { Variants } from "motion/react"

/* Mirrors of the @theme tokens. Never invent a value here — if a duration is
   needed that is not in this list, add it to @theme first.                  */
export const DUR = { fast: 0.18, std: 0.42, slow: 0.72, hero: 1.0 } as const
export const EASE = {
  outQuint: [0.22, 1, 0.36, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
} as const
export const REVEAL_Y = 24   // --reveal-y
export const LIFT = 4        // --lift

/* One viewport config for the whole app. -12% means an element commits when
   it is meaningfully on screen, not when one pixel crosses the edge.        */
export const viewportOnce = { once: true, margin: "-12% 0px" } as const

/* ── reveal ───────────────────────────────────────────────────────────── */
export const reveal: Variants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  show: { opacity: 1, y: 0, transition: { duration: DUR.std, ease: EASE.outQuint } },
}
export const revealReduced: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
}

/* ── revealStagger — ONE observer on the parent, N children ─────────────
   A list must never put a Reveal on each item; that is N observers.        */
export const revealStagger = (stagger = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: 0.04 } },
})
export const revealStaggerReduced = (): Variants => ({ hidden: {}, show: {} })

/* ── heroLine — masked per-line entrance (SplitText) ───────────────────── */
export const heroLine: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: DUR.hero, ease: EASE.outQuint } },
}
export const heroLineReduced: Variants = {
  hidden: { y: "0%", opacity: 1 },
  show: { y: "0%", opacity: 1, transition: { duration: 0 } },
}

/* ── cardHover — the CSS class, not a Motion variant ───────────────────
   Cards hover in CSS so no card mounts a Motion component. This string is
   contract C2; it is the single definition in the codebase.               */
export const cardRoot =
  "group relative isolate flex flex-col overflow-hidden rounded-lg " +
  "border border-line bg-deep " +
  "transition-[transform,border-color,background-color,box-shadow] " +
  "duration-(--dur-fast) ease-out-quint " +
  "hover:border-line-strong hover:bg-raised hover:shadow-lift " +
  "motion-safe:hover:-translate-y-(--lift)"

/* Rows and tiles: same treatment, no lift. */
export const cardRootFlat = cardRoot.replace(
  " motion-safe:hover:-translate-y-(--lift)",
  "",
)

/* ── the picker ───────────────────────────────────────────────────────────
   Usage:
     const v = useVariants(reveal, revealReduced)
     <motion.div variants={v} initial="hidden" whileInView="show" viewport={viewportOnce} />
*/
import { useReducedMotion } from "motion/react"
export function useVariants<T>(normal: T, reduced: T): T {
  return useReducedMotion() ? reduced : normal
}
```

| Export | Reduced-motion twin | Notes |
|---|---|---|
| `reveal` | `revealReduced` | opacity 1, y 0, duration 0 — content is present, it just does not travel |
| `revealStagger(s)` | `revealStaggerReduced()` | stagger removed entirely; a 12-item 0.08s stagger is ~1s of sequential motion |
| `heroLine` | `heroLineReduced` | `SplitText` additionally drops the mask spans, so the DOM is plain text |
| `cardRoot` / `cardRootFlat` | n/a — CSS | `motion-safe:` on the transform is the twin |

**`useReducedMotion()` is reactive.** It subscribes to the media query, so toggling the OS setting mid-session updates without a reload. A one-shot `window.matchMedia(...).matches` read does not — the two GSAP scenes handle this with `gsap.matchMedia()`, which is reactive for the same reason.

---

#### 2. `src/lib/format.ts`

```ts
// src/lib/format.ts

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] as const
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] as const

/** "2026-08-05" -> "5 Aug 2026". Never render an ISO string in JSX. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${MONTHS[m - 1]} ${y}`
}

/** "2026-08-05" -> "Aug 2026" — for grouped archive headings. */
export function formatMonthYear(iso: string): string {
  const [y, m] = iso.split("-").map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

/** "06:00" -> "6:00 am". Mock timings are 24h "HH:MM" strings, never Dates. */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number)
  const period = h < 12 ? "am" : "pm"
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, "0")} ${period}`
}

/** A timing -> "Mon · 6:00 am – 10:00 pm". Always names the day: every mock
    timing is dayOfWeek 1, and printing hours without the day implies daily. */
export function formatRange(t: { dayOfWeek: number; openTime: string; closeTime: string; label?: string }): string {
  return t.label ?? `${DAYS[t.dayOfWeek]} · ${formatTime(t.openTime)} – ${formatTime(t.closeTime)}`
}

export function dayLabel(dayOfWeek: number): string {
  return DAYS[dayOfWeek] ?? "—"
}

/** Minutes since midnight, for open/closed comparison. */
export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

export type ParsedNumber = {
  n: number
  prefix: string
  suffix: string
  decimals: number
  grouped: boolean
}

/** The mock stat values are pre-formatted strings: "1,248+", "12,540+",
    "3.6", "24", "Basketball". Returns null when there is no leading number,
    which is how AnimatedNumber knows to render plain text instead. */
export function parseLeadingNumber(value: string | number): ParsedNumber | null {
  if (typeof value === "number") {
    return { n: value, prefix: "", suffix: "", decimals: value % 1 ? 1 : 0, grouped: false }
  }
  const m = /^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/.exec(value.trim())
  if (!m) return null
  const [, prefix, digits, suffix] = m
  const n = Number(digits.replace(/,/g, ""))
  if (!Number.isFinite(n)) return null
  const dot = digits.indexOf(".")
  return {
    n,
    prefix,
    suffix,
    decimals: dot === -1 ? 0 : digits.length - dot - 1,
    grouped: digits.includes(","),
  }
}

/** Re-emit an in-flight counter value in the source string's own shape, so
    "1,248+" counts to "1,248+" and never to "1248". */
export function formatLike(v: number, p: ParsedNumber): string {
  const fixed = v.toFixed(p.decimals)
  const body = p.grouped
    ? Number(fixed).toLocaleString("en-IN", {
        minimumFractionDigits: p.decimals,
        maximumFractionDigits: p.decimals,
      })
    : fixed
  return `${p.prefix}${body}${p.suffix}`
}

/** Every bare images.unsplash.com URL in the mocks fetches a full-res
    original. MediaFrame routes all of them through here. */
export function withUnsplashParams(url: string, w = 1200): string {
  if (!url.includes("images.unsplash.com")) return url
  if (url.includes("?")) return url
  return `${url}?auto=format&fit=crop&w=${w}&q=72`
}
```

**Self-check** — the one runnable check this file leaves behind (`npx tsx src/lib/format.check.ts`):

```ts
// src/lib/format.check.ts
import { formatDate, formatTime, formatRange, parseLeadingNumber, formatLike, toMinutes } from "./format"

const eq = (a: unknown, b: unknown, m: string) => {
  if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`${m}: got ${JSON.stringify(a)}`)
}

eq(formatDate("2026-08-05"), "5 Aug 2026", "formatDate today")
eq(formatDate("2026-06-12"), "12 Jun 2026", "formatDate past event")
eq(formatTime("06:00"), "6:00 am", "formatTime am")
eq(formatTime("22:00"), "10:00 pm", "formatTime pm")
eq(formatTime("00:30"), "12:30 am", "formatTime midnight")
eq(formatTime("12:00"), "12:00 pm", "formatTime noon")
eq(formatRange({ dayOfWeek: 1, openTime: "05:00", closeTime: "23:00" }), "Mon · 5:00 am – 11:00 pm", "formatRange")
eq(toMinutes("06:30"), 390, "toMinutes")

eq(parseLeadingNumber("1,248+")!.n, 1248, "parse grouped")
eq(parseLeadingNumber("1,248+")!.suffix, "+", "parse suffix")
eq(parseLeadingNumber("12,540+")!.n, 12540, "parse grouped large")
eq(parseLeadingNumber("3.6")!.n, 3.6, "parse decimal")
eq(parseLeadingNumber("3.6")!.decimals, 1, "parse decimals count")
eq(parseLeadingNumber("24")!.n, 24, "parse plain")
eq(parseLeadingNumber("Basketball"), null, "parse non-numeric -> null")

eq(formatLike(1248, parseLeadingNumber("1,248+")!), "1,248+", "formatLike round-trip")
eq(formatLike(3.6, parseLeadingNumber("3.6")!), "3.6", "formatLike decimal")
eq(formatLike(24, parseLeadingNumber("24")!), "24", "formatLike plain")

console.log("format.ts ok")
```

The `"Basketball" -> null` case is the one that matters: without it `AnimatedNumber` animates `NaN` and the Top Activity card renders blank.

---

#### 3. `src/lib/content.ts`

Every data read in the app goes through here. No page imports from `src/mock/*` directly — that is what let `EventsPage` and the homepage disagree about which event is featured.

```ts
// src/lib/content.ts
import { mockActivities } from "@/mock/mockActivities"
import { mockEvents } from "@/mock/mockEvents"
import { mockPeople } from "@/mock/mockPeople"
import { mockAchievements } from "@/mock/mockAchievements"
import { mockGallery, type GalleryImage } from "@/mock/mockGallery"
import { mockEventGallery } from "@/mock/mockEventGallery"
import { overviewCards, participationData, categoryData, trendData, topActivities } from "@/mock/mockStats"
import { toMinutes } from "./format"
import type { Activity } from "@/types/activity.types"
import type { Event } from "@/types/event.types"
import type { Person, PersonRole } from "@/types/person.types"
import type { Achievement } from "@/types/achievement.types"

/** All tense in the app derives from this. Injectable so tests can pin a date. */
export const today = (now: Date = new Date()) =>
  new Date(now.getFullYear(), now.getMonth(), now.getDate())

const dayStart = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export type EventStatus = "today" | "upcoming" | "past"

/** Compares calendar days, not timestamps — an event dated today is "today"
    for all 24 hours, not "past" from 00:00. */
export function eventStatus(e: Event, now = today()): EventStatus {
  const d = dayStart(e.startDate).getTime()
  const t = now.getTime()
  return d === t ? "today" : d > t ? "upcoming" : "past"
}
```

##### The featured-event selector — the one that must not lie

```ts
export type FeaturedEvent = { event: Event; status: EventStatus; label: string }

/** Order: happening today > next upcoming > most recent past.
    `isFeatured` is a TIE-BREAK ONLY, never an override. Both flagged events
    (2026-06-12, 2026-07-01) are already past; honouring the flag would put a
    concluded event under a "what's on" heading. */
export function getFeaturedEvent(now = today()): FeaturedEvent | null {
  if (mockEvents.length === 0) return null
  const byDate = [...mockEvents].sort((a, b) => a.startDate.localeCompare(b.startDate))

  const todayEvents = byDate.filter((e) => eventStatus(e, now) === "today")
  if (todayEvents.length)
    return { event: pickFeatured(todayEvents), status: "today", label: "Happening today" }

  const upcoming = byDate.filter((e) => eventStatus(e, now) === "upcoming")
  if (upcoming.length) return { event: upcoming[0], status: "upcoming", label: "Next up" }

  const past = byDate.filter((e) => eventStatus(e, now) === "past")
  return { event: past[past.length - 1], status: "past", label: "Most recent" }
}

const pickFeatured = (list: Event[]) => list.find((e) => e.isFeatured) ?? list[0]

/** One sort, three lists. Replaces EventsPage.tsx:84's unfiltered, unsorted,
    self-duplicating map. The two readers below exist so no caller re-sorts. */
export function getEventsByPhase(now = today()) {
  const sorted = [...mockEvents].sort((a, b) => a.startDate.localeCompare(b.startDate))
  return {
    today: sorted.filter((e) => eventStatus(e, now) === "today"),
    upcoming: sorted.filter((e) => eventStatus(e, now) === "upcoming"),
    past: sorted.filter((e) => eventStatus(e, now) === "past").reverse(),   // newest first
  }
}

export const getUpcomingEvents = (limit?: number, now = today()) => {
  const { today: t, upcoming } = getEventsByPhase(now)
  const list = [...t, ...upcoming]
  return limit ? list.slice(0, limit) : list
}

export const getPastEvents = (now = today()) => getEventsByPhase(now).past

export const getEventBySlug = (slug: string): Event | undefined =>
  mockEvents.find((e) => e.slug === slug)
```

**Worked example — the last day the mock calendar was live, `2026-08-05`:**

| Call | Result |
|---|---|
| `getFeaturedEvent()` | `{ event: Swimming Championship, status: "today", label: "Happening today" }` — despite `isFeatured: false` |
| `getUpcomingEvents()` | `[Swimming Championship]` — length **1** |
| `getPastEvents()` | `[SAC Fitness Challenge (1 Jul), Inter-BITS Football Tournament (12 Jun)]` |

**What it returns on and after `2026-08-06` — the actual state of the repo:**

| Call | Result |
|---|---|
| `getFeaturedEvent()` | `{ event: Swimming Championship, status: "past", label: "Most recent" }` |
| `getUpcomingEvents()` | `[]` — **empty** |
| `getPastEvents()` | all three, newest first |

This third branch is not a corner case to defend against later; **it is the default render of the site as shipped.** Every consumer is specified against it:

| Consumer | Behaviour when `getUpcomingEvents()` is `[]` |
|---|---|
| Homepage `#events` band | Renders the `status: "past"` card with the eyebrow `LATEST RECAP`. The band never disappears |
| Pulse-strip chip 1 | `Season wrap — nothing on the calendar` |
| `/events` "Coming up" | `EmptyState` — *No upcoming events* |
| Any "Register" / "Don't miss" copy | Does not exist anywhere in this spec, precisely so this branch needs no copy rewrite |

`getFeaturedEvent()` **never returns `null`** while `mockEvents` is non-empty, which is why no consumer needs a null branch — only a status branch. The homepage card and `EventsPage` both call it, so they cannot disagree. `EventsPage.tsx:84` currently neither filters by date nor sorts, and repeats the featured record inside its own list — the fix is `getUpcomingEvents().filter(e => e.id !== featured?.event.id)`.

**The data fix, recommended and non-blocking:** adding one future event to `src/mock/mockEvents.ts` restores the `"today"`/`"upcoming"` branches for demo purposes. That is a content change, not a code change — nothing above needs editing for it, which is the point of specifying all three branches.

##### Activities

```ts
export const getActivities = () => mockActivities
export const getActivityBySlug = (slug: string): Activity | undefined =>
  mockActivities.find((a) => a.slug === slug)

/** Derived from the activities themselves, so a filter pill can never exist
    with nothing behind it. categoryData lists "Recreation" (15%) but NO
    activity has that category — deriving is what keeps that pill from
    appearing. Returns ["Sports", "Fitness"] today. */
export const getActivityCategories = (): string[] =>
  [...new Set(mockActivities.map((a) => a.category))]

export const getActivitiesByCategory = (category: string | null) =>
  !category || category === "All" ? mockActivities : mockActivities.filter((a) => a.category === category)

export const getCategoryCounts = (): Record<string, number> =>
  mockActivities.reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] ?? 0) + 1
    return acc
  }, {})
```

`getCategoryCounts()` → `{ Sports: 3, Fitness: 2 }`. With `getActivityCategories()` that is the whole chip row: `All 5` · `Sports 3` · `Fitness 2`, every number computed.

```ts
/** The hero's two live-card numerals. `venues` is deliberately absent —
    activities have no venue field, and counting distinct mockEvents venue
    strings undercounts 5 facilities as 3. See ruling R11. */
export const getSiteCounts = () => ({
  activities: mockActivities.length,
  categories: getActivityCategories().length,
})
```

##### Open-now — the selector that admits what it cannot know

```ts
export type OpenState =
  | { state: "open"; until: string }
  | { state: "closed"; opens: string }
  | { state: "unknown" }

/** Every mock timing is dayOfWeek 1 (Monday). Today is Wednesday, so NO
    activity has hours for today and this returns "unknown" for all five.
    Returning `false` would assert "closed", which the data does not support. */
export function getOpenNow(activity: Activity, now = new Date()): OpenState {
  const t = activity.timings.find((x) => x.dayOfWeek === now.getDay())
  if (!t) return { state: "unknown" }
  const mins = now.getHours() * 60 + now.getMinutes()
  const open = toMinutes(t.openTime)
  const close = toMinutes(t.closeTime)
  return mins >= open && mins < close
    ? { state: "open", until: t.closeTime }
    : { state: "closed", opens: t.openTime }
}
```

| Consequence | |
|---|---|
| The `<Pill variant="live">Open now</Pill>` on `ActivityCard` renders **only** on `state === "open"` | With today's data it never renders on any day except Monday |
| `state: "unknown"` renders **nothing** — not "Closed", not "Hours unavailable" | Absence is honest; a false "Closed" is not |
| The pulse strip shows `formatRange(timings[0])` instead | A published Monday schedule is a fact; a live status is not |

Two readers sit on top of it, and nothing else infers open-ness anywhere in the app:

```ts
/** Strict dayOfWeek match, on purpose. Returns [] on six days out of seven
    with today's mock. Do NOT "fix" this by treating timings[0] as a daily
    window — that fabricates a live status. See ruling R16. */
export const getOpenActivitiesNow = (now = new Date()) =>
  mockActivities.filter((a) => getOpenNow(a, now).state === "open")

/** True when today's weekday has ANY timing row at all. Gates the entire
    "Open now" affordance, so absence of data never renders as "Closed". */
export const hasTimingForToday = (now = new Date()) =>
  mockActivities.some((a) => a.timings.some((t) => t.dayOfWeek === now.getDay()))
```

##### Gallery, people, achievements, stats

```ts
export type GalleryKind = "activity" | "event"

export function getGalleryFor(kind: GalleryKind, slug: string): GalleryImage[] {
  const set = kind === "activity"
    ? mockGallery.find((g) => g.activitySlug === slug)
    : mockEventGallery.find((g) => g.eventSlug === slug)
  return set?.images ?? []
}

/** Built ONCE as a lookup, not with .find() inside .map(). GalleryPage.tsx:63
    and EventGalleryHubPage.tsx:21 do the latter — O(n·m) and it recomputes
    on every render. */
export function getGalleryCounts(kind: GalleryKind): Record<string, number> {
  const sets = kind === "activity" ? mockGallery : mockEventGallery
  return Object.fromEntries(
    sets.map((s) => [kind === "activity" ? (s as { activitySlug: string }).activitySlug
                                          : (s as { eventSlug: string }).eventSlug, s.images.length]),
  )
}

export const getPeopleByRole = (role: PersonRole): Person[] =>
  mockPeople.filter((p) => p.personRole === role)

export const getAchievements = (): Achievement[] =>
  [...mockAchievements].sort((a, b) => b.achievedAt.localeCompare(a.achievedAt))

/** #wins and /achievements must not sort differently, so the homepage slice
    reads the same sorted list rather than re-sorting locally. Pure recency —
    no level weighting, no hidden ranking table. */
export const getRecentAchievements = (limit = 3): Achievement[] =>
  getAchievements().slice(0, limit)

/** Options derived from the records, so no filter offers an empty result. */
export function getAchievementFilters() {
  return {
    activities: [...new Set(mockAchievements.map((a) => a.activityName))].sort(),
    levels: [...new Set(mockAchievements.map((a) => a.level))],
    years: [...new Set(mockAchievements.map((a) => a.achievedAt.slice(0, 4)))].sort().reverse(),
  }
}

export function filterAchievements(f: { activity?: string; level?: string; year?: string }) {
  return getAchievements().filter(
    (a) =>
      (!f.activity || a.activityName === f.activity) &&
      (!f.level || a.level === f.level) &&
      (!f.year || a.achievedAt.startsWith(f.year)),
  )
}

export function getStatSummary() {
  return {
    cards: overviewCards,
    participation: participationData,
    categories: categoryData,
    /** 11 entries, Jan–Nov. December is absent from the source; the chart
        renders 11 points and the caption says so. Do not pad with a zero —
        a zero December is a claim that nothing happened. */
    trend: trendData,
    topActivities,
  }
}
```

**Returns today:**

| Call | Result |
|---|---|
| `getActivityCategories()` | `["Sports", "Fitness"]` |
| `getSiteCounts()` | `{ activities: 5, categories: 2 }` |
| `getRecentAchievements()` | Karan Patel (2026), then the two 2025 records |
| `getOpenActivitiesNow()` | `[]` on any day except Monday |
| `hasTimingForToday()` | `false` on any day except Monday |
| `getGalleryCounts("activity")` | `{ basketball: 3, football: 3, gym: 3, swimming: 3, badminton: 3 }` |
| `getGalleryCounts("event")` | `{ "interbits-football": 3, "fitness-challenge": 3, "swimming-championship": 3 }` |
| `getPeopleByRole("INCHARGE")` | Dr. Rajesh Kumar, Dr. Priya Sharma |
| `getPeopleByRole("COMMITTEE")` | Arjun Mehta, Ananya Verma |
| `getAchievementFilters().levels` | `["National", "State", "Inter-NIT", "Campus"]` |
| `getAchievementFilters().years` | `["2026", "2025", "2024"]` |
| `getAchievements()[0]` | Karan Patel — Campus Fitness Challenge Winner, 2026-01-15 |
| `filterAchievements({ level: "State", year: "2024" })` | `[]` → `EmptyState` |
| `getGalleryFor("activity", "yoga")` | `[]` — Yoga is in `participationData` only, and has no gallery and no activity record |

**Note the asymmetry:** `mockGallery` has 5 sets keyed by `activitySlug`, one per activity. `mockEventGallery` has 3 sets keyed by `eventSlug`, one per event. Both are complete — no activity or event lacks a gallery.

---

#### 4. The mock-data disclosure rule

All of this is static imports from `src/mock/`. Nothing is fetched; there is no API, no `useQuery` call anywhere in `src/` (the `QueryClientProvider` in `main.tsx` wraps zero consumers). Therefore:

| Rule | |
|---|---|
| A `Mock data` `<Pill>` appears once per data-bearing section, in `text-fg-muted` with a `border-line` outline | Never volt — it is a disclosure, not a feature |
| No copy may say "live", "real-time", "now updating" or "synced" | The pulse strip is named for its rhythm, not for a live feed |
| `getStatSummary().trend` is captioned `Jan–Nov 2026 · 11 months recorded` | Not "this year" |
| The contact form is labelled a demo and asserts no network request | Covered in the routes and tests chapters |

---

## Part 6 — Routes

All fifteen routes. Each with its `PageIntro`, bands, data, empty states, and a file:line ledger of what is wrong today.

---

### Detail-route specs — all 15 routes

Read: every file in `src/pages/`, `src/routes/index.tsx`, `src/components/cards/*`, `src/components/charts/*`, `src/mock/*`, `src/index.css` (14 lines, no `@theme` yet), `src/components/ui/dialog.tsx`.

Three judgement calls made up front, so nothing below is ambiguous:

1. **The one `mesh-cream` inverted section lives on `/` (homepage).** No detail route uses `mesh-cream`. Detail routes are `void` / `abyss` with `mesh-teal` on the intro band only.
2. **`--color-win` is not used on any detail route.** It is reserved for the homepage `#impact` scene. Achievement levels use `--color-volt` / `--color-cream-dim`, so "wins only" is never diluted into a generic success green.
3. **There is no per-route loading state.** All data is a synchronous module import; a skeleton would be a lie. Only `MediaFrame` has a load state (its own spec). `ErrorState` mounts once, in an error boundary in `App`.

---

#### 0. Route table (final)

| # | Path | File | Kind | Canvas of band 1 | H1 token |
|---|---|---|---|---|---|
| 1 | `/` | `pages/HomePage.tsx` | narrative | `void` + `mesh-volt` | `--text-display-xl` (site's only one) |
| 2 | `/activities` | `pages/Activities/ActivitiesPage.tsx` | index | `void` + `mesh-teal` | `--text-display-m` |
| 3 | `/activities/:slug` | `pages/Activities/ActivityDetailPage.tsx` | detail | `void` + `mesh-teal` | `--text-display-m` |
| 4 | `/stats` | `pages/Stats/StatsPage.tsx` | data | `void` + `mesh-teal` | `--text-display-m` |
| 5 | `/gallery` | `pages/Gallery/GalleryPage.tsx` | hub | `void` + `mesh-teal` | `--text-display-m` |
| 6 | `/gallery/:slug` | `pages/Gallery/GalleryDetailPage.tsx` **(new)** | detail | `void` + `mesh-teal` | `--text-display-m` |
| 7 | `/gallery/events` | `pages/Gallery/EventGalleryHubPage.tsx` | hub | `void` + `mesh-teal` | `--text-display-m` |
| 8 | `/gallery/events/:slug` | `pages/Gallery/GalleryDetailPage.tsx` **(same file)** | detail | `void` + `mesh-teal` | `--text-display-m` |
| 9 | `/events` | `pages/Events/EventsPage.tsx` | index | `void` + `mesh-teal` | `--text-display-m` |
| 10 | `/events/:slug` | `pages/Events/EventDetailPage.tsx` | detail | `void` + `mesh-teal` | `--text-display-m` |
| 11 | `/people` | `pages/People/PeoplePage.tsx` | hub | `void` + `mesh-teal` | `--text-display-m` |
| 12 | `/people/incharges` | `pages/People/PeopleRolePage.tsx` **(new)** | index | `void` + `mesh-teal` | `--text-display-m` |
| 13 | `/people/committee` | `pages/People/PeopleRolePage.tsx` **(same file)** | index | `void` + `mesh-teal` | `--text-display-m` |
| 14 | `/achievements` | `pages/AchievementsPage.tsx` | index | `void` + `mesh-teal` | `--text-display-m` |
| 15 | `/contact` | `pages/ContactPage.tsx` | action | `void` + `mesh-teal` | `--text-display-m` |
| 16 | `*` | `pages/NotFoundPage.tsx` **(new)** | fallback | `void` + `mesh-volt` | `--text-display-m` |

```tsx
// src/routes/index.tsx — full replacement. Adds catch-all, folds 4 files into 2,
// redirects the FAB's dead /report link.
import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import ActivitiesPage from "@/pages/Activities/ActivitiesPage";
import ActivityDetailPage from "@/pages/Activities/ActivityDetailPage";
import StatsPage from "@/pages/Stats/StatsPage";
import GalleryPage from "@/pages/Gallery/GalleryPage";
import EventGalleryHubPage from "@/pages/Gallery/EventGalleryHubPage";
import GalleryDetailPage from "@/pages/Gallery/GalleryDetailPage";
import EventsPage from "@/pages/Events/EventsPage";
import EventDetailPage from "@/pages/Events/EventDetailPage";
import PeoplePage from "@/pages/People/PeoplePage";
import PeopleRolePage from "@/pages/People/PeopleRolePage";
import AchievementsPage from "@/pages/AchievementsPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/activities" element={<ActivitiesPage />} />
    <Route path="/activities/:slug" element={<ActivityDetailPage />} />
    <Route path="/stats" element={<StatsPage />} />
    <Route path="/gallery" element={<GalleryPage />} />
    <Route path="/gallery/events" element={<EventGalleryHubPage />} />
    <Route path="/gallery/events/:slug" element={<GalleryDetailPage kind="event" />} />
    <Route path="/gallery/:slug" element={<GalleryDetailPage kind="activity" />} />
    <Route path="/events" element={<EventsPage />} />
    <Route path="/events/:slug" element={<EventDetailPage />} />
    <Route path="/people" element={<PeoplePage />} />
    {/* both legacy paths preserved verbatim via one param route */}
    <Route path="/people/:role" element={<PeopleRolePage />} />
    <Route path="/achievements" element={<AchievementsPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/report" element={<Navigate to="/contact" replace />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
```

Route-ranking note: React Router 7 ranks static segments above dynamic ones, so `/gallery/events` beats `/gallery/:slug` regardless of declaration order. Order above is for human reading only.

Scroll reset (currently missing — navigating from a scrolled `/gallery` to `/gallery/basketball` lands mid-page):

```tsx
// src/App.tsx — 6 lines, no library. <ScrollRestoration/> needs a data router; we have <Routes>.
const { pathname } = useLocation();
useEffect(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "instant" });
}, [pathname]);
```

---

#### 1. `PageIntro` — kills 11 shells and 11 header blocks

Replaces: `ActivitiesPage.tsx:30-48`, `ActivityDetailPage.tsx:21-30 + :58-66`, `StatsPage.tsx:28-43`, `GalleryPage.tsx:9-20`, `ActivityGalleryPage.tsx:55-83`, `EventGalleryHubPage.tsx:7-17`, `EventGalleryPage.tsx:55-89`, `EventsPage.tsx:12-25`, `EventDetailPage.tsx:31 + :49-56`, `PeoplePage.tsx:5-16`, `InchargesPage.tsx:10-21`, `CommitteePage.tsx:10-21`, `AchievementsPage.tsx:75-86`, `ContactPage.tsx:9-21`.

```tsx
// src/components/layout/PageIntro.tsx
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export type Crumb = { label: string; to?: string }; // last crumb: no `to`

interface PageIntroProps {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;       // the page's only <h1>
  lead?: string;
  meta?: ReactNode;    // right rail: counts, status pills, "Sample data" note
  actions?: ReactNode; // max 2; first is the only volt button on the page
  mesh?: "teal" | "volt";
  meshStrength?: number; // 0.25–0.9
}
```

Structure and tokens:

| Slot | Element | Type token | Color token | Geometry |
|---|---|---|---|---|
| band | `<section>` | — | `bg-void`, `mesh-teal` `--mesh-strength:.35` | `pt-[calc(var(--space-section)*0.7)] pb-[var(--space-section)]` |
| container | `<div>` | — | — | `mx-auto max-w-[var(--container)] px-[var(--gutter)]` |
| breadcrumb | `<nav aria-label="Breadcrumb"><ol>` | `--text-meta` | links `--color-fg-faint`, hover `--color-fg-muted`, current `--color-fg-muted` | `gap-2`, separator `/` `aria-hidden` in `--color-line-strong` |
| eyebrow | `<p>` | `--text-eyebrow` uppercase `tracking-[0.2em]` | `--color-volt` | `mb-4` |
| h1 | `<h1>` | `--text-display-m` `font-display font-semibold tracking-[-0.03em] leading-[0.92]` | `--color-cream` | `max-w-[22ch]` |
| lead | `<p>` | `--text-lead` | `--color-fg-muted` | `mt-6 max-w-[62ch]` |
| meta rail | `<ul>` pills | `--text-meta tabular-nums` | text `--color-fg-muted`, border `--color-line`, surface `--color-deep` | `rounded-full px-3 py-1.5`, min-h `32px` |
| mock note | `<p>` | `--text-meta` | `--color-cream-dim`, border-left `2px solid var(--color-line-volt)` | `pl-3` |
| actions | `<div>` | `--text-body` | primary: `bg-volt text-ink`, secondary: `border-line-strong text-fg` | `rounded-full h-12 px-6` |
| rule | `<hr>` | — | `border-line` | `mt-[var(--space-section)]` only when `actions` absent |

Desktop ≥1024, 12-col grid inside a 1280 container:

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ← gutter                                                       gutter → │
│ Home / Activities / Basketball                                          │  meta
│                                                                          │
│ SPORTS                                     ┌──────────────────────────┐ │  eyebrow
│                                            │ 3 frames                 │ │
│ Basketball                                 │ Hours · Mon              │ │  h1 (display-m)
│ ────────────────────────────               │ Sample data              │ │  cols 1–7 │ 9–12
│ Indoor basketball courts for practice      └──────────────────────────┘ │
│ sessions and tournaments.                                                │  lead 62ch
│                                                                          │
│ ┌─────────────────┐  ┌──────────────────┐                               │
│ │ Open gallery    │  │ All activities   │                               │  actions
│ └─────────────────┘  └──────────────────┘                               │
└──────────────────────────────────────────────────────────────────────────┘
```

Mobile <640 (separate composition: meta rail becomes a wrapping chip row above the h1, actions stack full-width, breadcrumb truncates to the parent link only):

```
┌────────────────────────────┐
│ ‹ Activities               │  parent crumb only, 48px tap
│                            │
│ SPORTS                     │
│ Basketball                 │  display-m clamps to 2rem
│                            │
│ Indoor basketball courts   │
│ for practice sessions and  │
│ tournaments.               │
│                            │
│ ⌗ 3 frames  ⌗ Hours · Mon  │  chips wrap, 32px
│                            │
│ ┌────────────────────────┐ │
│ │     Open gallery       │ │  48px, full width
│ └────────────────────────┘ │
│ ┌────────────────────────┐ │
│ │     All activities     │ │
│ └────────────────────────┘ │
└────────────────────────────┘
```

Breadcrumbs are **links** (`<Link>`), fixing `ActivityDetailPage.tsx:25-30` (plain text `Activities /`) and `StatsPage.tsx:33` (plain text `Home > Stats > Overview`). Last crumb is `<span aria-current="page">`, never a link.

`MainLayout.tsx:13` currently sets `bg-white` behind every dark page — replace with `bg-void text-fg`; pages no longer set a background at all.

#### 1b. `NextStep` — shared closing band (14 routes)

```tsx
// src/components/layout/NextStep.tsx
interface NextStepProps { eyebrow: string; title: string; links: { label: string; to: string }[] } // links.length <= 3
```

| Slot | Type | Color | Geometry |
|---|---|---|---|
| band | — | `bg-abyss`, top border `--color-line` | `py-[var(--space-section)]` |
| eyebrow | `--text-eyebrow` | `--color-volt` | — |
| title | `--text-display-l` | `--color-cream` | `max-w-[24ch]` |
| link | `--text-title` | `--color-fg`, underline offset 6px, hover `--color-volt` | row `min-h-[48px]`, divider `--color-line` |

#### 1c. States — three components, one table

```tsx
// src/components/ui/EmptyState.tsx
interface EmptyStateProps { eyebrow?: string; title: string; body: string; action?: { label: string; onClick?: () => void; to?: string } }
// src/components/ui/ErrorState.tsx  — mounted once by the error boundary in App
// LoadingState — NOT BUILT. ponytail: mock data is a synchronous import; nothing loads.
```

`EmptyState` surface: `bg-deep`, border `--color-line`, `rounded-xl`, `p-10 md:p-14`, title `--text-title` `--color-fg`, body `--text-body` `--color-fg-muted max-w-[46ch]`, action = volt pill `rounded-full h-12`.

| Route | Empty | Record missing (bad `:slug`) | Error |
|---|---|---|---|
| `/` | n/a (all bands have data) | n/a | boundary |
| `/activities` | filter yields 0 (unreachable with derived chips, kept as a 3-line guard) | n/a | boundary |
| `/activities/:slug` | gallery strip 0 images | `<NotFoundPage kind="activity" />` | boundary |
| `/stats` | n/a | n/a | boundary |
| `/gallery` | n/a | n/a | boundary |
| `/gallery/:slug` | 0 images | `<NotFoundPage kind="activity" />` | boundary |
| `/gallery/events` | n/a | n/a | boundary |
| `/gallery/events/:slug` | 0 images | `<NotFoundPage kind="event" />` | boundary |
| `/events` | **real today**: "Coming up" is empty | n/a | boundary |
| `/events/:slug` | gallery strip 0 images | `<NotFoundPage kind="event" />` | boundary |
| `/people` | n/a | n/a | boundary |
| `/people/:role` | role has 0 people | unknown role segment → `<NotFoundPage kind="people" />` | boundary |
| `/achievements` | **real**: filter combos yield 0 | n/a | boundary |
| `/contact` | n/a | n/a | boundary |
| `*` | — | — | — |

---

#### 2. Selectors and formatters — the exact contract these routes call

`src/lib/content.ts` and `src/lib/format.ts` do not exist yet. Every route below calls only these. No page keeps a `.find()`.

```ts
// src/lib/content.ts
import { mockActivities } from "@/mock/mockActivities";
import { mockEvents } from "@/mock/mockEvents";
import { mockGallery } from "@/mock/mockGallery";
import { mockEventGallery } from "@/mock/mockEventGallery";
import { mockPeople } from "@/mock/mockPeople";
import { mockAchievements } from "@/mock/mockAchievements";
import type { Event } from "@/types/event.types";
import type { PersonRole } from "@/types/person.types";

/** Local calendar day as yyyy-mm-dd. ISO date strings sort and compare lexically. */
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/* ── activities ───────────────────────────────────────────── */
export const getActivityBySlug = (slug?: string) => mockActivities.find((a) => a.slug === slug);
/** ["Sports","Fitness"] — derived, never hardcoded. Kills the dead "Recreation" chip. */
export const getActivityCategories = () => [...new Set(mockActivities.map((a) => a.category))];
export const getActivitiesByCategory = (c: string) =>
  c === "All" ? mockActivities : mockActivities.filter((a) => a.category === c);
/** Only dayOfWeek 1 exists in mock data → [] on any non-Monday. Callers MUST handle that. */
export const getOpenActivitiesNow = () => {
  const now = new Date();
  const dow = now.getDay();
  const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return mockActivities.filter((a) =>
    a.timings.some((t) => t.dayOfWeek === dow && t.openTime <= hhmm && hhmm < t.closeTime)
  );
};
/** true when today's weekday has ANY timing row at all — gates the "Open now" affordance. */
export const hasTimingForToday = () => mockActivities.some((a) => a.timings.some((t) => t.dayOfWeek === new Date().getDay()));

/* ── events ───────────────────────────────────────────────── */
export const getEventBySlug = (slug?: string) => mockEvents.find((e) => e.slug === slug);
/** First featured record. mockEvents has TWO featured; the second is shown as an ordinary card. */
export const getFeaturedEvent = () => mockEvents.find((e) => e.isFeatured);
export const getEventPhase = (e: Event): "today" | "upcoming" | "past" => {
  const t = today();
  return e.startDate === t ? "today" : e.startDate > t ? "upcoming" : "past";
};
/** One sort, three lists. Replaces EventsPage.tsx:84's unfiltered, unsorted, duplicating map. */
export const getEventsByPhase = () => {
  const sorted = [...mockEvents].sort((a, b) => a.startDate.localeCompare(b.startDate));
  return {
    today: sorted.filter((e) => getEventPhase(e) === "today"),
    upcoming: sorted.filter((e) => getEventPhase(e) === "upcoming"),
    past: sorted.filter((e) => getEventPhase(e) === "past").reverse(), // newest first
  };
};
export const getUpcomingEvents = (limit?: number) => {
  const { today: t, upcoming } = getEventsByPhase();
  const list = [...t, ...upcoming];
  return limit ? list.slice(0, limit) : list;
};

/* ── galleries ────────────────────────────────────────────── */
// Built once at module scope. Kills .find()-inside-.map() at GalleryPage.tsx:63 and
// EventGalleryHubPage.tsx:21 without a hook or a memo.
const galleryIndex = {
  activity: new Map(mockGallery.map((g) => [g.activitySlug, g.images])),
  event: new Map(mockEventGallery.map((g) => [g.eventSlug, g.images])),
} as const;
export type GalleryKind = keyof typeof galleryIndex;
export const getGalleryFor = (kind: GalleryKind, slug?: string) => galleryIndex[kind].get(slug ?? "") ?? [];
export const getGalleryCount = (kind: GalleryKind, slug?: string) => getGalleryFor(kind, slug).length;

/* ── people ───────────────────────────────────────────────── */
export const getPeopleByRole = (role: PersonRole) => mockPeople.filter((p) => p.personRole === role);

/* ── achievements ─────────────────────────────────────────── */
const uniq = <T,>(xs: T[]) => [...new Set(xs)];
export const getAchievementFilters = () => ({
  levels: uniq(mockAchievements.map((a) => a.level)),                               // National, State, Inter-NIT, Campus
  activities: uniq(mockAchievements.map((a) => a.activityName)).sort(),             // Badminton, Basketball, Football, Gym, Swimming
  years: uniq(mockAchievements.map((a) => a.achievedAt.slice(0, 4))).sort().reverse(), // 2026, 2025, 2024
});
export const getAchievements = (f: { level: string; activity: string; year: string }) =>
  mockAchievements
    .filter((a) => f.level === "All" || a.level === f.level)
    .filter((a) => f.activity === "All" || a.activityName === f.activity)
    .filter((a) => f.year === "All" || a.achievedAt.startsWith(f.year))
    .sort((a, b) => b.achievedAt.localeCompare(a.achievedAt));
```

```ts
// src/lib/format.ts
const long = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });
const short = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" });
const clock = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });

/** "2026-06-12" → "12 June 2026" | short: "12 Jun". Parsed as local noon so no TZ slip. */
export const formatDate = (iso: string, variant: "long" | "short" = "long") =>
  (variant === "long" ? long : short).format(new Date(`${iso}T12:00:00`));

/** "06:00" → "6:00 am" (lowercase meridiem — ALL CAPS is eyebrows and nav only). */
export const formatTime = (hhmm: string) =>
  clock.format(new Date(`1970-01-01T${hhmm}:00`)).toLowerCase().replace(/\s+/g, " ");

/** ("06:00","22:00") → "6:00 am – 10:00 pm". En dash, not hyphen, not em dash. */
export const formatRange = (open: string, close: string) => `${formatTime(open)} – ${formatTime(close)}`;

export const DAY_LABEL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/** Sign-driven growth. Fixes StatsPage.tsx:84's hardcoded green ↑ on every card,
 *  including card 3 whose "growth" is the non-numeric string "Most Participated". */
export type Growth = { dir: "up" | "down" | "flat" | "none"; label: string };
export const formatGrowth = (raw: string): Growth => {
  const m = raw.match(/^([+-])?\s*([\d.]+)/);
  if (!m) return { dir: "none", label: raw };
  if (Number(m[2]) === 0) return { dir: "flat", label: raw };
  return { dir: m[1] === "-" ? "down" : "up", label: raw };
};
```

Growth rendering rule — there is no red token, so direction is never colour-only:

| `dir` | Glyph | Text token | sr-only |
|---|---|---|---|
| `up` | `↑` | `--color-volt` | "up" |
| `down` | `↓` | `--color-fg-muted` | "down" |
| `flat` | `→` | `--color-fg-muted` | "no change" |
| `none` | none | `--color-fg-faint` | — |

#### 2b. `FilterRow` — one labelled chip row, used by `/activities` and `/achievements`

```tsx
// src/components/ui/FilterRow.tsx
interface FilterRowProps { label: string; options: string[]; value: string; onChange: (v: string) => void }
// <fieldset><legend> = label (eyebrow token). Chips are <button role="radio"> inside role="radiogroup".
```

| State | Surface | Text | Border | Geometry |
|---|---|---|---|---|
| idle | `--color-deep` | `--color-fg-muted` | `--color-line` | `rounded-full h-12 px-5`, `--text-meta` |
| hover | `--color-raised` | `--color-fg` | `--color-line-strong` | `--dur-fast` `--ease-out-quint` |
| selected | `--color-volt` | `--color-ink` | `--color-volt` | `font-medium` |
| focus | — | — | global ring: `outline 2px solid var(--color-volt)`, offset 3px | — |

Legend is mandatory. That is the fix for `AchievementsPage.tsx:88-101` (level row had no label while `:104` "Activity" and `:127` "Year" did).

---

#### 3. Consolidation ledger

| Action | File | Notes |
|---|---|---|
| delete | `src/pages/Gallery/ActivityGalleryPage.tsx` (133 lines) | clone; `SelectedImage` declared at `:9-12` |
| delete | `src/pages/Gallery/EventGalleryPage.tsx` (138 lines) | clone; `SelectedImage` re-declared at `:9-12` |
| create | `src/pages/Gallery/GalleryDetailPage.tsx` | one component + `GALLERY_KINDS` config; paths `/gallery/:slug` and `/gallery/events/:slug` unchanged |
| delete | `src/pages/People/InchargesPage.tsx` (36) | differs from Committee only in `"INCHARGE"` (`:6`) and `md:grid-cols-2` (`:23`) |
| delete | `src/pages/People/CommitteePage.tsx` (36) | ditto (`:6`, `:23` `md:grid-cols-2 lg:grid-cols-3`) |
| create | `src/pages/People/PeopleRolePage.tsx` | reads `:role`; both legacy URLs still resolve |
| delete | `src/components/cards/EventGalleryCard.tsx` (42) | byte-identical markup to `GalleryCard.tsx` except the `to` template at `:18` |
| rewrite | `src/components/cards/GalleryCard.tsx` | takes `to: string` instead of `slug`; one card for both hubs |
| delete | `src/pages/Gallery/GalleryImageDialog.tsx` (35) | five defects, all fixed in §5 |
| create | `src/components/gallery/GalleryLightbox.tsx` | §5 |
| create | `src/pages/NotFoundPage.tsx` | `*` route **and** the five bad-slug branches |
| create | `src/components/layout/PageIntro.tsx`, `NextStep.tsx`, `src/components/ui/EmptyState.tsx`, `ErrorState.tsx`, `FilterRow.tsx`, `src/lib/content.ts`, `src/lib/format.ts` | — |

```tsx
// src/components/cards/GalleryCard.tsx — one card, both hubs
interface GalleryCardProps { to: string; title: string; imageUrl: string; count: number; caption?: string }
```
Card: `bg-deep`, border `--color-line`, `rounded-lg`, frame `aspect-[4/5]` (`MediaFrame`) with a bottom scrim `--color-void`, title `--text-title` `--color-fg`, count `--text-meta tabular-nums` `--color-fg-faint` reading `"{count} frames"`. Hover (pointer devices only): surface → `--color-raised`, border → `--color-line-strong`, translate `-4px` (`--lift`), `--shadow-lift`, `--dur-std` `--ease-out-quint`. `alt={title}` always; count is text, never colour-only.

---

#### 4. Route specs

##### 4.1 `/` — Home

No `PageIntro`. Hero + narrative bands; composition and copy belong to the hero / `#focus` / `#impact` chapters. This chapter fixes the data lies and the shell.

| Band | Anchor | Canvas | Data |
|---|---|---|---|
| 1 hero | — | `void` + `mesh-volt` `.9` | none (typographic) |
| 2 pulse strip | `#pulse` | `abyss` | `getUpcomingEvents(1)`, `getOpenActivitiesNow()` + `hasTimingForToday()` |
| 3 what SAC is | `#focus` | `void` + `mesh-teal` `.5` (GSAP pinned scene — 1 of 2) | none |
| 4 activities | `#activities` | `abyss` | `getActivitiesByCategory`, `getActivityCategories` |
| 5 featured event | `#events` | `void` | `getFeaturedEvent`, `getEventPhase` |
| 6 people | `#people` | `abyss` | `getPeopleByRole("INCHARGE" \| "COMMITTEE")` |
| 7 impact | `#impact` | `void` + `mesh-teal` `.4` (GSAP scrubbed reveal — 2 of 2) | `overviewCards`, `trendData` |
| 8 gallery | `#gallery` | `abyss` | `getGalleryFor("activity", …)` |
| 9 achievements | — | `void` | `getAchievements({level:"All",activity:"All",year:"All"})` sliced to 3 |
| 10 join CTA | — | **`mesh-cream` — the site's one inverted band** | none |

Pulse-strip degradation, mandatory: on any non-Monday `getOpenActivitiesNow()` is `[]` and on/after 2026-08-06 `getEventsByPhase().upcoming` is `[]`. Band 2 renders, in order of availability: today's event → next upcoming → most recent past labelled "Last event". If all three lists are empty it renders the participation metric alone. No band ever renders a bare zero.

| file:line | Defect | Fix |
|---|---|---|
| `HomePage.tsx:6` | `bg-[#060913]`, own shell, `text-slate-100` | shell deleted; `MainLayout` owns `bg-void text-fg` |
| `:11` | hero bg via inline `url('../1-78.jpg.png')` + two rgba stops | graphic-led hero: `mesh-volt` + grain, zero photography |
| `:70,:90,:110` | `<img src="../7-40.png">` etc. — relative paths that 404 from any nested route; `alt=""` on meaningful images | `MediaFrame` + `coverImageUrl` from `mockActivities`, real `alt` |
| `:74-77` | invents activity **"Snooker" / category "Recreation"** | `getActivitiesByCategory` — only Sports and Fitness exist |
| `:94-101` | badge says "Sports", heading says "Badminton", comment says gym image | data-driven card, one source |
| `:114-117` | invents **"Table Tennis" / "Recreation"** | as above |
| `:141-189` | three fabricated events (SAC Annual Sports Meet 24 May 2025, Inter-Hostel Basketball Tournament, Yoga & Wellness Workshop) with fake times and venues | `getUpcomingEvents(3)` + `formatDate` |
| `:40` | "Welcome to BITS Pilani Goa Campus!" — banned opener, exclamation mark | replaced by hero copy (hero chapter) |
| `:45-48` | "Explore Now" `<button>` with no handler | `<Link to="/activities">` |
| `:79-81,:99-101` | hardcoded "Everyday · 10:00 AM - 9:00 PM" | `formatRange(timings[0].openTime, timings[0].closeTime)` + `DAY_LABEL` |

##### 4.2 `/activities`

| PageIntro | Value |
|---|---|
| crumbs | `Home` → `/` · `Activities` (current) |
| eyebrow | `FACILITIES` |
| H1 | **Where the campus trains** |
| lead | **Courts, a full-size ground, an Olympic pool, and the gym. Pick a discipline, check the hours, turn up.** |
| meta | `5 facilities` · `2 categories` (both computed) |
| note | **Hours shown are the Monday schedule — other days are not in the current data set.** |
| actions | none |

| Band | Canvas | Content | Data |
|---|---|---|---|
| 1 | `void` + `mesh-teal` `.35` | `PageIntro` | `mockActivities.length`, `getActivityCategories()` |
| 2 | `abyss` | `FilterRow label="Category"` options `["All", ...getActivityCategories()]`, bound to `?category=`; result count line `--text-meta` `--color-fg-faint` | `useSearchParams` |
| 3 | `abyss` (same band, no rule) | grid `grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6`; `ActivityCard` | `getActivitiesByCategory(category)` |
| 4 | `abyss` | `EmptyState` when 0 | — |
| 5 | `NextStep` `abyss` | eyebrow `NEXT` · title **See it in use** · links: Galleries `/gallery`, Events `/events` | — |

Filter state lives in the URL (`useSearchParams`), not `useState`: same line count, plus back-button and shareable `/activities?category=Fitness`. An unknown value (`?category=Recreation`, the old chip) falls through to the `EmptyState`, whose action resets to `All`.

`EmptyState` copy: title **Nothing under that category** · body **The SAC runs Sports and Fitness activities only. Clear the filter to see all five.** · action **Show all activities**.

| file:line | Defect | Fix |
|---|---|---|
| `ActivitiesPage.tsx:7-12` | hardcoded `categories` incl. `"Recreation"` → chip matching 0 records | `getActivityCategories()` |
| `:72-79` | grid with no empty branch → blank page after the Recreation chip | `EmptyState` |
| `:30` | `min-h-screen bg-[#050816] px-4 py-16` | `PageIntro` + band tokens |
| `:39` | `h1 text-5xl font-black tracking-tight` | `--text-display-m`, `font-semibold`, `tracking-[-0.03em]` |
| `:35` | `text-cyan-400` eyebrow | `--color-volt` |
| `:44-46` | lead says "recreational facilities" — no such category | new lead copy |
| `ActivityCard.tsx:52-53` | raw `06:00 — 22:00` | `formatRange` |
| `ActivityCard.tsx:12` | bespoke `hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]` | `--shadow-lift` |
| `ActivityCard.tsx:19` | `h-64` fixed-height photo | `MediaFrame aspect-[4/5]` |

##### 4.3 `/activities/:slug`

| PageIntro | Value |
|---|---|
| crumbs | `Home` → `/` · `Activities` → `/activities` · `{activity.name}` (current) |
| eyebrow | `{activity.category}` uppercased by CSS — `SPORTS` / `FITNESS` |
| H1 | `{activity.name}` |
| lead | `{activity.description}` (verbatim from data — all 5 records have one) |
| meta | `{getGalleryCount("activity", slug)} frames` · `Hours · Mon` |
| actions | primary **Open gallery** → `/gallery/{slug}`; secondary **All activities** → `/activities` |

| Band | Canvas | Content | Data |
|---|---|---|---|
| 1 | `void` + `mesh-teal` `.35` | `PageIntro` | `getActivityBySlug(slug)` |
| 2 | `abyss` | Hours panel: 3 stat blocks — Opens `formatTime(openTime)`, Closes `formatTime(closeTime)`, Window `formatRange(...)`. Numerals `font-display tabular-nums` `--color-volt`, labels `--text-eyebrow` `--color-fg-faint`. Caption: **Monday schedule. Other days are not in the current data set.** | `activity.timings[0]` |
| 3 | `abyss` | Live pill, rendered **only when `hasTimingForToday()`** — `Open now` (`--color-live` + pulse) / `Closed now` (`--color-fg-muted`). Off-Monday: pill omitted entirely, no false "closed". | `getOpenActivitiesNow()` |
| 4 | `void` | Gallery strip: first 3 of `getGalleryFor("activity", slug)`, `aspect-[4/5]` frames, `alt={image.caption}`, caption `--text-meta` `--color-fg-muted`; whole tile is a `<Link to={"/gallery/" + slug}>`; heading row has a text link **All {n} frames →** | `getGalleryFor` |
| 5 | `void` | `EmptyState` when the strip is empty — title **No frames yet** · body **Photos from this space have not been added.** | — |
| 6 | `NextStep` `abyss` | eyebrow `KEEP GOING` · title **More {category}** · links = other activities in the same category (`getActivitiesByCategory(category)` minus self, max 3) | — |

Bad slug → `<NotFoundPage kind="activity" />` (§4.16), not the centred string at `:14`.

| file:line | Defect | Fix |
|---|---|---|
| `ActivityDetailPage.tsx:25-30` | breadcrumb is plain text `Activities /` | `PageIntro` crumbs as `<Link>` |
| `:104-127` | "Gallery Preview" renders `coverImageUrl` **three times**, no `alt`, no link | `getGalleryFor("activity", slug).slice(0,3)`, real captions as `alt`, tiles link to `/gallery/:slug` |
| `:12-18` | not-found = bare centred sentence, no way out, no `<h1>` | `NotFoundPage` with contextual links |
| `:59` | `h1 text-5xl lg:text-7xl` (the 5th distinct H1 size) | `--text-display-m` |
| `:41` | `h-[500px] object-cover` hero photo carries the page | `MediaFrame aspect-[16/9]` + `--color-void` scrim, decorative |
| `:77,:87` | raw `06:00` / `22:00` | `formatTime` |
| `:52` | cyan category badge | `--text-eyebrow` `--color-volt`, no pill |
| `:91-99` | third info card repeats Category, already the eyebrow | replaced by the Window stat |

##### 4.4 `/stats`

| PageIntro | Value |
|---|---|
| crumbs | `Home` → `/` · `Stats` (current) |
| eyebrow | `PARTICIPATION` |
| H1 | **The numbers behind the noise** |
| lead | **Participation logged across SAC facilities: who turns up, how often, and where the hours land.** |
| meta | `Jan – Nov` · `7 activities` |
| note | **Sample data for layout review. These figures are not live campus records.** |
| actions | none (Export deferred) |

```
┌──────────────────────────────────────────────────────────────────────────┐
│ BAND 1  void + mesh-teal .35                                             │
│ Home / Stats                                                             │
│ PARTICIPATION                                                            │
│ The numbers behind the noise            ⌗ Jan–Nov  ⌗ 7 activities        │
│ │ Sample data for layout review…                                         │
├──────────────────────────────────────────────────────────────────────────┤
│ BAND 2  abyss   5 stat blocks, one row ≥1280, 2-up ≥640, stacked <640   │
│ ┌──────────┬──────────┬──────────┬──────────┬──────────┐                │
│ │ 1,248+   │ 12,540+  │Basketball│ 3.6      │ 24       │  volt numerals │
│ │ Active   │ Hours    │ Top      │ Sessions │Activities│  fg-faint label│
│ │ ↑ +12.5% │ ↑ +8.2%  │ Most …   │ ↑ +0.4   │ ↑ +6     │  sign-driven   │
│ └──────────┴──────────┴──────────┴──────────┴──────────┘                │
├──────────────────────────────────────────────────────────────────────────┤
│ BAND 3  void     Participation by activity          [Most first │ A–Z]  │
│ ████████████████████████████████████ Basketball 820   ← volt bar       │
│ ████████████████████████████ Swimming 650             ← teal-500       │
│ ██████████████████████ Gym 520                                          │
│ ████████████████████ Badminton 480                                      │
│ ████████████████ Football 390                                           │
│ █████████████ Yoga 320                                                  │
│ ██████████ TT 250                                                       │
│ ▸ Read as a table                                                       │
├──────────────────────────────────────────────────────────────────────────┤
│ BAND 4  abyss    ┌ Programme share ─────────┐ ┌ Monthly trend ────────┐ │
│                  │  donut, 3 slices         │ │ Jan ─────────── Nov   │ │
│                  │  Sports 55 Fitness 30    │ │ area, volt stroke     │ │
│                  │  Recreation 15           │ │ ▸ Read as a table     │ │
│                  │  ▸ Read as a table       │ └───────────────────────┘ │
│                  └──────────────────────────┘                            │
├──────────────────────────────────────────────────────────────────────────┤
│ BAND 5  void     Top activities                  All activities →       │
│ #  Activity        Participants  Sessions  Hours  Avg/week               │
│ 1  Basketball      128           45        320+   3.8                    │
│ 2  Gym & Fitness   96            62        450+   4.6                    │
├──────────────────────────────────────────────────────────────────────────┤
│ NextStep  abyss                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

Data and captions:

| Band | Data | Caption / a11y |
|---|---|---|
| 2 | `overviewCards` (5) | delta via `formatGrowth`; card 3 (`"Most Participated"`) → `dir:"none"`, no arrow, rendered as a `--text-meta` `--color-fg-faint` caption |
| 3 | `participationData` (7) | `<details><summary>Read as a table</summary>` + `<table>`; bars `--color-teal-500`, the single highest bar `--color-volt` (one series accent) |
| 4a | `categoryData` (3) | heading **Programme share**, caption **Share of logged participation by programme type.** Slices `--color-teal-700` / `--color-teal-500` / `--color-teal-300`. "Recreation" is a programme type in the sample data, not an activity category — the copy never calls it a category, and no route links it to a facility |
| 4b | `trendData` (11) | heading **Monthly trend**, caption **January to November. December is not in the data set.** Stroke `--color-volt`, fill `--color-teal-500` at low alpha via `color-mix` |
| 5 | `topActivities` (2) | `<caption class="sr-only">` + `tabular-nums`; "All activities" is a real `<Link to="/activities">` |

The eight dead controls, resolved:

| file:line | Control | Resolution |
|---|---|---|
| `:46` | "This Month" | **delete** — no time-ranged data exists to switch to |
| `:49` | "This Semester" | **delete** — same |
| `:53` | "Export Report" | **delete** — export is post-rebuild |
| `:107` | "Participants" | **delete** — participants is the only metric in `participationData` |
| `:128` | "This Month" (pie) | **delete** |
| `:149` | "This Month" (trend) | **delete** — replaced by the honest "Jan to November" caption |
| `:167` | "View All" (table) | **becomes real**: `<Link to="/activities">All activities</Link>` |
| `:236` | "View All" (insights) | **delete with the whole card** |

One control is added, and it works: the band-3 sort toggle (`Most first` / `A–Z`), a two-value `useState` re-sorting `participationData` locally. Eight fake controls out, one real control in — that is the entire interactivity budget of the page.

| file:line | Defect | Fix |
|---|---|---|
| `StatsPage.tsx:28` | `px-6 py-10`, **no `mx-auto max-w` anywhere in 310 lines** | every band `mx-auto max-w-[var(--container)] px-[var(--gutter)]` |
| `:33` | breadcrumb is text: `Home {" > "} Stats {" > "} Overview` | `PageIntro` crumbs, `/` separator, real links, no third "Overview" level |
| `:84-86` | `↑ {card.growth}` hardcoded up-arrow in `text-emerald-400` for all five cards, including the non-numeric card 3 | `formatGrowth` + the direction table |
| `:242-303` | three "Engagement Insights" cards restate cards 1, 2 and 4 (12.5%, 8.2%, 0.4) | band deleted; table promoted to full width |
| `:36` | `h1 text-4xl` (differs from the `text-5xl` used on 9 other pages) | `--text-display-m` |
| `:28` | `bg-[#030712]` — a *different* base hex from the other 11 pages' `#050816` | `bg-void` |
| `:68` | bespoke `hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]` | `--shadow-glow-teal` |
| `:72,:167,:236,:243` | purple `text-purple-400` / `bg-purple-500/10` off-palette | `--color-volt` (numerals only) / `--color-teal-500` |
| `ActivityBarChart.tsx:35` | `fill="#8b5cf6"` | `--color-teal-500`, top bar `--color-volt` |
| `ActivityBarChart.tsx:19,26` | axis `stroke="#94a3b8"` | `--color-fg-faint` |
| `ParticipationPieChart.tsx:11-15` | `#8b5cf6 #06b6d4 #3b82f6` | teal ramp |
| `ActivityTrendChart.tsx:71,77,106` | `#8b5cf6` | `--color-volt` stroke, teal fill |
| `ActivityTrendChart.tsx:85` | grid `#1e293b` | `--color-line` |
| all charts | `<Tooltip />` with default white card | tooltip on `--color-deep`, border `--color-line-strong`, `rounded-sm`, `--text-meta` |

##### 4.5 `/gallery`

| PageIntro | Value |
|---|---|
| crumbs | `Home` → `/` · `Gallery` (current) |
| eyebrow | `GALLERIES` |
| H1 | **Frames from the floor** |
| lead | **Practice, matches and finals, sorted by the space they happened in — plus a set for every event the SAC has run.** |
| meta | `{5} activity sets` · `{3} event sets` (computed from the mock arrays) |
| actions | none |

| Band | Canvas | Content | Data |
|---|---|---|---|
| 1 | `void` + `mesh-teal` `.35` | `PageIntro` | `mockActivities.length`, `mockEventGallery.length` |
| 2 | `abyss` | **Event galleries** feature card: full-bleed `Link`, `bg-deep`, border `--color-line-volt`, `rounded-2xl`, eyebrow `FEATURED SET`, title `--text-display-l` `--color-cream`, body `--text-lead` `--color-fg-muted max-w-[52ch]`, and a real affordance — a volt pill **Browse event galleries** with a `lucide ArrowRight`, visible at every breakpoint, `min-h-[48px]` | `mockEventGallery` count |
| 3 | `void` | **Activity galleries** heading `--text-title` + grid `sm:grid-cols-2 lg:grid-cols-3 gap-6` of `GalleryCard` | `mockActivities.map` + `getGalleryCount("activity", slug)` |
| 4 | `NextStep` `abyss` | eyebrow `NEXT` · title **Or read the schedule** · links: Activities `/activities`, Events `/events` | — |

| file:line | Defect | Fix |
|---|---|---|
| `GalleryPage.tsx:44-46` | the feature card's only affordance is a bare `→` glyph, `hidden … md:block` — invisible on mobile, unlabelled for AT | labelled volt pill + `ArrowRight` icon, all breakpoints |
| `:63-65` | `mockGallery.find()` **inside** `mockActivities.map()` | module-scope `Map` via `getGalleryCount` |
| `:9` | shell | band tokens |
| `:12` | `h1 text-4xl` | `--text-display-m` |
| `:57` | copy says "recreational activities" — no such category | new lead copy |
| `:25` | `border-cyan-400/30` | `--color-line-volt` |

##### 4.6 / 4.8 `/gallery/:slug` and `/gallery/events/:slug` — one file

```tsx
// src/pages/Gallery/GalleryDetailPage.tsx
import { useParams } from "react-router-dom";
import { getActivityBySlug, getEventBySlug, getGalleryFor, type GalleryKind } from "@/lib/content";
import { formatDate } from "@/lib/format";

const GALLERY_KINDS = {
  activity: {
    eyebrow: "ACTIVITY GALLERY",
    crumbs: [{ label: "Home", to: "/" }, { label: "Galleries", to: "/gallery" }],
    find: getActivityBySlug,
    titleOf: (a: NonNullable<ReturnType<typeof getActivityBySlug>>) => a.name,
    leadOf: (a: NonNullable<ReturnType<typeof getActivityBySlug>>) => a.description ?? "",
    metaOf: () => [] as string[],
    next: { eyebrow: "NEXT", title: "See the space itself", to: (s: string) => `/activities/${s}`, label: "Activity details" },
  },
  event: {
    eyebrow: "EVENT GALLERY",
    crumbs: [{ label: "Home", to: "/" }, { label: "Galleries", to: "/gallery" }, { label: "Event galleries", to: "/gallery/events" }],
    find: getEventBySlug,
    titleOf: (e: NonNullable<ReturnType<typeof getEventBySlug>>) => e.title,
    leadOf: (e: NonNullable<ReturnType<typeof getEventBySlug>>) => e.description ?? "",
    metaOf: (e: NonNullable<ReturnType<typeof getEventBySlug>>) =>
      [formatDate(e.startDate), e.venue].filter(Boolean) as string[],
    next: { eyebrow: "NEXT", title: "Read the event", to: (s: string) => `/events/${s}`, label: "Event details" },
  },
} as const;

const GalleryDetailPage = ({ kind }: { kind: GalleryKind }) => { /* … */ };
```

| PageIntro | `kind="activity"` | `kind="event"` |
|---|---|---|
| crumbs | Home · Galleries · `{activity.name}` | Home · Galleries · Event galleries · `{event.title}` |
| eyebrow | `ACTIVITY GALLERY` | `EVENT GALLERY` |
| H1 | `{activity.name}` | `{event.title}` |
| lead | `{activity.description}` | `{event.description}` |
| meta | `{n} frames` | `{n} frames` · `{formatDate(startDate)}` · `{venue}` |
| actions | secondary **Activity details** → `/activities/{slug}` | secondary **Event details** → `/events/{slug}` |

| Band | Canvas | Content |
|---|---|---|
| 1 | `void` + `mesh-teal` `.35` | `PageIntro` |
| 2 | `abyss` | Grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`. Each tile is a `<button type="button">` opening the lightbox at that index. Frame `aspect-[4/5]` `rounded-md` `overflow-hidden`, image `object-cover` (thumbnails may crop; the lightbox must not), caption below in `--text-meta` `--color-fg-muted`, index badge `{i+1}/{n}` in `--text-eyebrow` `--color-fg-faint tabular-nums`. Focus ring global volt. |
| 3 | `abyss` | `EmptyState` — title **No frames yet** · body **Photos have not been added to this set.** · action **All galleries** → `/gallery` |
| 4 | `NextStep` `abyss` | per-kind `next` config + `/gallery` |

Both event and activity sets have exactly 3 images in the current data, so the grid is a single row on `lg`. That is intended negative space, not a bug.

Missing record → `<NotFoundPage kind={kind} />`.

| file:line | Defect | Fix |
|---|---|---|
| `ActivityGalleryPage.tsx:9-12` + `EventGalleryPage.tsx:9-12` | `interface SelectedImage` declared twice | deleted; lightbox owns its own types and takes an index |
| `ActivityGalleryPage.tsx:46-53`, `EventGalleryPage.tsx:46-53` | `{selectedImage ? <Dialog open={true} …/> : null}` — synchronous unmount | `open={open}` boolean, Dialog always mounted (§5) |
| both `:30-42` | duplicate hand-rolled not-found blocks with `h1 text-3xl` | `NotFoundPage` |
| both `:55` | duplicate shells | band tokens |
| both `:76` | `h1 text-5xl` | `--text-display-m` |
| both `:72` | `{gallery?.images.length ?? 0} Images` with a capital I mid-sentence | meta pill `"{n} frames"` |
| both `:114` | `h-72 object-cover` | `aspect-[4/5]` frame |
| `EventGalleryPage.tsx:84-88` | `Venue: {event.venue}` label-colon copy | meta pill, no label |

##### 4.7 `/gallery/events`

| PageIntro | Value |
|---|---|
| crumbs | `Home` → `/` · `Galleries` → `/gallery` · `Event galleries` (current) |
| eyebrow | `EVENTS` |
| H1 | **Every event, in frames** |
| lead | **The football tournament, the fitness challenge and the swimming championship — start to podium.** |
| meta | `{3} sets` · `{9} frames` (computed) |
| actions | secondary **All galleries** → `/gallery` |

| Band | Canvas | Content | Data |
|---|---|---|---|
| 1 | `void` + `mesh-teal` `.35` | `PageIntro` | `mockEventGallery` |
| 2 | `abyss` | grid `sm:grid-cols-2 lg:grid-cols-3` of `GalleryCard to={"/gallery/events/" + slug}`; caption line = `formatDate(startDate, "short")` | `mockEvents.map` + `getGalleryCount("event", slug)` |
| 3 | `NextStep` `abyss` | eyebrow `NEXT` · title **Read the events** · links: Events `/events`, Activity galleries `/gallery` | — |

| file:line | Defect | Fix |
|---|---|---|
| `EventGalleryHubPage.tsx:21-23` | `mockEventGallery.find()` inside `mockEvents.map()` | `getGalleryCount` |
| `:10` | `h1 text-4xl` | `--text-display-m` |
| `:7` | shell | band tokens |
| `EventGalleryCard.tsx` (whole file) | byte-identical to `GalleryCard.tsx` | deleted |

##### 4.9 `/events`

| PageIntro | Value |
|---|---|
| crumbs | `Home` → `/` · `Events` (current) |
| eyebrow | `CALENDAR` |
| H1 | **What the SAC runs** |
| lead | **Tournaments, challenges and championships — the date, the venue, and what happened.** |
| meta | `{3} events` |
| actions | secondary **Event galleries** → `/gallery/events` |

H1 and lead are deliberately phase-neutral. On 2026-08-05 one event is today and two are past; from 2026-08-06 **all three are past**. No copy on this page may promise an upcoming event.

| Band | Canvas | Content | Data |
|---|---|---|---|
| 1 | `void` + `mesh-teal` `.35` | `PageIntro` | `mockEvents.length` |
| 2 | `abyss` | **Featured** editorial block, 2-col `lg`: `MediaFrame aspect-[4/3]` + text column. Eyebrow row = `FEATURED` + a phase chip from `getEventPhase` — `Today` (`--color-live`, pulse), `Upcoming` (`--color-volt`), `Past` (`--color-fg-faint`, border `--color-line`). Title `--text-display-l` `--color-cream`, body `--text-lead`, meta `formatDate(startDate)` · `venue`. Whole block is a `Link` with `display:block`. | `getFeaturedEvent()` → `interbits-football` |
| 3 | `void` | **Today at the SAC** — rendered only if `today.length > 0` | `getEventsByPhase().today` |
| 4 | `void` | **Coming up** — list, or `EmptyState` | `getEventsByPhase().upcoming` |
| 5 | `abyss` | **Already run** — newest first | `getEventsByPhase().past` |
| 6 | `NextStep` `void` | eyebrow `NEXT` · title **See how they looked** · links: Event galleries `/gallery/events`, Achievements `/achievements` | — |

De-duplication: bands 3–5 filter out the featured record — `list.filter(e => e.id !== featured?.id)`. That is the fix for `:84`, which mapped all of `mockEvents` and so printed the featured event twice. `fitness-challenge` is also `isFeatured: true` but appears only as an ordinary row; no list ever renders a "Featured" chip, so nothing looks inconsistent.

Row spec (bands 3–5): `<Link>` on `bg-deep`, border `--color-line`, `rounded-md`, `p-5 md:p-6`, hover `bg-raised` + border `--color-line-strong`. Left: date block `formatDate(startDate, "short")` split across two lines, `font-display tabular-nums` `--color-volt` for the day, `--text-eyebrow` `--color-fg-faint` for the month. Centre: title `--text-title` `--color-fg`, description `--text-body` `--color-fg-muted` clamped to 2 lines. Right: venue `--text-meta` `--color-fg-faint` with a `lucide MapPin`. Mobile: date block above title, venue below, single column.

`EmptyState` (band 4), the state the site will actually be in: title **Nothing scheduled past today** · body **The SAC has not published its next date. Everything already run is listed below.** · no action.

| file:line | Defect | Fix |
|---|---|---|
| `EventsPage.tsx:84` | `mockEvents.map` under a heading "Upcoming Events" — no date filter, no sort, and it re-renders the featured record | `getEventsByPhase()` + `id !== featured.id` |
| `:80` | heading claims "Upcoming" for past records | three phase-labelled bands |
| `:63,:110` | raw ISO `2026-06-12` printed to users | `formatDate` |
| `:34-37` | `<Link className="group overflow-hidden rounded-2xl …">` — inline element with `overflow-hidden` and a grid child | `block` link |
| `:43` | `h-full w-full object-cover` in an unratio'd grid cell → aspect depends on the text column's height | `MediaFrame aspect-[4/3]` |
| `:93-95` | every row carries a meaningless `Event` chip | phase chip, or nothing |
| `:12` | shell | band tokens |
| `:16` | `h1 text-5xl` | `--text-display-m` |
| — | no breadcrumb at all | `PageIntro` crumbs |

##### 4.10 `/events/:slug`

| PageIntro | Value |
|---|---|
| crumbs | `Home` → `/` · `Events` → `/events` · `{event.title}` (current) |
| eyebrow | phase from `getEventPhase`: `TODAY` / `UPCOMING` / `ALREADY RUN` |
| H1 | `{event.title}` |
| lead | `{event.description}` |
| meta | `{formatDate(startDate)}` · `{venue}` · `{n} frames` |
| actions | primary **Open gallery** → `/gallery/events/{slug}` (only when `n > 0`); secondary **All events** → `/events` |

| Band | Canvas | Content | Data |
|---|---|---|---|
| 1 | `void` + `mesh-teal` `.35` | `PageIntro` | `getEventBySlug(slug)` |
| 2 | `abyss` | Detail panel, 3 blocks: **Date** `formatDate(startDate)`, **Venue** `{venue}`, **Status** phase label + dot. Labels `--text-eyebrow` `--color-fg-faint`, values `--text-title` `--color-fg`. `endDate` is `undefined` on all three records — never render a date range, never call `formatRange` on dates. | `event` |
| 3 | `void` | Gallery strip: 3 tiles from `getGalleryFor("event", slug)`, `alt={caption}`, heading link **All {n} frames →** → `/gallery/events/{slug}` | `getGalleryFor` |
| 4 | `void` | `EmptyState` when strip empty — title **No frames yet** · body **Photos from this event have not been added.** | — |
| 5 | `NextStep` `abyss` | eyebrow `NEXT` · title **The rest of the calendar** · links: All events `/events`, Achievements `/achievements` | — |

| file:line | Defect | Fix |
|---|---|---|
| `EventDetailPage.tsx:61` | raw ISO `{event.startDate}` | `formatDate` |
| `:33-39` | "← Back to Events" link duplicating navigation the breadcrumb provides | breadcrumb only |
| `:46` | `h-[400px] object-cover` hero photo | `MediaFrame aspect-[16/9]` + `--color-void` scrim |
| `:50` | `h1 text-4xl` | `--text-display-m` |
| `:18-28` | not-found block, own shell, `h1 text-3xl`, no links out | `NotFoundPage kind="event"` |
| `:73` | `{gallery && …}` — no gallery renders nothing at all, silently | `EmptyState` |
| `:98` | `alt={image.caption}` is right, but `:44` `alt={event.title}` on a decorative hero | hero `alt=""`, `aria-hidden` |
| `:31` | shell | band tokens |

##### 4.11 `/people`

| PageIntro | Value |
|---|---|
| crumbs | `Home` → `/` · `People` (current) |
| eyebrow | `THE SAC` |
| H1 | **Who runs it** |
| lead | **Two faculty in-charges hold the Sports Activities Centre. The student committee runs the events on the ground.** |
| meta | `{getPeopleByRole("INCHARGE").length} faculty` · `{getPeopleByRole("COMMITTEE").length} students` |
| actions | none |

| Band | Canvas | Content | Data |
|---|---|---|---|
| 1 | `void` + `mesh-teal` `.35` | `PageIntro` | `getPeopleByRole` ×2 |
| 2 | `abyss` | Two role cards, `grid md:grid-cols-2 gap-6`, each a `Link`. `bg-deep`, border `--color-line`, `rounded-xl`, `p-8`. Eyebrow `FACULTY` / `STUDENTS`, title `--text-title` `--color-fg`, body `--text-body` `--color-fg-muted`, avatar row (`rounded-full`, 40px, `-ml-3` overlap, `photoUrl`, `alt={name}`), and a volt pill **View in-charges** / **View committee** with `ArrowRight` | `getPeopleByRole` |
| 3 | `NextStep` `void` | eyebrow `NEXT` · title **Or just write to the desk** · links: Contact `/contact` | — |

Card copy — in-charges: **Faculty who oversee the Sports Activities Centre.** Committee: **Student office-bearers who plan and run SAC events.**

| file:line | Defect | Fix |
|---|---|---|
| `PeoplePage.tsx:32-34,:50-52` | "View In-Charges →" is a `<p>` styled as a control | real pill inside the card `Link`, `min-h-[48px]` |
| `:8` | `h1 text-5xl` | `--text-display-m` |
| `:5` | shell | band tokens |
| — | no counts, no faces, card is pure text | avatar row + counts from data |

##### 4.12 / 4.13 `/people/incharges` and `/people/committee` — one file

```tsx
// src/pages/People/PeopleRolePage.tsx
import { useParams } from "react-router-dom";
import { getPeopleByRole } from "@/lib/content";

const ROLES = {
  incharges: {
    role: "INCHARGE" as const,
    eyebrow: "FACULTY",
    crumb: "In-charges",
    title: "SAC in-charges",
    lead: "The faculty who oversee the Sports Activities Centre. Both are reachable directly.",
    sibling: { label: "SAC committee", to: "/people/committee" },
  },
  committee: {
    role: "COMMITTEE" as const,
    eyebrow: "STUDENTS",
    crumb: "Committee",
    title: "SAC committee",
    lead: "Student office-bearers who plan and run SAC events. Their campus contacts are below.",
    sibling: { label: "SAC in-charges", to: "/people/incharges" },
  },
} as const;

const PeopleRolePage = () => {
  const { role } = useParams();
  const config = ROLES[role as keyof typeof ROLES];
  if (!config) return <NotFoundPage kind="people" />;
  const people = getPeopleByRole(config.role);
  /* … */
};
```

| PageIntro | `/people/incharges` | `/people/committee` |
|---|---|---|
| crumbs | Home · People → `/people` · In-charges | Home · People → `/people` · Committee |
| eyebrow | `FACULTY` | `STUDENTS` |
| H1 | **SAC in-charges** | **SAC committee** |
| lead | **The faculty who oversee the Sports Activities Centre. Both are reachable directly.** | **Student office-bearers who plan and run SAC events. Their campus contacts are below.** |
| meta | `{people.length} people` | `{people.length} people` |

| Band | Canvas | Content |
|---|---|---|
| 1 | `void` + `mesh-teal` `.35` | `PageIntro` |
| 2 | `abyss` | One grid for both roles: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`. Both roles have 2 records, so the `lg` row is deliberately short — the old per-page grid divergence (`InchargesPage.tsx:23` vs `CommitteePage.tsx:23`) is gone, not parameterised. |
| 3 | `abyss` | `EmptyState` when `people.length === 0` — title **No one listed** · body **This group has no published members.** |
| 4 | `NextStep` `void` | eyebrow `ALSO` · title `{config.sibling.label}` · links: sibling role, Contact `/contact` |

`PersonCard` corrections needed here (card spec owns the styling): `PersonCard.tsx:34` email and `:39` phone are inert text → `<a href={"mailto:" + email}>` and `<a href={"tel:" + phone.replace(/\s/g,"")}>`, `min-h-[48px]`, hover `--color-volt`; `:15` `h-72 object-cover` → `MediaFrame aspect-[4/5]`; `:23` `text-cyan-400` designation → `--color-cream-dim`; `:27` `department` is optional in the type and must be conditionally rendered.

| file:line | Defect | Fix |
|---|---|---|
| `InchargesPage.tsx` (36 lines) + `CommitteePage.tsx` (36 lines) | differ only in `:6` filter string and `:23` grid class | one `PeopleRolePage`; both URLs preserved by `/people/:role` |
| both `:13` | `h1 text-5xl` | `--text-display-m` |
| both `:10` | shell | band tokens |
| both | no breadcrumb, no cross-link, no empty branch | `PageIntro` + `NextStep` + `EmptyState` |
| `CommitteePage.tsx:19` | "planning, organizing, and managing" triple-gerund corporate copy | new lead |

##### 4.14 `/achievements`

| PageIntro | Value |
|---|---|
| crumbs | `Home` → `/` · `Achievements` (current) |
| eyebrow | `RESULTS` |
| H1 | **What the campus brought back** |
| lead | **Podium finishes by SAC students, from campus meets to national tournaments.** |
| meta | `{n} results` (live count, `tabular-nums`) |
| actions | none |

| Band | Canvas | Content | Data |
|---|---|---|---|
| 1 | `void` + `mesh-teal` `.35` | `PageIntro` | `mockAchievements.length` |
| 2 | `abyss` | Three `FilterRow`s, all labelled: **Level** (`All, National, State, Inter-NIT, Campus`), **Activity** (`All, Badminton, Basketball, Football, Gym, Swimming`), **Year** (`All, 2026, 2025, 2024`). Bound to `?level=&activity=&year=` via `useSearchParams`. Result line: **{n} of 5 results** `--text-meta` `--color-fg-faint` | `getAchievementFilters()` |
| 3 | `abyss` | grid `sm:grid-cols-2 lg:grid-cols-3 gap-6` of `AchievementCard`, sorted newest first | `getAchievements({level,activity,year})` |
| 4 | `abyss` | `EmptyState` when 0 | — |
| 5 | `NextStep` `void` | eyebrow `NEXT` · title **Where they train** · links: Activities `/activities`, Events `/events` | — |

`EmptyState` copy: title **No results match those filters** · body **Try a wider level or year — there are five results in total.** · action **Clear filters** (a real button that clears the search params).

This is the one page where the empty state is reachable today: e.g. `?level=Campus&year=2025` → 0, `?activity=Football&level=State` → 0.

`AchievementCard` — typographic, no image. `imageUrl` is optional on the type and populated on **zero** records, so the card must never reserve or render an image slot.

| Slot | Content | Type | Color |
|---|---|---|---|
| level | `{level}` | `--text-eyebrow` uppercase `tracking-[0.2em]` | `--color-volt` |
| title | `{title}` | `--text-title` | `--color-fg` |
| student | `{studentName}` | `--text-body` | `--color-fg-muted` |
| activity | `{activityName}` | `--text-meta` | `--color-fg-faint` |
| date | `formatDate(achievedAt)` | `--text-meta tabular-nums` | `--color-fg-faint` |
| surface | — | `bg-deep`, border `--color-line`, `rounded-lg`, `p-6`, hairline `--color-line-volt` at the top edge | — |

| file:line | Defect | Fix |
|---|---|---|
| `AchievementsPage.tsx:88-101` | level filter row has **no label** while Activity (`:104`) and Year (`:127`) do | `FilterRow` with a mandatory `<legend>` |
| `:149-156` | filter combinations render a bare grid → blank page | `EmptyState` + working reset |
| `:34-44` | years derived in data order → `2025, 2024, 2026` | `.sort().reverse()` in `getAchievementFilters` |
| `:93-96` | `bg-cyan-400 text-black` selected chip | `bg-volt text-ink` |
| `:78` | `h1 text-5xl` | `--text-display-m` |
| `:75` | shell | band tokens |
| `:7-13` | three `useState`s, filters not shareable | `useSearchParams` |
| `AchievementCard.tsx:31` | raw ISO `2025-10-12` | `formatDate` |
| `AchievementCard.tsx:13` | cyan pill for level | volt eyebrow, no pill |

##### 4.15 `/contact`

| PageIntro | Value |
|---|---|
| crumbs | `Home` → `/` · `Contact` (current) |
| eyebrow | `GET IN TOUCH` |
| H1 | **Talk to the SAC** |
| lead | **Facility questions, event queries, or anything this site does not answer. Phone, mail and the office address all work below.** |
| meta | none |
| note | **The message form is a demo. It opens your mail client instead of sending — the SAC has no message backend.** |
| actions | none |

```
┌──────────────────────────────────────────────────────────────────────────┐
│ BAND 1  void + mesh-teal .35   PageIntro + demo note                    │
├──────────────────────────────────────────────────────────────────────────┤
│ BAND 2  abyss                lg: 7 cols / 5 cols                        │
│ ┌─ <form> ─────────────────────────┐  ┌─ Direct channels ─────────────┐ │
│ │ Name                             │  │ ADDRESS                       │ │
│ │ ┌──────────────────────────────┐ │  │ Sports Activities Centre      │ │
│ │ └──────────────────────────────┘ │  │ BITS Pilani, Goa Campus       │ │
│ │ Email                            │  │ Zuarinagar, Goa               │ │
│ │ ┌──────────────────────────────┐ │  │ ─────────────────────────────  │ │
│ │ └──────────────────────────────┘ │  │ PHONE                         │ │
│ │ Message                          │  │ +91 832 258 0000        ↗tel  │ │
│ │ ┌──────────────────────────────┐ │  │ ─────────────────────────────  │ │
│ │ │                              │ │  │ MAIL                          │ │
│ │ └──────────────────────────────┘ │  │ sac@goa.bits-pilani.ac.in ↗   │ │
│ │ ┌────────────────┐               │  └───────────────────────────────┘ │
│ │ │ Open in mail   │  demo         │                                    │
│ │ └────────────────┘               │                                    │
│ └──────────────────────────────────┘                                    │
├──────────────────────────────────────────────────────────────────────────┤
│ BAND 3  void   Who to ask   → In-charges /people/incharges              │
│                             → Committee  /people/committee              │
└──────────────────────────────────────────────────────────────────────────┘
```

```tsx
// src/pages/ContactPage.tsx — the whole interaction. No form library, no per-field state,
// no fake network. Native constraint validation does the work.
const SAC_EMAIL = "sac@goa.bits-pilani.ac.in"; // from the existing page, real
const [sent, setSent] = useState(false);

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // never navigates; there is no endpoint
  const f = new FormData(e.currentTarget);
  const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
  window.location.href =
    `mailto:${SAC_EMAIL}?subject=${encodeURIComponent("SAC website enquiry")}&body=${encodeURIComponent(body)}`;
  setSent(true); // renders the honest confirmation panel
};
```

Field spec — `<form onSubmit={onSubmit} noValidate={false}>`:

| Field | `name` | Element | Validation | Label |
|---|---|---|---|---|
| Name | `name` | `<input type="text">` | `required maxLength={80}` | `<label htmlFor="c-name">Name</label>` |
| Email | `email` | `<input type="email" inputMode="email" autoComplete="email">` | `required` | `<label htmlFor="c-email">Email</label>` |
| Message | `message` | `<textarea rows={6}>` | `required minLength={20}` | `<label htmlFor="c-message">Message</label>` |

Labels are visible, above the field, `--text-meta` `--color-fg-muted`. Inputs: `bg-void`, border `--color-line`, `rounded-sm`, `h-12` (textarea `min-h-[9rem]`), text `--color-fg`, placeholder `--color-fg-faint`, focus = global volt ring. `:invalid:not(:placeholder-shown)` gets border `--color-line-volt` and a `--text-meta` `--color-cream-dim` hint below. Submit: volt pill, `h-12`, label **Open in mail**, with a `--text-meta` `--color-fg-faint` sibling reading **Nothing is sent from this page.**

Confirmation panel (`sent === true`), replacing the button row, `role="status"`: title **Your mail client should be open** · body **If it did not open, write to sac@goa.bits-pilani.ac.in directly.** with the address as a `mailto:` link. Nothing claims delivery.

Direct-channel panel: `<address className="not-italic">` for the postal lines (`--color-fg-muted`), phone as `<a href="tel:+918322580000">`, mail as `<a href={"mailto:" + SAC_EMAIL}>`, both `min-h-[48px]`, `--color-fg` with volt underline on hover, trailing `lucide ArrowUpRight` at 14px. Dividers `--color-line`.

Band 3 "Who to ask": two rows linking `/people/incharges` and `/people/committee`, each with the count from `getPeopleByRole`. Copy: **Faculty in-charges** — *approvals and facility questions*; **Student committee** — *events and day-to-day*.

| file:line | Defect | Fix |
|---|---|---|
| `ContactPage.tsx:30-49` | a `<div>` holds the fields — **zero `<form>` elements exist anywhere in `src/`** | real `<form onSubmit>`; Enter submits; native validation |
| `:31-44` | three unlabelled, uncontrolled inputs (placeholder-as-label) | visible `<label htmlFor>` on all three |
| `:46-48` | "Send Message" `<Button>` with no `onClick`, no `type` | `type="submit"` + the `mailto` handler + demo disclosure |
| `:67-73` | address is inert text | `<address>` |
| `:85-87` | phone is inert text | `tel:` link |
| `:99-101` | email is inert text | `mailto:` link |
| `:111-115` | three `href="#"` socials (Instagram, Facebook, LinkedIn) | **deleted** — no real URLs exist and none may be invented |
| `:12` | `h1 text-5xl` | `--text-display-m` |
| `:9` | shell | band tokens |
| `:60,:78,:92` | cyan icons | `--color-volt` at 16px, `aria-hidden` |

##### 4.16 `*` — `NotFoundPage` (new)

Serves the catch-all **and** the five bad-slug branches, so five hand-rolled not-found blocks disappear.

```tsx
// src/pages/NotFoundPage.tsx
type Kind = "route" | "activity" | "event" | "people";
const COPY: Record<Kind, { crumb?: { label: string; to: string }; title: string; lead: string }> = {
  route:    { title: "This page is not on the map",
              lead: "The link you followed does not match anything on the SAC site." },
  activity: { crumb: { label: "Activities", to: "/activities" },
              title: "No such activity",
              lead: "The SAC runs five activities and this is not one of them." },
  event:    { crumb: { label: "Events", to: "/events" },
              title: "No such event",
              lead: "That event is not in the SAC calendar." },
  people:   { crumb: { label: "People", to: "/people" },
              title: "No such group",
              lead: "The SAC lists faculty in-charges and the student committee." },
};
const NotFoundPage = ({ kind = "route" }: { kind?: Kind }) => { /* … */ };
```

| PageIntro | Value |
|---|---|
| crumbs | `Home` → `/` (+ the kind's parent crumb when present) · `Not found` (current) |
| eyebrow | `404` |
| H1 | per `COPY[kind].title` |
| lead | per `COPY[kind].lead` + **Everything the site does have is listed below.** |
| actions | primary **Back to home** → `/` |

| Band | Canvas | Content |
|---|---|---|
| 1 | `void` + `mesh-volt` `.25` | `PageIntro` |
| 2 | `abyss` | Full sitemap as one list: Activities, Events, Galleries, Event galleries, People, Achievements, Stats, Contact. Rows `min-h-[56px]`, divider `--color-line`, label `--text-title` `--color-fg`, hover `--color-volt`, trailing `ArrowRight` |

SPA caveat, stated for the implementer: this renders a 404 *page*, not a 404 *status*. Real status codes need hosting-level config and are out of scope.

| file:line | Defect | Fix |
|---|---|---|
| `routes/index.tsx:21-55` | no catch-all — `/typo` renders an empty `<main>` between navbar and footer | `<Route path="*">` |
| `FloatingActionButton.tsx:15` | FAB links to `/report`, which has no route → blank page | FAB link removed (layout chapter) **and** `/report` → `<Navigate to="/contact" replace />` as belt-and-braces |
| `ActivityDetailPage.tsx:12-18`, `EventDetailPage.tsx:18-28`, `ActivityGalleryPage.tsx:28-42`, `EventGalleryPage.tsx:28-42` | four bespoke not-found blocks, three different H1 sizes, no links out | one `NotFoundPage` with `kind` |

---

#### 5. `GalleryLightbox` — full spec (replaces `GalleryImageDialog.tsx`, all five defects)

| # | Defect in `GalleryImageDialog.tsx` | Fix |
|---|---|---|
| 1 | no `DialogTitle` / `DialogDescription` — Radix logs `DialogContent requires a DialogTitle` and AT announces an unlabelled dialog | `DialogTitle` = collection title, `DialogDescription` = "Frame {i} of {n} — {caption}" |
| 2 | tracks `{imageUrl, caption}` (`:9-11`), no index | takes `images: {id,imageUrl,caption}[]` + `index: number` |
| 3 | no prev/next of any kind | buttons + `ArrowLeft`/`ArrowRight` keys, wrap-around, counter |
| 4 | `object-cover` on the full-size image (`:25`) — crops the very thing the user opened | `object-contain`, `max-h-[78svh]`, `w-auto`, letterbox on `--color-void` |
| 5 | `open={true}` literal with the whole `<Dialog>` conditionally mounted (`ActivityGalleryPage.tsx:46-53`) — Radix never runs close animation or focus return | `open` is real state; Dialog is always mounted; index stays valid through the exit frame |

```tsx
// src/components/gallery/GalleryLightbox.tsx
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export interface LightboxImage { id: number; imageUrl: string; caption: string }

interface GalleryLightboxProps {
  images: LightboxImage[];
  index: number;                       // always valid — never null
  open: boolean;                       // separate from index, so the exit frame still has an image
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
  collectionTitle: string;             // "Basketball" | "Swimming Championship"
}

const GalleryLightbox = ({
  images, index, open, onOpenChange, onIndexChange, collectionTitle,
}: GalleryLightboxProps) => {
  const count = images.length;
  const image = images[index];
  const step = useCallback((d: 1 | -1) => onIndexChange((index + d + count) % count), [index, count, onIndexChange]);

  useEffect(() => {
    if (!open || count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); step(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, count, step]);

  if (!image) return null; // empty collection: the page shows EmptyState instead

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[min(96vw,1120px)] gap-4 border-line-strong bg-deep p-4 sm:p-6 rounded-xl"
        aria-describedby="lightbox-desc"
      >
        <DialogTitle className="text-eyebrow uppercase tracking-[0.2em] text-volt">
          {collectionTitle}
        </DialogTitle>

        <figure className="grid gap-3">
          <div className="flex items-center justify-center rounded-md bg-void">
            <img
              src={image.imageUrl}
              alt={image.caption}
              className="max-h-[78svh] w-auto max-w-full object-contain"
              loading="eager"
              decoding="async"
            />
          </div>
          <figcaption className="flex items-baseline justify-between gap-4">
            <DialogDescription id="lightbox-desc" className="text-body text-fg-muted">
              {image.caption}
            </DialogDescription>
            <span className="text-meta tabular-nums text-fg-faint" aria-hidden="true">
              {index + 1} / {count}
            </span>
          </figcaption>
        </figure>

        {count > 1 && (
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => step(-1)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-meta text-fg hover:bg-raised">
              <ChevronLeft className="size-4" aria-hidden="true" /> Previous
            </button>
            <button type="button" onClick={() => step(1)}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-meta text-fg hover:bg-raised">
              Next <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default GalleryLightbox;
```

Call site (in `GalleryDetailPage`), the shape that fixes defect 5:

```tsx
const [open, setOpen] = useState(false);
const [index, setIndex] = useState(0);   // two states, no ref, no blank exit frame
// tile: onClick={() => { setIndex(i); setOpen(true); }}
<GalleryLightbox images={images} index={index} open={open}
  onOpenChange={setOpen} onIndexChange={setIndex} collectionTitle={title} />
```

Behaviour contract:

| Concern | Behaviour |
|---|---|
| Focus trap, `Esc`, background scroll lock, focus return to the triggering tile | Radix `Dialog` — works only because the Dialog is never conditionally unmounted |
| Close animation | `data-closed:` classes already in `dialog.tsx:62`; fires now that `open` transitions instead of unmounting |
| Close control | `dialog.tsx:68-79` built-in X, resized to `min-h-12 min-w-12`, `sr-only` "Close" already present |
| Overlay | `dialog.tsx:40` `bg-black/30` → `bg-void/80` with `supports-backdrop-filter:backdrop-blur-sm` (raw `black` is off-palette) |
| Motion | opacity + `scale(0.97→1)`, `--dur-std`, `--ease-out-quint`; frame swap on step is opacity-only `--dur-fast`. `prefers-reduced-motion: reduce` → opacity only, no scale, `--dur-fast` |
| Wrap-around | `(index ± 1 + count) % count`; with `count === 1` the nav row is not rendered at all |
| Single-image sets | no nav, no counter, arrow keys inert |
| Image error | `onError` → `MediaFrame` fallback: `bg-raised`, `--text-meta` `--color-fg-faint`, copy **Image unavailable** |
| Deep-linking a frame | skipped. Add `?i=` when someone actually needs to share a single frame; filters got URL state because they change what the page *is*, a lightbox does not. |
| Swipe gestures | skipped. Prev/Next buttons are 48px and thumb-reachable; add a gesture only if usage says so. |

---

#### 6. Motion, per route — every entry names a duration, an easing, and a reduced-motion behaviour

GSAP appears on **no** detail route. `#focus` and `#impact` on `/` are its only two scenes. Everything below is `motion/react`.

| Where | Element | Animation | Duration | Easing | `prefers-reduced-motion: reduce` |
|---|---|---|---|---|---|
| all routes | `PageIntro` eyebrow → h1 → lead → meta | opacity 0→1, y `var(--reveal-y)`→0, stagger 60ms | `--dur-slow` | `--ease-out-quint` | renders final state, no transform, no opacity tween |
| all routes | band on scroll-in (`Reveal`, `whileInView`, `once`, margin `-10%`) | opacity 0→1, y `var(--reveal-y)`→0 | `--dur-std` | `--ease-out-quint` | final state immediately |
| all grids | cards, index-staggered 50ms, capped at 6 items | opacity + y | `--dur-std` | `--ease-out-quint` | no stagger, all visible |
| all cards | hover (pointer only, `@media (hover:hover)`) | y `-var(--lift)`, surface `deep→raised`, border `line→line-strong` | `--dur-fast` | `--ease-out-quint` | no transform; surface/border change only |
| `/activities`, `/achievements` | filter chip select | background/text token swap; `layoutId` underline on the active chip | `--dur-fast` | `--ease-out-quint` | instant swap, no `layoutId` |
| `/activities`, `/achievements` | grid re-flow after filter | `AnimatePresence` `popLayout`, exit opacity→0 scale 0.98 | `--dur-fast` | `--ease-in-out-quart` | no exit animation, list swaps |
| `/activities/:slug` | "Open now" dot | 2-step opacity pulse, infinite, paused offscreen via `IntersectionObserver` | `--dur-slow` | `--ease-in-out-quart` | static dot, no pulse |
| `/events` | phase chip "Today" | same pulse rule | `--dur-slow` | `--ease-in-out-quart` | static |
| `/stats` | stat numerals | opacity + y on first in-view only; **no count-up** (no per-frame React state allowed) | `--dur-std` | `--ease-out-quint` | final value |
| `/stats` | bar/area chart draw | Recharts `isAnimationActive`, `animationDuration` = 420 (`--dur-std` value) | `--dur-std` | Recharts `ease-out` | `isAnimationActive={false}` |
| `/stats` | sort toggle re-order | `layout` on each bar row | `--dur-std` | `--ease-in-out-quart` | `layout={false}` |
| gallery grids | tile press | scale 0.98 `whileTap` | `--dur-fast` | `--ease-out-quint` | none |
| lightbox | open/close | opacity + scale 0.97→1 | `--dur-std` | `--ease-out-quint` | opacity only, `--dur-fast` |
| lightbox | frame step | opacity crossfade | `--dur-fast` | `--ease-out-quint` | instant swap |
| `/contact` | confirmation panel | opacity + y, `role="status"` | `--dur-std` | `--ease-out-quint` | instant |
| `NextStep` | link row hover | underline scaleX 0→1 from left | `--dur-fast` | `--ease-out-quint` | underline appears instantly |

---

#### 7. Acceptance checklist for this chapter

- [ ] `grep -r "min-h-screen bg-\[#" src/pages` → 0 hits.
- [ ] `grep -rE "#[0-9a-fA-F]{6}" src/pages src/components` → 0 hits.
- [ ] Exactly one `<h1>` per route; exactly one `--text-display-xl` in the codebase (home hero); every other route H1 is `--text-display-m`.
- [ ] `grep -rn "\.find(" src/pages` → 0 hits (all lookups via `src/lib/content.ts`).
- [ ] `grep -rnE "startDate|achievedAt|openTime|closeTime" src/pages src/components/cards` → every hit is wrapped in a `format*` call.
- [ ] `grep -rn 'href="#"' src` → 0 hits.
- [ ] Every `<button>` in `src/pages` has an `onClick` or `type="submit"`; every `<a>`/`<Link>` has a resolvable target.
- [ ] `/typo`, `/activities/typo`, `/events/typo`, `/gallery/typo`, `/gallery/events/typo`, `/people/typo` all render `NotFoundPage` with a working way out.
- [ ] `/achievements?level=Campus&year=2025` renders `EmptyState` with a working **Clear filters**.
- [ ] `/events` on any date ≥ 2026-08-06 renders "Coming up" as an `EmptyState` and never labels a past record upcoming.
- [ ] Lightbox: `Esc` closes, focus returns to the triggering tile, arrow keys step, no Radix a11y warning in console, image is never cropped.
- [ ] `/contact` form: submitting with an empty message shows the browser's native validation and does not navigate; submitting a valid form opens `mailto:` and shows the demo panel.
- [ ] Volt coverage ≤10% of viewport on `/stats` (5 numerals + 1 bar + 1 eyebrow + focus ring), the densest page.

---

## Part 7 — Build plan

The file manifest, the dependency add/remove ledger, the asset pipeline, and the slice order to build in.

---

### File manifest, dependency plan, asset pipeline, slices

#### Measured baseline (verify deltas against these)

| Metric | Value | How measured |
|---|---|---|
| src files | **58** (brief said 57; `index.css` is the 58th) | `find src -type f \| wc -l` |
| src LOC | 4,239 | `find src -type f \| xargs wc -l` |
| `dist/assets/index-*.js` | 762,375 raw / 221,636 gz | `gzip -c9` |
| `dist/assets/index-*.css` | 73,252 raw / 12,214 gz | `gzip -c9` |
| font files in `dist/assets` | 24 files, ~438 KB (both `@fontsource/inter` static **and** `@fontsource-variable/inter` ship) | `ls -la dist/assets` |
| `dist/` total | 3.8 MB (2.67 MB of it is `public/*.png` copied verbatim) | `du -sh dist` |
| `node_modules` | 360 MB | `du -sh node_modules` |
| `tsc -b` | **2 errors** (`main.tsx:4` TS2882, `HomePage.tsx:1` TS6133) | reproduced |
| `eslint .` | **3 errors** (`badge.tsx:49`, `button.tsx:65`, `navigation-menu.tsx:163`) | reproduced |
| bare Unsplash refs | 36 references / 20 unique photo ids / **0** carry query params | `grep -rho 'photo-[A-Za-z0-9_-]*' src \| sort -u` |
| toolchain present | node v26.5.1, npm 12.0.2, ImageMagick 7.1.2-29 (libwebp 1.6.0). **`cwebp` and `sharp` are NOT installed** | `which cwebp sharp; magick -version` |

Judgement call: the pipeline uses `magick` because it is already on the box — installing `cwebp` or `sharp-cli` to do what an installed binary does is a dependency for nothing.

---

#### 1. FILE MANIFEST

##### 1.1 Existing `src/` — all 58 files

| # | File | Action | Reason | Slice |
|---|---|---|---|---|
| 1 | `src/main.tsx` | MODIFY | Drop `@fontsource/inter` side-effect import (TS2882) and the whole `QueryClient`/`QueryClientProvider` pair — zero `useQuery` calls exist in src. Ends as `StrictMode > BrowserRouter > App`. | 0, 1 |
| 2 | `src/App.tsx` | MODIFY | Keep the 11-line shell. Only change is the anchor-scroll effect for `/#focus` style deep links landing from another route. | 6 |
| 3 | `src/index.css` | MODIFY | Full rewrite: `@theme` token block, the nine inlined `@custom-variant` rules, three `@utility` mesh recipes, `body::after` grain, global focus ring, two self-hosted `@font-face` declarations. Drops `@import "shadcn/tailwind.css"`, `@import "tw-animate-css"`, `@import "@fontsource-variable/inter"`, and the `background-color: white` body rule. | 2 |
| 4 | `src/routes/index.tsx` | MODIFY | Collapse 15 routes to 12: gallery becomes `/gallery/:kind/:slug`, people loses its two child routes, add `*` → `NotFoundPage`. Lazy-load `StatsPage` only (it owns recharts). | 6 |
| 5 | `src/lib/utils.ts` | KEEP | `cn()` is correct and used by every `ui/` primitive. Zero diff. | — |
| 6 | `src/store/authStore.ts` | DELETE | Zero importers; the only zustand consumer in the repo. No auth in scope. | 1 |
| 7 | `src/types/auth.types.ts` | DELETE | **File is 0 bytes** — `authStore.ts:2` imports a `UserRole` that does not exist. Dies with its only importer. | 1 |
| 8 | `src/types/achievement.types.ts` | KEEP | Correct as written, matches mock records. | — |
| 9 | `src/types/activity.types.ts` | KEEP | `ActivityTiming` is reused by the new selectors. | — |
| 10 | `src/types/event.types.ts` | KEEP | Same. | — |
| 11 | `src/types/person.types.ts` | KEEP | `PersonRole` union drives `getPeopleByRole`. | — |
| 12 | `src/mock/mockActivities.ts` | KEEP | Ground truth, byte-for-byte. Bare Unsplash URLs are fixed at render, not at rest (§3.5). | — |
| 13 | `src/mock/mockEvents.ts` | KEEP | Ground truth. | — |
| 14 | `src/mock/mockPeople.ts` | KEEP | Ground truth. | — |
| 15 | `src/mock/mockAchievements.ts` | KEEP | Ground truth. `imageUrl` is populated on zero records — consumers must be image-free. | — |
| 16 | `src/mock/mockGallery.ts` | KEEP | Ground truth, 5 groups × 3. | — |
| 17 | `src/mock/mockEventGallery.ts` | KEEP | Ground truth, 3 groups × 3. | — |
| 18 | `src/mock/mockStats.ts` | KEEP | Ground truth **including** `categoryData`'s `Recreation: 15`. That row is a chart label, not an activity category — the fix belongs in the activities filter (row 43), not here. `trendData` has 11 points (no December); the chart must label the axis `Jan–Nov`, never imply 12. | — |
| 19 | `src/components/layout/Navbar.tsx` | MODIFY | Rewrite in place (renaming costs 1 import edit for zero gain): anchor nav on `/`, route links elsewhere, `--color-volt` active underline, IntersectionObserver scroll-spy inlined here, transparent-over-hero → `--color-abyss` + `--color-line` after 64px. Loses `bg-[#050816]/95`. | 6 |
| 20 | `src/components/layout/Footer.tsx` | MODIFY | Retoken; fix the name — the site is the **Student Activity Centre**, the current footer says "Sports Activities Centre". Sitemap + `mailto:sac@goa.bits-pilani.ac.in` (already in `ContactPage.tsx:100`). No social links: no real URLs exist. | 6 |
| 21 | `src/components/layout/MainLayout.tsx` | MODIFY | Drop `bg-white`, drop `<FloatingActionButton />`, add a skip link to `#main` and `id="main"` on `<main>`. | 6 |
| 22 | `src/components/layout/FloatingActionButton.tsx` | DELETE | Links to `/report`, which **is not a route** — a guaranteed 404 and a dead CTA. A fixed pill also fights an editorial layout. Contact lives in nav, footer and `JoinCta`. | 1 |
| 23 | `src/components/cards/GalleryCard.tsx` | MODIFY | Absorbs `EventGalleryCard` via a `kind: "activities" \| "events"` prop that builds the `to`. Retoken, wrap image in `MediaFrame`. | C |
| 24 | `src/components/cards/EventGalleryCard.tsx` | CONSOLIDATE → `GalleryCard.tsx` | Byte-identical to `GalleryCard` except the `to` prefix. Two files, one component. | C |
| 25 | `src/components/cards/PersonCard.tsx` | MODIFY | Retoken; portrait into a fixed 4:5 `MediaFrame`; `h-72` hard height removed. Email/phone become real `mailto:`/`tel:` links. | D |
| 26 | `src/components/cards/AchievementCard.tsx` | MODIFY | Currently prints `achievement.achievedAt` as a **raw ISO string** — route through `formatDate`. Level becomes an eyebrow, `--color-win` reserved for the National row only. No image (zero records have one). | D |
| 27 | `src/components/charts/ActivityBarChart.tsx` | MODIFY | Retoken (`fill="var(--color-teal-500)"`), axis stroke `var(--color-line-strong)`, tick fill `var(--color-fg-faint)`, one series, `radius={[6,6,0,0]}` to match `--radius-xs`. Replaces default `<Tooltip />` with a tokened one. | B |
| 28 | `src/components/charts/ActivityTrendChart.tsx` | MODIFY | Same treatment; axis must read `Jan–Nov` (11 records). | B |
| 29 | `src/components/charts/ParticipationPieChart.tsx` | MODIFY | Same; 3 slices → `--color-teal-700 / --color-teal-500 / --color-teal-300`, labels rendered as text, not colour-only. | B |
| 30 | `src/components/ui/button.tsx` | MODIFY | **Stop exporting `buttonVariants`** — that single export is `eslint` error 2 of 3, and nothing outside this file imports it (verified). Then retoken the cva variants (`volt` primary, `ghost`, `outline`). | 0, 5 |
| 31 | `src/components/ui/badge.tsx` | DELETE | Zero importers **and** `eslint` error 1 of 3. Deleting fixes the lint error with a negative diff. The rebuild's tags/eyebrows are one tokened `<span>`. | 0 |
| 32 | `src/components/ui/navigation-menu.tsx` | DELETE | Zero importers **and** `eslint` error 3 of 3. Desktop nav is anchor links, not a menubar. | 0 |
| 33 | `src/components/ui/dialog.tsx` | MODIFY | Retoken the overlay/content surface; used by the gallery lightbox. Overlay uses a solid `--color-void` scrim at opacity, never rgba literals. | C |
| 34 | `src/components/ui/sheet.tsx` | MODIFY | Retoken; mobile nav drawer. Touch targets ≥48px. | 6 |
| 35 | `src/components/ui/input.tsx` | MODIFY | Retoken (`--color-deep` field, `--color-line` border, volt focus ring). | D |
| 36 | `src/components/ui/textarea.tsx` | MODIFY | Same. | D |
| 37 | `src/components/ui/card.tsx` | DELETE | Unimported today, and the rebuild's surfaces are bespoke (`--color-deep` → `--color-raised` on hover, `--radius-lg`). A 100-line 6-slot wrapper earns nothing. | F |
| 38 | `src/components/ui/avatar.tsx` | DELETE | Unimported; portraits go through `MediaFrame` at a fixed ratio. | F |
| 39 | `src/components/ui/dropdown-menu.tsx` | DELETE | 267 lines, unimported, no dropdown in the IA. | F |
| 40 | `src/components/ui/separator.tsx` | DELETE | Unimported; a rule is `border-t border-line`. | F |
| 41 | `src/components/ui/tooltip.tsx` | DELETE | Unimported, and hover-only meaning is banned by the mobile rule — chart values get inline labels instead. | F |
| 42 | `src/pages/HomePage.tsx` | MODIFY | Delete `import React` (TS6133) in slice 0, then full rewrite in 7–D. Current file is 100% hardcoded fiction: **"Snooker" and "Table Tennis" tagged `Recreation`** (neither exists in `mockActivities`), three fake 2025 events, and `../1-78.jpg.png` style asset paths. Becomes a pure composition of 10 `sections/*`. | 0, 7–D |
| 43 | `src/pages/Activities/ActivitiesPage.tsx` | MODIFY | Root-cause fix: `categories` is hardcoded at lines 7–12 and includes `"Recreation"`, a chip that filters to **zero** records. Replace with `getActivityCategories()`. Filter state moves to a `?category=` URL param via `FilterChips`. | 8 |
| 44 | `src/pages/Activities/ActivityCard.tsx` | CONSOLIDATE → `src/components/cards/ActivityCard.tsx` | A card living under `pages/` cannot be reused by the homepage rail. Moves and gains a `variant: "feature" \| "compact"`. | 8 |
| 45 | `src/pages/Activities/ActivityDetailPage.tsx` | MODIFY | Use `getActivityBySlug`, `formatRange` for timings, `MediaFrame` cover, add a not-found branch. | 8 |
| 46 | `src/pages/Events/EventsPage.tsx` | MODIFY | Split upcoming/past via `getUpcomingEvents`. See slice 9 date trap. | 9 |
| 47 | `src/pages/Events/EventDetailPage.tsx` | MODIFY | `getEventBySlug` + `getGalleryFor("events", slug)`; `formatDate`; no `endDate` exists on any record so the range UI must degrade to a single date. | 9 |
| 48 | `src/pages/Gallery/GalleryPage.tsx` | MODIFY | Hub for both kinds: activity albums (5) + event albums (3), tabbed by `?kind=`. Absorbs `EventGalleryHubPage`. | C |
| 49 | `src/pages/Gallery/ActivityGalleryPage.tsx` | CONSOLIDATE → `src/pages/Gallery/AlbumPage.tsx` | One album page for both kinds; `kind` comes from the route. Two 132/137-line near-duplicates become one. | C |
| 50 | `src/pages/Gallery/EventGalleryPage.tsx` | DELETE | Folded into `AlbumPage`. | C |
| 51 | `src/pages/Gallery/EventGalleryHubPage.tsx` | DELETE | Folded into `GalleryPage` tabs. | C |
| 52 | `src/pages/Gallery/GalleryImageDialog.tsx` | MODIFY | Keep the path — both consumers are siblings. Retoken, add caption/index, arrow-key nav, `MediaFrame`. | C |
| 53 | `src/pages/People/PeoplePage.tsx` | MODIFY | Currently a two-link menu to two pages holding 2 records each. Becomes the single People page with `#incharges` and `#committee` blocks from `getPeopleByRole`. | D |
| 54 | `src/pages/People/InchargesPage.tsx` | DELETE | A whole route for 2 records behind a click. | D |
| 55 | `src/pages/People/CommitteePage.tsx` | DELETE | Same, 2 records. | D |
| 56 | `src/pages/AchievementsPage.tsx` | MODIFY | `getAchievementFilters` for the level chips, `formatDate` for `achievedAt`, editorial timeline. | D |
| 57 | `src/pages/ContactPage.tsx` | MODIFY | Three `href="#"` social links (lines 112–114) are dead CTAs — **deleted**, not restyled. The form has no `onSubmit`: it becomes a labelled `mailto:` composer with a "Demo form — no backend" note if a form is kept. | D |
| 58 | `src/pages/Stats/StatsPage.tsx` | MODIFY | Retoken, breadcrumb `Home > Stats > Overview` becomes real links, `MockTag` on every card (a user cannot tell "1,248+" is invented), lazy-loaded route so recharts leaves the entry chunk. | B |

##### 1.2 New `src/` files — 23

| File | Action | Reason | Slice |
|---|---|---|---|
| `src/lib/format.ts` | CREATE | `formatDate`, `formatTime`, `formatRange` over `Intl.DateTimeFormat` — no date library. Kills every raw ISO string. | 4 |
| `src/lib/content.ts` | CREATE | The nine selectors. Stops `.find()` duplication across 12 pages. | 4 |
| `src/lib/motion.ts` | CREATE | Exported duration/easing constants mirroring `--dur-*` / `--ease-*`, plus shared `revealVariants`, `staggerParent`, `railVariants`. Single source so no component invents a ms value. | 5 |
| `src/components/primitives/Section.tsx` | CREATE | `--space-section` + `--container` + `--gutter` + `id` anchor + eyebrow/title/lead slots. Used 10× on the homepage alone. | 5 |
| `src/components/primitives/Reveal.tsx` | CREATE | The only `whileInView` wrapper in the codebase; owns the `prefers-reduced-motion` branch once. | 5 |
| `src/components/primitives/MediaFrame.tsx` | CREATE | Fixed-ratio frame + tonal scrim + `loading`/`decoding` + `alt` requirement + **the Unsplash query-param injection (§3.5)**. The single place an `<img>` may exist. | 5 |
| `src/components/primitives/Stat.tsx` | CREATE | `font-display tabular-nums` numeral + label + delta. Used in `PulseStrip`, `ImpactScene`, `StatsPage`. | 5 |
| `src/components/primitives/FilterChips.tsx` | CREATE | Chip row backed by a URL search param. Used by activities, achievements, gallery. | 5 |
| `src/components/primitives/MockTag.tsx` | CREATE | The "Sample data" marker required by the locked decision. | 5 |
| `src/components/cards/ActivityCard.tsx` | CREATE (moved) | See row 44. | 8 |
| `src/components/cards/EventCard.tsx` | CREATE | Used by `EventsPage`, `FeaturedEvent`, and the pulse strip's next-event slot. | 9 |
| `src/components/sections/Hero.tsx` | CREATE | `--text-display-xl` H1, the only one on the site. | 7 |
| `src/components/sections/PulseStrip.tsx` | CREATE | `getOpenActivitiesNow` + next event + one metric; live dot. | 7 |
| `src/components/sections/FocusScene.tsx` | CREATE | **GSAP flagship #1** — `#focus`, pinned. Only file besides `ImpactScene` allowed to import gsap. | A |
| `src/components/sections/ActivitiesRail.tsx` | CREATE | `#activities`. | 8 |
| `src/components/sections/FeaturedEvent.tsx` | CREATE | `#events`, from `getFeaturedEvent`. | 9 |
| `src/components/sections/PeoplePreview.tsx` | CREATE | `#people`, 4 records. | D |
| `src/components/sections/ImpactScene.tsx` | CREATE | **GSAP flagship #2** — `#impact`, scrubbed. Uses `Stat` + a CSS/SVG rail; **no recharts**, which keeps the chart lib out of the entry chunk. | B |
| `src/components/sections/GalleryReel.tsx` | CREATE | `#gallery`. | C |
| `src/components/sections/AchievementsBoard.tsx` | CREATE | 5 records, no images. | D |
| `src/components/sections/JoinCta.tsx` | CREATE | The one inverted `mesh-cream` section. | D |
| `src/pages/Gallery/AlbumPage.tsx` | CREATE (moved) | See row 49. | C |
| `src/pages/NotFoundPage.tsx` | CREATE | No catch-all route exists today; every typo renders a blank `<main>`. | 6 |

**Deliberately not created** (each would be one file with one caller):

| Not created | Covered by |
|---|---|
| `src/hooks/useSectionNav.ts` | 12 lines of IntersectionObserver inlined in `Navbar.tsx`, its only consumer. |
| `src/hooks/useReducedMotion.ts` | `useReducedMotion()` ships inside `motion/react`. |
| `src/lib/img.ts` | Folded into `MediaFrame` — the only component that renders an image. |
| `src/app/providers.tsx` | There are no providers left after `QueryClientProvider` dies. |
| `src/content/navigation.ts` | A 7-item array at the top of `Navbar.tsx`. |
| `src/data/mock/**` (moving `src/mock`) | Pure churn: 20 import paths edited, zero behaviour changed. |
| `EmptyState` / `LoadingState` / `ErrorState` | No async, no fetch, no loading. Not-found is one `<p>` in `NotFoundPage`. |

##### 1.3 Root and `public/`

| File | Action | Reason | Slice |
|---|---|---|---|
| `index.html` | MODIFY | 13 lines, `<title>sac-webapp</title>`, no description, no OG, no theme-color, no preload. Full replacement in §4. | 2 |
| `package.json` | MODIFY | Dependency surgery + 3 guard scripts + `test`. | 1, F |
| `tailwind.config.ts` | DELETE | **Never loaded.** Tailwind 4 reads `@theme` from CSS and there is no `@config` directive in `index.css`. A no-op since day one. | 1 |
| `components.json` | MODIFY | `tailwind.config` points at the file being deleted → set to `""` (the Tailwind-4 form). Kept so `npx shadcn@latest add` still works from devDeps. | 1 |
| `vite.config.ts` | KEEP | `react()` + `tailwindcss()` + `@` alias is exactly right. Zero diff. | — |
| `eslint.config.js` | MODIFY | One line: `globalIgnores(['dist','playwright-report','test-results'])`. | F |
| `tsconfig.app.json` | KEEP | `noUnusedLocals` is what caught `HomePage.tsx:1`. Keep it strict. | — |
| `tsconfig.node.json` | MODIFY | `"include": ["vite.config.ts","playwright.config.ts"]`. | F |
| `tsconfig.json` | KEEP | Project refs + `@/*` paths already correct. | — |
| `.gitignore` | MODIFY | Add `playwright-report/`, `test-results/`, `.claude/`. | F |
| `playwright.config.ts` | CREATE | `webServer: npm run preview`, chromium + mobile-chrome projects only. | F |
| `tests/smoke.spec.ts` | CREATE | Every route 200s + has one `<h1>`; no `href="#"`; every rendered `img[src*=unsplash]` carries `auto=format`. | F |
| `tests/motion.spec.ts` | CREATE | With `reducedMotion: 'reduce'`, all section content is visible without scrolling into view. The check that the motion layer cannot hide content. | E |
| `public/1-78.jpg.png` | DELETE → `campus-01.webp` | 725 KB PNG for a photo. §3. | 3 |
| `public/2-70.png` | DELETE → `campus-02.webp` | 1.05 MB PNG. §3. | 3 |
| `public/7-40.png` | DELETE → `campus-03.webp` | 752 KB PNG. §3. | 3 |
| `public/download.png` | DELETE | 259×194. Upscaling it into even a 640px thumb is visible mush. No replacement — the frame it filled (`HomePage.tsx:110`) is gone. | 3 |
| `public/icons.svg` | DELETE | Zero references anywhere (`grep` confirms). Social sprite for accounts we have no URLs for. | 1 |
| `public/favicon.svg` | MODIFY | 9.5 KB purple bolt with a redundant `<mask>`. Restyle to volt-on-void, drop the mask. §3.3. | 3 |
| `public/apple-touch-icon.png` | CREATE | 180×180, referenced by the new `index.html`. | 3 |
| `public/og-cover.jpg` | CREATE | 1200×630 social card; no OG image exists today. | 3 |
| `public/campus-01.webp` | CREATE | 1100×733, 57 KB (measured). | 3 |
| `public/campus-02.webp` | CREATE | 1100×733, 59 KB (measured). | 3 |
| `public/campus-03.webp` | CREATE | 1100×733, 46 KB (measured). | 3 |
| `public/fonts/inter-latin-wght.woff2` | CREATE | 48 KB, self-hosted so `index.html` can preload an unhashed path. | 2 |
| `public/fonts/archivo-latin-standard.woff2` | CREATE | 88 KB. Must be the `standard` file, not `wght` — see §3.4. | 2 |
| `docs/overhaul-blueprint.md`, `docs/progress.md`, `SAC Site.md`, `README.md`, `palette.png` | KEEP | Reference material, not shipped. | — |

**Net file count:** 58 src − 13 deleted + 23 created = **68 src files**, 4,239 LOC → est. 5,400.

---

#### 2. DEPENDENCY PLAN

##### 2.1 The table

| Package | Action | Evidence |
|---|---|---|
| `motion` | **ADD** (dep) | Locked motion stack. All React choreography via `motion/react`. |
| `gsap` | **ADD** (dep) | The two flagship scenes need pin + scrub. Dynamically imported behind a `min-width: 1024px` match so it never enters the mobile critical path. |
| `@fontsource-variable/archivo` | **ADD** (dep) | `--font-display`. Used as a **file source only** — its CSS is never imported; the one woff2 is copied to `public/fonts` (§3.4). |
| `@playwright/test` | **ADD** (devDep) | Route/keyboard/reduced-motion verification. The only test tooling. |
| `axios` | **REMOVE** | `grep -rn axios src` → **0**. 3.0 MB. No backend exists. |
| `@tanstack/react-query` | **REMOVE** | 1 reference: `main.tsx:5`, which constructs a provider wrapping zero `useQuery` calls. 4.7 MB, and it *is* in the shipped bundle today. |
| `zustand` | **REMOVE** | 1 reference: `store/authStore.ts:1`, itself unimported. 252 KB. |
| `react-image-gallery` | **REMOVE** | `grep` → **0**. Lightbox is `ui/dialog.tsx`. |
| `embla-carousel-react` | **REMOVE** | `grep` → **0**. Mobile rails are `overflow-x-auto` + `snap-x` — native, no JS. |
| `tailwindcss-animate` | **REMOVE** (devDep) | `grep` → **0**, and it is a Tailwind **3** plugin — unloadable by Tailwind 4 without a config file, which we are also deleting. |
| `@fontsource/inter` | **REMOVE** | `main.tsx:4` imports it as a side effect and it has no type declarations → **TS2882, error 1 of 2**. It also double-ships Inter alongside the variable package (~220 KB of dead woff/woff2 in `dist`). |
| `shadcn` | **MOVE** → devDep | It is the CLI (5.9 MB). Nothing in `src` imports it *as a module* — but `src/index.css:3` imports `shadcn/tailwind.css`, and every `ui/` primitive uses the `data-open` / `data-checked` / `data-horizontal` variants defined there. **Inline those nine rules first (§2.2), then move.** Removing the import blind silently drops the variants and every primitive's state styling dies without a build error. |
| `tw-animate-css` | **REMOVE** | 1 reference: the `index.css:2` import. Nothing uses its classes; the three shadcn primitives we keep animate via `data-*` variants + our own `--dur-*` transitions. |
| `@fontsource-variable/inter` | **KEEP** (dep) | `--font-sans`. Same file-source-only treatment as archivo; the `@import` in `index.css` goes away. |
| `radix-ui` | **KEEP** | 9 references. Powers `dialog` + `sheet`, both retained. 80 KB. |
| `lucide-react` | **KEEP** | 13 references. Per-icon tree-shaken (the 39 MB on disk does not ship). |
| `recharts` | **KEEP** | 3 references (the chart components). Confined to the lazy `/stats` route; `ImpactScene` uses none of it. |
| `class-variance-authority` | **KEEP** | 3 references (`button`, `badge`, `sheet`). Survives badge's deletion via `button`. |
| `clsx` + `tailwind-merge` | **KEEP** | `cn()`. |
| `react`, `react-dom`, `react-router-dom`, `tailwindcss`, `@tailwindcss/vite` | **KEEP** | Core. |
| `card`, `badge`, `avatar`, `dropdown-menu`, `navigation-menu`, `separator`, `tooltip` (files, not packages) | **PRUNE LAST** | `badge` + `navigation-menu` go in slice 0 (they *are* two of the three lint errors — deleting is cheaper than editing). The rest are re-checked in slice F: anything still unimported is deleted. |

##### 2.2 Inline these into `index.css` BEFORE dropping the shadcn import

Verbatim from `node_modules/shadcn/dist/tailwind.css`. Nine `@custom-variant` rules plus the `no-scrollbar` utility (the mobile rails want it). The two accordion keyframes are dropped — no accordion in the IA.

```css
/* Inlined from shadcn/tailwind.css — the ui/ primitives' data-state styling
   depends on these. Do not delete without deleting dialog.tsx + sheet.tsx. */
@custom-variant data-open   { &:where([data-state="open"]),   &:where([data-open]:not([data-open="false"]))       { @slot; } }
@custom-variant data-closed { &:where([data-state="closed"]), &:where([data-closed]:not([data-closed="false"])) { @slot; } }
@custom-variant data-checked   { &:where([data-state="checked"]),   &:where([data-checked]:not([data-checked="false"]))     { @slot; } }
@custom-variant data-unchecked { &:where([data-state="unchecked"]), &:where([data-unchecked]:not([data-unchecked="false"])) { @slot; } }
@custom-variant data-selected  { &:where([data-selected="true"]) { @slot; } }
@custom-variant data-disabled  { &:where([data-disabled="true"]), &:where([data-disabled]:not([data-disabled="false"])) { @slot; } }
@custom-variant data-active    { &:where([data-state="active"]),  &:where([data-active]:not([data-active="false"]))     { @slot; } }
@custom-variant data-horizontal { &:where([data-orientation="horizontal"]) { @slot; } }
@custom-variant data-vertical   { &:where([data-orientation="vertical"])   { @slot; } }

@utility no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}
```

Do **not** carry over `@custom-variant dark (&:is(.dark *));` — there is no light mode. The site is dark; the one light section is a `mesh-cream` band, not a theme.

##### 2.3 Exact commands

```bash
cd /home/promad/Documents/codes/sac-webapp

# 1. remove (do this AFTER §2.2 is pasted into src/index.css and the
#    three @import lines are gone, or the dev server 500s on a missing module)
npm rm axios @tanstack/react-query zustand react-image-gallery \
       embla-carousel-react tailwindcss-animate @fontsource/inter tw-animate-css

# 2. shadcn CLI: dependency -> devDependency
npm rm shadcn && npm i -D shadcn

# 3. add
npm i motion gsap @fontsource-variable/archivo
npm i -D @playwright/test
npx playwright install chromium          # ~120 MB, outside node_modules

# 4. copy the two font files we actually ship (see §3.4)
mkdir -p public/fonts
cp node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2 \
   public/fonts/inter-latin-wght.woff2
cp node_modules/@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2 \
   public/fonts/archivo-latin-standard.woff2

# 5. delete the dead files
git rm src/store/authStore.ts src/types/auth.types.ts tailwind.config.ts \
       public/icons.svg src/components/layout/FloatingActionButton.tsx \
       src/components/ui/badge.tsx src/components/ui/navigation-menu.tsx

# 6. prove it
npm run build && npm run lint
```

Add to `package.json` scripts — three greps, no script files, no new tooling:

```json
"guard:tokens": "! grep -rInE '#[0-9a-fA-F]{3,8}|rounded-\\[|shadow-\\[|duration-\\[|ease-\\[|blur-\\[' src --include='*.ts' --include='*.tsx'",
"guard:img":    "! grep -rIn '<img' src --include='*.tsx' | grep -v 'MediaFrame.tsx'",
"guard:gsap":   "test $(grep -rIl gsap src | wc -l) -eq 2",
"test":         "playwright test"
```

`guard:tokens` scans only `.ts`/`.tsx`, so the `@theme` block in `index.css` is out of scope by construction. `guard:img` enforces the single-point image rule that makes §3.5 unbreakable. `guard:gsap` enforces "two files, nowhere else".

##### 2.4 Expected delta

| | Before | After | Δ |
|---|---|---|---|
| `dependencies` | 21 | 14 | −7 |
| `devDependencies` | 13 | 14 | +1 |
| `node_modules` removed | — | axios 3.0 M, `@tanstack` 4.7 M, zustand 252 K, react-image-gallery 136 K, embla 88 K, tailwindcss-animate 32 K, `@fontsource/inter` 5.1 M | **−13.3 MB** |
| `node_modules` added | — | motion, gsap, archivo, `@playwright/test` | ≈ **+22 MB** (net +9 MB; chromium is separate) |
| font files in `dist` | 24 files / 438 KB | 2 files / 136 KB (from `public/`, unhashed) | **−302 KB** |
| `public/` images | 2.61 MB (4 PNG) | 163 KB (3 webp) + 62 KB og + 12 KB touch-icon | **−2.37 MB** |
| entry JS (gz) | 221.6 KB | ≤ **180 KB** — react-query out (≈13 KB gz), recharts moved to the lazy `/stats` chunk, gsap behind a desktop dynamic import | target |
| total JS all chunks (gz) | 221.6 KB | ≤ **300 KB** (motion ≈ +50, gsap+ScrollTrigger ≈ +30) | budget |
| CSS (gz) | 12.2 KB | ≤ **14 KB** (loses shadcn theme + tw-animate keyframes + 24 `@font-face` blocks, gains the token/mesh layer) | budget |
| `dist/` total | 3.8 MB | ≤ **1.1 MB** | target |

---

#### 3. ASSET PIPELINE

##### 3.1 Convert / rename table

Sizes are **measured**, not estimated — each command below was run against the real files.

| Current | Bytes | Dim | → New | Target dim | Measured out | Notes |
|---|---|---|---|---|---|---|
| `1-78.jpg.png` | 724,792 | 1100×733 | `campus-01.webp` | 1100×733 (3:2) | **57,378** (−92%) | Hero-adjacent frame. The double extension is not a typo in this table — it is the filename. |
| `2-70.png` | 1,054,575 | 1100×733 | `campus-02.webp` | 1100×733 | **59,860** (−94%) | |
| `7-40.png` | 752,463 | 1100×733 | `campus-03.webp` | 1100×733 | **46,970** (−94%) | |
| — | | | `campus-0{1,2,3}-640.webp` | 640×427 | ≈24,000 each | Only for the mobile `srcSet`; skip if the frame is never wider than 640 CSS px. |
| `download.png` | 77,824 | **259×194** | *(nothing)* | — | — | **DELETE.** Smaller than every frame in the design. There is no crop of a 259px source that survives a `--radius-lg` card at 2× DPR. |
| `favicon.svg` | 9,728 | 48×46 | `favicon.svg` | 32×32 viewBox | ≈700 B | §3.3 |
| `icons.svg` | 5,120 | — | *(nothing)* | — | — | **DELETE.** Zero references; social sprite for URLs we do not have. |
| — | | | `og-cover.jpg` | 1200×630 | ≈62,000 | Derived from `campus-01` + a void scrim. |
| — | | | `apple-touch-icon.png` | 180×180 | ≈12,000 | Rendered from the new favicon. |

**Never upscale.** 1100px is the ceiling for every local photo. Any frame that would render wider than 1100 CSS px must be a graphic/mesh composition, not a photo — the photo-light rule restated as a build constraint.

##### 3.2 Exact commands

```bash
cd /home/promad/Documents/codes/sac-webapp/public

# 1x webp — libwebp 1.6.0 via the already-installed ImageMagick 7.1.2
for pair in "1-78.jpg.png:campus-01" "2-70.png:campus-02" "7-40.png:campus-03"; do
  src=${pair%%:*}; out=${pair##*:}
  magick "$src" -strip -quality 72 -define webp:method=6 "$out.webp"
done

# optional 640w rung for mobile srcSet
for n in 01 02 03; do
  magick "campus-$n.webp" -strip -resize 640x427 -quality 70 "campus-$n-640.webp"
done

# social card: crop to 1200x630 and darken toward --color-void so white type reads
magick campus-01.webp -resize 1200x -gravity center -crop 1200x630+0+0 \
  -fill '#020a0c' -colorize 45% -quality 78 og-cover.jpg

# apple touch icon from the restyled favicon
magick -background none favicon.svg -resize 180x180 apple-touch-icon.png

# verify then delete the originals
identify campus-0*.webp og-cover.jpg apple-touch-icon.png
git rm 1-78.jpg.png 2-70.png 7-40.png download.png icons.svg
du -sh .        # expect ~250K, was 2.6M
```

If `cwebp`/`sharp` is ever preferred, the equivalent is `cwebp -q 72 -m 6 in.png -o out.webp` — but do not install either to run one loop.

##### 3.3 `public/favicon.svg` — complete final file

Reuses the existing bolt geometry (energy/pulse reads correctly for an activity centre) and drops the 9 KB of `<mask>` and duplicate `display-p3` fills. The two literals here mirror `--color-void` and `--color-volt`; an SVG file cannot reference CSS custom properties, so this and `index.html`'s `theme-color` are the **only** two places outside `@theme` where a hex appears.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#020a0c"/>
  <g transform="translate(8 9)">
    <path fill="#d6fb00" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z"/>
  </g>
</svg>
```

##### 3.4 Fonts — two files, self-hosted, preloadable

`@fontsource-variable/*` emits per-subset files. Importing the package CSS pulls **all** subsets (cyrillic, greek, vietnamese, latin-ext) — that is 218 KB of variable woff2 in today's `dist` for a Latin-only English site, on top of 220 KB of duplicate static Inter. Vite also content-hashes anything imported from `node_modules`, which makes an `index.html` `<link rel="preload">` impossible to write.

Fix: copy exactly two files into `public/fonts/` and declare them by hand.

| Face | Source file | Bytes | Axes | Why this file |
|---|---|---|---|---|
| Inter Variable | `@fontsource-variable/inter/files/inter-latin-wght-normal.woff2` | 48,000 | `wght 100–900` | Body only needs weight. The `standard` file is 73 KB and adds `opsz`, which the type spec never uses. |
| Archivo Variable | `@fontsource-variable/archivo/files/archivo-latin-**standard**-normal.woff2` | 90,104 | `wght 100–900` + `wdth 62–125` | **Must be `standard`, not `wght`.** `archivo-latin-wght-normal.woff2` has no width axis, and `--font-display` specifies `wdth 100–118`. Using the `wght` file makes every `font-stretch` declaration silently no-op. Verified against `@fontsource-variable/archivo@5.3.0`'s `standard.css`, which carries `font-stretch: 62% 125%`. |

Declarations go in `index.css` (not the `@theme` block):

```css
@font-face {
  font-family: "Inter Variable";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("/fonts/inter-latin-wght.woff2") format("woff2-variations");
  unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}
@font-face {
  font-family: "Archivo Variable";
  font-style: normal;
  font-weight: 100 900;
  font-stretch: 62% 125%;
  font-display: swap;
  src: url("/fonts/archivo-latin-standard.woff2") format("woff2-variations");
  unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}
```

Both `@fontsource-variable/*` packages stay installed purely as the provenance of those two files (licence + a documented `cp` to re-pull on upgrade). Nothing imports them.

##### 3.5 Unsplash URL policy — fixed once, in `MediaFrame`

Today: **20 unique** `images.unsplash.com/photo-<id>` URLs across **36 references**, **none** parameterised. Every one fetches the full-resolution original — several are 4000px+ and multi-megabyte, for frames rendering at 400–900 CSS px.

Policy:

| Context | Query string |
|---|---|
| Cover / feature frame | `?auto=format&fit=crop&w=1200&q=72` |
| Grid tile, thumbnail, avatar | `?auto=format&fit=crop&w=640&q=72` |
| Lightbox full view | `?auto=format&fit=crop&w=1600&q=76` |

Applied **in one place** — `MediaFrame` — not by editing seven mock files. The mock data stays byte-identical to the locked ground truth, and any future record is parameterised for free:

```ts
// src/components/primitives/MediaFrame.tsx
// ponytail: one call site for every <img> on the site, so this is the only
// place a remote URL can be under-specified. Enforced by `npm run guard:img`.
const sized = (src: string, w: number) =>
  src.includes("images.unsplash.com") && !src.includes("?")
    ? `${src}?auto=format&fit=crop&w=${w}&q=${w > 1200 ? 76 : 72}`
    : src;
```

Its check is one Playwright assertion in `tests/smoke.spec.ts` (every `img[src*="unsplash"]` on `/` contains `auto=format`), not a unit test — that catches the whole class end to end, including any component that tries to render a bare `<img>`.

**Local path bug (`HomePage.tsx:11, 70, 90, 110`).** These use `url('../1-78.jpg.png')` and `src="../7-40.png"`. Relative URLs resolve against the *document* URL, not the source file, so at `/` they resolve to `/1-78.jpg.png` and happen to work; they also survive `/activities` and `/activities/:slug`. They break at depth ≥ 2 — `/gallery/events/interbits-football` resolves `../download.png` to `/gallery/download.png` → 404. The markup is therefore not reusable outside the homepage, which is exactly what the rebuild does with it. All four become root-absolute `/campus-0N.webp` inside `MediaFrame`, and the fourth (`download.png`) disappears with its card.

---

#### 4. `index.html` — complete final file

`theme-color` carries the one sanctioned literal outside `@theme` (a `<meta>` cannot read a custom property); its value is `--color-void`.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark" />
    <meta name="theme-color" content="#020a0c" />

    <title>Student Activity Centre — BITS Pilani, Goa Campus</title>
    <meta
      name="description"
      content="Sport and fitness at BITS Pilani Goa. Five facilities, open from 05:00. Find a court, a court time, and the people who run it."
    />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

    <link
      rel="preload"
      href="/fonts/archivo-latin-standard.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <link
      rel="preload"
      href="/fonts/inter-latin-wght.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin />

    <!-- og:url and og:image need the deploy origin. Make both absolute the day
         the domain exists; root-relative works for in-app previews only. -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="SAC — BITS Pilani, Goa" />
    <meta
      property="og:title"
      content="Student Activity Centre — BITS Pilani, Goa Campus"
    />
    <meta
      property="og:description"
      content="Sport and fitness at BITS Pilani Goa. Five facilities, open from 05:00. Find a court, a court time, and the people who run it."
    />
    <meta property="og:image" content="/og-cover.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="The SAC courts at BITS Pilani, Goa Campus." />
    <meta property="og:locale" content="en_IN" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Student Activity Centre — BITS Pilani, Goa Campus"
    />
    <meta
      name="twitter:description"
      content="Sport and fitness at BITS Pilani Goa. Five facilities, open from 05:00. Find a court, a court time, and the people who run it."
    />
    <meta name="twitter:image" content="/og-cover.jpg" />
    <meta name="twitter:image:alt" content="The SAC courts at BITS Pilani, Goa Campus." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

No `twitter:site` — there is no verified handle in the repo. No canonical, no JSON-LD: both need a real origin, and fabricating one is a fabricated fact.

---

#### 5. DELIVERY SLICES

Every slice ends green. `npm run build && npm run lint && npm run guard:tokens && npm run guard:img` is the floor for slices 2→F; call it **`GATE`** below. Nothing proceeds on a red build.

##### Slice 0 — green build (no visual change)

| | |
|---|---|
| **Goal** | 2 TS errors + 3 lint errors → 0, with a net-negative diff. |
| **Files** | `src/main.tsx` (drop line 4), `src/pages/HomePage.tsx` (drop line 1), `src/components/ui/button.tsx` (stop exporting `buttonVariants`), DELETE `src/components/ui/badge.tsx`, DELETE `src/components/ui/navigation-menu.tsx` |
| **Why deletion, not edits** | `badge.tsx:49` and `navigation-menu.tsx:163` are two of the three lint errors *and* have zero importers. Splitting their variant exports into new files to satisfy `react-refresh` would add two files to keep code nobody calls. `buttonVariants` likewise has no external importer (verified) — removing it from the export list is the whole fix. |
| **Accept** | `npx tsc -b` → `Found 0 errors`. `npx eslint .` → exit 0, no output. `git diff --stat` shows more deletions than insertions. App still renders identically. |
| **Verify** | `npm run build && npm run lint && git diff --stat` |

##### Slice 1 — dependency surgery + dead-file purge

| | |
|---|---|
| **Goal** | Remove 8 packages and 5 dead files without breaking the shadcn variants. |
| **Files** | `src/index.css` (paste §2.2, drop the 3 `@import`s), `src/main.tsx` (drop `QueryClient`), `package.json`, `components.json`, DELETE `tailwind.config.ts`, `src/store/authStore.ts`, `src/types/auth.types.ts`, `src/components/layout/FloatingActionButton.tsx`, `public/icons.svg`, `src/components/layout/MainLayout.tsx` (drop the FAB usage) |
| **Order matters** | §2.2 paste → then `npm rm`. Reversed, the dev server 500s on `Cannot resolve shadcn/tailwind.css` and the `data-*` variants vanish with no build error. |
| **Accept** | `grep -c "data-open" src/index.css` → ≥1. `grep -rn "shadcn/tailwind.css\|tw-animate\|@fontsource/inter" src` → empty. Dialog open/close and sheet slide still animate (open the mobile nav, open a gallery image). `dependencies` = 14. No `/report` link exists: `grep -rn '"/report"' src` → empty. |
| **Verify** | `npm ci && npm run build && npm run lint && npm run dev` + manual open/close of sheet and dialog |

##### Slice 2 — design system + document head

| | |
|---|---|
| **Goal** | Tokens, mesh, grain, focus ring, fonts, `index.html`. Nothing else. |
| **Files** | `src/index.css` (rewrite), `index.html` (§4), `public/fonts/*` (2 files) |
| **Accept** | `document.documentElement` computed `--color-volt` resolves. `body::after` grain present at opacity `.045`, `mix-blend-mode: overlay`, `pointer-events: none`. Tab through the page: every focusable shows a 2px volt ring at 3px offset. DevTools Network: exactly **2** font requests, both from `/fonts/`, both preloaded, no `node_modules` font in `dist/assets`. `document.title` is the real title. Archivo at `font-stretch: 112%` renders visibly wider than 100% (proves the `standard` file, not `wght`). |
| **Verify** | `npm run build && ls dist/assets \| grep -c woff` → `0`; `GATE`; Lighthouse "Ensure text remains visible during webfont load" passes |

##### Slice 3 — asset pipeline

| | |
|---|---|
| **Goal** | 2.61 MB of PNG → 163 KB of webp; favicon restyled; social card exists. |
| **Files** | `public/` per §3.1–3.3 |
| **Accept** | `du -sh public` ≤ 300 KB. `identify public/campus-01.webp` → `WEBP 1100x733`. `download.png`, `icons.svg`, all three PNGs gone. `favicon.svg` < 1 KB and volt-on-void at 16px. `og-cover.jpg` is 1200×630. |
| **Verify** | `du -sh public && identify public/*.webp public/og-cover.jpg public/apple-touch-icon.png && git status --short public` |

##### Slice 4 — data layer

| | |
|---|---|
| **Goal** | Nine selectors + three formatters. Zero raw ISO strings, zero hardcoded categories. |
| **Files** | CREATE `src/lib/format.ts`, `src/lib/content.ts`; MODIFY `src/pages/Activities/ActivitiesPage.tsx` (chips from `getActivityCategories()`), `src/components/cards/AchievementCard.tsx` (`formatDate`) |
| **Watch** | `getActivityCategories()` returns exactly `["Sports","Fitness"]`. The `Recreation` chip disappears because it is derived, not because someone deleted a string — that is the root-cause fix, and it also leaves `categoryData`'s `Recreation` row intact as a chart label. |
| **Accept** | `grep -rn '"Recreation"' src` → only `src/mock/mockStats.ts:57`. `grep -rnE '20[0-9]{2}-[0-9]{2}-[0-9]{2}' src --include='*.tsx'` → empty (ISO lives only in mock `.ts`). Activities page shows 3 chips (All/Sports/Fitness); every chip yields ≥1 card. `getOpenActivitiesNow()` returns Gym at 05:30 and `[]` at 03:00. |
| **Verify** | `GATE` + `grep -rn "Recreation" src` |

##### Slice 5 — primitives + motion vocabulary

| | |
|---|---|
| **Goal** | Six primitives and `lib/motion.ts`. No page consumes them yet except one smoke usage. |
| **Files** | CREATE `src/components/primitives/{Section,Reveal,MediaFrame,Stat,FilterChips,MockTag}.tsx`, `src/lib/motion.ts`; MODIFY `src/components/ui/{button,input,textarea}.tsx` |
| **Accept** | `npm run guard:img` passes (no `<img>` outside `MediaFrame`). `npm run guard:tokens` passes. `grep -rnE "[0-9]{2,4}ms" src/components` → empty; all durations come from `lib/motion.ts`. `Reveal` with `prefers-reduced-motion: reduce` forced in DevTools renders children at `opacity: 1`, `transform: none`, no transition. `MediaFrame` reserves space (no CLS) with JS disabled. |
| **Verify** | `GATE` + `npm run guard:gsap` (expects 0 here; the expectation flips to 2 in slice B) |

##### Slice 6 — shell: nav, footer, routes, 404

| | |
|---|---|
| **Goal** | Every route reachable, none dead, keyboard-complete. |
| **Files** | MODIFY `src/components/layout/{Navbar,Footer,MainLayout}.tsx`, `src/routes/index.tsx`, `src/App.tsx`, `src/components/ui/sheet.tsx`; CREATE `src/pages/NotFoundPage.tsx` |
| **Route surface after** | `/` · `/activities` · `/activities/:slug` · `/events` · `/events/:slug` · `/gallery` · `/gallery/:kind/:slug` · `/people` · `/achievements` · `/stats` (lazy) · `/contact` · `*` |
| **Judgement** | No redirects from the old `/gallery/events/:slug`, `/people/incharges`, `/people/committee`. Version is `0.0.0`, nothing is deployed or indexed, so there are no inbound links to preserve. Add redirects the day a URL is shared externally. |
| **Accept** | `/nonsense` renders `NotFoundPage` with a working link home. Anchor nav from `/contact` → `/#impact` navigates then scrolls. Active section underline is volt and tracks scroll. Mobile drawer: all targets ≥48px, Escape closes, focus returns to the trigger. Nav is the only ALL-CAPS besides eyebrows. `grep -rn 'href="#"' src` → empty. |
| **Verify** | `GATE` + tab-through of the header at desktop and mobile viewports |

##### Slice 7 — art-direction proof: hero + pulse strip

| | |
|---|---|
| **Goal** | The go/no-go slice. If this is not premium, no later slice fixes it. |
| **Files** | CREATE `src/components/sections/{Hero,PulseStrip}.tsx`; MODIFY `src/pages/HomePage.tsx` (hero + strip only, everything else deleted) |
| **Accept** | Exactly one `--text-display-xl` on the site: `grep -rc "text-display-xl" src` → `1`. Volt ≤10% of the hero viewport (screenshot + eyedropper spot check on the primary CTA, the live dot, the eyebrow, and nothing else). Pulse strip shows a real count from `getOpenActivitiesNow()` and carries `MockTag` on the metric. Hero entrance runs once at `--dur-hero`/`--ease-out-quint`; reduced-motion renders it statically. Mobile: no pinned anything, strip scrolls horizontally with snap. |
| **Verify** | `GATE` + desktop/mobile screenshots + DevTools reduced-motion toggle + 4× CPU throttle (entrance stays ≥50 fps) |

##### Slice 8 — activities

| | |
|---|---|
| **Goal** | `#activities` rail + both activity routes on one card component. |
| **Files** | CREATE `src/components/cards/ActivityCard.tsx`; DELETE `src/pages/Activities/ActivityCard.tsx`; MODIFY `ActivitiesPage.tsx`, `ActivityDetailPage.tsx`, `HomePage.tsx`; CREATE `sections/ActivitiesRail.tsx` |
| **Accept** | 5 cards, 5 slugs, 5 working detail routes. Timings via `formatRange` (`Gym 05:00–23:00`). Chips write `?category=Fitness` and survive reload. `/activities/not-a-slug` renders the not-found branch, not a blank page. Cards stagger in groups, not one-by-one. |
| **Verify** | `GATE` + visit all 5 detail routes |

##### Slice 9 — events

| | |
|---|---|
| **Goal** | `#events` featured block + both event routes. |
| **Files** | CREATE `src/components/cards/EventCard.tsx`, `sections/FeaturedEvent.tsx`; MODIFY `EventsPage.tsx`, `EventDetailPage.tsx`, `HomePage.tsx` |
| **Date trap — read before coding** | Today is **2026-08-05**. `interbits-football` (2026-06-12) and `fitness-challenge` (2026-07-01) are **past**; `swimming-championship` (2026-08-05) is **today**. Two consequences: (a) `getUpcomingEvents` must compare against *start of day*, or the only upcoming event vanishes and the homepage renders an empty section; (b) both `isFeatured` records are in the past, so `getFeaturedEvent` must fall back to the nearest upcoming event or the featured block advertises a finished event. Copy the today-state explicitly: `Today · Swimming Championship`. No record has an `endDate`, so no range UI. |
| **Accept** | Homepage featured block shows the swimming championship labelled as today, never a June date. `/events` lists 1 upcoming + 2 past under separate headings. All 3 detail routes render with 3 gallery images each. No countdown anywhere. |
| **Verify** | `GATE` + `/events` and all 3 `/events/:slug` |

##### Slice A — GSAP flagship #1: `#focus` pinned scene

| | |
|---|---|
| **Goal** | One pinned desktop scene, isolated, disposable, with a normal-flow mobile fallback. |
| **Files** | CREATE `src/components/sections/FocusScene.tsx`; MODIFY `HomePage.tsx` |
| **Rules** | gsap + ScrollTrigger imported **dynamically** inside a `matchMedia("(min-width:1024px)")` branch, so mobile never downloads it. `ScrollTrigger.getAll().forEach(t => t.kill())` in cleanup. Content is in the DOM and readable before any GSAP runs. |
| **Accept** | `npm run guard:gsap` → 1 file so far. Below `lg`, the section is normal document flow with zero pinning and gsap is absent from the network panel. Reduced-motion: no pin, no scrub, all content visible. Unmount → `ScrollTrigger.getAll().length === 0` (navigate away and back twice). Resize desktop→mobile→desktop does not double-pin. |
| **Verify** | `GATE` + `npm run guard:gsap` + route-away leak check in the console |

##### Slice B — GSAP flagship #2: `#impact` + charts + `/stats`

| | |
|---|---|
| **Goal** | Scrubbed impact reveal, retokened charts, lazy stats route. |
| **Files** | CREATE `src/components/sections/ImpactScene.tsx`; MODIFY 3 chart components, `StatsPage.tsx`, `routes/index.tsx` (lazy), `HomePage.tsx` |
| **Decisions** | `ImpactScene` uses `Stat` + a CSS/SVG rail and imports **no recharts** — that is what keeps the chart library inside the `/stats` chunk. Trend axis reads `Jan–Nov` (11 records, December absent). One volt series maximum per chart; the rest is teal. |
| **Accept** | `npm run guard:gsap` → **exactly 2**. `grep -rn recharts src` → 3 chart files only. `dist` has a separate stats chunk; entry chunk gz ≤180 KB. Every stat block carries `MockTag`. Charts have a text/table alternative and are not colour-only. Scrub is transform/opacity only — Performance panel shows no layout thrash while scrolling. |
| **Verify** | `GATE` + `npm run guard:gsap` + `ls -la dist/assets/*.js` + `gzip -c9 dist/assets/index-*.js \| wc -c` |

##### Slice C — gallery

| | |
|---|---|
| **Goal** | Hub + one album page for both kinds + lightbox. Four files become two. |
| **Files** | CREATE `src/pages/Gallery/AlbumPage.tsx`, `sections/GalleryReel.tsx`; MODIFY `GalleryPage.tsx`, `GalleryImageDialog.tsx`, `cards/GalleryCard.tsx`, `ui/dialog.tsx`; DELETE `ActivityGalleryPage.tsx`, `EventGalleryPage.tsx`, `EventGalleryHubPage.tsx`, `cards/EventGalleryCard.tsx` |
| **Accept** | 8 albums (5 activity + 3 event), 24 images total, every album opens. `/gallery/activities/basketball` and `/gallery/events/interbits-football` both work; `/gallery/bogus/x` 404s. Lightbox: Escape closes, arrows page, focus trapped, focus restored on close, caption present. All thumbs `w=640`, lightbox `w=1600` — check the network panel. |
| **Verify** | `GATE` + keyboard-only pass through one album |

##### Slice D — people, achievements, contact, join CTA

| | |
|---|---|
| **Goal** | The last three routes and the one inverted section. |
| **Files** | MODIFY `PeoplePage.tsx`, `AchievementsPage.tsx`, `ContactPage.tsx`, `cards/{PersonCard,AchievementCard}.tsx`, `ui/{input,textarea}.tsx`; DELETE `InchargesPage.tsx`, `CommitteePage.tsx`; CREATE `sections/{PeoplePreview,AchievementsBoard,JoinCta}.tsx` |
| **Accept** | `/people` shows 2 in-charges + 2 committee with `#incharges`/`#committee` anchors. Achievements: 5 records, 5 level chips (All/National/State/Inter-NIT/Campus), each yielding ≥1 row, dates via `formatDate`, no images (zero records have one). Contact: the three `href="#"` links are **gone**; email and phone are real `mailto:`/`tel:`; if a form ships it carries a visible "Demo — this form does not send" label and a working `mailto:` fallback. `JoinCta` is the only `mesh-cream` section, eyebrow in `--color-teal-700`, text in `--color-ink`, and the only inverted band on the site. |
| **Verify** | `GATE` + `grep -rn 'href="#"' src` → empty + click every control on `/contact` |

##### Slice E — accessibility, motion and performance audit

| | |
|---|---|
| **Goal** | Prove the motion layer cannot hide content and the budgets hold. |
| **Files** | CREATE `tests/motion.spec.ts`; touch-ups only |
| **Accept** | Playwright with `reducedMotion: 'reduce'`: every section's H2 is visible without scrolling into view. Axe/Lighthouse a11y ≥ 95, no contrast failures (`--color-fg-faint` on `--color-deep` is the one to check). Keyboard reaches every control in DOM order; no focus trap outside dialogs. Mobile Lighthouse performance ≥ 90 at 4× CPU. All offscreen loops paused (Performance panel: no rAF while the pulse strip is offscreen). Blur ≤80px desktop / 48px mobile: `grep -rn "blur(" src/index.css`. |
| **Verify** | `npx playwright test` + `npx lighthouse http://localhost:4173 --preset=desktop` and `--form-factor=mobile` |

##### Slice F — prune, smoke tests, ship

| | |
|---|---|
| **Goal** | Delete whatever is still unimported and lock it with tests. |
| **Files** | DELETE any still-unimported `src/components/ui/*` (expected: `card`, `avatar`, `dropdown-menu`, `separator`, `tooltip`); CREATE `playwright.config.ts`, `tests/smoke.spec.ts`; MODIFY `package.json`, `eslint.config.js`, `tsconfig.node.json`, `.gitignore` |
| **Prune command** | `for f in src/components/ui/*.tsx; do n=$(basename $f .tsx); c=$(grep -rl "components/ui/$n" src --include='*.tsx' \| grep -v "ui/$n.tsx" \| wc -l); [ "$c" -eq 0 ] && echo "UNUSED $f"; done` |
| **Accept** | The prune command prints nothing. `src/components/ui` contains only `button`, `dialog`, `input`, `sheet`, `textarea` (+ anything a slice actually imported). `npx playwright test` green: 12 routes × (200 + exactly one `<h1>`), no `href="#"`, every unsplash `img` parameterised. Final budgets: `dist` ≤1.1 MB, entry JS gz ≤180 KB, all JS gz ≤300 KB, CSS gz ≤14 KB, 2 font files, 3 webp. |
| **Verify** | `npm ci && npm run build && npm run lint && npm run guard:tokens && npm run guard:img && npm run guard:gsap && npm test && du -sh dist && gzip -c9 dist/assets/*.js \| wc -c` |

---

##### Slice dependency order

```
0 ──> 1 ──> 2 ──> 3
            │
            └──> 4 ──> 5 ──> 6 ──> 7 ─┬─> 8 ──> A
                                      ├─> 9
                                      ├─> B
                                      ├─> C
                                      └─> D
                                            └──> E ──> F
```

`3` (assets) is parallel to `4/5` — it touches only `public/`. `8`, `9`, `A`–`D` are independent of one another once `7` proves the art direction; ship them in that order so the homepage is never a hole. `E` needs every section to exist. `F` needs `E` green.

---

## Part 8 — Quality gates

Nothing is done because it looks done. Accessibility, performance and the test suite are the definition.

---

### Metadata and the accessibility spec

Current state: `index.html` is 13 lines with `<title>sac-webapp</title>` and no meta beyond charset and viewport. Every route shares that one title, so browser history, bookmarks, tab switching and any share preview are identical and useless across 15 pages.

---

#### 1. Titles and descriptions — all 16 routes

Pattern: `{Page} · SAC Goa` for hubs, `{Record} · {Section} · SAC Goa` for detail routes. Home is the only one that leads with the full institution name. Every title is under 60 characters; every description is under 155.

The `<h1>` column is **not** authored here — it is quoted from the route chapter, which owns page copy. This chapter owns only `<title>` and the description. Where the two ever disagree, the route chapter wins.

| Route | `<title>` | Meta description | `<h1>` (owned by the route chapter) |
|---|---|---|---|
| `/` | `SAC Goa — Student Activity Centre, BITS Pilani Goa` | `Five sports and fitness activities, campus events and student achievements at the Student Activity Centre, BITS Pilani K K Birla Goa Campus.` | `Every court, every lane, in motion.` |
| `/activities` | `Activities · SAC Goa` | `Basketball, football, badminton, swimming and the gym — timings, facilities and photos for all five SAC activities.` | `Where the campus trains` |
| `/activities/:slug` | `{name} · Activities · SAC Goa` | `{description} Timings, facilities and photos for {name} at SAC Goa.` | `{activity.name}` |
| `/stats` | `Participation stats · SAC Goa` | `Participation, session volume and monthly trend across SAC activities. Eleven months recorded, January to November.` | `The numbers behind the noise` |
| `/gallery` | `Gallery · SAC Goa` | `Photographs from practice sessions, tournaments and events across every SAC activity.` | `Frames from the floor` |
| `/gallery/:slug` | `{activity} photos · Gallery · SAC Goa` | `{n} photographs from {activity} sessions and tournaments at SAC Goa.` | `{activity.name}` |
| `/gallery/events` | `Event photos · Gallery · SAC Goa` | `Photographs from every SAC event — opening ceremonies, matches, heats and award ceremonies.` | `Every event, in frames` |
| `/gallery/events/:slug` | `{event} photos · Gallery · SAC Goa` | `{n} photographs from {event}, held {date} at {venue}.` | `{event.title}` |
| `/events` | `Events · SAC Goa` | `Tournaments, challenges and championships hosted by the Student Activity Centre at BITS Pilani Goa.` | `What the SAC runs` |
| `/events/:slug` | `{title} · Events · SAC Goa` | `{description} {date} at {venue}.` | `{event.title}` |
| `/people` | `People · SAC Goa` | `The faculty in-charges and student committee who run the Student Activity Centre at BITS Pilani Goa.` | `Who runs it` |
| `/people/incharges` | `Faculty in-charges · People · SAC Goa` | `Faculty in-charge and assistant faculty in-charge of the Student Activity Centre, BITS Pilani Goa.` | `SAC in-charges` |
| `/people/committee` | `Student committee · People · SAC Goa` | `The student sports secretaries who run day-to-day activities at SAC Goa.` | `SAC committee` |
| `/achievements` | `Achievements · SAC Goa` | `National, state, inter-NIT and campus results won by BITS Goa students across football, swimming, basketball, badminton and fitness.` | `What the campus brought back` |
| `/contact` | `Contact · SAC Goa` | `Reach the Student Activity Centre at BITS Pilani K K Birla Goa Campus — location, email and phone. The message form is a demo that opens your mail client.` | `Talk to the SAC` |
| `*` | `Page not found · SAC Goa` | `That page does not exist. Browse activities, events, the gallery or achievements at SAC Goa.` | `COPY[kind].title` |

`/people/:role` is one file serving two paths, so its title and description are a two-entry lookup keyed on the param — never a string built from the slug, which would produce `Incharges · SAC Goa`.

**Open Graph.** `og:title` = the `<title>` minus the `· SAC Goa` suffix. `og:description` = the meta description. `og:type` = `website` (`article` on nothing — none of these are articles). `og:url` = the canonical absolute URL. `og:image` = `/og/campus-01.jpg` (1200×630) globally, and the record's `coverImageUrl` at `w=1200&h=630&fit=crop` on the four detail routes. Twitter: `summary_large_image` plus mirrored title/description/image.

**The hook, not a library.** `react-helmet` is not installed and is not worth a dependency for eight lines:

```ts
// src/hooks/useDocumentTitle.ts
import { useEffect } from "react"

const SITE = "SAC Goa"

export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    if (!description) return
    for (const sel of ['meta[name="description"]', 'meta[property="og:description"]']) {
      document.querySelector(sel)?.setAttribute("content", description)
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title.replace(` · ${SITE}`, ""))
  }, [title, description])
}
```

Called once per page component, at the top, with the literal strings from the table. `index.html` ships the homepage values so a crawler that does not execute JS still gets a correct document — the rebuild is a client-rendered SPA and this is the honest ceiling. If real SEO becomes a requirement, that is a pre-rendering change, not a meta-tag change; say so rather than pretending otherwise.

**JSON-LD: not shipped.** `SportsEvent` requires a `startDate` and a `location`, both of which exist. But the mock calendar ends at 2026-08-05, so from 2026-08-06 onward **all three events are past**, the data is acknowledged mock data, and there is no registration URL or offer. Emitting event structured data for concluded fictional events invites Google to surface them as upcoming. **Decision: no JSON-LD anywhere until the events come from a real source.** One `Organization` block in `index.html` (name, URL, campus address) is the only structured data, and every field in it is a real, verifiable fact about BITS Pilani K K Birla Goa Campus.

---

#### 2. Landmark maps

**Homepage `/`:**

```
<body>
 ├─ <header>                     Navbar — banner, sticky
 ├─ <nav aria-label="Page sections">   AnchorNav rail, lg+ only
 ├─ <main id="main">
 │   ├─ <section id="hero" aria-labelledby="hero-h">
 │   ├─ <section id="pulse" aria-labelledby="pulse-h">
 │   ├─ <section id="about" aria-labelledby="about-h">
 │   ├─ <section id="focus" aria-labelledby="focus-h">
 │   ├─ <section id="activities" aria-labelledby="activities-h">
 │   ├─ <section id="events" aria-labelledby="events-h">
 │   ├─ <section id="people" aria-labelledby="people-h">
 │   ├─ <section id="impact" aria-labelledby="impact-h">
 │   ├─ <section id="gallery" aria-labelledby="gallery-h">
 │   ├─ <section id="wins" aria-labelledby="wins-h">
 │   ├─ <section id="join" aria-labelledby="join-h">
 │   └─ (footer sits outside main)
 └─ <footer>                     contentinfo
```

Every `<section>` is labelled by its own heading `id`. An unlabelled `<section>` is not exposed as a region at all, which is why the twelve bands would otherwise be invisible to a landmark rotor.

**Detail route (`/activities/:slug`):**

```
<header> banner
<main id="main">
  <nav aria-label="Breadcrumb"> (inside PageIntro)
  <h1>{name}</h1>
  <section aria-labelledby="timings-h">
  <section aria-labelledby="facilities-h">
  <section aria-labelledby="photos-h">
<footer> contentinfo
```

A **skip link** is the first focusable element in the DOM: `<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-volt focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>`. Without it a keyboard user tabs the seven-item nav on every single route.

---

#### 3. Homepage heading outline

Exactly one `<h1>`. `SectionHeading` cannot render `h1` at all, so this is enforced by the component API rather than by review.

Copy below is quoted from the twelve band chapters, which own it. Reproduced here only to prove the outline has no gap and no second `h1`.

```
h1  Every court, every lane, in motion.                     #hero      (SplitText, 3 lines)
──  (no heading)                                            #pulse     <section aria-label="Live campus pulse">
h2  Five facilities, two categories, one centre the         #about     id="about-heading"
    campus runs on.
h3    Participate · Create · Connect                        #about     three principle titles
h2  Five spaces. Eighteen hours. One centre.                #focus     id="focus-statement"
h2  Five places to show up.                                 #activities id="activities-title"
h3    Basketball · Football · Badminton · Swimming · Gym    #activities five card titles
h2  {event.title}                                           #events    id="events-title"
h2  Someone unlocks the gym at 5 a.m.                       #people    id="people-heading"
h3    Dr. Rajesh Kumar · Dr. Priya Sharma ·                 #people    four card titles
      Arjun Mehta · Ananya Verma
h2  Participation is the only metric we care about.         #impact    id="impact-title"
h3    Monthly participation                                 #impact    inside the <figure>
h2  Courts full, lanes busy, nobody watching the clock.     #gallery   id="gallery-title"
h2  Names on the board.                                     #wins      id="wins-title"
h3    {studentName} × 5                                     #wins      one per <li>
h2  You do not need a team. You need a start time.          #join      id="join-title"
h2  EXPLORE                                                 footer     id="ft-explore"
h2  THE CENTRE                                              footer     id="ft-centre"
h2  REACH US                                                footer     not a <nav> — addresses
```

**The pulse strip is the one band with no heading, and that is deliberate.** It is four ambient text chips inside a moving track. A heading would promise a section a user can navigate to; `aria-label="Live campus pulse"` names the region without inventing copy that isn't on screen. It is also the one band not in the `AnchorNav` rail.

**Three footer `<h2>`s, not `<h3>`s.** They are siblings of the band headings, not children of one of them — the footer is outside `<main>`. Nesting them under a nonexistent footer `h1` is what would break the outline.

Card titles are `h3` under their band's `h2` — never a `<p>` styled to look like a heading, and never an `h4` because five cards sit in a grid. No level is skipped anywhere in the document.

**Heading `id` convention.** `{section}-title`. Three landed chapters predate the rule and use `about-heading`, `people-heading` and `focus-statement`; in each the `aria-labelledby` matches its own `id`, so nothing is broken — but implement all twelve as `{section}-title` so the pattern is greppable. Recorded as conflict **R3** in the reconciliation chapter.

---

#### 4. Keyboard map

| Context | Key | Behaviour |
|---|---|---|
| Any page | `Tab` | Skip link → wordmark → nav links (5) → `Get involved` CTA → mobile trigger (`<md`) → main content in DOM order → footer |
| Any page | `Shift+Tab` | Exact reverse. No focus trap outside a dialog |
| Navbar (desktop) | `Enter` | Follows the link. Anchor links on `/` move focus to the target section, which has `tabindex="-1"` so focus actually lands there |
| Mobile sheet | `Enter` on trigger | Opens; focus moves to the first link inside |
| Mobile sheet | `Escape` | Closes; **focus returns to the trigger button** (Radix handles this, provided the Sheet is not conditionally unmounted) |
| Mobile sheet | `Tab` | Trapped inside the panel while open |
| Filter pills | `Tab` / `Enter` / `Space` | Each pill is a real `<button type="button" aria-pressed>`. Not a roving tabindex, and **not** `role="radio"` — a radiogroup owes the user arrow-key navigation and a single tab stop, which is more machinery than 3–5 options deserve. See **R5** |
| Gallery tile | `Enter` / `Space` | Opens the lightbox at that index |
| Lightbox | `Escape` | Closes, focus returns to the invoking tile |
| Lightbox | `→` / `←` | Next / previous, wrapping at both ends. Inert when a set has one image |
| Lightbox | `Tab` | Trapped: close (X) → `Previous` → `Next`. There is no `Home`/`End` binding — every set is three frames, so two arrow presses reach any of them |
| Gallery reel | `Tab` | Moves through tiles; the native `scroll-snap` container scrolls the focused tile into view automatically |
| Gallery reel | `→` / `←` | Native horizontal scroll when the container has focus. No custom handler — the reel is a real scroll container, not a transform carousel |
| Marquee | `Tab` | Focus pauses the animation via `focus-within` |
| Contact form | `Enter` in a field | Submits. `Tab` moves between fields; errors are announced on submit, not on every keystroke |
| AnchorNav rail | `Tab` | Reachable, each bar labelled `sr-only`; `Enter` jumps and moves focus |

---

#### 5. Focus visibility, measured

Ring: `outline: 2px solid var(--color-volt); outline-offset: 3px`, set globally in `src/index.css`. Contrast of the ring against every surface it can appear on, computed:

| Ring on | Ratio | WCAG 2.4.11 (≥3:1) |
|---|---|---|
| `volt` on `void` | **16.80** | pass |
| `volt` on `abyss` | **15.76** | pass |
| `volt` on `deep` | **13.95** | pass |
| `volt` on `raised` | **11.99** | pass |
| `volt` on `teal-900` | **10.49** | pass |
| `volt` on `cream` | **1.11** | **FAIL** |

The last row is why `.light-section :focus-visible` overrides `outline-color` to `--color-teal-900`: **11.61 on cream**, pass. This is not a stylistic preference — a volt ring inside Section 11 is invisible.

**Text contrast, computed:**

| Pair | Ratio | Verdict |
|---|---|---|
| `fg` on `void` / `abyss` / `deep` / `raised` | 18.31 / 17.18 / 15.20 / 13.07 | AAA everywhere |
| `fg-muted` on `void` / `abyss` | 7.85 / 7.36 | AAA |
| `fg-muted` on `deep` / `raised` | 6.52 / 5.60 | AA — fine for body, **not** for anything below 14px |
| `fg-faint` on `void` / `abyss` / `deep` | 3.79 / 3.55 / **3.14** | **Large text and non-text UI only.** Never body copy, never a label a user must read to act |
| `volt` on `void` / `deep` | 16.80 / 13.95 | AAA |
| `cream` on `void` / `deep` | 18.59 / 15.44 | AAA |
| `ink` on `volt` (primary CTA) | 16.27 | AAA |
| `ink` on `cream` (light section body) | 18.01 | AAA |
| `teal-700` on `cream` | 8.03 | AAA |
| `win` on `void` / `deep` (positive delta) | 10.39 / 8.63 | AAA |

**The `fg-faint` rule.** At `--text-meta` (13px) it is 3.14:1 on `deep` — below the 4.5:1 body minimum. It is legal only for: the breadcrumb `/` separator (decorative, `aria-hidden`), the lightbox `n / count` counter (`aria-hidden`; position is not the only way to know where you are — the caption is announced), inactive rail bars (non-text UI, ≥3:1), and timestamp text that is also available in a `<time datetime>` attribute. Anywhere else, use `fg-muted`.

---

#### 6. Touch targets

44×44 CSS px minimum (WCAG 2.5.8 AAA / Apple HIG). Audit of every interactive element:

| Element | Size | Status |
|---|---|---|
| Primary CTA | `px-8 py-4` ≈ 52px tall | pass |
| Secondary CTA | `py-4` + `min-h-11` | pass |
| Nav links (desktop) | `py-2` in a 72px bar, `min-h-11` | pass |
| Nav links (sheet) | `py-3 text-base`, ≈48px | pass |
| Mobile menu trigger | `size-11` (44px) | pass — currently `p-2` around a 20px icon = 36px, **fix required** |
| Filter pill (`FilterRow`) | `h-12 px-5` | pass |
| Gallery tile | Full tile, ≥180px | pass |
| Lightbox `Previous` / `Next` | `min-h-12` labelled pills, `count > 1` only | pass |
| Lightbox close | `dialog.tsx`'s built-in X, resized to `min-h-12 min-w-12` | **fix required** — it is 32px today. Do not substitute `Button size="icon-sm"`; that is also 32px |
| Footer links | `py-2` + `min-h-11` on the list item | pass |
| Rail bars | 2×20px visual, `p-2` hit area = 36px wide | acceptable — `lg`-only, pointer-driven, and duplicated in the nav |

Adjacent targets keep ≥8px of spacing so a 44px finger cannot hit two.

---

#### 7. Alt text

**Policy.** Alt describes *what the image shows in this context*, never the file, never "image of". `MediaFrame` types `alt` as required and non-optional, so an omission is a TypeScript error rather than a review miss.

All four `HomePage` images currently have `alt=""` while carrying meaning. Replacements:

| Source | Alt |
|---|---|
| `HomePage.tsx:11` campus hero | `Floodlit football ground at BITS Pilani Goa in the evening` |
| `HomePage.tsx:70` | `Students playing on the indoor basketball court` |
| `HomePage.tsx:90` | `Swimmers training in the Aquatics Complex lanes` |
| `HomePage.tsx:110` | `Strength training area in the SAC gym` |

| Image class | Alt source |
|---|---|
| Activity cover | `` `${activity.name} at SAC Goa` `` |
| Event cover | `` `${event.title}${event.venue ? ` at ${event.venue}` : ""}` `` |
| Person portrait | `` `${person.name}, ${person.designation}` `` |
| Gallery tile / lightbox | `image.caption` verbatim — the captions are already descriptive ("Team Huddle", "Championship Final") |
| Decorative mesh, grain, rules, dividers | CSS only, never an `<img>`, so no alt exists to get wrong |

`alt=""` is legal only with `role="presentation"` and only when adjacent text names the image. That combination appears nowhere in the rebuild.

---

#### 8. Charts

Recharts renders inline SVG that a screen reader either ignores or reads as a soup of `<path>` elements. Every chart therefore ships a text alternative and the chart itself is hidden:

```tsx
<figure>
  <div aria-hidden="true"><ResponsiveContainer>…</ResponsiveContainer></div>
  <figcaption className="text-meta text-fg-muted">
    Participation by activity, 2026. Basketball 820, Swimming 650, Gym 520,
    Badminton 480, Football 390, Yoga 320, Table Tennis 250.
  </figcaption>
</figure>
```

- The `figcaption` is **visible**, not `sr-only` — the numbers are the point, and a sighted user reading exact values beats hovering seven tooltips.
- The trend chart caption reads `Monthly participation, January to November 2026. Eleven months recorded; December is not yet available.` — the missing 12th point is stated, never padded with a zero.
- The category pie caption states `Sports 55%, Fitness 30%, Recreation 15%` **and** adds `Recreation covers activities not yet individually listed.` — because zero activities carry that category, and an unexplained 15% slice is a claim the data cannot support.
- `Yoga` and `Table Tennis` appear in the participation chart but are **not** activities; they are never rendered as links and never counted in "5 activities".

---

#### 9. `aria-current` and nav state

| Case | Attribute |
|---|---|
| Navbar link matching the current route | `aria-current="page"` — from React Router's `NavLink` `isActive` |
| A parent route (`/people` while on `/people/committee`) | `aria-current="page"` on the parent too, since `NavLink` `end={false}`. Visually the parent is dimmer |
| Last breadcrumb crumb | `aria-current="page"`, rendered as a `<span>`, not a link |
| AnchorNav active section | `aria-current="true"` (a section, not a page) |
| Filter pill selected | `aria-pressed="true"` — a toggle, not a location |

Active state is never conveyed by color alone: the active nav link also carries a 2px volt underline, and the active filter pill inverts to a filled `variant="active"`.

---

#### 10. Radix dialog and sheet contracts

| Requirement | |
|---|---|
| Every `DialogContent` has a `DialogTitle` | Radix logs a dev warning and announces the dialog unlabelled without one. The current `GalleryImageDialog.tsx` has neither title nor description — the primary a11y defect being fixed |
| Every `DialogContent` has a `DialogDescription` or `aria-describedby={undefined}` | The lightbox uses a real one — `DialogTitle` is the collection title, `DialogDescription` is the frame caption. Silencing a description is only correct where there is genuinely nothing to say |
| The dialog stays **mounted** | Radix restores focus to the trigger on close. Conditionally rendering `<Dialog>` destroys the node before the restore runs, so focus falls to `<body>` — exactly the current bug |
| `Escape` and outside-click | Radix defaults. Never override |
| Sheet | `SheetTitle` is required for the same reason. The current mobile panel hand-rolls its body at `Navbar.tsx:58` and never renders `SheetHeader`/`SheetTitle`, so it is announced unlabelled — fix by adding an `sr-only` `SheetTitle` reading `Navigation` |
| Scroll lock | Radix locks `<body>`. The grain layer is `position: fixed` and unaffected |
| `z-index` | Overlay and content sit at `z-50`; the grain owns `z-100` and stays above, which is intentional — the film grain covers the modal too |

---

#### 11. Reduced motion, per effect

| Effect | Normal | `prefers-reduced-motion: reduce` |
|---|---|---|
| Global CSS transitions/animations | as authored | damped to 1ms by the `@layer base` block |
| `smooth` scroll | `scroll-behavior: smooth` | `auto` — instant jumps |
| `Reveal` | fade + 24px rise, `--dur-std` | visible immediately, `duration: 0` |
| `revealStagger` | 0.08s per child | no stagger — a 12-item list is otherwise ~1s of sequential motion |
| `SplitText` | masked per-line rise, `--dur-hero` | plain text, no mask spans, no wrappers |
| `AnimatedNumber` | counts up over 1.4s | final value rendered, no observer |
| Card hover lift | `motion-safe:hover:-translate-y-(--lift)` | no transform at all — `motion-safe:` removes it, unlike the duration damper which would still snap |
| Image `group-hover:scale-[1.03]` | `motion-safe:` gated | none |
| `Marquee` | infinite CSS loop | animation off; becomes a real `overflow-x-auto` scroll region so content stays reachable |
| Gallery reel autoscroll | `scroll-snap` + drag | unchanged — it is user-driven scrolling, not animation |
| `#focus` GSAP pin | pinned scrub timeline | `gsap.matchMedia()` branch: no pin, no scrub. Sections stack and appear normally |
| `#impact` GSAP | scrubbed counters and mask | same — static final state, all content present |
| Mesh bloom | static (never animated on any setting) | unchanged |
| Grain | static | unchanged |
| Lightbox open | opacity + `scale(0.97→1)`, `--dur-std` | opacity only, no scale, `--dur-fast` |
| Lightbox frame step | opacity-only crossfade, `--dur-fast` | unchanged — it is already opacity-only, and the caption swaps with it either way |

**The rule underneath all of it:** reduced motion removes movement, never content and never function. No effect above is the only way to reach information.

---

### Performance budget and the grep gates

#### 1. Targets

Measured on a throttled mid-range Android profile (Moto G4 / 4× CPU throttle / Slow 4G in Lighthouse), and on desktop cable. These are gates, not aspirations — a slice does not ship red.

| Metric | Mobile | Desktop | Why this number |
|---|---|---|---|
| LCP | **≤ 2.2 s** | ≤ 1.2 s | The homepage LCP element is the hero `<h1>`, not an image — the hero is deliberately photograph-free. Text LCP behind two preloaded woff2 faces has no excuse to be slow |
| CLS | **≤ 0.02** | ≤ 0.02 | Structurally near-zero: every image is inside a `MediaFrame` with a fixed `aspect-[…]`, and `100svh` is used instead of `100vh` so the mobile URL-bar collapse cannot reflow the hero |
| TBT | **≤ 200 ms** | ≤ 100 ms | GSAP + ScrollTrigger init is the main thread cost. Both flagship scenes are on `/` only |
| INP | **≤ 150 ms** | ≤ 100 ms | Filters are `useState` over ≤5 items. Any INP failure means something is animating through React state |
| Lighthouse Perf | **≥ 90** | ≥ 95 | |
| Lighthouse A11y | **100** | 100 | Non-negotiable — the a11y chapter is written to reach exactly this |

#### 2. JavaScript budget

| Bundle | Gzipped budget | Contents |
|---|---|---|
| `index` (initial, every route) | **≤ 145 kB** | react + react-dom (~45), react-router (~12), motion (~34), lucide icons actually imported (~4 tree-shaken), radix primitives in use (~18), app code (~25) |
| `home` chunk | ≤ 40 kB | gsap core + ScrollTrigger (~33 gz), the two scene files |
| `stats` chunk | ≤ 105 kB | recharts. **Never in the initial bundle** |
| Total on `/` | ≤ 185 kB | |
| Total on `/stats` | ≤ 250 kB | |

**Per-dependency accounting for the two additions:**

| Package | Cost | Justification |
|---|---|---|
| `motion` | ~34 kB gz | Replaces every scroll/entrance/layout animation. Import from `motion/react` only; never the whole package. Prefer `m` + `LazyMotion` if the initial chunk exceeds budget — a documented escape hatch, not a default |
| `gsap` + `ScrollTrigger` | ~33 kB gz | Two scenes, both on `/`, both in the lazy `home` chunk. `import { gsap } from "gsap"` and `import { ScrollTrigger } from "gsap/ScrollTrigger"` — never `gsap/all`, which pulls every plugin |

**Removals that pay for them** (all verified zero-import): `axios` (~14 gz), `@tanstack/react-query` (~13), `zustand` (~1), `react-image-gallery` (~11), `embla-carousel-react` (~7). Net JS change is close to flat while the site gains every animation.

The gallery reel uses **native CSS `scroll-snap`**, which is why `embla` leaves. A transform-driven carousel would cost 7 kB and lose native momentum, native keyboard scrolling and native focus-scroll-into-view.

#### 3. The blur cap

`filter: blur()` is the single most expensive thing on this site. Rules:

| Rule | Value |
|---|---|
| Mesh bloom blur | `--mesh-blur: 80px` desktop, **48px below `48rem`** (set in a media query on `:root`) |
| Bloom bounds | `inset: -25%`. Never `inset: -100%` — the blurred layer's cost scales with its painted area, and a 3× oversized layer is 9× the pixels |
| Blur is **never animated or transitioned** | Animating a blur radius re-rasterises the layer every frame. The mesh is static on every breakpoint and every motion setting |
| `backdrop-blur` | Permitted on exactly two elements: the sticky navbar (`backdrop-blur-xl`) and the hero's live-event card (`backdrop-blur-xl`). Nowhere else |
| Blurred layers per viewport | **≤ 2**. One mesh `::before` plus at most one backdrop-blur |
| Mobile animation | The media query also sets `animation: none` on all three `mesh-*::before` layers |

#### 4. Layer promotion

| Rule | |
|---|---|
| `will-change` is applied **on hover-intent, removed after** — never sat on permanently | A permanent `will-change: transform` on 5 cards holds 5 GPU layers for the page's whole life |
| Cards use `transition-[transform,border-color,background-color,box-shadow]` | Explicit property list. `transition-all` animates `height`, `width` and `filter` too, and on a card with an image that is a paint storm |
| The GSAP pinned element gets `will-change: transform` from `gsap`'s own pin machinery | Do not add it by hand as well |
| Only `transform` and `opacity` are animated anywhere | No animated `top`, `left`, `width`, `height`, `margin`, `filter` or `box-shadow`. The one apparent exception — the card's `box-shadow` on hover — is a 180 ms discrete change on ≤5 elements, not a scrubbed animation |
| `isolation: isolate` on `.mesh-*` and on `cardRoot` | Creates a stacking context so `z-index` inside a card cannot escape and fight the navbar |

#### 5. Offscreen work must stop

| Loop | Pause mechanism |
|---|---|
| `Marquee` | `IntersectionObserver` → `animation-play-state: paused` when offscreen. Also paused on `hover` and `focus-within` |
| `AnimatedNumber` | Runs once, `whileInView` + `once: true`. Never restarts |
| GSAP ScrollTriggers | ScrollTrigger only evaluates active triggers; both scenes are killed by `gsap.context()` cleanup on unmount |
| Live-dot pulse | CSS `animation`, and it exists **only** when the featured event is genuinely today. Otherwise the element is not rendered |
| Everything else | There is no `setInterval`, no `requestAnimationFrame` loop and no polling anywhere in the app. If one appears, it is a defect |

One shared `IntersectionObserver` per concern, never one per element: `AnchorNav` uses a single observer over all twelve section targets with `rootMargin: "-45% 0px -55% 0px"`.

#### 6. No per-frame React state

The rule: **if a value changes every frame, it must never pass through `useState`.** A `setState` in a scroll handler re-renders the subtree 60×/second.

| Case | Wrong | Correct |
|---|---|---|
| Scroll progress bar | `useState` in an `onScroll` handler | `useScroll()` → `useTransform` → `<motion.div style={{ scaleX }} />`. `MotionValue`s write to the DOM outside React |
| Counting a stat up | `useState(count)` in a rAF loop | `useMotionValue` + `animate()` + `mv.on("change", v => node.textContent = …)` |
| Parallax on an image | `useState(offset)` | `useScroll({ target, offset })` → `useTransform` → `style={{ y }}` |
| Hover lift / image zoom | `onMouseEnter` → `setState` | CSS `group-hover:` + `motion-safe:`. Zero JS |
| Entrance on scroll | `useState(visible)` + observer | `whileInView` + `viewport={viewportOnce}` |
| Reordering / shared element | manual measure + `setState` | `layoutId` + `AnimatePresence` |
| Active anchor section | `useState` per scroll event | one `IntersectionObserver`, `setState` only when the active id actually changes (≈12 updates for the whole page) |
| Pinned scrub scene | `useScroll` + 40 `useTransform`s | GSAP timeline with `scrub: 1`. This is precisely why GSAP earns its place for these two scenes |
| Lightbox index | — | `useState` is **correct** here: it changes on keypress, not per frame |

`useState` is right for discrete user events. It is wrong for continuous values. That is the whole rule.

#### 7. Images

| Rule | |
|---|---|
| Every `<img>` is inside a `MediaFrame` with a fixed `aspect-[…]` | Structural CLS elimination. Enforced by a grep gate |
| `loading="lazy"` on everything except one | |
| **Exactly one `priority` (eager) image per document**, and only above the fold | On `/` that is **zero** — the hero is typographic. On a detail route it is the single cover image |
| `decoding="async"` everywhere | |
| Unsplash params applied by the component, not the caller | `?auto=format&fit=crop&w=1200&q=72`; thumbnails `w=640`; the lightbox `w=1600`. All 20 bare URLs in the mocks currently fetch full-resolution originals — this is the single largest byte win available |
| Local `public/` assets | Converted to `.webp` at 1400px (see the asset pipeline in the manifest chapter). `download.png` (259×194) is deleted — it is too small for any frame in the system |
| No `<picture>`, no `srcset` | Unsplash's `w=` param plus one fixed frame width per breakpoint is sufficient, and `srcset` for a 4/3 card is complexity with no measurable return here |

#### 8. Fonts

Two variable faces. Both are self-hosted via Fontsource, so there is no third-party connection to warm up.

```html
<link rel="preload" as="font" type="font/woff2" crossorigin
      href="/fonts/inter-latin-wght.woff2">
<link rel="preload" as="font" type="font/woff2" crossorigin
      href="/fonts/archivo-latin-standard.woff2">
```

Both are copied into `public/fonts/` by the one-time `cp` in Part 7 §3.4, so the paths are unhashed, stable, and identical to the `src:` in `@font-face`. **Part 7 owns these two filenames** — `archivo-latin-standard.woff2` carries the `wdth` axis the display type depends on; the `wght` file does not, and every `font-stretch` utility silently no-ops on it (ruling **R37**).

| Rule | |
|---|---|
| Latin subset only | The site is English-only. Shipping the full range doubles the payload for glyphs nobody renders |
| `font-display: swap` | Fontsource's default. The hero H1 is the LCP element, so a blocking font is a direct LCP regression |
| Two families, no more | `--font-sans` (Inter Variable) and `--font-display` (Archivo Variable) |
| `@fontsource/inter` (static) is removed | It duplicated the variable package and was imported for side effects at `src/main.tsx:4`, which is also one of the two current TypeScript errors |
| Archivo must be imported as `wdth.css` | The default `index.css` entry ships the `wght` axis only, so every `font-stretch-*` utility silently no-ops. See stylesheet §5 |

#### 9. Code splitting

```tsx
// src/routes/AppRoutes.tsx
const HomePage = lazy(() => import("@/pages/HomePage"))
const StatsPage = lazy(() => import("@/pages/Stats/StatsPage"))
```

| Route | Split? | Reason |
|---|---|---|
| `/` | **yes** | Sole owner of gsap + ScrollTrigger (~33 kB gz). No other route may import gsap |
| `/stats` | **yes** | Sole owner of recharts (~105 kB gz) — the single largest dependency in the tree, needed by one route |
| everything else (13 routes) | **no** | Each is a few kB of JSX over shared components. Splitting them adds 13 network round-trips to save nothing, and every one becomes a visible spinner on a slow connection |

- `<Suspense fallback={<LoadingState variant="page" />}>` wraps `<Routes>`, so a split-chunk fetch shows the skeleton that matches the page's real shape.
- `/` is split *and* is the entry route, which looks contradictory. It is not: the gsap chunk is fetched in parallel with the initial render, and the hero — the LCP element — is plain text that does not wait on it. The two scenes are the fourth and eighth bands, far below the fold.

#### 10. Grep gates

Each command must print **nothing**. Run as one block; any output blocks the slice.

```bash
# 1. No hardcoded hex outside the one stylesheet that owns color.
grep -rnE '#[0-9a-fA-F]{3,8}\b' src --include='*.tsx' --include='*.ts' | grep -v 'src/index.css'

# 2. No cyan. The old accent, 40+ occurrences today.
grep -rnE '\b(bg|text|border|ring|from|to|fill|stroke)-cyan-' src

# 3. No slate. The old neutral ramp.
grep -rnE '\b(bg|text|border|ring|from|to)-slate-' src

# 4. No literal old background.
grep -rn '050816' src

# 5. gsap imported by EXACTLY the two flagship scene files.
grep -rln "from \"gsap" src | grep -vE 'src/components/scenes/(FocusScene|ImpactScene)\.tsx$'

# 6. No raw ISO date rendered. Catches {event.startDate} / {a.achievedAt} in JSX.
grep -rnE '\{[a-zA-Z.]*(startDate|endDate|achievedAt)\}' src --include='*.tsx'

# 7. No dead links.
grep -rn 'href="#"' src

# 8. No copy-pasted page shell. The layout owns min-height.
grep -rn 'min-h-screen' src --include='*.tsx' | grep -v 'src/components/layout/'

# 9. Every <img> goes through MediaFrame.
grep -rn '<img' src --include='*.tsx' | grep -vE 'src/components/media/MediaFrame\.tsx|src/components/gallery/GalleryLightbox\.tsx'

# 10. No inline transition objects — contract C4.
grep -rnE 'transition=\{\{' src --include='*.tsx'

# 11. No arbitrary durations or easings; both must come from tokens, in (--x) form.
#     Catches literal ms AND the var() long-hand, which works but is noise: duration-(--dur-std) is canon.
grep -rnE '(duration|ease|delay)-\[' src --include='*.tsx'

# 12. The legacy custom-property syntax that emits nothing in Tailwind 4.
grep -rnE '\-\[--[a-z-]+\]' src --include='*.tsx'

# 13. No component re-declares the focus ring — contract C1.
grep -rn 'focus-visible:outline' src --include='*.tsx'

# 14. No mock file imported outside the one selector module.
grep -rn 'from "@/mock/' src --include='*.tsx' | grep -v 'src/lib/content.ts'

# 15. No dead deps left in the manifest.
grep -nE '"(axios|zustand|@tanstack/react-query|react-image-gallery|embla-carousel-react|tailwindcss-animate|@fontsource/inter)"' package.json

# 16. The old dashboard container triplet, replaced by .shell.
grep -rn 'max-w-7xl' src --include='*.tsx'

# 17. The wrong name for the building — contract R8.
grep -rn 'Sports Activities Centre' src

# 18. var() long-hand anywhere a bare (--x) works. Same reason as gate 11, wider net.
grep -rnE '\[var\(--' src --include='*.tsx'
```

Gates 11, 12 and 18 exist because Tailwind 4 changed the arbitrary-value syntax and three section chapters were authored across the change:

| Form | Compiles? | Verdict |
|---|---|---|
| `-translate-y-[--lift]` | **no — emits nothing** | banned; gate 12 |
| `duration-[var(--dur-std)]` | yes | banned as noise; gates 11 and 18 |
| `-translate-y-(--lift)`, `duration-(--dur-std)` | yes | **canon** |

A silent no-op is worse than a build error: `py-[--space-section]` looks like a spacing rule in review and ships as zero padding.

#### 11. Build gates

```bash
npx tsc -b --noEmit        # must be clean. 2 errors today:
                           #   src/main.tsx:4          TS2882 side-effect import of @fontsource/inter
                           #   src/pages/HomePage.tsx:1 TS6133 unused React import
npm run lint               # must be clean. 3 errors today, all react-refresh/only-export-components:
                           #   badge.tsx:49, button.tsx:65, navigation-menu.tsx:163
npm run build              # must succeed
npx playwright test        # must pass, see the verification chapter
```

| Result | Consequence |
|---|---|
| `tsc` or `lint` red | **Nothing proceeds.** Slice 0 exists solely to clear these five, before any visual work |
| A grep gate prints output | The slice that introduced it is not done |
| A Lighthouse target missed | Fix or explicitly re-baseline the number in this chapter with the measurement attached. Never silently lower it |

---

### The verification suite — Playwright

`tests/` does not exist today, and there is no test runner in `package.json`. Every test below locks down a specific defect named in this spec; the comment on each says which.

Install: `npm i -D @playwright/test && npx playwright install --with-deps chromium`

Scripts to add:

```json
"test": "playwright test",
"test:ui": "playwright test --ui",
"test:update": "playwright test --update-snapshots"
```

---

#### 1. `playwright.config.ts`

```ts
import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],

  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
  },

  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 5"] },
    },
    {
      // Verifies the reduced-motion contract is real, not aspirational.
      name: "reduced-motion",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
      testMatch: /reduced-motion\.spec\.ts/,
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
```

---

#### 2. `tests/routes.ts` — the shared route table

H1 strings are quoted from the route chapter, which owns page copy. Slugs are real records from `src/mock/*`.

```ts
// tests/routes.ts
export const ROUTES = [
  { path: "/",                                  h1: "Every court, every lane, in motion.", title: /SAC Goa — Student Activity Centre/ },
  { path: "/activities",                        h1: "Where the campus trains",             title: /^Activities · SAC Goa$/ },
  { path: "/activities/basketball",             h1: "Basketball",                          title: /^Basketball · Activities · SAC Goa$/ },
  { path: "/stats",                             h1: "The numbers behind the noise",        title: /^Participation stats · SAC Goa$/ },
  { path: "/gallery",                           h1: "Frames from the floor",               title: /^Gallery · SAC Goa$/ },
  { path: "/gallery/swimming",                  h1: "Swimming",                            title: /^Swimming photos · Gallery · SAC Goa$/ },
  { path: "/gallery/events",                    h1: "Every event, in frames",              title: /^Event photos · Gallery · SAC Goa$/ },
  { path: "/gallery/events/interbits-football",  h1: "Inter-BITS Football Tournament",      title: /Gallery · SAC Goa$/ },
  { path: "/events",                            h1: "What the SAC runs",                   title: /^Events · SAC Goa$/ },
  { path: "/events/swimming-championship",      h1: "Swimming Championship",               title: /^Swimming Championship · Events · SAC Goa$/ },
  { path: "/people",                            h1: "Who runs it",                         title: /^People · SAC Goa$/ },
  { path: "/people/incharges",                  h1: "SAC in-charges",                      title: /^Faculty in-charges · People · SAC Goa$/ },
  { path: "/people/committee",                  h1: "SAC committee",                       title: /^Student committee · People · SAC Goa$/ },
  { path: "/achievements",                      h1: "What the campus brought back",        title: /^Achievements · SAC Goa$/ },
  { path: "/contact",                           h1: "Talk to the SAC",                     title: /^Contact · SAC Goa$/ },
  { path: "/nonsense-url-does-not-exist",       h1: "That route does not exist",           title: /^Page not found · SAC Goa$/ },
] as const

export const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet",  width: 768,  height: 1024 },
  { name: "mobile",  width: 390,  height: 844 },
] as const

/** The last day the mock calendar had a live event. Used with page.clock so the
 *  three event-tense branches are all testable — see the tense block below. */
export const LIVE_DAY = new Date("2026-08-05T09:00:00+05:30")
```

**Why `LIVE_DAY` exists.** `mockEvents` ends at `2026-08-05`, so from `2026-08-06` onward every event is past and the `"today"` / `"upcoming"` branches of `getFeaturedEvent()` are unreachable at real time. Playwright's `page.clock` pins the clock so all three branches are covered without touching app code and without the suite rotting a day later. **No test asserts tense against the real clock.**

---

#### 3. `tests/smoke.spec.ts`

```ts
import { test, expect, type Page, type ConsoleMessage } from "@playwright/test"
import { LIVE_DAY, ROUTES } from "./routes"

/* ── console + network guard ──────────────────────────────────────────────
   Attached per test, asserted at the end. Filters nothing: a warning we
   choose to accept must be fixed or explicitly listed here with a reason. */
function guard(page: Page) {
  const errors: string[] = []
  const failed: string[] = []
  page.on("console", (m: ConsoleMessage) => {
    if (m.type() === "error" || m.type() === "warning") errors.push(`${m.type()}: ${m.text()}`)
  })
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`))
  page.on("requestfailed", (r) => failed.push(`${r.failure()?.errorText} ${r.url()}`))
  page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`) })
  return { errors, failed }
}

test.describe("baseline", () => {
  // Locks down: the unlabelled Radix dialog warning from GalleryImageDialog.tsx,
  // and 20 mock URLs that currently 200 only because they fetch full-res originals.
  test("/ loads with zero console errors and zero failed requests", async ({ page }) => {
    const g = guard(page)
    await page.goto("/")
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForLoadState("networkidle")
    expect(g.errors, `console output:\n${g.errors.join("\n")}`).toEqual([])
    expect(g.failed, `failed requests:\n${g.failed.join("\n")}`).toEqual([])
  })

  // Locks down: 11 hand-rolled header blocks with H1 at five different sizes,
  // and the missing catch-all route (unmatched URLs render an empty <main> today).
  for (const r of ROUTES) {
    test(`${r.path} renders exactly one h1 and the right title`, async ({ page }) => {
      const g = guard(page)
      await page.goto(r.path)
      const h1 = page.getByRole("heading", { level: 1 })
      await expect(h1).toHaveCount(1)
      await expect(h1).toHaveText(r.h1)
      await expect(page).toHaveTitle(r.title)
      await expect(page.locator("main")).toBeVisible()
      expect(g.errors, `${r.path}:\n${g.errors.join("\n")}`).toEqual([])
    })
  }

  // Locks down: every page sharing <title>sac-webapp</title>.
  test("no two routes share a title", async ({ page }) => {
    const titles: string[] = []
    for (const r of ROUTES) {
      await page.goto(r.path)
      titles.push(await page.title())
    }
    expect(new Set(titles).size).toBe(ROUTES.length)
  })

  // Locks down: no skip link exists today, so a keyboard user tabs 7 nav
  // links on every route.
  test("skip link is the first focusable element and moves focus to main", async ({ page }) => {
    await page.goto("/")
    await page.keyboard.press("Tab")
    const skip = page.getByRole("link", { name: /skip to content/i })
    await expect(skip).toBeFocused()
    await skip.press("Enter")
    await expect(page.locator("#main")).toBeFocused()
  })
})

const NAV = ["Activities", "Events", "Gallery", "People", "Impact"] as const

test.describe("navigation", () => {
  test("the bar renders exactly five links", async ({ page }) => {
    await page.goto("/")
    const nav = page.getByRole("navigation", { name: "Primary" })
    await expect(nav.getByRole("link")).toHaveCount(NAV.length)
    for (const label of NAV) await expect(nav.getByRole("link", { name: label })).toBeVisible()
  })

  // Locks down: 12 homepage bands with no in-page navigation.
  test("navbar anchor scrolls on /", async ({ page }) => {
    await page.goto("/")
    const before = await page.evaluate(() => window.scrollY)
    await page.getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Activities" }).click()
    await expect(page).toHaveURL(/#activities$/)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before + 200)
    // scroll-mt clears the 64px solid header, so the heading is not tucked under it.
    const box = await page.locator("#activities").boundingBox()
    expect(box!.y).toBeGreaterThanOrEqual(0)
    expect(box!.y).toBeLessThan(90)
  })

  // Locks down: an anchor entered from a different route must land scrolled,
  // not at the top of / with a dead hash.
  test("/#activities entered from /contact lands scrolled", async ({ page }) => {
    await page.goto("/contact")
    await page.getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Activities" }).click()
    await expect(page).toHaveURL(/\/#activities$/)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200)
    await expect(page.locator("#activities")).toBeInViewport()
  })

  test("route nav from a deep page returns to a top-scrolled page", async ({ page }) => {
    await page.goto("/activities/basketball")
    await page.evaluate(() => window.scrollTo(0, 800))
    await page.getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Gallery" }).click()
    await expect(page).toHaveURL("/gallery")
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50)
  })

  // One motion.span with layoutId="nav-underline" — active state must not be
  // colour-only (WCAG 1.4.1).
  test("the active link is marked, not just recoloured", async ({ page }) => {
    await page.goto("/gallery")
    const active = page.getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Gallery" })
    await expect(active).toHaveAttribute("aria-current", "page")
  })

  // Locks down: Navbar.tsx:54 renders SheetContent with no SheetTitle, so the
  // panel is announced unlabelled; and the 36px trigger (p-2 around a 20px icon).
  test("mobile menu: opens, is labelled, Escape closes, focus returns", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/")
    const trigger = page.getByRole("button", { name: "Open menu" })

    const box = await trigger.boundingBox()
    expect(box!.width).toBeGreaterThanOrEqual(44)
    expect(box!.height).toBeGreaterThanOrEqual(44)
    await expect(trigger).toHaveAttribute("aria-expanded", "false")

    await trigger.click()
    const dialog = page.getByRole("dialog", { name: "Site menu" })
    await expect(dialog).toBeVisible()
    await expect(trigger).toHaveAttribute("aria-expanded", "true")
    for (const label of NAV) await expect(dialog.getByRole("link", { name: label })).toBeVisible()
    // The sample email must carry its disclosure label.
    await expect(dialog.getByText(/sample contact data/i)).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(dialog).not.toBeVisible()
    await expect(trigger).toBeFocused()
  })

  // The overlay exit is duration-0 on purpose: the Radix scroll lock must be
  // released before the hash scroll runs, or the jump lands at the wrong offset.
  test("an anchor tapped in the mobile overlay actually scrolls", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/")
    await page.getByRole("button", { name: "Open menu" }).click()
    await page.getByRole("dialog", { name: "Site menu" })
      .getByRole("link", { name: "People" }).click()
    await expect(page.getByRole("dialog")).not.toBeVisible()
    await expect(page.locator("#people")).toBeInViewport()
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden")
  })

  // FloatingActionButton.tsx:15 links to /report, which has no route — a dead
  // CTA on every page of the site.
  test("the floating action button is gone", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("link", { name: /report/i })).toHaveCount(0)
  })

  // Locks down: breadcrumbs are plain TEXT, not links
  // (ActivityDetailPage.tsx:25, StatsPage.tsx:33).
  test("breadcrumbs are real links and the last crumb is aria-current", async ({ page }) => {
    await page.goto("/activities/basketball")
    const crumbs = page.getByRole("navigation", { name: /breadcrumb/i })
    await expect(crumbs.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/")
    await expect(crumbs.getByRole("link", { name: "Activities" })).toHaveAttribute("href", "/activities")
    await expect(crumbs.locator('[aria-current="page"]')).toHaveText("Basketball")
    await crumbs.getByRole("link", { name: "Activities" }).click()
    await expect(page).toHaveURL("/activities")
  })

  // Locks down: ActivityDetailPage.tsx:104-127 "Gallery Preview" repeats
  // coverImageUrl three times with no alt and no link anywhere.
  test("activity → detail → gallery detail chain", async ({ page }) => {
    await page.goto("/activities")
    await page.getByRole("link", { name: /Basketball/ }).first().click()
    await expect(page).toHaveURL("/activities/basketball")

    const preview = page.getByRole("region", { name: /photos/i })
    const imgs = preview.getByRole("img")
    await expect(imgs).toHaveCount(3)
    // Three DISTINCT images, not coverImageUrl three times.
    const srcs = await imgs.evaluateAll((els) => els.map((e) => (e as HTMLImageElement).src))
    expect(new Set(srcs).size).toBe(3)
    for (const alt of await imgs.evaluateAll((els) => els.map((e) => (e as HTMLImageElement).alt))) {
      expect(alt.trim().length).toBeGreaterThan(0)
    }

    await preview.getByRole("link", { name: /all .*photos/i }).click()
    await expect(page).toHaveURL("/gallery/basketball")
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Basketball")
  })
})

test.describe("gallery lightbox", () => {
  // Locks down all five GalleryImageDialog.tsx defects at once.
  test("open, advance, counter, wrap, Escape, focus restore", async ({ page }) => {
    await page.goto("/gallery/basketball")
    const tiles = page.getByRole("button", { name: /^Open image:/ })
    await expect(tiles).toHaveCount(3)

    const first = tiles.first()
    await first.click()
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()

    // Defect 1: was announced unlabelled — no DialogTitle, no DialogDescription.
    await expect(dialog).toHaveAccessibleName("Inter-BITS Basketball Finals")
    await expect(dialog).toHaveAccessibleDescription("Image 1 of 3")
    await expect(dialog.getByText("1 / 3")).toBeVisible()

    // Defect 4: object-cover cropped the full-size image.
    await expect(dialog.getByRole("img")).toHaveCSS("object-fit", "contain")

    // Defects 2 + 3: no index tracked, so prev/next were impossible.
    await page.keyboard.press("ArrowRight")
    await expect(dialog.getByText("2 / 3")).toBeVisible()
    await expect(dialog).toHaveAccessibleName("Practice Session")

    await page.keyboard.press("End")
    await expect(dialog.getByText("3 / 3")).toBeVisible()
    await page.keyboard.press("ArrowRight")           // wraps
    await expect(dialog.getByText("1 / 3")).toBeVisible()
    await page.keyboard.press("ArrowLeft")            // wraps backwards
    await expect(dialog.getByText("3 / 3")).toBeVisible()

    // Defect 5: the dialog unmounted synchronously, so focus never returned.
    await page.keyboard.press("Escape")
    await expect(dialog).not.toBeVisible()
    await expect(first).toBeFocused()
  })
})

test.describe("filters", () => {
  // Locks down: the phantom "Recreation" chip (categoryData lists it; zero
  // activities carry it) and a filter row with no empty state.
  test("activities chips derive from the data and change the grid", async ({ page }) => {
    await page.goto("/activities")
    const group = page.getByRole("group", { name: /filter activities by category/i })
    await expect(group.getByRole("button")).toHaveCount(3)   // All, Sports, Fitness
    await expect(group.getByRole("button", { name: /recreation/i })).toHaveCount(0)

    const cards = page.getByRole("listitem").filter({ has: page.getByRole("heading", { level: 3 }) })
    await expect(cards).toHaveCount(5)

    await group.getByRole("button", { name: "Fitness" }).click()
    await expect(group.getByRole("button", { name: "Fitness" })).toHaveAttribute("aria-pressed", "true")
    await expect(group.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false")
    await expect(cards).toHaveCount(2)                       // Swimming, Gym
    await expect(page.getByRole("heading", { name: "Swimming", level: 3 })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Basketball", level: 3 })).toHaveCount(0)

    await group.getByRole("button", { name: "Sports" }).click()
    await expect(cards).toHaveCount(3)                       // Basketball, Football, Badminton
  })

  // Three filters, all with a <legend> — the level row has no label today while
  // Activity and Year do. Filters live in the URL so a result is shareable.
  test("achievements filters are labelled and round-trip through the URL", async ({ page }) => {
    await page.goto("/achievements")
    const cards = page.getByRole("listitem")
    await expect(cards).toHaveCount(5)

    for (const name of ["Level", "Activity", "Year"]) {
      await expect(page.getByRole("group", { name })).toBeVisible()
    }
    // Years are sorted descending, not left in data order (2025, 2024, 2026).
    const years = await page.getByRole("group", { name: "Year" }).getByRole("button").allInnerTexts()
    expect(years).toEqual(["All", "2026", "2025", "2024"])

    await page.getByRole("group", { name: "Level" }).getByRole("button", { name: "National" }).click()
    await expect(page).toHaveURL(/level=National/)
    await expect(cards).toHaveCount(2)
    await expect(page.getByText(/2 of 5 results/i)).toBeVisible()

    // Deep-linking the same filter reproduces the same result set.
    await page.goto("/achievements?level=National")
    await expect(cards).toHaveCount(2)
    await expect(page.getByRole("group", { name: "Level" }).getByRole("button", { name: "National" }))
      .toHaveAttribute("aria-pressed", "true")
  })

  // ?level=Campus&year=2025 matches nothing in the mock data. This page is the
  // one place the empty state is reachable today; it renders blank right now.
  test("a no-result filter combination shows an empty state with a working reset", async ({ page }) => {
    await page.goto("/achievements?level=Campus&year=2025")
    await expect(page.getByRole("listitem")).toHaveCount(0)
    const empty = page.getByText(/no results match those filters/i)
    await expect(empty).toBeVisible()
    await expect(page.getByText(/five results in total/i)).toBeVisible()

    await page.getByRole("button", { name: /clear filters/i }).click()
    await expect(page.getByRole("listitem")).toHaveCount(5)
    await expect(page).toHaveURL(/\/achievements$/)          // params cleared, not just state
  })

  // AchievementCard.tsx:13 uses a cyan pill; imageUrl is populated on ZERO
  // records, so no card may reserve an image slot.
  test("achievement cards render no image slot", async ({ page }) => {
    await page.goto("/achievements")
    await expect(page.getByRole("listitem").getByRole("img")).toHaveCount(0)
  })
})

test.describe("events tense", () => {
  // Locks down: EventsPage.tsx:84 "Upcoming" neither filters by date nor sorts,
  // and duplicates the featured record.
  // Clock pinned to LIVE_DAY so the "today" branch is reachable at all.
  test.describe("on the live day", () => {
    test.beforeEach(async ({ page }) => {
      await page.clock.install({ time: LIVE_DAY })
    })

    test("only the current event is upcoming, and it is not duplicated", async ({ page }) => {
      await page.goto("/events")
      const upcoming = page.getByRole("region", { name: /coming up/i })
      await expect(upcoming.getByRole("listitem")).toHaveCount(1)
      await expect(upcoming).toContainText("Swimming Championship")
      await expect(upcoming).not.toContainText("Inter-BITS Football Tournament")
      await expect(upcoming).not.toContainText("SAC Fitness Challenge")

      // Newest first, per getPastEvents().
      const past = page.getByRole("region", { name: /past|concluded|archive/i })
      await expect(past.getByRole("listitem")).toHaveCount(2)
      const rows = await past.getByRole("listitem").allInnerTexts()
      expect(rows[0]).toContain("SAC Fitness Challenge")
      expect(rows[1]).toContain("Inter-BITS Football Tournament")

      // The featured record must not repeat inside the list below it.
      await expect(page.getByRole("heading", { name: "Swimming Championship" })).toHaveCount(2)
    })

    // isFeatured is true on TWO past events and false on the current one, so a
    // selector that honours the flag puts a concluded event under "what's on".
    test("the featured event ignores isFeatured and follows the date", async ({ page }) => {
      await page.goto("/")
      const band = page.locator("#events")
      await expect(band).toContainText(/HAPPENING TODAY/i)
      await expect(band).toContainText("Swimming Championship")
      await expect(band).toContainText("5 Aug 2026")
      await expect(band).toContainText("Aquatics Complex")
      await expect(band).not.toContainText("Inter-BITS Football")
    })

    test("the pulse strip reports the live event", async ({ page }) => {
      await page.goto("/")
      const strip = page.getByRole("region", { name: /live campus pulse/i })
      await expect(strip).toContainText("Live today")
      await expect(strip).toContainText("Swimming Championship")
    })
  })

  // The default render of the site as shipped: every event is past. This is not
  // an edge case to tolerate, it is what a visitor sees today.
  test.describe("after the calendar runs out", () => {
    test.beforeEach(async ({ page }) => {
      await page.clock.install({ time: new Date("2026-09-01T09:00:00+05:30") })
    })

    test("/events shows an empty state and never labels a past event upcoming", async ({ page }) => {
      await page.goto("/events")
      const upcoming = page.getByRole("region", { name: /coming up/i })
      await expect(upcoming.getByRole("listitem")).toHaveCount(0)
      await expect(upcoming).toContainText(/no upcoming events/i)
      await expect(page.getByRole("region", { name: /past|concluded|archive/i })
        .getByRole("listitem")).toHaveCount(3)
      await expect(page.locator("main")).not.toContainText(/upcoming|next up|don't miss|register/i)
    })

    test("the homepage events band degrades to a recap, it does not vanish", async ({ page }) => {
      await page.goto("/")
      const band = page.locator("#events")
      await expect(band).toBeVisible()
      await expect(band).toContainText(/LATEST RECAP/i)
      await expect(band.getByRole("heading", { level: 2 })).toBeVisible()
    })

    test("the pulse strip says the season wrapped", async ({ page }) => {
      await page.goto("/")
      await expect(page.getByRole("region", { name: /live campus pulse/i }))
        .toContainText(/season wrap/i)
    })
  })

  // Locks down: raw ISO dates at EventDetailPage.tsx:61 and AchievementCard.tsx:31.
  // Real clock — this has nothing to do with tense.
  test("no route renders a raw ISO date", async ({ page }) => {
    for (const path of ["/", "/events", "/events/swimming-championship", "/achievements"]) {
      await page.goto(path)
      const body = await page.locator("main").innerText()
      expect(body, `raw ISO date on ${path}`).not.toMatch(/\b20\d{2}-\d{2}-\d{2}\b/)
    }
  })

  // Every activity has one timing, at dayOfWeek 1. On any other weekday the
  // honest answer is "unknown", so the site must never print "Closed".
  test("no activity claims an open/closed state it cannot support", async ({ page }) => {
    await page.clock.install({ time: new Date("2026-08-05T09:00:00+05:30") }) // a Wednesday
    await page.goto("/activities")
    await expect(page.locator("main")).not.toContainText(/closed now|currently closed/i)
    await expect(page.getByText("Open now")).toHaveCount(0)
    await expect(page.locator("main")).toContainText(/Monday/i)   // hours are labelled by their day
  })
})

test.describe("stats", () => {
  // Locks down EIGHT dead controls at StatsPage.tsx:46,49,53,107,128,149,167,236
  // (no onClick, zero useState in a 310-line file). Seven are DELETED — there is
  // no time-ranged data to switch to, so wiring them up would be a second lie.
  // The test asserts they are gone, not that they work.
  test("the seven fake controls no longer exist", async ({ page }) => {
    await page.goto("/stats")
    for (const name of [/this month/i, /this semester/i, /export report/i, /^view all$/i]) {
      await expect(page.getByRole("button", { name })).toHaveCount(0)
    }
    // "View All" on the table became a real link instead.
    await expect(page.getByRole("link", { name: /all activities/i }))
      .toHaveAttribute("href", "/activities")
  })

  // The page's entire interactivity budget: one sort toggle that actually sorts.
  test("the sort toggle reorders the participation bars", async ({ page }) => {
    await page.goto("/stats")
    const region = page.getByRole("region", { name: /participation by activity/i })

    await region.getByRole("button", { name: /most first/i }).click()
    const byVolume = await region.getByRole("row").allInnerTexts()
    expect(byVolume[1]).toContain("Basketball")     // 820, the highest

    await region.getByRole("button", { name: /a–z|a-z/i }).click()
    const alpha = await region.getByRole("row").allInnerTexts()
    expect(alpha[1]).toContain("Badminton")         // alphabetically first
    expect(alpha).not.toEqual(byVolume)
  })

  test("no button on /stats is a no-op", async ({ page }) => {
    await page.goto("/stats")
    for (const btn of await page.getByRole("button").all()) {
      const label = (await btn.textContent())?.trim()
      await expect(btn, `dead control: ${label}`).toBeEnabled()
    }
  })

  // Each chart is aria-hidden, so the <details> table IS the accessible
  // representation. If it is missing, the chart is unreadable to a screen reader.
  test("every chart has a real table alternative", async ({ page }) => {
    await page.goto("/stats")
    const summaries = page.getByRole("group").getByText(/read as a table/i)
    await expect(summaries).toHaveCount(3)          // bars, donut, trend
    for (const s of await summaries.all()) {
      await s.click()
    }
    await expect(page.getByRole("table")).toHaveCount(4)   // 3 alternatives + band 5
    for (const t of await page.getByRole("table").all()) {
      await expect(t.locator("caption")).not.toBeEmpty()
      await expect(t.locator("th[scope]").first()).toBeAttached()
    }
  })

  // trendData has 11 entries. The chart shows a Dec tick with a null value and
  // the caption says so — the number is never padded with a zero.
  test("December is named as missing, not faked", async ({ page }) => {
    await page.goto("/stats")
    const trend = page.getByRole("region", { name: /monthly trend/i })
    await expect(trend).toContainText(/January to November\. December is not in the data set\./i)
    await trend.getByText(/read as a table/i).click()
    const dec = trend.getByRole("row").filter({ hasText: /December/i })
    await expect(dec).toContainText(/not recorded/i)
    await expect(dec).not.toContainText(/\b0\b/)
  })

  // "Recreation" is 15% of the donut and matches zero activities. It may appear
  // as a programme type, but must never be called a category or linked anywhere.
  test("Recreation is labelled honestly and links nowhere", async ({ page }) => {
    await page.goto("/stats")
    const donut = page.getByRole("region", { name: /programme share/i })
    await expect(donut).toContainText("Recreation")
    await expect(donut).toContainText(/programme type/i)
    await expect(donut.getByRole("link", { name: /recreation/i })).toHaveCount(0)
    // And it is never offered as a filter on the activities page.
    await page.goto("/activities")
    await expect(page.getByRole("button", { name: /recreation/i })).toHaveCount(0)
  })

  // Locks down StatsPage.tsx:84-86 — a hardcoded green up-arrow on all five
  // cards, including the one whose value is the word "Basketball".
  test("stat deltas follow their sign and the non-numeric card has no arrow", async ({ page }) => {
    await page.goto("/stats")
    const cards = page.getByRole("region", { name: /overview/i }).getByRole("listitem")
    await expect(cards).toHaveCount(5)

    const top = cards.filter({ hasText: /top activity|most participated/i })
    await expect(top).toContainText("Basketball")
    await expect(top).not.toContainText("NaN")
    await expect(top.locator("svg")).toHaveCount(0)          // no arrow at all
    await expect(top.getByText(/most participated/i)).toBeVisible()

    const active = cards.filter({ hasText: /active students/i })
    await expect(active).toContainText("+12.5%")
    await expect(active.locator("svg")).toHaveCount(1)
  })

  // Yoga and TT are chart labels only. Calling them activities would make the
  // site claim seven facilities when five exist.
  test("Yoga and TT appear in the chart but are never activities", async ({ page }) => {
    await page.goto("/stats")
    const bars = page.getByRole("region", { name: /participation by activity/i })
    await expect(bars).toContainText("Yoga")
    await expect(bars.getByRole("link", { name: /yoga|^TT$/i })).toHaveCount(0)
    await page.goto("/activities")
    await expect(page.locator("main")).not.toContainText(/Yoga|Table Tennis/i)
  })
})

test.describe("contact", () => {
  // Per the route chapter the form is a mailto: handoff, not a fake success
  // toast. Locks down: ZERO <form> elements exist anywhere in src/; three
  // unlabelled uncontrolled inputs (placeholder-as-label); "Send Message" has
  // no onClick and no type; address/phone/email are inert text.
  test("there is a real form and all three fields are labelled", async ({ page }) => {
    await page.goto("/contact")
    await expect(page.locator("form")).toHaveCount(1)
    const form = page.locator("form")
    for (const label of ["Name", "Email", "Message"]) {
      const field = form.getByLabel(label, { exact: true })
      await expect(field).toBeVisible()
      // A <label for> exists — placeholder-only labelling fails this.
      await expect(field).toHaveAccessibleName(label)
    }
  })

  test("submitting empty does not navigate and native validation blocks it", async ({ page }) => {
    await page.goto("/contact")
    const form = page.locator("form")
    await form.getByRole("button", { name: /open in mail/i }).click()

    await expect(page).toHaveURL(/\/contact$/)          // no navigation, no reload
    const name = form.getByLabel("Name", { exact: true })
    expect(await name.evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(false)
    expect(await name.evaluate((el: HTMLInputElement) => el.validationMessage)).not.toBe("")
    await expect(page.getByRole("status")).toHaveCount(0)
  })

  // minLength={20} on the message: a two-word message must not be accepted.
  test("a too-short message is rejected", async ({ page }) => {
    await page.goto("/contact")
    const form = page.locator("form")
    await form.getByLabel("Name", { exact: true }).fill("Arjun Mehta")
    await form.getByLabel("Email", { exact: true }).fill("f2023001@goa.bits-pilani.ac.in")
    const msg = form.getByLabel("Message", { exact: true })
    await msg.fill("hi")
    await form.getByRole("button", { name: /open in mail/i }).click()
    expect(await msg.evaluate((el: HTMLTextAreaElement) => el.validity.valid)).toBe(false)
    await expect(page.getByRole("status")).toHaveCount(0)
  })

  test("a valid submit shows the honest panel and makes no network request", async ({ page }) => {
    let requested = false
    page.on("request", (r) => { if (r.method() !== "GET") requested = true })

    await page.goto("/contact")
    const form = page.locator("form")
    await form.getByLabel("Name", { exact: true }).fill("Arjun Mehta")
    await form.getByLabel("Email", { exact: true }).fill("f2023001@goa.bits-pilani.ac.in")
    await form.getByLabel("Message", { exact: true })
      .fill("Asking about badminton court timings on Monday evenings.")
    await form.getByRole("button", { name: /open in mail/i }).click()

    // The honest confirmation panel — it must not claim delivery.
    const status = page.getByRole("status")
    await expect(status).toBeVisible()
    await expect(status).toContainText(/mail client should be open/i)
    await expect(status).not.toContainText(/\bsent\b|\bdelivered\b|we'll get back/i)
    await expect(status.getByRole("link", { name: /sac@goa\.bits-pilani\.ac\.in/ }))
      .toHaveAttribute("href", /^mailto:/)

    await expect(page).toHaveURL(/\/contact$/)   // the mailto: hand-off never navigates the SPA
    expect(requested, "the demo form must not issue a network request").toBe(false)
  })

  test("contact details are real links and no dead link survives", async ({ page }) => {
    await page.goto("/contact")
    await expect(page.getByRole("link", { name: /sac@goa\.bits-pilani\.ac\.in/ }).first())
      .toHaveAttribute("href", "mailto:sac@goa.bits-pilani.ac.in")
    await expect(page.getByRole("link", { name: /\+91 832 258 0000/ }))
      .toHaveAttribute("href", "tel:+918322580000")
    await expect(page.locator("address")).toBeVisible()

    // The three href="#" socials are deleted, not restyled — no real URLs exist.
    for (const a of await page.getByRole("link").all()) {
      const href = await a.getAttribute("href")
      expect(href, `dead link: ${await a.textContent()}`).not.toBe("#")
    }
    for (const name of [/instagram/i, /facebook/i, /linkedin/i]) {
      await expect(page.getByRole("link", { name })).toHaveCount(0)
    }
  })

  // The FAB's dead /report link is redirected rather than 404'd.
  test("/report redirects to /contact", async ({ page }) => {
    await page.goto("/report")
    await expect(page).toHaveURL(/\/contact$/)
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Talk to the SAC")
  })
})

test.describe("screenshots", () => {
  for (const r of ROUTES) {
    test(`visual ${r.path}`, async ({ page }, testInfo) => {
      await page.goto(r.path)
      await page.getByRole("heading", { level: 1 }).waitFor()
      // Freeze motion so a scroll-triggered reveal cannot race the capture.
      await page.emulateMedia({ reducedMotion: "reduce" })
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForLoadState("networkidle")
      await expect(page).toHaveScreenshot(
        `${testInfo.project.name}-${r.path.replace(/\W+/g, "_") || "root"}.png`,
        { fullPage: true, maxDiffPixelRatio: 0.01, animations: "disabled" },
      )
    })
  }
})
```

---

#### 4. `tests/reduced-motion.spec.ts`

The reduced-motion contract is the easiest part of this spec to claim and never verify. This file makes it falsifiable.

```ts
import { test, expect } from "@playwright/test"

test.use({ reducedMotion: "reduce" })

test("content is present without any scroll trigger firing", async ({ page }) => {
  await page.goto("/")
  // Every band's heading is visible in the DOM and opaque, before scrolling.
  for (const id of ["about", "activities", "events", "people", "gallery", "wins", "join"]) {
    const section = page.locator(`#${id}`)
    await expect(section.getByRole("heading", { level: 2 })).toHaveCSS("opacity", "1")
  }
})

test("the marquee is not animating and stays scrollable", async ({ page }) => {
  await page.goto("/")
  const track = page.locator('[data-slot="marquee-track"]')
  await expect(track).toHaveCSS("animation-name", "none")
  await expect(track.locator("xpath=..")).toHaveCSS("overflow-x", "auto")
})

test("the GSAP scenes do not pin", async ({ page }) => {
  await page.goto("/")
  await page.locator("#focus").scrollIntoViewIfNeeded()
  // No pin-spacer is injected, so the scene is a normal-flow section.
  await expect(page.locator(".pin-spacer")).toHaveCount(0)
  await expect(page.locator("#focus").getByRole("heading", { level: 2 })).toBeVisible()
})

test("counters show their final value immediately", async ({ page }) => {
  await page.goto("/")
  await page.locator("#impact").scrollIntoViewIfNeeded()
  await expect(page.locator("#impact")).toContainText("1,248+")
})

test("card hover applies no transform", async ({ page }) => {
  await page.goto("/activities")
  const card = page.getByRole("listitem").first()
  await card.hover()
  await expect(card.locator("a").first()).toHaveCSS("transform", "none")
})
```

---

#### 5. What is deliberately not tested

| Not tested | Why |
|---|---|
| The exact pin distances and scrub positions of the two GSAP scenes | Scroll-position assertions against a scrubbed timeline are the flakiest thing in a Playwright suite. What *is* tested: the scene renders, its content is reachable, and it does not pin under reduced motion |
| Mesh gradient and grain appearance | Covered by the full-page screenshots, which is the right tool for it |
| Recharts internals | Asserted through the visible `figcaption` values, never through SVG paths — that is also exactly how a screen reader consumes them |
| Loading states | All data is a static import; nothing on any current route is async. Faking a delay to test a spinner would test the fake |
| Lighthouse scores | Separate command (`npx lighthouse`), separate gate — it belongs in the perf chapter, not in a functional suite |

#### 6. Rules for anyone adding a test here

- Role- and label-based locators only. No CSS chains, no `nth-child`, no test-ids except the two `data-slot` hooks already in the codebase idiom.
- Web-first assertions only (`expect(locator)`, `expect.poll`). **No `waitForTimeout`.** A sleep in this suite is a bug report waiting to be filed.
- Every test names the defect it locks down in a comment. A test with no defect behind it is decoration.
- Mock-data counts are asserted as exact numbers (5 activities, 3 gallery images, 2 people per role, 5 achievements, 1 upcoming event). If the data changes, these tests must fail — that is their job.

---

## Appendix A — Open questions

Every judgement call the chapters raised, verbatim, in reading order, each with the ruling that closed it. **Nothing here is still open.** They are listed rather than deleted so that no decision looks quietly dropped, and so a reviewer who disagrees can see exactly what was weighed. Rulings live in Part 1 §5; a handful were settled by Part 7 instead, and say so.

**46 raised · 46 ruled · 0 open.** The build is unblocked end to end; no slice waits on a decision.

**The stylesheet — complete authored `src/index.css`**

1. --color-destructive is mapped to volt because no red exists in the palette; an aria-invalid field will ring in the same color as focus. Confirm that form errors carry literal message copy, or accept adding a single --color-alert token.

   → **Ruled — R15.** No red token is added. `/contact` uses native constraint validation, so every error is literal words beside the field.

2. --color-*: initial stops 362 legacy utility occurrences across 27 files from compiling. Confirm every page (including Navbar, Footer, FloatingActionButton) is rewritten in the same PR as this stylesheet.

   → **Answered — Part 7.** Slice 1 does the dependency surgery and slice 2 lands the stylesheet; all 27 files are rewritten before any visual work.

3. .light-section also rebinds the surface tokens (--color-deep, --color-raised), not just text and lines, so bg-deep cards invert automatically. Confirm that is wanted rather than a text-only inversion.

   → **Ruled — Part 1 §4.** Yes, surfaces invert too. That is what lets one `bg-deep` card work on both canvases with no conditional class.


**Section 1 — Hero**

4. Venue count: mockActivities has no venue field, so "3 venues" is derived from the distinct venue strings on mockEvents (Main Football Ground, SAC Gym, Aquatics Complex). It undersells 5 facilities - confirm, or swap the second stat to "2 categories" from getActivityCategories().

   → **Ruled — R11.** `5 activities · 2 categories`. `venues` is dropped.

5. The live-context card links to /events/{slug}. I treated it as context, not a third action, since the brief caps the section at two buttons - confirm a clickable card is acceptable.

   → **Ruled — R17.** Stays clickable. No button styling, so it reads as context, not a third CTA.

6. From 2026-08-06 onward the mock calendar is exhausted, so the hero permanently shows the Season break empty state. Either add a future event to mockEvents before launch or accept the empty card as the default render.

   → **Ruled — R1.** Both branches are specified; the season-break render is the shipped default, and one future mock event is the recommended, non-blocking fix.


**Section 2 — Live pulse strip**

7. The brief said the reduced-motion fallback is a 3-up grid, but the chip set is four items (event, open-now, top activity, participants). I made it 4-up on lg and 2x2 below, because dropping a chip to hit 3-up would silently delete a live datum. Confirm.

   → **Ruled — R13.** Four chips. `lg:grid-cols-4`, `grid-cols-2` below.


**Section 3 — What SAC is**

8. Principle numeral and title are both --text-title, separated only by color (volt vs fg) — no smaller numeral size exists in the type scale, and inventing one would break the six-value scale.

   → **Ruled — R18.** Both stay at `--text-title`. No seventh type size is invented, and colour carries no information here.

9. Principles stack until md (768) rather than sm (640): three 190px columns at 640px crowd a --text-title word. If you want 3-up on large phones, change md:grid-cols-3 to sm:grid-cols-3 and accept two-line titles.

   → **Ruled — R19.** `md` stands. Three 190px columns cannot hold a `--text-title` word plus two lines of body.

10. Copy hardcodes 'five' / 'two' / '05:00' / '23:00' as prose with a DEV-only assert against the mock, rather than interpolating selector output into the sentence — interpolation would make the paragraph read like a template.

   → **Ruled — R20.** Hardcoded prose, and the DEV-only assert is what makes that legitimate rather than lazy.


**Section 4 — Flagship pinned scene (GSAP)**

11. Order is category-grouped (Basketball, Football, Badminton, Swimming, Gym) via getActivityCategories().flatMap(getActivitiesByCategory) so fragment 01-05 matches Section 5 card order exactly — Section 5 must use the same expression, and must export ACTIVITY_GRID ('grid grid-cols-12 gap-x-6') and ACTIVITY_CELL ('col-span-4') as the single grid contract.

   → **Ruled — C5.** Adopted as a contract: one ordering expression, and `ACTIVITY_GRID` / `ACTIVITY_CELL` are exported constants.

12. Statement 'Eighteen hours' derives from Gym 05:00-23:00, but mock timings only carry dayOfWeek 1 (Monday); confirm the 5 AM-11 PM window generalises before this ships as a headline.

   → **Ruled — R21.** Kept, scoped to the Gym. It is a true statement about one facility, never generalised and never computed.

13. Vertical continuity into Section 5 is compressed (26vh fragment rows here vs the cards' aspect-[4/5]); only column x and width match exactly, because two full-ratio rows do not fit in 100vh.

   → **Ruled — R22.** The break is accepted. A pinned scene and a browsable grid do different jobs; the section gap resets the eye.


**Section 5 — Explore activities**

14. Right stack uses a single `lg:auto-rows-fr` rule instead of per-count layouts, so filtering to Fitness (2 records) yields one 486x863 portrait compact beside the 690x863 feature. I judged that a legitimate two-up spread; if you want the sparse filters to fall back to an even 2-up, that is a second rule to add.

   → **Ruled — R23.** Superseded: below 3 results every card renders `variant="compact"` into `lg:grid-cols-2`.

15. I amended `--shadow-glow` to read its volt percentage from a `--glow-mix` var (default 28%) so the card's 40%-strength hover glow needs no bespoke `shadow-[...]`. This is a one-line change to the locked shadow token, not a fourth recipe.

   → **Ruled — R10.** `--glow-mix` accepted; Part 2 defines it at `28%`.

16. Mobile rail uses one uniform `aspect-[3/2]` for all five cards including the feature, because a taller first item breaks a snap rail. The feature therefore has no visual promotion below 640px other than being first.

   → **Ruled — R24.** Uniform rail stands. Being first is the feature's promotion below 640.


**Section 6 — Featured event**

17. Mock events carry no clock time, so the middle meta row renders Status (Concluded / Happening today / Upcoming) instead of a fabricated time — confirm that reads right versus dropping to two rows.

   → **Ruled — R25.** Superseded: meta drops to two rows, `date` and `venue`. The status stays in its pill and is not said twice.

18. getFeaturedEvent() falls back to the latest featured event when none are upcoming, which surfaces fitness-challenge (2026-07-01) rather than the non-featured swimming-championship happening today (2026-08-05).

   → **Ruled — R6.** The selector wins. `isFeatured` is a tie-break, never an override — today beats upcoming beats most-recent-past.

19. mockEventGallery has 3 images for fitness-challenge; in past mode a third 'See the photos' link would be natural, but the locked spec allows only two CTAs so it was left out.

   → **Ruled — R26.** No third CTA; the two-CTA cap holds. Note `/gallery/events/:slug` does survive, per R38.


**Section 7 — People behind the pulse**

20. department renders at --color-fg-faint per the chapter brief, which measures 3.1:1 on --color-deep — below WCAG AA. I kept the token and mitigated with a hover/focus-within escalation to --color-fg-muted plus full-strength rendering on /people. Confirm that exception is acceptable, or promote department to fg-muted everywhere.

   → **Ruled — R7.** `department` is `fg-muted` at all times; the hover escalation is deleted. Contrast that needs a hover is not contrast.

21. Mobile <640 is a single column of horizontal cards (frame left, text right) rather than a 2x2 grid, so both contact links survive as labelled 48px rows. Confirm that reads as intended against the rest of the mobile compositions.

   → **Ruled — R27.** Single column below 640, so both contact links survive as labelled 48px rows.

22. The statement 'Someone unlocks the gym at 5 a.m.' is derived from Gym's 05:00 open time in mockActivities. If gym hours change, that headline has to change with them.

   → **Ruled — R28.** Kept. Same basis as R21 — literal copy, and `05:00` is genuinely in the data.


**Section 8 — Impact (second GSAP scene)**

23. Dropped overviewCards[id:3] "Top Activity / Basketball" from the four StatBlocks — it is a label, not a number, so it cannot count up and breaks the tabular-nums rhythm. It survives on /stats. Confirm nobody needs Basketball called out here.

   → **Ruled — R29.** Stays dropped. A word sitting still among three counting numerals reads as a failed animation.

24. trendData has no year and contains Sep/Oct/Nov, which are in the future relative to 2026-08-05. Nothing in this section year-anchors it and the 'Sample data' chip stays until SAC publishes real numbers. Confirm that is acceptable at launch.

   → **Ruled — R30.** Superseded: `month` is deleted from the mock and labels are derived from today, so the series always ends on the current month.

25. Delta chips render growth.replace(/ from last month$/, "") so "+0.4 from last month" reads "+0.4", with the clause moved once into the caption "Change since last month." The mock data is untouched — confirm the rewrite at render is fine.

   → **Ruled — R31.** Superseded: the suffix is fixed in `mockStats` at source and the `.replace()` is deleted. A regex that fails open is worse than none.


**Section 9 — Stories in motion**

26. Reel is 8 of the 15 mock images; the 7 excluded ones have generic captions ("Practice Session", "Workout Area"). If you want all 15 in the reel, the category-alternation and no-adjacent-repeat rules break.

   → **Ruled — R32.** Eight stands. The reel reveals captions on hover, so a generic caption is dead weight; all 15 remain on `/gallery`.

27. Parallax amplitude is read from matchMedia once at mount, not on resize — a desktop user crossing the 1280 boundary keeps the old amplitude until reload. Flagged with a ponytail comment.

   → **Ruled — R33.** Superseded: the effect listens for the breakpoint change. One native line, and the `ponytail:` ceiling comment is deleted.

28. Existing GalleryImageDialog.tsx is renamed to GalleryLightbox.tsx and gains an items+index API so the reel and /gallery/:slug share one dialog; that rename touches the four Gallery route files.

   → **Ruled — R4.** The rename lands, and the component is specified once, in Part 6 §5.


**Section 10 — Achievements**

29. Sort is pure recency (achievedAt desc), so Inter-NIT never surfaces on the home page — the four-tier chip hierarchy is only fully visible on /achievements. Confirm you don't want a level-weighted pick instead.

   → **Ruled — R16.** Pure recency, no level weighting.

30. content.ts needs one selector not in the agreed list: getRecentAchievements(limit). Confirm it belongs in src/lib/content.ts and not local to the section.

   → **Ruled — R16.** It belongs in `content.ts` — `#wins` and `/achievements` must not sort differently.

31. studentName strings are not linked to mockPeople (Karan Patel, Rahul Nair, Priya Shah have no person record) — confirm names stay plain text with no /people cross-link.

   → **Ruled — Part 1 §2.** Names stay plain text. No `studentName` matches a `mockPeople` record, so a cross-link would 404 or point at the wrong person.


**Section 11 — Join (the inverted light section)**

32. The repo strings say "Sports Activities Centre" (ContactPage.tsx:68, Footer.tsx:9) but the project brief names it "Student Activity Centre". I used "Student Activity Centre" in the address block — confirm the official name and fix both legacy strings.

   → **Ruled — R8.** "Student Activity Centre". Both legacy strings are wrong and grep gate 17 keeps them out.

33. The primary CTA points at /contact, whose form is mock and self-labelled. If you would rather the payoff beat never touch a non-functional form, swap the primary to the mailto and move "Talk to the centre" into column 1.

   → **Ruled — R14.** The CTA stays pointed at `/contact`, which carries an explicit demo label and a real `mailto:` handoff — not a fake success toast.

34. I kept the brief-mandated border-ink/20 ghost border at 1.66:1 (below WCAG 1.4.11's 3:1) and raise it to ink 45% on hover/focus. If you want strict 3:1 at rest, the resting border becomes ink 45%.

   → **Ruled — R9.** `ink/45` at rest. 1.66:1 fails WCAG 1.4.11 and a11y is not traded for a lighter edge.


**Section 12 — Footer**

35. Mobile stacks contact (col D) above the two sitemap columns, on the reasoning that call/email is the highest-intent mobile action and the navbar sheet already carries the sitemap. Confirm that ordering matches your priority.

   → **Ruled — R34.** Contact first. The sitemap repeats what the nav and the sheet already carry.

36. The wordmark is cream, not volt, to protect the accent budget against an 88px glyph mass. If you want volt branding in the footer, it has to come out of the eyebrows instead — say which.

   → **Ruled — R35.** Cream. `#join` directly above already spends the volt for that viewport.

37. The footer omits --color-fg-faint entirely because it measures 3.83:1 on --color-void, below AA for text under 24px. This contradicts the global token table's 'meta, captions, timestamps' assignment — the same problem exists in every other section that puts fg-faint text on void, and probably warrants a global token fix rather than a per-section override.

   → **Ruled — R7.** It is a global token rule, not a per-section override: `fg-faint` is legal only for `aria-hidden` decoration, non-text UI and large text. The footer is right; every other section follows it.


**Navbar & anchor/route hybrid**

38. "Get involved" points at /contact, whose form is currently non-functional — that page must carry an explicit demo label or the site's one primary CTA is a labelled dead end.

   → **Ruled — R14.** `/contact` is labelled a demo and its form really does open a mail client, so the site's one primary CTA is not a dead end.

39. "Impact" resolves to /stats off-home because no /impact route exists; confirm /stats stays the deep route rather than being renamed.

   → **Ruled — R36.** `/stats` stays. The label is the story, the URL is the content.

40. `motion` is absent from package.json and node_modules (no framer-motion, no gsap either) — `npm i motion` is a hard prerequisite for this chapter.

   → **Confirmed — Part 1 §2.** `npm i motion gsap` is a hard prerequisite of slice 1, listed in Part 7's dependency ledger.


**Detail-route specs — all 15 routes**

41. Today is 2026-08-06, so ALL THREE events are already past — /events ships with its "Coming up" band showing an EmptyState, and the homepage pulse strip falls back to "Last event". I spec'd for that honestly rather than freezing a fake "today" of 2026-08-05. If you want the demo to show a live upcoming event, bump swimming-championship's startDate in mockEvents.ts instead of faking the clock.

   → **Ruled — R1.** Neither date is canon. The spec is date-independent and both renders are specified.

42. Activity timings only contain dayOfWeek 1 (Monday), so getOpenActivitiesNow() returns [] on the other six days. I gated the "Open now" pill behind hasTimingForToday() so the site never falsely claims "Closed", and labelled all hours "Monday schedule". The alternative is adding the other six days to mockActivities.ts.

   → **Ruled — R16.** Strict `dayOfWeek` match, gated by `hasTimingForToday()`. The site never infers a live status from one Monday row.

43. The /contact Send button becomes a mailto: handoff (labelled "Open in mail", explicitly marked demo) rather than a fake success toast, and the three href="#" social links are deleted outright since no real SAC URLs exist in the repo. If real Instagram/LinkedIn URLs exist somewhere, they can be added back to the footer and this panel.

   → **Ruled — R14.** Both stand: the `mailto:` handoff and the deletion of all three `href="#"` links.


**File manifest, dependency plan, asset pipeline, slices**

44. Archivo must ship the `standard` woff2 (90 KB, carries the wdth axis), not the smaller `wght` file (no width axis) — otherwise every `font-stretch` in the type spec silently no-ops. That is +42 KB over Inter's face; confirm the width axis is genuinely used in the display type before paying it.

   → **Ruled — R37.** Ship `standard` and pay the 42 KB. The `wdth` axis is genuinely used — on the `wght` file every `font-stretch` silently no-ops.

45. No redirects are planned for the three routes being deleted (`/gallery/events/:slug`, `/people/incharges`, `/people/committee`). Justified because version is 0.0.0 and nothing is deployed — confirm no one has shared those URLs.

   → **Ruled — R38.** Two redirects, not three: `/people/incharges` and `/people/committee` → `/people`. `/gallery/events/:slug` is not deleted.

46. `mockStats.categoryData` keeps its `Recreation: 15` slice as a chart label while the activities filter drops the `Recreation` chip. That is intentional (the pie is a labelled sample, not an activity index) but it does mean a user can see a category in one chart that has no activities behind it — say so if you want the slice removed from the chart instead.

   → **Ruled — Part 1 §2.** The slice stays in the chart and is captioned as a programme type. `Recreation` is never a category, a filter value or a link.
