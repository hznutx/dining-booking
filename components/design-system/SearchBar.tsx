'use client'
import { TextField, InputGroup, Kbd } from '@heroui/react'
import { SearchIcon } from '../icons'
import { deals } from '@/database'
import { useState } from 'react'

const data = deals

export const SearchBar = () => {
  const [showFullWidth, setShowFullWidth] = useState(true)

  return (
    <>
      {showFullWidth ? (
        <TextField aria-label="Search" type="search">
          <InputGroup className="focus-within:border-transparent focus-within:ring-0 focus-within:outline-none">
            <InputGroup.Prefix>
              <SearchIcon
                onClick={() => setShowFullWidth((prev) => !prev)}
                className="flex-shrink-0 cursor-pointer text-base"
              />
            </InputGroup.Prefix>
            <InputGroup.Input className="text-sm" placeholder="Search..." />
            <InputGroup.Suffix></InputGroup.Suffix>
          </InputGroup>
        </TextField>
      ) : (
        <SearchIcon
          onClick={() => setShowFullWidth((prev) => !prev)}
          className="flex-shrink-0 cursor-pointer text-base"
        />
      )}
    </>
  )
}
