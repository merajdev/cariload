import React, { useState } from 'react';

interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  contact: string;
}

export default function SavedAddress() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Address>({
    id: Date.now(),
    street: '',
    city: '',
    state: '',
    postalCode: '',
    contact: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const addAddress = () => {
    setAddresses([...addresses, newAddress]);
    setNewAddress({
      id: Date.now(),
      street: '',
      city: '',
      state: '',
      postalCode: '',
      contact: '',
    });
  };

  const deleteAddress = (id: number) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Manage Addresses */}
        <h2 className="text-xl font-semibold mb-4">Manage Addresses</h2>
        {addresses.length > 0 ? (
          <ul className="mb-6">
            {addresses.map(address => (
              <li key={address.id} className="mb-4 flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                <div>
                  <p><strong>Street:</strong> {address.street}</p>
                  <p><strong>City:</strong> {address.city}</p>
                  <p><strong>State:</strong> {address.state}</p>
                  <p><strong>Postal Code:</strong> {address.postalCode}</p>
                  <p><strong>Contact:</strong> {address.contact}</p>
                </div>
                <button
                  onClick={() => deleteAddress(address.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No saved addresses found. Add a new address below.</p>
        )}

        {/* Add New Address Form */}
        <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addAddress();
          }}
          className="mb-6"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={newAddress.street}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={newAddress.city}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={newAddress.state}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={newAddress.postalCode}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Information"
              value={newAddress.contact}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
}
