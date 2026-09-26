import { BATCH_REVIEW_DATE, chapterWordingCaution, september25Patch, september25Route, supportedInterfaceLanguages } from '../data/september26';
import { section as s, wikiPage as p } from './wiki-factory';
import type { GuidePageData } from './types';

const latestLinks: Array<[string, string]> = [
  ['/updates/september-2026', 'September timeline'], ['/quota', 'Current quota'], ['/store', 'Shop changes'],
];
const draftPages: GuidePageData[] = [
  p(september25Route,
    'September 25 Update: Solo Quota, Shop Prices and Co-op Fixes',
    'The September 25 update changes early solo quota and shop balances, corrects co-op recovery states, and fixes Mimic and Castle elevator interactions. Use the affected-system checklist below to revisit an old run plan.',
    ['S28', 'S23'], [
      { ...s('impact', 'Which part of your run needs a recheck?', [
        'This is a dated patch digest, not a replacement for every monster or progression guide. Find the situation you actually encountered, then follow the linked system guide. A developer fix describes an intended correction; it is not a guarantee that every future session is free of a similar symptom.',
      ]), table: { headers: ['Situation', 'First check', 'Record if it recurs'], rows: [
        ['Solo quota looks different', 'Read the objective and selected chapter/level', 'Solo status and the exact selector label'],
        ['Your shop budget no longer fits', 'Compare visible stock prices with your available gold', 'Shop number and balance before/after transition'],
        ['Teammates disagree about a revive', 'Compare both players’ observed state', 'Host/client roles and sequence before recovery'],
        ['Castle lift movement looks wrong', 'Identify the lift and whether the rider was crouching', 'Location label, direction and rider position'],
      ] } },
      s('confirmed', 'Dated changes in the official announcement', [
        'The notes below are a compact source-backed change record. Use them to identify what to retest, rather than applying an old workaround automatically. The announcement supplies no complete price sheet, guaranteed monster route or new damage chart.',
      ], september25Patch.changes.map((change) => change.text)),
      s('chapter-labels', 'Do not silently reconcile different chapter labels', [
        chapterWordingCaution,
        'For practical planning, the on-screen target is the input that matters. Record that target before using a calculator. If your visible labels differ from either dated announcement, keep both the screenshot and the build context in a report instead of renaming levels to force the sources to agree.',
      ]),
      s('reporting', 'A useful follow-up report', [
        'After installing the update, retry only the specific interaction that failed. Describe the expected result, the result you saw, and the steps another player can repeat. Include whether you hosted or joined, which location was active, and whether the issue survives a fresh session. Avoid deleting saves or changing unrelated system settings just because a patch mentions co-op.',
      ], undefined, [['/revive-guide', 'Recovery evidence'], ['/guides/elevators', 'Elevator controls'], ['/items/cauldron', 'Cauldron interaction states']]),
    ], latestLinks),
  p('/updates/sep-01-cleaner-carrying-fresh-loot',
    'September 1 Update: Cleaner Carrying and Fresh Loot',
    'September 1 changed multi-grab handling, restricted additional grabs while holding certain objects, and revised location loot pools. This dated guide separates handling changes from unrelated access-event announcements.',
    ['S20', 'S27', 'S23'], [
      { ...s('decision', 'Choose the right explanation for a failed grab', [
        'A carrying problem can have several distinct contexts. Start with what is already in your hands, not with a presumed item-weight statistic. The announcement describes specific restrictions and handling changes; it does not publish a universal maximum load or prove that every later failed pickup has the same cause.',
      ]), table: { headers: ['Observation', 'September 1 context', 'Next useful check'], rows: [
        ['A pile moves differently', 'Multi-grab follows the heaviest object', 'Identify which object determines the movement'],
        ['An extra grab will not attach', 'Certain held objects block extra grabs', 'Check whether you are holding a cart, cauldron, door, booty or hand'],
        ['Strong Arms feels different at a door', 'Doors and lids no longer receive that effect', 'Do not use an old door demonstration as a current strength test'],
        ['A familiar location has different cargo', 'Ship and Castle loot pools changed', 'Inspect actual loot rather than assuming an exhaustive old pool'],
      ] } },
      s('scope', 'Handling rules are not a price or spawn table', [
        'The heaviest-object rule helps explain why a mixed pile behaves differently from a single small object. It does not give exact mass, carry speed, stamina cost or a guarantee that the pile fits through a doorway. Test the route with the objects present in your own run before asking a teammate to move the entire load.',
        'Picking up items from Mansion chairs and Ship door/chest interactions were also corrected. Those named fixes belong to their location context. They should not be generalized into an unsupported claim that all furniture can be looted, all containers are safe, or every map shares the same item pool.',
      ]),
      s('later-context', 'Keep the September 1 patch separate from later changes', [
        'Later September notes changed large-item weight and other transport behavior again. Read the current hauling guide before turning this historical record into a load plan. The separate September 1 access extension was time-limited and ended September 9; it is not evidence that Ship and Castle remain permanently unlocked for every player.',
        'Use this page when you need to understand the September 1 transition. For a present-day item question, follow the entity or system guide below, which can include later corrections without rewriting what this patch originally announced.',
      ]),
    ], [['/guides/hauling', 'Current hauling'], ['/guides/strong-arms-big-palms', 'Carrying effects'], ['/updates/september-2026', 'Later September updates']]),
  p('/updates/aug-28-healing-fish-fixes',
    'August 28 Update: Healing Fish and Reconnect Fixes',
    'August 28 accelerated right-click fish healing and corrected loading-screen reconnect and piano multi-grab behavior. This historical patch guide helps identify which interaction changed without promising healing statistics or guaranteed recovery.',
    ['S19'], [
      { ...s('triage', 'Match the symptom to the patch scope', [
        'Use the table as a historical troubleshooting index. A matching symptom is a reason to check your build and reproduce the interaction, not proof that you have found the only possible cause. Keep healing, reconnecting and carrying as separate tests so the result of one does not hide the state of another.',
      ]), table: { headers: ['Interaction', 'Dated correction', 'What to verify now'], rows: [
        ['Healing Fish', 'Right-click healing became faster', 'The configured action and visible health feedback'],
        ['Leave during loading, then return', 'Reconnect for that sequence was fixed', 'The actual leave/rejoin sequence and host role'],
        ['Piano with multiple grabbers', 'Piano multi-grab was corrected', 'Each participant’s grip and the path being attempted'],
        ['Frame drops around visibility changes', 'GPU occlusion corrections shipped', 'A reproducible scene, rather than a promised FPS gain'],
      ] } },
      s('healing', 'Faster use does not establish a healing amount', [
        'The fish change describes an input and a relative speed improvement. It does not publish HP per use, cooldown, range or a controller binding map. If you changed the controls, check the configured action instead of treating the original mouse instruction as a requirement to reset every setting.',
        'Confirm the result using the game’s health feedback and distinguish an attempted action from a completed heal. For current equipment details, use the Healing Fish page. This patch record does not turn an achievement total into the healing value of a single item.',
      ]),
      s('retest', 'Retest the narrow sequence safely', [
        'For a reconnect report, note whether you left before, during or after the loading screen and whether you were hosting. Preserve existing progress. The announcement records one correction; it does not promise that every disconnection is lossless or that an unrelated lobby-search error has the same cause.',
        'For carrying, separate a grip problem from a collision problem. A piano may respond to a grab while still failing to fit through the route you chose. Later September carrying changes also matter, so use the current hauling guide for a run plan and retain this page as the dated evidence record.',
      ]),
    ], [['/items/healing-fish', 'Healing Fish'], ['/save-and-reconnect', 'Current saves and reconnect'], ['/guides/hauling', 'Current carrying rules']]),
  p('/updates/changes/slot-machine-dice-refund',
    'Slot Machine Dice Refund: Silver and Gold Outcomes',
    'The September 10 update introduced a dice refund for a lost slot-machine bet: silver maps to a $1 die and gold to a $3 die. This lookup explains the loss result, not winning odds or a profitable betting strategy.',
    ['S23'], [
      { ...s('lookup', 'Loss-result lookup', [
        'First establish that you are looking at the result of a lost bet. The announced refund is a die, so do not confuse the object produced with an immediate guarantee about the value of a whole run. The table below is deliberately limited to the two outcomes named in the patch.',
      ]), table: { headers: ['Confirmed event', 'Coin named by the patch', 'Refund object'], rows: [
        ['Lost bet', 'Silver', '$1 die'],
        ['Lost bet', 'Gold', '$3 die'],
        ['Win or another outcome', 'Not specified here', 'No result inferred from the loss rule'],
      ] } },
      s('meaning', 'A refund rule is not an expected-return calculation', [
        'A calculation of average profit would also need the probabilities of different outcomes and the full cost and reward rules. Those inputs are not supplied by this change note. The larger gold refund alone therefore does not establish that gold bets are better value or that repeated play is a reliable quota strategy.',
        'Keep the refund lookup separate from a budget plan. Use the money and items visibly available in the current session rather than counting an unplayed outcome as secured value. If you use the Quota Planner, enter known values; the planner does not predict slot-machine results.',
      ]),
      s('check', 'If the observed result differs', [
        'Record the coin used, the visible outcome and the object produced. This provides a more useful comparison with the dated announcement than a report saying only that the machine paid less than expected. Include the game version because a later update could change this rule.',
        'This page owns the narrow loss-to-refund lookup. The full September 10 digest covers the wider update, and the store guide covers stock and prices. Neither a shop-price change nor an item rarity label should be silently substituted for a missing slot-machine probability.',
      ]),
    ], [['/updates/statues-head-crab-major-update', 'September 10 update'], ['/store', 'Store context'], ['/tools/quota-planner', 'Plan known quota values']]),
  p('/items/cauldron',
    'Cauldron Guide: Holding, Tutorial Markers and Mimic States',
    'Cauldron notes describe three different contexts: a held object, a tutorial marker and Mimic headwear. Use the state table to find the relevant rule; the notes do not establish armor, capacity, price or a universal application key.',
    ['S20', 'S24', 'S25', 'S28'], [
      { ...s('states', 'Identify the cauldron state before choosing an explanation', [
        'The word cauldron appears in several patch contexts. A rule about the player holding an object is not automatically a rule about an enemy wearing it. Likewise, a disappearing tutorial marker is a navigation change, not evidence that the object itself despawned or became unusable.',
      ]), table: { headers: ['Context', 'Dated evidence', 'Do not infer'], rows: [
        ['Held by a player', 'September 1 blocks additional grabs in this held-object state', 'A numeric weight or inventory-capacity limit'],
        ['Tutorial, before pickup', 'September 14 adds a yellow marker on the first two levels', 'A universal marker on every level'],
        ['Tutorial, after pickup/departure', 'Pickup removes the marker; September 18 corrects its departure/level-3 display', 'That the cauldron was destroyed'],
        ['Worn or attached to a Mimic', 'September 25 corrects attack motion, dropping, placement and attachment teleport', 'Damage reduction or a guaranteed combat counter'],
      ] } },
      s('handling', 'Check what is already being held', [
        'When an additional grab fails, identify your present holding state before assuming that the next object is too heavy. Put the situation into the broader carrying context: doors, carts and other named held objects also have restrictions. This is a way to narrow a report, not a tested sequence for bypassing the restriction.',
        'For a tutorial-marker issue, describe the level label and whether anyone already picked up the object. Those details distinguish the documented visibility rules from a missing marker before any interaction. They also prevent a screenshot taken after pickup from being misread as proof that the marker never existed.',
      ]),
      s('mimic', 'Keep Mimic observations separate from combat advice', [
        'The newest correction concerns the behavior of a cauldron when worn by or attached to Mimic. A corrected animation or attachment position does not by itself show that equipping the creature makes it safe. The official note supplies no armor value, immunity rule or guaranteed escape tactic.',
        'If the interaction still breaks, record whether the object was being attached, worn during an attack or dropped. Keep nearby movement and host/client context in the report. For identifying Mimic, use its monster page rather than treating any treasure-shaped or cauldron-related enemy as the same creature.',
      ]),
    ], [['/guides/hauling', 'Holding restrictions'], ['/tutorial', 'Tutorial'], ['/monsters/mimic', 'Mimic identification'], [september25Route, 'September 25 changes']]),
  p('/guides/returning-player-guide',
    'Returning Player Guide: Check Old Assumptions Before a Run',
    'Returning after August or early September? Recheck the selected level, target, shop budget, hauling controls and monster identity before reusing an old plan. This migration checklist links each old assumption to a concrete current check.',
    ['S20', 'S23', 'S25', 'S28'], [
      { ...s('migration', 'Old assumption → current check', [
        'Start with the row that matches when you last played or the guide you were following. You do not need to relearn everything at once. The purpose of this checklist is to expose a changed assumption before it affects a run, then send you to the relevant detailed guide.',
      ]), table: { headers: ['Old assumption', 'Why to revisit it', 'Before committing'], rows: [
        ['My remembered chapter label fixes the route', 'September changed progression, and later chapter wording is not fully reconciled', 'Read the present selector and objective'],
        ['An August shopping budget is enough', 'Later updates changed stock ordering and prices', 'Inspect today’s stock and available balance'],
        ['A mixed pile follows any grabbed item', 'September 1 made the heaviest item determine pile movement', 'Identify the heavy object and test the exit path'],
        ['Standing on the crystal permits flight', 'September 18 removed that behavior', 'Choose a normal route; do not plan around the removed exploit'],
        ['Head Crab must look like a spider', 'September 10 rebuilt it as a jellyfish', 'Use behavior and the current model, not an old screenshot'],
      ] } },
      s('first-run', 'A short pre-run handover for your crew', [
        'Agree on who is hosting, read the selected level aloud and compare the objective each player sees. Then check the planned purchase against actual stock. This is a coordination workflow, not a newly discovered game mechanic. It is useful precisely because it does not assume that everyone remembers the same build.',
        'Choose an initial hauling plan from the objects present and identify a return route before piling up valuable cargo. When a mechanic looks different, change one assumption at a time. Do not reset saves or apply unrelated network workarounds just to reproduce an older video.',
      ], ['Confirm the current selector and target.', 'Check stock and balance before buying.', 'Separate secured value from carried cargo.', 'Tell the crew which outdated trick or identification you are discarding.']),
      s('uncertainty', 'Where the notes do not settle the question', [
        chapterWordingCaution,
        'Treat a dated fix as a starting point for verification. If a current session still disagrees with the announcement, record the exact state rather than insisting the older guide must be right. The linked system pages retain the dates and limits; this checklist does not replace them with a fabricated complete progression or enemy-spawn chart.',
      ]),
    ], [['/progression', 'Progression evidence'], ['/guides/hauling', 'Hauling'], ['/monsters', 'Current monster identification'], [september25Route, 'Newest dated update']]),
  p('/platform/language-support',
    'Language Support: Steam Interface Language Matrix',
    'Steam lists 20 supported interface languages for Last Pirates: Die Together. The table distinguishes those interface checks from the unmarked Full Audio and Subtitles columns; it does not promise a dubbed soundtrack.',
    ['S01'], [
      { ...s('matrix', 'The language markings shown on Steam', [
        'Use this matrix to check the exact variant listed before choosing a language for your interface. Separate rows matter: a general language name does not necessarily mean every regional variant is listed. These are storefront support markings reviewed September 26, not an in-game translation-quality test.',
      ]), table: { headers: ['Language as listed', 'Interface', 'Full Audio', 'Subtitles'], rows: supportedInterfaceLanguages.map((language) => [language, 'Listed', 'Unmarked', 'Unmarked']) } },
      s('variants', 'Check the variant, not just the language family', [
        'The listing separates Simplified and Traditional Chinese, Spain and Latin American Spanish, and specifically names Brazilian Portuguese. Match the listed variant to the interface you need. Do not collapse those labels into a promise about an unlisted locale or assume that two variants have identical wording.',
        'An interface check addresses the interface-support column. It is not a measurement of text accuracy, font legibility at every display size, or the availability of translated player-created messages. If one particular label is wrong or difficult to read, include the selected language and a screenshot in a report.',
      ]),
      s('audio', 'What the unmarked columns do and do not say', [
        'Full Audio and Subtitles were unmarked across the visible table. Preserve that limited observation: an unmarked dubbing column is not proof that the game has no sound, and an unmarked subtitles column does not establish how every piece of in-game text behaves.',
        'Player voice chat is another system entirely. If you are trying to communicate with teammates, use the voice-chat guide rather than treating the storefront language matrix as a microphone or speech-translation setting. For controls and Steam Deck context, follow the linked platform guides; no unsupported menu path is invented here.',
      ]),
    ], [['/system-requirements', 'Platform requirements'], ['/steam-deck', 'Steam Deck'], ['/voice-chat', 'Player voice chat']]),
];

export const qualifiedBatchPages = draftPages.map((page): GuidePageData => ({
  ...page, checkedAt: BATCH_REVIEW_DATE, lastModified: BATCH_REVIEW_DATE,
  evidenceScope: page.route.startsWith('/updates/') ? 'historical' : 'current',
  eyebrow: page.route.startsWith('/updates/') ? 'Dated patch evidence' : 'Evidence-backed field guide',
  buildContext: 'Official source review · September 26, 2026 · observations and advice are distinguished',
  topics: [page.route.split('/').at(-1)!.replaceAll('-', ' '), ...(page.route.includes('language') ? supportedInterfaceLanguages : [])],
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: page.route.startsWith('/platform/') ? 'Platform requirements' : page.route.startsWith('/items/') ? 'Items' : page.route.startsWith('/guides/') ? 'Guides' : 'Updates',
      href: page.route.startsWith('/platform/') ? '/system-requirements' : page.route.startsWith('/items/') ? '/items-and-weapons' : page.route.startsWith('/guides/') ? '/guides' : '/updates' },
    { label: page.h1 },
  ],
}));
export const qualifiedBatchRoutes = qualifiedBatchPages.map((page) => page.route);
