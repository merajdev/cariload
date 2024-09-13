'use client';

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { DriverForm } from './DriverForm';

export const DriverManagement: React.FC = () => {
  const [drivers, setDrivers] = useState<any[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<any | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      try{
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



      }catch(err){
        console.error(err);
      }
    };

    fetchDrivers();
  }, []);

  const handleSaveDriver = async (newDriver: any) => {
    const driverId = selectedDriver?._id;
    if (selectedDriver) {
      await axios.put(`/api/drivers/${driverId}`, newDriver);
    } else {
      try{
        const authData = localStorage.getItem('authData');
        if (!authData) throw new Error("Authentication data not found");

        const { token } = JSON.parse(authData);
        if (!token) throw new Error("Token not found");

        const response = await axios.post('/api/drivers', newDriver, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setShowModal(false);
        }else{
          throw new Error(response.data.error);
        }

      }catch(err){
        console.error(err);
      }
    }
    setShowModal(false);
    setSelectedDriver(null);
    // const response = await axios.get('/api/drivers');
    // setDrivers(response.data);
  };

  const handleDeleteDriver = async (id: string) => {
    const driverId = id;
    await axios.delete(`/api/drivers?id=${driverId}`);
    const response = await axios.get('/api/drivers');
    setDrivers(response.data);
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
            Edit
          </button>
          <button
            onClick={() => handleDeleteDriver(row._id)}
            className="bg-red-100 hover:bg-red-200 text-red-500 p-2 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Drivers Management</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded mb-4"
        >
          Add Driver
        </button>
      </div>
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
    </div>
  );
};
