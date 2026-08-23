# Top-Heavy Max-Harvest Monetization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship every supplied Adsterra format at its earliest safe route-aware placement while preserving the existing SEO, privacy gate, legal exclusions, and Production-only network boundary.

**Architecture:** One typed registry owns exact provider inputs, route classes, modes, eligibility, and placement plans. Route-scoped Client Components inject one Native or Banner unit after the privacy/host/debug gate; Banner GET CODE runs through a document queue so `window.atOptions` cannot collide. A root Client Component initializes Popunder and Social Bar once per document and exposes a network-off debug panel.

**Tech Stack:** Next.js 16.3.1 App Router, React 19.2.8, TypeScript 6, Vitest 4, Playwright 1.62, Vercel.

**Spec:** `docs/superpowers/specs/2026-08-24-top-heavy-max-harvest-design.md`

## Global Constraints

- Exact Production hostname: `dietogetherguide.shop`.
- Exact provider strings, keys, dimensions, container ID, attributes, and Smartlink from the approved spec cannot be normalized or substituted.
- H1 and Direct Answer/first useful status must render before the first inline display unit.
- Each provider key and the Native container occur at most once in an active route document tree.
- Mobile never requests 728x90, 468x60, 160x300, or 160x600; desktop never requests 320x50.
- `?ad_debug=1`, localhost, test, Preview, Vercel hosts, legal routes, unknown routes, and the custom 404 make zero Provider requests.
- Smartlink is visibly sponsored, has no live href in debug, and requires a deliberate click.
- Existing consent behavior, Privacy content, AdSense/ownership state, routes, Titles, H1s, descriptions, canonicals, schema, sitemap, robots, images, and internal links remain unchanged.
- Implementation follows failing-test-first TDD and each behavior is verified before its commit.

---

### Task 1: Typed provider, route, and placement registry

**Files:**
- Modify: `tests/ads/ad-config.test.ts`
- Modify: `components/ads/ad-config.ts`
- Test: `tests/seo/metadata.test.ts`
- Test: `tests/seo/routes.test.ts`

**Interfaces:**
- Produces: `AdFormat`, `AdPlacement`, `PageClass`, `MonetizationMode`, `BannerAdUnit`, `RouteMonetizationPlan`.
- Produces: `ADSTERRA_CONFIG`, `ROUTE_MONETIZATION`, `MONETIZED_PUBLIC_ROUTES`, `getRouteMonetization`, `routeHasPlacement`, `selectBannerUnit`, `isAdDebugSearch`, and `canInitializeAdsterra`.

- [ ] **Step 1: Write failing registry tests**

  Add literal expectations for every exact GET CODE value, all 24 route classes,
  the 22 eligible routes, the two legal exclusions, unique page placements,
  debug rejection, and viewport rules at 320, 375, 390, 767, 768, 799, 800,
  1020, 1021, and 1440. The production change each test catches is a wrong
  provider input, route leak, duplicate unit, or wrong-breakpoint request.

  ```ts
  expect(getRouteMonetization('/privacy')).toMatchObject({
    pageClass: 'legal',
    mode: 'off',
    eligible: false,
    placements: [],
  });
  expect(canInitializeAdsterra({
    debugMode: true,
    hostname: 'dietogetherguide.shop',
    pathname: '/gameplay',
    privacyAllowsAds: true,
  })).toBe(false);
  expect(selectBannerUnit('horizontal_468', 767)).toBeNull();
  expect(selectBannerUnit('horizontal_468', 768)?.width).toBe(468);
  ```

- [ ] **Step 2: Run the focused tests and observe the intended failures**

  Run: `npm test -- tests/ads/ad-config.test.ts tests/seo/metadata.test.ts tests/seo/routes.test.ts`

  Expected: registry tests fail because the new types, supplied URLs, page
  classes, legal exclusions, placements, and debug input do not exist.

