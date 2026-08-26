import type { ItemCategory, ItemEntry, VersionedField } from './types';

const historicalCheckedAt = '2026-08-17T00:00:00Z';
const launchCheckedAt = '2026-08-19T05:33:14Z';

const preEaReference = (
  name: string,
  sourceIds: string[],
): VersionedField<string> => ({
  value: `${name} is named in an official pre-Early Access patch. Exact current stats and acquisition details still require live-build verification.`,
  evidence: {
    confidence: 'preview-build',
    sourceIds,
    verifiedAt: historicalCheckedAt,
    build: 'demo',
  },
});

const entries: Array<[string, string, ItemCategory, string[]]> = [
  ['magnet', 'Magnet', 'utility', ['S08']],
  ['rupor', 'Rupor', 'utility', ['S08']],
  ['bell', 'Bell', 'utility', ['S02']],
  ['knives', 'Knives', 'weapon', ['S07']],
  ['guillotine', 'Guillotine', 'weapon', ['S02']],
  ['bomb', 'Bomb', 'weapon', ['S02']],
  ['flashlight', 'Flashlight', 'utility', ['S08']],
];

const historicalItems = entries.map(([id, name, category, sourceIds]) => ({
  id,
  slug: id,
  name,
  category,
  status: 'demo-evidenced',
  purpose: preEaReference(name, sourceIds),
  pageReady: false,
  lastVerifiedAt: historicalCheckedAt,
})) satisfies ItemEntry[];

const currentItems = [
  {
    id: 'piano',
    slug: 'piano',
    name: 'Piano',
    category: 'utility',
    purpose: 'Piano is named as a playable activity in the official Early Access launch announcement.',
  },
  {
    id: 'flute',
    slug: 'flute',
    name: 'Flute',
    category: 'utility',
    purpose: 'Flute is named as a playable activity in the official Early Access launch announcement.',
  },
  {
    id: 'guitar',
    slug: 'guitar',
    name: 'Guitar',
    category: 'utility',
    purpose: 'Guitar is named as a playable activity in the official Early Access launch announcement.',
  },
] satisfies Array<{ id: string; slug: string; name: string; category: ItemCategory; purpose: string }>;

const liveItems: ItemEntry[] = [
  {
    id: 'golden-sword', slug: 'golden-sword', name: 'Golden Sword', category: 'weapon', status: 'ea-confirmed',
    purpose: { value: 'A top-tier Golden Weapon introduced in the Aug 26 update; exact stats are not published.', evidence: { confidence: 'confirmed', sourceIds: ['S17'], verifiedAt: '2026-08-26T12:36:29Z', build: 'ea-2026-08-26' } },
    pageReady: false, lastVerifiedAt: '2026-08-26T12:36:29Z',
  },
  {
    id: 'golden-hand-cannon', slug: 'golden-hand-cannon', name: 'Golden Hand Cannon', category: 'weapon', status: 'ea-confirmed',
    purpose: { value: 'A top-tier Golden Weapon introduced in the Aug 26 update; exact stats are not published.', evidence: { confidence: 'confirmed', sourceIds: ['S17'], verifiedAt: '2026-08-26T12:36:29Z', build: 'ea-2026-08-26' } },
    pageReady: false, lastVerifiedAt: '2026-08-26T12:36:29Z',
  },
  {
    id: 'monkey-cart', slug: 'monkey-cart', name: 'Monkey Cart', category: 'utility', status: 'ea-confirmed',
    purpose: { value: 'A hauling cart whose published price changed from 800 to 200 in an Aug 20 hotfix.', evidence: { confidence: 'confirmed', sourceIds: ['S14'], verifiedAt: '2026-08-26T12:36:29Z', build: 'ea-2026-08-20' } },
    pageReady: false, lastVerifiedAt: '2026-08-26T12:36:29Z',
  },
  {
    id: 'monkey-porter', slug: 'monkey-porter', name: 'Monkey Porter', category: 'utility', status: 'ea-confirmed',
    purpose: { value: 'A one-level small-loot delivery helper that is spent on delivery rather than death.', evidence: { confidence: 'confirmed', sourceIds: ['S11', 'S14'], verifiedAt: '2026-08-26T12:36:29Z', build: 'ea-2026-08-20' } },
    pageReady: false, lastVerifiedAt: '2026-08-26T12:36:29Z',
  },
];

export const items = [
  ...liveItems,
  ...currentItems.map((item) => ({
    ...item,
    status: 'ea-confirmed' as const,
    purpose: {
      value: item.purpose,
      evidence: {
        confidence: 'confirmed' as const,
        sourceIds: ['S11'],
        verifiedAt: launchCheckedAt,
        build: 'ea-launch' as const,
      },
    },
    pageReady: false,
    lastVerifiedAt: launchCheckedAt,
  })),
  ...historicalItems,
] satisfies ItemEntry[];
