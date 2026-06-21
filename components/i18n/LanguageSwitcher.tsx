'use client'

import { Select, ListBox } from '@heroui/react'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { startTransition } from 'react'
import { GoDotFill } from 'react-icons/go'

export const languages = [
  { id: 0, code: 'en', label: 'English', flag: '🇺🇸' },
  { id: 1, code: 'th', label: 'ไทย', flag: '🇹🇭' },
]

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const handleChange = (nextLocale: string) => {
    if (nextLocale === locale) return

    startTransition(() => {
      router.replace(pathname, {
        locale: nextLocale,
      })
    })
  }

  return (
    <Select value={locale} aria-label="locale">
      <Select.Trigger
        aria-label="toggle-language"
        className="non-scale cursor-pointer"
      >
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover className="rounded-xl focus:outline-none">
        <ListBox>
          {languages.map((item) => (
            <ListBox.Item
              key={item.code}
              id={item.code}
              textValue={item.code}
              onClick={() => handleChange(item.code)}
            >
              {item.flag}

              <ListBox.ItemIndicator>
                {({ isSelected }) =>
                  isSelected ? (
                    <GoDotFill className="ml-2 text-green-500" />
                  ) : null
                }
              </ListBox.ItemIndicator>
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
