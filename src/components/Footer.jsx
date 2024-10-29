// src/components/Footer.jsx
import React from 'react';
import { NavLink,useLocation } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const location=useLocation()
  
  const { pathname } = location;

  const isActive = (path) => pathname === path ? 'text-orange-500 font-bold' : 'text-gray-800';

  return (
    <footer className="bg-gray-100 text-gray-900 pt-8 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-black">CRUD</h2>
          <p className="text-gray-900 mt-2">Sharing knowledge, one solution at a time.</p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6">
          <NavLink to="/" className={`hover:text-gray-700 ${isActive('/')}`}>Home</NavLink>
          <NavLink to="/about" className={`hover:text-gray-700 ${isActive('/about')}`}>About</NavLink>
          <NavLink to="/blog" className={`hover:text-red-500 ${isActive('/blog')}`}>Blog</NavLink>
          <NavLink to="/register" className={`hover:text-red-500 ${isActive('/register')}`}>Sign Up</NavLink>
          <NavLink to="/login" className={`hover:text-red-500 ${isActive('/login')}`}>Login</NavLink>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
      <div className="bg-gray-300 py-4 mt-3 text-center text-gray-900  bottom-0 w-full">
        <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
      </div>
    </footer>
  );
}
