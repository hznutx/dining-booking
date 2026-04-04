import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { siteConfig } from '@/config/site';
import { fontSans, prompt } from '@/config/fonts';
import { notFound } from 'next/navigation';
import { Providers } from './providers';
import { Navbar } from '@/components/navbar';
import {Footer} from '@/components/layout/footer';

export const metadata: Metadata = {
  // manifest: '/manifest.json',
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

const locales = ['en', 'th'];

export default async function LocaleLayout({ children, params }: any) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <NextIntlClientProvider
          key={locale}
          locale={locale}
          messages={messages}
        >
          <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
            <div className='relative'>
              <Navbar />
              <main className={clsx(prompt.className, 'container mx-auto max-w-7xl p-6 flex-grow')}>{children}</main>
            </div>
            <Footer/>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
