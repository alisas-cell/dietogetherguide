# Release-state check — 2026-08-17

**Checked:** 2026-08-17T01:44:11Z  
**Decision:** `prerelease`  
**Public label:** `EARLY ACCESS · AUG 18`

## Evidence

- Steam Store displayed `This game is not yet available on Steam`, the date `18 Aug, 2026`, and an approximate unlock countdown.
- SteamDB displayed `ReleaseState: prerelease` and the timestamp snapshot `18 August 2026 – 17:00:00 UTC`.
- Steam's official News API contained no unlock/release announcement; the newest listed post was the August 7 Busan Indie Connect update.

## Switch rule

Do not derive availability from the calendar. Change `data/game.ts` to `early-access-live` only after a fresh official Steam/SteamDB check proves actual unlock, then recheck `/`, `/release-date`, `/early-access`, `/faq`, and `/updates`.
