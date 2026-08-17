# dietogetherguide.shop V1 Design

## Status and authority

This design incorporates, without weakening, the owner-approved GSF Planning Pack at `/Users/alisa/Downloads/dietogetherguide_gsf_pack/`. The Pack's 12 files remain the detailed product requirements. This repository document records the implementation interpretation and the live source decision at build start.

Current release decision, checked `2026-08-17T01:44:11Z`: **prerelease**. Public release labels remain `EARLY ACCESS · AUG 18` until a new Steam/SteamDB check proves actual unlock.

## Objective

Create a complete, source-checked English field guide for *Last Pirates: Die Together* that answers release, gameplay, monsters, maps, loot, co-op, save/reconnect, troubleshooting, and update questions before Early Access. The Preview must be polished, noindex, fully browsable, and structurally ready to absorb live EA data without rewriting templates.

## Architecture

Next.js App Router renders static-first Server Component pages. Long-form page content lives in focused typed content modules, while facts that can change live in evidence-aware registries for sources, the global game snapshot, maps, monsters, items, effects, updates, and assets. Route wrappers own URL-level metadata and import the shared article/home renderers; only mobile navigation and a gated troubleshooter require client JavaScript.

The release snapshot is the only availability source of truth. Pages may phrase the shared fact differently for their intent, but cannot hard-code a second state. `pending-verification` values remain available to maintainers and are filtered from affirmative UI.

## Visual system

The visual direction is **Cursed Expedition Field Guide**: deep naval ink (`#071014`), elevated blue-black surfaces (`#0D191D`), warm parchment text (`#F2E8CF`), muted loot gold (`#D8A84E`), verified seafoam (`#48B6A7`), and restrained danger coral (`#D36552`). Geist Sans carries readable prose; Geist Mono carries build stamps, evidence labels, coordinates, and compact data.

The signature element is a **dead-reckoning route line**: a thin seafoam/gold path that connects the genuinely sequential Start Here steps and reappears as quiet coordinate ticks around selected imagery. It belongs to navigation and provenance, not decoration. The deliberate visual risk is a cropped official hero framed like an expedition plate with offset coordinate rails; the rest of the system stays disciplined, low-glow, and information-dense. This avoids the generic black-purple card aesthetic and avoids literal parchment or pirate-theme kitsch.

The original mark is a single continuous elastic-arm/hook curve capturing a coin. It must remain legible at favicon size and must not trace the official game logo.

## Components and data flow

- `data/*`: authoritative versioned facts and provenance.
- `lib/evidence/*`: validators and public-field filtering.
- `content/*`: unique route intent, direct answer, sections, FAQs, related routes, and source IDs.
- `components/layout/*`: status strip, header, mobile menu, footer, container.
- `components/article/*`: evidence banner, breadcrumb, article shell, source list, related guides, callouts, responsive tables.
- `components/home/*`: hero, metrics, Start Here route, field-guide categories, EA delta, entity teasers, updates, problem links, FAQs.
- `components/database/*`: evidence-aware monster, map, item, and update cards.
- `components/tools/*`: Co-op Troubleshooter only if its evidence/safety gate passes.
- `lib/seo/*` and `lib/schema/*`: canonical metadata and visible-content-matched JSON-LD.

## Failure and uncertainty behavior

- Unknown gameplay facts are omitted or presented as section-level `Not yet verified for Early Access` context, never as question marks in a database card.
- Missing/dangling evidence, duplicate IDs/slugs, future verification dates, and invalid page-ready entities fail automated tests.
- Preview environments emit `noindex, nofollow`; canonical URLs still use the production apex.
- A contact route provides a real mailto correction path, not a fake form.
- The Co-op Troubleshooter excludes risky system modifications and does not ship if useful source-backed branches cannot be written.
- Unknown entity slugs return the custom 404 and are excluded from sitemap output.

## Testing and acceptance

Vitest covers data contracts, evidence filtering, release state, content hygiene, metadata uniqueness, and sitemap inclusion. Playwright covers all public routes, one-H1/canonical/noindex behavior, links/images, mobile menu, optional tool interactions, console/hydration errors, horizontal overflow, and the five required viewports. Fresh `lint`, `typecheck`, `test`, and `build` runs are required before commit and again before the final report.

The Preview is accepted only when all 23 core routes are substantive, the chosen tool decision is documented, official imagery is localized and source-registered, all automated/browser gates pass, and the deployment is recorded without Production promotion.

## Boundaries

- Always: preserve source IDs/build/confidence/verified time for changeable facts; keep one release snapshot; use local official media; use unprefixed English routes; test before phase completion.
- Ask first: Production promotion, domain attachment, analytics/ads, adding a backend contact system, or publishing post-unlock entity pages without current evidence.
- Never: fabricate stats or systems, render pending facts as answers, hotlink competitor media, copy official/reference branding, create fake hreflang, or expose a thin/empty tool route.
