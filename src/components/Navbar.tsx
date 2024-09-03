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
import { usePathname } from 'next/navigation';
import { logout } from "@/redux/slice/authSlice";
import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

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

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const { isAuthenticated, userRole } = useAuth();


    return (
        <div className="relative">
            {/* Sidebar */}
            <div
                className={`fixed z-50 inset-0 bg-white text-indigo-600 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
            >
                <div className="flex justify-between p-4">
                    <Link href={'/'} className="ps-6 text-lg font-bold text-indigo-600">Logo</Link>

                    <button onClick={toggleSidebar}>
                        <IoMdClose className="w-6 h-6" />
                    </button>
                </div>
                <nav className="mt-8 flex flex-col items-center gap-4 px-6">
                    <Link
                        href={'/'}
                        onClick={toggleSidebar}
                        className={`px-4 py-2 rounded-full ${pathname === '/' ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'}`}>Home</Link>
                    <Link
                        onClick={toggleSidebar}
                        href={'/about'}
                        className={`px-4 py-2 rounded-full ${pathname === '/about' ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'}`}>About</Link>
                    <Link
                        onClick={toggleSidebar}
                        href={'/services'}
                        className={`px-4 py-2 rounded-full ${pathname === '/services' ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'}`}>Services</Link>
                    <Link
                        onClick={toggleSidebar}
                        href={'/contact'}
                        className={`px-4 py-2 rounded-full ${pathname === '/contact' ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'}`}>Contact</Link>
                </nav>
            </div>

            {/* Main Navbar */}
            <div className="fixed z-10 w-full top-0 p-4">
                <div className="max-w-4xl mx-auto py-1 md:py-2 px-4 bg-white border rounded rounded-full text-indigo-600 flex items-center justify-between">
                    <Link href={'/'} className="text-xl font-bold text-indigo-600">Logo</Link>
                    <div className="md:hidden flex text-sm gap-3">
                        {
                            isAuthenticated ? (
                                <div className="relative group">
                                    <button
                                        className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 flex justify-center items-center w-10 h-10 rounded-full"
                                    >
                                        <FaUser className='w-4 h-4' />
                                    </button>
                                    <div className="absolute right-0 w-40 border-2 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                                        <Link
                                            href={userRole == 'owner' ? '/owner-dashboard' : '/user-dashboard'}
                                            className="flex items-center gap-2  block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <MdDashboard className='w-4 h-4' />
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2  block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                        >
                                            <FiLogOut className='w-4 h-4' />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Link href={'/login'} className='bg-indigo-600 hover:bg-indigo-700 text-white text-center px-4 py-2 rounded-full'>Login</Link>
                            )
                        }
                        <button className="" onClick={toggleSidebar}>
                            <RiMenu5Line className="w-6 h-6" />
                        </button>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <Link href="/" className={`px-4 py-2 rounded-full ${pathname === '/' ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'}`}>Home</Link>
                        <Link href="/about" className={`px-4 py-2 rounded-full ${pathname === '/about' ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'}`}>About</Link>
                        <Link href="/services" className={`px-4 py-2 rounded-full ${pathname === '/services' ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'}`}>Services</Link>
                        <Link href="/contact" className={`px-4 py-2 rounded-full ${pathname === '/contact' ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-indigo-100 hover:text-indigo-700'}`}>Contact</Link>
                        {isAuthenticated ? (
                            <div className="relative group">
                                <button
                                    className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 flex justify-center items-center w-10 h-10 rounded-full"
                                >
                                    <FaUser className='w-4 h-4' />
                                </button>
                                <div className="absolute right-0 w-40 border-2 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                                    <Link
                                        href={userRole == 'owner' ? '/owner-dashboard' : '/user-dashboard'}
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
                            <Link href={'/login'} className='bg-indigo-600 hover:bg-indigo-700 text-white text-center px-4 py-2 rounded-full'>Login</Link>
                        )
                        }
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
