'use client'

import { useState } from 'react'
import { Card, CardBody } from '@heroui/card'
import { Input, Button, Switch } from '@heroui/react'
import { AdminHeader } from '../design-system/Typography'

type DaySchedule = {
  day: string
  open: string
  close: string
  isClosed: boolean
}

type ClosedRange = {
  id: number
  start: string
  end: string
}

const defaultSchedule: DaySchedule[] = [
  { day: 'Monday', open: '10:00', close: '22:00', isClosed: false },
  { day: 'Tuesday', open: '10:00', close: '22:00', isClosed: false },
  { day: 'Wednesday', open: '10:00', close: '22:00', isClosed: false },
  { day: 'Thursday', open: '10:00', close: '22:00', isClosed: false },
  { day: 'Friday', open: '10:00', close: '23:00', isClosed: false },
  { day: 'Saturday', open: '10:00', close: '23:00', isClosed: false },
  { day: 'Sunday', open: '10:00', close: '22:00', isClosed: true },
]

export default function RestaurantSchedulePage() {
  const [schedule, setSchedule] = useState(defaultSchedule)
  const [closedRanges, setClosedRanges] = useState<ClosedRange[]>([])

  // ---------- schedule ----------
  const updateDay = (index: number, field: keyof DaySchedule, value: any) => {
    const updated = [...schedule]
    updated[index] = { ...updated[index], [field]: value }
    setSchedule(updated)
  }

  // ---------- closed range ----------
  const addClosedRange = () => {
    setClosedRanges([...closedRanges, { id: Date.now(), start: '', end: '' }])
  }

  const updateClosedRange = (
    id: number,
    field: keyof ClosedRange,
    value: string,
  ) => {
    setClosedRanges(
      closedRanges.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    )
  }

  const deleteClosedRange = (id: number) => {
    setClosedRanges(closedRanges.filter((r) => r.id !== id))
  }

  const handleSave = () => {
    // validate
    for (const r of closedRanges) {
      if (r.start && r.end && r.start > r.end) {
        alert('Start date must be before End date')
        return
      }
    }

    console.log('schedule:', schedule)
    console.log('closedRanges:', closedRanges)
    alert('Saved!')
  }

  return (
    <div className="space-y-6">
      <AdminHeader title="Restaurant Opening Hours" />
      <Card className="rounded-2xl p-6 shadow">
        <CardBody className="space-y-4">
          <h2 className="text-lg font-semibold">Weekly Schedule</h2>

          {schedule.map((d, i) => (
            <div
              key={d.day}
              className="grid grid-cols-1 items-center gap-4 border-b pb-3 md:grid-cols-5"
            >
              <p className="font-semibold">{d.day}</p>

              <Input
                type="time"
                aria-label={`${d.day} open`}
                value={d.open}
                disabled={d.isClosed}
                onChange={(e) => updateDay(i, 'open', e.target.value)}
              />

              <Input
                type="time"
                aria-label={`${d.day} close`}
                value={d.close}
                disabled={d.isClosed}
                onChange={(e) => updateDay(i, 'close', e.target.value)}
              />

              <Switch
                isSelected={!d.isClosed}
                onChange={(isSelected) => updateDay(i, 'isClosed', !isSelected)}
              >
                {d.isClosed ? 'Closed' : 'Open'}
              </Switch>

              <p
                className={`text-sm ${d.isClosed ? 'text-red-500' : 'text-green-500'}`}
              >
                {d.isClosed ? 'Closed' : `${d.open} - ${d.close}`}
              </p>
            </div>
          ))}
        </CardBody>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" className="rounded-xl" onClick={handleSave}>
          Save All
        </Button>
      </div>
    </div>
  )
}
