import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteConfirm = ({ productId, onDeleteConfirmed, onCancel }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
 
  const handleDeletePost = async () => {
    setMessage('');
    setError('');

    try {
      const response = await fetch(`https://crud-backend-drf-production.up.railway.app/crud/api/products/delete/${productId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}`, // Assumes you store the token
        },
      });

      if (response.ok) {
        onDeleteConfirmed("Post deleted successfully!", "success");
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong.');
        onDeleteConfirmed("Failed to delete post.", "error");
      }
    } catch (err) {
      setError('Failed to delete the product.');
      console.error("Error deleting post:", err);
      onDeleteConfirmed("Something went wrong.", "error");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-gray-800 mb-4">Are you sure you want to delete this post?</h2>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleDeletePost}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default  DeleteConfirm;
