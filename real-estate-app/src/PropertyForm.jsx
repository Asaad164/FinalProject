import React, { useState } from 'react';

//Property form component that allows users to enter property details and estimate the price
const PropertyForm = ({ setEstimatedPrice, setCurrentPage }) => {
  const [selectedCity, setSelectedCity] = useState('');
  //State to hold the form data entered by the user
  const [formData, setFormData] = useState({
    block: '',
    dateOfSale: new Date().toISOString().split('T')[0],
    type: '',
    soldPart: '1',
    city: '',
    yearBuilt: '',
    area: '',
    rooms: '',
    houseName: ''
  });
  const [errors, setErrors] = useState({}); //State to hold the errors in the form

  //Function to get the property types based on the city
  const getPropertyTypes = (city) => {
    switch (city) {
      case 'nahariyya':
        return [
          { value: 'apartment', label: 'Apartment' },
          { value: 'duplex-cottage', label: 'Duplex Cottage' }
        ];
      case 'karmiel':
        return [
          { value: 'apartment', label: 'Apartment' },
          { value: 'duplex-cottage', label: 'Duplex Cottage' },
          { value: 'garden-apartment', label: 'Garden Apartment' },
          { value: 'single-family-cottage', label: 'Single Family Cottage' }
        ];
      case 'haifa':
        return [
          { value: 'apartment', label: 'Apartment' }
        ];
      default:
        return [];
    }
  };

  //Function to validate the form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.area) {
      newErrors.area = 'Please enter the property size';
    } else if (parseFloat(formData.area) <= 0) {
      newErrors.area = 'Property size must be greater than 0';
    }
    if (!formData.rooms) {
      newErrors.rooms = 'Please enter the number of rooms';
    }
    if (!formData.yearBuilt) {
      newErrors.yearBuilt = 'Please enter the year built';
    }
    if (!formData.block) {
      newErrors.block = 'Please enter the block number';
    } else if (formData.block.toString().length !== 5) {
      newErrors.block = 'Block number must be exactly 5 digits';
    }
    if (!formData.dateOfSale) {
      newErrors.dateOfSale = 'Please select the date of sale';
    }
    if (!formData.city) {
      newErrors.city = 'Please select a city';
    }
    if (!formData.type) {
      newErrors.type = 'Please select a property type';
    }
    if (!formData.soldPart) {
      newErrors.soldPart = 'Please enter the sold part';
    } else {
      const numValue = parseFloat(formData.soldPart);
      if (numValue <= 0) {
        newErrors.soldPart = 'The value must be more than 0';
      } else if (numValue > 1) {
        newErrors.soldPart = 'The value must be less than or equal to 1';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleKeyDown = (e) => {
    // Prevent arrow keys from changing the input value
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };

  const handleWheel = (e) => {
    // Prevent mouse wheel from changing the input value
    e.target.blur();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Format date to DD/MM/YYYY
    const [year, month, day] = formData.dateOfSale.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    // Prepare data with named keys
    const requestData = {
      Block: formData.block,
      'Date of sale': formattedDate,
      Type: formData.type,
      'Sold part': formData.soldPart,
      City: formData.city,
      'Year Built': formData.yearBuilt,
      Area: formData.area,
      Rooms: formData.rooms
    };

    try {
      //Send the data to the backend to get the predicted price
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      //Get the predicted price from the backend
      const data = await response.json();
      setEstimatedPrice(data['Predicted Price']);
      setCurrentPage('results', formData);
    } catch (error) {
      console.error('Error:', error);
      alert('Error getting price prediction. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="relative max-w-2xl mx-auto px-4 py-6 sm:py-12">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">Property Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
            {/* House Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">House Name (Optional)</label>
              <input 
                type="text" 
                name="houseName"
                value={formData.houseName}
                onChange={handleInputChange}
                placeholder="Enter a name for your property" 
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
              />
            </div>

            {/* Area */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Property Size (m²)</label>
              <input 
                type="number" 
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                placeholder="Enter property size" 
                className={`w-full p-2 sm:p-3 border ${errors.area ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              />
              {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area}</p>}
            </div>

            {/* Rooms */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Number of Rooms</label>
              <input 
                type="number" 
                name="rooms"
                value={formData.rooms}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                placeholder="Enter number of rooms" 
                className={`w-full p-2 sm:p-3 border ${errors.rooms ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              />
              {errors.rooms && <p className="mt-1 text-sm text-red-500">{errors.rooms}</p>}
            </div>

            {/* Year Built */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Year Built</label>
              <input 
                type="number" 
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                placeholder="Enter year built" 
                className={`w-full p-2 sm:p-3 border ${errors.yearBuilt ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              />
              {errors.yearBuilt && <p className="mt-1 text-sm text-red-500">{errors.yearBuilt}</p>}
            </div>

            {/* Block Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Block Number</label>
              <input 
                type="number" 
                name="block"
                value={formData.block}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                placeholder="Enter block number" 
                className={`w-full p-2 sm:p-3 border ${errors.block ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              />
              {errors.block && <p className="mt-1 text-sm text-red-500">{errors.block}</p>}
            </div>

            {/* Date of Sale */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Date of Sale</label>
              <input 
                type="date" 
                name="dateOfSale"
                value={formData.dateOfSale}
                onChange={handleInputChange}
                className={`w-full p-2 sm:p-3 border ${errors.dateOfSale ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base`}
              />
              {errors.dateOfSale && <p className="mt-1 text-sm text-red-500">{errors.dateOfSale}</p>}
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">City</label>
              <select 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full p-2 sm:p-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base`}
              >
                <option value="">Select city</option>
                <option value="nahariyya">Nahariya</option>
                <option value="haifa">Haifa</option>
                <option value="karmiel">Karmiel</option>
              </select>
              {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Property Type</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={`w-full p-2 sm:p-3 border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base`}
                disabled={!formData.city}
              >
                <option value="">Select type</option>
                {getPropertyTypes(formData.city).map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
            </div>

            {/* Sold Part */}
            <div>
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base">Sold Part (1 = the whole apartment)</label>
              <input 
                type="number" 
                name="soldPart"
                value={formData.soldPart}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                min="0.00001" 
                max="1" 
                step="0.01"
                placeholder="Enter value between 0 and 1"
                className={`w-full p-2 sm:p-3 border ${errors.soldPart ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              />
              {errors.soldPart ? (
                <p className="mt-1 text-sm text-red-500">{errors.soldPart}</p>
              ) : null}
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-[1.02] transition-all duration-200"
            >
              Estimate Price
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;