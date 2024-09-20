// components/AccessibilitySection.jsx
import Image from "next/image";
import dashboard1 from "/public/images/dashboard_desk.jpeg";
import dashboard2 from "/public/images/dashboard_mobile.jpeg";
import { BsDashLg } from "react-icons/bs";

export function AccessibilitySection() {
    return (
        <section className="flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-20">
            <div className="md:w-10/12 mx-auto text-center">
                <div className="flex flex-col items-center mb-6">
                    <h5 className="text-xs font-bold flex items-center mb-3 text-white">
                        <BsDashLg className="text-3xl text-white me-2" />
                        ACCESSIBILITY
                        <BsDashLg className="text-3xl text-white ms-2" />
                    </h5>
                    <h1 className="text-center text-2xl md:text-4xl font-bold mb-4 text-white leading-10 tracking-wide">
                        Anywhere, Anytime, Any device.
                    </h1>

                </div>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16">
                    {/* Desktop Mockup */}
                    <div className="group relative">
                        <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                            <Image
                                src={dashboard1} // Replace with actual image
                                alt="Desktop Dashboard Mockup"
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                <p className="text-lg font-semibold">Accessible on Desktop</p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Mockup */}
                    <div className="group relative">
                        <div className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                            <Image
                                src={dashboard2} // Replace with actual image
                                alt="Mobile Dashboard Mockup"
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                                <p className="text-lg font-semibold">Accessible on Mobile</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
