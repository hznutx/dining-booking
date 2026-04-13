'use client'

import { generateTimeSlots } from '@/utils/time-format'
import { ToggleButton } from '@heroui/react'
import { useState } from 'react'

interface ITimer {
  name?: string
  start: string
  end: string
  disabled?: boolean
  onSelectTime?: (time: string) => void
}

export const TimeController: React.FC<ITimer> = ({
  start,
  end,
  onSelectTime,
  disabled,
  name,
}) => {
  const [bookingTime, setBookingTime] = useState('')
  const timeAvailableMap = generateTimeSlots(start, end)

  const handleSetTime = (time: string) => {
    setBookingTime(time)
    onSelectTime && onSelectTime(time)
  }

  return (
    <div className="flex w-full flex-wrap justify-between gap-2">
      {timeAvailableMap?.map((timing, i) => (
        <ToggleButton
          className={'w-20'}
          size="sm"
          key={i}
          isDisabled={disabled}
          isSelected={timing === bookingTime}
          onChange={() => handleSetTime(timing)}
        >
          {({ isSelected: selected }) => <>{timing}</>}
        </ToggleButton>
      ))}
    </div>
  )
}
