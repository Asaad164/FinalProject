import React, { useState } from 'react';
import { Home, HelpCircle, LayoutDashboard, Info, Building2 } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState({
    size: '',
    rooms: '',
    location: '',
    yearBuilt: '',
    features: []
  });
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  const Navigation = () => (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div className="flex items-center py-4">
              <Building2 className="h-8 w-8 text-white mr-2" />
              <span className="font-bold text-white text-xl">Real Estate Estimator</span>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`py-4 px-3 flex items-center rounded-t-lg ${currentPage === 'home' ? 'bg-white text-blue-600' : 'text-white hover:bg-blue-700'}`}>
                <Home className="mr-1 h-4 w-4" />
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('form')}
                className={`py-4 px-3 flex items-center rounded-t-lg ${currentPage === 'form' ? 'bg-white text-blue-600' : 'text-white hover:bg-blue-700'}`}>
                <LayoutDashboard className="mr-1 h-4 w-4" />
                Estimate
              </button>
              <button 
                onClick={() => setCurrentPage('help')}
                className={`py-4 px-3 flex items-center rounded-t-lg ${currentPage === 'help' ? 'bg-white text-blue-600' : 'text-white hover:bg-blue-700'}`}>
                <HelpCircle className="mr-1 h-4 w-4" />
                Help
              </button>
              <button 
                onClick={() => setCurrentPage('about')}
                className={`py-4 px-3 flex items-center rounded-t-lg ${currentPage === 'about' ? 'bg-white text-blue-600' : 'text-white hover:bg-blue-700'}`}>
                <Info className="mr-1 h-4 w-4" />
                About
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-blue-50 opacity-50 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <Building2 className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Real Estate Price Estimation Platform
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Get property price estimation using our advanced machine learning algorithm. 
          </p>
          <button
            onClick={() => setCurrentPage('form')}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Started
          </button>
        </div>
        
        {/* Feature Cards */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 mb-4">
              <LayoutDashboard className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Estimates</h3>
            <p className="text-gray-600">Get property valuations in seconds with our advanced algorithm</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 mb-4">
              <HelpCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
            <p className="text-gray-600">Access professional guidance and support whenever you need it</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-600 mb-4">
              <Info className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Market Insights</h3>
            <p className="text-gray-600">Stay informed with the latest real estate market trends</p>
          </div>
        </div>
      </div>
    </div>
  );
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const PropertyForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const mockPrice = Math.floor(Math.random() * 500000) + 200000;
      setEstimatedPrice(mockPrice);
      setCurrentPage('results');
    };

    return (
      <div className="relative min-h-screen bg-gray-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-blue-50 opacity-50 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Property Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Previous form fields remain the same */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Size (m²)</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter property size"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Number of Rooms</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter number of rooms"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Location</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" required>
                  <option value="">Select location</option>
                  <option value="downtown">Downtown</option>
                  <option value="suburban">Suburban</option>
                  <option value="rural">Rural</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Year Built</label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter year built"
                  required
                />
              </div>

              {/* Updated Additional Features Section */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Additional Features</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span>Parking Availability</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span>Elevator</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span>View</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span>Near Schools</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span>Near Shopping Centers</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span>Near Public Transport</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span>Near Parks</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-[1.02] transition-all duration-200"
              >
                Estimate Price
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  const ResultsPage = () => (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-blue-50 opacity-50 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="relative max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Estimated Price</h2>
          <div className="text-center mb-12">
            <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              ${estimatedPrice?.toLocaleString()}
            </span>
          </div>
          <div className="space-y-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">Impact Factors</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <span className="font-medium text-blue-800">Size:</span> High Impact
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <span className="font-medium text-blue-800">Location:</span> High Impact
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <span className="font-medium text-blue-800">Age:</span> Medium Impact
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <span className="font-medium text-blue-800">Features:</span> Low Impact
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentPage('form');
              setEstimatedPrice(null);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-[1.02] transition-all duration-200"
          >
            Estimate Another Property
          </button>
        </div>
      </div>
    </div>
  );

  const HelpPage = () => (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-blue-50 opacity-50 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="relative max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Help & FAQ</h2>
          <div className="space-y-8">
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">How to use the platform?</h3>
              <p className="text-gray-700">
                Simply navigate to the Estimate page, fill in your property details, and click the
                "Estimate Price" button to get an instant estimation.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">What information do I need?</h3>
              <p className="text-gray-700">
                You'll need basic property details like size, number of rooms, location, year built.
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Need Support?</h3>
              <p className="text-gray-700">
                Contact our support team at StamGmail@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'form' && <PropertyForm />}
      {currentPage === 'results' && <ResultsPage />}
      {currentPage === 'help' && <HelpPage />}
    </div>
  );
};

export default App;