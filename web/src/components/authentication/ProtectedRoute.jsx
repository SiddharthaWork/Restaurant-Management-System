/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && location.pathname !== "/signin") {
    return <Navigate to="/signin" replace />;
  }

  if (isAuthenticated && location.pathname === "/signin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
export default ProtectedRoute;
