'use client'

import { generateTimeSlots } from '@/utils/time-format'
import { ToggleButton } from '@heroui/react'
import { useState } from 'react'

interface ITimer {
  start: string
  end: string
  onSelectTime?: (time: string) => void
}

export const TimeController: React.FC<ITimer> = ({
  start,
  end,
  onSelectTime,
}) => {
  const [bookingTime, setBookingTime] = useState('')
  const timeAvailableMap = generateTimeSlots(start, end)

  const handleSetTime = (time: string) => {
    setBookingTime(time)
    onSelectTime && onSelectTime(time)
  }

  return (
    <div className="flex w-full flex-wrap gap-4">
      {timeAvailableMap?.map((timing, i) => (
        <ToggleButton
          key={i}
          isSelected={timing === bookingTime}
          onChange={() => handleSetTime(timing)}
        >
          {({ isSelected: selected }) => <>{timing}</>}
        </ToggleButton>
      ))}
    </div>
  )
}
