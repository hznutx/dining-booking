import '@/styles/globals.css'
import { headers } from 'next/headers'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { siteConfig } from '@/config/site'
import { fontSans, prompt } from '@/config/fonts'
import { notFound } from 'next/navigation'
import { Providers } from './providers'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { ToastProvider } from '@heroui/toast'

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
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

const locales = ['en', 'th']
export const exceptPath = ['/login']

export default async function LocaleLayout({ children, params }: any) {
  const { locale } = await params

  const headersList = await headers()
  const pathname = (await headersList.get('x-pathname')) || ''

  const hiddenLayout = exceptPath.some((path) =>
    pathname.startsWith(`/${locale}${path}`),
  )

  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={clsx(
          'bg-background min-h-screen font-sans antialiased',
          prompt.className,
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider
          key={locale}
          locale={locale}
          messages={messages}
        >
          <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
            <ToastProvider />
            <div className={'relative'}>
              {!hiddenLayout && <Navbar />}
              <main className={'flex-1'}>{children}</main>
            </div>
            {!hiddenLayout && <Footer />}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
