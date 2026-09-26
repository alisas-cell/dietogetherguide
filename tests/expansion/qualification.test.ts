import { describe, expect, it } from 'vitest';
import { qualifyPage as checkPage, bodyDigest } from '../../lib/expansion/qualification';
import type { PageReview } from '../../lib/expansion/types';
const policy = { baselineSha: 'baseline', asOf: '2026-09-26T12:00:00Z', maxEvidenceAgeMs: 86_400_000 };
const qualifyPage = (page: PageReview) => checkPage(page, policy);

export function review(route = '/new/one'): PageReview {
  const body = 'Distinct reviewed editorial body for ' + route;
  return {
    route, intent: 'Independent intent ' + route, body, reviewedDigest: bodyDigest(body),
    reviewer: 'editor', artifact: 'A page-specific decision table',
    originality: { baselineSha: 'baseline', intentDistinct: true, bodyDistinct: true, metadataDistinct: true, note: 'Reviewed against baseline and sibling pages' },
    kind: 'editorial', facts: [1, 2, 3].map((n) => ({
      id: 'fact-' + n, claim: 'Different supported claim ' + n,
      sourceUrl: 'https://steamcommunity.com/announcements/' + n,
      evidence: 'Source passage supporting claim ' + n,
      checkedAt: '2026-09-26T12:00:00Z',
      retrievalStatus: 'verified',
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
  it('holds self-declared tool certificates until real artifact verification exists', () => {
    const page = { ...review(), kind: 'tool' as const, facts: [],
      toolProof: { command: 'echo pass', reportPath: '/nonexistent/report.json',
        passedTests: ['a', 'b', 'c'], testedDigest: review().reviewedDigest } };
    expect(qualifyPage(page)).toContain('tool-proof-not-validated');
  });
  it('requires an explicit date policy and originality assessment', () => {
    expect(checkPage(review())).toContain('missing-review-policy');
    const page = review(); delete page.originality;
    expect(qualifyPage(page)).toContain('originality-not-reviewed');
  });
  it.each(['2001-01-01T00:00:00Z', '2026-09-27T00:00:00Z'])('holds stale or future verification %s', (date) => {
    const page = review(); page.facts![0]!.checkedAt = date;
    expect(qualifyPage(page)).toContain('fewer-than-three-distinct-facts');
  });
  it('does not accept a failed retrieval record as evidence', () => {
    const page = review(); page.facts![0]!.retrievalStatus = 'failed';
    expect(qualifyPage(page)).toContain('fewer-than-three-distinct-facts');
  });
});
