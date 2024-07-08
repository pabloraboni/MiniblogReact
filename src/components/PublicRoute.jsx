import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthValue } from '../context/AuthContext';

const PublicRoute = ({ children }) => {

  const {user} = useAuthValue();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;