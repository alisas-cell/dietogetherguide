import type { GuidePageData } from './types';
import { related } from './types';

export const startPages: GuidePageData[] = [
  {
    route: '/release-date',
    title: 'Last Pirates: Die Together Release Date & Early Access Time',
    h1: 'Last Pirates: Die Together Release Date',
    description:
      'Last Pirates: Die Together is live in Steam Early Access as of Aug 18, 2026. See the release record, EA status, launch offer, and current availability.',
    eyebrow: 'Release record',
    directAnswer: [
      'Last Pirates: Die Together is out now in Steam Early Access. The official Steam store lists August 18, 2026 as the release date and now shows a purchase flow for the released Early Access game.',
      'SteamDB records August 18 at 17:01:40 UTC as its Steam release metadata. Steam is the source of truth for availability; the exact-time record is third-party metadata, not an official launch-time promise.',
    ],
    buildContext: 'Early Access live · checked Aug 19, 2026',
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
        heading: 'It is playable now',
        paragraphs: [
          'Steam changed from an unavailable listing to a released product page with an Add to Cart control. The page also labels the game as Early Access and dates both the release and Early Access release to August 18, 2026.',
          'That store state is the decisive release signal. A calendar date or countdown alone would not have been enough, which is why this guide stayed in prerelease mode until the purchase flow appeared.',
        ],
      },
      {
        id: 'release-record',
        heading: 'Actual release record',
        paragraphs: [
          'The two sources answer different questions. Steam proves current availability. SteamDB preserves a machine-readable timing record and should be read as a metadata proxy.',
        ],
        table: {
          headers: ['Source', 'Date or time', 'What it proves'],
          rows: [
            ['Steam', 'Aug 18, 2026', 'Official release date and current availability'],
            ['SteamDB', 'Aug 18, 2026 · 17:01:40 UTC', 'Third-party Steam release metadata record'],
          ],
        },
      },
      {
        id: 'launch-offer',
        heading: 'Introductory offer',
        paragraphs: [
          'Steam currently shows a 20% introductory discount ending September 1, 2026. Prices vary by region and can change, so this guide records the percentage and end date instead of presenting one currency as a worldwide price.',
          'The offer is a dated launch snapshot, not a permanent value claim. Check Steam in your own region before buying.',
        ],
      },
      {
        id: 'early-access',
        heading: 'August 18 was Early Access, not 1.0',
        paragraphs: [
          'The developers describe this release as a playable Early Access build and currently aim to stay in EA for six months or more. That target is not a promised 1.0 date.',
          'The stated 1.0 direction includes more locations, enemies and bosses, customization, deeper progression, more weapons, cursed loot, and more polish. Each remains a plan until a dated official update says it shipped.',
        ],
        links: [
          { href: '/early-access', label: 'See what the current EA statement confirms' },
          { href: '/roadmap', label: 'Separate delivered work from 1.0 plans' },
        ],
      },
      {
        id: 'demo',
        heading: 'Demo saves are still a separate question',
        paragraphs: [
          'The current store lists Steam Cloud. That proves the feature category is present, but it does not say which fields sync, how conflicts are handled, or whether Demo progress transfers to Early Access.',
          'Historical patch notes documented chapter saving and reconnect work in earlier builds. No checked first-party source confirms Demo-to-EA transfer, so the answer remains unknown.',
        ],
      },
      {
        id: 'launch-post',
        heading: 'The official launch post adds current build context',
        paragraphs: [
          'RetroStyle published “Last Pirates: Die Together is Now in Early Access” minutes after the recorded release. It names Ship and Castle, describes a group of launch enemies, and outlines new loot, cart, activity, tutorial, lighting, and customization work.',
          'That announcement supports current hub records. It does not reveal a complete roster, exact build number, numeric balance sheet, or map layout.',
        ],
      },
      {
        id: 'check',
        heading: 'Where to confirm the current state',
        paragraphs: [
          'Use the Steam product page for current availability, supported store features, requirements, discount status, and EA wording. Use official Steam News for launch content and later changes.',
          'SteamDB is useful for release metadata and update history, but it is not affiliated with Valve. Volatile player and price snapshots are not treated as evergreen guide facts.',
        ],
        links: [
          { href: '/system-requirements', label: 'Check the current PC minimums' },
          { href: '/faq', label: 'Read short release and co-op answers' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What time did Last Pirates: Die Together release?',
        answer: 'SteamDB records 17:01:40 UTC on Aug 18, 2026 as third-party Steam release metadata. The game is already live; Steam is the availability source of truth.',
      },
      {
        question: 'Is Aug 18 the full 1.0 release?',
        answer: 'No. August 18 was the Early Access release.',
      },
      {
        question: 'Will Demo saves transfer?',
        answer: 'No checked official source confirms Demo-to-Early-Access save transfer. Steam Cloud support does not answer that question by itself.',
      },
    ],
    sourceIds: ['S01', 'S05', 'S11'],
    related: [
      related('/early-access', 'Early Access guide', 'See the current official scope.'),
      related('/roadmap', 'Roadmap', 'Separate current content from plans.'),
      related('/system-requirements', 'PC requirements', 'Check the live Steam minimums.'),
      related('/faq', 'FAQ', 'Get short release and co-op answers.'),
    ],
  },
  {
    route: '/early-access',
    title: 'Last Pirates: Die Together Early Access — What’s Included',
    h1: 'Last Pirates: Die Together Early Access Guide',
    description:
      'Last Pirates: Die Together Early Access is live. See the current official scope, what is bigger than the Demo, EA duration target, and 1.0 plans.',
    eyebrow: 'Early Access · live',
    directAnswer: [
      'Last Pirates: Die Together entered Steam Early Access on August 18, 2026. The store describes it as playable online co-op for up to four players and bigger than the Demo, with more monsters, locations, content, and polish.',
      'The developers target six months or more in Early Access, with regular updates and major EA updates described as free. Exact monster, map, item, and progression details are published only when current evidence supports them.',
    ],
    buildContext: 'EA launch · checked Aug 19, 2026',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Early Access' }],
    heroImage: {
      src: '/images/updates/roadmap.jpg',
      alt: 'Official Last Pirates: Die Together roadmap graphic',
      assetId: 'official-roadmap',
    },
    sections: [
      {
        id: 'current-state',
        heading: 'What is live now',
        paragraphs: [
          'The store now presents a released Early Access product, not a future listing. Solo play, online co-op, Steam Cloud, and up-to-four-player support are all visible current store facts.',
          'The EA statement calls the build fully playable and says it contains everything seen in the Demo plus more. That is a qualitative scope statement, not proof that every Demo entity or rule stayed unchanged.',
        ],
      },
      {
        id: 'evidence-split',
        heading: 'Confirmed scope and open verification work',
        paragraphs: [
          'This table keeps store-level facts separate from details that need current entity or interface evidence.',
        ],
        table: {
          headers: ['Current official fact', 'Detail still being checked'],
          rows: [
            ['EA is live', 'Exact launch build or version string'],
            ['Solo + online co-op for up to four', 'Current scaling and balance rules'],
            ['More monsters', 'Complete roster and every behavior'],
            ['More locations', 'Complete location list and layouts'],
            ['More content and polish', 'Full item and progression inventory'],
            ['Steam Cloud listed', 'Save fields and Demo transfer'],
          ],
        },
      },
      {
        id: 'launch-additions',
        heading: 'The launch announcement names current additions',
        paragraphs: [
          'The official launch post identifies Ship and Castle as new locations. It also names Ear, Anchorer, Snake, Crab, Parrot, Sleeper, Mimic, and rat-king context, with short behavior descriptions for most of them.',
          'The same post describes a reworked cart, upgrades, a Monkey Assistant, more varied loot, break-apart large objects, Bar activities, instruments, skins, better lighting, and a finalized tutorial. Those facts are useful at hub level without inventing a full changelog.',
        ],
        links: [
          { href: '/monsters', label: 'See current and historical monster records' },
          { href: '/maps', label: 'See the live location records' },
        ],
      },
      {
        id: 'duration',
        heading: 'How long Early Access may last',
        paragraphs: [
          'The developer answer says six months or more and puts readiness ahead of a fixed date. It gives players a planning range, not a countdown to 1.0.',
          'A later delay or extension would not contradict the current statement. Follow dated official updates instead of calculating a final-release day from the minimum target.',
        ],
      },
      {
        id: 'updates',
        heading: 'Pricing and EA updates',
        paragraphs: [
          'The EA statement says every major update during Early Access will be free. The developers may raise the price at full release, but no final decision is stated.',
          'The current introductory discount ends September 1. Regional Steam pages decide the actual local price.',
        ],
      },
      {
        id: 'one-zero',
        heading: 'Planned direction toward 1.0',
        paragraphs: [
          'The current plan includes more locations, new enemies and bosses, character customization, deeper progression, more weapons, cursed loot, and broad polish.',
          'Those are direction statements. The site moves an item into the delivered column only when a current official update or recorded live-build capture supports it.',
        ],
        links: [
          { href: '/roadmap', label: 'Open the delivered-versus-planned roadmap' },
          { href: '/updates', label: 'Read the dated official timeline' },
        ],
      },
      {
        id: 'unknowns',
        heading: 'Facts the launch does not settle',
        paragraphs: [
          'The checked sources do not establish Demo-save transfer, exact current lobby paths, voice modes, full map layouts, a complete item economy, or stable numeric monster data.',
          'Leaving those fields blank is deliberate. A current release date should not turn uncertain mechanics into confident answers.',
        ],
      },
    ],
    faqs: [
      { question: 'Is Early Access live?', answer: 'Yes. Steam released the Early Access build on August 18, 2026.' },
      { question: 'How many players are supported?', answer: 'Current official sources support solo play and online co-op for up to four players.' },
      { question: 'Are major Early Access updates free?', answer: 'The current EA statement says every major update during Early Access will be free.' },
      { question: 'Is the complete EA roster known?', answer: 'No. The launch post confirms several named monsters, but it does not prove roster completeness.' },
    ],
    sourceIds: ['S01', 'S10', 'S11'],
    related: [
      related('/monsters', 'Monsters', 'Compare current confirmations with Demo records.'),
      related('/maps', 'Maps', 'See Ship, Castle, and Silent Cove evidence states.'),
      related('/items-and-weapons', 'Items & weapons', 'Track current and historical equipment facts.'),
      related('/roadmap', 'Roadmap', 'Separate current state from 1.0 plans.'),
      related('/updates', 'Updates', 'Read the dated launch and patch timeline.'),
    ],
  },
  {
    route: '/roadmap',
    title: 'Last Pirates: Die Together Roadmap — Early Access to 1.0',
    h1: 'Last Pirates: Die Together Roadmap',
    description:
      'A source-checked Last Pirates: Die Together roadmap separating the live Early Access launch from developer plans for the road to 1.0.',
    eyebrow: 'Delivered vs planned',
    directAnswer: [
      'Early Access launched on August 18, 2026. The live store says the current build is larger than the Demo, and the launch post names new locations, monsters, loot work, activities, cart systems, a tutorial, and visual improvements.',
      'The road to 1.0 still points toward more locations, enemies and bosses, customization, deeper progression, weapons, cursed loot, and polish. None of those broad plans carries a separate release date.',
    ],
    buildContext: 'EA launch delivered · 1.0 direction ongoing',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Roadmap' }],
    heroImage: { src: '/images/updates/roadmap.jpg', alt: 'Official Last Pirates: Die Together roadmap', assetId: 'official-roadmap' },
    sections: [
      {
        id: 'delivered',
        heading: 'Delivered at the Early Access launch',
        paragraphs: [
          'The game is now sold as a playable Early Access release. The official launch post identifies Ship and Castle, a new group of enemies, more varied loot, large objects that can be broken apart, and a reworked cart with upgrades.',
          'It also names a Monkey Assistant, Bar activities, instruments, skins, a finalized tutorial, and a lighting and visual overhaul. These are launch statements, not a guessed patch version.',
        ],
      },
      {
        id: 'current-scope',
        heading: 'Current high-level scope',
        paragraphs: [
          'Steam lists solo play, online co-op for up to four, Steam Cloud, and a build described as bigger than the Demo. The developers say tuning will continue across difficulty, enemy behavior, physics, co-op flow, and replayability.',
          'Individual current mechanics still need their own evidence. A delivered category does not prove every value, menu path, or entity relationship inside it.',
        ],
      },
      {
        id: 'planned',
        heading: 'Planned direction toward 1.0',
        paragraphs: [
          'The store names more locations, new enemies and bosses, character customization, deeper progression, more weapons, cursed loot, and general polish as the intended direction for 1.0.',
          'The list is not a dated sequence. It does not show which item arrives next, which update contains it, or whether the scope will change during EA.',
        ],
      },
      {
        id: 'timeline',
        heading: 'What has a date',
        paragraphs: [
          'The public Demo, its June and July patches, and the August 18 EA launch have dated evidence. The six-month-plus EA target is the only forward time range in the current store statement.',
        ],
        table: {
          headers: ['Period', 'State', 'Evidence'],
          rows: [
            ['Jun–Jul 2026', 'Historical Demo/pre-EA', 'Save, reconnect, Quick Join, and networking patches'],
            ['Aug 18, 2026', 'Delivered', 'Early Access launch and official launch announcement'],
            ['EA period', 'Ongoing', 'Regular updates; target is 6+ months'],
            ['1.0', 'No date', 'Direction only'],
          ],
        },
      },
      {
        id: 'free-updates',
        heading: 'Major EA updates are described as free',
        paragraphs: [
          'The current store statement says every major Early Access update will be free. It also says the price may increase at full release, with advance notice if that decision is made.',
          'This page will record a pricing decision only after the developers publish one. The launch discount is handled as a dated store offer, not a roadmap feature.',
        ],
      },
      {
        id: 'proof',
        heading: 'How a roadmap item becomes delivered',
        paragraphs: [
          'A current official announcement, a dated patch note, or a recorded first-party build capture can move an item from plan to delivered. Trailer inference and community expectation cannot.',
          'Build-sensitive details then go through the relevant map, monster, item, save, or co-op gate before appearing as current guidance.',
        ],
      },
      {
        id: 'follow',
        heading: 'Follow dated changes',
        paragraphs: [
          'Use the updates hub for official events and affected guide links. Use the Early Access page for the current store statement and the release page for the original launch record.',
          'This keeps the roadmap useful without turning broad ambitions into promises.',
        ],
        links: [
          { href: '/updates', label: 'Open the update timeline' },
          { href: '/early-access', label: 'Review the current EA scope' },
        ],
      },
    ],
    faqs: [
      { question: 'Did Early Access launch?', answer: 'Yes. Early Access launched on August 18, 2026.' },
      { question: 'When is 1.0?', answer: 'No 1.0 date is published. The current EA target is six months or more.' },
      { question: 'Are all planned features guaranteed?', answer: 'No. They are developer direction statements and can change during Early Access.' },
    ],
    sourceIds: ['S01', 'S02', 'S11'],
    related: [
      related('/release-date', 'Release date', 'Read the actual launch record.'),
      related('/early-access', 'Early Access', 'See the current official state.'),
      related('/updates', 'Updates', 'Follow dated changes.'),
      related('/items-and-weapons', 'Items & weapons', 'Track equipment evidence.'),
    ],
  },
  {
    route: '/gameplay',
    title: 'Last Pirates: Die Together Gameplay Explained',
    h1: 'How Last Pirates: Die Together Plays',
    description:
      'How Last Pirates: Die Together works in Early Access: elastic-arm physics, loot hauling, monster pressure, survival, extraction, and 1–4 player co-op.',
    eyebrow: 'Gameplay loop',
    directAnswer: [
      'Last Pirates: Die Together is a physics-driven extraction horror game now live in Early Access. You pull apart or grab objects with elastic arms, collect valuables, move the haul back toward the ship, and survive the threats that interrupt the return.',
      'The current store supports solo play and online co-op for up to four. The launch announcement adds Ship and Castle, a named group of monsters, more varied loot, cart upgrades, activities, and a finalized tutorial.',
    ],
    buildContext: 'EA launch · official gameplay scope',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Gameplay' }],
    heroImage: { src: '/images/game/feature-elastic-arms.webp', alt: 'Official gameplay art showing elastic-arm object interaction', assetId: 'feature-elastic-arms' },
    sections: [
      {
        id: 'mission',
        heading: 'The mission',
        paragraphs: [
          'Explore dangerous locations, find valuables, and bring the money back aboard for the captain. The store warns that greed pushes crews deeper while at least one survivor still needs to carry the gold out.',
          'No fixed extraction threshold or deposit button is described here because the current interface has not been captured for this guide.',
        ],
      },
      {
        id: 'arms',
        heading: 'Elastic arms and physical interaction',
        paragraphs: [
          'Players can grab furniture, dismantle doors, drag objects, and manipulate the environment with unusually stretchy arms. Hauling is a physical action, not a simple inventory transfer.',
          'The launch post says larger loot can now be broken apart and carried in pieces. It does not publish weight formulas, reach limits, or value-loss rules for the current build.',
        ],
      },
      {
        id: 'locations',
        heading: 'Current locations',
        paragraphs: [
          'Ship has tight decks, rigging, and dark corners. Castle is described as larger and colder, with heavy loot, elevators, and funiculars. Both are named in the official EA launch post.',
          'Silent Cove remains documented as the public Demo location. The current launch evidence does not name it, so the map hub keeps it in a separate historical section.',
        ],
        links: [{ href: '/maps', label: 'Compare live and Demo map records' }],
      },
      {
        id: 'monsters',
        heading: 'Monster pressure',
        paragraphs: [
          'The launch post describes enemies that react to sound or sight, restrain players, steal loot, call other threats, imitate teammates, or chase persistently after being awakened.',
          'Each named monster keeps its own evidence. The site does not infer damage, health, spawn rates, or universal counterplay from those short descriptions.',
        ],
        links: [{ href: '/monsters', label: 'Open the evidence-gated monster hub' }],
      },
      {
        id: 'crew',
        heading: 'Solo and co-op',
        paragraphs: [
          'Steam lists both single-player and online co-op, with up to four players. The developer FAQ says voice chat is supported and recommends checking that friends use the same region when connection problems appear.',
          'Exact voice modes, lobby filters, and current menu paths remain interface questions. The co-op pages do not invent them.',
        ],
        links: [{ href: '/coop', label: 'Set up a crew with current confirmed facts' }],
      },
      {
        id: 'loot',
        heading: 'Loot, cart, and return decisions',
        paragraphs: [
          'The cart received a physics rework and named upgrades, while the Monkey Assistant can collect small loot and return it to the boat. These are launch-level facts without hidden stats or acquisition rates.',
          'Most practical decisions still come down to crew condition, path safety, threat pressure, and whether the haul can be moved without losing the run.',
        ],
        links: [{ href: '/loot-and-extraction', label: 'Read the current loot and return guide' }],
      },
      {
        id: 'progression',
        heading: 'Progression and persistence remain separate systems',
        paragraphs: [
          'Historical patches documented chapter saving, and the current store lists Steam Cloud. The checked sources do not define every persistent field, run recovery rule, or Demo-transfer outcome.',
          'Rum is visibly present in the launch announcement, but numeric effects and its relationship with Demo-era Booty Stats still need current system evidence.',
        ],
      },
    ],
    faqs: [
      { question: 'What do you do in Last Pirates: Die Together?', answer: 'Find and move valuables, return the haul toward the ship, and survive the location and its monsters.' },
      { question: 'Can it be played solo?', answer: 'Yes. Steam lists single-player alongside online co-op for up to four.' },
      { question: 'Are Ship and Castle live?', answer: 'Yes. The official EA launch announcement names both as brand-new locations.' },
    ],
    sourceIds: ['S01', 'S10', 'S11'],
    related: [
      related('/beginner-guide', 'Beginner guide', 'Prepare for a first run.'),
      related('/loot-and-extraction', 'Loot & extraction', 'Plan the haul and return.'),
      related('/monsters', 'Monsters', 'Read current threat evidence.'),
      related('/maps', 'Maps', 'See live location records.'),
      related('/coop', 'Co-op', 'Review crew facts and recovery links.'),
    ],
  },
  {
    route: '/beginner-guide',
    title: 'Last Pirates: Die Together Beginner Guide — First Run Tips',
    h1: 'Last Pirates: Die Together Beginner Guide',
    description:
      'A current Last Pirates: Die Together beginner guide for the Early Access loop, elastic-arm physics, loot discipline, crew communication, threats, and recovery.',
    eyebrow: 'First-run field note',
    directAnswer: [
      'Last Pirates: Die Together is live in Early Access. The basic loop is to explore, use elastic arms and physics to free or grab valuables, move loot back toward the ship, and keep enough of the crew alive to bring the gold out.',
      'For a first run, learn the physical grab-and-drag behavior, avoid committing every player to one awkward object, agree on a retreat call, and treat monster-specific advice as build-sensitive unless the current registry supports it.',
    ],
    buildContext: 'EA launch · conceptual steps where UI is unverified',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Beginner Guide' }],
    heroImage: { src: '/images/game/official-key-art.jpg', alt: 'Official art showing a pirate crew, treasure, and threats', assetId: 'official-key-art' },
    sections: [
      {
        id: 'goal',
        heading: 'What you are trying to do',
        paragraphs: [
          'Search the location for valuable objects, dismantle or grab them, and bring the money back aboard. The mission rewards curiosity, but the store makes survival part of the objective: someone still has to get the gold out.',
          'The current guide avoids a fake quota, deposit trigger, or button path. Those details need a current interface capture.',
        ],
        links: [{ href: '/gameplay', label: 'See the full gameplay loop' }],
      },
      {
        id: 'first-minutes',
        heading: 'Your first five minutes',
        paragraphs: [
          'Use the finalized in-game tutorial first. Learn how the current build teaches grabbing, moving, rum, treasure hand-in, and upgrades before copying advice from an older Demo video.',
          'Then test one object with the crew nearby. Watch how it moves, how much room it needs, and who can release it quickly. This builds a shared handling rhythm without assuming a specific keybind.',
        ],
      },
      {
        id: 'physics',
        heading: 'Treat hauling as a physics problem',
        paragraphs: [
          'Elastic arms let you pull on doors, furniture, treasure, and other objects. More hands can help, but conflicting pulls can also waste time or block a narrow path.',
          'Choose one caller for an awkward object and leave another pirate free to watch the route. These are editorial crew roles, not fixed game classes.',
        ],
      },
      {
        id: 'loot',
        heading: 'Leave before greed decides for you',
        paragraphs: [
          'A new object is useful only if the crew can still move it home. Check the return path, current threat, available hands, and crew condition before taking on another burden.',
          'The launch build has more varied loot and allows some larger objects to be broken apart. No current value table supports a best-loot ranking.',
        ],
        links: [
          { href: '/loot-and-extraction', label: 'Use the current extraction checklist' },
          { href: '/items-and-weapons', label: 'See evidence-backed item records' },
        ],
      },
      {
        id: 'communication',
        heading: 'Make a simple crew plan',
        paragraphs: [
          'Decide who hosts, which region the crew uses, what the return call sounds like, and what to try if someone disconnects. The developer FAQ confirms voice chat and same-region advice, but current voice modes and menu paths still need interface proof.',
          'If you use public crews, keep Quick Join, reconnect, and troubleshooting pages open. Their safe checks start with the updated client and current in-game flow.',
        ],
        links: [
          { href: '/coop', label: 'Review current co-op facts' },
          { href: '/troubleshooting', label: 'Open safe launch-week checks' },
        ],
      },
      {
        id: 'threats',
        heading: 'React to the threat you can verify',
        paragraphs: [
          'Ear hunts by sound, Anchorer uses sight and range, Snake pins players, Crab threatens loot and position, and Parrot calls other enemies. These launch-post descriptions help with awareness but do not form a complete bestiary.',
          'Do not assume a Demo monster kept the same behavior. Check the current evidence label before relying on a specific counter.',
        ],
        links: [
          { href: '/monsters', label: 'Read the live and historical threat split' },
          { href: '/maps', label: 'Review current location evidence' },
        ],
      },
      {
        id: 'mistakes',
        heading: 'Common first-run mistakes',
        paragraphs: [
          'Crews often overcommit to one object, split without a return call, or try destructive PC fixes before the in-game recovery path. Another easy mistake is treating a Demo behavior as current without checking its build label.',
          'After a disconnect, protect local progress and use reversible steps. Steam Cloud is listed, but that is not permission to delete files or assume the run will restore every field.',
        ],
      },
    ],
    faqs: [
      { question: 'What should I do first?', answer: 'Use the current tutorial, test the grab-and-drag physics, agree on a return call, and move one manageable piece of loot.' },
      { question: 'Should one player always stay at the ship?', answer: 'No current official or tested evidence supports that as a universal rule. Assign crew roles based on the run in front of you.' },
      { question: 'What carries between runs?', answer: 'Steam Cloud is listed and historical chapter saving exists, but exact current persistence fields still need verification.' },
    ],
    sourceIds: ['S01', 'S10', 'S11'],
    related: [
      related('/gameplay', 'Gameplay', 'Understand the full loop.'),
      related('/loot-and-extraction', 'Loot & extraction', 'Plan the return.'),
      related('/monsters', 'Monsters', 'Check current threat evidence.'),
      related('/maps', 'Maps', 'See live and Demo location states.'),
      related('/coop', 'Co-op', 'Prepare the crew.'),
      related('/items-and-weapons', 'Items & weapons', 'Keep item claims evidence-backed.'),
      related('/troubleshooting', 'Troubleshooting', 'Use reversible recovery checks.'),
    ],
  },
];
