import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Register({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Clear the message after 10 seconds
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://crud-backend-drf-production.up.railway.app/accounts/api/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email, password2 }),
        }
      );
      const data = await response.json();
      console.log("data is ",data);
      
      if (response.ok) {
        setMessage(data.message || "Registration successfull");
        handleLogin(); // Update authentication state
        // setUsername("");
        // setPassword("");
        // setPassword2("");
        // setEmail("");
      } else {
  
        if(data.errors.password[0]){
          setError(data.errors.password[0]);
        }
        if(data.errors.email[0]){
          setError(data.errors.email);
          console.log(data.errors.email);
          
        }
        if(data.errors.username[0]){
          setError(data.errors.username);
        }
       
        console.log("error is ",data.errors.password[0]);

      }

    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white my-5 shadow-lg rounded-lg p-8">
        <div className="flex justify-center mb-2">
          <img
            src="/images/Avatar.png"
            alt="Avatar"
            className="rounded-full w-24 h-24 border-2 border-green-500"
          />
        </div>
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Register
        </h2>

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
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-lg w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password(Again)</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="border rounded-lg w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <div className="mt-2">
          <span>If you have already registered </span>
          <NavLink to="/login" className="text-green-600 font-bold">
            Login
          </NavLink>
          <span> Please!</span>
        </div>
      </div>
    </div>
  );
}
