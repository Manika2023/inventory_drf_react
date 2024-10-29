import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import SearchResults from './pages/SearchResults';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access'));

  const handleLogout = () => {
    // console.log(localStorage.getItem('access'));
    localStorage.removeItem('access');
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register handleLogin={handleLogin} />} />
        <Route index element={<Home/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>  
        <Route path='/create-product' element={<CreateProduct/>}></Route>  
        <Route path='/update-product/:id' element={<EditProduct/>}></Route>  
        <Route path="/search" element={<SearchResults />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
