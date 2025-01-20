'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaFilter } from 'react-icons/fa';

export default function TerminalList() {
  const [terminals, setTerminals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  const cities = ['all', 'Lagos', 'Abuja', 'Port Harcourt', 'Benin', 'Onitsha'];

  useEffect(() => {
    fetchTerminals();
  }, [selectedCity, searchTerm]);

  const fetchTerminals = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedCity !== 'all') params.append('city', selectedCity);
      if (searchTerm) params.append('query', searchTerm);

      const response = await fetch(`/api/terminals?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch terminals');
      
      const data = await response.json();
      setTerminals(data);
      setError(null);
    } catch (err) {
      setError('Error loading terminals. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search and Filter Section */}
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
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === 'all' ? 'All Cities' : city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12 text-red-600">
          {error}
        </div>
      )}

      {/* Terminals Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {terminals.map((terminal) => (
            <Link
              key={terminal._id}
              href={`/terminals/${terminal._id}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={terminal.imageUrl || '/images/terminal-placeholder.jpg'}
                  alt={terminal.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{terminal.name}</h2>
                <p className="text-gray-600 mb-2">{terminal.location}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-600">
                    {terminal.operators?.length || 0} operators
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{terminal.city}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && terminals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No terminals found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
