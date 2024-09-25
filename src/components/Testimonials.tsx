"use client";

import React from "react";
import { BsDashLg } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
            className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-indigo-500 text-white p-2 rounded-full shadow-lg z-10"
            onClick={onClick}
        >
            <FaChevronRight />
        </button>
    );
};

const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <button
            className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-indigo-500 text-white p-2 rounded-full shadow-lg z-10"
            onClick={onClick}
        >
            <FaChevronLeft />
        </button>
    );
};

export function Testimonials() {
    const testimonials = [
        {
            text: "I am very happy with the service provided by Cari Load. It has helped me to connect with the right truck owners and get the best deals.",
            author: "Aliyu Musa",
        },
        {
            text: "I am very happy with the service provided by Cari Load. It has helped me to connect with the right truck owners and get the best deals.",
            author: "Aliyu Musa",
        },
        {
            text: "I am very happy with the service provided by Cari Load. It has helped me to connect with the right truck owners and get the best deals.",
            author: "Aliyu Musa",
        },
        {
            text: "I am very happy with the service provided by Cari Load. It has helped me to connect with the right truck owners and get the best deals.",
            author: "Aliyu Musa",
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, 
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <div className="md:w-10/12 mx-auto flex flex-col items-center justify-center px-4 py-10">
                <div className="block w-full">
                    <h5 className="text-xs font-bold flex items-center justify-center mb-3 text-neutral-500">
                        <BsDashLg className="text-3xl text-indigo-500 me-2" />
                        TESTIMONIALS
                        <BsDashLg className="text-3xl text-indigo-500 ms-2" />
                    </h5>
                    <h1 className="text-2xl md:text-4xl text-center font-bold mb-8 text-neutral-800 leading-10 tracking-wide">
                        What Our clients Say
                    </h1>

                    <Slider {...settings} className="w-full relative px-3 flex ">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className=""
                            >
                                <div className="flex flex-col justify-center items-center gap-3 p-4 md:p-6 bg-white mb-3 m-1 border-2 border-indigo-100 rounded-xl min-h-48">
                                    <p className="text-sm text-neutral-500 text-center">
                                        &quot;{testimonial.text}&quot;
                                    </p>
                                    <p className="text-sm text-neutral-500 text-center mt-3">
                                        - {testimonial.author}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
}
