# Source registry notes

The typed production registry is `data/sources.ts`. This note records editorial precedence and private-only material.

## Precedence

1. Current Steam Store (`S01`)
2. Official Steam announcements and patch notes (`S02`, `S07`, `S08`, `S09`)
3. RetroStyle official pages (`S03`, `S06`)
4. SteamDB release/app metadata (`S05`)
5. Clearly labeled community or preview evidence, if later added

Newer/current first-party information wins when historical Demo copy conflicts.

## Private design references

`miniwars.art`, `gamblewithyourfriends.net`, `vvultimatum.net`, and `farevergame.wiki` are private UI/SEO references only. They must not appear in public citations, asset provenance, footer links, or production content.

## Media rule

Only current Steam/RetroStyle media, official announcement art, legitimate first-party captures, and original site brand assets may be localized. Every production image must have a `data/assets.ts` record before deployment.
