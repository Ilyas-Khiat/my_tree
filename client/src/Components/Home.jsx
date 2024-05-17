import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>
        <Link to="/signup">Sign Up</Link> or <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Home;
