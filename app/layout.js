import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BusGo - Nigeria\'s Premier Bus Booking Platform',
  description: 'Book bus tickets across Nigeria with multiple operators and terminals. Compare prices, routes, and schedules for the best travel experience.',
  keywords: 'bus booking, Nigeria bus tickets, interstate travel, bus terminals, transport operators',
  openGraph: {
    title: 'BusGo - Nigeria\'s Premier Bus Booking Platform',
    description: 'Book bus tickets across Nigeria with multiple operators and terminals',
    type: 'website',
    locale: 'en_NG',
    url: 'https://busgo.ng',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
