import { REVIEW_DATE } from '../data/current';
import { patchesForRoute } from '../lib/patch-graph';
import { section } from './wiki-factory';
import type { GuidePageData } from './types';

const answers: Record<string, string> = {
  '/release-date':
    'Last Pirates: Die Together entered Steam Early Access on August 18, 2026 and is available now. September updates expanded progression, equipment and achievements; there is no fixed 1.0 release date in the reviewed official material.',
  '/early-access':
    'Last Pirates: Die Together is in Early Access with solo and online co-op for up to four players. September added equipment and 20 achievements, rebuilt chapter/location progression and brought Steam Deck Verified status. The latest gameplay patch found is September 18.',
  '/roadmap':
    'September delivered new equipment, a rebuilt Head Crab, two unnamed threats, achievements and progression changes. Delivered features are recorded by patch date; broader Early Access plans remain direction statements, not a fixed release schedule.',
  '/gameplay':
    'Explore, identify threats, collect valuables, return loot and meet your current quota, solo or with up to four players. September reorders Mansion, Ship and Castle, makes enemy sets level-specific, and changes store progression and hauling.',
  '/beginner-guide':
    'Start with the working tutorial, choose solo or co-op, check the level preview and learn a return route. September changed location order, store unlocks, quota progression and item weight, so use the current screen rather than a launch-week shopping or map chart.',
  '/loot-and-extraction':
    'Loot collection is only half the run: cargo can still be lost before the game accepts it. September made large items heavier, changed multi-grab, added protective Cover and revised loot pools and spawn points. Plan from actual quota and secured value.',
  '/rum-buffs-and-perks':
    'Keep rum, cards, carrying effects and booty stats distinct. September changed grabbing restrictions and Strong Arms interactions; Thick Booty now adds a fixed stamina amount rather than a percentage, but that amount is not published.',
  '/coop':
    'Play solo or online with up to four players. September improves lobby previews, waiting-for-host and code-copy feedback, fixes revival and booty attachment, and corrects Anchor/Crab release during host migration.',
  '/coop/quick-join':
    'Quick Join is the public-session discovery route; it is separate from a private invite or code. September’s lobby previews and clearer host status help identify session state, but a failed search still needs version, visibility and connection-method checks.',
  '/coop/no-game-found':
    'First compare game versions, Steam online state, lobby visibility and the intended join method. A copied-code confirmation means the button copied text, not that the target lobby is available; “Waiting for host” is a different state from “No Game Found.”',
  '/save-and-reconnect':
    'Daily and chapter saves were added in August. August 28 fixed reconnecting after leaving during loading, while September corrected host migration and recovery interactions. No official save path, Demo-transfer guarantee or lossless-recovery promise is published.',
  '/troubleshooting':
    'Choose the actual symptom: startup or tutorial loading, no lobby result, waiting for host, voice, host migration, revival or performance. September fixes change the baseline, but safe diagnostics still avoid deleting saves or applying random network changes.',
  '/system-requirements':
    'Steam’s hardware requirements are support context, not a guaranteed FPS target. Steam Deck Verified was announced September 9; startup, GPU occlusion and scene-loading fixes also shipped in late August and September.',
  '/solo-guide':
    'Solo is officially supported and has separate tuning from co-op. September progression, quota, shop and hauling changes also affect run planning: large items became heavier, store unlocks were reordered and quotas were corrected. Check actual prices and objectives.',
  '/golden-weapons':
    'Golden Sword and Golden Hand Cannon were introduced August 26 and described as top-tier at that time. September’s equipment additions and store reordering do not publish new exact damage, price, ammunition or unlock-level tables for them.',
  '/monkey-cart':
    'Separate the hauling cart from Monkey Porter delivery behavior. The cart’s 200 price is an August historical value, not a verified September cost. Current changes include a dedicated cart-upgrade store category, Ship day restrictions and corrected elevator cargo.',
  '/performance':
    'Separate startup loading from low FPS in a particular scene. August 28 addressed GPU occlusion, September 3 improved startup, and September 10 reported faster loading and coin-spawn fixes. Steam Deck Verified is not an independent FPS or battery benchmark.',
  '/revive-guide':
    'September 18 fixed teammate revival and booty attachment, plus Anchor/Crab release during host migration. August’s published floor timers are dated evidence, not a new September measurement; exact stamina costs and every recovery edge case remain unpublished.',
  '/faq':
    'Current short answers: Early Access is live, solo and up-to-four-player co-op are supported, Steam Deck Verified is announced, and September reworked chapters, levels, loot and store progression. No fixed 1.0 date or complete hidden-stat table is published.',
};

