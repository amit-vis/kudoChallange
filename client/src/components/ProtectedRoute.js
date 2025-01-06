import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
    useEffect(() => {
        if (!isTokenValid()) {
            localStorage.removeItem('token'); // Clear invalid token
        }
    }, []);

    return isTokenValid() ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
