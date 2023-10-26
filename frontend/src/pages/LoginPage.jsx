import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // import external CSS file

function Login() {
  // Define state variables to store user input
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform authentication here (right now hard coded to username:cs, password:409)
    if (username === 'cs' && password === '409') {
      navigate('/carousel');
    } else {
      alert('Login failed. Please check your credentials.');
    }
    // You can also redirect the user to a different page upon successful login
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <button type="submit">Enter</button>
        </div>
      </form>
      <div className="button-container">
        <button type="button" onClick={handleRegisterClick} className="register-button">Register</button>
      </div>
    </div>
  );
}

export default Login;
