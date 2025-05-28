import React from 'react';

//Help page component that displays information about the platform
const HelpPage = () => (
  <div className="relative min-h-screen bg-gray-50">
    <div className="absolute inset-0 bg-blue-50 opacity-50 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
    <div className="relative max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Help & FAQ</h2>
        <div className="space-y-8">
          {[
            { title: 'How to use the platform?', desc: 'Navigate to the Estimate page, fill your property details, and click "Estimate Price".' },
            { title: 'What information do I need?', desc: 'You need to provide: Block number, Date of sale, Property type (varies by city), Sold part (1 = the whole apartment), City, Year built, Property size in m², and Number of rooms.' },
            { title: 'Need Support?', desc: 'Contact us at StamGmail@gmail.com' }
          ].map(({ title, desc }) => (
            <div key={title} className="p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HelpPage;
