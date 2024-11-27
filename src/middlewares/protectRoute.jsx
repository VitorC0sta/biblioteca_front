import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authorization';

// Componente para proteger as rotas
export const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};
