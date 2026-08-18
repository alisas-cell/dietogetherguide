export const CONSENT_POLICY_VERSION = 1 as const;
export const CONSENT_STORAGE_KEY = 'dietogetherguide:advertising-consent';
export const CONSENT_COOKIE_KEY = 'dietogetherguide_ad_consent';
export const CONSENT_BROADCAST_CHANNEL = 'dietogetherguide:privacy-consent-updates';
export const PRIVACY_REGION_TIMEOUT_MS = 3_000;

export type AdvertisingConsent = 'unknown' | 'granted' | 'rejected';

export interface StoredConsent {
  readonly policyVersion: typeof CONSENT_POLICY_VERSION;
  readonly advertising: Exclude<AdvertisingConsent, 'unknown'>;
}
