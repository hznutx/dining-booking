'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@heroui/react'
import { Card, CardBody } from '@heroui/card'
import ModalEditMenu from './ModalEditMenu'

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

export default function RestaurantPage() {
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null)
  const [open, setOpen] = useState(false)
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null)

  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: 1,
      name: 'Shabu King',
      menus: [
        {
          id: 1,
          name: 'Pork Set',
          price: 299,
          image: 'https://picsum.photos/300/200',
          promotion: 0,
        },
      ],
    },
  ])

  const updateMenu = (rId: number, updatedMenu: MenuItem) => {
    setRestaurants(
      restaurants.map((r) =>
        r.id === rId
          ? {
              ...r,
              menus: r.menus.map((m) =>
                m.id === updatedMenu.id ? updatedMenu : m
              ),
            }
          : r
      )
    )
  }

  const addMenu = (rId: number) => {
    setRestaurants(
      restaurants.map((r) =>
        r.id === rId
          ? {
              ...r,
              menus: [
                ...r.menus,
                {
                  id: Date.now(),
                  name: 'New Menu',
                  price: 0,
                  image: '',
                  promotion: 0,
                },
              ],
            }
          : r
      )
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Menus Management</h1>

      {restaurants.map((r) => (

        <Card key={r.id}>
          <CardBody className="space-y-4 p-4">
            <Button size="sm" onClick={() => addMenu(r.id)}>
              + Add Menu
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {r.menus.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                      setSelectedMenu(m)
                      setSelectedRestaurantId(r.id)
                      setOpen(true)
                  }}
                  className="cursor-pointer"
                >
                  <Card
                      key={m.id}
                      className="overflow-hidden rounded-2xl shadow border hover:scale-[1.02] transition cursor-pointer">
                      <Image
                          src={m.image || 'https://picsum.photos/300/200'}
                          width={300}
                          height={200}
                          alt={m.name}
                          className="w-full h-40 object-cover"
                          unoptimized
                      />
                      {m.promotion > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg shadow">
                          -{m.promotion}%
                        </div>
                      )}

                      <CardBody className="space-y-2">
                          <p className="font-semibold">{m.name}</p>
                          {/* 💰 ราคา */}
                          {m.promotion > 0 ? (
                            <div className="flex items-center gap-2">
                              {/* ราคาใหม่ */}
                              <p className="text-red-500 font-bold">
                                ฿{Math.round(m.price * (1 - m.promotion / 100))}
                              </p>

                              {/* ราคาเดิม */}
                              <p className="text-gray-400 line-through text-sm">
                                ฿{m.price}
                              </p>
                            </div>
                          ) : (
                            <p className="text-gray-500">฿{m.price}</p>
                          )}
                      </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      ))}

      {/* Modal */}
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