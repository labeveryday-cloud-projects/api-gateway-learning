// Create Protected Routes
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      await getCurrentUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  }

  if (isAuthenticated === null) return null; // or a loading spinner

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
