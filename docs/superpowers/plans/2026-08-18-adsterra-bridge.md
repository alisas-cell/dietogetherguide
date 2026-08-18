# Adsterra Bridge Monetization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put one exact Adsterra Native Banner and one single-request responsive 728x90/320x50 banner on every public route, only on the apex Production hostname.

**Architecture:** Server Components choose safe placement boundaries and pass the exact route into small Client Components. The client layer starts empty, verifies the apex hostname after hydration, chooses one responsive unit from the initial viewport, and injects the supplied scripts once. Script errors or no-fill timeouts collapse the slot; 404 and non-production hosts never initialize Adsterra.

**Tech Stack:** Next.js 16.3.1 App Router, React 19.2.8, TypeScript 6, Vitest 4, Playwright 1.62, Vercel.

**Spec:** `docs/superpowers/specs/2026-08-18-adsterra-bridge-design.md`

## Global Constraints

- Keep all 24 routes, SEO Titles, H1s, canonicals, JSON-LD, sitemap entries, robots rules, internal links, and design tokens unchanged.
- Load real ads only when `window.location.hostname === "dietogetherguide.shop"`.
- Use only the supplied Native, 728x90, and 320x50 identifiers; 300x250 and every intrusive format remain disabled.
- Each public route renders exactly one `article_mid` and one `responsive_banner`; the custom 404 renders neither.
- Initial viewport width below 800 CSS pixels selects 320x50; 800 or wider selects 728x90. Never initialize both in one page view and never reinitialize on resize.
- Tool ads stay after the complete interactive flow. No ad may interrupt controls, a table, a list, a FAQ answer, a map, or a primary CTA.
- Preserve any Google/AdSense verification found before deployment. Do not create `ads.txt` without a verified publisher record.
- Update Privacy minimally and report `CMP FOLLOW-UP REQUIRED`; do not fabricate consent.
- Implement each behavior test-first and retain every existing test.

---

### Task 1: Lock the ad contract and production gate

**Files:**
- Create: `components/ads/ad-config.ts`
- Test: `tests/ads/ad-config.test.ts`

**Interfaces:**
- Produces: `ADSTERRA_CONFIG`, `MONETIZED_PUBLIC_ROUTES`, `isAdsterraProductionHost(hostname)`, `isMonetizedPublicRoute(pathname)`, and `selectResponsiveUnit(viewportWidth)`.
- Consumes: no application runtime dependencies.

- [ ] **Step 1: Write the failing contract tests**

Cover exact apex acceptance, rejection of localhost/www/Vercel hosts, equality between `MONETIZED_PUBLIC_ROUTES` and the existing `publicRoutes`, the 799/800 boundary, exact keys, exact script URLs, and exact dimensions.

```ts
expect(isAdsterraProductionHost('dietogetherguide.shop')).toBe(true);
expect(isAdsterraProductionHost('dietogetherguide.vercel.app')).toBe(false);
expect(selectResponsiveUnit(799)).toMatchObject({ width: 320, height: 50 });
expect(selectResponsiveUnit(800)).toMatchObject({ width: 728, height: 90 });
expect(new Set(MONETIZED_PUBLIC_ROUTES)).toEqual(new Set(publicRoutes));
```

- [ ] **Step 2: Run the new test and verify RED**

Run: `npm test -- tests/ads/ad-config.test.ts`

Expected: failure because `components/ads/ad-config.ts` does not exist.

- [ ] **Step 3: Implement the immutable centralized configuration**

Define the exact 24-route tuple, native container/script values, responsive keys and invoke URLs, breakpoint `800`, and no-fill timeout. Implement pure selection and gating functions without importing the content registry into the client bundle.

```ts
export function selectResponsiveUnit(width: number) {
  return width >= ADSTERRA_CONFIG.responsive.breakpoint
    ? ADSTERRA_CONFIG.responsive.desktop
    : ADSTERRA_CONFIG.responsive.mobile;
}
```

- [ ] **Step 4: Run the contract test and verify GREEN**

Run: `npm test -- tests/ads/ad-config.test.ts`

Expected: all ad configuration tests pass.

- [ ] **Step 5: Commit the contract**

```bash
git add components/ads/ad-config.ts tests/ads/ad-config.test.ts
git commit -m "feat: define Adsterra bridge contract"
```

### Task 2: Build hydration-safe, fail-closed ad components

**Files:**
- Create: `components/ads/ad-runtime.ts`
- Create: `components/ads/AdsterraNative.tsx`
- Create: `components/ads/AdsterraResponsiveBanner.tsx`
- Create: `components/ads/AdSlot.tsx`
- Test: `tests/ads/ad-components.test.tsx`

