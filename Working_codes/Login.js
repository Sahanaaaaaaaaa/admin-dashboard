import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ handleLogin }) => {
    const [d_username, setUsername] = useState('');
    const [d_password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleLogin({ d_username, d_password });
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <img src="public\logo.png" alt="Dummy Logo" className="logo" /> {/* Replace with actual path to logo */}
                <h2>Manager Name</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={d_username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={d_password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
