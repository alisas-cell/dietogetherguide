import type { PageReview, ReleaseCount, RouteObservation } from './types';
import { normalizedText, qualifyPage } from './qualification';
const origin = 'https://dietogetherguide.shop';
function normalizeUrl(value: string): string {
  try {
    const url = new URL(value);
    if (url.search || url.hash) return '';
    return url.origin + (url.pathname.replace(/\/+$/, '') || '/');
  } catch { return ''; }
}
function duplicates(values: string[]): Set<string> {
  const seen = new Set<string>(), repeated = new Set<string>();
  for (const value of values) { if (seen.has(value)) repeated.add(value); seen.add(value); }
  return repeated;
}
export function evaluateNetNew(baseline: string[], observations: RouteObservation[], reviews: PageReview[], expected = 500): ReleaseCount {
  const old = new Set(baseline);
  const repeatedRoutes = duplicates(observations.map((o) => o.route));
  const repeatedCanonical = duplicates(observations.map((o) => normalizeUrl(o.canonical)).filter(Boolean));
  const repeatedReviews = duplicates(reviews.map((r) => r.route));
  const repeatedIntent = duplicates(reviews.map((r) => normalizedText(r.intent)));
  const repeatedBody = duplicates(reviews.map((r) => r.reviewedDigest));
  const byRoute = new Map(reviews.map((r) => [r.route, r]));
  const exclusions: ReleaseCount['exclusions'] = [];
  const valid = new Set<string>();
  for (const observation of observations) {
    const reasons: string[] = [];
    const { route } = observation;
    if (!route.startsWith('/') || route.startsWith('//') || route.includes('?') || route.includes('#')) reasons.push('invalid-route');
    if (observation.status !== 200) reasons.push('non-200');
    if (/(?:^|[\s,:;])(noindex|none)(?:$|[\s,;])/i.test(observation.metaRobots + ',' + observation.headerRobots)) reasons.push('noindex');
    const canonical = normalizeUrl(observation.canonical);
    if (!canonical || canonical !== normalizeUrl(origin + route)) reasons.push('non-self-canonical');
    if (repeatedRoutes.has(route) || repeatedCanonical.has(canonical)) reasons.push('duplicate-route-or-canonical');
    if (!old.has(route)) {
      const review = byRoute.get(route);
      if (!review) reasons.push('unreviewed');
      else {
        reasons.push(...qualifyPage(review));
        if (repeatedReviews.has(route) || repeatedIntent.has(normalizedText(review.intent)) || repeatedBody.has(review.reviewedDigest)) reasons.push('duplicate-review-intent-or-body');
        if (review.reviewedDigest !== observation.bodyDigest) reasons.push('observed-body-not-reviewed');
      }
    }
    if (reasons.length) exclusions.push({ route, reasons }); else valid.add(route);
  }
  const missingBaseline = [...old].filter((route) => !valid.has(route));
  const netNew = [...valid].filter((route) => route !== '/' && !old.has(route)).length;
  const errors: string[] = [];
  if (old.size !== baseline.length || !old.size) errors.push('invalid-baseline');
  if (missingBaseline.length) errors.push('baseline-not-preserved');
  if (netNew !== expected) errors.push('net-new-target-not-met');
  if (exclusions.length) errors.push('excluded-public-responses');
  return { ok: !errors.length, baselineCount: old.size, finalCount: valid.size, netNew, missingBaseline, exclusions, errors };
}
