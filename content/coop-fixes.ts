import type { GuidePageData } from './types';
import { related } from './types';

export const coopFixPages = [
  {
    route: '/coop',
    title: 'Last Pirates: Die Together Co-op Guide — Players, Voice & Lobbies',
    h1: 'Last Pirates: Die Together Co-op Guide',
    description:
      'How Last Pirates: Die Together co-op works for 1–4 players, including solo play, public lobbies, Quick Join, reconnect, and voice-chat caveats.',
    eyebrow: 'Crew operations',
    directAnswer: [
      'Last Pirates: Die Together supports one to four players and is built around online co-op. Steam also lists single-player, so solo play is officially supported even though the design emphasizes crew communication and shared physics work.',
      'Quick Join, reconnect, and host-migration improvements are documented in pre-EA patches. Exact launch UI, voice-chat behavior, and region performance still require live verification.',
    ],
    buildContext: 'Official co-op facts · Opening UI pending',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Co-op' }],
    heroImage: {
      src: '/images/game/steam-page-background.jpg',
      alt: 'Official art showing a pirate crew hauling loot together',
      assetId: 'steam-page-background',
    },
    sections: [
      {
        id: 'player-count',
        heading: 'How many players can join?',
        paragraphs: [
          'Official Steam descriptions consistently say up to four players, and the feature list includes both single-player and online co-op. The supported party range is therefore one to four.',
          'That number does not tell us whether enemy pressure, loot, or objectives scale in a particular way. Party-size balance belongs to live-build research.',
        ],
      },
      {
        id: 'solo',
        heading: 'Can you play solo?',
        paragraphs: [
          'Yes, Steam lists single-player. A solo pirate still has to handle observation, object movement, threat response, and the return trip without teammates dividing those jobs.',
          'The official marketing focuses on shared chaos and cooperation, but this guide does not claim that solo is unsupported or name an optimal crew size before observing current scaling.',
        ],
      },
      {
        id: 'public-lobbies',
        heading: 'Public lobbies and Quick Join',
        paragraphs: [
          'A July pre-EA patch added Quick Join so players could enter public lobbies without relying only on a premade group. The same update described region choice and significant session work.',
          'The historical existence is confirmed. The exact buttons, filters, fallback behavior, and waiting flow in Early Access are not asserted until the opening client is checked.',
        ],
      },
      {
        id: 'crew-setup',
        heading: 'Crew setup and region considerations',
        paragraphs: [
          'Choose a sensible region, confirm who is hosting, and make sure every player has finished updating before diagnosing a lobby problem. A version mismatch or distant region can look like a broken co-op system.',
          'For a planned group, agree on one person who will recreate the lobby if the host disappears. This is a reversible coordination step, not a promise about how host migration resolves every case.',
        ],
      },
      {
        id: 'resilience',
        heading: 'Reconnect and host-migration context',
        paragraphs: [
          'Official June and July patches added or repaired a reconnect screen, session synchronization, and host migration behavior. The patch history shows the systems were active development areas before launch.',
          'Use the dedicated save-and-reconnect guide for symptoms after a dropped run. It separates in-game flow, standard Steam steps, and any future community workarounds.',
        ],
      },
      {
        id: 'voice',
        heading: 'Voice chat status',
        paragraphs: [
          'The official store lists in-game chat as an interactive element, but the current source ledger does not establish the exact voice-chat implementation, range model, push-to-talk controls, or launch-build defaults.',
          'Use platform or external crew communication if needed, and verify current in-game settings before assuming a microphone problem is a network failure.',
        ],
        callout: {
          type: 'build-check',
          title: 'Voice details pending',
          body: 'This guide will state the live voice flow only after the opening build exposes it clearly.',
        },
      },
      {
        id: 'controls',
        heading: 'Steam Deck and control considerations',
        paragraphs: [
          'A July patch mentioned Steam Deck support fixes, FOV, invert-Y, and control-related work. That is not equivalent to Valve Verified status or a guarantee of flawless handheld play.',
          'The requirements page keeps official store minimums and Deck qualification together. Recheck input prompts and settings after each significant build.',
        ],
      },
      {
        id: 'problems',
        heading: 'Common co-op problems',
        paragraphs: [
          'If no public lobby appears, confirm release availability, client version, region, and Steam connectivity before changing system settings. If a run disconnects, use the in-game reconnect flow before restarting the entire crew.',
          'Do not download networking fixes, disable security globally, or delete saves as a first step. The troubleshooter prioritizes documented and reversible actions.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How many people can play Last Pirates: Die Together?',
        answer: 'One to four players are supported according to the official Steam page.',
      },
      {
        question: 'Can I play without friends?',
        answer:
          'Yes. Steam lists single-player, and pre-EA patches document Quick Join for public lobbies.',
      },
      {
        question: 'Does the game have voice chat?',
        answer:
          'The store lists in-game chat, but exact current voice-chat behavior is not yet verified for Early Access.',
      },
    ],
    sourceIds: ['S01', 'S07', 'S08'],
    related: [
      related('/coop/quick-join', 'Quick Join', 'Read the public-lobby history and safe checks.'),
      related('/save-and-reconnect', 'Save and reconnect', 'Handle a dropped session.'),
      related('/troubleshooting', 'Troubleshooting', 'Work through reversible fixes.'),
      related('/beginner-guide', 'Beginner guide', 'Prepare the crew for a first run.'),
    ],
  },
  {
    route: '/coop/quick-join',
    title: 'Last Pirates: Die Together Quick Join — Public Lobby Guide',
    h1: 'How Quick Join Works in Last Pirates: Die Together',
    description:
      'What the official Quick Join patch added, how public-lobby and region context worked pre-EA, and safe checks when no lobby appears.',
    eyebrow: 'Public crew finder',
    directAnswer: [
      'Quick Join was added in the official July 7 pre-EA patch to help players enter public lobbies. That patch also described region choice, reconnect, session synchronization, and host-migration work.',
      'The feature history is confirmed, but this guide does not invent the exact Early Access menu path or promise that a lobby is always available in every region.',
    ],
    buildContext: 'Jul 7 official patch · Live flow pending',
    confidence: 'confirmed',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Co-op', href: '/coop' },
      { label: 'Quick Join' },
    ],
    heroImage: {
      src: '/images/game/steam-header.jpg',
      alt: 'Official Last Pirates: Die Together crew header',
      assetId: 'steam-header',
    },
    sections: [
      {
        id: 'what',
        heading: 'What Quick Join is',
        paragraphs: [
          'Quick Join is the documented public-lobby entry feature. Its purpose is to reduce the need to wait for a premade crew by finding an available public session.',
          'It is distinct from the broader co-op page, which owns party size, solo support, and general lobby questions. This page focuses on public matchmaking and symptoms around it.',
        ],
      },
      {
        id: 'why',
        heading: 'Why the feature was added',
        paragraphs: [
          'The official update framed Quick Join as an answer to waiting around for other players. It arrived alongside deeper networking changes rather than as an isolated button.',
          'That context matters because failure to join can involve availability, region, session state, reconnect logic, or host migration—not one universal cause.',
        ],
      },
      {
        id: 'pre-ea-flow',
        heading: 'Public lobbies in the pre-EA patch context',
        paragraphs: [
          'The July patch confirms public-lobby entry and region handling. It does not provide enough current evidence for us to publish a click-by-click Early Access menu tutorial before unlock.',
          'Once live, the guide will record the visible entry point, filters, status messages, cancel behavior, and what happens when no session is found.',
        ],
      },
      {
        id: 'region',
        heading: 'Region selection',
        paragraphs: [
          'Use the nearest reasonable region unless the crew intentionally meets elsewhere. If Quick Join finds nothing, one reversible test is to confirm the selected region and try another nearby populated option, if the live UI offers it.',
          'A region change can affect latency and available sessions. It is a diagnostic step, not proof that servers are down or that a region is permanently empty.',
        ],
      },
      {
        id: 'migration',
        heading: 'What reconnect and host-migration work tried to fix',
        paragraphs: [
          'The same patch described broad fixes for reconnect, host migration, and session synchronization. These systems matter after a host leaves or a player drops during a run.',
          'Patch history shows intent and prior implementation, not a guarantee that every edge case is resolved. Recurring failures should be reported with the build, region, role, and exact symptom.',
        ],
      },
      {
        id: 'no-lobby',
        heading: 'If Quick Join returns nothing or fails',
        paragraphs: [
          'First confirm that Early Access has actually unlocked, Steam is online, and the game is updated. Then check the current region, cancel and retry once, restart the Steam client, and use Steam’s file verification if the client behaves abnormally.',
          'Do not disable a firewall globally, forward ports without official need, or install third-party DLL packages. If planned friends can host, test a direct/private flow to separate public-lobby discovery from the entire co-op connection.',
        ],
        callout: {
          type: 'danger',
          title: 'Avoid risky “network fixes”',
          body: 'Global security changes and random downloads are not appropriate first-line steps for an unverified lobby symptom.',
        },
      },
      {
        id: 'live-check',
        heading: 'Live Early Access verification box',
        paragraphs: [
          'At launch we will verify the menu route, region options, waiting states, errors, lobby visibility, host departure, and reconnect handoff. Each current instruction will receive a build and checked date.',
          'Until then, the official July patch is authoritative for the feature’s existence and history, not a substitute for the opening interface.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can Quick Join find random players?',
        answer:
          'That was the purpose of the documented public-lobby feature added in the July pre-EA patch.',
      },
      {
        question: 'Why does Quick Join show no lobby?',
        answer:
          'Possible safe checks include release availability, client version, Steam connectivity, region, and retrying the current in-game flow. The exact live error causes need current evidence.',
      },
    ],
    sourceIds: ['S07'],
    related: [
      related('/coop', 'Co-op guide', 'See player count and crew structure.'),
      related('/save-and-reconnect', 'Save and reconnect', 'Handle a drop after joining.'),
      related('/troubleshooting', 'Troubleshooting', 'Run broader safe client checks.'),
      related('/tools/coop-troubleshooter', 'Co-op troubleshooter', 'Get symptom-specific reversible steps.'),
    ],
  },
  {
    route: '/save-and-reconnect',
    title: 'Last Pirates: Die Together Save & Reconnect Guide',
    h1: 'Save Progress and Reconnect in Last Pirates: Die Together',
    description:
      'Official save, reconnect, host-migration, and session-sync history for Last Pirates: Die Together, plus safe steps after a disconnect.',
    eyebrow: 'Session recovery',
    directAnswer: [
      'A June Demo patch documented chapter progress saving, a return-to-lobby flow, and a dedicated reconnect screen. A July patch then described further reconnect, host-migration, and session-synchronization fixes.',
      'Those are pre-EA build facts. Demo-to-Early-Access save transfer and the exact opening-build persistence rules are not confirmed.',
    ],
    buildContext: 'Official patch history · Transfer unknown',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Save & Reconnect' }],
    heroImage: {
      src: '/images/game/official-key-art.jpg',
      alt: 'Official art of a pirate crew under pressure',
      assetId: 'official-key-art',
    },
    sections: [
      {
        id: 'save-history',
        heading: 'What the Demo patch said could save',
        paragraphs: [
          'The June 19 patch said chapter progress saving was added or fixed in that Demo build. It also introduced a return-to-lobby flow tied to the session experience.',
          'The wording does not establish every variable that persisted, the current save location, cloud behavior, or compatibility with Early Access. Avoid expanding “chapter progress” into a broader promise.',
        ],
      },
      {
        id: 'reconnect-screen',
        heading: 'Reconnect screen history',
        paragraphs: [
          'The same patch documented a dedicated reconnect screen and fixes. That indicates the intended first response to a mid-run drop is the game’s own recovery flow.',
          'The live guide will verify how long the option appears, which player roles see it, and what state is restored. No timeout or recovery guarantee is invented here.',
        ],
      },
      {
        id: 'host-migration',
        heading: 'Host migration and session sync',
        paragraphs: [
          'The July update reported broader work on host migration and session synchronization. These systems aim to reduce the damage caused by a host departure or divergent crew state.',
          'A fix note is evidence of work, not proof that all cases are solved. Record whether the affected player was host or joiner and whether the run could continue when reporting a problem.',
        ],
      },
      {
        id: 'known-fixes',
        heading: 'Known pre-EA reconnect improvements',
        paragraphs: [
          'Across June and July, official notes mention the reconnect screen, reconnect fixes, host migration, and session synchronization. Together they show a sustained attempt to make sessions more resilient.',
          'Because the features were changing quickly, old screenshots or community sequences should not override the current in-game recovery prompt after launch.',
        ],
      },
      {
        id: 'what-to-try',
        heading: 'What to try after a disconnect',
        paragraphs: [
          'Use the reconnect prompt first. If it fails, confirm Steam is still online, make sure every crewmember is on the same game version, and let the current host recreate the lobby once. Restarting Steam is a reasonable next reversible step.',
          'If the problem recurs, capture the build, region, host/joiner role, chapter or run stage, and visible error. That evidence is more useful than repeatedly deleting local data.',
        ],
      },
      {
        id: 'safe-promises',
        heading: 'What is not safe to promise about saves',
        paragraphs: [
          'The current sources do not prove exactly which progress categories persist in Early Access, whether every run can be recovered, or whether local and cloud state behave identically.',
          'Do not delete or replace save files without a backup and a documented reason. This guide does not recommend registry edits or unofficial save utilities.',
        ],
        callout: {
          type: 'danger',
          title: 'Protect local progress',
          body: 'Never delete save data as a first-line reconnect fix. Back up any file before a later verified procedure changes it.',
        },
      },
      {
        id: 'transfer',
        heading: 'Demo-to-Early-Access save transfer',
        paragraphs: [
          'Transfer is not confirmed in the sources checked on Aug 17. The Demo and full game are separate Steam applications, and a Demo save feature does not automatically imply compatibility.',
          'This answer will change only after official wording or direct launch evidence confirms the behavior. Until then, plan to verify rather than rely on a carry-over.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does Last Pirates: Die Together save progress?',
        answer:
          'A June Demo patch documented chapter progress saving. Exact Early Access persistence still needs live verification.',
      },
      {
        question: 'Can I reconnect after disconnecting?',
        answer:
          'Official pre-EA patches added a reconnect screen and later reconnect/session fixes, but the opening-build flow must still be checked.',
      },
      {
        question: 'Do Demo saves transfer?',
        answer: 'No current official source in the registry confirms Demo-to-EA transfer.',
      },
    ],
    sourceIds: ['S07', 'S08'],
    related: [
      related('/coop', 'Co-op guide', 'See the broad session structure.'),
      related('/coop/quick-join', 'Quick Join', 'Troubleshoot public-lobby entry.'),
      related('/troubleshooting', 'Troubleshooting', 'Run safe Steam and client checks.'),
      related('/tools/coop-troubleshooter', 'Co-op troubleshooter', 'Choose a disconnect symptom.'),
    ],
  },
  {
    route: '/troubleshooting',
    title: 'Last Pirates: Die Together Not Working? Launch & Co-op Fixes',
    h1: 'Last Pirates: Die Together Troubleshooting',
    description:
      'Safe, reversible checks for Last Pirates: Die Together launch, no-window, Quick Join, reconnect, controller, and Steam Deck problems.',
    eyebrow: 'Problem desk',
    directAnswer: [
      'Before changing anything, check whether the game has actually unlocked and whether your PC meets the current Steam minimums. Then restart Steam, update the game, and use Steam’s file verification for abnormal client behavior.',
      'This guide avoids random DLL downloads, global security shutdowns, registry hacks, and save deletion. Co-op and reconnect symptoms link to narrower evidence-backed pages.',
    ],
    buildContext: 'Pre-EA safety guide · Live issues pending',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Troubleshooting' }],
    heroImage: {
      src: '/images/game/official-key-art.jpg',
      alt: 'Official art of the Last Pirates crew reacting to danger',
      assetId: 'official-key-art',
    },
    sections: [
      {
        id: 'release-state',
        heading: 'Check release status first',
        paragraphs: [
          'At the Aug 17 check, Steam still says the game is not available and lists Aug 18 for Early Access. A missing install or play control before unlock is not a launch failure.',
          'If the expected timestamp passes, re-open the store page and official news. Do not assume a countdown guarantees availability in every client at that exact second.',
        ],
      },
      {
        id: 'requirements',
        heading: 'Verify the current PC requirements',
        paragraphs: [
          'Steam currently lists a 64-bit OS, Intel Core i5 or equivalent, 8 GB RAM, GTX 1050 or equivalent, and 5 GB available storage as minimums. The store’s Windows 7 wording also carries Steam’s notice that the client itself supports Windows 10 and later.',
          'Store requirements can change at launch. Compare the current page before treating old copied specifications as authoritative.',
        ],
      },
      {
        id: 'steam-basics',
        heading: 'Restart Steam and verify files',
        paragraphs: [
          'Exit the game, fully restart the Steam client, confirm the update queue is complete, and try once more. If the client launches the wrong or incomplete state, use Steam’s installed-files verification.',
          'These actions are reversible and use the platform’s normal repair path. Restart the PC if Steam or graphics state still appears stuck after the client restart.',
        ],
      },
      {
        id: 'no-window',
        heading: 'The game runs but no window appears',
        paragraphs: [
          'Check the taskbar and use the operating system’s window switcher in case the game opened behind another window or on a disconnected display. Temporarily return the desktop to one active display and use standard window-move shortcuts if needed.',
          'A pre-EA patch history mentioned display and settings work such as FOV and invert-Y, but it does not establish one universal no-window cause. Avoid unsupported launch flags until the current official guidance provides them.',
        ],
      },
      {
        id: 'coop',
        heading: 'Co-op and Quick Join problems',
        paragraphs: [
          'Confirm all players use the same current version and Steam is online. Check the selected region, retry the in-game flow once, and compare public Quick Join with a planned-host lobby if the live build supports both.',
          'The July patch documents Quick Join and networking work. It does not justify port forwarding or global firewall changes as a default fix.',
        ],
      },
      {
        id: 'reconnect',
        heading: 'Reconnect and desync',
        paragraphs: [
          'Use the dedicated reconnect prompt first. If the crew state diverges, have the current host recreate one clean lobby after everyone confirms the same client version.',
          'Preserve saves. Record the host/joiner role, region, stage, and error before escalating so the report can identify a repeatable pattern.',
        ],
      },
      {
        id: 'controls',
        heading: 'Controller and Steam Deck notes',
        paragraphs: [
          'Official July notes mention Steam Deck support fixes and additional settings work, but the current store check does not justify claiming Valve Verified status. Test a standard controller layout and current in-game prompts first.',
          'If input behaves incorrectly, disconnect extra controllers, restart the game with one device, and review Steam Input settings. Keep changes reversible and restore them if they do not help.',
        ],
      },
      {
        id: 'settings',
        heading: 'FOV and invert-Y settings',
        paragraphs: [
          'The July official patch says FOV and invert-Y options improved. Their exact opening-build labels and ranges still require verification.',
          'If a setting seems missing, confirm the current build and inspect the relevant settings category before editing configuration files manually.',
        ],
      },
      {
        id: 'known-issues',
        heading: 'Known issue context from official patches',
        paragraphs: [
          'Pre-EA notes addressed Quick Join, reconnect, host migration, synchronization, save progress, display settings, Steam Deck support, and item or monster issues. That history identifies sensitive systems but is not a live outage board.',
          'A current known-issues section will include only official launch posts or repeatable, clearly labeled community reports with build context.',
        ],
      },
      {
        id: 'report',
        heading: 'When to stop troubleshooting and report a bug',
        paragraphs: [
          'Stop after the standard release, update, restart, requirements, and file-verification checks if the same problem persists. Repeated invasive experiments make reports harder to interpret and can create new problems.',
          'Report the game build, platform, hardware, region, player role, reproduction steps, visible error, and whether the issue happens every time. Never include passwords or private account credentials.',
        ],
        callout: {
          type: 'danger',
          title: 'Skip dangerous shortcuts',
          body: 'Do not download random executables, disable security globally, edit the registry, or delete saves for an unverified fix.',
        },
      },
    ],
    faqs: [
      {
        question: 'Why can’t I install or launch the game yet?',
        answer:
          'At the Aug 17 check, Steam still lists the game as unavailable before its planned Aug 18 Early Access date.',
      },
      {
        question: 'What should I try first after launch?',
        answer:
          'Confirm availability and requirements, update and restart Steam, then verify installed files if the client behaves abnormally.',
      },
      {
        question: 'Should I delete saves or download a DLL fix?',
        answer: 'No. Neither is an appropriate first-line step for the issues currently documented.',
      },
    ],
    sourceIds: ['S01', 'S07', 'S08'],
    related: [
      related('/system-requirements', 'System requirements', 'Compare current Steam minimums.'),
      related('/coop/quick-join', 'Quick Join', 'Diagnose public-lobby discovery.'),
      related('/save-and-reconnect', 'Save and reconnect', 'Protect progress during recovery.'),
      related('/tools/coop-troubleshooter', 'Co-op troubleshooter', 'Generate a symptom-specific checklist.'),
    ],
  },
  {
    route: '/system-requirements',
    title: 'Last Pirates: Die Together System Requirements & Steam Deck Status',
    h1: 'Last Pirates: Die Together PC Requirements',
    description:
      'Current minimum PC requirements from Steam plus careful Last Pirates: Die Together Steam Deck and control-support context.',
    eyebrow: 'Hardware check',
    directAnswer: [
      'Steam currently lists a 64-bit OS, Intel Core i5 or equivalent, 8 GB RAM, Nvidia GeForce GTX 1050 or equivalent, and 5 GB available storage as the minimum requirements.',
      'A pre-EA patch mentioned Steam Deck support fixes, but this does not equal Valve Verified status. Check the current Steam compatibility badge after launch.',
    ],
    buildContext: 'Steam minimums · Checked Aug 17',
    confidence: 'confirmed',
    breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'System Requirements' }],
    heroImage: {
      src: '/images/game/steam-header.jpg',
      alt: 'Official Last Pirates: Die Together Steam header',
      assetId: 'steam-header',
    },
    sections: [
      {
        id: 'minimums',
        heading: 'Minimum requirements from Steam',
        paragraphs: [
          'The current store page provides minimum specifications but no populated recommended tier beyond the 64-bit requirement. Treat copied third-party recommended lists as unverified unless the official page changes.',
          'These requirements are a pre-release snapshot and can be revised when the opening build becomes available. This page will recheck the source rather than assume a frozen listing.',
        ],
      },
      {
        id: 'table',
        heading: 'OS, CPU, memory, graphics, and storage',
        paragraphs: [
          'The table preserves official wording, including the misspelling implied by “equivalent” without inventing a benchmark tier.',
        ],
        table: {
          headers: ['Component', 'Current Steam minimum'],
          rows: [
            ['Architecture', '64-bit processor and operating system'],
            ['OS', 'Windows 7 or later*'],
            ['Processor', 'Intel Core i5 or equivalent'],
            ['Memory', '8 GB RAM'],
            ['Graphics', 'Nvidia GeForce GTX 1050 or equivalent'],
            ['Storage', '5 GB available space'],
          ],
        },
        callout: {
          type: 'build-check',
          title: 'Steam client OS note',
          body: 'Steam states that its client supports Windows 10 and later from Jan 1, 2024, even though the game listing currently says Windows 7 or later.',
        },
      },
      {
        id: 'meaning',
        heading: 'What minimum requirements do and do not tell you',
        paragraphs: [
          'A minimum list identifies the floor the publisher currently posts. It does not promise a frame rate, resolution, quality preset, or smooth experience in every four-player physics-heavy situation.',
          'No official recommended CPU or GPU tier is currently populated, so this guide does not manufacture one from category comparisons.',
        ],
      },
      {
        id: 'deck-history',
        heading: 'What official patches said about Steam Deck',
        paragraphs: [
          'The July pre-EA patch included Steam Deck support fixes among broader settings and networking work. That is evidence that handheld support received attention.',
          'It is not proof of Valve’s Verified or Playable classification, a fixed performance target, or complete controller parity. Those signals must come from the current store and live testing.',
        ],
      },
      {
        id: 'badge',
        heading: 'Verified badge versus playable language',
        paragraphs: [
          '“Steam Deck support fixes” is developer patch wording. “Verified” is a specific Valve compatibility result displayed on Steam. This guide will not swap one phrase for the other.',
          'If the store later shows a badge, record its date and link it to current input, text, launcher, and performance notes rather than treating it as permanent.',
        ],
      },
      {
        id: 'performance',
        heading: 'Performance checks after release',
        paragraphs: [
          'After unlock, verify native resolution, presets, FOV, frame limits, display mode, controller prompts, and the behavior of busy physics scenes. Recommendations need visible settings and repeatable observations.',
          'For an immediate problem, update graphics drivers through the hardware vendor, close unnecessary heavy applications, confirm available storage, and lower demanding settings through the game before using unofficial tweaks.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much RAM does Last Pirates: Die Together need?',
        answer: 'Steam currently lists 8 GB RAM as the minimum.',
      },
      {
        question: 'How much storage is required?',
        answer: 'The pre-release Steam page lists 5 GB available space.',
      },
      {
        question: 'Is it Steam Deck Verified?',
        answer:
          'This guide does not claim Valve Verified status. An official patch mentioned Steam Deck support fixes, which is a narrower statement.',
      },
    ],
    sourceIds: ['S01', 'S07'],
    related: [
      related('/troubleshooting', 'Troubleshooting', 'Start with safe launch and display checks.'),
      related('/release-date', 'Release date', 'Confirm the game is available before diagnosing.'),
      related('/coop', 'Co-op guide', 'Review control and network context.'),
      related('/faq', 'FAQ', 'Get short system and status answers.'),
    ],
  },
] satisfies GuidePageData[];
