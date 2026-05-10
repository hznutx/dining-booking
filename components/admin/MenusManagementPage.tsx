'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@heroui/react'
import { Card, CardBody } from '@heroui/card'
import ModalEditMenu from './ModalEditMenu'
import { useManageRestaurant } from '@/services/hooks/useReservation'
import { useAuth } from '@/context/AuthContext'
import { useAdmin } from '@/context/AdminContext'
import { DealCard } from '../booking/DealCard'

type MenuItem = {
  id: number
  name: string
  price: number
  image: string
  promotion: number
}

type Restaurant = {
  id: number
  name: string
  menus: MenuItem[]
}

export default function MenusManagement() {
  const { profile } = useAuth()
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null)
  const [open, setOpen] = useState(false)
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null)

  const { allDeals, restaurant } = useManageRestaurant(
    Number(profile?.restaurant_id),
  )

  const updateMenu = (rId: number, updatedMenu: MenuItem) => {}

  const addMenu = (rId: number) => {}

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Menus Management</h1>
      <Card>
        <CardBody className="space-y-4 p-4">
          <Button
            size="sm"
            onClick={() => addMenu(Number(profile?.restaurant_id))}
          >
            + Add Menu
          </Button>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allDeals?.map((data, i) => (
              <DealCard data={data} key={i} isReadOnly />
            ))}
          </div>
        </CardBody>
      </Card>

      <ModalEditMenu
        open={open}
        onClose={() => setOpen(false)}
        menu={selectedMenu}
        onSave={(updatedMenu) => {
          if (selectedRestaurantId) {
            updateMenu(selectedRestaurantId, updatedMenu)
          }
        }}
      />
    </div>
  )
}
