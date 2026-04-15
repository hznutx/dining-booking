'use client'

import { useState } from 'react'
import { Button } from '@heroui/react'
import { Card, CardBody } from '@heroui/card'

type Booking = {
  id: number
  name: string
  email: string
  time_start: string
  time_end: string
  people: number
}

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      name: 'John',
      email: 'klrklk@frlkgrg.com',
      time_start: '18:00',
      time_end: '19:00',
      people: 2,
    },
    {
      id: 2,
      name: 'Jane',
      email: 'wfwefej@fkjfrf.co.th',
      time_start: '19:30',
      time_end: '19:40',
      people: 4,
    },
  ])

  const deleteBooking = (id: number) => {
    setBookings(bookings.filter((b) => b.id !== id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Booking Management</h1>
      <Card>
        <CardBody className="p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Time Start</th>
                <th className="p-2">Time End</th>
                <th className="p-2">People</th>
                <th className="p-2 text-right">Notification</th>
                <th className="p-2 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b">
                  <td className="p-2">{b.name}</td>
                  <td className="p-2">{b.email}</td>
                  <td className="p-2">{b.time_start}</td>
                  <td className="p-2">{b.time_end}</td>
                  <td className="p-2">{b.people}</td>

                  <td className="p-2 text-right">
                    <Button
                      variant="danger"
                      size="sm"
                      // onClick={() => deleteBooking(b.id)}
                    >
                      Send
                    </Button>
                  </td>
                  <td className="p-2 text-right">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteBooking(b.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}