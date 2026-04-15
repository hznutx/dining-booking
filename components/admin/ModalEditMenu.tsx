'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input, Button } from '@heroui/react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@heroui/modal'

type MenuItem = {
  id: number
  name: string
  price: number
  image: string
  promotion: number
}

type Props = {
  open: boolean
  onClose: () => void
  menu: MenuItem | null
  onSave: (menu: MenuItem) => void
}

export default function ModalEditMenu({ open, onClose, menu, onSave }: Props) {
  const [form, setForm] = useState<MenuItem | null>(menu)

  useEffect(() => {
    setForm(menu)
  }, [menu])

  if (!form) return null

  const handleFileChange = (file: File) => {
    const url = URL.createObjectURL(file)
    setForm({ ...form, image: url })
  }

  const previewPrice =
    form.promotion > 0
      ? Math.round(form.price * (1 - form.promotion / 100))
      : form.price

  return (
    <Modal isOpen={open} onOpenChange={onClose} size="sm" hideCloseButton>
      <ModalContent className="bg-background rounded-2xl shadow-xl">
        {/* HEADER */}
        <ModalHeader className="border-b pb-3 space-y-4 pt-1">
          <div>
            <p className="text-lg font-semibold">Edit Menu</p>
            <p className="text-xs text-gray-400">
              Update menu information & pricing
            </p>
          </div>
        </ModalHeader>

        {/* BODY */}
        <ModalBody className="space-y-4">
          {/* IMAGE PREVIEW */}
          <div className="relative overflow-hidden rounded-2xl border">
            <Image
              src={form.image || 'https://picsum.photos/600/300'}
              width={600}
              height={300}
              alt={form.name}
              className="h-44 w-full object-cover"
              unoptimized
            />

            {form.promotion > 0 && (
              <div className="absolute top-2 left-2 rounded-lg bg-red-500 px-2 py-1 text-xs text-white shadow">
                -{form.promotion}%
              </div>
            )}

            {/* UPLOAD BUTTON (SMALL FLOAT) */}
            <label className="absolute bottom-2 right-2 cursor-pointer">
              <div className="rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur hover:bg-black/80 transition">
                📷 Upload
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileChange(e.target.files[0])
                  }
                }}
              />
            </label>
          </div>

          {/* UPLOAD
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              className="text-sm"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileChange(e.target.files[0])
                }
              }}
            />
          </div> */}

          {/* FORM GRID */}
          <div className="grid grid-cols-1 gap-4">
            {/* MENU NAME */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Menu Name</label>
              <Input
                placeholder="Enter menu name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* PRICE */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Price</label>
              <Input
                type="number"
                placeholder="Price"
                value={String(form.price)}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
              />
            </div>
            {/* PROMOTION + FINAL PRICE */}
            <div className="grid grid-cols-2 items-end gap-3">
              {/* PROMOTION */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Promotion (%)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={String(form.promotion || 0)}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      promotion: Number(e.target.value),
                    })
                  }
                />
              </div>

              {/* FINAL PRICE */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Final Price</label>

                <div className="flex h-10 items-center rounded-xl border bg-gray-50 px-3 dark:bg-gray-800">
                  <p className="text-lg font-bold text-red-500">
                    ฿{previewPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>

        {/* FOOTER */}
        <ModalFooter className="flex justify-between border-t pt-2 mb-2">
          <Button variant="primary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="primary"
            className="rounded-xl px-6"
            onClick={() => {
              onSave(form)
              onClose()
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
