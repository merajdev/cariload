import Image from "next/image";
import Link from "next/link";
import { MdEmail, MdSupportAgent } from "react-icons/md";
import { Logo } from "./Logo";
import { FaFacebookF } from "react-icons/fa";
import { FaArrowRightLong, FaMapLocationDot, FaPhoneVolume, FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill, RiLinkedinFill } from "react-icons/ri";

export const Footer = () => {
    return (
        <>
            <div className="bg-indigo-50">
                <div className="md:w-10/12 mx-auto px-4 py-10">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
                        <div className="block space-y-6">
                            <Link href={'/'} className="flex items-center text-md font-bold text-indigo-600">
                                <Logo />
                                Cari Load
                            </Link>
                            <p className="text-sm">
                                CariLoad is a marketplace for loads and trucks. We connect shippers and carriers to move freight efficiently.
                            </p>
                            <div className="flex">
                                <div className="bg-indigo-500 p-2">
                                    <MdSupportAgent className="text-3xl text-white" />
                                </div>
                                <div className="block ms-4">
                                    <h5 className="text-sm font-bold text-neutral-800">Make a call</h5>
                                    <p className="text-sm font-bold text-indigo-500">+91 123 456 7890</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <h5 className="text-xl font-bold text-neutral-800">Quick Links</h5>
                            <Link href={'/'} className="text-sm flex items-center text-neutral-700 hover:text-indigo-500"> <FaArrowRightLong className="me-2 text-indigo-500" />Home</Link>
                            <Link href={'/about'} className="text-sm flex items-center text-neutral-700 hover:text-indigo-500"> <FaArrowRightLong className="me-2 text-indigo-500" />About</Link>
                            <Link href={'/services'} className="text-sm flex items-center text-neutral-700 hover:text-indigo-500"> <FaArrowRightLong className="me-2 text-indigo-500" />Services</Link>
                            <Link href={'/contact'} className="text-sm flex items-center text-neutral-700 hover:text-indigo-500"> <FaArrowRightLong className="me-2 text-indigo-500" />Contact</Link>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <h5 className="text-xl font-bold text-neutral-800">Get in Touch</h5>
                            <p className="flex items-center text-sm text-neutral-700">
                                <FaMapLocationDot className="text-2xl text-indigo-500 me-2" />
                                123, Main Road, Your City, Country
                            </p>
                            {/* emails */}
                            <Link href={'mailto:email@gmail.com'} className="flex items-center text-sm text-neutral-700 hover:text-indigo-500">
                                <MdEmail className="text-2xl text-indigo-500 me-2" />
                                email@gmail.com
                            </Link>
                            {/* phone */}
                            <Link href={'tel:+911 84734 98498'} className="flex items-center text-sm text-neutral-700 hover:text-indigo-500">
                            <FaPhoneVolume className="text-2xl text-indigo-500 me-2" />
                                +911 84734 98498
                            </Link>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <h5 className="text-xl font-bold text-neutral-800">Subscribe Us</h5>
                            <p className="text-sm">
                                Subscribe to our newsletter to get the latest updates.
                            </p>
                            <div className="flex gap-2">
                                <input type="text" placeholder="Enter your email" className="px-4 py-2 w-full rounded" />
                                <button className="bg-indigo-500 text-white px-4 py-2 rounded">Subscribe</button>
                            </div>
                        </div>
                    </div>

                    <hr className="w-full" />

                    <div className="w-full md:flex items-center justify-between text-sm text-neutral-500 py-4 space-y-4">
                        <p>
                            &copy; 2024 Cari Load. All rights reserved.
                        </p>
                        <div className="flex">
                            {/* social links */}
                            <Link href={'#'} className="text-indigo-500 p-2 rounded bg-indigo-100 hover:bg-indigo-200 me-4">
                                <FaFacebookF />
                            </Link>
                            <Link href={'#'} className="text-indigo-500 p-2 rounded bg-indigo-100 hover:bg-indigo-200 me-4">
                                <FaXTwitter />
                            </Link>
                            <Link href={'#'} className="text-indigo-500 p-2 rounded bg-indigo-100 hover:bg-indigo-200 me-4">
                                <RiInstagramFill />
                            </Link>
                            <Link href={'#'} className="text-indigo-500 p-2 rounded bg-indigo-100 hover:bg-indigo-200 me-4">
                                <RiLinkedinFill />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}