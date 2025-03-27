'use client';
import { useRouter } from "next/navigation";
import { CldImage } from 'next-cloudinary';

export default function AboutUsPage() {
  const router = useRouter();
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center py-32 px-4 bg-[#FDDBD1] text-gray-800 -mx-28">
        <h1 className="text-5xl font-extrabold">About Us</h1>
        <p className="text-xl mt-4 max-w-3xl mx-auto">
          Welcome to HomeRental, your trusted platform for finding the perfect home. We connect landlords and tenants seamlessly with smart rental solutions
        </p>
      </div>
          
      {/* Content Section */}
      <div className="mt-12 grid md:grid-cols-2 gap-12 px-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Our Mission</h2>
          <p className="mt-4 text-2xl text-gray-800">
            At HomeRental, we aim to make renting easy, efficient, and hassle-free. Whether you're a tenant looking for a home or a landlord seeking reliable tenants, we've got you covered.
          </p>
        </div>
        <CldImage 
          src="undraw_mobile-payments_0u42_tjpkgo"
          alt="Team Work"
          width={500}
          height={500}
        />
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-12 items-center px-12">
        <CldImage 
          src="undraw_product-explainer_3pbe_vkerrf"
          alt="Rental Home"
          width={500}
          height={500}
        />
        <div className='pl-6'>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Why Choose Us?</h2>
            <p className="text-2xl"> 1.Verified rental listings with transparent pricing</p>
            <p className="text-2xl"> 2.Seamless booking and secure transactions</p>
            <p className="text-2xl">3.Dedicated support for landlords and tenants</p>
            <p className="text-2xl"> 4.AI-powered search for your perfect home</p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-16 text-gray-800 pt-20 pb-10 px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Find Your Perfect Rental Today!</h2>
        <p className="mt-2 text-2xl text-gray-800">Join thousands of satisfied tenants and landlords on HomeRental.</p>
        <button className="mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow"
         onClick={() => router.push("/all-rentals")}>Get Started</button>
      </div>
    </div>
  );
}
