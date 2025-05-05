"use client";
import { Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/constants";
import { CldImage } from "next-cloudinary";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathName.match(route))) {
      router.push("/");
   }
  };

  // Role-based dashboard redirection
  //console.log(user);
  const getDashboardLink = () => {
    if (user?.role === "admin") return "/admin/dashboard";
    if (user?.role === "landlord") return "/landlord/dashboard";
    if (user?.role === "tenant") return "/tenant/dashboard";
    return "/login";
  };
  return (
    <header className="border-b w-full bg-white px-10">
      <div className="container flex justify-between items-center mx-auto h-16 px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black flex items-center gap-2">
        <CldImage
         src="favicon1_oh8a3w"
         alt="Location's Photo"
         width={24}
         height={24}
        />
          <span className="ml-2 text-[#FF4B27]">BasaFinder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[#FF4B27]">
          <Link href="/all-rentals">All Rentals</Link>
          <Link href="/about">About Us</Link>
          <Link href="/howitWorks">How it Works</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/help">Help</Link>
        
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                My Account
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="text-white bg-[#FF4B27] border-[#FF4B27]">
            <DropdownMenuItem>
                  <Link href={getDashboardLink()}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-white bg-[#FF4B27] cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-[#FF4B27]"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#FF4B27] text-white">
          <div className="flex flex-col space-y-2 py-3 px-4 text-white">
            <Link href="/all-rentals" onClick={() => setMenuOpen(false)}>
              All Rentals
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              About Us
            </Link>
            <Link href="/howitWorks" onClick={() => setMenuOpen(false)}>
              How it works
            </Link>
            <Link href="/pricing" onClick={() => setMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="/help" onClick={() => setMenuOpen(false)}>
              Help
            </Link>
            
            {user ? (
              <>
                <Link
              href={getDashboardLink()}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
             </Link>
                <button
                  className="flex items-center gap-2 text-white hover:bg-orange-700 p-2 rounded-md"
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

