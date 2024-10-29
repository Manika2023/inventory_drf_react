import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";

export default function CreateProduct() {
  const [product_code, setProductCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postProduct = { product_code, name, description, price, status };

    try {
      const response = await fetch(
        "https://crud-backend-drf-production.up.railway.app/crud/api/products/create/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postProduct),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Post created successfully");
        setProductCode("");
        setDescription("");
        setName("");
        setPrice("");
        setStatus("");

        // navigate('/dashboard'); // Redirect to home or another page after successful creation
      } else {
        setError(data.message || "Failed to create post");
      }
    } catch (err) {
      setError("Failed to fetch");
    }
  };

  return (
    <div className="container  mx-auto p-6">
      <h2 className="text-3xl text-gray-900 font-bold mb-4">Create New Post</h2>
      {error && (
        <div
          className="bg-green-500 p-3 rounded-lg text-gray-50 my-3"
          role="alert"
        >
          {error}
        </div>
      )}

      {message && (
        <div
          className="bg-green-500 p-3 rounded-lg text-gray-50 my-3"
          role="alert"
        >
          {message}
          <Link to="/dashboard" className="underline text-gray-100 ml-2">
            Go Back to Dashboard
          </Link>
        </div>
      )}

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label className="block text-gray-800">Product Code</label>
            <input
              type="number"
              value={product_code}
              onChange={(e) => setProductCode(e.target.value)}
              className="border rounded w-full py-2 px-3 bg-gray-50 text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full py-2 px-3 bg-gray-50 text-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-900">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full py-2 px-3 bg-gray-50 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-900">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded w-full py-2 px-3 bg-gray-50 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-900">Status</label>
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded w-full py-2 px-3 bg-gray-50 text-black"
              required
            >
              <option value="" disabled>
                Select Status
              </option>
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
              Create Post +
            </button>
            <NavLink
              to={"/dashboard"}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}
