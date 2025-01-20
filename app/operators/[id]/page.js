'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaBus, FaMapMarkerAlt, FaClock, FaPhone, FaFilter } from 'react-icons/fa';

export default function OperatorPage({ params }) {
  const [selectedTerminal, setSelectedTerminal] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState('all');

  // Mock data - replace with actual API call
  const operator = {
    id: params.id,
    name: 'GIG Motors',
    logo: '/operators/gig.jpg',
    description: 'Premium interstate transport service with modern fleet and nationwide coverage. We prioritize safety, comfort, and punctuality.',
    rating: 4.5,
    reviews: 1250,
    baseCity: 'Lagos',
    phone: '+234 123 456 7890',
    email: 'info@gigmotors.com',
    website: 'www.gigmotors.com',
    fleetSize: 120,
    yearEstablished: 2005,
    facilities: ['Air Conditioning', 'WiFi', 'Refreshments', 'Luggage Space', 'Entertainment'],
    terminals: [
      {
        id: 1,
        name: 'Jibowu Terminal',
        location: 'Jibowu, Yaba, Lagos',
        routes: [
          {
            destination: 'Abuja',
            price: 15000,
            duration: '8 hours',
            schedule: ['6:00 AM', '9:00 AM', '12:00 PM'],
            amenities: ['AC', 'WiFi', 'Snacks'],
            vehicleType: 'Luxury Bus',
          },
          {
            destination: 'Port Harcourt',
            price: 12000,
            duration: '6 hours',
            schedule: ['7:00 AM', '10:00 AM', '1:00 PM'],
            amenities: ['AC', 'WiFi'],
            vehicleType: 'Executive Bus',
          },
        ],
      },
      {
        id: 2,
        name: 'Ikorodu Terminal',
        location: 'Ikorodu, Lagos',
        routes: [
          {
            destination: 'Benin',
            price: 8000,
            duration: '5 hours',
            schedule: ['7:30 AM', '10:30 AM', '1:30 PM'],
            amenities: ['AC'],
            vehicleType: 'Standard Bus',
          },
        ],
      },
    ],
  };

  const destinations = ['all', ...new Set(operator.terminals.flatMap(t => t.routes.map(r => r.destination)))];
  const terminalNames = ['all', ...operator.terminals.map(t => t.name)];

  const filteredTerminals = operator.terminals.filter(terminal => {
    if (selectedTerminal !== 'all' && terminal.name !== selectedTerminal) return false;
    if (selectedDestination === 'all') return true;
    return terminal.routes.some(route => route.destination === selectedDestination);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Operator Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="relative w-32 h-32 md:mr-8 mb-4 md:mb-0">
              <Image
                src={operator.logo}
                alt={operator.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{operator.name}</h1>
              <div className="flex items-center justify-center md:justify-start mb-4">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">{operator.rating}</span>
                <span className="text-gray-500 ml-2">({operator.reviews} reviews)</span>
              </div>
              <p className="text-gray-600 max-w-2xl">{operator.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Operator Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Company Information</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-600 mr-3" />
                <span>Base: {operator.baseCity}</span>
              </div>
              <div className="flex items-center">
                <FaBus className="text-blue-600 mr-3" />
                <span>Fleet Size: {operator.fleetSize} buses</span>
              </div>
              <div className="flex items-center">
                <FaClock className="text-blue-600 mr-3" />
                <span>Est. {operator.yearEstablished}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaPhone className="text-blue-600 mr-3" />
                <span>{operator.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 mr-3">@</span>
                <span>{operator.email}</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-600 mr-3">🌐</span>
                <a
                  href={`https://${operator.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {operator.website}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Facilities</h2>
            <div className="grid grid-cols-2 gap-3">
              {operator.facilities.map((facility) => (
                <div
                  key={facility}
                  className="flex items-center p-2 bg-gray-50 rounded-md text-sm"
                >
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Routes Section */}
        <h2 className="text-2xl font-semibold mb-6">Available Routes</h2>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedTerminal}
                onChange={(e) => setSelectedTerminal(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {terminalNames.map((terminal) => (
                  <option key={terminal} value={terminal}>
                    {terminal === 'all' ? 'All Terminals' : terminal}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {destinations.map((destination) => (
                  <option key={destination} value={destination}>
                    {destination === 'all' ? 'All Destinations' : destination}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Routes List */}
        <div className="space-y-6">
          {filteredTerminals.map((terminal) => (
            <div key={terminal.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">{terminal.name}</h3>
                <p className="text-gray-600 mb-6">{terminal.location}</p>

                <div className="space-y-4">
                  {terminal.routes.map((route, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:border-blue-500 transition duration-300"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <span className="text-gray-600">Destination</span>
                          <p className="font-semibold">{route.destination}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Price</span>
                          <p className="font-semibold">₦{route.price.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration</span>
                          <p className="font-semibold">{route.duration}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Vehicle Type</span>
                          <p className="font-semibold">{route.vehicleType}</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <span className="text-gray-600">Departures:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {route.schedule.map((time, timeIndex) => (
                            <span
                              key={timeIndex}
                              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4">
                        <span className="text-gray-600">Amenities:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {route.amenities.map((amenity, amenityIndex) => (
                            <span
                              key={amenityIndex}
                              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <Link
                          href={`/booking?operator=${operator.id}&terminal=${terminal.id}&route=${route.destination}`}
                          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
