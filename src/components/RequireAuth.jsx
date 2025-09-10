import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
  let isAuth = false;
  try {
    isAuth = typeof window !== 'undefined' && localStorage.getItem('memberAuth') === '1';
  } catch (e) {
    // ignore storage errors
  }

  if (!isAuth) {
    return <Navigate to="/connexion" replace />;
  }

  return children;
}
