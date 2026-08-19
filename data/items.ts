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

export const items = [
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
