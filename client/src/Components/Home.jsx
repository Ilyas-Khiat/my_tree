import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const homeStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#333',
    backgroundColor: '#f0f0f0',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  };

  const headingStyle = {
    color: '#222',
    fontSize: '2.5rem',
  };

  const paragraphStyle = {
    marginTop: '20px',
    fontSize: '1.2rem',
  };

  const linkStyle = {
    margin: '0 10px',
    textDecoration: 'none',
    color: '#007BFF',
    fontWeight: 'bold',
  };

  return (
    <div style={homeStyle}>
      <h1 style={headingStyle}>FAMILY TREE VISUALISATION</h1>
      <p style={paragraphStyle}>
        <Link to="/signup" style={linkStyle}>Sign Up</Link> or <Link to="/login" style={linkStyle}>Login</Link>
      </p>
    </div>
  );
};

export default Home;
