import { describe, expect, it } from 'vitest';

import { i18nConfig } from '../../i18n/config';

describe('English-first locale architecture', () => {
  it('publishes only unprefixed English while preserving declared future locale capability', () => {
    expect(i18nConfig.defaultLocale).toBe('en');
    expect(i18nConfig.enabledLocales).toEqual(['en']);
    expect(i18nConfig.futureLocales).toEqual(['ja', 'ko', 'de']);
    expect(i18nConfig.localePrefix).toBe('never');
  });
});
