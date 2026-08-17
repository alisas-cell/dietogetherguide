# dietogetherguide.shop V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, push, and deploy a complete noindex Preview of the owner-approved 23-route V1 without promoting it to Production.

**Architecture:** A static-first Next.js App Router application uses typed content modules for unique editorial pages and separate evidence registries for every changeable fact. Shared Server Component renderers provide consistent UI/SEO while client islands are limited to navigation and the gated troubleshooting tool.

**Tech Stack:** Next.js App Router, React, strict TypeScript, Tailwind CSS, next-intl-ready locale configuration, Vitest, Testing Library, Playwright, Vercel.

## Global Constraints

- The full Planning Pack at `/Users/alisa/Downloads/dietogetherguide_gsf_pack/` is authoritative; do not simplify it.
- Execute all 16 phases and preserve the canonical 72 task numbers from `10_IMPLEMENTATION_PLAN.md`.
- Current release state is `prerelease`; render `EARLY ACCESS · AUG 18`, never date-driven `LIVE`.
- Canonical origin is `https://dietogetherguide.shop`; Preview must be `noindex, nofollow`.
- English production routes are unprefixed; do not emit nonexistent locale alternates.
- Do not fabricate gameplay facts, numerical values, maps, saves, codes, player counts, or status telemetry.
- Server Components first; no DB, auth, CMS, dashboard, or unnecessary SaaS.
- Every official game image is local and has provenance in the asset registry.
- No Production promotion/domain attachment without a new explicit owner instruction.

## File map

- `app/`: route wrappers, layout, metadata files, sitemap, robots, manifest, OG image, 404.
- `components/`: focused layout, article, home, database, tool, and UI primitives.
- `content/`: unique route content contracts and visible FAQ data.
- `data/`: source, game, entity, update, and asset registries.
- `lib/evidence/`: validation/filtering; `lib/seo/`: metadata/routes; `lib/schema/`: JSON-LD.
- `public/brand/`: original SVG mark; `public/images/`: localized official images.
- `tests/`: data, content, SEO, route, and browser acceptance suites.
- `docs/research/`: source/release/tool decision logs.

## Execution checklist mapped to the canonical 72 tasks

### Phase 1 — Context & source verification (Tasks 1–3)
- [x] Inspect the empty repo, Git state, package-manager availability, and owner-file safety.
- [x] Read every Planning Pack file and verify Steam Store, official Steam News, and SteamDB.
- [x] Record source/release findings and create the in-repo design/plan/progress records.

### Phase 2 — Foundation (Tasks 4–8)
- [ ] Write tests for the source/evidence contracts, release snapshot, unique IDs/slugs, dangling refs, page-ready gates, and future dates; run each targeted test and observe the expected missing-module failure.
- [ ] Scaffold the smallest strict Next.js/Tailwind/Vitest project that can run those tests; install one lockfile only.
- [ ] Implement `data/types.ts`, `data/sources.ts`, `data/game.ts`, entity registries, and `lib/evidence/validate.ts`; rerun targeted tests to green.
- [ ] Add `next-intl` readiness without adding locale prefixes or fake messages/routes; run lint, typecheck, and data tests.
- [ ] Commit the foundation with the current source snapshot.

### Phase 3 — Brand & design system (Tasks 9–13)
- [ ] Write component behavior/accessibility tests for evidence filtering, breadcrumbs, menu semantics, and card omission of unknown fields; verify red.
- [ ] Implement tokens, typography, responsive rhythm, focus/reduced-motion rules, and the original hook/coin SVG.
- [ ] Implement status strip, header/mobile menu, footer, shells, content/evidence/callout/table/breadcrumb/related components, then database cards.
- [ ] Verify component tests, keyboard behavior, and visual fixtures at 390px/1440px; commit.

### Phase 4 — Official assets (Tasks 14–15)
- [ ] Fetch 6–10 current Steam/RetroStyle images from first-party URLs, inspect their content, convert/compress, and register `localPath/sourceUrl/sourcePage/fetchedAt/role`.
- [ ] Assign distinct images to home, gameplay, Silent Cove, monsters/maps, co-op, loot, and EA/update roles; test every registry path exists; commit.

### Phase 5 — Homepage (Tasks 16–17)
- [ ] Write the homepage content/SEO/schema assertions and observe red.
- [ ] Implement all 15 required sections in exact order using current prerelease facts and localized art.
- [ ] Add exact title, H1, description, canonical, WebSite/WebPage, visible FAQ parity, and real ItemList only where warranted.
- [ ] Run home tests and browser checks across the five viewports; commit.

### Phase 6 — Release/start content (Tasks 18–22)
- [ ] Write route-contract tests for `/release-date`, `/early-access`, `/roadmap`, `/gameplay`, and `/beginner-guide`; observe missing-content failures.
- [ ] Implement unique direct answers and sections, including registry-derived timezone rows and evidence/build caveats.
- [ ] Verify metadata, one H1, internal links, content uniqueness, responsive tables, and no overlapping ownership; commit.

