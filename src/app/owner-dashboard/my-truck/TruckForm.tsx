'use client';

import { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Spinner from '@/components/Spinner';

interface Truck {
    id?: number;
    driverId?: string;
    truckId?: string;
    license?: string;
    model?: string;
    capacity?: number;
    status?: 'available' | 'on-trip' | 'under-maintenance';
}

interface TruckFormProps {
    truck?: Truck | null;
    onCancel: () => void;
}

export const TruckForm = ({ truck, onCancel }: TruckFormProps) => {
    const [formData, setFormData] = useState<Truck>({
        driverId: '',
        truckId: '',
        license: '',
        model: '',
        capacity: 0,
        status: 'available',
        ...truck,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const authData = localStorage.getItem('authData');
            if (!authData) throw new Error("Authentication data not found");
    
            const { token } = JSON.parse(authData);
            if (!token) throw new Error("Token not found");
    
            const truckId = formData.id;
    
            // Use appropriate API endpoints for creating/updating trucks
            const endpoint = truckId ? `/api/truck/${truckId}` : '/api/truck';
            const method = truckId ? 'put' : 'post';
    
            const response = await axios[method](endpoint, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.data.success) {
                // Handle success, possibly call a parent method to refresh trucks list
                onCancel(); // Close the form on success
            } else {
                throw new Error('Failed to save truck');
            }
    
        } catch (error) {
            console.error(error);
            // Handle error (you can also set an error state to display feedback)
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="fixed z-20 inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-3 md:p-6 rounded shadow-lg w-full mx-2 md:w-1/2">
                <h2 className="text-xl font-semibold mb-4">{formData.id ? 'Edit Truck' : 'Add Truck'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Driver Id:</label>
                        <input
                            type="text"
                            name="driverId"
                            value={formData.driverId || ''}
                            onChange={handleChange}
                            className="border rounded w-full px-3 py-2 mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Truck Id:</label>
                        <input
                            type="text"
                            name="truckId"
                            value={formData.truckId || ''}
                            onChange={handleChange}
                            className="border rounded w-full px-3 py-2 mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Registration Number:</label>
                        <input
                            type="text"
                            name="license"
                            value={formData.license || ''}
                            onChange={handleChange}
                            className="border rounded w-full px-3 py-2 mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Model:</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model || ''}
                            onChange={handleChange}
                            className="border rounded w-full px-3 py-2 mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Capacity:</label>
                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity || 0}
                            onChange={handleChange}
                            className="border rounded w-full px-3 py-2 mt-1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status:</label>
                        <select
                            name="status"
                            value={formData.status || 'available'}
                            onChange={handleChange}
                            className="border rounded w-full px-3 py-2 mt-1"
                            required
                        >
                            <option value="available">Available</option>
                            <option value="on-trip">On Trip</option>
                            <option value="under-maintenance">Under Maintenance</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-red-500 text-white py-2 px-4 rounded flex items-center gap-2"
                        >
                            <FaTimes /> Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded w-24 flex items-center justify-center gap-2"
                        >
                            {
                                loading
                                    ? <Spinner size="w-6 h-6" color="#ffffff" />
                                    : 
                                    <>
                                        <FaCheck /> Save
                                    </>

                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TruckForm;
