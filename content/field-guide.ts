import type { GuidePageData } from './types';
import { related } from './types';

export const fieldGuidePages = [
  {
    route: '/monsters',
    title: 'Last Pirates: Die Together Monsters — Enemy Guide',
    h1: 'Last Pirates: Die Together Monsters',
    description:
      'A source-checked Last Pirates: Die Together monster hub with current Early Access threats, official behavior notes, and a separate Demo archive.',
    eyebrow: 'Threat ledger',
    directAnswer: [
      'The official Early Access launch announcement identifies Ear, Anchorer, Snake, Crab, Parrot, Sleeper, Mimic, and rats, including a rat king. It gives broad behavior for each, but does not call this a complete roster.',
      'Exact health, damage, spawn rates, full location placement, and reliable combat statistics remain unpublished because the current evidence does not support them.',
    ],
    buildContext: 'Early Access launch · Checked Aug 19',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Monsters' }],
    heroImage: {
      src: '/images/game/steam-page-background.jpg',
      alt: 'Official art showing the pirate crew with a monster in the shadows',
      assetId: 'steam-page-background',
    },
    sections: [
      {
        id: 'known',
        heading: 'What is confirmed in Early Access',
        paragraphs: [
          'The Aug 18 launch announcement names eight current threat records and describes how each creates pressure. Ear reacts to sound, Anchorer hides among loot, Snake responds to movement, Crab gathers treasure, Parrot imitates sounds, Sleeper wakes when disturbed, Mimic disguises itself, and rats can be led by a rat king.',
          'Those are official launch-level descriptions. They establish identity and broad behavior, not health, damage, detection distance, spawn rules, or exhaustive map placement.',
        ],
      },
      {
        id: 'nine',
        heading: 'The Demo advertised nine unique monsters',
        paragraphs: [
          'The separate Steam Demo page described nine unique monsters inside the Demo experience. This is a sourced historical quantity tied to Silent Cove, not a promise that Early Access contains exactly nine.',
          'Early Access now has its own named set in the official launch announcement. The historical quantity remains useful Demo context, but it cannot be used to declare the live roster complete.',
        ],
      },
      {
        id: 'detection',
        heading: 'How detection is described',
        paragraphs: [
          'Current evidence supports entity-specific triggers for some threats: Ear is tied to sound, Snake to movement, Sleeper to being disturbed, and Mimic to visual disguise. The launch post describes other behaviors without converting them into a single detection rule.',
          'The guide therefore does not copy “sound” or “movement” onto every card. Behavior stays attached to the entity and the source that actually describes it.',
        ],
      },
      {
        id: 'names',
        heading: 'Names confirmed at Early Access launch',
        paragraphs: [
          'The live launch set is Ear, Anchorer, Snake, Crab, Parrot, Sleeper, Mimic, and Rat. Rats are grouped as one record because the announcement discusses rats and their rat king together rather than defining separate full enemy records.',
          'Howler, Misha, Screamer, Monkey Screamer, Pirate, Shark, and Pirate Head remain in the historical registry. They are not silently carried into the current list without current evidence.',
        ],
      },
      {
        id: 'not-final',
        heading: 'Why this is not the final Early Access list',
        paragraphs: [
          'The launch announcement supplies a useful current set, but it does not say “all monsters” or give a roster total. The store also says the Early Access build is bigger than the Demo.',
          'Publishing these eight as a complete list would add a claim the source never makes. This hub labels them launch-confirmed and leaves completeness open.',
        ],
        callout: {
          type: 'build-check',
          title: 'No invented roster',
          body: 'Eight records are current and launch-confirmed; none is presented as proof of a complete roster or undocumented combat values.',
        },
      },
      {
        id: 'evidence-table',
        heading: 'Current monster evidence table',
        paragraphs: [
          'The confidence label applies to the reference, not to an undocumented set of combat statistics. Every row is intentionally limited.',
        ],
        table: {
          headers: ['Name', 'Source/build', 'Safely known', 'EA status'],
          rows: [
            ['Ear', 'Aug 18 launch announcement', 'Uses sound to find pirates', 'Launch-confirmed'],
            ['Anchorer', 'Aug 18 launch announcement', 'Hides among loot', 'Launch-confirmed'],
            ['Snake', 'Aug 18 launch announcement', 'Reacts to movement', 'Launch-confirmed'],
            ['Crab', 'Aug 18 launch announcement', 'Gathers treasure', 'Launch-confirmed'],
            ['Parrot', 'Aug 18 launch announcement', 'Imitates sounds', 'Launch-confirmed'],
            ['Sleeper', 'Aug 18 launch announcement', 'Wakes when disturbed', 'Launch-confirmed'],
            ['Mimic', 'Aug 18 launch announcement', 'Uses disguise', 'Launch-confirmed'],
            ['Rat', 'Aug 18 launch announcement', 'Group includes a rat king', 'Launch-confirmed'],
          ],
        },
      },
      {
        id: 'launch-verification',
        heading: 'What still needs direct build verification',
        paragraphs: [
          'The next evidence gate covers visual identity, location placement, repeatable triggers, threat pattern, and at least one defensible warning or counterplay note tied to a current build.',
          'A detail page appears only after enough fields are useful together. Until then, the hub is the honest place for partial evidence.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How many monsters are in Last Pirates: Die Together?',
        answer:
          'Eight current threat records are named in the official launch announcement, but the source does not say that list is complete. The Demo historically advertised nine unique monsters.',
      },
      {
        question: 'Why are there no monster health or damage values?',
        answer:
          'No current official evidence in the registry verifies those numbers for the opening Early Access build.',
      },
      {
        question: 'Do all monsters react to sound?',
        answer:
          'Official Demo copy says monsters may react to sound, movement, and player behavior, but entity-specific triggers must be verified individually.',
      },
    ],
    sourceIds: ['S01', 'S04', 'S11'],
    related: [
      related('/maps', 'Maps', 'Connect verified threats to current locations.'),
      related('/maps/silent-cove', 'Silent Cove', 'See the Demo location context.'),
      related('/beginner-guide', 'Beginner guide', 'Use safe threat-awareness habits.'),
      related('/early-access', 'Early Access', 'See the launch evidence and historical split.'),
    ],
  },
  {
    route: '/maps',
    title: 'Last Pirates: Die Together Maps — Locations & Guides',
    h1: 'Last Pirates: Die Together Maps',
    description:
      'Current Last Pirates: Die Together location status for the Early Access Ship and Castle, with Silent Cove preserved as a separate Demo record.',
    eyebrow: 'Location charts',
    directAnswer: [
      'The official Early Access launch announcement names two current locations: the Ship and the Castle. Silent Cove remains a documented Demo location, not an automatic third live-map claim.',
      'No guessed room list, landmark route, exact monster placement, or unofficial floor plan is published as fact.',
    ],
    buildContext: 'Early Access Ship + Castle · Checked Aug 19',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Maps' }],
    heroImage: {
      src: '/images/game/steam-page-background.jpg',
      alt: 'Official game art used as general location atmosphere, not a map diagram',
      assetId: 'steam-page-background',
    },
    sections: [
      {
        id: 'status',
        heading: 'Current map and location status',
        paragraphs: [
          'The source-backed registry now has Ship and Castle as current Early Access location records. Silent Cove stays separate as a Demo archive because current official evidence does not directly name it as a live location.',
          'The hub can state the current names and broad settings. It still withholds detail routes until each location has enough verified structure, landmarks, hazards, and useful guidance.',
        ],
      },
      {
        id: 'silent-cove',
        heading: 'Silent Cove in the Demo',
        paragraphs: [
          'The official Demo page places the expedition in Silent Cove, a large cursed location centered on an abandoned manor. It supported the broad arrival, exploration, hauling, threat, and extraction loop.',
          'The developer page used “11 levels” wording for the Demo location. Because level can mean different structural units, this guide preserves the wording as context instead of converting it into an invented floor or room count.',
        ],
      },
      {
        id: 'ea-map',
        heading: 'Ship and Castle in Early Access',
        paragraphs: [
          'The Aug 18 launch announcement directly names the Ship and Castle. It presents both as playable Early Access locations and frames them as distinct expedition settings.',
          'That evidence does not supply layouts, safe routes, hazard tables, or a complete monster-to-location mapping. Those fields remain unrendered instead of being inferred from promotional media.',
        ],
      },
      {
        id: 'comparison',
        heading: 'Location comparison',
        paragraphs: [
          'The table shows only what the evidence allows. “Pending” is a maintenance state, not a content teaser posing as a guide.',
        ],
        table: {
          headers: ['Location', 'Build status', 'Verified setting', 'Guide status'],
          rows: [
            ['Ship', 'Early Access live', 'Pirate ship expedition setting', 'Current hub record'],
            ['Castle', 'Early Access live', 'Castle expedition setting', 'Current hub record'],
            ['Silent Cove', 'Public Demo archive', 'Cursed location / abandoned manor', 'Demo-context guide available'],
          ],
        },
      },
      {
        id: 'guide-contract',
        heading: 'How a map earns a full guide',
        paragraphs: [
          'A reliable guide needs an overview, observed structure, defensible landmarks, current monster context, loot notes, return or extraction flow, hazards, related systems, and version notes.',
          'A promotional screenshot is not sufficient evidence for a route diagram. Maps will be drawn only from direct verified observation or permitted official material.',
        ],
      },
      {
        id: 'linking',
        heading: 'Map-specific monsters and loot',
        paragraphs: [
          'Current location records will connect to monsters only when official or repeatable build evidence places them there. Relationships come from evidence fields, not a generic related-post widget.',
          'For now, Ship and Castle link to the general monster and loot hubs. Silent Cove does the same as a clearly historical record, avoiding false placement claims in either direction.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What maps are in Last Pirates: Die Together?',
        answer:
          'Ship and Castle are named as current locations in the official Early Access launch announcement. Silent Cove is separately confirmed for the Demo.',
      },
      {
        question: 'Is Silent Cove in Early Access?',
        answer:
          'The store says Early Access is bigger than the Demo, but the current launch announcement does not directly name Silent Cove. This guide therefore keeps it labeled as Demo evidence.',
      },
    ],
    sourceIds: ['S01', 'S03', 'S04', 'S11'],
    related: [
      related('/maps/silent-cove', 'Silent Cove guide', 'Read the source-bounded Demo map guide.'),
      related('/monsters', 'Monsters', 'See the current threat evidence.'),
      related('/loot-and-extraction', 'Loot and extraction', 'Understand the loop a location supports.'),
      related('/early-access', 'Early Access', 'Review the current launch delta.'),
    ],
  },
  {
    route: '/maps/silent-cove',
    title: 'Silent Cove Map Guide — Last Pirates: Die Together',
    h1: 'Silent Cove Map Guide',
    description:
      'A careful Silent Cove guide for the Last Pirates: Die Together Demo: manor context, physics, monster pressure, extraction, and EA caveats.',
    eyebrow: 'Demo location',
    directAnswer: [
      'Silent Cove is the named location from the public Last Pirates: Die Together Demo. Official descriptions frame it as a large cursed area centered on an abandoned manor and supporting the full loot-and-extraction loop.',
      'This guide does not invent a floor plan, room sequence, safe route, or monster placement. Those details need direct observation in the relevant build.',
    ],
    buildContext: 'Demo archive · Not a live EA map claim',
    confidence: 'preview-build',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Maps', href: '/maps' },
      { label: 'Silent Cove' },
    ],
    heroImage: {
      src: '/images/game/steam-header.jpg',
      alt: 'Official Last Pirates: Die Together art; no official Silent Cove diagram is available',
      assetId: 'steam-header',
    },
    sections: [
      {
        id: 'overview',
        heading: 'Silent Cove overview',
        paragraphs: [
          'Silent Cove is the Demo expedition location documented by the official Demo listing and developer page. It provides the setting for searching an abandoned manor, manipulating objects and valuables, responding to monsters, and attempting to return with loot.',
          'The location is useful as a mechanics reference because it supported a complete run loop. It should not be treated as a precise preview of every Early Access location.',
        ],
      },
      {
        id: 'context',
        heading: 'Demo build context',
        paragraphs: [
          'Every specific Silent Cove statement on this page is labeled Demo evidence. Official Early Access copy says the opening build is bigger and includes a new map and fresh monsters.',
          'If Silent Cove appears in Early Access, its current routes, threats, items, and balance still need a fresh check. Historical availability alone does not verify unchanged behavior.',
        ],
      },
      {
        id: 'manor',
        heading: 'The abandoned manor and location structure',
        paragraphs: [
          'Official copy describes the center of Silent Cove as an abandoned manor inside a large cursed location. The developer page also referred to an 11-level location in Demo marketing.',
          'Because no authoritative floor plan accompanies that wording, this guide does not translate “levels” into exact floors, rooms, chapters, or a recommended sequence.',
        ],
        callout: {
          type: 'build-check',
          title: 'No inferred map',
          body: 'Promotional art and broad location wording are not enough to publish a navigational diagram.',
        },
      },
      {
        id: 'monster-pressure',
        heading: 'Monster pressure in the Demo',
        paragraphs: [
          'The Demo listing advertised nine unique monsters and said monsters react to sound, movement, and player behavior. That makes awareness and disciplined object handling relevant to Silent Cove.',
          'It does not establish which of the nine appears in each area, how often they spawn, or how their behavior changed across builds. The monster hub preserves named patch evidence without attaching unverified locations.',
        ],
      },
      {
        id: 'physics',
        heading: 'Physics interactions and traversal',
        paragraphs: [
          'Players can use elastic arms to grab objects, pull apart doors, move furniture, and interact destructively with the environment. These mechanics suggest that traversal and hauling are physical problems rather than simple inventory clicks.',
          'A safe field-guide habit is to keep retreat space and avoid moving a large object without someone watching the path. It is not a claim about a specific door skip or optimal Silent Cove route.',
        ],
      },
      {
        id: 'extraction',
        heading: 'Loot and extraction on Silent Cove',
        paragraphs: [
          'The official Demo page describes a full loop from arrival to potential extraction. Players search for valuables, protect the haul, and try to bring it back while the location pushes them toward riskier decisions.',
          'No verified value list or room-by-room loot table is available for publication. The general extraction guide explains the decision loop without pretending to know spawn data.',
        ],
      },
      {
        id: 'ea-change',
        heading: 'How this record relates to Early Access',
        paragraphs: [
          'Enemy behavior, item interactions, progression, geometry, visual feedback, and lobby-to-run flow can differ from the Demo. The launch announcement currently names Ship and Castle, while this page remains explicitly archived as Silent Cove Demo intelligence.',
          'If later first-party evidence names Silent Cove in a current build, the record will receive a new verification date and live evidence. Historical wording will not be silently relabeled.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is there a Silent Cove map image?',
        answer:
          'Not on this guide. No verified official floor plan or directly observed route diagram is available for responsible publication.',
      },
      {
        question: 'How many monsters were in Silent Cove?',
        answer:
          'The Demo advertised nine unique monsters, but this page does not claim every named patch entity or exact spawn placement.',
      },
    ],
    sourceIds: ['S03', 'S04'],
    related: [
      related('/maps', 'Maps hub', 'See current location status.'),
      related('/monsters', 'Monster evidence', 'Compare current threats with the Demo archive.'),
      related('/loot-and-extraction', 'Loot and extraction', 'Understand the full return loop.'),
      related('/gameplay', 'Gameplay explained', 'Place the map inside the overall mission.'),
    ],
  },
  {
    route: '/loot-and-extraction',
    title: 'Last Pirates: Die Together Loot & Extraction Guide',
    h1: 'Loot and Extraction in Last Pirates: Die Together',
    description:
      'How loot, elastic-arm carrying, crew risk, monsters, and the return trip shape extraction in Last Pirates: Die Together.',
    eyebrow: 'Haul protocol',
    directAnswer: [
      'The core objective is to find valuables inside a dangerous location and bring them back for the captain. Elastic arms and physics make hauling part of the challenge, while monsters and crew condition turn every extra object into a risk decision.',
      'The launch announcement confirms broader and break-apart loot, but no official value, rarity, weight, or spawn table is available, so those numbers remain absent.',
    ],
    buildContext: 'Early Access launch · Economics unverified',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Loot & Extraction' }],
    heroImage: {
      src: '/images/game/steam-page-background.jpg',
      alt: 'Official art of a pirate hauling colorful treasure',
      assetId: 'steam-page-background',
    },
    sections: [
      {
        id: 'one-minute',
        heading: 'The loot loop in one minute',
        paragraphs: [
          'Enter the location, search for valuables, use physical interactions to free or move them, decide how much the crew can safely handle, and start the return before threats erase the gain.',
          'The game turns carrying into action. A valuable may demand attention, block vision, slow a decision, or force teammates to coordinate around the same piece of space.',
        ],
      },
      {
        id: 'finding',
        heading: 'Finding valuables',
        paragraphs: [
          'Current launch copy says loot is broader and that some valuables can break apart, but it does not publish spawn rules or a stable economy. Search advice therefore focuses on observation and return planning rather than unverified tier lists.',
          'Before moving a difficult object, look at the path back and the crew’s available hands. Discovery has no value if the object cannot be transported safely.',
        ],
      },
      {
        id: 'carrying',
        heading: 'Carrying treasure with physics',
        paragraphs: [
          'Elastic arms can grab objects at unusual distances and let players manipulate doors, furniture, and treasure. The system can produce efficient teamwork or chaotic interference depending on spacing and communication.',
          'Move deliberately near narrow passages and do not let every player pull the same object without a plan. These are general physics-handling principles, not hidden stat claims.',
        ],
      },
      {
        id: 'risk',
        heading: 'Crew risk versus reward',
        paragraphs: [
          'The meaningful question is not just whether more loot exists, but whether the current crew can still retrieve it. Distance, attention, threat activity, item availability, and the reliability of the return path all matter.',
          'Use a clear return signal. If the group has no shared threshold, greed tends to make the decision only after the situation becomes worse.',
        ],
      },
      {
        id: 'bringing-back',
        heading: 'Bringing valuables back',
        paragraphs: [
          'Official descriptions emphasize making it back to the ship and preserving the haul. Exact scoring and persistence still need direct build verification, even though the broader extraction goal is current.',
          'On the return, assign the awkward object, protect the carrier’s path, and be willing to abandon the least useful burden. The haul is a crew task even if one pirate is physically holding it.',
        ],
      },
      {
        id: 'monsters',
        heading: 'How monsters complicate extraction',
        paragraphs: [
          'Monsters may react to sounds, movement, and player behavior, so hauling can create new exposure. An encounter that is manageable while empty-handed may become dangerous when the crew is occupied by treasure.',
          'Do not apply one counterplay rule to every threat. The current monster hub separates launch-described behavior from statistics and counterplay that still need direct verification.',
        ],
      },
      {
        id: 'cursed-loot',
        heading: 'Cursed loot is planned, not yet documented live',
        paragraphs: [
          'The official 1.0 direction includes more weapons and cursed loot. The source does not define how curses work, whether they affect value, or when the system arrives.',
          'Until a current build exposes stable decisions, cursed loot remains a roadmap fact rather than a calculator input or optimization guide.',
        ],
      },
      {
        id: 'database',
        heading: 'Why there is no numeric value database yet',
        paragraphs: [
          'A useful database requires observed names, values, acquisition context, build identity, and evidence timestamps. Guessing values from footage would make the planner look detailed while making it unreliable.',
          'If current economics prove stable and visible, this hub can add comparisons. Until then, a non-numeric crew extraction checklist is more useful than fabricated precision.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do you have to extract with loot?',
        answer:
          'Official descriptions center the mission on collecting valuables and bringing them back rather than merely exploring the location.',
      },
      {
        question: 'Which loot is worth the most?',
        answer:
          'No verified Early Access value table exists in the current source set, so this guide does not rank items by invented numbers.',
      },
    ],
    sourceIds: ['S01', 'S03', 'S04', 'S11'],
    related: [
      related('/gameplay', 'Gameplay loop', 'See where extraction fits in a run.'),
      related('/beginner-guide', 'Beginner guide', 'Make safer early haul decisions.'),
      related('/items-and-weapons', 'Items and weapons', 'Separate tools from valuables.'),
      related('/monsters', 'Monsters', 'Understand the threat evidence.'),
    ],
  },
  {
    route: '/items-and-weapons',
    title: 'Last Pirates: Die Together Items & Weapons Guide',
    h1: 'Items and Weapons in Last Pirates: Die Together',
    description:
      'Current Early Access equipment signals and historical item references for Last Pirates: Die Together, with unsupported stats and acquisition details withheld.',
    eyebrow: 'Equipment locker',
    directAnswer: [
      'The Early Access launch announcement confirms Piano, Flute, and Guitar activities, a reworked upgradable cart, and a Monkey Assistant. Earlier patches separately name Magnet, Rupor, Bell, knives, guillotine, bomb, and flashlight.',
      'Damage, ammo, durability, price, rarity, and acquisition locations remain unpublished until current-build evidence supports them.',
    ],
    buildContext: 'Early Access launch + historical patch ledger',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Items & Weapons' }],
    heroImage: {
      src: '/images/game/steam-header.jpg',
      alt: 'Official Last Pirates: Die Together crew art',
      assetId: 'steam-header',
    },
    sections: [
      {
        id: 'official-names',
        heading: 'What current and historical sources name',
        paragraphs: [
          'The launch announcement provides current signals for Piano, Flute, Guitar, cart upgrades, and the Monkey Assistant. Historical patches provide a separate list: Magnet, Rupor, Bell, knives, guillotine, bomb, and flashlight.',
          'The registry records each name, category, source, build, and last-checked date. Unknown numeric fields are absent rather than shown as zero or question marks.',
        ],
      },
      {
        id: 'launch-equipment',
        heading: 'Current launch equipment and activities',
        paragraphs: [
          'Piano, Flute, and Guitar are named as playable activities in the Early Access announcement. The same source describes a reworked cart that can be upgraded and a Monkey Assistant that can help the crew.',
          'Those statements confirm presence and broad purpose only. They do not provide acquisition routes, prices, upgrade costs, durability, or complete interaction rules, so no detail page passes the evidence gate yet.',
        ],
      },
      {
        id: 'weapons',
        heading: 'Weapons referenced before Early Access',
        paragraphs: [
          'Knives, a bomb, and a guillotine are named in official pre-EA material. A name alone does not tell us whether an object is carried, placed, environmental, consumable, or changed for launch.',
          'The guide therefore does not assign current damage classes, ammunition, or a best-weapon rank. Those require direct live context.',
        ],
      },
      {
        id: 'utility',
        heading: 'Utility items referenced before Early Access',
        paragraphs: [
          'Magnet, Rupor, Bell, and Flashlight appear in patch history. The flashlight received a rework in the June context, which is especially strong evidence that exact behavior is version-sensitive.',
          'Utility guidance will describe purpose, limitations, interactions, and acquisition only when the current build can support those fields together.',
        ],
      },
      {
        id: 'consumables',
        heading: 'Consumables and rum effects',
        paragraphs: [
          'An official devlog discussed rum that could provide positive and negative effects. It is kept in a separate effects registry because a status system is not the same thing as a weapon or general utility item.',
          'The launch announcement confirms rum-related bar and tutorial activity, but no complete drink list, duration table, stacking rule, or acquisition route is claimed.',
        ],
      },
      {
        id: 'unknown-stats',
        heading: 'Statistics that are not verified yet',
        paragraphs: [
          'Damage, ammo count, durability, price, value, rarity, weight, cooldowns, and fixed spawn positions are not present in the live public dataset. Omitting them prevents Demo-era guesses from becoming false database facts.',
          'A patch can change numbers without changing an item name. Every future numeric field therefore needs a build label and source or first-party capture.',
        ],
        callout: {
          type: 'build-check',
          title: 'Name does not equal current stats',
          body: 'Current launch references and historical patch names are shown separately; neither supplies a complete stat block.',
        },
      },
      {
        id: 'database-plan',
        heading: 'Current item database gate',
        paragraphs: [
          'Current records need a verified name, visible category, purpose, acquisition context, interactions, and any numbers the game clearly exposes. Records with only a name and one sentence remain on this hub.',
          'Individual item pages require enough information to answer how to obtain, use, limit, and combine the item without copying a generic paragraph.',
        ],
        table: {
          headers: ['Item/system', 'Evidence state', 'Current safe statement'],
          rows: [
            ['Piano / Flute / Guitar', 'EA launch', 'Named playable activities'],
            ['Cart', 'EA launch', 'Reworked and upgradeable'],
            ['Monkey Assistant', 'EA launch', 'Named crew helper'],
            ['Magnet / Rupor / Bell', 'Historical', 'Named in official patches/news'],
            ['Knives / Guillotine / Bomb', 'Historical', 'Weapon references only'],
            ['Flashlight', 'Historical', 'Rework referenced in a Demo patch'],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'What weapons are in the game?',
        answer:
          'Historical official sources name knives, a bomb, and a guillotine. The current launch announcement does not provide a complete live weapon inventory or combat statistics.',
      },
      {
        question: 'Why are there no damage values?',
        answer:
          'The current evidence does not verify live damage, ammo, durability, or price, so those fields are intentionally omitted.',
      },
    ],
    sourceIds: ['S02', 'S07', 'S08', 'S09', 'S11'],
    related: [
      related('/loot-and-extraction', 'Loot and extraction', 'Understand valuables and carrying.'),
      related('/rum-buffs-and-perks', 'Rum and perks', 'See effects kept separate from equipment.'),
      related('/updates', 'Updates', 'Track item reworks and patch context.'),
      related('/beginner-guide', 'Beginner guide', 'Avoid wasting unfamiliar equipment.'),
    ],
  },
  {
    route: '/rum-buffs-and-perks',
    title: 'Last Pirates: Die Together Rum Buffs, Cards & Perks',
    h1: 'Rum Buffs and Perks',
    description:
      'What official Last Pirates: Die Together material says about rum effects, Booty Stats, cards, and perks—without merging separate systems.',
    eyebrow: 'Effects ledger',
    directAnswer: [
      'A May official devlog described rum with positive examples such as faster running and longer arms, alongside possible negative side effects. It also introduced Booty Stats as an upgrade context.',
      'The launch announcement confirms that rum remains present through bar activity and the tutorial, but it does not establish current effect values or merge rum, cards, perks, and Booty Stats into one system.',
    ],
    buildContext: 'EA rum presence · Demo-era effect details',
    confidence: 'preview-build',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Rum Buffs & Perks' }],
    heroImage: {
      src: '/images/game/official-key-art.jpg',
      alt: 'Official game key art with the pirate crew and treasure',
      assetId: 'official-key-art',
    },
    sections: [
      {
        id: 'rum-description',
        heading: 'How rum and status effects were described',
        paragraphs: [
          'The official May devlog discussed drinks that can change a pirate’s capabilities and can also carry negative side effects. The Aug 18 launch announcement confirms current rum presence through bar activity and the tutorial, but not the old effect values.',
          'The current registry treats the examples as preview-build evidence and records no duration, stacking, drop location, price, or exact magnitude.',
        ],
      },
      {
        id: 'positive',
        heading: 'Positive effect examples',
        paragraphs: [
          'Faster running and longer arms are the two positive examples preserved from the official devlog. They are examples, not a complete effect list and not confirmation that the opening build uses identical names or values.',
          'A current effect card would need an observed name, effect, context, build, and evidence timestamp before offering practical advice.',
        ],
      },
      {
        id: 'negative',
        heading: 'Negative side effects',
        paragraphs: [
          'The same source warns that drinks can produce negative effects. It does not provide enough current information to rank risks, define exact penalties, or calculate whether a drink is worth using.',
          'A current guide can describe the tradeoff only after the game exposes the consequence clearly. Unknown penalties remain unknown rather than being guessed from animation or footage.',
        ],
      },
      {
        id: 'booty-stats',
        heading: 'Booty Stats and upgrade context',
        paragraphs: [
          'Booty Stats appeared in the Demo-era development update as an upgrade context. The source does not justify equating those stats with a permanent talent tree, a card deck, or a final progression system.',
          'The Early Access store separately says deeper progression is a longer-term 1.0 goal. That direction should not be used to fill missing current UI or upgrade details.',
        ],
      },
      {
        id: 'cards-perks',
        heading: 'Cards and perks in preview material',
        paragraphs: [
          'Cards and perks may appear in preview or community discussions, but the current official source ledger does not define their complete live relationship to rum or Booty Stats.',
          'This page acts as a discovery hub until direct evidence supports distinct current records. It does not force every effect into one taxonomy for convenience.',
        ],
      },
      {
        id: 'reverify',
        heading: 'What still needs current-build verification',
        paragraphs: [
          'The current-build check covers system names, where each effect comes from, positive and negative outcomes, duration, stacking, persistence, and whether Booty Stats, cards, and perks are independent systems.',
          'Only visible and stable mechanics will become public database entries. A full-list claim will wait until coverage is actually complete.',
        ],
        table: {
          headers: ['System label', 'Current evidence', 'Open live question'],
          rows: [
            ['Rum', 'Official Demo-era examples', 'Current effects, duration, acquisition'],
            ['Booty Stats', 'Official upgrade-context mention', 'Live function and persistence'],
            ['Cards', 'Not defined by current ledger', 'Whether present and how used'],
            ['Perks', 'Not defined by current ledger', 'Whether distinct from other systems'],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'What rum buffs are confirmed?',
        answer:
          'An official Demo-era devlog gave faster running and longer arms as examples, with negative side effects also possible. Current EA values remain unverified.',
      },
      {
        question: 'Are rum, cards, perks, and Booty Stats the same system?',
        answer:
          'That relationship is not verified, so this guide deliberately keeps the labels separate.',
      },
    ],
    sourceIds: ['S01', 'S09', 'S11'],
    related: [
      related('/items-and-weapons', 'Items and weapons', 'See physical equipment separately.'),
      related('/gameplay', 'Gameplay explained', 'Place effects in the broader run loop.'),
      related('/roadmap', 'Roadmap', 'See the longer-term progression direction.'),
      related('/updates', 'Updates', 'Watch for current system changes.'),
    ],
  },
] satisfies GuidePageData[];
