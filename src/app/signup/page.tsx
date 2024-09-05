'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import bgImage from '/public/images/trackTrruck.png'
import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';
import useAuth from '@/hooks/useAuth';
import Spinner from '@/components/Spinner';


const Signup = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();
  
  useEffect(() => {
    if ( isAuthenticated) {
      router.push('/'); // Redirect to a dashboard or any other page
    }
  }, [isAuthenticated, router]);

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
      router.push('/');
      console.log(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      {/* <div className="px-4 h-screen">
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
      </div> */}

      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="w-12 h-12" color="#3498db" />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center md:p-8">
          <div className="max-w-screen-xl bg-white shadow sm:rounded-lg flex justify-between p-4 flex-1">
            <div className="hidden lg:flex items-center w-full justify-center">
              <Image
                src={bgImage}
                alt="Signup"
                width={400}
                height={400}
              />
            </div>

            <div className="m-auto p-4">
              <div className='flex items-center justify-between'>
                <Link href={'/'} className='text-center flex items-center text-sm text-neural-800 hover:text-neutral-900 hover:underline font-semibold'>
                  <FaArrowLeftLong className="me-2" /> Back to Home
                </Link>
                <Link href={'/'} className='text-center text-xl text-indigo-500 font-bold'>Logo</Link>
              </div>
              <div className="mt-12 flex flex-col items-center">
                <h2 className="text-2xl xl:text-3xl font-extrabold">
                  Sign up
                </h2>
                <p className="text-sm xl:text-base text-gray-600 mt-2">
                  Already have an account?
                  <Link href={'/login'} className="text-indigo-500 border-b border-indigo-500 border-dotted">
                    Login
                  </Link>
                </p>
                <div className="w-full flex-1 mt-8">
                  <form onSubmit={handleSubmit}>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      required
                    >
                      <option value="user">User</option>
                      <option value="owner">Owner</option>
                    </select>

                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                    />

                    <button
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </form>

                  <p className="mt-6 text-xs text-gray-600 text-center">
                    <a href="#" className="border-b border-gray-500 border-dotted">
                      Terms of Service
                    </a>
                    and its
                    <a href="#" className="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
