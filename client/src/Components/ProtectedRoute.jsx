import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
  return <Component />;
};

export default ProtectedRoute;
