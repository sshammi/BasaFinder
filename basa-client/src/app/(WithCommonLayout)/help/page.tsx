'use client';

import { CldImage } from 'next-cloudinary';
import { useState } from 'react';

export default function HelpPage() {
   const [activeId, setActiveId] = useState<number | null>(null);
    
    const faqs = [
      { id: 1, question: "Is HousingAnywhere a rental agency?", answer: "No, we're not a real estate agency. HousingAnywhere.com is an online platform connecting people looking for their next home with landlords looking for tenants." },
      { id: 2, question: "My booking request has been accepted. What's next?", answer: "Congratulations! Once your booking is accepted, you'll receive a confirmation email with further instructions. You'll need to finalize the payment securely through our platform and sign the rental contract. After completing these steps, coordinate directly with the landlord for move-in details." },
      { id: 3, question: "What if I want to cancel my booking?", answer: (<> You can cancel your booking by navigating to your account dashboard and selecting the cancellation option. Please review our{' '} <a href="https://www.housinganywhere.com/cancellation-policy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer"> Cancellation Policy </a> for details on refund eligibility and any applicable fees. Most cancellations are free if requested within 24 hours of acceptance. </>) },
      { id: 4, question: "Can I visit the place before I book?", answer: "Yes, if the landlord agrees to an in-person viewing. Contact them directly via the platform's messaging system to arrange a visit. If you're unable to visit physically, many landlords offer virtual tours or additional photos/videos upon request." }
    ];
  
    const toggleFAQ = (id: number) => {
      setActiveId(activeId === id ? null : id);
    };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-20 bg-[#FDDBD1] text-gray-800 -mx-28">
        <h1 className="text-4xl md:text-5xl font-extrabold">Help & Support</h1>
        <p className="text-lg md:text-2xl mt-6 mb-10">Need assistance? Find answers to common questions and get support for your rental needs.</p>
      </div>

      {/* Tenant Pricing Section */}
      <div className="flex flex-col gap-10 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-lg w-full max-w-4xl mx-auto">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Flexible Pricing for Every Tenant</h2>
            <p className="text-lg md:text-2xl text-gray-800">Choose a plan that fits your needs—whether you're browsing for free or getting early access to premium listings.</p>
          </div>
          <CldImage src="undraw_location-tracking_q3yd-removebg-preview_1_owm1qn" alt="Pricing Options" width={300} height={300} />
        </div>
        
        <div className="flex flex-col-reverse md:flex-row items-center justify-between p-4 rounded-lg w-full max-w-4xl mx-auto">
          <CldImage src="undraw_contract_upwc_odv1o0" alt="Secure Transactions" width={300} height={300} />
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">No Hidden Fees, Just Transparency</h2>
            <p className="text-lg md:text-2xl text-gray-800">Our simple pricing ensures no surprises. Pay only for the features you need, with secure transactions.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-auto py-8 sm:py-12 max-w-4xl w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Your questions, answered</h1>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b rounded-lg transition-all duration-200 ease-in-out py-3">
              <button onClick={() => toggleFAQ(faq.id)} className="w-full px-6 py-4 text-left flex justify-between items-center hover:text-[#FF4B27]">
                <h2 className="text-lg md:text-2xl font-semibold text-gray-800 hover:text-[#FF4B27]">{faq.question}</h2>
                <svg className={`w-6 h-6 transform transition-transform duration-200 ${activeId === faq.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 py-4 text-gray-600 border-t">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-4xl mx-auto">
        <CldImage src="undraw_mobile-payments_0u42_tjpkgo" alt="Customer Support" width={400} height={400} />
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">Still Need Help?</h2>
          <p className="mt-4 text-lg text-gray-600">Our support team is available 24/7 to assist you with any issues.</p>
          <button className="mt-4 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow">Contact Support</button>
        </div>
      </div>
    </div>
  );
}
