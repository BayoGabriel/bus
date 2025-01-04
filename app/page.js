import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to BusGo</h1>
        <p className="text-xl mb-8">Your Ultimate Bus Booking Platform</p>
        <Link href="/search" className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-700 transition duration-300">
          Book Now
        </Link>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Why Choose BusGo?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Image src="/icon-variety.svg" alt="Variety" width={64} height={64} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wide Variety</h3>
            <p>Choose from multiple parks and routes to fit your travel needs.</p>
          </div>
          <div className="text-center">
            <Image src="/icon-pricing.svg" alt="Flexible Pricing" width={64} height={64} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Flexible Pricing</h3>
            <p>Find the best deals with our dynamic pricing system.</p>
          </div>
          <div className="text-center">
            <Image src="/icon-easy.svg" alt="Easy Booking" width={64} height={64} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p>Book your tickets in just a few clicks.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
          <ol className="list-decimal list-inside text-left space-y-4">
            <li>Choose your preferred park from our wide selection.</li>
            <li>Select your pickup point, destination, and travel date.</li>
            <li>Pick from available traveling times and competitive prices.</li>
            <li>Specify the number of seats you need.</li>
            <li>Complete your booking and get ready for your journey!</li>
          </ol>
          <p className="mt-8 text-sm text-gray-600">
            Note: A 5% cancellation fee applies for bookings cancelled after confirmation.
          </p>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Popular Routes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Lagos to Abuja', 'Port Harcourt to Owerri', 'Enugu to Calabar'].map((route) => (
            <div key={route} className="border rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-2">{route}</h3>
              <p className="mb-4">Experience comfortable travel on our popular routes.</p>
              <Link href={`/search?route=${encodeURIComponent(route)}`} className="text-blue-600 hover:underline">
                Check availability →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

