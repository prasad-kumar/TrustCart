import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  isAuthenticated,
  user,
  children,
  isAdmin,
  redirect = "/login",
  redirectAdmin = "/profile",
}) => {


  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to={redirectAdmin} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;