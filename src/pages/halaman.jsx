import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const halaman = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/admin/", { 
        email,
        password,
      });
      navigate("/admin"); 
    } catch (error) {
      console.log("Error adding user:", error);
    }
  };

  const Halaman = () => {
    const navigate = useNavigate();
  
    const handleLogin = async (credentials) => {
      try {
        const response = await axios.post('your-login-endpoint', credentials);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/UTS-MahagaNajwanKaidan-Fe/home');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };
  
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">ADMIN</h2>
        <form onSubmit={saveUser}>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">email</label>
            <div className="control">
              <input
                type="text"
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="field mb-4">
            <label className="label text-sm font-semibold">Password</label>
            <div className="control">
              <input
                type="password"
                className="input border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default halaman;