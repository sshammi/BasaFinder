'use client'
import React from 'react';
import { motion } from "framer-motion";

const ReviewSection = () => {
    const reviews = [
        {
            name: "Ramzi",
            details: "Moved to Berlin in May 2024",
            text: "I was looking for a suitable flat on other platforms for weeks, but HousingAnywhere had much better options. I found a very good and affordable flat in a few days."
        },
        {
            name: "Sophie",
            details: "Relocated to Amsterdam in March 2024",
            text: "The verification process gave me peace of mind. Within a week I found a perfect room in the city center. Much easier than dealing with local agencies!"
        },
        {
            name: "Luca",
            details: "Started internship in Barcelona, January 2024",
            text: "As a student on a tight budget, I appreciated the transparent pricing. The virtual tour feature helped me secure a place before even arriving in the country."
        }
    ];

    return (
        <div className="px-4 py-24 bg-[#002630] -mx-24">
            <h2 className="text-4xl md:text-5xl font-bold text-center my-12 text-white">
                What our users say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-24 mb-12">
    {reviews.map((review, index) => (
        <motion.div
            key={index}
            className="bg-white rounded-xl p-6 hover:bg-[#FF4B27] hover:text-white"
            whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 300 }
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.1
            }}
        >
            <div className="mb-4">
                <h3 className="text-xl font-semibold">{review.name}</h3>
                <p className="text-sm">{review.details}</p>
            </div>
            <p className="italic leading-relaxed">
                "{review.text}"
            </p>
        </motion.div>
    ))}
</div>

        </div>
    );
};

export default ReviewSection;