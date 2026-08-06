# SAC Goa Website Overhaul Blueprint

## 0. Harness setup: install before rebuild

Use one primary coding harness. Do not make Claude Code and OpenCode edit same worktree concurrently; parallel research is safe, concurrent code mutation is not.

### Recommended OpenCode setup

OpenCode already provides LSP loading, parallel sessions, model/provider flexibility, and terminal/IDE/desktop workflows. Configure it as main implementation harness.

Install/use these capabilities:

| Capability | Install/use | Purpose |
|---|---|---|
| `customize-opencode` skill | Built-in | Configure agents, permissions, MCP, project rules |
| `ponytail` skill | Existing | Prevent overengineering and dependency bloat |
| `caveman` skill | Existing | Keep implementation communication terse |
| Browser automation MCP | Configure Playwright-compatible browser MCP for chosen harness | Run app, inspect console, click flows, capture screenshots, verify responsive states |
| Playwright | Install as dev dependency | Repeatable route smoke tests, screenshots, keyboard checks |
| Lighthouse | Use CLI or browser audit | Performance/accessibility/SEO checks |
| Image inspection workflow | Use browser/tooling, not runtime dependency | Asset dimensions, crops, compression, alt-text inventory |
| Project rules | Add harness rules file | Preserve product, visual, and validation constraints across sessions |

Harness permissions should allow normal source edits, package installs, dev server, build/lint, and browser checks. Keep destructive shell commands denied unless explicitly approved.

### Agent roles

Use focused sessions instead of one giant agent:

1. **Product/art-direction agent** — turns brief into page narrative, copy hierarchy, visual references, and acceptance criteria.
2. **Codebase archaeology agent** — maps current routes, data, dead links, assets, and reusable primitives.
3. **Design-system agent** — owns tokens, typography, spacing, surfaces, buttons, cards, focus states.
4. **Homepage implementation agent** — owns scroll experience, sections, navbar, and responsive composition.
5. **Motion/performance agent** — owns Motion/GSAP implementation, reduced motion, frame budget, and mobile profiling.
6. **QA agent** — runs build/lint, route smoke tests, keyboard checks, screenshots, and Lighthouse.

One agent owns each file during implementation. Merge small slices; validate after every slice.

### Prompt files/rules to add to harness

Create project rules for:

- Product goal: premium SAC campus culture platform, not dashboard CRUD.
- Homepage-first, scroll-led information architecture.
- Existing mock data is demo content; never claim backend behavior.
- No dependency added without checking existing stack and proving need.
- No animation without reduced-motion fallback and mobile behavior.
- No comments unless requested or documenting a deliberate technical ceiling.
- Every visible CTA must work or be clearly labeled as mock.
- Build and lint after meaningful changes.

### Claude Code equivalent

If using Claude Code instead, mirror same roles as project subagents/commands and use its browser/Playwright integration for screenshots and smoke checks. Do not install duplicate agent tooling merely to rename the workflow. One harness, one source of truth, one owner per file.

### Recommended harness files

Add these before implementation:

```text
AGENTS.md                 # repository-wide implementation rules
.opencode/                # OpenCode agents/commands/permissions if OpenCode is primary
playwright.config.ts      # browser project, base URL, desktop/mobile projects
scripts/                  # only repeatable audit commands that earn their place
```

Do not commit provider secrets, MCP tokens, or local machine configuration. Keep harness config project-scoped where possible.

### Agent handoff format

```text
Goal:
Files owned:
Constraints:
Acceptance checks:
Validation run:
Result:
Known defects:
Next owner:
```

No agent starts editing until it can name its owned files and acceptance checks.

### Harness command loop

```text
1. inspect repo and current route
2. state intended visual/product outcome
3. edit smallest coherent slice
4. run build and lint
5. run browser smoke check
6. capture desktop/mobile screenshots
7. compare against acceptance criteria
8. keep, revise, or delete
```

### Harness output contract

Every implementation session returns:

- Files changed
- User-visible behavior changed
- Validation commands and results
- Known defects
- Next smallest slice

Do not accept vague “done” reports.

---

## 0. Executive direction

Rebuild SAC Goa as one cinematic, public-facing React experience: one primary home route with scroll sections, strong visual identity, fast discovery, and progressive disclosure into detail routes only where content depth demands it.

