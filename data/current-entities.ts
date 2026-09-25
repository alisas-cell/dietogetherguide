import { REVIEWED_AT } from './current';
import { septemberPatches } from './september-patches';
import type { MonsterEntry, VersionedField } from './types';

export const currentField = <T>(
  value: T,
  sourceIds: string[] = ['S23'],
): VersionedField<T> => ({
  value,
  evidence: {
    confidence: 'confirmed',
    sourceIds,
    verifiedAt: REVIEWED_AT,
    build: 'ea-2026-09-18',
  },
});
const locationNote =
  'Enemy sets and bosses are level-specific after September 10. The announcements do not publish a complete location/level assignment; an unknown location is not a confirmed absence.';

export function reviewMonster(monster: MonsterEntry): MonsterEntry {
  if (monster.status !== 'ea-confirmed') return monster;
  const changes = septemberPatches
    .flatMap((patch) =>
      patch.changes
        .filter((change) => change.affectedEntityIds?.includes(monster.id))
        .map((change) => ({
          date: patch.date,
          text: change.text,
          sourceIds: patch.sourceIds,
        })),
    )
    .sort((a, b) => a.date.localeCompare(b.date));
  const specific: Partial<MonsterEntry> =
    monster.id === 'anchorer'
      ? {
          aliases: ['Anchor'],
          behaviorTags: ['hook'],
          locationNote,
          summary: currentField(
            'Anchorer (called Anchor in September notes) hooks, reels in and throws players. September fixes cover its pull animation, chase and release during host migration.',
            ['S11', 'S19', 'S20', 'S25'],
          ),
        }
      : monster.id === 'snake'
        ? {
            behaviorTags: [],
            notes: currentField([
              'Health changed from 500 to 150 on September 10. This is a dated official change, not a claim about an unannounced future build.',
            ]),
          }
        : monster.id === 'siren'
          ? { detection: undefined }
          : {};
  return {
    ...monster,
    ...specific,
    locationNote,
    mapIds: currentField([], ['S23']),
    counterplay:
      monster.counterplay ??
      currentField([
        'Keep an exit available and check the level preview before choosing equipment. Exact damage, range and boss assignment are not published.',
      ]),
    behavior:
      monster.behavior ??
      currentField(
        [
          monster.id === 'rat'
            ? 'Burrow rats return to their spot after a player dies.'
            : 'Check the known behavior and current patch history before approaching.',
        ],
        monster.id === 'rat' ? ['S25'] : ['S11'],
      ),
    pageReady: true,
    detailRoute: `/monsters/${monster.slug}`,
    lastVerifiedAt: REVIEWED_AT,
    patchChanges: [...(monster.patchChanges ?? []), ...changes],
  };
}

export const addedMonsters: MonsterEntry[] = [
  {
    id: 'head-crab',
    slug: 'head-crab',
    name: 'Head Crab',
    aliases: ['Headcrab'],
    status: 'ea-confirmed',
    summary: currentField(
      'The rebuilt Head Crab is a jellyfish that leaps onto a player’s head. Its former spider-crab appearance is historical.',
    ),
    behavior: currentField([
      'September 10 replaced the model and head-clamp appearance, added a dedicated leap animation, changed sounds and screen vignette, and changed the loot after removal.',
    ]),
    counterplay: currentField([
      'Recognize the leap and attached state, leave yourself space to recover, and tell your crew what happened. The patch does not identify an exact removal input or which loot drops.',
    ]),
    behaviorTags: ['head-clamp'],
    mapIds: currentField([]),
    locationNote,
    pageReady: true,
    detailRoute: '/monsters/head-crab',
    lastVerifiedAt: REVIEWED_AT,
    patchChanges: [
      {
        date: '2026-09-10',
        text: 'Rebuilt as a jellyfish with new leap/head-clamp presentation and removal loot.',
        sourceIds: ['S23'],
      },
    ],
  },
  {
    id: 'man-in-shadows',
    slug: 'man-in-shadows',
    name: 'Man in Shadows',
    aliases: ['Man in Shadow'],
    status: 'ea-confirmed',
    summary: currentField(
      'A current enemy whose teleportation and floor transitions changed repeatedly in September.',
      ['S20', 'S23', 'S25'],
    ),
    behavior: currentField(
      [
        'September 1 limited it to one hit at a time. September 10 introduced teleportation and changed elevator behavior. September 18 fixed teleporting between floors.',
      ],
      ['S20', 'S23', 'S25'],
    ),
    counterplay: currentField(
      [
        'Check space on both floors before leaving a lift; do not assume the creature remains where you last saw it. Report repeated hits or broken floor transitions with your current level and host role.',
      ],
      ['S20', 'S23', 'S25'],
    ),
    behaviorTags: ['teleport'],
    mapIds: currentField([]),
    locationNote,
    pageReady: true,
    detailRoute: '/monsters/man-in-shadows',
    lastVerifiedAt: REVIEWED_AT,
    patchChanges: [
      {
        date: '2026-09-01',
        text: 'Only one hit can land at a time.',
        sourceIds: ['S20'],
      },
      {
        date: '2026-09-10',
        text: 'Teleportation introduced and elevator behavior changed.',
        sourceIds: ['S23'],
      },
      {
        date: '2026-09-18',
        text: 'Teleportation between floors fixed.',
        sourceIds: ['S25'],
      },
    ],
  },
  {
    id: 'kraken',
    slug: 'kraken',
    name: 'Kraken',
    aliases: ['Cracken'],
    status: 'ea-confirmed',
    summary: currentField(
      'The Ship threat called Cracken in September announcements; this wiki keeps Kraken as the canonical spelling and indexes both names.',
    ),
    behavior: currentField(
      [
        'The creature moved closer to Ship on September 10. September 18 removed an invisible obstacle blocking Teleport Crystal throws toward it.',
      ],
      ['S23', 'S25'],
    ),
    counterplay: currentField(
      [
        'Reassess the approach from the Ship instead of using an old distance estimate. The crystal collision fix does not establish damage, a guaranteed boss kill or a safe teleport landing.',
      ],
      ['S23', 'S25'],
    ),
    mapIds: currentField(['ship']),
    locationNote:
      'Ship is directly identified in the September notes; the exact level/boss selection table remains unpublished.',
    pageReady: true,
    detailRoute: '/monsters/kraken',
    lastVerifiedAt: REVIEWED_AT,
    patchChanges: [
      {
        date: '2026-09-10',
        text: 'Moved closer to the Ship.',
        sourceIds: ['S23'],
      },
      {
        date: '2026-09-18',
        text: 'Crystal throw obstruction toward Cracken removed.',
        sourceIds: ['S25'],
      },
    ],
  },
];
