import React from 'react';
import { Building2, Target, Shield, Zap, Users } from 'lucide-react';

//About page component that displays information about the platform
const AboutPage = () => (
  <div className="relative min-h-screen">
    <div className="relative max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-12">
          <Building2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About Our Platform</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A real estate price estimation platform powered by advanced machine learning technology.
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <Target className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To provide property price estimations, helping property owners and buyers make informed decisions in the real estate market.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <Shield className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Technology</h3>
              <p className="text-gray-600">
                Utilizing machine learning algorithms trained on extensive real estate data to deliver price predictions.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <Zap className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Instant property price estimations</li>
              <li>Support for multiple cities (Nahariyya, Haifa, Karmiel)</li>
              <li>Various property types including apartments, duplexes, and cottages</li>
              <li>Detailed property analysis based on multiple factors</li>
              <li>User-friendly interface for easy navigation</li>
              <li>Downloadable estimation reports</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">How It Works</h3>
            <p className="text-gray-600 mb-4">
              Our platform analyzes various property characteristics including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Property size and number of rooms</li>
              <li>Location and block number</li>
              <li>Year of construction</li>
              <li>Property type and sold part</li>
              <li>Date of sale</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Using this information, our advanced algorithm calculates the estimated property value, providing you with a reliable price range for your property.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <Users className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Created By</h3>
            <div className="text-gray-600">
              <p className="mb-2">This platform was developed by:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Asaad Sajim</li>
                <li>Joul Horany</li>
              </ul>
              <p className="mt-4">Contact us at: <a href="mailto:StamGmail@gmail.com" className="text-blue-600 hover:text-blue-800">StamGmail@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage; 