import React, { useState } from 'react';
import axios from 'axios';

interface PackageDetails {
  size: string;
  weight: string;
  type: string;
  instructions: string;
}

const NewOrder: React.FC = () => {
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [packageDetails, setPackageDetails] = useState<PackageDetails>({
    size: '',
    weight: '',
    type: '',
    instructions: '',
  });
  const [truckOption, setTruckOption] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const handleReviewOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Validate required fields before showing the summary
    if (!pickupAddress || !shippingAddress || !packageDetails.size || !truckOption || !paymentMethod) {
      setError('Please fill out all required fields.');
      return;
    }

    setError('');
    setShowSummary(true);
  };

  const handlePlaceOrder = async () => {
    try {
      const authData = localStorage.getItem('authData');

      if (!authData) {
        setError('No authentication data found. Please log in.');
        return;
      }

      const parsedAuthData = JSON.parse(authData);
      const { token } = parsedAuthData;

      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const orderData = {
        pickupAddress,
        shippingAddress,
        packageDetails,
        truckOption,
        paymentMethod,
      };

      // Simulate an API call
      const response = await axios.post('/api/orders', orderData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Order placed successfully!');
        // Reset form after submission
        setPickupAddress('');
        setShippingAddress('');
        setPackageDetails({ size: '', weight: '', type: '', instructions: '' });
        setTruckOption('');
        setPaymentMethod('');
        setShowSummary(false);
      } else {
        setError('Failed to place the order. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Order</h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleReviewOrder}>
          {/* Pickup Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className="w-full rounded-md border-2 p-2 border-neutral-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter or select a saved pickup address"
            />
          </div>

          {/* Shipping Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shipping Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full rounded-md border-2 p-2 border-neutral-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter or select a saved shipping address"
            />
          </div>

          {/* Package Details */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Package Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={packageDetails.size}
                  onChange={(e) => setPackageDetails({ ...packageDetails, size: e.target.value })}
                  className="w-full rounded-md border-2 p-2 border-neutral-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter package size"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={packageDetails.weight}
                  onChange={(e) => setPackageDetails({ ...packageDetails, weight: e.target.value })}
                  className="w-full rounded-md border-2 p-2 border-neutral-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter package weight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={packageDetails.type}
                  onChange={(e) => setPackageDetails({ ...packageDetails, type: e.target.value })}
                  className="w-full rounded-md border-2 p-2 border-neutral-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter package type"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Instructions
                </label>
                <input
                  type="text"
                  value={packageDetails.instructions}
                  onChange={(e) => setPackageDetails({ ...packageDetails, instructions: e.target.value })}
                  className="w-full rounded-md border-2 p-2 border-neutral-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter any special instructions"
                />
              </div>
            </div>
          </div>

          {/* Truck Option */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Truck Option <span className="text-red-500">*</span>
            </label>
            <select
              value={truckOption}
              onChange={(e) => setTruckOption(e.target.value)}
              className="w-full rounded-md border-2 p-2 border-neutral-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a truck option</option>
              <option value="small">Small Truck</option>
              <option value="medium">Medium Truck</option>
              <option value="large">Large Truck</option>
            </select>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full rounded-md border-2 p-2 border-neutral-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a payment method</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Review Order Button */}
          {!showSummary && (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Review Order
            </button>
          )}
        </form>

        {/* Order Summary */}
        {showSummary && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <p><strong>Pickup Address:</strong> {pickupAddress}</p>
            <p><strong>Shipping Address:</strong> {shippingAddress}</p>
            <p><strong>Package Size:</strong> {packageDetails.size}</p>
            <p><strong>Package Weight:</strong> {packageDetails.weight}</p>
            <p><strong>Package Type:</strong> {packageDetails.type}</p>
            <p><strong>Special Instructions:</strong> {packageDetails.instructions}</p>
            <p><strong>Truck Option:</strong> {truckOption}</p>
            <p><strong>Payment Method:</strong> {paymentMethod}</p>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition mt-4"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewOrder;
