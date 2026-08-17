# Progress Log

## Session: 2026-08-17

### Current Status
- **Phase:** Human Gate local verification complete; final commit/Preview pending
- **Started:** 2026-08-17
- **Branch:** `codex/dietogether-v1`
- **Worktree:** `/Users/alisa/Documents/ChatGPT/高优先级/.worktrees/dietogether-v1`

### Actions Taken
- Began the GSF Human Gate without changing approved design, IA, SEO intent, routes, canonicals, or evidence rules.
- Reconciled the Preview identity to `dpl_GKQrcD92ZAzcNy8a3VDjw3z51z9U` / `dietogetherguide-bj3w8zoiw-alisasun.vercel.app`, tied to reviewed SHA `300fb71a3a675b1af9f62c056d3a199abc55a4c4`.
- Verified direct anonymous access in a fresh non-persistent browser session: no cookies, no Vercel login wall, correct H1/noindex/canonical, and zero console errors/warnings.
- Deleted the two stale earlier Preview candidates after exact-ID inspection; only the authoritative Preview remains in the Vercel project.
- Rechecked Steam Store, official News API/Community, and SteamDB at `2026-08-17T13:59:03Z`; the game remains unreleased/prerelease, so the centralized label stays `EARLY ACCESS · AUG 18`.
- Captured all 10 requested Human Gate screenshots from the pre-fix authoritative Preview at 1440×900 and 390×844.
- Completed a full screenshot-led UI audit: 36/36 rules, `READY`, no remaining findings or suppressions.
- Added failing deployed regressions before fixing mobile table overflow, menu focus restoration, and core troubleshooter touch targets; all pass locally after the surgical changes.
- Removed `dynamicParams = false` after reproducing Next.js `NoFallbackError` on custom 404 requests; known routes remain SSG, custom 404 remains 404, and production-server stderr is clean.
- Read `superpowers:using-superpowers` and Codex platform guidance.
- Read the full user request from the attached pasted-text file.
- Read all 12 Planning Pack files in the exact required order.
- Inspected the empty workspace and Git state; no unrelated owner files were present.
- Rechecked Steam Store, official Steam News, and SteamDB.
- Recorded the current prerelease decision.
- Created and committed a safe root `.gitignore` baseline on `main` (`4143710`).
- Created isolated worktree/branch `codex/dietogether-v1`.
- Initialized persistent planning files.
- Loaded the design, planning, TDD, Next.js, SEO, deployment, and verification workflows.
- Added the strict Next.js/Tailwind/Vitest/Playwright package baseline and one npm lockfile.
- Wrote and observed failing data and i18n contract tests before implementation.
- Implemented typed evidence/source/game/entity/update registries and validation/filtering.
- Added future-ready locale configuration with only unprefixed English enabled.
- Added in-repo release-state and source-precedence research notes.
- Wrote component behavior tests before implementing evidence badges, breadcrumbs, database cards, and article primitives.
- Implemented the original fan mark, sticky release strip, responsive header/mobile navigation, footer, content tokens, and reusable editorial/database components.
- Localized 10 official Steam media files, visually inspected the key art and roadmap, and added a typed asset-provenance registry.
- Implemented the exact homepage hierarchy and 22 distinct non-home core content routes from a centralized typed content registry.
- Added exact canonical metadata, WebSite/WebPage/Breadcrumb/FAQ/ItemList JSON-LD, sitemap, environment-aware robots, manifest, OG image, and custom 404.
- Shipped the Co-op Troubleshooter after a documented evidence/safety gate; deferred Monster Finder and Loot Planner.
- Added Playwright coverage for five required viewports, the mobile focus-trapped menu, tool output, 24 public routes, images, metadata/schema, and the custom 404.
- Visually inspected the full 390px and 1440px homepage captures and corrected the mobile crew-utility grid.
- Created public GitHub repository `alisas-cell/dietogetherguide` and pushed `codex/dietogether-v1`.
- Created Vercel project `dietogetherguide`, corrected its framework preset to Next.js, and kept the formal domain unattached.
- Removed an unintended initial Production deployment immediately and confirmed its generated aliases no longer resolve.
- Disabled the project's Vercel login wall so the owner can review the Preview directly; noindex remains enforced at the app and response layers.
- Superseded the earlier `dpl_A5VnTpfws33okrW4weAghWDWVGCR` candidate; it is deleted and is not a valid review URL.
- Ran the complete Playwright acceptance suite against the deployed pre-fix baseline and visually inspected the required 390px and 1440px captures.

