import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../App.css"; // Ensure this is the correct path to your CSS file

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:5000/users/register", {
            email,
            password
        }).then(response => {
            if (response.status) { // Ensure your API returns a status
                navigate('/login'); // Navigate to dashboard on success
            } else {
                alert(response.data.msg || "Registration failed"); // Show an error message if registration fails
            }
        }).catch(err => {
            console.error("Registration error: ", err);
            alert("An error occurred during registration. Please try again.");
        })
    };

    return (
        <div className="sign-up-container">
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

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

                <button type="submit">Sign Up</button>
                <p>Have an Account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default Signup;
