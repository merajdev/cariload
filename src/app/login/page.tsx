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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      const { token, role, email } = response.data;
      localStorage.setItem('authData', JSON.stringify({ token, role, email }));
      router.push(role === 'owner' ? '/owner-dashboard' : '/user-dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setError("Entered wrong email or password");
      }
    }
  };
  const { isLoading } = useAuth();


  return (
    <>
      {
        isLoading &&
        (<div className="min-h-screen flex items-center justify-center">
          <Spinner size="w-12 h-12" color="#3498db" />
          {/* Customize size and color */}
        </div>)
      }
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {/* show error */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="block w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="block w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="block w-full bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
