"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";
import Image from "next/image";
import heroImage from "/public/images/hero.svg";

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
            className: "text-blue-600",
        },
    ];

    return (
        <div className="relative flex flex-col items-center justify-center h-screen">
            <Image
                src={heroImage}
                alt="Hero Background"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="z-[-1]" // This ensures the image stays behind the content
            />
            <p className="text-neutral-100 text-xs sm:text-base">
                The road to freedom starts from here
            </p>
            <TypewriterEffectSmooth words={words} />
            <div className="flex gap-3 mt-4">
                <button className="px-8 py-3 rounded-xl bg-blue-600 border-2 border-transparent text-white text-sm">
                    Join now
                </button>
                <Link
                    href={'/signup'}
                    className="px-8 py-3 rounded-xl text-center hover:bg-blue-600 text-blue-600 hover:text-white border-2 border-blue-600 text-sm"
                >
                    Signup
                </Link>
            </div>
        </div>
    );
}
