'use client'
import { TimeController } from './TimeController'
import { IDealBooking } from '../restaurants/DealBooking'
import { Button, DateValue, Form } from '@heroui/react'
import { useState } from 'react'
import ModalPopup from '../design-system/Modal'
import { formatTimeRange } from '@/utils/time-format'
import { time } from 'console'
import { DatePicker } from './DatePicker'
import { getLocalTimeZone } from '@internationalized/date'
import { useAuth } from '@/context/AuthContext'

export interface ICreateReservation {
  user_id?: string
  restaurant_id: number
  deal_id: number
  guest_count?: number
  time_range: string
}

const DealBookingForm: React.FC<IDealBooking> = ({ data: deal }) => {
  const { user } = useAuth()
  const [date, setDate] = useState<DateValue | null>(null)
  const [selectedTime, setSelectedTime] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })
    if (deal) {
      const result: ICreateReservation = {
        ...(user && { user_id: user?.id }),
        restaurant_id: deal.res_id,
        deal_id: deal?.id,
        time_range: formatTimeRange(new Date(selectedTime), 120),
      }
    }
  }

  const onChange = (newDate: DateValue) => {
    setDate(newDate)
  }

  const propCalendar = { date, onChange }

  const handleSelectTime = (time: string) => {
    if (!date || !time) return
    const baseDate = date.toDate(getLocalTimeZone())
    const [hours, minutes] = time.split(':').map(Number)
    const finalDate = new Date(baseDate)
    finalDate.setHours(hours, minutes, 0, 0)
    setSelectedTime(formatTimeRange(finalDate, 120))
  }

  return (
    <div>
      <Form className="flex w-full flex-col gap-4" onSubmit={onSubmit}>
        <DatePicker {...propCalendar} />
        <ModalPopup
          trigger={
            <Button variant="ghost" isDisabled={!date}>
              Select Date before Booking Time
            </Button>
          }
          content={
            <TimeController
              start={String(deal?.restaurants?.open)}
              end={String(deal?.restaurants?.close)}
              onSelectTime={handleSelectTime}
            />
          }
        />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default DealBookingForm
