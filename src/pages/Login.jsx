import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Clear messages after 10 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://crud-backend-drf-production.up.railway.app/accounts/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok && data.access && data.refresh) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        handleLogin(true); // Update authentication status
        setMessage('Login successful');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white border rounded shadow-md my-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {message && (
        <div className="bg-green-500 p-3 rounded-lg text-gray-50 my-3" role="alert">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-500 p-3 rounded-lg text-gray-50 my-3" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
