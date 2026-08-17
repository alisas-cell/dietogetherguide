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

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| Steam Community all-news page was blocked by the browser safety layer | Verified the official feed using Steam's first-party `ISteamNews` API. |
| The first worktree creation chain stopped on an ignore check for a nonexistent directory | Re-ran the check against the intended child path and created the worktree successfully. |
| RetroStyle's image CDN returned a Cloudflare challenge and its browser asset inventory timed out | Used the publisher media exposed on Steam: key art, page background, header, icon, five feature strips, and the official roadmap. |

## Resources
- Planning Pack: `/Users/alisa/Downloads/dietogetherguide_gsf_pack/`
- Steam Store: `https://store.steampowered.com/app/4317790/Last_Pirates_Die_Together/`
- Steam official news API: `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=4317790`
- SteamDB: `https://steamdb.info/app/4317790/`
- RetroStyle game page: `https://retrostylegames.com/games/last-pirates-die-together/`
