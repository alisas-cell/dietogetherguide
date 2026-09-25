import { monsters } from '../data/monsters';
import { items } from '../data/items';
import { septemberPatches } from '../data/september-patches';
import { section as s, wikiPage as p } from './wiki-factory';

const monsterNotes: Record<string, [string, string]> = {
  'head-crab': [
    'Is Head Crab still a spider?',
    'No. September 10 rebuilt it as a jellyfish. Crab and the achievement name Head Man are separate labels; neither is evidence that they are this creature. The public note does not supply a removal key or the new drop names.',
  ],
  anchorer: [
    'Anchor is not the unnamed treasure enemy',
    'The September notes shorten Anchorer to Anchor. Its documented hook-and-pull behavior is distinct from the new unnamed treasure-disguised enemy. Do not use old loot-hiding finder labels to identify it.',
  ],
  ear: [
    'Sound cue versus sound detection',
    'Ear is described as blind and hunting by sound. This is stronger evidence of sound detection than merely hearing a creature make noise. The August range reduction has no published numeric hearing radius.',
  ],
  snake: [
    'A smaller health pool is not a new trigger',
    'September 10 reduced Snake health from 500 to 150. Its documented restraint behavior does not establish that player movement is its detection trigger, and the wiki does not use movement alone to identify it.',
  ],
  crab: [
    'Crab and Head Crab are not merged',
    'Crab is the loot-stealing, player-grabbing creature named at launch. September 18 says Crab releases players during host migration. That note does not identify it as the redesigned jellyfish Head Crab.',
  ],
  parrot: [
    'An alarm is not harmless to the run',
    'The launch description says its screech calls nearby enemies even though it is harmless alone. The September announcement also describes an unnamed airborne threat; being airborne is not enough to conclude that the new enemy is Parrot.',
  ],
  sleeper: [
    'Avoid waking it unnecessarily',
    'The launch warning says Sleeper keeps following after being disturbed. September 1 updated its look-around animation, not a published chase timer. No guaranteed distance or hiding trick is supplied by those notes.',
  ],
  mimic: [
    'A copied teammate is a different clue',
    'Mimic is described at launch as copying familiar voices. The June attack-reaction note is Demo history, not a newly tested September rule. The unnamed September treasure-disguised threat is not confirmed to be Mimic.',
  ],
  rat: [
    'Burrow reset is a specific fix',
    'September 18 says burrow rats return to their spot after a player dies. That does not establish that every rat despawns, nor does it publish a Rat King boss selection table.',
  ],
  siren: [
    'Making a sound does not mean hunting by sound',
    'The August 26 pull sound is a warning cue, alongside restored knockback. The note does not say Siren detects noise or publish its range. Monster Finder therefore matches its pull/knockback clues, not Ear’s sound-hunting clue.',
  ],
  'man-in-shadows': [
    'Floor changes do not guarantee escape',
    'September changed teleport and elevator behavior and then fixed teleporting between floors. The Steam achievement uses the singular spelling Man in Shadow. Its description confirms a kill condition, not the equipment or level needed.',
  ],
  kraken: [
    'Kraken / Cracken spelling and evidence',
    'Official September notes spell the Ship creature Cracken. Both spellings lead to this record. A Teleport Crystal collision fix near the creature does not prove a damage interaction or an instant-kill strategy.',
  ],
};

