import React, { useState } from 'react';

interface Payment {
  id: number;
  orderId: string;
  paymentMethod: string;
  amount: string;
  date: string;
  status: string;
}

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      orderId: 'ORD123456',
      paymentMethod: 'Credit Card',
      amount: '$150.00',
      date: '2024-09-01',
      status: 'Completed',
    },
    {
      id: 2,
      orderId: 'ORD654321',
      paymentMethod: 'PayPal',
      amount: '$200.00',
      date: '2024-08-28',
      status: 'Pending',
    },
    {
      id: 3,
      orderId: 'ORD789012',
      paymentMethod: 'Mobile Money',
      amount: '$75.00',
      date: '2024-08-15',
      status: 'Refunded',
    },
  ]);

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const viewDetails = (payment: Payment) => {
    setSelectedPayment(payment);
  };

  const closeDetails = () => {
    setSelectedPayment(null);
  };

  const downloadReceipt = (payment: Payment) => {
    // Dummy function for downloading receipts
    alert(`Downloading receipt for Order ID: ${payment.orderId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Payments Overview */}
      <h2 className="text-xl font-semibold mb-4">Payments Overview</h2>
      <ul className="mb-6">
        {payments.map((payment) => (
          <li key={payment.id} className="mb-4 max-w-md flex justify-between items-center p-4 bg-gray-100 rounded-lg">
            <div className="block w-full md:flex md:justify-between gap-3">
              <div>
                <p><strong>Order ID:</strong> {payment.orderId}</p>
                <p><strong>Date:</strong> {payment.date}</p>
                <p><strong>Amount:</strong> {payment.amount}</p>
                <p><strong>Status:</strong> {payment.status}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => viewDetails(payment)}
                  className="bg-blue-500 h-min text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition"
                >
                  View
                </button>
                <button
                  onClick={() => downloadReceipt(payment)}
                  className="bg-green-500 h-min text-white py-1 px-3 rounded-lg hover:bg-green-600 transition"
                >
                  Download
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Transaction Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
            <p><strong>Order ID:</strong> {selectedPayment.orderId}</p>
            <p><strong>Payment Method:</strong> {selectedPayment.paymentMethod}</p>
            <p><strong>Amount:</strong> {selectedPayment.amount}</p>
            <p><strong>Date:</strong> {selectedPayment.date}</p>
            <p><strong>Status:</strong> {selectedPayment.status}</p>
            <button
              onClick={closeDetails}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
