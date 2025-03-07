const TestimonialsAndTips = () => {
    const testimonials = [
      {
        name: "John Doe",
        feedback: "BasaFinder helped me find the perfect home in just a few days! The process was seamless and stress-free.",
        location: "Dhaka, Bangladesh"
      },
      {
        name: "Jane Smith",
        feedback: "As a landlord, listing my rental property was incredibly easy. I found great tenants quickly!",
        location: "Chittagong, Bangladesh"
      }
    ];
  
    const tips = [
      "Always visit the house in person before making a decision.",
      "Check for hidden costs like maintenance fees or utility charges.",
      "Ask for a written agreement to avoid future misunderstandings.",
      "Compare rental prices in the area to ensure a fair deal.",
      "Consider proximity to work, schools, and public transport."
    ];
  
    return (
      <div className="p-6 space-y-10">
        {/* Testimonials Section */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-6">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
                <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
                <h3 className="text-md font-semibold mt-2">- {testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            ))}
          </div>
        </section>
  
        {/* Tips Section */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-6">Tips for Finding the Right Rental</h2>
          <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg">
            {tips.map((tip, index) => (
              <li key={index} className="text-gray-700 mb-2">{tip}</li>
            ))}
          </ul>
        </section>
      </div>
    );
  };
  
  export default TestimonialsAndTips;