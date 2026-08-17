import type { AssetSource } from './types';

const steamStore =
  'https://store.steampowered.com/app/4317790/Last_Pirates_Die_Together/';
const fetchedAt = '2026-08-17T02:22:00Z';
const officialMediaNote =
  'Official publisher media, localized for editorial use with source attribution; game artwork remains the property of its respective rights holders.';

export const assets = [
  {
    id: 'official-key-art',
    localPath: '/images/game/official-key-art.jpg',
    sourceUrl: steamStore,
    sourcePage: steamStore,
    publisher: 'Steam',
    fetchedAt,
    role: 'hero',
    description:
      'Portrait key art showing the crew, elastic arms, treasure, and a shadowed monster.',
    rightsNote: officialMediaNote,
  },
  {
    id: 'steam-page-background',
    localPath: '/images/game/steam-page-background.jpg',
    sourceUrl:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4317790/c42db2ded348aa6020f8b77abb929ef39e943600/page_bg_raw.jpg?t=1786726214',
    sourcePage: steamStore,
    publisher: 'Steam',
    fetchedAt,
    role: 'hero',
    description:
      'Wide official key art with a pirate carrying loot while crewmates and a monster close in.',
    rightsNote: officialMediaNote,
  },
  {
    id: 'steam-header',
    localPath: '/images/game/steam-header.jpg',
    sourceUrl:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4317790/1d46cbde0bf2ac91b6d11d4b53768b45e1b42f55/header.jpg?t=1786726214',
    sourcePage: steamStore,
    publisher: 'Steam',
    fetchedAt,
    role: 'article',
    description: 'Official Steam header art with the game title and full crew.',
    rightsNote: officialMediaNote,
  },
  {
    id: 'steam-community-icon',
    localPath: '/images/game/steam-community-icon.jpg',
    sourceUrl:
      'https://shared.fastly.steamstatic.com/community_assets/images/apps/4317790/64ebf81c3e36d7e4f8869c87d63e33773964ceaf.jpg',
    sourcePage: steamStore,
    publisher: 'Steam',
    fetchedAt,
    role: 'article',
    description: 'Official Steam community icon for Last Pirates: Die Together.',
    rightsNote: officialMediaNote,
  },
  {
    id: 'feature-coop',
    localPath: '/images/game/feature-coop.webp',
    sourceUrl:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4317790/extras/de09d7aed1d16fd861ffa6c5d64a97b1.webp?t=1786726214',
    sourcePage: steamStore,
    publisher: 'Steam',
    fetchedAt,
    role: 'article',
    description: 'Official decorative strip: Work with your hearties.',
    rightsNote: officialMediaNote,
  },
  {
    id: 'feature-elastic-arms',
    localPath: '/images/game/feature-elastic-arms.webp',
    sourceUrl:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4317790/extras/5f05e886d977b3d1aa27f7493f6f343b.webp?t=1786726214',
    sourcePage: steamStore,
    publisher: 'Steam',
    fetchedAt,
    role: 'article',
    description: 'Official decorative strip illustrating the elastic-arm mechanic.',
    rightsNote: officialMediaNote,
  },
  {
    id: 'feature-loot',
    localPath: '/images/game/feature-loot.webp',
    sourceUrl:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4317790/extras/7653782376dbf9d6ac0728f3d767b7f5.webp?t=1786726214',
    sourcePage: steamStore,
    publisher: 'Steam',
    fetchedAt,
    role: 'article',
    description: 'Official decorative strip about collecting and protecting loot.',
    rightsNote: officialMediaNote,
  },
  {
    id: 'feature-survival',
    localPath: '/images/game/feature-survival.webp',
    sourceUrl:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4317790/extras/937dec9acf6391518b1d9b712bf80517.webp?t=1786726214',
    sourcePage: steamStore,
    publisher: 'Steam',
    fetchedAt,
    role: 'article',
    description: 'Official decorative strip about surviving the island dangers.',
    rightsNote: officialMediaNote,
  },
  {
    id: 'feature-chaos',
    localPath: '/images/game/feature-chaos.webp',
    sourceUrl:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4317790/extras/3ca7bf179547186283b204474cf8bc87.webp?t=1786726214',
    sourcePage: steamStore,
    publisher: 'Steam',
    fetchedAt,
    role: 'article',
    description: 'Official decorative strip closing the Steam feature story.',
    rightsNote: officialMediaNote,
  },
  {
    id: 'roadmap-2026',
    localPath: '/images/updates/roadmap.jpg',
    sourceUrl:
      'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/4317790/extras/10fbdcad131e87ee912bad4601219599.avif?t=1786726214',
    sourcePage: steamStore,
    publisher: 'Steam',
    fetchedAt,
    role: 'update',
    description:
      'Official 2026 roadmap graphic showing the sequence from playtests to Early Access.',
    rightsNote: officialMediaNote,
  },
] satisfies AssetSource[];

export const assetById = new Map(assets.map((asset) => [asset.id, asset]));
