import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://crud-backend-drf.production.up.railway.app/crud/api/products/', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "product retrieved successfully!") {
          setProducts(data.data);
        } else {
          setError('Failed to retrieve products');
        }
      })
      .catch((error) => {
        setError('Failed to retrieve products');
      });
  }, []);

  const formatDateTime = (datetime) => {
    return format(new Date(datetime), 'dd-MM-yyyy HH:mm:ss');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Sl.no</th>
              <th className="py-2 px-4 border">Product Code</th>
              <th className="py-2 px-4 border">Date & Time</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.product_code}>
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{product.product_code}</td>
                <td className="py-2 px-4 border">{formatDateTime(product.datetime)}</td>
                <td className="py-2 px-4 border">{product.name}</td>
                <td className="py-2 px-4 border">{product.description}</td>
                <td className="py-2 px-4 border">₹{product.price}</td>
                <td className={`py-2 px-4 border ${product.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                  {product.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
