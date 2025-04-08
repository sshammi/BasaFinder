'use client'

import { CldImage } from 'next-cloudinary'
import React from 'react'

const ServiceSection = () => {
  return (
    <div className="bg-[#002630] text-white px-8 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-14 -mx-24">
      {/* Section 1 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
        <CldImage
          src="undraw_best-place_dhzp-removebg-preview_o5xvzs"
          alt="Location's Photo"
          width={600}
          height={600}
          className="w-full max-w-[500px] mx-auto md:mx-0"
        />
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold pb-6">
            Stay safe with protected payments
          </h1>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
            When you pay to confirm the booking, your money is safe with us. We send it to the landlord only 48 hours after you move in unless you tell us the place isn't as promised. If you contact us, we'll help you.
            Protecting you against risks. Making your move safer.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold pb-6">
            Get a feel of the place from anywhere
          </h1>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
            Tired of trying to fit in viewings around your life? Explore several places at your own pace from the comfort of your couch. Enjoy high-quality photos, videos, floor plans, detailed descriptions, and more.
            Say goodbye to in-person viewings; say hello to more free time.
          </p>
        </div>
        <CldImage
          src="undraw_location-tracking_q3yd-removebg-preview_1_owm1qn"
          alt="Location's Photo"
          width={400}
          height={600}
          className="w-full max-w-[400px] mx-auto md:ml-6"
        />
      </section>
    </div>
  )
}

export default ServiceSection
