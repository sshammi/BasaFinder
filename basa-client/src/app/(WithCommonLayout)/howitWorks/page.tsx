'use client'

import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { Home, MessageSquare, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Manage your listings",
    description:
      "Manage your listings with real-time updates and customizable settings to control availability and pricing and specify the type of tenants you prefer.",
    icon: <Home size={40} className="text-orange-500" />,
  },
  {
    title: "Communicate with tenants",
    description:
      "Easily chat with tenants using our message center, exchange documents and save time by setting Quick Replies for common questions.",
    icon: <MessageSquare size={40} className="text-orange-500" />,
  },
  {
    title: "Secure bookings",
    description:
      "Ensure safety and reliability with verified tenants and a secure payment system for collecting rental payments smoothly.",
    icon: <ShieldCheck size={40} className="text-orange-500" />,
  },
];

export default function HowItWorksPage() {
  const [role, setRole] = useState("tenant");

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div 
        className={`flex flex-col items-center justify-center min-h-[50vh] text-gray-800 p-10 sm:px-6 md:px-12 lg:px-24 transition-all duration-500 -mx-28 ${role === "tenant" ? "bg-[#FDDBD1]" : "bg-[#D1E8FD]"}`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center">How It Works</h1>
        <p className="text-lg sm:text-xl text-center">Learn how our platform helps tenants and landlords.</p>
        
        {/* Role Switcher */}
        <div className="bg-white text-black mt-6 rounded-full flex gap-2 w-full max-w-md shadow-md">
          <button 
            className={`px-4 py-3 font-semibold rounded-full w-1/2 text-sm sm:text-base transition-all ${role === "tenant" ? "bg-orange-500 text-white" : "bg-white text-gray-700"}`}
            onClick={() => setRole("tenant")}
          >
            Tenant
          </button>
          <button 
            className={`px-4 py-3 font-semibold rounded-full w-1/2 text-sm sm:text-base transition-all ${role === "landlord" ? "bg-orange-500 text-white" : "bg-white text-gray-700"}`}
            onClick={() => setRole("landlord")}
          >
            Landlord
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col items-center mt-8 px-4 sm:px-8 md:px-16">
        {role === "tenant" ? (
          <div className="flex flex-col gap-10 w-full max-w-5xl">
            {/* First Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 rounded-lg">
              <div className="text-center md:text-left">
                <h2 className="font-extrabold text-2xl sm:text-4xl mb-6">Easily Find Your Ideal Home</h2>
                <p className="text-lg sm:text-xl text-gray-800">Explore a variety of rental properties tailored to your needs, all in one place.</p>
              </div>
              <CldImage
                src="undraw_product-explainer_3pbe_vkerrf"
                alt="Property Browsing"
                width={400}
                height={400}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md"
              />
            </div>

            {/* Second Section */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 p-4 rounded-lg">
              <CldImage
                src="undraw_location-tracking_q3yd_fsrek7"
                alt="Location Tracking"
                width={400}
                height={400}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md"
              />
              <div className="text-center md:text-left">
                <h2 className="font-extrabold text-2xl sm:text-4xl mb-6">Hassle-Free Rental Applications</h2>
                <p className="text-lg sm:text-xl text-gray-800">Apply for your preferred rental with just a few clicks—no paperwork, no hassle.</p>
              </div>
            </div>

            {/* Third Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 rounded-lg">
              <div className="text-center md:text-left">
                <h2 className="font-extrabold text-2xl sm:text-4xl mb-6">Secure and Quick Approvals</h2>
                <p className="text-lg sm:text-xl text-gray-800">Get verified quickly and communicate with landlords securely for a smooth rental process.</p>
              </div>
              <CldImage
                src="undraw_mobile-payments_0u42_tjpkgo"
                alt="Secure Payments"
                width={400}
                height={400}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            {/* Features Grid */}
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="p-6 border rounded-lg shadow-lg bg-[#D1E8FD] text-center flex flex-col items-center">
                  {feature.icon}
                  <h3 className="text-lg sm:text-xl font-semibold mt-4">{feature.title}</h3>
                  <p className="text-gray-600 mt-2">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Landlord Sections */}
            <div className="flex flex-col items-center justify-center w-full">
              {/* First Section */}
              <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-lg w-full max-w-5xl gap-6">
                <div className="text-center md:text-left">
                  <h2 className="font-extrabold text-2xl sm:text-4xl mb-6">Effortless Listing and Management</h2>
                  <p className="text-lg sm:text-xl">Create and manage property listings with ease. Our calendar sync saves you time and effort.</p>
                </div>
                <CldImage
                  src="undraw_product-explainer_3pbe_vkerrf"
                  alt="Listing Management"
                  width={400}
                  height={400}
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md"
                />
              </div>

              {/* Second Section */}
              <div className="flex flex-col md:flex-row-reverse items-center justify-between p-6 rounded-lg w-full max-w-5xl gap-6">
                <div className="text-center md:text-left">
                  <h2 className="font-extrabold text-2xl sm:text-4xl mb-6">Remote Tenant Matching</h2>
                  <p className="text-lg sm:text-xl">Use filters to find the right tenants and communicate via our secure messaging system.</p>
                </div>
                <CldImage
                  src="undraw_contract_upwc_odv1o0"
                  alt="Tenant Matching"
                  width={400}
                  height={400}
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
