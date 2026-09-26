import { createHash } from 'node:crypto';
import type { PageReview } from './types';
export const bodyDigest = (body: string): string => createHash('sha256').update(body.trim()).digest('hex');
export function qualifyPage(page: PageReview): string[] {
  const errors: string[] = [];
  if (!page.body.trim()) errors.push('empty-body');
  if (!page.reviewer.trim() || page.reviewedDigest !== bodyDigest(page.body)) errors.push('body-not-reviewed');
  if (!page.intent.trim() || !page.artifact.trim()) errors.push('missing-independent-utility');
  if (page.kind === 'tool') {
    const proof = page.toolProof;
    if (!proof?.command.trim() || !proof.reportPath.trim() || proof.testedDigest !== page.reviewedDigest ||
        new Set(proof.passedTests.filter((test) => test.trim())).size < 3) errors.push('tool-tests-missing');
  } else {
    const facts = (page.facts ?? []).filter((fact) => {
      try {
        const url = new URL(fact.sourceUrl);
        return ['http:', 'https:'].includes(url.protocol) && fact.id.trim() && fact.evidence.trim() &&
          Number.isFinite(Date.parse(fact.checkedAt));
      } catch { return false; }
    });
    const claims = new Set(facts.map((fact) => normalizedText(fact.claim)).filter(Boolean));
    if (claims.size < 3 || new Set(facts.map((fact) => fact.id)).size < 3) errors.push('fewer-than-three-distinct-facts');
  }
  return errors;
}
export const normalizedText = (text: string): string => text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
