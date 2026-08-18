# Release-state check — 2026-08-18

**Checked:** 2026-08-18T11:31:54Z
**Decision:** `prerelease`
**Public label:** `RELEASES TODAY · STEAM NOT UNLOCKED YET`

## Evidence

- Steam Store displayed `This game is not yet available on Steam`, the date `Aug 18, 2026`, and an approximate five-hour unlock countdown.
- The prior SteamDB snapshot remains `ReleaseState: prerelease` with a timestamp of `18 August 2026 – 17:00:00 UTC`; it was not treated as proof of unlock.
- The release decision uses the current official Steam Store availability state rather than the calendar or the prior timestamp snapshot.

## Switch rule

Do not derive availability from the calendar. Change `data/game.ts` to `early-access-live` only after a fresh official Steam/SteamDB check proves actual unlock, then recheck `/`, `/release-date`, `/early-access`, `/faq`, and `/updates`.
