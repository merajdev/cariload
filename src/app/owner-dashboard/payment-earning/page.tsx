'use client';

import { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

// Interfaces for different records
interface EarningsOverview {
  totalEarnings: number;
  pendingPayments: number;
  completedTransactions: number;
}

interface Invoice {
  id: number;
  trip: string;
  date: string;
  amount: number;
  status: string;
}

interface PaymentHistory {
  id: number;
  trip: string;
  date: string;
  amount: number;
  status: string;
}

export default function PaymentEarning() {
  // Earnings Overview Data
  const earnings: EarningsOverview = {
    totalEarnings: 15000,
    pendingPayments: 2000,
    completedTransactions: 8,
  };

  // Invoices & Receipts Data
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 1, trip: 'Trip A', date: '2024-08-01', amount: 1500, status: 'Paid' },
    { id: 2, trip: 'Trip B', date: '2024-08-05', amount: 2000, status: 'Pending' },
  ]);

  // Payment History Data
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([
    { id: 1, trip: 'Trip A', date: '2024-08-01', amount: 1500, status: 'Completed' },
    { id: 2, trip: 'Trip C', date: '2024-08-10', amount: 3000, status: 'Completed' },
  ]);

  // Columns for Invoice table
  const invoiceColumns: TableColumn<Invoice>[] = [
    { name: 'Trip', selector: row => row.trip, sortable: true },
    { name: 'Date', selector: row => row.date, sortable: true },
    { name: 'Amount', selector: row => row.amount, sortable: true },
    { name: 'Status', selector: row => row.status, sortable: true },
  ];

  // Columns for Payment History table
  const paymentColumns: TableColumn<PaymentHistory>[] = [
    { name: 'Trip', selector: row => row.trip, sortable: true },
    { name: 'Date', selector: row => row.date, sortable: true },
    { name: 'Amount', selector: row => row.amount, sortable: true },
    { name: 'Status', selector: row => row.status, sortable: true },
  ];

  return (
    <>
      <div className="">
        <h1 className="text-3xl font-bold mb-6">Payments & Earnings</h1>

        {/* Earnings Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Earnings Overview</h2>
          <div className="flex space-x-8">
            <div className="p-4 bg-green-100 rounded-md">
              <p className="text-lg font-medium">Total Earnings</p>
              <p className="text-xl font-bold">${earnings.totalEarnings}</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-md">
              <p className="text-lg font-medium">Pending Payments</p>
              <p className="text-xl font-bold">${earnings.pendingPayments}</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-md">
              <p className="text-lg font-medium">Completed Transactions</p>
              <p className="text-xl font-bold">{earnings.completedTransactions}</p>
            </div>
          </div>
        </section>

        {/* Invoices & Receipts */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Invoices & Receipts</h2>
          <DataTable
            columns={invoiceColumns}
            data={invoices}
            pagination
            highlightOnHover
          />
        </section>

        {/* Payment History */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
          <DataTable
            columns={paymentColumns}
            data={paymentHistory}
            pagination
            highlightOnHover
          />
        </section>
      </div>
    </>
  );
}
