'use client'
import { CldImage } from "next-cloudinary";

export default function HeroSection() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-[#ff4b27ff] px-6 -mx-24">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center -mt-8">FIND YOUR NEXT HOME</h1>
        <p className="text-2xl text-center mt-2 py-5">Search through thousands of listings to find your dream home.</p>
        
        <div className="flex items-center bg-white rounded p-2 mt-6 w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for a location..."
            className="flex-1 px-4 py-2 text-black outline-none rounded-l-full"
          />
          <button className="bg-[#ff4b27ff] px-6 py-2 text-white font-semibold rounded hover:bg-orange-500">
            Search
          </button>
        </div>
        <CldImage
         src="undraw_for-sale_7qjb-removebg-preview_bjvyak"
       alt="Location's Photo"
      width={700}
      height={500}
      className="mt-8 -mb-10"
    />
      </div>
    );
  }
  