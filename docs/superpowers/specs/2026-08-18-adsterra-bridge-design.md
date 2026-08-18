# Adsterra Bridge Monetization Design

## Objective

Add a production-only Adsterra monetization layer to all 24 public routes on
`https://dietogetherguide.shop` without changing route slugs, SEO Titles, H1s,
canonicals, structured data, sitemap membership, robots rules, or the existing
visual system. Every public page receives one Native Banner and one responsive
banner. The custom 404 remains ad-free because it is not a public content route
and advertising on error pages is explicitly prohibited.

## Current system

- Repository: `alisas-cell/dietogetherguide`
- Framework: Next.js 16.3.1 App Router with React 19.2.8
- Hosting: existing Vercel project `prj_9OJA7WkR3GYgkibatFExXuwbVF1v`
- Production origin: `https://dietogetherguide.shop`
- Public routes: home, 22 `GuidePage` routes, and the co-op troubleshooter
- AdSense verification/review code: none detected
- `ads.txt`: absent; no record will be invented
- CMP: absent; final report must say `CMP FOLLOW-UP REQUIRED`
- Privacy policy: currently says no advertising and must receive a minimal
  factual update before ads go live

The project-specific monetization SOP named in the request is not present, so
the supplied task requirements are the controlling specification.

## Allowed advertising inventory

Only these exact supplied units may load:

- Native script:
  `https://pl30902793.effectivecpmnetwork.com/1283f453c8142633c69e76c4a788d1e9/invoke.js`
- Native container:
  `container-1283f453c8142633c69e76c4a788d1e9`
- Mobile 320x50 key:
  `1178d923040089031d1739c3b0f07aee`
- Desktop 728x90 key:
  `11f222c98a7f20ac1f26e0182e67c82d`

No popunder, clickunder, onclick, new-tab, redirect, social bar,
interstitial, fullscreen, push, sticky overlay, deceptive CTA, SmartLink, or
300x250 unit is permitted.

## Component architecture

Create a focused `components/ads` layer:

- `ad-config.ts` owns the production hostname, placement names, exact script
  URLs/keys, dimensions, and public-route eligibility rules.
- `ad-runtime.ts` owns pure hostname and initial-viewport selection logic plus
  idempotent DOM script initialization.
- `AdsterraNative.tsx` is a small Client Component that initializes the exact
  native script once for the current page and fails closed on load failure or a
  no-fill timeout.
- `AdsterraResponsiveBanner.tsx` is a Client Component that chooses exactly one
  unit after hydration. It chooses 728x90 for an initial viewport of at least
  800 CSS pixels and 320x50 otherwise. It does not listen to resize, so a page
  view cannot initialize both units.
- `AdSlot.tsx` exposes only `article_mid` and `responsive_banner` placements to
  pages.

The first server render contains only a semantic ad wrapper. Browser hostname
and viewport checks happen after hydration, so the HTML is deterministic and
cannot mismatch. Exact apex hostname matching is mandatory; localhost, tests,
Vercel Preview, immutable deployment URLs, and Vercel aliases fail closed.

Each external script is appended inside its own slot after core content has
rendered. A per-instance guard prevents duplicate initialization. Error
handlers and a bounded mutation/no-fill observer collapse an unfilled slot so
blocked or failed ads cannot crash navigation or leave permanent large gaps.

## Placement map

### Home

- Native Banner after the Field Guide card section.
- Responsive Banner after the Maps teaser.

This keeps both units below the hero and primary calls to action, with multiple
content sections separating them.

### Guide and policy pages

All 22 `GuidePage` routes receive:

- Native Banner after the second complete article section. The component is
  inserted only between sections, never inside a paragraph, list, table, map,
  step sequence, or FAQ answer.
- Responsive Banner at the end of the article content after related content,
  FAQ, and sources.

This includes About, Contact, Privacy, Terms, and FAQ because the owner
explicitly overrode the earlier route exclusions and requested two ads on
every public page. Contact has two sections, so its Native placement occurs
after the complete second section rather than forcing an artificial midpoint.

### Co-op troubleshooter

- Native Banner after the tool, explanatory sections, and safety callout.
- Responsive Banner after the source list at the end of the page.

Neither unit appears between controls, beside the submit button, inside the
result area, or next to an interactive action.

### Error state

The custom 404 and framework error states render no ad components.

## Layout and accessibility

Slots carry a visible, neutral `Advertisement` label and never resemble a game
or tool action. Desktop reserves the exact 728x90 creative area. Mobile uses an
exact 320x50 inner frame centered in a full-viewport-safe wrapper; it is never
scaled or cropped. The wrapper becomes full-bleed only where necessary at
320px so the existing 20px mobile container gutters do not squeeze the ad.

Loading space is bounded and removed on failure/no fill. Ads are not sticky,
do not cover content, and do not participate in navigation or focus order
unless the returned creative itself is interactive.

## Privacy, AdSense, and ads.txt

The Privacy Policy receives the smallest accurate change needed to disclose
Adsterra advertising, third-party requests, potential cookies/device data,
and blocking behavior. Its Title, H1, description, canonical, route, and schema
remain unchanged. No consent is asserted and no fake CMP is added.

There is no current AdSense or Google verification code to change. If such code
appears before deployment it must be preserved. No `ads.txt` file or record is
added because the supplied material contains no verified Adsterra ads.txt
publisher record.

## Test and production verification

Implementation follows red-green TDD. Automated coverage must prove:

- exact apex-only hostname gating;
- all 24 public routes are eligible and the 404 is not;
- initial viewport selects one and only one responsive unit;
- exact supplied keys, dimensions, script URLs, and native container are used;
- repeated renders/resize do not duplicate requests;
- script failure/no fill collapses safely;
- localhost and Preview do not request Adsterra;
- every public route retains HTTP 200, one H1, exact canonical and metadata;
- the 404 remains HTTP 404 and ad-free;
- desktop and 390px layouts have no overflow, overlap, or hydration errors.

Before deployment run Vitest, TypeScript, ESLint, the production build, and the
existing Playwright matrix. Deploy through the existing Vercel project from
the final `main` commit. Production browser QA must observe the real native
request, the desktop key only at desktop width, the mobile key only at mobile
width, no duplicate unit request, and no Adsterra request on the retained
Preview deployment. A returned script request proves integration is live even
if the network supplies no creative; those states must be reported separately.

## Rollback

Revert the monetization commit and redeploy `main`. This removes all ad
components and the privacy disclosure change without touching routes, content
registries, DNS, the Vercel project, or the prior production deployment.