// Keep useful original explanations, but remove obsolete claims from the current voice.
function currentWording(value: string): string {
  return value
    .replace(
      'Official patches mention Steam Deck support fixes, but this guide does not claim Valve Verified status without a current store badge.',
      'Steam Deck Verified was announced September 9, following keyboard and navigation fixes. No numeric performance target is promised.',
    )
    .replace(
      'A June Demo patch documented chapter progress saving, and the current Steam page lists Steam Cloud. Exact run persistence and Demo transfer remain unconfirmed.',
      'The August 21 Early Access update confirms saving every day and chapter. September changed chapter structure; Demo transfer and an official save-file path remain unconfirmed.',
    )
    .replace(
      'The launch announcement names Ship, Castle, and eight current threat records. It does not claim that the monster list is complete.',
      'September names Mansion, Ship and Castle, rebuilds Head Crab, and makes enemy sets level-specific. The wiki does not claim a complete roster.',
    )
    .replace(
      'This guide does not claim Valve Verified status. An official patch mentioned Steam Deck support fixes, which is a narrower statement.',
      'Yes. Steam Deck Verified was officially announced September 9, following earlier support fixes. It does not promise a specific FPS or battery life.',
    )
    .replace(
      'A July patch mentions Steam Deck support fixes, but this guide does not claim Valve Verified status without a current store badge.',
      'Steam Deck Verified was announced September 9. Earlier July support fixes are historical context, not the only available evidence.',
    )
    .replace(
      'Steam currently shows a 20% introductory discount ending September 1, 2026.',
      'The launch promotion was a 20% introductory discount ending September 1, 2026; that offer is now historical.',
    )
    .replace(
      'The current introductory discount ends September 1.',
      'The introductory discount ended September 1 and is not a current offer.',
    )
    .replace(
      'Official July notes mention Steam Deck support fixes and additional settings work, but the current store check does not justify claiming Valve Verified status.',
      'September 9 officially announced Steam Deck Verified after earlier keyboard and navigation fixes.',
    )
    .replace(
      'A July patch mentions Steam Deck support fixes, but this guide does not claim Valve Verified status without a current Steam badge.',
      'Steam Deck Verified was announced September 9; this is separate from earlier support-fix history.',
    )
    .replace(
      'No newer official item appeared in the 20 most recent Steam news entries checked for this release.',
      'September subsequently added Boomerang, Cover and Teleport Crystal and reordered store progression; exact new Golden Weapon statistics were not published.',
    )
    .replace(
      'The newest official patch found at research time gives two exact values:',
      'The dated August 26 patch gives two exact values:',
    )
    .replace(
      'The checked official sources do not independently confirm the community-described booty revival detail, an exact stamina cost, pickup animation timing, carry speed, invulnerability, or recovery health.',
      'September 18 explicitly confirms fixes to booty attachment and teammate revival. Exact stamina cost, pickup animation timing, carry speed, invulnerability and recovery health remain unpublished.',
    )
    .replace(
      'Large objects became about 26% lighter on Aug 26, while',
      'Large objects became heavier September 10, while',
    )
    .replace(
      'That should reduce some friction, but it does not remove',
      'That changes the handling baseline but does not remove',
    )
    .replaceAll('Die Together Guide', 'Die Together Wiki')
    .replace(
      /Large objects became about 26% lighter on Aug 26\./g,
      'Large objects became heavier on September 10, superseding August’s reduction.',
    )
    .replace(
      /Large objects are about 26% lighter[^.]*\./g,
      'Large objects became heavier on September 10; no replacement percentage is published.',
    )
    .replace(
      /large objects (?:by about 26%|are about 26% lighter)/g,
      'large objects in a dated August adjustment, superseded by September’s weight increase',
    )
    .replace(
      /makes large objects about 26% lighter/g,
      'records a historical weight reduction later superseded in September',
    )
    .replace(
      /Hauling is lighter, but still a solo risk/g,
      'Hauling changed again in September',
    )
    .replace(/26% weight reduction/g, 'September weight rebalance')
    .replace(
      /800 → 200/g,
      '800 → 200 (August history; current price unverified)',
    )
    .replace(
      /Monkey Cart changed from 800 to 200/g,
      'Monkey Cart changed from 800 to 200 in August; September prices remain unverified',
    )
    .replace(
      /Water Gun is limited to one shop purchase/g,
      'Water Pistol was removed from the store September 10',
    )
    .replace(/One-purchase shop limit/g, 'Removed from the store September 10')
    .replace(
      /Ship and Castle are the (?:two )?current (?:official EA )?locations[^.]*\./g,
      'Mansion, Ship and Castle are identified in September’s current progression.',
    )
    .replace(
      /Current named EA locations are Ship and Castle\./g,
      'Current named locations include Mansion, Ship and Castle.',
    )
    .replace(
      /enter Ship or Castle/g,
      'enter the location selected for your level',
    )
    .replace(/live Ship\/Castle/g, 'current Mansion/Ship/Castle')
    .replace(
      /newest official patch found during the Aug 26 research gate/g,
      'August 26 patch (historical introduction)',
    )
    .replace(
      /Live Early Access · checked Aug 26, 2026/g,
      'Live Early Access · reviewed September 25, 2026',
    );
}
function rewrite<T>(value: T): T {
  if (typeof value === 'string') return currentWording(value) as T;
  if (Array.isArray(value)) return value.map(rewrite) as T;
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, rewrite(v)]),
    ) as T;
  return value;
}
export function applySeptemberRefresh(original: GuidePageData): GuidePageData {
  const page = rewrite(original);
  if (['/privacy', '/terms', '/contact', '/about'].includes(page.route))
    return { ...page, evidenceScope: 'evergreen', lastModified: REVIEW_DATE };
  if (page.route === '/maps/silent-cove')
    return {
      ...page,
      evidenceScope: 'historical',
      buildContext: 'Demo archive · not a current Early Access map',
      checkedAt: REVIEW_DATE,
      lastModified: REVIEW_DATE,
    };
  const relevant = patchesForRoute(page.route).filter(
    (patch) => patch.date >= '2026-08-28',
  );
  const answer = answers[page.route];
  const latestSection = relevant.length
    ? section(
        'september-current',
        'September changes that affect this guide',
        relevant.map((patch) => `${patch.date}: ${patch.summary}`),
        undefined,
        [['/updates/september-2026', 'Read the September evidence timeline']],
      )
    : undefined;
  const avoid = new Set([
    'live-cadence',
    'live-now-aug26',
    'rapid-patch-cadence',
    'live-loop-aug26',
    'first-live-run',
    'live-haul-board',
    'current-item-board',
    'live-location-board',
    'current-patch-board',
    'current-short-answers',
    'aug19-26-canonical',
  ]);
  return {
    ...page,
    evidenceScope: 'current',
    checkedAt: REVIEW_DATE,
    lastModified: REVIEW_DATE,
    eyebrow: 'Current Early Access guide',
    buildContext: 'September review · dated earlier facts remain labeled',
    description: answer
      ? `${answer.slice(0, 157).replace(/\s+\S*$/, '')}…`
      : page.description,
    directAnswer: answer ? [answer] : page.directAnswer,
    sections: [
      ...(latestSection ? [latestSection] : []),
      ...page.sections.filter((s) => !avoid.has(s.id)),
    ],
    sourceIds: [
      ...new Set([
        ...page.sourceIds,
        ...relevant.flatMap((patch) => patch.sourceIds),
        ...([
          '/coop',
          '/troubleshooting',
          '/system-requirements',
          '/faq',
        ].includes(page.route)
          ? ['S22']
          : []),
      ]),
    ],
    related: [
      ...page.related,
      ...(page.related.some((link) => link.href === '/updates/september-2026')
        ? []
        : [
            {
              href: '/updates/september-2026',
              label: 'September updates',
              description: 'Current changes and their official sources.',
            },
          ]),
    ],
  };
}
