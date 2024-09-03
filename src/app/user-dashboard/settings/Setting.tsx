'use client';

import { useState } from 'react';
import axios from 'axios';
import { logout } from "@/redux/slice/authSlice";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export const Setting = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked
    });
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('/api/users/profile', profile);
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('/api/auth/change-password', password);
      alert('Password changed successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      localStorage.removeItem('authData');
      dispatch(logout());
      router.push('/login');
    } catch (error: any) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-4 md:p-6 bg-white rounded-lg shadow-md flex-1">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      {/* Profile Settings */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <form onSubmit={handleProfileUpdate}>
            <div className="grid gap-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Update Profile
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordChangeSubmit}>
            <div className="grid gap-4 mb-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={password.currentPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <form>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                name="email"
                checked={notifications.email}
                onChange={handleNotificationsChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="emailNotifications" className="ml-3 block text-sm font-medium text-gray-700">Email Notifications</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotifications"
                name="sms"
                checked={notifications.sms}
                onChange={handleNotificationsChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="smsNotifications" className="ml-3 block text-sm font-medium text-gray-700">SMS Notifications</label>
            </div>
          </div>
        </form>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};