### Phase 7 — Database/content pillars (Tasks 23–28)
- [ ] Write route/data rendering tests for `/monsters`, `/maps`, `/maps/silent-cove`, `/loot-and-extraction`, `/items-and-weapons`, and `/rum-buffs-and-perks`; observe red.
- [ ] Implement distinct evidence-aware content and cards with no invented EA roster/map/numbers and no pending field rendered affirmatively.
- [ ] Verify metadata, H1, links, card/table mobile behavior, and entity-page gate exclusions; commit.

### Phase 8 — Co-op/fixes pillar (Tasks 29–33)
- [ ] Write route-contract and safety-copy tests for `/coop`, `/coop/quick-join`, `/save-and-reconnect`, `/troubleshooting`, and `/system-requirements`; observe red.
- [ ] Implement unique content ownership, reversible ordered fixes, current requirements, and properly qualified Demo/Steam Deck/save-transfer claims.
- [ ] Verify links, metadata, H1, safety scan, mobile tables, and cannibalization boundaries; commit.

### Phase 9 — Updates/trust (Tasks 34–39)
- [ ] Write route-contract tests for `/updates`, `/faq`, `/about`, `/contact`, `/privacy`, and `/terms`; observe red.
- [ ] Implement the official update timeline, FAQ from one visible/schema data source, independent/editorial policy, real mailto correction path, and policies matching actual storage/analytics behavior.
- [ ] Verify metadata, H1, schema parity, trust links, and no fake forms/services; commit.

### Phase 10 — Tool gate (Tasks 40–42)
- [ ] Record a yes/no decision against every Co-op Troubleshooter acceptance criterion using current official evidence.
- [ ] If yes, write failing branch/output/safety tests, implement problem/context selection with source-backed reversible results, verify mobile/keyboard/no-JS supporting content, and add the route to nav/sitemap.
- [ ] If no, exclude route/nav/sitemap and record why; always defer Monster Finder and Loot Planner until their live-data gates pass.
- [ ] Commit the tool decision and any shipped implementation.

### Phase 11 — SEO infrastructure (Tasks 43–47)
- [ ] Write full-route metadata/canonical/H1/breadcrumb/schema/sitemap/robots tests; observe failures for missing infrastructure.
- [ ] Implement canonical metadata, JSON-LD helpers, sitemap gating, environment-aware robots, manifest, favicon/OG, and explicit internal-link graph.
- [ ] Verify no Preview hostname leakage, no fake schema/hreflang, 3–8 contextual core links, and no orphan core route; commit.

### Phase 12 — Automated QA (Tasks 48–51)
- [ ] Run full data tests; fix failures test-first.
- [ ] Run production-source hygiene scan for TODO/TBD/Lorem/Chinese notes/placeholders/competitor domains and forbidden claims.
- [ ] Run full SEO/route tests, lint, strict typecheck, unit/integration tests, and production build; record exact counts/output and commit only after green.

### Phase 13 — Browser QA (Tasks 52–56)
- [ ] Start the production server and crawl every public route plus sitemap/robots/manifest/OG/favicon/404.
- [ ] Run Playwright at 1440×900, 1024×768, 768×1024, 430×932, and 390×844 for overflow, nav, cards/tables, crop, focus, keyboard, links/images, schema, console, and hydration.
- [ ] Inspect screenshots, fix each issue with a failing regression assertion when behavior is testable, and re-run the complete matrix.
- [ ] Measure image/JS/LCP/CLS sanity and record limitations; commit fixes.

### Phase 14 — Preview & owner gate (Tasks 57–59)
- [ ] Fresh-run lint, typecheck, tests, build, hygiene, and browser suite; review the git diff and commit the verified state.
- [ ] Create/push the GitHub feature branch and record repo URL/SHA.
- [ ] Deploy a Vercel Preview, inspect deployment ID/status, verify noindex and all routes on the actual URL, then prepare the complete owner acceptance report.

### Phase 15 — Production (Tasks 60–66)
- [ ] Stop at the owner gate. Do not merge, promote, attach `dietogetherguide.shop`, change DNS, or claim Production readiness without explicit approval.

### Phase 16 — Release-day transition (Tasks 67–72)
- [ ] Keep deferred while Steam/SteamDB remains prerelease.
- [ ] On a later verified unlock, follow `07_RELEASE_DAY_PLAYBOOK.md`: update the central state, recheck five global pages, capture live evidence, update hubs before entities, and re-evaluate tools.

## Verification commands

Run repository-native equivalents after scripts exist:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Preview checks must additionally request every route, inspect `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`, unknown-route 404, and confirm robots metadata is `noindex, nofollow` on the deployed Preview.
