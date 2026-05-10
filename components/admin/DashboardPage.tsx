'use client'

import { Card, CardBody } from '@heroui/card'
import { InfoBox } from '../design-system/InfoBox'
import { useReservation } from '@/services/hooks/useReservation'
import { useAuth } from '@/context/AuthContext'
import BrandHeader from '../design-system/BrandHeader'
import { TableDataList } from '../design-system/Table'
import { formatReadableTimeRange, formatTimeRange } from '@/utils/time-format'
import { useLocale } from 'next-intl'

export default function DashboardPage() {
  const locale = useLocale()
  const { profile } = useAuth()
  const {
    allBookings,
    countAll,
    todayBookings,
    uniqueBookings,
    countTotalSeatsToday,
  } = useReservation(Number(profile?.restaurant_id))
  const stats = [
    { name: 'Bookings Today', value: todayBookings?.length },
    { name: 'Users', value: uniqueBookings?.length },
    { name: 'Total Seats', value: countTotalSeatsToday },
    { name: 'Total Bookings', value: countAll },
  ]

  const recentBookings = allBookings.map(
    ({ guest_name, phone, guest_count, time_range, deals }, i) => {
      const { date, timeRange } = formatReadableTimeRange(
        time_range,
        locale.toString(),
      )
      return {
        id: i,
        name: guest_name,
        phone,
        deal: deals?.name,
        price: deals?.price,
        seat: guest_count,
        date,
        time: timeRange,
      }
    },
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {stats.map(({ name, value }, i) => (
          <InfoBox key={i} title={name} value={value} variant="secondary" />
        ))}
      </div>
      <BrandHeader detail={profile?.restaurants} />

      {/* RECENT BOOKINGS */}
      <Card>
        <CardBody>
          {/* <BookingPage/> */}
          <h3 className="mb-4 font-semibold">Recent Bookings</h3>

          <div className="divide-y">
            <TableDataList
              columns={[
                { id: 'name', name: 'Name' },
                { id: 'deal', name: 'Package' },
                { id: 'seat', name: 'People' },
                { id: 'price', name: 'Net Price' },
                { id: 'date', name: 'Booking Date' },
                { id: 'time', name: 'Time' },
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
