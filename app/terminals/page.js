"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaFilter } from 'react-icons/fa';
import TerminalList from './TerminalList';
import { Suspense } from 'react';



async function TerminalListWrapper() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  // Mock data - replace with actual API call
  const terminals = [
    {
      id: 1,
      name: 'Jibowu Terminal',
      city: 'Lagos',
      location: 'Jibowu, Yaba',
      operators: 12,
      rating: 4.5,
      image: '/terminals/terminal-1.jpg',
    },
    {
      id: 2,
      name: 'Utako Terminal',
      city: 'Abuja',
      location: 'Utako District',
      operators: 8,
      rating: 4.3,
      image: '/terminals/terminal-2.jpg',
    },
    {
      id: 3,
      name: 'Upper Iweka Terminal',
      city: 'Onitsha',
      location: 'Upper Iweka Road',
      operators: 15,
      rating: 4.2,
      image: '/terminals/terminal-3.jpg',
    },
    // Add more terminals as needed
  ];

  const cities = ['all', 'Lagos', 'Abuja', 'Onitsha', 'Port Harcourt', 'Enugu'];

  const filteredTerminals = terminals.filter(terminal => {
    const matchesSearch = terminal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         terminal.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'all' || terminal.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <Suspense 
      fallback={
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Input */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search terminals..."
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
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
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
      <TerminalList terminals={filteredTerminals} />
      {filteredTerminals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No terminals found matching your criteria.</p>
        </div>
      )}
    </Suspense>
  );
}

export default function TerminalsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Bus Terminals</h1>
        <TerminalListWrapper />
      </div>
    </div>
  );
}
