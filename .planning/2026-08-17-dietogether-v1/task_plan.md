# Task Plan: dietogetherguide.shop V1 Preview

## Goal
Build, source-check, test, push, and deploy a complete noindex Vercel Preview of the 23-route English V1 for `dietogetherguide.shop`, without promoting it to Production.

## Authoritative Requirements
- `/Users/alisa/Downloads/dietogetherguide_gsf_pack/README.md`
- `/Users/alisa/Downloads/dietogetherguide_gsf_pack/00_PROJECT_BRIEF.md` through `10_IMPLEMENTATION_PLAN.md`
- The 16 phases and 72 task numbers in `10_IMPLEMENTATION_PLAN.md` are the canonical execution order.

## Next Step
Commit and push the Human Gate fixes, create the final authoritative Preview from that exact SHA, recapture the required screenshots, and run deployed verification.

## Current Phase
Phase 14B — Human Gate verification and Production handoff preparation.

## Phases

### Phase 1: Context & Source Verification (Tasks 1–3)
- [x] Inspect workspace and Git state
- [x] Read all 12 Planning Pack files in required order
- [x] Recheck Steam store, official Steam News, and SteamDB
- [x] Record current prerelease decision and source URLs
- **Status:** completed

### Phase 2: Foundation (Tasks 4–8)
- [x] Configure Next.js, strict TypeScript, Tailwind, next-intl readiness, and test commands
- [x] Build typed source/evidence, release snapshot, registries, and validators using TDD
- [x] Pass the registry gate
- **Status:** completed

### Phase 3: Brand & Design System (Tasks 9–13)
- [x] Implement tokens, original fan mark, shell, content primitives, and database primitives
- [x] Verify integrated homepage at 390px and 1440px during the browser QA gate
- **Status:** completed

### Phase 4: Official Assets (Tasks 14–15)
- [x] Localize 10 official Steam images, optimize them, and register provenance
- **Status:** completed

### Phase 5: Homepage (Tasks 16–17)
- [x] Build the exact 15-part homepage hierarchy and its metadata/schema
- **Status:** completed

### Phase 6: Release/Start Content (Tasks 18–22)
- [x] Implement release, EA, roadmap, gameplay, and beginner routes
- **Status:** completed

### Phase 7: Database/Content Pillars (Tasks 23–28)
- [x] Implement monsters, maps, Silent Cove, loot, items, and systems routes
- **Status:** completed

### Phase 8: Co-op/Fixes Pillar (Tasks 29–33)
- [x] Implement co-op, Quick Join, save/reconnect, troubleshooting, and requirements routes
- **Status:** completed

### Phase 9: Updates/Trust (Tasks 34–39)
- [x] Implement updates, FAQ, about, contact, privacy, and terms routes
- **Status:** completed

### Phase 10: Tool Gate (Tasks 40–42)
- [x] Ship the evidence-gated Co-op Troubleshooter; explicitly defer Monster Finder and Loot Planner
- **Status:** completed

### Phase 11: SEO Infrastructure (Tasks 43–47)
- [x] Audit metadata, schema, breadcrumbs, sitemap, robots, OG, manifest, and internal links
- **Status:** completed

### Phase 12: Automated QA (Tasks 48–51)
- [x] Pass data, content hygiene, SEO, lint, typecheck, test, and build checks
- **Status:** completed

### Phase 13: Browser QA (Tasks 52–56)
- [x] Verify five target viewports, runtime behavior, accessibility, links/images, and performance sanity
- **Status:** completed

### Phase 14: Preview & Owner Gate (Tasks 57–59)
- [x] Push feature branch, deploy noindex Preview, and prepare acceptance report
- **Status:** completed

### Phase 14B: Human Gate Verification
- [x] Establish one authoritative Preview tied to the reviewed branch/SHA
- [x] Recheck the Steam/News/SteamDB fact gate
- [x] Capture the 10 required screenshots from the deployed Preview
- [x] Complete screenshot-led UI audit and any evidenced surgical fixes
- [ ] Repeat deployed verification after final commit (local gate complete)
- [ ] Commit/push the gate record and document the safe `main` merge path
- **Status:** in_progress

### Phase 15: Production (Tasks 60–66)
- [ ] Deliberately deferred: user has not authorized Production promotion/domain cutover
- **Status:** pending

