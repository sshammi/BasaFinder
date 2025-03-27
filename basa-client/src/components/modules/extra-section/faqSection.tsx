'use client'
import React, { useState } from 'react';

const FAQPage = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "Is HousingAnywhere a rental agency?",
      answer: "No, we're not a real estate agency. HousingAnywhere.com is an online platform connecting people looking for their next home with landlords looking for tenants."
    },
    {
      id: 2,
      question: "My booking request has been accepted. What's next?",
      answer: "Congratulations! Once your booking is accepted, you'll receive a confirmation email with further instructions. You'll need to finalize the payment securely through our platform and sign the rental contract. After completing these steps, coordinate directly with the landlord for move-in details."
    },
    {
      id: 3,
      question: "What if I want to cancel my booking?",
      answer: (
        <>
          You can cancel your booking by navigating to your account dashboard and selecting the cancellation option. Please review our{' '}
          <a 
            href="https://www.housinganywhere.com/cancellation-policy" 
            className="text-blue-600 hover:underline"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Cancellation Policy
          </a>{' '}
          for details on refund eligibility and any applicable fees. Most cancellations are free if requested within 24 hours of acceptance.
        </>
      )
    },
    {
      id: 4,
      question: "Can I visit the place before I book?",
      answer: "Yes, if the landlord agrees to an in-person viewing. Contact them directly via the platform's messaging system to arrange a visit. If you're unable to visit physically, many landlords offer virtual tours or additional photos/videos upon request."
    }
  ];

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 max-w-[90%] md:max-w-[70%]">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
        Your questions, answered
      </h1>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div 
            key={faq.id}
            className="border-b rounded-lg transition-all duration-200 ease-in-out py-3"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-4 sm:px-6 py-4 text-left flex justify-between items-center hover:text-[#FF4B27]"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 hover:text-[#FF4B27]">
                {faq.question}
              </h2>
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${
                  activeId === faq.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-4 sm:px-6 py-4 text-gray-600 border-t">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
