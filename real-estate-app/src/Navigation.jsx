import React, { useState } from 'react';
import { Home, HelpCircle, LayoutDashboard, Info, Building2, Menu, X } from 'lucide-react';

//Navigation component that handles page navigation and responsive menu
const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); //State to control mobile menu visibility

  //Toggles the mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //Handles page changes and closes mobile menu
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  //Array of menu items with page, label, and icon
  const menuItems = [
    { page: 'home', label: 'Home', Icon: Home },
    { page: 'form', label: 'Estimate', Icon: LayoutDashboard },
    { page: 'help', label: 'Help', Icon: HelpCircle },
    { page: 'about', label: 'About', Icon: Info }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center py-4">
            <Building2 className="h-8 w-8 text-white mr-2" />
            <span className="font-bold text-white text-xl">Real Estate Estimator</span>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 hover:bg-blue-700 rounded-lg"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map(({ page, label, Icon }) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`py-4 px-3 flex items-center rounded-t-lg ${
                  currentPage === page ? 'bg-white text-blue-600' : 'text-white hover:bg-blue-700'
                }`}
              >
                <Icon className="mr-1 h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          } bg-blue-700 rounded-b-lg shadow-lg`}
        >
          {menuItems.map(({ page, label, Icon }) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-full py-3 px-4 flex items-center ${
                currentPage === page ? 'bg-blue-800 text-white' : 'text-white hover:bg-blue-600'
              }`}
            >
              <Icon className="mr-2 h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
