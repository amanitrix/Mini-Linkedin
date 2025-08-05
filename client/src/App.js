import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import './App.css';

// Set default axios base URL
const apiBaseURL = process.env.REACT_APP_API_URL || 'https://mini-linkedin-jo9f.onrender.com';
axios.defaults.baseURL = apiBaseURL;
console.log('API Base URL:', apiBaseURL);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    const res = await axios.post('/api/auth/login', userData);
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    return res.data;
  };

  const register = async (userData) => {
    try {
      console.log('Sending registration data:', userData);
      const res = await axios.post('/api/auth/register', userData);
      console.log('Registration response:', res.data);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return res.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (  
    <div className="App">
      <Navbar user={user} logout={logout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" /> : <Login login={login} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/" /> : <Register register={register} />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} 
          />
          <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App; 