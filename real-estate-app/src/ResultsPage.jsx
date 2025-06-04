import React from 'react';

//Results page component that displays the predicted price and allows the user to download the estimate details
const ResultsPage = ({ estimatedPrice, setCurrentPage, setEstimatedPrice, formData }) => {
  //Function to handle the download of the estimate details
  const handleDownload = () => {
    if (!formData) {
      alert('No data available to download. Please try again.');
      return;
    }

    try {
      // Format the date for display
      const [year, month, day] = formData.dateOfSale.split('-');
      const formattedDate = `${day}/${month}/${year}`;

      // Create the content for the file
      const content = `Property Details:
House Name: ${formData.houseName || 'Unnamed Property'}
Block: ${formData.block}
Date of Sale: ${formattedDate}
Type: ${formData.type}
Sold Part: ${formData.soldPart}
City: ${formData.city}
Year Built: ${formData.yearBuilt}
Area: ${formData.area} m²
Rooms: ${formData.rooms}

Predicted Price Range: ${estimatedPrice}`;

      // Create a blob with the content
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger the download
      const link = document.createElement('a');
      link.href = url;
      const safeHouseName = formData.houseName ? formData.houseName.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'unnamed';
      link.download = `${safeHouseName}_estimation_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error creating download:', error);
      alert('Error creating download. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="relative max-w-2xl mx-auto px-4 py-6 sm:py-12">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">Predicted Price Range</h2>
          
          {/* Property Details Section */}
          <div className="mb-8 sm:mb-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Property Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.houseName && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-gray-600 font-medium">House Name:</span>
                  <span className="ml-2">{formData.houseName}</span>
                </div>
              )}
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600 font-medium">City:</span>
                <span className="ml-2 capitalize">{formData.city}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600 font-medium">Property Type:</span>
                <span className="ml-2 capitalize">{formData.type.replace(/-/g, ' ')}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600 font-medium">Area:</span>
                <span className="ml-2">{formData.area} m²</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600 font-medium">Rooms:</span>
                <span className="ml-2">{formData.rooms}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600 font-medium">Year Built:</span>
                <span className="ml-2">{formData.yearBuilt}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600 font-medium">Block:</span>
                <span className="ml-2">{formData.block}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600 font-medium">Sold Part:</span>
                <span className="ml-2">{formData.soldPart}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-gray-600 font-medium">Date of Sale:</span>
                <span className="ml-2">{formData.dateOfSale.split('-').reverse().join('/')}</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-8 sm:mb-12">
            <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {estimatedPrice}
            </span>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:from-green-700 hover:to-green-900 transform hover:scale-[1.02] transition-all duration-200"
            >
              Download Estimate Details
            </button>
            <button
              onClick={() => {
                setCurrentPage('form');
                setEstimatedPrice(null);
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-[1.02] transition-all duration-200"
            >
              Estimate Another Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
