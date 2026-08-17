import type { MapEntry } from './types';

const demoEvidence = {
  confidence: 'preview-build' as const,
  sourceIds: ['S04'],
  verifiedAt: '2026-08-17T00:00:00Z',
  build: 'demo' as const,
};

export const maps = [
  {
    id: 'silent-cove',
    slug: 'silent-cove',
    name: 'Silent Cove',
    status: 'demo',
    setting: {
      value: 'A large cursed location centered on an abandoned manor.',
      evidence: demoEvidence,
    },
    overview: {
      value: 'Silent Cove was the only named map available in the public Demo and supported the full arrival-to-extraction loop.',
      evidence: demoEvidence,
    },
    extractionNotes: {
      value: ['The official Demo page describes a full loop from arrival to potential extraction.'],
      evidence: demoEvidence,
    },
    pageReady: true,
    lastVerifiedAt: '2026-08-17T00:00:00Z',
  },
  {
    id: 'ea-map-unannounced',
    slug: 'ea-map-unannounced',
    name: 'Unannounced Early Access map',
    status: 'announced',
    overview: {
      value: 'Official July 21 news says Early Access adds a brand-new map; its name was not confirmed in the pre-release source pass.',
      evidence: {
        confidence: 'confirmed',
        sourceIds: ['S02'],
        verifiedAt: '2026-08-17T01:44:11Z',
        build: 'pre-ea',
      },
    },
    pageReady: false,
    lastVerifiedAt: '2026-08-17T01:44:11Z',
  },
] satisfies MapEntry[];
