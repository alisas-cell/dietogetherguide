import { createHash } from 'node:crypto';
import type { PageReview, ReviewPolicy } from './types';
export const bodyDigest = (body: string): string => createHash('sha256').update(body.trim()).digest('hex');
export function qualifyPage(page: PageReview, policy?: ReviewPolicy): string[] {
  const errors: string[] = [];
  if (!policy?.baselineSha || !Number.isFinite(Date.parse(policy.asOf)) ||
      !Number.isFinite(policy.maxEvidenceAgeMs) || policy.maxEvidenceAgeMs < 0) return ['missing-review-policy'];
  const originality = page.originality;
  if (!originality || originality.baselineSha !== policy.baselineSha ||
      !originality.intentDistinct || !originality.bodyDistinct || !originality.metadataDistinct ||
      !originality.note.trim()) errors.push('originality-not-reviewed');
  if (!page.body.trim()) errors.push('empty-body');
  if (!page.reviewer.trim() || page.reviewedDigest !== bodyDigest(page.body)) errors.push('body-not-reviewed');
  if (!page.intent.trim() || !page.artifact.trim()) errors.push('missing-independent-utility');
  if (page.kind === 'tool') {
    // Task3 must add real executable/report artifact verification; string attestations cannot release tools.
    errors.push('tool-proof-not-validated');
    const proof = page.toolProof;
    if (!proof?.command.trim() || !proof.reportPath.trim() || proof.testedDigest !== page.reviewedDigest ||
        new Set(proof.passedTests.filter((test) => test.trim())).size < 3) errors.push('tool-tests-missing');
  } else {
    const facts = (page.facts ?? []).filter((fact) => {
      try {
        const url = new URL(fact.sourceUrl);
        const age = Date.parse(policy.asOf) - Date.parse(fact.checkedAt);
        return ['http:', 'https:'].includes(url.protocol) && fact.id.trim() && fact.evidence.trim() &&
          fact.retrievalStatus === 'verified' && Number.isFinite(age) && age >= 0 && age <= policy.maxEvidenceAgeMs;
      } catch { return false; }
    });
    const claims = new Set(facts.map((fact) => normalizedText(fact.claim)).filter(Boolean));
    if (claims.size < 3 || new Set(facts.map((fact) => fact.id)).size < 3) errors.push('fewer-than-three-distinct-facts');
  }
  return errors;
}
export const normalizedText = (text: string): string => text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
