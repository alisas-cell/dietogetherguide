# Updates, Items/Loot and replacement-pool evidence review

Reviewed 2026-09-26. Read-only product inspection: `.worktrees/dietogether-massive-seo-20260925`. Scope: primary IDs 1–50 and 168–257; entire replacement pool. This is an evidence/intent screening, not production HTTP/canonical verification. The parent owns that baseline audit.

## Decision rule and result

`supported-to-draft` means enough specific evidence and a plausible independent intent to write and review a real draft; it does not mean automatically indexable. `duplicate-intent` includes differently spelled/sluggified copies of an existing answer. `insufficient-evidence` means fewer than three distinct topic-specific supported facts, missing current evidence, or no substantial verified utility. Unpublished fields and generic safety advice do not add facts. A date, a publisher and an item name are provenance, not three gameplay facts.

Conservative shortlist: IDs **6, 7, 29, 44, 226**. ID 226 requires a narrowly defined cauldron interactions page. IDs 8–10 could be revisited after fresh full official source retrieval; this review does not pass them on a search snippet or the site's own data. No replacement-pool URL is independently approved. One additional route outside the pool, a September 25 patch digest, has fresh evidence and a distinct dated-patch intent. These results cannot support a promise of +500.

## Fresh source findings

The official archive returned full announcements, including a September 25 patch absent from the provided pack. Individual September 10/18 news-page opens returned effectively image-only bodies. Source relationship: [official Steam archive](https://steamcommunity.com/app/4317790/allnews/), checked September 26; announcement dates are September 1, 3, 9, 10, 14, 18 and 25 and August 28.

Fresh facts relevant to drafting (paraphrased):

- September 25: shop 2–5 starting prices increased; earned gold is no longer capped on area change; solo Chapter 1's first four levels have no quota threshold. Mimic cauldron attacks, drops and attachment teleport were corrected. Violin camera-turn rotation was corrected.
- September 10: Boomerang hits outbound/returning, can be caught and can strike its thrower. Cover protects wrapped fragile items from drop shattering. Slot losses refund dice: silver gives $1, gold $3. Two unnamed threats have separate treasure-disguise and airborne descriptions.
- September 18: crystal crouched right-click, Ship throw obstruction and standing-flight were corrected. Lift controls/cargo and cauldron markers changed.
- September 1 and August 28 each contain multiple independently named changes, sufficient for a dated aggregate digest.

The three earlier-September digest pages already exist in `content/september-entities.ts`. `data/september-patches.ts` is not independent evidence; several sources point at the archive rather than exact announcement URLs. `data/items.ts`, `content/live-refresh.ts` and `data/patches.ts` sometimes label Golden Weapons August 26, while the official event listing gives August 25. Correct date before drafting historical pages: [official Golden Weapons event listing](https://steamcommunity.com/app/4317790/eventcomments/591813722889018325/). The August 26 voice update is a separate announcement: [official voice-update event listing](https://steamcommunity.com/app/4317790/eventcomments/592939664045836329/).

## Primary Updates: complete grouped decisions

| IDs | Decision | Reason and destination/artifact |
|---|---|---|
| 1–3 | duplicate-intent | Already `/updates/fresh-lobby-70-loot-spawns`, `/updates/september-14-tutorial-store-loot`, `/updates/statues-head-crab-major-update`. Adding `sep-*` produces new URLs for the same dated patch questions. |
| 4 | duplicate-intent | `/steam-deck` already covers the September 9 announcement and what Verified establishes. |
| 5 | insufficient-evidence | September 3 is a one-change startup announcement. Do not pad with September 10 performance, Steam requirements or generic loading advice. Consolidate into `/updates` and `/performance`. |
| 6, 7 | supported-to-draft | September 1 and August 28 are separate multi-topic dated patch records without individual digest routes in inspected current content. Artifact: patch-specific changed-system → affected guide → evidence-boundary matrix, not a copy of the news bullets. Keep historical event access explicitly dated. |
| 8–10 | insufficient-evidence pending source retrieval | Official event snippets identify 8–10; repository has historical records for 9/10, but no fresh full body retrieved here. Three topic-specific facts must be traced to the full dated original before drafting. A patch digest is a plausible independent intent, so these are candidates to recover rather than unconditional duplicate rejections. |
| 11 | duplicate-intent | `/lobby` answers changed interface, preview and waiting/code UI questions. |
| 12 | insufficient-evidence + collision | One spawn-expansion announcement cannot establish distribution, chance or guarantees. Collides with 165, 235, 236 and replacement `are-70-spawn-points-70-items`. Select one consolidated spawn-evidence owner, not all. |
| 13, 14 | duplicate-intent | `/guides/elevators` already owns controls and cargo handling; fresh September 25 fixes belong there. |
| 15 | duplicate-intent | `/items/teleport-crystal` already includes all three September 18 fixes. |
| 16, 17, 18, 19, 21, 22, 23 | insufficient-evidence | Each is a narrow individual fix/change; do not count general map, enemy or tutorial facts toward the subject's three-fact minimum. Existing map/revive/tutorial/host-migration guides can absorb them. |
| 20 | duplicate-intent | `/monsters/man-in-shadows` already owns its dated teleport/floor history. |
| 24, 25 | duplicate-intent | `/quota`, `/store` and existing associated guides own the questions. September 25 now prevents presenting September 14 conclusions as universal current rules. |
| 26 | insufficient-evidence | Fixed-versus-percentage stamina is one published Thick Booty change. No amount, acquisition, duration or interaction data supplied. |
| 27, 28 | duplicate-intent | `/tutorial` owns early marker behavior; `/guides/elevators` owns the winch change. |
| 29 | supported-to-draft | A bounded identification dossier for the two officially unnamed threats is distinct from assigning them to named monster pages. Evidence: treasure-like disguise/stillness, activation when opened, grab/drag, teammate rescue; separately aerial circling/commit description. Artifact: recognition decision tree ending in “identity unresolved”, with independent source extraction and no name/spawn/damage inference. |
| 30 | duplicate-intent | `/monsters/head-crab` already covers the rework and historical/current identity boundary. |
| 31–33 | duplicate-intent | `/items/boomerang`, `/items/cover`, `/items/teleport-crystal` already own introduction/behavior/history. |
| 34–38 | duplicate-intent | `/progression`, `/levels`, `/chapters`, `/monsters/bosses`, `/store` and progression/store guides already cover these questions; minor wording differences do not create new intents. |
| 39 | duplicate-intent | `/achievements` already answers number and addition history. |
| 40, 41 | insufficient-evidence | A use-counter addition and a visual redesign each supply only one narrow change; add to store/entity pages. |
| 42, 43 | duplicate-intent | `/quota` and `/loot/progression` already cover scaling and gradual unlocks. |
| 44 | supported-to-draft | Distinct slot-refund question, with loss → dice, silver → $1, gold → $3. Artifact: outcome lookup for coin/bet result, explicitly no odds or profit prediction. Prefer one authoritative slot-refund page; do not also ship an `/answers/` clone or calculator using invented odds. |
| 45 | duplicate-intent | `/monsters/snake` already supplies health history; old/new values are one change, not separate independent facts. |
| 46 | duplicate-intent | `/loot/large-items` already owns the weight change. |
| 47 | insufficient-evidence | “Lighter” alone is not a violin-weight article. Fresh rotation fix does not supply mass or a new independent weight-search intent. |
| 48 | duplicate-intent | `/store` already answers Water Pistol removal; one removal fact cannot create a full current item guide. |
| 49, 50 | insufficient-evidence + collision | Single placement/availability changes, already discussed on map/entity/transport guides. Do not infer distance, day-to-level mapping or a full availability table. |

## Primary Items/Loot: complete grouped decisions

| IDs | Decision | Reason / consolidation |
|---|---|---|
| 168–171 | duplicate-intent | Both Golden Weapons and their history already live at `/golden-weapons`. Pair-level “top-tier” language and increased shine do not establish three new facts for each split entity, much less two history pages. |
| 172–177 | insufficient-evidence | Pirate Pistol, Pirate Bomb and Water Pistol are each currently supported mainly by one specific balance/removal fact. General September shop changes are not item-specific acquisition facts. Entity/history pairs duplicate each other when evidence consists of a single change. |
| 178–183 | duplicate-intent | Boomerang, Cover and Teleport Crystal entity routes already exist. Their `/changes` children repeat the same introductory/fix evidence, and all three have matching change-detail and replacement candidates. |
| 184–187 | duplicate-intent | `/monkey-cart` already treats Cart, Porter/Assistant, lifecycle, upgrade examples and dated history. A meaningful split needs new verified item-specific purpose/behavior; copying lifecycle rows into `/changes` fails. |
| 188–195 | insufficient-evidence | Magnet, Rupor, Flashlight and Bell are historical/source-registry mentions with sparse topic-specific evidence. Demo availability does not prove current store/use status; a generic current-store caveat cannot fill the missing facts. |
| 196–199 | insufficient-evidence | Throwing Knives' specific collision fix is insufficient; do not automatically attribute the adjacent generic stuck-throwing fix exclusively to knives. Guillotine needs its actual historical source and at least three specific facts. No dedicated arbitrary-stat article. |
| 200–201 | duplicate-intent | `/items/healing-fish` already covers input, speed change and achievement context. Cumulative achievement amount is not per-fish healing or cooldown evidence; `/changes` adds no separate substance. |
| 202–207 | insufficient-evidence | Golden Butt, Iron Butt and Thick Booty cannot borrow general booty/revive/jacuzzi changes as if each is individually confirmed. Thick Booty has the one stamina-change fact. History twins do not manufacture evidence. |
| 208–213 | insufficient-evidence + collision | Instruments are already consolidated at `/items/instruments`; Piano has the launch activity and multi-grab fix, Flute/Guitar mainly launch mentions. Three instrument-specific facts are not demonstrated for each. |
| 214–215 | duplicate-intent | Existing instrument page covers violin visual/weight history. September 25 adds an axis-rotation fix, best incorporated there. A full violin entity may later warrant separation if fresh mechanics/handling observations establish a distinct richer intent, but the present proposed “use and patch status” repeats that existing section. |
| 216–225 | insufficient-evidence | Swordfish's price correction, Horseshoe's orientation, Medallion's tip/orientation, Scepter's tip and Titanic's breakable/Ship/texture record do not justify ten entity/history pages. Titanic is potentially recoverable after fresh full August 21/launch verification and a distinct breakable-object artifact; not passed here. |
| 226 | supported-to-draft | New consolidated **cauldron interaction states** intent can span tutorial picked-up/unpicked state, holding restrictions, and September 25 Mimic-worn/attached/dropped corrections. Artifact: context → observed/action state → dated confirmed behavior matrix. Treat ordinary cauldron, worn cauldron and tutorial marker as separate contexts. Do not infer combat protection, capacity, prices or universal pickup bindings. |
| 227 | duplicate-intent | Keep cauldron history in 226; a history child using the same state matrix adds no separate intent. |
| 228–230 | duplicate-intent | `/loot/progression`, `/loot/rare` already own progression, expensive/rare evidence boundaries; unlock and rarity are distinct concepts but three clone routes do not add content. |
| 231 | duplicate-intent / exact route | `/loot/large-items` already exists. |
| 232 | insufficient-evidence | Medium items no longer spawning on shelves is one change; no complete medium-item roster, dimensions or transport facts. |
| 233–234 | duplicate-intent | `/guides/fragile-loot` owns breakage/intact composite delivery, with Cover and achievement links. Split only with new independent item-breakage evidence. |
| 235–236 | insufficient-evidence + collision | Same spawn-points-versus-guaranteed-count intent as 12/165/replacement answer. Source gives expansion and location types, not exhaustive rules. One consolidated page could be recovered with multiple dated spawn changes and an evidence-boundary artifact; do not publish all variants. |
| 237–239 | insufficient-evidence + collision | Existing `/maps/ship`, `/maps/castle`, `/maps/mansion` cover confirmed location context. The announcement of pool changes is not a published item-by-map loot table. |
| 240–241 | duplicate-intent | `/solo-guide`, `/coop`, `/loot-and-extraction` and hauling guides own solo/team collection planning. Generic role suggestions do not provide item-specific strategy evidence. |
| 242–244 | duplicate-intent | Existing hauling/cart/elevator pages own these transport systems. |
| 245–247 | duplicate-intent | Existing quota/extraction/planning tools answer risk, return and clearance planning. Additional guides require independently evidenced tactics or a genuinely new substantial utility. |
| 248 | duplicate-intent | `/guides/fragile-loot` owns undamaged delivery. |
| 249–251 | duplicate-intent | Existing dated September 10/14/18 patch digests plus `/loot` own this patch-subset information. Repeating only loot rows is insufficient separate player purpose. |
| 252–255 | insufficient-evidence + collision | Each is a one-change rotation/shelf/spawn/chest question also proposed in change-detail and map candidates. No dimensions, complete spawn list or cause model published. |
| 256 | insufficient-evidence | Basket containment is one specific coin fix; generic cart fixes can populate an existing cart transport guide but not manufacture three distinct coin/basket facts. |
| 257 | duplicate-intent | Existing rare-loot, registry and entity pages already present known/unknown evidence. “Facts vs rumors” without verified actual rumors is title-swapped unknowns content. |

## Replacement pool: same gate, not an automatic rescue

No pool route is passed independently in this review. Exact URL novelty cannot rescue repeated intent. These groups cover all listed pool entries:

| Pool route suffixes under `/answers/` | Decision / owner |
|---|---|
| `is-last-pirates-die-together-early-access`, `how-many-players`, `is-steam-deck-verified`, `how-many-achievements`, `how-many-levels` | duplicate-intent: `/early-access`, `/coop`, `/steam-deck`, `/achievements`, `/levels`. A count or status question is generally one factual answer, not a new three-fact article. |
| `what-changed-september-18`, `what-changed-september-14`, `what-changed-september-10` | duplicate-intent: already three complete dated patch pages. |
| `is-water-pistol-still-in-store`, `what-happened-to-head-crab`, `why-is-head-crab-a-jellyfish`, `how-much-health-does-snake-have`, `where-is-kraken`, `does-man-in-shadows-teleport` | duplicate-intent: existing store/entity pages; jellyfish “why” and “what happened” are the same rework evidence. |
| `how-does-ship-progression-work`, `when-does-castle-appear`, `when-does-ship-appear`, `what-are-level-preview-cards`, `are-bosses-level-specific`, `are-enemies-level-specific` | duplicate-intent: existing progression/level/lobby/boss pages. |
| `how-does-quota-scale`, `do-expensive-items-unlock-gradually`, `what-do-use-counters-mean`, `how-does-slot-machine-refund-work`, `is-ship-cart-available-day-two` | Existing quota/loot/store/map owner, or repeats ID44. Counter/cart narrowness also fails evidence depth. |
| `how-does-cover-protect-loot`, `how-does-boomerang-work`, `how-does-teleport-crystal-work`, `what-does-thick-booty-do`, `how-fast-is-elevator-winch-now` | Existing equipment/elevator owner; Thick Booty remains insufficient. |
| `why-cant-i-revive`, `why-cant-i-pick-up-items`, `why-cant-i-join-a-lobby`, `why-do-i-see-waiting-for-host` | Existing revive/troubleshooting/co-op/lobby intent; a fix note is not proof of every user's cause. |
| `does-progress-save-daily`, `does-progress-save-by-chapter`, `is-public-lobby-default`, `is-solo-balanced-separately` | Existing save/co-op/solo guides. Each pair is already treated together. |
| `does-ship-have-unique-loot`, `does-castle-have-unique-loot`, `can-items-fly-you-now`, `can-strong-arms-open-doors`, `can-cart-knock-you-down`, `can-elevator-drop`, `can-teleport-crystal-make-you-fly`, `are-70-spawn-points-70-items` | Existing map/hauling/elevator/crystal intent; pool-change wording does not prove exclusive pools, and a removed exploit/fix cannot become a full independent mechanics guide. |
| `what-is-titanic-loot`, `what-is-monkey-porter`, `what-is-monkey-assistant`, `what-is-golden-butt`, `what-is-iron-butt`, `what-is-healing-fish`, `what-is-monarchs-scepter`, `what-is-swordfish-loot`, `what-is-rupor` | Same entity proposals again; Porter/Assistant are discussed together on `/monkey-cart`, fish has its route, others fail specific evidence here. Historical names must retain a build label. |
| `what-is-anchorer`, `what-is-ear-monster`, `what-is-sleeper`, `what-is-mimic`, `what-is-siren` | duplicate-intent: existing current monster pages. |

If a primary entity or change article is rejected for insufficient evidence, changing its path to `/answers/what-is-*` does not change the available evidence or search task. If a primary route is rejected for intent duplication, the replacement must answer a different task, not shorten its title.

## Concrete viable additional candidate and limitations

`/updates/september-25-mimic-coop-sync` is a defensible additional candidate **outside** the supplied pool: one complete dated patch digest with a per-system current impact/evidence matrix and links to existing guides. At least three distinct patch facts are freshly visible, and no September 25 digest exists in inspected `septemberUpdatePages`. Link to a verified individual official URL if the parent retrieves it; otherwise preserve the dated relationship to the official archive. Do not also expand every constituent one-line fix into its own article.

Before indexation: produce the unique artifact, check direct-answer length and at least three contextual links, audit intent against the parent's full live baseline, and preserve uncertain numbers as unknown. The five shortlisted primary candidates plus one new patch candidate are not six automatic releases. In particular ID29 must stay unnamed and ID226 must not claim that generic cauldron protection is a confirmed mechanic.

Access limitations: individual legacy `steamstore-a.akamaihd.net` news URLs were unavailable through the web reader; several individual Steam announcement bodies were image-only; repeated Steam News API requests timed out, while one initial request exposed the current September 25 announcement header/body. Public achievements fetch was unavailable in this independent pass. Therefore repository achievement conditions and June/August mechanics were not promoted to freshly verified facts. This review did not observe the game client, measure mechanics, inspect private Steam data, or change/deploy product files.
