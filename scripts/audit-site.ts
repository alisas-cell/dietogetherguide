import { publicRoutes } from '../lib/seo/routes';
import { canonicalUrl } from '../lib/seo/metadata';
const base = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:3110';
const findings: Array<{ route: string; issues: string[]; title: string }> = [];
for (let index = 0; index < publicRoutes.length; index += 8)
  await Promise.all(
    publicRoutes.slice(index, index + 8).map(async (route) => {
      const response = await fetch(base + route, { redirect: 'manual' });
      const html = await response.text();
      const issues: string[] = [];
      const title = html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '';
      if (response.status !== 200) issues.push('HTTP ' + response.status);
      if ((html.match(/<h1(?:\s|>)/g) ?? []).length !== 1)
        issues.push('Expected exactly one H1');
      if (!title.endsWith('| Die Together Wiki'))
        issues.push('Title brand suffix');
      if (!html.includes('rel="canonical" href="' + canonicalUrl(route) + '"'))
        issues.push('Canonical mismatch');
      if (!/<meta name="description" content="[^"]+"/.test(html))
        issues.push('Missing description');
      if (!/<meta property="og:image" content="[^"]+"/.test(html))
        issues.push('Missing OG image');
      for (const match of html.matchAll(
        /<script type="application\/ld\+json">(.*?)<\/script>/gs,
      )) {
        try {
          JSON.parse(match[1]!);
        } catch {
          issues.push('Invalid JSON-LD');
        }
      }
      findings.push({ route, issues, title });
    }),
  );
const titles = new Set<string>();
for (const page of findings) {
  if (titles.has(page.title)) page.issues.push('Duplicate title');
  titles.add(page.title);
}
const sitemap = await (await fetch(base + '/sitemap.xml')).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const summary = {
  base,
  checkedAt: new Date().toISOString(),
  routes: findings.length,
  sitemapUrls: urls.length,
  failures: findings.filter((p) => p.issues.length),
  sitemapCanonical: urls.every((url) =>
    url?.startsWith('https://dietogetherguide.shop'),
  ),
  sitemapMatches: publicRoutes.every((route) =>
    urls.includes(canonicalUrl(route)),
  ),
};
console.log(JSON.stringify(summary, null, 2));
if (
  summary.failures.length ||
  !summary.sitemapMatches ||
  !summary.sitemapCanonical
)
  process.exitCode = 1;
