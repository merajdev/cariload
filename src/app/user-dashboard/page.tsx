'use client';

import React, { FC, useState, useEffect } from "react";
import { logout } from "@/redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/utils/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaArrowLeftLong, FaBox, FaLocationDot } from "react-icons/fa6";
import { Dashboard } from "./Dashboard";
import { Profile } from "./Profile";
import { Setting } from "./Setting";
import useAuth from '@/hooks/useAuth';
import Spinner from '@/components/Spinner';
import { FaTruck, FaUserCircle } from "react-icons/fa";
import { TbGpsFilled } from "react-icons/tb";
import { MdContactSupport, MdDashboard, MdPayments } from "react-icons/md";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import MyOrder from "./MyOrder";
import NewOrder from "./NewOrder";
import TrackOrder from "./TrackOrder";
import SavedAddress from "./SavedAddress";
import PaymentHistory from "./PaymentHistory";
import SupportHelp from "./SupportHelp";
import { getUserDetails } from "@/utils/getUserDetails";
import { Notification } from "./Notification";

type View = "dashboard" | "myOrders" | "newOrders" | "trackOrders" | "savedAddresses" | "paymentHistory" | "notifications" | "supportHelp" | "profile" | "settings";

const UserDashboard: FC = () => {
  const { isAuthenticated, isLoading, userRole } = useAuth();
  const [view, setView] = useState<View>("dashboard");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string, email: string; role: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      router.push('/login'); // Redirect to login if token is not found
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
      router.push('/login');
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
      label: "My Orders",
      href: "#",
      icon: (
        <FaBox className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "myOrders" as View,
    },
    {
      label: "Create New Order",
      href: "#",
      icon: (
        <FaTruck className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "newOrders" as View,
    },
    {
      label: "Track My Order",
      href: "#",
      icon: (
        <TbGpsFilled className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "trackOrders" as View,
    },
    {
      label: "Saved Addresses",
      href: "#",
      icon: (
        <FaLocationDot className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "savedAddresses" as View,
    },
    {
      label: "Payment History",
      href: "#",
      icon: (
        <MdPayments className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "paymentHistory" as View,
    },

    {
      label: "Notifications",
      href: "#",
      icon: (
        <IoIosNotifications className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "notifications" as View,
    },
    {
      label: "Support & Help",
      href: "#",
      icon: (
        <MdContactSupport className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "supportHelp" as View,
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
      case "myOrders":
        return <MyOrder />;
      case "newOrders":
        return <NewOrder />;
      case "trackOrders":
        return <TrackOrder />;
      case "savedAddresses":
        return <SavedAddress />;
      case "paymentHistory":
        return <PaymentHistory />;
      case "notifications":
        return <Notification />;
      case "supportHelp":
        return <SupportHelp />;
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

  if (!isAuthenticated || userRole !== 'user') {
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
        (<div className="min-h-screen flex items-center justify-center">
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
                  setView("profile")
                }
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex-1 rounded-t-2xl md:rounded-l-2xl md:rounded-r-none border p-4 md:p-6 bg-white max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <Link href='/' className="font-normal flex space-x-2 items-center text-sm text-neutral-700 hover:text-neutral-900 hover:underline py-1 relative z-20">
              <FaArrowLeftLong className="me-2" />
              Back to Home
            </Link>
            {/* Create a load */}
            <Link
              href='#'
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg"
              onClick={() => setView("newOrders")}
            >
              Create New Order
            </Link>
          </div>
          {renderView()}
        </div>
      </div>

    </>
  );
};

// const Logo = () => {
//   return (
//     <Link
//       href="/"
//       className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
//     >
//       <div className="h-5 w-6 bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
//       <motion.span
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="font-medium text-black whitespace-pre"
//       >
//         Cariload
//       </motion.span>
//     </Link>
//   );
// };


export default UserDashboard;
