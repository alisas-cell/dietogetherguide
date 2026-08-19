# Release-Day Source Ledger — 2026-08-19

Research timestamp: `2026-08-19T05:33:14Z`

| ID | Source | Role | Current finding |
|---|---|---|---|
| S01 | [Official Steam Store](https://store.steampowered.com/app/4317790/Last_Pirates_Die_Together/) | Primary current availability, EA scope, features, requirements | Released Aug 18; Early Access; purchase flow; solo/online co-op; Steam Cloud; 6+ month target; more than Demo; 20% introductory offer ending Sep 1 |
| S02 | [Official Steam News hub](https://store.steampowered.com/news/app/4317790) | Official timeline | The first-party News API exposes an Aug 18 launch announcement and prior historical updates |
| S05 | [SteamDB](https://steamdb.info/app/4317790/) | Third-party metadata proxy | `ReleaseState: released`; release record `2026-08-18T17:01:40Z`; not an official exact-time promise |
| S10 | [Developer FAQ](https://steamcommunity.com/app/4317790/discussions/0/832747471495160583/) | Developer-authored Steam Community guidance | 1–4, voice chat support, microphone enabled, same-region connection guidance, core objective |
| S11 | [Official Early Access launch announcement](https://steamstore-a.akamaihd.net/news/externalpost/steam_community_announcements/1840944183789405) | Launch-specific first-party additions | EA live; launch content; Ship/Castle; named monsters/behaviors; cart/loot/activities/tutorial/visual changes |
| S12 | [Post-release monster AI/map report](https://steamcommunity.com/app/4317790/discussions/0/592939008794841560/) | Single community report | Aug 18 report of occasional stuck monster behavior and unspecified map bugs; not developer-confirmed |
| R01 | [Steam Store appdetails API](https://store.steampowered.com/api/appdetails?appids=4317790&cc=us&l=english) | Cross-check of S01 | `coming_soon: false`; current categories/features/requirements; US regional price snapshot |
| R02 | [Steam News API](https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=4317790&count=50&maxlength=5000&format=json) | First-party machine-readable news feed | Launch announcement title, gid, timestamp, URL, and contents |
| R03 | [Steam recent reviews API](https://store.steampowered.com/appreviews/4317790?json=1&language=all&purchase_type=all&filter=recent&num_per_page=20) | Launch-day community scan only | Mixed review themes; volatile totals and no stable individual URLs used as guide facts |
| R04 | [Pinned Bug Reports thread](https://steamcommunity.com/app/4317790/discussions/0/832747471495160525/) | Historical issue scan | Visible reports are pre-release/Demo context and stay historical |

## Conflict handling

- Search-engine snippets still showed stale prerelease Steam/SteamDB text. Direct pages and first-party APIs were opened, and the current direct state wins.
- The release pack suggested `17:01:40Z`; the current SteamDB page directly confirms that Steam release record. Its separate store field shows 17:01:43Z, so the site labels 17:01:40Z specifically as SteamDB's Steam metadata record.
- Current Steam reviews are volatile community content. They are used only to identify research questions, never for review schema, ratings, player counts, or confirmed issue language.
