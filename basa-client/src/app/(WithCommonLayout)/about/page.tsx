// pages/about.js

import React from 'react';

const AboutUs = () => {
  const teamMembers = [
    { name: 'John Doe', role: 'Founder & CEO', bio: 'Tech enthusiast with 10+ years in data management' },
    { name: 'Jane Smith', role: 'Lead Developer', bio: 'Full-stack developer specializing in search algorithms' },
    { name: 'Mike Johnson', role: 'UX Designer', bio: 'User experience expert focused on accessibility' },
  ];

  const contactMethods = [
    { type: 'Email', value: 'support@basafinder.com' },
    { type: 'Phone', value: '+1 (555) 123-4567' },
  ];

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About BasaFinder</h1>
          <p className="text-xl text-gray-600">Your trusted platform for efficient data solutions</p>
        </div>

        {/* Mission Statement */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At BasaFinder, we're dedicated to revolutionizing data accessibility. Our platform was born from
            the vision to create a seamless, intuitive solution for information retrieval. We strive to empower
            businesses and individuals by providing cutting-edge search capabilities while maintaining the
            highest standards of data security and user privacy.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div> {/* Team member image placeholder */}
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default AboutUs;