"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { BsDashLg } from "react-icons/bs";

export function FAQSection() {
    const [toggles, setToggles] = useState([false, false, false, false]);

    const toggleFAQ = (index: number) => {
        const newToggles = [...toggles];
        newToggles[index] = !newToggles[index];
        setToggles(newToggles);
    };

    return (
        <>
            <div className="md:w-10/12 mx-auto flex flex-col items-center justify-center px-4 py-10">
                <div className="block w-full">
                    <h5 className="text-xs font-bold flex items-center justify-center mb-3 text-neutral-500">
                        <BsDashLg className="text-3xl text-indigo-500 me-2" />
                        QUESTIONS
                        <BsDashLg className="text-3xl text-indigo-500 ms-2" />
                    </h5>
                    <h1 className="text-2xl md:text-4xl text-center font-bold mb-8 text-neutral-800 leading-10 tracking-wide">
                        Frequently Asked Questions
                    </h1>
                    <div className="block gap-4">
                        <div className="flex gap-3 p-4 md:p-6 bg-white mb-3 border-2 border-indigo-100 rounded-xl">
                            <div className="block w-full">
                                <button
                                    onClick={() => toggleFAQ(0)}
                                    className="w-full flex justify-between items-center text-sm text-neutral-500"
                                >
                                    What is Cari Load?
                                    <FaChevronDown
                                        className={`text-sm ${toggles[0] ? "transform rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <p className={`text-sm text-neutral-500 mt-3 ${toggles[0] ? "" : "hidden"}`}>
                                    Cari Load is a one-stop solution for logistics, providing a dynamic environment where truck owners connect with load owners in real-time.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 p-4 md:p-6 mb-3 bg-white border-2 border-indigo-100 rounded-xl">
                            <div className="block w-full">
                                <button
                                    onClick={() => toggleFAQ(1)}
                                    className="w-full flex justify-between items-center text-sm text-neutral-500"
                                >
                                    How does Cari Load work?
                                    <FaChevronDown
                                        className={`text-sm ${toggles[1] ? "transform rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <p className={`text-sm text-neutral-500 mt-3 ${toggles[1] ? "" : "hidden"}`}>
                                    Cari Load is a one-stop solution for logistics, providing a dynamic environment where truck owners connect with load owners in real-time.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 p-4 md:p-6 mb-3 bg-white border-2 border-indigo-100 rounded-xl">
                            <div className="block w-full">
                                <button
                                    onClick={() => toggleFAQ(2)}
                                    className="w-full flex justify-between items-center text-sm text-neutral-500"
                                >
                                    What are the benefits of using Cari Load?
                                    <FaChevronDown
                                        className={`text-sm ${toggles[2] ? "transform rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <p className={`text-sm text-neutral-500 mt-3 ${toggles[2] ? "" : "hidden"}`}>
                                    Cari Load is a one-stop solution for logistics, providing a dynamic environment where truck owners connect with load owners in real-time.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 p-4 md:p-6 mb-3 bg-white border-2 border-indigo-100 rounded-xl">
                            <div className="block w-full">
                                <button
                                    onClick={() => toggleFAQ(3)}
                                    className="w-full flex justify-between items-center text-sm text-neutral-500"
                                >
                                    How can I get started with Cari Load?
                                    <FaChevronDown
                                        className={`text-sm ${toggles[3] ? "transform rotate-180" : ""
                                            }`}
                                    />
                                </button>
                                <p className={`text-sm text-neutral-500 mt-3 ${toggles[3] ? "" : "hidden"}`}>
                                    Cari Load is a one-stop solution for logistics, providing a dynamic environment where truck owners connect with load owners in real-time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