**Interfaces:**
- Consumes: Task 1 configuration and pure gate functions.
- Produces: `<AdSlot placement="article_mid" pathname="/route" />` and `<AdSlot placement="responsive_banner" pathname="/route" />`.

- [ ] **Step 1: Write failing server-render and lifecycle tests**

Use `renderToStaticMarkup` to assert semantic slot labels, placement attributes, route attributes, and the absence of third-party `<script>` tags in server HTML. Test the pure runtime state transitions for success, script error, no fill, and duplicate initialization.

```tsx
const html = renderToStaticMarkup(
  <AdSlot placement="article_mid" pathname="/gameplay" />,
);
expect(html).toContain('data-ad-placement="article_mid"');
expect(html).not.toContain('<script');
```

- [ ] **Step 2: Run the component test and verify RED**

Run: `npm test -- tests/ads/ad-components.test.tsx`

Expected: failure because the ad components do not exist.

- [ ] **Step 3: Implement the minimal client runtime**

Render deterministic wrappers, then use `useEffect` to verify hostname and route. Create one external script element per component, add exact Native attributes, assign the exact responsive `window.atOptions`, and append the selected invoke script inside the slot. Guard initialization with a ref, never install a resize listener, and clean observers/timers on unmount.

```ts
if (!isAdsterraProductionHost(window.location.hostname)) return;
if (!isMonetizedPublicRoute(pathname) || initialized.current) return;
initialized.current = true;
```

Use a `MutationObserver` to mark creative content ready. `onerror` and the configured timeout move the wrapper to `failed`, clear provider DOM, and remove its reserved height.

- [ ] **Step 4: Run the component test and verify GREEN**

Run: `npm test -- tests/ads/ad-components.test.tsx`

Expected: all component and lifecycle tests pass without network access.

- [ ] **Step 5: Commit the component layer**

```bash
git add components/ads tests/ads/ad-components.test.tsx
git commit -m "feat: add fail-closed Adsterra slots"
```

### Task 3: Place exactly two ads on every public route

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/article/GuidePage.tsx`
- Modify: `app/tools/coop-troubleshooter/page.tsx`
- Modify: `app/globals.css`
- Test: `tests/e2e/site.spec.ts`

**Interfaces:**
- Consumes: `AdSlot` from Task 2 and each server-known pathname.
- Produces: two safe placement boundaries on home, every GuidePage route, and the tool page.

- [ ] **Step 1: Add failing route-placement E2E tests**

For every `publicRoutes` entry, assert one `article_mid` wrapper and one `responsive_banner` wrapper. Assert the 404 has zero wrappers, localhost makes zero requests whose hosts match the supplied Adsterra hosts, and the tool controls precede both ad positions in DOM order.

```ts
await expect(page.locator('[data-ad-placement="article_mid"]')).toHaveCount(1);
await expect(page.locator('[data-ad-placement="responsive_banner"]')).toHaveCount(1);
```

- [ ] **Step 2: Run the focused E2E tests and verify RED**

Run: `npx playwright test tests/e2e/site.spec.ts --project=desktop-1440x900 --grep "ad placement"`

Expected: failure because public pages contain no ad wrappers.

- [ ] **Step 3: Add the page placements**

Home gets Native after `#field-guide` and responsive after `#maps-teaser`. `GuidePage` inserts Native after section index 1 and responsive after `RelatedGuides`. The tool inserts Native after the safety callout and responsive after `SourceList`. Pass exact route props and keys so a client navigation cannot retain a previous page's creative.

- [ ] **Step 4: Add bounded responsive styling**

Add neutral `Advertisement` labeling, exact 728x90 and 320x50 inner dimensions, centered wrappers, full-bleed mobile handling at 320px, loading-state reservation, and zero-size off/failed states. Do not change existing selectors or design tokens outside the new `.ad-*` rules.

- [ ] **Step 5: Run placement and layout E2E tests and verify GREEN**

Run: `npx playwright test tests/e2e/site.spec.ts --project=desktop-1440x900 --project=mobile-390x844 --grep "ad placement|horizontal overflow"`

Expected: public pages have two wrappers, 404 has none, local requests remain zero, and both viewports have no overflow.

- [ ] **Step 6: Commit placement integration**

```bash
git add app/page.tsx app/tools/coop-troubleshooter/page.tsx app/globals.css components/article/GuidePage.tsx tests/e2e/site.spec.ts
git commit -m "feat: place ads across public routes"
```

### Task 4: Make Privacy match the live monetization state

**Files:**
- Modify: `content/trust.ts`
- Test: `tests/content/registry.test.ts`

**Interfaces:**
- Consumes: the existing `/privacy` GuidePage content record.
- Produces: accurate current disclosure without metadata or route changes.

- [ ] **Step 1: Write the failing disclosure test**