Current app has feature coverage but weak product hierarchy. It reads like separate demo pages assembled behind a navbar. Overhaul should make SAC feel like a living campus culture platform, not a CRUD shell.

Core rule:

> Make the homepage explain, prove, and invite participation before asking visitors to navigate.

Target feeling: premium editorial campus website; energetic, intelligent, human, credible, slightly futuristic; never generic SaaS dashboard.

---

## 1. Rebuild mandate

This is not a polish pass. Treat current app as content inventory and implementation reference, then rebuild presentation and composition around one product thesis.

### Non-negotiable outcomes

- One unmistakable SAC identity in first viewport.
- One coherent scroll narrative from discovery to participation.
- One visual language across homepage and detail routes.
- One motion language with shared timing/easing rules.
- One responsive system designed for touch first, then expanded for desktop.
- No placeholder-feeling cards, generic dashboard blocks, arbitrary gradients, or decoration without semantic purpose.
- No “premium” effect added without improving orientation, emphasis, feedback, or emotional tone.

### Product quality bar

The finished site should survive three tests:

1. **Five-second test:** visitor knows what SAC is and who it is for.
2. **Thirty-second test:** visitor sees something relevant to them and understands where to go next.
3. **Three-minute test:** visitor can explore activities/events/stories and trust that SAC is real, active, and organized.

### Definition of premium

Premium does not mean more blur, glow, gradients, or animation. It means:

- precise typography and spacing
- strong art direction
- high-quality imagery and crop selection
- confident hierarchy
- restrained surface treatment
- smooth interaction feedback
- excellent loading and fallback states
- details that work on mobile, keyboard, and reduced motion

### Rebuild rule

Preserve content value and useful URLs. Rebuild layout, section composition, visual tokens, responsive behavior, and interaction model. Delete weak UI rather than carrying it forward for compatibility.

## 2. Product intent

### Primary job

Help any visitor understand what SAC is, see what is happening, discover communities and achievements, and take a clear next action.

### Audiences

| Audience | Need | Primary action |
|---|---|---|
| Prospective/student visitor | Understand SAC and find a community | Explore activities |
| Current student | Find events, timings, galleries, and participation paths | Join/register/contact |
| Faculty/guest | Verify legitimacy, people, impact, and contact | Learn more/contact |
| SAC/admin operator | Eventually manage content and reports | Deferred backend/admin product |

### Product promise

SAC gives campus life a visible pulse: activities, people, events, movement, stories, and measurable participation in one place.

### Scope boundary

#### Overhaul now

- Public-facing responsive website
- One scroll-led homepage
- Reusable editorial sections
- Existing activities, events, gallery, people, achievements, stats, and contact content
- Mock data retained behind typed content boundaries
- Premium motion system with reduced-motion fallback
- Route cleanup and working navigation
- Strong mobile experience
- Accessibility, performance, SEO, and state handling

#### Do not build during visual overhaul

- Real authentication
- Admin CMS
- Backend/API
- Strava OAuth
- Push notifications
- Budget module
- Production issue workflow
- Speculative design-system abstractions

Add these after public experience proves useful and content model stabilizes.

---

## 3. Current-state audit

### Existing foundation

- React 19, TypeScript, Vite 8
- React Router 7
- Tailwind CSS 4
- shadcn/Radix-style primitives
- Lucide icons
- Recharts
- Embla carousel
- Zustand auth store
- React Query and Axios installed but not meaningfully used
- Inter font packages
- Typed mock data for activities, events, people, achievements, galleries, and stats

### Existing route surface

- `/`
- `/activities`, `/activities/:slug`
- `/stats`
- `/gallery`, `/gallery/:slug`
- `/gallery/events`, `/gallery/events/:slug`
- `/events`, `/events/:slug`
- `/people`, `/people/incharges`, `/people/committee`
- `/achievements`
- `/contact`

### Current architectural problems

1. Homepage is content-heavy but not orchestrated as a clear narrative.
2. Separate pages fragment discovery of related content.
3. Shared visual language is mostly utility classes, not deliberate design tokens.
4. Motion is limited to basic CSS hover/transition effects.
5. React Query and Axios exist without an API layer; remove or defer until real data exists.
6. Auth store exists without visible auth experience or protected routes.
7. Contact form has no submit behavior or validation.
8. Stats controls are visual only.
9. Floating action button points to missing `/report` route.
10. No visible loading, error, or not-found experience.
11. No test suite.
12. Existing build fails:
    - `src/main.tsx`: unresolved side-effect import/type declaration for `@fontsource/inter`
    - `src/pages/HomePage.tsx`: unused `React` import under strict TypeScript settings
