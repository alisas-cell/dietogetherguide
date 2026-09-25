import { guidePages } from '../content';
import { monsters } from '../data/monsters';
import { items } from '../data/items';
import { maps } from '../data/maps';
import { effects } from '../data/effects';
import { patches } from '../data/patches';
import { sourceById, sources } from '../data/sources';
import { sourceReview } from '../data/current';
import { publicRoutes } from './seo/routes';
export interface FreshnessIssue {
  severity: 'error' | 'warning';
  code: string;
  target: string;
  message: string;
}
export function auditFreshness(now = new Date()): FreshnessIssue[] {
  const issues: FreshnessIssue[] = [];
  const report = (
    code: string,
    target: string,
    message: string,
    severity: 'error' | 'warning' = 'error',
  ) => issues.push({ severity, code, target, message });
  const stale = (date: string | undefined) =>
    !date ||
    !Number.isFinite(Date.parse(date)) ||
    (now.getTime() - Date.parse(date)) / 86400000 > 21;
  const used = new Set<string>();
  for (const page of guidePages) {
    if (page.evidenceScope === 'current' && stale(page.checkedAt))
      report(
        'stale-page',
        page.route,
        'Current review is missing or older than 21 days.',
      );
    for (const id of page.sourceIds) {
      used.add(id);
      if (!sourceById.has(id)) report('missing-source', page.route, id);
    }
    const text = JSON.stringify(page);
    if (
      page.evidenceScope === 'current' &&
      /large objects are about 26% lighter|hauling is lighter|compatibility status still need verification|this guide does not claim Valve Verified/i.test(
        text,
      )
    )
      report(
        'obsolete-mechanic',
        page.route,
        'Old current-voice mechanic or platform claim.',
      );
    if (
      page.evidenceScope === 'current' &&
      /full access (?:is|remains) (?:open|live)|event is still live/i.test(text)
    )
      report(
        'expired-event',
        page.route,
        'Expired full-access event presented as current.',
      );
    if (
      page.evidenceScope === 'current' &&
      /Demo.{0,30}(?:confirmed live roster|current spawn table)/i.test(text)
    )
      report(
        'demo-contamination',
        page.route,
        'Demo context promoted without current evidence.',
      );
  }
  for (const entity of [...monsters, ...items, ...maps, ...effects]) {
    if (
      (entity.status === 'ea-confirmed' || entity.status === 'ea-live') &&
      stale(entity.lastVerifiedAt)
    )
      report('stale-entity', entity.id, 'Current entity has no recent review.');
    const fields = JSON.stringify(entity).matchAll(/"sourceIds":\[(.*?)\]/g);
    for (const match of fields)
      for (const id of JSON.parse('[' + match[1] + ']') as string[]) {
        used.add(id);
        if (!sourceById.has(id)) report('missing-source', entity.id, id);
      }
  }
  for (const patch of patches) {
    for (const id of patch.sourceIds) {
      used.add(id);
      if (!sourceById.has(id)) report('missing-source', patch.id, id);
    }
    for (const route of patch.affectedRoutes)
      if (!publicRoutes.includes(route))
        report('broken-patch-route', patch.id, route);
  }
  const newest = patches.reduce(
    (date, p) => (p.date > date ? p.date : date),
    '',
  );
  for (const monster of monsters.filter((m) => m.status === 'ea-confirmed')) {
    const relevant = patches.filter(
      (p) =>
        p.date >= '2026-08-28' &&
        p.changes.some((c) => c.affectedEntityIds?.includes(monster.id)),
    );
    for (const patch of relevant)
      if (!monster.patchChanges?.some((c) => c.date === patch.date))
        report(
          'missing-entity-patch',
          monster.id,
          'Missing recorded change for ' + patch.date,
        );
  }
  if (newest !== sourceReview.latestGameplayPatch)
    report(
      'missing-latest-patch',
      'patches',
      'Latest stored patch differs from the researched official archive.',
    );
  if (stale(sourceReview.checkedAt))
    report(
      'stale-research-gate',
      'official-news',
      'Official archive needs a new review; this script does not claim to fetch live news.',
    );
  for (const source of sources)
    if (!used.has(source.id))
      report(
        'unreferenced-source',
        source.id,
        'Source has no page, entity or patch consumer. Ledger-only listing is not a substantive reference.',
        'warning',
      );
  return issues;
}
