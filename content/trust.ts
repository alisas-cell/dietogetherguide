import type { GuidePageData } from './types';
import { related } from './types';

export const trustPages = [
  {
    route: '/updates',
    title: 'Last Pirates: Die Together Updates & Patch Notes',
    h1: 'Last Pirates: Die Together Updates',
    description:
      'A concise official update timeline for Last Pirates: Die Together, with patch summaries connected to the guides and systems they affect.',
    eyebrow: 'Build log',
    directAnswer: [
      'The current public state is still pre-Early Access. The most important recent official milestones are the Aug 18 date announcement, July’s Quick Join and networking rework, and June’s save/reconnect patch.',
      'This page summarizes changes rather than copying complete patch notes. Each entry links to the durable guide that needs rechecking.',
    ],
    buildContext: 'Official updates · Checked Aug 17',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Updates' }],
    heroImage: {
      src: '/images/updates/roadmap.jpg',
      alt: 'Official 2026 Last Pirates: Die Together roadmap',
      assetId: 'roadmap-2026',
    },
    sections: [
      {
        id: 'status',
        heading: 'Current build and release status',
        paragraphs: [
          'Steam still labels the game unavailable at the Aug 17 check and plans Early Access for Aug 18. SteamDB also reports a prerelease state. No launch patch is presented as shipped before the store actually unlocks.',
          'The central release snapshot controls this wording across the site. A news post alone will not flip the live badge if players still cannot purchase, install, or play.',
        ],
      },
      {
        id: 'ea-date',
        heading: 'Jul 21: Early Access date and content promise',
        paragraphs: [
          'RetroStyle announced Aug 18 for Early Access, a brand-new map, fresh monsters, and major Demo milestones including more than 205,000 Demo players and more than 100,000 wishlists.',
          'The announcement updates release, Early Access, map, and monster hubs. It does not identify a live map name or complete monster roster.',
        ],
        bullets: [
          'Affected guides: release date, Early Access, maps, monsters.',
          'Evidence state: official announcement; opening content not yet live-verified.',
        ],
      },
      {
        id: 'quick-join',
        heading: 'Jul 7: Quick Join and networking rework',
        paragraphs: [
          'The July update added Quick Join for public lobbies and described substantial work on reconnect, host migration, and session synchronization. It also mentioned Steam Deck support, FOV, and invert-Y improvements.',
          'That patch is the authoritative history for Quick Join’s existence. The opening-build menu flow and remaining issues still need a fresh check.',
        ],
        bullets: [
          'Affected guides: co-op, Quick Join, save/reconnect, troubleshooting, requirements.',
          'Evidence state: official pre-EA patch.',
        ],
      },
      {
        id: 'save',
        heading: 'Jun 19: save, reconnect, and flashlight work',
        paragraphs: [
          'The June patch documented chapter progress saving, a return-to-lobby flow, and a dedicated reconnect screen. It also named Magnet, Rupor, and a flashlight rework in its Demo-era item context.',
          'The entry updates save/reconnect and item evidence but does not prove Demo-to-EA transfer or unchanged equipment behavior.',
        ],
        bullets: [
          'Affected guides: save and reconnect, troubleshooting, items and weapons.',
          'Evidence state: official Demo/pre-EA patch.',
        ],
      },
      {
        id: 'devlog',
        heading: 'May 28: rum effects and Booty Stats context',
        paragraphs: [
          'An official devlog described rum effects, including positive examples and possible negative side effects, and introduced Booty Stats as an upgrade context.',
          'These concepts remain separated in the effects hub until the live game verifies their names, persistence, relationship, and current values.',
        ],
      },
      {
        id: 'release-day',
        heading: 'Release-day patch section',
        paragraphs: [
          'No release-day patch is recorded as shipped yet. Once the store unlocks, official notes will be summarized here with their affected systems and evidence timestamp.',
          'The update workflow flags connected monster, map, co-op, save, item, and progression records for review instead of silently assuming that older advice survives a patch.',
        ],
        callout: {
          type: 'build-check',
          title: 'Launch entry pending real unlock',
          body: 'The timeline will add a shipped Early Access event only after official availability is independently confirmed.',
        },
      },
      {
        id: 'method',
        heading: 'How update summaries change guides',
        paragraphs: [
          'Every patch record includes source IDs, change categories, and affected routes. A reconnect change points to the save guide; an enemy change flags monster behavior and counterplay; a map change flags location relationships.',
          'This keeps patch notes actionable. Readers can move from “what changed” to the maintained guide rather than reading an isolated announcement archive.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is there a launch patch yet?',
        answer:
          'Not in the verified ledger at the Aug 17 pre-release check. A launch entry will wait for actual Steam availability and an official build signal.',
      },
      {
        question: 'Are full patch notes copied here?',
        answer:
          'No. The page provides concise summaries and links to official sources and affected field-guide pages.',
      },
    ],
    sourceIds: ['S02', 'S07', 'S08', 'S09'],
    related: [
      related('/release-date', 'Release date', 'Track the actual availability state.'),
      related('/roadmap', 'Roadmap', 'Separate shipped changes from plans.'),
      related('/coop/quick-join', 'Quick Join', 'Read the July feature context.'),
      related('/save-and-reconnect', 'Save and reconnect', 'See the June/July recovery history.'),
    ],
  },
  {
    route: '/faq',
    title: 'Last Pirates: Die Together FAQ — Release, Co-op, Demo & More',
    h1: 'Last Pirates: Die Together FAQ',
    description:
      'Direct, source-checked answers about the Last Pirates: Die Together release date, Early Access, co-op, Demo, saves, Quick Join, and Steam Deck.',
    eyebrow: 'Fast answers',
    directAnswer: [
      'Last Pirates: Die Together is planned to enter Early Access on Aug 18, 2026 for one to four players. At the Aug 17 check, Steam still says the game is not yet available.',
      'The answers below distinguish official Demo and pre-EA history from details that still need verification in the opening build.',
    ],
    buildContext: 'Pre-EA FAQ · Checked Aug 17',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'FAQ' }],
    sections: [
      {
        id: 'release',
        heading: 'Release and Early Access',
        paragraphs: [
          'Steam lists Aug 18, 2026. A SteamDB snapshot points to 17:00 UTC, but that minute remains metadata until the store unlocks. The opening is Early Access, not 1.0.',
          'The developers aim for six months or more in Early Access and say readiness will matter more than a fixed final-release date.',
        ],
      },
      {
        id: 'players',
        heading: 'Players, solo, and public crews',
        paragraphs: [
          'Official Steam information supports one to four players, with both single-player and online co-op listed. A July patch added Quick Join for public lobbies.',
          'The exact live region options, lobby screens, and voice-chat behavior still need opening-build verification.',
        ],
      },
      {
        id: 'demo',
        heading: 'Demo and map context',
        paragraphs: [
          'The Demo centered on Silent Cove and advertised nine unique monsters. Early Access is promised to include a new map, fresh monsters, and more content and polish.',
          'The current sources do not confirm how long the Demo remains available or whether Demo saves transfer.',
        ],
      },
      {
        id: 'saves',
        heading: 'Save and reconnect context',
        paragraphs: [
          'June and July patches documented chapter progress saving, a reconnect screen, host migration, and session-synchronization work in pre-EA builds.',
          'Those features establish development history but do not guarantee every run can be recovered or define all Early Access persistence rules.',
        ],
      },
      {
        id: 'deck',
        heading: 'Steam Deck and requirements',
        paragraphs: [
          'A July patch mentions Steam Deck support fixes, but this guide does not claim Valve Verified status without a current Steam badge. The minimum PC listing currently calls for 8 GB RAM, a GTX 1050 equivalent, and 5 GB storage.',
          'Requirements and compatibility are rechecked at launch because store listings can change.',
        ],
      },
      {
        id: 'accuracy',
        heading: 'How these answers stay accurate',
        paragraphs: [
          'Version-sensitive answers use a build label, checked date, confidence state, and source IDs. Pending-verification fields are never rendered as affirmative answers.',
          'After unlock, hubs are updated before detail pages. This avoids a fast but false “complete wiki” built from Demo assumptions.',
        ],
      },
    ],
    faqs: [
      {
        question: 'When does Last Pirates: Die Together release?',
        answer:
          'Steam lists Aug 18, 2026 for Early Access. The game remained unavailable at our Aug 17 check.',
      },
      {
        question: 'Is it Early Access?',
        answer: 'Yes. Aug 18 is described as the planned Early Access opening, not 1.0.',
      },
      {
        question: 'How many players can play together?',
        answer: 'Official Steam information supports one to four players.',
      },
      {
        question: 'Can you play solo?',
        answer: 'Yes. Steam lists single-player as well as online co-op.',
      },
      {
        question: 'Is the Demo still available?',
        answer:
          'A separate Demo app is documented, but its post-launch availability is not guaranteed by the current source set.',
      },
      {
        question: 'Does Early Access have new maps and monsters?',
        answer:
          'Official announcements promise a brand-new map and fresh monsters; exact live names and quantities remain pending before unlock.',
      },
      {
        question: 'How long will Early Access last?',
        answer: 'The current developer target is six months or more.',
      },
      {
        question: 'Does the game have Quick Join?',
        answer: 'An official July pre-EA patch added Quick Join for public lobbies.',
      },
      {
        question: 'Does progress save?',
        answer:
          'A June Demo patch documented chapter progress saving. Exact Early Access persistence and Demo transfer remain unconfirmed.',
      },
      {
        question: 'Is Steam Deck supported?',
        answer:
          'Official patches mention Steam Deck support fixes, but this guide does not claim Valve Verified status without a current store badge.',
      },
    ],
    sourceIds: ['S01', 'S02', 'S04', 'S05', 'S07', 'S08'],
    related: [
      related('/release-date', 'Release date', 'See the timestamp conversion and status gate.'),
      related('/early-access', 'Early Access', 'Compare confirmed plans with open questions.'),
      related('/coop', 'Co-op guide', 'Read detailed party and lobby context.'),
      related('/troubleshooting', 'Troubleshooting', 'Use safe issue checks.'),
    ],
  },
  {
    route: '/about',
    title: 'About Die Together Guide — Independent Field Guide',
    h1: 'About Die Together Guide',
    description:
      'How this independent Last Pirates: Die Together fan guide sources, labels, checks, and corrects version-sensitive information.',
    eyebrow: 'Trust & method',
    directAnswer: [
      'Die Together Guide is an independent, fan-made field guide for Last Pirates: Die Together. It is not affiliated with RetroStyle Games, Judatone Studios, Elegoose Games, Valve, or Steam.',
      'Its purpose is to make release, co-op, map, monster, loot, and troubleshooting answers useful without turning Demo-era evidence into false live facts.',
    ],
    buildContext: 'Editorial policy · Aug 17, 2026',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'About' }],
    sections: [
      {
        id: 'purpose',
        heading: 'Why the guide exists',
        paragraphs: [
          'Players need short operational answers while a fast-changing Early Access game creates incomplete or conflicting information. The guide turns official announcements, patch notes, and directly verified build observations into durable player-intent pages.',
        ],
      },
      {
        id: 'method',
        heading: 'Editorial method',
        paragraphs: [
          'Each version-sensitive claim carries a source, checked time, build context, and confidence level. Official sources take precedence; community reports remain labeled and pending fields are never rendered as facts.',
        ],
      },
      {
        id: 'corrections',
        heading: 'Corrections and updates',
        paragraphs: [
          'Material corrections update the typed registry and every route that consumes the fact. Reports should include the route, current build, claim, and a source or repeatable observation through the contact channel.',
        ],
      },
    ],
    faqs: [],
    sourceIds: ['S01'],
    related: [
      related('/contact', 'Contact and corrections', 'Report a source or build discrepancy.'),
      related('/updates', 'Update log', 'See how patches affect guides.'),
      related('/privacy', 'Privacy', 'Review the site’s actual data practices.'),
    ],
  },
  {
    route: '/contact',
    title: 'Contact Die Together Guide — Corrections & Sources',
    h1: 'Contact Die Together Guide',
    description:
      'Report a correction, submit an official source, or describe a repeatable build-specific issue through the public project tracker.',
    eyebrow: 'Corrections desk',
    directAnswer: [
      'For corrections and source feedback, use the public GitHub issue tracker for this guide. Do not include account credentials, private save files, personal identifiers, or confidential material.',
      'A useful report names the affected route, game build, statement that needs review, and a first-party link or repeatable observation.',
    ],
    buildContext: 'Public project tracker',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Contact' }],
    sections: [
      {
        id: 'report',
        heading: 'Report a correction',
        paragraphs: [
          'Open an issue at the guide repository and use a concise title. Include the page URL, current wording, proposed correction, source URL, and date checked. The tracker is public, so remove personal details before submitting.',
        ],
        bullets: [
          'Best evidence: official Steam store, official news, developer post, or clearly documented current-build observation.',
          'Never share passwords, authentication codes, account IDs, or private logs.',
        ],
        links: [
          {
            href: 'https://github.com/alisas-cell/dietogetherguide/issues',
            label: 'Open the public correction tracker',
          },
        ],
      },
      {
        id: 'response',
        heading: 'How reports are handled',
        paragraphs: [
          'A report is checked against source precedence and build context. Confirmed changes update the registry, freshness note, affected guides, metadata if necessary, and tests. Unresolved community observations remain labeled rather than promoted.',
        ],
      },
    ],
    faqs: [],
    sourceIds: ['S01'],
    related: [
      related('/about', 'About the guide', 'Read the full editorial method.'),
      related('/privacy', 'Privacy', 'Understand public tracker and site data.'),
      related('/terms', 'Terms', 'Review site-use and accuracy limits.'),
    ],
  },
  {
    route: '/privacy',
    title: 'Privacy Policy — Die Together Guide',
    h1: 'Privacy Policy',
    description:
      'The privacy policy for Die Together Guide, covering current analytics, storage, external links, public correction reports, and future changes.',
    eyebrow: 'Policy',
    directAnswer: [
      'This V1 does not use advertising, account registration, contact forms, analytics scripts, or gameplay-tool localStorage. Normal hosting infrastructure may process request data needed to deliver and secure the site.',
      'Correction reports use an external public GitHub issue tracker and are governed by GitHub’s privacy terms. Do not post sensitive information there.',
    ],
    buildContext: 'Effective Aug 17, 2026',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Privacy' }],
    sections: [
      {
        id: 'collection',
        heading: 'Information this site collects',
        paragraphs: [
          'The site does not ask visitors to create an account or submit personal information. It does not currently load third-party advertising or analytics code. The hosting provider may retain standard request, security, and performance logs under its own terms.',
        ],
      },
      {
        id: 'storage',
        heading: 'Cookies and local storage',
        paragraphs: [
          'The current guide and co-op troubleshooter do not require cookies or localStorage for their own operation. If a future tool stores optional preferences, this policy and the tool UI will disclose the key and purpose before release.',
        ],
      },
      {
        id: 'external',
        heading: 'External links and corrections',
        paragraphs: [
          'Links to Steam, RetroStyle Games, SteamDB, and GitHub lead to third-party services with separate privacy practices. GitHub issues are public; users are responsible for removing personal or confidential information before posting.',
        ],
      },
      {
        id: 'changes',
        heading: 'Policy changes',
        paragraphs: [
          'If analytics, ads, forms, accounts, embeds, or local preferences are enabled later, the policy will be revised to match the actual configuration and the effective date will change.',
        ],
      },
    ],
    faqs: [],
    sourceIds: ['S01'],
    related: [
      related('/about', 'About', 'See the independent editorial policy.'),
      related('/contact', 'Contact', 'Use the public corrections path.'),
      related('/terms', 'Terms', 'Review site-use conditions.'),
    ],
  },
  {
    route: '/terms',
    title: 'Terms of Use — Die Together Guide',
    h1: 'Terms of Use',
    description:
      'Terms for using Die Together Guide, including fan-site status, informational limits, trademarks, external links, and acceptable use.',
    eyebrow: 'Policy',
    directAnswer: [
      'Die Together Guide provides informational fan-made content as-is. Game systems can change between the Demo, Early Access builds, and later patches, so readers should confirm critical current details in the game and official sources.',
      'The site is not affiliated with or endorsed by the game’s developers, publishers, Valve, or Steam. Game names, artwork, and trademarks belong to their respective owners.',
    ],
    buildContext: 'Effective Aug 17, 2026',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Terms' }],
    sections: [
      {
        id: 'use',
        heading: 'Informational use',
        paragraphs: [
          'You may use the public guides for personal informational purposes. Do not rely on version-sensitive advice as a warranty that a mechanic, service, save, or platform feature will behave identically in every build.',
        ],
      },
      {
        id: 'accuracy',
        heading: 'Accuracy and availability',
        paragraphs: [
          'The project makes reasonable efforts to cite and date claims, but information can become outdated and the site may be interrupted or changed. No guarantee is made that every page is error-free or continuously available.',
        ],
      },
      {
        id: 'rights',
        heading: 'Trademarks and media',
        paragraphs: [
          'Last Pirates: Die Together, related names, official artwork, and logos remain the property of their respective rights holders. The guide uses attributed official media for editorial identification and does not claim ownership or official status.',
        ],
      },
      {
        id: 'conduct',
        heading: 'Acceptable use and external services',
        paragraphs: [
          'Do not interfere with site operation, misrepresent the guide as official, or use the public correction channel to expose sensitive data. External services linked from the site have their own terms and are not controlled by this project.',
        ],
      },
    ],
    faqs: [],
    sourceIds: ['S01'],
    related: [
      related('/about', 'About', 'Read the fan-site and sourcing policy.'),
      related('/privacy', 'Privacy', 'See the current data practices.'),
      related('/contact', 'Contact', 'Report a factual correction.'),
    ],
  },
] satisfies GuidePageData[];
