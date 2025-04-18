import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BarChart2, Home, Info, Mail, LogIn, File } from "lucide-react"; // Import File icon

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BarChart2 className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-heading font-semibold text-gray-900">DataInsight </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link 
              to="/" 
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-gray-700'}`}
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link 
              to="/about" 
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : 'text-gray-700'}`}
            >
              <Info className="h-4 w-4 mr-1" />
              About
            </Link>
            <Link 
              to="/contact" 
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${isActive('/contact') ? 'text-primary' : 'text-gray-700'}`}
            >
              <Mail className="h-4 w-4 mr-1" />
              Contact Us
            </Link>
            <Link 
              to="/models"  // Link to the models page
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${isActive('/models') ? 'text-primary' : 'text-gray-700'}`}
            >
              <File className="h-4 w-4 mr-1" />  {/* FileBox icon */}
              Models
            </Link>
            <Button className="bg-primary" asChild>
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-primary bg-blue-50' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Home
              </div>
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'text-primary bg-blue-50' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Info className="h-5 w-5 mr-2" />
                About
              </div>
            </Link>
            <Link 
              to="/contact" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contact') ? 'text-primary bg-blue-50' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Contact Us
              </div>
            </Link>
            <Link 
              to="/models" // Mobile menu link for models
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/models') ? 'text-primary bg-blue-50' : 'text-gray-700 hover:bg-gray-50 hover:text-primary'}`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <File className="h-5 w-5 mr-2" />
                Models
              </div>
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-blue-50"
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <LogIn className="h-5 w-5 mr-2" />
                Login
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
