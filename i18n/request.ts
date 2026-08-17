import { getRequestConfig } from 'next-intl/server';

import { i18nConfig } from './config';

export default getRequestConfig(async () => ({
  locale: i18nConfig.defaultLocale,
  messages: (await import('../messages/en.json')).default,
}));
