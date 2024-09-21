'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { RiMenu5Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { logout } from "@/redux/slice/authSlice";
import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';
import { MdDashboard, MdEmail } from 'react-icons/md';
import { Logo } from './Logo';
import useAuth from '@/hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';
import { FaPhoneVolume } from 'react-icons/fa6';
import { BsBuildingsFill } from 'react-icons/bs';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const { isAuthenticated, userRole, isLoading, setIsAuthenticated, setUserRole } = useAuth();

    const handleLogout = async () => {
        try {
            await axios.get('/api/auth/logout');
            localStorage.removeItem('authData');

            // Update local states to reflect logout immediately
            dispatch(logout());
            setIsAuthenticated(false);
            setUserRole(null);

            toast.success('Logout successful!', {
                position: "top-center",
            });

            // Delay to allow UI update before redirect
            setTimeout(() => {
                return null;
            }, 500);
        } catch (error: any) {
            toast.error('Logout failed. Please try again!', {
                position: "top-center",
            });
            console.error('Logout failed:', error.message);
        }
    };



    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="w-12 h-12" color="#3498db" />
            </div>
        ); // Optionally add a loading spinner or skeleton UI here
    }

    return (
        <div className="relative">
            {/* Sidebar */}
            <div
                className={`fixed z-50 inset-0 bg-white text-indigo-600 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
            >
                <div className="flex justify-between p-4">
                    <Link href={'/'} className="flex items-center ps-6 text-md font-bold text-indigo-600">
                        <Logo />
                        Cari Load
                    </Link>

                    <button onClick={toggleSidebar}>
                        <IoMdClose className="w-6 h-6" />
                    </button>
                </div>
                <nav className="mt-8 flex flex-col items-center gap-4 px-6">
                    <Link
                        href={'/'}
                        onClick={toggleSidebar}
                        className={`px-4 py-2 rounded-full ${pathname === '/' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-indigo-50 hover:text-indigo-700'}`}>
                        Home
                    </Link>
                    <Link
                        onClick={toggleSidebar}
                        href={'/about'}
                        className={`px-4 py-2 rounded-full ${pathname === '/about' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-indigo-50 hover:text-indigo-700'}`}>
                        About
                    </Link>
                    <Link
                        onClick={toggleSidebar}
                        href={'/services'}
                        className={`px-4 py-2 rounded-full ${pathname === '/services' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-indigo-50 hover:text-indigo-700'}`}>
                        Services
                    </Link>
                    <Link
                        onClick={toggleSidebar}
                        href={'/contact'}
                        className={`px-4 py-2 rounded-full ${pathname === '/contact' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-indigo-50 hover:text-indigo-700'}`}>
                        Contact
                    </Link>
                </nav>
            </div>

            {/* Main Navbar */}
            <div className="fixed z-30 w-full top-0">
                <div className="bg-white shadow-lg">
                    <div className="mx-auto md:w-10/12 shadow-sm pb-10 pt-2 px-4 flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="bg-indigo-500 flex items-center justify-center p-2">
                                <FaPhoneVolume className="text-xl text-white" />
                            </div>
                            <p className='flex flex-col'>
                                <span className="text-sm text-indigo-600">Call Us</span>
                                <a href='tel:+911234567890' className="font-semibold text-neutral-700 text-sm">+91 1234567890</a>
                            </p>
                        </div>

                        {/* Email */}

                        <div className="flex gap-2">
                            <div className="bg-indigo-500 flex items-center justify-center p-2">
                                <MdEmail className="text-xl text-white" />
                            </div>
                            <p className='flex flex-col'>
                                <span className="text-sm text-indigo-600">Email Us</span>
                                <a href='mailto:email@gmail.com' className="font-semibold text-neutral-700 text-sm">
                                    email@gmail.com
                                </a>
                            </p>
                        </div>

                        {/* RC Number */}

                        <div className="flex gap-2">
                            <div className="bg-indigo-500 flex items-cnter justify-center p-2">
                                <BsBuildingsFill className="text-xl text-white" />
                            </div>
                            <p className='flex flex-col'>
                                <span className="text-sm text-indigo-600">RC Number</span>
                                <p className="font-semibold text-neutral-700 text-sm">
                                    RC1234567890
                                </p>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto md:w-10/12 rounded-xl shadow-sm py-2 px-4 bg-white border text-indigo-600 flex items-center justify-between -mt-8">
                    <Link href={'/'} className="flex items-center text-xl font-bold text-indigo-600">
                        <Logo />
                        Cari Load
                    </Link>
                    <div className="md:hidden flex text-sm gap-3">
                        {isAuthenticated ? (
                            <div className="relative group">
                                <button className="bg-indigo-50 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 flex justify-center items-center w-10 h-10 rounded-full">
                                    <FaUser className='w-4 h-4' />
                                </button>
                                <div className="absolute right-0 w-40 border-2 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                                    <Link
                                        href={userRole === 'owner' ? '/owner-dashboard' : '/user-dashboard'}
                                        className="flex items-center gap-2  block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <MdDashboard className='w-4 h-4' />
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                    >
                                        <FiLogOut className='w-4 h-4' />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href={'/login'} className='bg-indigo-600 hover:bg-indigo-700 text-white text-center px-4 py-2 rounded-full'>
                                Login
                            </Link>
                        )}
                        <button className="" onClick={toggleSidebar}>
                            <RiMenu5Line className="w-6 h-6" />
                        </button>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <Link href="/" className={`px-4 py-2 rounded-full ${pathname === '/' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-indigo-50 hover:text-indigo-700'}`}>
                            Home
                        </Link>
                        <Link href="/about" className={`px-4 py-2 rounded-full ${pathname === '/about' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-indigo-50 hover:text-indigo-700'}`}>
                            About
                        </Link>
                        <Link href="/services" className={`px-4 py-2 rounded-full ${pathname === '/services' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-indigo-50 hover:text-indigo-700'}`}>
                            Services
                        </Link>
                        <Link href="/contact" className={`px-4 py-2 rounded-full ${pathname === '/contact' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'hover:bg-indigo-50 hover:text-indigo-700'}`}>
                            Contact
                        </Link>
                        {isAuthenticated ? (
                            <div className="relative group">
                                <button className="bg-indigo-50 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 flex justify-center items-center w-10 h-10 rounded-full">
                                    <FaUser className='w-4 h-4' />
                                </button>
                                <div className="absolute right-0 w-40 border-2 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                                    <Link
                                        href={userRole === 'owner' ? '/owner-dashboard' : '/user-dashboard'}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <MdDashboard className='w-4 h-4' />
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                    >
                                        <FiLogOut className='w-4 h-4' />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link href={'/login'} className='bg-indigo-600 hover:bg-indigo-700 text-white text-center px-4 py-2 rounded-full'>
                                    Login
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
}

export default Navbar;
