import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated } = authState;

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
