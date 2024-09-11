import Spinner from "@/components/Spinner";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface Truck {
    id: number;
    truckId: string;
    driverId: string;
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

export const TruckForm = ({ truck, onCancel }: {
    truck: Truck | null;
    // onSubmit: (truck: Truck) => void;
    onCancel: () => void;
}) => {
    const [truckId, setTruckId] = useState(truck?.truckId || '');
    const [driverId, setDriverId] = useState(truck?.driverId || '');
    const [license, setLicense] = useState(truck?.license || '');
    const [model, setModel] = useState(truck?.model || '');
    const [capacity, setCapacity] = useState(truck?.capacity || 0);
    const [status, setStatus] = useState(truck?.status || 'available');
    const [latitude, setLatitude] = useState(truck?.latitude || 0);
    const [longitude, setLongitude] = useState(truck?.longitude || 0);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);


    const handleSubmit = async () => {

        try {
            setLoading(true);
            if (!truckId || !license || !model || capacity <= 0) {
                setError("Please fill all required fields.");
                return;
            }

            const authData = localStorage.getItem('authData');

            if (!authData) {
                setError("An error occurred. Please try again later.");
                return;
            }

            const parsedAuthData = JSON.parse(authData);

            const { token } = parsedAuthData;

            if (!token) {
                setError("An error occurred. Please try again later.");
                return;
            }

            const truckData = {
                truckId,
                driverId,
                license,
                model,
                capacity,
                status,
                latitude,
                longitude,
            };

            const response = await axios.post('/api/truck', truckData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) {
                toast.success("Truck added successfully.", { position: 'top-center' });
                setTruckId('');
                setDriverId('');
                setLicense('');
                setModel('');
                setCapacity(0);
                setStatus('available');
                setLatitude(0);
                setLongitude(0);
            } else {
                setError("An error occurred. Please try again later.");
            }

        } catch (error) {
            toast.error("An error occurred. Please try again later.", { position: 'top-center' });
            setError("An error occurred. Please try again later.");
            console.error(error);
        }

        setLoading(false);
        onCancel();
    };

    return (
        <div className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white m-4 max-h-[90vh] overflow-y-scroll md:overflow-hidden p-3 md:p-6 rounded shadow-lg w-full md:w-6/12">
                <h2 className="text-xl font-semibold mb-4">{truck ? 'Edit Truck' : 'Add New Truck'}</h2>
                <form className="grid sm:grid-cols-2 gap-3">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Truck ID</label>  {/* Add Truck ID input */}
                        <input
                            type="text"
                            required
                            value={truckId}
                            onChange={(e) => setTruckId(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Driver ID</label>  {/* Add Truck ID input */}
                        <input
                            type="text"
                            required
                            value={driverId}
                            onChange={(e) => setDriverId(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">License</label>
                        <input
                            type="text"
                            required
                            value={license}
                            onChange={(e) => setLicense(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Model</label>
                        <input
                            type="text"
                            required
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Capacity (tons)</label>
                        <input
                            type="number"
                            required
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
                            required
                            value={latitude}
                            onChange={(e) => setLatitude(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Longitude</label>
                        <input
                            type="number"
                            required
                            value={longitude}
                            onChange={(e) => setLongitude(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </form>
                <div className="flex items-center gap-3">
                    <button
                        onClick={onCancel}
                        className="bg-red-500 text-white py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 w-24 text-white py-2 px-4 rounded text-center"
                    >
                        {loading ? <Spinner size="w-6 h-6" color="#ffffff" /> : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
};