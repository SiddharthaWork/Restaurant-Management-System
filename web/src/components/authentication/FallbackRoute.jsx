import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth"; // Assuming you have this hook for authentication

const FallbackRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default FallbackRoute;
