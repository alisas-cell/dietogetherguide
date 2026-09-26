# Qualified first batch — September 26, 2026

User authorization: “先发布合格批次”. This release is seven new editorial pages, not completion of the original 500-page target. Baseline commit: `406eb5ab559a69dbb86a244fa6796a23b722dfc1`; 88 old public routes must remain; target is 95.

## Content and boundaries

The three dated patch digests, slot-loss refund lookup, cauldron state guide, returning-player checklist and complete Steam language matrix are listed in `editorial-assessment.json`. `source-recheck.md` records freshly accessed official evidence. Frozen body/fact reviews are in `data/expansion/editorial-reviews.json`; they are Codex editorial reviews, not human playtesting or Google indexing certification.

September 25 changes update affected pages only. September 10/25 chapter wording is explicitly unresolved. No invented chapter reconciliation, numeric shop table, spawn rate, healing amount, armor effect or slot-machine odds. Unrelated page review dates remain unchanged.

## Independent review

Read-only reviewer inspected product changes against `be64ae5`. No critical finding. Important: old unconditional chapter wording survived in homepage, three notebook surfaces and level-order detail. Fixed by dating the evidence and using the current-selector caution; regression observed RED then GREEN. Minor chair-pickup ambiguity corrected to picking up items from chairs.

The minor existing patch-context-link fallback for September 1/August 28 is deferred: the new pages have actual inbound editorial links and search entries; fallback links still resolve to the monthly timeline. It is not an orphan or broken link.

Declined-to-judge rulings: evolving audit code verified by targeted tests and live HTTP audit, not a second independent review; browser/deploy evidence is recorded separately; Google indexing, gameplay results and real advertising fill are not certified. No claim of 500 complete pages.

## Verification

- Unit suite: 142 passed, zero failures.
- Typecheck, lint, production build: passed before browser testing; final validation recorded at deployment.
- Local production-equivalent HTTP audit: 95 routes, 7 net-new, all 88 preserved, no exclusions, self-canonical and indexable; 95 matching sitemap entries.
- SEO audit: zero failures across 95 routes.
- Ad registry: 93 eligible routes; Privacy/Terms excluded. Every eligible route includes native and early responsive inventory; provider IDs, loader behavior and CMP implementation unchanged.
- Canonical-host privacy suite: 32 passed, 23 deliberate viewport-specific skips. Covers refusal, acceptance, breakpoint dimensions, singletons, no-fill/failure collapse and revoke/regrant. Uses deterministic provider fixtures, not live fill.
- New-page browser checks: all seven at 320px and 1440px return 200, one H1, one native shell, one responsive shell, no horizontal overflow. Mobile/desktop screenshots visually inspected.
- General browser suite: 24 passed, 19 viewport/environment skips; one full-registry image sweep hit the old 180-second total limit under concurrent load. Its timeout now scales with route count without weakening assertions; isolated rerun passed all 95 pages in 34.1 seconds (one test). Thus all 25 applicable checks passed, across the final run and isolated rerun. The first production-equivalent run exposed test-environment assumptions (development noindex and no saved privacy choice); the harness now supports explicit production robots expectations and rejects advertising for functional tool checks. The actual CMP was not bypassed or changed.

## Deploy and rollback

Preview: `https://dietogetherguide-hum9cx1e6-alisasun.vercel.app`, deployment `dpl_6SongadmSuwtntn19WP41RuPQd5d`, READY. Production is rebuilt separately so Preview noindex cannot be promoted accidentally.

Preview HTTP verification: language-page body matches frozen review, self-canonical to apex, `noindex, nofollow, nocache`; robots disallows `/`. Production candidate `https://dietogetherguide-3oxsg4y8m-alisasun.vercel.app`, `dpl_2f5YuoxtePeKwenMtx7LwpCUfvBp`, READY: September 25 page matches frozen body, `index, follow`, self-canonical; robots allows `/`. Candidate was built with `--prod --skip-domain`, before promotion.

Previous production / rollback: `https://dietogetherguide-bt0j958rd-alisasun.vercel.app`, deployment `dpl_HMd6oucZwhRG6bRa4NbYQjrLFqa4`. Rollback command: `npx vercel rollback https://dietogetherguide-bt0j958rd-alisasun.vercel.app --scope alisasun`.

Production promoted successfully to `dpl_2f5YuoxtePeKwenMtx7LwpCUfvBp`. Canonical domain: https://dietogetherguide.shop. Implementation commit: `b1144f1` on `codex/dietogether-net-new-500-20260926` (pushed). The candidate was built from the tested working tree before this commit; the deployed editorial bodies match the frozen review. No merge into the unrelated main checkout was performed; branch and worktree retained.

Live release audit at `2026-09-26T12:51:23.841Z`: PASS, baseline88, final95, netNew7, zero exclusions/errors, all canonical responses200/indexable and sitemap matches95. Live SEO audit at `12:51:50.720Z`: zero failures. See `production-release-audit.json` and `production-seo-audit.json`.

Live browser smoke: September25 page at390px/1440px returns200, oneH1, `index, follow`, native+responsive shells, bannerwidth320/728, no horizontal overflow or page errors. Debug mode was used to avoid generating live provider traffic; actual advertising fill/revenue remains provider-dependent. `www` returns308 to the apex. Privacy/Terms remain excluded from monetization.

Rollback is available but was not needed. The original +500 target is still incomplete and is not a release claim for this batch.
