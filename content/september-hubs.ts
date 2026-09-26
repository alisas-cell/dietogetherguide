import { monsters } from '../data/monsters';
import { items } from '../data/items';
import { maps } from '../data/maps';
import { patches } from '../data/patches';
import { septemberPatches } from '../data/september-patches';
import { section as s, wikiPage as p } from './wiki-factory';

export const toolLinks: Array<[string, string]> = [
  ['/tools/monster-finder', 'Monster Finder'],
  ['/tools/coop-troubleshooter', 'Co-op Troubleshooter'],
  ['/tools/run-chapter-tracker', 'Run / Chapter Tracker'],
  ['/tools/progression-tracker', 'Progression Tracker'],
  ['/tools/quota-planner', 'Quota Planner'],
];
export const septemberHubs = [
  p(
    '/monsters',
    'Die Together Monsters: Current Bestiary and Changes',
    'Identify current monsters by documented behavior, not an assumed complete roster. Head Crab is now a jellyfish, Anchor uses a hook, and enemy sets and bosses vary by level.',
    ['S11', 'S17', 'S20', 'S23', 'S25'],
    [
      {
        ...s(
          'current',
          'Current named records',
          [
            'The database and Monster Finder share these records. An unknown map assignment is not a confirmed absence.',
          ],
          undefined,
          monsters
            .filter((m) => m.status === 'ea-confirmed')
            .map((m) => [m.detailRoute!, m.name]),
        ),
        table: {
          headers: ['Monster', 'Evidence-backed identification'],
          rows: monsters
            .filter((m) => m.status === 'ea-confirmed')
            .map((m) => [m.name, m.summary!.value]),
        },
      },
      s('new-threats', 'Two new threats remain unnamed', [
        'September 10 describes a treasure-disguised enemy that drags players until a friend frees them and another threat that circles overhead. The post does not supply their names. They are not silently assigned to Anchorer, Mimic or Parrot.',
      ]),
      s('historical', 'Demo references are a separate ledger', [
        'Howler, Misha, Screamer, Monkey Screamer, Pirate, Shark and Pirate Head occur in older evidence. Their old behavior is not promoted to the current roster. Steam’s Shark achievement is a current named objective but does not verify a full modern behavior or spawn record.',
      ]),
      s(
        'bosses',
        'Level-specific bosses',
        [
          'The September progression update makes enemy sets and boss selection depend on the level. No complete boss-to-level chart is published in the checked announcements.',
        ],
        undefined,
        [
          ['/monsters/bosses', 'Boss evidence'],
          ['/tools/monster-finder', 'Filter current threats'],
        ],
      ),
    ],
    [
      ['/updates/statues-head-crab-major-update', 'Major monster update'],
      ['/levels', 'Levels'],
      ['/maps', 'Maps'],
    ],
  ),
  p(
    '/monsters/bosses',
    'Bosses: Level Selection and Verified Limits',
    'Boss selection is level-specific after September 10. Public patch notes and achievements name some combat objectives but do not publish a complete boss roster or level assignment.',
    ['S23', 'S25', 'S26'],
    [
      s('selection', 'Check the level preview', [
        'A familiar chapter label can lead to a different run structure after September. Use the game’s selection screen and record the level you actually chose. The wiki does not assign every named enemy a boss role.',
      ]),
      s('objectives', 'Achievement names do not replace mechanics', [
        'Steam describes kills involving Man in Shadow, Head Man, Shark and six enemies for Full bestiary. One shot - one boss asks for an enemy kill with a Cannon. The title alone is not evidence that every eligible target is a boss or that Golden Hand Cannon is required.',
      ]),
      s('ship', 'Ship’s Kraken / Cracken evidence', [
        'The September notes moved Cracken closer to Ship and removed an obstacle affecting crystal throws toward it. Those changes establish a location association, not its HP, rewards, exact boss slot or a crystal kill strategy.',
      ]),
    ],
    [
      ['/achievements', 'Combat achievement conditions'],
      ['/monsters/kraken', 'Kraken'],
      ['/levels', 'Level evidence'],
    ],
  ),
  p(
    '/maps',
    'Die Together Maps: Mansion, Ship and Castle',
    'Mansion, Ship and Castle are named in the September progression and fixes. Ship appears at level 2 and Castle at level 4; Silent Cove remains a separately labeled Demo archive.',
    ['S23', 'S24', 'S25'],
    [
      {
        ...s(
          'locations',
          'Current locations',
          [
            'Use location guides for dated hazards, transport and loot corrections. None claims an official floor plan or a complete spawn chart.',
          ],
          undefined,
          maps
            .filter((m) => m.status === 'ea-live')
            .map((m) => [`/maps/${m.slug}`, m.name]),
        ),
        table: {
          headers: ['Location', 'Current evidence'],
          rows: maps
            .filter((m) => m.status === 'ea-live')
            .map((m) => [m.name, m.overview!.value]),
        },
      },
      s('order', 'Location order versus chapter order', [
        'September 10 described one-level early chapters and two-level later chapters while reordering locations. September 25 uses different Chapter 1 wording. Enemy sets remain level-specific evidence, but an old route is not a complete current progression table.',
      ]),
      s('spawns', '70 additional possible loot positions', [
        'September 18 added 70 spawn points across 15 levels and fixed large loot under Ship floors and oversized items in Mansion chests. This does not guarantee a fixed count or value in every run.',
      ]),
      s(
        'archive',
        'Historical map record',
        [
          'Silent Cove’s Demo layout is not substituted for Mansion, Ship or Castle.',
        ],
        undefined,
        [['/maps/silent-cove', 'Silent Cove — Demo archive']],
      ),
    ],
    [
      ['/levels', 'Current levels'],
      ['/guides/elevators', 'Elevators'],
      ['/loot', 'Loot'],
    ],
  ),
  p(
    '/items-and-weapons',
    'Die Together Items and Weapons Database',
    'September added Boomerang, Cover and Teleport Crystal, removed Water Pistol from the store, and revised unlocks and use counters. Read current equipment by purpose; unpublished prices and stats remain unknown.',
    ['S23', 'S24', 'S25'],
    [
      {
        ...s('equipment', 'Current equipment records', [
          'These records preserve dated evidence. A removed store item is retained for identification, not recommended as current stock.',
        ]),
        table: {
          headers: ['Item', 'Category', 'Verified purpose / change'],
          rows: items
            .filter((i) => i.status === 'ea-confirmed')
            .map((i) => [
              i.name,
              i.category,
              i.purpose?.value ?? 'See the cited item evidence.',
            ]),
        },
      },
      s(
        'details',
        'Equipment guides',
        [
          'For a specific interaction, use the item’s guide and check the current in-game binding.',
        ],
        undefined,
        [
          ['/items/boomerang', 'Boomerang'],
          ['/items/cover', 'Cover'],
          ['/items/teleport-crystal', 'Teleport Crystal'],
          ['/items/healing-fish', 'Healing Fish'],
          ['/items/instruments', 'Instruments'],
          ['/golden-weapons', 'Golden Weapons'],
        ],
      ),
      s(
        'store',
        'The store is part of progression',
        [
          'The September reorder changed unlock progression, and later fixes addressed prices, disappearing cards and selection. An August Monkey Cart price is historical, not a verified September purchase cost.',
        ],
        undefined,
        [
          ['/store', 'Store reference'],
          ['/weapons', 'Weapons'],
          ['/tools-and-utility', 'Utility tools'],
        ],
      ),
      s(
        'handling',
        'Equipment use is different from loot handling',
        [
          'The carrying restriction on extra grabs applies while holding a cart, cauldron, door, booty or player hand. If an equipment action appears blocked, distinguish a held-object rule from depleted uses or a changed binding. Exact weapon damage is not inferred from the item model or an achievement name.',
        ],
        undefined,
        [
          ['/guides/controls', 'Controls evidence'],
          ['/guides/hauling', 'Carrying rules'],
        ],
      ),
    ],
    [
      ['/loot', 'Loot is separate from equipment'],
      ['/guides/store-unlocks', 'Buying checklist'],
      ['/updates', 'Patch timeline'],
    ],
  ),
  p(
    '/tools',
    'Die Together Tools: Identify, Diagnose and Plan',
    'Five browser tools turn the wiki’s current evidence into practical decisions. Trackers store your own notes on this device; none reads Steam saves, unlocks achievements or predicts hidden spawn tables.',
    ['S23', 'S24', 'S25'],
    [
      s(
        'identify',
        'Identify and troubleshoot',
        [
          'Monster Finder filters the shared bestiary. Co-op Troubleshooter separates join, waiting, voice, revive and migration problems and distinguishes official fixes from general diagnostics.',
        ],
        undefined,
        toolLinks.slice(0, 2),
      ),
      s(
        'record',
        'Keep a local progression notebook',
        [
          'Run Tracker records session outcomes. Progression Tracker keeps observed chapter, level, unlock and achievement notes. Export important notes before clearing browser data; this is not a cloud backup.',
        ],
        undefined,
        toolLinks.slice(2, 4),
      ),
      s(
        'calculate',
        'Plan from numbers you actually see',
        [
          'Quota Planner uses your own quota, secured value and estimated cargo. It does not ship a fabricated quota curve or current loot prices.',
        ],
        undefined,
        toolLinks.slice(4),
      ),
      s(
        'boundaries',
        'What a tool result does not prove',
        [
          'A Monster Finder result is a transparent match to stored clues, not a visual recognition model or a complete bestiary. An empty specific-level filter reflects missing published assignments, not an enemy-free level. A troubleshooting checklist cannot promise recovery, and a zero projected quota gap does not mean the boat accepted the loot.',
        ],
        undefined,
        [['/guides', 'Practical guide library']],
      ),
    ],
    [
      ['/progression', 'Progression rules'],
      ['/quota', 'Quota evidence'],
      ['/coop', 'Co-op hub'],
    ],
  ),
];

