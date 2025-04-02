import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is the purpose of this application?",
      answer: "This application is designed to provide users with a seamless experience for accessing frequently asked questions and their respective answers in an organized manner."
    },
    {
      question: "How can I contact support?",
      answer: "Support can be reached via email at support@example.com or through the contact form available on our website."
    },
    {
      question: "Is it safe to shop here?",
      answer: "Yes, the application is secure and safe to use."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="text-lg font-medium text-gray-900">
                {item.question}
              </span>
              <span className="text-gray-600">
                {activeIndex === index ? '-' : '+'}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 py-4 text-gray-700 bg-white">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;