import { describe, expect, it } from 'vitest';
import { qualifyPage, bodyDigest } from '../../lib/expansion/qualification';
import type { PageReview } from '../../lib/expansion/types';

export function review(route = '/new/one'): PageReview {
  const body = 'Distinct reviewed editorial body for ' + route;
  return {
    route, intent: 'Independent intent ' + route, body, reviewedDigest: bodyDigest(body),
    reviewer: 'editor', artifact: 'A page-specific decision table',
    kind: 'editorial', facts: [1, 2, 3].map((n) => ({
      id: 'fact-' + n, claim: 'Different supported claim ' + n,
      sourceUrl: 'https://steamcommunity.com/announcements/' + n,
      evidence: 'Source passage supporting claim ' + n,
      checkedAt: '2026-09-26T12:00:00Z',
    })),
  };
}
describe('editorial qualification is separate from technical indexability', () => {
  it('accepts a reviewed body with three distinct evidence records', () => {
    expect(qualifyPage(review())).toEqual([]);
  });
  it('rejects three copies of the same claim under different IDs', () => {
    const page = review();
    page.facts!.forEach((fact) => { fact.claim = 'Same fact.'; });
    expect(qualifyPage(page)).toContain('fewer-than-three-distinct-facts');
  });
  it('rejects unsupported facts and an empty shell', () => {
    const page = review();
    page.body = ''; page.facts![0]!.evidence = '';
    expect(qualifyPage(page)).toContain('empty-body');
    expect(qualifyPage(page)).toContain('fewer-than-three-distinct-facts');
  });
  it('invalidates a review after body changes', () => {
    const page = review(); page.body += ' Changed';
    expect(qualifyPage(page)).toContain('body-not-reviewed');
  });
  it('does not approve an untested tool in place of editorial evidence', () => {
    expect(qualifyPage({ ...review(), kind: 'tool', facts: [] })).toContain('tool-tests-missing');
  });
});
