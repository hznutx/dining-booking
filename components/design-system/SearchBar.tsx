'use client'

import { TextField, InputGroup } from '@heroui/react'
import { SearchIcon } from '../icons'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export const SearchBar = ({ hidden }: { hidden?: boolean }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [showFullWidth, setShowFullWidth] = useState(true)
  const [input, setInput] = useState(searchParams.get('s') || '')

  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (input) {
        params.set('s', input)
      } else {
        params.delete('s')
      }

      router.push(`${pathname}?${params.toString()}`)
    }, 500)

    return () => clearTimeout(delay)
  }, [input])

  if (hidden) return null

  return (
    <>
      {showFullWidth ? (
        <TextField aria-label="Search" type="search">
          <InputGroup className="focus-within:border-transparent focus-within:ring-0 focus-within:outline-none">
            <InputGroup.Prefix>
              <SearchIcon
                onClick={() => setShowFullWidth((prev) => !prev)}
                className="cursor-pointer"
              />
            </InputGroup.Prefix>
            <InputGroup.Input
              placeholder="Search..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </InputGroup>
        </TextField>
      ) : (
        <SearchIcon
          onClick={() => setShowFullWidth((prev) => !prev)}
          className="cursor-pointer"
        />
      )}
    </>
  )
}
