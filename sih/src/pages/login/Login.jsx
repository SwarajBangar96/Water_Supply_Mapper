import React, { useState } from 'react';
import './Login.css'; 
import { database } from '.././firebase';
import { getDatabase, ref, get } from 'firebase/database';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAdminChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Admin Authority:', isAdmin);

    try {
        // Get a reference to the Firebase Realtime Database
        const db = getDatabase();
  
        // Get admin data from Firebase Realtime Database
        const adminDataSnapshot = await get(ref(db, `admins/${username}`));
        console.log(adminDataSnapshot)
        const adminData = adminDataSnapshot.val();
        console.log(adminData)
        console.log(password)
  
        // Check if admin exists and password matches
        if (adminData && adminData.toString() === password.toString()) {
          console.log('Admin login successful');
          localStorage.setItem('isAdmin', 'true');
          // Perform admin-related actions
        } else {
          console.log('Admin login failed');
          localStorage.setItem('isAdmin', 'false');
          // Handle login failure
        }
        navigate('/')
        window.location.reload();
      } catch (error) {
        console.error('Error during login:', error.message);
      }
    };


  return (
    <div className="main_login">
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
          Admin Authority:
          <input type="checkbox" checked={isAdmin} onChange={handleAdminChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
