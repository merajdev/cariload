import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

// Types for driver data
type Driver = {
  driverId: string;
  name: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  status: 'active' | 'on_leave' | 'inactive';
  assignedTruck: string | null;
  ratings: number;
  tripHistory: Array<{
    tripId: string;
    date: string;
  }>;
};

// Mock Data (replace this with API calls)
const initialDrivers: Driver[] = [
  {
    driverId: '231313',
    name: 'John Doe',
    contact: {
      phone: '1234567890',
      email: 'john@example.com',
      address: '123 Main St',
    },
    status: 'active',
    assignedTruck: 'Truck 1',
    ratings: 4.5,
    tripHistory: [
      { tripId: '231313', date: '2023-01-01' },
      { tripId: '231313', date: '2023-02-15' },
    ],
  },
  // More drivers...
];

const DriverManagement: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [viewingDriver, setViewingDriver] = useState<Driver | null>(null);

  // Open Add/Edit Modal
  const handleEditDriver = (driver: Driver | null = null) => {
    setSelectedDriver(driver);
    setIsEditing(driver !== null);
    setShowModal(true);
  };

  // Save Driver
  const handleSaveDriver = (newDriver: Driver) => {
    if (isEditing && selectedDriver) {
      setDrivers(drivers.map((d) => (d.driverId === selectedDriver.driverId ? newDriver : d)));
    } else {
      setDrivers([...drivers, { ...newDriver, driverId: '231313' }]);
    }
    setShowModal(false);
    setSelectedDriver(null);
  };

  // Open Driver Details Modal
  const handleViewDriver = (driver: Driver) => {
    setViewingDriver(driver);
  };

  // Table Columns
  const columns = [
    {
      name: 'Name',
      selector: (row: Driver) => row.name,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: (row: Driver) => row.contact.phone,
    },
    {
      name: 'Email',
      selector: (row: Driver) => row.contact.email,
    },
    {
      name: 'Status',
      selector: (row: Driver) => row.status,
    },
    {
      name: 'Assigned Truck',
      selector: (row: Driver) => row.assignedTruck || 'None',
    },
    {
      name: 'Ratings',
      selector: (row: Driver) => row.ratings,
    },
    {
      name: 'Actions',
      cell: (row: Driver) => (
        <div className="space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            onClick={() => handleEditDriver(row)}
          >
            <FaEdit />
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
            onClick={() => handleViewDriver(row)}
          >
            <FaEye />
          </button>
          <button
            onClick={() =>
            // Remove Driver
            {
              setSelectedDriver(row);
              setShowRemoveModal(true);
            }
            }
            className="text-white p-2 rounded bg-red-500 hover:bg-red-600"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-6">Driver Management</h1>

        <div className="mb-4">
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={() => handleEditDriver(null)}
          >
            Add Driver
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={drivers}
        pagination
        highlightOnHover
        className="mb-4"
      />

      {/* Add/Edit Driver Modal */}
      {showModal && (
        <DriverForm
          driver={selectedDriver}
          onSave={handleSaveDriver}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* View Driver Details Modal */}
      {viewingDriver && (
        <DriverDetailModal
          driver={viewingDriver}
          onClose={() => setViewingDriver(null)}
        />
      )}

      {/* Remove Driver Confirmation Modal */}
      {showRemoveModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white mx-4 p-3 md:p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Remove Driver</h2>
            <p>Are you sure you want to remove this driver?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowRemoveModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  setDrivers(drivers.filter((d) => d.driverId !== selectedDriver?.driverId));
                  setShowRemoveModal(false);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal Component for Add/Edit Driver
type DriverFormProps = {
  driver: Driver | null;
  onSave: (driver: Driver) => void;
  onClose: () => void;
};

const DriverForm: React.FC<DriverFormProps> = ({ driver, onSave, onClose }) => {
  const [formData, setFormData] = useState<Driver>(
    driver || {
      driverId: '',
      name: '',
      contact: {
        phone: '',
        email: '',
        address: '',
      },
      status: 'active',
      assignedTruck: null,
      ratings: 0,
      tripHistory: [],
    }
  );

  // Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Update form values
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white mx-3 p-3 md:p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{driver ? 'Edit Driver' : 'Add Driver'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.contact.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.contact.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal Component for Viewing Driver Details
type DriverDetailModalProps = {
  driver: Driver;
  onClose: () => void;
};

const DriverDetailModal: React.FC<DriverDetailModalProps> = ({ driver, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white mx-4 p-3 md:p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Driver Details</h2>
        <div>
          <p><strong>Name:</strong> {driver.name}</p>
          <p><strong>Phone:</strong> {driver.contact.phone}</p>
          <p><strong>Email:</strong> {driver.contact.email}</p>
          <p><strong>Status:</strong> {driver.status}</p>
          <p><strong>Assigned Truck:</strong> {driver.assignedTruck || 'None'}</p>
          <p><strong>Ratings:</strong> {driver.ratings}</p>
          <p><strong>Address:</strong> {driver.contact.address}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverManagement;
