'use client';

import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaPlusCircle, FaEdit, FaTools, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { MaintenanceForm } from './MaintenanceForm';
import { TruckForm } from './TruckForm';
import Spinner from '@/components/Spinner';
import axios from 'axios';
import { FaX } from 'react-icons/fa6';

// Lazy load the Map component to avoid server-side rendering issues
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

interface Truck {
  id: number;
  driverId: string;
  truckId: string;
  license: string;
  model: string;
  capacity: number;
  status: 'available' | 'on-trip' | 'under-maintenance';
  maintenance?: {
    lastMaintenance: Date;
    nextMaintenance: Date;
    recentRepairs?: string;
  };
  latitude?: number;
  longitude?: number;
}

const trucksData: Truck[] = [];

const TruckManagement = () => {
  const [trucks, setTrucks] = useState<Truck[]>(trucksData);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [maintenanceTruckId, setMaintenanceTruckId] = useState<number | null>(null);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [mapLocation, setMapLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrucks() {
      try {
        const authData = localStorage.getItem('authData');

        if (!authData) {
          setError("An error occurred. Please try again later");
          return;
        }

        const parsedAuthData = JSON.parse(authData);
        const { token } = parsedAuthData;

        if (!token) {
          setError("An error occurred. Please try again later");
          return;
        }

        const response = await fetch('/api/truck', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const trucksData = result.trucks;

        if (!Array.isArray(trucksData)) {
          throw new Error('Expected trucks to be an array');
        }

        const transformedTrucks: Truck[] = trucksData.map((truck: any) => ({
          id: truck._id,
          driverId: truck.driverId,
          truckId: truck.truckId,
          license: truck.license,
          model: truck.model,
          capacity: truck.capacity,
          status: truck.status,
          maintenance: truck.maintenance,
          latitude: truck.latitude,
          longitude: truck.longitude,
        }));
        console.log(transformedTrucks[0].truckId);
        setTrucks(transformedTrucks);

      } catch (error) {
        console.error(error);
        setError("An error occurred. Please try again later");
      } finally {
        setLoading(false);
      }

    }

    fetchTrucks();

  }, []);




  const handleRemoveTruck = async (truckId: number) => {
    try {
      const authData = localStorage.getItem('authData');

      if (!authData) {
        setError("An error occurred. Please try again later");
        return;
      }

      const parsedAuthData = JSON.parse(authData);
      const { token } = parsedAuthData;

      if (!token) {
        setError("An error occurred. Please try again later");
        return;
      }

      const response = await axios.delete(`/api/truck/${truckId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.data.success) {
        throw new Error('Failed to remove truck');
      }

      setTrucks(trucks.filter(truck => truck.id !== truckId));
      setShowRemoveModal(false);

    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later");
    }
  };

  const handleEditTruck = (truck: Truck) => {
    setSelectedTruck(truck);
    setShowForm(true);
  };

  const handleMaintenanceSchedule = (maintenance: {
    lastMaintenance: Date;
    nextMaintenance: Date;
    recentRepairs?: string;
  }) => {
    if (maintenanceTruckId !== null) {
      setTrucks(trucks.map(t => t.id === maintenanceTruckId ? {
        ...t,
        maintenance,
      } : t));
    }
    setShowMaintenanceForm(false);
    setMaintenanceTruckId(null);
  };

  const handleMapOpen = (latitude: number, longitude: number) => {
    setMapLocation({ latitude, longitude });
    setShowMapModal(true);
  };


  const columns = [
    {
      name: 'Truck Id',
      selector: (row: Truck) => row.truckId,
      sortable: true
    },
    {
      name: 'Driver Id',
      selector: (row: Truck) => row.driverId,
      sortable: true
    },
    {
      name: 'Registration Number',
      selector: (row: Truck) => row.license,
      sortable: true
    },
    {
      name: 'Model',
      selector: (row: Truck) => row.model,
      sortable: true
    },
    {
      name: 'Capacity (tons)',
      selector: (row: Truck) => row.capacity,
      sortable: true
    },
    {
      name: 'Status',
      cell: (row: Truck) => (
        <span
          className={`px-2 py-0.5 rounded-full border ${
            row.status === 'available'
              ? 'border-green-500 text-green-500'
              : row.status === 'on-trip'
                ? 'border-blue-500 text-blue-500'
                : 'border-red-500 text-red-500'
          }`}
        >
          {row.status}
        </span>
      ),
      selector: (row: Truck) => row.status,
      sortable: true
    },
    {
      name: 'Actions',
      cell: (row: Truck) => (
        <>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleEditTruck(row);
                setShowForm(true);
              }}
              className="text-blue-500 p-2 rounded bg-blue-100 hover:bg-blue-200"
            >
              <FaEdit />
            </button>

            {/* <button
              onClick={() => {
                setMaintenanceTruckId(row.id);
                setShowMaintenanceForm(true);
              }}
              className="text-white p-2 rounded bg-yellow-500 hover:bg-yellow-600"
            >
              <FaTools />
            </button> */}

            <button
              onClick={() => handleMapOpen(row.latitude || 0, row.longitude || 0)}
              className="text-green-500 p-2 rounded bg-green-100 hover:bg-green-200"
            >
              <FaMapMarkerAlt />
            </button>

            <button
              onClick={() => {
                setSelectedTruck(row);
                setShowRemoveModal(true);
              }}
              className="text-red-500 p-2 rounded bg-red-100 hover:bg-red-200"
            >
              <FaTrash />
            </button>
          </div>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <Spinner size="w-12 h-12" color="#3498db" />
      </div>
    );
  }

  return (
    <>

      <div className="">
        <div className="md:flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Truck Management</h2>
          <button
            onClick={() => {
              setSelectedTruck(null);  // Reset selectedTruck to null
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded mb-4"
          >
            <FaPlusCircle /> Add Truck
          </button>

        </div>

        <DataTable
          columns={columns}
          data={trucks}
          pagination
          highlightOnHover
        />

        {showForm && (
          <TruckForm
            truck={selectedTruck}
            // onSubmit={handleAddTruck}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showMaintenanceForm && maintenanceTruckId !== null && (
          <MaintenanceForm
            maintenance={
              trucks.find(t => t.id === maintenanceTruckId)?.maintenance || null
            }
            onSubmit={handleMaintenanceSchedule}
            onCancel={() => setShowMaintenanceForm(false)}
          />
        )}

        {showMapModal && mapLocation && (
          <div className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-3 md:p-6 rounded shadow-lg w-full mx-2">
              <h2 className="text-xl font-semibold mb-4">Truck Location</h2>
              <Map latitude={mapLocation.latitude} longitude={mapLocation.longitude} />
              <button
                onClick={() => setShowMapModal(false)}
                className="bg-red-500 text-white py-2 px-4 rounded mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {
          showRemoveModal && (
            <div className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-3 md:p-6 rounded shadow-lg w-96">
                <div className="flex justify-between mb-4">
                  <h2 className="text-xl font-semibold">Remove Truck</h2>
                  <button
                    onClick={() => setShowRemoveModal(false)}
                    className="bg-neutral-100 text-sm text-black hover:bg-neutral-200 p-2 rounded"
                  >
                    <FaX />
                  </button>
                </div>
                <p>Are you sure you want to remove this truck?</p>
                <div className="flex justify-end items-center gap-3 mt-4">
                  <button
                    onClick={() => {
                      handleRemoveTruck(selectedTruck?.id || 0);
                      setShowRemoveModal(false);
                    }}
                    className="bg-red-100 text-red-500 hover:bg-red-200 py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )
        }

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Maintenance Schedules</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4">
            {trucks
              .filter(truck => truck.maintenance)
              .map(truck => (
                <div key={truck.id} className="bg-white border p-4 mb-4 shadow-sm rounded">
                  <h3 className="text-md font-semibold mb-2">Truck: {truck.license}</h3>
                  <p><strong>Last Maintenance:</strong> {truck.maintenance?.lastMaintenance.toDateString()}</p>
                  <p><strong>Next Maintenance:</strong> {truck.maintenance?.nextMaintenance.toDateString()}</p>
                  <p><strong>Recent Repairs:</strong> {truck.maintenance?.recentRepairs || 'None'}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};



export default TruckManagement;
