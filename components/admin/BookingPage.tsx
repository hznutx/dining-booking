'use client'

import { useState } from 'react'
import { Button } from '@heroui/react'
import { Card, CardBody } from '@heroui/card'
import { TableDataList } from '../design-system/Table'
import { useAuth } from '@/context/AuthContext'
import { useReservation } from '@/services/hooks/useReservation'
import { formatReadableTimeRange } from '@/utils/time-format'
import { start } from 'repl'

export default function BookingPage() {
  const deleteBooking = (id: number) => {}
  const { profile } = useAuth()
  const { allBookings } = useReservation(Number(profile?.restaurant_id))
  const recentBookings = allBookings.map(
    ({ guest_name, phone, guest_count, time_range, deals }, i) => {
      const { date, timeStart, timeEnd } = formatReadableTimeRange(time_range)
      return {
        id: i,
        name: guest_name,
        phone,
        deal: deals?.name,
        price: deals?.price,
        seat: guest_count,
        date,
        start: timeStart,
        end: timeEnd,
      }
    },
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Booking Management</h1>
      <Card>
        <CardBody className="p-4">
          <div className="divide-y">
            <TableDataList
              columns={[
                { id: 'name', name: 'Name' },
                { id: 'deal', name: 'Package' },
                { id: 'seat', name: 'People' },
                { id: 'price', name: 'Net Price' },
                { id: 'start', name: 'Time Start' },
                { id: 'end', name: 'Time End' },
                { id: 'date', name: 'Booking Date' },
                { id: 'phone', name: 'Contact (tel.)' },
              ]}
              tableData={recentBookings}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
