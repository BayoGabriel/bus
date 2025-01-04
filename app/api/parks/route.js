import { NextResponse } from 'next/server'

// This would typically be stored in a database
let parks = [
  {
    id: 1,
    name: 'ABC Transport',
    services: [
      { id: 1, from: 'Lagos', to: 'Abuja', date: '2023-06-15', price: 5000 },
      { id: 2, from: 'Lagos', to: 'Port Harcourt', date: '2023-06-16', price: 6000 },
    ]
  },
  {
    id: 2,
    name: 'XYZ Lines',
    services: [
      { id: 1, from: 'Abuja', to: 'Kano', date: '2023-06-15', price: 4500 },
      { id: 2, from: 'Abuja', to: 'Lagos', date: '2023-06-16', price: 5500 },
    ]
  },
]

export async function GET() {
  return NextResponse.json(parks)
}

export async function POST(request) {
  const { parkId, service } = await request.json()
  const park = parks.find(p => p.id === parkId)
  if (park) {
    service.id = park.services.length + 1
    park.services.push(service)
    return NextResponse.json(park)
  }
  return NextResponse.json({ error: 'Park not found' }, { status: 404 })
}

