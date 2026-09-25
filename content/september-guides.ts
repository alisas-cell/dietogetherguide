import { section as s, wikiPage as p } from './wiki-factory';

export const septemberGuides = [
  p(
    '/guides/progression',
    'Progression Guide: Plan Your Next Run',
    'Choose a chapter using the current selection screen, then plan around its level and store state. September changed chapter length, location order, quota progression and equipment unlocks.',
    ['S23', 'S24'],
    [
      s(
        'before',
        'Before selecting a chapter',
        [
          'Read the level preview before buying for a remembered enemy set. Enemy and boss selection is now level-specific, and the first four chapters each contain one level. Later chapters contain two. An old chapter number alone is not a reliable description of the run.',
        ],
        [
          'Record your selected chapter and level separately.',
          'Ship begins at level 2; Castle begins at level 4.',
          'Do not infer every subsequent location from those two milestones.',
        ],
      ),
      s('budget', 'Bring a plan, not an assumed price list', [
        'Read the actual quota and store prices in your session. The September 14 patch fixed quotas that could drop and unlocked cards that disappeared. There is no published complete current quota or price table to substitute for the screen. Budget only from money your crew actually has.',
      ]),
      s('debrief', 'Record the result after extraction', [
        'Mark a chapter complete after the game confirms completion, not after merely reaching the exit. Keep notes about unlocks and achievements separate from completion; their conditions differ. The local progression tracker stores your observations and never reads your Steam save.',
      ]),
    ],
    [
      ['/progression', 'Progression reference'],
      ['/tools/progression-tracker', 'Track progression'],
      ['/store', 'Store changes'],
    ],
  ),
  p(
    '/guides/level-order',
    'Level Order Guide: Ship, Castle and Chapter Selection',
    'Ship enters the revised progression at level 2 and Castle at level 4. The official September notes describe alternating locations but do not publish the entire 15-level location and boss table.',
    ['S23', 'S25'],
    [
      s('known', 'What the order actually establishes', [
        'The September 10 update moved Ship and Castle earlier and put chapter selection on one page. A level is a stage within progression; a chapter is the selection/completion grouping. The first four chapters are one level each, while later chapters have two.',
      ]),
      s('unknown', 'How to use an incomplete map table', [
        'Treat the current in-game preview as the deciding information for a particular selection. Record the location and threats you observe instead of extrapolating a full repeating sequence from two unlock points. Fifteen levels is supported by the September 18 spawn-point announcement, but that announcement does not enumerate their names.',
      ]),
      s('ship-day', 'Do not confuse Ship day 2 with global level 2', [
        'The September 10 Ship cart change refers to the second day of that location onward. It does not say every global level from level 2 lacks a cart. Check transport availability when you arrive before committing to large or fragile cargo.',
      ]),
    ],
    [
      ['/levels', 'Levels reference'],
      ['/chapters', 'Chapter structure'],
      ['/maps/ship', 'Ship guide'],
    ],
  ),
  p(
    '/guides/quota',
    'Quota Strategy: Secure Value Before Taking More Risk',
    'Use the quota shown in your current run, subtract secured loot, and evaluate how much recoverable value remains. The wiki does not invent a level-by-level quota curve or guarantee extraction.',
    ['S23', 'S24', 'S25'],
    [
      s('count', 'Separate secured, carried and estimated loot', [
        'Secured value is what the game has accepted. Carried value can still be lost or damaged, while a value estimated from loot you have not collected is less certain again. Putting all three in one total can make an unfinished quota look complete.',
      ]),
      s('decision', 'Compare the remaining gap with a realistic next trip', [
        'Use a short trip for known loot when it closes the gap. For an optional detour, consider the route back, available transport and whether another player is needed to free or revive a carrier. This is a planning heuristic, not a verified optimum or a hidden game rule.',
      ]),
      s('patch', 'Why an old quota screenshot can mislead', [
        'September 10 smoothed progression and September 14 corrected backsliding quotas after the level reorder. September 18 added 70 possible spawn points across 15 levels, not 70 guaranteed items to each run. More spawn positions cannot be counted as money before you find the loot.',
      ]),
    ],
    [
      ['/quota', 'Quota reference'],
      ['/tools/quota-planner', 'Calculate your gap'],
      ['/loot', 'Loot database'],
    ],
  ),
  p(
    '/guides/store-unlocks',
    'Store Unlock Guide: Check Cards, Prices and Uses',
    'Store unlock order changed with the September progression rebuild. Inspect your actual cards and prices; September 14 fixed disappearing unlocked cards and September 18 fixed card selection.',
    ['S23', 'S24', 'S25'],
    [
      s('check', 'A purchase checklist', [
        'Before spending, check the item category, available money, price and use counter. Cart upgrades now have their own category. The announcements confirm the interface changes but do not provide every unlock level or current item price.',
      ]),
      s('missing', 'When an expected card is missing', [
        'Confirm the chapter and level selected, then note whether the card had been available earlier in this run. Reproducing a disappearing unlock on a current build is useful bug evidence. A card absent from an old screenshot is not evidence of a permanent unlock requirement.',
      ]),
      s('removed', 'Removed stock is not necessarily a broken shop', [
        'Water Pistol was explicitly removed from the store on September 10. That is different from a card failing to remain unlocked. Boomerang, Cover and Teleport Crystal were added, but their exact stock schedule must be read in-game.',
      ]),
    ],
    [
      ['/store', 'Store reference'],
      ['/items-and-weapons', 'Equipment database'],
      ['/tools/progression-tracker', 'Record observed unlocks'],
    ],
  ),
  p(
    '/guides/hauling',
    'Hauling Guide: Heavy Loot, Multi-grab and Transport',
    'September made large items heavier and changed multi-grab to follow the heaviest item. Clear a return path, check cart and elevator availability, and keep secured value separate from cargo still in transit.',
    ['S20', 'S23', 'S25'],
    [
      s('grab', 'Why another grab may fail', [
        'Holding a cart, cauldron, door, booty or another player’s hand blocks an extra grab after September 1. Put down or release that object before diagnosing the interaction as a broken item. In a multi-grab pile, the heaviest object determines how the pile follows.',
      ]),
      s('weight', 'Reassess large-item routes', [
        'September 10 increased large-item weight, superseding the August weight reduction as a current recommendation. Violin became lighter, so not every item followed the same direction. Test turns and narrow passages before carrying a large piece into an awkward section.',
      ]),
      s('transport', 'Check the whole transport chain', [
        'Ship loses its cart from that location’s second day onward. September 18 corrected elevator cargo and player behavior and added call levers to every level. Move people and cargo with a clear destination; an old brake-lever tutorial no longer matches the current lift controls.',
      ]),
    ],
    [
      ['/loot/large-items', 'Large loot'],
      ['/guides/elevators', 'Elevator guide'],
      ['/guides/fragile-loot', 'Fragile cargo'],
    ],
  ),
  p(
    '/guides/fragile-loot',
    'Fragile Loot Guide: Cover and Undamaged Delivery',
    'Cover wraps fragile loot, and Successful Delivery requires a composite item to reach the end whole and undamaged. Neither the announcement nor the achievement description promises immunity to every collision.',
    ['S19', 'S23', 'S26'],
    [
      s('prepare', 'Protect the item before the risky trip', [
        'Use the current in-game instructions for applying Cover; the public patch does not specify the exact key sequence or its durability. Choose a route with enough room to turn and avoid using a fragile piece as a test object for a blocked passage.',
      ]),
      s('composite', 'Keep composite cargo intact', [
        'The August 28 patch fixed composite-item damage behavior. For Successful Delivery, merely extracting something valuable is not the stated condition: the official description specifies a composite item arriving whole and undamaged. The description does not publish a complete eligible-item list.',
      ]),
      s('roles', 'Reduce conflicting handling', [
        'Agree who handles the object and who checks doors or threats. This is a practical coordination suggestion, not a measured damage reduction. If an attempt fails, record the item, visible damage and delivery result rather than assuming the achievement is bugged.',
      ]),
    ],
    [
      ['/items/cover', 'Cover equipment'],
      ['/achievements', 'Achievement conditions'],
      ['/guides/hauling', 'Hauling mechanics'],
    ],
  ),
  p(
    '/guides/elevators',
    'Elevator Guide: Call Levers, Winches and Cargo',
    'Every level has elevator call levers after September 18, and brake levers were removed. The preceding September 14 patch reduced winch effort by 2.5 times.',
    ['S24', 'S25'],
    [
      s('call', 'Use the current call-lever setup', [
        'Look for the call lever on the current level when the elevator is elsewhere. Do not search for a brake lever from an older guide: its removal is explicit in the September 18 notes. Exact input bindings should be checked in your current controls.',
      ]),
      s('cargo', 'Move the crew and cargo together', [
        'The update fixed players and cart cargo riding elevators. Keep the load organized and check that everyone has arrived before continuing. A fix note describes intended behavior, not a guarantee that every physics edge case is impossible.',
      ]),
      s('threats', 'An elevator is not a certified safe zone', [
        'Man in Shadows had elevator behavior changed on September 10 and floor teleportation fixed on September 18. Do not infer that changing floors permanently strands it. Capture the floor, cargo and host role when reporting a repeatable lift issue.',
      ]),
    ],
    [
      ['/maps/castle', 'Castle'],
      ['/monsters/man-in-shadows', 'Man in Shadows'],
      ['/guides/hauling', 'Cargo planning'],
    ],
  ),
  p(
    '/guides/strong-arms-big-palms',
    'Strong Arms and Big Palms: Carrying Limits',
    'September carrying changes separate heavy-item handling from blocked extra grabs. Strong Arms no longer affects doors, dresser lids or chest lids; holding certain objects prevents an additional grab.',
    ['S20', 'S23'],
    [
      s('limits', 'Check what you are already holding', [
        'The blocked extra-grab list includes carts, cauldrons, doors, booty and player hands. Release the held interaction first when testing another grab. Multi-grab piles follow their heaviest item, so a bulky object can change the feel of an otherwise light bundle.',
      ]),
      s('arms', 'Do not use a door as a strength test', [
        'The official September 1 change explicitly excludes doors and lids from Strong Arms. Failure to move a lid faster therefore does not establish that the effect is missing. Numerical strength multipliers and a complete interaction matrix are not published.',
      ]),
      s('weight', 'Retest after the weight rebalance', [
        'Large items became heavier on September 10 while violin became lighter. An August route or carry comparison may no longer be reproducible. Record the exact item and effect visible in your run; do not infer Big Palms limits from an unsupported stat table.',
      ]),
    ],
    [
      ['/rum-buffs-and-perks', 'Effects guide'],
      ['/guides/hauling', 'Hauling'],
      ['/loot/large-items', 'Large-item changes'],
    ],
  ),
  p(
    '/guides/controls',
    'Controls Guide: Confirmed Inputs and Steam Deck',
    'Use the in-game bindings for your device. Official notes specifically confirm faster right-click fish healing, a crouched right-click Teleport Crystal fix, and Steam Deck Verified status.',
    ['S19', 'S22', 'S25'],
    [
      s('mouse', 'Inputs the patch notes actually name', [
        'Right click heals with fish faster after August 28. September 18 fixes Teleport Crystal right-click use while crouched. These facts do not establish the rest of the keyboard layout or controller equivalents; custom bindings can also differ.',
      ]),
      s('deck', 'On Steam Deck', [
        'The September 9 announcement confirms mapped controls and readable text as part of Verified status. Earlier keyboard and navigation fixes are dated August 28. Verified is not a promise of a specific frame rate, battery life or identical behavior with every custom layout.',
      ]),
      s('trouble', 'When an interaction appears blocked', [
        'Before changing bindings, check whether a held cart, door, cauldron, booty or player hand is blocking another grab. For equipment with an on-screen use counter, confirm remaining uses. Report the device, custom layout and exact action if the current binding still fails.',
      ]),
    ],
    [
      ['/steam-deck', 'Steam Deck status'],
      ['/items/healing-fish', 'Healing Fish'],
      ['/items/teleport-crystal', 'Teleport Crystal'],
    ],
  ),
  p(
    '/troubleshooting/loading',
    'Loading Problems: Tutorial, Startup and Reconnect',
    'Startup loading, tutorial initialization and reconnect failures received separate fixes in August and September. Identify the exact stage that stalls before treating every loading issue as the same bug.',
    ['S19', 'S21', 'S23', 'S24'],
    [
      s('stage', 'Name the stage that stops', [
        'A game that never starts from Steam, a tutorial that never opens, and a session stuck after leaving during loading are different reports. Note the stage, selected chapter, host/client role and whether the problem repeats after launching the current build.',
      ]),
      s('fixed', 'Relevant dated fixes', [
        'August 28 fixed reconnecting after leaving a loading screen. September 3 improved startup loading. September 10 included a developer-reported 3–4 times loading improvement, and September 14 fixed the tutorial’s infinite-loading issue. The performance figure is not an independent benchmark.',
      ]),
      s('next', 'Safe next steps', [
        'Save your observations, check for the current Steam update, and use Steam’s file verification if needed. These are general diagnostics, not official guarantees. Do not delete saves to test a loading problem. Share a reproducible sequence with the developer if it persists.',
      ]),
    ],
    [
      ['/save-and-reconnect', 'Reconnect guide'],
      ['/tutorial', 'Tutorial'],
      ['/performance', 'Performance context'],
    ],
  ),
];