const timelineSections = (entries: typeof patches) =>
  entries.map((patch) =>
    s(
      patch.id,
      `${patch.date} · ${patch.title}`,
      [patch.summary],
      patch.changes.map((change) => change.text),
      patch.sourceUrl
        ? [[patch.sourceUrl, 'Official announcement']]
        : undefined,
    ),
  );
export const septemberTimeline = p(
  '/updates/september-2026',
  'September 2026 Updates: Progression, Monsters, Loot and Co-op',
  'September rebuilt progression and Head Crab, added equipment and achievements, brought Steam Deck Verified status, and fixed tutorials, quotas, lifts and lobbies. Latest gameplay patch found: September 18; archive reviewed September 25.',
  ['S19', 'S20', 'S21', 'S22', 'S23', 'S24', 'S25', 'S27'],
  [
    ...timelineSections(septemberPatches),
    s('event', 'Historical event: full access ended September 9', [
      'The September 1 extension kept Ship and Castle open through September 9. That dated event is over; it is not current permanent access or unlock policy.',
    ]),
  ],
  [
    ['/updates/fresh-lobby-70-loot-spawns', 'September 18 details'],
    ['/updates/statues-head-crab-major-update', 'September 10 details'],
    ['/updates', 'Full timeline'],
  ],
);
export const updatesHub = p(
  '/updates',
  'Last Pirates: Die Together Updates and Patch Notes',
  'Latest official gameplay patch found is September 18, 2026: lobby improvements and 70 more loot spawn points across 15 levels. The official archive was reviewed September 25; the timeline retains older changes as history.',
  [...new Set(patches.flatMap((patch) => patch.sourceIds)), 'S27'],
  [
    s(
      'current',
      'September current-build review',
      [
        'Start with the monthly timeline, then open a dated detail guide for the patch or interaction you need. Historical corrections are not universal promises about the newest build.',
      ],
      undefined,
      [
        ['/updates/september-2026', 'September update summary'],
        ['/updates/fresh-lobby-70-loot-spawns', 'September 18'],
        ['/updates/september-14-tutorial-store-loot', 'September 14'],
        ['/updates/statues-head-crab-major-update', 'September 10'],
      ],
    ),
    ...timelineSections(patches),
    s('event', 'Expired event, not current access policy', [
      'The Ship/Castle full-access extension ended September 9. This historical promotion does not determine present unlock requirements.',
    ]),
  ],
  [
    ['/monsters', 'Affected monsters'],
    ['/progression', 'Progression'],
    ['/loot', 'Loot'],
  ],
);

