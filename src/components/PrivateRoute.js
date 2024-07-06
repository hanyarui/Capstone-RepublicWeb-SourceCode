// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

const PrivateRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    // Jika tidak ada token, redirect ke halaman login
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
