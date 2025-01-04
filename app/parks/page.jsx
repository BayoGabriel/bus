import Link from 'next/link'

async function getParks() {
  const res = await fetch('http://localhost:3000/api/parks')
  if (!res.ok) {
    throw new Error('Failed to fetch parks')
  }
  return res.json()
}

export default async function Parks() {
  const parks = await getParks()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Bus Parks</h1>
      <div className="grid gap-4">
        {parks.map((park) => (
          <div key={park.id} className="border rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-2">{park.name}</h2>
            <p className="mb-4">Available Services: {park.services.length}</p>
            <Link href={`/parks/${park.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
              View Services
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

