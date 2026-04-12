'use client'

import { Select, ListBox, useFilter, Key } from '@heroui/react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const languages = [
  { id: 0, code: 'en', label: 'English', flag: '🇺🇸' },
  { id: 1, code: 'th', label: 'ไทย', flag: '🇹🇭' },
]

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = String(pathname).split('/')[1] ?? 'th'

  const handleChange = (locale: Key | null) => {
    router.replace(`/${locale}${String(pathname).slice(3)}`)
  }

  return (
    <Select value={currentLocale} aria-label="locale">
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className={'rounded-xl focus:outline-none'}>
        <ListBox>
          {languages.map((item) => (
            <ListBox.Item
              onClick={() => {
                handleChange(item.code)
              }}
              key={item.code}
              id={item.code}
              textValue={item.code}
            >
              {item.flag}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
