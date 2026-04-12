'use client'

import { ToastProvider } from '@heroui/react'

export const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastProvider placement="top" />
      {children}
    </>
  )
}