Assert the Privacy record names Adsterra, describes third-party advertising requests and potential cookie/device processing, does not claim user consent, and keeps its exact route, Title, H1, and description literals.

- [ ] **Step 2: Run the disclosure test and verify RED**

Run: `npm test -- tests/content/registry.test.ts`

Expected: failure because Privacy still says the site does not load advertising.

- [ ] **Step 3: Apply the smallest factual Privacy update**

Change the direct answer, advertising/data section, cookie section, and effective date to Aug 18, 2026. Preserve the route, Title, H1, description, breadcrumbs, related links, and schema inputs.

- [ ] **Step 4: Run the disclosure and SEO tests and verify GREEN**

Run: `npm test -- tests/content/registry.test.ts tests/seo/metadata.test.ts tests/seo/routes.test.ts`

Expected: disclosure passes and SEO contracts remain unchanged.

- [ ] **Step 5: Commit the disclosure**

```bash
git add content/trust.ts tests/content/registry.test.ts
git commit -m "docs: disclose Adsterra advertising"
```

### Task 5: Add production-network verification without weakening local tests

**Files:**
- Modify: `tests/e2e/site.spec.ts`

**Interfaces:**
- Consumes: `PLAYWRIGHT_BASE_URL`, `PLAYWRIGHT_EXPECT_LIVE_ADS=1`, and existing viewport projects.
- Produces: opt-in tests that prove real provider requests only in Production.

- [ ] **Step 1: Write opt-in live-network tests**

When `PLAYWRIGHT_EXPECT_LIVE_ADS=1`, capture requests on `/gameplay` and `/`. Assert one Native invoke request, exactly one responsive invoke request, the desktop project never requests the mobile key, and the mobile project never requests the desktop key. Revisit/resizes within the same page must not create a second responsive invoke request.

- [ ] **Step 2: Verify the tests skip safely in local mode**

Run: `npx playwright test tests/e2e/site.spec.ts --project=desktop-1440x900 --grep "live Adsterra requests"`

Expected: skipped because live-network verification is opt-in.

- [ ] **Step 3: Add a fail-closed live check**

Abort the exact provider script URL in a Production browser context, wait beyond the configured failure transition, and assert the page H1, navigation, footer, and tool remain usable while the slot has `data-ad-state="failed"` and no horizontal overflow.

- [ ] **Step 4: Commit production verification coverage**

```bash
git add tests/e2e/site.spec.ts
git commit -m "test: verify live Adsterra request isolation"
```

### Task 6: Full verification, merge, deploy, and production audit

**Files:**
- No new source files expected.

**Interfaces:**
- Consumes: the completed branch and existing Vercel project.
- Produces: a main-backed Production deployment and the requested final report.

- [ ] **Step 1: Run all local quality gates**

Run, reading each complete result:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit --omit=dev --audit-level=high
npx playwright test
```

Expected: zero lint warnings/errors, TypeScript pass, all Vitest tests pass,
build pass, no high/critical production dependency vulnerabilities, and the
full Playwright matrix passes with expected project-scoped skips only.

- [ ] **Step 2: Verify scope and SEO immutability**

Check `git diff --check`, changed-file scope, 24 route count, exact canonical set, sitemap, robots, Titles, H1s, structured data, and the absence of new intrusive-format identifiers or invented `ads.txt` records.

- [ ] **Step 3: Push the branch and fast-forward main**

Push `codex/adsterra-bridge`, fast-forward local `main`, push `main`, and verify origin/main equals the final commit. Do not squash the tested history.

- [ ] **Step 4: Deploy the exact main commit to Vercel Production**

Use the linked project and `--prod`. Record deployment ID, immutable URL, target, Ready state, and Git metadata SHA before testing the custom domain.

- [ ] **Step 5: Run apex Production QA**

Run the 24-route metadata/image/404 audit and five-viewport critical-route matrix against `https://dietogetherguide.shop`. Verify HTTP-to-HTTPS and www redirects remain intact, Production is indexable, and the retained Preview remains noindex.

- [ ] **Step 6: Prove real Adsterra network behavior**

Run the opt-in Playwright live tests at desktop-1440x900 and mobile-390x844 against the apex. Verify Native requests, desktop-only 728 key, mobile-only 320 key, one responsive request per page view, and graceful failure with provider scripts blocked. Run a Preview request capture and verify zero Adsterra requests.

- [ ] **Step 7: Check post-deploy logs and report**

Query Vercel production error and HTTP 500 logs. Return the exact `GSF ADSTERRA BRIDGE REPORT` template, distinguishing script integration from creative fill, listing changed files, the revert/redeploy rollback, `CMP FOLLOW-UP REQUIRED`, and only declaring `ADSTERRA BRIDGE — LIVE` if real Production provider requests were observed.
