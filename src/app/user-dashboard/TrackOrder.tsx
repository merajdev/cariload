import React, { useState, useEffect } from 'react';

export default function TrackOrder() {
  const [orderStatus, setOrderStatus] = useState('Order Placed');
  const [truckLocation, setTruckLocation] = useState({ lat: 0, lng: 0 });
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const driverPhoneNumber = '+917502461630'; // Example phone number

  // Simulate tracking data
  useEffect(() => {
    // Mock order status update
    const statusUpdates = [
      'Order Placed',
      'Picked Up',
      'In Transit',
      'Out for Delivery',
      'Delivered',
    ];

    let statusIndex = 0;
    const interval = setInterval(() => {
      if (statusIndex < statusUpdates.length) {
        setOrderStatus(statusUpdates[statusIndex]);
        statusIndex++;
      }
    }, 5000); // Update every 5 seconds

    // Mock truck location update
    const mockLocationUpdate = setInterval(() => {
      setTruckLocation({
        lat: truckLocation.lat + 0.001, // Example incremental update
        lng: truckLocation.lng + 0.001,
      });
      setEstimatedDelivery('15 mins'); // Example estimated delivery time
    }, 10000); // Update every 10 seconds

    return () => {
      clearInterval(interval);
      clearInterval(mockLocationUpdate);
    };
  }, [truckLocation.lat, truckLocation.lng]);

  const handleContactDriver = () => {
    window.location.href = `tel:${driverPhoneNumber}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-md">
        {/* Order Tracking Map */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Tracking</h2>
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-700 px-3 text-center">Map showing the truck&#39;s current location here</p>
            {/* Replace this placeholder with an actual map component, like Google Maps or Leaflet */}
          </div>
        </div>

        {/* Order Status Updates */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Status</h2>
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-lg"><strong>Current Status:</strong> {orderStatus}</p>
            <p className="text-lg"><strong>Estimated Delivery:</strong> {estimatedDelivery}</p>
          </div>
        </div>

        {/* Contact Driver */}
        <div className="mb-4">
          <button
            onClick={handleContactDriver}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Contact Driver
          </button>
        </div>
      </div>
    </div>
  );
}
