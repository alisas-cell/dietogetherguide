# Die Together Guide CMP Follow-up Design

**Research date:** 2026-08-18 (Asia/Shanghai)

**Branch:** `codex/dietogether-cmp-followup`

**Scope:** Add a provider-agnostic pre-request advertising-consent gate around the existing, proven Adsterra Bridge. Preserve all routes, metadata, placements, provider IDs, no-fill behavior, and Production/Preview host protections.

## Research gate

### Official sources checked

- [Adsterra Privacy Policy](https://adsterra.com/privacy-policy-managed/) (effective 2026-06-29 when checked): describes personal and technical data involved in advertising, including IP address, browser/device data, location/time-zone data, and ad interactions; identifies consent as one possible legal basis and explains withdrawal rights.
- [Adsterra Cookies Policy](https://adsterra.com/cookies/): describes cookies, pixels, marketing/advertising uses, and browser/device measurement.
- [Google: CMP requirements for EEA and UK](https://support.google.com/adsense/answer/13554020?hl=en-GB): requires a Google-certified CMP integrated with the IAB TCF for AdSense, Ad Manager, or AdMob personalized advertising in the EEA and UK; Switzerland was added from 2024-07-31.
- [Google: EU user consent policy guidance](https://support.google.com/adsense/answer/7670013?hl=en-GB): identifies the EEA, UK, and Switzerland as the relevant consent-policy scope and defines the EEA as EU member states plus Iceland, Liechtenstein, and Norway.
- [Google: US state regulations](https://support.google.com/adsense/answer/14126816?hl=en-GB): explains that Google does not require a GPP/CMP integration for US states, while the certified-TCF requirement remains for EEA/UK/Switzerland.
- [Google: privacy messaging and consent revocation](https://support.google.com/adsense/answer/10961068?hl=en-GB): documents revocation and Google CMP behavior.
- [Vercel request headers](https://vercel.com/docs/headers/request-headers): documents `x-vercel-ip-country` as a two-letter ISO 3166-1 country code on Vercel requests.
- [Vercel geolocation headers](https://vercel.com/kb/guide/geo-ip-headers-geolocation-vercel-functions): confirms geo headers are available on deployments and normally absent in local development.
- [EU Commission EEA country guidance](https://employment-social-affairs.ec.europa.eu/policies-and-activities/moving-working-europe/eu-social-security-coordination/faq-social-security/faq-social-security-where-do-these-rules-apply_en): lists the EU member states and explains that the EEA also includes Iceland, Liechtenstein, and Norway.
- [EFTA: EEA EFTA states](https://www.efta.int/eea/eea-efta-states): confirms Iceland, Liechtenstein, and Norway are EEA EFTA states and that Switzerland is outside the EEA.
- Current project implementation: `AdSlot.tsx`, `AdsterraNative.tsx`, `AdsterraResponsiveBanner.tsx`, `ad-config.ts`, `ad-runtime.ts`, root layout/footer, Privacy content, tests, and Next.js 16.3.1 route-handler documentation.

### Conclusions and limits

1. The existing Adsterra scripts can receive advertising-related request/device data and may use cookies or similar identifiers. A real gate must therefore prevent provider script creation and provider network requests until the consent decision permits advertising.
2. No verifiable Adsterra documentation checked for this task establishes this site's custom UI as an IAB TCF-certified or Google-certified CMP. This implementation must be described only as a provider-agnostic technical consent gate.
3. If the site later uses AdSense in the EEA, UK, or Switzerland, a Google-certified CMP integrated with IAB TCF is required. Vendor registration, account configuration, and any CMP identifiers are external human configuration and are outside this patch.
4. Legal requirements vary. The region set here is a conservative technical policy derived from the documented Google EEA/UK/Switzerland scope, not a claim of universal legal compliance.
5. No official account-specific Adsterra `ads.txt` record is available. `/ads.txt` remains absent.

## Region policy

The browser calls a same-origin `GET /api/privacy-region` endpoint. The endpoint reads only `x-vercel-ip-country`, normalizes an exact two-letter code, and returns only:

```json
{ "requiresConsent": true }
```

It never returns or persists the country. The response is non-cacheable and varies on the country header.

Consent-required codes:

- EU 27: `AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE`
- EEA additions: `IS LI NO`
- Separate documented scope: `GB CH`

`US` and other well-formed codes outside this set are non-gated by this policy. Missing, malformed, or unavailable country data returns `requiresConsent: true` (privacy-safe failure).

## Consent state and decision model

The client owns one versioned preference. Local storage is primary, with a
first-party cookie used only as a verified fallback when local storage is
unavailable and kept synchronized when it already exists:

```ts
type AdvertisingConsent = 'unknown' | 'granted' | 'rejected';

interface StoredConsent {
  policyVersion: 1;
  advertising: 'granted' | 'rejected';
}
```

- Only explicit `granted` or `rejected` decisions are persisted.
- Missing, malformed, or old-version records become `unknown`.
- If the two persistence mechanisms ever conflict, `rejected` is authoritative.
- A write is treated as successful only when a combined read returns the requested decision.
- Storage events and a same-origin broadcast channel synchronize decisions across tabs.
- Until the region endpoint resolves, advertising is blocked.
- If the region request fails, returns an invalid payload, or exceeds three seconds, the client resolves to the consent-required state.
- A stored `rejected` decision always blocks advertising, including outside the gated region.
- A stored `granted` decision permits the existing bridge once the region lookup has resolved.
- With no stored decision, a consent-required region opens the initial panel and blocks ads; a non-gated region permits the bridge without opening the panel.
- Reopening from the footer never resets the stored decision merely by opening or closing the panel.
- `rejected -> granted` enables the existing slots in place.
- `granted -> rejected` persists rejection and reloads the page so provider-created global/script state cannot survive revocation.

## Component architecture

- `lib/privacy/region.ts`: pure country normalization and region decision.
- `app/api/privacy-region/route.ts`: minimal request-specific endpoint, no third-party lookup.
- `lib/privacy/consent-types.ts`: state contracts and policy version.
- `lib/privacy/consent.ts`: parse/read/write helpers and pure ad-eligibility decision.
- `components/privacy/ConsentProvider.tsx`: one client-side state owner and region fetch.
- `components/privacy/ConsentBanner.tsx`: compact, keyboard-accessible initial/management panel.
- `components/privacy/PrivacyChoices.tsx`: persistent footer control.

The provider wraps the existing site shell. Existing Adsterra components consume a single `canLoadAds` boolean; they remain the only script-injection path. The effective condition is:

```text
canonical Production hostname
AND monetized public route
AND resolved privacy state allows advertising
```

Preview and localhost remain ad-free because the exact production hostname allowlist stays authoritative. The provider does not inject advertising scripts.

## UI design

The panel is a compact bottom sheet/card using the site's existing dark nautical visual language. It has a concise explanation, a Privacy Policy link, and equally clear `Reject non-essential` and `Accept advertising` buttons. The initial required decision cannot be dismissed without choosing; a footer-opened management view can be closed with its button or Escape. Buttons retain at least 44px touch targets and visible keyboard focus. On 320px screens actions stack; the panel uses bounded height and internal scrolling so it does not cover the whole article.

The footer always exposes a `Privacy Choices` button. This is a real button rather than a fake link because it changes client UI state.

## Static SEO and privacy content

All page region decisions happen client-side after static HTML is delivered. The API route is the only dynamic unit, so all 24 public pages retain static generation. Existing URLs, titles, H1s, canonicals, sitemap membership, and content structure stay unchanged.

The Privacy page receives only factual additions about the stored preference, the gate, third-party advertising, and how to reopen choices. Its URL, title, H1, canonical, and primary intent remain unchanged.

## Verification design

- Unit tests: authoritative region examples and fail-safe unknown handling; storage parsing/versioning; consent transitions and ad eligibility; existing ad contract; SEO route/metadata invariants.
- Browser tests: initial gate, accept, reject, revisit, reopen, revoke, re-grant; keyboard behavior; no overflow/obstruction at 1440/390/375/320; article/tool/navigation continuity.
- Network tests: intercept exact provider script URLs and assert zero before/reject/Preview, and exactly one Native plus one matching responsive request after eligible grant or for an eligible non-gated visitor. Opposite-size and duplicate counts remain zero.
- Production-equivalent local tests use the canonical hostname mapped to the local built server; no Production deployment or request is required.
- Build inspection verifies 24 static public pages plus one dynamic API route.

## Human/external blockers

- A future AdSense launch in EEA/UK/Switzerland requires selection, account setup, and verification of a Google-certified IAB TCF CMP.
- An `ads.txt` file requires the exact authorized record from this site's own Adsterra publisher dashboard or another official account-specific source.

Neither blocker prevents this custom pre-request gate from being reviewed, but neither is represented as completed.