### Phase 16: Release-Day Transition (Tasks 67–72)
- [ ] Deliberately deferred until actual Steam unlock is independently verified
- **Status:** pending

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Keep `EARLY ACCESS · AUG 18` | Steam says not yet available; SteamDB reports `prerelease` at 2026-08-17T01:44:11Z. |
| Work on `codex/dietogether-v1` | The implementation plan forbids feature work on `main`; isolated worktree protects the baseline. |
| Treat the Planning Pack as approved design/spec | The owner explicitly designated all files as formal product requirements and requested immediate V1 execution. |
| English routes remain unprefixed | Required canonical/i18n architecture; no fake translations or hreflang. |
| Preview only | Production cutover requires a later explicit owner instruction. |
| Official-image set sourced from the Steam page | The publisher image CDN challenged direct RetroStyle screenshot acquisition; the Steam store exposed a complete 10-file editorial set with first-party URLs and local provenance. |
| Ship the Co-op Troubleshooter | Official patches support safe Quick Join/reconnect/host-migration context; deterministic output uses only official or standard reversible steps. |
| Defer Monster Finder and Loot Planner | No EA-confirmed roster/counterplay dataset or stable live economics exists before unlock. |
| Disable Vercel Authentication for this project | V1 contains only public guide material; the owner needs a directly reviewable Preview, while application metadata, `robots.txt`, and `x-robots-tag` retain noindex protection. |

## Errors Encountered
| Error | Resolution |
|-------|------------|
| `git check-ignore -q .worktrees` returned non-zero before the directory existed, stopping a chained command | Verified the intended child path with `git check-ignore -v .worktrees/dietogether-v1`, then created the worktree. |
| The install command returned partial output before npm finished | Confirmed the live npm PID and debug log; waited for `exit 0`, lockfile, and binaries before rerunning tests. |
| TypeScript 7 and ESLint 10 exceeded the current Next lint plugin compatibility ranges | Locked TypeScript 6.0.3 and ESLint 9.39.5, then reran lint/typecheck/tests successfully. |
| RetroStyle image CDN returned a Cloudflare challenge to scripted requests | Used images exposed by the official Steam store instead; no third-party or invented substitute art was added. |
| The in-app browser asset-inventory request timed out | Recovered the official page tab, then completed acquisition through direct first-party Steam asset URLs. |
| First Playwright home assertion matched two identical status labels | Scoped the assertion to the semantic current-status region; the product UI was correct. |
| Vercel CLI marked the first explicit `--target preview` call as Production | Created a true Preview without `--target`, removed exact deployment `dpl_7mdByrbhiyNxZtzsuTH4dSsVcGPs`, and confirmed the Production alias no longer resolves. No formal domain was attached. |
| The initial Vercel project preset was `Other`, causing platform-level 404s | Updated only this project to the `nextjs` preset, redeployed, and confirmed the deployment manifest contains the expected Next.js outputs. |
| Anonymous Preview access showed Vercel login | Disabled per-project Vercel Authentication; Preview remains `noindex,nofollow` with `robots.txt` disallow and `x-robots-tag: noindex`. |
| Local direct traffic to `vercel.app` timed out through a poisoned route | Reused the machine's configured HTTP proxy for deployed curl and Playwright verification; all deployed checks then passed. |
| GitHub rejected a manually-triggered verification workflow without OAuth `workflow` scope | Removed the workflow file and retained the reusable `PLAYWRIGHT_BASE_URL` / proxy-aware local runner configuration. |
| Mobile article tables widened the 390px document to 642px | Added a failing deployed regression, set the article grid child to `min-width: 0`, and verified the table now scrolls inside its focusable shell. |
| Mobile menu did not restore focus after closing | Added a failing deployed focus regression, captured the trigger element for effect cleanup, and verified focus trapping, Escape close, and restoration. |
| Core tool radio/disclosure targets measured 42px and 26px | Added a failing deployed target-size regression and raised only those minimum heights to 44px. |
| `dynamicParams = false` logged Next.js `NoFallbackError` for valid custom 404 responses | Reproduced the stderr path, removed the segment flag, rebuilt, and verified known pages remain SSG while unknown routes return 404 with clean server stderr. |
