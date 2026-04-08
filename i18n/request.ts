import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'th'] as const;
const defaultLocale = 'th';

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale =
    locale && locales.includes(locale as any) ? locale : defaultLocale;

  let messages;

  try {
    messages = (await import(`../messages/${resolvedLocale}.json`)).default;
  } catch {
    messages = (await import(`../messages/${defaultLocale}.json`)).default;
  }

  return {
    locale: resolvedLocale,
    messages,
  };
});