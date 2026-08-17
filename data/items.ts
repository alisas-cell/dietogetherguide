import type { ItemCategory, ItemEntry, VersionedField } from './types';

const checkedAt = '2026-08-17T00:00:00Z';

const preEaReference = (
  name: string,
  sourceIds: string[],
): VersionedField<string> => ({
  value: `${name} is named in an official pre-Early Access patch. Exact current stats and acquisition details still require live-build verification.`,
  evidence: {
    confidence: 'preview-build',
    sourceIds,
    verifiedAt: checkedAt,
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

export const items = entries.map(([id, name, category, sourceIds]) => ({
  id,
  slug: id,
  name,
  category,
  status: 'demo-evidenced',
  purpose: preEaReference(name, sourceIds),
  pageReady: false,
  lastVerifiedAt: checkedAt,
})) satisfies ItemEntry[];
