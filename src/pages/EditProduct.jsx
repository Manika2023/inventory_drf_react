import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState({
    product_code: '',
    name: '',
    description: '',
    price: '',
    status: 'Active',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product data to prefill the form fields
    fetch(`https://crud-backend-drf-production.up.railway.app/crud/api/products/update/${id}/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProduct(data);

        }
      })
      .catch((err) => {
        setError('Failed to load product details.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // here update the product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://crud-backend-drf-production.up.railway.app/crud/api/products/update/${id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Product updated successfully!');
   
        setTimeout(() => {
          navigate('/dashboard'); // Redirect to dashboard after a delay
        }, 2000);
      } else {
        setError(data.error || 'Failed to update the product.');
      }
    } catch (err) {
      setError('Failed to update product.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl text-gray-800 font-bold mb-4">Edit Product</h2>
      
      {message && (
          <div className="bg-green-500 p-3 rounded-lg text-gray-50 my-3" role="alert">
            {message}
            <Link to="/dashboard" className="underline text-gray-100 ml-2">
               Go Back to Dashboard
          </Link>
        
          </div>
        )}

      {error && (
          <div className="bg-green-500 p-3 rounded-lg text-gray-50 my-3" role="alert">
            {error}
          </div>
        )}
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <label className="block text-gray-800">Product Code</label>
          <input
            type="number"
            name="product_code"
            value={product.product_code}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 bg-gray-50 text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 bg-gray-50 text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-900">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 bg-gray-50 text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-900">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 bg-gray-50 text-black"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-900">Status</label>
          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 bg-gray-50 text-black"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Product
          </button>
          <Link
            to="/dashboard"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