13. Documentation overstates implementation: proposal describes backend/API hooks that do not exist in repository.

### Current code to preserve selectively

- Type definitions and mock data shapes
- Existing shadcn primitives
- Existing route detail pages where content depth benefits from a dedicated URL
- Recharts only for genuine data storytelling
- Existing image dialog/gallery behavior if accessible and performant

### Code to replace or consolidate

- Home page composition
- Navbar behavior and visual treatment
- Repeated page headers/card shells
- Repeated section spacing and color classes
- Dead FAB report link
- Decorative dashboard-like blocks without user value
- Unused dependency setup when not serving current behavior

---

## 4. New information architecture

### Primary model

Homepage becomes the main experience. It contains anchored sections with a fading, context-aware navbar. Detail routes remain for deep content, shareable URLs, and future SEO.

### Homepage section order

1. **Hero / campus pulse**
   - SAC identity
   - Short promise
   - Primary CTA: explore activities
   - Secondary CTA: see what is happening
   - Active event/activity visual
   - Ambient motion, not noisy decoration

2. **Live pulse strip**
   - Current/next event
   - Upcoming activity
   - Participation or impact metric
   - Horizontal on mobile, compact desktop rail

3. **What SAC is**
   - Clear positioning in one sentence
   - Three principles: participate, create, connect
   - Campus-context imagery or typographic composition

4. **Explore activities**
   - Featured activity cards
   - Category chips
   - Horizontal/stacked discovery layout
   - Link to `/activities`

5. **Featured event**
   - Large editorial event block
   - Date, venue, action
   - No countdown in rebuild; show date, time, venue, and action from trusted event data

6. **People behind the pulse**
   - In-charges and committee preview
   - Human portraits and roles
   - Link to `/people`

7. **Impact / stats**
   - A few meaningful numbers, not dashboard overload
   - One interactive chart or visualized trend
   - Link to `/stats`

8. **Stories in motion / gallery**
   - Immersive image grid or horizontal reel
   - Click opens accessible dialog or detail route
   - Link to `/gallery`

9. **Achievements**
   - Selected wins and milestones
   - Editorial timeline or stacked cards
   - Link to `/achievements`

10. **Join/contact CTA**
    - Clear invitation
    - Contact route and activity discovery route
    - Remove ambiguity around next step

11. **Footer**
    - Compact sitemap
    - Contact and campus identity
    - Social links only when real URLs exist

### Route strategy

Keep detail routes. Do not force every feature into homepage. Use homepage as narrative layer; routes as depth layer.

- Keep activities, events, gallery, people, achievements, stats, contact routes.
- Add anchor IDs: `#activities`, `#events`, `#people`, `#impact`, `#gallery`.
- Navbar desktop uses anchor links on `/`; route links for deep pages.
- If user visits an anchor from another route, navigate to `/` then scroll after mount.
- Add a real `/report` route only when issue-reporting UX exists; otherwise remove FAB link.
- Add a catch-all not-found route.

---

## 5. Visual direction

### Brand posture

Dark, atmospheric, high-contrast, editorial. Cyan remains accent, but should stop dominating every surface. Add restrained warm highlight color for human/campus energy.

### Proposed tokens

```text
--background: near-black navy
--surface: deep blue-black
--surface-raised: translucent slate/navy
--foreground: cool white
--muted: blue-gray
--accent: electric cyan
--accent-warm: restrained amber/coral
--line: low-opacity cool white
--success: green used only for status
```

Use CSS variables as source of truth. Tailwind classes consume tokens. Avoid hardcoded colors scattered across components.

### Typography

- Inter remains body/UI font.
- Use weight, scale, and layout for hierarchy before adding another font.
- Hero uses oversized fluid display type with `clamp()`.
- Eyebrow labels use compact uppercase tracking.
- Body copy max width around 60–70 characters.
- Do not overuse all caps.

### Layout

