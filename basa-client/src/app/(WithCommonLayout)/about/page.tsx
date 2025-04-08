'use client';
import { useRouter } from "next/navigation";
import { CldImage } from 'next-cloudinary';

export default function AboutUsPage() {
  const router = useRouter();
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center py-20 px-4 sm:py-24 md:py-32 lg:py-40 bg-[#FDDBD1] text-gray-800 -mx-24">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">About Us</h1>
        <p className="text-lg sm:text-xl mt-4 max-w-3xl mx-auto">
          Welcome to HomeRental, your trusted platform for finding the perfect home. We connect landlords and tenants seamlessly with smart rental solutions.
        </p>
      </div>
  
      {/* Content Section 1 */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">Our Mission</h2>
          <p className="mt-2 sm:mt-4 text-lg sm:text-xl text-gray-800">
            At HomeRental, we aim to make renting easy, efficient, and hassle-free. Whether you're a tenant looking for a home or a landlord seeking reliable tenants, we've got you covered.
          </p>
        </div>
        <CldImage 
          src="undraw_mobile-payments_0u42_tjpkgo"
          alt="Team Work"
          width={500}
          height={500}
          className="mx-auto"
        />
      </div>
  
      {/* Content Section 2 */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 md:px-12">
        <CldImage 
          src="undraw_product-explainer_3pbe_vkerrf"
          alt="Rental Home"
          width={500}
          height={500}
          className="mx-auto"
        />
        <div className="mt-6 md:mt-0 md:pl-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">Why Choose Us?</h2>
          <ul className="space-y-2 text-lg sm:text-xl text-gray-800 list-disc list-inside">
            <li>Verified rental listings with transparent pricing</li>
            <li>Seamless booking and secure transactions</li>
            <li>Dedicated support for landlords and tenants</li>
            <li>AI-powered search for your perfect home</li>
          </ul>
        </div>
      </div>
  
      {/* Footer CTA */}
      <div className="mt-16 text-gray-800 pt-20 pb-10 px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">Find Your Perfect Rental Today!</h2>
        <p className="text-lg sm:text-xl mt-2 text-gray-800">Join thousands of satisfied tenants and landlords on HomeRental.</p>
        <button 
          className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow transition"
          onClick={() => router.push("/all-rentals")}
        >
          Get Started
        </button>
      </div>
    </div>
  );  
}
