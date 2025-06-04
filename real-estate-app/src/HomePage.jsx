import React from 'react';
import { Building2, LayoutDashboard, HelpCircle } from 'lucide-react';

//Home page component that displays information about the platform
const HomePage = ({ setCurrentPage }) => (
  <div className="relative">
    <div className="relative max-w-6xl mx-auto px-4 py-8 sm:py-16 text-center">
      <div className="mb-6 sm:mb-8 flex justify-center">
        <Building2 className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600" />
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
        Real Estate Price Estimation Platform
      </h1>
      <p className="text-lg sm:text-xl text-black mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
        Get property price estimation using our advanced machine learning algorithm.
      </p>
      {/* Button to navigate to the property form page */}
      <button
        onClick={() => setCurrentPage('form')}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-200 shadow-lg"
      >
        Get Started
      </button>

      {/* Feature Cards */}
      <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4">
        {[
          { Icon: LayoutDashboard, title: 'Instant Estimates', desc: 'Get property valuations in seconds with our advanced algorithm' },
          { Icon: HelpCircle, title: 'Save Estimates', desc: 'Download and share results with others easily.' }
        ].map(({ Icon, title, desc }) => (
          <div key={title} className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <Icon className="text-blue-600 mb-3 sm:mb-4 h-6 w-6 sm:h-8 sm:w-8" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
            <p className="text-sm sm:text-base text-gray-600">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HomePage;
