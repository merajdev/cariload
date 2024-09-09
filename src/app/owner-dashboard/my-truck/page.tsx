'use client';

import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaPlusCircle, FaEdit, FaTools, FaMapMarkerAlt } from 'react-icons/fa';
import dynamic from 'next/dynamic';

// Lazy load the Map component to avoid server-side rendering issues
const Map = dynamic(() => import('@/components/Map'), { ssr: false });

interface Truck {
  id: number;
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

const trucksData: Truck[] = [
  { id: 1, license: 'ABC-123', model: 'Volvo', capacity: 15, status: 'available', latitude: 40.7128, longitude: -74.0060 },
  { id: 2, license: 'XYZ-456', model: 'Ford', capacity: 12, status: 'on-trip', latitude: 34.0522, longitude: -118.2437 },
  { id: 3, license: 'LMN-789', model: 'Scania', capacity: 18, status: 'under-maintenance', latitude: 51.5074, longitude: -0.1278 },
];

const TruckManagement = () => {
  const [trucks, setTrucks] = useState<Truck[]>(trucksData);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
  const [maintenanceTruckId, setMaintenanceTruckId] = useState<number | null>(null);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);
  const [mapLocation, setMapLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleAddOrEditTruck = (truck: Truck) => {
    if (selectedTruck) {
      setTrucks(trucks.map(t => (t.id === selectedTruck.id ? truck : t)));
    } else {
      setTrucks([...trucks, { ...truck, id: trucks.length + 1 }]);
    }
    setShowForm(false);
    setSelectedTruck(null);
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

  const TruckForm = ({ truck, onSubmit, onCancel }: {
    truck: Truck | null;
    onSubmit: (truck: Truck) => void;
    onCancel: () => void;
  }) => {
    const [license, setLicense] = useState(truck?.license || '');
    const [model, setModel] = useState(truck?.model || '');
    const [capacity, setCapacity] = useState(truck?.capacity || 0);
    const [status, setStatus] = useState(truck?.status || 'available');
    const [latitude, setLatitude] = useState(truck?.latitude || 0);
    const [longitude, setLongitude] = useState(truck?.longitude || 0);

    const handleSubmit = () => {
      if (!license || !model || capacity <= 0) return;

      onSubmit({
        id: truck?.id || 0,
        license,
        model,
        capacity,
        status,
        maintenance: truck?.maintenance || undefined,
        latitude,
        longitude,
      });
    };

    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">{truck ? 'Edit Truck' : 'Add New Truck'}</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">License</label>
              <input
                type="text"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Capacity (tons)</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'available' | 'on-trip' | 'under-maintenance')}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="available">Available</option>
                <option value="on-trip">On Trip</option>
                <option value="under-maintenance">Under Maintenance</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Latitude</label>
              <input
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Longitude</label>
              <input
                type="number"
                value={longitude}
                onChange={(e) => setLongitude(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </form>
          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MaintenanceForm = ({ truckId, maintenance, onSubmit, onCancel }: {
    truckId: number;
    maintenance: {
      lastMaintenance: Date;
      nextMaintenance: Date;
      recentRepairs?: string;
    } | null;
    onSubmit: (maintenance: {
      lastMaintenance: Date;
      nextMaintenance: Date;
      recentRepairs?: string;
    }) => void;
    onCancel: () => void;
  }) => {
    const [lastMaintenance, setLastMaintenance] = useState<string>(maintenance?.lastMaintenance.toISOString().split('T')[0] || '');
    const [nextMaintenance, setNextMaintenance] = useState<string>(maintenance?.nextMaintenance.toISOString().split('T')[0] || '');
    const [recentRepairs, setRecentRepairs] = useState<string>(maintenance?.recentRepairs || '');

    const handleSubmit = () => {
      if (!lastMaintenance || !nextMaintenance) return;

      onSubmit({
        lastMaintenance: new Date(lastMaintenance),
        nextMaintenance: new Date(nextMaintenance),
        recentRepairs,
      });
    };

    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Maintenance Schedule</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Last Maintenance</label>
              <input
                type="date"
                value={lastMaintenance}
                onChange={(e) => setLastMaintenance(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Next Maintenance</label>
              <input
                type="date"
                value={nextMaintenance}
                onChange={(e) => setNextMaintenance(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Recent Repairs</label>
              <textarea
                value={recentRepairs}
                onChange={(e) => setRecentRepairs(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </form>
          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const columns = [
    { name: 'License', selector: (row: Truck) => row.license, sortable: true },
    { name: 'Model', selector: (row: Truck) => row.model, sortable: true },
    { name: 'Capacity (tons)', selector: (row: Truck) => row.capacity, sortable: true },
    { name: 'Status', selector: (row: Truck) => row.status, sortable: true },
    {
      name: 'Actions',
      cell: (row: Truck) => (
        <>
          <button
            onClick={() => {
              setSelectedTruck(row);
              setShowForm(true);
            }}
            className="text-blue-500 mr-2"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => {
              setMaintenanceTruckId(row.id);
              setShowMaintenanceForm(true);
            }}
            className="text-green-500 mr-2"
          >
            <FaTools />
          </button>
          <button
            onClick={() => handleMapOpen(row.latitude || 0, row.longitude || 0)}
            className="text-red-500"
          >
            <FaMapMarkerAlt />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="p-6">
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-500 text-white py-2 px-4 rounded mb-4"
      >
        <FaPlusCircle /> Add Truck
      </button>
      
      <DataTable
        columns={columns}
        data={trucks}
        pagination
        highlightOnHover
      />

      {showForm && (
        <TruckForm
          truck={selectedTruck}
          onSubmit={handleAddOrEditTruck}
          onCancel={() => setShowForm(false)}
        />
      )}

      {showMaintenanceForm && maintenanceTruckId !== null && (
        <MaintenanceForm
          truckId={maintenanceTruckId}
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

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Maintenance Schedules</h2>
        {trucks
          .filter(truck => truck.maintenance)
          .map(truck => (
            <div key={truck.id} className="bg-white p-4 mb-4 shadow rounded">
              <h3 className="text-lg font-semibold mb-2">Truck {truck.license}</h3>
              <p><strong>Last Maintenance:</strong> {truck.maintenance?.lastMaintenance.toDateString()}</p>
              <p><strong>Next Maintenance:</strong> {truck.maintenance?.nextMaintenance.toDateString()}</p>
              <p><strong>Recent Repairs:</strong> {truck.maintenance?.recentRepairs || 'None'}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TruckManagement;
