'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

interface Good {
    id: number;
    type: string;
    weight: string;
    destination: string;
}

export default function GoodRecord() {
    const [goods, setGoods] = useState<Good[]>([
        { id: 1, type: 'Electronics', weight: '200kg', destination: 'New York' },
        { id: 2, type: 'Furniture', weight: '500kg', destination: 'Los Angeles' },
    ]);

    const [newGood, setNewGood] = useState<Good>({ id: 0, type: '', weight: '', destination: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    // DataTable columns configuration
    const columns: TableColumn<Good>[] = [
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'Weight',
            selector: row => row.weight,
            sortable: true,
        },
        {
            name: 'Destination',
            selector: row => row.destination,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <button
                        className="mr-2 text-blue-500"
                        onClick={() => editGood(row.id)}
                    >
                        Edit
                    </button>
                    <button
                        className="text-red-500"
                        onClick={() => deleteGood(row.id)}
                    >
                        Delete
                    </button>
                </>
            ),
        },
    ];

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewGood({ ...newGood, [e.target.name]: e.target.value });
    };

    const addGood = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (isEditing && editId !== null) {
            setGoods(goods.map(good => (good.id === editId ? { ...newGood, id: editId } : good)));
            setIsEditing(false);
            setEditId(null);
        } else {
            setGoods([...goods, { ...newGood, id: goods.length + 1 }]);
        }
        setNewGood({ id: 0, type: '', weight: '', destination: '' });
    };

    const editGood = (id: number): void => {
        const goodToEdit = goods.find(good => good.id === id);
        if (goodToEdit) {
            setNewGood(goodToEdit);
            setIsEditing(true);
            setEditId(id);
        }
    };

    const deleteGood = (id: number): void => {
        setGoods(goods.filter(good => good.id !== id));
    };

    return (
        <>
            <div className="">
                <h1 className="text-3xl font-bold mb-6">Goods Record</h1>

                {/* Add/Edit Goods Record */}
                <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit' : 'Add'} Goods Record</h2>
                <form onSubmit={addGood} className="mb-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="type">
                            Type
                        </label>
                        <input
                            type="text"
                            name="type"
                            id="type"
                            value={newGood.type}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter type"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="weight">
                            Weight
                        </label>
                        <input
                            type="text"
                            name="weight"
                            id="weight"
                            value={newGood.weight}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter weight"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="destination">
                            Destination
                        </label>
                        <input
                            type="text"
                            name="destination"
                            id="destination"
                            value={newGood.destination}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter destination"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
                    >
                        {isEditing ? 'Update' : 'Add'} Goods
                    </button>
                </form>

                {/* List of Goods using DataTable */}
                <h2 className="text-2xl font-semibold mb-4">List of Goods</h2>
                <DataTable
                    columns={columns}
                    data={goods}
                    pagination
                    highlightOnHover
                />

                {/* Goods History */}
                <h2 className="text-2xl font-semibold mb-4">Goods History</h2>
                <p className="text-gray-600">
                    This section will track past deliveries and details of goods.
                    {/* You can integrate history tracking here */}
                </p>
            </div>
        </>
    );
}
