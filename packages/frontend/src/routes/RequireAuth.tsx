import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "contexts";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
