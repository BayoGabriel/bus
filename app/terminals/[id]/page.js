'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBus, FaMapMarkerAlt, FaPhone, FaClock, FaStar, FaFilter } from 'react-icons/fa';

export default function TerminalPage({ params }) {
  const [selectedOperator, setSelectedOperator] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState('all');

  // Mock data - replace with actual API call
  const terminal = {
    id: params.id,
    name: 'Jibowu Terminal',
    city: 'Lagos',
    location: 'Jibowu, Yaba',
    description: 'One of the largest bus terminals in Lagos, serving multiple routes across Nigeria.',
    image: '/terminals/terminal-1.jpg',
    phone: '+234 123 456 7890',
    hours: '5:00 AM - 10:00 PM',
    facilities: ['Waiting Area', 'Restrooms', 'Food Court', 'ATM', 'Parking'],
    operators: [
      {
        id: 1,
        name: 'GIG Motors',
        logo: '/operators/gig.jpg',
        rating: 4.5,
        routes: [
          {
            destination: 'Abuja',
            price: 15000,
            duration: '8 hours',
            departures: ['6:00 AM', '9:00 AM', '12:00 PM'],
          },
          {
            destination: 'Port Harcourt',
            price: 12000,
            duration: '6 hours',
            departures: ['7:00 AM', '10:00 AM', '1:00 PM'],
          },
        ],
      },
      {
        id: 2,
        name: 'God is Good Motors',
        logo: '/operators/gigm.jpg',
        rating: 4.3,
        routes: [
          {
            destination: 'Benin',
            price: 8000,
            duration: '5 hours',
            departures: ['7:30 AM', '10:30 AM', '1:30 PM'],
          },
          {
            destination: 'Abuja',
            price: 16000,
            duration: '8 hours',
            departures: ['6:30 AM', '9:30 AM', '12:30 PM'],
          },
        ],
      },
    ],
  };

  const destinations = ['all', ...new Set(terminal.operators.flatMap(op => op.routes.map(r => r.destination)))];
  
  const filteredOperators = terminal.operators.filter(operator => {
    if (selectedDestination === 'all') return true;
    return operator.routes.some(route => route.destination === selectedDestination);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96">
        <Image
          src={terminal.image}
          alt={terminal.name}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {terminal.name}
            </h1>
            <p className="text-xl text-white mb-4">{terminal.city}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Terminal Info */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">About the Terminal</h2>
              <p className="text-gray-600 mb-6">{terminal.description}</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-blue-600 mr-3" />
                  <span>{terminal.location}</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-blue-600 mr-3" />
                  <span>{terminal.phone}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-blue-600 mr-3" />
                  <span>{terminal.hours}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Facilities</h2>
              <div className="grid grid-cols-2 gap-4">
                {terminal.facilities.map((facility) => (
                  <div
                    key={facility}
                    className="flex items-center p-3 bg-gray-50 rounded-md"
                  >
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Operators Section */}
        <h2 className="text-2xl font-semibold mb-6">Available Operators</h2>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Destinations</option>
                {destinations.filter(d => d !== 'all').map((destination) => (
                  <option key={destination} value={destination}>
                    {destination}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Operators List */}
        <div className="space-y-6">
          {filteredOperators.map((operator) => (
            <div
              key={operator.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={operator.logo}
                        alt={operator.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{operator.name}</h3>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>{operator.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/operators/${operator.id}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    View Profile
                  </Link>
                </div>

                {/* Routes */}
                <div className="space-y-4">
                  {operator.routes.map((route, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:border-blue-500 transition duration-300"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                          <Link
                            href={`/booking?operator=${operator.id}&route=${route.destination}`}
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className="text-gray-600">Departures:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {route.departures.map((time, timeIndex) => (
                            <span
                              key={timeIndex}
                              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                            >
                              {time}
                            </span>
                          ))}
                        </div>
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
