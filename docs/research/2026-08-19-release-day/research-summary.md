# Release-Day Research Summary — 2026-08-19

Checked at: `2026-08-19T05:33:14Z`

## Release decision

The release gate passes. The official Steam Store now shows the game as released on August 18, 2026, identifies it as an Early Access game, and exposes a purchase flow. SteamDB independently reports `ReleaseState: released` and records the Steam release timestamp as `2026-08-18T17:01:40Z`.

Site state may move from `prerelease` to `early-access-live`. Steam remains the availability source of truth; SteamDB is used only as a third-party metadata record.

## Live facts promoted

- Early Access is live and purchasable.
- Official release date: August 18, 2026.
- SteamDB release metadata record: August 18, 2026 at 17:01:40 UTC.
- Solo and online co-op for up to four players.
- Steam Cloud is currently listed; this does not establish Demo-save transfer or exact persistence fields.
- Current EA target: six months or more; major EA updates are described as free.
- The current store describes the EA build as larger than the Demo, with more monsters, locations, content, and polish.
- The official launch announcement identifies Ship and Castle as live locations.
- The launch announcement identifies Ear, Anchorer, Snake, Crab, Parrot, Sleeper, Mimic, and rat/rat-king context in the EA launch build. Only explicitly stated behavior is promoted.
- The launch announcement confirms a reworked cart, named cart upgrades, Monkey Assistant, more varied loot, large loot that can be broken apart, Bar activities including rum, three instruments, new skins, a lighting/visual overhaul, and a finalized tutorial.
- The developer FAQ confirms in-game voice chat support and same-region troubleshooting guidance. Exact live voice modes and current menu paths remain build-sensitive.

## Historical facts retained

- Demo roster names not named in current launch evidence remain `demo-evidenced`.
- Silent Cove remains a Demo-context location unless a current source directly identifies it in EA.
- July Quick Join, reconnect, host migration, and session synchronization notes remain official pre-EA history.
- June chapter-save and reconnect-screen notes remain official Demo/pre-EA history.
- Wishlist, Demo-player, and Next Fest milestones remain historical acquisition evidence, not current telemetry.
- Demo-era rum/Booty Stats terminology remains historical except for the launch post's narrow proof that rum is present.

## Candidate facts rejected or kept pending

- Exact current build/version string: not exposed in the checked sources.
- Complete EA monster roster: not proven; no “all monsters” language.
- Monster HP, damage, spawn rates, attack cooldowns, accuracy, or exhaustive counterplay: not proven.
- Complete map list, layouts, routes, landmarks, hazards, or extraction triggers: not proven.
- Silent Cove's current EA presence: not directly named by current launch evidence.
- Demo-to-EA save transfer and exact Steam Cloud persistence: not proven.
- Current Quick Join menu path, lobby filters, region list, reconnect timeout, and host migration behavior: not live-interface verified.
- Push-to-talk, open-mic, proximity behavior, and current voice-menu path: not live-interface verified.
- Item/weapon damage, values, prices, durability, ammo, spawn locations, and loot rates: not proven.
- Rum values, effect duration, stacking, and the current relationship among rum, perks, cards, buffs, and Booty Stats: not proven.
- Two-player balance recommendations: current discussion replies are opinions, not reliable balance evidence.
- Current player count and review sentiment as evergreen guide facts: volatile and excluded from site claims/schema.

## Community reports

One exact post-release discussion meets the minimum record gate:

- `community-reported`, August 18, 2026: one player reports occasional stuck monster behavior, sustained attacks from a fixed position, and unspecified map bugs. Source: `https://steamcommunity.com/app/4317790/discussions/0/592939008794841560/`.

This is a single report. It may appear only as a narrowly worded launch-watch item and must not be presented as a confirmed global bug.

Steam's current review API was also scanned. Reviews include mixed descriptions of bugs, performance, cart/loot physics, collision/pathing, and enemy pressure, but individual stable source URLs were not captured. Those themes are not promoted into issue cards.

## Pages changed because of the evidence

- Release state/store/SteamDB: `/`, `/release-date`, `/early-access`, `/updates`, `/faq`, `/roadmap`, and all current-state copy.
- Launch announcement: `/updates`, `/monsters`, `/maps`, `/items-and-weapons`, `/rum-buffs-and-perks`, `/beginner-guide`, `/loot-and-extraction`, `/gameplay`.
- Store player/features/EA statement: `/coop`, `/save-and-reconnect`, `/system-requirements`, `/faq`.
- Developer FAQ: `/coop`, `/coop/quick-join`, `/troubleshooting`, `/faq`.
- Single current community report: a scoped note on `/troubleshooting` only.

## Pages intentionally not created

- No `/known-issues`, `/voice-chat`, `/controller-support`, `/server-status`, `/player-count`, `/codes`, `/tier-list`, `/best-monsters`, `/best-loot`, or new entity detail routes.
- Existing hubs have the search intent and are safer than thin release-day expansion.

## Tool decisions

- Monster Finder remains deferred: the official launch post provides useful named behavior for several monsters, but not a demonstrably complete roster or sufficiently normalized counterplay dataset.
- Loot Planner remains deferred: live economics and stable numeric values are not verified.
- The Co-op Troubleshooter remains live and will be refreshed to remove prerelease unlock checks while retaining reversible steps.
