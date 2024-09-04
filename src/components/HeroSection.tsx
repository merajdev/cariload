"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";
import Image from "next/image";
import heroImage from "/public/images/heroImage.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Customers } from "./Customers";

export function HeroSection() {
    const words = [
        {
            text: "Online",
        },
        {
            text: "Marketplace",
        },
        {
            text: "for",
        },
        {
            text: "Loads and Trucks",
            className: "text-indigo-500",
        },
    ];

    return (
        <div className="px-4 md:w-10/12 mx-auto flex flex-col items-center justify-center min-h-screen">
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


            {/* <p className="text-neutral-100 text-xs sm:text-base">
                The road to freedom starts from here
            </p>
            <TypewriterEffectSmooth words={words} />
            <div className="flex gap-3 mt-4">
                <button className="px-8 py-3 rounded-xl bg-indigo-500 border-2 border-transparent text-white text-sm">
                    Join now
                </button>
                <Link
                    href={'/signup'}
                    className="px-8 py-3 rounded-xl text-center hover:bg-indigo-500 text-indigo-500 hover:text-white border-2 border-indigo-500 text-sm"
                >
                    Signup
                </Link>
            </div> */}
        </div>
    );
}
