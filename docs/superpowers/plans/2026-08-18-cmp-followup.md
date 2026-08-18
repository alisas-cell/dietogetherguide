# CMP Follow-up Implementation Plan

> **Execution rule:** Work only in `codex/dietogether-cmp-followup`; push only that branch; create a Vercel Preview; never merge or deploy Production.

**Goal:** Enforce a versioned, provider-agnostic consent decision before the existing Adsterra Bridge may make network requests, without changing static SEO, ad density, unit IDs, or current no-fill/single-request behavior.

**Architecture:** A small no-store Route Handler classifies the Vercel country header without returning the country. A root client provider owns the versioned local preference and resolved region decision. Existing ad components consume one boolean and remain the sole injection path. A compact panel and persistent footer button expose accessible choices.

**Stack:** Next.js 16.3.1 App Router, React 19.2.8, TypeScript, Vitest, Playwright, Vercel.

---

## Task 1: Region policy and endpoint

**Files:**
- Create: `lib/privacy/region.ts`
- Create: `app/api/privacy-region/route.ts`
- Create: `tests/privacy/region.test.ts`

1. Write failing tests for representative EU, UK, Switzerland, US, lower-case normalization, missing, and malformed values.
2. Run `npx vitest run tests/privacy/region.test.ts` and confirm the missing-module failure.
3. Implement the exact researched code set and fail-safe decision.
4. Add the minimal GET endpoint with `private, no-store` and `Vary: X-Vercel-IP-Country`.
5. Re-run the focused test and commit.

## Task 2: Versioned consent model

**Files:**
- Create: `lib/privacy/consent-types.ts`
- Create: `lib/privacy/consent.ts`
- Create: `tests/privacy/consent.test.ts`

1. Write failing tests for unknown, accept, reject, revisit, old/malformed records, revoke, re-grant, and region-dependent eligibility.
2. Confirm the focused test fails.
3. Implement policy-version constants, safe storage parsing/serialization, and a pure eligibility function.
4. Re-run and commit.

## Task 3: Central provider and accessible choices UI

**Files:**
- Create: `components/privacy/ConsentProvider.tsx`
- Create: `components/privacy/ConsentBanner.tsx`
- Create: `components/privacy/PrivacyChoices.tsx`
- Modify: `app/layout.tsx`
- Modify: `components/layout/Footer.tsx`
- Modify: `app/globals.css`
- Modify: `tests/components/primitives.test.tsx`

1. Add structural/static-markup assertions for the required copy, Privacy link, clear accept/reject controls, and footer control.
2. Implement the client context, no-store region request, fail-safe pending/error state, persistence, reopen/close behavior, and grant/reject transitions.
3. Wrap the root shell and add the persistent footer control.
4. Style a compact responsive bottom panel with accessible focus/touch targets.
5. Re-run unit, lint, and type checks; commit.

## Task 4: Gate the existing canonical Adsterra path

**Files:**
- Modify: `components/ads/AdsterraNative.tsx`
- Modify: `components/ads/AdsterraResponsiveBanner.tsx`
- Modify: `tests/ads/ad-components.test.tsx`
- Preserve: `components/ads/ad-config.ts`
- Preserve: `components/ads/ad-runtime.ts`

1. Add failing contract assertions that initial markup contains no provider script and slots stay off until the centralized gate permits initialization.
2. Consume `canLoadAds` in both existing injection components. Do not add another injection location.
3. Ensure an in-place grant initializes exactly once and cleanup cannot leave empty placeholders.
4. Preserve host, route, viewport selection, provider IDs, no-fill timeout, and no-resize-reload behavior.
5. Re-run focused tests and commit.

## Task 5: Minimal Privacy disclosure and SEO regression

**Files:**
- Modify: `content/trust.ts`
- Modify: `tests/seo/metadata.test.ts`
- Modify: `tests/seo/routes.test.ts`

1. Snapshot/assert the 24-route set and representative Privacy/title/H1/canonical identities before content changes.
2. Add only factual consent-storage, choice-reopening, and third-party-ad explanations.
3. Confirm metadata, route count, sitemap, and canonical outputs remain unchanged.
4. Commit.

## Task 6: Browser and network proof

**Files:**
- Modify: `playwright.config.ts`
- Modify: `tests/e2e/site.spec.ts`
- Optionally create: `playwright.production-equivalent.config.ts`

1. Add browser tests for required-region initial zero requests, reject zero, accept exactly one Native plus matching banner, revisit, footer reopen, revoke/reload, and re-grant.
2. Add non-gated auto-start and Preview/localhost always-zero assertions.
3. Add exact provider URL counts and opposite-size/duplicate checks.
4. Exercise home, guide, and tool at 1440, 390, 375, and 320; assert no overflow, compact panel, visible focus, and unaffected interactions.
5. Build then run the canonical-host production-equivalent suite locally, intercepting provider responses so no live creative dependency affects results.
6. Run normal Preview-safe E2E and commit.

## Task 7: Full verification and review

1. Run `npm run typecheck`.
2. Run `npm run lint`.
3. Run `npm test`.
4. Run `npm run build` and inspect static/dynamic route output.
5. Run complete Playwright coverage and route smoke.
6. Run `npm audit --omit=dev` and record the result.
7. Verify `/ads.txt` is still 404 and no forbidden unit/format was introduced.
8. Inspect the full diff, request independent review, fix any material findings, and repeat affected verification.

## Task 8: Human Gate Preview

1. Commit the verified patch and push only `codex/dietogether-cmp-followup`.
2. Create a Vercel Preview deployment only.
3. Verify Preview robots are noindex and all Adsterra requests are zero even after consent acceptance.
4. Record branch, SHA, Preview URL/deployment ID, network matrix, tests, responsive results, and external blockers.
5. Stop at `# CMP FOLLOW-UP — READY FOR HUMAN REVIEW`; do not merge or promote.
