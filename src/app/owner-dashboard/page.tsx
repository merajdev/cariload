'use client';

import React, { FC, useState, useEffect } from "react";
import { logout } from "@/redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/utils/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaArrowLeftLong, FaBox, FaLocationDot, FaTruckFast } from "react-icons/fa6";
import { Dashboard } from "./Dashboard";
import { Profile } from "./profile/Profile";
import { Setting } from "./settings/Setting";
import useAuth from '@/hooks/useAuth';
import Spinner from '@/components/Spinner';
import { FaBell, FaTruck, FaUserCircle, FaUserFriends } from "react-icons/fa";
import { TbGpsFilled } from "react-icons/tb";
import { MdContactSupport, MdDashboard, MdPayments } from "react-icons/md";
import { IoIosNotifications, IoMdAnalytics, IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { getUserDetails } from "@/utils/getUserDetails";
import { toast } from "react-toastify";
import TruckManagement from "./my-truck/page";
import TripDelivery from "./trip-deliveries/page";
import GoodRecord from "./good-record/page";
import MaintenanceAlert from "./maintenance-alert/page";
import DriverManagement from "./drivers/page";
import PaymentEarning from "./payment-earning/page";
import ReportAnalytic from "./report-analytics/page";
import { BsFillFileEarmarkBarGraphFill } from "react-icons/bs";

type View =
  "dashboard" |
  "myTruck" |
  "drivers" |
  "tripDelivery" |
  "goodRecords" |
  "maintenanceAlert" |
  "paymentEarning" |
  "reportAnalytic" |
  "profile" |
  "settings";

const OwnerDashboard: FC = () => {
  const { isAuthenticated, isLoading, userRole } = useAuth();
  const [view, setView] = useState<View>("dashboard");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string, email: string; role: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authData = localStorage.getItem('authData');
      if (authData) {
        try {
          const { role } = JSON.parse(authData);

          if (role !== 'owner') {
            router.push('/');
            return;
          }

          const { token } = JSON.parse(authData);
          getUserDetails(token)
            .then((data) => {
              setUser(data.user);
            })
            .catch((err) => {
              setError(err.message);
              router.push('/login'); // Redirect to login if fetching user details fails
            });
        } catch (error) {
          console.error("Error parsing authData:", error);
          router.push('/login'); // Redirect if parsing fails
        }
      } else {
        router.push('/login'); // Redirect to login if token is not found
      }
    }
  }, [router]);


  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error message
  }

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      localStorage.removeItem('authData');
      dispatch(logout());

      toast.success('Logout successful!', {
        position: "top-right",
      });

      // Delay to allow UI update before redirect
      setTimeout(() => {
        router.push('/login');
      }, 1000);

    } catch (error: any) {
      console.error('Logout failed:', error.message);
    }
  };

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <MdDashboard className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "dashboard" as View,
    },
    {
      label: "Truck Management",
      href: "#",
      icon: (
        <FaTruck className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "myTruck" as View,
    },
    {
      label: "Drivers Management",
      href: "#",
      icon: (
        <FaUserFriends className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "drivers" as View,
    },
    {
      label: "Trips & Deliveries",
      href: "#",
      icon: (
        <FaTruckFast className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "tripDelivery" as View,
    },
    {
      label: "Good Records",
      href: "#",
      icon: (
        <BsFillFileEarmarkBarGraphFill className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "goodRecords" as View,
    },
    {
      label: "Maintenance Alert",
      href: "#",
      icon: (
        <FaBell className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "maintenanceAlert" as View,
    },

    {
      label: "Payment & Earning",
      href: "#",
      icon: (
        <MdPayments className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "paymentEarning" as View,
    },
    {
      label: "Report & Analytics",
      href: "#",
      icon: (
        <IoMdAnalytics className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "reportAnalytic" as View,
    },
    {
      label: "Account Settings",
      href: "#",
      icon: (
        <IoMdSettings className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "settings" as View,
    },
    {
      label: "Logout",
      href: "/login",
      icon: (
        <IoLogOut className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      className: "text-red-500",
      action: handleLogout,
    },
  ];

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return <Dashboard />;
      case "myTruck":
        return <TruckManagement />;
      case "drivers":
        return <DriverManagement />;
      case "tripDelivery":
        return <TripDelivery />;
      case "goodRecords":
        return <GoodRecord />;
      case "maintenanceAlert":
        return <MaintenanceAlert />;
      case "paymentEarning":
        return <PaymentEarning />;
      case "reportAnalytic":
        return <ReportAnalytic />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Setting />;
      default:
        return <Dashboard />;
    }
  };

  // Optionally show a loading state while checking
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner color="#3498db" />
        {/* Customize size and color */}
      </div>
    );
  }

  if (!isAuthenticated || userRole !== 'owner') {
    return null; // The user will be redirected, so this can be null or a different UI
  }
  const handleLinkClick = (view?: View, action?: () => void) => {
    if (action) {
      action();
    } else if (view) {
      setView(view);
    }
    setOpen(false); // Close the sidebar after a link is clicked
  };

  return (
    <>
      {
        isLoading &&
        (<div className="min-h-[92vh] flex items-center justify-center">
          <Spinner color="#3498db" />
          {/* Customize size and color */}
        </div>)
      }

      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 w-full flex-1 mx-auto border border-neutral-200 overflow-hidden",
          "h-screen"
        )}
      >
        <Sidebar open={open} setOpen={setOpen} animate={true}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {/* <Logo /> */}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    onClick={() => handleLinkClick(link.view, link.action)}
                  />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: user?.name,
                  href: "#",
                  icon: <FaUserCircle className="text-neutral-700 h-5 w-5" />,
                }}
                onClick={() =>
                  handleLinkClick("profile")
                }
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex-1 rounded-t-2xl md:rounded-l-2xl md:rounded-r-none border p-4 md:p-6 bg-white max-h-screen overflow-y-auto">
          <div className="md:flex justify-between items-center mb-3">
            <Link href='/' className="font-normal flex space-x-2 items-center text-sm text-neutral-700 hover:text-neutral-900 hover:underline py-1 relative z-20">
              <FaArrowLeftLong className="me-2" />
              Back to Home
            </Link>

            {/* <div className="flex gap-2">
              <Link
                href='#'
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2 px-4 rounded-lg"
              // onClick={() => setView()}
              >
                Add New Truck
              </Link>

              <Link
                href='#'
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2 px-4 rounded-lg"
              // onClick={() => setView()}
              >
                Add New Driver
              </Link>
            </div> */}
          </div>
          {renderView()}
        </div>
      </div>

    </>
  );
};


export default OwnerDashboard;

