import React from 'react';
import Icon from '../assets/ULtrastore.svg';


const AboutPage = () => {
  const storeName = "ULtrastore";

  const teamMembers = [
    { id: 1, name: "Alex Johnson", title: "Founder & CEO", img: "https://i.pravatar.cc/300?img=1" },
    { id: 2, name: "Maria Garcia", title: "Head of Product", img: "https://i.pravatar.cc/300?img=2" },
    { id: 3, name: "Sam Chen", title: "Marketing Lead", img: "https://i.pravatar.cc/300/?img=3" },
    { id: 4, name: "Priya Singh", title: "Customer Happiness", img: "https://i.pravatar.cc/300/?img=4" },
  ];

  return (
    <div className="bg-white text-gray-800">
      <section className="relative bg-gradient-to-tl from-purple-200 via-white to-indigo-200 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
           <img
            src={Icon}
            alt={`${storeName} Logo Placeholder`}
            className="mx-auto mb-6 h-60 w-auto"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About {storeName}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to bringing you the finest selection of handcrafted goods, tech gadgets, sustainable fashion with a focus on quality, innovation, and customer satisfaction.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-1 md:order-2">
              <img
                src="https://picsum.photos/800/800?random=1"
                alt="Placeholder representing the start of the company"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Journey</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2025, {storeName} began with a simple vision: to make unique products accessible, solve a specific customer problem. Frustrated by the lack of a platform that offered niche products, we set out to build a platform that offers a diverse range of handcrafted goods.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From our humble beginnings in a small office, we've grown into a thriving online community, a trusted source for unique products, and a place where people come together to share their passions, always staying true to our core principles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Our Values Section --- */}
      <section className="bg-gradient-to-r from-purple-500 to-orange-500 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value Card 1: Quality */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-3 text-blue-600">⭐</div> {/* Placeholder Icon */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Uncompromising Quality</h3>
              <p className="text-gray-600 text-sm">We meticulously select and test our products to ensure they meet the highest standards of craftsmanship and durability.</p>
            </div>
            {/* Value Card 2: Customer Focus */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
               <div className="text-4xl mb-3 text-green-600">😊</div> {/* Placeholder Icon */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Obsession</h3>
              <p className="text-gray-600 text-sm">Your satisfaction is our top priority. We strive to provide exceptional service and support throughout your journey with us.</p>
            </div>
            {/* Value Card 3: Integrity / Innovation / Sustainability etc. */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
               <div className="text-4xl mb-3 text-purple-600">💡</div> {/* Placeholder Icon */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">We constantly seek new ideas and improvements to enhance your experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Meet The Team Section (Optional) --- */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">Meet the Team Behind {storeName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <img
                  src={member.img}
                  alt={`Placeholder portrait of ${member.name}`}
                  className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg object-cover border-4 border-white"
                />
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-sm text-indigo-600">{member.title}</p>
              </div>
            ))}
          </div>
           <p className="text-center text-gray-600 mt-8 max-w-2xl mx-auto">
             We're a passionate group of people who share a common love for {storeName}. Our team is made up of creative designers, tech enthusiasts, curators united by our love for {storeName} and our commitment to our customers.
           </p>
        </div>
      </section>

       {/* --- Call to Action Section --- */}
      <section className="bg-gradient-to-bl from-purple-500 to-orange-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Discover?</h2>
          <p className="text-lg mb-6 max-w-xl mx-auto">
            Explore our curated collections and find something you'll love.
          </p>
          {/* Use Link if using React Router */}
          <a
            href="/" // Change to your actual products page path
            className="inline-block bg-white text-purple-700 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            Shop Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;