### Test Results
| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| Git isolation detection | Normal checkout before worktree | `GIT_DIR == GIT_COMMON`, branch `main` | pass |
| Worktree branch | Feature branch active | `codex/dietogether-v1` | pass |
| Steam availability gate | Evidence-based state | Steam not available; SteamDB prerelease | pass |
| `npm test` | Foundation contracts pass | 2 files, 6 tests passed | pass |
| `npm run typecheck` | Strict types clean | exit 0 | pass |
| `npm run lint` | No errors or warnings | exit 0 | pass |
| Component/data focused suite | Primitives and asset registry pass | 2 files, 9 tests passed | pass |
| Content registry | 23 core routes, unique metadata, substance gates | 22 non-home records passed | pass |
| Co-op tool safety | 8 symptoms, ordered safe outputs | 2 tests passed | pass |
| Playwright viewport/runtime suite | 390, 430, 768, 1024, 1440 | 19 passed, 26 intentionally project-skipped | pass |
| Public route smoke | 24 routes, one H1, no broken local images | all 24 passed | pass |
| Pre-fix capture Preview identity | Ready and Preview-only | `dpl_GKQrcD92ZAzcNy8a3VDjw3z51z9U`, target `preview`, reviewed SHA `300fb71…` | pass |
| Preview indexing guard | Header + metadata + robots | `x-robots-tag: noindex`; `noindex,nofollow`; `Disallow: /` | pass |
| Local production Playwright suite after Human Gate fixes | Five viewports, all public routes, regressions | 19 passed, 26 intentionally project-skipped | pass |
| Deployed 404/schema/tool | Custom 404, JSON-LD, deterministic checklist | all assertions passed | pass |
| Full UI audit | 36 selected laws/modern/surface rules | `READY`, 0 open findings | pass |

### Errors
| Error | Resolution |
|-------|------------|
| Steam Community direct all-news open failed | Used official Steam News API. |
| First worktree command chain stopped on ignore check | Verified intended child path, then created worktree. |
| First dependency-install output returned before npm finished | Traced the npm process/log and waited for its clean completion. |
| TypeScript 7 unsupported by current typescript-eslint | Locked TypeScript 6.0.3. |
| ESLint 10 incompatible with current Next React lint plugins | Locked ESLint 9.39.5. |
| RetroStyle screenshot CDN challenged scripted acquisition | Kept the source-first rule and used 10 official images exposed by Steam instead. |
| Browser page-asset inventory timed out | Recovered the page state and completed the task with first-party Steam asset URLs. |
| First responsive home assertion found two matching status strings | Scoped the assertion to the status landmark and reran the suite successfully. |
| First Vercel CLI Preview command unexpectedly created a Production target | Removed exact deployment and its aliases, then used the CLI's default deploy mode to create a true Preview. |
| Initial Vercel framework preset was `Other` | Set it to Next.js and redeployed; the resulting manifest exposed 126 Next.js output items. |
| Preview was behind Vercel Authentication | Disabled project-level SSO protection because the guide contains public data and needs owner review. |
| Direct local requests to the Preview timed out | Routed deployed curl and Playwright through the already-configured system proxy. |
| GitHub OAuth token lacked `workflow` scope | Removed the rejected workflow file; no release or CI automation was enabled. |
| First mobile screenshot CLI batch used `--config` on subcommands | Corrected the CLI syntax; configuration belongs to `open`, and all 10 required files were verified at exact widths. |
| Mobile article pages widened to 642px at a 390px viewport | Added a failing deployed regression and fixed the grid child's intrinsic minimum width. |
| Mobile menu close dropped keyboard focus | Added a failing deployed restoration regression and refocused the captured trigger during cleanup. |
| Lint rejected cleanup access through mutable `triggerRef.current` | Captured the current trigger node inside the effect and reran lint cleanly. |
| Next production server logged `NoFallbackError` on the custom 404 | Reproduced the route, removed `dynamicParams = false`, rebuilt, and verified clean stderr with a retained 404 response. |
