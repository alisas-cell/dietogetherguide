import { achievements } from '../data/achievements';
import { loot } from '../data/loot';
import { section as s, wikiPage as p } from './wiki-factory';

export const septemberSystems = [
  p(
    '/progression',
    'Last Pirates Progression — Locations, Chapters and Unlocks',
    'Progression now links location order, chapter completion, level-specific enemies, quota and store unlocks. The September 10 rebuild replaced the old run sequence; September 14 corrected its quota and store problems.',
    ['S23', 'S24', 'S25'],
    [
      s('order', 'The current progression structure', [
        'Mansion, Ship and Castle alternate in the revised campaign. The official fixed milestones are Ship at level 2 and Castle at level 4. Do not extend those two milestones into a guessed repeating 15-level table.',
        'September 10 described the first four chapters as one level each and later chapters as two. September 25 uses different chapter wording; use the current selector rather than treating the earlier structure as a complete current table.',
      ]),
      s('systems', 'What advances with your run', [
        'Each level has its own enemy set and the boss is chosen for that level. Equipment unlocks and expensive loot were also reordered. That makes the level you select more useful than an old universal enemy or shop list.',
        'September 14 corrected the earlier quota curve. September 25 then introduced an early-solo exception, so a lower target alone is not proof of a bug. Record the actual target and selected chapter before comparing sessions. Store cards disappearing after unlocking are a separate issue.',
      ]),
      s(
        'checkpoint',
        'Before choosing the next chapter',
        [
          'Record the displayed level, chapter, target and shop offers. Spend from the prices on that screen, then agree on a hauling route with the crew.',
        ],
        [
          'Confirm the current lobby preview.',
          'Check whether the next chapter is a single level or two.',
          'Keep return capacity for the next quota rather than buying from an August shopping list.',
        ],
      ),
    ],
    [
      ['/guides/progression', 'Progression walkthrough'],
      ['/levels', 'Levels'],
      ['/chapters', 'Chapters'],
      ['/quota', 'Quota'],
      ['/store', 'Store'],
      ['/loot/progression', 'Loot progression'],
      ['/tools/progression-tracker', 'Progression Tracker'],
    ],
  ),
  p(
    '/levels',
    'Last Pirates Levels — Current Order and Level Context',
    'September 18 mentions 15 levels. Ship first appears at level 2 and Castle at level 4 under the September progression order; the complete location, enemy and boss table is not published.',
    ['S23', 'S24', 'S25'],
    [
      {
        id: 'known-levels',
        heading: 'Verified level milestones',
        paragraphs: [
          'Treat these as confirmed checkpoints, not a complete walkthrough of all fifteen levels.',
        ],
        table: {
          headers: ['Level/context', 'Current evidence'],
          rows: [
            [
              'Opening sequence',
              'Mansion begins the revised location sequence.',
            ],
            ['Level 2', 'First Ship appearance.'],
            ['Level 4', 'First Castle appearance.'],
            [
              'Levels 3, 4 and 8',
              'Additional valid loot spawn positions added September 14.',
            ],
            [
              'Across 15 levels',
              '70 additional spawn points added September 18.',
            ],
          ],
        },
      },
      s('level-v-day', 'Level, chapter and location day are different labels', [
        'A chapter is a selectable progress unit. A level is a playable step inside it. A location day is the wording used in several location-specific notes, including the Ship cart change. Do not assume “Ship day two” means overall level 2.',
        'When reporting a bug, capture all labels visible in your lobby or run. This makes a lost cart or missing spawn report much more useful than only saying “second map”.',
      ]),
      s('enemy-pools', 'Enemy and boss context', [
        'September 10 replaced a general boss pool with level-specific selection and assigned enemy sets per level. The known creature roster does not prove that every named monster can appear on every level. Use the current preview and your observations together.',
      ]),
    ],
    [
      ['/guides/level-order', 'Choosing the next level'],
      ['/chapters', 'Chapters'],
      ['/maps', 'Maps'],
      ['/monsters/bosses', 'Boss context'],
      ['/tools/progression-tracker', 'Track a level'],
    ],
  ),
  p(
    '/chapters',
    'Last Pirates Chapters — Single-Level and Two-Level Progress',
    'Record chapter and level separately. September 10 described one-level early chapters and two-level later chapters; September 25 uses different Chapter 1 wording. The public notes do not reconcile those labels into a complete current table.',
    ['S23', 'S16', 'S25'],
    [
      s('chapter-length', 'How the new chapter grouping works', [
        'The September 10 structure changed pacing and put chapter selection on one page. Treat that as the dated major-update description, not a guarantee that every later selector label maps identically. September 25 also changed chapter-page navigation.',
        'The older daily/chapter save announcement explains save checkpoints, but it does not provide a save-file schema or guarantee recovery from every network failure.',
      ]),
      s('record', 'What to record between attempts', [
        'Write down the current chapter, the displayed level and the location. Keep “chapter unlocked” separate from “both levels completed” when a chapter contains two. A note is especially useful if different crew members remember different endpoints.',
      ]),
      s('resume', 'When resuming with a crew', [
        'Agree which current host and chapter you are entering before using an invite. The September lobby preview can show the intended selection. If the recovered state differs, record it and use the reconnect checklist before starting over.',
        'The local trackers on this site do not read Steam Cloud or game saves. They preserve your own notes and completion boxes only.',
      ]),
    ],
    [
      ['/progression', 'Progression hub'],
      ['/save-and-reconnect', 'Save and reconnect'],
      ['/tools/run-chapter-tracker', 'Run notebook'],
      ['/tools/progression-tracker', 'Progression Tracker'],
      ['/achievements', 'Chapter achievements'],
    ],
  ),
  p(
    '/quota',
    'Last Pirates Quota — Payout Targets and Current Progression',
    'Quota is the value target for a run. September 10 smoothed targets around the new location order, and September 14 corrected cases where the next level asked for less. Use the target shown in your current run.',
    ['S23', 'S24', 'S16'],
    [
      s('target', 'Read the current target first', [
        'The September changes invalidate a fixed August quota table. Solo and team tuning were already separated in August, so a number from another crew size may not describe your run either. The announcements do not give a complete replacement table.',
        'A target displayed by your current game is more useful for planning than extrapolating a percentage increase from one level. Keep target value and delivered value distinct; carried loot can still be lost or damaged.',
      ]),
      s('changes', 'Why an old target can be wrong', [
        'The new location order and payout curve shipped together September 10. September 14 fixed a backwards step, but September 25 adds an early-solo exception. No complete replacement formula or reconciled chapter table is published.',
        'More valid loot positions on levels 3, 4 and 8 improved availability. The later 70-spawn expansion increased search opportunities; neither note promises a particular item value on every attempt.',
      ]),
      s(
        'planning',
        'Plan a return before the target looks close',
        [
          'Add only known delivered value to your secured total. Keep carried value and uncollected estimates visible as risk. For a crew, a per-player share is a coordination aid rather than a game rule.',
        ],
        [
          'Enter your actual target in the planner.',
          'Count secured and carried value separately.',
          'Recheck damaged or missing cargo before committing to another room.',
        ],
      ),
    ],
    [
      ['/tools/quota-planner', 'Quota Planner'],
      ['/guides/quota', 'Meeting the target'],
      ['/progression', 'Progression'],
      ['/loot', 'Loot'],
      ['/solo-guide', 'Solo planning'],
      ['/store', 'Store'],
    ],
    [
      {
        question: 'Is there a verified quota formula?',
        answer:
          'No complete current formula is published in the reviewed announcements. Use the value displayed in your run.',
      },
    ],
  ),
  p(
    '/store',
    'Last Pirates Store — Unlocks, Categories and Removed Items',
    'September reordered store unlocks and rebuilt prices around the new progression. Unlocked cards should no longer disappear between levels. Water Pistol was removed from the store; current offers and prices must be read in game.',
    ['S23', 'S24', 'S25', 'S16', 'S17'],
    [
      s('unlocks', 'Unlocks follow the new progression', [
        'September 10 reordered unlocks alongside the new level sequence. September 14 fixed cards disappearing after unlocking and prices jumping between levels. This does not establish a public item-by-level price chart.',
        'Solo and team stores have separate balance history. Rupor was removed from the solo store in August; this is narrower than saying the item was removed from every mode. Water Pistol was explicitly removed from the store in September.',
      ]),
      s('cards', 'Read the current cards', [
        'Category icons were added to cards and cart upgrades now have their own category. Weapons and tools show a use counter. Check the specific offer and remaining uses instead of assuming every tool is permanent.',
        'September 18 fixed card selection. If the displayed selection and purchased item diverge on the updated build, capture the card and level before another purchase.',
      ]),
      s('budget', 'Buy for the next task', [
        'Use the next level preview to decide whether transport, protection or a weapon solves the immediate problem. Old Monkey Cart and Golden Weapon unlock references are dated history, not a current shopping list.',
        'No exact Golden Sword damage, Golden Hand Cannon ammunition, or revised Monkey Cart price is supplied by these September notes. The wiki leaves those fields unknown.',
      ]),
    ],
    [
      ['/guides/store-unlocks', 'Store checklist'],
      ['/items-and-weapons', 'Item registry'],
      ['/weapons', 'Weapons'],
      ['/tools-and-utility', 'Utility equipment'],
      ['/golden-weapons', 'Golden Weapons'],
      ['/monkey-cart', 'Cart and Porter'],
      ['/quota', 'Quota'],
    ],
  ),
  p(
    '/loot',
    'Last Pirates Loot — Current Pools, Value and Carrying',
    'Loot availability now depends on progression, revised location pools and expanded spawn points. September added more valid positions, delayed expensive items through unlock progression and changed weights, sizes and prices.',
    ['S19', 'S20', 'S23', 'S24', 'S25'],
    [
      s('where', 'What changed in the search', [
        'Ship and Castle pools changed September 1. The major update staggered expensive loot unlocks and stopped medium items appearing on shelves. September 14 added valid positions on levels 3, 4 and 8; September 18 added 70 across 15 levels.',
        'These are spawn-position and pool changes, not a guarantee of 70 extra objects in every run. Search furniture and floor space, then compare with the level you actually selected.',
      ]),
      {
        id: 'records',
        heading: 'Source-checked loot records',
        paragraphs: [
          'Unknown numeric fields are left blank in the data and shown as unpublished here.',
        ],
        table: {
          headers: ['Loot', 'Current note', 'Value'],
          rows: loot.map((item) => [
            item.name,
            item.notes,
            item.value === null ? 'Unpublished' : String(item.value),
          ]),
        },
      },
      s('carry', 'Secure value instead of only finding it', [
        'Large objects became heavier September 10. Carrying several objects now follows the heaviest one, so a larger pile does not mean a faster return. Fragile and composite objects need a clear route and room for handling.',
        'The Cover is a new protective option for fragile cargo. Its precise durability is not published; do not treat it as proof that every fall is harmless.',
      ]),
    ],
    [
      ['/loot/progression', 'Loot unlock progression'],
      ['/loot/rare', 'Rare loot'],
      ['/loot/large-items', 'Large items'],
      ['/loot-and-extraction', 'Extraction guide'],
      ['/guides/fragile-loot', 'Protect fragile loot'],
      ['/tools/quota-planner', 'Quota Planner'],
    ],
  ),
  p(
    '/loot/progression',
    'Last Pirates Loot Progression — Expensive Items and Spawn Pools',
    'Expensive loot now unlocks gradually through progression. A low-value early pool is not necessarily a missing-loot bug; location pools, unlock timing and valid spawn positions all influence what you can find.',
    ['S19', 'S20', 'S23', 'S24', 'S25'],
    [
      s('three-layers', 'Separate pool, unlock and spawn position', [
        'A pool defines eligible objects. Progression determines when expensive pieces enter that pool. A valid spawn position determines whether an eligible piece can physically appear. September changed all three layers at different times.',
        'The September 14 fix is a useful example: levels 3, 4 and 8 had fewer valid spots than their pools required, so some objects never appeared. Adding positions corrected that shortage without publishing a fixed route or value table.',
      ]),
      s('expensive', 'Expensive does not mean universally available', [
        'The September 10 note says valuable pieces arrive progressively rather than all at once. Swordfish received a price correction, but the actual number and unlock level were not given. Keep discovery notes tied to your level rather than promoting a single sighting to a universal rule.',
      ]),
      s('compare', 'Compare runs fairly', [
        'Compare the same location, level and crew size where possible. Record whether an object was damaged and whether it came from a container. September also changed how loot inherits container rotation, which can alter how a familiar object lies on the floor.',
      ]),
    ],
    [
      ['/loot', 'Loot registry'],
      ['/progression', 'Progression'],
      ['/levels', 'Level context'],
      ['/loot/rare', 'Rare loot'],
      ['/tools/progression-tracker', 'Record unlock observations'],
    ],
  ),
  p(
    '/loot/rare',
    'Last Pirates Rare Loot — Availability and Evidence',
    'Rare and expensive loot received spawn variation in August and staged unlock progression in September. The official notes do not publish drop rates, guaranteed routes or a current rare-item value table.',
    ['S19', 'S23', 'S24', 'S25'],
    [
      s('availability', 'Why one run does not establish a drop rate', [
        'August 28 introduced more variation in expensive and rare spawns. September 10 then spread expensive pieces across progression. An empty room may reflect eligible-pool differences, placement variation or your current unlock stage.',
        'Do not use a Demo chest route as proof of current rare loot. The September Mansion chest correction prevents objects that are too large for the container; it does not guarantee a rare replacement.',
      ]),
      s('record', 'What makes a useful rare-loot note', [
        'Record the displayed name, location, level, container and undamaged value. A screenshot of those details is stronger than remembering the color alone: Golden items were made brighter September 1, but brightness is not a published rarity tier.',
      ]),
      s('decision', 'Deciding whether another room is worth it', [
        'When the target is nearly met, compare the risk of searching with the secured value already at the boat. Rare loot is optional evidence, not a reason to abandon a workable return plan. Use an estimate in the quota planner and keep it labeled as uncollected.',
      ]),
    ],
    [
      ['/loot/progression', 'Unlock context'],
      ['/loot', 'Loot records'],
      ['/guides/quota', 'Return decisions'],
      ['/tools/quota-planner', 'Estimate a run'],
    ],
  ),
  p(
    '/loot/large-items',
    'Last Pirates Large Items — Weight, Multi-Grab and Transport',
    'Large loot became heavier in the September major update. Multi-grab follows the heaviest held object, and holding transport or another player prevents extra grabs. Plan large cargo around the current level and return route.',
    ['S20', 'S23', 'S25'],
    [
      s('weight', 'The latest weight change supersedes August', [
        'The August reduction of roughly 26% is historical. September 10 says large items became heavier again and many items changed size or value. Neither a current mass table nor a new percentage was supplied. The violin moved in the opposite direction and became lighter.',
      ]),
      s('hands', 'What multi-grab now allows', [
        'September 1 grouped held objects so they move with the heaviest item. While holding the cart, cauldron, a door, booty or a player hand, you cannot add more objects on top. Strong Arms no longer affects doors, dresser doors or chest lids.',
      ]),
      s('transport', 'Check the transport before moving a heavy object', [
        'Ship has no cart from its second location day onward under the September 10 change. Elevators now have call levers and no brake levers; September 18 corrected cart cargo and player interactions on lifts.',
        'First clear the route, then move the cargo. If an item spawns under the Ship floor on the updated client, record the level and object rather than relying on an old clipping workaround.',
      ]),
    ],
    [
      ['/guides/hauling', 'Hauling route'],
      ['/guides/elevators', 'Elevator guide'],
      ['/maps/ship', 'Ship'],
      ['/monkey-cart', 'Cart'],
      ['/guides/strong-arms-big-palms', 'Carry upgrades'],
      ['/loot', 'Loot'],
    ],
  ),
  p(
    '/achievements',
    'Last Pirates Achievements — All 20 Steam Records',
    'Steam lists 20 achievements added with the September major update. Eighteen have public condition text; Rich Deadman and On the top currently show no description on the public page.',
    ['S23', 'S26'],
    [
      {
        id: 'list',
        heading: 'The 20 public achievements',
        paragraphs: [
          'Conditions below are paraphrased from Steam. A blank description is not permission to guess a hidden requirement. Hidden flags and most mode requirements are not exposed on the public page.',
        ],
        table: {
          headers: ['Achievement', 'Published condition'],
          rows: achievements.map((a) => [
            a.name,
            a.condition ?? 'Condition unavailable on the public Steam page',
          ]),
        },
      },
      s('route', 'A practical tracking route', [
        'Start with tutorial and first-day progress, then track delivery and support objectives while playing normally. For Fishy doctor, the 500 HP is cumulative healing to allies. It is not a per-use fish heal value.',
        'For the full-bestiary objective, Steam mentions six enemies without naming that set. Do not equate it to this wiki’s entire monster list. Head Man in another achievement is also not automatically Head Crab.',
      ]),
      s('proof', 'Keep the tracker separate from Steam completion', [
        'Use the local Progression Tracker for your own checklist, then verify actual unlocks in Steam. The site does not connect to your account or read achievement state. Unknown hidden conditions remain unknown until a public source or verified observation supplies them.',
      ]),
    ],
    [
      ['/tutorial', 'Tutorial'],
      ['/chapters', 'Chapter completion'],
      ['/items/healing-fish', 'Healing Fish'],
      ['/guides/fragile-loot', 'Intact deliveries'],
      ['/monsters', 'Monster registry'],
      ['/tools/progression-tracker', 'Achievement checklist'],
    ],
  ),
  p(
    '/steam-deck',
    'Last Pirates on Steam Deck — Verified Status and Controls',
    'Last Pirates: Die Together was officially announced Steam Deck Verified on September 9. The developer confirms mapped controls and readable text; this wiki has not measured a guaranteed FPS or battery-life target.',
    ['S22', 'S19', 'S23', 'S01'],
    [
      s('verified', 'What the announcement establishes', [
        'The developer describes an install-and-play experience with functioning controls, readable text and suitable performance without required manual tuning. Earlier Deck keyboard and navigation problems were addressed before verification.',
        'Verified does not specify a frame-rate number for every level, crew or particle-heavy scene. It also does not guarantee a future patch cannot introduce a regression.',
      ]),
      s('controls', 'Controls and text on the current build', [
        'Begin with the supplied game configuration and the prompts currently on screen. If you previously installed a community mapping, compare against the default before treating conflicting buttons as a game defect.',
        'Check text at the resolution you actually use. For microphone problems, confirm the selected device and voice activation mode with one teammate before changing several input settings at once.',
      ]),
      s('performance', 'Loading improvements and remaining caveats', [
        'August 28 addressed GPU occlusion frame drops and Deck navigation. September 3 shortened startup. September 10 reports 3–4 times faster loading and fixes coin-spawn frame drops. These are developer claims, not a benchmark from this site.',
        'Use one controlled settings change at a time and note the level, docked/handheld state and scene. No custom Proton version, launch flag or numeric preset is recommended here without testing.',
      ]),
    ],
    [
      ['/performance', 'Performance checks'],
      ['/troubleshooting', 'Troubleshooting'],
      ['/guides/controls', 'Controls'],
      ['/voice-chat', 'Voice modes'],
      ['/tools/coop-troubleshooter', 'Input troubleshooting'],
    ],
  ),
  p(
    '/tutorial',
    'Last Pirates Tutorial — Current Hints, Cauldron and Fixes',
    'The September 14 patch fixed the tutorial’s endless loading problem. The current tutorial has text hints and first-level cauldron markers; September 18 disabled its chest jumpscare.',
    ['S23', 'S24', 'S25'],
    [
      s('start', 'Start with the current tutorial prompts', [
        'Finish Steam updates before opening the tutorial. A loading failure from the affected build should not be treated as an intended gate. If it still hangs, record where loading stops and use the loading checklist.',
        'September 10 added written hints for each step. Follow the current instruction on screen rather than recreating a Demo video sequence. The official notes do not publish a complete input-by-input script.',
      ]),
      s('marker', 'Understanding the yellow cauldron marker', [
        'The marker points to the cauldron on the first two levels and disappears when someone picks it up. September 18 improved its departure effect and removed it from level 3. Its absence there is not evidence that a quest is broken.',
      ]),
      s('first-run', 'Move from learning controls to completing a run', [
        'Use the tutorial to understand the prompted interactions and read the current tool/use indicators. Then use the Beginner Guide to plan crew roles, quota and the return route in a full run.',
        'The Graduated achievement is tied to tutorial completion. The public Steam page does not specify a hidden alternate condition, so verify its status in Steam after completing the tutorial.',
      ]),
    ],
    [
      ['/beginner-guide', 'First successful run'],
      ['/guides/controls', 'Controls'],
      ['/quota', 'Quota'],
      ['/achievements', 'Graduated achievement'],
      ['/troubleshooting/loading', 'Tutorial loading'],
    ],
  ),
  p(
    '/lobby',
    'Last Pirates Lobby — Previews, Host Status and Codes',
    'The September 18 lobby uses section preview cards, “Waiting for host” status text and code-copy confirmation on the button. Confirm the host’s current selection and session before joining.',
    ['S25', 'S23', 'S16'],
    [
      s('preview', 'Read the selection before entering', [
        'Section cards now include previews so the crew can see what a selection leads into. The chapter screen was also regrouped after September 10. Compare location, chapter and level context before assuming you are entering the same run as a friend.',
      ]),
      s('host', 'Waiting for host is a state, not a verdict', [
        'The clearer wording describes a host-dependent step; the patch does not define a universal timeout. Ask whether the host is still in the same lobby and ready to proceed before restarting. Repeated stale status after the host acts belongs in a bug report with both players’ observations.',
      ]),
      s('code', 'Copy and join once', [
        'Copy feedback is now attached to the code button rather than shown in a window over the text. Read a fresh code from the active lobby if the host recreated the session. A copied confirmation does not prove the network join succeeded.',
        'Quick Join searches public sessions; a direct code or Steam invite is the better comparison for one specific host. Check versions and Steam online state before repeated attempts.',
      ]),
    ],
    [
      ['/coop', 'Co-op'],
      ['/coop/quick-join', 'Quick Join'],
      ['/coop/no-game-found', 'No Game Found'],
      ['/host-migration', 'Host migration'],
      ['/tools/coop-troubleshooter', 'Lobby troubleshooter'],
    ],
  ),
  p(
    '/voice-chat',
    'Last Pirates Voice Chat — Always Active, Push and Toggle',
    'The official voice modes are Always active, Push to talk and Toggle to talk. Choose the mode deliberately, check the current binding and selected microphone, then test with one teammate.',
    ['S17', 'S15', 'S22'],
    [
      {
        id: 'modes',
        heading: 'Choose an activation mode',
        paragraphs: [
          'Read the binding shown by the current client; no universal keyboard or Deck button is assumed here.',
        ],
        table: {
          headers: ['Mode', 'What it means for a test'],
          rows: [
            [
              'Always active',
              'Speak normally; check that the intended microphone is selected.',
            ],
            [
              'Push to talk',
              'Hold the configured activation control while speaking.',
            ],
            [
              'Toggle to talk',
              'Switch transmission on and off with the configured control.',
            ],
          ],
        },
      },
      s('isolate', 'Isolate one problem at a time', [
        'First check that the operating system sees input from the intended microphone. Then compare the game’s selected device and activation mode. Test a short sentence with one crew member before changing noise suppression or replacing a mapping.',
        'Use headphones if speaker feedback confuses the test. Share only the device/mode/error details needed for support; recording a private conversation is unnecessary.',
      ]),
      s('history', 'Known official changes', [
        'August notes added noise suppression and addressed open-deck voice behavior. Steam Deck keyboard/navigation fixes and Verified status arrived later. A correct Deck control layout does not by itself prove the microphone is the selected audio source.',
      ]),
    ],
    [
      ['/coop', 'Co-op'],
      ['/steam-deck', 'Steam Deck'],
      ['/guides/controls', 'Controls'],
      ['/tools/coop-troubleshooter', 'Voice troubleshooting'],
    ],
  ),
  p(
    '/host-migration',
    'Last Pirates Host Migration — Recovery and Grab Fixes',
    'September 10 addressed players getting stuck after host migration. September 18 made Anchor and Crab release captured players during migration, preventing the reported permanent ragdoll state.',
    ['S23', 'S25', 'S19', 'S16'],
    [
      s('wait', 'Let the current session resolve first', [
        'Host departure is different from failing to discover a lobby. Allow the current migration or reconnect state to finish before several crew members create replacement sessions. The patch notes do not promise a fixed recovery duration or successful restoration in every case.',
      ]),
      s('grabs', 'If a creature was holding someone', [
        'Record the creature and the captured player’s state before and after migration. Anchor and Crab have a specific release fix in September 18; this is not proof that Head Crab shares the same mechanic.',
        'If the updated client remains ragdolled, include the location, level, old host/new host roles and whether the creature released visually. That distinguishes a repeated migration bug from an ordinary downed state.',
      ]),
      s('progress', 'Protect progress while comparing outcomes', [
        'Compare the chapter and level visible after recovery with your pre-disconnect notes. Use the in-game reconnect path if offered. If the session cannot continue, agree on one replacement host and confirm the selected chapter before rejoining. Do not delete saves to diagnose a session-state mismatch.',
      ]),
    ],
    [
      ['/save-and-reconnect', 'Save and reconnect'],
      ['/revive-guide', 'Revive'],
      ['/monsters/anchorer', 'Anchorer'],
      ['/monsters/crab', 'Crab'],
      ['/tools/coop-troubleshooter', 'Recovery checks'],
    ],
  ),
  p(
    '/weapons',
    'Last Pirates Weapons — Current Equipment and Store Changes',
    'Golden weapons remain part of the current equipment history, and September added Boomerang while removing Water Pistol from the store. Read current use counters and prices before choosing a weapon.',
    ['S17', 'S23', 'S24', 'S26'],
    [
      s('selection', 'Choose for the next encounter', [
        'The September level system gives each level its own enemy set and boss context. That makes a universal tier list less useful without verified damage, cost and availability. Check the next preview and your actual store offers first.',
      ]),
      s('known', 'What is directly supported', [
        'Boomerang can hit outbound and returning, and may strike the thrower. Throwing Knives received collision and stuck-throw fixes. Golden Sword and Golden Hand Cannon were introduced in August; September shop changes mean their old unlock references should not be treated as permanent.',
        'The public achievement page supports Cannon kills and two enemy kills with one Bomb. It does not supply a current radius, ammunition count or guaranteed one-shot boss strategy.',
      ]),
      s('removed', 'Water Pistol is a removed store offer', [
        'The September major update explicitly removed Water Pistol from the store. Preserve that fact when reading old guides describing a one-purchase limit. The notes do not explain every possible legacy save or item-spawn case.',
      ]),
    ],
    [
      ['/golden-weapons', 'Golden Weapons'],
      ['/items/boomerang', 'Boomerang'],
      ['/store', 'Store'],
      ['/monsters', 'Enemies'],
      ['/items-and-weapons', 'Equipment registry'],
      ['/achievements', 'Combat achievements'],
    ],
  ),
  p(
    '/tools-and-utility',
    'Last Pirates Utility Equipment — Protection, Travel and Support',
    'The September utility additions are protective Cover and Teleport Crystal. Choose transport and support from current offers; exact charges, prices and unlock levels are not universally published.',
    ['S23', 'S24', 'S25', 'S19'],
    [
      s('protection', 'Protection and movement solve different problems', [
        'Cover wraps fragile cargo to reduce the chance it shatters immediately when dropped. Teleport Crystal provides an escape option but its announcement explicitly avoids promising a safe outcome. Do not treat one as a substitute for planning the return route.',
      ]),
      s('uses', 'Check uses and store categories', [
        'Weapons and tools now display use counters. Cart upgrades have their own category, and September 14 corrected unlock persistence and prices. Read the current card and selected item before assuming an effect can be reused indefinitely.',
      ]),
      s('support', 'Support equipment still needs context', [
        'Fish healing is faster on right click after August 28. Instruments, transport and carry effects each have separate patch histories. Rum and Booty effects are not interchangeable systems, and unpublished magnitudes should not be inserted into a planner.',
      ]),
    ],
    [
      ['/items/cover', 'Cover'],
      ['/items/teleport-crystal', 'Teleport Crystal'],
      ['/items/healing-fish', 'Healing Fish'],
      ['/monkey-cart', 'Cart and Porter'],
      ['/items/instruments', 'Instruments'],
      ['/rum-buffs-and-perks', 'Effects'],
      ['/store', 'Store'],
    ],
  ),
];
