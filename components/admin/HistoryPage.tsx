'use client'

import { useState } from 'react'
import { Input } from '@heroui/react'
import { Card, CardBody } from '@heroui/card'

type History = {
  id: number
  user: string
  action: string
  restaurant: string
  time: string
  date: string
}

export default function HistoryPage() {
  const [search, setSearch] = useState('')

  const [history] = useState<History[]>([
    {
      id: 1,
      user: 'John',
      action: 'Booked',
      restaurant: 'Shabu King',
      time: '18:00',
      date: '2026-04-14',
    },
    {
      id: 2,
      user: 'Jane',
      action: 'Cancelled',
      restaurant: 'Pizza Town',
      time: '19:30',
      date: '2026-04-13',
    },
  ])

  const filtered = history.filter(
    (h) =>
      h.user.toLowerCase().includes(search.toLowerCase()) ||
      h.restaurant.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">History Logs</h1>

      {/* Search */}
      <Input
        placeholder="Search user or restaurant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <Card>
        <CardBody className="p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2">User</th>
                <th className="p-2">Action</th>
                <th className="p-2">Restaurant</th>
                <th className="p-2">Time</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((h) => (
                <tr key={h.id} className="border-b">
                  <td className="p-2">{h.user}</td>
                  <td className="p-2">
                    <span
                      className={
                        h.action === 'Booked'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }
                    >
                      {h.action}
                    </span>
                  </td>
                  <td className="p-2">{h.restaurant}</td>
                  <td className="p-2">{h.time}</td>
                  <td className="p-2">{h.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}