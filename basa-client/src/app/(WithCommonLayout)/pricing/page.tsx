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

export default function PricingPage() {
  const [role, setRole] = useState("tenant");

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div 
        className={`flex flex-col items-center justify-center text-gray-800 px-6 py-16 transition-all duration-500 -mx-28
        ${role === "tenant" ? "bg-[#FDDBD1]" : "bg-[#D1E8FD]"}`}
      >
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Pricing</h1>
        <p className="text-lg md:text-2xl mt-2 text-center">
          Know how much our platform costs tenants and landlords
        </p>

        {/* Role Toggle */}
        <div className="bg-white text-black mt-6 rounded-full flex w-full max-w-sm">
          <button 
            className={`px-4 py-3 font-semibold rounded-full w-1/2 transition ${
              role === "tenant" ? "bg-orange-500 text-white" : "bg-white"
            }`}
            onClick={() => setRole("tenant")}
          >
            Tenant
          </button>
          <button 
            className={`px-4 py-3 font-semibold rounded-full w-1/2 transition ${
              role === "landlord" ? "bg-orange-500 text-white" : "bg-white"
            }`}
            onClick={() => setRole("landlord")}
          >
            Landlord
          </button>
        </div>
      </div>
      
      {/* Body Section */}
      <div className="w-full flex flex-col items-center mt-8 px-4 md:px-8 lg:px-16">
        {role === "tenant" ? (
          <div className="flex flex-col gap-10">
            {/* Tenant Pricing Section */}
            <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-lg w-full max-w-4xl gap-6">
              <div className="text-center md:text-left">
                <h2 className="font-extrabold text-2xl md:text-4xl mb-4">Flexible Pricing for Every Tenant</h2>
                <p className="text-lg md:text-2xl text-gray-800">
                  Choose a plan that fits your needs—whether you're browsing for free or getting early access to premium listings.
                </p>
              </div>
              <CldImage
                src="undraw_location-tracking_q3yd-removebg-preview_1_owm1qn"
                alt="Pricing Options"
                width={400}
                height={400}
                className="w-full max-w-[300px] md:max-w-[400px]"
              />
            </div>

            <div className="flex flex-col md:flex-row-reverse items-center justify-between p-4 rounded-lg w-full max-w-4xl gap-6">
              <div className="text-center md:text-left">
                <h2 className="font-extrabold text-2xl md:text-4xl mb-4">No Hidden Fees, Just Transparency</h2>
                <p className="text-lg md:text-2xl text-gray-800">
                  Our simple pricing ensures no surprises. Pay only for the features you need, with secure transactions.
                </p>
              </div>
              <CldImage
                src="undraw_contract_upwc_odv1o0"
                alt="Secure Transactions"
                width={400}
                height={400}
                className="w-full max-w-[300px] md:max-w-[400px]"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Landlord Pricing Section */}
            <div className="flex flex-col items-center justify-center w-full px-4">
              <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-lg w-full max-w-4xl gap-6">
                <div className="text-center md:text-left">
                  <h2 className="font-extrabold text-2xl md:text-4xl mb-4">Affordable Plans for Every Landlord</h2>
                  <p className="text-lg md:text-2xl">
                    Whether you manage one property or a hundred, our pricing adapts to your needs, with flexible subscription or pay-per-listing options.
                  </p>
                </div>
                <CldImage
                  src="undraw_contract_upwc_odv1o0"
                  alt="Flexible Plans"
                  width={400}
                  height={400}
                  className="w-full max-w-[300px] md:max-w-[400px]"
                />
              </div>

              <div className="flex flex-col md:flex-row-reverse items-center justify-between p-6 rounded-lg w-full max-w-4xl gap-6">
                <div className="text-center md:text-left">
                  <h2 className="font-extrabold text-2xl md:text-4xl mb-4">Maximize Your Profits</h2>
                  <p className="text-lg md:text-2xl">
                    Get more exposure for your listings with premium placements, featured ads, and automated tenant screening—all included in our Pro Plan.
                  </p>
                </div>
                <CldImage
                  src="undraw_location-tracking_q3yd-removebg-preview_1_owm1qn"
                  alt="Maximize Profits"
                  width={400}
                  height={400}
                  className="w-full max-w-[300px] md:max-w-[400px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
