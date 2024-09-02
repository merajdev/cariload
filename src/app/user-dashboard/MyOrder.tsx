import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';

interface Order {
  id: string;
  status: string;
  items: number;
  total: number;
  date: string;
}

const orders: Order[] = [
  { id: '001', status: 'Active', items: 3, total: 150.0, date: '2024-08-01' },
  { id: '002', status: 'Shipped', items: 1, total: 50.0, date: '2024-08-02' },
  { id: '003', status: 'Delivered', items: 2, total: 120.0, date: '2024-08-03' },
  { id: '004', status: 'Canceled', items: 1, total: 30.0, date: '2024-08-04' },
];

export default function MyOrder() {
  const columns: Column<Order>[] = useMemo(
    () => [
      {
        Header: 'Order ID',
        accessor: 'id',
      },
      {
        Header: 'Status',
        accessor: (
          { status }: { status: string } // accessor function
        ) => (
          <span
            className={`px-2 py-1 text-xs font-semibold text-white bg-${
              status === 'Active'
                ? 'blue'
                : status === 'Shipped'
                ? 'green'
                : status === 'Delivered'
                ? 'gray'
                : 'red'
            }-500 rounded-full`}
          >
            {status}
          </span>
        ),
        id: 'status', // adding an id to the accessor function
      },
      {
        Header: 'Items',
        accessor: 'items',
      },
      {
        Header: 'Total Cost ($)',
        accessor: 'total',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: orders,
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className="border-b" key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className="p-4 text-left text-sm font-semibold text-gray-600"
                    key={column.id}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b hover:bg-gray-50" key={row.id}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()} className="p-4 text-sm text-gray-700" key={cell.column.id}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
