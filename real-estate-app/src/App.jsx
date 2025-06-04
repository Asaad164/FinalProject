import React, { useState } from 'react';
import Navigation from './Navigation';
import HomePage from './HomePage';
import PropertyForm from './PropertyForm';
import ResultsPage from './ResultsPage';
import HelpPage from './HelpPage';
import AboutPage from './AboutPage';

//Root App component that manages navigation between different pages
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  // Holds the estimated property price returned from the model
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  // Holds the form data entered by the user
  const [formData, setFormData] = useState(null);

  const handlePageChange = (page, data = null) => {
    setCurrentPage(page);
    if (data) {
      setFormData(data);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'form' && (
        <PropertyForm 
          setEstimatedPrice={setEstimatedPrice} 
          setCurrentPage={handlePageChange} 
        />
      )}
      {currentPage === 'results' && (
        <ResultsPage 
          estimatedPrice={estimatedPrice} 
          setCurrentPage={setCurrentPage} 
          setEstimatedPrice={setEstimatedPrice}
          formData={formData}
        />
      )}
      {currentPage === 'help' && <HelpPage />}
      {currentPage === 'about' && <AboutPage />}
    </div>
  );
};

export default App;
