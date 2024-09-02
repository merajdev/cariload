'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user', // default role
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', formData);
      router.push('/login');
      console.log(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <div className="px-4 h-screen">
        <form onSubmit={handleSubmit} className="max-w-md h-max mx-auto border-2 rounded space-y-4 p-6 mt-12">
          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="user">User</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
