import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const [alertType, setAlertType] = useState('');
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get('name');

  const handleEditProduct = (id) => {
    navigate(`/update-product/${id}`);
  };

  const confirmDeletePost = (id) => {
    setProductIdToDelete(id);
  };

  const handleDeleteConfirmed = (message, type) => {
    setProducts(products.filter((product) => product.id !== productIdToDelete));
    setMessage(message);
    setAlertType(type);

    setTimeout(() => {
      setMessage('');
      setAlertType('');
    }, 8000);

    setProductIdToDelete(null);
  };

  useEffect(() => {
    // Check if the user is authenticated by validating the token
    const token = localStorage.getItem('access');
    if (token) {
      setIsAuthenticated(true); // Set authenticated status to true
    }

    if (query) {
      
      fetch(`https://crud-backend-drf-production.up.railway.app/crud/search/?name=${query}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }), // Only include the Authorization header if token exists
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching search results:', err);
          setError('Failed to load search results.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Pre-built function to format date and time using date-fns
  const formatDateTime = (datetime) => {
    return format(new Date(datetime), 'dd-MM-yyyy HH:mm:ss');
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Sl.no</th>
            <th className="py-2 px-4 border">Product Code</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_code}>
              <td className="py-2 px-4 border">{product.id}</td>
              <td className="py-2 px-4 border">{product.product_code}</td>
              <td className="py-2 px-4 border">{formatDateTime(product.datetime)}</td>
              <td className="py-2 px-4 border">{product.name}</td>
              <td className="py-2 px-4 border">{product.description}</td>
              <td className="py-2 px-4 border">₹{product.price}</td>
              <td className={`py-2 px-4 border ${product.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                {product.status}
              </td>
              <td className="py-2 px-4 border flex space-x-2">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => handleEditProduct(product.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => confirmDeletePost(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <p className="text-gray-500">Login to edit/delete</p> // Message for unauthenticated users
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchResults;
