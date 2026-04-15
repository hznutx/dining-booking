'use client'

import { Card, CardBody } from '@heroui/card'

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Restaurants</p>
            <h2 className="text-2xl font-bold">12</h2>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Bookings Today</p>
            <h2 className="text-2xl font-bold">34</h2>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="text-sm text-gray-500">Users</p>
            <h2 className="text-2xl font-bold">120</h2>
          </CardBody>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardBody>
          <h3 className="font-semibold mb-3">Recent Bookings</h3>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Shabu King</span>
              <span>18:00</span>
            </div>
            <div className="flex justify-between">
              <span>Pizza Town</span>
              <span>19:30</span>
            </div>
          </div>
        </CardBody>
      </Card>

    </div>
  )
}