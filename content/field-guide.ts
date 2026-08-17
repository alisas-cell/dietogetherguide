import type { GuidePageData } from './types';
import { related } from './types';

export const fieldGuidePages = [
  {
    route: '/monsters',
    title: 'Last Pirates: Die Together Monsters — Enemy Guide',
    h1: 'Last Pirates: Die Together Monsters',
    description:
      'A source-checked monster evidence hub for Last Pirates: Die Together, separating Demo names and behaviors from the unverified Early Access roster.',
    eyebrow: 'Threat ledger',
    directAnswer: [
      'The official Demo advertised nine unique monsters that could react to sound, movement, and player behavior. Nine names also appear across official Demo or pre-Early-Access patch contexts, but this is not presented as the final Early Access roster.',
      'Exact health, damage, spawn rates, current locations, and reliable counterplay remain absent until the live build supports them.',
    ],
    buildContext: 'Demo evidence · EA roster pending',
    confidence: 'preview-build',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Monsters' }],
    heroImage: {
      src: '/images/game/steam-page-background.jpg',
      alt: 'Official art showing the pirate crew with a monster in the shadows',
      assetId: 'steam-page-background',
    },
    sections: [
      {
        id: 'known',
        heading: 'What we know before Early Access',
        paragraphs: [
          'Official material establishes that monsters are a central source of pressure and that their reactions can depend on what players do. Patch notes also show enemies changing repeatedly before launch, which makes build labels essential.',
          'A name in patch notes proves that a referenced entity existed in that build. It does not prove a current model, detection radius, attack value, spawn rule, or even inclusion in the opening roster.',
        ],
      },
      {
        id: 'nine',
        heading: 'The Demo advertised nine unique monsters',
        paragraphs: [
          'The separate Steam Demo page described nine unique monsters inside the Demo experience. This is a sourced historical quantity tied to Silent Cove, not a promise that Early Access contains exactly nine.',
          'Early Access is advertised with fresh monsters, so the live roster could add, remove, rename, or rework entries. The hub will change only after each identity is visible in current evidence.',
        ],
      },
      {
        id: 'detection',
        heading: 'How detection is described',
        paragraphs: [
          'Official Demo copy says threats react to sounds, movement, and player behavior. Those categories are useful for organizing observations, but they should not be copied onto every monster card by default.',
          'A future card needs an entity-specific trigger or meaningful behavior before it can offer counterplay. “All monsters hear sound” would be an unjustified generalization.',
        ],
      },
      {
        id: 'names',
        heading: 'Names evidenced in pre-EA sources',
        paragraphs: [
          'Official patches or posts reference Howler, Misha, Mimic, Screamer, Monkey Screamer, Rat, Pirate, Shark, and Pirate Head. Some notes mention fixes or interactions without describing the full behavior.',
          'These records stay at Demo or pre-EA confidence until current identity, location, trigger, and counterplay can be checked. No individual detail page passes the publication gate yet.',
        ],
      },
      {
        id: 'not-final',
        heading: 'Why this is not the final Early Access list',
        paragraphs: [
          'The official launch announcement says fresh monsters are coming, and the store says the build is bigger than the Demo. Neither source enumerates the opening roster at this check.',
          'Publishing a confident “all monsters” list now would collapse announced, historical, and live evidence into one misleading answer. This hub instead exposes what each source actually supports.',
        ],
        callout: {
          type: 'build-check',
          title: 'No invented roster',
          body: 'Names remain Demo/pre-EA references until the Early Access build verifies their current identity and behavior.',
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
            ['Howler', 'Jul 7 pre-EA patch', 'Named in an official patch', 'Pending verification'],
            ['Misha', 'Official pre-EA news', 'Named reference', 'Pending verification'],
            ['Mimic', 'Jun 19 Demo patch', 'Named in patch context', 'Pending verification'],
            ['Screamer', 'Jun 19 Demo patch', 'Named in patch context', 'Pending verification'],
            ['Monkey Screamer', 'Official pre-EA news', 'Named reference', 'Pending verification'],
            ['Rat', 'Jun/Jul pre-EA patches', 'Named in multiple patches', 'Pending verification'],
            ['Pirate', 'Jun 19 Demo patch', 'Named reference', 'Pending verification'],
            ['Shark', 'Official pre-EA news', 'Named reference', 'Pending verification'],
            ['Pirate Head', 'Official pre-EA news', 'Named reference', 'Pending verification'],
          ],
        },
      },
      {
        id: 'launch-verification',
        heading: 'What we will verify at launch',
        paragraphs: [
          'For each visible monster, the checklist covers current name, visual identity, map, detection or behavior, threat pattern, at least one defensible warning or counterplay note, and build version.',
          'A detail page appears only after enough fields are useful together. Until then, the hub is the honest place for partial evidence.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How many monsters are in Last Pirates: Die Together?',
        answer:
          'The Demo officially advertised nine unique monsters. The exact Early Access roster is not yet verified.',
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
    sourceIds: ['S01', 'S02', 'S04', 'S07', 'S08'],
    related: [
      related('/maps', 'Maps', 'Connect verified threats to current locations.'),
      related('/maps/silent-cove', 'Silent Cove', 'See the Demo location context.'),
      related('/beginner-guide', 'Beginner guide', 'Use safe threat-awareness habits.'),
      related('/early-access', 'Early Access', 'Understand why the live roster is pending.'),
    ],
  },
  {
    route: '/maps',
    title: 'Last Pirates: Die Together Maps — Locations & Guides',
    h1: 'Last Pirates: Die Together Maps',
    description:
      'Last Pirates: Die Together map status: Silent Cove in the Demo, a new map announced for Early Access, and the evidence required for full guides.',
    eyebrow: 'Location charts',
    directAnswer: [
      'Silent Cove is the only map named and documented for the public Demo in the current source ledger. Official Early Access announcements promise a brand-new map but do not confirm its name on the sources checked before unlock.',
      'No guessed location title, room list, landmark map, or monster route is published as fact.',
    ],
    buildContext: 'Demo map confirmed · EA map announced',
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
          'The source-backed map registry has two records: Silent Cove as a Demo location and an internal unnamed record for the announced Early Access map. The unnamed record is not exposed as a made-up destination.',
          'This structure lets a verified live name replace the internal record without allowing pre-release guesses into titles, links, or schema.',
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
        heading: 'A new Early Access map is announced',
        paragraphs: [
          'The July Early Access announcement promises a brand-new map. The store also describes the opening build as containing more locations than the Demo.',
          'The current official pages we checked do not establish a public name, layout, hazards, or monster roster for that location. Those fields remain unrendered.',
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
            ['Silent Cove', 'Public Demo', 'Cursed location / abandoned manor', 'Demo-context guide available'],
            ['New EA map', 'Officially announced', 'Name and setting unverified', 'No public detail page'],
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
          'Once live evidence is available, each map record will connect to monsters actually observed there and to item or extraction guidance that materially applies. Relationships come from evidence fields, not a random related-post widget.',
          'Until then, Silent Cove links to the general monster and loot hubs so readers can understand the Demo context without seeing false placement claims.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What maps are in Last Pirates: Die Together?',
        answer:
          'Silent Cove is confirmed for the Demo. A brand-new Early Access map is announced, but its current name and details are not verified here.',
      },
      {
        question: 'Is Silent Cove in Early Access?',
        answer:
          'The store says Early Access contains everything seen in the Demo, but the accessible live map list still requires launch verification.',
      },
    ],
    sourceIds: ['S01', 'S02', 'S03', 'S04'],
    related: [
      related('/maps/silent-cove', 'Silent Cove guide', 'Read the source-bounded Demo map guide.'),
      related('/monsters', 'Monsters', 'See the current threat evidence.'),
      related('/loot-and-extraction', 'Loot and extraction', 'Understand the loop a location supports.'),
      related('/early-access', 'Early Access', 'Track the announced new-map delta.'),
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
        heading: 'What may change in Early Access',
        paragraphs: [
          'Enemy behavior, item interactions, progression, geometry, visual feedback, and lobby-to-run flow may change. Official statements make clear that feedback has already reshaped key systems and will continue to do so.',
          'After unlock, this page will either be reverified as a current location guide or remain explicitly archived as Demo intelligence. It will not blur the two states.',
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
      related('/monsters', 'Monster evidence', 'Read the Demo/pre-EA threat ledger.'),
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
      'No Early Access value, rarity, weight, or spawn table is presented before the live build verifies it.',
    ],
    buildContext: 'Official loop · Live economics pending',
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
          'Official copy encourages players to collect booty and explore deeper, but it does not publish current spawn rules or a stable economy. Search advice should therefore focus on observation and return planning rather than unverified tier lists.',
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
          'Official descriptions emphasize making it back to the ship and suggest that at least one surviving crewmember carrying the gold can preserve the expedition’s purpose. Exact scoring and persistence still need current-build verification.',
          'On the return, assign the awkward object, protect the carrier’s path, and be willing to abandon the least useful burden. The haul is a crew task even if one pirate is physically holding it.',
        ],
      },
      {
        id: 'monsters',
        heading: 'How monsters complicate extraction',
        paragraphs: [
          'Monsters may react to sounds, movement, and player behavior, so hauling can create new exposure. An encounter that is manageable while empty-handed may become dangerous when the crew is occupied by treasure.',
          'Do not apply one counterplay rule to every threat. Current monster-specific responses belong in evidence-gated entity records after launch.',
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
        heading: 'Why there is no live value database yet',
        paragraphs: [
          'A useful database requires observed names, values, acquisition context, build identity, and evidence timestamps. Guessing values from footage would make the planner look detailed while making it unreliable.',
          'If live economics are stable, this hub can add comparisons. If not, the better tool will be a non-numeric crew extraction checklist.',
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
    sourceIds: ['S01', 'S03', 'S04'],
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
      'Official pre-EA item and weapon references for Last Pirates: Die Together, with live stats and acquisition details withheld until verified.',
    eyebrow: 'Equipment locker',
    directAnswer: [
      'Official pre-Early-Access sources name the Magnet, Rupor, Bell, knives, guillotine, bomb, and flashlight. They establish that these items appeared in particular patch contexts, not that every item is unchanged or present at launch.',
      'Damage, ammo, durability, price, rarity, and acquisition locations remain unpublished until current-build evidence supports them.',
    ],
    buildContext: 'Named in Demo/pre-EA patches',
    confidence: 'preview-build',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Items & Weapons' }],
    heroImage: {
      src: '/images/game/steam-header.jpg',
      alt: 'Official Last Pirates: Die Together crew art',
      assetId: 'steam-header',
    },
    sections: [
      {
        id: 'official-names',
        heading: 'What official patches have named',
        paragraphs: [
          'Patch history provides a cautious starting list: Magnet, Rupor, Bell, knives, guillotine, bomb, and flashlight. Some appeared in fix notes or rework descriptions rather than a formal inventory catalog.',
          'The registry records each name, category, source, build, and last-checked date. Unknown numeric fields are absent rather than shown as zero or question marks.',
        ],
      },
      {
        id: 'weapons',
        heading: 'Weapons referenced before Early Access',
        paragraphs: [
          'Knives, a bomb, and a guillotine are named in official pre-EA material. A name alone does not tell us whether an object is carried, placed, environmental, consumable, or changed for launch.',
          'The guide therefore does not assign damage classes, ammunition, or a best-weapon rank. Those require direct live context.',
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
          'No complete drink list, duration table, stacking rule, or acquisition route is claimed for Early Access.',
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
          body: 'Each reference is evidence that an item existed in a pre-EA context, not a complete launch specification.',
        },
      },
      {
        id: 'database-plan',
        heading: 'Launch-day item database plan',
        paragraphs: [
          'The first pass will verify current names, visible categories, purpose, acquisition context, interactions, and any numbers the game clearly exposes. Records with only a name and one sentence will remain on this hub.',
          'Individual item pages require enough information to answer how to obtain, use, limit, and combine the item without copying a generic paragraph.',
        ],
        table: {
          headers: ['Item', 'Pre-EA class', 'Current safe statement'],
          rows: [
            ['Magnet', 'Utility', 'Named in an official patch'],
            ['Rupor', 'Utility', 'Named in an official patch'],
            ['Bell', 'Utility', 'Named in official news'],
            ['Knives', 'Weapon', 'Named in a pre-EA patch'],
            ['Guillotine', 'Weapon', 'Named in official news'],
            ['Bomb', 'Weapon', 'Named in official news'],
            ['Flashlight', 'Utility', 'Rework referenced in a Demo patch'],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'What weapons are in the game?',
        answer:
          'Official pre-EA sources name knives, a bomb, and a guillotine, but the current Early Access inventory and behavior still need verification.',
      },
      {
        question: 'Why are there no damage values?',
        answer:
          'The current evidence does not verify live damage, ammo, durability, or price, so those fields are intentionally omitted.',
      },
    ],
    sourceIds: ['S02', 'S07', 'S08', 'S09'],
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
      'Rum, cards, perks, and Booty Stats are kept as separate labels until the Early Access build verifies how the systems relate.',
    ],
    buildContext: 'Demo-era devlog · EA mechanics pending',
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
          'The official May devlog discussed drinks that can change a pirate’s capabilities and can also carry negative side effects. This establishes a Demo-era effect concept, not a complete live consumable system.',
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
          'A launch-day guide will describe the tradeoff only after the game exposes the consequence clearly. Unknown penalties remain unknown rather than being guessed from animation or footage.',
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
        heading: 'What must be reverified for Early Access',
        paragraphs: [
          'The launch check covers system names, where each effect comes from, positive and negative outcomes, duration, stacking, persistence, and whether Booty Stats, cards, and perks are independent systems.',
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
    sourceIds: ['S01', 'S09'],
    related: [
      related('/items-and-weapons', 'Items and weapons', 'See physical equipment separately.'),
      related('/gameplay', 'Gameplay explained', 'Place effects in the broader run loop.'),
      related('/roadmap', 'Roadmap', 'See the longer-term progression direction.'),
      related('/updates', 'Updates', 'Watch for current system changes.'),
    ],
  },
] satisfies GuidePageData[];
