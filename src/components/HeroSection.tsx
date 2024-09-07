"use client";

import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/ui/images-slider";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";
import Image from "next/image";
import heroImage from "/public/images/heroImage.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Customers } from "./Customers";

export function HeroSection() {
    const images = [
        "https://firebasestorage.googleapis.com/v0/b/meraj-courses.appspot.com/o/hero2.png?alt=media&token=515bbc59-5320-4d29-9622-9a77f263c09d",
        "https://firebasestorage.googleapis.com/v0/b/meraj-courses.appspot.com/o/hero3.png?alt=media&token=60a33ed4-f3c4-4c08-98f6-cc4233bfe076",
        "https://firebasestorage.googleapis.com/v0/b/meraj-courses.appspot.com/o/hero4.png?alt=media&token=c85d9259-ca65-4150-a5ee-42fe6d1b7d97",
    ];

    return (


        <>
            <ImagesSlider className="min-h-screen" images={images}>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -80,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="z-50 flex flex-col justify-center md:items-center"
                >
                    <div className="px-4 grid md:grid-cols-2 max-w-5xl">
                        <div className="md:px-6 md:text-end text-neutral-100 mb-6 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-[3rem]">
                                Modern Logistic <br /> <span className="text-indigo-500">Transport</span>
                            </h1>
                            <p className="text-sm font-bold">
                                Specialist In Modern <br /> Transportation
                            </p>
                        </div>
                        <div className="px-6 border-l-4 border-indigo-500">
                            <p className="mb-6 text-md text-neutral-100">
                                Logistic service provider company plays a pivotal role
                                in the global supply chain ecosystem managing.
                            </p>
                            <Customers />
                            <Link href={'/about'} className="flex w-max text-sm items-center bg-indigo-500 text-white hover:bg-indigo-600 px-6 py-3 rounded">
                                More About Us <FaArrowRightLong className="ms-2" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </ImagesSlider>



            {/* <div className="px-4 md:w-10/12 mx-auto flex flex-col items-center justify-center min-h-screen">
                <div className="max-w-2xl">
                    <Image src={heroImage} alt="Hero Image" className="w-full mb-4 pt-20" />
                </div>

                <div className="grid md:grid-cols-2">
                    <div className="md:px-6 md:text-end text-neutral-700 mb-6 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-[3rem]">
                            Modern Logistic <br /> <span className="text-indigo-500">Transport</span>
                        </h1>
                        <p className="text-sm font-bold">
                            Specialist In Modern <br /> Transportation
                        </p>
                    </div>
                    <div className="px-6 border-l-4 border-indigo-500">
                        <p className="mb-6 text-md text-neutral-800">
                            Logistic service provider company plays a pivotal role
                            in the global supply chain ecosystem managing.
                        </p>
                        <Customers />
                        <Link href={'/about'} className="flex w-max text-sm items-center bg-indigo-500 text-white hover:bg-indigo-600 px-6 py-3 rounded">
                            More About Us <FaArrowRightLong className="ms-2" />
                        </Link>
                    </div>
                </div>
            </div> */}
        </>

    );
}
