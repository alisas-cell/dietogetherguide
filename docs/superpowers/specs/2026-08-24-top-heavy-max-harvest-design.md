# Top-Heavy Max-Harvest Monetization Design

**Domain:** `https://dietogetherguide.shop`

**Approved source:** `/Users/alisa/.codex/attachments/ca46c03d-94a4-40ab-96d4-d023b00236b0/pasted-text.txt`

## Objective and redlines

Replace the existing two-slot Adsterra bridge with the complete supplied
inventory. Game SEO routes use `top-heavy-max-harvest`: H1 and a real Direct
Answer remain uninterrupted, then the first display Banner appears immediately
after the first useful status block. Later units are separated by complete
editorial sections. URLs, Titles, H1s, descriptions, canonicals, schema,
sitemap, robots, images, factual guide prose, and internal links do not change.

The canonical Production hostname is the only host that may contact the
provider. Localhost, test, Preview, branch/immutable Vercel hosts, unknown
routes, and `?ad_debug=1` remain network-off. The existing pre-request privacy
gate remains authoritative. The custom 404 and legal routes have no provider
placements.

## Provider source of truth

The registry stores these strings without modification:

| Format | Exact provider input |
|---|---|
| Popunder | `https://pl30996454.profitableratecpmnetwork.com/e7/f1/e6/e7f1e6deb310ac585c72de7e35fc3350.js` |
| Social Bar | `https://pl30996456.profitableratecpmnetwork.com/44/86/9b/44869b6b34aa2a7ad49840f1a1cf8af4.js` |
| Native | `https://pl30902793.profitableratecpmnetwork.com/1283f453c8142633c69e76c4a788d1e9/invoke.js`, container `container-1283f453c8142633c69e76c4a788d1e9` |
| 320x50 | key `1178d923040089031d1739c3b0f07aee`, `https://www.highrevenueformat.com/1178d923040089031d1739c3b0f07aee/invoke.js` |
| 728x90 | key `11f222c98a7f20ac1f26e0182e67c82d`, `https://www.highrevenueformat.com/11f222c98a7f20ac1f26e0182e67c82d/invoke.js` |
| 300x250 | key `ffe91604cbf7d7aad1682b8911650131`, `https://www.highrevenueformat.com/ffe91604cbf7d7aad1682b8911650131/invoke.js` |
| 468x60 | key `ba5a236f74cff2891ca1777b943f4146`, `https://www.highrevenueformat.com/ba5a236f74cff2891ca1777b943f4146/invoke.js` |
| 160x300 | key `756db9f3942bc59b500e058bad3a9156`, `https://www.highrevenueformat.com/756db9f3942bc59b500e058bad3a9156/invoke.js` |
| 160x600 | key `eed05d446c0f6275b0cecce8192e0f66`, `https://www.highrevenueformat.com/eed05d446c0f6275b0cecce8192e0f66/invoke.js` |
| Smartlink | `https://www.profitableratecpmnetwork.com/gxyrbuc5?key=78768be66352f70f3e8f9d17f48f7dac` |

All Banner units keep `format: 'iframe'` and `params: {}`. Native keeps
`async="async"` and `data-cfasync="false"`. No code is cloned or substituted.

## Central architecture

`components/ads/ad-config.ts` owns provider units, route classification,
monetization mode, eligibility, placement plans, breakpoints, and the exact-host
gate. Every public route has one record:

- `homepage`: `/`
- `guide-hub`: `/monsters`, `/maps`, `/items-and-weapons`, `/updates`, `/faq`
- `short-guide`: `/release-date`, `/system-requirements`
- `medium-guide`: `/early-access`, `/roadmap`, `/gameplay`,
  `/loot-and-extraction`, `/rum-buffs-and-perks`, `/coop`,
  `/coop/quick-join`, `/save-and-reconnect`
- `long-guide`: `/beginner-guide`, `/troubleshooting`
- `database-item`: `/maps/silent-cove`
- `tool`: `/tools/coop-troubleshooter`
- `trust`: `/about`, `/contact`
- `legal`: `/privacy`, `/terms`

All game SEO, database, and tool routes use `top-heavy-max-harvest`. Trust
routes use `light`. Legal routes use `off`. The resulting Production coverage
is 22 eligible and monetized routes out of 24 public routes; two legal routes
are intentionally excluded.

`AdSlot` is the only page-facing placement API. It dispatches to one Native
component, one generic Banner component, or one clearly sponsored Smartlink.
The Banner runtime serializes dynamic GET CODE execution so each unit receives
its own exact `window.atOptions` value; independent React effects cannot
overwrite one another. Each active route may mount each provider key once.
Unmount cleanup prevents stale IDs and stale creatives on client navigation.

