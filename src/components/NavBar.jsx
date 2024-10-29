import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const { pathname } = location;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    handleLogout();  // Call the logout function passed as a prop
    navigate('/');   // Redirect to home or login page after logout
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?name=${searchQuery}`);
    }
  };

  const isActive = (path) => pathname === path ? 'text-orange-500 font-bold' : 'text-gray-100';

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">
          <Link to="/">CRUD</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className={`hover:text-red-500 ${isActive('/')}`}>Home</Link>

          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Search
            </button>
          </form>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={`hover:text-red-500 ${isActive('/dashboard')}`}>Dashboard</Link>
              <button
                onClick={handleLogoutClick}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className={`hover:text-red-500 ${isActive('/register')}`}>Register</Link>
              <Link to="/login" className={`hover:text-red-500 ${isActive('/login')}`}>Login</Link>
            </>
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <Link to="/" className={`block py-2 px-4 hover:bg-blue-700 ${isActive('/')}`}>Home</Link>
          <Link to="/about" className={`block py-2 px-4 hover:bg-blue-700 ${isActive('/about')}`}>About</Link>
          <Link to="/blog" className={`block py-2 px-4 hover:bg-blue-700 ${isActive('/blog')}`}>Blog</Link>
          <form onSubmit={handleSearch} className="flex flex-col items-start p-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-lg px-4 py-2 mb-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              Search
            </button>
          </form>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={`block py-2 px-4 hover:bg-blue-700 ${isActive('/dashboard')}`}>Dashboard</Link>
              <button
                onClick={handleLogoutClick}
                className="block text-white py-2 px-4 bg-red-500 hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className={`block py-2 px-4 hover:bg-blue-700 ${isActive('/register')}`}>Register</Link>
              <Link to="/login" className={`block py-2 px-4 hover:bg-blue-700 ${isActive('/login')}`}>Login</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
