import type { PatchEntry, SourceRef } from './types';

export const BATCH_REVIEW_DATE = '2026-09-26';
export const september25Route = '/updates/september-25-mimic-coop-sync';
export const september25Source: SourceRef = {
  id: 'S28', title: 'Mimics Finally Keep Their Cauldrons On, and Co-op Stays in Sync',
  url: 'https://steamcommunity.com/app/4317790/allnews/',
  publisher: 'RetroStyle Games via Steam', sourceType: 'official-news',
  publishedAt: '2026-09-25', checkedAt: BATCH_REVIEW_DATE,
  notes: 'Full dated announcement verified in the official archive. Individual permalink689769594581157442 was not reliably readable; no SteamDB build number is asserted as official.',
};
export const september25Patch: PatchEntry = {
  id: '2026-09-25-mimic-coop', slug: 'september-25-mimic-coop-sync',
  date: '2026-09-25', title: september25Source.title, severity: 'update',
  sourceIds: ['S28'], sourceUrl: september25Source.url,
  summary: 'Solo quota, shop balances and co-op synchronization changed, alongside Mimic, Ear, Anchor and Castle elevator fixes.',
  changes: [
    { category: 'progression', text: 'Solo: no quota threshold in the first four levels of Chapter 1.' },
    { category: 'items', text: 'Shops 2–5 start at higher prices, with further increases in shops 4–5. Earned gold is no longer capped on area transitions.' },
    { category: 'monsters', text: 'Ear does not aggro while walking to a new spot and abandons unreachable destinations.', affectedEntityIds: ['ear'] },
    { category: 'monsters', text: 'Anchor pathfinding now follows its route more reliably.', affectedEntityIds: ['anchorer'] },
    { category: 'monsters', text: 'Mimic cauldron attack motion, dropping and headwear placement were corrected; attaching a cauldron no longer teleports it.', affectedEntityIds: ['mimic'] },
    { category: 'coop', text: 'Missing shops after transitions and inconsistent death/revive states between players were fixed.' },
    { category: 'maps', text: 'Castle 2 descending lifts no longer push crouching players below the floor. Castle vertical-lift floating and hand shaking were corrected.', affectedEntityIds: ['castle'] },
    { category: 'items', text: 'Violin rotation during camera movement was fixed.', affectedEntityIds: ['violin'] },
    { category: 'maps', text: 'The invisible wall by Cracken no longer obstructs detached body parts.', affectedEntityIds: ['kraken'] },
    { category: 'other', text: 'Quota marker visibility, elevator-call prompts and chapter-page navigation were corrected; tavern music follows the Music slider.' },
  ],
  affectedRoutes: [
    '/', '/updates', '/updates/september-2026', september25Route,
    '/early-access', '/solo-guide', '/quota', '/guides/quota', '/progression', '/guides/progression', '/guides/level-order', '/levels', '/chapters', '/maps',
    '/store', '/guides/store-unlocks', '/coop', '/save-and-reconnect', '/revive-guide', '/troubleshooting',
    '/monsters', '/monsters/ear', '/monsters/anchorer', '/monsters/mimic', '/monsters/kraken',
    '/maps/castle', '/maps/ship', '/guides/elevators', '/items/instruments', '/items/cauldron',
    '/guides/returning-player-guide', '/tools/monster-finder', '/tools/quota-planner', '/tools/progression-tracker',
  ],
};
export const chapterWordingCaution =
  'The September 25 wording refers to the first four levels of Chapter 1, while September 10 described the first four chapters as one level each. The announcements do not reconcile those labels. Read the current chapter/level selector and quota display; this wiki does not invent a replacement chapter table.';
export const supportedInterfaceLanguages = [
  'English', 'French', 'German', 'Spanish - Spain', 'Spanish - Latin America',
  'Traditional Chinese', 'Korean', 'Polish', 'Portuguese - Brazil', 'Turkish',
  'Ukrainian', 'Japanese', 'Simplified Chinese', 'Italian', 'Arabic',
  'Hungarian', 'Indonesian', 'Swedish', 'Thai', 'Vietnamese',
];
