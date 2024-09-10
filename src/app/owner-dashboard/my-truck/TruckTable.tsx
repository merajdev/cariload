import { useState } from "react";
import DataTable from "react-data-table-component"
import { FaEdit, FaMapMarkerAlt, FaTools, FaTrash } from "react-icons/fa";
import { TruckForm } from "./TruckForm";


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

const trucksData: Truck[] = [
    { id: 1, truckId: '123', driverId: '980', license: 'ABC-123', model: 'Volvo', capacity: 15, status: 'available', latitude: 40.7128, longitude: -74.0060 },
    { id: 2, truckId: '987', driverId: '980', license: 'XYZ-456', model: 'Ford', capacity: 12, status: 'on-trip', latitude: 34.0522, longitude: -118.2437 },
    { id: 3, truckId: '676', driverId: '980', license: 'LMN-789', model: 'Scania', capacity: 18, status: 'under-maintenance', latitude: 51.5074, longitude: -0.1278 },
];



export const TruckTable = () => {
    const [trucks, setTrucks] = useState<Truck[]>(trucksData);
    const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
    const [maintenanceTruckId, setMaintenanceTruckId] = useState<number | null>(null);
    const [showMapModal, setShowMapModal] = useState<boolean>(false);
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
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

    const handleMapOpen = (latitude: number, longitude: number) => {
        setMapLocation({ latitude, longitude });
        setShowMapModal(true);
    };


    const columns = [
        { name: 'Truck Id', selector: (row: Truck) => row.truckId, sortable: true },
        { name: 'Driver Id', selector: (row: Truck) => row.driverId, sortable: true },
        { name: 'License', selector: (row: Truck) => row.license, sortable: true },
        { name: 'Model', selector: (row: Truck) => row.model, sortable: true },
        { name: 'Capacity (tons)', selector: (row: Truck) => row.capacity, sortable: true },
        { name: 'Status', selector: (row: Truck) => row.status, sortable: true },
        {
            name: 'Actions',
            cell: (row: Truck) => (
                <>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                setSelectedTruck(row);
                                setShowForm(true);
                            }}
                            className="text-white p-2 rounded bg-blue-500 hover:bg-blue-600"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => {
                                setMaintenanceTruckId(row.id);
                                setShowMaintenanceForm(true);
                            }}
                            className="text-white p-2 rounded bg-yellow-500 hover:bg-yellow-600"
                        >
                            <FaTools />
                        </button>
                        <button
                            onClick={() => handleMapOpen(row.latitude || 0, row.longitude || 0)}
                            className="text-white p-2 rounded bg-green-500 hover:bg-green-600"
                        >
                            <FaMapMarkerAlt />
                        </button>

                        <button
                            onClick={() => {
                                setSelectedTruck(row);
                                setShowRemoveModal(true);
                            }}
                            className="text-white p-2 rounded bg-red-500 hover:bg-red-600"
                        >
                            <FaTrash />
                        </button>
                    </div>
                </>
            ),
        },
    ];

    return (
        <>
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
        </>
    )
}