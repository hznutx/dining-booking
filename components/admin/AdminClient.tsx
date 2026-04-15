'use client'

import { useState } from 'react'
import DashboardPage from './DashboardPage'
import BookingPage from './BookingPage'
import HistoryPage from './HistoryPage'
import UsersPage from './UsersPage'
import RestaurantPage from './RestaurantPage'
import MenusManagementPage from './MenusManagementPage'

export default function AdminClient() {
  const [page, setPage] = useState('dashboard')

  return (
    <div className="flex p-3 ">

      <div className="flex flex-col gap-2 w-50 p-10">
        {[
          'dashboard',
          'bookings',
          'history',
          'restaurant',
          'menus',
          'users',
        ].map((item) => (
          <button
            key={item}
            onClick={() => setPage(item)}
            className={`text-left px-3 py-2 rounded capitalize ${
              page === item
                ? 'bg-background'
                : 'hover:bg-background'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {page === 'dashboard' && <DashboardPage/>}
        {page === 'bookings' && <BookingPage/>}
        {page === 'history' && <HistoryPage/>}
        {page === 'restaurant' && <RestaurantPage/>}
        {page === 'menus' && <MenusManagementPage/>}
        {page === 'users' && <UsersPage/>}
      </div>
    </div>
  )
}