export const guideHub = p(
  '/guides',
  'Die Together Guides: Progression, Hauling and Controls',
  'Choose a task-focused guide, then use its linked reference page for the underlying evidence. These guides reflect September progression, equipment and transport changes.',
  ['S20', 'S23', 'S24', 'S25'],
  [
    s(
      'progress',
      'Progression and purchases',
      [
        'Plan from the chapter preview and actual quota, not an old unlock chart.',
      ],
      undefined,
      septemberGuides
        .filter((g) =>
          [
            '/guides/progression',
            '/guides/level-order',
            '/guides/quota',
            '/guides/store-unlocks',
          ].includes(g.route),
        )
        .map((g) => [g.route, g.title]),
    ),
    s(
      'carry',
      'Cargo and equipment',
      [
        'Learn the current grabbing restrictions, fragile delivery condition and lift changes before committing a valuable load.',
      ],
      undefined,
      septemberGuides
        .filter(
          (g) =>
            g.route.startsWith('/guides/') &&
            ![
              '/guides/progression',
              '/guides/level-order',
              '/guides/quota',
              '/guides/store-unlocks',
            ].includes(g.route),
        )
        .map((g) => [g.route, g.title]),
    ),
    s(
      'help',
      'Need a first run or a connection fix?',
      [
        'The beginner and co-op guides remain at their existing addresses. Tools use the same evidence registry as the reference pages.',
      ],
      undefined,
      [
        ['/beginner-guide', 'Beginner guide'],
        ['/coop', 'Co-op hub'],
        ['/tools', 'All tools'],
      ],
    ),
  ],
  [
    ['/progression', 'Progression reference'],
    ['/loot', 'Loot reference'],
    ['/monsters', 'Monster database'],
  ],
);
