'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaFilter, FaStar, FaBus, FaMapMarkerAlt } from 'react-icons/fa';

export default function Operators() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  // Mock data - replace with actual API call
  const operators = [
    {
      id: 1,
      name: 'GIG Motors',
      logo: '/operators/gig.jpg',
      description: 'Premium interstate transport service with modern fleet',
      rating: 4.5,
      reviews: 1250,
      baseCity: 'Lagos',
      routes: ['Lagos-Abuja', 'Lagos-Port Harcourt', 'Lagos-Benin'],
      fleetSize: 120,
      terminals: ['Jibowu', 'Ikorodu', 'Ajah'],
    },
    {
      id: 2,
      name: 'God is Good Motors',
      logo: '/operators/gigm.jpg',
      description: 'Reliable and comfortable interstate travel',
      rating: 4.3,
      reviews: 980,
      baseCity: 'Lagos',
      routes: ['Lagos-Asaba', 'Lagos-Onitsha', 'Lagos-Owerri'],
      fleetSize: 85,
      terminals: ['Jibowu', 'Mile 2', 'Festac'],
    },
    {
      id: 3,
      name: 'ABC Transport',
      logo: '/operators/abc.jpg',
      description: 'Leading transport company with nationwide coverage',
      rating: 4.4,
      reviews: 1100,
      baseCity: 'Abuja',
      routes: ['Abuja-Lagos', 'Abuja-Kano', 'Abuja-Port Harcourt'],
      fleetSize: 150,
      terminals: ['Utako', 'Kubwa', 'Nyanya'],
    },
  ];

  const cities = ['all', 'Lagos', 'Abuja', 'Port Harcourt', 'Benin', 'Onitsha'];

  const filteredOperators = operators.filter(operator => {
    const matchesSearch = operator.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || operator.baseCity === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Bus Operators</h1>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search operators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* City Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city.charAt(0).toUpperCase() + city.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Operators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOperators.map((operator) => (
            <div
              key={operator.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
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
                    <h2 className="text-xl font-semibold">{operator.name}</h2>
                    <div className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span>{operator.rating}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        ({operator.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{operator.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>Base: {operator.baseCity}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaBus className="mr-2" />
                    <span>Fleet Size: {operator.fleetSize} buses</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Popular Routes:</h3>
                  <div className="flex flex-wrap gap-2">
                    {operator.routes.slice(0, 3).map((route, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {route}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <Link
                    href={`/operators/${operator.id}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/booking?operator=${operator.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOperators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No operators found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
