'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import Link from 'next/link';
import bgImage from '/public/images/trackTrruck.png';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { toast } from 'react-toastify';

export default function Login() {

  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();
  
  useEffect(() => {
    if ( isAuthenticated) {
      router.push('/'); // Redirect to a dashboard or any other page
    }
  }, [isAuthenticated, router]);

  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors before submitting
    setLoading(true); // Start loading

    try {
      const response = await axios.post('/api/auth/login', formData);
      const { token, role } = response.data;

      localStorage.setItem('authData', JSON.stringify({ token, role }));
      toast.success('Login successful!', {
        position: "top-center",
      });

      // Delay to allow UI update before redirect
      setTimeout(() => {
        router.push(role === 'owner' ? '/owner-dashboard' : '/user-dashboard');
      }, 1000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || 'An error occurred. Please try again later.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="w-12 h-12" color="#3498db" />
      </div>
    );
  }

  return (
    <>
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
                <Link href={'/'} className='text-center flex items-center text-sm text-neutral-800 hover:text-neutral-900 hover:underline font-semibold'>
                  <FaArrowLeftLong className="me-2" />
                  Back to Home
                </Link>
                <Link href={'/'} className='text-center text-xl text-indigo-500 font-bold'>
                  Logo
                </Link>
              </div>
              <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">
                  Login
                </h1>
                <p className="text-sm xl:text-base text-gray-600 mt-2">
                  Don't have an account?
                  <button
                    onClick={() => router.push('/signup')}
                    className="text-indigo-500 border-b border-indigo-500 border-dotted ml-1">
                    Sign up
                  </button>
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
                      disabled={loading} // Disable button when loading
                    >
                      {loading ? (
                        <Spinner size="w-6 h-6" color="#ffffff" /> // Spinner inside button
                      ) : (
                        'Login'
                      )}
                    </button>
                  </form>

                  <p className="mt-6 text-xs text-gray-600 text-center">
                    <a href="#" className="border-b border-gray-500 border-dotted">
                      Terms of Service
                    </a> and its
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
