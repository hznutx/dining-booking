'use client'

import { useState } from 'react'
import { Card, CardBody } from '@heroui/card'
import { Input, Button, Switch } from '@heroui/react'

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
  const updateDay = (
    index: number,
    field: keyof DaySchedule,
    value: any
  ) => {
    const updated = [...schedule]
    updated[index] = { ...updated[index], [field]: value }
    setSchedule(updated)
  }

  // ---------- closed range ----------
  const addClosedRange = () => {
    setClosedRanges([
      ...closedRanges,
      { id: Date.now(), start: '', end: '' },
    ])
  }

  const updateClosedRange = (
    id: number,
    field: keyof ClosedRange,
    value: string
  ) => {
    setClosedRanges(
      closedRanges.map((r) =>
        r.id === id ? { ...r, [field]: value } : r
      )
    )
  }

  const deleteClosedRange = (id: number) => {
    setClosedRanges(closedRanges.filter((r) => r.id !== id))
  }

  // ---------- save ----------
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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Restaurant Opening Hours</h1>

      {/* ---------- Weekly Schedule ---------- */}
      <Card className="rounded-2xl shadow">
        <CardBody className="space-y-4">
          <h2 className="text-lg font-semibold">Weekly Schedule</h2>

          {schedule.map((d, i) => (
            <div
              key={d.day}
              className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center border-b pb-3"
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
                onChange={(isSelected) =>
                  updateDay(i, 'isClosed', !isSelected)
                }
              >
                {d.isClosed ? 'Closed' : 'Open'}
              </Switch>

              <p className={`text-sm ${d.isClosed ? 'text-red-500' : 'text-green-500'}`}>
                {d.isClosed ? 'Closed' : `${d.open} - ${d.close}`}
              </p>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* ---------- Special Closed Dates ---------- */}
      <Card className="rounded-2xl shadow">
        <CardBody className="space-y-4">
          <h2 className="text-lg font-semibold">Special Closed Dates</h2>

          {closedRanges.length === 0 && (
            <p className="text-sm text-gray-400">
              No special closed dates
            </p>
          )}

          {closedRanges.map((r) => (
            <div
              key={r.id}
              className="flex flex-col md:flex-row gap-3 items-center"
            >
              <Input
                type="date"
                aria-label="Start date"
                value={r.start}
                onChange={(e) =>
                  updateClosedRange(r.id, 'start', e.target.value)
                }
              />

              <Input
                type="date"
                aria-label="End date"
                value={r.end}
                onChange={(e) =>
                  updateClosedRange(r.id, 'end', e.target.value)
                }
              />

              <Button
                variant="danger"
                size="sm"
                className="rounded-xl"
                onClick={() => deleteClosedRange(r.id)}
              >
                Delete
              </Button>
            </div>
          ))}

          <Button size="sm" onClick={addClosedRange}>
            + Add Closed Date Range
          </Button>
        </CardBody>
      </Card>

      {/* ---------- Save ---------- */}
      <div className="flex justify-end">
        <Button variant="primary" className="rounded-xl" onClick={handleSave}>
          Save All
        </Button>
      </div>
    </div>
  )
}