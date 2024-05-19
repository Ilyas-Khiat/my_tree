import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      console.log(response.data); // Log the response data to check its structure
      if (response.status) {
        setMessage("Login successful!");
        localStorage.setItem("token", response.data.token);
        navigate('/familytree');
      } else {
        setMessage("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.log(err);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <p>Don't Have Account? <Link to="/signup">Sign Up</Link></p>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
