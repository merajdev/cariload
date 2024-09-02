"use client";
import React, { use, useEffect, useState } from "react";
import { logout } from "@/redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUser,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/utils/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getUserDetails } from "@/utils/getUserDetails";
import Spinner from "@/components/Spinner";


type View = "dashboard" | "profile" | "settings";

export function SidebarDemo() {
  const [view, setView] = useState<View>("dashboard");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

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
        <IconBrandTabler className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "dashboard" as View,
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "profile" as View,
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      view: "settings" as View,
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 h-5 w-5 flex-shrink-0" />
      ),
      action: handleLogout,
    },
  ];

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Setting />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 w-full flex-1 mx-auto border border-neutral-200 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={() => {
                    if (link.view) {
                      setView(link.view);
                    } else if (link.action) {
                      link.action();
                    }
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Profile",
                href: "#",
                icon: <IconUser className="text-neutral-700 h-5 w-5" />,
              }}
              onClick={() => setView("profile")}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 rounded-tl-lg border p-4 md:p-10 bg-white max-h-screen overflow-y-auto">{renderView()}</div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black whitespace-pre"
      >
        Cariload
      </motion.span>
    </Link>
  );
};

const Dashboard = () => {
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
      router.push('/login'); // Redirect to login if token is not found
    }
  }, [router]);

  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error message
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="w-12 h-12" color="#3498db" />
        {/* Customize size and color */}
      </div>
    ); // You can add a spinner or skeleton here
  }

  return (
    <div className="p-4 md:p-10 bg-white rounded-lg shadow-md flex-1">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <p>{user.email}</p>
      <p>{user.name}</p>
      <p>{user.role}</p>

    </div>
  );
};
const Profile = () => {
  return (
    <div className="p-4 md:p-10 bg-white rounded-lg shadow-md flex-1">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Manage your profile here.</p>
    </div>
  );
};

const Setting = () => {
  return (
    <div className="p-4 md:p-10 bg-white rounded-lg shadow-md flex-1">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p>Update your settings here.</p>
    </div>
  );
};
