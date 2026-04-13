'use client'

import { Accordion, Button, useDisclosureGroupNavigation } from '@heroui/react'
import clsx from 'clsx'
import { useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

interface IListItem {
  id: string
  title: string
  content: React.ReactNode
  disabled?: boolean
  isExpand?: boolean
  icon?: React.ReactNode
}

interface IAccording {
  items: IListItem[]
  styleLayout?: string
  showController?: boolean
}

export const AccordingList: React.FC<IAccording> = ({
  items,
  styleLayout,
  showController,
}) => {
  const [expandedKeys, setExpandedKeys] = useState(
    new Set<string | number>(['0']),
  )

  const itemIds = items.map((item) => String(item.id))

  const { isNextDisabled, isPrevDisabled, onNext, onPrevious } =
    useDisclosureGroupNavigation({
      expandedKeys,
      itemIds,
      onExpandedChange: (keys) =>
        setExpandedKeys(new Set(Array.from(keys).map(String))),
    })

  return (
    <>
      {showController && (
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              aria-label="Previous item"
              isDisabled={isPrevDisabled}
              size="sm"
              variant="secondary"
              onPress={onPrevious}
            >
              <BiChevronUp className="size-4" />
            </Button>
            <Button
              aria-label="Next item"
              isDisabled={isNextDisabled}
              size="sm"
              variant="secondary"
              onPress={onNext}
            >
              <BiChevronDown className="size-4" />
            </Button>
          </div>
        </div>
      )}
      <Accordion
        expandedKeys={expandedKeys}
        onExpandedChange={setExpandedKeys}
        className={clsx('w-full', styleLayout)}
      >
        {items.map((item) => (
          <Accordion.Item key={String(item.id)} id={item.id}>
            <Accordion.Heading>
              <Accordion.Trigger
                isDisabled={item?.disabled}
                style={{
                  transform: 'none',
                }}
              >
                {item.icon ? item.icon : null}
                <span
                  className={clsx(item.disabled ? 'text-mute' : 'text-current')}
                >
                  {item.title}
                </span>
                <Accordion.Indicator>
                  <BiChevronDown />
                </Accordion.Indicator>
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>{item.content}</Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  )
}
