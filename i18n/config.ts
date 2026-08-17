export const i18nConfig = {
  defaultLocale: 'en',
  enabledLocales: ['en'],
  futureLocales: ['ja', 'ko', 'de'],
  localePrefix: 'never',
} as const;

export type EnabledLocale = (typeof i18nConfig.enabledLocales)[number];
