"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";
import Image from "next/image";
import heroImage from "/public/images/hero.svg";
import React from "react";
import { FaSackDollar } from "react-icons/fa6";
import { TbGpsFilled } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdContactSupport } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";
import { BsDashLg } from "react-icons/bs";

export function Features() {
    const features = [
        {
            id: "01",
            title: "Cost Effectiveness",
            description: "Reducing service fees, making logistics more affordable for everyone.",
            icon: (
                <FaSackDollar className="text-5xl" />
            )

        },
        {
            id: "02",
            title: "Real-time Tracking",
            description: "Track your goods and trucks in real-time, ensuring that your goods are safe.",
            icon: (
                <TbGpsFilled className="text-5xl" />
            )

        },
        {
            id: "03",
            title: "Secure Payments",
            description: "We ensure that all transactions are secure and that your money is safe.",
            icon: (
                <RiSecurePaymentFill className="text-5xl" />
            )

        },
        {
            id: "04",
            title: "Customer verification",
            description: "We verify all our customers to ensure that they are legitimate.",
            icon: (
                <FaUserCheck className="text-5xl" />
            )

        },
    ];

    return (
        <>
            <div className="md:w-10/12 mx-auto flex flex-col items-center justify-center px-4 py-10 md:py-28">
                <div className="flex flex-col items-center mb-6">
                    <h5 className="text-xs font-bold flex items-center mb-3 text-neutral-500">
                        <BsDashLg className="text-3xl text-indigo-500 me-2" />
                        OUR FEATURES
                        <BsDashLg className="text-3xl text-indigo-500 ms-2" />
                    </h5>
                    <h1 className="max-w-xl text-center text-2xl md:text-4xl font-bold mb-4 text-neutral-800 leading-10 tracking-wide">
                        Why use
                        <span className="px-1 text-indigo-500">Cari Load</span>
                        platform?
                    </h1>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                    {features.map((feature, index) => (
                        <div key={index} className="gap-3 flex flex-col md:flex-row md:items-center md:justify-center p-4 md:p-2 border-2 border-indigo-100 rounded-tl-2xl rounded-br-2xl">
                            <div className="w-min h-full flex flex-col p-6 gap-3 items-center justify-center bg-indigo-50 text-indigo-500 rounded-tl-xl rounded-br-xl">
                                {feature.icon}
                                <h2 className="text-center text-3xl font-bold">
                                    {feature.id}
                                </h2>
                            </div>
                            <div className="">
                                <h3 className="text-xl font-semibold text-indigo-500 mb-2">{feature.title}</h3>
                                <p className="text-md text-neutral-600">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>


    );
}
