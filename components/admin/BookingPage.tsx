'use client'

import { useState } from 'react'
import { Button } from '@heroui/react'
import { Card, CardBody } from '@heroui/card'
import { TableDataList } from '../design-system/Table'
import { useAuth } from '@/context/AuthContext'
import { useReservation } from '@/services/hooks/useReservation'
import { formatReadableTimeRange } from '@/utils/time-format'
import { start } from 'repl'
import { AdminHeader, Title } from '../design-system/Typography'
import { useTranslations } from 'next-intl'

export default function BookingPage() {
  const t = useTranslations()
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
      <AdminHeader title={t('admin.booking.title')} />
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