- Full-bleed visual moments alternating with constrained content.
- Consistent max-width container.
- Large vertical rhythm: sections should breathe.
- Use asymmetric grids sparingly.
- Cards should feel like windows into content, not identical boxes.
- Border radius and blur support hierarchy; do not apply glassmorphism everywhere.

### Image rules

- Prefer real campus/activity imagery over gradients as primary visual.
- Add explicit image `alt` text.
- Use fixed aspect-ratio wrappers to prevent layout shift.
- Lazy-load below-fold images.
- Add responsive image sources when asset pipeline supports it.
- Existing tiny public asset set is insufficient for premium result; content/asset collection is a launch dependency.

---

## 6. Motion direction

Motion serves hierarchy, continuity, and feedback. No animation exists merely to show off.

### Locked motion stack

Use this stack for rebuild. Do not revisit library choice during implementation:

1. CSS transitions/keyframes for micro-interactions.
2. `motion` for React entrance, viewport, presence, and scroll-linked transforms.
3. GSAP + ScrollTrigger for one pinned/scrubbed flagship scene.

Install both `motion` and `gsap` for this rebuild. GSAP stays isolated to flagship scene code; Motion owns all ordinary React animation. Do not add Lenis or another scroll engine. Native scrolling remains source of truth.

### Motion architecture

- `src/lib/motion.ts` stores durations, easing, viewport defaults, and reduced-motion variants.
- `Reveal` owns standard viewport entrance behavior.
- `AnimatedNumber` owns stat count-up and renders final value immediately when motion is reduced.
- `useScrollProgress` uses Motion values, not React state per frame.
- `FlagshipScrollScene` is the only component allowed to import GSAP/ScrollTrigger.
- Every animation registers cleanup on unmount and does not mutate global styles without restoring them.
- Route transitions never block content rendering or navigation.

### Performance contract

- Target 60fps on current mid-range mobile hardware for ordinary scroll.
- Flagship scene may reduce visual fidelity before it reduces scroll responsiveness.
- Animate `transform`, `opacity`, `filter`, and CSS custom properties only after profiling.
- No per-frame React renders.
- No unbounded blur, giant box-shadow, or full-screen canvas.
- Pause offscreen loops and dispose media listeners.
- Test 4x CPU slowdown and reduced network conditions.

### Motion layers

#### Layer 1: CSS/native

Use for:

- Hover/focus states
- Button transitions
- Image scale
- Opacity/color changes
- Sticky/fade navbar
- `scroll-behavior: smooth`
- CSS gradients and masks

#### Layer 2: React motion

Use installed `motion` package for all standard React choreography.

Use for:

- Hero entrance
- `whileInView` section reveals
- Staggered activity cards
- Shared layout transitions where useful
- Modal/detail transitions
- Scroll-linked opacity/transform
- Reduced-motion-aware variants

Recommended package: `motion` (`motion/react`), not legacy `framer-motion`.

#### Layer 3: GSAP flagship scene

Use GSAP only inside flagship scroll scene. It is required for pinned/scrubbed sequencing:

- Pinned scroll narrative
- Scrubbed timeline tied tightly to scroll position
- Horizontal scroll scene
- Complex multi-element timeline impossible to maintain with Motion/CSS
- Canvas/WebGL choreography

Keep GSAP isolated, measured, and progressively enhanced. Its pinned scene must have a normal-flow fallback, explicit cleanup, and no content dependency.

#### Do not add initially

- Lenis: native scrolling is enough; smooth-scroll abstraction can harm accessibility and input behavior.
- Locomotive Scroll: unnecessary complexity.
- Three.js/WebGL: no evidence content requires it.
- Multiple animation libraries: creates competing mental models.
- Auto-playing video backgrounds: performance and content overhead.

### Required motion behavior

- Navbar transparent over hero, then gains background/border after scroll.
- Hero content enters once; no repeated distracting loop.
- Section reveals trigger once or use low-cost repeated behavior.
- Cards animate in small groups, not one-by-one for long lists.
- Image hover transform stays subtle.
- Sticky/pinned effects must have mobile fallback.
- `prefers-reduced-motion: reduce` disables transforms, scrubbing, and nonessential parallax.
- Never hide content behind animation failure.
- Keep focus order and keyboard interaction independent of motion.

### Motion budget

