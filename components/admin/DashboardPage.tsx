'use client'

import { Card, CardBody } from '@heroui/card'
import BookingPage from './BookingPage'

export default function DashboardPage() {
  // TODO: เปลี่ยนเป็น data จาก API / Supabase
  const stats = {
    usersToday: 45,
    bookingsToday: 34,
    newUsersToday: 12,
    totalUsers: 120,
    totalBookings: 560,
  }

  const recentBookings = [
    { name: 'Shabu King', time: '18:00', user: 'Aran' },
    { name: 'Pizza Town', time: '19:30', user: 'John' },
    { name: 'Sushi Bar', time: '20:00', user: 'Jane' },
  ]

  return (
    <div className="space-y-6">

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">

        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Users Today</p>
            <h2 className="text-2xl font-bold">{stats.usersToday}</h2>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Bookings Today</p>
            <h2 className="text-2xl font-bold">{stats.bookingsToday}</h2>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">New Users</p>
            <h2 className="text-2xl font-bold">{stats.newUsersToday}</h2>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Total Bookings</p>
            <h2 className="text-2xl font-bold">{stats.totalBookings}</h2>
          </CardBody>
        </Card>

      </div>

      {/* RECENT BOOKINGS */}
      <Card>
        <CardBody>
          {/* <BookingPage/> */}
          <h3 className="font-semibold mb-4">Recent Bookings</h3>

          <div className="divide-y">
            {recentBookings.map((b, i) => (
              <div key={i} className="flex justify-between py-2">
                <div>
                  <p className="font-medium">{b.name}</p>
                  <p className="text-xs text-gray-400">by {b.user}</p>
                </div>
                <span className="text-sm">{b.time}</span>
              </div>
            ))}
          </div>

        </CardBody>
      </Card>

    </div>
  )
}