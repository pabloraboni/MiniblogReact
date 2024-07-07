import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthValue } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  
  const {user} = useAuthValue();

  console.log(user);

  if (user === undefined) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
