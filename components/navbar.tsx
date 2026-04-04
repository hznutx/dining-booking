'use client';

import { useState } from 'react';
import { Button, Link } from '@heroui/react';
import NextLink from 'next/link';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import { TwitterIcon, HeartFilledIcon, Logo } from '@/components/icons';
import LanguageSwitcher from './i18n';
import ProfileAccount from './design-system/ProfileAccount';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg'>
      <header className='mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-6'>
        <div className='flex items-center gap-4'>
          <NextLink
            className='flex items-center gap-1'
            href='/'
          >
            <Logo size={28}/>
            <h4 className='text-2xl font-bold'>Gelato</h4>
          </NextLink>
        </div>

        <div className='hidden sm:flex items-center gap-2'>
          <Link
            aria-label='Twitter'
            href={siteConfig.links.twitter}
            rel='noopener noreferrer'
            target='_blank'
          >
            <TwitterIcon className='text-muted' />
          </Link>
          <ThemeSwitch />
          <ProfileAccount  />
          <LanguageSwitcher />
        </div>

        <div className='flex sm:hidden items-center gap-2'>
          <ThemeSwitch />
          <button
            aria-expanded={isMenuOpen}
            aria-label='Toggle menu'
            className='p-2'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className='h-6 w-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {isMenuOpen ? (
                <path
                  d='M6 18L18 6M6 6l12 12'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                />
              ) : (
                <path
                  d='M4 6h16M4 12h16M4 18h16'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className='border-t border-separator sm:hidden'>
          <ul className='flex flex-col gap-2 px-4 pb-4'>
            {siteConfig.navItems.map((item, index) => (
              <li key={`${index}`}>
                <Link
                  className={clsx('block py-2 text-lg no-underline', index === 2 ? 'text-accent' : index === siteConfig.navItems.length - 1 ? 'text-danger' : 'text-foreground')}
                  href='#'
                >
                  {item.key}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};
