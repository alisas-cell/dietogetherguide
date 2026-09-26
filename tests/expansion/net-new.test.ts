import { describe, expect, it } from 'vitest';
import { evaluateNetNew } from '../../lib/expansion/net-new';
import { bodyDigest } from '../../lib/expansion/qualification';
import type { PageReview, RouteObservation } from '../../lib/expansion/types';

const origin = 'https://dietogetherguide.shop';
function fixture(n = 500) {
  const baseline = ['/'];
  const reviews: PageReview[] = Array.from({ length: n }, (_, i) => {
    const route = '/new/' + i, body = 'Unique content with reviewed task ' + i;
    return { route, body, intent: 'Intent ' + i, reviewedDigest: bodyDigest(body),
      reviewer: 'editor', artifact: 'Table for task ' + i, kind: 'editorial',
      facts: [1, 2, 3].map((f) => ({ id: i + '-' + f, claim: 'Claim ' + i + '-' + f,
        sourceUrl: origin + '/source/' + f, evidence: 'Passage ' + f, checkedAt: '2026-09-26T12:00:00Z' })),
    };
  });
  const observations: RouteObservation[] = ['/', ...reviews.map((r) => r.route)].map((route) => ({
    route, status: 200, canonical: origin + route, metaRobots: 'index, follow',
    headerRobots: '', bodyDigest: reviews.find((r) => r.route === route)?.reviewedDigest ?? 'baseline',
  }));
  return { baseline, reviews, observations };
}
describe('net-new indexable release contract', () => {
  it.each([499, 500, 501])('requires exactly 500, observed %i', (n) => {
    const f = fixture(n), result = evaluateNetNew(f.baseline, f.observations, f.reviews);
    expect(result.ok).toBe(n === 500); expect(result.netNew).toBe(n);
  });
  it('cannot hide a missing old URL with an extra new URL', () => {
    const f = fixture(501); f.observations.shift();
    const result = evaluateNetNew(f.baseline, f.observations, f.reviews);
    expect(result.ok).toBe(false); expect(result.missingBaseline).toEqual(['/']);
  });
  it.each([
    { status: 301 }, { status: 404 }, { metaRobots: 'noindex,follow' },
    { headerRobots: 'googlebot: noindex' }, { metaRobots: 'none' },
    { canonical: '' }, { canonical: 'https://other.test/new/0' },
    { bodyDigest: 'not-reviewed-body' },
  ])('excludes technical failure %j', (patch) => {
    const f = fixture(); Object.assign(f.observations[1]!, patch);
    const result = evaluateNetNew(f.baseline, f.observations, f.reviews);
    expect(result.ok).toBe(false); expect(result.netNew).toBe(499);
  });
  it('rejects normalized duplicate canonical and observations', () => {
    const f = fixture(); f.observations[2]!.canonical = origin + '/new/0/';
    f.observations.push({ ...f.observations[1]! });
    expect(evaluateNetNew(f.baseline, f.observations, f.reviews).ok).toBe(false);
  });
  it('does not count an unreviewed candidate or duplicate intent/body', () => {
    const f = fixture(); f.reviews[1]!.intent = f.reviews[0]!.intent; f.reviews.pop();
    const result = evaluateNetNew(f.baseline, f.observations, f.reviews);
    expect(result.ok).toBe(false); expect(result.netNew).toBeLessThan(500);
  });
});
