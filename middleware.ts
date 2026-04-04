import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'th'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const hasLocale = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));

  if (hasLocale) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
