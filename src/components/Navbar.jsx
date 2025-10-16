import React, { useState, useContext } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'; // Context ko import karein

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // context se values nikalein
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const pages = [
    { name: "Home", path: "/" },
    { name: "Paid Therapy", path: "/paid" },
    { name: "Free counselling", path: "/counselling" },
    { name: "future prediction", path: "/Question" },
    { name: "Psychological assessments", path: "/assignment" },
    { name: "Pricing", path: "/pricing" },
  ];

  const handleLogout = () => {
    logout(); // logout function call karein
    setIsOpen(false); // Mobile menu band karein
    navigate('/login'); // user ko login page par bhej dein
  };

  const buttonStyle =
    "px-4 py-2 rounded-2xl font-semibold bg-gradient-to-r from-orange-600 to-orange-400 text-white hover:brightness-110 transition-all";
  
  const signupButtonStyle = 
    "px-4 py-2 rounded-2xl font-semibold bg-white text-dark hover:brightness-105 transition-all";

  const logoutButtonStyle =
    "px-4 py-2 rounded-2xl font-semibold bg-red-600 text-white hover:bg-red-700 transition-all";

  return (
    <nav className="bg-gradient-orange text-white fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/Astro.png" // Assuming Astro.png is in the public folder
            alt="Steer-U Logo"
            className="w-8 h-8 md:w-12 md:h-12 object-contain"
          />
          <span className="text-[#FFD700] text-3xl font-lg font-bold italic">Steer-U</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-8 font-semibold">
            {pages.map((page) => (
              <li
                key={page.name}
                className="hover:text-accent transition-colors duration-300"
              >
                <Link to={page.path}>{page.name}</Link>
              </li>
            ))}
          </ul>
          
          <div className="flex space-x-4 items-center">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className={buttonStyle}>Profile</Link>
                <button onClick={handleLogout} className={logoutButtonStyle}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={buttonStyle}>
                  Login
                </Link>
                <Link to="/signin" className={signupButtonStyle}>
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black w-full text-center py-6 text-white font-semibold">
           <ul className="divide-y divide-gray-600">
            {pages.map((page) => (
              <li
                key={page.name}
                className="hover:text-accent py-4 transition-colors duration-300"
              >
                <Link to={page.path} onClick={() => setIsOpen(false)}>
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-600 flex flex-col items-center space-y-4">
             {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setIsOpen(false)} className={buttonStyle}>Profile</Link>
                <button onClick={handleLogout} className={logoutButtonStyle}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className={buttonStyle}>
                  Login
                </Link>
                <Link to="/signin" onClick={() => setIsOpen(false)} className={signupButtonStyle}>
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

