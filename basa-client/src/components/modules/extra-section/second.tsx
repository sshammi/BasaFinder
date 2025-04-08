import React from 'react'

const SecondSection = () => {
  return (
    <section className="px-4 py-10 my-20">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          Services For All Kinds of Need
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="p-6">
            <p className="text-gray-800 text-6xl font-extrabold mb-4 text-left">1</p>
            <h3 className="text-3xl font-semibold text-gray-800 mb-3 text-left">Family</h3>
            <p className="text-gray-700 text-left">
              Discover the perfect family home with our wide selection of high-quality houses for rent. Enjoy spacious living.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6">
            <p className="text-gray-800 text-6xl font-extrabold mb-4 text-left">2</p>
            <h3 className="text-3xl font-semibold text-gray-800 mb-3 text-left">Office</h3>
            <p className="text-gray-700 text-left">
              Find the perfect office space to elevate your business. Explore high-quality workspaces, from private offices to co-working hubs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6">
            <p className="text-gray-800 text-6xl font-extrabold mb-4 text-left">3</p>
            <h3 className="text-3xl font-semibold text-gray-800 mb-3 text-left">Hostel</h3>
            <p className="text-[#002630] text-left">
              Find comfortable and affordable hostel stays with ease. Explore shared and private rooms, save favorites, and get alerts.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6">
            <p className="text-gray-800 text-6xl font-extrabold mb-4 text-left">4</p>
            <h3 className="text-3xl font-semibold text-gray-800 mb-3 text-left">Sublet</h3>
            <p className="text-gray-700 text-left">
              Find the perfect sublet for short-term or flexible stays. Explore fully furnished spaces, save your favorites, and move in hassle-free!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecondSection
