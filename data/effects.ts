import type { EffectEntry } from './types';

export const effects = [
  {
    id: 'rum-positive-examples',
    slug: 'rum-positive-examples',
    name: 'Rum effect examples',
    system: 'rum',
    status: 'demo-evidenced',
    positiveEffects: {
      value: ['Faster running', 'Longer arms'],
      evidence: {
        confidence: 'preview-build',
        sourceIds: ['S09'],
        verifiedAt: '2026-08-17T00:00:00Z',
        build: 'demo',
        note: 'Examples from an official Demo-era devlog, not a complete live effect list.',
      },
    },
    negativeEffects: {
      value: ['Official wording says drinks can also have negative side effects.'],
      evidence: {
        confidence: 'preview-build',
        sourceIds: ['S09'],
        verifiedAt: '2026-08-17T00:00:00Z',
        build: 'demo',
      },
    },
    lastVerifiedAt: '2026-08-17T00:00:00Z',
  },
  {
    id: 'booty-stats',
    slug: 'booty-stats',
    name: 'Booty Stats',
    system: 'booty-stat',
    status: 'demo-evidenced',
    positiveEffects: {
      value: ['Official Demo development material introduced Booty Stats as an upgrade context.'],
      evidence: {
        confidence: 'preview-build',
        sourceIds: ['S09'],
        verifiedAt: '2026-08-17T00:00:00Z',
        build: 'demo',
      },
    },
    lastVerifiedAt: '2026-08-17T00:00:00Z',
  },
] satisfies EffectEntry[];
