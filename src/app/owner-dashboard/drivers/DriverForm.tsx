'use client';

import React, { useState } from 'react';

type DriverFormProps = {
  driver?: any;
  onSave: (driver: any) => void;
  onClose: () => void;
};

export const DriverForm: React.FC<DriverFormProps> = ({ driver, onSave, onClose }) => {
  const [formData, setFormData] = useState(driver || {
    driverId: '',
    name: '',
    assignedTruck: '',
    contact: {
      phone: '',
      email: '',
      address: '',
    },
    status: 'active',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name in formData) {
      // Handle direct property change
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (name.startsWith('contact.')) {
      // Handle nested contact fields
      const contactKey = name.split('.')[1];
      setFormData({
        ...formData,
        contact: {
          ...formData.contact,
          [contactKey]: value,
        },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed z-10 inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{driver ? 'Edit Driver' : 'Add Driver'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Driver ID</label>
            <input
              type="text"
              name="driverId"
              value={formData.driverId}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Assigned Truck(Truck ID)</label>
            <input
              type="text"
              name="assignedTruck"
              value={formData.assignedTruck}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="contact.phone"
              value={formData.contact.phone}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="contact.email"
              value={formData.contact.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="active">Active</option>
              <option value="on_leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
              Cancel
            </button>

            <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
