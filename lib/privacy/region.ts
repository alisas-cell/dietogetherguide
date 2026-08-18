export const CONSENT_REQUIRED_COUNTRIES = [
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  'IS',
  'LI',
  'NO',
  'GB',
  'CH',
] as const;

const consentRequiredCountrySet = new Set<string>(CONSENT_REQUIRED_COUNTRIES);

export function normalizeCountryCode(
  countryCode: string | null | undefined,
): string | null {
  const normalized = countryCode?.trim().toUpperCase();
  return normalized && /^[A-Z]{2}$/.test(normalized) ? normalized : null;
}

export function requiresAdvertisingConsent(
  countryCode: string | null | undefined,
): boolean {
  const normalized = normalizeCountryCode(countryCode);
  return normalized === null || consentRequiredCountrySet.has(normalized);
}
