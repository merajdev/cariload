"use client";

import Image from "next/image";
import React from "react";
import { FaArrowRightLong, FaSackDollar } from "react-icons/fa6";
import image2 from "/public/images/image2.png";
import { BsDashLg } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AboutSection() {

    const pathname = usePathname();

    return (
        <>
            <div className="md:w-10/12 mx-auto flex flex-col items-center justify-center px-4 pb-10 md:pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <Image src={image2} alt="About Us" className="rounded-xl" />
                    </div>
                    <div className="block">
                        <h5 className="text-xs font-bold flex items-center mb-3 text-neutral-500">
                            <BsDashLg className="text-3xl text-indigo-500 me-2" />
                            WHO WE ARE
                        </h5>
                        <h1 className="text-2xl md:text-4xl font-bold mb-8 text-neutral-800 leading-10 tracking-wide">
                            Leading Global <span className="text-indigo-500">Logistic
                                And Transport </span>Agency
                        </h1>
                        <div className="block gap-4">
                            <div className="flex gap-3 p-4 md:p-6 bg-white mb-3 border-2 border-indigo-100 rounded-xl">

                                <div className="block">

                                    <p className="text-sm text-neutral-500">
                                        Cari Load is a one-stop solution for logistics, providing a dynamic environment where truck owners connect with load owners in real-time.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 p-4 md:p-6 mb-3 bg-white border-2 border-indigo-100 rounded-xl">

                                <div className="block">

                                    <p className="text-sm text-neutral-500">
                                        Our platform streamlines the logistics process by addressing issues related to fraudulent orders, empty returns, payment delays, unfair pricing, and poor communication, ultimately increasing productivity for all users.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {
                            pathname.includes('/about') ? (
                                <div className="block">
                                    <div className="flex p-4 md:p-6 mb-3 bg-white border-2 border-indigo-100 rounded-xl">

                                        <div className="block">

                                            <p className="text-sm text-neutral-500">
                                                We operates an online logistics marketplace where anyone, anywhere, at any time can find and book reliable logistics services, accessing a network of trusted professionals.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex p-4 md:p-6 mb-3 bg-white border-2 border-indigo-100 rounded-xl">

                                        <div className="block">

                                            <p className="text-sm text-neutral-500">
                                                In addition to facilitating connections, we leverage the latest technologies, including GPS tracking, automatic documentation, and instant notifications.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex p-4 md:p-6 mb-3 bg-white border-2 border-indigo-100 rounded-xl">

                                        <div className="block">

                                            <p className="text-sm text-neutral-500">
                                                As the first freight marketplace in Northern Nigeria, Cari Load has pioneered a new era in logistics, setting a benchmark for efficiency and reliability. With over 1,000+ registered companies (truck owners and load owners) from across Nigeria actively using our platform, we are revolutionizing the way goods are transported                                            </p>
                                        </div>
                                    </div>
                                </div>

                            ) : (
                                <Link href="/about" className="mt-4 gap-2 flex items-center bg-indigo-500 text-white w-max px-4 py-2 rounded-sm text-sm hover:bg-indigo-600">
                                    Learn More <FaArrowRightLong />
                                </Link>

                            )
                        }
                    </div>

                </div>
            </div>
        </>


    );
}
