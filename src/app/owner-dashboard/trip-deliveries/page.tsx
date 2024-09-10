'use client';

import React, { useState } from 'react';

export default function TripDelivery() {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed' | 'planning' | 'create'>(
    'ongoing'
  );

  const ongoingTrips = [
    { route: 'City A - City B', driver: 'John Doe', truck: 'Truck 1', ETA: '2 hrs' },
    { route: 'City C - City D', driver: 'Jane Doe', truck: 'Truck 2', ETA: '3 hrs' },
  ];

  const completedTrips = [
    {
      route: 'City X - City Y',
      deliveryTime: '2023-01-01',
      earnings: '$500',
    },
  ];

  const handleTabChange = (tab: 'ongoing' | 'completed' | 'planning' | 'create') => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">Trips & Deliveries</h1>

      {/* Tabs Navigation */}
      <div className="flex space-x-3 mb-6">
        <button
          className={`px-4 py-2 rounded-lg focus:outline-none ${
            activeTab === 'ongoing'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-gray-800 border border-gray-300'
          } transition duration-300 ease-in-out`}
          onClick={() => handleTabChange('ongoing')}
        >
          Ongoing Trips
        </button>
        <button
          className={`px-4 py-2 rounded-lg focus:outline-none ${
            activeTab === 'completed'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-gray-800 border border-gray-300'
          } transition duration-300 ease-in-out`}
          onClick={() => handleTabChange('completed')}
        >
          Completed Trips
        </button>
        <button
          className={`px-4 py-2 rounded-lg focus:outline-none ${
            activeTab === 'planning'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-gray-800 border border-gray-300'
          } transition duration-300 ease-in-out`}
          onClick={() => handleTabChange('planning')}
        >
          Trip Planning
        </button>
        <button
          className={`px-4 py-2 rounded-lg focus:outline-none ${
            activeTab === 'create'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'bg-white text-gray-800 border border-gray-300'
          } transition duration-300 ease-in-out`}
          onClick={() => handleTabChange('create')}
        >
          Create New Trip
        </button>
      </div>

      {/* Content for each tab */}
      <div className="">
        {activeTab === 'ongoing' && (
          <div>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {ongoingTrips.map((trip, index) => (
                <li key={index} className="p-4 border rounded-lg shadow-sm">
                  <div className="text-lg text-gray-700 mb-2">
                    <strong>Route:</strong> {trip.route}
                  </div>
                  <div className="text-gray-600">
                    <strong>Driver:</strong> {trip.driver}
                  </div>
                  <div className="text-gray-600">
                    <strong>Truck:</strong> {trip.truck}
                  </div>
                  <div className="text-gray-600">
                    <strong>ETA:</strong> {trip.ETA}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'completed' && (
          <div>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {completedTrips.map((trip, index) => (
                <li key={index} className="p-4 border rounded-lg shadow-sm">
                  <div className="text-lg text-gray-700 mb-2">
                    <strong>Route:</strong> {trip.route}
                  </div>
                  <div className="text-gray-600">
                    <strong>Delivery Time:</strong> {trip.deliveryTime}
                  </div>
                  <div className="text-gray-600">
                    <strong>Earnings:</strong> {trip.earnings}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'planning' && (
          <div>
            <p className="text-gray-600">
              Plan and optimize routes for future trips. Integrate mapping and route optimization
              tools here.
            </p>
            <p className="text-gray-600 mt-4">
              This section can be used to plan and optimize routes for future trips. You can
              integrate mapping and route optimization tools here.
            </p>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Trip Planning</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white border p-4 mb-4 shadow-sm rounded">
                  <h3 className="text-md font-semibold mb-2">Truck: Truck 1</h3>
                  <p>
                    <strong>Route:</strong> City A - City B
                  </p>
                  <p>
                    <strong>ETA:</strong> 2 hrs
                  </p>
                </div>
                <div className="bg-white border p-4 mb-4 shadow-sm rounded">
                  <h3 className="text-md font-semibold mb-2">Truck: Truck 2</h3>
                  <p>
                    <strong>Route:</strong> City C - City D
                  </p>
                  <p>
                    <strong>ETA:</strong> 3 hrs
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div>
            <form className='max-w-2xl'>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2 font-semibold">Choose Truck</label>
                <select className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500">
                  <option>Truck 1</option>
                  <option>Truck 2</option>
                  <option>Truck 3</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2 font-semibold">Choose Driver</label>
                <select className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500">
                  <option>John Doe</option>
                  <option>Jane Doe</option>
                  <option>Driver 3</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-2 font-semibold">Destination</label>
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter destination"
                />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">
                Create Trip
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
