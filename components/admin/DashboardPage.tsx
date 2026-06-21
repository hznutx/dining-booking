'use client'

import { Card, CardBody } from '@heroui/card'
import { InfoBox } from '../design-system/InfoBox'
import { useReservation } from '@/services/hooks/useReservation'
import { useAuth } from '@/context/AuthContext'
import BrandHeader from '../design-system/BrandHeader'
import { TableDataList } from '../design-system/Table'
import { formatReadableTimeRange, formatTimeRange } from '@/utils/time-format'
import { useLocale, useTranslations } from 'next-intl'
import { Chip, ChipRootProps } from '@heroui/react'

export default function DashboardPage() {
  const locale = useLocale()
  const t = useTranslations()
  const { profile } = useAuth()
  const {
    allBookings,
    countAll,
    todayBookings,
    uniqueBookings,
    countTotalSeatsToday,
  } = useReservation(Number(profile?.restaurant_id))
  const needConfirmation = allBookings.filter((booking) => !booking.redeem)
  const expiringSoon = allBookings.filter((booking) => {
    const expiredAt = booking.deals?.expired_at

    if (!expiredAt) return false

    const daysLeft =
      (new Date(expiredAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)

    return daysLeft <= 3
  })

  const stats = [
    {
      name: 'Bookings Today',
      value: todayBookings.length,
    },
    {
      name: 'Total Users',
      value: countTotalSeatsToday,
    },

    {
      name: 'Need Confirmation',
      value: needConfirmation.length,
    },
    {
      name: 'Expiring Soon',
      value: expiringSoon.length,
    },
  ]

  const recentBookings = allBookings.map((booking, i) => {
    const { guest_name, phone, guest_count, time_range, deals, redeem } =
      booking

    const { date, endDate, timeRange } = formatReadableTimeRange(
      time_range,
      locale.toString(),
    )
    const isExpired = endDate instanceof Date && endDate.getTime() < Date.now()
    const propsChip = {
      color:
        !isExpired && !redeem ? 'warning' : isExpired ? 'danger' : 'success',
      variant: 'soft',
    } as ChipRootProps

    return {
      id: i,
      name: guest_name,
      phone,
      deal: deals?.name,
      price: `฿${Number(deals?.price || 0).toLocaleString()}`,
      seat: guest_count,
      date,
      time: timeRange,
      status: <Chip {...propsChip}>{redeem ? 'Checked in' : 'Reserved'}</Chip>,
      confirm: (
        <Chip {...propsChip}>{!redeem ? 'Call Customer' : 'Confirmed'}</Chip>
      ),
      expire: <Chip {...propsChip}>{isExpired ? 'Expired' : 'Active'}</Chip>,
    }
  })

  return (
    <div>
      <div className="hidden-scroll relative flex w-full gap-4 overflow-x-scroll pb-6 pl-6 xl:grid xl:grid-cols-4 xl:overflow-x-hidden xl:px-6">
        {stats.map(({ name, value }, i) => (
          <InfoBox key={i} title={name} value={value} variant="secondary" />
        ))}
      </div>
      <div className="space-y-6 px-6">
        <BrandHeader detail={profile?.restaurants} />
        <Card>
          <CardBody>
            <h3 className="text-accent mb-4 font-medium">
              {t('admin.dashboard.recent')}
            </h3>
            <div className="flex h-full">
              <TableDataList
                columns={[
                  { id: 'name', name: 'Name' },
                  { id: 'deal', name: 'Package' },
                  { id: 'seat', name: 'People' },
                  { id: 'price', name: 'Revenue' },
                  { id: 'date', name: 'Booking Date' },
                  { id: 'time', name: 'Time' },
                  { id: 'phone', name: 'Contact' },
                  { id: 'status', name: 'Redeem' },
                  { id: 'confirm', name: 'Confirmation' },
                  { id: 'expire', name: 'Deal Status' },
                ]}
                tableData={recentBookings}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
