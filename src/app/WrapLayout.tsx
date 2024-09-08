'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Footer } from "@/components/Footer";

const WrapLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Define routes where the Navbar should be hidden
  const hideNavbarRoutes = ["/user-dashboard", "/owner-dashboard", "/signup", "/login", "verify-otp"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <>
    <Provider store={store}>
      {shouldShowNavbar && <Navbar />}
      {children}
      {shouldShowNavbar && <Footer />}
    </Provider>
    </>
  );
};

export default WrapLayout;
