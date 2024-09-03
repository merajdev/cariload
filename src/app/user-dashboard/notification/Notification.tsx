import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
}

export const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch or load dummy notifications
  const fetchNotifications = async () => {
    // Simulate API call with dummy data
    setTimeout(() => {
      const dummyNotifications: Notification[] = [
        {
          id: '1',
          title: 'Order Shipped',
          message: 'Your order #1234 has been shipped and is on its way.',
          date: '2024-09-01',
        },
        {
          id: '2',
          title: 'Payment Received',
          message: 'We have received your payment for order #5678.',
          date: '2024-09-02',
        },
        {
          id: '3',
          title: 'Delivery Scheduled',
          message: 'Your order #9101 is scheduled for delivery on September 5th.',
          date: '2024-09-03',
        },
        {
          id: '4',
          title: 'Password Changed',
          message: 'Your password has been successfully changed.',
          date: '2024-09-04',
        },
      ];
      setNotifications(dummyNotifications);
      setLoading(false);
    }, 1000); // Simulate a network delay
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center text-gray-500">No notifications found.</div>
      ) : (
        <div className="space-y-4">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm"
            >
              <h2 className="text-lg font-semibold">{notification.title}</h2>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-2">{notification.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
