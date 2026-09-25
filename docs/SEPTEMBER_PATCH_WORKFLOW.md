# September patch-driven wiki

Baseline: 4532cf01aa512991aec06af8cdf098d2a0c51430. Branch: codex/dietogether-massive-seo-20260925.

## Evidence update workflow

1. Review the official Steam announcement archive and store. Record the actual review date in data/current.ts, not the build time. An older latest patch is legitimate when no newer gameplay post exists.
2. Add the exact announcement title, date and source in data/september-patches.ts (or a subsequent month module). Prefer a direct permalink. Archive links must retain the exact title and publication date; never fabricate announcement IDs.
3. Add one typed patch record with affected routes and entity IDs. Keep renamed creatures, new unnamed threats, historical events and current facts distinct.
4. Update the affected entity fields, not just its last-checked date. The shared registry drives detail pages, hub records, finder rules and search aliases. Update level, loot, store and achievement facts only to the extent supported.
5. Update practical guidance when a rule is superseded. Preserve dated patch history. Do not silently promote Demo fields, infer full level assignments or freeze old shop values into current recommendations.
6. Run npm run audit:freshness, npm run audit:site (against a running build), npm test, npm run lint, npm run typecheck and npm run build. The freshness audit compares stored review state, sources, affected routes and monster patch coverage; it does not independently fetch today’s Steam news.
7. Test desktop and narrow mobile tools, localStorage reload/import/export, consent rejection/acceptance and navigation. Existing legal pages remain ad-free; all other pages reuse the existing Adsterra runtime and registered units.
8. Deploy Vercel Preview and obtain Human Gate approval before promoting to Production. Preview deliberately remains noindex and ad-provider-free. A Preview sitemap lists the production-intended canonical URLs, not permission to index Preview.

## Content and QA decisions

88 production-intended URLs: all 39 baseline URLs, plus 49 new URLs. Narrow reference records remain concise where official evidence is limited. Their value is distinct factual identification, dated changes, practical decision tables, source links and tool connections—not an arbitrary six-section minimum. Larger system guides and directories provide the broader context. The old exact 39-route and August-only assertions were replaced with current contracts and independent baseline-preservation tests.

No actual game playtest or numeric performance benchmark is claimed. The two unnamed September enemies, exact spawn/level matrix, most prices and hidden stats remain unresolved. Steam lists 20 achievements with 18 visible descriptions; two conditions and hidden flags are not inferred.

S06 is preserved as an archival playtest source with no current substantive consumer; audit:freshness correctly reports that one warning instead of inventing a use for it.

## Storage and monetization

The existing run notebook keeps its v1 key and accepts old records without a global-level field. New global-level data is optional. The progression tracker uses a separate v1 key, validates imports before replacement, asks before replacement/reset and saves only on explicit request. Quota Planner is arithmetic on user-provided numbers.

The original ad IDs, provider URLs, loading runtime and consent architecture are unchanged. Only the route classification table expands. Provider scripts stay disabled on Preview and localhost; canonical-host behavior is tested with mocked providers, not by clicking live advertising.

## Release and rollback

This task does not merge into main, change production DNS or promote a deployment. After Human Gate, use the verified Vercel deployment through the normal production workflow. If regression appears, promote the prior known-good production deployment rather than deleting data or rewriting history. Existing prior deployment recorded at the baseline: dpl_5yNYjKY5FE5YD6pMF5LWeR8eeFku.

Before promotion, compare the current production deployment again. Check home, one entity, one system guide, all five tools, robots/canonical/sitemap and privacy choices after release. No new analytics tracker or monitoring vendor was added; there was no existing analytics package found in app/components/lib or package.json.
