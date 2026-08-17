import type { PatchEntry } from './types';

export const patches = [
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
