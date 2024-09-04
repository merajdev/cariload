"use client";

import React from "react";

export function VideoBanner() {

    return (
        <>
            <div className="relative w-full h-48 md:h-64 overflow-hidden mb-10 md:mb-20">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="https://firebasestorage.googleapis.com/v0/b/meraj-courses.appspot.com/o/banner-video.mp4?alt=media&token=083bbc2f-2cf1-4f2c-83a6-38dd52d0b43b" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="text-center text-white p-4 md:p-16">
                        <h1 className="text-xl md:text-5xl font-bold mb-4">Move with Us, Grow with Us</h1>
                        <p className="text-md md:text-xl">Connecting loads and trucks for a smarter logistics solution.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
