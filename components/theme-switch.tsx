'use client';

import { FC, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

import { SunFilledIcon, MoonFilledIcon } from '@/components/icons';

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = resolvedTheme === 'light';

  if (!mounted) {
    return <div className={clsx('inline-flex items-center justify-center w-[22px] h-[22px]', className)} />;
  }

  const handleToggle = () => {
    setTheme(isLight ? 'dark' : 'light');
  };

  return (
    <button
      className={clsx('px-px transition-opacity hover:opacity-80 cursor-pointer', 'inline-flex items-center justify-center', 'w-auto h-auto bg-transparent rounded-lg text-muted', className)}
      onClick={handleToggle}
    >
      {isLight ? <SunFilledIcon size={22} /> : <MoonFilledIcon size={22} />}
    </button>
  );
};
