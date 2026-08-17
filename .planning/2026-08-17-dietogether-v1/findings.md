# Findings & Decisions

## Requirements
- Build a production-quality English Next.js App Router field guide with 23 required core routes.
- Use strict TypeScript, Tailwind CSS, future-ready `next-intl`, static-first Server Components, clean content modules, and typed evidence registries.
- Preserve a single centralized release state. Never infer `LIVE` from the current date.
- Implement unique page intents, metadata, H1s, direct answers, structured internal links, breadcrumbs, canonical URLs, schema, sitemap, robots, manifest, favicon, and OG media.
- Use local official game imagery with an asset provenance registry; create an original hook/elastic-arm-and-coin fan mark.
- Do not fabricate gameplay facts, numeric stats, map routes, entity completeness, save transfer, codes, player count, or server status.
- Preview must be fully browsable and `noindex`; do not promote to Production or attach the apex domain without owner authorization.
- Required final evidence includes GitHub/branch/SHA, deployment ID/URL, route QA, automated checks, responsive/runtime QA, SEO outputs, release state, pending facts, and tool decisions.

## Research Findings
- Checked at `2026-08-17T01:44:11Z`.
- Steam Store: `https://store.steampowered.com/app/4317790/Last_Pirates_Die_Together/`
  - Displays `This game is not yet available on Steam`.
  - Displays planned release date `18 Aug, 2026` and an approximate unlock countdown.
  - Confirms up to four-player online co-op, 6+ month EA target, and minimum requirements.
- Steam official news API: `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=4317790`
  - Newest item is the Aug 7 Busan Indie Connect post.
  - No launch/unlock announcement is present.
- SteamDB: `https://steamdb.info/app/4317790/`
  - `ReleaseState: prerelease`.
  - Timestamp snapshot `2026-08-18T17:00:00Z`.
- Release decision: `prerelease`; public label must remain `EARLY ACCESS · AUG 18`.
- Workspace started as an empty Git repository on `main` with no project files or prior commits.

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Central `GameSnapshot` and evidence-aware registries | Prevents copy drift and makes release-day updates traceable. |
| Typed content registry plus route wrappers | Keeps long unique content out of `page.tsx` while preserving static App Router routes. |
| Vitest + Testing Library + Playwright | Covers registry/data contracts, server-rendered SEO output, route/runtime, and required viewport QA. |
| Environment-aware metadata robots | Production canonical always targets apex; Preview and development emit noindex without changing canonical. |
| One small client island for mobile navigation and one for the troubleshooter if shipped | Preserves Server Components-first architecture and modest JavaScript. |
| Original SVG mark and restrained cartographic route-line signature | Implements the Cursed Expedition Field Guide identity without copying official or reference-site logos. |
| Steam-hosted 10-file visual set | Satisfies the official-media-first requirement with local files and exact provenance while avoiding a challenged third-party CDN path. |
| One evidence-gated client island | The Co-op Troubleshooter provides eight deterministic symptom flows without accounts, storage, unsafe fixes, or fabricated server diagnosis. |
| 24 public V1 routes | The 23 required core routes plus the accepted Co-op Troubleshooter are statically generated or server-rendered with no orphan core page. |
| Public, noindex Vercel Preview | Owner review does not require a Vercel account; page metadata, response headers, and robots policy all keep Preview out of search. |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| Steam Community all-news page was blocked by the browser safety layer | Verified the official feed using Steam's first-party `ISteamNews` API. |
| The first worktree creation chain stopped on an ignore check for a nonexistent directory | Re-ran the check against the intended child path and created the worktree successfully. |
| RetroStyle's image CDN returned a Cloudflare challenge and its browser asset inventory timed out | Used the publisher media exposed on Steam: key art, page background, header, icon, five feature strips, and the official roadmap. |
| First Vercel deploy was mislabeled Production despite `--target preview` | Removed that exact deployment and all generated aliases; the retained delivery target is Preview and the formal domain remains unattached. |
| Vercel project auto-detection selected `Other` | Corrected the project preset to Next.js; subsequent deployment produced the expected framework output manifest and served all routes. |
| Preview direct traffic failed on the local unproxied network path | Used the machine's configured HTTP proxy for deployed verification; five viewports, 24 routes, tool flow, SEO, images, and 404 passed. |

## Resources
- Planning Pack: `/Users/alisa/Downloads/dietogetherguide_gsf_pack/`
- Steam Store: `https://store.steampowered.com/app/4317790/Last_Pirates_Die_Together/`
- Steam official news API: `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=4317790`
- SteamDB: `https://steamdb.info/app/4317790/`
- RetroStyle game page: `https://retrostylegames.com/games/last-pirates-die-together/`
- GitHub: `https://github.com/alisas-cell/dietogetherguide`

## Human Gate Pre-Fix Capture Baseline
- Authoritative deployment: `dpl_GKQrcD92ZAzcNy8a3VDjw3z51z9U`.
- Authoritative URL: `https://dietogetherguide-bj3w8zoiw-alisasun.vercel.app/`.
- Vercel project/scope: `dietogetherguide` / `alisasun`; account ID `team_0a2eTmxPPNoh98bapE2BEIpu`.
- Vercel inspect reports `target: preview`, `status: Ready`; deployment metadata points to reviewed SHA `300fb71a3a675b1af9f62c056d3a199abc55a4c4`.
- A fresh non-persistent anonymous Playwright CLI session opened the site with no cookies, no login wall, and zero console errors/warnings.
- Removed stale Preview deployments `dpl_A5VnTpfws33okrW4weAghWDWVGCR` and `dpl_9Nz14yaRJmEDhw36BNfnbxvSr9zN`; the project deployment list now contains only the authoritative reviewed-SHA Preview.
- This deployment is the source of the first 10-image Human Gate capture set. It will be replaced only after the final fix commit is pushed and the replacement Preview passes the same gate.

## Human Gate Fact Gate
- Rechecked at `2026-08-17T13:59:03Z`.
- Steam Store still states `This game is not yet available on Steam` and `Planned Release Date: 18 Aug, 2026`.
- SteamDB remains `ReleaseState: prerelease`; its `2026-08-18T17:00:00Z` record remains a snapshot, not a guaranteed launch minute.
- The official Steam News API and Community page show the newest item as the August 7 Busan Indie Connect post; no verified unlock/available-now announcement is present.
- Human Gate decision: retain `EARLY ACCESS · AUG 18`; do not convert Demo evidence into Early Access facts.

## Human Gate UI Findings
- Full UI audit: `READY`, 36/36 selected rules run, zero remaining findings, unknowns, or suppressions. Machine-readable record: `.planning/2026-08-17-dietogether-v1/human-gate-ui-audit.json`.
- Mobile tables: the wide table's grid item expanded the document to 642px at a 390px viewport. `.article-body { min-width: 0; }` keeps document width bounded while preserving the table's focusable horizontal scroller.
- Mobile menu: focus was trapped while open but fell to the document when closed. The exact trigger element is now restored in effect cleanup.
- Tool targets: the five radio labels measured 42px and the source disclosure measured 26px. Both now meet the preferred 44px touch height.
- Custom 404: `dynamicParams = false` returned the right 404 but emitted Next.js `NoFallbackError` on server stderr. The default fallback now reaches `notFound()` cleanly; the 23 guide records remain statically generated.
- No route, title, H1, canonical, information-architecture, evidence, release-state, or broad visual-system changes were made.
