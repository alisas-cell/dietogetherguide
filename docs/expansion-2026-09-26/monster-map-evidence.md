# Monster and map candidate evidence review

Research date: 2026-09-26 (Asia/Shanghai). Scope: primary manifest IDs 51–167, 117 candidates. Repo inspected read-only at the assigned worktree; only this research artifact is owned. No product edits or deployment.

## Decision

17 candidates are supported to draft with a defined distinct artifact, 67 need new evidence, and 33 overlap a current parent or another proposed page at the evidence depth available. These are editorial triage decisions, not proof of net-new live status, indexing, finished copy quality, or baseline collision counts. Every supported draft still needs the parent's final route/content audit.

The proposed 117 cannot honestly all pass today's gate using the located evidence. That is not a statement that the research gaps are permanent. Current-build recordings, reproducible observations and richer distinct utilities can move candidates forward. Replacements should be chosen for distinct useful tasks; a larger generic “known unknowns” section does not create three facts.

Applied seo-content trust/firsthand/duplication criteria. No useful shared cache was available. Kept findings here because the assignment limits ownership to this file; no cache or gitignore mutation.

## Sources and access

| Key | Source | Date/context | Access and evidentiary limit |
|---|---|---|---|
| A-news | [Official Steam news archive](https://steamcommunity.com/app/4317790/allnews/) | Read 2026-09-26; body includes Sep25, Sep18, Sep14, Sep10, Sep1, Aug28 | Complete relevant body retrieved through web; title/date visible. No exact build from this surface. |
| A-store | [Official store](https://store.steampowered.com/app/4317790/Last_Pirates_Die_Together/) | Current store checked 2026-09-26 | EA and player/platform context; no complete enemy-location roster. |
| A-25 | [Sep25 official announcement](https://steamcommunity.com/games/4317790/announcements/detail/689769594581157442) | Mimics Finally Keep Their Cauldrons On, and Co-op Stays in Sync; published Sep25 | Exact permalink recovered from SteamDB's “Steam Community” source link and its title recognized on open. Permalink body renders image only; factual body verified in A-news. |
| C-25 | [Sep25 SteamDB mirror](https://steamdb.info/patchnotes/25531322/) | Build 25531322; edited Sep25 15:59:29 UTC | Full mirror matches A-news. Build/edit time is C metadata, not official publication time. |
| A-18 | [Sep18 official announcement](https://steamcommunity.com/games/4317790/announcements/detail/680761758839734874) | A Fresh Lobby, 70 More Places to Find Loot | Image-only direct extraction; full body in A-news. |
| A-10 | [Sep10 official announcement](https://store.steampowered.com/news/app/4317790/view/716789922107752687) | MAJOR UPDATE: The Statues Are Awake, and the Head Crab Has Changed Shape | Image-only direct extraction; full body in A-news. |
| A-launch | [Official EA launch](https://steamcommunity.com/games/4317790/announcements/detail/404913211303790432) | Aug18 | Permalink from C-launch source link. Image-only direct extraction. |
| C-launch | [EA launch SteamDB mirror](https://steamdb.info/patchnotes/24801364/) | Aug18, Build24801364 | Read full body. Also agrees with existing source registry, but registry itself is not independent evidence. |
| C-19 | [Day One Hotfix mirror](https://steamdb.info/patchnotes/24819014/) | Aug19 | Read full text. [Official link](https://steamcommunity.com/games/4317790/announcements/detail/675129723539423399) recovered via Steam event comments; image-only extraction. |
| C-20 | [Fresh Fixes mirror](https://steamdb.info/patchnotes/24842671/) | Aug20 | Read full text. Also present in [official cached community surface](https://steamcommunity.com/app/4317790/?l=turkish), which is an older snapshot, not today's freshness source. |
| C-21 | [Daily Saves/Solo Rebalance mirror](https://steamdb.info/patchnotes/24866603/) | Aug21 | Read full text; [official permalink](https://steamcommunity.com/games/4317790/announcements/detail/675129723539424462) recovered from event comments. |
| C-25aug | [Golden Weapons/Monster Rebalance mirror](https://steamdb.info/patchnotes/24932405/) | Aug25 | Full text. [Official permalink](https://steamcommunity.com/games/4317790/announcements/detail/675129723539425004) recovered from event comments. |
| A-26aug | [Aug26 event](https://steamcommunity.com/app/4317790/eventcomments/592939664045836329/) | Three Voice Chat Modes, a Smoother Tutorial and a Long List of Fixes | Official event locates [announcement](https://steamcommunity.com/games/4317790/announcements/detail/719040453611094133); body not fully freshly retrieved. Existing registry door/defender claims remain leads requiring body confirmation. |
| D-demo | [Cached official Demo store text](https://store.steampowered.com/app/4530130/Last_Pirates_Die_Together_Demo/?curator_clanid=45452241&l=dutch) | Search cache crawled two months ago; historical Demo | Explicitly names Silent Cove/abandoned manor and says only that map is available in this Demo. Bare Demo URL today redirects to Steam homepage; cached historical text must not become a current availability claim. |

Steam Web API fetch was unavailable via web and direct curl timed out; direct allnews curl also timed out. Archive language/pagination variants failed or yielded older cached snapshots. These failures are extraction/network limitations, not evidence the source doesn't exist. A-news bare URL succeeded repeatedly and is the freshness authority for this review.

Search also found lastpiratesguide.online, the target site's own pages, August streams and vague gameplay/video entries. None was promoted to direct current observation: the guide appears to reuse the same official sources; no inspected recording had a verified post-Sep25 build, map/level provenance and sufficient visible mechanic observations. No B-tier current observation was established. Broad “Last Pirates” searches can return a different Roblox game; reject those mechanics.

## Freshness correction: September 25

The spec and repo current.ts say Sep18 is latest. A-news now displays the Sep25 title above it, so that statement must be revised after recording the new source. The change is evidence acquisition, not invented patch extrapolation. The following concise record covers all relevant official categories; preserve unspecified quantities as unspecified.

| Subject | Sep25 result | Boundary |
|---|---|---|
| Ear / Anchor | Ear's travelling wandering state does not aggro; it eventually abandons unreachable destinations. Anchor route following improved. | No hearing radius, safe noise threshold, timing or universal immunity claim. |
| Mimic | Cauldron-wearing attack twitch, cauldron drop, cauldron-placement teleport and fit corrected. | Does not prove a cauldron stun, a disguise test or a solo counter. |
| Castle | Castle2 descending lift no longer puts crouched players below floor; Castle vertical lift floating and hand shaking fixed. | Castle2 is the post's identifier; don't equate it to global level2. |
| Kraken/Cracken | Nearby invisible-wall collision now permits detached parts. | No boss damage/kill inference. |
| Progression/store | Chapter paging mouse/snap behavior changed; call-lever hint localized; shops2–5 starting prices increased with further shops4–5 increases; carried gold cap between areas removed; solo threshold removal uses Chapter1/first-four-levels wording. | No exact prices; the solo wording does not reconcile the Sep10 chapter model by itself. |
| Co-op/UI | Missing teammate shop, death-state/revive sync and quota marker corrected; body hit/heal presentation, post-jacuzzi booty color, music slider and violin rotation fixed. | Fix notes describe intended corrections, not proof every client edge case is impossible. |

**Contradiction to preserve:** Sep10 describes first four chapters as one level each; Sep25 calls out first four levels of Chapter1. Record dated wording and request current UI evidence. Do not silently flatten to a precise current chapter-to-level table.

## Fact bundles for supported drafts

Bundles identify actual page-specific content and an independent useful artifact. Facts cited from older mirrors need visible C provenance if the official body cannot be extracted. General game mode, enemy presence in a name list, date and “unknown” are not extra page-specific mechanics.

- **M-head (A-10, C-25aug):** dated one-hit/attack-time rebalance; jellyfish replacing spider presentation; leap/head-clamp presentation and removal-loot changes. Artifact: old-vs-current cue/removal-evidence timeline. Avoid a removal input or loot name.
- **M-shadow (A-news Sep1/Sep10/Sep18; C-25aug):** reduced damage/chase/range; one-hit-at-a-time correction; teleport/elevator rework; between-floor fix. Artifact: symptom/build matrix separating intended teleportation from a regression.
- **M-kraken (C-19, A-10/A-18/A-25):** object-hurl behavior correction; closer Ship placement; crystal-throw obstruction and detached-part collision fixes. Artifact: dated approach/collision history. No numeric distance or boss assignment table.
- **M-ear (C-19, A-25):** attack/hearing range reductions; travel-state aggro change; unreachable-destination abandonment. Artifact: sensory and pathing chronology with published vs unpublished fields.
- **M-anchor (C-20; A-news Aug28/Sep1/Sep18/Sep25):** attack-speed reduction; interaction/chase correction; pull-animation change; host-migration release; pathfinding change. Artifact: hook/release/pathing regression chronology. Keep official spellings per event.
- **M-mimic (C-launch, A-25):** teammate appearance/voice impersonation baseline plus distinct corrected attack/headwear, drop and placement-teleport conditions. Artifact: historical bug vs intended current behavior matrix; no cauldron combat “exploit.”
- **M-rat (C-19, A-18):** inaccessible-target chase correction; outside-nest attack/pathing/defender fixes; post-death burrow reset. Artifact: nest lifecycle event timeline. Do not conflate all rat variants.
- **L-mansion (A-news Sep1/Sep10/Sep18):** chair pickup collision; stair obstruction; lighting flicker; oversize chest contents. Artifact differs by route: chronology for history, symptom-to-source/build matrix for troubleshooting.
- **L-ship (C-21; A-news Sep1/Sep10/Sep18):** Titanic break-apart loot; changed loot pool; corrected large-item floor spawns; historical wall-clipping doors; location cart restriction; crystal collision. Loot page uses retrieval/visibility decisions; troubleshooting uses symptom diagnosis; history uses chronology.
- **L-castle (C-launch; A-news Sep1/Sep25):** elevators/funicular transport; sealed open-stone gaps; separate crouched descending-lift, vertical floating and hand-shake corrections. History and current cargo/rider checklist can have different tasks. No coordinate route map.
- **L-spawns (A-news Sep14/Sep18/Sep10):** specified level spawn-spot correction; 70 valid added positions across15 levels, furniture/floor; expensive-loot gradual availability. Artifact: valid position vs progression eligibility vs actual observed loot decision table. Do not divide70 equally or promise70 items.
- **L-history:** combine the location-specific corrected systems above into a cross-location dated change matrix, distinct from full single-patch pages.
- **L-demo (D-demo, C-launch, A-10):** historical official Demo describes Silent Cove; EA launch adds Ship/Castle and Castle transport; Sep10 changes progression. Artifact: explicit Demo/EA evidence boundaries, no assumed SilentCove=Mansion identity.

L-demo uses independently located cached official historical text plus verified EA/September changes. The bare Demo store redirect is an access result, not evidence of removal or a map equivalence. Retain D provenance and the old crawl date.

## Route-level decisions

Duplicate-intent is current evidence/intent overlap, not a permanent URL ban. A candidate can be re-scoped after new evidence proves a separate task. Supported-to-draft is not publish-ready.

| ID | Candidate route | Decision | Reason / required artifact or next evidence |
|---:|---|---|---|
| 51 | `/monsters/head-crab/counterplay` | needs-new-evidence | N-counter: need independent response beyond parent recognition/patch recap; no tested input or outcome. |
| 52 | `/monsters/head-crab/solo` | needs-new-evidence | N-solo: need threat-specific current solo response/limits; global solo balance cannot supply 3 entity-specific facts. |
| 53 | `/monsters/head-crab/coop` | needs-new-evidence | N-coop: need current teammate action, timing/context and observed result; generic callouts cannot pass. |
| 54 | `/monsters/head-crab/patch-history` | supported-to-draft | M-head; dated presentation/balance/loot change timeline. |
| 55 | `/monsters/head-crab/where-seen` | needs-new-evidence | N-location: current dated level/build sighting needed; patch naming is not a complete spawn assignment. |
| 56 | `/monsters/head-crab/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 57 | `/monsters/man-in-shadows/counterplay` | needs-new-evidence | N-counter: need independent response beyond parent recognition/patch recap; no tested input or outcome. |
| 58 | `/monsters/man-in-shadows/solo` | needs-new-evidence | N-solo: need threat-specific current solo response/limits; global solo balance cannot supply 3 entity-specific facts. |
| 59 | `/monsters/man-in-shadows/coop` | needs-new-evidence | N-coop: need current teammate action, timing/context and observed result; generic callouts cannot pass. |
| 60 | `/monsters/man-in-shadows/patch-history` | supported-to-draft | M-shadow; attack, teleport and floor-transition regression matrix. |
| 61 | `/monsters/man-in-shadows/where-seen` | needs-new-evidence | N-location: current dated level/build sighting needed; patch naming is not a complete spawn assignment. |
| 62 | `/monsters/man-in-shadows/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 63 | `/monsters/kraken/counterplay` | needs-new-evidence | N-counter: need independent response beyond parent recognition/patch recap; no tested input or outcome. |
| 64 | `/monsters/kraken/solo` | needs-new-evidence | N-solo: need threat-specific current solo response/limits; global solo balance cannot supply 3 entity-specific facts. |
| 65 | `/monsters/kraken/coop` | needs-new-evidence | N-coop: need current teammate action, timing/context and observed result; generic callouts cannot pass. |
| 66 | `/monsters/kraken/patch-history` | supported-to-draft | M-kraken; aggression/position/collision timeline. |
| 67 | `/monsters/kraken/where-seen` | needs-new-evidence | N-location: current dated level/build sighting needed; patch naming is not a complete spawn assignment. |
| 68 | `/monsters/kraken/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 69 | `/monsters/ear/counterplay` | duplicate-intent | D-counter: existing detailed parent already answers this threat response. |
| 70 | `/monsters/ear/solo` | needs-new-evidence | N-solo: need threat-specific current solo response/limits; global solo balance cannot supply 3 entity-specific facts. |
| 71 | `/monsters/ear/coop` | needs-new-evidence | N-coop: need current teammate action, timing/context and observed result; generic callouts cannot pass. |
| 72 | `/monsters/ear/patch-history` | supported-to-draft | M-ear; sensory/pathing/wandering timeline. |
| 73 | `/monsters/ear/where-seen` | needs-new-evidence | N-location: current dated level/build sighting needed; patch naming is not a complete spawn assignment. |
| 74 | `/monsters/ear/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 75 | `/monsters/anchorer/counterplay` | duplicate-intent | D-counter: existing detailed parent already answers this threat response. |
| 76 | `/monsters/anchorer/solo` | needs-new-evidence | N-solo: need threat-specific current solo response/limits; global solo balance cannot supply 3 entity-specific facts. |
| 77 | `/monsters/anchorer/coop` | needs-new-evidence | N-coop: need current teammate action, timing/context and observed result; generic callouts cannot pass. |
| 78 | `/monsters/anchorer/patch-history` | supported-to-draft | M-anchor; attack-speed/pull/pathing/release timeline. |
| 79 | `/monsters/anchorer/where-seen` | needs-new-evidence | N-location: current dated level/build sighting needed; patch naming is not a complete spawn assignment. |
| 80 | `/monsters/anchorer/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 81 | `/monsters/snake/counterplay` | needs-new-evidence | N-counter: need independent response beyond parent recognition/patch recap; no tested input or outcome. |
| 82 | `/monsters/snake/solo` | needs-new-evidence | N-solo: need threat-specific current solo response/limits; global solo balance cannot supply 3 entity-specific facts. |
| 83 | `/monsters/snake/coop` | needs-new-evidence | N-coop: need current teammate action, timing/context and observed result; generic callouts cannot pass. |
| 84 | `/monsters/snake/patch-history` | needs-new-evidence | N-history: fewer than 3 independent sourced changes in this research; launch identity is not 3 patch changes. |
| 85 | `/monsters/snake/where-seen` | needs-new-evidence | N-location: current dated level/build sighting needed; patch naming is not a complete spawn assignment. |
| 86 | `/monsters/snake/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 87 | `/monsters/crab/counterplay` | needs-new-evidence | N-counter: need independent response beyond parent recognition/patch recap; no tested input or outcome. |
| 88 | `/monsters/crab/solo` | needs-new-evidence | N-solo: need threat-specific current solo response/limits; global solo balance cannot supply 3 entity-specific facts. |
| 89 | `/monsters/crab/coop` | needs-new-evidence | N-coop: need current teammate action, timing/context and observed result; generic callouts cannot pass. |
| 90 | `/monsters/crab/patch-history` | needs-new-evidence | N-history: fewer than 3 independent sourced changes in this research; launch identity is not 3 patch changes. |
| 91 | `/monsters/crab/where-seen` | needs-new-evidence | N-location: current dated level/build sighting needed; patch naming is not a complete spawn assignment. |
| 92 | `/monsters/crab/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 93 | `/monsters/parrot/counterplay` | needs-new-evidence | N-counter: need independent response beyond parent recognition/patch recap; no tested input or outcome. |
| 94 | `/monsters/parrot/solo` | needs-new-evidence | N-solo: need threat-specific current solo response/limits; global solo balance cannot supply 3 entity-specific facts. |
| 95 | `/monsters/parrot/coop` | needs-new-evidence | N-coop: need current teammate action, timing/context and observed result; generic callouts cannot pass. |
| 96 | `/monsters/parrot/patch-history` | needs-new-evidence | N-history: fewer than 3 independent sourced changes in this research; launch identity is not 3 patch changes. |
| 97 | `/monsters/parrot/where-seen` | needs-new-evidence | N-location: current dated level/build sighting needed; patch naming is not a complete spawn assignment. |
| 98 | `/monsters/parrot/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 99 | `/monsters/sleeper/counterplay` | needs-new-evidence | N-counter: need independent response beyond parent recognition/patch recap; no tested input or outcome. |
| 100 | `/monsters/sleeper/solo` | needs-new-evidence | N-solo: need threat-specific current solo response/limits; global solo balance cannot supply 3 entity-specific facts. |
| 101 | `/monsters/sleeper/coop` | needs-new-evidence | N-coop: need current teammate action, timing/context and observed result; generic callouts cannot pass. |
| 102 | `/monsters/sleeper/patch-history` | needs-new-evidence | N-history: fewer than 3 independent sourced changes in this research; launch identity is not 3 patch changes. |
| 103 | `/monsters/sleeper/where-seen` | needs-new-evidence | N-location: current dated level/build sighting needed; patch naming is not a complete spawn assignment. |
| 104 | `/monsters/sleeper/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 105 | `/monsters/mimic/counterplay` | duplicate-intent | D-counter: existing detailed parent already answers this threat response. |
| 106 | `/monsters/mimic/solo` | needs-new-evidence | N-solo: need threat-specific current solo response/limits; global solo balance cannot supply 3 entity-specific facts. |
| 107 | `/monsters/mimic/coop` | needs-new-evidence | N-coop: need current teammate action, timing/context and observed result; generic callouts cannot pass. |
| 108 | `/monsters/mimic/patch-history` | supported-to-draft | M-mimic; historical vs Sep25 cauldron regressions timeline. |
| 109 | `/monsters/mimic/where-seen` | needs-new-evidence | N-location: current dated level/build sighting needed; patch naming is not a complete spawn assignment. |
| 110 | `/monsters/mimic/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 111 | `/monsters/rat/counterplay` | needs-new-evidence | N-counter: need independent response beyond parent recognition/patch recap; no tested input or outcome. |
| 112 | `/monsters/rat/solo` | needs-new-evidence | N-solo: need threat-specific current solo response/limits; global solo balance cannot supply 3 entity-specific facts. |
| 113 | `/monsters/rat/coop` | needs-new-evidence | N-coop: need current teammate action, timing/context and observed result; generic callouts cannot pass. |
| 114 | `/monsters/rat/patch-history` | supported-to-draft | M-rat; nest/pathing/defender/death-reset timeline. |
| 115 | `/monsters/rat/where-seen` | needs-new-evidence | N-location: current dated level/build sighting needed; patch naming is not a complete spawn assignment. |
| 116 | `/monsters/rat/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 117 | `/monsters/siren/counterplay` | duplicate-intent | D-counter: existing detailed parent already answers this threat response. |
| 118 | `/monsters/siren/solo` | needs-new-evidence | N-solo: need threat-specific current solo response/limits; global solo balance cannot supply 3 entity-specific facts. |
| 119 | `/monsters/siren/coop` | needs-new-evidence | N-coop: need current teammate action, timing/context and observed result; generic callouts cannot pass. |
| 120 | `/monsters/siren/patch-history` | needs-new-evidence | N-history: fewer than 3 independent sourced changes in this research; launch identity is not 3 patch changes. |
| 121 | `/monsters/siren/where-seen` | needs-new-evidence | N-location: current dated level/build sighting needed; patch naming is not a complete spawn assignment. |
| 122 | `/monsters/siren/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 123 | `/maps/mansion/loot` | needs-new-evidence | N-loot: fewer than 3 location-specific loot facts; global spawn totals cannot be assigned here. |
| 124 | `/maps/mansion/enemies` | needs-new-evidence | N-enemies: no location-specific roster/level assignment; Kraken at Ship alone is not 3 enemy-table facts. |
| 125 | `/maps/mansion/solo` | needs-new-evidence | N-mode: need location-specific mode decisions; global solo/co-op changes are insufficient. |
| 126 | `/maps/mansion/coop` | needs-new-evidence | N-mode: need location-specific mode decisions; global solo/co-op changes are insufficient. |
| 127 | `/maps/mansion/transport` | needs-new-evidence | N-transport: need current map-specific cart/lift/funicular route and availability evidence. |
| 128 | `/maps/mansion/hazards` | needs-new-evidence | N-route: need current geometry/hazard observations and verified routing; old fixed collisions are not safe paths. |
| 129 | `/maps/mansion/progression` | duplicate-intent | D-progression: parent Mansion and location-order overview cover available fact. |
| 130 | `/maps/mansion/patch-history` | supported-to-draft | L-mansion; chair/stairs/light/chest correction timeline. |
| 131 | `/maps/mansion/common-mistakes` | duplicate-intent | D-mistakes: same unverified tips/symptoms as proposed hazards or troubleshooting. |
| 132 | `/maps/mansion/troubleshooting` | supported-to-draft | L-mansion; symptom-specific collision vs lighting vs chest diagnosis. |
| 133 | `/maps/mansion/elevators-and-carts` | needs-new-evidence | N-transport: need current map-specific cart/lift/funicular route and availability evidence. |
| 134 | `/maps/mansion/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 135 | `/maps/ship/loot` | supported-to-draft | L-ship; Titanic, changed loot pool, under-floor correction; retrieval decision table. |
| 136 | `/maps/ship/enemies` | needs-new-evidence | N-enemies: no location-specific roster/level assignment; Kraken at Ship alone is not 3 enemy-table facts. |
| 137 | `/maps/ship/solo` | needs-new-evidence | N-mode: need location-specific mode decisions; global solo/co-op changes are insufficient. |
| 138 | `/maps/ship/coop` | needs-new-evidence | N-mode: need location-specific mode decisions; global solo/co-op changes are insufficient. |
| 139 | `/maps/ship/transport` | needs-new-evidence | N-transport: need current map-specific cart/lift/funicular route and availability evidence. |
| 140 | `/maps/ship/hazards` | needs-new-evidence | N-route: need current geometry/hazard observations and verified routing; old fixed collisions are not safe paths. |
| 141 | `/maps/ship/progression` | duplicate-intent | D-progression: parent Ship and ID159/ID34 cover milestone. |
| 142 | `/maps/ship/patch-history` | supported-to-draft | L-ship; loot/transport/collision/location history. |
| 143 | `/maps/ship/common-mistakes` | duplicate-intent | D-mistakes: same unverified tips/symptoms as proposed hazards or troubleshooting. |
| 144 | `/maps/ship/troubleshooting` | supported-to-draft | L-ship; doors vs hidden cargo vs crystal obstruction diagnosis. |
| 145 | `/maps/ship/elevators-and-carts` | needs-new-evidence | N-transport: need current map-specific cart/lift/funicular route and availability evidence. |
| 146 | `/maps/ship/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 147 | `/maps/castle/loot` | needs-new-evidence | N-loot: fewer than 3 location-specific loot facts; global spawn totals cannot be assigned here. |
| 148 | `/maps/castle/enemies` | needs-new-evidence | N-enemies: no location-specific roster/level assignment; Kraken at Ship alone is not 3 enemy-table facts. |
| 149 | `/maps/castle/solo` | needs-new-evidence | N-mode: need location-specific mode decisions; global solo/co-op changes are insufficient. |
| 150 | `/maps/castle/coop` | needs-new-evidence | N-mode: need location-specific mode decisions; global solo/co-op changes are insufficient. |
| 151 | `/maps/castle/transport` | duplicate-intent | D-transport: overlap ID157; no independently evidenced funicular routing. |
| 152 | `/maps/castle/hazards` | needs-new-evidence | N-route: need current geometry/hazard observations and verified routing; old fixed collisions are not safe paths. |
| 153 | `/maps/castle/progression` | duplicate-intent | D-progression: parent Castle and ID159/ID34 cover milestone. |
| 154 | `/maps/castle/patch-history` | supported-to-draft | L-castle; launch transport, boundary sealing and Sep25 lift history. |
| 155 | `/maps/castle/common-mistakes` | duplicate-intent | D-mistakes: same unverified tips/symptoms as proposed hazards or troubleshooting. |
| 156 | `/maps/castle/troubleshooting` | duplicate-intent | D-lift: available Castle-specific symptoms belong in ID157. |
| 157 | `/maps/castle/elevators-and-carts` | supported-to-draft | L-castle; cargo/crouch/vertical-lift decision checklist including Sep25. |
| 158 | `/maps/castle/faq` | duplicate-intent | D-FAQ: entity/location parent already owns general answers and unknowns. |
| 159 | `/maps/location-order` | duplicate-intent | D-order: overlaps ID34 new-location-order and existing progression guide. |
| 160 | `/maps/level-preview-cards` | duplicate-intent | D-lobby: preview-card fact reused from ID11; no map-specific verified UI flow. |
| 161 | `/maps/location-rotation` | duplicate-intent | D-order: rotation and location order currently answer the same question. |
| 162 | `/maps/boss-selection-by-level` | duplicate-intent | D-boss: same single published rule as ID37; no separate selection model. |
| 163 | `/maps/enemy-sets-by-level` | duplicate-intent | D-enemy: same single published rule as ID36; no separate enemy-set table. |
| 164 | `/maps/current-elevator-system` | duplicate-intent | D-lift: existing /guides/elevators owns current controls and cargo guidance. |
| 165 | `/maps/loot-spawn-points` | supported-to-draft | L-spawns; valid spots vs item availability vs progression decision table. |
| 166 | `/maps/map-patch-history` | supported-to-draft | L-history; cross-location changed-system chronology, not full patch copies. |
| 167 | `/maps/demo-vs-early-access-maps` | supported-to-draft | L-demo; documented Demo scope vs EA additions vs September progression comparison. |

## What moves held candidates forward

1. Record game build/update, recording date, solo/co-op mode, map UI label and chapter/day/level separately. Capture a clear enemy identity, action, player input and observed result; include negative/failed attempts.
2. Solo/co-op pages need distinct mechanics/choices, not the same three identity facts with role nouns changed. Snake launch wording establishes self-release and faster teammate release, but it does not expose current inputs/duration, supporting a consolidated response rather than two full strategy pages today.
3. Where-seen pages need actual dated sightings and scope. A single sighting proves presence in that run, not exclusivity, guaranteed spawn or full level assignment. Ship-related Kraken fixes establish a Ship association but not three location/spawn facts.
4. Location loot/enemy/hazard pages need map-specific item states, sightings or actual visible geometry. The global70/15 announcement cannot be allocated across the three maps. A fixed stair collider is not a validated route.
5. Counterplay/FAQ pages need an unanswered independent task; the parent entity records already contain recognition, response and unknowns. Consolidate until deeper evidence exists.
6. Replacement tools may be useful if they provide substantial user-controlled state, meaningful output, and their own task. A static repeated patch table wrapped in controls is not a substantial utility.

No assertion of permanent impossibility, no finished500-page count, and no deployment is made by this report.
