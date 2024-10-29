// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

export default function Layout({ isAuthenticated, handleLogout }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <main className="flex-grow">
        <Outlet /> {/* Renders the current route's component */}
      </main>
      <Footer /> {/* Footer component */}
    </div>
  );
}
