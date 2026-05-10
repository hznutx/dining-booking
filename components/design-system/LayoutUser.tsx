import React from 'react'
import { Navbar } from '../layout/navbar'
import { Footer } from '../layout/footer'

export const LayoutUser = ({ children }: { children: any }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