export const septemberMapPages = [
  p(
    '/maps/mansion',
    'Mansion Guide: Loot, Collision and Progression',
    'Mansion is a current location named in September’s progression and fixes. Updates address chair pickup, stairs, lighting and oversized chest loot; a complete floor plan is not published.',
    ['S20', 'S23', 'S25'],
    [
      s('order', 'Use the current level preview', [
        'September reorders Mansion, Ship and Castle progression. The public notes identify Ship at level 2 and Castle at level 4, but do not publish a complete Mansion level list or every enemy assignment.',
      ]),
      s('loot', 'Loot and pickup corrections', [
        'September 1 fixed picking up Mansion chairs. September 18 corrected oversized loot appearing in chests. Check the actual object and exit route before planning a large haul; there is no verified current value sheet for all Mansion loot.',
      ]),
      s('movement', 'Stairs and lighting', [
        'September 10 fixed stair collision and lighting. Retest a route on the current build before following a launch-era workaround. For a repeatable collision problem, record the level and exact object without deleting local progress.',
      ]),
    ],
    [
      ['/maps', 'All maps'],
      ['/levels', 'Level order'],
      ['/guides/hauling', 'Hauling'],
    ],
  ),
  p(
    '/maps/ship',
    'Ship Guide: Level 2, Cart Changes and Kraken',
    'Ship first appears at level 2 in September’s reordered progression. Its cart is absent from the location’s second day onward, Kraken moved closer, and later patches corrected large-loot and crystal collision problems.',
    ['S11', 'S16', 'S19', 'S20', 'S23', 'S25'],
    [
      s('progression', 'Level 2 is not Ship day 2', [
        'The location’s introduction at global level 2 and the cart restriction from Ship day 2 are separate statements. Check your chapter and day context before planning around a cart. The full Ship level/enemy table is not published.',
      ]),
      s('loot', 'Loot and hauling changes', [
        'Titanic was added as a breakable Ship-level item in August. Late-August and September changed the location’s loot pools and large-item placements, including the September 18 under-floor spawn fix. No exact Titanic value or fixed spawn probability is established here.',
      ]),
      s('kraken', 'Kraken / Cracken and Teleport Crystal', [
        'September 10 moved Cracken closer to Ship. September 18 removed an invisible obstacle that blocked crystal throws toward it. This is a collision correction, not evidence of a guaranteed safe teleport or combat exploit.',
      ]),
      s('route', 'Plan a return route with the current load', [
        'Large items became heavier in September. Recheck narrow turns before committing cargo, and distinguish visible loot from secured value when calculating quota. The diagram-free guide avoids inventing a floor plan.',
      ]),
    ],
    [
      ['/monsters/kraken', 'Kraken evidence'],
      ['/items/teleport-crystal', 'Crystal fixes'],
      ['/guides/hauling', 'Current hauling'],
    ],
  ),
  p(
    '/maps/castle',
    'Castle Guide: Level 4, Elevators and Loot',
    'Castle enters the revised progression at level 4. Current transport guidance includes easier winches, call levers on every level, removed brake levers and corrected elevator cargo behavior.',
    ['S11', 'S20', 'S23', 'S24', 'S25'],
    [
      s('progression', 'Plan for the level, not only the location name', [
        'September changed the location sequence and made enemy sets and bosses level-specific. Castle at level 4 is a verified milestone, but it does not provide the complete later Castle order or a boss chart.',
      ]),
      s('transport', 'Elevators and winches after September fixes', [
        'The September 14 note says winches require 2.5 times fewer turns. September 18 adds call levers to every level, removes brake levers and fixes players and cart cargo riding lifts. These are global transport fixes relevant to Castle, not claims that every level has an identical layout.',
      ]),
      s('loot', 'Heavy cargo and revised loot pools', [
        'Castle’s loot pool changed September 1 and large items became heavier September 10. Stage cargo with the exit and lift in mind. The 70 additional spawn points announced September 18 span all 15 levels rather than belonging entirely to Castle.',
      ]),
      s('threats', 'Do not treat a floor change as permanent safety', [
        'Man in Shadows’ floor teleportation was fixed September 18. That does not assign it to every Castle level, but it does invalidate a universal assumption that any lift strands an enemy. Check the current level preview.',
      ]),
    ],
    [
      ['/guides/elevators', 'Lift controls'],
      ['/loot/large-items', 'Large loot'],
      ['/levels', 'Progression milestones'],
    ],
  ),
];
