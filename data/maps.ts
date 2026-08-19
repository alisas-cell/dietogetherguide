import type { MapEntry, VersionedField } from './types';

const launchCheckedAt = '2026-08-19T05:33:14Z';

const launchField = <T>(value: T): VersionedField<T> => ({
  value,
  evidence: {
    confidence: 'confirmed',
    sourceIds: ['S11'],
    verifiedAt: launchCheckedAt,
    build: 'ea-launch',
  },
});

const demoEvidence = {
  confidence: 'preview-build' as const,
  sourceIds: ['S04'],
  verifiedAt: '2026-08-17T00:00:00Z',
  build: 'demo' as const,
};

export const maps = [
  {
    id: 'ship',
    slug: 'ship',
    name: 'Ship',
    status: 'ea-live',
    setting: launchField('A launch-build location set across tight decks and creaking rigging.'),
    overview: launchField('The official launch announcement identifies Ship as one of two brand-new Early Access locations.'),
    landmarks: launchField(['Tight decks', 'Rigging', 'Dark corners', 'Bar and deck activities']),
    pageReady: false,
    lastVerifiedAt: launchCheckedAt,
  },
  {
    id: 'castle',
    slug: 'castle',
    name: 'Castle',
    status: 'ea-live',
    setting: launchField('A larger, colder launch-build location with heavy loot.'),
    overview: launchField('The official launch announcement identifies Castle as one of two brand-new Early Access locations.'),
    landmarks: launchField(['Elevators', 'Funiculars', 'Large spaces', 'Heavy-loot areas']),
    pageReady: false,
    lastVerifiedAt: launchCheckedAt,
  },
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
      value: 'Silent Cove was the named public Demo location. Current launch evidence does not directly identify it as an EA location.',
      evidence: demoEvidence,
    },
    extractionNotes: {
      value: ['The official Demo page describes a full loop from arrival to potential extraction.'],
      evidence: demoEvidence,
    },
    pageReady: true,
    lastVerifiedAt: '2026-08-17T00:00:00Z',
  },
] satisfies MapEntry[];
