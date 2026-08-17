import type { GuidePageData } from './types';
import { related } from './types';

export const startPages = [
  {
    route: '/release-date',
    title: 'Last Pirates: Die Together Release Date & Early Access Time',
    h1: 'Last Pirates: Die Together Release Date',
    description:
      'Last Pirates: Die Together is scheduled for Early Access on Aug 18, 2026. See the current Steam status and timestamp snapshot by region.',
    eyebrow: 'Release watch',
    directAnswer: [
      'Steam lists Last Pirates: Die Together for August 18, 2026, but the game is not yet available at our Aug 17 check. The public status on this guide therefore remains pre-release.',
      'SteamDB records a pre-release timestamp of 17:00 UTC on Aug 18. Treat that as a platform metadata snapshot, not a guaranteed launch minute, until the Steam purchase or play control becomes available.',
    ],
    buildContext: 'Pre-EA check · Aug 17, 2026',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Release Date' }],
    heroImage: {
      src: '/images/game/steam-header.jpg',
      alt: 'Official Last Pirates: Die Together Steam header art',
      assetId: 'steam-header',
    },
    sections: [
      {
        id: 'status',
        heading: 'Release date and current status',
        paragraphs: [
          'The official Steam store shows Aug 18, 2026 as the planned release date and describes the launch as the start of Early Access, not version 1.0. The same page currently says the game is not yet available. That visible store state takes priority over calendar assumptions.',
          'This page is designed to change from one central release registry. When availability is independently confirmed, the status strip, homepage, FAQ, and release wording can change together instead of drifting across the site.',
        ],
      },
      {
        id: 'regional-times',
        heading: 'Timestamp snapshot by region',
        paragraphs: [
          'The table converts the current 17:00 UTC SteamDB snapshot. Daylight-saving offsets are reflected for Aug 18, 2026. These are planning conversions, not separate official regional announcements.',
        ],
        table: {
          headers: ['Region', 'Local snapshot', 'Date'],
          rows: [
            ['UTC', '17:00', 'Aug 18'],
            ['US Pacific', '10:00 PDT', 'Aug 18'],
            ['US Eastern', '13:00 EDT', 'Aug 18'],
            ['United Kingdom', '18:00 BST', 'Aug 18'],
            ['Central Europe', '19:00 CEST', 'Aug 18'],
            ['China', '01:00 CST', 'Aug 19'],
            ['Japan / Korea', '02:00 JST / KST', 'Aug 19'],
          ],
        },
        callout: {
          type: 'build-check',
          title: 'Timestamp, not a promise',
          body: 'Store metadata can move. Check the Steam store before arranging a crew around a specific minute.',
        },
      },
      {
        id: 'early-access',
        heading: 'Is this 1.0 or Early Access?',
        paragraphs: [
          'Aug 18 is the planned Early Access opening. The developers describe the build as a playable co-op experience that expands the Demo with more content and polish while feedback continues to shape difficulty, enemy behavior, physics, co-op flow, and replayability.',
          'The 1.0 direction is broader: more locations, enemies and bosses, character customization, deeper progression, more weapons, cursed loot, and general polish. Those are direction statements, not a dated feature schedule.',
        ],
      },
      {
        id: 'demo',
        heading: 'What happens to the Demo?',
        paragraphs: [
          'Official sources document a separate Steam Demo app and a Demo-era build centered on Silent Cove. We have not found an official statement guaranteeing how long that app remains downloadable after Early Access opens.',
          'Do not assume Demo progress transfers to Early Access. The pre-EA save patch discussed chapter progress and reconnect behavior inside its build context, but it did not establish Demo-to-EA transfer.',
        ],
      },
      {
        id: 'adds',
        heading: 'What Early Access is expected to add',
        paragraphs: [
          'The official launch promise names a brand-new map, fresh monsters, and more content and polish than the Demo. It does not provide a verified live roster or the new location name on the store page we checked.',
          'Our launch process will confirm the accessible maps, visible monster identities, item systems, lobby flow, and patch version before those details are promoted from announced to live.',
        ],
      },
      {
        id: 'length',
        heading: 'How long Early Access may last',
        paragraphs: [
          'The current developer answer aims for six months or more. It also says the game will stay in Early Access until it is genuinely ready rather than chasing a fixed 1.0 date.',
          'That makes the target useful as context but unsuitable for calculating a promised final-release date. Follow the roadmap and updates hub for dated official changes.',
        ],
      },
      {
        id: 'launch-day',
        heading: 'Where to check on launch day',
        paragraphs: [
          'Start with the Steam product page. A working purchase, install, or play control is stronger evidence than a countdown reaching zero. Then check official Steam News for a launch post and SteamDB for any changed timestamp or ReleaseState.',
          'This field guide will keep the pre-EA badge until those signals agree. If the timestamp passes without availability, the correct answer is delayed or still pending—not silently live.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What time does Last Pirates: Die Together release?',
        answer:
          'The current SteamDB metadata snapshot is 17:00 UTC on Aug 18, 2026. It is not treated as a guaranteed minute until Steam unlock is confirmed.',
      },
      {
        question: 'Is Aug 18 the full 1.0 release?',
        answer:
          'No. The Steam page describes Aug 18 as the planned start of Early Access.',
      },
      {
        question: 'Will Demo saves transfer?',
        answer:
          'No official source in the current ledger confirms Demo-to-Early-Access save transfer.',
      },
    ],
    sourceIds: ['S01', 'S02', 'S05'],
    related: [
      related('/early-access', 'Early Access guide', 'What is confirmed for the opening build.'),
      related('/roadmap', 'Roadmap', 'Separate plans from dated releases.'),
      related('/system-requirements', 'PC requirements', 'Check the current Steam minimums.'),
      related('/faq', 'FAQ', 'Short answers to release and co-op questions.'),
    ],
  },
  {
    route: '/early-access',
    title: 'Last Pirates: Die Together Early Access — What’s Included',
    h1: 'Last Pirates: Die Together Early Access Guide',
    description:
      'What Last Pirates: Die Together Early Access officially adds, what carries over from the Demo, and which live details still need verification.',
    eyebrow: 'Build guide',
    directAnswer: [
      'Last Pirates: Die Together is planned to enter Early Access on Aug 18, 2026. Official copy promises a new map, fresh monsters, more content, and more polish than the Demo.',
      'The exact launch roster, map name, item values, price, and Demo-save transfer are not yet confirmed. This page keeps announced plans separate from live-build facts.',
    ],
    buildContext: 'Official plan · Live build pending',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Early Access' }],
    heroImage: {
      src: '/images/updates/roadmap.jpg',
      alt: 'Official 2026 Last Pirates: Die Together roadmap',
      assetId: 'roadmap-2026',
    },
    sections: [
      {
        id: 'glance',
        heading: 'Early Access at a glance',
        paragraphs: [
          'The opening build is described as fully playable online co-op for up to four players. The developers say it contains everything players saw in the Demo, but bigger, with more monsters, locations, content, and polish.',
          'Early Access also keeps the feedback loop open. Official wording specifically names the core loop, difficulty, enemy behavior, physics interactions, co-op flow, and replayability as systems that may be tuned through player feedback.',
        ],
      },
      {
        id: 'confirmed-delta',
        heading: 'Confirmed changes from Demo to Early Access',
        paragraphs: [
          'The safe comparison is qualitative. A brand-new map and fresh monsters are announced. More content and polish are promised. No official source in the current ledger gives a trustworthy exact total for the opening day.',
        ],
        table: {
          headers: ['Confirmed or announced', 'Needs live verification'],
          rows: [
            ['A new map is promised', 'The map name and final layout'],
            ['Fresh monsters are promised', 'Names, count, behavior, and locations'],
            ['More content and polish', 'Exact item and progression inventory'],
            ['Online co-op for 1–4', 'Launch-day lobby UI and region behavior'],
            ['Regular free major updates during EA', 'Cadence and contents of each update'],
          ],
        },
      },
      {
        id: 'demo-proof',
        heading: 'What the Demo already established',
        paragraphs: [
          'The Demo provides evidence for the broad expedition loop: explore Silent Cove, manipulate the environment and valuables with elastic arms, respond to monsters, and bring loot back. Developer copy also described nine unique monsters and an 11-level location structure in that Demo context.',
          'Those facts help explain how the game works. They do not prove that every Demo route, monster behavior, item interaction, or balance value remains unchanged in the opening Early Access build.',
        ],
      },
      {
        id: 'direction',
        heading: 'Official direction toward 1.0',
        paragraphs: [
          'For 1.0, the developers say they want many more locations, new enemies and bosses, character customization, deeper progression, more weapons and cursed loot, plus broad polish. This is a direction list rather than a binding delivery order.',
          'Features stay labeled planned until an official build or patch makes them available. A roadmap mention should never be rendered as a current mechanic.',
        ],
      },
      {
        id: 'duration',
        heading: 'Expected Early Access length',
        paragraphs: [
          'The current target is six months or more. The developers explicitly leave room for a longer period if that is what the game needs before 1.0.',
          'Because the target is open-ended, there is no responsible way to turn it into a precise 1.0 release date. The updates timeline will track real milestones instead.',
        ],
      },
      {
        id: 'unknowns',
        heading: 'What is not confirmed yet',
        paragraphs: [
          'Price, exact opening roster, new map identity, live item statistics, perk structure, Steam Deck verification, Demo availability, and Demo-save transfer remain open at this check.',
          'Unknown does not mean absent. It means the public evidence is not strong enough to answer affirmatively before unlock.',
        ],
        callout: {
          type: 'build-check',
          title: 'EA check pending',
          body: 'Exact quantities and live UI paths will be added only after purchase/playability and the opening build are verified.',
        },
      },
      {
        id: 'demo-trust',
        heading: 'Should you still trust Demo guides?',
        paragraphs: [
          'Use Demo material to learn the category, the documented loop, Silent Cove context, and feature history. Treat route optimization, monster counterplay, item performance, and progression advice as build-sensitive.',
          'Every page on this site carries a build label. Demo statements remain visible when they answer a historical question, but they are not silently relabeled as Early Access facts.',
        ],
      },
      {
        id: 'verification-list',
        heading: 'Release-day verification checklist',
        paragraphs: [
          'We will verify store availability, build identity, maps, monsters, co-op flow, saves, items, effects, requirements, and the first official patch. Hubs will be updated before individual database pages are created.',
          'That order prevents a fast but unreliable flood of thin entity pages. A monster or item gets its own page only after it has enough current evidence to solve a distinct player problem.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the Early Access build the same as the Demo?',
        answer:
          'No. Official wording promises a new map, fresh monsters, more content, and more polish, while exact live differences still need verification.',
      },
      {
        question: 'Are major Early Access updates paid?',
        answer:
          'The current Steam Early Access statement says every major update during Early Access will be free.',
      },
    ],
    sourceIds: ['S01', 'S03', 'S04'],
    related: [
      related('/release-date', 'Release date', 'Track availability and the timestamp snapshot.'),
      related('/roadmap', 'Roadmap', 'See planned 1.0 direction without invented dates.'),
      related('/maps', 'Maps', 'Compare Silent Cove with the announced expansion.'),
      related('/monsters', 'Monsters', 'See the current evidence-gated enemy hub.'),
      related('/updates', 'Updates', 'Follow meaningful official build changes.'),
    ],
  },
  {
    route: '/roadmap',
    title: 'Last Pirates: Die Together Roadmap — Maps, Monsters & 1.0 Plans',
    h1: 'Last Pirates: Die Together Roadmap',
    description:
      'A source-checked Last Pirates: Die Together roadmap covering Early Access launch plans, longer-term 1.0 direction, and official update history.',
    eyebrow: 'Plan tracker',
    directAnswer: [
      'The official 2026 roadmap leads from spring playtests and the June Demo to Early Access in August. The store also outlines longer-term ambitions such as more locations, enemies, bosses, progression, weapons, cursed loot, and customization.',
      'Only Early Access on Aug 18 has a current planned date. Individual future features do not have responsible release windows yet.',
    ],
    buildContext: 'Official roadmap · Aug 17 check',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Roadmap' }],
    heroImage: {
      src: '/images/updates/roadmap.jpg',
      alt: 'Official Last Pirates: Die Together 2026 roadmap',
      assetId: 'roadmap-2026',
    },
    sections: [
      {
        id: 'summary',
        heading: 'Official roadmap summary',
        paragraphs: [
          'The published graphic marks a closed playtest in March, an open playtest in April, the Demo and Steam Next Fest period in June, a July update, and Early Access in August. It is a high-level history and launch path, not a feature-by-feature production calendar.',
          'The Steam Early Access answers add the longer horizon. They explain what the developers want for 1.0 but intentionally avoid fixed dates for each system.',
        ],
      },
      {
        id: 'launch',
        heading: 'At Early Access launch',
        paragraphs: [
          'The announced opening delta is a new map, fresh monsters, and a build with more content and polish than the Demo. Up to four-player online co-op remains the central format.',
          'The roadmap does not establish the new map name, live monster count, price, or final progression structure. Those remain launch-day research tasks.',
        ],
      },
      {
        id: 'during-ea',
        heading: 'Planned during Early Access',
        paragraphs: [
          'Official wording promises regular content and balance updates shaped by feedback. The target systems include difficulty, enemy behavior, physics interactions, co-op flow, replayability, and the core loop.',
          'Major updates during Early Access are currently described as free. Frequency is not guaranteed, so the updates hub tracks actual posts rather than projecting a weekly or monthly cadence.',
        ],
      },
      {
        id: 'one-zero',
        heading: 'The 1.0 direction',
        paragraphs: [
          'The developers specifically name many more locations, new enemies and bosses, character customization, deeper progression, more weapons, cursed loot, and overall polish as goals for 1.0.',
          'The phrase “want for 1.0” matters. It signals design direction, not a contract that every item will land in a particular patch or in exactly the form readers imagine.',
        ],
      },
      {
        id: 'confidence',
        heading: 'Confirmed, implied, and not announced',
        paragraphs: [
          'Confirmed or officially announced items are displayed as such. Direction statements stay planned. Logical guesses—such as a specific boss count, an upgrade tree, or a named second map—are omitted.',
        ],
        table: {
          headers: ['Status', 'Examples', 'How to read it'],
          rows: [
            ['Shipped in pre-EA builds', 'Quick Join, reconnect work, chapter save work', 'Documented patch history'],
            ['Announced for EA', 'New map, fresh monsters, more content', 'Expected, not yet live-verified'],
            ['Long-term direction', 'Bosses, customization, deeper progression', 'No individual date'],
            ['Not announced', 'Exact quantities, named opening map, price', 'No affirmative claim'],
          ],
        },
      },
      {
        id: 'timeline',
        heading: 'Verified update timeline',
        paragraphs: [
          'June patches documented save and reconnect improvements. The July patch announced Quick Join, host migration and synchronization work, FOV and invert-Y settings, and Steam Deck-related fixes. Aug 18 remains the planned Early Access point.',
          'Each timeline entry links back to the system it materially affects. This keeps the roadmap useful for players rather than turning it into a gallery of announcements.',
        ],
        table: {
          headers: ['Date', 'Status', 'Event'],
          rows: [
            ['Jun 2026', 'Shipped pre-EA', 'Demo, Next Fest, save/reconnect improvements'],
            ['Jul 7, 2026', 'Shipped pre-EA', 'Quick Join and co-op resilience patch'],
            ['Aug 18, 2026', 'Planned', 'Early Access opening'],
            ['After EA', 'Planned direction', 'Regular free major updates toward 1.0'],
          ],
        },
      },
    ],
    faqs: [
      {
        question: 'Does the roadmap give dates for new bosses or maps?',
        answer:
          'No. It announces an opening map and gives long-term direction, but no responsible individual dates for later locations or bosses.',
      },
      {
        question: 'Is the 1.0 date known?',
        answer:
          'No. The developer target is six months or more in Early Access, with readiness taking priority over a fixed date.',
      },
    ],
    sourceIds: ['S01', 'S02', 'S07', 'S08'],
    related: [
      related('/early-access', 'Early Access', 'See what is announced for the opening build.'),
      related('/release-date', 'Release date', 'Track the actual Steam unlock.'),
      related('/updates', 'Updates', 'Read the verified patch timeline.'),
      related('/maps', 'Maps', 'See what is known about locations.'),
    ],
  },
  {
    route: '/gameplay',
    title: 'How Last Pirates: Die Together Works — Gameplay & Extraction Loop',
    h1: 'Last Pirates: Die Together Gameplay Explained',
    description:
      'Learn the verified Last Pirates: Die Together gameplay loop: crew up, use elastic arms, move valuables, survive monsters, and extract.',
    eyebrow: 'Mission briefing',
    directAnswer: [
      'Last Pirates: Die Together is an online co-op extraction-horror game for one to four players. Your crew enters a cursed location, uses unusually stretchy arms and physics interactions to handle valuables, avoids or responds to monsters, and tries to return the loot.',
      'The broad loop is official and Demo-evidenced. Exact Early Access progression, balance, item statistics, and map routing still need live-build verification.',
    ],
    buildContext: 'Demo evidence · EA delta announced',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Gameplay' }],
    heroImage: {
      src: '/images/game/steam-page-background.jpg',
      alt: 'Official art of a pirate carrying colorful loot while the crew reacts to danger',
      assetId: 'steam-page-background',
    },
    sections: [
      {
        id: 'thirty-seconds',
        heading: 'The 30-second explanation',
        paragraphs: [
          'Enter a dangerous location, search for treasure, physically move it with your elastic arms, stay alert to threats, and get enough value back to the captain. Greed creates the tension: going deeper may produce a better haul, but it also increases the chance that nobody carries it home.',
          'The game mixes co-op coordination, environmental physics, slapstick failure, and horror pressure. Success is not just defeating an enemy; it is completing the expedition with something worth bringing back.',
        ],
      },
      {
        id: 'crew',
        heading: 'Crew size and co-op structure',
        paragraphs: [
          'Steam lists single-player and online co-op, with official descriptions consistently framing the party as one to four players. A larger crew can divide observation, hauling, and distraction work, but the game is also listed for solo play.',
          'Public-lobby Quick Join and reconnect systems were added during pre-EA patches. Their existence is documented; the exact opening-build screens and region behavior remain on the launch checklist.',
        ],
      },
      {
        id: 'enter',
        heading: 'Enter a cursed location',
        paragraphs: [
          'The Demo centered on Silent Cove and its abandoned-manor setting. Official Early Access text promises additional locations and a new opening map, but it does not name that map in the current store copy.',
          'A location guide should answer where threats, valuables, and return paths are observed. We will not publish inferred room lists or map diagrams from promotional images.',
        ],
      },
      {
        id: 'physics',
        heading: 'Use stretchy arms and physics interactions',
        paragraphs: [
          'Elastic arms are not just a visual joke. Official copy describes grabbing objects, dismantling doors, moving furniture, and breaking parts of the environment while gathering value.',
          'That means object handling can affect noise, speed, visibility, and crew spacing. The beginner-safe rule is to make deliberate movements and keep enough awareness to retreat; exact optimal techniques must wait for the live build.',
        ],
      },
      {
        id: 'loot',
        heading: 'Find and transport valuables',
        paragraphs: [
          'Valuables are the expedition objective. Players must locate them, manipulate awkward shapes, protect the haul, and move it toward safety rather than treating every room as a combat arena.',
          'No current evidence supports a public value table, weight formula, or ranked loot list for Early Access. Those numbers remain absent instead of being guessed from Demo footage.',
        ],
      },
      {
        id: 'threats',
        heading: 'React to monsters and environmental threats',
        paragraphs: [
          'Demo copy describes nine unique monsters that respond to sounds, movement, and player behavior. Named patch references show that enemies and interactions were actively changing before Early Access.',
          'Different threats may reward different reactions, so the monster hub reports only triggers, behaviors, locations, and counterplay that can be sourced. Health, damage, and spawn rates are not inferred.',
        ],
      },
      {
        id: 'extract',
        heading: 'Return and extract with the loot',
        paragraphs: [
          'The return journey is part of the decision. A crew may have to choose between carrying more, protecting what it already has, helping a teammate, or simply making sure someone survives with the haul.',
          'Official language emphasizes bringing the valuables back and suggests that one survivor carrying the gold can matter. The live build will determine exact scoring, persistence, and chapter behavior.',
        ],
      },
      {
        id: 'equipment',
        heading: 'Weapons, consumables, and buffs',
        paragraphs: [
          'Pre-EA patches name utility items and weapons such as the Magnet, Rupor, Bell, knives, bomb, guillotine, and flashlight. A devlog also describes rum effects and Booty Stats.',
          'Names prove that a feature existed in a particular build; they do not prove current damage, ammo, price, duration, or acquisition. The item and effects hubs keep these systems separate until verified.',
        ],
      },
      {
        id: 'progression',
        heading: 'Progression: confirmed direction, unclear live details',
        paragraphs: [
          'The 1.0 direction includes deeper progression, and pre-EA sources mention Booty Stats and chapter save work. The exact Early Access progression loop is not yet safely documented.',
          'We will distinguish run-level decisions, persistent unlocks, chapter progress, cards, perks, and rum effects after the game exposes how they actually relate.',
        ],
      },
      {
        id: 'solo',
        heading: 'Solo play versus a crew',
        paragraphs: [
          'Steam lists single-player, so a solo run is an officially supported mode. The design and marketing still emphasize coordination, communication, shared hauling, and chaotic crew moments.',
          'Before live verification, we cannot claim solo scaling rules or name the best party size. The co-op guide owns lobby and player-count details while this page stays focused on the expedition loop.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the goal of a run?',
        answer:
          'Explore, collect and move valuables, survive the location, and bring the haul back for the captain.',
      },
      {
        question: 'Is it a co-op extraction game?',
        answer:
          'Yes. Official descriptions center on a one-to-four-player co-op loop of entering a dangerous location, collecting value, and returning with it.',
      },
    ],
    sourceIds: ['S01', 'S03', 'S04', 'S09'],
    related: [
      related('/beginner-guide', 'Beginner guide', 'Turn the loop into a first-run plan.'),
      related('/loot-and-extraction', 'Loot and extraction', 'Read the objective in more detail.'),
      related('/monsters', 'Monsters', 'Understand evidence-backed threat behavior.'),
      related('/coop', 'Co-op guide', 'Set up a one-to-four-player crew.'),
    ],
  },
  {
    route: '/beginner-guide',
    title: 'Last Pirates: Die Together Beginner Guide — First Run Tips',
    h1: 'Last Pirates: Die Together Beginner Guide',
    description:
      'A careful first-run guide built from verified mechanics: crew setup, sound awareness, elastic-arm control, loot decisions, and disconnect planning.',
    eyebrow: 'First expedition',
    directAnswer: [
      'For your first run, agree on how the crew will communicate, learn the object-handling controls, move deliberately, and favor bringing a smaller haul home over losing everything to greed.',
      'These tips are based on official Demo and pre-EA mechanics. They are not a claim about an unseen Early Access meta, best upgrade path, or exact map route.',
    ],
    buildContext: 'Demo-informed · EA recheck required',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Beginner Guide' }],
    heroImage: {
      src: '/images/game/official-key-art.jpg',
      alt: 'Official key art of a worried pirate crew carrying treasure',
      assetId: 'official-key-art',
    },
    sections: [
      {
        id: 'mission',
        heading: 'Know what your crew is trying to do',
        paragraphs: [
          'The mission is not to clear every room or defeat every threat. Your crew enters a cursed location to find valuables and return them. A run becomes successful through extraction, not curiosity alone.',
          'Keep that objective visible when the group debates another room. “Can we bring this home?” is a better beginner question than “Can we carry one more thing?”',
        ],
      },
      {
        id: 'before-run',
        heading: 'Before entering a run',
        paragraphs: [
          'Confirm who is hosting, which region the lobby uses, and whether everyone understands the basic grab and movement controls. Quick Join exists in the pre-EA patch history, but a planned crew should still establish a simple reconnect plan.',
          'Do not spend or consume unfamiliar equipment just to test every button. First identify its current-build purpose through an in-game description or verified guide entry.',
        ],
      },
      {
        id: 'awareness',
        heading: 'Stay aware of sound and movement',
        paragraphs: [
          'Official Demo copy says monsters can react to sounds, movement, and player behavior. Carrying and dismantling physical objects may therefore create more information and risk than walking through an empty corridor.',
          'Pause after a loud interaction. Keep one player able to watch the space around a bulky haul. This is a general risk-control habit, not a claim that every monster shares one detection rule.',
        ],
      },
      {
        id: 'arms',
        heading: 'Use stretchy arms deliberately',
        paragraphs: [
          'Elastic arms let you reach, grab, pull, and manipulate the environment. The same freedom can tangle movement, knock objects, or separate attention across a room.',
          'Practice small controlled grabs before trying to move the largest treasure. Make sure the path behind you is clear and avoid blocking the crew with an awkward object when a retreat begins.',
        ],
      },
      {
        id: 'greed',
        heading: 'Bring value home before greed wins',
        paragraphs: [
          'A haul still inside the manor is not a successful haul. When pressure rises, convert exploration into a return plan: identify who carries what, who watches the path, and which object can be abandoned first.',
          'No verified Early Access value table exists yet, so beginners should judge risk through obvious handling difficulty, distance, crew condition, and observed threats rather than invented efficiency scores.',
        ],
        callout: {
          type: 'field-note',
          title: 'Set a return threshold',
          body: 'Agree on a simple signal that ends the search and starts the trip home before panic makes the decision for you.',
        },
      },
      {
        id: 'items',
        heading: 'Learn an item before wasting it',
        paragraphs: [
          'Official patches name weapons, utility tools, a reworked flashlight, and rum effects, but many current statistics are unknown. A familiar name does not guarantee unchanged behavior in Early Access.',
          'Use current in-game descriptions first. Keep one utility option available for the return trip instead of spending everything during the search phase.',
        ],
      },
      {
        id: 'communication',
        heading: 'Use short crew calls',
        paragraphs: [
          'Useful calls describe an action and a location: “carrying out,” “noise behind,” “drop this,” or “return now.” Long explanations compete with the sounds and movement that may already matter.',
          'The official player range is one to four. More players create role flexibility, but they also create more movement, physics interactions, and possible confusion.',
        ],
      },
      {
        id: 'disconnect',
        heading: 'Know what to do after a disconnect',
        paragraphs: [
          'Pre-EA patches worked on reconnect screens, session synchronization, and host migration. If someone drops, avoid risky file edits or save deletion. Try the documented in-game flow and standard Steam checks first.',
          'Use the save-and-reconnect guide for build context. Demo-to-EA transfer remains unconfirmed, so never promise that a particular save will cross versions.',
        ],
      },
      {
        id: 'demo-habits',
        heading: 'Demo-specific habits may change',
        paragraphs: [
          'Silent Cove, known Demo behaviors, and patch-era items are valuable learning context. A new map, fresh monsters, and continued balance work mean route memory and exact counterplay may change quickly.',
          'Keep mechanics that are still visibly true; discard advice that depends on old spawn positions, numbers, or undocumented shortcuts.',
        ],
      },
      {
        id: 'launch-checks',
        heading: 'First things to verify after launch',
        paragraphs: [
          'Check the actual map choices, monster names, current item descriptions, lobby controls, save behavior, and settings. Then learn where the game communicates value and extraction progress.',
          'Reliable starter recommendations will be added only after direct live observation supports them. Until then, the most useful beginner skill is disciplined crew decision-making.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What should a beginner focus on first?',
        answer:
          'Learn object control, stay aware after noisy interactions, agree on simple crew calls, and prioritize returning a manageable haul.',
      },
      {
        question: 'Does this guide include the best Early Access upgrades?',
        answer:
          'Not before the live build is verified. No upgrade path is presented as optimal from Demo-era evidence.',
      },
    ],
    sourceIds: ['S01', 'S04', 'S07', 'S08'],
    related: [
      related('/gameplay', 'Gameplay explained', 'Understand the complete expedition loop.'),
      related('/coop', 'Co-op guide', 'Prepare a crew and lobby.'),
      related('/loot-and-extraction', 'Loot and extraction', 'Make safer haul decisions.'),
      related('/save-and-reconnect', 'Save and reconnect', 'Plan for a dropped session.'),
    ],
  },
] satisfies GuidePageData[];
