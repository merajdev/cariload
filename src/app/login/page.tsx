'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import Link from 'next/link';
import bgImage from '/public/images/trackTrruck.png'
import { FaArrowLeftLong } from 'react-icons/fa6';

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
        // <div className="flex items-center justify-center min-h-screen">
        //   <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        //     <h2 className="text-2xl font-bold mb-4">Login</h2>
        //     {error && <p className="text-red-500 mb-4">{error}</p>}
        //     <input
        //       type="email"
        //       name="email"
        //       placeholder="Email"
        //       value={formData.email}
        //       onChange={handleChange}
        //       className="block w-full p-2 mb-4 border border-gray-300 rounded"
        //       required
        //     />
        //     <input
        //       type="password"
        //       name="password"
        //       placeholder="Password"
        //       value={formData.password}
        //       onChange={handleChange}
        //       className="block w-full p-2 mb-4 border border-gray-300 rounded"
        //       required
        //     />
        //     <button type="submit" className="block w-full bg-blue-500 text-white p-2 rounded">
        //       Login
        //     </button>
        //   </form>
        // </div>


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
                <Link href='/' className='text-center flex items-center text-sm text-sm text-neural-800 hover:text-neutral-900 hover:underline font-semibold'>
                  <FaArrowLeftLong className="me-2" />
                  Back to Home
                </Link>
                <Link href='/' className='text-center text-xl text-indigo-500 font-bold'>Logo</Link>
              </div>
              <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">
                  Login
                </h1>
                <p className="text-sm xl:text-base text-gray-600 mt-2">
                  Don not have an account?
                  <Link href='/signup' className="text-indigo-500 border-b border-indigo-500 border-dotted">
                    Sign up
                  </Link>
                </p>
                <div className="w-full flex-1 mt-8">
                  <form onSubmit={handleSubmit}>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />

                    <button
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      type="submit"
                    >
                      Login
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
}
