# Achievement and tool evidence assessment

Reviewed 2026-09-26. Scope: manifest IDs 338–377 and 438–462, 65 candidate routes. Repository baseline: `/Users/alisa/Documents/ChatGPT/高优先级/.worktrees/dietogether-massive-seo-20260925`, verified HEAD `406eb5a`. Read-only research; no product files changed and no deployment.

## Decision meaning

- `supported-to-draft`: a distinct, substantial utility can be built with the stated contract. This is not a claim that a finished page exists, is indexable, or passes the full page gate. A calculator/checklist with generic tips is insufficient.
- `needs-evidence`: retain only as an unqualified candidate. A named condition or missing-condition disclaimer does not establish enough substance for an individual SEO guide. Specific missing evidence is listed.
- `duplicate-intent`: merge into the named existing/candidate owner and replace this candidate 1:1. A different slug, layout, or narrower filter does not produce a new search task.

Result: 8 supported-to-draft utility contracts, 34 needs-evidence candidates, 23 duplicate-intent candidates. **None of these 65 is yet a demonstrated new qualified indexable page.** This assessment deliberately does not convert the manifest's 3-fact minimum into permission for 3 generic facts.

## Source and access record

1. Master pack: `/Users/alisa/Downloads/DIETOGETHERGUIDE_500_PAGE_SEO_MASTER_PACK_2026-09-26.md`, read all 586 lines. Companion manifest candidate definitions read for this scope. These are requirements and candidate claims, not independent game evidence.
2. Existing official-source pointer S26: [Steam global achievements](https://steamcommunity.com/stats/4317790/achievements/). `data/september-patches.ts:49` records the previous review as 20 public names, 18 visible descriptions, no exposed hidden flags. `data/achievements.ts` retains null for Rich Deadman and On the top. This is **prior repository research**, not a fresh successful retrieval on September 26.
3. Fresh retrieval attempted: Steam global achievements with no query, `l=english`, `l=schinese`, `xml=1`, and English achievements-tab variant. Every web open returned inaccessible. Direct curl to the English page timed out after 25 seconds with no content. In-app browser creation timed out after 30 seconds and reset; no DOM or screenshot was obtained. No sign-in attempted.
4. [Official global percentage API](https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid=4317790): web open inaccessible; direct curl timed out after 20 seconds with zero bytes. Even a successful percentage response would prove API names/percentages, not descriptions, hidden flags or trigger conditions. No API key is available or requested; schema calls requiring a key were not used.
5. [SteamDB achievements](https://steamdb.info/app/4317790/stats/): accessible via web tool, but achievement region contains only “Loading…”. Returned metadata reports last record update September 3, 2026, earlier than the September 10 achievement addition. It cannot corroborate the 20 descriptions or the two withheld conditions. Do not mark it current merely because retrieval happened today.
6. [September 10 official announcement](https://store.steampowered.com/news/app/4317790/view/716789922107752687): fresh web retrieval returned only one image line, not article text. Repository S23/patch registry remains prior evidence for 20 additions, equipment and chapter changes.
7. [September 18 official announcement](https://steamcommunity.com/games/4317790/announcements/detail/680761758839734874): source relationship retained from repository S25 for elevator/cargo/revive/lobby fixes. Not freshly re-read within this subtask.

Do not advance any `checkedAt` for the game facts to 2026-09-26 merely because an unsuccessful request was attempted. Record an access attempt separately from successful content verification.

## Reconciliation of 20 names / 18 visible conditions

The baseline registry has exactly 20 names. Eighteen have prior public descriptions; Rich Deadman and On the top have `condition: null`. All have `hidden: null`. “Description unavailable” is not evidence that an achievement is hidden.

The manifest asserts “leave the shop with at least 1000¢ unspent gold” for Rich Deadman and “reach the top of the mast” for On the top. These two claims are **not corroborated by the reviewed live surface**. They must remain proposed conditions, not factual published instructions. Mast parkour mentioned elsewhere does not prove its achievement trigger. A generic money requirement elsewhere does not prove Rich Deadman's threshold or trigger event.

To resolve: obtain a current Steam Library achievement screenshot, public official description, or current-build controlled observation showing game/version/date, exact displayed text, initial locked state and unlock event. If using a secondary database, identify app 4317790 (not a playtest/demo), retrieval date and build context; it remains secondary provenance. No trophy percentage, achievement icon or title can substitute for trigger evidence.

### All 20 individual route decisions

Condition descriptions below are paraphrases of the baseline S26 record, not new direct quotes from Steam. They identify what is known and what is still needed for a substantial guide.

| ID | Route | Decision | Condition/evidence boundary and missing substance |
|---|---|---|---|
| 338 | `/achievements/first-run` | needs-evidence | Prior condition: finish opening day. Need current trigger confirmation, completion UI and whether joining late receives credit. Tutorial completion and chapter completion are separate objectives. One sentence plus generic beginner advice is thin. |
| 339 | `/achievements/all-circles-of-hell` | needs-evidence | Prior condition: finish every chapter. September progression restructuring is relevant, but no full current chapter count, required completion set or attribution behavior is established. Do not infer these from 15 levels. |
| 340 | `/achievements/full-clear` | needs-evidence | Prior condition: all loot spawned in one level returned. Need evidence of eligible loot, composite pieces, destroyed/consumed loot treatment, completion timing and a reproducible inventory/attempt method. 70 new spawn points does not identify a deterministic full-clear route. |
| 341 | `/achievements/big-money` | needs-evidence | Prior condition: more than 1300¢ in one boat delivery. Preserve strict `>` rather than `>=`; need delivery aggregation/timing behavior and tested way to prepare an eligible batch. No fixed loot values/prices known. |
| 342 | `/achievements/successful-delivery` | needs-evidence | Prior condition: composite item returned intact without damage; Cover has separate protection relevance. Need eligible composite-item examples, visible damage check and delivery recognition. Cover ownership is not an unlock requirement. |
| 343 | `/achievements/cashback` | needs-evidence | Prior condition: activate Golden Butt cashback. Need actual trigger, equipment activation feedback and a current attempt showing unlock. Title and effect name do not prove chance, cooldown, refund amount or ownership alone. |
| 344 | `/achievements/rich-deadman` | needs-evidence | Name only in baseline public evidence. Manifest's 1000¢/shop-exit condition unverified. Withhold condition and strategy until primary/current observation resolves it; an unknown-only page should not be published. |
| 345 | `/achievements/no-head-no-problem` | needs-evidence | Prior condition: defeat Head Man. Need current identity, recognition and encounter evidence. Head Man is not automatically Head Crab; do not manufacture a spawn or boss guide from the title. |
| 346 | `/achievements/one-shot-one-boss` | needs-evidence | Prior condition: defeat an enemy with Cannon. Title does not establish a boss requirement or one-hit kill. Need eligible target/kill attribution, weapon preparation and tested attempt; no published damage guarantee. |
| 347 | `/achievements/shark-on-land` | needs-evidence | Prior condition: defeat Shark. Need current encounter and identification evidence, distinct from historical demo roster. Existing name does not prove current spawn level/counterplay. |
| 348 | `/achievements/dont-blink` | needs-evidence | Prior condition: defeat Man in Shadow; singular spelling retained as achievement provenance. Known movement/teleport fixes help context, but no tested kill plan, equipment or level assignment exists. |
| 349 | `/achievements/full-bestiary` | needs-evidence | Prior condition refers to six enemies without naming them. Need exact eligible set and kill credit semantics. Current 12-monster site roster is not the achievement set. |
| 350 | `/achievements/loud-deaths` | needs-evidence | Prior condition: two enemies defeated by the same Bomb. Need eligible target, blast/kill credit and safe reproducible attempt evidence. Do not invent bomb radius, damage or timer. |
| 351 | `/achievements/pulled-yourself` | needs-evidence | Prior condition: self-revive. Need distinguish effect/item required, current self-revive UI/action and trigger confirmation. Existing revive mechanics may be linked but don't prove hidden eligibility. |
| 352 | `/achievements/nine-lives` | needs-evidence | Prior condition: at least 3 Iron Butt revives in one level. Need reset boundary and current repeat-use/consumption evidence. “One level” must not be rewritten as one chapter/run. |
| 353 | `/achievements/fishy-doctor` | needs-evidence | Prior condition: cumulative 500 HP restored to allies using Healing Fish; allies required by wording. Need valid-heal accounting, overheal treatment and session persistence to make a concrete plan. 500 is a total, not per-fish healing. |
| 354 | `/achievements/clean-cut` | needs-evidence | Prior condition: revived after Guillotine takes booty. Need current sequence, revival method and attempt recognition. A general guillotine description is not enough for an unlock walkthrough. |
| 355 | `/achievements/money-first` | needs-evidence | Prior condition: pay Monkey a coin. Need which Monkey interaction, current prompt and eligible payment event. Cart/porter/other monkey labels cannot be silently conflated. |
| 356 | `/achievements/on-the-top` | needs-evidence | Name only in prior public evidence. Mast-top candidate unverified. Need exact target/trigger or controlled current unlock observation. Do not infer height/route requirement from parkour feature. |
| 357 | `/achievements/graduated` | needs-evidence | Prior condition: finish tutorial; September tutorial fixes relevant. Need current completion action/UI and verification boundary distinct from first day. Single trigger plus generic troubleshooting is insufficient. |

### Achievement-support route decisions

| ID | Route | Decision | Rationale / intended owner / missing evidence |
|---|---|---|---|
| 358 | `/achievements/guides/all-achievements-checklist` | duplicate-intent | Existing `/achievements` lists all 20, and existing `/tools/progression-tracker` supplies local persisted checkboxes/import/export. Static checklist or second tracker repeats the existing task. |
| 359 | `/achievements/guides/100-percent-guide` | needs-evidence | Potential owner for one complete planning guide. Requires validated dependency/equipment/level plan, six bestiary targets and both missing conditions. Cannot claim 100% completeness now. |
| 360 | `/achievements/guides/achievement-order` | duplicate-intent | Same sequencing decision as 359 and proposed roadmap builder 448. Put ordering in the single roadmap owner; no verified “best” order exists. |
| 361 | `/achievements/guides/solo-achievements` | needs-evidence | Fishy doctor wording establishes allies; absence of ally text does not establish solo feasibility/credit for other achievements. Need tested solo attribution matrix with method/version. |
| 362 | `/achievements/guides/coop-achievements` | needs-evidence | Could own host/joiner/actor credit matrix if tested. Requires crew-specific unlock evidence; generic co-op planning repeats existing cooperation material. |
| 363 | `/achievements/guides/loot-achievements` | needs-evidence | Distinct only as tested attempt comparison: all-loot vs one-batch >1300 vs intact-composite constraints. Need interaction/eligibility evidence, not three rewritten conditions. |
| 364 | `/achievements/guides/combat-achievements` | needs-evidence | Potential owner for eligible-target/weapon/kill-attribution matrix. Requires tested kill methods and six-enemy set; currently only condition labels exist. |
| 365 | `/achievements/guides/revive-achievements` | needs-evidence | Potential owner for self-revive / 3 Iron Butt revives / post-guillotine sequencing, reset and attribution comparison. Requires current behavior tests. |
| 366 | `/achievements/guides/monster-kill-achievements` | duplicate-intent | Subset of combat-achievement matrix 364; no independent task beyond target filtering. Merge target-specific evidence there or individual verified guides. |
| 367 | `/achievements/guides/ship-achievements` | needs-evidence | Ship grouping needs actual location constraints; mast objective not confirmed and boat delivery is not evidence all conditions are Ship-exclusive. |
| 368 | `/achievements/guides/tutorial-achievements` | duplicate-intent | Groups 338/357 and repeats existing tutorial owner. Add the comparison to tutorial/individual guides; grouping two descriptions is not a substantial new page. |
| 369 | `/achievements/guides/money-achievements` | needs-evidence | Need verified cashback/shop/payment trigger distinctions and Rich Deadman condition. Money-themed grouping alone is insufficient. |
| 370 | `/achievements/guides/hidden-achievements` | needs-evidence | No exposed hidden flags. Two absent descriptions cannot establish two hidden achievements. Could be evidence report after verified schema/UI resolves flags; currently unknown-only. |
| 371 | `/achievements/guides/achievement-not-unlocking` | needs-evidence | Distinct diagnostic task only with current observed failure cases and official Steam/game guidance. Do not invent offline/co-op/mod restrictions or bugs from lack of unlock. Need expectation vs exact attempt outcome. |
| 372 | `/achievements/guides/full-clear-tips` | duplicate-intent | Same attempt/strategy task as 340. Consolidate evidence into the Full Clear guide. |
| 373 | `/achievements/guides/big-money-tips` | duplicate-intent | Same strategy/threshold task as 341. |
| 374 | `/achievements/guides/full-bestiary-tips` | duplicate-intent | Same eligible-set/kill plan task as 349. |
| 375 | `/achievements/guides/nine-lives-tips` | duplicate-intent | Same repeat-revive plan as 352. |
| 376 | `/achievements/guides/fishy-doctor-tips` | duplicate-intent | Same cumulative-healing plan as 353. |
| 377 | `/achievements/guides/clean-cut-tips` | duplicate-intent | Same guillotine/revive sequence as 354. |

## Tool baseline (must not count as new)

`lib/seo/routes.ts` explicitly registers five tools: `/tools/coop-troubleshooter`, `/tools/monster-finder`, `/tools/run-chapter-tracker`, `/tools/progression-tracker`, `/tools/quota-planner`.

`components/tools/PlanningTools.tsx` and `lib/tools/planning.ts` prove quota planner already takes quota, secured, carried, estimated and crew inputs and returns secured gap, post-cargo gap, post-estimate gap and equal per-crew share. Progression tracker already records chapter, global level, map, completed levels, unlock observations, all 20 achievement IDs, notes, local save and JSON transfer.

`components/tools/CoopTroubleshooter.tsx` and `data/troubleshooter.ts` prove existing diagnoser covers lobby connection method/visibility, host/joiner/solo role, version agreement, Steam online state, Windows/Deck, reconnect and open-deck voice failure. A dedicated slug around one dropdown choice is not a new utility.

## All 25 tool route decisions and contracts

| ID | Route | Decision | Concrete utility contract or rejection reason |
|---|---|---|---|
| 438 | `/tools/loot-run-planner` | supported-to-draft | User enters named observed loot tasks, value only if known, pickup point, chosen route segment, assignee and status. Produces exportable trip manifest, unassigned-task warnings, outstanding object list and reconciliation after delivery. Distinct from quota arithmetic and run outcome tracker. No predicted spawns, capacity, optimal path or success score. Need at least editable multi-item state + meaningful validation + saved/exported plan, not a few checkboxes. |
| 439 | `/tools/quota-gap-calculator` | duplicate-intent | Already fully implemented in quota planner (`securedGap`, `afterCargo`, `afterEstimate`). |
| 440 | `/tools/quota-buffer-calculator` | duplicate-intent | A user-entered reserve/percentage changes arithmetic within the same quota decision; add as optional existing planner feature. No current damage/spawn data justifies a game-derived “safe” buffer. |
| 441 | `/tools/crew-role-planner` | supported-to-draft | User names 1–4 crew members, task availability, chosen roles and backup assignees; output rotation/coverage matrix, unresolved role coverage and editable handoff plan/export. Roles clearly user choices, not official required classes; no claimed optimal composition. Must handle roster changes and reassignment to be substantial. |
| 442 | `/tools/return-risk-checklist` | needs-evidence | Generic danger/health/loot checkbox list overlaps hauling/return guidance and 438. To earn own route needs current hazard-specific branching and defensible observed states, not numerical risk score or fabricated survival odds. |
| 443 | `/tools/fragile-loot-checklist` | supported-to-draft | Per-object inspection/attempt ledger: object label, composite parts observed, visible pre-haul condition, Cover observed yes/no/unknown, intermediate inspection and arrival condition; flags incomplete inspections, tracks damage-change evidence, exports attempts. Link Success Delivery condition and current protection source; no claim that inspection proves an unlock or Cover gives immunity. Distinct from broad cargo manifest 438 because its output is before/after integrity evidence. |
| 444 | `/tools/large-item-haul-planner` | supported-to-draft | User provides route stages/obstructions, participating carriers, availability and handoff points; utility detects unassigned stages, conflicting crew commitments, missing arrival confirmation and produces ordered handoff plan. No game weight/capacity/speed defaults or automatic optimal hauling. Distinct from item inventory 438 only if it implements stage/crew conflict scheduling. |
| 445 | `/tools/cart-load-planner` | duplicate-intent | Cart-only cargo list is a filter of 438/444. No known cart capacity or current size/weight rules supports a separate load optimizer. Put cart as user-chosen transport in main hauling plan. |
| 446 | `/tools/elevator-haul-checklist` | needs-evidence | Existing elevator guide already covers confirmed controls/cargo fixes. A checkbox wrapper is insufficient. Needs current transport-stage behavior plus independent multi-floor transfer/reconciliation utility; avoid invented floor mappings/capacity. Could become mode of 444 instead. |
| 447 | `/tools/achievement-tracker` | duplicate-intent | Existing progression tracker includes all 20 local checkbox IDs with save/import/export. |
| 448 | `/tools/achievement-roadmap-builder` | needs-evidence | Could produce equipment/crew/task dependency plan beyond checkbox tracker, but needs verified prerequisites, credit behavior and missing conditions; no “best” ordering or predicted time-to-100% justified now. Manual list sorting alone is not enough. Merge 359/360 planning intent if developed. |
| 449 | `/tools/monster-counter-checklist` | duplicate-intent | Existing monster finder owns evidence-backed counter selection. Checklist of chosen monsters is a new state feature there, not independently established counter data. |
| 450 | `/tools/patch-impact-finder` | supported-to-draft | User selects last-played date and relevant entities/systems; joins dated patch records to show ordered changed behavior, resolved fixes, related routes and evidence provenance; explicitly reports uncovered/unknown topics. Meaningful date+entity multi-select and before/after grouping, not site search results. Current registry supports deterministic relationships; source freshness must remain actual reviewed date. |
| 451 | `/tools/item-change-finder` | duplicate-intent | Entity filter of 450, using same patch graph/output. |
| 452 | `/tools/map-change-finder` | duplicate-intent | Location filter of 450, using same patch graph/output. |
| 453 | `/tools/coop-session-checklist` | supported-to-draft | Crew-wide pre-session readiness matrix with per-person observed version, selected joining method, role, Steam state and ready/blocked/unknown; tracks outstanding owners and handoff/export for the session. Distinct from single-symptom troubleshooter only if actual multi-person coordination is implemented. No guarantee that all-green means connection succeeds. |
| 454 | `/tools/lobby-diagnostics` | duplicate-intent | Existing co-op troubleshooter already owns role, method, visibility, same version/online checks and lobby symptom flow. |
| 455 | `/tools/voice-chat-diagnostics` | duplicate-intent | Existing diagnoser has open-deck voice branch and reversible microphone checks. New title without deeper verified decision system does not qualify. |
| 456 | `/tools/reconnect-checklist` | duplicate-intent | Existing diagnoser already implements dedicated reconnect, desync and host migration checks with source links. |
| 457 | `/tools/steam-deck-checklist` | needs-evidence | Deck Verified status is not verified settings/FPS evidence. Needs fresh current Valve/store status and actual controls/session workflow; checklist around existing platform article is thin. No unsupported Proton/FPS/TDP defaults. |
| 458 | `/tools/performance-checklist` | supported-to-draft | Reframe as user-owned repeatable benchmark worksheet: user provides build, hardware, resolution/settings, repeated FPS/frame-time measurements and changed setting; utility computes within-user deltas, variation and missing-test warnings with export. Never supplies game benchmarks or optimal presets. Distinct measurement comparison, not generic troubleshooting checkboxes. Transparent math and user-data provenance can meet substantial utility exception. |
| 459 | `/tools/first-run-checklist` | duplicate-intent | Static beginner checklist duplicates existing tutorial/progression guide tasks and tracker. New route requires a separate interaction beyond completion toggles; none in candidate contract. |
| 460 | `/tools/returning-player-checklist` | duplicate-intent | Last-played-date and changed-system task is owned by 450; preserve returning-player landing guide only if independently substantive, not second tool. |
| 461 | `/tools/source-freshness-checker` | supported-to-draft | Source-ledger audit accepts/presents checked date, publisher, claim/build scope and user-selected age threshold; distinguishes source age, successful verification age, unreachable retrieval and mismatched build; outputs due-review queue/export with source links. Age is not truth and threshold is user's policy. Distinct from patch finder because it audits evidence coverage, not changes. Search value must still be reviewed: useful editorial utility does not automatically justify game-player SEO landing intent. |
| 462 | `/tools/build-change-log-viewer` | duplicate-intent | Chronological patch list repeats updates archive and 450. Current public build IDs incomplete; do not invent full build→patch mapping. If implemented, a view in 450 suffices. |

## Substantive replacement candidates (not automatically approved pages)

These can replace duplicate slots only after baseline/whole-manifest collision and utility QA. They are materially different data tasks, not alternate slugs for the rejected pages. Prefer implementing a few deep utilities rather than asserting enough replacements to fill all 23 rejected slots.

| Proposed route | Independent contract | Evidence requirement / boundary |
|---|---|---|
| `/tools/loot-inventory-reconciler` | Compare separately entered discovery inventory with returned/destroyed/unaccounted inventory; identify missing objects, double counting, inconsistent state and recoverable audit trail. Import/export item snapshots. | Distinct from forward trip plan 438 only if independent snapshot reconciliation is substantial. Does not claim every procedurally spawned item was discovered. User labels/values only; supports Full Clear attempt evidence, not unlock guarantee. |
| `/tools/composite-item-inspection-log` | Record named composite parts and photos/notes observed at stages; compare snapshots and show lost/damaged/uninspected pieces across attempts. | Potential duplicate of 443; choose this more substantial implementation **instead of** 443, not both, unless separately verified workflows justify it. No eligible-item catalogue without observation. |
| `/tools/crew-benchmark-comparator` | Import benchmark records from different crew members; compare only matched build/settings/scenario, flag incomparable runs and weakest observed frame-time/fps results. | Materially separate from individual benchmark worksheet 458 if multi-record import/matching works. No network bottleneck or causal performance claim inferred from FPS. User measurements only. |
| `/tools/bug-report-evidence-builder` | Build reproducible report from observed build/platform/host role, steps, expected/actual result and screenshot/log references; identify missing fields, redact manually identified secrets, export text. No sending. | Uses user observations and official support destination link; does not diagnose a cause or claim bug confirmed. Distinct deliverable from existing troubleshooting recommendation. Need official current reporting guidance/destination before claiming game-specific process. |
| `/tools/achievement-attempt-log` | Record initial Steam locked state, exact objective text/provenance, actor/host/joiner, action, observed result and build; compare attempts and export a verification record. | Distinct from completed-achievement tracker 447: records evidence of failures/successes and avoids asserting hidden conditions. Can be supplied now with user text, but needs usable multi-attempt comparison and controlled vocabulary, not freeform notes. |

No evidence justifies fabricating 20 additional achievement-support pages merely to preserve the achievement cluster count of 40. Use replacements across clusters only where the independent utility or factual evidence is real. This subtask's access failures are a concrete source limit; they do not relax the user's +500 or no-thin-page requirements.
