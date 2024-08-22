import React from 'react'
import { Navigate, Route } from 'react-router-dom';

function PrivateRoute() {
    const isAuthenticated = true; // Replace with your authentication logic
    
    const PrivateRoute = ({ element, ...rest }) => {
        return isAuthenticated ? (
          <Route {...rest} element={element} />
        ) : (
          <Navigate to="/signin" />
        );
      };
  return (
    <>
     
 
    </>
  )
}

export default PrivateRoute
