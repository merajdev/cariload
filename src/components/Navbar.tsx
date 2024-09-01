'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import useAuth from '@/hooks/useAuth';
import { FaUser } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { RiMenu5Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from "@/redux/slice/authSlice";
import axios from 'axios';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

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
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const { isAuthenticated, userRole } = useAuth();


    return (
        <div className="relative">
            {/* Sidebar */}
            <div
                className={`fixed z-50 inset-0 bg-white text-neutral-800 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
            >
                <div className="flex justify-between p-4">
                    <Link href={'/'} className="ps-6 text-lg font-bold text-blue-600">Logo</Link>

                    <button onClick={toggleSidebar}>
                        <IoMdClose className="w-6 h-6" />
                    </button>
                </div>
                <nav className="mt-8 space-y-4 px-6">
                    <Link href={'/'} className='block py-2 px-4 hover:bg-blue-600 hover:text-white rounded'>Home</Link>
                    <Link href={'/about'} className='block py-2 px-4 hover:bg-blue-600 hover:text-white rounded'>About</Link>
                    <Link href={'/services'} className='block py-2 px-4 hover:bg-blue-600 hover:text-white rounded'>Services</Link>
                    <Link href={'/contact'} className='block py-2 px-4 hover:bg-blue-600 hover:text-white rounded'>Contact</Link>
                </nav>
            </div>

            {/* Main Navbar */}
            <div className="fixed z-10 w-full top-0 p-4">
                <div className="max-w-4xl mx-auto p-2 px-4 bg-neutral-100 rounded rounded-full text-neutral-800 flex items-center justify-between">
                    <Link href={'/'} className="text-xl font-bold text-blue-600">Logo</Link>
                    <div className="md:hidden flex text-sm gap-3">
                        {
                            isAuthenticated ? (
                                <div className="flex gap-2">
                                    <Link href={userRole == 'owner' ? '/owner-dashboard' : '/user-dashboard'} className='border-2 border-blue-500 bg-blue-500 hover:bg-neutral-900 text-white flex justify-center items-center w-8 h-8 rounded-full'>
                                        <FaUser className=' w-4 h-4' />
                                    </Link>
                                    <Link href={'/login'}
                                        onClick={handleLogout}
                                        className='border-2 border-red-500 hover:bg-neutral-900 text-white flex justify-center items-center w-8 h-8 rounded-full'
                                    >
                                        <IoLogOut className='text-red-500 w-4 h-4' />
                                    </Link>
                                </div>
                            ) : (
                                <Link href={'/login'} className='bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-full'>Login</Link>
                            )
                        }
                        <button className="" onClick={toggleSidebar}>
                            <RiMenu5Line className="w-6 h-6" />
                        </button>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <Link href="/" className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full">Home</Link>
                        <Link href="/about" className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full">About</Link>
                        <Link href="/services" className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full">Services</Link>
                        <Link href="/contact" className="hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full">Contact</Link>
                        {
                            isAuthenticated ? (
                                <div className="flex gap-3">
                                    <Link href={userRole == 'owner' ? '/owner-dashboard' : '/user-dashboard'} className='bg-blue-600 hover:bg-blue-700 flex justify-center items-center w-10 h-10 text-white  rounded-full'>
                                        <FaUser className='w-4 h-4' />
                                    </Link>
                                    <Link href={'/login'}
                                        onClick={handleLogout}
                                        className='border-2 border-red-500 hover:bg-red-500 text-red-500 hover:text-white flex justify-center items-center w-10 h-10  rounded-full'
                                    >
                                        <IoLogOut className='w-4 h-4' />
                                    </Link>
                                </div>
                            ) : (
                                <Link href={'/login'} className='bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-full'>Login</Link>
                            )
                        }
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
