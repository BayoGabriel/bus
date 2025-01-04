import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BusGo - Your Ultimate Bus Booking Platform',
  description: 'Book bus tickets easily with BusGo. Choose from various parks, routes, and prices.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-blue-600 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">BusGo</Link>
            <div className="space-x-4">
              <Link href="/search" className="hover:underline">Search</Link>
              <Link href="/parks" className="hover:underline">Parks</Link>
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100">Login</Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-100 p-4 mt-8">
          <div className="container mx-auto text-center text-gray-600">
            © 2023 BusGo. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}

