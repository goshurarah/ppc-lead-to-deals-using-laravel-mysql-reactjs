import React from 'react'
import { Navigate, Route } from 'react-router-dom';

function PublicRoute() {
//    const getFromPersistance = (key) => {
//         const data = localStorage.getItem(key);
//         return JSON.parse(data);
//       };

const isAuthenticated = true; // Replace with your authentication logic
    
  const PublicRoute = ({ element, ...rest }) => {
    return isAuthenticated ? (
      <Navigate to="/dashboard" />
    ) : (
      <Route {...rest} element={element} />
    );
  };
  return (
    <>
      
    </>
  )
}

export default PublicRoute
