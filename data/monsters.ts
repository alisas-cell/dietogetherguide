import type { MonsterEntry, VersionedField } from './types';

const checkedAt = '2026-08-17T00:00:00Z';

const demoReference = (name: string, sourceIds: string[]): VersionedField<string> => ({
  value: `${name} appears by name in official Demo or pre-Early Access patch context. Its current Early Access behavior is not yet verified.`,
  evidence: {
    confidence: 'preview-build',
    sourceIds,
    verifiedAt: checkedAt,
    build: 'demo',
  },
});

const entries: Array<[string, string, string[]]> = [
  ['howler', 'Howler', ['S07']],
  ['misha', 'Misha', ['S02']],
  ['mimic', 'Mimic', ['S08']],
  ['screamer', 'Screamer', ['S08']],
  ['monkey-screamer', 'Monkey Screamer', ['S02']],
  ['rat', 'Rat', ['S07', 'S08']],
  ['pirate', 'Pirate', ['S08']],
  ['shark', 'Shark', ['S02']],
  ['pirate-head', 'Pirate Head', ['S02']],
];

export const monsters = entries.map(([id, name, sourceIds]) => ({
  id,
  slug: id,
  name,
  status: 'demo-evidenced',
  summary: demoReference(name, sourceIds),
  pageReady: false,
  lastVerifiedAt: checkedAt,
})) satisfies MonsterEntry[];
