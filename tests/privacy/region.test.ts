import { describe, expect, it } from 'vitest';

import {
  CONSENT_REQUIRED_COUNTRIES,
  normalizeCountryCode,
  requiresAdvertisingConsent,
} from '../../lib/privacy/region';
import { GET } from '../../app/api/privacy-region/route';

describe('privacy region policy', () => {
  it.each([
    ['DE', 'EU member state'],
    ['is', 'EEA EFTA state'],
    ['GB', 'United Kingdom'],
    ['CH', 'Switzerland'],
  ])('requires a decision for %s (%s)', (countryCode) => {
    expect(requiresAdvertisingConsent(countryCode)).toBe(true);
  });

  it('does not gate a known country outside the configured scope', () => {
    expect(requiresAdvertisingConsent('US')).toBe(false);
    expect(requiresAdvertisingConsent('CA')).toBe(false);
  });

  it.each([undefined, null, '', 'unknown', 'USA', '1A']) (
    'fails privacy-safe for unavailable or malformed country %s',
    (countryCode) => {
      expect(requiresAdvertisingConsent(countryCode)).toBe(true);
    },
  );

  it('normalizes only exact ISO-style two-letter values', () => {
    expect(normalizeCountryCode(' gb ')).toBe('GB');
    expect(normalizeCountryCode('USA')).toBeNull();
    expect(normalizeCountryCode(undefined)).toBeNull();
  });

  it('contains exactly EU27, EEA additions, UK, and Switzerland', () => {
    expect(CONSENT_REQUIRED_COUNTRIES).toHaveLength(32);
    expect(new Set(CONSENT_REQUIRED_COUNTRIES).size).toBe(32);
    expect(CONSENT_REQUIRED_COUNTRIES).toEqual(
      expect.arrayContaining(['AT', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH']),
    );
  });

  it('returns only the boolean decision with private no-store response headers', async () => {
    const response = GET(
      new Request('https://dietogetherguide.shop/api/privacy-region', {
        headers: { 'x-vercel-ip-country': 'US' },
      }),
    );

    expect(await response.json()).toEqual({ requiresConsent: false });
    expect(response.headers.get('cache-control')).toBe('private, no-store, max-age=0');
    expect(response.headers.get('vary')).toBe('X-Vercel-IP-Country');
  });
});
