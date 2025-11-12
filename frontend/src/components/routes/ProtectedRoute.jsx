import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProviders";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/connexion" />;
  }

  return <div>{children}</div>;
};