- Prefer transform/opacity; avoid layout animation.
- Avoid scroll handlers that run React state every frame.
- Use Intersection Observer or Motion viewport APIs.
- Keep one signature motion scene per major viewport, not every section.
- Test low-end mobile before adding more effects.

---

## 7. Component and code architecture

### Suggested structure

```text
src/
  app/
    App.tsx
    providers.tsx
    routes.tsx
  components/
    layout/
    sections/
    cards/
    charts/
    ui/
  content/
    homeContent.ts
    navigation.ts
  data/
    mock/
  hooks/
    useScrollSpy.ts
    useReducedMotion.ts
  lib/
    utils.ts
    motion.ts
  pages/
  types/
```

Do not create every folder before need exists. Move only when consolidation starts hurting navigation.

### Reusable primitives to build

- `Section` — spacing, container, eyebrow/title/description slots
- `SectionHeading` — consistent hierarchy
- `Reveal` — one Motion wrapper with reduced-motion behavior
- `MediaFrame` — aspect ratio, loading, alt, overlay
- `ActivityCard` — variants for featured/compact
- `EventCard` — variants for featured/compact
- `StatBlock` — number, label, context
- `AnchorNav` — active section state and mobile behavior
- `PageIntro` — detail-page headers
- `EmptyState`, `LoadingState`, `ErrorState`

Avoid factories/config-driven component systems. Build only repeated patterns.

### State boundaries

- UI state: local React state.
- Remove Zustand during rebuild unless visible role/demo UX is explicitly retained.
- Server state: React Query only after real API exists.
- Static/mock content: typed modules, not fake query hooks.
- URL state: filters, selected gallery item, and shareable tabs should use URL params where valuable.

### Data cleanup

Create stable selectors/helpers for featured items, upcoming events, and related gallery content. Avoid repeating `.find()` and filtering logic across pages.

Do not pretend mock data is API architecture. Label mock behavior in code and UI where users could mistake it for live data.

---

## 8. Interaction specification

### Navbar

- Desktop: logo, section anchors, one high-value CTA.
- Hero state: transparent/low contrast.
- Scrolled state: translucent surface, border, shadow/blur.
- Active section indicator updates as user scrolls.
- Mobile: compact menu sheet with anchors and route links.
- Escape closes menu; focus returns to trigger.

### Hero

- Primary CTA scrolls to activities.
- Secondary CTA scrolls to current event/pulse.
- No carousel unless content requires it.
- One strong image/composition beats five competing effects.

### Filters

- Activity and achievement filters must update visible content.
- Selected state must be obvious.
- Empty results need deliberate empty state.
- Use URL params for filters if deep linking matters.

### Gallery

- Accessible dialog: keyboard close, focus trap, labels, next/previous controls.
- Prevent background scroll while open.
- Show loading/fallback state for image errors.

### Contact

- Use actual `<form>` semantics.
- Validate required fields.
- Show submitting, success, and failure states.
- Until backend exists, make mock submission explicit rather than silently pretending to send.

### Stats

- Remove nonfunctional controls or make them work against mock data.
- Charts need accessible summaries, not visual-only meaning.
- Export button stays deferred unless actual export is implemented.

---

## 9. Accessibility requirements

- Semantic landmarks: header, nav, main, section, footer.
- One `h1` per page.
- Logical heading order.
- Keyboard navigation for every interactive element.
- Visible focus styles against dark surfaces.
- Minimum touch target around 44px.
- Color is never sole status signal.
- Contrast check all text and accent combinations.
- Dialog/sheet focus management.
- Reduced-motion support.
- Meaningful alt text; decorative imagery empty alt.
- `aria-current` for active nav.
- Charts include text summary or table alternative.

---

## 10. Performance and SEO

### Performance

- Fix font loading; use one Inter import strategy.
- Remove unused dependencies/config where no current behavior needs them.
- Lazy-load below-fold heavy routes and gallery details.
- Use `loading="lazy"` for non-hero images.
- Prevent image layout shift with dimensions/aspect ratios.
- Keep animation transform/opacity-only.
- Avoid global smooth-scroll hacks if they interfere with reduced motion.
- Measure Lighthouse on mobile before/after motion.

### SEO/social