export const septemberMonsterPages = monsters
  .filter((m) => m.status === 'ea-confirmed')
  .map((m) => {
    const ids = [
      ...new Set([
        ...(m.summary?.evidence.sourceIds ?? []),
        ...(m.behavior?.evidence.sourceIds ?? []),
        ...(m.patchChanges ?? []).flatMap((c) => c.sourceIds),
        'S23',
      ]),
    ];
    const [heading, note] = monsterNotes[m.id]!;
    const page = p(
      `/monsters/${m.slug}`,
      `${m.name} Guide: Behavior, Counters and Patch History`,
      m.summary!.value,
      ids,
      [
        s(
          'behavior',
          'Known behavior and practical response',
          m.behavior?.value ?? [],
          m.counterplay?.value,
        ),
        s('identification', heading, [note]),
        s(
          'location',
          'Location and level evidence',
          [
            m.locationNote ??
              'A complete current spawn table is not published.',
          ],
          m.mapIds?.value.length
            ? m.mapIds.value.map((id) => `Officially associated with ${id}.`)
            : ['Exact level, boss role, damage and range remain unverified.'],
        ),
        {
          ...s('history', 'Dated changes', [
            'Review the date as well as the behavior: a historical adjustment is not a new September mechanic.',
          ]),
          table: {
            headers: ['Date', 'Change'],
            rows: m.patchChanges?.length
              ? m.patchChanges.map((c) => [c.date, c.text])
              : [
                  [
                    '2026-09-25',
                    'Launch evidence reviewed against the September archive; no specifically named September mechanic change was found.',
                  ],
                ],
          },
        },
      ],
      [
        ['/monsters', 'Monster database'],
        ['/tools/monster-finder', 'Identify a threat'],
        ['/updates/september-2026', 'September changes'],
      ],
      [
        {
          question: `Where does ${m.name} spawn?`,
          answer:
            m.locationNote ??
            'The official notes do not publish a complete level assignment.',
        },
      ],
    );
    return {
      ...page,
      directAnswer: [
        m.summary!.value,
        ...(m.behavior?.value ?? []),
        ...(m.counterplay?.value ?? []),
      ],
      heroImage: m.image
        ? { src: m.image.src, alt: m.image.alt, assetId: m.image.sourceId }
        : undefined,
    };
  });

const itemDetails: Record<
  string,
  { sections: ReturnType<typeof s>[]; links: Array<[string, string]> }
> = {
  boomerang: {
    sections: [
      s('throws', 'Outbound, return and catch', [
        'The September 10 introduction says the boomerang can hit on both the outbound and return paths, can be caught in midair, and can strike its thrower. Three throw variants are mentioned, but the announcement does not map them to specific buttons.',
      ]),
      s('use', 'Plan for the returning path', [
        'Leave yourself room and warn nearby crew before experimenting with a throw. That is a handling suggestion, not a tested range or damage advantage. Read the current use counter and bindings rather than assuming unlimited throws.',
      ]),
      s('unknown', 'What is not published', [
        'Exact damage, range, durability, price and unlock level are not supplied in the introduction. The store was subsequently corrected, so an old shop screenshot cannot establish today’s price.',
      ]),
    ],
    links: [
      ['/weapons', 'Weapon reference'],
      ['/store', 'Store'],
      ['/guides/controls', 'Controls'],
    ],
  },
  cover: {
    sections: [
      s('purpose', 'Protection for fragile cargo', [
        'Cover was introduced as wrapping that protects fragile items from shattering when dropped. The announcement does not publish a durability figure, application key or blanket immunity to all hazards.',
      ]),
      s('delivery', 'Use it with a delivery plan', [
        'Choose an open route and coordinate who handles the item. Successful Delivery requires a composite item to arrive whole and undamaged; the achievement does not say that equipping Cover automatically awards it.',
      ]),
      s('check', 'Inspect the actual item and shop', [
        'Check the current item instructions and available stock before committing your budget. The September store reorder and price fixes do not publish a universal unlock or price table.',
      ]),
    ],
    links: [
      ['/guides/fragile-loot', 'Fragile delivery'],
      ['/achievements', 'Achievements'],
      ['/loot', 'Loot'],
    ],
  },
  'teleport-crystal': {
    sections: [
      s('escape', 'An escape tool, not a guaranteed safe landing', [
        'The September introduction positions Teleport Crystal as a way out, while warning that escape is not necessarily safe. Check the visible destination and your crew’s situation; no official numeric range or cooldown is published.',
      ]),
      s('fixes', 'September 18 behavior corrections', [
        'Crouched right-click use was fixed, the invisible obstacle blocking throws toward Cracken on Ship was removed, and standing on the crystal no longer allows flight. Old videos relying on crystal flight describe removed behavior.',
      ]),
      s('limits', 'Do not infer combat statistics from collision fixes', [
        'The Ship fix establishes that a throw was obstructed, not that the crystal damages or kills Kraken. Price, unlock level and exact effect limits remain unverified in the public notes.',
      ]),
    ],
    links: [
      ['/maps/ship', 'Ship'],
      ['/monsters/kraken', 'Kraken'],
      ['/tools-and-utility', 'Utility equipment'],
    ],
  },
  'healing-fish': {
    sections: [
      s('healing', 'Faster right-click healing', [
        'The August 28 announcement specifically says right click heals with fish faster. It does not state HP per use, a cooldown, or a full controller binding map. Check your current controls if you have rebound the action.',
      ]),
      s('achievement', 'Fishy doctor tracks cumulative ally healing', [
        'Steam’s achievement description requires healing allies for a combined 500 HP with Healing Fish. That is an achievement total, not the healing value of one fish. The description concerns allies, so do not treat self-healing as established progress toward it.',
      ]),
      s('crew', 'Coordinate healing during a run', [
        'Tell a teammate before attempting a heal and use the in-game health feedback to confirm it landed. This practical advice is separate from the official numerical achievement condition; no optimal healing rotation has been tested here.',
      ]),
    ],
    links: [
      ['/achievements', 'Fishy doctor and other achievements'],
      ['/revive-guide', 'Revival is a separate action'],
      ['/guides/controls', 'Confirmed inputs'],
    ],
  },
};
export const septemberItemPages = Object.entries(itemDetails).map(
  ([id, detail]) => {
    const item = items.find((i) => i.id === id)!;
    return p(
      `/items/${id}`,
      `${item.name} Guide: Uses, Changes and Limits`,
      item.purpose!.value,
      item.purpose!.evidence.sourceIds,
      detail.sections,
      detail.links,
    );
  },
);
septemberItemPages.push(
  p(
    '/items/instruments',
    'Instruments: Piano, Violin and Carrying Changes',
    'Official patches name piano and violin in carrying fixes. Violin became lighter in September; these notes do not establish a complete current instrument price list.',
    ['S19', 'S20', 'S23'],
    [
      s('piano', 'Piano multi-grab', [
        'August 28 fixed piano multi-grab. September 1 then changed multi-grab piles to follow the heaviest item and restricted additional grabs while holding certain objects. A successful grab does not mean a large instrument will fit through every route.',
      ]),
      s('violin', 'Violin differs from the large-item trend', [
        'September 10 made violin lighter while increasing large-item weight. September 1 also mentioned a violin visual correction. Do not apply a blanket weight multiplier from one category to this individual object.',
      ]),
      s('value', 'Observe value and condition in the run', [
        'Exact current values and damage thresholds are not published in these notes. Record the value the game actually shows and keep secured loot separate from cargo that could still break during transport.',
      ]),
    ],
    [
      ['/loot/large-items', 'Large loot'],
      ['/guides/hauling', 'Hauling'],
      ['/guides/fragile-loot', 'Fragile delivery'],
    ],
  ),
);

