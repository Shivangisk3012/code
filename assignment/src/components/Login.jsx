import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // New state for error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors before a new login attempt
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data.success) {
        navigate('/home');
      } else {
        setError('Incorrect email or password'); // Set error message if login fails
      }
    } catch (error) {
      setError('Incorrect email or password'); // Set error message in case of an error
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-container bg-light p-4 rounded">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger text-center">{error}</p>} {/* Display error message */}
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
      <p className="text-center mt-3">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
