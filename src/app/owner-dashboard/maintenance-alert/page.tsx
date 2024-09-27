'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

// Interfaces for different records
interface MaintenanceLog {
    id: number;
    truck: string;
    description: string;
    date: string;
}

interface Alert {
    id: number;
    type: string;
    truck: string;
    dueDate: string;
}

interface MaintenanceRequest {
    id: number;
    truck: string;
    description: string;
}

export default function MaintenanceAlert() {
    // Maintenance Logs data
    const [logs, setLogs] = useState<MaintenanceLog[]>([
        { id: 1, truck: 'Truck A', description: 'Oil change', date: '2024-08-01' },
        { id: 2, truck: 'Truck B', description: 'Tire replacement', date: '2024-08-10' },
    ]);

    // Upcoming Alerts data
    const [alerts, setAlerts] = useState<Alert[]>([
        { id: 1, type: 'Maintenance', truck: 'Truck C', dueDate: '2024-09-10' },
        { id: 2, type: 'Insurance Renewal', truck: 'Truck A', dueDate: '2024-09-15' },
    ]);

    // Maintenance Request form state
    const [newRequest, setNewRequest] = useState<MaintenanceRequest>({ id: 0, truck: '', description: '' });
    const [requests, setRequests] = useState<MaintenanceRequest[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
    };

    const addMaintenanceRequest = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setRequests([...requests, { ...newRequest, id: requests.length + 1 }]);
        setNewRequest({ id: 0, truck: '', description: '' });
    };

    // Columns for Maintenance Logs table
    const logColumns: TableColumn<MaintenanceLog>[] = [
        { name: 'Truck', selector: row => row.truck, sortable: true },
        { name: 'Description', selector: row => row.description, sortable: true },
        { name: 'Date', selector: row => row.date, sortable: true },
    ];

    // Columns for Upcoming Alerts table
    const alertColumns: TableColumn<Alert>[] = [
        { name: 'Type', selector: row => row.type, sortable: true },
        { name: 'Truck', selector: row => row.truck, sortable: true },
        { name: 'Due Date', selector: row => row.dueDate, sortable: true },
    ];

    return (
        <>
            <div className="">
                <h1 className="text-3xl font-bold mb-6">Maintenance & Alerts</h1>

                {/* Maintenance Logs */}
                <h2 className="text-2xl font-semibold mb-4">Maintenance Logs</h2>
                <DataTable
                    columns={logColumns}
                    data={logs}
                    pagination
                    highlightOnHover
                />

                {/* Upcoming Alerts */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Upcoming Alerts</h2>
                <DataTable
                    columns={alertColumns}
                    data={alerts}
                    pagination
                    highlightOnHover
                />

                {/* Maintenance Requests Form */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Maintenance Requests</h2>
                <form onSubmit={addMaintenanceRequest} className="mb-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="truck">
                            Truck
                        </label>
                        <input
                            type="text"
                            name="truck"
                            id="truck"
                            value={newRequest.truck}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter truck name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            value={newRequest.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter maintenance description"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                    >
                        Add Maintenance Request
                    </button>
                </form>

                {/* List of Maintenance Requests */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Submitted Maintenance Requests</h2>
                <ul className="list-disc pl-6">
                    {requests.map(request => (
                        <li key={request.id}>
                            {request.truck}: {request.description}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
