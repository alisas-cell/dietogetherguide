import type { MapEntry, VersionedField } from './types';
import { currentField } from './current-entities';
import { REVIEWED_AT } from './current';

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
  { id:'mansion',slug:'mansion',name:'Mansion',status:'ea-live',setting:currentField('The opening location in the September progression sequence.'),overview:currentField('Mansion participates in the new location order. September fixes cover stairs, chairs, lighting and chest contents.',['S20','S23','S25']),pageReady:true,lastVerifiedAt:REVIEWED_AT },
  {
    id: 'ship',
    slug: 'ship',
    name: 'Ship',
    status: 'ea-live',
    setting: launchField('A launch-build location set across tight decks and creaking rigging.'),
    overview: currentField('Ship first appears at level 2 after September 10. Its cart is absent from day two onward; September 18 corrected large objects spawning under the floor.',['S23','S25']),
    landmarks: launchField(['Tight decks', 'Rigging', 'Dark corners', 'Bar and deck activities']),
    image: { src: '/images/maps/ship-official.jpg', alt: 'Pirate crew hauling a cart through the Ship', sourceId: 'S11' },
    pageReady: true,
    lastVerifiedAt: REVIEWED_AT,
  },
  {
    id: 'castle',
    slug: 'castle',
    name: 'Castle',
    status: 'ea-live',
    setting: launchField('A larger, colder launch-build location with heavy loot.'),
    overview: currentField('Castle first appears at level 4. Current elevators have call levers, no brake lever, and corrected cargo/player interactions.',['S23','S24','S25']),
    landmarks: launchField(['Elevators', 'Funiculars', 'Large spaces', 'Heavy-loot areas']),
    image: { src: '/images/maps/castle-official.jpg', alt: 'Pirate crew exploring the Castle interior', sourceId: 'S11' },
    pageReady: true,
    lastVerifiedAt: REVIEWED_AT,
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
