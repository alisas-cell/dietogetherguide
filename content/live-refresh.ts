import type { ContentSection, GuidePageData, RelatedGuide } from './types';
import { related } from './types';

interface LiveRefresh {
  directAnswer: string[];
  section: ContentSection;
  sourceIds: string[];
  related: RelatedGuide[];
  removeSectionIds?: string[];
}

const newLink = (href: string, label: string, description: string) => related(href, label, description);

const refreshes: Record<string, LiveRefresh> = {
  '/release-date': {
    directAnswer: [
      'Last Pirates: Die Together is live now in Steam Early Access. The official release date is August 18, 2026; the page is a historical/current status record rather than a release countdown.',
      'Steam still describes a six-month-or-longer Early Access target, not a fixed 1.0 date. Official hotfixes shipped on Aug 19, twice on Aug 20, Aug 21, and Aug 26, confirming an active live build.',
    ],
    section: { id: 'live-cadence', heading: 'Live status through Aug 26', paragraphs: ['The newest official item found at the Aug 26 research gate adds Golden Weapons and another monster balance pass. No newer official patch appeared in the 20 most recent Steam news entries.', 'Release-day discount and timestamp history remain dated records. Current availability should always be checked on Steam.'], links: [{ href: '/updates', label: 'Follow the official live timeline' }, { href: '/early-access', label: 'See the current EA scope' }] },
    sourceIds: ['S01', 'S13', 'S16', 'S17'],
    related: [newLink('/updates', 'Current updates', 'See every durable Aug 19–26 patch summary.')],
  },
  '/early-access': {
    directAnswer: [
      'Early Access is live with official solo support and online co-op for up to four players. Ship and Castle, the launch monster group, public-default lobbies, daily/chapter saves, and separate solo/team balance are current—not future wording.',
      'The Aug 26 build adds the Golden Sword and Golden Hand Cannon, retunes several monsters, sets floor time to 25 seconds solo and 15 co-op, lightens large objects by about 26%, and changes the solo store.',
    ],
    section: { id: 'live-now-aug26', heading: 'What is demonstrably live by Aug 26', paragraphs: ['The current record now spans the EA launch plus five rapid official update posts. Daily/chapter saves and public-default lobbies shipped Aug 21; Golden Weapons and the latest balance pass followed Aug 26.', 'Future 1.0 direction remains separate from delivered Early Access changes.'], links: [{ href: '/solo-guide', label: 'Solo balance guide' }, { href: '/golden-weapons', label: 'Golden Weapons' }, { href: '/updates', label: 'Dated update timeline' }] },
    sourceIds: ['S13', 'S14', 'S15', 'S16', 'S17'],
    related: [newLink('/solo-guide', 'Solo guide', 'Use current separate-balance evidence.'), newLink('/golden-weapons', 'Golden Weapons', 'See the Aug 26 weapon record.')],
  },
  '/roadmap': {
    directAnswer: [
      'Early Access shipped Aug 18 and received five official update posts through Aug 26. The delivered column now includes daily/chapter saves, separate solo/team tuning, public-default lobbies, Golden Weapons, hauling changes, and multiple monster and performance fixes.',
      'The route to 1.0 still has no fixed date. More locations, enemies, bosses, customization, progression, weapons, cursed loot, and polish remain direction statements until a dated official update says each item shipped.',
    ],
    section: { id: 'rapid-patch-cadence', heading: 'The first live patch cadence', paragraphs: ['Official updates arrived Aug 19, twice Aug 20, Aug 21, and Aug 26. That cadence is evidence of active iteration, not a guaranteed weekly schedule.', 'Do not extrapolate a future date from the eight-day launch window. Use the canonical Updates page to move items from announced to delivered.'], table: { headers: ['Date', 'Durable delivered theme'], rows: [['Aug 19', 'Day One fixes and balance'], ['Aug 20', 'Two hotfixes: co-op/cart and balance/performance'], ['Aug 21', 'Daily saves and solo rebalance'], ['Aug 26', 'Golden Weapons and monster rebalance']] }, links: [{ href: '/updates', label: 'Open the dated patch record' }] },
    sourceIds: ['S13', 'S14', 'S15', 'S16', 'S17'],
    related: [newLink('/updates', 'Updates', 'Verify delivered work against dated official posts.')],
  },
  '/gameplay': {
    directAnswer: [
      'The current loop is playable solo or with up to four online players: enter Ship or Castle, identify threats, collect and break down valuables, haul them back, meet the current quota, and continue with daily and chapter progress saving.',
      'Public lobbies are enabled by default, while solo and team runs now use separate quota, shop, item-count, and enemy-spawn tuning. Large objects are about 26% lighter than before the Aug 26 patch.',
    ],
    section: { id: 'live-loop-aug26', heading: 'Current live loop changes', paragraphs: ['Ship and Castle are the current official EA locations. Titanic can appear as a breakable item in Ship levels, the cart system supports upgrades, and the Monkey Assistant/Porter helps with small-loot delivery under its current one-level lifecycle.', 'Daily/chapter saving reduces progress loss, while reconnect and store-state fixes continue to matter for crews.'], links: [{ href: '/maps/ship', label: 'Ship guide' }, { href: '/maps/castle', label: 'Castle guide' }, { href: '/solo-guide', label: 'Solo balance guide' }] },
    sourceIds: ['S11', 'S14', 'S16', 'S17'],
    related: [newLink('/solo-guide', 'Solo guide', 'Plan around separate solo tuning.'), newLink('/maps/ship', 'Ship', 'Read the current location record.'), newLink('/maps/castle', 'Castle', 'Read the current location record.')],
  },
  '/beginner-guide': {
    directAnswer: [
      'New players should first choose solo or co-op, learn the live Ship/Castle haul-and-return loop, and treat public lobbies as enabled by default. Solo and team modes now have separate balance for quota, stores, item counts, and enemy spawns.',
      'Use daily/chapter saves as official progress context, stage heavy loot after the 26% weight reduction, and identify current threats by behavior: Ear hears, Anchorer sees and hooks, Mimic disguises, and Siren now exposes a pull cue.',
    ],
    section: { id: 'first-live-run', heading: 'Your first current-build run', paragraphs: ['Finish Steam updates, choose solo or a public/private crew path, learn one return line, and avoid spending the entire timer on uncertain heavy loot. The live build can save every day and chapter, but that is not a substitute for understanding the current run state.', 'When a threat is unclear, use the shared registry rather than memorizing an unverified complete roster.'], links: [{ href: '/solo-guide', label: 'Solo route' }, { href: '/coop/quick-join', label: 'Quick Join route' }, { href: '/tools/monster-finder', label: 'Monster Finder' }, { href: '/revive-guide', label: 'Downed-player timers' }] },
    sourceIds: ['S11', 'S16', 'S17'],
    related: [newLink('/solo-guide', 'Solo guide', 'Start with current solo balance.'), newLink('/tools/monster-finder', 'Monster Finder', 'Identify a threat from live clues.'), newLink('/monsters/ear', 'Ear guide', 'Learn sound-based identification.'), newLink('/monsters/siren', 'Siren guide', 'Use the current pull cue.')],
  },
  '/monsters': {
    directAnswer: [
      'The live monster hub separates launch-confirmed creatures from patch-observed current threats. Launch-confirmed records include Ear, Anchorer, Snake, Crab, Parrot, Sleeper, Mimic, and rat/rat-king context; that list is not claimed to be complete.',
      'Current patch-observed names include Headman, Kraken, Siren, Headcrab, and Man in Shadows. Detail pages are live for Ear, Anchorer, Siren, and Mimic, backed by the same typed registry as the transparent Monster Finder.',
    ],
    section: { id: 'current-patch-board', heading: 'Current threat patch board', paragraphs: ['Aug 19 reduced Ear attack/hearing ranges, made Kraken less aggressive, and fixed Rat behavior. Aug 20 reduced Anchorer attack speed. Aug 26 added Siren pull audio and restored knockback, removed the Headcrab one-hit outcome while shortening attack time, and reduced Man in Shadows damage, chase speed, and range.', 'Killed enemies also no longer immediately respawn in the same place. None of these notes proves a complete roster or permanent numeric stat sheet.'], table: { headers: ['Threat', 'Latest verified change'], rows: [['Ear', 'Aug 19 attack and hearing range reduced'], ['Anchorer', 'Aug 20 attack speed reduced'], ['Siren', 'Aug 26 pull sound; knockback restored'], ['Headcrab', 'Aug 26 no single-hit outcome; faster attack'], ['Man in Shadows', 'Aug 26 damage, chase, and range reduced'], ['Kraken', 'Aug 19 less aggressive'], ['Rat', 'Aug 19 AI fixes']] }, links: [{ href: '/monsters/ear', label: 'Ear' }, { href: '/monsters/anchorer', label: 'Anchorer' }, { href: '/monsters/siren', label: 'Siren' }, { href: '/monsters/mimic', label: 'Mimic' }, { href: '/tools/monster-finder', label: 'Monster Finder' }] },
    sourceIds: ['S11', 'S13', 'S15', 'S17'],
    related: [newLink('/monsters/ear', 'Ear', 'Sound, nerfs, and counterplay.'), newLink('/monsters/anchorer', 'Anchorer', 'Hook behavior and attack-speed change.'), newLink('/monsters/siren', 'Siren', 'Current pull sound and knockback.'), newLink('/monsters/mimic', 'Mimic', 'Disguise, voice evidence, and reactions.'), newLink('/tools/monster-finder', 'Monster Finder', 'Match observed behavior tags.')],
  },
  '/maps': {
    directAnswer: [
      'Ship and Castle are the two current locations explicitly named in the Early Access launch announcement. Ship centers on tight decks and dark corners; Castle is larger, colder, heavy-loot focused, and uses elevators and funiculars.',
      'Silent Cove remains an indexed Demo/historical record, not a third confirmed current EA location. Each location now has a dedicated evidence-scoped page without invented floor plans or spawn charts.',
    ],
    section: { id: 'live-location-board', heading: 'Current and historical location board', paragraphs: ['Ship received Titanic as a breakable item in its levels on Aug 21 and a spawn-ship visual refresh on Aug 26. Castle transport is official, while Mansion-specific balance notes are not automatically treated as Castle-wide facts.', 'Use detail pages for current evidence and the Silent Cove page for labeled Demo context.'], table: { headers: ['Location', 'Evidence state', 'Detail'], rows: [['Ship', 'Current EA', 'Tight decks; Titanic; spawn-ship refresh'], ['Castle', 'Current EA', 'Heavy loot; elevators/funiculars'], ['Silent Cove', 'Demo archive', 'Historical indexed context']] }, links: [{ href: '/maps/ship', label: 'Ship guide' }, { href: '/maps/castle', label: 'Castle guide' }, { href: '/maps/silent-cove', label: 'Silent Cove archive' }] },
    sourceIds: ['S04', 'S11', 'S16', 'S17'],
    related: [newLink('/maps/ship', 'Ship', 'Current EA location evidence.'), newLink('/maps/castle', 'Castle', 'Current EA location evidence.')],
  },
  '/maps/silent-cove': {
    directAnswer: [
      'Silent Cove is preserved as the Demo-era location record. Current official Early Access sources name Ship and Castle instead, so Silent Cove details on this page are explicitly historical rather than silently promoted to the live build.',
      'Use this archive to understand indexed Demo context, then move to the Ship or Castle guides for current EA location evidence. No checked source confirms a current Silent Cove return or layout.',
    ],
    section: { id: 'archive-status-aug26', heading: 'Archive boundary confirmed Aug 26', paragraphs: ['The current Steam store and official updates checked through Aug 26 do not re-confirm Silent Cove as a live EA location. Historical Demo evidence remains valid for what it described at the time.', 'Do not carry its monster count, extraction route, or geometry into Ship and Castle.'], links: [{ href: '/maps/ship', label: 'Current Ship guide' }, { href: '/maps/castle', label: 'Current Castle guide' }, { href: '/maps', label: 'Map evidence hub' }] },
    sourceIds: ['S04', 'S11', 'S17'],
    related: [newLink('/maps/ship', 'Ship', 'Move to current EA location guidance.'), newLink('/maps/castle', 'Castle', 'Move to current EA location guidance.')],
  },
  '/loot-and-extraction': {
    directAnswer: [
      'The current extraction loop includes break-apart large valuables, Titanic in Ship levels, a reworked upgradeable cart, and Monkey delivery support for small loot. Large objects became about 26% lighter on Aug 26.',
      'Official patches also fixed a cart/funicular interaction and reduced frame drops in loot-heavy scenes. Stage the return line, split supported objects, separate manual heavy hauling from Porter delivery, and diagnose performance by scene.',
    ],
    section: { id: 'live-haul-board', heading: 'Current hauling change board', paragraphs: ['Titanic is a breakable Ship-level item; large valuables can be split when the object supports it; Monkey Porter follows a one-level, spent-on-delivery lifecycle; and large objects are lighter after Aug 26.', 'These facts do not reveal exact values, spawn locations, or a universal fastest route.'], table: { headers: ['System', 'Current evidence'], rows: [['Titanic', 'Breakable item in Ship levels'], ['Large objects', 'About 26% lighter'], ['Monkey Porter', 'One level; spent on delivery'], ['Performance', 'Fewer loot-heavy frame drops targeted']] }, links: [{ href: '/maps/ship', label: 'Ship' }, { href: '/monkey-cart', label: 'Monkey Cart & Porter' }, { href: '/performance', label: 'Performance fixes' }, { href: '/revive-guide', label: 'Recovery timing' }] },
    sourceIds: ['S11', 'S14', 'S15', 'S16', 'S17'],
    related: [newLink('/maps/ship', 'Ship', 'Plan around Titanic and tight decks.'), newLink('/monkey-cart', 'Monkey Cart', 'Use current cart and Porter evidence.'), newLink('/performance', 'Performance', 'Diagnose loot-heavy frame drops.'), newLink('/revive-guide', 'Revive guide', 'Prepare for downed-player recovery.')],
  },
  '/items-and-weapons': {
    directAnswer: [
      'The current item hub now includes the Golden Sword and Golden Hand Cannon, introduced Aug 26 as the top of the official weapon tier list without published exact stats. Existing balance changed too: Pirate Pistol damage and Pirate Bomb radius were reduced, and Water Gun is limited to one shop purchase.',
      'Monkey Cart changed from 800 to 200, Porter has a one-level delivery lifecycle, Rupor was removed from the solo store, and reconnect fixes cover Magnet and stuck-item context. Exact volatile prices and hidden values stay blank unless a current source publishes them.',
    ],
    section: { id: 'current-item-board', heading: 'Current item and store change board', paragraphs: ['Golden Weapons are current but exact damage, price, ammo, and durability are not published. The solo store is independently tuned, so a team value should not be copied into a solo guide without current evidence.', 'The durable links below separate weapons, hauling tools, and solo economy context.'], table: { headers: ['Item/system', 'Verified current change'], rows: [['Golden Sword / Hand Cannon', 'Added Aug 26; officially top tier'], ['Pirate Pistol', 'Damage reduced Aug 20'], ['Pirate Bomb', 'Radius reduced Aug 20'], ['Water Gun', 'One-purchase shop limit'], ['Monkey Cart', '800 → 200'], ['Rupor', 'Removed from solo store']] }, links: [{ href: '/golden-weapons', label: 'Golden Weapons' }, { href: '/monkey-cart', label: 'Monkey Cart & Porter' }, { href: '/solo-guide', label: 'Solo store context' }, { href: '/updates', label: 'Patch history' }] },
    sourceIds: ['S14', 'S15', 'S16', 'S17'],
    related: [newLink('/golden-weapons', 'Golden Weapons', 'Keep exact unknown stats visible.'), newLink('/monkey-cart', 'Monkey Cart', 'Track cart price and Porter lifecycle.'), newLink('/solo-guide', 'Solo guide', 'Understand separate store tuning.')],
  },
  '/rum-buffs-and-perks': {
    directAnswer: [
      'Rum remains part of the current tutorial and live gameplay context. The Aug 20 Fresh Fixes update added a right-click tutorial tip for drinking rum, replacing the stale assumption that controls are only known from pre-EA notes.',
      'Only effects already supported by current or clearly labeled historical official evidence are presented. Exact duration, stacking, hidden values, and build-sensitive control behavior remain qualified when the checked sources do not publish them.',
    ],
    section: { id: 'live-rum-control', heading: 'Current tutorial control update', paragraphs: ['Fresh Fixes added a right-click tip for drinking rum in the tutorial. That is the current official instruction cue and should take priority over older generalized control wording.', 'The tip confirms the tutorial direction; it does not publish every rum effect, duration, stack rule, or controller equivalent.'], links: [{ href: '/beginner-guide', label: 'Current beginner route' }, { href: '/updates', label: 'Aug 20 patch context' }] },
    sourceIds: ['S09', 'S11', 'S15'],
    related: [newLink('/beginner-guide', 'Beginner guide', 'Use the current tutorial context.')],
  },
  '/coop': {
    directAnswer: [
      'Last Pirates supports solo and online co-op for up to four players. Public lobbies are enabled by default in the Aug 21 build, Quick Join is live, and reconnect/store-state fixes continue to support crew recovery.',
      'Solo and team balance are separate. Current floor time is 25 seconds solo and 15 seconds co-op, and Aug 26 fixed voice behavior on the open deck. Use the focused No Game Found page or expanded Co-op Troubleshooter when a crew cannot connect.',
    ],
    section: { id: 'live-crew-board', heading: 'Current crew session board', paragraphs: ['Public-default lobbies do not remove private invite/code flows. Quick Join is the feature route; No Game Found is the error route; reconnect belongs to a run already in progress.', 'Keep those intents separate so one symptom does not trigger irrelevant fixes.'], table: { headers: ['Intent', 'Use'], rows: [['Find public crew', 'Quick Join'], ['Code/invite/search returns nothing', 'No Game Found'], ['Session drops mid-run', 'Save & Reconnect'], ['Need ordered diagnosis', 'Co-op Troubleshooter'], ['Downed teammate', 'Revive guide']] }, links: [{ href: '/coop/quick-join', label: 'Quick Join' }, { href: '/coop/no-game-found', label: 'No Game Found' }, { href: '/save-and-reconnect', label: 'Save & Reconnect' }, { href: '/tools/coop-troubleshooter', label: 'Troubleshooter' }, { href: '/revive-guide', label: 'Revive guide' }] },
    sourceIds: ['S01', 'S07', 'S16', 'S17'],
    related: [newLink('/coop/no-game-found', 'No Game Found', 'Fix codes, invites, and empty search.'), newLink('/revive-guide', 'Revive guide', 'Use current co-op floor timing.'), newLink('/tools/coop-troubleshooter', 'Co-op Troubleshooter', 'Generate a contextual safe checklist.')],
    removeSectionIds: ['public-lobbies'],
  },
  '/coop/quick-join': {
    directAnswer: [
      'Quick Join is live as the public-lobby discovery feature, and public lobbies are enabled by default as of Aug 21. Finish the current Steam update, choose the intended region, and run one clean public search rather than treating old pre-launch caveats as current limitations.',
      'If the client returns nothing or shows No Game Found, switch to the dedicated error path: compare version, Steam online state, lobby visibility, and one code/invite method before restarting once and verifying files.',
    ],
    section: { id: 'feature-vs-error', heading: 'Quick Join feature vs No Game Found error', paragraphs: ['This page explains the live public search feature. The No Game Found page diagnoses an empty or failed result across Quick Join, codes, and Steam invites.', 'Version, region, lobby intent, and session state are current checks. Random network changes are not part of the safe first line.'], links: [{ href: '/coop/no-game-found', label: 'Fix No Game Found' }, { href: '/tools/coop-troubleshooter', label: 'Use the expanded troubleshooter' }] },
    sourceIds: ['S07', 'S16', 'S18'],
    related: [newLink('/coop/no-game-found', 'No Game Found', 'Diagnose an empty or failed result.')],
    removeSectionIds: ['pre-ea-flow', 'live-check'],
  },
  '/save-and-reconnect': {
    directAnswer: [
      'The Aug 21 update says game progress now saves every day and every chapter. It also preserves store stats after reconnect, while current fixes cover floor-fall reconnect cases and earlier stuck-item, teleport, lock, event, and loading cleanup.',
      'These facts do not publish a save-file path, Demo-transfer promise, conflict algorithm, or guarantee that every interrupted session recovers. Use the in-game reconnect path first and keep Demo-era patch history labeled as historical context.',
    ],
    section: { id: 'live-save-board', heading: 'Current save and reconnect board', paragraphs: ['Daily and chapter saving are current EA facts from Aug 21. Store statistics after reconnect and floor-fall recovery are current fixes; the June reconnect screen and cleanup remain historical feature lineage.', 'Do not delete local data or invent a save path when a current official source does not publish one.'], table: { headers: ['State', 'Current evidence'], rows: [['Progress', 'Saved every day and chapter'], ['Reconnect store state', 'Store stats restored/preserved'], ['Floor fall', 'Reconnect fix recorded'], ['Save path / Demo transfer', 'Not published in checked sources']] }, links: [{ href: '/tools/run-chapter-tracker', label: 'Keep separate local run notes' }, { href: '/coop/no-game-found', label: 'Handle pre-session join failures' }] },
    sourceIds: ['S08', 'S13', 'S16'],
    related: [newLink('/tools/run-chapter-tracker', 'Run Tracker', 'Keep a local notebook without reading saves.'), newLink('/coop/no-game-found', 'No Game Found', 'Separate lobby failures from reconnect.')],
  },
  '/troubleshooting': {
    directAnswer: [
      'The live troubleshooting hub now separates No Game Found, low FPS, save/reconnect, Quick Join, downed-friend recovery, system requirements, and the expanded Co-op Troubleshooter. Start from the smallest matching symptom.',
      'Official fixes through Aug 26 cover store loading, laptop auto-quality, loot-heavy frame drops, voice behavior, reconnect, stuck items, lobby state, and session optimization. Use reversible supported checks and report build-specific context.',
    ],
    section: { id: 'live-problem-board', heading: 'Choose the current problem path', paragraphs: ['Do not use a lobby-search checklist for a mid-run disconnect or a performance checklist for a downed-player interaction. Each durable page carries its own source and unknown boundary.', 'The interactive Co-op Troubleshooter now accepts symptom, role, connection method, public/private state, version match, and Steam online state.'], links: [{ href: '/coop/no-game-found', label: 'No Game Found' }, { href: '/performance', label: 'FPS / performance' }, { href: '/save-and-reconnect', label: 'Save / reconnect' }, { href: '/coop/quick-join', label: 'Quick Join' }, { href: '/revive-guide', label: 'Revive / downed friends' }, { href: '/system-requirements', label: 'System requirements' }, { href: '/tools/coop-troubleshooter', label: 'Co-op Troubleshooter' }] },
    sourceIds: ['S13', 'S14', 'S15', 'S16', 'S17', 'S18'],
    related: [newLink('/coop/no-game-found', 'No Game Found', 'Fix lobby discovery and handoff.'), newLink('/performance', 'Performance', 'Diagnose low FPS safely.'), newLink('/revive-guide', 'Revive guide', 'Separate official timers from player reports.'), newLink('/tools/coop-troubleshooter', 'Co-op Troubleshooter', 'Build an ordered contextual checklist.'), newLink('/tools', 'All tools', 'Choose Finder, Troubleshooter, or local Tracker.')],
  },
  '/system-requirements': {
    directAnswer: [
      'Use the exact current Steam minimum and recommended requirements already recorded on this page; do not convert them into a guaranteed FPS target. The Aug 21 patch fixed automatic quality selection on laptops, which is relevant when the first preset is unexpectedly high or low.',
      'For performance problems, update the game, compare one preset and resolution at a time, reduce background load, use normal vendor drivers, verify files, and capture the scene. Avoid random DLLs, registry edits, and unsupported launch flags.',
    ],
    section: { id: 'laptop-quality-aug21', heading: 'Aug 21 laptop auto-quality fix', paragraphs: ['The official update records a fix for automatic quality selection on laptops. Retest the current automatic choice before assuming an old launch-day preset decision still applies.', 'Requirements describe hardware support context; they do not promise one frame rate in every map, crew size, or loot-heavy scene.'], links: [{ href: '/performance', label: 'Open safe performance diagnosis' }, { href: '/updates', label: 'See the optimization timeline' }] },
    sourceIds: ['S01', 'S15', 'S16'],
    related: [newLink('/performance', 'Performance fixes', 'Turn requirements into reversible scene tests.')],
  },
  '/updates': {
    directAnswer: [
      'The canonical live timeline now covers the Aug 19 Day One Hotfix, two Aug 20 updates, Aug 21 Daily Saves and Solo Rebalance, and Aug 26 Golden Weapons and Monster Rebalance. No newer official patch was found at the Aug 26 research gate.',
      'Each summary links changes to durable topic pages instead of generating one thin SEO page per hotfix. Exact mechanics are carried only where the official source supports them.',
    ],
    section: { id: 'aug19-26-canonical', heading: 'Official Aug 19–26 patch sequence', paragraphs: ['The first live week moved quickly from launch fixes into independent solo/team tuning and another equipment/monster pass. The sequence below is ordered by official publication time.', 'Future official updates belong here and on the affected durable pages.'], table: { headers: ['Date', 'Official post', 'Durable destinations'], rows: [['Aug 19', 'Day One Hotfix Is Live', 'Monsters, items, reconnect, performance'], ['Aug 20', 'Another Hotfix Is In', 'Co-op, cart/Porter, session fixes'], ['Aug 20', 'Fresh Fixes Have Rolled In', 'Anchorer, items, rum, performance'], ['Aug 21', 'Daily Saves and a Solo Rebalance', 'Solo, saves, lobbies, maps'], ['Aug 26', 'Golden Weapons and Monsters Get Reined In', 'Golden Weapons, monsters, revive, hauling']] }, links: [{ href: '/golden-weapons', label: 'Golden Weapons' }, { href: '/solo-guide', label: 'Solo changes' }, { href: '/monsters', label: 'Monster patch board' }, { href: '/performance', label: 'Performance history' }] },
    sourceIds: ['S13', 'S14', 'S15', 'S16', 'S17'],
    related: [newLink('/golden-weapons', 'Golden Weapons', 'Read the latest equipment record.'), newLink('/solo-guide', 'Solo guide', 'Apply the Aug 21/26 balance changes.'), newLink('/performance', 'Performance', 'Follow optimization changes.')],
  },
  '/faq': {
    directAnswer: [
      'Last Pirates: Die Together is live in Early Access, supports solo and online co-op for up to four, uses separate solo/team tuning, and now saves progress every day and chapter. Public lobbies are enabled by default.',
      'Current named EA locations are Ship and Castle. Golden Sword and Golden Hand Cannon arrived Aug 26, while the current EA duration target remains six months or more rather than a fixed 1.0 date.',
    ],
    section: { id: 'current-short-answers', heading: 'Current live-build short answers', paragraphs: ['Solo floor time is 25 seconds and co-op is 15. Large objects are about 26% lighter. Rupor was removed from the solo store. No Game Found has a dedicated safe diagnosis path.', 'Exact Golden Weapon stats, a complete roster, full map layouts, save paths, and a 1.0 date remain unpublished in the checked sources.'], links: [{ href: '/solo-guide', label: 'Solo answer details' }, { href: '/golden-weapons', label: 'Golden Weapon unknowns' }, { href: '/coop/no-game-found', label: 'No Game Found fixes' }, { href: '/maps', label: 'Current maps' }] },
    sourceIds: ['S01', 'S11', 'S16', 'S17'],
    related: [newLink('/solo-guide', 'Solo guide', 'Read the current balance split.'), newLink('/golden-weapons', 'Golden Weapons', 'See verified and unknown fields.'), newLink('/coop/no-game-found', 'No Game Found', 'Use the safe fix order.')],
  },
};

function uniqueByHref(items: RelatedGuide[]): RelatedGuide[] {
  return [...new Map(items.map((item) => [item.href, item])).values()];
}

export function applyLiveRefresh(page: GuidePageData): GuidePageData {
  const refresh = refreshes[page.route];
  if (!refresh) return page;

  return {
    ...page,
    directAnswer: refresh.directAnswer,
    buildContext: 'Live Early Access · revalidated Aug 26, 2026',
    sections: [refresh.section, ...page.sections.filter((section) => section.id !== refresh.section.id && !refresh.removeSectionIds?.includes(section.id))],
    sourceIds: [...new Set([...page.sourceIds, ...refresh.sourceIds])],
    related: uniqueByHref([...refresh.related, ...page.related]),
  };
}
