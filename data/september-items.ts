import { REVIEWED_AT } from './current';
import { currentField } from './current-entities';
import type { ItemCategory, ItemEntry } from './types';
import { septemberPatches } from './september-patches';
const entries: Array<[string, string, ItemCategory, string, string[]]> = [
  [
    'boomerang',
    'Boomerang',
    'weapon',
    'Introduced September 10: can hit on the outbound and returning path, be caught in midair, or hit the thrower. Three throw variants are mentioned without their input mapping.',
    ['S23'],
  ],
  [
    'cover',
    'Cover',
    'utility',
    'Introduced September 10 to protect wrapped fragile objects against shattering when dropped. The announcement supplies no durability or protection multiplier.',
    ['S23'],
  ],
  [
    'teleport-crystal',
    'Teleport Crystal',
    'utility',
    'Introduced September 10. September 18 fixed crouched right-click use, the Ship throwing obstruction and flight from standing on the crystal.',
    ['S23', 'S25'],
  ],
  [
    'healing-fish',
    'Healing Fish',
    'consumable',
    'Right-click healing became faster August 28. Fishy doctor tracks 500 HP healed to allies cumulatively, not 500 HP per fish.',
    ['S19', 'S26'],
  ],
  [
    'water-pistol',
    'Water Pistol',
    'weapon',
    'Removed from the store September 10. This is a removed store entry, not a current purchase recommendation.',
    ['S23'],
  ],
  [
    'pirate-pistol',
    'Pirate Pistol',
    'weapon',
    'An August balance pass reduced damage. September store reordering means old unlock and price assumptions are not current guarantees.',
    ['S15', 'S23', 'S24'],
  ],
  [
    'pirate-bomb',
    'Pirate Bomb',
    'weapon',
    'The August radius reduction is dated history. Steam confirms a Bomb achievement for two enemy kills with one explosion; current radius is unpublished.',
    ['S15', 'S26'],
  ],
  [
    'throwing-knives',
    'Throwing Knives',
    'weapon',
    'The September major update fixed throws being blocked by level collision and players becoming stuck in the throwing state.',
    ['S23'],
  ],
  [
    'thick-booty',
    'Thick Booty',
    'utility',
    'September 14 changed its stamina contribution from a percentage to a fixed amount; the amount is not stated.',
    ['S24'],
  ],
];
export const septemberItems: ItemEntry[] = entries.map(
  ([id, name, category, purpose, sourceIds]) => ({
    id,
    slug: id,
    name,
    category,
    status: 'ea-confirmed',
    purpose: currentField(purpose, sourceIds),
    pageReady: ['boomerang','cover','teleport-crystal','healing-fish'].includes(id),
    lastVerifiedAt: REVIEWED_AT,
  }),
);
export function reviewItem(item: ItemEntry): ItemEntry {
  if (item.status !== 'ea-confirmed') return item;
  if (item.id === 'monkey-cart')
    return {
      ...item,
      purpose: currentField(
        'A hauling cart; 200 was the published August 20 price, not a verified September price. Store progression and prices were rebuilt September 14.',
        ['S14', 'S23', 'S24'],
      ),
      lastVerifiedAt: REVIEWED_AT,
    };
  const changes = septemberPatches.flatMap((patch) =>
    patch.changes
      .filter((change) => change.affectedEntityIds?.includes(item.id))
      .map((change) => ({
        text: patch.date + ': ' + change.text,
        sourceIds: patch.sourceIds,
      })),
  );
  if (changes.length)
    return {
      ...item,
      purpose: currentField(
        [item.purpose?.value, ...changes.map((c) => c.text)]
          .filter(Boolean)
          .join(' '),
        [
          ...new Set([
            ...(item.purpose?.evidence.sourceIds ?? []),
            ...changes.flatMap((c) => c.sourceIds),
          ]),
        ],
      ),
      lastVerifiedAt: REVIEWED_AT,
    };
  return { ...item, lastVerifiedAt: REVIEWED_AT };
}
