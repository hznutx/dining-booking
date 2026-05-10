'use client'

import { Select, ListBox, Key } from '@heroui/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { GoDotFill } from 'react-icons/go'

export const languages = [
  { id: 0, code: 'en', label: 'English', flag: '🇺🇸' },
  { id: 1, code: 'th', label: 'ไทย', flag: '🇹🇭' },
]

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentLocale = useMemo(() => {
    return pathname?.split('/')[1] || 'en'
  }, [pathname])

  const handleChange = (locale: Key | null) => {
    if (!locale || !pathname) return

    const segments = pathname.split('/')

    segments[1] = String(locale)

    router.replace(segments.join('/'))
  }

  if (!mounted) return null

  return (
    <Select value={currentLocale} aria-label="locale">
      <Select.Trigger aria-label="toggle-language">
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
              <ListBox.ItemIndicator>
                {({ isSelected }) =>
                  isSelected ? (
                    <GoDotFill color="#22C55E" className="ml-2" />
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