- [ ] **Step 3: Implement the minimal typed registry**

  Replace the two-unit configuration with exact unit records and a literal
  route plan keyed by every public route. Validate placement uniqueness through
  a pure helper rather than duplicating decision logic in components.

  ```ts
  export type AdPlacement =
    | 'early_responsive'
    | 'native_primary'
    | 'smartlink_primary'
    | 'rectangle_300'
    | 'horizontal_468'
    | 'sidebar_160x300'
    | 'sidebar_160x600';

  export function selectBannerUnit(
    placement: AdPlacement,
    viewportWidth: number,
  ): BannerAdUnit | null;
  ```

- [ ] **Step 4: Run focused tests to green and verify SEO locks remain green**

  Run: `npm test -- tests/ads/ad-config.test.ts tests/seo/metadata.test.ts tests/seo/routes.test.ts`

  Expected: all focused tests pass with 22 eligible routes and unchanged SEO
  identities.

- [ ] **Step 5: Commit the registry**

  ```bash
  git add components/ads/ad-config.ts tests/ads/ad-config.test.ts
  git commit -m "feat: register max-harvest ad inventory"
  ```

### Task 2: Safe route-scoped and document-singleton runtimes

**Files:**
- Modify: `tests/ads/ad-components.test.tsx`
- Modify: `components/ads/ad-runtime.ts`
- Modify: `components/ads/AdSlot.tsx`
- Modify: `components/ads/AdsterraNative.tsx`
- Delete: `components/ads/AdsterraResponsiveBanner.tsx`
- Create: `components/ads/AdsterraBanner.tsx`
- Create: `components/ads/AdsterraGlobals.tsx`
- Create: `components/ads/AdDebugPanel.tsx`
- Create: `components/ads/SponsoredSmartlink.tsx`
- Create: `components/ads/MonetizationRuntime.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: Task 1 registry and current `usePrivacyConsent().canLoadAds`.
- Produces: `enqueueBannerLoad`, `AdSlot`, `MonetizationRuntime`.
- `AdSlot` props: `{ pathname: string; placement: AdPlacement }`.

- [ ] **Step 1: Write failing component and runtime tests**

  Assert SSR produces deterministic wrappers without scripts; Smartlink SSR is
  visibly sponsored; Native uses one route placement; fixed Banner placements
  expose intended format data without selecting hidden formats on the server;
  debug state is representable; and the load-state reducer handles activate,
  creative, exclusion, debug, and failure.

  ```tsx
  const html = renderToStaticMarkup(
    <AdSlot pathname="/gameplay" placement="smartlink_primary" />,
  );
  expect(html).toContain('Sponsored Resource');
  expect(html).toContain('rel="nofollow noopener noreferrer sponsored"');
  expect(html).not.toContain('<script');
  ```

- [ ] **Step 2: Run the component tests and observe missing behavior**

  Run: `npm test -- tests/ads/ad-components.test.tsx`

  Expected: tests fail because new placements, components, and states are absent.

- [ ] **Step 3: Implement Native, Banner queue, Smartlink, globals, and debug**

  Banner effects choose one supported unit from initial width, then enqueue a
  task that sets exact `window.atOptions` and appends its script. The next task
  starts only after load/error, preventing global option collisions. Cleanup
  removes route-scoped creatives and invalidates queued work for an unmounted
  route. Native retains exact `async` and `data-cfasync` attributes.

  Popunder and Social Bar append scripts marked by unique `data-adsterra-global`
  values and are never removed or added twice. The root runtime uses
  `usePathname`; query inspection happens in a Client effect without converting
  static pages to request-time rendering.

- [ ] **Step 4: Run component and privacy tests to green**

  Run: `npm test -- tests/ads/ad-components.test.tsx tests/privacy/consent.test.ts tests/privacy/privacy-components.test.tsx`

  Expected: all tests pass, with the existing privacy decision model unchanged.

- [ ] **Step 5: Commit the runtime**

  ```bash
  git add app/layout.tsx components/ads tests/ads/ad-components.test.tsx
  git commit -m "feat: add singleton max-harvest runtimes"
  ```

### Task 3: Earliest-safe page-class placements

**Files:**
- Create: `tests/ads/ad-layout.test.tsx`
- Modify: `components/article/GuidePage.tsx`
- Modify: `app/page.tsx`
- Modify: `app/tools/coop-troubleshooter/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `routeHasPlacement`, `getRouteMonetization`, and `AdSlot`.
- Produces: identical SEO/editorial page trees with inserted monetization
  boundaries and non-sticky desktop ad rails.

