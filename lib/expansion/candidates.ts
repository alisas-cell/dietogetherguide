import type { PageReview } from './types';
import { normalizedText, qualifyPage } from './qualification';
export interface Candidate { id: string; route: string; title: string; pool: 'primary' | 'replacement' }
export function parseCandidateManifest(markdown: string): Candidate[] {
  const entries: Candidate[] = [], ids = new Set<string>(), routes = new Set<string>();
  let replacement = 0;
  for (const line of markdown.split('\n')) {
    const match = line.match(/^(?:(\d+)\. |(-) )`([^\`]+)` — \*\*(.+?)\*\*/);
    if (!match) continue;
    const pool = match[1] ? 'primary' : 'replacement';
    const id = match[1] ?? 'R' + ++replacement;
    const route = match[3]!, title = match[4]!;
    if (ids.has(id) || routes.has(route)) throw new Error('Duplicate candidate ID or route: ' + id + ' ' + route);
    ids.add(id); routes.add(route);
    entries.push({ id, route, title, pool });
  }
  return entries;
}
export function assessCandidates(entries: Candidate[], baseline: string[], reviews: PageReview[]): Array<Candidate & { decision: string }> {
  const old = new Set(baseline);
  return entries.map((entry) => {
    const review = reviews.find((r) => r.route === entry.route);
    let decision = 'unreviewed';
    if (old.has(entry.route)) decision = 'exact-collision';
    else if (review) {
      const duplicates = reviews.filter((r) => normalizedText(r.intent) === normalizedText(review.intent));
      decision = duplicates.length > 1 ? 'duplicate-intent' : qualifyPage(review).length ? 'fails-evidence-gate' : 'qualified';
    }
    return { ...entry, decision };
  });
}
