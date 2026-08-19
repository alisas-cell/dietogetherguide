import type { PatchEntry } from './types';

export const patches = [
  {
    id: 'ea-launch-2026-08-18',
    slug: 'early-access-is-live',
    title: 'Early Access is live',
    date: '2026-08-18',
    sourceIds: ['S01', 'S05', 'S11'],
    build: 'EA launch',
    summary: 'Steam now lists the game as released in Early Access, and the official launch post documents the opening content without presenting it as a numbered patch changelog.',
    changes: [
      { category: 'maps', text: 'Ship and Castle are identified as two brand-new launch locations.', affectedEntityIds: ['ship', 'castle'] },
      { category: 'monsters', text: 'The launch post names and describes a new group of current enemies.', affectedEntityIds: ['ear', 'anchorer', 'snake', 'crab', 'parrot', 'sleeper', 'mimic', 'rat'] },
      { category: 'items', text: 'Loot, cart upgrades, a Monkey Assistant, instruments, rum, and other launch activities are described at a high level.' },
      { category: 'other', text: 'The current store lists solo play, online co-op for up to four, and Steam Cloud.' },
    ],
    affectedRoutes: ['/', '/release-date', '/early-access', '/beginner-guide', '/monsters', '/maps', '/loot-and-extraction', '/coop', '/save-and-reconnect', '/troubleshooting'],
  },
  {
    id: '2026-07-21-early-access-date',
    slug: 'early-access-sets-sail-august-18',
    title: 'Early Access Sets Sail on August 18',
    date: '2026-07-21',
    sourceIds: ['S02'],
    summary: 'RetroStyle confirmed the August 18 Early Access date, a brand-new map, fresh monsters, and major Demo milestones.',
    changes: [
      { category: 'maps', text: 'A brand-new map was announced for Early Access.' },
      { category: 'monsters', text: 'Fresh monsters were announced for Early Access.' },
      { category: 'other', text: 'The official post reported 205K+ Demo players and 100K+ wishlists.' },
    ],
    affectedRoutes: ['/', '/release-date', '/early-access', '/maps', '/monsters', '/updates'],
  },
  {
    id: '2026-07-07-quick-join',
    slug: 'quick-join-and-networking-rework',
    title: 'Quick Join and Networking Rework',
    date: '2026-07-07',
    sourceIds: ['S07'],
    summary: 'The pre-EA patch added Quick Join and described broad networking, reconnect, host migration, and session-sync work.',
    changes: [
      { category: 'coop', text: 'Quick Join was added for public lobbies.' },
      { category: 'save', text: 'Reconnect and host-migration issues received fixes.' },
      { category: 'performance', text: 'Steam Deck support, FOV, and invert-Y options improved.' },
    ],
    affectedRoutes: ['/coop', '/coop/quick-join', '/save-and-reconnect', '/troubleshooting'],
  },
  {
    id: '2026-06-19-save-reconnect',
    slug: 'save-system-and-reconnect-screen',
    title: 'Save System and Reconnect Screen',
    date: '2026-06-19',
    sourceIds: ['S08'],
    summary: 'The Demo patch added chapter progress saving, a return-to-lobby flow, and a dedicated reconnect screen.',
    changes: [
      { category: 'save', text: 'Chapter progress saving was added or fixed in that Demo build.' },
      { category: 'save', text: 'A dedicated reconnect screen and reconnect fixes shipped.' },
      { category: 'items', text: 'The patch named Magnet, Rupor, and Flashlight changes.' },
    ],
    affectedRoutes: ['/save-and-reconnect', '/troubleshooting', '/items-and-weapons', '/updates'],
  },
] satisfies PatchEntry[];
