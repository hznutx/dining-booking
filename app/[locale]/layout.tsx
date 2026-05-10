import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import clsx from 'clsx'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { siteConfig } from '@/config/site'
import { fontSans, prompt } from '@/config/fonts'
import { notFound } from 'next/navigation'
import { Providers } from './providers'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { ClientProvider } from '@/context/ClientContext'
import { AdminProvider } from '@/context/AdminContext'

export const metadata: Metadata = {
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

export default async function LocaleLayout({ children, params }: any) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages({ locale })

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={clsx(
          'bg-background flex min-h-screen flex-col font-light antialiased',
          prompt.className,
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AdminProvider>
            <CartProvider>
              <AuthProvider>
                <ClientProvider>
                  <Providers
                    themeProps={{ attribute: 'class', defaultTheme: 'dark' }}
                  >
                    <main className="flex-1 text-base">{children}</main>
                  </Providers>
                </ClientProvider>
              </AuthProvider>
            </CartProvider>
          </AdminProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
