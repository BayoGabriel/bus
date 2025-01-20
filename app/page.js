'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaBus, FaMapMarkerAlt, FaTicketAlt, FaUserShield } from 'react-icons/fa';

export default function Home() {
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');

  const popularTerminals = [
    { name: 'Jibowu Terminal', location: 'Lagos', operators: 12 },
    { name: 'Utako Terminal', location: 'Abuja', operators: 8 },
    { name: 'Upper Iweka Terminal', location: 'Onitsha', operators: 15 },
  ];

  const features = [
    {
      icon: <FaBus className="w-8 h-8" />,
      title: 'Multiple Operators',
      description: 'Choose from various transport operators for your journey',
    },
    {
      icon: <FaMapMarkerAlt className="w-8 h-8" />,
      title: 'Nationwide Coverage',
      description: 'Access bus services across all major cities in Nigeria',
    },
    {
      icon: <FaTicketAlt className="w-8 h-8" />,
      title: 'Easy Booking',
      description: 'Simple and secure ticket booking process',
    },
    {
      icon: <FaUserShield className="w-8 h-8" />,
      title: 'Verified Operators',
      description: 'All operators are verified for your safety',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    window.location.href = `/search?from=${encodeURIComponent(location)}&to=${encodeURIComponent(destination)}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Journey Begins Here
            </h1>
            <p className="text-xl mb-8">
              Book bus tickets across Nigeria with multiple operators and terminals
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="bg-white rounded-lg p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    From
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md text-gray-900"
                    placeholder="Enter your location"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    To
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md text-gray-900"
                    placeholder="Enter your destination"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Search Tickets
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose BusGo?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Terminals Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Bus Terminals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularTerminals.map((terminal, index) => (
              <Link
                key={index}
                href={`/terminals/${terminal.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={`/terminals/terminal-${index + 1}.jpg`}
                    alt={terminal.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{terminal.name}</h3>
                  <p className="text-gray-600 mb-2">{terminal.location}</p>
                  <p className="text-sm text-blue-600">
                    {terminal.operators} operators available
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/terminals"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              View All Terminals
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied travelers who book with us daily
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
