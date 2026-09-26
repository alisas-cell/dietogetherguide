import { readFileSync } from 'node:fs';
import { publicRoutes } from '../lib/seo/routes';
import { getRouteMonetization } from '../components/ads/ad-config';
import { sourceReview } from '../data/current';
import { parseCandidateManifest, assessCandidates } from '../lib/expansion/candidates';
import { bodyDigest, qualifyPage } from '../lib/expansion/qualification';
import { evaluateNetNew } from '../lib/expansion/net-new';
import { permitsUnrestrictedCrawl } from '../lib/expansion/robots';
import type { PageReview, RouteObservation } from '../lib/expansion/types';

const directory = 'docs/expansion-2026-09-26/';
const baseline = readFileSync(directory + 'baseline-indexable.txt', 'utf8').trim().split('\n').map((url) => new URL(url).pathname);
const candidates = parseCandidateManifest(readFileSync(directory + 'requested-route-manifest.md', 'utf8'));
const reviews: PageReview[] = JSON.parse(readFileSync('data/expansion/editorial-reviews.json', 'utf8'));
const policy = { baselineSha: JSON.parse(readFileSync(directory + 'baseline-routes.json', 'utf8')).sha as string,
  asOf: new Date().toISOString(), maxEvidenceAgeMs: 86_400_000 };
const mode = process.argv[2] ?? 'readiness';
const errors: string[] = [];
let details: unknown;
let scope = 'Static repository checks only; no live HTTP, source availability, ad fill or semantic originality certification.';

if (mode === 'readiness') {
  const rows = assessCandidates(candidates, baseline, reviews, policy);
  const decisions = Object.fromEntries([...new Set(rows.map((r) => r.decision))].map((decision) => [decision, rows.filter((r) => r.decision === decision).length]));
  details = { primary: candidates.filter((c) => c.pool === 'primary').length, replacements: candidates.filter((c) => c.pool === 'replacement').length, decisions };
  if ((decisions.qualified ?? 0) !== 500) errors.push('Exactly 500 completed editorial/tool reviews are not present. Draft-ready candidates are not publication approvals.');
} else if (mode === 'routes') {
  const missing = baseline.filter((route) => !publicRoutes.includes(route));
  details = { baseline: baseline.length, registered: publicRoutes.length, newRegistered: publicRoutes.filter((r) => !baseline.includes(r)).length, missing };
  if (missing.length) errors.push('Baseline routes missing from registry');
  if (new Set(publicRoutes).size !== publicRoutes.length) errors.push('Duplicate registered routes');
} else if (mode === 'sources' || mode === 'thin-pages') {
  const issues = reviews.map((review) => ({ route: review.route, issues: qualifyPage(review, policy) })).filter((r) => r.issues.length);
  details = { reviewedNewPages: reviews.length, issues,
    knownLatestOfficialPatch: '2026-09-25', representedLatestPatch: sourceReview.latestGameplayPatch,
    evidenceReport: directory + 'evidence-review.md',
    limitation: 'Evidence records require human contextual review. Three records alone do not prove independent facts or useful content.' };
  if (reviews.length !== 500 || issues.length) errors.push('500 independently qualified page reviews not available');
  if (mode === 'sources' && sourceReview.latestGameplayPatch < '2026-09-25') errors.push('Known September 25 official patch is not reflected in the current content model');
} else if (mode === 'ads') {
  const missing: string[] = [], invalid: string[] = [];
  for (const route of publicRoutes) {
    const plan = getRouteMonetization(route);
    if (!plan) { missing.push(route); continue; }
    if (plan.eligible && (!plan.placements.includes('native_primary') || !plan.placements.includes('early_responsive'))) invalid.push(route);
    if (new Set(plan.placements).size !== plan.placements.length) invalid.push(route);
  }
  details = { registered: publicRoutes.length, eligible: publicRoutes.filter((r) => getRouteMonetization(r)?.eligible).length,
    legalExclusions: ['/privacy', '/terms'], missing, invalid,
    limitation: 'Run tests/ads and browser privacy tests for layout/consent. Provider fill and real CLS are not established by this registry check.' };
  if (missing.length || invalid.length) errors.push('Ad registration/placement failures');
} else if (mode === 'net-new-500') {
  const base = process.env.AUDIT_BASE_URL;
  if (!base) throw new Error('AUDIT_BASE_URL is required: use a production-equivalent server or canonical production; Preview noindex must not be overridden.');
  scope = 'Live HTTP responses, robots, canonical and reviewed-body digest. Not Google index coverage; semantic review remains separately required.';
  const observations: RouteObservation[] = [];
  for (let start = 0; start < publicRoutes.length; start += 6) {
    await Promise.all(publicRoutes.slice(start, start + 6).map(async (route) => {
      try {
        const response = await fetch(new URL(route, base), { redirect: 'manual', signal: AbortSignal.timeout(15_000) });
        const html = await response.text();
        // Current Next renderer uses these exact attributes. Missing extraction fails closed.
        const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '';
        const metaRobots = [...html.matchAll(/<meta name="(?:robots|googlebot)" content="([^"]*)"/g)].map((m) => m[1]).join(',');
        const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1] ?? '';
        observations.push({ route, status: response.status, canonical, metaRobots,
          headerRobots: response.headers.get('x-robots-tag') ?? '', bodyDigest: bodyDigest(article) });
      } catch (error) {
        errors.push(route + ': ' + String(error));
        observations.push({ route, status: 0, canonical: '', metaRobots: '', headerRobots: '', bodyDigest: '' });
      }
    }));
  }
  const result = evaluateNetNew(baseline, observations, reviews, 500, policy);
  const sitemapResponse = await fetch(new URL('/sitemap.xml', base), { signal: AbortSignal.timeout(15_000) });
  const sitemap = await sitemapResponse.text();
  const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]!);
  const sitemapRoutes = sitemapUrls.map((url) => new URL(url).pathname);
  if (sitemapResponse.status !== 200 || sitemap.includes('<sitemapindex') ||
      sitemapUrls.some((url) => new URL(url).origin !== 'https://dietogetherguide.shop') ||
      new Set(sitemapRoutes).size !== sitemapRoutes.length ||
      sitemapRoutes.length !== publicRoutes.length || publicRoutes.some((r) => !sitemapRoutes.includes(r))) errors.push('Sitemap differs from observed route set; sitemap indexes require recursive support before passing this gate');
  const robots = await fetch(new URL('/robots.txt', base), { signal: AbortSignal.timeout(15_000) });
  const robotsText = await robots.text();
  if (robots.status !== 200 || !permitsUnrestrictedCrawl(robotsText)) errors.push('robots.txt unavailable or requires per-route rule evaluation; this scaffold fails closed on any nonempty Disallow');
  details = { base, ...result, sitemapUrls: sitemapUrls.length, observations };
  errors.push(...result.errors);
} else throw new Error('Unknown audit mode: ' + mode);

console.log(JSON.stringify({ mode, checkedAt: new Date().toISOString(), scope, policy, details, errors, passed: errors.length === 0 }, null, 2));
if (errors.length) process.exitCode = 1;
