import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseCandidateManifest, assessCandidates } from '../../lib/expansion/candidates';
const markdown = readFileSync('docs/expansion-2026-09-26/requested-route-manifest.md', 'utf8');
describe('candidate manifest is not a publication certificate', () => {
  it('loads exactly 500 primary and 60 replacements, preserving apostrophes', () => {
    const entries = parseCandidateManifest(markdown);
    expect(entries.filter((e) => e.pool === 'primary')).toHaveLength(500);
    expect(entries.filter((e) => e.pool === 'replacement')).toHaveLength(60);
    expect(entries.find((e) => e.route === '/answers/what-is-monarchs-scepter')?.title).toContain("Monarch's");
  });
  it('rejects duplicate IDs and duplicate routes', () => {
    expect(() => parseCandidateManifest('1. `/one` — **One**\n1. `/two` — **Two**')).toThrow();
    expect(() => parseCandidateManifest('1. `/one` — **One**\n2. `/one` — **Two**')).toThrow();
  });
  it('finds the five exact collisions and leaves unreviewed routes pending', () => {
    const baseline = readFileSync('docs/expansion-2026-09-26/baseline-indexable.txt', 'utf8')
      .trim().split('\n').map((url) => new URL(url).pathname);
    const result = assessCandidates(parseCandidateManifest(markdown), baseline, []);
    expect(result.filter((r) => r.decision === 'exact-collision')).toHaveLength(5);
    expect(result.filter((r) => r.decision === 'unreviewed')).toHaveLength(555);
    expect(result.filter((r) => r.decision === 'qualified')).toHaveLength(0);
  });
});
