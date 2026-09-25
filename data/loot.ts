import { REVIEWED_AT } from './current';

export interface LootRecord {
  id: string;
  slug: string;
  name: string;
  locationIds: string[];
  unlockContext: string;
  value: number | null;
  size: string | null;
  weightClass: string | null;
  currentStatus: 'verified' | 'observed' | 'reported';
  lastChecked: string;
  sourceIds: string[];
  notes: string;
  patchHistory: string[];
}
// Null is deliberately different from a zero price or a universal spawn.
export const loot: LootRecord[] = [
  {
    id: 'large-loot',
    slug: 'large-loot',
    name: 'Large loot',
    locationIds: [],
    unlockContext: 'Varies by current level and unlocked pool',
    value: null,
    size: 'large',
    weightClass: 'Heavier since September 10; exact mass unpublished',
    currentStatus: 'verified',
    lastChecked: REVIEWED_AT,
    sourceIds: ['S23', 'S25'],
    notes:
      'Ship floor spawns were fixed September 18. Do not carry forward the August weight reduction as the latest balance.',
    patchHistory: ['2026-09-10-major', '2026-09-18-lobby-loot'],
  },
  {
    id: 'violin',
    slug: 'violin',
    name: 'Violin',
    locationIds: [],
    unlockContext: 'Exact unlock level unpublished',
    value: null,
    size: null,
    weightClass: 'Lighter since September 10; exact mass unpublished',
    currentStatus: 'verified',
    lastChecked: REVIEWED_AT,
    sourceIds: ['S20', 'S23'],
    notes:
      'Visual update September 1; lighter September 10. Do not infer the current sell price.',
    patchHistory: ['2026-09-01-carrying', '2026-09-10-major'],
  },
  {
    id: 'swordfish',
    slug: 'swordfish',
    name: 'Swordfish',
    locationIds: [],
    unlockContext:
      'Expensive loot now unlocks progressively; individual threshold unpublished',
    value: null,
    size: null,
    weightClass: null,
    currentStatus: 'verified',
    lastChecked: REVIEWED_AT,
    sourceIds: ['S23'],
    notes:
      'The major update corrected its price but did not publish the number.',
    patchHistory: ['2026-09-10-major'],
  },
  {
    id: 'horseshoe',
    slug: 'horseshoe',
    name: 'Horseshoe',
    locationIds: [],
    unlockContext: 'Unpublished',
    value: null,
    size: null,
    weightClass: null,
    currentStatus: 'verified',
    lastChecked: REVIEWED_AT,
    sourceIds: ['S23'],
    notes: 'Now lies flat on surfaces; no current numeric value is published.',
    patchHistory: ['2026-09-10-major'],
  },
  {
    id: 'medallion',
    slug: 'medallion',
    name: 'Medallion',
    locationIds: [],
    unlockContext: 'Unpublished',
    value: null,
    size: null,
    weightClass: null,
    currentStatus: 'verified',
    lastChecked: REVIEWED_AT,
    sourceIds: ['S19', 'S23'],
    notes:
      'Incorrect extra-coin pickup hint removed; now lies flat on surfaces.',
    patchHistory: ['2026-08-28-fish', '2026-09-10-major'],
  },
  {
    id: 'slot-dice',
    slug: 'slot-dice',
    name: 'Slot-machine refund dice',
    locationIds: [],
    unlockContext: 'Losing a slot-machine bet',
    value: null,
    size: null,
    weightClass: null,
    currentStatus: 'verified',
    lastChecked: REVIEWED_AT,
    sourceIds: ['S23'],
    notes:
      'September 10 specifies a $1 die for a lost silver coin and $3 for gold. These are refund outcomes, not a general loot-value table.',
    patchHistory: ['2026-09-10-major'],
  },
];
