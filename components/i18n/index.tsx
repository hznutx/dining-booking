'use client';

import { Autocomplete, ListBox, useFilter, Key } from '@heroui/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const languages = [
  { id: 0, code: 'en', label: 'English', flag: '🇺🇸' },
  { id: 1, code: 'th', label: 'ไทย', flag: '🇹🇭' },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = String(pathname).split('/')[1] ?? 'th';
  const { contains } = useFilter({ sensitivity: 'base' });

  const handleChange = (locale: Key | null) => {
    router.replace(`/${locale}${String(pathname).slice(3)}`);
  };

  return (
    <Autocomplete
      className='w-fit'
      selectionMode='single'
      value={currentLocale}
      onChange={(value) => {
        handleChange(value);
      }}
    >
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover className={'rounded-xl focus:outline-none'}>
        <Autocomplete.Filter filter={contains}>
          <ListBox>
            {languages.map((item) => (
              <ListBox.Item
                key={item.code}
                id={item.code}
                textValue={item.code}
              >
                {item.flag}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}
