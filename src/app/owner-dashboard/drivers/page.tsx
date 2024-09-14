'use client';

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { DriverForm } from './DriverForm';
import { FaEdit, FaPlusCircle, FaTrash } from 'react-icons/fa';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const DriverManagement: React.FC = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<any | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        const authData = localStorage.getItem('authData');
        if (!authData) throw new Error("Authentication data not found");

        const { token } = JSON.parse(authData);

        if (!token) throw new Error("Token not found");

        const response = await axios.get('/api/drivers', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.data.success) throw new Error(response.data.error);

        const drivers = response.data.drivers;
        setDrivers(drivers);
        console.log(drivers);
      } catch (err) {
        console.error(err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleSaveDriver = async (newDriver: any) => {
    const driverId = selectedDriver?._id;
    try {
      setLoading(true);

      const authData = localStorage.getItem('authData');
      if (!authData) throw new Error("Authentication data not found");

      const { token } = JSON.parse(authData);
      if (!token) throw new Error("Token not found");

      const endpoint = selectedDriver ? `/api/drivers/${driverId}` : '/api/drivers';
      const method = selectedDriver ? 'put' : 'post';

      const response = await axios[method](endpoint, newDriver, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setShowModal(false);
        setSelectedDriver(null);
        const responseGet = await axios.get('/api/drivers', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setDrivers(responseGet.data.drivers);
      }
      else {
        throw new Error(response.data.error);
      }

    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        toast.error(err.message);
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDriver = async (id: string) => {
    const driverId = id;
    try {
      const authData = localStorage.getItem('authData');
      if (!authData) throw new Error("Authentication data not found");

      const { token } = JSON.parse(authData);
      if (!token) throw new Error("Token not found");

      const response = await axios.delete(`/api/drivers/${driverId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.data.success) throw new Error(response.data.error);

      const newDrivers = drivers.filter((driver) => driver._id !== driverId);
      setDrivers(newDrivers);

    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  const columns = [
    { name: 'Name', selector: (row: any) => row.name },
    { name: 'Phone', selector: (row: any) => row.contact.phone },
    { name: 'Email', selector: (row: any) => row.contact.email },
    { name: 'Status', selector: (row: any) => row.status },
    { name: 'Assigned Truck', selector: (row: any) => row.assignedTruck },
    {
      name: 'Actions',
      cell: (row: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedDriver(row);
              setShowModal(true);
            }}
            className="bg-blue-100 hover:bg-blue-200 text-blue-500 p-2 rounded"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => {
              setSelectedDriver(row);
              setShowRemoveModal(true);
            }}
            className="bg-red-100 hover:bg-red-200 text-red-500 p-2 rounded"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div className='min-h-[92vh] w-full flex items-center justify-center'>
      <Spinner size="w-12 h-12" color="#3498db" />
    </div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Drivers Management</h2>

        <button
          onClick={() => {
            setSelectedDriver(null);
            setShowModal(true);
          }}
          className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded mb-4 gap-2"
        >
          <FaPlusCircle /> Add Driver
        </button>
      </div>

      {
        error && <div className="text-red-500">{error}</div>
      }
      <DataTable
        columns={columns}
        data={drivers}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="300px"
      />
      {showModal && (
        <DriverForm
          driver={selectedDriver}
          onSave={handleSaveDriver}
          onClose={() => setShowModal(false)}
        />
      )}

      {
        showRemoveModal && (
          <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg flex flex-col gap-4">
              <h2 className="text-lg font-semibold">Are you sure you want to delete?</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    handleDeleteDriver(selectedDriver?._id);
                    setShowRemoveModal(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowRemoveModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};


export default DriverManagement;