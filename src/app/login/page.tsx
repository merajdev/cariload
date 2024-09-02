'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import Spinner from '@/components/Spinner';

export default function Login() {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const { isLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors before submitting

    try {
      const response = await axios.post('/api/auth/login', formData);
      const { token, role } = response.data;

      localStorage.setItem('authData', JSON.stringify({ token, role }));
      router.push(role === 'owner' ? '/owner-dashboard' : '/user-dashboard');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || 'Entered wrong email or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="w-12 h-12" color="#3498db" />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full p-2 mb-4 border border-gray-300 rounded"
              required
            />
            <button type="submit" className="block w-full bg-blue-500 text-white p-2 rounded">
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
}
