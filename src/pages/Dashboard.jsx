import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import DeleteConfirm from './DeleteConfirm';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [editProduct, setEditProduct] = useState(null);
  const navigate = useNavigate();
  const [alertType, setAlertType] = useState(''); 
  const [productIdToDelete, setProductIdToDelete] = useState(null); 
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('https://crud-backend-drf-production.up.railway.app/crud/api/products/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok) {
          setProducts(data.data);
        } else {
          setError('Failed to retrieve products');
        }
      } catch (error) {
        setError('Failed to retrieve products');
      }
    };

    loadProducts();
  }, []);

  const handleCreateProduct = () => {
    navigate('/create-product');
  };

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?name=${searchQuery}`);
    }
  };

  // Pre-built function to format date and time using date-fns
  const formatDateTime = (datetime) => {
    return format(new Date(datetime), 'dd-MM-yyyy HH:mm:ss');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
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

      {error && (
        <div className="bg-red-500 p-3 rounded-lg text-gray-50 my-3" role="alert">
          {error}
        </div>
      )}

      {message && (
        <div className={`bg-${alertType}-500 p-3 rounded-lg text-gray-50 my-3`} role="alert">
          {message}
        </div>
      )}
      <div className="create-btn my-4">
        <button 
          onClick={handleCreateProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Product +
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Sl.no</th>
            <th className="py-2 px-4 border">Product Code</th>
            <th className="py-2 px-4 border">Date & Time</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {productIdToDelete && (
        <DeleteConfirm
          productId={productIdToDelete}
          onDeleteConfirmed={handleDeleteConfirmed}
          onCancel={() => setProductIdToDelete(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