- [ ] **Step 1: Write failing rendered-order and density tests**

  Render representative short, medium, long, hub, trust, legal, homepage, and
  tool pages. Assert the first responsive unit follows the Direct Answer/status,
  Native follows a complete first section, each later unit follows another
  complete section, legal pages have zero placements, and every class exposes
  the configured count without duplicate placement names.

  ```ts
  expect(order.indexOf('article-direct-answer')).toBeLessThan(
    order.indexOf('early_responsive'),
  );
  expect(privacyMarkup).not.toContain('data-ad-placement');
  expect(new Set(activePlacements).size).toBe(activePlacements.length);
  ```

- [ ] **Step 2: Run layout tests and observe the old late/two-slot layout fail**

  Run: `npm test -- tests/ads/ad-layout.test.tsx tests/content/registry.test.ts`

  Expected: failures show the responsive unit is still at the bottom, Native is
  after section two, legal pages are monetized, and extra formats are missing.

- [ ] **Step 3: Implement placement boundaries without editing prose**

  In `GuidePage`, render `early_responsive` immediately after Evidence. Insert
  inline placements only between `Fragment` section boundaries. Render vertical
  slots as separate non-sticky sidebar siblings. In Home, move the responsive
  slot after metrics and place later units after the named complete sections. In
  the tool, keep controls/results uninterrupted and place later units after the
  complete explanatory/result area.

- [ ] **Step 4: Implement exact-size, responsive, debug, and non-sticky CSS**

  Add exact creative boxes for 320x50, 728x90, 300x250, 468x60, 160x300, and
  160x600. Hide unsupported wrappers before activation, use full-bleed only for
  320px mobile, keep sidebars at `min-width: 1021px`, and never scale creatives.
  Debug placeholders remain visible and labeled while live `off`, `failed`, and
  `excluded` wrappers collapse.

- [ ] **Step 5: Run layout, content, SEO, and full unit tests to green**

  Run: `npm test`

  Expected: all tests pass; content and SEO registries are byte-for-byte stable
  except for ad component imports and placement markup.

- [ ] **Step 6: Commit placements and styling**

  ```bash
  git add app components/article tests/ads/ad-layout.test.tsx
  git commit -m "feat: place ads at earliest safe boundaries"
  ```

### Task 4: Browser contract for network, SPA, dimensions, CLS, and SEO

**Files:**
- Modify: `tests/e2e/site.spec.ts`
- Modify: `tests/e2e/privacy-consent.spec.ts`
- Create: `tests/e2e/max-harvest.spec.ts`
- Modify: `playwright.production-equivalent.config.ts`

**Interfaces:**
- Consumes: Production-equivalent canonical-host proxy and exact provider URL list.
- Produces: browser proof for the complete redline contract.

- [ ] **Step 1: Update old two-slot expectations and write failing browser tests**

  Mock every supplied script URL independently. Assert zero requests before
  consent, after rejection, on direct legal routes, on Preview/localhost, and in
  debug. After acceptance assert Popunder and Social Bar exactly once per
  document, Native once per route, only breakpoint-supported Banner URLs, exact
  active dimensions, one Native container ID, and no repeated active key.

  Add a deliberate Smartlink test that observes zero Smartlink requests before
  click and exactly one navigation attempt after the labeled link is clicked.
  Add an eligible-to-eligible SPA transition test that asserts globals stay at
  one while route-scoped units gain exactly one new logical-page request.

- [ ] **Step 2: Run Production-equivalent browser tests and observe failures**

  Run: `npm run build && npx playwright test --config=playwright.production-equivalent.config.ts`

  Expected: new tests fail until all URL fixtures, route counts, debug behavior,
  global singletons, and responsive placements are complete.

- [ ] **Step 3: Correct implementation defects revealed by the browser tests**

  For each defect, add or keep the narrow failing regression first, then change
  production code. Do not weaken provider-count, legal, debug, or SEO assertions.

