import { BATCH_REVIEW_DATE, chapterWordingCaution, september25Patch, september25Route } from '../data/september26';
import { qualifiedBatchPages } from './qualified-batch';
import { section } from './wiki-factory';
import type { GuidePageData } from './types';

const sourceNotes: Record<string, number[]> = {
  '/quota': [0], '/guides/quota': [0], '/solo-guide': [0, 1], '/store': [1], '/guides/store-unlocks': [1],
  '/progression': [0, 1], '/guides/progression': [0, 1], '/levels': [0], '/chapters': [0],
  '/monsters/ear': [2], '/monsters/anchorer': [3], '/monsters/mimic': [4], '/monsters/kraken': [8],
  '/maps/castle': [6], '/maps/ship': [8], '/guides/elevators': [6, 9], '/items/instruments': [7],
  '/coop': [5], '/revive-guide': [5], '/save-and-reconnect': [5], '/troubleshooting': [5, 6],
};
const chapterRoutes = new Set(['/quota', '/guides/quota', '/progression', '/guides/progression', '/levels', '/chapters', '/solo-guide']);
const owners: Record<string, string[]> = {
  '/updates': ['/updates/september-25-mimic-coop-sync', '/updates/sep-01-cleaner-carrying-fresh-loot', '/updates/aug-28-healing-fish-fixes', '/updates/changes/slot-machine-dice-refund'],
  '/updates/september-2026': [september25Route],
  '/store': ['/updates/changes/slot-machine-dice-refund'],
  '/items-and-weapons': ['/items/cauldron'],
  '/tutorial': ['/items/cauldron'],
  '/guides': ['/guides/returning-player-guide'],
  '/system-requirements': ['/platform/language-support'],
};
const latestAnswer = 'The latest gameplay announcement found is September 25, 2026. It changes solo quota and shop balances and fixes co-op, enemy and elevator interactions. Earlier patch entries below remain dated history.';

export function applySeptember26Refresh(page: GuidePageData): GuidePageData {
  const affected = september25Patch.affectedRoutes.includes(page.route);
  const links = (owners[page.route] ?? []).map((route) => {
    const target = qualifiedBatchPages.find((entry) => entry.route === route)!;
    return { href: route, label: target.h1, description: target.description };
  });
  if (!affected && !links.length) return page;
  let directAnswer = page.directAnswer;
  if (page.route === '/updates') directAnswer = [latestAnswer];
  else if (page.route === '/updates/september-2026') directAnswer = ['September 2026 changed progression, equipment and recovery repeatedly. This month-by-month evidence timeline now includes the September 25 solo, shop, enemy and co-op corrections; retain the date when comparing earlier behavior.'];
  else if (page.route === '/early-access') directAnswer = [page.directAnswer.join(' ').replace('The latest gameplay patch found is September 18.', 'The latest gameplay patch found is September 25.')];
  else if (page.route === '/quota')
    directAnswer = ['Read the target shown in your run. September 25 removes the solo quota threshold for the first four levels of Chapter 1; do not apply the older rising-quota description universally. The announcements leave some chapter-label wording unresolved.'];
  else if (page.route === '/guides/quota')
    directAnswer = ['Plan a return from the actual target and secured value, not an old quota chart. September 25 adds a solo exception for the first four levels of Chapter 1. Keep carried cargo and uncertain finds separate from money already secured.'];
  else if (page.route === '/store')
    directAnswer = ['Use the prices and balance shown in the current shop. September 25 raises starting prices in shops 2–5 and removes the earned-gold cap on area transitions. A complete current price or unlock table is not published.'];
  const notes = sourceNotes[page.route]?.map((i) => september25Patch.changes[i]!.text) ?? [];
  const currentSection = notes.length ? {
    ...section('september-25-current', 'September 25: current corrections', [
      ...notes, ...(chapterRoutes.has(page.route) ? [chapterWordingCaution] : []),
    ], undefined, [[september25Route, 'Read the September 25 patch context']]),
  } : undefined;
  return {
    ...page, directAnswer,
    description: directAnswer !== page.directAnswer ? directAnswer.join(' ').slice(0, 157).replace(/\s+\S*$/, '') + '…' : page.description,
    checkedAt: affected ? BATCH_REVIEW_DATE : page.checkedAt, lastModified: BATCH_REVIEW_DATE,
    sections: [...(currentSection ? [currentSection] : []), ...page.sections],
    sourceIds: [...new Set([...page.sourceIds, ...(affected ? ['S28'] : [])])],
    related: [...page.related, ...links.filter((link) => !page.related.some((old) => old.href === link.href))],
  };
}