`AdsterraGlobals` owns Popunder and Social Bar. It initializes each supplied
script once per browser document after the route, hostname, debug, and privacy
gates pass. Client navigation never adds a duplicate global script. Starting on
an excluded route makes no request; moving to an eligible route activates the
singletons once.

`AdDebugPanel` reads the active pathname, query, route plan, and initial
viewport. With `?ad_debug=1` it shows page class, mode, eligibility, placement
names, resolved formats, and breakpoint. Inline placements show debug
placeholders, but Provider scripts and the live Smartlink href remain absent.

## Placement and density

### Homepage

Hero and Quick Facts render first. The first responsive Banner follows Quick
Facts. Native follows the complete Start Here section. Smartlink follows the
Field Guide cluster. The 300x250 follows the Early Access section, and the
468x60 follows the monster section on wide tablet/desktop. Popunder and Social
Bar are global. The existing homepage has no physical sidebar, so vertical
units are not forced into it.

### GuidePage routes

Breadcrumb, H1, Direct Answer, and the Evidence status block render before the
responsive 320x50/728x90. The first complete article section separates that
Banner from Native. The second section separates Native from Smartlink. Later
complete sections separate 300x250 and 468x60. No unit enters a paragraph,
list, table, FAQ answer, card, or CTA row.

At the start of the first substantive section, desktop sidebars use 160x600
for medium, long, and hub pages. Short and database pages use 160x300. Long and
hub pages can use a later independent 160x300 below the 160x600. Neither unit
is sticky, and both disappear below the existing 1020px sidebar breakpoint.

### Tool

The responsive Banner follows the H1/explanation and Evidence block, before
the controls. Native and 300x250 occur only after the complete interactive
result area and explanatory content; Smartlink and desktop 468x60 occur after
separate later content boundaries. Nothing enters controls or results.

### Trust and legal

About and Contact use Popunder, Social Bar, one early responsive Banner, one
Native after a real section, and one labeled Smartlink after another section.
Privacy and Terms render no `AdSlot`; starting there makes zero Provider
requests. No global script is initialized for an excluded initial route.

### Opportunity counts

| Page class | Desktop opportunities | Mobile opportunities |
|---|---:|---:|
| homepage | 7 | 6 |
| guide-hub | 9 | 6 |
| short-guide | 7 | 6 |
| medium-guide | 8 | 6 |
| long-guide | 9 | 6 |
| database-item | 7 | 6 |
| tool | 7 | 6 |
| trust | 5 | 5 |
| legal | 0 | 0 |

Counts include Popunder and Social Bar. Each responsive position resolves to
one size, never both. Desktop-only inventory is neither rendered nor requested
on mobile.

## Privacy, SEO, and ownership

The existing regional request gate and revocation behavior stay intact. It is
a provider-agnostic technical consent gate, not a verified IAB TCF or
Google-certified CMP. The final report therefore states `CMP FOLLOW-UP
REQUIRED` without blocking this authorized integration.

The repository contains no AdSense account meta, Google ownership file, or
`ads.txt`; none is created or invented. Automated snapshots lock every current
Title, H1, description, canonical, schema shape, sitemap URL, and robots rule
before and after monetization. Privacy wording is already factual for
third-party advertising and needs no SEO/content rewrite.

## Failure, SPA, and rollback behavior

Display wrappers have exact creative dimensions and never scale an iframe.
Script error or no-fill removes the creative and collapses the wrapper without
breaking content or tools. A Banner execution queue prevents global
`atOptions` collisions. Route transitions remove route-scoped creative DOM and
mount one fresh logical-page instance while global formats remain singleton.

Rollback is the previous Ready Production deployment and a Git revert of the
monetization commits. No database, DNS, route, or content migration is part of
this change.

## Verification contract

Vitest must cover exact input strings, route classification, legal exclusion,
format uniqueness, breakpoint decisions, debug network-off behavior, placement
order, and SEO invariants. Playwright must cover 320, 375, 390, 768, and 1440;
first-ad position; exact creative dimensions; no overflow; duplicate IDs;
provider request counts; deliberate Smartlink clicks; SPA transitions; legal,
Preview, localhost, and debug network-off gates; console, hydration, and CLS.

Preview is protected/noindex. The verified exact artifact is promoted to the
existing Vercel Production project only after tests, build, crawler, PR diff,
and merge checks pass. Production verification observes real requests for
every supplied format on at least one eligible route and zero requests on a
direct legal route.