- [ ] **Step 4: Run the full local browser matrix**

  Run: `npm run test:e2e`

  Expected: 320, 375, 390, 430, 768, 1024, and 1440 projects pass with zero
  horizontal overflow, broken images, console/page errors, duplicate IDs, or
  hydration errors.

- [ ] **Step 5: Run the Production-equivalent privacy/monetization matrix**

  Run: `npm run test:e2e:privacy`

  Expected: canonical-host mocked-provider tests pass at 320, 375, 390, and
  1440; privacy failure cases and tools remain usable.

- [ ] **Step 6: Commit browser coverage and fixes**

  ```bash
  git add tests/e2e playwright.production-equivalent.config.ts components app
  git commit -m "test: verify max-harvest browser contract"
  ```

### Task 5: Full local QA, Preview, PR, merge, and Production

**Files:**
- Verify: all changed files
- Record: `.planning/2026-08-24-dietogether-max-harvest-final/` outside the feature tree

**Interfaces:**
- Produces: verified Git commits, GitHub PR, merged `main`, exact promoted Vercel
  artifact, rollback target, and final coverage/density report.

- [ ] **Step 1: Run fresh code-quality and security verification**

  Run:

  ```bash
  npm test
  npm run lint
  npm run typecheck
  npm run build
  npm audit --audit-level=high
  git diff --check
  ```

  Expected: zero failures, warnings, high/critical vulnerabilities, or whitespace
  errors. Build retains 24 public URLs, the API route, custom 404, sitemap, and
  robots.

- [ ] **Step 2: Run content/SEO/provider redline scans**

  Compare every Title, H1, description, canonical, sitemap URL, robots rule,
  schema type, image path, and internal route with `9ba4417`. Assert no old
  `effectivecpmnetwork.com` or `highperformanceformat.com` strings remain, every
  supplied URL appears only in the centralized registry/test fixtures, and no
  secret or unauthorized ads.txt/AdSense asset was added.

- [ ] **Step 3: Capture real visual and first-ad position evidence**

  Start the production build and capture homepage, representative hub, short,
  medium, long, tool, trust, and legal pages at 320, 375, 390, 768, and 1440.
  Record first display top relative to H1, Direct Answer, and first section;
  measure overflow, actual creative boxes, layout shifts, duplicate IDs,
  console, page errors, and hydration.

- [ ] **Step 4: Document rollback and deploy protected Preview**

  Record the current Production deployment ID. Link this worktree to the
  existing Vercel project, deploy Preview, wait for Ready, verify noindex and
  zero provider requests using `vercel curl` plus a protected browser route when
  available. Never disable deployment protection.

- [ ] **Step 5: Push branch, open PR, and verify the PR tree**

  Push `codex/dietogether-max-harvest-final`, open a PR to `main`, inspect the
  full diff, wait for checks, and confirm the PR head equals the locally verified
  SHA. Resolve failures without force-pushing.

- [ ] **Step 6: Merge and promote the exact verified artifact**

  Merge the PR after checks pass. Confirm GitHub `main` contains the approved
  tree. Promote the verified Preview artifact when Vercel artifact identity is
  preserved; otherwise deploy the exact merged SHA once and record why.

- [ ] **Step 7: Verify Production and rollback readiness**

  On `https://dietogetherguide.shop`, verify 24 route statuses/custom 404,
  direct legal zero requests, eligible format requests, responsive dimensions,
  Smartlink click-only behavior, singleton globals, no overflow, console,
  hydration, canonical/schema/sitemap/robots, and Vercel error/500 logs. Keep the
  previous Ready deployment ID as the rollback target.

- [ ] **Step 8: Run final completion gates and report**

  Re-run the complete verification command, confirm Production tree SHA against
  GitHub main, update all planning files, and run
  `/Users/alisa/.codex/skills/planning-with-files/scripts/check-complete.sh`
  against the active task plan. Report every supplied format as LIVE, DISABLED,
  FAILED, or NOT SUPPLIED; placement, density, coverage, QA, SEO preservation,
  provider uniqueness, AdSense ownership state, CMP follow-up, and rollback.
