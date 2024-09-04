"use client";

import Image from "next/image";
import React from "react";
import { FaArrowRightLong, FaSackDollar } from "react-icons/fa6";
import image2 from "/public/images/image2.png";
import { BsDashLg } from "react-icons/bs";
import { FaGlobe } from "react-icons/fa";
import Link from "next/link";

export function AboutSection() {

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
                        <div className="block gap-4 mb-8">
                            <div className="flex gap-3 p-4 md:p-6 bg-white mb-3 border-2 border-indigo-100 rounded-xl">
                                <div className="p-4 h-min rounded-lg bg-indigo-50 text-indigo-500">
                                    <FaGlobe className="text-2xl" />
                                </div>
                                <div className="block">
                                    <h3 className="text-lg text-neutral-800 font-semibold mb-1">
                                        Sub Heading
                                    </h3>
                                    <p className="text-sm text-neutral-500">
                                        We provide the best logistic service in the city, we also provide safe & secure delivery.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 p-4 md:p-6 bg-white mb-3 border-2 border-indigo-100 rounded-xl">
                                <div className="p-4 h-min rounded-lg bg-indigo-50 text-indigo-500">
                                    <FaGlobe className="text-2xl" />
                                </div>
                                <div className="block">
                                    <h3 className="text-lg text-neutral-800 font-semibold mb-1">
                                        Sub Heading
                                    </h3>
                                    <p className="text-sm text-neutral-500">
                                        We provide the best logistic service in the city, we also provide safe & secure delivery.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Link href={'/about'} className="flex w-max items-center bg-indigo-500 text-white hover:bg-indigo-600 px-6 py-3 rounded">
                            More About Us
                        </Link>
                    </div>

                </div>
            </div>
        </>


    );
}
