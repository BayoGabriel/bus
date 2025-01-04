import Link from 'next/link'

async function getPark(id) {
  const res = await fetch(`http://localhost:3000/api/parks`)
  if (!res.ok) {
    throw new Error('Failed to fetch park')
  }
  const parks = await res.json()
  return parks.find(park => park.id === parseInt(id))
}

export default async function Park({ params }) {
  const park = await getPark(params.id)

  if (!park) {
    return <div>Park not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{park.name}</h1>
      <h2 className="text-2xl font-semibold mb-4">Available Services</h2>
      <div className="grid gap-4">
        {park.services.map((service) => (
          <div key={service.id} className="border rounded-lg p-4">
            <p>From: {service.from}</p>
            <p>To: {service.to}</p>
            <p>Date: {service.date}</p>
            <p className="font-bold">Price: ₦{service.price}</p>
            <Link href={`/booking/${park.id}/${service.id}`} className="bg-blue-600 text-white px-4 py-2 rounded mt-2 inline-block hover:bg-blue-700 transition duration-300">
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

