import React, { useState } from 'react';
import './Login.css'; // Import CSS for styling
import axios from 'axios';

const Login = ({ onLoginSuccess, onSwitchToRegister, onSwitchToForgotPassword, onBack }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

       
        const data = {
            username: username,
            password: password,
        };

        const res = await axios.post('http://localhost:8080/user/login', data);

        // console.log(res.data);
       

        // console.log('login successful');
        // const ss = localStorage.getItem("login_id");
        // console.log(ss);
        
        // Check if input matches fake credentials
        if (res.data.id  > 0) {
            setMessage('Login successful!');
            localStorage.setItem("login_id", res.data.id);
            localStorage.setItem("login_user", res.data.username);
            onLoginSuccess();  // Call the login success handler
        } else {
            setMessage('Invalid username or password.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <div className="login-container">
                <div className="login-image">
                    <img 
                        src="https://img.freepik.com/free-photo/top-view-fresh-delicious-chinese-food-dark-background_24972-2170.jpg?w=996&t=st=1727752454~exp=1727753054~hmac=2804ba8019ce58d1d59a1e62d114ea83f47eb198c215b42932636f3c2bb553bc" 
                        alt="Login"
                    /> 
                </div>
                <div className="form-container">
                    <h1>Login</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="Enter your username or email"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </div>
                        <button type="submit" className="button-margin">Login</button>
                        <button type="button" onClick={onBack} className="button-margin">Back</button>
                        {message && <div className="message">{message}</div>}
                    </form>
                    <p><a href="#" onClick={onSwitchToForgotPassword}>Forgot Password?</a></p>
                    <p>Don't have an account? <a href="#" onClick={onSwitchToRegister}>Register here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
