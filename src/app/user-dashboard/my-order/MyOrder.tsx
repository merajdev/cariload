'use client';

import Spinner from '@/components/Spinner';
import React, { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';

interface Order {
  id: string;
  status: string;
  size: string;
  weight: string;
  date: string;
}

// Subheader component for filtering
const SubHeaderComponent: React.FC<{
  filterText: string;
  onFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onStatusFilter: (status: string) => void;
  activeStatus: string;
}> = ({ onStatusFilter, activeStatus }) => (
  <div className='min-w-lg overflow-x-hidden flex justify-between md:w-full mb-4'>
    <div className="flex gap-1 md:gap-2">
      <button
        type="button"
        className={`px-2 py-0.5 w-max text-xs md:text-sm rounded-full border-2 border-neutral-800 ${activeStatus === '' ? 'bg-neutral-800 text-white' : 'text-neutral-800'} hover:bg-neutral-800 hover:text-white`}
        onClick={() => onStatusFilter('')}
      >
        All orders
      </button>
      <button
        type="button"
        className={`px-2 py-0.5 w-max text-xs md:text-sm rounded-full border-2 border-red-500 ${activeStatus === 'pending' ? 'bg-red-500 text-white' : 'text-red-500'} hover:bg-red-500 hover:text-white`}
        onClick={() => onStatusFilter('pending')}
      >
        Pending
      </button>
      <button
        type="button"
        className={`px-2 py-0.5 w-max text-xs md:text-sm rounded-full border-2 border-blue-500 ${activeStatus === 'shipped' ? 'bg-blue-500 text-white' : 'text-blue-500'} hover:bg-blue-500 hover:text-white`}
        onClick={() => onStatusFilter('shipped')}
      >
        Shipped
      </button>
      <button
        type="button"
        className={`px-2 py-0.5 w-max text-xs md:text-sm rounded-full border-2 border-yellow-500 ${activeStatus === 'delivered' ? 'bg-yellow-500 text-white' : 'text-yellow-500'} hover:bg-yellow-500 hover:text-white`}
        onClick={() => onStatusFilter('delivered')}
      >
        Delivered
      </button>
    </div>
  </div>
);


export default function MyOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const ordersData = result.orders; // Accessing the orders array

        // Check if data is an array
        if (!Array.isArray(ordersData)) {
          throw new Error('Expected orders to be an array');
        }

        // Transform the fetched data to match the Order interface
        const transformedOrders: Order[] = ordersData.map((order: any) => ({
          id: order._id,
          status: order.status || 'pending',
          size: order.packageDetails.size || 'unknown', // Adjust default value as needed
          weight: order.packageDetails.weight || 'unknown', // Adjust default value as needed
          date: new Date().toISOString().split('T')[0], // Default date or adjust as needed
        }));

        setOrders(transformedOrders);
      } catch (error: any) {
        setError(error.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const columns = useMemo(
    () => [
      {
        name: 'Order ID',
        selector: (row: Order) => row.id,
        sortable: true,
      },
      {
        name: 'Status',
        selector: (row: Order) => row.status,
        sortable: true,
      },
      {
        name: 'Size',
        selector: (row: Order) => row.size,
        sortable: true,
      },
      {
        name: 'Weight',
        selector: (row: Order) => row.weight,
        sortable: true,
      },
      {
        name: 'Date',
        selector: (row: Order) => row.date,
        sortable: true,
      },
    ],
    []
  );

  const filteredItems = orders.filter(
    item => (statusFilter === '' || item.status.toLowerCase() === statusFilter.toLowerCase()) &&
      (item.status.toLowerCase().includes(filterText.toLowerCase()))
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText('');
    }
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setResetPaginationToggle(!resetPaginationToggle);
  };

  if (loading) return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <Spinner size="w-12 h-12" color="#3498db" />
    </div>
  );
  if (error) return <p>Error: {error}</p>;

  return (
    <DataTable
      title="My Orders"
      columns={columns}
      data={filteredItems}
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      subHeader
      subHeaderComponent={
        <SubHeaderComponent
          filterText={filterText}
          onFilter={e => setFilterText(e.target.value)}
          onClear={handleClear}
          onStatusFilter={handleStatusFilter}
          activeStatus={statusFilter}
        />
      }
      persistTableHead
    />
  );
}