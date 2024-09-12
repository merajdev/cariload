'use client';

import Spinner from '@/components/Spinner';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth'
import { FaArrowLeftLong } from 'react-icons/fa6';
import bgImage from '/public/images/trackTrruck.png';
import { useRouter } from 'next/navigation';


export default function SignUp() {
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/'); // Redirect to a dashboard or any other page
    }
  }, [isAuthenticated, router]);


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password, role }),
    });

    console.log(res)

    const data = await res.json();
    if (data.success) {
      setOtpSent(true);
    } else {
      setError(data.message);
    }

    setLoading(false); // End loading

  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role, otp }),
    });

    const data = await res.json();
    if (data.success) {
      window.location.href = '/login';
    } else {
      setError('Invalid OTP');
    }
    setLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="w-12 h-12" color="#3498db" />
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center md:p-4">
          <div className="md:grid md:grid-cols-2 bg-white shadow sm:rounded-lg flex justify-between p-4 flex-1">
            <div className="hidden lg:flex items-center w-full justify-center">
              <Image
                src={bgImage}
                alt="Signup"
                width={400}
                height={400}
              />
            </div>

            <div className="m-auto p-4 md:px-12">
              <div className='flex items-center justify-between'>
                <Link href={'/'} className='text-center flex items-center text-sm text-neural-800 hover:text-neutral-900 hover:underline font-semibold'>
                  <FaArrowLeftLong className="me-2" /> Back to Home
                </Link>
                <Link href={'/'} className='text-center text-xl text-indigo-500 font-bold'>Logo</Link>
              </div>
              <div className="mt-6 flex flex-col items-center">
                <div className="w-full flex-1 mt-4">
                  <form onSubmit={otpSent ? handleVerifyOtp : handleSignUp}>
                    <h2 className="text-2xl text-center font-bold mb-6">{otpSent ? 'Verify OTP' : 'Sign Up'}</h2>
                    {!otpSent && (
                      <>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          placeholder='Name'
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        />
                        <input
                          type="email"
                          id="email"
                          value={email}
                          placeholder='Email'
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        />
                        <input
                          type="password"
                          id="password"
                          value={password}
                          placeholder='Password'
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        />
                        <input
                          type="password"
                          id="confirmPassword"
                          value={confirmPassword}
                          placeholder='Confirm Password'
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        />
                        <select
                          id="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        >
                          <option value="user">User</option>
                          <option value="owner">Owner</option>
                        </select>
                      </>
                    )}

                    {otpSent && (
                      <input
                        type="text"
                        id="otp"
                        value={otp}
                        placeholder='Enter your OTP'
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      />
                    )}

                    {error && <p className="mt-2 text-red-600">{error}</p>}
                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      {
                        loading ? <Spinner size="w-6 h-6" color="#ffffff" /> : otpSent ? 'Verify OTP' : 'Sign Up'
                      }
                    </button>

                    <p className="text-sm text-center xl:text-base text-gray-600 mt-4">
                      Already have an account?
                      <Link href={'/login'} className="text-indigo-500 border-b border-indigo-500 border-dotted">
                        Login
                      </Link>
                    </p>
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
