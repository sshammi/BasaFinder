'use client'
import { ArrowRight, Check, CircleCheckBig } from "lucide-react";
import ServiceSection from './service';
import PlaceService from "./place";
import FAQPage from "./faqSection";
import ReviewSection from "./review";
import HeroSection from "./heroSection";
import { CldImage } from "next-cloudinary";

const TestimonialsAndTips = () => {
  
    return (
      <div>
        <HeroSection/>
        <section>
        <div className="max-w-7xl mx-auto text-center my-20">
        <h2 className="text-5xl font-bold text-gray-900 mb-4 mx-4 text-center">Services For All Kinds of Need</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Step 1 */}
      <div className="p-6">
        <p className=" text-gray-800 text-6xl font-extrabold mb-4 text-left">1</p>
        <h3 className="text-3xl font-semibold text-gray-800 mb-3 text-left">Family</h3>
        <p className="text-gray-800 text-left">
        Discover the perfect family home with our wide selection of high-quality houses for rent. Enjoy spacious living.
        </p>
      </div>

      {/* Step 2 */}
      <div className="p-6">
        <p className=" text-gray-800 text-6xl font-extrabold mb-4 text-left">2</p>
        <h3 className="text-3xl font-semibold text-gray-800 mb-3 text-left">Office</h3>
        <p className="text-gray-800 text-left">
        Find the perfect office space to elevate your business. Explore high-quality workspaces, from private offices to co-working hubs.
        </p>
      </div>

      {/* Step 3 */}
      <div className="p-6">
       <p className=" text-gray-800 text-6xl font-extrabold mb-4 text-left">3</p>
        <h3 className="text-3xl font-semibold text-gray-800 mb-3 text-left">Hostel</h3>
          <p className="text-[#002630] text-left">
          Find comfortable and affordable hostel stays with ease. Explore shared and private rooms, save favorites, and get alerts.
          </p>
       </div>


      {/* Step 4 */}
      <div className="p-6">
      <p className=" text-gray-800 text-6xl font-extrabold mb-4 text-left">4</p>
        <h3 className="text-3xl font-semibold text-gray-800 mb-3 text-left">Sublet</h3>
        <p className="text-gray-800 text-left">
        Find the perfect sublet for short-term or flexible stays. Explore fully furnished spaces, save your favorites, and move in hassle-free!
        </p>
      </div>
        </div>
        </div>
        </section>
        <ServiceSection/> 
        <PlaceService/>       
        <section className="bg-[#ff4b27ff] py-16 px-6 -mx-28">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
    
    {/* Text Content */}
    <div className="text-center md:text-left md:w-1/2">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
        TENANT PROTECTION
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {/* Protection Items */}
        {[
          {
            title: "Stress-free move-in",
            description:
              "If the landlord cancels last minute or delays your move-in, you'll get help finding another place or a temporary hotel stay.",
          },
          {
            title: "Quick support",
            description:
              "If something goes wrong with your booking, we can help make it right.",
          },
          {
            title: "Easy refund",
            description:
              "We keep your payment safe until you move in. If the place doesn't match the description, you'll get a refund.",
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Icon */}
            <div className="w-10 h-10 flex items-center justify-center">
              <CircleCheckBig className="w-10 h-10 text-white" />
            </div>
            {/* Text */}
            <div>
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              <p className="text-white text-lg">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Learn More Link */}
      <div className="mt-8">
        <a
          href="/help"
          className="text-white font-semibold text-xl flex items-center justify-center md:justify-start gap-2 hover:underline"
        >
          Learn about Tenant Protection
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>

    {/* Image Section */}
    <div className="w-full md:w-1/2 flex justify-center">
      <CldImage
        src="istockphoto-529157517-612x612_yml8k9"
        alt="Location's Photo"
        width={600}
        height={400}
        className="rounded-xl w-full max-w-md md:max-w-lg"
      />
    </div>
  </div>
</section>


        <section>
        <div className="max-w-7xl mx-auto text-center my-20">
        <h2 className="text-5xl font-bold text-gray-900 mb-4 mx-4 text-center">It's quick. All online. 100% safe.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Step 1 */}
      <div className="p-6">
        <p className=" text-gray-800 text-6xl font-extrabold mb-4 text-left">1</p>
        <h3 className="text-3xl font-semibold text-gray-800 mb-3 text-left">Pick a few places</h3>
        <p className="text-gray-800 text-left">
          Explore hundreds of high-quality rooms, studios, and apartments. Save favorites. Get alerts. 
          Finding your dream home could not be easier.
        </p>
      </div>

      {/* Step 2 */}
      <div className="p-6">
        <p className=" text-gray-800 text-6xl font-extrabold mb-4 text-left">2</p>
        <h3 className="text-3xl font-semibold text-gray-800 mb-3 text-left">Message the landlord</h3>
        <p className="text-gray-800 text-left">
          Enjoy an online, private space for all conversations with the landlord. Ask questions, 
          share information, and see how well you both match.
        </p>
      </div>

      {/* Step 3 */}
      <div className="p-6">
       <p className=" text-gray-800 text-6xl font-extrabold mb-4 text-left">3</p>
        <h3 className="text-3xl font-semibold text-gray-800 mb-3 text-left">Send a booking request</h3>
          <p className="text-[#002630] text-left">
            Like a place and want to call it home? Send the landlord a booking request. 
           You'll know if it's accepted or not within 48 hours.
          </p>
       </div>


      {/* Step 4 */}
      <div className="p-6">
      <p className=" text-gray-800 text-6xl font-extrabold mb-4 text-left">4</p>
        <h3 className="text-3xl font-semibold text-gray-800 mb-3 text-left">Pay, and it's yours</h3>
        <p className="text-gray-800 text-left">
          Pay the first month's rent to confirm your booking. Congratulations, you found your next home. 
        </p>
      </div>
        </div>
        </div>
        </section>

        <ReviewSection/>
        
        <FAQPage/>
      </div>
    );
  };
  
  export default TestimonialsAndTips;