- Page title and description per route.
- Canonical URL strategy once deployment URL exists.
- Open Graph/Twitter metadata.
- Descriptive route-level headings.
- JSON-LD only for real event data, not fabricated production claims.
- Favicon and social preview asset aligned to SAC identity.

---

## 11. Plugin, library, and skill scope

### Required now

| Tool | Decision | Use |
|---|---|---|
| Tailwind CSS | Keep | Layout and token consumption |
| shadcn/Radix primitives | Keep | Accessible interaction primitives |
| Lucide | Keep | UI icons |
| Recharts | Keep selectively | Impact/stat storytelling |
| `motion` | Install | Standard React entrances, reveals, presence, and scroll-linked transforms |

### Required for rebuild

| Tool | Decision | Use |
|---|---|---|
| GSAP + ScrollTrigger | Install | One flagship pinned/scrubbed desktop scene; isolated behind normal-flow fallback |
| Playwright | Install as dev dependency | Route, interaction, keyboard, screenshot verification |
| Lighthouse | Run in CI/manual quality gate | Performance, accessibility, SEO |

### Explicitly post-rebuild

| Tool | Trigger |
|---|---|
| Image CDN/optimizer | Real asset volume or large originals arrive |
| CMS | Content updates become frequent and nontechnical editors need control |
| Form service/backend | Contact/report submissions need delivery and persistence |
| Analytics | Stakeholders define metrics and privacy approach |

### Avoid

- Lenis
- Locomotive Scroll
- Multiple animation libraries
- New carousel package
- UI kit replacement
- Three.js/WebGL
- D3 unless Recharts cannot represent a required visualization
- React Query/Axios wrappers before backend exists

### Useful development skills/tooling

- Browser DevTools Performance panel
- Lighthouse or PageSpeed audit
- Accessibility tree and keyboard audit
- Responsive viewport testing
- Image compression/conversion workflow
- Optional visual regression tool only after layout stabilizes

Do not add an MCP/plugin/skill merely because it exists. Tooling should reduce repeated work: asset inspection, browser screenshots, accessibility checks, or performance measurement.

---

## 12. Implementation phases

### Phase 0 — baseline and cleanup

1. Fix existing build errors.
2. Capture current screenshots at desktop/tablet/mobile.
3. Verify all routes and identify dead links.
4. Decide asset/content inventory.
5. Remove or defer unused runtime dependencies only after usage check.
6. Add not-found, loading, and error states.

Exit criteria: clean build/lint; route inventory honest; no known dead CTA.

### Phase 1 — design foundation

1. Define CSS color, spacing, radius, shadow, and typography tokens.
2. Establish max-width containers and section rhythm.
3. Normalize button, badge, card, input, and focus states.
4. Build `Section`, `SectionHeading`, `MediaFrame`, and `Reveal` only as patterns repeat.
5. Define responsive breakpoints and mobile-first behavior.

Exit criteria: new sections can be built without inventing local visual rules.

### Phase 2 — homepage narrative

1. Replace current homepage with section-based composition.
2. Implement hero and live pulse.
3. Add activities, event, people, impact, gallery, achievement, and contact sections.
4. Add anchor IDs and route handoff.
5. Rework navbar into transparent/scrolled states.
6. Rework footer and remove dead report CTA.

Exit criteria: visitor can understand SAC and reach any major content area without hunting.

### Phase 3 — motion system and flagship scene

1. Install `motion`, `gsap`, and `@playwright/test`.
2. Add shared motion constants and reduced-motion variants.
3. Implement CSS micro-interactions.
4. Implement Motion hero/reveal/stagger behavior.
5. Implement GSAP flagship pinned scene with normal-flow fallback.
6. Verify scene cleanup across route changes and resize.
7. Profile mobile performance under CPU/network throttling.
8. Reject effects that do not improve comprehension.

Exit criteria: motion feels intentional, content remains usable with motion disabled, no scroll jank.

### Phase 4 — detail-route consistency

1. Apply shared page intro/section/card styles to detail pages.
2. Normalize filters and URL state.
3. Fix gallery dialog accessibility.
4. Make contact form states real within mock boundary.
5. Make stats controls functional or remove them.
6. Add missing/empty/error states.

Exit criteria: detail routes feel part of same product, not separate demos.

### Phase 5 — quality gate

1. Build.
2. Lint.
3. Keyboard-only pass.
4. Screen-reader landmark/heading pass.
5. Reduced-motion pass.
6. Mobile performance pass.
7. Screenshot comparison at key breakpoints.
8. Verify every nav/CTA route.
9. Update README and progress docs to match reality.

---

## 13. Acceptance criteria

### Product

- Homepage communicates SAC purpose within first viewport.
- Major content discoverable through scroll and anchor navigation.
- Detail routes remain shareable and useful.
- Every visible CTA has a working destination or explicit mock state.
- No dead `/report` link.

### Visual

- Clear visual hierarchy across hero, sections, cards, and footer.
- Consistent tokens; no accidental color drift.
- Dark theme has sufficient contrast and surface separation.
- Desktop and mobile layouts feel designed, not merely collapsed.
- Asset quality matches premium direction.

### Motion

- Navbar transitions based on scroll state.
- Section reveals and hero entrance are smooth and restrained.
- One signature pinned/scrubbed scroll interaction exists on desktop and has normal-flow fallback on mobile/reduced-motion.
- Reduced-motion users receive equivalent content and actions.

### Engineering

- `npm run build` passes.
- `npm run lint` passes.
- TypeScript strict checks pass.
- No unused imports or dead dependencies introduced.
- No comments added unless documenting deliberate technical ceiling.
- No backend claims presented as live functionality.

### Accessibility/performance

- Keyboard navigation works end-to-end.
- Dialog/sheet focus behavior works.
- Images have correct alt/loading behavior.
- Mobile Lighthouse and runtime scroll performance are acceptable for project target.
- No content depends on animation to become readable.

---

## 14. Risks and decisions

### Risk: “Insane animations” become visual noise

Decision: prioritize narrative and interaction clarity. One signature scene, many small transitions, no animation everywhere.

### Risk: GSAP gets added before design proves need

Decision: start with CSS + Motion. Add GSAP only after pinned/scrubbed requirements exist.

### Risk: Homepage becomes too long

Decision: use concise previews and link to depth routes. Repeat no full datasets on homepage.

### Risk: Mock content limits premium result

Decision: treat asset/content collection as explicit dependency. Better composition cannot fully compensate for weak imagery or vague copy.

### Risk: Existing proposal drives speculative backend work

Decision: separate public-experience overhaul from platform phase. Do not build invisible backend architecture during visual pass.

### Risk: Current app is “feature complete” but not coherent

Decision: allow deletion and consolidation. Preserve user value, not current page count.

---

## 15. Recommended first slice

Ship one vertical slice before broad rewrite:

1. Fix build.
2. Create tokens and shared `Section`/`Reveal` primitives.
3. Rebuild hero, navbar, live pulse, and activities section.
4. Add anchor scrolling and scrolled navbar state.
5. Test desktop/mobile/reduced-motion.
6. Implement locked Motion + GSAP stack and verify flagship scene fallback.

If this slice does not feel premium, adding more sections or plugins will not fix it. Tune identity, typography, imagery, spacing, and motion curve first.

## 16. Exact premium experience specification

### Opening viewport

Hero must contain:

- Full-viewport or near-full-viewport composition.
- SAC mark/wordmark with enough breathing room.
- One short, memorable positioning statement.
- One primary filled action and one quiet secondary action.
- One dominant visual: real campus/activity image, editorial collage, or controlled video frame.
- Small live-context detail: upcoming event, activity count, or campus pulse.
- Scroll cue that does not compete with CTA.

Hero must not contain:

- Five competing buttons.
- Dense navigation menus.
- Generic “welcome to our website” copy.
- Unbounded neon glow.
- A carousel that hides core content.
- Text placed over unreadable imagery.

### Section choreography

Each section uses this sequence:

1. Orientation: eyebrow or short label.
2. Meaning: strong heading that states why section matters.
3. Proof: content, image, statistic, person, or event.
4. Action: one logical next step.

Section transitions alternate visual density:

- immersive image
- calm text/space
- structured content grid
- immersive story
- proof/statistics
- human CTA

Do not stack seven identical card grids.

### Signature scene

Build one flagship scroll scene between “What SAC is” and “Explore activities”:

- Section pins only on desktop-sized viewports.
- Large statement remains stable while activity/category fragments move around it.
- Background shifts subtly from dark navy to cyan-tinted depth.
- Activity fragments resolve into the actual activity grid.
- Mobile becomes normal vertical flow with no pinned layout.
- Scene is decorative and progressive; all activity content remains accessible without it.

This is the one place where GSAP is justified if Motion cannot provide reliable pinning and scrubbed sequencing. Do not use GSAP elsewhere by default.

### Motion constants

Define one shared motion vocabulary:

```text
fast: 180ms
standard: 420ms
slow: 720ms
hero: 1000ms
reveal-distance: 24px
card-hover-lift: 4px
```

Use consistent easing. Do not tune every component independently.

### Responsive art direction

Desktop and mobile are separate compositions, not the same grid at different widths.

- Desktop: asymmetric editorial layouts, pinned flagship scene, wider image crops.
- Tablet: remove fragile overlaps, preserve hierarchy.
- Mobile: normal document flow, horizontal rails only where touch-friendly, no tiny text, no hover-dependent meaning.
- Mobile hero prioritizes readable copy and one action over visual complexity.

### Content and asset brief

Before final visual polish, collect:

- SAC logo/wordmark in SVG.
- Campus/environment images.
- Activities imagery, minimum one strong image per featured category.
- Event hero and supporting images.
- People portraits with consistent crop/background treatment.
- Achievement marks/photos.
- No campus map in first rebuild; add only after validated location task exists.
- Real contact/social links.
- Approved SAC copy, names, roles, dates, and metrics.

No fake names, fake stats, fake event dates, or fake social links in final experience.

## 17. Concrete install plan

### Harness tooling

Use existing harness skills first. Install only tools required for execution:

```bash
npm install motion gsap
npm install -D @playwright/test
```

`motion` handles ordinary React animation. `gsap` handles isolated pinned/scrubbed scene. `@playwright/test` supports route, screenshot, keyboard, and console checks. Do not add `vite-plugin-inspect`; it does not improve user-facing quality enough to justify setup.

Install browser binaries for Playwright verification:

```bash
npx playwright install chromium
```

Run external audits through available system tools or browser tooling. Do not add Lighthouse to production dependencies.

### Application dependencies

Keep:

- React / React DOM
- React Router
- Tailwind / shadcn primitives
- Lucide
- Recharts for selected impact visual
- Embla only where current gallery interaction genuinely needs it
- Remove Zustand unless mock role UI remains visible

Remove after usage audit:

- Axios until API exists
- React Query until API/server state exists
- `react-image-gallery` if custom accessible dialog/rail replaces it
- Duplicate font packages; retain one import strategy
- Any package installed but unused by final rebuild

Do not install `framer-motion`, Lenis, Locomotive Scroll, or another animation/scroll library. Motion + isolated GSAP is locked stack.

### Browser verification requirements

Harness must verify:

- `/` initial load
- anchor navigation from navbar
- mobile menu open/close/focus return
- activity/event/gallery detail navigation
- gallery dialog open/close/keyboard controls
- filter state and empty state
- contact validation and mock submit state
- not-found route
- reduced-motion mode
- console errors
- desktop/mobile screenshots

## 18. Delivery slices

### Slice A — art direction proof

Deliver only hero, navbar, live pulse, and one activity section. Use final tokens, real asset direction, and final motion vocabulary. This slice decides whether visual direction works.

### Slice B — narrative completion

Add about/purpose, featured event, people, impact, gallery, achievements, contact CTA, footer. Keep content previews short.

### Slice C — flagship scene

Implement pinned/scrubbed section with GSAP + ScrollTrigger. Add normal-flow mobile/reduced-motion fallback, resize cleanup, and browser performance checks.

### Slice D — route unification

Restyle deep routes with same tokens, intro treatment, cards, filters, dialogs, and states.

### Slice E — production-quality pass

Fix forms, dead links, image states, metadata, keyboard navigation, reduced motion, mobile performance, and docs.

Each slice is shippable and screenshot-reviewable. Never rewrite all pages before first visual proof.

## Final direction

This is full product rebuild, not random polish. Use current repo as data and route inventory. Install harness tooling first, establish art direction second, build one premium vertical slice third, then expand. Use Motion for standard React animation and GSAP for one deliberate flagship scroll scene only. Keep backend/auth/admin outside this rebuild until public experience is credible and content model is stable.
