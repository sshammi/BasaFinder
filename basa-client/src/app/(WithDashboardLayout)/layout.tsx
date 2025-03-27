"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu} from "react-icons/fi";
import { protectedRoutes } from "@/constants";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineRequestPage } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { FaListCheck } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const {user,setIsLoading} = useUser();

  const handleLogout = () => {
      logout();
      setIsLoading(true);
      if (protectedRoutes.some((route) => pathName.match(route))) {
        router.push("/");
     }
    };

  const renderSidebarLinks = () => {
    if (user?.role === "admin") {
      return (
        <>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <MdDashboard />
            <Link href="/admin/dashboard">Dashboard</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <AiOutlineHome />
            <Link href="/">Home</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27]-700 rounded cursor-pointer flex items-center gap-2">
            <FaUser />
            <Link href="/admin/users">Users</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <FaListCheck />
            <Link href="/admin/rentals">Listings</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <IoMdSettings />
            <Link href="/change-pass">Change Password</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <IoMdSettings />
            <Link href="/profileUpdate">Profile Update</Link>
          </li>
        </>
      );
    }

    if (user?.role === "landlord") {
      return (
        <>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
          <MdDashboard />
            <Link href="/landlord/dashboard">Dashboard</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <AiOutlineHome />
            <Link href="/">Home</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <FaListCheck />
            <Link href="/landlord/my-listings">My Listings</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <MdOutlineRequestPage />
            <Link href="/landlord/rental-requests">Requests</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <IoMdSettings />
            <Link href="/change-pass">Change Password</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <IoMdSettings />
            <Link href="/profileUpdate">Profile Update</Link>
          </li>
        </>
      );
    }

    if (user?.role === "tenant") {
      return (
        <>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <MdDashboard />
            <Link href="/tenant/dashboard">Dashboard</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <AiOutlineHome />
            <Link href="/">Home</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
           <MdOutlineRequestPage />
            <Link href="/tenant/requests">Rentals</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <IoMdSettings />
            <Link href="/change-pass">Change Password</Link>
          </li>
          <li className="p-2 hover:bg-[#FF4B27] rounded cursor-pointer flex items-center gap-2">
            <IoMdSettings />
            <Link href="/profileUpdate">Profile Update</Link>
          </li>
        </>
      );
    }

    return null;
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Navbar */}
      <div className="sm:hidden fixed top-0 left-0 w-full bg-[#FF4B27] text-white p-4 z-50 flex items-center">
        <button
          className="text-white p-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
         <FiMenu/>
        </button>
        <span className="text-xl font-bold ml-4">BasaFinder</span>
      </div>

      {/* Sidebar for Mobile (Hidden by Default) */}
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-[#FF4B27] text-white p-4 z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:hidden`}
      >
        <ul className="space-y-2 mt-16" onClick={() => setIsOpen(false)}>
          {renderSidebarLinks()}
        </ul>
        <button
          onClick={handleLogout}
          className="w-full p-2 mt-12 bg-white text-gray-800 rounded"
        >
          Logout
        </button>
      </div>

      {/* Sidebar for Medium & Large Devices (Always Visible) */}
      <div className="hidden sm:block w-64 h-screen bg-[#FF4B27] text-white p-4 fixed top-0 left-0 z-40">
        <h2 className="text-xl font-bold mb-6">BasaFinder</h2>
        <ul className="space-y-2">
          {renderSidebarLinks()}
        </ul>
        <button
          onClick={handleLogout}
          className="w-full p-2 mt-12 bg-white text-[#FF4B27] rounded"
        >
          Logout
        </button>
      </div>

      {/* Main content area */}
      <div className="flex-1 sm:ml-64 p-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
