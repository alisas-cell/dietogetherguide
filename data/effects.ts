import type { EffectEntry } from './types';
import { currentField } from './current-entities';
import { REVIEWED_AT } from './current';

export const effects = [
  {id:'thick-booty',slug:'thick-booty',name:'Thick Booty',system:'booty-stat',status:'ea-confirmed',positiveEffects:currentField(['September 14 changed stamina from a percentage to a fixed amount. The exact amount is not published.'],['S24']),lastVerifiedAt:REVIEWED_AT},
  {id:'strong-arms',slug:'strong-arms',name:'Strong Arms',system:'other',status:'ea-confirmed',negativeEffects:currentField(['September 1 excludes doors, dresser lids and chest lids from the effect. No numerical strength multiplier is published.'],['S20']),lastVerifiedAt:REVIEWED_AT},
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