export const septemberUpdatePages = septemberPatches
  .filter((patch) =>
    ['2026-09-18', '2026-09-14', '2026-09-10'].includes(patch.date),
  )
  .map((patch) =>
    p(
      `/updates/${patch.slug}`,
      `${patch.date}: ${patch.title}`,
      patch.summary,
      patch.sourceIds,
      [
        s(
          'changes',
          'What changed',
          [],
          patch.changes.map((change) => change.text),
        ),
        s('implications', 'What to revisit in your next run', [
          patch.date === '2026-09-10'
            ? 'Recheck chapter selection, available equipment and the level preview. Old enemy assignments, hauling assumptions and store order may no longer describe your run.'
            : patch.date === '2026-09-14'
              ? 'Retry the tutorial and inspect your quota and unlocked store cards on the current build. Keep a reproducible report if the corrected behavior still fails.'
              : 'Check the lobby waiting state, lift controls and current cargo behavior. The 70 new spawn points are distributed across 15 levels, not guaranteed extra items in each run.',
        ]),
        s(
          'affected',
          'Guides affected by this patch',
          [
            'These pages use the same central patch record. A fix note is evidence of a shipped correction, not proof that every related bug is impossible.',
          ],
          undefined,
          patch.affectedRoutes
            .filter((route) => route !== '/' && !route.startsWith('/updates'))
            .slice(0, 18)
            .map((route) => [
              route,
              route.slice(1).replaceAll('/', ' · ').replaceAll('-', ' '),
            ]),
        ),
        s('source', 'Source and scope', [
          `Official announcement dated ${patch.date}; reviewed September 25, 2026. Exact damage, spawn odds and undisclosed unlock tables are not inferred from the announcement.`,
        ]),
      ],
      [
        ['/updates/september-2026', 'September timeline'],
        ['/updates', 'All updates'],
        ['/progression', 'Current progression'],
      ],
    ),
  );
