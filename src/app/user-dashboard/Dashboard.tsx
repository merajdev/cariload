import Spinner from "@/components/Spinner";
import { getUserDetails } from "@/utils/getUserDetails";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import banner from "/public/images/banner.svg"
import Image from "next/image";
import { FaTruckLoading } from "react-icons/fa";

export const Dashboard = () => {
    const [user, setUser] = useState<{ name: string, email: string; role: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const authData = localStorage.getItem('authData');
        if (authData) {
            const { token } = JSON.parse(authData);
            getUserDetails(token)
                .then((data) => {
                    setUser(data.user);
                })
                .catch((err) => {
                    setError(err.message);
                    router.push('/login'); // Redirect to login if fetching user details fails
                });
        } else {
            router.push('/'); // Redirect to login if token is not found
        }
    }, [router]);

    if (error) {
        return <div className="text-red-500">{error}</div>; // Display error message
    }

    if (!user) {
        return (
            <div className="min-h-[90vh] flex items-center justify-center">
                <Spinner size="w-12 h-12" color="#3498db" />
            </div>
        );
    }

    return (
        <>
            <div className="relative w-full h-32 md:h-64 rounded-lg mb-4">
                {/* Cover Image */}
                <Image
                    src={banner}
                    alt="Cover"
                    className="w-full h-full object-cover rounded-lg"
                />
                {/* User Image and Welcome Message */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-xl px-4 md:text-3xl text-center font-semibold text-neutral-100">
                        Welcome, {user ? user.name : "User"}!
                    </h2>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div className="p-4 md:p-10 bg-white rounded-lg border-2 flex-1">
                    <div className="flex items-center sm:justify-center gap-3">
                        <div className="bg-blue-100 rounded-full p-4 md:p-6">
                            <FaTruckLoading className="text-4xl text-blue-500" />
                        </div>
                        <div className="block">
                            <p className="text-neutral-800 text-md">Total orders</p>
                            <h1 className="text-4xl font-bold">11</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-10 bg-white rounded-lg border-2 flex-1">
                    <div className="flex items-center sm:justify-center gap-3">
                        <div className="bg-red-100 rounded-full p-4 md:p-6">
                            <FaTruckLoading className="text-4xl text-red-500" />
                        </div>
                        <div className="block">
                            <p className="text-neutral-800 text-md">Pending orders</p>
                            <h1 className="text-4xl font-bold">02</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-10 bg-white rounded-lg border-2 flex-1">
                    <div className="flex items-center sm:justify-center gap-3">
                        <div className="bg-yellow-100 rounded-full p-4 md:p-6">
                            <FaTruckLoading className="text-4xl text-yellow-500" />
                        </div>
                        <div className="block">
                            <p className="text-neutral-800 text-md">Active orders</p>
                            <h1 className="text-4xl font-bold">03</h1>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-10 bg-white rounded-lg border-2 flex-1">
                    <div className="flex items-center sm:justify-center gap-3">
                        <div className="bg-green-100 rounded-full p-4 md:p-6">
                            <FaTruckLoading className="text-4xl text-green-500" />
                        </div>
                        <div className="block">
                            <p className="text-neutral-800 text-md">Completed orders</p>
                            <h1 className="text-4xl font-bold">06</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};