import { Hero } from '@/components/home/Hero'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="xl:min-h-screen">
        <Hero />
      </main>
      <Footer />
    </>
  )
}
